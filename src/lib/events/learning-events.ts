// ========================================
// Learning Events — Persistent Event Store
// Upgraded: events now survive page reload
// via IndexedDB (was: in-memory array)
// ========================================

import type { LearningEvent, LearningVerb } from '@/types/resource-types';
import { persistEvent, loadAllEvents, getEventCount as getPersistedCount } from '@/lib/data/data-service';
import type { PersistedLearningEvent } from '@/lib/data/data-service';

// In-memory cache for current session (fast reads)
let sessionCache: LearningEvent[] = [];
let idCounter = 0;

/**
 * Emit a learning event. Stored in IndexedDB for persistence
 * AND in-memory cache for fast session queries.
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
    curriculumMapId?: string;
    curriculumSourceVersion?: string;
    curriculumOfficialStrand?: string;
    curriculumReviewStatus?: string;
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
            curriculumMapId: params.curriculumMapId,
            curriculumSourceVersion: params.curriculumSourceVersion,
            curriculumOfficialStrand: params.curriculumOfficialStrand,
            curriculumReviewStatus: params.curriculumReviewStatus,
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

    // Add to in-memory cache
    sessionCache.push(event);

    // Persist to IndexedDB (fire-and-forget, non-blocking)
    const persisted: PersistedLearningEvent = {
        id: event.id,
        actor: event.actor,
        verb: event.verb,
        object: event.object,
        context: event.context as Record<string, unknown>,
        result: event.result as Record<string, unknown> | undefined,
        timestamp: event.timestamp,
    };
    persistEvent(persisted).catch(err => {
        console.warn('[LearningEvents] Failed to persist event:', err);
    });

    return event;
}

/**
 * Get events from session cache (fast, for UI).
 */
export function getEvents(childId: string, module?: string): LearningEvent[] {
    return sessionCache.filter(e =>
        e.actor === `child:${childId}` &&
        (!module || e.context.module === module)
    );
}

/**
 * Get events within a date range (queries IndexedDB for full history).
 */
export async function getEventsInRange(
    childId: string,
    from: Date,
    to: Date,
): Promise<LearningEvent[]> {
    // Load from IndexedDB for full historical data
    const allEvents = await loadAllEvents();
    return allEvents.filter(e => {
        if (e.actor !== `child:${childId}`) return false;
        const ts = new Date(e.timestamp);
        return ts >= from && ts <= to;
    }) as unknown as LearningEvent[];
}

/**
 * Get total event count (from IndexedDB — accurate).
 */
export async function getEventCountPersisted(): Promise<number> {
    return getPersistedCount();
}

/**
 * Clear session cache only (for testing).
 * Does NOT clear persisted data.
 */
export function clearSessionCache(): void {
    sessionCache = [];
    idCounter = 0;
}

/**
 * Get session cache event count (for compatibility).
 */
export function getEventCount(): number {
    return sessionCache.length;
}

/**
 * Hydrate session cache from IndexedDB on app startup.
 * Loads last 100 events for fast access.
 */
export async function hydrateFromPersisted(childId: string): Promise<void> {
    try {
        const allEvents = await loadAllEvents();
        const childEvents = allEvents
            .filter(e => e.actor === `child:${childId}`)
            .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
            .slice(0, 100);

        sessionCache = childEvents as unknown as LearningEvent[];
        idCounter = allEvents.length;
    } catch (err) {
        console.warn('[LearningEvents] Failed to hydrate from IndexedDB:', err);
    }
}
