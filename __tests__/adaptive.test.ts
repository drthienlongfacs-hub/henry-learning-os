// ========================================
// Adaptive Acceleration Engine Tests
// ========================================
import { describe, it, expect } from 'vitest';
import {
    computeChallengeFitScore,
    getChallengeFitBand,
    computeAccelerationStatus,
    generateRecommendation,
    computeLearningVelocity,
    computeHintDependencyIndex,
} from '@/lib/adaptive/engine';
import {
    evaluateCompaction,
    canTestOut,
    computeAsynchronousProfile,
    generateEnrichments,
} from '@/lib/adaptive/compactor';
import type { SkillState, MasteryState, Lesson, Competency } from '@/types';

const makeSkillState = (overrides: Partial<SkillState> = {}): SkillState => ({
    id: 'ss-1',
    childId: 'child-1',
    skillId: 'phep-cong',
    currentLevel: 'l1',
    recommendedNextLevel: null,
    exposureCount: 10,
    independentAccuracy: 0.8,
    guidedAccuracy: 0.8,
    hintDependency: 0.2,
    averageResponseLatency: 5,
    explanationQuality: 0.7,
    retentionScore: 0.75,
    transferScore: 0.7,
    challengeFitScore: 70,
    learningVelocity: 0.1,
    frustrationSignal: 0.1,
    boredomSignal: 0.1,
    parentObservationScore: 0.8,
    accelerationStatus: 'on_track',
    lastMasteryCheckAt: new Date().toISOString(),
    nextReviewAt: new Date().toISOString(),
    ...overrides,
});

describe('Challenge Fit Score', () => {
    it('computes score in 0-100 range', () => {
        const state = makeSkillState();
        const cfs = computeChallengeFitScore(state);
        expect(cfs).toBeGreaterThanOrEqual(0);
        expect(cfs).toBeLessThanOrEqual(100);
    });

    it('gives high score for strong learner', () => {
        const state = makeSkillState({
            independentAccuracy: 0.95,
            hintDependency: 0.05,
            retentionScore: 0.9,
            transferScore: 0.85,
            frustrationSignal: 0,
            boredomSignal: 0,
        });
        const cfs = computeChallengeFitScore(state);
        expect(cfs).toBeGreaterThan(80);
    });

    it('gives low score for struggling learner', () => {
        const state = makeSkillState({
            independentAccuracy: 0.3,
            hintDependency: 0.8,
            retentionScore: 0.2,
            transferScore: 0.1,
            frustrationSignal: 0.8,
            boredomSignal: 0,
        });
        const cfs = computeChallengeFitScore(state);
        expect(cfs).toBeLessThan(36);
    });

    it('scores in optimal ZPD for balanced learner', () => {
        const state = makeSkillState({
            independentAccuracy: 0.75,
            hintDependency: 0.25,
            retentionScore: 0.7,
            transferScore: 0.65,
            frustrationSignal: 0.15,
            boredomSignal: 0.1,
        });
        const cfs = computeChallengeFitScore(state);
        const band = getChallengeFitBand(cfs);
        expect(band).toBe('optimal_zpd');
    });
});

describe('Challenge Fit Band', () => {
    it('too_hard for ≤35', () => expect(getChallengeFitBand(30)).toBe('too_hard'));
    it('hard_stretch for 36-55', () => expect(getChallengeFitBand(45)).toBe('hard_stretch'));
    it('optimal_zpd for 56-80', () => expect(getChallengeFitBand(70)).toBe('optimal_zpd'));
    it('too_easy for >80', () => expect(getChallengeFitBand(90)).toBe('too_easy'));
});

describe('Acceleration Status', () => {
    it('returns ready_for_acceleration for mastery', () => {
        const status = computeAccelerationStatus(makeSkillState({
            independentAccuracy: 0.97,
            hintDependency: 0.05,
            transferScore: 0.9,
            retentionScore: 0.85,
            frustrationSignal: 0,
            boredomSignal: 0,
        }));
        expect(status).toBe('ready_for_acceleration');
    });

    it('returns overchallenged for high frustration', () => {
        const status = computeAccelerationStatus(makeSkillState({
            frustrationSignal: 0.8,
            independentAccuracy: 0.4,
        }));
        expect(status).toBe('overchallenged');
    });

    it('returns underchallenged for high boredom + accuracy', () => {
        const status = computeAccelerationStatus(makeSkillState({
            boredomSignal: 0.8,
            independentAccuracy: 0.95,
            frustrationSignal: 0,
        }));
        expect(status).toBe('underchallenged');
    });

    it('returns on_track for average learner', () => {
        const status = computeAccelerationStatus(makeSkillState({
            independentAccuracy: 0.75,
            hintDependency: 0.25,
            transferScore: 0.6,
            frustrationSignal: 0.1,
            boredomSignal: 0.1,
        }));
        expect(status).toBe('on_track');
    });

    it('returns foundation_needed for very low accuracy', () => {
        const status = computeAccelerationStatus(makeSkillState({
            independentAccuracy: 0.3,
            hintDependency: 0.7,
            frustrationSignal: 0.3,
            boredomSignal: 0,
        }));
        expect(status).toBe('foundation_needed');
    });
});

