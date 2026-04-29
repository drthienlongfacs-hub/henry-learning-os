import type { ResourceAttribution } from '@/types/resource-types';

export type LearningSubjectKey =
    | 'math'
    | 'vietnamese'
    | 'english'
    | 'science'
    | 'hisgeo'
    | 'computing'
    | 'elite';

export type SourceId =
    | 'moet-ctgdpt-2018'
    | 'common-core-math'
    | 'cambridge-primary-math'
    | 'aero-spacing-retrieval'
    | 'eef-feedback'
    | 'eef-metacognition'
    | 'unicef-ai-children'
    | 'aap-family-media'
    | 'open-library'
    | 'gutendex'
    | 'wikimedia-commons'
    | 'openverse'
    | 'scratch'
    | 'code-org'
    | 'code-org-ai'
    | 'ngss-three-dimensional'
    | 'csta-k12-standards'
    | 'national-reading-panel'
    | 'ies-foundational-reading'
    | 'casel-framework'
    | 'khan-academy-kids'
    | 'khan-academy-mastery'
    | 'ixl-diagnostic'
    | 'beast-academy'
    | 'duolingo-abc';

export interface LearningSource {
    id: SourceId;
    title: string;
    provider: string;
    kind: 'official' | 'benchmark' | 'open_resource' | 'safety' | 'research';
    sourceUrl: string;
    license?: string;
    licenseUrl?: string;
    useInApp: string;
    retrievedAt: string;
}

export interface SupportStep {
    level: 'L0' | 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
    title: string;
    action: string;
}

export interface TopicEnrichment {
    topicKey: string;
    subject: LearningSubjectKey;
    gradeLevel: number;
    coverageBand: string;
    visual: {
        src: string;
        alt: string;
        creditSourceId?: SourceId;
    };
    masteryTargets: string[];
    benchmarkTags: string[];
    lessonMoves: string[];
    supportLadder: SupportStep[];
    antiBoredom: string[];
    transferPrompt: string;
    parentMission: string;
    commonPitfalls: string[];
    sourceIds: SourceId[];
}

export interface SubjectEnrichment {
    subject: LearningSubjectKey;
    label: string;
    headline: string;
    coverage: string;
    defaultVisual: string;
    sourceIds: SourceId[];
    benchmarkPattern: string[];
    sessionRhythm: string[];
}

const RETRIEVED_AT = '2026-04-29T00:00:00.000Z';

