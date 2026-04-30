import type { LearningSubjectKey, SourceId } from './curriculum-enrichment';

export type LessonDepth = 'focused' | 'deep' | 'challenge';

export interface LessonModeConfig {
    key: LessonDepth;
    label: string;
    count: number;
    description: string;
    sessionPromise: string;
    phases: string[];
}

export interface StandardAlignment {
    sourceId: SourceId;
    label: string;
    application: string;
}

export interface BenchmarkPattern {
    sourceId: SourceId;
    product: string;
    pattern: string;
    appUse: string;
}

export interface TopicLearningBlueprint {
    topicKey: string;
    subject: LearningSubjectKey;
    bigIdea: string;
    matureLearnerFrame: string;
    goldStandards: StandardAlignment[];
    benchmarkPatterns: BenchmarkPattern[];
    practiceDesign: string[];
    studyRoutine: string[];
    stretchTask: string;
    evidenceOfMastery: string[];
    parentCoaching: string;
    reviewCadence: string;
}

export const LESSON_MODE_CONFIG: Record<LessonDepth, LessonModeConfig> = {
    focused: {
        key: 'focused',
        label: 'Gọn',
        count: 8,
        description: 'Một kỹ năng, ít nhiễu, phù hợp khi cần hoàn thành nhanh.',
        sessionPromise: 'Nắm đúng thao tác cốt lõi và phát hiện một lỗi dễ gặp.',
        phases: ['Nhớ lại', 'Làm mẫu tinh thần', 'Luyện tập', 'Kiểm tra lại'],
    },
    deep: {
        key: 'deep',
        label: 'Sâu',
        count: 12,
        description: 'Cân bằng giữa luyện tập, giải thích và chuyển giao.',
        sessionPromise: 'Hiểu cách nghĩ, làm được dạng tương tự và nói được vì sao.',
        phases: ['Nhớ lại', 'Chiến lược', 'Luyện xen kẽ', 'Chuyển giao', 'Phản tư'],
    },
    challenge: {
        key: 'challenge',
        label: 'Thử thách',
        count: 16,
        description: 'Cho bé tư duy mạnh: thêm giải thích, lỗi bẫy và nhiệm vụ mở rộng.',
        sessionPromise: 'Giữ độ khó vừa tầm nhưng buộc lập luận rõ, không chỉ chọn đáp án.',
        phases: ['Khởi động', 'Luyện chính', 'Bẫy khái niệm', 'Bài nâng cao', 'Tự đánh giá'],
    },
};

const STANDARD_BY_SUBJECT: Record<LearningSubjectKey, StandardAlignment[]> = {
    math: [
        { sourceId: 'moet-ctgdpt-2018', label: 'CTGDPT 2018 Toán tiểu học', application: 'Bám mạch số và phép tính, hình học, đo lường, dữ liệu.' },
        { sourceId: 'common-core-math', label: 'Common Core Math', application: 'Ưu tiên hiểu cấu trúc số, giải thích và mô hình hóa.' },
        { sourceId: 'cambridge-primary-math', label: 'Cambridge Primary Mathematics', application: 'Thêm reasoning: trình bày, kiểm tra, tìm nhiều cách giải.' },
    ],
    vietnamese: [
        { sourceId: 'moet-ctgdpt-2018', label: 'CTGDPT 2018 Tiếng Việt', application: 'Đọc, viết, nói và nghe theo năng lực giao tiếp.' },
        { sourceId: 'national-reading-panel', label: 'National Reading Panel', application: 'Âm vị, ngữ âm, lưu loát, từ vựng, đọc hiểu.' },
        { sourceId: 'ies-foundational-reading', label: 'IES Foundational Reading', application: 'Đọc văn bản kết nối mỗi ngày và luyện nền tảng có phản hồi.' },
    ],
    english: [
        { sourceId: 'moet-ctgdpt-2018', label: 'CTGDPT 2018 Ngoại ngữ', application: 'Dùng tiếng Anh trong tình huống nghe, nói, đọc, viết ngắn.' },
        { sourceId: 'national-reading-panel', label: 'Science of Reading', application: 'Chữ, âm, từ vựng và đọc hiểu phải đi cùng nhau.' },
        { sourceId: 'ies-foundational-reading', label: 'IES Reading Practice Guide', application: 'Tăng giải mã và đọc câu có nghĩa, không học từ rời rạc.' },
    ],
    science: [
        { sourceId: 'moet-ctgdpt-2018', label: 'CTGDPT 2018 Tự nhiên - Khoa học', application: 'Quan sát, tìm hiểu tự nhiên, sức khỏe, môi trường.' },
        { sourceId: 'ngss-three-dimensional', label: 'NGSS Three-Dimensional Learning', application: 'Kết hợp thực hành khoa học, ý tưởng cốt lõi và khái niệm xuyên suốt.' },
        { sourceId: 'eef-metacognition', label: 'EEF Metacognition', application: 'Dạy bé lập kế hoạch, theo dõi và tự đánh giá khi điều tra.' },
    ],
    hisgeo: [
        { sourceId: 'moet-ctgdpt-2018', label: 'CTGDPT 2018 Lịch sử và Địa lý', application: 'Tổ chức theo bản đồ, mốc thời gian, nhân vật, sự kiện và địa điểm.' },
        { sourceId: 'wikimedia-commons', label: 'Tư liệu mở có attribution', application: 'Dùng ảnh/bản đồ thật để hỏi bằng chứng, không kể chuyện suông.' },
        { sourceId: 'casel-framework', label: 'CASEL decision reflection', application: 'Khi bàn nhân vật/sự kiện, luyện góc nhìn và quyết định có trách nhiệm.' },
    ],
    computing: [
        { sourceId: 'moet-ctgdpt-2018', label: 'CTGDPT 2018 Tin học', application: 'Thiết bị, dữ liệu, an toàn, thuật toán, sản phẩm số.' },
        { sourceId: 'csta-k12-standards', label: 'CSTA K-12 CS Standards', application: 'Thuật toán, lập trình, dữ liệu, hệ thống và tác động xã hội.' },
        { sourceId: 'unicef-ai-children', label: 'UNICEF AI for children', application: 'AI literacy phải bảo vệ trẻ, không khuyến khích chat tự do.' },
    ],
    elite: [
        { sourceId: 'eef-metacognition', label: 'Self-regulated learning', application: 'Lập kế hoạch, theo dõi, điều chỉnh chiến lược.' },
        { sourceId: 'casel-framework', label: 'CASEL SEL', application: 'Tự nhận thức, tự quản, quan hệ, ra quyết định.' },
        { sourceId: 'aap-family-media', label: 'AAP Family Media Plan', application: 'Phiên học ngắn, có giới hạn màn hình và tương tác phụ huynh.' },
    ],
    ethics: [
        { sourceId: 'moet-ctgdpt-2018', label: 'CTGDPT 2018 Đạo đức', application: 'Phát triển hành vi và thái độ chuẩn mực.' },
        { sourceId: 'casel-framework', label: 'CASEL SEL', application: 'Quản lý cảm xúc và nhận thức xã hội.' },
        { sourceId: 'oecd-learning-compass', label: 'OECD Learning Compass', application: 'Trách nhiệm cá nhân và xã hội.' },
    ],
    art: [
        { sourceId: 'moet-ctgdpt-2018', label: 'CTGDPT 2018 Mĩ thuật & Âm nhạc', application: 'Nhận biết, thể hiện và cảm thụ cái đẹp.' },
        { sourceId: 'cast-udl', label: 'Universal Design for Learning', application: 'Cung cấp nhiều cách để học sinh biểu đạt.' },
        { sourceId: 'eef-metacognition', label: 'EEF Metacognition', application: 'Tự suy ngẫm về quá trình sáng tạo.' },
    ],
};

