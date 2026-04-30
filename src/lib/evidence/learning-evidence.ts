import type { Attempt, Mistake, ReviewSchedule } from '@/types';
import type { LearningSubjectKey, SourceId } from '@/data/curriculum-enrichment';
import { getSubjectBenchmarkPatterns, getTopicLearningBlueprint } from '@/data/learning-benchmark-system';

export type EvidenceReliability = 'insufficient' | 'emerging' | 'usable' | 'strong';
export type EvidenceDecision = 'observe' | 'repair' | 'practice' | 'stretch' | 'accelerate_guarded';

export interface EvidenceBenchmark {
    product: string;
    pattern: string;
    sourceId: SourceId;
}

export interface TopicEvidenceProfile {
    topicKey: string;
    subject: LearningSubjectKey;
    sampleSize: number;
    independentSampleSize: number;
    recentSampleSize: number;
    accuracyPct: number | null;
    independentAccuracyPct: number | null;
    hintDependencyPct: number | null;
    recentWrongCount: number;
    unresolvedMistakeCount: number;
    dueReviewCount: number;
    lastAttemptAt: string | null;
    reliability: EvidenceReliability;
    decision: EvidenceDecision;
    challengeFitLabel: string;
    dataQualityNote: string;
    evidenceSummary: string;
    nextLearningMove: string;
    riskGuardrail: string;
    benchmark: EvidenceBenchmark;
    sourceIds: SourceId[];
}

export interface SubjectEvidenceDashboard {
    subject: LearningSubjectKey;
    totalTopics: number;
    totalAttempts: number;
    meanAccuracyPct: number | null;
    repairCount: number;
    practiceCount: number;
    stretchCount: number;
    accelerateGuardedCount: number;
    insufficientCount: number;
    topPriority: TopicEvidenceProfile | null;
    profiles: TopicEvidenceProfile[];
    recommendations: EvidenceRecommendation[];
}

export interface EvidenceRecommendation {
    id: string;
    topicKey: string;
    type: 'repair' | 'practice' | 'stretch' | 'accelerate_guarded' | 'collect_evidence';
    title: string;
    evidence: string;
    parentAction: string;
    risk: string;
    benchmark: string;
}

type AttemptInput = Pick<Attempt, 'competencyId' | 'isCorrect' | 'createdAt' | 'hintLevelUsed'>;
type MistakeInput = Pick<Mistake, 'id' | 'competencyId' | 'resolvedAt'>;
type ReviewInput = Pick<ReviewSchedule, 'itemType' | 'itemId' | 'scheduledAt'>;

function pct(numerator: number, denominator: number) {
    if (denominator === 0) return null;
    return Math.round((numerator / denominator) * 100);
}

function byRecent(a: AttemptInput, b: AttemptInput) {
    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
}

function getReliability(sampleSize: number, independentSampleSize: number): EvidenceReliability {
    if (sampleSize === 0) return 'insufficient';
    if (sampleSize < 4) return 'emerging';
    if (sampleSize < 10 || independentSampleSize < 4) return 'usable';
    return 'strong';
}

function getDataQualityNote(reliability: EvidenceReliability, sampleSize: number, independentSampleSize: number) {
    if (reliability === 'insufficient') {
        return 'Bấm vào để bắt đầu! Sau vài bài đầu, hệ thống sẽ tự điều chỉnh độ khó phù hợp.';
    }
    if (reliability === 'emerging') {
        return `Đã làm ${sampleSize} bài — thêm vài bài nữa để hệ thống hiểu rõ năng lực.`;
    }
    if (reliability === 'usable') {
        return `Đã làm ${sampleSize} bài (${independentSampleSize} tự lực) — đủ dữ liệu gợi ý nhịp học phù hợp.`;
    }
    return `Đã làm ${sampleSize} bài (${independentSampleSize} tự lực) — dữ liệu vững, sẵn sàng thử thách nâng cao.`;
}

function getDecision(args: {
    sampleSize: number;
    accuracyPct: number | null;
    hintDependencyPct: number | null;
    recentWrongCount: number;
    unresolvedMistakeCount: number;
    dueReviewCount: number;
    reliability: EvidenceReliability;
}): EvidenceDecision {
    const { sampleSize, accuracyPct, hintDependencyPct, recentWrongCount, unresolvedMistakeCount, dueReviewCount, reliability } = args;

    if (sampleSize === 0) return 'observe';
    if ((accuracyPct !== null && accuracyPct < 60) || recentWrongCount >= 2 || unresolvedMistakeCount >= 2) return 'repair';
    if ((hintDependencyPct !== null && hintDependencyPct > 45) || dueReviewCount > 0 || reliability === 'emerging') return 'practice';
    if (accuracyPct !== null && accuracyPct >= 95 && hintDependencyPct !== null && hintDependencyPct <= 10 && reliability === 'strong') {
        return 'accelerate_guarded';
    }
    if (accuracyPct !== null && accuracyPct >= 85 && hintDependencyPct !== null && hintDependencyPct <= 25) return 'stretch';
    return 'practice';
}

