export interface SpacedMemoryItem {
    exerciseId: string;
    childId: string;
    interval: number; // days until next review
    repetition: number;
    easeFactor: number;
    lastReviewDate: string;
    nextReviewDate: string;
}

const memoryStore = new Map<string, SpacedMemoryItem>();

function getMemoryKey(childId: string, exerciseId: string) {
    return `${childId}::${exerciseId}`;
}

/**
 * Initializes or retrieves a memory item for an exercise
 */
export function getMemoryItem(childId: string, exerciseId: string): SpacedMemoryItem {
    const key = getMemoryKey(childId, exerciseId);
    if (!memoryStore.has(key)) {
        memoryStore.set(key, {
            exerciseId,
            childId,
            interval: 0,
            repetition: 0,
            easeFactor: 2.5, // Standard SM-2 starting ease factor
            lastReviewDate: new Date().toISOString(),
            nextReviewDate: new Date().toISOString()
        });
    }
    return memoryStore.get(key)!;
}

/**
 * SuperMemo-2 (SM-2) Algorithm implementation.
 * Quality response: 0-5
 * 5: perfect response
 * 4: correct response after a hesitation
 * 3: correct response recalled with serious difficulty
 * 2: incorrect response; where the correct one seemed easy to recall
 * 1: incorrect response; the correct one remembered
 * 0: complete blackout
 */
export function processSM2Review(childId: string, exerciseId: string, success: boolean, hintsUsed: number): SpacedMemoryItem {
    const item = getMemoryItem(childId, exerciseId);

    // Heuristic mapper from binary success to SM-2 quality (0-5)
    let quality = 0;
    if (success) {
        if (hintsUsed === 0) quality = 5;
        else if (hintsUsed === 1) quality = 4;
        else quality = 3;
    } else {
        quality = 1;
    }

    if (quality >= 3) {
        if (item.repetition === 0) {
            item.interval = 1;
        } else if (item.repetition === 1) {
            item.interval = 6;
        } else {
            item.interval = Math.round(item.interval * item.easeFactor);
        }
        item.repetition += 1;
    } else {
        item.repetition = 0;
        item.interval = 1;
    }

    item.easeFactor = item.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (item.easeFactor < 1.3) item.easeFactor = 1.3;

    item.lastReviewDate = new Date().toISOString();

    // Calculate next review date
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + item.interval);
    item.nextReviewDate = nextDate.toISOString();

    return item;
}

/**
 * Get a list of exercises that are DUE for review today
 */
export function getDueReviews(childId: string): SpacedMemoryItem[] {
    const now = new Date();
    const dueItems: SpacedMemoryItem[] = [];

    memoryStore.forEach((item) => {
        if (item.childId === childId && new Date(item.nextReviewDate) <= now) {
            dueItems.push(item);
        }
    });

    return dueItems.sort((a, b) => new Date(a.nextReviewDate).getTime() - new Date(b.nextReviewDate).getTime());
}

/**
 * List all memory items for parent dashboard tracking
 */
export function getAllMemories(childId: string): SpacedMemoryItem[] {
    const items: SpacedMemoryItem[] = [];
    memoryStore.forEach((item) => {
        if (item.childId === childId) items.push(item);
    });
    return items;
}
