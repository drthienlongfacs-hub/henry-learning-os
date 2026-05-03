import { describe, expect, it } from 'vitest';
import {
    appendReadingQuizAttemptHistory,
    buildReadingQuizHistorySummary,
    getPassageReadingAttempts,
    sanitizeReadingQuizAttemptForStorage,
} from '@/lib/evidence/reading-quiz-history';
import type { ReadingQuizAttemptEvidence } from '@/lib/evidence/reading-quiz-evidence';

function attempt(
    id: string,
    passageId: string,
    questionIndex: number,
    isCorrect: boolean,
    createdAt: string,
    hintUsedBeforeAttempt = false,
): ReadingQuizAttemptEvidence {
    return {
        id,
        passageId,
        questionIndex,
        answer: isCorrect ? 'The librarian helps readers choose books.' : 'I do not know yet.',
        isCorrect,
        hintUsedBeforeAttempt,
        hintShownAfterAttempt: !isCorrect,
        matchedTerms: isCorrect ? ['librarian', 'books'] : [],
        expectedTerms: ['librarian', 'books'],
        createdAt,
    };
}

describe('reading quiz history', () => {
    it('redacts raw answers before persistence while keeping scoring evidence', () => {
        const stored = sanitizeReadingQuizAttemptForStorage(
            attempt('a1', 'p1', 0, true, '2026-05-03T00:00:00.000Z'),
        );

        expect(stored.answer).toBe('[redacted-local-answer]');
        expect(stored.isCorrect).toBe(true);
        expect(stored.matchedTerms).toEqual(['librarian', 'books']);
    });

    it('appends attempts chronologically and caps the local history', () => {
        const first = attempt('a1', 'p1', 0, true, '2026-05-03T00:00:02.000Z');
        const second = attempt('a2', 'p1', 1, false, '2026-05-03T00:00:01.000Z');
        const stored = appendReadingQuizAttemptHistory([first], second, 1);

        expect(stored).toHaveLength(1);
        expect(stored[0].id).toBe('a1');
        expect(stored[0].answer).toBe('[redacted-local-answer]');
    });

    it('summarizes only known passages and does not invent accuracy with no real attempts', () => {
        const empty = buildReadingQuizHistorySummary({
            attempts: [],
            passageQuestionCounts: { p1: 2 },
        });

        expect(empty.status).toBe('no_data');
        expect(empty.independentAccuracyPct).toBeNull();
        expect(empty.summaryVi).toContain('Chưa có dữ liệu');

        const summary = buildReadingQuizHistorySummary({
            attempts: [
                attempt('a1', 'p1', 0, true, '2026-05-03T00:00:01.000Z'),
                attempt('a2', 'p1', 1, false, '2026-05-03T00:00:02.000Z'),
                attempt('a3', 'p2', 0, true, '2026-05-03T00:00:03.000Z'),
            ],
            passageQuestionCounts: { p1: 2 },
        });

        expect(summary.attemptCount).toBe(2);
        expect(summary.passageCountWithEvidence).toBe(1);
        expect(summary.independentAccuracyPct).toBe(50);
        expect(summary.hintDependencyPct).toBe(50);
        expect(summary.status).toBe('collecting');
        expect(summary.summaryEn).toContain('2 reading attempts');
    });

    it('filters passage history for per-passage decision making', () => {
        const attempts = [
            attempt('a1', 'p1', 0, true, '2026-05-03T00:00:01.000Z'),
            attempt('a2', 'p2', 0, true, '2026-05-03T00:00:02.000Z'),
        ];

        expect(getPassageReadingAttempts(attempts, 'p1')).toHaveLength(1);
        expect(getPassageReadingAttempts(attempts, 'p1')[0].id).toBe('a1');
    });
});
