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
import { getAllInternationalUnits, getGeneratedUnitManifest } from '@/data/international-unit-manifests';
import { ENGLISH_TOPICS } from '@/lib/content/english-generator';

describe('international curriculum coverage evidence gate', () => {
  it('requires every country unit to have source manifest coverage before 100% is displayed', () => {
    const summaries = Object.values(INTERNATIONAL_COVERAGE_SUMMARIES);

    expect(summaries).toHaveLength(6);
    expect(summaries.every(summary => summary.statusLabelVi === 'Đã benchmark đủ')).toBe(true);
    expect(summaries.reduce((sum, summary) => sum + summary.totalUnits, 0)).toBe(205);
    expect(summaries.reduce((sum, summary) => sum + summary.benchmarkedUnits, 0)).toBe(205);
    expect(getAllInternationalUnits()).toHaveLength(205);
  });

  it('keeps Cambridge G1 Unit 3 exact benchmark while manifesting the full Cambridge lane', () => {
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
    expect(cambridge.benchmarkedUnits).toBe(45);
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

  it('generates a seven-section lesson manifest and sixteen assessment items for every country unit', () => {
    const manifests = getAllInternationalUnits().map(unit => getGeneratedUnitManifest(unit.unitId));

    expect(manifests.every(Boolean)).toBe(true);
    expect(manifests.every(manifest => manifest && manifest.sections.length >= 7)).toBe(true);
    expect(manifests.every(manifest => manifest && manifest.assessmentItems.length >= 16)).toBe(true);
    expect(manifests.every(manifest => manifest && manifest.sourceIds.length >= 3)).toBe(true);
    expect(manifests.every(manifest => manifest && manifest.completionEvidence.includes('retrieval-spaced-transfer-learning-routine'))).toBe(true);
  });

  it('surfaces manifest-backed country units directly in the Learn route topic list', () => {
    const cambridgeG2Unit = ENGLISH_TOPICS.find(topic => topic.key === 'cam_g2_u01');
    const cambridgeG5Unit = ENGLISH_TOPICS.find(topic => topic.key === 'cam_g5_u09');

    expect(cambridgeG2Unit).toMatchObject({
      gradeLevel: 2,
      isIntl: true,
      framework: 'cambridge',
      category: 'unit',
    });
    expect(cambridgeG2Unit?.name).toContain('Stories about things we know');
    expect(cambridgeG5Unit).toMatchObject({
      gradeLevel: 5,
      isIntl: true,
      framework: 'cambridge',
      category: 'unit',
    });
  });
});
