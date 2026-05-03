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
type MathTemplate = { q: string; a: string | number; e: string; opts?: string[] };
type MathTemplateFactory = () => MathTemplate;
const resolveTemplate = (template: MathTemplate | MathTemplateFactory): MathTemplate =>
    typeof template === 'function' ? template() : template;

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
        illustration: '/images/math/addition_within_10.svg',
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
        illustration: '/images/math/place_value.svg',
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
        illustration: '/images/math/shapes_2d.svg',
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
        illustration: '/images/math/compare_numbers.svg',
        explanation: `${a} ${sign} ${b} vì ${a > b ? `${a} lớn hơn ${b}` : a < b ? `${a} nhỏ hơn ${b}` : 'hai số bằng nhau'}.`,
        hints: ['Số nào xa 0 hơn thì lớn hơn', `Đáp số: ${sign}`],
    };
}

// ── NEW G1: Number Bonds (Tách–ghép số) — CT 2018 + Singapore Math ──
export function genNumberBonds(): MathProblem {
    const total = rand(5, 10);
    const partA = rand(1, total - 1);
    const partB = total - partA;
    const templates = [
        { q: `Tách số: ${total} = ${partA} + ___`, a: partB, e: `${total} = ${partA} + ${partB}. Vì ${partA} + ${partB} = ${total}.` },
        { q: `Ghép số: ${partA} và ___ gộp lại thành ${total}`, a: partB, e: `${partA} + ${partB} = ${total}.` },
        { q: `Có ${total} quả táo, chia 2 rổ: rổ 1 có ${partA} quả. Rổ 2 có ___ quả?`, a: partB, e: `${total} - ${partA} = ${partB} quả.` },
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'arithmetic', topic: 'Tách – ghép số (Number Bonds)', topicKey: 'number_bonds',
        question: t.q, correctAnswer: String(t.a),
        options: makeOptions(t.a, 3),
        illustration: '/images/math/number_bonds.svg',
        explanation: t.e, hints: [`${total} gồm 2 phần cộng lại`, `Đáp số: ${t.a}`],
    };
}

// ── NEW G1: Cộng trừ trong phạm vi 20 — CT 2018, Cambridge Stage 1 ──
export function genAddSub20(): MathProblem {
    const isAdd = Math.random() > 0.5;
    const a = rand(5, 18);
    const b = isAdd ? rand(1, Math.min(20 - a, 12)) : rand(1, Math.min(a, 10));
    const ans = isAdd ? a + b : a - b;
    const op = isAdd ? '+' : '-';
    const hasRegrouping = isAdd ? (a % 10 + b > 9) : (a % 10 < b);
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'arithmetic', topic: 'Cộng trừ trong 20', topicKey: 'add_sub_20',
        question: `${a} ${op} ${b} = ?`,
        correctAnswer: String(ans),
        options: makeOptions(ans, 5),
        illustration: '/images/math/add_sub_20.svg',
        explanation: `${a} ${op} ${b} = ${ans}.${hasRegrouping ? ' (Qua 10 — tách số cho dễ tính!)' : ''}`,
        hints: [isAdd ? 'Tách để làm tròn 10, rồi cộng tiếp' : 'Tách bớt về 10, rồi trừ tiếp', `Đáp số: ${ans}`],
    };
}

// ── NEW G1: Hình khối 3D — CT 2018 đặc trưng (sớm hơn quốc tế) ──
export function genShapes3D(): MathProblem {
    const solids = [
        { name: 'hình hộp chữ nhật', faces: 6, rolls: false, desc: 'có 6 mặt phẳng, 8 đỉnh, 12 cạnh' },
        { name: 'hình lập phương', faces: 6, rolls: false, desc: 'có 6 mặt vuông bằng nhau' },
        { name: 'hình trụ', faces: 3, rolls: true, desc: 'có 2 mặt tròn và 1 mặt cong, lăn được' },
        { name: 'hình cầu', faces: 0, rolls: true, desc: 'hoàn toàn tròn, lăn mọi hướng' },
        { name: 'hình nón', faces: 2, rolls: true, desc: 'có 1 mặt tròn, 1 đỉnh nhọn' },
    ];
    const s = solids[rand(0, solids.length - 1)];
    const templateType = rand(0, 2);
    const templates = [
        { q: `${s.name} có lăn được không?`, a: s.rolls ? 'Có' : 'Không', opts: ['Có', 'Không'], e: `${s.name} ${s.desc}. ${s.rolls ? 'Có mặt cong nên lăn được.' : 'Toàn mặt phẳng nên không lăn được.'}` },
        { q: `Hình nào lăn được? (${solids.slice(0, 4).map(x => x.name).join(', ')})`, a: solids.filter(x => x.rolls)[rand(0, 1)].name, opts: shuffle(solids.slice(0, 4).map(x => x.name)), e: 'Hình có mặt cong (trụ, cầu, nón) lăn được. Hình hộp, lập phương không lăn được.' },
        { q: `Hộp sữa hình gì?`, a: 'hình hộp chữ nhật', opts: shuffle(solids.map(x => x.name)).slice(0, 4), e: `Hộp sữa có 6 mặt phẳng → hình hộp chữ nhật.` },
    ];
    const t = templates[templateType];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'geometry', topic: 'Khối hình 3D', topicKey: 'shapes_3d',
        question: t.q, correctAnswer: t.a,
        options: t.opts,
        illustration: '/images/math/shapes_3d.svg',
        explanation: t.e, hints: ['Hình có mặt cong → lăn được', `Đáp số: ${t.a}`],
    };
}

// ── NEW G1: Thứ tự & Vị trí (Ordinal + Spatial) — CT 2018 + IB PYP ──
export function genOrdinalSpatial(): MathProblem {
    const animals = ['🐶', '🐱', '🐰', '🐻', '🐸', '🦁', '🐧', '🐢'];
    const lineup = shuffle(animals).slice(0, 5);
    const pos = rand(0, 4);
    const ordinals = ['thứ nhất', 'thứ hai', 'thứ ba', 'thứ tư', 'thứ năm'];
    const ordinalNames: Record<string, string> = { '🐶': 'Chó', '🐱': 'Mèo', '🐰': 'Thỏ', '🐻': 'Gấu', '🐸': 'Ếch', '🦁': 'Sư tử', '🐧': 'Chim cánh cụt', '🐢': 'Rùa' };
    const templates = [
        { q: `Hàng: ${lineup.join(' ')}. Con vật đứng ${ordinals[pos]} (từ trái) là con nào?`, a: ordinalNames[lineup[pos]], opts: shuffle(lineup.map(x => ordinalNames[x])).slice(0, 4), e: `Đếm từ trái: vị trí ${ordinals[pos]} là ${lineup[pos]} (${ordinalNames[lineup[pos]]}).` },
        { q: `Hàng: ${lineup.join(' ')}. ${ordinalNames[lineup[pos]]} ${lineup[pos]} đứng thứ mấy từ trái?`, a: ordinals[pos], opts: shuffle(ordinals).slice(0, 4), e: `${ordinalNames[lineup[pos]]} đứng ở vị trí ${ordinals[pos]} từ trái.` },
    ];
    const t = templates[rand(0, 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'comparison', topic: 'Thứ tự & Vị trí', topicKey: 'ordinal_spatial',
        question: t.q, correctAnswer: t.a,
        options: t.opts,
        illustration: '/images/math/ordinal_positions.svg',
        explanation: t.e, hints: ['Đếm lần lượt từ trái sang phải', `Đáp số: ${t.a}`],
    };
}

// ── NEW G1: Số đến 100 — SGK Tập 2 Bài 21-25 ──
export function genCountTo100(): MathProblem {
    const n = rand(20, 99);
    const tens = Math.floor(n / 10);
    const ones = n % 10;
    const templates: (MathTemplate | MathTemplateFactory)[] = [
        { q: `Số gồm ${tens} chục và ${ones} đơn vị là số nào?`, a: String(n), e: `${tens} chục ${ones} đơn vị = ${n}.` },
        () => { const a = rand(10, 99), b = rand(10, 99); return { q: `So sánh: ${a} ___ ${b}`, a: a > b ? '>' : a < b ? '<' : '=', e: `${a} ${a > b ? '>' : a < b ? '<' : '='} ${b}` }; },
        { q: `Đếm tiếp: ${n}, ${n + 1}, ${n + 2}, ___`, a: String(n + 3), e: `Đếm tiếp: ${n}, ${n + 1}, ${n + 2}, ${n + 3}.` },
        { q: `Số liền sau của ${n} là bao nhiêu?`, a: String(n + 1), e: `Số liền sau ${n} là ${n + 1}.` },
    ];
    const t = resolveTemplate(templates[rand(0, templates.length - 1)]);
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'arithmetic', topic: 'Số đến 100', topicKey: 'count_100',
        question: t.q, correctAnswer: String(t.a),
        options: t.q.includes('So sánh') ? ['>', '<', '='] : makeOptions(Number(t.a), 5),
        illustration: '/images/math/place_value.svg',
        explanation: t.e, hints: ['Nhớ: chục ở bên trái, đơn vị bên phải', `Đáp số: ${t.a}`],
    };
}

