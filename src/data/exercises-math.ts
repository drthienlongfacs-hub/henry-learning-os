// ========================================
// HENRY LEARNING OS — MATH GRADES 1-2
// Integrated benchmark: Vietnam CTGDPT 2018 + Singapore CPA + Cambridge reasoning
// Focus: number sense, place value, operations, measurement, geometry, data, problem solving
// ========================================

import type { Exercise, Lesson } from '@/types';

function mc(
  id: string,
  question: string,
  options: string[],
  correctAnswer: string,
  explanation: string,
  difficulty = 1,
  hints: string[] = [],
  tags: string[] = []
): Exercise {
  return {
    id,
    question,
    type: 'multiple_choice',
    options,
    correctAnswer,
    explanation,
    difficulty,
    hints,
    tags,
    subject: 'Toán',
  };
}

function ft(
  id: string,
  question: string,
  correctAnswer: string,
  explanation: string,
  difficulty = 1,
  hints: string[] = [],
  tags: string[] = []
): Exercise {
  return {
    id,
    question,
    type: 'free_text',
    correctAnswer,
    explanation,
    difficulty,
    hints,
    tags,
    subject: 'Toán',
  };
}

function ex(
  id: string,
  question: string,
  correctAnswer: string,
  explanation: string,
  difficulty = 2,
  hints: string[] = [],
  tags: string[] = []
): Exercise {
  return {
    id,
    question,
    type: 'explain',
    correctAnswer,
    explanation,
    difficulty,
    hints,
    tags,
    subject: 'Toán',
  };
}

export const countingExercises: Exercise[] = [
  mc('g1-count-01', 'Có bao nhiêu quả táo? 🍎🍎🍎', ['2', '3', '4', '5'], '3', 'Có 3 quả táo.', 1, ['Chỉ vào từng quả rồi đếm.'], ['grade1', 'counting']),
  mc('g1-count-02', 'Số nào đứng sau 7?', ['6', '7', '8', '9'], '8', 'Sau 7 là 8.', 1, ['Đếm tiếp sau 7.'], ['grade1', 'counting']),
  ft('g1-count-03', 'Điền số còn thiếu: 4, 5, 6, __', '7', 'Dãy số tăng thêm 1.', 1, ['Sau 6 là số nào?'], ['grade1', 'counting']),
  mc('g1-count-04', 'Số nào lớn hơn: 9 hay 6?', ['9', '6'], '9', '9 lớn hơn 6.', 1, ['Số lớn hơn ở bên phải trên tia số.'], ['grade1', 'compare']),
  ft('g1-count-05', 'Viết số liền trước của 10.', '9', 'Số liền trước 10 là 9.', 1, ['Đếm lùi 1 bước từ 10.'], ['grade1', 'before-after']),
  ft('g1-count-06', 'Viết số liền sau của 14.', '15', 'Số liền sau 14 là 15.', 1, ['Đếm thêm 1 bước.'], ['grade1', 'before-after']),
  mc('g1-count-07', 'Sắp xếp đúng từ bé đến lớn:', ['3, 5, 8', '8, 5, 3', '5, 3, 8', '8, 3, 5'], '3, 5, 8', '3 nhỏ nhất rồi đến 5 rồi đến 8.', 2, ['Tìm số nhỏ nhất trước.'], ['grade1', 'ordering']),
  mc('g1-count-08', 'Nhìn nhanh chấm tròn: ●●●●. Có mấy chấm?', ['3', '4', '5', '6'], '4', 'Có 4 chấm.', 1, ['Nhìn và nhận ra ngay nhóm 4.'], ['grade1', 'subitizing']),
];

export const numberBondExercises: Exercise[] = [
  mc('g1-bond-01', 'Số nào ghép với 3 để thành 5?', ['1', '2', '3', '4'], '2', '3 và 2 ghép thành 5.', 1, ['5 tách thành 3 và mấy?'], ['grade1', 'number-bonds']),
  mc('g1-bond-02', 'Số nào ghép với 6 để thành 10?', ['2', '3', '4', '5'], '4', '6 + 4 = 10.', 1, ['Hãy nghĩ đến “làm tròn 10”.'], ['grade1', 'make10']),
  ft('g1-bond-03', 'Điền số thiếu: 7 = 5 + __', '2', '7 tách thành 5 và 2.', 1, ['7 bớt 5 còn mấy?'], ['grade1', 'number-bonds']),
  ft('g1-bond-04', 'Điền số thiếu: 10 = 8 + __', '2', '8 cần thêm 2 để thành 10.', 1, ['Từ 8 đếm lên 10.'], ['grade1', 'make10']),
  ex('g1-bond-05', 'Giải thích cách con biết 9 = 4 + 5.', 'Bởi vì 4 và 5 ghép lại thành 9.', 'Bài này rèn khả năng tách-gộp số và diễn đạt bằng lời.', 2, ['Con có thể tưởng tượng 9 đồ vật tách thành 4 và 5.'], ['grade1', 'reasoning', 'number-bonds']),
  mc('g1-bond-06', 'Cặp số nào tạo thành 10?', ['6 và 4', '6 và 3', '7 và 2', '8 và 1'], '6 và 4', '6 + 4 = 10.', 1, ['Thử cộng từng cặp.'], ['grade1', 'make10']),
];

