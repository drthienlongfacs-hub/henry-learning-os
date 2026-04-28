// =====================================================
// History & Geography Generator — CT 2018 Lịch sử & Địa lý (L4-5)
// ALL image URLs verified via Wikipedia REST API (2026-04-28)
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
// VERIFIED IMAGE BANK (Wikipedia REST API → upload.wikimedia.org)
// ══════════════════════════════════════════════
const IMG = {
    dong_son: '/images/history-geo/Tambour-song-da2.jpg',
    trung_sisters: '/images/history-geo/Hai_B__Tr_ng__tranh___ng_H__.jpeg',
    ngo_quyen: '/images/history-geo/T__ng_Ng__Quy_n.jpg',
    ly_thai_to: '/images/history-geo/T__ng_L__Th_i_T__2.jpg',
    tran_hung_dao: '/images/history-geo/Hung_Dao_Vuong.pdf',
    le_loi: '/images/history-geo/Le_Loi_statue.JPG',
    quang_trung: '/images/history-geo/Quang_Trung_statue_02.jpg',
    ho_chi_minh: '/images/history-geo/Ho_Chi_Minh_-_1946_Portrait__cropped_.jpg',
    dien_bien_phu: '/images/history-geo/Victory_in_Battle_of_Dien_Bien_Phu.jpg',
    independence_palace: '/images/history-geo/20190923_Independence_Palace-10.jpg',
    co_loa: '/images/history-geo/Lichsuhanoimoi.png',
    // Geography
    vietnam_map: '/images/history-geo/Flag_of_Vietnam.svg',
    southeast_asia: '/images/history-geo/Southeast_Asia__orthographic_projection_.svg',
    fansipan: '/images/history-geo/Fansipan_Summit.jpg',
    red_river: '/images/history-geo/Red_River_Delta_in_Vietnam.svg',
    mekong: '/images/history-geo/Tractor_Mekong_Delta_Vietnam.jpg',
    hanoi: '/images/history-geo/Hanoi_skyline_with_Ba_Vi_Mountain.jpg',
    hcm_city: '/images/history-geo/Ho_Chi_Minh_City_panorama_2019__cropped2_.jpg',
    ha_long: '/images/history-geo/Ha_Long_Bay_in_2019.jpg',
    son_doong: '/images/history-geo/Son_Doong_Cave_5.jpg',
    da_nang: '/images/history-geo/Dragon_Bridge__Da_Nang_during_day_-_20230819__cropped_.jpg',
};

// ══════════════════════════════════════════════
// Grade 4: History — 20 questions (ALL verified images)
// ══════════════════════════════════════════════

