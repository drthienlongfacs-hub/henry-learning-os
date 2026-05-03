/**
 * voiceEngine.ts - Fast-first hybrid voice engine for Henry Learning OS.
 *
 * Rule: no user click waits for Kokoro generation. Web Speech starts after the
 * browser-required 15 ms cancel gap; Kokoro renders in the background and is
 * used only when cached audio is ready.
 */

import type { KokoroTTS as KokoroTTSInstance } from 'kokoro-js';

export type Accent = 'en-US' | 'en-GB' | 'en-AU';

type NeuralAudioChunk = {
  samples: Float32Array;
  sampleRate: number;
};

const KOKORO_VOICES = {
  'en-US': { primary: 'af_heart', fallback: 'am_adam' },
  'en-GB': { primary: 'bf_emma', fallback: 'bm_george' },
  'en-AU': { primary: 'af_nicole', fallback: 'af_sarah' },
} as const satisfies Record<Accent, { primary: string; fallback: string }>;

const MAX_TTS_CHUNK_CHARS = 240;
const MAX_NEURAL_CACHE_ITEMS = 12;

let kokoroInstance: KokoroTTSInstance | null = null;
let kokoroReady = false;
let kokoroFailed = false;
let kokoroLoadingPromise: Promise<boolean> | null = null;

let audioContext: AudioContext | null = null;
let gainNode: GainNode | null = null;
let currentAudioSource: AudioBufferSourceNode | null = null;
let neuralPlaying = false;
let neuralPaused = false;
let neuralPlaybackToken = 0;

const neuralAudioCache = new Map<string, NeuralAudioChunk[]>();
const neuralPreloadPromises = new Map<string, Promise<boolean>>();

// ================================================================
// PLATFORM-SPECIFIC VOICE DATABASE
// Source: github.com/HadrienGardeur/web-speech-recommended-voices
// Verified: Chrome Android, iOS Safari, macOS Chrome/Safari, Windows
// ================================================================
const VOICE_DB: Record<string, Record<string, { female: string[]; male: string[] }>> = {
  android: {
    'en-US': { female: ['Google US English', 'Google US English Female'], male: ['Google US English Male'] },
    'en-GB': { female: ['Google UK English Female'], male: ['Google UK English Male'] },
    'en-AU': { female: ['Google Australian English Female'], male: ['Google Australian English Male'] },
  },
  ios: {
    'en-US': { female: ['Samantha', 'Allison', 'Ava'], male: ['Aaron', 'Fred'] },
    'en-GB': { female: ['Serena', 'Kate'], male: ['Daniel', 'Oliver'] },
    'en-AU': { female: ['Karen'], male: ['Gordon'] },
  },
  macos: {
    'en-US': { female: ['Samantha', 'Allison', 'Ava'], male: ['Alex', 'Tom'] },
    'en-GB': { female: ['Kate', 'Serena'], male: ['Daniel', 'Oliver'] },
    'en-AU': { female: ['Karen'], male: ['Gordon'] },
  },
  windows: {
    'en-US': { female: ['Microsoft Aria', 'Microsoft Jenny'], male: ['Microsoft Mark', 'Microsoft Guy'] },
    'en-GB': { female: ['Microsoft Hazel', 'Microsoft Libby'], male: ['Microsoft Ryan'] },
    'en-AU': { female: ['Microsoft Natasha'], male: ['Microsoft William'] },
  },
};

export const ACCENT_PROFILES: { id: string; k: Accent; flag: string; label: string; lang: string }[] = [
  { id: 'us', k: 'en-US', flag: '🇺🇸', label: 'American', lang: 'en-US' },
  { id: 'uk', k: 'en-GB', flag: '🇬🇧', label: 'British', lang: 'en-GB' },
  { id: 'au', k: 'en-AU', flag: '🇦🇺', label: 'Australian', lang: 'en-AU' },
];

