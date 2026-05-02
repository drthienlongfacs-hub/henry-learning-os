'use client';

// ========================================
// Reading Quiz — Comprehension checks from textbook passages
// Benchmark: Khan Academy (adaptive), Reading Eggs (rewards)
// ========================================

import React, { useState, useMemo } from 'react';
import { TEXTBOOK_LIBRARY, type TextbookPassage, type ComprehensionCheck } from '@/data/textbook-library';
import { BookOpen, CheckCircle, XCircle, RotateCcw, Sparkles, Brain, ChevronRight, Eye, EyeOff } from 'lucide-react';

interface ReadingQuizProps {
    lang: string;
}

interface QuizState {
    passage: TextbookPassage;
    currentQ: number;
    answers: Record<number, 'correct' | 'wrong' | null>;
    showHint: Record<number, boolean>;
    showPassage: boolean;
    completed: boolean;
}

// Collect all passages that have comprehension checks
function getAllQuizPassages(): TextbookPassage[] {
    const all: TextbookPassage[] = [];
    for (const entry of TEXTBOOK_LIBRARY) {
        for (const p of entry.passages) {
            if (p.comprehensionChecks.length > 0) {
                all.push(p);
            }
        }
    }
    return all;
}

export default function ReadingQuiz({ lang }: ReadingQuizProps) {
    const quizPassages = useMemo(getAllQuizPassages, []);
    const [quizIndex, setQuizIndex] = useState(0);
    const [showPassage, setShowPassage] = useState(true);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [checked, setChecked] = useState<Record<number, 'correct' | 'hint'>>({});
    const [showHints, setShowHints] = useState<Record<number, boolean>>({});
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);

    if (quizPassages.length === 0) return null;

    const passage = quizPassages[quizIndex % quizPassages.length];
    const checks = passage.comprehensionChecks;

    const handleCheck = (idx: number) => {
        const userAnswer = (answers[idx] || '').trim().toLowerCase();
        const hint = checks[idx].answerHint.toLowerCase();
        // Simple match: user answer contains key words from hint
        const hintWords = hint.split(/\s+/).filter(w => w.length > 2);
        const matchCount = hintWords.filter(w => userAnswer.includes(w)).length;
        const isCorrect = matchCount >= Math.max(1, Math.floor(hintWords.length * 0.4));

        if (isCorrect) {
            setChecked(p => ({ ...p, [idx]: 'correct' }));
            setScore(s => s + 1);
        } else {
            setChecked(p => ({ ...p, [idx]: 'hint' }));
            setShowHints(p => ({ ...p, [idx]: true }));
        }
    };

    const allAnswered = checks.every((_, i) => checked[i]);

    const nextPassage = () => {
        setQuizIndex(i => i + 1);
        setAnswers({});
        setChecked({});
        setShowHints({});
        setShowPassage(true);
        if (quizIndex + 1 >= quizPassages.length) {
            setCompleted(true);
        }
    };

    const restart = () => {
        setQuizIndex(0);
        setAnswers({});
        setChecked({});
        setShowHints({});
        setScore(0);
        setCompleted(false);
        setShowPassage(true);
    };

    return (
        <div style={{
            marginBottom: '1.5rem',
            background: 'var(--color-surface, #fff)',
            borderRadius: '20px',
            border: '1px solid rgba(0,0,0,0.06)',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #059669, #10b981)',
                padding: '1.25rem 1.5rem',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', top: '-15px', right: '-15px',
                    width: '90px', height: '90px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                        <Brain size={20} color="#fff" />
                        <h2 style={{ fontWeight: 800, fontSize: '1.05rem', margin: 0, color: '#fff' }}>
                            {lang === 'vi' ? '🧠 Đọc Hiểu — Kiểm Tra Nhanh' : '🧠 Reading Comprehension Quiz'}
                        </h2>
                    </div>
                    <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                        {lang === 'vi'
                            ? `Bài ${quizIndex + 1}/${quizPassages.length} • Điểm: ${score} ⭐ • ${passage.difficulty === 'easy' ? 'Dễ' : passage.difficulty === 'medium' ? 'Trung bình' : 'Khó'}`
                            : `Passage ${quizIndex + 1}/${quizPassages.length} • Score: ${score} ⭐ • ${passage.difficulty}`}
                    </p>
                </div>
            </div>

            <div style={{ padding: '1.25rem 1.5rem' }}>
                {completed ? (
                    /* Completion screen */
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
                        <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#059669', marginBottom: '0.3rem' }}>
                            {lang === 'vi' ? 'Hoàn thành tất cả!' : 'All Done!'}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1rem' }}>
                            {lang === 'vi' ? `Điểm: ${score} ⭐ / ${quizPassages.reduce((s, p) => s + p.comprehensionChecks.length, 0)} câu` : `Score: ${score} ⭐`}
                        </div>
                        <button onClick={restart} style={{
                            padding: '10px 24px', borderRadius: '12px', border: 'none',
                            background: 'linear-gradient(135deg, #059669, #10b981)',
                            color: '#fff', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                        }}>
                            <RotateCcw size={14} /> {lang === 'vi' ? 'Làm lại' : 'Restart'}
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Passage toggle + text */}
                        <div style={{ marginBottom: '1rem' }}>
                            <button onClick={() => setShowPassage(!showPassage)} style={{
                                display: 'flex', alignItems: 'center', gap: '0.4rem',
                                padding: '6px 14px', borderRadius: '10px',
                                border: '1px solid #e2e8f0', background: '#f8fafc',
                                color: '#475569', fontWeight: 600, fontSize: '0.72rem',
                                cursor: 'pointer', marginBottom: '0.5rem',
                            }}>
                                {showPassage ? <EyeOff size={13} /> : <Eye size={13} />}
                                {showPassage
                                    ? (lang === 'vi' ? 'Ẩn bài đọc' : 'Hide passage')
                                    : (lang === 'vi' ? 'Xem bài đọc' : 'Show passage')}
                            </button>

                            {showPassage && (
                                <div style={{
                                    padding: '1rem', borderRadius: '12px',
                                    background: '#f0fdf4', border: '1px solid #bbf7d033',
                                    fontSize: '0.82rem', lineHeight: 1.7,
                                    color: '#1e293b',
                                }}>
                                    <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: '#059669' }}>
                                        📖 {passage.title}
                                    </div>
                                    {passage.text}
                                    {passage.viSummary && (
                                        <div style={{
                                            marginTop: '0.5rem', fontSize: '0.7rem',
                                            color: '#64748b', fontStyle: 'italic',
                                            borderTop: '1px solid #e2e8f022', paddingTop: '0.4rem',
                                        }}>
                                            🇻🇳 {passage.viSummary}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Key Vocabulary */}
                        {passage.keyVocabulary.length > 0 && (
                            <div style={{
                                display: 'flex', gap: '0.4rem', flexWrap: 'wrap',
                                marginBottom: '1rem',
                            }}>
                                {passage.keyVocabulary.slice(0, 6).map(v => (
                                    <span key={v.word} style={{
                                        padding: '4px 10px', borderRadius: '8px',
                                        background: '#eff6ff', border: '1px solid #bfdbfe33',
                                        fontSize: '0.65rem', color: '#1e40af',
                                    }}>
                                        <strong>{v.word}</strong> = {v.viMeaning}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Questions */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {checks.map((check, i) => (
                                <div key={i} style={{
                                    padding: '0.75rem 1rem', borderRadius: '12px',
                                    background: checked[i] === 'correct' ? '#f0fdf4' : checked[i] === 'hint' ? '#fef3c7' : '#f8fafc',
                                    border: `1px solid ${checked[i] === 'correct' ? '#bbf7d0' : checked[i] === 'hint' ? '#fde68a' : '#e2e8f0'}`,
                                }}>
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                                        marginBottom: '0.4rem',
                                    }}>
                                        {checked[i] === 'correct' ? (
                                            <CheckCircle size={16} color="#16a34a" />
                                        ) : checked[i] === 'hint' ? (
                                            <Sparkles size={16} color="#d97706" />
                                        ) : (
                                            <span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#6366f1' }}>Q{i + 1}</span>
                                        )}
                                        <span style={{ fontWeight: 600, fontSize: '0.78rem', color: '#1e293b' }}>
                                            {check.question}
                                        </span>
                                    </div>

                                    {checked[i] !== 'correct' && (
                                        <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                                            <input
                                                type="text"
                                                value={answers[i] || ''}
                                                onChange={e => setAnswers(p => ({ ...p, [i]: e.target.value }))}
                                                placeholder={lang === 'vi' ? 'Nhập câu trả lời...' : 'Type your answer...'}
                                                onKeyDown={e => e.key === 'Enter' && handleCheck(i)}
                                                style={{
                                                    flex: 1, padding: '6px 12px', borderRadius: '8px',
                                                    border: '1px solid #e2e8f0', fontSize: '0.75rem',
                                                    outline: 'none', background: '#fff',
                                                }}
                                            />
                                            <button onClick={() => handleCheck(i)} style={{
                                                padding: '6px 14px', borderRadius: '8px', border: 'none',
                                                background: '#4f46e5', color: '#fff',
                                                fontWeight: 600, fontSize: '0.7rem', cursor: 'pointer',
                                            }}>
                                                {lang === 'vi' ? 'Kiểm tra' : 'Check'}
                                            </button>
                                        </div>
                                    )}

                                    {checked[i] === 'correct' && (
                                        <span style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 600 }}>
                                            ✅ {lang === 'vi' ? 'Đúng rồi!' : 'Correct!'} +1 ⭐
                                        </span>
                                    )}

                                    {showHints[i] && (
                                        <div style={{
                                            marginTop: '0.35rem', fontSize: '0.68rem',
                                            color: '#92400e', fontStyle: 'italic',
                                        }}>
                                            💡 {lang === 'vi' ? 'Gợi ý' : 'Hint'}: {check.answerHint}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Next button */}
                        {allAnswered && (
                            <button onClick={nextPassage} style={{
                                marginTop: '1rem', padding: '10px 24px', borderRadius: '12px',
                                border: 'none', width: '100%',
                                background: 'linear-gradient(135deg, #059669, #10b981)',
                                color: '#fff', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                            }}>
                                <ChevronRight size={16} />
                                {lang === 'vi' ? 'Bài tiếp theo' : 'Next Passage'}
                            </button>
                        )}
                    </>
                )}

                {/* Attribution */}
                <div style={{
                    marginTop: '0.75rem', fontSize: '0.58rem',
                    color: '#94a3b8', lineHeight: 1.5,
                }}>
                    📋 {lang === 'vi'
                        ? 'Bài đọc tự biên soạn theo CTGDPT 2018. Không sao chép SGK. Phục vụ luyện tập cá nhân/gia đình.'
                        : 'Original companion passages aligned to CTGDPT 2018. Not copied from textbooks. For personal/family practice.'}
                </div>
            </div>
        </div>
    );
}
