'use client';

import { useAppStore } from '@/stores/app-store';
import { useTranslation } from '@/lib/i18n';
import { LangToggle } from '@/components/LangToggle';
import { getDueReviews } from '@/lib/spaced-repetition';
import { getTopicLearningBlueprint } from '@/data/learning-benchmark-system';
import type { LearningSubjectKey } from '@/data/curriculum-enrichment';
import Link from 'next/link';
import { ArrowLeft, Check, X, HelpCircle, RotateCcw, Home, Brain, BookOpen, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function ReviewPage() {
    const { reviewSchedules, updateReviewResult, mistakes, competencies } = useAppStore();
    const { t } = useTranslation();
    const dueReviews = getDueReviews(reviewSchedules);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const currentReview = dueReviews[currentIdx];

    const handleResult = (result: 'correct' | 'incorrect' | 'hint_needed') => {
        if (currentReview) {
            updateReviewResult(currentReview.id, result);
            setShowAnswer(false);
            if (currentIdx < dueReviews.length - 1) {
                setCurrentIdx(currentIdx + 1);
            } else {
                setCurrentIdx(0);
            }
        }
    };

    const getReviewContent = (review: typeof currentReview) => {
        if (!review) return null;
        if (review.itemType === 'mistake') {
            const mistake = mistakes.find((m) => m.id === review.itemId);
            const comp = competencies.find((c) => c.id === mistake?.competencyId);
            return {
                question: mistake?.explanation || t('review_default_q'),
                answer: mistake?.correctionPlan || '',
                subject: comp?.subject || '',
            };
        }
        if (review.itemType === 'competency') {
            const comp = competencies.find((c) => c.id === review.itemId);
            const subject = (comp?.subject === 'Tiếng Việt' ? 'vietnamese'
                : comp?.subject === 'Tiếng Anh' ? 'english'
                    : comp?.subject === 'Khoa học' ? 'science'
                        : comp?.subject === 'Lịch sử & Địa lý' ? 'hisgeo'
                            : comp?.subject === 'Tin học' ? 'computing'
                                : 'math') as LearningSubjectKey;
            const blueprint = getTopicLearningBlueprint(review.itemId, subject);
            return {
                question: `Nhớ lại chủ động: ${blueprint.bigIdea} Con hãy giải thích bằng một ví dụ.`,
                answer: `Bằng chứng thành thạo: ${blueprint.evidenceOfMastery.join(' · ')}. Bước nâng cao: ${blueprint.stretchTask}`,
                subject: blueprint.subject,
            };
        }
        return { question: t('review_default_fc'), answer: t('review_default_a'), subject: '' };
    };

    return (
        <div style={{ paddingBottom: '5rem', background: 'var(--color-bg-child)', minHeight: '100dvh' }}>
            <div className="page-container">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Link href="/child"><button className="btn btn-ghost btn-sm"><ArrowLeft size={18} /></button></Link>
                        <h1 style={{ fontWeight: 800, fontSize: '1.5rem' }}>{t('review_title')}</h1>
                        <span className="badge badge-primary">{dueReviews.length} {t('review_count')}</span>
                    </div>
                    <LangToggle />
                </div>

                {dueReviews.length === 0 ? (
                    <div className="card animate-fade-in" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✅</div>
                        <p style={{ fontWeight: 600 }}>{t('review_empty_title')}</p>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{t('review_empty_sub')}</p>
                    </div>
                ) : (
                    <div className="card animate-fade-in" key={currentIdx}>
                        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                                {currentIdx + 1} / {dueReviews.length}
                            </span>
                        </div>

                        {(() => {
                            const content = getReviewContent(currentReview);
                            if (!content) return null;
                            return (
                                <>
                                    <div style={{ minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                        <p style={{ fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.6 }}>{content.question}</p>
                                    </div>

                                    {!showAnswer ? (
                                        <button className="btn btn-accent" style={{ width: '100%', marginBottom: '1rem' }} onClick={() => setShowAnswer(true)}>
                                            {t('review_show_answer')}
                                        </button>
                                    ) : (
                                        <div className="animate-fade-in" style={{ background: 'var(--color-bg-child)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                                            <p style={{ fontSize: '0.95rem', lineHeight: 1.5 }}>{content.answer}</p>
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn btn-success" style={{ flex: 1 }} onClick={() => handleResult('correct')}>
                                            <Check size={18} /> {t('review_remembered')}
                                        </button>
                                        <button className="btn btn-accent" style={{ flex: 1 }} onClick={() => handleResult('hint_needed')}>
                                            <HelpCircle size={18} /> {t('review_need_hint')}
                                        </button>
                                        <button className="btn" style={{ flex: 1, background: 'var(--color-danger)', color: 'white' }} onClick={() => handleResult('incorrect')}>
                                            <X size={18} /> {t('review_forgot')}
                                        </button>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                )}

                <div style={{ marginTop: '2rem' }}>
                    <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>{t('review_history')}</h2>
                    {reviewSchedules.slice(-5).reverse().map((r) => (
                        <div key={r.id} className="card" style={{ marginBottom: '0.5rem', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.85rem' }}>{r.itemType === 'mistake' ? t('review_mistake_label') : t('review_flashcard_label')}</span>
                            <span className={`badge ${r.lastResult === 'correct' ? 'badge-success' : r.lastResult === 'incorrect' ? 'badge-danger' : 'badge-warning'}`}>
                                {r.lastResult === 'correct' ? t('review_result_correct') : r.lastResult === 'incorrect' ? t('review_result_incorrect') : r.lastResult === 'hint_needed' ? t('review_result_hint') : t('review_result_pending')}
                            </span>
                        </div>
                    ))}
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
