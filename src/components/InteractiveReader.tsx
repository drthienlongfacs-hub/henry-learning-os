'use client';

// ========================================
// InteractiveReader — Tap any word to see definition
// Bilingual popup: EN definition + VN translation
// Audio pronunciation + phonetic
// No external lookup needed — instant inline interaction
// ========================================

import { useState, useCallback, useRef, useEffect, type CSSProperties, type ReactNode } from 'react';
import { Volume2, X, BookOpen, Loader2, Sparkles } from 'lucide-react';
import type { DictionaryEntry } from '@/lib/resources/adapters/dictionary-adapter';

interface KeyVocabEntry {
    word: string;
    viMeaning: string;
    phonetic?: string;
}

interface InteractiveReaderProps {
    text: string;
    keyVocabulary?: KeyVocabEntry[];
    viSummary?: string;
    title?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    onWordLearned?: (word: string) => void;
}

interface WordPopupData {
    word: string;
    rect: DOMRect;
    localEntry?: KeyVocabEntry;
    dictEntry?: DictionaryEntry | null;
    loading: boolean;
}

const DIFFICULTY_COLORS: Record<string, string> = {
    easy: '#22c55e',
    medium: '#f59e0b',
    hard: '#ef4444',
};

export function InteractiveReader({
    text,
    keyVocabulary = [],
    viSummary,
    title,
    difficulty,
    onWordLearned,
}: InteractiveReaderProps) {
    const [popup, setPopup] = useState<WordPopupData | null>(null);
    const [learnedWords, setLearnedWords] = useState<Set<string>>(new Set());
    const [showSummary, setShowSummary] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    // Build vocabulary lookup map
    const vocabMap = useCallback(() => {
        const map = new Map<string, KeyVocabEntry>();
        for (const entry of keyVocabulary) {
            map.set(entry.word.toLowerCase(), entry);
        }
        return map;
    }, [keyVocabulary])();

    // Close popup on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
                setPopup(null);
            }
        };
        if (popup) {
            document.addEventListener('mousedown', handler);
            return () => document.removeEventListener('mousedown', handler);
        }
    }, [popup]);

    const handleWordClick = useCallback(async (cleanWord: string, element: HTMLElement) => {
        const word = cleanWord.toLowerCase().replace(/[^a-zA-Z'-]/g, '');
        if (!word || word.length < 2) return;

        const rect = element.getBoundingClientRect();
        const localEntry = vocabMap.get(word);

        // Show popup immediately with local data
        setPopup({ word, rect, localEntry, dictEntry: undefined, loading: true });

        // Mark as learned
        setLearnedWords(prev => {
            const next = new Set(prev);
            next.add(word);
            return next;
        });
        onWordLearned?.(word);

        // Fetch dictionary data in background
        try {
            const { lookupWord } = await import('@/lib/resources/adapters/dictionary-adapter');
            const entry = await lookupWord(word);
            setPopup(prev => prev?.word === word ? { ...prev, dictEntry: entry, loading: false } : prev);
        } catch {
            setPopup(prev => prev?.word === word ? { ...prev, dictEntry: null, loading: false } : prev);
        }
    }, [vocabMap, onWordLearned]);

    const playAudio = (url: string) => {
        const audio = new Audio(url);
        audio.play().catch(() => {});
    };

    // Split text into words, keeping punctuation attached
    const renderInteractiveText = (): ReactNode[] => {
        const tokens = text.split(/(\s+)/);
        return tokens.map((token, i) => {
            if (/^\s+$/.test(token)) return <span key={i}>{token}</span>;

            const cleanWord = token.replace(/[^a-zA-Z'-]/g, '').toLowerCase();
            const isKey = vocabMap.has(cleanWord);
            const isLearned = learnedWords.has(cleanWord);

            const wordStyle: CSSProperties = {
                cursor: 'pointer',
                borderRadius: '3px',
                padding: '1px 2px',
                margin: '0 -2px',
                transition: 'all 0.15s ease',
                ...(isKey ? {
                    background: isLearned
                        ? 'rgba(34, 197, 94, 0.12)'
                        : 'rgba(99, 102, 241, 0.1)',
                    borderBottom: `2px solid ${isLearned ? '#22c55e' : 'rgba(99, 102, 241, 0.4)'}`,
                    fontWeight: 600,
                } : {
                    background: isLearned ? 'rgba(34, 197, 94, 0.06)' : 'transparent',
                }),
            };

            return (
                <span
                    key={i}
                    style={wordStyle}
                    onClick={(e) => handleWordClick(token, e.currentTarget as HTMLElement)}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                            isKey ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background =
                            isKey
                                ? isLearned ? 'rgba(34, 197, 94, 0.12)' : 'rgba(99, 102, 241, 0.1)'
                                : isLearned ? 'rgba(34, 197, 94, 0.06)' : 'transparent';
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Look up: ${cleanWord}`}
                >
                    {token}
                </span>
            );
        });
    };

    // Position popup relative to viewport
    const getPopupPosition = (): CSSProperties => {
        if (!popup) return { display: 'none' };
        const { rect } = popup;
        const scrollY = window.scrollY;
        const viewportWidth = window.innerWidth;

        let top = rect.bottom + scrollY + 8;
        let left = Math.max(12, Math.min(rect.left - 60, viewportWidth - 320));

        // If popup would go below viewport, show above
        if (rect.bottom + 250 > window.innerHeight) {
            top = rect.top + scrollY - 260;
        }

        return {
            position: 'absolute' as const,
            top: `${top}px`,
            left: `${left}px`,
            width: 'min(calc(100vw - 24px), 320px)',
            zIndex: 9999,
        };
    };

    return (
        <div ref={containerRef} style={{ position: 'relative' }}>
            {/* Title + difficulty */}
            {title && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <BookOpen size={18} style={{ color: 'var(--color-primary, #6366f1)' }} />
                    <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>{title}</span>
                    {difficulty && (
                        <span style={{
                            padding: '2px 8px', borderRadius: 999,
                            fontSize: '0.65rem', fontWeight: 700,
                            background: `${DIFFICULTY_COLORS[difficulty]}18`,
                            color: DIFFICULTY_COLORS[difficulty],
                        }}>
                            {difficulty.toUpperCase()}
                        </span>
                    )}
                </div>
            )}

            {/* Key vocabulary legend */}
            {keyVocabulary.length > 0 && (
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    marginBottom: '0.75rem', fontSize: '0.72rem', color: 'var(--color-text-muted)',
                }}>
                    <span style={{
                        display: 'inline-block', width: 12, height: 12,
                        borderRadius: 2, background: 'rgba(99, 102, 241, 0.15)',
                        borderBottom: '2px solid rgba(99, 102, 241, 0.5)',
                    }} />
                    <span>= Từ vựng chính (key word) — chạm để xem nghĩa</span>
                    <span style={{ marginLeft: 'auto' }}>
                        {learnedWords.size}/{keyVocabulary.length} đã xem
                    </span>
                </div>
            )}

            {/* Interactive text body */}
            <div style={{
                fontSize: '1.05rem',
                lineHeight: 2,
                letterSpacing: '0.01em',
                color: 'var(--color-text, #1a1a2e)',
                fontFamily: "'Georgia', 'Times New Roman', serif",
                userSelect: 'none',
                WebkitUserSelect: 'none',
            }}>
                {renderInteractiveText()}
            </div>

            {/* Vietnamese summary toggle */}
            {viSummary && (
                <div style={{ marginTop: '1rem' }}>
                    <button
                        onClick={() => setShowSummary(!showSummary)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.4rem',
                            background: 'rgba(99, 102, 241, 0.08)', border: 'none',
                            borderRadius: 8, padding: '0.5rem 0.85rem', cursor: 'pointer',
                            fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary, #6366f1)',
                            transition: 'all 0.15s',
                        }}
                    >
                        <Sparkles size={14} />
                        {showSummary ? 'Ẩn tóm tắt tiếng Việt' : '🇻🇳 Xem tóm tắt tiếng Việt'}
                    </button>
                    {showSummary && (
                        <div style={{
                            marginTop: '0.5rem', padding: '0.75rem 1rem',
                            background: 'rgba(99, 102, 241, 0.04)',
                            borderLeft: '3px solid var(--color-primary, #6366f1)',
                            borderRadius: '0 8px 8px 0',
                            fontSize: '0.9rem', lineHeight: 1.6,
                            color: 'var(--color-text-secondary)',
                            animation: 'fadeIn 0.3s ease',
                        }}>
                            {viSummary}
                        </div>
                    )}
                </div>
            )}

            {/* Word definition popup */}
            {popup && (
                <div ref={popupRef} style={{
                    ...getPopupPosition(),
                    background: 'var(--color-card-bg, #fff)',
                    borderRadius: 14,
                    boxShadow: '0 12px 40px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)',
                    padding: '1rem',
                    animation: 'fadeIn 0.2s ease',
                }}>
                    {/* Close button */}
                    <button
                        onClick={() => setPopup(null)}
                        style={{
                            position: 'absolute', top: 6, right: 6,
                            background: 'none', border: 'none', cursor: 'pointer',
                            padding: 4, borderRadius: '50%', color: 'var(--color-text-muted)',
                        }}
                    >
                        <X size={14} />
                    </button>

                    {/* Word header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--color-primary, #6366f1)' }}>
                            {popup.word}
                        </span>

                        {/* Phonetic from local or dict */}
                        {(popup.localEntry?.phonetic || popup.dictEntry?.phonetic) && (
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                                {popup.localEntry?.phonetic || popup.dictEntry?.phonetic}
                            </span>
                        )}

                        {/* Audio button */}
                        {popup.dictEntry?.phonetics?.find(p => p.audio) && (
                            <button
                                onClick={() => playAudio(popup.dictEntry!.phonetics.find(p => p.audio)!.audio!)}
                                style={{
                                    background: 'rgba(99, 102, 241, 0.1)', border: 'none',
                                    borderRadius: '50%', width: 28, height: 28,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                <Volume2 size={14} color="var(--color-primary, #6366f1)" />
                            </button>
                        )}
                    </div>

                    {/* Vietnamese meaning (from built-in vocabulary) */}
                    {popup.localEntry && (
                        <div style={{
                            padding: '0.45rem 0.7rem',
                            background: 'rgba(34, 197, 94, 0.08)',
                            borderRadius: 8,
                            marginBottom: '0.5rem',
                            display: 'flex', alignItems: 'center', gap: '0.4rem',
                        }}>
                            <span style={{ fontSize: '0.85rem' }}>🇻🇳</span>
                            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#16a34a' }}>
                                {popup.localEntry.viMeaning}
                            </span>
                        </div>
                    )}

                    {/* English definitions from API */}
                    {popup.loading && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.5rem 0' }}>
                            <Loader2 size={14} className="animate-spin" />
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                Loading definition...
                            </span>
                        </div>
                    )}

                    {popup.dictEntry && (
                        <div>
                            {popup.dictEntry.meanings.slice(0, 2).map((meaning, i) => (
                                <div key={i} style={{ marginBottom: '0.4rem' }}>
                                    <span style={{
                                        fontSize: '0.65rem', fontWeight: 700,
                                        color: 'var(--color-primary)', textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                    }}>
                                        {meaning.partOfSpeech}
                                    </span>
                                    {meaning.definitions.slice(0, 1).map((def, j) => (
                                        <div key={j}>
                                            <p style={{ fontSize: '0.82rem', margin: '2px 0', lineHeight: 1.4 }}>
                                                {def.definition}
                                            </p>
                                            {def.example && (
                                                <p style={{
                                                    fontSize: '0.75rem', color: 'var(--color-text-muted)',
                                                    fontStyle: 'italic', margin: '2px 0',
                                                }}>
                                                    &ldquo;{def.example}&rdquo;
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}

                    {!popup.loading && popup.dictEntry === null && !popup.localEntry && (
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                            No definition found for this word.
                        </p>
                    )}

                    {/* Source attribution */}
                    <div style={{
                        marginTop: '0.5rem', paddingTop: '0.4rem',
                        borderTop: '1px solid rgba(0,0,0,0.06)',
                        fontSize: '0.6rem', color: 'var(--color-text-muted)',
                    }}>
                        {popup.dictEntry && 'Free Dictionary API • '}
                        {popup.localEntry && 'Từ vựng tích hợp sẵn'}
                    </div>
                </div>
            )}
        </div>
    );
}
