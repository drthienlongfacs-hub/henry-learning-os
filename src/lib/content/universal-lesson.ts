// Universal Lesson Content Generator — all 8 subjects
// Template-based: generates lesson from topic metadata
// English units: data-driven from english-units-g*.ts (92 units, G1-G5)

import { GRADE1_UNITS, GRADE2_UNITS } from '@/data/english-units-g1g2';
import { GRADE3_UNITS } from '@/data/english-units-g3';
import { GRADE4_UNITS } from '@/data/english-units-g4';
import { GRADE5_UNITS } from '@/data/english-units-g5';

// ── Cached English unit lookup (lazy-initialized, O(1) per lookup) ──
interface _EnglishUnitEntry {
  vocabulary: { en: string; vi: string }[];
  patterns: { pattern: string; example: string; exampleVi: string }[];
}
let _englishUnitMap: Map<string, _EnglishUnitEntry> | null = null;

function _getEnglishUnit(unitId: string): _EnglishUnitEntry | undefined {
  if (!_englishUnitMap) {
    _englishUnitMap = new Map();
    const allUnits = [
      ...GRADE1_UNITS, ...GRADE2_UNITS,
      ...GRADE3_UNITS, ...GRADE4_UNITS, ...GRADE5_UNITS,
    ];
    for (const u of allUnits) {
      if (u.vocabulary?.length > 0) {
        _englishUnitMap.set(u.unitId, {
          vocabulary: u.vocabulary,
          patterns: u.patterns ?? [],
        });
      }
    }
  }
  return _englishUnitMap.get(unitId);
}
export interface UniversalLesson {
  title: string;
  titleVi: string;
  icon: string;
  grade: number;
  subject: string;
  sections: { type: string; title: string; items: string[] }[];
}

// Subject-specific lesson templates
const SUBJECT_LESSONS: Record<
  string,
  Record<string, { concepts: string[]; examples: string[]; tips: string[] }>
