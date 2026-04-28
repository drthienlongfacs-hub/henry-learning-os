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
        illustration: '/images/math/addition_within_10.png',
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
        illustration: '/images/math/place_value.png',
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
        illustration: '/images/math/shapes_2d.png',
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
        illustration: '/images/math/compare_numbers.png',
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
        illustration: '/images/math/number_bonds.png',
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
        illustration: '/images/math/add_sub_20.png',
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
        illustration: '/images/math/shapes_3d.png',
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
        illustration: '/images/math/ordinal_positions.png',
        explanation: t.e, hints: ['Đếm lần lượt từ trái sang phải', `Đáp số: ${t.a}`],
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
    const t = typeof templates[tIdx] === 'function' ? (templates[tIdx] as Function)() : templates[tIdx];
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'arithmetic', topic: 'Phân tích hàng chục – đơn vị', topicKey: 'place_value',
        question: t.q, correctAnswer: String(t.a),
        options: t.opts || makeOptions(Number(t.a) || tens, 3),
        illustration: '/images/math/place_value.png',
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
    const t = typeof templates[tIdx] === 'function' ? (templates[tIdx] as Function)() : templates[tIdx];
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'comparison', topic: 'Số chẵn – Số lẻ', topicKey: 'even_odd',
        question: t.q, correctAnswer: String(t.a),
        options: t.q.includes('chẵn hay') ? ['Số chẵn', 'Số lẻ'] : makeOptions(Number(t.a) || 10, 3),
        illustration: '/images/math/even_odd.png',
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
        illustration: '/images/math/intro_multiplication.png',
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
    const t = typeof templates[tIdx] === 'function' ? (templates[tIdx] as Function)() : templates[tIdx];
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'fraction', topic: 'Phân số sơ khởi (½, ¼)', topicKey: 'intro_fractions',
        question: t.q, correctAnswer: String(t.a),
        options: t.opts || makeOptions(Number(t.a), 3),
        illustration: '/images/math/intro_fractions.png',
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
        illustration: '/images/math/column_addition.png',
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
        illustration: '/images/math/clock_reading.png',
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
        illustration: '/images/math/ruler_measurement.png',
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
        illustration: '/images/math/word_problem.png',
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
    // Grade 1 — CT 2018 + Singapore Math + Cambridge Primary + IB PYP
    { key: 'add_sub_10', name: 'Cộng trừ trong 10', gradeLevel: 1, generator: genAddSub10, icon: '➕' },
    { key: 'add_sub_20', name: 'Cộng trừ trong 20', gradeLevel: 1, generator: genAddSub20, icon: '✨' },
    { key: 'number_bonds', name: 'Tách–ghép số', gradeLevel: 1, generator: genNumberBonds, icon: '🔗' },
    { key: 'count_20', name: 'Số đến 20', gradeLevel: 1, generator: genCount20, icon: '🔢' },
    { key: 'shapes_g1', name: 'Hình phẳng 2D', gradeLevel: 1, generator: genShapesG1, icon: '🔷' },
    { key: 'shapes_3d', name: 'Khối hình 3D', gradeLevel: 1, generator: genShapes3D, icon: '🧊' },
    { key: 'compare_g1', name: 'So sánh số', gradeLevel: 1, generator: genCompareG1, icon: '⚖️' },
    { key: 'ordinal_spatial', name: 'Thứ tự & Vị trí', gradeLevel: 1, generator: genOrdinalSpatial, icon: '📍' },
    // Grade 2 — CT 2018 + Singapore Math + Cambridge Primary
    { key: 'place_value', name: 'Hàng chục–đơn vị', gradeLevel: 2, generator: genPlaceValue, icon: '🏗️' },
    { key: 'add_sub_carry', name: 'Cộng trừ có nhớ', gradeLevel: 2, generator: genAddSubCarry, icon: '🧮' },
    { key: 'even_odd', name: 'Số chẵn – Số lẻ', gradeLevel: 2, generator: genEvenOdd, icon: '🎲' },
    { key: 'intro_mult', name: 'Nhân sơ khởi', gradeLevel: 2, generator: genIntroMult, icon: '✖️' },
    { key: 'intro_fractions', name: 'Phân số ½ ¼', gradeLevel: 2, generator: genIntroFractions, icon: '🥧' },
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
