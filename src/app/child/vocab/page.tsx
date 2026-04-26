'use client';

// ========================================
// Vocabulary Game — Word Lookup + Quiz
// Uses Free Dictionary API for definitions
// Learning events emitted for mastery tracking
// ========================================

import { useState, useCallback } from 'react';
import { useTranslation } from '@/lib/i18n';
import { LangToggle } from '@/components/LangToggle';
import { useAppStore } from '@/stores/app-store';
import { emitLearningEvent } from '@/lib/events/learning-events';
import Link from 'next/link';
import {
    ArrowLeft, Search, BookOpen, Home, RotateCcw,
    Brain, Sparkles, Volume2, CheckCircle2, XCircle, Loader2,
} from 'lucide-react';
import type { DictionaryEntry } from '@/lib/resources/adapters/dictionary-adapter';

type GamePhase = 'lookup' | 'define' | 'quiz' | 'result';

interface VocabQuiz {
    word: string;
    correctDef: string;
    options: string[];
    partOfSpeech: string;
}

// Distractor definitions for quiz
const DISTRACTORS = [
    'A large body of water surrounded by land',
    'The process of making something smaller',
    'A tool used for measuring temperature',
    'An agreement between two or more parties',
    'A sudden burst of energy or light',
    'The act of moving from one place to another',
    'A container used for storing liquids',
    'The quality of being kind and generous',
    'A machine that converts energy into motion',
    'The study of past events and their causes',
    'A pattern or design used for decoration',
    'The ability to understand complex ideas',
];

