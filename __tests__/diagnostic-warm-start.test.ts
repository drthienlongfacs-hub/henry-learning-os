import { describe, expect, it } from 'vitest';
import {
    GRADE1_DIAGNOSTIC_BLUEPRINT,
    GRADE1_DIAGNOSTIC_ITEMS,
    scoreGrade1DiagnosticWarmStart,
    type DiagnosticItemResponse,
} from '@/lib/diagnostic/grade1-warm-start';

function response(itemId: string, isCorrect: boolean, hintLevelUsed = 0): DiagnosticItemResponse {
    return {
        itemId,
        isCorrect,
        hintLevelUsed,
        confidenceSelfRating: isCorrect ? 4 : 2,
        childExplanation: isCorrect ? 'Con nói được cách làm.' : 'Con còn lẫn.',
        answeredAt: '2026-04-30T00:00:00.000Z',
    };
}

describe('grade 1 diagnostic warm-start', () => {
    it('defines a 12-15 minute diagnostic blueprint with curriculum traceability', () => {
        expect(GRADE1_DIAGNOSTIC_BLUEPRINT.estimatedMinutes).toBeGreaterThanOrEqual(12);
        expect(GRADE1_DIAGNOSTIC_BLUEPRINT.estimatedMinutes).toBeLessThanOrEqual(15);
        expect(GRADE1_DIAGNOSTIC_BLUEPRINT.noOverclaim).toContain('Không gọi trẻ là giỏi/yếu');
        expect(GRADE1_DIAGNOSTIC_ITEMS).toHaveLength(12);

        GRADE1_DIAGNOSTIC_ITEMS.forEach((item) => {
            expect(item.curriculumMapId).toMatch(/^primary:(math|vietnamese):/);
            expect(item.sourceIds).toContain('moet-ctgdpt-2018');
            expect(item.expectedEvidence.length).toBeGreaterThan(30);
            expect(item.misconceptionWatch.length).toBeGreaterThanOrEqual(2);
            expect(item.estimatedSeconds).toBeGreaterThanOrEqual(50);
        });
    });

    it('keeps missing-data status when diagnostic responses are insufficient', () => {
        const result = scoreGrade1DiagnosticWarmStart({
            responses: [
                response('diag-g1-math-add-sub-10', true),
                response('diag-g1-math-count-20', true),
            ],
            now: new Date('2026-04-30T00:00:00.000Z'),
        });

        expect(result.status).toBe('missing_data');
        expect(result.missingDataReason).toContain('Cần ít nhất');
        expect(result.confidencePct).toBeLessThanOrEqual(60);
        expect(result.blockedClaim).toContain('không claim level chính xác');
    });

    it('creates a ready 7-day plan from enough real diagnostic responses without overclaiming', () => {
        const responses = GRADE1_DIAGNOSTIC_ITEMS.slice(0, 10).map((item, index) =>
            response(item.id, index !== 4 && index !== 9, index >= 6 ? 1 : 0),
        );
        const result = scoreGrade1DiagnosticWarmStart({
            responses,
            now: new Date('2026-04-30T00:00:00.000Z'),
        });

        expect(result.status).toBe('ready_for_plan');
        expect(result.answeredCount).toBe(10);
        expect(result.accuracyPct).toBe(80);
        expect(result.confidencePct).toBeGreaterThan(60);
        expect(result.weakestDomain).toBeTruthy();
        expect(result.sevenDayPlan.dailyActions).toHaveLength(5);
        expect(result.sevenDayPlan.recheckAt).toContain('2026-05-07');
        expect(result.allowedClaim).toContain('diagnostic warm-start nội bộ');
        expect(result.blockedClaim).toContain('validation cohort');
    });

    it('detects the weakest domain for RCA instead of using a fixed grade label', () => {
        const responses = [
            response('diag-g1-math-add-sub-10', true),
            response('diag-g1-math-count-20', true),
            response('diag-g1-math-number-bonds', true),
            response('diag-g1-math-compare', true),
            response('diag-g1-math-shapes', true),
            response('diag-g1-math-spatial', true),
            response('diag-g1-vn-letter-after', false, 1),
            response('diag-g1-vn-letter-sound', false, 2),
            response('diag-g1-vn-letter-write', true, 1),
            response('diag-g1-vn-tone-sac', false, 2),
            response('diag-g1-vn-tone-hoi-nga', false, 2),
        ];
        const result = scoreGrade1DiagnosticWarmStart({ responses });
        const weakest = result.domainResults.find((domain) => domain.domain === result.weakestDomain);

        expect(result.status).toBe('ready_for_plan');
        expect(weakest?.subject).toBe('vietnamese');
        expect(weakest?.readinessBand).toBe('foundation_needed');
        expect(weakest?.rootCause).toContain('Cần củng cố');
        expect(result.sevenDayPlan.parentExplanation).toContain('giả thuyết vận hành');
    });
});
