// ========================================
// Textbook Library - Curated Reading Materials
// Vietnamese MOE (CTGDPT 2018) + International Curricula
// Built-in passages are original companion texts unless explicitly public domain.
// Full copyrighted textbooks are link-only or import-ready when the family has rights.
// ========================================

export type TextbookCategory =
    | 'vn-moe'
    | 'cambridge'
    | 'oxford'
    | 'singapore'
    | 'oer'
    | 'classic';

export type SubjectArea =
    | 'english'
    | 'vietnamese'
    | 'math'
    | 'math-en'
    | 'science'
    | 'literature'
    | 'social-studies';

export type LibraryLicenseStatus =
    | 'built_in_original'
    | 'public_domain'
    | 'open_license'
    | 'link_only'
    | 'licensed_import_required';

export type LibraryCoverageStatus =
    | 'read_now'
    | 'catalog_link_only'
    | 'authorized_import_ready'
    | 'public_domain_full_text';

export interface KeyVocabularyEntry {
    word: string;
    viMeaning: string;
    phonetic?: string;
    partOfSpeech?: string;
    exampleVi?: string;
}

export interface SentenceGuide {
    en: string;
    vi: string;
    focus: string;
    question: string;
    answerHint: string;
    keyTerms: string[];
}

export interface ReadingSupport {
    beforeReading: string[];
    whileReading: string[];
    afterReading: string[];
    parentPrompt?: string;
}

export interface ComprehensionCheck {
    question: string;
    answerHint: string;
}

export interface TextbookPassage {
    id: string;
    title: string;
    text: string;
    viSummary: string;
    difficulty: 'easy' | 'medium' | 'hard';
    wordCount: number;
    cefrBand?: 'pre-A1' | 'A1' | 'A2' | 'B1';
    keyVocabulary: KeyVocabularyEntry[];
    sentenceGuides: SentenceGuide[];
    support: ReadingSupport;
    comprehensionChecks: ComprehensionCheck[];
    sourceAlignment: string[];
}

export interface TextbookEntry {
    id: string;
    title: string;
    titleVi: string;
    category: TextbookCategory;
    subject: SubjectArea;
    grade: number;
    description: string;
    descriptionVi: string;
    coverEmoji: string;
    passages: TextbookPassage[];
    sourceNote: string;
    officialSourceUrl?: string;
    licenseStatus: LibraryLicenseStatus;
    licenseNote: string;
    coverageStatus: LibraryCoverageStatus;
    importHint?: string;
    curriculumTags: string[];
}

export interface OfficialLibrarySourcePack {
    id: string;
    title: string;
    provider: string;
    program: string;
    sourceUrl: string;
    licenseStatus: LibraryLicenseStatus;
    appPolicy: string;
    readerPlan: string;
}

export interface ReaderIntegrationCandidate {
    id: string;
    name: string;
    repoUrl: string;
    license: string;
    fit: 'adopt_now' | 'evaluate_later' | 'avoid_for_now';
    useCase: string;
    reason: string;
}

const guide = (
    en: string,
    vi: string,
    focus: string,
    question: string,
    answerHint: string,
    keyTerms: string[],
): SentenceGuide => ({ en, vi, focus, question, answerHint, keyTerms });

const support = (
    beforeReading: string[],
    whileReading: string[],
    afterReading: string[],
    parentPrompt?: string,
): ReadingSupport => ({ beforeReading, whileReading, afterReading, parentPrompt });

// ========================================
// SOURCE AND COPYRIGHT CONTROL
// ========================================

export const TEXTBOOK_COPYRIGHT_GUARDRAIL = {
    allowedClaim:
        'Thư viện có kệ sách chuẩn, đoạn đọc tự biên soạn, nguồn mở/public domain và cơ chế nhập tài liệu có quyền sử dụng.',
    blockedClaim:
        'Không được nói app đã nhúng full 100% toàn văn SGK/textbook có bản quyền nếu chưa có giấy phép hoặc nguồn công khai cho phép cache/nội dung.',
    importPolicy:
        'Gia đình có thể thêm PDF/EPUB đã mua hoặc được trường/cơ sở cấp quyền. App chỉ nên lưu cục bộ, ghi nguồn, trạng thái quyền và không xuất bản lại.',
};

export const OFFICIAL_LIBRARY_SOURCE_PACKS: OfficialLibrarySourcePack[] = [
    {
        id: 'vn-moe-ctgdpt-2018',
        title: 'Chương trình giáo dục phổ thông 2018',
        provider: 'Bộ Giáo dục và Đào tạo Việt Nam',
        program: 'Việt Nam',
        sourceUrl: 'https://moet.gov.vn',
        licenseStatus: 'link_only',
        appPolicy: 'Dùng để map lớp, môn, mạch năng lực. Không tự chép toàn văn SGK.',
        readerPlan: 'Hiển thị bản đồ chương trình, checklist bài học và đoạn đọc luyện tập tự biên soạn.',
    },
    {
        id: 'vn-global-success-official',
        title: 'Tiếng Anh Global Success lớp 1-5',
        provider: 'Nhà xuất bản Giáo dục Việt Nam / HEID',
        program: 'Bộ GD&ĐT',
        sourceUrl: 'https://heid.vn/product/sach-giao-khoa-tieng-anh-lop-1-global-success/',
        licenseStatus: 'licensed_import_required',
        appPolicy: 'Chỉ dẫn nguồn hoặc mở bản gia đình có quyền sử dụng. Không nhúng bản scan/PDF không rõ quyền.',
        readerPlan: 'Khi có bản quyền: mở PDF/EPUB trong reader, phủ lớp tra từ/song ngữ lên trang đang đọc.',
    },
    {
        id: 'oxford-owl-free-ebooks',
        title: 'Oxford Owl Free eBook Library',
        provider: 'Oxford University Press',
        program: 'Oxford',
        sourceUrl: 'https://www.oxfordowl.co.uk/for-home/library-page?type=book&view=default',
        licenseStatus: 'link_only',
        appPolicy: 'Cần tài khoản miễn phí; app không copy nội dung, chỉ dẫn nguồn và ghi lại từ vựng/ghi chú học.',
        readerPlan: 'Dùng làm nguồn đọc ngoài app; sau khi có quyền/exports hợp lệ mới nhập vào reader cục bộ.',
    },
    {
        id: 'singapore-moe-syllabuses',
        title: 'Primary school subjects and syllabuses',
        provider: 'Ministry of Education Singapore',
        program: 'Singapore',
        sourceUrl: 'https://www.moe.gov.sg/primary/curriculum/syllabus',
        licenseStatus: 'link_only',
        appPolicy: 'Dùng syllabus chính thức để map năng lực; textbook thương mại cần mua/giấy phép riêng.',
        readerPlan: 'Dùng syllabus làm đối chiếu, còn bài đọc/bài toán trong app là companion practice tự biên soạn.',
    },
    {
        id: 'project-gutenberg',
        title: 'Project Gutenberg public-domain texts',
        provider: 'Project Gutenberg / Gutendex',
        program: 'OER / public domain',
        sourceUrl: 'https://www.gutenberg.org/',
        licenseStatus: 'public_domain',
        appPolicy: 'Được đọc/cache nội dung public domain phù hợp tuổi, kèm attribution.',
        readerPlan: 'Tích hợp đọc toàn văn từng chương, tra từ, tóm tắt song ngữ và câu hỏi đọc hiểu.',
    },
];