const BENCHMARK_BY_SUBJECT: Record<LearningSubjectKey, BenchmarkPattern[]> = {
    math: [
        { sourceId: 'khan-academy-mastery', product: 'Khan Academy', pattern: 'Mastery learning', appUse: 'Không chỉ chấm đúng/sai; luôn hỏi cách kiểm tra và bước lên mức.' },
        { sourceId: 'ixl-diagnostic', product: 'IXL', pattern: 'Real-time diagnostic path', appUse: 'Mỗi chủ đề cần biết kỹ năng đang học và kỹ năng sẵn sàng học tiếp.' },
        { sourceId: 'beast-academy', product: 'Beast Academy', pattern: 'Advanced problem solving', appUse: 'Bé tư duy tốt được giao bài ít hơn nhưng đòi lập luận sâu hơn.' },
    ],
    vietnamese: [
        { sourceId: 'khan-academy-kids', product: 'Khan Academy Kids', pattern: 'Personalized path + library', appUse: 'Cho chọn chủ đề nhưng vẫn giữ lộ trình năng lực.' },
        { sourceId: 'ies-foundational-reading', product: 'WWC/IES guide', pattern: 'Daily connected text', appUse: 'Mỗi phiên đọc phải có bằng chứng trong câu/đoạn.' },
        { sourceId: 'open-library', product: 'Open Library', pattern: 'Book discovery metadata', appUse: 'Gợi ý đọc mở nhưng chỉ đưa metadata đã kiểm soát vào app.' },
    ],
    english: [
        { sourceId: 'duolingo-abc', product: 'Duolingo ABC', pattern: 'Micro-lesson literacy loop', appUse: 'Ngắn, lặp có chủ đích: âm/chữ -> từ -> câu.' },
        { sourceId: 'khan-academy-kids', product: 'Khan Academy Kids', pattern: 'Mastery-based early learning path', appUse: 'Đi tiếp khi đã nắm, quay lại khi cần thêm luyện tập.' },
        { sourceId: 'gutendex', product: 'Gutendex', pattern: 'Public-domain reading source', appUse: 'Chỉ dùng làm nguồn đọc nâng cao đã lọc theo tuổi.' },
    ],
    science: [
        { sourceId: 'ngss-three-dimensional', product: 'NGSS', pattern: 'Phenomenon-first learning', appUse: 'Bắt đầu từ hiện tượng/ảnh thật, rồi mới giải thích.' },
        { sourceId: 'khan-academy-mastery', product: 'Khan Academy', pattern: 'Practice with feedback', appUse: 'Sau mỗi câu phải có phản hồi giúp sửa chiến lược.' },
        { sourceId: 'wikimedia-commons', product: 'Wikimedia Commons', pattern: 'Real-world visual evidence', appUse: 'Ảnh thật làm bằng chứng quan sát, kèm attribution.' },
    ],
    hisgeo: [
        { sourceId: 'wikimedia-commons', product: 'Wikimedia Commons', pattern: 'Primary/visual source habit', appUse: 'Dựa vào ảnh/bản đồ/mốc thật trước khi kết luận.' },
        { sourceId: 'openverse', product: 'Openverse', pattern: 'Open media discovery', appUse: 'Tìm tư liệu mở có giấy phép, không dùng hình không rõ nguồn.' },
        { sourceId: 'khan-academy-kids', product: 'Khan Academy Kids', pattern: 'Choice within a guided library', appUse: 'Cho bé chọn nội dung nhưng vẫn theo mạch bản đồ - thời gian - hệ quả.' },
    ],
    computing: [
        { sourceId: 'scratch', product: 'Scratch', pattern: 'Create-first computing', appUse: 'Học bằng tạo sản phẩm nhỏ, thử, sai, sửa.' },
        { sourceId: 'code-org', product: 'Code.org', pattern: 'K-12 CS pathway', appUse: 'Mỗi bài gắn khái niệm CS rõ: lệnh, lặp, điều kiện, dữ liệu.' },
        { sourceId: 'code-org-ai', product: 'Code.org AI', pattern: 'Age-aware AI literacy', appUse: 'Giải thích AI bằng hoạt động an toàn, không giao tiếp mở với AI.' },
    ],
    elite: [
        { sourceId: 'eef-metacognition', product: 'EEF', pattern: 'Plan-monitor-evaluate', appUse: 'Mỗi bài có câu tự kiểm: mình đã dùng chiến lược nào?' },
        { sourceId: 'casel-framework', product: 'CASEL', pattern: 'Decision and relationship reflection', appUse: 'Không chỉ chọn đáp án; cần nêu hệ quả cho người khác.' },
        { sourceId: 'aap-family-media', product: 'AAP', pattern: 'Family media boundary', appUse: 'Phiên học có điểm dừng, nhiệm vụ ngoài màn hình và người lớn đồng hành.' },
    ],
    ethics: [
        { sourceId: 'casel-framework', product: 'CASEL', pattern: 'SEL integrated practice', appUse: 'Tập trung vào giải thích lý do cho hành vi.' },
        { sourceId: 'khan-academy-kids', product: 'Khan Academy Kids', pattern: 'Guided reflection', appUse: 'Luyện tập tình huống xã hội thông qua câu chuyện.' },
        { sourceId: 'oecd-learning-compass', product: 'OECD', pattern: 'Action reflection', appUse: 'Biến nhận thức thành hành động thực tế.' },
    ],
    art: [
        { sourceId: 'khan-academy-kids', product: 'Khan Academy Kids', pattern: 'Creative play', appUse: 'Cho phép trẻ em tự do kết hợp màu sắc và âm thanh.' },
        { sourceId: 'cast-udl', product: 'UDL', pattern: 'Multiple means of expression', appUse: 'Cho phép phản hồi bằng nhiều phương thức.' },
        { sourceId: 'eef-metacognition', product: 'EEF', pattern: 'Creative process reflection', appUse: 'Hỏi về quá trình tạo ra sản phẩm nghệ thuật.' },
    ],
};

