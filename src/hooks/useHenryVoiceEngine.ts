'use client';

import { useEffect, useState } from 'react';
import {
    getHenryVoiceEngineSnapshot,
    subscribeHenryVoiceEngine,
    warmHenryNeuralVoice,
    type HenryVoiceSnapshot,
} from '@/lib/voice/neural-voice-engine';

export function useHenryVoiceEngine(options: { preload?: boolean } = {}) {
    const [snapshot, setSnapshot] = useState<HenryVoiceSnapshot>(() => getHenryVoiceEngineSnapshot());

    useEffect(() => {
        const unsubscribe = subscribeHenryVoiceEngine(setSnapshot);
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (!options.preload) return;
        void warmHenryNeuralVoice().catch(() => undefined);
    }, [options.preload]);

    return snapshot;
}
