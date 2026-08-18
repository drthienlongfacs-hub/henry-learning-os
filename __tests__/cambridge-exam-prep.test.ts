import { describe, expect, it } from 'vitest';
import {
    CAMBRIDGE_EXAM_PREP_STATS,
    CAMBRIDGE_EXAM_PROGRAMS,
    CAMBRIDGE_OFFICIAL_SOURCES,
    CAMBRIDGE_PRACTICE_SETS,
    getObjectiveQuestions,
    getPracticeSetsForProgram,
} from '@/data/cambridge-exam-prep';

const componentQuestionCount = (programId: 'a2-key' | 'b1-preliminary', skill: string) => {
    const firstSet = getPracticeSetsForProgram(programId)[0];
    const component = firstSet.components.find(item => item.skill === skill);

    return component?.tasks.reduce((sum, task) => sum + task.questionCount, 0) ?? 0;
};

describe('Cambridge KET/PET exam prep governance', () => {
    it('ships exactly ten original practice sets per Cambridge programme', () => {
        expect(CAMBRIDGE_EXAM_PREP_STATS.a2PracticeSetCount).toBe(10);
        expect(CAMBRIDGE_EXAM_PREP_STATS.b1PracticeSetCount).toBe(10);
        expect(CAMBRIDGE_EXAM_PREP_STATS.totalPracticeSetCount).toBe(20);
        expect(CAMBRIDGE_EXAM_PREP_STATS.copyrightPolicy).toContain('not copied');
    });

    it('matches the current official component and question counts', () => {
        expect(componentQuestionCount('a2-key', 'reading-writing')).toBe(32);
        expect(componentQuestionCount('a2-key', 'listening')).toBe(25);
        expect(componentQuestionCount('a2-key', 'speaking')).toBe(2);

        expect(componentQuestionCount('b1-preliminary', 'reading')).toBe(32);
        expect(componentQuestionCount('b1-preliminary', 'writing')).toBe(2);
        expect(componentQuestionCount('b1-preliminary', 'listening')).toBe(25);
        expect(componentQuestionCount('b1-preliminary', 'speaking')).toBe(4);
    });

    it('keeps official Cambridge sources linked as evidence rather than bundled copied papers', () => {
        expect(CAMBRIDGE_OFFICIAL_SOURCES.length).toBeGreaterThanOrEqual(6);
        expect(CAMBRIDGE_OFFICIAL_SOURCES.every(source => source.sourceUrl.includes('cambridgeenglish.org'))).toBe(true);
        expect(CAMBRIDGE_EXAM_PROGRAMS.map(program => program.officialBoundary).join(' ')).toContain('original Henry practice content');

        CAMBRIDGE_PRACTICE_SETS.forEach(set => {
            expect(set.sourceBoundary).toContain('not an official Cambridge paper');
            expect(set.sourceBoundary).toContain('does not copy official test content');
        });
    });

    it('provides answer keys, explanations and examiner tips for auto-marked questions', () => {
        CAMBRIDGE_PRACTICE_SETS.forEach(set => {
            const objectiveQuestions = getObjectiveQuestions(set);

            expect(objectiveQuestions.length).toBeGreaterThan(0);
            objectiveQuestions.forEach(question => {
                expect(question.correctAnswer).toBeTruthy();
                expect(question.explanation.length).toBeGreaterThan(20);
                expect(question.examinerTip.length).toBeGreaterThan(20);

                if (question.mode === 'objective') {
                    expect(question.options).toContain(question.correctAnswer);
                }

                if (question.mode === 'gap') {
                    expect(question.acceptableAnswers).toContain(question.correctAnswer);
                }
            });
        });
    });

    it('gives writing and speaking tasks reusable sample answers and rubrics', () => {
        CAMBRIDGE_PRACTICE_SETS.forEach(set => {
            set.components
                .flatMap(component => component.tasks)
                .filter(task => task.skill === 'writing' || task.skill === 'speaking')
                .forEach(task => {
                    expect(task.sampleAnswer?.length).toBeGreaterThan(60);
                    expect(task.rubric?.length).toBeGreaterThanOrEqual(4);
                    expect(task.questions.every(question => question.explanation.length > 20)).toBe(true);
                });
        });
    });
});
