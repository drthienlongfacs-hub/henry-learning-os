'use client';

import { useAppStore } from '@/stores/app-store';
import { useTranslation } from '@/lib/i18n';
import { LangToggle } from '@/components/LangToggle';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, BookOpen, RotateCcw, Home, Brain, Sparkles } from 'lucide-react';

export default function MistakesPage() {
    const { mistakes, resolveMistake, competencies } = useAppStore();
    const { t } = useTranslation();
    const unresolved = mistakes.filter((m) => !m.resolvedAt);
    const resolved = mistakes.filter((m) => m.resolvedAt);

    const errLabel = (type: string) => t(`err_${type}`) !== `err_${type}` ? t(`err_${type}`) : t('err_unknown');
    const errEmoji: Record<string, string> = {
        concept: '🧠', procedure: '📋', calculation: '🔢', reading: '📖',
        vocabulary: '💬', attention: '👀', strategy: '🎯', unknown: '❓',
    };
    const errColor: Record<string, string> = {
        concept: '#ef4444', procedure: '#f97316', calculation: '#eab308', reading: '#6366f1',
        vocabulary: '#8b5cf6', attention: '#ec4899', strategy: '#14b8a6', unknown: '#94a3b8',
    };

    return (
        <div style={{ paddingBottom: '5rem', minHeight: '100dvh', background: 'linear-gradient(180deg, #eef2ff 0%, #f0f4ff 40%, #faf5ff 100%)' }}>
            <div className="page-container">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Link href="/child"><button className="btn btn-ghost btn-sm"><ArrowLeft size={18} /></button></Link>
                        <h1 style={{ fontWeight: 800, fontSize: '1.5rem' }}>{t('mistakes_title')}</h1>
                        <span className="badge badge-warning">{unresolved.length} {t('mistakes_unfixed')}</span>
                    </div>
                    <LangToggle />
                </div>

                {unresolved.length === 0 && (
                    <div className="card animate-fade-in" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
                        <p style={{ fontWeight: 600 }}>{t('mistakes_empty_title')}</p>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{t('mistakes_empty_sub')}</p>
                    </div>
                )}

                {unresolved.map((mistake, idx) => {
                    const emoji = errEmoji[mistake.errorType] || '❓';
                    const color = errColor[mistake.errorType] || '#94a3b8';
                    const comp = competencies.find((c) => c.id === mistake.competencyId);
                    return (
                        <div key={mistake.id} className="card animate-fade-in" style={{ marginBottom: '0.75rem', animationDelay: `${idx * 0.05}s` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '1.25rem' }}>{emoji}</span>
                                    <span className="badge" style={{ background: `${color}15`, color }}>{errLabel(mistake.errorType)}</span>
                                </div>
                                <button className="btn btn-success btn-sm" onClick={() => resolveMistake(mistake.id)}>
                                    <CheckCircle size={14} /> {t('mistakes_fixed_btn')}
                                </button>
                            </div>
                            {comp && <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{comp.title}</div>}
                            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>{mistake.explanation}</p>
                            <div style={{ background: 'var(--color-bg-child)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                                <p style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>{t('mistakes_fix_plan')}</p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{mistake.correctionPlan}</p>
                            </div>
                        </div>
                    );
                })}

                {resolved.length > 0 && (
                    <>
                        <h2 style={{ fontWeight: 700, fontSize: '1.1rem', margin: '2rem 0 1rem', color: 'var(--color-text-secondary)' }}>
                            {t('mistakes_resolved')} ({resolved.length})
                        </h2>
                        {resolved.slice(0, 5).map((mistake) => {
                            const emoji = errEmoji[mistake.errorType] || '❓';
                            return (
                                <div key={mistake.id} className="card" style={{ marginBottom: '0.5rem', opacity: 0.6 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <CheckCircle size={16} color="var(--color-success)" />
                                        <span style={{ fontSize: '0.85rem' }}>{errLabel(mistake.errorType)}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginLeft: 'auto' }}>{emoji}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>

            <nav className="bottom-nav">
                <Link href="/child" className="nav-item"><Home size={20} /><span>{t('nav_home')}</span></Link>
                <Link href="/child/learn" className="nav-item"><BookOpen size={20} /><span>Học</span></Link>
                <Link href="/child/review" className="nav-item"><RotateCcw size={20} /><span>{t('nav_review')}</span></Link>
                <Link href="/child/mistakes" className="nav-item active"><Brain size={20} /><span>{t('nav_mistakes')}</span></Link>
                <Link href="/child/elite" className="nav-item"><Sparkles size={20} /><span>{t('nav_elite')}</span></Link>
            </nav>
        </div>
    );
}
