'use client';

import React, { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallbackMessage?: string;
}

interface State {
    hasError: boolean;
    error: Error | null;
    isRecovering: boolean;
}

/**
 * DataErrorBoundary — Catches data layer crashes
 * (JSON parse errors, IndexedDB failures, corrupt state).
 *
 * Instead of blank screen, shows a recovery panel
 * with options to clear data and restart.
 */
export class DataErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null, isRecovering: false };
    }

    static getDerivedStateFromError(error: Error): Partial<State> {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('[DataErrorBoundary] Caught error:', error, errorInfo);
    }

    handleClearAndReload = () => {
        this.setState({ isRecovering: true });

        try {
            // Clear localStorage state
            localStorage.removeItem('henry-os-v3');
            localStorage.removeItem('henry-xp-data');
            localStorage.removeItem('henry-os-v2'); // legacy

            // Clear IndexedDB
            if (window.indexedDB) {
                indexedDB.deleteDatabase('henry-learning-db');
            }
        } catch (e) {
            console.warn('Cleanup error:', e);
        }

        // Reload after brief delay
        setTimeout(() => window.location.reload(), 500);
    };

    handleReloadOnly = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: '100dvh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                    fontFamily: "'Inter', 'Nunito', sans-serif",
                    padding: '2rem',
                }}>
                    <div style={{
                        maxWidth: '420px',
                        width: '100%',
                        background: 'white',
                        borderRadius: '1.5rem',
                        padding: '2rem',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                        textAlign: 'center',
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔧</div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '0.5rem' }}>
                            Oops! Có lỗi xảy ra
                        </h2>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                            {this.props.fallbackMessage || 'Dữ liệu học tập bị lỗi. Hãy thử tải lại trang, hoặc xóa dữ liệu cũ để bắt đầu mới.'}
                        </p>

                        {/* Error detail (collapsed) */}
                        <details style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                            <summary style={{ cursor: 'pointer', fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>
                                Chi tiết lỗi
                            </summary>
                            <pre style={{
                                fontSize: '0.7rem',
                                color: '#ef4444',
                                background: '#fef2f2',
                                padding: '0.75rem',
                                borderRadius: '0.5rem',
                                overflow: 'auto',
                                maxHeight: '120px',
                                marginTop: '0.5rem',
                            }}>
                                {this.state.error?.message}
                                {'\n'}
                                {this.state.error?.stack?.slice(0, 300)}
                            </pre>
                        </details>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                            <button
                                onClick={this.handleReloadOnly}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '1rem',
                                    border: '2px solid #6366f1',
                                    background: 'white',
                                    color: '#6366f1',
                                    fontWeight: 700,
                                    fontSize: '0.85rem',
                                    cursor: 'pointer',
                                }}
                            >
                                🔄 Tải lại
                            </button>
                            <button
                                onClick={this.handleClearAndReload}
                                disabled={this.state.isRecovering}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '1rem',
                                    border: 'none',
                                    background: '#ef4444',
                                    color: 'white',
                                    fontWeight: 700,
                                    fontSize: '0.85rem',
                                    cursor: this.state.isRecovering ? 'wait' : 'pointer',
                                    opacity: this.state.isRecovering ? 0.6 : 1,
                                }}
                            >
                                {this.state.isRecovering ? '⏳ Đang xóa...' : '🗑️ Xóa & Bắt đầu mới'}
                            </button>
                        </div>

                        <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                            💡 Tip: Xuất dữ liệu thường xuyên tại Settings → Quản lý dữ liệu
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
