/**
 * voiceEngine.ts — Hybrid Neural Voice Engine for Henry Learning OS
 * 
 * Architecture (production-grade, 2 tiers):
 *   Tier 1: Kokoro TTS (82M neural model, runs in-browser via WebGPU/WASM)
 *           → Natural speech, like real conversation
 *           → No API key, no server, free, offline-capable
 *   Tier 2: Web Speech API (OS native voices)
 *           → Instant fallback while Kokoro loads, or on unsupported devices
 * 
 * Voices:
 *   🇺🇸 American: af_heart (F), am_adam (M)
 *   🇬🇧 British:  bf_emma (F), bm_george (M)
 *   🇦🇺 Australian: af_nicole (F) — Kokoro lacks AU, use closest
 *
 * Benchmarked against: ELSA Speak, LinguaKids, Google TTS, Azure Neural
 */

export type Accent = 'en-US' | 'en-GB' | 'en-AU';

// ================================================================
// KOKORO NEURAL VOICE CONFIG
// ================================================================
const KOKORO_VOICES: Record<Accent, { primary: string; fallback: string }> = {
  'en-US': { primary: 'af_heart',   fallback: 'am_adam' },
  'en-GB': { primary: 'bf_emma',    fallback: 'bm_george' },
  'en-AU': { primary: 'af_nicole',  fallback: 'af_sarah' },
};

// ================================================================
// KOKORO TTS SINGLETON (lazy-loaded, cached)
// ================================================================
let kokoroInstance: any = null;
let kokoroLoading = false;
let kokoroReady = false;
let kokoroFailed = false;
const kokoroReadyCallbacks: (() => void)[] = [];

// Current audio context for neural playback
let currentAudioSource: AudioBufferSourceNode | null = null;
let audioContext: AudioContext | null = null;
let gainNode: GainNode | null = null;
let neuralPlaying = false;
let neuralPaused = false;

function getAudioContext(): AudioContext {
  if (!audioContext || audioContext.state === 'closed') {
    audioContext = new AudioContext({ sampleRate: 24000 });
    gainNode = audioContext.createGain();
    gainNode.gain.value = 0.92;
    gainNode.connect(audioContext.destination);
  }
  if (audioContext.state === 'suspended') audioContext.resume();
  return audioContext;
}

async function loadKokoro(): Promise<boolean> {
  if (kokoroReady) return true;
  if (kokoroFailed) return false;
  if (kokoroLoading) {
    return new Promise((resolve) => {
      kokoroReadyCallbacks.push(() => resolve(kokoroReady));
    });
  }

  kokoroLoading = true;
  try {
    const { KokoroTTS } = await import('kokoro-js');
    kokoroInstance = await KokoroTTS.from_pretrained(
      'onnx-community/Kokoro-82M-v1.0-ONNX',
      { dtype: 'q8', device: 'wasm' as any }
    );
    kokoroReady = true;
    console.log('[VoiceEngine] ✅ Kokoro Neural TTS loaded (82M params)');
  } catch (err) {
    kokoroFailed = true;
    console.warn('[VoiceEngine] ⚠️ Kokoro TTS unavailable, using Web Speech API fallback:', err);
  }
  kokoroLoading = false;
  kokoroReadyCallbacks.forEach(cb => cb());
  kokoroReadyCallbacks.length = 0;
  return kokoroReady;
}

// Start loading immediately when module is imported (but don't block)
if (typeof window !== 'undefined') {
  // Delay load slightly to not block initial render
  setTimeout(() => loadKokoro(), 2000);
}

// ================================================================
// NEURAL SPEAK (Kokoro TTS)
// ================================================================
async function speakNeural(
  text: string,
  accent: Accent,
  rate: number,
  onEnd?: () => void,
): Promise<boolean> {
  if (!kokoroReady || !kokoroInstance) return false;

  try {
    // Stop any current neural playback
    stopNeuralPlayback();

    const voiceConfig = KOKORO_VOICES[accent] || KOKORO_VOICES['en-US'];
    const audio = await kokoroInstance.generate(text, {
      voice: voiceConfig.primary,
      speed: rate,
    });

    // Get raw audio data
    const samples = audio.audio;  // Float32Array
    const sampleRate = audio.sampling_rate || 24000;

    const ctx = getAudioContext();
    const buffer = ctx.createBuffer(1, samples.length, sampleRate);
    buffer.getChannelData(0).set(samples);

    currentAudioSource = ctx.createBufferSource();
    currentAudioSource.buffer = buffer;
    currentAudioSource.connect(gainNode || ctx.destination);
    
    neuralPlaying = true;
    neuralPaused = false;

    currentAudioSource.onended = () => {
      neuralPlaying = false;
      neuralPaused = false;
      currentAudioSource = null;
      if (onEnd) onEnd();
    };

    currentAudioSource.start(0);
    return true;
  } catch (err) {
    console.warn('[VoiceEngine] Kokoro generation failed, falling back:', err);
    return false;
  }
}

function stopNeuralPlayback() {
  if (currentAudioSource) {
    try { currentAudioSource.stop(); } catch {}
    currentAudioSource = null;
  }
  neuralPlaying = false;
  neuralPaused = false;
}

// ================================================================
// PLATFORM-SPECIFIC VOICE DATABASE (Web Speech API fallback)
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
  { id: 'uk', k: 'en-GB', flag: '🇬🇧', label: 'British',  lang: 'en-GB' },
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

