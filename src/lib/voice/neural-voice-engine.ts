export type HenryVoiceAccent = 'en-US' | 'en-GB' | 'en-AU' | 'vi-VN';
export type HenryVoiceMode = 'kokoro-neural' | 'web-speech';
export type HenryVoiceState = 'idle' | 'loading' | 'ready' | 'error';

export interface HenryVoiceSnapshot {
    state: HenryVoiceState;
    lastMode: HenryVoiceMode;
    detail: string;
    progressPct: number | null;
    modelId: string;
    loadPlan: KokoroLoadPlan | null;
    error: string | null;
}

export interface KokoroLoadPlan {
    device: 'webgpu' | 'wasm';
    dtype: 'fp32' | 'q8';
}

export interface HenrySpeakOptions {
    accent?: HenryVoiceAccent;
    rate?: number;
    onEnd?: () => void;
    preferredSystemVoices?: string[];
}

export interface HenrySpeakResult {
    mode: HenryVoiceMode;
    voiceLabel: string;
    fallbackReason?: string;
}

type KokoroVoice = 'af_heart' | 'bf_emma';
type KokoroRuntime = {
    generate: (text: string, options?: { voice?: KokoroVoice; speed?: number }) => Promise<{
        toBlob: () => Blob;
    }>;
};

const KOKORO_MODEL_ID = 'onnx-community/Kokoro-82M-v1.0-ONNX';
const DEFAULT_SYSTEM_VOICES: Record<HenryVoiceAccent, string[]> = {
    'en-US': ['Samantha', 'Google US English', 'Microsoft Jenny', 'Alex'],
    'en-GB': ['Daniel', 'Google UK English', 'Microsoft Sonia', 'Serena'],
    'en-AU': ['Karen', 'Google Australian English', 'Microsoft Natasha'],
    'vi-VN': ['Vietnamese', 'vi-VN', 'Linh', 'HoaiMy'],
};

const KOKORO_BY_ACCENT: Partial<Record<HenryVoiceAccent, { voice: KokoroVoice; label: string }>> = {
    'en-US': { voice: 'af_heart', label: 'Kokoro af_heart' },
    'en-GB': { voice: 'bf_emma', label: 'Kokoro bf_emma' },
};

const MAX_CHUNK_LENGTH = 260;
const listeners = new Set<(snapshot: HenryVoiceSnapshot) => void>();

let snapshot: HenryVoiceSnapshot = {
    state: 'idle',
    lastMode: 'web-speech',
    detail: 'Neural voice is idle until the reading route or first speak action warms it.',
    progressPct: null,
    modelId: KOKORO_MODEL_ID,
    loadPlan: null,
    error: null,
};
let kokoroModel: KokoroRuntime | null = null;
let kokoroLoadPromise: Promise<KokoroRuntime> | null = null;
let activeAudio: HTMLAudioElement | null = null;
let activeObjectUrl: string | null = null;
let playToken = 0;

function emit(patch: Partial<HenryVoiceSnapshot>) {
    snapshot = { ...snapshot, ...patch };
    listeners.forEach((listener) => listener(snapshot));
}

export function subscribeHenryVoiceEngine(listener: (snapshot: HenryVoiceSnapshot) => void) {
    listeners.add(listener);
    listener(snapshot);
    return () => listeners.delete(listener);
}

export function getHenryVoiceEngineSnapshot() {
    return snapshot;
}

export function getRecommendedKokoroLoadPlan(hasWebGpu = hasNavigatorWebGpu()): KokoroLoadPlan {
    return hasWebGpu ? { device: 'webgpu', dtype: 'fp32' } : { device: 'wasm', dtype: 'q8' };
}

export function canUseKokoroAccent(accent: HenryVoiceAccent) {
    return Boolean(KOKORO_BY_ACCENT[accent]);
}

export function getKokoroVoiceForAccent(accent: HenryVoiceAccent) {
    return KOKORO_BY_ACCENT[accent] ?? null;
}

export function normalizeHenryVoiceRate(rate = 0.85) {
    return Math.min(1.15, Math.max(0.55, rate));
}

