'use client';

import { useState } from 'react';
import { useAppStore } from '@/stores/app-store';
import { generateId, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const GUIDED_QUESTIONS = [
    'Tuần này con đã học được gì mới?',
    'Lỗi nào giúp con hiểu hơn?',
    'Điều gì khó nhất tuần này?',
    'Con thích phần nào nhất?',
    'Tuần tới con muốn làm gì?',
    'Con cần ba/mẹ giúp gì?',
];

export default function WeeklyReviewPage() {
    const { childProfile, parentProfile, weeklyReviews, addWeeklyReview, masteryStates, attempts, mistakes } = useAppStore();
    const [childReflection, setChildReflection] = useState('');
    const [parentReflection, setParentReflection] = useState('');
    const [highlights, setHighlights] = useState('');
    const [concerns, setConcerns] = useState('');
    const [goals, setGoals] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const recentAttempts = attempts.slice(-20);
    const correctPct = recentAttempts.length > 0
        ? Math.round((recentAttempts.filter((a) => a.isCorrect).length / recentAttempts.length) * 100)
        : 0;
    const weekMistakes = mistakes.filter((m) => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(m.id) > weekAgo;
    }).length;

    const handleSubmit = () => {
        if (!childProfile || !parentProfile) return;
        addWeeklyReview({
            id: generateId(),
            childId: childProfile.id,
            parentId: parentProfile.id,
            weekStartDate: new Date().toISOString(),
            childReflection,
            parentReflection,
            highlights: highlights.split(',').map((s) => s.trim()).filter(Boolean),
            concerns: concerns.split(',').map((s) => s.trim()).filter(Boolean),
            nextWeekGoals: goals.split(',').map((s) => s.trim()).filter(Boolean),
            createdAt: new Date().toISOString(),
        });
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="page-container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
                <div className="animate-fade-in">
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌟</div>
                    <h1 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Đã lưu!</h1>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Đánh giá tuần đã được ghi nhận.</p>
                    <Link href="/parent/dashboard"><button className="btn btn-primary">Quay lại Dashboard</button></Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100dvh', background: 'var(--color-bg-parent)', fontFamily: 'var(--font-parent)' }}>
            <div className="page-container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <Link href="/parent/dashboard"><button className="btn btn-ghost btn-sm"><ArrowLeft size={18} /></button></Link>
                    <h1 style={{ fontWeight: 800, fontSize: '1.5rem' }}>Đánh giá tuần</h1>
                </div>

                {/* Week summary */}
                <div className="card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, #ede9fe, #dbeafe)' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Tổng kết tuần qua</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                        <div><span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{correctPct}%</span> chính xác</div>
                        <div><span style={{ fontWeight: 700, color: 'var(--color-warning)' }}>{weekMistakes}</span> lỗi mới</div>
                    </div>
                </div>

                {/* Guided questions */}
                <div className="card" style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Câu hỏi dẫn dắt buổi họp gia đình</h3>
                    <ol style={{ paddingLeft: '1.25rem', color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                        {GUIDED_QUESTIONS.map((q, idx) => <li key={idx} style={{ marginBottom: '0.5rem' }}>{q}</li>)}
                    </ol>
                </div>

                {/* Child reflection */}
                <div className="card" style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Con chia sẻ</h3>
                    <textarea className="textarea-field" value={childReflection} onChange={(e) => setChildReflection(e.target.value)} placeholder="Con nói gì về tuần qua..." />
                </div>

                {/* Parent reflection */}
                <div className="card" style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Ba/Mẹ ghi nhận</h3>
                    <textarea className="textarea-field" value={parentReflection} onChange={(e) => setParentReflection(e.target.value)} placeholder="Quan sát của ba/mẹ..." />
                    <input className="input-field" style={{ marginTop: '0.75rem' }} placeholder="Điểm sáng (phân cách dấu phẩy)" value={highlights} onChange={(e) => setHighlights(e.target.value)} />
                    <input className="input-field" style={{ marginTop: '0.5rem' }} placeholder="Lo ngại (phân cách dấu phẩy)" value={concerns} onChange={(e) => setConcerns(e.target.value)} />
                    <input className="input-field" style={{ marginTop: '0.5rem' }} placeholder="Mục tiêu tuần tới" value={goals} onChange={(e) => setGoals(e.target.value)} />
                </div>

                <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={handleSubmit}>
                    Lưu đánh giá tuần
                </button>

                {/* History */}
                {weeklyReviews.length > 0 && (
                    <div style={{ marginTop: '2rem' }}>
                        <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>Lịch sử đánh giá</h3>
                        {weeklyReviews.slice().reverse().slice(0, 3).map((wr) => (
                            <div key={wr.id} className="card" style={{ marginBottom: '0.5rem', padding: '0.75rem' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{formatDate(wr.createdAt)}</span>
                                {wr.highlights.length > 0 && (
                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                                        Điểm sáng: {wr.highlights.join(', ')}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