// ── NEW G1: Cộng trừ trong 100 không nhớ — SGK Tập 2 Bài 26-30 ──
export function genAddSub100(): MathProblem {
    const type = rand(0, 1);
    const templates: MathTemplateFactory[] = [
        () => { const a = rand(10, 60), b = rand(1, 9); return { q: `${a} + ${b} = ?`, a: String(a + b), e: `${a} + ${b} = ${a + b}. Cộng đơn vị: ${a % 10} + ${b} = ${a % 10 + b}.` }; },
        () => { const a = rand(20, 80), b = rand(10, 40); return { q: `${a} + ${b} = ?`, a: String(a + b), e: `${a} + ${b} = ${a + b}. Cộng chục với chục, đơn vị với đơn vị.` }; },
        () => { const a = rand(30, 90), b = rand(1, 9); return { q: `${a} - ${b} = ?`, a: String(a - b), e: `${a} - ${b} = ${a - b}.` }; },
        () => { const a = rand(50, 99), b = rand(10, 40); return { q: `${a} - ${b} = ?`, a: String(a - b), e: `${a} - ${b} = ${a - b}. Trừ chục với chục, đơn vị với đơn vị.` }; },
    ];
    const t = templates[rand(0, 3)]();
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'arithmetic', topic: 'Cộng trừ trong 100', topicKey: 'add_sub_100',
        question: t.q, correctAnswer: String(t.a),
        options: makeOptions(Number(t.a), 8),
        illustration: '/images/math/addition.svg',
        explanation: t.e, hints: ['Cộng/trừ đơn vị trước, rồi chục', `Đáp số: ${t.a}`],
    };
}

// ── NEW G1: Đo độ dài (cm) — SGK Bài 31 ──
export function genMeasureLength(): MathProblem {
    const items = ['bút chì', 'tẩy', 'thước kẻ', 'quyển sách', 'ngón tay', 'cái bàn'];
    const item = items[rand(0, items.length - 1)];
    const len = rand(3, 30);
    const templates = [
        { q: `Cây ${item} dài ${len} cm. Cây ${items[rand(0, 5)]} dài ${len + rand(2, 8)} cm. Cây nào dài hơn?`, a: `Cây ${items[rand(0, 5)]}`, e: `So sánh: ${len} cm < ${len + rand(2, 8)} cm.` },
        { q: `Đoạn thẳng AB dài ${len} cm. Nếu nối thêm ${rand(2, 5)} cm thì tổng bao nhiêu cm?`, a: String(len + rand(2, 5)), e: `${len} + thêm = tổng cm.` },
    ];
    const t = templates[rand(0, 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'measurement', topic: 'Đo độ dài (cm)', topicKey: 'measure_length',
        question: t.q, correctAnswer: t.a,
        options: makeOptions(len, 5).map(x => x + ' cm'),
        illustration: '/images/math/ruler.svg',
        explanation: t.e, hints: ['1 cm ≈ độ rộng đầu ngón tay', `Đáp số: ${t.a}`],
    };
}

// ── NEW G1: Ngày trong tuần — SGK Bài 32 ──
export function genDaysOfWeek(): MathProblem {
    const days = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];
    const idx = rand(0, 6);
    const templates = [
        { q: `Sau ${days[idx]} là ngày nào?`, a: days[(idx + 1) % 7], opts: shuffle(days).slice(0, 4), e: `Sau ${days[idx]} là ${days[(idx + 1) % 7]}.` },
        { q: `Trước ${days[idx]} là ngày nào?`, a: days[(idx + 6) % 7], opts: shuffle(days).slice(0, 4), e: `Trước ${days[idx]} là ${days[(idx + 6) % 7]}.` },
        { q: `Một tuần có bao nhiêu ngày?`, a: '7 ngày', opts: ['5 ngày', '6 ngày', '7 ngày', '8 ngày'], e: 'Một tuần có 7 ngày: Thứ 2, 3, 4, 5, 6, Thứ 7, Chủ Nhật.' },
        { q: `${days[idx]} là ngày thứ mấy trong tuần?`, a: String(idx + 2 > 7 ? 'CN' : idx + 2), opts: shuffle(['2', '3', '4', '5', '6', '7', 'CN']).slice(0, 4), e: `${days[idx]} = thứ ${idx + 2 > 7 ? 'CN' : idx + 2} trong tuần.` },
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'measurement', topic: 'Ngày trong tuần', topicKey: 'days_of_week',
        question: t.q, correctAnswer: t.a,
        options: t.opts || shuffle(days).slice(0, 4),
        illustration: '/images/math/calendar.svg',
        explanation: t.e, hints: ['T2, T3, T4, T5, T6, T7, CN', `Đáp số: ${t.a}`],
    };
}

// ── NEW G2: Phép chia đều — SGK L2 ──
export function genDivision(): MathProblem {
    const divisor = [2, 3, 4, 5][rand(0, 3)];
    const quotient = rand(2, 9);
    const dividend = divisor * quotient;
    const templates = [
        { q: `${dividend} : ${divisor} = ?`, a: String(quotient), e: `${dividend} ÷ ${divisor} = ${quotient}. (Vì ${divisor} × ${quotient} = ${dividend})` },
        { q: `Chia đều ${dividend} quả cam cho ${divisor} bạn. Mỗi bạn được mấy quả?`, a: String(quotient), e: `${dividend} ÷ ${divisor} = ${quotient} quả/bạn.` },
    ];
    const t = templates[rand(0, 1)];
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'arithmetic', topic: 'Phép chia', topicKey: 'division_g2',
        question: t.q, correctAnswer: t.a,
        options: makeOptions(quotient, 3),
        illustration: '/images/math/division.svg',
        explanation: t.e, hints: ['Chia = chia đều thành các nhóm bằng nhau', `Đáp số: ${t.a}`],
    };
}

// ── NEW G2: Số đến 1000 — SGK L2 ──
export function genNumbersTo1000(): MathProblem {
    const n = rand(100, 999);
    const h = Math.floor(n / 100), t = Math.floor((n % 100) / 10), o = n % 10;
    const templates: (MathTemplate | MathTemplateFactory)[] = [
        { q: `Số ${n} gồm: ___ trăm, ___ chục, ___ đơn vị?`, a: `${h} trăm ${t} chục ${o} đơn vị`, e: `${n} = ${h} trăm + ${t} chục + ${o} đơn vị.` },
        { q: `Số gồm ${h} trăm, ${t} chục, ${o} đơn vị là số nào?`, a: String(n), e: `${h}×100 + ${t}×10 + ${o} = ${n}.` },
        () => { const a = rand(100, 999), b = rand(100, 999); return { q: `So sánh: ${a} ___ ${b}`, a: a > b ? '>' : a < b ? '<' : '=', e: `${a} ${a > b ? '>' : a < b ? '<' : '='} ${b}.` }; },
    ];
    const t2 = resolveTemplate(templates[rand(0, templates.length - 1)]);
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'arithmetic', topic: 'Số đến 1000', topicKey: 'numbers_1000',
        question: t2.q, correctAnswer: String(t2.a),
        options: t2.q.includes('So sánh') ? ['>', '<', '='] : makeOptions(n, 50).map(String),
        illustration: '/images/math/place_value.svg',
        explanation: t2.e, hints: ['Trăm > Chục > Đơn vị', `Đáp số: ${t2.a}`],
    };
}

// ── NEW G2: Đo khối lượng (kg, g) & Dung tích (lít) — SGK L2 ──
export function genMassVolume(): MathProblem {
    const templates: MathTemplate[] = [
        { q: '1 kg = ___ g?', a: '1000', e: '1 kilogram = 1000 gram.' },
        (() => { const kg = rand(1, 9); return { q: `Túi gạo nặng ${kg} kg. Đổi ra gram?`, a: `${kg * 1000} g`, e: `${kg} kg = ${kg} × 1000 = ${kg * 1000} g.` }; })(),
        (() => { const l = rand(2, 10); return { q: `Bình nước chứa ${l} lít. Nếu rót đi 2 lít, còn mấy lít?`, a: `${l - 2} lít`, e: `${l} - 2 = ${l - 2} lít.` }; })(),
        (() => { const a = rand(100, 500), b = rand(100, 500); return { q: `Quả dưa ${a} g, quả cam ${b} g. Tổng bao nhiêu g?`, a: `${a + b} g`, e: `${a} + ${b} = ${a + b} g.` }; })(),
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'measurement', topic: 'Khối lượng & Dung tích', topicKey: 'mass_volume_g2',
        question: t.q, correctAnswer: String(t.a),
        options: shuffle([String(t.a), `${rand(500, 2000)}`, `${rand(100, 900)}`, `${rand(1, 9)} kg`]),
        illustration: '/images/math/scale.svg',
        explanation: t.e, hints: ['1 kg = 1000 g, 1 lít = 1000 ml', `Đáp số: ${t.a}`],
    };
}

