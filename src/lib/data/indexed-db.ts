// ========================================
// Henry Learning OS — IndexedDB Wrapper
// Type-safe, async, zero-dependency
// Pattern: CDMS Resilient Singleton
// ========================================

const DB_NAME = 'henry-learning-db';
const DB_VERSION = 1;

// Object store names
export const STORES = {
    STATE: 'app_state',        // Main Zustand state snapshot
    EVENTS: 'learning_events', // Persistent learning events
    XP: 'xp_data',            // Unified XP/gamification data
    BACKUPS: 'auto_backups',   // Rolling auto-backups (last 5)
} as const;

type StoreName = (typeof STORES)[keyof typeof STORES];

let dbInstance: IDBDatabase | null = null;
let dbPromise: Promise<IDBDatabase> | null = null;

/**
 * Open (or reuse) the IndexedDB connection.
 * Creates object stores on first run or version upgrade.
 */
function openDB(): Promise<IDBDatabase> {
    if (dbInstance) return Promise.resolve(dbInstance);
    if (dbPromise) return dbPromise;

    dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
        if (typeof window === 'undefined' || !window.indexedDB) {
            reject(new Error('IndexedDB not available'));
            return;
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;

            // app_state: single document keyed by 'current'
            if (!db.objectStoreNames.contains(STORES.STATE)) {
                db.createObjectStore(STORES.STATE, { keyPath: 'key' });
            }

            // learning_events: auto-increment, indexed by childId + timestamp
            if (!db.objectStoreNames.contains(STORES.EVENTS)) {
                const evtStore = db.createObjectStore(STORES.EVENTS, {
                    keyPath: 'id',
                    autoIncrement: false,
                });
                evtStore.createIndex('by_actor', 'actor', { unique: false });
                evtStore.createIndex('by_timestamp', 'timestamp', { unique: false });
                evtStore.createIndex('by_module', ['actor', 'context.module'], { unique: false });
            }

            // xp_data: single document keyed by 'current'
            if (!db.objectStoreNames.contains(STORES.XP)) {
                db.createObjectStore(STORES.XP, { keyPath: 'key' });
            }

            // auto_backups: timestamped snapshots
            if (!db.objectStoreNames.contains(STORES.BACKUPS)) {
                const bkStore = db.createObjectStore(STORES.BACKUPS, {
                    keyPath: 'timestamp',
                });
                bkStore.createIndex('by_date', 'timestamp', { unique: true });
            }
        };

        request.onsuccess = (event) => {
            dbInstance = (event.target as IDBOpenDBRequest).result;

            // Handle unexpected close (tab crash, storage pressure)
            dbInstance.onclose = () => {
                dbInstance = null;
                dbPromise = null;
            };

            resolve(dbInstance);
        };

        request.onerror = () => {
            dbPromise = null;
            reject(request.error);
        };
    });

    return dbPromise;
}

// ── Generic CRUD Operations ──

/**
 * Put a value into an object store (insert or update).
 */
export async function dbPut<T>(storeName: StoreName, value: T): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const request = store.put(value);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

/**
 * Get a value by key from an object store.
 */
export async function dbGet<T>(storeName: StoreName, key: IDBValidKey): Promise<T | undefined> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result as T | undefined);
        request.onerror = () => reject(request.error);
    });
}

/**
 * Get all values from an object store.
 */
export async function dbGetAll<T>(storeName: StoreName): Promise<T[]> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result as T[]);
        request.onerror = () => reject(request.error);
    });
}

/**
 * Delete a value by key.
 */
export async function dbDelete(storeName: StoreName, key: IDBValidKey): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const request = store.delete(key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

/**
 * Count records in a store.
 */
export async function dbCount(storeName: StoreName): Promise<number> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const request = store.count();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

/**
 * Clear all records in a store.
 */
export async function dbClear(storeName: StoreName): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

/**
 * Add multiple records in a single transaction (batch write).
 */
export async function dbBatchPut<T>(storeName: StoreName, values: T[]): Promise<void> {
    if (values.length === 0) return;
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        for (const v of values) {
            store.put(v);
        }
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
    });
}

// ── Query Helpers ──

/**
 * Query events by index with optional key range.
 */
export async function dbQueryByIndex<T>(
    storeName: StoreName,
    indexName: string,
    query?: IDBValidKey | IDBKeyRange,
): Promise<T[]> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const index = store.index(indexName);
        const request = query ? index.getAll(query) : index.getAll();
        request.onsuccess = () => resolve(request.result as T[]);
        request.onerror = () => reject(request.error);
    });
}

/**
 * Delete records older than a given date (for retention policy).
 */
export async function dbDeleteOlderThan(storeName: StoreName, indexName: string, before: string): Promise<number> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const index = store.index(indexName);
        const range = IDBKeyRange.upperBound(before);
        const request = index.openCursor(range);
        let deleted = 0;

        request.onsuccess = (event) => {
            const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
            if (cursor) {
                cursor.delete();
                deleted++;
                cursor.continue();
            } else {
                resolve(deleted);
            }
        };
        request.onerror = () => reject(request.error);
    });
}

/**
 * Check if IndexedDB is available and working.
 */
export async function isIndexedDBAvailable(): Promise<boolean> {
    try {
        await openDB();
        return true;
    } catch {
        return false;
    }
}
