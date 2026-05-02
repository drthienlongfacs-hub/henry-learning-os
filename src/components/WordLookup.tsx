'use client';

// ========================================
// Word Lookup Popup — tap any word to see definition
// Uses Free Dictionary API (CC BY-SA 3.0, no key)
// Benchmark: Beyond Epic/KAK — dictionary integration
// ========================================

import React, { useState, useCallback } from 'react';
import { lookupWord, type DictionaryEntry } from '@/lib/resources/adapters/dictionary-adapter';
import { Book, Volume2, X, Loader2 } from 'lucide-react';

interface WordLookupProps {
    lang: string;
}

export function WordLookup({ lang }: WordLookupProps) {
    const [word, setWord] = useState('');
    const [entry, setEntry] = useState<DictionaryEntry | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);

    const lookup = useCallback(async () => {
        if (!word.trim()) return;
        setLoading(true);
        setError('');
        setEntry(null);
        const result = await lookupWord(word.trim());
        if (result) {
            setEntry(result);
        } else {
            setError(lang === 'vi' ? `Không tìm thấy "${word}"` : `No definition found for "${word}"`);
        }
        setLoading(false);
    }, [word, lang]);

    const playAudio = (url: string) => {
        const audio = new Audio(url);
        audio.play().catch(() => {});
    };

    return (
        <>
            {/* Trigger button */}
            <button onClick={() => setOpen(true)} style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '6px 14px', borderRadius: '12px', border: 'none',
                background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                color: '#166534', fontWeight: 600, fontSize: '0.72rem',
                cursor: 'pointer', transition: 'all 0.15s',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}>
                <Book size={14} />
                {lang === 'vi' ? '📖 Tra từ điển' : '📖 Dictionary'}
            </button>

            {/* Modal */}
            {open && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 1000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)',
                }} onClick={() => setOpen(false)}>
                    <div onClick={e => e.stopPropagation()} style={{
                        background: '#fff', borderRadius: '20px',
                        width: '90%', maxWidth: '420px', maxHeight: '70vh',
                        overflow: 'auto', padding: '1.25rem',
                        boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
                    }}>
                        {/* Header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <h3 style={{ margin: 0, fontWeight: 800, fontSize: '1rem', color: '#166534' }}>
                                📖 {lang === 'vi' ? 'Tra từ điển Anh' : 'English Dictionary'}
                            </h3>
                            <button onClick={() => setOpen(false)} style={{
                                border: 'none', background: '#f1f5f9', borderRadius: '50%',
                                width: 28, height: 28, cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}><X size={14} color="#64748b" /></button>
                        </div>

                        {/* Search */}
                        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem' }}>
                            <input
                                type="text"
                                value={word}
                                onChange={e => setWord(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && lookup()}
                                placeholder={lang === 'vi' ? 'Nhập từ tiếng Anh...' : 'Type an English word...'}
                                autoFocus
                                style={{
                                    flex: 1, padding: '8px 14px', borderRadius: '10px',
                                    border: '1px solid #e2e8f0', fontSize: '0.82rem',
                                    outline: 'none', background: '#f8fafc',
                                }}
                            />
                            <button onClick={lookup} disabled={loading} style={{
                                padding: '8px 16px', borderRadius: '10px', border: 'none',
                                background: '#166534', color: '#fff',
                                fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer',
                            }}>
                                {loading ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : (lang === 'vi' ? 'Tra' : 'Look up')}
                            </button>
                        </div>

                        {/* Result */}
                        {error && (
                            <div style={{ color: '#dc2626', fontSize: '0.75rem', padding: '0.5rem' }}>{error}</div>
                        )}

                        {entry && (
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                    <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#1e293b' }}>{entry.word}</span>
                                    {entry.phonetic && (
                                        <span style={{ fontSize: '0.75rem', color: '#6366f1', fontStyle: 'italic' }}>{entry.phonetic}</span>
                                    )}
                                    {entry.phonetics.filter(p => p.audio).map((p, i) => (
                                        <button key={i} onClick={() => playAudio(p.audio!)} style={{
                                            border: 'none', background: '#eef2ff', borderRadius: '50%',
                                            width: 24, height: 24, cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}>
                                            <Volume2 size={12} color="#4f46e5" />
                                        </button>
                                    ))}
                                </div>

                                {entry.meanings.map((m, mi) => (
                                    <div key={mi} style={{ marginBottom: '0.6rem' }}>
                                        <span style={{
                                            padding: '2px 8px', borderRadius: '6px',
                                            background: '#f0f9ff', color: '#0369a1',
                                            fontSize: '0.62rem', fontWeight: 700,
                                            textTransform: 'uppercase',
                                        }}>{m.partOfSpeech}</span>
                                        {m.definitions.slice(0, 3).map((d, di) => (
                                            <div key={di} style={{ margin: '0.3rem 0 0 0.5rem' }}>
                                                <div style={{ fontSize: '0.78rem', color: '#334155', lineHeight: 1.5 }}>
                                                    {di + 1}. {d.definition}
                                                </div>
                                                {d.example && (
                                                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontStyle: 'italic', margin: '0.15rem 0 0 0.5rem' }}>
                                                        "{d.example}"
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}

                                <div style={{ fontSize: '0.55rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                                    📋 Source: Free Dictionary API (CC BY-SA 3.0)
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
        </>
    );
}
