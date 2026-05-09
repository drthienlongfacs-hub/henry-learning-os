import { describe, expect, it } from 'vitest';
import {
  CAMBRIDGE_EXAM_CLAIM_GUARDRAIL,
  CAMBRIDGE_EXAM_FRAMEWORK_STATS,
  CAMBRIDGE_EXAM_SPECS,
  CAMBRIDGE_OFFICIAL_SOURCES,
  type CambridgeExamLevelId,
} from '@/data/cambridge-official-framework';
import {
  EXAM_PRACTICE_BANK_STATS,
  OFFICIAL_FORMAT_PRACTICE_TESTS,
  PRACTICE_TESTS,
} from '@/data/practice-test-bank';

const expectedComponentCounts: Record<CambridgeExamLevelId, number[]> = {
  starters: [20, 25, 4],
  movers: [25, 35, 4],
  flyers: [25, 44, 4],
  ket: [32, 25, 2],
  pet: [32, 2, 25, 4],
};

describe('Cambridge exams full-stack evidence gate', () => {
  it('keeps current official Cambridge source ledger URL-backed and copyright-guarded', () => {
    expect(CAMBRIDGE_EXAM_FRAMEWORK_STATS.verifiedAt).toBe('2026-05-09');
    expect(CAMBRIDGE_OFFICIAL_SOURCES.length).toBeGreaterThanOrEqual(6);
    expect(CAMBRIDGE_OFFICIAL_SOURCES.every(source => source.url.startsWith('https://'))).toBe(true);
    expect(CAMBRIDGE_EXAM_CLAIM_GUARDRAIL.blockedClaim).toContain('official Cambridge papers');
    expect(CAMBRIDGE_EXAM_CLAIM_GUARDRAIL.officialContentPath).toContain('official Cambridge preparation');
  });

  it('matches official component question counts for every supported exam level', () => {
    (Object.keys(expectedComponentCounts) as CambridgeExamLevelId[]).forEach(levelId => {
      const spec = CAMBRIDGE_EXAM_SPECS[levelId];
      expect(spec.components.map(component => component.questions)).toEqual(expectedComponentCounts[levelId]);

      spec.components.forEach(component => {
        expect(component.parts).toBe(component.partSpecs.length);
        expect(component.partSpecs.reduce((sum, part) => sum + part.questionCount, 0)).toBe(component.questions);
      });
    });
  });

  it('ships ten complete original practice sets per exam level with every official component present', () => {
    expect(EXAM_PRACTICE_BANK_STATS.generatedSetCountPerLevel).toBe(10);
    expect(EXAM_PRACTICE_BANK_STATS.fullPracticeSetCount).toBe(50);
    expect(EXAM_PRACTICE_BANK_STATS.officialContentPolicy.toLowerCase()).toContain('copy');

    (Object.keys(CAMBRIDGE_EXAM_SPECS) as CambridgeExamLevelId[]).forEach(levelId => {
      expect(EXAM_PRACTICE_BANK_STATS.setCountsByLevel[levelId]).toBe(10);

      for (let setNo = 1; setNo <= 10; setNo += 1) {
        const tests = OFFICIAL_FORMAT_PRACTICE_TESTS.filter(test => test.level === levelId && test.setNo === setNo);
        expect(tests.map(test => test.componentKey)).toEqual(CAMBRIDGE_EXAM_SPECS[levelId].components.map(component => component.key));
      }
    });
  });

  it('makes generated practice tests interactive across audio, visual, objective, writing, and speaking surfaces', () => {
    const generatedQuestions = OFFICIAL_FORMAT_PRACTICE_TESTS.flatMap(test => test.parts.flatMap(part => part.questions));
    const listeningQuestions = OFFICIAL_FORMAT_PRACTICE_TESTS
      .filter(test => test.skill === 'listening')
      .flatMap(test => test.parts.flatMap(part => part.questions));
    const selfAssessedQuestions = generatedQuestions.filter(question => question.selfAssessment);

    expect(generatedQuestions.every(question => question.imageEmoji || question.visualAlt)).toBe(true);
    expect(listeningQuestions.every(question => question.audioTranscript && question.audioTranscript.length > 40)).toBe(true);
    expect(generatedQuestions.filter(question => !question.selfAssessment).every(question => question.answer && question.explanationVi.length > 30 && question.strategyVi.length > 30)).toBe(true);
    expect(selfAssessedQuestions.length).toBeGreaterThan(100);
    expect(selfAssessedQuestions.every(question => question.modelAnswer && question.rubricVi && question.rubricVi.length >= 4)).toBe(true);
  });

  it('keeps the public practice bank dominated by official-format generated packs while preserving legacy hand-authored items', () => {
    expect(PRACTICE_TESTS.length).toBeGreaterThan(OFFICIAL_FORMAT_PRACTICE_TESTS.length);
    expect(OFFICIAL_FORMAT_PRACTICE_TESTS.length).toBe(EXAM_PRACTICE_BANK_STATS.generatedComponentTestCount);
    expect(new Set(OFFICIAL_FORMAT_PRACTICE_TESTS.map(test => test.id)).size).toBe(OFFICIAL_FORMAT_PRACTICE_TESTS.length);
  });
});
