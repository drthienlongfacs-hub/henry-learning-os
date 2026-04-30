import Link from 'next/link';
import {
    ArrowLeft,
    BarChart3,
    BookOpenCheck,
    Brain,
    CheckCircle2,
    ClipboardCheck,
    Database,
    ExternalLink,
    GitBranch,
    Layers3,
    ListChecks,
    ShieldCheck,
    Target,
    TriangleAlert,
} from 'lucide-react';
import {
    PRODUCT_FOUNDATION_AS_OF,
    PRODUCT_FOUNDATION_CLAIM_GATES,
    PRODUCT_FOUNDATION_FEATURE_COVERAGE,
    PRODUCT_FOUNDATION_LAYERS,
    PRODUCT_FOUNDATION_POSITIONING,
    PRODUCT_FOUNDATION_QUALITY_AXES,
    PRODUCT_FOUNDATION_REQUIREMENTS,
    PRODUCT_FOUNDATION_SOT_PROTOCOL,
    PRODUCT_FOUNDATION_SOT_UPGRADE_DECISIONS,
    PRODUCT_FOUNDATION_SOURCE_REGISTRY,
    computeFoundationMustHaveCoverage100,
    computeFoundationP0Readiness100,
    computeFoundationSotIntegrity100,
    getNextFoundationUpgradeDecision,
    getFoundationSourcesByIds,
    type FoundationGateStatus,
    type FoundationRequirementStatus,
    type FoundationSotDecisionStatus,
} from '@/data/product-foundation';

function statusColor(status: FoundationRequirementStatus | FoundationGateStatus) {
    if (status === 'implemented' || status === 'passed') return '#059669';
    if (status === 'partial') return '#d97706';
    if (status === 'spec_ready') return '#2563eb';
    return '#dc2626';
}

function statusLabel(status: FoundationRequirementStatus | FoundationGateStatus) {
    if (status === 'implemented') return 'Đã có';
    if (status === 'passed') return 'Đã qua';
    if (status === 'partial') return 'Đang thiếu gate';
    if (status === 'spec_ready') return 'Đã đặc tả';
    return 'Bị chặn';
}

function decisionStatusColor(status: FoundationSotDecisionStatus) {
    if (status === 'implemented') return '#059669';
    if (status === 'ready_for_implementation') return '#2563eb';
    if (status === 'monitor_only') return '#64748b';
    return '#dc2626';
}

function decisionStatusLabel(status: FoundationSotDecisionStatus) {
    if (status === 'implemented') return 'Đã triển khai live';
    if (status === 'ready_for_implementation') return 'Sẵn sàng triển khai';
    if (status === 'monitor_only') return 'Theo dõi';
    return 'Bị chặn bởi evidence';
}

function sourceKindLabel(kind: string) {
    if (kind === 'local_blueprint') return 'Blueprint nội bộ';
    if (kind === 'repo_handoff') return 'Repo/handoff';
    if (kind === 'official_curriculum') return 'Chương trình chính thức';
    if (kind === 'learning_science') return 'Learning science';
    if (kind === 'software_quality') return 'Software quality';
    if (kind === 'ai_safety_privacy') return 'AI/privacy';
    return 'Benchmark sản phẩm';
}

function sourceKindColor(kind: string) {
    if (kind === 'local_blueprint') return '#7c3aed';
    if (kind === 'repo_handoff') return '#2563eb';
    if (kind === 'official_curriculum') return '#059669';
    if (kind === 'learning_science') return '#0f766e';
    if (kind === 'software_quality') return '#475569';
    if (kind === 'ai_safety_privacy') return '#dc2626';
    return '#d97706';
}

function isUrl(locator: string) {
    return locator.startsWith('https://');
}

