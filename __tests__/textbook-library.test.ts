import { describe, expect, it } from 'vitest';
import {
    LIBRARY_STATS,
    OFFICIAL_LIBRARY_SOURCE_PACKS,
    READER_INTEGRATION_CANDIDATES,
    TEXTBOOK_COPYRIGHT_GUARDRAIL,
    TEXTBOOK_LIBRARY,
} from '@/data/textbook-library';

describe('Textbook library governance', () => {
    it('expands the hard textbook shelf without overclaiming copyrighted full text', () => {
        expect(LIBRARY_STATS.totalBooks).toBeGreaterThanOrEqual(12);
        expect(LIBRARY_STATS.readableBooks).toBeGreaterThanOrEqual(10);
        expect(LIBRARY_STATS.sourcePackCount).toBeGreaterThanOrEqual(5);
        expect(TEXTBOOK_COPYRIGHT_GUARDRAIL.blockedClaim).toContain('full 100%');
    });

    it('keeps licensed-import textbooks free of bundled passages', () => {
        const licensedImportEntries = TEXTBOOK_LIBRARY.filter(
            book => book.licenseStatus === 'licensed_import_required',
        );

        expect(licensedImportEntries.length).toBeGreaterThanOrEqual(1);
        licensedImportEntries.forEach(book => {
            expect(book.passages).toHaveLength(0);
            expect(book.importHint).toBeTruthy();
        });
    });

    it('requires every readable passage to carry bilingual reading support', () => {
        TEXTBOOK_LIBRARY
            .filter(book => book.passages.length > 0)
            .forEach(book => {
                expect(book.licenseStatus).not.toBe('licensed_import_required');
                book.passages.forEach(passage => {
                    expect(passage.sentenceGuides.length).toBeGreaterThan(0);
                    expect(passage.support.beforeReading.length).toBeGreaterThan(0);
                    expect(passage.support.whileReading.length).toBeGreaterThan(0);
                    expect(passage.support.afterReading.length).toBeGreaterThan(0);
                    expect(passage.comprehensionChecks.length).toBeGreaterThan(0);
                    expect(passage.sourceAlignment.length).toBeGreaterThan(0);
                });
            });
    });

    it('documents source packs and reader integration candidates for implementation planning', () => {
        expect(OFFICIAL_LIBRARY_SOURCE_PACKS.map(source => source.id)).toEqual(
            expect.arrayContaining(['vn-moe-ctgdpt-2018', 'oxford-owl-free-ebooks', 'project-gutenberg']),
        );
        expect(READER_INTEGRATION_CANDIDATES.some(candidate => candidate.fit === 'adopt_now')).toBe(true);
        expect(READER_INTEGRATION_CANDIDATES.map(candidate => candidate.id)).toEqual(
            expect.arrayContaining(['epubjs', 'react-reader', 'readium-web', 'pdfjs']),
        );
    });
});