// ── NEW G2: Tiền Việt Nam — SGK L2 ──
export function genVietnameseMoney(): MathProblem {
    const bills = [1000, 2000, 5000, 10000, 20000, 50000];
    const templates: MathTemplate[] = [
        (() => { const b1 = bills[rand(0, 3)], b2 = bills[rand(0, 3)]; return { q: `Em có 1 tờ ${b1.toLocaleString('vi')} đồng và 1 tờ ${b2.toLocaleString('vi')} đồng. Tổng bao nhiêu?`, a: `${(b1 + b2).toLocaleString('vi')} đồng`, e: `${b1.toLocaleString('vi')} + ${b2.toLocaleString('vi')} = ${(b1 + b2).toLocaleString('vi')} đồng.` }; })(),
        (() => { const price = rand(2, 9) * 1000, paid = price + rand(1, 5) * 1000; return { q: `Cây bút giá ${price.toLocaleString('vi')} đồng. Em đưa ${paid.toLocaleString('vi')} đồng. Tiền thừa?`, a: `${(paid - price).toLocaleString('vi')} đồng`, e: `${paid.toLocaleString('vi')} - ${price.toLocaleString('vi')} = ${(paid - price).toLocaleString('vi')} đồng.` }; })(),
        { q: 'Tờ tiền nào có giá trị lớn nhất: 2.000đ, 5.000đ, 1.000đ, 10.000đ?', a: '10.000đ', e: '10.000đ > 5.000đ > 2.000đ > 1.000đ.', opts: ['2.000đ', '5.000đ', '1.000đ', '10.000đ'] },
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'arithmetic', topic: 'Tiền Việt Nam', topicKey: 'money_vn',
        question: t.q, correctAnswer: String(t.a),
        options: t.opts || shuffle([String(t.a), `${rand(1, 20) * 1000} đồng`, `${rand(1, 20) * 1000} đồng`, `${rand(1, 20) * 1000} đồng`]),
        illustration: '/images/math/money.svg',
        explanation: t.e, hints: ['Nhớ giá trị các tờ tiền VN', `Đáp số: ${t.a}`],
    };
}

// ── NEW G2: Phân tích hàng chục – đơn vị (Place Value) — CT 2018 Core ──
export function genPlaceValue(): MathProblem {
    const n = rand(10, 99);
    const tens = Math.floor(n / 10);
    const ones = n % 10;
    const templates = [
        { q: `Số ${n} có ___ chục ___ đơn vị. Chữ số hàng chục là?`, a: String(tens), e: `${n} = ${tens} chục ${ones} đơn vị. Chữ số hàng chục: ${tens}.` },
        { q: `${tens} chục ${ones} đơn vị viết thành số mấy?`, a: String(n), e: `${tens} chục ${ones} đơn vị = ${n}.` },
        { q: `Số ${n}: chữ số ${ones} ở hàng nào?`, a: 'Hàng đơn vị', opts: ['Hàng đơn vị', 'Hàng chục', 'Hàng trăm'], e: `Trong ${n}, chữ số ${ones} nằm ở hàng đơn vị.` },
        () => { const a2 = rand(10, 99), b2 = rand(10, 99); return { q: `Sắp xếp từ bé đến lớn: ${Math.max(a2, b2)}, ${Math.min(a2, b2)}`, a: `${Math.min(a2, b2)}, ${Math.max(a2, b2)}`, e: `${Math.min(a2, b2)} < ${Math.max(a2, b2)}.` }; },
    ];
    const tIdx = rand(0, 2); // Use static templates mostly
    const t = resolveTemplate(templates[tIdx]);
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'arithmetic', topic: 'Phân tích hàng chục – đơn vị', topicKey: 'place_value',
        question: t.q, correctAnswer: String(t.a),
        options: t.opts || makeOptions(Number(t.a) || tens, 3),
        illustration: '/images/math/place_value.svg',
        explanation: t.e, hints: ['Hàng chục ở bên trái, hàng đơn vị ở bên phải', `Đáp số: ${t.a}`],
    };
}

// ── NEW G2: Số chẵn – lẻ — CT 2018 + Cambridge ──
export function genEvenOdd(): MathProblem {
    const n = rand(1, 50);
    const isEven = n % 2 === 0;
    const templates = [
        { q: `Số ${n} là số chẵn hay số lẻ?`, a: isEven ? 'Số chẵn' : 'Số lẻ', e: `Số ${n} ${isEven ? 'chia hết cho 2 → số chẵn' : 'không chia hết cho 2 → số lẻ'}.` },
        () => { const evens = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20].filter(() => Math.random() > 0.5).slice(0, 3); const odd = rand(0, 4) * 2 + 1; const mixed = shuffle([...evens, odd]); return { q: `Trong dãy: ${mixed.join(', ')} — số nào là số lẻ?`, a: String(odd), e: `Số lẻ: ${odd} (không chia hết cho 2).` }; },
        { q: `Đếm tiếp dãy số chẵn: 2, 4, 6, 8, ___`, a: '10', e: 'Dãy số chẵn cách nhau 2 đơn vị: 2, 4, 6, 8, 10.' },
    ];
    const tIdx = rand(0, 2);
    const t = resolveTemplate(templates[tIdx]);
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'comparison', topic: 'Số chẵn – Số lẻ', topicKey: 'even_odd',
        question: t.q, correctAnswer: String(t.a),
        options: t.q.includes('chẵn hay') ? ['Số chẵn', 'Số lẻ'] : makeOptions(Number(t.a) || 10, 3),
        illustration: '/images/math/even_odd.svg',
        explanation: t.e, hints: ['Số chẵn: 0, 2, 4, 6, 8. Số lẻ: 1, 3, 5, 7, 9', `Đáp số: ${t.a}`],
    };
}

// ── NEW G2: Phép nhân sơ khởi (Intro Multiplication) — CT 2018 + Singapore ──
export function genIntroMult(): MathProblem {
    const factor = rand(2, 5);
    const groups = rand(2, 5);
    const ans = factor * groups;
    const templates = [
        { q: `${groups} nhóm, mỗi nhóm ${factor} con chim. Có tất cả bao nhiêu con?`, e: `${groups} × ${factor} = ${ans}. (Cộng ${groups} lần ${factor})` },
        { q: `Đếm nhảy ${factor}: ${Array.from({ length: groups - 1 }, (_, i) => factor * (i + 1)).join(', ')}, ___. Số tiếp theo?`, e: `Đếm nhảy ${factor}: cứ cộng thêm ${factor}. Số tiếp: ${ans}.` },
        { q: `${factor} + ${factor} + ${Array(groups - 2).fill(factor).join(' + ')} = ?   (cộng ${groups} lần)`, e: `Cộng ${groups} lần số ${factor}: ${factor} × ${groups} = ${ans}.` },
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'arithmetic', topic: 'Phép nhân sơ khởi (nhóm bằng nhau)', topicKey: 'intro_mult',
        question: t.q, correctAnswer: String(ans),
        options: makeOptions(ans, 5),
        illustration: '/images/math/intro_multiplication.svg',
        explanation: t.e, hints: [`Mỗi nhóm ${factor}, đếm ${groups} nhóm`, `Đáp số: ${ans}`],
    };
}

// ── NEW G2: Phân số sơ khởi (Intro Fractions ½ ¼) — CT 2018 + Cambridge ──
export function genIntroFractions(): MathProblem {
    const templates = [
        () => { const whole = rand(2, 5) * 2; return { q: `Chia đều ${whole} cái bánh cho 2 bạn. Mỗi bạn được mấy cái?`, a: String(whole / 2), e: `${whole} ÷ 2 = ${whole / 2}. Chia đều = chia 2 phần bằng nhau.` }; },
        { q: 'Chia hình tròn thành 2 phần bằng nhau. Mỗi phần gọi là gì?', a: 'Một nửa (1/2)', opts: ['Một nửa (1/2)', 'Một phần tư (1/4)', 'Một phần ba (1/3)', 'Hai phần (2/2)'], e: '2 phần bằng nhau → mỗi phần = 1/2 (một nửa).' },
        { q: 'Chia hình vuông thành 4 phần bằng nhau. Mỗi phần gọi là gì?', a: 'Một phần tư (1/4)', opts: ['Một phần tư (1/4)', 'Một nửa (1/2)', 'Một phần ba (1/3)', 'Hai phần (2/4)'], e: '4 phần bằng nhau → mỗi phần = 1/4 (một phần tư).' },
        { q: 'Hình nào được chia thành 2 phần BẰNG NHAU?\n(A) Đường chia chính giữa  (B) Đường chia lệch một bên', a: 'A', opts: ['A', 'B'], e: 'Chỉ khi đường chia chính giữa thì 2 phần mới bằng nhau → đó mới là \"một nửa\".' },
    ];
    const tIdx = rand(0, templates.length - 1);
    const t = resolveTemplate(templates[tIdx]);
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'fraction', topic: 'Phân số sơ khởi (½, ¼)', topicKey: 'intro_fractions',
        question: t.q, correctAnswer: String(t.a),
        options: t.opts || makeOptions(Number(t.a), 3),
        illustration: '/images/math/intro_fractions.svg',
        explanation: t.e, hints: ['Chia bằng nhau = chia đôi', `Đáp số: ${t.a}`],
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
        illustration: '/images/math/column_addition.svg',
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
        illustration: '/images/math/clock_reading.svg',
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
    const t = resolveTemplate(rand(0, 1) === 0 ? templates[0] : templates[1]);
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'measurement', topic: 'Đo độ dài (cm, mm)', topicKey: 'measure_cm',
        question: t.q, correctAnswer: String(t.a),
        options: makeOptions(Number(t.a), 10),
        illustration: '/images/math/ruler_measurement.svg',
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
        illustration: '/images/math/word_problem.svg',
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
            illustration: '/images/core/multiplication.svg',
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
            illustration: '/images/core/division.svg',
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
        illustration: '/images/core/triangle.svg',
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
        illustration: '/images/core/fibonacci.svg',
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
        illustration: '/images/core/girl_thinking.svg',
        explanation: c.e, hints: ['Xác định phép tính phù hợp', `Đáp số: ${c.a}`],
    };
}

