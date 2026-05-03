// ═══════════════════════════════════════════════════════
// Unit-Based English Exercise Generator
// Maps Global Success textbook units → interactive exercises
// ═══════════════════════════════════════════════════════

import { GRADE3_UNITS, type UnitData } from '@/data/english-units-g3';
import { GRADE4_UNITS } from '@/data/english-units-g4';
import { GRADE5_UNITS } from '@/data/english-units-g5';
import { GRADE1_UNITS, GRADE2_UNITS } from '@/data/english-units-g1g2';

const ALL_UNITS = [...GRADE1_UNITS, ...GRADE2_UNITS, ...GRADE3_UNITS, ...GRADE4_UNITS, ...GRADE5_UNITS];
import type { EnglishProblem } from './english-generator';

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const genId = () => `en-unit-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const shuffle = <T>(arr: T[]): T[] => {
    const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = rand(0, i);[a[i], a[j]] = [a[j], a[i]]; } return a;
};

// ── Exercise Type 1: Vocabulary Flashcard (EN↔VI) ──
function genVocabFlashcard(unit: UnitData): EnglishProblem {
    const pair = unit.vocabulary[rand(0, unit.vocabulary.length - 1)];
    const direction = Math.random() > 0.5;
    const others = shuffle(unit.vocabulary.filter(v => v.en !== pair.en)).slice(0, 3);
    const opts = direction
        ? shuffle([pair.vi, ...others.map(o => o.vi)])
        : shuffle([pair.en, ...others.map(o => o.en)]);
    return {
        id: genId(), gradeLevel: unit.grade, difficulty: unit.grade,
        type: 'vocabulary',
        topic: `Unit ${unit.unitNumber}: ${unit.title}`,
        topicKey: unit.unitId,
        question: direction
            ? `"${pair.en}" nghĩa là gì? (Unit ${unit.unitNumber}: ${unit.title})`
            : `"${pair.vi}" in English is?`,
        correctAnswer: direction ? pair.vi : pair.en,
        options: opts,
        explanation: `${pair.en} = ${pair.vi} (${unit.title})`,
        hints: [`This word is from Unit ${unit.unitNumber}: ${unit.title}`, `Answer: ${direction ? pair.vi : pair.en}`],
        illustration: pair.img,
    };
}

// ── Exercise Type 2: Pattern Drill (Fill in the blank) ──
function genPatternDrill(unit: UnitData): EnglishProblem {
    const pattern = unit.patterns[rand(0, unit.patterns.length - 1)];
    const correctSlot = pattern.slots[0];
    const wrongSlots = shuffle(pattern.slots.slice(1)).slice(0, 2);
    // Add a distractor from another unit's vocab
    const distractor = unit.vocabulary[rand(0, unit.vocabulary.length - 1)].en;
    const allOpts = shuffle([correctSlot, ...wrongSlots, distractor]).slice(0, 4);
    if (!allOpts.includes(correctSlot)) allOpts[0] = correctSlot;

    return {
        id: genId(), gradeLevel: unit.grade, difficulty: unit.grade,
        type: 'grammar',
        topic: `Unit ${unit.unitNumber}: ${unit.title}`,
        topicKey: unit.unitId,
        question: `Complete: "${pattern.pattern}" (Unit ${unit.unitNumber})`,
        correctAnswer: correctSlot,
        options: shuffle(allOpts),
        explanation: `${pattern.example}\n${pattern.exampleVi}`,
        hints: [`Pattern: ${pattern.pattern}`, `Answer: ${correctSlot}`],
    };
}

// ── Exercise Type 3: Listen & Choose (simulated via text) ──
function genListenChoose(unit: UnitData): EnglishProblem {
    const pair = unit.vocabulary[rand(0, unit.vocabulary.length - 1)];
    const others = shuffle(unit.vocabulary.filter(v => v.en !== pair.en)).slice(0, 3);
    return {
        id: genId(), gradeLevel: unit.grade, difficulty: unit.grade,
        type: 'listening',
        topic: `Unit ${unit.unitNumber}: ${unit.title}`,
        topicKey: unit.unitId,
        question: `🔊 Listen: "${pair.en}". Choose the correct meaning:`,
        correctAnswer: pair.vi,
        options: shuffle([pair.vi, ...others.map(o => o.vi)]),
        explanation: `${pair.en} = ${pair.vi}. Listen carefully to the pronunciation.`,
        hints: [`The word is "${pair.en}"`, `Answer: ${pair.vi}`],
    };
}

// ── Exercise Type 4: Sentence Match (Pattern → Vietnamese) ──
function genSentenceMatch(unit: UnitData): EnglishProblem {
    const pattern = unit.patterns[rand(0, unit.patterns.length - 1)];
    const otherUnits = ALL_UNITS.filter(u => u.unitId !== unit.unitId);
    const wrongPatterns = shuffle(otherUnits.flatMap(u => u.patterns)).slice(0, 3);
    return {
        id: genId(), gradeLevel: unit.grade, difficulty: unit.grade,
        type: 'reading',
        topic: `Unit ${unit.unitNumber}: ${unit.title}`,
        topicKey: unit.unitId,
        question: `"${pattern.example}" nghĩa là gì?`,
        correctAnswer: pattern.exampleVi,
        options: shuffle([pattern.exampleVi, ...wrongPatterns.map(p => p.exampleVi)]),
        explanation: `${pattern.example} = ${pattern.exampleVi}`,
        hints: [`Key word: ${pattern.slots[0]}`, `Answer: ${pattern.exampleVi}`],
    };
}

// ── Main Generator ──

const GENERATORS = [genVocabFlashcard, genPatternDrill, genListenChoose, genSentenceMatch];

export function generateUnitExercises(
    grade: number,
    unitId?: string,
    count: number = 10
): EnglishProblem[] {
    const gradeMap: Record<number, UnitData[]> = { 1: GRADE1_UNITS, 2: GRADE2_UNITS, 3: GRADE3_UNITS, 4: GRADE4_UNITS, 5: GRADE5_UNITS };
    const pool = gradeMap[grade] || [];
    const units = unitId ? pool.filter(u => u.unitId === unitId) : pool;
    if (units.length === 0) return [];

    return Array.from({ length: count }, () => {
        const unit = units[rand(0, units.length - 1)];
        const gen = GENERATORS[rand(0, GENERATORS.length - 1)];
        return gen(unit);
    });
}

// ── Unit Registry for UI ──

export interface UnitInfo {
    unitId: string;
    unitNumber: number;
    grade: number;
    title: string;
    titleVi: string;
    textbook: string;
    vocabCount: number;
    patternCount: number;
}

export function getUnitRegistry(grade: number): UnitInfo[] {
    const gradeMap: Record<number, UnitData[]> = { 1: GRADE1_UNITS, 2: GRADE2_UNITS, 3: GRADE3_UNITS, 4: GRADE4_UNITS, 5: GRADE5_UNITS };
    const pool = gradeMap[grade] || [];
    return pool.map(u => ({
        unitId: u.unitId,
        unitNumber: u.unitNumber,
        grade: u.grade,
        title: u.title,
        titleVi: u.titleVi,
        textbook: u.textbook,
        vocabCount: u.vocabulary.length,
        patternCount: u.patterns.length,
    }));
}
