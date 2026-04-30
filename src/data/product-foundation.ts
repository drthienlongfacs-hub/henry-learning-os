export type FoundationSourceKind =
    | 'local_blueprint'
    | 'repo_handoff'
    | 'official_curriculum'
    | 'learning_science'
    | 'software_quality'
    | 'ai_safety_privacy'
    | 'competitive_product';

export type FoundationSourceLocatorKind = 'local_file' | 'repo_file' | 'official_url' | 'benchmark_url';
export type FoundationRequirementStatus = 'implemented' | 'partial' | 'spec_ready' | 'blocked';
export type FoundationPriority = 'P0' | 'P1' | 'P2';
export type FoundationGateStatus = 'passed' | 'partial' | 'blocked';

export interface FoundationSource {
    id: string;
    label: string;
    kind: FoundationSourceKind;
    locatorKind: FoundationSourceLocatorKind;
    locator: string;
    foundationUse: string;
}

export interface ProductFoundationPositioning {
    productName: string;
    category: string;
    oneLine: string;
    primaryUser: string;
    purpose: string;
    northStarOutcome: string;
    notThis: string[];
    operatingPrinciples: string[];
    successDefinition: string;
}

export interface FoundationLayer {
    id: string;
    label: string;
    purpose: string;
    nonNegotiables: string[];
    currentAssets: string[];
    missingGates: string[];
    sourceIds: string[];
}

export interface FoundationRequirement {
    id: string;
    priority: FoundationPriority;
    status: FoundationRequirementStatus;
    title: string;
    requirement: string;
    rationale: string;
    acceptanceCriteria: string[];
    currentEvidence: string[];
    nextGate: string;
    sourceIds: string[];
}

export interface FoundationFeatureCoverage {
    id: string;
    label: string;
    status: FoundationRequirementStatus;
    userValue: string;
    currentSurface: string;
    requiredForMaturity: string;
    sourceIds: string[];
}

export interface FoundationClaimGate {
    id: string;
    label: string;
    status: FoundationGateStatus;
    allowedClaim: string;
    blockedClaim: string;
    requiredEvidence: string;
    sourceIds: string[];
}

export interface FoundationQualityAxis {
    id: string;
    label: string;
    benchmarkFrame: string;
    productRequirement: string;
    measurableGate: string;
    sourceIds: string[];
}

export const PRODUCT_FOUNDATION_AS_OF = '2026-04-30';

export const PRODUCT_FOUNDATION_POSITIONING: ProductFoundationPositioning = {
    productName: 'Henry Learning OS',
    category: 'Family-first Learning Evidence OS',
    oneLine: 'Giúp Henry trở thành người tự học suốt đời, biết dùng AI để suy nghĩ sâu hơn, không dùng AI để làm hộ.',
    primaryUser: 'Henry sinh năm 2020, bắt đầu lớp 1 năm 2026 tại TP.HCM; phụ huynh là mentor và người quan sát.',
    purpose: 'Xây một hệ điều hành học tập cá nhân cho hành trình 6-18 tuổi: bám chương trình Việt Nam, học bằng chứng, có AI an toàn, có phụ huynh đồng hành và có dữ liệu thật để cải tiến.',
    northStarOutcome: 'Mọi quyết định sản phẩm phải giúp con đọc-viết tốt, tư duy toán học vững, dùng tiếng Anh thật, biết tự học, sửa lỗi, phản tư và tạo portfolio 12 năm.',
    notThis: [
        'Không phải chatbot tự do cho trẻ dưới 13 tuổi.',
        'Không phải app luyện điểm, giữ streak hoặc bảng xếp hạng công khai.',
        'Không phải công cụ làm bài hộ, viết văn hoặc thay giáo viên/phụ huynh.',
        'Không phải mạng xã hội hoặc nền tảng khai thác dữ liệu trẻ em.',
        'Không phải bằng chứng hiệu quả học tập nếu chưa có cohort, pre/post và retention thật.',
    ],
    operatingPrinciples: [
        'AI phải hỏi gợi mở trước khi giải thích; mỗi lần hỗ trợ phải có mức hỗ trợ và lý do.',
        'Mỗi item học tập cần truy vết được môn, lớp, mạch nội dung, source version và evidence cần lưu.',
        'Dữ liệu dùng để hiểu con và điều chỉnh học tập, không dùng để gán nhãn hay tạo áp lực so sánh.',
        'Mỗi claim mạnh phải đi qua evidence gate: source, item traceability, human review, calibration, pilot.',
        'Phụ huynh nhận hành động ngắn, cụ thể, có thể làm tại nhà; dashboard không được chỉ là biểu đồ.',
    ],
    successDefinition: 'Một tính năng chỉ được xem là trưởng thành khi có chuẩn học tập, dữ liệu attempt thật, vòng sửa lỗi/ôn tập, hành động phụ huynh, safety gate, evidence gate và test/build/deploy gate.',
};

