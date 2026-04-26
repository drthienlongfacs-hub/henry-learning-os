import type {
    Competency,
    Lesson,
    Exercise,
    ContentBlock,
    ParentMission,
} from '@/types';

// =============================================
// SEED DATA — Grade 1 Math, Vietnamese, English
// For child: Henry, born 2020, Grade 1, TP.HCM
// =============================================

// --- Competencies ---

export const competencies: Competency[] = [
    // Math — Grade 1
    {
        id: 'comp-math-001',
        domain: 'math',
        subject: 'Toán',
        ageBand: '6-8',
        gradeBand: '1',
        title: 'Đếm & nhận biết số từ 1 đến 20',
        description: 'Bé đếm được, nhận biết và viết được các số từ 1 đến 20.',
        prerequisites: [],
        evidenceRequired: ['Đếm chính xác', 'Viết số', 'Nhận biết số trong tuần tự'],
    },
    {
        id: 'comp-math-002',
        domain: 'math',
        subject: 'Toán',
        ageBand: '6-8',
        gradeBand: '1',
        title: 'Phép cộng trong phạm vi 10',
        description: 'Cộng hai số có tổng không quá 10, giải thích được cách cộng.',
        prerequisites: ['comp-math-001'],
        evidenceRequired: ['Tính đúng', 'Giải thích bước', 'Áp dụng vào bài toán có lời văn'],
    },
    {
        id: 'comp-math-003',
        domain: 'math',
        subject: 'Toán',
        ageBand: '6-8',
        gradeBand: '1',
        title: 'Phép trừ trong phạm vi 10',
        description: 'Trừ hai số trong phạm vi 10, hiểu ý nghĩa phép trừ.',
        prerequisites: ['comp-math-001'],
        evidenceRequired: ['Tính đúng', 'Giải thích', 'Bài toán có lời văn'],
    },
    {
        id: 'comp-math-004',
        domain: 'math',
        subject: 'Toán',
        ageBand: '6-8',
        gradeBand: '1',
        title: 'Hình học cơ bản — nhận biết hình',
        description: 'Nhận biết hình tròn, hình vuông, hình tam giác, hình chữ nhật.',
        prerequisites: [],
        evidenceRequired: ['Nhận biết hình', 'Phân biệt', 'Tìm trong thực tế'],
    },
    // Vietnamese — Grade 1
    {
        id: 'comp-viet-001',
        domain: 'vietnamese_reading',
        subject: 'Tiếng Việt',
        ageBand: '6-8',
        gradeBand: '1',
        title: 'Đọc chữ cái & âm vần',
        description: 'Nhận biết 29 chữ cái tiếng Việt, đọc được các vần cơ bản.',
        prerequisites: [],
        evidenceRequired: ['Đọc đúng chữ', 'Ghép vần', 'Đọc từ đơn giản'],
    },
    {
        id: 'comp-viet-002',
        domain: 'vietnamese_reading',
        subject: 'Tiếng Việt',
        ageBand: '6-8',
        gradeBand: '1',
        title: 'Đọc câu ngắn & trả lời nội dung',
        description: 'Đọc được câu ngắn 5-10 từ, trả lời câu hỏi ai/cái gì/làm gì.',
        prerequisites: ['comp-viet-001'],
        evidenceRequired: ['Đọc trôi chảy', 'Hiểu nội dung', 'Trả lời câu hỏi'],
    },
    {
        id: 'comp-viet-003',
        domain: 'vietnamese_writing',
        subject: 'Tiếng Việt',
        ageBand: '6-8',
        gradeBand: '1',
        title: 'Tập viết chữ cái & từ đơn giản',
        description: 'Viết đúng 29 chữ cái, viết được từ đơn giản theo mẫu.',
        prerequisites: ['comp-viet-001'],
        evidenceRequired: ['Viết đúng nét', 'Viết đúng chính tả', 'Viết câu ngắn'],
    },
    // English — Grade 1
    {
        id: 'comp-eng-001',
        domain: 'english',
        subject: 'Tiếng Anh',
        ageBand: '6-8',
        gradeBand: '1',
        title: 'Alphabet & Phonics cơ bản',
        description: 'Nhận biết 26 chữ cái, phát âm cơ bản, nghe-nói từ đơn giản.',
        prerequisites: [],
        evidenceRequired: ['Đọc chữ cái', 'Phát âm', 'Nghe nhận biết'],
    },
    {
        id: 'comp-eng-002',
        domain: 'english',
        subject: 'Tiếng Anh',
        ageBand: '6-8',
        gradeBand: '1',
        title: 'Từ vựng cơ bản — gia đình, màu sắc, số đếm',
        description: 'Học 50-100 từ vựng: gia đình, màu sắc, số, con vật, đồ ăn.',
        prerequisites: ['comp-eng-001'],
        evidenceRequired: ['Nói đúng từ', 'Nhận biết hình ảnh', 'Đặt câu đơn giản'],
    },

    // ============================================
    // ELITE CAPABILITY COMPETENCIES (6 Pillars)
    // Evidence: Garcia 2014, Batanero 2016, NCSS C3 2013,
    //           Jump$tart 2015, Wimmer & Perner 1983, CASEL 2015
    // ============================================

    // Pillar 1: Song ngữ sâu (Translanguaging — Garcia 2014)
    {
        id: 'comp-elite-bilingual-001',
        domain: 'bilingual_deep',
        subject: 'Song ngữ sâu',
        ageBand: '6-8',
        gradeBand: '1',
        title: 'Chuyển đổi ngôn ngữ theo bối cảnh',
        description: 'Bé sử dụng Tiếng Việt cho nội dung văn hóa/gia đình và Tiếng Anh cho khoa học/công nghệ một cách tự nhiên, không cần dịch từng từ.',
        prerequisites: ['comp-viet-001', 'comp-eng-001'],
        evidenceRequired: ['Phản xạ đúng ngôn ngữ theo bối cảnh', 'Không dịch word-by-word', 'Kể chuyện xen kẽ hai ngôn ngữ'],
    },

    // Pillar 2: Xác suất & Dữ liệu (CPA — Singapore Math; Batanero 2016)
    {
        id: 'comp-elite-probability-001',
        domain: 'probability_data',
        subject: 'Xác suất & Dữ liệu',
        ageBand: '6-8',
        gradeBand: '1',
        title: 'Hiểu "Chắc chắn" vs "Không thể"',
        description: 'Bé phân biệt được 5 mức độ: Không thể xảy ra → Ít khi → Ngang nhau → Có khả năng → Chắc chắn. Dùng biểu đồ cột đơn giản.',
        prerequisites: ['comp-math-001'],
        evidenceRequired: ['Phân loại đúng sự kiện theo 5 mức', 'Đọc biểu đồ cột 3 cột', 'Dự đoán kết quả trò chơi đơn giản'],
    },

    // Pillar 3: Công dân & Hệ thống (C3 Framework — NCSS 2013)
    {
        id: 'comp-elite-civics-001',
        domain: 'civics_geopolitics',
        subject: 'Công dân & Hệ thống',
        ageBand: '6-8',
        gradeBand: '1',
        title: 'Tạo luật và hiểu hệ quả',
        description: 'Bé đóng vai người lập luật cho cộng đồng nhỏ, hiểu nguyên nhân-hệ quả của quyết định phân bổ tài nguyên khan hiếm.',
        prerequisites: [],
        evidenceRequired: ['Đề xuất luật hợp lý', 'Giải thích hệ quả của luật', 'Phân biệt công bằng vs bất công'],
    },

    // Pillar 4: Tài chính & Tài sản (Jump$tart 2015; Mischel 1989 — caveat Watts 2018)
    {
        id: 'comp-elite-finance-001',
        domain: 'finance_assets',
        subject: 'Tài chính & Tài sản',
        ageBand: '6-8',
        gradeBand: '1',
        title: 'Phân biệt Muốn vs Cần, Tiêu vs Đầu tư',
        description: 'Bé phân biệt "muốn" và "cần", hiểu rằng giữ xu để "trồng" (đầu tư) sẽ sinh thêm xu (lãi kép đơn giản).',
        prerequisites: ['comp-math-001'],
        evidenceRequired: ['Phân loại đúng Muốn/Cần', 'Chọn đầu tư thay tiêu ít nhất 50% số lần', 'Giải thích tại sao hạt giống sinh thêm xu'],
    },

    // Pillar 5: Thương lượng & Lãnh đạo (Theory of Mind — Wimmer & Perner 1983)
    {
        id: 'comp-elite-negotiation-001',
        domain: 'negotiation_leadership',
        subject: 'Thương lượng & Lãnh đạo',
        ageBand: '6-8',
        gradeBand: '1',
        title: 'Thương lượng Win-Win cơ bản',
        description: 'Bé hiểu rằng người khác có suy nghĩ khác mình (Theory of Mind), và đề xuất giải pháp cả hai bên đều có lợi.',
        prerequisites: [],
        evidenceRequired: ['Nhận ra góc nhìn người khác (Sally-Anne)', 'Đề xuất giải pháp Win-Win', 'Sử dụng ngôn ngữ thuyết phục thay vì ép buộc'],
    },

    // Pillar 6: Đạo đức & Phục hồi (CASEL 2015 + Stoicism narrative)
    {
        id: 'comp-elite-ethics-001',
        domain: 'ethics_resilience',
        subject: 'Đạo đức & Phục hồi',
        ageBand: '6-8',
        gradeBand: '1',
        title: 'Vòng tròn kiểm soát & Bình tĩnh sau thất bại',
        description: 'Bé phân biệt được "Điều mình kiểm soát được" vs "Điều không kiểm soát được" (Circle of Control). Bé phục hồi cảm xúc sau thất bại trong thời gian hợp lý.',
        prerequisites: [],
        evidenceRequired: ['Phân loại đúng Kiểm soát/Không kiểm soát', 'Thời gian phục hồi sau Crisis < 60 giây', 'Chọn giải pháp thay vì bỏ cuộc'],
    },
];

