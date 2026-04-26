// =====================================================
// Procedural Math Problem Generator
// Generates grade-appropriate math exercises dynamically
// Benchmark: Khan Academy Kids, IXL, GSM8K (OpenAI)
// =====================================================

export interface MathProblem {
    id: string;
    question: string;
    correctAnswer: string;
    explanation: string;
    difficulty: number;
    hints: string[];
    type: 'arithmetic' | 'word_problem' | 'comparison' | 'pattern';
    gradeLevel: number;
    topic: string;
}

type OperationType = '+' | '-' | 'x' | '/';

const GRADE_CONFIGS: Record<number, { maxNum: number; ops: OperationType[]; topics: string[] }> = {
    1: { maxNum: 20, ops: ['+', '-'], topics: ['Phép cộng', 'Phép trừ', 'So sánh'] },
    2: { maxNum: 100, ops: ['+', '-'], topics: ['Cộng có nhớ', 'Trừ có nhớ'] },
    3: { maxNum: 1000, ops: ['+', '-', 'x', '/'], topics: ['Nhân chia cơ bản', 'Đo lường'] },
    4: { maxNum: 10000, ops: ['+', '-', 'x', '/'], topics: ['Số lớn', 'Phân số'] },
    5: { maxNum: 100000, ops: ['+', '-', 'x', '/'], topics: ['Thập phân', 'Tỉ số'] },
};

function rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateId(): string {
    return `math-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function genAddition(grade: number): MathProblem {
    const cfg = GRADE_CONFIGS[grade] || GRADE_CONFIGS[1];
    const a = rand(1, cfg.maxNum);
    const b = rand(1, cfg.maxNum);
    return {
        id: generateId(),
        question: `${a} + ${b} = ?`,
        correctAnswer: String(a + b),
        explanation: `${a} cộng ${b} bằng ${a + b}.`,
        difficulty: grade,
        hints: ['Nhẩm từng hàng', `Kết quả lớn hơn ${a}`, `Đáp số: ${a + b}`],
        type: 'arithmetic',
        gradeLevel: grade,
        topic: 'Phép cộng',
    };
}

export function genWordProblem(grade: number): MathProblem {
    const cfg = GRADE_CONFIGS[grade] || GRADE_CONFIGS[1];
    const a = rand(2, Math.min(cfg.maxNum, 50));
    const b = rand(2, Math.min(cfg.maxNum, 50));

    return {
        id: generateId(),
        question: `Henry có ${a} cuốn sách. Ba mua thêm cho Henry ${b} cuốn nữa. Hỏi Henry có tất cả bao nhiêu cuốn sách?`,
        correctAnswer: String(a + b),
        explanation: `Henry có ${a} cuốn, thêm ${b} cuốn. Phép tính: ${a} + ${b} = ${a + b} cuốn.`,
        difficulty: grade,
        hints: ['Đọc kỹ từ khóa "thêm"', 'Đây là bài toán cộng', `Đáp số: ${a + b}`],
        type: 'word_problem',
        gradeLevel: grade,
        topic: 'Toán đố',
    };
}

export function generateDailyMathSet(grade: number): MathProblem[] {
    return [
        genAddition(grade),
        genWordProblem(grade),
        // Expandable to genSubtraction, genComparison, etc.
    ];
}
