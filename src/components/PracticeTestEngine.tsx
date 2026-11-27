/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import {
  EXAM_PRACTICE_BANK_STATS,
  PRACTICE_TESTS,
  type PracticeQuestion,
  type PracticeTest,
} from '@/data/practice-test-bank';
import { CAMBRIDGE_EXAM_SPECS, type CambridgeExamLevelId } from '@/data/cambridge-official-framework';
import { speak, speakSlowly, stopSpeech } from '@/lib/voiceEngine';
import { emitLearningEvent } from '@/lib/events/learning-events';
import { useAppStore } from '@/stores/app-store';
import {
  getLevelAnalytics,
  recordExamAttempt,
  type ExamPartBreakdown,
  type ExamPracticeMode,
} from '@/lib/exam-analytics';

type TestState = 'menu' | 'testing' | 'review';
type PracticeLevel = PracticeTest['level'];

const BASE_PATH = process.env.NODE_ENV === 'production' ? '/henry-learning-os' : '';

const resolveAssetUrl = (src: string): string => {
  if (!src) return src;
  return src.startsWith('/') && !src.startsWith('/henry-learning-os') ? `${BASE_PATH}${src}` : src;
};

const isSelfAssessmentQuestion = (question: PracticeQuestion) =>
  question.selfAssessment || question.taskTypeEn === 'Speaking' || question.taskTypeEn === 'Writing';

const levelForGrade = (grade: number): PracticeLevel => {
  if (grade <= 2) return 'starters';
  if (grade === 3) return 'movers';
  if (grade <= 5) return 'flyers';
  if (grade <= 7) return 'ket';
  return 'pet';
};

const isCorrectAnswer = (userAns: string, correctAns: string): boolean => {
  const u = (userAns || '').trim().toLowerCase();
  const c = correctAns.trim().toLowerCase();
  if (!u) return false;
  if (u === c) return true;
  const uLetter = u.match(/^([a-z])[\.\)\s]/)?.[1];
  const cLetter = c.match(/^([a-z])[\.\)\s]/)?.[1] || (c.length === 1 ? c : null);
  if (uLetter && cLetter && uLetter === cLetter) return true;
  if (u.startsWith(`${c}.`) || u.startsWith(`${c} `)) return true;
  const alts = c.split('/').map(s => s.trim());
  return alts.some(alt => u === alt);
};

const LEVEL_INFO: { key: PracticeLevel; label: string; cefr: string; color: string }[] = [
  { key: 'starters', label: '🌟 Starters', cefr: 'Pre A1', color: '#68d391' },
  { key: 'movers', label: '🚀 Movers', cefr: 'A1', color: '#63b3ed' },
  { key: 'flyers', label: '🦅 Flyers', cefr: 'A2', color: '#f6ad55' },
  { key: 'ket', label: '🔑 KET (Key)', cefr: 'A2+', color: '#fc8181' },
  { key: 'pet', label: '📋 PET (Preliminary)', cefr: 'B1', color: '#b794f4' },
];

