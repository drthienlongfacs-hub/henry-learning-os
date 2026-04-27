// ========================================
// VIETNAMESE Grade 1 — Exercise Bank
// Curriculum: BGDĐT Grade 1 Vietnamese
// ========================================

import type { Exercise, Lesson } from '@/types';

// ═══════════════════════════════════════════
// PHONICS — Chữ cái & Âm vần
// ═══════════════════════════════════════════

const vowelCombos = [
    { letters: 'b+a', word: 'ba', meaning: 'ba (bố)', diff: 1 },
    { letters: 'm+ẹ', word: 'mẹ', meaning: 'mẹ', diff: 1 },
    { letters: 'c+a', word: 'ca', meaning: 'ca (hát)', diff: 1 },
    { letters: 'l+a', word: 'la', meaning: 'la (hét)', diff: 1 },
    { letters: 'đ+ê', word: 'đê', meaning: 'đê biển', diff: 1 },
    { letters: 'b+ê', word: 'bê', meaning: 'con bê', diff: 1 },
    { letters: 'b+ò', word: 'bò', meaning: 'con bò', diff: 1 },
    { letters: 'c+ò', word: 'cò', meaning: 'con cò', diff: 1 },
    { letters: 'c+ô', word: 'cô', meaning: 'cô giáo', diff: 1 },
    { letters: 'h+a', word: 'ha', meaning: 'ha ha', diff: 1 },
    { letters: 'l+ê', word: 'lê', meaning: 'quả lê', diff: 1 },
    { letters: 'v+o', word: 'vo', meaning: 'vo gạo', diff: 1 },
    { letters: 'bà', word: 'bà', meaning: 'bà nội', diff: 1 },
    { letters: 'm+e', word: 'me', meaning: 'trái me', diff: 1 },
    { letters: 'th+ỏ', word: 'thỏ', meaning: 'con thỏ', diff: 2 },
    { letters: 'nh+à', word: 'nhà', meaning: 'nhà', diff: 2 },
    { letters: 'kh+i', word: 'khi', meaning: 'con khỉ', diff: 2 },
    { letters: 'tr+ăng', word: 'trăng', meaning: 'mặt trăng', diff: 2 },
    { letters: 'ng+à', word: 'ngà', meaning: 'ngà voi', diff: 2 },
    { letters: 'gh+ế', word: 'ghế', meaning: 'cái ghế', diff: 2 },
    { letters: 'gi+ó', word: 'gió', meaning: 'gió', diff: 2 },
    { letters: 'ch+ó', word: 'chó', meaning: 'con chó', diff: 2 },
    { letters: 'qu+ả', word: 'quả', meaning: 'trái cây', diff: 2 },
    { letters: 'ph+o', word: 'pho', meaning: 'phở', diff: 2 },
];

export const phonicsExercises: Exercise[] = vowelCombos.map((vc, i) => ({
    id: `ex-vn-phon-${String(i + 1).padStart(3, '0')}`,
    question: `Ghép vần: ${vc.letters} = ?`,
    type: 'free_text',
    correctAnswer: vc.word,
    explanation: `Ghép thành "${vc.word}" — ${vc.meaning}.`,
    difficulty: vc.diff,
    hints: [`Đọc chậm: ${vc.letters.replace('+', ' + ')}`, `Ghép lại thành "${vc.word}".`],
}));

// ═══════════════════════════════════════════
// TONE MARKS — Dấu thanh (8 exercises)
// ═══════════════════════════════════════════