// --- Exercises ---

const mathExercises: Exercise[] = [
    {
        id: 'ex-math-001',
        question: '3 + 5 = ?',
        type: 'multiple_choice',
        options: ['6', '7', '8', '9'],
        correctAnswer: '8',
        explanation: '3 + 5 = 8. Con đếm thêm 5 từ số 3: 4, 5, 6, 7, 8.',
        difficulty: 1,
        hints: [
            'Con thử đếm trên ngón tay xem nào!',
            'Bắt đầu từ số 3, đếm thêm 5 ngón tay.',
            '3 → 4 → 5 → 6 → 7 → 8. Vậy đáp án là 8!',
        ],
    },
    {
        id: 'ex-math-002',
        question: '7 + 2 = ?',
        type: 'multiple_choice',
        options: ['8', '9', '10', '5'],
        correctAnswer: '9',
        explanation: '7 + 2 = 9. Bắt đầu từ 7, đếm thêm 2: 8, 9.',
        difficulty: 1,
        hints: [
            'Bắt đầu từ số lớn hơn nhé!',
            'Từ 7, đếm thêm 2 số nữa.',
            '7 → 8 → 9. Đáp án là 9.',
        ],
    },
    {
        id: 'ex-math-003',
        question: 'Lan có 4 quả táo. Mẹ cho thêm 3 quả. Hỏi Lan có tất cả bao nhiêu quả táo?',
        type: 'free_text',
        correctAnswer: '7',
        explanation: '4 + 3 = 7. Lan có 4 quả, được thêm 3 quả, tổng cộng 7 quả táo.',
        difficulty: 2,
        hints: [
            'Đây là bài toán cộng. Con tìm xem có bao nhiêu quả tất cả.',
            'Lan có 4 quả táo + thêm 3 quả = ?',
            '4 + 3 = 7. Lan có tất cả 7 quả táo.',
        ],
    },
    {
        id: 'ex-math-004',
        question: '10 - 4 = ?',
        type: 'multiple_choice',
        options: ['4', '5', '6', '7'],
        correctAnswer: '6',
        explanation: '10 - 4 = 6. Từ 10, bớt đi 4: 9, 8, 7, 6.',
        difficulty: 1,
        hints: [
            'Bắt đầu từ 10, đếm lùi 4 bước.',
            '10 → 9 → 8 → 7 → 6.',
            '10 - 4 = 6.',
        ],
    },
    {
        id: 'ex-math-005',
        question: 'Con hãy giải thích: Tại sao 2 + 3 = 3 + 2?',
        type: 'explain',
        correctAnswer: 'Vì khi ta đổi chỗ hai số hạng, tổng không thay đổi.',
        explanation: 'Đây là tính chất giao hoán của phép cộng. 2 + 3 = 5 và 3 + 2 = 5, kết quả giống nhau.',
        difficulty: 3,
        hints: [
            'Con thử tính cả hai xem kết quả có giống nhau không?',
            '2 + 3 = ? và 3 + 2 = ? Giống nhau không?',
            'Khi đổi chỗ hai số cộng, kết quả vẫn giống nhau.',
        ],
    },
];

