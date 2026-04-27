'use client';

import { useState, useEffect, useMemo } from 'react';
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
    type AgeGroup
} from '@/lib/elite/engine';
import { ArrowLeft, Brain, Coins, Globe, Handshake, Shield, Sparkles, ChevronRight } from 'lucide-react';
import Link from 'next/link';

/* ─── iOS 26 Liquid Glass Design Tokens ─── */
const ios = {
    bg: '#FFFFFF',
    surface: '#F2F2F7',
    card: 'rgba(255, 255, 255, 0.25)',
    text: '#1D1D1F',
    secondary: '#6E6E73',
    muted: '#8E8E93',
    border: 'rgba(255, 255, 255, 0.3)',
    borderSolid: '#E5E5EA',
    blue: '#007AFF',
    green: '#34C759',
    red: '#FF3B30',
    orange: '#FF9500',
    purple: '#AF52DE',
    indigo: '#5856D6',
    teal: '#5AC8FA',
    radius: '20px',
    radiusSm: '14px',
    font: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    shadow: '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
    shadowLg: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.15)',
};

/* ─── Shared Styles ─── */
const cardStyle: React.CSSProperties = {
    background: ios.card,
    backdropFilter: 'blur(20px) saturate(180%) brightness(1.1)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%) brightness(1.1)',
    borderRadius: ios.radius,
    border: `1px solid ${ios.border}`,
    boxShadow: ios.shadow,
    padding: '20px',
    marginBottom: '16px',
};

const btnPrimary = (color: string): React.CSSProperties => ({
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
    padding: '12px 24px', borderRadius: ios.radiusSm, border: 'none',
    background: color, color: '#fff', fontWeight: 600, fontSize: '0.95rem',
    cursor: 'pointer', fontFamily: ios.font,
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    boxShadow: `0 4px 16px ${color}30, inset 0 1px 0 rgba(255,255,255,0.3)`,
});