function detectPlatform(): string {
  if (typeof navigator === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'ios';
  if (/Android/.test(ua)) return 'android';
  if (/Mac/.test(navigator.platform)) return 'macos';
  if (/Win/.test(navigator.platform)) return 'windows';
  return 'unknown';
}

let voiceCache: Record<string, SpeechSynthesisVoice> = {};

export function findBestVoice(accent: Accent): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;

  if (voiceCache[accent]) return voiceCache[accent];

  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  const platform = detectPlatform();
  const lang = accent;
  const langBase = lang.split('-')[0];
  let found: SpeechSynthesisVoice | null = null;

  const platDB = VOICE_DB[platform];
  if (!found && platDB?.[lang]) {
    const candidates = [...(platDB[lang].female || []), ...(platDB[lang].male || [])];
    for (const name of candidates) {
      const match = voices.find(v => v.name.includes(name));
      if (match) {
        found = match;
        break;
      }
    }
  }

  if (!found) {
    for (const plat of Object.values(VOICE_DB)) {
      if (plat[lang]) {
        const candidates = [...(plat[lang].female || []), ...(plat[lang].male || [])];
        for (const name of candidates) {
          const match = voices.find(v => v.name.includes(name));
          if (match) {
            found = match;
            break;
          }
        }
        if (found) break;
      }
    }
  }

  if (!found) {
    const exactLang = voices.filter(v => v.lang === lang);
    found = exactLang.find(v => /enhanced|premium|natural/i.test(v.name)) || null;
    if (!found) found = exactLang.find(v => v.localService) || null;
    if (!found && exactLang.length > 0) found = exactLang[0];
  }

  if (!found) {
    const prefixMatch = voices.filter(v => v.lang.startsWith(lang));
    found = prefixMatch.find(v => v.localService) || prefixMatch[0] || null;
  }

  if (!found) {
    const anyEn = voices.filter(v => v.lang.startsWith(langBase));
    found = anyEn.find(v => v.localService) || anyEn[0] || null;
  }

  if (found) voiceCache[accent] = found;
  return found;
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    voiceCache = {};
    findBestVoice('en-US');
    findBestVoice('en-GB');
    findBestVoice('en-AU');
  };
}

function clampRate(rate: number): number {
  return Math.max(0.7, Math.min(1.2, rate));
}

function getNeuralCacheKey(text: string, accent: Accent, rate: number): string {
  return `${accent}:${clampRate(rate).toFixed(2)}:${text.trim().replace(/\s+/g, ' ')}`;
}

export function hasCachedNeuralSpeech(text: string, accent: Accent, rate = 0.92): boolean {
  return neuralAudioCache.has(getNeuralCacheKey(text, accent, rate));
}

function splitForNeuralTts(text: string): string[] {
  const sentences = text
    .replace(/\s+/g, ' ')
    .trim()
    .match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  const chunks: string[] = [];

  for (const rawSentence of sentences) {
    const sentence = rawSentence.trim();
    if (!sentence) continue;

    if (sentence.length <= MAX_TTS_CHUNK_CHARS) {
      chunks.push(sentence);
      continue;
    }

    const words = sentence.split(/\s+/);
    let current = '';
    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      if (next.length > MAX_TTS_CHUNK_CHARS && current) {
        chunks.push(current);
        current = word;
      } else {
        current = next;
      }
    }
    if (current) chunks.push(current);
  }

  return chunks;
}

async function loadKokoro(): Promise<boolean> {
  if (kokoroReady) return true;
  if (kokoroFailed) return false;
  if (kokoroLoadingPromise) return kokoroLoadingPromise;

  kokoroLoadingPromise = (async () => {
    try {
      const { KokoroTTS } = await import('kokoro-js');
      kokoroInstance = await KokoroTTS.from_pretrained(
        'onnx-community/Kokoro-82M-v1.0-ONNX',
        { dtype: 'q8', device: 'wasm' },
      );
      kokoroReady = true;
      return true;
    } catch (error) {
      kokoroFailed = true;
      console.warn('[VoiceEngine] Kokoro preload failed; keeping instant Web Speech path.', error);
      return false;
    } finally {
      kokoroLoadingPromise = null;
    }
  })();

  return kokoroLoadingPromise;
}