const PRACTICE_BY_SUBJECT: Record<LearningSubjectKey, string[]> = {
    math: ['Nhìn cấu trúc trước khi tính', 'Giải thích bằng mô hình hoặc phép ngược', 'Đổi số để kiểm tra có hiểu thật không'],
    vietnamese: ['Đọc chậm câu chứa bằng chứng', 'Nói lại ý bằng lời của mình', 'Viết một câu trọn ý sau khi chọn đáp án'],
    english: ['Nhìn ảnh hoặc ngữ cảnh trước', 'Nói từ/câu thành tiếng', 'Đổi sang một câu mới gần đời sống'],
    science: ['Quan sát hiện tượng', 'Dự đoán có lý do', 'Chọn bằng chứng và giải thích quan hệ nhân quả'],
    hisgeo: ['Đặt lên bản đồ hoặc dòng thời gian', 'Nêu nhân vật/địa điểm/bằng chứng', 'Giải thích vì sao sự kiện hoặc nơi đó quan trọng'],
    computing: ['Nói thuật toán bằng câu thường', 'Thử từng bước và tìm lỗi', 'Nêu quy tắc an toàn hoặc tác động xã hội'],
    elite: ['Nêu mục tiêu', 'So sánh hệ quả', 'Chọn phương án và điều kiện để đổi ý'],
    ethics: ['Phân tích tình huống', 'Chọn hành động đúng', 'Giải thích lý do'],
    art: ['Quan sát hoặc lắng nghe', 'Nhận diện đặc điểm', 'Biểu đạt cảm nhận'],
};

const ROUTINE_BY_SUBJECT: Record<LearningSubjectKey, string[]> = {
    math: ['1 câu nhớ lại', '2 câu thao tác lõi', '1 câu bẫy khái niệm', '1 câu giải thích bằng lời'],
    vietnamese: ['Đọc ngắn', 'Tìm bằng chứng', 'Giải nghĩa từ', 'Kể lại hoặc viết lại'],
    english: ['Âm/chữ hoặc từ', 'Câu ngắn', 'Ngữ cảnh', 'Tự đặt câu'],
    science: ['Quan sát', 'Dự đoán', 'Bằng chứng', 'Kết luận nhỏ'],
    hisgeo: ['Ảnh hoặc bản đồ', 'Mốc hoặc địa điểm', 'Nguyên nhân - hệ quả', 'Liên hệ hiện nay'],
    computing: ['Mục tiêu', 'Thuật toán', 'Debug', 'Quy tắc an toàn'],
    elite: ['Tình huống', 'Lựa chọn', 'Hệ quả', 'Tự đánh giá'],
    ethics: ['Tình huống', 'Cảm xúc', 'Lựa chọn', 'Lý do'],
    art: ['Tiếp nhận', 'Nhận diện', 'Cảm nhận', 'Sáng tạo'],
};

const PARENT_BY_SUBJECT: Record<LearningSubjectKey, string> = {
    math: 'Ba/mẹ hỏi: "Con biết điều gì trước khi tính? Có cách nào kiểm tra lại không?"',
    vietnamese: 'Ba/mẹ yêu cầu chỉ vào câu làm bằng chứng, rồi nói lại bằng một câu ngắn.',
    english: 'Ba/mẹ nghe con nói một câu mới; ưu tiên rõ nghĩa hơn phát âm hoàn hảo.',
    science: 'Ba/mẹ hỏi: "Bằng chứng nào trong hình hoặc đời sống làm con nghĩ vậy?"',
    hisgeo: 'Ba/mẹ hỏi bé đặt sự kiện/nơi chốn lên bản đồ hoặc dòng thời gian.',
    computing: 'Ba/mẹ hỏi bé đọc thuật toán từng bước và nêu một rủi ro an toàn.',
    elite: 'Ba/mẹ hỏi bé chọn lại nếu điều kiện thay đổi, để luyện linh hoạt.',
    ethics: 'Ba/mẹ hỏi: "Vì sao con chọn cách xử sự này? Cảm xúc của bạn kia sẽ thế nào?"',
    art: 'Ba/mẹ hỏi: "Con thấy màu/âm thanh này giống cái gì? Con cảm thấy thế nào?"',
};

