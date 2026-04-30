import Link from 'next/link';
import {
    ArrowLeft,
    BarChart3,
    Brain,
    CheckCircle2,
    ClipboardCheck,
    ClipboardList,
    Database,
    ExternalLink,
    GitBranch,
    ListChecks,
    ShieldCheck,
    Target,
    TriangleAlert,
} from 'lucide-react';
import {
    PRODUCT_FOUNDATION_CLAIM_GATES,
    PRODUCT_FOUNDATION_REQUIREMENTS,
    PRODUCT_FOUNDATION_SOT_UPGRADE_DECISIONS,
    computeFoundationP0Readiness100,
    getNextFoundationUpgradeDecision,
} from '@/data/product-foundation';
import { runTutorRegressionAudit } from '@/lib/ai/tutor-rubric';
import { buildWeeklyPdcaPlan } from '@/lib/evidence/weekly-pdca';
import { buildPrivacyEvidencePanel } from '@/lib/privacy/privacy-evidence';
import { buildCurriculumReviewQueue, summarizeCurriculumReviewQueue } from '@/lib/curriculum/review-queue';
import { GRADE1_DIAGNOSTIC_ITEMS, scoreGrade1DiagnosticWarmStart } from '@/lib/diagnostic/grade1-warm-start';
import { UI_SMOKE_GATE } from '@/data/ui-smoke-gate';

const tutorAudit = runTutorRegressionAudit();
const privacyPanel = buildPrivacyEvidencePanel();
const pdcaDryRun = buildWeeklyPdcaPlan({ now: new Date('2026-04-30T00:00:00.000Z') });
const reviewQueueSummary = summarizeCurriculumReviewQueue(buildCurriculumReviewQueue());
const diagnosticDryRun = scoreGrade1DiagnosticWarmStart({ now: new Date('2026-04-30T00:00:00.000Z') });
const p0Readiness = computeFoundationP0Readiness100();
const nextLane = getNextFoundationUpgradeDecision();
const implementedLanes = PRODUCT_FOUNDATION_SOT_UPGRADE_DECISIONS.filter((lane) => lane.status === 'implemented');
const readyLanes = PRODUCT_FOUNDATION_SOT_UPGRADE_DECISIONS.filter((lane) => lane.status === 'ready_for_implementation');
const efficacyGate = PRODUCT_FOUNDATION_CLAIM_GATES.find((gate) => gate.id === 'efficacy');

function laneStatusLabel(status: string) {
    if (status === 'implemented') return 'Đã live';
    if (status === 'ready_for_implementation') return 'Sẵn sàng';
    if (status === 'blocked_by_evidence') return 'Bị chặn';
    return 'Theo dõi';
}

function laneStatusColor(status: string) {
    if (status === 'implemented') return '#059669';
    if (status === 'ready_for_implementation') return '#2563eb';
    if (status === 'blocked_by_evidence') return '#dc2626';
    return '#64748b';
}