export const LEARNING_SOURCES: Record<SourceId, LearningSource> = {
    'moet-ctgdpt-2018': {
        id: 'moet-ctgdpt-2018',
        title: 'Chương trình giáo dục phổ thông 2018',
        provider: 'Bộ Giáo dục và Đào tạo Việt Nam',
        kind: 'official',
        sourceUrl: 'https://moet.gov.vn/Pages/tim-kiem.aspx?ItemID=5755',
        useInApp: 'Chuẩn đầu ra Việt Nam cho môn học tiểu học và mạch năng lực.',
        retrievedAt: RETRIEVED_AT,
    },
    'common-core-math': {
        id: 'common-core-math',
        title: 'Common Core State Standards for Mathematics',
        provider: 'Common Core State Standards Initiative',
        kind: 'official',
        sourceUrl: 'https://www.thecorestandards.org/Math/',
        useInApp: 'Đối chiếu mạch số học, cơ số 10, đo lường, dữ liệu và hình học.',
        retrievedAt: RETRIEVED_AT,
    },
    'cambridge-primary-math': {
        id: 'cambridge-primary-math',
        title: 'Cambridge Primary Mathematics',
        provider: 'Cambridge International Education',
        kind: 'official',
        sourceUrl: 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/mathematics/',
        useInApp: 'Bổ sung thinking and working mathematically: trình bày, lý luận, kiểm tra.',
        retrievedAt: RETRIEVED_AT,
    },
    'aero-spacing-retrieval': {
        id: 'aero-spacing-retrieval',
        title: 'Spacing and retrieval practice guide',
        provider: 'Australian Education Research Organisation',
        kind: 'research',
        sourceUrl: 'https://www.edresearch.edu.au/guides-resources/practice-guides/spacing-and-retrieval-practice-guide-full-publication',
        useInApp: 'Tạo nhịp ôn xen kẽ, nhớ lại trước khi xem đáp án.',
        retrievedAt: RETRIEVED_AT,
    },
    'eef-feedback': {
        id: 'eef-feedback',
        title: 'Teaching and Learning Toolkit: Feedback',
        provider: 'Education Endowment Foundation',
        kind: 'research',
        sourceUrl: 'https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/feedback',
        useInApp: 'Phản hồi tập trung vào bước tiếp theo, không chỉ báo đúng/sai.',
        retrievedAt: RETRIEVED_AT,
    },
    'eef-metacognition': {
        id: 'eef-metacognition',
        title: 'Metacognition and self-regulated learning',
        provider: 'Education Endowment Foundation',
        kind: 'research',
        sourceUrl: 'https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/metacognition',
        useInApp: 'Gợi ý cho con tự nói chiến lược, tự kiểm tra và dạy lại.',
        retrievedAt: RETRIEVED_AT,
    },
    'unicef-ai-children': {
        id: 'unicef-ai-children',
        title: 'Policy guidance on AI for children',
        provider: 'UNICEF Innocenti',
        kind: 'safety',
        sourceUrl: 'https://www.unicef.org/innocenti/reports/policy-guidance-ai-children',
        useInApp: 'Giữ chế độ trẻ em: không chat tự do, không thu thập dữ liệu cá nhân không cần thiết.',
        retrievedAt: RETRIEVED_AT,
    },
    'aap-family-media': {
        id: 'aap-family-media',
        title: 'Family Media Plan',
        provider: 'American Academy of Pediatrics',
        kind: 'safety',
        sourceUrl: 'https://www.healthychildren.org/English/fmp/Pages/MediaPlan.aspx',
        useInApp: 'Giới hạn phiên học ngắn, có nghỉ vận động và nhiệm vụ học cùng phụ huynh.',
        retrievedAt: RETRIEVED_AT,
    },
    'open-library': {
        id: 'open-library',
        title: 'Open Library Search API',
        provider: 'Internet Archive / Open Library',
        kind: 'open_resource',
        sourceUrl: 'https://openlibrary.org/dev/docs/api/search',
        license: 'metadata API',
        useInApp: 'Tìm sách và ảnh bìa, chỉ lưu metadata và đường dẫn.',
        retrievedAt: RETRIEVED_AT,
    },
    gutendex: {
        id: 'gutendex',
        title: 'Gutendex Project Gutenberg API',
        provider: 'Gutendex',
        kind: 'open_resource',
        sourceUrl: 'https://gutendex.com/',
        license: 'public-domain metadata/content varies by work',
        useInApp: 'Nguồn sách tiếng Anh phạm vi công cộng, cần lọc tuổi và văn hóa.',
        retrievedAt: RETRIEVED_AT,
    },
    'wikimedia-commons': {
        id: 'wikimedia-commons',
        title: 'Wikimedia Commons',
        provider: 'Wikimedia Foundation',
        kind: 'open_resource',
        sourceUrl: 'https://commons.wikimedia.org/',
        license: 'CC / public domain varies by file',
        useInApp: 'Ảnh minh họa địa lý, khoa học, lịch sử với attribution theo từng file.',
        retrievedAt: RETRIEVED_AT,
    },
    openverse: {
        id: 'openverse',
        title: 'Openverse API',
        provider: 'WordPress Foundation',
        kind: 'open_resource',
        sourceUrl: 'https://api.openverse.org/',
        license: 'CC / public domain index',
        useInApp: 'Tìm ảnh/audio mở, không đưa nội dung chưa kiểm duyệt thẳng cho trẻ.',
        retrievedAt: RETRIEVED_AT,
    },
    scratch: {
        id: 'scratch',
        title: 'Scratch',
        provider: 'MIT Media Lab',
        kind: 'benchmark',
        sourceUrl: 'https://scratch.mit.edu/',
        useInApp: 'Benchmark cho tư duy sáng tạo, câu chuyện, logic khối và debug.',
        retrievedAt: RETRIEVED_AT,
    },
    'code-org': {
        id: 'code-org',
        title: 'Code.org Curriculum',
        provider: 'Code.org',
        kind: 'benchmark',
        sourceUrl: 'https://code.org/',
        useInApp: 'Benchmark cho lộ trình khoa học máy tính K-12 có hoạt động ngắn.',
        retrievedAt: RETRIEVED_AT,
    },
    'code-org-ai': {
        id: 'code-org-ai',
        title: 'AI Literacy resources',
        provider: 'Code.org',
        kind: 'benchmark',
        sourceUrl: 'https://code.org/ai',
        useInApp: 'Gợi ý hoạt động hiểu AI ở mức an toàn, không biến trẻ thành người dùng chat tự do.',
        retrievedAt: RETRIEVED_AT,
    },
    'ngss-three-dimensional': {
        id: 'ngss-three-dimensional',
        title: 'Three Dimensional Learning',
        provider: 'Next Generation Science Standards',
        kind: 'official',
        sourceUrl: 'https://www.nextgenscience.org/three-dimensional-learning',
        useInApp: 'Khoa học phải có thực hành, ý tưởng cốt lõi và khái niệm xuyên suốt, không chỉ học thuộc.',
        retrievedAt: RETRIEVED_AT,
    },
    'csta-k12-standards': {
        id: 'csta-k12-standards',
        title: 'K-12 Computer Science Standards',
        provider: 'Computer Science Teachers Association',
        kind: 'official',
        sourceUrl: 'https://csteachers.org/k12standards/',
        useInApp: 'Chuẩn hóa tư duy máy tính: thuật toán, dữ liệu, hệ thống, an toàn và tác động xã hội.',
        retrievedAt: RETRIEVED_AT,
    },
    'national-reading-panel': {
        id: 'national-reading-panel',
        title: 'Report of the National Reading Panel',
        provider: 'NICHD / National Institutes of Health',
        kind: 'research',
        sourceUrl: 'https://www.nichd.nih.gov/publications/pubs/nrp/Pages/findings.aspx',
        useInApp: 'Đối chiếu 5 trụ cột đọc: âm vị, ngữ âm, lưu loát, từ vựng, đọc hiểu.',
        retrievedAt: RETRIEVED_AT,
    },
    'ies-foundational-reading': {
        id: 'ies-foundational-reading',
        title: 'Foundational Skills to Support Reading for Understanding in Kindergarten Through 3rd Grade',
        provider: 'Institute of Education Sciences / What Works Clearinghouse',
        kind: 'research',
        sourceUrl: 'https://ies.ed.gov/ncee/wwc/PracticeGuide/21',
        useInApp: 'Dùng cho đọc nền tảng: ngôn ngữ học thuật, âm chữ, giải mã, đọc văn bản mỗi ngày.',
        retrievedAt: RETRIEVED_AT,
    },
    'casel-framework': {
        id: 'casel-framework',
        title: 'CASEL Framework',
        provider: 'Collaborative for Academic, Social, and Emotional Learning',
        kind: 'research',
        sourceUrl: 'https://casel.org/fundamentals-of-sel/what-is-the-casel-framework/',
        useInApp: 'Lồng tự nhận thức, tự quản, quan hệ và ra quyết định có trách nhiệm vào học thuật.',
        retrievedAt: RETRIEVED_AT,
    },
    'khan-academy-kids': {
        id: 'khan-academy-kids',
        title: 'Khan Academy Kids Learning Path',
        provider: 'Khan Academy Kids',
        kind: 'benchmark',
        sourceUrl: 'https://khankids.zendesk.com/hc/en-us/articles/360048828572-Learn-more-about-the-Learning-Path',
        useInApp: 'Benchmark cho learning path cá nhân hóa, dựa trên thành thạo và luyện thêm khi cần.',
        retrievedAt: RETRIEVED_AT,
    },
    'khan-academy-mastery': {
        id: 'khan-academy-mastery',
        title: 'Mastery learning on Khan Academy',
        provider: 'Khan Academy',
        kind: 'benchmark',
        sourceUrl: 'https://support.khanacademy.org/hc/en-us/articles/360007253831-Using-self-paced-practice-and-Mastery-in-the-classroom',
        useInApp: 'Benchmark cho luyện tập theo mastery: đúng kỹ năng, phản hồi nhanh, có cơ hội lên mức.',
        retrievedAt: RETRIEVED_AT,
    },
    'ixl-diagnostic': {
        id: 'ixl-diagnostic',
        title: 'IXL Real-Time Diagnostic',
        provider: 'IXL Learning',
        kind: 'benchmark',
        sourceUrl: 'https://www.ixl.com/diagnostic',
        useInApp: 'Benchmark cho chẩn đoán năng lực theo mạch và đề xuất kỹ năng sẵn sàng học tiếp.',
        retrievedAt: RETRIEVED_AT,
    },
    'beast-academy': {
        id: 'beast-academy',
        title: 'Beast Academy Advanced Math Curriculum',
        provider: 'Art of Problem Solving',
        kind: 'benchmark',
        sourceUrl: 'https://beastacademy.com/',
        useInApp: 'Benchmark cho trẻ tư duy mạnh: bài toán ít nhưng sâu, yêu cầu giải thích và chiến lược.',
        retrievedAt: RETRIEVED_AT,
    },
    'duolingo-abc': {
        id: 'duolingo-abc',
        title: 'Duolingo ABC',
        provider: 'Duolingo',
        kind: 'benchmark',
        sourceUrl: 'https://play.google.com/store/apps/details?id=com.duolingo.literacy&hl=en_US',
        useInApp: 'Benchmark cho micro-lesson đọc tiếng Anh: ngắn, lặp có chủ đích, chữ-âm-từ-câu.',
        retrievedAt: RETRIEVED_AT,
    },
};

