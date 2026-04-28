'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Calculator, Globe2, FlaskConical, Brain, ChevronRight, RotateCcw, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { MATH_TOPICS, generateMathSet, type MathProblem, type TopicInfo } from '@/lib/content/math-generator';
import { VIETNAMESE_TOPICS, generateVietnameseSet, type VietnameseProblem, type VnTopicInfo } from '@/lib/content/vietnamese-generator';
import { ENGLISH_TOPICS, generateEnglishSet, type EnglishProblem, type EnTopicInfo } from '@/lib/content/english-generator';
import { SCIENCE_TOPICS, generateScienceSet, type ScienceProblem, type SciTopicInfo } from '@/lib/content/science-generator';
import { HISGEO_TOPICS, generateHisGeoSet, type HisGeoProblem, type HisGeoTopicInfo } from '@/lib/content/history-geo-generator';
import { COMPUTING_TOPICS, generateComputingSet, type ComputingProblem, type CompTopicInfo } from '@/lib/content/computing-generator';
import { useAppStore } from '@/stores/app-store';

// ── Types ──
type Subject = 'math' | 'vietnamese' | 'english' | 'science' | 'hisgeo' | 'computing' | 'elite';
type Problem = MathProblem | VietnameseProblem | EnglishProblem | ScienceProblem | HisGeoProblem | ComputingProblem;
type AnyTopicInfo = TopicInfo | VnTopicInfo | EnTopicInfo | SciTopicInfo | HisGeoTopicInfo | CompTopicInfo;

// Augment problem types to support illustration
type ProblemWithViz = Problem & { illustration?: React.ReactNode | string };

const SUBJECTS: { key: Subject; name: string; icon: React.ReactNode; color: string; grades: number[] }[] = [
    { key: 'math', name: 'Toán', icon: <Calculator size={28} />, color: '#3b82f6', grades: [1, 2, 3, 4, 5] },
    { key: 'vietnamese', name: 'Tiếng Việt', icon: <BookOpen size={28} />, color: '#8b5cf6', grades: [1, 2, 3, 4, 5] },
    { key: 'english', name: 'Tiếng Anh', icon: <Globe2 size={28} />, color: '#10b981', grades: [3, 4, 5] },
    { key: 'science', name: 'Khoa học', icon: <FlaskConical size={28} />, color: '#f59e0b', grades: [1, 2, 3, 4, 5] },
    { key: 'hisgeo', name: 'Lịch sử & Địa lý', icon: <Globe2 size={28} />, color: '#6366f1', grades: [4, 5] },
    { key: 'computing', name: 'Tin học', icon: <Brain size={28} />, color: '#14b8a6', grades: [3, 4, 5] },
    { key: 'elite', name: 'Năng lực Tinh Hoa', icon: <Brain size={28} />, color: '#ef4444', grades: [1, 2, 3, 4, 5] },
];

// ── iOS 26 Liquid Glass Styles ──
const glass = {
    card: { background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(40px) saturate(1.8)', WebkitBackdropFilter: 'blur(40px) saturate(1.8)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.5)', boxShadow: '0 4px 30px rgba(0,0,0,0.08)', padding: 20 } as React.CSSProperties,
    pill: (active: boolean, color: string) => ({
        padding: '8px 18px', borderRadius: 20, border: active ? `2px solid ${color}` : '1px solid rgba(0,0,0,0.1)',
        background: active ? color : 'rgba(255,255,255,0.5)', color: active ? '#fff' : '#333',
        fontWeight: active ? 700 : 500, fontSize: 14, cursor: 'pointer', transition: 'all .2s',
    }) as React.CSSProperties,
    btn: (color: string) => ({
        padding: '12px 28px', borderRadius: 16, border: 'none', background: color, color: '#fff',
        fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'all .2s', display: 'flex', alignItems: 'center', gap: 8,
    }) as React.CSSProperties,
};

