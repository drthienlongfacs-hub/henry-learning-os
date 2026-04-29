import { describe, expect, it } from 'vitest';
import {
    FULLSTACK_BENCHMARK_DIMENSIONS,
    FULLSTACK_BENCHMARK_ROADMAP,
    FULLSTACK_BENCHMARK_SOURCES,
    HENRY_FULLSTACK_BENCHMARK,
    computeWeightedBenchmarkScore,
} from '@/data/fullstack-competitive-benchmark';

describe('full-stack competitive benchmark', () => {
    it('uses a complete weighted scorecard', () => {
        const totalWeight = FULLSTACK_BENCHMARK_DIMENSIONS.reduce((sum, dimension) => sum + dimension.weightPct, 0);

        expect(totalWeight).toBe(100);
        expect(HENRY_FULLSTACK_BENCHMARK.overallScore10).toBe(computeWeightedBenchmarkScore());
        expect(HENRY_FULLSTACK_BENCHMARK.overallScore100).toBe(Math.round(computeWeightedBenchmarkScore() * 10));
    });

    it('does not turn internal product readiness into efficacy claims', () => {
        const efficacy = FULLSTACK_BENCHMARK_DIMENSIONS.find((dimension) => dimension.key === 'evidenceAndOutcomeTracking');

        expect(efficacy).toBeDefined();
        expect(efficacy?.henryScore10).toBeLessThanOrEqual(3.5);
        expect(efficacy?.gap).toContain('chưa có pre/post');
        expect(efficacy?.evidenceNeededBeforeEfficacyClaim).toContain('dữ liệu người học thật');
        expect(HENRY_FULLSTACK_BENCHMARK.noClaimGuardrail).toContain('Không claim');
    });

    it('keeps every benchmark dimension traceable to evidence sources and next gates', () => {
        const sourceIds = new Set(FULLSTACK_BENCHMARK_SOURCES.map((source) => source.id));

        expect(FULLSTACK_BENCHMARK_DIMENSIONS.length).toBeGreaterThanOrEqual(8);
        for (const dimension of FULLSTACK_BENCHMARK_DIMENSIONS) {
            expect(dimension.currentHenryEvidence.length).toBeGreaterThan(0);
            expect(dimension.gap.length).toBeGreaterThan(20);
            expect(dimension.nextUpgrade.length).toBeGreaterThan(20);
            expect(dimension.sourceIds.length).toBeGreaterThan(0);
            for (const sourceId of dimension.sourceIds) {
                expect(sourceIds.has(sourceId)).toBe(true);
            }
        }
    });

    it('uses real source URLs and a measurable roadmap', () => {
        expect(FULLSTACK_BENCHMARK_SOURCES.length).toBeGreaterThanOrEqual(8);
        expect(FULLSTACK_BENCHMARK_SOURCES.every((source) => source.url.startsWith('https://'))).toBe(true);
        expect(FULLSTACK_BENCHMARK_ROADMAP[0].title).toContain('Pilot evidence');
        expect(FULLSTACK_BENCHMARK_ROADMAP.every((item) => item.measurableGate.length > 30)).toBe(true);
    });
});
