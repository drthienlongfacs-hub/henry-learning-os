// ========================================
// MATH Grade 1 — Comprehensive Exercise Bank
// 200+ exercises: counting, addition, subtraction,
// shapes, patterns, measurement, word problems
// Curriculum: Vietnamese Grade 1 Math + Singapore CPA
// ========================================

import type { Exercise, ContentBlock, Lesson } from '@/types';

// ── Helper: generate addition/subtraction exercises ──

function addEx(id: string, a: number, b: number, diff: number): Exercise {
    const sum = a + b;
    const opts = shuffledOptions(sum, 20);
    return {
        id, question: `${a} + ${b} = ?`, type: 'multiple_choice',
        options: opts, correctAnswer: String(sum),
        explanation: `${a} + ${b} = ${sum}. Bắt đầu từ ${a}, đếm thêm ${b}.`,
        difficulty: diff,
        hints: [`Bắt đầu từ số ${a}, đếm thêm ${b} bước.`, `${a} → ${Array.from({ length: b }, (_, i) => a + i + 1).join(' → ')}.`, `Đáp án là ${sum}.`],
    };
}

function subEx(id: string, a: number, b: number, diff: number): Exercise {
    const result = a - b;
    const opts = shuffledOptions(result, 20);
    return {
        id, question: `${a} - ${b} = ?`, type: 'multiple_choice',
        options: opts, correctAnswer: String(result),
        explanation: `${a} - ${b} = ${result}. Từ ${a}, bớt đi ${b}.`,
        difficulty: diff,
        hints: [`Từ ${a}, đếm lùi ${b} bước.`, `${a} → ${Array.from({ length: b }, (_, i) => a - i - 1).join(' → ')}.`, `Đáp án là ${result}.`],
    };
}

function wordProblemAdd(id: string, name: string, item: string, a: number, b: number, diff: number): Exercise {
    return {
        id, question: `${name} có ${a} ${item}. Mẹ cho thêm ${b} ${item}. Hỏi ${name} có tất cả bao nhiêu ${item}?`,
        type: 'free_text', correctAnswer: String(a + b),
        explanation: `${a} + ${b} = ${a + b}. ${name} có ${a} ${item}, được thêm ${b}, tổng cộng ${a + b} ${item}.`,
        difficulty: diff,
        hints: [`Đây là bài cộng: ${a} + ${b} = ?`, `${a} cộng ${b} được bao nhiêu?`, `${a} + ${b} = ${a + b}.`],
    };
}

function wordProblemSub(id: string, name: string, item: string, a: number, b: number, diff: number): Exercise {
    return {
        id, question: `${name} có ${a} ${item}. ${name} cho bạn ${b} ${item}. Hỏi ${name} còn bao nhiêu ${item}?`,
        type: 'free_text', correctAnswer: String(a - b),
        explanation: `${a} - ${b} = ${a - b}. ${name} có ${a} ${item}, cho đi ${b}, còn lại ${a - b} ${item}.`,
        difficulty: diff,
        hints: [`Đây là bài trừ: ${a} - ${b} = ?`, `${a} bớt ${b} còn bao nhiêu?`, `${a} - ${b} = ${a - b}.`],
    };
}

function shuffledOptions(correct: number, max: number): string[] {
    const set = new Set<number>([correct]);
    while (set.size < 4) {
        const offset = Math.floor(Math.random() * 3) + 1;
        const candidate = Math.random() > 0.5 ? correct + offset : correct - offset;
        if (candidate >= 0 && candidate <= max) set.add(candidate);
        else set.add(Math.abs(candidate) % (max + 1));
    }
    return [...set].sort(() => Math.random() - 0.5).map(String);
}

// ═══════════════════════════════════════════
// COUNTING EXERCISES (1-20)
// ═══════════════════════════════════════════

