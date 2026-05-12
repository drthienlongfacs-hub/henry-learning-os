'use client';

import { useEffect } from 'react';

/**
 * PWARegister — Registers the service worker on mount.
 * Also handles the install prompt for "Add to Home Screen".
 */
export function PWARegister() {
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!('serviceWorker' in navigator)) return;

        // Register service worker
        navigator.serviceWorker
            .register('/henry-learning-os/sw.js')
            .then((reg) => {
                console.log('[PWA] Service Worker registered, scope:', reg.scope);
            })
            .catch((err) => {
                console.warn('[PWA] Service Worker registration failed:', err);
            });

        // Listen for install prompt (for "Add to Home Screen" button in future)
        const handleBeforeInstall = (e: Event) => {
            e.preventDefault();
            // Store the event for later use
            (window as unknown as Record<string, unknown>).__pwaInstallPrompt = e;
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstall);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
        };
    }, []);

    return null; // No UI — just registers the service worker
}