function getChallengeFitLabel(decision: EvidenceDecision) {
    switch (decision) {
        case 'observe':
            return 'Sẵn sàng học!';
        case 'repair':
            return 'Cần ôn lại';
        case 'practice':
            return 'Đang luyện tập';
        case 'stretch':
            return 'Sẵn sàng nâng cao';
        case 'accelerate_guarded':
            return 'Xuất sắc — có thể tăng tốc';
    }
}

function buildMoveAndGuardrail(
    decision: EvidenceDecision,
    blueprint: ReturnType<typeof getTopicLearningBlueprint>,
    benchmark: EvidenceBenchmark,
) {
    switch (decision) {
        case 'observe':
            return {
                nextLearningMove: `Làm bài chẩn đoán ngắn theo mạch: ${blueprint.studyRoutine.slice(0, 3).join(' -> ')}.`,
                riskGuardrail: 'Không gắn nhãn giỏi/yếu khi chưa có dữ liệu bài làm thật.',
            };
        case 'repair':
            return {
                nextLearningMove: `Quay về bước nhỏ nhất và sửa lỗi: ${blueprint.practiceDesign[0]}.`,
                riskGuardrail: 'Không tăng độ khó khi còn lỗi gần đây hoặc lỗi mở chưa sửa.',
            };
        case 'practice':
            return {
                nextLearningMove: `Giữ nhịp luyện sâu: ${blueprint.practiceDesign[1] ?? blueprint.practiceDesign[0]}.`,
                riskGuardrail: 'Giảm gợi ý dần; đúng nhờ gợi ý chưa được tính là thành thạo độc lập.',
            };
        case 'stretch':
            return {
                nextLearningMove: `Thêm giải thích và chuyển giao: ${blueprint.evidenceOfMastery[1] ?? blueprint.stretchTask}.`,
                riskGuardrail: `Benchmark ${benchmark.product} dùng thử thách để đào sâu, không dùng điểm số đơn thuần để ép nhanh.`,
            };
        case 'accelerate_guarded':
            return {
                nextLearningMove: blueprint.stretchTask,
                riskGuardrail: 'Chỉ tăng tốc theo từng chủ đề, vẫn giữ ôn trì hoãn và quan sát cảm xúc.',
            };
    }
}

function countDueReviews(topicKey: string, topicMistakeIds: Set<string>, reviewSchedules: ReviewInput[], now: Date) {
    return reviewSchedules.filter((review) => {
        if (new Date(review.scheduledAt) > now) return false;
        if (review.itemType === 'competency') return review.itemId === topicKey;
        if (review.itemType === 'mistake') return topicMistakeIds.has(review.itemId);
        return false;
    }).length;
}

export function buildTopicEvidenceProfile(args: {
    topicKey: string;
    subject: LearningSubjectKey;
    attempts?: AttemptInput[];
    mistakes?: MistakeInput[];
    reviewSchedules?: ReviewInput[];
    now?: Date;
}): TopicEvidenceProfile {
    const {
        topicKey,
        subject,
        attempts = [],
        mistakes = [],
        reviewSchedules = [],
        now = new Date(),
    } = args;

    const topicAttempts = attempts
        .filter((attempt) => attempt.competencyId === topicKey)
        .sort(byRecent);
    const recentAttempts = topicAttempts.slice(0, 12);
    const independentAttempts = topicAttempts.filter((attempt) => attempt.hintLevelUsed === 0);
    const correctCount = topicAttempts.filter((attempt) => attempt.isCorrect).length;
    const independentCorrectCount = independentAttempts.filter((attempt) => attempt.isCorrect).length;
    const hintedCount = topicAttempts.filter((attempt) => attempt.hintLevelUsed > 0).length;
    const unresolvedMistakes = mistakes.filter((mistake) => mistake.competencyId === topicKey && !mistake.resolvedAt);
    const topicMistakeIds = new Set(unresolvedMistakes.map((mistake) => mistake.id));
    const dueReviewCount = countDueReviews(topicKey, topicMistakeIds, reviewSchedules, now);
    const accuracyPct = pct(correctCount, topicAttempts.length);
    const independentAccuracyPct = pct(independentCorrectCount, independentAttempts.length);
    const hintDependencyPct = pct(hintedCount, topicAttempts.length);
    const recentWrongCount = recentAttempts.slice(0, 4).filter((attempt) => !attempt.isCorrect).length;
    const reliability = getReliability(topicAttempts.length, independentAttempts.length);
    const decision = getDecision({
        sampleSize: topicAttempts.length,
        accuracyPct,
        hintDependencyPct,
        recentWrongCount,
        unresolvedMistakeCount: unresolvedMistakes.length,
        dueReviewCount,
        reliability,
    });
    const blueprint = getTopicLearningBlueprint(topicKey, subject);
    const benchmarkBase = blueprint.benchmarkPatterns[0] ?? getSubjectBenchmarkPatterns(subject)[0];
    const benchmark: EvidenceBenchmark = {
        product: benchmarkBase.product,
        pattern: benchmarkBase.pattern,
        sourceId: benchmarkBase.sourceId,
    };
    const move = buildMoveAndGuardrail(decision, blueprint, benchmark);

    return {
        topicKey,
        subject,
        sampleSize: topicAttempts.length,
        independentSampleSize: independentAttempts.length,
        recentSampleSize: recentAttempts.length,
        accuracyPct,
        independentAccuracyPct,
        hintDependencyPct,
        recentWrongCount,
        unresolvedMistakeCount: unresolvedMistakes.length,
        dueReviewCount,
        lastAttemptAt: topicAttempts[0]?.createdAt ?? null,
        reliability,
        decision,
        challengeFitLabel: getChallengeFitLabel(decision),
        dataQualityNote: getDataQualityNote(reliability, topicAttempts.length, independentAttempts.length),
        evidenceSummary: accuracyPct === null
            ? 'Chưa có accuracy vì chưa có bài làm thật.'
            : `${topicAttempts.length} bài làm, đúng ${accuracyPct}%${hintDependencyPct ? `, gợi ý ${hintDependencyPct}%` : ''}${unresolvedMistakes.length > 0 ? `, ${unresolvedMistakes.length} lỗi cần sửa` : ''}`,
        ...move,
        benchmark,
        sourceIds: Array.from(new Set([...blueprint.goldStandards.map((item) => item.sourceId), benchmark.sourceId])),
    };
}