export const toneExercises: Exercise[] = [
    { id: 'ex-vn-tone-001', question: '"ma" thêm dấu huyền (`) thành?', type: 'free_text', correctAnswer: 'mà', explanation: 'ma + huyền = mà.', difficulty: 1, hints: ['Dấu huyền nghiêng trái.'] },
    { id: 'ex-vn-tone-002', question: '"ma" thêm dấu sắc (´) thành?', type: 'free_text', correctAnswer: 'má', explanation: 'ma + sắc = má.', difficulty: 1, hints: ['Dấu sắc nghiêng phải.'] },
    { id: 'ex-vn-tone-003', question: '"ma" thêm dấu hỏi (?) thành?', type: 'free_text', correctAnswer: 'mả', explanation: 'ma + hỏi = mả.', difficulty: 1, hints: ['Dấu hỏi nhỏ.'] },
    { id: 'ex-vn-tone-004', question: '"ma" thêm dấu ngã (~) thành?', type: 'free_text', correctAnswer: 'mã', explanation: 'ma + ngã = mã.', difficulty: 1, hints: ['Dấu ngã sóng.'] },
    { id: 'ex-vn-tone-005', question: '"ma" thêm dấu nặng (.) thành?', type: 'free_text', correctAnswer: 'mạ', explanation: 'ma + nặng = mạ.', difficulty: 1, hints: ['Dấu nặng chấm dưới.'] },
    { id: 'ex-vn-tone-006', question: '"Bà" có dấu gì?', type: 'multiple_choice', options: ['Dấu huyền', 'Dấu sắc', 'Dấu hỏi', 'Không dấu'], correctAnswer: 'Dấu huyền', explanation: 'Bà có dấu huyền.', difficulty: 1, hints: ['Nhìn dấu trên "à".'] },
    { id: 'ex-vn-tone-007', question: '"Bé" có dấu gì?', type: 'multiple_choice', options: ['Dấu sắc', 'Dấu huyền', 'Dấu hỏi', 'Dấu ngã'], correctAnswer: 'Dấu sắc', explanation: 'Bé có dấu sắc.', difficulty: 1, hints: ['Nét nghiêng lên.'] },
    { id: 'ex-vn-tone-008', question: 'Tiếng Việt có bao nhiêu thanh?', type: 'free_text', correctAnswer: '6', explanation: '6 thanh: ngang, huyền, sắc, hỏi, ngã, nặng.', difficulty: 2, hints: ['Đếm: ngang, huyền, sắc...'] },
];

// ═══════════════════════════════════════════
// READING COMPREHENSION (12 exercises)
// ═══════════════════════════════════════════

export const readingExercises: Exercise[] = [
    { id: 'ex-vn-read-001', question: '"Bé Lan đi học." Ai đi học?', type: 'multiple_choice', options: ['Bé Lan', 'Bé Nam', 'Mẹ', 'Ba'], correctAnswer: 'Bé Lan', explanation: 'Chủ ngữ: Bé Lan.', difficulty: 1, hints: ['Từ đầu câu.'] },
    { id: 'ex-vn-read-002', question: '"Con mèo ngồi trên ghế." Con gì?', type: 'free_text', correctAnswer: 'con mèo', explanation: 'Con mèo ngồi trên ghế.', difficulty: 1, hints: ['Từ đầu câu.'] },
    { id: 'ex-vn-read-003', question: '"Mẹ mua cho bé một quyển vở." Mẹ mua gì?', type: 'multiple_choice', options: ['Quyển vở', 'Cái bút', 'Cặp sách', 'Cục tẩy'], correctAnswer: 'Quyển vở', explanation: 'Mẹ mua quyển vở.', difficulty: 1, hints: ['Cuối câu.'] },
    { id: 'ex-vn-read-004', question: '"Mưa rơi. Đường trơn. Bé đi cẩn thận." Tại sao bé cẩn thận?', type: 'multiple_choice', options: ['Đường trơn', 'Trời nắng', 'Bé buồn ngủ', 'Bé đau chân'], correctAnswer: 'Đường trơn', explanation: 'Mưa > đường trơn > cẩn thận.', difficulty: 2, hints: ['Đọc câu trước.'] },
    { id: 'ex-vn-read-005', question: '"Bé An vẽ một bông hoa đỏ." Bé vẽ gì?', type: 'free_text', correctAnswer: 'bông hoa đỏ', explanation: 'Bông hoa đỏ.', difficulty: 1, hints: ['Cuối câu.'] },
    { id: 'ex-vn-read-006', question: '"Gà mẹ có 5 gà con đi kiếm mồi." Mấy gà con?', type: 'free_text', correctAnswer: '5', explanation: '5 con gà con.', difficulty: 1, hints: ['Tìm số.'] },
    { id: 'ex-vn-read-007', question: '"Nam và Hoa chơi đá bóng ngoài sân." Ai chơi?', type: 'multiple_choice', options: ['Nam và Hoa', 'Nam và mẹ', 'Hoa và ba'], correctAnswer: 'Nam và Hoa', explanation: 'Nam và Hoa chơi.', difficulty: 1, hints: ['Đọc câu.'] },
    { id: 'ex-vn-read-008', question: '"Bé Tuấn nuôi chó tên Bông, lông trắng mượt." Chó tên gì?', type: 'free_text', correctAnswer: 'Bông', explanation: 'Chú chó tên Bông.', difficulty: 1, hints: ['Tìm tên.'] },
    { id: 'ex-vn-read-009', question: '"Phở có nước dùng, bánh phở và thịt bò." Phở có gì?', type: 'multiple_choice', options: ['Nước dùng, bánh phở, thịt bò', 'Cơm, canh, thịt', 'Mì, trứng, rau'], correctAnswer: 'Nước dùng, bánh phở, thịt bò', explanation: 'Phở: nước dùng + bánh phở + thịt bò.', difficulty: 2, hints: ['Câu liệt kê.'] },
    { id: 'ex-vn-read-010', question: '"Con kiến chăm chỉ kiếm mồi mùa hè, mùa đông có ăn." Bài học?', type: 'explain', correctAnswer: 'Phải chăm chỉ chuẩn bị trước.', explanation: 'Kiến chăm chỉ nên mùa đông có ăn.', difficulty: 3, hints: ['Kiến làm gì mùa hè?'] },
    { id: 'ex-vn-read-011', question: '"Sáng nay, Mai dậy sớm, đánh răng rửa mặt rồi ăn sáng." Mai làm gì trước đi học?', type: 'multiple_choice', options: ['Đánh răng, rửa mặt, ăn sáng', 'Chơi game', 'Xem TV'], correctAnswer: 'Đánh răng, rửa mặt, ăn sáng', explanation: 'Đánh răng > rửa mặt > ăn sáng.', difficulty: 2, hints: ['Đọc câu thứ hai.'] },
    { id: 'ex-vn-read-012', question: '"Cây xoài nhà Lan rất to, mùa hè ra quả." Cây gì?', type: 'free_text', correctAnswer: 'cây xoài', explanation: 'Cây xoài.', difficulty: 1, hints: ['Tên cây.'] },
];

