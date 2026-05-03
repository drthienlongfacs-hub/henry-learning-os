export type ReadingEvidenceDecision = 'collect_evidence' | 'repair' | 'practice' | 'stretch';
export type ReadingEvidenceReliability = 'insufficient' | 'emerging' | 'usable';

export interface ReadingAnswerEvaluation {
    isCorrect: boolean;
    normalizedAnswer: string;
    expectedTerms: string[];
    matchedTerms: string[];
    requiredMatches: number;
}

export interface ReadingQuizAttemptEvidence {
    id: string;
    passageId: string;
    questionIndex: number;
    answer: string;
    isCorrect: boolean;
    hintUsedBeforeAttempt: boolean;
    hintShownAfterAttempt: boolean;
    matchedTerms: string[];
    expectedTerms: string[];
    createdAt: string;
}

export interface ReadingQuizEvidenceProfile {
    passageId: string;
    questionCount: number;
    attemptCount: number;
    attemptedQuestionCount: number;
    completedQuestionCount: number;
    independentAttemptCount: number;
    correctAttemptCount: number;
    firstAttemptCorrectCount: number;
    retrySuccessCount: number;
    hintRequestCount: number;
    hintedQuestionCount: number;
    retrievalAccuracyPct: number | null;
    independentAccuracyPct: number | null;
    firstAttemptAccuracyPct: number | null;
    hintDependencyPct: number | null;
    completionPct: number;
    challengeFitScore: number | null;
    reliability: ReadingEvidenceReliability;
    decision: ReadingEvidenceDecision;
    evidenceSummary: string;
    nextLearningMove: string;
    riskGuardrail: string;
}

const STOP_WORDS = new Set([
    'the',
    'and',
    'for',
    'are',
    'but',
    'was',
    'were',
    'with',
    'that',
    'this',
    'they',
    'them',
    'what',
    'when',
    'where',
    'why',
    'how',
    'does',
    'did',
    'after',
    'before',
    'because',
]);

function pct(numerator: number, denominator: number) {
    if (denominator === 0) return null;
    return Math.round((numerator / denominator) * 100);
}

function clampPct(value: number) {
    return Math.max(0, Math.min(100, Math.round(value)));
}

