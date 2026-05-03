'use client';

import { useState, useMemo } from 'react';
import { useAppStore } from '@/stores/app-store';
import { useTranslation } from '@/lib/i18n';
import { LangToggle } from '@/components/LangToggle';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    BookOpen, Brain, Clock, AlertTriangle, Bookmark, RotateCcw,
    Home, Sparkles, Search, Type, ChevronRight, Play, Zap,
    Target, Flame, Trophy, Star, GraduationCap,
} from 'lucide-react';
import { buildWholeChildLearningPlan, summarizePrinciplesForCard, getCardBenchmark } from '@/lib/whole-child-learning-plan';

// ── Subject config ──
const SUBJECTS: { key: string; name: string; icon: string; color: string; emoji: string; minGrade?: number }[] = [
    { key: 'math', name: 'Toán', icon: '🔢', color: '#3b82f6', emoji: '➕' },
    { key: 'vietnamese', name: 'T. Việt', icon: '📖', color: '#8b5cf6', emoji: '✍️' },
    { key: 'english', name: 'T. Anh', icon: '🇬🇧', color: '#10b981', emoji: '🌍' },
    { key: 'science', name: 'Khoa học', icon: '🔬', color: '#f59e0b', emoji: '🧪' },
    { key: 'ethics', name: 'Đạo đức', icon: '💛', color: '#f43f5e', emoji: '🤝' },
    { key: 'art', name: 'Nghệ thuật', icon: '🎨', color: '#d946ef', emoji: '🎵' },
    { key: 'computing', name: 'Tin học', icon: '💻', color: '#14b8a6', emoji: '🖥️', minGrade: 3 },
    { key: 'hisgeo', name: 'Sử/Địa', icon: '🌏', color: '#6366f1', emoji: '🗺️', minGrade: 4 },
];

const toneColor = {
    repair: '#ef4444',
    review: '#3b82f6',
    learn: '#10b981',
    stretch: '#8b5cf6',
} as const;

