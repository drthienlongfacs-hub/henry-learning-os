/**
 * exercises-generated-runtime.test.ts — Smoke Tests for Runtime Exercise Generator
 * 
 * Validates that the runtime generator produces exercises equivalent to the
 * static file it replaces. Critical path: if this fails, the app has no exercise data.
 */
import { describe, it, expect } from 'vitest';
import { getMassiveMathGenerated, getMassiveEliteGenerated } from '@/data/exercises-generated-runtime';

describe('Runtime Exercise Generator — Critical Path', () => {
    describe('massiveMathGenerated', () => {
        it('generates a non-empty exercise array', () => {
            const exercises = getMassiveMathGenerated();
            expect(exercises.length).toBeGreaterThan(100);
        });

        it('all exercises have required fields', () => {
            const exercises = getMassiveMathGenerated();
            const sample = exercises.slice(0, 50); // Check first 50
            for (const ex of sample) {
                expect(ex.id).toBeTruthy();
                expect(ex.type).toBe('multiple_choice');
                expect(ex.subject).toBe('Toán');
                expect(ex.question).toMatch(/\d+ [+\-] \d+ = \?/);
                expect(ex.options).toHaveLength(4);
                expect(ex.correctAnswer).toBeTruthy();
                expect(ex.hints).toHaveLength(2);
                expect(ex.explanation).toBeTruthy();
                expect(ex.tags).toContain('generated');
            }
        });

        it('correct answers are mathematically correct', () => {
            const exercises = getMassiveMathGenerated();
            const sample = exercises.slice(0, 100);
            for (const ex of sample) {
                const match = ex.question.match(/(\d+) ([+\-]) (\d+) = \?/);
                expect(match).toBeTruthy();
                if (match) {
                    const [, a, op, b] = match;
                    const expected = op === '+' ? Number(a) + Number(b) : Number(a) - Number(b);
                    expect(ex.correctAnswer).toBe(String(expected));
                }
            }
        });

        it('correct answer is always included in options', () => {
            const exercises = getMassiveMathGenerated();
            for (const ex of exercises.slice(0, 200)) {
                expect(ex.options).toContain(ex.correctAnswer);
            }
        });

        it('all options are unique (no duplicates)', () => {
            const exercises = getMassiveMathGenerated();
            for (const ex of exercises.slice(0, 200)) {
                const unique = new Set(ex.options);
                expect(unique.size).toBe(ex.options!.length);
            }
        });

        it('has both addition and subtraction exercises', () => {
            const exercises = getMassiveMathGenerated();
            const addition = exercises.filter(e => e.tags!.includes('addition'));
            const subtraction = exercises.filter(e => e.tags!.includes('subtraction'));
            expect(addition.length).toBeGreaterThan(100);
            expect(subtraction.length).toBeGreaterThan(100);
        });

        it('difficulty ranges from 2 to 4', () => {
            const exercises = getMassiveMathGenerated();
            const difficulties = new Set(exercises.map(e => e.difficulty));
            expect(difficulties.has(2)).toBe(true);
            expect(difficulties.has(3)).toBe(true);
            expect(difficulties.has(4)).toBe(true);
        });

        it('generates deterministic results (same output every call)', () => {
            const first = getMassiveMathGenerated();
            const second = getMassiveMathGenerated();
            expect(first).toBe(second); // Same reference due to caching
            expect(first[0].id).toBe(second[0].id);
            expect(first[0].question).toBe(second[0].question);
            expect(first[0].options).toEqual(second[0].options);
        });
    });

    describe('massiveEliteGenerated', () => {
        it('generates elite exercises', () => {
            const exercises = getMassiveEliteGenerated();
            expect(exercises.length).toBeGreaterThan(10);
        });

        it('all elite exercises have required fields', () => {
            const exercises = getMassiveEliteGenerated();
            for (const ex of exercises) {
                expect(ex.id).toMatch(/^gen-elite-/);
                expect(ex.type).toBe('multiple_choice');
                expect(ex.difficulty).toBe(5);
                expect(ex.question).toBeTruthy();
                expect(ex.correctAnswer).toBeTruthy();
                expect(ex.tags).toContain('generated');
            }
        });

        it('covers all elite categories', () => {
            const exercises = getMassiveEliteGenerated();
            const categories = new Set(exercises.map(e => e.tags![0]));
            expect(categories.has('civics')).toBe(true);
            expect(categories.has('finance')).toBe(true);
            expect(categories.has('probability')).toBe(true);
            expect(categories.has('systems')).toBe(true);
        });
    });
});
