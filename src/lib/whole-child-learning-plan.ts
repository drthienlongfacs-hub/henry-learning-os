import type { Attempt, Mistake, ReviewSchedule } from '@/types';
import { getLearningSciencePrinciples, type LearningSciencePrincipleId } from '@/data/learning-science-system';

export interface LearningSystemPlanCard {
    id: string;
    title: string;
    metric: string;
    nextAction: string;
    href: string;
    principleIds: LearningSciencePrincipleId[];
    benchmark: string;
    benchmarkVi: string;
    tone: 'repair' | 'review' | 'learn' | 'stretch';
}

interface PlanInput {
    attempts: Attempt[];
    mistakes: Mistake[];
    reviewSchedules: ReviewSchedule[];
}

function pct(numerator: number, denominator: number) {
    if (denominator === 0) return null;
    return Math.round((numerator / denominator) * 100);
}

export function buildWholeChildLearningPlan({ attempts, mistakes, reviewSchedules }: PlanInput): LearningSystemPlanCard[] {
    const unresolvedMistakes = mistakes.filter((mistake) => !mistake.resolvedAt);
    const dueReviews = reviewSchedules.filter((review) => new Date(review.scheduledAt) <= new Date());
    const recentAttempts = attempts.slice(-20);
    const recentAccuracy = pct(recentAttempts.filter((attempt) => attempt.isCorrect).length, recentAttempts.length);
    const hintUse = pct(recentAttempts.filter((attempt) => attempt.hintLevelUsed > 0).length, recentAttempts.length);

    return [
        {
            id: 'memory',
            title: 'Nhớ lâu',
            metric: `${dueReviews.length} mục cần ôn`,
            nextAction: dueReviews.length > 0
                ? 'Ôn trước khi học bài mới để tận dụng retrieval và spacing.'
                : 'Không có mục quá hạn; giữ nhịp học ngắn và tạo thêm câu nhớ lại.',
            href: '/child/review',
            principleIds: ['retrieval', 'spacing'],
            benchmark: 'IES/WWC + AERO spacing/retrieval',
            benchmarkVi: 'IES/WWC + AERO giãn cách/nhớ lại',
            tone: 'review',
        },
        {
            id: 'repair',
            title: 'Sửa lỗi',
            metric: `${unresolvedMistakes.length} lỗi mở`,
            nextAction: unresolvedMistakes.length > 0
                ? 'Chọn một lỗi, giải thích lại nguyên nhân và làm một bài tương tự.'
                : 'Chưa có lỗi mở; dùng bài bẫy khái niệm để kiểm tra độ chắc.',
            href: '/child/mistakes',
            principleIds: ['metacognition', 'adaptive_challenge'],
            benchmark: 'EEF feedback + IXL diagnostic',
            benchmarkVi: 'Phản hồi EEF + chẩn đoán IXL',
            tone: 'repair',
        },
        {
            id: 'deep_learning',
            title: 'Học sâu',
            metric: recentAccuracy === null ? 'Chưa đủ dữ liệu' : `${recentAccuracy}% đúng gần đây`,
            nextAction: recentAccuracy !== null && recentAccuracy >= 90
                ? 'Chuyển sang Thử thách: yêu cầu giải thích, đổi dữ kiện và tự đặt câu hỏi.'
                : 'Giữ phiên Sâu: hình -> chiến lược -> luyện tập -> chuyển giao.',
            href: '/child/learn',
            principleIds: ['dual_coding', 'concrete_abstract', 'interleaving'],
            benchmark: 'Zearn + ST Math + Beast Academy',
            benchmarkVi: 'Zearn + ST Math + Beast Academy',
            tone: recentAccuracy !== null && recentAccuracy >= 90 ? 'stretch' : 'learn',
        },
        {
            id: 'agency',
            title: 'Tự chủ',
            metric: hintUse === null ? 'Chưa đủ dữ liệu' : `${hintUse}% câu dùng gợi ý`,
            nextAction: hintUse !== null && hintUse > 50
                ? 'Giảm gợi ý: bắt đầu bằng L0-L1 và yêu cầu con nói chiến lược trước.'
                : 'Cho con tự chọn nhịp học và dạy lại một ý cho ba/mẹ.',
            href: '/child/learn',
            principleIds: ['motivation', 'executive_function', 'udl'],
            benchmark: 'SDT + CAST UDL + Harvard EF',
            benchmarkVi: 'SDT + CAST UDL + Harvard EF',
            tone: 'learn',
        },
    ];
}

export function summarizePrinciplesForCard(card: LearningSystemPlanCard) {
    return getLearningSciencePrinciples(card.principleIds)
        .map((principle) => principle.label)
        .join(' · ');
}

/** Get card benchmark in correct language */
export function getCardBenchmark(card: LearningSystemPlanCard, lang: 'vi' | 'en' = 'vi'): string {
    return lang === 'vi' ? card.benchmarkVi : card.benchmark;
}