export const placeValueExercises: Exercise[] = [
  mc('g1-place-01', 'Số 14 có mấy chục?', ['0', '1', '2', '4'], '1', '14 có 1 chục và 4 đơn vị.', 2, ['14 = 10 + 4.'], ['grade1', 'place-value']),
  mc('g1-place-02', 'Số 18 có mấy đơn vị?', ['1', '8', '10', '18'], '8', '18 có 8 đơn vị.', 2, ['Nhìn chữ số hàng đơn vị.'], ['grade1', 'place-value']),
  ft('g2-place-01', 'Viết số có 3 chục và 4 đơn vị.', '34', '3 chục là 30, thêm 4 đơn vị là 34.', 2, ['30 + 4 = ?'], ['grade2', 'place-value']),
  ft('g2-place-02', 'Tách số 57 thành chục và đơn vị.', '50 và 7', '57 = 50 + 7.', 2, ['5 chục = 50.'], ['grade2', 'place-value']),
  mc('g2-place-03', 'Số nào lớn hơn?', ['42', '24'], '42', '42 có 4 chục, còn 24 có 2 chục.', 2, ['So sánh hàng chục trước.'], ['grade2', 'compare', 'place-value']),
  mc('g2-place-04', 'Số chẵn là:', ['31', '46', '53', '77'], '46', '46 là số chẵn vì tận cùng là 6.', 2, ['Số chẵn có tận cùng 0,2,4,6,8.'], ['grade2', 'even-odd']),
];

function addMc(id: string, a: number, b: number, options: string[], difficulty = 1, tags: string[] = []) {
  return mc(id, `${a} + ${b} = ?`, options, String(a + b), `${a} + ${b} = ${a + b}.`, difficulty, ['Đếm thêm từ số lớn hơn.', 'Có thể dùng tách số hoặc làm tròn 10.'], tags);
}

function subMc(id: string, a: number, b: number, options: string[], difficulty = 1, tags: string[] = []) {
  return mc(id, `${a} - ${b} = ?`, options, String(a - b), `${a} - ${b} = ${a - b}.`, difficulty, ['Đếm lùi hoặc tách số.', 'Kiểm tra lại bằng phép cộng ngược.'], tags);
}

export const additionWithin10: Exercise[] = [
  addMc('g1-add10-01', 2, 3, ['4', '5', '6', '3'], 1, ['grade1', 'addition']),
  addMc('g1-add10-02', 4, 1, ['3', '4', '5', '6'], 1, ['grade1', 'addition']),
  addMc('g1-add10-03', 5, 2, ['6', '7', '8', '5'], 1, ['grade1', 'addition']),
  addMc('g1-add10-04', 6, 3, ['7', '8', '9', '10'], 1, ['grade1', 'addition']),
  addMc('g1-add10-05', 4, 4, ['6', '7', '8', '9'], 1, ['grade1', 'addition', 'doubles']),
  addMc('g1-add10-06', 7, 2, ['8', '9', '10', '7'], 1, ['grade1', 'addition']),
  ft('g1-add10-07', 'Lan có 3 viên bi, mẹ cho thêm 4 viên. Lan có tất cả bao nhiêu viên bi?', '7', '3 + 4 = 7.', 2, ['Từ “thêm” thường là phép cộng.'], ['grade1', 'word-problem', 'addition']),
  ex('g1-add10-08', 'Con giải thích vì sao 5 + 3 = 8.', 'Vì bắt đầu từ 5 đếm thêm 3 bước được 8.', 'Có thể giải thích bằng đếm thêm hoặc bằng đồ vật.', 2, ['Bắt đầu từ 5: 6, 7, 8.'], ['grade1', 'reasoning', 'addition']),
];

