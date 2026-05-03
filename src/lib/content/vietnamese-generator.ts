// =====================================================
// Vietnamese Language Generator — CT 2018 Tiếng Việt
// Sources: CT 2018, Cánh Diều textbook series
// =====================================================

export interface VietnameseProblem {
    id: string;
    question: string;
    correctAnswer: string;
    options?: string[];
    illustration?: string;
    explanation: string;
    difficulty: number;
    hints: string[];
    type: 'alphabet' | 'reading' | 'vocabulary' | 'grammar' | 'writing' | 'tone';
    gradeLevel: number;
    topic: string;
    topicKey: string;
    passage?: string;       // Reading comprehension passage
}

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const genId = () => `vn-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const shuffle = <T>(arr: T[]): T[] => {
    const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = rand(0, i);[a[i], a[j]] = [a[j], a[i]]; } return a;
};
const VIETNAMESE_TOPIC_GRADE = {
    reading: 2,
    grammar: 3,
} as const;

// ══════════════════════════════════════════════
// GRADE 1: Alphabet, Tones, Basic Reading
// ══════════════════════════════════════════════

const ALPHABET = 'a ă â b c d đ e ê g h i k l m n o ô ơ p q r s t u ư v x y'.split(' ');
const TONES: { mark: string; name: string; example: string }[] = [
    { mark: 'không dấu', name: 'thanh ngang', example: 'ma (con ma)' },
    { mark: 'dấu sắc', name: 'thanh sắc', example: 'má (mẹ)' },
    { mark: 'dấu huyền', name: 'thanh huyền', example: 'mà (liên từ)' },
    { mark: 'dấu hỏi', name: 'thanh hỏi', example: 'mả (mồ mả)' },
    { mark: 'dấu ngã', name: 'thanh ngã', example: 'mã (ngựa)' },
    { mark: 'dấu nặng', name: 'thanh nặng', example: 'mạ (cây mạ)' },
];

export function genAlphabet(): VietnameseProblem {
    const templates = [
        () => {
            const idx = rand(0, ALPHABET.length - 1);
            const letter = ALPHABET[idx];
            const next = ALPHABET[(idx + 1) % ALPHABET.length];
            return { q: `Chữ cái nào đứng sau "${letter}" trong bảng chữ cái?`, a: next, e: `Thứ tự: ...${letter}, ${next}...` };
        },
        () => {
            const idx = rand(1, ALPHABET.length - 1);
            const letter = ALPHABET[idx];
            const prev = ALPHABET[idx - 1];
            return { q: `Chữ cái nào đứng trước "${letter}"?`, a: prev, e: `Thứ tự: ...${prev}, ${letter}...` };
        },
        () => {
            const letters = shuffle([...ALPHABET]).slice(0, 4);
            const sorted = [...letters].sort((a, b) => ALPHABET.indexOf(a) - ALPHABET.indexOf(b));
            return { q: `Sắp xếp theo thứ tự ABC: ${letters.join(', ')}`, a: sorted.join(', '), e: `Đúng thứ tự: ${sorted.join(', ')}.` };
        },
    ];
    const t = templates[rand(0, 2)]();
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'alphabet', topic: 'Bảng chữ cái', topicKey: 'alphabet',
        question: t.q, correctAnswer: t.a,
        options: t.q.includes('Sắp xếp') ? shuffle([t.a, t.a.split(', ').reverse().join(', '), t.a.replace(/a, ă/, 'ă, a')]) : shuffle([t.a, ALPHABET[rand(0, 10)], ALPHABET[rand(11, 20)], ALPHABET[rand(21, 28)]]).slice(0, 4),
        illustration: '/images/core/letters_vn.svg',
        explanation: t.e, hints: ['Nhớ thứ tự: a, ă, â, b, c, d, đ, e, ê...', `Đáp số: ${t.a}`],
    };
}

export function genTones(): VietnameseProblem {
    const tone = TONES[rand(0, TONES.length - 1)];
    const templates = [
        { q: `"${tone.example.split(' ')[0]}" mang dấu gì?`, a: tone.mark, e: `${tone.example} — mang ${tone.mark} (${tone.name}).` },
        { q: `${tone.name} là dấu gì?`, a: tone.mark, e: `${tone.name} = ${tone.mark}. Ví dụ: ${tone.example}.` },
    ];
    const t = templates[rand(0, 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'tone', topic: 'Dấu thanh', topicKey: 'tones',
        question: t.q, correctAnswer: t.a,
        options: TONES.map(t => t.mark),
        illustration: '/images/core/musical_notes.svg',
        explanation: t.e, hints: ['6 thanh: ngang, sắc, huyền, hỏi, ngã, nặng', `Đáp số: ${t.a}`],
    };
}

// ── NEW G1: Vần (Syllable/Rhyme Recognition) — CT 2018 Core ──
const VANS = [
    { van: 'an', words: ['ban', 'man', 'tan', 'can'] },
    { van: 'at', words: ['bat', 'mat', 'hat', 'cat'] },
    { van: 'am', words: ['cam', 'dam', 'ham', 'lam'] },
    { van: 'ong', words: ['bong', 'cong', 'dong', 'song'] },
    { van: 'en', words: ['ben', 'den', 'hen', 'ken'] },
    { van: 'in', words: ['bin', 'din', 'kin', 'tin'] },
    { van: 'oi', words: ['boi', 'coi', 'doi', 'goi'] },
    { van: 'ai', words: ['bai', 'cai', 'dai', 'hai'] },
    { van: 'uon', words: ['buon', 'cuon', 'muon', 'luon'] },
    { van: 'ien', words: ['bien', 'chien', 'dien', 'kien'] },
];

export function genVan(): VietnameseProblem {
    const v = VANS[rand(0, VANS.length - 1)];
    const word = v.words[rand(0, v.words.length - 1)];
    const otherVans = shuffle(VANS.filter(x => x.van !== v.van)).slice(0, 3);
    const templates = [
        { q: `Từ "${word}" có vần gì?`, a: v.van, opts: shuffle([v.van, ...otherVans.map(x => x.van)]), e: `"${word}" = phụ âm + vần "${v.van}".` },
        { q: `Tìm từ cùng vần "${v.van}":`, a: v.words[0], opts: shuffle([v.words[0], ...otherVans.map(x => x.words[0])]), e: `Các từ vần "${v.van}": ${v.words.join(', ')}.` },
    ];
    const t = templates[rand(0, 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'alphabet', topic: 'Vần', topicKey: 'van',
        question: t.q, correctAnswer: t.a,
        options: t.opts,
        illustration: '/images/core/letters_vn.svg',
        explanation: t.e, hints: ['Vần = phần cuối của tiếng', `Đáp số: ${t.a}`],
    };
}

// ── NEW G1: Ghép từ (Word Building) — CT 2018 Core ──
const GHEP_TU = [
    { parts: ['nhà', 'cửa'], result: 'nhà cửa', meaning: 'nơi ở' },
    { parts: ['ông', 'bà'], result: 'ông bà', meaning: 'ông và bà' },
    { parts: ['sách', 'vở'], result: 'sách vở', meaning: 'đồ dùng học tập' },
    { parts: ['hoa', 'quả'], result: 'hoa quả', meaning: 'trái cây' },
    { parts: ['bàn', 'ghế'], result: 'bàn ghế', meaning: 'đồ nội thất' },
    { parts: ['trời', 'đất'], result: 'trời đất', meaning: 'thiên nhiên' },
    { parts: ['xe', 'cộ'], result: 'xe cộ', meaning: 'phương tiện đi lại' },
    { parts: ['con', 'cái'], result: 'con cái', meaning: 'con của bố mẹ' },
];

export function genGhepTu(): VietnameseProblem {
    const item = GHEP_TU[rand(0, GHEP_TU.length - 1)];
    const others = shuffle(GHEP_TU.filter(x => x.result !== item.result)).slice(0, 3);
    const templates = [
        { q: `Ghép "${item.parts[0]}" với từ nào để thành từ có nghĩa?`, a: item.parts[1], opts: shuffle([item.parts[1], ...others.map(x => x.parts[1])]), e: `"${item.parts[0]}" + "${item.parts[1]}" = "${item.result}" (${item.meaning}).` },
        { q: `"${item.result}" gồm mấy tiếng?`, a: '2 tiếng', opts: ['1 tiếng', '2 tiếng', '3 tiếng', '4 tiếng'], e: `"${item.result}" = "${item.parts[0]}" + "${item.parts[1]}" → 2 tiếng.` },
    ];
    const t = templates[rand(0, 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'vocabulary', topic: 'Ghép từ', topicKey: 'ghep_tu',
        question: t.q, correctAnswer: t.a,
        options: t.opts,
        illustration: '/images/core/letters_vn.svg',
        explanation: t.e, hints: ['Ghép 2 tiếng thành 1 từ có nghĩa', `Đáp số: ${t.a}`],
    };
}

// ── NEW G2: Chính tả (Spelling Rules) — CT 2018 Core ──
const CHINH_TA = [
    { q: 'Điền "s" hay "x": ___inh nhật?', a: 's', full: 'sinh nhật', rule: '"sinh" viết với "s"' },
    { q: 'Điền "ch" hay "tr": ___ường học?', a: 'tr', full: 'trường học', rule: '"trường" viết với "tr"' },
    { q: 'Điền "gi" hay "d": ___a đình?', a: 'gi', full: 'gia đình', rule: '"gia" viết với "gi"' },
    { q: 'Điền "ng" hay "ngh": ___ỉ hè?', a: 'ngh', full: 'nghỉ hè', rule: '"nghỉ" viết với "ngh" (trước i, e, ê)' },
    { q: 'Điền "g" hay "gh": ___ế ngồi?', a: 'gh', full: 'ghế ngồi', rule: '"ghế" viết với "gh" (trước e, ê, i)' },
    { q: 'Điền "c" hay "k": ___éo dài?', a: 'k', full: 'kéo dài', rule: '"kéo" viết với "k" (trước e, ê, i)' },
];

export function genChinhTa(): VietnameseProblem {
    const item = CHINH_TA[rand(0, CHINH_TA.length - 1)];
    const opts = item.q.includes('"s" hay "x"') ? ['s', 'x'] :
        item.q.includes('"ch" hay "tr"') ? ['ch', 'tr'] :
        item.q.includes('"gi" hay "d"') ? ['gi', 'd'] :
        item.q.includes('"ng" hay "ngh"') ? ['ng', 'ngh'] :
        item.q.includes('"g" hay "gh"') ? ['g', 'gh'] : ['c', 'k'];
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'alphabet', topic: 'Chính tả', topicKey: 'chinh_ta',
        question: item.q, correctAnswer: item.a,
        options: opts,
        illustration: '/images/core/pencil_icon.svg',
        explanation: `Đáp án: "${item.full}". Quy tắc: ${item.rule}.`,
        hints: ['Nhớ quy tắc chính tả', `Đáp số: ${item.a}`],
    };
}

// ── NEW G1: Phụ âm ghép — SGK Cánh Diều Tập 1 ──
const PHU_AM_GHEP = [
    { ghep: 'ch', words: ['chó', 'chào', 'chạy', 'chim'], sound: 'chờ' },
    { ghep: 'kh', words: ['kho', 'khóc', 'khỏe', 'khăn'], sound: 'khờ' },
    { ghep: 'ph', words: ['phở', 'phố', 'phim', 'phía'], sound: 'phờ' },
    { ghep: 'nh', words: ['nhà', 'nhỏ', 'nhớ', 'nhảy'], sound: 'nhờ' },
    { ghep: 'gh', words: ['ghế', 'ghi', 'ghẹ', 'ghép'], sound: 'gờ (ghép)' },
    { ghep: 'ng', words: ['ngà', 'ngô', 'ngủ', 'ngon'], sound: 'ngờ' },
    { ghep: 'ngh', words: ['nghỉ', 'nghề', 'nghé', 'nghiêng'], sound: 'ngờ (trước i,e,ê)' },
    { ghep: 'tr', words: ['trời', 'trường', 'trẻ', 'trâu'], sound: 'trờ' },
    { ghep: 'qu', words: ['quả', 'quê', 'quân', 'quán'], sound: 'quờ' },
    { ghep: 'gi', words: ['già', 'giỏi', 'giày', 'gió'], sound: 'giờ' },
    { ghep: 'th', words: ['thầy', 'thỏ', 'thuyền', 'thương'], sound: 'thờ' },
];

export function genPhuAmGhep(): VietnameseProblem {
    const item = PHU_AM_GHEP[rand(0, PHU_AM_GHEP.length - 1)];
    const word = item.words[rand(0, item.words.length - 1)];
    const others = shuffle(PHU_AM_GHEP.filter(x => x.ghep !== item.ghep)).slice(0, 3);
    const templates = [
        { q: `Từ "${word}" bắt đầu bằng phụ âm ghép nào?`, a: item.ghep, opts: shuffle([item.ghep, ...others.map(x => x.ghep)]), e: `"${word}" bắt đầu bằng "${item.ghep}" (${item.sound}).` },
        { q: `Phụ âm ghép "${item.ghep}" đọc là gì?`, a: item.sound, opts: shuffle([item.sound, ...others.map(x => x.sound)]), e: `"${item.ghep}" đọc là "${item.sound}".` },
        { q: `Tìm từ bắt đầu bằng "${item.ghep}":`, a: word, opts: shuffle([word, ...others.map(x => x.words[0])]), e: `Các từ bắt đầu bằng "${item.ghep}": ${item.words.join(', ')}.` },
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'alphabet', topic: 'Phụ âm ghép', topicKey: 'phu_am_ghep',
        question: t.q, correctAnswer: t.a,
        options: t.opts,
        illustration: '/images/core/letters_vn.svg',
        explanation: t.e, hints: ['Phụ âm ghép = 2-3 chữ cái ghép lại thành 1 âm', `Đáp số: ${t.a}`],
    };
}

// ── NEW G1: Vần mở rộng — SGK Cánh Diều Tập 2 ──
const VANS_EXTENDED = [
    // Vần có âm cuối -n/-m
    { van: 'ân', words: ['cân', 'dân', 'lân', 'tân'] },
    { van: 'ôn', words: ['bôn', 'côn', 'hôn', 'tôn'] },
    { van: 'ơn', words: ['bơn', 'đơn', 'hơn', 'mơn'] },
    { van: 'un', words: ['bun', 'cun', 'lun', 'tun'] },
    { van: 'om', words: ['bom', 'com', 'dom', 'hom'] },
    { van: 'ôm', words: ['bôm', 'côm', 'đôm', 'ôm'] },
    { van: 'êm', words: ['bêm', 'đêm', 'hêm', 'kêm'] },
    { van: 'im', words: ['bim', 'dim', 'kim', 'tim'] },
    // Vần có âm cuối -t/-c
    { van: 'ot', words: ['bot', 'cot', 'got', 'hot'] },
    { van: 'ăt', words: ['bắt', 'cắt', 'hắt', 'mắt'] },
    { van: 'ât', words: ['bật', 'hất', 'lật', 'mật'] },
    { van: 'ut', words: ['but', 'cut', 'hut', 'tut'] },
    { van: 'ac', words: ['bác', 'các', 'hạc', 'tạc'] },
    { van: 'uc', words: ['bục', 'cục', 'đục', 'lục'] },
    { van: 'ôc', words: ['bốc', 'cốc', 'đốc', 'tốc'] },
    // Vần có âm cuối -ng/-nh
    { van: 'ang', words: ['bàng', 'đàng', 'hàng', 'nàng'] },
    { van: 'ông', words: ['bông', 'công', 'đông', 'sông'] },
    { van: 'ăng', words: ['băng', 'hăng', 'măng', 'năng'] },
    { van: 'ung', words: ['bung', 'dung', 'lung', 'sung'] },
    { van: 'anh', words: ['bạnh', 'đạnh', 'hạnh', 'nhanh'] },
    { van: 'inh', words: ['bình', 'đình', 'kính', 'tình'] },
    { van: 'ênh', words: ['bệnh', 'đệnh', 'hềnh', 'kênh'] },
    // Vần ghép phức tạp
    { van: 'ươn', words: ['cươn', 'hươn', 'lươn', 'vươn'] },
    { van: 'iêu', words: ['biểu', 'chiều', 'diều', 'hiểu'] },
    { van: 'uôi', words: ['chuối', 'đuổi', 'muối', 'tuổi'] },
    { van: 'ươi', words: ['bưởi', 'cười', 'mười', 'tười'] },
    { van: 'uôn', words: ['buồn', 'cuốn', 'muốn', 'luôn'] },
    { van: 'iên', words: ['biên', 'chiến', 'diện', 'kiến'] },
    { van: 'ươc', words: ['bước', 'được', 'mước', 'nước'] },
    { van: 'ach', words: ['bạch', 'cách', 'hạch', 'mạch'] },
];

export function genVanExtended(): VietnameseProblem {
    const allVans = [...VANS, ...VANS_EXTENDED];
    const v = VANS_EXTENDED[rand(0, VANS_EXTENDED.length - 1)];
    const word = v.words[rand(0, v.words.length - 1)];
    const otherVans = shuffle(allVans.filter(x => x.van !== v.van)).slice(0, 3);
    const templates = [
        { q: `Từ "${word}" có vần gì?`, a: v.van, opts: shuffle([v.van, ...otherVans.map(x => x.van)]), e: `"${word}" có vần "${v.van}".` },
        { q: `Tìm từ cùng vần "${v.van}":`, a: v.words[0], opts: shuffle([v.words[0], ...otherVans.map(x => x.words[0])]), e: `Các từ vần "${v.van}": ${v.words.join(', ')}.` },
        { q: `Phân biệt: "${v.van}" thuộc nhóm vần nào?`, a: v.van.endsWith('ng') || v.van.endsWith('nh') ? 'Vần có âm cuối -ng/-nh' : v.van.endsWith('n') || v.van.endsWith('m') ? 'Vần có âm cuối -n/-m' : 'Vần có âm cuối -t/-c', opts: ['Vần có âm cuối -n/-m', 'Vần có âm cuối -t/-c', 'Vần có âm cuối -ng/-nh', 'Vần đơn'], e: `Vần "${v.van}" thuộc nhóm vần có âm cuối phù hợp.` },
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'alphabet', topic: 'Vần mở rộng', topicKey: 'van_extended',
        question: t.q, correctAnswer: t.a,
        options: t.opts,
        illustration: '/images/core/letters_vn.svg',
        explanation: t.e, hints: ['Nhớ: vần = phần sau phụ âm đầu', `Đáp số: ${t.a}`],
    };
}

// ── NEW G2: Tập đọc đoạn ngắn — SGK Cánh Diều Phần 3 ──
const TAP_DOC = [
    { passage: 'Mèo con có bộ lông mượt. Nó thích nằm sưởi nắng. Mỗi sáng, mèo con chạy ra vườn đuổi bướm.',
      questions: [
        { q: 'Mèo con thích làm gì?', a: 'Nằm sưởi nắng', opts: ['Nằm sưởi nắng', 'Chơi bóng', 'Leo cây', 'Bơi lội'] },
        { q: 'Mỗi sáng mèo con làm gì?', a: 'Chạy ra vườn đuổi bướm', opts: ['Chạy ra vườn đuổi bướm', 'Ngủ tiếp', 'Ăn sáng', 'Tắm rửa'] },
      ] },
    { passage: 'Bé Lan đi học lớp Một. Sáng nào bé cũng dậy sớm. Mẹ chuẩn bị cặp sách cho bé. Bé Lan rất yêu trường.',
      questions: [
        { q: 'Bé Lan học lớp mấy?', a: 'Lớp Một', opts: ['Lớp Một', 'Lớp Hai', 'Lớp Ba', 'Mẫu giáo'] },
        { q: 'Ai chuẩn bị cặp sách cho bé?', a: 'Mẹ', opts: ['Mẹ', 'Bố', 'Bà', 'Anh'] },
      ] },
    { passage: 'Con cá bơi dưới ao. Nước trong xanh. Cá vàng đẹp lắm. Bé thích ngồi nhìn cá bơi.',
      questions: [
        { q: 'Con cá bơi ở đâu?', a: 'Dưới ao', opts: ['Dưới ao', 'Trên sông', 'Trong biển', 'Trong bể'] },
        { q: 'Nước ao thế nào?', a: 'Trong xanh', opts: ['Trong xanh', 'Đục', 'Đỏ', 'Vàng'] },
      ] },
    { passage: 'Hoa hồng có nhiều màu: đỏ, vàng, trắng, hồng. Hoa hồng rất thơm. Mẹ trồng hoa hồng trong vườn.',
      questions: [
        { q: 'Hoa hồng có mấy màu được kể?', a: '4 màu', opts: ['4 màu', '2 màu', '3 màu', '5 màu'] },
        { q: 'Ai trồng hoa hồng?', a: 'Mẹ', opts: ['Mẹ', 'Bố', 'Bé', 'Bà'] },
      ] },
];

export function genTapDoc(): VietnameseProblem {
    const item = TAP_DOC[rand(0, TAP_DOC.length - 1)];
    const qItem = item.questions[rand(0, item.questions.length - 1)];
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'reading', topic: 'Tập đọc', topicKey: 'tap_doc',
        question: `📖 Đọc đoạn văn:\n"${item.passage}"\n\n${qItem.q}`,
        correctAnswer: qItem.a,
        options: qItem.opts,
        illustration: '/images/core/book_icon.svg',
        explanation: `Đáp án: ${qItem.a}. Tìm trong đoạn văn.`,
        hints: ['Đọc kỹ đoạn văn trước khi trả lời', `Đáp số: ${qItem.a}`],
    };
}

// ── NEW G3: Luyện từ & câu (Sentence Practice) — SGK L3 ──
const LUYEN_TU_CAU = [
    { q: 'Tìm từ trái nghĩa của "to":',       a: 'nhỏ',     opts: ['nhỏ', 'lớn', 'cao', 'rộng'] },
    { q: 'Tìm từ đồng nghĩa của "đẹp":',     a: 'xinh',    opts: ['xinh', 'xấu', 'to', 'nhỏ'] },
    { q: 'Đặt dấu câu: "Bạn tên gì___"',      a: '?',       opts: ['?', '.', '!', ','] },
    { q: 'Từ nào là danh từ: chạy, cái bàn, nhanh, xanh?', a: 'cái bàn', opts: ['cái bàn', 'chạy', 'nhanh', 'xanh'] },
    { q: 'Từ nào là động từ: đi, nhà, sách, đẹp?',          a: 'đi',      opts: ['đi', 'nhà', 'sách', 'đẹp'] },
    { q: 'Từ nào là tính từ: ăn, cây, đỏ, bút?',            a: 'đỏ',     opts: ['đỏ', 'ăn', 'cây', 'bút'] },
    { q: 'Điền từ: "Mặt trời ___ từ phương Đông."',          a: 'mọc',    opts: ['mọc', 'lặn', 'tắt', 'chạy'] },
    { q: 'Tìm chủ ngữ: "Bé Lan đi học."',                    a: 'Bé Lan', opts: ['Bé Lan', 'đi học', 'đi', 'học'] },
];

export function genLuyenTuCau(): VietnameseProblem {
    const item = LUYEN_TU_CAU[rand(0, LUYEN_TU_CAU.length - 1)];
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'grammar', topic: 'Luyện từ & câu', topicKey: 'luyen_tu_cau',
        question: item.q, correctAnswer: item.a,
        options: item.opts,
        illustration: '/images/core/pencil_icon.svg',
        explanation: `Đáp án: ${item.a}.`,
        hints: ['Nhớ phân biệt: Danh từ (tên sự vật), Động từ (hành động), Tính từ (đặc điểm)', `Đáp số: ${item.a}`],
    };
}

// ── NEW G2: Kể chuyện theo tranh — SGK Tiếng Việt 2 ──
const KE_CHUYEN = [
    { story: 'Bé đi học', frames: ['Bé thức dậy', 'Bé đánh răng rửa mặt', 'Bé ăn sáng', 'Bé đi đến trường'],
      questions: [
        { q: 'Bé làm gì đầu tiên sau khi thức dậy?', a: 'Đánh răng rửa mặt', opts: ['Đánh răng rửa mặt', 'Ăn sáng', 'Đi học', 'Ngủ tiếp'] },
        { q: 'Sắp xếp đúng thứ tự: Bé ăn sáng → Bé ___ → Bé đi đến trường.', a: 'ăn sáng xong', opts: ['ăn sáng xong', 'ngủ trưa', 'xem tivi', 'chơi game'] },
      ] },
    { story: 'Cây lúa', frames: ['Nông dân gieo hạt', 'Mạ xanh mọc lên', 'Cấy lúa xuống ruộng', 'Thu hoạch lúa vàng'],
      questions: [
        { q: 'Việc gì diễn ra trước khi cấy lúa?', a: 'Mạ xanh mọc lên', opts: ['Mạ xanh mọc lên', 'Thu hoạch', 'Phơi lúa', 'Xay gạo'] },
        { q: 'Bước cuối cùng là gì?', a: 'Thu hoạch lúa vàng', opts: ['Thu hoạch lúa vàng', 'Gieo hạt', 'Cấy lúa', 'Tưới nước'] },
      ] },
    { story: 'Chú bướm', frames: ['Trứng nằm trên lá', 'Sâu non chui ra', 'Sâu hóa kén', 'Bướm bay ra từ kén'],
      questions: [
        { q: 'Sau giai đoạn sâu non là gì?', a: 'Sâu hóa kén', opts: ['Sâu hóa kén', 'Bướm bay', 'Đẻ trứng', 'Ăn lá'] },
        { q: 'Vòng đời bướm bắt đầu từ đâu?', a: 'Trứng', opts: ['Trứng', 'Sâu', 'Kén', 'Bướm'] },
      ] },
];

export function genKeChuyenTheoTranh(): VietnameseProblem {
    const item = KE_CHUYEN[rand(0, KE_CHUYEN.length - 1)];
    const qItem = item.questions[rand(0, item.questions.length - 1)];
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'reading', topic: 'Kể chuyện theo tranh', topicKey: 'ke_chuyen',
        question: `🖼️ Câu chuyện "${item.story}":\n${item.frames.map((f, i) => `Tranh ${i + 1}: ${f}`).join('\n')}\n\n${qItem.q}`,
        correctAnswer: qItem.a,
        options: qItem.opts,
        illustration: '/images/core/story_icon.svg',
        explanation: `Đáp án: ${qItem.a}. Thứ tự đúng: ${item.frames.join(' → ')}.`,
        hints: ['Đọc kỹ thứ tự các tranh', `Đáp số: ${qItem.a}`],
    };
}

// ── BATCH 9: Nghe kể chuyện — SGK TV1 ──
const NGHE_KE_CHUYEN = [
    { story: 'Con Thỏ và Rùa thi chạy. Thỏ chủ quan ngủ trưa. Rùa kiên trì chạy từ từ và thắng cuộc.',
      questions: [
        { q: 'Ai thắng cuộc thi chạy?', a: 'Rùa', opts: ['Rùa', 'Thỏ', 'Cả hai', 'Không ai'] },
        { q: 'Vì sao Thỏ thua?', a: 'Vì Thỏ chủ quan ngủ trưa', opts: ['Vì Thỏ chủ quan ngủ trưa', 'Vì Thỏ chạy chậm', 'Vì Rùa gian lận', 'Vì trời mưa'] },
      ] },
    { story: 'Tích Chu ham chơi, không chăm bà ốm. Tiên biến bà thành chim. Tích Chu hối hận, tìm nước suối tiên cứu bà.',
      questions: [
        { q: 'Bà bị biến thành gì?', a: 'Con chim', opts: ['Con chim', 'Con cá', 'Con thỏ', 'Cây hoa'] },
        { q: 'Bài học từ câu chuyện là gì?', a: 'Phải biết chăm sóc người thân', opts: ['Phải biết chăm sóc người thân', 'Nên đi chơi nhiều', 'Không cần học', 'Tiên rất giỏi'] },
      ] },
];

export function genNgheKeChuyen(): VietnameseProblem {
    const item = NGHE_KE_CHUYEN[rand(0, NGHE_KE_CHUYEN.length - 1)];
    const qItem = item.questions[rand(0, item.questions.length - 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'reading', topic: 'Nghe kể chuyện', topicKey: 'nghe_ke_chuyen',
        question: `📖 Nghe kể:\n"${item.story}"\n\n${qItem.q}`,
        correctAnswer: qItem.a, options: qItem.opts,
        illustration: '/images/core/book_open.svg',
        explanation: `Đáp án: ${qItem.a}.`, hints: ['Nghe kỹ câu chuyện', `Đáp số: ${qItem.a}`],
    };
}

// ── BATCH 9: Tập đọc thơ — SGK TV1 ──
const THO_G1 = [
    { tho: 'Trăng ơi... từ đâu đến?\nHay từ cánh đồng xa?\nTrăng hồng như quả chín\nLơ lửng trước hiên nhà.', author: 'Trần Đăng Khoa',
      questions: [
        { q: 'Trăng được so sánh với gì?', a: 'Quả chín', opts: ['Quả chín', 'Ngôi sao', 'Bông hoa', 'Con thuyền'] },
        { q: 'Trăng ở đâu?', a: 'Trước hiên nhà', opts: ['Trước hiên nhà', 'Trên cánh đồng', 'Dưới biển', 'Trong rừng'] },
      ] },
    { tho: 'Con cò mà đi ăn đêm\nĐậu phải cành mềm lộn cổ xuống ao\nÔng ơi ông vớt tôi nao\nTôi có lòng nào ông hãy xáo măng.', author: 'Ca dao',
      questions: [
        { q: 'Con cò bị gì?', a: 'Lộn cổ xuống ao', opts: ['Lộn cổ xuống ao', 'Bay lên trời', 'Ngủ quên', 'Bị bắt'] },
        { q: '"Con cò" trong bài thường tượng trưng cho ai?', a: 'Người nông dân', opts: ['Người nông dân', 'Trẻ em', 'Ông tiên', 'Chú bộ đội'] },
      ] },
];

export function genTapDocTho(): VietnameseProblem {
    const item = THO_G1[rand(0, THO_G1.length - 1)];
    const qItem = item.questions[rand(0, item.questions.length - 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'reading', topic: 'Tập đọc thơ', topicKey: 'tap_doc_tho',
        question: `📝 Đọc bài thơ:\n"${item.tho}"\n(${item.author})\n\n${qItem.q}`,
        correctAnswer: qItem.a, options: qItem.opts,
        illustration: '/images/core/poem.svg',
        explanation: `Đáp án: ${qItem.a}.`, hints: ['Đọc kỹ từng câu thơ', `Đáp số: ${qItem.a}`],
    };
}

// ── BATCH 9: Đọc hiểu văn bản G3 — SGK TV3 ──
const DOC_HIEU_G3 = [
    { passage: 'Mùa thu, bầu trời xanh trong. Lá cây chuyển sang vàng. Những cánh diều bay cao trên đồng cỏ. Trẻ em vui vẻ chơi thả diều.',
      questions: [
        { q: 'Bài văn tả cảnh mùa gì?', a: 'Mùa thu', opts: ['Mùa thu', 'Mùa hè', 'Mùa đông', 'Mùa xuân'] },
        { q: 'Lá cây chuyển màu gì?', a: 'Vàng', opts: ['Vàng', 'Đỏ', 'Xanh', 'Tím'] },
        { q: 'Trẻ em chơi trò gì?', a: 'Thả diều', opts: ['Thả diều', 'Đá bóng', 'Nhảy dây', 'Trốn tìm'] },
      ] },
    { passage: 'Làng em có một con sông nhỏ. Nước trong veo, nhìn thấy cá bơi. Hai bên bờ là hàng tre xanh. Chiều chiều, các bạn ra sông tắm mát.',
      questions: [
        { q: 'Nước sông thế nào?', a: 'Trong veo', opts: ['Trong veo', 'Đục ngầu', 'Đen kịt', 'Đỏ au'] },
        { q: 'Hai bên bờ có gì?', a: 'Hàng tre xanh', opts: ['Hàng tre xanh', 'Hàng phượng', 'Hàng dừa', 'Hàng xoài'] },
      ] },
];

export function genDocHieuG3(): VietnameseProblem {
    const item = DOC_HIEU_G3[rand(0, DOC_HIEU_G3.length - 1)];
    const qItem = item.questions[rand(0, item.questions.length - 1)];
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'reading', topic: 'Đọc hiểu G3', topicKey: 'doc_hieu_g3',
        question: `📖 Đọc đoạn văn:\n"${item.passage}"\n\n${qItem.q}`,
        correctAnswer: qItem.a, options: qItem.opts,
        illustration: '/images/core/book_open.svg',
        explanation: `Đáp án: ${qItem.a}.`, hints: ['Đọc kỹ đoạn văn, tìm chi tiết', `Đáp số: ${qItem.a}`],
    };
}

// ── BATCH 9: Từ Hán Việt — SGK TV4 ──
const TU_HAN_VIET = [
    { q: '"Quốc gia" có nghĩa là:', a: 'Đất nước', opts: ['Đất nước', 'Gia đình', 'Trường học', 'Bệnh viện'], e: 'Quốc = nước, gia = nhà → Quốc gia = đất nước.' },
    { q: '"Nhân dân" có nghĩa là:', a: 'Mọi người trong nước', opts: ['Mọi người trong nước', 'Nhân viên', 'Gia đình', 'Bạn bè'], e: 'Nhân = người, dân = dân → nhân dân = mọi người.' },
    { q: 'Từ nào là từ Hán Việt?', a: 'Thiên nhiên', opts: ['Thiên nhiên', 'Cây cối', 'Bông hoa', 'Con mèo'], e: 'Thiên = trời, nhiên = tự nhiên → Thiên nhiên = tự nhiên.' },
    { q: '"Giáo dục" nghĩa là:', a: 'Dạy dỗ, nuôi dưỡng', opts: ['Dạy dỗ, nuôi dưỡng', 'Chơi game', 'Đi làm', 'Nấu ăn'], e: 'Giáo = dạy, dục = nuôi dưỡng.' },
    { q: '"Hải sản" gồm từ nào?', a: 'Hải (biển) + Sản (sản phẩm)', opts: ['Hải (biển) + Sản (sản phẩm)', 'Hải (trời) + Sản (đất)', 'Hải (núi) + Sản (rừng)', 'Hải (sông) + Sản (cá)'], e: 'Hải = biển, sản = sản phẩm → hải sản = sản phẩm từ biển.' },
];

export function genTuHanViet(): VietnameseProblem {
    const item = TU_HAN_VIET[rand(0, TU_HAN_VIET.length - 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'grammar', topic: 'Từ Hán Việt', topicKey: 'tu_han_viet',
        question: item.q, correctAnswer: item.a, options: item.opts,
        illustration: '/images/core/scroll.svg',
        explanation: item.e, hints: ['Từ Hán Việt gốc chữ Hán, thường trang trọng', `Đáp số: ${item.a}`],
    };
}

// ── BATCH 9: Văn tả cảnh — SGK TV5 ──
const VAN_TA_CANH = [
    { prompt: 'Tả cảnh buổi sáng trên cánh đồng.',
      sample: 'Buổi sáng, cánh đồng bát ngát. Sương mai đọng trên lá lúa. Mặt trời từ từ nhô lên, phủ ánh vàng khắp nơi. Xa xa, tiếng gà gáy vang.',
      questions: [
        { q: 'Bài văn tả cảnh dùng giác quan nào?', a: 'Thị giác và thính giác', opts: ['Thị giác và thính giác', 'Chỉ vị giác', 'Chỉ xúc giác', 'Khứu giác'] },
        { q: 'Trình tự tả trong bài này là:', a: 'Từ gần đến xa', opts: ['Từ gần đến xa', 'Từ xa đến gần', 'Từ trên xuống dưới', 'Từ trái sang phải'] },
      ] },
    { prompt: 'Tả cảnh biển vào buổi chiều.',
      sample: 'Hoàng hôn buông xuống. Mặt trời như quả cầu lửa từ từ chìm vào biển. Sóng vỗ nhè nhẹ bờ cát. Gió biển mát rượi, mang theo vị mặn.',
      questions: [
        { q: '"Mặt trời như quả cầu lửa" dùng biện pháp gì?', a: 'So sánh', opts: ['So sánh', 'Nhân hóa', 'Ẩn dụ', 'Điệp ngữ'] },
        { q: 'Bài văn tả theo trình tự nào?', a: 'Trình tự thời gian', opts: ['Trình tự thời gian', 'Trình tự không gian', 'Theo cảm xúc', 'Ngẫu nhiên'] },
      ] },
];

export function genVanTaCanh(): VietnameseProblem {
    const item = VAN_TA_CANH[rand(0, VAN_TA_CANH.length - 1)];
    const qItem = item.questions[rand(0, item.questions.length - 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'grammar', topic: 'Văn tả cảnh', topicKey: 'van_ta_canh',
        question: `✏️ Đề: "${item.prompt}"\n\nĐoạn mẫu:\n"${item.sample}"\n\n${qItem.q}`,
        correctAnswer: qItem.a, options: qItem.opts,
        illustration: '/images/core/landscape.svg',
        explanation: `Đáp án: ${qItem.a}.`, hints: ['Tả cảnh: quan sát + trình tự + cảm xúc', `Đáp số: ${qItem.a}`],
    };
}

// ── NEW G1: Tập viết (Nét cơ bản) — SGK TV1 ──
const TAP_VIET = [
    { q: 'Chữ "a" gồm những nét gì?', a: 'Nét cong kín và nét móc ngược', opts: ['Nét cong kín và nét móc ngược', 'Nét sổ thẳng', 'Nét ngang', 'Nét xiên phải'], e: 'Chữ "a" = nét cong kín + nét móc ngược (phải).' },
    { q: 'Chữ nào có nét khuyết trên?', a: 'b', opts: ['b', 'a', 'c', 'o'], e: 'Chữ "b" có nét khuyết trên (thân chữ vươn lên cao).' },
    { q: 'Chữ "o" gồm nét gì?', a: 'Nét cong kín', opts: ['Nét cong kín', 'Nét sổ thẳng', 'Nét móc', 'Nét xiên'], e: 'Chữ "o" chỉ có 1 nét: nét cong kín.' },
    { q: 'Chữ nào có nét khuyết dưới?', a: 'g', opts: ['g', 'a', 'e', 'o'], e: 'Chữ "g" có nét khuyết dưới (phần dưới cong xuống).' },
    { q: 'Khi viết, chữ nào cao 2,5 ô li?', a: 'h', opts: ['h', 'a', 'e', 'o'], e: 'Chữ h, k, l, b có thân cao 2,5 ô li. Chữ thường a, e, o cao 1 ô li.' },
    { q: 'Nét nào dùng để viết chữ "m"?', a: 'Nét móc xuôi và nét móc hai đầu', opts: ['Nét móc xuôi và nét móc hai đầu', 'Nét cong', 'Nét khuyết', 'Nét sổ thẳng'], e: 'Chữ "m" = 3 nét: móc xuôi + móc hai đầu + móc xuôi.' },
];

export function genTapViet(): VietnameseProblem {
    const item = TAP_VIET[rand(0, TAP_VIET.length - 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'alphabet', topic: 'Tập viết', topicKey: 'tap_viet',
        question: item.q, correctAnswer: item.a,
        options: item.opts,
        illustration: '/images/core/pencil_icon.svg',
        explanation: item.e, hints: ['Nhớ các nét cơ bản: cong, sổ, móc, khuyết', `Đáp số: ${item.a}`],
    };
}

// ── NEW G3: Chính tả nâng cao — SGK TV3 ──
const CHINH_TA_G3 = [
    { q: 'Điền "l" hay "n": ___ội dung?', a: 'n', full: 'nội dung', rule: '"nội" viết với "n"' },
    { q: 'Điền "r", "d" hay "gi": ___ải thích?', a: 'gi', full: 'giải thích', rule: '"giải" viết với "gi"' },
    { q: '"Sáng sủa" hay "Xáng xủa"?', a: 'Sáng sủa', opts: ['Sáng sủa', 'Xáng xủa', 'Sáng xủa', 'Xáng sủa'], rule: '"sáng" = s, "sủa" = s' },
    { q: 'Điền "iêu" hay "iu": ch___?', a: 'iều', full: 'chiều', rule: '"chiều" có vần "iêu" không phải "iu"' },
    { q: '"Dọn dẹp" hay "Rọn rẹp"?', a: 'Dọn dẹp', opts: ['Dọn dẹp', 'Rọn rẹp', 'Dọn rẹp', 'Giọn dẹp'], rule: '"dọn dẹp" viết với "d"' },
    { q: 'Điền "ăn" hay "ăng": cây b___ ?', a: 'ăng', full: 'cây băng', rule: 'Phân biệt vần "ăn" và "ăng" qua âm cuối' },
];

export function genChinhTaG3(): VietnameseProblem {
    const item = CHINH_TA_G3[rand(0, CHINH_TA_G3.length - 1)];
    const opts = item.opts || (item.q.includes('"l" hay "n"') ? ['l', 'n'] :
        item.q.includes('"r"') ? ['r', 'd', 'gi'] :
        item.q.includes('"iêu"') ? ['iều', 'iu', 'iêu', 'ưu'] : ['ăn', 'ăng']);
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'alphabet', topic: 'Chính tả nâng cao', topicKey: 'chinh_ta_g3',
        question: item.q, correctAnswer: item.a,
        options: opts,
        illustration: '/images/core/pencil_icon.svg',
        explanation: `Quy tắc: ${item.rule}.`,
        hints: ['Nhớ phân biệt: l/n, s/x, ch/tr, d/gi/r', `Đáp số: ${item.a}`],
    };
}

// ── NEW G3: Viết đoạn văn ngắn — SGK TV3 ──
const VIET_DOAN_VAN = [
    { prompt: 'Viết 3-5 câu về con vật em yêu thích.', sample: 'Em rất thích con mèo. Mèo nhà em tên Miu. Nó có bộ lông trắng mượt. Mỗi tối, Miu nằm cuộn tròn bên em. Em yêu Miu lắm.',
      questions: [
        { q: 'Bài văn tả con vật cần có phần nào?', a: 'Mở bài, giới thiệu, tả đặc điểm, kết bài', opts: ['Mở bài, giới thiệu, tả đặc điểm, kết bài', 'Chỉ cần tả màu', 'Kể tên con vật', 'Không cần mở bài'] },
        { q: 'Câu nào là câu mở bài?', a: 'Em rất thích con mèo.', opts: ['Em rất thích con mèo.', 'Nó có bộ lông trắng.', 'Em yêu Miu lắm.', 'Miu nằm cuộn tròn.'] },
      ] },
    { prompt: 'Viết 3-5 câu về ngôi trường của em.', sample: 'Trường em rất đẹp. Trước cổng trường có hàng phượng vĩ. Sân trường rộng rãi. Các bạn vui chơi mỗi giờ ra chơi. Em rất yêu trường.',
      questions: [
        { q: 'Đoạn văn tả trường nên bắt đầu bằng gì?', a: 'Giới thiệu chung về ngôi trường', opts: ['Giới thiệu chung về ngôi trường', 'Kể tên bạn bè', 'Nói về giờ ra chơi', 'Tả cái cổng'] },
        { q: 'Câu nào thể hiện tình cảm?', a: 'Em rất yêu trường.', opts: ['Em rất yêu trường.', 'Trường em rất đẹp.', 'Sân trường rộng.', 'Có hàng phượng vĩ.'] },
      ] },
];

export function genVietDoanVan(): VietnameseProblem {
    const item = VIET_DOAN_VAN[rand(0, VIET_DOAN_VAN.length - 1)];
    const qItem = item.questions[rand(0, item.questions.length - 1)];
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'grammar', topic: 'Viết đoạn văn ngắn', topicKey: 'viet_doan_van',
        question: `✏️ Đề bài: "${item.prompt}"\n\nĐoạn văn mẫu:\n"${item.sample}"\n\n${qItem.q}`,
        correctAnswer: qItem.a,
        options: qItem.opts,
        illustration: '/images/core/pencil_icon.svg',
        explanation: `Đáp án: ${qItem.a}.`,
        hints: ['Cấu trúc: Mở bài → Thân bài → Kết bài', `Đáp số: ${qItem.a}`],
    };
}

// ── NEW G4: Biện pháp tu từ — SGK TV4 ──
const BIEN_PHAP_TU_TU = [
    { q: '"Mặt trời như quả cầu lửa" sử dụng biện pháp gì?', a: 'So sánh', opts: ['So sánh', 'Nhân hóa', 'Ẩn dụ', 'Điệp ngữ'], e: 'Dùng từ "như" để so sánh mặt trời với quả cầu lửa.' },
    { q: '"Dòng sông uốn mình qua cánh đồng" sử dụng biện pháp gì?', a: 'Nhân hóa', opts: ['Nhân hóa', 'So sánh', 'Ẩn dụ', 'Hoán dụ'], e: 'Dùng từ "uốn mình" (hành động người) cho dòng sông → nhân hóa.' },
    { q: '"Bàn tay ta làm nên tất cả" — "bàn tay" thay cho gì?', a: 'Con người / sức lao động', opts: ['Con người / sức lao động', 'Bàn tay thật', 'Đôi chân', 'Công cụ'], e: 'Hoán dụ: dùng "bàn tay" để chỉ con người và sức lao động.' },
    { q: '"Những ngôi sao thức ngoài kia" — sao có "thức" được không?', a: 'Không, đây là nhân hóa', opts: ['Không, đây là nhân hóa', 'Có, sao thức thật', 'Đây là so sánh', 'Đây là ẩn dụ'], e: 'Sao không thể "thức" → nhân hóa (gán tính người cho vật).' },
    { q: 'So sánh ngang bằng dùng từ nào?', a: 'như, giống, tựa', opts: ['như, giống, tựa', 'hơn, kém', 'không bằng', 'vượt xa'], e: 'So sánh ngang bằng: A như B, A tựa B, A giống B.' },
    { q: '"Tre xung phong vào xe tăng" dùng biện pháp gì?', a: 'Nhân hóa', opts: ['Nhân hóa', 'So sánh', 'Liệt kê', 'Điệp ngữ'], e: 'Tre không thể "xung phong" → nhân hóa (gán hành động người cho tre).' },
];

export function genBienPhapTuTu(): VietnameseProblem {
    const item = BIEN_PHAP_TU_TU[rand(0, BIEN_PHAP_TU_TU.length - 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'grammar', topic: 'Biện pháp tu từ', topicKey: 'bien_phap_tu_tu',
        question: item.q, correctAnswer: item.a,
        options: item.opts,
        illustration: '/images/core/pencil_icon.svg',
        explanation: item.e,
        hints: ['So sánh: A như B | Nhân hóa: gán tính người cho vật | Hoán dụ: dùng bộ phận chỉ toàn thể', `Đáp số: ${item.a}`],
    };
}

// ══════════════════════════════════════════════
// GRADES 2-3: Vocabulary by Theme
// ══════════════════════════════════════════════

const VOCAB_THEMES: { theme: string; words: { word: string; def: string }[] }[] = [
    {
        theme: 'Gia đình', words: [
            { word: 'ông ngoại', def: 'bố của mẹ' }, { word: 'bà nội', def: 'mẹ của bố' },
            { word: 'cậu', def: 'em trai của mẹ' }, { word: 'dì', def: 'em gái của mẹ' },
            { word: 'chú', def: 'em trai của bố' }, { word: 'cô', def: 'em gái/chị gái của bố' },
        ]
    },
    {
        theme: 'Trường học', words: [
            { word: 'hiệu trưởng', def: 'người đứng đầu trường' }, { word: 'thời khóa biểu', def: 'lịch học các môn' },
            { word: 'thí nghiệm', def: 'làm thử để kiểm tra' }, { word: 'thư viện', def: 'nơi mượn sách' },
            { word: 'sân trường', def: 'nơi chơi giờ ra chơi' }, { word: 'phòng tin học', def: 'nơi học máy tính' },
        ]
    },
    {
        theme: 'Động vật', words: [
            { word: 'hươu cao cổ', def: 'động vật cổ dài nhất' }, { word: 'cá heo', def: 'động vật biển thông minh' },
            { word: 'đại bàng', def: 'chim săn mồi lớn' }, { word: 'tê giác', def: 'động vật có sừng trên mũi' },
            { word: 'bạch tuộc', def: 'có 8 xúc tua' }, { word: 'voi', def: 'thú có vòi lớn nhất cạn' },
        ]
    },
    {
        theme: 'Nghề nghiệp', words: [
            { word: 'bác sĩ', def: 'khám và chữa bệnh' }, { word: 'kỹ sư', def: 'thiết kế và xây dựng' },
            { word: 'phi công', def: 'lái máy bay' }, { word: 'nông dân', def: 'trồng trọt và chăn nuôi' },
            { word: 'lính cứu hỏa', def: 'chữa cháy và cứu người' }, { word: 'nhà khoa học', def: 'nghiên cứu khoa học' },
        ]
    },
    {
        theme: 'Thời tiết & Mùa', words: [
            { word: 'sương mù', def: 'hơi nước đọng lại trên mặt đất' }, { word: 'lũ lụt', def: 'nước dâng cao gây ngập' },
            { word: 'hạn hán', def: 'thiếu nước lâu ngày' }, { word: 'gió mùa', def: 'gió thay đổi theo mùa' },
            { word: 'bão', def: 'gió rất mạnh kèm mưa to' }, { word: 'sấm sét', def: 'điện trong mây gây tiếng nổ và ánh sáng' },
        ]
    },
    {
        theme: 'Cơ thể người', words: [
            { word: 'não', def: 'điều khiển mọi hoạt động cơ thể' }, { word: 'phổi', def: 'cơ quan hô hấp' },
            { word: 'dạ dày', def: 'tiêu hóa thức ăn' }, { word: 'xương sống', def: 'trụ cột cơ thể' },
            { word: 'cơ bắp', def: 'giúp cơ thể cử động' }, { word: 'mạch máu', def: 'ống dẫn máu trong cơ thể' },
        ]
    },
];

export function genVocabulary(): VietnameseProblem {
    const theme = VOCAB_THEMES[rand(0, VOCAB_THEMES.length - 1)];
    const w = theme.words[rand(0, theme.words.length - 1)];
    const templates = [
        { q: `"${w.word}" nghĩa là gì?`, a: w.def, opts: shuffle([w.def, ...theme.words.filter(x => x.word !== w.word).slice(0, 3).map(x => x.def)]) },
        { q: `Từ nào có nghĩa: "${w.def}"?`, a: w.word, opts: shuffle([w.word, ...theme.words.filter(x => x.word !== w.word).slice(0, 3).map(x => x.word)]) },
    ];
    const t = templates[rand(0, 1)];
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'vocabulary', topic: `Từ vựng: ${theme.theme}`, topicKey: 'vocabulary',
        question: t.q, correctAnswer: t.a,
        options: t.opts,
        illustration: '/images/core/open_book.svg',
        explanation: `"${w.word}" = ${w.def}. Chủ đề: ${theme.theme}.`,
        hints: [`Chủ đề: ${theme.theme}`, `Đáp số: ${t.a}`],
    };
}

// ══════════════════════════════════════════════
// GRADES 2-4: Reading Comprehension
// ══════════════════════════════════════════════

const PASSAGES = [
    {
        grade: 2, title: 'Con Mèo Nhà Em',
        text: 'Nhà em có một con mèo lông trắng. Nó thích nằm sưởi nắng ở hiên. Mỗi tối, mèo đi bắt chuột. Sáng ra, mẹ khen mèo giỏi quá!',
        questions: [
            { q: 'Con mèo có màu lông gì?', a: 'Trắng', opts: ['Trắng', 'Đen', 'Vàng', 'Xám'] },
            { q: 'Mèo thích làm gì ở hiên?', a: 'Nằm sưởi nắng', opts: ['Nằm sưởi nắng', 'Chơi bóng', 'Ăn cá', 'Ngủ'] },
            { q: 'Mèo bắt chuột vào lúc nào?', a: 'Mỗi tối', opts: ['Mỗi tối', 'Buổi sáng', 'Buổi trưa', 'Buổi chiều'] },
        ]
    },
    {
        grade: 2, title: 'Bác Nông Dân',
        text: 'Bác Tư trồng lúa ngoài đồng. Mùa mưa, lúa lên xanh tốt. Mùa gặt, bác cắt lúa mang về phơi. Hạt gạo trắng ngần nhờ công sức bác.',
        questions: [
            { q: 'Bác Tư trồng gì?', a: 'Lúa', opts: ['Lúa', 'Ngô', 'Khoai', 'Rau'] },
            { q: 'Lúa lên xanh tốt vào mùa nào?', a: 'Mùa mưa', opts: ['Mùa mưa', 'Mùa nắng', 'Mùa đông', 'Mùa xuân'] },
            { q: 'Sau khi cắt lúa, bác Tư làm gì?', a: 'Phơi lúa', opts: ['Phơi lúa', 'Bán lúa', 'Nấu cơm', 'Gieo hạt'] },
        ]
    },
    {
        grade: 3, title: 'Mùa Xuân Đến',
        text: 'Mùa xuân, hoa mai nở vàng rực. Chim chóc hót líu lo trên cành. Trẻ em mặc áo mới, tay cầm bao lì xì đỏ. Khắp nơi rộn ràng không khí Tết.',
        questions: [
            { q: 'Hoa mai có màu gì?', a: 'Vàng', opts: ['Vàng', 'Đỏ', 'Trắng', 'Hồng'] },
            { q: 'Bao lì xì có màu gì?', a: 'Đỏ', opts: ['Đỏ', 'Xanh', 'Vàng', 'Tím'] },
            { q: 'Đoạn văn nói về mùa nào?', a: 'Mùa xuân', opts: ['Mùa xuân', 'Mùa hạ', 'Mùa thu', 'Mùa đông'] },
        ]
    },
    {
        grade: 3, title: 'Cây Bàng Sân Trường',
        text: 'Giữa sân trường có một cây bàng cổ thụ. Mùa hạ, lá xanh um tỏa bóng mát. Mùa thu, lá chuyển đỏ rực. Mùa đông, cây trụi lá, cành khẳng khiu. Xuân về, chồi non lại nhú lên xanh biếc.',
        questions: [
            { q: 'Mùa thu, lá bàng chuyển sang màu gì?', a: 'Đỏ', opts: ['Đỏ', 'Vàng', 'Nâu', 'Xanh'] },
            { q: 'Mùa đông, cây bàng như thế nào?', a: 'Trụi lá, cành khẳng khiu', opts: ['Trụi lá, cành khẳng khiu', 'Lá xanh um', 'Hoa nở', 'Quả chín'] },
            { q: 'Cây bàng ở đâu?', a: 'Giữa sân trường', opts: ['Giữa sân trường', 'Trước cổng', 'Sau trường', 'Bên hồ'] },
        ]
    },
    {
        grade: 4, title: 'Hạt Gạo Làng Ta',
        text: 'Hạt gạo làng ta, có bão tháng bảy, có mưa tháng ba. Giọt mồ hôi sa trên sông, trên bãi. Hạt gạo làng ta, có vị phù sa, của sông Kinh Thầy.',
        questions: [
            { q: 'Thể loại văn bản này là gì?', a: 'Thơ', opts: ['Thơ', 'Truyện', 'Thư', 'Kịch'] },
            { q: 'Hạt gạo được gắn với điều gì?', a: 'Mồ hôi và thiên nhiên', opts: ['Mồ hôi và thiên nhiên', 'Máy móc', 'Nhà máy', 'Siêu thị'] },
            { q: 'Sông nào được nhắc đến?', a: 'Sông Kinh Thầy', opts: ['Sông Kinh Thầy', 'Sông Hồng', 'Sông Cửu Long', 'Sông Hương'] },
        ]
    },
    {
        grade: 4, title: 'Truyện Cổ Tích: Sự Tích Hồ Gươm',
        text: 'Xưa, Lê Lợi được Long Quân cho mượn gươm thần đánh giặc Minh. Sau khi thắng, ngài ra Hồ Lục Thủy. Rùa Vàng nổi lên đòi gươm. Từ đó hồ mang tên Hồ Hoàn Kiếm (trả gươm).',
        questions: [
            { q: 'Ai cho Lê Lợi mượn gươm?', a: 'Long Quân', opts: ['Long Quân', 'Rùa Vàng', 'Phật Hoàng', 'Ngọc Hoàng'] },
            { q: '"Hoàn Kiếm" có nghĩa là gì?', a: 'Trả gươm', opts: ['Trả gươm', 'Bắt gươm', 'Rèn gươm', 'Giấu gươm'] },
            { q: 'Hồ có tên cũ là gì?', a: 'Hồ Lục Thủy', opts: ['Hồ Lục Thủy', 'Hồ Tây', 'Hồ Xuân Hương', 'Hồ Ba Bể'] },
        ]
    },
];

export function genReadingComprehension(): VietnameseProblem {
    const p = PASSAGES[rand(0, PASSAGES.length - 1)];
    const qItem = p.questions[rand(0, p.questions.length - 1)];
    return {
        id: genId(), gradeLevel: VIETNAMESE_TOPIC_GRADE.reading, difficulty: p.grade,
        type: 'reading', topic: 'Đọc hiểu', topicKey: 'reading',
        passage: `📖 ${p.title}\n\n${p.text}`,
        question: qItem.q, correctAnswer: qItem.a,
        options: qItem.opts,
        illustration: '/images/core/books_hd.svg',
        explanation: `Đáp án: "${qItem.a}" — dựa trên nội dung đoạn văn "${p.title}".`,
        hints: ['Đọc lại đoạn văn thật kỹ', `Đáp số: ${qItem.a}`],
    };
}

// ══════════════════════════════════════════════
// GRADES 3-5: Grammar
// ══════════════════════════════════════════════

export function genGrammar(): VietnameseProblem {
    const templates = [
        // Nouns, Verbs, Adjectives
        () => {
            const items = [
                { word: 'chạy', pos: 'Động từ', e: 'chỉ hoạt động' },
                { word: 'bàn', pos: 'Danh từ', e: 'chỉ sự vật' },
                { word: 'đẹp', pos: 'Tính từ', e: 'chỉ đặc điểm' },
                { word: 'nhanh', pos: 'Tính từ', e: 'chỉ tính chất' },
                { word: 'học sinh', pos: 'Danh từ', e: 'chỉ người' },
                { word: 'viết', pos: 'Động từ', e: 'chỉ hành động' },
                { word: 'xanh', pos: 'Tính từ', e: 'chỉ màu sắc' },
                { word: 'ăn', pos: 'Động từ', e: 'chỉ hoạt động' },
            ];
            const item = items[rand(0, items.length - 1)];
            return { q: `"${item.word}" thuộc từ loại nào?`, a: item.pos, opts: ['Danh từ', 'Động từ', 'Tính từ'], e: `"${item.word}" là ${item.pos} (${item.e}).`, grade: 3 };
        },
        // Sentence types
        () => {
            const sentences = [
                { s: 'Hôm nay trời đẹp quá!', type: 'Câu cảm thán', mark: '!' },
                { s: 'Em đi học mỗi ngày.', type: 'Câu kể', mark: '.' },
                { s: 'Bạn có khỏe không?', type: 'Câu hỏi', mark: '?' },
                { s: 'Hãy giữ gìn vệ sinh!', type: 'Câu cầu khiến', mark: '!' },
            ];
            const sent = sentences[rand(0, sentences.length - 1)];
            return { q: `"${sent.s}" là loại câu gì?`, a: sent.type, opts: ['Câu kể', 'Câu hỏi', 'Câu cảm thán', 'Câu cầu khiến'], e: `Câu kết thúc bằng "${sent.mark}" → ${sent.type}.`, grade: 4 };
        },
        // Synonyms/Antonyms
        () => {
            const pairs = [
                { w: 'vui', syn: 'hạnh phúc', ant: 'buồn' }, { w: 'nhanh', syn: 'mau', ant: 'chậm' },
                { w: 'lớn', syn: 'to', ant: 'nhỏ' }, { w: 'giỏi', syn: 'tài', ant: 'dở' },
                { w: 'sáng', syn: 'rạng', ant: 'tối' }, { w: 'nóng', syn: 'ấm', ant: 'lạnh' },
            ];
            const p = pairs[rand(0, pairs.length - 1)];
            const isSyn = Math.random() > 0.5;
            return {
                q: isSyn ? `Từ đồng nghĩa với "${p.w}"?` : `Từ trái nghĩa với "${p.w}"?`,
                a: isSyn ? p.syn : p.ant,
                opts: shuffle([p.syn, p.ant, pairs[(rand(0, pairs.length - 1))].w]),
                e: `"${p.w}" đồng nghĩa "${p.syn}", trái nghĩa "${p.ant}".`,
                grade: 4,
            };
        },
        // Punctuation
        () => {
            const items = [
                { s: 'Em ơi___ hãy đến đây', a: ',', e: 'Dấu phẩy ngăn giữa phần gọi đáp và câu.' },
                { s: 'Bạn tên gì___', a: '?', e: 'Câu hỏi kết thúc bằng dấu chấm hỏi.' },
                { s: 'Tuyệt vời quá___', a: '!', e: 'Câu cảm thán kết thúc bằng dấu chấm than.' },
                { s: 'Mẹ dặn em___ "Con hãy học bài"', a: ':', e: 'Dấu hai chấm trước lời nói trực tiếp.' },
            ];
            const item = items[rand(0, items.length - 1)];
            return { q: `Điền dấu câu: "${item.s}"`, a: item.a, opts: [',', '.', '?', '!', ':'], e: item.e, grade: 3 };
        },
    ];
    const t = templates[rand(0, templates.length - 1)]();
    return {
        id: genId(), gradeLevel: VIETNAMESE_TOPIC_GRADE.grammar, difficulty: t.grade,
        type: 'grammar', topic: 'Ngữ pháp', topicKey: 'grammar',
        question: t.q, correctAnswer: t.a,
        options: t.opts,
        illustration: '/images/core/pencil_icon.svg',
        explanation: t.e, hints: ['Nhớ quy tắc từ loại và dấu câu', `Đáp số: ${t.a}`],
    };
}

// ══════════════════════════════════════════════
// GRADE 4: Writing — Tập làm văn
// ══════════════════════════════════════════════

const WRITING_G4_QS = [
    { q: 'Khi viết bài văn tả người, em nên bắt đầu phần mở bài bằng gì?', a: 'Giới thiệu người em định tả (ai, quan hệ)', opts: ['Giới thiệu người em định tả (ai, quan hệ)', 'Viết thẳng ngoại hình', 'Nêu cảm nghĩ cuối bài', 'Kể một câu chuyện dài'], e: 'Mở bài giới thiệu nhân vật: đó là ai, quan hệ thế nào với em.' },
    { q: 'Trong bài văn tả cảnh, thân bài nên sắp xếp theo trình tự nào?', a: 'Theo không gian (xa → gần) hoặc thời gian (sáng → chiều)', opts: ['Theo không gian (xa → gần) hoặc thời gian (sáng → chiều)', 'Theo bảng chữ cái', 'Theo cảm hứng ngẫu nhiên', 'Theo số lượng câu'], e: 'Tả cảnh cần có trình tự rõ ràng để người đọc hình dung được bức tranh.' },
    { q: 'Câu nào sau đây có hình ảnh so sánh?', a: 'Mặt trăng tròn như chiếc đĩa bạc', opts: ['Mặt trăng tròn như chiếc đĩa bạc', 'Trời hôm nay nắng đẹp', 'Em đi học mỗi ngày', 'Bố em là bác sĩ'], e: 'So sánh dùng từ "như", "tựa", "giống" để liên tưởng hai sự vật.' },
    { q: 'Câu nào dùng biện pháp nhân hóa?', a: 'Ông mặt trời thức dậy', opts: ['Ông mặt trời thức dậy', 'Mặt trời mọc lúc 6 giờ', 'Ánh nắng chiếu qua cửa sổ', 'Trời nắng rất to'], e: 'Nhân hóa là gán hành động, tính chất của người cho vật (mặt trời "thức dậy").' },
    { q: 'Kết bài của bài văn tả đồ vật thường viết gì?', a: 'Tình cảm của em với đồ vật đó', opts: ['Tình cảm của em với đồ vật đó', 'Giá tiền đồ vật', 'Nơi sản xuất', 'Tả lại từ đầu'], e: 'Kết bài nêu cảm nghĩ, tình cảm gắn bó của em với đồ vật được tả.' },
];

export function genWritingG4(): VietnameseProblem {
    const item = WRITING_G4_QS[rand(0, WRITING_G4_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'writing', topic: 'Tập làm văn', topicKey: 'writing_g4',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nhớ cấu trúc: Mở bài → Thân bài → Kết bài', `Đáp án: ${item.a}`],
    };
}

// ══════════════════════════════════════════════
// GRADE 5: Writing — Nghị luận đơn giản
// ══════════════════════════════════════════════

const WRITING_G5_QS = [
    { q: 'Khi viết bài văn nghị luận, em cần nêu rõ điều gì ở phần mở bài?', a: 'Ý kiến (quan điểm) của em về vấn đề', opts: ['Ý kiến (quan điểm) của em về vấn đề', 'Kể một câu chuyện dài', 'Tả cảnh thiên nhiên', 'Liệt kê sự kiện'], e: 'Nghị luận bắt đầu bằng việc nêu rõ quan điểm, ý kiến của người viết.' },
    { q: 'Để bài văn nghị luận có sức thuyết phục, thân bài cần có gì?', a: 'Lý lẽ và dẫn chứng cụ thể', opts: ['Lý lẽ và dẫn chứng cụ thể', 'Nhiều hình ảnh đẹp', 'Thật nhiều câu dài', 'Lặp lại ý kiến nhiều lần'], e: 'Lý lẽ là giải thích vì sao; dẫn chứng là ví dụ cụ thể để chứng minh.' },
    { q: 'Câu tục ngữ "Có công mài sắt, có ngày nên kim" khuyên ta điều gì?', a: 'Kiên trì, nhẫn nại sẽ thành công', opts: ['Kiên trì, nhẫn nại sẽ thành công', 'Cần nhiều tiền', 'Phải mài dao thật sắc', 'Đừng bao giờ cố gắng'], e: 'Tục ngữ dùng hình ảnh mài sắt thành kim để khuyên người ta kiên nhẫn.' },
    { q: 'Trong câu "Đọc sách giúp mở rộng kiến thức", đâu là ý kiến?', a: 'Đọc sách giúp mở rộng kiến thức', opts: ['Đọc sách giúp mở rộng kiến thức', 'Sách là tập giấy', 'Kiến thức là danh từ', 'Đọc là động từ'], e: 'Ý kiến là nhận định có thể đồng ý hoặc phản bác, khác với sự thật hiển nhiên.' },
    { q: 'Khi kết bài nghị luận, em nên:', a: 'Khẳng định lại ý kiến và mở rộng suy nghĩ', opts: ['Khẳng định lại ý kiến và mở rộng suy nghĩ', 'Kể thêm câu chuyện mới', 'Tả cảnh đẹp', 'Dừng đột ngột'], e: 'Kết bài nhắc lại quan điểm chính và gợi mở hướng suy nghĩ tiếp.' },
];

export function genWritingG5(): VietnameseProblem {
    const item = WRITING_G5_QS[rand(0, WRITING_G5_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'writing', topic: 'Nghị luận đơn giản', topicKey: 'writing_g5',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nghị luận = ý kiến + lý lẽ + dẫn chứng', `Đáp án: ${item.a}`],
    };
}

// ══════════════════════════════════════════════
// TOPIC REGISTRY
// ══════════════════════════════════════════════

export interface VnTopicInfo {
    key: string;
    name: string;
    gradeLevel: number;
    generator: () => VietnameseProblem;
    icon: string;
}

export const VIETNAMESE_TOPICS: VnTopicInfo[] = [
    { key: 'alphabet', name: 'Bảng chữ cái', gradeLevel: 1, generator: genAlphabet, icon: '🔤' },
    { key: 'tones', name: 'Dấu thanh', gradeLevel: 1, generator: genTones, icon: '🎵' },
    { key: 'van', name: 'Vần', gradeLevel: 1, generator: genVan, icon: '🔠' },
    { key: 'phu_am_ghep', name: 'Phụ âm ghép', gradeLevel: 1, generator: genPhuAmGhep, icon: '🔡' },
    { key: 'van_extended', name: 'Vần mở rộng', gradeLevel: 1, generator: genVanExtended, icon: '📋' },
    { key: 'ghep_tu', name: 'Ghép từ', gradeLevel: 1, generator: genGhepTu, icon: '🧩' },
    { key: 'tap_viet', name: 'Tập viết', gradeLevel: 1, generator: genTapViet, icon: '✒️' },
    { key: 'nghe_ke_chuyen', name: 'Nghe kể chuyện', gradeLevel: 1, generator: genNgheKeChuyen, icon: '📖' },
    { key: 'tap_doc_tho', name: 'Tập đọc thơ', gradeLevel: 1, generator: genTapDocTho, icon: '🎶' },
    { key: 'chinh_ta', name: 'Chính tả', gradeLevel: 2, generator: genChinhTa, icon: '✏️' },
    { key: 'tap_doc', name: 'Tập đọc', gradeLevel: 2, generator: genTapDoc, icon: '📗' },
    { key: 'ke_chuyen', name: 'Kể chuyện theo tranh', gradeLevel: 2, generator: genKeChuyenTheoTranh, icon: '🖼️' },
    { key: 'vocabulary', name: 'Từ vựng chủ đề', gradeLevel: 2, generator: genVocabulary, icon: '📚' },
    { key: 'reading', name: 'Đọc hiểu', gradeLevel: 2, generator: genReadingComprehension, icon: '📖' },
    { key: 'luyen_tu_cau', name: 'Luyện từ & câu', gradeLevel: 3, generator: genLuyenTuCau, icon: '✏️' },
    { key: 'chinh_ta_g3', name: 'Chính tả nâng cao', gradeLevel: 3, generator: genChinhTaG3, icon: '📝' },
    { key: 'viet_doan_van', name: 'Viết đoạn văn', gradeLevel: 3, generator: genVietDoanVan, icon: '📄' },
    { key: 'doc_hieu_g3', name: 'Đọc hiểu G3', gradeLevel: 3, generator: genDocHieuG3, icon: '📘' },
    { key: 'grammar', name: 'Ngữ pháp', gradeLevel: 3, generator: genGrammar, icon: '✍️' },
    { key: 'bien_phap_tu_tu', name: 'Biện pháp tu từ', gradeLevel: 4, generator: genBienPhapTuTu, icon: '🎭' },
    { key: 'tu_han_viet', name: 'Từ Hán Việt', gradeLevel: 4, generator: genTuHanViet, icon: '📜' },
    { key: 'writing_g4', name: 'Tập làm văn', gradeLevel: 4, generator: genWritingG4, icon: '📝' },
    { key: 'van_ta_canh', name: 'Văn tả cảnh', gradeLevel: 5, generator: genVanTaCanh, icon: '🏞️' },
    { key: 'writing_g5', name: 'Nghị luận đơn giản', gradeLevel: 5, generator: genWritingG5, icon: '💡' },
];

export function generateVietnameseSet(grade: number, topicKey?: string, count: number = 10): VietnameseProblem[] {
    const topics = VIETNAMESE_TOPICS.filter(t => t.gradeLevel <= grade && (!topicKey || t.key === topicKey));
    if (topics.length === 0) return [];
    return Array.from({ length: count }, () => {
        const t = topics[rand(0, topics.length - 1)];
        return t.generator();
    });
}
