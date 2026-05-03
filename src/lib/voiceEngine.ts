/**
 * voiceEngine.ts — Production Voice Engine for Henry Learning OS
 * 
 * Architecture: Web Speech API with platform-aware voice selection
 * 
 * Quality improvements over browser defaults:
 *   1. Platform-specific voice DB (exact names per OS)
 *   2. Prefer "enhanced"/"premium"/"natural" quality voices
 *   3. Prefer localService voices (offline = higher quality)
 *   4. 15ms cancel-to-speak gap (Chrome/Safari requirement)
 *   5. pitch = 1.0 always (any other value causes distortion)
 *   6. Rate jitter ±0.02 for human-like variation
 *   7. Volume 0.92 (warmth, not "shouting")
 * 
 * Benchmarked against: ELSA Speak, LinguaKids, Google TTS
 */

export type Accent = 'en-US' | 'en-GB' | 'en-AU';

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

// ================================================================
// ACCENT PROFILES
// ================================================================
export const ACCENT_PROFILES: { id: string; k: Accent; flag: string; label: string; lang: string }[] = [
  { id: 'us', k: 'en-US', flag: '🇺🇸', label: 'American', lang: 'en-US' },
  { id: 'uk', k: 'en-GB', flag: '🇬🇧', label: 'British',  lang: 'en-GB' },
  { id: 'au', k: 'en-AU', flag: '🇦🇺', label: 'Australian', lang: 'en-AU' },
];

// ================================================================
// PLATFORM DETECTION
// ================================================================
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
// SMART VOICE FINDER (7-pass, production-grade)
// Priority: platform DB → enhanced/premium → localService → any
// ================================================================
let voiceCache: Record<string, SpeechSynthesisVoice> = {};

export function findBestVoice(accent: Accent): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;

  // Cache hit — avoid re-scanning voices every call
  if (voiceCache[accent]) return voiceCache[accent];

  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  const platform = detectPlatform();
  const lang = accent;
  const langBase = lang.split('-')[0];

  let found: SpeechSynthesisVoice | null = null;

  // Pass 1: Platform-specific voice DB
  const platDB = VOICE_DB[platform];
  if (!found && platDB?.[lang]) {
    const candidates = [...(platDB[lang].female || []), ...(platDB[lang].male || [])];
    for (const name of candidates) {
      const match = voices.find(v => v.name.includes(name));
      if (match) { found = match; break; }
    }
  }

  // Pass 2: Cross-platform DB
  if (!found) {
    for (const plat of Object.values(VOICE_DB)) {
      if (plat[lang]) {
        const candidates = [...(plat[lang].female || []), ...(plat[lang].male || [])];
        for (const name of candidates) {
          const match = voices.find(v => v.name.includes(name));
          if (match) { found = match; break; }
        }
        if (found) break;
      }
    }
  }

  // Pass 3: Enhanced/premium/natural
  if (!found) {
    const exactLang = voices.filter(v => v.lang === lang);
    found = exactLang.find(v => /enhanced|premium|natural/i.test(v.name)) || null;

    // Pass 4: Local service
    if (!found) found = exactLang.find(v => v.localService) || null;

    // Pass 5: Any exact lang
    if (!found && exactLang.length > 0) found = exactLang[0];
  }

  // Pass 6-7: Broader matches
  if (!found) {
    const prefixMatch = voices.filter(v => v.lang.startsWith(lang));
    found = prefixMatch.find(v => v.localService) || prefixMatch[0] || null;
  }
  if (!found) {
    const anyEn = voices.filter(v => v.lang.startsWith(langBase));
    found = anyEn.find(v => v.localService) || anyEn[0] || null;
  }

  // Cache for next call
  if (found) voiceCache[accent] = found;
  return found;
}

// Pre-warm voice cache when voices load
if (typeof window !== 'undefined' && window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    voiceCache = {}; // Clear cache when voices update
    findBestVoice('en-US');
    findBestVoice('en-GB');
    findBestVoice('en-AU');
  };
}

// ================================================================
// SPEAK — instant response, production-grade
// 
// Critical timing: Chrome/Safari REQUIRE ≥15ms gap between
// cancel() and speak(). Without this, utterance is silently dropped.
// ================================================================
let speakTimeout: ReturnType<typeof setTimeout> | null = null;

export function speak(
  text: string,
  accent: Accent,
  rate = 0.92,
  onEnd?: () => void
): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  // Clear any pending speak
  if (speakTimeout) { clearTimeout(speakTimeout); speakTimeout = null; }

  // Cancel ongoing speech
  window.speechSynthesis.cancel();

  // Build utterance immediately (while waiting for cancel to process)
  const u = new SpeechSynthesisUtterance(text);
  if (onEnd) u.onend = onEnd;
  u.onerror = () => { if (onEnd) onEnd(); };

  const voice = findBestVoice(accent);
  if (voice) u.voice = voice;
  u.lang = accent;
  u.rate = Math.max(0.7, Math.min(1.2, rate + (Math.random() - 0.5) * 0.04));
  u.pitch = 1.0;
  u.volume = 0.92;

  // 15ms gap: minimum for Chrome 120+, Safari 17+, Firefox
  speakTimeout = setTimeout(() => {
    window.speechSynthesis.speak(u);
    speakTimeout = null;
  }, 15);
}

// Alias for long passages (same engine, but can be enhanced later)
export const speakLongPassage = speak;

// ================================================================
// PLAYBACK CONTROLS
// ================================================================
export function pauseSpeech(): void { window.speechSynthesis?.pause(); }
export function resumeSpeech(): void { window.speechSynthesis?.resume(); }
export function stopSpeech(): void {
  if (speakTimeout) { clearTimeout(speakTimeout); speakTimeout = null; }
  window.speechSynthesis?.cancel();
}
export function isSpeaking(): boolean { return window.speechSynthesis?.speaking ?? false; }

// ================================================================
// DEBUG
// ================================================================
export function getVoiceDebugInfo(accent: Accent): string {
  const voice = findBestVoice(accent);
  if (!voice) return 'No voice available';
  return `🎤 ${voice.name} (${voice.lang}) ${voice.localService ? '🟢 Local' : '🌐 Network'}`;
}

export function getEngineStatus() {
  return { engine: 'Web Speech API (optimized)', ready: true, loading: false };
}

export function isNeuralReady(): boolean { return false; }
export async function loadNeuralEngine(): Promise<boolean> { return false; }