export const SUBJECT_ENRICHMENT: Record<LearningSubjectKey, SubjectEnrichment> = {
    math: {
        subject: 'math',
        label: 'Toán',
        headline: 'Từ đồ vật -> hình ảnh -> phép tính -> lời giải thích.',
        coverage: 'Lớp 1-5: số học, cơ số 10, đo lường, hình học, phân số, dữ liệu, tỉ số.',
        defaultVisual: '/images/math/number_bonds.svg',
        sourceIds: ['moet-ctgdpt-2018', 'common-core-math', 'cambridge-primary-math', 'khan-academy-mastery', 'ixl-diagnostic', 'beast-academy', 'aero-spacing-retrieval', 'eef-feedback'],
        benchmarkPattern: ['Khan Academy mastery', 'IXL diagnostic path', 'Beast Academy depth', 'Cambridge reasoning'],
        sessionRhythm: ['Nhớ lại 1 câu cũ', 'Làm với hình hoặc đồ vật', 'Giải thích bằng lời', 'Đổi sang tình huống đời sống'],
    },
    vietnamese: {
        subject: 'vietnamese',
        label: 'Tiếng Việt',
        headline: 'Đọc đúng, hiểu ý, dùng từ, kể lại bằng lời của con.',
        coverage: 'Âm chữ, dấu thanh, từ vựng, đọc hiểu, ngữ pháp, viết câu.',
        defaultVisual: '/images/core/books_hd.svg',
        sourceIds: ['moet-ctgdpt-2018', 'national-reading-panel', 'ies-foundational-reading', 'open-library', 'aero-spacing-retrieval', 'eef-metacognition'],
        benchmarkPattern: ['Science of reading', 'Evidence-based comprehension', 'Vocabulary depth'],
        sessionRhythm: ['Đọc ngắn', 'Tìm chi tiết trong câu', 'Nói nghĩa bằng lời con', 'Viết hoặc kể lại 1 câu'],
    },
    english: {
        subject: 'english',
        label: 'Tiếng Anh',
        headline: 'Nghe - nhìn - nói - dùng trong câu, không học từ rời rạc.',
        coverage: 'Từ vựng chủ đề, ngữ pháp, đọc hiểu, câu giao tiếp, chuyển dịch Việt - Anh.',
        defaultVisual: '/images/english/Pink_lady_and_cross_section.jpg',
        sourceIds: ['moet-ctgdpt-2018', 'national-reading-panel', 'ies-foundational-reading', 'duolingo-abc', 'gutendex', 'open-library', 'eef-feedback'],
        benchmarkPattern: ['CEFR-like can-do', 'Duolingo ABC micro-lesson', 'Roleplay'],
        sessionRhythm: ['Nhìn ảnh', 'Nói từ', 'Đặt câu', 'Dùng vào tình huống gia đình'],
    },
    science: {
        subject: 'science',
        label: 'Khoa học',
        headline: 'Quan sát, dự đoán, kiểm tra, giải thích bằng bằng chứng.',
        coverage: 'Cơ thể, sức khỏe, thực vật, động vật, thời tiết, Trái Đất, vật chất, môi trường.',
        defaultVisual: '/images/science/USGS_WaterCycle_English_ONLINE_20221013.png',
        sourceIds: ['moet-ctgdpt-2018', 'ngss-three-dimensional', 'wikimedia-commons', 'openverse', 'eef-metacognition'],
        benchmarkPattern: ['NGSS 3D learning', 'Claim-Evidence-Reasoning', 'Hands-on science'],
        sessionRhythm: ['Quan sát ảnh', 'Dự đoán', 'Chọn bằng chứng', 'Nói điều sẽ thử ở nhà'],
    },
    hisgeo: {
        subject: 'hisgeo',
        label: 'Lịch sử & Địa lý',
        headline: 'Nhìn bản đồ, mốc thời gian, nhân vật và hệ quả.',
        coverage: 'Địa lý Việt Nam, mốc lịch sử, nơi chốn, biểu tượng, nguyên nhân - hệ quả.',
        defaultVisual: '/images/history-geo/Ha_Long_Bay_in_2019.jpg',
        sourceIds: ['moet-ctgdpt-2018', 'wikimedia-commons', 'openverse', 'eef-metacognition', 'casel-framework'],
        benchmarkPattern: ['C3 inquiry arc adapted for Vietnam', 'Map literacy', 'Timeline reasoning'],
        sessionRhythm: ['Xem ảnh/bản đồ', 'Xác định nơi hoặc thời gian', 'Nói vì sao quan trọng', 'Liên hệ đời sống'],
    },
    computing: {
        subject: 'computing',
        label: 'Tin học',
        headline: 'Tạo, thử, sai, sửa, kể lại thuật toán.',
        coverage: 'Phần cứng, thao tác cơ bản, an toàn mạng, tư duy thuật toán, dữ liệu và AI literacy.',
        defaultVisual: '/images/computing/Scratch_editor_screenshot.png',
        sourceIds: ['moet-ctgdpt-2018', 'csta-k12-standards', 'scratch', 'code-org', 'code-org-ai', 'unicef-ai-children', 'aap-family-media'],
        benchmarkPattern: ['CSTA standards', 'Scratch create-first', 'Code.org CS pathway', 'Child-safe AI literacy'],
        sessionRhythm: ['Nêu mục tiêu', 'Kéo/thử bằng mô phỏng', 'Debug', 'Nói quy tắc an toàn'],
    },
    elite: {
        subject: 'elite',
        label: 'Năng lực tinh hoa',
        headline: 'Ra quyết định, thương lượng, tự chủ và hiểu hệ thống.',
        coverage: 'Xác suất, tài chính, công dân, thương lượng, đạo đức, phục hồi cảm xúc.',
        defaultVisual: '/images/core/bar_chart.svg',
        sourceIds: ['eef-metacognition', 'casel-framework', 'unicef-ai-children', 'aap-family-media'],
        benchmarkPattern: ['CASEL reflection', 'Civics roleplay', 'Decision quality'],
        sessionRhythm: ['Chọn phương án', 'Giải thích góc nhìn', 'Tìm hệ quả', 'Nói cách sửa lần sau'],
    },
};

