// =====================================================
// Science Generator — CT 2018 Tự nhiên & Xã hội (L1-3) + Khoa học (L4-5)
// Sources: CT 2018, Australian Curriculum (ACARA) Science, Cambridge Primary Science
// =====================================================

export interface ScienceProblem {
    id: string;
    question: string;
    correctAnswer: string;
    options: string[];
    explanation: string;
    difficulty: number;
    hints: string[];
    type: 'body' | 'plants' | 'animals' | 'matter' | 'earth' | 'ecosystem' | 'health' | 'weather';
    gradeLevel: number;
    topic: string;
    topicKey: string;
    illustration?: string;
}

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const genId = () => `sci-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const SCIENCE_TOPIC_GRADE = {
    body_health: 1,
    nature: 2,
    weather_earth: 3,
    matter_energy: 4,
    ecosystem: 5,
} as const;
const SCIENCE_TOPIC_VISUAL = {
    body_health: '/images/science/body-health.svg',
    nature: '/images/science/Double-alaskan-rainbow.jpg',
    weather_earth: '/images/science/USGS_WaterCycle_English_ONLINE_20221013.png',
    matter_energy: '/images/science/Double-alaskan-rainbow.jpg',
    ecosystem: '/images/science/USGS_WaterCycle_English_ONLINE_20221013.png',
} as const;

// ══════════════════════════════════════════════
// Grade 1-2: Body, Hygiene, Safety
// ══════════════════════════════════════════════

const BODY_HEALTH_QS = [
    { q: 'Con người có bao nhiêu giác quan?', a: '5', opts: ['5', '3', '4', '6'], e: '5 giác quan: thị giác (mắt), thính giác (tai), khứu giác (mũi), vị giác (lưỡi), xúc giác (da).', grade: 1, illustration: '/images/core/science.svg'},
    { q: 'Để bảo vệ mắt, chúng ta nên làm gì?', a: 'Không nhìn trực tiếp vào mặt trời', opts: ['Không nhìn trực tiếp vào mặt trời', 'Nhìn màn hình cả ngày', 'Dụi mắt thường xuyên', 'Đọc sách trong bóng tối'], e: 'Ánh sáng mặt trời rất mạnh, nhìn trực tiếp gây hại cho mắt.', grade: 1, illustration: '/images/core/science.svg'},
    { q: 'Khi nào cần rửa tay?', a: 'Trước khi ăn và sau khi đi vệ sinh', opts: ['Trước khi ăn và sau khi đi vệ sinh', 'Chỉ khi tay bẩn', 'Chỉ buổi sáng', 'Không cần rửa'], e: 'Rửa tay đúng cách giúp ngăn ngừa vi khuẩn gây bệnh.', grade: 1, illustration: '/images/core/science.svg'},
    { q: 'Cơ quan nào giúp chúng ta thở?', a: 'Phổi', opts: ['Phổi', 'Tim', 'Dạ dày', 'Não'], e: 'Phổi hít không khí vào, lấy oxy và thải CO2.', grade: 2, illustration: '/images/core/science.svg'},
    { q: 'Xương có vai trò gì?', a: 'Nâng đỡ và bảo vệ cơ thể', opts: ['Nâng đỡ và bảo vệ cơ thể', 'Tiêu hóa thức ăn', 'Tạo máu', 'Điều khiển suy nghĩ'], e: 'Bộ xương nâng đỡ cơ thể và bảo vệ các cơ quan bên trong.', grade: 2, illustration: '/images/core/science.svg'},
    { q: 'Đánh răng ít nhất bao nhiêu lần mỗi ngày?', a: '2 lần', opts: ['2 lần', '1 lần', '3 lần', 'Không cần'], e: 'Đánh răng sáng và tối, mỗi lần ít nhất 2 phút.', grade: 1, illustration: '/images/core/science.svg'},
    { q: 'Thức ăn được tiêu hóa ở đâu?', a: 'Dạ dày', opts: ['Dạ dày', 'Phổi', 'Tim', 'Não'], e: 'Dạ dày chứa acid và enzym để phân hủy thức ăn.', grade: 2, illustration: '/images/core/science.svg'},
    { q: 'Khi bị thương chảy máu nhẹ, bước đầu tiên là gì?', a: 'Rửa sạch vết thương bằng nước sạch', opts: ['Rửa sạch vết thương bằng nước sạch', 'Đắp đất lên', 'Không làm gì', 'Tự liếm vết thương'], e: 'Rửa sạch vết thương ngăn vi khuẩn, sau đó dán băng cá nhân.', grade: 2, illustration: '/images/core/science.svg'},
];

export function genBodyHealth(): ScienceProblem {
    const item = BODY_HEALTH_QS[rand(0, BODY_HEALTH_QS.length - 1)];
    return {
        id: genId(), gradeLevel: SCIENCE_TOPIC_GRADE.body_health, difficulty: item.grade,
        type: 'body', topic: 'Cơ thể & Sức khỏe', topicKey: 'body_health',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nghĩ về chức năng các bộ phận cơ thể', `Đáp án: ${item.a}`],
        illustration: SCIENCE_TOPIC_VISUAL.body_health,
    };
}

// ── NEW: Gia đình & Cộng đồng (Family & Community) — TNXH G1-2 ──
const FAMILY_COMMUNITY_QS = [
    { q: 'Gia đình em thường có những ai?', a: 'Ông bà, bố mẹ, anh chị em', opts: ['Ông bà, bố mẹ, anh chị em', 'Chỉ bố mẹ', 'Chỉ bạn bè', 'Chỉ thầy cô'], e: 'Gia đình gồm nhiều thế hệ: ông bà, bố mẹ, con cháu.', grade: 1 },
    { q: 'Ai chăm sóc em khi ốm?', a: 'Bố mẹ và bác sĩ', opts: ['Bố mẹ và bác sĩ', 'Bạn bè', 'Không ai', 'Tự khỏi'], e: 'Bố mẹ chăm sóc tại nhà, bác sĩ khám và kê thuốc.', grade: 1 },
    { q: 'Hàng xóm là gì?', a: 'Những người sống gần nhà ta', opts: ['Những người sống gần nhà ta', 'Bạn cùng lớp', 'Họ hàng xa', 'Người lạ'], e: 'Hàng xóm = láng giềng, sống cạnh hoặc gần nhà.', grade: 1 },
    { q: 'Khi gặp người lớn, em nên làm gì?', a: 'Chào hỏi lễ phép', opts: ['Chào hỏi lễ phép', 'Quay đi', 'La hét', 'Chạy trốn'], e: 'Chào hỏi lễ phép thể hiện sự tôn trọng.', grade: 1 },
    { q: 'Trường học có những phòng nào?', a: 'Phòng học, thư viện, sân chơi, phòng GV', opts: ['Phòng học, thư viện, sân chơi, phòng GV', 'Chỉ phòng học', 'Chỉ sân chơi', 'Phòng ngủ'], e: 'Trường học có nhiều khu vực cho hoạt động khác nhau.', grade: 1 },
    { q: 'Bưu điện dùng để làm gì?', a: 'Gửi thư và bưu phẩm', opts: ['Gửi thư và bưu phẩm', 'Mua rau', 'Khám bệnh', 'Học bài'], e: 'Bưu điện là nơi gửi/nhận thư, bưu phẩm, chuyển phát.', grade: 2 },
    { q: 'Bệnh viện có ai làm việc?', a: 'Bác sĩ, y tá, hộ lý', opts: ['Bác sĩ, y tá, hộ lý', 'Thầy giáo', 'Nông dân', 'Thợ xây'], e: 'Bệnh viện gồm bác sĩ (khám), y tá (chăm sóc), hộ lý (hỗ trợ).', grade: 2 },
];

export function genFamilyCommunity(): ScienceProblem {
    const item = FAMILY_COMMUNITY_QS[rand(0, FAMILY_COMMUNITY_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: item.grade,
        type: 'health', topic: 'Gia đình & Cộng đồng', topicKey: 'family_community',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nghĩ về cuộc sống hàng ngày', `Đáp án: ${item.a}`],
        illustration: '/images/core/science.svg',
    };
}

// ── NEW: An toàn giao thông (Traffic Safety) — TNXH G1-2 ──
const TRAFFIC_SAFETY_QS = [
    { q: 'Đèn giao thông có mấy màu?', a: '3 màu', opts: ['3 màu', '2 màu', '4 màu', '1 màu'], e: 'Đèn giao thông: Đỏ (dừng), Vàng (chậm lại), Xanh (đi).', grade: 1 },
    { q: 'Đèn đỏ có nghĩa là gì?', a: 'Dừng lại', opts: ['Dừng lại', 'Đi nhanh', 'Rẽ trái', 'Bấm còi'], e: 'Đèn đỏ = DỪNG. Phải dừng lại chờ đèn xanh.', grade: 1 },
    { q: 'Khi qua đường, em nên nhìn hướng nào?', a: 'Trái — Phải — Trái', opts: ['Trái — Phải — Trái', 'Chỉ nhìn trái', 'Chỉ nhìn phải', 'Không cần nhìn'], e: 'Nhìn trái trước (xe đến từ trái), rồi phải, rồi trái lần nữa.', grade: 1 },
    { q: 'Ngồi xe máy phải đội gì?', a: 'Mũ bảo hiểm', opts: ['Mũ bảo hiểm', 'Mũ vải', 'Nón lá', 'Không cần'], e: 'Mũ bảo hiểm bảo vệ đầu khi có tai nạn. Bắt buộc theo luật.', grade: 1 },
    { q: 'Vạch trắng trên đường dành cho ai?', a: 'Người đi bộ', opts: ['Người đi bộ', 'Xe máy', 'Ô tô', 'Xe đạp'], e: 'Vạch kẻ đường (zebra crossing) = lối qua đường cho người đi bộ.', grade: 2 },
    { q: 'Biển báo hình tam giác viền đỏ là loại gì?', a: 'Biển cảnh báo nguy hiểm', opts: ['Biển cảnh báo nguy hiểm', 'Biển cấm', 'Biển chỉ dẫn', 'Biển phụ'], e: 'Tam giác viền đỏ = cảnh báo. Tròn viền đỏ = cấm. Chữ nhật xanh = chỉ dẫn.', grade: 2 },
];

export function genTrafficSafety(): ScienceProblem {
    const item = TRAFFIC_SAFETY_QS[rand(0, TRAFFIC_SAFETY_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: item.grade,
        type: 'health', topic: 'An toàn giao thông', topicKey: 'traffic_safety',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nhớ quy tắc giao thông cơ bản', `Đáp án: ${item.a}`],
        illustration: '/images/core/science.svg',
    };
}

// ══════════════════════════════════════════════
// Grade 2-3: Plants & Animals
// ══════════════════════════════════════════════

const NATURE_QS = [
    { q: 'Cây xanh cần gì để sống?', a: 'Nước, ánh sáng, không khí', opts: ['Nước, ánh sáng, không khí', 'Chỉ nước', 'Chỉ đất', 'Chỉ ánh sáng'], e: 'Cây cần nước, ánh sáng mặt trời, không khí (CO2) và chất khoáng.', grade: 2, type: 'plants' as const, illustration: '/images/core/science.svg'},
    { q: 'Phần nào của cây hấp thụ nước?', a: 'Rễ', opts: ['Rễ', 'Lá', 'Hoa', 'Thân'], e: 'Rễ cây hấp thụ nước và chất khoáng từ đất.', grade: 2, type: 'plants' as const, illustration: '/images/core/science.svg'},
    { q: 'Quá trình cây tạo thức ăn từ ánh sáng gọi là gì?', a: 'Quang hợp', opts: ['Quang hợp', 'Hô hấp', 'Tiêu hóa', 'Trao đổi chất'], e: 'Quang hợp: cây dùng ánh sáng + CO2 + nước → tạo đường + O2.', grade: 3, type: 'plants' as const, illustration: '/images/core/science.svg'},
    { q: 'Động vật nào là động vật có vú?', a: 'Cá heo', opts: ['Cá heo', 'Cá mập', 'Rắn', 'Ếch'], e: 'Cá heo là động vật có vú: đẻ con, nuôi con bằng sữa, thở bằng phổi.', grade: 3, type: 'animals' as const, illustration: '/images/core/science.svg'},
    { q: 'Côn trùng có bao nhiêu chân?', a: '6 chân', opts: ['6 chân', '4 chân', '8 chân', '2 chân'], e: 'Côn trùng luôn có 6 chân. Nhện có 8 chân (không phải côn trùng).', grade: 2, type: 'animals' as const, illustration: '/images/core/science.svg'},
    { q: 'Vòng đời của bướm gồm mấy giai đoạn?', a: '4 giai đoạn', opts: ['4 giai đoạn', '2 giai đoạn', '3 giai đoạn', '5 giai đoạn'], e: 'Trứng → Sâu → Nhộng → Bướm trưởng thành (biến thái hoàn toàn).', grade: 3, type: 'animals' as const, illustration: '/images/core/science.svg'},
    { q: 'Ếch thuộc nhóm động vật nào?', a: 'Lưỡng cư', opts: ['Lưỡng cư', 'Bò sát', 'Cá', 'Có vú'], e: 'Lưỡng cư: sống được cả trên cạn và dưới nước (ếch, cóc, kỳ giông).', grade: 3, type: 'animals' as const, illustration: '/images/core/science.svg'},
    { q: 'Hạt giống nảy mầm cần điều kiện gì?', a: 'Nước, nhiệt độ thích hợp, không khí', opts: ['Nước, nhiệt độ thích hợp, không khí', 'Chỉ nước', 'Chỉ ánh sáng', 'Chỉ đất'], e: 'Hạt giống cần nước (ngâm mềm vỏ), nhiệt độ ấm, không khí. Ánh sáng chưa cần ở giai đoạn nảy mầm.', grade: 2, type: 'plants' as const, illustration: '/images/core/science.svg'},
];

export function genNature(): ScienceProblem {
    const item = NATURE_QS[rand(0, NATURE_QS.length - 1)];
    return {
        id: genId(), gradeLevel: SCIENCE_TOPIC_GRADE.nature, difficulty: item.grade,
        type: item.type, topic: item.type === 'plants' ? 'Thực vật' : 'Động vật', topicKey: 'nature',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nghĩ về đặc điểm phân loại', `Đáp án: ${item.a}`],
        illustration: SCIENCE_TOPIC_VISUAL.nature,
    };
}

// ══════════════════════════════════════════════
// Grade 3-4: Weather & Earth
// ══════════════════════════════════════════════

const WEATHER_EARTH_QS = [
    { q: 'Nước tồn tại ở mấy thể?', a: '3 thể', opts: ['3 thể', '2 thể', '4 thể', '1 thể'], e: '3 thể: rắn (đá), lỏng (nước), khí (hơi nước).', illustration: '/images/core/science.svg'},
    { q: 'Khi đun nước sôi, nước chuyển từ thể nào sang thể nào?', a: 'Lỏng sang khí', opts: ['Lỏng sang khí', 'Rắn sang lỏng', 'Khí sang lỏng', 'Lỏng sang rắn'], e: 'Nước sôi → bốc hơi: lỏng → khí (bay hơi).', grade: 3, illustration: '/images/core/science.svg'},
    { q: 'Mưa hình thành như thế nào?', a: 'Hơi nước ngưng tụ thành mây, rơi xuống', opts: ['Hơi nước ngưng tụ thành mây, rơi xuống', 'Nước từ mặt đất bay lên', 'Sông chảy lên trời', 'Người tạo ra'], e: 'Vòng tuần hoàn nước: bay hơi → ngưng tụ → mưa → chảy về sông/biển.', grade: 3, illustration: '/images/core/science.svg'},
    { q: 'Trái Đất quay quanh gì?', a: 'Mặt Trời', opts: ['Mặt Trời', 'Mặt Trăng', 'Sao Hỏa', 'Chính nó'], e: 'Trái Đất quay quanh Mặt Trời, mất khoảng 365 ngày (1 năm).', grade: 4, illustration: '/images/core/science.svg'},
    { q: 'Ngày và đêm xảy ra do đâu?', a: 'Trái Đất tự quay quanh trục', opts: ['Trái Đất tự quay quanh trục', 'Mặt Trời quay quanh Trái Đất', 'Mặt Trăng che', 'Mây che'], e: 'Trái Đất tự quay 1 vòng/24h: nửa hướng Mặt Trời = ngày, nửa kia = đêm.', grade: 4, illustration: '/images/core/science.svg'},
    { q: 'Nhiệt kế dùng đo gì?', a: 'Nhiệt độ', opts: ['Nhiệt độ', 'Trọng lượng', 'Chiều dài', 'Thời gian'], e: 'Nhiệt kế đo nhiệt độ, đơn vị °C (Celsius) hoặc °F (Fahrenheit).', grade: 3, illustration: '/images/core/science.svg'},
    { q: 'Vì sao có 4 mùa?', a: 'Trục Trái Đất nghiêng khi quay quanh Mặt Trời', opts: ['Trục Trái Đất nghiêng khi quay quanh Mặt Trời', 'Mặt Trời thay đổi nhiệt', 'Mặt Trăng ảnh hưởng', 'Gió thay đổi'], e: 'Trục Trái Đất nghiêng 23.5° → các bán cầu nhận lượng ánh sáng khác nhau.', grade: 4, illustration: '/images/core/science.svg'},
    { q: 'Âm thanh truyền qua môi trường nào?', a: 'Rắn, lỏng, và khí', opts: ['Rắn, lỏng, và khí', 'Chỉ không khí', 'Chỉ nước', 'Chân không'], e: 'Âm thanh cần môi trường vật chất: truyền nhanh nhất qua rắn, chậm nhất qua khí. Không truyền trong chân không.', grade: 4, illustration: '/images/core/science.svg'},
];

export function genWeatherEarth(): ScienceProblem {
    const item = WEATHER_EARTH_QS[rand(0, WEATHER_EARTH_QS.length - 1)];
    return {
        id: genId(), gradeLevel: SCIENCE_TOPIC_GRADE.weather_earth, difficulty: item.grade || SCIENCE_TOPIC_GRADE.weather_earth,
        type: 'weather', topic: 'Thời tiết & Trái Đất', topicKey: 'weather_earth',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Quan sát tự nhiên xung quanh', `Đáp án: ${item.a}`],
        illustration: SCIENCE_TOPIC_VISUAL.weather_earth,
    };
}

// ══════════════════════════════════════════════
// Grade 4-5: Matter & Energy
// ══════════════════════════════════════════════

const MATTER_ENERGY_QS = [
    { q: 'Ánh sáng truyền theo đường nào?', a: 'Đường thẳng', opts: ['Đường thẳng', 'Đường cong', 'Đường zigzag', 'Đường tròn'], e: 'Ánh sáng truyền theo đường thẳng. Vì vậy ta thấy bóng khi vật cản ánh sáng.', grade: 4, illustration: '/images/core/science.svg'},
    { q: 'Vật nào dẫn điện?', a: 'Kim loại (đồng, sắt)', opts: ['Kim loại (đồng, sắt)', 'Gỗ', 'Nhựa', 'Cao su'], e: 'Kim loại dẫn điện tốt. Gỗ, nhựa, cao su là chất cách điện.', grade: 4, illustration: '/images/core/science.svg'},
    { q: 'Năng lượng mặt trời có thể dùng để làm gì?', a: 'Phát điện, sưởi ấm, trồng cây', opts: ['Phát điện, sưởi ấm, trồng cây', 'Chỉ chiếu sáng', 'Chỉ sưởi ấm', 'Không dùng được'], e: 'Năng lượng mặt trời: pin năng lượng → điện, nhà kính → ấm, quang hợp → cây.', grade: 5, illustration: '/images/core/science.svg'},
    { q: 'Vật nào là chất cách nhiệt?', a: 'Len, bông', opts: ['Len, bông', 'Kim loại', 'Nước', 'Đá'], e: 'Len, bông giữ không khí bên trong → cách nhiệt tốt. Kim loại dẫn nhiệt nhanh.', grade: 4, illustration: '/images/core/science.svg'},
    { q: 'Khi hòa đường vào nước nóng, đường sẽ?', a: 'Tan nhanh hơn trong nước lạnh', opts: ['Tan nhanh hơn trong nước lạnh', 'Không tan', 'Tan chậm hơn', 'Biến mất'], e: 'Nhiệt độ cao → phân tử chuyển động nhanh → hòa tan nhanh hơn.', grade: 4, illustration: '/images/core/science.svg'},
    { q: 'Nam châm hút vật liệu nào?', a: 'Sắt, thép', opts: ['Sắt, thép', 'Gỗ', 'Nhựa', 'Giấy'], e: 'Nam châm chỉ hút kim loại chứa sắt (sắt, thép, niken, coban).', grade: 4, illustration: '/images/core/science.svg'},
];

export function genMatterEnergy(): ScienceProblem {
    const item = MATTER_ENERGY_QS[rand(0, MATTER_ENERGY_QS.length - 1)];
    return {
        id: genId(), gradeLevel: SCIENCE_TOPIC_GRADE.matter_energy, difficulty: item.grade,
        type: 'matter', topic: 'Vật chất & Năng lượng', topicKey: 'matter_energy',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nghĩ về tính chất vật liệu', `Đáp án: ${item.a}`],
        illustration: SCIENCE_TOPIC_VISUAL.matter_energy,
    };
}

// ══════════════════════════════════════════════
// Grade 5: Ecosystem & Environment
// ══════════════════════════════════════════════

const ECO_QS = [
    { q: 'Chuỗi thức ăn bắt đầu từ đâu?', a: 'Thực vật (sinh vật sản xuất)', opts: ['Thực vật (sinh vật sản xuất)', 'Động vật ăn thịt', 'Vi khuẩn', 'Con người'], e: 'Thực vật quang hợp tạo năng lượng → cơ sở chuỗi thức ăn.', illustration: '/images/core/science.svg'},
    { q: 'Ô nhiễm không khí chủ yếu do đâu?', a: 'Khí thải xe cộ và nhà máy', opts: ['Khí thải xe cộ và nhà máy', 'Cây cối', 'Nước biển', 'Gió'], e: 'Đốt nhiên liệu hóa thạch → CO2, SO2, bụi mịn → ô nhiễm.', illustration: '/images/core/science.svg'},
    { q: '3R là viết tắt của gì?', a: 'Reduce - Reuse - Recycle', opts: ['Reduce - Reuse - Recycle', 'Run - Read - Rest', 'Red - Round - Right', 'Rain - River - Rock'], e: 'Giảm thiểu - Tái sử dụng - Tái chế: 3 nguyên tắc bảo vệ môi trường.', illustration: '/images/core/science.svg'},
    { q: 'Rừng cung cấp gì cho con người và động vật?', a: 'Oxy, thức ăn, nơi ở, gỗ', opts: ['Oxy, thức ăn, nơi ở, gỗ', 'Chỉ gỗ', 'Chỉ oxy', 'Không cung cấp gì'], e: 'Rừng là "lá phổi xanh": tạo O2, giữ nước, chống xói mòn, là nơi ở của động vật.', illustration: '/images/core/science.svg'},
    { q: 'Nước sạch dùng cho sinh hoạt chiếm bao nhiêu % nước trên Trái Đất?', a: 'Khoảng 1%', opts: ['Khoảng 1%', 'Khoảng 50%', 'Khoảng 30%', 'Khoảng 10%'], e: '97% nước biển mặn, 2% đóng băng ở cực, chỉ ~1% nước ngọt dùng được.', illustration: '/images/core/science.svg'},
    { q: 'Tuyệt chủng nghĩa là gì?', a: 'Loài đó hoàn toàn biến mất', opts: ['Loài đó hoàn toàn biến mất', 'Di cư sang nơi khác', 'Ngủ đông', 'Thay đổi hình dạng'], e: 'Tuyệt chủng = không còn cá thể nào sống sót. VD: khủng long.', illustration: '/images/core/science.svg'},
];

export function genEcosystem(): ScienceProblem {
    const item = ECO_QS[rand(0, ECO_QS.length - 1)];
    return {
        id: genId(), gradeLevel: SCIENCE_TOPIC_GRADE.ecosystem, difficulty: SCIENCE_TOPIC_GRADE.ecosystem,
        type: 'ecosystem', topic: 'Hệ sinh thái & Môi trường', topicKey: 'ecosystem',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nghĩ về mối quan hệ trong tự nhiên', `Đáp án: ${item.a}`],
        illustration: SCIENCE_TOPIC_VISUAL.ecosystem,
    };
}

// ── NEW: An toàn (lửa, điện, nước) — TNXH L1-2 ──
const SAFETY_HOME_QS = [
    { q: 'Khi thấy ổ điện hở, em nên:', a: 'Không chạm vào và báo cho người lớn', opts: ['Không chạm vào và báo cho người lớn', 'Cho tay vào thử', 'Đổ nước lên', 'Không cần làm gì'], e: 'Điện rất nguy hiểm! KHÔNG chạm ổ điện hở. Báo ngay cho bố mẹ.' },
    { q: 'Nếu quần áo bị cháy, em nên:', a: 'Nằm xuống, lăn tròn', opts: ['Nằm xuống, lăn tròn', 'Chạy nhanh', 'Đứng yên', 'Quạt lửa'], e: 'Kỹ thuật STOP-DROP-ROLL: Dừng lại – Nằm xuống – Lăn tròn để dập lửa.' },
    { q: 'Khi bơi, em phải có ai bên cạnh?', a: 'Người lớn biết bơi', opts: ['Người lớn biết bơi', 'Bạn bè cùng tuổi', 'Không cần ai', 'Chú chó'], e: 'Luôn bơi có người lớn giám sát. Trẻ em KHÔNG bơi một mình.' },
    { q: 'Thấy khói bốc lên trong nhà, em nên:', a: 'Bò sát đất và thoát ra ngoài', opts: ['Bò sát đất và thoát ra ngoài', 'Trốn dưới gầm giường', 'Mở cửa sổ', 'Đứng yên'], e: 'Khói bay lên cao. Bò sát sàn để tránh hít khói và thoát ra ngoài.' },
    { q: 'Tay ướt có được cắm ổ điện không?', a: 'Không, rất nguy hiểm', opts: ['Không, rất nguy hiểm', 'Được', 'Được nếu cẩn thận', 'Chỉ khi khẩn cấp'], e: 'Nước dẫn điện. Tay ướt cắm điện có thể bị giật chết.' },
];

export function genSafetyHome(): ScienceProblem {
    const item = SAFETY_HOME_QS[rand(0, SAFETY_HOME_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'health', topic: 'An toàn (lửa, điện, nước)', topicKey: 'safety_home',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Luôn nhờ người lớn khi gặp nguy hiểm', `Đáp án: ${item.a}`],
        illustration: '🔥',
    };
}

// ── NEW: Âm thanh & Ánh sáng — Khoa học L4 ──
const SOUND_LIGHT_QS = [
    { q: 'Âm thanh truyền được qua môi trường nào?', a: 'Chất rắn, lỏng và khí', opts: ['Chất rắn, lỏng và khí', 'Chỉ chất khí', 'Chỉ chất rắn', 'Chân không'], e: 'Âm thanh là sóng cơ học, truyền qua rắn, lỏng, khí nhưng KHÔNG truyền qua chân không.' },
    { q: 'Ánh sáng truyền theo đường nào?', a: 'Đường thẳng', opts: ['Đường thẳng', 'Đường cong', 'Đường xoắn', 'Đường gấp khúc'], e: 'Ánh sáng truyền theo đường thẳng. Vì vậy ta thấy bóng đổ khi có vật cản.' },
    { q: 'Vật nào trong suốt cho ánh sáng truyền qua?', a: 'Kính cửa sổ', opts: ['Kính cửa sổ', 'Tấm gỗ', 'Tờ giấy dày', 'Bức tường'], e: 'Vật trong suốt (kính, nước) cho ánh sáng truyền qua hoàn toàn.' },
    { q: 'Tiếng sấm nghe sau ánh chớp vì:', a: 'Ánh sáng truyền nhanh hơn âm thanh', opts: ['Ánh sáng truyền nhanh hơn âm thanh', 'Âm thanh nhanh hơn', 'Chúng xảy ra cùng lúc', 'Sấm ở xa hơn'], e: 'Ánh sáng: 300.000 km/s. Âm thanh: ~340 m/s. Nên ta thấy chớp trước khi nghe sấm.' },
    { q: 'Gương phẳng phản xạ ánh sáng như thế nào?', a: 'Góc phản xạ bằng góc tới', opts: ['Góc phản xạ bằng góc tới', 'Góc phản xạ lớn hơn', 'Không phản xạ', 'Góc phản xạ nhỏ hơn'], e: 'Định luật phản xạ ánh sáng: góc phản xạ = góc tới.' },
];

export function genSoundLight(): ScienceProblem {
    const item = SOUND_LIGHT_QS[rand(0, SOUND_LIGHT_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'matter', topic: 'Âm thanh & Ánh sáng', topicKey: 'sound_light',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nghĩ về cách sóng truyền trong các môi trường', `Đáp án: ${item.a}`],
        illustration: '🔦',
    };
}

// ── NEW: Chuỗi thức ăn — Khoa học L5 ──
const FOOD_CHAIN_QS = [
    { q: 'Trong chuỗi thức ăn: Cỏ → Châu chấu → Ếch → Rắn. Sinh vật sản xuất là gì?', a: 'Cỏ', opts: ['Cỏ', 'Châu chấu', 'Ếch', 'Rắn'], e: 'Sinh vật sản xuất = thực vật (tự tạo thức ăn bằng quang hợp). Cỏ là sinh vật sản xuất.' },
    { q: 'Sinh vật tiêu thụ bậc 1 trong chuỗi: Lúa → Chuột → Mèo là:', a: 'Chuột', opts: ['Chuột', 'Lúa', 'Mèo', 'Không có'], e: 'Sinh vật tiêu thụ bậc 1 = ăn trực tiếp sinh vật sản xuất. Chuột ăn lúa → bậc 1.' },
    { q: 'Nếu rắn bị tiêu diệt hết, số lượng ếch sẽ:', a: 'Tăng lên rồi giảm', opts: ['Tăng lên rồi giảm', 'Giảm ngay', 'Không thay đổi', 'Tăng mãi'], e: 'Ban đầu ếch tăng (không bị rắn ăn), nhưng sau đó thiếu thức ăn (sâu bọ) nên giảm.' },
    { q: 'Quang hợp cần gì để tạo thức ăn?', a: 'Ánh sáng, nước, CO₂', opts: ['Ánh sáng, nước, CO₂', 'Chỉ nước', 'Chỉ ánh sáng', 'Phân bón'], e: 'Quang hợp: CO₂ + H₂O + ánh sáng → glucose + O₂ (diệp lục xanh).' },
    { q: 'Lưới thức ăn khác chuỗi thức ăn ở chỗ nào?', a: 'Gồm nhiều chuỗi đan xen', opts: ['Gồm nhiều chuỗi đan xen', 'Chỉ có 1 loài', 'Không có sinh vật sản xuất', 'Đơn giản hơn'], e: 'Lưới thức ăn = nhiều chuỗi thức ăn liên kết, phức tạp hơn chuỗi đơn.' },
];

export function genFoodChain(): ScienceProblem {
    const item = FOOD_CHAIN_QS[rand(0, FOOD_CHAIN_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'ecosystem', topic: 'Chuỗi thức ăn', topicKey: 'food_chain',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nhớ: Sinh vật SX → Tiêu thụ bậc 1 → bậc 2 → ...', `Đáp án: ${item.a}`],
        illustration: '🔗',
    };
}

// ── NEW G1-2: Vệ sinh cá nhân — TNXH ──
const VE_SINH_QS = [
    { q: 'Em nên đánh răng mấy lần mỗi ngày?', a: '2 lần (sáng và tối)', opts: ['2 lần (sáng và tối)', '1 lần', 'Không cần', '5 lần'], e: 'Nha khoa khuyến cáo đánh răng ít nhất 2 lần/ngày: sáng và trước khi ngủ.' },
    { q: 'Trước khi ăn, em nên làm gì?', a: 'Rửa tay bằng xà phòng', opts: ['Rửa tay bằng xà phòng', 'Lau tay vào quần', 'Không cần rửa', 'Rửa bằng nước suối'], e: 'Rửa tay bằng xà phòng diệt vi khuẩn, phòng bệnh tiêu chảy.' },
    { q: 'Tắm rửa giúp em điều gì?', a: 'Sạch sẽ, phòng bệnh da', opts: ['Sạch sẽ, phòng bệnh da', 'Cao hơn', 'Chạy nhanh hơn', 'Không có tác dụng'], e: 'Tắm rửa sạch sẽ giúp loại bỏ vi khuẩn, phòng các bệnh về da.' },
    { q: 'Móng tay dài có hại không?', a: 'Có, vi khuẩn tích tụ dưới móng', opts: ['Có, vi khuẩn tích tụ dưới móng', 'Không hại gì', 'Đẹp hơn nên để dài', 'Chỉ hại khi gãy'], e: 'Cắt móng tay ngắn, sạch sẽ để tránh vi khuẩn gây bệnh.' },
];

export function genVeSinh(): ScienceProblem {
    const item = VE_SINH_QS[rand(0, VE_SINH_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'health', topic: 'Vệ sinh cá nhân', topicKey: 've_sinh',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Sạch sẽ = khỏe mạnh', `Đáp án: ${item.a}`],
        illustration: '🧼',
    };
}

// ── NEW G3-4: Nước & Không khí — TNXH/Khoa học ──
const NUOC_KHONGKHI_QS = [
    { q: 'Nước có mấy thể?', a: '3 thể: rắn, lỏng, khí', opts: ['3 thể: rắn, lỏng, khí', '2 thể', '1 thể', '4 thể'], e: 'Nước tồn tại 3 thể: rắn (đá), lỏng (nước), khí (hơi nước).' },
    { q: 'Không khí gồm chủ yếu khí gì?', a: 'Nitơ (~78%) và Ôxi (~21%)', opts: ['Nitơ (~78%) và Ôxi (~21%)', 'Chỉ có Ôxi', 'Chỉ có CO₂', 'Hydro và Heli'], e: 'Không khí: 78% N₂, 21% O₂, 1% các khí khác.' },
    { q: 'Nước sôi ở bao nhiêu độ C?', a: '100°C', opts: ['100°C', '50°C', '0°C', '200°C'], e: 'Ở điều kiện bình thường, nước sôi ở 100°C và đóng băng ở 0°C.' },
    { q: 'Ô nhiễm không khí do nguyên nhân gì?', a: 'Khói xe, nhà máy, đốt rác', opts: ['Khói xe, nhà máy, đốt rác', 'Trồng cây xanh', 'Mưa', 'Gió'], e: 'Khói xe, nhà máy, đốt rác thải khí CO₂, SO₂ gây ô nhiễm.' },
    { q: 'Tại sao phải tiết kiệm nước?', a: 'Nước sạch có hạn, cần bảo vệ', opts: ['Nước sạch có hạn, cần bảo vệ', 'Nước vô tận', 'Để tiết kiệm tiền thôi', 'Không cần tiết kiệm'], e: 'Chỉ 3% nước trên Trái Đất là nước ngọt, và chỉ 1% có thể dùng được.' },
];

export function genNuocKhongKhi(): ScienceProblem {
    const item = NUOC_KHONGKHI_QS[rand(0, NUOC_KHONGKHI_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'matter', topic: 'Nước & Không khí', topicKey: 'nuoc_khong_khi',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nước: 3 thể (rắn/lỏng/khí)', `Đáp án: ${item.a}`],
        illustration: '💧',
    };
}

// ── NEW G5: Sinh sản thực vật & Động vật — Khoa học L5 ──
const SINH_SAN_QS = [
    { q: 'Hoa có vai trò gì trong sinh sản thực vật?', a: 'Chứa cơ quan sinh sản (nhị và nhụy)', opts: ['Chứa cơ quan sinh sản (nhị và nhụy)', 'Chỉ để trang trí', 'Quang hợp', 'Hấp thụ nước'], e: 'Hoa chứa nhị (cơ quan đực) và nhụy (cơ quan cái) — cơ quan sinh sản hữu tính.' },
    { q: 'Thụ phấn là gì?', a: 'Hạt phấn từ nhị đến nhụy', opts: ['Hạt phấn từ nhị đến nhụy', 'Nước vào rễ', 'Lá hấp thụ ánh sáng', 'Quả chín rụng'], e: 'Thụ phấn = hạt phấn (nhị) → nhụy. Nhờ gió, côn trùng, nước.' },
    { q: 'Cây khoai lang sinh sản bằng gì?', a: 'Thân/rễ (sinh sản sinh dưỡng)', opts: ['Thân/rễ (sinh sản sinh dưỡng)', 'Hạt', 'Bào tử', 'Phân đôi'], e: 'Khoai lang sinh sản sinh dưỡng bằng thân rễ. Không cần hạt.' },
    { q: 'Động vật đẻ trứng gọi là gì?', a: 'Động vật noãn sinh', opts: ['Động vật noãn sinh', 'Động vật thai sinh', 'Lưỡng cư', 'Bò sát'], e: 'Noãn sinh = đẻ trứng (gà, cá, rắn). Thai sinh = đẻ con (chó, mèo, người).' },
    { q: 'Con người thuộc nhóm sinh sản nào?', a: 'Thai sinh (đẻ con)', opts: ['Thai sinh (đẻ con)', 'Noãn sinh', 'Phân đôi', 'Nảy chồi'], e: 'Con người là động vật thai sinh: thai phát triển trong tử cung mẹ.' },
];

export function genSinhSan(): ScienceProblem {
    const item = SINH_SAN_QS[rand(0, SINH_SAN_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'ecosystem', topic: 'Sinh sản TV & ĐV', topicKey: 'sinh_san',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['TV: nhị+nhụy, thân, rễ | ĐV: noãn sinh/thai sinh', `Đáp án: ${item.a}`],
        illustration: '🌱',
    };
}

// ── NEW G4: Nhiệt & Chất — Khoa học L4 ──
const NHIET_CHAT_QS = [
    { q: 'Kim loại dẫn nhiệt tốt hay kém?', a: 'Dẫn nhiệt tốt', opts: ['Dẫn nhiệt tốt', 'Dẫn nhiệt kém', 'Không dẫn nhiệt', 'Tùy loại kim loại'], e: 'Kim loại (đồng, sắt, nhôm) dẫn nhiệt TỐT. Vì vậy nồi nấu bằng kim loại.' },
    { q: 'Vì sao mặc áo len ấm?', a: 'Len giữ không khí, cách nhiệt tốt', opts: ['Len giữ không khí, cách nhiệt tốt', 'Len tạo nhiệt', 'Len nóng tự nhiên', 'Len hấp thụ ánh sáng'], e: 'Len có nhiều khoảng trống khí. Không khí cách nhiệt tốt → giữ ấm.' },
    { q: 'Chất nào cách nhiệt tốt?', a: 'Gỗ, nhựa, vải', opts: ['Gỗ, nhựa, vải', 'Sắt, đồng', 'Nhôm, thép', 'Vàng, bạc'], e: 'Gỗ, nhựa, vải cách nhiệt tốt → dùng làm tay cầm nồi, quần áo.' },
    { q: 'Nhiệt truyền từ vật nào sang vật nào?', a: 'Từ vật nóng hơn sang vật lạnh hơn', opts: ['Từ vật nóng hơn sang vật lạnh hơn', 'Từ vật lạnh sang nóng', 'Ngẫu nhiên', 'Chỉ qua kim loại'], e: 'Nhiệt LUÔN truyền từ vật nóng → vật lạnh cho đến khi cân bằng.' },
];

export function genNhietChat(): ScienceProblem {
    const item = NHIET_CHAT_QS[rand(0, NHIET_CHAT_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'matter', topic: 'Nhiệt & Chất', topicKey: 'nhiet_chat',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Kim loại dẫn nhiệt tốt, gỗ/nhựa cách nhiệt', `Đáp án: ${item.a}`],
        illustration: '🌡️',
    };
}

// ══════════════════════════════════════════════
// TOPIC REGISTRY
// ══════════════════════════════════════════════

export interface SciTopicInfo {
    key: string;
    name: string;
    gradeLevel: number;
    generator: () => ScienceProblem;
    icon: string;
}

export const SCIENCE_TOPICS: SciTopicInfo[] = [
    { key: 'body_health', name: 'Cơ thể & Sức khỏe', gradeLevel: SCIENCE_TOPIC_GRADE.body_health, generator: genBodyHealth, icon: '🫀' },
    { key: 'family_community', name: 'Gia đình & Cộng đồng', gradeLevel: 1, generator: genFamilyCommunity, icon: '👨‍👩‍👧‍👦' },
    { key: 'traffic_safety', name: 'An toàn giao thông', gradeLevel: 1, generator: genTrafficSafety, icon: '🚦' },
    { key: 'safety_home', name: 'An toàn (lửa, điện, nước)', gradeLevel: 1, generator: genSafetyHome, icon: '🔥' },
    { key: 've_sinh', name: 'Vệ sinh cá nhân', gradeLevel: 1, generator: genVeSinh, icon: '🧼' },
    { key: 'nature', name: 'Thực vật & Động vật', gradeLevel: SCIENCE_TOPIC_GRADE.nature, generator: genNature, icon: '🌿' },
    { key: 'nuoc_khong_khi', name: 'Nước & Không khí', gradeLevel: 3, generator: genNuocKhongKhi, icon: '💧' },
    { key: 'weather_earth', name: 'Thời tiết & Trái Đất', gradeLevel: SCIENCE_TOPIC_GRADE.weather_earth, generator: genWeatherEarth, icon: '🌍' },
    { key: 'nhiet_chat', name: 'Nhiệt & Chất', gradeLevel: 4, generator: genNhietChat, icon: '🌡️' },
    { key: 'sound_light', name: 'Âm thanh & Ánh sáng', gradeLevel: 4, generator: genSoundLight, icon: '🔦' },
    { key: 'matter_energy', name: 'Vật chất & Năng lượng', gradeLevel: SCIENCE_TOPIC_GRADE.matter_energy, generator: genMatterEnergy, icon: '⚡' },
    { key: 'ecosystem', name: 'Hệ sinh thái & MT', gradeLevel: SCIENCE_TOPIC_GRADE.ecosystem, generator: genEcosystem, icon: '🌳' },
    { key: 'food_chain', name: 'Chuỗi thức ăn', gradeLevel: 5, generator: genFoodChain, icon: '🔗' },
    { key: 'sinh_san', name: 'Sinh sản TV & ĐV', gradeLevel: 5, generator: genSinhSan, icon: '🌱' },
];

export function generateScienceSet(grade: number, topicKey?: string, count: number = 10): ScienceProblem[] {
    const topics = SCIENCE_TOPICS.filter(t => t.gradeLevel <= grade && (!topicKey || t.key === topicKey));
    if (topics.length === 0) return [];
    return Array.from({ length: count }, () => {
        const t = topics[rand(0, topics.length - 1)];
        return t.generator();
    });
}
