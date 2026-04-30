'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    BarChart3,
    Brain,
    CheckCircle2,
    ClipboardList,
    Gauge,
    RotateCcw,
    ShieldAlert,
    Target,
} from 'lucide-react';
import {
    GRADE1_DIAGNOSTIC_BLUEPRINT,
    GRADE1_DIAGNOSTIC_ITEMS,
    scoreGrade1DiagnosticWarmStart,
    type DiagnosticItemResponse,
} from '@/lib/diagnostic/grade1-warm-start';

type ResponseChoice = 'independent_correct' | 'hinted_correct' | 'not_yet';

const CHOICE_LABELS: Record<ResponseChoice, string> = {
    independent_correct: 'Đúng độc lập',
    hinted_correct: 'Đúng có gợi ý',
    not_yet: 'Chưa đúng',
};

function makeResponse(itemId: string, choice: ResponseChoice): DiagnosticItemResponse {
    return {
        itemId,
        isCorrect: choice !== 'not_yet',
        hintLevelUsed: choice === 'independent_correct' ? 0 : choice === 'hinted_correct' ? 2 : 1,
        confidenceSelfRating: choice === 'independent_correct' ? 4 : choice === 'hinted_correct' ? 3 : 2,
        childExplanation: choice === 'independent_correct' ? 'Con tự giải thích được.' : choice === 'hinted_correct' ? 'Con cần gợi ý để hoàn thành.' : 'Con còn lẫn hoặc chưa giải thích được.',
        answeredAt: new Date().toISOString(),
    };
}

function bandLabel(band: string) {
    if (band === 'foundation_needed') return 'Củng cố nền';
    if (band === 'guided_practice') return 'Luyện có hướng dẫn';
    if (band === 'ready_to_learn') return 'Sẵn sàng học';
    if (band === 'stretch_candidate') return 'Có thể mở rộng';
    return 'Thiếu dữ liệu';
}

function bandColor(band: string) {
    if (band === 'foundation_needed') return '#dc2626';
    if (band === 'guided_practice') return '#d97706';
    if (band === 'ready_to_learn') return '#2563eb';
    if (band === 'stretch_candidate') return '#059669';
    return '#64748b';
}

