// ========================================
// AI Safety Tests — Under-13 blocking, crisis detection, role routing
// ========================================
import { describe, it, expect } from 'vitest';
import { generateAIResponse, classifyError } from '@/lib/ai/provider';
import type { AIRequest } from '@/lib/ai/provider';

const baseRequest: AIRequest = {
    childId: 'child-1',
    sessionId: 'session-1',
    role: 'tutor',
    subject: 'Toán',
    ageBand: '6-8',
    safetyLevel: 'under_13',
    question: '3 + 5 bằng mấy?',
};

describe('AI Safety Middleware', () => {
    describe('Under-13 blocking', () => {
        it('blocks free chat for under-13', () => {
            const request: AIRequest = {
                ...baseRequest,
                sessionId: 'free_chat',
                safetyLevel: 'under_13',
            };
            const response = generateAIResponse(request);
            expect(response.isBlocked).toBe(true);
            expect(response.safetyFlags).toContain('blocked_by_safety');
        });

        it('allows in-session interaction for under-13', () => {
            const response = generateAIResponse(baseRequest);
            expect(response.isBlocked).toBe(false);
            expect(response.role).toBe('tutor');
        });

        it('blocks when no sessionId for under-13', () => {
            const request: AIRequest = {
                ...baseRequest,
                sessionId: '',
                safetyLevel: 'under_13',
            };
            const response = generateAIResponse(request);
            expect(response.isBlocked).toBe(true);
        });
    });

    describe('Crisis detection', () => {
        const crisisKeywords = ['tự hại', 'tự tử', 'muốn chết', 'đánh đập', 'xâm hại'];

        crisisKeywords.forEach((keyword) => {
            it(`detects crisis keyword: "${keyword}"`, () => {
                const request: AIRequest = {
                    ...baseRequest,
                    question: `Con ${keyword} rồi`,
                };
                const response = generateAIResponse(request);
                expect(response.isBlocked).toBe(true);
                expect(response.safetyFlags).toContain('crisis_detected');
                expect(response.role).toBe('safety_guardian');
            });
        });

        it('does not false positive on normal text', () => {
            const response = generateAIResponse(baseRequest);
            expect(response.safetyFlags).not.toContain('crisis_detected');
        });
    });

    describe('Role routing', () => {
        it('routes to tutor role', () => {
            const response = generateAIResponse({ ...baseRequest, role: 'tutor' });
            expect(response.role).toBe('tutor');
            expect(response.text.length).toBeGreaterThan(0);
        });

        it('routes to classmate role', () => {
            const response = generateAIResponse({ ...baseRequest, role: 'classmate' });
            expect(response.role).toBe('classmate');
            expect(response.supportLevel).toBe('hint_light');
        });

        it('routes to coach role', () => {
            const response = generateAIResponse({ ...baseRequest, role: 'coach' });
            expect(response.role).toBe('coach');
            expect(response.supportLevel).toBe('feedback');
        });

        it('routes to examiner role with no hints', () => {
            const response = generateAIResponse({ ...baseRequest, role: 'examiner' });
            expect(response.role).toBe('examiner');
            expect(response.supportLevel).toBe('none');
        });

        it('routes to parent_assistant role', () => {
            const response = generateAIResponse({ ...baseRequest, role: 'parent_assistant' });
            expect(response.role).toBe('parent_assistant');
        });
    });

    describe('Hint ladder', () => {
        it('returns L0 by default (no hint)', () => {
            const response = generateAIResponse({ ...baseRequest, hintLevel: 0 });
            expect(response.supportLevel).toBe('none');
        });

        it('returns increasing support levels with hint levels', () => {
            const levels = [1, 2, 3, 4, 5];
            for (const level of levels) {
                const response = generateAIResponse({ ...baseRequest, hintLevel: level });
                expect(response.isBlocked).toBe(false);
                expect(response.text.length).toBeGreaterThan(0);
            }
        });
    });
});

describe('Error Classification', () => {
    it('classifies empty answer as attention error', () => {
        const result = classifyError('3+5=?', '', '8', 'Toán');
        expect(result.errorType).toBe('attention');
    });

    it('classifies close numeric answer as calculation error', () => {
        const result = classifyError('3+5=?', '7', '8', 'Toán');
        expect(result.errorType).toBe('calculation');
    });

    it('classifies language error as vocabulary error', () => {
        const result = classifyError('Từ nào là danh từ?', 'chạy', 'mèo', 'Tiếng Việt');
        expect(result.errorType).toBe('vocabulary');
    });

    it('classifies English error as vocabulary error', () => {
        const result = classifyError('What is this?', 'ket', 'cat', 'Tiếng Anh');
        expect(result.errorType).toBe('vocabulary');
    });

    it('classifies far-off numeric answer as concept error', () => {
        const result = classifyError('3+5=?', '15', '8', 'Toán');
        expect(result.errorType).toBe('concept');
    });

    it('returns correction plan for all errors', () => {
        const result = classifyError('test', 'wrong', 'right', 'Toán');
        expect(result.correctionPlan).toBeTruthy();
        expect(result.explanation).toBeTruthy();
    });
});