> = {
  math: {
    add_sub_10: {
      concepts: [
        "Cộng: gộp hai nhóm lại → 3 + 2 = 5",
        "Trừ: bớt đi → 5 - 2 = 3",
        "Số 0: cộng 0 giữ nguyên → 4 + 0 = 4",
        "Đổi chỗ: 3 + 2 = 2 + 3",
      ],
      examples: [
        "🍎🍎🍎 + 🍎🍎 = 🍎🍎🍎🍎🍎 → 3 + 2 = 5",
        "🖐️5 ngón - ✌️2 ngón = 3 ngón → 5 - 2 = 3",
      ],
      tips: ["Dùng ngón tay đếm", "Vẽ chấm tròn ra giấy"],
    },
    add_sub_20: {
      concepts: [
        "Cộng qua 10: tách để tròn 10 → 8 + 5 = 8 + 2 + 3 = 13",
        "Trừ qua 10: 15 - 7 = 15 - 5 - 2 = 8",
        "Bảng cộng trừ trong 20 cần thuộc lòng",
      ],
      examples: [
        "9 + 4 = 9 + 1 + 3 = 10 + 3 = 13",
        "16 - 8 = 16 - 6 - 2 = 10 - 2 = 8",
      ],
      tips: [
        "Tách số nhỏ để tròn 10",
        "Học thuộc các cặp bù 10: 1+9, 2+8, 3+7, 4+6, 5+5",
      ],
    },
    number_bonds: {
      concepts: [
        "Tách số: 5 = 1+4 = 2+3",
        "Ghép số: 2 và 3 ghép thành 5",
        "Mỗi số có nhiều cách tách",
      ],
      examples: ["7 = 1+6 = 2+5 = 3+4", "10 = 1+9 = 2+8 = 3+7 = 4+6 = 5+5"],
      tips: ["Dùng que tính chia 2 nhóm", "Vẽ sơ đồ hình cây"],
    },
    count_20: {
      concepts: [
        "Đếm xuôi: 1, 2, 3... 20",
        "Đếm ngược: 20, 19, 18...",
        "So sánh: > lớn hơn, < nhỏ hơn, = bằng nhau",
      ],
      examples: [
        '11 đọc là "mười một"',
        "15 > 12 vì 15 đứng sau 12",
        "Đếm 2, 4, 6, 8, 10... (đếm cách 2)",
      ],
      tips: ["Đếm đồ vật trong nhà", "Chơi trốn tìm đếm ngược từ 20"],
    },
    mul_table: {
      concepts: [
        "Nhân = cộng nhiều lần: 3 × 4 = 3 + 3 + 3 + 3 = 12",
        "Bảng cửu chương: học từ 2 đến 9",
        "Đổi chỗ: 3 × 4 = 4 × 3",
      ],
      examples: [
        "2 × 5 = 10 (2 nhóm, mỗi nhóm 5)",
        "5 × 3 = 15 (đếm cách 5: 5, 10, 15)",
      ],
      tips: ["Hát bảng cửu chương", "Xếp đồ vật thành hàng để đếm"],
    },
    division: {
      concepts: [
        "Chia = phân đều: 12 ÷ 3 = 4 (chia 12 thành 3 nhóm bằng nhau)",
        "Chia là phép ngược của nhân: 12 ÷ 3 = 4 vì 3 × 4 = 12",
        "Chia có dư: 13 ÷ 3 = 4 dư 1",
      ],
      examples: [
        "15 ÷ 5 = 3 (chia 15 kẹo cho 5 bạn)",
        "20 ÷ 4 = 5 (xếp 20 bạn thành 4 hàng)",
      ],
      tips: ["Dùng bảng nhân ngược lại", "Chia kẹo, đồ chơi cho bạn bè"],
    },
    fractions: {
      concepts: [
        "Phân số = một phần: 1/2 = một nửa",
        "1/4 = một phần tư (chia pizza 4 miếng, lấy 1)",
        "Tử số (trên) / Mẫu số (dưới)",
      ],
      examples: [
        "🍕 chia 4 → mỗi miếng = 1/4",
        "1/2 + 1/2 = 1 (hai nửa = một cái)",
      ],
      tips: ["Gấp giấy để thấy phân số", "Chia bánh, chia nước"],
    },
    geometry: {
      concepts: [
        "Hình vuông: 4 cạnh bằng nhau, 4 góc vuông",
        "Hình chữ nhật: 2 cạnh dài bằng nhau, 2 cạnh ngắn bằng nhau",
        "Hình tam giác: 3 cạnh, 3 góc",
        "Hình tròn: không có cạnh, không có góc",
      ],
      examples: [
        "Cửa sổ = hình chữ nhật",
        "Bánh xe = hình tròn",
        "Mái nhà = hình tam giác",
      ],
      tips: ["Tìm hình trong nhà", "Vẽ hình bằng thước kẻ"],
    },
    measurement: {
      concepts: [
        "Đo chiều dài: cm, m, km",
        "Đo khối lượng: g, kg",
        "Đo thời gian: giờ, phút",
        "Đo dung tích: ml, l",
      ],
      examples: ["Cây bút dài 15 cm", "Túi gạo nặng 5 kg", "1 giờ = 60 phút"],
      tips: ["Dùng thước đo đồ vật", "Đọc đồng hồ mỗi giờ"],
    },
    time_calendar: {
      concepts: [
        "Đồng hồ: kim giờ (ngắn), kim phút (dài)",
        "1 ngày = 24 giờ, 1 tuần = 7 ngày",
        "1 năm = 12 tháng",
        "Đọc lịch: ngày, thứ, tháng",
      ],
      examples: ["7:30 = bảy giờ ba mươi phút", "Thứ Hai, Thứ Ba... Chủ Nhật"],
      tips: ["Xem đồng hồ mỗi bữa ăn", "Đánh dấu ngày đặc biệt trên lịch"],
    },
    shapes_g1: {
      concepts: [
        "Nhận biết hình vuông, hình tròn, hình tam giác, hình chữ nhật",
        "Hình vuông có 4 cạnh bằng nhau, hình tròn không có cạnh",
        "Đếm số góc và số cạnh của mỗi hình",
      ],
      examples: ["Cái bánh xe là hình tròn", "Mái nhà thường là hình tam giác"],
      tips: [
        "Hãy tìm các đồ vật trong nhà có hình dạng tương ứng",
        "Vẽ các hình học cơ bản ra giấy để dễ nhớ",
      ],
    },
    shapes_3d: {
      concepts: [
        "Khối lập phương, khối hộp chữ nhật, khối cầu, khối trụ",
        "Phân biệt hình phẳng (2D) và hình khối (3D)",
        "Khối cầu lăn được, khối hộp không lăn được",
      ],
      examples: ["Quả bóng là khối cầu", "Hộp sữa là khối hộp chữ nhật"],
      tips: [
        "Cầm các đồ vật thật lên để cảm nhận các mặt, các góc",
        "Hãy thử xem vật nào lăn được trên sàn",
      ],
    },
    compare_g1: {
      concepts: [
        "So sánh lớn hơn (>), bé hơn (<), bằng nhau (=)",
        "Số nào đếm sau thì lớn hơn",
        "Dùng tia số để so sánh",
      ],
      examples: ["5 > 3 vì 5 đứng sau 3", "7 = 7 vì số lượng bằng nhau"],
      tips: [
        "Mũi nhọn luôn chĩa về số bé hơn",
        "Đếm lại từ 1 để xem số nào đến trước",
      ],
    },
    ordinal_spatial: {
      concepts: [
        "Số thứ tự: thứ nhất, thứ hai, thứ ba...",
        "Vị trí: trên-dưới, trước-sau, trái-phải",
        "Xác định hướng của bản thân",
      ],
      examples: [
        "Bạn đứng đầu hàng là người thứ nhất",
        "Bóng đèn ở trên, mặt sàn ở dưới",
      ],
      tips: [
        "Đứng cùng các bạn và đếm thứ tự",
        "Giơ tay phải, tay trái để xác định hướng",
      ],
    },
    count_100: {
      concepts: [
        "Đếm xuôi và đếm ngược trong phạm vi 100",
        "Nhận biết hàng chục và hàng đơn vị",
        "Đếm nhảy 10: 10, 20, 30...",
      ],
      examples: ["Số 45 có 4 chục và 5 đơn vị", "98, 99, 100"],
      tips: [
        "Sử dụng bảng 100 số để tìm quy luật",
        "Nhóm các que tính thành từng bó 10 que",
      ],
    },
    measure_length: {
      concepts: [
        "Đơn vị đo độ dài: xăng-ti-mét (cm)",
        "Dùng thước thẳng có vạch chia cm",
        "Đặt một đầu vật vào vạch số 0",
      ],
      examples: ["Cây bút chì dài 15 cm", "Quyển sách dài 20 cm"],
      tips: [
        "Luôn nhớ bắt đầu đo từ vạch số 0, không phải từ đầu thước",
        "Ghi thêm chữ 'cm' sau kết quả",
      ],
    },
    days_of_week: {
      concepts: [
        "Một tuần có 7 ngày",
        "Thứ Hai đến Thứ Bảy, và Chủ Nhật",
        "Hôm nay, hôm qua, ngày mai",
      ],
      examples: ["Hôm nay là Thứ Ba, ngày mai là Thứ Tư", "Hôm qua là Thứ Hai"],
      tips: ["Hát bài hát về các ngày trong tuần", "Nhìn lịch mỗi buổi sáng"],
    },
    clock_g1: {
      concepts: [
        "Kim ngắn chỉ giờ, kim dài chỉ phút",
        "Đọc giờ đúng (kim dài chỉ số 12)",
        "Nhận biết các thời điểm trong ngày: sáng, trưa, chiều, tối",
      ],
      examples: [
        "Kim ngắn chỉ số 7, kim dài chỉ 12 là 7 giờ",
        "Sáng đi học lúc 7 giờ",
      ],
      tips: [
        "Làm một cái đồng hồ bằng bìa cứng để thực hành xoay kim",
        "Hỏi bố mẹ bây giờ là mấy giờ",
      ],
    },
    zero_ops: {
      concepts: [
        "Số 0 cộng với số nào cũng bằng chính số đó",
        "Một số cộng hoặc trừ với 0 thì không thay đổi",
        "Hai số giống nhau trừ cho nhau bằng 0",
      ],
      examples: ["5 + 0 = 5", "8 - 8 = 0"],
      tips: [
        "Tưởng tượng bạn có 5 cái kẹo, không ai cho thêm cái nào, bạn vẫn có 5",
        "0 nghĩa là 'không có gì'",
      ],
    },
    word_g1: {
      concepts: [
        "Toán có lời văn dạng thêm vào (phép cộng)",
        "Toán có lời văn dạng bớt đi (phép trừ)",
        "Tìm từ khóa: 'tất cả', 'còn lại'",
      ],
      examples: [
        "Có 3 con chim, bay đến 2 con. Tất cả có 5 con.",
        "Có 4 quả táo, ăn mất 1 quả. Còn lại 3 quả.",
      ],
      tips: [
        "Vẽ hình đơn giản để minh họa đề bài",
        "Gạch chân các số và từ khóa quan trọng",
      ],
    },
    place_value: {
      concepts: [
        "Giá trị chữ số theo vị trí: hàng trăm, hàng chục, hàng đơn vị",
        "Viết số thành tổng: 345 = 300 + 40 + 5",
        "Số có 2 chữ số, 3 chữ số",
      ],
      examples: [
        "Số 82: 8 chục và 2 đơn vị",
        "Trong số 157, chữ số 5 có giá trị là 50",
      ],
      tips: [
        "Chữ số đứng càng về bên trái thì giá trị càng lớn",
        "Dùng thẻ số để ghép thành các số khác nhau",
      ],
    },
    add_sub_carry: {
      concepts: [
        "Cộng có nhớ: Khi tổng hàng đơn vị >= 10, nhớ 1 sang hàng chục",
        "Trừ có mượn: Khi không đủ trừ, mượn 1 chục từ hàng trước",
        "Đặt tính thẳng cột",
      ],
      examples: [
        "15 + 8 = 23 (5+8=13, viết 3 nhớ 1)",
        "32 - 15 = 17 (2 không trừ được 5, mượn 1 chục)",
      ],
      tips: [
        "Luôn bắt đầu tính từ cột bên phải (hàng đơn vị)",
        "Dùng ngón tay để hỗ trợ đếm khi nhớ/mượn",
      ],
    },
    even_odd: {
      concepts: [
        "Số chẵn: Tận cùng là 0, 2, 4, 6, 8 (chia đều được cho 2)",
        "Số lẻ: Tận cùng là 1, 3, 5, 7, 9",
        "Quy luật xen kẽ: 1 chẵn, 1 lẻ",
      ],
      examples: ["Số 14 là số chẵn", "Số 27 là số lẻ"],
      tips: [
        "Ghép đôi các đồ vật, nếu không thừa cái nào là chẵn, thừa 1 là lẻ",
        "Chỉ cần nhìn chữ số cuối cùng",
      ],
    },
    intro_mult: {
      concepts: [
        "Phép nhân là phép cộng các số giống nhau",
        "Dấu nhân '×' thay thế cho chữ 'lần'",
        "Đổi chỗ 2 thừa số, kết quả không đổi",
      ],
      examples: ["3 + 3 + 3 + 3 = 3 × 4 = 12", "5 × 2 = 2 × 5 = 10"],
      tips: [
        "Học thuộc bảng nhân qua bài hát",
        "Vẽ các nhóm chấm tròn để hiểu bản chất",
      ],
    },
    clock: {
      concepts: [
        "Đọc giờ rưỡi (30 phút, kim dài chỉ số 6)",
        "Đọc giờ hơn, giờ kém",
        "1 giờ = 60 phút",
      ],
      examples: ["8 giờ 30 phút hay 8 giờ rưỡi", "9 giờ kém 15"],
      tips: [
        "Mỗi số trên đồng hồ cách nhau 5 phút",
        "Tập đếm nhảy 5: 5, 10, 15...",
      ],
    },
    measure_cm: {
      concepts: [
        "Đo các vật dài, ngắn",
        "Cộng trừ độ dài: 5cm + 3cm = 8cm",
        "Đơn vị Đề-xi-mét (dm): 1dm = 10cm",
      ],
      examples: ["Băng giấy 1dm 2cm dài bằng 12cm", "15cm - 5cm = 10cm"],
      tips: [
        "Chỉ cộng trừ các số đo có cùng đơn vị",
        "Quy đổi ra cùng cm rồi mới tính toán",
      ],
    },
    word_g2: {
      concepts: [
        "Bài toán nhiều hơn, ít hơn",
        "Bài toán có 2 bước tính",
        "Tóm tắt bài toán trước khi giải",
      ],
      examples: [
        "Hòa có 5 nhãn vở, Bình có nhiều hơn Hòa 2 cái. Bình có 5+2=7 cái.",
        "Mai có 10 viên bi, cho bạn 3 viên rồi mua thêm 2 viên. Mai còn: 10-3+2 = 9.",
      ],
      tips: [
        "Nếu từ khóa là 'nhiều hơn' thường dùng phép cộng",
        "Làm từng bước một, đừng vội",
      ],
    },
    numbers_1000: {
      concepts: [
        "Đọc, viết các số đến 1000",
        "So sánh các số có 3 chữ số",
        "Số tròn chục, tròn trăm",
      ],
      examples: [
        "456 đọc là: bốn trăm năm mươi sáu",
        "300, 400, 500 là các số tròn trăm",
      ],
      tips: [
        "So sánh từ hàng trăm trước, nếu bằng nhau thì so sánh tiếp hàng chục",
        "Số có nhiều chữ số hơn thì lớn hơn",
      ],
    },
    mass_volume_g2: {
      concepts: [
        "Đơn vị khối lượng: Ki-lô-gam (kg)",
        "Đơn vị dung tích: Lít (l)",
        "Thực hành cân và đong",
      ],
      examples: ["Bao gạo nặng 10kg", "Can nước mắm chứa 2l"],
      tips: [
        "Cầm thử vật 1kg (như chai nước lớn) để cảm nhận độ nặng",
        "Đọc kỹ nhãn mác trên bao bì sản phẩm",
      ],
    },
    money_vn: {
      concepts: [
        "Nhận biết các tờ tiền: 1000, 2000, 5000, 10000",
        "Biết cách đổi tiền",
        "Cộng trừ số tiền khi mua sắm",
      ],
      examples: [
        "1 tờ 10000 = 2 tờ 5000",
        "Mua bút 3000, đưa 5000, được thối lại 2000",
      ],
      tips: [
        "Chơi trò chơi đóng giả người bán hàng",
        "Quan sát màu sắc và hình ảnh trên tờ tiền",
      ],
    },
    mult_table_2_5: {
      concepts: [
        "Học thuộc bảng nhân 2 và nhân 5",
        "Nhân 2 là gấp đôi",
        "Nhân 5 có tận cùng là 0 hoặc 5",
      ],
      examples: ["2 × 4 = 8", "5 × 3 = 15"],
      tips: [
        "Đếm nhảy 2 (2, 4, 6...) và đếm nhảy 5 (5, 10, 15...)",
        "Áp dụng vào chia bánh kẹo",
      ],
    },
    duong_gap_khuc: {
      concepts: [
        "Đường gấp khúc là đường gồm nhiều đoạn thẳng nối tiếp nhau",
        "Cách tính độ dài đường gấp khúc: cộng độ dài các đoạn lại",
        "Phân biệt đường thẳng, đường cong, đường gấp khúc",
      ],
      examples: [
        "Đường ABCD có 3 đoạn. Độ dài = AB + BC + CD",
        "Một hình tam giác là một đường gấp khúc khép kín",
      ],
      tips: [
        "Nhớ cộng đủ tất cả các đoạn, không bỏ sót",
        "Kiểm tra xem các đơn vị đã giống nhau chưa",
      ],
    },
    mult_div: {
      concepts: [
        "Mối quan hệ giữa phép nhân và phép chia",
        "Từ 1 phép nhân viết được 2 phép chia",
        "Thành phần: Thừa số, Tích / Số bị chia, Số chia, Thương",
      ],
      examples: [
        "2 × 3 = 6 -> 6 ÷ 2 = 3 và 6 ÷ 3 = 2",
        "Muốn tìm thừa số, lấy Tích chia cho thừa số kia",
      ],
      tips: [
        "Kiểm tra phép chia bằng phép nhân",
        "Chia cho 1 luôn bằng chính số đó",
      ],
    },
    mult_table: {
      concepts: [
        "Học thuộc bảng nhân từ 2 đến 9",
        "Tính nhẩm nhanh",
        "Vận dụng vào giải toán có lời văn",
      ],
      examples: ["7 × 8 = 56", "Mỗi bàn có 4 bạn, 6 bàn có 4×6 = 24 bạn"],
      tips: [
        "Dùng bảng cửu chương Pitago để tra cứu nhanh",
        "Thường xuyên làm các bài quiz nhỏ",
      ],
    },
    rounding: {
      concepts: [
        "Làm tròn đến hàng chục, hàng trăm",
        "Quy tắc: từ 5 trở lên thì làm tròn lên, dưới 5 thì làm tròn xuống",
      ],
      examples: [
        "46 làm tròn đến hàng chục là 50 (vì 6 > 5)",
        "132 làm tròn đến hàng trăm là 100 (vì 3 < 5)",
      ],
      tips: [
        "Xác định chữ số cần xét ngay sau hàng làm tròn",
        "Làm tròn giúp ước lượng kết quả tính toán nhanh hơn",
      ],
    },
    basic_stats: {
      concepts: [
        "Thu thập, phân loại, kiểm đếm số liệu",
        "Đọc bảng số liệu đơn giản",
        "Biểu đồ tranh (Pictograph)",
      ],
      examples: [
        "Đếm số bạn thích ăn cam, táo, chuối",
        "Mỗi hình mặt cười trong biểu đồ biểu diễn 1 học sinh",
      ],
      tips: [
        "Dùng các vạch thẳng (tally marks) để kiểm đếm không bị sót",
        "Đọc kỹ phần ghi chú của biểu đồ",
      ],
    },
    numbers_10000: {
      concepts: [
        "Đọc, viết các số có 4 chữ số",
        "Hàng nghìn, hàng trăm, hàng chục, hàng đơn vị",
        "Số lớn nhất và bé nhất có 4 chữ số",
      ],
      examples: [
        "Số lớn nhất có 4 chữ số là 9999",
        "1234 = 1000 + 200 + 30 + 4",
      ],
      tips: [
        "Nhóm 3 chữ số từ phải sang trái để dễ đọc (VD: 10 000)",
        "Cẩn thận với các số có chữ số 0 ở giữa",
      ],
    },
    perimeter: {
      concepts: [
        "Chu vi là độ dài đường bao quanh một hình",
        "Chu vi tam giác, tứ giác = tổng các cạnh",
        "Chu vi chữ nhật = (dài + rộng) × 2, Chu vi hình vuông = cạnh × 4",
      ],
      examples: [
        "Chu vi hình vuông cạnh 5cm là 5×4 = 20cm",
        "Khung tranh hình chữ nhật dài 10, rộng 5, chu vi = (10+5)×2 = 30",
      ],
      tips: [
        "Nhớ đổi cùng đơn vị đo trước khi tính",
        "Đừng nhầm lẫn công thức chu vi và diện tích",
      ],
    },
    patterns: {
      concepts: [
        "Quy luật dãy số tăng dần hoặc giảm dần",
        "Quy luật hình ảnh xen kẽ",
        "Tìm quy luật bằng cách trừ/cộng 2 số liền nhau",
      ],
      examples: [
        "2, 4, 6, 8... (cộng thêm 2)",
        "Tròn, vuông, tam giác, tròn, vuông...",
      ],
      tips: [
        "Luôn kiểm tra quy luật với ít nhất 3 số liên tiếp",
        "Quy luật có thể là nhân/chia thay vì cộng/trừ",
      ],
    },
    word_g3: {
      concepts: [
        "Bài toán rút về đơn vị",
        "Bài toán gấp một số lên nhiều lần / giảm đi một số lần",
        "Giải toán bằng 2 phép tính",
      ],
      examples: [
        "Mẹ mua 3 bó hoa giá 15k. 1 bó giá 15/3=5k. 5 bó giá 5×5=25k.",
        "Gấp 5 lên 3 lần là 5×3=15.",
      ],
      tips: [
        "Tìm giá trị của 1 phần (rút về đơn vị) trước",
        "Gấp = Nhân, Giảm = Chia, Thêm = Cộng, Bớt = Trừ",
      ],
    },
    roman_numerals: {
      concepts: [
        "Các ký hiệu cơ bản: I (1), V (5), X (10)",
        "Quy tắc viết: Chữ số nhỏ đứng trước làm giảm giá trị, đứng sau làm tăng",
        "Đọc số La Mã trên mặt đồng hồ",
      ],
      examples: ["IV = 4, VI = 6", "IX = 9, XI = 11"],
      tips: [
        "Không viết quá 3 ký hiệu giống nhau liên tiếp (không viết IIII)",
        "Học thuộc các mốc 4, 9, 14...",
      ],
    },
    don_vi_do: {
      concepts: [
        "Bảng đơn vị đo độ dài: km, hm, dam, m, dm, cm, mm",
        "Bảng đơn vị khối lượng: tấn, tạ, yến, kg, hg, dag, g",
        "Mỗi đơn vị liền kề gấp kém nhau 10 lần",
      ],
      examples: ["1 m = 10 dm = 100 cm", "1 tấn = 1000 kg"],
      tips: [
        "Vẽ sơ đồ bậc thang để dễ nhớ cách đổi",
        "Đổi từ đơn vị lớn sang bé thì thêm số 0",
      ],
    },
    goc_vuong: {
      concepts: [
        "Nhận biết góc vuông bằng ê-ke",
        "Góc vuông, góc nhọn, góc tù",
        "Đỉnh và cạnh của góc",
      ],
      examples: [
        "Góc của quyển sách là góc vuông",
        "Góc nhọn bé hơn góc vuông",
      ],
      tips: [
        "Đặt đỉnh góc vuông của ê-ke trùng với đỉnh góc cần kiểm tra",
        "Hai cạnh của hình chữ nhật tạo thành góc vuông",
      ],
    },
    area: {
      concepts: [
        "Diện tích là bề mặt của hình",
        "Diện tích hình chữ nhật = dài × rộng",
        "Diện tích hình vuông = cạnh × cạnh",
        "Đơn vị cm2",
      ],
      examples: [
        "Sân hình vuông cạnh 4m có diện tích 4×4 = 16m2",
        "Giấy chữ nhật dài 5, rộng 3 có diện tích 5×3 = 15",
      ],
      tips: [
        "Đừng nhầm với chu vi (đường bao quanh)",
        "Nhớ ghi chú 'vuông' (m2, cm2) ở kết quả",
      ],
    },
    angles: {
      concepts: [
        "Đo góc bằng thước đo độ",
        "Góc nhọn (<90), góc vuông (=90), góc tù (>90), góc bẹt (=180)",
        "Tia phân giác của góc",
      ],
      examples: [
        "Góc 60 độ là góc nhọn",
        "Kim đồng hồ lúc 6 giờ tạo thành góc bẹt",
      ],
      tips: [
        "Đặt tâm thước trùng với đỉnh góc",
        "Nhìn kỹ vạch 0 độ ở vòng trong hay vòng ngoài của thước",
      ],
    },
    average: {
      concepts: [
        "Trung bình cộng = Tổng các số ÷ Số các số hạng",
        "Ý nghĩa: Chia đều số lượng cho mọi người",
        "Giải toán trung bình cộng ngược",
      ],
      examples: [
        "TBC của 4 và 6 là (4+6)÷2 = 5",
        "Cả 3 lớp có TBC 30 bạn -> Tổng số bạn là 30×3 = 90",
      ],
      tips: [
        "Tính tổng thật cẩn thận trước khi chia",
        "Kiểm tra xem TBC có nằm giữa số nhỏ nhất và lớn nhất không",
      ],
    },
    large_numbers: {
      concepts: [
        "Đọc, viết các số đến lớp triệu, lớp tỉ",
        "Lớp đơn vị, lớp nghìn, lớp triệu",
        "So sánh số lớn",
      ],
      examples: [
        "1 000 000 đọc là Một triệu",
        "Số 3 456 789 có chữ số 3 thuộc hàng triệu",
      ],
      tips: [
        "Tách số thành từng nhóm 3 chữ số bằng khoảng trắng hoặc dấu chấm",
        "Đọc từ trái sang phải, thêm tên lớp vào",
      ],
    },
    mass: {
      concepts: [
        "Đổi đơn vị đo khối lượng: Tấn, tạ, yến",
        "1 tấn = 10 tạ = 100 yến = 1000 kg",
        "Giải toán thực tế với xe tải, hàng hóa",
      ],
      examples: ["Xe chở 2 tấn gạo tức là chở 2000 kg", "5 tạ rưỡi = 550 kg"],
      tips: [
        "Nhớ thứ tự từ lớn đến bé: Tấn -> Tạ -> Yến -> Kg",
        "Đổi tất cả về cùng đơn vị (thường là kg) để tính",
      ],
    },
    fraction_add_sub: {
      concepts: [
        "Cộng trừ hai phân số cùng mẫu: Cộng trừ tử, giữ nguyên mẫu",
        "Cộng trừ hai phân số khác mẫu: Quy đồng mẫu số trước",
        "Rút gọn kết quả nếu có thể",
      ],
      examples: ["1/4 + 2/4 = 3/4", "1/2 + 1/3 = 3/6 + 2/6 = 5/6"],
      tips: [
        "Tuyệt đối không cộng trừ các mẫu số với nhau",
        "Tìm mẫu số chung nhỏ nhất để tính nhanh hơn",
      ],
    },
    fraction_mult_div: {
      concepts: [
        "Nhân phân số: Tử nhân tử, mẫu nhân mẫu",
        "Chia phân số: Nhân với phân số đảo ngược",
        "Nhân chia một số tự nhiên với phân số",
      ],
      examples: ["2/3 × 4/5 = 8/15", "2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6"],
      tips: [
        "Rút gọn các số ở tử và mẫu chéo nhau trước khi nhân",
        "Làm tính nhân chia thì không cần quy đồng",
      ],
    },
    divisibility_rules: {
      concepts: [
        "Dấu hiệu chia hết cho 2: số chẵn (0,2,4,6,8)",
        "Dấu hiệu chia hết cho 5: tận cùng 0 hoặc 5",
        "Dấu hiệu chia hết cho 3, 9: tổng các chữ số chia hết cho 3, 9",
      ],
      examples: [
        "145 chia hết cho 5 vì tận cùng là 5",
        "123 chia hết cho 3 vì 1+2+3=6 (chia hết cho 3)",
      ],
      tips: [
        "Số tận cùng là 0 thì chia hết cho cả 2 và 5",
        "Luôn cộng tổng các chữ số trước khi xét chia 3 và 9",
      ],
    },
    parallelogram_shapes: {
      concepts: [
        "Hình bình hành: 2 cặp cạnh đối diện song song và bằng nhau",
        "Hình thoi: 4 cạnh bằng nhau",
        "Diện tích HBH = Đáy × Cao, Diện tích HT = (Chéo 1 × Chéo 2) / 2",
      ],
      examples: [
        "Gạch lát nền nhà thường có dạng hình thoi",
        "Diện tích HBH đáy 5, cao 4 là 5×4 = 20",
      ],
      tips: [
        "Chú ý chiều cao phải vuông góc với đáy",
        "Đừng nhầm công thức hình thoi với hình bình hành",
      ],
    },
    phan_so_thap_phan: {
      concepts: [
        "Phân số thập phân là phân số có mẫu là 10, 100, 1000...",
        "Chuyển phân số thường thành phân số thập phân",
        "Mối liên hệ với số thập phân",
      ],
      examples: ["1/2 = 5/10 = 0,5", "3/100 = 0,03"],
      tips: [
        "Nhân hoặc chia cả tử và mẫu để được mẫu là 10, 100...",
        "Đếm số chữ số 0 ở mẫu để dời dấu phẩy",
      ],
    },
    decimals: {
      concepts: [
        "Cấu tạo: Phần nguyên và phần thập phân cách nhau bởi dấu phẩy",
        "Cộng trừ nhân chia số thập phân",
        "So sánh số thập phân",
      ],
      examples: [
        "3,14 (3 là phần nguyên, 14 là phần thập phân)",
        "12,5 + 3,2 = 15,7",
      ],
      tips: [
        "Đặt tính sao cho dấu phẩy thẳng cột với nhau",
        "Thêm số 0 vào tận cùng phần thập phân để dễ tính",
      ],
    },
    percent: {
      concepts: [
        "Tỉ số phần trăm (%) nghĩa là chia cho 100",
        "Tìm % của một số: Nhân số đó với %, chia 100",
        "Tính giá giảm giá, lãi suất",
      ],
      examples: [
        "25% của 200 là (200 × 25)/100 = 50",
        "Chiếc áo 100k giảm 20% -> giảm 20k, còn 80k",
      ],
      tips: [
        "Tỉ số phần trăm thực chất là phân số có mẫu số là 100",
        "Tính nhẩm: 10% là chia 10, 50% là chia 2",
      ],
    },
    ratio: {
      concepts: [
        "Tỉ số của a và b là a:b hoặc a/b",
        "Giải toán tìm 2 số khi biết Tổng và Tỉ",
        "Giải toán tìm 2 số khi biết Hiệu và Tỉ",
      ],
      examples: [
        "Nam có 2 kẹo, Nữ có 3 kẹo. Tỉ số Nam/Nữ là 2/3",
        "Tổng là 10, tỉ số 2/3 -> Vẽ sơ đồ 5 phần bằng nhau",
      ],
      tips: [
        "Luôn vẽ sơ đồ đoạn thẳng để giải toán có Tỉ",
        "Tìm giá trị của 1 phần trước tiên",
      ],
    },
    volume: {
      concepts: [
        "Thể tích hình lập phương = cạnh × cạnh × cạnh",
        "Thể tích hình hộp chữ nhật = dài × rộng × cao",
        "Đơn vị cm3, dm3, m3. 1dm3 = 1 lít",
      ],
      examples: [
        "Bể nước dài 2m, rộng 1m, cao 1m có thể tích 2 m3",
        "Khối rubik cạnh 3cm có thể tích 3×3×3 = 27 cm3",
      ],
      tips: [
        "Phải đảm bảo 3 chiều cùng một đơn vị đo trước khi nhân",
        "Nhớ sự quy đổi 1 lít = 1 dm3",
      ],
    },
    triangle_area: {
      concepts: [
        "Diện tích tam giác = (Đáy × Chiều cao) ÷ 2",
        "Đường cao hạ từ đỉnh xuống cạnh đáy đối diện",
        "Đơn vị diện tích: cm2, m2...",
      ],
      examples: ["Tam giác đáy 10cm, cao 5cm -> Diện tích = (10×5)/2 = 25 cm2"],
      tips: [
        "Không bao giờ quên việc 'chia 2' trong công thức",
        "Đáy và chiều cao phải tương ứng với nhau",
      ],
    },
    charts: {
      concepts: [
        "Biểu đồ cột, biểu đồ quạt tròn",
        "Đọc số liệu từ trục tung và trục hoành",
        "Tính phần trăm từ biểu đồ hình quạt",
      ],
      examples: [
        "Cột cao nhất thể hiện giá trị lớn nhất",
        "Cả hình tròn là 100%, một nửa là 50%",
      ],
      tips: [
        "Dùng thước gióng ngang từ đỉnh cột sang cột số liệu",
        "Tổng các % trong biểu đồ quạt luôn bằng 100%",
      ],
    },
    speed_distance_time: {
      concepts: [
        "Vận tốc (v), Quãng đường (s), Thời gian (t)",
        "Công thức: v = s/t, s = v×t, t = s/v",
        "Đơn vị thường dùng: km/h, m/s",
      ],
      examples: [
        "Đi 100km trong 2 giờ -> v = 100/2 = 50 km/h",
        "Đi với vận tốc 40km/h trong 3 giờ -> s = 40×3 = 120km",
      ],
      tips: [
        "Ghi nhớ công thức bằng hình tam giác S-V-T",
        "Chú ý đổi đơn vị thời gian (VD: 30 phút = 0.5 giờ)",
      ],
    },
    circle_area: {
      concepts: [
        "Chu vi hình tròn = Bán kính × 2 × 3,14 (hoặc Đường kính × 3,14)",
        "Diện tích hình tròn = Bán kính × Bán kính × 3,14",
        "Số Pi (π) ≈ 3,14",
      ],
      examples: [
        "Đường kính 10cm -> Chu vi = 10 × 3,14 = 31,4 cm",
        "Bán kính 2cm -> Diện tích = 2 × 2 × 3,14 = 12,56 cm2",
      ],
      tips: [
        "Đọc kỹ đề cho Bán kính (r) hay Đường kính (d = 2×r)",
        "Diện tích phải lấy bán kính nhân với chính nó, KHÔNG nhân 2",
      ],
    },
    map_scale: {
      concepts: [
        "Tỉ lệ bản đồ 1:100.000 nghĩa là 1cm trên bản đồ = 100.000cm thực tế",
        "Tính khoảng cách thực tế",
        "Tính độ dài thu nhỏ trên bản đồ",
      ],
      examples: [
        "Bản đồ tỉ lệ 1:1000. Đo được 5cm -> Thực tế là 5×1000 = 5000cm = 50m",
      ],
      tips: [
        "Dùng phép nhân để tính khoảng cách thực tế, phép chia để tính thu nhỏ",
        "Nhớ đổi đơn vị (cm ra m hoặc km) cho kết quả thực tế",
      ],
    },
    time_measure: {
      concepts: [
        "Cộng trừ số đo thời gian (giờ, phút, giây)",
        "Nhân chia số đo thời gian",
        "Đổi đơn vị: 1 giờ = 60 phút, 1 năm = 12 tháng",
      ],
      examples: [
        "2 giờ 30 phút + 1 giờ 45 phút = 3 giờ 75 phút = 4 giờ 15 phút",
        "1 năm rưỡi = 18 tháng",
      ],
      tips: [
        "Khi phần phút lớn hơn 60, phải đổi thành 1 giờ",
        "Khi trừ không đủ phần phút, phải mượn 1 giờ = 60 phút",
      ],
    },
    add_sub_100: {
      concepts: [
        "Cộng trừ các số trong phạm vi 100",
        "Đặt tính thẳng cột: đơn vị thẳng đơn vị, chục thẳng chục",
        "Cộng trừ có nhớ và không nhớ",
      ],
      examples: ["45 + 37 = 82 (Nhớ 1 chục)", "90 - 45 = 45 (Mượn 1 chục)"],
      tips: [
        "Luôn tính từ phải sang trái",
        "Đừng quên cộng thêm phần nhớ vào cột hàng chục",
      ],
    },
    division_g2: {
      concepts: [
        "Chia thành các phần bằng nhau",
        "Phép chia có dư: Số dư luôn nhỏ hơn số chia",
        "15 chia 4 được 3 dư 3",
      ],
      examples: ["Có 10 cái kẹo chia cho 3 bạn, mỗi bạn 3 cái, dư 1 cái"],
      tips: [
        "Thuộc bảng nhân để nhẩm phép chia nhanh hơn",
        "Kiểm tra lại: (Thương x Số chia) + Số dư = Số bị chia",
      ],
    },
    intro_fractions: {
      concepts: [
        "Phân số biểu diễn một phần của tổng thể",
        "Tử số chỉ phần lấy đi, mẫu số chỉ tổng số phần bằng nhau",
      ],
      examples: [
        "Chia chiếc bánh thành 4 phần, ăn 1 phần là đã ăn 1/4 chiếc bánh",
      ],
      tips: [
        "Đọc tử số trước, rồi đọc 'phần', sau đó đọc mẫu số",
        "Tử số nằm trên gạch ngang, mẫu số nằm dưới",
      ],
    },
    division_table: {
      concepts: [
        "Học thuộc bảng chia từ 2 đến 9",
        "Bảng chia là ngược lại của bảng nhân",
      ],
      examples: ["36 ÷ 4 = 9 vì 4 × 9 = 36"],
      tips: [
        "Dùng bảng cửu chương để dò ngược lại kết quả",
        "Luyện tập chia mỗi ngày 5 phút để tăng tốc độ",
      ],
    },
  },
  vietnamese: {
    alphabet: {
      concepts: [
        "Bảng chữ cái có 29 chữ: a, ă, â, b, c, d, đ, e, ê...",
        "Nguyên âm: a, ă, â, e, ê, i, o, ô, ơ, u, ư, y",
        "Phụ âm: b, c, d, đ, g, h, k, l, m, n...",
      ],
      examples: [
        "a → quả cam, ă → ăn cơm, â → cây, b → bà",
        'Viết in hoa đầu câu: "Ba đi làm."',
      ],
      tips: ["Đọc to từng chữ mỗi ngày", "Viết chữ vào bảng con"],
    },
    tones: {
      concepts: [
        "6 thanh: ngang (a), huyền (à), sắc (á), hỏi (ả), ngã (ã), nặng (ạ)",
        "Thanh thay đổi nghĩa: ma, mà, má, mả, mã, mạ",
        "Thanh huyền + nặng = giọng trầm, sắc + ngã + hỏi = giọng bổng",
      ],
      examples: [
        "ba (số 3) ≠ bà (bà nội) ≠ bá (cái bá)",
        "la (kêu la) ≠ là (thì) ≠ lá (lá cây)",
      ],
      tips: ["Đọc to 6 thanh mỗi ngày", "Hát theo cao độ thanh điệu"],
    },
    van: {
      concepts: [
        "Vần = nguyên âm + phụ âm cuối: an, at, am, ap...",
        "Vần mở: ba, me, chi (kết thúc nguyên âm)",
        "Vần đóng: ban, met, chin (kết thúc phụ âm)",
      ],
      examples: [
        "vần AN: ban, can, dan, fan, gan",
        "vần AT: bat, cat, hat, mat",
      ],
      tips: ["Đọc các từ cùng vần", "Tìm vần trong bài thơ"],
    },
    phu_am_ghep: {
      concepts: [
        "ch: cha, cho, chơi",
        "gh: ghe, ghế, ghi",
        "kh: khi, khô, không",
        "ng: nga, nghe, người",
        "nh: nha, nhà, nhỏ",
        "th: tha, thơ, thủy",
        "tr: tra, trong, trời",
        "ph: pha, phố, phim",
      ],
      examples: ["ch + a = cha (ba/cha)", "th + ư = thư (lá thư)"],
      tips: ["Đọc to phụ âm ghép", "Viết từ có phụ âm ghép"],
    },
    doc_hieu: {
      concepts: [
        "Đọc kỹ từng câu",
        "Tìm ý chính: Ai? Làm gì? Ở đâu? Khi nào?",
        "Tìm từ mới, tra nghĩa",
      ],
      examples: [
        'Bài đọc: "Lan đi học. Lan mang cặp mới. Lan rất vui." → Ai? Lan. Làm gì? Đi học.',
      ],
      tips: ["Đọc to bài 2 lần", "Gạch chân từ không hiểu"],
    },
    tap_lam_van: {
      concepts: [
        "Viết câu đúng: Chủ ngữ + Vị ngữ",
        "Mở bài: giới thiệu chủ đề",
        "Thân bài: kể chi tiết",
        "Kết bài: nêu cảm nghĩ",
      ],
      examples: ['"Em yêu mẹ. Mẹ nấu cơm rất ngon. Em giúp mẹ rửa chén."'],
      tips: ["Viết nháp trước", "Đọc lại bài sau khi viết"],
    },
    ghep_tu: {
      concepts: [
        "Ghép các tiếng để tạo thành từ có nghĩa",
        "Từ ghép tổng hợp (bàn ghế, quần áo) và phân loại (xe đạp, máy bay)",
        "Mở rộng vốn từ qua trò chơi nối chữ",
      ],
      examples: [
        "'Học' ghép với 'sinh' -> Học sinh",
        "'Hoa' ghép với 'hồng' -> Hoa hồng",
      ],
      tips: [
        "Hãy thử nối tiếp từ cuối cùng: Máy bay -> Bay lượn -> Lượn lờ",
        "Tập ghép một tiếng với nhiều tiếng khác nhau",
      ],
    },
    tap_viet: {
      concepts: [
        "Viết đúng nét, đúng khoảng cách, đúng ô li",
        "Các nét cơ bản: nét thẳng, nét cong, nét móc, nét khuyết",
        "Cách cầm bút và tư thế ngồi chuẩn",
      ],
      examples: [
        "Chữ 'h' có nét khuyết trên cao 2,5 ô li",
        "Ngồi thẳng lưng, không tì ngực vào bàn",
      ],
      tips: [
        "Tô theo chữ mẫu trước khi tự viết",
        "Viết chậm rãi, đều nét sẽ đẹp hơn",
      ],
    },
    nghe_ke_chuyen: {
      concepts: [
        "Lắng nghe chăm chú để hiểu nội dung câu chuyện",
        "Nhớ các nhân vật, sự kiện chính",
        "Rút ra được bài học từ câu chuyện",
      ],
      examples: [
        "Chuyện 'Thỏ và Rùa': Rùa chậm chạp nhưng kiên trì nên thắng Thỏ",
        "Nhân vật chính là người hay con vật xuất hiện nhiều nhất",
      ],
      tips: [
        "Tưởng tượng hình ảnh trong đầu khi nghe kể",
        "Cố gắng kể lại câu chuyện cho bố mẹ nghe",
      ],
    },
    tap_doc_tho: {
      concepts: [
        "Đọc bài thơ trôi chảy, diễn cảm",
        "Ngắt nghỉ đúng nhịp ở cuối mỗi dòng thơ",
        "Biết nhấn giọng ở những từ ngữ miêu tả đẹp",
      ],
      examples: [
        "Hôm qua / em tới trường // Mẹ dắt tay / từng bước...",
        "Nhịp 2/3 hoặc nhịp 3/2 tùy vào câu thơ",
      ],
      tips: [
        "Học thuộc lòng từng khổ thơ một",
        "Đọc to, rõ ràng và thể hiện tình cảm của mình",
      ],
    },
    chinh_ta: {
      concepts: [
        "Phân biệt các âm dễ lẫn: tr/ch, s/x, r/d/gi, l/n",
        "Quy tắc viết hoa chữ cái đầu câu và danh từ riêng",
        "Dấu thanh đặt đúng vị trí (trên/dưới âm chính)",
      ],
      examples: [
        "Trường học (không phải chường học)",
        "Thành phố Hà Nội (viết hoa H, N)",
      ],
      tips: [
        "Đọc nhẩm lại từ trước khi viết",
        "Viết thật nhiều để ghi nhớ mặt chữ",
      ],
    },
    tap_doc: {
      concepts: [
        "Đọc to, rõ ràng, không vấp, không đọc sai từ",
        "Ngắt nghỉ hơi đúng chỗ (dấu phẩy nghỉ ngắn, dấu chấm nghỉ dài)",
        "Hiểu nội dung đoạn văn vừa đọc",
      ],
      examples: [
        "Đọc diễn cảm giọng nhân vật: Sói ồm ồm, Thỏ bé nhỏ",
        "Đọc liền mạch cụm từ, không ngắt giữa chừng",
      ],
      tips: [
        "Đọc đi đọc lại bài nhiều lần cho trơn tru",
        "Dùng ngón tay chỉ theo chữ nếu còn đọc chậm",
      ],
    },
    ke_chuyen: {
      concepts: [
        "Kể lại câu chuyện dựa vào tranh vẽ hoặc gợi ý",
        "Sử dụng giọng điệu, cử chỉ để câu chuyện sinh động",
        "Kể theo đúng trình tự: Mở đầu -> Diễn biến -> Kết thúc",
      ],
      examples: [
        "'Ngày xửa ngày xưa, ở một ngôi làng nọ...'",
        "Thay đổi giọng nói khi đóng vai các nhân vật khác nhau",
      ],
      tips: [
        "Tập kể trước gương",
        "Không cần thuộc lòng từng chữ, chỉ cần nhớ ý chính",
      ],
    },
    vocabulary: {
      concepts: [
        "Từ đồng nghĩa, từ trái nghĩa",
        "Mở rộng vốn từ theo chủ đề (Gia đình, Trường học, Thiên nhiên)",
        "Tìm từ ngữ miêu tả đặc điểm, tính chất",
      ],
      examples: [
        "Từ trái nghĩa: Cao - Thấp, Nóng - Lạnh",
        "Từ chỉ đặc điểm: Xinh xắn, ngoan ngoãn, rực rỡ",
      ],
      tips: [
        "Ghi chú lại những từ mới hoặc từ hay khi đọc sách",
        "Chơi trò chơi tìm từ trái nghĩa với bạn",
      ],
    },
    reading: {
      concepts: [
        "Kỹ năng đọc hiểu văn bản",
        "Trả lời câu hỏi: Ai? Làm gì? Ở đâu? Khi nào? Tại sao?",
        "Tóm tắt lại ý chính của bài đọc",
      ],
      examples: [
        "Bài đọc nói về tình bạn giữa kiến và chim bồ câu",
        "Tìm chi tiết trong bài để chứng minh kiến rất dũng cảm",
      ],
      tips: [
        "Gạch chân các từ khóa quan trọng trong câu hỏi",
        "Đọc lướt đoạn văn để tìm thông tin nhanh hơn",
      ],
    },
    luyen_tu_cau: {
      concepts: [
        "Cấu tạo câu: Ai làm gì? Ai thế nào? Ai là gì?",
        "Biết dùng dấu chấm, dấu phẩy, dấu chấm hỏi",
        "Chuyển đổi các kiểu câu",
      ],
      examples: [
        "Bạn Lan (Ai) đang đọc sách (Làm gì).",
        "Trời (Ai) rất trong xanh (Thế nào).",
      ],
      tips: [
        "Sau dấu chấm phải viết hoa",
        "Dấu phẩy dùng để liệt kê hoặc ngăn cách các ý",
      ],
    },
    chinh_ta_g3: {
      concepts: [
        "Nghe viết đoạn văn, đoạn thơ không mắc lỗi",
        "Phân biệt vần dễ sai: an/ang, at/ac, in/inh",
        "Quy tắc chính tả c/k, g/gh, ng/ngh",
      ],
      examples: [
        "Luật e, ê, i: viết k, gh, ngh (kẻ, ghế, nghỉ)",
        "Bàn bạc (không phải bàn bạt)",
      ],
      tips: [
        "Soát lỗi chính tả sau khi viết xong",
        "Nhờ người thân đọc cho viết để luyện tập",
      ],
    },
    grammar: {
      concepts: [
        "Danh từ, Động từ, Tính từ",
        "Đại từ xưng hô",
        "Câu đơn và câu ghép",
      ],
      examples: [
        "Danh từ: Con mèo, cái bàn. Động từ: Chạy, nhảy. Tính từ: Xanh, đẹp.",
        "Đại từ: Tôi, bạn, chúng ta, họ.",
      ],
      tips: [
        "Tính từ thường đứng sau từ 'rất', 'quá'",
        "Động từ thường đứng sau từ 'đang', 'sẽ'",
      ],
    },
    bien_phap_tu_tu: {
      concepts: [
        "So sánh: Đối chiếu 2 sự vật có nét giống nhau (thường có từ 'như', 'là')",
        "Nhân hóa: Gắn hành động, tình cảm của con người cho vật",
        "Điệp từ, điệp ngữ",
      ],
      examples: [
        "So sánh: Mắt thỏ đỏ như viên ngọc.",
        "Nhân hóa: Ông mặt trời đạp xe qua đỉnh núi.",
      ],
      tips: [
        "Tìm từ chỉ con người (ông, bà, nói, cười) gán cho vật để nhận diện nhân hóa",
        "Biện pháp tu từ làm câu văn sinh động hơn",
      ],
    },
    tu_han_viet: {
      concepts: [
        "Nắm nghĩa các yếu tố Hán Việt thông dụng",
        "Giải nghĩa từ Hán Việt",
        "Sử dụng từ Hán Việt để tăng tính trang trọng",
      ],
      examples: [
        "Quốc (nước), Gia (nhà), Nhân (người), Ái (yêu)",
        "Nhân ái = Lòng yêu thương con người",
      ],
      tips: [
        "Ghép các yếu tố đã biết nghĩa để đoán nghĩa từ mới",
        "Dùng từ Hán Việt trong các bài văn nghị luận hoặc miêu tả",
      ],
    },
    writing_g4: {
      concepts: [
        "Cấu trúc bài văn miêu tả: Mở bài, thân bài, kết bài",
        "Miêu tả đồ vật, cây cối, con vật",
        "Sử dụng các giác quan để miêu tả",
      ],
      examples: [
        "Mở bài gián tiếp: Kể một kỉ niệm để dẫn vào đồ vật định tả",
        "Thân bài: Tả bao quát rồi tả chi tiết từng bộ phận",
      ],
      tips: [
        "Lập dàn ý trước khi viết",
        "Dùng nhiều tính từ miêu tả và từ láy",
      ],
    },
    writing_g5: {
      concepts: [
        "Văn miêu tả phong cảnh, tả người",
        "Viết đơn từ, báo cáo, thư từ",
        "Mở rộng vốn từ miêu tả chi tiết, sâu sắc",
      ],
      examples: [
        "Tả người: Tả ngoại hình kết hợp tả tính tình, hoạt động",
        "Viết thư: Có địa điểm, ngày tháng, lời xưng hô, nội dung, chữ ký",
      ],
      tips: [
        "Quan sát thật kĩ đối tượng định tả để tìm ra nét nổi bật nhất",
        "Đọc nhiều sách văn học để học cách dùng từ của nhà văn",
      ],
    },
    ke_chuyen_st: {
      concepts: [
        "Sáng tạo thêm chi tiết cho câu chuyện đã nghe",
        "Kể chuyện theo góc nhìn của nhân vật khác",
        "Đóng vai nhân vật để kể chuyện",
      ],
      examples: [
        "Đóng vai chú rùa để kể lại cuộc đua với thỏ",
        "Thay đổi cái kết của truyện Tấm Cám",
      ],
      tips: [
        "Hòa mình vào cảm xúc của nhân vật",
        "Tưởng tượng thêm hoàn cảnh, thời tiết để câu chuyện hấp dẫn",
      ],
    },
    van_extended: {
      concepts: [
        "Nhận biết các vần khó, vần có âm đệm, âm chính, âm cuối",
        "Phân biệt các vần dễ lẫn: uynh/uich, oang/oac",
      ],
      examples: ["Phụ huynh, huỳnh huỵch", "Áo choàng, áo khoác"],
      tips: [
        "Đánh vần chậm và phát âm tròn vành rõ chữ",
        "Chú ý luật chính tả với các âm đệm 'u' hoặc 'o'",
      ],
    },
    doc_hieu_g3: {
      concepts: [
        "Đọc hiểu và nắm bắt ý chính của đoạn văn dài",
        "Tìm các chi tiết miêu tả, trả lời câu hỏi vì sao",
      ],
      examples: ["Bài Cậu bé thông minh: Tại sao nhà vua lại thử tài cậu bé?"],
      tips: [
        "Gạch dưới những từ ngữ chỉ hoạt động, tính cách nhân vật",
        "Đọc câu hỏi trước rồi quay lại tìm ý trong bài",
      ],
    },
    van_ta_canh: {
      concepts: [
        "Tả cảnh theo trình tự thời gian (sáng, trưa, chiều) hoặc không gian (từ xa đến gần)",
        "Dùng từ ngữ gợi tả, gợi cảm (từ láy)",
      ],
      examples: [
        "Mặt trời lấp ló sau rặng tre. Sương đọng long lanh trên mặt lá.",
      ],
      tips: [
        "Tả cảnh phải gắn với cảm xúc và hoạt động của con người",
        "Sử dụng biện pháp so sánh và nhân hóa",
      ],
    },
    viet_doan_van: {
      concepts: [
        "Viết đoạn văn 5-7 câu về một chủ đề nhất định",
        "Có câu mở đoạn, các câu phát triển ý và câu kết đoạn",
      ],
      examples: [
        "Mở đoạn: Gia đình em có 4 người. Phát triển: Bố làm bác sĩ... Kết đoạn: Em rất yêu gia đình.",
      ],
      tips: [
        "Tránh lặp từ bằng cách dùng từ đồng nghĩa hoặc đại từ",
        "Kiểm tra dấu câu sau khi viết xong đoạn",
      ],
    },
  },
  science: {
    body_health: {
      concepts: [
        "Cơ thể có nhiều bộ phận: đầu, mình, tay, chân",
        "Giác quan: mắt (nhìn), tai (nghe), mũi (ngửi), lưỡi (nếm), da (sờ)",
        "5 nhóm thực phẩm: tinh bột, đạm, béo, vitamin, khoáng chất",
      ],
      examples: [
        "Mắt giúp ta nhìn thấy màu sắc",
        "Ăn rau xanh cung cấp vitamin",
      ],
      tips: ["Rửa tay trước khi ăn", "Đánh răng 2 lần/ngày"],
    },
    family_community: {
      concepts: [
        "Gia đình: ông bà, bố mẹ, anh chị em",
        "Trường học: thầy cô, bạn bè",
        "Hàng xóm, khu phố",
      ],
      examples: ["Gia đình em có 4 người", "Em chào cô khi đến trường"],
      tips: ["Giúp đỡ người thân", "Lễ phép với người lớn"],
    },
    traffic_safety: {
      concepts: [
        "Đèn đỏ: dừng, Đèn vàng: chuẩn bị, Đèn xanh: đi",
        "Đi bộ trên vỉa hè",
        "Sang đường tại vạch kẻ",
      ],
      examples: [
        "Nhìn trái → nhìn phải → nhìn trái → sang đường",
        "Đội mũ bảo hiểm khi đi xe",
      ],
      tips: ["Nắm tay người lớn khi sang đường", "Không chạy ra đường"],
    },
    plants_animals: {
      concepts: [
        "Cây xanh: rễ, thân, lá, hoa, quả",
        "Cây cần: nước, ánh sáng, đất, không khí",
        "Động vật: có xương sống (cá, chim) và không xương sống (côn trùng)",
      ],
      examples: ["Cây lúa → gạo → cơm", "Sâu bướm → kén → bướm"],
      tips: ["Trồng 1 cây trong chậu", "Quan sát côn trùng trong vườn"],
    },
    weather_seasons: {
      concepts: [
        "Thời tiết: nắng, mưa, gió, bão",
        "Mùa: Xuân, Hạ, Thu, Đông (miền Bắc) / Mưa, Khô (miền Nam)",
        "Nhiệt kế đo nhiệt độ",
      ],
      examples: ["Mùa hè: nóng, ngày dài", "Mùa đông: lạnh, ngày ngắn"],
      tips: ["Xem dự báo thời tiết", "Ghi nhiệt độ mỗi ngày"],
    },
    water_cycle: {
      concepts: [
        "Nước bay hơi → mây → mưa → sông → biển",
        "3 thể: rắn (đá), lỏng (nước), khí (hơi nước)",
        "Nước sạch rất quan trọng",
      ],
      examples: ["Đun nước → hơi nước bay lên", "Bỏ nước vào tủ đông → đá"],
      tips: ["Tiết kiệm nước", "Thí nghiệm: đặt đá ra nắng"],
    },
    safety_home: {
      concepts: [
        "Nhận biết các vật dụng nguy hiểm: ổ điện, dao kéo, nước sôi",
        "Cách phòng tránh tai nạn tại nhà",
        "Ghi nhớ số điện thoại khẩn cấp (114, 115)",
      ],
      examples: [
        "Không dùng tay ướt cắm phích điện",
        "Tránh xa bếp khi đang đun nấu",
      ],
      tips: [
        "Hỏi xin phép người lớn trước khi dùng các vật sắc nhọn",
        "Luôn giữ sàn nhà khô ráo để không bị ngã",
      ],
    },
    ve_sinh: {
      concepts: [
        "Vệ sinh cá nhân: Rửa tay, tắm gội, đánh răng",
        "Vệ sinh môi trường: Quét nhà, đổ rác đúng nơi",
        "Ngăn ngừa vi khuẩn và bệnh tật",
      ],
      examples: [
        "Đánh răng 2 lần mỗi ngày (sáng và tối)",
        "Rửa tay bằng xà phòng trước khi ăn và sau khi đi vệ sinh",
      ],
      tips: [
        "Hát một bài hát ngắn khi rửa tay để đảm bảo đủ 20 giây",
        "Che miệng khi ho hoặc hắt hơi",
      ],
    },
    nature: {
      concepts: [
        "Thiên nhiên bao gồm bầu trời, mặt đất, cây cỏ, động vật",
        "Quan sát sự thay đổi của thiên nhiên quanh em",
        "Bảo vệ vẻ đẹp của tự nhiên",
      ],
      examples: [
        "Mặt trời mọc ở hướng Đông, lặn ở hướng Tây",
        "Ban đêm có thể nhìn thấy Mặt Trăng và các vì sao",
      ],
      tips: [
        "Dành thời gian ra công viên hoặc vườn cây để quan sát",
        "Ghi lại những loài chim hoặc côn trùng em nhìn thấy",
      ],
    },
    thoi_tiet_mua: {
      concepts: [
        "Các hiện tượng thời tiết: Nắng, mưa, gió, bão",
        "Đặc điểm các mùa: Xuân, Hạ, Thu, Đông",
        "Cách ăn mặc phù hợp với thời tiết",
      ],
      examples: [
        "Mùa đông trời lạnh, cây rụng lá, cần mặc áo ấm",
        "Mùa hè nóng bức, thường có mưa rào",
      ],
      tips: [
        "Xem dự báo thời tiết trước khi ra khỏi nhà",
        "Mang ô hoặc áo mưa khi trời nhiều mây đen",
      ],
    },
    cay_coi: {
      concepts: [
        "Các bộ phận của cây: Rễ, thân, lá, hoa, quả",
        "Sự lớn lên của cây từ hạt",
        "Cây cần ánh sáng, nước và đất để sống",
      ],
      examples: [
        "Rễ cây hút nước từ dưới đất",
        "Lá cây giúp cây trao đổi khí (thở)",
      ],
      tips: [
        "Thử gieo một hạt đỗ và quan sát nó nảy mầm",
        "Không bẻ cành, hái hoa nơi công cộng",
      ],
    },
    nuoc_khong_khi: {
      concepts: [
        "Nước không màu, không mùi, không vị",
        "Không khí ở xung quanh ta dù không nhìn thấy",
        "Vai trò của nước và không khí đối với sự sống",
      ],
      examples: [
        "Cá cần nước để bơi và sống",
        "Chúng ta cần không khí để hít thở",
      ],
      tips: [
        "Khóa vòi nước khi đang đánh răng để tiết kiệm",
        "Mở cửa sổ để không khí trong lành tràn vào phòng",
      ],
    },
    dinh_duong: {
      concepts: [
        "4 nhóm chất dinh dưỡng: Bột đường, Đạm, Béo, Vitamin/Khoáng chất",
        "Ăn đa dạng thực phẩm để cơ thể khỏe mạnh",
        "Uống đủ nước mỗi ngày",
      ],
      examples: [
        "Thịt, cá, trứng cung cấp chất đạm",
        "Rau xanh và hoa quả cung cấp vitamin",
      ],
      tips: [
        "Không nên ăn quá nhiều bánh kẹo ngọt",
        "Nhìn vào tháp dinh dưỡng để cân đối bữa ăn",
      ],
    },
    weather_earth: {
      concepts: [
        "Trái đất hình cầu, tự quay và quay quanh mặt trời",
        "Sự luân phiên ngày và đêm",
        "Khí hậu các vùng khác nhau trên Trái Đất",
      ],
      examples: [
        "Phần Trái Đất hướng về Mặt Trời là ban ngày",
        "Vùng cực rất lạnh và có nhiều băng",
      ],
      tips: [
        "Dùng đèn pin chiếu vào quả địa cầu để xem ngày và đêm",
        "Quan sát bóng của mình thay đổi dài ngắn trong ngày",
      ],
    },
    nhiet_chat: {
      concepts: [
        "Nhiệt độ: nóng và lạnh",
        "Sự chuyển thể của chất: Rắn, lỏng, khí",
        "Các vật liệu dẫn nhiệt và cách nhiệt",
      ],
      examples: [
        "Nước đá (rắn) tan chảy thành nước (lỏng) khi trời nóng",
        "Cốc kim loại dẫn nhiệt tốt nên sờ vào thấy nóng",
      ],
      tips: [
        "Thí nghiệm an toàn: Cho viên đá lạnh ra đĩa và xem nó tan",
        "Dùng miếng lót nồi để cách nhiệt khi bê đồ nóng",
      ],
    },
    sound_light: {
      concepts: [
        "Âm thanh tạo ra từ sự rung động",
        "Ánh sáng đi theo đường thẳng",
        "Nguồn sáng tự nhiên và nhân tạo",
      ],
      examples: [
        "Dây đàn rung lên tạo ra tiếng nhạc",
        "Mặt trời là nguồn sáng tự nhiên",
      ],
      tips: [
        "Đặt tay lên cổ họng khi nói để cảm nhận sự rung",
        "Chơi trò tạo bóng râm bằng tay dưới ngọn đèn",
      ],
    },
    nam_cham: {
      concepts: [
        "Nam châm hút các vật bằng sắt, thép",
        "Nam châm có 2 cực: Bắc (N) và Nam (S)",
        "Cùng cực thì đẩy nhau, khác cực thì hút nhau",
      ],
      examples: [
        "Nam châm hút được cái đinh sắt nhưng không hút được que gỗ",
        "Kim la bàn là một nam châm nhỏ",
      ],
      tips: [
        "Tìm xem ở nhà có những vật nào nam châm có thể hút",
        "Dùng nam châm để gắn giấy chú thích lên tủ lạnh",
      ],
    },
    matter_energy: {
      concepts: [
        "Chất cấu tạo nên mọi vật",
        "Năng lượng giúp các vật hoạt động (điện, nhiệt, ánh sáng)",
        "Bảo toàn và tiết kiệm năng lượng",
      ],
      examples: [
        "Gió có năng lượng làm quay chong chóng",
        "Xăng giúp xe máy chạy được",
      ],
      tips: [
        "Tắt các thiết bị điện khi không sử dụng",
        "Sử dụng ánh sáng mặt trời tự nhiên thay vì bật đèn",
      ],
    },
    ecosystem: {
      concepts: [
        "Hệ sinh thái là sự tương tác giữa sinh vật và môi trường sống",
        "Các hệ sinh thái đa dạng: Rừng, biển, sa mạc, ao hồ",
        "Mối quan hệ phụ thuộc lẫn nhau",
      ],
      examples: [
        "Cá, rong rêu, nước, bùn tạo thành hệ sinh thái ao hồ",
        "Rừng nhiệt đới có rất nhiều loại cây và động vật",
      ],
      tips: [
        "Vẽ một bức tranh về khu rừng với nhiều loài động thực vật",
        "Tìm hiểu xem địa phương em có hệ sinh thái đặc trưng nào",
      ],
    },
    food_chain: {
      concepts: [
        "Chuỗi thức ăn là chuỗi các sinh vật ăn thịt lẫn nhau",
        "Bắt đầu từ sinh vật sản xuất (thực vật)",
        "Mất cân bằng sinh thái khi một mắt xích biến mất",
      ],
      examples: ["Cỏ -> Cào cào -> Ếch -> Rắn", "Lúa -> Chuột -> Cú mèo"],
      tips: [
        "Vẽ các mũi tên để thể hiện 'bị ăn bởi'",
        "Suy nghĩ xem nếu không có ếch thì cào cào sẽ ra sao",
      ],
    },
    sinh_san: {
      concepts: [
        "Sự sinh sản giúp duy trì nòi giống",
        "Động vật đẻ trứng (gà, cá) và đẻ con (chó, mèo)",
        "Thực vật sinh sản bằng hạt hoặc cành, lá",
      ],
      examples: [
        "Gà mái ấp trứng nở ra gà con",
        "Trồng một nhánh khoai lang xuống đất sẽ mọc cây mới",
      ],
      tips: [
        "Quan sát tổ chim hoặc mèo con mới đẻ (từ xa)",
        "Phân loại các con vật trong sách thành nhóm đẻ trứng và đẻ con",
      ],
    },
    dien_co_ban: {
      concepts: [
        "Mạch điện đơn giản gồm nguồn (pin), dây dẫn, thiết bị (bóng đèn)",
        "Chất dẫn điện (kim loại, nước) và chất cách điện (nhựa, gỗ)",
        "An toàn điện tuyệt đối",
      ],
      examples: [
        "Pin cung cấp năng lượng làm sáng bóng đèn",
        "Vỏ dây điện bằng nhựa để cách điện, bảo vệ ta",
      ],
      tips: [
        "Không bao giờ nghịch các ổ cắm điện trên tường",
        "Có thể làm thí nghiệm với pin nhỏ 1.5V an toàn",
      ],
    },
    bien_doi_kh: {
      concepts: [
        "Biến đổi khí hậu là sự thay đổi bất thường của thời tiết toàn cầu",
        "Nguyên nhân: Khí thải, chặt phá rừng",
        "Hậu quả: Trái đất nóng lên, băng tan, thiên tai",
      ],
      examples: [
        "Mùa hè trở nên nóng dữ dội hơn",
        "Băng ở Bắc Cực tan làm nước biển dâng cao",
      ],
      tips: [
        "Trồng thêm cây xanh để hấp thụ khí CO2",
        "Đi xe đạp hoặc đi bộ thay vì đi ô tô để giảm khí thải",
      ],
    },
  },
  hisgeo: {
    history_g4: {
      concepts: [
        "Văn Lang – Âu Lạc: nhà nước đầu tiên",
        "Hai Bà Trưng khởi nghĩa năm 40",
        "Ngô Quyền chiến thắng Bạch Đằng 938",
      ],
      examples: [
        "Truyền thuyết: Lạc Long Quân và Âu Cơ",
        "Vua Hùng dựng nước, giỗ tổ mùng 10/3",
      ],
      tips: ["Đọc truyện lịch sử", "Xem phim tài liệu"],
    },
    dia_ly_g4: {
      concepts: [
        "VN hình chữ S, dài 1650 km",
        "Phía Bắc: núi cao (Fansipan 3143m)",
        "Miền Trung: dải đất hẹp",
        "Phía Nam: đồng bằng sông Cửu Long",
      ],
      examples: [
        "Sông Hồng chảy qua Hà Nội",
        "Sông Mê Kông (Cửu Long) chảy qua miền Nam",
      ],
      tips: ["Xem bản đồ VN", "Tìm quê mình trên bản đồ"],
    },
    nhan_vat_ls: {
      concepts: [
        "Hai Bà Trưng: nữ anh hùng chống Hán",
        'Lý Thường Kiệt: "Nam quốc sơn hà"',
        "Trần Hưng Đạo: 3 lần thắng Nguyên Mông",
        'Nguyễn Trãi: "Bình Ngô đại cáo"',
      ],
      examples: ["Trần Hưng Đạo dùng cọc gỗ trên sông Bạch Đằng"],
      tips: ["Đọc truyện tranh lịch sử", "Viết timeline các nhân vật"],
    },
    ban_do: {
      concepts: [
        "Bản đồ: hình vẽ thu nhỏ mặt đất",
        "4 hướng: Bắc, Nam, Đông, Tây",
        "Tỷ lệ bản đồ: 1:100.000 = 1cm = 1km",
        "Ký hiệu: sông (xanh), núi (nâu), đường (đỏ)",
      ],
      examples: ["Mặt trời mọc hướng Đông", "La bàn chỉ hướng Bắc"],
      tips: ["Vẽ bản đồ phòng em", "Tìm hướng bằng mặt trời"],
    },
    vung_mien: {
      concepts: [
        "Việt Nam có 3 miền: Bắc Bộ, Trung Bộ, Nam Bộ",
        "Mỗi miền có đặc điểm địa hình, khí hậu và văn hóa riêng",
        "Miền Bắc có 4 mùa, Miền Nam có 2 mùa mưa và khô",
      ],
      examples: [
        "Miền Bắc có Vịnh Hạ Long, Miền Nam có chợ nổi Cái Răng",
        "Phở là món ăn nổi tiếng ở miền Bắc, bánh xèo đặc trưng ở miền Nam",
      ],
      tips: [
        "Quan sát bản đồ để thấy vị trí các vùng miền",
        "Tìm hiểu qua các món ăn đặc sản của từng vùng",
      ],
    },
    geography: {
      concepts: [
        "Địa lý nghiên cứu về Trái Đất, tự nhiên và con người",
        "Bản đồ, quả địa cầu là công cụ học địa lý",
        "Tìm hiểu về sông, núi, biển, đồng bằng",
      ],
      examples: [
        "Sông Hồng là sông lớn nhất miền Bắc",
        "Đỉnh Fansipan là nóc nhà Đông Dương",
      ],
      tips: [
        "Luôn chú ý đến phần chú giải trên bản đồ",
        "Học cách xác định phương hướng Bắc-Nam-Đông-Tây",
      ],
    },
    history_g5: {
      concepts: [
        "Lịch sử lớp 5 học về thời kỳ kháng chiến chống Pháp và Mỹ",
        "Giai đoạn xây dựng và bảo vệ đất nước sau năm 1975",
        "Những chiến thắng vang dội: Điện Biên Phủ, Đại thắng mùa Xuân 1975",
      ],
      examples: [
        "Chiến dịch Điện Biên Phủ năm 1954",
        "Bác Hồ đọc Tuyên ngôn Độc lập năm 1945",
      ],
      tips: [
        "Ghi nhớ các mốc thời gian bằng cách lập sơ đồ tư duy (timeline)",
        "Học lịch sử qua các câu chuyện kể về anh hùng",
      ],
    },
    dan_cu_kt: {
      concepts: [
        "Dân cư: phân bố dân số, các dân tộc anh em",
        "Kinh tế: Nông nghiệp, Công nghiệp, Dịch vụ",
        "Việt Nam là nước xuất khẩu gạo hàng đầu",
      ],
      examples: [
        "Đồng bằng sông Cửu Long là vựa lúa lớn nhất nước",
        "Thành phố Hồ Chí Minh là trung tâm kinh tế lớn",
      ],
      tips: [
        "Xem bản đồ kinh tế để biết vùng nào trồng cây gì",
        "Liên hệ với các ngành nghề xung quanh nơi em sống",
      ],
    },
    di_tich_di_san: {
      concepts: [
        "Di sản thiên nhiên và văn hóa thế giới được UNESCO công nhận",
        "Di tích lịch sử là nơi lưu giữ dấu ấn của quá khứ",
        "Trách nhiệm bảo vệ và tôn tạo di tích",
      ],
      examples: [
        "Phố cổ Hội An, Quần thể danh thắng Tràng An",
        "Hoàng thành Thăng Long, Cố đô Huế",
      ],
      tips: [
        "Tìm hiểu di tích lịch sử ở ngay tỉnh/thành phố của em",
        "Không viết bậy, xả rác khi đi tham quan di tích",
      ],
    },
    chau_luc: {
      concepts: [
        "Trái Đất có 6 châu lục và 4 đại dương",
        "Châu Á là châu lục lớn nhất, đông dân nhất",
        "Đặc điểm tự nhiên và dân cư của từng châu lục",
      ],
      examples: [
        "Việt Nam nằm ở khu vực Đông Nam Á, thuộc Châu Á",
        "Châu Nam Cực là châu lục lạnh nhất, phủ băng quanh năm",
      ],
      tips: [
        "Chỉ vị trí các châu lục trên quả địa cầu",
        "Tìm hiểu động vật đặc trưng (VD: Kangaroo ở Châu Úc)",
      ],
    },
  },
  computing: {
    hardware: {
      concepts: [
        "Máy tính gồm: thân máy, màn hình, bàn phím, chuột",
        "CPU = bộ não xử lý",
        "RAM = bộ nhớ tạm",
        "Ổ cứng = lưu dữ liệu",
      ],
      examples: [
        "Bàn phím có chữ cái, số, phím đặc biệt",
        "Chuột: click trái (chọn), click phải (menu)",
      ],
      tips: ["Tập gõ 10 ngón", "Giữ tư thế ngồi đúng"],
    },
    word_processing: {
      concepts: [
        "Mở Word/Docs → gõ nội dung → lưu file",
        "In đậm (B), in nghiêng (I), gạch chân (U)",
        "Căn lề: trái, giữa, phải",
        "Cỡ chữ, font chữ, màu chữ",
      ],
      examples: ["Ctrl+S = Lưu file", "Ctrl+Z = Hoàn tác (undo)"],
      tips: ["Lưu file thường xuyên", "Đặt tên file dễ nhớ"],
    },
    internet_basic: {
      concepts: [
        "Internet = mạng kết nối toàn cầu",
        "Trình duyệt: Chrome, Safari, Firefox",
        "Website = trang web có thông tin",
        "Tìm kiếm: gõ từ khóa vào Google",
      ],
      examples: [
        "google.com → tìm kiếm thông tin",
        "youtube.com → xem video học",
      ],
      tips: [
        "Không chia sẻ thông tin cá nhân",
        "Hỏi bố mẹ trước khi vào web mới",
      ],
    },
    cyber_safety: {
      concepts: [
        "Không chia sẻ: tên, địa chỉ, số điện thoại",
        "Mật khẩu mạnh: dài, có chữ + số + ký hiệu",
        "Không click link lạ",
        "Báo người lớn khi gặp nội dung xấu",
      ],
      examples: ["Mật khẩu yếu: 123456 ❌", "Mật khẩu mạnh: MyDog$2024! ✅"],
      tips: ["Đổi mật khẩu 3 tháng/lần", "Không tải app từ nguồn lạ"],
    },
    scratch_basic: {
      concepts: [
        "Scratch = lập trình kéo thả khối lệnh",
        "Nhân vật (Sprite) thực hiện lệnh",
        "Vòng lặp: lặp lại hành động",
        "Điều kiện: nếu... thì...",
      ],
      examples: ["Di chuyển 10 bước → xoay 90° → lặp 4 lần = vẽ hình vuông"],
      tips: ["Bắt đầu với dự án đơn giản", "Chia sẻ project trên Scratch"],
    },
    paint_drawing: {
      concepts: [
        "Mở phần mềm Paint",
        "Các công cụ cơ bản: Bút chì, Tẩy, Tô màu",
        "Vẽ các hình cơ bản: tròn, vuông, tam giác",
      ],
      examples: [
        "Dùng Bút chì để vẽ tự do",
        "Dùng công cụ Tô màu (thùng sơn) để đổ màu vào hình khép kín",
      ],
      tips: [
        "Luôn vẽ hình khép kín trước khi tô màu",
        "Ctrl+Z để quay lại nếu vẽ sai",
      ],
    },
    excel_basic: {
      concepts: [
        "Bảng tính gồm các Hàng (số) và Cột (chữ)",
        "Ô (Cell) là giao điểm của Hàng và Cột",
        "Nhập dữ liệu và số liệu vào Ô",
      ],
      examples: [
        "Ô A1 nằm ở cột A, hàng 1",
        "Nhập công thức luôn bắt đầu bằng dấu = (VD: =5+3)",
      ],
      tips: ["Dùng phím Enter để xuống dòng", "Kéo góc ô để copy dữ liệu"],
    },
    comp_logic: {
      concepts: [
        "Tư duy máy tính là cách giải quyết vấn đề theo từng bước",
        "Chia nhỏ bài toán (Decomposition)",
        "Tìm quy luật (Pattern Recognition)",
        "Thuật toán (Algorithm)",
      ],
      examples: [
        "Thuật toán đánh răng: Lấy kem -> Chải răng -> Súc miệng",
        "Tìm quy luật: 2, 4, 6, 8... số tiếp theo là 10",
      ],
      tips: [
        "Viết ra giấy các bước trước khi làm trên máy",
        "Chia bài toán lớn thành các bước nhỏ dễ làm hơn",
      ],
    },
    ppt_basic: {
      concepts: [
        "PowerPoint dùng để làm bài thuyết trình",
        "Slide là một trang trình chiếu",
        "Thêm chữ, hình ảnh, và hiệu ứng vào Slide",
      ],
      examples: [
        "Nhấn New Slide để thêm trang mới",
        "Chọn Transition để tạo hiệu ứng chuyển trang",
      ],
      tips: [
        "Không nên để quá nhiều chữ trên một Slide",
        "Dùng hình ảnh minh họa cho bài nói sinh động",
      ],
    },
  },
  ethics: {
    polite_greet: {
      concepts: [
        'Gặp người lớn: "Con chào ạ!"',
        'Gặp bạn: "Chào bạn!"',
        'Khi nhận quà: "Con cảm ơn ạ!"',
        'Khi mắc lỗi: "Con xin lỗi ạ!"',
      ],
      examples: [
        'Sáng: "Con chào cô ạ!" (khi đến lớp)',
        'Chiều: "Con chào bố mẹ ạ!" (khi về nhà)',
      ],
      tips: ["Chào hỏi mỗi ngày", "Nói cảm ơn, xin lỗi ngay"],
    },
    yeu_thuong_gia_dinh: {
      concepts: [
        "Gia đình = nơi yêu thương nhất",
        "Kính trọng ông bà, yêu thương bố mẹ",
        "Giúp đỡ việc nhà phù hợp tuổi",
        "Chia sẻ với anh chị em",
      ],
      examples: [
        "Phụ mẹ dọn bàn ăn",
        "Đọc sách cho em nghe",
        "Tưới cây với ông",
      ],
      tips: ['Nói "Con yêu..." mỗi ngày', "Tự làm thiệp tặng gia đình"],
    },
    giu_ve_sinh: {
      concepts: [
        "Rửa tay bằng xà phòng 20 giây",
        "Đánh răng sáng + tối",
        "Bỏ rác đúng chỗ, phân loại rác",
        "Giữ lớp học, nhà ở sạch sẽ",
      ],
      examples: ["6 bước rửa tay: lòng → mu → kẽ → móng → ngón cái → cổ tay"],
      tips: ["Hát bài 20 giây khi rửa tay", "Mang khăn tay sạch mỗi ngày"],
    },
    express_emotion: {
      concepts: [
        "Cảm xúc: vui, buồn, giận, sợ, ngạc nhiên",
        'Nói ra cảm xúc: "Em cảm thấy buồn vì..."',
        "Hít thở sâu khi tức giận",
        "Lắng nghe khi bạn buồn",
      ],
      examples: [
        'Vui: "Em rất vui vì được khen!"',
        'Buồn: "Em buồn vì bạn không chơi cùng"',
      ],
      tips: ["Vẽ mặt cảm xúc", "Kể cho bố mẹ nghe mỗi tối"],
    },
    doan_ket: {
      concepts: [
        "Đoàn kết là cùng nhau hợp tác, giúp đỡ lẫn nhau",
        "Không chia rẽ, không phân biệt đối xử",
        "Cùng làm việc nhóm để đạt kết quả tốt nhất",
      ],
      examples: [
        "Cả lớp cùng dọn dẹp vệ sinh trường học",
        "Giúp đỡ bạn mới chuyển đến lớp",
      ],
      tips: [
        "Luôn lắng nghe ý kiến của bạn bè",
        "Sẵn sàng nhường nhịn khi có xích mích nhỏ",
      ],
    },
    ky_luat: {
      concepts: [
        "Kỷ luật là tự giác thực hiện đúng nội quy, quy định",
        "Đúng giờ, giữ trật tự, hoàn thành nhiệm vụ",
        "Kỷ luật giúp tập thể vững mạnh và an toàn",
      ],
      examples: [
        "Xếp hàng ngay ngắn khi vào lớp",
        "Làm bài tập về nhà đầy đủ trước khi đến trường",
      ],
      tips: [
        "Tự đặt báo thức để dậy đúng giờ",
        "Lập thời gian biểu hàng ngày và tuân thủ",
      ],
    },
    honesty: {
      concepts: [
        "Trung thực là nói thật, không nói dối, không gian lận",
        "Dũng cảm nhận lỗi khi làm sai",
        "Trả lại đồ nhặt được cho người đánh rơi",
      ],
      examples: [
        "Không quay cóp bài trong giờ kiểm tra",
        "Thừa nhận với mẹ là mình lỡ làm vỡ cái ly",
      ],
      tips: [
        "Sự thật luôn là điều tốt nhất",
        "Người trung thực luôn được mọi người tin tưởng",
      ],
    },
    bao_ve_moi_truong: {
      concepts: [
        "Môi trường là nơi chúng ta sinh sống: đất, nước, không khí, cây xanh",
        "Vứt rác đúng nơi quy định, phân loại rác",
        "Tiết kiệm điện, nước, trồng nhiều cây xanh",
      ],
      examples: [
        "Tắt quạt và đèn khi ra khỏi phòng",
        "Mang chai nước cá nhân thay vì dùng chai nhựa dùng một lần",
      ],
      tips: [
        "Nhặt rác nếu thấy trên sân trường",
        "Tái chế giấy vụn, hộp các-tông thành đồ chơi",
      ],
    },
    ton_su: {
      concepts: [
        "Tôn sư trọng đạo: kính trọng thầy cô, coi trọng việc học",
        "Lễ phép chào hỏi, ngoan ngoãn vâng lời",
        "Cố gắng học tập tốt để đền đáp công ơn thầy cô",
      ],
      examples: [
        "Đứng nghiêm trang chào thầy cô khi vào lớp",
        "Tặng hoa và thiệp tự làm nhân ngày 20/11",
      ],
      tips: [
        "Chú ý nghe giảng trong lớp",
        "Làm bài tập đầy đủ là cách thể hiện sự kính trọng",
      ],
    },
    responsibility: {
      concepts: [
        "Trách nhiệm là hoàn thành tốt nhiệm vụ được giao",
        "Tự chịu hậu quả về việc làm của mình",
        "Chăm sóc bản thân, giúp đỡ gia đình",
      ],
      examples: [
        "Tự gấp chăn màn sau khi ngủ dậy",
        "Nhận trực nhật lớp và làm thật sạch sẽ",
      ],
      tips: [
        "Đừng đùn đẩy công việc cho người khác",
        "Hứa điều gì thì phải làm cho bằng được",
      ],
    },
    children_rights: {
      concepts: [
        "Quyền trẻ em: Quyền được sống, được bảo vệ, được phát triển và được tham gia",
        "Trẻ em có quyền được đi học, được vui chơi",
        "Trẻ em phải được bảo vệ khỏi bạo lực và bóc lột",
      ],
      examples: [
        "Mọi trẻ em đều được đến trường học chữ",
        "Trẻ em được bày tỏ ý kiến của mình với bố mẹ",
      ],
      tips: [
        "Nhớ số điện thoại khẩn cấp (111) để gọi khi cần bảo vệ",
        "Luôn chia sẻ với người lớn tin cậy khi cảm thấy không an toàn",
      ],
    },
    yeu_que_huong: {
      concepts: [
        "Yêu quê hương là tự hào về truyền thống, vẻ đẹp của đất nước",
        "Giữ gìn bản sắc văn hóa dân tộc",
        "Cố gắng học tập để xây dựng đất nước",
      ],
      examples: [
        "Hát Quốc ca với thái độ trang nghiêm",
        "Tìm hiểu về các anh hùng dân tộc trong lịch sử",
      ],
      tips: [
        "Tham quan các di tích lịch sử ở địa phương",
        "Kể cho bạn bè nghe về cảnh đẹp quê mình",
      ],
    },
    community_empathy: {
      concepts: [
        "Đồng cảm là biết chia sẻ, thấu hiểu cảm xúc của người khác",
        "Giúp đỡ những người có hoàn cảnh khó khăn",
        "Quan tâm đến cộng đồng xung quanh",
      ],
      examples: [
        "Quyên góp sách vở cho học sinh vùng lũ",
        "Giúp đỡ người già qua đường",
      ],
      tips: [
        "Đặt mình vào vị trí của người khác để hiểu họ",
        "Một lời động viên nhỏ cũng mang lại niềm vui lớn",
      ],
    },
    internet_safety: {
      concepts: [
        "An toàn mạng là bảo vệ thông tin cá nhân trên Internet",
        "Không chia sẻ mật khẩu, địa chỉ nhà, trường học cho người lạ",
        "Chỉ truy cập các trang web an toàn, phù hợp lứa tuổi",
      ],
      examples: [
        "Từ chối kết bạn với người không quen biết trên mạng",
        "Báo ngay cho bố mẹ nếu thấy nội dung xấu, đáng sợ",
      ],
      tips: [
        "Hỏi ý kiến người lớn trước khi tải ứng dụng",
        "Luôn dùng từ ngữ lịch sự khi bình luận trên mạng",
      ],
    },
    hop_tac: {
      concepts: [
        "Hợp tác là cùng nhau làm việc hướng tới mục tiêu chung",
        "Phân công công việc rõ ràng, công bằng",
        "Biết lắng nghe và tôn trọng ý kiến của thành viên khác",
      ],
      examples: [
        "Cùng nhóm làm mô hình khoa học cho hội thi",
        "Tổ chức các trò chơi tập thể trong buổi sinh hoạt lớp",
      ],
      tips: [
        'Luôn nói "Chúng ta" thay vì "Tôi"',
        "Khen ngợi khi bạn làm tốt và động viên khi bạn gặp khó khăn",
      ],
    },
  },
  art: {
    basic_colors: {
      concepts: [
        "3 màu cơ bản: Đỏ, Vàng, Xanh dương",
        "Pha màu: Đỏ + Vàng = Cam, Xanh + Vàng = Xanh lá, Đỏ + Xanh = Tím",
        "Màu nóng: đỏ, cam, vàng → sôi động",
        "Màu lạnh: xanh, tím → yên tĩnh",
      ],
      examples: [
        "🔴 + 🟡 = 🟠 (đỏ + vàng = cam)",
        "🔵 + 🟡 = 🟢 (xanh + vàng = xanh lá)",
      ],
      tips: ["Pha màu nước thử", "Vẽ cầu vồng 7 màu"],
    },
    hat_thieu_nhi: {
      concepts: [
        "Hát đúng giai điệu (melody)",
        "Giữ nhịp (rhythm): 2/4, 3/4, 4/4",
        "Hát rõ lời, đúng cao độ",
        "Biểu cảm khi hát",
      ],
      examples: [
        'Bài hát: "Lí cây xanh", "Cháu yêu bà"',
        "Nhịp 2/4: MẠNH-nhẹ, MẠNH-nhẹ",
      ],
      tips: ["Hát mỗi ngày 10 phút", "Ghi âm giọng hát của mình"],
    },
    nan_tao_hinh: {
      concepts: [
        "Nặn: dùng đất sét/đất nặn tạo hình",
        "Các bước: nhào → lăn → uốn → ghép → hoàn thiện",
        "Hình cơ bản: cầu, trụ, khối vuông",
      ],
      examples: [
        "Nặn quả táo: vo tròn + thêm cuống",
        "Nặn con rắn: lăn dài + uốn cong",
      ],
      tips: ["Bắt đầu từ hình đơn giản", "Dùng que tăm tạo chi tiết"],
    },
    music_rhythm: {
      concepts: [
        "Nhịp = trái tim của âm nhạc",
        "Nốt tròn (4 phách), nốt trắng (2), nốt đen (1)",
        "Phách mạnh - nhẹ tạo nhịp điệu",
        "Nghỉ = im lặng cũng là âm nhạc",
      ],
      examples: [
        "Vỗ tay theo nhịp: TÚM-tà, TÚM-tà (nhịp 2/4)",
        "1-2-3, 1-2-3 (nhịp 3/4 = waltz)",
      ],
      tips: ["Vỗ tay theo bài hát", "Dùng muỗng, đũa làm nhạc cụ"],
    },
    ve_theo_mau: {
      concepts: [
        "Quan sát kỹ hình dáng, màu sắc của mẫu",
        "Phác khung hình chung trước, sau đó phác chi tiết",
        "Tô màu từ nhạt đến đậm",
      ],
      examples: [
        "Vẽ quả cam: Vẽ khung hình vuông, phác nét cong thành hình tròn, thêm cuống và lá",
        "Vẽ cái cốc: Phác hình trụ đứng, thêm tay cầm",
      ],
      tips: [
        "Nhìn mẫu nhiều hơn nhìn giấy khi vẽ",
        "Dùng bút chì mờ để dễ tẩy xóa",
      ],
    },
    shapes_drawing: {
      concepts: [
        "Sử dụng các hình cơ bản: vuông, tròn, tam giác, chữ nhật để tạo hình",
        "Kết hợp các nét thẳng, cong, xiên",
        "Tạo sự cân đối trong bức tranh",
      ],
      examples: [
        "Vẽ ngôi nhà: Mái là tam giác, thân là hình chữ nhật, cửa là hình vuông",
        "Vẽ con vật: Đầu tròn, thân bầu dục",
      ],
      tips: [
        "Tưởng tượng mọi vật thể phức tạp thành các hình học cơ bản",
        "Đừng sợ vẽ sai, hãy cứ vẽ nét tự tin",
      ],
    },
    thu_cong: {
      concepts: [
        "Sử dụng kéo an toàn, giấy màu, hồ dán",
        "Các kỹ thuật gấp, cắt, dán, xé dán",
        "Tạo hình 2D và 3D đơn giản từ giấy",
      ],
      examples: [
        "Gấp thuyền giấy: Gấp đôi tờ giấy chữ nhật, gấp các góc lại",
        "Xé dán tranh phong cảnh: Xé giấy vụn tạo hình cây, mây",
      ],
      tips: [
        "Cẩn thận khi dùng kéo, cất kéo ngay sau khi dùng xong",
        "Dùng lượng hồ dán vừa phải để giấy không bị nhăn",
      ],
    },
    dong_dao: {
      concepts: [
        "Đồng dao là thơ ca dân gian truyền miệng cho trẻ em",
        "Thường gắn liền với các trò chơi dân gian",
        "Nhịp điệu vui tươi, dễ nhớ, dễ thuộc",
      ],
      examples: [
        "Chi chi chành chành, cái đanh thổi lửa...",
        "Rồng rắn lên mây, có cây xúc xắc...",
      ],
      tips: [
        "Vừa đọc đồng dao vừa vỗ tay theo nhịp",
        "Rủ bạn bè cùng chơi trò chơi gắn với bài đồng dao",
      ],
    },
    music_instruments: {
      concepts: [
        "Nhạc cụ dân tộc: Đàn bầu, đàn tranh, sáo trúc, trống cơm",
        "Nhạc cụ phương tây: Piano, Guitar, Violin",
        "Phân loại: Bộ gõ, bộ dây, bộ hơi",
      ],
      examples: [
        "Sáo trúc phát ra âm thanh nhờ hơi thổi (Bộ hơi)",
        "Đàn bầu chỉ có một dây nhưng âm thanh rất vang (Bộ dây)",
      ],
      tips: [
        "Nghe thử âm thanh của từng loại nhạc cụ trên internet",
        "Chú ý cách người nghệ sĩ cầm và chơi nhạc cụ",
      ],
    },
    trang_tri_hoa_tiet: {
      concepts: [
        "Họa tiết thường là hoa, lá, động vật được cách điệu",
        "Sắp xếp theo quy luật: lặp lại, xen kẽ, đối xứng",
        "Trang trí hình vuông, hình tròn, đường diềm",
      ],
      examples: [
        "Trang trí cái đĩa tròn với hoa sen ở giữa",
        "Trang trí đường diềm áo với các họa tiết lặp lại",
      ],
      tips: [
        "Dùng trục đối xứng (ngang, dọc) để vẽ cho cân bằng",
        "Tô màu họa tiết chính nổi bật hơn nền",
      ],
    },
    tranh_dan_gian: {
      concepts: [
        "Tranh Đông Hồ, tranh Hàng Trống là những dòng tranh dân gian nổi tiếng",
        "Chủ đề gần gũi: con vật, đời sống nông thôn",
        "Chất liệu tự nhiên, in từ mộc bản",
      ],
      examples: [
        "Tranh Lợn đàn thể hiện sự sung túc",
        "Tranh Đám cưới chuột châm biếm sâu sắc",
      ],
      tips: [
        "Quan sát các màu sắc tự nhiên (màu điệp, đỏ gạch)",
        "Tìm hiểu ý nghĩa đằng sau mỗi bức tranh",
      ],
    },
    art_appreciation: {
      concepts: [
        "Cảm thụ là hiểu và nêu được cảm nhận về cái đẹp",
        "Quan sát màu sắc, bố cục, đường nét, mảng khối",
        "Biết nhận xét và tôn trọng tác phẩm của người khác",
      ],
      examples: [
        "Bức tranh này dùng nhiều màu nóng tạo cảm giác vui tươi",
        "Bức tượng này có đường nét rất uyển chuyển",
      ],
      tips: [
        "Hãy tự hỏi: Bức tranh này làm em cảm thấy thế nào?",
        "Không có nhận xét đúng hay sai, chỉ là cảm nhận riêng",
      ],
    },
    sang_tac_chu_de: {
      concepts: [
        "Chọn chủ đề mình yêu thích và hiểu rõ",
        "Phác thảo ý tưởng (bố cục chính phụ)",
        "Thể hiện bằng các chất liệu khác nhau (màu sáp, màu nước)",
      ],
      examples: [
        "Chủ đề Gia đình: Mẹ đang nấu ăn, em đang quét nhà",
        "Chủ đề Ước mơ: Em bay lên vũ trụ làm phi hành gia",
      ],
      tips: [
        "Vẽ hình ảnh chính to, rõ ở giữa tranh",
        "Kể một câu chuyện qua bức tranh của mình",
      ],
    },
  },
  english: {
    alphabet_en: {
      concepts: [
        "The English alphabet has 26 letters",
        "Vowels: a, e, i, o, u",
        "Consonants: b, c, d, f...",
      ],
      examples: ["A is for Apple", "B is for Bear", "C is for Cat"],
      tips: [
        "Sing the ABC song to remember",
        "Practice writing uppercase and lowercase letters",
      ],
    },
    colors_numbers: {
      concepts: [
        "Colors: Red, Blue, Yellow, Green, Black, White",
        "Numbers: One (1), Two (2), Three (3)... Ten (10)",
      ],
      examples: ["The sky is blue", "I have two apples"],
      tips: [
        "Point to objects and say their colors in English",
        "Count your toys from 1 to 10",
      ],
    },
    animals_en: {
      concepts: [
        "Pets: Dog, Cat, Fish, Bird",
        "Farm animals: Cow, Pig, Horse, Duck",
        "Wild animals: Lion, Tiger, Elephant, Monkey",
      ],
      examples: ["The dog says woof", "A monkey likes bananas"],
      tips: [
        "Act like an animal and guess its name",
        "Draw an animal and label it in English",
      ],
    },
    greetings_en: {
      concepts: [
        "Saying hello: Hello, Hi, Good morning",
        "Saying goodbye: Goodbye, Bye, See you",
        "Asking how someone is: How are you?",
      ],
      examples: ["Good morning, teacher!", "I am fine, thank you."],
      tips: [
        "Smile when you say hello",
        "Practice greeting your family in English",
      ],
    },
    body_school: {
      concepts: [
        "Body parts: Head, Shoulders, Knees, Toes, Eyes, Ears, Mouth, Nose",
        "School items: Pen, Pencil, Book, Eraser, Ruler, Bag",
      ],
      examples: ["I have two eyes", "This is my pencil"],
      tips: [
        'Sing "Head, Shoulders, Knees and Toes"',
        "Label your school items with English words",
      ],
    },
    family_en: {
      concepts: [
        "Family members: Father (Dad), Mother (Mom), Brother, Sister, Grandfather, Grandmother",
        "Use possessives: my dad, your mom, his sister, her brother",
      ],
      examples: ["This is my mom", "I have one brother"],
      tips: [
        "Draw your family tree",
        'Point to a photo and say "This is my..."',
      ],
    },
    vocab_en: {
      concepts: [
        "Learn words in groups (themes): Food, Clothes, Jobs, Places",
        "Nouns are things, Verbs are actions",
      ],
      examples: ["Food: Apple, Bread, Milk", "Jobs: Teacher, Doctor, Police"],
      tips: ["Use flashcards to remember words", "Learn 3 new words every day"],
    },
    hobbies_food: {
      concepts: [
        "Hobbies: Swimming, Reading, Singing, Drawing",
        "Food: Pizza, Salad, Chicken, Rice",
        "Likes and dislikes: I like..., I do not like...",
      ],
      examples: ["I like playing football", "She likes eating pizza"],
      tips: [
        "Talk about what you like to do on weekends",
        "Name the food on your plate in English",
      ],
    },
    weather_en: {
      concepts: [
        "Weather: Sunny, Rainy, Cloudy, Windy, Snowy",
        "Seasons: Spring, Summer, Autumn (Fall), Winter",
      ],
      examples: ["It is sunny today", "I like summer because it is hot"],
      tips: [
        "Look out the window and describe the weather",
        "Draw what you wear in winter",
      ],
    },
    grammar_en: {
      concepts: [
        "Pronouns: I, You, He, She, It, We, They",
        "To be verbs: am, is, are",
        "Plurals: Add -s or -es to nouns",
      ],
      examples: ["I am a student. He is a boy.", "One apple -> Two apples"],
      tips: [
        "I always goes with am",
        "He/She/It goes with is",
        "You/We/They go with are",
      ],
    },
    reading_en: {
      concepts: [
        "Read the title and look at the pictures first",
        "Look for keywords you know",
        "Guess the meaning of new words from the sentence",
      ],
      examples: [
        "Title: The Hungry Bear -> The story is about a bear looking for food.",
      ],
      tips: [
        "Read out loud to practice pronunciation",
        "Do not stop at every new word, try to understand the main idea",
      ],
    },
    daily_routines: {
      concepts: [
        "Morning: Wake up, brush teeth, have breakfast, go to school",
        "Afternoon/Evening: Do homework, have dinner, go to bed",
        "Time words: in the morning, at night, usually, sometimes",
      ],
      examples: ["I wake up at 6 AM", "She goes to bed at 9 PM"],
      tips: [
        "Write a diary of your day in English",
        "Say what you are doing while doing it",
      ],
    },
    past_tense: {
      concepts: [
        "Regular verbs: add -ed (play -> played, work -> worked)",
        "Irregular verbs: change form (go -> went, eat -> ate)",
        "Time words: yesterday, last week, in 2020",
      ],
      examples: [
        "I played football yesterday",
        "We went to the zoo last Sunday",
      ],
      tips: [
        "Memorize common irregular verbs",
        "Practice telling a story about your past weekend",
      ],
    },
    sentence_en: {
      concepts: [
        "A basic sentence: Subject + Verb + Object",
        "Use adjectives before nouns to add detail",
        "Connect ideas with: and, but, because",
      ],
      examples: [
        "The boy (Subject) eats (Verb) an apple (Object).",
        "I like pizza, but I do not like burgers.",
      ],
      tips: [
        "Always start a sentence with a capital letter",
        "End a sentence with a full stop (.), question mark (?), or exclamation mark (!)",
      ],
    },
    travel_environment: {
      concepts: [
        "Transport: Car, Bus, Train, Airplane, Bicycle",
        "Places: Beach, Mountain, City, Countryside",
        "Environment: Protect nature, recycle, save water",
      ],
      examples: [
        "I go to school by bus",
        "We must save water to protect the Earth",
      ],
      tips: [
        "Learn directions: go straight, turn left, turn right",
        "Talk about your dream holiday destination",
      ],
    },
    story_writing: {
      concepts: [
        "A story needs: Characters (who), Setting (where/when), Plot (what happens)",
        "Structure: Beginning, Middle, End",
        "Use linking words: First, Then, Next, Finally",
      ],
      examples: [
        "First, the boy walked into the forest. Next, he saw a big bear. Finally, he ran away.",
      ],
      tips: [
        "Plan your story before writing",
        "Use exciting adjectives to make it interesting",
      ],
    },
  },
};

