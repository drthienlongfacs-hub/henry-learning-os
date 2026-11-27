import { beforeEach, describe, expect, it, vi } from 'vitest';
import { OFFICIAL_FORMAT_PRACTICE_TESTS } from '@/data/practice-test-bank';
import { CAMBRIDGE_EXAMS, EXAM_PATHWAY, STUDY_PLANS } from '@/data/cambridge-exam-prep';
import {
  clearExamHistory,
  getLevelAnalytics,
  getOverallExamSummary,
  loadExamHistory,
  recordExamAttempt,
} from '@/lib/exam-analytics';

describe('Cambridge exam bank quality audit & anti-bias guard', () => {
  it('eliminates answer-position bias (>=3 options) across all 50 generated test sets', () => {
    const mcQuestions = OFFICIAL_FORMAT_PRACTICE_TESTS
      .flatMap(t => t.parts.flatMap(p => p.questions))
      .filter(q => !q.selfAssessment && q.options && q.options.length >= 3);

    const firstOptionMatches = mcQuestions.filter(q => q.options?.[0] === q.answer).length;
    const ratio = firstOptionMatches / mcQuestions.length;

    expect(mcQuestions.length).toBeGreaterThan(1000);
    expect(ratio).toBeLessThan(0.55);
  });

  it('guarantees every objective question answer exists in its options and gap prompts have blanks', () => {
    const noDiacriticsRe = /\b(khong|nguoi|dap an|cau hoi|doan van|chinh xac|truyen|chon|viet|xac dinh)\b/i;

    for (const test of OFFICIAL_FORMAT_PRACTICE_TESTS) {
      for (const part of test.parts) {
        for (const q of part.questions) {
          if (q.options && q.options.length > 0 && !q.selfAssessment) {
            expect(q.options, `${q.id} missing answer in options`).toContain(q.answer);
            expect(q.options.every(o => /^Person \d+$/.test(o)), `${q.id} has opaque Person N option`).toBe(false);
          }

          if (
            q.prompt.includes('fill the gap') ||
            q.prompt.includes('fill each gap') ||
            q.prompt.includes('to fill the gap')
          ) {
            expect(q.prompt, `${q.id} gap prompt missing ____`).toContain('____');
          }

          if (q.prompt.includes('Time: ____')) {
            expect(q.answer, `${q.id} Time prompt should have time answer`).toMatch(/^\d+\.\d+$/);
          }

          if (q.taskTypeEn === 'Spell') {
            const jumbled = q.prompt.split('\n').pop()?.replace(/\s+/g, '').toLowerCase();
            expect(jumbled, `${q.id} jumbled letters must differ from answer`).not.toBe(q.answer.toLowerCase());
          }

          expect(noDiacriticsRe.test(q.explanationVi), `${q.id} explanation missing diacritics`).toBe(false);
        }
      }
    }
  });

  it('covers all 5 Cambridge levels (Starters -> PET) in ExamPrepGuide datasets', () => {
    expect(STUDY_PLANS.map(p => p.level)).toEqual(['starters', 'movers', 'flyers', 'ket', 'pet']);
    expect(CAMBRIDGE_EXAMS.map(e => e.id)).toEqual(['yle_starters', 'yle_movers', 'yle_flyers', 'main_ket', 'main_pet']);
    expect(EXAM_PATHWAY[6].current).toBe('main_ket');
    expect(EXAM_PATHWAY[7].current).toBe('main_pet');
  });
});

describe('Real data-driven exam analytics store (positive & negative tests)', () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    vi.stubGlobal('window', {
      localStorage: {
        getItem: (k: string) => store.get(k) ?? null,
        setItem: (k: string, v: string) => {
          store.set(k, v);
        },
        removeItem: (k: string) => {
          store.delete(k);
        },
      },
    });
    clearExamHistory();
  });

  it('records attempts, identifies weak task types (<75%), and recommends targeted strategy', () => {
    recordExamAttempt({
      source: 'exams-bank',
      level: 'starters',
      testId: 'starters_set_1_rw',
      testTitle: 'Đọc & Viết — Bộ 1',
      setNo: 1,
      skill: 'reading_writing',
      mode: 'guided',
      score: 18,
      total: 25,
      accuracyPct: 72,
      shields: 4,
      durationSec: 420,
      partBreakdown: [
        { partNumber: 1, partTitle: 'True/False', taskTypeVi: 'Đúng/sai với tranh và từ', correct: 5, total: 5, accuracyPct: 100 },
        { partNumber: 3, partTitle: 'Jumbled letters', taskTypeVi: 'Sắp chữ thành từ', correct: 2, total: 5, accuracyPct: 40 },
      ],
      wrongQuestionIds: ['q1', 'q2', 'q3'],
    });

    const analytics = getLevelAnalytics('starters');
    expect(analytics.attemptCount).toBe(1);
    expect(analytics.averageAccuracyPct).toBe(72);
    expect(analytics.weakTaskTypes).toHaveLength(1);
    expect(analytics.weakTaskTypes[0].taskTypeVi).toBe('Sắp chữ thành từ');
    expect(analytics.strongTaskTypes[0].taskTypeVi).toBe('Đúng/sai với tranh và từ');
    expect(analytics.nextActionVi).toContain('Sắp chữ thành từ');
    expect(analytics.wrongQuestionPool).toEqual(['q1', 'q2', 'q3']);

    const summary = getOverallExamSummary();
    expect(summary.totalAttempts).toBe(1);
    expect(summary.uniqueTestsCompleted).toBe(1);
  });

  it('handles corrupted localStorage JSON gracefully without throwing (negative test)', () => {
    window.localStorage.setItem('henry-cambridge-exam-history-v1', '{corrupted_json');
    expect(loadExamHistory()).toEqual([]);

    window.localStorage.setItem('henry-cambridge-exam-history-v1', JSON.stringify([{ bad: true }, null, 42]));
    expect(loadExamHistory()).toEqual([]);

    const empty = getLevelAnalytics('ket');
    expect(empty.attemptCount).toBe(0);
    expect(empty.nextActionVi).toContain('Chưa có dữ liệu thi');
  });
});
