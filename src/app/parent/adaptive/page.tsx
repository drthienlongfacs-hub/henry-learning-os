'use client';

import type { ReactNode } from 'react';
import { useAppStore } from '@/stores/app-store';
import { computeChallengeFitScore, computeAccelerationStatus, computeHintDependencyIndex } from '@/lib/adaptive/engine';
import { computeAsynchronousProfile } from '@/lib/adaptive/compactor';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Zap, AlertTriangle, BarChart3, Calculator, BookOpen, Globe2, FlaskConical, Cpu } from 'lucide-react';
import { MATH_TOPICS } from '@/lib/content/math-generator';
import { VIETNAMESE_TOPICS } from '@/lib/content/vietnamese-generator';
import { ENGLISH_TOPICS } from '@/lib/content/english-generator';
import { SCIENCE_TOPICS } from '@/lib/content/science-generator';
import { HISGEO_TOPICS } from '@/lib/content/history-geo-generator';
import { COMPUTING_TOPICS } from '@/lib/content/computing-generator';
import { buildSubjectEvidenceDashboard, type EvidenceRecommendation } from '@/lib/evidence/learning-evidence';
import type { LearningSubjectKey } from '@/data/curriculum-enrichment';
import type { AccelerationRecommendation } from '@/types';

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
    foundation_needed: { label: 'Cần xây nền', color: '#ef4444' },
    needs_consolidation: { label: 'Cần ôn cố', color: '#f97316' },
    on_track: { label: 'Đang tiến bộ', color: '#3b82f6' },
    ready_for_stretch: { label: 'Sẵn sàng thử thách', color: '#8b5cf6' },
    ready_for_acceleration: { label: 'Sẵn sàng tăng tốc', color: '#10b981' },
    overchallenged: { label: 'Quá tải', color: '#ef4444' },
    underchallenged: { label: 'Quá dễ', color: '#eab308' },
};

const REC_TYPE_LABELS: Record<string, { label: string; color: string }> = {
    accelerate: { label: 'Tăng tốc', color: '#10b981' },
    accelerate_guarded: { label: 'Tăng tốc có kiểm soát', color: '#10b981' },
    compact: { label: 'Bỏ qua phần đã biết', color: '#8b5cf6' },
    enrich: { label: 'Mở rộng', color: '#3b82f6' },
    stretch: { label: 'Mở rộng', color: '#3b82f6' },
    scaffold: { label: 'Hỗ trợ thêm', color: '#f97316' },
    repair: { label: 'Sửa lỗi', color: '#ef4444' },
    consolidate: { label: 'Ôn cố', color: '#eab308' },
    practice: { label: 'Luyện vừa tầm', color: '#f97316' },
    collect_evidence: { label: 'Chẩn đoán', color: '#64748b' },
};

const SUBJECT_TRACKS: {
    key: LearningSubjectKey;
    label: string;
    icon: ReactNode;
    topics: { key: string }[];
}[] = [
    { key: 'math', label: 'Toán', icon: <Calculator size={18} />, topics: MATH_TOPICS },
    { key: 'vietnamese', label: 'Tiếng Việt', icon: <BookOpen size={18} />, topics: VIETNAMESE_TOPICS },
    { key: 'english', label: 'Tiếng Anh', icon: <Globe2 size={18} />, topics: ENGLISH_TOPICS },
    { key: 'science', label: 'Khoa học', icon: <FlaskConical size={18} />, topics: SCIENCE_TOPICS },
    { key: 'hisgeo', label: 'Lịch sử & Địa lý', icon: <Globe2 size={18} />, topics: HISGEO_TOPICS },
    { key: 'computing', label: 'Tin học', icon: <Cpu size={18} />, topics: COMPUTING_TOPICS },
];

function normalizeStoredRecommendation(rec: AccelerationRecommendation) {
    const typeInfo = REC_TYPE_LABELS[rec.recommendationType] || REC_TYPE_LABELS.enrich;
    return {
        id: rec.id,
        type: rec.recommendationType,
        typeLabel: typeInfo.label,
        typeColor: typeInfo.color,
        evidence: rec.evidenceSummary,
        risk: rec.riskNotes,
        parentAction: rec.parentAction,
        status: rec.status,
        benchmark: 'Adaptive engine',
    };
}

function normalizeEvidenceRecommendation(rec: EvidenceRecommendation) {
    const typeInfo = REC_TYPE_LABELS[rec.type] || REC_TYPE_LABELS.practice;
    return {
        id: rec.id,
        type: rec.type,
        typeLabel: typeInfo.label,
        typeColor: typeInfo.color,
        evidence: rec.evidence,
        risk: rec.risk,
        parentAction: rec.parentAction,
        status: 'proposed',
        benchmark: rec.benchmark,
    };
}

