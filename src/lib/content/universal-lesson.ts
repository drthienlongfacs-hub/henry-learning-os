// Universal Lesson Content Generator — all 8 subjects
// Template-based: generates lesson from topic metadata

export interface UniversalLesson {
  title: string;
  titleVi: string;
  icon: string;
  grade: number;
  subject: string;
  sections: { type: string; title: string; items: string[] }[];
}

// Subject-specific lesson templates
const SUBJECT_LESSONS: Record<string, Record<string, { concepts: string[]; examples: string[]; tips: string[] }>> = {
  math: {
    add_sub_10: { concepts: ['Cộng: gộp hai nhóm lại → 3 + 2 = 5', 'Trừ: bớt đi → 5 - 2 = 3', 'Số 0: cộng 0 giữ nguyên → 4 + 0 = 4', 'Đổi chỗ: 3 + 2 = 2 + 3'], examples: ['🍎🍎🍎 + 🍎🍎 = 🍎🍎🍎🍎🍎 → 3 + 2 = 5', '🖐️5 ngón - ✌️2 ngón = 3 ngón → 5 - 2 = 3'], tips: ['Dùng ngón tay đếm', 'Vẽ chấm tròn ra giấy'] },
    add_sub_20: { concepts: ['Cộng qua 10: tách để tròn 10 → 8 + 5 = 8 + 2 + 3 = 13', 'Trừ qua 10: 15 - 7 = 15 - 5 - 2 = 8', 'Bảng cộng trừ trong 20 cần thuộc lòng'], examples: ['9 + 4 = 9 + 1 + 3 = 10 + 3 = 13', '16 - 8 = 16 - 6 - 2 = 10 - 2 = 8'], tips: ['Tách số nhỏ để tròn 10', 'Học thuộc các cặp bù 10: 1+9, 2+8, 3+7, 4+6, 5+5'] },
    number_bonds: { concepts: ['Tách số: 5 = 1+4 = 2+3', 'Ghép số: 2 và 3 ghép thành 5', 'Mỗi số có nhiều cách tách'], examples: ['7 = 1+6 = 2+5 = 3+4', '10 = 1+9 = 2+8 = 3+7 = 4+6 = 5+5'], tips: ['Dùng que tính chia 2 nhóm', 'Vẽ sơ đồ hình cây'] },
    count_20: { concepts: ['Đếm xuôi: 1, 2, 3... 20', 'Đếm ngược: 20, 19, 18...', 'So sánh: > lớn hơn, < nhỏ hơn, = bằng nhau'], examples: ['11 đọc là "mười một"', '15 > 12 vì 15 đứng sau 12', 'Đếm 2, 4, 6, 8, 10... (đếm cách 2)'], tips: ['Đếm đồ vật trong nhà', 'Chơi trốn tìm đếm ngược từ 20'] },
    mul_table: { concepts: ['Nhân = cộng nhiều lần: 3 × 4 = 3 + 3 + 3 + 3 = 12', 'Bảng cửu chương: học từ 2 đến 9', 'Đổi chỗ: 3 × 4 = 4 × 3'], examples: ['2 × 5 = 10 (2 nhóm, mỗi nhóm 5)', '5 × 3 = 15 (đếm cách 5: 5, 10, 15)'], tips: ['Hát bảng cửu chương', 'Xếp đồ vật thành hàng để đếm'] },
    division: { concepts: ['Chia = phân đều: 12 ÷ 3 = 4 (chia 12 thành 3 nhóm bằng nhau)', 'Chia là phép ngược của nhân: 12 ÷ 3 = 4 vì 3 × 4 = 12', 'Chia có dư: 13 ÷ 3 = 4 dư 1'], examples: ['15 ÷ 5 = 3 (chia 15 kẹo cho 5 bạn)', '20 ÷ 4 = 5 (xếp 20 bạn thành 4 hàng)'], tips: ['Dùng bảng nhân ngược lại', 'Chia kẹo, đồ chơi cho bạn bè'] },
    fractions: { concepts: ['Phân số = một phần: 1/2 = một nửa', '1/4 = một phần tư (chia pizza 4 miếng, lấy 1)', 'Tử số (trên) / Mẫu số (dưới)'], examples: ['🍕 chia 4 → mỗi miếng = 1/4', '1/2 + 1/2 = 1 (hai nửa = một cái)'], tips: ['Gấp giấy để thấy phân số', 'Chia bánh, chia nước'] },
    geometry: { concepts: ['Hình vuông: 4 cạnh bằng nhau, 4 góc vuông', 'Hình chữ nhật: 2 cạnh dài bằng nhau, 2 cạnh ngắn bằng nhau', 'Hình tam giác: 3 cạnh, 3 góc', 'Hình tròn: không có cạnh, không có góc'], examples: ['Cửa sổ = hình chữ nhật', 'Bánh xe = hình tròn', 'Mái nhà = hình tam giác'], tips: ['Tìm hình trong nhà', 'Vẽ hình bằng thước kẻ'] },
    measurement: { concepts: ['Đo chiều dài: cm, m, km', 'Đo khối lượng: g, kg', 'Đo thời gian: giờ, phút', 'Đo dung tích: ml, l'], examples: ['Cây bút dài 15 cm', 'Túi gạo nặng 5 kg', '1 giờ = 60 phút'], tips: ['Dùng thước đo đồ vật', 'Đọc đồng hồ mỗi giờ'] },
    time_calendar: { concepts: ['Đồng hồ: kim giờ (ngắn), kim phút (dài)', '1 ngày = 24 giờ, 1 tuần = 7 ngày', '1 năm = 12 tháng', 'Đọc lịch: ngày, thứ, tháng'], examples: ['7:30 = bảy giờ ba mươi phút', 'Thứ Hai, Thứ Ba... Chủ Nhật'], tips: ['Xem đồng hồ mỗi bữa ăn', 'Đánh dấu ngày đặc biệt trên lịch'] },
  },
  vietnamese: {
    alphabet: { concepts: ['Bảng chữ cái có 29 chữ: a, ă, â, b, c, d, đ, e, ê...', 'Nguyên âm: a, ă, â, e, ê, i, o, ô, ơ, u, ư, y', 'Phụ âm: b, c, d, đ, g, h, k, l, m, n...'], examples: ['a → quả cam, ă → ăn cơm, â → cây, b → bà', 'Viết in hoa đầu câu: "Ba đi làm."'], tips: ['Đọc to từng chữ mỗi ngày', 'Viết chữ vào bảng con'] },
    tones: { concepts: ['6 thanh: ngang (a), huyền (à), sắc (á), hỏi (ả), ngã (ã), nặng (ạ)', 'Thanh thay đổi nghĩa: ma, mà, má, mả, mã, mạ', 'Thanh huyền + nặng = giọng trầm, sắc + ngã + hỏi = giọng bổng'], examples: ['ba (số 3) ≠ bà (bà nội) ≠ bá (cái bá)', 'la (kêu la) ≠ là (thì) ≠ lá (lá cây)'], tips: ['Đọc to 6 thanh mỗi ngày', 'Hát theo cao độ thanh điệu'] },
    van: { concepts: ['Vần = nguyên âm + phụ âm cuối: an, at, am, ap...', 'Vần mở: ba, me, chi (kết thúc nguyên âm)', 'Vần đóng: ban, met, chin (kết thúc phụ âm)'], examples: ['vần AN: ban, can, dan, fan, gan', 'vần AT: bat, cat, hat, mat'], tips: ['Đọc các từ cùng vần', 'Tìm vần trong bài thơ'] },
    phu_am_ghep: { concepts: ['ch: cha, cho, chơi', 'gh: ghe, ghế, ghi', 'kh: khi, khô, không', 'ng: nga, nghe, người', 'nh: nha, nhà, nhỏ', 'th: tha, thơ, thủy', 'tr: tra, trong, trời', 'ph: pha, phố, phim'], examples: ['ch + a = cha (ba/cha)', 'th + ư = thư (lá thư)'], tips: ['Đọc to phụ âm ghép', 'Viết từ có phụ âm ghép'] },
    doc_hieu: { concepts: ['Đọc kỹ từng câu', 'Tìm ý chính: Ai? Làm gì? Ở đâu? Khi nào?', 'Tìm từ mới, tra nghĩa'], examples: ['Bài đọc: "Lan đi học. Lan mang cặp mới. Lan rất vui." → Ai? Lan. Làm gì? Đi học.'], tips: ['Đọc to bài 2 lần', 'Gạch chân từ không hiểu'] },
    tap_lam_van: { concepts: ['Viết câu đúng: Chủ ngữ + Vị ngữ', 'Mở bài: giới thiệu chủ đề', 'Thân bài: kể chi tiết', 'Kết bài: nêu cảm nghĩ'], examples: ['"Em yêu mẹ. Mẹ nấu cơm rất ngon. Em giúp mẹ rửa chén."'], tips: ['Viết nháp trước', 'Đọc lại bài sau khi viết'] },
  },
  science: {
    body_health: { concepts: ['Cơ thể có nhiều bộ phận: đầu, mình, tay, chân', 'Giác quan: mắt (nhìn), tai (nghe), mũi (ngửi), lưỡi (nếm), da (sờ)', '5 nhóm thực phẩm: tinh bột, đạm, béo, vitamin, khoáng chất'], examples: ['Mắt giúp ta nhìn thấy màu sắc', 'Ăn rau xanh cung cấp vitamin'], tips: ['Rửa tay trước khi ăn', 'Đánh răng 2 lần/ngày'] },
    family_community: { concepts: ['Gia đình: ông bà, bố mẹ, anh chị em', 'Trường học: thầy cô, bạn bè', 'Hàng xóm, khu phố'], examples: ['Gia đình em có 4 người', 'Em chào cô khi đến trường'], tips: ['Giúp đỡ người thân', 'Lễ phép với người lớn'] },
    traffic_safety: { concepts: ['Đèn đỏ: dừng, Đèn vàng: chuẩn bị, Đèn xanh: đi', 'Đi bộ trên vỉa hè', 'Sang đường tại vạch kẻ'], examples: ['Nhìn trái → nhìn phải → nhìn trái → sang đường', 'Đội mũ bảo hiểm khi đi xe'], tips: ['Nắm tay người lớn khi sang đường', 'Không chạy ra đường'] },
    plants_animals: { concepts: ['Cây xanh: rễ, thân, lá, hoa, quả', 'Cây cần: nước, ánh sáng, đất, không khí', 'Động vật: có xương sống (cá, chim) và không xương sống (côn trùng)'], examples: ['Cây lúa → gạo → cơm', 'Sâu bướm → kén → bướm'], tips: ['Trồng 1 cây trong chậu', 'Quan sát côn trùng trong vườn'] },
    weather_seasons: { concepts: ['Thời tiết: nắng, mưa, gió, bão', 'Mùa: Xuân, Hạ, Thu, Đông (miền Bắc) / Mưa, Khô (miền Nam)', 'Nhiệt kế đo nhiệt độ'], examples: ['Mùa hè: nóng, ngày dài', 'Mùa đông: lạnh, ngày ngắn'], tips: ['Xem dự báo thời tiết', 'Ghi nhiệt độ mỗi ngày'] },
    water_cycle: { concepts: ['Nước bay hơi → mây → mưa → sông → biển', '3 thể: rắn (đá), lỏng (nước), khí (hơi nước)', 'Nước sạch rất quan trọng'], examples: ['Đun nước → hơi nước bay lên', 'Bỏ nước vào tủ đông → đá'], tips: ['Tiết kiệm nước', 'Thí nghiệm: đặt đá ra nắng'] },
  },
  hisgeo: {
    history_g4: { concepts: ['Văn Lang – Âu Lạc: nhà nước đầu tiên', 'Hai Bà Trưng khởi nghĩa năm 40', 'Ngô Quyền chiến thắng Bạch Đằng 938'], examples: ['Truyền thuyết: Lạc Long Quân và Âu Cơ', 'Vua Hùng dựng nước, giỗ tổ mùng 10/3'], tips: ['Đọc truyện lịch sử', 'Xem phim tài liệu'] },
    dia_ly_g4: { concepts: ['VN hình chữ S, dài 1650 km', 'Phía Bắc: núi cao (Fansipan 3143m)', 'Miền Trung: dải đất hẹp', 'Phía Nam: đồng bằng sông Cửu Long'], examples: ['Sông Hồng chảy qua Hà Nội', 'Sông Mê Kông (Cửu Long) chảy qua miền Nam'], tips: ['Xem bản đồ VN', 'Tìm quê mình trên bản đồ'] },
    nhan_vat_ls: { concepts: ['Hai Bà Trưng: nữ anh hùng chống Hán', 'Lý Thường Kiệt: "Nam quốc sơn hà"', 'Trần Hưng Đạo: 3 lần thắng Nguyên Mông', 'Nguyễn Trãi: "Bình Ngô đại cáo"'], examples: ['Trần Hưng Đạo dùng cọc gỗ trên sông Bạch Đằng'], tips: ['Đọc truyện tranh lịch sử', 'Viết timeline các nhân vật'] },
    ban_do: { concepts: ['Bản đồ: hình vẽ thu nhỏ mặt đất', '4 hướng: Bắc, Nam, Đông, Tây', 'Tỷ lệ bản đồ: 1:100.000 = 1cm = 1km', 'Ký hiệu: sông (xanh), núi (nâu), đường (đỏ)'], examples: ['Mặt trời mọc hướng Đông', 'La bàn chỉ hướng Bắc'], tips: ['Vẽ bản đồ phòng em', 'Tìm hướng bằng mặt trời'] },
  },
  computing: {
    hardware: { concepts: ['Máy tính gồm: thân máy, màn hình, bàn phím, chuột', 'CPU = bộ não xử lý', 'RAM = bộ nhớ tạm', 'Ổ cứng = lưu dữ liệu'], examples: ['Bàn phím có chữ cái, số, phím đặc biệt', 'Chuột: click trái (chọn), click phải (menu)'], tips: ['Tập gõ 10 ngón', 'Giữ tư thế ngồi đúng'] },
    word_processing: { concepts: ['Mở Word/Docs → gõ nội dung → lưu file', 'In đậm (B), in nghiêng (I), gạch chân (U)', 'Căn lề: trái, giữa, phải', 'Cỡ chữ, font chữ, màu chữ'], examples: ['Ctrl+S = Lưu file', 'Ctrl+Z = Hoàn tác (undo)'], tips: ['Lưu file thường xuyên', 'Đặt tên file dễ nhớ'] },
    internet_basic: { concepts: ['Internet = mạng kết nối toàn cầu', 'Trình duyệt: Chrome, Safari, Firefox', 'Website = trang web có thông tin', 'Tìm kiếm: gõ từ khóa vào Google'], examples: ['google.com → tìm kiếm thông tin', 'youtube.com → xem video học'], tips: ['Không chia sẻ thông tin cá nhân', 'Hỏi bố mẹ trước khi vào web mới'] },
    cyber_safety: { concepts: ['Không chia sẻ: tên, địa chỉ, số điện thoại', 'Mật khẩu mạnh: dài, có chữ + số + ký hiệu', 'Không click link lạ', 'Báo người lớn khi gặp nội dung xấu'], examples: ['Mật khẩu yếu: 123456 ❌', 'Mật khẩu mạnh: MyDog$2024! ✅'], tips: ['Đổi mật khẩu 3 tháng/lần', 'Không tải app từ nguồn lạ'] },
    scratch_basic: { concepts: ['Scratch = lập trình kéo thả khối lệnh', 'Nhân vật (Sprite) thực hiện lệnh', 'Vòng lặp: lặp lại hành động', 'Điều kiện: nếu... thì...'], examples: ['Di chuyển 10 bước → xoay 90° → lặp 4 lần = vẽ hình vuông'], tips: ['Bắt đầu với dự án đơn giản', 'Chia sẻ project trên Scratch'] },
  },
  ethics: {
    polite_greet: { concepts: ['Gặp người lớn: "Con chào ạ!"', 'Gặp bạn: "Chào bạn!"', 'Khi nhận quà: "Con cảm ơn ạ!"', 'Khi mắc lỗi: "Con xin lỗi ạ!"'], examples: ['Sáng: "Con chào cô ạ!" (khi đến lớp)', 'Chiều: "Con chào bố mẹ ạ!" (khi về nhà)'], tips: ['Chào hỏi mỗi ngày', 'Nói cảm ơn, xin lỗi ngay'] },
    yeu_thuong_gia_dinh: { concepts: ['Gia đình = nơi yêu thương nhất', 'Kính trọng ông bà, yêu thương bố mẹ', 'Giúp đỡ việc nhà phù hợp tuổi', 'Chia sẻ với anh chị em'], examples: ['Phụ mẹ dọn bàn ăn', 'Đọc sách cho em nghe', 'Tưới cây với ông'], tips: ['Nói "Con yêu..." mỗi ngày', 'Tự làm thiệp tặng gia đình'] },
    giu_ve_sinh: { concepts: ['Rửa tay bằng xà phòng 20 giây', 'Đánh răng sáng + tối', 'Bỏ rác đúng chỗ, phân loại rác', 'Giữ lớp học, nhà ở sạch sẽ'], examples: ['6 bước rửa tay: lòng → mu → kẽ → móng → ngón cái → cổ tay'], tips: ['Hát bài 20 giây khi rửa tay', 'Mang khăn tay sạch mỗi ngày'] },
    express_emotion: { concepts: ['Cảm xúc: vui, buồn, giận, sợ, ngạc nhiên', 'Nói ra cảm xúc: "Em cảm thấy buồn vì..."', 'Hít thở sâu khi tức giận', 'Lắng nghe khi bạn buồn'], examples: ['Vui: "Em rất vui vì được khen!"', 'Buồn: "Em buồn vì bạn không chơi cùng"'], tips: ['Vẽ mặt cảm xúc', 'Kể cho bố mẹ nghe mỗi tối'] },
  },
  art: {
    basic_colors: { concepts: ['3 màu cơ bản: Đỏ, Vàng, Xanh dương', 'Pha màu: Đỏ + Vàng = Cam, Xanh + Vàng = Xanh lá, Đỏ + Xanh = Tím', 'Màu nóng: đỏ, cam, vàng → sôi động', 'Màu lạnh: xanh, tím → yên tĩnh'], examples: ['🔴 + 🟡 = 🟠 (đỏ + vàng = cam)', '🔵 + 🟡 = 🟢 (xanh + vàng = xanh lá)'], tips: ['Pha màu nước thử', 'Vẽ cầu vồng 7 màu'] },
    hat_thieu_nhi: { concepts: ['Hát đúng giai điệu (melody)', 'Giữ nhịp (rhythm): 2/4, 3/4, 4/4', 'Hát rõ lời, đúng cao độ', 'Biểu cảm khi hát'], examples: ['Bài hát: "Lí cây xanh", "Cháu yêu bà"', 'Nhịp 2/4: MẠNH-nhẹ, MẠNH-nhẹ'], tips: ['Hát mỗi ngày 10 phút', 'Ghi âm giọng hát của mình'] },
    nan_tao_hinh: { concepts: ['Nặn: dùng đất sét/đất nặn tạo hình', 'Các bước: nhào → lăn → uốn → ghép → hoàn thiện', 'Hình cơ bản: cầu, trụ, khối vuông'], examples: ['Nặn quả táo: vo tròn + thêm cuống', 'Nặn con rắn: lăn dài + uốn cong'], tips: ['Bắt đầu từ hình đơn giản', 'Dùng que tăm tạo chi tiết'] },
    music_rhythm: { concepts: ['Nhịp = trái tim của âm nhạc', 'Nốt tròn (4 phách), nốt trắng (2), nốt đen (1)', 'Phách mạnh - nhẹ tạo nhịp điệu', 'Nghỉ = im lặng cũng là âm nhạc'], examples: ['Vỗ tay theo nhịp: TÚM-tà, TÚM-tà (nhịp 2/4)', '1-2-3, 1-2-3 (nhịp 3/4 = waltz)'], tips: ['Vỗ tay theo bài hát', 'Dùng muỗng, đũa làm nhạc cụ'] },
  },
};