export const PRODUCT_FOUNDATION_SOURCE_REGISTRY: FoundationSource[] = [
    {
        id: 'docx-master-blueprint',
        label: 'Henry learning super app.docx',
        kind: 'local_blueprint',
        locatorKind: 'local_file',
        locator: '/Users/mac/Documents/app cho henry/Henry learning super app.docx',
        foundationUse: 'Blueprint sản phẩm 6-18 tuổi: 5 layer, AI không làm hộ, data-driven system, 20 must-have features và AI safety.',
    },
    {
        id: 'zip-dev-handoff',
        label: 'long_learning_os_dev_handoff_resource_fullstack.zip',
        kind: 'repo_handoff',
        locatorKind: 'local_file',
        locator: '/Users/mac/Downloads/long_learning_os_dev_handoff_resource_fullstack.zip',
        foundationUse: 'Handoff kỹ thuật 38 file: PRD, feature spec, architecture, policies, benchmarks, schemas và backlog.',
    },
    {
        id: 'repo-prd',
        label: 'Repo PRD',
        kind: 'repo_handoff',
        locatorKind: 'repo_file',
        locator: 'docs/dev-handoff/docs/PRD.md',
        foundationUse: 'Chốt vision family-first, non-goals, product pillars, MVP scope và acceptance criteria.',
    },
    {
        id: 'repo-architecture',
        label: 'Repo architecture',
        kind: 'repo_handoff',
        locatorKind: 'repo_file',
        locator: 'docs/dev-handoff/architecture/ARCHITECTURE.md',
        foundationUse: 'Chốt component boundary: child app, parent app, AI orchestration, learning engine, content engine, data layer.',
    },
    {
        id: 'repo-current-benchmark',
        label: 'Full-stack competitive benchmark',
        kind: 'repo_handoff',
        locatorKind: 'repo_file',
        locator: 'docs/FULLSTACK_COMPETITIVE_BENCHMARK_2026-04-29.md',
        foundationUse: 'Scorecard 60/100, gate lên 100/100, scope tiểu học, item traceability và no-overclaim.',
    },
    {
        id: 'repo-curriculum-map',
        label: 'Primary curriculum map',
        kind: 'repo_handoff',
        locatorKind: 'repo_file',
        locator: 'src/data/primary-curriculum-map.ts',
        foundationUse: '47 topic lớp 1-5 có môn, lớp, mạch nội dung, ví dụ bài, misconception và evidence fields.',
    },
    {
        id: 'moet-ctgdpt-2018',
        label: 'Bộ GDĐT - Chương trình GDPT 2018',
        kind: 'official_curriculum',
        locatorKind: 'official_url',
        locator: 'https://moet.gov.vn/tintuc/pages/tin-hoat-dong-cua-bo.aspx?ItemID=5755',
        foundationUse: 'Nguồn chương trình tổng thể và môn học làm chuẩn gốc cho lớp 1-5.',
    },
    {
        id: 'moet-tt17-2025',
        label: 'Thông tư 17/2025/TT-BGDĐT',
        kind: 'official_curriculum',
        locatorKind: 'official_url',
        locator: 'https://moet.gov.vn/van-ban/vanban/Pages/chi-tiet-van-ban.aspx?ItemID=1600',
        foundationUse: 'Nguồn cập nhật năm 2025, bắt buộc re-audit nội dung chịu tác động.',
    },
    {
        id: 'moet-primary-scope-2018',
        label: 'Bộ GDĐT - phạm vi giáo dục tiểu học',
        kind: 'official_curriculum',
        locatorKind: 'official_url',
        locator: 'https://moet.gov.vn/tintuc/Pages/CT-GDPT-Moi.aspx?ItemID=5756',
        foundationUse: 'Chốt 11 môn/hoạt động bắt buộc và 2 môn tự chọn ở bậc tiểu học.',
    },
    {
        id: 'eef-metacognition',
        label: 'EEF metacognition and self-regulation',
        kind: 'learning_science',
        locatorKind: 'official_url',
        locator: 'https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/metacognition-and-self-regulation',
        foundationUse: 'Plan-monitor-evaluate, self-regulated learning và phản tư là lõi thiết kế session.',
    },
    {
        id: 'wwc-standards',
        label: 'What Works Clearinghouse Procedures and Standards Handbook',
        kind: 'learning_science',
        locatorKind: 'official_url',
        locator: 'https://ies.ed.gov/ncee/WWC/Handbooks',
        foundationUse: 'Khung yêu cầu bằng chứng nghiên cứu trước khi claim hiệu quả học tập.',
    },
    {
        id: 'cast-udl',
        label: 'CAST Universal Design for Learning',
        kind: 'learning_science',
        locatorKind: 'official_url',
        locator: 'https://udlguidelines.cast.org/',
        foundationUse: 'Nhiều cách tiếp cận, nhiều cách thể hiện và nhiều cách tham gia cho trẻ khác nhau.',
    },
    {
        id: 'iso-25010',
        label: 'ISO/IEC 25010:2023 product quality model',
        kind: 'software_quality',
        locatorKind: 'official_url',
        locator: 'https://www.iso.org/standard/78176.html',
        foundationUse: 'Khung chất lượng sản phẩm phần mềm: dùng để đặt gate functional suitability, reliability, usability, security, maintainability.',
    },
    {
        id: 'wcag-22',
        label: 'W3C WCAG 2.2',
        kind: 'software_quality',
        locatorKind: 'official_url',
        locator: 'https://www.w3.org/TR/WCAG22/',
        foundationUse: 'Gate accessibility cho UI trẻ em và phụ huynh: text, focus, target size, mobile và cognition support.',
    },
    {
        id: 'nist-ai-rmf',
        label: 'NIST AI Risk Management Framework',
        kind: 'ai_safety_privacy',
        locatorKind: 'official_url',
        locator: 'https://www.nist.gov/itl/ai-risk-management-framework',
        foundationUse: 'Khung quản trị rủi ro AI: map, measure, manage, govern cho AI tutor và AI safety guardian.',
    },
    {
        id: 'unicef-ai-children',
        label: 'UNICEF policy guidance on AI and children',
        kind: 'ai_safety_privacy',
        locatorKind: 'official_url',
        locator: 'https://www.unicef.org/innocenti/reports/policy-guidance-ai-children',
        foundationUse: 'Yêu cầu AI lấy trẻ em làm trung tâm: an toàn, riêng tư, công bằng, minh bạch, phúc lợi và inclusion.',
    },
    {
        id: 'coppa',
        label: 'FTC COPPA Rule',
        kind: 'ai_safety_privacy',
        locatorKind: 'official_url',
        locator: 'https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa',
        foundationUse: 'Privacy baseline khi xử lý dữ liệu trẻ dưới 13 tuổi trong bối cảnh US-facing product.',
    },
    {
        id: 'ferpa',
        label: 'US Department of Education FERPA',
        kind: 'ai_safety_privacy',
        locatorKind: 'official_url',
        locator: 'https://studentprivacy.ed.gov/ferpa',
        foundationUse: 'Student record privacy baseline nếu về sau tích hợp nhà trường hoặc báo cáo học tập.',
    },
    {
        id: 'khanmigo',
        label: 'Khanmigo / Khan Academy',
        kind: 'competitive_product',
        locatorKind: 'benchmark_url',
        locator: 'https://blog.khanacademy.org/ai-tutor-tutoring-khanmigo-kl/',
        foundationUse: 'Benchmark AI tutor gợi mở, không chỉ đưa đáp án.',
    },
    {
        id: 'ixl-diagnostic',
        label: 'IXL Real-Time Diagnostic',
        kind: 'competitive_product',
        locatorKind: 'benchmark_url',
        locator: 'https://www.ixl.com/diagnostic/teacher',
        foundationUse: 'Benchmark diagnostic và action plan cá nhân hóa.',
    },
    {
        id: 'dreambox-adaptivity',
        label: 'DreamBox Math adaptivity',
        kind: 'competitive_product',
        locatorKind: 'benchmark_url',
        locator: 'https://dreamboxlearning.zendesk.com/hc/en-us/articles/27281596241043-DreamBox-Math-Continuous-Assessment-Adaptivity',
        foundationUse: 'Benchmark continuous assessment và adaptive learning path.',
    },
    {
        id: 'zearn-reporting',
        label: 'Zearn reporting suite',
        kind: 'competitive_product',
        locatorKind: 'benchmark_url',
        locator: 'https://help.zearn.org/hc/en-us/articles/29008224450967-Zearn-reporting-suite',
        foundationUse: 'Benchmark parent/teacher reporting và cohort operation.',
    },
];

