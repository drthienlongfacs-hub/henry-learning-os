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
        id: genId(), gradeLevel: p.grade, difficulty: p.grade,
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
        id: genId(), gradeLevel: t.grade, difficulty: t.grade,
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
    { key: 'vocabulary', name: 'Từ vựng chủ đề', gradeLevel: 2, generator: genVocabulary, icon: '📚' },
    { key: 'reading', name: 'Đọc hiểu', gradeLevel: 2, generator: genReadingComprehension, icon: '📖' },
    { key: 'grammar', name: 'Ngữ pháp', gradeLevel: 3, generator: genGrammar, icon: '✍️' },
    { key: 'writing_g4', name: 'Tập làm văn', gradeLevel: 4, generator: genWritingG4, icon: '📝' },
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