const btnOption = (selected: boolean, correct: boolean | null, wrong: boolean | null): React.CSSProperties => ({
    textAlign: 'left' as const, padding: '14px 16px', borderRadius: '16px',
    border: correct ? `2px solid ${ios.green}` : wrong ? `2px solid ${ios.red}` : `1px solid ${ios.borderSolid}`,
    background: correct ? '#F0FFF4' : wrong ? '#FFF5F5' : 'rgba(255,255,255,0.7)',
    backdropFilter: 'blur(12px) saturate(150%)',
    WebkitBackdropFilter: 'blur(12px) saturate(150%)',
    cursor: selected ? 'default' : 'pointer', fontFamily: ios.font,
    fontWeight: 500, fontSize: '0.95rem', color: ios.text,
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    boxShadow: selected ? 'none' : '0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.6)',
});

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

    const [ageFilter, setAgeFilter] = useState<AgeGroup>('6-10');

    const [probScenarios, setProbScenarios] = useState(() => generateProbabilityScenarios(ageFilter, 10));
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

    const [negIndex, setNegIndex] = useState(0);
    const [negAnswer, setNegAnswer] = useState<'win' | 'lose' | null>(null);
    const [negScore, setNegScore] = useState(0);

    const currentWvn = useMemo(() => WANTS_VS_NEEDS.filter(i => i.ageTarget === ageFilter), [ageFilter]);
    const currentPol = useMemo(() => POLICY_SCENARIOS.filter(i => i.ageTarget === ageFilter), [ageFilter]);
    const currentCoc = useMemo(() => CIRCLE_OF_CONTROL.filter(i => i.ageTarget === ageFilter), [ageFilter]);
    const currentNeg = useMemo(() => NEGOTIATION_CHALLENGES.filter(i => i.ageTarget === ageFilter), [ageFilter]);

    useEffect(() => {
        setProbScenarios(generateProbabilityScenarios(ageFilter, 10));
        setProbIndex(0); setProbAnswer(null); setProbScore(0);
        setWvnIndex(0); setWvnAnswer(null); setWvnScore(0);
        setPolicyIndex(0); setPolicyChoice(null);
        setCocIndex(0); setCocAnswer(null); setCocScore(0);
        setNegIndex(0); setNegAnswer(null); setNegScore(0);
    }, [ageFilter]);

    const metrics = childProfile?.eliteMetrics ?? {
        bilingual_agility: 0, stochastic_intuition: 0, systemic_reasoning: 0,
        investor_quotient: 50, empathy_persuasion: 0, stoic_resilience: 50,
    };

    const metricLabels: { key: keyof typeof metrics; label: string; color: string }[] = [
        { key: 'bilingual_agility', label: t('m_bilingual'), color: ios.purple },
        { key: 'stochastic_intuition', label: t('m_stochastic'), color: ios.blue },
        { key: 'systemic_reasoning', label: t('m_systemic'), color: ios.green },
        { key: 'investor_quotient', label: t('m_investor'), color: ios.orange },
        { key: 'empathy_persuasion', label: t('m_persuasion'), color: ios.red },
        { key: 'stoic_resilience', label: t('m_resilience'), color: ios.indigo },
    ];

    const TAB_CONFIG: { key: EliteTab; label: string; icon: React.ReactNode; color: string }[] = [
        { key: 'overview', label: t('tab_overview'), icon: <Sparkles size={16} />, color: ios.purple },
        { key: 'probability', label: t('tab_probability'), icon: <Brain size={16} />, color: ios.blue },
        { key: 'finance', label: t('tab_finance'), icon: <Coins size={16} />, color: ios.orange },
        { key: 'civics', label: t('tab_civics'), icon: <Globe size={16} />, color: ios.green },
        { key: 'negotiation', label: t('tab_negotiation'), icon: <Handshake size={16} />, color: ios.red },
        { key: 'ethics', label: t('tab_ethics'), icon: <Shield size={16} />, color: ios.indigo },
    ];

    /* ─── Feedback card after answering ─── */
    const FeedbackCard = ({ correct, explanation, onNext }: { correct: boolean; explanation: string; onNext: () => void }) => (
        <div style={{
            marginTop: '16px', padding: '16px', borderRadius: '12px',
            background: correct ? '#F0FFF4' : '#FFF5F5',
            border: `1px solid ${correct ? '#C6F6D5' : '#FED7D7'}`,
        }}>
            <p style={{ fontWeight: 700, fontSize: '0.9rem', color: correct ? '#22543D' : '#9B2C2C', marginBottom: '6px', fontFamily: ios.font }}>
                {correct ? '✓ Chính xác!' : '✗ Chưa đúng rồi'}
            </p>
            <p style={{ fontSize: '0.9rem', color: ios.secondary, lineHeight: 1.5, fontFamily: ios.font }}>{explanation}</p>
            <button style={{ ...btnPrimary(correct ? ios.green : ios.blue), marginTop: '12px', padding: '10px 20px', fontSize: '0.9rem' }} onClick={onNext}>
                Câu tiếp theo <ChevronRight size={16} />
            </button>
        </div>
    );

    /* ─── Completion card ─── */
    const CompletionCard = ({ emoji, title, score, total, onReplay }: { emoji: string; title: string; score: number; total: number; onReplay: () => void }) => (
        <div style={{ ...cardStyle, textAlign: 'center', padding: '32px 20px' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>{emoji}</div>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: ios.text, fontFamily: ios.font, marginBottom: '4px' }}>{title}</h2>
            <p style={{ fontSize: '2rem', fontWeight: 800, color: ios.blue, fontFamily: ios.font, marginBottom: '16px' }}>
                {score} / {total}
            </p>
            <button style={btnPrimary(ios.blue)} onClick={onReplay}>Chơi lại</button>
        </div>
    );

    /* ─── Progress pill ─── */
    const ProgressPill = ({ current, total, score, color }: { current: number; total: number; score?: number; color: string }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ flex: 1, height: '4px', background: ios.borderSolid, borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${(current / total) * 100}%`, height: '100%', background: color, borderRadius: '2px', transition: 'width 0.3s ease' }} />
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: ios.secondary, fontFamily: ios.font, whiteSpace: 'nowrap' }}>
                {current}/{total} {score !== undefined && `· ${score} đ`}
            </span>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', background: ios.surface, fontFamily: ios.font }}>
            {/* ─── iOS Nav Bar ─── */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 100,
                background: 'rgba(242,242,247,0.55)',
                backdropFilter: 'blur(28px) saturate(200%) brightness(1.05)',
                WebkitBackdropFilter: 'blur(28px) saturate(200%) brightness(1.05)',
                borderBottom: `0.5px solid rgba(255,255,255,0.35)`,
                borderRadius: '0 0 20px 20px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1)',
                padding: '12px 16px',
            }}>
                <div style={{ maxWidth: '640px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <Link href="/child" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: ios.blue, textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500 }}>
                            <ArrowLeft size={18} /> Trang chủ
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <LangToggle />
                            <div style={{
                                display: 'flex', background: 'rgba(255,255,255,0.3)',
                                backdropFilter: 'blur(16px) contrast(1.1)',
                                WebkitBackdropFilter: 'blur(16px) contrast(1.1)',
                                borderRadius: '10px',
                                border: `1px solid rgba(255,255,255,0.4)`,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
                                overflow: 'hidden',
                            }}>
                                {(['6-10', '11+'] as AgeGroup[]).map(age => (
                                    <button key={age} onClick={() => setAgeFilter(age)} style={{
                                        border: 'none', padding: '5px 12px', fontSize: '0.8rem', fontWeight: 600,
                                        fontFamily: ios.font, cursor: 'pointer',
                                        background: ageFilter === age ? ios.blue : 'transparent',
                                        color: ageFilter === age ? '#fff' : ios.secondary,
                                        transition: 'all 0.2s',
                                    }}>
                                        {age === '6-10' ? '6-10 tuổi' : '11+ tuổi'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: ios.text, letterSpacing: '-0.02em', margin: 0 }}>
                        {t('elite_page_title')}
                    </h1>
                </div>
            </div>

            {/* ─── Main Content ─── */}
            <div style={{ maxWidth: '640px', margin: '0 auto', padding: '12px 16px 32px' }}>
                {/* Tab Bar — iOS Segmented Control style */}
                <div style={{
                    display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '12px',
                    WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none',
                }}>
                    {TAB_CONFIG.map((tab) => (
                        <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                            display: 'flex', alignItems: 'center', gap: '5px',
                            padding: '8px 14px', borderRadius: '20px', border: 'none',
                            background: activeTab === tab.key ? tab.color : 'rgba(255,255,255,0.4)',
                            backdropFilter: 'blur(12px) saturate(150%)',
                            WebkitBackdropFilter: 'blur(12px) saturate(150%)',
                            color: activeTab === tab.key ? '#fff' : ios.secondary,
                            fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            fontFamily: ios.font,
                            boxShadow: activeTab === tab.key
                                ? `0 4px 16px ${tab.color}40, inset 0 1px 0 rgba(255,255,255,0.3)`
                                : '0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
                        }}>
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* ═══════ OVERVIEW ═══════ */}
                {activeTab === 'overview' && (
                    <div style={cardStyle}>
                        <h2 style={{ fontWeight: 700, fontSize: '1.15rem', color: ios.text, marginBottom: '16px', fontFamily: ios.font }}>{t('metrics_title')}</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {metricLabels.map((m) => (
                                <div key={m.key}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                        <span style={{ fontWeight: 500, fontSize: '0.9rem', color: ios.text, fontFamily: ios.font }}>{m.label}</span>
                                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: m.color, fontFamily: ios.font }}>{metrics[m.key]}</span>
                                    </div>
                                    <div style={{ background: ios.surface, borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                                        <div style={{ width: `${metrics[m.key]}%`, background: m.color, height: '100%', borderRadius: '4px', transition: 'width 0.5s ease' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ═══════ PROBABILITY ═══════ */}
                {activeTab === 'probability' && probIndex < probScenarios.length && (
                    <div style={cardStyle}>
                        <ProgressPill current={probIndex + 1} total={probScenarios.length} score={probScore} color={ios.blue} />
                        <div style={{ textAlign: 'center', fontSize: '3.5rem', marginBottom: '8px' }}>{probScenarios[probIndex].visual}</div>
                        <p style={{ fontWeight: 600, fontSize: '1.05rem', textAlign: 'center', color: ios.text, marginBottom: '16px', lineHeight: 1.5, fontFamily: ios.font }}>
                            {probScenarios[probIndex].question}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {probScenarios[probIndex].options.map((opt) => {
                                const isCorrect = probAnswer && opt === probScenarios[probIndex].correctAnswer;
                                const isWrong = probAnswer === opt && opt !== probScenarios[probIndex].correctAnswer;
                                return (
                                    <button key={opt}
                                        onClick={() => { if (probAnswer) return; setProbAnswer(opt); if (opt === probScenarios[probIndex].correctAnswer) setProbScore(s => s + 20); }}
                                        style={btnOption(!!probAnswer, isCorrect || false, isWrong || false)}
                                    >
                                        {likelihoodLabel[opt]}
                                    </button>
                                );
                            })}
                        </div>
                        {probAnswer && (
                            <FeedbackCard
                                correct={probAnswer === probScenarios[probIndex].correctAnswer}
                                explanation={probScenarios[probIndex].explanation}
                                onNext={() => { setProbAnswer(null); setProbIndex(i => i + 1); }}
                            />
                        )}
                    </div>
                )}
                {activeTab === 'probability' && probIndex >= probScenarios.length && (
                    <CompletionCard emoji="🎯" title="Hoàn thành Xác suất!" score={probScore} total={100} onReplay={() => { setProbIndex(0); setProbScore(0); setProbAnswer(null); }} />
                )}

                {/* ═══════ FINANCE ═══════ */}
                {activeTab === 'finance' && wvnIndex < currentWvn.length && (
                    <div style={cardStyle}>
                        <ProgressPill current={wvnIndex + 1} total={currentWvn.length} score={wvnScore} color={ios.orange} />
                        <div style={{ textAlign: 'center', fontSize: '4rem', marginBottom: '8px' }}>{currentWvn[wvnIndex].visual}</div>
                        <p style={{ fontWeight: 700, textAlign: 'center', fontSize: '1.15rem', color: ios.text, marginBottom: '20px', fontFamily: ios.font }}>
                            {currentWvn[wvnIndex].name}
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {(['want', 'need'] as const).map(opt => {
                                const isCorrect = wvnAnswer && opt === currentWvn[wvnIndex].correctCategory;
                                const isWrong = wvnAnswer === opt && opt !== currentWvn[wvnIndex].correctCategory;
                                return (
                                    <button key={opt}
                                        onClick={() => { if (wvnAnswer) return; setWvnAnswer(opt); if (opt === currentWvn[wvnIndex].correctCategory) setWvnScore(s => s + 12); }}
                                        style={{
                                            flex: 1, padding: '16px 12px', borderRadius: '12px', border: 'none',
                                            background: isCorrect ? '#F0FFF4' : isWrong ? '#FFF5F5' : ios.surface,
                                            outline: isCorrect ? `2px solid ${ios.green}` : isWrong ? `2px solid ${ios.red}` : 'none',
                                            cursor: wvnAnswer ? 'default' : 'pointer', fontFamily: ios.font,
                                            fontSize: '1rem', fontWeight: 700, color: ios.text,
                                            transition: 'all 0.15s',
                                            boxShadow: wvnAnswer ? 'none' : ios.shadow,
                                        }}
                                    >
                                        {opt === 'want' ? '💎 Muốn' : '🏠 Cần'}
                                    </button>
                                );
                            })}
                        </div>
                        {wvnAnswer && (
                            <FeedbackCard
                                correct={wvnAnswer === currentWvn[wvnIndex].correctCategory}
                                explanation={currentWvn[wvnIndex].explanation}
                                onNext={() => { setWvnAnswer(null); setWvnIndex(i => i + 1); }}
                            />
                        )}
                    </div>
                )}
                {activeTab === 'finance' && wvnIndex >= currentWvn.length && (
                    <CompletionCard emoji="💰" title="Hoàn thành Tài chính!" score={wvnScore} total={currentWvn.length * 12} onReplay={() => { setWvnIndex(0); setWvnScore(0); setWvnAnswer(null); }} />
                )}

                {/* ═══════ CIVICS ═══════ */}
                {activeTab === 'civics' && policyIndex < currentPol.length && (
                    <div style={cardStyle}>
                        <ProgressPill current={policyIndex + 1} total={currentPol.length} color={ios.green} />
                        <div style={{ textAlign: 'center', fontSize: '3.5rem', marginBottom: '8px' }}>{currentPol[policyIndex].visual}</div>
                        <p style={{ fontWeight: 600, fontSize: '1.05rem', textAlign: 'center', color: ios.text, marginBottom: '20px', lineHeight: 1.5, fontFamily: ios.font }}>
                            {currentPol[policyIndex].situation}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {currentPol[policyIndex].options.map((opt, idx) => (
                                <button key={idx} onClick={() => setPolicyChoice(idx)} style={{
                                    textAlign: 'left', padding: '14px 16px', borderRadius: '12px',
                                    border: policyChoice === idx ? `2px solid ${ios.green}` : `1px solid ${ios.border}`,
                                    background: policyChoice === idx ? '#F0FFF4' : '#fff',
                                    cursor: 'pointer', fontFamily: ios.font, transition: 'all 0.15s',
                                    boxShadow: policyChoice === idx ? 'none' : '0 1px 2px rgba(0,0,0,0.04)',
                                }}>
                                    <p style={{ fontWeight: 600, fontSize: '0.95rem', color: ios.text, marginBottom: policyChoice === idx ? '10px' : 0 }}>{opt.text}</p>
                                    {policyChoice === idx && (
                                        <div style={{ paddingTop: '10px', borderTop: `1px solid ${ios.border}` }}>
                                            <p style={{ fontSize: '0.85rem', color: ios.secondary, marginBottom: '8px', lineHeight: 1.5 }}>{opt.consequence}</p>
                                            <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem' }}>
                                                <span style={{ color: ios.text }}>Công bằng: <strong style={{ color: opt.fairnessScore > 60 ? ios.green : ios.red }}>{opt.fairnessScore}%</strong></span>
                                                <span style={{ color: ios.text }}>Hạnh phúc: <strong style={{ color: opt.happinessScore > 60 ? ios.green : ios.red }}>{opt.happinessScore}%</strong></span>
                                            </div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                        {policyChoice !== null && (
                            <div style={{ marginTop: '16px', textAlign: 'center' }}>
                                <button style={btnPrimary(ios.green)} onClick={() => { setPolicyChoice(null); setPolicyIndex(i => i + 1); }}>
                                    Câu tiếp theo <ChevronRight size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                )}
                {activeTab === 'civics' && policyIndex >= currentPol.length && (
                    <CompletionCard emoji="⚖️" title="Hoàn thành Công dân!" score={0} total={0} onReplay={() => { setPolicyIndex(0); setPolicyChoice(null); }} />
                )}

                {/* ═══════ ETHICS ═══════ */}
                {activeTab === 'ethics' && cocIndex < currentCoc.length && (
                    <div style={cardStyle}>
                        <ProgressPill current={cocIndex + 1} total={currentCoc.length} score={cocScore} color={ios.indigo} />
                        <div style={{ textAlign: 'center', fontSize: '4rem', marginBottom: '8px' }}>{currentCoc[cocIndex].visual}</div>
                        <p style={{ fontWeight: 600, fontSize: '1.05rem', textAlign: 'center', color: ios.text, marginBottom: '20px', lineHeight: 1.5, fontFamily: ios.font }}>
                            {currentCoc[cocIndex].situation}
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {(['controllable', 'uncontrollable'] as const).map(opt => {
                                const isCorrect = cocAnswer && opt === currentCoc[cocIndex].correctCategory;
                                const isWrong = cocAnswer === opt && opt !== currentCoc[cocIndex].correctCategory;
                                return (
                                    <button key={opt}
                                        onClick={() => { if (cocAnswer) return; setCocAnswer(opt); if (opt === currentCoc[cocIndex].correctCategory) setCocScore(s => s + 16); }}
                                        style={{
                                            flex: 1, padding: '16px 12px', borderRadius: '12px', border: 'none',
                                            background: isCorrect ? '#F0FFF4' : isWrong ? '#FFF5F5' : ios.surface,
                                            outline: isCorrect ? `2px solid ${ios.green}` : isWrong ? `2px solid ${ios.red}` : 'none',
                                            cursor: cocAnswer ? 'default' : 'pointer', fontFamily: ios.font,
                                            fontSize: '0.9rem', fontWeight: 700, color: ios.text,
                                            transition: 'all 0.15s', boxShadow: cocAnswer ? 'none' : ios.shadow,
                                        }}
                                    >
                                        {opt === 'controllable' ? '🎯 Mình quyết' : '🌧️ Trời quyết'}
                                    </button>
                                );
                            })}
                        </div>
                        {cocAnswer && (
                            <FeedbackCard
                                correct={cocAnswer === currentCoc[cocIndex].correctCategory}
                                explanation={currentCoc[cocIndex].explanation}
                                onNext={() => { setCocAnswer(null); setCocIndex(i => i + 1); }}
                            />
                        )}
                    </div>
                )}
                {activeTab === 'ethics' && cocIndex >= currentCoc.length && (
                    <CompletionCard emoji="🛡️" title="Hoàn thành Đạo đức!" score={cocScore} total={currentCoc.length * 16} onReplay={() => { setCocIndex(0); setCocScore(0); setCocAnswer(null); }} />
                )}

                {/* ═══════ NEGOTIATION ═══════ */}
                {activeTab === 'negotiation' && negIndex < currentNeg.length && (
                    <div style={cardStyle}>
                        <ProgressPill current={negIndex + 1} total={currentNeg.length} score={negScore} color={ios.red} />
                        <div style={{ textAlign: 'center', fontSize: '4rem', marginBottom: '12px' }}>{currentNeg[negIndex].visual}</div>

                        {/* Scenario briefing */}
                        <div style={{
                            padding: '16px', borderRadius: '12px', marginBottom: '20px',
                            background: '#FFF5F5', border: `1px solid #FED7D7`,
                        }}>
                            <p style={{ fontWeight: 600, fontSize: '1rem', color: ios.text, marginBottom: '8px', lineHeight: 1.5, fontFamily: ios.font }}>
                                {currentNeg[negIndex].scenario}
                            </p>
                            <p style={{ fontSize: '0.82rem', color: ios.secondary, fontFamily: ios.font }}>Đối phương: {currentNeg[negIndex].aiPersonality}</p>
                            <p style={{ fontSize: '0.82rem', color: ios.secondary, fontFamily: ios.font }}>Mục tiêu: {currentNeg[negIndex].targetOutcome}</p>
                        </div>

                        <p style={{ fontWeight: 600, fontSize: '0.85rem', color: ios.muted, textAlign: 'center', marginBottom: '12px', fontFamily: ios.font }}>
                            Chọn cách xử lý
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {/* Zero-sum option */}
                            <button
                                onClick={() => { if (negAnswer) return; setNegAnswer('lose'); }}
                                style={{
                                    ...btnOption(!!negAnswer, false, negAnswer === 'lose'),
                                    borderColor: negAnswer === 'lose' ? ios.red : ios.border,
                                }}
                            >
                                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: ios.red, marginBottom: '4px', letterSpacing: '0.02em' }}>ÉP BUỘC</p>
                                <p style={{ fontSize: '0.95rem', color: ios.text }}>{currentNeg[negIndex].sampleRequest}</p>
                            </button>
                            {/* Win-win option */}
                            <button
                                onClick={() => { if (negAnswer) return; setNegAnswer('win'); setNegScore(s => s + 20); }}
                                style={{
                                    ...btnOption(!!negAnswer, negAnswer === 'win', false),
                                    borderColor: negAnswer === 'win' ? ios.green : ios.border,
                                }}
                            >
                                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: ios.green, marginBottom: '4px', letterSpacing: '0.02em' }}>HỢP TÁC</p>
                                <p style={{ fontSize: '0.95rem', color: ios.text }}>{currentNeg[negIndex].sampleWinWin}</p>
                            </button>
                        </div>
                        {negAnswer && (
                            <FeedbackCard
                                correct={negAnswer === 'win'}
                                explanation={currentNeg[negIndex].winWinCriteria}
                                onNext={() => { setNegAnswer(null); setNegIndex(i => i + 1); }}
                            />
                        )}
                    </div>
                )}
                {activeTab === 'negotiation' && negIndex >= currentNeg.length && (
                    <CompletionCard emoji="🤝" title="Hoàn thành Thương lượng!" score={negScore} total={currentNeg.length * 20} onReplay={() => { setNegIndex(0); setNegScore(0); setNegAnswer(null); }} />
                )}
            </div>
        </div>
    );
}
