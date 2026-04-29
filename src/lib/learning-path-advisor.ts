import type { Attempt } from '@/types';
import type { LearningSubjectKey } from '@/data/curriculum-enrichment';
import { getSubjectBenchmarkPatterns, getTopicLearningBlueprint } from '@/data/learning-benchmark-system';

export type LearningPathStatus = 'new' | 'repair' | 'practice' | 'ready' | 'stretch';

export interface TopicLearningPlan {
    topicKey: string;
    subject: LearningSubjectKey;
    status: LearningPathStatus;
    label: string;
    accuracy: number | null;
    evidenceCount: number;
    recentWrong: number;
    recommendedMode: 'focused' | 'deep' | 'challenge';
    nextAction: string;
    benchmarkSignal: string;
    parentPrompt: string;
}

type AttemptInput = Pick<Attempt, 'competencyId' | 'isCorrect' | 'createdAt' | 'hintLevelUsed'>;

const STATUS_LABEL: Record<LearningPathStatus, string> = {
    new: 'Chưa có dữ liệu',
    repair: 'Cần sửa lỗi',
    practice: 'Đang luyện',
    ready: 'Sẵn sàng tăng độ khó',
    stretch: 'Mở rộng nâng cao',
};

function sortByRecent(a: AttemptInput, b: AttemptInput) {
    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
}

export function getTopicLearningPlan(
    topicKey: string,
    subject: LearningSubjectKey,
    attempts: AttemptInput[] = [],
): TopicLearningPlan {
    const topicAttempts = attempts
        .filter((attempt) => attempt.competencyId === topicKey)
        .sort(sortByRecent)
        .slice(0, 12);
    const evidenceCount = topicAttempts.length;
    const correctCount = topicAttempts.filter((attempt) => attempt.isCorrect).length;
    const recentWrong = topicAttempts.slice(0, 4).filter((attempt) => !attempt.isCorrect).length;
    const hintedCount = topicAttempts.filter((attempt) => attempt.hintLevelUsed > 0).length;
    const accuracy = evidenceCount > 0 ? Math.round((correctCount / evidenceCount) * 100) : null;
    const blueprint = getTopicLearningBlueprint(topicKey, subject);
    const benchmark = getSubjectBenchmarkPatterns(subject)[0];

    let status: LearningPathStatus = 'new';
    let recommendedMode: TopicLearningPlan['recommendedMode'] = 'deep';
    let nextAction = `Bắt đầu bằng phiên Sâu: ${blueprint.studyRoutine.slice(0, 3).join(' -> ')}.`;

    if (accuracy === null) {
        status = 'new';
        recommendedMode = 'deep';
    } else if (accuracy < 60 || recentWrong >= 2) {
        status = 'repair';
        recommendedMode = 'focused';
        nextAction = `Quay về phiên Gọn, làm chậm và dùng gợi ý L1-L2: ${blueprint.practiceDesign[0]}.`;
    } else if (accuracy < 80 || hintedCount >= Math.ceil(evidenceCount / 2)) {
        status = 'practice';
        recommendedMode = 'deep';
        nextAction = `Giữ phiên Sâu, thêm một câu giải thích: ${blueprint.practiceDesign[1]}.`;
    } else if (accuracy < 92 || evidenceCount < 8) {
        status = 'ready';
        recommendedMode = 'deep';
        nextAction = `Sẵn sàng học tiếp, nhưng cần thêm bằng chứng: ${blueprint.evidenceOfMastery[1]}.`;
    } else {
        status = 'stretch';
        recommendedMode = 'challenge';
        nextAction = blueprint.stretchTask;
    }

    return {
        topicKey,
        subject,
        status,
        label: STATUS_LABEL[status],
        accuracy,
        evidenceCount,
        recentWrong,
        recommendedMode,
        nextAction,
        benchmarkSignal: `${benchmark.product}: ${benchmark.pattern}`,
        parentPrompt: blueprint.parentCoaching,
    };
}

export function summarizeSubjectPlan(
    subject: LearningSubjectKey,
    topicKeys: string[],
    attempts: AttemptInput[] = [],
) {
    const plans = topicKeys.map((topicKey) => getTopicLearningPlan(topicKey, subject, attempts));
    const repairCount = plans.filter((plan) => plan.status === 'repair').length;
    const stretchCount = plans.filter((plan) => plan.status === 'stretch').length;
    const unseenCount = plans.filter((plan) => plan.status === 'new').length;
    const nextPlan = plans.find((plan) => plan.status === 'repair')
        ?? plans.find((plan) => plan.status === 'practice')
        ?? plans.find((plan) => plan.status === 'new')
        ?? plans.find((plan) => plan.status === 'ready')
        ?? plans[0];

    return {
        subject,
        totalTopics: plans.length,
        repairCount,
        stretchCount,
        unseenCount,
        nextPlan,
    };
}
