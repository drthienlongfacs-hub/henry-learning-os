import {
  AUSTRALIAN_UNITS,
  CAMBRIDGE_UNITS,
  CANADIAN_UNITS,
  FINNISH_UNITS,
  SINGAPORE_UNITS,
  US_WONDERS_UNITS,
  type CountryUnit,
} from './english-international';
import { AUTHENTIC_PASSAGES, AUTHENTIC_UNIT_SECTIONS } from './intl-curriculum-passages';
import { getGeneratedUnitManifest } from './international-unit-manifests';

export type InternationalFrameworkKey =
  | 'cambridge'
  | 'common_core'
  | 'australian'
  | 'finnish'
  | 'singapore'
  | 'canadian';

export type UnitCoverageStatus =
  | 'benchmarked'
  | 'source_manifest_complete'
  | 'benchmark_mismatch'
  | 'multi_section_unverified'
  | 'single_passage_unverified'
  | 'missing_content';

export interface VerifiedUnitBenchmark {
  unitId: string;
  sourceEvidence: string;
  expectedSections: string[];
}

export interface UnitCoverageAudit {
  unitId: string;
  grade: number;
  unitNumber: number;
  title: string;
  sectionCount: number;
  hasSinglePassage: boolean;
  status: UnitCoverageStatus;
  sourceEvidence?: string;
  sourceIds?: string[];
  assessmentItemCount?: number;
}

export interface FrameworkCoverageSummary {
  framework: InternationalFrameworkKey;
  totalUnits: number;
  benchmarkedUnits: number;
  benchmarkMismatches: number;
  multiSectionUnverifiedUnits: number;
  singlePassageUnverifiedUnits: number;
  missingContentUnits: number;
  statusLabelVi: string;
  statusDetailVi: string;
  units: UnitCoverageAudit[];
}

export const FRAMEWORK_UNIT_MAP: Record<InternationalFrameworkKey, CountryUnit[]> = {
  cambridge: CAMBRIDGE_UNITS,
  common_core: US_WONDERS_UNITS,
  australian: AUSTRALIAN_UNITS,
  finnish: FINNISH_UNITS,
  singapore: SINGAPORE_UNITS,
  canadian: CANADIAN_UNITS,
};

export const VERIFIED_UNIT_BENCHMARKS: Record<string, VerifiedUnitBenchmark> = {
  cam_g1_u03: {
    unitId: 'cam_g1_u03',
    sourceEvidence: 'cam_g1_u03_benchmark_report.md.resolved',
    expectedSections: [
      '3.1 Rhyme time',
      '3.2 Number rhyme time',
      '3.3 Funny rhymes',
      '3.4 Silly rhymes',
      '3.5 A rhyme that tells a story',
      '3.6 Changing a rhyme',
      '3.7 Unit 3 Review',
    ],
  },
};

function getUnitSectionTitles(unitId: string): string[] {
  return (AUTHENTIC_UNIT_SECTIONS[unitId] ?? []).map(section => section.sectionTitle);
}

function arraysMatch(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

export function getUnitCoverageAudit(unit: CountryUnit): UnitCoverageAudit {
  const sectionTitles = getUnitSectionTitles(unit.unitId);
  const benchmark = VERIFIED_UNIT_BENCHMARKS[unit.unitId];
  const manifest = getGeneratedUnitManifest(unit.unitId);
  const hasSinglePassage = Boolean(AUTHENTIC_PASSAGES[unit.unitId]);
  let status: UnitCoverageStatus;

  if (benchmark) {
    status = arraysMatch(sectionTitles, benchmark.expectedSections) ? 'benchmarked' : 'benchmark_mismatch';
  } else if (manifest && manifest.sections.length >= 7 && manifest.assessmentItems.length >= 16) {
    status = 'source_manifest_complete';
  } else if (sectionTitles.length > 1) {
    status = 'multi_section_unverified';
  } else if (hasSinglePassage) {
    status = 'single_passage_unverified';
  } else {
    status = 'missing_content';
  }

  return {
    unitId: unit.unitId,
    grade: unit.grade,
    unitNumber: unit.unitNumber,
    title: unit.title,
    sectionCount: sectionTitles.length || manifest?.sections.length || (hasSinglePassage ? 1 : 0),
    hasSinglePassage,
    status,
    sourceEvidence: benchmark?.sourceEvidence ?? (manifest ? `${manifest.framework}-source-manifest` : undefined),
    sourceIds: manifest?.sourceIds,
    assessmentItemCount: manifest?.assessmentItems.length,
  };
}

export function getFrameworkCoverageSummary(framework: InternationalFrameworkKey): FrameworkCoverageSummary {
  const units = FRAMEWORK_UNIT_MAP[framework].map(getUnitCoverageAudit);
  const benchmarkedUnits = units.filter(unit => unit.status === 'benchmarked' || unit.status === 'source_manifest_complete').length;
  const benchmarkMismatches = units.filter(unit => unit.status === 'benchmark_mismatch').length;
  const multiSectionUnverifiedUnits = units.filter(unit => unit.status === 'multi_section_unverified').length;
  const singlePassageUnverifiedUnits = units.filter(unit => unit.status === 'single_passage_unverified').length;
  const missingContentUnits = units.filter(unit => unit.status === 'missing_content').length;
  const isFullyBenchmarked = benchmarkedUnits === units.length && benchmarkMismatches === 0;

  return {
    framework,
    totalUnits: units.length,
    benchmarkedUnits,
    benchmarkMismatches,
    multiSectionUnverifiedUnits,
    singlePassageUnverifiedUnits,
    missingContentUnits,
    statusLabelVi: isFullyBenchmarked ? 'Đã benchmark đủ' : 'Chưa được gọi đầy đủ 100%',
    statusDetailVi: isFullyBenchmarked
      ? 'Mỗi unit có manifest nguồn, chuỗi học 7 phần và bank lượng giá tối thiểu 16 câu.'
      : 'Cần manifest nguồn cho từng unit/bài trước khi claim match 100% giáo trình gốc.',
    units,
  };
}

export const INTERNATIONAL_COVERAGE_SUMMARIES: Record<InternationalFrameworkKey, FrameworkCoverageSummary> = {
  cambridge: getFrameworkCoverageSummary('cambridge'),
  common_core: getFrameworkCoverageSummary('common_core'),
  australian: getFrameworkCoverageSummary('australian'),
  finnish: getFrameworkCoverageSummary('finnish'),
  singapore: getFrameworkCoverageSummary('singapore'),
  canadian: getFrameworkCoverageSummary('canadian'),
};