// ── NEW G3: Bảng nhân (Multiplication Tables) — CT 2018 core ──
export function genMultTable(): MathProblem {
    const table = rand(2, 9);
    const m = rand(2, 9);
    const ans = table * m;
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'arithmetic', topic: 'Bảng nhân', topicKey: 'mult_table',
        question: `Bảng nhân ${table}: ${table} × ${m} = ?`,
        correctAnswer: String(ans),
        options: makeOptions(ans, 8),
        illustration: '/images/math/multiplication_table.svg',
        explanation: `${table} × ${m} = ${ans}. Thuộc bảng nhân ${table}.`,
        hints: [`Đếm ${m} lần ${table}`, `Đáp số: ${ans}`],
    };
}

// ── NEW G3: Làm tròn số — CT 2018 + Cambridge ──
export function genRounding(): MathProblem {
    const n = rand(10, 999);
    const place = n < 100 ? 10 : 100;
    const rounded = Math.round(n / place) * place;
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'arithmetic', topic: 'Làm tròn số', topicKey: 'rounding',
        question: `Làm tròn ${n} đến hàng ${place === 10 ? 'chục' : 'trăm'} gần nhất.`,
        correctAnswer: String(rounded),
        options: makeOptions(rounded, place),
        illustration: '/images/math/rounding.svg',
        explanation: `${n} ≈ ${rounded}. Chữ số cần xét ${n % place >= place / 2 ? '≥ 5 → làm tròn lên' : '< 5 → làm tròn xuống'}.`,
        hints: ['Chữ số ≥ 5 → tròn lên, < 5 → tròn xuống', `Đáp số: ${rounded}`],
    };
}

// ── NEW G3: Thống kê đơn giản (Pictograph/Tally) — CT 2018 ──
export function genBasicStats(): MathProblem {
    const items = ['cam', 'táo', 'chuối', 'nho'];
    const counts = items.map(() => rand(2, 10));
    const maxIdx = counts.indexOf(Math.max(...counts));
    const total = counts.reduce((a, b) => a + b, 0);
    const templates = [
        { q: `Bảng đếm: ${items.map((it, i) => `${it}: ${counts[i]}`).join(', ')}. Loại nào nhiều nhất?`, a: items[maxIdx], e: `${items[maxIdx]} = ${counts[maxIdx]} (nhiều nhất).` },
        { q: `Bảng đếm: ${items.map((it, i) => `${it}: ${counts[i]}`).join(', ')}. Tổng cộng có bao nhiêu?`, a: String(total), e: `${counts.join(' + ')} = ${total}.` },
    ];
    const t = templates[rand(0, 1)];
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'data', topic: 'Thống kê đơn giản', topicKey: 'basic_stats',
        question: t.q, correctAnswer: t.a,
        options: t.q.includes('nhiều')
            ? (() => { const wrongs = shuffle(items.filter(x => x !== t.a)).slice(0, 3); return shuffle([t.a, ...wrongs]); })()
            : makeOptions(total, 5),
        illustration: '/images/math/pictograph.svg',
        explanation: t.e, hints: ['Đọc kỹ từng số', `Đáp số: ${t.a}`],
    };
}

// ── NEW G3: Số đến 10.000 — CT 2018 ──
export function genNumbersTo10000(): MathProblem {
    const n = rand(100, 9999);
    const thousands = Math.floor(n / 1000);
    const hundreds = Math.floor((n % 1000) / 100);
    const templates = [
        { q: `Số ${n.toLocaleString('vi')}: chữ số hàng trăm là bao nhiêu?`, a: String(hundreds), e: `Trong số ${n}, chữ số hàng trăm là ${hundreds}.` },
        () => { const a = rand(100, 5000), b = rand(100, 5000); const s = a > b ? '>' : a < b ? '<' : '='; return { q: `So sánh: ${a} ___ ${b}`, a: s, e: `${a} ${s} ${b}.` }; },
    ];
    const t = resolveTemplate(templates[rand(0, 1)]);
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'arithmetic', topic: 'Số đến 10.000', topicKey: 'numbers_10000',
        question: t.q, correctAnswer: String(t.a),
        options: t.q.includes('So sánh') ? ['>', '<', '='] : makeOptions(hundreds, 3),
        illustration: '/images/math/place_value.svg',
        explanation: t.e, hints: ['Nhớ thứ tự: đơn vị, chục, trăm, nghìn', `Đáp số: ${t.a}`],
    };
}

// ── NEW G4: Góc — CT 2018 ──
export function genAngles(): MathProblem {
    const angles = [
        { name: 'góc vuông', deg: 90, desc: 'đúng 90°' },
        { name: 'góc nhọn', deg: rand(10, 89), desc: 'nhỏ hơn 90°' },
        { name: 'góc tù', deg: rand(91, 179), desc: 'lớn hơn 90° và nhỏ hơn 180°' },
        { name: 'góc bẹt', deg: 180, desc: 'đúng 180°' },
    ];
    const a = angles[rand(0, angles.length - 1)];
    const templates = [
        { q: `Góc ${a.deg}° là góc gì?`, a: a.name, opts: shuffle(angles.map(x => x.name)), e: `${a.deg}° ${a.desc} → ${a.name}.` },
        { q: `${a.name} có số đo bao nhiêu độ? (ước lượng)`, a: `${a.deg}°`, opts: shuffle(angles.map(x => `${x.deg}°`)), e: `${a.name} ${a.desc}.` },
    ];
    const t = templates[rand(0, 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'geometry', topic: 'Góc', topicKey: 'angles',
        question: t.q, correctAnswer: t.a,
        options: t.opts,
        illustration: '/images/math/angles.svg',
        explanation: t.e, hints: ['Nhọn < 90° < Tù < 180° = Bẹt', `Đáp số: ${t.a}`],
    };
}

// ── NEW G4: Trung bình cộng — CT 2018 ──
export function genAverage(): MathProblem {
    const count = rand(3, 5);
    const nums = Array.from({ length: count }, () => rand(5, 50));
    const sum = nums.reduce((a, b) => a + b, 0);
    const avg = Math.round(sum / count);
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'arithmetic', topic: 'Trung bình cộng', topicKey: 'average',
        question: `Tìm trung bình cộng: ${nums.join(', ')}`,
        correctAnswer: String(avg),
        options: makeOptions(avg, 5),
        illustration: '/images/math/average.svg',
        explanation: `TBC = (${nums.join(' + ')}) ÷ ${count} = ${sum} ÷ ${count} = ${avg}.`,
        hints: ['TBC = Tổng ÷ Số lượng', `Đáp số: ${avg}`],
    };
}

// ── NEW G5: Thể tích — CT 2018 ──
export function genVolume(): MathProblem {
    const templates = [
        () => { const s = rand(2, 8); return { q: `Hình lập phương cạnh ${s} cm. Tính thể tích.`, a: s ** 3, u: 'cm³', e: `V = cạnh³ = ${s}³ = ${s ** 3} cm³.` }; },
        () => { const l = rand(3, 10), w = rand(2, l), h = rand(2, 8); return { q: `Hình hộp chữ nhật dài ${l}, rộng ${w}, cao ${h} cm. Tính thể tích.`, a: l * w * h, u: 'cm³', e: `V = dài × rộng × cao = ${l} × ${w} × ${h} = ${l * w * h} cm³.` }; },
    ];
    const t = templates[rand(0, 1)]();
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'geometry', topic: 'Thể tích', topicKey: 'volume',
        question: t.q, correctAnswer: `${t.a} ${t.u}`,
        options: shuffle([`${t.a} ${t.u}`, `${t.a + rand(5, 20)} ${t.u}`, `${Math.max(1, t.a - rand(5, 15))} ${t.u}`, `${t.a * 2} ${t.u}`]),
        illustration: '/images/math/volume.svg',
        explanation: t.e, hints: ['V hộp = dài × rộng × cao', 'V lập phương = cạnh³', `Đáp số: ${t.a} ${t.u}`],
    };
}

// ── NEW G5: Hình tam giác — CT 2018 ──
export function genTriangleArea(): MathProblem {
    const base = rand(4, 20);
    const height = rand(3, 15);
    const area = base * height / 2;
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'geometry', topic: 'Diện tích tam giác', topicKey: 'triangle_area',
        question: `Tam giác đáy ${base} cm, chiều cao ${height} cm. Tính diện tích.`,
        correctAnswer: `${area} cm²`,
        options: shuffle([`${area} cm²`, `${base * height} cm²`, `${area + rand(3, 10)} cm²`, `${Math.max(1, area - rand(2, 8))} cm²`]),
        illustration: '/images/math/triangle_area.svg',
        explanation: `S = đáy × cao ÷ 2 = ${base} × ${height} ÷ 2 = ${area} cm².`,
        hints: ['S tam giác = đáy × cao ÷ 2', `Đáp số: ${area} cm²`],
    };
}



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
        illustration: '/images/core/fraction_1_4.svg',
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
        illustration: '/images/core/square.svg',
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
        illustration: '/images/core/dice_10_20.svg',
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
        illustration: '/images/core/weight.svg',
        explanation: t.e, hints: ['1 kg = 1000 g', '1 lít = 1000 ml', `Đáp số: ${t.a}`],
    };
}