export const PRODUCT_FOUNDATION_LAYERS: FoundationLayer[] = [
    {
        id: 'curriculum-kernel',
        label: 'Curriculum kernel',
        purpose: 'Biến chương trình lớp 1-5 thành bản đồ năng lực, topic, item và evidence fields có source version.',
        nonNegotiables: [
            'Mỗi item phải có môn, lớp, mạch nội dung và sourceIds.',
            'Không claim phủ chuẩn nếu thiếu người duyệt và calibration.',
            'Nội dung Lịch sử - Địa lý phải re-audit khi nguồn hành chính thay đổi.',
        ],
        currentAssets: ['47 topic lớp 1-5 đã map', 'Scope tiểu học 13 nhóm', 'Generated item có curriculumMapId và review/calibration status'],
        missingGates: ['Review queue', 'Approved item bank', 'Difficulty calibration bằng attempt thật'],
        sourceIds: ['moet-ctgdpt-2018', 'moet-tt17-2025', 'moet-primary-scope-2018', 'repo-curriculum-map'],
    },
    {
        id: 'learning-science-kernel',
        label: 'Learning science kernel',
        purpose: 'Biến retrieval, spaced repetition, feedback, metacognition và mastery learning thành hành vi sản phẩm.',
        nonNegotiables: [
            'Session phải có gợi nhớ, luyện tập, thử thách độc lập, teach-back và phản tư.',
            'Mastery không dựa trên xem xong; phải có recall, apply, explain, retain và transfer.',
            'Mỗi đề xuất phải giải thích bằng dữ liệu nào.',
        ],
        currentAssets: ['SM-2 review', 'Mistake notebook', 'Mastery state machine', 'Reflection journal'],
        missingGates: ['Rubric explanation quality', 'Retention dashboard', 'Transfer task coverage'],
        sourceIds: ['docx-master-blueprint', 'repo-prd', 'eef-metacognition', 'wwc-standards'],
    },
    {
        id: 'ai-orchestration-kernel',
        label: 'AI orchestration kernel',
        purpose: 'Điều phối AI thành các vai an toàn: tutor, classmate, coach, examiner, parent assistant và safety guardian.',
        nonNegotiables: [
            'Under-13 không có free chat độc lập.',
            'AI không viết hộ bài, không đưa đáp án trọn ngay từ đầu.',
            'Mỗi interaction phải có role, support level, risk flags và audit metadata.',
        ],
        currentAssets: ['Tutor engine', 'Hint ladder', 'AI interaction logs', 'Safety settings'],
        missingGates: ['50 scenario tutor regression', 'Rubric không làm hộ', 'Post-check chat quality'],
        sourceIds: ['docx-master-blueprint', 'repo-architecture', 'khanmigo', 'nist-ai-rmf', 'unicef-ai-children'],
    },
    {
        id: 'evidence-data-kernel',
        label: 'Evidence data kernel',
        purpose: 'Thu thập dữ liệu vừa đủ để chạy RCA/PDCA: attempt, lỗi sai, hint, retention, transfer, parent observation và outcome.',
        nonNegotiables: [
            'Không nói hiệu quả nếu chưa có pilot và cohort.',
            'Mỗi metric phải có mẫu số, nguồn sự kiện và ngày cập nhật.',
            'Decision engine phải nêu thiếu dữ liệu thay vì bịa kết luận.',
        ],
        currentAssets: ['Attempts', 'Mistakes', 'Review schedules', 'Reflections', 'Evidence dashboard/internal gate'],
        missingGates: ['Cohort export schema', 'Pre/post/retention protocol', 'PDCA weekly outcome loop'],
        sourceIds: ['repo-current-benchmark', 'wwc-standards', 'eef-metacognition', 'zearn-reporting'],
    },
    {
        id: 'parent-colearning-kernel',
        label: 'Parent co-learning kernel',
        purpose: 'Biến phụ huynh thành mentor: mỗi ngày một hành động nhỏ, mỗi tuần một vòng nhìn lại có bằng chứng.',
        nonNegotiables: [
            'Dashboard ưu tiên một điểm sáng, một lo ngại, một hành động.',
            'Gợi ý cho phụ huynh phải ngắn, làm được tại nhà và gắn với dữ liệu của con.',
            'Không biến nhà thành lớp học thứ hai.',
        ],
        currentAssets: ['Parent dashboard', 'Daily missions', 'Weekly review', 'Adaptive dashboard'],
        missingGates: ['Weekly target/outcome delta', 'Parent observation rubric', 'Exportable parent report'],
        sourceIds: ['docx-master-blueprint', 'repo-prd', 'zearn-reporting'],
    },
    {
        id: 'child-safety-privacy-kernel',
        label: 'Child safety and privacy kernel',
        purpose: 'Giữ product an toàn cho trẻ nhỏ: data minimization, parent-visible audit, không social dark pattern, không emotional dependency.',
        nonNegotiables: [
            'Không quảng cáo, không tracking ID, không public leaderboard.',
            'Không thu thập dữ liệu sức khỏe/tâm lý sâu nếu không có mục đích rõ và phụ huynh phê duyệt.',
            'Crisis/sensitive content phải escalate sang phụ huynh.',
        ],
        currentAssets: ['Under-13 mode', 'Safety settings', 'AI audit metadata', 'Local-first storage'],
        missingGates: ['Retention/delete policy UI', 'Consent checklist', 'Privacy event audit panel'],
        sourceIds: ['unicef-ai-children', 'coppa', 'ferpa', 'nist-ai-rmf'],
    },
    {
        id: 'software-quality-kernel',
        label: 'Software quality kernel',
        purpose: 'Biến nền tảng thành phần mềm có thể tiến hóa: typed data, tests, build gate, deploy gate, accessibility và maintainability.',
        nonNegotiables: [
            'Mỗi claim/data model mới cần có test chống overclaim.',
            'UI deploy lên Pages phải qua TypeScript, lint, Vitest và build.',
            'Accessibility và mobile smoke phải trở thành gate trước khi gọi production-grade.',
        ],
        currentAssets: ['TypeScript', 'Vitest', 'ESLint', 'Next static export', 'GitHub Pages deploy rule'],
        missingGates: ['Playwright smoke CI', 'Lighthouse/WCAG audit', 'Production monitoring'],
        sourceIds: ['iso-25010', 'wcag-22', 'repo-architecture', 'repo-current-benchmark'],
    },
];

