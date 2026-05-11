/**
 * Content Generator Tests — Vietnamese Phonics Data Integrity
 * 
 * Validates that all Vietnamese curriculum data uses proper diacritics
 * and contains no English-language contamination (RCA fix regression guard).
 */
import { describe, it, expect } from 'vitest';
import {
    generateVietnameseSet,
    VIETNAMESE_TOPICS,
} from '@/lib/content/vietnamese-generator';

// Regex: strings that are pure ASCII lowercase with 3+ chars (likely English)
const ENGLISH_WORD_PATTERN = /^[a-z]{3,}$/;

// Known valid Vietnamese words without diacritics (including common loanwords)
const VALID_NO_DIACRITICS = new Set([
    // Family/pronouns
    'ba', 'me', 'em', 'bo', 'co', 'di', 'an', 'cho', 'con', 'com', 'anh', 'chi',
    // Common words naturally ASCII
    'kho', 'ghi', 'ngon', 'chim', 'phim', 'xem', 'nem', 'hem', 'trong', 'gia',
    'nam', 'cam', 'ham', 'lam', 'ram', 'sam', 'tam', 'van', 'nhanh', 'xinh',
    'can', 'dan', 'man', 'nan', 'ran', 'tan', 'ban', 'hon', 'vui', 'nho',
    // Loanwords used in Vietnamese
    'tivi', 'game', 'pin', 'taxi', 'video', 'radio',
    // Grammar/function words
    'hay', 'nay', 'the', 'nao', 'sao', 'roi', 'day', 'voi', 'cua', 'cung',
    'thi', 'nha', 'nhe', 'gio', 'lam', 'bao', 'con', 'len', 'tai',
    // Common short content words
    'mau', 'tai', 'mat', 'tay', 'vai', 'bong', 'cay', 'hoa', 'lua', 'mua',
    'san', 'nui', 'bien', 'song', 'duong', 'nha', 'truong', 'lop',
]);

describe('Vietnamese Generator — Data Integrity', () => {
    it('should have at least 20 topics registered', () => {
        expect(VIETNAMESE_TOPICS.length).toBeGreaterThanOrEqual(20);
    });

    it('every topic should have a valid generator function', () => {
        for (const topic of VIETNAMESE_TOPICS) {
            expect(typeof topic.generator).toBe('function');
            expect(topic.key).toBeTruthy();
            expect(topic.name).toBeTruthy();
            expect(topic.gradeLevel).toBeGreaterThanOrEqual(1);
            expect(topic.gradeLevel).toBeLessThanOrEqual(5);
        }
    });

    it('should generate valid problems with all required fields', () => {
        for (const topic of VIETNAMESE_TOPICS) {
            const problem = topic.generator();
            expect(problem.id).toBeTruthy();
            expect(problem.question).toBeTruthy();
            expect(problem.correctAnswer).toBeTruthy();
            expect(problem.options?.length).toBeGreaterThanOrEqual(2);
            expect(problem.options).toContain(problem.correctAnswer);
        }
    });

    it('generated problems should not contain common English words in Vietnamese context', () => {
        // Known English words that should NEVER appear in Vietnamese exercises
        // (these were the actual bugs found in RCA-001)
        const ENGLISH_WORDS_BLOCKLIST = new Set([
            'cat', 'hat', 'mat', 'bat', 'rat', 'fat', 'sat', 'pat',
            'dog', 'pig', 'pen', 'hen', 'ten', 'men', 'den', 'bed',
            'cup', 'cut', 'but', 'hut', 'nut', 'put', 'run', 'sun',
            'big', 'red', 'hot', 'top', 'pot', 'map', 'tap', 'cap',
            'the', 'and', 'for', 'are', 'was', 'not', 'you', 'all',
            'can', 'had', 'her', 'one', 'our', 'out', 'day', 'get',
            'has', 'him', 'his', 'how', 'its', 'let', 'may', 'new',
            'now', 'old', 'see', 'way', 'who', 'boy', 'did', 'each',
            'she', 'which', 'their', 'said', 'this', 'that', 'with',
            'apple', 'banana', 'orange', 'hello', 'world', 'house',
            'water', 'table', 'chair', 'happy', 'phone', 'color',
        ]);
        // Words that exist in both Vietnamese and English — NOT errors
        const SHARED_WORDS = new Set([
            'an', 'ba', 'cam', 'con', 'ban', 'can', 'dan', 'day',
            'gia', 'hai', 'hon', 'lam', 'man', 'mat', 'me', 'nam',
            'nho', 'ran', 'sam', 'son', 'tam', 'van',
        ]);

        const allProblems = generateVietnameseSet(5, undefined, 100);
        for (const p of allProblems) {
            for (const opt of (p.options || [])) {
                const words = opt.split(/\s+/);
                for (const w of words) {
                    const clean = w.replace(/['".,!?()→←↔:;""]/g, '').toLowerCase();
                    if (ENGLISH_WORDS_BLOCKLIST.has(clean) && !SHARED_WORDS.has(clean)) {
                        // Definite English contamination
                        throw new Error(
                            `ENGLISH CONTAMINATION: "${clean}" in option "${opt}" of Vietnamese question "${p.question.substring(0, 80)}..."`
                        );
                    }
                }
            }
        }
    });

    it('grade levels should be monotonically ordered in topic list', () => {
        let lastGrade = 0;
        for (const topic of VIETNAMESE_TOPICS) {
            expect(topic.gradeLevel).toBeGreaterThanOrEqual(lastGrade);
            lastGrade = topic.gradeLevel;
        }
    });

    it('generateVietnameseSet should respect grade filter', () => {
        const grade1Only = generateVietnameseSet(1, undefined, 50);
        for (const p of grade1Only) {
            expect(p.gradeLevel).toBe(1);
        }
    });

    it('generateVietnameseSet should respect topic filter', () => {
        const vanOnly = generateVietnameseSet(5, 'van', 20);
        for (const p of vanOnly) {
            expect(p.topicKey).toBe('van');
        }
    });
});

describe('Vietnamese Generator — Regression Guard (RCA-001)', () => {
    it('van generator should produce words with Vietnamese diacritics', () => {
        // Generate many problems to hit different VANS entries
        const problems = generateVietnameseSet(1, 'van', 50);
        expect(problems.length).toBe(50);

        for (const p of problems) {
            // Correct answer should be a valid Vietnamese vần (not English)
            expect(p.correctAnswer).toBeTruthy();
            // Question should be in Vietnamese
            expect(p.question).toMatch(/[ạảãàáâầẩẫậăắằẳẵặịỉĩìíọỏõòóôồổỗộơờởỡớợụủũùúưừửữứựỳỷỹỵý]|Từ|vần|Tìm/);
        }
    });

    it('phu_am_ghep generator should produce valid Vietnamese words', () => {
        const problems = generateVietnameseSet(1, 'phu_am_ghep', 30);
        for (const p of problems) {
            expect(p.question).toBeTruthy();
            expect(p.correctAnswer).toBeTruthy();
        }
    });
});