// ── NEW G1: Đồng hồ giờ đúng — SGK Toán 1 Tập 2 ──
export function genClockG1(): MathProblem {
    const hour = rand(1, 12);
    const templates = [
        { q: `🕐 Kim ngắn chỉ số ${hour}, kim dài chỉ số 12. Mấy giờ?`, a: `${hour} giờ`, opts: [`${hour} giờ`, `${hour + 1} giờ`, `${hour} giờ 30`, `12 giờ`], e: `Kim ngắn chỉ ${hour}, kim dài chỉ 12 → ${hour} giờ đúng.` },
        { q: `${hour} giờ đúng = kim ngắn chỉ vào số mấy?`, a: String(hour), opts: shuffle([String(hour), '12', String(hour + 1), String(hour > 1 ? hour - 1 : 11)]), e: `${hour} giờ → kim ngắn chỉ số ${hour}, kim dài chỉ số 12.` },
        { q: `Bé đi ngủ lúc ${hour} giờ tối. Dậy sau 8 giờ. Bé dậy lúc mấy giờ?`, a: `${(hour + 8) % 12 || 12} giờ`, opts: shuffle([`${(hour + 8) % 12 || 12} giờ`, `${hour + 6} giờ`, `${hour} giờ`, `${hour + 10} giờ`]), e: `${hour} + 8 = ${hour + 8} giờ = ${(hour + 8) % 12 || 12} giờ sáng.` },
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'measurement', topic: 'Đồng hồ giờ đúng', topicKey: 'clock_g1',
        question: t.q, correctAnswer: t.a,
        options: t.opts,
        illustration: '/images/math/clock.svg',
        explanation: t.e, hints: ['Kim ngắn = giờ, Kim dài = phút', `Đáp số: ${t.a}`],
    };
}

// ── NEW G3: Bảng chia — SGK Toán 3 ──
export function genDivisionTable(): MathProblem {
    const divisor = [2, 3, 4, 5, 6, 7, 8, 9][rand(0, 7)];
    const quotient = rand(1, 10);
    const dividend = divisor * quotient;
    const templates = [
        { q: `${dividend} : ${divisor} = ?`, a: String(quotient), e: `${dividend} ÷ ${divisor} = ${quotient}. (Vì ${divisor} × ${quotient} = ${dividend})` },
        { q: `___ × ${divisor} = ${dividend}. Điền số thích hợp:`, a: String(quotient), e: `? × ${divisor} = ${dividend} → ? = ${dividend} ÷ ${divisor} = ${quotient}.` },
        { q: `Có ${dividend} viên kẹo, chia đều cho ${divisor} bạn. Mỗi bạn được mấy viên?`, a: String(quotient), e: `${dividend} ÷ ${divisor} = ${quotient} viên/bạn.` },
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'arithmetic', topic: 'Bảng chia', topicKey: 'division_table',
        question: t.q, correctAnswer: t.a,
        options: makeOptions(quotient, 3),
        illustration: '/images/math/division.svg',
        explanation: t.e, hints: [`Nhớ: ${divisor} × ? = ${dividend}`, `Đáp số: ${t.a}`],
    };
}

// ── NEW G4: Cộng trừ phân số cùng mẫu — SGK Toán 4 ──
export function genFractionAddSub(): MathProblem {
    const denom = [3, 4, 5, 6, 7, 8, 9, 10][rand(0, 7)];
    const isAdd = rand(0, 1) === 0;
    let a: number, b: number, result: number;
    if (isAdd) {
        a = rand(1, denom - 2);
        b = rand(1, denom - a);
        result = a + b;
    } else {
        a = rand(2, denom - 1);
        b = rand(1, a - 1);
        result = a - b;
    }
    const op = isAdd ? '+' : '-';
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'fraction', topic: 'Cộng trừ phân số', topicKey: 'fraction_add_sub',
        question: `${a}/${denom} ${op} ${b}/${denom} = ?`,
        correctAnswer: `${result}/${denom}`,
        options: shuffle([`${result}/${denom}`, `${result + 1}/${denom}`, `${Math.max(1, result - 1)}/${denom}`, `${a + b}/${denom + 1}`]),
        illustration: '/images/math/fractions.svg',
        explanation: `${a}/${denom} ${op} ${b}/${denom} = ${result}/${denom}. Cùng mẫu → ${isAdd ? 'cộng' : 'trừ'} tử số: ${a} ${op} ${b} = ${result}.`,
        hints: ['Cùng mẫu: giữ mẫu, cộng/trừ tử', `Đáp số: ${result}/${denom}`],
    };
}

// ── NEW G5: Vận tốc - Quãng đường - Thời gian — SGK Toán 5 ──
export function genSpeedDistanceTime(): MathProblem {
    const templates: MathTemplateFactory[] = [
        () => { const v = rand(30, 80), t = rand(2, 5); const s = v * t; return { q: `Xe chạy vận tốc ${v} km/h trong ${t} giờ. Quãng đường?`, a: `${s} km`, e: `s = v × t = ${v} × ${t} = ${s} km.` }; },
        () => { const s = rand(100, 500), t = rand(2, 5); const v = s / t; return { q: `Đi ${s} km hết ${t} giờ. Vận tốc?`, a: `${v} km/h`, e: `v = s ÷ t = ${s} ÷ ${t} = ${v} km/h.` }; },
        () => { const v = rand(40, 60), s = v * rand(2, 4); const t = s / v; return { q: `Vận tốc ${v} km/h, quãng đường ${s} km. Thời gian?`, a: `${t} giờ`, e: `t = s ÷ v = ${s} ÷ ${v} = ${t} giờ.` }; },
    ];
    const t = templates[rand(0, 2)]();
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'word_problem', topic: 'Vận tốc - Quãng đường - Thời gian', topicKey: 'speed_distance_time',
        question: t.q, correctAnswer: String(t.a),
        options: shuffle([String(t.a), `${rand(50, 300)} km`, `${rand(20, 80)} km/h`, `${rand(1, 6)} giờ`]),
        illustration: '/images/math/speed.svg',
        explanation: t.e, hints: ['v = s ÷ t | s = v × t | t = s ÷ v', `Đáp số: ${t.a}`],
    };
}

