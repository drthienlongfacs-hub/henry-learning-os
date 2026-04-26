// ========================================
// Curriculum Compactor
// Skip mastered content, suggest enrichment
// Based on ADAPTIVE_ACCELERATION_SPEC.md
// ========================================

import type { SkillState, MasteryState, Lesson, Competency } from '@/types';
import {
    computeChallengeFitScore,
    computeAccelerationStatus,
    getChallengeFitBand,
} from './engine';

export interface CompactResult {
    canSkip: boolean;
    reason: string;
    replacementActivity?: string;
}

export interface EnrichmentSuggestion {
    type: 'deeper_dive' | 'cross_domain' | 'creative_application' | 'real_world';
    title: string;
    description: string;
    estimatedMinutes: number;
}

/**
 * Determine if a lesson can be compacted (skipped)
 * based on the child's mastery of its competencies.
 */
export function evaluateCompaction(
    lesson: Lesson,
    masteryStates: MasteryState[],
    skillStates: SkillState[]
): CompactResult {
    const competencyMasteries = lesson.competencyIds.map((cId) =>
        masteryStates.find((ms) => ms.competencyId === cId)
    );

    // All competencies must be mastered or transfer_success to compact
    const allMastered = competencyMasteries.every(
        (ms) => ms && (ms.state === 'mastered' || ms.state === 'transfer_success')
    );

    if (!allMastered) {
        const notMastered = competencyMasteries.filter(
            (ms) => !ms || (ms.state !== 'mastered' && ms.state !== 'transfer_success')
        );
        return {
            canSkip: false,
            reason: `${notMastered.length} kỹ năng chưa thành thạo. Cần ôn tập thêm.`,
        };
    }

    // Check skill states for high independent accuracy and low hint dependency
    const relevantSkills = skillStates.filter((ss) =>
        lesson.competencyIds.includes(ss.skillId)
    );

    if (relevantSkills.length > 0) {
        const avgAccuracy =
            relevantSkills.reduce((sum, s) => sum + s.independentAccuracy, 0) /
            relevantSkills.length;
        const avgHintDep =
            relevantSkills.reduce((sum, s) => sum + s.hintDependency, 0) /
            relevantSkills.length;

        if (avgAccuracy < 0.9 || avgHintDep > 0.2) {
            return {
                canSkip: false,
                reason: `Accuracy ${Math.round(avgAccuracy * 100)}%, hint dependency ${Math.round(avgHintDep * 100)}% — chưa đủ vững để bỏ qua.`,
            };
        }
    }

    return {
        canSkip: true,
        reason: 'Đã thành thạo tất cả kỹ năng. Có thể bỏ qua hoặc thay bằng thử thách nâng cao.',
        replacementActivity: 'enrichment',
    };
}

/**
 * Generate enrichment suggestions for a compacted lesson
 */
export function generateEnrichments(
    lesson: Lesson,
    competencies: Competency[]
): EnrichmentSuggestion[] {
    const subject = lesson.subject;
    const suggestions: EnrichmentSuggestion[] = [];

    if (subject === 'Toán') {
        suggestions.push(
            {
                type: 'deeper_dive',
                title: 'Bài toán đố nâng cao',
                description: 'Giải bài toán đố kết hợp nhiều phép tính, cần suy luận logic.',
                estimatedMinutes: 10,
            },
            {
                type: 'creative_application',
                title: 'Toán trong cuộc sống',
                description: 'Tính tiền đi chợ, đo chiều dài đồ vật trong nhà, chia pizza đều.',
                estimatedMinutes: 15,
            },
            {
                type: 'cross_domain',
                title: 'Toán + Khoa học',
                description: 'Đếm và phân loại lá cây, vẽ biểu đồ nhiệt độ trong tuần.',
                estimatedMinutes: 12,
            }
        );
    } else if (subject === 'Tiếng Việt') {
        suggestions.push(
            {
                type: 'creative_application',
                title: 'Viết truyện ngắn',
                description: 'Sáng tác truyện ngắn 5-10 câu với nhân vật yêu thích.',
                estimatedMinutes: 15,
            },
            {
                type: 'deeper_dive',
                title: 'Đọc hiểu nâng cao',
                description: 'Đọc đoạn văn dài hơn, trả lời câu hỏi suy luận.',
                estimatedMinutes: 10,
            },
            {
                type: 'real_world',
                title: 'Phóng viên nhỏ',
                description: 'Phỏng vấn ba/mẹ và viết lại câu trả lời.',
                estimatedMinutes: 12,
            }
        );
    } else if (subject === 'Tiếng Anh') {
        suggestions.push(
            {
                type: 'creative_application',
                title: 'English Story Time',
                description: 'Nghe và kể lại một câu chuyện bằng tiếng Anh đơn giản.',
                estimatedMinutes: 10,
            },
            {
                type: 'cross_domain',
                title: 'English + Science',
                description: 'Học tên các con vật, màu sắc, hình dạng bằng tiếng Anh.',
                estimatedMinutes: 12,
            },
            {
                type: 'real_world',
                title: 'Label your room',
                description: 'Dán nhãn tiếng Anh lên đồ vật trong phòng.',
                estimatedMinutes: 8,
            }
        );
    }

    return suggestions;
}

/**
 * Pre-assessment: determine if child can test out of a skill cluster.
 * Returns true if they answer correctly above threshold.
 */
export function canTestOut(
    correctAnswers: number,
    totalQuestions: number,
    threshold: number = 0.85
): boolean {
    if (totalQuestions === 0) return false;
    return correctAnswers / totalQuestions >= threshold;
}

/**
 * Compute an Asynchronous Profile Snapshot for context-specific abilities.
 */
export function computeAsynchronousProfile(
    skillStates: SkillState[],
    domains: string[]
): Record<string, { level: string; cfs: number; velocity: number }> {
    const profile: Record<string, { level: string; cfs: number; velocity: number }> = {};

    for (const domain of domains) {
        // Filter skills - use all provided skills for the domain
        const domainSkills = skillStates;

        if (domainSkills.length === 0) {
            profile[domain] = { level: 'Chưa đánh giá', cfs: 0, velocity: 0 };
            continue;
        }

        const avgCFS = Math.round(
            domainSkills.reduce((sum, s) => sum + computeChallengeFitScore(s), 0) /
            domainSkills.length
        );

        const avgVelocity =
            domainSkills.reduce((sum, s) => {
                const ep = (s.independentAccuracy + s.transferScore) / 2;
                return sum + (s.exposureCount > 0 ? ep / s.exposureCount : 0);
            }, 0) / domainSkills.length;

        const avgAccuracy =
            domainSkills.reduce((sum, s) => sum + s.independentAccuracy, 0) /
            domainSkills.length;

        let level: string;
        if (avgAccuracy >= 0.95 && avgCFS > 80) level = 'Vượt trội';
        else if (avgAccuracy >= 0.85) level = 'Thành thạo';
        else if (avgAccuracy >= 0.7) level = 'Đang tiến bộ';
        else if (avgAccuracy >= 0.5) level = 'Cần củng cố';
        else level = 'Nền tảng';

        profile[domain] = {
            level,
            cfs: avgCFS,
            velocity: Math.round(avgVelocity * 100) / 100,
        };
    }

    return profile;
}
