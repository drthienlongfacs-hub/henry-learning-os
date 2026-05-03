export type PrimaryCurriculumSubjectKey =
    | 'math'
    | 'vietnamese'
    | 'english'
    | 'science'
    | 'hisgeo'
    | 'computing'
    | 'ethics'
    | 'art';

export type PrimaryCurriculumMapStatus = 'item_traceable_needs_human_review';

export interface PrimaryCurriculumTopicMap {
    subject: PrimaryCurriculumSubjectKey;
    subjectLabel: string;
    grade: 1 | 2 | 3 | 4 | 5;
    topicKey: string;
    topicName: string;
    officialStrand: string;
    expectedOutcome: string;
    parentExplanation: string;
    exampleTask: string;
    evidenceToStore: string[];
    misconceptionWatch: string[];
    releaseGate: string;
    sourceIds: string[];
    status: PrimaryCurriculumMapStatus;
}

const MOET_SOURCE_IDS = ['moet-ctgdpt-2018', 'moet-primary-scope-2018'];
const CT_VERSION = 'CTGDPT 2018 + cập nhật 2025, dùng cho benchmark năm học 2026-2027';

function mapTopic(
    subject: PrimaryCurriculumSubjectKey,
    subjectLabel: string,
    grade: 1 | 2 | 3 | 4 | 5,
    topicKey: string,
    topicName: string,
    officialStrand: string,
    expectedOutcome: string,
    parentExplanation: string,
    exampleTask: string,
    evidenceToStore: string[],
    misconceptionWatch: string[],
    releaseGate: string,
    extraSourceIds: string[] = [],
): PrimaryCurriculumTopicMap {
    return {
        subject,
        subjectLabel,
        grade,
        topicKey,
        topicName,
        officialStrand,
        expectedOutcome,
        parentExplanation,
        exampleTask,
        evidenceToStore,
        misconceptionWatch,
        releaseGate,
        sourceIds: [...MOET_SOURCE_IDS, ...extraSourceIds],
        status: 'item_traceable_needs_human_review',
    };
}

const math = (grade: 1 | 2 | 3 | 4 | 5, topicKey: string, topicName: string, strand: string, expectedOutcome: string, exampleTask: string, misconceptionWatch: string[]) =>
    mapTopic(
        'math',
        'Toán',
        grade,
        topicKey,
        topicName,
        strand,
        expectedOutcome,
        `Ở lớp ${grade}, chủ đề này phải kiểm tra con có hiểu cách làm và giải thích được bằng lời, không chỉ chọn đúng đáp án.`,
        exampleTask,
        ['topicKey', 'gradeLevel', 'attempt result', 'mức gợi ý đã dùng', 'câu giải thích hoặc bước làm của trẻ'],
        misconceptionWatch,
        'Trước khi claim phủ chuẩn, mỗi item Toán phải có mạch nội dung, yêu cầu cần đạt, lỗi sai dự kiến và rubric lời giải.',
    );

const vietnamese = (grade: 1 | 2 | 3 | 4 | 5, topicKey: string, topicName: string, strand: string, expectedOutcome: string, exampleTask: string, misconceptionWatch: string[]) =>
    mapTopic(
        'vietnamese',
        'Tiếng Việt',
        grade,
        topicKey,
        topicName,
        strand,
        expectedOutcome,
        `Ở lớp ${grade}, Tiếng Việt phải đo năng lực đọc, viết, nói và nghe theo nhiệm vụ thật; không đủ nếu chỉ nhớ một mẹo trắc nghiệm.`,
        exampleTask,
        ['topicKey', 'gradeLevel', 'lỗi âm/vần/dấu hoặc diễn đạt', 'câu trả lời của trẻ', 'số lần tự sửa'],
        misconceptionWatch,
        'Trước khi claim phủ chuẩn, mỗi item Tiếng Việt phải có kỹ năng ngôn ngữ, văn bản/ngữ liệu, lỗi thường gặp và tiêu chí tự sửa.',
    );

const english = (grade: 1 | 2 | 3 | 4 | 5, topicKey: string, topicName: string, strand: string, expectedOutcome: string, exampleTask: string, misconceptionWatch: string[]) =>
    mapTopic(
        'english',
        'Ngoại ngữ 1',
        grade,
        topicKey,
        topicName,
        strand,
        expectedOutcome,
        `Ở lớp ${grade}, tiếng Anh cần gắn với tình huống giao tiếp nhỏ, có hỗ trợ tiếng Việt vừa đủ và không tạo áp lực như bài thi nặng.`,
        exampleTask,
        ['topicKey', 'gradeLevel', 'kỹ năng nghe/nói/đọc/viết', 'từ hoặc mẫu câu mục tiêu', 'mức hỗ trợ tiếng Việt'],
        misconceptionWatch,
        'Trước khi claim phủ chuẩn, mỗi item Ngoại ngữ 1 phải có kỹ năng đo, tình huống giao tiếp, từ/mẫu câu và mức hỗ trợ.',
    );

