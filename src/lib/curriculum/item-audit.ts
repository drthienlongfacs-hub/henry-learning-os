import {
    PRIMARY_CURRICULUM_MAP_STATS,
    PRIMARY_CURRICULUM_TOPIC_MAP,
    getPrimaryCurriculumTopicMap,
    type PrimaryCurriculumSubjectKey,
} from '@/data/primary-curriculum-map';
import type { CurriculumEvidenceRef } from '@/types';

export interface GeneratedCurriculumItemBase {
    id: string;
    topicKey: string;
    gradeLevel: number;
}

export interface CurriculumItemAudit extends CurriculumEvidenceRef {
    subjectLabel: string;
    topicName: string;
    expectedOutcome: string;
    sourceIds: string[];
    requiredAttemptEvidence: string[];
    misconceptionWatch: string[];
    releaseGate: string;
    noOverclaimGuardrail: string;
}

export type CurriculumMappedProblem<T extends GeneratedCurriculumItemBase> = T & {
    curriculum: CurriculumItemAudit;
    curriculumMapId: string;
    curriculumSourceVersion: string;
};

export const PRIMARY_ITEM_AUDIT_GATE = {
    requiredTopicCount: PRIMARY_CURRICULUM_TOPIC_MAP.length,
    traceableTopicCount: PRIMARY_CURRICULUM_TOPIC_MAP.filter((item) => item.status === 'item_traceable_needs_human_review').length,
    generatedItemTraceabilityCoverage100: computeGeneratedItemTraceabilityCoverage(),
    attemptEvidenceFields: PRIMARY_CURRICULUM_MAP_STATS.evidenceFields,
    reviewStatus: 'needs_human_review',
    calibrationStatus: 'needs_real_attempts',
    noOverclaim: PRIMARY_CURRICULUM_MAP_STATS.noOverclaim,
};

export function buildCurriculumMapId(subject: PrimaryCurriculumSubjectKey, topicKey: string) {
    return `primary:${subject}:${topicKey}`;
}

export function buildCurriculumItemAudit(
    subject: PrimaryCurriculumSubjectKey,
    topicKey: string,
): CurriculumItemAudit {
    const mapping = getPrimaryCurriculumTopicMap(subject, topicKey);
    if (!mapping) {
        throw new Error(`Missing primary curriculum map for ${subject}:${topicKey}`);
    }

    return {
        curriculumMapId: buildCurriculumMapId(subject, topicKey),
        curriculumSubject: mapping.subjectLabel,
        curriculumGrade: mapping.grade,
        curriculumTopicKey: mapping.topicKey,
        curriculumSourceVersion: PRIMARY_CURRICULUM_MAP_STATS.sourceVersion,
        curriculumOfficialStrand: mapping.officialStrand,
        curriculumReviewStatus: 'needs_human_review',
        curriculumCalibrationStatus: 'needs_real_attempts',
        subjectLabel: mapping.subjectLabel,
        topicName: mapping.topicName,
        expectedOutcome: mapping.expectedOutcome,
        sourceIds: mapping.sourceIds,
        requiredAttemptEvidence: mapping.evidenceToStore,
        misconceptionWatch: mapping.misconceptionWatch,
        releaseGate: mapping.releaseGate,
        noOverclaimGuardrail: 'Traceability này chỉ chứng minh item bám curriculum map; chưa phải claim hiệu quả học tập hoặc item bank đã được duyệt toàn bộ.',
    };
}

export function attachCurriculumAudit<T extends GeneratedCurriculumItemBase>(
    subject: PrimaryCurriculumSubjectKey,
    item: T,
): CurriculumMappedProblem<T> {
    const curriculum = buildCurriculumItemAudit(subject, item.topicKey);
    if (curriculum.curriculumGrade !== item.gradeLevel) {
        throw new Error(`Grade mismatch for ${subject}:${item.topicKey}. Item grade ${item.gradeLevel}, map grade ${curriculum.curriculumGrade}`);
    }

    return {
        ...item,
        curriculum,
        curriculumMapId: curriculum.curriculumMapId,
        curriculumSourceVersion: curriculum.curriculumSourceVersion,
    };
}

export function attachCurriculumAuditSet<T extends GeneratedCurriculumItemBase>(
    subject: PrimaryCurriculumSubjectKey,
    items: T[],
) {
    return items.map((item) => attachCurriculumAudit(subject, item));
}

export function buildAttemptCurriculumEvidence(
    item: Partial<{ curriculum: CurriculumItemAudit }>,
): CurriculumEvidenceRef | undefined {
    if (!item.curriculum) return undefined;

    const {
        curriculumMapId,
        curriculumSubject,
        curriculumGrade,
        curriculumTopicKey,
        curriculumSourceVersion,
        curriculumOfficialStrand,
        curriculumReviewStatus,
        curriculumCalibrationStatus,
    } = item.curriculum;

    return {
        curriculumMapId,
        curriculumSubject,
        curriculumGrade,
        curriculumTopicKey,
        curriculumSourceVersion,
        curriculumOfficialStrand,
        curriculumReviewStatus,
        curriculumCalibrationStatus,
    };
}

export function computeGeneratedItemTraceabilityCoverage() {
    if (PRIMARY_CURRICULUM_TOPIC_MAP.length === 0) return 0;
    const traceable = PRIMARY_CURRICULUM_TOPIC_MAP.filter((item) =>
        item.status === 'item_traceable_needs_human_review'
        && item.evidenceToStore.includes('topicKey')
        && item.evidenceToStore.some((field) => field.toLowerCase().includes('grade'))
        && item.sourceIds.length > 0
        && item.releaseGate.length > 60,
    );

    return Math.round((traceable.length / PRIMARY_CURRICULUM_TOPIC_MAP.length) * 100);
}
