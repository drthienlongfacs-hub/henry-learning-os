'use client';

import { useAppStore } from '@/stores/app-store';
import { useTranslation } from '@/lib/i18n';
import { LangToggle } from '@/components/LangToggle';
import Link from 'next/link';
import { BarChart3, BookOpen, Brain, GraduationCap, Heart, Shield, Star } from 'lucide-react';

export default function Home() {
  const { isOnboarded } = useAppStore();
  const { t } = useTranslation();

  if (isOnboarded) {
    return (
      <div className="page-container" style={{ background: 'var(--color-bg-warm)' }}>
        <div className="page-header" style={{ paddingTop: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌟</div>
              <h1 className="page-title" style={{ fontSize: '2rem' }}>{t('app_title')}</h1>
              <p className="page-subtitle">{t('choose_role')}</p>
            </div>
            <LangToggle />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
          <Link href="/child" style={{ textDecoration: 'none' }}>
            <div className="card card-interactive animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, #818cf8, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Star size={28} color="white" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>{t('child_learn')}</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{t('child_learn_desc')}</div>
              </div>
            </div>
          </Link>

          <Link href="/parent/dashboard" style={{ textDecoration: 'none' }}>
            <div className="card card-interactive animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '1rem', animationDelay: '0.1s' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, #34d399, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={28} color="white" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>{t('parent')}</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{t('parent_desc')}</div>
              </div>
            </div>
          </Link>

          <Link href="/parent/benchmark" style={{ textDecoration: 'none' }}>
            <div className="card card-interactive animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '1rem', animationDelay: '0.2s' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, #2563eb, #0f766e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BarChart3 size={28} color="white" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>Benchmark full-stack</div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>So sánh UI, AI, adaptive và evidence</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100dvh', background: 'linear-gradient(135deg, #ede9fe 0%, #fef3c7 50%, #dbeafe 100%)' }}>
      <div className="page-container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
          <LangToggle />
        </div>
        <div className="animate-fade-in">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📚✨</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#1e293b', lineHeight: 1.2, marginBottom: '1rem' }}>
            {t('app_title')}
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#475569', maxWidth: '500px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            {t('landing_tagline')}<br />
            {t('landing_sub')}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '3rem', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
          {[
            { icon: <Brain size={24} />, label: t('feat_ai_tutor'), color: '#6366f1' },
            { icon: <BookOpen size={24} />, label: t('feat_reading'), color: '#10b981' },
            { icon: <GraduationCap size={24} />, label: t('feat_self_learn'), color: '#f59e0b' },
            { icon: <Shield size={24} />, label: t('feat_safety'), color: '#ef4444' },
          ].map((item, idx) => (
            <div key={idx} className="card animate-fade-in" style={{ textAlign: 'center', padding: '1.25rem 0.75rem', animationDelay: `${0.1 * (idx + 1)}s` }}>
              <div style={{ color: item.color, marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#334155' }}>{item.label}</div>
            </div>
          ))}
        </div>

        <Link href="/parent/onboarding">
          <button className="btn btn-primary btn-lg" style={{ width: '100%', maxWidth: '360px' }}>
            {t('landing_cta')}
          </button>
        </Link>

        <div style={{ marginTop: '1rem' }}>
          <Link href="/parent/benchmark" style={{ color: '#2563eb', fontWeight: 800, fontSize: '0.92rem', textDecoration: 'none' }}>
            Xem benchmark full-stack và evidence gate
          </Link>
        </div>

        <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: '#94a3b8', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
          {t('landing_privacy')}
        </p>
      </div>
    </div>
  );
}
