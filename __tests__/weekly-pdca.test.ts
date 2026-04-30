import { describe, expect, it } from 'vitest';
import { buildWeeklyPdcaPlan } from '@/lib/evidence/weekly-pdca';
import type { Attempt, Mistake, ReviewSchedule } from '@/types';

function attempt(id: number, competencyId: string, isCorrect: boolean, createdAt: string, hintLevelUsed = 0): Attempt {
    return {
        id: `a-${id}`,
        childId: 'child-1',
        lessonId: 'lesson-1',
        competencyId,
        exerciseId: `e-${id}`,
        answer: isCorrect ? '15' : '14',
        isCorrect,
        errorType: isCorrect ? null : 'calculation',
        hintLevelUsed,
        timeSpentSeconds: 30,
        confidenceSelfRating: 3,
        aiRoleUsed: 'tutor',
        createdAt,
    };
}

function mistake(id: number, competencyId: string, resolvedAt: string | null = null): Mistake {
    return {
        id: `m-${id}`,
        childId: 'child-1',
        competencyId,
        attemptId: `a-${id}`,
        errorType: 'calculation',
        explanation: 'Sai phép tính gần đáp án đúng.',
        correctionPlan: 'Tính lại từng bước và dùng phép ngược.',
        reviewSchedule: [],
        resolvedAt,
    };
}

describe('weekly RCA/PDCA evidence loop', () => {
    it('returns a missing-data state instead of inventing an outcome delta', () => {
        const plan = buildWeeklyPdcaPlan({
            attempts: [],
            mistakes: [],
            reviewSchedules: [],
            now: new Date('2026-04-30T00:00:00.000Z'),
        });

        expect(plan.status).toBe('missing_data');
        expect(plan.rootCause).toBe('insufficient_data');
        expect(plan.recheck.outcomeDeltaPct).toBeNull();
        expect(plan.noOverclaim).toContain('Không claim');
    });

    it('selects the top recurring mistake and creates a parent mission with recheck', () => {
        const plan = buildWeeklyPdcaPlan({
            attempts: [
                attempt(1, 'add_sub_20', false, '2026-04-27T00:00:00.000Z', 2),
                attempt(2, 'add_sub_20', true, '2026-04-28T00:00:00.000Z', 1),
                attempt(3, 'add_sub_20', false, '2026-04-29T00:00:00.000Z', 2),
            ],
            mistakes: [mistake(1, 'add_sub_20'), mistake(2, 'add_sub_20')],
            reviewSchedules: [],
            now: new Date('2026-04-30T00:00:00.000Z'),
            childName: 'Henry',
        });

        expect(plan.status).toBe('planned');
        expect(plan.baseline.topicKey).toBe('add_sub_20');
        expect(plan.rootCause).toBe('calculation_slip');
        expect(plan.parentMission.title).toContain('Henry');
        expect(plan.recheck.recheckAt).toContain('2026-05-07');
        expect(plan.sourceIds).toContain('sot-traceability-matrix');
    });

    it('computes outcome delta only when follow-up attempts exist after the prior plan', () => {
        const validated = buildWeeklyPdcaPlan({
            attempts: [
                attempt(1, 'add_sub_20', false, '2026-04-27T00:00:00.000Z', 2),
                attempt(2, 'add_sub_20', true, '2026-05-03T00:00:00.000Z', 0),
                attempt(3, 'add_sub_20', true, '2026-05-04T00:00:00.000Z', 0),
            ],
            mistakes: [mistake(1, 'add_sub_20')],
            reviewSchedules: [],
            previousPlan: {
                createdAt: '2026-04-30T00:00:00.000Z',
                recheckAt: '2026-05-07T00:00:00.000Z',
                topicKey: 'add_sub_20',
                baselineAccuracyPct: 33,
            },
            now: new Date('2026-05-08T00:00:00.000Z'),
        });

        expect(validated.status).toBe('validated');
        expect(validated.recheck.outcomeDeltaPct).toBe(67);
        expect(validated.actDecision).toContain('tăng');
    });

    it('uses due review as a retention-gap issue when no mistake dominates', () => {
        const review: ReviewSchedule = {
            id: 'r-1',
            childId: 'child-1',
            itemType: 'competency',
            itemId: 'place_value',
            scheduledAt: '2026-04-29T00:00:00.000Z',
            intervalDays: 3,
            easeFactor: 2.5,
            lastResult: null,
        };
        const plan = buildWeeklyPdcaPlan({
            attempts: [attempt(1, 'place_value', true, '2026-04-27T00:00:00.000Z')],
            mistakes: [],
            reviewSchedules: [review],
            now: new Date('2026-04-30T00:00:00.000Z'),
        });

        expect(plan.rootCause).toBe('retention_gap');
        expect(plan.parentMission.title).toContain('Ôn');
        expect(plan.baseline.dueReviewCount).toBe(1);
    });
});