function shuffleArray<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export default function VocabPage() {
    const { t } = useTranslation();
    const childProfile = useAppStore(s => s.childProfile);

    const [word, setWord] = useState('');
    const [entry, setEntry] = useState<DictionaryEntry | null>(null);
    const [loading, setLoading] = useState(false);
    const [phase, setPhase] = useState<GamePhase>('lookup');
    const [quiz, setQuiz] = useState<VocabQuiz | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [wordHistory, setWordHistory] = useState<string[]>([]);

    const lookupWord = useCallback(async () => {
        if (!word.trim()) return;
        setLoading(true);
        try {
            const { lookupWord: lookup } = await import('@/lib/resources/adapters/dictionary-adapter');
            const result = await lookup(word.trim());
            setEntry(result);
            setPhase(result ? 'define' : 'lookup');
            if (result) {
                setWordHistory(prev => [word.trim().toLowerCase(), ...prev.filter(w => w !== word.trim().toLowerCase())].slice(0, 20));
            }
        } catch {
            setEntry(null);
        } finally {
            setLoading(false);
        }
    }, [word]);

    const startQuiz = useCallback(() => {
        if (!entry) return;
        const correctDef = entry.meanings[0]?.definitions[0]?.definition ?? '';
        const partOfSpeech = entry.meanings[0]?.partOfSpeech ?? '';

        // Pick 3 random distractors
        const distractors = shuffleArray(DISTRACTORS.filter(d => d !== correctDef)).slice(0, 3);
        const options = shuffleArray([correctDef, ...distractors]);

        setQuiz({ word: entry.word, correctDef, options, partOfSpeech });
        setSelectedAnswer(null);
        setPhase('quiz');
    }, [entry]);

    const handleQuizAnswer = useCallback((answer: string) => {
        if (!quiz || selectedAnswer) return;
        setSelectedAnswer(answer);
        const isCorrect = answer === quiz.correctDef;

        setScore(prev => ({
            correct: prev.correct + (isCorrect ? 1 : 0),
            total: prev.total + 1,
        }));

        // Emit learning event
        if (childProfile) {
            emitLearningEvent({
                childId: childProfile.id,
                verb: isCorrect ? 'completed' : 'attempted',
                object: `skill:vocabulary.${quiz.word}`,
                module: 'reading',
                resourceProvider: 'free-dictionary',
                success: isCorrect,
                score: isCorrect ? 1.0 : 0,
            });
        }

        setPhase('result');
    }, [quiz, selectedAnswer, childProfile]);

    const nextWord = () => {
        setWord('');
        setEntry(null);
        setQuiz(null);
        setSelectedAnswer(null);
        setPhase('lookup');
    };

    const playAudio = (audioUrl: string) => {
        const audio = new Audio(audioUrl);
        audio.play().catch(() => { });
    };

    return (
        <div style={{ paddingBottom: '5rem', background: 'var(--color-bg-child)', minHeight: '100dvh' }}>
            <div className="page-container">
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Link href="/child"><button className="btn btn-ghost btn-sm"><ArrowLeft size={18} /></button></Link>
                        <h1 style={{ fontWeight: 800, fontSize: '1.5rem' }}>
                            {t('vocab_title') || 'Vocabulary Builder'}
                        </h1>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <LangToggle />
                        {score.total > 0 && (
                            <span className="badge badge-primary" style={{ fontWeight: 700 }}>
                                {score.correct}/{score.total}
                            </span>
                        )}
                    </div>
                </div>

                {/* Search */}
                {phase === 'lookup' && (
                    <div className="card animate-fade-in" style={{ marginBottom: '1rem' }}>
                        <h3 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>
                            {t('vocab_search_word') || 'Look up a word'}
                        </h3>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                className="input-field"
                                placeholder={t('vocab_type_word') || 'Type an English word...'}
                                value={word}
                                onChange={e => setWord(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && lookupWord()}
                                style={{ flex: 1 }}
                            />
                            <button className="btn btn-primary" onClick={lookupWord} disabled={loading || !word.trim()}>
                                {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                            </button>
                        </div>

                        {/* Recent words */}
                        {wordHistory.length > 0 && (
                            <div style={{ marginTop: '0.75rem' }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                                    Recent words:
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                                    {wordHistory.slice(0, 8).map(w => (
                                        <button
                                            key={w}
                                            className="badge badge-primary"
                                            style={{ cursor: 'pointer', fontSize: '0.75rem' }}
                                            onClick={() => { setWord(w); }}
                                        >
                                            {w}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Definition View */}
                {phase === 'define' && entry && (
                    <div className="card animate-fade-in" style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <h2 style={{ fontWeight: 800, fontSize: '1.75rem', color: 'var(--color-primary)' }}>
                                {entry.word}
                            </h2>
                            {entry.phonetics?.find(p => p.audio) && (
                                <button
                                    className="btn btn-ghost btn-sm"
                                    onClick={() => playAudio(entry.phonetics.find(p => p.audio)!.audio!)}
                                >
                                    <Volume2 size={18} />
                                </button>
                            )}
                            {entry.phonetic && (
                                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                                    {entry.phonetic}
                                </span>
                            )}
                        </div>

                        {entry.meanings.map((meaning, i) => (
                            <div key={i} style={{ marginBottom: '1rem' }}>
                                <span className="badge" style={{
                                    background: 'var(--color-primary-light, #e0e7ff)',
                                    color: 'var(--color-primary)',
                                    fontWeight: 600,
                                    marginBottom: '0.5rem',
                                    display: 'inline-block',
                                }}>
                                    {meaning.partOfSpeech}
                                </span>
                                {meaning.definitions.slice(0, 2).map((def, j) => (
                                    <div key={j} style={{ marginBottom: '0.5rem', paddingLeft: '0.75rem', borderLeft: '3px solid var(--color-primary, #6366f1)' }}>
                                        <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>{def.definition}</p>
                                        {def.example && (
                                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontStyle: 'italic', marginTop: '0.25rem' }}>
                                                &ldquo;{def.example}&rdquo;
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}

                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                            <button className="btn btn-primary" onClick={startQuiz} style={{ flex: 1 }}>
                                {t('vocab_test_me') || 'Test me!'}
                            </button>
                            <button className="btn btn-ghost" onClick={nextWord}>
                                {t('vocab_new_word') || 'New word'}
                            </button>
                        </div>

                        <div style={{ marginTop: '0.75rem' }}>
                            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                                Source: Free Dictionary API | dictionaryapi.dev
                            </span>
                        </div>
                    </div>
                )}

                {/* Quiz Phase */}
                {phase === 'quiz' && quiz && (
                    <div className="card animate-fade-in" style={{ marginBottom: '1rem' }}>
                        <h3 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>
                            {t('vocab_quiz_question') || 'What does this word mean?'}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <span style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--color-primary)' }}>
                                {quiz.word}
                            </span>
                            <span className="badge" style={{
                                background: 'var(--color-primary-light, #e0e7ff)',
                                color: 'var(--color-primary)',
                            }}>
                                {quiz.partOfSpeech}
                            </span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {quiz.options.map((opt, i) => (
                                <button
                                    key={i}
                                    className="card"
                                    onClick={() => handleQuizAnswer(opt)}
                                    style={{
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        padding: '0.75rem 1rem',
                                        fontSize: '0.9rem',
                                        border: '2px solid transparent',
                                        transition: 'all 0.15s',
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary, #6366f1)';
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                                    }}
                                >
                                    <span style={{ fontWeight: 600, marginRight: '0.5rem', color: 'var(--color-primary)' }}>
                                        {String.fromCharCode(65 + i)}.
                                    </span>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Result Phase */}
                {phase === 'result' && quiz && selectedAnswer && (
                    <div className="card animate-fade-in" style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            {selectedAnswer === quiz.correctDef ? (
                                <>
                                    <CheckCircle2 size={28} color="#22c55e" />
                                    <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#22c55e' }}>
                                        {t('vocab_correct') || 'Correct!'}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <XCircle size={28} color="#ef4444" />
                                    <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#ef4444' }}>
                                        {t('vocab_incorrect') || 'Not quite!'}
                                    </span>
                                </>
                            )}
                        </div>

                        <div style={{ marginBottom: '1rem', padding: '0.75rem', borderLeft: '3px solid var(--color-primary)', background: 'var(--color-primary-light, rgba(99,102,241,0.05))' }}>
                            <p style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                                <span style={{ color: 'var(--color-primary)' }}>{quiz.word}</span> ({quiz.partOfSpeech}):
                            </p>
                            <p style={{ fontSize: '0.9rem' }}>{quiz.correctDef}</p>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="btn btn-primary" onClick={nextWord} style={{ flex: 1 }}>
                                {t('vocab_next') || 'Next word'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <nav className="bottom-nav">
                <Link href="/child" className="nav-item"><Home size={20} /><span>{t('nav_home')}</span></Link>
                <Link href="/child/elite" className="nav-item"><Sparkles size={20} /><span>{t('nav_elite')}</span></Link>
                <Link href="/child/review" className="nav-item"><RotateCcw size={20} /><span>{t('nav_review')}</span></Link>
                <Link href="/child/mistakes" className="nav-item"><Brain size={20} /><span>{t('nav_mistakes')}</span></Link>
                <Link href="/child/reading" className="nav-item"><BookOpen size={20} /><span>{t('nav_reading')}</span></Link>
            </nav>
        </div>
    );
}