function blueprint(
    topicKey: string,
    subject: LearningSubjectKey,
    bigIdea: string,
    matureLearnerFrame: string,
    stretchTask: string,
    evidenceOfMastery: string[],
): TopicLearningBlueprint {
    return {
        topicKey,
        subject,
        bigIdea,
        matureLearnerFrame,
        goldStandards: STANDARD_BY_SUBJECT[subject],
        benchmarkPatterns: BENCHMARK_BY_SUBJECT[subject],
        practiceDesign: PRACTICE_BY_SUBJECT[subject],
        studyRoutine: ROUTINE_BY_SUBJECT[subject],
        stretchTask,
        evidenceOfMastery,
        parentCoaching: PARENT_BY_SUBJECT[subject],
        reviewCadence: 'Ôn lại sau 1 ngày, 3 ngày và 7 ngày nếu sai hoặc cần gợi ý từ L2 trở lên.',
    };
}

export const TOPIC_LEARNING_BLUEPRINTS: Record<string, TopicLearningBlueprint> = {
    add_sub_10: blueprint('add_sub_10', 'math', 'Số trong 10 có cấu trúc, không chỉ là chuỗi để đếm.', 'Tập nhìn quan hệ phần - tổng rồi mới tính.', 'Tự tạo 3 phép tính có cùng tổng 10 và giải thích vì sao liên quan nhau.', ['Tính đúng trong 10', 'Nêu phép ngược để kiểm tra', 'Không cần đếm lại từ đầu']),
    add_sub_20: blueprint('add_sub_20', 'math', 'Qua 10 là chiến lược tách số, không phải mẹo nhớ đáp án.', 'Ưu tiên làm tròn 10 rồi xử lý phần còn lại.', 'Giải thích hai cách tính 8 + 7: qua 10 và đổi thứ tự.', ['Tách số để đủ 10', 'Tính nhẩm qua 10', 'Nói được phần còn lại']),
    number_bonds: blueprint('number_bonds', 'math', 'Một tổng có nhiều cách tách thành hai phần.', 'Nhìn sơ đồ phần - tổng như một hệ thống nhỏ.', 'Vẽ một sơ đồ tách số 12 theo 4 cách và nhận xét quy luật.', ['Nhận ra tổng và phần', 'Tự tìm phần thiếu', 'Dùng tách số để tính nhẩm']),
    count_20: blueprint('count_20', 'math', 'Đếm đến 20 là nền của nhóm chục và đơn vị.', 'Đếm có mốc, biết số đứng trước/sau và khoảng cách.', 'Chọn một số trong 20, nêu 2 số trước và 2 số sau, rồi biểu diễn bằng que chục.', ['Đếm xuôi/ngược', 'Biết thứ tự lân cận', 'Liên hệ với chục - đơn vị']),
    shapes_g1: blueprint('shapes_g1', 'math', 'Hình được nhận diện bằng thuộc tính, không chỉ bằng tên.', 'So sánh cạnh, góc, đường cong và cách ghép hình.', 'Tìm 5 đồ vật trong nhà và phân loại theo thuộc tính hình.', ['Nêu tên hình', 'Nêu ít nhất một thuộc tính', 'Phân biệt hình giống nhưng khác thuộc tính']),
    shapes_3d: blueprint('shapes_3d', 'math', 'Khối 3D có mặt, cạnh, đỉnh và có thể nhìn từ nhiều hướng.', 'Tập chuyển giữa đồ vật thật, ảnh và tên khối.', 'So sánh hộp, lon và quả bóng theo mặt phẳng/mặt cong.', ['Nhận ra khối cơ bản', 'Nêu mặt cong/mặt phẳng', 'Liên hệ đồ vật thật']),
    compare_g1: blueprint('compare_g1', 'math', 'So sánh số cần nhìn lượng và vị trí trên trục số.', 'Không chỉ đọc dấu; phải biết vì sao số này lớn hơn.', 'Tự đặt 3 cặp số và giải thích bằng trục số.', ['Dùng đúng lớn hơn/nhỏ hơn/bằng', 'Giải thích bằng lượng', 'Không nhầm chiều dấu']),
    ordinal_spatial: blueprint('ordinal_spatial', 'math', 'Thứ tự và vị trí phụ thuộc vào mốc nhìn.', 'Tập nói rõ "từ đâu nhìn" trước khi trả lời.', 'Sắp xếp 5 đồ vật rồi hỏi lại theo hai hướng trái/phải khác nhau.', ['Dùng đúng thứ nhất/thứ hai', 'Nêu trái/phải/trước/sau', 'Không đổi mốc giữa chừng']),
    place_value: blueprint('place_value', 'math', 'Giá trị chữ số phụ thuộc vào vị trí trong số.', 'Xem số hai chữ số như chục và đơn vị có thể đổi qua lại.', 'Biểu diễn 47 bằng que chục, tiền giả và lời giải thích.', ['Tách chục - đơn vị', 'So sánh theo hàng chục trước', 'Đổi mô hình sang chữ số']),
    add_sub_carry: blueprint('add_sub_carry', 'math', 'Có nhớ là thao tác đổi đơn vị sang chục hoặc mượn chục.', 'Tập giải thích việc đổi, không chỉ viết thuật toán cột dọc.', 'Tính một phép bằng cột dọc và bằng mô hình que chục.', ['Đặt tính đúng hàng', 'Giải thích nhớ/mượn', 'Kiểm tra bằng phép ngược']),
    even_odd: blueprint('even_odd', 'math', 'Chẵn/lẻ là khả năng chia thành cặp.', 'Dùng mô hình cặp để hiểu trước khi nhớ quy tắc chữ số cuối.', 'Chọn 10 số, dự đoán chẵn/lẻ rồi kiểm tra bằng cặp.', ['Nhận diện chẵn/lẻ', 'Giải thích bằng chia cặp', 'Dùng chữ số cuối để kiểm tra']),
    intro_mult: blueprint('intro_mult', 'math', 'Nhân là nhiều nhóm bằng nhau.', 'Tập chuyển giữa hình nhóm, phép cộng lặp và phép nhân.', 'Vẽ 4 nhóm, mỗi nhóm 3 đồ vật, rồi viết hai cách biểu diễn.', ['Nhận nhóm bằng nhau', 'Viết phép nhân tương ứng', 'Phân biệt nhóm không bằng nhau']),
    intro_fractions: blueprint('intro_fractions', 'math', 'Phân số cần các phần bằng nhau.', 'Không gọi là một phần hai nếu phần bị chia không đều.', 'Cắt một hình thành hai cách, chỉ ra cách nào tạo phần bằng nhau.', ['Nhận 1/2, 1/4', 'Kiểm tra phần bằng nhau', 'Liên hệ hình và lời']),
    clock: blueprint('clock', 'math', 'Đồng hồ là hệ thống vòng 12 và 60 phút.', 'Đọc giờ bằng quan hệ giữa kim giờ, kim phút và khoảng thời gian.', 'So sánh 7:30 và 8:00: còn bao lâu, kim di chuyển thế nào.', ['Đọc giờ đúng', 'Hiểu nửa giờ/giờ đúng', 'Nói được thời gian trước/sau']),
    measure_cm: blueprint('measure_cm', 'math', 'Đo là lặp lại một đơn vị chuẩn không chồng chéo.', 'Quan trọng là đặt mốc 0 và giữ thước thẳng.', 'Đo cùng một đồ vật bằng cm và gang tay, giải thích vì sao kết quả khác.', ['Đặt thước đúng', 'Đọc cm chính xác', 'Ước lượng trước khi đo']),
    word_g2: blueprint('word_g2', 'math', 'Toán đố là mô hình hóa tình huống bằng phép tính.', 'Đọc xem đề hỏi thay đổi, gộp hay so sánh.', 'Viết lại một bài toán đố bằng sơ đồ phần - tổng.', ['Tìm dữ kiện cần', 'Chọn phép phù hợp', 'Trả lời bằng câu có đơn vị']),
    mult_div: blueprint('mult_div', 'math', 'Nhân và chia là hai chiều của nhóm bằng nhau.', 'Tập nhìn phép chia như tìm số nhóm hoặc số trong mỗi nhóm.', 'Tự đặt một bài có 24 đồ vật chia đều theo hai cách.', ['Thuộc bảng cơ bản', 'Hiểu phép ngược', 'Giải thích bằng nhóm']),
    perimeter: blueprint('perimeter', 'math', 'Chu vi là tổng độ dài đường bao quanh.', 'Không nhầm chu vi với diện tích bên trong.', 'Tìm chu vi bàn học bằng cách đo từng cạnh và cộng.', ['Cộng các cạnh đúng', 'Nêu đơn vị độ dài', 'Phân biệt đường bao và phần bên trong']),
    patterns: blueprint('patterns', 'math', 'Quy luật phải được mô tả và kiểm chứng bằng số tiếp theo.', 'Không chỉ đoán số; phải nói quy tắc tạo ra dãy.', 'Tạo một dãy có hai quy luật xen kẽ và thách người lớn tìm.', ['Nêu quy luật', 'Tìm số tiếp theo', 'Kiểm tra quy luật với nhiều vị trí']),
    word_g3: blueprint('word_g3', 'math', 'Bài toán nhiều bước cần lọc dữ kiện và lập kế hoạch.', 'Trước khi tính, nói bước 1 để biết gì và bước 2 để trả lời gì.', 'Đổi một dữ kiện trong bài và dự đoán đáp án thay đổi thế nào.', ['Tách bài thành bước', 'Không dùng dữ kiện thừa', 'Ghi câu trả lời đúng đơn vị']),
    fractions: blueprint('fractions', 'math', 'Phân số là số, có vị trí trên trục số.', 'So sánh phân số bằng mẫu, tử, hình hoặc trục số tùy tình huống.', 'Đặt 1/2, 2/4, 3/4 trên trục số và giải thích quan hệ.', ['Nhận phân số tương đương đơn giản', 'So sánh bằng mô hình', 'Không nhầm tử và mẫu']),
    area: blueprint('area', 'math', 'Diện tích là số đơn vị vuông phủ kín bề mặt.', 'Tách hình phức thành hình quen thuộc trước khi tính.', 'Tính diện tích mặt bàn bằng lưới ô vuông tưởng tượng.', ['Dùng đơn vị vuông', 'Không nhầm với chu vi', 'Tách hình để tính']),
    large_numbers: blueprint('large_numbers', 'math', 'Số lớn được đọc theo nhóm hàng và giá trị vị trí.', 'Tập đọc cụm nghìn/triệu như cấu trúc, không đọc từng chữ số.', 'So sánh hai số lớn và nói hàng đầu tiên khác nhau.', ['Đọc viết số lớn', 'So sánh theo hàng', 'Tách nhóm chữ số']),
    mass: blueprint('mass', 'math', 'Khối lượng cần đơn vị và ước lượng hợp lý.', 'Không chỉ đổi đơn vị; phải biết vật nào nặng nhẹ trong đời sống.', 'Ước lượng 5 vật trong nhà theo gam/kg rồi kiểm tra nếu có cân.', ['Chọn đơn vị phù hợp', 'Đổi đơn vị cơ bản', 'Ước lượng có lý']),
    decimals: blueprint('decimals', 'math', 'Số thập phân mở rộng hệ cơ số 10 sang phần nhỏ hơn 1.', 'Liên hệ phần mười/phần trăm với tiền, đo lường và trục số.', 'Đặt 0,25; 0,5; 0,75 trên một đoạn thẳng.', ['Đọc viết số thập phân', 'So sánh theo hàng', 'Liên hệ phân số đơn giản']),
    percent: blueprint('percent', 'math', 'Phần trăm là cách nói "trên 100".', 'Dùng phần trăm để so sánh tỉ lệ, không chỉ tính máy móc.', 'Tìm 25%, 50%, 75% của một hình hoặc số lượng đồ vật.', ['Hiểu phần trên 100', 'Tính phần trăm đơn giản', 'Giải thích bằng hình hoặc tỉ lệ']),
    ratio: blueprint('ratio', 'math', 'Tỉ số so sánh hai lượng theo quan hệ nhân.', 'Tập giữ cùng quan hệ khi phóng to/thu nhỏ.', 'Pha một công thức nước chanh theo tỉ số rồi tăng gấp đôi.', ['Nêu quan hệ a:b', 'Tạo tỉ số tương đương', 'Không nhầm với hiệu']),
    charts: blueprint('charts', 'math', 'Biểu đồ biến dữ liệu thành bằng chứng để kết luận.', 'Đọc trục, đơn vị, mức cao/thấp trước khi kể câu chuyện.', 'Thu thập dữ liệu nhỏ trong nhà và chọn dạng biểu đồ phù hợp.', ['Đọc nhãn/trục', 'So sánh dữ liệu', 'Nêu kết luận có bằng chứng']),

    alphabet: blueprint('alphabet', 'vietnamese', 'Chữ cái là ký hiệu âm thanh và nền của đọc viết.', 'Tập phân biệt tên chữ, âm đọc và ví dụ trong từ.', 'Chọn 5 chữ cái, tìm mỗi chữ 2 từ và đọc thành tiếng.', ['Nhận mặt chữ', 'Nói âm/chữ trong từ', 'Không nhầm chữ gần giống']),
    tones: blueprint('tones', 'vietnamese', 'Dấu thanh làm đổi nghĩa tiếng Việt.', 'Nghe - đọc - viết cùng một âm với các thanh khác nhau.', 'Tạo một bảng nhỏ: ma, má, mà, mã, mả, mạ và nêu nghĩa nếu biết.', ['Đọc đúng thanh', 'Đặt dấu đúng vị trí', 'Nhận ra đổi thanh đổi nghĩa']),
    vocabulary: blueprint('vocabulary', 'vietnamese', 'Từ vựng mạnh khi biết nghĩa, ngữ cảnh và sắc thái.', 'Không học danh sách rời; phải dùng từ trong câu.', 'Chọn một từ mới và viết 3 câu ở 3 ngữ cảnh khác nhau.', ['Giải thích nghĩa bằng lời mình', 'Dùng từ trong câu', 'Phân biệt từ gần nghĩa']),
    reading: blueprint('reading', 'vietnamese', 'Đọc hiểu là tìm ý và bằng chứng trong văn bản.', 'Trả lời dựa vào câu/đoạn, không dựa vào đoán ngoài văn bản.', 'Đọc một đoạn ngắn rồi đặt 2 câu hỏi: một câu chi tiết, một câu suy luận.', ['Tìm chi tiết', 'Nêu ý chính', 'Trả lời bằng câu trọn ý']),
    grammar: blueprint('grammar', 'vietnamese', 'Ngữ pháp giúp câu rõ chủ thể, hành động và ý nghĩa.', 'Tập nhìn chức năng của từ trong câu, không chỉ gọi tên.', 'Sửa một câu thiếu chủ ngữ/vị ngữ và giải thích vì sao rõ hơn.', ['Nhận thành phần câu', 'Dùng dấu câu hợp lý', 'Viết câu rõ nghĩa']),
    writing_g4: blueprint('writing_g4', 'vietnamese', 'Bài văn tả cần quan sát, chọn chi tiết và sắp xếp thành bố cục rõ.', 'Tập viết như người quan sát có chủ đích: mở bài giới thiệu, thân bài chọn chi tiết, kết bài nêu cảm xúc.', 'Quan sát một đồ vật trong nhà, ghi 5 chi tiết rồi viết đoạn tả có ít nhất một so sánh.', ['Có đủ mở - thân - kết', 'Dùng chi tiết quan sát cụ thể', 'Tự sửa câu thiếu ý hoặc lặp từ']),
    writing_g5: blueprint('writing_g5', 'vietnamese', 'Viết nghị luận đơn giản là nêu ý kiến, lý do và dẫn chứng.', 'Tập bảo vệ quan điểm bằng bằng chứng gần đời sống thay vì chỉ nói thích hay không thích.', 'Viết 5 câu thuyết phục bạn đọc sách mỗi ngày, có 1 ý kiến, 2 lý do và 1 ví dụ.', ['Nêu ý kiến rõ', 'Có lý do và dẫn chứng', 'Không nhầm nghị luận với kể chuyện']),

    vocab_en: blueprint('vocab_en', 'english', 'Từ tiếng Anh cần gắn ảnh, âm, nghĩa và câu.', 'Học ít từ nhưng dùng được trong tình huống thật.', 'Chọn 5 từ và nói mỗi từ trong một câu về gia đình hoặc trường học.', ['Nhận từ qua ảnh/ngữ cảnh', 'Nói nghĩa tiếng Việt', 'Đặt câu ngắn đúng ý']),
    grammar_en: blueprint('grammar_en', 'english', 'Ngữ pháp tiếng Anh là mẫu để truyền ý rõ.', 'Ưu tiên mẫu câu dùng được hơn học tên thuật ngữ.', 'Đổi một câu khẳng định thành phủ định và câu hỏi.', ['Chọn mẫu câu đúng', 'Không nhầm chủ ngữ - động từ', 'Dùng trong câu mới']),
    reading_en: blueprint('reading_en', 'english', 'Đọc tiếng Anh cần giải mã từ và hiểu ý câu.', 'Tập tìm clue trong câu thay vì dịch từng chữ.', 'Đọc một đoạn ngắn, gạch từ khóa và nói ý chính bằng tiếng Việt.', ['Tìm ý chính', 'Tìm chi tiết', 'Suy nghĩa từ theo ngữ cảnh']),
    sentence_en: blueprint('sentence_en', 'english', 'Câu hoàn chỉnh cần chủ ngữ, động từ và ý rõ.', 'Tập xây câu như lắp khung, rồi thay từ để tạo câu mới.', 'Viết 3 câu cùng mẫu nhưng đổi người, vật và nơi chốn.', ['Sắp xếp từ đúng', 'Viết câu có nghĩa', 'Tự thay thành câu mới']),

    body_health: blueprint('body_health', 'science', 'Cơ thể là hệ thống các cơ quan phối hợp để sống khỏe.', 'Nhìn chức năng và hành vi sức khỏe, không chỉ nhớ tên bộ phận.', 'Chọn một thói quen tốt và giải thích cơ quan nào được bảo vệ.', ['Nêu chức năng cơ quan', 'Chọn hành vi an toàn', 'Giải thích bằng nguyên nhân']),
    nature: blueprint('nature', 'science', 'Sinh vật có cấu trúc, nhu cầu sống và quan hệ với môi trường.', 'Quan sát đặc điểm trước khi phân loại.', 'Quan sát một cây hoặc con vật và ghi 3 bằng chứng về cách nó sống.', ['Phân loại cơ bản', 'Nêu nhu cầu sống', 'Dùng bằng chứng quan sát']),
    weather_earth: blueprint('weather_earth', 'science', 'Thời tiết và Trái Đất thay đổi theo mẫu có thể quan sát.', 'Dự đoán cần dựa trên dấu hiệu, không đoán cảm tính.', 'Theo dõi thời tiết 3 ngày và nói mẫu thay đổi.', ['Mô tả hiện tượng', 'Dự đoán có lý do', 'Liên hệ vòng tuần hoàn/địa hình']),
    matter_energy: blueprint('matter_energy', 'science', 'Vật chất và năng lượng có tính chất, biến đổi và bảo toàn theo cách quan sát được.', 'Tập hỏi: cái gì thay đổi, cái gì giữ nguyên?', 'So sánh nước đá, nước lỏng và hơi nước bằng tiêu chí quan sát.', ['Nêu tính chất vật chất', 'Nhận biến đổi', 'Giải thích bằng bằng chứng']),
    ecosystem: blueprint('ecosystem', 'science', 'Hệ sinh thái là mạng quan hệ giữa sinh vật và môi trường.', 'Tập nghĩ theo chuỗi nguyên nhân - hệ quả.', 'Vẽ một chuỗi thức ăn đơn giản và hỏi điều gì xảy ra nếu mất một mắt xích.', ['Nêu quan hệ sinh vật - môi trường', 'Dự đoán hệ quả', 'Đề xuất hành vi bảo vệ môi trường']),

    history_g4: blueprint('history_g4', 'hisgeo', 'Lịch sử là mối liên hệ giữa nhân vật, sự kiện, thời gian và hệ quả.', 'Không chỉ nhớ tên; cần hỏi điều gì thay đổi sau sự kiện.', 'Vẽ một dòng thời gian 3 mốc và nêu ý nghĩa của từng mốc.', ['Gắn nhân vật với sự kiện', 'Sắp xếp mốc thời gian', 'Nêu ý nghĩa hoặc hệ quả']),
    geography: blueprint('geography', 'hisgeo', 'Địa lý giúp hiểu nơi chốn qua vị trí, tự nhiên, con người và kinh tế.', 'Đọc bản đồ như đọc bằng chứng.', 'Chọn một vùng Việt Nam và nêu vị trí, đặc điểm tự nhiên, hoạt động con người.', ['Xác định địa danh/vùng', 'Nêu đặc điểm chính', 'Liên hệ đời sống']),

    hardware: blueprint('hardware', 'computing', 'Máy tính là hệ thống phần cứng, phần mềm và dữ liệu phối hợp.', 'Tập phân biệt thiết bị nhập, xử lý, lưu trữ và xuất.', 'Vẽ sơ đồ một máy tính và đánh dấu đường đi của dữ liệu.', ['Nhận biết bộ phận', 'Nêu chức năng', 'Không nhầm phần cứng với phần mềm']),
    cyber_safety: blueprint('cyber_safety', 'computing', 'An toàn mạng là ra quyết định đúng khi gặp thông tin, người lạ và rủi ro.', 'Tập hỏi: thông tin này có riêng tư không, ai được phép biết?', 'Phân loại 10 loại thông tin thành được chia sẻ/không chia sẻ/cần hỏi người lớn.', ['Nhận thông tin cá nhân', 'Chọn hành động an toàn', 'Biết hỏi người lớn khi nghi ngờ']),
    comp_logic: blueprint('comp_logic', 'computing', 'Thuật toán là chuỗi bước rõ ràng có thể thử và sửa.', 'Tập debug như nhà thiết kế: thử từng bước, tìm điểm sai, sửa nhỏ.', 'Viết thuật toán đánh răng hoặc pha sữa rồi thêm một điều kiện "nếu... thì...".', ['Sắp xếp bước đúng', 'Nhận lặp/điều kiện', 'Debug bằng kiểm thử từng bước']),

    polite_greet: blueprint('polite_greet', 'ethics', 'Lễ phép bắt đầu từ nhận biết người đối diện và chọn cách chào phù hợp.', 'Tập hành xử có chủ đích: lời nói, nét mặt và thái độ đều cần tôn trọng.', 'Đóng vai 3 tình huống chào ông bà, thầy cô và bạn cùng lớp; nói khác nhau ở điểm nào.', ['Chọn cách chào phù hợp', 'Nói được lý do tôn trọng', 'Không chào trống không với người lớn']),
    express_emotion: blueprint('express_emotion', 'ethics', 'Cảm xúc cần được gọi tên và thể hiện theo cách không làm tổn thương người khác.', 'Tập tạm dừng, gọi tên cảm xúc, chọn hành động an toàn rồi mới phản ứng.', 'Kể một lần con tức giận, ghi 2 cách xử lý và chọn cách ít gây hại hơn.', ['Gọi tên cảm xúc', 'Chọn hành vi tự điều chỉnh', 'Biết tìm người lớn khi cần']),
    honesty: blueprint('honesty', 'ethics', 'Trung thực là nói và làm đúng sự thật kể cả khi có thể bị thiệt trước mắt.', 'Tập nhìn hệ quả lâu dài của niềm tin, không chỉ tránh bị phạt.', 'Viết một tình huống nhặt được đồ của bạn và nêu 2 lý do cần trả lại.', ['Nhận diện hành vi nói dối/gian lận', 'Chọn cách nhận lỗi hoặc trả lại', 'Giải thích được hệ quả với niềm tin']),
    responsibility: blueprint('responsibility', 'ethics', 'Trách nhiệm là giữ lời hứa, hoàn thành phần việc và quan tâm tác động đến nhóm.', 'Tập nghĩ như thành viên đáng tin cậy: việc của mình, việc của nhóm và hậu quả nếu bỏ dở.', 'Lập checklist 3 việc con hứa làm trong tuần và tự đánh dấu hoàn thành.', ['Nêu nhiệm vụ của mình', 'Chọn hành động giữ lời hứa', 'Biết sửa khi chưa hoàn thành']),
    community_empathy: blueprint('community_empathy', 'ethics', 'Đồng cảm cộng đồng là nhìn thấy nhu cầu của người khác và giúp trong khả năng.', 'Tập đặt mình vào vị trí người yếu thế rồi chọn hành động nhỏ nhưng thật.', 'Chọn một việc tử tế trong lớp, dự đoán người nhận sẽ cảm thấy thế nào và làm thử.', ['Nhận ra cảm xúc/nhu cầu của người khác', 'Chọn cách giúp phù hợp', 'Không giúp theo kiểu làm người khác xấu hổ']),

    basic_colors: blueprint('basic_colors', 'art', 'Màu sắc là ngôn ngữ để nhận biết, pha trộn và biểu đạt cảm xúc.', 'Tập quan sát màu như lựa chọn có ý nghĩa, không chỉ tô cho kín.', 'Pha hoặc chọn 3 cặp màu để tạo cảm giác vui, yên tĩnh và nổi bật.', ['Nhận biết màu cơ bản', 'Dự đoán màu pha đơn giản', 'Nói được cảm giác màu tạo ra']),
    music_rhythm: blueprint('music_rhythm', 'art', 'Nhịp điệu là mẫu lặp giúp cơ thể cảm được âm nhạc.', 'Tập nghe, vỗ, nói lại nhịp rồi liên hệ với chuyển động.', 'Vỗ tay theo một bài hát thiếu nhi, đổi nhanh/chậm và mô tả cảm giác thay đổi.', ['Giữ được nhịp đơn giản', 'Phân biệt nhanh/chậm', 'Nói được phách mạnh nhẹ cơ bản']),
    shapes_drawing: blueprint('shapes_drawing', 'art', 'Đường nét và hình khối giúp biến quan sát thành bố cục nhìn thấy được.', 'Tập nhìn tác phẩm theo nét, hình, vị trí và cảm giác trước khi đánh giá đẹp/xấu.', 'Vẽ một góc bàn học bằng ít nhất 3 loại đường nét và giải thích nét nào tạo cảm giác chính.', ['Nhận diện đường nét/hình khối', 'Dùng nét để biểu đạt', 'Biết nói về bố cục đơn giản']),
    music_instruments: blueprint('music_instruments', 'art', 'Nhạc cụ tạo âm thanh bằng dây, hơi, gõ hoặc rung theo cách khác nhau.', 'Tập nghe và phân loại nhạc cụ bằng cách tạo âm thanh, không chỉ nhớ tên.', 'Chọn 3 nhạc cụ Việt Nam, phân loại dây/hơi/gõ và mô tả âm sắc của một nhạc cụ.', ['Nhận biết nhạc cụ Việt Nam', 'Phân loại theo cách phát âm', 'Không nhầm nhạc cụ truyền thống và phương Tây']),
    art_appreciation: blueprint('art_appreciation', 'art', 'Cảm thụ nghệ thuật là quan sát, cảm nhận và nêu lý do cho cảm nhận.', 'Tập nói về tác phẩm bằng bằng chứng: màu, bố cục, giai điệu, nhịp và cảm xúc.', 'Chọn một bức tranh hoặc bài hát, nêu 3 chi tiết làm con thích hoặc chưa thích.', ['Nêu cảm nhận có lý do', 'Dẫn chứng bằng màu/âm thanh/bố cục', 'Tôn trọng nhiều cách cảm thụ khác nhau']),
};

