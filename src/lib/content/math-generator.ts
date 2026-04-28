// =====================================================
// Comprehensive Math Generator — CT 2018 Grades 1-5
// Sources: CT 2018 (TT 32/2018), US Common Core, Cambridge Primary, ACARA
// =====================================================

export interface MathProblem {
    id: string;
    question: string;
    correctAnswer: string;
    options?: string[];         // For MCQ mode
    illustration?: string;      // Added for visual gamification
    explanation: string;
    difficulty: number;         // 1-5
    hints: string[];
    type: 'arithmetic' | 'word_problem' | 'comparison' | 'pattern' | 'geometry' | 'measurement' | 'fraction' | 'data';
    gradeLevel: number;
    topic: string;
    topicKey: string;           // Machine-readable topic key
}

// ── Helpers ──
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const genId = () => `math-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const shuffle = <T>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) { const j = rand(0, i);[a[i], a[j]] = [a[j], a[i]]; }
    return a;
};
const makeOptions = (correct: number, range: number = 5): string[] => {
    const opts = new Set<number>([correct]);
    while (opts.size < 4) opts.add(correct + rand(-range, range));
    opts.delete(correct); // re-add to ensure position randomized
    const arr = shuffle([...opts].slice(0, 3).concat(correct));
    return arr.map(String);
};

// ══════════════════════════════════════════════
// GRADE 1: Numbers 1-20, +/- within 10, shapes
// ══════════════════════════════════════════════

export function genAddSub10(): MathProblem {
    const isAdd = Math.random() > 0.5;
    const a = rand(1, 9);
    const b = isAdd ? rand(1, 10 - a) : rand(1, a);
    const ans = isAdd ? a + b : a - b;
    const op = isAdd ? '+' : '-';
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'arithmetic', topic: isAdd ? 'Phép cộng trong 10' : 'Phép trừ trong 10',
        topicKey: 'add_sub_10',
        question: `${a} ${op} ${b} = ?`,
        correctAnswer: String(ans),
        options: makeOptions(ans, 3),
        illustration: '/images/core/addition.png',
        explanation: `${a} ${op} ${b} = ${ans}`,
        hints: [isAdd ? 'Đếm thêm từ số lớn' : 'Đếm lùi từ số đầu', `Đáp số: ${ans}`],
    };
}

export function genCount20(): MathProblem {
    const templates = [
        () => { const n = rand(11, 20); return { q: `Số nào lớn hơn: ${n} hay ${n - rand(1, 5)}?`, a: n, e: `${n} lớn hơn vì đứng xa hơn trên trục số.` }; },
        () => { const n = rand(1, 18); return { q: `Đếm tiếp 2 số: ${n}, ${n + 1}, ___`, a: n + 2, e: `Mỗi số tăng thêm 1, nên tiếp theo là ${n + 2}.` }; },
        () => { const n = rand(11, 19); const c = n % 10; const d = Math.floor(n / 10); return { q: `Phân tích: ${n} = ___ chục ___ đơn vị`, a: n, e: `${n} = ${d} chục ${c} đơn vị.` }; },
    ];
    const t = templates[rand(0, templates.length - 1)]();
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'comparison', topic: 'Số đến 20', topicKey: 'count_20',
        question: t.q, correctAnswer: String(t.a),
        options: makeOptions(t.a, 3),
        illustration: '/images/core/apples_100.jpg',
        explanation: t.e, hints: ['Dùng ngón tay đếm', `Đáp số: ${t.a}`],
    };
}

export function genShapesG1(): MathProblem {
    const shapes = [
        { name: 'hình vuông', sides: 4, desc: 'có 4 cạnh bằng nhau, 4 góc vuông' },
        { name: 'hình tròn', sides: 0, desc: 'không có cạnh, không có góc' },
        { name: 'hình tam giác', sides: 3, desc: 'có 3 cạnh, 3 góc' },
        { name: 'hình chữ nhật', sides: 4, desc: 'có 4 cạnh, 2 cạnh dài bằng nhau, 2 cạnh ngắn bằng nhau' },
    ];
    const s = shapes[rand(0, shapes.length - 1)];
    const templates = [
        { q: `Hình nào có ${s.sides} cạnh? (${shapes.map(x => x.name).join(', ')})`, a: s.name, e: `${s.name} ${s.desc}.` },
        { q: `${s.name} có bao nhiêu cạnh?`, a: String(s.sides), e: `${s.name} ${s.desc}, nên có ${s.sides} cạnh.` },
    ];
    const t = templates[rand(0, 1)];
    const opts = t.a === s.name ? shuffle(shapes.map(x => x.name)) : ['0', '3', '4', '5'];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'geometry', topic: 'Hình học cơ bản', topicKey: 'shapes_g1',
        question: t.q, correctAnswer: t.a,
        options: opts,
        illustration: '/images/core/shapes_g1.png',
        explanation: t.e, hints: ['Đếm số cạnh', `Đáp số: ${t.a}`],
    };
}

export function genCompareG1(): MathProblem {
    const a = rand(1, 20), b = rand(1, 20);
    const sign = a > b ? '>' : a < b ? '<' : '=';
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'comparison', topic: 'So sánh số', topicKey: 'compare_g1',
        question: `Điền dấu (>, <, =): ${a} ___ ${b}`,
        correctAnswer: sign,
        options: ['>', '<', '='],
        illustration: '/images/core/compare.png',
        explanation: `${a} ${sign} ${b} vì ${a > b ? `${a} lớn hơn ${b}` : a < b ? `${a} nhỏ hơn ${b}` : 'hai số bằng nhau'}.`,
        hints: ['Số nào xa 0 hơn thì lớn hơn', `Đáp số: ${sign}`],
    };
}

// ══════════════════════════════════════════════
// GRADE 2: Numbers to 100, carrying, clock, cm
// ══════════════════════════════════════════════

export function genAddSubCarry(): MathProblem {
    const isAdd = Math.random() > 0.5;
    const a = rand(10, 99);
    const b = isAdd ? rand(1, 99 - a) : rand(1, a);
    const ans = isAdd ? a + b : a - b;
    const op = isAdd ? '+' : '-';
    const hasCarry = isAdd ? (a % 10 + b % 10 >= 10) : (a % 10 < b % 10);
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'arithmetic', topic: hasCarry ? (isAdd ? 'Cộng có nhớ' : 'Trừ có mượn') : (isAdd ? 'Cộng không nhớ' : 'Trừ không mượn'),
        topicKey: 'add_sub_carry',
        question: `${a} ${op} ${b} = ?`, correctAnswer: String(ans),
        options: makeOptions(ans, 10),
        illustration: '/images/core/column_addition.png',
        explanation: `Đặt tính: ${a} ${op} ${b} = ${ans}.${hasCarry ? (isAdd ? ' Nhớ 1 sang hàng chục.' : ' Mượn 1 từ hàng chục.') : ''}`,
        hints: ['Đặt tính dọc, tính từ hàng đơn vị', hasCarry ? 'Chú ý nhớ/mượn!' : 'Phép tính đơn giản', `Đáp số: ${ans}`],
    };
}

export function genClock(): MathProblem {
    const hour = rand(1, 12);
    const minType = rand(0, 3); // 0=:00, 1=:15, 2=:30, 3=:45
    const mins = [0, 15, 30, 45][minType];
    const display = `${hour}:${mins.toString().padStart(2, '0')}`;
    const words = mins === 0 ? `${hour} giờ đúng` : `${hour} giờ ${mins} phút`;
    const templates = [
        { q: `Kim ngắn chỉ ${hour}, kim dài chỉ ${mins === 0 ? 12 : mins / 5}. Mấy giờ?`, a: display, e: `Kim ngắn = giờ (${hour}), kim dài = phút (${mins}). Vậy là ${words}.` },
        { q: `${words} — viết theo số: ?`, a: display, e: `${words} = ${display}.` },
    ];
    const t = templates[rand(0, 1)];
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'measurement', topic: 'Xem đồng hồ', topicKey: 'clock',
        question: t.q, correctAnswer: t.a,
        options: t.q.includes('số') ? [t.a, `${hour}:${(mins + 15) % 60 === 0 ? '00' : mins + 15}`, `${(hour % 12) + 1}:${mins === 0 ? '00' : mins}`] : [t.a, `${hour + 1} giờ đúng`, '12 giờ đúng'],
        illustration: '/images/core/clock.png',
        explanation: t.e, hints: ['Kim ngắn = giờ, kim dài = phút', `Đáp số: ${t.a}`],
    };
}

export function genMeasureCm(): MathProblem {
    const items = ['bút chì', 'tẩy', 'cây thước', 'sách', 'hộp bút', 'lá cây'];
    const item = items[rand(0, items.length - 1)];
    const len = rand(3, 30);
    const templates = [
        { q: `Cây ${item} dài ${len} cm. Đổi sang mm: ${len} cm = ___ mm`, a: len * 10, e: `1 cm = 10 mm. Nên ${len} cm = ${len} × 10 = ${len * 10} mm.` },
        () => { const a = rand(5, 20), b = rand(5, 20); return { q: `Sợi dây dài ${a} cm, cắt bớt ${Math.min(a, b)} cm. Còn lại bao nhiêu cm?`, a: a - Math.min(a, b), e: `${a} - ${Math.min(a, b)} = ${a - Math.min(a, b)} cm.` }; },
    ];
    const t = typeof templates[0] === 'function' ? (templates[0] as Function)() : rand(0, 1) === 0 ? templates[0] : (templates[1] as Function)();
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'measurement', topic: 'Đo độ dài (cm, mm)', topicKey: 'measure_cm',
        question: t.q, correctAnswer: String(t.a),
        options: makeOptions(t.a, 10),
        illustration: '/images/core/wooden_ruler.jpg',
        explanation: t.e, hints: ['1 cm = 10 mm', `Đáp số: ${t.a}`],
    };
}

export function genWordProbG2(): MathProblem {
    const names = ['Henry', 'An', 'Bình', 'Cúc', 'Dũng', 'Mai'];
    const n1 = names[rand(0, names.length - 1)];
    const contexts = [
        () => { const a = rand(10, 50), b = rand(10, 50 - a > 0 ? 50 - a : 10); return { q: `${n1} có ${a} viên bi. Bạn cho thêm ${b} viên. ${n1} có tất cả bao nhiêu viên bi?`, a: a + b, e: `${a} + ${b} = ${a + b} viên bi.` }; },
        () => { const a = rand(20, 80), b = rand(5, a); return { q: `Lớp có ${a} học sinh. Hôm nay nghỉ ${b} bạn. Hỏi có bao nhiêu bạn đi học?`, a: a - b, e: `${a} - ${b} = ${a - b} bạn đi học.` }; },
        () => { const a = rand(10, 50), b = rand(10, 50); return { q: `${n1} có ${a} quyển vở, mua thêm ${b} quyển. Hỏi tất cả có bao nhiêu quyển?`, a: a + b, e: `${a} + ${b} = ${a + b} quyển vở.` }; },
    ];
    const c = contexts[rand(0, contexts.length - 1)]();
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'word_problem', topic: 'Toán đố lớp 2', topicKey: 'word_g2',
        question: c.q, correctAnswer: String(c.a),
        options: makeOptions(c.a, 10),
        illustration: '/images/core/girl_thinking.png',
        explanation: c.e, hints: ['Tìm từ khóa: "thêm" = cộng, "bớt/nghỉ" = trừ', `Đáp số: ${c.a}`],
    };
}

// ══════════════════════════════════════════════
// GRADE 3: ×÷ basic, numbers to 1000, perimeter
// ══════════════════════════════════════════════

export function genMultDiv(): MathProblem {
    const isMult = Math.random() > 0.4;
    if (isMult) {
        const a = rand(2, 9), b = rand(2, 9);
        const ans = a * b;
        return {
            id: genId(), gradeLevel: 3, difficulty: 3,
            type: 'arithmetic', topic: 'Phép nhân', topicKey: 'mult_div',
            question: `${a} × ${b} = ?`, correctAnswer: String(ans),
            options: makeOptions(ans, 10),
            illustration: '/images/core/multiplication.png',
            explanation: `${a} × ${b} = ${ans} (${a} nhóm, mỗi nhóm ${b}).`,
            hints: [`Đếm ${a} lần ${b}`, `Bảng nhân ${a}`, `Đáp số: ${ans}`],
        };
    } else {
        const b = rand(2, 9), ans = rand(2, 9);
        const a = b * ans;
        return {
            id: genId(), gradeLevel: 3, difficulty: 3,
            type: 'arithmetic', topic: 'Phép chia', topicKey: 'mult_div',
            question: `${a} ÷ ${b} = ?`, correctAnswer: String(ans),
            options: makeOptions(ans, 5),
            illustration: '/images/core/division.png',
            explanation: `${a} ÷ ${b} = ${ans} (chia ${a} thành ${b} nhóm bằng nhau).`,
            hints: ['Phép chia ngược lại nhân', `${b} × ? = ${a}`, `Đáp số: ${ans}`],
        };
    }
}

export function genPerimeter(): MathProblem {
    const shapes = [
        () => { const s = rand(2, 15); return { q: `Hình vuông cạnh ${s} cm. Tính chu vi.`, a: s * 4, e: `Chu vi hình vuông = 4 × cạnh = 4 × ${s} = ${s * 4} cm.` }; },
        () => { const l = rand(5, 20), w = rand(2, l); return { q: `Hình chữ nhật dài ${l} cm, rộng ${w} cm. Tính chu vi.`, a: (l + w) * 2, e: `Chu vi HCN = (dài + rộng) × 2 = (${l} + ${w}) × 2 = ${(l + w) * 2} cm.` }; },
        () => { const a = rand(3, 10), b = rand(3, 10), c = rand(3, 10); return { q: `Tam giác có 3 cạnh: ${a} cm, ${b} cm, ${c} cm. Tính chu vi.`, a: a + b + c, e: `Chu vi tam giác = tổng 3 cạnh = ${a} + ${b} + ${c} = ${a + b + c} cm.` }; },
    ];
    const t = shapes[rand(0, shapes.length - 1)]();
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'geometry', topic: 'Chu vi', topicKey: 'perimeter',
        question: t.q, correctAnswer: String(t.a),
        options: makeOptions(t.a, 10),
        illustration: '/images/core/triangle.png',
        explanation: t.e, hints: ['Chu vi = tổng tất cả các cạnh', `Đáp số: ${t.a}`],
    };
}

export function genPatterns(): MathProblem {
    const patterns = [
        () => { const start = rand(1, 5), step = rand(2, 5); const seq = Array.from({ length: 4 }, (_, i) => start + step * i); return { q: `Tìm số tiếp theo: ${seq.join(', ')}, ___`, a: start + step * 4, e: `Mỗi số tăng ${step}. Số tiếp: ${seq[3]} + ${step} = ${start + step * 4}.` }; },
        () => { const start = rand(2, 5); const seq = Array.from({ length: 4 }, (_, i) => start * (i + 1)); return { q: `Tìm quy luật: ${seq.join(', ')}, ___`, a: start * 5, e: `Đây là bảng nhân ${start}: ${start}×5 = ${start * 5}.` }; },
    ];
    const t = patterns[rand(0, 1)]();
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'pattern', topic: 'Quy luật dãy số', topicKey: 'patterns',
        question: t.q, correctAnswer: String(t.a),
        options: makeOptions(t.a, 5),
        illustration: '/images/core/fibonacci.png',
        explanation: t.e, hints: ['Tìm sự thay đổi giữa 2 số liên tiếp', `Đáp số: ${t.a}`],
    };
}

export function genWordProbG3(): MathProblem {
    const names = ['Henry', 'Lan', 'Tuấn', 'Linh', 'Hùng'];
    const n = names[rand(0, names.length - 1)];
    const contexts = [
        () => { const packs = rand(2, 5), each = rand(3, 8); return { q: `${n} mua ${packs} túi kẹo, mỗi túi ${each} viên. Hỏi tất cả bao nhiêu viên kẹo?`, a: packs * each, e: `${packs} × ${each} = ${packs * each} viên kẹo.` }; },
        () => { const total = rand(12, 36), groups = [2, 3, 4, 6][rand(0, 3)]; const ans = Math.floor(total / groups); return { q: `Có ${groups * ans} quyển sách, chia đều cho ${groups} bạn. Mỗi bạn được bao nhiêu quyển?`, a: ans, e: `${groups * ans} ÷ ${groups} = ${ans} quyển.` }; },
        () => { const a = rand(100, 500), b = rand(100, 500); return { q: `Cửa hàng bán buổi sáng ${a} kg gạo, buổi chiều ${b} kg. Hỏi cả ngày bán bao nhiêu kg?`, a: a + b, e: `${a} + ${b} = ${a + b} kg gạo.` }; },
    ];
    const c = contexts[rand(0, 2)]();
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'word_problem', topic: 'Toán đố lớp 3', topicKey: 'word_g3',
        question: c.q, correctAnswer: String(c.a),
        options: makeOptions(c.a, 10),
        illustration: '/images/core/girl_thinking.png',
        explanation: c.e, hints: ['Xác định phép tính phù hợp', `Đáp số: ${c.a}`],
    };
}

// ══════════════════════════════════════════════
// GRADE 4: Fractions, area, large numbers, mass
// ══════════════════════════════════════════════

export function genFractions(): MathProblem {
    const templates = [
        () => { const n = rand(1, 5), d = rand(n + 1, 9); return { q: `So sánh: ${n}/${d} ___ 1/2`, a: (n / d > 0.5) ? '>' : (n / d < 0.5) ? '<' : '=', e: `${n}/${d} = ${(n / d).toFixed(2)}, 1/2 = 0.50. Nên ${n}/${d} ${(n / d > 0.5) ? '>' : (n / d < 0.5) ? '<' : '='} 1/2.` }; },
        () => { const d = [4, 5, 6, 8, 10][rand(0, 4)]; const a = rand(1, d - 1), b = rand(1, d - 1); const ans = a + b; return { q: `${a}/${d} + ${b}/${d} = ?`, a: `${ans}/${d}`, e: `Cùng mẫu: ${a}/${d} + ${b}/${d} = ${ans}/${d}.` }; },
        () => { const d = [3, 4, 5, 6][rand(0, 3)]; const a = rand(2, d); const b = rand(1, a - 1 > 0 ? a - 1 : 1); return { q: `${a}/${d} - ${b}/${d} = ?`, a: `${a - b}/${d}`, e: `Cùng mẫu: ${a}/${d} - ${b}/${d} = ${a - b}/${d}.` }; },
    ];
    const t = templates[rand(0, 2)]();
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'fraction', topic: 'Phân số', topicKey: 'fractions',
        question: t.q, correctAnswer: t.a,
        options: t.q.includes('So sánh') ? shuffle(['>', '<', '=']) : shuffle([t.a, t.a.replace(/\d+$/, '3'), t.a.replace(/^\d+/, '1')]),
        illustration: '/images/core/fraction_1_4.png',
        explanation: t.e, hints: ['Cùng mẫu → cộng/trừ tử số', `Đáp số: ${t.a}`],
    };
}

export function genArea(): MathProblem {
    const templates = [
        () => { const s = rand(2, 12); return { q: `Hình vuông cạnh ${s} cm. Tính diện tích.`, a: s * s, u: 'cm²', e: `S = cạnh × cạnh = ${s} × ${s} = ${s * s} cm².` }; },
        () => { const l = rand(3, 15), w = rand(2, l); return { q: `Hình chữ nhật dài ${l} cm, rộng ${w} cm. Tính diện tích.`, a: l * w, u: 'cm²', e: `S = dài × rộng = ${l} × ${w} = ${l * w} cm².` }; },
    ];
    const t = templates[rand(0, 1)]();
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'geometry', topic: 'Diện tích', topicKey: 'area',
        question: t.q, correctAnswer: `${t.a} ${t.u}`,
        options: shuffle([`${t.a} ${t.u}`, `${t.a + rand(1, 10)} ${t.u}`, `${Math.max(1, t.a - rand(1, 5))} ${t.u}`, `${t.a * 2} ${t.u}`]),
        illustration: '/images/core/square.png',
        explanation: t.e, hints: ['S hình vuông = cạnh²', 'S HCN = dài × rộng', `Đáp số: ${t.a} ${t.u}`],
    };
}

export function genLargeNumbers(): MathProblem {
    const templates = [
        () => { const n = rand(1000, 99999); return { q: `Đọc số: ${n.toLocaleString('vi')}. Chữ số hàng nghìn là bao nhiêu?`, a: String(Math.floor(n / 1000) % 10), e: `Số ${n}: hàng nghìn = ${Math.floor(n / 1000) % 10}.` }; },
        () => { const a = rand(1000, 50000), b = rand(1000, 50000); const s = a > b ? '>' : a < b ? '<' : '='; return { q: `So sánh: ${a.toLocaleString('vi')} ___ ${b.toLocaleString('vi')}`, a: s, e: `${a.toLocaleString('vi')} ${s} ${b.toLocaleString('vi')}.` }; },
        () => { const n = rand(1000, 9999); return { q: `Làm tròn ${n} đến hàng trăm gần nhất.`, a: String(Math.round(n / 100) * 100), e: `${n} ≈ ${Math.round(n / 100) * 100} (chữ số hàng chục ${n % 100 >= 50 ? '≥ 5 → thêm 1' : '< 5 → giữ nguyên'}).` }; },
    ];
    const t = templates[rand(0, 2)]();
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'arithmetic', topic: 'Số lớn (đến 100.000)', topicKey: 'large_numbers',
        question: t.q, correctAnswer: t.a,
        options: t.q.includes('So sánh') ? ['>', '<', '='] : shuffle([t.a, String(parseFloat(t.a) + rand(1, 9)), String(Math.abs(parseFloat(t.a) - rand(1, 5)))]),
        illustration: '/images/core/dice_10_20.jpg',
        explanation: t.e, hints: ['Nhớ thứ tự hàng: đơn vị, chục, trăm, nghìn, chục nghìn', `Đáp số: ${t.a}`],
    };
}

export function genMass(): MathProblem {
    const templates = [
        () => { const kg = rand(1, 10); return { q: `${kg} kg = ___ g?`, a: kg * 1000, e: `1 kg = 1000 g. Nên ${kg} kg = ${kg} × 1000 = ${kg * 1000} g.` }; },
        () => { const a = rand(100, 900), b = rand(100, 900); return { q: `Túi gạo nặng ${a} g, hộp bánh ${b} g. Tổng nặng bao nhiêu g?`, a: a + b, e: `${a} + ${b} = ${a + b} g.` }; },
        () => { const liters = rand(1, 5); return { q: `${liters} lít = ___ ml?`, a: liters * 1000, e: `1 lít = 1000 ml. ${liters} lít = ${liters * 1000} ml.` }; },
    ];
    const t = templates[rand(0, 2)]();
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'measurement', topic: 'Khối lượng & Thể tích', topicKey: 'mass',
        question: t.q, correctAnswer: String(t.a),
        options: makeOptions(t.a, 500),
        illustration: '/images/core/weight.jpg',
        explanation: t.e, hints: ['1 kg = 1000 g', '1 lít = 1000 ml', `Đáp số: ${t.a}`],
    };
}

// ══════════════════════════════════════════════
// GRADE 5: Decimals, percentages, ratio, charts
// ══════════════════════════════════════════════

export function genDecimals(): MathProblem {
    const templates = [
        () => { const a = +(rand(1, 99) / 10).toFixed(1), b = +(rand(1, 99) / 10).toFixed(1); const ans = +(a + b).toFixed(1); return { q: `${a} + ${b} = ?`, a: String(ans), e: `${a} + ${b} = ${ans} (cộng bình thường, giữ 1 chữ số thập phân).` }; },
        () => { const a = +(rand(50, 99) / 10).toFixed(1), b = +(rand(10, Math.floor(a * 10)) / 10).toFixed(1); const ans = +(a - b).toFixed(1); return { q: `${a} - ${b} = ?`, a: String(ans), e: `${a} - ${b} = ${ans}.` }; },
        () => { const f = rand(1, 9), d = [2, 4, 5, 10][rand(0, 3)]; const dec = (f / d).toFixed(d === 4 ? 2 : 1); return { q: `Đổi phân số ${f}/${d} ra số thập phân.`, a: dec, e: `${f} ÷ ${d} = ${dec}.` }; },
    ];
    const t = templates[rand(0, 2)]();
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'arithmetic', topic: 'Số thập phân', topicKey: 'decimals',
        question: t.q, correctAnswer: t.a,
        options: shuffle([t.a, String(+(parseFloat(t.a) + 0.1).toFixed(1)), String(+(parseFloat(t.a) - 0.1).toFixed(1)), String(+(parseFloat(t.a) + 0.5).toFixed(1))]),
        illustration: '/images/core/number_line.png',
        explanation: t.e, hints: ['Thẳng hàng dấu phẩy khi cộng/trừ', `Đáp số: ${t.a}`],
    };
}

export function genPercent(): MathProblem {
    const templates = [
        () => { const total = rand(50, 200), pct = [10, 20, 25, 50, 75][rand(0, 4)]; const ans = total * pct / 100; return { q: `${pct}% của ${total} = ?`, a: ans, e: `${pct}% × ${total} = ${pct}/100 × ${total} = ${ans}.` }; },
        () => { const part = rand(10, 50), total = rand(part + 10, 200); const pct = Math.round(part / total * 100); return { q: `${part} trên ${total} là bao nhiêu phần trăm? (làm tròn)`, a: pct, e: `${part}/${total} × 100 ≈ ${pct}%.` }; },
    ];
    const t = templates[rand(0, 1)]();
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'arithmetic', topic: 'Phần trăm', topicKey: 'percent',
        question: t.q, correctAnswer: String(t.a),
        options: makeOptions(t.a, 10),
        illustration: '/images/core/percent.png',
        explanation: t.e, hints: ['% = phần trăm = /100', `Đáp số: ${t.a}`],
    };
}

export function genRatio(): MathProblem {
    const a = rand(2, 8), b = rand(2, 8);
    const total = (a + b) * rand(2, 5);
    const partA = total * a / (a + b), partB = total * b / (a + b);
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'arithmetic', topic: 'Tỉ số', topicKey: 'ratio',
        question: `Chia ${total} viên kẹo theo tỉ lệ ${a}:${b}. Phần nhiều được bao nhiêu viên?`,
        correctAnswer: String(Math.max(partA, partB)),
        options: makeOptions(Math.max(partA, partB), 5),
        illustration: '/images/core/ratio.jpg',
        explanation: `Tổng tỉ = ${a + b}. Phần nhiều = ${total} × ${Math.max(a, b)}/${a + b} = ${Math.max(partA, partB)}.`,
        hints: ['Bước 1: tổng phần tỉ lệ', 'Bước 2: chia tổng cho tổng tỉ', `Đáp số: ${Math.max(partA, partB)}`],
    };
}

export function genCharts(): MathProblem {
    const subjects = ['Toán', 'Văn', 'Anh', 'Khoa học', 'Thể dục'];
    const scores = subjects.map(() => rand(5, 10));
    const maxIdx = scores.indexOf(Math.max(...scores));
    const sum = scores.reduce((a, b) => a + b, 0);
    const templates = [
        { q: `Điểm: ${subjects.map((s, i) => `${s}=${scores[i]}`).join(', ')}. Môn nào điểm cao nhất?`, a: subjects[maxIdx], e: `${subjects[maxIdx]} = ${scores[maxIdx]} điểm (cao nhất).` },
        { q: `Điểm: ${subjects.map((s, i) => `${s}=${scores[i]}`).join(', ')}. Trung bình bao nhiêu? (làm tròn)`, a: String(Math.round(sum / subjects.length)), e: `TB = (${scores.join('+')}) / ${subjects.length} = ${sum}/${subjects.length} ≈ ${Math.round(sum / subjects.length)}.` },
    ];
    const t = templates[rand(0, 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'data', topic: 'Biểu đồ & Thống kê', topicKey: 'charts',
        question: t.q, correctAnswer: t.a,
        options: t.q.includes('Môn') ? shuffle([...subjects]).slice(0, 4) : makeOptions(Number(t.a), 3),
        illustration: '/images/core/bar_chart.png',
        explanation: t.e, hints: ['Đọc kỹ dữ liệu', `Đáp số: ${t.a}`],
    };
}

// ══════════════════════════════════════════════
// MASTER GENERATOR & TOPIC REGISTRY
// ══════════════════════════════════════════════

export interface TopicInfo {
    key: string;
    name: string;
    gradeLevel: number;
    generator: () => MathProblem;
    icon: string;
}

export const MATH_TOPICS: TopicInfo[] = [
    // Grade 1
    { key: 'add_sub_10', name: 'Cộng trừ trong 10', gradeLevel: 1, generator: genAddSub10, icon: '➕' },
    { key: 'count_20', name: 'Số đến 20', gradeLevel: 1, generator: genCount20, icon: '🔢' },
    { key: 'shapes_g1', name: 'Hình học cơ bản', gradeLevel: 1, generator: genShapesG1, icon: '🔷' },
    { key: 'compare_g1', name: 'So sánh số', gradeLevel: 1, generator: genCompareG1, icon: '⚖️' },
    // Grade 2
    { key: 'add_sub_carry', name: 'Cộng trừ có nhớ', gradeLevel: 2, generator: genAddSubCarry, icon: '🧮' },
    { key: 'clock', name: 'Xem đồng hồ', gradeLevel: 2, generator: genClock, icon: '🕐' },
    { key: 'measure_cm', name: 'Đo độ dài (cm)', gradeLevel: 2, generator: genMeasureCm, icon: '📏' },
    { key: 'word_g2', name: 'Toán đố lớp 2', gradeLevel: 2, generator: genWordProbG2, icon: '📝' },
    // Grade 3
    { key: 'mult_div', name: 'Nhân chia cơ bản', gradeLevel: 3, generator: genMultDiv, icon: '✖️' },
    { key: 'perimeter', name: 'Chu vi', gradeLevel: 3, generator: genPerimeter, icon: '📐' },
    { key: 'patterns', name: 'Quy luật dãy số', gradeLevel: 3, generator: genPatterns, icon: '🔄' },
    { key: 'word_g3', name: 'Toán đố lớp 3', gradeLevel: 3, generator: genWordProbG3, icon: '📖' },
    // Grade 4
    { key: 'fractions', name: 'Phân số', gradeLevel: 4, generator: genFractions, icon: '🥧' },
    { key: 'area', name: 'Diện tích', gradeLevel: 4, generator: genArea, icon: '⬛' },
    { key: 'large_numbers', name: 'Số lớn', gradeLevel: 4, generator: genLargeNumbers, icon: '🔟' },
    { key: 'mass', name: 'Khối lượng', gradeLevel: 4, generator: genMass, icon: '⚖️' },
    // Grade 5
    { key: 'decimals', name: 'Số thập phân', gradeLevel: 5, generator: genDecimals, icon: '🔸' },
    { key: 'percent', name: 'Phần trăm', gradeLevel: 5, generator: genPercent, icon: '💯' },
    { key: 'ratio', name: 'Tỉ số', gradeLevel: 5, generator: genRatio, icon: '📊' },
    { key: 'charts', name: 'Biểu đồ & TK', gradeLevel: 5, generator: genCharts, icon: '📈' },
];

/** Generate a set of problems for a given grade and topic */
export function generateMathSet(grade: number, topicKey?: string, count: number = 10): MathProblem[] {
    const topics = MATH_TOPICS.filter(t => t.gradeLevel === grade && (!topicKey || t.key === topicKey));
    if (topics.length === 0) return [];
    return Array.from({ length: count }, () => {
        const t = topics[rand(0, topics.length - 1)];
        return t.generator();
    });
}

/** Generate daily practice: 2 problems from each topic at the grade level */
export function generateDailyMathSet(grade: number): MathProblem[] {
    const topics = MATH_TOPICS.filter(t => t.gradeLevel === grade);
    return topics.flatMap(t => [t.generator(), t.generator()]);
}
