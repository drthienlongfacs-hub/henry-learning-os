import { describe, expect, it } from 'vitest';
import { generateAIResponse } from '@/lib/ai/provider';
import { generateTutorTurn, type TutorProblem } from '@/lib/ai/tutor-engine';
import { buildTopicEvidenceProfile } from '@/lib/evidence/learning-evidence';
import { buildQuestionPresentationPlan } from '@/lib/pedagogy/question-presentation';
import type { Attempt } from '@/types';

const problem: TutorProblem = {
    question: '8 + 7 = ?',
    correctAnswer: '15',
    explanation: 'Tách 7 thành 2 và 5: 8 + 2 = 10, rồi thêm 5 = 15.',
    topic: 'Cộng trừ trong 20',
    topicKey: 'add_sub_20',
    type: 'arithmetic',
    options: ['13', '14', '15', '16'],
    hints: ['Tách để đủ 10', '8 cần thêm 2 để thành 10'],
};

function attempt(index: number, isCorrect: boolean, hintLevelUsed = 0): Attempt {
    return {
        id: `a-${index}`,
        childId: 'child-1',
        lessonId: 'lesson-1',
        competencyId: 'add_sub_20',
        exerciseId: `e-${index}`,
        answer: isCorrect ? '15' : '14',
        isCorrect,
        errorType: isCorrect ? null : 'calculation',
        hintLevelUsed,
        timeSpentSeconds: 25,
        confidenceSelfRating: 3,
        aiRoleUsed: 'tutor',
        createdAt: `2026-04-${String(10 + index).padStart(2, '0')}T00:00:00.000Z`,
    };
}

describe('AI tutor engine', () => {
    it('uses question details and evidence data instead of generic display text', () => {
        const evidenceProfile = buildTopicEvidenceProfile({
            topicKey: 'add_sub_20',
            subject: 'math',
            attempts: [attempt(1, true), attempt(2, false, 1), attempt(3, true)],
            mistakes: [],
            reviewSchedules: [],
            now: new Date('2026-04-29T00:00:00.000Z'),
        });
        const presentationPlan = buildQuestionPresentationPlan({
            subject: 'math',
            problem,
            evidenceProfile,
        });

        const turn = generateTutorTurn({
            subject: 'math',
            problem,
            hintLevel: 2,
            evidenceProfile,
            presentationPlan,
            revealAnswerAllowed: false,
        });

        expect(turn.text).toContain('AI gia sư');
        expect(turn.text).toContain('Mẫu: 3 bài');
        expect(turn.text).toContain('Benchmark');
        expect(turn.shouldRevealAnswer).toBe(false);
        expect(turn.nextPrompt.length).toBeGreaterThan(10);
    });

    it('diagnoses near numeric wrong answers as calculation or step errors', () => {
        const turn = generateTutorTurn({
            subject: 'math',
            problem,
            childAnswer: '14',
            hintLevel: 1,
            revealAnswerAllowed: false,
        });

        expect(turn.diagnosis).toContain('gần');
        expect(turn.move).toBe('try_step');
        expect(turn.text).not.toContain('Đáp án để đối chiếu');
    });

    it('upgrades provider tutor responses when structured exercise payload exists', () => {
        const response = generateAIResponse({
            childId: 'child-1',
            sessionId: 'session-1',
            role: 'tutor',
            subject: 'math',
            ageBand: '6-8',
            safetyLevel: 'under_13',
            question: problem.question,
            correctAnswer: problem.correctAnswer,
            explanation: problem.explanation,
            topic: problem.topic,
            topicKey: problem.topicKey,
            problemType: problem.type,
            childAnswer: '14',
            hintLevel: 2,
        });

        expect(response.isBlocked).toBe(false);
        expect(response.text).toContain('AI gia sư');
        expect(response.text).toContain('sai phép tính');
        expect(response.supportLevel).toBe('hint_medium');
        expect(response.sotAudit?.passed).toBe(true);
        expect(response.sotAudit?.blockedClaim).toContain('pilot/cohort');
    });
});
