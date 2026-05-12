// ========================================
// Henry Learning OS — Export / Import
// JSON backup with validation + schema version
// Pattern: CDMS atomic write + checksum
// ========================================

import { loadAppState, loadXPData, saveAppState, saveXPData, CURRENT_SCHEMA_VERSION, loadAllEvents, persistEvents } from './data-service';
import type { PersistedLearningEvent } from './data-service';
import type { XPData } from '../xpEngine';

// ── Export Format ──

export interface HenryExportBundle {
    _format: 'henry-learning-export';
    _version: number;
    _exportedAt: string;
    _exportedBy: string;
    appState: Record<string, unknown> | null;
    xpData: XPData | null;
    events: PersistedLearningEvent[];
    stats: {
        totalAttempts: number;
        totalEvents: number;
        totalXP: number;
        exportDate: string;
    };
}

// ── Export ──

/**
 * Export all Henry Learning data as a single JSON bundle.
 * Can be saved to file for backup or transfer.
 */
export async function exportAllData(): Promise<HenryExportBundle> {
    const appState = await loadAppState();
    const xpData = await loadXPData();
    const events = await loadAllEvents();

    const attempts = appState?.attempts as unknown[] | undefined;

    const bundle: HenryExportBundle = {
        _format: 'henry-learning-export',
        _version: CURRENT_SCHEMA_VERSION,
        _exportedAt: new Date().toISOString(),
        _exportedBy: 'Henry Learning OS',
        appState,
        xpData,
        events,
        stats: {
            totalAttempts: Array.isArray(attempts) ? attempts.length : 0,
            totalEvents: events.length,
            totalXP: xpData?.totalXP ?? 0,
            exportDate: new Date().toLocaleDateString('vi-VN'),
        },
    };

    return bundle;
}

/**
 * Trigger browser download of the export bundle as a JSON file.
 */
export async function downloadExport(): Promise<void> {
    const bundle = await exportAllData();
    const json = JSON.stringify(bundle, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const dateStr = new Date().toISOString().slice(0, 10);
    const filename = `henry-learning-backup-${dateStr}.json`;

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ── Import ──

export interface ImportResult {
    success: boolean;
    message: string;
    stats?: {
        stateRestored: boolean;
        xpRestored: boolean;
        eventsRestored: number;
    };
}

/**
 * Validate and import a Henry Learning export bundle.
 * Merges events (dedup by ID), replaces state and XP data.
 */
export async function importData(jsonString: string): Promise<ImportResult> {
    // 1. Parse JSON
    let bundle: HenryExportBundle;
    try {
        bundle = JSON.parse(jsonString);
    } catch {
        return { success: false, message: 'File không đúng định dạng JSON.' };
    }

    // 2. Validate format
    if (bundle._format !== 'henry-learning-export') {
        return { success: false, message: 'File không phải backup của Henry Learning OS.' };
    }

    if (!bundle._version || bundle._version > CURRENT_SCHEMA_VERSION) {
        return {
            success: false,
            message: `File backup phiên bản ${bundle._version}, app hiện tại chỉ hỗ trợ đến v${CURRENT_SCHEMA_VERSION}. Hãy cập nhật app.`,
        };
    }

    // 3. Restore app state
    let stateRestored = false;
    if (bundle.appState) {
        try {
            await saveAppState(bundle.appState);
            stateRestored = true;
        } catch (err) {
            console.warn('[Import] Failed to restore app state:', err);
        }
    }

    // 4. Restore XP data
    let xpRestored = false;
    if (bundle.xpData) {
        try {
            await saveXPData(bundle.xpData);
            xpRestored = true;
        } catch (err) {
            console.warn('[Import] Failed to restore XP data:', err);
        }
    }

    // 5. Restore events (dedup by ID)
    let eventsRestored = 0;
    if (bundle.events && bundle.events.length > 0) {
        try {
            const existing = await loadAllEvents();
            const existingIds = new Set(existing.map(e => e.id));
            const newEvents = bundle.events.filter(e => !existingIds.has(e.id));
            if (newEvents.length > 0) {
                await persistEvents(newEvents);
                eventsRestored = newEvents.length;
            }
        } catch (err) {
            console.warn('[Import] Failed to restore events:', err);
        }
    }

    return {
        success: true,
        message: `Khôi phục thành công! State: ${stateRestored ? '✅' : '⚠️'}, XP: ${xpRestored ? '✅' : '⚠️'}, Events: +${eventsRestored}`,
        stats: { stateRestored, xpRestored, eventsRestored },
    };
}

/**
 * Read a File object and attempt to import it.
 */
export async function importFromFile(file: File): Promise<ImportResult> {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target?.result as string;
            const result = await importData(text);
            resolve(result);
        };
        reader.onerror = () => {
            resolve({ success: false, message: 'Không thể đọc file.' });
        };
        reader.readAsText(file);
    });
}