export default function LearnPage() {
    const router = useRouter();
    const [subject, setSubject] = useState<Subject | null>(null);
    const [grade, setGrade] = useState(1);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [problems, setProblems] = useState<Problem[]>([]);
    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const startTime = useRef(Date.now());

    const { addAttempt, addMistake, childProfile } = useAppStore();

    const startExercise = useCallback((subj: Subject, g: number, topicKey?: string) => {
        let p: Problem[] = [];
        if (subj === 'math') p = generateMathSet(g, topicKey, 10);
        else if (subj === 'vietnamese') p = generateVietnameseSet(g, topicKey, 10);
        else if (subj === 'english') p = generateEnglishSet(g, topicKey, 10);
        else if (subj === 'science') p = generateScienceSet(g, topicKey, 10);
        else if (subj === 'hisgeo') p = generateHisGeoSet(g, topicKey, 10);
        else if (subj === 'computing') p = generateComputingSet(g, topicKey, 10);
        setProblems(p);
        setIndex(0); setSelected(null); setScore(0); setShowHint(false);
        startTime.current = Date.now();
    }, []);

    // Record analytics
    const handleAnswer = useCallback((answer: string) => {
        if (selected) return;
        setSelected(answer);
        const p = problems[index];
        const isCorrect = answer === p.correctAnswer;
        if (isCorrect) setScore(s => s + 10);

        const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
        if (childProfile) {
            addAttempt({
                id: `att-${Date.now()}`, childId: childProfile.id, lessonId: p.id,
                competencyId: p.topicKey, exerciseId: p.id, answer,
                isCorrect, errorType: isCorrect ? null : 'concept',
                hintLevelUsed: 0, timeSpentSeconds: timeSpent,
                confidenceSelfRating: 3, aiRoleUsed: 'tutor', createdAt: new Date().toISOString(),
            });
            if (!isCorrect) {
                addMistake({
                    id: `mis-${Date.now()}`, childId: childProfile.id,
                    competencyId: p.topicKey, attemptId: `att-${Date.now()}`,
                    errorType: 'concept', explanation: p.explanation,
                    correctionPlan: `Ôn lại chủ đề: ${p.topic}`,
                    reviewSchedule: [], resolvedAt: null,
                });
            }
        }
    }, [selected, problems, index, childProfile, addAttempt, addMistake]);

    const nextProblem = () => {
        setSelected(null); setShowHint(false);
        setIndex(i => i + 1);
        startTime.current = Date.now();
    };

    const currentProblem = problems[index] as ProblemWithViz;
    const topics = subject === 'math' ? MATH_TOPICS.filter(t => t.gradeLevel === grade)
        : subject === 'vietnamese' ? VIETNAMESE_TOPICS.filter(t => t.gradeLevel <= grade)
            : subject === 'english' ? ENGLISH_TOPICS.filter(t => t.gradeLevel <= grade)
                : subject === 'science' ? SCIENCE_TOPICS.filter(t => t.gradeLevel <= grade)
                    : subject === 'hisgeo' ? HISGEO_TOPICS.filter(t => t.gradeLevel <= grade)
                        : subject === 'computing' ? COMPUTING_TOPICS.filter(t => t.gradeLevel <= grade)
                            : [];

    // ── RENDER ──
    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f0e6ff 50%, #fce7f3 100%)', padding: '20px 16px' }}>
            <div style={{ maxWidth: 680, margin: '0 auto' }}>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <Link href={problems.length > 0 ? '#' : '/child'} onClick={(e) => {
                        e.preventDefault();
                        if (problems.length > 0 && index < problems.length) {
                            setProblems([]); setSelectedTopic(null);
                        } else if (subject && !selectedTopic) {
                            setSubject(null);
                        } else {
                            router.push('/child');
                        }
                    }}>
                        <div style={{ ...glass.card, padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', color: '#3b82f6' }}>
                            <ArrowLeft size={18} /> Quay lại
                        </div>
                    </Link>
                    <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1e1b4b' }}>
                        {problems.length > 0 ? currentProblem?.topic || 'Bài tập' : subject ? SUBJECTS.find(s => s.key === subject)?.name : 'Chương trình học'}
                    </h1>
                </div>

                {/* ════ SUBJECT SELECTION ════ */}
                {!subject && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                        {SUBJECTS.map(s => (
                            <div key={s.key} style={{ ...glass.card, cursor: 'pointer', textAlign: 'center', transition: 'transform .2s' }}
                                onClick={() => { if (s.key === 'elite') { router.push('/child/elite'); return; } setSubject(s.key); setGrade(s.grades[0]); }}
                                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
                                <div style={{ width: 56, height: 56, borderRadius: 16, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', margin: '0 auto 12px' }}>
                                    {s.icon}
                                </div>
                                <div style={{ fontWeight: 700, fontSize: 16 }}>{s.name}</div>
                                <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Lớp {s.grades.join(', ')}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ════ GRADE + TOPIC SELECTION ════ */}
                {subject && problems.length === 0 && (
                    <div>
                        {/* Grade pills */}
                        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                            {SUBJECTS.find(s => s.key === subject)?.grades.map(g => (
                                <button key={g} style={glass.pill(grade === g, SUBJECTS.find(s => s.key === subject)!.color)}
                                    onClick={() => setGrade(g)}>Lớp {g}</button>
                            ))}
                        </div>

                        {/* Topic cards */}
                        {topics.length > 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {topics.map(t => (
                                    <div key={t.key} style={{ ...glass.card, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', transition: 'transform .2s' }}
                                        onClick={() => { setSelectedTopic(t.key); startExercise(subject, grade, t.key); }}
                                        onMouseEnter={e => (e.currentTarget.style.transform = 'translateX(4px)')}
                                        onMouseLeave={e => (e.currentTarget.style.transform = 'translateX(0)')}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <span style={{ fontSize: 28 }}>{t.icon}</span>
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: 15 }}>{t.name}</div>
                                                <div style={{ fontSize: 12, color: '#666' }}>Lớp {t.gradeLevel} • 10 bài/phiên</div>
                                            </div>
                                        </div>
                                        <ChevronRight size={20} color="#999" />
                                    </div>
                                ))}
                                {/* Play all topics button */}
                                <button style={{ ...glass.btn(SUBJECTS.find(s => s.key === subject)!.color), width: '100%', justifyContent: 'center', marginTop: 8 }}
                                    onClick={() => startExercise(subject, grade)}>
                                    Luyện tập hỗn hợp lớp {grade} (10 bài)
                                </button>
                            </div>
                        ) : (
                            <div style={{ ...glass.card, textAlign: 'center', padding: 40 }}>
                                <div style={{ fontSize: 48, marginBottom: 12 }}>🚧</div>
                                <div style={{ fontWeight: 700, fontSize: 18, color: '#666' }}>Đang phát triển</div>
                                <div style={{ fontSize: 14, color: '#999', marginTop: 8 }}>Môn {SUBJECTS.find(s => s.key === subject)?.name} lớp {grade} sẽ sớm ra mắt!</div>
                            </div>
                        )}
                    </div>
                )}

                {/* ════ EXERCISE IN PROGRESS ════ */}
                {problems.length > 0 && index < problems.length && currentProblem && (
                    <div style={glass.card}>
                        {/* Progress bar */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'rgba(0,0,0,0.08)', marginRight: 12 }}>
                                <div style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', width: `${((index + 1) / problems.length) * 100}%`, transition: 'width .3s' }} />
                            </div>
                            <span style={{ fontSize: 13, color: '#666', fontWeight: 600 }}>{index + 1}/{problems.length}</span>
                        </div>

                        {/* Passage (for reading) */}
                        {'passage' in currentProblem && (currentProblem as VietnameseProblem).passage && (
                            <div style={{ background: 'rgba(139,92,246,0.08)', borderRadius: 12, padding: 16, marginBottom: 16, fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                                {(currentProblem as VietnameseProblem).passage}
                            </div>
                        )}

                        {/* Illustration */}
                        {currentProblem.illustration && (
                            <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
                                {typeof currentProblem.illustration === 'string' ? (
                                    <img
                                        src={currentProblem.illustration.startsWith('/') ? `${process.env.NODE_ENV === 'production' ? '/henry-learning-os' : ''}${currentProblem.illustration}` : currentProblem.illustration}
                                        alt="Minh hoạ học tập"
                                        onError={(e) => {
                                            const target = e.currentTarget;
                                            target.style.display = 'none';
                                            const fallback = target.nextElementSibling as HTMLElement;
                                            if (fallback) fallback.style.display = 'flex';
                                        }}
                                        style={{ maxHeight: 180, maxWidth: '100%', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', objectFit: 'cover' }} />
                                ) : (
                                    currentProblem.illustration
                                )}
                                <div style={{ display: 'none', width: 180, height: 120, borderRadius: 12, background: 'linear-gradient(135deg, #e0e7ff, #fce7f3)', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>
                                    {subject === 'hisgeo' ? '🏛️' : subject === 'science' ? '🔬' : subject === 'english' ? '📚' : subject === 'computing' ? '💻' : '📖'}
                                </div>
                            </div>
                        )}

                        {/* Question */}
                        <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.5, marginBottom: 24, color: '#1e1b4b', textAlign: 'center' }}>
                            {currentProblem.question}
                        </div>

                        {/* Options */}
                        {currentProblem.options && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {currentProblem.options.map((opt, i) => {
                                    const isSelected = selected === opt;
                                    const isCorrect = opt === currentProblem.correctAnswer;
                                    const showResult = selected !== null;
                                    let bg = 'rgba(255,255,255,0.7)';
                                    let border = '2px solid rgba(0,0,0,0.05)';
                                    if (showResult && isCorrect) { bg = 'rgba(16,185,129,0.15)'; border = '2px solid #10b981'; }
                                    else if (showResult && isSelected && !isCorrect) { bg = 'rgba(239,68,68,0.12)'; border = '2px solid #ef4444'; }
                                    return (
                                        <button key={i} disabled={!!selected} onClick={() => handleAnswer(opt)}
                                            style={{ padding: '16px 20px', borderRadius: 16, border, background: bg, textAlign: 'left', fontSize: 17, cursor: selected ? 'default' : 'pointer', transition: 'all .2s ease', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                                            {showResult && isCorrect ? <div style={{ width: 24, height: 24, borderRadius: 12, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle2 size={16} color="#fff" /></div> : null}
                                            {showResult && isSelected && !isCorrect ? <div style={{ width: 24, height: 24, borderRadius: 12, background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><XCircle size={16} color="#fff" /></div> : null}
                                            <span style={{ fontWeight: isSelected ? 800 : 600, color: '#334155' }}>{opt}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* Hint */}
                        {!selected && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 24, gap: 12 }}>
                                <button onClick={() => setShowHint(!showHint)}
                                    style={{ padding: '10px 20px', borderRadius: 20, border: '1px solid rgba(245,158,11,0.4)', background: 'rgba(245,158,11,0.1)', color: '#b45309', fontSize: 16, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all .2s' }}>
                                    <Lightbulb size={18} /> 💡 Mở gợi ý siêu cấp
                                </button>
                                {showHint && (
                                    <div style={{ padding: '16px 24px', borderRadius: 16, background: '#fffbeb', border: '2px solid #fde68a', color: '#b45309', fontSize: 18, fontWeight: 600, maxWidth: '80%', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                                        🌟 {currentProblem.hints[0]}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Feedback + Next */}
                        {selected && (
                            <div style={{ marginTop: 24, padding: 20, borderRadius: 16, background: selected === currentProblem.correctAnswer ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.08)', border: `2px solid ${selected === currentProblem.correctAnswer ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.3)'}`, position: 'relative' }}>
                                <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', fontSize: 32, background: '#fff', borderRadius: 40, padding: '0 8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                    {selected === currentProblem.correctAnswer ? '🌟' : '💪'}
                                </div>
                                <div style={{ fontWeight: 800, fontSize: 18, marginTop: 12, marginBottom: 8, color: selected === currentProblem.correctAnswer ? '#059669' : '#dc2626', textAlign: 'center' }}>
                                    {selected === currentProblem.correctAnswer ? 'Tuyệt vời! Con làm đúng rồi!' : 'Không sao cả! Cùng xem lại nhé!'}
                                </div>
                                <div style={{ fontSize: 16, color: '#475569', lineHeight: 1.6, textAlign: 'center', background: 'rgba(255,255,255,0.6)', padding: 12, borderRadius: 12, marginBottom: 16 }}>{currentProblem.explanation}</div>
                                <button onClick={nextProblem} style={{ ...glass.btn('#3b82f6'), width: '100%', justifyContent: 'center', padding: '14px', fontSize: 16, borderRadius: 16, boxShadow: '0 4px 14px rgba(59,130,246,0.3)' }}>
                                    Câu tiếp theo <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* ════ COMPLETION ════ */}
                {problems.length > 0 && index >= problems.length && (
                    <div style={{ ...glass.card, textAlign: 'center', padding: '48px 24px' }}>
                        <div style={{ fontSize: 72, marginBottom: 20, animation: 'bounce 2s infinite' }}>{score >= problems.length * 8 ? '🏆' : score >= problems.length * 6 ? '⭐' : '🌱'}</div>
                        <div style={{ fontSize: 26, fontWeight: 800, color: '#1e1b4b', marginBottom: 8 }}>{score >= problems.length * 8 ? 'Xuất sắc quá!' : score >= problems.length * 6 ? 'Làm tốt lắm!' : 'Cố gắng lên nhé!'}</div>
                        <div style={{ fontSize: 18, color: '#475569', marginBottom: 24 }}>Con đã hoàn thành phiên học luyện tập</div>

                        <div style={{ background: 'rgba(59,130,246,0.1)', borderRadius: 24, padding: '24px', margin: '0 auto 32px', display: 'inline-block', border: '2px dashed rgba(59,130,246,0.3)' }}>
                            <div style={{ fontSize: 14, color: '#3b82f6', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>ĐIỂM SỐ CỦA CON</div>
                            <div style={{ fontSize: 48, fontWeight: 900, color: '#3b82f6', lineHeight: 1 }}>{score}<span style={{ fontSize: 24, color: '#94a3b8' }}>/{(problems.length * 10)}</span></div>
                        </div>

                        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button style={{ ...glass.btn('#3b82f6'), padding: '16px 28px', fontSize: 16 }} onClick={() => startExercise(subject!, grade, selectedTopic || undefined)}>
                                <RotateCcw size={20} /> Chơi lại thử thách này!
                            </button>
                            <button style={{ ...glass.btn('#8b5cf6'), padding: '16px 28px', fontSize: 16 }} onClick={() => { setProblems([]); setSelectedTopic(null); }}>
                                Chọn môn khác thui!
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
