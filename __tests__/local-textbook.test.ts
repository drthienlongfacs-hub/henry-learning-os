import { describe, expect, it } from 'vitest';
import {
    buildLocalTextbookReaderSupport,
    detectLocalTextbookFileType,
    formatFileSize,
    LOCAL_TEXTBOOK_MAX_FILE_SIZE_BYTES,
    lookupLocalWordHint,
    TEXTBOOK_EMBEDDING_AUDIT,
} from '@/lib/textbook/local-textbook';

describe('local textbook embedding', () => {
    it('recognizes textbook files that can be embedded directly in the app', () => {
        expect(detectLocalTextbookFileType('Global-Success-Grade-1.pdf', 'application/pdf')).toBe('pdf');
        expect(detectLocalTextbookFileType('reader.epub', 'application/epub+zip')).toBe('epub');
        expect(detectLocalTextbookFileType('ocr-text.txt', 'text/plain')).toBe('text');
        expect(detectLocalTextbookFileType('notes.md', '')).toBe('markdown');
        expect(detectLocalTextbookFileType('cover.jpg', 'image/jpeg')).toBeNull();
    });

    it('builds bilingual in-app reading support for imported OCR or text files', () => {
        const support = buildLocalTextbookReaderSupport(
            'Family English Textbook',
            'My family can read a book at home. The teacher helps children learn new words.',
        );

        expect(support.keyVocabulary.length).toBeGreaterThan(0);
        expect(support.sentenceGuides.length).toBeGreaterThan(0);
        expect(support.sentenceGuides[0].vi).toContain('Diễn giải tiếng Việt');
        expect(support.sourceAlignment).toContain('Local authorized textbook import');
        expect(support.viSummary).toContain('đã được nhúng trực tiếp');
    });

    it('keeps a local-only audit trail for copyrighted textbook files', () => {
        expect(TEXTBOOK_EMBEDDING_AUDIT.storage).toContain('IndexedDB');
        expect(TEXTBOOK_EMBEDDING_AUDIT.gates).toEqual(
            expect.arrayContaining([
                expect.stringContaining('not external links'),
                expect.stringContaining('not committed to the public repository'),
            ]),
        );
        expect(LOCAL_TEXTBOOK_MAX_FILE_SIZE_BYTES).toBeGreaterThan(50 * 1024 * 1024);
        expect(formatFileSize(1024 * 1024)).toBe('1.0 MB');
        expect(lookupLocalWordHint('teacher')?.viMeaning).toBe('giáo viên');
    });
});