// ── NEW G3: Số La Mã — SGK Toán 3 ──
export function genRomanNumerals(): MathProblem {
    const romanMap: [number, string][] = [[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
    const num = rand(1, 30);
    let roman = '', n = num;
    for (const [val, sym] of romanMap) { while (n >= val) { roman += sym; n -= val; } }
    const templates = [
        { q: `Số ${num} viết bằng chữ số La Mã là gì?`, a: roman, opts: shuffle([roman, 'X' + roman.slice(-1), roman + 'I', 'V' + roman.slice(0, 1)]), e: `${num} = ${roman}. I=1, V=5, X=10.` },
        { q: `Chữ số La Mã "${roman}" = bao nhiêu?`, a: String(num), opts: makeOptions(num, 5), e: `${roman} = ${num}.` },
    ];
    const t = templates[rand(0, 1)];
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'arithmetic', topic: 'Số La Mã', topicKey: 'roman_numerals',
        question: t.q, correctAnswer: t.a,
        options: t.opts,
        illustration: '/images/math/roman.svg',
        explanation: t.e, hints: ['I=1, V=5, X=10, IV=4, IX=9', `Đáp số: ${t.a}`],
    };
}

// ── NEW G4: Dấu hiệu chia hết — SGK Toán 4 ──
export function genDivisibilityRules(): MathProblem {
    const rules = [
        { div: 2, rule: 'chữ số tận cùng chẵn (0,2,4,6,8)', gen: () => rand(1, 499) * 2 },
        { div: 5, rule: 'chữ số tận cùng là 0 hoặc 5', gen: () => rand(1, 199) * 5 },
        { div: 3, rule: 'tổng các chữ số chia hết cho 3', gen: () => rand(1, 333) * 3 },
        { div: 9, rule: 'tổng các chữ số chia hết cho 9', gen: () => rand(1, 111) * 9 },
    ];
    const r = rules[rand(0, rules.length - 1)];
    const num = r.gen();
    const wrong = num + rand(1, r.div - 1);
    const templates = [
        { q: `Số nào chia hết cho ${r.div}?`, a: String(num), opts: shuffle([String(num), String(wrong), String(wrong + 1), String(num + 1)]), e: `${num} chia hết cho ${r.div}. Dấu hiệu: ${r.rule}.` },
        { q: `Dấu hiệu nào cho biết số chia hết cho ${r.div}?`, a: r.rule, opts: shuffle([r.rule, 'chữ số tận cùng là 1', 'tổng = 7', 'chữ số đầu chẵn']), e: `Số chia hết cho ${r.div} khi: ${r.rule}.` },
    ];
    const t = templates[rand(0, 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'arithmetic', topic: 'Dấu hiệu chia hết', topicKey: 'divisibility_rules',
        question: t.q, correctAnswer: t.a,
        options: t.opts,
        illustration: '/images/math/division.svg',
        explanation: t.e, hints: ['Chia hết cho 2: tận cùng chẵn', 'Chia hết cho 3: tổng chữ số ÷3', `Đáp số: ${t.a}`],
    };
}

// ── NEW G4: Nhân chia phân số — SGK Toán 4 Chương 4 ──
export function genFractionMultDiv(): MathProblem {
    const isMult = rand(0, 1) === 0;
    const a = rand(1, 5), b = rand(2, 8), c = rand(1, 5), d = rand(2, 8);
    if (isMult) {
        const rn = a * c, rd = b * d;
        return {
            id: genId(), gradeLevel: 4, difficulty: 4,
            type: 'fraction', topic: 'Nhân chia phân số', topicKey: 'fraction_mult_div',
            question: `${a}/${b} × ${c}/${d} = ?`,
            correctAnswer: `${rn}/${rd}`,
            options: shuffle([`${rn}/${rd}`, `${a + c}/${b + d}`, `${rn}/${rd + 1}`, `${a * d}/${b * c}`]),
            illustration: '/images/math/fractions.svg',
            explanation: `${a}/${b} × ${c}/${d} = (${a}×${c})/(${b}×${d}) = ${rn}/${rd}.`,
            hints: ['Nhân PS: tử×tử, mẫu×mẫu', `Đáp số: ${rn}/${rd}`],
        };
    } else {
        const rn = a * d, rd = b * c;
        return {
            id: genId(), gradeLevel: 4, difficulty: 4,
            type: 'fraction', topic: 'Nhân chia phân số', topicKey: 'fraction_mult_div',
            question: `${a}/${b} ÷ ${c}/${d} = ?`,
            correctAnswer: `${rn}/${rd}`,
            options: shuffle([`${rn}/${rd}`, `${a * c}/${b * d}`, `${rn + 1}/${rd}`, `${a}/${b * c}`]),
            illustration: '/images/math/fractions.svg',
            explanation: `${a}/${b} ÷ ${c}/${d} = ${a}/${b} × ${d}/${c} = ${rn}/${rd}.`,
            hints: ['Chia PS: nhân với PS đảo', `Đáp số: ${rn}/${rd}`],
        };
    }
}

// ── NEW G4-5: Hình bình hành, thoi, thang — SGK Toán 4 & 5 ──
export function genParallelogramShapes(): MathProblem {
    const shapes = [
        () => { const a = rand(3, 12), h = rand(2, 8); return { q: `Hình bình hành có đáy ${a} cm, chiều cao ${h} cm. Tính diện tích.`, a: `${a * h} cm²`, e: `S = đáy × cao = ${a} × ${h} = ${a * h} cm².`, name: 'bình hành' }; },
        () => { const d1 = rand(4, 12), d2 = rand(3, 10); return { q: `Hình thoi có 2 đường chéo ${d1} cm và ${d2} cm. Tính diện tích.`, a: `${(d1 * d2) / 2} cm²`, e: `S = (d₁ × d₂) / 2 = (${d1} × ${d2}) / 2 = ${(d1 * d2) / 2} cm².`, name: 'thoi' }; },
        () => { const a = rand(4, 10), b = rand(6, 14), h = rand(3, 8); return { q: `Hình thang có đáy lớn ${b} cm, đáy nhỏ ${a} cm, chiều cao ${h} cm. Tính diện tích.`, a: `${((a + b) * h) / 2} cm²`, e: `S = (a+b)×h/2 = (${a}+${b})×${h}/2 = ${((a + b) * h) / 2} cm².`, name: 'thang' }; },
    ];
    const t = shapes[rand(0, 2)]();
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'geometry', topic: 'Hình bình hành/thoi/thang', topicKey: 'parallelogram_shapes',
        question: t.q, correctAnswer: t.a,
        options: shuffle([t.a, `${parseFloat(t.a) + rand(2, 8)} cm²`, `${Math.max(1, parseFloat(t.a) - rand(1, 5))} cm²`, `${parseFloat(t.a) * 2} cm²`]),
        illustration: '/images/core/square.svg',
        explanation: t.e, hints: [`S hình ${t.name}`, `Đáp số: ${t.a}`],
    };
}

// ── NEW G5: Diện tích hình tròn — SGK Toán 5 ──
export function genCircleArea(): MathProblem {
    const r = rand(2, 10);
    const templates: MathTemplateFactory[] = [
        () => { const area = +(Math.PI * r * r).toFixed(2); return { q: `Hình tròn bán kính ${r} cm. Tính diện tích (π ≈ 3,14).`, a: `${(3.14 * r * r).toFixed(2)} cm²`, e: `S = π × r² = 3,14 × ${r}² = ${(3.14 * r * r).toFixed(2)} cm².` }; },
        () => { const circumference = +(2 * 3.14 * r).toFixed(2); return { q: `Hình tròn bán kính ${r} cm. Tính chu vi (π ≈ 3,14).`, a: `${circumference} cm`, e: `C = 2 × π × r = 2 × 3,14 × ${r} = ${circumference} cm.` }; },
        () => { const d = r * 2; return { q: `Đường kính hình tròn = ${d} cm. Bán kính = ?`, a: `${r} cm`, e: `r = d ÷ 2 = ${d} ÷ 2 = ${r} cm.` }; },
    ];
    const t = templates[rand(0, 2)]();
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'geometry', topic: 'Hình tròn', topicKey: 'circle_area',
        question: t.q, correctAnswer: String(t.a),
        options: shuffle([String(t.a), `${(3.14 * r * r + rand(5, 20)).toFixed(2)} cm²`, `${r * 2} cm`, `${(3.14 * r).toFixed(2)} cm`]),
        illustration: '/images/core/circle.svg',
        explanation: t.e, hints: ['S = π × r²', 'C = 2 × π × r', `Đáp số: ${t.a}`],
    };
}