export const subtractionWithin10: Exercise[] = [
  subMc('g1-sub10-01', 5, 2, ['2', '3', '4', '5'], 1, ['grade1', 'subtraction']),
  subMc('g1-sub10-02', 8, 3, ['4', '5', '6', '7'], 1, ['grade1', 'subtraction']),
  subMc('g1-sub10-03', 9, 4, ['4', '5', '6', '3'], 1, ['grade1', 'subtraction']),
  subMc('g1-sub10-04', 7, 1, ['5', '6', '7', '8'], 1, ['grade1', 'subtraction']),
  ft('g1-sub10-05', 'Mai có 10 cái kẹo, ăn 3 cái. Còn lại bao nhiêu cái?', '7', '10 - 3 = 7.', 2, ['Từ “còn lại” thường là phép trừ.'], ['grade1', 'word-problem', 'subtraction']),
  ft('g1-sub10-06', 'Điền số thiếu: 8 - __ = 5', '3', '8 bớt 3 còn 5.', 2, ['5 thêm mấy để thành 8?'], ['grade1', 'missing-number', 'subtraction']),
  ex('g1-sub10-07', 'Giải thích vì sao 6 - 2 = 4.', 'Vì lấy bớt 2 khỏi 6 thì còn 4.', 'Có thể minh họa bằng 6 đồ vật rồi cất đi 2.', 2, ['Tưởng tượng 6 quả bóng, bỏ đi 2 quả.'], ['grade1', 'reasoning', 'subtraction']),
];

export const additionWithin20: Exercise[] = [
  addMc('g1-add20-01', 8, 5, ['12', '13', '14', '15'], 2, ['grade1', 'addition', 'make10']),
  addMc('g1-add20-02', 9, 6, ['14', '15', '16', '13'], 2, ['grade1', 'addition', 'make10']),
  addMc('g1-add20-03', 10, 7, ['16', '17', '18', '15'], 2, ['grade1', 'addition']),
  addMc('g1-add20-04', 12, 4, ['14', '15', '16', '17'], 2, ['grade1', 'addition']),
  ft('g1-add20-05', 'Có 7 con chim trên cành, thêm 6 con bay tới. Có tất cả bao nhiêu con?', '13', '7 + 6 = 13.', 2, ['7 cần 3 để thành 10, còn 3 nữa.'], ['grade1', 'word-problem', 'addition']),
  ex('g1-add20-06', 'Giải thích cách tính 8 + 5.', '8 cộng 2 thành 10, còn 3 nên bằng 13.', 'Đây là chiến lược “làm tròn 10”.', 3, ['Tách 5 thành 2 và 3.'], ['grade1', 'reasoning', 'make10']),
];

export const subtractionWithin20: Exercise[] = [
  subMc('g1-sub20-01', 13, 5, ['7', '8', '9', '6'], 2, ['grade1', 'subtraction']),
  subMc('g1-sub20-02', 15, 7, ['7', '8', '9', '6'], 2, ['grade1', 'subtraction']),
  subMc('g1-sub20-03', 18, 9, ['8', '9', '10', '7'], 2, ['grade1', 'subtraction']),
  ft('g1-sub20-04', 'Bé có 14 nhãn dán, cho bạn 6 cái. Bé còn bao nhiêu cái?', '8', '14 - 6 = 8.', 2, ['Có thể tách 6 thành 4 và 2.'], ['grade1', 'word-problem', 'subtraction']),
  ft('g1-sub20-05', 'Điền số còn thiếu: __ - 4 = 11', '15', '15 - 4 = 11.', 2, ['11 thêm 4 bằng bao nhiêu?'], ['grade1', 'missing-number', 'subtraction']),
  ex('g1-sub20-06', 'Giải thích cách tính 15 - 7.', '15 bớt 5 còn 10, bớt tiếp 2 còn 8.', 'Đây là chiến lược tách số khi trừ qua 10.', 3, ['Tách 7 thành 5 và 2.'], ['grade1', 'reasoning', 'subtraction']),
];