export default function ParentSotPage() {
    return (
        <main style={{ minHeight: '100dvh', background: '#f6f7fb', fontFamily: 'var(--font-parent)' }}>
            <div className="page-container" style={{ maxWidth: '1160px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Link href="/parent/dashboard">
                            <button className="btn btn-ghost btn-sm" aria-label="Quay lại dashboard phụ huynh">
                                <ArrowLeft size={18} />
                            </button>
                        </Link>
                        <div>
                            <div style={{ color: '#7c3aed', fontSize: '0.82rem', fontWeight: 900 }}>
                                SOT Control Center · cập nhật 2026-04-30
                            </div>
                            <h1 style={{ fontWeight: 900, fontSize: '1.65rem', color: '#0f172a', lineHeight: 1.18 }}>
                                Nâng cấp full-stack bám ma trận căn cứ
                            </h1>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <Link href="/docs/HENRY_FEATURE_REQUIREMENTS_TRACEABILITY_2026-04-30.md" prefetch={false} style={{ textDecoration: 'none' }}>
                            <button className="btn btn-secondary btn-sm">
                                <ExternalLink size={16} /> File SOT
                            </button>
                        </Link>
                        <Link href="/parent/foundation" style={{ textDecoration: 'none' }}>
                            <button className="btn btn-secondary btn-sm">
                                <ClipboardCheck size={16} /> Foundation
                            </button>
                        </Link>
                        <Link href="/parent/review-queue" style={{ textDecoration: 'none' }}>
                            <button className="btn btn-secondary btn-sm">
                                <ClipboardList size={16} /> Review queue
                            </button>
                        </Link>
                        <Link href="/parent/diagnostic" style={{ textDecoration: 'none' }}>
                            <button className="btn btn-secondary btn-sm">
                                <Target size={16} /> Diagnostic
                            </button>
                        </Link>
                    </div>
                </div>

                <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="card" style={{ border: '1px solid #ddd6fe', borderRadius: '12px', background: '#ffffff' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#7c3aed', fontWeight: 900, fontSize: '0.82rem', marginBottom: '0.55rem' }}>
                            <GitBranch size={17} /> SOT bắt buộc đối soát
                        </div>
                        <h2 style={{ color: '#0f172a', fontSize: '1.25rem', lineHeight: 1.25, fontWeight: 900, marginBottom: '0.65rem' }}>
                            Mỗi feature phải có yêu cầu, căn cứ, mức tin cậy, diễn giải, workflow, dữ liệu, gate và no-overclaim.
                        </h2>
                        <p style={{ color: '#475569', lineHeight: 1.55, fontSize: '0.9rem', marginBottom: '0.9rem' }}>
                            Trang này biến file traceability thành control plane live: AI tutor có regression 50 scenario, dashboard phụ huynh có RCA/PDCA, settings có privacy evidence panel, review queue cho item lớp 1-5, diagnostic warm-start lớp 1 và Playwright/WCAG smoke gate. Các lane chưa đủ evidence vẫn giữ trạng thái cần làm, không bị nâng claim bằng câu chữ.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.7rem' }}>
                            {[
                                { label: 'P0 readiness', value: `${p0Readiness}/100`, detail: 'Không phải efficacy', icon: <Target size={18} />, color: '#2563eb' },
                                { label: 'AI regression', value: `${tutorAudit.passedCount}/${tutorAudit.scenarioCount}`, detail: 'Scenario lớp 1-5', icon: <Brain size={18} />, color: '#7c3aed' },
                                { label: 'Privacy inventory', value: `${privacyPanel.items.length}`, detail: `${privacyPanel.readiness100}/100 local`, icon: <ShieldCheck size={18} />, color: '#059669' },
                                { label: 'Review queue', value: `${reviewQueueSummary.totalItems}`, detail: `${reviewQueueSummary.needsHumanReview} cần duyệt`, icon: <ClipboardList size={18} />, color: '#d97706' },
                                { label: 'Diagnostic', value: `${GRADE1_DIAGNOSTIC_ITEMS.length}`, detail: diagnosticDryRun.status === 'missing_data' ? 'Đợi baseline thật' : 'Có plan', icon: <Target size={18} />, color: '#2563eb' },
                                { label: 'Smoke gate', value: `${UI_SMOKE_GATE.routeCount}x${UI_SMOKE_GATE.viewportCount}`, detail: 'Desktop/mobile', icon: <CheckCircle2 size={18} />, color: '#059669' },
                                { label: 'PDCA guard', value: pdcaDryRun.status === 'missing_data' ? 'safe' : 'ready', detail: 'Không bịa delta', icon: <ListChecks size={18} />, color: '#d97706' },
                            ].map((metric) => (
                                <article key={metric.label} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem', background: '#f8fafc' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: metric.color, fontWeight: 900, fontSize: '0.76rem', marginBottom: '0.35rem' }}>
                                        {metric.icon} {metric.label}
                                    </div>
                                    <div style={{ color: '#0f172a', fontSize: '1.35rem', fontWeight: 900, lineHeight: 1 }}>{metric.value}</div>
                                    <div style={{ color: '#64748b', fontSize: '0.74rem', marginTop: '0.3rem' }}>{metric.detail}</div>
                                </article>
                            ))}
                        </div>
                    </div>

                    <aside className="card" style={{ border: '1px solid #fed7aa', borderRadius: '12px', background: '#fff7ed' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c2410c', fontWeight: 900, fontSize: '0.82rem', marginBottom: '0.6rem' }}>
                            <TriangleAlert size={17} /> Vì sao chưa 100/100 hiệu quả
                        </div>
                        <p style={{ color: '#7c2d12', lineHeight: 1.52, fontSize: '0.84rem', marginBottom: '0.75rem' }}>
                            {efficacyGate?.allowedClaim}
                        </p>
                        <p style={{ color: '#7c2d12', lineHeight: 1.52, fontSize: '0.84rem' }}>
                            Gate còn thiếu: reviewer thật/approvedAt cho từng item, calibration bằng attempt thật, validation cohort cho diagnostic, live monitoring/accessibility audit sâu và pilot 4 tuần có pre/post/retention.
                        </p>
                    </aside>
                </section>

                <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="card" style={{ borderRadius: '12px', border: '1px solid #c7d2fe' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4338ca', fontWeight: 900, marginBottom: '0.65rem' }}>
                            <Brain size={18} /> AI tutor rubric
                        </div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{tutorAudit.score100}/100</div>
                        <p style={{ color: '#475569', fontSize: '0.84rem', lineHeight: 1.5, marginTop: '0.5rem' }}>
                            50 scenario nội bộ bao phủ Toán, Tiếng Việt, Tiếng Anh lớp 1-5. Audit chặn direct answer khi chưa được phép và giữ claim ở mức guardrail nội bộ.
                        </p>
                    </div>
                    <div className="card" style={{ borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#15803d', fontWeight: 900, marginBottom: '0.65rem' }}>
                            <Database size={18} /> Privacy evidence
                        </div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{privacyPanel.items.length} nhóm</div>
                        <p style={{ color: '#475569', fontSize: '0.84rem', lineHeight: 1.5, marginTop: '0.5rem' }}>
                            Mỗi nhóm dữ liệu có purpose, nơi lưu, minimization rule, retention, export/delete status và nguồn SOT; {privacyPanel.highSensitivityCount} nhóm nhạy cảm cao. Không claim legal compliance khi chưa review pháp lý.
                        </p>
                    </div>
                    <div className="card" style={{ borderRadius: '12px', border: '1px solid #fde68a' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#b45309', fontWeight: 900, marginBottom: '0.65rem' }}>
                            <ListChecks size={18} /> RCA/PDCA evidence
                        </div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>7 ngày</div>
                        <p style={{ color: '#475569', fontSize: '0.84rem', lineHeight: 1.5, marginTop: '0.5rem' }}>
                            Engine chọn top issue từ attempt/lỗi/hint/review, tạo mission phụ huynh và recheck sau 7 ngày. Khi thiếu follow-up, hệ thống ghi missing-data thay vì bịa cải thiện.
                        </p>
                    </div>
                    <div className="card" style={{ borderRadius: '12px', border: '1px solid #fed7aa' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c2410c', fontWeight: 900, marginBottom: '0.65rem' }}>
                            <ClipboardList size={18} /> Human review queue
                        </div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{reviewQueueSummary.totalItems} item</div>
                        <p style={{ color: '#475569', fontSize: '0.84rem', lineHeight: 1.5, marginTop: '0.5rem' }}>
                            Queue đã gom toàn bộ topic/item lớp 1-5, nêu RCA vì sao bị khóa và PDCA cho phiên duyệt. Chưa tự động approved nếu thiếu reviewer metadata.
                        </p>
                    </div>
                    <div className="card" style={{ borderRadius: '12px', border: '1px solid #bfdbfe' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2563eb', fontWeight: 900, marginBottom: '0.65rem' }}>
                            <Target size={18} /> Diagnostic warm-start
                        </div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{GRADE1_DIAGNOSTIC_ITEMS.length} item</div>
                        <p style={{ color: '#475569', fontSize: '0.84rem', lineHeight: 1.5, marginTop: '0.5rem' }}>
                            Baseline Toán/Tiếng Việt lớp 1 sinh confidence và kế hoạch 7 ngày từ câu trả lời thật. Khi thiếu dữ liệu, hệ thống giữ missing-data state.
                        </p>
                    </div>
                    <div className="card" style={{ borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#15803d', fontWeight: 900, marginBottom: '0.65rem' }}>
                            <CheckCircle2 size={18} /> Playwright/WCAG smoke
                        </div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{UI_SMOKE_GATE.routeCount}x{UI_SMOKE_GATE.viewportCount}</div>
                        <p style={{ color: '#475569', fontSize: '0.84rem', lineHeight: 1.5, marginTop: '0.5rem' }}>
                            Smoke gate kiểm route chính trên desktop/mobile: required text, body không trắng, keyboard focus, target-size tối thiểu và no-overflow trước khi upload GitHub Pages.
                        </p>
                    </div>
                </section>

                <section className="card" style={{ borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f766e', fontWeight: 900, fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                                <CheckCircle2 size={17} /> Lane đã triển khai theo SOT
                            </div>
                            <h2 style={{ color: '#0f172a', fontWeight: 900, fontSize: '1.1rem' }}>
                                {implementedLanes.length} lane đã qua mức implementation nội bộ
                            </h2>
                        </div>
                        <span className="badge" style={{ color: '#0f766e', background: '#ccfbf1' }}>
                            Next: {nextLane?.label}
                        </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
                        {PRODUCT_FOUNDATION_SOT_UPGRADE_DECISIONS.map((lane) => (
                            <article key={lane.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem', background: lane.status === 'implemented' ? '#f0fdf4' : '#ffffff' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.45rem' }}>
                                    <div style={{ color: '#64748b', fontWeight: 900, fontSize: '0.74rem' }}>Rank #{lane.rank}</div>
                                    <span className="badge" style={{ color: laneStatusColor(lane.status), background: `${laneStatusColor(lane.status)}18` }}>
                                        {laneStatusLabel(lane.status)}
                                    </span>
                                </div>
                                <h3 style={{ color: '#0f172a', fontWeight: 900, fontSize: '0.95rem', lineHeight: 1.28, marginBottom: '0.45rem' }}>{lane.label}</h3>
                                <p style={{ color: '#475569', fontSize: '0.78rem', lineHeight: 1.45 }}>{lane.evidenceGate}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                    <div className="card" style={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2563eb', fontWeight: 900, marginBottom: '0.75rem' }}>
                            <BarChart3 size={18} /> P0 requirements
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                            {PRODUCT_FOUNDATION_REQUIREMENTS.filter((requirement) => requirement.priority === 'P0').map((requirement) => (
                                <div key={requirement.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.6rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.45rem' }}>
                                    <span style={{ color: '#334155', fontWeight: 700, fontSize: '0.8rem' }}>{requirement.title}</span>
                                    <span className="badge" style={{ color: requirement.status === 'implemented' ? '#059669' : '#d97706', background: requirement.status === 'implemented' ? '#dcfce7' : '#fef3c7' }}>
                                        {requirement.status === 'implemented' ? 'đã có' : 'còn gate'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card" style={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#7c3aed', fontWeight: 900, marginBottom: '0.75rem' }}>
                            <Target size={18} /> Việc phải làm tiếp
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                            {readyLanes.slice(0, 3).map((lane) => (
                                <div key={lane.id} style={{ border: '1px solid #ede9fe', borderRadius: '10px', padding: '0.75rem', background: '#faf5ff' }}>
                                    <div style={{ color: '#6d28d9', fontWeight: 900, fontSize: '0.78rem', marginBottom: '0.25rem' }}>Rank #{lane.rank}</div>
                                    <div style={{ color: '#0f172a', fontWeight: 900, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{lane.label}</div>
                                    <p style={{ color: '#475569', fontSize: '0.76rem', lineHeight: 1.42 }}>{lane.antiOverclaim}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
