'use client';

import { useHenryVoiceEngine } from '@/hooks/useHenryVoiceEngine';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';

export function VoiceEngineBadge({ lang, preload = true }: { lang: string; preload?: boolean }) {
    const snapshot = useHenryVoiceEngine({ preload });
    const ready = snapshot.state === 'ready';
    const loading = snapshot.state === 'loading';
    const error = snapshot.state === 'error';

    // Extraneous Load Elimination:
    // Render clean, unobtrusive audio status icon instead of developer telemetry text
    return (
        <span
            title={ready ? 'Giọng đọc chuẩn' : loading ? 'Đang tải âm thanh...' : 'Âm thanh máy'}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: ready ? 'rgba(16,185,129,0.1)' : error ? 'rgba(239,68,68,0.1)' : 'rgba(99,102,241,0.1)',
                border: `1px solid ${ready ? 'rgba(16,185,129,0.2)' : error ? 'rgba(239,68,68,0.2)' : 'rgba(99,102,241,0.2)'}`,
                color: ready ? '#059669' : error ? '#dc2626' : '#4f46e5',
            }}
        >
            {loading ? (
                <Loader2 size={13} className="animate-spin" />
            ) : error ? (
                <VolumeX size={13} />
            ) : (
                <Volume2 size={13} />
            )}
        </span>
    );
}