export const READER_INTEGRATION_CANDIDATES: ReaderIntegrationCandidate[] = [
    {
        id: 'epubjs',
        name: 'epub.js',
        repoUrl: 'https://github.com/futurepress/epub.js',
        license: 'Free BSD',
        fit: 'adopt_now',
        useCase: 'Mở EPUB có quyền sử dụng, phân trang, lưu vị trí đọc.',
        reason: 'Nhẹ hơn Readium, phù hợp bước tiếp theo cho app Next.js hiện tại.',
    },
    {
        id: 'react-reader',
        name: 'react-reader',
        repoUrl: 'https://github.com/gerhardsletten/react-reader',
        license: 'Apache-2.0',
        fit: 'adopt_now',
        useCase: 'React wrapper cho epub.js, triển khai nhanh reader EPUB.',
        reason: 'Phù hợp nếu muốn có component EPUB trước khi tự viết lớp chú giải riêng.',
    },
    {
        id: 'readium-web',
        name: 'Readium Web',
        repoUrl: 'https://github.com/readium/web',
        license: 'BSD-3-Clause',
        fit: 'evaluate_later',
        useCase: 'Reader chuẩn lớn cho EPUB/web publication, phù hợp khi cần thư viện quy mô lớn.',
        reason: 'Mạnh nhưng kiến trúc nặng hơn nhu cầu MVP của Henry.',
    },
    {
        id: 'pdfjs',
        name: 'PDF.js',
        repoUrl: 'https://github.com/mozilla/pdf.js',
        license: 'Apache-2.0',
        fit: 'evaluate_later',
        useCase: 'Mở PDF có quyền sử dụng với text layer để chạm từ/đoạn.',
        reason: 'Cần thêm lớp bảo vệ bản quyền, chọn text layer và hiệu năng mobile.',
    },
    {
        id: 'readest',
        name: 'Readest',
        repoUrl: 'https://github.com/readest/readest',
        license: 'AGPL-3.0',
        fit: 'avoid_for_now',
        useCase: 'Tham khảo UX reader đa nền tảng.',
        reason: 'AGPL và kiến trúc Tauri/monorepo không hợp để nhúng trực tiếp vào app hiện tại.',
    },
];

// ========================================
// CURATED LIBRARY
// ========================================

