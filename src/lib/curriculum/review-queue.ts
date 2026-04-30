import {
    PRIMARY_CURRICULUM_MAP_STATS,
    PRIMARY_CURRICULUM_TOPIC_MAP,
    type PrimaryCurriculumSubjectKey,
    type PrimaryCurriculumTopicMap,
} from '@/data/primary-curriculum-map';
import { buildCurriculumMapId } from '@/lib/curriculum/item-audit';
import type { CurriculumCalibrationStatus, CurriculumReviewStatus } from '@/types';

export type CurriculumReviewRootCause =
    | 'missing_human_review'
    | 'blocked_by_reviewer'
    | 'missing_source_trace'
    | 'missing_review_evidence'
    | 'needs_real_attempts'
    | 'calibrating_with_attempts';

export type CurriculumReviewReadiness =
    | 'blocked_needs_review'
    | 'blocked_by_reviewer'
    | 'ready_for_calibration'
    | 'release_ready_internal';

export interface CurriculumItemReviewRecord {
    curriculumMapId: string;
    itemId: string;
    reviewerId: string;
    status: CurriculumReviewStatus;
    reviewedAt: string;
    approvedAt?: string;
    blockedAt?: string;
    blockReason?: string;
    calibrationStatus: CurriculumCalibrationStatus;
    evidenceNote: string;
    sourceIds: string[];
}

export interface CurriculumReviewQueueItem {
    itemId: string;
    curriculumMapId: string;
    subject: PrimaryCurriculumSubjectKey;
    subjectLabel: string;
    grade: number;
    topicKey: string;
    topicName: string;
    officialStrand: string;
    sampleTask: string;
    expectedOutcome: string;
    requiredEvidence: string[];
    misconceptionWatch: string[];
    releaseGate: string;
    sourceIds: string[];
    status: CurriculumReviewStatus;
    calibrationStatus: CurriculumCalibrationStatus;
    reviewerId: string | null;
    reviewedAt: string | null;
    approvedAt: string | null;
    blockReason: string | null;
    readiness: CurriculumReviewReadiness;
    rootCause: CurriculumReviewRootCause;
    childFacingAllowed: boolean;
    maturityBlocked: boolean;
    nextAction: string;
    noOverclaim: string;
}

export interface CurriculumReviewQueueSummary {
    totalItems: number;
    needsHumanReview: number;
    approvedItems: number;
    blockedItems: number;
    needsCalibration: number;
    calibratedItems: number;
    childFacingAllowed: number;
    releaseReadyInternal: number;
    readiness100: number;
    sourceTraceability100: number;
    reviewEvidence100: number;
    topRootCause: CurriculumReviewRootCause;
    pdca: {
        observe: string;
        rootCause: CurriculumReviewRootCause;
        plan: string;
        do: string;
        check: string;
        act: string;
    };
    blockedClaim: string;
    allowedClaim: string;
    sourceIds: string[];
}

function buildQueueItemId(topic: PrimaryCurriculumTopicMap) {
    return `generated:${topic.subject}:${topic.topicKey}:review-v1`;
}

function findReviewRecord(records: CurriculumItemReviewRecord[], curriculumMapId: string) {
    return records.find((record) => record.curriculumMapId === curriculumMapId);
}