const DEFAULT_TOPIC_BLUEPRINT = blueprint(
    'default',
    'math',
    'Bài học cần có mục tiêu rõ, chiến lược rõ và bằng chứng thành thạo.',
    'Học như một người biết tự kiểm tra: hiểu đề, chọn chiến lược, làm, kiểm tra, chuyển giao.',
    'Tự tạo một bài cùng dạng và giải thích cho người lớn nghe.',
    ['Làm đúng', 'Giải thích được', 'Áp dụng sang tình huống mới'],
);

export function getLessonModeConfig(mode: LessonDepth): LessonModeConfig {
    return LESSON_MODE_CONFIG[mode];
}

export function getSubjectGoldStandards(subject: LearningSubjectKey): StandardAlignment[] {
    return STANDARD_BY_SUBJECT[subject];
}

export function getSubjectBenchmarkPatterns(subject: LearningSubjectKey): BenchmarkPattern[] {
    return BENCHMARK_BY_SUBJECT[subject];
}

export function getTopicLearningBlueprint(topicKey: string, fallbackSubject: LearningSubjectKey = 'math'): TopicLearningBlueprint {
    const explicit = TOPIC_LEARNING_BLUEPRINTS[topicKey];
    if (explicit) return explicit;
    return {
        ...DEFAULT_TOPIC_BLUEPRINT,
        topicKey,
        subject: fallbackSubject,
        goldStandards: STANDARD_BY_SUBJECT[fallbackSubject],
        benchmarkPatterns: BENCHMARK_BY_SUBJECT[fallbackSubject],
        practiceDesign: PRACTICE_BY_SUBJECT[fallbackSubject],
        studyRoutine: ROUTINE_BY_SUBJECT[fallbackSubject],
        parentCoaching: PARENT_BY_SUBJECT[fallbackSubject],
    };
}

export const LEARNING_SYSTEM_STATS = {
    modeCount: Object.keys(LESSON_MODE_CONFIG).length,
    explicitTopicBlueprints: Object.keys(TOPIC_LEARNING_BLUEPRINTS).length,
    goldStandardLinks: Object.values(STANDARD_BY_SUBJECT).reduce((sum, items) => sum + items.length, 0),
    benchmarkLinks: Object.values(BENCHMARK_BY_SUBJECT).reduce((sum, items) => sum + items.length, 0),
};