const SUBJECT_BY_TOPIC_PREFIX: Record<string, LearningSubjectKey> = {
    add: 'math',
    count: 'math',
    compare: 'math',
    number: 'math',
    shapes: 'math',
    ordinal: 'math',
    place: 'math',
    even: 'math',
    intro: 'math',
    clock: 'math',
    measure: 'math',
    word: 'math',
    mult: 'math',
    perimeter: 'math',
    patterns: 'math',
    fractions: 'math',
    area: 'math',
    large: 'math',
    mass: 'math',
    decimals: 'math',
    percent: 'math',
    ratio: 'math',
    charts: 'math',
    alphabet: 'vietnamese',
    tones: 'vietnamese',
    vocabulary: 'vietnamese',
    reading: 'vietnamese',
    grammar: 'vietnamese',
    vocab: 'english',
    grammar_en: 'english',
    reading_en: 'english',
    sentence_en: 'english',
    body: 'science',
    nature: 'science',
    weather: 'science',
    matter: 'science',
    ecosystem: 'science',
    history: 'hisgeo',
    geography: 'hisgeo',
    hardware: 'computing',
    cyber: 'computing',
    comp: 'computing',
};

const TOPIC_OVERRIDES: Record<string, Partial<TopicEnrichment>> = {
    add_sub_10: {
        visual: { src: '/images/math/addition_within_10.svg', alt: 'Khối màu minh họa cộng trừ trong phạm vi 10' },
        masteryTargets: ['Đếm thêm/đếm lùi trong 10', 'Nói được vì sao đáp án đúng', 'Tự kiểm tra bằng phép ngược'],
        commonPitfalls: ['Đếm thiếu một bước', 'Nhầm dấu cộng và dấu trừ', 'Chỉ nhớ đáp án mà không giải thích được'],
    },
    add_sub_20: {
        visual: { src: '/images/math/add_sub_20.svg', alt: 'Khung mười và phép tính qua 10' },
        masteryTargets: ['Tách số để làm tròn 10', 'Tính qua 10 mà không đoán mò', 'Giải bài toán lời văn một bước'],
        commonPitfalls: ['Không tách phần để đủ 10', 'Quên phần còn lại sau khi làm tròn 10'],
    },
    number_bonds: {
        visual: { src: '/images/math/number_bonds.svg', alt: 'Sơ đồ tách ghép số thành hai phần' },
        masteryTargets: ['Tách-gộp số 5, 10, 20', 'Nhìn một tổng và nêu hai phần', 'Dùng tách số để tính nhẩm'],
        commonPitfalls: ['Đếm lại từ đầu thay vì nhìn cấu trúc', 'Nhầm tổng và phần'],
    },
    place_value: {
        visual: { src: '/images/math/place_value.svg', alt: 'Que chục và khối đơn vị minh họa hàng chục hàng đơn vị' },
        masteryTargets: ['Đọc chục và đơn vị', 'So sánh số bằng hàng chục trước', 'Đổi giữa chữ số và mô hình que chục'],
        commonPitfalls: ['Đọc 34 là 3 và 4 rời rạc', 'So sánh hàng đơn vị trước hàng chục'],
    },
    shapes_3d: {
        visual: { src: '/images/math/shapes_3d.svg', alt: 'Các khối lập phương, trụ, cầu, nón' },
        masteryTargets: ['Phân biệt hình phẳng và khối', 'Nhận ra mặt cong/mặt phẳng', 'Liên hệ với đồ vật thật'],
    },
    reading: {
        visual: { src: '/images/core/books_hd.svg', alt: 'Cuốn sách mở và kính lúp tìm bằng chứng trong câu' },
        masteryTargets: ['Đọc đoạn ngắn', 'Tìm chi tiết trong văn bản', 'Trả lời bằng một câu trọn ý'],
        commonPitfalls: ['Trả lời theo trí nhớ ngoài đoạn văn', 'Bỏ qua từ khóa ai, ở đâu, khi nào'],
    },
    vocab_en: {
        visual: { src: '/images/english/Pink_lady_and_cross_section.jpg', alt: 'Ảnh thật minh họa từ vựng tiếng Anh' },
        masteryTargets: ['Nhìn ảnh nói từ tiếng Anh', 'Nói nghĩa tiếng Việt', 'Đặt một câu ngắn'],
        commonPitfalls: ['Học từ rời rạc không dùng vào câu', 'Dịch từng chữ khi đặt câu'],
    },
    body_health: {
        visual: { src: '/images/science/Lungs_diagram_detailed.svg.png', alt: 'Sơ đồ phổi và cơ thể người' },
        masteryTargets: ['Nêu chức năng cơ quan', 'Chọn hành vi sức khỏe đúng', 'Giải thích bằng lý do đơn giản'],
        commonPitfalls: ['Nhớ tên cơ quan nhưng không biết chức năng', 'Chọn hành vi theo thói quen thay vì an toàn'],
    },
    weather_earth: {
        visual: { src: '/images/science/USGS_WaterCycle_English_ONLINE_20221013.png', alt: 'Sơ đồ vòng tuần hoàn nước' },
        masteryTargets: ['Mô tả chu trình quan sát được', 'Dự đoán thay đổi thời tiết', 'Nói bằng chứng từ hình'],
    },
    history_g4: {
        visual: { src: '/images/history-geo/Tambour-song-da2.jpg', alt: 'Trống đồng Đông Sơn' },
        masteryTargets: ['Nhớ mốc chính', 'Gắn nhân vật với sự kiện', 'Nói được ý nghĩa của sự kiện'],
    },
    geography: {
        visual: { src: '/images/history-geo/Ha_Long_Bay_in_2019.jpg', alt: 'Vịnh Hạ Long, Việt Nam' },
        masteryTargets: ['Đọc địa danh trên bản đồ', 'Gắn vùng miền với đặc điểm', 'Nói liên hệ đời sống'],
    },
    cyber_safety: {
        visual: { src: '/images/computing/Internet_map_1024_-_transparent_inverted.png', alt: 'Bản đồ kết nối Internet' },
        masteryTargets: ['Nhận diện thông tin cá nhân', 'Biết hỏi người lớn trước khi tải/chia sẻ', 'Chọn hành động an toàn'],
        commonPitfalls: ['Tin người lạ vì lời hứa có thưởng', 'Nhầm mật khẩu với thông tin có thể chia sẻ'],
    },
    comp_logic: {
        visual: { src: '/images/computing/Scratch_editor_screenshot.png', alt: 'Giao diện Scratch dạng khối lệnh' },
        masteryTargets: ['Sắp xếp bước theo thứ tự', 'Nhận ra điều kiện và lặp', 'Debug bằng cách thử từng bước'],
    },
};

