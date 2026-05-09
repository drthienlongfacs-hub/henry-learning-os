import { describe, expect, it } from 'vitest';

import { buildIntlLessonFromData } from '@/components/LessonPhase';
import { getUnitSections } from '@/data/intl-curriculum-passages';
import { generateInternationalTopicExercises } from '@/lib/content/english-intl-generator';

const intlData = {
    readingPassages: [],
    vocabThemes: [
        {
            themeId: 'fallback-g1-rhyme',
            grade: 1,
            title: 'Fallback vocabulary',
            titleVi: 'Từ vựng dự phòng',
            words: ['dock', 'clock', 'mouse', 'rhyme'],
            wordsVi: ['bến', 'đồng hồ', 'chuột', 'vần'],
        },
    ],
    grammarTopics: [
        {
            topicId: 'gr_g1_01',
            grade: 1,
            title: 'Verb To Be (am/is/are)',
            titleVi: 'Động từ To Be',
            rules: [
                {
                    rule: 'I am, He/She/It is, You/We/They are',
                    ruleVi: 'I am, He/She/It is, You/We/They are',
                    examples: ['I am a boy.'],
                    examplesVi: ['Tôi là con trai.'],
                },
            ],
        },
    ],
};

describe('Cambridge G1 Unit 3 curriculum passages', () => {
    it('keeps Rhyme time aligned to the benchmarked 6 lessons plus review', () => {
        const sections = getUnitSections(
            'cam_g1_u03',
            'Rhyme time',
            'Thời gian vần điệu',
            ['dock', 'clock', 'mouse', 'rhyme'],
            ['bến', 'đồng hồ', 'chuột', 'vần'],
        );

        expect(sections.map((section) => section.sectionTitle)).toEqual([
            '3.1 Rhyme time',
            '3.2 Number rhyme time',
            '3.3 Funny rhymes',
            '3.4 Silly rhymes',
            '3.5 A rhyme that tells a story',
            '3.6 Changing a rhyme',
            '3.7 Unit 3 Review',
        ]);
    });

    it('does not append generic grammar slides when a unit has full multi-section reading content', () => {
        const lesson = buildIntlLessonFromData(
            'cam_g1_u03',
            'Rhyme time',
            'Thời gian vần điệu',
            1,
            'cambridge',
            intlData,
        );
        const allText = lesson.sections
            .flatMap((section) => [section.title, section.titleVi, ...section.content, ...(section.contentVi ?? [])])
            .join('\n');

        expect(lesson.sections).toHaveLength(8);
        expect(lesson.sections[0].title).toContain('Vocabulary');
        expect(allText).toContain('3.2 Number rhyme time');
        expect(allText).toContain('Fire! Fire!');
        expect(allText).not.toContain('Verb To Be');
        expect(allText).not.toContain('I am a boy.');
        expect(allText).not.toContain('3.12');
    });

    it('uses a benchmarked Unit 3 question bank instead of generic country-unit prompts', () => {
        const exercises = generateInternationalTopicExercises('cam_g1_u03', 12);
        const allText = exercises.map(exercise => `${exercise.question}\n${exercise.explanation}`).join('\n');

        expect(exercises.length).toBeGreaterThanOrEqual(16);
        expect(allText).toContain('Unit 3.1');
        expect(allText).toContain('Unit 3.2');
        expect(allText).toContain('Unit 3.3');
        expect(allText).toContain('Unit 3.4');
        expect(allText).toContain('Unit 3.5');
        expect(allText).toContain('Unit 3.6');
        expect(allText).toContain('Unit 3 review');
        expect(allText).toContain('Fire! Fire!');
        expect(allText).not.toContain('focuses on which skill');
        expect(allText).not.toContain('This unit practices: Reading, Writing, Speaking, Listening');
    });
});
