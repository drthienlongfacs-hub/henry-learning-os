// ========================================
// Henry Learning OS — Data Service
// Unified gateway for all data operations
// Pattern: CDMS singleton + debounced auto-save
// ========================================

import { dbPut, dbGet, dbGetAll, dbBatchPut, dbCount, dbDeleteOlderThan, isIndexedDBAvailable, STORES } from './indexed-db';
import type { XPData } from '../xpEngine';

// ── Schema Version ──

export const CURRENT_SCHEMA_VERSION = 3;

export interface DataEnvelope<T> {
    key: string;
    schemaVersion: number;
    savedAt: string;
    data: T;
}

// ── Debounced Auto-Save ──

let saveTimer: ReturnType<typeof setTimeout> | null = null;
const SAVE_DEBOUNCE_MS = 2000;

/**
 * Schedule a debounced save of app state to IndexedDB.
 * Coalesces rapid changes into a single write.
 */
export function scheduleSave(stateGetter: () => Record<string, unknown>): void {
    if (typeof window === 'undefined') return;
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(async () => {
        try {
            const state = stateGetter();
            await saveAppState(state);
        } catch (err) {
            console.warn('[DataService] Auto-save failed:', err);
        }
    }, SAVE_DEBOUNCE_MS);
}

// ── App State CRUD ──

/**
 * Save the entire app state snapshot to IndexedDB.
 */
export async function saveAppState(state: Record<string, unknown>): Promise<void> {
    const envelope: DataEnvelope<Record<string, unknown>> = {
        key: 'current',
        schemaVersion: CURRENT_SCHEMA_VERSION,
        savedAt: new Date().toISOString(),
        data: state,
    };
    await dbPut(STORES.STATE, envelope);
}

/**
 * Load the app state from IndexedDB.
 * Returns null if no saved state exists.
 */
export async function loadAppState(): Promise<Record<string, unknown> | null> {
    const envelope = await dbGet<DataEnvelope<Record<string, unknown>>>(STORES.STATE, 'current');
    if (!envelope) return null;

    // Run migrations if schema version is old
    if (envelope.schemaVersion < CURRENT_SCHEMA_VERSION) {
        const migrated = migrateState(envelope.data, envelope.schemaVersion);
        // Re-save with new version
        await saveAppState(migrated);
        return migrated;
    }

    return envelope.data;
}

// ── XP Data ──

/**
 * Save XP data to IndexedDB (unified, no more separate localStorage).
 */
export async function saveXPData(xpData: XPData): Promise<void> {
    const envelope: DataEnvelope<XPData> = {
        key: 'current',
        schemaVersion: CURRENT_SCHEMA_VERSION,
        savedAt: new Date().toISOString(),
        data: xpData,
    };
    await dbPut(STORES.XP, envelope);
}

/**
 * Load XP data from IndexedDB.
 */
export async function loadXPData(): Promise<XPData | null> {
    const envelope = await dbGet<DataEnvelope<XPData>>(STORES.XP, 'current');
    return envelope?.data ?? null;
}

// ── Learning Events (Persistent!) ──

export interface PersistedLearningEvent {
    id: string;
    actor: string;
    verb: string;
    object: string;
    context: Record<string, unknown>;
    result?: Record<string, unknown>;
    timestamp: string;
}

/**
 * Persist a learning event to IndexedDB.
 */
export async function persistEvent(event: PersistedLearningEvent): Promise<void> {
    await dbPut(STORES.EVENTS, event);
}

/**
 * Persist multiple events in a single transaction.
 */
export async function persistEvents(events: PersistedLearningEvent[]): Promise<void> {
    await dbBatchPut(STORES.EVENTS, events);
}

/**
 * Load all persisted events.
 */
export async function loadAllEvents(): Promise<PersistedLearningEvent[]> {
    return dbGetAll<PersistedLearningEvent>(STORES.EVENTS);
}

/**
 * Get event count for analytics.
 */
export async function getEventCount(): Promise<number> {
    return dbCount(STORES.EVENTS);
}

// ── Auto-Backup ──

interface AutoBackup {
    timestamp: string;
    schemaVersion: number;
    stateSnapshot: Record<string, unknown>;
    xpSnapshot: XPData | null;
}

