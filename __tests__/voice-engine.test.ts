import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

class FakeSpeechSynthesisUtterance {
    text: string;
    lang = '';
    rate = 1;
    pitch = 1;
    volume = 1;
    voice: SpeechSynthesisVoice | null = null;
    onstart: (() => void) | null = null;
    onend: (() => void) | null = null;
    onerror: (() => void) | null = null;

    constructor(text: string) {
        this.text = text;
    }
}

function installSpeechSynthesisMock() {
    const speak = vi.fn((utterance: FakeSpeechSynthesisUtterance) => {
        utterance.onstart?.();
        utterance.onend?.();
    });
    const cancel = vi.fn();
    const pause = vi.fn();
    const resume = vi.fn();

    Object.defineProperty(globalThis, 'SpeechSynthesisUtterance', {
        configurable: true,
        value: FakeSpeechSynthesisUtterance,
    });
    Object.defineProperty(window, 'speechSynthesis', {
        configurable: true,
        value: {
            speaking: false,
            getVoices: () => [
                {
                    name: 'Samantha',
                    lang: 'en-US',
                    localService: true,
                    default: true,
                    voiceURI: 'Samantha',
                } as SpeechSynthesisVoice,
                {
                    name: 'Linh',
                    lang: 'vi-VN',
                    localService: true,
                    default: false,
                    voiceURI: 'Linh',
                } as SpeechSynthesisVoice,
            ],
            speak,
            cancel,
            pause,
            resume,
        },
    });

    return { speak, cancel, pause, resume };
}

describe('voice engine synchronous gesture playback guard', () => {
    beforeEach(() => {
        vi.resetModules();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('starts uncached long-passage playback synchronously within the user-gesture tick', async () => {
        const speech = installSpeechSynthesisMock();
        const { speakLongPassage, getEngineStatus } = await import('@/lib/voiceEngine');

        speakLongPassage('Life is like a box of chocolates. You never know what you will get.', 'en-US', 0.88);

        expect(speech.cancel).toHaveBeenCalledTimes(1);
        expect(speech.speak).toHaveBeenCalledTimes(1);

        const utterance = speech.speak.mock.calls[0][0] as FakeSpeechSynthesisUtterance;
        expect(utterance.pitch).toBe(1);
        expect(utterance.rate).toBeGreaterThanOrEqual(0.75);
        expect(utterance.rate).toBeLessThanOrEqual(1.1);
        expect(utterance.lang).toBe('en-US');
        expect(getEngineStatus().neuralLoading).toBe(false);
    });

    it('uses the same synchronous path for single word clicks', async () => {
        const speech = installSpeechSynthesisMock();
        const { speak } = await import('@/lib/voiceEngine');

        speak('museum', 'en-US', 0.75);

        expect(speech.speak).toHaveBeenCalledTimes(1);
        expect((speech.speak.mock.calls[0][0] as FakeSpeechSynthesisUtterance).text).toBe('museum');
    });

    it('auto-detects Vietnamese diacritics and switches lang to vi-VN', async () => {
        const speech = installSpeechSynthesisMock();
        const { speak } = await import('@/lib/voiceEngine');

        speak('Xin chào Việt Nam', 'en-US', 0.9);

        expect(speech.speak).toHaveBeenCalledTimes(1);
        const utterance = speech.speak.mock.calls[0][0] as FakeSpeechSynthesisUtterance;
        expect(utterance.lang).toBe('vi-VN');
    });
});