const science = (grade: 1 | 2 | 3 | 4 | 5, topicKey: string, topicName: string, strand: string, expectedOutcome: string, exampleTask: string, misconceptionWatch: string[]) =>
    mapTopic(
        'science',
        grade <= 3 ? 'Tự nhiên và Xã hội' : 'Khoa học',
        grade,
        topicKey,
        topicName,
        strand,
        expectedOutcome,
        `Ở lớp ${grade}, nhiệm vụ phải xuất phát từ quan sát đời sống, yêu cầu con nói được bằng chứng và biết vận dụng an toàn.`,
        exampleTask,
        ['topicKey', 'gradeLevel', 'quan sát/dự đoán', 'câu giải thích', 'liên hệ an toàn hoặc đời sống'],
        misconceptionWatch,
        'Trước khi claim phủ chuẩn, mỗi item khoa học phải có hiện tượng, bằng chứng quan sát, câu hỏi vì sao và bước vận dụng an toàn.',
    );

const hisgeo = (grade: 4 | 5, topicKey: string, topicName: string, strand: string, expectedOutcome: string, exampleTask: string, misconceptionWatch: string[]) =>
    mapTopic(
        'hisgeo',
        'Lịch sử và Địa lý',
        grade,
        topicKey,
        topicName,
        strand,
        expectedOutcome,
        `Ở lớp ${grade}, con cần gắn địa danh, bản đồ, mốc thời gian và ý nghĩa; nhớ tên riêng đơn lẻ chưa đủ.`,
        exampleTask,
        ['topicKey', 'gradeLevel', 'địa danh hoặc mốc thời gian', 'câu giải thích ý nghĩa', 'source version đã re-audit'],
        misconceptionWatch,
        'Trước khi claim phủ chuẩn, mọi item địa danh/bản đồ phải được re-audit theo Thông tư 17/2025 khi liên quan đơn vị hành chính.',
        ['moet-tt17-2025'],
    );

const computing = (grade: 3 | 4 | 5, topicKey: string, topicName: string, strand: string, expectedOutcome: string, exampleTask: string, misconceptionWatch: string[]) =>
    mapTopic(
        'computing',
        'Tin học và Công nghệ',
        grade,
        topicKey,
        topicName,
        strand,
        expectedOutcome,
        `Ở lớp ${grade}, Tin học và Công nghệ phải đo thao tác, an toàn số và tư duy từng bước; không chỉ hỏi tên thiết bị.`,
        exampleTask,
        ['topicKey', 'gradeLevel', 'chuỗi thao tác', 'quyết định an toàn số', 'số lần thử và tự sửa'],
        misconceptionWatch,
        'Trước khi claim phủ chuẩn, mỗi item phải có thiết bị/dữ liệu/thuật toán/an toàn, kèm thao tác kiểm chứng không cần chat tự do.',
    );

const ethics = (grade: 1 | 2 | 3 | 4 | 5, topicKey: string, topicName: string, strand: string, expectedOutcome: string, exampleTask: string, misconceptionWatch: string[]) =>
    mapTopic(
        'ethics',
        'Đạo đức',
        grade,
        topicKey,
        topicName,
        strand,
        expectedOutcome,
        `Ở lớp ${grade}, Đạo đức phải hướng tới hành vi, cảm xúc và thái độ chuẩn mực, không chỉ là kiến thức thuộc lòng.`,
        exampleTask,
        ['topicKey', 'gradeLevel', 'nhận diện hành vi', 'lý do chọn', 'cảm xúc liên quan'],
        misconceptionWatch,
        'Trước khi claim phủ chuẩn, mỗi item phải có tình huống thực tế, hành vi đúng sai và giải thích.',
    );

const art = (grade: 1 | 2 | 3 | 4 | 5, topicKey: string, topicName: string, strand: string, expectedOutcome: string, exampleTask: string, misconceptionWatch: string[]) =>
    mapTopic(
        'art',
        'Nghệ thuật',
        grade,
        topicKey,
        topicName,
        strand,
        expectedOutcome,
        `Ở lớp ${grade}, Nghệ thuật (Âm nhạc, Mĩ thuật) tập trung vào nhận biết, thể hiện và cảm thụ cái đẹp cơ bản.`,
        exampleTask,
        ['topicKey', 'gradeLevel', 'nhận diện yếu tố nghệ thuật', 'sự sáng tạo', 'biểu đạt'],
        misconceptionWatch,
        'Trước khi claim phủ chuẩn, mỗi item phải có sự tương tác với màu sắc, âm thanh hoặc hình khối.',
    );