// ── NEW G5: Tỉ lệ bản đồ — SGK Toán 5 ──
export function genMapScale(): MathProblem {
    const scales = [100, 500, 1000, 5000, 10000];
    const scale = scales[rand(0, scales.length - 1)];
    const mapCm = rand(2, 20);
    const realCm = mapCm * scale;
    const realM = realCm / 100;
    const templates = [
        { q: `Bản đồ tỉ lệ 1:${scale.toLocaleString('vi')}. Đo trên bản đồ = ${mapCm} cm. Thực tế = ?`, a: `${realM} m`, e: `Thực tế = ${mapCm} × ${scale} = ${realCm} cm = ${realM} m.` },
        { q: `Tỉ lệ 1:${scale.toLocaleString('vi')} nghĩa là gì?`, a: `1 cm trên BĐ = ${scale} cm thực tế`, opts: [`1 cm trên BĐ = ${scale} cm thực tế`, `1 cm = 1 cm`, `1 km = ${scale} km`, `Bản đồ thu nhỏ ${scale / 2} lần`], e: `Tỉ lệ 1:${scale} = 1 cm trên bản đồ ứng với ${scale} cm = ${scale / 100} m thực tế.` },
    ];
    const t = templates[rand(0, 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'measurement', topic: 'Tỉ lệ bản đồ', topicKey: 'map_scale',
        question: t.q, correctAnswer: t.a,
        options: t.opts || shuffle([t.a, `${realM + rand(1, 10)} m`, `${mapCm} m`, `${realM * 10} m`]),
        illustration: '/images/math/map.svg',
        explanation: t.e, hints: ['Thực tế = Trên BĐ × Tỉ lệ', `Đáp số: ${t.a}`],
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
        illustration: '/images/core/number_line.svg',
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
        illustration: '/images/core/percent.svg',
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
        illustration: '/images/core/ratio.svg',
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
        options: t.q.includes('Môn')
            ? (() => { const wrongs = shuffle(subjects.filter(s => s !== t.a)).slice(0, 3); return shuffle([t.a, ...wrongs]); })()
            : makeOptions(Number(t.a), 3),
        illustration: '/images/core/bar_chart.svg',
        explanation: t.e, hints: ['Đọc kỹ dữ liệu', `Đáp số: ${t.a}`],
    };
}

// ── BATCH 8: Phép tính với số 0 — SGK Toán 1 ──
export function genZeroOps(): MathProblem {
    const a = rand(1, 20);
    const templates = [
        { q: `${a} + 0 = ?`, a: String(a), e: `Cộng với 0: bất kỳ số nào cộng 0 vẫn bằng chính nó. ${a} + 0 = ${a}.` },
        { q: `0 + ${a} = ?`, a: String(a), e: `0 + ${a} = ${a}. Số 0 là phần tử trung hòa của phép cộng.` },
        { q: `${a} - 0 = ?`, a: String(a), e: `Trừ đi 0: ${a} - 0 = ${a}.` },
        { q: `${a} - ${a} = ?`, a: '0', e: `Một số trừ chính nó bằng 0. ${a} - ${a} = 0.` },
        { q: `${a} × 0 = ?`, a: '0', e: `Nhân với 0 luôn bằng 0. ${a} × 0 = 0.` },
        { q: `0 × ${a} = ?`, a: '0', e: `0 × bất kỳ = 0. Tính chất đặc biệt của số 0.` },
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'arithmetic', topic: 'Phép tính với số 0', topicKey: 'zero_ops',
        question: t.q, correctAnswer: t.a,
        options: makeOptions(Number(t.a), 5),
        illustration: '/images/core/number_line.svg',
        explanation: t.e, hints: ['Cộng 0 = giữ nguyên, trừ chính nó = 0', `Đáp số: ${t.a}`],
    };
}

// ── BATCH 8: Bài toán có lời văn G1 ──
export function genWordProbG1(): MathProblem {
    const a = rand(2, 9), b = rand(1, 8);
    const templates = [
        { q: `Lan có ${a} quả táo. Mẹ cho thêm ${b} quả. Hỏi Lan có tất cả bao nhiêu quả táo?`, a: a + b, e: `${a} + ${b} = ${a + b} (quả táo).` },
        { q: `Trên cây có ${a + b} con chim. Bay đi ${b} con. Còn lại mấy con chim?`, a: a, e: `${a + b} - ${b} = ${a} (con chim).` },
        { q: `Tổ 1 có ${a} bạn, tổ 2 có ${b} bạn. Cả 2 tổ có mấy bạn?`, a: a + b, e: `${a} + ${b} = ${a + b} (bạn).` },
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'word_problem', topic: 'Toán đố lớp 1', topicKey: 'word_g1',
        question: t.q, correctAnswer: String(t.a),
        options: makeOptions(t.a, 5),
        illustration: '/images/core/apple.svg',
        explanation: t.e, hints: ['Tìm từ khóa: "tất cả" = cộng, "còn lại" = trừ', `Đáp số: ${t.a}`],
    };
}

// ── BATCH 8: Bảng cửu chương 2,3,4,5 đầy đủ — SGK Toán 2 ──
export function genMultTable2_5(): MathProblem {
    const table = [2, 3, 4, 5][rand(0, 3)];
    const n = rand(1, 10);
    const result = table * n;
    const templates = [
        { q: `${table} × ${n} = ?`, a: result, e: `Bảng nhân ${table}: ${table} × ${n} = ${result}.` },
        { q: `${n} × ${table} = ?`, a: result, e: `Tính chất giao hoán: ${n} × ${table} = ${result}.` },
        { q: `${result} : ${table} = ?`, a: n, e: `Phép chia ngược: ${result} ÷ ${table} = ${n}.` },
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'arithmetic', topic: 'Bảng nhân 2-5', topicKey: 'mult_table_2_5',
        question: t.q, correctAnswer: String(t.a),
        options: makeOptions(t.a, 5),
        illustration: '/images/core/multiplication.svg',
        explanation: t.e, hints: [`Nhớ bảng nhân ${table}`, `Đáp số: ${t.a}`],
    };
}

// ── BATCH 8: Đường gấp khúc — SGK Toán 2 ──
export function genDuongGapKhuc(): MathProblem {
    const a = rand(2, 8), b = rand(2, 8), c = rand(2, 8);
    const total = a + b + c;
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'geometry', topic: 'Đường gấp khúc', topicKey: 'duong_gap_khuc',
        question: `Đường gấp khúc ABC có 3 đoạn thẳng: AB = ${a} cm, BC = ${b} cm, CD = ${c} cm. Tính độ dài đường gấp khúc ABCD.`,
        correctAnswer: `${total} cm`,
        options: [`${total} cm`, `${total + 2} cm`, `${total - 1} cm`, `${a + b} cm`],
        illustration: '/images/core/zigzag.svg',
        explanation: `Độ dài = ${a} + ${b} + ${c} = ${total} cm.`,
        hints: ['Cộng tất cả các đoạn thẳng lại', `Đáp số: ${total} cm`],
    };
}

// ── BATCH 8: Bảng đơn vị đo độ dài — SGK Toán 3 ──
const DON_VI_DO_DATA = [
    { q: '1 m = ? cm', a: '100', e: '1 mét = 100 xen-ti-mét.' },
    { q: '1 km = ? m', a: '1000', e: '1 ki-lô-mét = 1000 mét.' },
    { q: '1 dm = ? cm', a: '10', e: '1 đề-xi-mét = 10 xen-ti-mét.' },
    { q: '1 m = ? dm', a: '10', e: '1 mét = 10 đề-xi-mét.' },
    { q: '5 m = ? cm', a: '500', e: '5 × 100 = 500 cm.' },
    { q: '3 km = ? m', a: '3000', e: '3 × 1000 = 3000 m.' },
    { q: '200 cm = ? m', a: '2', e: '200 ÷ 100 = 2 m.' },
    { q: '40 mm = ? cm', a: '4', e: '40 ÷ 10 = 4 cm. (1 cm = 10 mm)' },
];

export function genDonViDo(): MathProblem {
    const item = DON_VI_DO_DATA[rand(0, DON_VI_DO_DATA.length - 1)];
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'measurement', topic: 'Đơn vị đo độ dài', topicKey: 'don_vi_do',
        question: item.q, correctAnswer: item.a,
        options: makeOptions(Number(item.a), 100),
        illustration: '/images/core/ruler.svg',
        explanation: item.e, hints: ['mm → cm → dm → m → km (×10 mỗi bậc)', `Đáp số: ${item.a}`],
    };
}

// ── BATCH 8: Góc vuông / Góc không vuông — SGK Toán 3 ──
const GOC_VUONG_DATA = [
    { q: 'Góc vuông bằng bao nhiêu độ?', a: '90°', opts: ['90°', '45°', '180°', '60°'], e: 'Góc vuông = 90°. Dùng ê-ke để kiểm tra.' },
    { q: 'Góc nhọn là góc có số đo:', a: 'Nhỏ hơn 90°', opts: ['Nhỏ hơn 90°', 'Bằng 90°', 'Lớn hơn 90°', 'Bằng 180°'], e: 'Góc nhọn < 90°, góc vuông = 90°, góc tù > 90°.' },
    { q: 'Hình chữ nhật có mấy góc vuông?', a: '4', opts: ['4', '2', '3', '1'], e: 'Hình chữ nhật có 4 góc vuông (mỗi góc = 90°).' },
    { q: 'Góc tù là góc có số đo:', a: 'Lớn hơn 90° và nhỏ hơn 180°', opts: ['Lớn hơn 90° và nhỏ hơn 180°', 'Bằng 90°', 'Nhỏ hơn 90°', 'Bằng 180°'], e: '90° < Góc tù < 180°.' },
    { q: 'Dụng cụ nào dùng để kiểm tra góc vuông?', a: 'Ê-ke', opts: ['Ê-ke', 'Thước kẻ', 'Com-pa', 'Bút chì'], e: 'Ê-ke có 1 góc vuông 90°, dùng để kiểm tra góc vuông.' },
];

export function genGocVuong(): MathProblem {
    const item = GOC_VUONG_DATA[rand(0, GOC_VUONG_DATA.length - 1)];
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'geometry', topic: 'Góc vuông', topicKey: 'goc_vuong',
        question: item.q, correctAnswer: item.a,
        options: item.opts,
        illustration: '/images/core/angle.svg',
        explanation: item.e, hints: ['Nhớ: nhọn < 90° < tù < 180°', `Đáp số: ${item.a}`],
    };
}