describe('Recommendation Generator', () => {
    it('generates accelerate recommendation', () => {
        const rec = generateRecommendation('child-1', makeSkillState({
            independentAccuracy: 0.97, hintDependency: 0.05,
            transferScore: 0.9, retentionScore: 0.85,
        }), 'Toán', 'Phép cộng');
        expect(rec).not.toBeNull();
        expect(rec!.recommendationType).toBe('accelerate');
        expect(rec!.parentAction).toBeTruthy();
        expect(rec!.riskNotes).toBeTruthy();
    });

    it('generates scaffold recommendation for overchallenged', () => {
        const rec = generateRecommendation('child-1', makeSkillState({
            frustrationSignal: 0.8, independentAccuracy: 0.4,
        }), 'Toán', 'Phép cộng');
        expect(rec).not.toBeNull();
        expect(rec!.recommendationType).toBe('scaffold');
    });

    it('returns null for on_track', () => {
        const rec = generateRecommendation('child-1', makeSkillState({
            independentAccuracy: 0.75, hintDependency: 0.25,
            transferScore: 0.6, frustrationSignal: 0.1, boredomSignal: 0.1,
        }), 'Toán', 'Phép cộng');
        expect(rec).toBeNull();
    });
});

describe('Learning Velocity', () => {
    it('returns 0 for no exposures', () => {
        expect(computeLearningVelocity(makeSkillState({ exposureCount: 0 }))).toBe(0);
    });

    it('returns higher velocity for efficient learner', () => {
        const efficient = computeLearningVelocity(makeSkillState({
            independentAccuracy: 0.9, transferScore: 0.9, exposureCount: 5,
        }));
        const slow = computeLearningVelocity(makeSkillState({
            independentAccuracy: 0.5, transferScore: 0.3, exposureCount: 20,
        }));
        expect(efficient).toBeGreaterThan(slow);
    });
});

describe('Hint Dependency Index', () => {
    it('returns "Rất tự lập" for ≤0.1', () => {
        expect(computeHintDependencyIndex(makeSkillState({ hintDependency: 0.05 }))).toBe('Rất tự lập');
    });

    it('returns "Phụ thuộc gợi ý rất nhiều" for >0.7', () => {
        expect(computeHintDependencyIndex(makeSkillState({ hintDependency: 0.85 }))).toBe('Phụ thuộc gợi ý rất nhiều');
    });
});

describe('Curriculum Compactor', () => {
    const makeLesson = (): Lesson => ({
        id: 'lesson-1', title: 'Test', subject: 'Toán', ageBand: '6-8',
        competencyIds: ['comp-1', 'comp-2'], objective: 'Test',
        contentBlocks: [], exercises: [], rubric: [],
    });

    it('allows compaction when all competencies mastered', () => {
        const masteryStates: MasteryState[] = [
            { childId: 'c', competencyId: 'comp-1', state: 'mastered', masteryScore: 100, retentionScore: 0.9, transferScore: 0.9, lastAttemptAt: '', nextReviewAt: '', evidenceCount: 5 },
            { childId: 'c', competencyId: 'comp-2', state: 'transfer_success', masteryScore: 100, retentionScore: 0.9, transferScore: 0.9, lastAttemptAt: '', nextReviewAt: '', evidenceCount: 5 },
        ];
        const result = evaluateCompaction(makeLesson(), masteryStates, []);
        expect(result.canSkip).toBe(true);
    });

    it('blocks compaction when competencies not mastered', () => {
        const masteryStates: MasteryState[] = [
            { childId: 'c', competencyId: 'comp-1', state: 'practicing', masteryScore: 50, retentionScore: 0.5, transferScore: 0.5, lastAttemptAt: '', nextReviewAt: '', evidenceCount: 3 },
            { childId: 'c', competencyId: 'comp-2', state: 'mastered', masteryScore: 100, retentionScore: 0.9, transferScore: 0.9, lastAttemptAt: '', nextReviewAt: '', evidenceCount: 5 },
        ];
        const result = evaluateCompaction(makeLesson(), masteryStates, []);
        expect(result.canSkip).toBe(false);
    });

    it('canTestOut returns true above threshold', () => {
        expect(canTestOut(9, 10, 0.85)).toBe(true);
        expect(canTestOut(7, 10, 0.85)).toBe(false);
        expect(canTestOut(0, 0)).toBe(false);
    });

    it('generates enrichment suggestions for Toán', () => {
        const enrichments = generateEnrichments(makeLesson(), []);
        expect(enrichments.length).toBeGreaterThan(0);
        expect(enrichments[0].estimatedMinutes).toBeGreaterThan(0);
    });
});

describe('Asynchronous Profile', () => {
    it('returns "Chưa đánh giá" for empty skill states', () => {
        const profile = computeAsynchronousProfile([], ['Toán']);
        expect(profile['Toán'].level).toBe('Chưa đánh giá');
        expect(profile['Toán'].cfs).toBe(0);
    });

    it('returns correct level for strong skills', () => {
        const skills = [makeSkillState({ independentAccuracy: 0.97, transferScore: 0.9 })];
        const profile = computeAsynchronousProfile(skills, ['Toán']);
        expect(profile['Toán'].level).toBe('Vượt trội');
    });
});