const imageBySubject: Record<LearningSubjectKey, string> = Object.fromEntries(
    Object.entries(SUBJECT_ENRICHMENT).map(([key, value]) => [key, value.defaultVisual]),
) as Record<LearningSubjectKey, string>;

function inferSubject(topicKey: string, fallback: LearningSubjectKey = 'math'): LearningSubjectKey {
    const normalized = topicKey.replace(/-/g, '_');
    const direct = SUBJECT_BY_TOPIC_PREFIX[normalized];
    if (direct) return direct;

    const prefix = normalized.split('_')[0];
    return SUBJECT_BY_TOPIC_PREFIX[prefix] ?? fallback;
}

function buildSupportLadder(subject: LearningSubjectKey, topicKey: string): SupportStep[] {
    const subjectLabel = SUBJECT_ENRICHMENT[subject].label;
    return [
        { level: 'L0', title: 'Tự làm', action: 'Con thử một lượt không gợi ý, nói nhỏ trong đầu chiến lược sẽ dùng.' },
        { level: 'L1', title: 'Nhắc hướng', action: `Nhìn lại hình minh họa của ${subjectLabel} và tìm từ khóa quan trọng trong câu hỏi.` },
        { level: 'L2', title: 'Tách bước', action: 'Chia bài thành 2 bước nhỏ: hiểu đề trước, rồi mới chọn phép/ý trả lời.' },
        { level: 'L3', title: 'Ví dụ khác', action: `Làm một ví dụ cùng dạng nhưng dễ hơn chủ đề ${topicKey}, sau đó quay lại câu hiện tại.` },
        { level: 'L4', title: 'Dạy lại', action: 'Con nói lại cho ba/mẹ nghe: đề hỏi gì, con biết gì, con làm bước nào trước.' },
        { level: 'L5', title: 'Sửa lỗi', action: 'Ghi một lỗi nhỏ vào sổ lỗi sai và hẹn ôn lại sau 1-3-7 ngày.' },
    ];
}

