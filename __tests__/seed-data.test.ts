/**
 * Seed Data Tests — Cross-domain Integrity
 * 
 * Validates that seed data arrays are well-formed,
 * have no undefined entries, and maintain referential integrity.
 */
import { describe, it, expect } from 'vitest';
import { competencies, lessons, allExercises, parentMissions } from '@/data/seed';

describe('Seed — Competencies', () => {
    it('should have competencies defined', () => {
        expect(competencies.length).toBeGreaterThan(0);
    });

    it('every competency should have required fields', () => {
        for (const c of competencies) {
            expect(c.id).toBeTruthy();
            expect(c.domain).toBeTruthy();
            expect(c.subject).toBeTruthy();
            expect(c.title).toBeTruthy();
            expect(c.description).toBeTruthy();
            expect(Array.isArray(c.evidenceRequired)).toBe(true);
        }
    });

    it('competency IDs should be unique', () => {
        const ids = competencies.map(c => c.id);
        expect(new Set(ids).size).toBe(ids.length);
    });
});

describe('Seed — Lessons', () => {
    it('should have lessons defined', () => {
        expect(lessons.length).toBeGreaterThan(0);
    });

    it('every lesson should reference existing competencies', () => {
        const compIds = new Set(competencies.map(c => c.id));
        for (const l of lessons) {
            for (const cid of l.competencyIds) {
                expect(compIds.has(cid)).toBe(true);
            }
        }
    });

    it('every lesson should have exercises', () => {
        for (const l of lessons) {
            expect(l.exercises.length).toBeGreaterThan(0);
        }
    });

    it('lesson IDs should be unique', () => {
        const ids = lessons.map(l => l.id);
        expect(new Set(ids).size).toBe(ids.length);
    });
});

describe('Seed — Exercises', () => {
    it('allExercises should have entries', () => {
        expect(allExercises.length).toBeGreaterThan(0);
    });

    it('every exercise should have required fields', () => {
        for (const ex of allExercises) {
            expect(ex.id).toBeTruthy();
            expect(ex.question).toBeTruthy();
            expect(ex.correctAnswer).toBeTruthy();
            expect(ex.type).toBeTruthy();
        }
    });

    it('multiple choice exercises should have options including correct answer', () => {
        const mcExercises = allExercises.filter(ex => ex.type === 'multiple_choice' && ex.options);
        expect(mcExercises.length).toBeGreaterThan(0);
        for (const ex of mcExercises) {
            expect(ex.options).toContain(ex.correctAnswer);
        }
    });
});

describe('Seed — Parent Missions', () => {
    it('should have parent missions', () => {
        expect(parentMissions.length).toBeGreaterThan(0);
    });

    it('every mission should have required fields', () => {
        for (const m of parentMissions) {
            expect(m.id).toBeTruthy();
            expect(m.title).toBeTruthy();
            expect(m.description).toBeTruthy();
            expect(m.durationMinutes).toBeGreaterThan(0);
            expect(m.category).toBeTruthy();
        }
    });
});