export const TEXTBOOK_LIBRARY: TextbookEntry[] = [
    {
        id: 'vn-english-g1',
        title: 'English 1 - Global Success Companion',
        titleVi: 'Tiếng Anh 1 - luyện đọc theo Global Success',
        category: 'vn-moe',
        subject: 'english',
        grade: 1,
        description: 'Original companion passages aligned to Grade 1 greetings, colors, numbers, family',
        descriptionVi: 'Đoạn đọc tự biên soạn theo mạch lớp 1: chào hỏi, màu sắc, số đếm, gia đình',
        coverEmoji: '🇻🇳',
        sourceNote: 'Original practice content aligned to CTGDPT 2018 and Global Success themes.',
        officialSourceUrl: 'https://heid.vn/product/sach-giao-khoa-tieng-anh-lop-1-global-success/',
        licenseStatus: 'built_in_original',
        licenseNote: 'Không sao chép toàn văn SGK; chỉ dùng đoạn luyện tập tự biên soạn và dẫn nguồn chương trình.',
        coverageStatus: 'read_now',
        curriculumTags: ['pre-A1', 'greetings', 'family', 'daily-school'],
        passages: [
            {
                id: 'vn-e1-p1',
                title: 'Hello! My Name Is Minh',
                text: 'Hello! My name is Minh. I am six years old. I live in Ho Chi Minh City. I go to school every day. I like to play with my friends. We play in the park after school. My favorite color is blue. I have a small dog. His name is Lucky. He is very friendly.',
                viSummary: 'Minh 6 tuổi, sống ở TP.HCM, đi học mỗi ngày, thích chơi với bạn bè và có một chú chó nhỏ tên Lucky.',
                difficulty: 'easy',
                cefrBand: 'pre-A1',
                wordCount: 59,
                keyVocabulary: [
                    { word: 'hello', viMeaning: 'xin chào', phonetic: '/həˈloʊ/', partOfSpeech: 'interjection' },
                    { word: 'name', viMeaning: 'tên', phonetic: '/neɪm/', partOfSpeech: 'noun' },
                    { word: 'school', viMeaning: 'trường học', phonetic: '/skuːl/', partOfSpeech: 'noun' },
                    { word: 'friends', viMeaning: 'bạn bè', phonetic: '/frɛndz/', partOfSpeech: 'noun' },
                    { word: 'favorite', viMeaning: 'yêu thích', phonetic: '/ˈfeɪvərɪt/', partOfSpeech: 'adjective' },
                    { word: 'friendly', viMeaning: 'thân thiện', phonetic: '/ˈfrɛndli/', partOfSpeech: 'adjective' },
                ],
                sentenceGuides: [
                    guide('Hello! My name is Minh.', 'Xin chào! Tên mình là Minh.', 'Giới thiệu bản thân', 'Who is speaking?', 'Minh is speaking.', ['hello', 'name']),
                    guide('I live in Ho Chi Minh City.', 'Mình sống ở Thành phố Hồ Chí Minh.', 'Nơi sống', 'Where does Minh live?', 'He lives in Ho Chi Minh City.', ['live', 'city']),
                    guide('My favorite color is blue.', 'Màu yêu thích của mình là xanh dương.', 'Sở thích', 'What color does Minh like?', 'He likes blue.', ['favorite', 'blue']),
                ],
                support: support(
                    ['Nhìn tên riêng: Minh, Ho Chi Minh City, Lucky.', 'Dự đoán bài nói về một bạn nhỏ.'],
                    ['Chạm các từ màu xanh để xem nghĩa.', 'Đọc từng câu và hỏi: ai, ở đâu, thích gì?'],
                    ['Nói lại 3 thông tin về Minh bằng tiếng Việt.', 'Tự giới thiệu bản thân bằng 3 câu tiếng Anh.'],
                    'Ba mẹ hỏi: Con có thể đổi Minh thành tên của con và đọc lại không?',
                ),
                comprehensionChecks: [
                    { question: 'How old is Minh?', answerHint: 'six years old' },
                    { question: "What is the dog's name?", answerHint: 'Lucky' },
                ],
                sourceAlignment: ['CTGDPT 2018 English primary communication', 'Global Success Grade 1 themes'],
            },
            {
                id: 'vn-e1-p2',
                title: 'My Family',
                text: 'This is my family. My father is a doctor. My mother is a teacher. I have one sister. Her name is Lan. She is four years old. We live in a big house. My grandmother lives with us. She cooks delicious food. I love my family very much.',
                viSummary: 'Gia đình của bạn nhỏ có bố là bác sĩ, mẹ là giáo viên, em gái Lan và bà sống cùng nhà.',
                difficulty: 'easy',
                cefrBand: 'pre-A1',
                wordCount: 54,
                keyVocabulary: [
                    { word: 'family', viMeaning: 'gia đình', phonetic: '/ˈfæmɪli/' },
                    { word: 'doctor', viMeaning: 'bác sĩ', phonetic: '/ˈdɑːktər/' },
                    { word: 'teacher', viMeaning: 'giáo viên', phonetic: '/ˈtiːtʃər/' },
                    { word: 'grandmother', viMeaning: 'bà', phonetic: '/ˈɡrænˌmʌðər/' },
                    { word: 'delicious', viMeaning: 'ngon', phonetic: '/dɪˈlɪʃəs/' },
                ],
                sentenceGuides: [
                    guide('My father is a doctor.', 'Bố của mình là bác sĩ.', 'Nghề nghiệp trong gia đình', 'What does the father do?', 'He is a doctor.', ['father', 'doctor']),
                    guide('My grandmother lives with us.', 'Bà sống cùng gia đình mình.', 'Người sống cùng nhà', 'Who lives with the family?', 'The grandmother lives with them.', ['grandmother', 'lives']),
                ],
                support: support(
                    ['Nhớ cấu trúc: My father is..., My mother is...'],
                    ['Khi thấy "is", tìm xem ai là gì.', 'Gạch các từ chỉ người trong gia đình.'],
                    ['Kể lại gia đình trong bài bằng tiếng Việt.', 'Viết 2 câu về gia đình mình.'],
                ),
                comprehensionChecks: [
                    { question: 'Who is a teacher?', answerHint: 'The mother is a teacher.' },
                    { question: 'How old is Lan?', answerHint: 'Lan is four years old.' },
                ],
                sourceAlignment: ['Grade 1 family vocabulary', 'Basic present simple pattern'],
            },
        ],
    },
    {
        id: 'vn-vietnamese-g1',
        title: 'Vietnamese 1 - Reading Companion',
        titleVi: 'Tiếng Việt 1 - đọc hiểu tự luyện',
        category: 'vn-moe',
        subject: 'vietnamese',
        grade: 1,
        description: 'Original short Vietnamese reading passages for decoding and comprehension',
        descriptionVi: 'Bài đọc tiếng Việt tự biên soạn để luyện đọc vần, câu ngắn và hiểu ý',
        coverEmoji: '🔤',
        sourceNote: 'Original practice content aligned to CTGDPT 2018 Vietnamese literacy goals.',
        licenseStatus: 'built_in_original',
        licenseNote: 'Không sao chép bài đọc trong SGK; dùng văn bản luyện đọc mới.',
        coverageStatus: 'read_now',
        curriculumTags: ['vần', 'câu-ngắn', 'đọc-hiểu'],
        passages: [
            {
                id: 'vn-tv1-p1',
                title: 'Bé Ra Vườn',
                text: 'In the morning, An goes to the garden with her mother. The sun is warm. An sees a red flower, a small bee, and a green leaf. Mother says, "Look carefully before you touch." An smiles and waters the flower.',
                viSummary: 'Buổi sáng, An ra vườn cùng mẹ. An quan sát hoa, ong và lá, rồi tưới nước cho hoa.',
                difficulty: 'easy',
                wordCount: 41,
                keyVocabulary: [
                    { word: 'morning', viMeaning: 'buổi sáng', phonetic: '/ˈmɔːrnɪŋ/' },
                    { word: 'garden', viMeaning: 'khu vườn', phonetic: '/ˈɡɑːrdən/' },
                    { word: 'flower', viMeaning: 'bông hoa', phonetic: '/ˈflaʊər/' },
                    { word: 'carefully', viMeaning: 'cẩn thận', phonetic: '/ˈkerfəli/' },
                    { word: 'waters', viMeaning: 'tưới nước', phonetic: '/ˈwɔːtərz/' },
                ],
                sentenceGuides: [
                    guide('An sees a red flower, a small bee, and a green leaf.', 'An nhìn thấy hoa đỏ, ong nhỏ và lá xanh.', 'Liệt kê sự vật', 'What does An see?', 'A flower, a bee, and a leaf.', ['flower', 'bee', 'leaf']),
                    guide('Look carefully before you touch.', 'Hãy nhìn kỹ trước khi chạm vào.', 'An toàn khi quan sát', 'What should An do first?', 'Look carefully.', ['carefully', 'touch']),
                ],
                support: support(
                    ['Nhìn tranh tưởng tượng: vườn có hoa, ong, lá.', 'Đọc chậm câu dài có dấu phẩy.'],
                    ['Tìm 3 sự vật An nhìn thấy.', 'Chạm từ mới để xem nghĩa.'],
                    ['Nói lại bài bằng tiếng Việt.', 'Kể 1 việc con làm khi ra vườn.'],
                ),
                comprehensionChecks: [
                    { question: 'Where does An go?', answerHint: 'to the garden' },
                    { question: 'Why should An look carefully?', answerHint: 'to stay safe before touching things' },
                ],
                sourceAlignment: ['Vietnamese Grade 1 observation and sentence comprehension'],
            },
        ],
    },
    {
        id: 'vn-english-g2',
        title: 'English 2 - Global Success Companion',
        titleVi: 'Tiếng Anh 2 - luyện đọc theo Global Success',
        category: 'vn-moe',
        subject: 'english',
        grade: 2,
        description: 'Original companion passage on daily routines, weather, animals, hobbies',
        descriptionVi: 'Đoạn đọc tự biên soạn theo mạch lớp 2: sinh hoạt hằng ngày và môn học',
        coverEmoji: '🇻🇳',
        sourceNote: 'Original practice content aligned to CTGDPT 2018 and Global Success themes.',
        licenseStatus: 'built_in_original',
        licenseNote: 'Không sao chép toàn văn SGK; chỉ dùng đoạn luyện đọc mới.',
        coverageStatus: 'read_now',
        curriculumTags: ['daily-routine', 'school-subjects', 'A1'],
        passages: [
            {
                id: 'vn-e2-p1',
                title: 'My Day',
                text: "I wake up at six o'clock every morning. First, I brush my teeth and wash my face. Then I eat breakfast with my family. I usually eat rice and eggs. After breakfast, I walk to school with my mother. School starts at seven thirty. I study many subjects like math, Vietnamese, and English. After school, I do my homework. Then I play outside until dinner time.",
                viSummary: 'Bạn nhỏ thức dậy lúc 6 giờ, vệ sinh cá nhân, ăn sáng, đi học với mẹ, học nhiều môn rồi làm bài tập sau giờ học.',
                difficulty: 'easy',
                cefrBand: 'A1',
                wordCount: 73,
                keyVocabulary: [
                    { word: 'breakfast', viMeaning: 'bữa sáng', phonetic: '/ˈbrɛkfəst/' },
                    { word: 'usually', viMeaning: 'thường', phonetic: '/ˈjuːʒuəli/' },
                    { word: 'subjects', viMeaning: 'các môn học', phonetic: '/ˈsʌbdʒɪkts/' },
                    { word: 'homework', viMeaning: 'bài tập về nhà', phonetic: '/ˈhoʊmwɜːrk/' },
                ],
                sentenceGuides: [
                    guide('First, I brush my teeth and wash my face.', 'Đầu tiên, mình đánh răng và rửa mặt.', 'Từ nối trình tự', 'What does the child do first?', 'Brushes teeth and washes face.', ['first', 'brush', 'wash']),
                    guide('School starts at seven thirty.', 'Trường bắt đầu lúc 7 giờ 30.', 'Giờ giấc', 'What time does school start?', 'At seven thirty.', ['starts', 'seven thirty']),
                ],
                support: support(
                    ['Đoán bài nói về một ngày đi học.', 'Nhớ từ nối: first, then, after.'],
                    ['Tìm các hoạt động theo thứ tự.', 'Chạm vào từ chỉ môn học.'],
                    ['Vẽ timeline 4 việc trong ngày.', 'Nói lại bằng tiếng Việt rồi đọc lại bằng tiếng Anh.'],
                ),
                comprehensionChecks: [
                    { question: 'What does the child eat for breakfast?', answerHint: 'rice and eggs' },
                    { question: 'Who walks to school with the child?', answerHint: 'the mother' },
                ],
                sourceAlignment: ['Grade 2 daily routine', 'Sequence words'],
            },
        ],
    },
    {
        id: 'vn-math-g2',
        title: 'Math 2 - Word Problem Reader',
        titleVi: 'Toán 2 - đọc đề toán song ngữ',
        category: 'vn-moe',
        subject: 'math',
        grade: 2,
        description: 'Bilingual word-problem reading for units, totals, and comparisons',
        descriptionVi: 'Đọc đề toán bằng tiếng Anh - tiếng Việt, tìm dữ kiện và câu hỏi',
        coverEmoji: '🧮',
        sourceNote: 'Original companion problems aligned to CTGDPT 2018 primary math.',
        licenseStatus: 'built_in_original',
        licenseNote: 'Bài toán tự biên soạn, không trích sách bài tập/SGK.',
        coverageStatus: 'read_now',
        curriculumTags: ['word-problem', 'addition', 'subtraction', 'units'],
        passages: [
            {
                id: 'vn-math2-p1',
                title: 'Books on Two Shelves',
                text: 'There are 18 books on the top shelf. There are 24 books on the bottom shelf. How many books are there in all? Later, Minh takes 9 books to read with his friends. How many books are left on the shelves?',
                viSummary: 'Có 18 cuốn ở kệ trên và 24 cuốn ở kệ dưới. Tính tổng số sách, rồi trừ 9 cuốn Minh lấy đi.',
                difficulty: 'medium',
                wordCount: 43,
                keyVocabulary: [
                    { word: 'shelf', viMeaning: 'kệ sách', phonetic: '/ʃelf/' },
                    { word: 'bottom', viMeaning: 'phía dưới', phonetic: '/ˈbɑːtəm/' },
                    { word: 'in all', viMeaning: 'tất cả', phonetic: '/ɪn ɔːl/' },
                    { word: 'left', viMeaning: 'còn lại', phonetic: '/left/' },
                ],
                sentenceGuides: [
                    guide('How many books are there in all?', 'Có tất cả bao nhiêu cuốn sách?', 'Câu hỏi tổng cộng', 'Which operation helps first?', 'Addition: 18 + 24.', ['in all', 'books']),
                    guide('How many books are left on the shelves?', 'Còn lại bao nhiêu cuốn trên kệ?', 'Câu hỏi còn lại', 'What changed after Minh takes books?', 'Subtract 9 from the total.', ['left', 'takes']),
                ],
                support: support(
                    ['Khoanh số: 18, 24, 9.', 'Gạch câu hỏi có "in all" và "left".'],
                    ['Dịch từ khóa toán học trước, chưa tính vội.', 'Tách bài thành 2 bước.'],
                    ['Viết phép tính bằng tiếng Việt.', 'Tự đổi 9 thành 12 và giải lại.'],
                ),
                comprehensionChecks: [
                    { question: 'What does "in all" mean?', answerHint: 'It asks for the total.' },
                    { question: 'What should we do after finding the total?', answerHint: 'Subtract 9 books.' },
                ],
                sourceAlignment: ['Grade 2 addition/subtraction word problems', 'Mathematical language support'],
            },
        ],
    },
    {
        id: 'vn-english-g3',
        title: 'English 3 - Global Success Companion',
        titleVi: 'Tiếng Anh 3 - luyện đọc theo Global Success',
        category: 'vn-moe',
        subject: 'english',
        grade: 3,
        description: 'Original companion passage on community, travel, environment, seasons',
        descriptionVi: 'Đoạn đọc tự biên soạn theo mạch lớp 3: cộng đồng, mùa, môi trường',
        coverEmoji: '🇻🇳',
        sourceNote: 'Original practice content aligned to CTGDPT 2018 and Global Success themes.',
        licenseStatus: 'built_in_original',
        licenseNote: 'Không sao chép toàn văn SGK; chỉ dùng đoạn luyện đọc mới.',
        coverageStatus: 'read_now',
        curriculumTags: ['seasons', 'Vietnam', 'environment'],
        passages: [
            {
                id: 'vn-e3-p1',
                title: 'The Four Seasons in Vietnam',
                text: 'Vietnam has different weather in different places. In the north, there are four seasons: spring, summer, autumn, and winter. Spring is warm and flowers bloom everywhere. Summer is very hot. People go swimming in the sea. Autumn is cool and the leaves change color. Winter is cold and people wear thick jackets. In the south, there are only two seasons: the rainy season and the dry season. The rainy season starts in May.',
                viSummary: 'Việt Nam có thời tiết khác nhau. Miền Bắc có 4 mùa; miền Nam thường có mùa mưa và mùa khô.',
                difficulty: 'medium',
                cefrBand: 'A1',
                wordCount: 82,
                keyVocabulary: [
                    { word: 'seasons', viMeaning: 'mùa', phonetic: '/ˈsiːzənz/' },
                    { word: 'bloom', viMeaning: 'nở hoa', phonetic: '/bluːm/' },
                    { word: 'autumn', viMeaning: 'mùa thu', phonetic: '/ˈɔːtəm/' },
                    { word: 'jackets', viMeaning: 'áo khoác', phonetic: '/ˈdʒækɪts/' },
                    { word: 'rainy', viMeaning: 'có mưa', phonetic: '/ˈreɪni/' },
                ],
                sentenceGuides: [
                    guide('In the north, there are four seasons.', 'Ở miền Bắc có bốn mùa.', 'So sánh vùng miền', 'How many seasons are in the north?', 'Four seasons.', ['north', 'seasons']),
                    guide('In the south, there are only two seasons.', 'Ở miền Nam chỉ có hai mùa.', 'Từ only', 'How is the south different?', 'It has only two seasons.', ['south', 'only']),
                ],
                support: support(
                    ['Nhìn từ north/south để biết bài so sánh vùng miền.', 'Ôn tên 4 mùa.'],
                    ['Chạm vào từ chỉ mùa.', 'Tìm câu nói về miền Bắc và miền Nam.'],
                    ['Lập bảng: North vs South.', 'Nói mùa con thích và lý do.'],
                ),
                comprehensionChecks: [
                    { question: 'What are the four seasons in the north?', answerHint: 'spring, summer, autumn, winter' },
                    { question: 'When does the rainy season start?', answerHint: 'in May' },
                ],
                sourceAlignment: ['Grade 3 weather and seasons', 'Compare information across sentences'],
            },
        ],
    },
    {
        id: 'cambridge-science-g3',
        title: 'Cambridge Primary Science Stage 3 Companion',
        titleVi: 'Khoa học Cambridge Tiểu học Giai đoạn 3',
        category: 'cambridge',
        subject: 'science',
        grade: 3,
        description: 'Original inquiry passage on living things, materials, and evidence',
        descriptionVi: 'Bài đọc tự biên soạn theo hướng khám phá: sinh vật, vật liệu, bằng chứng',
        coverEmoji: '🔬',
        sourceNote: 'Original practice content inspired by Cambridge Primary Science inquiry approach.',
        licenseStatus: 'built_in_original',
        licenseNote: 'Không sao chép Cambridge learner books; chỉ dùng companion passage tự biên soạn.',
        coverageStatus: 'read_now',
        importHint: 'Nếu gia đình/trường có quyền Cambridge ebooks, nhập file có quyền vào reader cục bộ ở bước EPUB/PDF.',
        curriculumTags: ['plants', 'inquiry', 'photosynthesis', 'science-English'],
        passages: [
            {
                id: 'cam-sci3-p1',
                title: 'What Do Plants Need?',
                text: 'Plants are living things. They need water, sunlight, and air to grow. The roots of a plant take in water from the soil. The leaves use sunlight to make food. This process is called photosynthesis. Without sunlight, plants cannot make food and they will die. Some plants grow very fast, like bamboo. Other plants, like oak trees, grow very slowly. All plants produce oxygen, which is the gas that humans need to breathe.',
                viSummary: 'Thực vật cần nước, ánh sáng và không khí. Rễ hút nước; lá dùng ánh sáng để tạo thức ăn qua quang hợp. Cây tạo ra oxy cho con người thở.',
                difficulty: 'medium',
                cefrBand: 'A2',
                wordCount: 79,
                keyVocabulary: [
                    { word: 'photosynthesis', viMeaning: 'quang hợp', phonetic: '/ˌfoʊtoʊˈsɪnθəsɪs/' },
                    { word: 'roots', viMeaning: 'rễ cây', phonetic: '/ruːts/' },
                    { word: 'oxygen', viMeaning: 'oxy', phonetic: '/ˈɑːksɪdʒən/' },
                    { word: 'soil', viMeaning: 'đất', phonetic: '/sɔɪl/' },
                    { word: 'breathe', viMeaning: 'thở', phonetic: '/briːð/' },
                ],
                sentenceGuides: [
                    guide('The roots of a plant take in water from the soil.', 'Rễ cây hút nước từ đất.', 'Cơ quan và chức năng', 'What do roots do?', 'They take in water.', ['roots', 'soil']),
                    guide('This process is called photosynthesis.', 'Quá trình này gọi là quang hợp.', 'Thuật ngữ khoa học', 'What is photosynthesis?', 'Plants use sunlight to make food.', ['process', 'photosynthesis']),
                    guide('All plants produce oxygen, which is the gas that humans need to breathe.', 'Tất cả cây tạo oxy, loại khí con người cần để thở.', 'Mệnh đề giải thích which', 'Why is oxygen important?', 'Humans need it to breathe.', ['oxygen', 'breathe']),
                ],
                support: support(
                    ['Dự đoán 3 thứ cây cần để sống.', 'Nhắc lại: root = rễ, leaf = lá.'],
                    ['Tìm câu nói rễ làm gì và lá làm gì.', 'Chạm từ dài photosynthesis để xem nghĩa.'],
                    ['Vẽ sơ đồ: water + sunlight + air -> food + oxygen.', 'Giải thích quang hợp bằng tiếng Việt.'],
                ),
                comprehensionChecks: [
                    { question: 'What do plants need to grow?', answerHint: 'water, sunlight, and air' },
                    { question: 'What gas do plants produce?', answerHint: 'oxygen' },
                ],
                sourceAlignment: ['Cambridge Primary Science inquiry pattern', 'Plant needs and life processes'],
            },
        ],
    },
    {
        id: 'cambridge-english-g4',
        title: 'Cambridge Primary English Stage 4 Companion',
        titleVi: 'Cambridge Primary English Giai đoạn 4',
        category: 'cambridge',
        subject: 'english',
        grade: 4,
        description: 'Original non-fiction reading with paragraph evidence and inference',
        descriptionVi: 'Bài đọc tiếng Anh tự biên soạn để luyện tìm bằng chứng và suy luận',
        coverEmoji: '🎓',
        sourceNote: 'Original practice content aligned to Cambridge Primary English reading skills.',
        licenseStatus: 'built_in_original',
        licenseNote: 'Không sao chép coursebook; chỉ dùng văn bản luyện kỹ năng đọc.',
        coverageStatus: 'read_now',
        curriculumTags: ['non-fiction', 'inference', 'paragraph-evidence'],
        passages: [
            {
                id: 'cam-eng4-p1',
                title: 'A Small Museum with Big Stories',
                text: 'A museum is not only a room full of old objects. It is a place where people keep stories safe. In a small town museum, students found a wooden boat, a silver coin, and a faded map. The guide asked them to look for clues. The boat showed how families travelled on the river. The coin showed what people used to buy food. The map showed that the town was once near a busy trading road. By the end of the visit, the students understood that objects can speak if readers know how to ask good questions.',
                viSummary: 'Bảo tàng giữ lại câu chuyện qua đồ vật. Học sinh dùng manh mối từ thuyền, đồng xu và bản đồ để hiểu lịch sử thị trấn.',
                difficulty: 'hard',
                cefrBand: 'A2',
                wordCount: 102,
                keyVocabulary: [
                    { word: 'museum', viMeaning: 'bảo tàng', phonetic: '/mjuːˈziːəm/' },
                    { word: 'objects', viMeaning: 'đồ vật', phonetic: '/ˈɑːbdʒekts/' },
                    { word: 'clues', viMeaning: 'manh mối', phonetic: '/kluːz/' },
                    { word: 'trading', viMeaning: 'buôn bán', phonetic: '/ˈtreɪdɪŋ/' },
                    { word: 'understood', viMeaning: 'đã hiểu', phonetic: '/ˌʌndərˈstʊd/' },
                ],
                sentenceGuides: [
                    guide('It is a place where people keep stories safe.', 'Đó là nơi con người giữ gìn câu chuyện.', 'Định nghĩa mở rộng', 'What does a museum keep safe?', 'Stories.', ['place', 'stories']),
                    guide('The guide asked them to look for clues.', 'Hướng dẫn viên yêu cầu các bạn tìm manh mối.', 'Đọc như thám tử', 'What skill do students use?', 'They look for clues.', ['guide', 'clues']),
                    guide('Objects can speak if readers know how to ask good questions.', 'Đồ vật có thể "lên tiếng" nếu người đọc biết đặt câu hỏi tốt.', 'Ẩn dụ', 'Do objects really speak?', 'No. They give evidence when we ask questions.', ['objects', 'questions']),
                ],
                support: support(
                    ['Đoán xem mỗi đồ vật kể câu chuyện gì.', 'Nhớ: clue = manh mối.'],
                    ['Tìm ba đồ vật trong đoạn.', 'Gạch câu chứa "showed".'],
                    ['Chọn một đồ vật trong nhà và hỏi 3 câu về nó.', 'Kể lại bài bằng 4 câu tiếng Việt.'],
                ),
                comprehensionChecks: [
                    { question: 'What three objects did students find?', answerHint: 'a boat, a coin, and a map' },
                    { question: 'What did the map show?', answerHint: 'The town was once near a busy trading road.' },
                ],
                sourceAlignment: ['Cambridge Primary English non-fiction reading', 'Evidence and inference'],
            },
        ],
    },
    {
        id: 'oxford-owl-g1',
        title: 'Oxford Owl Levelled Reading Companion',
        titleVi: 'Oxford Owl - đọc phân cấp',
        category: 'oxford',
        subject: 'literature',
        grade: 1,
        description: 'Original levelled story companion; official Oxford books stay link-only',
        descriptionVi: 'Truyện phân cấp tự biên soạn; sách Oxford chính thức chỉ dẫn nguồn/nhập khi có quyền',
        coverEmoji: '🌳',
        sourceNote: 'Original levelled story inspired by phonics/levelled-reader pedagogy. Official Oxford texts are not copied.',
        officialSourceUrl: 'https://www.oxfordowl.co.uk/for-home/library-page?type=book&view=default',
        licenseStatus: 'built_in_original',
        licenseNote: 'Không sao chép Oxford Reading Tree/Oxford Owl; chỉ dùng câu chuyện tự biên soạn.',
        coverageStatus: 'read_now',
        importHint: 'Oxford Owl cần đăng ký/tài khoản; app nên dẫn link và ghi chú đọc, không scrape nội dung.',
        curriculumTags: ['levelled-reader', 'phonics', 'story-sequence'],
        passages: [
            {
                id: 'ox-owl-p1',
                title: 'A Day at the Beach',
                text: 'The family went to the beach on Saturday. The children were very excited. They built a big sandcastle near the water. Dad helped them dig a deep moat around it. Mom sat under a colorful umbrella and read her book. The waves came closer and closer. Suddenly, a big wave crashed into the sandcastle. The children laughed and started to build a new one. They had so much fun that they did not want to go home.',
                viSummary: 'Gia đình đi biển. Bọn trẻ xây lâu đài cát, sóng đánh sập lâu đài, rồi các bạn cười và xây lại.',
                difficulty: 'easy',
                cefrBand: 'A1',
                wordCount: 76,
                keyVocabulary: [
                    { word: 'sandcastle', viMeaning: 'lâu đài cát', phonetic: '/ˈsændˌkæsəl/' },
                    { word: 'excited', viMeaning: 'phấn khích', phonetic: '/ɪkˈsaɪtɪd/' },
                    { word: 'moat', viMeaning: 'hào quanh lâu đài', phonetic: '/moʊt/' },
                    { word: 'umbrella', viMeaning: 'cái ô/dù', phonetic: '/ʌmˈbrɛlə/' },
                    { word: 'crashed', viMeaning: 'đâm/va vào', phonetic: '/kræʃt/' },
                    { word: 'waves', viMeaning: 'sóng', phonetic: '/weɪvz/' },
                ],
                sentenceGuides: [
                    guide('They built a big sandcastle near the water.', 'Các bạn xây một lâu đài cát lớn gần nước.', 'Hành động chính', 'What did the children build?', 'A big sandcastle.', ['built', 'sandcastle']),
                    guide('The waves came closer and closer.', 'Những con sóng đến ngày càng gần.', 'Lặp từ để tăng cảm giác', 'What might happen next?', 'A wave may hit the sandcastle.', ['waves', 'closer']),
                ],
                support: support(
                    ['Dự đoán câu chuyện có vấn đề gì với lâu đài cát.', 'Nhìn từ suddenly để chờ sự kiện bất ngờ.'],
                    ['Tìm mở đầu - sự cố - kết thúc.', 'Chạm từ waves/crashed.'],
                    ['Kể lại câu chuyện bằng 3 tranh.', 'Nói bài học: khi hỏng, mình có thể làm lại.'],
                ),
                comprehensionChecks: [
                    { question: 'What destroyed the sandcastle?', answerHint: 'a big wave' },
                    { question: 'What did the children do after that?', answerHint: 'They started to build a new one.' },
                ],
                sourceAlignment: ['Levelled reader sequencing', 'Phonics-friendly repeated vocabulary'],
            },
        ],
    },
    {
        id: 'singapore-math-g2',
        title: 'Singapore Math - Primary 2 Word Problems',
        titleVi: 'Toán Singapore - Lớp 2 Toán có lời văn',
        category: 'singapore',
        subject: 'math-en',
        grade: 2,
        description: 'Original English word problems using CPA and model drawing language',
        descriptionVi: 'Toán có lời văn tiếng Anh theo hướng cụ thể - hình ảnh - trừu tượng',
        coverEmoji: '🔢',
        sourceNote: 'Original practice content aligned to Singapore MOE primary mathematics syllabus patterns.',
        officialSourceUrl: 'https://www.moe.gov.sg/primary/curriculum/syllabus',
        licenseStatus: 'built_in_original',
        licenseNote: 'Không sao chép textbook thương mại; bài toán tự biên soạn dựa trên năng lực syllabus.',
        coverageStatus: 'read_now',
        curriculumTags: ['CPA', 'model-drawing', 'word-problem', 'money'],
        passages: [
            {
                id: 'sg-m2-p1',
                title: 'Shopping at the Market',
                text: 'Lily goes to the market with her mother. She buys three apples. Each apple costs two dollars. How much does she pay for all the apples? Her mother buys five oranges. Each orange costs one dollar. How much do the oranges cost in total? How much money do they spend altogether? Lily has ten dollars. How much change does she get back after buying the apples?',
                viSummary: 'Lily đi chợ với mẹ. Cô mua 3 quả táo, mỗi quả 2 đô-la. Mẹ mua 5 quả cam, mỗi quả 1 đô-la. Tính tổng tiền và tiền thối.',
                difficulty: 'easy',
                cefrBand: 'A1',
                wordCount: 67,
                keyVocabulary: [
                    { word: 'costs', viMeaning: 'có giá', phonetic: '/kɒsts/' },
                    { word: 'total', viMeaning: 'tổng cộng', phonetic: '/ˈtoʊtəl/' },
                    { word: 'altogether', viMeaning: 'tất cả', phonetic: '/ˌɔːltəˈɡɛðər/' },
                    { word: 'change', viMeaning: 'tiền thối', phonetic: '/tʃeɪndʒ/' },
                ],
                sentenceGuides: [
                    guide('Each apple costs two dollars.', 'Mỗi quả táo giá 2 đô-la.', 'Từ each', 'What does each mean?', 'Every apple has the same price.', ['each', 'costs']),
                    guide('How much money do they spend altogether?', 'Họ tiêu tổng cộng bao nhiêu tiền?', 'Tổng cộng nhiều nhóm', 'What must be added?', 'The apple cost and the orange cost.', ['altogether', 'spend']),
                    guide('How much change does she get back?', 'Bạn ấy nhận lại bao nhiêu tiền thối?', 'Bài toán tiền thối', 'What do we subtract from 10?', 'The cost of the apples.', ['change', 'back']),
                ],
                support: support(
                    ['Vẽ thanh: apples, oranges, ten dollars.', 'Khoanh từ each, total, altogether, change.'],
                    ['Dịch câu hỏi trước khi tính.', 'Tách bài thành nhiều phép tính nhỏ.'],
                    ['Giải bằng sơ đồ thanh.', 'Tự tạo đề chợ bằng tiền Việt.'],
                ),
                comprehensionChecks: [
                    { question: 'How much are three apples?', answerHint: '3 x 2 = 6 dollars' },
                    { question: 'What does "change" mean in this problem?', answerHint: 'money left after paying' },
                ],
                sourceAlignment: ['Singapore primary mathematics problem solving', 'CPA/model drawing language'],
            },
        ],
    },
    {
        id: 'oer-storyweaver-g2',
        title: 'Open Reader - Community Helpers',
        titleVi: 'OER - Người giúp cộng đồng',
        category: 'oer',
        subject: 'social-studies',
        grade: 2,
        description: 'Original OER-style bilingual reader for community vocabulary',
        descriptionVi: 'Bài đọc song ngữ tự biên soạn theo phong cách học liệu mở về cộng đồng',
        coverEmoji: '🌍',
        sourceNote: 'Original open companion text; designed for future CC/OER import workflow.',
        licenseStatus: 'open_license',
        licenseNote: 'Nội dung tự biên soạn trong repo; có thể xuất kèm attribution nội bộ.',
        coverageStatus: 'read_now',
        curriculumTags: ['community', 'jobs', 'citizenship'],
        passages: [
            {
                id: 'oer-community-p1',
                title: 'People Who Help',
                text: 'Every community has people who help. A nurse cares for sick people. A bus driver takes children to school safely. A librarian helps readers find good books. A cleaner keeps the street tidy. These jobs are different, but they all make life better. When we say thank you, we show respect for their work.',
                viSummary: 'Mỗi cộng đồng có nhiều người giúp đỡ: điều dưỡng, tài xế xe buýt, thủ thư, cô chú lao công. Mỗi công việc đều làm cuộc sống tốt hơn.',
                difficulty: 'easy',
                cefrBand: 'A1',
                wordCount: 56,
                keyVocabulary: [
                    { word: 'community', viMeaning: 'cộng đồng', phonetic: '/kəˈmjuːnəti/' },
                    { word: 'nurse', viMeaning: 'điều dưỡng', phonetic: '/nɜːrs/' },
                    { word: 'librarian', viMeaning: 'thủ thư', phonetic: '/laɪˈbreriən/' },
                    { word: 'tidy', viMeaning: 'gọn gàng', phonetic: '/ˈtaɪdi/' },
                    { word: 'respect', viMeaning: 'sự tôn trọng', phonetic: '/rɪˈspekt/' },
                ],
                sentenceGuides: [
                    guide('These jobs are different, but they all make life better.', 'Các công việc khác nhau nhưng đều làm cuộc sống tốt hơn.', 'Ý chính của đoạn', 'What do all jobs have in common?', 'They help make life better.', ['different', 'better']),
                    guide('When we say thank you, we show respect for their work.', 'Khi nói cảm ơn, ta thể hiện sự tôn trọng công việc của họ.', 'Giá trị sống', 'How can we show respect?', 'By saying thank you.', ['respect', 'work']),
                ],
                support: support(
                    ['Kể tên 3 nghề giúp cộng đồng.', 'Dự đoán nghề nào xuất hiện trong bài.'],
                    ['Tìm cặp nghề - việc làm.', 'Chạm từ respect.'],
                    ['Viết lời cảm ơn một người giúp cộng đồng.', 'Tìm thêm 2 nghề trong khu phố.'],
                ),
                comprehensionChecks: [
                    { question: 'Who helps readers find books?', answerHint: 'a librarian' },
                    { question: 'Why are the jobs important?', answerHint: 'They make life better.' },
                ],
                sourceAlignment: ['Social studies community helpers', 'Values and citizenship reading'],
            },
        ],
    },
    {
        id: 'classic-aesop-g2',
        title: "Aesop's Fables - Easy Read",
        titleVi: 'Truyện ngụ ngôn Aesop - đọc dễ',
        category: 'classic',
        subject: 'literature',
        grade: 2,
        description: 'Public-domain fables adapted for young readers with bilingual support',
        descriptionVi: 'Ngụ ngôn kinh điển public domain, chuyển thể ngắn cho trẻ nhỏ',
        coverEmoji: '📚',
        sourceNote: 'Public domain source tradition; simplified wording created for this app.',
        licenseStatus: 'public_domain',
        licenseNote: 'Aesop fables are public domain; app uses simplified adaptation and attribution.',
        coverageStatus: 'public_domain_full_text',
        curriculumTags: ['fable', 'moral', 'story-sequence'],
        passages: [
            {
                id: 'aesop-p1',
                title: 'The Tortoise and the Hare',
                text: 'Once upon a time, there was a hare who was very proud of being fast. He always made fun of the slow tortoise. One day, the tortoise challenged the hare to a race. The hare laughed and agreed. When the race started, the hare ran very fast and soon got far ahead. He decided to take a nap under a tree because he was so confident. Meanwhile, the tortoise kept walking slowly but steadily. When the hare woke up, the tortoise was already near the finish line. The hare ran as fast as he could, but it was too late. The tortoise won the race. The lesson is: slow and steady wins the race.',
                viSummary: 'Thỏ tự tin vì chạy nhanh nên ngủ quên. Rùa đi chậm nhưng đều và thắng cuộc. Bài học: chậm mà chắc thì thắng.',
                difficulty: 'medium',
                cefrBand: 'A2',
                wordCount: 123,
                keyVocabulary: [
                    { word: 'tortoise', viMeaning: 'con rùa', phonetic: '/ˈtɔːrtəs/' },
                    { word: 'hare', viMeaning: 'con thỏ rừng', phonetic: '/her/' },
                    { word: 'challenged', viMeaning: 'thách thức', phonetic: '/ˈtʃælɪndʒd/' },
                    { word: 'confident', viMeaning: 'tự tin', phonetic: '/ˈkɑːnfɪdənt/' },
                    { word: 'steadily', viMeaning: 'đều đặn', phonetic: '/ˈstedɪli/' },
                    { word: 'meanwhile', viMeaning: 'trong khi đó', phonetic: '/ˈmiːnwaɪl/' },
                ],
                sentenceGuides: [
                    guide('He decided to take a nap under a tree because he was so confident.', 'Thỏ quyết định ngủ dưới gốc cây vì quá tự tin.', 'Nguyên nhân - kết quả', 'Why did the hare sleep?', 'Because he was confident.', ['because', 'confident']),
                    guide('Meanwhile, the tortoise kept walking slowly but steadily.', 'Trong khi đó, rùa tiếp tục đi chậm nhưng đều.', 'Từ nối meanwhile', 'What was the tortoise doing while the hare slept?', 'Walking slowly but steadily.', ['meanwhile', 'steadily']),
                ],
                support: support(
                    ['Dự đoán ai thắng và vì sao.', 'Nhớ fable = truyện có bài học.'],
                    ['Tìm vì sao thỏ thua.', 'Chạm từ meanwhile để hiểu chuyển cảnh.'],
                    ['Nói bài học bằng lời của con.', 'Kể lại câu chuyện trong 5 câu.'],
                ),
                comprehensionChecks: [
                    { question: 'Why did the hare lose?', answerHint: 'He was too confident and slept.' },
                    { question: 'What is the lesson?', answerHint: 'Slow and steady wins the race.' },
                ],
                sourceAlignment: ['Public-domain fable', 'Narrative sequence and moral inference'],
            },
            {
                id: 'aesop-p2',
                title: 'The Fox and the Grapes',
                text: 'A hungry fox saw some beautiful grapes hanging high on a vine. The grapes looked sweet and juicy. The fox jumped and jumped, trying to reach them. But the grapes were too high. After many tries, the fox gave up. As he walked away, he said to himself, "Those grapes are probably sour anyway." The lesson is: it is easy to dislike what we cannot have.',
                viSummary: 'Cáo không với tới chùm nho nên tự nói nho chắc chua. Bài học: con người dễ chê thứ mình không có được.',
                difficulty: 'easy',
                cefrBand: 'A1',
                wordCount: 70,
                keyVocabulary: [
                    { word: 'grapes', viMeaning: 'nho', phonetic: '/ɡreɪps/' },
                    { word: 'vine', viMeaning: 'dây leo/giàn nho', phonetic: '/vaɪn/' },
                    { word: 'juicy', viMeaning: 'mọng nước', phonetic: '/ˈdʒuːsi/' },
                    { word: 'sour', viMeaning: 'chua', phonetic: '/ˈsaʊər/' },
                    { word: 'probably', viMeaning: 'có lẽ', phonetic: '/ˈprɑːbəbli/' },
                ],
                sentenceGuides: [
                    guide('The fox jumped and jumped, trying to reach them.', 'Cáo nhảy mãi để cố với tới nho.', 'Lặp từ chỉ cố gắng', 'What did the fox try to do?', 'Reach the grapes.', ['jumped', 'reach']),
                    guide('Those grapes are probably sour anyway.', 'Dù sao thì nho đó có lẽ chua.', 'Tự an ủi', 'Did the fox know the grapes were sour?', 'No. He guessed after failing.', ['probably', 'sour']),
                ],
                support: support(
                    ['Dự đoán cáo gặp vấn đề gì.', 'Nhớ high = cao, reach = với tới.'],
                    ['Tìm câu cáo tự nói với mình.', 'Chạm probably để hiểu mức độ chắc chắn.'],
                    ['Nói bài học bằng ví dụ đời sống.', 'Kể một lần con chưa làm được việc gì và thử lại.'],
                ),
                comprehensionChecks: [
                    { question: 'Why could the fox not eat the grapes?', answerHint: 'They were too high.' },
                    { question: 'Why did he call them sour?', answerHint: 'He could not reach them.' },
                ],
                sourceAlignment: ['Public-domain fable', 'Emotion and inference'],
            },
        ],
    },
    {
        id: 'vn-english-g4',
        title: 'English 4 - Global Success Companion',
        titleVi: 'Tiếng Anh 4 - luyện đọc theo Global Success',
        category: 'vn-moe',
        subject: 'english',
        grade: 4,
        description: 'Original companion passage on places, food, celebrations, future plans',
        descriptionVi: 'Đoạn đọc tự biên soạn theo mạch lớp 4: địa danh, ẩm thực, lễ hội',
        coverEmoji: '🇻🇳',
        sourceNote: 'Original practice content aligned to CTGDPT 2018 and Global Success themes.',
        licenseStatus: 'built_in_original',
        licenseNote: 'Không sao chép toàn văn SGK; chỉ dùng đoạn luyện đọc mới.',
        coverageStatus: 'read_now',
        curriculumTags: ['food', 'Vietnamese-culture', 'descriptive-reading'],
        passages: [
            {
                id: 'vn-e4-p1',
                title: 'Traditional Vietnamese Food',
                text: 'Vietnam is famous for its delicious food. Pho is the most popular dish. It is a noodle soup with beef or chicken. People eat pho for breakfast. Banh mi is a Vietnamese sandwich with meat, vegetables, and special sauce inside a crispy bread roll. Spring rolls are another favorite. They can be fried or fresh. Each region in Vietnam has its own special dishes. In the south, people like sweet food. In the north, the food is less sweet but very flavorful.',
                viSummary: 'Việt Nam nổi tiếng với ẩm thực. Phở, bánh mì, gỏi cuốn/nem cuốn đều phổ biến. Mỗi vùng có hương vị riêng.',
                difficulty: 'medium',
                cefrBand: 'A2',
                wordCount: 85,
                keyVocabulary: [
                    { word: 'famous', viMeaning: 'nổi tiếng', phonetic: '/ˈfeɪməs/' },
                    { word: 'popular', viMeaning: 'phổ biến', phonetic: '/ˈpɑːpjələr/' },
                    { word: 'vegetables', viMeaning: 'rau củ', phonetic: '/ˈvedʒtəbəlz/' },
                    { word: 'region', viMeaning: 'vùng/miền', phonetic: '/ˈriːdʒən/' },
                    { word: 'flavorful', viMeaning: 'đậm đà', phonetic: '/ˈfleɪvərfəl/' },
                ],
                sentenceGuides: [
                    guide('Each region in Vietnam has its own special dishes.', 'Mỗi vùng ở Việt Nam có món đặc trưng riêng.', 'Ý khái quát', 'What is different across regions?', 'Special dishes.', ['region', 'special']),
                    guide('In the north, the food is less sweet but very flavorful.', 'Ở miền Bắc, món ăn ít ngọt hơn nhưng rất đậm đà.', 'So sánh vị', 'How is northern food described?', 'Less sweet but flavorful.', ['less', 'flavorful']),
                ],
                support: support(
                    ['Dự đoán bài có những món ăn nào.', 'Nhớ dish = món ăn.'],
                    ['Gạch các món ăn và vùng miền.', 'Chạm từ region.'],
                    ['So sánh 2 món ăn bằng tiếng Việt.', 'Viết 3 câu tiếng Anh về món con thích.'],
                ),
                comprehensionChecks: [
                    { question: 'What is pho?', answerHint: 'a noodle soup with beef or chicken' },
                    { question: 'What does each region have?', answerHint: 'its own special dishes' },
                ],
                sourceAlignment: ['Grade 4 food and places', 'Descriptive vocabulary'],
            },
        ],
    },
    {
        id: 'vn-english-g5',
        title: 'English 5 - Global Success Companion',
        titleVi: 'Tiếng Anh 5 - luyện đọc theo Global Success',
        category: 'vn-moe',
        subject: 'english',
        grade: 5,
        description: 'Original companion passage on technology, environment, global citizenship',
        descriptionVi: 'Đoạn đọc tự biên soạn theo mạch lớp 5: môi trường và công dân toàn cầu',
        coverEmoji: '🇻🇳',
        sourceNote: 'Original practice content aligned to CTGDPT 2018 and Global Success themes.',
        licenseStatus: 'built_in_original',
        licenseNote: 'Không sao chép toàn văn SGK; chỉ dùng đoạn luyện đọc mới.',
        coverageStatus: 'read_now',
        curriculumTags: ['environment', '3R', 'global-citizenship'],
        passages: [
            {
                id: 'vn-e5-p1',
                title: 'Protecting Our Environment',
                text: 'Our planet Earth needs our help. Every year, people produce millions of tons of trash. Plastic bags and bottles take hundreds of years to decompose. We can help by following the three Rs: Reduce, Reuse, and Recycle. Reduce means using less. For example, bring your own water bottle instead of buying plastic ones. Reuse means using things again. Old clothes can be donated to people who need them. Recycle means turning old materials into new products. Together, we can make our planet cleaner and healthier for future generations.',
                viSummary: 'Trái Đất cần được bảo vệ. Rác nhựa mất rất lâu để phân hủy. Ba việc cần làm là giảm dùng, tái sử dụng và tái chế.',
                difficulty: 'hard',
                cefrBand: 'A2',
                wordCount: 95,
                keyVocabulary: [
                    { word: 'environment', viMeaning: 'môi trường', phonetic: '/ɪnˈvaɪrənmənt/' },
                    { word: 'decompose', viMeaning: 'phân hủy', phonetic: '/ˌdiːkəmˈpoʊz/' },
                    { word: 'recycle', viMeaning: 'tái chế', phonetic: '/riːˈsaɪkəl/' },
                    { word: 'donated', viMeaning: 'quyên góp', phonetic: '/ˈdoʊneɪtɪd/' },
                    { word: 'generations', viMeaning: 'thế hệ', phonetic: '/ˌdʒenəˈreɪʃənz/' },
                ],
                sentenceGuides: [
                    guide('Plastic bags and bottles take hundreds of years to decompose.', 'Túi và chai nhựa mất hàng trăm năm để phân hủy.', 'Số liệu định tính trong câu', 'Why is plastic a problem?', 'It takes a very long time to decompose.', ['plastic', 'decompose']),
                    guide('Reduce means using less.', 'Reduce nghĩa là dùng ít hơn.', 'Định nghĩa thuật ngữ', 'What does reduce mean?', 'Using less.', ['reduce', 'less']),
                    guide('Together, we can make our planet cleaner and healthier for future generations.', 'Cùng nhau, chúng ta có thể làm hành tinh sạch hơn và khỏe hơn cho các thế hệ sau.', 'Mục tiêu hành động', 'Who benefits from our actions?', 'Future generations.', ['together', 'generations']),
                ],
                support: support(
                    ['Nhớ 3R: Reduce, Reuse, Recycle.', 'Dự đoán ví dụ của từng R.'],
                    ['Tìm câu định nghĩa từng R.', 'Chạm từ decompose/generations.'],
                    ['Lập kế hoạch 1 việc bảo vệ môi trường tuần này.', 'Nói lại 3R bằng tiếng Việt và tiếng Anh.'],
                ),
                comprehensionChecks: [
                    { question: 'What are the three Rs?', answerHint: 'Reduce, Reuse, and Recycle' },
                    { question: 'What can old clothes be used for?', answerHint: 'They can be donated.' },
                ],
                sourceAlignment: ['Grade 5 environment', 'Definition and example structure'],
            },
        ],
    },
    {
        id: 'authorized-import-shelf',
        title: 'Authorized Textbook Import Shelf',
        titleVi: 'Kệ nhập SGK/textbook có quyền sử dụng',
        category: 'oer',
        subject: 'english',
        grade: 1,
        description: 'Placeholder shelf for purchased or school-provided PDF/EPUB textbooks',
        descriptionVi: 'Kệ dành cho PDF/EPUB gia đình đã mua hoặc được trường cấp quyền',
        coverEmoji: '🔐',
        sourceNote: 'No copyrighted file bundled. This shelf documents the import workflow.',
        licenseStatus: 'licensed_import_required',
        licenseNote: 'Cần bản quyền/giấy phép hoặc tài khoản hợp lệ trước khi mở toàn văn trong app.',
        coverageStatus: 'authorized_import_ready',
        importHint: 'Bước kế tiếp: thêm EPUB/PDF reader cục bộ, checksum file, nguồn cấp quyền và không public lên GitHub Pages.',
        curriculumTags: ['authorized-import', 'pdf', 'epub', 'copyright-gate'],
        passages: [],
    },
];

