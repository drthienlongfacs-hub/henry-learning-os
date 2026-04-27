'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppStore } from '@/stores/app-store';
import { useTranslation } from '@/lib/i18n';
import { LangToggle } from '@/components/LangToggle';
import { generateId, getMoodEmoji } from '@/lib/utils';
import { generateAIResponse, classifyError } from '@/lib/ai/provider';
import { createReviewItem } from '@/lib/spaced-repetition';
import type { Exercise, SessionStep, Attempt, Mistake } from '@/types';
import { ArrowRight, Lightbulb, Check, X, MessageCircle, ArrowLeft } from 'lucide-react';
import { emitLearningEvent } from '@/lib/events/learning-events';
import { BaseDefenseCard } from '@/components/gamification/BaseDefenseCard';

function SessionContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const lessonId = searchParams.get('lessonId');
    const { t } = useTranslation();

    const {
        childProfile, lessons, startSession, currentSession,
        updateSessionStep, endSession, addAttempt, addMistake,
        addReviewSchedule, addReflection, updateMasteryState, addAIInteractionLog,
    } = useAppStore();

    const lesson = lessons.find((l) => l.id === lessonId);

    const [stepIdx, setStepIdx] = useState(0);
    const [mood, setMood] = useState(3);
    const [energy, setEnergy] = useState(3);
    const [currentExIdx, setCurrentExIdx] = useState(0);
    const [answer, setAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [hintLevel, setHintLevel] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [aiMessage, setAiMessage] = useState('');
    const [teachBackText, setTeachBackText] = useState('');
    const [reflectionText, setReflectionText] = useState('');
    const [sessionComplete, setSessionComplete] = useState(false);

    const STEPS: { key: SessionStep; labelKey: string; emoji: string; durationKey: string }[] = [
        { key: 'check_in', labelKey: 'session_checkin', emoji: '😊', durationKey: 'session_1min' },
        { key: 'retrieval', labelKey: 'session_retrieval', emoji: '🧠', durationKey: 'session_5min' },
        { key: 'new_concept', labelKey: 'session_new', emoji: '💡', durationKey: 'session_7min' },
        { key: 'guided_practice', labelKey: 'session_practice', emoji: '✏️', durationKey: 'session_8min' },
        { key: 'independent_challenge', labelKey: 'session_challenge', emoji: '🏆', durationKey: 'session_5min' },
        { key: 'teach_back', labelKey: 'session_teachback', emoji: '🎓', durationKey: 'session_3min' },
        { key: 'reflection', labelKey: 'session_reflection', emoji: '🌟', durationKey: 'session_1min' },
    ];

    useEffect(() => {
        if (lessonId && childProfile && !currentSession) {
            startSession(lessonId);
        }
    }, [lessonId, childProfile, currentSession, startSession]);

    if (!lesson || !childProfile) {
        return (
            <div className="page-container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
                <p>{t('session_not_found')}</p>
                <button className="btn btn-primary" onClick={() => router.push('/child')}>{t('session_back')}</button>
            </div>
        );
    }

    const currentStep = STEPS[stepIdx];
    const currentEx = lesson.exercises[currentExIdx];

    const handleAnswer = (selectedAnswer: string) => {
        const correct = selectedAnswer.trim().toLowerCase() === currentEx.correctAnswer.trim().toLowerCase();
        setAnswer(selectedAnswer);
        setIsCorrect(correct);
        setShowResult(true);

        const attempt: Attempt = {
            id: generateId(), childId: childProfile.id, lessonId: lesson.id,
            competencyId: lesson.competencyIds[0], exerciseId: currentEx.id,
            answer: selectedAnswer, isCorrect: correct, errorType: correct ? null : 'unknown',
            hintLevelUsed: hintLevel, timeSpentSeconds: 0, confidenceSelfRating: mood,
            aiRoleUsed: 'tutor', createdAt: new Date().toISOString(),
        };
        addAttempt(attempt);
        addAIInteractionLog({
            id: generateId(), childId: childProfile.id, sessionId: currentSession?.id || '',
            role: 'tutor', subject: lesson.subject, ageBand: '6-8',
            supportLevel: hintLevel > 0 ? 'hint_light' : 'none', safetyFlags: [],
            responseQualityScore: 0.8, createdAt: new Date().toISOString(),
        });

        if (!correct) {
            const errorInfo = classifyError(currentEx.question, selectedAnswer, currentEx.correctAnswer, lesson.subject);
            const mistake: Mistake = {
                id: generateId(), childId: childProfile.id, competencyId: lesson.competencyIds[0],
                attemptId: attempt.id, errorType: errorInfo.errorType as Mistake['errorType'],
                explanation: errorInfo.explanation, correctionPlan: errorInfo.correctionPlan,
                reviewSchedule: [], resolvedAt: null,
            };
            addMistake(mistake);
            addReviewSchedule(createReviewItem(childProfile.id, 'mistake', mistake.id));
            updateMasteryState(lesson.competencyIds[0], { state: 'practicing', lastAttemptAt: new Date().toISOString() });
        } else {
            updateMasteryState(lesson.competencyIds[0], {
                state: hintLevel > 0 ? 'assisted_success' : 'independent_success',
                masteryScore: Math.min(100, (hintLevel === 0 ? 20 : 10)),
                lastAttemptAt: new Date().toISOString(),
            });
        }

        // Emit xAPI-compatible learning event
        emitLearningEvent({
            childId: childProfile.id,
            verb: correct ? 'completed' : 'attempted',
            object: `exercise:${currentEx.id}`,
            module: lesson.subject.toLowerCase(),
            resourceProvider: 'internal',
            success: correct,
            score: correct ? 1.0 : 0,
            aiAssistanceLevel: hintLevel > 0 ? `hint_L${hintLevel}` : undefined,
        });
    };

    const requestHint = () => {
        if (hintLevel < (currentEx.hints?.length || 3)) {
            const newLevel = hintLevel + 1;
            setHintLevel(newLevel);
            const response = generateAIResponse({
                childId: childProfile.id, sessionId: currentSession?.id || '',
                role: 'tutor', subject: lesson.subject, ageBand: '6-8',
                safetyLevel: childProfile.safetyLevel, question: currentEx.question, hintLevel: newLevel,
            });
            setAiMessage(response.text);
            setShowHint(true);
        }
    };

    const nextExercise = () => {
        if (currentExIdx < lesson.exercises.length - 1) {
            setCurrentExIdx(currentExIdx + 1);
            setAnswer(''); setShowResult(false); setHintLevel(0); setShowHint(false); setAiMessage('');
        } else { goNextStep(); }
    };

    const goNextStep = () => {
        if (stepIdx < STEPS.length - 1) {
            setStepIdx(stepIdx + 1);
            updateSessionStep(STEPS[stepIdx + 1].key);
            setAnswer(''); setShowResult(false); setHintLevel(0); setShowHint(false); setCurrentExIdx(0);
        }
    };

    const finishSession = () => {
        if (reflectionText.trim()) {
            addReflection({
                id: generateId(), childId: childProfile.id, sessionId: currentSession?.id || '',
                prompt: t('session_reflect_q'), responseText: reflectionText,
                responseAudioUrl: null, mood, energyLevel: energy, createdAt: new Date().toISOString(),
            });
        }
        endSession();
        setSessionComplete(true);

        // Emit session-level learning event
        emitLearningEvent({
            childId: childProfile.id,
            verb: 'completed',
            object: `session:${lesson.id}`,
            module: lesson.subject.toLowerCase(),
            resourceProvider: 'internal',
            success: true,
        });
    };

    if (sessionComplete) {
        return (
            <div className="page-container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
                <div className="animate-fade-in">
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉🌟</div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>{t('session_complete_title')}</h1>
                    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
                        {t('session_complete_sub_pre')} <strong>{lesson.title}</strong>!
                    </p>
                    <button className="btn btn-primary btn-lg" onClick={() => router.push('/child')}>
                        {t('session_go_home')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100dvh', background: 'var(--color-bg-session)' }}>
            <div className="page-container">
                {/* Top bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => router.push('/child')}>
                        <ArrowLeft size={18} /> {t('session_exit')}
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                            {lesson.subject} • {lesson.title}
                        </div>
                        <LangToggle />
                    </div>
                </div>

                {/* Step indicator */}
                <div className="step-indicator">
                    {STEPS.map((s, idx) => (
                        <div key={idx} className={`step-dot ${idx === stepIdx ? 'active' : idx < stepIdx ? 'done' : ''}`} />
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{currentStep.emoji}</span>
                    <h2 style={{ fontWeight: 700, fontSize: '1.25rem', margin: '0.25rem 0' }}>{t(currentStep.labelKey)}</h2>
                    <span className="badge badge-primary">{t(currentStep.durationKey)}</span>
                </div>

                <div className="card animate-fade-in" key={`${stepIdx}-${currentExIdx}`}>
                    {/* STEP: Check-in */}
                    {currentStep.key === 'check_in' && (
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem' }}>{t('session_energy_q')}</p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                                {[1, 2, 3, 4, 5].map((val) => (
                                    <button key={val} className={`mood-btn ${mood === val ? 'active' : ''}`} onClick={() => setMood(val)}>
                                        {getMoodEmoji(val)}
                                    </button>
                                ))}
                            </div>
                            <button className="btn btn-primary" onClick={goNextStep}>
                                {t('session_start')} <ArrowRight size={18} />
                            </button>
                        </div>
                    )}

                    {/* STEP: Exercises */}
                    {(currentStep.key === 'retrieval' || currentStep.key === 'guided_practice' || currentStep.key === 'independent_challenge') && currentEx && (() => {
                        const Wrapper = lesson.subject.toLowerCase() === 'elite' ? BaseDefenseCard : 'div';
                        const wrapperProps = lesson.subject.toLowerCase() === 'elite' ? {
                            hp: 3 - (showResult && !isCorrect ? 1 : 0),
                            ammo: 10 + currentExIdx * 2,
                            score: currentExIdx * 100 + (isCorrect ? 100 : 0),
                            isCorrect,
                            showResult
                        } : {};

                        return (
                            <Wrapper {...(wrapperProps as any)}>
                                <div style={{ marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                    {t('session_question_n')} {currentExIdx + 1} / {lesson.exercises.length}
                                </div>
                                <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                    {currentEx.question}
                                </p>

                                {!showResult && (
                                    <>
                                        {currentEx.type === 'multiple_choice' && currentEx.options && (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                {currentEx.options.map((opt) => (
                                                    <button key={opt} className="btn btn-secondary" style={{ justifyContent: 'flex-start', textAlign: 'left' }} onClick={() => handleAnswer(opt)}>
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        {(currentEx.type === 'free_text' || currentEx.type === 'explain') && (
                                            <div>
                                                <textarea className="textarea-field" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder={currentEx.type === 'explain' ? t('session_explain_ph') : t('session_answer_ph')} />
                                                <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }} onClick={() => handleAnswer(answer)} disabled={!answer.trim()}>
                                                    {t('session_submit')} <Check size={18} />
                                                </button>
                                            </div>
                                        )}
                                        {currentStep.key !== 'independent_challenge' && (
                                            <button className="btn btn-accent btn-sm" style={{ marginTop: '1rem' }} onClick={requestHint}>
                                                <Lightbulb size={16} /> {t('session_hint_btn')} (L{hintLevel + 1})
                                            </button>
                                        )}
                                    </>
                                )}

                                {showResult && (
                                    <div className="animate-fade-in">
                                        <div style={{
                                            display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem',
                                            borderRadius: 'var(--radius-md)', marginBottom: '1rem',
                                            background: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            border: `2px solid ${isCorrect ? 'var(--color-success)' : 'var(--color-danger)'}`,
                                        }}>
                                            {isCorrect ? <Check size={20} color="var(--color-success)" /> : <X size={20} color="var(--color-danger)" />}
                                            <span style={{ fontWeight: 700, color: isCorrect ? 'var(--color-success)' : 'var(--color-danger)' }}>
                                                {isCorrect ? t('session_correct') : t('session_wrong')}
                                            </span>
                                        </div>
                                        <div style={{ background: 'var(--color-bg-child)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem' }}>
                                            <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{t('session_explain_label')}</p>
                                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{currentEx.explanation}</p>
                                        </div>
                                        <button className="btn btn-primary" style={{ width: '100%' }} onClick={nextExercise}>
                                            {currentExIdx < lesson.exercises.length - 1 ? t('session_next_q') : t('session_next_step')} <ArrowRight size={18} />
                                        </button>
                                    </div>
                                )}

                                {showHint && aiMessage && (
                                    <div className="hint-card animate-fade-in">
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                            <MessageCircle size={16} color="var(--color-accent)" />
                                            <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-accent)' }}>{t('session_hint_label')} L{hintLevel}</span>
                                        </div>
                                        <p style={{ fontSize: '0.9rem', color: '#92400e' }}>{aiMessage}</p>
                                    </div>
                                )}
                                {showHint && hintLevel > 0 && currentEx.hints[hintLevel - 1] && (
                                    <div className="hint-card" style={{ marginTop: '0.5rem' }}>
                                        <p style={{ fontSize: '0.9rem', color: '#92400e' }}>{currentEx.hints[hintLevel - 1]}</p>
                                    </div>
                                )}
                            </Wrapper>
                        );
                    })()}

                    {/* STEP: New Concept */}
                    {currentStep.key === 'new_concept' && (
                        <div>
                            {lesson.contentBlocks.map((block) => (
                                <div key={block.id} style={{ marginBottom: '1.5rem' }}>
                                    {block.type === 'text' && <p style={{ lineHeight: 1.7, fontSize: '1.05rem' }}>{block.content}</p>}
                                    {block.type === 'example' && (
                                        <div style={{ background: 'rgba(99, 102, 241, 0.05)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-primary)' }}>
                                            <p style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-primary)' }}>{t('session_example')}</p>
                                            <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{block.content}</p>
                                        </div>
                                    )}
                                    {block.type === 'visual' && (
                                        <div style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: 'var(--radius-md)', textAlign: 'center', fontSize: '1.25rem', fontWeight: 700 }}>
                                            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{block.content}</pre>
                                        </div>
                                    )}
                                </div>
                            ))}
                            <button className="btn btn-primary" style={{ width: '100%' }} onClick={goNextStep}>
                                {t('session_understood')} <ArrowRight size={18} />
                            </button>
                        </div>
                    )}

                    {/* STEP: Teach Back */}
                    {currentStep.key === 'teach_back' && (
                        <div>
                            <p style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '1rem', lineHeight: 1.6 }}>
                                {t('session_teachback_prompt')}
                            </p>
                            <textarea className="textarea-field" placeholder={t('session_teachback_ph')} value={teachBackText} onChange={(e) => setTeachBackText(e.target.value)} style={{ minHeight: '120px' }} />
                            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={goNextStep} disabled={!teachBackText.trim()}>
                                {t('session_continue')} <ArrowRight size={18} />
                            </button>
                        </div>
                    )}

                    {/* STEP: Reflection */}
                    {currentStep.key === 'reflection' && (
                        <div>
                            <p style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '1rem' }}>
                                {t('session_reflect_q')}
                            </p>
                            <textarea className="textarea-field" placeholder={t('session_reflect_ph')} value={reflectionText} onChange={(e) => setReflectionText(e.target.value)} />
                            <button className="btn btn-success btn-lg" style={{ width: '100%', marginTop: '1.5rem' }} onClick={finishSession}>
                                {t('session_finish')}
                            </button>
                        </div>
                    )}
                </div >
            </div>
        </div>
    );
}

export default function SessionPage() {
    return (
        <Suspense fallback={<div className="page-container" style={{ textAlign: 'center', paddingTop: '4rem' }}>Loading...</div>}>
            <SessionContent />
        </Suspense>
    );
}
