/**
 * voiceEngine.ts — Production Voice Engine for Henry Learning OS
 * Ported from LinguaKids Voice Personality System (RCA-040v2)
 * 
 * Key design decisions (benchmarked against ELSA Speak, LinguaKids):
 * 1. Platform-aware voice DB — exact voice names per OS
 * 2. Prefer "enhanced"/"premium"/"natural" quality voices
 * 3. Prefer localService voices (offline = higher quality)
 * 4. 50ms delay after cancel() to avoid audio pipeline glitch
 * 5. pitch stays in SAFE range (0.97-1.03) — outside causes distortion
 * 6. Rate is PRIMARY differentiator (most audible, no distortion)
 * 7. Tiny rate jitter (±0.02) for human-like variation
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
    'en-AU': { female: ['Google Australian English Female', 'Google Australian English'], male: ['Google Australian English Male'] },
  },
  ios: {
    'en-US': { female: ['Samantha', 'Allison', 'Ava', 'Susan', 'Zoe', 'Nicky'], male: ['Aaron', 'Fred', 'Tom'] },
    'en-GB': { female: ['Serena', 'Kate', 'Fiona', 'Martha'], male: ['Daniel', 'Arthur', 'Oliver'] },
    'en-AU': { female: ['Karen', 'Catherine', 'Lee'], male: ['Gordon', 'James'] },
  },
  macos: {
    'en-US': { female: ['Samantha', 'Allison', 'Ava', 'Victoria', 'Zoe', 'Susan'], male: ['Alex', 'Tom', 'Fred'] },
    'en-GB': { female: ['Kate', 'Serena', 'Fiona', 'Martha'], male: ['Daniel', 'Oliver', 'Arthur'] },
    'en-AU': { female: ['Karen', 'Catherine', 'Lee'], male: ['Gordon', 'James'] },
  },
  windows: {
    'en-US': { female: ['Microsoft Aria', 'Microsoft Jenny', 'Microsoft Zira'], male: ['Microsoft Mark', 'Microsoft David', 'Microsoft Guy'] },
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
export function findBestVoice(accent: Accent): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;

  const platform = detectPlatform();
  const lang = accent; // en-US, en-GB, en-AU
  const langBase = lang.split('-')[0]; // 'en'

  // Pass 1: Platform-specific voice DB (highest quality match)
  const platDB = VOICE_DB[platform];
  if (platDB?.[lang]) {
    const candidates = [...(platDB[lang].female || []), ...(platDB[lang].male || [])];
    for (const name of candidates) {
      const match = voices.find(v => v.name.includes(name));
      if (match) return match;
    }
  }

  // Pass 2: Try ALL platforms' DB (cross-platform fallback)
  for (const plat of Object.values(VOICE_DB)) {
    if (plat[lang]) {
      const candidates = [...(plat[lang].female || []), ...(plat[lang].male || [])];
      for (const name of candidates) {
        const match = voices.find(v => v.name.includes(name));
        if (match) return match;
      }
    }
  }

  // Pass 3: Exact lang match — prefer enhanced/premium/natural quality
  const exactLang = voices.filter(v => v.lang === lang);
  const enhanced = exactLang.find(v =>
    v.name.toLowerCase().includes('enhanced') ||
    v.name.toLowerCase().includes('premium') ||
    v.name.toLowerCase().includes('natural')
  );
  if (enhanced) return enhanced;

  // Pass 4: Exact lang match — prefer localService (offline = higher quality)
  const localExact = exactLang.find(v => v.localService);
  if (localExact) return localExact;

  // Pass 5: Any exact lang match
  if (exactLang.length > 0) return exactLang[0];

  // Pass 6: Lang prefix match (e.g. en-GB-* for en-GB)
  const prefixMatch = voices.filter(v => v.lang.startsWith(lang));
  const localPrefix = prefixMatch.find(v => v.localService);
  if (localPrefix) return localPrefix;
  if (prefixMatch.length > 0) return prefixMatch[0];

  // Pass 7: Any English voice as last resort
  const anyEn = voices.filter(v => v.lang.startsWith(langBase));
  const localEn = anyEn.find(v => v.localService);
  return localEn || anyEn[0] || null;
}

// ================================================================
// SPEAK — Production-grade, benchmarked against ELSA/LinguaKids
// ================================================================
export function speak(
  text: string,
  accent: Accent,
  rate = 0.92,
  onEnd?: () => void
): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  // 50ms delay after cancel() — prevents audio pipeline glitch
  // (LinguaKids RCA-040: immediate speak() after cancel() causes crackling)
  setTimeout(() => {
    const u = new SpeechSynthesisUtterance(text);
    if (onEnd) u.onend = onEnd;
    u.onerror = () => { if (onEnd) onEnd(); };

    // Find the best voice for this accent + platform
    const voice = findBestVoice(accent);
    if (voice) u.voice = voice;
    u.lang = accent;

    // Rate + tiny jitter for human-like variation (±0.02)
    const jitter = (Math.random() - 0.5) * 0.04;
    u.rate = Math.max(0.7, Math.min(1.2, rate + jitter));

    // Pitch MUST stay in safe range — outside causes distortion on ALL platforms
    // Android safe: 0.95-1.10, Desktop safe: 0.93-1.12
    // We use 1.0 (neutral) for maximum naturalness
    u.pitch = 1.0;

    // Volume slightly below max for warmth (not "shouting")
    u.volume = 0.92;

    window.speechSynthesis.speak(u);
  }, 50);
}

// ================================================================
// PLAYBACK CONTROLS
// ================================================================
export function pauseSpeech(): void { window.speechSynthesis?.pause(); }
export function resumeSpeech(): void { window.speechSynthesis?.resume(); }
export function stopSpeech(): void { window.speechSynthesis?.cancel(); }
export function isSpeaking(): boolean { return window.speechSynthesis?.speaking ?? false; }
export function isPaused(): boolean { return window.speechSynthesis?.paused ?? false; }

// ================================================================
// VOICE DEBUG — show what voice is actually being used
// ================================================================
export function getVoiceDebugInfo(accent: Accent): string {
  const voice = findBestVoice(accent);
  if (!voice) return 'No voice available';
  return `${voice.name} (${voice.lang}) ${voice.localService ? '🟢 Local' : '🌐 Network'}`;
}
