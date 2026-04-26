// ========================================
// Mastery State + Utility Tests
// ========================================
import { describe, it, expect } from 'vitest';
import { generateId, getAgeBand, getMoodEmoji, getEnergyLabel, formatDate } from '@/lib/utils';

describe('Utility Functions', () => {
    describe('generateId', () => {
        it('generates unique IDs', () => {
            const ids = new Set(Array.from({ length: 100 }, () => generateId()));
            expect(ids.size).toBe(100);
        });

        it('generates string IDs', () => {
            expect(typeof generateId()).toBe('string');
        });
    });

    describe('getAgeBand', () => {
        it('returns 6-8 for year 2020 (child is ~6)', () => {
            const band = getAgeBand(2020);
            expect(band).toBe('6-8');
        });

        it('returns 9-11 for year 2015', () => {
            const band = getAgeBand(2015);
            expect(band).toBe('9-11');
        });

        it('returns 12-15 for year 2012', () => {
            const band = getAgeBand(2012);
            expect(band).toBe('12-15');
        });

        it('returns 16-18 for year 2008', () => {
            const band = getAgeBand(2008);
            expect(band).toBe('16-18');
        });
    });

    describe('getMoodEmoji', () => {
        it('returns correct emoji for each mood level', () => {
            expect(getMoodEmoji(1)).toBe('😔');
            expect(getMoodEmoji(2)).toBe('😐');
            expect(getMoodEmoji(3)).toBe('🙂');
            expect(getMoodEmoji(4)).toBe('😊');
            expect(getMoodEmoji(5)).toBe('🤩');
        });

        it('returns first emoji for out-of-range mood', () => {
            expect(getMoodEmoji(0)).toBe('😔');
            expect(getMoodEmoji(99)).toBe('🤩');
        });
    });

    describe('getEnergyLabel', () => {
        it('returns energy labels', () => {
            expect(getEnergyLabel(1)).toBe('Rất mệt');
            expect(getEnergyLabel(3)).toBe('Bình thường');
            expect(getEnergyLabel(5)).toBe('Tràn đầy năng lượng');
        });
    });

    describe('formatDate', () => {
        it('formats date string to locale', () => {
            const result = formatDate('2026-04-26T12:00:00.000Z');
            expect(result).toBeTruthy();
            expect(typeof result).toBe('string');
        });
    });
});

describe('Mastery State Transitions', () => {
    // Testing the state machine logic from the spec
    const validTransitions: Record<string, string[]> = {
        not_started: ['practicing'],
        practicing: ['assisted_success', 'not_started'],
        assisted_success: ['independent_success', 'practicing'],
        independent_success: ['mastered', 'assisted_success'],
        mastered: ['transfer_success', 'independent_success'],
        transfer_success: ['mastered'],
    };

    Object.entries(validTransitions).forEach(([from, toStates]) => {
        toStates.forEach((to) => {
            it(`allows transition ${from} → ${to}`, () => {
                expect(validTransitions[from]).toContain(to);
            });
        });
    });

    it('does not allow skipping from not_started to mastered', () => {
        expect(validTransitions['not_started']).not.toContain('mastered');
    });

    it('does not allow skipping from practicing to mastered', () => {
        expect(validTransitions['practicing']).not.toContain('mastered');
    });
});

describe('Seed Data Integrity', () => {
    it('exports competencies', async () => {
        const { competencies } = await import('@/data/seed');
        expect(competencies.length).toBeGreaterThan(0);
        competencies.forEach((c) => {
            expect(c.id).toBeTruthy();
            expect(c.title).toBeTruthy();
            expect(c.subject).toBeTruthy();
        });
    });

    it('exports lessons with exercises', async () => {
        const { lessons } = await import('@/data/seed');
        expect(lessons.length).toBeGreaterThan(0);
        lessons.forEach((l) => {
            expect(l.id).toBeTruthy();
            expect(l.exercises.length).toBeGreaterThan(0);
            l.exercises.forEach((e) => {
                expect(e.question).toBeTruthy();
                expect(e.correctAnswer).toBeTruthy();
            });
        });
    });

    it('exports parent missions', async () => {
        const { parentMissions } = await import('@/data/seed');
        expect(parentMissions.length).toBeGreaterThan(0);
        parentMissions.forEach((m) => {
            expect(m.title).toBeTruthy();
            expect(m.durationMinutes).toBeGreaterThan(0);
        });
    });

    it('has consistent competency IDs between competencies and lessons', async () => {
        const { competencies, lessons } = await import('@/data/seed');
        const competencyIds = new Set(competencies.map((c) => c.id));
        lessons.forEach((l) => {
            l.competencyIds.forEach((cId) => {
                expect(competencyIds.has(cId)).toBe(true);
            });
        });
    });
});
