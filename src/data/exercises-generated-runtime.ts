/**
 * exercises-generated-runtime.ts — Runtime Exercise Generator
 * 
 * Replaces the 49,748-line static exercises-generated.ts file.
 * Generates identical exercises on-demand using deterministic algorithms.
 * 
 * Bundle impact: 49,748 lines → ~200 lines = 99.6% reduction (~2MB saved)
 */
import type { Exercise } from '@/types';

// ================================================================
// DETERMINISTIC PSEUDO-RANDOM — same seed → same output every time
// ================================================================
function seededRandom(seed: number): () => number {
    let s = seed;
    return () => {
        s = (s * 1664525 + 1013904223) & 0xFFFFFFFF;
        return (s >>> 0) / 0xFFFFFFFF;
    };
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

// ================================================================
// MATH EXERCISE GENERATOR
// ================================================================
interface MathSpec {
    a: number;
    b: number;
    op: '+' | '-';
}

function difficultyForSum(a: number, b: number): number {
    const result = a + b;
    if (result <= 10) return 2;
    if (result <= 50) return 3;
    return 4;
}

function difficultyForDiff(a: number): number {
    if (a <= 10) return 2;
    if (a <= 50) return 3;
    return 4;
}

function generateDistractors(answer: number, seed: number, count = 3): string[] {
    const rng = seededRandom(seed);
    const distractors = new Set<number>();
    
    // Strategy: nearby numbers + some random offsets
    const offsets = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
    const shuffledOffsets = shuffle(offsets, rng);
    
    for (const offset of shuffledOffsets) {
        if (distractors.size >= count) break;
        const d = answer + offset;
        if (d >= 0 && d !== answer) {
            distractors.add(d);
        }
    }
    
    // Fill remaining if needed
    while (distractors.size < count) {
        const d = Math.max(0, answer + Math.floor(rng() * 10) - 5);
        if (d !== answer) distractors.add(d);
    }
    
    return Array.from(distractors).slice(0, count).map(String);
}

function buildMathExercise(spec: MathSpec, index: number): Exercise {
    const { a, b, op } = spec;
    const answer = op === '+' ? a + b : a - b;
    const difficulty = op === '+' ? difficultyForSum(a, b) : difficultyForDiff(a);
    const tag = op === '+' ? 'addition' : 'subtraction';
    const opLabel = op === '+' ? 'cộng' : 'trừ';
    
    const distractors = generateDistractors(answer, index * 7919 + 42);
    const options = shuffle([String(answer), ...distractors], seededRandom(index * 3571 + 17));
    
    const hints = op === '+'
        ? ['Thử đếm thêm từ số lớn hơn nhé!', 'Tính cẩn thận ở hàng chục và hàng đơn vị.']
        : ['Thử đếm ngược từ số lớn hơn nhé!', `Bắt đầu từ ${a} và đếm lùi ${b} bước.`];
    
    return {
        id: `gen-math-${tag.slice(0, 3)}-\${${index + 1}}`,
        type: 'multiple_choice' as const,
        subject: 'Toán',
        difficulty,
        question: `${a} ${op} ${b} = ?`,
        options,
        correctAnswer: String(answer),
        hints,
        explanation: `${a} ${op} ${b} = ${answer}. Phép ${opLabel} cơ bản.`,
        tags: [tag, 'generated'],
    };
}

function generateMathSpecs(): MathSpec[] {
    const specs: MathSpec[] = [];
    
    // Addition: a + b for various ranges
    const addNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30, 32, 33, 34, 36, 38, 40, 42, 43, 44, 46, 47, 48, 50];
    for (let a = 1; a <= 50; a++) {
        for (const b of addNumbers) {
            if (a + b <= 100) {
                specs.push({ a, b, op: '+' });
            }
        }
    }
    
    // Subtraction: a - b for various ranges
    for (let a = 2; a <= 100; a++) {
        for (let b = 1; b < a && b <= 50; b++) {
            if (a - b >= 0 && (b <= 10 || b % 2 === 0 || b % 5 === 0)) {
                specs.push({ a, b, op: '-' });
            }
        }
    }
    
    return specs;
}

// ================================================================
// ELITE EXERCISE GENERATOR — more complex themed exercises
// ================================================================
interface EliteTemplate {
    category: string;
    tags: string[];
    templates: { question: string; answer: string; explanation: string }[];
}

