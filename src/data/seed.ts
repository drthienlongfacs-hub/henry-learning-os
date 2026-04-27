import type {
    Competency,
    Lesson,
    Exercise,
    ContentBlock,
    ParentMission,
} from '@/types';

import { allMathExercises, subtractionWithin10 } from './exercises-math';
import { allVietnameseExercises } from './exercises-vietnamese';
import { englishExercises } from './exercises-english';
import { eliteExercises } from './exercises-elite';
import { massiveMathGenerated, massiveEliteGenerated } from './exercises-generated';

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

// The exercises arrays are now imported from their respective expanded files.

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
        exercises: allMathExercises.slice(0, 10),
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
        exercises: subtractionWithin10.slice(0, 5),
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
        exercises: allVietnameseExercises.slice(0, 10),
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
        exercises: englishExercises.slice(0, 10),
        rubric: ['Nói đúng từ', 'Hiểu nghĩa'],
    },
    {
        id: 'lesson-mega-math-100x',
        subject: 'Toán',
        ageBand: '6-8',
        competencyIds: ['comp-math-001', 'comp-math-002', 'comp-math-003', 'comp-math-004'],
        title: 'Thử thách Toán Học 100x (Quân Sự)',
        objective: 'Luyện tập tổng hợp các kỹ năng toán học.',
        contentBlocks: [{ id: 'cb-mega-m-1', type: 'text', content: 'Căn cứ đang chờ lệnh! Chỉ huy hãy giải các bài toán để củng cố phòng thủ!' }],
        exercises: [...allMathExercises, ...massiveMathGenerated], // massive 4000+ dataset
        rubric: ['Chính xác tuyệt đối'],
    },
    {
        id: 'lesson-mega-viet-100x',
        subject: 'Tiếng Việt',
        ageBand: '6-8',
        competencyIds: ['comp-viet-001', 'comp-viet-002', 'comp-viet-003'],
        title: 'Thử thách Tiếng Việt 100x',
        objective: 'Đọc thông viết thạo.',
        contentBlocks: [{ id: 'cb-mega-v-1', type: 'text', content: 'Làm giàu vốn ngôn ngữ!' }],
        exercises: allVietnameseExercises, // contains all 70+
        rubric: ['Đọc thông', 'Hiểu giỏi'],
    },
    {
        id: 'lesson-mega-eng-100x',
        subject: 'Tiếng Anh',
        ageBand: '6-8',
        competencyIds: ['comp-eng-001', 'comp-eng-002'],
        title: 'Thử thách Tiếng Anh 100x',
        objective: 'Thành thạo từ vựng.',
        contentBlocks: [{ id: 'cb-mega-e-1', type: 'text', content: 'English mastery!' }],
        exercises: englishExercises, // contains 160
        rubric: ['Vocabulary mastery'],
    },
    {
        id: 'lesson-mega-elite-100x',
        subject: 'Năng lực tinh hoa (Elite)',
        ageBand: '6-8',
        competencyIds: ['comp-elite-probability-001', 'comp-elite-civics-001', 'comp-elite-finance-001'],
        title: 'CHỈ HUY TRƯỞNG LÊN LỆNH (Trò Chơi Chiến Thuật)',
        objective: 'Rèn luyện khả năng quản lý tài nguyên, xác suất và chiến thuật tác chiến.',
        contentBlocks: [{ id: 'cb-mega-elite-1', type: 'text', content: 'Chào Chỉ huy Henry! Kẻ địch đang áp sát căn cứ. Hãy dùng tư duy sắc bén để bảo vệ cứ điểm!' }],
        exercises: [...eliteExercises, ...massiveEliteGenerated], // massive 300+ dataset
        rubric: ['Quyết định chính xác', 'Quản lý tài nguyên giỏi'],
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

export const allExercises: Exercise[] = [
    ...allMathExercises,
    ...allVietnameseExercises,
    ...englishExercises,
    ...eliteExercises,
    ...massiveMathGenerated,
    ...massiveEliteGenerated,
];
