import type { ResourceAttribution } from '@/types/resource-types';

export type LearningSubjectKey =
    | 'math'
    | 'vietnamese'
    | 'english'
    | 'science'
    | 'hisgeo'
    | 'computing'
    | 'elite'
    | 'ethics'
    | 'art';

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
    | 'duolingo-abc'
    | 'ies-study-learning'
    | 'dunlosky-learning-techniques'
    | 'cast-udl'
    | 'harvard-executive-function'
    | 'self-determination-theory'
    | 'oecd-learning-compass'
    | 'zearn-math'
    | 'st-math'
    | 'dreambox-learning'
    // ── Official Textbook Sets (Vietnam MOE Approved) ──
    | 'sgk-ket-noi-tri-thuc'
    | 'sgk-chan-troi-sang-tao'
    | 'sgk-canh-dieu'
    // ── International Curriculum Frameworks ──
    | 'cambridge-primary-framework'
    | 'cambridge-primary-english'
    | 'cambridge-primary-science'
    | 'singapore-moe-math'
    | 'ib-pyp-framework'
    | 'pearson-intl-primary';

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
    'ies-study-learning': {
        id: 'ies-study-learning',
        title: 'Organizing Instruction and Study to Improve Student Learning',
        provider: 'Institute of Education Sciences / What Works Clearinghouse',
        kind: 'research',
        sourceUrl: 'https://ies.ed.gov/ncee/wwc/PracticeGuide.aspx?sid=1',
        useInApp: 'Căn cứ cho spacing, worked examples, dual coding, concrete-abstract connection, retrieval quiz.',
        retrievedAt: RETRIEVED_AT,
    },
    'dunlosky-learning-techniques': {
        id: 'dunlosky-learning-techniques',
        title: 'Improving Students’ Learning With Effective Learning Techniques',
        provider: 'Psychological Science in the Public Interest / PubMed',
        kind: 'research',
        sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/26173288/',
        useInApp: 'Ưu tiên practice testing và distributed practice; cẩn trọng với kỹ thuật kém bền như đọc lại thụ động.',
        retrievedAt: RETRIEVED_AT,
    },
    'cast-udl': {
        id: 'cast-udl',
        title: 'Universal Design for Learning',
        provider: 'CAST',
        kind: 'research',
        sourceUrl: 'https://www.cast.org/what-we-do/universal-design-for-learning/',
        useInApp: 'Thiết kế nhiều cách tham gia, biểu diễn kiến thức và thể hiện câu trả lời.',
        retrievedAt: RETRIEVED_AT,
    },
    'harvard-executive-function': {
        id: 'harvard-executive-function',
        title: 'Executive Function & Self-Regulation',
        provider: 'Center on the Developing Child at Harvard University',
        kind: 'research',
        sourceUrl: 'https://developingchild.harvard.edu/key_concepts/executive_function/',
        useInApp: 'Luyện trí nhớ làm việc, kiểm soát chú ý, linh hoạt nhận thức qua kế hoạch học ngắn.',
        retrievedAt: RETRIEVED_AT,
    },
    'self-determination-theory': {
        id: 'self-determination-theory',
        title: 'Self-Determination Theory in Education',
        provider: 'Self-Determination Theory organization',
        kind: 'research',
        sourceUrl: 'https://selfdeterminationtheory.org/topics/application-education/',
        useInApp: 'Giữ động lực bằng tự chủ, cảm giác tiến bộ và kết nối với người lớn.',
        retrievedAt: RETRIEVED_AT,
    },
    'oecd-learning-compass': {
        id: 'oecd-learning-compass',
        title: 'OECD Learning Compass 2030',
        provider: 'OECD',
        kind: 'official',
        sourceUrl: 'https://www.oecd.org/en/data/tools/oecd-learning-compass-2030.html',
        useInApp: 'Định hướng student agency, well-being và năng lực tương lai.',
        retrievedAt: RETRIEVED_AT,
    },
    'zearn-math': {
        id: 'zearn-math',
        title: 'Zearn Math Digital Lessons',
        provider: 'Zearn',
        kind: 'benchmark',
        sourceUrl: 'https://about.zearn.org/how-zearn-math-works',
        useInApp: 'Benchmark nhịp bài: fluency, concept development, independent practice.',
        retrievedAt: RETRIEVED_AT,
    },
    'st-math': {
        id: 'st-math',
        title: 'ST Math Visual Instructional Program',
        provider: 'MIND Education',
        kind: 'benchmark',
        sourceUrl: 'https://www.mindeducation.org/programs/st-math/',
        useInApp: 'Benchmark học Toán bằng visual problem solving và spatial-temporal reasoning.',
        retrievedAt: RETRIEVED_AT,
    },
    'dreambox-learning': {
        id: 'dreambox-learning',
        title: 'DreamBox Adaptive Math & Reading',
        provider: 'Discovery Education',
        kind: 'benchmark',
        sourceUrl: 'https://www.discoveryeducation.com/solutions/dreambox-learning',
        useInApp: 'Benchmark adaptive instruction: cá nhân hóa đường học mà không làm phụ huynh quá tải.',
        retrievedAt: RETRIEVED_AT,
    },

    // ══════════════════════════════════════════════════════════════
    // OFFICIAL TEXTBOOK SETS — Vietnam MOE Approved (CTGDPT 2018)
    // 3 bộ SGK chính thức được Bộ GD&ĐT phê duyệt
    // ══════════════════════════════════════════════════════════════
    'sgk-ket-noi-tri-thuc': {
        id: 'sgk-ket-noi-tri-thuc',
        title: 'SGK Kết nối tri thức với cuộc sống (Lớp 1-5)',
        provider: 'Nhà xuất bản Giáo dục Việt Nam (NXB GD)',
        kind: 'official',
        sourceUrl: 'https://www.nxbgd.vn/bo-sach/ket-noi-tri-thuc-voi-cuoc-song',
        useInApp: 'Đối chiếu nội dung bài học, thứ tự mạch kiến thức và bài tập mẫu theo bộ SGK phổ biến nhất.',
        retrievedAt: RETRIEVED_AT,
    },
    'sgk-chan-troi-sang-tao': {
        id: 'sgk-chan-troi-sang-tao',
        title: 'SGK Chân trời sáng tạo (Lớp 1-5)',
        provider: 'Nhà xuất bản Giáo dục Việt Nam (NXB GD)',
        kind: 'official',
        sourceUrl: 'https://www.nxbgd.vn/bo-sach/chan-troi-sang-tao',
        useInApp: 'Bổ sung góc nhìn sáng tạo, hoạt động trải nghiệm và bài tập mở theo approach khám phá.',
        retrievedAt: RETRIEVED_AT,
    },
    'sgk-canh-dieu': {
        id: 'sgk-canh-dieu',
        title: 'SGK Cánh diều (Lớp 1-5)',
        provider: 'NXB Đại học Sư phạm / NXB Đại học Sư phạm TP.HCM',
        kind: 'official',
        sourceUrl: 'https://sachcanhdieu.com/',
        useInApp: 'Cross-reference thứ tự bài học và mạch năng lực với approach thực hành đời sống.',
        retrievedAt: RETRIEVED_AT,
    },

    // ══════════════════════════════════════════════════════════════
    // INTERNATIONAL CURRICULUM FRAMEWORKS
    // Dùng tại các trường quốc tế ở Việt Nam
    // ══════════════════════════════════════════════════════════════
    'cambridge-primary-framework': {
        id: 'cambridge-primary-framework',
        title: 'Cambridge Primary Curriculum Framework (Stages 1-6)',
        provider: 'Cambridge Assessment International Education',
        kind: 'official',
        sourceUrl: 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/',
        useInApp: 'Framework quốc tế cho Toán, Tiếng Anh, Khoa học — đối chiếu chuẩn đầu ra và thinking skills.',
        retrievedAt: RETRIEVED_AT,
    },
    'cambridge-primary-english': {
        id: 'cambridge-primary-english',
        title: 'Cambridge Primary English Curriculum',
        provider: 'Cambridge Assessment International Education',
        kind: 'official',
        sourceUrl: 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/english/',
        useInApp: 'Chuẩn đọc hiểu, viết, nói tiếng Anh theo stages — phonics, comprehension, writing craft.',
        retrievedAt: RETRIEVED_AT,
    },
    'cambridge-primary-science': {
        id: 'cambridge-primary-science',
        title: 'Cambridge Primary Science Curriculum',
        provider: 'Cambridge Assessment International Education',
        kind: 'official',
        sourceUrl: 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/science/',
        useInApp: 'Enquiry-based science: thinking scientifically, biology, chemistry, physics, Earth & space.',
        retrievedAt: RETRIEVED_AT,
    },
    'singapore-moe-math': {
        id: 'singapore-moe-math',
        title: 'Singapore MOE Primary Mathematics Syllabus',
        provider: 'Ministry of Education, Singapore',
        kind: 'official',
        sourceUrl: 'https://www.moe.gov.sg/primary/curriculum/syllabus',
        useInApp: 'Singapore Math framework: CPA approach, bar model, heuristics — phổ biến tại trường quốc tế VN.',
        retrievedAt: RETRIEVED_AT,
    },
    'ib-pyp-framework': {
        id: 'ib-pyp-framework',
        title: 'IB Primary Years Programme (PYP)',
        provider: 'International Baccalaureate Organization',
        kind: 'official',
        sourceUrl: 'https://www.ibo.org/programmes/primary-years-programme/',
        useInApp: 'Inquiry-based, transdisciplinary learning — ATL skills, learner profile, central ideas.',
        retrievedAt: RETRIEVED_AT,
    },
    'pearson-intl-primary': {
        id: 'pearson-intl-primary',
        title: 'Pearson International Primary Programme (iPrimary)',
        provider: 'Pearson Education',
        kind: 'official',
        sourceUrl: 'https://qualifications.pearson.com/en/qualifications/edexcel-international-awards/primary.html',
        useInApp: 'Progression framework cho Maths, English, Science — nhiều trường quốc tế VN sử dụng.',
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
        sourceIds: ['moet-ctgdpt-2018', 'sgk-ket-noi-tri-thuc', 'sgk-chan-troi-sang-tao', 'sgk-canh-dieu', 'common-core-math', 'cambridge-primary-math', 'cambridge-primary-framework', 'singapore-moe-math', 'khan-academy-mastery', 'ixl-diagnostic', 'beast-academy', 'zearn-math', 'st-math', 'dreambox-learning', 'ies-study-learning', 'aero-spacing-retrieval', 'eef-feedback'],
        benchmarkPattern: ['Khan Academy mastery', 'IXL diagnostic path', 'Beast Academy depth', 'Zearn lesson rhythm', 'ST Math visual reasoning', 'Singapore CPA bar model', 'Cambridge thinking & working mathematically'],
        sessionRhythm: ['Nhớ lại 1 câu cũ', 'Làm với hình hoặc đồ vật', 'Giải thích bằng lời', 'Đổi sang tình huống đời sống'],
    },
    vietnamese: {
        subject: 'vietnamese',
        label: 'Tiếng Việt',
        headline: 'Đọc đúng, hiểu ý, dùng từ, kể lại bằng lời của con.',
        coverage: 'Âm chữ, dấu thanh, từ vựng, đọc hiểu, ngữ pháp, viết câu.',
        defaultVisual: '/images/core/books_hd.svg',
        sourceIds: ['moet-ctgdpt-2018', 'sgk-ket-noi-tri-thuc', 'sgk-chan-troi-sang-tao', 'sgk-canh-dieu', 'national-reading-panel', 'ies-foundational-reading', 'ies-study-learning', 'open-library', 'aero-spacing-retrieval', 'eef-metacognition', 'cast-udl'],
        benchmarkPattern: ['Science of reading', 'Evidence-based comprehension', 'Vocabulary depth', 'SGK Kết nối tri thức reading sequence'],
        sessionRhythm: ['Đọc ngắn', 'Tìm chi tiết trong câu', 'Nói nghĩa bằng lời con', 'Viết hoặc kể lại 1 câu'],
    },
    english: {
        subject: 'english',
        label: 'Tiếng Anh',
        headline: 'Nghe - nhìn - nói - dùng trong câu, không học từ rời rạc.',
        coverage: 'Từ vựng chủ đề, ngữ pháp, đọc hiểu, câu giao tiếp, chuyển dịch Việt - Anh.',
        defaultVisual: '/images/english/Pink_lady_and_cross_section.jpg',
        sourceIds: ['moet-ctgdpt-2018', 'sgk-ket-noi-tri-thuc', 'cambridge-primary-english', 'cambridge-primary-framework', 'pearson-intl-primary', 'national-reading-panel', 'ies-foundational-reading', 'duolingo-abc', 'gutendex', 'open-library', 'ies-study-learning', 'eef-feedback', 'cast-udl'],
        benchmarkPattern: ['CEFR-like can-do', 'Duolingo ABC micro-lesson', 'Roleplay', 'Cambridge Primary English stages', 'Pearson iPrimary progression'],
        sessionRhythm: ['Nhìn ảnh', 'Nói từ', 'Đặt câu', 'Dùng vào tình huống gia đình'],
    },
    science: {
        subject: 'science',
        label: 'Khoa học',
        headline: 'Quan sát, dự đoán, kiểm tra, giải thích bằng bằng chứng.',
        coverage: 'Cơ thể, sức khỏe, thực vật, động vật, thời tiết, Trái Đất, vật chất, môi trường.',
        defaultVisual: '/images/science/USGS_WaterCycle_English_ONLINE_20221013.png',
        sourceIds: ['moet-ctgdpt-2018', 'sgk-ket-noi-tri-thuc', 'sgk-chan-troi-sang-tao', 'cambridge-primary-science', 'ngss-three-dimensional', 'wikimedia-commons', 'openverse', 'ies-study-learning', 'eef-metacognition', 'harvard-executive-function'],
        benchmarkPattern: ['NGSS 3D learning', 'Claim-Evidence-Reasoning', 'Hands-on science', 'Cambridge enquiry-based science'],
        sessionRhythm: ['Quan sát ảnh', 'Dự đoán', 'Chọn bằng chứng', 'Nói điều sẽ thử ở nhà'],
    },
    hisgeo: {
        subject: 'hisgeo',
        label: 'Lịch sử & Địa lý',
        headline: 'Nhìn bản đồ, mốc thời gian, nhân vật và hệ quả.',
        coverage: 'Địa lý Việt Nam, mốc lịch sử, nơi chốn, biểu tượng, nguyên nhân - hệ quả.',
        defaultVisual: '/images/history-geo/Ha_Long_Bay_in_2019.jpg',
        sourceIds: ['moet-ctgdpt-2018', 'sgk-ket-noi-tri-thuc', 'sgk-canh-dieu', 'wikimedia-commons', 'openverse', 'eef-metacognition', 'casel-framework', 'oecd-learning-compass'],
        benchmarkPattern: ['C3 inquiry arc adapted for Vietnam', 'Map literacy', 'Timeline reasoning'],
        sessionRhythm: ['Xem ảnh/bản đồ', 'Xác định nơi hoặc thời gian', 'Nói vì sao quan trọng', 'Liên hệ đời sống'],
    },
    computing: {
        subject: 'computing',
        label: 'Tin học',
        headline: 'Tạo, thử, sai, sửa, kể lại thuật toán.',
        coverage: 'Phần cứng, thao tác cơ bản, an toàn mạng, tư duy thuật toán, dữ liệu và AI literacy.',
        defaultVisual: '/images/computing/Scratch_editor_screenshot.png',
        sourceIds: ['moet-ctgdpt-2018', 'csta-k12-standards', 'scratch', 'code-org', 'code-org-ai', 'unicef-ai-children', 'aap-family-media', 'harvard-executive-function', 'cast-udl'],
        benchmarkPattern: ['CSTA standards', 'Scratch create-first', 'Code.org CS pathway', 'Child-safe AI literacy'],
        sessionRhythm: ['Nêu mục tiêu', 'Kéo/thử bằng mô phỏng', 'Debug', 'Nói quy tắc an toàn'],
    },
    elite: {
        subject: 'elite',
        label: 'Năng lực tinh hoa',
        headline: 'Ra quyết định, thương lượng, tự chủ và hiểu hệ thống.',
        coverage: 'Xác suất, tài chính, công dân, thương lượng, đạo đức, phục hồi cảm xúc.',
        defaultVisual: '/images/core/bar_chart.svg',
        sourceIds: ['eef-metacognition', 'casel-framework', 'unicef-ai-children', 'aap-family-media', 'self-determination-theory', 'oecd-learning-compass', 'harvard-executive-function', 'ib-pyp-framework'],
        benchmarkPattern: ['CASEL reflection', 'Civics roleplay', 'Decision quality', 'IB PYP learner profile & ATL skills'],
        sessionRhythm: ['Chọn phương án', 'Giải thích góc nhìn', 'Tìm hệ quả', 'Nói cách sửa lần sau'],
    },
    ethics: {
        subject: 'ethics',
        label: 'Đạo đức',
        headline: 'Nhận diện hành vi, thấu hiểu cảm xúc, thái độ chuẩn mực.',
        coverage: 'Lễ phép, cảm xúc bản thân, tôn trọng người khác.',
        defaultVisual: '/images/core/books_hd.svg',
        sourceIds: ['moet-ctgdpt-2018', 'casel-framework', 'oecd-learning-compass'],
        benchmarkPattern: ['CASEL SEL framework', 'Behavioral reflection'],
        sessionRhythm: ['Tình huống', 'Chọn hành vi đúng', 'Giải thích lý do', 'Liên hệ thực tế'],
    },
    art: {
        subject: 'art',
        label: 'Nghệ thuật',
        headline: 'Màu sắc, âm thanh và cảm thụ cái đẹp.',
        coverage: 'Màu sắc cơ bản, nhịp điệu, sáng tạo.',
        defaultVisual: '/images/core/books_hd.svg',
        sourceIds: ['moet-ctgdpt-2018', 'cast-udl'],
        benchmarkPattern: ['Arts expression', 'Sensory engagement'],
        sessionRhythm: ['Nghe/Nhìn', 'Nhận diện', 'Tương tác', 'Biểu đạt'],
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
    writing: 'vietnamese',
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
    polite: 'ethics',
    express: 'ethics',
    honesty: 'ethics',
    responsibility: 'ethics',
    community: 'ethics',
    basic: 'art',
    music: 'art',
    shapes_drawing: 'art',
    art_appreciation: 'art',
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
        visual: { src: '/images/science/body-health.svg', alt: 'Sơ đồ cơ thể, phổi và hành vi sức khỏe' },
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

    // ── Toán Lớp 1 ──
    count_20: {
        visual: { src: '/images/math/number_bonds.svg', alt: 'Sơ đồ số đến 20 với que chục và đơn vị' },
        masteryTargets: ['Đếm xuôi/ngược trong 20', 'Biết số đứng trước và sau', 'Nhóm được 10 và phần còn lại'],
        commonPitfalls: ['Bỏ sót số khi đếm qua 10', 'Nhầm 12 và 21', 'Chỉ đếm xuôi mà không đếm ngược được'],
    },
    shapes_g1: {
        visual: { src: '/images/math/shapes_2d.svg', alt: 'Các hình phẳng 2D: vuông, tròn, tam giác, chữ nhật' },
        masteryTargets: ['Nhận diện 4 hình cơ bản', 'Nêu ít nhất 1 thuộc tính (cạnh, góc)', 'Phân biệt hình giống nhưng khác thuộc tính'],
        commonPitfalls: ['Chỉ nhận hình khi đặt đúng vị trí quen thuộc', 'Nhầm hình vuông và hình chữ nhật', 'Không đếm cạnh mà đoán theo tên'],
    },
    compare_g1: {
        visual: { src: '/images/math/compare_numbers.svg', alt: 'So sánh số với dấu lớn hơn, nhỏ hơn, bằng' },
        masteryTargets: ['Dùng đúng dấu >, <, =', 'Giải thích bằng lượng hoặc trục số', 'So sánh số có 2 chữ số theo hàng chục trước'],
        commonPitfalls: ['Nhầm chiều dấu > và <', 'So sánh hàng đơn vị trước hàng chục', 'Không liên hệ với lượng thực tế'],
    },
    ordinal_spatial: {
        visual: { src: '/images/math/ordinal_positions.svg', alt: 'Hàng các vật thể với vị trí thứ nhất, thứ hai, thứ ba' },
        masteryTargets: ['Dùng đúng thứ nhất/thứ hai/thứ ba', 'Xác định trái/phải/trước/sau', 'Hiểu kết quả thay đổi khi đổi mốc nhìn'],
        commonPitfalls: ['Đếm vị trí từ sai đầu', 'Nhầm trái/phải khi đổi hướng nhìn', 'Không chỉ rõ mốc tham chiếu'],
    },

    // ── Toán Lớp 2 ──
    add_sub_carry: {
        visual: { src: '/images/math/column_addition.svg', alt: 'Phép cộng cột dọc có nhớ với que chục' },
        masteryTargets: ['Đặt tính đúng hàng chục và đơn vị', 'Giải thích nhớ 1 sang hàng chục', 'Kiểm tra bằng phép ngược'],
        commonPitfalls: ['Quên nhớ 1 khi cộng', 'Đặt sai hàng trong tính cột dọc', 'Mượn chục nhưng không trừ ở hàng chục'],
    },
    even_odd: {
        visual: { src: '/images/math/even_odd.svg', alt: 'Minh họa số chẵn và số lẻ bằng cặp đối xứng' },
        masteryTargets: ['Phân biệt chẵn/lẻ bằng chia cặp', 'Dùng chữ số cuối để kiểm tra nhanh', 'Áp dụng vào chia nhóm đồ vật'],
        commonPitfalls: ['Nhớ quy tắc nhưng không hiểu vì sao', 'Nhầm số 0 không phải chẵn', 'Không kiểm tra bằng thực tế chia cặp'],
    },
    intro_mult: {
        visual: { src: '/images/math/intro_multiplication.svg', alt: 'Nhóm đồ vật bằng nhau minh họa phép nhân' },
        masteryTargets: ['Nhận ra nhóm bằng nhau', 'Viết phép nhân tương ứng với hình', 'Phân biệt nhóm bằng nhau và không bằng nhau'],
        commonPitfalls: ['Nhầm nhân với cộng khi nhóm không đều', 'Đếm tổng thay vì nhìn cấu trúc nhóm', 'Không liên hệ phép nhân với phép cộng lặp'],
    },
    intro_fractions: {
        visual: { src: '/images/math/intro_fractions.svg', alt: 'Hình tròn chia đều thành 2 và 4 phần bằng nhau' },
        masteryTargets: ['Nhận biết 1/2 và 1/4 trên hình', 'Kiểm tra các phần có bằng nhau không', 'Liên hệ phân số với chia đều đồ vật thật'],
        commonPitfalls: ['Gọi là 1/2 nhưng phần chia không đều', 'Nhầm tử số và mẫu số', 'Chỉ thuộc tên mà không hiểu nghĩa'],
    },
    clock: {
        visual: { src: '/images/math/clock_reading.svg', alt: 'Đồng hồ kim với giờ đúng và nửa giờ' },
        masteryTargets: ['Đọc giờ đúng và nửa giờ', 'Hiểu kim giờ và kim phút', 'Nói được thời gian trước/sau một khoảng'],
        commonPitfalls: ['Nhầm kim giờ và kim phút', 'Đọc sai giờ khi kim giờ nằm giữa hai số', 'Không phân biệt AM/PM'],
    },
    measure_cm: {
        visual: { src: '/images/math/ruler_measurement.svg', alt: 'Thước kẻ đo vật bằng cm với mốc 0 rõ ràng' },
        masteryTargets: ['Đặt thước từ mốc 0 đúng cách', 'Đọc kết quả đo bằng cm', 'Ước lượng trước khi đo thật'],
        commonPitfalls: ['Không đặt mốc 0 tại đầu vật', 'Đọc sai vạch chia trên thước', 'Đo bằng đơn vị không chuẩn mà không biết so sánh'],
    },
    word_g2: {
        visual: { src: '/images/math/word_problem.svg', alt: 'Bài toán có lời văn với sơ đồ phần-tổng' },
        masteryTargets: ['Xác định dữ kiện và câu hỏi', 'Chọn phép tính phù hợp (cộng/trừ)', 'Trả lời bằng câu có đơn vị'],
        commonPitfalls: ['Chọn phép tính theo từ khóa thay vì hiểu ý', 'Quên viết đơn vị trong đáp án', 'Không đọc hết đề'],
    },

    // ── Toán Lớp 3 ──
    mult_div: {
        visual: { src: '/images/core/multiplication.svg', alt: 'Bảng nhân chia cơ bản với nhóm đồ vật' },
        masteryTargets: ['Thuộc bảng nhân 2-9', 'Hiểu phép chia là phép ngược của nhân', 'Giải thích bằng nhóm bằng nhau'],
        commonPitfalls: ['Thuộc bảng nhân nhưng không hiểu cấu trúc', 'Nhầm chia cho 0', 'Không kiểm tra bằng phép ngược'],
    },
    perimeter: {
        visual: { src: '/images/core/square.svg', alt: 'Hình vuông với các cạnh được đánh dấu độ dài' },
        masteryTargets: ['Cộng đúng tất cả các cạnh', 'Nêu đơn vị độ dài trong kết quả', 'Phân biệt chu vi (đường bao) với diện tích (phần trong)'],
        commonPitfalls: ['Quên cộng cạnh bị khuất', 'Nhầm chu vi và diện tích', 'Không ghi đơn vị đo'],
    },
    patterns: {
        visual: { src: '/images/core/fibonacci.svg', alt: 'Dãy số có quy luật tăng dần' },
        masteryTargets: ['Phát hiện quy luật trong dãy số', 'Tìm đúng số tiếp theo', 'Nói rõ quy tắc tạo dãy bằng lời'],
        commonPitfalls: ['Đoán số tiếp theo mà không kiểm tra quy luật', 'Chỉ nhìn 2 số thay vì toàn dãy', 'Nhầm khi quy luật thay đổi giữa chừng'],
    },
    word_g3: {
        visual: { src: '/images/core/girl_thinking.svg', alt: 'Học sinh đang suy nghĩ giải bài toán nhiều bước' },
        masteryTargets: ['Tách bài thành từng bước nhỏ', 'Không dùng dữ kiện thừa', 'Ghi câu trả lời đúng đơn vị'],
        commonPitfalls: ['Trộn dữ kiện bước 1 và bước 2', 'Dùng tất cả số trong đề mà không chọn lọc', 'Quên trả lời đúng câu hỏi cuối'],
    },

    // ── Toán Lớp 4 ──
    fractions: {
        visual: { src: '/images/core/fraction_1_4.svg', alt: 'Phân số trên trục số và hình tròn chia phần' },
        masteryTargets: ['Nhận phân số tương đương đơn giản', 'So sánh phân số bằng mô hình hoặc trục số', 'Cộng trừ phân số cùng mẫu'],
        commonPitfalls: ['Nhầm tử và mẫu khi so sánh', 'Cộng cả tử lẫn mẫu', 'Không rút gọn kết quả'],
    },
    area: {
        visual: { src: '/images/core/square.svg', alt: 'Hình chữ nhật với lưới ô vuông bên trong' },
        masteryTargets: ['Tính diện tích bằng đơn vị vuông', 'Phân biệt diện tích với chu vi', 'Tách hình phức tạp thành hình đơn giản'],
        commonPitfalls: ['Nhầm diện tích với chu vi', 'Quên ghi đơn vị vuông (cm²)', 'Đếm ô vuông sai khi hình không đầy đủ'],
    },
    large_numbers: {
        visual: { src: '/images/core/number_line.svg', alt: 'Trục số với các mốc hàng nghìn, hàng triệu' },
        masteryTargets: ['Đọc viết số có 5-6 chữ số', 'So sánh theo hàng từ trái sang phải', 'Tách nhóm chữ số để đọc dễ hơn'],
        commonPitfalls: ['Đọc sai tên hàng (nghìn, triệu)', 'So sánh số dài bằng hàng cuối thay vì đầu', 'Viết thiếu chữ số 0 giữ hàng'],
    },
    mass: {
        visual: { src: '/images/core/weight.svg', alt: 'Cân bàn với vật được cân bằng gam và kg' },
        masteryTargets: ['Chọn đơn vị phù hợp (g hoặc kg)', 'Đổi đơn vị cơ bản (1 kg = 1000 g)', 'Ước lượng khối lượng vật quen thuộc'],
        commonPitfalls: ['Nhầm g và kg cho vật nặng/nhẹ', 'Quên nhân/chia 1000 khi đổi đơn vị', 'Ước lượng phi thực tế (quả táo 10 kg)'],
    },

    // ── Toán Lớp 5 ──
    decimals: {
        visual: { src: '/images/core/number_line.svg', alt: 'Số thập phân trên trục số từ 0 đến 1' },
        masteryTargets: ['Đọc viết số thập phân 1-2 chữ số', 'So sánh theo hàng phần mười/phần trăm', 'Liên hệ với phân số đơn giản (0,5 = 1/2)'],
        commonPitfalls: ['Nghĩ 0,9 < 0,12 vì 9 < 12', 'Không canh hàng dấu phẩy khi cộng trừ', 'Nhầm phần mười với phần trăm'],
    },
    percent: {
        visual: { src: '/images/core/percent.svg', alt: 'Biểu đồ tròn chia 100 phần minh họa phần trăm' },
        masteryTargets: ['Hiểu phần trăm là phần trên 100', 'Tính 10%, 25%, 50%, 75% nhanh', 'Giải thích bằng hình tròn hoặc thanh'],
        commonPitfalls: ['Không hiểu 100% = toàn bộ', 'Tính phần trăm nhưng quên chia cho 100', 'Nhầm phần trăm với phần nghìn'],
    },
    ratio: {
        visual: { src: '/images/core/ratio.svg', alt: 'Hai nhóm đồ vật so sánh tỉ số a:b' },
        masteryTargets: ['Viết tỉ số dạng a:b', 'Tạo tỉ số tương đương', 'Phân biệt tỉ số với hiệu số'],
        commonPitfalls: ['Nhầm tỉ số a:b với phép trừ a-b', 'Đảo thứ tự khi viết tỉ số', 'Không rút gọn tỉ số'],
    },
    charts: {
        visual: { src: '/images/core/bar_chart.svg', alt: 'Biểu đồ cột với nhãn trục và dữ liệu' },
        masteryTargets: ['Đọc nhãn trục và giá trị', 'So sánh dữ liệu giữa các cột/mục', 'Nêu kết luận có bằng chứng từ biểu đồ'],
        commonPitfalls: ['Bỏ qua đơn vị trên trục', 'Đọc sai giá trị khi trục không bắt đầu từ 0', 'Kết luận mà không trích dẫn số liệu'],
    },

    // ── Tiếng Việt ──
    alphabet: {
        visual: { src: '/images/core/letters_vn.svg', alt: 'Bảng chữ cái tiếng Việt 29 chữ' },
        masteryTargets: ['Nhận mặt chữ và nói tên/âm', 'Tìm chữ trong từ quen thuộc', 'Không nhầm các chữ gần giống (b/d, p/q)'],
        commonPitfalls: ['Nhầm tên chữ với âm đọc', 'Không phân biệt b-d, p-q khi viết', 'Chỉ thuộc theo thứ tự mà không nhận mặt riêng lẻ'],
    },
    tones: {
        visual: { src: '/images/core/letters_vn.svg', alt: 'Sáu thanh tiếng Việt với dấu và ví dụ' },
        masteryTargets: ['Đọc đúng 6 thanh', 'Đặt dấu đúng vị trí trên nguyên âm', 'Nhận ra đổi thanh thì đổi nghĩa'],
        commonPitfalls: ['Nhầm thanh hỏi và thanh ngã', 'Đặt dấu sai nguyên âm trong vần', 'Đọc thanh sai làm đổi nghĩa từ'],
    },
    vocabulary: {
        visual: { src: '/images/core/open_book.svg', alt: 'Sách mở với từ vựng chủ đề và hình minh họa' },
        masteryTargets: ['Giải thích nghĩa từ bằng lời mình', 'Dùng từ mới trong câu', 'Phân biệt từ gần nghĩa và trái nghĩa'],
        commonPitfalls: ['Học từ rời rạc không gắn ngữ cảnh', 'Giải thích bằng cách đọc lại định nghĩa', 'Dùng sai từ do nhầm nghĩa bóng'],
    },
    grammar: {
        visual: { src: '/images/core/pencil_icon.svg', alt: 'Bút chì đang viết câu với chủ ngữ và vị ngữ' },
        masteryTargets: ['Nhận biết chủ ngữ - vị ngữ', 'Dùng dấu câu hợp lý (chấm, phẩy, hỏi)', 'Viết câu rõ nghĩa, đủ thành phần'],
        commonPitfalls: ['Viết câu thiếu chủ ngữ hoặc vị ngữ', 'Lạm dụng dấu phẩy thay dấu chấm', 'Câu dài không rõ ý chính'],
    },

    // ── Tiếng Anh ──
    grammar_en: {
        visual: { src: '/images/core/pencil_icon.svg', alt: 'Cấu trúc câu tiếng Anh: Subject + Verb + Object' },
        masteryTargets: ['Chọn mẫu câu S+V+O đúng', 'Chia động từ to be và thì hiện tại đơn', 'Đổi câu khẳng định thành câu hỏi/phủ định'],
        commonPitfalls: ['Nhầm thứ tự từ theo tiếng Việt', 'Quên thêm s/es cho ngôi thứ 3', 'Dùng sai trợ động từ do/does'],
    },
    reading_en: {
        visual: { src: '/images/core/books_hd.svg', alt: 'Sách tiếng Anh mở với đoạn văn ngắn' },
        masteryTargets: ['Tìm ý chính của đoạn ngắn', 'Tìm chi tiết dựa vào câu hỏi who/what/where', 'Đoán nghĩa từ mới theo ngữ cảnh'],
        commonPitfalls: ['Dịch từng chữ thay vì hiểu ý', 'Bỏ cuộc khi gặp từ lạ thay vì đoán nghĩa', 'Trả lời bằng kiến thức ngoài bài'],
    },
    sentence_en: {
        visual: { src: '/images/core/pencil_icon.svg', alt: 'Các từ tiếng Anh được sắp xếp thành câu hoàn chỉnh' },
        masteryTargets: ['Sắp xếp từ thành câu đúng ngữ pháp', 'Viết câu có nghĩa rõ ràng', 'Tự thay từ để tạo câu mới cùng mẫu'],
        commonPitfalls: ['Sắp xếp theo thứ tự tiếng Việt', 'Quên viết hoa đầu câu và dấu chấm cuối', 'Câu đúng ngữ pháp nhưng vô nghĩa'],
    },

    // ── Khoa học ──
    nature: {
        visual: { src: '/images/science/Double-alaskan-rainbow.jpg', alt: 'Cầu vồng đôi trong thiên nhiên' },
        masteryTargets: ['Phân loại thực vật/động vật cơ bản', 'Nêu nhu cầu sống (nước, ánh sáng, thức ăn)', 'Dùng bằng chứng quan sát để mô tả'],
        commonPitfalls: ['Phân loại theo màu sắc thay vì đặc điểm sinh học', 'Nhầm nhu cầu của thực vật và động vật', 'Mô tả chung chung không có chi tiết quan sát'],
    },
    matter_energy: {
        visual: { src: '/images/science/Double-alaskan-rainbow.jpg', alt: 'Ánh sáng tạo cầu vồng — năng lượng và vật chất' },
        masteryTargets: ['Nêu tính chất vật chất (rắn/lỏng/khí)', 'Nhận biết sự biến đổi (tan, đông, bay hơi)', 'Giải thích bằng bằng chứng quan sát'],
        commonPitfalls: ['Nhầm thay đổi vật lý và hóa học', 'Không phân biệt nguồn năng lượng', 'Mô tả hiện tượng mà không giải thích nguyên nhân'],
    },
    ecosystem: {
        visual: { src: '/images/science/USGS_WaterCycle_English_ONLINE_20221013.png', alt: 'Vòng tuần hoàn nước trong hệ sinh thái' },
        masteryTargets: ['Nêu quan hệ sinh vật - môi trường', 'Dự đoán hệ quả khi mất một mắt xích', 'Đề xuất hành vi bảo vệ môi trường'],
        commonPitfalls: ['Nghĩ chuỗi thức ăn chỉ đi một chiều', 'Không thấy con người là phần của hệ sinh thái', 'Đề xuất bảo vệ chung chung không có hành động cụ thể'],
    },

    // ── Tin học ──
    hardware: {
        visual: { src: '/images/computing/NXP_PCF8577C_LCD_driver_with_I_C2_B2C__Colour_Corrected_.jpg', alt: 'Bo mạch phần cứng máy tính với chip xử lý' },
        masteryTargets: ['Nhận biết các bộ phận: CPU, RAM, ổ cứng, màn hình', 'Nêu chức năng nhập/xử lý/xuất/lưu trữ', 'Không nhầm phần cứng với phần mềm'],
        commonPitfalls: ['Gọi tất cả là "máy tính" mà không biết bộ phận', 'Nhầm phần mềm (app) với phần cứng (thiết bị)', 'Không biết dữ liệu lưu ở đâu'],
    },

    // ── Đạo đức ──
    polite_greet: {
        visual: { src: '/images/core/books_hd.svg', alt: 'Hình ảnh trẻ em chào hỏi lễ phép' },
        masteryTargets: ['Biết chào hỏi phù hợp với người lớn và bạn bè', 'Hiểu lý do vì sao cần chào hỏi lễ phép', 'Thực hành lời chào trong tình huống thật'],
        commonPitfalls: ['Chào trống không', 'Ngại ngùng không dám chào'],
    },
    express_emotion: {
        visual: { src: '/images/core/books_hd.svg', alt: 'Hình ảnh biểu cảm khuôn mặt' },
        masteryTargets: ['Nhận biết được cảm xúc của bản thân (vui, buồn, tức giận)', 'Biết cách thể hiện cảm xúc mà không làm tổn thương người khác', 'Chọn được cách tự điều chỉnh trước khi phản ứng'],
        commonPitfalls: ['Ném đồ đạc khi tức giận', 'Giấu nhẹm cảm xúc buồn bã'],
    },

    // ── Nghệ thuật ──
    basic_colors: {
        visual: { src: '/images/core/books_hd.svg', alt: 'Bảng pha màu cơ bản' },
        masteryTargets: ['Nhận biết 3 màu cơ bản (đỏ, vàng, xanh lam)', 'Biết sự pha trộn tạo ra màu mới (đỏ + vàng = cam)', 'Nói được màu tạo cảm giác gì trong tranh'],
        commonPitfalls: ['Gọi nhầm tên màu', 'Tô màu tràn viền không kiểm soát'],
    },
    music_rhythm: {
        visual: { src: '/images/core/books_hd.svg', alt: 'Nốt nhạc và nhịp điệu' },
        masteryTargets: ['Nhận biết nhịp điệu bài hát (nhanh, chậm)', 'Vỗ tay đúng nhịp 2/4', 'Phân biệt phách mạnh và phách nhẹ qua vận động'],
        commonPitfalls: ['Vỗ tay không đều', 'Vỗ tay theo lời ca thay vì nhịp/phách'],
    },

    // ── Đạo đức (mở rộng G3-5) ──
    honesty: {
        visual: { src: '/images/core/books_hd.svg', alt: 'Tình huống trung thực trong lớp học' },
        masteryTargets: ['Hiểu giá trị của trung thực', 'Dũng cảm nhận lỗi', 'Không gian lận trong kiểm tra'],
        commonPitfalls: ['Nghĩ nói dối nhỏ không sao', 'Đổ lỗi cho người khác'],
    },
    responsibility: {
        visual: { src: '/images/core/books_hd.svg', alt: 'Trách nhiệm hoàn thành nhiệm vụ' },
        masteryTargets: ['Hoàn thành nhiệm vụ được giao', 'Giữ lời hứa', 'Chịu trách nhiệm với hành động'],
        commonPitfalls: ['Tránh né việc khó', 'Quên lời hứa khi có việc thích hơn'],
    },
    community_empathy: {
        visual: { src: '/images/core/books_hd.svg', alt: 'Đồng cảm và chia sẻ cộng đồng' },
        masteryTargets: ['Biết đặt mình vào vị trí người khác', 'Chủ động giúp đỡ người yếu thế', 'Chia sẻ trong khả năng'],
        commonPitfalls: ['Thờ ơ với khó khăn của người xung quanh', 'Chỉ giúp khi bị bắt buộc'],
    },

    // ── Nghệ thuật (mở rộng G3-5) ──
    shapes_drawing: {
        visual: { src: '/images/core/books_hd.svg', alt: 'Các loại đường nét và hình khối' },
        masteryTargets: ['Phân biệt đường thẳng, cong, gấp khúc', 'Nhận biết hình 2D và 3D', 'Hiểu bố cục xa gần'],
        commonPitfalls: ['Không phân biệt hình phẳng và hình khối', 'Chưa biết cách sắp xếp bố cục'],
    },
    music_instruments: {
        visual: { src: '/images/core/books_hd.svg', alt: 'Nhạc cụ truyền thống Việt Nam' },
        masteryTargets: ['Phân loại nhạc cụ theo bộ dây, hơi, gõ', 'Nhận biết đàn tranh, đàn bầu, sáo trúc', 'Biết đàn bầu chỉ có 1 dây'],
        commonPitfalls: ['Nhầm nhạc cụ VN với nhạc cụ phương Tây', 'Không phân biệt nhóm nhạc cụ'],
    },
    art_appreciation: {
        visual: { src: '/images/core/books_hd.svg', alt: 'Cảm thụ tranh và âm nhạc' },
        masteryTargets: ['Quan sát tổng thể rồi chi tiết', 'Phân biệt màu ấm/lạnh', 'Nêu cảm nhận cá nhân có lý do'],
        commonPitfalls: ['Chỉ nói thích/không thích mà không giải thích', 'Không chú ý bố cục và màu sắc chủ đạo'],
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