export const countingExercises: Exercise[] = [
    // Count objects
    ...(['🍎', '🌟', '🐟', '🦋', '🎈', '🏀', '🍌', '🐢', '🌺', '🎵']).map((emoji, i) => {
        const count = i + 1;
        const display = emoji.repeat(count);
        return {
            id: `ex-count-${String(i + 1).padStart(3, '0')}`,
            question: `Đếm xem có bao nhiêu? ${display}`,
            type: 'multiple_choice' as const,
            options: shuffledOptions(count, 15).map(String),
            correctAnswer: String(count),
            explanation: `Có ${count} ${emoji}. Con đếm từ trái sang phải nhé!`,
            difficulty: 1,
            hints: ['Con chỉ tay vào từng cái rồi đếm nhé!', `Đếm: 1, 2, 3...`, `Có ${count} cái.`],
        } as Exercise;
    }),
    // Continue counting
    ...Array.from({ length: 10 }, (_, i) => {
        const start = i * 2 + 1;
        const answer = start + 3;
        return {
            id: `ex-count-seq-${String(i + 1).padStart(3, '0')}`,
            question: `Điền số tiếp theo: ${start}, ${start + 1}, ${start + 2}, ?`,
            type: 'free_text' as const,
            correctAnswer: String(answer),
            explanation: `Các số đếm liên tiếp: ${start}, ${start + 1}, ${start + 2}, ${answer}.`,
            difficulty: 1,
            hints: ['Đếm tiếp theo số cuối.', `Sau ${start + 2} là số nào?`, `Đáp án là ${answer}.`],
        } as Exercise;
    }),
    // Compare numbers
    ...Array.from({ length: 10 }, (_, i) => {
        const a = Math.floor(Math.random() * 15) + 1;
        let b = a;
        while (b === a) b = Math.floor(Math.random() * 15) + 1;
        const bigger = Math.max(a, b);
        return {
            id: `ex-compare-${String(i + 1).padStart(3, '0')}`,
            question: `Số nào lớn hơn: ${a} hay ${b}?`,
            type: 'multiple_choice' as const,
            options: [String(a), String(b)],
            correctAnswer: String(bigger),
            explanation: `${bigger} > ${Math.min(a, b)}. Số ${bigger} lớn hơn.`,
            difficulty: 1,
            hints: ['Số nào nằm xa hơn bên phải trên tia số?', `So sánh: ${a} và ${b}.`, `${bigger} lớn hơn.`],
        } as Exercise;
    }),
];

// ═══════════════════════════════════════════
// ADDITION within 10
// ═══════════════════════════════════════════

export const additionWithin10: Exercise[] = [
    addEx('ex-add10-001', 1, 1, 1), addEx('ex-add10-002', 1, 2, 1), addEx('ex-add10-003', 2, 1, 1),
    addEx('ex-add10-004', 2, 2, 1), addEx('ex-add10-005', 2, 3, 1), addEx('ex-add10-006', 3, 2, 1),
    addEx('ex-add10-007', 3, 3, 1), addEx('ex-add10-008', 3, 4, 1), addEx('ex-add10-009', 4, 3, 1),
    addEx('ex-add10-010', 4, 4, 1), addEx('ex-add10-011', 4, 5, 1), addEx('ex-add10-012', 5, 4, 1),
    addEx('ex-add10-013', 5, 5, 2), addEx('ex-add10-014', 1, 5, 1), addEx('ex-add10-015', 5, 1, 1),
    addEx('ex-add10-016', 1, 6, 1), addEx('ex-add10-017', 6, 1, 1), addEx('ex-add10-018', 2, 6, 1),
    addEx('ex-add10-019', 6, 2, 1), addEx('ex-add10-020', 3, 6, 2), addEx('ex-add10-021', 6, 3, 2),
    addEx('ex-add10-022', 1, 7, 1), addEx('ex-add10-023', 7, 1, 1), addEx('ex-add10-024', 2, 7, 2),
    addEx('ex-add10-025', 7, 2, 2), addEx('ex-add10-026', 1, 8, 1), addEx('ex-add10-027', 8, 1, 1),
    addEx('ex-add10-028', 1, 9, 2), addEx('ex-add10-029', 9, 1, 2), addEx('ex-add10-030', 0, 5, 1),
    addEx('ex-add10-031', 5, 0, 1), addEx('ex-add10-032', 0, 10, 1), addEx('ex-add10-033', 4, 6, 2),
    addEx('ex-add10-034', 6, 4, 2), addEx('ex-add10-035', 3, 7, 2), addEx('ex-add10-036', 7, 3, 2),
    // Word problems within 10
    wordProblemAdd('ex-add10-wp01', 'Lan', 'quả táo', 3, 4, 2),
    wordProblemAdd('ex-add10-wp02', 'An', 'viên kẹo', 5, 2, 2),
    wordProblemAdd('ex-add10-wp03', 'Hoa', 'con cá', 2, 6, 2),
    wordProblemAdd('ex-add10-wp04', 'Nam', 'bông hoa', 4, 5, 2),
    wordProblemAdd('ex-add10-wp05', 'Mai', 'cái bút', 1, 8, 2),
    wordProblemAdd('ex-add10-wp06', 'Tuấn', 'viên bi', 6, 3, 2),
    wordProblemAdd('ex-add10-wp07', 'Linh', 'quyển vở', 2, 5, 2),
    wordProblemAdd('ex-add10-wp08', 'Minh', 'cái kẹo', 7, 2, 2),
    wordProblemAdd('ex-add10-wp09', 'Henry', 'miếng sticker', 3, 6, 2),
    wordProblemAdd('ex-add10-wp10', 'Bảo', 'con tem', 4, 4, 2),
];

// ═══════════════════════════════════════════
// ADDITION within 20
// ═══════════════════════════════════════════