// ── BATCH 8: Phân số thập phân — SGK Toán 4 ──
export function genPhanSoThapPhan(): MathProblem {
    const denominators = [10, 100, 1000];
    const den = denominators[rand(0, 2)];
    const num = rand(1, den - 1);
    const decimal = num / den;
    const templates = [
        { q: `Viết phân số thập phân ${num}/${den} dưới dạng số thập phân:`, a: String(decimal), e: `${num}/${den} = ${decimal} (chia tử cho mẫu).` },
        { q: `${decimal} viết dưới dạng phân số thập phân là:`, a: `${num}/${den}`, e: `${decimal} = ${num}/${den}.` },
    ];
    const t = templates[rand(0, 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'arithmetic', topic: 'Phân số thập phân', topicKey: 'phan_so_thap_phan',
        question: t.q, correctAnswer: t.a,
        options: [t.a, String(decimal * 10), String(num), `${num * 2}/${den}`],
        illustration: '/images/core/fraction_decimal.svg',
        explanation: t.e, hints: ['PS thập phân có mẫu = 10, 100, 1000', `Đáp số: ${t.a}`],
    };
}

// ── BATCH 8: Số đo thời gian — SGK Toán 5 ──
const TIME_MEASURE_DATA = [
    { q: '1 giờ = ? phút', a: '60', e: '1 giờ = 60 phút.' },
    { q: '1 phút = ? giây', a: '60', e: '1 phút = 60 giây.' },
    { q: '1 ngày = ? giờ', a: '24', e: '1 ngày = 24 giờ.' },
    { q: '2 giờ 30 phút = ? phút', a: '150', e: '2 × 60 + 30 = 150 phút.' },
    { q: '1 năm = ? tháng', a: '12', e: '1 năm = 12 tháng.' },
    { q: '1 thế kỷ = ? năm', a: '100', e: '1 thế kỷ = 100 năm. Thế kỷ XXI = 2001-2100.' },
    { q: '3 giờ = ? phút', a: '180', e: '3 × 60 = 180 phút.' },
    { q: '120 phút = ? giờ', a: '2', e: '120 ÷ 60 = 2 giờ.' },
];

export function genTimeMeasure(): MathProblem {
    const item = TIME_MEASURE_DATA[rand(0, TIME_MEASURE_DATA.length - 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'measurement', topic: 'Số đo thời gian', topicKey: 'time_measure',
        question: item.q, correctAnswer: item.a,
        options: makeOptions(Number(item.a), 10),
        illustration: '/images/core/clock.svg',
        explanation: item.e, hints: ['1h = 60min, 1min = 60s, 1 ngày = 24h', `Đáp số: ${item.a}`],
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
    // Grade 1 — CT 2018 + Singapore Math + Cambridge Primary + IB PYP
    { key: 'add_sub_10', name: 'Cộng trừ trong 10', gradeLevel: 1, generator: genAddSub10, icon: '➕' },
    { key: 'add_sub_20', name: 'Cộng trừ trong 20', gradeLevel: 1, generator: genAddSub20, icon: '✨' },
    { key: 'number_bonds', name: 'Tách–ghép số', gradeLevel: 1, generator: genNumberBonds, icon: '🔗' },
    { key: 'count_20', name: 'Số đến 20', gradeLevel: 1, generator: genCount20, icon: '🔢' },
    { key: 'shapes_g1', name: 'Hình phẳng 2D', gradeLevel: 1, generator: genShapesG1, icon: '🔷' },
    { key: 'shapes_3d', name: 'Khối hình 3D', gradeLevel: 1, generator: genShapes3D, icon: '🧊' },
    { key: 'compare_g1', name: 'So sánh số', gradeLevel: 1, generator: genCompareG1, icon: '⚖️' },
    { key: 'ordinal_spatial', name: 'Thứ tự & Vị trí', gradeLevel: 1, generator: genOrdinalSpatial, icon: '📍' },
    { key: 'count_100', name: 'Số đến 100', gradeLevel: 1, generator: genCountTo100, icon: '💯' },
    { key: 'add_sub_100', name: 'Cộng trừ trong 100', gradeLevel: 1, generator: genAddSub100, icon: '➕' },
    { key: 'measure_length', name: 'Đo độ dài (cm)', gradeLevel: 1, generator: genMeasureLength, icon: '📏' },
    { key: 'days_of_week', name: 'Ngày trong tuần', gradeLevel: 1, generator: genDaysOfWeek, icon: '📅' },
    { key: 'clock_g1', name: 'Đồng hồ giờ đúng', gradeLevel: 1, generator: genClockG1, icon: '🕐' },
    { key: 'zero_ops', name: 'Phép tính với số 0', gradeLevel: 1, generator: genZeroOps, icon: '0️⃣' },
    { key: 'word_g1', name: 'Toán đố lớp 1', gradeLevel: 1, generator: genWordProbG1, icon: '📖' },
    // Grade 2 — CT 2018 + Singapore Math + Cambridge Primary
    { key: 'place_value', name: 'Hàng chục–đơn vị', gradeLevel: 2, generator: genPlaceValue, icon: '🏗️' },
    { key: 'add_sub_carry', name: 'Cộng trừ có nhớ', gradeLevel: 2, generator: genAddSubCarry, icon: '🧮' },
    { key: 'even_odd', name: 'Số chẵn – Số lẻ', gradeLevel: 2, generator: genEvenOdd, icon: '🎲' },
    { key: 'intro_mult', name: 'Nhân sơ khởi', gradeLevel: 2, generator: genIntroMult, icon: '✖️' },
    { key: 'intro_fractions', name: 'Phân số ½ ¼', gradeLevel: 2, generator: genIntroFractions, icon: '🥧' },
    { key: 'clock', name: 'Xem đồng hồ', gradeLevel: 2, generator: genClock, icon: '🕐' },
    { key: 'measure_cm', name: 'Đo độ dài (cm)', gradeLevel: 2, generator: genMeasureCm, icon: '📏' },
    { key: 'word_g2', name: 'Toán đố lớp 2', gradeLevel: 2, generator: genWordProbG2, icon: '📝' },
    { key: 'division_g2', name: 'Phép chia', gradeLevel: 2, generator: genDivision, icon: '➗' },
    { key: 'numbers_1000', name: 'Số đến 1000', gradeLevel: 2, generator: genNumbersTo1000, icon: '🔟' },
    { key: 'mass_volume_g2', name: 'Khối lượng & Dung tích', gradeLevel: 2, generator: genMassVolume, icon: '⚖️' },
    { key: 'money_vn', name: 'Tiền Việt Nam', gradeLevel: 2, generator: genVietnameseMoney, icon: '💰' },
    { key: 'mult_table_2_5', name: 'Bảng nhân 2-5', gradeLevel: 2, generator: genMultTable2_5, icon: '🔢' },
    { key: 'duong_gap_khuc', name: 'Đường gấp khúc', gradeLevel: 2, generator: genDuongGapKhuc, icon: '📐' },
    // Grade 3
    { key: 'mult_div', name: 'Nhân chia cơ bản', gradeLevel: 3, generator: genMultDiv, icon: '✖️' },
    { key: 'mult_table', name: 'Bảng nhân', gradeLevel: 3, generator: genMultTable, icon: '🔢' },
    { key: 'rounding', name: 'Làm tròn số', gradeLevel: 3, generator: genRounding, icon: '🎯' },
    { key: 'basic_stats', name: 'Thống kê đơn giản', gradeLevel: 3, generator: genBasicStats, icon: '📊' },
    { key: 'numbers_10000', name: 'Số đến 10.000', gradeLevel: 3, generator: genNumbersTo10000, icon: '🔟' },
    { key: 'perimeter', name: 'Chu vi', gradeLevel: 3, generator: genPerimeter, icon: '📐' },
    { key: 'patterns', name: 'Quy luật dãy số', gradeLevel: 3, generator: genPatterns, icon: '🔄' },
    { key: 'word_g3', name: 'Toán đố lớp 3', gradeLevel: 3, generator: genWordProbG3, icon: '📖' },
    { key: 'division_table', name: 'Bảng chia', gradeLevel: 3, generator: genDivisionTable, icon: '➗' },
    { key: 'roman_numerals', name: 'Số La Mã', gradeLevel: 3, generator: genRomanNumerals, icon: '🏛️' },
    { key: 'don_vi_do', name: 'Đơn vị đo độ dài', gradeLevel: 3, generator: genDonViDo, icon: '📏' },
    { key: 'goc_vuong', name: 'Góc vuông', gradeLevel: 3, generator: genGocVuong, icon: '📐' },
    // Grade 4
    { key: 'fractions', name: 'Phân số', gradeLevel: 4, generator: genFractions, icon: '🥧' },
    { key: 'area', name: 'Diện tích', gradeLevel: 4, generator: genArea, icon: '⬛' },
    { key: 'angles', name: 'Góc', gradeLevel: 4, generator: genAngles, icon: '📐' },
    { key: 'average', name: 'Trung bình cộng', gradeLevel: 4, generator: genAverage, icon: '➗' },
    { key: 'large_numbers', name: 'Số lớn', gradeLevel: 4, generator: genLargeNumbers, icon: '🔟' },
    { key: 'mass', name: 'Khối lượng', gradeLevel: 4, generator: genMass, icon: '⚖️' },
    { key: 'fraction_add_sub', name: 'Cộng trừ phân số', gradeLevel: 4, generator: genFractionAddSub, icon: '🧩' },
    { key: 'fraction_mult_div', name: 'Nhân chia phân số', gradeLevel: 4, generator: genFractionMultDiv, icon: '✖️' },
    { key: 'divisibility_rules', name: 'Dấu hiệu chia hết', gradeLevel: 4, generator: genDivisibilityRules, icon: '🔍' },
    { key: 'parallelogram_shapes', name: 'Hình BH/thoi/thang', gradeLevel: 4, generator: genParallelogramShapes, icon: '⬟' },
    { key: 'phan_so_thap_phan', name: 'Phân số thập phân', gradeLevel: 4, generator: genPhanSoThapPhan, icon: '🔢' },
    // Grade 5
    { key: 'decimals', name: 'Số thập phân', gradeLevel: 5, generator: genDecimals, icon: '🔸' },
    { key: 'percent', name: 'Phần trăm', gradeLevel: 5, generator: genPercent, icon: '💯' },
    { key: 'ratio', name: 'Tỉ số', gradeLevel: 5, generator: genRatio, icon: '📊' },
    { key: 'volume', name: 'Thể tích', gradeLevel: 5, generator: genVolume, icon: '📦' },
    { key: 'triangle_area', name: 'DT tam giác', gradeLevel: 5, generator: genTriangleArea, icon: '🔺' },
    { key: 'charts', name: 'Biểu đồ & TK', gradeLevel: 5, generator: genCharts, icon: '📈' },
    { key: 'speed_distance_time', name: 'Vận tốc - Quãng đường', gradeLevel: 5, generator: genSpeedDistanceTime, icon: '🚗' },
    { key: 'circle_area', name: 'Hình tròn', gradeLevel: 5, generator: genCircleArea, icon: '⭕' },
    { key: 'map_scale', name: 'Tỉ lệ bản đồ', gradeLevel: 5, generator: genMapScale, icon: '🗺️' },
    { key: 'time_measure', name: 'Số đo thời gian', gradeLevel: 5, generator: genTimeMeasure, icon: '⏱️' },
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
