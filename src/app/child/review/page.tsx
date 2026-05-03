'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, X, HelpCircle, RotateCcw, Home, Brain, BookOpen, Sparkles, Trophy, Flame, Target } from 'lucide-react';
import { useAppStore } from '@/stores/app-store';
import { useTranslation } from '@/lib/i18n';
import { LangToggle } from '@/components/LangToggle';
import { createReviewItem } from '@/lib/spaced-repetition';
import { generateMathSet } from '@/lib/content/math-generator';
import { generateVietnameseSet } from '@/lib/content/vietnamese-generator';
import { generateEnglishSet } from '@/lib/content/english-generator';
import { generateScienceSet } from '@/lib/content/science-generator';
import { generateHisGeoSet } from '@/lib/content/history-geo-generator';
import { generateComputingSet } from '@/lib/content/computing-generator';
import { generateEthicsSet } from '@/lib/content/ethics-generator';
import { generateArtSet } from '@/lib/content/art-generator';

// ── Types ──
type SubjectKey = 'math' | 'vietnamese' | 'english' | 'science' | 'hisgeo' | 'computing' | 'ethics' | 'art';

interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    hints: string[];
    topic: string;
    topicKey: string;
    gradeLevel: number;
    subject: SubjectKey;
}

const SUBJECT_FILTERS: { key: SubjectKey | 'all'; label: string; icon: string }[] = [
    { key: 'all', label: 'Tất cả', icon: '📚' },
    { key: 'math', label: 'Toán', icon: '🔢' },
    { key: 'vietnamese', label: 'Tiếng Việt', icon: '📖' },
    { key: 'english', label: 'Tiếng Anh', icon: '🇬🇧' },
    { key: 'science', label: 'Khoa học', icon: '🔬' },
    { key: 'ethics', label: 'Đạo đức', icon: '💛' },
    { key: 'art', label: 'Nghệ thuật', icon: '🎨' },
    { key: 'computing', label: 'Tin học', icon: '💻' },
    { key: 'hisgeo', label: 'Sử/Địa', icon: '🌏' },
];

function generateQuizSet(subject: SubjectKey, grade: number, count: number): QuizQuestion[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let raw: any[] = [];
    switch (subject) {
        case 'math': raw = generateMathSet(grade, undefined, count); break;
        case 'vietnamese': raw = generateVietnameseSet(grade, undefined, count); break;
        case 'english': raw = generateEnglishSet(grade, undefined, count); break;
        case 'science': raw = generateScienceSet(grade, undefined, count); break;
        case 'hisgeo': raw = generateHisGeoSet(grade, undefined, count); break;
        case 'computing': raw = generateComputingSet(grade, undefined, count); break;
        case 'ethics': raw = generateEthicsSet(grade, undefined, count); break;
        case 'art': raw = generateArtSet(grade, undefined, count); break;
    }
    return raw.map((q: Record<string, unknown>) => ({
        id: String(q.id || ''),
        question: String(q.question || ''),
        options: (q.options as string[]) || [],
        correctAnswer: String(q.correctAnswer || ''),
        explanation: String(q.explanation || ''),
        hints: (q.hints as string[]) || [],
        topic: String(q.topic || ''),
        topicKey: String(q.topicKey || ''),
        gradeLevel: Number(q.gradeLevel || grade),
        subject,
    }));
}

function generateMixedQuizSet(grade: number, count: number): QuizQuestion[] {
    const subjects: SubjectKey[] = ['math', 'vietnamese', 'english', 'science', 'ethics', 'art'];
    if (grade >= 3) subjects.push('computing');
    if (grade >= 4) subjects.push('hisgeo');
    const perSubject = Math.max(1, Math.ceil(count / subjects.length));
    const all: QuizQuestion[] = [];
    for (const s of subjects) {
        all.push(...generateQuizSet(s, grade, perSubject));
    }
    // Shuffle
    for (let i = all.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [all[i], all[j]] = [all[j], all[i]];
    }
    return all.slice(0, count);
}

