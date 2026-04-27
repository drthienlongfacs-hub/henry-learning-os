'use client';

import { useAppStore } from '@/stores/app-store';
import { computeEliteAnalytics } from '@/lib/variation-engine';
import { ArrowLeft, Download, TrendingUp, Target, Clock, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

/* ─── iOS 26 Liquid Glass Tokens ─── */
const ios = {
    bg: '#FFFFFF', surface: '#F2F2F7', text: '#1D1D1F', secondary: '#6E6E73',
    blue: '#007AFF', green: '#34C759', red: '#FF3B30', orange: '#FF9500',
    purple: '#AF52DE', indigo: '#5856D6', teal: '#5AC8FA',
    radius: '20px', radiusSm: '14px',
    font: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', sans-serif",
    shadow: '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
};

const card: React.CSSProperties = {
    background: 'rgba(255,255,255,0.25)',
    backdropFilter: 'blur(20px) saturate(180%) brightness(1.1)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%) brightness(1.1)',
    borderRadius: ios.radius, border: '1px solid rgba(255,255,255,0.3)',
    boxShadow: ios.shadow, padding: '20px', marginBottom: '16px',
};

const PILLAR_LABELS: Record<string, { label: string; color: string; icon: string }> = {
    probability: { label: 'Xác suất', color: ios.blue, icon: '🧠' },
    finance: { label: 'Tài chính', color: ios.orange, icon: '💰' },
    ethics: { label: 'Đạo đức', color: ios.indigo, icon: '🛡️' },
    negotiation: { label: 'Thương lượng', color: ios.red, icon: '🤝' },
    civics: { label: 'Công dân', color: ios.green, icon: '⚖️' },
};

export default function AnalyticsPage() {
    const attempts = useAppStore((s) => s.attempts);
    const mistakes = useAppStore((s) => s.mistakes);
    const analytics = computeEliteAnalytics(attempts);

    const handleExport = () => {
        const data = {
            exportedAt: new Date().toISOString(),
            summary: {
                totalAttempts: analytics.totalAttempts,
                overallAccuracy: analytics.overallAccuracy,
                pillars: analytics.pillars,
            },
            rawAttempts: attempts.filter(a => a.lessonId.startsWith('elite-')),
            mistakes: mistakes.filter(m => m.competencyId.startsWith('elite-')),
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `henry-elite-analytics-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const dayLabels = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const today = new Date().getDay();
    const weekLabels = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return dayLabels[d.getDay()];
    });

    return (
        <div style={{ minHeight: '100vh', background: ios.surface, fontFamily: ios.font }}>
            {/* Nav */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 100,
                background: 'rgba(242,242,247,0.55)',
                backdropFilter: 'blur(28px) saturate(200%)',
                WebkitBackdropFilter: 'blur(28px) saturate(200%)',
                borderBottom: '0.5px solid rgba(255,255,255,0.35)',
                borderRadius: '0 0 20px 20px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                padding: '12px 16px',
            }}>
                <div style={{ maxWidth: '640px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link href="/parent/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: ios.blue, textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>
                            <ArrowLeft size={18} /> Dashboard
                        </Link>
                        <button onClick={handleExport} style={{
                            display: 'flex', alignItems: 'center', gap: '4px',
                            padding: '6px 12px', borderRadius: '10px', border: 'none',
                            background: ios.blue, color: '#fff', fontSize: '0.82rem',
                            fontWeight: 600, cursor: 'pointer', fontFamily: ios.font,
                        }}>
                            <Download size={14} /> Xuất JSON
                        </button>
                    </div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: ios.text, margin: '8px 0 0' }}>
                        Phân tích Elite
                    </h1>
                </div>
            </div>

            <div style={{ maxWidth: '640px', margin: '0 auto', padding: '12px 16px 32px' }}>
                {/* ─── Summary Cards Row ─── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                    {[
                        { label: 'Tổng câu', value: analytics.totalAttempts, icon: <Target size={18} />, color: ios.blue },
                        { label: 'Chính xác', value: `${analytics.overallAccuracy}%`, icon: <TrendingUp size={18} />, color: ios.green },
                        { label: 'Lỗi', value: mistakes.filter(m => m.competencyId.startsWith('elite-') && !m.resolvedAt).length, icon: <AlertTriangle size={18} />, color: ios.red },
                    ].map((s, i) => (
                        <div key={i} style={{ ...card, textAlign: 'center', padding: '16px 8px' }}>
                            <div style={{ color: s.color, marginBottom: '6px' }}>{s.icon}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: ios.text }}>{s.value}</div>
                            <div style={{ fontSize: '0.75rem', color: ios.secondary, fontWeight: 500 }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* ─── Pillar Accuracy Bars ─── */}
                <div style={card}>
                    <h2 style={{ fontWeight: 700, fontSize: '1.05rem', color: ios.text, marginBottom: '16px' }}>
                        Độ chính xác theo trụ cột
                    </h2>
                    {analytics.pillars.length === 0 && (
                        <p style={{ color: ios.secondary, fontSize: '0.9rem', textAlign: 'center', padding: '20px' }}>
                            Chưa có dữ liệu. Hãy để con chơi Elite trước!
                        </p>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        {analytics.pillars.map(p => {
                            const meta = PILLAR_LABELS[p.pillar] || { label: p.pillar, color: ios.teal, icon: '📊' };
                            return (
                                <div key={p.pillar}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                        <span style={{ fontWeight: 600, fontSize: '0.9rem', color: ios.text }}>
                                            {meta.icon} {meta.label}
                                        </span>
                                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: meta.color }}>
                                            {p.accuracy}% ({p.correct}/{p.total})
                                        </span>
                                    </div>
                                    <div style={{ background: ios.surface, borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                                        <div style={{
                                            width: `${p.accuracy}%`, height: '100%',
                                            background: `linear-gradient(90deg, ${meta.color}CC, ${meta.color})`,
                                            borderRadius: '4px', transition: 'width 0.5s ease',
                                        }} />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                                        <span style={{ fontSize: '0.75rem', color: ios.secondary }}>
                                            <Clock size={10} /> {p.avgTimeSeconds}s trung bình
                                        </span>
                                        <span style={{ fontSize: '0.75rem', color: p.mistakes.length > 3 ? ios.red : ios.secondary }}>
                                            {p.mistakes.length} lỗi
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ─── Weekly Trend Chart ─── */}
                <div style={card}>
                    <h2 style={{ fontWeight: 700, fontSize: '1.05rem', color: ios.text, marginBottom: '16px' }}>
                        Xu hướng 7 ngày
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '120px' }}>
                        {analytics.weeklyTrend.map((val, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                                {val >= 0 ? (
                                    <>
                                        <span style={{ fontSize: '0.7rem', fontWeight: 600, color: ios.text, marginBottom: '4px' }}>
                                            {val}%
                                        </span>
                                        <div style={{
                                            width: '100%', maxWidth: '40px',
                                            height: `${Math.max(val, 5)}%`,
                                            background: `linear-gradient(180deg, ${val >= 70 ? ios.green : val >= 40 ? ios.orange : ios.red}, ${val >= 70 ? ios.green : val >= 40 ? ios.orange : ios.red}88)`,
                                            borderRadius: '6px 6px 0 0',
                                            transition: 'height 0.5s ease',
                                        }} />
                                    </>
                                ) : (
                                    <div style={{
                                        width: '100%', maxWidth: '40px', height: '4px',
                                        background: '#E5E5EA', borderRadius: '2px',
                                    }} />
                                )}
                                <span style={{ fontSize: '0.7rem', color: ios.secondary, marginTop: '4px' }}>
                                    {weekLabels[i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ─── PDCA Insights ─── */}
                <div style={card}>
                    <h2 style={{ fontWeight: 700, fontSize: '1.05rem', color: ios.text, marginBottom: '12px' }}>
                        PDCA — Kế hoạch cải thiện
                    </h2>
                    {analytics.pillars.length === 0 ? (
                        <p style={{ color: ios.secondary, fontSize: '0.9rem' }}>Cần thêm dữ liệu để phân tích.</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {analytics.pillars
                                .sort((a, b) => a.accuracy - b.accuracy)
                                .map(p => {
                                    const meta = PILLAR_LABELS[p.pillar] || { label: p.pillar, color: ios.teal, icon: '📊' };
                                    let action = '';
                                    let priority = '';
                                    if (p.accuracy < 50) {
                                        action = `Ôn lại kiến thức nền tảng. Luyện thêm ${10 - p.total > 0 ? 10 - p.total : 5} câu.`;
                                        priority = '🔴 Ưu tiên cao';
                                    } else if (p.accuracy < 75) {
                                        action = `Rà soát ${p.mistakes.length} lỗi. Tập trung vào các dạng sai nhiều.`;
                                        priority = '🟡 Cần cải thiện';
                                    } else {
                                        action = 'Duy trì và mở rộng sang dạng khó hơn.';
                                        priority = '🟢 Tốt';
                                    }

                                    return (
                                        <div key={p.pillar} style={{
                                            padding: '12px', borderRadius: '12px',
                                            background: p.accuracy < 50 ? '#FFF5F5' : p.accuracy < 75 ? '#FFFAF0' : '#F0FFF4',
                                            border: `1px solid ${p.accuracy < 50 ? '#FED7D7' : p.accuracy < 75 ? '#FEFCBF' : '#C6F6D5'}`,
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: ios.text }}>
                                                    {meta.icon} {meta.label}
                                                </span>
                                                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{priority}</span>
                                            </div>
                                            <p style={{ fontSize: '0.85rem', color: ios.secondary, margin: 0, lineHeight: 1.5 }}>{action}</p>
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </div>

                {/* ─── Raw Data Preview ─── */}
                <div style={card}>
                    <h2 style={{ fontWeight: 700, fontSize: '1.05rem', color: ios.text, marginBottom: '12px' }}>
                        Dữ liệu thô (gần nhất)
                    </h2>
                    <div style={{ maxHeight: '200px', overflowY: 'auto', fontSize: '0.78rem', fontFamily: 'monospace', color: ios.secondary }}>
                        {attempts.filter(a => a.lessonId.startsWith('elite-')).slice(-10).reverse().map((a, i) => (
                            <div key={i} style={{
                                padding: '6px 0', borderBottom: '1px solid #F2F2F7',
                                display: 'flex', justifyContent: 'space-between',
                            }}>
                                <span>{a.lessonId.replace('elite-', '')} — {a.exerciseId.slice(0, 15)}</span>
                                <span style={{ color: a.isCorrect ? ios.green : ios.red, fontWeight: 600 }}>
                                    {a.isCorrect ? '✓' : '✗'} {a.timeSpentSeconds}s
                                </span>
                            </div>
                        ))}
                        {attempts.filter(a => a.lessonId.startsWith('elite-')).length === 0 && (
                            <p style={{ textAlign: 'center', padding: '20px', color: ios.secondary }}>
                                Chưa có dữ liệu. Hãy để con chơi Elite!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
