'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    BookOpen,
    CheckCircle2,
    FileText,
    GraduationCap,
    RotateCcw,
    Target,
    Volume2,
    XCircle,
} from 'lucide-react';
import {
    CAMBRIDGE_EXAM_PREP_STATS,
    CAMBRIDGE_EXAM_PROGRAMS,
    CAMBRIDGE_OFFICIAL_SOURCES,
    getAllPracticeQuestions,
    getCambridgeProgram,
    getObjectiveQuestions,
    getPracticeSetsForProgram,
    isCorrectExamAnswer,
    type CambridgeExamProgramId,
    type CambridgePracticeQuestion,
    type CambridgePracticeSet,
    type CambridgePracticeTask,
} from '@/data/cambridge-exam-prep';

interface SavedAttempt {
    answers: Record<string, string>;
    drafts: Record<string, string>;
    checked: boolean;
    updatedAt: string;
}

const STORAGE_KEY = 'henry-cambridge-exam-prep-v1';

const emptyAttempt = (): SavedAttempt => ({
    answers: {},
    drafts: {},
    checked: false,
    updatedAt: new Date().toISOString(),
});

const loadSavedAttempts = (): Record<string, SavedAttempt> => {
    if (typeof window === 'undefined') return {};

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) as Record<string, SavedAttempt> : {};
    } catch {
        return {};
    }
};

const skillTone: Record<string, { bg: string; fg: string; border: string }> = {
    'reading-writing': { bg: '#eff6ff', fg: '#1d4ed8', border: '#bfdbfe' },
    reading: { bg: '#ecfdf5', fg: '#047857', border: '#a7f3d0' },
    writing: { bg: '#fff7ed', fg: '#c2410c', border: '#fed7aa' },
    listening: { bg: '#eef2ff', fg: '#4f46e5', border: '#c7d2fe' },
    speaking: { bg: '#fdf2f8', fg: '#be185d', border: '#fbcfe8' },
};

function saveAttempts(next: Record<string, SavedAttempt>) {
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
}

function speakTranscript(text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-GB';
    utterance.rate = 0.82;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
}

function getSourcePack(programId: CambridgeExamProgramId) {
    const keyword = programId === 'a2-key' ? 'a2-key' : 'b1-preliminary';
    return CAMBRIDGE_OFFICIAL_SOURCES.filter(source => source.id.includes(keyword));
}

function getAnswerValue(attempt: SavedAttempt, question: CambridgePracticeQuestion) {
    if (question.mode === 'writing' || question.mode === 'speaking') {
        return attempt.drafts[question.id] ?? '';
    }

    return attempt.answers[question.id] ?? '';
}

function formatTaskCount(set: CambridgePracticeSet) {
    const taskCount = set.components.reduce((sum, component) => sum + component.tasks.length, 0);
    const questionCount = getAllPracticeQuestions(set).length;
    const objectiveCount = getObjectiveQuestions(set).length;

    return { taskCount, questionCount, objectiveCount };
}

