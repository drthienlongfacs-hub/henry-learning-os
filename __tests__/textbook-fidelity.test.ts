import { describe, expect, it } from 'vitest';
import {
    TEXTBOOK_FIDELITY_ROWS,
    TEXTBOOK_FIDELITY_STATS,
    TEXTBOOK_REPLACEMENT_POLICY,
    getSubjectTextbookFidelitySummary,
} from '@/data/textbook-fidelity';
import { SGK_CATALOG } from '@/data/sgk-catalog';

describe('textbook fidelity gate', () => {
    it('tracks every SGK grade-subject row without claiming replacement readiness', () => {
        const expectedRows = new Set(SGK_CATALOG.map((book) => `${book.grade}:${book.subject}`));
        const actualRows = new Set(TEXTBOOK_FIDELITY_ROWS.map((row) => `${row.grade}:${row.sgkSubject}`));

        expect(actualRows).toEqual(expectedRows);
        expect(TEXTBOOK_FIDELITY_STATS.sgkCatalogRecords).toBe(SGK_CATALOG.length);
        expect(TEXTBOOK_FIDELITY_STATS.noOverclaim).toContain('Chua duoc goi 100%');
        expect(TEXTBOOK_REPLACEMENT_POLICY.claim).toBe('not_100_percent_textbook_replacement_yet');

        TEXTBOOK_FIDELITY_ROWS.forEach((row) => {
            expect(row.bookCount).toBeGreaterThan(0);
            expect(row.canClaimTextbookReplacement).toBe(false);
            if (row.appSubject) {
                expect(row.assetGate).toBe('licensed_private_import_required');
                expect(row.nextAction).toContain('PDF/EPUB/anh SGK co quyen');
            }
        });
    });

    it('keeps missing official school subjects visible instead of hiding them', () => {
        expect(TEXTBOOK_FIDELITY_STATS.notInLearnLabels).toEqual(
            expect.arrayContaining(['Hoạt động trải nghiệm', 'Giáo dục thể chất']),
        );
        expect(TEXTBOOK_FIDELITY_STATS.rowsNotInLearnYet).toBeGreaterThan(0);
    });

    it('shows English grades 1 and 2 as interactive companion coverage, not official textbook reproduction', () => {
        const grade1 = getSubjectTextbookFidelitySummary('english', 1);
        const grade2 = getSubjectTextbookFidelitySummary('english', 2);

        expect(grade1.bookCount).toBeGreaterThan(0);
        expect(grade2.bookCount).toBeGreaterThan(0);
        expect(grade1.interactiveTopicCount).toBeGreaterThan(0);
        expect(grade2.interactiveTopicCount).toBeGreaterThan(0);
        expect(grade1.privateImportRequired).toBe(true);
        expect(grade2.replacementLabel).toContain('can file/anh SGK co quyen');
    });
});