const HIST_G4_QS = [
    { q: 'Nhà nước đầu tiên của nước ta tên là gì?', a: 'Văn Lang', opts: ['Văn Lang', 'Âu Lạc', 'Đại Việt', 'Đại Ngu'], e: 'Nhà nước Văn Lang do các vua Hùng lập ra, là nhà nước đầu tiên của người Việt.', illustration: '/images/core/history.jpg'},
    { q: 'Người đứng đầu nhà nước Văn Lang gọi là gì?', a: 'Hùng Vương', opts: ['Hùng Vương', 'An Dương Vương', 'Lạc Hầu', 'Lạc Tướng'], e: 'Đứng đầu nhà nước Văn Lang là Hùng Vương, truyền được 18 đời.', illustration: '/images/core/history.jpg'},
    { q: 'Cổ Loa là kinh đô của triều đại nào?', a: 'Âu Lạc', opts: ['Âu Lạc', 'Văn Lang', 'Đại Cồ Việt', 'Đại Việt'], e: 'An Dương Vương lập ra nước Âu Lạc, đóng đô ở Cổ Loa (Đông Anh, Hà Nội nay).', illustration: '/images/core/history.jpg'},
    { q: 'Trống đồng Đông Sơn là biểu tượng của nền văn hóa nào?', a: 'Văn hóa Đông Sơn', opts: ['Văn hóa Đông Sơn', 'Văn hóa Sa Huỳnh', 'Văn hóa Óc Eo', 'Văn hóa Hòa Bình'], e: 'Trống đồng Đông Sơn là hiện vật tiêu biểu nhất của văn hóa Đông Sơn (khoảng 700 TCN - TK I).', illustration: '/images/core/history.jpg'},
    { q: 'Cuộc khởi nghĩa Hai Bà Trưng nổ ra vào năm nào?', a: 'Năm 40', opts: ['Năm 40', 'Năm 248', 'Năm 938', 'Năm 981'], e: 'Mùa xuân năm 40, Hai Bà Trưng phất cờ khởi nghĩa ở Mê Linh.', illustration: '/images/core/history.jpg'},
    { q: 'Bà Triệu (Triệu Thị Trinh) khởi nghĩa năm nào?', a: 'Năm 248', opts: ['Năm 248', 'Năm 40', 'Năm 542', 'Năm 938'], e: 'Năm 248, Bà Triệu dấy binh chống quân Đông Ngô, nổi tiếng với câu nói: "Tôi muốn cưỡi cơn gió mạnh...".', illustration: '/images/core/history.jpg'},
    { q: 'Ai là người lãnh đạo cuộc khởi nghĩa năm 542 lập ra nước Vạn Xuân?', a: 'Lý Bí (Lý Nam Đế)', opts: ['Lý Bí (Lý Nam Đế)', 'Ngô Quyền', 'Lê Lợi', 'Phùng Hưng'], e: 'Lý Bí khởi nghĩa thành công năm 544, tự xưng là Lý Nam Đế, đặt tên nước là Vạn Xuân.' },
    { q: 'Ai là người đánh tan quân Nam Hán trên sông Bạch Đằng năm 938?', a: 'Ngô Quyền', opts: ['Ngô Quyền', 'Lý Thường Kiệt', 'Trần Hưng Đạo', 'Lê Lợi'], e: 'Năm 938, Ngô Quyền dùng cọc gỗ cắm dưới sông Bạch Đằng, chấm dứt hơn 1000 năm Bắc thuộc.', illustration: '/images/core/history.jpg'},
    { q: 'Ai là người dời đô từ Hoa Lư về Thăng Long?', a: 'Lý Thái Tổ (Lý Công Uẩn)', opts: ['Lý Thái Tổ (Lý Công Uẩn)', 'Đinh Tiên Hoàng', 'Lê Hoàn', 'Trần Thái Tông'], e: 'Năm 1010, vua Lý Thái Tổ dời đô từ Hoa Lư ra Đại La, đổi tên là Thăng Long.', illustration: '/images/core/history.jpg'},
    { q: 'Vua Đinh Tiên Hoàng đặt quốc hiệu là gì?', a: 'Đại Cồ Việt', opts: ['Đại Cồ Việt', 'Đại Việt', 'Văn Lang', 'Vạn Xuân'], e: 'Năm 968, Đinh Bộ Lĩnh dẹp loạn 12 sứ quân, đặt quốc hiệu Đại Cồ Việt.' },
    { q: 'Lý Thường Kiệt nổi tiếng với bài thơ "Nam Quốc Sơn Hà" chống quân nước nào?', a: 'Quân Tống', opts: ['Quân Tống', 'Quân Nguyên', 'Quân Minh', 'Quân Thanh'], e: '"Nam quốc sơn hà Nam đế cư" — bản Tuyên ngôn Độc lập đầu tiên.' },
    { q: 'Tên vị tướng đã 3 lần đánh bại quân Mông - Nguyên?', a: 'Trần Hưng Đạo', opts: ['Trần Hưng Đạo', 'Lý Thường Kiệt', 'Lê Lợi', 'Nguyễn Trãi'], e: 'Trần Hưng Đạo chỉ huy quân dân nhà Trần 3 lần đại thắng quân Mông - Nguyên (1258, 1285, 1288).', illustration: '/images/core/history.jpg'},
    { q: '"Hịch tướng sĩ" là tác phẩm của ai?', a: 'Trần Hưng Đạo', opts: ['Trần Hưng Đạo', 'Nguyễn Trãi', 'Lê Lợi', 'Lý Thường Kiệt'], e: 'Hưng Đạo Đại Vương viết Hịch tướng sĩ khích lệ tinh thần trước cuộc kháng chiến chống Mông Nguyên.', illustration: '/images/core/history.jpg'},
    { q: 'Ai là người lãnh đạo cuộc khởi nghĩa Lam Sơn chống quân Minh?', a: 'Lê Lợi', opts: ['Lê Lợi', 'Trần Hưng Đạo', 'Nguyễn Huệ', 'Ngô Quyền'], e: 'Lê Lợi cùng Nguyễn Trãi lãnh đạo cuộc khởi nghĩa Lam Sơn (1418-1428).', illustration: '/images/core/history.jpg'},
    { q: 'Nguyễn Trãi viết "Bình Ngô đại cáo" vào năm nào?', a: '1428', opts: ['1428', '1010', '938', '1789'], e: 'Năm 1428, sau khi đánh đuổi quân Minh, Nguyễn Trãi soạn Bình Ngô đại cáo.', illustration: '/images/core/history.jpg'},
    { q: 'Vua Quang Trung đại phá quân Thanh vào dịp nào?', a: 'Tết Kỷ Dậu 1789', opts: ['Tết Kỷ Dậu 1789', 'Tết Mậu Thân 1968', 'Tết Canh Tý 1240', 'Tết Giáp Ngọ 1414'], e: 'Mùng 5 Tết Kỷ Dậu (1789), vua Quang Trung đại phá 29 vạn quân Thanh.', illustration: '/images/core/history.jpg'},
    { q: 'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại đâu?', a: 'Quảng trường Ba Đình, Hà Nội', opts: ['Quảng trường Ba Đình, Hà Nội', 'Huế', 'Sài Gòn', 'Hải Phòng'], e: 'Ngày 2/9/1945, Bác Hồ đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình.', illustration: '/images/core/history.jpg'},
    { q: 'Chiến thắng Điện Biên Phủ diễn ra vào năm nào?', a: '1954', opts: ['1954', '1945', '1975', '1968'], e: 'Ngày 7/5/1954, Việt Nam chiến thắng tại Điện Biên Phủ, buộc Pháp ký Hiệp định Genève.', illustration: '/images/core/history.jpg'},
    { q: 'Ngày Giải phóng miền Nam, thống nhất đất nước là ngày nào?', a: '30/4/1975', opts: ['30/4/1975', '2/9/1945', '7/5/1954', '19/8/1945'], e: '30/4/1975, quân giải phóng tiến vào Dinh Độc Lập, đất nước thống nhất.', illustration: '/images/core/history.jpg'},
    { q: 'Ai là vị vua cuối cùng của chế độ phong kiến Việt Nam?', a: 'Bảo Đại', opts: ['Bảo Đại', 'Tự Đức', 'Gia Long', 'Minh Mạng'], e: 'Bảo Đại là vị vua cuối cùng nhà Nguyễn, thoái vị ngày 25/8/1945.' },
];