function defaultTopic(subject: LearningSubjectKey, topicKey: string): TopicEnrichment {
    const pack = SUBJECT_ENRICHMENT[subject];
    return {
        topicKey,
        subject,
        gradeLevel: 1,
        coverageBand: pack.coverage,
        visual: {
            src: imageBySubject[subject],
            alt: `${pack.label} minh họa cho chủ đề ${topicKey}`,
        },
        masteryTargets: [
            'Làm đúng khi chưa có gợi ý',
            'Giải thích được cách nghĩ bằng lời của con',
            'Áp dụng sang một tình huống mới',
        ],
        benchmarkTags: pack.benchmarkPattern,
        lessonMoves: pack.sessionRhythm,
        supportLadder: buildSupportLadder(subject, topicKey),
        antiBoredom: [
            'Đổi vai: con làm thầy cô trong 30 giây',
            'Đổi hình: dùng đồ vật thật trong nhà để minh họa',
            'Đổi tốc độ: một câu nhanh, một câu cần giải thích chậm',
        ],
        transferPrompt: 'Con hãy tự đặt một câu hỏi cùng dạng nhưng đổi nhân vật hoặc đồ vật.',
        parentMission: 'Ba/mẹ hỏi con: "Con đã dùng chiến lược nào? Có cách nào kiểm tra lại không?"',
        commonPitfalls: ['Trả lời quá nhanh', 'Không đọc hết đề', 'Không kiểm tra lại bằng cách khác'],
        sourceIds: pack.sourceIds,
    };
}