export const PRIMARY_CURRICULUM_TOPIC_MAP: PrimaryCurriculumTopicMap[] = [
    math(1, 'add_sub_10', 'Cộng trừ trong 10', 'Số và phép tính', 'Cộng, trừ trong phạm vi 10 và nói được cách đếm thêm hoặc đếm lùi.', 'Con dùng que tính hoặc chấm tròn để giải 6 + 3, sau đó nói vì sao kết quả là 9.', ['Đếm vẹt nhưng không hiểu thêm/bớt', 'Nhầm dấu cộng và dấu trừ']),
    math(1, 'add_sub_20', 'Cộng trừ trong 20', 'Số và phép tính', 'Cộng, trừ trong phạm vi 20, bước đầu biết tách số qua 10.', 'Con giải 8 + 5 bằng cách tách 5 thành 2 và 3 để làm tròn 10.', ['Qua 10 nhưng không biết tách số', 'Đếm lại từ 1 quá lâu']),
    math(1, 'number_bonds', 'Tách-ghép số', 'Số và phép tính', 'Nhìn một số như tổng của hai phần và dùng được để cộng/trừ.', 'Con tách số 9 thành 4 và 5, rồi nói 9 bớt 4 còn 5.', ['Chỉ thuộc phép tính đơn lẻ', 'Không thấy quan hệ cộng-trừ']),
    math(1, 'count_20', 'Số đến 20', 'Số và phép tính', 'Đếm, đọc, viết, so sánh và phân tích số đến 20.', 'Con xếp 14 khối thành 1 chục và 4 đơn vị, rồi đọc số 14.', ['Đọc số đúng nhưng không hiểu chục-đơn vị', 'Bỏ sót khi đếm']),
    math(1, 'shapes_g1', 'Hình phẳng 2D', 'Hình học và đo lường', 'Nhận biết hình vuông, hình tròn, hình tam giác, hình chữ nhật qua đặc điểm.', 'Con chọn hình có 3 cạnh, gọi tên hình tam giác và chỉ từng cạnh.', ['Nhận hình theo hướng xoay quen thuộc', 'Nhầm hình vuông và hình chữ nhật']),
    math(1, 'shapes_3d', 'Khối hình 3D', 'Hình học và đo lường', 'Nhận biết khối hộp, khối lập phương, khối trụ, khối cầu qua vật thật.', 'Con nhìn hộp sữa, quả bóng, lon nước và nói vật nào lăn được, vì sao.', ['Gọi mọi hình là hình tròn/vuông', 'Không phân biệt mặt phẳng và mặt cong']),
    math(1, 'compare_g1', 'So sánh số', 'Số và phép tính', 'So sánh hai số trong phạm vi 20 và dùng đúng dấu lớn hơn, bé hơn, bằng.', 'Con đặt 12 và 17 trên trục số rồi điền 12 < 17.', ['Đảo chiều dấu', 'So sánh theo chữ số đầu khi chưa phù hợp']),
    math(1, 'ordinal_spatial', 'Thứ tự và vị trí', 'Hình học và đo lường', 'Dùng được từ chỉ thứ tự, vị trí, bên trái, bên phải, trước, sau.', 'Con nhìn hàng 5 con vật và nói con đứng thứ ba từ trái sang phải.', ['Đếm từ sai hướng', 'Nhầm trái/phải']),
    math(2, 'place_value', 'Hàng chục-đơn vị', 'Số và phép tính', 'Hiểu cấu tạo số có hai chữ số theo chục và đơn vị.', 'Con viết 47 = 4 chục 7 đơn vị và chỉ chữ số hàng chục.', ['Đọc số được nhưng không hiểu giá trị vị trí', 'Nhầm chữ số với giá trị']),
    math(2, 'add_sub_carry', 'Cộng trừ có nhớ', 'Số và phép tính', 'Cộng, trừ số có hai chữ số, biết nhớ/mượn và giải thích bước làm.', 'Con giải 38 + 27, nói vì sao 8 + 7 phải nhớ 1 chục.', ['Ghi nhớ sai vị trí', 'Mượn 1 nhưng không giảm hàng chục']),
    math(2, 'even_odd', 'Số chẵn - số lẻ', 'Số và phép tính', 'Nhận biết số chẵn, số lẻ qua chia cặp hoặc chữ số tận cùng.', 'Con xếp 13 viên bi thành cặp và thấy còn dư 1 nên là số lẻ.', ['Thuộc mẹo tận cùng nhưng không hiểu chia cặp', 'Nhầm 0 là số lẻ']),
    math(2, 'intro_mult', 'Nhân sơ khởi', 'Số và phép tính', 'Hiểu phép nhân là cộng các nhóm bằng nhau.', 'Con nhìn 4 đĩa, mỗi đĩa 3 bánh, viết 3 + 3 + 3 + 3 = 12 và 4 x 3 = 12.', ['Nhân như cộng hai số', 'Không kiểm tra nhóm có bằng nhau không']),
    math(2, 'intro_fractions', 'Phân số 1/2, 1/4', 'Số và phép tính', 'Nhận biết một phần hai, một phần tư qua chia đều.', 'Con chia hình tròn thành 4 phần bằng nhau và tô 1 phần tư.', ['Chia không đều vẫn gọi là phân số', 'Nhầm số phần tô với số phần toàn bộ']),
    math(2, 'clock', 'Xem đồng hồ', 'Hình học và đo lường', 'Đọc giờ đúng, giờ rưỡi và liên hệ thời gian trong sinh hoạt.', 'Con nhìn đồng hồ 7 giờ 30 và nói đó là 7 giờ rưỡi, lúc chuẩn bị đi học.', ['Nhầm kim giờ và kim phút', 'Không hiểu nửa giờ']),
    math(2, 'measure_cm', 'Đo độ dài (cm)', 'Hình học và đo lường', 'Đo, ước lượng và so sánh độ dài bằng xăng-ti-mét trong tình huống quen thuộc.', 'Con đặt thước từ vạch 0 để đo cây bút dài 12 cm.', ['Đặt thước lệch vạch 0', 'Đọc nhầm đơn vị']),
    math(2, 'word_g2', 'Toán đố lớp 2', 'Giải quyết vấn đề', 'Đọc bài toán một bước hoặc hai bước đơn giản, chọn phép tính phù hợp.', 'Con gạch dữ kiện, nói cần tìm gì và giải bài toán thêm/bớt đồ vật.', ['Chỉ thấy số là cộng', 'Không đọc câu hỏi cuối']),
    math(3, 'mult_div', 'Nhân chia cơ bản', 'Số và phép tính', 'Dùng bảng nhân/chia và hiểu quan hệ nhân-chia.', 'Con giải 24 : 6 bằng cách hỏi 6 nhân mấy bằng 24.', ['Thuộc bảng nhân nhưng không thấy phép chia ngược', 'Nhầm thương và tích']),
    math(3, 'perimeter', 'Chu vi', 'Hình học và đo lường', 'Tính chu vi hình đơn giản bằng tổng độ dài các cạnh.', 'Con đo bốn cạnh hình chữ nhật và cộng lại để tìm chu vi.', ['Nhầm chu vi với diện tích', 'Quên cộng đủ cạnh']),
    math(3, 'patterns', 'Quy luật dãy số', 'Số và phép tính', 'Nhận ra quy luật tăng/giảm và nêu được bước lặp.', 'Con nhìn dãy 3, 6, 9, 12 và nói mỗi bước thêm 3.', ['Đoán số tiếp theo nhưng không nêu quy luật', 'Không kiểm tra nhiều khoảng cách']),
    math(3, 'word_g3', 'Toán đố lớp 3', 'Giải quyết vấn đề', 'Giải bài toán có phép nhân, chia hoặc hai bước tính.', 'Con tóm tắt bài toán chia đều đồ vật rồi viết phép chia và lời đáp.', ['Không phân biệt chia đều và chia theo nhóm', 'Bỏ đơn vị trong lời đáp']),
    math(4, 'fractions', 'Phân số', 'Số và phép tính', 'Hiểu phân số, so sánh phân số đơn giản và liên hệ phần của toàn bộ.', 'Con so sánh 1/2 và 1/4 bằng cùng một hình được chia đều.', ['So sánh mẫu số lớn là phân số lớn', 'Không kiểm tra cùng một toàn bộ']),
    math(4, 'area', 'Diện tích', 'Hình học và đo lường', 'Tính diện tích hình chữ nhật/hình vuông và hiểu đơn vị vuông.', 'Con lát ô vuông trong hình chữ nhật 4 x 6 để thấy diện tích là 24 ô vuông.', ['Nhầm diện tích với chu vi', 'Quên đơn vị vuông']),
    math(4, 'large_numbers', 'Số lớn', 'Số và phép tính', 'Đọc, viết, phân tích và so sánh số lớn theo hàng/lớp.', 'Con đọc 125 304 và phân tích thành trăm nghìn, chục nghìn, nghìn, trăm, đơn vị.', ['Bỏ qua chữ số 0 ở giữa', 'Không tách lớp nghìn']),
    math(4, 'mass', 'Khối lượng', 'Hình học và đo lường', 'Đọc, đổi và so sánh đơn vị khối lượng trong tình huống đời sống.', 'Con đổi 2 kg 500 g thành 2500 g khi tính cân nặng túi gạo.', ['Nhầm kg và g', 'Đổi đơn vị theo 10 thay vì 1000']),
    math(5, 'decimals', 'Số thập phân', 'Số và phép tính', 'Đọc, viết, so sánh số thập phân và liên hệ phân số thập phân.', 'Con đặt 3,45 lên bảng hàng phần mười, phần trăm và so sánh với 3,5.', ['So sánh theo số chữ số sau dấu phẩy', 'Không hiểu giá trị vị trí phần thập phân']),
    math(5, 'percent', 'Phần trăm', 'Số và phép tính', 'Hiểu phần trăm là số phần trên 100 và dùng trong bài toán đời sống.', 'Con tính 25% của 80 bằng cách hiểu là 25 trên 100 của 80.', ['Xem phần trăm như số tự nhiên', 'Không xác định toàn bộ là gì']),
    math(5, 'ratio', 'Tỉ số', 'Số và phép tính', 'Hiểu tỉ số, so sánh hai đại lượng và giải tình huống đơn giản.', 'Con giải tỉ số 2:3 bằng hình 2 phần màu đỏ và 3 phần màu xanh.', ['Nhầm tỉ số với hiệu', 'Không giữ cùng đơn vị']),
    math(5, 'charts', 'Biểu đồ và thống kê', 'Thống kê và xác suất', 'Đọc biểu đồ, rút thông tin và trả lời câu hỏi bằng dữ liệu.', 'Con đọc biểu đồ số sách đã đọc từng tháng và tìm tháng tăng nhiều nhất.', ['Nhìn cột cao nhất nhưng không đọc số', 'Không phân biệt trục và nhãn']),
    vietnamese(1, 'alphabet', 'Bảng chữ cái', 'Đọc - viết nền tảng', 'Nhận biết chữ cái tiếng Việt, thứ tự chữ và âm tương ứng.', 'Con nghe âm, chọn chữ cái đúng, viết lại và nói một tiếng có chữ đó.', ['Nhầm chữ in hoa/in thường', 'Nhầm âm và tên chữ']),
    vietnamese(1, 'tones', 'Dấu thanh', 'Đọc - viết nền tảng', 'Nhận biết 6 thanh và hiểu đổi dấu có thể đổi nghĩa.', 'Con đọc ma, má, mà, mã, mả, mạ và nói tiếng nào chỉ mẹ.', ['Nhầm hỏi/ngã', 'Đặt dấu sai vị trí']),
    vietnamese(2, 'vocabulary', 'Từ vựng chủ đề', 'Mở rộng vốn từ', 'Hiểu nghĩa từ theo chủ đề và dùng từ trong câu gần gũi.', 'Con chọn nghĩa của từ "thư viện" rồi đặt một câu về thư viện trường.', ['Chọn nghĩa theo đoán âm', 'Không dùng được từ trong câu']),
    vietnamese(2, 'reading', 'Đọc hiểu', 'Đọc hiểu văn bản', 'Tìm thông tin rõ ràng, ý chính đơn giản và trả lời bằng câu đủ ý.', 'Con đọc đoạn ngắn về con mèo, tìm chi tiết mèo làm gì mỗi tối.', ['Chỉ nhớ chi tiết đầu đoạn', 'Trả lời cụt không đủ ý']),
    vietnamese(3, 'grammar', 'Ngữ pháp', 'Kiến thức tiếng Việt', 'Nhận biết từ loại, dấu câu và dùng câu đúng trong ngữ cảnh.', 'Con chọn danh từ trong câu rồi viết lại câu có dấu chấm đúng chỗ.', ['Học thuộc tên từ loại nhưng không nhận trong câu', 'Quên dấu câu cuối câu']),
    english(1, 'alphabet_en', 'Alphabet & Phonics', 'Nghe - nói - nhận biết chữ cái', 'Nhận biết 26 chữ cái, phân biệt hoa/thường, bước đầu phát âm phonics.', 'Con nghe âm /k/, chọn chữ C và nói một từ bắt đầu bằng C: "cat".', ['Nhầm chữ hoa và chữ thường', 'Nhầm tên chữ cái với âm phonics']),
    english(2, 'greetings_en', 'Greetings & Phrases', 'Nghe - nói giao tiếp cơ bản', 'Dùng được 10+ mẫu chào hỏi, xin phép, cảm ơn trong tình huống quen thuộc.', 'Con nghe "Good morning!" và trả lời, sau đó tự nói khi gặp cô giáo.', ['Chỉ thuộc lòng, không dùng đúng tình huống', 'Nhầm Good morning / Good night']),
    english(3, 'vocab_en', 'Vocabulary', 'Nghe - nói - đọc - viết từ vựng', 'Hiểu và dùng từ quen thuộc về gia đình, trường học, đồ vật, con vật.', 'Con nghe "book", chọn hình quyển sách, nói lại từ và đặt câu "This is my book".', ['Dịch từng từ nhưng không dùng trong câu', 'Nhầm phát âm gần giống']),
    english(4, 'grammar_en', 'Grammar', 'Ngữ pháp trong câu giao tiếp', 'Dùng mẫu câu đơn giản như hiện tại đơn, đại từ, giới từ trong ngữ cảnh.', 'Con chọn "She goes to school" rồi nói vì sao dùng "goes".', ['Gắn s/es máy móc', 'Dịch tiếng Việt từng chữ sang tiếng Anh']),
    english(4, 'reading_en', 'Reading', 'Đọc hiểu văn bản ngắn', 'Đọc đoạn ngắn, tìm thông tin và hiểu ý chính bằng tiếng Anh có hỗ trợ.', 'Con đọc đoạn về bạn Minh và trả lời Minh thích làm gì.', ['Tìm từ khóa rời rạc', 'Không hiểu câu hỏi hỏi ai/lúc nào']),
    english(5, 'sentence_en', 'Sentences', 'Viết câu ngắn', 'Viết câu đơn giản đúng ý, có chủ ngữ và động từ phù hợp.', 'Con viết 3 câu về thói quen lành mạnh, mỗi câu có một ý rõ.', ['Viết cụm từ chưa thành câu', 'Thiếu chủ ngữ hoặc động từ']),
    vietnamese(4, 'writing_g4', 'Tập làm văn', 'Kĩ năng viết văn', 'Viết bài văn tả (người, cảnh, đồ vật) có cấu trúc Mở - Thân - Kết và biện pháp tu từ.', 'Con viết mở bài giới thiệu người cần tả, dùng so sánh hoặc nhân hóa ở thân bài.', ['Thiếu cấu trúc 3 phần', 'Không dùng biện pháp tu từ nào']),
    vietnamese(5, 'writing_g5', 'Nghị luận đơn giản', 'Kĩ năng viết văn', 'Viết bài nghị luận có ý kiến, lý lẽ và dẫn chứng.', 'Con nêu ý kiến về việc đọc sách, đưa ra 2 lý do và một ví dụ cụ thể.', ['Chỉ nêu ý kiến mà không có dẫn chứng', 'Nhầm nghị luận với kể chuyện']),
    science(1, 'body_health', 'Cơ thể và sức khỏe', 'Con người và sức khỏe', 'Nhận biết bộ phận cơ thể, giác quan, vệ sinh và an toàn cá nhân.', 'Con chọn khi nào cần rửa tay và nói vì sao trước khi ăn phải rửa tay.', ['Học thuộc tên cơ quan nhưng không biết hành vi an toàn', 'Chọn đáp án theo thói quen sai']),
    science(2, 'nature', 'Thực vật và động vật', 'Tự nhiên quanh em', 'Quan sát cây, con vật, nhu cầu sống và đặc điểm đơn giản.', 'Con xem cây bị héo, nói cây cần nước/ánh sáng/không khí và cách chăm sóc.', ['Nói cây chỉ cần nước', 'Nhầm côn trùng và động vật khác']),
    science(3, 'weather_earth', 'Thời tiết và Trái Đất', 'Trái Đất và bầu trời', 'Quan sát thời tiết, vòng tuần hoàn nước và hiện tượng tự nhiên gần gũi.', 'Con mô tả mưa hình thành từ hơi nước ngưng tụ thành mây rồi rơi xuống.', ['Học thuộc chu trình nhưng không giải thích được hiện tượng', 'Nhầm bay hơi và ngưng tụ']),
    science(4, 'matter_energy', 'Vật chất và năng lượng', 'Vật chất và năng lượng', 'Nhận biết tính chất vật liệu, ánh sáng, âm thanh, nhiệt và năng lượng.', 'Con dự đoán đường tan nhanh hơn trong nước nóng hay lạnh rồi giải thích bằng quan sát.', ['Gọi tan là biến mất', 'Không phân biệt dẫn nhiệt và cách nhiệt']),
    science(5, 'ecosystem', 'Hệ sinh thái và môi trường', 'Sinh vật và môi trường', 'Hiểu quan hệ trong chuỗi thức ăn, môi trường sống và bảo vệ môi trường.', 'Con vẽ chuỗi thức ăn cỏ -> thỏ -> cáo và nói điều gì xảy ra nếu mất cỏ.', ['Xem chuỗi thức ăn như danh sách rời rạc', 'Không thấy tác động của ô nhiễm']),
    hisgeo(4, 'history_g4', 'Lịch sử dân tộc', 'Lịch sử', 'Sắp xếp mốc thời gian, nhân vật, sự kiện và nêu ý nghĩa đơn giản.', 'Con đặt Văn Lang, Bạch Đằng 938, Lam Sơn trên dòng thời gian và nói một ý nghĩa.', ['Nhớ năm nhưng không hiểu quan hệ trước-sau', 'Nhầm nhân vật với triều đại']),
    hisgeo(5, 'geography', 'Địa lý Việt Nam', 'Địa lý', 'Đọc bản đồ Việt Nam, nêu vị trí, địa danh, vùng và đặc điểm tự nhiên/xã hội.', 'Con chỉ đồng bằng sông Cửu Long trên bản đồ và nói vì sao nơi này trồng nhiều lúa.', ['Nhớ địa danh nhưng không chỉ được trên bản đồ', 'Dùng số liệu chưa re-audit']),
    computing(3, 'hardware', 'Phần cứng căn bản', 'Máy tính và em', 'Nhận biết thiết bị số cơ bản, thao tác lưu, gõ, chọn và dùng an toàn.', 'Con chỉ màn hình, bàn phím, chuột và thực hiện thao tác lưu bài.', ['Gọi mọi thiết bị là máy tính', 'Không biết lưu trước khi thoát']),
    computing(4, 'cyber_safety', 'An toàn mạng', 'Đạo đức, pháp luật và văn hóa trong môi trường số', 'Biết bảo vệ mật khẩu, thông tin cá nhân và báo người lớn khi gặp rủi ro.', 'Con chọn không bấm link trúng thưởng lạ và nói cần báo phụ huynh.', ['Tò mò bấm link lạ', 'Nghĩ mật khẩu có thể chia sẻ cho bạn thân']),
    computing(5, 'comp_logic', 'Tư duy máy tính', 'Giải quyết vấn đề với sự trợ giúp của máy tính', 'Hiểu thuật toán là các bước rõ ràng và biết phát hiện/sửa lỗi đơn giản.', 'Con sắp xếp lệnh đi tới đích, chạy thử, phát hiện bước sai và sửa lại.', ['Không kiểm tra thứ tự bước', 'Nghĩ thuật toán chỉ là code khó']),
    ethics(1, 'polite_greet', 'Chào hỏi lễ phép', 'Giáo dục đạo đức', 'Biết chào hỏi phù hợp với từng đối tượng (người lớn, bạn bè).', 'Con chọn cách khoanh tay chào ông bà và giải thích vì sao cần làm thế.', ['Chào trống không', 'Không phân biệt người lớn và bạn bè']),
    ethics(2, 'express_emotion', 'Thể hiện cảm xúc', 'Giáo dục kĩ năng sống', 'Nhận biết và thể hiện cảm xúc bản thân đúng cách, tôn trọng cảm xúc người khác.', 'Con chọn cách hít thở sâu khi tức giận thay vì ném đồ chơi.', ['Cho rằng tức giận là xấu và phải giấu đi', 'Thể hiện cảm xúc làm tổn thương người khác']),
    ethics(3, 'honesty', 'Trung thực', 'Giáo dục đạo đức', 'Hiểu ý nghĩa của trung thực, dũng cảm nhận lỗi và không gian lận.', 'Con chọn tự giác nhận lỗi khi vô tình làm vỡ bình hoa trong lớp.', ['Nghĩ rằng nói dối nhỏ không sao', 'Đổ lỗi cho người khác để tránh bị phạt']),
    ethics(4, 'responsibility', 'Trách nhiệm', 'Giáo dục đạo đức', 'Hiểu trách nhiệm cá nhân, giữ lời hứa và hoàn thành nhiệm vụ được giao.', 'Con giữ lời hứa giúp mẹ dọn nhà thay vì đi chơi với bạn.', ['Tránh né việc khó', 'Không giữ lời hứa vì lý do không chính đáng']),
    ethics(5, 'community_empathy', 'Đồng cảm cộng đồng', 'Giáo dục đạo đức', 'Biết quan tâm, chia sẻ với người yếu thế và cộng đồng xung quanh.', 'Con chủ động làm quen và rủ bạn mới chuyển trường chơi cùng.', ['Thờ ơ với khó khăn của người khác', 'Chỉ giúp đỡ khi bị ép buộc']),
    art(1, 'basic_colors', 'Màu sắc cơ bản', 'Mĩ thuật', 'Nhận biết các màu cơ bản và pha màu đơn giản.', 'Con chỉ ra màu đỏ, vàng, xanh lam trong bức tranh và biết đỏ pha vàng ra cam.', ['Gọi sai tên màu', 'Tô màu tràn viền không kiểm soát']),
    art(2, 'music_rhythm', 'Nhịp điệu cơ bản', 'Âm nhạc', 'Nhận biết và vỗ tay theo nhịp điệu bài hát đơn giản.', 'Con vỗ tay đúng nhịp 2/4 theo bài hát thiếu nhi.', ['Vỗ tay nhanh/chậm hơn nhạc', 'Không cảm nhận được phách mạnh']),
    art(3, 'shapes_drawing', 'Đường nét và hình khối', 'Mĩ thuật', 'Nhận biết các loại đường nét, hình khối cơ bản và ý nghĩa biểu cảm.', 'Con phân biệt đường thẳng ngang (vững chãi) và đường cong (mềm mại) trong bài vẽ.', ['Không phân biệt 2D và 3D', 'Chưa biết bố cục xa gần']),
    art(4, 'music_instruments', 'Nhạc cụ Việt Nam', 'Âm nhạc', 'Nhận biết và phân loại các nhạc cụ truyền thống Việt Nam theo bộ dây, hơi, gõ.', 'Con nhận diện đàn tranh là nhạc cụ dây và sáo trúc là nhạc cụ hơi.', ['Nhầm nhạc cụ Việt Nam với nhạc cụ phương Tây', 'Không phân biệt nhạc cụ gõ và nhạc cụ dây']),
    art(5, 'art_appreciation', 'Cảm thụ nghệ thuật', 'Mĩ thuật & Âm nhạc', 'Biết quan sát, cảm nhận và nêu ý kiến về tác phẩm nghệ thuật (tranh, nhạc).', 'Con nêu cảm nhận khi xem tranh phố cổ Bùi Xuân Phái: màu sắc trầm, gợi nỗi nhớ.', ['Chỉ nói thích/không thích mà không giải thích', 'Không phân biệt màu ấm và màu lạnh']),
];

