import { describe, expect, it } from 'vitest';
import {
    buildReadingQuizEvidenceProfile,
    evaluateComprehensionAnswer,
    type ReadingQuizAttemptEvidence,
} from '@/lib/evidence/reading-quiz-evidence';

function attempt(
    questionIndex: number,
    isCorrect: boolean,
    index: number,
    hintUsedBeforeAttempt = false,
): ReadingQuizAttemptEvidence {
    return {
        id: `rq-${index}`,
        passageId: 'passage-1',
        questionIndex,
        answer: isCorrect ? 'librarian helps readers' : 'bus driver',
        isCorrect,
        hintUsedBeforeAttempt,
        hintShownAfterAttempt: !isCorrect,
        matchedTerms: isCorrect ? ['librarian'] : [],
        expectedTerms: ['librarian'],
        createdAt: `2026-05-0${index}T00:00:00.000Z`,
    };
}

describe('reading quiz evidence', () => {
    it('scores free-text answers from expected evidence terms instead of exact matching', () => {
        const result = evaluateComprehensionAnswer(
            'The librarian helps readers choose books.',
            'a librarian',
        );

        expect(result.isCorrect).toBe(true);
        expect(result.expectedTerms).toEqual(['librarian']);
        expect(result.matchedTerms).toEqual(['librarian']);
    });

    it('does not recommend stretch before all questions have real attempts', () => {
        const profile = buildReadingQuizEvidenceProfile({
            passageId: 'passage-1',
            questionCount: 2,
            attempts: [attempt(0, true, 1)],
        });

        expect(profile.attemptCount).toBe(1);
        expect(profile.completedQuestionCount).toBe(1);
        expect(profile.reliability).toBe('emerging');
        expect(profile.decision).toBe('collect_evidence');
        expect(profile.evidenceSummary).toContain('1 lần thử');
    });

    it('tracks hint dependency and retry success as repair evidence before moving on', () => {
        const profile = buildReadingQuizEvidenceProfile({
            passageId: 'passage-1',
            questionCount: 2,
            attempts: [
                attempt(0, false, 1),
                attempt(0, true, 2, true),
                attempt(1, true, 3),
            ],
        });

        expect(profile.completedQuestionCount).toBe(2);
        expect(profile.retrySuccessCount).toBe(1);
        expect(profile.hintRequestCount).toBe(1);
        expect(profile.hintDependencyPct).toBe(50);
        expect(profile.decision).toBe('repair');
        expect(profile.nextLearningMove).toContain('bằng chứng');
    });

    it('only recommends stretch when completion is independent and low-hint', () => {
        const profile = buildReadingQuizEvidenceProfile({
            passageId: 'passage-1',
            questionCount: 2,
            attempts: [
                attempt(0, true, 1),
                attempt(1, true, 2),
            ],
        });

        expect(profile.completedQuestionCount).toBe(2);
        expect(profile.firstAttemptAccuracyPct).toBe(100);
        expect(profile.independentAccuracyPct).toBe(100);
        expect(profile.hintDependencyPct).toBe(0);
        expect(profile.challengeFitScore).toBe(100);
        expect(profile.decision).toBe('stretch');
    });
});