async function generateNeuralChunks(text: string, accent: Accent, rate: number): Promise<NeuralAudioChunk[] | null> {
  if (typeof window === 'undefined') return null;
  const chunks = splitForNeuralTts(text);
  if (chunks.length === 0) return null;

  const loaded = await loadKokoro();
  if (!loaded || !kokoroInstance) return null;

  const voice = KOKORO_VOICES[accent] || KOKORO_VOICES['en-US'];
  const speed = clampRate(rate);
  const generated: NeuralAudioChunk[] = [];

  for (const chunk of chunks) {
    const audio = await kokoroInstance.generate(chunk, {
      voice: voice.primary,
      speed,
    });
    generated.push({
      samples: new Float32Array(audio.audio),
      sampleRate: audio.sampling_rate || 24000,
    });
  }

  return generated;
}

function pruneNeuralCache(): void {
  while (neuralAudioCache.size > MAX_NEURAL_CACHE_ITEMS) {
    const oldest = neuralAudioCache.keys().next().value;
    if (!oldest) return;
    neuralAudioCache.delete(oldest);
  }
}

async function getOrCreateNeuralChunks(text: string, accent: Accent, rate: number): Promise<NeuralAudioChunk[] | null> {
  const key = getNeuralCacheKey(text, accent, rate);
  const cached = neuralAudioCache.get(key);
  if (cached) return cached;

  const generated = await generateNeuralChunks(text, accent, rate);
  if (!generated || generated.length === 0) return null;

  neuralAudioCache.set(key, generated);
  pruneNeuralCache();
  return generated;
}

export function preloadNeuralSpeech(text: string, accent: Accent, rate = 0.92): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (text.trim().length < 40) return Promise.resolve(false);

  const key = getNeuralCacheKey(text, accent, rate);
  if (neuralAudioCache.has(key)) return Promise.resolve(true);

  const existing = neuralPreloadPromises.get(key);
  if (existing) return existing;

  const promise = getOrCreateNeuralChunks(text, accent, rate)
    .then(chunks => Boolean(chunks?.length))
    .catch(error => {
      console.warn('[VoiceEngine] Neural preload failed; instant Web Speech remains active.', error);
      return false;
    })
    .finally(() => neuralPreloadPromises.delete(key));

  neuralPreloadPromises.set(key, promise);
  return promise;
}

function scheduleNeuralPreload(text: string, accent: Accent, rate: number): void {
  if (typeof window === 'undefined' || text.trim().length < 40) return;
  window.setTimeout(() => {
    void preloadNeuralSpeech(text, accent, rate);
  }, 250);
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const audioWindow = window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext };
  const AudioContextCtor = audioWindow.AudioContext || audioWindow.webkitAudioContext;
  if (!AudioContextCtor) return null;

  if (!audioContext || audioContext.state === 'closed') {
    audioContext = new AudioContextCtor({ sampleRate: 24000 });
    gainNode = audioContext.createGain();
    gainNode.gain.value = 0.92;
    gainNode.connect(audioContext.destination);
  }

  if (audioContext.state === 'suspended') {
    void audioContext.resume().catch(error => {
      console.warn('[VoiceEngine] AudioContext resume failed.', error);
    });
  }

  return audioContext;
}

function stopNeuralPlayback(): void {
  neuralPlaybackToken += 1;
  if (currentAudioSource) {
    try {
      currentAudioSource.stop();
    } catch (error) {
      console.warn('[VoiceEngine] Neural source stop skipped.', error);
    }
    currentAudioSource = null;
  }
  neuralPlaying = false;
  neuralPaused = false;
}

