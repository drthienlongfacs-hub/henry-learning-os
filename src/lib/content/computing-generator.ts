// =====================================================
// Computing Generator — CT 2018 Tin học (L3-5)
// Sources: CT 2018 Tin học, Be Internet Awesome (Google), Code.org
// =====================================================

export interface ComputingProblem {
    id: string;
    question: string;
    correctAnswer: string;
    options: string[];
    explanation: string;
    difficulty: number;
    hints: string[];
    type: 'safety' | 'logic' | 'hardware';
    gradeLevel: number;
    topic: string;
    topicKey: string;
}

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const genId = () => `comp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const shuffle = <T>(arr: T[]): T[] => {
    const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = rand(0, i);[a[i], a[j]] = [a[j], a[i]]; } return a;
};

// ══════════════════════════════════════════════
// Grade 3: Hardware & Basic Operations
// ══════════════════════════════════════════════

const HARDWARE_QS = [
    { q: 'Bộ phận nào hiển thị hình ảnh từ máy tính?', a: 'Màn hình', opts: ['Màn hình', 'Bàn phím', 'Chuột', 'Loa'], e: 'Màn hình (monitor) dùng để hiển thị hình ảnh, chữ viết.' },
    { q: 'Thiết bị nào dùng để điều khiển con trỏ và nhấp chọn trên màn hình?', a: 'Chuột', opts: ['Chuột', 'Bàn phím', 'Loa', 'Máy in'], e: 'Chuột máy tính giúp ta di chuyển con trỏ, nhấp (click) để chọn.' },
    { q: 'Bộ phận nào dùng để gõ chữ và số vào máy tính?', a: 'Bàn phím', opts: ['Bàn phím', 'Chuột', 'Màn hình', 'Microphone'], e: 'Bàn phím (keyboard) có các phím chữ, số để nhập văn bản.' },
    { q: 'Khi gõ xong một đoạn văn, phím nào giúp xuống dòng?', a: 'Phím Enter', opts: ['Phím Enter', 'Phím Space', 'Phím Shift', 'Phím Ctrl'], e: 'Phím Enter có chức năng xuống dòng mới hoặc xác nhận lệnh.' },
    { q: 'Phím nào dùng để tạo khoảng trắng giữa các chữ?', a: 'Phím Space (dấu cách)', opts: ['Phím Space (dấu cách)', 'Phím Enter', 'Phím Tab', 'Phím Shift'], e: 'Phím dài nhất trên bàn phím là phím Space (dấu cách), để tạo khoảng trống.' },
    { q: 'Đâu không phải là máy tính?', a: 'Tủ lạnh', opts: ['Tủ lạnh', 'Điện thoại thông minh', 'Máy tính bảng', 'Máy tính xách tay (Laptop)'], e: 'Điện thoại thông minh và máy tính bảng cũng là những dạng máy tính thu nhỏ.' },
];

export function genHardware(): ComputingProblem {
    const item = HARDWARE_QS[rand(0, HARDWARE_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'hardware', topic: 'Phần cứng Căn bản', topicKey: 'hardware',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Hãy nhìn vào máy tính của bạn', `Đáp án: ${item.a}`],
    };
}

// ══════════════════════════════════════════════
// Grade 4: Cyber Safety (An toàn mạng)
// ══════════════════════════════════════════════

const SAFETY_QS = [
    { q: 'Mật khẩu (Password) mạnh là mật khẩu như thế nào?', a: 'Dài, có chữ, số, và ký tự đặc biệt', opts: ['Dài, có chữ, số, và ký tự đặc biệt', 'Chỉ dùng số 123456', 'Dùng tên của mình', 'Dùng ngày sinh'], e: 'Mật khẩu mạnh cần khó đoán (trên 8 ký tự, có chữ hoa, chữ thường, số, ký tự đặc biệt).' },
    { q: 'Nếu ai đó trên mạng xin mật khẩu của bạn, bạn nên làm gì?', a: 'Tuyệt đối không cho và báo bố mẹ', opts: ['Tuyệt đối không cho và báo bố mẹ', 'Cho họ nếu họ là bạn', 'Cho nhưng đổi ngay sau đó', 'Cho một nửa'], e: 'Không bao giờ chia sẻ mật khẩu ảo cho bất cứ ai ngoài người lớn tin cậy (bố mẹ).' },
    { q: 'Khi thấy một tin nhắn từ người lạ nói bạn trúng thưởng, bạn nên:', a: 'Bỏ qua và không nhấn vào link', opts: ['Bỏ qua và không nhấn vào link', 'Nhấn vào link xem thử', 'Nhắn lại để nhận quà', 'Làm theo hướng dẫn'], e: 'Đó có thể là tin nhắn lừa đảo (phishing) để ăn cắp thông tin cá nhân.' },
    { q: 'Thông tin cá nhân nào KHÔNG NÊN chia sẻ công khai trên mạng?', a: 'Địa chỉ nhà và trường học', opts: ['Địa chỉ nhà và trường học', 'Sách yêu thích', 'Món ăn yêu thích', 'Sở thích thể thao'], e: 'Địa chỉ nhà, số điện thoại, mật khẩu là những thông tin cần được giữ kín.' },
    { q: 'Nếu ai đó trêu chọc hoặc bắt nạt bạn trên mạng (Cyberbullying), bạn nên làm gì?', a: 'Chặn họ và kể cho người lớn (bố mẹ/thầy cô)', opts: ['Chặn họ và kể cho người lớn (bố mẹ/thầy cô)', 'Chửi lại họ', 'Im lặng và buồn bã', 'Xóa tài khoản'], e: 'Hãy chụp ảnh màn hình làm bằng chứng, chặn người đó và nhờ người lớn giúp đỡ.' },
];

export function genCyberSafety(): ComputingProblem {
    const item = SAFETY_QS[rand(0, SAFETY_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'safety', topic: 'An toàn mạng', topicKey: 'cyber_safety',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Nghĩ về cách bảo vệ bản thân trên mạng', `Đáp án: ${item.a}`],
    };
}

// ══════════════════════════════════════════════
// Grade 5: Computational Logic & Algorithms
// ══════════════════════════════════════════════

const LOGIC_QS = [
    { q: 'Thuật toán (Algorithm) là gì?', a: 'Một tập hợp các bước để giải quyết vấn đề', opts: ['Một tập hợp các bước để giải quyết vấn đề', 'Một bộ phận máy tính', 'Một loại vi-rút', 'Một mật khẩu'], e: 'Thuật toán giống như một "công thức nấu ăn", chỉ dẫn máy tính làm gì từng bước một.' },
    { q: 'Trong lập trình, lỗi (Lỗi sai trong code) được gọi là gì?', a: 'Bug', opts: ['Bug', 'Ant', 'Spider', 'Fly'], e: 'Lỗi phần mềm thường được gọi là "Bug". Sửa lỗi gọi là "Debugging".' },
    { q: 'Thứ tự đúng để pha một cốc nước chanh (Sắp xếp thuật toán): 1.Khuấy đều, 2.Vắt chanh, 3.Thêm đường vào cốc, 4.Thêm nước', a: '2, 3, 4, 1', opts: ['2, 3, 4, 1', '1, 2, 3, 4', '4, 3, 2, 1', '2, 4, 1, 3'], e: 'Thuật toán cần có thứ tự hợp lý: Vắt chanh → Thêm đường → Thêm nước → Khuấy.' },
    { q: 'Nếu dùng vòng lặp "Lặp lại 3 lần" cho lệnh "Tiến 1 bước, Quay phải", nhân vật sẽ tạo ra hình gì (Gần tạo thành)?', a: 'Hình vuông chưa đóng', opts: ['Hình vuông chưa đóng', 'Hình tròn', 'Hình bầu dục', 'Đường thẳng'], e: 'Tiến và quay phải 3 lần, bạn sẽ vẽ được 3 cạnh của 1 hình vuông.' },
];

export function genLogic(): ComputingProblem {
    const item = LOGIC_QS[rand(0, LOGIC_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'logic', topic: 'Tư duy máy tính', topicKey: 'comp_logic',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Hãy tưởng tượng bạn đang đưa ra chỉ dẫn', `Đáp án: ${item.a}`],
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
    { key: 'cyber_safety', name: 'An toàn mạng', gradeLevel: 4, generator: genCyberSafety, icon: '🛡️' },
    { key: 'comp_logic', name: 'Tư duy máy tính', gradeLevel: 5, generator: genLogic, icon: '🧠' },
];

export function generateComputingSet(grade: number, topicKey?: string, count: number = 10): ComputingProblem[] {
    const topics = COMPUTING_TOPICS.filter(t => t.gradeLevel <= grade && (!topicKey || t.key === topicKey));
    if (topics.length === 0) return [];
    return Array.from({ length: count }, () => {
        const t = topics[rand(0, topics.length - 1)];
        return t.generator();
    });
}