export const PRODUCT_FOUNDATION_REQUIREMENTS: FoundationRequirement[] = [
    {
        id: 'P0-positioning',
        priority: 'P0',
        status: 'implemented',
        title: 'Định vị sản phẩm',
        requirement: 'Henry Learning OS phải được định vị là Family-first Learning Evidence OS, không phải chatbot hay app luyện điểm.',
        rationale: 'Nếu không chốt đúng category, UI/AI/data sẽ bị kéo về game, chat hoặc dashboard hình thức.',
        acceptanceCriteria: ['Có one-line positioning', 'Có non-goals', 'Có north-star outcome', 'Có success definition gắn evidence gate'],
        currentEvidence: ['PRD repo đã có family-first vision', 'DOCX nêu 5 layer và AI không làm hộ', 'File foundation này chốt category và non-goals'],
        nextGate: 'Mọi trang live quan trọng phải link về foundation để tránh lệch product direction.',
        sourceIds: ['docx-master-blueprint', 'repo-prd'],
    },
    {
        id: 'P0-curriculum-traceability',
        priority: 'P0',
        status: 'implemented',
        title: 'Traceability chương trình lớp 1-5',
        requirement: 'Mỗi topic/item đang có trong app phải truy vết được về môn, lớp, mạch nội dung, source version và evidence fields.',
        rationale: 'Bậc tiểu học phải kỹ lưỡng 100%; không được nói phủ chương trình nếu không truy vết được từng item.',
        acceptanceCriteria: ['47/47 topic có map', 'Generated item có curriculumMapId', 'Attempt có trường evidence', 'Có no-overclaim về human review/calibration'],
        currentEvidence: ['src/data/primary-curriculum-map.ts', 'src/lib/curriculum/item-audit.ts', 'benchmark page đang hiện 47/47 topic và item traceability'],
        nextGate: 'Thêm review queue và khóa item mới nếu thiếu curriculumMapId hoặc source version.',
        sourceIds: ['repo-curriculum-map', 'moet-ctgdpt-2018', 'moet-tt17-2025', 'moet-primary-scope-2018'],
    },
    {
        id: 'P0-no-overclaim',
        priority: 'P0',
        status: 'implemented',
        title: 'Evidence gate chống claim quá mức',
        requirement: 'Mỗi claim về hiệu quả, phủ chuẩn, AI tốt hơn hoặc sản phẩm vượt đối thủ phải có gate bằng chứng riêng.',
        rationale: 'Score 60/100 và source coverage 100/100 không đồng nghĩa hiệu quả học tập đã được chứng minh.',
        acceptanceCriteria: ['Blocked claim về hiệu quả khi chưa có cohort', 'Scorecard tách source coverage với product maturity', 'Test bảo vệ no-overclaim'],
        currentEvidence: ['__tests__/fullstack-competitive-benchmark.test.ts', 'docs/FULLSTACK_COMPETITIVE_BENCHMARK_2026-04-29.md'],
        nextGate: 'Mở rộng no-overclaim test sang foundation spec và UI.',
        sourceIds: ['repo-current-benchmark', 'wwc-standards', 'eef-metacognition'],
    },
    {
        id: 'P0-release-gate',
        priority: 'P0',
        status: 'implemented',
        title: 'Quy trình nâng cấp và deploy live',
        requirement: 'Mỗi nâng cấp UI/data cần qua gate TypeScript, test, lint, build, commit, push, Actions success và live verification.',
        rationale: 'Người dùng yêu cầu trang live cập nhật sau mỗi đợt nâng cấp; quy trình phải thành operator habit.',
        acceptanceCriteria: ['AGENTS.md có quy trình', 'Build static export thành công', 'GitHub Pages deploy được theo main', 'Báo cáo run id và live URL sau push'],
        currentEvidence: ['AGENTS.md', 'next.config.ts', 'GitHub Pages workflow trong cac lan deploy truoc'],
        nextGate: 'Thêm Playwright smoke vào CI để gate UI thật trên mobile/desktop.',
        sourceIds: ['repo-architecture', 'iso-25010', 'wcag-22'],
    },
    {
        id: 'P0-ai-socratic-safety',
        priority: 'P0',
        status: 'partial',
        title: 'AI tutor Socratic an toàn',
        requirement: 'AI phải làm con suy nghĩ nhiều hơn: hỏi gợi mở, hint ladder, không làm hộ, có audit và parent-visible policy.',
        rationale: 'AI là lõi khác biệt sản phẩm nhưng cũng là rủi ro lớn nhất với trẻ dưới 13 tuổi.',
        acceptanceCriteria: ['Regression scenarios cho không đưa đáp án ngay', 'Rubric phát hiện misconception', 'Log role/support/risk', 'Under-13 không free chat'],
        currentEvidence: ['AI tutor engine và hint ladder đã có', 'Safety settings đã có', 'Chưa có regression suite đủ 50 scenario'],
        nextGate: 'Tạo AI tutor rubric và 50 test case theo Toán, Tiếng Việt, Tiếng Anh lớp 1-5.',
        sourceIds: ['docx-master-blueprint', 'khanmigo', 'nist-ai-rmf', 'unicef-ai-children'],
    },
    {
        id: 'P0-real-evidence-engine',
        priority: 'P0',
        status: 'partial',
        title: 'Real evidence engine',
        requirement: 'Hệ thống phải ra quyết định dựa trên attempt, lỗi sai, hint, retention, transfer và parent observation thật.',
        rationale: 'Data-driven chỉ có nghĩa khi có mẫu số, source event và hành động tiếp theo; nếu không sẽ thành dashboard trang trí.',
        acceptanceCriteria: ['Metric có numerator/denominator', 'Có missing-data state', 'Có RCA theo lỗi tái phát', 'Có PDCA weekly loop'],
        currentEvidence: ['Attempts/mistakes/reviews/reflections đã có local', 'Benchmark đã chặn claim khi thiếu cohort', 'Chưa có cohort export và pilot protocol'],
        nextGate: 'Thiết kế pilot evidence pack 4 tuần: consent, pre-test, post-test, retention 7 ngày, time-on-task, attrition.',
        sourceIds: ['repo-current-benchmark', 'wwc-standards', 'eef-metacognition', 'zearn-reporting'],
    },
    {
        id: 'P0-child-privacy',
        priority: 'P0',
        status: 'partial',
        title: 'Child privacy và data minimization',
        requirement: 'Thu thập dữ liệu tối thiểu cần cho học tập, có parent control, export/delete và không monetization bằng dữ liệu trẻ em.',
        rationale: 'Sản phẩm cho trẻ sinh 2020 cần safety/privacy là requirement gốc, không phải polish cuối.',
        acceptanceCriteria: ['Data inventory', 'Consent/retention/delete UI', 'Parent-visible AI audit', 'No ads/social tracking'],
        currentEvidence: ['PRD non-goal không monetization child data', 'Safety settings đã có', 'Chưa có privacy status panel và retention policy UI'],
        nextGate: 'Thêm privacy evidence panel: data đang lưu, mục đích, nơi lưu, cách xóa/export.',
        sourceIds: ['unicef-ai-children', 'coppa', 'ferpa', 'nist-ai-rmf'],
    },
    {
        id: 'P0-data-driven-pdca',
        priority: 'P0',
        status: 'partial',
        title: 'RCA/PDCA tiến hóa có kiểm soát',
        requirement: 'Hệ thống chỉ được tiến hóa theo vòng observe-score-recommend-validate, không tự ý tự sửa hay tự claim.',
        rationale: 'Người dùng yêu cầu real data driven, RCA, PDCA và tiến hóa tự động dựa vào số liệu; cần guardrail để không thành self-modification mơ hồ.',
        acceptanceCriteria: ['Có observation artifact', 'Có root cause classification', 'Có action/recheck owner', 'Có validation gate trước deploy'],
        currentEvidence: ['Benchmark có path-to-100', 'Foundation có claim gates', 'Chưa có automation cho weekly RCA/PDCA'],
        nextGate: 'Thêm weekly outcome loop: detect top recurring error, propose action, measure after 7 days, keep audit trail.',
        sourceIds: ['repo-current-benchmark', 'iso-25010', 'wwc-standards'],
    },
    {
        id: 'P1-diagnostic-warm-start',
        priority: 'P1',
        status: 'spec_ready',
        title: 'Diagnostic warm-start',
        requirement: 'Mỗi môn cốt lõi cần có bài chẩn đoán 12-15 phút để đặt level ban đầu và kế hoạch 7 ngày.',
        rationale: 'Adaptive không nên bắt đầu bằng đoán tuổi/lớp; cần evidence ban đầu theo từng miền năng lực.',
        acceptanceCriteria: ['Diagnostic theo môn', 'Level confidence', 'Next 7-day plan', 'Parent explanation'],
        currentEvidence: ['Adaptive engine đã có, chưa có diagnostic UI/input bank'],
        nextGate: 'Build diagnostic Toán và Tiếng Việt lớp 1 trước.',
        sourceIds: ['ixl-diagnostic', 'dreambox-adaptivity', 'repo-prd'],
    },
    {
        id: 'P1-review-queue',
        priority: 'P1',
        status: 'spec_ready',
        title: 'Human review queue',
        requirement: 'Item mới phải qua hàng đợi duyệt với reviewerId, approvedAt, lý do block và calibration status.',
        rationale: 'Curriculum source coverage đã 100%, nhưng item bank không được gọi là mature nếu chưa duyệt từng câu.',
        acceptanceCriteria: ['Queue UI', 'Reviewer metadata', 'Block reason', 'Release gate test'],
        currentEvidence: ['Item đã có reviewStatus needs_human_review', 'Chưa có reviewer workflow'],
        nextGate: 'Tạo page/admin review queue và test khóa item chưa approved.',
        sourceIds: ['repo-curriculum-map', 'moet-ctgdpt-2018', 'iso-25010'],
    },
    {
        id: 'P1-weekly-outcome-loop',
        priority: 'P1',
        status: 'partial',
        title: 'Weekly outcome loop',
        requirement: 'Mỗi tuần phải có mục tiêu, hành động phụ huynh, bằng chứng hoàn thành và thay đổi sau 7 ngày.',
        rationale: 'Parent dashboard cần thành can thiệp gia đình có đo lại, không chỉ thông báo tình hình.',
        acceptanceCriteria: ['Weekly goal', 'Parent mission tied to top error', 'Recheck after 7 days', 'Outcome delta'],
        currentEvidence: ['Weekly review và daily missions đã có', 'Chưa có before/after outcome delta'],
        nextGate: 'Gắn parent mission với top recurring mistake và lịch recheck.',
        sourceIds: ['docx-master-blueprint', 'zearn-reporting', 'eef-metacognition'],
    },
    {
        id: 'P1-accessibility-quality',
        priority: 'P1',
        status: 'spec_ready',
        title: 'Accessibility và mobile quality',
        requirement: 'Child/parent UI phải có smoke visual mobile, keyboard/focus và target size theo WCAG 2.2.',
        rationale: 'Trẻ lớp 1-5 và phụ huynh cần UI dễ đọc, dễ chạm, không bị vỡ layout trên mobile.',
        acceptanceCriteria: ['Playwright mobile screenshot', 'Focus visible', 'Target size audit', 'No text overlap'],
        currentEvidence: ['Build static thành công, chưa có Playwright/WCAG gate'],
        nextGate: 'Thêm Playwright smoke cho home, session, dashboard, benchmark và foundation.',
        sourceIds: ['wcag-22', 'iso-25010'],
    },
    {
        id: 'P2-whole-child-portfolio',
        priority: 'P2',
        status: 'spec_ready',
        title: 'Whole-child portfolio 12 năm',
        requirement: 'Lưu sản phẩm đọc, viết, dự án, coding, reflection và parent observation thành portfolio tiến hóa 6-18 tuổi.',
        rationale: 'DOCX đặt tham vọng Learning OS, không chỉ app bài tập; portfolio là bằng chứng phát triển dài hạn.',
        acceptanceCriteria: ['Portfolio schema', 'Evidence upload policy', 'Reflection rubric', 'Parent-approved sharing'],
        currentEvidence: ['Reading entries/reflections đã có', 'Chưa có portfolio vault mature'],
        nextGate: 'Tạo portfolio schema và page đọc-viết-dự án đầu tiên.',
        sourceIds: ['docx-master-blueprint', 'repo-prd', 'unicef-ai-children'],
    },
];

