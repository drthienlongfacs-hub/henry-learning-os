'use client';

import { useAppStore } from '@/stores/app-store';
import { useTranslation } from '@/lib/i18n';
import { LangToggle } from '@/components/LangToggle';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Brain, Clock, AlertTriangle, Bookmark, RotateCcw, Home, Sparkles, Search, Type } from 'lucide-react';
import { ENRICHMENT_STATS } from '@/data/curriculum-enrichment';
import { LEARNING_SCIENCE_STATS, getLearningSciencePrinciples, getBenchmarkPattern } from '@/data/learning-science-system';
import { buildWholeChildLearningPlan, summarizePrinciplesForCard, getCardBenchmark } from '@/lib/whole-child-learning-plan';

export default function ChildDashboard() {
    const router = useRouter();
    const { childProfile, lessons, masteryStates, mistakes, reviewSchedules, attempts } = useAppStore();
    const { t, lang } = useTranslation();
    const activeChild = childProfile ?? { nameOrNickname: 'Henry' };

    const unresolvedMistakes = mistakes.filter((m) => !m.resolvedAt).length;
    const dueReviews = reviewSchedules.filter((r) => new Date(r.scheduledAt) <= new Date()).length;
    const masteredCount = masteryStates.filter((ms) => ms.state === 'mastered').length;
    const totalCount = masteryStates.length;
    const progressPct = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;

    const todaysLessons = lessons.slice(0, 3);
    const systemPlan = buildWholeChildLearningPlan({ attempts, mistakes, reviewSchedules });
    const sciencePrinciples = getLearningSciencePrinciples(['retrieval', 'spacing', 'adaptive_challenge', 'motivation']);
    const toneColor = {
        repair: '#ef4444',
        review: '#3b82f6',
        learn: '#10b981',
        stretch: '#8b5cf6',
    } as const;

    return (
        <div style={{ paddingBottom: '5rem', background: 'var(--color-bg-child)', minHeight: '100dvh' }}>
            <div className="page-container">
                {/* Header */}
                <div className="animate-fade-in" style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{t('greeting')}</div>
                            <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{activeChild.nameOrNickname} 👋</h1>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <LangToggle />
                            <div className="progress-ring" style={{ '--progress': `${progressPct}%` } as React.CSSProperties}>
                                <div className="progress-ring-inner">{progressPct}%</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick stats */}
                <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
                    <Link href="/child/mistakes" style={{ textDecoration: 'none' }}>
                        <div className="card card-interactive" style={{ textAlign: 'center', padding: '1rem' }}>
                            <AlertTriangle size={20} color="var(--color-warning)" />
                            <div style={{ fontWeight: 800, fontSize: '1.5rem' }}>{unresolvedMistakes}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{t('errors_to_fix')}</div>
                        </div>
                    </Link>
                    <Link href="/child/review" style={{ textDecoration: 'none' }}>
                        <div className="card card-interactive" style={{ textAlign: 'center', padding: '1rem' }}>
                            <RotateCcw size={20} color="var(--color-info)" />
                            <div style={{ fontWeight: 800, fontSize: '1.5rem' }}>{dueReviews}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{t('need_review')}</div>
                        </div>
                    </Link>
                    <Link href="/child/reading" style={{ textDecoration: 'none' }}>
                        <div className="card card-interactive" style={{ textAlign: 'center', padding: '1rem' }}>
                            <Bookmark size={20} color="var(--color-success)" />
                            <div style={{ fontWeight: 800, fontSize: '1.5rem' }}>{masteredCount}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{t('mastered')}</div>
                        </div>
                    </Link>
                </div>

                {/* Library entry */}
                <Link href="/child/library" style={{ textDecoration: 'none' }}>
                    <div className="card card-interactive animate-fade-in" style={{
                        marginBottom: '1.25rem',
                        background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(236,72,153,0.08))',
                        border: '1px solid rgba(168,85,247,0.18)',
                        display: 'flex', alignItems: 'center', gap: '0.85rem',
                        cursor: 'pointer', transition: 'all 0.2s',
                    }}>
                        <div style={{
                            width: 44, height: 44, borderRadius: 'var(--radius-md)',
                            background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '1.3rem',
                        }}>📚</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                                {lang === 'vi' ? 'Thư viện Sách — Đọc song ngữ' : 'Library — Bilingual Reader'}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                                {lang === 'vi'
                                    ? 'Kệ SGK/textbook có quyền • Cambridge • Oxford • Singapore • Chạm từ → xem nghĩa ngay'
                                    : 'Copyright-aware textbook shelf • Cambridge • Oxford • Singapore • Tap any word → instant definition'}
                            </div>
                        </div>
                        <span style={{ fontSize: '1.2rem' }}>→</span>
                    </div>
                </Link>

                {/* Quick access — new learning modules */}
                <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <Link href="/child/reading#phonics" style={{ textDecoration: 'none' }}>
                        <div className="card card-interactive" style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>
                            <div style={{ fontSize: '1.3rem', marginBottom: '0.15rem' }}>🔤</div>
                            <div style={{ fontWeight: 700, fontSize: '0.68rem', color: '#7c3aed' }}>Phonics Lab</div>
                            <div style={{ fontSize: '0.55rem', color: 'var(--color-text-muted)' }}>{lang === 'vi' ? 'IPA + 3 accent' : 'IPA + 3 accents'}</div>
                        </div>
                    </Link>
                    <Link href="/child/reading#vocab" style={{ textDecoration: 'none' }}>
                        <div className="card card-interactive" style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>
                            <div style={{ fontSize: '1.3rem', marginBottom: '0.15rem' }}>🧠</div>
                            <div style={{ fontWeight: 700, fontSize: '0.68rem', color: '#059669' }}>Vocab SRS</div>
                            <div style={{ fontSize: '0.55rem', color: 'var(--color-text-muted)' }}>{lang === 'vi' ? 'Flashcard SM-2' : 'Spaced repetition'}</div>
                        </div>
                    </Link>
                    <Link href="/child/reading#wiki" style={{ textDecoration: 'none' }}>
                        <div className="card card-interactive" style={{ textAlign: 'center', padding: '0.75rem 0.5rem' }}>
                            <div style={{ fontSize: '1.3rem', marginBottom: '0.15rem' }}>📚</div>
                            <div style={{ fontWeight: 700, fontSize: '0.68rem', color: '#0f766e' }}>Wiki</div>
                            <div style={{ fontSize: '0.55rem', color: 'var(--color-text-muted)' }}>{lang === 'vi' ? '38 mục tri thức' : '38 entries'}</div>
                        </div>
                    </Link>
                </div>

                {/* Learning quality layer */}
                <div className="card animate-fade-in" style={{
                    marginBottom: '2rem',
                    background: 'linear-gradient(135deg, rgba(59,130,246,0.10), rgba(16,185,129,0.10))',
                    border: '1px solid rgba(59,130,246,0.22)',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                        <div style={{
                            width: '44px', height: '44px', borderRadius: 'var(--radius-md)',
                            background: '#2563eb',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Sparkles size={22} color="white" />
                        </div>
                        <div style={{ flex: 1, minWidth: 220 }}>
                            <div style={{ fontWeight: 800, fontSize: '1rem' }}>Học sâu, có nguồn và có hỗ trợ</div>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.82rem', lineHeight: 1.45 }}>
                                {ENRICHMENT_STATS.sourceCount} nguồn chuẩn/benchmark • {LEARNING_SCIENCE_STATS.principleCount} nguyên lý học tập • gợi ý L0-L5 • nhiệm vụ ba mẹ 10 phút
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(118px, 1fr))', gap: '0.6rem', marginTop: '1rem' }}>
                        {sciencePrinciples.map((principle) => (
                            <div key={principle.id} style={{
                                background: 'rgba(255,255,255,0.72)',
                                border: '1px solid rgba(59,130,246,0.16)',
                                borderRadius: 'var(--radius-md)',
                                padding: '0.65rem',
                            }}>
                                <div style={{ fontWeight: 800, fontSize: '0.78rem' }}>{principle.label}</div>
                                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.7rem', lineHeight: 1.35, marginTop: '0.25rem' }}>
                                    {getBenchmarkPattern(principle, lang)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Whole-child learning system */}
                <div className="animate-fade-in" style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Brain size={20} color="var(--color-primary)" /> Hệ điều hành học tập
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.75rem' }}>
                        {systemPlan.map((card) => (
                            <Link key={card.id} href={card.href} style={{ textDecoration: 'none' }}>
                                <div className="card card-interactive" style={{
                                    border: `2px solid ${toneColor[card.tone]}30`,
                                    background: `linear-gradient(135deg, ${toneColor[card.tone]}14, rgba(255,255,255,0.78))`,
                                    minHeight: 164,
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                                        <div>
                                            <div style={{ fontWeight: 850, fontSize: '1rem', color: 'var(--color-text-primary)' }}>{card.title}</div>
                                            <div style={{ fontWeight: 900, fontSize: '1.35rem', color: toneColor[card.tone], marginTop: '0.2rem' }}>{card.metric}</div>
                                        </div>
                                        <span style={{ padding: '0.28rem 0.5rem', borderRadius: 999, background: `${toneColor[card.tone]}18`, color: toneColor[card.tone], fontSize: '0.68rem', fontWeight: 850 }}>
                                            {getCardBenchmark(card, lang)}
                                        </span>
                                    </div>
                                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.78rem', lineHeight: 1.45, marginTop: '0.65rem' }}>
                                        {card.nextAction}
                                    </div>
                                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem', lineHeight: 1.35, marginTop: '0.65rem' }}>
                                        {summarizePrinciplesForCard(card)}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Elite Capability Entry */}
                <Link href="/child/elite" style={{ textDecoration: 'none', display: 'block', marginBottom: '2rem' }}>
                    <div className="card card-interactive animate-fade-in" style={{
                        background: 'linear-gradient(135deg, #8b5cf622, #6366f122)',
                        border: '2px solid #8b5cf644',
                        display: 'flex', alignItems: 'center', gap: '1rem',
                    }}>
                        <div style={{
                            width: '48px', height: '48px', borderRadius: 'var(--radius-md)',
                            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Sparkles size={24} color="white" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: '1rem' }}>{t('elite_title')}</div>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>{t('elite_desc')}</div>
                        </div>
                        <div style={{ fontWeight: 700, color: '#8b5cf6', fontSize: '1.5rem' }}>→</div>
                    </div>
                </Link>

                {/* Curriculum Navigator - Full CT 2018 */}
                <Link href="/child/learn" style={{ textDecoration: 'none', display: 'block', marginBottom: '1rem' }}>
                    <div className="card card-interactive animate-fade-in" style={{
                        background: 'linear-gradient(135deg, #3b82f622, #10b98122)',
                        border: '2px solid #3b82f644',
                        display: 'flex', alignItems: 'center', gap: '1rem',
                    }}>
                        <div style={{
                            width: '48px', height: '48px', borderRadius: 'var(--radius-md)',
                            background: 'linear-gradient(135deg, #3b82f6, #10b981)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <BookOpen size={24} color="white" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: '1rem' }}>Chương trình học</div>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>Toán • Tiếng Việt • Tiếng Anh • Khoa học — Lớp 1-5</div>
                        </div>
                        <div style={{ fontWeight: 700, color: '#3b82f6', fontSize: '1.5rem' }}>→</div>
                    </div>
                </Link>

                {/* New modules: Discover + Vocab */}
                <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
                    <Link href="/child/discover" style={{ textDecoration: 'none' }}>
                        <div className="card card-interactive" style={{
                            textAlign: 'center', padding: '1.25rem',
                            background: 'linear-gradient(135deg, #06b6d422, #0ea5e922)',
                            border: '2px solid #06b6d444',
                        }}>
                            <Search size={28} color="#06b6d4" />
                            <div style={{ fontWeight: 700, marginTop: '0.5rem', fontSize: '0.9rem' }}>
                                {t('discover_title') || 'Discover Books'}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                                {t('discover_desc') || 'Open Library & Gutenberg'}
                            </div>
                        </div>
                    </Link>
                    <Link href="/child/vocab" style={{ textDecoration: 'none' }}>
                        <div className="card card-interactive" style={{
                            textAlign: 'center', padding: '1.25rem',
                            background: 'linear-gradient(135deg, #f59e0b22, #f9731622)',
                            border: '2px solid #f59e0b44',
                        }}>
                            <Type size={28} color="#f59e0b" />
                            <div style={{ fontWeight: 700, marginTop: '0.5rem', fontSize: '0.9rem' }}>
                                {t('vocab_title') || 'Vocabulary Builder'}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                                {t('vocab_desc') || 'Learn & quiz words'}
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Today's learning plan */}
                <div className="animate-fade-in">
                    <h2 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={20} color="var(--color-primary)" /> {t('today_plan')}
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {todaysLessons.map((lesson, idx) => {
                            const subjectIcons: Record<string, string> = { 'Toán': '🔢', 'Tiếng Việt': '📖', 'Tiếng Anh': '🌍' };
                            const subjectColors: Record<string, string> = { 'Toán': '#6366f1', 'Tiếng Việt': '#10b981', 'Tiếng Anh': '#f59e0b' };
                            return (
                                <div
                                    key={lesson.id}
                                    className="card card-interactive"
                                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', animationDelay: `${0.1 * idx}s` }}
                                    onClick={() => router.push(`/session?lessonId=${lesson.id}`)}
                                >
                                    <div style={{
                                        width: '48px', height: '48px', borderRadius: 'var(--radius-md)',
                                        background: `linear-gradient(135deg, ${subjectColors[lesson.subject] || '#6366f1'}22, ${subjectColors[lesson.subject] || '#6366f1'}11)`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                                    }}>
                                        {subjectIcons[lesson.subject] || '📚'}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{lesson.title}</div>
                                        <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>
                                            {lesson.subject} • {lesson.exercises.length} {t('exercises')}
                                        </div>
                                    </div>
                                    <button className="btn btn-primary btn-sm">{t('learn_btn')}</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <nav className="bottom-nav">
                <Link href="/child" className="nav-item active">
                    <Home size={20} /><span>{t('nav_home')}</span>
                </Link>
                <Link href="/child/elite" className="nav-item">
                    <Sparkles size={20} /><span>{t('nav_elite')}</span>
                </Link>
                <Link href="/child/review" className="nav-item">
                    <RotateCcw size={20} /><span>{t('nav_review')}</span>
                </Link>
                <Link href="/child/mistakes" className="nav-item">
                    <Brain size={20} /><span>{t('nav_mistakes')}</span>
                </Link>
                <Link href="/child/reading" className="nav-item">
                    <BookOpen size={20} /><span>{t('nav_reading')}</span>
                </Link>
            </nav>
        </div>
    );
}