export default function ParentDiagnosticPage() {
    const [responsesByItem, setResponsesByItem] = useState<Record<string, DiagnosticItemResponse>>({});
    const responses = useMemo(() => Object.values(responsesByItem), [responsesByItem]);
    const result = useMemo(() => scoreGrade1DiagnosticWarmStart({ responses }), [responses]);

    const setChoice = (itemId: string, choice: ResponseChoice) => {
        setResponsesByItem((current) => ({ ...current, [itemId]: makeResponse(itemId, choice) }));
    };

    const clearItem = (itemId: string) => {
        setResponsesByItem((current) => {
            const copy = { ...current };
            delete copy[itemId];
            return copy;
        });
    };

    return (
        <main style={{ minHeight: '100dvh', background: '#f6f7fb', fontFamily: 'var(--font-parent)' }}>
            <div className="page-container" style={{ maxWidth: '1160px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Link href="/parent/sot">
                            <button className="btn btn-ghost btn-sm" aria-label="Quay lại SOT Control Center">
                                <ArrowLeft size={18} />
                            </button>
                        </Link>
                        <div>
                            <div style={{ color: '#2563eb', fontSize: '0.82rem', fontWeight: 900 }}>
                                Diagnostic warm-start · lớp 1
                            </div>
                            <h1 style={{ fontWeight: 900, fontSize: '1.65rem', color: '#0f172a', lineHeight: 1.18 }}>
                                Baseline Toán và Tiếng Việt cho kế hoạch 7 ngày
                            </h1>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <Link href="/parent/review-queue" style={{ textDecoration: 'none' }}>
                            <button className="btn btn-secondary btn-sm">
                                <ClipboardList size={16} /> Review queue
                            </button>
                        </Link>
                        <Link href="/parent/benchmark" style={{ textDecoration: 'none' }}>
                            <button className="btn btn-secondary btn-sm">
                                <BarChart3 size={16} /> Benchmark
                            </button>
                        </Link>
                    </div>
                </div>

                <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <div className="card" style={{ borderRadius: '12px', border: '1px solid #bfdbfe', background: '#ffffff' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2563eb', fontWeight: 900, fontSize: '0.82rem', marginBottom: '0.6rem' }}>
                            <Gauge size={18} /> Diagnostic evidence
                        </div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.25, marginBottom: '0.65rem' }}>
                            {result.status === 'ready_for_plan' ? 'Đã đủ baseline để sinh kế hoạch 7 ngày.' : 'Chưa đủ dữ liệu để lập kế hoạch đáng tin.'}
                        </h2>
                        <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.55, marginBottom: '0.9rem' }}>
                            {result.status === 'ready_for_plan' ? result.sevenDayPlan.parentExplanation : result.missingDataReason}
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))', gap: '0.7rem' }}>
                            {[
                                { label: 'Đã trả lời', value: `${result.answeredCount}/${result.totalItems}`, detail: `${result.completionPct}% complete`, color: '#2563eb' },
                                { label: 'Accuracy', value: result.accuracyPct === null ? 'chưa có' : `${result.accuracyPct}%`, detail: 'Không phải điểm số', color: '#059669' },
                                { label: 'Confidence', value: `${result.confidencePct}%`, detail: 'Độ tin cậy baseline', color: '#7c3aed' },
                                { label: 'Recheck', value: new Date(result.sevenDayPlan.recheckAt).toLocaleDateString('vi-VN'), detail: result.sevenDayPlan.recheckMetric, color: '#d97706' },
                            ].map((metric) => (
                                <article key={metric.label} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.8rem', background: '#f8fafc' }}>
                                    <div style={{ color: metric.color, fontWeight: 900, fontSize: '0.75rem', marginBottom: '0.35rem' }}>{metric.label}</div>
                                    <div style={{ color: '#0f172a', fontSize: '1.28rem', fontWeight: 900, lineHeight: 1 }}>{metric.value}</div>
                                    <div style={{ color: '#64748b', fontSize: '0.72rem', marginTop: '0.28rem' }}>{metric.detail}</div>
                                </article>
                            ))}
                        </div>
                    </div>

                    <aside className="card" style={{ borderRadius: '12px', border: '1px solid #fed7aa', background: '#fff7ed' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#c2410c', fontWeight: 900, fontSize: '0.82rem', marginBottom: '0.65rem' }}>
                            <ShieldAlert size={17} /> Claim gate
                        </div>
                        <p style={{ color: '#7c2d12', fontSize: '0.84rem', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                            {result.allowedClaim}
                        </p>
                        <p style={{ color: '#7c2d12', fontSize: '0.84rem', lineHeight: 1.5 }}>
                            {result.blockedClaim}
                        </p>
                    </aside>
                </section>

                <section className="card" style={{ borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.8rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f766e', fontWeight: 900, fontSize: '0.82rem', marginBottom: '0.25rem' }}>
                                <Target size={17} /> Kế hoạch 7 ngày
                            </div>
                            <h2 style={{ fontSize: '1.08rem', fontWeight: 900, color: '#0f172a' }}>
                                Focus: {result.sevenDayPlan.focus}
                            </h2>
                        </div>
                        <button className="btn btn-ghost btn-sm" onClick={() => setResponsesByItem({})}>
                            <RotateCcw size={16} /> Reset
                        </button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.7rem' }}>
                        {result.sevenDayPlan.dailyActions.map((action, index) => (
                            <div key={action} style={{ border: '1px solid #ccfbf1', borderRadius: '10px', padding: '0.75rem', background: '#f0fdfa' }}>
                                <div style={{ color: '#0f766e', fontSize: '0.75rem', fontWeight: 900, marginBottom: '0.25rem' }}>Bước {index + 1}</div>
                                <p style={{ color: '#334155', fontSize: '0.78rem', lineHeight: 1.45 }}>{action}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    {result.domainResults.map((domain) => (
                        <article key={domain.domain} className="card" style={{ borderRadius: '12px', border: `1px solid ${bandColor(domain.readinessBand)}33` }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.6rem', marginBottom: '0.5rem' }}>
                                <div style={{ color: '#0f172a', fontWeight: 900, fontSize: '0.92rem' }}>{domain.domain.replaceAll('_', ' ')}</div>
                                <span className="badge" style={{ color: bandColor(domain.readinessBand), background: `${bandColor(domain.readinessBand)}18` }}>
                                    {bandLabel(domain.readinessBand)}
                                </span>
                            </div>
                            <p style={{ color: '#475569', fontSize: '0.8rem', lineHeight: 1.45, marginBottom: '0.6rem' }}>
                                {domain.rootCause}
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.45rem' }}>
                                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.5rem' }}>
                                    <div style={{ color: '#64748b', fontSize: '0.68rem', fontWeight: 800 }}>Mẫu</div>
                                    <div style={{ color: '#0f172a', fontWeight: 900 }}>{domain.answeredCount}</div>
                                </div>
                                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.5rem' }}>
                                    <div style={{ color: '#64748b', fontSize: '0.68rem', fontWeight: 800 }}>Đúng</div>
                                    <div style={{ color: '#0f172a', fontWeight: 900 }}>{domain.accuracyPct === null ? '-' : `${domain.accuracyPct}%`}</div>
                                </div>
                                <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.5rem' }}>
                                    <div style={{ color: '#64748b', fontSize: '0.68rem', fontWeight: 800 }}>Gợi ý</div>
                                    <div style={{ color: '#0f172a', fontWeight: 900 }}>{domain.hintDependencyPct === null ? '-' : `${domain.hintDependencyPct}%`}</div>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>

                <section className="card" style={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#0f172a', fontWeight: 900, marginBottom: '0.85rem' }}>
                        <Brain size={18} /> {GRADE1_DIAGNOSTIC_BLUEPRINT.estimatedMinutes} phút · {GRADE1_DIAGNOSTIC_ITEMS.length} item
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0.75rem' }}>
                        {GRADE1_DIAGNOSTIC_ITEMS.map((item, index) => {
                            const current = responsesByItem[item.id];
                            const currentChoice: ResponseChoice | null = current
                                ? current.isCorrect && current.hintLevelUsed === 0
                                    ? 'independent_correct'
                                    : current.isCorrect
                                        ? 'hinted_correct'
                                        : 'not_yet'
                                : null;

                            return (
                                <article key={item.id} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '0.85rem', background: '#ffffff' }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.45rem' }}>
                                        <div>
                                            <div style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: 800 }}>
                                                #{index + 1} · {item.subjectLabel} · {item.topicKey}
                                            </div>
                                            <h3 style={{ color: '#0f172a', fontSize: '0.95rem', fontWeight: 900, lineHeight: 1.28 }}>{item.prompt}</h3>
                                        </div>
                                        {current && <CheckCircle2 size={18} color="#059669" />}
                                    </div>
                                    <p style={{ color: '#475569', fontSize: '0.78rem', lineHeight: 1.45, marginBottom: '0.55rem' }}>
                                        Evidence: {item.expectedEvidence}
                                    </p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                                        {(Object.keys(CHOICE_LABELS) as ResponseChoice[]).map((choice) => (
                                            <button
                                                key={choice}
                                                className="btn btn-sm"
                                                style={{
                                                    background: currentChoice === choice ? '#2563eb' : '#eff6ff',
                                                    color: currentChoice === choice ? '#ffffff' : '#1d4ed8',
                                                    border: '1px solid #bfdbfe',
                                                }}
                                                onClick={() => setChoice(item.id, choice)}
                                            >
                                                {CHOICE_LABELS[choice]}
                                            </button>
                                        ))}
                                        {current && (
                                            <button className="btn btn-ghost btn-sm" onClick={() => clearItem(item.id)}>
                                                Xóa
                                            </button>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
}