const vietnameseExercises: Exercise[] = [
    {
        id: 'ex-viet-001',
        question: 'Ghép vần: b + a = ?',
        type: 'free_text',
        correctAnswer: 'ba',
        explanation: 'Chữ b ghép với vần a thành "ba".',
        difficulty: 1,
        hints: [
            'Con đọc chữ b rồi thêm vần a nhé!',
            'b + a = ba, như ba (bố) của con vậy!',
        ],
    },
    {
        id: 'ex-viet-002',
        question: '"Bé đi học." Trong câu này, ai đi học?',
        type: 'multiple_choice',
        options: ['Bé', 'Mẹ', 'Ba', 'Cô giáo'],
        correctAnswer: 'Bé',
        explanation: 'Câu nói "Bé đi học" — người đi học là "Bé".',
        difficulty: 1,
        hints: [
            'Con đọc lại câu và tìm xem AI đi học nhé!',
            'Từ đầu tiên trong câu cho con biết ai đi học.',
        ],
    },
];

const englishExercises: Exercise[] = [
    {
        id: 'ex-eng-001',
        question: 'What color is this? 🍎 (red apple)',
        type: 'multiple_choice',
        options: ['Blue', 'Red', 'Green', 'Yellow'],
        correctAnswer: 'Red',
        explanation: 'An apple is RED. Quả táo màu ĐỎ.',
        difficulty: 1,
        hints: [
            'Look at the apple. What color is it?',
            'It is the same color as a fire truck!',
        ],
    },
    {
        id: 'ex-eng-002',
        question: 'How do you say "xin chào" in English?',
        type: 'free_text',
        correctAnswer: 'Hello',
        explanation: '"Xin chào" in English is "Hello".',
        difficulty: 1,
        hints: [
            'It starts with the letter H!',
            'H-E-L-L-O!',
        ],
    },
];