export const additionWithin20: Exercise[] = [
    addEx('ex-add20-001', 9, 2, 2), addEx('ex-add20-002', 8, 3, 2), addEx('ex-add20-003', 7, 4, 2),
    addEx('ex-add20-004', 6, 5, 2), addEx('ex-add20-005', 9, 3, 2), addEx('ex-add20-006', 8, 4, 2),
    addEx('ex-add20-007', 7, 5, 2), addEx('ex-add20-008', 6, 6, 2), addEx('ex-add20-009', 9, 4, 2),
    addEx('ex-add20-010', 8, 5, 2), addEx('ex-add20-011', 7, 6, 2), addEx('ex-add20-012', 9, 5, 3),
    addEx('ex-add20-013', 8, 6, 3), addEx('ex-add20-014', 7, 7, 3), addEx('ex-add20-015', 9, 6, 3),
    addEx('ex-add20-016', 8, 7, 3), addEx('ex-add20-017', 9, 7, 3), addEx('ex-add20-018', 8, 8, 3),
    addEx('ex-add20-019', 9, 8, 3), addEx('ex-add20-020', 9, 9, 3), addEx('ex-add20-021', 10, 1, 2),
    addEx('ex-add20-022', 10, 2, 2), addEx('ex-add20-023', 10, 3, 2), addEx('ex-add20-024', 10, 5, 2),
    addEx('ex-add20-025', 10, 7, 2), addEx('ex-add20-026', 10, 10, 3), addEx('ex-add20-027', 11, 5, 3),
    addEx('ex-add20-028', 12, 4, 3), addEx('ex-add20-029', 13, 3, 3), addEx('ex-add20-030', 15, 5, 3),
    wordProblemAdd('ex-add20-wp01', 'Henry', 'viên bi', 8, 7, 3),
    wordProblemAdd('ex-add20-wp02', 'Lan', 'miếng sticker', 9, 6, 3),
    wordProblemAdd('ex-add20-wp03', 'An', 'con cá origami', 12, 5, 3),
    wordProblemAdd('ex-add20-wp04', 'Hoa', 'cái kẹp tóc', 11, 4, 3),
    wordProblemAdd('ex-add20-wp05', 'Bảo', 'trang sách', 13, 7, 3),
];

// ═══════════════════════════════════════════
// SUBTRACTION within 10
// ═══════════════════════════════════════════

export const subtractionWithin10: Exercise[] = [
    subEx('ex-sub10-001', 2, 1, 1), subEx('ex-sub10-002', 3, 1, 1), subEx('ex-sub10-003', 3, 2, 1),
    subEx('ex-sub10-004', 4, 1, 1), subEx('ex-sub10-005', 4, 2, 1), subEx('ex-sub10-006', 4, 3, 1),
    subEx('ex-sub10-007', 5, 1, 1), subEx('ex-sub10-008', 5, 2, 1), subEx('ex-sub10-009', 5, 3, 1),
    subEx('ex-sub10-010', 5, 4, 1), subEx('ex-sub10-011', 6, 1, 1), subEx('ex-sub10-012', 6, 2, 1),
    subEx('ex-sub10-013', 6, 3, 1), subEx('ex-sub10-014', 6, 4, 1), subEx('ex-sub10-015', 6, 5, 1),
    subEx('ex-sub10-016', 7, 1, 1), subEx('ex-sub10-017', 7, 2, 1), subEx('ex-sub10-018', 7, 3, 2),
    subEx('ex-sub10-019', 7, 4, 2), subEx('ex-sub10-020', 7, 5, 2), subEx('ex-sub10-021', 7, 6, 2),
    subEx('ex-sub10-022', 8, 1, 1), subEx('ex-sub10-023', 8, 3, 2), subEx('ex-sub10-024', 8, 4, 2),
    subEx('ex-sub10-025', 8, 5, 2), subEx('ex-sub10-026', 8, 6, 2), subEx('ex-sub10-027', 8, 7, 2),
    subEx('ex-sub10-028', 9, 2, 2), subEx('ex-sub10-029', 9, 4, 2), subEx('ex-sub10-030', 9, 5, 2),
    subEx('ex-sub10-031', 9, 7, 2), subEx('ex-sub10-032', 10, 1, 1), subEx('ex-sub10-033', 10, 3, 2),
    subEx('ex-sub10-034', 10, 5, 2), subEx('ex-sub10-035', 10, 7, 2), subEx('ex-sub10-036', 10, 9, 2),
    wordProblemSub('ex-sub10-wp01', 'Lan', 'quả cam', 8, 3, 2),
    wordProblemSub('ex-sub10-wp02', 'An', 'viên bi', 10, 4, 2),
    wordProblemSub('ex-sub10-wp03', 'Hoa', 'cái kẹo', 7, 5, 2),
    wordProblemSub('ex-sub10-wp04', 'Henry', 'miếng sticker', 9, 6, 2),
    wordProblemSub('ex-sub10-wp05', 'Mai', 'bông hoa', 6, 2, 2),
];