// ========================================
// HELPERS
// ========================================

export const CATEGORY_LABELS: Record<TextbookCategory, { vi: string; en: string; emoji: string }> = {
    'vn-moe': { vi: 'Bộ GD&ĐT', en: 'Vietnam MOE', emoji: '🇻🇳' },
    cambridge: { vi: 'Cambridge', en: 'Cambridge', emoji: '🎓' },
    oxford: { vi: 'Oxford', en: 'Oxford', emoji: '🌳' },
    singapore: { vi: 'Singapore', en: 'Singapore', emoji: '🇸🇬' },
    oer: { vi: 'Nguồn mở', en: 'Open resources', emoji: '🌍' },
    classic: { vi: 'Kinh điển', en: 'Classics', emoji: '📚' },
};

export const LICENSE_STATUS_LABELS: Record<LibraryLicenseStatus, { vi: string; en: string; tone: string }> = {
    built_in_original: { vi: 'Đọc ngay: bài tự biên soạn', en: 'Read now: original companion', tone: '#16a34a' },
    public_domain: { vi: 'Public domain', en: 'Public domain', tone: '#2563eb' },
    open_license: { vi: 'Nguồn mở/OER', en: 'Open/OER', tone: '#0891b2' },
    link_only: { vi: 'Chỉ dẫn nguồn', en: 'Link only', tone: '#f59e0b' },
    licensed_import_required: { vi: 'Cần bản có quyền', en: 'Licensed import required', tone: '#dc2626' },
};

