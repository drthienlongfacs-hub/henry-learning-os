import {
    buildReadingQuizEvidenceProfile,
    type ReadingQuizAttemptEvidence,
    type ReadingQuizEvidenceProfile,
} from './reading-quiz-evidence';

export const READING_QUIZ_HISTORY_STORAGE_KEY = 'henry-reading-quiz-history-v1';
export const READING_QUIZ_HISTORY_VERSION = 1;
export const READING_QUIZ_HISTORY_MAX_ATTEMPTS = 500;

export interface ReadingQuizHistoryStore {
    version: typeof READING_QUIZ_HISTORY_VERSION;
    updatedAt: string;
    attempts: ReadingQuizAttemptEvidence[];
}

export interface ReadingQuizHistorySummary {
    attemptCount: number;
    passageCountWithEvidence: number;
    usablePassageCount: number;
    independentAccuracyPct: number | null;
    hintDependencyPct: number | null;
    lastAttemptAt: string | null;
    status: 'no_data' | 'collecting' | 'usable';
    summaryVi: string;
    summaryEn: string;
}

function pct(numerator: number, denominator: number) {
    if (denominator === 0) return null;
    return Math.round((numerator / denominator) * 100);
}

function isAttemptLike(value: unknown): value is ReadingQuizAttemptEvidence {
    if (!value || typeof value !== 'object') return false;
    const attempt = value as Partial<ReadingQuizAttemptEvidence>;
    return (
        typeof attempt.id === 'string' &&
        typeof attempt.passageId === 'string' &&
        typeof attempt.questionIndex === 'number' &&
        typeof attempt.isCorrect === 'boolean' &&
        typeof attempt.hintUsedBeforeAttempt === 'boolean' &&
        typeof attempt.hintShownAfterAttempt === 'boolean' &&
        Array.isArray(attempt.matchedTerms) &&
        Array.isArray(attempt.expectedTerms) &&
        typeof attempt.createdAt === 'string'
    );
}

export function sanitizeReadingQuizAttemptForStorage(attempt: ReadingQuizAttemptEvidence): ReadingQuizAttemptEvidence {
    return {
        ...attempt,
        answer: attempt.answer ? '[redacted-local-answer]' : '',
        matchedTerms: Array.from(new Set(attempt.matchedTerms)).slice(0, 12),
        expectedTerms: Array.from(new Set(attempt.expectedTerms)).slice(0, 12),
    };
}

export function appendReadingQuizAttemptHistory(
    attempts: ReadingQuizAttemptEvidence[],
    attempt: ReadingQuizAttemptEvidence,
    maxAttempts = READING_QUIZ_HISTORY_MAX_ATTEMPTS,
) {
    const next = [...attempts.map(sanitizeReadingQuizAttemptForStorage), sanitizeReadingQuizAttemptForStorage(attempt)]
        .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));

    return next.slice(Math.max(0, next.length - maxAttempts));
}

export function getPassageReadingAttempts(attempts: ReadingQuizAttemptEvidence[], passageId: string) {
    return attempts.filter((attempt) => attempt.passageId === passageId);
}

export function buildReadingQuizHistorySummary(args: {
    attempts: ReadingQuizAttemptEvidence[];
    passageQuestionCounts: Record<string, number>;
}): ReadingQuizHistorySummary {
    const knownAttempts = args.attempts.filter((attempt) => args.passageQuestionCounts[attempt.passageId] !== undefined);
    const passageIds = Array.from(new Set(knownAttempts.map((attempt) => attempt.passageId)));
    const profiles: ReadingQuizEvidenceProfile[] = passageIds.map((passageId) =>
        buildReadingQuizEvidenceProfile({
            passageId,
            questionCount: args.passageQuestionCounts[passageId] ?? 0,
            attempts: getPassageReadingAttempts(knownAttempts, passageId),
        })
    );
    const independentAttempts = knownAttempts.filter((attempt) => !attempt.hintUsedBeforeAttempt);
    const independentCorrectCount = independentAttempts.filter((attempt) => attempt.isCorrect).length;
    const hintedQuestionKeys = new Set(
        knownAttempts
            .filter((attempt) => attempt.hintUsedBeforeAttempt || attempt.hintShownAfterAttempt)
            .map((attempt) => `${attempt.passageId}:${attempt.questionIndex}`)
    );
    const attemptedQuestionKeys = new Set(knownAttempts.map((attempt) => `${attempt.passageId}:${attempt.questionIndex}`));
    const lastAttemptAt = knownAttempts
        .map((attempt) => attempt.createdAt)
        .sort((a, b) => Date.parse(b) - Date.parse(a))[0] ?? null;
    const usablePassageCount = profiles.filter((profile) => profile.reliability === 'usable').length;
    const independentAccuracyPct = pct(independentCorrectCount, independentAttempts.length);
    const hintDependencyPct = pct(hintedQuestionKeys.size, attemptedQuestionKeys.size);
    const status: ReadingQuizHistorySummary['status'] = knownAttempts.length === 0
        ? 'no_data'
        : usablePassageCount > 0
            ? 'usable'
            : 'collecting';

    return {
        attemptCount: knownAttempts.length,
        passageCountWithEvidence: passageIds.length,
        usablePassageCount,
        independentAccuracyPct,
        hintDependencyPct,
        lastAttemptAt,
        status,
        summaryVi: knownAttempts.length === 0
            ? 'Chưa có dữ liệu đọc hiểu thật.'
            : `${knownAttempts.length} lần thử đọc hiểu, ${passageIds.length} bài có dữ liệu, tự lực ${independentAccuracyPct ?? 'chưa đủ'}%, gợi ý ${hintDependencyPct ?? 0}%.`,
        summaryEn: knownAttempts.length === 0
            ? 'No real reading-comprehension data yet.'
            : `${knownAttempts.length} reading attempts, ${passageIds.length} passages with data, independent ${independentAccuracyPct ?? 'insufficient'}%, hints ${hintDependencyPct ?? 0}%.`,
    };
}

export function readReadingQuizHistory(): ReadingQuizAttemptEvidence[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = window.localStorage.getItem(READING_QUIZ_HISTORY_STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw) as Partial<ReadingQuizHistoryStore>;
        if (parsed.version !== READING_QUIZ_HISTORY_VERSION || !Array.isArray(parsed.attempts)) return [];
        return parsed.attempts.filter(isAttemptLike).map(sanitizeReadingQuizAttemptForStorage);
    } catch {
        return [];
    }
}

export function writeReadingQuizHistory(attempts: ReadingQuizAttemptEvidence[]) {
    if (typeof window === 'undefined') return;
    const store: ReadingQuizHistoryStore = {
        version: READING_QUIZ_HISTORY_VERSION,
        updatedAt: new Date().toISOString(),
        attempts: attempts.slice(-READING_QUIZ_HISTORY_MAX_ATTEMPTS).map(sanitizeReadingQuizAttemptForStorage),
    };
    window.localStorage.setItem(READING_QUIZ_HISTORY_STORAGE_KEY, JSON.stringify(store));
}
