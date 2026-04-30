import type { Attempt, ErrorType, Mistake, ParentObservation, ReviewSchedule } from '@/types';

type AttemptSignal = Pick<Attempt, 'competencyId' | 'isCorrect' | 'hintLevelUsed' | 'createdAt' | 'errorType'>;
type MistakeSignal = Pick<Mistake, 'id' | 'competencyId' | 'errorType' | 'explanation' | 'resolvedAt'>;
type ReviewSignal = Pick<ReviewSchedule, 'itemType' | 'itemId' | 'scheduledAt'>;
type ObservationSignal = Pick<ParentObservation, 'observationType' | 'note' | 'createdAt'>;

export type WeeklyPdcaStatus = 'missing_data' | 'planned' | 'ready_for_recheck' | 'validated';
export type WeeklyRootCause =
    | 'concept_gap'
    | 'procedure_gap'
    | 'calculation_slip'
    | 'reading_comprehension'
    | 'vocabulary_gap'
    | 'attention_or_energy'
    | 'hint_dependency'
    | 'retention_gap'
    | 'insufficient_data';

export interface WeeklyPdcaBaseline {
    topicKey: string | null;
    sampleSize: number;
    accuracyPct: number | null;
    hintDependencyPct: number | null;
    unresolvedMistakeCount: number;
    dueReviewCount: number;
}

export interface WeeklyPdcaPlan {
    id: string;
    status: WeeklyPdcaStatus;
    weekStartDate: string;
    issueTitle: string;
    rootCause: WeeklyRootCause;
    evidenceSummary: string;
    baseline: WeeklyPdcaBaseline;
    parentMission: {
        title: string;
        description: string;
        durationMinutes: number;
        evidenceToCollect: string;
    };
    recheck: {
        recheckAt: string;
        metric: string;
        minimumFollowUpAttempts: number;
        outcomeDeltaPct: number | null;
        interpretation: string;
    };
    actDecision: string;
    noOverclaim: string;
    sourceIds: string[];
    sotFeatureIds: string[];
}

export interface PreviousWeeklyPdcaPlan {
    createdAt: string;
    recheckAt: string;
    topicKey: string;
    baselineAccuracyPct: number | null;
}

function pct(numerator: number, denominator: number) {
    if (denominator === 0) return null;
    return Math.round((numerator / denominator) * 100);
}

function addDays(date: Date, days: number) {
    const copy = new Date(date);
    copy.setDate(copy.getDate() + days);
    return copy;
}

function startOfWeek(date: Date) {
    const copy = new Date(date);
    const day = copy.getDay();
    const diff = copy.getDate() - day + (day === 0 ? -6 : 1);
    copy.setDate(diff);
    copy.setHours(0, 0, 0, 0);
    return copy;
}

function rootCauseFromError(errorType: ErrorType | null | undefined): WeeklyRootCause {
    switch (errorType) {
        case 'concept':
            return 'concept_gap';
        case 'procedure':
        case 'strategy':
            return 'procedure_gap';
        case 'calculation':
            return 'calculation_slip';
        case 'reading':
            return 'reading_comprehension';
        case 'vocabulary':
            return 'vocabulary_gap';
        case 'attention':
            return 'attention_or_energy';
        default:
            return 'insufficient_data';
    }
}

function rootCauseLabel(rootCause: WeeklyRootCause) {
    switch (rootCause) {
        case 'concept_gap':
            return 'hổng khái niệm';
        case 'procedure_gap':
            return 'hổng quy trình';
        case 'calculation_slip':
            return 'sai tính toán';
        case 'reading_comprehension':
            return 'đọc hiểu đề chưa chắc';
        case 'vocabulary_gap':
            return 'thiếu từ vựng/mẫu câu';
        case 'attention_or_energy':
            return 'chú ý hoặc năng lượng chưa ổn';
        case 'hint_dependency':
            return 'phụ thuộc gợi ý';
        case 'retention_gap':
            return 'ôn trì hoãn chưa bền';
        case 'insufficient_data':
            return 'chưa đủ dữ liệu';
    }
}