export function splitVoiceText(text: string) {
    const clean = text.replace(/\s+/g, ' ').trim();
    if (!clean) return [];

    const sentences = clean.match(/[^.!?]+[.!?]+|[^.!?]+$/g) ?? [clean];
    const chunks: string[] = [];
    let current = '';

    for (const rawSentence of sentences) {
        const sentence = rawSentence.trim();
        if (!sentence) continue;
        if ((current + ' ' + sentence).trim().length <= MAX_CHUNK_LENGTH) {
            current = (current + ' ' + sentence).trim();
            continue;
        }
        if (current) chunks.push(current);
        if (sentence.length <= MAX_CHUNK_LENGTH) {
            current = sentence;
            continue;
        }
        const words = sentence.split(/\s+/);
        current = '';
        for (const word of words) {
            if ((current + ' ' + word).trim().length > MAX_CHUNK_LENGTH && current) {
                chunks.push(current);
                current = word;
            } else {
                current = (current + ' ' + word).trim();
            }
        }
    }

    if (current) chunks.push(current);
    return chunks;
}

export function stopHenryVoice() {
    playToken += 1;
    if (typeof window !== 'undefined') {
        window.speechSynthesis?.cancel();
    }
    if (activeAudio) {
        activeAudio.pause();
        activeAudio.src = '';
        activeAudio = null;
    }
    if (activeObjectUrl) {
        URL.revokeObjectURL(activeObjectUrl);
        activeObjectUrl = null;
    }
}

export function pauseHenryVoice() {
    activeAudio?.pause();
    if (typeof window !== 'undefined') {
        window.speechSynthesis?.pause();
    }
}

export function resumeHenryVoice() {
    void activeAudio?.play().catch(() => undefined);
    if (typeof window !== 'undefined') {
        window.speechSynthesis?.resume();
    }
}

export async function warmHenryNeuralVoice() {
    if (typeof window === 'undefined') return null;
    if (kokoroModel) return kokoroModel;
    if (kokoroLoadPromise) return kokoroLoadPromise;

    const loadPlan = getRecommendedKokoroLoadPlan();
    emit({
        state: 'loading',
        lastMode: 'web-speech',
        detail: `Loading Kokoro neural TTS with ${loadPlan.device}/${loadPlan.dtype}.`,
        progressPct: null,
        loadPlan,
        error: null,
    });

    kokoroLoadPromise = (async () => {
        const { KokoroTTS } = await import('kokoro-js');
        const loaded = await KokoroTTS.from_pretrained(KOKORO_MODEL_ID, {
            dtype: loadPlan.dtype,
            device: loadPlan.device,
            progress_callback: (event: unknown) => {
                const progress = extractProgress(event);
                if (progress) emit(progress);
            },
        });
        kokoroModel = loaded as KokoroRuntime;
        emit({
            state: 'ready',
            detail: `Kokoro neural TTS is ready with ${loadPlan.device}/${loadPlan.dtype}.`,
            progressPct: 100,
            loadPlan,
            error: null,
        });
        return kokoroModel;
    })().catch((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Unknown Kokoro loading error';
        kokoroLoadPromise = null;
        emit({
            state: 'error',
            detail: 'Kokoro could not load; Web Speech fallback remains active.',
            progressPct: null,
            error: message,
        });
        throw error;
    });

    return kokoroLoadPromise;
}

export async function speakWithHenryVoice(text: string, options: HenrySpeakOptions = {}): Promise<HenrySpeakResult> {
    const accent = options.accent ?? 'en-US';
    const rate = normalizeHenryVoiceRate(options.rate);
    const kokoroVoice = getKokoroVoiceForAccent(accent);

    stopHenryVoice();
    const token = playToken;

    if (kokoroVoice && kokoroModel) {
        try {
            await playKokoro(text, kokoroVoice.voice, rate, token, options.onEnd);
            emit({
                lastMode: 'kokoro-neural',
                detail: `Playing ${kokoroVoice.label} neural voice.`,
                error: null,
            });
            return { mode: 'kokoro-neural', voiceLabel: kokoroVoice.label };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Neural playback failed';
            emit({
                state: kokoroModel ? 'ready' : 'error',
                lastMode: 'web-speech',
                detail: 'Neural playback failed; Web Speech fallback was used.',
                error: message,
            });
            return playSystemSpeech(text, accent, rate, options, 'neural-playback-failed');
        }
    }

    if (kokoroVoice) {
        void warmHenryNeuralVoice().catch(() => undefined);
        return playSystemSpeech(text, accent, rate, options, snapshot.state === 'loading' ? 'neural-loading' : 'neural-warming');
    }

    return playSystemSpeech(text, accent, rate, options, 'accent-not-supported-by-kokoro');
}