export const PRODUCT_FOUNDATION_FEATURE_COVERAGE: FoundationFeatureCoverage[] = [
    {
        id: 'child-profile',
        label: 'Child profile',
        status: 'implemented',
        userValue: 'Biết Henry là ai, tuổi/lớp nào, phụ huynh nào và safety mode nào.',
        currentSurface: 'Parent onboarding và Zustand store.',
        requiredForMaturity: 'Thêm data inventory và export/delete theo profile.',
        sourceIds: ['docx-master-blueprint', 'repo-prd'],
    },
    {
        id: 'competency-map',
        label: 'Competency map 6-18',
        status: 'partial',
        userValue: 'Theo dõi năng lực theo tuổi/lớp, không chỉ danh sách bài học.',
        currentSurface: 'Mastery states và primary curriculum map lớp 1-5.',
        requiredForMaturity: 'Mở rộng thành graph 6-18 và prerequisite map.',
        sourceIds: ['docx-master-blueprint', 'repo-curriculum-map'],
    },
    {
        id: 'diagnostic-test',
        label: 'Diagnostic baseline',
        status: 'spec_ready',
        userValue: 'Đặt level ban đầu dựa trên bài làm thật.',
        currentSurface: 'Adaptive engine sẵn sàng nhận input, chưa có diagnostic UI/item bank.',
        requiredForMaturity: 'Diagnostic 12-15 phút theo Toán, Tiếng Việt, Tiếng Anh.',
        sourceIds: ['ixl-diagnostic', 'dreambox-adaptivity'],
    },
    {
        id: 'ai-socratic-tutor',
        label: 'AI Socratic tutor',
        status: 'implemented',
        userValue: 'AI hỏi để con nghĩ, tự sửa lỗi và không làm hộ.',
        currentSurface: 'Tutor engine, role policy và hint ladder.',
        requiredForMaturity: 'Rubric và regression suite 50 scenario.',
        sourceIds: ['khanmigo', 'docx-master-blueprint'],
    },
    {
        id: 'hint-ladder',
        label: 'Hint ladder',
        status: 'implemented',
        userValue: 'Con có mức gợi ý tăng dần thay vì nhận đáp án.',
        currentSurface: 'Session practice và attempt hintLevelUsed.',
        requiredForMaturity: 'Đo tỉ lệ tự sửa sau từng mức gợi ý.',
        sourceIds: ['docx-master-blueprint', 'eef-metacognition'],
    },
    {
        id: 'mistake-notebook',
        label: 'Mistake notebook',
        status: 'implemented',
        userValue: 'Lỗi sai thành tài sản học tập và kế hoạch sửa lỗi.',
        currentSurface: 'Mistakes store và child mistake UI.',
        requiredForMaturity: 'RCA lỗi tái phát và reversed/similar problem generator.',
        sourceIds: ['docx-master-blueprint', 'repo-prd'],
    },
    {
        id: 'mastery-checkpoint',
        label: 'Mastery checkpoint',
        status: 'partial',
        userValue: 'Không qua bài chỉ vì xem xong; phải recall/apply/explain.',
        currentSurface: 'Mastery states và independent challenge.',
        requiredForMaturity: 'Transfer task và retention checkpoint bắt buộc.',
        sourceIds: ['repo-prd', 'eef-metacognition'],
    },
    {
        id: 'spaced-repetition',
        label: 'Spaced repetition',
        status: 'implemented',
        userValue: 'Kiến thức quan trọng quay lại đúng lúc.',
        currentSurface: 'SM-2 scheduler và review cards.',
        requiredForMaturity: 'Retention curve theo skill và missing-data state.',
        sourceIds: ['docx-master-blueprint', 'eef-metacognition'],
    },
    {
        id: 'retrieval-practice',
        label: 'Retrieval practice',
        status: 'partial',
        userValue: 'Con tự nhớ trước khi xem lại để tăng độ bền.',
        currentSurface: 'Session có review step và challenge.',
        requiredForMaturity: 'Bắt buộc retrieval-first trong mọi lesson template.',
        sourceIds: ['docx-master-blueprint', 'eef-metacognition'],
    },
    {
        id: 'reading-buddy',
        label: 'Reading buddy',
        status: 'partial',
        userValue: 'Đọc cùng con, hỏi ý chính, nhân vật, cảm xúc và từ mới.',
        currentSurface: 'Reading journal và reading entries.',
        requiredForMaturity: 'AI reading buddy với câu hỏi theo văn bản và audit support level.',
        sourceIds: ['docx-master-blueprint'],
    },
    {
        id: 'writing-coach',
        label: 'Writing coach',
        status: 'spec_ready',
        userValue: 'Giúp con viết rõ ý mà không viết hộ bài.',
        currentSurface: 'Có spec trong DOCX, chưa có module riêng.',
        requiredForMaturity: 'Rubric ý-từ-câu-đoạn và policy không viết hộ.',
        sourceIds: ['docx-master-blueprint', 'unicef-ai-children'],
    },
    {
        id: 'english-roleplay',
        label: 'English roleplay',
        status: 'spec_ready',
        userValue: 'Dùng tiếng Anh trong tình huống ngắn, không chỉ học từ vựng.',
        currentSurface: 'Có English lessons, chưa có roleplay mature.',
        requiredForMaturity: 'Roleplay age-appropriate, parent-visible transcript metadata.',
        sourceIds: ['docx-master-blueprint'],
    },
    {
        id: 'math-reasoning',
        label: 'Math reasoning analyzer',
        status: 'partial',
        userValue: 'Phát hiện lỗi khái niệm, quy trình, đọc đề, tính toán.',
        currentSurface: 'Error type và math topic map.',
        requiredForMaturity: 'Analyzer theo bước giải và misconception rubric.',
        sourceIds: ['docx-master-blueprint', 'repo-curriculum-map'],
    },
    {
        id: 'project-builder',
        label: 'Project builder',
        status: 'spec_ready',
        userValue: 'Học qua dự án, sản phẩm thật và phản tư.',
        currentSurface: 'Có roadmap/spec, chưa có UI mature.',
        requiredForMaturity: 'Parent approval, materials safety, portfolio artifact.',
        sourceIds: ['docx-master-blueprint', 'repo-prd'],
    },
    {
        id: 'coding-ai-literacy',
        label: 'Coding and AI literacy',
        status: 'partial',
        userValue: 'Hiểu thuật toán, an toàn số và dùng AI có trách nhiệm.',
        currentSurface: 'Computing topics lớp 3-5 và safety policy.',
        requiredForMaturity: 'Coding sandbox và AI literacy progression.',
        sourceIds: ['repo-curriculum-map', 'unicef-ai-children'],
    },
    {
        id: 'reflection-journal',
        label: 'Reflection journal',
        status: 'implemented',
        userValue: 'Con tập nhìn lại mình đã học gì, khó ở đâu, bước tiếp là gì.',
        currentSurface: 'Reflection store và session reflection.',
        requiredForMaturity: 'Rubric plan-monitor-evaluate theo EEF.',
        sourceIds: ['eef-metacognition', 'docx-master-blueprint'],
    },
    {
        id: 'parent-dashboard',
        label: 'Parent dashboard',
        status: 'implemented',
        userValue: 'Phụ huynh thấy điểm sáng, lo ngại và hành động cần làm.',
        currentSurface: 'Parent dashboard live.',
        requiredForMaturity: 'Outcome delta và export report.',
        sourceIds: ['repo-prd', 'zearn-reporting'],
    },
    {
        id: 'daily-parent-mission',
        label: 'Daily parent mission',
        status: 'implemented',
        userValue: 'Mỗi ngày một việc ngắn để ba mẹ đồng hành.',
        currentSurface: 'Parent missions và complete action.',
        requiredForMaturity: 'Mission gắn với top recurring mistake và recheck.',
        sourceIds: ['docx-master-blueprint', 'repo-prd'],
    },
    {
        id: 'portfolio-vault',
        label: 'Portfolio vault',
        status: 'spec_ready',
        userValue: 'Lưu sản phẩm 12 năm: đọc, viết, coding, dự án, reflection.',
        currentSurface: 'Reading/reflection có một phần artifact, chưa có vault.',
        requiredForMaturity: 'Portfolio schema, storage, parent-approved sharing.',
        sourceIds: ['docx-master-blueprint', 'unicef-ai-children'],
    },
    {
        id: 'safety-audit-parent-control',
        label: 'Safety audit and parent control',
        status: 'partial',
        userValue: 'Phụ huynh biết AI đã làm gì và dữ liệu nào đang được lưu.',
        currentSurface: 'Safety settings và AI interaction logs.',
        requiredForMaturity: 'Privacy panel, consent checklist, retention/delete UI.',
        sourceIds: ['unicef-ai-children', 'coppa', 'ferpa', 'nist-ai-rmf'],
    },
];

