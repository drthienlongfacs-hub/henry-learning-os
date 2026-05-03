'use client';

import { useMemo } from 'react';
import { useAppStore } from '@/stores/app-store';
import { useTranslation } from '@/lib/i18n';
import { LangToggle } from '@/components/LangToggle';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    BookOpen, Brain, Clock, RotateCcw,
    Home, Sparkles, ChevronRight, Play,
    Target, Flame, Trophy, Zap,
} from 'lucide-react';
import { buildWholeChildLearningPlan, getCardBenchmark } from '@/lib/whole-child-learning-plan';
import XPDashboard from '@/components/gamification/XPDashboard';
import WordOfDay from '@/components/gamification/WordOfDay';

// ── Subject config ──
const SUBJECTS: { key: string; name: string; icon: string; color: string; bg: string; minGrade?: number }[] = [
    { key: 'math', name: 'Toán', icon: '🔢', color: '#6366f1', bg: 'linear-gradient(135deg,#6366f1,#818cf8)' },
    { key: 'vietnamese', name: 'Tiếng Việt', icon: '📖', color: '#8b5cf6', bg: 'linear-gradient(135deg,#8b5cf6,#a78bfa)' },
    { key: 'english', name: 'English', icon: '🌍', color: '#10b981', bg: 'linear-gradient(135deg,#10b981,#34d399)' },
    { key: 'science', name: 'Khoa học', icon: '🔬', color: '#f59e0b', bg: 'linear-gradient(135deg,#f59e0b,#fbbf24)' },
    { key: 'ethics', name: 'Đạo đức', icon: '💛', color: '#f43f5e', bg: 'linear-gradient(135deg,#f43f5e,#fb7185)' },
    { key: 'art', name: 'Nghệ thuật', icon: '🎨', color: '#d946ef', bg: 'linear-gradient(135deg,#d946ef,#e879f9)' },
    { key: 'computing', name: 'Tin học', icon: '💻', color: '#14b8a6', bg: 'linear-gradient(135deg,#14b8a6,#2dd4bf)', minGrade: 3 },
    { key: 'hisgeo', name: 'Sử & Địa', icon: '🗺️', color: '#6366f1', bg: 'linear-gradient(135deg,#3b82f6,#60a5fa)', minGrade: 4 },
];

const TONE_ICON: Record<string, string> = { repair: '🔧', review: '🔄', learn: '📚', stretch: '🚀' };