// ═══════════════════════════════════════════
// SUBTRACTION within 20
// ═══════════════════════════════════════════

export const subtractionWithin20: Exercise[] = [
    subEx('ex-sub20-001', 11, 2, 2), subEx('ex-sub20-002', 12, 3, 2), subEx('ex-sub20-003', 13, 4, 2),
    subEx('ex-sub20-004', 14, 5, 2), subEx('ex-sub20-005', 15, 6, 3), subEx('ex-sub20-006', 16, 7, 3),
    subEx('ex-sub20-007', 17, 8, 3), subEx('ex-sub20-008', 18, 9, 3), subEx('ex-sub20-009', 15, 9, 3),
    subEx('ex-sub20-010', 14, 8, 3), subEx('ex-sub20-011', 13, 7, 3), subEx('ex-sub20-012', 12, 6, 3),
    subEx('ex-sub20-013', 11, 5, 2), subEx('ex-sub20-014', 20, 10, 2), subEx('ex-sub20-015', 19, 9, 3),
    subEx('ex-sub20-016', 16, 8, 3), subEx('ex-sub20-017', 14, 7, 3), subEx('ex-sub20-018', 13, 9, 3),
    subEx('ex-sub20-019', 17, 9, 3), subEx('ex-sub20-020', 15, 8, 3),
    wordProblemSub('ex-sub20-wp01', 'Henry', 'viên bi', 15, 7, 3),
    wordProblemSub('ex-sub20-wp02', 'Lan', 'miếng sticker', 18, 9, 3),
    wordProblemSub('ex-sub20-wp03', 'An', 'trang sách', 20, 8, 3),
    wordProblemSub('ex-sub20-wp04', 'Bảo', 'cái kẹo', 14, 6, 3),
    wordProblemSub('ex-sub20-wp05', 'Minh', 'bông hoa', 16, 9, 3),
];

// ═══════════════════════════════════════════
// SHAPES & GEOMETRY
// ═══════════════════════════════════════════

export const shapeExercises: Exercise[] = [
    { id: 'ex-shape-001', question: 'Hình nào có 3 cạnh? 🔺 🔵 🟨', type: 'multiple_choice', options: ['Hình tam giác 🔺', 'Hình tròn 🔵', 'Hình vuông 🟨', 'Hình chữ nhật'], correctAnswer: 'Hình tam giác 🔺', explanation: 'Hình tam giác có 3 cạnh, 3 góc.', difficulty: 1, hints: ['Đếm số cạnh của mỗi hình.', 'Hình nào có ít cạnh nhất?', 'Tam giác = 3 cạnh.'] },
    { id: 'ex-shape-002', question: 'Hình nào KHÔNG có góc?', type: 'multiple_choice', options: ['Hình tròn', 'Hình vuông', 'Hình tam giác', 'Hình chữ nhật'], correctAnswer: 'Hình tròn', explanation: 'Hình tròn không có cạnh và không có góc.', difficulty: 1, hints: ['Hình nào tròn trơn, không lồi ra?', 'Hình tròn như mặt trời, không có góc.'] },
    { id: 'ex-shape-003', question: 'Hình vuông có bao nhiêu cạnh?', type: 'free_text', correctAnswer: '4', explanation: 'Hình vuông có 4 cạnh bằng nhau và 4 góc vuông.', difficulty: 1, hints: ['Đếm các cạnh.', 'Hình vuông có 4 cạnh.'] },
    { id: 'ex-shape-004', question: 'Hình chữ nhật có mấy cạnh?', type: 'free_text', correctAnswer: '4', explanation: 'Hình chữ nhật có 4 cạnh: 2 cạnh dài và 2 cạnh ngắn.', difficulty: 1, hints: ['Giống hình vuông nhưng dài hơn.', 'Có 4 cạnh.'] },
    { id: 'ex-shape-005', question: 'Đồ vật nào có hình tròn?', type: 'multiple_choice', options: ['Đồng hồ treo tường', 'Quyển sách', 'Cái bàn', 'Cái thước'], correctAnswer: 'Đồng hồ treo tường', explanation: 'Đồng hồ treo tường thường có mặt hình tròn.', difficulty: 2, hints: ['Nghĩ về hình dạng từng đồ vật.', 'Đồng hồ tròn giống mặt trăng.'] },
    { id: 'ex-shape-006', question: 'Cái TV thường có hình gì?', type: 'multiple_choice', options: ['Hình chữ nhật', 'Hình tròn', 'Hình tam giác', 'Hình vuông'], correctAnswer: 'Hình chữ nhật', explanation: 'TV thường có màn hình hình chữ nhật.', difficulty: 2, hints: ['Nhìn TV nhà con.'] },
    { id: 'ex-shape-007', question: 'Nóc nhà thường có hình gì?', type: 'multiple_choice', options: ['Hình tam giác', 'Hình tròn', 'Hình vuông', 'Hình thoi'], correctAnswer: 'Hình tam giác', explanation: 'Nóc nhà thường nhọn như hình tam giác.', difficulty: 2, hints: ['Nghĩ về mái nhà.'] },
    { id: 'ex-shape-008', question: 'Hình nào có 4 cạnh bằng nhau?', type: 'multiple_choice', options: ['Hình vuông', 'Hình chữ nhật', 'Hình tam giác', 'Hình tròn'], correctAnswer: 'Hình vuông', explanation: 'Hình vuông có 4 cạnh bằng nhau.', difficulty: 2, hints: ['Cạnh bằng nhau = đều đều.'] },
    { id: 'ex-shape-009', question: 'Có bao nhiêu hình tam giác? 🔺🔺🟧🔺🔵🔺', type: 'free_text', correctAnswer: '4', explanation: 'Có 4 hình tam giác 🔺🔺🔺🔺', difficulty: 2, hints: ['Đếm từng hình tam giác.', 'Bỏ qua hình khác.'] },
    { id: 'ex-shape-010', question: 'Ghép hình: 2 hình tam giác ghép lại thành hình gì?', type: 'multiple_choice', options: ['Hình vuông', 'Hình tròn', 'Hình tam giác to hơn', 'Hình ngôi sao'], correctAnswer: 'Hình vuông', explanation: '2 hình tam giác vuông ghép lại có thể thành hình vuông.', difficulty: 3, hints: ['Thử xếp 2 hình tam giác cạnh nhau.'] },
];