function recommendationFromProfile(profile: TopicEvidenceProfile): EvidenceRecommendation {
    const base = {
        id: `${profile.subject}-${profile.topicKey}-${profile.decision}`,
        topicKey: profile.topicKey,
        evidence: profile.evidenceSummary,
        parentAction: profile.nextLearningMove,
        risk: profile.riskGuardrail,
        benchmark: `${profile.benchmark.product}: ${profile.benchmark.pattern}`,
    };

    if (profile.decision === 'observe') {
        return { ...base, type: 'collect_evidence', title: 'Thu thập dữ liệu chẩn đoán' };
    }
    if (profile.decision === 'repair') {
        return { ...base, type: 'repair', title: 'Sửa hiểu nhầm trước khi học tiếp' };
    }
    if (profile.decision === 'stretch') {
        return { ...base, type: 'stretch', title: 'Mở rộng bằng giải thích và chuyển giao' };
    }
    if (profile.decision === 'accelerate_guarded') {
        return { ...base, type: 'accelerate_guarded', title: 'Tăng tốc có kiểm soát theo chủ đề' };
    }
    return { ...base, type: 'practice', title: 'Giữ nhịp luyện tập vừa tầm' };
}

export function buildSubjectEvidenceDashboard(args: {
    subject: LearningSubjectKey;
    topicKeys: string[];
    attempts?: AttemptInput[];
    mistakes?: MistakeInput[];
    reviewSchedules?: ReviewInput[];
    now?: Date;
}): SubjectEvidenceDashboard {
    const { subject, topicKeys, attempts = [], mistakes = [], reviewSchedules = [], now = new Date() } = args;
    const profiles = topicKeys.map((topicKey) => buildTopicEvidenceProfile({
        topicKey,
        subject,
        attempts,
        mistakes,
        reviewSchedules,
        now,
    }));
    const profilesWithAccuracy = profiles.filter((profile) => profile.accuracyPct !== null);
    const totalAttempts = profiles.reduce((sum, profile) => sum + profile.sampleSize, 0);
    const meanAccuracyPct = profilesWithAccuracy.length > 0
        ? Math.round(profilesWithAccuracy.reduce((sum, profile) => sum + (profile.accuracyPct ?? 0), 0) / profilesWithAccuracy.length)
        : null;
    const priorityOrder: EvidenceDecision[] = ['repair', 'practice', 'observe', 'stretch', 'accelerate_guarded'];
    const topPriority = profiles
        .filter((profile) => profile.sampleSize > 0 || profile.decision !== 'observe')
        .sort((a, b) => priorityOrder.indexOf(a.decision) - priorityOrder.indexOf(b.decision) || b.sampleSize - a.sampleSize)[0]
        ?? profiles[0]
        ?? null;
    const recommendations = profiles
        .filter((profile) => profile.decision !== 'practice' || profile.dueReviewCount > 0 || profile.hintDependencyPct !== null)
        .sort((a, b) => priorityOrder.indexOf(a.decision) - priorityOrder.indexOf(b.decision) || b.sampleSize - a.sampleSize)
        .slice(0, 4)
        .map(recommendationFromProfile);

    return {
        subject,
        totalTopics: profiles.length,
        totalAttempts,
        meanAccuracyPct,
        repairCount: profiles.filter((profile) => profile.decision === 'repair').length,
        practiceCount: profiles.filter((profile) => profile.decision === 'practice').length,
        stretchCount: profiles.filter((profile) => profile.decision === 'stretch').length,
        accelerateGuardedCount: profiles.filter((profile) => profile.decision === 'accelerate_guarded').length,
        insufficientCount: profiles.filter((profile) => profile.reliability === 'insufficient').length,
        topPriority,
        profiles,
        recommendations,
    };
}