export const geometryExercises: Exercise[] = [
  mc('g1-geo-01', 'Hình nào có 3 cạnh?', ['Hình tròn', 'Hình tam giác', 'Hình vuông', 'Hình chữ nhật'], 'Hình tam giác', 'Hình tam giác có 3 cạnh.', 1, ['Đếm số cạnh.'], ['grade1', 'geometry']),
  mc('g1-geo-02', 'Đồ vật nào thường có dạng hình tròn?', ['Quyển sách', 'Đồng hồ', 'Cánh cửa', 'Cái bàn'], 'Đồng hồ', 'Mặt đồng hồ thường là hình tròn.', 1, ['Nghĩ đến hình dạng thật ngoài đời.'], ['grade1', 'geometry', 'real-life']),
  mc('g1-geo-03', 'Bạn gấu đứng ở đâu so với cái hộp? 🧸⬜', ['Bên trái', 'Bên phải', 'Ở trong', 'Ở dưới'], 'Bên trái', 'Bạn gấu đứng bên trái cái hộp.', 1, ['Quan sát vị trí.'], ['grade1', 'spatial']),
  ft('g1-geo-04', 'Hình vuông có mấy cạnh?', '4', 'Hình vuông có 4 cạnh.', 1, ['Đếm các cạnh.'], ['grade1', 'geometry']),
  mc('g2-geo-01', 'Vật nào giống khối hộp chữ nhật?', ['Quả bóng', 'Hộp sữa', 'Đĩa tròn', 'Đồng xu'], 'Hộp sữa', 'Hộp sữa giống khối hộp chữ nhật.', 2, ['Phân biệt hình phẳng và khối.'], ['grade2', 'geometry', '3d-shape']),
  mc('g2-geo-02', 'Chu vi là gì?', ['Số góc của hình', 'Độ dài đường bao quanh hình', 'Màu của hình', 'Diện tích phần ở trong'], 'Độ dài đường bao quanh hình', 'Chu vi là độ dài đường bao quanh hình.', 2, ['Nghĩ đến sợi dây đi quanh mép hình.'], ['grade2', 'perimeter']),
];

export const patternExercises: Exercise[] = [
  mc('g1-pattern-01', 'Tìm quy luật: 🔴🔵🔴🔵🔴 __', ['🔴', '🔵', '🟢', '🟡'], '🔵', 'Màu đỏ và xanh lặp lại.', 1, ['Nhìn xem màu nào xuất hiện luân phiên.'], ['grade1', 'pattern']),
  ft('g1-pattern-02', 'Điền số: 2, 4, 6, __', '8', 'Dãy tăng thêm 2.', 1, ['Mỗi lần cộng thêm 2.'], ['grade1', 'pattern']),
  ft('g2-pattern-01', 'Điền số: 5, 10, 15, __', '20', 'Đây là đếm nhảy 5.', 2, ['Mỗi lần thêm 5.'], ['grade2', 'skip-counting']),
  ft('g2-pattern-02', 'Điền số: 20, 30, 40, __', '50', 'Đây là đếm nhảy 10.', 2, ['Mỗi lần thêm 10.'], ['grade2', 'skip-counting']),
];

export const measurementExercises: Exercise[] = [
  mc('g1-measure-01', 'Vật nào dài hơn?', ['Bút chì 15cm', 'Cục tẩy 4cm'], 'Bút chì 15cm', '15cm dài hơn 4cm.', 1, ['So sánh số đo.'], ['grade1', 'measurement']),
  mc('g1-measure-02', 'Vật nào nặng hơn?', ['Quả dưa hấu', 'Chiếc lá'], 'Quả dưa hấu', 'Quả dưa hấu nặng hơn.', 1, ['Dùng kinh nghiệm đời sống.'], ['grade1', 'measurement']),
  mc('g1-measure-03', 'Đồng hồ chỉ đúng 3 giờ khi nào?', ['Kim ngắn ở 3, kim dài ở 12', 'Kim ngắn ở 12, kim dài ở 3', 'Kim ngắn ở 6, kim dài ở 12', 'Kim ngắn ở 3, kim dài ở 6'], 'Kim ngắn ở 3, kim dài ở 12', 'Giờ đúng thì kim dài chỉ 12.', 2, ['Nhớ quy tắc giờ đúng.'], ['grade1', 'time']),
  mc('g2-measure-01', 'Đơn vị nào thích hợp để đo chiều dài bàn học?', ['cm', 'kg', 'lít', 'giờ'], 'cm', 'Chiều dài thường đo bằng cm hoặc m.', 2, ['Chọn đơn vị đo độ dài.'], ['grade2', 'measurement']),
  mc('g2-measure-02', 'Đơn vị nào dùng để đo cân nặng của bé?', ['lít', 'kg', 'cm', 'm'], 'kg', 'Cân nặng thường đo bằng kg.', 2, ['Kg dùng cho nặng nhẹ.'], ['grade2', 'measurement']),
  mc('g2-measure-03', 'Đơn vị nào dùng để đo nước trong chai?', ['kg', 'cm', 'lít', 'm'], 'lít', 'Dung tích chất lỏng thường đo bằng lít.', 2, ['Lít dùng cho nước, sữa, nước trái cây.'], ['grade2', 'measurement']),
  ft('g2-measure-04', '30cm + 20cm = __ cm', '50', '30cm + 20cm = 50cm.', 2, ['Cộng các số đo cùng đơn vị.'], ['grade2', 'measurement']),
  mc('g2-measure-05', '7 giờ 30 phút còn gọi là:', ['7 giờ rưỡi', '7 giờ kém 30', '8 giờ rưỡi', '6 giờ rưỡi'], '7 giờ rưỡi', '30 phút sau 7 giờ là 7 giờ rưỡi.', 2, ['Nửa giờ là 30 phút.'], ['grade2', 'time']),
];

