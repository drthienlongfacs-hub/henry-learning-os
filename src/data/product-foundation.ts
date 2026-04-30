import { UI_SMOKE_GATE } from './ui-smoke-gate';

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

export type FoundationSotDecisionStatus = 'ready_for_implementation' | 'implemented' | 'blocked_by_evidence' | 'monitor_only';
export type FoundationSotRiskLevel = 'low' | 'medium' | 'high';

export interface FoundationSotProtocol {
    id: string;
    label: string;
    sourcePrecedence: string[];
    requiredProtocolSteps: string[];
    nonNegotiableOutputs: string[];
    sourceIds: string[];
}

export interface FoundationUpgradeDecision {
    id: string;
    rank: number;
    status: FoundationSotDecisionStatus;
    riskLevel: FoundationSotRiskLevel;
    label: string;
    whyNow: string;
    targetRequirementIds: string[];
    targetFeatureIds: string[];
    sourceOfTruth: string;
    implementationScope: string[];
    doneDefinition: string[];
    evidenceGate: string;
    deployGate: string;
    antiOverclaim: string;
    blockedUntil: string;
    ownerSurface: string;
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
        id: 'sot-traceability-matrix',
        label: 'Henry feature requirements traceability matrix',
        kind: 'repo_handoff',
        locatorKind: 'repo_file',
        locator: 'public/docs/HENRY_FEATURE_REQUIREMENTS_TRACEABILITY_2026-04-30.md',
        foundationUse: 'Kim chỉ nam SOT: mỗi tính năng phải có yêu cầu, căn cứ, mức tin cậy, trích đoạn gốc ngắn, diễn giải, áp dụng và gate đạt.',
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
        currentAssets: ['47 topic lớp 1-5 đã map', 'Scope tiểu học 13 nhóm', 'Generated item có curriculumMapId và review/calibration status', 'Human review queue có RCA/PDCA và release gate'],
        missingGates: ['Reviewer thật cho từng item', 'Approved item bank', 'Difficulty calibration bằng attempt thật'],
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
        nextGate: 'Ghi reviewerId/approvedAt/blockReason thật cho từng item và khóa item mới nếu thiếu curriculumMapId hoặc source version.',
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
        currentEvidence: ['AGENTS.md', 'next.config.ts', 'GitHub Pages workflow trong cac lan deploy truoc', 'Playwright smoke gate chạy desktop/mobile route chính trước upload Pages'],
        nextGate: 'Bổ sung live monitoring và rollback drill khi rời static-only.',
        sourceIds: ['repo-architecture', 'iso-25010', 'wcag-22'],
    },
    {
        id: 'P0-ai-socratic-safety',
        priority: 'P0',
        status: 'implemented',
        title: 'AI tutor Socratic an toàn',
        requirement: 'AI phải làm con suy nghĩ nhiều hơn: hỏi gợi mở, hint ladder, không làm hộ, có audit và parent-visible policy.',
        rationale: 'AI là lõi khác biệt sản phẩm nhưng cũng là rủi ro lớn nhất với trẻ dưới 13 tuổi.',
        acceptanceCriteria: ['Regression scenarios cho không đưa đáp án ngay', 'Rubric phát hiện misconception', 'Log role/support/risk', 'Under-13 không free chat'],
        currentEvidence: ['AI tutor engine và hint ladder đã có', 'Safety settings đã có', 'src/lib/ai/tutor-rubric.ts có 50 scenario lớp 1-5', '__tests__/ai-tutor-rubric.test.ts chặn direct-answer và overclaim'],
        nextGate: 'Chạy pilot/log thật với trẻ và phụ huynh trước khi claim chất lượng hội thoại ngoài nội bộ.',
        sourceIds: ['sot-traceability-matrix', 'docx-master-blueprint', 'khanmigo', 'nist-ai-rmf', 'unicef-ai-children'],
    },
    {
        id: 'P0-real-evidence-engine',
        priority: 'P0',
        status: 'partial',
        title: 'Real evidence engine',
        requirement: 'Hệ thống phải ra quyết định dựa trên attempt, lỗi sai, hint, retention, transfer và parent observation thật.',
        rationale: 'Data-driven chỉ có nghĩa khi có mẫu số, source event và hành động tiếp theo; nếu không sẽ thành dashboard trang trí.',
        acceptanceCriteria: ['Metric có numerator/denominator', 'Có missing-data state', 'Có RCA theo lỗi tái phát', 'Có PDCA weekly loop'],
        currentEvidence: ['Attempts/mistakes/reviews/reflections đã có local', 'Weekly RCA/PDCA engine đã chọn issue từ dữ liệu thật và trả missing-data state', 'Benchmark đã chặn claim khi thiếu cohort', 'Chưa có cohort export và pilot protocol'],
        nextGate: 'Thiết kế pilot evidence pack 4 tuần: consent, pre-test, post-test, retention 7 ngày, time-on-task, attrition.',
        sourceIds: ['sot-traceability-matrix', 'repo-current-benchmark', 'wwc-standards', 'eef-metacognition', 'zearn-reporting'],
    },
    {
        id: 'P0-child-privacy',
        priority: 'P0',
        status: 'implemented',
        title: 'Child privacy và data minimization',
        requirement: 'Thu thập dữ liệu tối thiểu cần cho học tập, có parent control, export/delete và không monetization bằng dữ liệu trẻ em.',
        rationale: 'Sản phẩm cho trẻ sinh 2020 cần safety/privacy là requirement gốc, không phải polish cuối.',
        acceptanceCriteria: ['Data inventory', 'Consent/retention/delete UI', 'Parent-visible AI audit', 'No ads/social tracking'],
        currentEvidence: ['PRD non-goal không monetization child data', 'Safety settings đã có', 'src/lib/privacy/privacy-evidence.ts khai báo data inventory', 'Parent settings hiển thị privacy evidence panel live'],
        nextGate: 'Legal review và backend retention policy trước khi claim tuân thủ pháp lý đầy đủ.',
        sourceIds: ['sot-traceability-matrix', 'unicef-ai-children', 'coppa', 'ferpa', 'nist-ai-rmf'],
    },
    {
        id: 'P0-data-driven-pdca',
        priority: 'P0',
        status: 'implemented',
        title: 'RCA/PDCA tiến hóa có kiểm soát',
        requirement: 'Hệ thống chỉ được tiến hóa theo vòng observe-score-recommend-validate, không tự ý tự sửa hay tự claim.',
        rationale: 'Người dùng yêu cầu real data driven, RCA, PDCA và tiến hóa tự động dựa vào số liệu; cần guardrail để không thành self-modification mơ hồ.',
        acceptanceCriteria: ['Có observation artifact', 'Có root cause classification', 'Có action/recheck owner', 'Có validation gate trước deploy'],
        currentEvidence: ['Benchmark có path-to-100', 'Foundation có claim gates', 'src/lib/evidence/weekly-pdca.ts có observe/RCA/plan/recheck/act', 'Parent dashboard hiển thị PDCA tuần theo dữ liệu local'],
        nextGate: 'Tích hợp lưu plan/follow-up và cohort export để chuẩn bị pilot 4 tuần.',
        sourceIds: ['sot-traceability-matrix', 'repo-current-benchmark', 'iso-25010', 'wwc-standards'],
    },
    {
        id: 'P1-diagnostic-warm-start',
        priority: 'P1',
        status: 'implemented',
        title: 'Diagnostic warm-start',
        requirement: 'Mỗi môn cốt lõi cần có bài chẩn đoán 12-15 phút để đặt level ban đầu và kế hoạch 7 ngày.',
        rationale: 'Adaptive không nên bắt đầu bằng đoán tuổi/lớp; cần evidence ban đầu theo từng miền năng lực.',
        acceptanceCriteria: ['Diagnostic theo môn', 'Level confidence', 'Next 7-day plan', 'Parent explanation'],
        currentEvidence: ['src/lib/diagnostic/grade1-warm-start.ts có blueprint 12 item Toán/Tiếng Việt lớp 1', '/parent/diagnostic có UI nhập baseline và kế hoạch 7 ngày', '__tests__/diagnostic-warm-start.test.ts kiểm missing-data, confidence và no-overclaim'],
        nextGate: 'Lưu diagnostic session dài hạn và validation cohort trước khi claim độ chính xác level.',
        sourceIds: ['ixl-diagnostic', 'dreambox-adaptivity', 'repo-prd'],
    },
    {
        id: 'P1-review-queue',
        priority: 'P1',
        status: 'implemented',
        title: 'Human review queue',
        requirement: 'Item mới phải qua hàng đợi duyệt với reviewerId, approvedAt, lý do block và calibration status.',
        rationale: 'Curriculum source coverage đã 100%, nhưng item bank không được gọi là mature nếu chưa duyệt từng câu.',
        acceptanceCriteria: ['Queue UI', 'Reviewer metadata', 'Block reason', 'Release gate test'],
        currentEvidence: ['Item đã có reviewStatus needs_human_review', 'src/lib/curriculum/review-queue.ts tạo queue và release gate', '/parent/review-queue hiển thị RCA/PDCA cho item lớp 1-5', '__tests__/curriculum-review-queue.test.ts chặn auto-approve và claim quá mức'],
        nextGate: 'Ghi reviewerId/approvedAt/blockReason thật và đưa approved item vào calibration bằng attempt thật.',
        sourceIds: ['repo-curriculum-map', 'moet-ctgdpt-2018', 'iso-25010'],
    },
    {
        id: 'P1-weekly-outcome-loop',
        priority: 'P1',
        status: 'implemented',
        title: 'Weekly outcome loop',
        requirement: 'Mỗi tuần phải có mục tiêu, hành động phụ huynh, bằng chứng hoàn thành và thay đổi sau 7 ngày.',
        rationale: 'Parent dashboard cần thành can thiệp gia đình có đo lại, không chỉ thông báo tình hình.',
        acceptanceCriteria: ['Weekly goal', 'Parent mission tied to top error', 'Recheck after 7 days', 'Outcome delta'],
        currentEvidence: ['Weekly review và daily missions đã có', 'Weekly PDCA engine gắn top issue với parent mission và recheck 7 ngày', 'Test không bịa outcome delta khi thiếu follow-up'],
        nextGate: 'Lưu previousPlan vào store để tự động so before/after qua nhiều tuần.',
        sourceIds: ['sot-traceability-matrix', 'docx-master-blueprint', 'zearn-reporting', 'eef-metacognition'],
    },
    {
        id: 'P1-accessibility-quality',
        priority: 'P1',
        status: 'implemented',
        title: 'Accessibility và mobile quality',
        requirement: 'Child/parent UI phải có smoke visual mobile, keyboard/focus và target size theo WCAG 2.2.',
        rationale: 'Trẻ lớp 1-5 và phụ huynh cần UI dễ đọc, dễ chạm, không bị vỡ layout trên mobile.',
        acceptanceCriteria: ['Playwright mobile screenshot', 'Focus visible', 'Target size audit', 'No text overlap'],
        currentEvidence: [`${UI_SMOKE_GATE.routeCount} route chính x ${UI_SMOKE_GATE.viewportCount} viewport được kiểm bằng Playwright`, 'tests/smoke/ui-smoke.spec.ts kiểm route text, focus, target-size và overflow', '.github/workflows/deploy.yml chạy smoke trước upload Pages'],
        nextGate: 'Thêm visual diff, axe/WCAG audit sâu và monitoring live trước khi claim WCAG conformant.',
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
        status: 'implemented',
        userValue: 'Đặt level ban đầu dựa trên bài làm thật.',
        currentSurface: 'Diagnostic warm-start lớp 1 cho Toán/Tiếng Việt, engine confidence, missing-data guard và UI phụ huynh.',
        requiredForMaturity: 'Lưu session dài hạn, mở rộng Tiếng Anh và validation cohort.',
        sourceIds: ['ixl-diagnostic', 'dreambox-adaptivity'],
    },
    {
        id: 'ai-socratic-tutor',
        label: 'AI Socratic tutor',
        status: 'implemented',
        userValue: 'AI hỏi để con nghĩ, tự sửa lỗi và không làm hộ.',
        currentSurface: 'Tutor engine, role policy, hint ladder, SOT audit metadata và 50 scenario regression.',
        requiredForMaturity: 'Pilot hội thoại thật với trẻ và phụ huynh, kèm quality review theo cohort.',
        sourceIds: ['sot-traceability-matrix', 'khanmigo', 'docx-master-blueprint'],
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
        status: 'implemented',
        userValue: 'Phụ huynh biết AI đã làm gì và dữ liệu nào đang được lưu.',
        currentSurface: 'Safety settings, AI interaction logs, privacy evidence inventory và parent-visible data purpose panel.',
        requiredForMaturity: 'Legal review, backend retention policy và export/delete workflow thật khi chuyển khỏi local-only.',
        sourceIds: ['sot-traceability-matrix', 'unicef-ai-children', 'coppa', 'ferpa', 'nist-ai-rmf'],
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
        status: 'passed',
        allowedClaim: 'Đã có AI tutor/hint ladder và regression guardrail nội bộ 50 scenario theo SOT.',
        blockedClaim: 'Không nói AI tutor đã được benchmark chất lượng hội thoại với trẻ thật hoặc tốt hơn gia sư.',
        requiredEvidence: '50 scenario regression, rubric chất lượng hội thoại và SOT audit metadata đã có; cohort/pilot vẫn là gate riêng.',
        sourceIds: ['sot-traceability-matrix', 'khanmigo', 'nist-ai-rmf', 'unicef-ai-children'],
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
        allowedClaim: 'Đã có TypeScript/test/lint/build/deploy gate và Playwright smoke gate desktop/mobile cho static site.',
        blockedClaim: 'Không nói production-grade đầy đủ nếu chưa có monitoring, rollback drill và accessibility audit sâu.',
        requiredEvidence: 'Cần Playwright smoke CI đã chạy, sau đó bổ sung WCAG audit sâu, live monitoring và rollback drill.',
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
        measurableGate: `${UI_SMOKE_GATE.routeCount} route x ${UI_SMOKE_GATE.viewportCount} viewport, focus/target-size check và no-overflow visual smoke.`,
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
        measurableGate: 'Data inventory UI đã có ở parent settings; legal compliance và backend retention vẫn cần review riêng.',
        sourceIds: ['sot-traceability-matrix', 'unicef-ai-children', 'coppa', 'ferpa'],
    },
    {
        id: 'evidence-standard',
        label: 'Evidence standard',
        benchmarkFrame: 'WWC + EEF',
        productRequirement: 'Claim hiệu quả phải tách với product readiness và có pilot/cohort/pre-post/retention.',
        measurableGate: 'Weekly PDCA engine đã có missing-data/no-overclaim; pilot protocol 4 tuần vẫn là gate hiệu quả.',
        sourceIds: ['sot-traceability-matrix', 'wwc-standards', 'eef-metacognition'],
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

export const PRODUCT_FOUNDATION_SOT_PROTOCOL: FoundationSotProtocol = {
    id: 'foundation-sot-v1',
    label: 'Source of Truth control plane',
    sourcePrecedence: [
        '1. Người dùng và local blueprint: mục đích, ràng buộc gia đình, DOCX và ZIP handoff.',
        '2. Repo SOT: PRD, architecture, benchmark, curriculum map, product foundation data.',
        '3. Nguồn chính thức: Bộ GDĐT, chuẩn phần mềm, chuẩn accessibility, chuẩn AI/privacy.',
        '4. Learning science và evidence standard: EEF, WWC, pilot/cohort/pre-post/retention.',
        '5. Code reality: TypeScript types, tests, build output, GitHub Actions, live URL.',
    ],
    requiredProtocolSteps: [
        'Observe: đọc dữ liệu/source hiện có, không suy luận từ tên file.',
        'Cite: mỗi quyết định phải có sourceIds và file/source locator rõ.',
        'Decide: chọn lane có rank cao nhất nhưng chưa bị chặn bởi evidence.',
        'Implement: sửa phạm vi nhỏ, additive, không phá hành vi đang live.',
        'Verify: chạy TypeScript, test liên quan, lint, full Vitest và build khi thay UI/data.',
        'Deploy: commit, push main, theo dõi Pages success, kiểm tra URL live.',
        'Recheck: không nâng claim nếu gate evidence chưa đủ.',
    ],
    nonNegotiableOutputs: [
        'Mỗi nâng cấp phải có targetRequirementIds và targetFeatureIds.',
        'Mỗi lane phải nêu doneDefinition, evidenceGate, deployGate và antiOverclaim.',
        'Không có sourceIds hợp lệ thì không được đưa vào implementation queue.',
        'Không claim hiệu quả học tập nếu chưa có pilot người học thật.',
    ],
    sourceIds: ['sot-traceability-matrix', 'docx-master-blueprint', 'zip-dev-handoff', 'repo-prd', 'repo-architecture', 'repo-current-benchmark', 'iso-25010', 'wwc-standards'],
};

export const PRODUCT_FOUNDATION_SOT_UPGRADE_DECISIONS: FoundationUpgradeDecision[] = [
    {
        id: 'ai-tutor-rubric-regression',
        rank: 1,
        status: 'implemented',
        riskLevel: 'medium',
        label: 'AI tutor rubric và 50 scenario regression',
        whyNow: 'Đây là P0 còn thiếu lớn nhất: AI đã có tutor/hint ladder nhưng chưa có rubric đủ mạnh để chứng minh không làm hộ, không đưa đáp án ngay và phát hiện lỗi tư duy.',
        targetRequirementIds: ['P0-ai-socratic-safety'],
        targetFeatureIds: ['ai-socratic-tutor', 'hint-ladder', 'math-reasoning', 'writing-coach', 'english-roleplay'],
        sourceOfTruth: 'DOCX yêu cầu AI không làm hộ; PRD yêu cầu Socratic tutor; Khanmigo là benchmark gợi mở; NIST/UNICEF là guardrail AI cho trẻ.',
        implementationScope: [
            'Tạo rubric typed cho AI tutor: gợi mở, phát hiện misconception, mức hỗ trợ, không làm hộ, phản tư.',
            'Tạo scenario fixtures cho Toán, Tiếng Việt, Tiếng Anh lớp 1-5.',
            'Thêm evaluator/test chặn direct-answer, viết hộ văn và free chat dưới 13 tuổi.',
        ],
        doneDefinition: [
            'Ít nhất 50 scenario regression chạy trong Vitest.',
            'Mỗi scenario có grade, subject, target skill, forbidden behavior và expected tutor behavior.',
            'Test chứng minh không có claim chất lượng với trẻ thật khi chưa có log/pilot.',
        ],
        evidenceGate: 'Đã có regression guardrail nội bộ; chưa được nói đã chứng minh hiệu quả học tập hoặc chất lượng với cohort trẻ thật.',
        deployGate: 'TypeScript, targeted AI tutor tests, full Vitest, ESLint, build, Pages success và live foundation/benchmark vẫn render.',
        antiOverclaim: 'Không claim “AI dạy tốt hơn gia sư” hoặc “tăng điểm” nếu chỉ có rubric/test nội bộ.',
        blockedUntil: 'Đã triển khai ở src/lib/ai/tutor-rubric.ts và __tests__/ai-tutor-rubric.test.ts; gate tiếp theo là pilot hội thoại thật.',
        ownerSurface: 'src/lib/ai, __tests__, src/data/product-foundation.ts, trang foundation.',
        sourceIds: ['sot-traceability-matrix', 'docx-master-blueprint', 'repo-prd', 'repo-architecture', 'khanmigo', 'nist-ai-rmf', 'unicef-ai-children'],
    },
    {
        id: 'weekly-rca-pdca-loop',
        rank: 2,
        status: 'implemented',
        riskLevel: 'medium',
        label: 'Weekly RCA/PDCA outcome loop',
        whyNow: 'Người dùng yêu cầu real evidence base, real data driven, RCA, PDCA và tiến hóa tự động dựa vào số liệu; hiện dashboard có mission nhưng chưa đo before/after.',
        targetRequirementIds: ['P0-real-evidence-engine', 'P0-data-driven-pdca', 'P1-weekly-outcome-loop'],
        targetFeatureIds: ['mistake-notebook', 'parent-dashboard', 'daily-parent-mission', 'reflection-journal'],
        sourceOfTruth: 'Foundation yêu cầu observe-score-recommend-validate; EEF yêu cầu metacognition/self-regulation; benchmark chặn claim khi thiếu dữ liệu thật.',
        implementationScope: [
            'Tạo weekly outcome model: observation, root cause, action, recheck date, outcome delta.',
            'Gắn top recurring mistake với parent mission và review schedule.',
            'Hiển thị missing-data state nếu chưa đủ attempt hoặc chưa đến ngày recheck.',
        ],
        doneDefinition: [
            'Có pure functions chọn top RCA issue từ attempts/mistakes/reviews.',
            'Có UI phụ huynh thấy mục tiêu tuần, hành động và điều kiện đo lại.',
            'Có test cho thiếu dữ liệu, lỗi tái phát và không bịa outcome delta.',
        ],
        evidenceGate: 'Đã có vòng PDCA nội bộ và missing-data state; chưa claim can thiệp phụ huynh cải thiện kết quả nếu chưa có follow-up thật.',
        deployGate: 'TypeScript, weekly outcome tests, full Vitest, ESLint, build, Pages success và live dashboard/foundation check.',
        antiOverclaim: 'Không nói mission làm tăng accuracy nếu chưa có before/after đủ mẫu.',
        blockedUntil: 'Đã triển khai ở src/lib/evidence/weekly-pdca.ts, parent dashboard và __tests__/weekly-pdca.test.ts; gate tiếp theo là lưu plan/follow-up qua nhiều tuần.',
        ownerSurface: 'src/lib/evidence, stores/app-store.ts, parent dashboard/weekly review, tests.',
        sourceIds: ['sot-traceability-matrix', 'repo-current-benchmark', 'eef-metacognition', 'wwc-standards', 'zearn-reporting', 'docx-master-blueprint'],
    },
    {
        id: 'privacy-evidence-panel',
        rank: 3,
        status: 'implemented',
        riskLevel: 'high',
        label: 'Privacy evidence panel cho trẻ dưới 13 tuổi',
        whyNow: 'Child privacy vẫn là P0 partial. Sản phẩm lưu dữ liệu học tập local nhưng phụ huynh chưa thấy data inventory, mục đích lưu, export/delete và retention policy.',
        targetRequirementIds: ['P0-child-privacy'],
        targetFeatureIds: ['safety-audit-parent-control', 'child-profile'],
        sourceOfTruth: 'UNICEF, COPPA, FERPA và NIST AI RMF yêu cầu data minimization, parent control, transparency và audit.',
        implementationScope: [
            'Thêm privacy inventory typed: dữ liệu nào lưu, mục đích, nơi lưu, retention, export/delete.',
            'Hiển thị trong parent settings/foundation với trạng thái local-only hiện tại.',
            'Thêm test đảm bảo không có ads/tracking/public leaderboard trong SOT.',
        ],
        doneDefinition: [
            'Phụ huynh thấy danh mục dữ liệu đang lưu và mục đích từng nhóm.',
            'Có trạng thái export/delete ở mức local app hiện tại.',
            'Có test source-traceability tới UNICEF/COPPA/FERPA/NIST.',
        ],
        evidenceGate: 'Đã có transparency/privacy inventory local-first; chưa claim compliance pháp lý đầy đủ nếu chưa có counsel review và backend policy.',
        deployGate: 'TypeScript, privacy tests, full Vitest, ESLint, build, Pages success và live settings/foundation check.',
        antiOverclaim: 'Không nói “COPPA/FERPA compliant” chỉ vì có panel nội bộ.',
        blockedUntil: 'Đã triển khai ở src/lib/privacy/privacy-evidence.ts, parent settings và __tests__/privacy-evidence.test.ts; gate tiếp theo là legal/backend review.',
        ownerSurface: 'src/data/privacy, parent settings, foundation page, tests.',
        sourceIds: ['sot-traceability-matrix', 'unicef-ai-children', 'coppa', 'ferpa', 'nist-ai-rmf', 'repo-prd'],
    },
    {
        id: 'human-review-queue',
        rank: 4,
        status: 'implemented',
        riskLevel: 'medium',
        label: 'Human review queue cho item lớp 1-5',
        whyNow: 'Curriculum source và item traceability đã qua, nhưng đường lên 100/100 bị chặn ở người duyệt và calibration.',
        targetRequirementIds: ['P0-curriculum-traceability', 'P1-review-queue'],
        targetFeatureIds: ['competency-map', 'mastery-checkpoint', 'math-reasoning'],
        sourceOfTruth: 'Bộ GDĐT là nguồn chương trình; repo curriculum map là SOT topic; benchmark yêu cầu không release item chưa duyệt.',
        implementationScope: [
            'Tạo item review model: reviewerId, status, approvedAt, blockReason, calibrationStatus.',
            'Tạo review queue UI ở parent/admin mode cho generated items.',
            'Thêm release gate test: item thiếu source/review không được claim approved.',
        ],
        doneDefinition: [
            'Queue liệt kê item needs_human_review theo môn/lớp/topic.',
            'Có filter blocked/approved/needs calibration.',
            'Test bảo vệ no-overclaim item bank.',
        ],
        evidenceGate: 'Đã có workflow duyệt nội dung, RCA/PDCA và release gate nội bộ; chưa claim item bank đã phủ chuẩn nếu chưa có reviewer thật và calibration.',
        deployGate: 'TypeScript, curriculum review tests, full Vitest, ESLint, build, Pages success và live benchmark/foundation check.',
        antiOverclaim: 'Không đổi 47/47 traceability thành “approved 47/47”.',
        blockedUntil: 'Đã triển khai ở src/lib/curriculum/review-queue.ts, /parent/review-queue và __tests__/curriculum-review-queue.test.ts; gate tiếp theo là reviewer thật và calibration bằng attempt thật.',
        ownerSurface: 'src/lib/curriculum, src/data/primary-curriculum-map.ts, parent review UI, tests.',
        sourceIds: ['repo-curriculum-map', 'moet-ctgdpt-2018', 'moet-tt17-2025', 'moet-primary-scope-2018', 'repo-current-benchmark'],
    },
    {
        id: 'diagnostic-warm-start-grade1',
        rank: 5,
        status: 'implemented',
        riskLevel: 'medium',
        label: 'Diagnostic warm-start lớp 1',
        whyNow: 'Adaptive hiện có engine nhưng chưa có diagnostic đầu vào để đặt level ban đầu bằng dữ liệu thật.',
        targetRequirementIds: ['P1-diagnostic-warm-start', 'P0-real-evidence-engine'],
        targetFeatureIds: ['diagnostic-test', 'competency-map', 'mastery-checkpoint'],
        sourceOfTruth: 'IXL/DreamBox benchmark diagnostic/adaptivity; curriculum map lớp 1 là SOT nội dung; foundation yêu cầu missing-data state.',
        implementationScope: [
            'Tạo diagnostic blueprint 12-15 phút cho Toán và Tiếng Việt lớp 1.',
            'Tính level confidence và kế hoạch 7 ngày không overclaim.',
            'Lưu diagnostic attempt metadata để dùng cho adaptive engine.',
        ],
        doneDefinition: [
            'Diagnostic có source map, item intent, evidence fields và scoring confidence.',
            'Có test phân biệt insufficient evidence với ready plan.',
            'UI phụ huynh thấy level là giả thuyết ban đầu, không phải nhãn cố định.',
        ],
        evidenceGate: 'Đã có diagnostic warm-start nội bộ cho Toán/Tiếng Việt lớp 1; chưa claim level chính xác nếu chưa validation cohort.',
        deployGate: 'TypeScript, diagnostic tests, full Vitest, ESLint, build, Pages success và live route check.',
        antiOverclaim: 'Không gọi trẻ là giỏi/yếu; chỉ báo domain readiness có độ tin cậy.',
        blockedUntil: 'Đã triển khai ở src/lib/diagnostic/grade1-warm-start.ts, /parent/diagnostic và __tests__/diagnostic-warm-start.test.ts; gate tiếp theo là validation cohort và lưu session dài hạn.',
        ownerSurface: 'src/data/diagnostic, src/lib/adaptive, child/parent UI, tests.',
        sourceIds: ['ixl-diagnostic', 'dreambox-adaptivity', 'repo-curriculum-map', 'moet-ctgdpt-2018'],
    },
    {
        id: 'playwright-wcag-smoke',
        rank: 6,
        status: 'implemented',
        riskLevel: 'low',
        label: 'Playwright/WCAG smoke gate',
        whyNow: 'Build đã qua nhưng UI chưa có smoke visual mobile/desktop; foundation không được gọi production-grade nếu thiếu E2E/accessibility gate.',
        targetRequirementIds: ['P0-release-gate', 'P1-accessibility-quality'],
        targetFeatureIds: ['parent-dashboard', 'safety-audit-parent-control'],
        sourceOfTruth: 'ISO 25010 đặt quality gate; WCAG 2.2 đặt accessibility gate; AGENTS.md yêu cầu deploy/live verification sau nâng cấp.',
        implementationScope: [
            'Thêm Playwright smoke cho home, child learn, parent dashboard, benchmark, foundation, SOT, review queue và diagnostic.',
            'Kiểm tra text chính, route status, mobile viewport và không blank page.',
            'Gắn script để chạy trước deploy khi có thay đổi UI lớn.',
        ],
        doneDefinition: [
            'Smoke chạy được local và có CI-ready command.',
            'Kiểm tra desktop/mobile cho route foundation, benchmark, SOT, review queue và diagnostic.',
            'Không thay thế audit WCAG đầy đủ, chỉ là smoke gate ban đầu.',
        ],
        evidenceGate: UI_SMOKE_GATE.allowedClaim,
        deployGate: 'TypeScript, Playwright smoke, full Vitest, ESLint, build, Pages success và live route check.',
        antiOverclaim: UI_SMOKE_GATE.blockedClaim,
        blockedUntil: 'Đã triển khai ở src/data/ui-smoke-gate.ts, tests/smoke/ui-smoke.spec.ts, package scripts và GitHub Pages workflow; gate tiếp theo là monitoring/live audit sâu.',
        ownerSurface: 'tests/smoke, package scripts, GitHub workflow, benchmark/foundation docs.',
        sourceIds: ['iso-25010', 'wcag-22', 'repo-architecture'],
    },
    {
        id: 'pilot-evidence-pack-4-week',
        rank: 7,
        status: 'ready_for_implementation',
        riskLevel: 'high',
        label: 'Pilot evidence pack 4 tuần',
        whyNow: 'Sau khi UI smoke gate đã có, lỗ hổng lớn nhất còn lại là chưa có dữ liệu người học thật để chứng minh hiệu quả học tập, retention và lỗi tái phát.',
        targetRequirementIds: ['P0-real-evidence-engine', 'P1-weekly-outcome-loop'],
        targetFeatureIds: ['parent-dashboard', 'mastery-checkpoint', 'spaced-repetition', 'retrieval-practice'],
        sourceOfTruth: 'WWC và EEF yêu cầu pre/post, retention, mẫu số rõ, attrition và phân tích cohort trước mọi claim hiệu quả học tập.',
        implementationScope: [
            'Thiết kế pilot protocol 4 tuần với consent phụ huynh, pre-test, post-test và retention 7 ngày.',
            'Định nghĩa cohort export schema cho attempt, hint, time-on-task, lỗi tái phát và parent action.',
            'Tạo dashboard evidence pack ở chế độ missing-data cho đến khi có dữ liệu thật.',
        ],
        doneDefinition: [
            'Có protocol và schema đủ để thu pilot mà không claim trước.',
            'Có UI phụ huynh/operator thấy missing-data, mẫu số, retention và attrition.',
            'Có test chặn claim hiệu quả nếu pilot chưa đủ dữ liệu.',
        ],
        evidenceGate: 'Chỉ được claim đã sẵn sàng pilot; chưa claim tăng điểm, effect size hoặc hiệu quả học tập.',
        deployGate: 'TypeScript, pilot evidence tests, Playwright smoke, full Vitest, ESLint, build, Pages success và live route check.',
        antiOverclaim: 'Không gọi bất kỳ cải thiện nào là hiệu quả nếu chưa có pre/post/retention đủ mẫu và phân tích mất mẫu.',
        blockedUntil: 'Không bị chặn về kỹ thuật; bị chặn claim cho đến khi có cohort thật và consent phụ huynh.',
        ownerSurface: 'src/lib/evidence, parent analytics/dashboard, docs, tests.',
        sourceIds: ['wwc-standards', 'eef-metacognition', 'zearn-reporting', 'repo-current-benchmark'],
    },
];

export const foundationSourceLookup = Object.fromEntries(
    PRODUCT_FOUNDATION_SOURCE_REGISTRY.map((source) => [source.id, source]),
) as Record<string, FoundationSource>;

export const foundationRequirementLookup = Object.fromEntries(
    PRODUCT_FOUNDATION_REQUIREMENTS.map((requirement) => [requirement.id, requirement]),
) as Record<string, FoundationRequirement>;

export const foundationFeatureLookup = Object.fromEntries(
    PRODUCT_FOUNDATION_FEATURE_COVERAGE.map((feature) => [feature.id, feature]),
) as Record<string, FoundationFeatureCoverage>;

export function getFoundationSourcesByIds(sourceIds: string[]) {
    return sourceIds.flatMap((sourceId) => {
        const source = foundationSourceLookup[sourceId];

        return source ? [source] : [];
    });
}

export function getFoundationRequirementsByIds(requirementIds: string[]) {
    return requirementIds.flatMap((requirementId) => {
        const requirement = foundationRequirementLookup[requirementId];

        return requirement ? [requirement] : [];
    });
}

export function getFoundationFeaturesByIds(featureIds: string[]) {
    return featureIds.flatMap((featureId) => {
        const feature = foundationFeatureLookup[featureId];

        return feature ? [feature] : [];
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

export function getNextFoundationUpgradeDecision() {
    return [...PRODUCT_FOUNDATION_SOT_UPGRADE_DECISIONS]
        .sort((a, b) => a.rank - b.rank)
        .find((decision) => decision.status === 'ready_for_implementation');
}

export function computeFoundationSotIntegrity100() {
    const protocolChecks = [
        PRODUCT_FOUNDATION_SOT_PROTOCOL.sourcePrecedence.length >= 5,
        PRODUCT_FOUNDATION_SOT_PROTOCOL.requiredProtocolSteps.length >= 7,
        PRODUCT_FOUNDATION_SOT_PROTOCOL.nonNegotiableOutputs.length >= 4,
        PRODUCT_FOUNDATION_SOT_PROTOCOL.sourceIds.every((sourceId) => Boolean(foundationSourceLookup[sourceId])),
    ];

    const decisionChecks = PRODUCT_FOUNDATION_SOT_UPGRADE_DECISIONS.flatMap((decision) => [
        decision.sourceIds.length > 0 && decision.sourceIds.every((sourceId) => Boolean(foundationSourceLookup[sourceId])),
        decision.targetRequirementIds.length > 0 && decision.targetRequirementIds.every((requirementId) => Boolean(foundationRequirementLookup[requirementId])),
        decision.targetFeatureIds.length > 0 && decision.targetFeatureIds.every((featureId) => Boolean(foundationFeatureLookup[featureId])),
        decision.doneDefinition.length >= 3,
        decision.implementationScope.length >= 3,
        decision.evidenceGate.length > 40,
        decision.deployGate.includes('TypeScript') && decision.deployGate.includes('Pages success'),
        decision.antiOverclaim.length > 40,
    ]);

    const checks = [...protocolChecks, ...decisionChecks];
    const passed = checks.filter(Boolean).length;

    return Math.round((passed / checks.length) * 100);
}
