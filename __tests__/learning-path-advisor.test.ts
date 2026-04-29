import { describe, expect, it } from 'vitest';
import { getTopicLearningPlan, summarizeSubjectPlan } from '@/lib/learning-path-advisor';
import type { Attempt } from '@/types';

function attempt(topicKey: string, isCorrect: boolean, index: number, hintLevelUsed = 0): Pick<Attempt, 'competencyId' | 'isCorrect' | 'createdAt' | 'hintLevelUsed'> {
    return {
        competencyId: topicKey,
        isCorrect,
        hintLevelUsed,
        createdAt: `2026-04-${String(20 + index).padStart(2, '0')}T00:00:00.000Z`,
    };
}

describe('learning path advisor', () => {
    it('marks new topics without inventing an accuracy score', () => {
        const plan = getTopicLearningPlan('add_sub_10', 'math', []);
        expect(plan.status).toBe('new');
        expect(plan.accuracy).toBeNull();
        expect(plan.recommendedMode).toBe('deep');
        expect(plan.benchmarkSignal).toContain('Khan Academy');
    });

    it('routes weak recent evidence to focused repair', () => {
        const plan = getTopicLearningPlan('add_sub_10', 'math', [
            attempt('add_sub_10', false, 1),
            attempt('add_sub_10', false, 2),
            attempt('add_sub_10', true, 3),
        ]);
        expect(plan.status).toBe('repair');
        expect(plan.recommendedMode).toBe('focused');
        expect(plan.nextAction).toContain('phiên Gọn');
    });

    it('routes strong evidence to challenge stretch', () => {
        const attempts = Array.from({ length: 10 }, (_, index) => attempt('add_sub_10', true, index));
        const plan = getTopicLearningPlan('add_sub_10', 'math', attempts);
        expect(plan.status).toBe('stretch');
        expect(plan.recommendedMode).toBe('challenge');
        expect(plan.accuracy).toBe(100);
    });

    it('summarizes a subject into actionable buckets', () => {
        const summary = summarizeSubjectPlan('math', ['add_sub_10', 'place_value'], [
            attempt('add_sub_10', false, 1),
            attempt('add_sub_10', false, 2),
        ]);
        expect(summary.totalTopics).toBe(2);
        expect(summary.repairCount).toBe(1);
        expect(summary.unseenCount).toBe(1);
        expect(summary.nextPlan.topicKey).toBe('add_sub_10');
    });
});
