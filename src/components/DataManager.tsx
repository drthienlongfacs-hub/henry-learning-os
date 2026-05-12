'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Upload, Shield, Database, RefreshCw, CheckCircle, AlertTriangle, HardDrive } from 'lucide-react';
import { downloadExport, importFromFile, type ImportResult } from '@/lib/data/export-import';
import { checkDataHealth, applyRetentionPolicy, type DataHealthReport } from '@/lib/data/data-service';

export function DataManager() {
    const [health, setHealth] = useState<DataHealthReport | null>(null);
    const [isExporting, setIsExporting] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [isCleaning, setIsCleaning] = useState(false);
    const [importResult, setImportResult] = useState<ImportResult | null>(null);
    const [showImportResult, setShowImportResult] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const refreshHealth = useCallback(async () => {
        try {
            const report = await checkDataHealth();
            setHealth(report);
        } catch {
            setHealth(null);
        }
    }, []);

    // Load health on mount — use a ref to avoid the set-state-in-effect warning
    const didMountRef = useRef(false);
    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true;
            checkDataHealth().then(setHealth).catch(() => setHealth(null));
        }
    }, []);

    const handleExport = async () => {
        setIsExporting(true);
        try {
            await downloadExport();
        } catch (err) {
            console.error('Export failed:', err);
        }
        setIsExporting(false);
    };

    const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsImporting(true);
        setShowImportResult(false);
        try {
            const result = await importFromFile(file);
            setImportResult(result);
            setShowImportResult(true);
            if (result.success) {
                await refreshHealth();
                // Reload to pick up new state
                setTimeout(() => window.location.reload(), 2000);
            }
        } catch {
            setImportResult({ success: false, message: 'Lỗi không xác định khi nhập dữ liệu.' });
            setShowImportResult(true);
        }
        setIsImporting(false);
        // Reset file input
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleCleanup = async () => {
        setIsCleaning(true);
        try {
            const deleted = await applyRetentionPolicy(90);
            alert(`Đã dọn dẹp ${deleted} sự kiện cũ hơn 90 ngày.`);
            await refreshHealth();
        } catch {
            alert('Lỗi khi dọn dẹp dữ liệu.');
        }
        setIsCleaning(false);
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08))',
            borderRadius: '1.5rem',
            padding: '2rem',
            border: '1px solid rgba(99,102,241,0.15)',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <Database style={{ width: 24, height: 24, color: '#6366f1' }} />
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#1e1b4b' }}>
                    Quản lý Dữ liệu Học tập
                </h3>
            </div>

            {/* Health Status */}
            {health && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '0.75rem',
                    marginBottom: '1.5rem',
                }}>
                    <HealthCard
                        icon={<HardDrive size={18} />}
                        label="IndexedDB"
                        value={health.indexedDBAvailable ? 'Hoạt động' : 'Không khả dụng'}
                        color={health.indexedDBAvailable ? '#10b981' : '#ef4444'}
                    />
                    <HealthCard
                        icon={<Database size={18} />}
                        label="Sự kiện"
                        value={health.eventCount.toLocaleString()}
                        color="#6366f1"
                    />
                    <HealthCard
                        icon={<Shield size={18} />}
                        label="Bản sao lưu"
                        value={`${health.backupCount} / 5`}
                        color={health.backupCount > 0 ? '#10b981' : '#f59e0b'}
                    />
                    <HealthCard
                        icon={<CheckCircle size={18} />}
                        label="Schema"
                        value={health.stateSchemaVersion ? `v${health.stateSchemaVersion}` : 'N/A'}
                        color="#6366f1"
                    />
                </div>
            )}

            {/* Issues */}
            {health?.issues && health.issues.length > 0 && (
                <div style={{
                    background: 'rgba(245,158,11,0.1)',
                    border: '1px solid rgba(245,158,11,0.3)',
                    borderRadius: '1rem',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                }}>
                    {health.issues.map((issue, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#92400e', fontSize: '0.85rem' }}>
                            <AlertTriangle size={14} /> {issue}
                        </div>
                    ))}
                </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <ActionButton
                    icon={<Download size={18} />}
                    label="Xuất dữ liệu"
                    sublabel="Backup JSON"
                    onClick={handleExport}
                    loading={isExporting}
                    color="#10b981"
                />

                <ActionButton
                    icon={<Upload size={18} />}
                    label="Nhập dữ liệu"
                    sublabel="Khôi phục backup"
                    onClick={() => fileInputRef.current?.click()}
                    loading={isImporting}
                    color="#6366f1"
                />

                <ActionButton
                    icon={<RefreshCw size={18} />}
                    label="Dọn dẹp"
                    sublabel="Xóa > 90 ngày"
                    onClick={handleCleanup}
                    loading={isCleaning}
                    color="#f59e0b"
                />
            </div>

            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: 'none' }}
            />

            {/* Import result toast */}
            <AnimatePresence>
                {showImportResult && importResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            marginTop: '1rem',
                            padding: '1rem',
                            borderRadius: '1rem',
                            background: importResult.success ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                            border: `1px solid ${importResult.success ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
                            color: importResult.success ? '#065f46' : '#991b1b',
                            fontSize: '0.9rem',
                        }}
                    >
                        {importResult.success ? '✅' : '❌'} {importResult.message}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function HealthCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
    return (
        <div style={{
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '1rem',
            padding: '0.75rem 1rem',
            textAlign: 'center',
            border: '1px solid rgba(0,0,0,0.05)',
        }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.25rem', color }}>{icon}</div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color }}>{value}</div>
        </div>
    );
}

function ActionButton({ icon, label, sublabel, onClick, loading, color }: {
    icon: React.ReactNode;
    label: string;
    sublabel: string;
    onClick: () => void;
    loading: boolean;
    color: string;
}) {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            disabled={loading}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '1rem',
                border: 'none',
                background: `linear-gradient(135deg, ${color}15, ${color}25)`,
                color: color,
                cursor: loading ? 'wait' : 'pointer',
                opacity: loading ? 0.6 : 1,
                fontWeight: 600,
                fontSize: '0.85rem',
                transition: 'all 0.2s',
            }}
        >
            {loading ? <RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} /> : icon}
            <div style={{ textAlign: 'left' }}>
                <div>{label}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.7, fontWeight: 400 }}>{sublabel}</div>
            </div>
        </motion.button>
    );
}
