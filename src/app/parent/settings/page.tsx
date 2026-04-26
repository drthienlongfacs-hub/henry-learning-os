'use client';

import { useAppStore } from '@/stores/app-store';
import Link from 'next/link';
import { ArrowLeft, Shield, Eye, Clock, ExternalLink, Lock } from 'lucide-react';

export default function SettingsPage() {
    const { childProfile, aiInteractionLogs, safetyEvents } = useAppStore();

    const safetyLevelLabels: Record<string, string> = {
        under_13: 'Dưới 13 tuổi — Bảo vệ tối đa',
        teen_13_15: '13-15 tuổi — Hướng dẫn',
        teen_16_18: '16-18 tuổi — Tự chủ hơn',
    };

    return (
        <div style={{ minHeight: '100dvh', background: 'var(--color-bg-parent)', fontFamily: 'var(--font-parent)' }}>
            <div className="page-container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                    <Link href="/parent/dashboard"><button className="btn btn-ghost btn-sm"><ArrowLeft size={18} /></button></Link>
                    <h1 style={{ fontWeight: 800, fontSize: '1.5rem' }}>Cài đặt an toàn</h1>
                </div>

                {/* Current safety level */}
                <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--color-success)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Shield size={18} color="var(--color-success)" />
                        <span style={{ fontWeight: 700 }}>Chế độ an toàn hiện tại</span>
                    </div>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                        {childProfile ? safetyLevelLabels[childProfile.safetyLevel] : 'Chưa thiết lập'}
                    </p>
                </div>

                {/* Safety rules */}
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Quy tắc AI an toàn</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {[
                            { icon: <Lock size={16} />, text: 'AI không chat tự do cho trẻ dưới 13', active: true },
                            { icon: <Eye size={16} />, text: 'Ba mẹ xem được metadata tương tác AI', active: true },
                            { icon: <ExternalLink size={16} />, text: 'Link ngoài cần phê duyệt', active: true },
                            { icon: <Clock size={16} />, text: 'Giới hạn 30 phút/buổi học', active: true },
                        ].map((rule, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'var(--color-bg-warm)', borderRadius: 'var(--radius-md)' }}>
                                <div style={{ color: rule.active ? 'var(--color-success)' : 'var(--color-text-muted)' }}>{rule.icon}</div>
                                <span style={{ fontSize: '0.9rem', flex: 1 }}>{rule.text}</span>
                                <div style={{
                                    width: '40px', height: '22px', borderRadius: '11px',
                                    background: rule.active ? 'var(--color-success)' : 'var(--color-border)',
                                    position: 'relative',
                                }}>
                                    <div style={{
                                        width: '18px', height: '18px', borderRadius: '50%', background: 'white',
                                        position: 'absolute', top: '2px',
                                        left: rule.active ? '20px' : '2px',
                                        transition: 'left 0.2s',
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Interaction Audit Log */}
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Eye size={16} /> Nhật ký tương tác AI
                    </h3>
                    {aiInteractionLogs.length === 0 ? (
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Chưa có tương tác AI nào.</p>
                    ) : (
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {aiInteractionLogs.slice().reverse().slice(0, 10).map((log) => (
                                <div key={log.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--color-border-light)', fontSize: '0.85rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{log.role}</span>
                                        <span className={`badge ${log.safetyFlags.length > 0 ? 'badge-danger' : 'badge-success'}`}>
                                            {log.safetyFlags.length > 0 ? 'Cảnh báo' : 'An toàn'}
                                        </span>
                                    </div>
                                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                                        {log.subject} • Hỗ trợ: {log.supportLevel}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Safety events */}
                {safetyEvents.length > 0 && (
                    <div className="card" style={{ borderLeft: '4px solid var(--color-danger)' }}>
                        <h3 style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--color-danger)' }}>Sự kiện an toàn</h3>
                        {safetyEvents.map((event) => (
                            <div key={event.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--color-border-light)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontWeight: 600 }}>{event.eventType}</span>
                                    <span className={`badge badge-${event.severity === 'urgent' ? 'danger' : 'warning'}`}>{event.severity}</span>
                                </div>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{event.triggerSummary}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Data policy */}
                <div className="card" style={{ marginTop: '1.5rem', background: 'var(--color-bg-warm)' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Chính sách dữ liệu</h3>
                    <ul style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', paddingLeft: '1.25rem' }}>
                        <li>Dữ liệu lưu trên thiết bị, không gửi quảng cáo</li>
                        <li>Không chia sẻ dữ liệu trẻ em với bên thứ ba</li>
                        <li>Có thể xuất hoặc xóa toàn bộ dữ liệu</li>
                        <li>AI không lưu toàn bộ hội thoại, chỉ lưu metadata</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
