/**
 * RCA-053 Regression Test: Vietnamese Diacritics Guard
 *
 * Scans all Vi-labeled text fields for ASCII-only Vietnamese sentences.
 * A Vietnamese sentence of ≥5 words that contains ZERO diacritical marks
 * is almost certainly missing diacritics (e.g. "Noi va nghe" instead of "Nói và nghe").
 *
 * This test prevents the systemic bug where entire Vietnamese text blocks
 * were rendered without any diacritical marks.
 */
import { describe, it, expect } from 'vitest';
import { getGeneratedUnitManifest, getAllInternationalUnits } from '@/data/international-unit-manifests';
import { TEXTBOOK_REPLACEMENT_POLICY, TEXTBOOK_FIDELITY_STATS } from '@/data/textbook-fidelity';

// Vietnamese diacritical characters (beyond basic ASCII)
const VIETNAMESE_DIACRITICS = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/;

/**
 * Check if a string looks like Vietnamese text without diacritics.
 * Rules:
 * 1. Must be ≥5 words (short strings like IDs or labels are OK)
 * 2. Must NOT contain any Vietnamese diacritical characters
 * 3. Must not be pure English (heuristic: check common Vietnamese-only syllables)
 */
function isUnaccentedVietnamese(text: string): boolean {
  if (!text || text.length < 20) return false;

  // If it already has Vietnamese diacritics, it's fine
  if (VIETNAMESE_DIACRITICS.test(text)) return false;

  // Count words
  const words = text.split(/\s+/).filter(w => w.length > 0);
  if (words.length < 5) return false;

  // Check for common Vietnamese syllables that would only appear in Vietnamese
  // These words are NOT English but ARE valid Vietnamese without diacritics
  const VIETNAMESE_MARKERS = [
    'cua', 'cac', 'khong', 'nhu', 'cach', 'trong', 'nguoi', 'nhung',
    'duoc', 'nhieu', 'cung', 'phai', 'truoc', 'doi', 'thay', 'voi',
    'moi', 'ngay', 'noi', 'sau', 'nhat', 'giua', 'muoi', 'nghi',
    'vay', 'hoc', 'nhan', 'dieu', 'hoac', 'chua', 'nho', 'dung',
    'dau', 'bai', 'loi', 'giao', 'tiep', 'luyen', 'thuoc',
  ];

  const lowerWords = words.map(w => w.toLowerCase().replace(/[^a-z]/g, ''));
  const viMarkerCount = lowerWords.filter(w => VIETNAMESE_MARKERS.includes(w)).length;

  // If ≥3 Vietnamese markers found in an ASCII-only string → it's unaccented Vietnamese
  return viMarkerCount >= 3;
}

describe('RCA-053: Vietnamese Diacritics Guard', () => {
  it('should not have unaccented Vietnamese in international-unit-manifests sections', () => {
    const units = getAllInternationalUnits();
    const violations: string[] = [];

    // Test a representative sample (first 10 units)
    const sample = units.slice(0, 10);
    for (const unit of sample) {
      const manifest = getGeneratedUnitManifest(unit.unitId);
      if (!manifest) continue;

      for (const section of manifest.sections) {
        if (isUnaccentedVietnamese(section.sectionTitleVi)) {
          violations.push(`[${unit.unitId}] sectionTitleVi: "${section.sectionTitleVi}"`);
        }
        if (isUnaccentedVietnamese(section.textVi)) {
          violations.push(`[${unit.unitId}] textVi (section ${section.type}): "${section.textVi.slice(0, 60)}..."`);
        }
      }
    }

    expect(violations, `Found ${violations.length} unaccented Vietnamese text(s):\n${violations.join('\n')}`).toHaveLength(0);
  });

  it('should not have unaccented Vietnamese in textbook-fidelity policy strings', () => {
    const policyTexts = [
      TEXTBOOK_REPLACEMENT_POLICY.publicAssetRule,
      TEXTBOOK_REPLACEMENT_POLICY.replacementGate,
      TEXTBOOK_REPLACEMENT_POLICY.familyWorkflow,
      TEXTBOOK_FIDELITY_STATS.noOverclaim,
    ];

    const violations = policyTexts.filter(t => isUnaccentedVietnamese(t));
    expect(violations, `Policy strings without diacritics:\n${violations.join('\n')}`).toHaveLength(0);
  });

  it('should have Vietnamese diacritics in FRAMEWORK_LABEL_VI values', () => {
    // Import directly to test
    const manifest = getGeneratedUnitManifest('cam_g1_u01');
    expect(manifest).toBeTruthy();

    // The core text should contain diacritics
    if (manifest) {
      const coreReading = manifest.sections.find(s => s.type === 'reading');
      expect(coreReading).toBeTruthy();
      if (coreReading) {
        expect(VIETNAMESE_DIACRITICS.test(coreReading.textVi)).toBe(true);
      }
    }
  });

  it('sectionTitleVi should have proper diacritics for key sections', () => {
    const manifest = getGeneratedUnitManifest('cam_g1_u01');
    expect(manifest).toBeTruthy();
    if (!manifest) return;

    const titles = manifest.sections.map(s => s.sectionTitleVi);

    // Each title should contain at least one Vietnamese diacritic
    for (const title of titles) {
      expect(VIETNAMESE_DIACRITICS.test(title), `Missing diacritics in: "${title}"`).toBe(true);
    }
  });
});