export function getUniversalLesson(subject: string, topicKey: string, topicName: string, icon: string, grade: number): UniversalLesson {
  const subjectData = SUBJECT_LESSONS[subject];
  if (subjectData) {
    const lesson = subjectData[topicKey];
    if (lesson) return buildLesson(subject, topicName, icon, grade, lesson);
    const partialKey = Object.keys(subjectData).find(k => topicKey.includes(k));
    if (partialKey) return buildLesson(subject, topicName, icon, grade, subjectData[partialKey]);
  }
  // Auto-generate from topic name — ensures 100% coverage
  return buildLesson(subject, topicName, icon, grade, {
    concepts: [`Chủ đề: ${topicName}`, `Lớp ${grade} — Hãy đọc kỹ trước khi làm bài`, `Ghi nhớ các từ khóa quan trọng trong bài`],
    examples: [`Ví dụ sẽ xuất hiện trong phần luyện tập`, `Hãy đọc câu hỏi thật kỹ trước khi chọn đáp án`],
    tips: [`Đọc bài 2 lần trước khi trả lời`, `Nếu không chắc, dùng phép loại trừ`],
  });
}

function buildLesson(subject: string, topicName: string, icon: string, grade: number, data: { concepts: string[]; examples: string[]; tips: string[] }): UniversalLesson {
  return {
    title: topicName, titleVi: topicName, icon, grade, subject,
    sections: [
      { type: 'concepts', title: '📖 Kiến thức cần biết', items: data.concepts },
      { type: 'examples', title: '✏️ Ví dụ minh họa', items: data.examples },
      { type: 'tips', title: '💡 Mẹo học hiệu quả', items: data.tips },
    ],
  };
}