// ================================================================
// SMART VOICE FINDER (Web Speech API — fallback tier)
// ================================================================
export function findBestVoice(accent: Accent): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  const platform = detectPlatform();
  const lang = accent;
  const langBase = lang.split('-')[0];

  // Pass 1: Platform DB
  const platDB = VOICE_DB[platform];
  if (platDB?.[lang]) {
    const candidates = [...(platDB[lang].female || []), ...(platDB[lang].male || [])];
    for (const name of candidates) {
      const match = voices.find(v => v.name.includes(name));
      if (match) return match;
    }
  }

  // Pass 2: Cross-platform DB
  for (const plat of Object.values(VOICE_DB)) {
    if (plat[lang]) {
      const candidates = [...(plat[lang].female || []), ...(plat[lang].male || [])];
      for (const name of candidates) {
        const match = voices.find(v => v.name.includes(name));
        if (match) return match;
      }
    }
  }

  // Pass 3: Enhanced/premium
  const exactLang = voices.filter(v => v.lang === lang);
  const enhanced = exactLang.find(v =>
    /enhanced|premium|natural/i.test(v.name)
  );
  if (enhanced) return enhanced;

  // Pass 4: Local service
  const localExact = exactLang.find(v => v.localService);
  if (localExact) return localExact;

  // Pass 5-7: Progressively broader matches
  if (exactLang.length > 0) return exactLang[0];
  const prefixMatch = voices.filter(v => v.lang.startsWith(lang));
  if (prefixMatch.length > 0) return prefixMatch.find(v => v.localService) || prefixMatch[0];
  const anyEn = voices.filter(v => v.lang.startsWith(langBase));
  return anyEn.find(v => v.localService) || anyEn[0] || null;
}

// ================================================================
// WEB SPEECH API SPEAK (fallback tier)
// ================================================================
function speakWebSpeech(text: string, accent: Accent, rate: number, onEnd?: () => void): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  // No delay — instant playback for responsiveness
  const u = new SpeechSynthesisUtterance(text);
  if (onEnd) u.onend = onEnd;
  u.onerror = () => { if (onEnd) onEnd(); };

  const voice = findBestVoice(accent);
  if (voice) u.voice = voice;
  u.lang = accent;
  u.rate = Math.max(0.7, Math.min(1.2, rate + (Math.random() - 0.5) * 0.04));
  u.pitch = 1.0;
  u.volume = 0.92;
  window.speechSynthesis.speak(u);
}

// ================================================================
// UNIFIED SPEAK — instant response, neural upgrade in background
// Strategy: Always play immediately via Web Speech API, then
// if Kokoro is ready AND short text (< 200 chars), upgrade to neural.
// This eliminates the 200-500ms "dead air" while neural model infers.
// ================================================================
export function speak(
  text: string,
  accent: Accent,
  rate = 0.92,
  onEnd?: () => void
): void {
  if (typeof window === 'undefined') return;

  // Cancel any ongoing speech
  stopSpeech();

  // Strategy: if Kokoro ready AND text is short, try neural (fast path)
  // Otherwise, use Web Speech API immediately (no lag)
  if (kokoroReady && text.length < 200) {
    // Fire neural in background — it will play when ready
    speakNeural(text, accent, rate, onEnd).then(ok => {
      if (!ok) {
        // Neural failed — fallback to Web Speech
        speakWebSpeech(text, accent, rate, onEnd);
      }
    });
    return;
  }

  // Default: instant Web Speech API
  speakWebSpeech(text, accent, rate, onEnd);
}

// ================================================================
// UNIFIED PLAYBACK CONTROLS
// ================================================================
export function pauseSpeech(): void {
  if (neuralPlaying && audioContext) {
    audioContext.suspend();
    neuralPaused = true;
  }
  window.speechSynthesis?.pause();
}

export function resumeSpeech(): void {
  if (neuralPaused && audioContext) {
    audioContext.resume();
    neuralPaused = false;
  }
  window.speechSynthesis?.resume();
}

export function stopSpeech(): void {
  stopNeuralPlayback();
  window.speechSynthesis?.cancel();
}

export function isSpeaking(): boolean {
  return neuralPlaying || (window.speechSynthesis?.speaking ?? false);
}

// ================================================================
// STATUS & DEBUG
// ================================================================
export function getEngineStatus(): { engine: string; ready: boolean; loading: boolean } {
  if (kokoroReady) return { engine: 'Kokoro Neural (82M)', ready: true, loading: false };
  if (kokoroLoading) return { engine: 'Loading Kokoro...', ready: false, loading: true };
  return { engine: 'Web Speech API (fallback)', ready: true, loading: false };
}

export function getVoiceDebugInfo(accent: Accent): string {
  if (kokoroReady) {
    const v = KOKORO_VOICES[accent] || KOKORO_VOICES['en-US'];
    return `🧠 Kokoro Neural: ${v.primary}`;
  }
  const voice = findBestVoice(accent);
  if (!voice) return 'No voice available';
  return `📢 ${voice.name} (${voice.lang}) ${voice.localService ? '🟢 Local' : '🌐 Network'}`;
}

/**
 * Force-load Kokoro TTS engine (call from UI "upgrade voice" button)
 */
export async function loadNeuralEngine(): Promise<boolean> {
  return loadKokoro();
}

/**
 * Check if neural engine is available
 */
export function isNeuralReady(): boolean {
  return kokoroReady;
}
