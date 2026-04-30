import Link from 'next/link';
import {
    AlertTriangle,
    ArrowLeft,
    CheckCircle2,
    ClipboardList,
    Database,
    Filter,
    GitBranch,
    Lock,
    RotateCcw,
    ShieldCheck,
} from 'lucide-react';
import {
    buildCurriculumReviewQueue,
    summarizeCurriculumReviewQueue,
    type CurriculumReviewQueueItem,
} from '@/lib/curriculum/review-queue';

const queue = buildCurriculumReviewQueue();
const summary = summarizeCurriculumReviewQueue(queue);
const visibleItems = queue.slice(0, 12);

function statusLabel(item: CurriculumReviewQueueItem) {
    if (item.status === 'approved' && item.calibrationStatus === 'calibrated') return 'Đã duyệt + calibrated';
    if (item.status === 'approved') return 'Đã duyệt, cần calibration';
    if (item.status === 'blocked') return 'Bị block';
    return 'Cần duyệt';
}

function statusColor(item: CurriculumReviewQueueItem) {
    if (item.status === 'approved' && item.calibrationStatus === 'calibrated') return '#059669';
    if (item.status === 'approved') return '#2563eb';
    if (item.status === 'blocked') return '#dc2626';
    return '#d97706';
}

export default function ParentReviewQueuePage() {
    return (
        <main style={{ minHeight: '100dvh', background: '#f8fafc', fontFamily: 'var(--font-parent)' }}>
            <div className="page-container" style={{ maxWidth: '1160px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Link href="/parent/sot">
                            <button className="btn btn-ghost btn-sm" aria-label="Quay lại SOT Control Center">
                                <ArrowLeft size={18} />
                            </button>
                        </Link>
                        <div>
                            <div style={{ color: '#0f766e', fontSize: '0.82rem', fontWeight: 900 }}>
                                Human review queue · lớp 1-5
                            </div>
                            <h1 style={{ fontWeight: 900, fontSize: '1.65rem', color: '#0f172a', lineHeight: 1.18 }}>
                                Hàng đợi duyệt item theo curriculum SOT
                            </h1>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <Link href="/parent/benchmark" style={{ textDecoration: 'none' }}>
                            <button className="btn btn-secondary btn-sm">
                                <Database size={16} /> Benchmark
                            </button>
                        </Link>
                        <Link href="/docs/HENRY_FEATURE_REQUIREMENTS_TRACEABILITY_2026-04-30.md" prefetch={false} style={{ textDecoration: 'none' }}>
                            <button className="btn btn-secondary btn-sm">
                                <GitBranch size={16} /> SOT doc
                            </button>
                        </Link>
                    </div>
                </div>

                <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="card" style={{ borderRadius: '12px', border: '1px solid #bbf7d0', background: '#ffffff' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f766e', fontWeight: 900, fontSize: '0.82rem', marginBottom: '0.6rem' }}>
                            <ClipboardList size={18} /> Workflow kiểm duyệt nội dung
                        </div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.25, marginBottom: '0.65rem' }}>
                            Queue này khóa claim “item bank đã duyệt” cho đến khi có reviewerId, evidence note, approvedAt hoặc blockReason.
                        </h2>
                        <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '0.9rem' }}>
                            Hệ thống tự phát hiện trạng thái từng topic/item, tự nêu RCA vì sao chưa release và tạo PDCA cho phiên duyệt tiếp theo. Hệ thống không tự chuyển item sang approved.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(155px, 1fr))', gap: '0.7rem' }}>
                            {[
                                { label: 'Tổng item/topic', value: summary.totalItems, detail: 'Từ curriculum map', color: '#2563eb' },
                                { label: 'Cần duyệt', value: summary.needsHumanReview, detail: 'Block release', color: '#d97706' },
                                { label: 'Đã approved', value: summary.approvedItems, detail: 'Cần người thật', color: '#059669' },
                                { label: 'Cần calibration', value: summary.needsCalibration, detail: 'Dựa attempt thật', color: '#7c3aed' },
                                { label: 'Readiness', value: `${summary.readiness100}/100`, detail: 'Không phải efficacy', color: '#dc2626' },
                            ].map((metric) => (
                                <article key={metric.label} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.8rem', background: '#f8fafc' }}>
                                    <div style={{ color: metric.color, fontWeight: 900, fontSize: '0.75rem', marginBottom: '0.35rem' }}>{metric.label}</div>
                                    <div style={{ color: '#0f172a', fontSize: '1.35rem', fontWeight: 900, lineHeight: 1 }}>{metric.value}</div>
                                    <div style={{ color: '#64748b', fontSize: '0.74rem', marginTop: '0.28rem' }}>{metric.detail}</div>
                                </article>
                            ))}
                        </div>
                    </div>

                    <aside className="card" style={{ borderRadius: '12px', border: '1px solid #fed7aa', background: '#fff7ed' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c2410c', fontWeight: 900, fontSize: '0.82rem', marginBottom: '0.65rem' }}>
                            <AlertTriangle size={17} /> Claim gate
                        </div>
                        <p style={{ color: '#7c2d12', fontSize: '0.84rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                            {summary.allowedClaim}
                        </p>
                        <p style={{ color: '#7c2d12', fontSize: '0.84rem', lineHeight: 1.5 }}>
                            {summary.blockedClaim}
                        </p>
                    </aside>
                </section>

                <section className="card" style={{ borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#7c3aed', fontWeight: 900, fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                                <RotateCcw size={17} /> RCA/PDCA phiên duyệt tiếp theo
                            </div>
                            <h2 style={{ fontSize: '1.08rem', fontWeight: 900, color: '#0f172a' }}>
                                Root cause chính: {summary.topRootCause}
                            </h2>
                        </div>
                        <span className="badge" style={{ color: '#7c3aed', background: '#ede9fe' }}>
                            Review evidence {summary.reviewEvidence100}/100
                        </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.7rem' }}>
                        {[
                            { label: 'Observe', value: summary.pdca.observe },
                            { label: 'Plan', value: summary.pdca.plan },
                            { label: 'Do', value: summary.pdca.do },
                            { label: 'Check', value: summary.pdca.check },
                            { label: 'Act', value: summary.pdca.act },
                        ].map((step) => (
                            <div key={step.label} style={{ border: '1px solid #ede9fe', borderRadius: '10px', padding: '0.75rem', background: '#faf5ff' }}>
                                <div style={{ color: '#6d28d9', fontSize: '0.75rem', fontWeight: 900, marginBottom: '0.25rem' }}>{step.label}</div>
                                <p style={{ color: '#334155', fontSize: '0.78rem', lineHeight: 1.45 }}>{step.value}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="card" style={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a', fontWeight: 900 }}>
                            <Filter size={18} /> 12 item đầu trong queue
                        </div>
                        <span style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 700 }}>
                            Hiển thị từ {summary.totalItems} topic đã traceable
                        </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.75rem' }}>
                        {visibleItems.map((item) => (
                            <article key={item.curriculumMapId} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem', background: '#ffffff' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.45rem' }}>
                                    <div>
                                        <div style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: 800 }}>
                                            Lớp {item.grade} · {item.subjectLabel}
                                        </div>
                                        <h3 style={{ color: '#0f172a', fontSize: '0.95rem', fontWeight: 900, lineHeight: 1.25 }}>{item.topicName}</h3>
                                    </div>
                                    <span className="badge" style={{ color: statusColor(item), background: `${statusColor(item)}18`, whiteSpace: 'nowrap' }}>
                                        {statusLabel(item)}
                                    </span>
                                </div>
                                <p style={{ color: '#475569', fontSize: '0.78rem', lineHeight: 1.45, marginBottom: '0.55rem' }}>
                                    {item.sampleTask}
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: item.childFacingAllowed ? '#059669' : '#dc2626', fontSize: '0.76rem', fontWeight: 900, marginBottom: '0.45rem' }}>
                                    {item.childFacingAllowed ? <CheckCircle2 size={15} /> : <Lock size={15} />}
                                    {item.childFacingAllowed ? 'Có thể dùng trong luồng có giám sát' : 'Đang khóa child-facing release'}
                                </div>
                                <div style={{ color: '#0f766e', fontSize: '0.74rem', fontWeight: 900, marginBottom: '0.25rem' }}>
                                    Evidence phải lưu
                                </div>
                                <p style={{ color: '#64748b', fontSize: '0.74rem', lineHeight: 1.42, marginBottom: '0.45rem' }}>
                                    {item.requiredEvidence.join(', ')}
                                </p>
                                <div style={{ color: '#7c2d12', fontSize: '0.74rem', lineHeight: 1.42 }}>
                                    <ShieldCheck size={14} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '0.25rem' }} />
                                    {item.nextAction}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
