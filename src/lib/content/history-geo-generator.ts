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
    illustration?: any;
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
    { q: 'Nhà nước đầu tiên của nước ta tên là gì?', a: 'Văn Lang', opts: ['Văn Lang', 'Âu Lạc', 'Đại Việt', 'Đại Ngu'], e: 'Nhà nước Văn Lang do các vua Hùng lập ra, là nhà nước đầu tiên của người Việt.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dong_Son_bronze_drum_2.jpg?width=800' },
    { q: 'Người đứng đầu nhà nước Văn Lang gọi là gì?', a: 'Hùng Vương', opts: ['Hùng Vương', 'An Dương Vương', 'Lạc Hầu', 'Lạc Tướng'], e: 'Đứng đầu nhà nước Văn Lang là Hùng Vương, truyền được 18 đời.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hung_Temple_Festival_in_Phu_Tho.jpg?width=800' },
    { q: 'Ai là người lãnh đạo nhân dân đánh đuổi quân Nam Hán trên sông Bạch Đằng năm 938?', a: 'Ngô Quyền', opts: ['Ngô Quyền', 'Lý Thường Kiệt', 'Trần Hưng Đạo', 'Lê Lợi'], e: 'Năm 938, Ngô Quyền dùng cược gỗ cắm dưới sông Bạch Đằng, đánh tan quân Nam Hán.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/TranBinhTrong_TuUyen.jpg?width=800' },
    { q: 'Cổ Loa là kinh đô của triều đại nào?', a: 'Âu Lạc', opts: ['Âu Lạc', 'Văn Lang', 'Đại Cồ Việt', 'Đại Việt'], e: 'An Dương Vương lập ra nước Âu Lạc, đóng đô ở Cổ Loa (Đông Anh, Hà Nội nay).', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Matbangcoloa.jpg?width=800' },
    { q: 'Ai là người dời đô từ Hoa Lư về Thăng Long (Hà Nội)?', a: 'Lý Thái Tổ (Lý Công Uẩn)', opts: ['Lý Thái Tổ (Lý Công Uẩn)', 'Đinh Tiên Hoàng', 'Lê Hoàn', 'Lý Tự Trọng'], e: 'Năm 1010, vua Lý Thái Tổ quyết định dời đô từ vùng núi Hoa Lư ra Đại La, đổi tên là Thăng Long.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Khu%C3%B4n_vi%C3%AAn_t%C6%B0%E1%BB%A3ng_%C4%91%C3%A0i_L%C3%BD_Th%C3%A1i_T%E1%BB%95_-_H%C3%A0_N%E1%BB%99i_2.jpg?width=800' },
    { q: 'Cuộc khởi nghĩa Hai Bà Trưng nổ ra vào năm nào?', a: 'Năm 40', opts: ['Năm 40', 'Năm 248', 'Năm 938', 'Năm 981'], e: 'Mùa xuân năm 40, Hai Bà Trưng (Trưng Trắc, Trưng Nhị) phất cờ khởi nghĩa ở Mê Linh.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dong_Ho_painting_-_Hai_Ba_Trung.jpg?width=800' },
    { q: 'Tên vị tướng đã 3 lần đánh bại quân Mông - Nguyên?', a: 'Trần Hưng Đạo', opts: ['Trần Hưng Đạo', 'Lý Thường Kiệt', 'Lê Lợi', 'Nguyễn Trãi'], e: 'Trần Hưng Đạo (Trần Quốc Tuấn) chỉ huy quân dân nhà Trần 3 lần đại thắng quân Mông - Nguyên.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Statue_of_Tran_Hung_Dao,_Bach_Dang_wharf,_Ho_Chi_Minh_City.jpg?width=800' },
];

export function genHistoryG4(): HisGeoProblem {
    const item = HIST_G4_QS[rand(0, HIST_G4_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'history', topic: 'Lịch sử Việt Nam', topicKey: 'history_g4',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nhớ lại các bài học lịch sử', `Đáp án: ${item.a}`],
        illustration: item.illustration,
    };
}

// ══════════════════════════════════════════════
// Grade 4-5: Geography
// ══════════════════════════════════════════════

const GEO_QS = [
    { q: 'Núi cao nhất Việt Nam tên là gì?', a: 'Fansipan', opts: ['Fansipan', 'Bạch Mã', 'Lang Biang', 'Ngọc Linh'], e: 'Đỉnh Fansipan cao 3.143m, được mệnh danh là "nóc nhà Đông Dương".', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Fansipan-01.jpg?width=800' },
    { q: 'Thủ đô của nước ta là?', a: 'Hà Nội', opts: ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Huế'], e: 'Hà Nội là thủ đô, trung tâm chính trị, văn hóa của nước Việt Nam.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hanoi_city_view_from_Lotte_Center.jpg?width=800' },
    { q: 'Sông nào lớn nhất miền Nam nước ta?', a: 'Sông Cửu Long (Mê Kông)', opts: ['Sông Cửu Long (Mê Kông)', 'Sông Sài Gòn', 'Sông Đồng Nai', 'Sông Hồng'], e: 'Sông Cửu Long chảy qua 6 nước, đổ ra biển Đông qua 9 cửa ở đồng bằng Nam Bộ.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mekong_River_Delta.jpg?width=800' },
    { q: 'Đất nước Việt Nam có hình dạng giống chữ cái nào?', a: 'Chữ S', opts: ['Chữ S', 'Hình vuông', 'Hình tròn', 'Hình tam giác'], e: 'Việt Nam nằm trải dài dọc bờ biển Đông, uốn cong theo hình chữ S.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_in_Asia_%28-mini_map_-rivers%29.svg?width=800' },
    { q: 'Quần đảo Hoàng Sa và Trường Sa thuộc vùng biển nào?', a: 'Biển Đông', opts: ['Biển Đông', 'Biển Thái Bình Dương', 'Biển Địa Trung Hải', 'Biển Đen'], e: 'Hoàng Sa và Trường Sa là hai quần đảo lớn của Việt Nam nằm trên Biển Đông.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/South_China_Sea_location_map.svg?width=800' },
    { q: 'Thành phố lớn nhất nước ta về dân số và kinh tế?', a: 'TP. Hồ Chí Minh', opts: ['TP. Hồ Chí Minh', 'Hà Nội', 'Hải Phòng', 'Cần Thơ'], e: 'TP. Hồ Chí Minh là trung tâm kinh tế năng động và đông dân nhất cả nước.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ho_Chi_Minh_City_Skyline_%28Night%29.jpg?width=800' },
    { q: 'Nước ta có bao nhiêu dân tộc anh em?', a: '54', opts: ['54', '50', '60', '45'], e: 'Việt Nam là quốc gia đa dân tộc với 54 dân tộc anh em cùng chung sống, đông nhất là dân tộc Kinh.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/54_d%C3%A2n_t%E1%BB%99c_anh_em.jpg?width=800' },
];

export function genGeography(): HisGeoProblem {
    const item = GEO_QS[rand(0, GEO_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'geography', topic: 'Địa lý Việt Nam', topicKey: 'geography',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nghĩ về bản đồ Việt Nam', `Đáp án: ${item.a}`],
        illustration: item.illustration,
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