export default function ChildDashboard() {
    const router = useRouter();
    const { childProfile, masteryStates, mistakes, reviewSchedules, attempts } = useAppStore();
    const { t, lang } = useTranslation();
    const activeChild = childProfile ?? { nameOrNickname: 'Henry' };
    const grade = (childProfile as { gradeLevel?: number } | null)?.gradeLevel || 3;

    const unresolvedMistakes = mistakes.filter((m) => !m.resolvedAt).length;
    const dueReviews = reviewSchedules.filter((r) => new Date(r.scheduledAt) <= new Date()).length;
    const masteredCount = masteryStates.filter((ms) => ms.state === 'mastered').length;
    const totalAttempts = attempts.length;
    const correctAttempts = attempts.filter(a => a.isCorrect).length;
    const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;
    const progressPct = masteryStates.length > 0 ? Math.round((masteredCount / masteryStates.length) * 100) : 0;

    const streak = useMemo(() => {
        const dates = attempts.filter(a => a.isCorrect).map(a => new Date(a.createdAt).toDateString());
        const unique = [...new Set(dates)].sort().reverse();
        let count = 0;
        const today = new Date();
        for (let i = 0; i < unique.length; i++) {
            const diff = Math.floor((today.getTime() - new Date(unique[i]).getTime()) / 86400000);
            if (diff <= i + 1) count++; else break;
        }
        return count;
    }, [attempts]);

    const systemPlan = buildWholeChildLearningPlan({ attempts, mistakes, reviewSchedules });
    const availableSubjects = SUBJECTS.filter(s => !s.minGrade || grade >= s.minGrade);

    // Time-based greeting
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Buổi sáng vui vẻ' : hour < 18 ? 'Buổi chiều năng động' : 'Buổi tối ấm áp';
    const greetEmoji = hour < 12 ? '🌅' : hour < 18 ? '☀️' : '🌙';

    return (
        <div style={{
            paddingBottom: '5.5rem',
            minHeight: '100dvh',
            background: 'linear-gradient(180deg, #eef2ff 0%, #f0f4ff 40%, #faf5ff 100%)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Decorative blobs */}
            <div className="hero-blob" style={{ width: 200, height: 200, background: '#818cf8', top: -60, right: -40 }} />
            <div className="hero-blob" style={{ width: 160, height: 160, background: '#f0abfc', top: 120, left: -50, animationDelay: '2s' }} />

            <div className="page-container">
                {/* ═══ Header ═══ */}
                <div className="animate-fade-in" style={{ marginBottom: '1.25rem', position: 'relative', zIndex: 2 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                                {greetEmoji} {greeting}
                            </div>
                            <h1 style={{
                                fontSize: '1.65rem', fontWeight: 900, letterSpacing: '-0.02em',
                                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            }}>
                                {activeChild.nameOrNickname} 👋
                            </h1>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <LangToggle />
                            <div className="progress-ring" style={{ '--progress': `${progressPct}%` } as React.CSSProperties}>
                                <div className="progress-ring-inner">{progressPct}%</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══ Stats Pills ═══ */}
                <div className="animate-fade-in stagger" style={{
                    display: 'flex', gap: '0.4rem', marginBottom: '1.25rem',
                    overflowX: 'auto', scrollbarWidth: 'none',
                }}>
                    {[
                        { icon: <Target size={14} />, val: `${accuracy}%`, label: 'Chính xác', color: '#6366f1' },
                        { icon: <Flame size={14} />, val: `${streak}`, label: 'Chuỗi ngày', color: '#f59e0b' },
                        { icon: <Trophy size={14} />, val: `${totalAttempts}`, label: 'Bài làm', color: '#10b981' },
                        { icon: <Zap size={14} />, val: `${unresolvedMistakes}`, label: 'Lỗi', color: '#ef4444' },
                    ].map((s, i) => (
                        <div key={i} className="animate-fade-scale" style={{
                            display: 'flex', alignItems: 'center', gap: '0.4rem',
                            padding: '0.45rem 0.7rem', borderRadius: 999,
                            background: `${s.color}10`, border: `1.5px solid ${s.color}20`,
                            whiteSpace: 'nowrap', flex: '0 0 auto',
                        }}>
                            <span style={{ color: s.color }}>{s.icon}</span>
                            <span style={{ fontWeight: 900, fontSize: '0.85rem', color: s.color }}>{s.val}</span>
                            <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* ═══ XP Dashboard + Word of Day ═══ */}
                <div className="animate-fade-in" style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem' }}>
                    <XPDashboard lang={lang} />
                    <WordOfDay lang={lang} />
                </div>

                {/* ═══ Hero CTA ═══ */}
                <button
                    className="animate-fade-in"
                    onClick={() => router.push('/child/learn')}
                    style={{
                        width: '100%', padding: '1rem 1.25rem', marginBottom: '0.75rem',
                        border: 'none', cursor: 'pointer',
                        borderRadius: 'var(--radius-xl)',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)',
                        color: 'white',
                        display: 'flex', alignItems: 'center', gap: '0.85rem',
                        boxShadow: '0 8px 32px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
                        transition: 'all 0.25s',
                        position: 'relative', overflow: 'hidden',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px) scale(1.01)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; }}
                >
                    <div style={{
                        width: 48, height: 48, borderRadius: 14,
                        background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <Play size={24} fill="white" />
                    </div>
                    <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontWeight: 900, fontSize: '1.05rem' }}>Bắt đầu học</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>8 môn • Lớp {grade} • CT 2018</div>
                    </div>
                    <ChevronRight size={22} style={{ opacity: 0.7 }} />
                </button>

                {/* ═══ Quick Actions Row ═══ */}
                <div className="animate-fade-in" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <button
                        onClick={() => router.push('/child/review')}
                        style={{
                            flex: 1, padding: '0.7rem', cursor: 'pointer',
                            borderRadius: 'var(--radius-lg)',
                            background: 'rgba(139,92,246,0.08)',
                            border: '1.5px solid rgba(139,92,246,0.15)',
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            transition: 'all 0.2s',
                        } as React.CSSProperties}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; }}
                    >
                        <RotateCcw size={18} color="#8b5cf6" />
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontWeight: 800, fontSize: '0.78rem', color: '#7c3aed' }}>Ôn tập</div>
                            <div style={{ fontSize: '0.62rem', color: 'var(--color-text-muted)' }}>
                                {dueReviews > 0 ? `${dueReviews} mục cần ôn` : 'Quiz đa môn'}
                            </div>
                        </div>
                    </button>
                    <button
                        onClick={() => router.push('/child/mistakes')}
                        style={{
                            flex: 1, padding: '0.7rem', cursor: 'pointer',
                            borderRadius: 'var(--radius-lg)',
                            background: unresolvedMistakes > 0 ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)',
                            border: `1.5px solid ${unresolvedMistakes > 0 ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)'}`,
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            transition: 'all 0.2s',
                        } as React.CSSProperties}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; }}
                    >
                        <Brain size={18} color={unresolvedMistakes > 0 ? '#ef4444' : '#10b981'} />
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontWeight: 800, fontSize: '0.78rem', color: unresolvedMistakes > 0 ? '#ef4444' : '#059669' }}>
                                {unresolvedMistakes > 0 ? 'Sửa lỗi' : 'Hoàn hảo!'}
                            </div>
                            <div style={{ fontSize: '0.62rem', color: 'var(--color-text-muted)' }}>
                                {unresolvedMistakes > 0 ? `${unresolvedMistakes} lỗi chờ sửa` : 'Không có lỗi'}
                            </div>
                        </div>
                    </button>
                    <button
                        onClick={() => router.push('/child/reading')}
                        style={{
                            flex: 1, padding: '0.7rem', cursor: 'pointer',
                            borderRadius: 'var(--radius-lg)',
                            background: 'rgba(6,182,212,0.08)',
                            border: '1.5px solid rgba(6,182,212,0.15)',
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            transition: 'all 0.2s',
                        } as React.CSSProperties}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; }}
                    >
                        <BookOpen size={18} color="#06b6d4" />
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontWeight: 800, fontSize: '0.78rem', color: '#0891b2' }}>Đọc sách</div>
                            <div style={{ fontSize: '0.62rem', color: 'var(--color-text-muted)' }}>Song ngữ</div>
                        </div>
                    </button>
                </div>

                {/* ═══ Subject Grid ═══ */}
                <div className="animate-fade-in" style={{ marginBottom: '1.25rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                        Chọn môn học
                    </div>
                    <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.45rem' }}>
                        {availableSubjects.map(s => (
                            <button
                                key={s.key}
                                className="subject-btn animate-fade-scale"
                                onClick={() => router.push(`/child/learn?subject=${s.key}`)}
                                style={{
                                    textAlign: 'center', padding: '0.65rem 0.2rem',
                                    border: 'none', cursor: 'pointer',
                                    borderRadius: 'var(--radius-lg)',
                                    background: s.bg,
                                    color: 'white',
                                    boxShadow: `0 4px 14px ${s.color}30`,
                                    transition: 'all 0.25s',
                                    position: 'relative',
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px) scale(1.04)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; }}
                            >
                                <div style={{ fontSize: '1.5rem', marginBottom: '0.15rem', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}>
                                    {s.icon}
                                </div>
                                <div style={{ fontWeight: 800, fontSize: '0.62rem', letterSpacing: '0.01em', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                                    {s.name}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ═══ Learning System ═══ */}
                <div className="animate-fade-in" style={{ marginBottom: '1.25rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                        Hệ thống học tập
                    </div>
                    <div className="stagger" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem' }}>
                        {systemPlan.map((card) => {
                            const toneColors: Record<string, string> = { repair: '#ef4444', review: '#3b82f6', learn: '#10b981', stretch: '#8b5cf6' };
                            const c = toneColors[card.tone] || '#6366f1';
                            return (
                                <button
                                    key={card.id}
                                    className="card card-interactive animate-fade-scale"
                                    onClick={() => router.push(card.href)}
                                    style={{
                                        cursor: 'pointer', textAlign: 'left',
                                        padding: '0.85rem',
                                        borderLeft: `3px solid ${c}`,
                                        background: `linear-gradient(135deg, ${c}06, rgba(255,255,255,0.9))`,
                                    }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.3rem' }}>
                                        <span style={{ fontSize: '0.9rem' }}>{TONE_ICON[card.tone]}</span>
                                        <span style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--color-text-primary)' }}>{card.title}</span>
                                    </div>
                                    <div style={{ fontWeight: 900, fontSize: '1.05rem', color: c, marginBottom: '0.25rem' }}>
                                        {card.metric}
                                    </div>
                                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.68rem', lineHeight: 1.4 }}>
                                        {card.nextAction.slice(0, 70)}{card.nextAction.length > 70 ? '…' : ''}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ═══ Explore Row ═══ */}
                <div className="animate-fade-in" style={{ display: 'flex', gap: '0.45rem', marginBottom: '1.25rem' }}>
                    {[
                        { href: '/child/library', icon: '📚', name: 'Thư viện', desc: 'Sách', color: '#7c3aed' },
                        { href: '/child/discover', icon: '🔍', name: 'Khám phá', desc: 'Tìm sách', color: '#06b6d4' },
                        { href: '/child/elite', icon: '⭐', name: 'Tinh hoa', desc: 'Nâng cao', color: '#f59e0b' },
                    ].map(item => (
                        <Link key={item.href} href={item.href} style={{ textDecoration: 'none', flex: 1 }}>
                            <div className="card card-interactive" style={{
                                textAlign: 'center', padding: '0.6rem 0.3rem',
                            }}>
                                <div style={{ fontSize: '1.2rem', marginBottom: '0.1rem' }}>{item.icon}</div>
                                <div style={{ fontWeight: 800, fontSize: '0.65rem', color: item.color }}>{item.name}</div>
                                <div style={{ fontSize: '0.52rem', color: 'var(--color-text-muted)' }}>{item.desc}</div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* ═══ Recent Activity ═══ */}
                {attempts.length > 0 && (
                    <div className="animate-fade-in">
                        <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <Clock size={15} color="var(--color-text-secondary)" /> Gần đây
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                            {attempts.slice(-5).reverse().map((a) => (
                                <div key={a.id} className="card animate-slide-right" style={{
                                    padding: '0.45rem 0.7rem',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                        <span style={{
                                            width: 6, height: 6, borderRadius: '50%',
                                            background: a.isCorrect ? '#10b981' : '#ef4444',
                                            display: 'inline-block',
                                        }} />
                                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>
                                            {a.competencyId?.replace(/_/g, ' ').slice(0, 28)}
                                        </span>
                                    </div>
                                    <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>
                                        {new Date(a.createdAt).toLocaleDateString('vi')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ═══ Empty state ═══ */}
                {attempts.length === 0 && (
                    <div className="card animate-fade-in" style={{
                        textAlign: 'center', padding: '2rem',
                        background: 'linear-gradient(135deg, rgba(99,102,241,0.04), rgba(139,92,246,0.04))',
                    }}>
                        <div className="animate-float" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🚀</div>
                        <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-text-primary)', marginBottom: '0.3rem' }}>
                            Sẵn sàng khám phá!
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                            Chọn một môn học ở trên để bắt đầu hành trình học tập nào ✨
                        </div>
                    </div>
                )}
            </div>

            {/* ═══ Bottom Navigation ═══ */}
            <nav className="bottom-nav">
                <Link href="/child" className="nav-item active"><Home size={20} /><span>{t('nav_home')}</span></Link>
                <Link href="/child/learn" className="nav-item"><BookOpen size={20} /><span>Học</span></Link>
                <Link href="/child/review" className="nav-item"><RotateCcw size={20} /><span>{t('nav_review')}</span></Link>
                <Link href="/child/mistakes" className="nav-item"><Brain size={20} /><span>{t('nav_mistakes')}</span></Link>
                <Link href="/child/elite" className="nav-item"><Sparkles size={20} /><span>{t('nav_elite')}</span></Link>
            </nav>
        </div>
    );
}
