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
    { key: 'nature', name: 'Thực vật & Động vật', gradeLevel: SCIENCE_TOPIC_GRADE.nature, generator: genNature, icon: '🌿' },
    { key: 'weather_earth', name: 'Thời tiết & Trái Đất', gradeLevel: SCIENCE_TOPIC_GRADE.weather_earth, generator: genWeatherEarth, icon: '🌍' },
    { key: 'matter_energy', name: 'Vật chất & Năng lượng', gradeLevel: SCIENCE_TOPIC_GRADE.matter_energy, generator: genMatterEnergy, icon: '⚡' },
    { key: 'ecosystem', name: 'Hệ sinh thái & MT', gradeLevel: SCIENCE_TOPIC_GRADE.ecosystem, generator: genEcosystem, icon: '🌳' },
];

export function generateScienceSet(grade: number, topicKey?: string, count: number = 10): ScienceProblem[] {
    const topics = SCIENCE_TOPICS.filter(t => t.gradeLevel <= grade && (!topicKey || t.key === topicKey));
    if (topics.length === 0) return [];
    return Array.from({ length: count }, () => {
        const t = topics[rand(0, topics.length - 1)];
        return t.generator();
    });
}