const MAX_AUTO_BACKUPS = 5;

/**
 * Create an auto-backup of current state.
 * Keeps only the last 5 backups.
 */
export async function createAutoBackup(
    state: Record<string, unknown>,
    xpData: XPData | null,
): Promise<void> {
    const backup: AutoBackup = {
        timestamp: new Date().toISOString(),
        schemaVersion: CURRENT_SCHEMA_VERSION,
        stateSnapshot: state,
        xpSnapshot: xpData,
    };

    await dbPut(STORES.BACKUPS, backup);

    // Trim old backups
    const allBackups = await dbGetAll<AutoBackup>(STORES.BACKUPS);
    if (allBackups.length > MAX_AUTO_BACKUPS) {
        const sorted = allBackups.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
        const toDelete = sorted.slice(0, sorted.length - MAX_AUTO_BACKUPS);
        for (const old of toDelete) {
            const { dbDelete } = await import('./indexed-db');
            await dbDelete(STORES.BACKUPS, old.timestamp);
        }
    }
}

// ── Data Retention Policy ──

/**
 * Clean up events older than retentionDays.
 * Default: 90 days for family use.
 */
export async function applyRetentionPolicy(retentionDays = 90): Promise<number> {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - retentionDays);
    const cutoffISO = cutoff.toISOString();

    return dbDeleteOlderThan(STORES.EVENTS, 'by_timestamp', cutoffISO);
}

// ── Schema Migration ──

/**
 * Migrate state from an older schema version to current.
 * Each migration is additive — never removes data.
 */
function migrateState(state: Record<string, unknown>, fromVersion: number): Record<string, unknown> {
    let current = { ...state };

    // v2 → v3: Add skillStates, accelerationRecommendations if missing
    if (fromVersion < 3) {
        if (!current.skillStates) current.skillStates = [];
        if (!current.accelerationRecommendations) current.accelerationRecommendations = [];
        if (!current.readingEntries) current.readingEntries = [];
        if (!current.weeklyReviews) current.weeklyReviews = [];
    }

    // Future migrations go here:
    // if (fromVersion < 4) { ... }

    return current;
}

// ── Health Check ──

export interface DataHealthReport {
    indexedDBAvailable: boolean;
    stateExists: boolean;
    stateSchemaVersion: number | null;
    eventCount: number;
    xpDataExists: boolean;
    backupCount: number;
    issues: string[];
}

/**
 * Run a health check on the data layer.
 * Returns a report suitable for display in parent settings.
 */
export async function checkDataHealth(): Promise<DataHealthReport> {
    const issues: string[] = [];

    const idbAvailable = await isIndexedDBAvailable();
    if (!idbAvailable) {
        return {
            indexedDBAvailable: false,
            stateExists: false,
            stateSchemaVersion: null,
            eventCount: 0,
            xpDataExists: false,
            backupCount: 0,
            issues: ['IndexedDB không khả dụng. Dữ liệu chỉ lưu tạm trong phiên.'],
        };
    }

    const stateEnvelope = await dbGet<DataEnvelope<Record<string, unknown>>>(STORES.STATE, 'current');
    const stateExists = !!stateEnvelope;
    const stateVersion = stateEnvelope?.schemaVersion ?? null;

    if (stateVersion !== null && stateVersion < CURRENT_SCHEMA_VERSION) {
        issues.push(`Schema cũ (v${stateVersion}), sẽ tự động nâng cấp.`);
    }

    const eventCount = await dbCount(STORES.EVENTS);
    const xpEnvelope = await dbGet<DataEnvelope<XPData>>(STORES.XP, 'current');
    const backups = await dbGetAll(STORES.BACKUPS);

    if (!stateExists) {
        issues.push('Chưa có dữ liệu học tập được lưu.');
    }
    if (backups.length === 0) {
        issues.push('Chưa có bản sao lưu tự động nào.');
    }

    return {
        indexedDBAvailable: true,
        stateExists,
        stateSchemaVersion: stateVersion,
        eventCount,
        xpDataExists: !!xpEnvelope,
        backupCount: backups.length,
        issues,
    };
}
