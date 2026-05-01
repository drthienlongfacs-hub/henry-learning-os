'use client';

// ========================================
// InteractiveReader - Tap any word to see definition
// Bilingual popup: EN definition + VN translation
// Audio pronunciation + phonetic
// No external lookup needed - instant inline interaction
// ========================================

import { useState, useCallback, useRef, useEffect, useMemo, type CSSProperties, type ReactNode } from 'react';
import { Volume2, X, BookOpen, Loader2, Sparkles, Languages, Lightbulb, ListChecks, NotebookText } from 'lucide-react';
import type { DictionaryEntry } from '@/lib/resources/adapters/dictionary-adapter';
import type { ComprehensionCheck, KeyVocabularyEntry, ReadingSupport, SentenceGuide } from '@/data/textbook-library';

interface InteractiveReaderProps {
    text: string;
    keyVocabulary?: KeyVocabularyEntry[];
    viSummary?: string;
    title?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
    sentenceGuides?: SentenceGuide[];
    support?: ReadingSupport;
    comprehensionChecks?: ComprehensionCheck[];
    sourceAlignment?: string[];
    sourceNote?: string;
    licenseNote?: string;
    onWordLearned?: (word: string) => void;
}

interface WordPopupData {
    word: string;
    rect: DOMRect;
    localEntry?: KeyVocabularyEntry;
    dictEntry?: DictionaryEntry | null;
    loading: boolean;
}