function buildMission(rootCause: WeeklyRootCause, topicKey: string | null, childName: string) {
    const target = topicKey ?? 'chủ đề mới';

    switch (rootCause) {
        case 'calculation_slip':
            return {
                title: `Kiểm tra phép ngược với ${childName}`,
                description: `Chọn 3 bài ${target}; sau mỗi bài, hỏi con dùng phép ngược để kiểm tra lại một bước.`,
                durationMinutes: 10,
                evidenceToCollect: 'Ghi 1 câu con tự nói về bước kiểm tra.',
            };
        case 'reading_comprehension':
            return {
                title: `Đọc chậm và gạch từ khóa`,
                description: `Cùng con đọc 2 đề/bài ngắn, yêu cầu con nói đề hỏi gì trước khi trả lời.`,
                durationMinutes: 12,
                evidenceToCollect: 'Ghi từ khóa con chọn và câu con nói lại đề.',
            };
        case 'vocabulary_gap':
            return {
                title: `Ba từ khóa trong ngữ cảnh`,
                description: `Chọn 3 từ/mẫu câu liên quan ${target}; con đặt câu miệng, phụ huynh chỉ sửa một điểm.`,
                durationMinutes: 10,
                evidenceToCollect: 'Ghi 1 câu đúng nhất và 1 từ còn lẫn.',
            };
        case 'hint_dependency':
            return {
                title: `Giảm một bậc gợi ý`,
                description: `Làm lại 3 câu cùng dạng nhưng chờ con nói bước đầu tiên trước khi gợi ý.`,
                durationMinutes: 10,
                evidenceToCollect: 'Ghi mức gợi ý cao nhất cần dùng.',
            };
        case 'retention_gap':
            return {
                title: `Ôn lại sau trì hoãn`,
                description: `Làm 3 câu ôn đến hạn; không xem bài mẫu trong 2 phút đầu.`,
                durationMinutes: 10,
                evidenceToCollect: 'Ghi số câu tự nhớ đúng trước khi xem lại.',
            };
        case 'insufficient_data':
            return {
                title: `Thu thập baseline nhẹ`,
                description: `Cho con làm 3 câu ngắn ở Toán hoặc Tiếng Việt để hệ thống có dữ liệu đầu vào.`,
                durationMinutes: 8,
                evidenceToCollect: 'Ghi đúng/sai, mức gợi ý và con có giải thích được không.',
            };
        default:
            return {
                title: `Sửa một bước nhỏ`,
                description: `Chọn 3 bài ${target}; yêu cầu con nói "bước 1 là gì" trước khi làm.`,
                durationMinutes: 10,
                evidenceToCollect: 'Ghi bước con tự nêu và lỗi còn lặp.',
            };
    }
}

