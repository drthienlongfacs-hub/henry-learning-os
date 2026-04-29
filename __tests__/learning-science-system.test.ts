import { describe, expect, it } from 'vitest';
import { LEARNING_SCIENCE_PRINCIPLES, LEARNING_SCIENCE_STATS, PRINCIPLE_SEQUENCE } from '@/data/learning-science-system';
import { LEARNING_SOURCES } from '@/data/curriculum-enrichment';
import { buildWholeChildLearningPlan } from '@/lib/whole-child-learning-plan';
import type { Attempt, Mistake, ReviewSchedule } from '@/types';

describe('learning science system', () => {
    it('keeps every learning principle evidence-linked and implementation-ready', () => {
        expect(LEARNING_SCIENCE_STATS.principleCount).toBeGreaterThanOrEqual(10);
        expect(LEARNING_SCIENCE_STATS.sourceCount).toBeGreaterThanOrEqual(10);

        PRINCIPLE_SEQUENCE.forEach((id) => {
            const principle = LEARNING_SCIENCE_PRINCIPLES[id];
            expect(principle.label.length).toBeGreaterThan(4);
            expect(principle.learnerBenefit.length).toBeGreaterThan(20);
            expect(principle.appMechanism.length).toBeGreaterThan(20);
            expect(principle.benchmarkPattern.length).toBeGreaterThan(10);
            expect(principle.implementationCheck.length).toBeGreaterThanOrEqual(3);
            principle.sourceIds.forEach((sourceId) => {
                expect(LEARNING_SOURCES[sourceId], `${id} unknown source ${sourceId}`).toBeTruthy();
            });
        });
    });

    it('builds a whole-child plan from actual local evidence buckets', () => {
        const attempts = [
            { competencyId: 'add_sub_10', isCorrect: true, hintLevelUsed: 0 },
            { competencyId: 'add_sub_10', isCorrect: false, hintLevelUsed: 1 },
        ].map((attempt, index) => ({
            id: `a-${index}`,
            childId: 'child-1',
            lessonId: `l-${index}`,
            exerciseId: `e-${index}`,
            answer: 'x',
            errorType: attempt.isCorrect ? null : 'concept',
            timeSpentSeconds: 20,
            confidenceSelfRating: 3,
            aiRoleUsed: 'tutor',
            createdAt: `2026-04-2${index}T00:00:00.000Z`,
            ...attempt,
        })) as Attempt[];
        const mistakes = [{ id: 'm-1', childId: 'child-1', competencyId: 'add_sub_10', attemptId: 'a-1', errorType: 'concept', explanation: 'Sai', correctionPlan: 'Sửa', reviewSchedule: [], resolvedAt: null }] as Mistake[];
        const reviewSchedules = [{ id: 'r-1', childId: 'child-1', itemType: 'mistake', itemId: 'm-1', scheduledAt: '2026-01-01T00:00:00.000Z', intervalDays: 0, easeFactor: 2.5, lastResult: null }] as ReviewSchedule[];

        const plan = buildWholeChildLearningPlan({ attempts, mistakes, reviewSchedules });
        expect(plan).toHaveLength(4);
        expect(plan.find((card) => card.id === 'memory')?.metric).toContain('1');
        expect(plan.find((card) => card.id === 'repair')?.metric).toContain('1');
        expect(plan.every((card) => card.principleIds.length > 0)).toBe(true);
    });
});
