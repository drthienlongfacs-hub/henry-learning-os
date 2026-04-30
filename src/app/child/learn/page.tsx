'use client';

import { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, BookOpen, Calculator, Globe2, FlaskConical, Brain, ChevronRight, RotateCcw, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { MATH_TOPICS, generateMathSet, type MathProblem } from '@/lib/content/math-generator';
import { VIETNAMESE_TOPICS, generateVietnameseSet, type VietnameseProblem } from '@/lib/content/vietnamese-generator';
import { ENGLISH_TOPICS, generateEnglishSet, type EnglishProblem } from '@/lib/content/english-generator';
import { SCIENCE_TOPICS, generateScienceSet, type ScienceProblem } from '@/lib/content/science-generator';
import { HISGEO_TOPICS, generateHisGeoSet, type HisGeoProblem } from '@/lib/content/history-geo-generator';
import { COMPUTING_TOPICS, generateComputingSet, type ComputingProblem } from '@/lib/content/computing-generator';
import { useAppStore } from '@/stores/app-store';
import { ResourceAttribution } from '@/components/ResourceAttribution';
import {
    ENRICHMENT_STATS,
    getAttributionForSource,
    getSubjectEnrichment,
    getTopicEnrichment,
    type LearningSubjectKey,
} from '@/data/curriculum-enrichment';
import {
    LEARNING_SYSTEM_STATS,
    LESSON_MODE_CONFIG,
    getLessonModeConfig,
    getSubjectBenchmarkPatterns,
    getSubjectGoldStandards,
    getTopicLearningBlueprint,
    type LessonDepth,
} from '@/data/learning-benchmark-system';
import {
    getTopicLearningPlan,
    summarizeSubjectPlan,
    type LearningPathStatus,
} from '@/lib/learning-path-advisor';
import { createReviewItem } from '@/lib/spaced-repetition';
import { buildTopicEvidenceProfile } from '@/lib/evidence/learning-evidence';
import { buildQuestionPresentationPlan } from '@/lib/pedagogy/question-presentation';
import { generateTutorTurn, type TutorTurn } from '@/lib/ai/tutor-engine';
import { emitLearningEvent } from '@/lib/events/learning-events';
import {
    attachCurriculumAuditSet,
    buildAttemptCurriculumEvidence,
    type CurriculumMappedProblem,
} from '@/lib/curriculum/item-audit';
import type { PrimaryCurriculumSubjectKey } from '@/data/primary-curriculum-map';

// ── Types ──
type Subject = 'math' | 'vietnamese' | 'english' | 'science' | 'hisgeo' | 'computing' | 'elite';
type GeneratedProblem = MathProblem | VietnameseProblem | EnglishProblem | ScienceProblem | HisGeoProblem | ComputingProblem;
type Problem = CurriculumMappedProblem<GeneratedProblem>;
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

const SUBJECT_ENRICHMENT_KEY: Record<Subject, LearningSubjectKey> = {
    math: 'math',
    vietnamese: 'vietnamese',
    english: 'english',
    science: 'science',
    hisgeo: 'hisgeo',
    computing: 'computing',
    elite: 'elite',
};

const PRIMARY_CURRICULUM_SUBJECTS: PrimaryCurriculumSubjectKey[] = ['math', 'vietnamese', 'english', 'science', 'hisgeo', 'computing'];

function isPrimaryCurriculumSubject(subj: Subject): subj is PrimaryCurriculumSubjectKey {
    return PRIMARY_CURRICULUM_SUBJECTS.includes(subj as PrimaryCurriculumSubjectKey);
}

const withBasePath = (src: string) =>
    src.startsWith('/') ? `${process.env.NODE_ENV === 'production' ? '/henry-learning-os' : ''}${src}` : src;

const planColor: Record<LearningPathStatus, { bg: string; fg: string; border: string }> = {
    new: { bg: '#f8fafc', fg: '#475569', border: '#e2e8f0' },
    repair: { bg: '#fef2f2', fg: '#b91c1c', border: '#fecaca' },
    practice: { bg: '#fff7ed', fg: '#c2410c', border: '#fed7aa' },
    ready: { bg: '#eff6ff', fg: '#1d4ed8', border: '#bfdbfe' },
    stretch: { bg: '#ecfdf5', fg: '#047857', border: '#a7f3d0' },
};

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
    const [hintLevelUsed, setHintLevelUsed] = useState(0);
    const [lessonDepth, setLessonDepth] = useState<LessonDepth>('deep');
    const startTime = useRef(0);

    const { addAttempt, addMistake, addReviewSchedule, addAIInteractionLog, childProfile, attempts, mistakes, reviewSchedules } = useAppStore();
    const activeMode = getLessonModeConfig(lessonDepth);
    const modeOptions = Object.values(LESSON_MODE_CONFIG);

    const startExercise = useCallback((subj: Subject, g: number, topicKey?: string) => {
        let p: GeneratedProblem[] = [];
        const count = getLessonModeConfig(lessonDepth).count;
        if (subj === 'math') p = generateMathSet(g, topicKey, count);
        else if (subj === 'vietnamese') p = generateVietnameseSet(g, topicKey, count);
        else if (subj === 'english') p = generateEnglishSet(g, topicKey, count);
        else if (subj === 'science') p = generateScienceSet(g, topicKey, count);
        else if (subj === 'hisgeo') p = generateHisGeoSet(g, topicKey, count);
        else if (subj === 'computing') p = generateComputingSet(g, topicKey, count);
        setProblems(isPrimaryCurriculumSubject(subj) ? attachCurriculumAuditSet(subj, p) : []);
        setIndex(0); setSelected(null); setScore(0); setShowHint(false); setHintLevelUsed(0);
        startTime.current = Date.now();
    }, [lessonDepth]);

    // Record analytics
    const handleAnswer = useCallback((answer: string) => {
        if (selected) return;
        setSelected(answer);
        const p = problems[index];
        const isCorrect = answer === p.correctAnswer;
        if (isCorrect) setScore(s => s + 10);

        const timeSpent = Math.round((Date.now() - (startTime.current || Date.now())) / 1000);
        if (childProfile) {
            const attemptId = `att-${Date.now()}`;
            const curriculumEvidence = buildAttemptCurriculumEvidence(p);
            addAttempt({
                id: attemptId, childId: childProfile.id, lessonId: p.id,
                competencyId: p.topicKey, exerciseId: p.id, answer,
                isCorrect, errorType: isCorrect ? null : 'concept',
                hintLevelUsed, timeSpentSeconds: timeSpent,
                confidenceSelfRating: 3, aiRoleUsed: 'tutor',
                curriculum: curriculumEvidence,
                createdAt: new Date().toISOString(),
            });
            emitLearningEvent({
                childId: childProfile.id,
                verb: isCorrect ? 'completed' : 'attempted',
                object: `exercise:${p.id}`,
                module: subject ? SUBJECT_ENRICHMENT_KEY[subject] : 'learning',
                resourceProvider: 'internal',
                success: isCorrect,
                score: isCorrect ? 1 : 0,
                durationSec: timeSpent,
                confidence: 0.6,
                aiAssistanceLevel: hintLevelUsed > 0 ? `hint_L${hintLevelUsed}` : undefined,
                curriculumMapId: curriculumEvidence?.curriculumMapId,
                curriculumSourceVersion: curriculumEvidence?.curriculumSourceVersion,
                curriculumOfficialStrand: curriculumEvidence?.curriculumOfficialStrand,
                curriculumReviewStatus: curriculumEvidence?.curriculumReviewStatus,
            });
            addAIInteractionLog({
                id: `ai-${Date.now()}`,
                childId: childProfile.id,
                sessionId: `learn-${p.topicKey}`,
                role: 'tutor',
                subject: subject ? SUBJECT_ENRICHMENT_KEY[subject] : 'learning',
                ageBand: `grade-${grade}`,
                supportLevel: 'feedback',
                safetyFlags: [],
                responseQualityScore: 0.82,
                createdAt: new Date().toISOString(),
            });
            const hasPendingCompetencyReview = reviewSchedules.some((review) =>
                review.childId === childProfile.id &&
                review.itemType === 'competency' &&
                review.itemId === p.topicKey &&
                (review.lastResult === null || new Date(review.scheduledAt) > new Date())
            );
            if (!hasPendingCompetencyReview) {
                addReviewSchedule(createReviewItem(childProfile.id, 'competency', p.topicKey));
            }
            if (!isCorrect) {
                const mistakeId = `mis-${Date.now()}`;
                addMistake({
                    id: mistakeId, childId: childProfile.id,
                    competencyId: p.topicKey, attemptId,
                    errorType: 'concept', explanation: p.explanation,
                    correctionPlan: `Ôn lại chủ đề: ${p.topic}`,
                    reviewSchedule: [], resolvedAt: null,
                });
                addReviewSchedule(createReviewItem(childProfile.id, 'mistake', mistakeId));
            }
        }
    }, [selected, problems, index, childProfile, reviewSchedules, hintLevelUsed, addAttempt, addAIInteractionLog, addMistake, addReviewSchedule, subject, grade]);

    const nextProblem = () => {
        setSelected(null); setShowHint(false); setHintLevelUsed(0);
        setIndex(i => i + 1);
        startTime.current = Date.now();
    };

    const currentProblem = problems[index] as ProblemWithViz;
    const currentEnrichment = currentProblem?.topicKey
        ? getTopicEnrichment(currentProblem.topicKey, subject ? SUBJECT_ENRICHMENT_KEY[subject] : undefined)
        : null;
    const currentVisual = typeof currentProblem?.illustration === 'string'
        ? currentProblem.illustration
        : currentEnrichment?.visual.src;
    const activeSubjectPack = subject ? getSubjectEnrichment(SUBJECT_ENRICHMENT_KEY[subject]) : null;
    const activeStandards = subject ? getSubjectGoldStandards(SUBJECT_ENRICHMENT_KEY[subject]) : [];
    const activeBenchmarks = subject ? getSubjectBenchmarkPatterns(SUBJECT_ENRICHMENT_KEY[subject]) : [];
    const currentBlueprint = currentProblem?.topicKey
        ? getTopicLearningBlueprint(currentProblem.topicKey, subject ? SUBJECT_ENRICHMENT_KEY[subject] : undefined)
        : null;
    const currentEvidenceProfile = currentProblem?.topicKey && subject
        ? buildTopicEvidenceProfile({
            topicKey: currentProblem.topicKey,
            subject: SUBJECT_ENRICHMENT_KEY[subject],
            attempts,
            mistakes,
            reviewSchedules,
        })
        : null;
    const currentQuestionPlan = currentProblem && subject
        ? buildQuestionPresentationPlan({
            subject: SUBJECT_ENRICHMENT_KEY[subject],
            problem: currentProblem,
            evidenceProfile: currentEvidenceProfile ?? undefined,
        })
        : null;
    const currentTutorProblem = currentProblem
        ? {
            question: currentProblem.question,
            correctAnswer: currentProblem.correctAnswer,
            explanation: currentProblem.explanation,
            topic: currentProblem.topic,
            topicKey: currentProblem.topicKey,
            type: currentProblem.type,
            options: currentProblem.options,
            hints: currentProblem.hints,
        }
        : null;
    const currentTutorHintTurn: TutorTurn | null = currentTutorProblem && subject && currentQuestionPlan
        ? generateTutorTurn({
            subject: SUBJECT_ENRICHMENT_KEY[subject],
            problem: currentTutorProblem,
            hintLevel: hintLevelUsed,
            evidenceProfile: currentEvidenceProfile ?? undefined,
            presentationPlan: currentQuestionPlan,
            revealAnswerAllowed: false,
        })
        : null;
    const currentTutorFeedbackTurn: TutorTurn | null = currentTutorProblem && subject && currentQuestionPlan && selected
        ? generateTutorTurn({
            subject: SUBJECT_ENRICHMENT_KEY[subject],
            problem: currentTutorProblem,
            hintLevel: hintLevelUsed,
            childAnswer: selected,
            evidenceProfile: currentEvidenceProfile ?? undefined,
            presentationPlan: currentQuestionPlan,
            revealAnswerAllowed: false,
        })
        : null;
    const requestTutorHint = () => {
        if (!currentProblem || !subject || !childProfile) {
            setHintLevelUsed((level) => Math.max(1, Math.min(5, level + 1)));
            setShowHint(true);
            return;
        }
        const nextLevel = showHint ? Math.min(5, hintLevelUsed + 1) : Math.max(1, hintLevelUsed);
        setHintLevelUsed(nextLevel);
        setShowHint(true);
        addAIInteractionLog({
            id: `ai-${Date.now()}`,
            childId: childProfile.id,
            sessionId: `learn-${currentProblem.topicKey}`,
            role: 'tutor',
            subject: SUBJECT_ENRICHMENT_KEY[subject],
            ageBand: `grade-${grade}`,
            supportLevel: nextLevel <= 1 ? 'hint_light' : nextLevel === 2 ? 'hint_medium' : nextLevel === 3 ? 'explanation' : nextLevel === 4 ? 'worked_example' : 'feedback',
            safetyFlags: [],
            responseQualityScore: currentEvidenceProfile?.reliability === 'strong' ? 0.9 : 0.82,
            createdAt: new Date().toISOString(),
        });
    };
    const currentPhase = problems.length > 0
        ? activeMode.phases[Math.min(activeMode.phases.length - 1, Math.floor(index / Math.max(1, Math.ceil(problems.length / activeMode.phases.length))))]
        : activeMode.phases[0];
    const topics = subject === 'math' ? MATH_TOPICS.filter(t => t.gradeLevel === grade)
        : subject === 'vietnamese' ? VIETNAMESE_TOPICS.filter(t => t.gradeLevel <= grade)
            : subject === 'english' ? ENGLISH_TOPICS.filter(t => t.gradeLevel <= grade)
                : subject === 'science' ? SCIENCE_TOPICS.filter(t => t.gradeLevel <= grade)
                    : subject === 'hisgeo' ? HISGEO_TOPICS.filter(t => t.gradeLevel <= grade)
                        : subject === 'computing' ? COMPUTING_TOPICS.filter(t => t.gradeLevel <= grade)
                            : [];
    const activeSubjectSummary = subject
        ? summarizeSubjectPlan(SUBJECT_ENRICHMENT_KEY[subject], topics.map(t => t.key), attempts)
        : null;

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
                    <>
                        <div style={{ ...glass.card, marginBottom: 16, background: 'rgba(255,255,255,0.62)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 800, color: '#4338ca', textTransform: 'uppercase', letterSpacing: 0.4 }}>
                                        Learning engine
                                    </div>
                                    <div style={{ fontSize: 17, fontWeight: 900, color: '#1e1b4b', marginTop: 4 }}>
                                        {ENRICHMENT_STATS.sourceCount} nguồn, {LEARNING_SYSTEM_STATS.goldStandardLinks} chuẩn đối chiếu, {LEARNING_SYSTEM_STATS.benchmarkLinks} benchmark thực tế, {LEARNING_SYSTEM_STATS.explicitTopicBlueprints} chủ đề có blueprint
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                    {['Chuẩn vàng', 'Mastery', 'Diagnostic', 'Tư duy nâng cao'].map((label) => (
                                        <span key={label} style={{ padding: '7px 10px', borderRadius: 999, background: '#eef2ff', color: '#3730a3', fontSize: 12, fontWeight: 800 }}>
                                            {label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div style={{ ...glass.card, marginBottom: 16, background: 'rgba(255,255,255,0.58)' }}>
                            <div style={{ fontSize: 13, fontWeight: 850, color: '#334155', marginBottom: 10 }}>Chọn nhịp học</div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 }}>
                                {modeOptions.map(mode => {
                                    const active = lessonDepth === mode.key;
                                    return (
                                        <button key={mode.key} onClick={() => setLessonDepth(mode.key)} style={{
                                            border: active ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                                            background: active ? '#eef2ff' : 'rgba(255,255,255,0.68)',
                                            color: '#1e1b4b',
                                            borderRadius: 14,
                                            padding: 12,
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                        }}>
                                            <div style={{ fontWeight: 900, fontSize: 14 }}>{mode.label} · {mode.count} câu</div>
                                            <div style={{ fontSize: 12, lineHeight: 1.4, color: '#475569', marginTop: 4 }}>{mode.description}</div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                            {SUBJECTS.map(s => {
                                const pack = getSubjectEnrichment(SUBJECT_ENRICHMENT_KEY[s.key]);
                                return (
                                    <div key={s.key} style={{ ...glass.card, cursor: 'pointer', textAlign: 'left', transition: 'transform .2s' }}
                                        onClick={() => { if (s.key === 'elite') { router.push('/child/elite'); return; } setSubject(s.key); setGrade(s.grades[0]); }}
                                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                            <div style={{ width: 56, height: 56, borderRadius: 16, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flex: '0 0 auto' }}>
                                                {s.icon}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 800, fontSize: 16 }}>{s.name}</div>
                                                <div style={{ fontSize: 12, color: '#666', marginTop: 3 }}>Lớp {s.grades.join(', ')}</div>
                                            </div>
                                        </div>
                                        <div style={{ fontSize: 13, lineHeight: 1.45, color: '#334155', fontWeight: 650 }}>
                                            {pack.headline}
                                        </div>
                                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
                                            {getSubjectBenchmarkPatterns(SUBJECT_ENRICHMENT_KEY[s.key]).slice(0, 2).map(item => (
                                                <span key={item.product} style={{ padding: '5px 8px', borderRadius: 999, background: `${s.color}18`, color: s.color, fontSize: 11, fontWeight: 800 }}>
                                                    {item.product}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

                {/* ════ GRADE + TOPIC SELECTION ════ */}
                {subject && problems.length === 0 && (
                    <div>
                        {activeSubjectPack && (
                            <div style={{ ...glass.card, marginBottom: 16, display: 'flex', gap: 14, alignItems: 'center', background: 'rgba(255,255,255,0.62)' }}>
                                <Image src={withBasePath(activeSubjectPack.defaultVisual)} alt="" width={76} height={76} unoptimized style={{ width: 76, height: 76, objectFit: 'cover', borderRadius: 16, border: '1px solid rgba(15,23,42,0.08)' }} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 18, fontWeight: 900, color: '#1e1b4b' }}>{activeSubjectPack.label}</div>
                                    <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.45, marginTop: 4 }}>{activeSubjectPack.coverage}</div>
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                                        {activeSubjectPack.sessionRhythm.slice(0, 3).map(move => (
                                            <span key={move} style={{ padding: '5px 8px', borderRadius: 999, background: '#f8fafc', border: '1px solid #e2e8f0', color: '#334155', fontSize: 11, fontWeight: 750 }}>
                                                {move}
                                            </span>
                                        ))}
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 8, marginTop: 12 }}>
                                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 10 }}>
                                            <div style={{ fontSize: 11, fontWeight: 900, color: '#475569', textTransform: 'uppercase' }}>Chuẩn đối chiếu</div>
                                            <div style={{ fontSize: 12, color: '#334155', lineHeight: 1.35, marginTop: 4 }}>
                                                {activeStandards.slice(0, 2).map(s => s.label).join(' · ')}
                                            </div>
                                        </div>
                                        <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 12, padding: 10 }}>
                                            <div style={{ fontSize: 11, fontWeight: 900, color: '#9a3412', textTransform: 'uppercase' }}>Benchmark</div>
                                            <div style={{ fontSize: 12, color: '#9a3412', lineHeight: 1.35, marginTop: 4 }}>
                                                {activeBenchmarks.slice(0, 2).map(b => `${b.product}: ${b.pattern}`).join(' · ')}
                                            </div>
                                        </div>
                                    </div>
                                    {activeSubjectSummary && (
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 8, marginTop: 12 }}>
                                            {[
                                                ['Cần sửa', activeSubjectSummary.repairCount],
                                                ['Chưa học', activeSubjectSummary.unseenCount],
                                                ['Nâng cao', activeSubjectSummary.stretchCount],
                                            ].map(([label, value]) => (
                                                <div key={label} style={{ background: 'rgba(255,255,255,0.68)', border: '1px solid #e2e8f0', borderRadius: 12, padding: 10 }}>
                                                    <div style={{ fontSize: 11, color: '#64748b', fontWeight: 900 }}>{label}</div>
                                                    <div style={{ fontSize: 18, color: '#1e1b4b', fontWeight: 900, marginTop: 2 }}>{value}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <div style={{ ...glass.card, marginBottom: 16, background: 'rgba(255,255,255,0.58)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                                <div>
                                    <div style={{ fontSize: 13, fontWeight: 900, color: '#334155' }}>Nhịp học đang chọn: {activeMode.label}</div>
                                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{activeMode.sessionPromise}</div>
                                </div>
                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                    {modeOptions.map(mode => (
                                        <button key={mode.key} onClick={() => setLessonDepth(mode.key)} style={{
                                            padding: '7px 10px',
                                            borderRadius: 999,
                                            border: lessonDepth === mode.key ? '2px solid #4f46e5' : '1px solid #cbd5e1',
                                            background: lessonDepth === mode.key ? '#eef2ff' : '#fff',
                                            color: '#334155',
                                            fontWeight: 850,
                                            cursor: 'pointer',
                                            fontSize: 12,
                                        }}>
                                            {mode.label} · {mode.count}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

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
                                {topics.map(t => {
                                    const enrich = getTopicEnrichment(t.key, SUBJECT_ENRICHMENT_KEY[subject]);
                                    const blueprint = getTopicLearningBlueprint(t.key, SUBJECT_ENRICHMENT_KEY[subject]);
                                    const plan = getTopicLearningPlan(t.key, SUBJECT_ENRICHMENT_KEY[subject], attempts);
                                    const evidence = buildTopicEvidenceProfile({
                                        topicKey: t.key,
                                        subject: SUBJECT_ENRICHMENT_KEY[subject],
                                        attempts,
                                        mistakes,
                                        reviewSchedules,
                                    });
                                    const statusColor = planColor[plan.status];
                                    return (
                                        <div key={t.key} style={{ ...glass.card, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, cursor: 'pointer', transition: 'transform .2s' }}
                                            onClick={() => { setSelectedTopic(t.key); startExercise(subject, grade, t.key); }}
                                            onMouseEnter={e => (e.currentTarget.style.transform = 'translateX(4px)')}
                                            onMouseLeave={e => (e.currentTarget.style.transform = 'translateX(0)')}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                                                <Image src={withBasePath(enrich.visual.src)} alt="" width={58} height={58} unoptimized style={{ width: 58, height: 58, borderRadius: 14, objectFit: 'cover', border: '1px solid rgba(15,23,42,0.08)', flex: '0 0 auto' }} />
                                                <div style={{ minWidth: 0 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                                        <span style={{ fontSize: 24 }}>{t.icon}</span>
                                                        <span style={{ fontWeight: 800, fontSize: 15 }}>{t.name}</span>
                                                    </div>
                                                    <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>Lớp {t.gradeLevel} • {activeMode.count} câu • {activeMode.label}</div>
                                                    <div style={{ fontSize: 12, color: '#334155', marginTop: 6, lineHeight: 1.4 }}>
                                                        {blueprint.bigIdea}
                                                    </div>
                                                    <div style={{ fontSize: 12, color: '#475569', marginTop: 4, lineHeight: 1.4 }}>
                                                        {enrich.masteryTargets[0]}
                                                    </div>
                                                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 8 }}>
                                                        {blueprint.benchmarkPatterns.slice(0, 2).map(item => (
                                                            <span key={item.product} style={{ padding: '4px 7px', borderRadius: 999, background: '#f8fafc', border: '1px solid #e2e8f0', color: '#334155', fontSize: 10, fontWeight: 850 }}>
                                                                {item.product}
                                                            </span>
                                                        ))}
                                                        <span style={{ padding: '4px 7px', borderRadius: 999, background: statusColor.bg, border: `1px solid ${statusColor.border}`, color: statusColor.fg, fontSize: 10, fontWeight: 850 }}>
                                                            {plan.label}{plan.accuracy !== null ? ` · ${plan.accuracy}%` : ''}
                                                        </span>
                                                    </div>
                                                    <div style={{ fontSize: 11, color: '#64748b', marginTop: 7, lineHeight: 1.35 }}>
                                                        Gợi ý tiếp: {plan.nextAction}
                                                    </div>
                                                    <div style={{ fontSize: 11, color: '#0f766e', marginTop: 6, lineHeight: 1.35 }}>
                                                        Dữ liệu thật: {evidence.challengeFitLabel} · {evidence.evidenceSummary}
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronRight size={20} color="#999" style={{ flex: '0 0 auto' }} />
                                        </div>
                                    );
                                })}
                                {/* Play all topics button */}
                                <button style={{ ...glass.btn(SUBJECTS.find(s => s.key === subject)!.color), width: '100%', justifyContent: 'center', marginTop: 8 }}
                                    onClick={() => startExercise(subject, grade)}>
                                    Luyện tập hỗn hợp lớp {grade} ({activeMode.count} câu)
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

                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 14, padding: 12, marginBottom: 16 }}>
                            <div>
                                <div style={{ fontSize: 11, color: '#64748b', fontWeight: 900, textTransform: 'uppercase' }}>Pha học hiện tại</div>
                                <div style={{ fontSize: 15, color: '#1e1b4b', fontWeight: 900, marginTop: 3 }}>{currentPhase}</div>
                            </div>
                            <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.4, maxWidth: 360 }}>
                                {activeMode.sessionPromise}
                            </div>
                        </div>

                        {currentQuestionPlan && (
                            <div style={{ background: '#ffffffcc', border: '1px solid #dbeafe', borderRadius: 16, padding: 14, marginBottom: 18 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 900, color: '#1d4ed8', textTransform: 'uppercase' }}>Cách trình bày câu hỏi</div>
                                        <div style={{ fontSize: 15, fontWeight: 900, color: '#1e293b', marginTop: 3 }}>{currentQuestionPlan.focus}</div>
                                    </div>
                                    <div style={{ fontSize: 11, color: '#475569', lineHeight: 1.35, maxWidth: 260 }}>
                                        {currentQuestionPlan.supportRule}
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 8 }}>
                                    {currentQuestionPlan.beforeAnswer.map((step) => (
                                        <div key={step.label} style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: 10 }}>
                                            <div style={{ fontSize: 11, fontWeight: 900, color: '#1d4ed8' }}>{step.label}</div>
                                            <div style={{ fontSize: 12, color: '#334155', lineHeight: 1.35, marginTop: 4 }}>{step.prompt}</div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 8, marginTop: 10 }}>
                                    <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.4, background: '#f8fafc', borderRadius: 12, padding: 10 }}>
                                        Dữ liệu: {currentQuestionPlan.dataSignal}
                                    </div>
                                    <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.4, background: '#f0fdf4', borderRadius: 12, padding: 10 }}>
                                        Benchmark: {currentQuestionPlan.benchmarkSignal}
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentProblem.curriculum && (
                            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 16, padding: 14, marginBottom: 18 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 900, color: '#047857', textTransform: 'uppercase' }}>Audit CTGDPT trên từng câu</div>
                                        <div style={{ fontSize: 15, fontWeight: 900, color: '#064e3b', marginTop: 3 }}>
                                            {currentProblem.curriculum.subjectLabel} lớp {currentProblem.curriculum.curriculumGrade} · {currentProblem.curriculum.topicName}
                                        </div>
                                    </div>
                                    <div style={{ fontSize: 11, color: '#166534', lineHeight: 1.35, maxWidth: 280 }}>
                                        {currentProblem.curriculum.curriculumMapId} · {currentProblem.curriculum.curriculumReviewStatus}
                                    </div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 8 }}>
                                    <div style={{ fontSize: 12, color: '#14532d', lineHeight: 1.4, background: '#ffffffb8', borderRadius: 12, padding: 10 }}>
                                        Mạch: {currentProblem.curriculum.curriculumOfficialStrand}
                                    </div>
                                    <div style={{ fontSize: 12, color: '#14532d', lineHeight: 1.4, background: '#ffffffb8', borderRadius: 12, padding: 10 }}>
                                        Minh chứng lưu: {currentProblem.curriculum.requiredAttemptEvidence.slice(0, 3).join(' · ')}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Passage (for reading) */}
                        {'passage' in currentProblem && (currentProblem as VietnameseProblem).passage && (
                            <div style={{ background: 'rgba(139,92,246,0.08)', borderRadius: 12, padding: 16, marginBottom: 16, fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                                {(currentProblem as VietnameseProblem).passage}
                            </div>
                        )}

                        {/* Illustration */}
                        {currentVisual && (
                            <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
                                {typeof currentProblem.illustration !== 'object' ? (
                                    <Image
                                        src={withBasePath(currentVisual)}
                                        alt={currentEnrichment?.visual.alt || 'Minh hoạ học tập'}
                                        width={520}
                                        height={260}
                                        unoptimized
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

                        {currentEnrichment && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                                gap: 10,
                                marginBottom: 20,
                            }}>
                                <div style={{ background: '#f8fafc', borderRadius: 14, padding: 12, border: '1px solid #e2e8f0' }}>
                                    <div style={{ fontSize: 11, color: '#64748b', fontWeight: 850, textTransform: 'uppercase', marginBottom: 6 }}>Mục tiêu</div>
                                    <div style={{ fontSize: 13, color: '#334155', fontWeight: 750, lineHeight: 1.35 }}>{currentEnrichment.masteryTargets[0]}</div>
                                </div>
                                <div style={{ background: '#f0fdf4', borderRadius: 14, padding: 12, border: '1px solid #bbf7d0' }}>
                                    <div style={{ fontSize: 11, color: '#15803d', fontWeight: 850, textTransform: 'uppercase', marginBottom: 6 }}>Cách học</div>
                                    <div style={{ fontSize: 13, color: '#166534', fontWeight: 750, lineHeight: 1.35 }}>{currentEnrichment.lessonMoves[0]}</div>
                                </div>
                                <div style={{ background: '#fff7ed', borderRadius: 14, padding: 12, border: '1px solid #fed7aa' }}>
                                    <div style={{ fontSize: 11, color: '#c2410c', fontWeight: 850, textTransform: 'uppercase', marginBottom: 6 }}>Benchmark</div>
                                    <div style={{ fontSize: 13, color: '#9a3412', fontWeight: 750, lineHeight: 1.35 }}>{currentEnrichment.benchmarkTags[0]}</div>
                                </div>
                            </div>
                        )}

                        {currentBlueprint && (
                            <div style={{ background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(148,163,184,0.32)', borderRadius: 16, padding: 14, marginBottom: 20 }}>
                                <div style={{ fontSize: 12, fontWeight: 900, color: '#334155', textTransform: 'uppercase', marginBottom: 8 }}>Khung học nâng cao</div>
                                <div style={{ fontSize: 14, color: '#1e293b', fontWeight: 800, lineHeight: 1.4 }}>{currentBlueprint.bigIdea}</div>
                                <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5, marginTop: 6 }}>{currentBlueprint.matureLearnerFrame}</div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10, marginTop: 12 }}>
                                    <div style={{ background: '#eef2ff', borderRadius: 12, padding: 10 }}>
                                        <div style={{ fontSize: 11, fontWeight: 900, color: '#3730a3', textTransform: 'uppercase' }}>Chuẩn vàng</div>
                                        <div style={{ fontSize: 12, color: '#3730a3', lineHeight: 1.35, marginTop: 4 }}>
                                            {currentBlueprint.goldStandards.slice(0, 2).map(item => item.label).join(' · ')}
                                        </div>
                                    </div>
                                    <div style={{ background: '#ecfdf5', borderRadius: 12, padding: 10 }}>
                                        <div style={{ fontSize: 11, fontWeight: 900, color: '#047857', textTransform: 'uppercase' }}>Benchmark phần mềm</div>
                                        <div style={{ fontSize: 12, color: '#047857', lineHeight: 1.35, marginTop: 4 }}>
                                            {currentBlueprint.benchmarkPatterns.slice(0, 2).map(item => `${item.product}: ${item.pattern}`).join(' · ')}
                                        </div>
                                    </div>
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
                                <button onClick={requestTutorHint}
                                    style={{ padding: '10px 20px', borderRadius: 20, border: '1px solid rgba(245,158,11,0.4)', background: 'rgba(245,158,11,0.1)', color: '#b45309', fontSize: 16, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, transition: 'all .2s' }}>
                                    <Lightbulb size={18} /> {showHint ? `Gợi ý tiếp L${Math.min(5, hintLevelUsed + 1)}` : 'Mở AI gia sư L1'}
                                </button>
                                {showHint && currentTutorHintTurn && (
                                    <div style={{ padding: '16px 20px', borderRadius: 16, background: '#fffbeb', border: '2px solid #fde68a', color: '#92400e', fontSize: 15, fontWeight: 650, maxWidth: '92%', textAlign: 'left', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                                        <div style={{ fontSize: 17, fontWeight: 850, marginBottom: 8 }}>AI gia sư L{hintLevelUsed}: {currentTutorHintTurn.move}</div>
                                        <div style={{ marginBottom: 10, lineHeight: 1.5 }}>{currentTutorHintTurn.text}</div>
                                        <div style={{ marginBottom: 10, fontSize: 13, color: '#78350f', lineHeight: 1.45 }}>
                                            Bước con làm tiếp: {currentTutorHintTurn.nextPrompt}
                                        </div>
                                        {currentEnrichment?.supportLadder.slice(0, 3).map(step => (
                                            <div key={step.level} style={{ padding: '8px 0', borderTop: '1px solid #fde68a' }}>
                                                <strong>{step.level} - {step.title}:</strong> {step.action}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Feedback + Next */}
                        {selected && (
                            <div style={{ marginTop: 24, padding: 20, borderRadius: 16, background: selected === currentProblem.correctAnswer ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.08)', border: `2px solid ${selected === currentProblem.correctAnswer ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.3)'}`, position: 'relative' }}>
                                <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8, color: selected === currentProblem.correctAnswer ? '#059669' : '#dc2626', textAlign: 'center' }}>
                                    {selected === currentProblem.correctAnswer ? 'Chính xác. Bây giờ kiểm tra cách nghĩ.' : 'Chưa đúng. Phân tích lại chiến lược.'}
                                </div>
                                <div style={{ fontSize: 16, color: '#475569', lineHeight: 1.6, textAlign: 'center', background: 'rgba(255,255,255,0.6)', padding: 12, borderRadius: 12, marginBottom: 16 }}>{currentProblem.explanation}</div>
                                {currentTutorFeedbackTurn && (
                                    <div style={{ textAlign: 'left', background: '#eef2ff', borderRadius: 14, padding: 14, border: '1px solid #c7d2fe', marginBottom: 16 }}>
                                        <div style={{ fontSize: 13, fontWeight: 900, color: '#3730a3', marginBottom: 6 }}>AI gia sư phân tích câu trả lời</div>
                                        <div style={{ fontSize: 13, color: '#312e81', lineHeight: 1.5 }}>{currentTutorFeedbackTurn.text}</div>
                                        <div style={{ fontSize: 12, color: '#4338ca', lineHeight: 1.4, marginTop: 8 }}>
                                            Bước tiếp theo: {currentTutorFeedbackTurn.nextPrompt}
                                        </div>
                                    </div>
                                )}
                                {currentEnrichment && (
                                    <div style={{ textAlign: 'left', background: 'rgba(255,255,255,0.68)', borderRadius: 14, padding: 14, border: '1px solid rgba(148,163,184,0.28)', marginBottom: 16 }}>
                                        <div style={{ fontSize: 13, fontWeight: 850, color: '#334155', marginBottom: 6 }}>Bước tiếp theo</div>
                                        <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>{currentEnrichment.transferPrompt}</div>
                                        <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5, marginTop: 8 }}>{currentEnrichment.parentMission}</div>
                                    </div>
                                )}
                                {currentBlueprint && (
                                    <div style={{ textAlign: 'left', background: '#f8fafc', borderRadius: 14, padding: 14, border: '1px solid #e2e8f0', marginBottom: 16 }}>
                                        <div style={{ fontSize: 13, fontWeight: 900, color: '#334155', marginBottom: 6 }}>Nhiệm vụ nâng cao</div>
                                        <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>{currentBlueprint.stretchTask}</div>
                                        <div style={{ fontSize: 12, color: '#64748b', marginTop: 8 }}>
                                            Bằng chứng thành thạo: {currentBlueprint.evidenceOfMastery.slice(0, 3).join(' · ')}
                                        </div>
                                    </div>
                                )}
                                {currentQuestionPlan && (
                                    <div style={{ textAlign: 'left', background: '#fff', borderRadius: 14, padding: 14, border: '1px solid #dbeafe', marginBottom: 16 }}>
                                        <div style={{ fontSize: 13, fontWeight: 900, color: '#1d4ed8', marginBottom: 8 }}>Tự kiểm trước khi đi tiếp</div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 8 }}>
                                            {currentQuestionPlan.selfCheck.slice(0, 3).map((item) => (
                                                <div key={item} style={{ fontSize: 12, color: '#334155', lineHeight: 1.35, background: '#eff6ff', borderRadius: 10, padding: 9 }}>
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                        <div style={{ fontSize: 12, color: '#b91c1c', lineHeight: 1.4, marginTop: 10 }}>
                                            Sai dễ gặp: {currentQuestionPlan.misconceptionCheck.join(' · ')}
                                        </div>
                                    </div>
                                )}
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
                        <div style={{ fontSize: 26, fontWeight: 900, color: '#1e1b4b', marginBottom: 8 }}>Phiên học hoàn thành</div>
                        <div style={{ fontSize: 16, color: '#475569', marginBottom: 24 }}>{activeMode.sessionPromise}</div>

                        <div style={{ background: 'rgba(59,130,246,0.1)', borderRadius: 24, padding: '24px', margin: '0 auto 32px', display: 'inline-block', border: '2px dashed rgba(59,130,246,0.3)' }}>
                            <div style={{ fontSize: 14, color: '#3b82f6', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 }}>ĐIỂM SỐ CỦA CON</div>
                            <div style={{ fontSize: 48, fontWeight: 900, color: '#3b82f6', lineHeight: 1 }}>{score}<span style={{ fontSize: 24, color: '#94a3b8' }}>/{(problems.length * 10)}</span></div>
                        </div>

                        {activeSubjectPack && (
                            <div style={{ maxWidth: 520, margin: '0 auto 28px', textAlign: 'left' }}>
                                <ResourceAttribution attribution={getAttributionForSource(activeSubjectPack.sourceIds[0])} />
                            </div>
                        )}

                        {subject && (
                            <div style={{ maxWidth: 560, margin: '0 auto 28px', textAlign: 'left', display: 'grid', gap: 12 }}>
                                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 16, padding: 14 }}>
                                    <div style={{ fontSize: 13, fontWeight: 900, color: '#334155', marginBottom: 8 }}>Bằng chứng cần đạt</div>
                                    {(selectedTopic ? getTopicLearningBlueprint(selectedTopic, SUBJECT_ENRICHMENT_KEY[subject]).evidenceOfMastery : activeMode.phases).slice(0, 4).map(item => (
                                        <div key={item} style={{ fontSize: 13, color: '#475569', lineHeight: 1.45, padding: '4px 0' }}>• {item}</div>
                                    ))}
                                </div>
                                <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 16, padding: 14 }}>
                                    <div style={{ fontSize: 13, fontWeight: 900, color: '#9a3412', marginBottom: 6 }}>Ôn lại có chủ đích</div>
                                    <div style={{ fontSize: 13, color: '#9a3412', lineHeight: 1.45 }}>
                                        {selectedTopic ? getTopicLearningBlueprint(selectedTopic, SUBJECT_ENRICHMENT_KEY[subject]).reviewCadence : 'Chọn lại một chủ đề còn sai nhiều và ôn sau 1-3-7 ngày.'}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button style={{ ...glass.btn('#3b82f6'), padding: '16px 28px', fontSize: 16 }} onClick={() => startExercise(subject!, grade, selectedTopic || undefined)}>
                                <RotateCcw size={20} /> Luyện lại phiên này
                            </button>
                            <button style={{ ...glass.btn('#8b5cf6'), padding: '16px 28px', fontSize: 16 }} onClick={() => { setProblems([]); setSelectedTopic(null); }}>
                                Chọn chủ đề khác
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