// ═══════════════════════════════════════════
// WRITING — Chính tả & Viết câu (15 ex)
// ═══════════════════════════════════════════

export const writingExercises: Exercise[] = [
    { id: 'ex-vn-write-001', question: 'Điền vần: b___ (ba)', type: 'free_text', correctAnswer: 'a', explanation: 'b + a = ba.', difficulty: 1, hints: ['ba mẹ.'] },
    { id: 'ex-vn-write-002', question: 'Điền vần: m___ (mẹ)', type: 'free_text', correctAnswer: 'ẹ', explanation: 'm + ẹ = mẹ.', difficulty: 1, hints: ['m + ? = mẹ'] },
    { id: 'ex-vn-write-003', question: 'Điền: c___n (con)', type: 'free_text', correctAnswer: 'o', explanation: 'c+o+n = con.', difficulty: 1, hints: ['con mèo.'] },
    { id: 'ex-vn-write-004', question: 'Điền: ___ọc (học)', type: 'free_text', correctAnswer: 'h', explanation: 'h+ọc = học.', difficulty: 1, hints: ['Đi ___ọc.'] },
    { id: 'ex-vn-write-005', question: '"Con meò" hay "Con mèo"?', type: 'multiple_choice', options: ['Con mèo', 'Con meò'], correctAnswer: 'Con mèo', explanation: 'Viết đúng: con mèo.', difficulty: 1, hints: ['Dấu ở đâu?'] },
    { id: 'ex-vn-write-006', question: 'Viết đúng?', type: 'multiple_choice', options: ['Trường học', 'Chường học', 'Trương học'], correctAnswer: 'Trường học', explanation: 'Trường học - viết tr.', difficulty: 2, hints: ['Tr hay Ch?'] },
    { id: 'ex-vn-write-007', question: 'Sắp xếp: "đi / Bé / học"', type: 'free_text', correctAnswer: 'Bé đi học', explanation: 'Bé đi học.', difficulty: 2, hints: ['Ai + làm gì?'] },
    { id: 'ex-vn-write-008', question: '"L" hay "N": ___ước?', type: 'multiple_choice', options: ['N', 'L'], correctAnswer: 'N', explanation: 'Nước.', difficulty: 1, hints: ['N + ước.'] },
    { id: 'ex-vn-write-009', question: '"S" hay "X": ___e đạp?', type: 'multiple_choice', options: ['X', 'S'], correctAnswer: 'X', explanation: 'Xe đạp.', difficulty: 1, hints: ['X + e.'] },
    { id: 'ex-vn-write-010', question: '"gi" hay "d": ___ày dép?', type: 'multiple_choice', options: ['Gi', 'D'], correctAnswer: 'Gi', explanation: 'Giày dép.', difficulty: 2, hints: ['Gi + ày.'] },
    { id: 'ex-vn-write-011', question: 'Đặt câu có từ "mèo"', type: 'explain', correctAnswer: 'Con mèo nằm trên ghế.', explanation: 'VD: Con mèo nằm trên ghế.', difficulty: 2, hints: ['Con mèo + hành động.'] },
    { id: 'ex-vn-write-012', question: 'Đặt câu có từ "đẹp"', type: 'explain', correctAnswer: 'Bông hoa đẹp quá.', explanation: 'VD: Bông hoa đẹp quá.', difficulty: 2, hints: ['Cái gì + đẹp?'] },
    { id: 'ex-vn-write-013', question: 'Đặt câu có từ "ăn"', type: 'explain', correctAnswer: 'Em ăn cơm với mẹ.', explanation: 'VD: Em ăn cơm.', difficulty: 2, hints: ['Ai + ăn + gì?'] },
    { id: 'ex-vn-write-014', question: 'Điền: ___ng (ông)', type: 'free_text', correctAnswer: 'ô', explanation: 'ô + ng = ông.', difficulty: 1, hints: ['ông bà.'] },
    { id: 'ex-vn-write-015', question: 'Sắp xếp: "thích / vẽ / Bé / tranh"', type: 'free_text', correctAnswer: 'Bé thích vẽ tranh', explanation: 'Bé thích vẽ tranh.', difficulty: 2, hints: ['Ai + thích + gì?'] },
];

