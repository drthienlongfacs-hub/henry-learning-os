import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getConfiguredVnTtsUrl,
  prefetchVietnameseSpeechToCache,
  setConfiguredVnTtsUrl,
  synthesizeWithVnTtsServer,
  VIENEU_DEFAULT_PRESETS,
} from '../src/lib/voice/vn-neural-cache';

describe('vn-neural-cache non-blocking Vietnamese VieNeu adapter', () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    vi.stubGlobal('window', {
      localStorage: {
        getItem: (k: string) => store.get(k) ?? null,
        setItem: (k: string, v: string) => {
          store.set(k, v);
        },
        removeItem: (k: string) => {
          store.delete(k);
        },
      },
    });
  });

  it('returns null quietly when no local vn-tts-hub URL is configured (static GitHub Pages mode)', async () => {
    expect(getConfiguredVnTtsUrl()).toBeNull();
    const fetchMock = vi.fn();
    const res = await synthesizeWithVnTtsServer('Chữ â ghép thanh sắc', { fetchImpl: fetchMock });
    expect(res).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('fetches MP3 ArrayBuffer with education_vi ITN profile and populates memory cache', async () => {
    setConfiguredVnTtsUrl('http://127.0.0.1:8787/');
    expect(getConfiguredVnTtsUrl()).toBe('http://127.0.0.1:8787');

    const payload = new Uint8Array([0x49, 0x44, 0x33, 0x03]).buffer;
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      arrayBuffer: async () => payload,
    });

    const cache = new Map<string, ArrayBuffer>();
    const ok = await prefetchVietnameseSpeechToCache(
      '3/4 lít bằng 0.75 lít',
      'vi-VN::sample',
      cache,
      { speed: 0.9, fetchImpl: fetchMock as unknown as typeof fetch }
    );

    expect(ok).toBe(true);
    expect(cache.get('vi-VN::sample')?.byteLength).toBe(4);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('http://127.0.0.1:8787/v1/audio/speech');
    const body = JSON.parse(init.body as string);
    expect(body.voice).toBe(VIENEU_DEFAULT_PRESETS['vi-VN']);
    expect(body.domain_profile).toBe('education_vi');
    expect(body.response_format).toBe('mp3');
  });

  it('swallows HTTP 500 or network failure without throwing (negative test)', async () => {
    setConfiguredVnTtsUrl('http://127.0.0.1:8787');
    const cache = new Map<string, ArrayBuffer>();
    const fetchErr = vi.fn().mockResolvedValue({ ok: false, status: 500 });

    const ok = await prefetchVietnameseSpeechToCache('Xin chào', 'vi-VN::err', cache, {
      fetchImpl: fetchErr as unknown as typeof fetch,
    });
    expect(ok).toBe(false);
    expect(cache.has('vi-VN::err')).toBe(false);
  });
});