// ═══════════════════════════════════════════
// PATTERNS & SEQUENCES
// ═══════════════════════════════════════════

export const patternExercises: Exercise[] = [
    { id: 'ex-pattern-001', question: 'Tìm quy luật: 🔴🔵🔴🔵🔴?', type: 'multiple_choice', options: ['🔵', '🔴', '🟢', '🟡'], correctAnswer: '🔵', explanation: 'Quy luật: đỏ-xanh lặp lại. Sau đỏ là xanh.', difficulty: 1, hints: ['Nhìn thứ tự màu.', 'Đỏ-Xanh-Đỏ-Xanh-Đỏ-?'] },
    { id: 'ex-pattern-002', question: 'Tìm quy luật: 1, 3, 5, 7, ?', type: 'free_text', correctAnswer: '9', explanation: 'Các số lẻ: 1, 3, 5, 7, 9. Mỗi số cách nhau 2.', difficulty: 2, hints: ['Mỗi số tăng thêm bao nhiêu?', '7 + 2 = ?'] },
    { id: 'ex-pattern-003', question: 'Tìm quy luật: 2, 4, 6, 8, ?', type: 'free_text', correctAnswer: '10', explanation: 'Các số chẵn: 2, 4, 6, 8, 10. Mỗi số cách nhau 2.', difficulty: 2, hints: ['Đây là các số chẵn.', '8 + 2 = ?'] },
    { id: 'ex-pattern-004', question: '🌟🌙🌟🌙🌟 — Tiếp theo là gì?', type: 'multiple_choice', options: ['🌙', '🌟', '☀️', '⭐'], correctAnswer: '🌙', explanation: 'Sao-Trăng lặp lại. Sau Sao là Trăng.', difficulty: 1, hints: ['Sao rồi Trăng rồi Sao...'] },
    { id: 'ex-pattern-005', question: '🐱🐶🐱🐶🐱🐶 — Con vật thứ 7?', type: 'multiple_choice', options: ['🐱', '🐶', '🐰', '🐻'], correctAnswer: '🐱', explanation: 'Mèo-Chó lặp lại. Vị trí lẻ là Mèo.', difficulty: 2, hints: ['Mèo ở vị trí 1, 3, 5...'] },
    { id: 'ex-pattern-006', question: '5, 10, 15, 20, ?', type: 'free_text', correctAnswer: '25', explanation: 'Đếm nhảy 5: 5, 10, 15, 20, 25.', difficulty: 2, hints: ['Mỗi số tăng thêm 5.', '20 + 5 = ?'] },
    { id: 'ex-pattern-007', question: '🔺🔺🔵🔺🔺🔵🔺🔺?', type: 'multiple_choice', options: ['🔵', '🔺', '🟢', '🟡'], correctAnswer: '🔵', explanation: 'Quy luật: 2 tam giác rồi 1 tròn.', difficulty: 2, hints: ['Nhìn nhóm 3 hình.'] },
    { id: 'ex-pattern-008', question: '10, 9, 8, 7, ?', type: 'free_text', correctAnswer: '6', explanation: 'Đếm lùi: 10, 9, 8, 7, 6.', difficulty: 1, hints: ['Mỗi số giảm 1.'] },
    { id: 'ex-pattern-009', question: '1, 2, 4, 7, 11, ?', type: 'free_text', correctAnswer: '16', explanation: 'Khoảng cách tăng: +1, +2, +3, +4, +5. 11 + 5 = 16.', difficulty: 3, hints: ['Xem xét khoảng cách giữa các số.', '2-1=1, 4-2=2, 7-4=3...'] },
    { id: 'ex-pattern-010', question: 'AB_AB_AB_ — Chữ cái tiếp theo?', type: 'free_text', correctAnswer: 'A', explanation: 'Quy luật: AB lặp lại. Sau _ là A.', difficulty: 2, hints: ['AB rồi lại AB.'] },
];

