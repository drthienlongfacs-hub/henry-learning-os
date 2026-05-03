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
    illustration?: string;
}

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const genId = () => `hg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// ══════════════════════════════════════════════
// VERIFIED IMAGE BANK (Wikipedia REST API → upload.wikimedia.org)
// ══════════════════════════════════════════════
const IMG = {
    dong_son: '/images/history-geo/Tambour-song-da2.jpg',
    trung_sisters: '/images/history-geo/Hai_B__Tr_ng__tranh___ng_H__.jpeg',
    ngo_quyen: '/images/history-geo/T__ng_Ng__Quy_n.jpg',
    ly_thai_to: '/images/history-geo/T__ng_L__Th_i_T__2.jpg',
    tran_hung_dao: '/images/history-geo/tran_hung_dao.jpg',
    le_loi: '/images/history-geo/Le_Loi_statue.JPG',
    quang_trung: '/images/history-geo/Quang_Trung_statue_02.jpg',
    ho_chi_minh: '/images/history-geo/Ho_Chi_Minh_-_1946_Portrait__cropped_.jpg',
    dien_bien_phu: '/images/history-geo/Victory_in_Battle_of_Dien_Bien_Phu.jpg',
    independence_palace: '/images/history-geo/20190923_Independence_Palace-10.jpg',
    co_loa: '/images/history-geo/Lichsuhanoimoi.png',
    // Geography
    vietnam_map: '/images/history-geo/Flag_of_Vietnam.svg.png',
    southeast_asia: '/images/history-geo/Southeast_Asia__orthographic_projection_.svg.png',
    fansipan: '/images/history-geo/Fansipan_Summit.jpg',
    red_river: '/images/history-geo/Red_River_Delta_in_Vietnam.svg.png',
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
    { q: 'Nhà nước đầu tiên của nước ta tên là gì?', a: 'Văn Lang', opts: ['Văn Lang', 'Âu Lạc', 'Đại Việt', 'Đại Ngu'], e: 'Nhà nước Văn Lang do các vua Hùng lập ra, là nhà nước đầu tiên của người Việt.', illustration: '/images/core/history.svg'},
    { q: 'Người đứng đầu nhà nước Văn Lang gọi là gì?', a: 'Hùng Vương', opts: ['Hùng Vương', 'An Dương Vương', 'Lạc Hầu', 'Lạc Tướng'], e: 'Đứng đầu nhà nước Văn Lang là Hùng Vương, truyền được 18 đời.', illustration: '/images/core/history.svg'},
    { q: 'Cổ Loa là kinh đô của triều đại nào?', a: 'Âu Lạc', opts: ['Âu Lạc', 'Văn Lang', 'Đại Cồ Việt', 'Đại Việt'], e: 'An Dương Vương lập ra nước Âu Lạc, đóng đô ở Cổ Loa (Đông Anh, Hà Nội nay).', illustration: '/images/core/history.svg'},
    { q: 'Trống đồng Đông Sơn là biểu tượng của nền văn hóa nào?', a: 'Văn hóa Đông Sơn', opts: ['Văn hóa Đông Sơn', 'Văn hóa Sa Huỳnh', 'Văn hóa Óc Eo', 'Văn hóa Hòa Bình'], e: 'Trống đồng Đông Sơn là hiện vật tiêu biểu nhất của văn hóa Đông Sơn (khoảng 700 TCN - TK I).', illustration: '/images/core/history.svg'},
    { q: 'Cuộc khởi nghĩa Hai Bà Trưng nổ ra vào năm nào?', a: 'Năm 40', opts: ['Năm 40', 'Năm 248', 'Năm 938', 'Năm 981'], e: 'Mùa xuân năm 40, Hai Bà Trưng phất cờ khởi nghĩa ở Mê Linh.', illustration: '/images/core/history.svg'},
    { q: 'Bà Triệu (Triệu Thị Trinh) khởi nghĩa năm nào?', a: 'Năm 248', opts: ['Năm 248', 'Năm 40', 'Năm 542', 'Năm 938'], e: 'Năm 248, Bà Triệu dấy binh chống quân Đông Ngô, nổi tiếng với câu nói: "Tôi muốn cưỡi cơn gió mạnh...".', illustration: '/images/core/history.svg'},
    { q: 'Ai là người lãnh đạo cuộc khởi nghĩa năm 542 lập ra nước Vạn Xuân?', a: 'Lý Bí (Lý Nam Đế)', opts: ['Lý Bí (Lý Nam Đế)', 'Ngô Quyền', 'Lê Lợi', 'Phùng Hưng'], e: 'Lý Bí khởi nghĩa thành công năm 544, tự xưng là Lý Nam Đế, đặt tên nước là Vạn Xuân.' },
    { q: 'Ai là người đánh tan quân Nam Hán trên sông Bạch Đằng năm 938?', a: 'Ngô Quyền', opts: ['Ngô Quyền', 'Lý Thường Kiệt', 'Trần Hưng Đạo', 'Lê Lợi'], e: 'Năm 938, Ngô Quyền dùng cọc gỗ cắm dưới sông Bạch Đằng, chấm dứt hơn 1000 năm Bắc thuộc.', illustration: '/images/core/history.svg'},
    { q: 'Ai là người dời đô từ Hoa Lư về Thăng Long?', a: 'Lý Thái Tổ (Lý Công Uẩn)', opts: ['Lý Thái Tổ (Lý Công Uẩn)', 'Đinh Tiên Hoàng', 'Lê Hoàn', 'Trần Thái Tông'], e: 'Năm 1010, vua Lý Thái Tổ dời đô từ Hoa Lư ra Đại La, đổi tên là Thăng Long.', illustration: '/images/core/history.svg'},
    { q: 'Vua Đinh Tiên Hoàng đặt quốc hiệu là gì?', a: 'Đại Cồ Việt', opts: ['Đại Cồ Việt', 'Đại Việt', 'Văn Lang', 'Vạn Xuân'], e: 'Năm 968, Đinh Bộ Lĩnh dẹp loạn 12 sứ quân, đặt quốc hiệu Đại Cồ Việt.' },
    { q: 'Lý Thường Kiệt nổi tiếng với bài thơ "Nam Quốc Sơn Hà" chống quân nước nào?', a: 'Quân Tống', opts: ['Quân Tống', 'Quân Nguyên', 'Quân Minh', 'Quân Thanh'], e: '"Nam quốc sơn hà Nam đế cư" — bản Tuyên ngôn Độc lập đầu tiên.' },
    { q: 'Tên vị tướng đã 3 lần đánh bại quân Mông - Nguyên?', a: 'Trần Hưng Đạo', opts: ['Trần Hưng Đạo', 'Lý Thường Kiệt', 'Lê Lợi', 'Nguyễn Trãi'], e: 'Trần Hưng Đạo chỉ huy quân dân nhà Trần 3 lần đại thắng quân Mông - Nguyên (1258, 1285, 1288).', illustration: '/images/core/history.svg'},
    { q: '"Hịch tướng sĩ" là tác phẩm của ai?', a: 'Trần Hưng Đạo', opts: ['Trần Hưng Đạo', 'Nguyễn Trãi', 'Lê Lợi', 'Lý Thường Kiệt'], e: 'Hưng Đạo Đại Vương viết Hịch tướng sĩ khích lệ tinh thần trước cuộc kháng chiến chống Mông Nguyên.', illustration: '/images/core/history.svg'},
    { q: 'Ai là người lãnh đạo cuộc khởi nghĩa Lam Sơn chống quân Minh?', a: 'Lê Lợi', opts: ['Lê Lợi', 'Trần Hưng Đạo', 'Nguyễn Huệ', 'Ngô Quyền'], e: 'Lê Lợi cùng Nguyễn Trãi lãnh đạo cuộc khởi nghĩa Lam Sơn (1418-1428).', illustration: '/images/core/history.svg'},
    { q: 'Nguyễn Trãi viết "Bình Ngô đại cáo" vào năm nào?', a: '1428', opts: ['1428', '1010', '938', '1789'], e: 'Năm 1428, sau khi đánh đuổi quân Minh, Nguyễn Trãi soạn Bình Ngô đại cáo.', illustration: '/images/core/history.svg'},
    { q: 'Vua Quang Trung đại phá quân Thanh vào dịp nào?', a: 'Tết Kỷ Dậu 1789', opts: ['Tết Kỷ Dậu 1789', 'Tết Mậu Thân 1968', 'Tết Canh Tý 1240', 'Tết Giáp Ngọ 1414'], e: 'Mùng 5 Tết Kỷ Dậu (1789), vua Quang Trung đại phá 29 vạn quân Thanh.', illustration: '/images/core/history.svg'},
    { q: 'Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại đâu?', a: 'Quảng trường Ba Đình, Hà Nội', opts: ['Quảng trường Ba Đình, Hà Nội', 'Huế', 'Sài Gòn', 'Hải Phòng'], e: 'Ngày 2/9/1945, Bác Hồ đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình.', illustration: '/images/core/history.svg'},
    { q: 'Chiến thắng Điện Biên Phủ diễn ra vào năm nào?', a: '1954', opts: ['1954', '1945', '1975', '1968'], e: 'Ngày 7/5/1954, Việt Nam chiến thắng tại Điện Biên Phủ, buộc Pháp ký Hiệp định Genève.', illustration: '/images/core/history.svg'},
    { q: 'Ngày Giải phóng miền Nam, thống nhất đất nước là ngày nào?', a: '30/4/1975', opts: ['30/4/1975', '2/9/1945', '7/5/1954', '19/8/1945'], e: '30/4/1975, quân giải phóng tiến vào Dinh Độc Lập, đất nước thống nhất.', illustration: '/images/core/history.svg'},
    { q: 'Ai là vị vua cuối cùng của chế độ phong kiến Việt Nam?', a: 'Bảo Đại', opts: ['Bảo Đại', 'Tự Đức', 'Gia Long', 'Minh Mạng'], e: 'Bảo Đại là vị vua cuối cùng nhà Nguyễn, thoái vị ngày 25/8/1945.' },
];

export function genHistoryG4(): HisGeoProblem {
    const item = HIST_G4_QS[rand(0, HIST_G4_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'history', topic: 'Lịch sử Việt Nam', topicKey: 'history_g4',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nhớ lại các bài học lịch sử', `Đáp án: ${item.a}`],
        illustration: item.illustration ?? IMG.dong_son,
    };
}

// ══════════════════════════════════════════════
// Grade 4-5: Geography — 15 questions (ALL verified images)
// ══════════════════════════════════════════════

const GEO_QS = [
    { q: 'Đất nước Việt Nam có hình dạng giống chữ cái nào?', a: 'Chữ S', opts: ['Chữ S', 'Hình vuông', 'Hình tròn', 'Hình tam giác'], e: 'Việt Nam nằm trải dài dọc bờ biển Đông, uốn cong theo hình chữ S.', illustration: '/images/core/history.svg'},
    { q: 'Việt Nam nằm ở khu vực nào trên thế giới?', a: 'Đông Nam Á', opts: ['Đông Nam Á', 'Đông Á', 'Nam Á', 'Tây Á'], e: 'Việt Nam thuộc khu vực Đông Nam Á, nằm trên bán đảo Đông Dương.', illustration: '/images/core/history.svg'},
    { q: 'Quần đảo Hoàng Sa và Trường Sa thuộc vùng biển nào?', a: 'Biển Đông', opts: ['Biển Đông', 'Thái Bình Dương', 'Địa Trung Hải', 'Biển Đen'], e: 'Hoàng Sa và Trường Sa thuộc chủ quyền Việt Nam trên Biển Đông.' },
    { q: 'Núi cao nhất Việt Nam tên là gì?', a: 'Fansipan', opts: ['Fansipan', 'Bạch Mã', 'Lang Biang', 'Ngọc Linh'], e: 'Đỉnh Fansipan cao 3.143m thuộc dãy Hoàng Liên Sơn, mệnh danh "nóc nhà Đông Dương".', illustration: '/images/core/history.svg'},
    { q: 'Đồng bằng nào lớn nhất miền Bắc?', a: 'Đồng bằng sông Hồng', opts: ['Đồng bằng sông Hồng', 'Đồng bằng sông Cửu Long', 'Đồng bằng Thanh-Nghệ', 'Đồng bằng Bình-Trị'], e: 'Đồng bằng sông Hồng (khoảng 15.000 km²) là vựa lúa lớn nhất miền Bắc.', illustration: '/images/core/history.svg'},
    { q: 'Sông nào lớn nhất miền Nam?', a: 'Sông Cửu Long (Mê Kông)', opts: ['Sông Cửu Long (Mê Kông)', 'Sông Sài Gòn', 'Sông Đồng Nai', 'Sông Hồng'], e: 'Sông Cửu Long đổ ra biển qua 9 cửa — vùng trồng lúa lớn nhất.', illustration: '/images/core/history.svg'},
    { q: 'Thủ đô của nước ta là?', a: 'Hà Nội', opts: ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Huế'], e: 'Hà Nội là thủ đô, trung tâm chính trị, văn hóa, giáo dục của cả nước.', illustration: '/images/core/history.svg'},
    { q: 'Thành phố lớn nhất nước ta về dân số?', a: 'TP. Hồ Chí Minh', opts: ['TP. Hồ Chí Minh', 'Hà Nội', 'Hải Phòng', 'Cần Thơ'], e: 'TP. Hồ Chí Minh là trung tâm kinh tế năng động và đông dân nhất cả nước.', illustration: '/images/core/history.svg'},
    { q: 'Nước ta có bao nhiêu dân tộc anh em?', a: '54', opts: ['54', '50', '60', '45'], e: 'Việt Nam có 54 dân tộc anh em cùng chung sống, đông nhất là dân tộc Kinh.' },
    { q: 'Nước ta có bao nhiêu tỉnh thành?', a: '63', opts: ['63', '54', '58', '72'], e: 'Việt Nam có 63 tỉnh/thành phố trực thuộc trung ương.' },
    { q: 'Vịnh Hạ Long thuộc tỉnh nào?', a: 'Quảng Ninh', opts: ['Quảng Ninh', 'Hải Phòng', 'Thanh Hóa', 'Nghệ An'], e: 'Vịnh Hạ Long (Quảng Ninh) là Di sản Thiên nhiên Thế giới UNESCO.', illustration: '/images/core/history.svg'},
    { q: 'Phong Nha - Kẻ Bàng nổi tiếng vì điều gì?', a: 'Hang động lớn nhất thế giới', opts: ['Hang động lớn nhất thế giới', 'Núi cao nhất', 'Biển đẹp nhất', 'Rừng lớn nhất'], e: 'Phong Nha - Kẻ Bàng có hang Sơn Đoòng — hang động tự nhiên lớn nhất thế giới.', illustration: '/images/core/history.svg'},
    { q: 'Việt Nam xuất khẩu hàng đầu thế giới mặt hàng nào?', a: 'Gạo và cà phê', opts: ['Gạo và cà phê', 'Dầu mỏ', 'Ô tô', 'Máy bay'], e: 'Việt Nam xuất khẩu gạo thứ 2-3 và cà phê (Robusta) lớn nhất thế giới.' },
    { q: 'Đường bờ biển nước ta dài bao nhiêu?', a: 'Hơn 3.200 km', opts: ['Hơn 3.200 km', 'Hơn 1.000 km', 'Hơn 5.000 km', 'Hơn 500 km'], e: 'Bờ biển VN dài hơn 3.260 km, từ Quảng Ninh đến Kiên Giang.' },
    { q: 'Thành phố nào là trung tâm miền Trung?', a: 'Đà Nẵng', opts: ['Đà Nẵng', 'Huế', 'Nha Trang', 'Quy Nhơn'], e: 'Đà Nẵng là thành phố trực thuộc trung ương, trung tâm kinh tế miền Trung.', illustration: '/images/core/history.svg'},
];

export function genGeography(): HisGeoProblem {
    const item = GEO_QS[rand(0, GEO_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'geography', topic: 'Địa lý Việt Nam', topicKey: 'geography',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nghĩ về bản đồ Việt Nam', `Đáp án: ${item.a}`],
        illustration: item.illustration ?? IMG.vietnam_map,
    };
}

// ── BATCH 10: Địa lý tự nhiên VN (G4) ──
const DIA_LY_G4_QS = [
    { q: 'Dãy núi nào là "xương sống" của Bắc Bộ?', a: 'Hoàng Liên Sơn', opts: ['Hoàng Liên Sơn', 'Trường Sơn', 'Bạch Mã', 'Ngọc Linh'], e: 'Dãy Hoàng Liên Sơn ở Tây Bắc, có đỉnh Fansipan cao nhất Đông Dương.' },
    { q: 'Sông Hồng bắt nguồn từ đâu?', a: 'Trung Quốc (Vân Nam)', opts: ['Trung Quốc (Vân Nam)', 'Lào', 'Campuchia', 'Myanmar'], e: 'Sông Hồng (Hồng Hà) bắt nguồn từ tỉnh Vân Nam, Trung Quốc, dài 1.149 km.' },
    { q: 'Dãy Trường Sơn chạy theo hướng nào?', a: 'Bắc - Nam', opts: ['Bắc - Nam', 'Đông - Tây', 'Tây Bắc - Đông Nam', 'Bắc - Đông'], e: 'Trường Sơn chạy dọc theo hướng Bắc - Nam, là ranh giới VN và Lào.' },
    { q: 'Nước ta có mấy vùng khí hậu chính?', a: '2 vùng: miền Bắc 4 mùa, miền Nam 2 mùa', opts: ['2 vùng: miền Bắc 4 mùa, miền Nam 2 mùa', '1 vùng', '3 vùng', '5 vùng'], e: 'Miền Bắc: 4 mùa (xuân, hạ, thu, đông). Miền Nam: 2 mùa (mưa, khô).' },
    { q: 'Tây Nguyên nổi tiếng trồng cây gì?', a: 'Cà phê, cao su, hồ tiêu', opts: ['Cà phê, cao su, hồ tiêu', 'Lúa nước', 'Mía đường', 'Chè'], e: 'Tây Nguyên là vùng trồng cà phê, cao su, hồ tiêu lớn nhất cả nước.' },
];

export function genDiaLyG4(): HisGeoProblem {
    const item = DIA_LY_G4_QS[rand(0, DIA_LY_G4_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'geography', topic: 'Địa lý tự nhiên VN', topicKey: 'dia_ly_g4',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nhớ bản đồ VN: 3 miền, 3 dải đất', `Đáp án: ${item.a}`],
        illustration: '/images/core/history.svg',
    };
}

// ── BATCH 10: Lịch sử Việt Nam hiện đại (G5) ──
const HIST_G5_QS = [
    { q: 'Phong trào Cần Vương chống Pháp do ai phát động?', a: 'Vua Hàm Nghi', opts: ['Vua Hàm Nghi', 'Phan Đình Phùng', 'Phan Bội Châu', 'Nguyễn Trung Trực'], e: 'Năm 1885, vua Hàm Nghi xuống chiếu Cần Vương kêu gọi nhân dân kháng Pháp.' },
    { q: 'Đảng Cộng sản Việt Nam được thành lập năm nào?', a: '1930', opts: ['1930', '1945', '1954', '1925'], e: 'Ngày 3/2/1930, Đảng Cộng sản Việt Nam được thành lập tại Hương Cảng (Hồng Kông).' },
    { q: 'Cách mạng tháng Tám thành công vào năm nào?', a: '1945', opts: ['1945', '1954', '1930', '1975'], e: 'Tháng 8/1945, nhân dân cả nước đồng loạt khởi nghĩa giành chính quyền.' },
    { q: 'Chiến dịch Hồ Chí Minh kết thúc ngày nào?', a: '30/4/1975', opts: ['30/4/1975', '7/5/1954', '2/9/1945', '19/8/1945'], e: 'Chiến dịch HCM kết thúc thắng lợi ngày 30/4/1975, thống nhất đất nước.' },
    { q: 'Ai là người viết "Nhật ký trong tù"?', a: 'Hồ Chí Minh', opts: ['Hồ Chí Minh', 'Võ Nguyên Giáp', 'Phạm Văn Đồng', 'Nguyễn Trãi'], e: 'Bác Hồ viết Nhật ký trong tù khi bị giam ở Trung Quốc (1942-1943).' },
];

export function genHistoryG5(): HisGeoProblem {
    const item = HIST_G5_QS[rand(0, HIST_G5_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'history', topic: 'Lịch sử VN hiện đại', topicKey: 'history_g5',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nhớ các mốc lịch sử quan trọng', `Đáp án: ${item.a}`],
        illustration: '/images/core/history.svg',
    };
}

// ── BATCH 11: Nhân vật lịch sử tiêu biểu (G4) ──
const NHAN_VAT_LS = [
    { q: 'Ai được tôn là "Bà Mẹ của dân tộc" vì công cuộc khởi nghĩa năm 40?', a: 'Hai Bà Trưng', opts: ['Hai Bà Trưng', 'Bà Triệu', 'Bà Huyện Thanh Quan', 'Hồ Xuân Hương'], e: 'Hai Bà Trưng (Trưng Trắc, Trưng Nhị) khởi nghĩa chống Đông Hán năm 40.' },
    { q: 'Danh tướng nào được phong "Hưng Đạo Đại Vương"?', a: 'Trần Quốc Tuấn', opts: ['Trần Quốc Tuấn', 'Lý Thường Kiệt', 'Lê Lợi', 'Ngô Quyền'], e: 'Trần Quốc Tuấn (Trần Hưng Đạo) 3 lần đánh bại quân Mông Nguyên.' },
    { q: 'Nguyễn Trãi nổi tiếng với tác phẩm nào?', a: 'Bình Ngô đại cáo', opts: ['Bình Ngô đại cáo', 'Hịch tướng sĩ', 'Nam Quốc Sơn Hà', 'Truyện Kiều'], e: 'Bình Ngô đại cáo (1428) — bản Tuyên ngôn Độc lập thứ hai, do Nguyễn Trãi soạn.' },
    { q: 'Vua nào thống nhất đất nước lập ra nhà Nguyễn?', a: 'Gia Long', opts: ['Gia Long', 'Quang Trung', 'Lê Thánh Tông', 'Trần Thái Tông'], e: 'Gia Long (Nguyễn Ánh) thống nhất đất nước năm 1802, lập nhà Nguyễn.' },
    { q: 'Tướng Võ Nguyên Giáp nổi tiếng với chiến thắng nào?', a: 'Điện Biên Phủ 1954', opts: ['Điện Biên Phủ 1954', 'Bạch Đằng 938', 'Lam Sơn 1428', 'Đống Đa 1789'], e: 'Đại tướng Võ Nguyên Giáp chỉ huy chiến thắng Điện Biên Phủ 7/5/1954.' },
];

export function genNhanVatLS(): HisGeoProblem {
    const item = NHAN_VAT_LS[rand(0, NHAN_VAT_LS.length - 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'history', topic: 'Nhân vật lịch sử', topicKey: 'nhan_vat_ls',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nhớ các anh hùng dân tộc', `Đáp án: ${item.a}`],
        illustration: '/images/core/history.svg',
    };
}

// ── BATCH 11: Bản đồ & Phương hướng (G4) ──
const BAN_DO = [
    { q: 'Trên bản đồ, hướng Bắc thường nằm ở phía nào?', a: 'Phía trên', opts: ['Phía trên', 'Phía dưới', 'Bên trái', 'Bên phải'], e: 'Quy ước: trên = Bắc, dưới = Nam, trái = Tây, phải = Đông.' },
    { q: 'Tỉ lệ 1:100.000 nghĩa là 1cm trên bản đồ bằng bao nhiêu?', a: '1 km ngoài thực tế', opts: ['1 km ngoài thực tế', '100 m', '10 km', '100 km'], e: '1:100.000 → 1 cm = 100.000 cm = 1.000 m = 1 km.' },
    { q: 'Chú giải (legend) trên bản đồ dùng để:', a: 'Giải thích ý nghĩa các ký hiệu', opts: ['Giải thích ý nghĩa các ký hiệu', 'Chỉ đường đi', 'Đo khoảng cách', 'Trang trí'], e: 'Chú giải liệt kê ý nghĩa màu sắc, ký hiệu trên bản đồ.' },
    { q: 'La bàn dùng để xác định:', a: 'Phương hướng', opts: ['Phương hướng', 'Nhiệt độ', 'Độ cao', 'Thời gian'], e: 'Kim nam châm la bàn luôn chỉ hướng Bắc → xác định 4 phương chính.' },
    { q: 'Có bao nhiêu phương hướng chính?', a: '4: Đông, Tây, Nam, Bắc', opts: ['4: Đông, Tây, Nam, Bắc', '2', '6', '8'], e: '4 hướng chính + 4 hướng phụ (Đông Bắc, Tây Bắc, Đông Nam, Tây Nam) = 8 hướng.' },
];

export function genBanDo(): HisGeoProblem {
    const item = BAN_DO[rand(0, BAN_DO.length - 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'geography', topic: 'Bản đồ & Phương hướng', topicKey: 'ban_do',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nhớ quy ước bản đồ', `Đáp án: ${item.a}`],
        illustration: '/images/core/history.svg',
    };
}

// ── BATCH 11: Dân cư & Kinh tế VN (G5) ──
const DAN_CU_KT = [
    { q: 'Dân số Việt Nam khoảng bao nhiêu triệu? (2025)', a: 'Hơn 100 triệu', opts: ['Hơn 100 triệu', '50 triệu', '200 triệu', '30 triệu'], e: 'VN dân số hơn 100 triệu (2025), xếp thứ 15 thế giới.' },
    { q: 'Nghề nào là nghề truyền thống phổ biến nhất VN?', a: 'Nông nghiệp trồng lúa', opts: ['Nông nghiệp trồng lúa', 'Công nghệ thông tin', 'Khai khoáng', 'Du lịch'], e: 'VN là nước nông nghiệp truyền thống, lúa gạo là cây trồng chính.' },
    { q: 'Vùng nào trồng lúa nhiều nhất VN?', a: 'Đồng bằng sông Cửu Long', opts: ['Đồng bằng sông Cửu Long', 'Tây Nguyên', 'Đông Bắc', 'Tây Bắc'], e: 'ĐBSCL = vựa lúa lớn nhất, sản xuất hơn 50% lúa gạo cả nước.' },
    { q: 'Đơn vị hành chính lớn nhất là:', a: 'Tỉnh / Thành phố trực thuộc TW', opts: ['Tỉnh / Thành phố trực thuộc TW', 'Huyện', 'Xã', 'Thôn'], e: 'VN có 63 tỉnh/thành → huyện/quận → xã/phường → thôn/ấp.' },
    { q: 'Ngành kinh tế nào phát triển mạnh nhất ở TP. HCM?', a: 'Thương mại & Dịch vụ', opts: ['Thương mại & Dịch vụ', 'Nông nghiệp', 'Lâm nghiệp', 'Ngư nghiệp'], e: 'TP.HCM là trung tâm kinh tế, thương mại dịch vụ lớn nhất cả nước.' },
];

export function genDanCuKT(): HisGeoProblem {
    const item = DAN_CU_KT[rand(0, DAN_CU_KT.length - 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'geography', topic: 'Dân cư & Kinh tế VN', topicKey: 'dan_cu_kt',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['VN hơn 100 triệu dân, 63 tỉnh thành', `Đáp án: ${item.a}`],
        illustration: '/images/core/history.svg',
    };
}

// ── BATCH 11: Di tích & Di sản VN (G5) ──
const DI_TICH = [
    { q: 'Cố đô nào được UNESCO công nhận Di sản Thế giới?', a: 'Huế', opts: ['Huế', 'Hà Nội', 'Hội An', 'Đà Nẵng'], e: 'Quần thể di tích Cố đô Huế — Di sản Thế giới UNESCO năm 1993.' },
    { q: 'Phố cổ Hội An thuộc tỉnh nào?', a: 'Quảng Nam', opts: ['Quảng Nam', 'Đà Nẵng', 'Thừa Thiên Huế', 'Quảng Ngãi'], e: 'Hội An (Quảng Nam) — đô thị cổ, Di sản Văn hóa Thế giới UNESCO 1999.' },
    { q: 'Thánh địa Mỹ Sơn gắn liền với nền văn hóa nào?', a: 'Chăm Pa', opts: ['Chăm Pa', 'Đại Việt', 'Óc Eo', 'Đông Sơn'], e: 'Mỹ Sơn (Quảng Nam) có tháp Chăm cổ, Di sản Thế giới UNESCO 1999.' },
    { q: 'Vịnh Hạ Long thuộc loại di sản nào?', a: 'Di sản Thiên nhiên Thế giới', opts: ['Di sản Thiên nhiên Thế giới', 'Di sản Văn hóa', 'Di sản Phi vật thể', 'Khu dự trữ sinh quyển'], e: 'Vịnh Hạ Long — Di sản Thiên nhiên Thế giới UNESCO (1994, 2000).' },
    { q: 'Nhã nhạc cung đình Huế là loại di sản gì?', a: 'Di sản Phi vật thể', opts: ['Di sản Phi vật thể', 'Di sản Thiên nhiên', 'Di tích Quốc gia', 'Danh lam thắng cảnh'], e: 'Nhã nhạc Huế — Kiệt tác Di sản Phi vật thể UNESCO 2003.' },
];

export function genDiTich(): HisGeoProblem {
    const item = DI_TICH[rand(0, DI_TICH.length - 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'geography', topic: 'Di tích & Di sản VN', topicKey: 'di_tich_di_san',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['VN có nhiều Di sản Thế giới UNESCO', `Đáp án: ${item.a}`],
        illustration: '/images/core/history.svg',
    };
}

// ── FINAL: Vùng miền VN (G4) ──
const VUNG_MIEN = [
    { q: 'Việt Nam có bao nhiêu vùng kinh tế - xã hội?', a: '6 vùng', opts: ['6 vùng', '3 vùng', '8 vùng', '10 vùng'], e: '6 vùng: Bắc Bộ, Bắc Trung Bộ, Nam Trung Bộ, Tây Nguyên, Đông Nam Bộ, Tây Nam Bộ.' },
    { q: 'Đồng bằng sông Cửu Long nổi tiếng về:', a: 'Trồng lúa, trái cây, thủy sản', opts: ['Trồng lúa, trái cây, thủy sản', 'Khai thác than', 'Sản xuất ô tô', 'Du lịch biển'], e: 'ĐBSCL là vựa lúa lớn nhất VN, xuất khẩu gạo hàng đầu thế giới.' },
    { q: 'Tây Nguyên nổi tiếng với:', a: 'Cà phê, cao su, bazan', opts: ['Cà phê, cao su, bazan', 'Lúa gạo', 'Hải sản', 'Than đá'], e: 'Tây Nguyên có đất đỏ bazan → trồng cà phê (Đắk Lắk #1 VN), cao su, tiêu.' },
    { q: 'Thành phố lớn nhất Việt Nam:', a: 'TP. Hồ Chí Minh', opts: ['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Hải Phòng'], e: 'TP.HCM (9+ triệu dân) là trung tâm kinh tế lớn nhất, trước là Sài Gòn.' },
];

export function genVungMien(): HisGeoProblem {
    const item = VUNG_MIEN[rand(0, VUNG_MIEN.length - 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'geography', topic: 'Vùng miền VN', topicKey: 'vung_mien',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['VN có 6 vùng kinh tế - xã hội', `Đáp án: ${item.a}`],
        illustration: '/images/core/history.svg',
    };
}

// ── FINAL: Châu lục & Đại dương (G5) ──
const CHAU_LUC = [
    { q: 'Trên thế giới có bao nhiêu châu lục?', a: '7 châu lục', opts: ['7 châu lục', '5 châu lục', '6 châu lục', '4 châu lục'], e: '7 châu: Á, Âu, Phi, Bắc Mỹ, Nam Mỹ, Đại Dương (Châu Úc), Nam Cực.' },
    { q: 'Việt Nam nằm ở châu lục nào?', a: 'Châu Á', opts: ['Châu Á', 'Châu Âu', 'Châu Phi', 'Châu Úc'], e: 'VN nằm ở Đông Nam Á, thuộc châu Á — châu lục lớn nhất thế giới.' },
    { q: 'Đại dương lớn nhất thế giới:', a: 'Thái Bình Dương', opts: ['Thái Bình Dương', 'Đại Tây Dương', 'Ấn Độ Dương', 'Bắc Băng Dương'], e: 'Thái Bình Dương chiếm ~1/3 diện tích Trái Đất, lớn hơn tổng đất liền.' },
    { q: 'Châu lục nào lạnh nhất, không có người sinh sống thường xuyên?', a: 'Châu Nam Cực', opts: ['Châu Nam Cực', 'Châu Á', 'Châu Âu', 'Châu Phi'], e: 'Nam Cực: -60°C trung bình, chỉ có nhà khoa học đến nghiên cứu.' },
];

export function genChauLuc(): HisGeoProblem {
    const item = CHAU_LUC[rand(0, CHAU_LUC.length - 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'geography', topic: 'Châu lục & Đại dương', topicKey: 'chau_luc',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['7 châu lục, 4 đại dương', `Đáp án: ${item.a}`],
        illustration: '/images/core/history.svg',
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
    { key: 'dia_ly_g4', name: 'Địa lý tự nhiên VN', gradeLevel: 4, generator: genDiaLyG4, icon: '🏔️' },
    { key: 'nhan_vat_ls', name: 'Nhân vật lịch sử', gradeLevel: 4, generator: genNhanVatLS, icon: '⚔️' },
    { key: 'ban_do', name: 'Bản đồ & Phương hướng', gradeLevel: 4, generator: genBanDo, icon: '🧭' },
    { key: 'vung_mien', name: 'Vùng miền VN', gradeLevel: 4, generator: genVungMien, icon: '🏞️' },
    { key: 'geography', name: 'Địa lý Việt Nam', gradeLevel: 5, generator: genGeography, icon: '🗺️' },
    { key: 'history_g5', name: 'Lịch sử VN hiện đại', gradeLevel: 5, generator: genHistoryG5, icon: '🇻🇳' },
    { key: 'dan_cu_kt', name: 'Dân cư & Kinh tế VN', gradeLevel: 5, generator: genDanCuKT, icon: '🏭' },
    { key: 'di_tich_di_san', name: 'Di tích & Di sản VN', gradeLevel: 5, generator: genDiTich, icon: '🏛️' },
    { key: 'chau_luc', name: 'Châu lục & Đại dương', gradeLevel: 5, generator: genChauLuc, icon: '🌏' },
];

export function generateHisGeoSet(grade: number, topicKey?: string, count: number = 10): HisGeoProblem[] {
    const topics = HISGEO_TOPICS.filter(t => t.gradeLevel <= grade && (!topicKey || t.key === topicKey));
    if (topics.length === 0) return [];
    return Array.from({ length: count }, () => {
        const t = topics[rand(0, topics.length - 1)];
        return t.generator();
    });
}
