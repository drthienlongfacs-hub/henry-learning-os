import { describe, expect, it } from 'vitest';

import {
  INTERNATIONAL_COVERAGE_SUMMARIES,
  VERIFIED_UNIT_BENCHMARKS,
  getFrameworkCoverageSummary,
  getUnitCoverageAudit,
} from '@/data/international-curriculum-coverage';
import {
  FRAMEWORK_SOURCE_PLANS,
  LEARNING_SCIENCE_SOURCES,
  PUBLIC_DOMAIN_TEXT_SOURCES,
} from '@/data/international-curriculum-source-registry';
import { CAMBRIDGE_UNITS } from '@/data/english-international';

describe('international curriculum coverage evidence gate', () => {
  it('does not treat imported topic counts as 100% textbook coverage', () => {
    const summaries = Object.values(INTERNATIONAL_COVERAGE_SUMMARIES);

    expect(summaries).toHaveLength(6);
    expect(summaries.every(summary => summary.statusLabelVi !== 'Đã benchmark đủ')).toBe(true);
    expect(summaries.reduce((sum, summary) => sum + summary.totalUnits, 0)).toBe(205);
    expect(summaries.reduce((sum, summary) => sum + summary.benchmarkedUnits, 0)).toBe(1);
  });

  it('marks only Cambridge G1 Unit 3 as benchmarked against a resolved source manifest', () => {
    const cambridge = getFrameworkCoverageSummary('cambridge');
    const unit = CAMBRIDGE_UNITS.find(item => item.unitId === 'cam_g1_u03');

    expect(VERIFIED_UNIT_BENCHMARKS.cam_g1_u03.expectedSections).toEqual([
      '3.1 Rhyme time',
      '3.2 Number rhyme time',
      '3.3 Funny rhymes',
      '3.4 Silly rhymes',
      '3.5 A rhyme that tells a story',
      '3.6 Changing a rhyme',
      '3.7 Unit 3 Review',
    ]);
    expect(unit).toBeDefined();
    expect(unit ? getUnitCoverageAudit(unit).status : null).toBe('benchmarked');
    expect(cambridge.benchmarkedUnits).toBe(1);
    expect(cambridge.totalUnits).toBe(45);
  });

  it('requires every framework to declare official, permitted-source, and learning-science inputs', () => {
    const plans = Object.values(FRAMEWORK_SOURCE_PLANS);

    expect(plans).toHaveLength(6);
    expect(PUBLIC_DOMAIN_TEXT_SOURCES.length).toBeGreaterThanOrEqual(3);
    expect(LEARNING_SCIENCE_SOURCES.length).toBeGreaterThanOrEqual(4);
    expect(plans.every(plan => plan.benchmarkSources.length >= 1)).toBe(true);
    expect(plans.every(plan => plan.textSources.length >= 1)).toBe(true);
    expect(plans.every(plan => plan.practiceSources.length >= 1)).toBe(true);
    expect(plans.every(plan => plan.completionRule.includes('manifest'))).toBe(true);
  });
});
