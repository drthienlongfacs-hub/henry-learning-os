'use client';

import { useHenryVoiceEngine } from '@/hooks/useHenryVoiceEngine';

export function VoiceEngineBadge({ lang, preload = true }: { lang: string; preload?: boolean }) {
    const snapshot = useHenryVoiceEngine({ preload });
    const vi = lang === 'vi';
    const ready = snapshot.state === 'ready';
    const loading = snapshot.state === 'loading';
    const error = snapshot.state === 'error';
    const label = ready
        ? (vi ? 'Kokoro neural sẵn sàng' : 'Kokoro neural ready')
        : loading
            ? (vi ? 'Đang nạp Kokoro' : 'Loading Kokoro')
            : error
                ? (vi ? 'Fallback hệ thống' : 'System fallback')
                : (vi ? 'Neural chờ nạp' : 'Neural idle');
    const detail = snapshot.progressPct !== null && loading
        ? `${label} ${snapshot.progressPct}%`
        : label;

    return (
        <span
            title={`${snapshot.detail}${snapshot.error ? ` (${snapshot.error})` : ''}`}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                minHeight: 28,
                padding: '5px 9px',
                borderRadius: '999px',
                border: `1px solid ${ready ? '#86efac' : error ? '#fecaca' : '#c7d2fe'}`,
                background: ready ? '#f0fdf4' : error ? '#fef2f2' : '#eef2ff',
                color: ready ? '#166534' : error ? '#b91c1c' : '#3730a3',
                fontSize: '0.56rem',
                fontWeight: 800,
                whiteSpace: 'nowrap',
            }}
        >
            {detail}
        </span>
    );
}
