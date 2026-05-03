'use client';

import { useAppStore } from '@/stores/app-store';
import { useTranslation } from '@/lib/i18n';
import { LangToggle } from '@/components/LangToggle';
import { getDueReviews, getRetentionScore, createReviewItem } from '@/lib/spaced-repetition';
import { getTopicLearningBlueprint } from '@/data/learning-benchmark-system';
import type { LearningSubjectKey } from '@/data/curriculum-enrichment';
import Link from 'next/link';
import { ArrowLeft, Check, X, HelpCircle, RotateCcw, Home, Brain, BookOpen, Sparkles, Filter, Trophy, Flame, Target, ChevronRight } from 'lucide-react';
import { useState, useMemo, useCallback, useEffect } from 'react';

// ── Subject filter config ──
const SUBJECT_FILTERS = [
    { key: 'all', label: 'Tất cả', icon: '📚' },
    { key: 'math', label: 'Toán', icon: '🔢' },
    { key: 'vietnamese', label: 'Tiếng Việt', icon: '📖' },
    { key: 'english', label: 'Tiếng Anh', icon: '🇬🇧' },
    { key: 'science', label: 'Khoa học', icon: '🔬' },
    { key: 'ethics', label: 'Đạo đức', icon: '💛' },
    { key: 'art', label: 'Mỹ thuật', icon: '🎨' },
    { key: 'computing', label: 'Tin học', icon: '💻' },
    { key: 'hisgeo', label: 'Sử/Địa', icon: '🌏' },
];

function mapSubjectKey(subject: string): string {
    const map: Record<string, string> = {
        'Tiếng Việt': 'vietnamese', 'Tiếng Anh': 'english', 'Toán': 'math',
        'Khoa học': 'science', 'Đạo đức': 'ethics', 'Mỹ thuật': 'art',
        'Âm nhạc': 'art', 'Tin học': 'computing', 'Lịch sử & Địa lý': 'hisgeo',
    };
    return map[subject] || 'math';
}

