// ========================================
// Reading Progress Tracker — localStorage-based
// Benchmark: Epic (reading time), Khan Academy (progress), Duolingo (streaks)
// ========================================

export interface ReadingRecord {
    bookId: string;
    lastOpened: number; // timestamp
    openCount: number;
    favorite: boolean;
}

export interface DailyStreak {
    currentStreak: number;
    longestStreak: number;
    lastReadDate: string; // YYYY-MM-DD
    totalBooksOpened: number;
    todayBooksOpened: number;
}

const STORAGE_KEY = 'henry-reading-tracker';
const STREAK_KEY = 'henry-reading-streak';

function getToday(): string {
    return new Date().toISOString().slice(0, 10);
}

function getRecords(): Record<string, ReadingRecord> {
    if (typeof window === 'undefined') return {};
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch { return {}; }
}

function saveRecords(r: Record<string, ReadingRecord>) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(r));
}

export function getStreak(): DailyStreak {
    if (typeof window === 'undefined') return { currentStreak: 0, longestStreak: 0, lastReadDate: '', totalBooksOpened: 0, todayBooksOpened: 0 };
    try {
        const s = JSON.parse(localStorage.getItem(STREAK_KEY) || '{}');
        return {
            currentStreak: s.currentStreak || 0,
            longestStreak: s.longestStreak || 0,
            lastReadDate: s.lastReadDate || '',
            totalBooksOpened: s.totalBooksOpened || 0,
            todayBooksOpened: s.todayBooksOpened || 0,
        };
    } catch {
        return { currentStreak: 0, longestStreak: 0, lastReadDate: '', totalBooksOpened: 0, todayBooksOpened: 0 };
    }
}

function saveStreak(s: DailyStreak) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STREAK_KEY, JSON.stringify(s));
}

export function trackBookOpen(bookId: string): void {
    // Update book record
    const records = getRecords();
    const existing = records[bookId] || { bookId, lastOpened: 0, openCount: 0, favorite: false };
    existing.lastOpened = Date.now();
    existing.openCount += 1;
    records[bookId] = existing;
    saveRecords(records);

    // Update streak
    const streak = getStreak();
    const today = getToday();
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

    streak.totalBooksOpened += 1;

    if (streak.lastReadDate === today) {
        streak.todayBooksOpened += 1;
    } else {
        if (streak.lastReadDate === yesterday) {
            streak.currentStreak += 1;
        } else if (streak.lastReadDate !== today) {
            streak.currentStreak = 1;
        }
        streak.todayBooksOpened = 1;
        streak.lastReadDate = today;
    }

    if (streak.currentStreak > streak.longestStreak) {
        streak.longestStreak = streak.currentStreak;
    }
    saveStreak(streak);
}

export function toggleFavorite(bookId: string): boolean {
    const records = getRecords();
    const existing = records[bookId] || { bookId, lastOpened: 0, openCount: 0, favorite: false };
    existing.favorite = !existing.favorite;
    records[bookId] = existing;
    saveRecords(records);
    return existing.favorite;
}

export function getRecentBooks(limit = 5): ReadingRecord[] {
    const records = getRecords();
    return Object.values(records)
        .filter(r => r.openCount > 0)
        .sort((a, b) => b.lastOpened - a.lastOpened)
        .slice(0, limit);
}

export function getFavoriteBookIds(): string[] {
    const records = getRecords();
    return Object.values(records).filter(r => r.favorite).map(r => r.bookId);
}

export function getBookRecord(bookId: string): ReadingRecord | null {
    const records = getRecords();
    return records[bookId] || null;
}