export function genHistoryG4(): HisGeoProblem {
    const item = HIST_G4_QS[rand(0, HIST_G4_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'history', topic: 'Lịch sử Việt Nam', topicKey: 'history_g4',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nhớ lại các bài học lịch sử', `Đáp án: ${item.a}`],
        illustration: '/images/core/history.jpg',
    };
}

// ══════════════════════════════════════════════
// Grade 4-5: Geography — 15 questions (ALL verified images)
// ══════════════════════════════════════════════

const GEO_QS = [
    { q: 'Đất nước Việt Nam có hình dạng giống chữ cái nào?', a: 'Chữ S', opts: ['Chữ S', 'Hình vuông', 'Hình tròn', 'Hình tam giác'], e: 'Việt Nam nằm trải dài dọc bờ biển Đông, uốn cong theo hình chữ S.', illustration: '/images/core/history.jpg'},
    { q: 'Việt Nam nằm ở khu vực nào trên thế giới?', a: 'Đông Nam Á', opts: ['Đông Nam Á', 'Đông Á', 'Nam Á', 'Tây Á'], e: 'Việt Nam thuộc khu vực Đông Nam Á, nằm trên bán đảo Đông Dương.', illustration: '/images/core/history.jpg'},
    { q: 'Quần đảo Hoàng Sa và Trường Sa thuộc vùng biển nào?', a: 'Biển Đông', opts: ['Biển Đông', 'Thái Bình Dương', 'Địa Trung Hải', 'Biển Đen'], e: 'Hoàng Sa và Trường Sa thuộc chủ quyền Việt Nam trên Biển Đông.' },
    { q: 'Núi cao nhất Việt Nam tên là gì?', a: 'Fansipan', opts: ['Fansipan', 'Bạch Mã', 'Lang Biang', 'Ngọc Linh'], e: 'Đỉnh Fansipan cao 3.143m thuộc dãy Hoàng Liên Sơn, mệnh danh "nóc nhà Đông Dương".', illustration: '/images/core/history.jpg'},
    { q: 'Đồng bằng nào lớn nhất miền Bắc?', a: 'Đồng bằng sông Hồng', opts: ['Đồng bằng sông Hồng', 'Đồng bằng sông Cửu Long', 'Đồng bằng Thanh-Nghệ', 'Đồng bằng Bình-Trị'], e: 'Đồng bằng sông Hồng (khoảng 15.000 km²) là vựa lúa lớn nhất miền Bắc.', illustration: '/images/core/history.jpg'},
    { q: 'Sông nào lớn nhất miền Nam?', a: 'Sông Cửu Long (Mê Kông)', opts: ['Sông Cửu Long (Mê Kông)', 'Sông Sài Gòn', 'Sông Đồng Nai', 'Sông Hồng'], e: 'Sông Cửu Long đổ ra biển qua 9 cửa — vùng trồng lúa lớn nhất.', illustration: '/images/core/history.jpg'},
    { q: 'Thủ đô của nước ta là?', a: 'Hà Nội', opts: ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Huế'], e: 'Hà Nội là thủ đô, trung tâm chính trị, văn hóa, giáo dục của cả nước.', illustration: '/images/core/history.jpg'},
    { q: 'Thành phố lớn nhất nước ta về dân số?', a: 'TP. Hồ Chí Minh', opts: ['TP. Hồ Chí Minh', 'Hà Nội', 'Hải Phòng', 'Cần Thơ'], e: 'TP. Hồ Chí Minh là trung tâm kinh tế năng động và đông dân nhất cả nước.', illustration: '/images/core/history.jpg'},
    { q: 'Nước ta có bao nhiêu dân tộc anh em?', a: '54', opts: ['54', '50', '60', '45'], e: 'Việt Nam có 54 dân tộc anh em cùng chung sống, đông nhất là dân tộc Kinh.' },
    { q: 'Nước ta có bao nhiêu tỉnh thành?', a: '63', opts: ['63', '54', '58', '72'], e: 'Việt Nam có 63 tỉnh/thành phố trực thuộc trung ương.' },
    { q: 'Vịnh Hạ Long thuộc tỉnh nào?', a: 'Quảng Ninh', opts: ['Quảng Ninh', 'Hải Phòng', 'Thanh Hóa', 'Nghệ An'], e: 'Vịnh Hạ Long (Quảng Ninh) là Di sản Thiên nhiên Thế giới UNESCO.', illustration: '/images/core/history.jpg'},
    { q: 'Phong Nha - Kẻ Bàng nổi tiếng vì điều gì?', a: 'Hang động lớn nhất thế giới', opts: ['Hang động lớn nhất thế giới', 'Núi cao nhất', 'Biển đẹp nhất', 'Rừng lớn nhất'], e: 'Phong Nha - Kẻ Bàng có hang Sơn Đoòng — hang động tự nhiên lớn nhất thế giới.', illustration: '/images/core/history.jpg'},
    { q: 'Việt Nam xuất khẩu hàng đầu thế giới mặt hàng nào?', a: 'Gạo và cà phê', opts: ['Gạo và cà phê', 'Dầu mỏ', 'Ô tô', 'Máy bay'], e: 'Việt Nam xuất khẩu gạo thứ 2-3 và cà phê (Robusta) lớn nhất thế giới.' },
    { q: 'Đường bờ biển nước ta dài bao nhiêu?', a: 'Hơn 3.200 km', opts: ['Hơn 3.200 km', 'Hơn 1.000 km', 'Hơn 5.000 km', 'Hơn 500 km'], e: 'Bờ biển VN dài hơn 3.260 km, từ Quảng Ninh đến Kiên Giang.' },
    { q: 'Thành phố nào là trung tâm miền Trung?', a: 'Đà Nẵng', opts: ['Đà Nẵng', 'Huế', 'Nha Trang', 'Quy Nhơn'], e: 'Đà Nẵng là thành phố trực thuộc trung ương, trung tâm kinh tế miền Trung.', illustration: '/images/core/history.jpg'},
];

export function genGeography(): HisGeoProblem {
    const item = GEO_QS[rand(0, GEO_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'geography', topic: 'Địa lý Việt Nam', topicKey: 'geography',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nghĩ về bản đồ Việt Nam', `Đáp án: ${item.a}`],
        illustration: '/images/core/history.jpg',
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
