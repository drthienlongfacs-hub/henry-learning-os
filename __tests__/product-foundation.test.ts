import { describe, expect, it } from 'vitest';
import {
    PRODUCT_FOUNDATION_CLAIM_GATES,
    PRODUCT_FOUNDATION_FEATURE_COVERAGE,
    PRODUCT_FOUNDATION_LAYERS,
    PRODUCT_FOUNDATION_POSITIONING,
    PRODUCT_FOUNDATION_QUALITY_AXES,
    PRODUCT_FOUNDATION_REQUIREMENTS,
    PRODUCT_FOUNDATION_SOURCE_REGISTRY,
    computeFoundationMustHaveCoverage100,
    computeFoundationP0Readiness100,
    computeFoundationRequirementCoverage,
    foundationSourceLookup,
    getFoundationSourcesByIds,
} from '@/data/product-foundation';

function expectResolvableSourceIds(sourceIds: string[]) {
    sourceIds.forEach((sourceId) => {
        expect(foundationSourceLookup[sourceId], sourceId).toBeDefined();
    });
}

describe('product foundation', () => {
    it('defines a precise product category and non-goals', () => {
        expect(PRODUCT_FOUNDATION_POSITIONING.productName).toBe('Henry Learning OS');
        expect(PRODUCT_FOUNDATION_POSITIONING.category).toBe('Family-first Learning Evidence OS');
        expect(PRODUCT_FOUNDATION_POSITIONING.oneLine).toContain('không dùng AI để làm hộ');
        expect(PRODUCT_FOUNDATION_POSITIONING.notThis).toHaveLength(5);
        expect(PRODUCT_FOUNDATION_POSITIONING.notThis.join(' ')).toContain('chatbot tự do');
        expect(PRODUCT_FOUNDATION_POSITIONING.successDefinition).toContain('evidence gate');
    });

    it('anchors the foundation to local blueprints, repo handoff, and professional standards', () => {
        const sourceIds = new Set(PRODUCT_FOUNDATION_SOURCE_REGISTRY.map((source) => source.id));

        [
            'docx-master-blueprint',
            'zip-dev-handoff',
            'repo-prd',
            'repo-architecture',
            'moet-ctgdpt-2018',
            'iso-25010',
            'nist-ai-rmf',
            'wcag-22',
            'wwc-standards',
            'unicef-ai-children',
        ].forEach((sourceId) => expect(sourceIds.has(sourceId)).toBe(true));

        PRODUCT_FOUNDATION_SOURCE_REGISTRY.forEach((source) => {
            expect(source.foundationUse.length).toBeGreaterThan(40);
            if (source.locatorKind === 'official_url' || source.locatorKind === 'benchmark_url') {
                expect(source.locator).toMatch(/^https:\/\//);
            }
            if (source.locatorKind === 'local_file') {
                expect(source.locator).toMatch(/^\/Users\/mac\//);
            }
            if (source.locatorKind === 'repo_file') {
                expect(source.locator).not.toMatch(/^https?:\/\//);
            }
        });
    });

    it('keeps every layer, requirement, gate, feature, and quality axis source-traceable', () => {
        PRODUCT_FOUNDATION_LAYERS.forEach((layer) => {
            expect(layer.nonNegotiables.length).toBeGreaterThanOrEqual(3);
            expect(layer.currentAssets.length).toBeGreaterThan(0);
            expect(layer.missingGates.length).toBeGreaterThan(0);
            expectResolvableSourceIds(layer.sourceIds);
        });

        PRODUCT_FOUNDATION_REQUIREMENTS.forEach((requirement) => {
            expect(requirement.acceptanceCriteria.length).toBeGreaterThanOrEqual(3);
            expect(requirement.currentEvidence.length).toBeGreaterThan(0);
            expect(requirement.nextGate.length).toBeGreaterThan(30);
            expectResolvableSourceIds(requirement.sourceIds);
        });

        PRODUCT_FOUNDATION_CLAIM_GATES.forEach((gate) => {
            expect(gate.allowedClaim.length).toBeGreaterThan(30);
            expect(gate.blockedClaim.length).toBeGreaterThan(30);
            expect(gate.requiredEvidence.length).toBeGreaterThan(30);
            expectResolvableSourceIds(gate.sourceIds);
        });

        PRODUCT_FOUNDATION_FEATURE_COVERAGE.forEach((feature) => {
            expect(feature.userValue.length).toBeGreaterThan(30);
            expect(feature.currentSurface.length).toBeGreaterThan(20);
            expect(feature.requiredForMaturity.length).toBeGreaterThan(30);
            expectResolvableSourceIds(feature.sourceIds);
        });

        PRODUCT_FOUNDATION_QUALITY_AXES.forEach((axis) => {
            expect(axis.benchmarkFrame.length).toBeGreaterThan(5);
            expect(axis.measurableGate.length).toBeGreaterThan(30);
            expectResolvableSourceIds(axis.sourceIds);
        });
    });

    it('calculates foundation maturity without pretending the product is finished', () => {
        expect(PRODUCT_FOUNDATION_REQUIREMENTS.filter((requirement) => requirement.priority === 'P0')).toHaveLength(8);
        expect(computeFoundationP0Readiness100()).toBe(75);
        expect(PRODUCT_FOUNDATION_FEATURE_COVERAGE).toHaveLength(20);
        expect(computeFoundationMustHaveCoverage100()).toBe(75);
        expect(computeFoundationRequirementCoverage('implemented')).toBeGreaterThan(20);
        expect(computeFoundationRequirementCoverage('blocked')).toBe(0);
    });

    it('keeps the 20 must-have feature set explicit', () => {
        expect(PRODUCT_FOUNDATION_FEATURE_COVERAGE.map((feature) => feature.id)).toEqual([
            'child-profile',
            'competency-map',
            'diagnostic-test',
            'ai-socratic-tutor',
            'hint-ladder',
            'mistake-notebook',
            'mastery-checkpoint',
            'spaced-repetition',
            'retrieval-practice',
            'reading-buddy',
            'writing-coach',
            'english-roleplay',
            'math-reasoning',
            'project-builder',
            'coding-ai-literacy',
            'reflection-journal',
            'parent-dashboard',
            'daily-parent-mission',
            'portfolio-vault',
            'safety-audit-parent-control',
        ]);
    });

    it('blocks efficacy claims until real learner evidence exists', () => {
        const efficacyGate = PRODUCT_FOUNDATION_CLAIM_GATES.find((gate) => gate.id === 'efficacy');

        expect(efficacyGate?.status).toBe('blocked');
        expect(efficacyGate?.allowedClaim).toContain('Chưa claim hiệu quả học tập');
        expect(efficacyGate?.blockedClaim).toContain('Cấm claim tăng điểm');
        expect(efficacyGate?.requiredEvidence).toContain('pre-test');
        expect(efficacyGate?.requiredEvidence).toContain('retention');
    });

    it('resolves source lists by id for UI rendering', () => {
        const sources = getFoundationSourcesByIds(['iso-25010', 'wcag-22', 'missing-source']);

        expect(sources.map((source) => source.id)).toEqual(['iso-25010', 'wcag-22']);
    });
});