export default function AdaptiveDashboard() {
    const {
        skillStates,
        accelerationRecommendations,
        masteryStates,
        competencies,
        attempts,
        mistakes,
        reviewSchedules,
    } = useAppStore();

    // Compute profile if we have skill states
    const domains = SUBJECT_TRACKS.map((track) => track.label);
    const profile = computeAsynchronousProfile(skillStates, domains);
    const evidenceDashboards = SUBJECT_TRACKS.map((track) => buildSubjectEvidenceDashboard({
        subject: track.key,
        topicKeys: track.topics.map((topic) => topic.key),
        attempts,
        mistakes,
        reviewSchedules,
    }));
    const recs = accelerationRecommendations.length > 0
        ? accelerationRecommendations.map(normalizeStoredRecommendation)
        : evidenceDashboards.flatMap((dashboard) => dashboard.recommendations).slice(0, 8).map(normalizeEvidenceRecommendation);

    // Compute per-domain mastery
    const domainMastery = SUBJECT_TRACKS.map((track) => {
        const domain = track.label;
        const domainComps = competencies.filter((c) => c.subject === domain);
        const domainMS = masteryStates.filter((ms) => domainComps.some((c) => c.id === ms.competencyId));
        const mastered = domainMS.filter((ms) => ms.state === 'mastered' || ms.state === 'transfer_success').length;
        const total = domainMS.length;
        return {
            key: track.key,
            domain,
            icon: track.icon,
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
                                        <span style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            {dm.icon} {dm.domain}
                                        </span>
                                        <span className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
                                            {profileData?.level || (dm.total > 0 ? `${dm.pct}% thành thạo` : 'Chưa có TC')}
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

                {/* Real evidence dashboards */}
                <div className="card animate-fade-in" style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <TrendingUp size={18} color="var(--color-success)" /> Dữ liệu học thật theo môn
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                        Các chỉ số bên dưới chỉ lấy từ bài làm, lỗi sai và lịch ôn đã ghi nhận trên máy. Khi thiếu mẫu, hệ thống chỉ đề xuất chẩn đoán, không kết luận năng lực.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                        {evidenceDashboards.map((dashboard) => {
                            const track = SUBJECT_TRACKS.find((item) => item.key === dashboard.subject);
                            const priority = dashboard.topPriority;
                            const accuracy = dashboard.meanAccuracyPct;
                            return (
                                <div key={dashboard.subject} style={{ padding: '0.9rem', background: 'var(--color-bg-warm)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(148,163,184,0.24)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', alignItems: 'center', marginBottom: '0.65rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 800 }}>
                                            {track?.icon} {track?.label}
                                        </div>
                                        <span className="badge badge-primary">{dashboard.totalAttempts} bài</span>
                                    </div>
                                    <div className="mastery-bar">
                                        <div className="mastery-fill" style={{ width: `${accuracy ?? 0}%` }} />
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                        <span>{accuracy === null ? 'Chưa có accuracy' : `${accuracy}% đúng TB`}</span>
                                        <span>{dashboard.insufficientCount}/{dashboard.totalTopics} chủ đề thiếu mẫu</span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.35rem', marginTop: '0.75rem' }}>
                                        <div style={{ background: '#fef2f2', color: '#b91c1c', borderRadius: '0.5rem', padding: '0.45rem', textAlign: 'center', fontSize: '0.72rem', fontWeight: 800 }}>
                                            {dashboard.repairCount} sửa
                                        </div>
                                        <div style={{ background: '#fff7ed', color: '#c2410c', borderRadius: '0.5rem', padding: '0.45rem', textAlign: 'center', fontSize: '0.72rem', fontWeight: 800 }}>
                                            {dashboard.practiceCount} luyện
                                        </div>
                                        <div style={{ background: '#ecfdf5', color: '#047857', borderRadius: '0.5rem', padding: '0.45rem', textAlign: 'center', fontSize: '0.72rem', fontWeight: 800 }}>
                                            {dashboard.stretchCount + dashboard.accelerateGuardedCount} nâng
                                        </div>
                                    </div>
                                    {priority && (
                                        <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                                            <strong>Ưu tiên:</strong> {priority.topicKey} · {priority.challengeFitLabel}
                                            <br />
                                            {priority.dataQualityNote}
                                        </div>
                                    )}
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
                                                {statusInfo.label}
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
                        <TrendingUp size={18} color="var(--color-success)" /> Đề xuất thích ứng có bằng chứng
                    </h2>
                    {recs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>
                            <p>Chưa đủ dữ liệu để đưa ra đề xuất.</p>
                            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Hệ thống cần ít nhất 5 buổi học để phân tích.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {recs.map((rec) => {
                                return (
                                    <div key={rec.id} style={{ padding: '1rem', border: `2px solid ${rec.typeColor}30`, borderRadius: 'var(--radius-md)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                            <span className="badge" style={{ background: `${rec.typeColor}15`, color: rec.typeColor }}>{rec.typeLabel}</span>
                                            <span className="badge badge-primary">{rec.status}</span>
                                        </div>
                                        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{rec.evidence}</p>
                                        <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-warning)' }}>
                                            <AlertTriangle size={14} /> <span>{rec.risk}</span>
                                        </div>
                                        <div style={{ background: 'var(--color-bg-warm)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                                            <strong>Ba/Mẹ cần:</strong> {rec.parentAction}
                                        </div>
                                        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginTop: '0.45rem' }}>
                                            Benchmark: {rec.benchmark}
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
