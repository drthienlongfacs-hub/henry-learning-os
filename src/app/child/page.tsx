'use client';

import { useAppStore } from '@/stores/app-store';
import { useTranslation } from '@/lib/i18n';
import { LangToggle } from '@/components/LangToggle';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Brain, Clock, AlertTriangle, Bookmark, RotateCcw, Home, Sparkles, Search, Type } from 'lucide-react';

export default function ChildDashboard() {
    const router = useRouter();
    const { childProfile, lessons, masteryStates, mistakes, reviewSchedules } = useAppStore();
    const { t } = useTranslation();

    if (!childProfile) {
        router.push('/parent/onboarding');
        return null;
    }

    const unresolvedMistakes = mistakes.filter((m) => !m.resolvedAt).length;
    const dueReviews = reviewSchedules.filter((r) => new Date(r.scheduledAt) <= new Date()).length;
    const masteredCount = masteryStates.filter((ms) => ms.state === 'mastered').length;
    const totalCount = masteryStates.length;
    const progressPct = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;

    const todaysLessons = lessons.slice(0, 3);

    return (
        <div style={{ paddingBottom: '5rem', background: 'var(--color-bg-child)', minHeight: '100dvh' }}>
            <div className="page-container">
                {/* Header */}
                <div className="animate-fade-in" style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{t('greeting')}</div>
                            <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{childProfile.nameOrNickname} 👋</h1>
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
                            background: 'linear-gradient(135deg, #f59e0b22, #f97316​22)',
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
