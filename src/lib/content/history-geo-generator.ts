// =====================================================
// History & Geography Generator — CT 2018 Lịch sử & Địa lý (L4-5)
// Sources: CT 2018 Lịch sử & Địa lý tiểu học
// =====================================================

export interface HisGeoProblem {
    id: string;
    question: string;
    correctAnswer: string;
    options: string[];
    explanation: string;
    difficulty: number;
    hints: string[];
    type: 'history' | 'geography';
    gradeLevel: number;
    topic: string;
    topicKey: string;
}

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const genId = () => `hg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const shuffle = <T>(arr: T[]): T[] => {
    const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = rand(0, i);[a[i], a[j]] = [a[j], a[i]]; } return a;
};

// ══════════════════════════════════════════════
// Grade 4: History
// ══════════════════════════════════════════════

const HIST_G4_QS = [
    { q: 'Nhà nước đầu tiên của nước ta tên là gì?', a: 'Văn Lang', opts: ['Văn Lang', 'Âu Lạc', 'Đại Việt', 'Đại Ngu'], e: 'Nhà nước Văn Lang do các vua Hùng lập ra, là nhà nước đầu tiên của người Việt.' },
    { q: 'Người đứng đầu nhà nước Văn Lang gọi là gì?', a: 'Hùng Vương', opts: ['Hùng Vương', 'An Dương Vương', 'Lạc Hầu', 'Lạc Tướng'], e: 'Đứng đầu nhà nước Văn Lang là Hùng Vương, truyền được 18 đời.' },
    { q: 'Ai là người lãnh đạo nhân dân đánh đuổi quân Nam Hán trên sông Bạch Đằng năm 938?', a: 'Ngô Quyền', opts: ['Ngô Quyền', 'Lý Thường Kiệt', 'Trần Hưng Đạo', 'Lê Lợi'], e: 'Năm 938, Ngô Quyền dùng cược gỗ cắm dưới sông Bạch Đằng, đánh tan quân Nam Hán.' },
    { q: 'Cổ Loa là kinh đô của triều đại nào?', a: 'Âu Lạc', opts: ['Âu Lạc', 'Văn Lang', 'Đại Cồ Việt', 'Đại Việt'], e: 'An Dương Vương lập ra nước Âu Lạc, đóng đô ở Cổ Loa (Đông Anh, Hà Nội nay).' },
    { q: 'Ai là người dời đô từ Hoa Lư về Thăng Long (Hà Nội)?', a: 'Lý Thái Tổ (Lý Công Uẩn)', opts: ['Lý Thái Tổ (Lý Công Uẩn)', 'Đinh Tiên Hoàng', 'Lê Hoàn', 'Lý Tự Trọng'], e: 'Năm 1010, vua Lý Thái Tổ quyết định dời đô từ vùng núi Hoa Lư ra Đại La, đổi tên là Thăng Long.' },
    { q: 'Cuộc khởi nghĩa Hai Bà Trưng nổ ra vào năm nào?', a: 'Năm 40', opts: ['Năm 40', 'Năm 248', 'Năm 938', 'Năm 981'], e: 'Mùa xuân năm 40, Hai Bà Trưng (Trưng Trắc, Trưng Nhị) phất cờ khởi nghĩa ở Mê Linh.' },
    { q: 'Tên vị tướng đã 3 lần đánh bại quân Mông - Nguyên?', a: 'Trần Hưng Đạo', opts: ['Trần Hưng Đạo', 'Lý Thường Kiệt', 'Lê Lợi', 'Nguyễn Trãi'], e: 'Trần Hưng Đạo (Trần Quốc Tuấn) chỉ huy quân dân nhà Trần 3 lần đại thắng quân Mông - Nguyên.' },
];

export function genHistoryG4(): HisGeoProblem {
    const item = HIST_G4_QS[rand(0, HIST_G4_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'history', topic: 'Lịch sử Việt Nam', topicKey: 'history_g4',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nhớ lại các bài học lịch sử', `Đáp án: ${item.a}`],
    };
}

// ══════════════════════════════════════════════
// Grade 4-5: Geography
// ══════════════════════════════════════════════

const GEO_QS = [
    { q: 'Núi cao nhất Việt Nam tên là gì?', a: 'Fansipan', opts: ['Fansipan', 'Bạch Mã', 'Lang Biang', 'Ngọc Linh'], e: 'Đỉnh Fansipan cao 3.143m, được mệnh danh là "nóc nhà Đông Dương".' },
    { q: 'Thủ đô của nước ta là?', a: 'Hà Nội', opts: ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Huế'], e: 'Hà Nội là thủ đô, trung tâm chính trị, văn hóa của nước Việt Nam.' },
    { q: 'Sông nào lớn nhất miền Nam nước ta?', a: 'Sông Cửu Long (Mê Kông)', opts: ['Sông Cửu Long (Mê Kông)', 'Sông Sài Gòn', 'Sông Đồng Nai', 'Sông Hồng'], e: 'Sông Cửu Long chảy qua 6 nước, đổ ra biển Đông qua 9 cửa ở đồng bằng Nam Bộ.' },
    { q: 'Đất nước Việt Nam có hình hạt gì?', a: 'Chữ S', opts: ['Chữ S', 'Hình vuông', 'Hình tròn', 'Hình tam giác'], e: 'Việt Nam nằm trải dài dọc bờ biển Đông, uốn cong theo hình chữ S.' },
    { q: 'Quần đảo Hoàng Sa và Trường Sa thuộc vùng biển nào?', a: 'Biển Đông', opts: ['Biển Đông', 'Biển Thái Bình Dương', 'Biển Địa Trung Hải', 'Biển Đen'], e: 'Hoàng Sa và Trường Sa là hai quần đảo lớn của Việt Nam nằm trên Biển Đông.' },
    { q: 'Thành phố lớn nhất nước ta về dân số và kinh tế?', a: 'TP. Hồ Chí Minh', opts: ['TP. Hồ Chí Minh', 'Hà Nội', 'Hải Phòng', 'Cần Thơ'], e: 'TP. Hồ Chí Minh là trung tâm kinh tế năng động và đông dân nhất cả nước.' },
    { q: 'Nước ta có bao nhiêu dân tộc anh em?', a: '54', opts: ['54', '50', '60', '45'], e: 'Việt Nam là quốc gia đa dân tộc với 54 dân tộc anh em cùng chung sống, đông nhất là dân tộc Kinh.' },
];

export function genGeography(): HisGeoProblem {
    const item = GEO_QS[rand(0, GEO_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'geography', topic: 'Địa lý Việt Nam', topicKey: 'geography',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nghĩ về bản đồ Việt Nam', `Đáp án: ${item.a}`],
    };
}

// ══════════════════════════════════════════════
// TOPIC REGISTRY
// ══════════════════════════════════════════════

export interface HisGeoTopicInfo {
    key: string;
    name: string;
    gradeLevel: number;
    generator: () => HisGeoProblem;
    icon: string;
}

export const HISGEO_TOPICS: HisGeoTopicInfo[] = [
    { key: 'history_g4', name: 'Lịch sử dân tộc', gradeLevel: 4, generator: genHistoryG4, icon: '📜' },
    { key: 'geography', name: 'Địa lý Việt Nam', gradeLevel: 5, generator: genGeography, icon: '🗺️' },
];

export function generateHisGeoSet(grade: number, topicKey?: string, count: number = 10): HisGeoProblem[] {
    const topics = HISGEO_TOPICS.filter(t => t.gradeLevel <= grade && (!topicKey || t.key === topicKey));
    if (topics.length === 0) return [];
    return Array.from({ length: count }, () => {
        const t = topics[rand(0, topics.length - 1)];
        return t.generator();
    });
}
