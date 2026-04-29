import Link from 'next/link';
import {
    ArrowLeft,
    BarChart3,
    BookOpen,
    CheckCircle2,
    ExternalLink,
    Gauge,
    ShieldAlert,
    Target,
    TrendingUp,
} from 'lucide-react';
import {
    COMPETITIVE_PROFILES,
    FULLSTACK_BENCHMARK_DIMENSIONS,
    FULLSTACK_BENCHMARK_ROADMAP,
    FULLSTACK_BENCHMARK_SOURCES,
    HENRY_FULLSTACK_BENCHMARK,
    PRIMARY_CURRICULUM_EXPLANATION_EXAMPLES,
    PRIMARY_SCHOOL_CURRICULUM_SCOPE,
    VIETNAM_CURRICULUM_BENCHMARK,
    VIETNAM_CURRICULUM_BENCHMARK_CHECKS,
    VIETNAM_CURRICULUM_SUBJECT_COVERAGE,
    sourceLookup,
} from '@/data/fullstack-competitive-benchmark';

function scoreColor(score: number) {
    if (score >= 7) return '#059669';
    if (score >= 5.5) return '#2563eb';
    if (score >= 4) return '#d97706';
    return '#dc2626';
}

function scoreLabel(score: number) {
    if (score >= 7) return 'Mạnh';
    if (score >= 5.5) return 'Có nền';
    if (score >= 4) return 'Cần nâng';
    return 'Thiếu evidence';
}

function primaryScopeStatusLabel(status: string) {
    if (status === 'in_app_mapped') return 'Đã có trong app';
    if (status === 'benchmark_scope_only') return 'Có trong scope benchmark';
    return 'Tự chọn / tham chiếu';
}

function primaryScopeStatusColor(status: string) {
    if (status === 'in_app_mapped') return '#059669';
    if (status === 'benchmark_scope_only') return '#2563eb';
    return '#64748b';
}

