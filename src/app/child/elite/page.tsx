'use client';

import { useState } from 'react';
import { useAppStore } from '@/stores/app-store';
import { useTranslation, useLangStore } from '@/lib/i18n';
import { LangToggle } from '@/components/LangToggle';
import {
    generateProbabilityScenarios,
    WANTS_VS_NEEDS,
    POLICY_SCENARIOS,
    CIRCLE_OF_CONTROL,
    NEGOTIATION_CHALLENGES,
    type LikelihoodLevel,
} from '@/lib/elite/engine';
import { ArrowLeft, Brain, Coins, Globe, Handshake, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';

type EliteTab = 'overview' | 'probability' | 'finance' | 'civics' | 'negotiation' | 'ethics';

const LIKELIHOOD_VI: Record<LikelihoodLevel, string> = {
    impossible: 'Không thể', unlikely: 'Ít khi', equal: 'Ngang nhau', likely: 'Có khả năng', certain: 'Chắc chắn',
};
const LIKELIHOOD_EN: Record<LikelihoodLevel, string> = {
    impossible: 'Impossible', unlikely: 'Unlikely', equal: 'Equal', likely: 'Likely', certain: 'Certain',
};

export default function EliteDashboardPage() {
    const childProfile = useAppStore((s) => s.childProfile);
    const [activeTab, setActiveTab] = useState<EliteTab>('overview');
    const { t } = useTranslation();
    const lang = useLangStore((s) => s.lang);
    const likelihoodLabel = lang === 'vi' ? LIKELIHOOD_VI : LIKELIHOOD_EN;

    // Game states
    const [probScenarios] = useState(() => generateProbabilityScenarios(5));
    const [probIndex, setProbIndex] = useState(0);
    const [probAnswer, setProbAnswer] = useState<LikelihoodLevel | null>(null);
    const [probScore, setProbScore] = useState(0);

    const [wvnIndex, setWvnIndex] = useState(0);
    const [wvnAnswer, setWvnAnswer] = useState<'want' | 'need' | null>(null);
    const [wvnScore, setWvnScore] = useState(0);

    const [policyIndex, setPolicyIndex] = useState(0);
    const [policyChoice, setPolicyChoice] = useState<number | null>(null);

    const [cocIndex, setCocIndex] = useState(0);
    const [cocAnswer, setCocAnswer] = useState<'controllable' | 'uncontrollable' | null>(null);
    const [cocScore, setCocScore] = useState(0);

    const metrics = childProfile?.eliteMetrics ?? {
        bilingual_agility: 0, stochastic_intuition: 0, systemic_reasoning: 0,
        investor_quotient: 50, empathy_persuasion: 0, stoic_resilience: 50,
    };

    const metricLabels: { key: keyof typeof metrics; i18nKey: string; color: string }[] = [
        { key: 'bilingual_agility', i18nKey: 'm_bilingual', color: '#8b5cf6' },
        { key: 'stochastic_intuition', i18nKey: 'm_stochastic', color: '#3b82f6' },
        { key: 'systemic_reasoning', i18nKey: 'm_systemic', color: '#10b981' },
        { key: 'investor_quotient', i18nKey: 'm_investor', color: '#f59e0b' },
        { key: 'empathy_persuasion', i18nKey: 'm_persuasion', color: '#ef4444' },
        { key: 'stoic_resilience', i18nKey: 'm_resilience', color: '#6366f1' },
    ];

    const TAB_CONFIG: { key: EliteTab; i18nKey: string; icon: React.ReactNode; color: string }[] = [
        { key: 'overview', i18nKey: 'tab_overview', icon: <Sparkles size={18} />, color: '#8b5cf6' },
        { key: 'probability', i18nKey: 'tab_probability', icon: <Brain size={18} />, color: '#3b82f6' },
        { key: 'finance', i18nKey: 'tab_finance', icon: <Coins size={18} />, color: '#f59e0b' },
        { key: 'civics', i18nKey: 'tab_civics', icon: <Globe size={18} />, color: '#10b981' },
        { key: 'negotiation', i18nKey: 'tab_negotiation', icon: <Handshake size={18} />, color: '#ef4444' },
        { key: 'ethics', i18nKey: 'tab_ethics', icon: <Shield size={18} />, color: '#6366f1' },
    ];

    return (
        <div style={{ paddingTop: '1rem', background: '#09090b', minHeight: '100vh', color: '#d4d4d8', backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '30px 30px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, transparent 30%, #09090b 100%)', pointerEvents: 'none' }} />
            <div className="page-container" style={{ position: 'relative', zIndex: 10 }}>
                {/* Header */}
                <div className="page-header" style={{ marginBottom: '1rem', borderBottom: '1px solid #27272a', paddingBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <Link href="/child" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#a1a1aa', textDecoration: 'none', marginBottom: '0.5rem' }}>
                                <ArrowLeft size={16} /> TRUNG TÂM CHỈ HUY KIỂM SOÁT
                            </Link>
                            <h1 className="page-title" style={{ fontSize: '1.5rem', color: '#38bdf8', textShadow: '0 0 10px rgba(56, 189, 248, 0.5)', fontFamily: 'monospace' }}>MỤC TIÊU: {t('elite_page_title').toUpperCase()}</h1>
                            <p className="page-subtitle" style={{ color: '#71717a', fontFamily: 'monospace' }}>[RADAR ACTIVE] Phân tích Rủi ro Hệ thống theo chuẩn CASEL ...</p>
                        </div>
                        <LangToggle />
                    </div>
                </div>

                {/* Tab Bar */}
                <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                    {TAB_CONFIG.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.4rem',
                                padding: '0.5rem 1rem', borderRadius: '999px', border: 'none',
                                background: activeTab === tab.key ? tab.color : 'white',
                                color: activeTab === tab.key ? 'white' : 'var(--color-text-secondary)',
                                fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                                whiteSpace: 'nowrap', transition: 'all 0.2s',
                                boxShadow: activeTab === tab.key ? `0 2px 8px ${tab.color}40` : '0 1px 3px rgba(0,0,0,0.1)',
                            }}
                        >
                            {tab.icon} {t(tab.i18nKey)}
                        </button>
                    ))}
                </div>

                {/* OVERVIEW */}
                {activeTab === 'overview' && (
                    <div className="card animate-fade-in">
                        <h2 style={{ fontWeight: 700, marginBottom: '1rem' }}>{t('metrics_title')}</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {metricLabels.map((m) => (
                                <div key={m.key}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t(m.i18nKey)}</span>
                                        <span style={{ fontWeight: 700, color: m.color }}>{metrics[m.key]}/100</span>
                                    </div>
                                    <div style={{ background: '#e5e7eb', borderRadius: '999px', height: '10px', overflow: 'hidden' }}>
                                        <div style={{ width: `${metrics[m.key]}%`, background: m.color, height: '100%', borderRadius: '999px', transition: 'width 0.5s ease' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* PROBABILITY */}
                {activeTab === 'probability' && probIndex < probScenarios.length && (
                    <div className="card animate-fade-in" style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}>
                        <h2 style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#60a5fa', fontFamily: 'monospace' }}>🔴 {t('prob_title').toUpperCase()} [GAME THEORY]</h2>
                        <p style={{ color: '#a1a1aa', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'monospace' }}>
                            TẬP DỮ LIỆU {probIndex + 1} / {probScenarios.length} — CẤP BẬC: {probScore}
                        </p>
                        <div style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '0.5rem' }}>{probScenarios[probIndex].visual}</div>
                        <p style={{ fontWeight: 600, marginBottom: '1rem', textAlign: 'center' }}>{probScenarios[probIndex].question}</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {probScenarios[probIndex].options.map((opt) => {
                                const isCorrect = probAnswer && opt === probScenarios[probIndex].correctAnswer;
                                const isWrong = probAnswer === opt && opt !== probScenarios[probIndex].correctAnswer;
                                return (
                                    <button key={opt} onClick={() => { if (probAnswer) return; setProbAnswer(opt); if (opt === probScenarios[probIndex].correctAnswer) setProbScore((s) => s + 20); }}
                                        className="btn" style={{ textAlign: 'left', padding: '0.75rem 1rem', background: isCorrect ? 'rgba(16,185,129,0.1)' : isWrong ? 'rgba(239,68,68,0.1)' : '#27272a', border: isCorrect ? '1px solid #10b981' : isWrong ? '1px solid #ef4444' : '1px solid #3f3f46', color: '#e4e4e7', fontFamily: 'monospace', fontWeight: 600 }}>
                                        ► {likelihoodLabel[opt]}
                                    </button>
                                );
                            })}
                        </div>
                        {probAnswer && (
                            <div style={{ marginTop: '1rem', padding: '1rem', background: '#064e3b', borderLeft: '4px solid #34d399' }}>
                                <p style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#a7f3d0', fontFamily: 'monospace' }}>[HỆ THỐNG] {probAnswer === probScenarios[probIndex].correctAnswer ? 'PHÂN TÍCH CHUẨN XÁC' : 'TÍNH TOÁN SAI LỆCH'}</p>
                                <p style={{ fontSize: '0.9rem', color: '#d1fae5' }}>{probScenarios[probIndex].explanation}</p>
                                <button className="btn btn-primary" style={{ marginTop: '0.75rem', background: '#34d399', color: '#000', border: 'none', fontFamily: 'monospace' }} onClick={() => { setProbAnswer(null); setProbIndex((i) => i + 1); }}>{t('next').toUpperCase()} LỆNH</button>
                            </div>
                        )}
                    </div>
                )}
                {activeTab === 'probability' && probIndex >= probScenarios.length && (
                    <div className="card animate-fade-in" style={{ textAlign: 'center', background: '#18181b', border: '1px solid #27272a' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📡</div>
                        <h2 style={{ fontWeight: 700, color: '#38bdf8', fontFamily: 'monospace' }}>NHIỆM VỤ HOÀN THẤT. ĐIỂM: {probScore}/100</h2>
                        <button className="btn" style={{ marginTop: '1rem', background: '#3f3f46', color: '#fff', fontFamily: 'monospace' }} onClick={() => { setProbIndex(0); setProbScore(0); setProbAnswer(null); }}>[RE-SCAN] QUÉT LẠI CỨ ĐIỂM</button>
                    </div>
                )}

                {/* FINANCE */}
                {activeTab === 'finance' && wvnIndex < WANTS_VS_NEEDS.length && (
                    <div className="card animate-fade-in" style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}>
                        <h2 style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#fbbf24', fontFamily: 'monospace' }}>🟡 PHÂN TÍCH NHU CẦU [TÀI CHÍNH / CẦN & MUỐN]</h2>
                        <p style={{ color: '#a1a1aa', fontSize: '0.85rem', marginBottom: '1rem', fontFamily: 'monospace' }}>
                            DỮ LIỆU {wvnIndex + 1} / {WANTS_VS_NEEDS.length} — CẤP BẬC: {wvnScore}
                        </p>
                        <div style={{ textAlign: 'center', fontSize: '4rem', marginBottom: '0.5rem' }}>{WANTS_VS_NEEDS[wvnIndex].visual}</div>
                        <p style={{ fontWeight: 600, textAlign: 'center', marginBottom: '1rem', fontSize: '1.2rem' }}>{WANTS_VS_NEEDS[wvnIndex].name}</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            {(['want', 'need'] as const).map((opt) => {
                                const isCorrect = wvnAnswer && opt === WANTS_VS_NEEDS[wvnIndex].correctCategory;
                                const isWrong = wvnAnswer === opt && opt !== WANTS_VS_NEEDS[wvnIndex].correctCategory;
                                return (
                                    <button key={opt} onClick={() => { if (wvnAnswer) return; setWvnAnswer(opt); if (opt === WANTS_VS_NEEDS[wvnIndex].correctCategory) setWvnScore((s) => s + 12); }}
                                        className="btn" style={{ flex: 1, padding: '1rem', fontSize: '1.1rem', fontWeight: 700, background: isCorrect ? 'rgba(16,185,129,0.2)' : isWrong ? 'rgba(239,68,68,0.2)' : '#27272a', border: isCorrect ? '1px solid #10b981' : isWrong ? '1px solid #ef4444' : '1px solid #3f3f46', color: '#e4e4e7', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                                        {opt === 'want' ? 'MỤC TIÊU MUỐN' : 'CHI PHÍ THIẾT YẾU'}
                                    </button>
                                );
                            })}
                        </div>
                        {wvnAnswer && (
                            <div style={{ marginTop: '1rem', padding: '1rem', background: '#fffbeb', borderRadius: '12px' }}>
                                <p style={{ fontWeight: 600 }}>{wvnAnswer === WANTS_VS_NEEDS[wvnIndex].correctCategory ? t('correct') : t('wrong')}</p>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{WANTS_VS_NEEDS[wvnIndex].explanation}</p>
                                <button className="btn btn-primary" style={{ marginTop: '0.75rem' }} onClick={() => { setWvnAnswer(null); setWvnIndex((i) => i + 1); }}>{t('next')}</button>
                            </div>
                        )}
                    </div>
                )}
                {activeTab === 'finance' && wvnIndex >= WANTS_VS_NEEDS.length && (
                    <div className="card animate-fade-in" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💰</div>
                        <h2 style={{ fontWeight: 700 }}>{t('done')} {t('score_label')}: {wvnScore}/{WANTS_VS_NEEDS.length * 12}</h2>
                        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => { setWvnIndex(0); setWvnScore(0); setWvnAnswer(null); }}>{t('replay')}</button>
                    </div>
                )}

                {/* CIVICS */}
                {activeTab === 'civics' && (
                    <div className="card animate-fade-in">
                        <h2 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{t('civ_title')}</h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                            {t('civ_scenario')} {policyIndex + 1} / {POLICY_SCENARIOS.length}
                        </p>
                        <div style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '0.5rem' }}>{POLICY_SCENARIOS[policyIndex].visual}</div>
                        <p style={{ fontWeight: 600, marginBottom: '1rem' }}>{POLICY_SCENARIOS[policyIndex].situation}</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {POLICY_SCENARIOS[policyIndex].options.map((opt, idx) => (
                                <button key={idx} onClick={() => setPolicyChoice(idx)} className="card" style={{ textAlign: 'left', cursor: 'pointer', border: policyChoice === idx ? '2px solid var(--color-primary)' : '2px solid var(--color-border-light)', background: policyChoice === idx ? 'rgba(99,102,241,0.05)' : 'white' }}>
                                    <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{opt.text}</div>
                                    {policyChoice === idx && (
                                        <div style={{ marginTop: '0.5rem' }}>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>{opt.consequence}</p>
                                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                                                <span>{t('civ_fairness')}: <strong style={{ color: opt.fairnessScore > 60 ? '#10b981' : '#ef4444' }}>{opt.fairnessScore}%</strong></span>
                                                <span>{t('civ_happiness')}: <strong style={{ color: opt.happinessScore > 60 ? '#10b981' : '#ef4444' }}>{opt.happinessScore}%</strong></span>
                                            </div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                        {policyChoice !== null && policyIndex < POLICY_SCENARIOS.length - 1 && (
                            <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => { setPolicyChoice(null); setPolicyIndex((i) => i + 1); }}>{t('next')}</button>
                        )}
                    </div>
                )}

                {/* ETHICS */}
                {activeTab === 'ethics' && cocIndex < CIRCLE_OF_CONTROL.length && (
                    <div className="card animate-fade-in">
                        <h2 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{t('eth_title')}</h2>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                            {t('q_label')} {cocIndex + 1} / {CIRCLE_OF_CONTROL.length} — {t('score_label')}: {cocScore}
                        </p>
                        <div style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '0.5rem' }}>{CIRCLE_OF_CONTROL[cocIndex].visual}</div>
                        <p style={{ fontWeight: 600, textAlign: 'center', marginBottom: '1rem' }}>{CIRCLE_OF_CONTROL[cocIndex].situation}</p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            {(['controllable', 'uncontrollable'] as const).map((opt) => {
                                const isCorrect = cocAnswer && opt === CIRCLE_OF_CONTROL[cocIndex].correctCategory;
                                const isWrong = cocAnswer === opt && opt !== CIRCLE_OF_CONTROL[cocIndex].correctCategory;
                                return (
                                    <button key={opt} onClick={() => { if (cocAnswer) return; setCocAnswer(opt); if (opt === CIRCLE_OF_CONTROL[cocIndex].correctCategory) setCocScore((s) => s + 16); }}
                                        className="btn" style={{ flex: 1, padding: '1rem', fontSize: '0.95rem', fontWeight: 700, background: isCorrect ? '#d1fae5' : isWrong ? '#fee2e2' : opt === 'controllable' ? '#dbeafe' : '#fef3c7', border: isCorrect ? '2px solid #10b981' : isWrong ? '2px solid #ef4444' : '2px solid transparent' }}>
                                        {opt === 'controllable' ? t('eth_ctrl') : t('eth_no_ctrl')}
                                    </button>
                                );
                            })}
                        </div>
                        {cocAnswer && (
                            <div style={{ marginTop: '1rem', padding: '1rem', background: '#eef2ff', borderRadius: '12px' }}>
                                <p style={{ fontWeight: 600 }}>{cocAnswer === CIRCLE_OF_CONTROL[cocIndex].correctCategory ? t('correct') : t('wrong')}</p>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>{CIRCLE_OF_CONTROL[cocIndex].explanation}</p>
                                <button className="btn btn-primary" style={{ marginTop: '0.75rem' }} onClick={() => { setCocAnswer(null); setCocIndex((i) => i + 1); }}>{t('next')}</button>
                            </div>
                        )}
                    </div>
                )}
                {activeTab === 'ethics' && cocIndex >= CIRCLE_OF_CONTROL.length && (
                    <div className="card animate-fade-in" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🛡️</div>
                        <h2 style={{ fontWeight: 700 }}>{t('done')} {t('score_label')}: {cocScore}/{CIRCLE_OF_CONTROL.length * 16}</h2>
                        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => { setCocIndex(0); setCocScore(0); setCocAnswer(null); }}>{t('eth_retry')}</button>
                    </div>
                )}

                {/* NEGOTIATION */}
                {activeTab === 'negotiation' && (
                    <div className="card animate-fade-in">
                        <h2 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{t('neg_title')}</h2>
                        <div style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '0.5rem' }}>{NEGOTIATION_CHALLENGES[0].visual}</div>
                        <div style={{ padding: '1rem', background: '#fef3c7', borderRadius: '12px', marginBottom: '1rem' }}>
                            <p style={{ fontWeight: 600 }}>{NEGOTIATION_CHALLENGES[0].scenario}</p>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>AI: {NEGOTIATION_CHALLENGES[0].aiPersonality}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div className="card" style={{ background: '#fee2e2', border: '2px solid #fca5a5' }}>
                                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#b91c1c' }}>{t('neg_common')}</p>
                                <p style={{ fontSize: '0.9rem' }}>{NEGOTIATION_CHALLENGES[0].sampleRequest}</p>
                            </div>
                            <div className="card" style={{ background: '#d1fae5', border: '2px solid #6ee7b7' }}>
                                <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#065f46' }}>{t('neg_winwin')}</p>
                                <p style={{ fontSize: '0.9rem' }}>{NEGOTIATION_CHALLENGES[0].sampleWinWin}</p>
                            </div>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '1rem', textAlign: 'center' }}>{t('neg_learn')}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