export default function ReviewPage() {
    const { reviewSchedules, updateReviewResult, mistakes, competencies, addReviewSchedule, childProfile } = useAppStore();
    const { t } = useTranslation();
    const dueReviews = getDueReviews(reviewSchedules);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [filter, setFilter] = useState('all');
    const [sessionCorrect, setSessionCorrect] = useState(0);
    const [sessionTotal, setSessionTotal] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);
    const [showComplete, setShowComplete] = useState(false);

    // Auto-seed reviews from competencies if empty
    useEffect(() => {
        if (reviewSchedules.length === 0 && competencies.length > 0 && childProfile) {
            const sampled = competencies
                .filter((_, i) => i % 3 === 0)
                .slice(0, 15);
            sampled.forEach(c => {
                addReviewSchedule(createReviewItem(childProfile.id, 'competency', c.id));
            });
        }
    }, [reviewSchedules.length, competencies.length, childProfile, addReviewSchedule]);

    // Filter reviews by subject
    const filteredReviews = useMemo(() => {
        if (filter === 'all') return dueReviews;
        return dueReviews.filter(r => {
            if (r.itemType === 'mistake') {
                const m = mistakes.find(x => x.id === r.itemId);
                const c = competencies.find(x => x.id === m?.competencyId);
                return c && mapSubjectKey(c.subject) === filter;
            }
            const c = competencies.find(x => x.id === r.itemId);
            return c && mapSubjectKey(c.subject) === filter;
        });
    }, [dueReviews, filter, mistakes, competencies]);

    const currentReview = filteredReviews[currentIdx];
    const retention = getRetentionScore(reviewSchedules);

    // Calculate streak
    const streak = useMemo(() => {
        const dates = reviewSchedules
            .filter(r => r.lastResult === 'correct')
            .map(r => new Date(r.scheduledAt).toDateString());
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
    }, [reviewSchedules]);

    const handleResult = useCallback((result: 'correct' | 'incorrect' | 'hint_needed') => {
        if (!currentReview) return;
        setIsFlipping(true);
        setTimeout(() => {
            updateReviewResult(currentReview.id, result);
            setSessionTotal(p => p + 1);
            if (result === 'correct') setSessionCorrect(p => p + 1);
            setShowAnswer(false);
            setIsFlipping(false);
            if (currentIdx < filteredReviews.length - 1) {
                setCurrentIdx(currentIdx + 1);
            } else {
                setShowComplete(true);
            }
        }, 300);
    }, [currentReview, currentIdx, filteredReviews.length, updateReviewResult]);

    const getReviewContent = (review: typeof currentReview) => {
        if (!review) return null;
        if (review.itemType === 'mistake') {
            const mistake = mistakes.find((m) => m.id === review.itemId);
            const comp = competencies.find((c) => c.id === mistake?.competencyId);
            return {
                question: mistake?.explanation || t('review_default_q'),
                answer: mistake?.correctionPlan || '',
                subject: comp?.subject || '',
                topicName: comp?.title || 'Ôn tập',
            };
        }
        if (review.itemType === 'competency') {
            const comp = competencies.find((c) => c.id === review.itemId);
            const subject = mapSubjectKey(comp?.subject || 'Toán') as LearningSubjectKey;
            const blueprint = getTopicLearningBlueprint(review.itemId, subject);
            return {
                question: `${blueprint.bigIdea}\n\nCon hãy giải thích bằng một ví dụ.`,
                answer: `✅ ${blueprint.evidenceOfMastery.join('\n✅ ')}\n\n🚀 Nâng cao: ${blueprint.stretchTask}`,
                subject: blueprint.subject,
                topicName: comp?.title || blueprint.subject,
            };
        }
        return { question: t('review_default_fc'), answer: t('review_default_a'), subject: '', topicName: 'Ôn tập' };
    };

    const progress = filteredReviews.length > 0
        ? Math.round(((sessionTotal) / filteredReviews.length) * 100)
        : 0;

    return (
        <div style={{ paddingBottom: '5rem', background: 'var(--color-bg-child)', minHeight: '100dvh' }}>
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
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Nhớ bài</div>
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
                            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>{dueReviews.length}</span>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Cần ôn</div>
                    </div>
                </div>

                {/* Subject Filter Chips */}
                <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1rem', scrollbarWidth: 'none' }}>
                    {SUBJECT_FILTERS.map(f => (
                        <button
                            key={f.key}
                            onClick={() => { setFilter(f.key); setCurrentIdx(0); setShowAnswer(false); setSessionCorrect(0); setSessionTotal(0); setShowComplete(false); }}
                            style={{
                                padding: '0.4rem 0.75rem', borderRadius: '2rem', border: 'none', cursor: 'pointer',
                                fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap',
                                background: filter === f.key ? 'var(--color-primary)' : 'var(--color-surface)',
                                color: filter === f.key ? 'white' : 'var(--color-text)',
                                transition: 'all 0.2s ease',
                                transform: filter === f.key ? 'scale(1.05)' : 'scale(1)',
                            }}
                        >
                            {f.icon} {f.label}
                        </button>
                    ))}
                </div>

                {/* Progress Bar */}
                {filteredReviews.length > 0 && (
                    <div style={{ marginBottom: '1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                            <span>Tiến độ ôn tập</span>
                            <span>{sessionTotal}/{filteredReviews.length} bài</span>
                        </div>
                        <div style={{ height: '8px', borderRadius: '4px', background: 'var(--color-surface)', overflow: 'hidden' }}>
                            <div style={{
                                height: '100%', borderRadius: '4px',
                                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                                width: `${progress}%`,
                                transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            }} />
                        </div>
                    </div>
                )}

                {/* Session Complete */}
                {showComplete ? (
                    <div className="card animate-fade-in" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '0.75rem' }}>🎉</div>
                        <h2 style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: '0.5rem' }}>Hoàn thành ôn tập!</h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                            Đúng {sessionCorrect}/{sessionTotal} bài ({sessionTotal > 0 ? Math.round(sessionCorrect / sessionTotal * 100) : 0}%)
                        </p>

                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <div style={{ background: '#10b98122', padding: '0.75rem 1.25rem', borderRadius: '1rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981' }}>{sessionCorrect}</div>
                                <div style={{ fontSize: '0.75rem', color: '#059e65' }}>Nhớ rồi ✅</div>
                            </div>
                            <div style={{ background: '#f5923622', padding: '0.75rem 1.25rem', borderRadius: '1rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59236' }}>{sessionTotal - sessionCorrect}</div>
                                <div style={{ fontSize: '0.75rem', color: '#e07b1a' }}>Cần ôn lại 🔄</div>
                            </div>
                        </div>

                        <button
                            className="btn btn-primary"
                            style={{ marginTop: '1.5rem', width: '100%' }}
                            onClick={() => { setShowComplete(false); setCurrentIdx(0); setSessionCorrect(0); setSessionTotal(0); }}
                        >
                            <RotateCcw size={16} /> Ôn lại từ đầu
                        </button>
                    </div>
                ) : filteredReviews.length === 0 ? (
                    <div className="card animate-fade-in" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                        <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>🌟</div>
                        <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>{t('review_empty_title')}</p>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                            {filter !== 'all' ? `Không có bài ôn cho ${SUBJECT_FILTERS.find(f => f.key === filter)?.label}` : t('review_empty_sub')}
                        </p>
                        <Link href="/child/learn">
                            <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
                                <BookOpen size={16} /> Học bài mới
                            </button>
                        </Link>
                    </div>
                ) : (
                    /* Flashcard */
                    <div
                        className="card"
                        style={{
                            transition: 'all 0.3s ease',
                            opacity: isFlipping ? 0 : 1,
                            transform: isFlipping ? 'scale(0.95) rotateY(10deg)' : 'scale(1)',
                        }}
                        key={`${currentIdx}-${filter}`}
                    >
                        {/* Card Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-primary)', background: 'var(--color-primary)11', padding: '0.25rem 0.75rem', borderRadius: '1rem' }}>
                                {currentIdx + 1} / {filteredReviews.length}
                            </span>
                            {(() => {
                                const content = getReviewContent(currentReview);
                                return content ? (
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', background: 'var(--color-surface)', padding: '0.25rem 0.6rem', borderRadius: '0.5rem' }}>
                                        {content.topicName}
                                    </span>
                                ) : null;
                            })()}
                        </div>

                        {(() => {
                            const content = getReviewContent(currentReview);
                            if (!content) return null;
                            return (
                                <>
                                    <div style={{
                                        minHeight: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        textAlign: 'center', padding: '1rem',
                                        background: 'linear-gradient(135deg, var(--color-surface), transparent)',
                                        borderRadius: 'var(--radius-md)', marginBottom: '1rem',
                                    }}>
                                        <p style={{ fontSize: '1.05rem', fontWeight: 600, lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                                            {content.question}
                                        </p>
                                    </div>

                                    {!showAnswer ? (
                                        <button
                                            className="btn btn-accent"
                                            style={{ width: '100%', marginBottom: '1rem', fontSize: '1rem', padding: '0.85rem' }}
                                            onClick={() => setShowAnswer(true)}
                                        >
                                            👀 {t('review_show_answer')}
                                        </button>
                                    ) : (
                                        <div className="animate-fade-in" style={{
                                            background: 'linear-gradient(135deg, #10b98111, #059e6511)',
                                            padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem',
                                            borderLeft: '4px solid #10b981',
                                        }}>
                                            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{content.answer}</p>
                                        </div>
                                    )}

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                                        <button
                                            className="btn"
                                            style={{ background: 'linear-gradient(135deg, #10b981, #059e65)', color: 'white', padding: '0.85rem 0.5rem', fontSize: '0.85rem', fontWeight: 700 }}
                                            onClick={() => handleResult('correct')}
                                        >
                                            <Check size={18} /> Nhớ rồi
                                        </button>
                                        <button
                                            className="btn"
                                            style={{ background: 'linear-gradient(135deg, #f59236, #e07b1a)', color: 'white', padding: '0.85rem 0.5rem', fontSize: '0.85rem', fontWeight: 700 }}
                                            onClick={() => handleResult('hint_needed')}
                                        >
                                            <HelpCircle size={18} /> Cần gợi ý
                                        </button>
                                        <button
                                            className="btn"
                                            style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white', padding: '0.85rem 0.5rem', fontSize: '0.85rem', fontWeight: 700 }}
                                            onClick={() => handleResult('incorrect')}
                                        >
                                            <X size={18} /> Quên rồi
                                        </button>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                )}

                {/* Review History */}
                <div style={{ marginTop: '2rem' }}>
                    <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        📋 {t('review_history')}
                    </h2>
                    {reviewSchedules.length === 0 ? (
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>
                            Chưa có lịch sử ôn tập
                        </p>
                    ) : (
                        reviewSchedules.slice(-8).reverse().map((r) => {
                            const comp = competencies.find(c => c.id === r.itemId);
                            return (
                                <div key={r.id} className="card" style={{
                                    marginBottom: '0.5rem', padding: '0.75rem 1rem',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    transition: 'transform 0.2s ease',
                                }}>
                                    <div>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                                            {r.itemType === 'mistake' ? '🔴 ' : '📗 '}
                                            {comp?.title || (r.itemType === 'mistake' ? t('review_mistake_label') : t('review_flashcard_label'))}
                                        </span>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                                            Ôn lại sau {r.intervalDays} ngày
                                        </div>
                                    </div>
                                    <span className={`badge ${r.lastResult === 'correct' ? 'badge-success' : r.lastResult === 'incorrect' ? 'badge-danger' : r.lastResult === 'hint_needed' ? 'badge-warning' : 'badge-secondary'}`}>
                                        {r.lastResult === 'correct' ? '✅ Đúng' : r.lastResult === 'incorrect' ? '❌ Sai' : r.lastResult === 'hint_needed' ? '💡 Gợi ý' : '⏳ Chưa ôn'}
                                    </span>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            <nav className="bottom-nav">
                <Link href="/child" className="nav-item"><Home size={20} /><span>{t('nav_home')}</span></Link>
                <Link href="/child/elite" className="nav-item"><Sparkles size={20} /><span>{t('nav_elite')}</span></Link>
                <Link href="/child/review" className="nav-item active"><RotateCcw size={20} /><span>{t('nav_review')}</span></Link>
                <Link href="/child/mistakes" className="nav-item"><Brain size={20} /><span>{t('nav_mistakes')}</span></Link>
                <Link href="/child/reading" className="nav-item"><BookOpen size={20} /><span>{t('nav_reading')}</span></Link>
            </nav>
        </div>
    );
}
