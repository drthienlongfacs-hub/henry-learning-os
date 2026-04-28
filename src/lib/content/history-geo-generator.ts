// =====================================================
// History & Geography Generator — CT 2018 Lịch sử & Địa lý (L4-5)
// Sources: CT 2018 Lịch sử & Địa lý tiểu học, SGK Cánh Diều / Kết nối tri thức
// Expanded: 20+ History, 15+ Geography questions with 100% Wikimedia illustrations
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
// Grade 4: History — Expanded (20 questions)
// ══════════════════════════════════════════════

const HIST_G4_QS = [
    // Thời kỳ dựng nước
    { q: 'Nhà nước đầu tiên của nước ta tên là gì?', a: 'Văn Lang', opts: ['Văn Lang', 'Âu Lạc', 'Đại Việt', 'Đại Ngu'], e: 'Nhà nước Văn Lang do các vua Hùng lập ra, là nhà nước đầu tiên của người Việt.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dong_Son_bronze_drum_2.jpg?width=800' },
    { q: 'Người đứng đầu nhà nước Văn Lang gọi là gì?', a: 'Hùng Vương', opts: ['Hùng Vương', 'An Dương Vương', 'Lạc Hầu', 'Lạc Tướng'], e: 'Đứng đầu nhà nước Văn Lang là Hùng Vương, truyền được 18 đời.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hung_Temple_Festival_in_Phu_Tho.jpg?width=800' },
    { q: 'Cổ Loa là kinh đô của triều đại nào?', a: 'Âu Lạc', opts: ['Âu Lạc', 'Văn Lang', 'Đại Cồ Việt', 'Đại Việt'], e: 'An Dương Vương lập ra nước Âu Lạc, đóng đô ở Cổ Loa (Đông Anh, Hà Nội nay).', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Matbangcoloa.jpg?width=800' },
    { q: 'Trống đồng Đông Sơn là biểu tượng của nền văn hóa nào?', a: 'Văn hóa Đông Sơn', opts: ['Văn hóa Đông Sơn', 'Văn hóa Sa Huỳnh', 'Văn hóa Óc Eo', 'Văn hóa Hòa Bình'], e: 'Trống đồng Đông Sơn là hiện vật tiêu biểu nhất của văn hóa Đông Sơn (khoảng 700 TCN - TK I).', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dong_Son_drum.jpg?width=800' },

    // Thời kỳ chống Bắc thuộc
    { q: 'Cuộc khởi nghĩa Hai Bà Trưng nổ ra vào năm nào?', a: 'Năm 40', opts: ['Năm 40', 'Năm 248', 'Năm 938', 'Năm 981'], e: 'Mùa xuân năm 40, Hai Bà Trưng (Trưng Trắc, Trưng Nhị) phất cờ khởi nghĩa ở Mê Linh.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dong_Ho_painting_-_Hai_Ba_Trung.jpg?width=800' },
    { q: 'Bà Triệu (Triệu Thị Trinh) khởi nghĩa năm nào?', a: 'Năm 248', opts: ['Năm 248', 'Năm 40', 'Năm 542', 'Năm 938'], e: 'Năm 248, Bà Triệu dấy binh chống quân Đông Ngô, nổi tiếng với câu nói: "Tôi muốn cưỡi cơn gió mạnh...".', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lady_Trieu_statue.jpg?width=800' },
    { q: 'Ai là người lãnh đạo cuộc khởi nghĩa năm 542 lập ra nước Vạn Xuân?', a: 'Lý Bí (Lý Nam Đế)', opts: ['Lý Bí (Lý Nam Đế)', 'Ngô Quyền', 'Lê Lợi', 'Phùng Hưng'], e: 'Lý Bí khởi nghĩa thành công năm 544, tự xưng là Lý Nam Đế, đặt tên nước là Vạn Xuân.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ly_Nam_De_statue.jpg?width=800' },

    // Chiến thắng Bạch Đằng
    { q: 'Ai là người lãnh đạo nhân dân đánh tan quân Nam Hán trên sông Bạch Đằng năm 938?', a: 'Ngô Quyền', opts: ['Ngô Quyền', 'Lý Thường Kiệt', 'Trần Hưng Đạo', 'Lê Lợi'], e: 'Năm 938, Ngô Quyền dùng cọc gỗ cắm dưới sông Bạch Đằng, đánh tan quân Nam Hán, chấm dứt hơn 1000 năm Bắc thuộc.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bach_Dang_river.jpg?width=800' },

    // Các triều đại phong kiến
    { q: 'Ai là người dời đô từ Hoa Lư về Thăng Long (Hà Nội)?', a: 'Lý Thái Tổ (Lý Công Uẩn)', opts: ['Lý Thái Tổ (Lý Công Uẩn)', 'Đinh Tiên Hoàng', 'Lê Hoàn', 'Trần Thái Tông'], e: 'Năm 1010, vua Lý Thái Tổ quyết định dời đô từ Hoa Lư ra Đại La, đổi tên là Thăng Long (rồng bay lên).', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Khu%C3%B4n_vi%C3%AAn_t%C6%B0%E1%BB%A3ng_%C4%91%C3%A0i_L%C3%BD_Th%C3%A1i_T%E1%BB%95_-_H%C3%A0_N%E1%BB%99i_2.jpg?width=800' },
    { q: 'Vua Đinh Tiên Hoàng thống nhất đất nước và đặt quốc hiệu là gì?', a: 'Đại Cồ Việt', opts: ['Đại Cồ Việt', 'Đại Việt', 'Văn Lang', 'Vạn Xuân'], e: 'Năm 968, Đinh Bộ Lĩnh dẹp loạn 12 sứ quân, thống nhất đất nước, đặt quốc hiệu Đại Cồ Việt.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hoa_Lu_Ancient_Capital.jpg?width=800' },
    { q: 'Lý Thường Kiệt nổi tiếng với bài thơ "Nam Quốc Sơn Hà" chống quân nước nào?', a: 'Quân Tống', opts: ['Quân Tống', 'Quân Nguyên', 'Quân Minh', 'Quân Thanh'], e: '"Nam quốc sơn hà Nam đế cư" — bài thơ được coi là bản Tuyên ngôn Độc lập đầu tiên.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ly_Thuong_Kiet_statue.jpg?width=800' },

    // Nhà Trần
    { q: 'Tên vị tướng đã 3 lần đánh bại quân Mông - Nguyên?', a: 'Trần Hưng Đạo', opts: ['Trần Hưng Đạo', 'Lý Thường Kiệt', 'Lê Lợi', 'Nguyễn Trãi'], e: 'Trần Hưng Đạo (Trần Quốc Tuấn) chỉ huy quân dân nhà Trần 3 lần đại thắng quân Mông - Nguyên (1258, 1285, 1288).', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Statue_of_Tran_Hung_Dao,_Bach_Dang_wharf,_Ho_Chi_Minh_City.jpg?width=800' },
    { q: '"Hịch tướng sĩ" là tác phẩm của ai?', a: 'Trần Hưng Đạo', opts: ['Trần Hưng Đạo', 'Nguyễn Trãi', 'Lê Lợi', 'Lý Thường Kiệt'], e: 'Hưng Đạo Đại Vương viết Hịch tướng sĩ để khích lệ tinh thần toàn quân trước cuộc kháng chiến chống Mông Nguyên.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tran_Quoc_Tuan.jpg?width=800' },

    // Khởi nghĩa Lam Sơn
    { q: 'Ai là người lãnh đạo cuộc khởi nghĩa Lam Sơn chống quân Minh?', a: 'Lê Lợi', opts: ['Lê Lợi', 'Trần Hưng Đạo', 'Nguyễn Huệ', 'Ngô Quyền'], e: 'Lê Lợi cùng Nguyễn Trãi lãnh đạo cuộc khởi nghĩa Lam Sơn (1418-1428), đánh đuổi quân Minh.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Le_Loi_statue.jpg?width=800' },
    { q: 'Nguyễn Trãi viết "Bình Ngô đại cáo" vào năm nào?', a: '1428', opts: ['1428', '1010', '938', '1789'], e: 'Năm 1428, sau khi đánh đuổi quân Minh, Nguyễn Trãi soạn Bình Ngô đại cáo — bản Tuyên ngôn Độc lập lần 2.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Nguyen_Trai_statue.jpg?width=800' },

    // Quang Trung — Nguyễn Huệ
    { q: 'Vua Quang Trung đại phá quân Thanh vào dịp nào?', a: 'Tết Kỷ Dậu 1789', opts: ['Tết Kỷ Dậu 1789', 'Tết Mậu Thân 1968', 'Tết Canh Tý 1240', 'Tết Giáp Ngọ 1414'], e: 'Mùng 5 Tết Kỷ Dậu (1789), vua Quang Trung đại phá 29 vạn quân Thanh, giải phóng Thăng Long.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Quang_Trung_statue_in_Quy_Nhon.JPG?width=800' },

    // Thời kỳ cận đại
    { q: 'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại đâu?', a: 'Quảng trường Ba Đình, Hà Nội', opts: ['Quảng trường Ba Đình, Hà Nội', 'Huế', 'Sài Gòn', 'Hải Phòng'], e: 'Ngày 2/9/1945, Bác Hồ đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình, khai sinh nước Việt Nam Dân chủ Cộng hòa.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ho_Chi_Minh_1945.jpg?width=800' },
    { q: 'Chiến thắng Điện Biên Phủ diễn ra vào năm nào?', a: '1954', opts: ['1954', '1945', '1975', '1968'], e: 'Ngày 7/5/1954, Việt Nam chiến thắng tại Điện Biên Phủ, buộc Pháp ký Hiệp định Genève.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dien_Bien_Phu_museum.jpg?width=800' },
    { q: 'Ngày Giải phóng miền Nam, thống nhất đất nước là ngày nào?', a: '30/4/1975', opts: ['30/4/1975', '2/9/1945', '7/5/1954', '19/8/1945'], e: '30/4/1975, quân giải phóng tiến vào Dinh Độc Lập, đất nước thống nhất.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Independence_Palace_in_HCMC.JPG?width=800' },
    { q: 'Ai là vị vua cuối cùng của chế độ phong kiến Việt Nam?', a: 'Bảo Đại', opts: ['Bảo Đại', 'Tự Đức', 'Gia Long', 'Minh Mạng'], e: 'Bảo Đại (Nguyễn Phúc Vĩnh Thụy) là vị vua cuối cùng nhà Nguyễn, thoái vị ngày 25/8/1945.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Bao_Dai_1953.jpg?width=800' },
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
// Grade 4-5: Geography — Expanded (15 questions)
// ══════════════════════════════════════════════

const GEO_QS = [
    // Vị trí - lãnh thổ
    { q: 'Đất nước Việt Nam có hình dạng giống chữ cái nào?', a: 'Chữ S', opts: ['Chữ S', 'Hình vuông', 'Hình tròn', 'Hình tam giác'], e: 'Việt Nam nằm trải dài dọc bờ biển Đông, uốn cong theo hình chữ S dài khoảng 1.650km.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_in_Asia_%28-mini_map_-rivers%29.svg?width=800' },
    { q: 'Việt Nam nằm ở khu vực nào trên thế giới?', a: 'Đông Nam Á', opts: ['Đông Nam Á', 'Đông Á', 'Nam Á', 'Tây Á'], e: 'Việt Nam thuộc khu vực Đông Nam Á, nằm trên bán đảo Đông Dương.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Southeast_Asia_%28orthographic_projection%29.svg?width=800' },
    { q: 'Quần đảo Hoàng Sa và Trường Sa thuộc vùng biển nào?', a: 'Biển Đông', opts: ['Biển Đông', 'Thái Bình Dương', 'Địa Trung Hải', 'Biển Đen'], e: 'Hoàng Sa và Trường Sa là hai quần đảo lớn thuộc chủ quyền Việt Nam trên Biển Đông.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/South_China_Sea_location_map.svg?width=800' },

    // Địa hình
    { q: 'Núi cao nhất Việt Nam tên là gì?', a: 'Fansipan', opts: ['Fansipan', 'Bạch Mã', 'Lang Biang', 'Ngọc Linh'], e: 'Đỉnh Fansipan cao 3.143m thuộc dãy Hoàng Liên Sơn (Lào Cai), mệnh danh "nóc nhà Đông Dương".', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Fansipan-01.jpg?width=800' },
    { q: 'Đồng bằng nào lớn nhất miền Bắc nước ta?', a: 'Đồng bằng sông Hồng', opts: ['Đồng bằng sông Hồng', 'Đồng bằng sông Cửu Long', 'Đồng bằng Thanh-Nghệ', 'Đồng bằng Bình-Trị'], e: 'Đồng bằng sông Hồng (khoảng 15.000 km²) là vựa lúa lớn nhất miền Bắc.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Red_river_delta_Vietnam.jpg?width=800' },
    { q: 'Sông nào lớn nhất miền Nam nước ta?', a: 'Sông Cửu Long (Mê Kông)', opts: ['Sông Cửu Long (Mê Kông)', 'Sông Sài Gòn', 'Sông Đồng Nai', 'Sông Hồng'], e: 'Sông Cửu Long chảy qua 6 nước, đổ ra biển qua 9 cửa ở đồng bằng Nam Bộ — vùng trồng lúa lớn nhất.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Mekong_River_Delta.jpg?width=800' },

    // Thành phố & Dân cư
    { q: 'Thủ đô của nước ta là?', a: 'Hà Nội', opts: ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Huế'], e: 'Hà Nội là thủ đô, trung tâm chính trị, văn hóa, giáo dục của cả nước.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Hanoi_city_view_from_Lotte_Center.jpg?width=800' },
    { q: 'Thành phố lớn nhất nước ta về dân số và kinh tế?', a: 'TP. Hồ Chí Minh', opts: ['TP. Hồ Chí Minh', 'Hà Nội', 'Hải Phòng', 'Cần Thơ'], e: 'TP. Hồ Chí Minh là trung tâm kinh tế năng động và đông dân nhất cả nước (hơn 9 triệu dân).', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Ho_Chi_Minh_City_Skyline_%28Night%29.jpg?width=800' },
    { q: 'Nước ta có bao nhiêu dân tộc anh em?', a: '54', opts: ['54', '50', '60', '45'], e: 'Việt Nam có 54 dân tộc anh em cùng chung sống, đông nhất là dân tộc Kinh (86%).', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/54_d%C3%A2n_t%E1%BB%99c_anh_em.jpg?width=800' },
    { q: 'Nước ta có bao nhiêu tỉnh thành?', a: '63', opts: ['63', '54', '58', '72'], e: 'Việt Nam có 63 tỉnh/thành phố trực thuộc trung ương (58 tỉnh + 5 thành phố).', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnam_provinces_map.png?width=800' },

    // Di sản & Thiên nhiên
    { q: 'Vịnh Hạ Long thuộc tỉnh nào?', a: 'Quảng Ninh', opts: ['Quảng Ninh', 'Hải Phòng', 'Thanh Hóa', 'Nghệ An'], e: 'Vịnh Hạ Long (Quảng Ninh) là Di sản Thiên nhiên Thế giới UNESCO, nổi tiếng với hàng nghìn đảo đá vôi.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Halong_Bay_from_above.jpg?width=800' },
    { q: 'Phong Nha - Kẻ Bàng nổi tiếng vì điều gì?', a: 'Hệ thống hang động lớn nhất thế giới', opts: ['Hệ thống hang động lớn nhất thế giới', 'Núi cao nhất', 'Biển đẹp nhất', 'Rừng lớn nhất'], e: 'Phong Nha - Kẻ Bàng (Quảng Bình) có hang Sơn Đoòng — hang động tự nhiên lớn nhất thế giới.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Son_Doong_Cave_2.jpg?width=800' },

    // Kinh tế
    { q: 'Việt Nam là nước xuất khẩu hàng đầu thế giới mặt hàng nào?', a: 'Gạo và cà phê', opts: ['Gạo và cà phê', 'Dầu mỏ', 'Ô tô', 'Máy bay'], e: 'Việt Nam là nước xuất khẩu gạo thứ 2-3 và cà phê (Robusta) lớn nhất thế giới.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vietnamese_rice_terraces.jpg?width=800' },
    { q: 'Nước ta có đường bờ biển dài bao nhiêu km?', a: 'Hơn 3.200 km', opts: ['Hơn 3.200 km', 'Hơn 1.000 km', 'Hơn 5.000 km', 'Hơn 500 km'], e: 'Bờ biển Việt Nam dài hơn 3.260 km, trải dài từ Quảng Ninh (Bắc) đến Kiên Giang (Nam).', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Non_Nuoc_Beach_Da_Nang.jpg?width=800' },
    { q: 'Thành phố nào được xem là trung tâm miền Trung Việt Nam?', a: 'Đà Nẵng', opts: ['Đà Nẵng', 'Huế', 'Nha Trang', 'Quy Nhơn'], e: 'Đà Nẵng là thành phố trực thuộc trung ương, trung tâm kinh tế và du lịch lớn nhất miền Trung.', illustration: 'https://commons.wikimedia.org/wiki/Special:FilePath/Danang_Golden_Bridge.jpg?width=800' },
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
