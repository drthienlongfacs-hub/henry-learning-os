import { describe, expect, it } from 'vitest';
import { PRIMARY_CURRICULUM_MAP_STATS, PRIMARY_CURRICULUM_TOPIC_MAP } from '@/data/primary-curriculum-map';
import {
    buildCurriculumReviewQueue,
    summarizeCurriculumReviewQueue,
    type CurriculumItemReviewRecord,
} from '@/lib/curriculum/review-queue';

describe('curriculum human review queue', () => {
    it('creates a review queue for every grade 1-5 curriculum topic without auto approving items', () => {
        const queue = buildCurriculumReviewQueue();
        const summary = summarizeCurriculumReviewQueue(queue);

        expect(queue).toHaveLength(PRIMARY_CURRICULUM_TOPIC_MAP.length);
        expect(summary.totalItems).toBe(PRIMARY_CURRICULUM_MAP_STATS.topicMapCount);
        expect(summary.sourceTraceability100).toBe(100);
        expect(summary.needsHumanReview).toBe(PRIMARY_CURRICULUM_TOPIC_MAP.length);
        expect(summary.approvedItems).toBe(0);
        expect(summary.childFacingAllowed).toBe(0);
        expect(summary.readiness100).toBe(0);
        expect(summary.topRootCause).toBe('missing_human_review');
        expect(summary.allowedClaim).toContain('queue duyệt nội dung');
        expect(summary.blockedClaim).toContain('Không được nói item bank đã được duyệt 100%');

        queue.forEach((item) => {
            expect(item.status).toBe('needs_human_review');
            expect(item.childFacingAllowed).toBe(false);
            expect(item.maturityBlocked).toBe(true);
            expect(item.reviewerId).toBeNull();
            expect(item.sourceIds).toContain('moet-ctgdpt-2018');
            expect(item.requiredEvidence.length).toBeGreaterThanOrEqual(4);
            expect(item.noOverclaim).toContain('reviewer thật');
        });
    });

    it('accepts explicit reviewer metadata while keeping calibration as a separate evidence gate', () => {
        const approvedRecord: CurriculumItemReviewRecord = {
            curriculumMapId: 'primary:math:add_sub_10',
            itemId: 'generated:math:add_sub_10:review-v1',
            reviewerId: 'reviewer-parent-long',
            status: 'approved',
            reviewedAt: '2026-04-30T00:00:00.000Z',
            approvedAt: '2026-04-30T00:00:00.000Z',
            calibrationStatus: 'needs_real_attempts',
            evidenceNote: 'Phù hợp mạch Số và phép tính lớp 1, có lỗi sai dự kiến và bằng chứng cần lưu.',
            sourceIds: ['moet-ctgdpt-2018', 'repo-curriculum-map'],
        };
        const queue = buildCurriculumReviewQueue([approvedRecord]);
        const approved = queue.find((item) => item.curriculumMapId === 'primary:math:add_sub_10');
        const summary = summarizeCurriculumReviewQueue(queue);

        expect(approved?.status).toBe('approved');
        expect(approved?.reviewerId).toBe('reviewer-parent-long');
        expect(approved?.childFacingAllowed).toBe(true);
        expect(approved?.maturityBlocked).toBe(true);
        expect(approved?.readiness).toBe('ready_for_calibration');
        expect(approved?.rootCause).toBe('needs_real_attempts');
        expect(summary.approvedItems).toBe(1);
        expect(summary.needsCalibration).toBe(1);
        expect(summary.releaseReadyInternal).toBe(0);
        expect(summary.blockedClaim).toContain('calibration');
    });

    it('keeps blocked review decisions out of child-facing release and preserves block reason RCA', () => {
        const blockedRecord: CurriculumItemReviewRecord = {
            curriculumMapId: 'primary:vietnamese:tones',
            itemId: 'generated:vietnamese:tones:review-v1',
            reviewerId: 'reviewer-teacher-01',
            status: 'blocked',
            reviewedAt: '2026-04-30T00:00:00.000Z',
            blockedAt: '2026-04-30T00:00:00.000Z',
            blockReason: 'Ví dụ chưa phân biệt rõ dấu hỏi và dấu ngã.',
            calibrationStatus: 'needs_real_attempts',
            evidenceNote: 'Cần sửa ngữ liệu trước khi duyệt.',
            sourceIds: ['moet-ctgdpt-2018', 'repo-curriculum-map'],
        };
        const queue = buildCurriculumReviewQueue([blockedRecord]);
        const blocked = queue.find((item) => item.curriculumMapId === 'primary:vietnamese:tones');
        const summary = summarizeCurriculumReviewQueue(queue);

        expect(blocked?.status).toBe('blocked');
        expect(blocked?.childFacingAllowed).toBe(false);
        expect(blocked?.readiness).toBe('blocked_by_reviewer');
        expect(blocked?.rootCause).toBe('blocked_by_reviewer');
        expect(blocked?.nextAction).toContain('dấu hỏi và dấu ngã');
        expect(summary.blockedItems).toBe(1);
    });

    it('builds a PDCA plan from the dominant review queue root cause', () => {
        const summary = summarizeCurriculumReviewQueue();

        expect(summary.pdca.observe).toContain('item/topic đang chờ người duyệt');
        expect(summary.pdca.plan).toContain('5 item');
        expect(summary.pdca.do).toContain('reviewerId');
        expect(summary.pdca.check).toContain('approved/blocked');
        expect(summary.pdca.act).toContain('không tự release');
        expect(summary.sourceIds).toEqual(expect.arrayContaining(['sot-traceability-matrix', 'repo-curriculum-map']));
    });
});
