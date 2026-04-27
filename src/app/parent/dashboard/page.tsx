'use client';

import { useAppStore } from '@/stores/app-store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Settings, Calendar, Shield, TrendingUp, AlertTriangle, Target, Heart, BookOpen, Star } from 'lucide-react';

export default function ParentDashboard() {
    const router = useRouter();
    const {
        childProfile, parentProfile, masteryStates, mistakes, attempts,
        reviewSchedules, reflections, readingEntries, parentMissions,
        completeParentMission, aiInteractionLogs,
    } = useAppStore();

    // CASEL & Civic Domains calculation
    const domainScores = {
        'Tự nhận thức (Self-Aware)': Math.min(100, reflections.length * 10 + 20),
        'Quyết định (Decision Making)': Math.min(100, attempts.filter(a => a.lessonId.includes('elite')).length * 5 + 10),
        'Tài chính (Finance)': Math.min(100, masteryStates.filter(ms => ms.competencyId.includes('finance') && ms.state === 'mastered').length * 20 + 10),
        'Luật lệ (Civics)': Math.min(100, masteryStates.filter(ms => ms.competencyId.includes('civics') && ms.state === 'mastered').length * 20 + 10),
    };

    if (!childProfile || !parentProfile) {
        router.push('/parent/onboarding');
        return null;
    }

    // Compute insights
    const totalCompetencies = masteryStates.length;
    const masteredCount = masteryStates.filter((ms) => ms.state === 'mastered' || ms.state === 'transfer_success').length;
    const progressPct = totalCompetencies > 0 ? Math.round((masteredCount / totalCompetencies) * 100) : 0;
    const unresolvedMistakes = mistakes.filter((m) => !m.resolvedAt);
    const recentAttempts = attempts.slice(-10);
    const correctCount = recentAttempts.filter((a) => a.isCorrect).length;
    const accuracyPct = recentAttempts.length > 0 ? Math.round((correctCount / recentAttempts.length) * 100) : 0;
    const totalSessions = new Set(attempts.map((a) => a.lessonId)).size;
    const booksRead = readingEntries.length;
    const pendingMissions = parentMissions.filter((m) => !m.completedAt);
    const avgHintLevel = recentAttempts.length > 0
        ? (recentAttempts.reduce((sum, a) => sum + a.hintLevelUsed, 0) / recentAttempts.length).toFixed(1)
        : '0';

    // Top mistake type
    const errorCounts: Record<string, number> = {};
    unresolvedMistakes.forEach((m) => {
        errorCounts[m.errorType] = (errorCounts[m.errorType] || 0) + 1;
    });
    const topErrorType = Object.entries(errorCounts).sort((a, b) => b[1] - a[1])[0];

    // Determine highlight, concern, action
    const highlight = accuracyPct >= 80
        ? `${childProfile.nameOrNickname} đạt ${accuracyPct}% chính xác trong 10 bài gần nhất!`
        : totalSessions > 0
            ? `${childProfile.nameOrNickname} đã hoàn thành ${totalSessions} bày học.`
            : `${childProfile.nameOrNickname} sẵn sàng bắt đầu hành trình học tập!`;

    const concern = topErrorType
        ? `Lỗi thường gặp nhất: "${topErrorType[0]}" (${topErrorType[1]} lần). Cần ôn tập thêm.`
        : unresolvedMistakes.length > 0
            ? `Có ${unresolvedMistakes.length} lỗi chưa sửa.`
            : 'Chưa có dữ liệu lo ngại - rất tốt!';

    const action = unresolvedMistakes.length > 3
        ? 'Cùng con xem lại sổ lỗi sai và sửa 2-3 lỗi trước khi học bài mới.'
        : avgHintLevel > '2'
            ? 'Con đang cần nhiều gợi ý. Thử học cùng con 15 phút tuần này.'
            : 'Hỏi con: "Hôm nay con học được điều gì hay nhất?"';

    return (
        <div style={{ minHeight: '100dvh', background: 'var(--color-bg-parent)', fontFamily: 'var(--font-parent)' }}>
            <div className="page-container">
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>Xin chào {parentProfile.name}</div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Dashboard phụ huynh</h1>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Link href="/parent/settings"><button className="btn btn-ghost btn-sm"><Shield size={18} /></button></Link>
                        <Link href="/"><button className="btn btn-ghost btn-sm"><Star size={18} /></button></Link>
                    </div>
                </div>

                {/* One Highlight / One Concern / One Action */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                    <div className="card animate-fade-in" style={{ borderLeft: '4px solid var(--color-success)', padding: '1rem 1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                            <TrendingUp size={16} color="var(--color-success)" />
                            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-success)' }}>Điểm sáng</span>
                        </div>
                        <p style={{ fontSize: '0.9rem' }}>{highlight}</p>
                    </div>

                    <div className="card animate-fade-in" style={{ borderLeft: '4px solid var(--color-warning)', padding: '1rem 1.25rem', animationDelay: '0.05s' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                            <AlertTriangle size={16} color="var(--color-warning)" />
                            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-warning)' }}>Cần chú ý</span>
                        </div>
                        <p style={{ fontSize: '0.9rem' }}>{concern}</p>
                    </div>

                    <div className="card animate-fade-in" style={{ borderLeft: '4px solid var(--color-primary)', padding: '1rem 1.25rem', animationDelay: '0.1s' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                            <Target size={16} color="var(--color-primary)" />
                            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-primary)' }}>Gợi ý hành động</span>
                        </div>
                        <p style={{ fontSize: '0.9rem' }}>{action}</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '2rem' }}>
                    {[
                        { label: 'Độ chính xác', value: `${accuracyPct}%`, color: accuracyPct >= 80 ? 'var(--color-success)' : 'var(--color-warning)' },
                        { label: 'Bài học', value: totalSessions, color: 'var(--color-primary)' },
                        { label: 'Đã thành thạo', value: `${masteredCount}/${totalCompetencies}`, color: 'var(--color-success)' },
                        { label: 'Sách đã đọc', value: booksRead, color: 'var(--color-info)' },
                        { label: 'Lỗi chưa sửa', value: unresolvedMistakes.length, color: unresolvedMistakes.length > 3 ? 'var(--color-danger)' : 'var(--color-text-secondary)' },
                        { label: 'Mức gợi ý TB', value: `L${avgHintLevel}`, color: 'var(--color-accent)' },
                    ].map((stat, idx) => (
                        <div key={idx} className="card" style={{ textAlign: 'center', padding: '1rem' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Longitudinal Portfolio (CASEL/WEF Framework) */}
                <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Shield size={18} color="var(--color-info)" /> Trực quan Phát triển (CASEL/WEF)
                </h2>
                <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem', background: 'var(--color-bg)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {Object.entries(domainScores).map(([domain, score]) => (
                            <div key={domain}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                                    <span style={{ fontWeight: 600 }}>{domain}</span>
                                    <span style={{ color: 'var(--color-text-secondary)' }}>{score}/100</span>
                                </div>
                                <div style={{ width: '100%', height: '8px', background: 'var(--color-bg-session)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{
                                        width: `\${score}%`,
                                        height: '100%',
                                        background: score > 70 ? 'var(--color-success)' : score > 40 ? 'var(--color-primary)' : 'var(--color-warning)',
                                        transition: 'width 1s ease-in-out'
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                        * Phân tích dựa trên {reflections.length} quyết định Elite và câu trả lời tự luận trong suốt lộ trình học.
                    </div>
                </div>

                {/* Parent Mission */}
                <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Heart size={18} color="var(--color-danger)" /> Nhiệm vụ hôm nay
                </h2>
                {pendingMissions.length > 0 ? (
                    <div className="card" style={{ marginBottom: '2rem' }}>
                        <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{pendingMissions[0].title}</div>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>{pendingMissions[0].description}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="badge badge-primary">{pendingMissions[0].durationMinutes} phút</span>
                            <button className="btn btn-success btn-sm" onClick={() => completeParentMission(pendingMissions[0].id)}>
                                Đã làm ✓
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="card" style={{ textAlign: 'center', padding: '2rem', marginBottom: '2rem' }}>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Đã hoàn thành tất cả nhiệm vụ! 🎉</p>
                    </div>
                )}

                {/* Quick Links */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Link href="/parent/weekly-review" style={{ textDecoration: 'none' }}>
                        <div className="card card-interactive" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
                            <Calendar size={20} color="var(--color-primary)" />
                            <span style={{ fontWeight: 600 }}>Đánh giá tuần</span>
                        </div>
                    </Link>
                    <Link href="/parent/settings" style={{ textDecoration: 'none' }}>
                        <div className="card card-interactive" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
                            <Settings size={20} color="var(--color-text-secondary)" />
                            <span style={{ fontWeight: 600 }}>Cài đặt an toàn</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