export default function PracticeTestEngine({
  grade = 1,
  initialLevel,
}: {
  grade?: number;
  initialLevel?: PracticeLevel;
}) {
  const resolvedInitialLevel = initialLevel ?? levelForGrade(grade);
  const [state, setState] = useState<TestState>('menu');
  const [activeTest, setActiveTest] = useState<PracticeTest | null>(null);
  const [practiceMode, setPracticeMode] = useState<ExamPracticeMode>('guided');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [rubricChecks, setRubricChecks] = useState<Record<string, boolean[]>>({});
  const [checkedQuestionIds, setCheckedQuestionIds] = useState<Record<string, boolean>>({});
  const [showStrategyDrawer, setShowStrategyDrawer] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [expandAllReview, setExpandAllReview] = useState(false);
  const [showExplanation, setShowExplanation] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [listenCounts, setListenCounts] = useState<Record<string, number>>({});
  const [selectedLevel, setSelectedLevel] = useState<PracticeLevel>(resolvedInitialLevel);
  const [selectedSetNo, setSelectedSetNo] = useState(1);
  const [analyticsTick, setAnalyticsTick] = useState(0);
  const [isErrorDrill, setIsErrorDrill] = useState(false);
  const submittedRef = useRef(false);

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const allQuestions = useMemo(
    () => activeTest?.parts.flatMap(p => p.questions) ?? [],
    [activeTest],
  );
  const total = allQuestions.length;
  const q = allQuestions[currentQ];

  const levelAnalytics = useMemo(() => {
    void analyticsTick;
    return getLevelAnalytics(selectedLevel as CambridgeExamLevelId);
  }, [selectedLevel, analyticsTick]);

  const finalizeAndSubmit = (
    test: PracticeTest,
    currentAnswers: Record<string, string>,
    currentRubrics: Record<string, boolean[]>,
  ) => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    stopSpeech();
    setPlayingAudioId(null);

    const qs = test.parts.flatMap(p => p.questions);
    const evaluateQ = (item: PracticeQuestion) => {
      if (isSelfAssessmentQuestion(item)) {
        const checks = currentRubrics[item.id] ?? [];
        const checkedCount = checks.filter(Boolean).length;
        const textLen = (currentAnswers[item.id] || '').trim().length;
        return checkedCount >= 2 || textLen >= 12 || currentAnswers[item.id] === 'self-assessed';
      }
      return isCorrectAnswer(currentAnswers[item.id] || '', item.answer);
    };

    const partBreakdown: ExamPartBreakdown[] = test.parts.map(part => {
      const pTotal = part.questions.length;
      const pCorrect = part.questions.filter(evaluateQ).length;
      return {
        partNumber: part.partNumber,
        partTitle: part.titleVi,
        taskTypeVi: part.questions[0]?.taskTypeVi || part.titleVi,
        correct: pCorrect,
        total: pTotal,
        accuracyPct: pTotal > 0 ? Math.round((pCorrect / pTotal) * 100) : 0,
      };
    });

    const totalScore = qs.filter(evaluateQ).length;
    const accuracyPct = qs.length > 0 ? Math.round((totalScore / qs.length) * 100) : 0;
    const computedShields = qs.length > 0 ? Math.round((totalScore / qs.length) * 5) : 0;
    const durationSec = Math.max(1, test.totalMinutes * 60 - timeLeft);
    const wrongQuestionIds = qs
      .filter(item => !isSelfAssessmentQuestion(item) && !evaluateQ(item))
      .map(item => item.id);

    recordExamAttempt({
      source: 'exams-bank',
      level: test.level as CambridgeExamLevelId,
      testId: test.id,
      testTitle: test.skillVi,
      setNo: test.setNo,
      skill: test.skill,
      mode: practiceMode,
      score: totalScore,
      total: qs.length,
      accuracyPct,
      shields: computedShields,
      durationSec,
      partBreakdown,
      wrongQuestionIds,
    });
    setAnalyticsTick(tick => tick + 1);

    const store = useAppStore.getState();
    const childId = store.childProfile?.id ?? 'henry';
    emitLearningEvent({
      childId,
      verb: 'completed',
      object: test.id,
      module: 'cambridge-exams',
      success: accuracyPct >= 70,
      score: accuracyPct,
      durationSec,
    });

    const existingUnresolved = new Set(
      store.mistakes.filter(m => !m.resolvedAt).map(m => m.attemptId),
    );
    for (const item of qs) {
      if (!isSelfAssessmentQuestion(item) && !evaluateQ(item) && !existingUnresolved.has(item.id)) {
        existingUnresolved.add(item.id);
        store.addMistake({
          id: `mistake-${item.id}`,
          childId,
          competencyId: `cambridge-${test.level}-${test.skill}`,
          attemptId: item.id,
          errorType: test.skill === 'listening' ? 'attention' : 'reading',
          explanation: `${item.prompt.slice(0, 120)} — Chọn: "${currentAnswers[item.id] || '(bỏ trống)'}", Đáp án: "${item.answer}". ${item.explanationVi}`,
          correctionPlan: item.strategyVi,
          reviewSchedule: [],
          resolvedAt: null,
        });
      }
    }

    setState('review');
  };

  // Timer
  useEffect(() => {
    if (state !== 'testing' || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [state, timeLeft]);

  useEffect(() => {
    if (state === 'testing' && timeLeft === 0 && activeTest && !submittedRef.current) {
      finalizeAndSubmit(activeTest, answers, rubricChecks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, timeLeft, activeTest]);

  const startTest = (test: PracticeTest, drillWrongOnly = false) => {
    stopSpeech();
    submittedRef.current = false;
    setActiveTest(test);
    setIsErrorDrill(drillWrongOnly);
    setCurrentQ(0);
    setAnswers({});
    setRubricChecks({});
    setCheckedQuestionIds({});
    setShowStrategyDrawer(false);
    setShowTranscript(false);
    setExpandAllReview(false);
    setShowExplanation(null);
    setPlayingAudioId(null);
    setListenCounts({});
    setTimeLeft(test.totalMinutes * 60);
    setState('testing');
  };

  const startErrorDrill = () => {
    if (!activeTest) return;
    const wrongParts = activeTest.parts
      .map(part => ({
        ...part,
        questions: part.questions.filter(
          item => !isSelfAssessmentQuestion(item) && !isCorrectAnswer(answers[item.id] || '', item.answer),
        ),
      }))
      .filter(part => part.questions.length > 0);
    if (wrongParts.length === 0) return;
    const drillTest: PracticeTest = {
      ...activeTest,
      id: `${activeTest.id}_drill`,
      skillVi: `Ôn câu sai: ${activeTest.skillVi}`,
      totalMinutes: Math.max(5, wrongParts.reduce((s, p) => s + p.questions.length * 2, 0)),
      parts: wrongParts,
    };
    startTest(drillTest, true);
  };

  const selectAnswer = (qId: string, ans: string) => {
    setAnswers(prev => ({ ...prev, [qId]: ans }));
  };

  const toggleRubricCheck = (question: PracticeQuestion, index: number) => {
    const length = question.rubricVi?.length ?? 4;
    setRubricChecks(prev => {
      const current = prev[question.id] ?? new Array(length).fill(false);
      const next = [...current];
      next[index] = !next[index];
      return { ...prev, [question.id]: next };
    });
    if (!answers[question.id]) {
      selectAnswer(question.id, 'self-assessed');
    }
  };

  const isQuestionEvaluatedCorrect = (item: PracticeQuestion) => {
    if (isSelfAssessmentQuestion(item)) {
      const checks = rubricChecks[item.id] ?? [];
      const textLen = (answers[item.id] || '').trim().length;
      return checks.filter(Boolean).length >= 2 || textLen >= 12 || answers[item.id] === 'self-assessed';
    }
    return isCorrectAnswer(answers[item.id] || '', item.answer);
  };

  const score = allQuestions.filter(isQuestionEvaluatedCorrect).length;
  const shields = total > 0 ? Math.round((score / total) * 5) : 0;
  const accuracyPct = total > 0 ? Math.round((score / total) * 100) : 0;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  const levelTests = PRACTICE_TESTS.filter(t => t.level === selectedLevel);
  const availableSetNumbers = Array.from(new Set(levelTests.map(t => t.setNo ?? 0))).sort((a, b) => a - b);
  const availableTests = levelTests.filter(t => (t.setNo ?? 0) === selectedSetNo);
  const activeSpec = CAMBRIDGE_EXAM_SPECS[selectedLevel as CambridgeExamLevelId];

  const card = {
    background: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    padding: 14,
    border: '1px solid rgba(255,255,255,0.08)',
    marginBottom: 10,
  };

  const goToQuestion = (nextIndex: number) => {
    stopSpeech();
    setPlayingAudioId(null);
    setShowTranscript(false);
    setShowStrategyDrawer(false);
    setCurrentQ(nextIndex);
  };

  // ═══ MENU ═══
  if (state === 'menu') {
    return (
      <div style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', borderRadius: 20, padding: 20, color: '#fff', fontFamily: "'Inter',sans-serif" }}>
        <h2 style={{ textAlign: 'center', fontSize: 20, fontWeight: 800, margin: '0 0 4px', background: 'linear-gradient(90deg,#f9d423,#ff4e50)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          🎯 Thi thử Cambridge
        </h2>
        <p style={{ textAlign: 'center', fontSize: 12, color: '#a0aec0', margin: '0 0 12px' }}>
          {EXAM_PRACTICE_BANK_STATS.generatedSetCountPerLevel} bộ đề/level • Bộ {selectedSetNo} có {availableTests.length} kỹ năng • {availableTests.reduce((s, t) => s + t.parts.flatMap(p => p.questions).length, 0)} câu hỏi
        </p>

        <div style={{ ...card, background: 'rgba(72,187,120,0.08)', borderColor: 'rgba(72,187,120,0.2)' }}>
          <p style={{ margin: 0, fontSize: 12, color: '#c6f6d5', lineHeight: 1.55 }}>
            Nguồn chính thức: cấu trúc, số phần và số câu bám Cambridge English. Nội dung trong app là đề tự luyện gốc của Henry kèm đáp án chi tiết và khung chiến lược giải đề theo từng dạng bài.
          </p>
        </div>

        {/* Mode Switcher: Guided vs Mock Exam */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
          <button
            type="button"
            onClick={() => setPracticeMode('guided')}
            style={{
              minHeight: 48,
              padding: '8px 12px',
              borderRadius: 12,
              cursor: 'pointer',
              textAlign: 'left',
              border: practiceMode === 'guided' ? '2px solid #68d391' : '1px solid rgba(255,255,255,0.12)',
              background: practiceMode === 'guided' ? 'rgba(72,187,120,0.16)' : 'rgba(255,255,255,0.04)',
              color: '#fff',
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 800, color: '#68d391' }}>🧠 Luyện có hướng dẫn</div>
            <div style={{ fontSize: 10, color: '#cbd5e0', marginTop: 2 }}>Mở khung tư duy từng bước & kiểm tra từng câu</div>
          </button>
          <button
            type="button"
            onClick={() => setPracticeMode('exam')}
            style={{
              minHeight: 48,
              padding: '8px 12px',
              borderRadius: 12,
              cursor: 'pointer',
              textAlign: 'left',
              border: practiceMode === 'exam' ? '2px solid #f9d423' : '1px solid rgba(255,255,255,0.12)',
              background: practiceMode === 'exam' ? 'rgba(249,212,35,0.16)' : 'rgba(255,255,255,0.04)',
              color: '#fff',
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 800, color: '#f9d423' }}>⏱️ Thi thử bấm giờ</div>
            <div style={{ fontSize: 10, color: '#cbd5e0', marginTop: 2 }}>Giống phòng thi thật • Chấm toàn bài khi nộp</div>
          </button>
        </div>

        {/* Level tabs */}
        <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 12 }}>
          {LEVEL_INFO.map(lv => (
            <button
              type="button"
              key={lv.key}
              onClick={() => {
                setSelectedLevel(lv.key);
                setSelectedSetNo(1);
              }}
              style={{
                minHeight: 34,
                padding: '6px 11px',
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: selectedLevel === lv.key ? 800 : 500,
                background: selectedLevel === lv.key ? lv.color : 'rgba(255,255,255,0.08)',
                color: selectedLevel === lv.key ? '#0f0c29' : '#e2e8f0',
                transition: 'all 0.2s',
              }}
            >
              {lv.label} <span style={{ fontSize: 9, opacity: 0.75 }}>({lv.cefr})</span>
            </button>
          ))}
        </div>

        {/* Real Data-Driven Progress & Weak-Area Banner */}
        <div style={{ ...card, background: 'rgba(56,189,248,0.08)', borderColor: 'rgba(56,189,248,0.22)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#38bdf8' }}>
              📊 Dữ liệu thực tế — {selectedLevel.toUpperCase()}
            </span>
            {levelAnalytics.attemptCount > 0 ? (
              <span style={{ fontSize: 11, color: '#e2e8f0', fontWeight: 700 }}>
                {levelAnalytics.attemptCount} lượt thi • TB {levelAnalytics.averageAccuracyPct}% • Cao nhất {levelAnalytics.bestShields}/5 🛡️
              </span>
            ) : (
              <span style={{ fontSize: 11, color: '#94a3b8' }}>Chưa có bài thi đã lưu</span>
            )}
          </div>
          <p style={{ margin: 0, fontSize: 11, color: '#e2e8f0', lineHeight: 1.5 }}>
            {levelAnalytics.nextActionVi}
          </p>
          {levelAnalytics.weakTaskTypes.length > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
              {levelAnalytics.weakTaskTypes.map(w => (
                <span key={w.taskTypeVi} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 8, background: 'rgba(252,129,129,0.16)', color: '#feb2b2', fontWeight: 700 }}>
                  ⚠️ {w.taskTypeVi}: {w.accuracyPct}%
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Full-set picker */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 6, marginBottom: 12 }}>
          {availableSetNumbers.map(setNo => (
            <button
              type="button"
              key={setNo}
              onClick={() => setSelectedSetNo(setNo)}
              style={{
                minWidth: 52,
                minHeight: 34,
                padding: '6px 10px',
                borderRadius: 8,
                border: selectedSetNo === setNo ? '1px solid #f9d423' : '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                fontSize: 11,
                fontWeight: 800,
                background: selectedSetNo === setNo ? 'rgba(249,212,35,0.18)' : 'rgba(255,255,255,0.06)',
                color: selectedSetNo === setNo ? '#f9d423' : '#cbd5e0',
              }}
            >
              {setNo === 0 ? 'Đề gốc' : `Bộ ${setNo}`}
            </button>
          ))}
        </div>

        {activeSpec && (
          <div style={{ ...card, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            <div>
              <div style={{ fontSize: 10, color: '#a0aec0' }}>Chuẩn</div>
              <div style={{ fontSize: 12, color: '#fff', fontWeight: 800 }}>{activeSpec.officialName}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: '#a0aec0' }}>CEFR</div>
              <div style={{ fontSize: 12, color: '#fff', fontWeight: 800 }}>{activeSpec.cefr}</div>
            </div>
            <a href={activeSpec.officialSampleUrl} target="_blank" rel="noreferrer" style={{ color: '#63b3ed', fontSize: 12, fontWeight: 800, textDecoration: 'none', alignSelf: 'center', minHeight: 28, display: 'inline-flex', alignItems: 'center' }}>
              Đề mẫu chính thức ↗
            </a>
          </div>
        )}

        {availableTests.map(t => {
          const hasSourcePages = t.parts.some(p => p.sourcePages && p.sourcePages.length > 0);
          const best = levelAnalytics.bestByTestId[t.id];
          return (
            <div
              key={t.id}
              role="button"
              tabIndex={0}
              onClick={() => startTest(t)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  startTest(t);
                }
              }}
              style={{
                ...card,
                cursor: 'pointer',
                borderLeft: hasSourcePages ? '3px solid #68d391' : '3px solid rgba(246,173,85,0.5)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: 15, color: '#f9d423' }}>📝 {t.skillVi}</h4>
                  <p style={{ margin: '3px 0', fontSize: 12, color: '#a0aec0' }}>
                    {t.level.charAt(0).toUpperCase() + t.level.slice(1)} • {t.parts.flatMap(p => p.questions).length} câu • {t.totalMinutes} phút
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {best && (
                    <span style={{ fontSize: 11, padding: '4px 8px', borderRadius: 8, background: 'rgba(72,187,120,0.18)', color: '#68d391', fontWeight: 800 }}>
                      ✅ {best.score}/{best.total} ({best.accuracyPct}%)
                    </span>
                  )}
                  <span style={{ fontSize: 22 }}>▶️</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                {hasSourcePages && (
                  <span style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(72,187,120,0.15)', color: '#68d391', borderRadius: 4, fontWeight: 700 }}>
                    📘 Đề kèm trang minh họa
                  </span>
                )}
                {!hasSourcePages && (
                  <span style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(99,179,237,0.12)', color: '#90cdf4', borderRadius: 4, fontWeight: 600 }}>
                    🎯 Tự luyện chuẩn format
                  </span>
                )}
                {t.parts.map(p => (
                  <span key={p.partNumber} style={{ fontSize: 10, padding: '2px 6px', background: 'rgba(99,179,237,0.15)', color: '#63b3ed', borderRadius: 4 }}>
                    Part {p.partNumber}: {p.titleVi}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
        <p style={{ fontSize: 10, color: '#a0aec0', textAlign: 'center', marginTop: 8 }}>
          📊 Bám chuẩn Cambridge • audio TTS tức thì • đáp án + giải thích + chiến lược 3–5 bước • lưu dữ liệu học thực tế
        </p>
      </div>
    );
  }

  // ═══ REVIEW ═══
  if (state === 'review' && activeTest) {
    const partSummaries = activeTest.parts.map(part => {
      const pTotal = part.questions.length;
      const pCorrect = part.questions.filter(isQuestionEvaluatedCorrect).length;
      const pct = pTotal > 0 ? Math.round((pCorrect / pTotal) * 100) : 0;
      return { part, pCorrect, pTotal, pct };
    });
    const weakParts = partSummaries.filter(s => s.pct < 75);
    const wrongCount = allQuestions.filter(
      item => !isSelfAssessmentQuestion(item) && !isQuestionEvaluatedCorrect(item),
    ).length;

    return (
      <div style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', borderRadius: 20, padding: 20, color: '#fff', fontFamily: "'Inter',sans-serif" }}>
        {/* Score summary */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 42 }}>{'🛡️'.repeat(shields)}{'⬜'.repeat(5 - shields)}</div>
          <h3 style={{ margin: '4px 0', fontSize: 22, color: '#f9d423' }}>
            {score}/{total} câu đạt ({accuracyPct}%)
          </h3>
          <p style={{ fontSize: 12, color: '#cbd5e0', margin: 0 }}>
            {shields >= 4
              ? '🌟 Xuất sắc! Nắm chắc format và chiến lược làm bài.'
              : shields >= 3
                ? '👍 Khá tốt! Tập trung ôn các Part dưới 75% bên dưới.'
                : '💪 Cần luyện thêm chiến lược giải đề. Mở giải thích từng câu sai để rút kinh nghiệm.'}
          </p>
        </div>

        {/* Part-by-Part Data-Driven Breakdown */}
        <div style={{ ...card, background: 'rgba(15,23,42,0.55)', borderColor: 'rgba(99,179,237,0.22)' }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#63b3ed', marginBottom: 8 }}>
            📊 Phân tích kết quả theo từng Part (Real Data-Driven)
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            {partSummaries.map(({ part, pCorrect, pTotal, pct }) => (
              <div key={part.partNumber}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                  <span style={{ color: '#e2e8f0', fontWeight: 600 }}>Part {part.partNumber}: {part.titleVi}</span>
                  <span style={{ color: pct >= 75 ? '#68d391' : pct >= 50 ? '#f6ad55' : '#fc8181', fontWeight: 800 }}>
                    {pCorrect}/{pTotal} ({pct}%)
                  </span>
                </div>
                <div style={{ height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${pct}%`,
                      background: pct >= 75 ? '#48bb78' : pct >= 50 ? '#f6ad55' : '#fc8181',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Recommendations based on weak parts */}
        {weakParts.length > 0 && (
          <div style={{ ...card, background: 'rgba(252,129,129,0.08)', borderColor: 'rgba(252,129,129,0.24)' }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#feb2b2', marginBottom: 6 }}>
              🎯 Gợi ý cải thiện theo dữ liệu bài vừa làm
            </div>
            {weakParts.map(({ part, pct }) => (
              <div key={`weak-${part.partNumber}`} style={{ fontSize: 12, color: '#e2e8f0', lineHeight: 1.5, marginBottom: 4 }}>
                • <strong>Part {part.partNumber} ({part.titleVi} — {pct}%):</strong>{' '}
                {part.questions[0]?.strategyVi.split('\n')[0]}
              </div>
            ))}
          </div>
        )}

        {/* Quick Review Actions */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
          {wrongCount > 0 && !isErrorDrill && (
            <button
              type="button"
              onClick={startErrorDrill}
              style={{
                flex: 1,
                minWidth: 180,
                minHeight: 40,
                padding: '9px 14px',
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: '#fff',
                fontSize: 13,
                fontWeight: 800,
              }}
            >
              🔁 Luyện lại riêng {wrongCount} câu vừa sai
            </button>
          )}
          <button
            type="button"
            onClick={() => setExpandAllReview(prev => !prev)}
            style={{
              minHeight: 40,
              padding: '9px 14px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.2)',
              cursor: 'pointer',
              background: 'rgba(255,255,255,0.06)',
              color: '#fff',
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {expandAllReview ? '🔽 Thu gọn giải thích' : '👁️ Mở tất cả giải thích & chiến lược'}
          </button>
        </div>

        {/* Per-question review */}
        {activeTest.parts.map(part => (
          <div key={part.partNumber}>
            <h4 style={{ fontSize: 13, color: '#63b3ed', margin: '12px 0 6px', borderBottom: '1px solid rgba(99,179,237,0.2)', paddingBottom: 3 }}>
              Part {part.partNumber}: {part.titleVi}
            </h4>
            {part.questions.map(item => {
              const userAns = answers[item.id];
              const correct = isQuestionEvaluatedCorrect(item);
              const isOpen = expandAllReview || showExplanation === item.id;
              return (
                <div key={item.id} style={{ ...card, borderLeft: `3px solid ${correct ? '#68d391' : '#fc8181'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>
                      {item.imageEmoji && <span style={{ marginRight: 4 }}>{item.imageEmoji}</span>}
                      {item.prompt}
                    </span>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{correct ? '✅' : '❌'}</span>
                  </div>
                  {!isSelfAssessmentQuestion(item) ? (
                    <div style={{ fontSize: 12, marginTop: 4 }}>
                      {!correct && <p style={{ margin: '2px 0', color: '#fc8181' }}>❌ Bạn chọn: {userAns || '(chưa trả lời)'}</p>}
                      <p style={{ margin: '2px 0', color: '#68d391' }}>✅ Đáp án: {item.answer}</p>
                    </div>
                  ) : (
                    <p style={{ margin: '4px 0 0', color: '#68d391', fontSize: 12 }}>
                      {correct ? '✅ Đã hoàn thành phần tự đánh giá.' : '⚠️ Nên hoàn thành bài viết/nói hoặc tự chấm ít nhất 2 tiêu chí rubric.'}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowExplanation(showExplanation === item.id ? null : item.id)}
                    style={{
                      cursor: 'pointer',
                      marginTop: 6,
                      minHeight: 28,
                      padding: '4px 10px',
                      background: 'rgba(249,212,35,0.08)',
                      border: 'none',
                      borderRadius: 6,
                      fontSize: 11,
                      color: '#f9d423',
                      fontWeight: 700,
                    }}
                  >
                    {isOpen ? '▼ Ẩn giải thích' : '▶ Xem giải thích & chiến lược'}
                  </button>
                  {isOpen && (
                    <div style={{ marginTop: 6, padding: '8px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                      <p style={{ margin: '0 0 6px', fontSize: 12, color: '#e2e8f0', lineHeight: 1.55 }}>
                        📖 <strong>{isSelfAssessmentQuestion(item) ? 'Gợi ý mẫu' : 'Giải thích'}:</strong> {item.modelAnswer || item.explanationVi}
                      </p>
                      {item.rubricVi?.map((rubric, idx) => (
                        <p key={idx} style={{ margin: '2px 0', fontSize: 11, color: '#cbd5e0' }}>• {rubric}</p>
                      ))}
                      <p style={{ margin: '6px 0 0', fontSize: 12, color: '#68d391', whiteSpace: 'pre-line', lineHeight: 1.55 }}>
                        🧠 <strong>Chiến lược giải đề:</strong> {item.strategyVi}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button
            type="button"
            onClick={() => startTest(activeTest, isErrorDrill)}
            style={{
              flex: 1,
              minHeight: 42,
              padding: '10px',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 10,
              cursor: 'pointer',
              background: 'rgba(255,255,255,0.06)',
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            🔁 Làm lại đề này
          </button>
          <button
            type="button"
            onClick={() => setState('menu')}
            style={{
              flex: 1,
              minHeight: 42,
              padding: '10px',
              border: 'none',
              borderRadius: 10,
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            📋 Chọn đề khác
          </button>
        </div>
      </div>
    );
  }

  // ═══ TESTING ═══
  if (!q || !activeTest) return null;
  const currentPart = activeTest.parts.find(p => p.questions.includes(q));
  const isSpellType = q.taskTypeEn === 'Spell';
  const isOpenGapFill = !isSpellType && (!q.options || q.options.length === 0);
  const isSelfAssessmentType = isSelfAssessmentQuestion(q);

  const VISUAL_TASK_TYPES = ['Draw lines', 'Colour', 'Color', 'Colour and write', 'Tô màu', 'Nối tranh'];
  const isVisualDependent = VISUAL_TASK_TYPES.some(t =>
    q.taskTypeEn?.toLowerCase().includes(t.toLowerCase()) ||
    q.taskTypeVi?.toLowerCase().includes(t.toLowerCase()),
  );
  const partHasImages = Boolean(currentPart?.sourcePages?.length || currentPart?.partImage || q.imagePath);
  const showVisualWarning = isVisualDependent && !partHasImages && !q.audioTranscript;

  const isGuided = practiceMode === 'guided';
  const isCheckedNow = Boolean(checkedQuestionIds[q.id]);
  const currentQCorrect = isQuestionEvaluatedCorrect(q);
  const qListenCount = listenCounts[q.id] ?? 0;

  const handleSpeakAudio = (slow: boolean) => {
    if (!q.audioTranscript) return;
    setListenCounts(prev => ({ ...prev, [q.id]: (prev[q.id] ?? 0) + 1 }));
    if (slow) {
      speakSlowly(q.audioTranscript, 'en-GB', () => setPlayingAudioId(null));
      setPlayingAudioId(q.id);
    } else {
      speak(
        q.audioTranscript,
        'en-GB',
        0.92,
        () => setPlayingAudioId(null),
        () => setPlayingAudioId(q.id),
      );
    }
  };

  const wordCount = (answers[q.id] || '').trim().split(/\s+/).filter(Boolean).length;

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', borderRadius: 20, padding: 16, color: '#fff', fontFamily: "'Inter',sans-serif" }}>
      {/* Header: timer + mode + exit */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, gap: 8, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            onClick={() => {
              stopSpeech();
              setState('menu');
            }}
            style={{
              minHeight: 28,
              padding: '4px 10px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'transparent',
              color: '#cbd5e0',
              fontSize: 11,
              cursor: 'pointer',
            }}
          >
            ← Menu
          </button>
          <span style={{ fontSize: 12, color: '#a0aec0' }}>
            Part {currentPart?.partNumber}: {currentPart?.titleVi}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, background: isGuided ? 'rgba(72,187,120,0.16)' : 'rgba(249,212,35,0.16)', color: isGuided ? '#68d391' : '#f9d423', fontWeight: 700 }}>
            {isGuided ? '🧠 Guided' : '⏱️ Exam'}
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: timeLeft < 60 ? '#fc8181' : '#f9d423' }}>
            ⏱ {mins}:{secs.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, marginBottom: 10 }}>
        <div style={{ height: '100%', width: `${((currentQ + 1) / total) * 100}%`, background: 'linear-gradient(90deg, #667eea, #764ba2)', borderRadius: 2, transition: 'width 0.3s' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
        <p style={{ fontSize: 11, color: '#a0aec0', margin: 0 }}>
          Câu {currentQ + 1}/{total} • {currentPart?.instructionVi}
        </p>
        {isGuided && q.strategyVi && (
          <button
            type="button"
            onClick={() => setShowStrategyDrawer(prev => !prev)}
            style={{
              minHeight: 28,
              padding: '4px 10px',
              borderRadius: 8,
              border: '1px solid rgba(56,189,248,0.35)',
              background: showStrategyDrawer ? 'rgba(56,189,248,0.2)' : 'rgba(56,189,248,0.08)',
              color: '#7dd3fc',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {showStrategyDrawer ? '🔽 Ẩn cách giải' : '🧠 Hướng dẫn cách giải (không lộ đáp án)'}
          </button>
        )}
      </div>

      {/* Strategy Drawer (no answer leak) */}
      {isGuided && showStrategyDrawer && (
        <div style={{ ...card, background: 'rgba(56,189,248,0.09)', borderColor: 'rgba(56,189,248,0.28)' }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: '#7dd3fc', marginBottom: 4 }}>
            🎯 Chiến lược giải dạng bài: {q.taskTypeVi}
          </div>
          <p style={{ margin: 0, fontSize: 12, color: '#e2e8f0', whiteSpace: 'pre-line', lineHeight: 1.55 }}>
            {q.strategyVi}
          </p>
        </div>
      )}

      {/* Visual Dependency Warning */}
      {showVisualWarning && (
        <div style={{
          marginBottom: 12,
          padding: '10px 14px',
          borderRadius: 12,
          background: 'linear-gradient(135deg, rgba(246,173,85,0.15), rgba(237,137,54,0.1))',
          border: '1px solid rgba(246,173,85,0.3)',
        }}>
          <p style={{ margin: 0, fontSize: 12, color: '#f6ad55', fontWeight: 600 }}>
            🖼️ Câu hỏi này yêu cầu quan sát tranh trong sách. Hãy mở sách bài thi gốc để xem tranh minh họa.
          </p>
        </div>
      )}

      {/* Part Audio (if any) */}
      {currentPart?.audioUrl && (
        <div style={{ marginBottom: 16 }}>
          <audio controls src={resolveAssetUrl(currentPart.audioUrl)} style={{ width: '100%', borderRadius: 8 }} />
        </div>
      )}

      {/* Part illustration images */}
      {(currentPart?.sourcePages?.length || currentPart?.partImage) && (
        <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {currentPart?.sourcePages?.map((pageSrc, idx) => (
            <div key={idx} style={{ width: '100%', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#fff' }}>
              <img src={resolveAssetUrl(pageSrc)} alt={`Source page ${idx + 1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          ))}
          {(!currentPart?.sourcePages || currentPart.sourcePages.length === 0) && currentPart?.partImage && (
            <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <img src={resolveAssetUrl(currentPart.partImage)} alt={currentPart.titleVi} style={{ width: '100%', maxHeight: 240, objectFit: 'contain', background: 'rgba(255,255,255,0.04)' }} />
            </div>
          )}
        </div>
      )}

      {/* Question Card */}
      <div style={{ ...card, padding: 16 }}>
        {q.imagePath && (
          <img
            src={resolveAssetUrl(q.imagePath)}
            alt={q.prompt}
            style={{ width: '100%', maxHeight: 280, objectFit: 'contain', borderRadius: 12, marginBottom: 10, border: '1px solid rgba(255,255,255,0.1)' }}
          />
        )}
        {q.imageEmoji && !q.imagePath && (
          <div style={{ fontSize: 44, textAlign: 'center', marginBottom: 8 }}>{q.imageEmoji}</div>
        )}
        <p style={{ fontSize: 16, fontWeight: 600, margin: '0 0 12px', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{q.prompt}</p>

        {/* Listening Audio Player */}
        {q.audioUrl ? (
          <div style={{ marginBottom: 16 }}>
            <audio controls src={resolveAssetUrl(q.audioUrl)} style={{ width: '100%', borderRadius: 8 }} />
          </div>
        ) : q.audioTranscript ? (
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => handleSpeakAudio(false)}
                style={{
                  flex: 2,
                  minWidth: 160,
                  minHeight: 40,
                  padding: '10px 12px',
                  background: playingAudioId === q.id ? '#48bb78' : 'linear-gradient(90deg, #667eea, #764ba2)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {playingAudioId === q.id ? '🔊 Đang phát...' : `🔊 Nghe đoạn hội thoại (${qListenCount}/2 lần)`}
              </button>
              <button
                type="button"
                onClick={() => handleSpeakAudio(true)}
                style={{
                  minHeight: 40,
                  padding: '10px 12px',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#e2e8f0',
                  border: '1px solid rgba(255,255,255,0.16)',
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                🐢 Chậm
              </button>
              {playingAudioId === q.id && (
                <button
                  type="button"
                  onClick={() => {
                    stopSpeech();
                    setPlayingAudioId(null);
                  }}
                  style={{
                    minHeight: 40,
                    padding: '10px 12px',
                    background: 'rgba(239,68,68,0.2)',
                    color: '#fca5a5',
                    border: '1px solid rgba(239,68,68,0.35)',
                    borderRadius: 10,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  ⏹️ Dừng
                </button>
              )}
              {isGuided && (
                <button
                  type="button"
                  onClick={() => setShowTranscript(prev => !prev)}
                  style={{
                    minHeight: 40,
                    padding: '10px 12px',
                    background: 'rgba(255,255,255,0.06)',
                    color: '#cbd5e0',
                    border: '1px solid rgba(255,255,255,0.14)',
                    borderRadius: 10,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {showTranscript ? 'Ẩn lời thoại' : '📄 Xem lời thoại'}
                </button>
              )}
            </div>
            {isGuided && showTranscript && (
              <div style={{ marginTop: 8, padding: 10, borderRadius: 10, background: 'rgba(15,23,42,0.55)', fontSize: 12, color: '#cbd5e0', whiteSpace: 'pre-line', lineHeight: 1.55 }}>
                {q.audioTranscript}
              </div>
            )}
          </div>
        ) : null}

        {/* === ANSWER INPUT SECTION === */}
        {isSpellType && (
          <div>
            <input
              type="text"
              value={answers[q.id] || ''}
              onChange={e => selectAnswer(q.id, e.target.value.toLowerCase().trim())}
              placeholder="Gõ từ đúng ở đây..."
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '2px solid rgba(102,126,234,0.4)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 18, outline: 'none', boxSizing: 'border-box', letterSpacing: 2, fontWeight: 600 }}
            />
          </div>
        )}

        {isOpenGapFill && !isSelfAssessmentType && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 18 }}>✏️</span>
              <span style={{ fontSize: 12, color: '#a0aec0' }}>Gõ câu trả lời vào ô bên dưới:</span>
            </div>
            <input
              type="text"
              value={answers[q.id] || ''}
              onChange={e => selectAnswer(q.id, e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && answers[q.id] && currentQ < total - 1) {
                  goToQuestion(currentQ + 1);
                }
              }}
              placeholder="Gõ từ hoặc số..."
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: 12,
                border: '2px solid rgba(102,126,234,0.5)',
                background: 'rgba(102,126,234,0.08)',
                color: '#fff',
                fontSize: 18,
                fontWeight: 600,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        )}

        {isSelfAssessmentType && (
          <div>
            {q.taskTypeEn === 'Speaking' && (
              <button
                type="button"
                onClick={() => speak(q.prompt, 'en-GB', 0.88)}
                style={{
                  minHeight: 36,
                  padding: '8px 12px',
                  borderRadius: 10,
                  border: '1px solid rgba(99,179,237,0.35)',
                  background: 'rgba(99,179,237,0.12)',
                  color: '#90cdf4',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginBottom: 10,
                }}
              >
                🔊 Nghe giám khảo hỏi
              </button>
            )}
            <textarea
              value={answers[q.id] === 'self-assessed' ? '' : (answers[q.id] || '')}
              onChange={e => selectAnswer(q.id, e.target.value)}
              rows={4}
              placeholder={q.taskTypeEn === 'Speaking' ? 'Ghi dàn ý câu trả lời rồi tập nói to thành câu đầy đủ...' : 'Viết câu trả lời của con vào đây...'}
              style={{
                width: '100%',
                padding: 12,
                borderRadius: 10,
                border: '1.5px solid rgba(102,126,234,0.45)',
                background: 'rgba(255,255,255,0.06)',
                color: '#fff',
                fontSize: 14,
                lineHeight: 1.5,
                boxSizing: 'border-box',
                marginBottom: 6,
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: '#a0aec0', marginBottom: 10 }}>
              <span>Số từ đã viết: <strong style={{ color: '#f9d423' }}>{wordCount}</strong></span>
              <button
                type="button"
                onClick={() => {
                  setShowExplanation(showExplanation === q.id ? null : q.id);
                  if (!answers[q.id]) selectAnswer(q.id, 'self-assessed');
                }}
                style={{
                  minHeight: 32,
                  padding: '6px 12px',
                  borderRadius: 8,
                  border: 'none',
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #48bb78, #38a169)',
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {showExplanation === q.id ? '🔽 Ẩn bài mẫu & rubric' : '💬 Xem rubric & bài mẫu'}
              </button>
            </div>

            {q.rubricVi && q.rubricVi.length > 0 && (
              <div style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', marginBottom: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#90cdf4', marginBottom: 6 }}>
                  ✅ Tự chấm theo tiêu chí Cambridge (tick các ý đã đạt):
                </div>
                <div style={{ display: 'grid', gap: 6 }}>
                  {q.rubricVi.map((rubric, idx) => {
                    const checked = Boolean(rubricChecks[q.id]?.[idx]);
                    return (
                      <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#e2e8f0', cursor: 'pointer', minHeight: 26 }}>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleRubricCheck(q, idx)}
                          style={{ width: 18, height: 18 }}
                        />
                        <span>{rubric}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {showExplanation === q.id && (
              <div style={{ padding: '12px 14px', background: 'rgba(72,187,120,0.08)', borderRadius: 10, border: '1px solid rgba(72,187,120,0.2)' }}>
                <p style={{ margin: '0 0 6px', fontSize: 13, color: '#68d391', fontWeight: 600 }}>📝 Gợi ý mẫu:</p>
                <p style={{ margin: '0 0 8px', fontSize: 13, color: '#e2e8f0', lineHeight: 1.6, fontStyle: 'italic' }}>
                  {(q.modelAnswer || q.explanationVi)?.replace(/^Gợi ý:\s*/, '')}
                </p>
                {q.strategyVi && (
                  <p style={{ margin: 0, fontSize: 11, color: '#cbd5e0' }}>
                    🧠 <strong>Mẹo:</strong> {q.strategyVi}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* MCQ Options */}
        {!isSpellType && !isOpenGapFill && !isSelfAssessmentType && q.options?.map((opt, i) => {
          const selected = answers[q.id] === opt;
          return (
            <button
              type="button"
              key={i}
              onClick={() => selectAnswer(q.id, opt)}
              style={{
                width: '100%',
                minHeight: 42,
                padding: '10px 12px',
                marginBottom: 6,
                borderRadius: 10,
                border: selected ? '1.5px solid #93c5fd' : '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: 14,
                fontWeight: selected ? 700 : 400,
                transition: 'all 0.2s',
                background: selected ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.06)',
                color: '#fff',
              }}
            >
              {String.fromCharCode(65 + i)}. {opt}
            </button>
          );
        })}

        {/* Guided Mode: Check current question immediately */}
        {isGuided && !isSelfAssessmentType && answers[q.id] && (
          <div style={{ marginTop: 8 }}>
            <button
              type="button"
              onClick={() => setCheckedQuestionIds(prev => ({ ...prev, [q.id]: !prev[q.id] }))}
              style={{
                minHeight: 34,
                padding: '6px 12px',
                borderRadius: 8,
                border: '1px solid rgba(249,212,35,0.35)',
                background: 'rgba(249,212,35,0.1)',
                color: '#f9d423',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {isCheckedNow ? 'Ẩn đáp án câu này' : '🔍 Kiểm tra & giải thích câu này'}
            </button>
            {isCheckedNow && (
              <div
                style={{
                  marginTop: 8,
                  padding: 10,
                  borderRadius: 10,
                  background: currentQCorrect ? 'rgba(72,187,120,0.12)' : 'rgba(252,129,129,0.12)',
                  border: `1px solid ${currentQCorrect ? 'rgba(72,187,120,0.35)' : 'rgba(252,129,129,0.35)'}`,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 800, color: currentQCorrect ? '#68d391' : '#feb2b2', marginBottom: 4 }}>
                  {currentQCorrect ? '✅ Chính xác!' : `❌ Chưa đúng — Đáp án đúng: ${q.answer}`}
                </div>
                <p style={{ margin: 0, fontSize: 12, color: '#e2e8f0', lineHeight: 1.55 }}>{q.explanationVi}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Nav buttons */}
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        {currentQ > 0 && (
          <button
            type="button"
            onClick={() => goToQuestion(currentQ - 1)}
            style={{
              flex: 1,
              minHeight: 42,
              padding: '10px',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 10,
              background: 'transparent',
              color: '#fff',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            ← Quay lại
          </button>
        )}
        {currentQ < total - 1 ? (
          <button
            type="button"
            onClick={() => goToQuestion(currentQ + 1)}
            disabled={!answers[q.id]}
            style={{
              flex: 1,
              minHeight: 42,
              padding: '10px',
              border: 'none',
              borderRadius: 10,
              cursor: answers[q.id] ? 'pointer' : 'not-allowed',
              background: answers[q.id] ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            Tiếp theo →
          </button>
        ) : (
          <button
            type="button"
            onClick={() => finalizeAndSubmit(activeTest, answers, rubricChecks)}
            disabled={!answers[q.id]}
            style={{
              flex: 1,
              minHeight: 42,
              padding: '10px',
              border: 'none',
              borderRadius: 10,
              cursor: answers[q.id] ? 'pointer' : 'not-allowed',
              background: answers[q.id] ? 'linear-gradient(135deg, #f9d423, #ff4e50)' : 'rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            🏆 Nộp bài & Xem kết quả
          </button>
        )}
      </div>

      {/* Quick jump pills (accessible >= 24px target size) */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginTop: 10, flexWrap: 'wrap' }}>
        {allQuestions.map((item, i) => (
          <button
            type="button"
            key={item.id}
            onClick={() => goToQuestion(i)}
            aria-label={`Câu ${i + 1}`}
            style={{
              minWidth: 26,
              minHeight: 26,
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              fontSize: 10,
              fontWeight: 800,
              background: i === currentQ ? '#f9d423' : answers[item.id] ? '#48bb78' : 'rgba(255,255,255,0.14)',
              color: i === currentQ ? '#0f172a' : '#fff',
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