export const PRODUCT_FOUNDATION_CLAIM_GATES: FoundationClaimGate[] = [
    {
        id: 'source-foundation',
        label: 'Source foundation',
        status: 'passed',
        allowedClaim: 'Đã có nền tảng nguồn nội bộ và nguồn chuẩn để xây product foundation.',
        blockedClaim: 'Không nói tất cả nguồn đã đủ để chứng minh hiệu quả học tập.',
        requiredEvidence: 'Local DOCX, ZIP handoff, repo PRD/architecture/benchmark và source URLs được ghi rõ.',
        sourceIds: ['docx-master-blueprint', 'zip-dev-handoff', 'repo-prd', 'repo-architecture'],
    },
    {
        id: 'curriculum-traceability',
        label: 'Curriculum traceability',
        status: 'passed',
        allowedClaim: 'Topic/item đang có đã có đường truy vết chương trình lớp 1-5.',
        blockedClaim: 'Không nói item bank đã được giáo viên duyệt hoặc calibration xong.',
        requiredEvidence: '47/47 topic map, item audit, reviewStatus và calibrationStatus.',
        sourceIds: ['repo-curriculum-map', 'moet-ctgdpt-2018', 'moet-primary-scope-2018'],
    },
    {
        id: 'no-overclaim',
        label: 'No-overclaim gate',
        status: 'passed',
        allowedClaim: 'Sản phẩm có guardrail không claim hiệu quả khi chưa có dữ liệu người học thật.',
        blockedClaim: 'Không nói Henry giúp tăng điểm, tốt hơn đối thủ, hay đạt 100/100 hiệu quả.',
        requiredEvidence: 'Tests chống overclaim và gate pilot-outcome bị blocked.',
        sourceIds: ['repo-current-benchmark', 'wwc-standards'],
    },
    {
        id: 'ai-tutor-quality',
        label: 'AI tutor quality',
        status: 'partial',
        allowedClaim: 'Đã có AI tutor/hint ladder theo hướng Socratic ở mức sản phẩm hiện tại.',
        blockedClaim: 'Không nói AI tutor đã được benchmark chất lượng hội thoại với trẻ thật.',
        requiredEvidence: 'Cần 50 scenario regression, rubric chất lượng hội thoại và log tự sửa lỗi.',
        sourceIds: ['khanmigo', 'nist-ai-rmf', 'unicef-ai-children'],
    },
    {
        id: 'adaptive-evidence',
        label: 'Adaptive evidence',
        status: 'partial',
        allowedClaim: 'Đã có dữ liệu local và adaptive engine để ra gợi ý trong app.',
        blockedClaim: 'Không nói adaptive đã tối ưu hóa bằng dữ liệu cohort.',
        requiredEvidence: 'Can diagnostic, cohort export, retention va calibration.',
        sourceIds: ['ixl-diagnostic', 'dreambox-adaptivity', 'wwc-standards'],
    },
    {
        id: 'efficacy',
        label: 'Learning efficacy',
        status: 'blocked',
        allowedClaim: 'Chưa claim hiệu quả học tập; chỉ được nói đã sẵn sàng thiết kế pilot.',
        blockedClaim: 'Cấm claim tăng điểm, tăng năng lực, effect size, vượt ST Math/IXL/Khanmigo khi chưa có pilot.',
        requiredEvidence: 'Pilot 4 tuần có consent, pre-test, post-test, retention 7 ngày, attrition và phân tích cohort.',
        sourceIds: ['wwc-standards', 'eef-metacognition'],
    },
    {
        id: 'production-quality',
        label: 'Production quality',
        status: 'partial',
        allowedClaim: 'Đã có TypeScript/test/lint/build/deploy gate cho static site.',
        blockedClaim: 'Không nói production-grade nếu chưa có E2E, monitoring, accessibility audit.',
        requiredEvidence: 'Cần Playwright smoke CI, WCAG check, live monitoring và rollback drill.',
        sourceIds: ['iso-25010', 'wcag-22'],
    },
];

