import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
    ENRICHMENT_STATS,
    LEARNING_SOURCES,
    SUBJECT_ENRICHMENT,
    getTopicEnrichment,
    type LearningSubjectKey,
} from '@/data/curriculum-enrichment';
import {
    LEARNING_SYSTEM_STATS,
    TOPIC_LEARNING_BLUEPRINTS,
    getTopicLearningBlueprint,
} from '@/data/learning-benchmark-system';
import { MATH_TOPICS } from '@/lib/content/math-generator';
import { VIETNAMESE_TOPICS } from '@/lib/content/vietnamese-generator';
import { ENGLISH_TOPICS } from '@/lib/content/english-generator';
import { SCIENCE_TOPICS } from '@/lib/content/science-generator';
import { HISGEO_TOPICS } from '@/lib/content/history-geo-generator';
import { COMPUTING_TOPICS } from '@/lib/content/computing-generator';

const topicSets: { subject: LearningSubjectKey; topics: { key: string }[] }[] = [
    { subject: 'math', topics: MATH_TOPICS },
    { subject: 'vietnamese', topics: VIETNAMESE_TOPICS },
    { subject: 'english', topics: ENGLISH_TOPICS },
    { subject: 'science', topics: SCIENCE_TOPICS },
    { subject: 'hisgeo', topics: HISGEO_TOPICS },
    { subject: 'computing', topics: COMPUTING_TOPICS },
];

const allTopics = topicSets.flatMap(({ topics }) => topics);

describe('Curriculum enrichment layer', () => {
    it('has enough benchmark and source coverage to be a real learning layer', () => {
        expect(ENRICHMENT_STATS.sourceCount).toBeGreaterThanOrEqual(20);
        expect(ENRICHMENT_STATS.subjectCount).toBeGreaterThanOrEqual(6);
        expect(ENRICHMENT_STATS.explicitTopicOverrides).toBeGreaterThanOrEqual(10);
        expect(LEARNING_SYSTEM_STATS.explicitTopicBlueprints).toBeGreaterThanOrEqual(allTopics.length);
        expect(LEARNING_SYSTEM_STATS.goldStandardLinks).toBeGreaterThanOrEqual(18);
        expect(LEARNING_SYSTEM_STATS.benchmarkLinks).toBeGreaterThanOrEqual(18);
    });

    it('references only known sources from subject packs', () => {
        Object.values(SUBJECT_ENRICHMENT).forEach((pack) => {
            expect(pack.sourceIds.length).toBeGreaterThan(0);
            pack.sourceIds.forEach((sourceId) => {
                expect(LEARNING_SOURCES[sourceId]).toBeTruthy();
                expect(LEARNING_SOURCES[sourceId].sourceUrl).toMatch(/^https:\/\//);
            });
        });
    });

    it('wraps every generator topic with targets, support ladder, benchmarks, and image assets', () => {
        topicSets.forEach(({ subject, topics }) => {
            topics.forEach((topic) => {
                const enrichment = getTopicEnrichment(topic.key, subject);
                expect(enrichment.topicKey).toBe(topic.key);
                expect(enrichment.masteryTargets.length).toBeGreaterThanOrEqual(3);
                expect(enrichment.supportLadder).toHaveLength(6);
                expect(enrichment.benchmarkTags.length).toBeGreaterThan(0);
                expect(enrichment.sourceIds.length).toBeGreaterThan(0);
                enrichment.sourceIds.forEach((sourceId) => expect(LEARNING_SOURCES[sourceId]).toBeTruthy());

                expect(enrichment.visual.src).toMatch(/^\/images\//);
                const imagePath = resolve(process.cwd(), 'public', enrichment.visual.src.replace(/^\//, ''));
                expect(existsSync(imagePath), `${topic.key} missing ${enrichment.visual.src}`).toBe(true);
            });
        });
    });

    it('maps every generator topic to explicit gold standards and product benchmarks', () => {
        topicSets.forEach(({ subject, topics }) => {
            topics.forEach((topic) => {
                expect(TOPIC_LEARNING_BLUEPRINTS[topic.key], `${topic.key} must be explicitly blueprinted`).toBeTruthy();

                const blueprint = getTopicLearningBlueprint(topic.key, subject);
                expect(blueprint.subject).toBe(subject);
                expect(blueprint.bigIdea.length).toBeGreaterThan(20);
                expect(blueprint.matureLearnerFrame.length).toBeGreaterThan(20);
                expect(blueprint.goldStandards.length).toBeGreaterThanOrEqual(2);
                expect(blueprint.benchmarkPatterns.length).toBeGreaterThanOrEqual(2);
                expect(blueprint.practiceDesign.length).toBeGreaterThanOrEqual(3);
                expect(blueprint.studyRoutine.length).toBeGreaterThanOrEqual(4);
                expect(blueprint.stretchTask.length).toBeGreaterThan(20);
                expect(blueprint.evidenceOfMastery.length).toBeGreaterThanOrEqual(3);

                blueprint.goldStandards.forEach((standard) => {
                    expect(LEARNING_SOURCES[standard.sourceId], `${topic.key} unknown standard ${standard.sourceId}`).toBeTruthy();
                });
                blueprint.benchmarkPatterns.forEach((benchmark) => {
                    expect(LEARNING_SOURCES[benchmark.sourceId], `${topic.key} unknown benchmark ${benchmark.sourceId}`).toBeTruthy();
                });
            });
        });
    });
});