// ═══════════════════════════════════════════
// VOCABULARY — Mở rộng vốn từ (12 ex)
// ═══════════════════════════════════════════

export const vocabViExercises: Exercise[] = [
    { id: 'ex-vn-vocab-001', question: 'Trái nghĩa "to"?', type: 'multiple_choice', options: ['Nhỏ', 'Dài', 'Cao', 'Nặng'], correctAnswer: 'Nhỏ', explanation: 'To ↔ Nhỏ.', difficulty: 1, hints: ['Ngược to.'] },
    { id: 'ex-vn-vocab-002', question: 'Trái nghĩa "nóng"?', type: 'free_text', correctAnswer: 'lạnh', explanation: 'Nóng ↔ Lạnh.', difficulty: 1, hints: ['Mùa đông...'] },
    { id: 'ex-vn-vocab-003', question: 'Trái nghĩa "cao"?', type: 'free_text', correctAnswer: 'thấp', explanation: 'Cao ↔ Thấp.', difficulty: 1, hints: ['Ngược cao.'] },
    { id: 'ex-vn-vocab-004', question: 'Trái nghĩa "sáng"?', type: 'free_text', correctAnswer: 'tối', explanation: 'Sáng ↔ Tối.', difficulty: 1, hints: ['Ban đêm...'] },
    { id: 'ex-vn-vocab-005', question: 'Trái nghĩa "vui"?', type: 'free_text', correctAnswer: 'buồn', explanation: 'Vui ↔ Buồn.', difficulty: 1, hints: ['Không vui...'] },
    { id: 'ex-vn-vocab-006', question: 'Con gì sống dưới nước?', type: 'multiple_choice', options: ['Cá', 'Gà', 'Chim', 'Mèo'], correctAnswer: 'Cá', explanation: 'Cá sống dưới nước.', difficulty: 1, hints: ['Con gì bơi?'] },
    { id: 'ex-vn-vocab-007', question: 'Con gì biết bay?', type: 'multiple_choice', options: ['Chim', 'Cá', 'Mèo', 'Bò'], correctAnswer: 'Chim', explanation: 'Chim biết bay.', difficulty: 1, hints: ['Có cánh.'] },
    { id: 'ex-vn-vocab-008', question: 'Quả nào màu vàng?', type: 'multiple_choice', options: ['Chuối', 'Táo đỏ', 'Nho tím', 'Dưa xanh'], correctAnswer: 'Chuối', explanation: 'Chuối chín = vàng.', difficulty: 1, hints: ['Thon dài, vàng.'] },
    { id: 'ex-vn-vocab-009', question: '"Chăm chỉ" nghĩa là?', type: 'multiple_choice', options: ['Siêng năng', 'Lười biếng', 'Nghịch ngợm', 'Buồn ngủ'], correctAnswer: 'Siêng năng', explanation: 'Chăm chỉ = siêng năng.', difficulty: 2, hints: ['Hay làm bài.'] },
    { id: 'ex-vn-vocab-010', question: 'Kể 3 đồ dùng học tập', type: 'explain', correctAnswer: 'Bút, vở, thước', explanation: 'VD: bút, vở, thước.', difficulty: 2, hints: ['Ở trường dùng gì?'] },
    { id: 'ex-vn-vocab-011', question: 'Từ cùng nghĩa "vui"?', type: 'multiple_choice', options: ['Hạnh phúc', 'Buồn', 'Giận', 'Sợ'], correctAnswer: 'Hạnh phúc', explanation: 'Vui ≈ hạnh phúc.', difficulty: 2, hints: ['Rất vui = ?'] },
    { id: 'ex-vn-vocab-012', question: 'Kể 3 con vật nuôi', type: 'explain', correctAnswer: 'Chó, mèo, gà', explanation: 'VD: chó, mèo, gà.', difficulty: 2, hints: ['Con vật ở nhà.'] },
];