function evaluateReadiness(topic: PrimaryCurriculumTopicMap, record?: CurriculumItemReviewRecord) {
    if (topic.sourceIds.length === 0 || topic.releaseGate.length < 40) {
        return {
            readiness: 'blocked_needs_review' as CurriculumReviewReadiness,
            rootCause: 'missing_source_trace' as CurriculumReviewRootCause,
            childFacingAllowed: false,
            maturityBlocked: true,
            nextAction: 'Bổ sung sourceIds, release gate và bằng chứng curriculum trước khi đưa vào queue.',
        };
    }

    if (!record || record.status === 'needs_human_review') {
        return {
            readiness: 'blocked_needs_review' as CurriculumReviewReadiness,
            rootCause: 'missing_human_review' as CurriculumReviewRootCause,
            childFacingAllowed: false,
            maturityBlocked: true,
            nextAction: 'Người duyệt cần kiểm tra yêu cầu cần đạt, lời giải, lỗi sai dự kiến và evidence cần lưu.',
        };
    }

    if (record.status === 'blocked') {
        return {
            readiness: 'blocked_by_reviewer' as CurriculumReviewReadiness,
            rootCause: 'blocked_by_reviewer' as CurriculumReviewRootCause,
            childFacingAllowed: false,
            maturityBlocked: true,
            nextAction: record.blockReason
                ? `Sửa theo lý do block: ${record.blockReason}`
                : 'Sửa nội dung theo nhận xét người duyệt trước khi gửi lại.',
        };
    }

    if (!record.evidenceNote || record.evidenceNote.length < 20) {
        return {
            readiness: 'blocked_needs_review' as CurriculumReviewReadiness,
            rootCause: 'missing_review_evidence' as CurriculumReviewRootCause,
            childFacingAllowed: false,
            maturityBlocked: true,
            nextAction: 'Bổ sung evidence note: vì sao item phù hợp chương trình, lỗi cần theo dõi và điều kiện dùng với trẻ.',
        };
    }

    if (record.calibrationStatus === 'needs_real_attempts') {
        return {
            readiness: 'ready_for_calibration' as CurriculumReviewReadiness,
            rootCause: 'needs_real_attempts' as CurriculumReviewRootCause,
            childFacingAllowed: true,
            maturityBlocked: true,
            nextAction: 'Chỉ dùng ở pilot/luồng có giám sát để thu attempt thật, chưa claim độ khó đã chuẩn.',
        };
    }

    if (record.calibrationStatus === 'calibrating') {
        return {
            readiness: 'ready_for_calibration' as CurriculumReviewReadiness,
            rootCause: 'calibrating_with_attempts' as CurriculumReviewRootCause,
            childFacingAllowed: true,
            maturityBlocked: true,
            nextAction: 'Tiếp tục thu mẫu attempt theo lớp/chủ đề để tính độ khó và lỗi thường gặp.',
        };
    }

    return {
        readiness: 'release_ready_internal' as CurriculumReviewReadiness,
        rootCause: 'needs_real_attempts' as CurriculumReviewRootCause,
        childFacingAllowed: true,
        maturityBlocked: false,
        nextAction: 'Có thể dùng như item nội bộ đã duyệt và đã calibration; vẫn cần pilot outcome để claim hiệu quả học tập.',
    };
}

export function buildCurriculumReviewQueue(records: CurriculumItemReviewRecord[] = []): CurriculumReviewQueueItem[] {
    return PRIMARY_CURRICULUM_TOPIC_MAP.map((topic) => {
        const curriculumMapId = buildCurriculumMapId(topic.subject, topic.topicKey);
        const record = findReviewRecord(records, curriculumMapId);
        const readiness = evaluateReadiness(topic, record);

        return {
            itemId: record?.itemId ?? buildQueueItemId(topic),
            curriculumMapId,
            subject: topic.subject,
            subjectLabel: topic.subjectLabel,
            grade: topic.grade,
            topicKey: topic.topicKey,
            topicName: topic.topicName,
            officialStrand: topic.officialStrand,
            sampleTask: topic.exampleTask,
            expectedOutcome: topic.expectedOutcome,
            requiredEvidence: topic.evidenceToStore,
            misconceptionWatch: topic.misconceptionWatch,
            releaseGate: topic.releaseGate,
            sourceIds: topic.sourceIds,
            status: record?.status ?? 'needs_human_review',
            calibrationStatus: record?.calibrationStatus ?? 'needs_real_attempts',
            reviewerId: record?.reviewerId ?? null,
            reviewedAt: record?.reviewedAt ?? null,
            approvedAt: record?.approvedAt ?? null,
            blockReason: record?.blockReason ?? null,
            ...readiness,
            noOverclaim: 'Human review queue chỉ chứng minh có workflow duyệt nội dung. Không claim item bank phủ chuẩn hoặc hiệu quả học tập nếu chưa có reviewer thật, calibration và pilot outcome.',
        };
    });
}

function count(items: CurriculumReviewQueueItem[], predicate: (item: CurriculumReviewQueueItem) => boolean) {
    return items.filter(predicate).length;
}

function pct(numerator: number, denominator: number) {
    if (denominator === 0) return 0;
    return Math.round((numerator / denominator) * 100);
}

function selectTopRootCause(items: CurriculumReviewQueueItem[]): CurriculumReviewRootCause {
    const counts = new Map<CurriculumReviewRootCause, number>();
    items.forEach((item) => counts.set(item.rootCause, (counts.get(item.rootCause) ?? 0) + 1));

    return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'missing_human_review';
}

