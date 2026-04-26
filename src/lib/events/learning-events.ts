// ========================================
// Learning Events — xAPI/Caliper-compatible
// Local storage via in-memory store
// ========================================

import type { LearningEvent, LearningVerb } from '@/types/resource-types';

let eventStore: LearningEvent[] = [];
let idCounter = 0;

/**
 * Emit a learning event. Stored locally for parent reports and mastery analytics.
 */
export function emitLearningEvent(params: {
    childId: string;
    verb: LearningVerb;
    object: string;
    module: string;
    resourceProvider?: string;
    aiAssistanceLevel?: string;
    parentPresent?: boolean;
    success?: boolean;
    score?: number;
    durationSec?: number;
    confidence?: number;
}): LearningEvent {
    const event: LearningEvent = {
        id: `evt-${++idCounter}-${Date.now()}`,
        actor: `child:${params.childId}`,
        verb: params.verb,
        object: params.object,
        context: {
            module: params.module,
            resourceProvider: params.resourceProvider ?? 'internal',
            aiAssistanceLevel: params.aiAssistanceLevel,
            parentPresent: params.parentPresent,
        },
        result: (params.success !== undefined || params.score !== undefined)
            ? {
                success: params.success,
                score: params.score,
                durationSec: params.durationSec,
                confidence: params.confidence,
            }
            : undefined,
        timestamp: new Date().toISOString(),
    };

    eventStore.push(event);
    return event;
}

/**
 * Get all events for a child, optionally filtered by module.
 */
export function getEvents(childId: string, module?: string): LearningEvent[] {
    return eventStore.filter(e =>
        e.actor === `child:${childId}` &&
        (!module || e.context.module === module)
    );
}

/**
 * Get events within a date range for parent reports.
 */
export function getEventsInRange(
    childId: string,
    from: Date,
    to: Date,
): LearningEvent[] {
    return eventStore.filter(e => {
        if (e.actor !== `child:${childId}`) return false;
        const ts = new Date(e.timestamp);
        return ts >= from && ts <= to;
    });
}

/**
 * Clear all events (for testing).
 */
export function clearEvents(): void {
    eventStore = [];
    idCounter = 0;
}

/**
 * Get event count (for analytics).
 */
export function getEventCount(): number {
    return eventStore.length;
}
