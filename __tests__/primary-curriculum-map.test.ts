import { describe, expect, it } from 'vitest';
import {
    PRIMARY_CURRICULUM_MAP_STATS,
    PRIMARY_CURRICULUM_TOPIC_MAP,
    computePrimaryCurriculumTopicMapCoverage,
    getPrimaryCurriculumTopicMap,
    type PrimaryCurriculumSubjectKey,
} from '@/data/primary-curriculum-map';
import { MATH_TOPICS } from '@/lib/content/math-generator';
import { VIETNAMESE_TOPICS } from '@/lib/content/vietnamese-generator';
import { ENGLISH_TOPICS } from '@/lib/content/english-generator';
import { SCIENCE_TOPICS } from '@/lib/content/science-generator';
import { HISGEO_TOPICS } from '@/lib/content/history-geo-generator';
import { COMPUTING_TOPICS } from '@/lib/content/computing-generator';

const topicSets: { subject: PrimaryCurriculumSubjectKey; topics: { key: string; gradeLevel: number }[] }[] = [
    { subject: 'math', topics: MATH_TOPICS },
    { subject: 'vietnamese', topics: VIETNAMESE_TOPICS },
    { subject: 'english', topics: ENGLISH_TOPICS },
    { subject: 'science', topics: SCIENCE_TOPICS },
    { subject: 'hisgeo', topics: HISGEO_TOPICS },
    { subject: 'computing', topics: COMPUTING_TOPICS },
];

describe('primary curriculum topic map', () => {
    it('maps every active grade 1-5 generator topic exactly once', () => {
        const expectedTopics = topicSets.flatMap(({ subject, topics }) =>
            topics.map((topic) => `${subject}:${topic.key}`),
        );
        const mappedTopics = PRIMARY_CURRICULUM_TOPIC_MAP.map((item) => `${item.subject}:${item.topicKey}`);

        expect(PRIMARY_CURRICULUM_TOPIC_MAP).toHaveLength(expectedTopics.length);
        expect(new Set(mappedTopics).size).toBe(mappedTopics.length);
        expect(mappedTopics.sort()).toEqual(expectedTopics.sort());

        topicSets.forEach(({ subject, topics }) => {
            topics.forEach((topic) => {
                const mapping = getPrimaryCurriculumTopicMap(subject, topic.key);
                expect(mapping, `${subject}:${topic.key} missing curriculum map`).toBeTruthy();
                expect(mapping?.grade).toBe(topic.gradeLevel);
            });
        });
    });

    it('keeps every map implementation-ready but guarded from overclaiming', () => {
        expect(computePrimaryCurriculumTopicMapCoverage()).toBe(100);
        expect(PRIMARY_CURRICULUM_MAP_STATS.noOverclaim).toContain('item bank');
        expect(PRIMARY_CURRICULUM_MAP_STATS.sourceVersion).toContain('2026-2027');

        PRIMARY_CURRICULUM_TOPIC_MAP.forEach((item) => {
            expect(item.status).toBe('topic_mapped_needs_item_audit');
            expect(item.officialStrand.length).toBeGreaterThan(5);
            expect(item.expectedOutcome.length).toBeGreaterThan(40);
            expect(item.parentExplanation.length).toBeGreaterThan(60);
            expect(item.exampleTask.length).toBeGreaterThan(40);
            expect(item.evidenceToStore.length).toBeGreaterThanOrEqual(4);
            expect(item.misconceptionWatch.length).toBeGreaterThanOrEqual(2);
            expect(item.releaseGate.length).toBeGreaterThan(60);
            expect(item.sourceIds).toContain('moet-ctgdpt-2018');
        });
    });

    it('covers every grade from 1 to 5 with clear subject distribution', () => {
        const grades = new Set(PRIMARY_CURRICULUM_TOPIC_MAP.map((item) => item.grade));
        const subjects = new Set(PRIMARY_CURRICULUM_TOPIC_MAP.map((item) => item.subject));

        expect([...grades].sort()).toEqual([1, 2, 3, 4, 5]);
        expect(subjects).toEqual(new Set(PRIMARY_CURRICULUM_MAP_STATS.subjectCoverage));

        [1, 2, 3, 4, 5].forEach((grade) => {
            expect(PRIMARY_CURRICULUM_TOPIC_MAP.filter((item) => item.grade === grade).length).toBeGreaterThanOrEqual(5);
        });
    });
});
