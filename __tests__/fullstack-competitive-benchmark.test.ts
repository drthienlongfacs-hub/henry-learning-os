import { describe, expect, it } from 'vitest';
import {
    BENCHMARK_PAGE_NAV,
    FULLSTACK_BENCHMARK_DIMENSIONS,
    FULLSTACK_BENCHMARK_ROADMAP,
    FULLSTACK_BENCHMARK_SOURCES,
    FULLSTACK_100_GATES,
    HENRY_FULLSTACK_BENCHMARK,
    LIVE_UPGRADE_SIGNALS,
    PRIMARY_CURRICULUM_EXPLANATION_EXAMPLES,
    PRIMARY_SCHOOL_CURRICULUM_SCOPE,
    VIETNAM_CURRICULUM_BENCHMARK,
    VIETNAM_CURRICULUM_BENCHMARK_CHECKS,
    VIETNAM_CURRICULUM_SUBJECT_COVERAGE,
    computePrimarySchoolScopeCoverage,
    computeVietnamCurriculumBenchmarkCoverage,
    computeWeightedBenchmarkScore,
} from '@/data/fullstack-competitive-benchmark';
import { PRIMARY_ITEM_AUDIT_GATE } from '@/lib/curriculum/item-audit';

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
        expect(efficacy?.henryScore10).toBeLessThanOrEqual(4);
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
        expect(FULLSTACK_BENCHMARK_ROADMAP[0].title).toContain('Playwright');
        expect(FULLSTACK_BENCHMARK_ROADMAP.every((item) => item.measurableGate.length > 30)).toBe(true);
    });

    it('surfaces the latest live upgrade above the fold', () => {
        expect(LIVE_UPGRADE_SIGNALS).toHaveLength(7);
        expect(LIVE_UPGRADE_SIGNALS.map((signal) => signal.value)).toContain('66/100');
        expect(LIVE_UPGRADE_SIGNALS.map((signal) => signal.value)).toContain('94/100 P0');
        expect(LIVE_UPGRADE_SIGNALS.map((signal) => signal.value)).toContain('47/47 topic');
        expect(LIVE_UPGRADE_SIGNALS.map((signal) => signal.value)).toContain('47 item');
        expect(LIVE_UPGRADE_SIGNALS.map((signal) => signal.value)).toContain('12 item');
        expect(LIVE_UPGRADE_SIGNALS.map((signal) => signal.value)).toContain('100% traceable');
        expect(LIVE_UPGRADE_SIGNALS.some((signal) => signal.detail.includes('review queue'))).toBe(true);

        expect(BENCHMARK_PAGE_NAV.map((item) => item.href)).toEqual([
            '#live-upgrade',
            '#path-to-100',
            '#vietnam-curriculum',
            '#primary-scope',
            '#topic-map',
            '#item-audit',
            '#scorecard',
            '#sources',
        ]);
    });

    it('explains why full-stack score cannot honestly jump to 100 yet', () => {
        const statuses = new Set(FULLSTACK_100_GATES.map((gate) => gate.status));

        expect(HENRY_FULLSTACK_BENCHMARK.overallScore100).toBe(66);
        expect(PRIMARY_ITEM_AUDIT_GATE.generatedItemTraceabilityCoverage100).toBe(100);
        expect(statuses.has('passed')).toBe(true);
        expect(statuses.has('partial')).toBe(true);
        expect(statuses.has('blocked')).toBe(true);
        expect(FULLSTACK_100_GATES.find((gate) => gate.key === 'pilot-outcome')?.currentEvidence).toContain('Chưa có người học thật');
    });

    it('benchmarks Vietnam curriculum 2026-2027 at 100 percent source coverage without overclaiming product coverage', () => {
        expect(computeVietnamCurriculumBenchmarkCoverage()).toBe(100);
        expect(VIETNAM_CURRICULUM_BENCHMARK.coverage100).toBe(100);
        expect(computePrimarySchoolScopeCoverage()).toBe(100);
        expect(VIETNAM_CURRICULUM_BENCHMARK.primarySchoolScopeCoverage100).toBe(100);
        expect(HENRY_FULLSTACK_BENCHMARK.vietnamCurriculumBenchmarkCoverage100).toBe(100);
        expect(HENRY_FULLSTACK_BENCHMARK.primarySchoolScopeCoverage100).toBe(100);
        expect(VIETNAM_CURRICULUM_BENCHMARK.schoolYear).toBe('2026-2027');
        expect(VIETNAM_CURRICULUM_BENCHMARK.scope).toContain('không đồng nghĩa item bank đã phủ 100%');
        expect(VIETNAM_CURRICULUM_BENCHMARK.noOverclaimGuardrail).toContain('từng item');
    });

    it('anchors the Vietnam curriculum benchmark to official Ministry sources and every active subject', () => {
        const sourcesById = new Map(FULLSTACK_BENCHMARK_SOURCES.map((source) => [source.id, source]));
        const officialCurriculumSourceIds = [
            'moet-ctgdpt-2018',
            'moet-tt17-2025',
            'moet-sgk-2026-2027',
            'moet-primary-scope-2018',
        ];

        officialCurriculumSourceIds.forEach((sourceId) => {
            expect(sourcesById.get(sourceId)?.kind).toBe('official_curriculum');
            expect(sourcesById.get(sourceId)?.url).toMatch(/^https:\/\/(www\.)?moet\.gov\.vn\//);
        });

        VIETNAM_CURRICULUM_BENCHMARK_CHECKS.forEach((check) => {
            expect(check.status).toBe('covered');
            expect(check.evidence.length).toBeGreaterThanOrEqual(2);
            expect(check.verificationGate.length).toBeGreaterThan(40);
            check.sourceIds.forEach((sourceId) => expect(sourcesById.has(sourceId)).toBe(true));
        });

        expect(VIETNAM_CURRICULUM_SUBJECT_COVERAGE.map((subject) => subject.subject)).toEqual([
            'Toán',
            'Tiếng Việt',
            'Tiếng Anh',
            'Khoa học / Tự nhiên và Xã hội',
            'Lịch sử và Địa lý',
            'Tin học và Công nghệ',
        ]);
        VIETNAM_CURRICULUM_SUBJECT_COVERAGE.forEach((subject) => {
            expect(subject.status).toBe('source_mapped');
            expect(subject.nextGate).toMatch(/Map|audit/);
            subject.sourceIds.forEach((sourceId) => expect(sourcesById.get(sourceId)?.kind).toBe('official_curriculum'));
        });
    });

    it('keeps primary school benchmark scope complete and explicit for every official subject group', () => {
        const labels = PRIMARY_SCHOOL_CURRICULUM_SCOPE.map((item) => item.label);

        expect(VIETNAM_CURRICULUM_BENCHMARK.primaryOfficialScopeCount).toBe(13);
        expect(VIETNAM_CURRICULUM_BENCHMARK.primaryMandatoryCount).toBe(11);
        expect(VIETNAM_CURRICULUM_BENCHMARK.primaryOptionalCount).toBe(2);
        expect(labels).toEqual([
            'Tiếng Việt',
            'Toán',
            'Đạo đức',
            'Ngoại ngữ 1',
            'Tự nhiên và Xã hội',
            'Lịch sử và Địa lý',
            'Khoa học',
            'Tin học và Công nghệ',
            'Giáo dục thể chất',
            'Nghệ thuật',
            'Hoạt động trải nghiệm',
            'Tiếng dân tộc thiểu số',
            'Ngoại ngữ 1 lớp 1-2',
        ]);

        PRIMARY_SCHOOL_CURRICULUM_SCOPE.forEach((item) => {
            expect(item.sourceIds.length).toBeGreaterThan(0);
            expect(item.plainLanguage.length).toBeGreaterThan(50);
            expect(item.verificationGate.length).toBeGreaterThan(60);
        });
    });

    it('adds parent-friendly primary school examples across grades 1 to 5', () => {
        const grades = new Set(PRIMARY_CURRICULUM_EXPLANATION_EXAMPLES.map((example) => example.grade));

        expect([...grades].sort()).toEqual([1, 2, 3, 4, 5]);
        expect(PRIMARY_CURRICULUM_EXPLANATION_EXAMPLES.length).toBeGreaterThanOrEqual(10);
        PRIMARY_CURRICULUM_EXPLANATION_EXAMPLES.forEach((example) => {
            expect(example.childFriendlyExplanation.length).toBeGreaterThan(70);
            expect(example.exampleTask.length).toBeGreaterThan(70);
            expect(example.evidenceToStore.length).toBeGreaterThan(40);
            expect(example.sourceIds.length).toBeGreaterThan(0);
        });
    });
});
