/**
 * Optional non-blocking local VieNeu-TTS v3 Turbo background cache adapter for Tiếng Việt.
 *
 * Preserves synchronous Web Speech API playback inside user tap gestures (iOS Safari fix)
 * while silently warming `memoryAudioCache` when a local `vn-tts-hub` OpenAI-compatible
 * endpoint is configured via `localStorage.henry_vn_tts_url` or `NEXT_PUBLIC_VN_TTS_URL`.
 */

export const VIENEU_DEFAULT_PRESETS: Record<'vi-VN', string> = {
  'vi-VN': 'Mai Anh',
};

const STORAGE_KEY = 'henry_vn_tts_url';
const inFlightKeys = new Set<string>();

export function getConfiguredVnTtsUrl(): string | null {
  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage?.getItem(STORAGE_KEY)?.trim();
      if (stored) return stored.replace(/\/+$/, '');
    } catch {
      // Ignore sandboxed storage access errors.
    }
  }
  const envUrl =
    typeof process !== 'undefined' ? process.env?.NEXT_PUBLIC_VN_TTS_URL?.trim() : undefined;
  return envUrl ? envUrl.replace(/\/+$/, '') : null;
}

export function setConfiguredVnTtsUrl(url: string | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (!url || !url.trim()) {
      window.localStorage?.removeItem(STORAGE_KEY);
    } else {
      window.localStorage?.setItem(STORAGE_KEY, url.trim().replace(/\/+$/, ''));
    }
  } catch {
    // Ignore sandboxed storage access errors.
  }
}

export async function synthesizeWithVnTtsServer(
  text: string,
  opts?: {
    baseUrl?: string | null;
    voice?: string;
    speed?: number;
    timeoutMs?: number;
    fetchImpl?: typeof fetch;
  }
): Promise<ArrayBuffer | null> {
  const baseUrl = (opts?.baseUrl ?? getConfiguredVnTtsUrl())?.trim();
  const cleanText = text.trim();
  if (!baseUrl || !cleanText) return null;

  const fetchFn = opts?.fetchImpl ?? (typeof fetch !== 'undefined' ? fetch : undefined);
  if (!fetchFn) return null;

  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutMs = opts?.timeoutMs ?? 4500;
  const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;

  try {
    const res = await fetchFn(`${baseUrl.replace(/\/+$/, '')}/v1/audio/speech`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'vieneu-v3-turbo',
        input: cleanText,
        voice: opts?.voice ?? VIENEU_DEFAULT_PRESETS['vi-VN'],
        response_format: 'mp3',
        speed: opts?.speed ?? 1.0,
        domain_profile: 'education_vi',
      }),
      signal: controller?.signal,
    });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    return buf && buf.byteLength > 0 ? buf : null;
  } catch {
    return null;
  } finally {
    if (timer !== null) clearTimeout(timer);
  }
}

export async function prefetchVietnameseSpeechToCache(
  text: string,
  cacheKey: string,
  memoryCache: Map<string, ArrayBuffer>,
  opts?: {
    speed?: number;
    baseUrl?: string | null;
    fetchImpl?: typeof fetch;
  }
): Promise<boolean> {
  if (!text.trim() || memoryCache.has(cacheKey) || inFlightKeys.has(cacheKey)) {
    return false;
  }
  const baseUrl = opts?.baseUrl ?? getConfiguredVnTtsUrl();
  if (!baseUrl) return false;

  inFlightKeys.add(cacheKey);
  try {
    const audio = await synthesizeWithVnTtsServer(text, {
      baseUrl,
      speed: opts?.speed ?? 1.0,
      fetchImpl: opts?.fetchImpl,
    });
    if (audio && audio.byteLength > 0) {
      memoryCache.set(cacheKey, audio);
      return true;
    }
    return false;
  } finally {
    inFlightKeys.delete(cacheKey);
  }
}