async function playKokoro(text: string, voice: KokoroVoice, speed: number, token: number, onEnd?: () => void) {
    if (!kokoroModel) throw new Error('Kokoro model is not ready');
    const chunks = splitVoiceText(text);
    for (const chunk of chunks) {
        if (token !== playToken) return;
        const audio = await kokoroModel.generate(chunk, { voice, speed });
        if (token !== playToken) return;
        await playAudioBlob(audio.toBlob(), token);
    }
    if (token === playToken) onEnd?.();
}

function playAudioBlob(blob: Blob, token: number) {
    return new Promise<void>((resolve, reject) => {
        if (token !== playToken) {
            resolve();
            return;
        }

        if (activeObjectUrl) URL.revokeObjectURL(activeObjectUrl);
        activeObjectUrl = URL.createObjectURL(blob);
        activeAudio = new Audio(activeObjectUrl);
        activeAudio.onended = () => {
            resolve();
        };
        activeAudio.onerror = () => {
            reject(new Error('Audio element failed to play Kokoro output'));
        };
        activeAudio.play().catch(reject);
    });
}

function playSystemSpeech(
    text: string,
    accent: HenryVoiceAccent,
    rate: number,
    options: HenrySpeakOptions,
    fallbackReason: string
): HenrySpeakResult {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
        options.onEnd?.();
        return { mode: 'web-speech', voiceLabel: 'Speech synthesis unavailable', fallbackReason };
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = accent;
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.onend = () => options.onEnd?.();
    utterance.onerror = () => options.onEnd?.();

    const voice = selectSystemVoice(
        window.speechSynthesis.getVoices(),
        accent,
        options.preferredSystemVoices
    );
    if (voice) utterance.voice = voice;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    emit({
        lastMode: 'web-speech',
        detail: fallbackReason === 'neural-loading'
            ? 'Kokoro is still loading; using system voice for this click.'
            : 'Using Web Speech fallback.',
    });

    return {
        mode: 'web-speech',
        voiceLabel: voice?.name ?? `${accent} system voice`,
        fallbackReason,
    };
}

export function selectSystemVoice(
    voices: SpeechSynthesisVoice[],
    accent: HenryVoiceAccent,
    preferredNames = DEFAULT_SYSTEM_VOICES[accent]
) {
    const exactPreferred = preferredNames
        .map((name) => voices.find((voice) => voice.name.toLowerCase().includes(name.toLowerCase())))
        .find(Boolean);
    if (exactPreferred) return exactPreferred;

    const accentVoice = voices.find((voice) => voice.lang === accent)
        ?? voices.find((voice) => voice.lang.toLowerCase().startsWith(accent.slice(0, 2).toLowerCase()));

    return accentVoice ?? voices[0] ?? null;
}

function hasNavigatorWebGpu() {
    return typeof navigator !== 'undefined' && 'gpu' in navigator;
}

function extractProgress(event: unknown): Partial<HenryVoiceSnapshot> | null {
    if (!event || typeof event !== 'object') return null;
    const record = event as Record<string, unknown>;
    const pct = typeof record.progress === 'number' ? Math.round(record.progress) : null;
    const status = typeof record.status === 'string' ? record.status : 'loading';
    const file = typeof record.file === 'string' ? record.file.split('/').pop() : null;

    return {
        state: 'loading',
        detail: file ? `Kokoro ${status}: ${file}` : `Kokoro ${status}`,
        progressPct: pct,
        error: null,
    };
}