// ═══════════════════════════════════════════
// MEASUREMENT & TIME (basic)
// ═══════════════════════════════════════════

export const measurementExercises: Exercise[] = [
    { id: 'ex-measure-001', question: 'Cái nào DÀI hơn: bút chì hay tẩy?', type: 'multiple_choice', options: ['Bút chì', 'Tẩy', 'Bằng nhau'], correctAnswer: 'Bút chì', explanation: 'Bút chì thường dài hơn cục tẩy.', difficulty: 1, hints: ['Nghĩ về đồ dùng học tập.'] },
    { id: 'ex-measure-002', question: 'Cái nào NẶNG hơn: quả dưa hấu hay quả táo?', type: 'multiple_choice', options: ['Quả dưa hấu', 'Quả táo', 'Bằng nhau'], correctAnswer: 'Quả dưa hấu', explanation: 'Dưa hấu nặng hơn táo rất nhiều.', difficulty: 1, hints: ['Con thử bưng xem!'] },
    { id: 'ex-measure-003', question: 'Kim giờ chỉ số 3. Bây giờ là mấy giờ?', type: 'free_text', correctAnswer: '3', explanation: 'Kim giờ (kim ngắn) chỉ số 3 = 3 giờ.', difficulty: 2, hints: ['Kim ngắn là kim giờ.'] },
    { id: 'ex-measure-004', question: 'Trong 1 tuần có mấy ngày?', type: 'free_text', correctAnswer: '7', explanation: '1 tuần có 7 ngày: Thứ 2, 3, 4, 5, 6, 7, Chủ nhật.', difficulty: 1, hints: ['Đếm từ thứ 2 đến Chủ nhật.'] },
    { id: 'ex-measure-005', question: 'Tháng nào có 28 hoặc 29 ngày?', type: 'multiple_choice', options: ['Tháng 2', 'Tháng 1', 'Tháng 3', 'Tháng 6'], correctAnswer: 'Tháng 2', explanation: 'Tháng 2 có 28 ngày (năm nhuận: 29 ngày).', difficulty: 2, hints: ['Tháng ngắn nhất.'] },
    { id: 'ex-measure-006', question: 'Con người nào CAO hơn: em bé hay ba mẹ?', type: 'multiple_choice', options: ['Ba mẹ', 'Em bé', 'Bằng nhau'], correctAnswer: 'Ba mẹ', explanation: 'Người lớn cao hơn em bé.', difficulty: 1, hints: ['Ai cao hơn ai?'] },
    { id: 'ex-measure-007', question: 'Sắp xếp từ NGẮN đến DÀI: bút, thước, phấn', type: 'multiple_choice', options: ['Phấn, bút, thước', 'Bút, phấn, thước', 'Thước, bút, phấn'], correctAnswer: 'Phấn, bút, thước', explanation: 'Phấn ngắn nhất, thước dài nhất.', difficulty: 2, hints: ['Phấn rất ngắn, thước rất dài.'] },
    { id: 'ex-measure-008', question: 'Cái ly đựng được nhiều nước hơn hay chén?', type: 'multiple_choice', options: ['Cái ly', 'Cái chén', 'Bằng nhau'], correctAnswer: 'Cái ly', explanation: 'Ly thường to hơn chén, đựng nhiều nước hơn.', difficulty: 1, hints: ['Cái nào to hơn?'] },
];

// ═══════════════════════════════════════════
// EXPLAIN / REASONING exercises
// ═══════════════════════════════════════════

