import { speak, stopSpeech, pauseSpeech, resumeSpeech, type Accent } from '@/lib/voiceEngine';

// ========================================
// Text-to-Speech Reader — "Read to Me" feature
// Uses centralized voiceEngine (Web Speech API, optimized)
// ========================================

import React, { useState, useCallback, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play, Settings2 } from 'lucide-react';

interface ReadToMeProps {
    text: string;
    lang?: 'en' | 'vi';
    label?: string;
}

export function ReadToMe({ text, lang = 'en', label }: ReadToMeProps) {
    const [playing, setPlaying] = useState(false);
    const [paused, setPaused] = useState(false);
    const [rate, setRate] = useState(0.85);
    const [showSettings, setShowSettings] = useState(false);
    const accent: Accent = 'en-US';

    const stop = useCallback(() => {
        stopSpeech();
        setPlaying(false);
        setPaused(false);
    }, []);

    useEffect(() => () => stop(), [stop]);

    const doSpeak = useCallback(() => {
        stop();
        setPlaying(true);
        setPaused(false);
        speak(text, accent, rate, () => {
            setPlaying(false);
            setPaused(false);
        });
    }, [text, accent, rate, stop]);



    const togglePause = () => {
        if (paused) {
            resumeSpeech();
            setPaused(false);
        } else {
            pauseSpeech();
            setPaused(true);
        }
    };

    if (typeof window === 'undefined') return null;

    return (
        <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            position: 'relative',
        }}>
            {!playing ? (
                <button onClick={doSpeak} style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    padding: '5px 12px', borderRadius: '20px', border: 'none',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    color: '#fff', fontWeight: 600, fontSize: '0.65rem',
                    cursor: 'pointer', transition: 'all 0.15s',
                }} title="Đọc to">
                    <Volume2 size={13} />
                    {label || (lang === 'vi' ? 'Nghe đọc' : 'Read to me')}
                </button>
            ) : (
                <>
                    <button onClick={togglePause} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: 28, height: 28, borderRadius: '50%', border: 'none',
                        background: '#eef2ff', color: '#4f46e5', cursor: 'pointer',
                    }}>
                        {paused ? <Play size={13} /> : <Pause size={13} />}
                    </button>
                    <button onClick={stop} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: 28, height: 28, borderRadius: '50%', border: 'none',
                        background: '#fef2f2', color: '#ef4444', cursor: 'pointer',
                    }}>
                        <VolumeX size={13} />
                    </button>
                </>
            )}

            {/* Speed settings */}
            <button onClick={() => setShowSettings(!showSettings)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 24, height: 24, borderRadius: '50%', border: 'none',
                background: showSettings ? '#e2e8f0' : 'transparent',
                color: '#94a3b8', cursor: 'pointer', fontSize: '0.6rem',
            }}>
                <Settings2 size={11} />
            </button>

            {showSettings && (
                <div style={{
                    position: 'absolute', top: '100%', right: 0, marginTop: '4px',
                    background: '#fff', borderRadius: '10px', padding: '8px 12px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)', border: '1px solid #e2e8f0',
                    zIndex: 10, minWidth: '140px',
                }}>
                    <div style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>
                        Tốc độ: {rate.toFixed(2)}x
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                        {[0.6, 0.75, 0.85, 1.0, 1.2].map(r => (
                            <button key={r} onClick={() => { setRate(r); setShowSettings(false); }} style={{
                                padding: '3px 8px', borderRadius: '6px', border: 'none',
                                background: rate === r ? '#4f46e5' : '#f1f5f9',
                                color: rate === r ? '#fff' : '#64748b',
                                fontSize: '0.58rem', fontWeight: 600, cursor: 'pointer',
                            }}>{r}x</button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
