// =====================================================
// Computing Generator — CT 2018 Tin học (L3-5)
// Sources: CT 2018 Tin học, Be Internet Awesome (Google), Code.org
// Expanded: 10+ Hardware, 10+ Safety, 10+ Logic questions with illustrations
// =====================================================

export interface ComputingProblem {
    id: string;
    question: string;
    correctAnswer: string;
    options: string[];
    explanation: string;
    difficulty: number;
    hints: string[];
    type: 'safety' | 'logic' | 'hardware' | 'software';
    gradeLevel: number;
    topic: string;
    topicKey: string;
    illustration?: string;
}

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const genId = () => `comp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// ══════════════════════════════════════════════
// Grade 3: Hardware & Basic Operations (10 questions)
// ══════════════════════════════════════════════

const HARDWARE_QS = [
    { q: 'Bộ phận nào hiển thị hình ảnh từ máy tính?', a: 'Màn hình', opts: ['Màn hình', 'Bàn phím', 'Chuột', 'Loa'], e: 'Màn hình (monitor) dùng để hiển thị hình ảnh, chữ viết.' },
    { q: 'Thiết bị nào dùng để điều khiển con trỏ và nhấp chọn trên màn hình?', a: 'Chuột', opts: ['Chuột', 'Bàn phím', 'Loa', 'Máy in'], e: 'Chuột máy tính giúp ta di chuyển con trỏ, nhấp (click) để chọn.' },
    { q: 'Bộ phận nào dùng để gõ chữ và số vào máy tính?', a: 'Bàn phím', opts: ['Bàn phím', 'Chuột', 'Màn hình', 'Microphone'], e: 'Bàn phím (keyboard) có các phím chữ, số để nhập văn bản.' },
    { q: 'Khi gõ xong một đoạn văn, phím nào giúp xuống dòng?', a: 'Phím Enter', opts: ['Phím Enter', 'Phím Space', 'Phím Shift', 'Phím Ctrl'], e: 'Phím Enter có chức năng xuống dòng mới hoặc xác nhận lệnh.' },
    { q: 'Phím nào dùng để tạo khoảng trắng giữa các chữ?', a: 'Phím Space (dấu cách)', opts: ['Phím Space (dấu cách)', 'Phím Enter', 'Phím Tab', 'Phím Shift'], e: 'Phím dài nhất trên bàn phím là phím Space (dấu cách), để tạo khoảng trống.' },
    { q: 'Đâu không phải là máy tính?', a: 'Tủ lạnh', opts: ['Tủ lạnh', 'Điện thoại thông minh', 'Máy tính bảng', 'Máy tính xách tay (Laptop)'], e: 'Điện thoại thông minh và máy tính bảng cũng là những dạng máy tính thu nhỏ.' },
    { q: 'Thiết bị nào giúp in tài liệu từ máy tính ra giấy?', a: 'Máy in (Printer)', opts: ['Máy in (Printer)', 'Loa', 'Webcam', 'Chuột'], e: 'Máy in nhận dữ liệu từ máy tính và in ra giấy (văn bản, hình ảnh).' },
    { q: '"Bộ nhớ" của máy tính giống như cái gì?', a: 'Hộc tủ đựng tài liệu', opts: ['Hộc tủ đựng tài liệu', 'Bút viết', 'Tivi', 'Cái kéo'], e: 'Bộ nhớ (ổ cứng) lưu trữ dữ liệu giống như tủ hồ sơ lưu giấy tờ.' },
    { q: 'CPU của máy tính có vai trò gì?', a: 'Bộ não xử lý mọi lệnh', opts: ['Bộ não xử lý mọi lệnh', 'Hiển thị hình ảnh', 'Phát âm thanh', 'Kết nối mạng'], e: 'CPU (Central Processing Unit) là bộ xử lý trung tâm — bộ não điều khiển mọi thứ.', illustration: '/images/core/computing.svg'},
    { q: 'Khi muốn lưu bài làm trong máy tính, ta dùng lệnh gì?', a: 'Save (Lưu)', opts: ['Save (Lưu)', 'Delete (Xóa)', 'Print (In)', 'Copy (Sao chép)'], e: 'Lệnh Save (Ctrl + S) giúp lưu lại công việc để không bị mất.' },
];

export function genHardware(): ComputingProblem {
    const item = HARDWARE_QS[rand(0, HARDWARE_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'hardware', topic: 'Phần cứng Căn bản', topicKey: 'hardware',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Hãy nhìn vào máy tính của bạn', `Đáp án: ${item.a}`],
        illustration: '/images/core/computing.svg',
    };
}

// ══════════════════════════════════════════════
// Grade 4: Cyber Safety (An toàn mạng — 10 questions)
// ══════════════════════════════════════════════

const SAFETY_QS = [
    { q: 'Mật khẩu (Password) mạnh là mật khẩu như thế nào?', a: 'Dài, có chữ, số, và ký tự đặc biệt', opts: ['Dài, có chữ, số, và ký tự đặc biệt', 'Chỉ dùng số 123456', 'Dùng tên của mình', 'Dùng ngày sinh'], e: 'Mật khẩu mạnh cần khó đoán (trên 8 ký tự, có chữ hoa, chữ thường, số, ký tự đặc biệt).' },
    { q: 'Nếu ai đó trên mạng xin mật khẩu của bạn, bạn nên làm gì?', a: 'Tuyệt đối không cho và báo bố mẹ', opts: ['Tuyệt đối không cho và báo bố mẹ', 'Cho họ nếu họ là bạn', 'Cho nhưng đổi ngay sau đó', 'Cho một nửa'], e: 'Không bao giờ chia sẻ mật khẩu cho bất cứ ai ngoài bố mẹ.' },
    { q: 'Khi thấy tin nhắn từ người lạ nói bạn trúng thưởng, bạn nên:', a: 'Bỏ qua và không nhấn vào link', opts: ['Bỏ qua và không nhấn vào link', 'Nhấn vào link xem thử', 'Nhắn lại để nhận quà', 'Làm theo hướng dẫn'], e: 'Đó có thể là tin nhắn lừa đảo (phishing) để ăn cắp thông tin cá nhân.' },
    { q: 'Thông tin cá nhân nào KHÔNG NÊN chia sẻ công khai trên mạng?', a: 'Địa chỉ nhà và trường học', opts: ['Địa chỉ nhà và trường học', 'Sách yêu thích', 'Món ăn yêu thích', 'Sở thích thể thao'], e: 'Địa chỉ nhà, số điện thoại, mật khẩu là những thông tin cần được giữ kín.' },
    { q: 'Nếu ai đó trêu chọc hoặc bắt nạt bạn trên mạng (Cyberbullying), bạn nên làm gì?', a: 'Chặn họ và kể cho người lớn', opts: ['Chặn họ và kể cho người lớn', 'Chửi lại họ', 'Im lặng và buồn bã', 'Xóa tài khoản'], e: 'Hãy chụp ảnh màn hình làm bằng chứng, chặn người đó và nhờ người lớn giúp đỡ.' },
    { q: 'Trước khi tải (download) một ứng dụng, bạn nên làm gì?', a: 'Hỏi ý kiến bố mẹ hoặc thầy cô', opts: ['Hỏi ý kiến bố mẹ hoặc thầy cô', 'Tải ngay vì miễn phí', 'Chờ bạn tải trước', 'Tải bản crack'], e: 'Nhiều ứng dụng miễn phí chứa virus hoặc thu thập thông tin. Luôn hỏi người lớn.' },
    { q: 'Khi dùng máy tính xong, bạn nên làm gì?', a: 'Tắt máy đúng cách (Shut Down)', opts: ['Tắt máy đúng cách (Shut Down)', 'Rút điện ngay', 'Để mở suốt đêm', 'Đóng nắp laptop luôn'], e: 'Tắt máy đúng cách giúp bảo vệ dữ liệu và kéo dài tuổi thọ máy.' },
    { q: 'Thời gian sử dụng màn hình tối đa mỗi ngày cho trẻ em nên là bao lâu?', a: 'Khoảng 1-2 giờ', opts: ['Khoảng 1-2 giờ', 'Suốt cả ngày', '30 phút', '5 giờ'], e: 'Theo khuyến cáo, trẻ em nên giới hạn thời gian dùng màn hình để bảo vệ mắt và sức khỏe.' },
    { q: 'Khi ngồi dùng máy tính, tư thế nào đúng?', a: 'Lưng thẳng, mắt cách màn hình 50-70cm', opts: ['Lưng thẳng, mắt cách màn hình 50-70cm', 'Nằm trên giường', 'Ngồi xổm', 'Cúi đầu sát màn hình'], e: 'Tư thế đúng giúp tránh đau lưng, mỏi cổ, và bảo vệ mắt.' },
    { q: 'Virus máy tính là gì?', a: 'Phần mềm độc hại làm hỏng máy tính', opts: ['Phần mềm độc hại làm hỏng máy tính', 'Vi khuẩn trong máy', 'Một loại phần cứng', 'Màn hình bị vỡ'], e: 'Virus máy tính là chương trình xấu có thể phá hoại dữ liệu hoặc đánh cắp thông tin.' },
];

export function genCyberSafety(): ComputingProblem {
    const item = SAFETY_QS[rand(0, SAFETY_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'safety', topic: 'An toàn mạng', topicKey: 'cyber_safety',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nghĩ về cách bảo vệ bản thân trên mạng', `Đáp án: ${item.a}`],
        illustration: '/images/core/computing.svg',
    };
}

// ══════════════════════════════════════════════
// Grade 5: Computational Logic & Algorithms (10 questions)
// ══════════════════════════════════════════════

const LOGIC_QS = [
    { q: 'Thuật toán (Algorithm) là gì?', a: 'Một tập hợp các bước để giải quyết vấn đề', opts: ['Một tập hợp các bước để giải quyết vấn đề', 'Một bộ phận máy tính', 'Một loại vi-rút', 'Một mật khẩu'], e: 'Thuật toán giống như "công thức nấu ăn", chỉ dẫn máy tính làm gì từng bước một.' },
    { q: 'Trong lập trình, lỗi sai trong code được gọi là gì?', a: 'Bug', opts: ['Bug', 'Ant', 'Spider', 'Fly'], e: 'Lỗi phần mềm được gọi là "Bug". Sửa lỗi gọi là "Debugging".' },
    { q: 'Thứ tự đúng để pha cốc nước chanh: 1.Khuấy, 2.Vắt chanh, 3.Thêm đường, 4.Thêm nước', a: '2, 3, 4, 1', opts: ['2, 3, 4, 1', '1, 2, 3, 4', '4, 3, 2, 1', '2, 4, 1, 3'], e: 'Thuật toán cần thứ tự hợp lý: Vắt chanh → Thêm đường → Thêm nước → Khuấy.' },
    { q: 'Lặp lại "Tiến 1 bước, Quay phải" 4 lần, nhân vật tạo hình gì?', a: 'Hình vuông', opts: ['Hình vuông', 'Hình tròn', 'Hình tam giác', 'Đường thẳng'], e: 'Tiến và quay phải 90° lặp 4 lần → tạo hình vuông (4 cạnh bằng nhau, 4 góc vuông).' },
    { q: '"Biến" (Variable) trong lập trình giống như cái gì?', a: 'Hộp đựng đồ có dán nhãn tên', opts: ['Hộp đựng đồ có dán nhãn tên', 'Cái kéo', 'Cuốn sách', 'Cây bút'], e: 'Biến giống hộp có tên: bạn đặt tên (score) và cho giá trị vào (score = 10).' },
    { q: 'Lệnh "IF (nếu)... THEN (thì)..." trong lập trình dùng để làm gì?', a: 'Kiểm tra điều kiện rồi quyết định', opts: ['Kiểm tra điều kiện rồi quyết định', 'Lặp lại nhiều lần', 'Lưu dữ liệu', 'Xóa chương trình'], e: 'IF...THEN: NẾU mưa THÌ mang ô. Máy tính kiểm tra điều kiện rồi hành động.' },
    { q: 'Hệ nhị phân (Binary) dùng bao nhiêu chữ số?', a: '2 (chỉ dùng 0 và 1)', opts: ['2 (chỉ dùng 0 và 1)', '10', '8', '16'], e: 'Máy tính dùng hệ nhị phân: chỉ có 0 (tắt) và 1 (bật) để xử lý mọi thông tin.' },
    { q: 'Ai được gọi là "cha đẻ" của máy tính hiện đại?', a: 'Alan Turing', opts: ['Alan Turing', 'Steve Jobs', 'Bill Gates', 'Mark Zuckerberg'], e: 'Alan Turing (1912-1954) được coi là cha đẻ khoa học máy tính với máy Turing nổi tiếng.' },
    { q: 'Internet là gì?', a: 'Mạng lưới kết nối hàng tỷ máy tính trên thế giới', opts: ['Mạng lưới kết nối hàng tỷ máy tính trên thế giới', 'Một phần mềm', 'Một chiếc máy tính lớn', 'Một loại cáp'], e: 'Internet là hệ thống mạng toàn cầu giúp các máy tính trao đổi thông tin.', illustration: '/images/core/computing.svg'},
    { q: 'Scratch là gì?', a: 'Ngôn ngữ lập trình dạng khối cho trẻ em', opts: ['Ngôn ngữ lập trình dạng khối cho trẻ em', 'Một trò chơi điện tử', 'Một mạng xã hội', 'Một loại virus'], e: 'Scratch (MIT) dùng các khối ghép nối để lập trình, phù hợp cho trẻ em từ 8 tuổi.', illustration: '/images/core/computing.svg'},
];

export function genLogic(): ComputingProblem {
    const item = LOGIC_QS[rand(0, LOGIC_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'logic', topic: 'Tư duy máy tính', topicKey: 'comp_logic',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Hãy tưởng tượng bạn đang đưa ra chỉ dẫn', `Đáp án: ${item.a}`],
        illustration: '/images/core/computing.svg',
    };
}

// ── BATCH 10: Soạn thảo văn bản — SGK Tin học 3 ──
const WORD_QS = [
    { q: 'Phần mềm nào dùng để soạn thảo văn bản?', a: 'Microsoft Word', opts: ['Microsoft Word', 'Paint', 'Calculator', 'Media Player'], e: 'Microsoft Word (hoặc LibreOffice Writer) là phần mềm soạn thảo văn bản phổ biến.' },
    { q: 'Muốn in đậm chữ, dùng phím tắt nào?', a: 'Ctrl + B', opts: ['Ctrl + B', 'Ctrl + I', 'Ctrl + U', 'Ctrl + S'], e: 'Ctrl + B = Bold (in đậm). Ctrl + I = Italic (in nghiêng). Ctrl + U = Underline (gạch chân).' },
    { q: 'Muốn lưu file đang soạn, dùng phím tắt nào?', a: 'Ctrl + S', opts: ['Ctrl + S', 'Ctrl + P', 'Ctrl + Z', 'Ctrl + N'], e: 'Ctrl + S = Save (lưu). Nên lưu thường xuyên để không mất dữ liệu.' },
    { q: 'Muốn hoàn tác (undo) thao tác vừa làm, bấm:', a: 'Ctrl + Z', opts: ['Ctrl + Z', 'Ctrl + Y', 'Ctrl + X', 'Ctrl + V'], e: 'Ctrl + Z = Undo (hoàn tác). Ctrl + Y = Redo (làm lại).' },
    { q: 'Cách nào để chèn hình ảnh vào Word?', a: 'Vào Insert → Picture', opts: ['Vào Insert → Picture', 'Vào File → Open', 'Vào Edit → Paste', 'Vào View → Zoom'], e: 'Tab Insert chứa các lệnh chèn: hình, bảng, biểu đồ, liên kết.' },
];

export function genWordProcessing(): ComputingProblem {
    const item = WORD_QS[rand(0, WORD_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'hardware', topic: 'Soạn thảo văn bản', topicKey: 'word_processing',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nhớ các phím tắt cơ bản', `Đáp án: ${item.a}`],
        illustration: '/images/core/computing.svg',
    };
}

// ── BATCH 10: Vẽ trên máy tính (Paint) — SGK Tin học 4 ──
const PAINT_QS = [
    { q: 'Phần mềm Paint dùng để làm gì?', a: 'Vẽ hình và tô màu', opts: ['Vẽ hình và tô màu', 'Soạn văn bản', 'Tính toán', 'Nghe nhạc'], e: 'Paint là phần mềm vẽ đơn giản có sẵn trên Windows.' },
    { q: 'Công cụ nào dùng để tô màu vùng kín trong Paint?', a: 'Fill with color (thùng sơn)', opts: ['Fill with color (thùng sơn)', 'Pencil (bút chì)', 'Eraser (tẩy)', 'Text (chữ)'], e: 'Fill with color (biểu tượng thùng sơn) tô màu toàn bộ vùng kín.' },
    { q: 'Công cụ Eraser trong Paint dùng để:', a: 'Xóa phần hình đã vẽ', opts: ['Xóa phần hình đã vẽ', 'Vẽ đường thẳng', 'Tô màu', 'Phóng to hình'], e: 'Eraser (tẩy) dùng để xóa phần hình không mong muốn.' },
    { q: 'Muốn vẽ hình tròn hoàn hảo trong Paint, giữ phím gì khi vẽ?', a: 'Shift', opts: ['Shift', 'Ctrl', 'Alt', 'Enter'], e: 'Giữ Shift khi dùng Ellipse tool sẽ vẽ được hình tròn (không bị méo).' },
    { q: 'Làm cách nào để lưu file Paint dưới dạng ảnh?', a: 'File → Save As → chọn định dạng (PNG, JPG)', opts: ['File → Save As → chọn định dạng (PNG, JPG)', 'Edit → Copy', 'View → Zoom', 'Tools → Color picker'], e: 'Save As cho phép chọn định dạng ảnh: PNG (chất lượng cao), JPG (nhỏ gọn).' },
];

export function genPaintDrawing(): ComputingProblem {
    const item = PAINT_QS[rand(0, PAINT_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'hardware', topic: 'Vẽ trên máy tính', topicKey: 'paint_drawing',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Mở Paint ra thử', `Đáp án: ${item.a}`],
        illustration: '/images/core/computing.svg',
    };
}

// ── BATCH 10: Lập trình Scratch cơ bản — SGK Tin học 5 ──
const SCRATCH_QS = [
    { q: 'Trong Scratch, nhân vật được gọi là gì?', a: 'Sprite', opts: ['Sprite', 'Block', 'Stage', 'Script'], e: 'Sprite là nhân vật trong Scratch. Mặc định là chú mèo Scratch Cat.' },
    { q: 'Khối "move 10 steps" làm nhân vật di chuyển thế nào?', a: 'Tiến 10 bước', opts: ['Tiến 10 bước', 'Lùi 10 bước', 'Quay 10 độ', 'Nhảy lên'], e: 'Move 10 steps = di chuyển sprite 10 bước theo hướng hiện tại.' },
    { q: 'Khối "repeat 5" có nghĩa là:', a: 'Lặp lại 5 lần', opts: ['Lặp lại 5 lần', 'Chờ 5 giây', 'Di chuyển 5 bước', 'Xóa 5 sprite'], e: 'Repeat = lặp. Repeat 5 lặp lại các khối bên trong đúng 5 lần.' },
    { q: 'Sân khấu (Stage) trong Scratch có kích thước bao nhiêu?', a: '480 × 360 pixels', opts: ['480 × 360 pixels', '100 × 100', '1920 × 1080', '640 × 480'], e: 'Stage Scratch = 480 × 360 pixel, tâm tại (0, 0).' },
    { q: 'Khối nào thuộc nhóm "Events" (Sự kiện)?', a: 'When green flag clicked', opts: ['When green flag clicked', 'Move 10 steps', 'Say hello', 'Change color'], e: '"When green flag clicked" khởi chạy chương trình khi nhấn cờ xanh.' },
];

export function genScratchBasic(): ComputingProblem {
    const item = SCRATCH_QS[rand(0, SCRATCH_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'logic', topic: 'Lập trình Scratch', topicKey: 'scratch_basic',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Mở Scratch online: scratch.mit.edu', `Đáp án: ${item.a}`],
        illustration: '/images/core/computing.svg',
    };
}

// ── BATCH 13: Internet cơ bản (G3) ──
const INTERNET_QS = [
    { q: 'Internet dùng để làm gì?', a: 'Tìm kiếm thông tin, liên lạc, học tập', opts: ['Tìm kiếm thông tin, liên lạc, học tập', 'Chỉ chơi game', 'Chỉ xem phim', 'Không có ích'], e: 'Internet = mạng toàn cầu, giúp tìm kiếm, liên lạc, học tập, giải trí.' },
    { q: 'Trình duyệt web (browser) nào phổ biến nhất?', a: 'Google Chrome', opts: ['Google Chrome', 'Microsoft Word', 'Calculator', 'Paint'], e: 'Browser: Chrome, Firefox, Edge, Safari — dùng để truy cập website.' },
    { q: 'URL là gì?', a: 'Địa chỉ trang web', opts: ['Địa chỉ trang web', 'Tên máy tính', 'Loại file', 'Phần mềm'], e: 'URL (Uniform Resource Locator) = địa chỉ trang web, ví dụ: google.com.' },
    { q: 'Khi lên mạng, KHÔNG nên làm gì?', a: 'Chia sẻ mật khẩu với người lạ', opts: ['Chia sẻ mật khẩu với người lạ', 'Tìm kiếm bài học', 'Đọc tin tức', 'Gửi email cho bạn'], e: 'Không chia sẻ mật khẩu, thông tin cá nhân (địa chỉ nhà, SĐT) với người lạ.' },
    { q: 'Trang web google.com dùng để:', a: 'Tìm kiếm thông tin', opts: ['Tìm kiếm thông tin', 'Soạn văn bản', 'Vẽ hình', 'Nghe nhạc'], e: 'Google là công cụ tìm kiếm (search engine) phổ biến nhất thế giới.' },
];

export function genInternetBasic(): ComputingProblem {
    const item = INTERNET_QS[rand(0, INTERNET_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'software', topic: 'Internet cơ bản', topicKey: 'internet_basic',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Internet = mạng toàn cầu', `Đáp án: ${item.a}`],
        illustration: '/images/core/computing.svg',
    };
}

// ── BATCH 13: Bảng tính Excel (G4) ──
const EXCEL_QS = [
    { q: 'Phần mềm bảng tính phổ biến nhất là:', a: 'Microsoft Excel', opts: ['Microsoft Excel', 'Microsoft Word', 'PowerPoint', 'Paint'], e: 'Excel (hoặc Google Sheets) dùng để tạo bảng, tính toán, vẽ biểu đồ.' },
    { q: 'Ô A1 trong Excel nằm ở đâu?', a: 'Cột A, hàng 1 (góc trên trái)', opts: ['Cột A, hàng 1 (góc trên trái)', 'Cột 1, hàng A', 'Ở giữa', 'Góc dưới phải'], e: 'Excel dùng chữ cái cho cột (A, B, C...) và số cho hàng (1, 2, 3...).' },
    { q: 'Hàm nào dùng để tính tổng trong Excel?', a: '=SUM()', opts: ['=SUM()', '=MAX()', '=AVG()', '=COUNT()'], e: '=SUM(A1:A10) tính tổng các ô từ A1 đến A10.' },
    { q: 'Muốn tính trung bình, dùng hàm nào?', a: '=AVERAGE()', opts: ['=AVERAGE()', '=SUM()', '=MAX()', '=MIN()'], e: '=AVERAGE() tính trung bình cộng. VD: =AVERAGE(B1:B5).' },
    { q: 'Biểu đồ (chart) trong Excel dùng để:', a: 'Trình bày dữ liệu trực quan', opts: ['Trình bày dữ liệu trực quan', 'Soạn văn bản', 'Vẽ hình', 'Chơi game'], e: 'Biểu đồ giúp nhìn dữ liệu dễ hiểu hơn: cột, tròn, đường...' },
];

export function genExcelBasic(): ComputingProblem {
    const item = EXCEL_QS[rand(0, EXCEL_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'software', topic: 'Bảng tính Excel', topicKey: 'excel_basic',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Excel = bảng tính, =SUM() tính tổng', `Đáp án: ${item.a}`],
        illustration: '/images/core/computing.svg',
    };
}

// ── BATCH 13: Thuyết trình PowerPoint (G5) ──
const PPT_QS = [
    { q: 'Phần mềm nào dùng để tạo bài thuyết trình?', a: 'PowerPoint', opts: ['PowerPoint', 'Excel', 'Word', 'Paint'], e: 'PowerPoint (hoặc Google Slides) dùng để tạo slide trình bày.' },
    { q: 'Mỗi trang trong PowerPoint gọi là gì?', a: 'Slide', opts: ['Slide', 'Sheet', 'Page', 'Document'], e: 'Slide = 1 trang trình chiếu. Bài thuyết trình gồm nhiều slide.' },
    { q: 'Hiệu ứng chuyển slide gọi là:', a: 'Transition', opts: ['Transition', 'Animation', 'Design', 'Layout'], e: 'Transition = hiệu ứng chuyển giữa 2 slide. Animation = hiệu ứng cho đối tượng trên slide.' },
    { q: 'Khi thuyết trình, phím nào dùng để chiếu toàn màn hình?', a: 'F5', opts: ['F5', 'F1', 'F12', 'Esc'], e: 'F5 = trình chiếu từ đầu. Shift+F5 = trình chiếu từ slide hiện tại.' },
    { q: 'Quy tắc vàng khi làm slide:', a: 'Ít chữ, nhiều hình, rõ ràng', opts: ['Ít chữ, nhiều hình, rõ ràng', 'Viết thật nhiều chữ', 'Dùng nhiều màu sặc sỡ', 'Để trống slide'], e: 'Slide tốt: ít chữ, hình ảnh minh họa, font rõ ràng, màu hài hòa.' },
];

export function genPowerPoint(): ComputingProblem {
    const item = PPT_QS[rand(0, PPT_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'software', topic: 'Thuyết trình PowerPoint', topicKey: 'ppt_basic',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Slide = trang trình bày, F5 = chiếu', `Đáp án: ${item.a}`],
        illustration: '/images/core/computing.svg',
    };
}

// ══════════════════════════════════════════════
// TOPIC REGISTRY
// ══════════════════════════════════════════════

export interface CompTopicInfo {
    key: string;
    name: string;
    gradeLevel: number;
    generator: () => ComputingProblem;
    icon: string;
}

export const COMPUTING_TOPICS: CompTopicInfo[] = [
    { key: 'hardware', name: 'Phần cứng Căn bản', gradeLevel: 3, generator: genHardware, icon: '💻' },
    { key: 'word_processing', name: 'Soạn thảo văn bản', gradeLevel: 3, generator: genWordProcessing, icon: '📝' },
    { key: 'internet_basic', name: 'Internet cơ bản', gradeLevel: 3, generator: genInternetBasic, icon: '🌐' },
    { key: 'cyber_safety', name: 'An toàn mạng', gradeLevel: 4, generator: genCyberSafety, icon: '🛡️' },
    { key: 'paint_drawing', name: 'Vẽ trên máy tính', gradeLevel: 4, generator: genPaintDrawing, icon: '🎨' },
    { key: 'excel_basic', name: 'Bảng tính Excel', gradeLevel: 4, generator: genExcelBasic, icon: '📊' },
    { key: 'comp_logic', name: 'Tư duy máy tính', gradeLevel: 5, generator: genLogic, icon: '🧠' },
    { key: 'scratch_basic', name: 'Lập trình Scratch', gradeLevel: 5, generator: genScratchBasic, icon: '🐱' },
    { key: 'ppt_basic', name: 'Thuyết trình PowerPoint', gradeLevel: 5, generator: genPowerPoint, icon: '📽️' },
];

export function generateComputingSet(grade: number, topicKey?: string, count: number = 10): ComputingProblem[] {
    const topics = COMPUTING_TOPICS.filter(t => t.gradeLevel <= grade && (!topicKey || t.key === topicKey));
    if (topics.length === 0) return [];
    return Array.from({ length: count }, () => {
        const t = topics[rand(0, topics.length - 1)];
        return t.generator();
    });
}
