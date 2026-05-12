'use client';

import React from 'react';

/**
 * Skeleton — Animated loading placeholder.
 * Use in place of content while data is loading.
 */
export function Skeleton({ width, height, radius = '0.75rem', style }: {
    width?: string;
    height?: string;
    radius?: string;
    style?: React.CSSProperties;
}) {
    return (
        <div
            style={{
                width: width || '100%',
                height: height || '1rem',
                borderRadius: radius,
                background: 'linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s ease-in-out infinite',
                ...style,
            }}
        />
    );
}

/**
 * SkeletonCard — Full card-shaped loading placeholder.
 */
export function SkeletonCard({ lines = 3 }: { lines?: number }) {
    return (
        <div style={{
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '1.25rem',
            padding: '1.25rem',
            border: '1px solid rgba(0,0,0,0.05)',
        }}>
            <Skeleton width="40%" height="1.25rem" style={{ marginBottom: '0.75rem' }} />
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    width={i === lines - 1 ? '60%' : '100%'}
                    height="0.85rem"
                    style={{ marginBottom: '0.5rem' }}
                />
            ))}
        </div>
    );
}

/**
 * SkeletonGrid — Grid of skeleton cards for dashboard loading.
 */
export function SkeletonGrid({ cards = 4, columns = 2 }: { cards?: number; columns?: number }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: '0.75rem',
        }}>
            {Array.from({ length: cards }).map((_, i) => (
                <SkeletonCard key={i} lines={2} />
            ))}
        </div>
    );
}

/**
 * SkeletonPage — Full page skeleton with header + content.
 */
export function SkeletonPage() {
    return (
        <div style={{ padding: '1.5rem', maxWidth: '640px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <Skeleton width="2rem" height="2rem" radius="50%" />
                <Skeleton width="200px" height="1.5rem" />
            </div>

            {/* Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {[1, 2, 3].map(i => (
                    <div key={i} style={{
                        background: 'rgba(255,255,255,0.8)',
                        borderRadius: '1rem',
                        padding: '1rem',
                        textAlign: 'center',
                    }}>
                        <Skeleton width="60%" height="1.5rem" style={{ margin: '0 auto 0.5rem' }} />
                        <Skeleton width="80%" height="0.75rem" style={{ margin: '0 auto' }} />
                    </div>
                ))}
            </div>

            {/* Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <SkeletonCard lines={3} />
                <SkeletonCard lines={2} />
                <SkeletonCard lines={4} />
            </div>
        </div>
    );
}