const p0Readiness = computeFoundationP0Readiness100();
const featureCoverage = computeFoundationMustHaveCoverage100();
const sotIntegrity = computeFoundationSotIntegrity100();
const nextUpgradeDecision = getNextFoundationUpgradeDecision();
const p0Requirements = PRODUCT_FOUNDATION_REQUIREMENTS.filter((requirement) => requirement.priority === 'P0');
const p1p2Requirements = PRODUCT_FOUNDATION_REQUIREMENTS.filter((requirement) => requirement.priority !== 'P0');

export default function ParentFoundationPage() {
    return (
        <main style={{ minHeight: '100dvh', background: '#f6f7fb', fontFamily: 'var(--font-parent)' }}>
            <div className="page-container" style={{ maxWidth: '1120px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Link href="/parent/dashboard">
                            <button className="btn btn-ghost btn-sm" aria-label="Quay lại dashboard phụ huynh">
                                <ArrowLeft size={18} />
                            </button>
                        </Link>
                        <div>
                            <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.82rem', fontWeight: 800 }}>
                                Product foundation cập nhật {PRODUCT_FOUNDATION_AS_OF}
                            </div>
                            <h1 style={{ fontWeight: 900, fontSize: '1.6rem', color: '#0f172a', lineHeight: 1.2 }}>
                                {PRODUCT_FOUNDATION_POSITIONING.category}
                            </h1>
                        </div>
                    </div>
                    <Link href="/parent/benchmark" style={{ textDecoration: 'none' }}>
                        <button className="btn btn-secondary btn-sm">
                            <BarChart3 size={16} /> Benchmark
                        </button>
                    </Link>
                    <Link href="/parent/sot" style={{ textDecoration: 'none' }}>
                        <button className="btn btn-secondary btn-sm">
                            <GitBranch size={16} /> SOT live
                        </button>
                    </Link>
                </div>

                <section style={{ marginBottom: '1rem' }}>
                    <div
                        style={{
                            background: '#ffffff',
                            border: '1px solid #c7d2fe',
                            borderRadius: '12px',
                            padding: '1rem',
                            boxShadow: '0 14px 34px rgba(15, 23, 42, 0.06)',
                        }}
                    >
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', alignItems: 'stretch' }}>
                            <div>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#4f46e5', fontWeight: 900, fontSize: '0.82rem', marginBottom: '0.55rem' }}>
                                    <ClipboardCheck size={16} /> Định vị và đặc tả nền
                                </div>
                                <h2 style={{ color: '#0f172a', fontSize: '1.35rem', lineHeight: 1.22, fontWeight: 900, marginBottom: '0.55rem' }}>
                                    {PRODUCT_FOUNDATION_POSITIONING.oneLine}
                                </h2>
                                <p style={{ color: '#334155', lineHeight: 1.58, fontSize: '0.92rem', marginBottom: '0.75rem' }}>
                                    {PRODUCT_FOUNDATION_POSITIONING.purpose}
                                </p>
                                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.55, fontSize: '0.88rem' }}>
                                    {PRODUCT_FOUNDATION_POSITIONING.primaryUser}
                                </p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                {[
                                    { label: 'P0 readiness', value: `${p0Readiness}/100`, detail: 'Foundation gate cốt lõi', color: '#2563eb', icon: <Target size={18} /> },
                                    { label: 'Must-have', value: `${featureCoverage}/100`, detail: '15/20 có surface', color: '#059669', icon: <CheckCircle2 size={18} /> },
                                    { label: 'SOT integrity', value: `${sotIntegrity}/100`, detail: 'Traceable decision queue', color: '#7c3aed', icon: <GitBranch size={18} /> },
                                    { label: 'Nguồn', value: `${PRODUCT_FOUNDATION_SOURCE_REGISTRY.length}`, detail: `${PRODUCT_FOUNDATION_LAYERS.length} kernel, ${PRODUCT_FOUNDATION_SOT_UPGRADE_DECISIONS.length} lane`, color: '#475569', icon: <Database size={18} /> },
                                ].map((metric) => (
                                    <article key={metric.label} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem', background: '#f8fafc' }}>
                                        <div style={{ color: metric.color, display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 900, fontSize: '0.76rem', marginBottom: '0.35rem' }}>
                                            {metric.icon} {metric.label}
                                        </div>
                                        <div style={{ color: '#0f172a', fontSize: '1.45rem', fontWeight: 900, lineHeight: 1 }}>{metric.value}</div>
                                        <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem', marginTop: '0.3rem' }}>{metric.detail}</div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ marginBottom: '1rem' }}>
                    <div className="card" style={{ borderRadius: '12px', border: '1px solid #ddd6fe', background: '#faf5ff' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '0.9rem' }}>
                            <div style={{ maxWidth: '680px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#7c3aed', fontWeight: 900, fontSize: '0.82rem', marginBottom: '0.35rem' }}>
                                    <GitBranch size={17} /> Source of Truth control plane
                                </div>
                                <h2 style={{ color: '#0f172a', fontSize: '1.15rem', lineHeight: 1.28, fontWeight: 900, marginBottom: '0.45rem' }}>
                                    Mọi nâng cấp tiếp theo phải đi qua thứ tự nguồn, protocol, done definition và anti-overclaim.
                                </h2>
                                <p style={{ color: '#475569', fontSize: '0.84rem', lineHeight: 1.5 }}>
                                    SOT integrity {sotIntegrity}/100 chỉ nói rằng hàng đợi quyết định đã có nguồn, requirement, feature, evidence gate và deploy gate. Con số này không phải điểm hiệu quả học tập.
                                </p>
                            </div>
                            <div style={{ minWidth: '180px', border: '1px solid #c4b5fd', borderRadius: '10px', padding: '0.85rem', background: '#ffffff' }}>
                                <div style={{ color: '#6d28d9', fontWeight: 900, fontSize: '0.75rem', marginBottom: '0.25rem' }}>Lane tiếp theo</div>
                                <div style={{ color: '#0f172a', fontWeight: 900, fontSize: '0.96rem', lineHeight: 1.25 }}>{nextUpgradeDecision?.label}</div>
                                <div style={{ color: '#64748b', fontSize: '0.74rem', marginTop: '0.35rem' }}>Rank #{nextUpgradeDecision?.rank} · {nextUpgradeDecision ? decisionStatusLabel(nextUpgradeDecision.status) : 'Chưa có'}</div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem', marginBottom: '0.85rem' }}>
                            <article style={{ border: '1px solid #e9d5ff', borderRadius: '10px', padding: '0.85rem', background: '#ffffff' }}>
                                <div style={{ color: '#6d28d9', fontWeight: 900, fontSize: '0.78rem', marginBottom: '0.45rem' }}>Thứ tự nguồn</div>
                                <ol style={{ margin: 0, paddingLeft: '1rem', color: '#475569', fontSize: '0.76rem', lineHeight: 1.45 }}>
                                    {PRODUCT_FOUNDATION_SOT_PROTOCOL.sourcePrecedence.map((item) => (
                                        <li key={item}>{item.replace(/^\d+\.\s*/, '')}</li>
                                    ))}
                                </ol>
                            </article>
                            <article style={{ border: '1px solid #e9d5ff', borderRadius: '10px', padding: '0.85rem', background: '#ffffff' }}>
                                <div style={{ color: '#6d28d9', fontWeight: 900, fontSize: '0.78rem', marginBottom: '0.45rem' }}>Protocol bắt buộc</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                    {PRODUCT_FOUNDATION_SOT_PROTOCOL.requiredProtocolSteps.map((step) => (
                                        <span key={step} className="badge" style={{ color: '#6d28d9', background: '#f5f3ff', border: '1px solid #ddd6fe' }}>
                                            {step.split(':')[0]}
                                        </span>
                                    ))}
                                </div>
                                <p style={{ color: '#64748b', fontSize: '0.74rem', lineHeight: 1.4, marginTop: '0.55rem' }}>
                                    Không có sourceIds hợp lệ, done definition và deploy gate thì không đưa lane vào implementation queue.
                                </p>
                            </article>
                        </div>

                        {nextUpgradeDecision ? (
                            <article style={{ border: '1px solid #c4b5fd', borderRadius: '10px', padding: '0.9rem', background: '#ffffff' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', alignItems: 'flex-start', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                                    <div>
                                        <div style={{ color: '#6d28d9', fontWeight: 900, fontSize: '0.78rem', marginBottom: '0.25rem' }}>Implementation-ready SOT lane</div>
                                        <h3 style={{ color: '#0f172a', fontWeight: 900, fontSize: '1rem' }}>{nextUpgradeDecision.label}</h3>
                                    </div>
                                    <span className="badge" style={{ color: decisionStatusColor(nextUpgradeDecision.status), background: `${decisionStatusColor(nextUpgradeDecision.status)}18`, whiteSpace: 'nowrap' }}>
                                        {decisionStatusLabel(nextUpgradeDecision.status)}
                                    </span>
                                </div>
                                <p style={{ color: '#475569', fontSize: '0.8rem', lineHeight: 1.5, marginBottom: '0.55rem' }}>
                                    {nextUpgradeDecision.whyNow}
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                                    <div>
                                        <div style={{ color: '#0f766e', fontWeight: 900, fontSize: '0.74rem', marginBottom: '0.3rem' }}>Scope</div>
                                        <ul style={{ margin: 0, paddingLeft: '1rem', color: '#334155', fontSize: '0.75rem', lineHeight: 1.42 }}>
                                            {nextUpgradeDecision.implementationScope.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <div style={{ color: '#0f766e', fontWeight: 900, fontSize: '0.74rem', marginBottom: '0.3rem' }}>Done definition</div>
                                        <ul style={{ margin: 0, paddingLeft: '1rem', color: '#334155', fontSize: '0.75rem', lineHeight: 1.42 }}>
                                            {nextUpgradeDecision.doneDefinition.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div style={{ borderTop: '1px solid #e9d5ff', marginTop: '0.75rem', paddingTop: '0.65rem', color: '#7c2d12', fontSize: '0.76rem', lineHeight: 1.45 }}>
                                    Anti-overclaim: {nextUpgradeDecision.antiOverclaim}
                                </div>
                            </article>
                        ) : null}
                    </div>
                </section>

                <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="card" style={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f766e', fontWeight: 900, marginBottom: '0.75rem' }}>
                            <BookOpenCheck size={18} /> North star
                        </div>
                        <p style={{ color: '#334155', lineHeight: 1.58, fontSize: '0.9rem' }}>
                            {PRODUCT_FOUNDATION_POSITIONING.northStarOutcome}
                        </p>
                        <div style={{ marginTop: '0.75rem', borderTop: '1px solid #e2e8f0', paddingTop: '0.75rem', color: 'var(--color-text-secondary)', fontSize: '0.82rem', lineHeight: 1.5 }}>
                            {PRODUCT_FOUNDATION_POSITIONING.successDefinition}
                        </div>
                    </div>

                    <div className="card" style={{ borderRadius: '12px', border: '1px solid #fee2e2', background: '#fffafa' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626', fontWeight: 900, marginBottom: '0.75rem' }}>
                            <TriangleAlert size={18} /> Không được hiểu sai
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                            {PRODUCT_FOUNDATION_POSITIONING.notThis.map((item) => (
                                <div key={item} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', color: '#7f1d1d', fontSize: '0.84rem', lineHeight: 1.45 }}>
                                    <span style={{ marginTop: '0.32rem', width: '6px', height: '6px', borderRadius: '50%', background: '#dc2626', flex: '0 0 auto' }} />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a', fontWeight: 900, marginBottom: '0.75rem' }}>
                        <Layers3 size={18} color="#7c3aed" /> 7 kernel nền móng
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
                        {PRODUCT_FOUNDATION_LAYERS.map((layer) => (
                            <article key={layer.id} className="card" style={{ borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1rem' }}>
                                <h3 style={{ color: '#0f172a', fontSize: '1rem', fontWeight: 900, marginBottom: '0.4rem' }}>{layer.label}</h3>
                                <p style={{ color: '#475569', lineHeight: 1.5, fontSize: '0.82rem', marginBottom: '0.75rem' }}>{layer.purpose}</p>
                                <div style={{ color: '#0f766e', fontWeight: 900, fontSize: '0.74rem', marginBottom: '0.3rem' }}>Không thương lượng</div>
                                <ul style={{ paddingLeft: '1rem', margin: '0 0 0.75rem', color: '#334155', fontSize: '0.78rem', lineHeight: 1.45 }}>
                                    {layer.nonNegotiables.slice(0, 2).map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                                <div style={{ color: '#9a3412', fontWeight: 900, fontSize: '0.74rem', marginBottom: '0.3rem' }}>Gate còn thiếu</div>
                                <div style={{ color: '#7c2d12', fontSize: '0.78rem', lineHeight: 1.45 }}>
                                    {layer.missingGates.join(' · ')}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a', fontWeight: 900, marginBottom: '0.75rem' }}>
                        <ShieldCheck size={18} color="#059669" /> P0 foundation requirements
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.85rem' }}>
                        {p0Requirements.map((requirement) => (
                            <article key={requirement.id} className="card" style={{ borderRadius: '12px', border: `1px solid ${statusColor(requirement.status)}40`, padding: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                                    <h3 style={{ color: '#0f172a', fontSize: '0.98rem', fontWeight: 900 }}>{requirement.title}</h3>
                                    <span className="badge" style={{ color: statusColor(requirement.status), background: `${statusColor(requirement.status)}18`, whiteSpace: 'nowrap' }}>
                                        {statusLabel(requirement.status)}
                                    </span>
                                </div>
                                <p style={{ color: '#334155', lineHeight: 1.48, fontSize: '0.82rem', marginBottom: '0.65rem' }}>{requirement.requirement}</p>
                                <div style={{ color: '#475569', fontSize: '0.76rem', lineHeight: 1.45, marginBottom: '0.55rem' }}>
                                    Evidence: {requirement.currentEvidence.slice(0, 2).join(' · ')}
                                </div>
                                <div style={{ color: '#7c2d12', fontSize: '0.76rem', lineHeight: 1.45 }}>
                                    Gate tiếp theo: {requirement.nextGate}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a', fontWeight: 900, marginBottom: '0.75rem' }}>
                        <Target size={18} color="#2563eb" /> P1/P2 roadmap có đặc tả
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
                        {p1p2Requirements.map((requirement) => (
                            <article key={requirement.id} style={{ border: '1px solid #dbeafe', borderRadius: '10px', padding: '0.9rem', background: '#ffffff' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', alignItems: 'center', marginBottom: '0.35rem' }}>
                                    <div style={{ color: '#1e3a8a', fontWeight: 900, fontSize: '0.88rem' }}>{requirement.title}</div>
                                    <span style={{ color: '#2563eb', fontWeight: 900, fontSize: '0.72rem' }}>{requirement.priority}</span>
                                </div>
                                <p style={{ color: '#475569', fontSize: '0.78rem', lineHeight: 1.45, marginBottom: '0.45rem' }}>{requirement.requirement}</p>
                                <div style={{ color: '#7c2d12', fontSize: '0.75rem', lineHeight: 1.4 }}>{requirement.nextGate}</div>
                            </article>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a', fontWeight: 900, marginBottom: '0.75rem' }}>
                        <ListChecks size={18} color="#7c3aed" /> SOT upgrade queue
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.85rem' }}>
                        {PRODUCT_FOUNDATION_SOT_UPGRADE_DECISIONS.map((decision) => (
                            <article key={decision.id} className="card" style={{ borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.45rem' }}>
                                    <div>
                                        <div style={{ color: '#7c3aed', fontWeight: 900, fontSize: '0.72rem', marginBottom: '0.2rem' }}>Rank #{decision.rank} · Risk {decision.riskLevel}</div>
                                        <h3 style={{ color: '#0f172a', fontSize: '0.92rem', fontWeight: 900 }}>{decision.label}</h3>
                                    </div>
                                    <span className="badge" style={{ color: decisionStatusColor(decision.status), background: `${decisionStatusColor(decision.status)}18`, whiteSpace: 'nowrap' }}>
                                        {decisionStatusLabel(decision.status)}
                                    </span>
                                </div>
                                <p style={{ color: '#475569', fontSize: '0.77rem', lineHeight: 1.45, marginBottom: '0.45rem' }}>{decision.whyNow}</p>
                                <div style={{ color: '#0f766e', fontWeight: 900, fontSize: '0.72rem', marginBottom: '0.25rem' }}>Target requirement</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.5rem' }}>
                                    {decision.targetRequirementIds.map((requirementId) => (
                                        <span key={requirementId} className="badge" style={{ color: '#0f766e', background: '#ecfdf5' }}>{requirementId}</span>
                                    ))}
                                </div>
                                <div style={{ color: '#7c2d12', fontSize: '0.74rem', lineHeight: 1.4 }}>
                                    Evidence gate: {decision.evidenceGate}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a', fontWeight: 900, marginBottom: '0.75rem' }}>
                        <CheckCircle2 size={18} color="#059669" /> 20 must-have feature coverage
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.75rem' }}>
                        {PRODUCT_FOUNDATION_FEATURE_COVERAGE.map((feature, index) => (
                            <article key={feature.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem', background: '#ffffff' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                                    <div style={{ color: '#0f172a', fontWeight: 900, fontSize: '0.84rem' }}>
                                        {index + 1}. {feature.label}
                                    </div>
                                    <span style={{ color: statusColor(feature.status), fontSize: '0.7rem', fontWeight: 900, whiteSpace: 'nowrap' }}>
                                        {statusLabel(feature.status)}
                                    </span>
                                </div>
                                <p style={{ color: '#475569', fontSize: '0.75rem', lineHeight: 1.42, marginBottom: '0.4rem' }}>{feature.currentSurface}</p>
                                <div style={{ color: '#64748b', fontSize: '0.72rem', lineHeight: 1.35 }}>{feature.requiredForMaturity}</div>
                            </article>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a', fontWeight: 900, marginBottom: '0.75rem' }}>
                        <TriangleAlert size={18} color="#dc2626" /> Claim gate
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.85rem' }}>
                        {PRODUCT_FOUNDATION_CLAIM_GATES.map((gate) => (
                            <article key={gate.id} className="card" style={{ borderRadius: '12px', border: `1px solid ${statusColor(gate.status)}40`, padding: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', alignItems: 'center', marginBottom: '0.45rem' }}>
                                    <h3 style={{ color: '#0f172a', fontSize: '0.95rem', fontWeight: 900 }}>{gate.label}</h3>
                                    <span className="badge" style={{ color: statusColor(gate.status), background: `${statusColor(gate.status)}18`, whiteSpace: 'nowrap' }}>
                                        {statusLabel(gate.status)}
                                    </span>
                                </div>
                                <div style={{ color: '#065f46', fontSize: '0.77rem', lineHeight: 1.45, marginBottom: '0.45rem' }}>
                                    Được nói: {gate.allowedClaim}
                                </div>
                                <div style={{ color: '#991b1b', fontSize: '0.77rem', lineHeight: 1.45, marginBottom: '0.45rem' }}>
                                    Không được nói: {gate.blockedClaim}
                                </div>
                                <div style={{ color: '#475569', fontSize: '0.74rem', lineHeight: 1.4 }}>
                                    Evidence cần có: {gate.requiredEvidence}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a', fontWeight: 900, marginBottom: '0.75rem' }}>
                        <Brain size={18} color="#7c3aed" /> Quality axes
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
                        {PRODUCT_FOUNDATION_QUALITY_AXES.map((axis) => (
                            <article key={axis.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.9rem', background: '#ffffff' }}>
                                <div style={{ color: '#0f172a', fontWeight: 900, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{axis.label}</div>
                                <div style={{ color: '#2563eb', fontWeight: 900, fontSize: '0.74rem', marginBottom: '0.45rem' }}>{axis.benchmarkFrame}</div>
                                <p style={{ color: '#475569', fontSize: '0.78rem', lineHeight: 1.45, marginBottom: '0.45rem' }}>{axis.productRequirement}</p>
                                <div style={{ color: '#7c2d12', fontSize: '0.74rem', lineHeight: 1.4 }}>Gate: {axis.measurableGate}</div>
                            </article>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a', fontWeight: 900, marginBottom: '0.75rem' }}>
                        <Database size={18} color="#475569" /> Source registry
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '0.75rem' }}>
                        {PRODUCT_FOUNDATION_SOURCE_REGISTRY.map((source) => (
                            <article key={source.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem', background: '#ffffff' }}>
                                <div style={{ color: sourceKindColor(source.kind), fontWeight: 900, fontSize: '0.72rem', marginBottom: '0.3rem' }}>
                                    {sourceKindLabel(source.kind)}
                                </div>
                                <div style={{ color: '#0f172a', fontWeight: 900, fontSize: '0.86rem', marginBottom: '0.35rem' }}>{source.label}</div>
                                <p style={{ color: '#475569', fontSize: '0.74rem', lineHeight: 1.4, marginBottom: '0.4rem' }}>{source.foundationUse}</p>
                                {isUrl(source.locator) ? (
                                    <a href={source.locator} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#2563eb', fontWeight: 800, fontSize: '0.72rem', textDecoration: 'none' }}>
                                        Mở nguồn <ExternalLink size={12} />
                                    </a>
                                ) : (
                                    <code style={{ color: '#64748b', fontSize: '0.68rem', wordBreak: 'break-word' }}>{source.locator}</code>
                                )}
                            </article>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: '1rem' }}>
                    <div className="card" style={{ borderRadius: '12px', border: '1px solid #fed7aa', background: '#fff7ed' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c2410c', fontWeight: 900, marginBottom: '0.6rem' }}>
                            <ClipboardCheck size={18} /> RCA/PDCA tối thiểu trước khi tự tiến hóa
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.65rem' }}>
                            {['Observe dữ liệu thật', 'RCA lỗi gốc', 'Plan can thiệp 7 ngày', 'Do trong session/parent mission', 'Check retention/transfer', 'Act và ghi audit trail'].map((step) => (
                                <div key={step} style={{ border: '1px solid #fed7aa', borderRadius: '8px', padding: '0.65rem', background: '#ffffff', color: '#7c2d12', fontSize: '0.78rem', fontWeight: 800, lineHeight: 1.35 }}>
                                    {step}
                                </div>
                            ))}
                        </div>
                        <p style={{ color: '#7c2d12', fontSize: '0.78rem', lineHeight: 1.5, marginTop: '0.75rem' }}>
                            Không gọi là tự tiến hóa nếu hệ thống tự sửa nội dung, tự nâng claim hoặc tự đổi policy mà không có validation gate hiển thị cho người vận hành.
                        </p>
                    </div>
                </section>

                <section style={{ marginBottom: '0.5rem' }}>
                    <div className="card" style={{ borderRadius: '12px', border: '1px solid #dbeafe', background: '#eff6ff' }}>
                        <div style={{ color: '#1d4ed8', fontWeight: 900, marginBottom: '0.5rem' }}>Nguồn đang chống overclaim cho từng requirement</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                            {getFoundationSourcesByIds(['wwc-standards', 'eef-metacognition', 'iso-25010', 'nist-ai-rmf', 'unicef-ai-children', 'wcag-22']).map((source) => (
                                <span key={source.id} className="badge" style={{ color: '#1d4ed8', background: '#ffffff', border: '1px solid #bfdbfe' }}>
                                    {source.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