const ELITE_TEMPLATES: EliteTemplate[] = [
    {
        category: 'civics',
        tags: ['civics', 'leadership', 'casel', 'generated'],
        templates: [
            { question: 'Trong quản lý dự án, nếu deadline = 30 ngày, đã dùng 18 ngày, còn bao nhiêu ngày?', answer: '12', explanation: '30 - 18 = 12 ngày còn lại.' },
            { question: 'Nhóm có 25 thành viên, chia 5 đội đều nhau. Mỗi đội có bao nhiêu người?', answer: '5', explanation: '25 ÷ 5 = 5 người/đội.' },
            { question: 'Ngân sách dự án 100 triệu, đã chi 64 triệu. Còn lại bao nhiêu phần trăm?', answer: '36', explanation: '100 - 64 = 36%.' },
        ],
    },
    {
        category: 'finance',
        tags: ['finance', 'risk', 'wef', 'generated'],
        templates: [
            { question: 'Đầu tư 1000, lãi suất 10%/năm. Sau 1 năm được bao nhiêu?', answer: '1100', explanation: '1000 × 1.10 = 1100.' },
            { question: 'Giá cổ phiếu từ 50 xuống 40. Giảm bao nhiêu phần trăm?', answer: '20', explanation: '(50-40)/50 × 100 = 20%.' },
            { question: 'Portfolio 60% cổ phiếu, 40% trái phiếu. Cổ phiếu trị giá 300 triệu. Tổng bao nhiêu?', answer: '500', explanation: '300/0.6 = 500 triệu.' },
        ],
    },
    {
        category: 'probability',
        tags: ['probability', 'game-theory', 'ncss', 'generated'],
        templates: [
            { question: 'Gieo xúc xắc 2 lần, xác suất được tổng = 7 là bao nhiêu phần 36?', answer: '6', explanation: 'Có 6 cách: (1,6)(2,5)(3,4)(4,3)(5,2)(6,1).' },
            { question: 'Rút 1 lá từ bộ 52 lá, xác suất rút được Ách (Ace) = bao nhiêu phần 52?', answer: '4', explanation: 'Có 4 lá Ách trong 52 lá.' },
            { question: 'Xác suất kỳ vọng = Giá trị × Xác suất. Nếu thưởng 81 điểm, xác suất 54%, kỳ vọng ≈?', answer: '44', explanation: '81 × 0.54 ≈ 44 điểm.' },
        ],
    },
    {
        category: 'systems',
        tags: ['systems', 'logistics', 'casel', 'generated'],
        templates: [
            { question: 'Hệ thống xử lý 100 request/giây, peak 500 request/giây. Scale gấp mấy lần?', answer: '5', explanation: '500/100 = 5 lần.' },
            { question: 'Server uptime 99.9%, downtime 1 năm = bao nhiêu phút? (525600 phút/năm)', answer: '526', explanation: '525600 × 0.001 ≈ 526 phút.' },
            { question: 'Logistics: 3 xe, mỗi xe chở 20 kiện, cần giao 100 kiện. Tối thiểu mấy chuyến?', answer: '2', explanation: '100/(3×20) = 1.67, làm tròn lên = 2 chuyến.' },
        ],
    },
];

function generateEliteExercises(): Exercise[] {
    const exercises: Exercise[] = [];
    let index = 0;
    
    for (const template of ELITE_TEMPLATES) {
        for (let repeat = 0; repeat < 8; repeat++) {
            for (const t of template.templates) {
                const seed = index * 9973 + 31;
                const rng = seededRandom(seed);
                const answer = parseInt(t.answer);
                const distractors = isNaN(answer) 
                    ? ['A', 'B', 'C']
                    : generateDistractors(answer, seed);
                const options = isNaN(answer)
                    ? [t.answer, ...distractors]
                    : shuffle([t.answer, ...distractors], rng);
                
                exercises.push({
                    id: `gen-elite-${template.category}-${index + 1}`,
                    type: 'multiple_choice' as const,
                    subject: 'Toán nâng cao',
                    difficulty: 5,
                    question: t.question,
                    options,
                    correctAnswer: t.answer,
                    hints: ['Phân tích cục diện từ quan điểm Hệ Thống (CASEL/WEF).'],
                    explanation: t.explanation,
                    tags: template.tags,
                });
                index++;
            }
        }
    }
    
    return exercises;
}

// ================================================================
// CACHED EXPORTS — generated once, reused everywhere
// ================================================================
let _mathGenerated: Exercise[] | null = null;
let _eliteGenerated: Exercise[] | null = null;

export function getMassiveMathGenerated(): Exercise[] {
    if (!_mathGenerated) {
        const specs = generateMathSpecs();
        _mathGenerated = specs.map((spec, i) => buildMathExercise(spec, i));
    }
    return _mathGenerated;
}

export function getMassiveEliteGenerated(): Exercise[] {
    if (!_eliteGenerated) {
        _eliteGenerated = generateEliteExercises();
    }
    return _eliteGenerated;
}

// Legacy compat — property-style access (getter-backed)
export const massiveMathGenerated: Exercise[] = [];
export const massiveEliteGenerated: Exercise[] = [];

// Patch the arrays on first access via seed.ts
export function initGeneratedData(): void {
    const math = getMassiveMathGenerated();
    const elite = getMassiveEliteGenerated();
    massiveMathGenerated.length = 0;
    massiveMathGenerated.push(...math);
    massiveEliteGenerated.length = 0;
    massiveEliteGenerated.push(...elite);
}