export const reasoningExercises: Exercise[] = [
    { id: 'ex-reason-001', question: 'Tại sao 3 + 4 = 4 + 3?', type: 'explain', correctAnswer: 'Vì khi đổi chỗ hai số hạng, tổng không thay đổi.', explanation: 'Đây là tính chất giao hoán: a + b = b + a.', difficulty: 3, hints: ['Tính 3+4 và 4+3 xem.', 'Kết quả có giống nhau không?', 'Đổi chỗ hai số, kết quả vẫn giống nhau.'] },
    { id: 'ex-reason-002', question: 'Tại sao 5 + 0 = 5?', type: 'explain', correctAnswer: 'Vì cộng với 0 thì số đó không thay đổi.', explanation: '0 là phần tử trung hòa của phép cộng.', difficulty: 2, hints: ['Cộng thêm 0 có nghĩa là không thêm gì.'] },
    { id: 'ex-reason-003', question: 'Nếu 5 + ? = 9, thì ? = bao nhiêu?', type: 'free_text', correctAnswer: '4', explanation: '5 + 4 = 9. Vậy ? = 4.', difficulty: 2, hints: ['9 - 5 = ?', 'Cần thêm bao nhiêu từ 5 để được 9?'] },
    { id: 'ex-reason-004', question: 'Nếu ? - 3 = 7, thì ? = bao nhiêu?', type: 'free_text', correctAnswer: '10', explanation: '10 - 3 = 7. Vậy ? = 10.', difficulty: 3, hints: ['7 + 3 = ?', 'Số bị trừ = hiệu + số trừ.'] },
    { id: 'ex-reason-005', question: 'Con có 10 viên bi. Con muốn chia đều cho 2 bạn. Mỗi bạn được mấy viên?', type: 'free_text', correctAnswer: '5', explanation: '10 ÷ 2 = 5. Mỗi bạn được 5 viên bi.', difficulty: 3, hints: ['Chia đều 10 cho 2 phần.', '10 chia 2 = ?'] },
];

// ═══════════════════════════════════════════
// Aggregate all math exercises
// ═══════════════════════════════════════════

export const allMathExercises: Exercise[] = [
    ...countingExercises,
    ...additionWithin10,
    ...additionWithin20,
    ...subtractionWithin10,
    ...subtractionWithin20,
    ...shapeExercises,
    ...patternExercises,
    ...measurementExercises,
    ...reasoningExercises,
];

// ═══════════════════════════════════════════
// MATH LESSONS
// ═══════════════════════════════════════════