export const PRODUCT_FOUNDATION_QUALITY_AXES: FoundationQualityAxis[] = [
    {
        id: 'functional-suitability',
        label: 'Functional suitability',
        benchmarkFrame: 'ISO/IEC 25010:2023',
        productRequirement: 'Tính năng phải giải quyết đúng journey: con học, AI hỗ trợ, phụ huynh đồng hành, dữ liệu lưu bằng chứng.',
        measurableGate: 'Mỗi feature P0/P1 có acceptance criteria, current evidence và nextGate.',
        sourceIds: ['iso-25010', 'repo-prd'],
    },
    {
        id: 'reliability-operability',
        label: 'Reliability and operability',
        benchmarkFrame: 'ISO/IEC 25010:2023',
        productRequirement: 'Build/deploy lặp lại được, không phụ thuộc vào thao tác thủ công mơ hồ.',
        measurableGate: 'TypeScript, Vitest, ESLint, build, Actions success và live verification cho mỗi đợt nâng cấp UI/data.',
        sourceIds: ['iso-25010', 'repo-architecture'],
    },
    {
        id: 'usability-accessibility',
        label: 'Usability and accessibility',
        benchmarkFrame: 'WCAG 2.2 + UDL',
        productRequirement: 'Trẻ nhỏ đọc được, chạm được, không quá tải; phụ huynh scan nhanh và biết việc phải làm.',
        measurableGate: 'Playwright mobile screenshots, focus/target-size check va no-overlap visual smoke.',
        sourceIds: ['wcag-22', 'cast-udl'],
    },
    {
        id: 'ai-risk-management',
        label: 'AI risk management',
        benchmarkFrame: 'NIST AI RMF + UNICEF AI for children',
        productRequirement: 'AI có role boundary, risk flags, audit metadata, parent visibility và crisis/sensitive escalation.',
        measurableGate: '50 tutor regression scenarios, unsafe-content tests và parent-visible AI policy panel.',
        sourceIds: ['nist-ai-rmf', 'unicef-ai-children'],
    },
    {
        id: 'privacy-by-design',
        label: 'Privacy by design',
        benchmarkFrame: 'UNICEF + COPPA + FERPA baseline',
        productRequirement: 'Data tối thiểu, rõ mục đích, phụ huynh kiểm soát, không ads/tracking, có xóa/export.',
        measurableGate: 'Data inventory UI, retention/delete action va privacy event audit.',
        sourceIds: ['unicef-ai-children', 'coppa', 'ferpa'],
    },
    {
        id: 'evidence-standard',
        label: 'Evidence standard',
        benchmarkFrame: 'WWC + EEF',
        productRequirement: 'Claim hiệu quả phải tách với product readiness và có pilot/cohort/pre-post/retention.',
        measurableGate: 'Pilot protocol 4 tuan va report co attrition, baseline, retention, effect estimate.',
        sourceIds: ['wwc-standards', 'eef-metacognition'],
    },
    {
        id: 'maintainability-testability',
        label: 'Maintainability and testability',
        benchmarkFrame: 'ISO/IEC 25010:2023',
        productRequirement: 'Foundation phải là data model typed, UI doc sống và test được, không chỉ là văn bản rời.',
        measurableGate: 'Tests resolve sourceIds, P0 gates, feature coverage va blocked efficacy claim.',
        sourceIds: ['iso-25010'],
    },
];

