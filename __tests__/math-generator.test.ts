/**
 * Math Generator Tests — Computation Correctness
 * 
 * Validates that math generators produce problems with
 * correct answers, valid options, and proper difficulty scaling.
 */
import { describe, it, expect } from 'vitest';
import { generateMathSet, MATH_TOPICS } from '@/lib/content/math-generator';

describe('Math Generator — Structure', () => {
    it('should have registered topics', () => {
        expect(MATH_TOPICS.length).toBeGreaterThan(0);
    });

    it('every topic should generate valid problems', () => {
        for (const topic of MATH_TOPICS) {
            const problem = topic.generator();
            expect(problem.id).toBeTruthy();
            expect(problem.question).toBeTruthy();
            expect(problem.correctAnswer).toBeTruthy();
            expect(problem.type).toBeTruthy();
        }
    });
});

describe('Math Generator — Answer Correctness', () => {
    it('addition problems should have correct sum', () => {
        const problems = generateMathSet(1, 'addition', 50);
        for (const p of problems) {
            // Parse "X + Y = ?" pattern
            const match = p.question.match(/(\d+)\s*\+\s*(\d+)/);
            if (match) {
                const expected = parseInt(match[1]) + parseInt(match[2]);
                const answer = parseInt(p.correctAnswer);
                if (!isNaN(answer)) {
                    expect(answer).toBe(expected);
                }
            }
        }
    });

    it('subtraction problems should have correct difference', () => {
        const problems = generateMathSet(1, 'subtraction', 50);
        for (const p of problems) {
            const match = p.question.match(/(\d+)\s*[-−]\s*(\d+)/);
            if (match) {
                const expected = parseInt(match[1]) - parseInt(match[2]);
                const answer = parseInt(p.correctAnswer);
                if (!isNaN(answer)) {
                    expect(answer).toBe(expected);
                }
            }
        }
    });

    it('correct answer should always be in options', () => {
        const problems = generateMathSet(3, undefined, 100);
        for (const p of problems) {
            if (p.options && p.options.length > 0) {
                expect(p.options).toContain(p.correctAnswer);
            }
        }
    });

    it('options should not contain duplicates', () => {
        const problems = generateMathSet(3, undefined, 100);
        for (const p of problems) {
            if (p.options) {
                const unique = new Set(p.options);
                expect(unique.size).toBe(p.options.length);
            }
        }
    });
});

describe('Math Generator — Grade Scaling', () => {
    it('grade 1 should only generate grade 1 content', () => {
        const problems = generateMathSet(1, undefined, 30);
        for (const p of problems) {
            expect(p.gradeLevel).toBe(1);
        }
    });

    it('grade 5 should include all grade levels', () => {
        const problems = generateMathSet(5, undefined, 200);
        const grades = new Set(problems.map(p => p.gradeLevel));
        expect(grades.size).toBeGreaterThan(1);
    });
});