function selectTopIssue(args: {
    attempts: AttemptSignal[];
    mistakes: MistakeSignal[];
    reviewSchedules: ReviewSignal[];
    now: Date;
}) {
    const unresolved = args.mistakes.filter((mistake) => !mistake.resolvedAt);
    const grouped = new Map<string, { topicKey: string; errorType: ErrorType; count: number; latestExplanation: string }>();

    unresolved.forEach((mistake) => {
        const key = `${mistake.competencyId}:${mistake.errorType}`;
        const current = grouped.get(key);
        grouped.set(key, {
            topicKey: mistake.competencyId,
            errorType: mistake.errorType,
            count: (current?.count ?? 0) + 1,
            latestExplanation: mistake.explanation || current?.latestExplanation || '',
        });
    });

    const topMistake = [...grouped.values()].sort((a, b) => b.count - a.count)[0];
    if (topMistake) {
        return {
            topicKey: topMistake.topicKey,
            rootCause: rootCauseFromError(topMistake.errorType),
            issueTitle: `Lỗi lặp ở ${topMistake.topicKey}: ${rootCauseLabel(rootCauseFromError(topMistake.errorType))}`,
            reason: `${topMistake.count} lỗi chưa sửa cùng nhóm.`,
        };
    }

    const topicAttempts = new Map<string, AttemptSignal[]>();
    args.attempts.forEach((attempt) => {
        topicAttempts.set(attempt.competencyId, [...(topicAttempts.get(attempt.competencyId) ?? []), attempt]);
    });
    const hintHeavy = [...topicAttempts.entries()]
        .map(([topicKey, attempts]) => ({
            topicKey,
            sampleSize: attempts.length,
            hintDependencyPct: pct(attempts.filter((attempt) => attempt.hintLevelUsed > 0).length, attempts.length),
        }))
        .filter((item) => item.sampleSize >= 3 && (item.hintDependencyPct ?? 0) >= 50)
        .sort((a, b) => (b.hintDependencyPct ?? 0) - (a.hintDependencyPct ?? 0))[0];

    if (hintHeavy) {
        return {
            topicKey: hintHeavy.topicKey,
            rootCause: 'hint_dependency' as WeeklyRootCause,
            issueTitle: `Phụ thuộc gợi ý ở ${hintHeavy.topicKey}`,
            reason: `Tỉ lệ dùng gợi ý ${hintHeavy.hintDependencyPct}%.`,
        };
    }

    const dueReview = args.reviewSchedules.find((review) => new Date(review.scheduledAt) <= args.now);
    if (dueReview) {
        return {
            topicKey: dueReview.itemType === 'competency' ? dueReview.itemId : null,
            rootCause: 'retention_gap' as WeeklyRootCause,
            issueTitle: 'Có nội dung ôn đến hạn',
            reason: 'Hệ thống có review đã đến ngày.',
        };
    }

    return {
        topicKey: null,
        rootCause: 'insufficient_data' as WeeklyRootCause,
        issueTitle: 'Chưa đủ dữ liệu để RCA',
        reason: 'Cần thêm attempt/lỗi/hint thật trước khi kết luận.',
    };
}

function baselineForTopic(topicKey: string | null, attempts: AttemptSignal[], mistakes: MistakeSignal[], reviewSchedules: ReviewSignal[], now: Date): WeeklyPdcaBaseline {
    const scopedAttempts = topicKey ? attempts.filter((attempt) => attempt.competencyId === topicKey) : attempts;
    const scopedMistakes = topicKey ? mistakes.filter((mistake) => mistake.competencyId === topicKey && !mistake.resolvedAt) : mistakes.filter((mistake) => !mistake.resolvedAt);
    const dueReviewCount = reviewSchedules.filter((review) => new Date(review.scheduledAt) <= now && (!topicKey || review.itemId === topicKey)).length;

    return {
        topicKey,
        sampleSize: scopedAttempts.length,
        accuracyPct: pct(scopedAttempts.filter((attempt) => attempt.isCorrect).length, scopedAttempts.length),
        hintDependencyPct: pct(scopedAttempts.filter((attempt) => attempt.hintLevelUsed > 0).length, scopedAttempts.length),
        unresolvedMistakeCount: scopedMistakes.length,
        dueReviewCount,
    };
}

function validatePreviousPlan(previousPlan: PreviousWeeklyPdcaPlan, attempts: AttemptSignal[], now: Date) {
    const recheckDate = new Date(previousPlan.recheckAt);
    const followUpAttempts = attempts.filter((attempt) => {
        const createdAt = new Date(attempt.createdAt);
        return attempt.competencyId === previousPlan.topicKey
            && createdAt >= new Date(previousPlan.createdAt)
            && createdAt <= now;
    });
    const followUpAccuracy = pct(followUpAttempts.filter((attempt) => attempt.isCorrect).length, followUpAttempts.length);

    if (now < recheckDate) {
        return {
            status: 'planned' as WeeklyPdcaStatus,
            outcomeDeltaPct: null,
            interpretation: 'Chưa đến ngày recheck; không được kết luận cải thiện.',
        };
    }
    if (followUpAttempts.length < 2 || followUpAccuracy === null || previousPlan.baselineAccuracyPct === null) {
        return {
            status: 'ready_for_recheck' as WeeklyPdcaStatus,
            outcomeDeltaPct: null,
            interpretation: 'Đã đến ngày recheck nhưng chưa đủ follow-up attempt để tính delta.',
        };
    }

    const outcomeDeltaPct = followUpAccuracy - previousPlan.baselineAccuracyPct;

    return {
        status: 'validated' as WeeklyPdcaStatus,
        outcomeDeltaPct,
        interpretation: outcomeDeltaPct > 0
            ? `Accuracy follow-up tăng ${outcomeDeltaPct} điểm phần trăm; giữ can thiệp nếu trẻ không quá tải.`
            : `Accuracy follow-up chưa tăng; đổi chiến lược hoặc hạ độ khó.`,
    };
}

