'use client';

import { useAppStore } from '@/stores/app-store';
import { computeChallengeFitScore, computeAccelerationStatus, computeHintDependencyIndex, generateRecommendation } from '@/lib/adaptive/engine';
import { computeAsynchronousProfile } from '@/lib/adaptive/compactor';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Zap, AlertTriangle, BarChart3 } from 'lucide-react';

const STATUS_LABELS: Record<string, { label: string; color: string; emoji: string }> = {
    foundation_needed: { label: 'Cần xây nền', color: '#ef4444', emoji: '🧱' },
    needs_consolidation: { label: 'Cần ôn cố', color: '#f97316', emoji: '🔄' },
    on_track: { label: 'Đang tiến bộ', color: '#3b82f6', emoji: '📈' },
    ready_for_stretch: { label: 'Sẵn sàng thử thách', color: '#8b5cf6', emoji: '🚀' },
    ready_for_acceleration: { label: 'Sẵn sàng tăng tốc', color: '#10b981', emoji: '⚡' },
    overchallenged: { label: 'Quá tải', color: '#ef4444', emoji: '😰' },
    underchallenged: { label: 'Quá dễ', color: '#eab308', emoji: '😴' },
};

const REC_TYPE_LABELS: Record<string, { label: string; color: string }> = {
    accelerate: { label: 'Tăng tốc', color: '#10b981' },
    compact: { label: 'Bỏ qua phần đã biết', color: '#8b5cf6' },
    enrich: { label: 'Mở rộng', color: '#3b82f6' },
    scaffold: { label: 'Hỗ trợ thêm', color: '#f97316' },
    consolidate: { label: 'Ôn cố', color: '#eab308' },
};

export default function AdaptiveDashboard() {
    const { childProfile, skillStates, accelerationRecommendations, masteryStates, competencies } = useAppStore();

    // Compute profile if we have skill states
    const domains = ['Toán', 'Tiếng Việt', 'Tiếng Anh'];
    const profile = computeAsynchronousProfile(skillStates, domains);

    // Generate demo recommendations from mastery states if we don't have skill states yet
    const recs = accelerationRecommendations.length > 0
        ? accelerationRecommendations
        : [];

    // Compute per-domain mastery
    const domainMastery = domains.map((domain) => {
        const domainComps = competencies.filter((c) => c.subject === domain);
        const domainMS = masteryStates.filter((ms) => domainComps.some((c) => c.id === ms.competencyId));
        const mastered = domainMS.filter((ms) => ms.state === 'mastered' || ms.state === 'transfer_success').length;
        const total = domainMS.length;
        return {
            domain,
            mastered,
            total,
            pct: total > 0 ? Math.round((mastered / total) * 100) : 0,
        };
    });

    return (
        <div style={{ minHeight: '100dvh', background: 'var(--color-bg-parent)', fontFamily: 'var(--font-parent)' }}>
            <div className="page-container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                    <Link href="/parent/dashboard"><button className="btn btn-ghost btn-sm"><ArrowLeft size={18} /></button></Link>
                    <h1 style={{ fontWeight: 800, fontSize: '1.5rem' }}>Adaptive Acceleration</h1>
                </div>

                {/* Asynchronous Profile */}
                <div className="card animate-fade-in" style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <BarChart3 size={18} color="var(--color-primary)" /> Hồ sơ năng lực theo môn
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                        Tuổi là rào cản an toàn, không phải trần học vấn. Mỗi môn phát triển theo tốc độ riêng.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {domainMastery.map((dm) => {
                            const profileData = profile[dm.domain];
                            return (
                                <div key={dm.domain} style={{ padding: '0.75rem', background: 'var(--color-bg-warm)', borderRadius: 'var(--radius-md)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <span style={{ fontWeight: 700 }}>
                                            {dm.domain === 'Toán' ? '🔢' : dm.domain === 'Tiếng Việt' ? '📖' : '🌍'} {dm.domain}
                                        </span>
                                        <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
                                            {profileData?.level || `${dm.pct}% thành thạo`}
                                        </span>
                                    </div>
                                    <div className="mastery-bar">
                                        <div className="mastery-fill" style={{ width: `${dm.pct}%` }} />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                        <span>{dm.mastered}/{dm.total} TC</span>
                                        {profileData?.cfs > 0 && <span>CFS: {profileData.cfs}</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Skill States */}
                {skillStates.length > 0 && (
                    <div className="card animate-fade-in" style={{ marginBottom: '1.5rem' }}>
                        <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Zap size={18} color="var(--color-accent)" /> Trạng thái kỹ năng
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {skillStates.map((ss) => {
                                const cfs = computeChallengeFitScore(ss);
                                const status = computeAccelerationStatus(ss);
                                const statusInfo = STATUS_LABELS[status] || STATUS_LABELS.on_track;
                                const hdi = computeHintDependencyIndex(ss);
                                return (
                                    <div key={ss.skillId} style={{ padding: '0.75rem', background: 'var(--color-bg-warm)', borderRadius: 'var(--radius-md)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontWeight: 600 }}>{ss.skillId}</span>
                                            <span className="badge" style={{ background: `${statusInfo.color}15`, color: statusInfo.color }}>
                                                {statusInfo.emoji} {statusInfo.label}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                                            <span>CFS: {cfs}</span>
                                            <span>Accuracy: {Math.round(ss.independentAccuracy * 100)}%</span>
                                            <span>Gợi ý: {hdi}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Recommendations */}
                <div className="card animate-fade-in" style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <TrendingUp size={18} color="var(--color-success)" /> Đề xuất thích ứng
                    </h2>
                    {recs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>
                            <p>Chưa đủ dữ liệu để đưa ra đề xuất.</p>
                            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Hệ thống cần ít nhất 5 buổi học để phân tích.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {recs.map((rec) => {
                                const typeInfo = REC_TYPE_LABELS[rec.recommendationType] || REC_TYPE_LABELS.enrich;
                                return (
                                    <div key={rec.id} style={{ padding: '1rem', border: `2px solid ${typeInfo.color}30`, borderRadius: 'var(--radius-md)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                            <span className="badge" style={{ background: `${typeInfo.color}15`, color: typeInfo.color }}>{typeInfo.label}</span>
                                            <span className="badge badge-primary">{rec.status}</span>
                                        </div>
                                        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{rec.evidenceSummary}</p>
                                        <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem' }}>
                                            <span style={{ color: 'var(--color-warning)' }}>⚠️ {rec.riskNotes}</span>
                                        </div>
                                        <div style={{ background: 'var(--color-bg-warm)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                                            <strong>Ba/Mẹ cần:</strong> {rec.parentAction}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Explanation */}
                <div className="card" style={{ background: 'var(--color-bg-warm)' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <AlertTriangle size={16} color="var(--color-accent)" /> Nguyên tắc
                    </h3>
                    <ul style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', paddingLeft: '1.25rem' }}>
                        <li>AI không bao giờ thay con suy nghĩ — chỉ hỗ trợ khi con cần</li>
                        <li>Tuổi là guardrail an toàn/UX, không phải trần học vấn</li>
                        <li>Challenge Fit Score (CFS) đo mức phù hợp: 56-80 = lý tưởng</li>
                        <li>Tăng tốc chỉ khi con chứng minh thành thạo độc lập ≥95%</li>
                        <li>Mọi thay đổi cần ba/mẹ phê duyệt</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
