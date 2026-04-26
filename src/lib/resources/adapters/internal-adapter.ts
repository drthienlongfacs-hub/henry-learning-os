// ========================================
// Internal Resource Adapter
// Wraps existing seed data as NormalizedLearningResource
// ========================================

import type {
    ExternalResourceAdapter,
    LicensePolicy,
    NormalizedLearningResource,
    ResourceQuery,
} from '@/types/resource-types';
import { runSafetyGates } from '@/lib/resources/safety-gate';

const INTERNAL_LICENSE: LicensePolicy = {
    spdxId: 'proprietary-internal',
    allowedUse: 'transform_allowed',
    requiresAttribution: false,
    commercialOk: true,
    shareAlikeRequired: false,
    notes: 'Hand-authored content owned by the family',
};

export const internalAdapter: ExternalResourceAdapter = {
    id: 'internal',
    displayName: 'Internal Content',
    resourceType: 'exercise',
    licensePolicy: INTERNAL_LICENSE,

    async fetchMetadata(query: ResourceQuery): Promise<NormalizedLearningResource[]> {
        const { competencies, lessons } = await import('@/data/seed');

        const results: NormalizedLearningResource[] = [];

        // Map competencies
        for (const comp of competencies) {
            if (query.subject && !comp.description.toLowerCase().includes(query.subject.toLowerCase())) {
                continue;
            }
            results.push({
                id: `internal-comp-${comp.id}`,
                providerId: 'internal',
                title: comp.title,
                description: comp.description,
                language: 'vi',
                ageBand: comp.ageBand ?? '6-18',
                subjectTags: [comp.domain],
                skillTags: comp.evidenceRequired ?? [],
                difficultyEstimate: 0.5,
                attribution: {
                    title: comp.title,
                    sourceName: 'Henry Learning OS',
                    sourceUrl: 'internal://seed',
                    retrievedAt: new Date().toISOString(),
                },
                safety: runSafetyGates(
                    { ageMin: 6, ageMax: 18 },
                    { childAge: 6 },
                ),
            });
        }

        // Map lessons as resources
        for (const lesson of lessons) {
            if (query.subject && lesson.subject !== query.subject) {
                continue;
            }
            results.push({
                id: `internal-lesson-${lesson.id}`,
                providerId: 'internal',
                title: lesson.title,
                description: lesson.objective,
                language: 'vi',
                ageBand: lesson.ageBand ?? '6-18',
                subjectTags: [lesson.subject],
                skillTags: lesson.rubric ?? [],
                attribution: {
                    title: lesson.title,
                    sourceName: 'Henry Learning OS',
                    sourceUrl: 'internal://seed',
                    retrievedAt: new Date().toISOString(),
                },
                safety: runSafetyGates(
                    { ageMin: 6, ageMax: 18 },
                    { childAge: 6 },
                ),
            });
        }

        return results.slice(0, query.limit ?? 20);
    },
};
