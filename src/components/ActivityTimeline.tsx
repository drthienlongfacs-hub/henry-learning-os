'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calendar, BookOpen, Calculator, Globe, Beaker, Award, Clock } from 'lucide-react';
import { loadAllEvents, type PersistedLearningEvent } from '@/lib/data/data-service';

interface TimelineDay {
    date: string;
    dateLabel: string;
    events: PersistedLearningEvent[];
    totalDuration: number;
    successRate: number;
}

const VERB_ICONS: Record<string, React.ReactNode> = {
    attempted: <BookOpen size={14} />,
    completed: <Award size={14} />,
    mastered: <Award size={14} />,
};

const MODULE_COLORS: Record<string, string> = {
    math: '#6366f1',
    vietnamese: '#10b981',
    english: '#f59e0b',
    science: '#ef4444',
    elite: '#8b5cf6',
    reading: '#06b6d4',
};

function getModuleColor(module: string): string {
    const key = Object.keys(MODULE_COLORS).find(k => module.toLowerCase().includes(k));
    return key ? MODULE_COLORS[key] : '#64748b';
}

function getModuleIcon(module: string): React.ReactNode {
    const lower = module.toLowerCase();
    if (lower.includes('math')) return <Calculator size={14} />;
    if (lower.includes('english')) return <Globe size={14} />;
    if (lower.includes('science')) return <Beaker size={14} />;
    return <BookOpen size={14} />;
}

/**
 * ActivityTimeline — Shows persistent learning activity from IndexedDB.
 * Grouped by day, with duration and success rate summaries.
 */
export function ActivityTimeline({ childId }: { childId: string }) {
    const [days, setDays] = useState<TimelineDay[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalEvents, setTotalEvents] = useState(0);
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current) return;
        didMountRef.current = true;

        loadAllEvents().then(events => {
            const childEvents = events.filter(e => e.actor === `child:${childId}`);
            setTotalEvents(childEvents.length);

            // Group by date
            const grouped = new Map<string, PersistedLearningEvent[]>();
            for (const evt of childEvents) {
                const date = evt.timestamp.slice(0, 10); // YYYY-MM-DD
                if (!grouped.has(date)) grouped.set(date, []);
                grouped.get(date)!.push(evt);
            }

            // Convert to timeline days, sorted newest first
            const timeline: TimelineDay[] = Array.from(grouped.entries())
                .map(([date, evts]) => {
                    const results = evts.filter(e => e.result);
                    const successes = results.filter(e => (e.result as Record<string, unknown>)?.success === true).length;
                    const totalDuration = results.reduce((sum, e) => sum + (((e.result as Record<string, unknown>)?.durationSec as number) || 0), 0);

                    return {
                        date,
                        dateLabel: new Date(date).toLocaleDateString('vi-VN', {
                            weekday: 'short', day: 'numeric', month: 'short',
                        }),
                        events: evts.sort((a, b) => b.timestamp.localeCompare(a.timestamp)),
                        totalDuration,
                        successRate: results.length > 0 ? Math.round((successes / results.length) * 100) : -1,
                    };
                })
                .sort((a, b) => b.date.localeCompare(a.date))
                .slice(0, 14); // Last 14 days

            setDays(timeline);
            setIsLoading(false);
        }).catch(() => {
            setIsLoading(false);
        });
    }, [childId]);

    if (isLoading) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                Đang tải lịch sử học tập...
            </div>
        );
    }

    if (days.length === 0) {
        return (
            <div style={{
                padding: '2rem',
                textAlign: 'center',
                background: 'rgba(99,102,241,0.05)',
                borderRadius: '1.5rem',
                border: '1px solid rgba(99,102,241,0.1)',
            }}>
                <Calendar style={{ width: 32, height: 32, color: '#94a3b8', margin: '0 auto 0.5rem' }} />
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                    Chưa có hoạt động nào được ghi nhận.
                </p>
                <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                    Hoạt động sẽ tự động lưu khi con học.
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* Summary bar */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '1rem',
                padding: '0.75rem 1rem',
                background: 'rgba(99,102,241,0.08)',
                borderRadius: '1rem',
                fontSize: '0.8rem',
                color: '#4338ca',
                fontWeight: 600,
            }}>
                <span>📊 {totalEvents} sự kiện</span>
                <span>📅 {days.length} ngày</span>
            </div>

            {/* Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {days.map(day => (
                    <details key={day.date} style={{
                        background: 'rgba(255,255,255,0.8)',
                        borderRadius: '1rem',
                        border: '1px solid rgba(0,0,0,0.05)',
                        overflow: 'hidden',
                    }}>
                        <summary style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0.75rem 1rem',
                            cursor: 'pointer',
                            listStyle: 'none',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar size={14} style={{ color: '#6366f1' }} />
                                <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e1b4b' }}>
                                    {day.dateLabel}
                                </span>
                                <span style={{
                                    fontSize: '0.7rem',
                                    background: '#eef2ff',
                                    color: '#4338ca',
                                    padding: '2px 8px',
                                    borderRadius: '999px',
                                    fontWeight: 600,
                                }}>
                                    {day.events.length} hoạt động
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: '#64748b' }}>
                                {day.totalDuration > 0 && (
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                                        <Clock size={12} /> {Math.round(day.totalDuration / 60)}p
                                    </span>
                                )}
                                {day.successRate >= 0 && (
                                    <span style={{
                                        fontWeight: 700,
                                        color: day.successRate >= 70 ? '#10b981' : day.successRate >= 40 ? '#f59e0b' : '#ef4444',
                                    }}>
                                        {day.successRate}%
                                    </span>
                                )}
                            </div>
                        </summary>

                        {/* Event list */}
                        <div style={{ padding: '0 1rem 0.75rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                            {day.events.slice(0, 20).map(evt => (
                                <div key={evt.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '0.4rem 0',
                                    borderBottom: '1px solid rgba(0,0,0,0.03)',
                                    fontSize: '0.78rem',
                                }}>
                                    <div style={{ color: getModuleColor(evt.context.module as string || '') }}>
                                        {VERB_ICONS[evt.verb] || getModuleIcon(evt.context.module as string || '')}
                                    </div>
                                    <span style={{ flex: 1, color: '#334155' }}>
                                        {evt.object}
                                    </span>
                                    <span style={{
                                        fontSize: '0.7rem',
                                        color: '#94a3b8',
                                    }}>
                                        {new Date(evt.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    {evt.result && (
                                        <span style={{
                                            fontSize: '0.7rem',
                                            fontWeight: 700,
                                            color: (evt.result as Record<string, unknown>)?.success ? '#10b981' : '#ef4444',
                                        }}>
                                            {(evt.result as Record<string, unknown>)?.success ? '✓' : '✗'}
                                        </span>
                                    )}
                                </div>
                            ))}
                            {day.events.length > 20 && (
                                <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8', padding: '0.5rem' }}>
                                    ...và {day.events.length - 20} hoạt động khác
                                </div>
                            )}
                        </div>
                    </details>
                ))}
            </div>
        </div>
    );
}