export const moneyAndDataExercises: Exercise[] = [
  mc('g2-money-01', 'Tờ tiền nào lớn hơn?', ['2.000đ', '5.000đ'], '5.000đ', '5.000đ lớn hơn 2.000đ.', 2, ['So sánh giá trị số.'], ['grade2', 'money']),
  ft('g2-money-02', '3.000đ + 2.000đ = __ đ', '5000', '3.000đ cộng 2.000đ bằng 5.000đ.', 2, ['Cộng 3 nghìn và 2 nghìn.'], ['grade2', 'money']),
  mc('g2-fraction-01', 'Hình nào tô màu 1/2?', ['1 trong 2 phần bằng nhau', '1 trong 3 phần bằng nhau', '2 trong 3 phần', '1 trong 4 phần'], '1 trong 2 phần bằng nhau', 'Một nửa là 1 trong 2 phần bằng nhau.', 2, ['Nửa nghĩa là chia làm 2 phần bằng nhau.'], ['grade2', 'fraction']),
  mc('g2-data-01', 'Biểu đồ tranh cho biết: Táo 🍎🍎🍎, Cam 🍊🍊. Loại quả nào nhiều hơn?', ['Cam', 'Táo', 'Bằng nhau', 'Không biết'], 'Táo', 'Có 3 quả táo và 2 quả cam nên táo nhiều hơn.', 2, ['Đếm số biểu tượng.'], ['grade2', 'data']),
  ft('g2-data-02', 'Lớp có 4 bạn thích mèo và 6 bạn thích chó. Có tất cả bao nhiêu bạn?', '10', '4 + 6 = 10.', 2, ['Gộp hai nhóm lại.'], ['grade2', 'data', 'word-problem']),
];

export const multiplicationDivisionExercises: Exercise[] = [
  mc('g2-mul-01', 'Có 3 nhóm, mỗi nhóm 2 cái bánh. Có tất cả bao nhiêu cái bánh?', ['5', '6', '7', '8'], '6', '2 + 2 + 2 = 6.', 2, ['Cộng lặp 3 lần số 2.'], ['grade2', 'multiplication']),
  ft('g2-mul-02', '2 + 2 + 2 + 2 = __', '8', 'Đây là 4 nhóm 2, tổng là 8.', 2, ['Cộng lặp lại.'], ['grade2', 'multiplication']),
  mc('g2-div-01', 'Có 8 cái kẹo chia đều cho 2 bạn. Mỗi bạn được mấy cái?', ['2', '3', '4', '5'], '4', '8 chia đều cho 2 được 4.', 2, ['Chia thành 2 phần bằng nhau.'], ['grade2', 'division']),
  mc('g2-div-02', 'Có 12 quả bóng, xếp mỗi nhóm 3 quả. Có mấy nhóm?', ['3', '4', '5', '6'], '4', '12 chia thành các nhóm 3 được 4 nhóm.', 2, ['12 = 3 + 3 + 3 + 3.'], ['grade2', 'division']),
  ex('g2-muldiv-03', 'Giải thích vì sao 3 nhóm 4 đồ vật thì có 12 đồ vật.', 'Vì 4 + 4 + 4 = 12 nên 3 nhóm 4 là 12.', 'Liên hệ giữa cộng lặp và phép nhân.', 3, ['Viết phép cộng lặp trước.'], ['grade2', 'reasoning', 'multiplication']),
];

export const problemSolvingExercises: Exercise[] = [
  ft('g2-problem-01', 'Một giỏ có 24 quả cam, bán 6 quả rồi nhập thêm 10 quả. Giỏ có bao nhiêu quả?', '28', '24 - 6 + 10 = 28.', 3, ['Làm từng bước một.', 'Bước 1: 24 - 6.', 'Bước 2: kết quả + 10.'], ['grade2', 'two-step', 'problem-solving']),
  ft('g2-problem-02', 'Trên xe có 35 hành khách. 12 người xuống, 8 người lên. Trên xe còn bao nhiêu người?', '31', '35 - 12 + 8 = 31.', 3, ['Xuống là trừ, lên là cộng.'], ['grade2', 'two-step', 'problem-solving']),
  ex('g2-problem-03', 'Con có thể kiểm tra lại kết quả 46 - 18 = 28 bằng cách nào?', 'Lấy 28 cộng 18, nếu được 46 thì đúng.', 'Dùng phép ngược để kiểm tra.', 3, ['Phép cộng kiểm tra phép trừ.'], ['grade2', 'reasoning', 'inverse-operation']),
];

