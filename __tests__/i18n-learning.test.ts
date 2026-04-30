import { describe, expect, it } from 'vitest';
import {
    LEARNING_I18N_REQUIRED_EN_STRINGS,
    formatLearningCount,
    formatLearningGrade,
    formatLearningGradeList,
    translateLearningText,
} from '@/lib/i18n-learning';

describe('learning engine i18n', () => {
    it('translates the child learning surface terms that were previously partial', () => {
        expect(translateLearningText('Chọn nhịp học', 'en')).toBe('Choose learning rhythm');
        expect(translateLearningText('Chương trình học', 'en')).toBe('Curriculum');
        expect(translateLearningText('Cơ thể & Sức khỏe', 'en')).toBe('Body & Health');
        expect(translateLearningText('Cơ thể là hệ thống các cơ quan phối hợp để sống khỏe.', 'en'))
            .toBe('The body is a system of organs working together to stay healthy.');
        expect(translateLearningText('Nêu chức năng cơ quan', 'en')).toBe('Name organ functions');
        expect(translateLearningText('Chưa có dữ liệu', 'en')).toBe('No real data yet');
        expect(translateLearningText('Sẵn sàng học!', 'en')).toBe('Ready to learn!');
        expect(translateLearningText('Bấm để bắt đầu học ngay', 'en')).toBe('Tap to start learning now');
        expect(translateLearningText('Bấm để bắt đầu bài đầu tiên', 'en')).toBe('Tap to start the first question');
        expect(translateLearningText('Dữ liệu thật: Cần bài chẩn đoán · Chưa có accuracy vì chưa có bài làm thật.', 'en'))
            .toBe('Real data: Needs diagnostic check · No accuracy yet because there are no real attempts.');
    });

    it('keeps Vietnamese as the source-of-truth display when vi is selected', () => {
        expect(translateLearningText('Cơ thể & Sức khỏe', 'vi')).toBe('Cơ thể & Sức khỏe');
        expect(formatLearningGrade(1, 'vi')).toBe('Lớp 1');
        expect(formatLearningCount(12, 'vi')).toBe('12 câu');
    });

    it('formats grade and count labels in English mode', () => {
        expect(formatLearningGrade(1, 'en')).toBe('Grade 1');
        expect(formatLearningGradeList([1, 2, 3], 'en')).toBe('Grades 1, 2, 3');
        expect(formatLearningCount(12, 'en')).toBe('12 questions');
        expect(LEARNING_I18N_REQUIRED_EN_STRINGS).toContain('Real data: Needs diagnostic check');
    });
});
