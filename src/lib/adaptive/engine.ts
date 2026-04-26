// ========================================
// Adaptive Acceleration Engine
// Challenge Fit Score + Level Engine
// Based on ADAPTIVE_ACCELERATION_SPEC.md
// ========================================

import type { SkillState, AccelerationStatus, AccelerationRecommendation, RecommendationType } from '@/types';
import { generateId } from '@/lib/utils';

// --- Challenge Fit Score ---
// 0-35: too hard | 36-55: hard stretch | 56-80: optimal ZPD | 81-100: too easy

export function computeChallengeFitScore(state: SkillState): number {
    const accuracyWeight = 0.3;
    const hintWeight = 0.2;
    const retentionWeight = 0.2;
    const transferWeight = 0.15;
    const engagementWeight = 0.15;

    const accuracyScore = state.independentAccuracy * 100;
    const hintScore = (1 - state.hintDependency) * 100;
    const retentionScore = state.retentionScore * 100;
    const transferScore = state.transferScore * 100;
    const engagementScore = (1 - (state.frustrationSignal * 0.6 + state.boredomSignal * 0.4)) * 100;

    const score =
        accuracyScore * accuracyWeight +
        hintScore * hintWeight +
        retentionScore * retentionWeight +
        transferScore * transferWeight +
        engagementScore * engagementWeight;

    return Math.round(Math.max(0, Math.min(100, score)));
}

export function getChallengeFitBand(score: number): string {
    if (score <= 35) return 'too_hard';
    if (score <= 55) return 'hard_stretch';
    if (score <= 80) return 'optimal_zpd';
    return 'too_easy';
}

// --- Acceleration Status ---

export function computeAccelerationStatus(state: SkillState): AccelerationStatus {
    const cfs = computeChallengeFitScore(state);

    if (state.frustrationSignal > 0.7) return 'overchallenged';
    if (state.boredomSignal > 0.7 && state.independentAccuracy > 0.9) return 'underchallenged';

    if (state.independentAccuracy < 0.5 && state.hintDependency > 0.6) return 'foundation_needed';
    if (state.independentAccuracy < 0.6) return 'needs_consolidation';

    if (
        state.independentAccuracy >= 0.95 &&
        state.hintDependency <= 0.1 &&
        state.transferScore >= 0.85 &&
        state.retentionScore >= 0.8
    ) {
        return 'ready_for_acceleration';
    }

    if (
        state.independentAccuracy >= 0.85 &&
        state.hintDependency <= 0.2 &&
        state.transferScore >= 0.7
    ) {
        return 'ready_for_stretch';
    }

    return 'on_track';
}

// --- Recommendation Generator ---

export function generateRecommendation(
    childId: string,
    state: SkillState,
    domain: string,
    skillCluster: string
): AccelerationRecommendation | null {
    const status = computeAccelerationStatus(state);

    let type: RecommendationType;
    let evidence: string;
    let risk: string;
    let parentAction: string;

    switch (status) {
        case 'ready_for_acceleration':
            type = 'accelerate';
            evidence = `Accuracy ${Math.round(state.independentAccuracy * 100)}%, hint dependency ${Math.round(state.hintDependency * 100)}%, transfer ${Math.round(state.transferScore * 100)}%`;
            risk = 'Cần đảm bảo con không bị áp lực. Theo dõi cảm xúc.';
            parentAction = 'Review và phê duyệt nội dung nâng cao.';
            break;
        case 'underchallenged':
            type = 'compact';
            evidence = `Accuracy >90% với boredom signal ${Math.round(state.boredomSignal * 100)}%. Con đang thấy quá dễ.`;
            risk = 'Nếu tiếp tục nội dung dễ quá, con sẽ mất hứng thú.';
            parentAction = 'Cho phép bỏ qua bài đã thành thạo, chuyển sang thử thách.';
            break;
        case 'overchallenged':
            type = 'scaffold';
            evidence = `Frustration signal ${Math.round(state.frustrationSignal * 100)}%, accuracy ${Math.round(state.independentAccuracy * 100)}%.`;
            risk = 'Con đang bị quá tải. Cần giảm độ khó.';
            parentAction = 'Hỗ trợ con bằng việc học cùng. Giảm thời gian buổi học.';
            break;
        case 'needs_consolidation':
            type = 'consolidate';
            evidence = `Accuracy ${Math.round(state.independentAccuracy * 100)}% chưa đủ vững.`;
            risk = 'Di chuyển quá nhanh có thể tạo lỗ hổng.';
            parentAction = 'Ôn lại bài cũ cùng con.';
            break;
        case 'ready_for_stretch':
            type = 'enrich';
            evidence = `Accuracy ${Math.round(state.independentAccuracy * 100)}%, transfer ${Math.round(state.transferScore * 100)}%.`;
            risk = 'Stretch tasks có thể khó hơn dự kiến. Theo dõi cảm xúc.';
            parentAction = 'Khuyến khích con thử thách nhưng không ép.';
            break;
        default:
            return null;
    }

    return {
        id: generateId(),
        childId,
        domain: domain as AccelerationRecommendation['domain'],
        skillCluster,
        recommendationType: type,
        evidenceSummary: evidence,
        riskNotes: risk,
        parentAction,
        status: 'proposed',
        createdAt: new Date().toISOString(),
    };
}

// --- Learning Velocity ---

export function computeLearningVelocity(state: SkillState): number {
    // Skills per exposure weighted by accuracy and transfer
    if (state.exposureCount === 0) return 0;
    const effectiveProgress = (state.independentAccuracy + state.transferScore) / 2;
    return Math.round((effectiveProgress / Math.max(1, state.exposureCount)) * 100) / 100;
}

// --- Hint Dependency Index ---

export function computeHintDependencyIndex(state: SkillState): string {
    const hdi = state.hintDependency;
    if (hdi <= 0.1) return 'Rất tự lập';
    if (hdi <= 0.3) return 'Tự lập';
    if (hdi <= 0.5) return 'Cần hỗ trợ vừa phải';
    if (hdi <= 0.7) return 'Phụ thuộc gợi ý nhiều';
    return 'Phụ thuộc gợi ý rất nhiều';
}