export default function CambridgeExamsPage() {
    const [programId, setProgramId] = useState<CambridgeExamProgramId>('a2-key');
    const [setNo, setSetNo] = useState(1);
    const [savedAttempts, setSavedAttempts] = useState<Record<string, SavedAttempt>>(loadSavedAttempts);

    const program = getCambridgeProgram(programId);
    const practiceSets = useMemo(() => getPracticeSetsForProgram(programId), [programId]);
    const selectedSet = practiceSets.find(item => item.setNo === setNo) ?? practiceSets[0];
    const attempt = savedAttempts[selectedSet.id] ?? emptyAttempt();
    const officialSources = getSourcePack(programId);
    const objectiveQuestions = useMemo(() => getObjectiveQuestions(selectedSet), [selectedSet]);
    const setCounts = useMemo(() => formatTaskCount(selectedSet), [selectedSet]);

    const answeredObjectiveCount = objectiveQuestions.filter(question => {
        const answer = attempt.answers[question.id];
        return answer && answer.trim().length > 0;
    }).length;
    const correctObjectiveCount = objectiveQuestions.filter(question => isCorrectExamAnswer(question, attempt.answers[question.id] ?? '')).length;
    const wrongQuestions = objectiveQuestions.filter(question => {
        const answer = attempt.answers[question.id] ?? '';
        return answer.trim().length > 0 && !isCorrectExamAnswer(question, answer);
    });

    const updateAttempt = (updater: (current: SavedAttempt) => SavedAttempt) => {
        setSavedAttempts(prev => {
            const current = prev[selectedSet.id] ?? emptyAttempt();
            const nextAttempt = updater(current);
            const next = { ...prev, [selectedSet.id]: nextAttempt };
            saveAttempts(next);
            return next;
        });
    };

    const setAnswer = (question: CambridgePracticeQuestion, value: string) => {
        updateAttempt(current => ({
            ...current,
            answers: { ...current.answers, [question.id]: value },
            checked: false,
            updatedAt: new Date().toISOString(),
        }));
    };

    const setDraft = (question: CambridgePracticeQuestion, value: string) => {
        updateAttempt(current => ({
            ...current,
            drafts: { ...current.drafts, [question.id]: value },
            updatedAt: new Date().toISOString(),
        }));
    };

    const markChecked = () => {
        updateAttempt(current => ({ ...current, checked: true, updatedAt: new Date().toISOString() }));
    };

    const resetSet = () => {
        setSavedAttempts(prev => {
            const next = { ...prev };
            delete next[selectedSet.id];
            saveAttempts(next);
            return next;
        });
    };

    const switchProgram = (nextProgramId: CambridgeExamProgramId) => {
        setProgramId(nextProgramId);
        setSetNo(1);
    };

    const renderQuestion = (task: CambridgePracticeTask, question: CambridgePracticeQuestion, questionIndex: number) => {
        const value = getAnswerValue(attempt, question);
        const hasObjectiveAnswer = question.correctAnswer && (question.mode === 'objective' || question.mode === 'gap');
        const isCorrect = hasObjectiveAnswer ? isCorrectExamAnswer(question, value) : false;
        const showFeedback = attempt.checked && (hasObjectiveAnswer || question.mode === 'writing' || question.mode === 'speaking');

        return (
            <div
                key={question.id}
                style={{
                    borderTop: '1px solid rgba(148,163,184,0.25)',
                    paddingTop: '0.85rem',
                    marginTop: '0.85rem',
                }}
            >
                <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start' }}>
                    <div
                        style={{
                            width: 28,
                            height: 28,
                            borderRadius: 8,
                            background: 'rgba(15,23,42,0.06)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.78rem',
                            fontWeight: 900,
                            flex: '0 0 auto',
                        }}
                    >
                        {questionIndex + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 850, color: '#0f172a', lineHeight: 1.45 }}>{question.prompt}</div>
                        <div style={{ color: '#64748b', fontSize: '0.72rem', marginTop: '0.25rem' }}>
                            {question.skillFocus}
                        </div>

                        {question.mode === 'objective' && question.options && (
                            <div style={{ display: 'grid', gap: '0.45rem', marginTop: '0.65rem' }}>
                                {question.options.map(option => {
                                    const selected = value === option;
                                    return (
                                        <label
                                            key={`${question.id}-${option}`}
                                            style={{
                                                minHeight: 40,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                borderRadius: 10,
                                                border: selected ? '2px solid #2563eb' : '1px solid rgba(148,163,184,0.38)',
                                                background: selected ? 'rgba(37,99,235,0.08)' : 'rgba(255,255,255,0.78)',
                                                padding: '0.55rem 0.7rem',
                                                cursor: 'pointer',
                                                fontSize: '0.84rem',
                                            }}
                                        >
                                            <input
                                                type="radio"
                                                name={question.id}
                                                value={option}
                                                checked={selected}
                                                onChange={() => setAnswer(question, option)}
                                                style={{ width: 24, height: 24, flex: '0 0 auto' }}
                                            />
                                            <span>{option}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        )}

                        {question.mode === 'gap' && (
                            <input
                                value={value}
                                onChange={event => setAnswer(question, event.target.value)}
                                placeholder="Type one word or short phrase"
                                style={{
                                    marginTop: '0.65rem',
                                    minHeight: 42,
                                    width: '100%',
                                    borderRadius: 10,
                                    border: '1px solid rgba(148,163,184,0.45)',
                                    padding: '0.55rem 0.7rem',
                                    fontSize: '0.9rem',
                                }}
                            />
                        )}

                        {(question.mode === 'writing' || question.mode === 'speaking') && (
                            <textarea
                                value={value}
                                onChange={event => setDraft(question, event.target.value)}
                                placeholder={question.mode === 'speaking' ? 'Write your spoken answer plan, then practise aloud.' : 'Write your answer here.'}
                                rows={question.mode === 'speaking' ? 4 : 6}
                                style={{
                                    marginTop: '0.65rem',
                                    width: '100%',
                                    borderRadius: 10,
                                    border: '1px solid rgba(148,163,184,0.45)',
                                    padding: '0.7rem',
                                    fontSize: '0.9rem',
                                    lineHeight: 1.5,
                                    resize: 'vertical',
                                }}
                            />
                        )}

                        {showFeedback && (
                            <div
                                style={{
                                    marginTop: '0.7rem',
                                    borderRadius: 10,
                                    padding: '0.7rem',
                                    background: hasObjectiveAnswer
                                        ? isCorrect ? 'rgba(22,163,74,0.08)' : 'rgba(220,38,38,0.07)'
                                        : 'rgba(37,99,235,0.07)',
                                    border: hasObjectiveAnswer
                                        ? isCorrect ? '1px solid rgba(22,163,74,0.24)' : '1px solid rgba(220,38,38,0.22)'
                                        : '1px solid rgba(37,99,235,0.18)',
                                    color: '#334155',
                                    fontSize: '0.8rem',
                                    lineHeight: 1.55,
                                }}
                            >
                                {hasObjectiveAnswer && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 900, marginBottom: '0.3rem' }}>
                                        {isCorrect ? <CheckCircle2 size={16} color="#16a34a" /> : <XCircle size={16} color="#dc2626" />}
                                        {isCorrect ? 'Đúng' : `Đáp án đúng: ${question.correctAnswer}`}
                                    </div>
                                )}
                                <div>{question.explanation}</div>
                                <div style={{ marginTop: '0.35rem', color: '#475569' }}>
                                    Kinh nghiệm: {question.examinerTip}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {attempt.checked && task.sampleAnswer && (question.mode === 'writing' || question.mode === 'speaking') && (
                    <div
                        style={{
                            marginTop: '0.75rem',
                            borderRadius: 10,
                            padding: '0.75rem',
                            background: 'rgba(15,23,42,0.04)',
                            border: '1px solid rgba(15,23,42,0.08)',
                            whiteSpace: 'pre-wrap',
                            fontSize: '0.82rem',
                            lineHeight: 1.55,
                        }}
                    >
                        <div style={{ fontWeight: 900, marginBottom: '0.35rem' }}>Sample answer tự biên soạn</div>
                        {task.sampleAnswer}
                        {task.rubric && (
                            <div style={{ marginTop: '0.65rem', display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                                {task.rubric.map(item => (
                                    <span
                                        key={`${question.id}-${item}`}
                                        style={{
                                            borderRadius: 999,
                                            background: 'rgba(37,99,235,0.08)',
                                            color: '#1d4ed8',
                                            padding: '0.24rem 0.5rem',
                                            fontSize: '0.7rem',
                                            fontWeight: 850,
                                        }}
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div style={{ minHeight: '100dvh', background: 'var(--color-bg-child)', paddingBottom: '4rem' }}>
            <div className="page-container">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
                    <Link href="/child" style={{ textDecoration: 'none' }}>
                        <button className="btn btn-ghost btn-sm">
                            <ArrowLeft size={18} />
                            Back
                        </button>
                    </Link>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 850 }}>
                        Cambridge KET/PET • real practice engine
                    </span>
                </div>

                <section
                    style={{
                        borderRadius: 18,
                        padding: '1.1rem',
                        background: 'linear-gradient(135deg, rgba(37,99,235,0.10), rgba(22,163,74,0.09), rgba(245,158,11,0.08))',
                        border: '1px solid rgba(37,99,235,0.18)',
                        marginBottom: '1rem',
                    }}
                >
                    <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        <div
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: 14,
                                background: '#0f172a',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <GraduationCap size={26} />
                        </div>
                        <div style={{ flex: 1, minWidth: 240 }}>
                            <h1 style={{ fontSize: '1.42rem', fontWeight: 950, color: '#0f172a', lineHeight: 1.2 }}>
                                Cambridge KET/PET - giao trinh day va thi
                            </h1>
                            <p style={{ color: '#334155', fontSize: '0.86rem', lineHeight: 1.55, marginTop: '0.45rem' }}>
                                10 bộ đề A2 Key/KET và 10 bộ đề B1 Preliminary/PET, đủ cấu phần đọc, viết, nghe, nói,
                                có đáp án, diễn giải, transcript luyện nghe bằng TTS và kinh nghiệm sửa lỗi lâu dài.
                            </p>
                            <p style={{ color: '#7c2d12', fontSize: '0.78rem', lineHeight: 1.5, marginTop: '0.45rem', fontWeight: 750 }}>
                                Không sao chép đề chính thức. App bám 100% cấu trúc/đếm phần theo Cambridge hiện hành; đề, đáp án và giải thích trong app là nội dung luyện tập tự biên soạn.
                            </p>
                        </div>
                    </div>
                </section>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.65rem', marginBottom: '1rem' }}>
                    <div className="card" style={{ padding: '0.85rem', border: '1px solid rgba(37,99,235,0.14)' }}>
                        <div style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: 850 }}>Practice sets</div>
                        <div style={{ fontWeight: 950, fontSize: '1.35rem', color: '#1d4ed8' }}>{CAMBRIDGE_EXAM_PREP_STATS.totalPracticeSetCount}</div>
                        <div style={{ color: '#64748b', fontSize: '0.72rem' }}>10 KET + 10 PET</div>
                    </div>
                    <div className="card" style={{ padding: '0.85rem', border: '1px solid rgba(22,163,74,0.14)' }}>
                        <div style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: 850 }}>Current set</div>
                        <div style={{ fontWeight: 950, fontSize: '1.35rem', color: '#047857' }}>{setCounts.objectiveCount}</div>
                        <div style={{ color: '#64748b', fontSize: '0.72rem' }}>objective/gap auto-marked</div>
                    </div>
                    <div className="card" style={{ padding: '0.85rem', border: '1px solid rgba(245,158,11,0.18)' }}>
                        <div style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: 850 }}>Progress</div>
                        <div style={{ fontWeight: 950, fontSize: '1.35rem', color: '#c2410c' }}>{answeredObjectiveCount}/{objectiveQuestions.length}</div>
                        <div style={{ color: '#64748b', fontSize: '0.72rem' }}>answered before checking</div>
                    </div>
                </div>

                <div className="card" style={{ marginBottom: '1rem', padding: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem', fontWeight: 900 }}>
                        <Target size={18} color="#2563eb" />
                        Chọn chương trình
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.65rem' }}>
                        {CAMBRIDGE_EXAM_PROGRAMS.map(item => {
                            const active = programId === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => switchProgram(item.id)}
                                    style={{
                                        textAlign: 'left',
                                        borderRadius: 12,
                                        border: active ? '2px solid #2563eb' : '1px solid rgba(148,163,184,0.35)',
                                        background: active ? 'rgba(37,99,235,0.07)' : 'rgba(255,255,255,0.78)',
                                        padding: '0.8rem',
                                        cursor: 'pointer',
                                        minHeight: 104,
                                    }}
                                >
                                    <div style={{ fontWeight: 950, color: '#0f172a' }}>{item.shortName} - {item.officialName}</div>
                                    <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '0.25rem' }}>
                                        CEFR {item.cefr} • Scale {item.cambridgeScale} • {item.examLength}
                                    </div>
                                    <div style={{ color: '#334155', fontSize: '0.76rem', lineHeight: 1.45, marginTop: '0.4rem' }}>
                                        {item.officialBoundary}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="card" style={{ marginBottom: '1rem', padding: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
                        <div style={{ fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                            <FileText size={18} color="#0f766e" />
                            Chọn bộ đề {program.shortName}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '0.76rem' }}>{practiceSets.length} bộ đề tự biên soạn</div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.45rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                        {practiceSets.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setSetNo(item.setNo)}
                                style={{
                                    minWidth: 86,
                                    minHeight: 42,
                                    borderRadius: 999,
                                    border: item.setNo === setNo ? '2px solid #16a34a' : '1px solid rgba(148,163,184,0.35)',
                                    background: item.setNo === setNo ? 'rgba(22,163,74,0.09)' : 'white',
                                    color: item.setNo === setNo ? '#047857' : '#334155',
                                    fontWeight: 900,
                                    cursor: 'pointer',
                                }}
                            >
                                Set {item.setNo}
                            </button>
                        ))}
                    </div>
                </div>

                <section className="card" style={{ marginBottom: '1rem', padding: '0.95rem', border: '1px solid rgba(15,23,42,0.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <div>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 950, color: '#0f172a' }}>{selectedSet.titleVi}</h2>
                            <div style={{ color: '#64748b', fontSize: '0.78rem', marginTop: '0.2rem' }}>
                                {setCounts.taskCount} phần luyện • {setCounts.questionCount} câu/tác vụ • lưu tiến độ cục bộ
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                            <button className="btn btn-primary btn-sm" onClick={markChecked}>
                                <CheckCircle2 size={16} />
                                Chấm và giải thích
                            </button>
                            <button className="btn btn-ghost btn-sm" onClick={resetSet}>
                                <RotateCcw size={16} />
                                Làm lại set
                            </button>
                        </div>
                    </div>

                    {attempt.checked && (
                        <div
                            style={{
                                marginTop: '0.8rem',
                                borderRadius: 12,
                                background: correctObjectiveCount >= Math.ceil(objectiveQuestions.length * 0.75) ? 'rgba(22,163,74,0.08)' : 'rgba(245,158,11,0.10)',
                                border: '1px solid rgba(15,23,42,0.08)',
                                padding: '0.75rem',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
                                gap: '0.6rem',
                            }}
                        >
                            <div>
                                <div style={{ fontWeight: 950, color: '#0f172a' }}>Điểm tự động</div>
                                <div style={{ color: '#334155', fontSize: '0.86rem' }}>{correctObjectiveCount}/{objectiveQuestions.length} câu objective/gap</div>
                            </div>
                            <div>
                                <div style={{ fontWeight: 950, color: '#0f172a' }}>Lỗi cần ôn</div>
                                <div style={{ color: '#334155', fontSize: '0.86rem' }}>{wrongQuestions.length} mục có kinh nghiệm sửa lỗi bên dưới</div>
                            </div>
                        </div>
                    )}
                </section>

                <section className="card" style={{ marginBottom: '1rem', padding: '0.95rem' }}>
                    <div style={{ fontWeight: 950, display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.65rem' }}>
                        <BookOpen size={18} color="#2563eb" />
                        Format chính thức đã đối chiếu
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '0.55rem' }}>
                        {program.componentSpecs.map(spec => {
                            const tone = skillTone[spec.skill];
                            return (
                                <div
                                    key={spec.skill}
                                    style={{
                                        borderRadius: 12,
                                        border: `1px solid ${tone.border}`,
                                        background: tone.bg,
                                        padding: '0.7rem',
                                    }}
                                >
                                    <div style={{ fontWeight: 950, color: tone.fg }}>{spec.label}</div>
                                    <div style={{ color: '#334155', fontSize: '0.76rem', marginTop: '0.25rem', lineHeight: 1.45 }}>
                                        {spec.parts} parts • {spec.questions} questions • {spec.duration} • {spec.weight}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '0.55rem', marginTop: '0.75rem' }}>
                        {officialSources.map(source => (
                            <a
                                key={source.id}
                                href={source.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    textDecoration: 'none',
                                    borderRadius: 12,
                                    border: '1px solid rgba(15,23,42,0.08)',
                                    background: 'rgba(15,23,42,0.025)',
                                    padding: '0.7rem',
                                    color: '#0f172a',
                                    minHeight: 96,
                                }}
                            >
                                <div style={{ fontWeight: 900, fontSize: '0.82rem' }}>{source.title}</div>
                                <div style={{ color: '#64748b', fontSize: '0.72rem', marginTop: '0.2rem' }}>{source.provider}</div>
                                <div style={{ color: '#475569', fontSize: '0.72rem', lineHeight: 1.4, marginTop: '0.35rem' }}>{source.evidenceUse}</div>
                            </a>
                        ))}
                    </div>
                </section>

                <section
                    style={{
                        borderRadius: 14,
                        border: '1px solid rgba(245,158,11,0.22)',
                        background: 'rgba(255,251,235,0.7)',
                        padding: '0.85rem',
                        marginBottom: '1rem',
                        color: '#7c2d12',
                        fontSize: '0.8rem',
                        lineHeight: 1.55,
                    }}
                >
                    <strong>Ranh giới bằng chứng:</strong> {selectedSet.sourceBoundary} Muốn làm bài official sample hoặc xem answer key Cambridge chính thức thì mở các link nguồn ở trên.
                </section>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    {selectedSet.components.map(component => {
                        const tone = skillTone[component.skill];
                        return (
                            <section key={component.skill} style={{ display: 'grid', gap: '0.75rem' }}>
                                <div
                                    style={{
                                        borderRadius: 14,
                                        border: `1px solid ${tone.border}`,
                                        background: tone.bg,
                                        padding: '0.8rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        gap: '0.75rem',
                                        flexWrap: 'wrap',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div>
                                        <div style={{ fontWeight: 950, color: tone.fg }}>{component.label}</div>
                                        <div style={{ color: '#334155', fontSize: '0.76rem' }}>{component.duration} • {component.weight}</div>
                                    </div>
                                    <span style={{ color: tone.fg, fontSize: '0.76rem', fontWeight: 900 }}>
                                        {component.tasks.length} parts
                                    </span>
                                </div>

                                {component.tasks.map(task => (
                                    <article key={task.id} className="card" style={{ padding: '0.95rem', border: '1px solid rgba(15,23,42,0.08)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.8rem', flexWrap: 'wrap' }}>
                                            <div style={{ flex: 1, minWidth: 220 }}>
                                                <div style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: 900 }}>{task.officialPart}</div>
                                                <h3 style={{ fontSize: '1rem', fontWeight: 950, color: '#0f172a', marginTop: '0.2rem' }}>{task.title}</h3>
                                                <p style={{ color: '#475569', fontSize: '0.8rem', lineHeight: 1.5, marginTop: '0.3rem' }}>{task.instructions}</p>
                                            </div>
                                            {task.transcript && (
                                                <button
                                                    className="btn btn-ghost btn-sm"
                                                    onClick={() => speakTranscript(task.transcript ?? '')}
                                                    title="Play transcript with browser speech"
                                                >
                                                    <Volume2 size={16} />
                                                    Play transcript
                                                </button>
                                            )}
                                        </div>

                                        {task.text && (
                                            <div
                                                style={{
                                                    marginTop: '0.75rem',
                                                    borderRadius: 12,
                                                    border: '1px solid rgba(148,163,184,0.24)',
                                                    background: 'rgba(248,250,252,0.78)',
                                                    padding: '0.75rem',
                                                    color: '#334155',
                                                    lineHeight: 1.58,
                                                    fontSize: '0.84rem',
                                                    whiteSpace: 'pre-wrap',
                                                }}
                                            >
                                                {task.text}
                                            </div>
                                        )}

                                        {task.transcript && (
                                            <details style={{ marginTop: '0.65rem' }}>
                                                <summary style={{ cursor: 'pointer', fontSize: '0.78rem', color: '#475569', fontWeight: 850 }}>
                                                    Show transcript
                                                </summary>
                                                <div
                                                    style={{
                                                        marginTop: '0.5rem',
                                                        borderRadius: 10,
                                                        background: 'rgba(15,23,42,0.04)',
                                                        padding: '0.65rem',
                                                        color: '#475569',
                                                        lineHeight: 1.55,
                                                        fontSize: '0.8rem',
                                                    }}
                                                >
                                                    {task.transcript}
                                                </div>
                                            </details>
                                        )}

                                        {task.questions.map((question, index) => renderQuestion(task, question, index))}
                                    </article>
                                ))}
                            </section>
                        );
                    })}
                </div>

                {attempt.checked && wrongQuestions.length > 0 && (
                    <section className="card" style={{ marginTop: '1rem', padding: '0.95rem', border: '1px solid rgba(220,38,38,0.18)' }}>
                        <div style={{ fontWeight: 950, color: '#991b1b', marginBottom: '0.55rem' }}>Sổ kinh nghiệm cần ôn lại</div>
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            {wrongQuestions.slice(0, 12).map(question => (
                                <div key={`wrong-${question.id}`} style={{ color: '#334155', fontSize: '0.8rem', lineHeight: 1.5 }}>
                                    <strong>{question.skillFocus}:</strong> {question.examinerTip}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
