// =====================================================
// Expanded Seed Data
// Combines static curriculum with dynamic generation
// =====================================================

import { generateDailyMathSet, MathProblem } from '../lib/content/math-generator';
import { fetchTriviaQuestions, EducationalQuestion } from '../lib/content/trivia-api';
import type { Lesson, ContentBlock, Exercise } from '../types';
import { generateId } from '../lib/utils';

/**
 * Helper to convert dynamic math problems into Standard Lesson format
 */
export function createDynamicMathLesson(grade: number): Lesson {
    const problems = generateDailyMathSet(grade);

    return {
        id: `dyn-math-${Date.now()}`,
        subject: 'Toán',
        ageBand: grade === 1 ? '5-6' : grade === 2 ? '7-8' : grade === 3 ? '8-9' : '10-11',
        competencyIds: ['MATH_DYNAMIC_1'],
        title: `Thử thách Toán học Hôm nay (Lớp ${grade})`,
        objective: 'Luyện tập tổng hợp các kỹ năng toán học',
        contentBlocks: [
            {
                id: generateId(),
                type: 'text',
                content: `Chào Henry! Hôm nay chúng ta có ${problems.length} câu hỏi thử thách. Cố gắng hết sức nhé!`,
            }
        ],
        exercises: problems.map((p, index) => ({
            id: p.id,
            question: p.question,
            type: p.type === 'word_problem' ? 'free_text' : 'multiple_choice',
            options: p.type !== 'word_problem' ? generateMathOptions(p.correctAnswer) : undefined,
            correctAnswer: p.correctAnswer,
            explanation: p.explanation,
            difficulty: p.difficulty,
            hints: p.hints,
        })),
        rubric: ['Đúng 100%', 'Sai 1 câu', 'Sai nhiều hơn 1 câu'],
    };
}

/**
 * Creates dummy multiple choice options around the correct answer 
 */
function generateMathOptions(correct: string): string[] {
    const num = parseInt(correct, 10);
    if (isNaN(num)) return ['A', 'B', 'C', 'D']; // Fallback for non-numbers

    const options = new Set<string>();
    options.add(correct);
    while (options.size < 4) {
        const variance = [1, -1, 10, -10][Math.floor(Math.random() * 4)];
        options.add(String(num + variance + Math.floor(Math.random() * 3)));
    }

    return Array.from(options).sort(() => Math.random() - 0.5);
}

/**
 * Fetches dynamic Science & Discovery lesson using OpenTDB
 */
export async function createDynamicScienceLesson(): Promise<Lesson> {
    const trivia = await fetchTriviaQuestions(5);

    return {
        id: `dyn-sci-${Date.now()}`,
        subject: 'Khoa học',
        ageBand: '6-12',
        competencyIds: ['SCI_DISC_1'],
        title: 'Khám phá Thế giới',
        objective: 'Tìm hiểu những kiến thức mới lạ về khoa học và động vật',
        contentBlocks: [
            {
                id: generateId(),
                type: 'text',
                content: `Kiến thức Khoa học bằng Tiếng Anh. Dùng gợi ý nếu con chưa hiểu từ nhé!`,
            }
        ],
        exercises: trivia.map(q => ({
            id: q.id,
            question: q.question,
            type: 'multiple_choice',
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: 'Kiến thức chung từ Khoa học và Khám phá.',
            difficulty: 3,
            hints: ['Dịch sang tiếng Việt nếu cần', 'Dùng phương pháp loại trừ'],
        })),
        rubric: ['Awesome!', 'Good job!', 'Keep exploring!'],
    };
}