// Aggregate
export const allVietnameseExercises: Exercise[] = [
    ...phonicsExercises, ...toneExercises, ...readingExercises,
    ...writingExercises, ...vocabViExercises,
];

// ═══════════════════════════════════════════
// VIETNAMESE LESSONS (6 lessons)
// ═══════════════════════════════════════════

export const vietnameseLessons: Lesson[] = [
    {
        id: 'lesson-vn-phonics', subject: 'Tiếng Việt', ageBand: '6-8',
        competencyIds: ['comp-viet-001'], title: 'Ghép vần cơ bản',
        objective: 'Ghép phụ âm + nguyên âm thành tiếng.',
        contentBlocks: [
            { id: 'cb-vn-ph-01', type: 'text', content: 'Ghép phụ âm (b,c,d…) với nguyên âm (a,e,o…) thành vần.' },
            { id: 'cb-vn-ph-02', type: 'example', content: 'b+a=ba | m+ẹ=mẹ | c+ô=cô | th+ỏ=thỏ' },
        ],
        exercises: phonicsExercises.slice(0, 10),
        rubric: ['Ghép đúng', 'Đọc to', 'Nhận biết từ'],
    },
    {
        id: 'lesson-vn-phonics-adv', subject: 'Tiếng Việt', ageBand: '6-8',
        competencyIds: ['comp-viet-001'], title: 'Vần phức — nh, th, kh, tr',
        objective: 'Đọc phụ âm ghép: nh, th, kh, tr, ng, ch, gh.',
        contentBlocks: [
            { id: 'cb-vn-pa-01', type: 'visual', content: 'th→thỏ🐰 | nh→nhà🏠 | kh→khỉ🐵 | tr→trăng🌙' },
        ],
        exercises: phonicsExercises.slice(14, 24),
        rubric: ['Đọc đúng phụ âm ghép'],
    },
    {
        id: 'lesson-vn-tones', subject: 'Tiếng Việt', ageBand: '6-8',
        competencyIds: ['comp-viet-001'], title: '6 thanh điệu tiếng Việt',
        objective: 'Nhận biết 6 thanh điệu.',
        contentBlocks: [
            { id: 'cb-vn-t-01', type: 'visual', content: 'ma→mà→má→mả→mã→mạ (6 thanh!)' },
        ],
        exercises: toneExercises, rubric: ['Đọc đúng thanh', 'Nhận biết dấu'],
    },
    {
        id: 'lesson-vn-reading', subject: 'Tiếng Việt', ageBand: '6-8',
        competencyIds: ['comp-viet-002'], title: 'Đọc hiểu câu & đoạn ngắn',
        objective: 'Trả lời ai/cái gì/làm gì/tại sao.',
        contentBlocks: [{ id: 'cb-vn-r-01', type: 'text', content: 'Khi đọc: AI? LÀM GÌ? Ở ĐÂU? TẠI SAO?' }],
        exercises: readingExercises, rubric: ['Đọc trôi chảy', 'Trả lời đúng'],
    },
    {
        id: 'lesson-vn-writing', subject: 'Tiếng Việt', ageBand: '6-8',
        competencyIds: ['comp-viet-003'], title: 'Chính tả & Viết câu',
        objective: 'Viết đúng chính tả, sắp xếp từ thành câu.',
        contentBlocks: [{ id: 'cb-vn-w-01', type: 'text', content: 'Phân biệt: l/n, s/x, ch/tr, gi/d.' }],
        exercises: writingExercises, rubric: ['Viết đúng', 'Đặt câu'],
    },
    {
        id: 'lesson-vn-vocab', subject: 'Tiếng Việt', ageBand: '6-8',
        competencyIds: ['comp-viet-002', 'comp-viet-003'], title: 'Mở rộng vốn từ',
        objective: 'Từ mới, trái nghĩa, phân loại từ.',
        contentBlocks: [{ id: 'cb-vn-v-01', type: 'text', content: 'Vốn từ nhiều → đọc giỏi hơn!' }],
        exercises: vocabViExercises, rubric: ['Biết nghĩa', 'Trái nghĩa', 'Đặt câu'],
    },
];