type ReaderMode = 'text' | 'bilingual' | 'coach' | 'vocab';

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
    sentenceGuides = [],
    support,
    comprehensionChecks = [],
    sourceAlignment = [],
    sourceNote,
    licenseNote,
    onWordLearned,
}: InteractiveReaderProps) {
    const [popup, setPopup] = useState<WordPopupData | null>(null);
    const [learnedWords, setLearnedWords] = useState<Set<string>>(new Set());
    const [showSummary, setShowSummary] = useState(false);
    const [mode, setMode] = useState<ReaderMode>('text');
    const containerRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);

    // Build vocabulary lookup map
    const vocabMap = useMemo(() => {
        const map = new Map<string, KeyVocabularyEntry>();
        for (const entry of keyVocabulary) {
            map.set(entry.word.toLowerCase(), entry);
        }
        return map;
    }, [keyVocabulary]);

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
        let isNewWord = false;
        setLearnedWords(prev => {
            if (prev.has(word)) return prev;
            const next = new Set(prev);
            next.add(word);
            isNewWord = true;
            return next;
        });
        if (isNewWord) onWordLearned?.(word);

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
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleWordClick(token, e.currentTarget as HTMLElement);
                        }
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
        const left = Math.max(12, Math.min(rect.left - 60, viewportWidth - 320));

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

    const modeButtons: { id: ReaderMode; label: string; icon: ReactNode }[] = [
        { id: 'text', label: 'Đọc', icon: <BookOpen size={14} /> },
        { id: 'bilingual', label: 'Song ngữ', icon: <Languages size={14} /> },
        { id: 'coach', label: 'Câu khó', icon: <Lightbulb size={14} /> },
        { id: 'vocab', label: 'Từ vựng', icon: <NotebookText size={14} /> },
    ];

    const renderModeToolbar = () => (
        <div
            role="tablist"
            aria-label="Reader tools"
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
                gap: '0.35rem',
                marginBottom: '0.9rem',
                padding: '0.25rem',
                background: 'rgba(15, 23, 42, 0.04)',
                borderRadius: 12,
            }}
        >
            {modeButtons.map(button => (
                <button
                    key={button.id}
                    role="tab"
                    aria-selected={mode === button.id}
                    onClick={() => setMode(button.id)}
                    style={{
                        minHeight: 38,
                        border: 'none',
                        borderRadius: 10,
                        background: mode === button.id ? 'white' : 'transparent',
                        color: mode === button.id ? 'var(--color-primary, #6366f1)' : 'var(--color-text-secondary)',
                        boxShadow: mode === button.id ? '0 1px 8px rgba(15, 23, 42, 0.08)' : 'none',
                        fontWeight: 800,
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.35rem',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {button.icon}
                    {button.label}
                </button>
            ))}
        </div>
    );

    const renderBilingualMode = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {sentenceGuides.length > 0 ? sentenceGuides.map((item, index) => (
                <div key={`${item.en}-${index}`} style={{
                    border: '1px solid rgba(99, 102, 241, 0.14)',
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.05), rgba(255,255,255,0.78))',
                    borderRadius: 12,
                    padding: '0.85rem',
                }}>
                    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: '1rem', lineHeight: 1.65, fontWeight: 700 }}>
                        {item.en}
                    </div>
                    <div style={{ color: '#16a34a', fontSize: '0.86rem', lineHeight: 1.55, marginTop: '0.3rem', fontWeight: 700 }}>
                        {item.vi}
                    </div>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.78rem', lineHeight: 1.45, marginTop: '0.45rem' }}>
                        <strong>Điểm cần hiểu:</strong> {item.focus}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.45rem' }}>
                        {item.keyTerms.map(term => (
                            <span key={term} className="badge badge-primary" style={{ fontSize: '0.68rem' }}>
                                {term}
                            </span>
                        ))}
                    </div>
                </div>
            )) : (
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    Chưa có diễn giải từng câu cho bài đọc này.
                </div>
            )}
        </div>
    );

    const renderCoachMode = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {support && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '0.6rem',
                }}>
                    {[
                        { title: 'Trước khi đọc', items: support.beforeReading, color: '#2563eb' },
                        { title: 'Khi đang đọc', items: support.whileReading, color: '#7c3aed' },
                        { title: 'Sau khi đọc', items: support.afterReading, color: '#16a34a' },
                    ].map(block => (
                        <div key={block.title} style={{
                            border: `1px solid ${block.color}24`,
                            background: `${block.color}0f`,
                            borderRadius: 12,
                            padding: '0.8rem',
                        }}>
                            <div style={{ fontWeight: 900, color: block.color, fontSize: '0.82rem', marginBottom: '0.45rem' }}>
                                {block.title}
                            </div>
                            <ul style={{ margin: 0, paddingLeft: '1rem', color: 'var(--color-text-secondary)', fontSize: '0.76rem', lineHeight: 1.45 }}>
                                {block.items.map(item => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            {sentenceGuides.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 900, fontSize: '0.9rem' }}>
                        <ListChecks size={16} color="var(--color-primary, #6366f1)" />
                        Câu hỏi ngay trên bài
                    </div>
                    {sentenceGuides.map((item, index) => (
                        <details key={`${item.question}-${index}`} style={{
                            border: '1px solid rgba(15,23,42,0.08)',
                            borderRadius: 10,
                            padding: '0.65rem 0.8rem',
                            background: 'white',
                        }}>
                            <summary style={{ cursor: 'pointer', fontWeight: 800, fontSize: '0.82rem' }}>
                                {item.question}
                            </summary>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', lineHeight: 1.5, marginTop: '0.45rem' }}>
                                Gợi ý: {item.answerHint}
                            </div>
                        </details>
                    ))}
                </div>
            )}

            {comprehensionChecks.length > 0 && (
                <div style={{
                    border: '1px solid rgba(245, 158, 11, 0.22)',
                    background: 'rgba(245, 158, 11, 0.07)',
                    borderRadius: 12,
                    padding: '0.85rem',
                }}>
                    <div style={{ fontWeight: 900, fontSize: '0.88rem', marginBottom: '0.45rem' }}>
                        Kiểm tra hiểu bài
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                        {comprehensionChecks.map((check, index) => (
                            <details key={`${check.question}-${index}`}>
                                <summary style={{ cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}>
                                    {check.question}
                                </summary>
                                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.78rem', marginTop: '0.25rem' }}>
                                    Gợi ý trả lời: {check.answerHint}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    const renderVocabMode = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {keyVocabulary.map((v) => (
                <div key={v.word} style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(86px, 0.9fr) minmax(70px, 0.8fr) minmax(120px, 1.4fr)',
                    gap: '0.45rem',
                    alignItems: 'center',
                    padding: '0.6rem 0.7rem',
                    borderRadius: 10,
                    background: learnedWords.has(v.word.toLowerCase()) ? 'rgba(34,197,94,0.08)' : 'rgba(99,102,241,0.05)',
                    border: '1px solid rgba(99,102,241,0.08)',
                }}>
                    <span style={{ fontWeight: 900, color: 'var(--color-primary, #6366f1)', fontSize: '0.88rem' }}>{v.word}</span>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.72rem', fontStyle: 'italic' }}>{v.phonetic ?? v.partOfSpeech ?? ''}</span>
                    <span style={{ color: '#16a34a', fontWeight: 800, fontSize: '0.82rem' }}>{v.viMeaning}</span>
                </div>
            ))}
            {keyVocabulary.length === 0 && (
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Chưa có danh sách từ vựng cho bài này.</div>
            )}
        </div>
    );

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
                    <span>= Từ vựng chính (key word) - chạm để xem nghĩa</span>
                    <span style={{ marginLeft: 'auto' }}>
                        {learnedWords.size}/{keyVocabulary.length} đã xem
                    </span>
                </div>
            )}

            {renderModeToolbar()}

            {/* Interactive text body */}
            {mode === 'text' && (
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
            )}

            {mode === 'bilingual' && renderBilingualMode()}
            {mode === 'coach' && renderCoachMode()}
            {mode === 'vocab' && renderVocabMode()}

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

            {(sourceNote || licenseNote || sourceAlignment.length > 0) && (
                <div style={{
                    marginTop: '0.9rem',
                    padding: '0.75rem',
                    borderRadius: 12,
                    background: 'rgba(15, 23, 42, 0.035)',
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.72rem',
                    lineHeight: 1.45,
                }}>
                    {sourceNote && <div><strong>Nguồn:</strong> {sourceNote}</div>}
                    {licenseNote && <div><strong>Bản quyền:</strong> {licenseNote}</div>}
                    {sourceAlignment.length > 0 && (
                        <div><strong>Đối chiếu:</strong> {sourceAlignment.join(' • ')}</div>
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