// --- Content Blocks ---

const mathContent: ContentBlock[] = [
    {
        id: 'cb-math-001',
        type: 'text',
        content: 'Hôm nay chúng ta sẽ học phép cộng trong phạm vi 10. Phép cộng nghĩa là gộp hai nhóm lại với nhau.',
    },
    {
        id: 'cb-math-002',
        type: 'example',
        content: 'Ví dụ: Con có 3 viên bi xanh 🔵🔵🔵 và 2 viên bi đỏ 🔴🔴. Gộp lại con có 5 viên bi: 🔵🔵🔵🔴🔴',
    },
    {
        id: 'cb-math-003',
        type: 'visual',
        content: '3 + 2 = 5\n\n🟢🟢🟢 + 🟡🟡 = 🟢🟢🟢🟡🟡',
    },
];

// --- Lessons ---

export const lessons: Lesson[] = [
    {
        id: 'lesson-math-001',
        subject: 'Toán',
        ageBand: '6-8',
        competencyIds: ['comp-math-002'],
        title: 'Phép cộng trong phạm vi 10',
        objective: 'Bé biết cộng hai số có tổng không quá 10 và giải thích cách làm.',
        contentBlocks: mathContent,
        exercises: mathExercises.slice(0, 3),
        rubric: ['Tính đúng', 'Giải thích được bước', 'Không cần gợi ý quá nhiều'],
    },
    {
        id: 'lesson-math-002',
        subject: 'Toán',
        ageBand: '6-8',
        competencyIds: ['comp-math-003'],
        title: 'Phép trừ trong phạm vi 10',
        objective: 'Bé biết trừ hai số trong phạm vi 10 và hiểu ý nghĩa phép trừ.',
        contentBlocks: [
            {
                id: 'cb-sub-001',
                type: 'text',
                content: 'Phép trừ nghĩa là bớt đi. Khi ta có một nhóm đồ vật rồi lấy bớt đi, số còn lại chính là kết quả phép trừ.',
            },
            {
                id: 'cb-sub-002',
                type: 'example',
                content: 'Con có 8 cái kẹo 🍬🍬🍬🍬🍬🍬🍬🍬\nCon ăn 3 cái: 🍬🍬🍬 ❌\nCòn lại: 🍬🍬🍬🍬🍬 = 5 cái',
            },
        ],
        exercises: [mathExercises[3], mathExercises[4]],
        rubric: ['Tính đúng', 'Hiểu ý nghĩa trừ', 'Bài toán có lời văn'],
    },
    {
        id: 'lesson-viet-001',
        subject: 'Tiếng Việt',
        ageBand: '6-8',
        competencyIds: ['comp-viet-001', 'comp-viet-002'],
        title: 'Đọc vần & câu ngắn',
        objective: 'Bé ghép được vần đơn giản và đọc hiểu câu ngắn.',
        contentBlocks: [
            {
                id: 'cb-viet-001',
                type: 'text',
                content: 'Hôm nay chúng ta sẽ ghép chữ cái thành vần, rồi đọc câu ngắn nhé!',
            },
        ],
        exercises: vietnameseExercises,
        rubric: ['Ghép vần đúng', 'Đọc trôi chảy', 'Trả lời câu hỏi nội dung'],
    },
    {
        id: 'lesson-eng-001',
        subject: 'Tiếng Anh',
        ageBand: '6-8',
        competencyIds: ['comp-eng-001', 'comp-eng-002'],
        title: 'Colors & Greetings',
        objective: 'Learn basic colors and how to say hello in English.',
        contentBlocks: [
            {
                id: 'cb-eng-001',
                type: 'text',
                content: 'Today we will learn colors and greetings! Hôm nay chúng ta học màu sắc và cách chào hỏi bằng tiếng Anh!',
            },
        ],
        exercises: englishExercises,
        rubric: ['Nói đúng từ', 'Hiểu nghĩa'],
    },
];

