// ========================================
// Spaced Repetition Engine — SM-2 inspired
// Intervals: same day → 1d → 3d → 7d → 21d → 60d
// ========================================

import { generateId } from '@/lib/utils';
import type { ReviewSchedule, ReviewItemType } from '@/types';

const INITIAL_EASE_FACTOR = 2.5;
const MIN_EASE_FACTOR = 1.3;

const INTERVALS = [0, 1, 3, 7, 21, 60]; // days

export function createReviewItem(
    childId: string,
    itemType: ReviewItemType,
    itemId: string
): ReviewSchedule {
    const now = new Date();
    return {
        id: generateId(),
        childId,
        itemType,
        itemId,
        scheduledAt: now.toISOString(),
        intervalDays: 0,
        easeFactor: INITIAL_EASE_FACTOR,
        lastResult: null,
    };
}

export function calculateNextReview(
    current: ReviewSchedule,
    result: 'correct' | 'incorrect' | 'hint_needed'
): ReviewSchedule {
    let newEase = current.easeFactor;
    let newInterval = current.intervalDays;

    switch (result) {
        case 'correct': {
            // Move to next interval
            const currentIdx = INTERVALS.indexOf(current.intervalDays);
            const nextIdx = Math.min(currentIdx + 1, INTERVALS.length - 1);
            newInterval = INTERVALS[nextIdx] || current.intervalDays * newEase;
            newEase = Math.min(current.easeFactor + 0.1, 3.0);
            break;
        }
        case 'hint_needed': {
            // Keep same interval, slight ease decrease
            newEase = Math.max(current.easeFactor - 0.15, MIN_EASE_FACTOR);
            break;
        }
        case 'incorrect': {
            // Reset to short interval
            newInterval = 1;
            newEase = Math.max(current.easeFactor - 0.2, MIN_EASE_FACTOR);
            break;
        }
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + Math.round(newInterval));

    return {
        ...current,
        intervalDays: Math.round(newInterval),
        easeFactor: Math.round(newEase * 100) / 100,
        scheduledAt: nextDate.toISOString(),
        lastResult: result,
    };
}

export function getDueReviews(reviews: ReviewSchedule[]): ReviewSchedule[] {
    const now = new Date();
    return reviews.filter((r) => new Date(r.scheduledAt) <= now);
}

export function getRetentionScore(reviews: ReviewSchedule[]): number {
    if (reviews.length === 0) return 0;
    const recent = reviews.slice(-5);
    const correct = recent.filter((r) => r.lastResult === 'correct').length;
    return Math.round((correct / recent.length) * 100);
}