export function getSubjectEnrichment(subject: LearningSubjectKey): SubjectEnrichment {
    return SUBJECT_ENRICHMENT[subject];
}

export function getTopicEnrichment(topicKey: string, fallbackSubject?: LearningSubjectKey): TopicEnrichment {
    const subject = inferSubject(topicKey, fallbackSubject);
    const base = defaultTopic(subject, topicKey);
    const override = TOPIC_OVERRIDES[topicKey] ?? {};
    return {
        ...base,
        ...override,
        visual: { ...base.visual, ...(override.visual ?? {}) },
        masteryTargets: override.masteryTargets ?? base.masteryTargets,
        benchmarkTags: override.benchmarkTags ?? base.benchmarkTags,
        lessonMoves: override.lessonMoves ?? base.lessonMoves,
        supportLadder: override.supportLadder ?? base.supportLadder,
        antiBoredom: override.antiBoredom ?? base.antiBoredom,
        commonPitfalls: override.commonPitfalls ?? base.commonPitfalls,
        sourceIds: override.sourceIds ?? base.sourceIds,
    };
}

export function getAttributionForSource(id: SourceId): ResourceAttribution {
    const source = LEARNING_SOURCES[id];
    return {
        title: source.title,
        sourceName: source.provider,
        sourceUrl: source.sourceUrl,
        license: source.license,
        licenseUrl: source.licenseUrl,
        retrievedAt: source.retrievedAt,
    };
}

export const ENRICHMENT_STATS = {
    sourceCount: Object.keys(LEARNING_SOURCES).length,
    subjectCount: Object.keys(SUBJECT_ENRICHMENT).length,
    explicitTopicOverrides: Object.keys(TOPIC_OVERRIDES).length,
};