export default function ChildDashboard() {
    const router = useRouter();
    const { childProfile, masteryStates, mistakes, reviewSchedules, attempts } = useAppStore();
    const { t, lang } = useTranslation();
    const activeChild = childProfile ?? { nameOrNickname: 'Henry', gradeLevel: 3 };
    const grade = (childProfile as { gradeLevel?: number } | null)?.gradeLevel || 3;

    const unresolvedMistakes = mistakes.filter((m) => !m.resolvedAt).length;
    const dueReviews = reviewSchedules.filter((r) => new Date(r.scheduledAt) <= new Date()).length;
    const masteredCount = masteryStates.filter((ms) => ms.state === 'mastered').length;
    const totalAttempts = attempts.length;
    const correctAttempts = attempts.filter(a => a.isCorrect).length;
    const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 0;
    const progressPct = masteryStates.length > 0 ? Math.round((masteredCount / masteryStates.length) * 100) : 0;

    // Streak calculation
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

    // Build action plan from real data
    const systemPlan = buildWholeChildLearningPlan({ attempts, mistakes, reviewSchedules });

    // Available subjects for this grade
    const availableSubjects = SUBJECTS.filter(s => !s.minGrade || grade >= s.minGrade);

    return (
        <div style={{ paddingBottom: '5rem', background: 'var(--color-bg-child)', minHeight: '100dvh' }}>
            <div className="page-container">
                {/* ═══ Header ═══ */}
                <div className="animate-fade-in" style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{t('greeting')}</div>
                            <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{activeChild.nameOrNickname} 👋</h1>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <LangToggle />
                            <div className="progress-ring" style={{ '--progress': `${progressPct}%` } as React.CSSProperties}>
                                <div className="progress-ring-inner">{progressPct}%</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══ Stats Row ═══ */}
                <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <div className="card" style={{ padding: '0.6rem', textAlign: 'center', background: 'linear-gradient(135deg, #667eea11, #764ba211)' }}>
                        <Target size={16} color="#667eea" />
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#667eea' }}>{accuracy}%</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>Độ chính xác</div>
                    </div>
                    <div className="card" style={{ padding: '0.6rem', textAlign: 'center', background: 'linear-gradient(135deg, #f5923611, #ff6b6b11)' }}>
                        <Flame size={16} color="#f59236" />
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f59236' }}>{streak}</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>Chuỗi ngày</div>
                    </div>
                    <div className="card" style={{ padding: '0.6rem', textAlign: 'center', background: 'linear-gradient(135deg, #ef444411, #f4735e11)' }}>
                        <AlertTriangle size={16} color="#ef4444" />
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ef4444' }}>{unresolvedMistakes}</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>Lỗi cần sửa</div>
                    </div>
                    <div className="card" style={{ padding: '0.6rem', textAlign: 'center', background: 'linear-gradient(135deg, #10b98111, #059e6511)' }}>
                        <Trophy size={16} color="#10b981" />
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#10b981' }}>{totalAttempts}</div>
                        <div style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>Tổng bài</div>
                    </div>
                </div>

                {/* ═══ Quick Actions ═══ */}
                <div className="animate-fade-in" style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1.25rem',
                }}>
                    <button
                        className="card card-interactive"
                        onClick={() => router.push('/child/learn')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer',
                            background: 'linear-gradient(135deg, #3b82f611, #10b98111)',
                            border: '2px solid #3b82f633', textAlign: 'left',
                        }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: 12,
                            background: 'linear-gradient(135deg, #3b82f6, #10b981)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Play size={20} color="white" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>📚 Học bài mới</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>8 môn • Lớp {grade}</div>
                        </div>
                    </button>
                    <button
                        className="card card-interactive"
                        onClick={() => router.push('/child/review')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer',
                            background: 'linear-gradient(135deg, #8b5cf611, #6366f111)',
                            border: '2px solid #8b5cf633', textAlign: 'left',
                        }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: 12,
                            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <RotateCcw size={20} color="white" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>🧠 Ôn tập</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>
                                {dueReviews > 0 ? `${dueReviews} mục cần ôn` : 'Quiz tổng hợp'}
                            </div>
                        </div>
                    </button>
                </div>

                {/* ═══ Subject Grid — Click to start ═══ */}
                <div className="animate-fade-in" style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <GraduationCap size={18} color="var(--color-primary)" /> Chọn môn học
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                        {availableSubjects.map(s => (
                            <button
                                key={s.key}
                                className="card card-interactive"
                                onClick={() => router.push(`/child/learn?subject=${s.key}`)}
                                style={{
                                    textAlign: 'center', padding: '0.7rem 0.3rem', cursor: 'pointer',
                                    border: `1.5px solid ${s.color}22`,
                                    background: `linear-gradient(135deg, ${s.color}08, ${s.color}04)`,
                                    transition: 'all 0.2s',
                                }}>
                                <div style={{ fontSize: '1.4rem', marginBottom: '0.2rem' }}>{s.icon}</div>
                                <div style={{ fontWeight: 700, fontSize: '0.68rem', color: s.color }}>{s.name}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ═══ Learning Plan Cards ═══ */}
                <div className="animate-fade-in" style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Brain size={18} color="var(--color-primary)" /> Hệ thống học tập
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.6rem' }}>
                        {systemPlan.map((card) => (
                            <button
                                key={card.id}
                                className="card card-interactive"
                                onClick={() => router.push(card.href)}
                                style={{
                                    cursor: 'pointer', textAlign: 'left',
                                    border: `2px solid ${toneColor[card.tone]}25`,
                                    background: `linear-gradient(135deg, ${toneColor[card.tone]}08, rgba(255,255,255,0.85))`,
                                    minHeight: 120,
                                }}>
                                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--color-text-primary)', marginBottom: '0.3rem' }}>
                                    {card.title}
                                </div>
                                <div style={{ fontWeight: 900, fontSize: '1.15rem', color: toneColor[card.tone], marginBottom: '0.3rem' }}>
                                    {card.metric}
                                </div>
                                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.7rem', lineHeight: 1.4 }}>
                                    {card.nextAction.slice(0, 80)}{card.nextAction.length > 80 ? '…' : ''}
                                </div>
                                <div style={{
                                    marginTop: '0.5rem', padding: '0.15rem 0.4rem', borderRadius: 999,
                                    background: `${toneColor[card.tone]}12`, color: toneColor[card.tone],
                                    fontSize: '0.6rem', fontWeight: 700, display: 'inline-block',
                                }}>
                                    {getCardBenchmark(card, lang)}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ═══ More Tools ═══ */}
                <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <Link href="/child/library" style={{ textDecoration: 'none' }}>
                        <div className="card card-interactive" style={{ textAlign: 'center', padding: '0.7rem 0.3rem' }}>
                            <div style={{ fontSize: '1.3rem', marginBottom: '0.15rem' }}>📚</div>
                            <div style={{ fontWeight: 700, fontSize: '0.68rem', color: '#7c3aed' }}>Thư viện</div>
                            <div style={{ fontSize: '0.55rem', color: 'var(--color-text-muted)' }}>Sách song ngữ</div>
                        </div>
                    </Link>
                    <Link href="/child/discover" style={{ textDecoration: 'none' }}>
                        <div className="card card-interactive" style={{ textAlign: 'center', padding: '0.7rem 0.3rem' }}>
                            <div style={{ fontSize: '1.3rem', marginBottom: '0.15rem' }}>🔍</div>
                            <div style={{ fontWeight: 700, fontSize: '0.68rem', color: '#06b6d4' }}>Khám phá</div>
                            <div style={{ fontSize: '0.55rem', color: 'var(--color-text-muted)' }}>Open Library</div>
                        </div>
                    </Link>
                    <Link href="/child/elite" style={{ textDecoration: 'none' }}>
                        <div className="card card-interactive" style={{ textAlign: 'center', padding: '0.7rem 0.3rem' }}>
                            <div style={{ fontSize: '1.3rem', marginBottom: '0.15rem' }}>⭐</div>
                            <div style={{ fontWeight: 700, fontSize: '0.68rem', color: '#8b5cf6' }}>Tinh hoa</div>
                            <div style={{ fontSize: '0.55rem', color: 'var(--color-text-muted)' }}>Năng lực cao</div>
                        </div>
                    </Link>
                </div>

                {/* ═══ Mistakes Quick Fix ═══ */}
                {unresolvedMistakes > 0 && (
                    <button
                        className="card card-interactive animate-fade-in"
                        onClick={() => router.push('/child/mistakes')}
                        style={{
                            width: '100%', marginBottom: '1rem', cursor: 'pointer', textAlign: 'left',
                            background: 'linear-gradient(135deg, #ef444408, #fef2f208)',
                            border: '2px solid #ef444425',
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                        }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: 12,
                            background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Zap size={20} color="white" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#ef4444' }}>
                                {unresolvedMistakes} lỗi cần sửa ngay
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                                Bấm để xem và sửa lỗi đã mắc
                            </div>
                        </div>
                        <ChevronRight size={20} color="#ef4444" />
                    </button>
                )}

                {/* ═══ Recent Activity ═══ */}
                {attempts.length > 0 && (
                    <div className="animate-fade-in">
                        <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Clock size={18} color="var(--color-primary)" /> Hoạt động gần đây
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                            {attempts.slice(-5).reverse().map((a) => (
                                <div key={a.id} className="card" style={{
                                    padding: '0.5rem 0.75rem',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                                        {a.isCorrect ? '✅' : '❌'} {a.competencyId?.replace(/_/g, ' ').slice(0, 30)}
                                    </span>
                                    <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>
                                        {new Date(a.createdAt).toLocaleDateString('vi')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* ═══ Bottom Navigation ═══ */}
            <nav className="bottom-nav">
                <Link href="/child" className="nav-item active"><Home size={20} /><span>{t('nav_home')}</span></Link>
                <Link href="/child/elite" className="nav-item"><Sparkles size={20} /><span>{t('nav_elite')}</span></Link>
                <Link href="/child/review" className="nav-item"><RotateCcw size={20} /><span>{t('nav_review')}</span></Link>
                <Link href="/child/mistakes" className="nav-item"><Brain size={20} /><span>{t('nav_mistakes')}</span></Link>
                <Link href="/child/reading" className="nav-item"><BookOpen size={20} /><span>{t('nav_reading')}</span></Link>
            </nav>
        </div>
    );
}