export const reasoningExercises: Exercise[] = [
  ex('g1-reason-01', 'Vì sao 10 là một số quan trọng khi học cộng trừ?', 'Vì có thể ghép số để làm tròn 10 rồi tính dễ hơn.', 'Chiến lược make-10 giúp tính nhẩm nhanh và hiểu cấu tạo số.', 2, ['Ví dụ 8 + 5 có thể làm thành 10 + 3.'], ['reasoning', 'make10']),
  ex('g2-reason-02', 'So sánh 36 + 9 và 39 + 6. Hai phép tính có bằng nhau không?', 'Có, vì đều bằng 45.', 'Cả hai phép tính đều cho kết quả 45.', 3, ['Tính từng phép hoặc đổi bù.'], ['reasoning', 'compare-methods']),
];

export const allMathExercises: Exercise[] = [
  ...countingExercises,
  ...numberBondExercises,
  ...placeValueExercises,
  ...additionWithin10,
  ...subtractionWithin10,
  ...additionWithin20,
  ...subtractionWithin20,
  ...geometryExercises,
  ...patternExercises,
  ...measurementExercises,
  ...moneyAndDataExercises,
  ...multiplicationDivisionExercises,
  ...problemSolvingExercises,
  ...reasoningExercises,
];

export const mathLessons: Lesson[] = [
  {
    id: 'lesson-math-g1-01',
    subject: 'Toán',
    ageBand: '6-8',
    competencyIds: ['comp-math-001'],
    title: 'Lớp 1 — Số đến 20, đếm, so sánh, thứ tự',
    objective: 'Nhận biết, đếm, so sánh và sắp xếp các số trong phạm vi 20.',
    contentBlocks: [
      { id: 'cb-g1-01-1', type: 'text', content: 'Con học đếm, đọc số, viết số và nhận ra số nào lớn hơn hay bé hơn.' },
      { id: 'cb-g1-01-2', type: 'visual', content: '1, 2, 3, ... 20 — các số đứng theo thứ tự trên tia số.' },
      { id: 'cb-g1-01-3', type: 'example', content: '9 lớn hơn 6 vì 9 đứng bên phải 6 trên tia số.' },
    ],
    exercises: countingExercises,
    rubric: ['Đếm đúng', 'So sánh đúng', 'Biết số liền trước/liền sau'],
  },
  {
    id: 'lesson-math-g1-02',
    subject: 'Toán',
    ageBand: '6-8',
    competencyIds: ['comp-math-001'],
    title: 'Lớp 1 — Tách gộp số và number bonds',
    objective: 'Tách và gộp số trong phạm vi 10, dùng chiến lược làm tròn 10.',
    contentBlocks: [
      { id: 'cb-g1-02-1', type: 'text', content: 'Một số có thể tách thành nhiều cặp số khác nhau. Đây là nền tảng của cộng trừ.' },
      { id: 'cb-g1-02-2', type: 'example', content: '10 = 6 + 4 = 7 + 3 = 8 + 2.' },
      { id: 'cb-g1-02-3', type: 'visual', content: '🔵🔵🔵🔵🔵🔵 + 🔴🔴🔴🔴 = 10' },
    ],
    exercises: numberBondExercises,
    rubric: ['Biết tách số', 'Biết ghép số', 'Dùng được make-10'],
  },
  {
    id: 'lesson-math-g1-03',
    subject: 'Toán',
    ageBand: '6-8',
    competencyIds: ['comp-math-002'],
    title: 'Lớp 1 — Phép cộng trong phạm vi 10',
    objective: 'Cộng thành thạo trong phạm vi 10 và giải bài toán đơn giản.',
    contentBlocks: [
      { id: 'cb-g1-03-1', type: 'text', content: 'Phép cộng là gộp hai nhóm lại với nhau.' },
      { id: 'cb-g1-03-2', type: 'example', content: '4 + 3 = 7. Bắt đầu từ 4 rồi đếm thêm 3 bước.' },
      { id: 'cb-g1-03-3', type: 'visual', content: '🔵🔵🔵🔵 + 🔴🔴🔴 = 7' },
    ],
    exercises: additionWithin10,
    rubric: ['Tính đúng', 'Biết đếm thêm', 'Giải được lời văn'],
  },
  {
    id: 'lesson-math-g1-04',
    subject: 'Toán',
    ageBand: '6-8',
    competencyIds: ['comp-math-003'],
    title: 'Lớp 1 — Phép trừ trong phạm vi 10',
    objective: 'Hiểu phép trừ là bớt đi và tính đúng trong phạm vi 10.',
    contentBlocks: [
      { id: 'cb-g1-04-1', type: 'text', content: 'Phép trừ là lấy bớt đi từ một nhóm ban đầu.' },
      { id: 'cb-g1-04-2', type: 'visual', content: '🍬🍬🍬🍬🍬🍬 - 🍬🍬 = 4' },
      { id: 'cb-g1-04-3', type: 'example', content: '8 - 3 = 5 vì từ 8 bớt 3 còn 5.' },
    ],
    exercises: subtractionWithin10,
    rubric: ['Tính đúng', 'Hiểu ý nghĩa bớt đi', 'Giải được lời văn'],
  },
  {
    id: 'lesson-math-g1-05',
    subject: 'Toán',
    ageBand: '6-8',
    competencyIds: ['comp-math-002', 'comp-math-003'],
    title: 'Lớp 1 — Cộng trừ trong phạm vi 20',
    objective: 'Biết dùng chiến lược tách số để cộng trừ qua 10.',
    contentBlocks: [
      { id: 'cb-g1-05-1', type: 'text', content: 'Khi tính qua 10, con có thể tách số để được 10 trước.' },
      { id: 'cb-g1-05-2', type: 'example', content: '8 + 5 = 8 + 2 + 3 = 13.' },
      { id: 'cb-g1-05-3', type: 'example', content: '15 - 7 = 15 - 5 - 2 = 8.' },
    ],
    exercises: [...additionWithin20, ...subtractionWithin20],
    rubric: ['Biết tách số', 'Tính đúng', 'Giải thích được cách làm'],
  },
  {
    id: 'lesson-math-g1-06',
    subject: 'Toán',
    ageBand: '6-8',
    competencyIds: ['comp-math-004'],
    title: 'Lớp 1 — Hình học và định hướng không gian',
    objective: 'Nhận biết hình cơ bản và mô tả vị trí trong không gian.',
    contentBlocks: [
      { id: 'cb-g1-06-1', type: 'text', content: 'Con học hình tròn, vuông, tam giác, chữ nhật và các vị trí trái/phải/trên/dưới.' },
      { id: 'cb-g1-06-2', type: 'visual', content: '🔵 hình tròn • 🟦 hình vuông • 🔺 hình tam giác • ▭ hình chữ nhật' },
    ],
    exercises: geometryExercises.slice(0, 4),
    rubric: ['Nhận biết hình', 'Đếm cạnh', 'Mô tả đúng vị trí'],
  },
  {
    id: 'lesson-math-g1-07',
    subject: 'Toán',
    ageBand: '6-8',
    competencyIds: ['comp-math-001', 'comp-math-004'],
    title: 'Lớp 1 — Quy luật, đo lường, thời gian cơ bản',
    objective: 'Nhận ra quy luật đơn giản, so sánh độ dài/nặng nhẹ và đọc giờ đúng.',
    contentBlocks: [
      { id: 'cb-g1-07-1', type: 'text', content: 'Toán không chỉ là tính. Con còn học quy luật, so sánh và xem giờ.' },
      { id: 'cb-g1-07-2', type: 'example', content: '🔴🔵🔴🔵 là quy luật lặp; 15cm dài hơn 4cm.' },
    ],
    exercises: [...patternExercises.slice(0, 2), ...measurementExercises.slice(0, 3)],
    rubric: ['Nhận ra quy luật', 'So sánh đúng', 'Đọc được giờ đúng'],
  },
  {
    id: 'lesson-math-g2-01',
    subject: 'Toán',
    ageBand: '6-8',
    competencyIds: ['comp-math-001'],
    title: 'Lớp 2 — Số đến 100, chục và đơn vị',
    objective: 'Đọc viết số đến 100, hiểu cấu tạo chục/đơn vị, phân biệt chẵn/lẻ.',
    contentBlocks: [
      { id: 'cb-g2-01-1', type: 'text', content: 'Ở lớp 2, con học số đến 100 và hiểu rõ hàng chục, hàng đơn vị.' },
      { id: 'cb-g2-01-2', type: 'example', content: '57 = 5 chục và 7 đơn vị.' },
      { id: 'cb-g2-01-3', type: 'visual', content: '34 = 30 + 4' },
    ],
    exercises: placeValueExercises,
    rubric: ['Hiểu chục/đơn vị', 'So sánh số 2 chữ số', 'Nhận biết chẵn/lẻ'],
  },
  {
    id: 'lesson-math-g2-02',
    subject: 'Toán',
    ageBand: '6-8',
    competencyIds: ['comp-math-002', 'comp-math-003'],
    title: 'Lớp 2 — Cộng trừ trong phạm vi 100',
    objective: 'Tính nhẩm và tính viết cộng trừ trong phạm vi 100, kiểm tra bằng phép ngược.',
    contentBlocks: [
      { id: 'cb-g2-02-1', type: 'text', content: 'Con dùng hàng chục và hàng đơn vị để cộng trừ chính xác hơn.' },
      { id: 'cb-g2-02-2', type: 'example', content: '46 - 18 = 28. Kiểm tra lại: 28 + 18 = 46.' },
    ],
    exercises: [...problemSolvingExercises, ...reasoningExercises.slice(1)],
    rubric: ['Tính đúng', 'Biết làm từng bước', 'Biết tự kiểm tra'],
  },
  {
    id: 'lesson-math-g2-03',
    subject: 'Toán',
    ageBand: '6-8',
    competencyIds: ['comp-math-002'],
    title: 'Lớp 2 — Đếm nhảy, quy luật, nhóm bằng nhau',
    objective: 'Đếm nhảy 2, 5, 10 và hiểu nền tảng của phép nhân.',
    contentBlocks: [
      { id: 'cb-g2-03-1', type: 'text', content: 'Đếm nhảy giúp con chuẩn bị cho phép nhân và nhìn thấy cấu trúc của số.' },
      { id: 'cb-g2-03-2', type: 'example', content: '5, 10, 15, 20 là đếm nhảy 5.' },
    ],
    exercises: [...patternExercises.slice(2), ...multiplicationDivisionExercises.slice(0, 2)],
    rubric: ['Đếm nhảy đúng', 'Nhận ra quy luật', 'Hiểu cộng lặp'],
  },
  {
    id: 'lesson-math-g2-04',
    subject: 'Toán',
    ageBand: '6-8',
    competencyIds: ['comp-math-003'],
    title: 'Lớp 2 — Phép chia đơn giản và chia đều',
    objective: 'Hiểu chia đều, chia theo nhóm và liên hệ với phép trừ/cộng lặp.',
    contentBlocks: [
      { id: 'cb-g2-04-1', type: 'text', content: 'Chia là tách một nhóm lớn thành các phần bằng nhau hoặc thành các nhóm nhỏ.' },
      { id: 'cb-g2-04-2', type: 'example', content: '8 cái kẹo chia đều cho 2 bạn thì mỗi bạn được 4 cái.' },
    ],
    exercises: multiplicationDivisionExercises.slice(2),
    rubric: ['Chia đều đúng', 'Hiểu chia theo nhóm', 'Giải thích được bằng lời'],
  },
  {
    id: 'lesson-math-g2-05',
    subject: 'Toán',
    ageBand: '6-8',
    competencyIds: ['comp-math-004'],
    title: 'Lớp 2 — Đo lường, tiền, thời gian',
    objective: 'Dùng cm, kg, lít, đọc giờ rưỡi và giải bài toán tiền Việt Nam đơn giản.',
    contentBlocks: [
      { id: 'cb-g2-05-1', type: 'text', content: 'Con chọn đúng đơn vị đo và biết áp dụng vào tình huống đời thật.' },
      { id: 'cb-g2-05-2', type: 'example', content: 'Chiều dài dùng cm/m, cân nặng dùng kg, chất lỏng dùng lít.' },
    ],
    exercises: [...measurementExercises.slice(3), ...moneyAndDataExercises.slice(0, 2)],
    rubric: ['Chọn đúng đơn vị', 'Đọc giờ đúng', 'Tính tiền đơn giản'],
  },
  {
    id: 'lesson-math-g2-06',
    subject: 'Toán',
    ageBand: '6-8',
    competencyIds: ['comp-math-004'],
    title: 'Lớp 2 — Hình học, phân số trực quan, dữ liệu',
    objective: 'Nhận biết khối, hiểu một nửa và đọc dữ liệu đơn giản từ biểu đồ.',
    contentBlocks: [
      { id: 'cb-g2-06-1', type: 'text', content: 'Con học nhìn hình, chia đều thành các phần bằng nhau và đọc thông tin từ biểu đồ.' },
      { id: 'cb-g2-06-2', type: 'example', content: '1/2 nghĩa là một trong hai phần bằng nhau.' },
    ],
    exercises: [...geometryExercises.slice(4), ...moneyAndDataExercises.slice(2)],
    rubric: ['Nhận biết khối', 'Hiểu 1/2', 'Đọc dữ liệu đúng'],
  },
];
