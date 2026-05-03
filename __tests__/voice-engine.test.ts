import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

class FakeSpeechSynthesisUtterance {
    text: string;
    lang = '';
    rate = 1;
    pitch = 1;
    volume = 1;
    voice: SpeechSynthesisVoice | null = null;
    onend: (() => void) | null = null;
    onerror: (() => void) | null = null;

    constructor(text: string) {
        this.text = text;
    }
}

function installSpeechSynthesisMock() {
    const speak = vi.fn((utterance: FakeSpeechSynthesisUtterance) => {
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
            ],
            speak,
            cancel,
            pause,
            resume,
        },
    });

    return { speak, cancel, pause, resume };
}

describe('voice engine latency guard', () => {
    beforeEach(() => {
        vi.resetModules();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    it('starts uncached long-passage playback through Web Speech after the 15ms cancel gap', async () => {
        const speech = installSpeechSynthesisMock();
        const { speakLongPassage } = await import('@/lib/voiceEngine');

        speakLongPassage('Life is like a box of chocolates. You never know what you will get.', 'en-US', 0.88);

        expect(speech.cancel).toHaveBeenCalled();
        expect(speech.speak).not.toHaveBeenCalled();

        vi.advanceTimersByTime(14);
        expect(speech.speak).not.toHaveBeenCalled();

        vi.advanceTimersByTime(1);
        expect(speech.speak).toHaveBeenCalledTimes(1);
        const utterance = speech.speak.mock.calls[0][0] as FakeSpeechSynthesisUtterance;
        expect(utterance.pitch).toBe(1);
        expect(utterance.rate).toBeGreaterThanOrEqual(0.7);
        expect(utterance.rate).toBeLessThanOrEqual(1.2);
    });

    it('uses the same instant path for word and sentence clicks', async () => {
        const speech = installSpeechSynthesisMock();
        const { speak } = await import('@/lib/voiceEngine');

        speak('museum', 'en-US', 0.75);
        vi.advanceTimersByTime(15);

        expect(speech.speak).toHaveBeenCalledTimes(1);
        expect((speech.speak.mock.calls[0][0] as FakeSpeechSynthesisUtterance).text).toBe('museum');
    });
});