export const COVERAGE_STATUS_LABELS: Record<LibraryCoverageStatus, { vi: string; en: string }> = {
    read_now: { vi: 'Có bài đọc trong app', en: 'Readable in app' },
    catalog_link_only: { vi: 'Chỉ mục nguồn chính thức', en: 'Official source index' },
    authorized_import_ready: { vi: 'Sẵn sàng nhập file có quyền', en: 'Ready for authorized import' },
    public_domain_full_text: { vi: 'Có thể mở toàn văn public domain', en: 'Public-domain full text ready' },
};

export function getTextbooksByGrade(grade: number): TextbookEntry[] {
    return TEXTBOOK_LIBRARY.filter(book => book.grade === grade);
}

export function getTextbooksByCategory(category: TextbookCategory): TextbookEntry[] {
    return TEXTBOOK_LIBRARY.filter(book => book.category === category);
}

export function getReadableTextbooks(): TextbookEntry[] {
    return TEXTBOOK_LIBRARY.filter(book => book.passages.length > 0);
}

export function getImportReadyTextbooks(): TextbookEntry[] {
    return TEXTBOOK_LIBRARY.filter(book => book.coverageStatus === 'authorized_import_ready');
}

export function getAllPassages(): (TextbookPassage & { bookTitle: string; bookId: string; grade: number })[] {
    return TEXTBOOK_LIBRARY.flatMap(book =>
        book.passages.map(p => ({ ...p, bookTitle: book.title, bookId: book.id, grade: book.grade }))
    );
}

export const LIBRARY_STATS = {
    totalBooks: TEXTBOOK_LIBRARY.length,
    readableBooks: getReadableTextbooks().length,
    importReadyBooks: getImportReadyTextbooks().length,
    totalPassages: TEXTBOOK_LIBRARY.reduce((sum, b) => sum + b.passages.length, 0),
    sourcePackCount: OFFICIAL_LIBRARY_SOURCE_PACKS.length,
    grades: [...new Set(TEXTBOOK_LIBRARY.map(b => b.grade))].sort((a, b) => a - b),
    categories: [...new Set(TEXTBOOK_LIBRARY.map(b => b.category))],
    licenseStatuses: [...new Set(TEXTBOOK_LIBRARY.map(b => b.licenseStatus))],
};
