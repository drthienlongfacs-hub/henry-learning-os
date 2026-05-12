'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Download, X } from 'lucide-react';

/**
 * OfflineBanner — Shows when user loses connection.
 * Styled non-intrusively at the top of the screen.
 */
export function OfflineBanner() {
    const [isOffline, setIsOffline] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        const goOffline = () => setIsOffline(true);
        const goOnline = () => { setIsOffline(false); setDismissed(false); };

        setIsOffline(!navigator.onLine);
        window.addEventListener('offline', goOffline);
        window.addEventListener('online', goOnline);

        return () => {
            window.removeEventListener('offline', goOffline);
            window.removeEventListener('online', goOnline);
        };
    }, []);

    if (!isOffline || dismissed) return null;

    return (
        <div
            role="alert"
            aria-live="polite"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 9999,
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: 'white',
                padding: '0.5rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                fontFamily: "'Inter', 'Nunito', sans-serif",
                boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            }}
        >
            <WifiOff size={16} />
            <span>Không có kết nối mạng — dữ liệu đã lưu vẫn truy cập được</span>
            <button
                onClick={() => setDismissed(true)}
                aria-label="Đóng thông báo"
                style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    marginLeft: '0.5rem',
                }}
            >
                <X size={14} />
            </button>
        </div>
    );
}

/**
 * InstallPrompt — Shows "Add to Home Screen" banner.
 * Only appears when the browser supports PWA install.
 */
export function InstallPrompt() {
    const [showPrompt, setShowPrompt] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Check if already installed
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        if (isStandalone) return;

        // Check if user already dismissed
        const wasDismissed = localStorage.getItem('henry-pwa-dismissed');
        if (wasDismissed) return;

        const timer = setTimeout(() => {
            const prompt = (window as unknown as Record<string, unknown>).__pwaInstallPrompt;
            if (prompt) {
                setShowPrompt(true);
            }
        }, 3000); // Show after 3s if install prompt available

        const handleInstallPrompt = () => {
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handleInstallPrompt);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
        };
    }, []);

    const handleInstall = async () => {
        const prompt = (window as unknown as Record<string, unknown>).__pwaInstallPrompt as { prompt: () => Promise<void> } | undefined;
        if (prompt) {
            await prompt.prompt();
        }
        setShowPrompt(false);
    };

    const handleDismiss = () => {
        setDismissed(true);
        setShowPrompt(false);
        try { localStorage.setItem('henry-pwa-dismissed', 'true'); } catch {}
    };

    if (!showPrompt || dismissed) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '1rem',
            left: '1rem',
            right: '1rem',
            zIndex: 9998,
            maxWidth: '420px',
            margin: '0 auto',
        }}>
            <div style={{
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '1.25rem',
                padding: '1rem 1.25rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                border: '1px solid rgba(99,102,241,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
            }}>
                <div style={{
                    width: 44, height: 44,
                    borderRadius: '0.75rem',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}>
                    <Download size={20} color="white" />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e1b4b' }}>
                        Cài HenryOS lên màn hình
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                        Mở nhanh hơn, học offline được
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                    <button
                        onClick={handleDismiss}
                        style={{
                            padding: '0.4rem 0.75rem',
                            borderRadius: '0.75rem',
                            border: '1px solid #e2e8f0',
                            background: 'white',
                            color: '#64748b',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                    >
                        Để sau
                    </button>
                    <button
                        onClick={handleInstall}
                        style={{
                            padding: '0.4rem 0.75rem',
                            borderRadius: '0.75rem',
                            border: 'none',
                            background: '#6366f1',
                            color: 'white',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                    >
                        Cài ngay
                    </button>
                </div>
            </div>
        </div>
    );
}

/**
 * ConnectionStatus — Small indicator showing connection state.
 * Used in parent dashboard header.
 */
export function ConnectionStatus() {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        setIsOnline(navigator.onLine);
        const on = () => setIsOnline(true);
        const off = () => setIsOnline(false);
        window.addEventListener('online', on);
        window.addEventListener('offline', off);
        return () => {
            window.removeEventListener('online', on);
            window.removeEventListener('offline', off);
        };
    }, []);

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.72rem',
            color: isOnline ? '#10b981' : '#f59e0b',
            fontWeight: 600,
        }}>
            {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
            {isOnline ? 'Online' : 'Offline'}
        </div>
    );
}
