'use client';

import { useMemo } from 'react';
import { useAppStore } from '@/stores/app-store';
import { useTranslation } from '@/lib/i18n';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    BookOpen, Brain, RotateCcw,
    Home, ChevronRight, Play,
    Flame, Trophy, Star, Sparkles, Settings
} from 'lucide-react';
import dynamic from 'next/dynamic';

const WordOfDay = dynamic(() => import('@/components/gamification/WordOfDay'), { ssr: false });

// ── 4 môn học trọng tâm hàng ngày (Chunky Big Cards) ──
const CORE_SUBJECTS = [
    { key: 'math', name: 'Toán Vui', icon: '🔢', color: '#4f46e5', bg: 'linear-gradient(135deg, #6366f1, #4338ca)', desc: 'Phép tính & Hình học' },
    { key: 'english', name: 'Tiếng Anh', icon: '🌍', color: '#059669', bg: 'linear-gradient(135deg, #10b981, #047857)', desc: 'Từ vựng & Phát âm' },
    { key: 'vietnamese', name: 'Tiếng Việt', icon: '📖', color: '#7c3aed', bg: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', desc: 'Tập đọc & Ghép vần' },
    { key: 'science', name: 'Khoa Học', icon: '🔬', color: '#d97706', bg: 'linear-gradient(135deg, #f59e0b, #b45309)', desc: 'Thế giới tự nhiên' },
];

export default function ChildDashboard() {
    const router = useRouter();
    const { childProfile, masteryStates, mistakes, reviewSchedules, attempts } = useAppStore();
    const { t } = useTranslation();
    const activeChild = childProfile ?? { nameOrNickname: 'Henry' };
    const grade = (childProfile as { gradeLevel?: number } | null)?.gradeLevel || 1;

    const unresolvedMistakes = mistakes.filter((m) => !m.resolvedAt).length;
    const dueReviews = reviewSchedules.filter((r) => new Date(r.scheduledAt) <= new Date()).length;
    const masteredCount = masteryStates.filter((ms) => ms.state === 'mastered').length;
    const starCount = (masteredCount * 10) + attempts.filter(a => a.isCorrect).length * 2;

    const streak = useMemo(() => {
        const dates = attempts.filter(a => a.isCorrect).map(a => new Date(a.createdAt).toDateString());
        const unique = [...new Set(dates)].sort().reverse();
        let count = 0;
        const today = new Date();
        for (let i = 0; i < unique.length; i++) {
            const diff = Math.floor((today.getTime() - new Date(unique[i]).getTime()) / 86400000);
            if (diff <= i + 1) count++; else break;
        }
        return Math.max(1, count);
    }, [attempts]);

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Chào buổi sáng' : hour < 18 ? 'Chào buổi chiều' : 'Chào buổi tối';

    return (
        <div style={{
            paddingBottom: '6rem',
            minHeight: '100dvh',
            background: 'linear-gradient(180deg, #f8faff 0%, #eef2ff 50%, #faf5ff 100%)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Decorative soft backdrop */}
            <div style={{
                position: 'absolute', top: -80, right: -60, width: 260, height: 260,
                borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', top: 200, left: -60, width: 220, height: 220,
                borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div className="page-container" style={{ maxWidth: 640, margin: '0 auto', padding: '1.25rem 1rem' }}>
                {/* ═══ 1. HEADER (Kid-Friendly & Warm) ═══ */}
                <header style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginBottom: '1.25rem', position: 'relative', zIndex: 2,
                }}>
                    <div>
                        <div style={{ fontSize: '0.95rem', color: '#6366f1', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Sparkles size={16} /> {greeting}
                        </div>
                        <h1 style={{
                            fontSize: '1.85rem', fontWeight: 900, margin: '2px 0 0',
                            background: 'linear-gradient(135deg, #3730a3, #6366f1)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.02em',
                        }}>
                            {activeChild.nameOrNickname} 👋
                        </h1>
                    </div>

                    {/* Gamified Star & Streak Pill + Parent Gate */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '6px 12px', borderRadius: 999,
                            background: 'rgba(255,255,255,0.9)',
                            boxShadow: '0 4px 12px rgba(99,102,241,0.08)',
                            border: '1.5px solid rgba(99,102,241,0.15)',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#d97706', fontWeight: 900, fontSize: '0.95rem' }}>
                                <Star size={16} fill="#f59e0b" color="#f59e0b" />
                                <span>{starCount || 10}</span>
                            </div>
                            <div style={{ width: 1, height: 14, background: '#e2e8f0' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#dc2626', fontWeight: 900, fontSize: '0.95rem' }}>
                                <Flame size={16} fill="#ef4444" color="#ef4444" />
                                <span>{streak}</span>
                            </div>
                        </div>

                        {/* Discrete Parent Gate */}
                        <Link href="/parent/dashboard" style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            width: 36, height: 36, borderRadius: '50%',
                            background: 'rgba(255,255,255,0.85)',
                            border: '1px solid #e2e8f0', color: '#64748b',
                            textDecoration: 'none',
                        }} title="Góc Ba Mẹ">
                            <Settings size={18} />
                        </Link>
                    </div>
                </header>

                {/* ═══ 2. HERO ADVENTURE (Single Big Focus Target) ═══ */}
                <section style={{ marginBottom: '1.5rem' }}>
                    <button
                        onClick={() => router.push('/child/learn')}
                        style={{
                            width: '100%', minHeight: 92, padding: '1.25rem 1.4rem',
                            border: 'none', cursor: 'pointer',
                            borderRadius: '24px',
                            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)',
                            color: 'white',
                            display: 'flex', alignItems: 'center', gap: '1.1rem',
                            boxShadow: '0 12px 28px rgba(99,102,241,0.35), inset 0 2px 0 rgba(255,255,255,0.25)',
                            transition: 'all 0.25s ease',
                            textAlign: 'left',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; }}
                    >
                        <div style={{
                            width: 58, height: 58, borderRadius: 20,
                            background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(10px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            flexShrink: 0,
                            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4)',
                        }}>
                            <Play size={30} fill="white" color="white" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.01em' }}>
                                Bắt Đầu Học Ngay!
                            </div>
                            <div style={{ fontSize: '0.95rem', opacity: 0.9, marginTop: 3, fontWeight: 600 }}>
                                🚀 Lộ trình bài học Lớp {grade}
                            </div>
                        </div>
                        <ChevronRight size={28} style={{ opacity: 0.8 }} />
                    </button>
                </section>

                {/* ═══ 3. CHUNKY SUBJECT ISLANDS (Thẻ môn học lớn 3D) ═══ */}
                <section style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                        fontSize: '1.15rem', fontWeight: 900, color: '#1e1b4b',
                        marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                        <span>🎒 Môn Học Của Bé</span>
                    </div>

                    <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem',
                    }}>
                        {CORE_SUBJECTS.map((sub) => (
                            <button
                                key={sub.key}
                                onClick={() => router.push(`/child/learn?subject=${sub.key}`)}
                                style={{
                                    padding: '1.25rem 1rem',
                                    borderRadius: '20px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    background: sub.bg,
                                    color: 'white',
                                    textAlign: 'left',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    minHeight: 120,
                                    boxShadow: `0 8px 20px ${sub.color}35`,
                                    transition: 'transform 0.2s ease',
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; }}
                            >
                                <div style={{ fontSize: '2.2rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}>
                                    {sub.icon}
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.15rem', fontWeight: 900, letterSpacing: '-0.01em' }}>
                                        {sub.name}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.88, marginTop: 2, fontWeight: 600 }}>
                                        {sub.desc}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* ═══ 4. DISCOVERY HUBS (3 Thẻ Lớn Trải Nghiệm Thú Vị) ═══ */}
                <section style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                        fontSize: '1.15rem', fontWeight: 900, color: '#1e1b4b',
                        marginBottom: '0.85rem',
                    }}>
                        ✨ Không Gian Khám Phá
                    </div>

                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        {/* Đọc sách */}
                        <button
                            onClick={() => router.push('/child/reading')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 14,
                                padding: '1rem 1.25rem', borderRadius: '18px',
                                background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                                border: 'none', color: 'white', cursor: 'pointer',
                                textAlign: 'left', boxShadow: '0 6px 16px rgba(6,182,212,0.25)',
                            }}
                        >
                            <span style={{ fontSize: '2rem' }}>📖</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '1.05rem', fontWeight: 900 }}>Kho Sách & Tập Đọc</div>
                                <div style={{ fontSize: '0.82rem', opacity: 0.9 }}>Nghe giọng đọc bản xứ ấm áp</div>
                            </div>
                            <ChevronRight size={22} style={{ opacity: 0.8 }} />
                        </button>

                        {/* Luyện thi Cambridge */}
                        <button
                            onClick={() => router.push('/child/exams')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 14,
                                padding: '1rem 1.25rem', borderRadius: '18px',
                                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                                border: 'none', color: 'white', cursor: 'pointer',
                                textAlign: 'left', boxShadow: '0 6px 16px rgba(245,158,11,0.25)',
                            }}
                        >
                            <span style={{ fontSize: '2rem' }}>🏆</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '1.05rem', fontWeight: 900 }}>Luyện Thi Cambridge</div>
                                <div style={{ fontSize: '0.82rem', opacity: 0.9 }}>Starters • Movers • Flyers</div>
                            </div>
                            <ChevronRight size={22} style={{ opacity: 0.8 }} />
                        </button>

                        {/* Ôn tập & Sửa lỗi */}
                        <button
                            onClick={() => router.push(unresolvedMistakes > 0 ? '/child/mistakes' : '/child/review')}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 14,
                                padding: '1rem 1.25rem', borderRadius: '18px',
                                background: unresolvedMistakes > 0 ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                                border: 'none', color: 'white', cursor: 'pointer',
                                textAlign: 'left', boxShadow: '0 6px 16px rgba(139,92,246,0.25)',
                            }}
                        >
                            <span style={{ fontSize: '2rem' }}>{unresolvedMistakes > 0 ? '🔧' : '🔄'}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '1.05rem', fontWeight: 900 }}>
                                    {unresolvedMistakes > 0 ? `Sửa ${unresolvedMistakes} Thử Thách` : 'Ôn Tập Vui'}
                                </div>
                                <div style={{ fontSize: '0.82rem', opacity: 0.9 }}>
                                    {dueReviews > 0 ? `${dueReviews} câu hỏi chờ con` : 'Ghi nhớ siêu tốc'}
                                </div>
                            </div>
                            <ChevronRight size={22} style={{ opacity: 0.8 }} />
                        </button>
                    </div>
                </section>

                {/* ═══ 5. WORD OF THE DAY (Nhẹ nhàng & Bổ ích) ═══ */}
                <section style={{ marginBottom: '1rem' }}>
                    <WordOfDay lang="vi" />
                </section>
            </div>

            {/* ═══ BOTTOM NAVIGATION (To, Rõ, Vừa Vặn Ngón Tay) ═══ */}
            <nav className="bottom-nav" role="navigation" aria-label="Menu chính" style={{
                height: '4.25rem', paddingBottom: '0.5rem',
            }}>
                <Link href="/child" className="nav-item active" aria-label="Trang chủ" aria-current="page">
                    <Home size={22} />
                    <span style={{ fontSize: '0.78rem', fontWeight: 800 }}>{t('nav_home')}</span>
                </Link>
                <Link href="/child/learn" className="nav-item" aria-label="Bài học">
                    <BookOpen size={22} />
                    <span style={{ fontSize: '0.78rem', fontWeight: 800 }}>Học</span>
                </Link>
                <Link href="/child/exams" className="nav-item" aria-label="Luyện thi">
                    <Trophy size={22} />
                    <span style={{ fontSize: '0.78rem', fontWeight: 800 }}>Exams</span>
                </Link>
                <Link href="/child/review" className="nav-item" aria-label="Ôn tập">
                    <RotateCcw size={22} />
                    <span style={{ fontSize: '0.78rem', fontWeight: 800 }}>{t('nav_review')}</span>
                </Link>
                <Link href="/child/mistakes" className="nav-item" aria-label="Sửa lỗi">
                    <Brain size={22} />
                    <span style={{ fontSize: '0.78rem', fontWeight: 800 }}>{t('nav_mistakes')}</span>
                </Link>
            </nav>
        </div>
    );
}