function playNeuralChunks(chunks: NeuralAudioChunk[], onEnd?: () => void): boolean {
  const ctx = getAudioContext();
  if (!ctx || chunks.length === 0) return false;

  if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
  stopNeuralPlayback();
  neuralPlaying = true;
  neuralPaused = false;
  const token = neuralPlaybackToken;

  const playChunk = (index: number) => {
    if (token !== neuralPlaybackToken) return;
    if (index >= chunks.length) {
      currentAudioSource = null;
      neuralPlaying = false;
      neuralPaused = false;
      onEnd?.();
      return;
    }

    const chunk = chunks[index];
    const buffer = ctx.createBuffer(1, chunk.samples.length, chunk.sampleRate);
    buffer.getChannelData(0).set(chunk.samples);

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(gainNode || ctx.destination);
    currentAudioSource = source;

    source.onended = () => {
      if (token === neuralPlaybackToken) playChunk(index + 1);
    };
    source.start(0);
  };

  playChunk(0);
  return true;
}

let speakTimeout: ReturnType<typeof setTimeout> | null = null;

export function speak(
  text: string,
  accent: Accent,
  rate = 0.92,
  onEnd?: () => void,
): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  stopNeuralPlayback();
  if (speakTimeout) {
    clearTimeout(speakTimeout);
    speakTimeout = null;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = () => {
    onEnd?.();
  };

  const voice = findBestVoice(accent);
  if (voice) utterance.voice = voice;
  utterance.lang = accent;
  utterance.rate = clampRate(rate + (Math.random() - 0.5) * 0.04);
  utterance.pitch = 1;
  utterance.volume = 0.92;

  speakTimeout = setTimeout(() => {
    window.speechSynthesis.speak(utterance);
    speakTimeout = null;
  }, 15);
}

export function speakLongPassage(
  text: string,
  accent: Accent,
  rate = 0.92,
  onEnd?: () => void,
): void {
  const cached = neuralAudioCache.get(getNeuralCacheKey(text, accent, rate));
  if (cached && playNeuralChunks(cached, onEnd)) return;

  speak(text, accent, rate, onEnd);
  scheduleNeuralPreload(text, accent, rate);
}

export function pauseSpeech(): void {
  window.speechSynthesis?.pause();
  if (neuralPlaying && audioContext?.state === 'running') {
    void audioContext.suspend().then(() => {
      neuralPaused = true;
    }).catch(error => {
      console.warn('[VoiceEngine] Neural pause failed.', error);
    });
  }
}

export function resumeSpeech(): void {
  window.speechSynthesis?.resume();
  if (neuralPlaying && neuralPaused && audioContext?.state === 'suspended') {
    void audioContext.resume().then(() => {
      neuralPaused = false;
    }).catch(error => {
      console.warn('[VoiceEngine] Neural resume failed.', error);
    });
  }
}

export function stopSpeech(): void {
  if (speakTimeout) {
    clearTimeout(speakTimeout);
    speakTimeout = null;
  }
  stopNeuralPlayback();
  window.speechSynthesis?.cancel();
}

export function isSpeaking(): boolean {
  return neuralPlaying || (window.speechSynthesis?.speaking ?? false);
}

export function getVoiceDebugInfo(accent: Accent): string {
  const voice = findBestVoice(accent);
  const speechLayer = voice ? `${voice.name} (${voice.lang})` : 'No Web Speech voice';
  if (kokoroReady) return `${speechLayer} · Kokoro cache-ready`;
  if (kokoroLoadingPromise) return `${speechLayer} · Kokoro warming in background`;
  if (kokoroFailed) return `${speechLayer} · Kokoro unavailable`;
  return `${speechLayer} · instant Web Speech first`;
}

export function getEngineStatus() {
  return {
    engine: kokoroReady ? 'Fast-first hybrid: Web Speech + cached Kokoro Neural' : 'Fast-first Web Speech; Kokoro preloads in background',
    ready: true,
    loading: Boolean(kokoroLoadingPromise),
  };
}

export function isNeuralReady(): boolean {
  return kokoroReady;
}

export async function loadNeuralEngine(): Promise<boolean> {
  return loadKokoro();
}