export const foundationSourceLookup = Object.fromEntries(
    PRODUCT_FOUNDATION_SOURCE_REGISTRY.map((source) => [source.id, source]),
) as Record<string, FoundationSource>;

export function getFoundationSourcesByIds(sourceIds: string[]) {
    return sourceIds.flatMap((sourceId) => {
        const source = foundationSourceLookup[sourceId];

        return source ? [source] : [];
    });
}

export function computeFoundationRequirementCoverage(status: FoundationRequirementStatus) {
    const matching = PRODUCT_FOUNDATION_REQUIREMENTS.filter((requirement) => requirement.status === status).length;

    return Math.round((matching / PRODUCT_FOUNDATION_REQUIREMENTS.length) * 100);
}

export function computeFoundationP0Readiness100() {
    const p0Requirements = PRODUCT_FOUNDATION_REQUIREMENTS.filter((requirement) => requirement.priority === 'P0');
    const weightedScore = p0Requirements.reduce((sum, requirement) => {
        if (requirement.status === 'implemented') return sum + 1;
        if (requirement.status === 'partial') return sum + 0.5;
        return sum;
    }, 0);

    return Math.round((weightedScore / p0Requirements.length) * 100);
}

export function computeFoundationMustHaveCoverage100() {
    const covered = PRODUCT_FOUNDATION_FEATURE_COVERAGE.filter((feature) => feature.status === 'implemented' || feature.status === 'partial').length;

    return Math.round((covered / PRODUCT_FOUNDATION_FEATURE_COVERAGE.length) * 100);
}
