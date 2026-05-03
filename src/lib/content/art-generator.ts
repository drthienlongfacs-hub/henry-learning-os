// =====================================================
// Art Generator — Nghệ thuật (L1-5)
// Sources: CT 2018 Mĩ thuật & Âm nhạc, CAST UDL
// =====================================================

export interface ArtProblem {
    id: string;
    question: string;
    correctAnswer: string;
    options: string[];
    explanation: string;
    difficulty: number;
    hints: string[];
    type: 'visual' | 'audio';
    gradeLevel: number;
    topic: string;
    topicKey: string;
    illustration?: string;
}

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const genId = () => `art-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// ══════════════════════════════════════════════
// Grade 1: Basic Colors (Màu sắc cơ bản)
// ══════════════════════════════════════════════

const COLOR_QS = [
    { q: 'Ba màu cơ bản (màu gốc) là những màu nào?', a: 'Đỏ, vàng, xanh lam', opts: ['Đỏ, vàng, xanh lam', 'Đen, trắng, xám', 'Xanh lá, cam, tím', 'Hồng, nâu, lục'], e: 'Trong mỹ thuật, Đỏ, Vàng và Xanh lam là 3 màu cơ bản. Từ 3 màu này có thể pha ra các màu khác.' },
    { q: 'Khi ta trộn màu Đỏ và màu Vàng với nhau, ta sẽ được màu gì?', a: 'Màu Cam', opts: ['Màu Cam', 'Màu Xanh lá', 'Màu Tím', 'Màu Đen'], e: 'Đỏ + Vàng = Cam.' },
    { q: 'Khi ta trộn màu Xanh lam và màu Vàng, ta sẽ được màu gì?', a: 'Màu Xanh lá cây', opts: ['Màu Xanh lá cây', 'Màu Cam', 'Màu Nâu', 'Màu Tím'], e: 'Xanh lam + Vàng = Xanh lá cây.' },
    { q: 'Khi ta trộn màu Đỏ và màu Xanh lam, ta sẽ được màu gì?', a: 'Màu Tím', opts: ['Màu Tím', 'Màu Cam', 'Màu Xanh lá', 'Màu Đen'], e: 'Đỏ + Xanh lam = Tím.' },
    { q: 'Màu của ông mặt trời chiếu sáng thường được vẽ bằng màu gì?', a: 'Màu Vàng hoặc Đỏ', opts: ['Màu Vàng hoặc Đỏ', 'Màu Xanh lam', 'Màu Tím', 'Màu Đen'], e: 'Ông mặt trời thường tượng trưng cho ánh sáng và sự ấm áp nên hay dùng màu Vàng, Cam, Đỏ.' },
];

export function genBasicColors(): ArtProblem {
    const item = COLOR_QS[rand(0, COLOR_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'visual', topic: 'Màu sắc cơ bản', topicKey: 'basic_colors',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Hãy nhớ lại hộp màu sáp của em', `Đáp án: ${item.a}`],
        illustration: '/images/core/books_hd.svg',
    };
}

// ══════════════════════════════════════════════
// Grade 2: Music Rhythm (Nhịp điệu cơ bản)
// ══════════════════════════════════════════════

const RHYTHM_QS = [
    { q: 'Nhịp điệu trong âm nhạc là gì?', a: 'Sự lặp lại đều đặn của các âm thanh (phách mạnh, nhẹ)', opts: ['Sự lặp lại đều đặn của các âm thanh (phách mạnh, nhẹ)', 'Lời của bài hát', 'Độ cao thấp của nốt nhạc', 'Tên của ca sĩ'], e: 'Nhịp điệu tạo ra chuyển động của bài hát, giống như tiếng đập của trái tim.' },
    { q: 'Khi hát nhịp 2/4, phách thứ nhất thường như thế nào?', a: 'Phách mạnh', opts: ['Phách mạnh', 'Phách nhẹ', 'Không có âm thanh', 'Kéo dài rất lâu'], e: 'Nhịp 2/4 gồm 1 phách mạnh và 1 phách nhẹ lặp lại.' },
    { q: 'Nhạc cụ nào sau đây thường dùng để giữ nhịp?', a: 'Trống con', opts: ['Trống con', 'Cây sáo', 'Đàn kèn', 'Giọng hát'], e: 'Các loại nhạc cụ gõ (trống, phách, song loan) rất tốt để giữ nhịp điệu.' },
    { q: 'Tốc độ của bài hát (nhanh, chậm) được gọi là gì?', a: 'Nhịp độ', opts: ['Nhịp độ', 'Cao độ', 'Âm lượng', 'Giai điệu'], e: 'Nhịp độ (Tempo) chỉ sự nhanh hay chậm của bài hát.' },
    { q: 'Khi nghe một bài hát vui nhộn, nhịp điệu thường như thế nào?', a: 'Nhanh và rộn ràng', opts: ['Nhanh và rộn ràng', 'Rất chậm', 'Buồn bã', 'Không có tiếng động'], e: 'Bài hát vui tươi thường có nhịp điệu nhanh, thôi thúc người nghe nhún nhảy.' },
];

export function genMusicRhythm(): ArtProblem {
    const item = RHYTHM_QS[rand(0, RHYTHM_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'audio', topic: 'Nhịp điệu cơ bản', topicKey: 'music_rhythm',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Hãy nhớ lại lúc em vỗ tay theo bài hát', `Đáp án: ${item.a}`],
        illustration: '/images/core/books_hd.svg',
    };
}

// ══════════════════════════════════════════════
// Grade 3: Shapes & Drawing (Đường nét và hình khối)
// ══════════════════════════════════════════════

const DRAWING_QS = [
    { q: 'Đường nét nào tạo cảm giác mạnh mẽ và vững chãi?', a: 'Đường thẳng ngang', opts: ['Đường thẳng ngang', 'Đường cong lượn sóng', 'Đường gấp khúc', 'Đường chấm chấm'], e: 'Đường thẳng ngang tạo cảm giác ổn định, vững chãi như mặt đất hay mặt nước phẳng lặng.' },
    { q: 'Khi vẽ người, phần nào thường được vẽ trước?', a: 'Đầu (hình tròn hoặc hình bầu dục)', opts: ['Đầu (hình tròn hoặc hình bầu dục)', 'Chân', 'Tay', 'Quần áo'], e: 'Khi vẽ người, ta thường bắt đầu từ đầu rồi mới đến thân và chi.' },
    { q: 'Hình nào sau đây là hình khối 3 chiều?', a: 'Hình hộp', opts: ['Hình hộp', 'Hình tròn', 'Hình tam giác', 'Hình vuông'], e: 'Hình hộp có chiều dài, rộng và cao — đó là hình khối 3 chiều, khác với hình phẳng 2D.' },
    { q: 'Để vẽ một bức tranh phong cảnh, ta thường vẽ phần nào ở phía trên?', a: 'Bầu trời', opts: ['Bầu trời', 'Mặt đất', 'Nhà cửa', 'Cây cối'], e: 'Trong tranh phong cảnh, bầu trời nằm phía trên, mặt đất ở dưới — đó là bố cục xa gần.' },
    { q: 'Đường cong lượn sóng thường gợi cảm giác gì?', a: 'Nhẹ nhàng, mềm mại', opts: ['Nhẹ nhàng, mềm mại', 'Cứng cáp, mạnh mẽ', 'Sợ hãi', 'Buồn chán'], e: 'Đường cong lượn sóng gợi sự mềm mại, nhẹ nhàng như gió, nước hay tóc mây.' },
];

export function genShapesDrawing(): ArtProblem {
    const item = DRAWING_QS[rand(0, DRAWING_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'visual', topic: 'Đường nét và hình khối', topicKey: 'shapes_drawing',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Hãy nhớ lại khi em cầm bút vẽ trên giấy', `Đáp án: ${item.a}`],
    };
}

// ══════════════════════════════════════════════
// Grade 4: Musical Instruments (Nhạc cụ Việt Nam)
// ══════════════════════════════════════════════

const INSTRUMENT_QS = [
    { q: 'Đàn tranh là nhạc cụ thuộc loại nào?', a: 'Nhạc cụ dây (gảy)', opts: ['Nhạc cụ dây (gảy)', 'Nhạc cụ gõ', 'Nhạc cụ hơi', 'Nhạc cụ điện tử'], e: 'Đàn tranh là nhạc cụ truyền thống Việt Nam thuộc bộ dây, chơi bằng cách gảy.' },
    { q: 'Sáo trúc phát ra âm thanh nhờ:', a: 'Thổi hơi qua lỗ trên ống trúc', opts: ['Thổi hơi qua lỗ trên ống trúc', 'Gõ vào ống', 'Bật nút điện', 'Kéo dây'], e: 'Sáo trúc thuộc nhóm nhạc cụ hơi — người chơi thổi hơi vào lỗ để tạo âm thanh.' },
    { q: 'Trống cơm (trống con) thuộc nhóm nhạc cụ nào?', a: 'Nhạc cụ gõ (màng rung)', opts: ['Nhạc cụ gõ (màng rung)', 'Nhạc cụ dây', 'Nhạc cụ hơi', 'Nhạc cụ phím'], e: 'Trống thuộc nhóm nhạc cụ gõ — âm thanh phát ra khi mặt trống rung.' },
    { q: 'Nhạc cụ nào sau đây KHÔNG phải nhạc cụ truyền thống Việt Nam?', a: 'Piano (dương cầm)', opts: ['Piano (dương cầm)', 'Đàn bầu', 'Đàn tranh', 'Sáo trúc'], e: 'Piano có nguồn gốc phương Tây. Đàn bầu, đàn tranh, sáo trúc là nhạc cụ Việt Nam.' },
    { q: 'Đàn bầu có bao nhiêu dây?', a: 'Một dây', opts: ['Một dây', 'Hai dây', 'Bốn dây', 'Không có dây'], e: 'Đàn bầu — nhạc cụ độc đáo Việt Nam — chỉ có một dây duy nhất nhưng tạo ra nhiều âm sắc.' },
];

export function genMusicalInstruments(): ArtProblem {
    const item = INSTRUMENT_QS[rand(0, INSTRUMENT_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'audio', topic: 'Nhạc cụ Việt Nam', topicKey: 'music_instruments',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Hãy nhớ lại các loại nhạc cụ em từng thấy', `Đáp án: ${item.a}`],
    };
}

// ══════════════════════════════════════════════
// Grade 5: Art Appreciation (Cảm thụ nghệ thuật)
// ══════════════════════════════════════════════

const APPRECIATION_QS = [
    { q: 'Khi xem một bức tranh, điều đầu tiên em nên quan sát là gì?', a: 'Tổng thể: màu sắc chủ đạo, bố cục, chủ đề', opts: ['Tổng thể: màu sắc chủ đạo, bố cục, chủ đề', 'Chữ ký họa sĩ', 'Giá bức tranh', 'Kích thước khung'], e: 'Cảm thụ nghệ thuật bắt đầu từ ấn tượng tổng thể: màu sắc, bố cục và chủ đề chính.' },
    { q: 'Bức tranh dùng nhiều màu ấm (đỏ, cam, vàng) thường gợi cảm giác gì?', a: 'Ấm áp, vui tươi, năng động', opts: ['Ấm áp, vui tươi, năng động', 'Buồn bã, lạnh lẽo', 'Sợ hãi', 'Không có cảm giác gì'], e: 'Màu ấm (đỏ, cam, vàng) thường gợi liên tưởng đến lửa, ánh nắng — tạo cảm giác ấm áp, năng động.' },
    { q: 'Trong âm nhạc, bài hát có giai điệu chậm rãi, nhẹ nhàng thường dùng để:', a: 'Hát ru, thư giãn hoặc diễn tả nỗi buồn', opts: ['Hát ru, thư giãn hoặc diễn tả nỗi buồn', 'Nhảy disco', 'Thi đấu thể thao', 'Cổ vũ bóng đá'], e: 'Giai điệu chậm tạo cảm giác bình yên, thích hợp cho hát ru, thiền hoặc diễn tả nỗi nhớ.' },
    { q: 'Họa sĩ Bùi Xuân Phái nổi tiếng với chủ đề gì?', a: 'Phố cổ Hà Nội', opts: ['Phố cổ Hà Nội', 'Biển và tàu thuyền', 'Rừng núi Tây Bắc', 'Chân dung tự họa'], e: 'Bùi Xuân Phái được mệnh danh "phố Phái" vì những bức vẽ phố cổ Hà Nội rất nổi tiếng.' },
    { q: 'Tại sao chúng ta cần học cảm thụ nghệ thuật?', a: 'Để hiểu cái đẹp, biết trân trọng sáng tạo và mở rộng cảm xúc', opts: ['Để hiểu cái đẹp, biết trân trọng sáng tạo và mở rộng cảm xúc', 'Để trở thành họa sĩ', 'Để thi đạt điểm cao', 'Để vẽ nhanh hơn'], e: 'Cảm thụ nghệ thuật giúp em nhìn cuộc sống đa chiều hơn, trân trọng cái đẹp và sáng tạo.' },
];

export function genArtAppreciation(): ArtProblem {
    const item = APPRECIATION_QS[rand(0, APPRECIATION_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'visual', topic: 'Cảm thụ nghệ thuật', topicKey: 'art_appreciation',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Hãy nghĩ: bức tranh/bài hát này khiến em cảm thấy thế nào?', `Đáp án: ${item.a}`],
    };
}

// ── BATCH 10: Hát thiếu nhi — SGK Âm nhạc 1 ──
const HAT_THIEU_NHI = [
    { q: 'Bài "Lý cây xanh" là dân ca miền nào?', a: 'Nam Bộ', opts: ['Nam Bộ', 'Bắc Bộ', 'Trung Bộ', 'Tây Nguyên'], e: '"Lý cây xanh" là bài dân ca Nam Bộ quen thuộc với trẻ em.' },
    { q: 'Bài "Cháu yêu bà" do nhạc sĩ nào sáng tác?', a: 'Xuân Giao', opts: ['Xuân Giao', 'Phong Nhã', 'Văn Cao', 'Trịnh Công Sơn'], e: 'Nhạc sĩ Xuân Giao sáng tác "Cháu yêu bà" — bài hát thiếu nhi rất nổi tiếng.' },
    { q: 'Khi hát, em nên:', a: 'Hít thở sâu, mở miệng rõ ràng', opts: ['Hít thở sâu, mở miệng rõ ràng', 'Hát thật to, la hét', 'Ngậm miệng', 'Nuốt nước bọt liên tục'], e: 'Hít sâu giúp đủ hơi, mở miệng giúp phát âm rõ ràng.' },
    { q: '"Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng" là bài hát gì?', a: 'Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng', opts: ['Ai yêu Bác Hồ Chí Minh hơn thiếu niên nhi đồng', 'Đội ca', 'Quốc ca', 'Em yêu trường em'], e: 'Bài hát của nhạc sĩ Phong Nhã, rất phổ biến trong các hoạt động Đội.' },
];

export function genHatThieuNhi(): ArtProblem {
    const item = HAT_THIEU_NHI[rand(0, HAT_THIEU_NHI.length - 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'audio', topic: 'Hát thiếu nhi', topicKey: 'hat_thieu_nhi',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nhớ lại bài hát em thường hát ở trường', `Đáp án: ${item.a}`],
    };
}

// ── BATCH 10: Vẽ theo mẫu — SGK Mĩ thuật 2 ──
const VE_THEO_MAU = [
    { q: 'Khi vẽ theo mẫu, bước đầu tiên cần làm là:', a: 'Quan sát mẫu vật thật kỹ', opts: ['Quan sát mẫu vật thật kỹ', 'Tô màu ngay', 'Vẽ chi tiết nhỏ', 'Xóa hết giấy'], e: 'Bước 1: quan sát → phác hình → vẽ chi tiết → tô màu.' },
    { q: 'Khi phác hình quả cam, ta dùng hình gì?', a: 'Hình tròn', opts: ['Hình tròn', 'Hình vuông', 'Hình chữ nhật', 'Hình tam giác'], e: 'Quả cam có dạng tròn, nên ta phác bằng hình tròn trước.' },
    { q: 'Để vẽ đẹp hơn, nên dùng bút chì loại nào phác hình?', a: 'Bút chì mềm (2B)', opts: ['Bút chì mềm (2B)', 'Bút bi', 'Bút dạ', 'Bút xóa'], e: 'Bút chì 2B mềm, dễ tẩy khi phác hình, không in đậm.' },
    { q: 'Khi vẽ lọ hoa, phần nào thường cao nhất?', a: 'Bông hoa', opts: ['Bông hoa', 'Thân lọ', 'Đáy lọ', 'Tay cầm'], e: 'Bông hoa nhô lên cao nhất, sau đó là cành lá, rồi lọ.' },
];

export function genVeTheoMau(): ArtProblem {
    const item = VE_THEO_MAU[rand(0, VE_THEO_MAU.length - 1)];
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'visual', topic: 'Vẽ theo mẫu', topicKey: 've_theo_mau',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Quan sát trước, vẽ sau', `Đáp án: ${item.a}`],
    };
}

// ── BATCH 10: Thủ công cắt dán — SGK Mĩ thuật 3 ──
const THU_CONG = [
    { q: 'Khi cắt giấy, tay nào giữ giấy, tay nào cầm kéo?', a: 'Tay trái giữ giấy, tay phải cầm kéo (với người thuận tay phải)', opts: ['Tay trái giữ giấy, tay phải cầm kéo (với người thuận tay phải)', 'Hai tay cùng cắt', 'Không cần giữ giấy', 'Dùng dao thay kéo'], e: 'An toàn: giữ giấy chắc bằng 1 tay, tay thuận cầm kéo cắt theo đường vẽ.' },
    { q: 'Để gấp máy bay giấy, bước đầu tiên thường là:', a: 'Gấp đôi tờ giấy theo chiều dọc', opts: ['Gấp đôi tờ giấy theo chiều dọc', 'Cắt giấy thành hình tròn', 'Tô màu', 'Dán keo'], e: 'Máy bay giấy bắt đầu bằng gấp đôi để tạo đường trục đối xứng.' },
    { q: 'Keo dán tốt nhất cho thủ công trẻ em là loại nào?', a: 'Keo dán hồ (keo sữa)', opts: ['Keo dán hồ (keo sữa)', 'Keo 502', 'Keo dán gỗ', 'Băng keo 2 mặt'], e: 'Keo hồ/keo sữa an toàn, dễ rửa tay, không độc hại cho trẻ em.' },
    { q: 'Khi dán tranh, nên bôi keo ở đâu?', a: 'Mặt sau của hình cần dán', opts: ['Mặt sau của hình cần dán', 'Mặt trước', 'Trên bàn', 'Trên tay'], e: 'Bôi keo mặt sau, lật úp dán lên giấy nền để không lem.' },
];

export function genThuCong(): ArtProblem {
    const item = THU_CONG[rand(0, THU_CONG.length - 1)];
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'visual', topic: 'Thủ công cắt dán', topicKey: 'thu_cong',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nhớ quy tắc an toàn khi dùng kéo', `Đáp án: ${item.a}`],
    };
}

// ── BATCH 10: Trang trí họa tiết — SGK Mĩ thuật 4 ──
const TRANG_TRI = [
    { q: 'Họa tiết là gì?', a: 'Hình vẽ lặp lại dùng để trang trí', opts: ['Hình vẽ lặp lại dùng để trang trí', 'Một bức tranh lớn', 'Một loại bút', 'Tên họa sĩ'], e: 'Họa tiết là các hình cơ bản (hoa, lá, hình học) được lặp lại theo quy luật để trang trí.' },
    { q: 'Trang trí đường diềm thường sắp xếp theo nguyên tắc:', a: 'Xen kẽ và lặp lại (nhắc lại)', opts: ['Xen kẽ và lặp lại (nhắc lại)', 'Ngẫu nhiên', 'Chỉ dùng 1 hình', 'Không theo quy luật'], e: 'Đường diềm = họa tiết lặp lại đều đặn theo 1 hàng, xen kẽ hoặc đối xứng.' },
    { q: 'Khi trang trí hình vuông, điểm nào thường là trung tâm?', a: 'Giao điểm 2 đường chéo', opts: ['Giao điểm 2 đường chéo', 'Góc trên trái', 'Cạnh dưới', 'Ngoài hình vuông'], e: 'Trung tâm hình vuông = giao 2 đường chéo. Họa tiết chính đặt ở trung tâm.' },
    { q: 'Đối xứng trong trang trí là:', a: 'Hai bên giống nhau qua trục', opts: ['Hai bên giống nhau qua trục', 'Hai bên khác nhau', 'Không có quy luật', 'Chỉ dùng 1 màu'], e: 'Đối xứng: 2 nửa giống nhau qua 1 trục (như mặt bướm, hoa).' },
];

export function genTrangTriHoaTiet(): ArtProblem {
    const item = TRANG_TRI[rand(0, TRANG_TRI.length - 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'visual', topic: 'Trang trí họa tiết', topicKey: 'trang_tri_hoa_tiet',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nghĩ về hoa văn trên áo, gạch hoa', `Đáp án: ${item.a}`],
    };
}

// ── BATCH 10: Sáng tác theo chủ đề — SGK Mĩ thuật 5 ──
const SANG_TAC = [
    { q: 'Bước đầu tiên khi sáng tác tranh theo chủ đề là:', a: 'Chọn chủ đề và lên ý tưởng', opts: ['Chọn chủ đề và lên ý tưởng', 'Tô màu ngay', 'Copy tranh mẫu', 'Dùng thước kẻ'], e: 'Sáng tạo bắt đầu từ ý tưởng: chọn chủ đề → phác thảo → hoàn thiện.' },
    { q: 'Bố cục chính phụ trong tranh nghĩa là:', a: 'Nhân vật/vật chính lớn hơn, ở trung tâm', opts: ['Nhân vật/vật chính lớn hơn, ở trung tâm', 'Tất cả bằng nhau', 'Không cần sắp xếp', 'Chỉ vẽ 1 vật'], e: 'Bố cục chính phụ: vật chính to, ở giữa; vật phụ nhỏ, xung quanh → tranh có trọng tâm.' },
    { q: 'Khi vẽ tranh đề tài "Trường em", em nên vẽ gì?', a: 'Trường học, sân trường, bạn bè, hoạt động', opts: ['Trường học, sân trường, bạn bè, hoạt động', 'Biển và cá', 'Rừng rậm', 'Xe ô tô'], e: 'Đề tài "Trường em" cần có hình ảnh trường, học sinh, hoạt động sân trường.' },
    { q: 'Màu nền trong tranh sáng tác nên:', a: 'Hài hòa, tương phản với nhân vật chính', opts: ['Hài hòa, tương phản với nhân vật chính', 'Giống hệt nhân vật', 'Luôn là trắng', 'Luôn là đen'], e: 'Nền tương phản giúp nhân vật nổi bật. VD: nhân vật sáng → nền tối và ngược lại.' },
];

export function genSangTacChuDe(): ArtProblem {
    const item = SANG_TAC[rand(0, SANG_TAC.length - 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'visual', topic: 'Sáng tác theo chủ đề', topicKey: 'sang_tac_chu_de',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Sáng tạo = ý tưởng + kỹ năng + cảm xúc', `Đáp án: ${item.a}`],
    };
}

// ══════════════════════════════════════════════
// TOPIC REGISTRY
// ══════════════════════════════════════════════

export interface ArtTopicInfo {
    key: string;
    name: string;
    gradeLevel: number;
    generator: () => ArtProblem;
    icon: string;
}

export const ART_TOPICS: ArtTopicInfo[] = [
    { key: 'basic_colors', name: 'Màu sắc cơ bản', gradeLevel: 1, generator: genBasicColors, icon: '🎨' },
    { key: 'hat_thieu_nhi', name: 'Hát thiếu nhi', gradeLevel: 1, generator: genHatThieuNhi, icon: '🎤' },
    { key: 'music_rhythm', name: 'Nhịp điệu cơ bản', gradeLevel: 2, generator: genMusicRhythm, icon: '🎵' },
    { key: 've_theo_mau', name: 'Vẽ theo mẫu', gradeLevel: 2, generator: genVeTheoMau, icon: '🖌️' },
    { key: 'shapes_drawing', name: 'Đường nét và hình khối', gradeLevel: 3, generator: genShapesDrawing, icon: '✏️' },
    { key: 'thu_cong', name: 'Thủ công cắt dán', gradeLevel: 3, generator: genThuCong, icon: '✂️' },
    { key: 'music_instruments', name: 'Nhạc cụ Việt Nam', gradeLevel: 4, generator: genMusicalInstruments, icon: '🪕' },
    { key: 'trang_tri_hoa_tiet', name: 'Trang trí họa tiết', gradeLevel: 4, generator: genTrangTriHoaTiet, icon: '🌺' },
    { key: 'art_appreciation', name: 'Cảm thụ nghệ thuật', gradeLevel: 5, generator: genArtAppreciation, icon: '🖼️' },
    { key: 'sang_tac_chu_de', name: 'Sáng tác theo chủ đề', gradeLevel: 5, generator: genSangTacChuDe, icon: '🎭' },
];

export function generateArtSet(grade: number, topicKey?: string, count: number = 10): ArtProblem[] {
    const topics = ART_TOPICS.filter(t => t.gradeLevel <= grade && (!topicKey || t.key === topicKey));
    if (topics.length === 0) return [];
    return Array.from({ length: count }, () => {
        const t = topics[rand(0, topics.length - 1)];
        return t.generator();
    });
}