export function getUniversalLesson(
  subject: string,
  topicKey: string,
  topicName: string,
  icon: string,
  grade: number,
): UniversalLesson {
  const subjectData = SUBJECT_LESSONS[subject];
  if (subjectData) {
    const lesson = subjectData[topicKey];
    if (lesson) return buildLesson(subject, topicName, icon, grade, lesson);
    const partialKey = Object.keys(subjectData).find((k) =>
      topicKey.includes(k),
    );
    if (partialKey)
      return buildLesson(
        subject,
        topicName,
        icon,
        grade,
        subjectData[partialKey],
      );
  }
  // For English units (g1_u01 → g5_u20), load ACTUAL unit vocabulary & patterns
  if (subject === 'english' && /^g\d_u\d{2}$/.test(topicKey)) {
    const unit = _getEnglishUnit(topicKey);
    if (unit) {
      const vocab = unit.vocabulary;
      const patterns = unit.patterns;
      return buildLesson(subject, topicName, icon, grade, {
        concepts: [
          `📚 Từ vựng: ${vocab.slice(0, 5).map(v => `${v.en} (${v.vi})`).join(', ')}`,
          ...(vocab.length > 5 ? [`📚 Thêm: ${vocab.slice(5).map(v => `${v.en} (${v.vi})`).join(', ')}`] : []),
          ...(patterns.length > 0 ? [`📝 Mẫu câu: "${patterns[0].pattern}"`] : []),
        ],
        examples: patterns.length > 0
          ? patterns.map(p => `${p.example} — ${p.exampleVi}`)
          : [`Practice with the vocabulary words above`],
        tips: [
          `🎯 Luyện nói mỗi từ 3 lần: ${vocab[0]?.en ?? ''}, ${vocab[1]?.en ?? ''}, ${vocab[2]?.en ?? ''}`,
          `🔊 Đọc to các mẫu câu và thay đổi từ trong chỗ trống`,
        ],
      });
    }
  }
  // Auto-generate from topic name — ensures 100% coverage
  return buildLesson(subject, topicName, icon, grade, {
    concepts: [
      `Chủ đề: ${topicName}`,
      `Lớp ${grade} — Hãy đọc kỹ trước khi làm bài`,
      `Ghi nhớ các từ khóa quan trọng trong bài`,
    ],
    examples: [
      `Ví dụ sẽ xuất hiện trong phần luyện tập`,
      `Hãy đọc câu hỏi thật kỹ trước khi chọn đáp án`,
    ],
    tips: [
      `Đọc bài 2 lần trước khi trả lời`,
      `Nếu không chắc, dùng phép loại trừ`,
    ],
  });
}

function buildLesson(
  subject: string,
  topicName: string,
  icon: string,
  grade: number,
  data: { concepts: string[]; examples: string[]; tips: string[] },
): UniversalLesson {
  return {
    title: topicName,
    titleVi: topicName,
    icon,
    grade,
    subject,
    sections: [
      {
        type: "concepts",
        title: "📖 Kiến thức cần biết",
        items: data.concepts,
      },
      { type: "examples", title: "✏️ Ví dụ minh họa", items: data.examples },
      { type: "tips", title: "💡 Mẹo học hiệu quả", items: data.tips },
    ],
  };
}