export default function ReviewPage() {
    const { childProfile, addAttempt, addMistake, addReviewSchedule, attempts } = useAppStore();
    const { t } = useTranslation();
    const grade = childProfile?.gradeLevel || 3;

    // ── State ──
    const [filter, setFilter] = useState<SubjectKey | 'all'>('all');
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [showHint, setShowHint] = useState(false);
    const [sessionCorrect, setSessionCorrect] = useState(0);
    const [sessionTotal, setSessionTotal] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const QUIZ_COUNT = 10;

    // ── Stats ──
    const totalAttempts = attempts.length;
    const correctAttempts = attempts.filter(a => a.isCorrect).length;
    const retention = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;

    const streak = useMemo(() => {
        const dates = attempts
            .filter(a => a.isCorrect)
            .map(a => new Date(a.createdAt).toDateString());
        const unique = [...new Set(dates)].sort().reverse();
        let count = 0;
        const today = new Date();
        for (let i = 0; i < unique.length; i++) {
            const d = new Date(unique[i]);
            const diff = Math.floor((today.getTime() - d.getTime()) / 86400000);
            if (diff <= i + 1) count++;
            else break;
        }
        return count;
    }, [attempts]);

    // ── Start quiz ──
    const startQuiz = useCallback((subj: SubjectKey | 'all') => {
        const qs = subj === 'all'
            ? generateMixedQuizSet(grade, QUIZ_COUNT)
            : generateQuizSet(subj, grade, QUIZ_COUNT);
        setQuestions(qs);
        setCurrentIdx(0);
        setSelected(null);
        setShowHint(false);
        setSessionCorrect(0);
        setSessionTotal(0);
        setIsStarted(true);
    }, [grade]);

    // ── Handle answer ──
    const handleAnswer = useCallback((answer: string) => {
        if (selected || isAnimating) return;
        setSelected(answer);
        const q = questions[currentIdx];
        const isCorrect = answer === q.correctAnswer;
        setSessionTotal(p => p + 1);
        if (isCorrect) setSessionCorrect(p => p + 1);

        // Save to store
        if (childProfile) {
            const attemptId = `rev-${Date.now()}`;
            addAttempt({
                id: attemptId, childId: childProfile.id, lessonId: q.id,
                competencyId: q.topicKey, exerciseId: q.id, answer,
                isCorrect, errorType: isCorrect ? null : 'concept',
                hintLevelUsed: showHint ? 1 : 0, timeSpentSeconds: 0,
                confidenceSelfRating: 3, aiRoleUsed: 'tutor',
                createdAt: new Date().toISOString(),
            });
            if (!isCorrect) {
                const mistakeId = `mis-${Date.now()}`;
                addMistake({
                    id: mistakeId, childId: childProfile.id,
                    competencyId: q.topicKey, attemptId,
                    errorType: 'concept', explanation: q.explanation,
                    correctionPlan: `Ôn lại: ${q.topic}`,
                    reviewSchedule: [], resolvedAt: null,
                });
                addReviewSchedule(createReviewItem(childProfile.id, 'mistake', mistakeId));
            }
        }
    }, [selected, isAnimating, questions, currentIdx, childProfile, showHint, addAttempt, addMistake, addReviewSchedule]);

    // ── Next question ──
    const nextQuestion = useCallback(() => {
        setIsAnimating(true);
        setTimeout(() => {
            setSelected(null);
            setShowHint(false);
            setCurrentIdx(i => i + 1);
            setIsAnimating(false);
        }, 250);
    }, []);

    const currentQ = questions[currentIdx];
    const isFinished = isStarted && currentIdx >= questions.length;
    const progress = questions.length > 0 ? Math.round((currentIdx / questions.length) * 100) : 0;

    // ── RENDER ──
    return (
        <div style={{ paddingBottom: '5rem', minHeight: '100dvh', background: 'linear-gradient(180deg, #eef2ff 0%, #f0f4ff 40%, #faf5ff 100%)' }}>
            <div className="page-container">
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Link href="/child"><button className="btn btn-ghost btn-sm"><ArrowLeft size={18} /></button></Link>
                        <h1 style={{ fontWeight: 800, fontSize: '1.5rem' }}>🧠 {t('review_title')}</h1>
                    </div>
                    <LangToggle />
                </div>

                {/* Stats Bar */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <div className="card" style={{ padding: '0.75rem', textAlign: 'center', background: 'linear-gradient(135deg, #667eea22, #764ba222)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                            <Target size={16} color="#667eea" />
                            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#667eea' }}>{retention}%</span>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Tỷ lệ đúng</div>
                    </div>
                    <div className="card" style={{ padding: '0.75rem', textAlign: 'center', background: 'linear-gradient(135deg, #f5923622, #ff6b6b22)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                            <Flame size={16} color="#f59236" />
                            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f59236' }}>{streak}</span>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Chuỗi ngày</div>
                    </div>
                    <div className="card" style={{ padding: '0.75rem', textAlign: 'center', background: 'linear-gradient(135deg, #10b98122, #059e6522)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                            <Trophy size={16} color="#10b981" />
                            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>{totalAttempts}</span>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Tổng bài</div>
                    </div>
                </div>

                {/* Subject Filter */}
                <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1rem', scrollbarWidth: 'none' }}>
                    {SUBJECT_FILTERS.map(f => (
                        <button key={f.key} onClick={() => { setFilter(f.key); if (isStarted) { setIsStarted(false); setQuestions([]); } }}
                            style={{
                                padding: '0.4rem 0.75rem', borderRadius: '2rem', border: 'none', cursor: 'pointer',
                                fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap',
                                background: filter === f.key ? 'var(--color-primary)' : 'rgba(255,255,255,0.7)',
                                color: filter === f.key ? 'white' : 'var(--color-text-primary)',
                                transition: 'all 0.2s', transform: filter === f.key ? 'scale(1.05)' : 'scale(1)',
                            }}>
                            {f.icon} {f.label}
                        </button>
                    ))}
                </div>

                {/* ══ NOT STARTED — Start Button ══ */}
                {!isStarted && (
                    <div className="card animate-fade-in" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>
                            {filter === 'all' ? '📚' : SUBJECT_FILTERS.find(f => f.key === filter)?.icon}
                        </div>
                        <h2 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                            Ôn tập {filter === 'all' ? 'tổng hợp' : SUBJECT_FILTERS.find(f => f.key === filter)?.label}
                        </h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                            {QUIZ_COUNT} câu hỏi • Lớp {grade} • Câu hỏi từ bài đã học
                        </p>
                        <button
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', fontWeight: 700, borderRadius: '1rem',
                                background: 'linear-gradient(135deg, #667eea, #764ba2)' }}
                            onClick={() => startQuiz(filter)}>
                            🚀 Bắt đầu ôn tập
                        </button>
                    </div>
                )}

                {/* ══ FINISHED ══ */}
                {isFinished && (
                    <div className="card animate-fade-in" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '0.75rem' }}>🎉</div>
                        <h2 style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: '0.5rem' }}>Hoàn thành!</h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                            Đúng {sessionCorrect}/{sessionTotal} ({sessionTotal > 0 ? Math.round(sessionCorrect / sessionTotal * 100) : 0}%)
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
                            <div style={{ background: '#10b98122', padding: '1rem 1.5rem', borderRadius: '1rem' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>{sessionCorrect}</div>
                                <div style={{ fontSize: '0.75rem', color: '#059e65' }}>Đúng ✅</div>
                            </div>
                            <div style={{ background: '#ef444422', padding: '1rem 1.5rem', borderRadius: '1rem' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ef4444' }}>{sessionTotal - sessionCorrect}</div>
                                <div style={{ fontSize: '0.75rem', color: '#dc2626' }}>Sai ❌</div>
                            </div>
                        </div>
                        <button className="btn btn-primary" style={{ width: '100%', marginBottom: '0.5rem' }}
                            onClick={() => startQuiz(filter)}>
                            <RotateCcw size={16} /> Ôn lại
                        </button>
                        <button className="btn btn-ghost" style={{ width: '100%' }}
                            onClick={() => { setIsStarted(false); setQuestions([]); }}>
                            Đổi môn khác
                        </button>
                    </div>
                )}

                {/* ══ QUIZ IN PROGRESS ══ */}
                {isStarted && !isFinished && currentQ && (
                    <>
                        {/* Progress */}
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                                <span>Câu {currentIdx + 1}/{questions.length}</span>
                                <span>Đúng: {sessionCorrect}/{sessionTotal}</span>
                            </div>
                            <div style={{ height: '8px', borderRadius: '4px', background: 'rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                                <div style={{
                                    height: '100%', borderRadius: '4px',
                                    background: 'linear-gradient(90deg, #667eea, #764ba2)',
                                    width: `${progress}%`, transition: 'width 0.5s ease',
                                }} />
                            </div>
                        </div>

                        {/* Question Card */}
                        <div className="card" style={{
                            transition: 'all 0.25s ease',
                            opacity: isAnimating ? 0 : 1,
                            transform: isAnimating ? 'translateX(30px)' : 'translateX(0)',
                        }}>
                            {/* Topic badge */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#667eea', background: '#667eea15', padding: '0.2rem 0.6rem', borderRadius: '1rem' }}>
                                    {SUBJECT_FILTERS.find(f => f.key === currentQ.subject)?.icon} {currentQ.topic}
                                </span>
                                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Lớp {currentQ.gradeLevel}</span>
                            </div>

                            {/* Question */}
                            <div style={{
                                padding: '1.25rem', marginBottom: '1rem', borderRadius: '0.75rem',
                                background: 'linear-gradient(135deg, rgba(99,102,241,0.04), transparent)',
                                minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <p style={{ fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.7, textAlign: 'center' }}>
                                    {currentQ.question}
                                </p>
                            </div>

                            {/* Options */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                                {currentQ.options.map((opt, i) => {
                                    const isSelected = selected === opt;
                                    const isCorrectOpt = opt === currentQ.correctAnswer;
                                    const answered = selected !== null;
                                    let bg = 'rgba(241,245,249,0.8)';
                                    let border = '2px solid transparent';
                                    let color = 'var(--color-text-primary)';
                                    if (answered && isCorrectOpt) {
                                        bg = '#10b98122'; border = '2px solid #10b981'; color = '#047857';
                                    } else if (answered && isSelected && !isCorrectOpt) {
                                        bg = '#ef444422'; border = '2px solid #ef4444'; color = '#dc2626';
                                    } else if (!answered) {
                                        border = '2px solid var(--color-border, #e2e8f0)';
                                    }
                                    return (
                                        <button key={i} onClick={() => handleAnswer(opt)}
                                            disabled={answered}
                                            style={{
                                                padding: '0.85rem 1rem', borderRadius: '0.75rem',
                                                background: bg, border, color, fontWeight: 600,
                                                fontSize: '0.95rem', cursor: answered ? 'default' : 'pointer',
                                                textAlign: 'left', transition: 'all 0.2s',
                                                transform: !answered ? 'scale(1)' : undefined,
                                                display: 'flex', alignItems: 'center', gap: '0.75rem',
                                            }}
                                            onMouseEnter={e => { if (!answered) e.currentTarget.style.transform = 'scale(1.02)'; }}
                                            onMouseLeave={e => { if (!answered) e.currentTarget.style.transform = 'scale(1)'; }}>
                                            <span style={{
                                                width: '28px', height: '28px', borderRadius: '50%',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '0.8rem', fontWeight: 800, flexShrink: 0,
                                                background: answered && isCorrectOpt ? '#10b981' : answered && isSelected ? '#ef4444' : '#f1f5f9',
                                                color: answered && (isCorrectOpt || isSelected) ? 'white' : '#64748b',
                                            }}>
                                                {answered && isCorrectOpt ? '✓' : answered && isSelected ? '✗' : String.fromCharCode(65 + i)}
                                            </span>
                                            {opt}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Hint */}
                            {!selected && !showHint && currentQ.hints.length > 0 && (
                                <button className="btn btn-ghost" style={{ width: '100%', fontSize: '0.85rem' }}
                                    onClick={() => setShowHint(true)}>
                                    <HelpCircle size={16} /> Gợi ý
                                </button>
                            )}
                            {showHint && !selected && (
                                <div className="animate-fade-in" style={{
                                    background: '#fef3c722', padding: '0.75rem 1rem', borderRadius: '0.5rem',
                                    borderLeft: '4px solid #f59e0b', fontSize: '0.9rem', color: '#92400e', marginBottom: '0.5rem',
                                }}>
                                    💡 {currentQ.hints[0]}
                                </div>
                            )}

                            {/* Explanation after answer */}
                            {selected && (
                                <div className="animate-fade-in" style={{
                                    background: selected === currentQ.correctAnswer ? '#10b98111' : '#ef444411',
                                    padding: '1rem', borderRadius: '0.75rem', marginBottom: '0.75rem',
                                    borderLeft: `4px solid ${selected === currentQ.correctAnswer ? '#10b981' : '#ef4444'}`,
                                }}>
                                    <div style={{ fontWeight: 700, marginBottom: '0.25rem', color: selected === currentQ.correctAnswer ? '#047857' : '#dc2626' }}>
                                        {selected === currentQ.correctAnswer ? '🎉 Chính xác!' : `❌ Sai rồi! Đáp án đúng: ${currentQ.correctAnswer}`}
                                    </div>
                                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                                        {currentQ.explanation}
                                    </p>
                                </div>
                            )}

                            {/* Next button */}
                            {selected && (
                                <button className="btn btn-primary animate-fade-in"
                                    style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: 700 }}
                                    onClick={nextQuestion}>
                                    {currentIdx < questions.length - 1 ? 'Câu tiếp theo →' : '🏆 Xem kết quả'}
                                </button>
                            )}
                        </div>
                    </>
                )}

                {/* Recent history */}
                {!isStarted && attempts.length > 0 && (
                    <div style={{ marginTop: '1.5rem' }}>
                        <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.75rem' }}>📋 Lịch sử gần đây</h2>
                        {attempts.slice(-6).reverse().map((a) => (
                            <div key={a.id} className="card" style={{
                                marginBottom: '0.4rem', padding: '0.6rem 0.8rem',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            }}>
                                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                                    {a.isCorrect ? '✅' : '❌'} {a.competencyId?.replace(/_/g, ' ')}
                                </span>
                                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                                    {new Date(a.createdAt).toLocaleDateString('vi')}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <nav className="bottom-nav">
                <Link href="/child" className="nav-item"><Home size={20} /><span>{t('nav_home')}</span></Link>
                <Link href="/child/learn" className="nav-item"><BookOpen size={20} /><span>Học</span></Link>
                <Link href="/child/review" className="nav-item active"><RotateCcw size={20} /><span>{t('nav_review')}</span></Link>
                <Link href="/child/mistakes" className="nav-item"><Brain size={20} /><span>{t('nav_mistakes')}</span></Link>
                <Link href="/child/elite" className="nav-item"><Sparkles size={20} /><span>{t('nav_elite')}</span></Link>
            </nav>
        </div>
    );
}
