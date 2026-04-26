'use client';

import { useLangStore } from '@/lib/i18n';
import { Languages } from 'lucide-react';

/**
 * Bilingual toggle button — can be placed anywhere in the app.
 * Persists language choice to localStorage via Zustand.
 */
export function LangToggle({ style }: { style?: React.CSSProperties }) {
    const { lang, toggleLang } = useLangStore();

    return (
        <button
            onClick={toggleLang}
            aria-label={lang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
            style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.45rem 0.9rem', borderRadius: '999px',
                border: '2px solid #8b5cf6',
                background: lang === 'en' ? '#8b5cf6' : 'white',
                color: lang === 'en' ? 'white' : '#8b5cf6',
                fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 2px 8px rgba(139,92,246,0.15)',
                flexShrink: 0,
                ...style,
            }}
        >
            <Languages size={14} />
            {lang === 'vi' ? 'EN 🇬🇧' : 'VN 🇻🇳'}
        </button>
    );
}
