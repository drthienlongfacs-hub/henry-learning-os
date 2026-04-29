import { describe, expect, it } from 'vitest';
import { buildSubjectEvidenceDashboard, buildTopicEvidenceProfile } from '@/lib/evidence/learning-evidence';
import { buildQuestionPresentationPlan } from '@/lib/pedagogy/question-presentation';
import type { Attempt, Mistake, ReviewSchedule } from '@/types';

function attempt(topicKey: string, isCorrect: boolean, index: number, hintLevelUsed = 0): Attempt {
    return {
        id: `a-${index}`,
        childId: 'child-1',
        lessonId: `lesson-${index}`,
        competencyId: topicKey,
        exerciseId: `exercise-${index}`,
        answer: 'x',
        isCorrect,
        errorType: isCorrect ? null : 'concept',
        hintLevelUsed,
        timeSpentSeconds: 20,
        confidenceSelfRating: 3,
        aiRoleUsed: 'tutor',
        createdAt: `2026-04-${String(10 + index).padStart(2, '0')}T00:00:00.000Z`,
    };
}

describe('learning evidence system', () => {
    it('does not invent accuracy when a topic has no attempts', () => {
        const profile = buildTopicEvidenceProfile({
            topicKey: 'add_sub_10',
            subject: 'math',
            attempts: [],
            mistakes: [],
            reviewSchedules: [],
            now: new Date('2026-04-29T00:00:00.000Z'),
        });

        expect(profile.accuracyPct).toBeNull();
        expect(profile.hintDependencyPct).toBeNull();
        expect(profile.reliability).toBe('insufficient');
        expect(profile.decision).toBe('observe');
        expect(profile.evidenceSummary).toContain('Chưa có accuracy');
    });

    it('counts source attempts, hints, unresolved mistakes and due reviews exactly', () => {
        const attempts = [
            attempt('add_sub_10', false, 1, 1),
            attempt('add_sub_10', false, 2, 0),
            attempt('add_sub_10', true, 3, 0),
            attempt('place_value', true, 4, 0),
        ];
        const mistakes: Mistake[] = [
            {
                id: 'm-1',
                childId: 'child-1',
                competencyId: 'add_sub_10',
                attemptId: 'a-1',
                errorType: 'concept',
                explanation: 'Sai ý chính',
                correctionPlan: 'Sửa bằng mô hình',
                reviewSchedule: [],
                resolvedAt: null,
            },
        ];
        const reviewSchedules: ReviewSchedule[] = [
            {
                id: 'r-1',
                childId: 'child-1',
                itemType: 'mistake',
                itemId: 'm-1',
                scheduledAt: '2026-04-20T00:00:00.000Z',
                intervalDays: 0,
                easeFactor: 2.5,
                lastResult: null,
            },
        ];

        const profile = buildTopicEvidenceProfile({
            topicKey: 'add_sub_10',
            subject: 'math',
            attempts,
            mistakes,
            reviewSchedules,
            now: new Date('2026-04-29T00:00:00.000Z'),
        });

        expect(profile.sampleSize).toBe(3);
        expect(profile.accuracyPct).toBe(33);
        expect(profile.hintDependencyPct).toBe(33);
        expect(profile.unresolvedMistakeCount).toBe(1);
        expect(profile.dueReviewCount).toBe(1);
        expect(profile.decision).toBe('repair');
    });

    it('builds subject recommendations from real local evidence buckets', () => {
        const dashboard = buildSubjectEvidenceDashboard({
            subject: 'math',
            topicKeys: ['add_sub_10', 'place_value'],
            attempts: [
                attempt('add_sub_10', true, 1, 0),
                attempt('add_sub_10', true, 2, 0),
                attempt('add_sub_10', true, 3, 0),
                attempt('add_sub_10', true, 4, 0),
                attempt('add_sub_10', true, 5, 0),
                attempt('add_sub_10', true, 6, 0),
                attempt('add_sub_10', true, 7, 0),
                attempt('add_sub_10', true, 8, 0),
                attempt('add_sub_10', true, 9, 0),
                attempt('add_sub_10', true, 10, 0),
            ],
            mistakes: [],
            reviewSchedules: [],
            now: new Date('2026-04-29T00:00:00.000Z'),
        });

        expect(dashboard.totalAttempts).toBe(10);
        expect(dashboard.meanAccuracyPct).toBe(100);
        expect(dashboard.accelerateGuardedCount).toBe(1);
        expect(dashboard.insufficientCount).toBe(1);
        expect(dashboard.recommendations.some((rec) => rec.evidence.includes('10 bài làm'))).toBe(true);
    });

    it('turns a question into a presentation plan with benchmark and anti-misconception checks', () => {
        const evidenceProfile = buildTopicEvidenceProfile({
            topicKey: 'weather_earth',
            subject: 'science',
            attempts: [attempt('weather_earth', true, 1, 0)],
            mistakes: [],
            reviewSchedules: [],
            now: new Date('2026-04-29T00:00:00.000Z'),
        });
        const plan = buildQuestionPresentationPlan({
            subject: 'science',
            evidenceProfile,
            problem: {
                question: 'Vì sao trời có mưa?',
                explanation: 'Nước bay hơi, ngưng tụ rồi rơi xuống.',
                topic: 'Thời tiết & Trái Đất',
                topicKey: 'weather_earth',
                type: 'weather',
            },
        });

        expect(plan.beforeAnswer.map((step) => step.label)).toEqual(['Hiểu đề', 'Dữ kiện', 'Chiến lược', 'Dự đoán lỗi']);
        expect(plan.answerProtocol.join(' ')).toContain('bằng chứng');
        expect(plan.benchmarkSignal).toContain('NGSS');
        expect(plan.misconceptionCheck.length).toBeGreaterThan(0);
    });
});