export function buildWeeklyPdcaPlan(args: {
    attempts?: AttemptSignal[];
    mistakes?: MistakeSignal[];
    reviewSchedules?: ReviewSignal[];
    parentObservations?: ObservationSignal[];
    previousPlan?: PreviousWeeklyPdcaPlan;
    now?: Date;
    childName?: string;
}): WeeklyPdcaPlan {
    const {
        attempts = [],
        mistakes = [],
        reviewSchedules = [],
        parentObservations = [],
        previousPlan,
        now = new Date(),
        childName = 'Henry',
    } = args;
    const issue = selectTopIssue({ attempts, mistakes, reviewSchedules, now });
    const baseline = baselineForTopic(issue.topicKey, attempts, mistakes, reviewSchedules, now);
    const mission = buildMission(issue.rootCause, issue.topicKey, childName);
    const recheckAt = addDays(now, 7).toISOString();
    const validation = previousPlan
        ? validatePreviousPlan(previousPlan, attempts, now)
        : {
            status: baseline.sampleSize < 3 && baseline.unresolvedMistakeCount === 0 && baseline.dueReviewCount === 0
                ? 'missing_data' as WeeklyPdcaStatus
                : 'planned' as WeeklyPdcaStatus,
            outcomeDeltaPct: null,
            interpretation: 'Chưa có follow-up sau can thiệp; chỉ được xem là kế hoạch PDCA.',
        };
    const observationNote = parentObservations[0]?.note ? ` Quan sát phụ huynh gần nhất: ${parentObservations[0].note}` : '';

    return {
        id: `pdca-${startOfWeek(now).toISOString().slice(0, 10)}-${issue.topicKey ?? 'baseline'}`,
        status: validation.status,
        weekStartDate: startOfWeek(now).toISOString(),
        issueTitle: issue.issueTitle,
        rootCause: issue.rootCause,
        evidenceSummary: [
            issue.reason,
            `Mẫu ${baseline.sampleSize} attempt, accuracy ${baseline.accuracyPct ?? 'chưa có'}%, gợi ý ${baseline.hintDependencyPct ?? 'chưa có'}%, lỗi mở ${baseline.unresolvedMistakeCount}, ôn đến hạn ${baseline.dueReviewCount}.`,
            observationNote,
        ].join(' ').trim(),
        baseline,
        parentMission: mission,
        recheck: {
            recheckAt,
            metric: 'accuracy + hint dependency + explanation note',
            minimumFollowUpAttempts: 2,
            outcomeDeltaPct: validation.outcomeDeltaPct,
            interpretation: validation.interpretation,
        },
        actDecision: validation.status === 'validated'
            ? validation.interpretation
            : 'Đợi dữ liệu recheck; chưa tự động nâng claim hoặc đổi độ khó mạnh.',
        noOverclaim: 'PDCA tuần chỉ là quyết định vận hành nội bộ. Không claim cải thiện học tập nếu chưa có before/after đủ mẫu.',
        sourceIds: ['sot-traceability-matrix', 'repo-current-benchmark', 'eef-metacognition', 'wwc-standards', 'zearn-reporting'],
        sotFeatureIds: ['mistake-notebook', 'daily-parent-mission', 'parent-dashboard'],
    };
}

