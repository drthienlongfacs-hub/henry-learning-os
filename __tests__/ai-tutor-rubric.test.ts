import { describe, expect, it } from 'vitest';
import { generateAIResponse } from '@/lib/ai/provider';
import {
    PRIMARY_TUTOR_REGRESSION_SCENARIOS,
    TUTOR_RUBRIC_CRITERIA,
    evaluateTutorRegressionScenario,
    runTutorRegressionAudit,
} from '@/lib/ai/tutor-rubric';

describe('AI tutor SOT rubric', () => {
    it('defines 50 primary-grade regression scenarios with SOT traceability', () => {
        expect(PRIMARY_TUTOR_REGRESSION_SCENARIOS).toHaveLength(50);
        expect(TUTOR_RUBRIC_CRITERIA).toHaveLength(6);

        PRIMARY_TUTOR_REGRESSION_SCENARIOS.forEach((scenario) => {
            expect(scenario.gradeLevel).toBeGreaterThanOrEqual(1);
            expect(scenario.gradeLevel).toBeLessThanOrEqual(5);
            expect(['math', 'vietnamese', 'english']).toContain(scenario.subject);
            expect(scenario.sourceIds).toEqual(expect.arrayContaining(['sot-traceability-matrix', 'repo-prd']));
            expect(scenario.sotFeatureIds).toEqual(expect.arrayContaining(['ai-socratic-tutor', 'hint-ladder']));
            expect(scenario.forbiddenBehavior.join(' ').length).toBeGreaterThan(30);
            expect(scenario.expectedTutorBehavior.join(' ')).toMatch(/Hỏi|Phân loại|Cho|reveal/);
        });
    });

    it('passes all internal regression scenarios without claiming learner efficacy', () => {
        const audit = runTutorRegressionAudit();

        expect(audit.scenarioCount).toBe(50);
        expect(audit.passedCount).toBe(50);
        expect(audit.score100).toBe(100);
        expect(audit.blockedClaim).toContain('chưa phải bằng chứng hiệu quả học tập');
        expect(audit.sourceIds).toContain('unicef-ai-children');
    });

    it('keeps answer hidden when reveal is not allowed even at high hint level', () => {
        const guardedScenario = PRIMARY_TUTOR_REGRESSION_SCENARIOS.find((scenario) => scenario.id.includes('guarded-late-hint'));

        expect(guardedScenario).toBeDefined();
        const audit = evaluateTutorRegressionScenario(guardedScenario!);

        expect(audit.passed).toBe(true);
        expect(audit.results.find((result) => result.id === 'no_direct_answer')?.passed).toBe(true);
        expect(audit.blockedClaim).toContain('Không claim');
    });

    it('exposes SOT audit metadata through structured provider tutor responses', () => {
        const response = generateAIResponse({
            childId: 'child-1',
            sessionId: 'session-1',
            role: 'tutor',
            subject: 'math',
            ageBand: '6-8',
            safetyLevel: 'under_13',
            question: '8 + 7 = ?',
            correctAnswer: '15',
            explanation: 'Tách 7 thành 2 và 5.',
            topic: 'Cộng trong 20',
            topicKey: 'add_sub_20',
            problemType: 'reasoning',
            childAnswer: '14',
            hintLevel: 2,
            revealAnswerAllowed: false,
        });

        expect(response.isBlocked).toBe(false);
        expect(response.sotAudit?.passed).toBe(true);
        expect(response.sotAudit?.sourceIds).toContain('sot-traceability-matrix');
        expect(response.sotAudit?.blockedClaim).toContain('pilot/cohort');
    });
});
