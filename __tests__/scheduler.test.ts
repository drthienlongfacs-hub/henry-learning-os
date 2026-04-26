// ========================================
// Spaced Repetition Scheduler Tests
// ========================================
import { describe, it, expect } from 'vitest';
import {
    createReviewItem,
    calculateNextReview,
    getDueReviews,
    getRetentionScore,
} from '@/lib/spaced-repetition';

describe('Spaced Repetition Scheduler', () => {
    describe('createReviewItem', () => {
        it('creates a review with initial values', () => {
            const review = createReviewItem('child-1', 'mistake', 'mistake-1');
            expect(review.childId).toBe('child-1');
            expect(review.itemType).toBe('mistake');
            expect(review.itemId).toBe('mistake-1');
            expect(review.intervalDays).toBe(0);
            expect(review.easeFactor).toBe(2.5);
            expect(review.lastResult).toBeNull();
        });
    });

    describe('calculateNextReview', () => {
        it('increases interval on correct answer', () => {
            const review = createReviewItem('child-1', 'mistake', 'mistake-1');
            const next = calculateNextReview(review, 'correct');
            expect(next.intervalDays).toBe(1); // 0 → 1
            expect(next.easeFactor).toBeGreaterThan(review.easeFactor);
        });

        it('escalates through interval ladder on consecutive correct', () => {
            let review = createReviewItem('child-1', 'mistake', 'mistake-1');
            const intervals = [0, 1, 3, 7, 21, 60];
            for (let i = 0; i < 5; i++) {
                review = calculateNextReview(review, 'correct');
                expect(review.intervalDays).toBe(intervals[i + 1]);
            }
        });

        it('resets to 1 day on incorrect answer', () => {
            let review = createReviewItem('child-1', 'mistake', 'mistake-1');
            review = calculateNextReview(review, 'correct');
            review = calculateNextReview(review, 'correct'); // now at 3 days
            expect(review.intervalDays).toBe(3);

            const reset = calculateNextReview(review, 'incorrect');
            expect(reset.intervalDays).toBe(1);
            expect(reset.easeFactor).toBeLessThan(review.easeFactor);
        });

        it('keeps interval on hint_needed but decreases ease', () => {
            let review = createReviewItem('child-1', 'mistake', 'mistake-1');
            review = calculateNextReview(review, 'correct'); // intervalDays = 1
            const hinted = calculateNextReview(review, 'hint_needed');
            expect(hinted.intervalDays).toBe(review.intervalDays); // same interval
            expect(hinted.easeFactor).toBeLessThan(review.easeFactor);
        });

        it('never drops ease below 1.3', () => {
            let review = createReviewItem('child-1', 'mistake', 'mistake-1');
            for (let i = 0; i < 20; i++) {
                review = calculateNextReview(review, 'incorrect');
            }
            expect(review.easeFactor).toBeGreaterThanOrEqual(1.3);
        });

        it('caps ease at 3.0', () => {
            let review = createReviewItem('child-1', 'mistake', 'mistake-1');
            for (let i = 0; i < 20; i++) {
                review = calculateNextReview(review, 'correct');
            }
            expect(review.easeFactor).toBeLessThanOrEqual(3.0);
        });
    });

    describe('getDueReviews', () => {
        it('returns items scheduled in the past', () => {
            const past = createReviewItem('child-1', 'mistake', 'm-1');
            past.scheduledAt = new Date(Date.now() - 86400000).toISOString(); // yesterday

            const future = createReviewItem('child-1', 'mistake', 'm-2');
            future.scheduledAt = new Date(Date.now() + 86400000).toISOString(); // tomorrow

            const due = getDueReviews([past, future]);
            expect(due).toHaveLength(1);
            expect(due[0].itemId).toBe('m-1');
        });

        it('includes items scheduled now', () => {
            const now = createReviewItem('child-1', 'mistake', 'm-1');
            const due = getDueReviews([now]);
            expect(due).toHaveLength(1);
        });
    });

    describe('getRetentionScore', () => {
        it('returns 0 for empty array', () => {
            expect(getRetentionScore([])).toBe(0);
        });

        it('returns 100 for all correct', () => {
            const reviews = Array.from({ length: 5 }, () => {
                const r = createReviewItem('c', 'mistake', 'i');
                r.lastResult = 'correct';
                return r;
            });
            expect(getRetentionScore(reviews)).toBe(100);
        });

        it('returns 60 for 3/5 correct', () => {
            const reviews = Array.from({ length: 5 }, (_, i) => {
                const r = createReviewItem('c', 'mistake', `i-${i}`);
                r.lastResult = i < 3 ? 'correct' : 'incorrect';
                return r;
            });
            expect(getRetentionScore(reviews)).toBe(60);
        });
    });
});