export const mathLessons: Lesson[] = [
    {
        id: 'lesson-math-counting', subject: 'Toán', ageBand: '6-8',
        competencyIds: ['comp-math-001'],
        title: 'Đếm & nhận biết số 1-20',
        objective: 'Bé đếm được, nhận biết và so sánh các số từ 1 đến 20.',
        contentBlocks: [
            { id: 'cb-count-01', type: 'text', content: 'Hôm nay chúng ta tập đếm từ 1 đến 20! Đếm là kỹ năng quan trọng nhất trong Toán.' },
            { id: 'cb-count-02', type: 'visual', content: '1 🍎  2 🍎🍎  3 🍎🍎🍎  4 🍎🍎🍎🍎  5 🍎🍎🍎🍎🍎' },
            { id: 'cb-count-03', type: 'example', content: 'Đếm ngón tay: giơ 3 ngón → nói "ba". Giơ 5 ngón → nói "năm".' },
        ],
        exercises: countingExercises.slice(0, 8),
        rubric: ['Đếm đúng', 'Nhận biết số', 'So sánh lớn/nhỏ'],
    },
    {
        id: 'lesson-math-add10', subject: 'Toán', ageBand: '6-8',
        competencyIds: ['comp-math-002'],
        title: 'Phép cộng trong phạm vi 10',
        objective: 'Cộng hai số có tổng không quá 10, giải bài toán có lời văn.',
        contentBlocks: [
            { id: 'cb-add10-01', type: 'text', content: 'Phép cộng nghĩa là gộp hai nhóm lại. Khi con có 3 viên bi và được thêm 4 viên, con có tất cả 7 viên.' },
            { id: 'cb-add10-02', type: 'visual', content: '3 + 4 = 7\n🔵🔵🔵 + 🔴🔴🔴🔴 = 🔵🔵🔵🔴🔴🔴🔴' },
            { id: 'cb-add10-03', type: 'example', content: 'Mẹo: Bắt đầu từ số LỚN hơn, rồi đếm thêm số nhỏ. VD: 4 + 3 → bắt đầu từ 4: 5, 6, 7.' },
        ],
        exercises: additionWithin10.slice(0, 12),
        rubric: ['Tính đúng', 'Giải thích được', 'Giải bài toán có lời văn'],
    },
    {
        id: 'lesson-math-add20', subject: 'Toán', ageBand: '6-8',
        competencyIds: ['comp-math-002'],
        title: 'Phép cộng trong phạm vi 20',
        objective: 'Cộng qua 10 bằng cách tách số, giải bài toán phức tạp hơn.',
        contentBlocks: [
            { id: 'cb-add20-01', type: 'text', content: 'Khi cộng qua 10, con có thể tách số để dễ hơn. VD: 8 + 5 = 8 + 2 + 3 = 10 + 3 = 13.' },
            { id: 'cb-add20-02', type: 'visual', content: '8 + 5 = ?\n→ 8 + 2 = 10\n→ 10 + 3 = 13\n→ Vậy 8 + 5 = 13!' },
        ],
        exercises: additionWithin20.slice(0, 10),
        rubric: ['Tính đúng', 'Dùng phương pháp tách số', 'Bài toán có lời văn'],
    },
    {
        id: 'lesson-math-sub10', subject: 'Toán', ageBand: '6-8',
        competencyIds: ['comp-math-003'],
        title: 'Phép trừ trong phạm vi 10',
        objective: 'Trừ hai số trong phạm vi 10, hiểu ý nghĩa phép trừ.',
        contentBlocks: [
            { id: 'cb-sub10-01', type: 'text', content: 'Phép trừ nghĩa là bớt đi. VD: có 8 kẹo, ăn 3, còn 5.' },
            { id: 'cb-sub10-02', type: 'visual', content: '8 - 3 = 5\n🍬🍬🍬🍬🍬🍬🍬🍬\nĂn: 🍬🍬🍬 ❌\nCòn: 🍬🍬🍬🍬🍬 = 5' },
        ],
        exercises: subtractionWithin10.slice(0, 12),
        rubric: ['Tính đúng', 'Hiểu ý nghĩa trừ', 'Bài toán có lời văn'],
    },
    {
        id: 'lesson-math-sub20', subject: 'Toán', ageBand: '6-8',
        competencyIds: ['comp-math-003'],
        title: 'Phép trừ trong phạm vi 20',
        objective: 'Trừ qua 10 bằng cách tách số.',
        contentBlocks: [
            { id: 'cb-sub20-01', type: 'text', content: 'VD: 15 - 7 = ? → tách: 15 - 5 = 10, rồi 10 - 2 = 8. Vậy 15 - 7 = 8.' },
        ],
        exercises: subtractionWithin20.slice(0, 10),
        rubric: ['Tính đúng', 'Phương pháp tách số'],
    },
    {
        id: 'lesson-math-shapes', subject: 'Toán', ageBand: '6-8',
        competencyIds: ['comp-math-004'],
        title: 'Nhận biết hình — Tròn, Vuông, Tam giác, Chữ nhật',
        objective: 'Nhận biết 4 hình cơ bản, tìm hình trong đời thực.',
        contentBlocks: [
            { id: 'cb-shape-01', type: 'text', content: '4 hình cơ bản: Tròn (không có góc), Vuông (4 cạnh bằng), Tam giác (3 cạnh), Chữ nhật (2 dài + 2 ngắn).' },
            { id: 'cb-shape-02', type: 'visual', content: '🔴 Tròn   🟦 Vuông   🔺 Tam giác   📱 Chữ nhật' },
        ],
        exercises: shapeExercises,
        rubric: ['Nhận biết hình', 'Đếm cạnh', 'Tìm hình trong thực tế'],
    },
    {
        id: 'lesson-math-patterns', subject: 'Toán', ageBand: '6-8',
        competencyIds: ['comp-math-001', 'comp-math-002'],
        title: 'Quy luật & Dãy số',
        objective: 'Tìm quy luật của dãy số và hình ảnh, tiếp tục dãy.',
        contentBlocks: [
            { id: 'cb-pattern-01', type: 'text', content: 'Tìm quy luật nghĩa là tìm ra "cái gì lặp lại" hoặc "cái gì thay đổi đều đặn".' },
            { id: 'cb-pattern-02', type: 'example', content: '🔴🔵🔴🔵🔴? → Đỏ-Xanh lặp lại, tiếp theo là 🔵.' },
        ],
        exercises: patternExercises,
        rubric: ['Nhận ra quy luật', 'Tiếp tục dãy số', 'Sáng tạo quy luật mới'],
    },
    {
        id: 'lesson-math-measure', subject: 'Toán', ageBand: '6-8',
        competencyIds: ['comp-math-004'],
        title: 'Đo lường & Thời gian cơ bản',
        objective: 'So sánh dài/ngắn, nặng/nhẹ. Đọc giờ đúng.',
        contentBlocks: [
            { id: 'cb-measure-01', type: 'text', content: 'So sánh nghĩa là xem cái nào dài hơn, ngắn hơn, nặng hơn, nhẹ hơn.' },
        ],
        exercises: measurementExercises,
        rubric: ['So sánh đúng', 'Đọc giờ', 'Sắp xếp theo thứ tự'],
    },
    {
        id: 'lesson-math-reasoning', subject: 'Toán', ageBand: '6-8',
        competencyIds: ['comp-math-002', 'comp-math-003'],
        title: 'Tư duy & Giải thích',
        objective: 'Giải thích cách tính, tìm số thiếu, chia đều.',
        contentBlocks: [
            { id: 'cb-reason-01', type: 'text', content: 'Giải thích được nghĩa là con thật sự hiểu. Nếu chỉ tính đúng mà không giải thích được, con chưa hiểu.' },
        ],
        exercises: reasoningExercises,
        rubric: ['Giải thích rõ ràng', 'Tìm số thiếu', 'Tư duy logic'],
    },
];