function normalize(text: string) {
    return text
        .toLowerCase()
        .replace(/[×]/g, ' x ')
        .replace(/[^a-z0-9'\s-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function tokenizeExpectedAnswer(answerHint: string) {
    const tokens = normalize(answerHint).split(/\s+/).filter(Boolean);
    const meaningful = tokens.filter((token) => {
        if (/^\d+$/.test(token)) return true;
        if (token.length <= 2) return false;
        return !STOP_WORDS.has(token);
    });
    return Array.from(new Set(meaningful));
}

export function evaluateComprehensionAnswer(
    answer: string,
    answerHint: string,
): ReadingAnswerEvaluation {
    const normalizedAnswer = normalize(answer);
    const expectedTerms = tokenizeExpectedAnswer(answerHint);
    const matchedTerms = expectedTerms.filter((term) => normalizedAnswer.includes(term));
    const requiredMatches = Math.max(1, Math.ceil(expectedTerms.length * 0.4));

    return {
        isCorrect: matchedTerms.length >= requiredMatches,
        normalizedAnswer,
        expectedTerms,
        matchedTerms,
        requiredMatches,
    };
}

function groupByQuestion(attempts: ReadingQuizAttemptEvidence[]) {
    const groups = new Map<number, ReadingQuizAttemptEvidence[]>();
    for (const attempt of attempts) {
        const current = groups.get(attempt.questionIndex) ?? [];
        current.push(attempt);
        groups.set(attempt.questionIndex, current);
    }
    for (const group of groups.values()) {
        group.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
    }
    return groups;
}

function getReliability(questionCount: number, attemptCount: number, completedQuestionCount: number): ReadingEvidenceReliability {
    if (attemptCount === 0) return 'insufficient';
    if (completedQuestionCount < questionCount) return 'emerging';
    return 'usable';
}

function getDecision(args: {
    questionCount: number;
    attemptCount: number;
    completedQuestionCount: number;
    independentAccuracyPct: number | null;
    firstAttemptAccuracyPct: number | null;
    hintDependencyPct: number | null;
    retrySuccessCount: number;
}): ReadingEvidenceDecision {
    const {
        questionCount,
        attemptCount,
        completedQuestionCount,
        independentAccuracyPct,
        firstAttemptAccuracyPct,
        hintDependencyPct,
        retrySuccessCount,
    } = args;

    if (attemptCount === 0 || completedQuestionCount < questionCount) return 'collect_evidence';
    if (independentAccuracyPct !== null && independentAccuracyPct < 60) return 'repair';
    if ((firstAttemptAccuracyPct !== null && firstAttemptAccuracyPct < 70) || retrySuccessCount > 0) return 'practice';
    if (hintDependencyPct !== null && hintDependencyPct > 40) return 'practice';
    if (
        firstAttemptAccuracyPct !== null &&
        firstAttemptAccuracyPct >= 85 &&
        hintDependencyPct !== null &&
        hintDependencyPct <= 20
    ) {
        return 'stretch';
    }
    return 'practice';
}

function buildMoveAndGuardrail(decision: ReadingEvidenceDecision) {
    switch (decision) {
        case 'collect_evidence':
            return {
                nextLearningMove: 'Làm tiếp các câu còn lại để có đủ bằng chứng đọc hiểu.',
                riskGuardrail: 'Không kết luận năng lực khi chưa đủ câu đã thử.',
            };
        case 'repair':
            return {
                nextLearningMove: 'Quay lại câu trong bài, gạch chân từ khóa rồi trả lời lại bằng chứng từ văn bản.',
                riskGuardrail: 'Không tăng độ khó khi trả lời tự lực còn dưới ngưỡng an toàn.',
            };
        case 'practice':
            return {
                nextLearningMove: 'Giữ bài cùng mức, giảm gợi ý dần và yêu cầu kể lại bằng lời của con.',
                riskGuardrail: 'Câu đúng sau gợi ý là tiến bộ, nhưng chưa tính là thành thạo độc lập.',
            };
        case 'stretch':
            return {
                nextLearningMove: 'Thêm câu chuyển giao: kể lại ý chính hoặc tự đặt một câu hỏi mới từ bài đọc.',
                riskGuardrail: 'Chỉ tăng thử thách sau khi có câu tự lực và có nhiệm vụ chuyển giao.',
            };
    }
}

export function buildReadingQuizEvidenceProfile(args: {
    passageId: string;
    questionCount: number;
    attempts?: ReadingQuizAttemptEvidence[];
}): ReadingQuizEvidenceProfile {
    const { passageId, questionCount, attempts = [] } = args;
    const groups = groupByQuestion(attempts);
    const attemptedQuestionCount = groups.size;
    const completedQuestionCount = Array.from(groups.values()).filter((group) => group.some((attempt) => attempt.isCorrect)).length;
    const independentAttempts = attempts.filter((attempt) => !attempt.hintUsedBeforeAttempt);
    const correctAttemptCount = attempts.filter((attempt) => attempt.isCorrect).length;
    const independentCorrectCount = independentAttempts.filter((attempt) => attempt.isCorrect).length;
    const firstAttemptCorrectCount = Array.from(groups.values()).filter((group) => group[0]?.isCorrect).length;
    const retrySuccessCount = Array.from(groups.values()).filter((group) => {
        const first = group[0];
        return first && !first.isCorrect && group.slice(1).some((attempt) => attempt.isCorrect);
    }).length;
    const hintRequestCount = attempts.filter((attempt) => attempt.hintShownAfterAttempt).length;
    const hintedQuestionCount = Array.from(groups.values()).filter((group) =>
        group.some((attempt) => attempt.hintUsedBeforeAttempt || attempt.hintShownAfterAttempt)
    ).length;
    const retrievalAccuracyPct = pct(correctAttemptCount, attempts.length);
    const independentAccuracyPct = pct(independentCorrectCount, independentAttempts.length);
    const firstAttemptAccuracyPct = pct(firstAttemptCorrectCount, attemptedQuestionCount);
    const hintDependencyPct = pct(hintedQuestionCount, attemptedQuestionCount);
    const completionPct = questionCount === 0 ? 0 : Math.round((completedQuestionCount / questionCount) * 100);
    const reliability = getReliability(questionCount, attempts.length, completedQuestionCount);
    const decision = getDecision({
        questionCount,
        attemptCount: attempts.length,
        completedQuestionCount,
        independentAccuracyPct,
        firstAttemptAccuracyPct,
        hintDependencyPct,
        retrySuccessCount,
    });
    const move = buildMoveAndGuardrail(decision);
    const challengeFitScore = independentAccuracyPct === null || hintDependencyPct === null
        ? null
        : clampPct(independentAccuracyPct - hintDependencyPct * 0.35 + (retrySuccessCount / Math.max(1, questionCount)) * 10);

    return {
        passageId,
        questionCount,
        attemptCount: attempts.length,
        attemptedQuestionCount,
        completedQuestionCount,
        independentAttemptCount: independentAttempts.length,
        correctAttemptCount,
        firstAttemptCorrectCount,
        retrySuccessCount,
        hintRequestCount,
        hintedQuestionCount,
        retrievalAccuracyPct,
        independentAccuracyPct,
        firstAttemptAccuracyPct,
        hintDependencyPct,
        completionPct,
        challengeFitScore,
        reliability,
        decision,
        evidenceSummary: attempts.length === 0
            ? 'Chưa có bài làm thật cho đoạn đọc này.'
            : `${attempts.length} lần thử, ${completedQuestionCount}/${questionCount} câu đã đúng, tự lực ${independentAccuracyPct ?? 'chưa đủ'}%, gợi ý ${hintDependencyPct ?? 0}%.`,
        ...move,
    };
}