// --- Parent Missions ---

export const parentMissions: ParentMission[] = [
    {
        id: 'pm-001',
        title: 'Nghe con giải thích',
        description: 'Hỏi con: "Hôm nay con học được gì mới?" và lắng nghe con giải thích. Không sửa, chỉ hỏi thêm.',
        durationMinutes: 10,
        category: 'listen',
        completedAt: null,
    },
    {
        id: 'pm-002',
        title: 'Đọc cùng con',
        description: 'Đọc 1 trang sách cùng con. Con đọc trước, ba/mẹ đọc lại. Hỏi con thích nhân vật nào nhất.',
        durationMinutes: 10,
        category: 'read',
        completedAt: null,
    },
    {
        id: 'pm-003',
        title: 'Hỏi một câu hỏi mở',
        description: 'Hỏi con một câu hỏi mở: "Nếu con có phép thuật, con sẽ thay đổi điều gì ở trường?"',
        durationMinutes: 5,
        category: 'ask',
        completedAt: null,
    },
    {
        id: 'pm-004',
        title: 'Xem lại lỗi sai',
        description: 'Cùng con xem một lỗi sai trong tuần. Không trách, chỉ hỏi: "Chỗ nào làm con bị nhầm?"',
        durationMinutes: 10,
        category: 'review',
        completedAt: null,
    },
    {
        id: 'pm-005',
        title: 'Dự án nhỏ',
        description: 'Cùng con đo chiều dài bàn ăn bằng gang tay. Ghi kết quả và so sánh với ba/mẹ.',
        durationMinutes: 15,
        category: 'project',
        completedAt: null,
    },
    {
        id: 'pm-006',
        title: 'Đi bộ & thảo luận',
        description: 'Đi bộ 10 phút cùng con. Hỏi: "Con thấy bao nhiêu hình tam giác trên đường?"',
        durationMinutes: 15,
        category: 'discuss',
        completedAt: null,
    },
];