function buildPdca(items: CurriculumReviewQueueItem[], topRootCause: CurriculumReviewRootCause) {
    const needsReview = count(items, (item) => item.status === 'needs_human_review');
    const needsCalibration = count(items, (item) => item.status === 'approved' && item.calibrationStatus !== 'calibrated');

    if (topRootCause === 'missing_human_review') {
        return {
            observe: `${needsReview} item/topic đang chờ người duyệt.`,
            rootCause: topRootCause,
            plan: 'Mỗi phiên duyệt chọn 5 item ưu tiên lớp 1-2, kiểm tra source, lời giải, misconception và evidence fields.',
            do: 'Người duyệt ghi reviewerId, reviewedAt, evidenceNote, approvedAt hoặc blockReason.',
            check: 'Cuối phiên kiểm tra tỉ lệ approved/blocked và số item còn needs_human_review.',
            act: 'Item approved được đưa vào calibration/pilot; item blocked quay lại sửa nội dung, không tự release.',
        };
    }

    if (topRootCause === 'needs_real_attempts' || needsCalibration > 0) {
        return {
            observe: `${needsCalibration} item đã duyệt nhưng còn thiếu dữ liệu attempt thật để calibration.`,
            rootCause: topRootCause,
            plan: 'Dùng item đã duyệt trong pilot có giám sát, thu attempt, hint level, thời gian và lỗi sai.',
            do: 'Không đổi độ khó bằng cảm tính; chỉ đánh dấu calibrating khi có attempt thật.',
            check: 'Sau đủ mẫu, xem accuracy, hint dependency và lỗi phân biệt theo lớp/chủ đề.',
            act: 'Cập nhật calibrationStatus; nếu dữ liệu yếu thì giữ ready_for_calibration và không claim mature.',
        };
    }

    return {
        observe: 'Có item bị block hoặc thiếu evidence note trong queue.',
        rootCause: topRootCause,
        plan: 'Sửa từng item theo blockReason/evidence gap trước khi gửi lại.',
        do: 'Không sửa hàng loạt nếu không biết nguyên nhân; mỗi item cần note riêng.',
        check: 'Re-run review queue audit để kiểm tra item còn bị block vì lý do nào.',
        act: 'Chỉ chuyển trạng thái khi có reviewer metadata hợp lệ.',
    };
}

export function summarizeCurriculumReviewQueue(items = buildCurriculumReviewQueue()): CurriculumReviewQueueSummary {
    const totalItems = items.length;
    const approvedItems = count(items, (item) => item.status === 'approved');
    const blockedItems = count(items, (item) => item.status === 'blocked');
    const needsHumanReview = count(items, (item) => item.status === 'needs_human_review');
    const needsCalibration = count(items, (item) => item.status === 'approved' && item.calibrationStatus !== 'calibrated');
    const calibratedItems = count(items, (item) => item.calibrationStatus === 'calibrated');
    const childFacingAllowed = count(items, (item) => item.childFacingAllowed);
    const releaseReadyInternal = count(items, (item) => item.readiness === 'release_ready_internal');
    const reviewEvidence100 = pct(approvedItems + blockedItems, totalItems);
    const topRootCause = selectTopRootCause(items);

    return {
        totalItems,
        needsHumanReview,
        approvedItems,
        blockedItems,
        needsCalibration,
        calibratedItems,
        childFacingAllowed,
        releaseReadyInternal,
        readiness100: pct(releaseReadyInternal, totalItems),
        sourceTraceability100: PRIMARY_CURRICULUM_MAP_STATS.topicMapCount === totalItems ? 100 : pct(totalItems, PRIMARY_CURRICULUM_MAP_STATS.topicMapCount),
        reviewEvidence100,
        topRootCause,
        pdca: buildPdca(items, topRootCause),
        blockedClaim: 'Không được nói item bank đã được duyệt 100%, đã calibration 100% hoặc đã chứng minh hiệu quả học tập.',
        allowedClaim: 'Được nói hệ thống đã có queue duyệt nội dung và release gate nội bộ cho item lớp 1-5.',
        sourceIds: ['sot-traceability-matrix', 'repo-curriculum-map', 'moet-ctgdpt-2018', 'moet-tt17-2025', 'moet-primary-scope-2018', 'repo-current-benchmark'],
    };
}
