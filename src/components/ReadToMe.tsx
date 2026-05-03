'use client';

// ========================================
// Text-to-Speech Reader — "Read to Me" feature
// Benchmark: Epic! Read-to-Me, Reading Eggs audio
// Uses Web Speech API (built into browsers, no API key needed)
// ========================================

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play, SkipForward, Settings2 } from 'lucide-react';

interface ReadToMeProps {
    text: string;
    lang?: 'en' | 'vi';
    label?: string;
}

export function ReadToMe({ text, lang = 'en', label }: ReadToMeProps) {
    const [playing, setPlaying] = useState(false);
    const [paused, setPaused] = useState(false);
    const [rate, setRate] = useState(0.85); // Slower for kids
    const [showSettings, setShowSettings] = useState(false);
    const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

    const stop = useCallback(() => {
        window.speechSynthesis?.cancel();
        setPlaying(false);
        setPaused(false);
    }, []);

    useEffect(() => () => stop(), [stop]);

    const speak = useCallback(() => {
        if (!window.speechSynthesis) return;
        stop();

        const utter = new SpeechSynthesisUtterance(text);
        utter.rate = rate;
        utter.pitch = 1.05;

        // Find best voice — check fresh every time
        const voices = window.speechSynthesis.getVoices();
        let preferred: SpeechSynthesisVoice | undefined;
        if (lang === 'vi') {
            preferred = voices.find(v => v.lang.startsWith('vi'));
        } else {
            // Try specific high-quality names first
            const enNames = ['Samantha','Allison','Ava','Tom','Alex','Google US English'];
            for (const n of enNames) { preferred = voices.find(v => v.name.includes(n)); if (preferred) break; }
            if (!preferred) preferred = voices.find(v => v.lang === 'en-US') || voices.find(v => v.lang.startsWith('en'));
        }
        utter.lang = lang === 'vi' ? 'vi-VN' : 'en-US';
        if (preferred) utter.voice = preferred;

        utter.onend = () => { setPlaying(false); setPaused(false); };
        utter.onerror = () => { setPlaying(false); setPaused(false); };

        utterRef.current = utter;
        window.speechSynthesis.speak(utter);
        setPlaying(true);
        setPaused(false);
    }, [text, lang, rate, stop]);

    const togglePause = () => {
        if (!window.speechSynthesis) return;
        if (paused) {
            window.speechSynthesis.resume();
            setPaused(false);
        } else {
            window.speechSynthesis.pause();
            setPaused(true);
        }
    };

    if (typeof window !== 'undefined' && !window.speechSynthesis) return null;

    return (
        <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            position: 'relative',
        }}>
            {!playing ? (
                <button onClick={speak} style={{
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