export const PRIMARY_CURRICULUM_MAP_STATS = {
    sourceVersion: CT_VERSION,
    topicMapCount: PRIMARY_CURRICULUM_TOPIC_MAP.length,
    gradeCoverage: [1, 2, 3, 4, 5] as const,
    subjectCoverage: ['math', 'vietnamese', 'english', 'science', 'hisgeo', 'computing', 'ethics', 'art'] as const,
    evidenceFields: ['curriculumMapId', 'topicKey', 'gradeLevel', 'attempt result', 'support level', 'child explanation', 'source version', 'review status'],
    noOverclaim: 'Generated item hiện đã có curriculumMapId và source version. Muốn claim item bank phủ chuẩn 100% vẫn cần người duyệt và calibration bằng dữ liệu thật.',
};

export function getPrimaryCurriculumTopicMap(subject: PrimaryCurriculumSubjectKey, topicKey: string) {
    return PRIMARY_CURRICULUM_TOPIC_MAP.find((item) => item.subject === subject && item.topicKey === topicKey);
}

export function getPrimaryCurriculumTopicMapsByGrade(grade: 1 | 2 | 3 | 4 | 5) {
    return PRIMARY_CURRICULUM_TOPIC_MAP.filter((item) => item.grade === grade);
}

export function computePrimaryCurriculumTopicMapCoverage(expectedTopicCount = PRIMARY_CURRICULUM_TOPIC_MAP.length) {
    if (expectedTopicCount === 0) return 0;
    const completeMaps = PRIMARY_CURRICULUM_TOPIC_MAP.filter((item) =>
        item.expectedOutcome.length > 40
        && item.exampleTask.length > 40
        && item.evidenceToStore.length >= 4
        && item.misconceptionWatch.length >= 2
        && item.releaseGate.length > 60
        && item.sourceIds.length > 0,
    );

    return Math.round((completeMaps.length / expectedTopicCount) * 100);
}