export default function ParentBenchmarkPage() {
    return (
        <main style={{ minHeight: '100dvh', background: '#f8fafc', fontFamily: 'var(--font-parent)' }}>
            <div className="page-container" style={{ maxWidth: '1040px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <Link href="/parent/dashboard">
                        <button className="btn btn-ghost btn-sm" aria-label="Quay lại dashboard phụ huynh">
                            <ArrowLeft size={18} />
                        </button>
                    </Link>
                    <div>
                        <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.82rem', fontWeight: 700 }}>
                            Benchmark full-stack cập nhật {HENRY_FULLSTACK_BENCHMARK.asOf}
                        </div>
                        <h1 style={{ fontWeight: 900, fontSize: '1.6rem', color: '#0f172a' }}>
                            Henry Learning OS so với các nền tảng học hàng đầu
                        </h1>
                    </div>
                </div>

                <section
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '1rem',
                        marginBottom: '1.25rem',
                    }}
                >
                    <div className="card" style={{ borderRadius: '12px', border: '1px solid #dbeafe' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2563eb', fontWeight: 800, marginBottom: '1rem' }}>
                            <Gauge size={18} /> Điểm cạnh tranh
                        </div>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
                            <span style={{ fontSize: '3.2rem', lineHeight: 1, fontWeight: 900, color: scoreColor(HENRY_FULLSTACK_BENCHMARK.overallScore10) }}>
                                {HENRY_FULLSTACK_BENCHMARK.overallScore100}
                            </span>
                            <span style={{ color: 'var(--color-text-secondary)', fontWeight: 800 }}>/100</span>
                        </div>
                        <div className="mastery-bar" style={{ margin: '1rem 0 0.6rem' }}>
                            <div
                                className="mastery-fill"
                                style={{
                                    width: `${HENRY_FULLSTACK_BENCHMARK.overallScore100}%`,
                                    background: scoreColor(HENRY_FULLSTACK_BENCHMARK.overallScore10),
                                }}
                            />
                        </div>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.55 }}>
                            {HENRY_FULLSTACK_BENCHMARK.conclusion}
                        </p>
                    </div>

                    <div className="card" style={{ borderRadius: '12px', border: '1px solid #fee2e2' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#dc2626', fontWeight: 800, marginBottom: '0.75rem' }}>
                            <ShieldAlert size={18} /> Guardrail evidence
                        </div>
                        <p style={{ color: '#7f1d1d', background: '#fef2f2', borderRadius: '10px', padding: '0.85rem', lineHeight: 1.55, marginBottom: '0.9rem' }}>
                            {HENRY_FULLSTACK_BENCHMARK.noClaimGuardrail}
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.65rem' }}>
                            {[
                                { label: 'Có test/build', value: 'Có' },
                                { label: 'Có cohort thật', value: 'Chưa' },
                                { label: 'Có pre/post', value: 'Chưa' },
                                { label: 'Có retention', value: 'Chưa' },
                            ].map((item) => (
                                <div key={item.label} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.75rem' }}>
                                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.76rem', fontWeight: 700 }}>{item.label}</div>
                                    <div style={{ fontWeight: 900, color: item.value === 'Có' ? '#059669' : '#dc2626' }}>{item.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.75rem' }}>
                        <BookOpen size={18} color="#059669" /> Benchmark chương trình Việt Nam 2026-2027
                    </h2>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '0.85rem',
                            marginBottom: '0.85rem',
                        }}
                    >
                        <article className="card" style={{ borderRadius: '12px', padding: '1rem', border: '1px solid #bbf7d0' }}>
                            <div style={{ color: '#047857', fontWeight: 900, fontSize: '0.82rem', marginBottom: '0.65rem' }}>
                                Độ phủ benchmark nguồn
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.75rem' }}>
                                <span style={{ fontSize: '2.8rem', lineHeight: 1, fontWeight: 900, color: '#059669' }}>
                                    {VIETNAM_CURRICULUM_BENCHMARK.coverage100}
                                </span>
                                <span style={{ color: 'var(--color-text-secondary)', fontWeight: 800 }}>/100</span>
                            </div>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.86rem', lineHeight: 1.55, marginBottom: '0.75rem' }}>
                                Năm học {VIETNAM_CURRICULUM_BENCHMARK.schoolYear} · {VIETNAM_CURRICULUM_BENCHMARK.requiredCheckCount} gate bắt buộc · {VIETNAM_CURRICULUM_BENCHMARK.coveredSubjectCount} nhóm môn đang có mapping nguồn.
                            </p>
                            <p style={{ color: '#065f46', background: '#ecfdf5', borderRadius: '10px', padding: '0.75rem', fontSize: '0.82rem', lineHeight: 1.5 }}>
                                {VIETNAM_CURRICULUM_BENCHMARK.scope}
                            </p>
                        </article>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                            {VIETNAM_CURRICULUM_BENCHMARK_CHECKS.map((check) => (
                                <article key={check.key} className="card" style={{ borderRadius: '12px', padding: '1rem', borderLeft: '4px solid #10b981' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontWeight: 900, fontSize: '0.78rem', marginBottom: '0.35rem' }}>
                                        <CheckCircle2 size={14} /> Đã đạt
                                    </div>
                                    <h3 style={{ fontWeight: 900, color: '#0f172a', marginBottom: '0.45rem' }}>{check.label}</h3>
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', lineHeight: 1.5 }}>
                                        {check.verificationGate}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
                        {VIETNAM_CURRICULUM_SUBJECT_COVERAGE.map((subject) => (
                            <article key={subject.subject} className="card" style={{ borderRadius: '12px', padding: '0.9rem' }}>
                                <div style={{ fontWeight: 900, color: '#0f172a', marginBottom: '0.35rem' }}>{subject.subject}</div>
                                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.78rem', lineHeight: 1.45, marginBottom: '0.5rem' }}>
                                    {subject.gradeBand}
                                </div>
                                <div style={{ color: '#075985', fontSize: '0.78rem', lineHeight: 1.45, marginBottom: '0.5rem' }}>
                                    Phần app: {subject.appSurface}
                                </div>
                                <div style={{ color: '#7c2d12', fontSize: '0.78rem', lineHeight: 1.45 }}>
                                    Gate tiếp theo: {subject.nextGate}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.75rem' }}>
                        <BookOpen size={18} color="#2563eb" /> Bậc tiểu học: kiểm soát kỹ lưỡng 100%
                    </h2>
                    <div className="card" style={{ borderRadius: '12px', padding: '1rem', border: '1px solid #dbeafe', marginBottom: '0.85rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.75rem', marginBottom: '0.9rem' }}>
                            {[
                                { label: 'Độ phủ scope tiểu học', value: `${VIETNAM_CURRICULUM_BENCHMARK.primarySchoolScopeCoverage100}/100` },
                                { label: 'Nhóm chính thức', value: `${VIETNAM_CURRICULUM_BENCHMARK.primaryOfficialScopeCount}` },
                                { label: 'Bắt buộc', value: `${VIETNAM_CURRICULUM_BENCHMARK.primaryMandatoryCount}` },
                                { label: 'Tự chọn', value: `${VIETNAM_CURRICULUM_BENCHMARK.primaryOptionalCount}` },
                                { label: 'Ví dụ diễn giải', value: `${VIETNAM_CURRICULUM_BENCHMARK.primaryExampleCount}` },
                            ].map((item) => (
                                <div key={item.label} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.75rem' }}>
                                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.76rem', fontWeight: 700 }}>{item.label}</div>
                                    <div style={{ fontWeight: 900, color: item.value.includes('/100') ? '#059669' : '#0f172a' }}>{item.value}</div>
                                </div>
                            ))}
                        </div>
                        <p style={{ color: '#075985', fontSize: '0.86rem', lineHeight: 1.55 }}>
                            Bậc tiểu học được benchmark theo toàn bộ phạm vi chính thức: 11 môn học/hoạt động giáo dục bắt buộc và 2 môn tự chọn. Những mục chưa có module riêng vẫn được giữ trong scope để không bị bỏ sót khi nâng cấp.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.75rem', marginBottom: '0.85rem' }}>
                        {PRIMARY_SCHOOL_CURRICULUM_SCOPE.map((item) => (
                            <article key={item.key} className="card" style={{ borderRadius: '12px', padding: '0.9rem' }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.65rem', marginBottom: '0.45rem' }}>
                                    <div>
                                        <div style={{ fontWeight: 900, color: '#0f172a', marginBottom: '0.25rem' }}>{item.label}</div>
                                        <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.76rem' }}>
                                            {item.gradeBand} · {item.officialRole === 'mandatory' ? 'Bắt buộc' : 'Tự chọn'}
                                        </div>
                                    </div>
                                    <span
                                        className="badge"
                                        style={{
                                            background: `${primaryScopeStatusColor(item.status)}18`,
                                            color: primaryScopeStatusColor(item.status),
                                            whiteSpace: 'normal',
                                            textAlign: 'center',
                                            lineHeight: 1.25,
                                        }}
                                    >
                                        {primaryScopeStatusLabel(item.status)}
                                    </span>
                                </div>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                                    {item.plainLanguage}
                                </p>
                                <p style={{ color: '#7c2d12', fontSize: '0.78rem', lineHeight: 1.45 }}>
                                    Gate: {item.verificationGate}
                                </p>
                            </article>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
                        {PRIMARY_CURRICULUM_EXPLANATION_EXAMPLES.map((example) => (
                            <article key={example.id} className="card" style={{ borderRadius: '12px', padding: '0.95rem', borderLeft: '4px solid #2563eb' }}>
                                <div style={{ color: '#2563eb', fontWeight: 900, fontSize: '0.78rem', marginBottom: '0.3rem' }}>
                                    Lớp {example.grade} · {example.subject}
                                </div>
                                <h3 style={{ fontWeight: 900, color: '#0f172a', marginBottom: '0.45rem' }}>{example.competencyFocus}</h3>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                                    {example.childFriendlyExplanation}
                                </p>
                                <p style={{ color: '#075985', fontSize: '0.8rem', lineHeight: 1.45, marginBottom: '0.5rem' }}>
                                    Ví dụ: {example.exampleTask}
                                </p>
                                <p style={{ color: '#065f46', fontSize: '0.78rem', lineHeight: 1.45 }}>
                                    Minh chứng cần lưu: {example.evidenceToStore}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.75rem' }}>
                        <BarChart3 size={18} color="#2563eb" /> Scorecard có trọng số
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
                        {FULLSTACK_BENCHMARK_DIMENSIONS.map((dimension) => (
                            <article key={dimension.key} className="card" style={{ borderRadius: '12px', padding: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                    <div>
                                        <h3 style={{ fontWeight: 900, color: '#0f172a', marginBottom: '0.25rem' }}>{dimension.label}</h3>
                                        <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.78rem' }}>
                                            Trọng số {dimension.weightPct}% · {dimension.topBenchmarks.join(', ')}
                                        </div>
                                    </div>
                                    <span
                                        className="badge"
                                        style={{
                                            background: `${scoreColor(dimension.henryScore10)}18`,
                                            color: scoreColor(dimension.henryScore10),
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {dimension.henryScore10}/10 · {scoreLabel(dimension.henryScore10)}
                                    </span>
                                </div>
                                <div className="mastery-bar" style={{ marginBottom: '0.75rem' }}>
                                    <div
                                        className="mastery-fill"
                                        style={{
                                            width: `${dimension.henryScore10 * 10}%`,
                                            background: scoreColor(dimension.henryScore10),
                                        }}
                                    />
                                </div>
                                <p style={{ fontSize: '0.84rem', lineHeight: 1.55, color: 'var(--color-text-secondary)', marginBottom: '0.55rem' }}>
                                    <strong>Gap:</strong> {dimension.gap}
                                </p>
                                <p style={{ fontSize: '0.84rem', lineHeight: 1.55, color: '#075985', marginBottom: '0.55rem' }}>
                                    <strong>Nâng cấp đúng trọng tâm:</strong> {dimension.nextUpgrade}
                                </p>
                                <p style={{ fontSize: '0.8rem', lineHeight: 1.5, color: '#7c2d12' }}>
                                    <strong>Muốn claim hiệu quả cần:</strong> {dimension.evidenceNeededBeforeEfficacyClaim}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.75rem' }}>
                        <TrendingUp size={18} color="#059669" /> Chuẩn dùng để benchmark
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.85rem' }}>
                        {COMPETITIVE_PROFILES.map((profile) => (
                            <article key={profile.product} className="card" style={{ borderRadius: '12px', padding: '1rem' }}>
                                <h3 style={{ fontWeight: 900, color: '#0f172a', marginBottom: '0.55rem' }}>{profile.product}</h3>
                                <ul style={{ paddingLeft: '1rem', marginBottom: '0.75rem', color: 'var(--color-text-secondary)', fontSize: '0.84rem', lineHeight: 1.5 }}>
                                    {profile.leadingSignals.map((signal) => (
                                        <li key={signal}>{signal}</li>
                                    ))}
                                </ul>
                                <p style={{ color: '#075985', fontSize: '0.84rem', lineHeight: 1.55 }}>{profile.henryImplication}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.75rem' }}>
                        <Target size={18} color="#d97706" /> Roadmap data-driven
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
                        {FULLSTACK_BENCHMARK_ROADMAP.map((item) => (
                            <article key={item.priority} className="card" style={{ borderRadius: '12px', padding: '1rem', borderLeft: '4px solid #f59e0b' }}>
                                <div style={{ fontWeight: 900, color: '#92400e', marginBottom: '0.45rem' }}>P{item.priority}</div>
                                <h3 style={{ fontWeight: 900, color: '#0f172a', marginBottom: '0.45rem' }}>{item.title}</h3>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.84rem', lineHeight: 1.5, marginBottom: '0.55rem' }}>{item.whyNow}</p>
                                <p style={{ color: '#065f46', fontSize: '0.82rem', lineHeight: 1.5 }}>
                                    <CheckCircle2 size={14} style={{ verticalAlign: '-2px', marginRight: '0.25rem' }} />
                                    {item.measurableGate}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                <section style={{ marginBottom: '1rem' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: 900, marginBottom: '0.75rem' }}>
                        <ExternalLink size={18} color="#64748b" /> Nguồn benchmark
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.65rem' }}>
                        {FULLSTACK_BENCHMARK_SOURCES.map((source) => (
                            <a
                                key={source.id}
                                href={source.url}
                                target="_blank"
                                rel="noreferrer"
                                className="card card-interactive"
                                style={{ borderRadius: '10px', padding: '0.85rem', textDecoration: 'none', color: 'inherit' }}
                            >
                                <div style={{ fontWeight: 900, color: '#0f172a', marginBottom: '0.25rem' }}>
                                    {source.label}
                                </div>
                                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', lineHeight: 1.45 }}>
                                    {sourceLookup(source.id)?.benchmarkSignal}
                                </div>
                            </a>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
