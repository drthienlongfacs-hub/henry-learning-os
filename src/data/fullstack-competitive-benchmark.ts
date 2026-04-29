import { PRIMARY_CURRICULUM_MAP_STATS } from './primary-curriculum-map';

export type BenchmarkDimensionKey =
    | 'aiTutorScaffolding'
    | 'adaptiveMasteryDiagnostics'
    | 'uiUxEngagement'
    | 'curriculumDepth'
    | 'parentCoachAnalytics'
    | 'evidenceAndOutcomeTracking'
    | 'safetyPrivacyGovernance'
    | 'dataInfrastructure'
    | 'deploymentAndQualityGates';

export type BenchmarkSourceKind = 'official_product' | 'official_curriculum' | 'external_efficacy' | 'learning_science';

export interface BenchmarkSource {
    id: string;
    label: string;
    url: string;
    kind: BenchmarkSourceKind;
    benchmarkSignal: string;
}

export interface CompetitiveProfile {
    product: string;
    sourceIds: string[];
    leadingSignals: string[];
    henryImplication: string;
}

export interface FullstackBenchmarkDimension {
    key: BenchmarkDimensionKey;
    label: string;
    weightPct: number;
    henryScore10: number;
    topBenchmarks: string[];
    currentHenryEvidence: string[];
    gap: string;
    nextUpgrade: string;
    evidenceNeededBeforeEfficacyClaim: string;
    sourceIds: string[];
}

export interface BenchmarkRoadmapItem {
    priority: 1 | 2 | 3 | 4;
    title: string;
    whyNow: string;
    measurableGate: string;
}

export interface LiveUpgradeSignal {
    label: string;
    value: string;
    detail: string;
    tone: 'good' | 'info' | 'warn' | 'risk';
}

export interface VietnamCurriculumBenchmarkCheck {
    key: string;
    label: string;
    status: 'covered';
    requiredForBenchmark100Pct: boolean;
    evidence: string[];
    verificationGate: string;
    sourceIds: string[];
}

export interface VietnamCurriculumSubjectCoverage {
    subject: string;
    gradeBand: string;
    appSurface: string;
    status: 'source_mapped';
    sourceIds: string[];
    nextGate: string;
}

export type PrimaryCurriculumScopeStatus = 'in_app_mapped' | 'benchmark_scope_only' | 'optional_reference';

export interface PrimaryCurriculumScopeItem {
    key: string;
    label: string;
    gradeBand: string;
    officialRole: 'mandatory' | 'optional';
    status: PrimaryCurriculumScopeStatus;
    appSurface: string;
    plainLanguage: string;
    verificationGate: string;
    sourceIds: string[];
}

export interface PrimaryCurriculumExplanationExample {
    id: string;
    grade: 1 | 2 | 3 | 4 | 5;
    subject: string;
    competencyFocus: string;
    childFriendlyExplanation: string;
    exampleTask: string;
    evidenceToStore: string;
    sourceIds: string[];
}

export const FULLSTACK_BENCHMARK_AS_OF = '2026-04-29';

export const LIVE_UPGRADE_SIGNALS: LiveUpgradeSignal[] = [
    {
        label: 'Bản live mới',
        value: '57/100',
        detail: 'Điểm cạnh tranh tăng sau khi có curriculum map lớp 1-5; chưa nâng điểm hiệu quả học tập.',
        tone: 'info',
    },
    {
        label: 'Curriculum map',
        value: '47/47 topic',
        detail: 'Toàn bộ topic generator đang có trong app đã được map tới môn, lớp, mạch nội dung và minh chứng cần lưu.',
        tone: 'good',
    },
    {
        label: 'Scope tiểu học',
        value: '13 nhóm',
        detail: 'Bao gồm 11 môn học/hoạt động giáo dục bắt buộc và 2 nhóm tự chọn theo phạm vi chính thức.',
        tone: 'good',
    },
    {
        label: 'Gate còn thiếu',
        value: 'Item audit',
        detail: 'Bước tiếp theo là gắn curriculumMapId vào từng item, source version, người duyệt và calibration.',
        tone: 'warn',
    },
];

export const BENCHMARK_PAGE_NAV = [
    { href: '#live-upgrade', label: 'Live mới' },
    { href: '#vietnam-curriculum', label: 'CT Việt Nam' },
    { href: '#primary-scope', label: 'Tiểu học' },
    { href: '#topic-map', label: '47 topic' },
    { href: '#scorecard', label: 'Scorecard' },
    { href: '#sources', label: 'Nguồn' },
];

export const FULLSTACK_BENCHMARK_SOURCES: BenchmarkSource[] = [
    {
        id: 'khanmigo',
        label: 'Khanmigo',
        url: 'https://blog.khanacademy.org/ai-tutor-tutoring-khanmigo-kl/',
        kind: 'official_product',
        benchmarkSignal: 'AI tutor theo hướng gợi mở, không chỉ đưa đáp án trực tiếp.',
    },
    {
        id: 'ixl-diagnostic',
        label: 'IXL Real-Time Diagnostic',
        url: 'https://www.ixl.com/benchmark/info',
        kind: 'official_product',
        benchmarkSignal: 'Chẩn đoán năng lực, action plan cá nhân hóa và insight cập nhật.',
    },
    {
        id: 'dreambox-adaptivity',
        label: 'DreamBox Math adaptivity',
        url: 'https://dreamboxlearning.zendesk.com/hc/en-us/articles/27281596241043-DreamBox-Math-Continuous-Assessment-Adaptivity',
        kind: 'official_product',
        benchmarkSignal: 'Đường học thích ứng dựa trên proficiency và dữ liệu bài hoàn thành.',
    },
    {
        id: 'duolingo-abc',
        label: 'Duolingo ABC',
        url: 'https://play.google.com/store/apps/details?hl=en_US&id=com.duolingo.literacy',
        kind: 'official_product',
        benchmarkSignal: 'Micro-lesson đọc viết ngắn, game-like, an toàn cho trẻ nhỏ.',
    },
    {
        id: 'beast-academy',
        label: 'Beast Academy Online',
        url: 'https://beastacademy.com/online',
        kind: 'official_product',
        benchmarkSignal: 'Toán tiểu học sâu, nhiều bài toán, dashboard phụ huynh và tư duy giải quyết vấn đề.',
    },
    {
        id: 'zearn-reports',
        label: 'Zearn reporting suite',
        url: 'https://help.zearn.org/hc/en-us/articles/29008224450967-Zearn-reporting-suite',
        kind: 'official_product',
        benchmarkSignal: 'Báo cáo tiến độ, engagement, số phút học và export dữ liệu cho vận hành.',
    },
    {
        id: 'st-math-essa',
        label: 'ST Math - Evidence for ESSA',
        url: 'https://www.evidenceforessa.org/program/st-math-spatial-temporal-math/',
        kind: 'external_efficacy',
        benchmarkSignal: 'Có đánh giá hiệu quả bên ngoài, số nghiên cứu và effect size công khai.',
    },
    {
        id: 'eef-metacognition',
        label: 'EEF metacognition and self-regulation',
        url: 'https://educationendowmentfoundation.org.uk/news/updated-eef-guide-to-metacognition-and-self-regulation',
        kind: 'learning_science',
        benchmarkSignal: 'Plan-monitor-evaluate là khung evidence base cho tự học và phản tư.',
    },
    {
        id: 'moet-ctgdpt-2018',
        label: 'Bộ GDĐT - Chương trình GDPT 2018',
        url: 'https://moet.gov.vn/tintuc/pages/tin-hoat-dong-cua-bo.aspx?ItemID=5755',
        kind: 'official_curriculum',
        benchmarkSignal: 'Nguồn chương trình tổng thể và các chương trình môn học làm chuẩn gốc cho giáo dục phổ thông Việt Nam.',
    },
    {
        id: 'moet-tt17-2025',
        label: 'Thông tư 17/2025/TT-BGDĐT',
        url: 'https://moet.gov.vn/van-ban/vanban/Pages/chi-tiet-van-ban.aspx?ItemID=1600',
        kind: 'official_curriculum',
        benchmarkSignal: 'Sửa đổi, bổ sung một số nội dung trong Chương trình GDPT 2018 để phù hợp thay đổi hành chính và thực tiễn môn học.',
    },
    {
        id: 'moet-sgk-2026-2027',
        label: 'Bộ GDĐT - SGK thống nhất từ năm học 2026-2027',
        url: 'https://www.moet.gov.vn/tintuc/Pages/tin-hoat-dong-cua-bo.aspx?ItemID=11222',
        kind: 'official_curriculum',
        benchmarkSignal: 'Mốc năm học 2026-2027 cần tách rõ chương trình, sách giáo khoa và item mapping khi benchmark.',
    },
    {
        id: 'moet-primary-scope-2018',
        label: 'Bộ GDĐT - phạm vi giáo dục tiểu học CTGDPT 2018',
        url: 'https://moet.gov.vn/tintuc/Pages/CT-GDPT-Moi.aspx?ItemID=5756',
        kind: 'official_curriculum',
        benchmarkSignal: 'Cấp tiểu học gồm 11 môn học/hoạt động giáo dục bắt buộc và 2 môn học tự chọn; mỗi tiết 35 phút.',
    },
];

export const COMPETITIVE_PROFILES: CompetitiveProfile[] = [
    {
        product: 'Khanmigo / Khan Academy',
        sourceIds: ['khanmigo'],
        leadingSignals: ['AI tutor có định hướng gợi mở', 'Bao phủ nhiều môn', 'Gắn với hệ sinh thái bài học sẵn có'],
        henryImplication: 'AI gia sư của Henry phải hỏi ngược, phát hiện lỗi tư duy và ghi log, không dừng ở chat trang trí.',
    },
    {
        product: 'IXL / DreamBox',
        sourceIds: ['ixl-diagnostic', 'dreambox-adaptivity'],
        leadingSignals: ['Chẩn đoán liên tục', 'Đường học thích ứng', 'Đề xuất kỹ năng tiếp theo dựa trên dữ liệu bài làm'],
        henryImplication: 'Henry cần biến attempt, lỗi sai, mức gợi ý và lịch ôn thành quyết định học tiếp có kiểm soát.',
    },
    {
        product: 'Duolingo ABC / Beast Academy',
        sourceIds: ['duolingo-abc', 'beast-academy'],
        leadingSignals: ['Phiên học ngắn có nhịp', 'Nội dung sâu', 'Phụ huynh theo dõi được tiến bộ'],
        henryImplication: 'Henry phải giữ trải nghiệm trẻ nhỏ ngắn, rõ, nhưng vẫn có đường tăng tốc cho trẻ học nhanh.',
    },
    {
        product: 'Zearn / ST Math / EEF',
        sourceIds: ['zearn-reports', 'st-math-essa', 'eef-metacognition'],
        leadingSignals: ['Báo cáo vận hành', 'Evidence hiệu quả bên ngoài', 'Khung tự điều chỉnh học tập'],
        henryImplication: 'Henry chưa được claim hiệu quả học tập cho đến khi có cohort thật, pre/post và retention đủ mẫu.',
    },
    {
        product: 'Bộ GDĐT Việt Nam / CTGDPT 2018 cập nhật 2025',
        sourceIds: ['moet-ctgdpt-2018', 'moet-tt17-2025', 'moet-sgk-2026-2027'],
        leadingSignals: ['Chuẩn chương trình chính thức', 'Mốc cập nhật 2025', 'Mốc sách giáo khoa thống nhất từ năm học 2026-2027'],
        henryImplication: 'Henry phải version hóa nguồn chương trình, map từng môn/lớp/mạch và không nói phủ 100% item nếu chưa audit từng câu hỏi.',
    },
];

export const FULLSTACK_BENCHMARK_DIMENSIONS: FullstackBenchmarkDimension[] = [
    {
        key: 'aiTutorScaffolding',
        label: 'AI gia sư và sửa lỗi tư duy',
        weightPct: 15,
        henryScore10: 6.4,
        topBenchmarks: ['Khanmigo'],
        currentHenryEvidence: [
            'Có tutor engine theo vai trò tutor/coach/safety.',
            'Có log tương tác AI và test cho hành vi không đưa đáp án trần trụi.',
        ],
        gap: 'Chưa có đánh giá chất lượng hội thoại theo rubric và chưa đo tỉ lệ trẻ tự sửa được lỗi sau gợi ý.',
        nextUpgrade: 'Thêm rubric chấm hội thoại AI: hỏi gợi mở, phát hiện misconception, không làm thay, có bước phản tư.',
        evidenceNeededBeforeEfficacyClaim: 'Tối thiểu log hội thoại ẩn danh, bài trước/sau gợi ý và tỉ lệ tự sửa lỗi theo chủ đề.',
        sourceIds: ['khanmigo', 'eef-metacognition'],
    },
    {
        key: 'adaptiveMasteryDiagnostics',
        label: 'Chẩn đoán và thích ứng học thật',
        weightPct: 14,
        henryScore10: 6.1,
        topBenchmarks: ['IXL', 'DreamBox'],
        currentHenryEvidence: [
            'Có mastery state, attempt, lỗi sai, spaced review và adaptive acceleration.',
            'Dashboard phụ huynh đã phân biệt thiếu mẫu với sẵn sàng tăng tốc.',
        ],
        gap: 'Chưa có bài chẩn đoán đầu vào chuẩn hóa và chưa hiệu chỉnh độ khó bằng dữ liệu cohort thật.',
        nextUpgrade: 'Tạo diagnostic warm-start 15 phút theo môn, dùng kết quả để đặt level ban đầu và kế hoạch 7 ngày.',
        evidenceNeededBeforeEfficacyClaim: 'Cần theo dõi độ chính xác dự báo level, thời gian học, độ bền sau 7 ngày và lỗi tái phát.',
        sourceIds: ['ixl-diagnostic', 'dreambox-adaptivity'],
    },
    {
        key: 'uiUxEngagement',
        label: 'UI/UX học ngắn và bền',
        weightPct: 10,
        henryScore10: 6.2,
        topBenchmarks: ['Duolingo ABC', 'Beast Academy'],
        currentHenryEvidence: [
            'Có phân vai trẻ/phụ huynh, session học, Elite track, đọc sách và dashboard.',
            'Build static export chạy được trên GitHub Pages.',
        ],
        gap: 'Chưa có Playwright/Lighthouse trên mobile và chưa đo drop-off từng màn hình.',
        nextUpgrade: 'Thêm smoke test visual mobile cho luồng vào học, làm bài, xem gợi ý, xem dashboard.',
        evidenceNeededBeforeEfficacyClaim: 'Cần completion rate, time-on-task, số lần bỏ phiên và phản hồi phụ huynh.',
        sourceIds: ['duolingo-abc', 'beast-academy'],
    },
    {
        key: 'curriculumDepth',
        label: 'Độ sâu chương trình và nhiệm vụ chuyển giao',
        weightPct: 11,
        henryScore10: 6.8,
        topBenchmarks: ['Bộ GDĐT CTGDPT 2018/2025', 'Beast Academy', 'Khan Academy'],
        currentHenryEvidence: [
            'Có topic blueprint theo môn, practice design, parent coaching và stretch task.',
            'Có nhiều generator nội dung cho Toán, Tiếng Việt, Tiếng Anh, Khoa học, Lịch sử - Địa lý, Tin học.',
            'Đã bổ sung benchmark nguồn chính thức cho Chương trình GDPT Việt Nam năm học 2026-2027.',
            `Đã map ${PRIMARY_CURRICULUM_MAP_STATS.topicMapCount}/${PRIMARY_CURRICULUM_MAP_STATS.topicMapCount} topic generator lớp 1-5 tới mạch nội dung, yêu cầu cần đạt, ví dụ nhiệm vụ và minh chứng cần lưu.`,
        ],
        gap: 'Đã có topic-level curriculum map lớp 1-5, nhưng từng item cụ thể vẫn chưa có curriculumMapId, người duyệt và item calibration.',
        nextUpgrade: 'Gắn curriculumMapId vào từng generated item, lưu source version trong attempt log và thêm review queue cho người duyệt.',
        evidenceNeededBeforeEfficacyClaim: 'Cần item bank đã duyệt, độ khó thực nghiệm, tỉ lệ phân biệt và lỗi thường gặp theo tuổi.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-tt17-2025', 'moet-sgk-2026-2027', 'beast-academy', 'khanmigo'],
    },
    {
        key: 'parentCoachAnalytics',
        label: 'Dashboard phụ huynh và hành động tại nhà',
        weightPct: 11,
        henryScore10: 5.7,
        topBenchmarks: ['Zearn', 'Beast Academy'],
        currentHenryEvidence: [
            'Có dashboard phụ huynh, weekly review, mission, analytics và adaptive dashboard.',
            'Có one highlight / one concern / one action dựa trên dữ liệu local.',
        ],
        gap: 'Dashboard chưa có mục tiêu tuần, so sánh trước/sau và export báo cáo cho phụ huynh.',
        nextUpgrade: 'Thêm mục tiêu tuần có bằng chứng: 3 phiên, 1 lỗi sửa xong, 1 chủ đề tăng độ bền sau ôn.',
        evidenceNeededBeforeEfficacyClaim: 'Cần parent action completion, số phiên đồng hành và thay đổi accuracy sau can thiệp.',
        sourceIds: ['zearn-reports', 'beast-academy'],
    },
    {
        key: 'evidenceAndOutcomeTracking',
        label: 'Hiệu quả học tập có bằng chứng',
        weightPct: 14,
        henryScore10: 3.2,
        topBenchmarks: ['ST Math', 'EEF'],
        currentHenryEvidence: [
            'Có evidence dashboard nội bộ, anti-hallucination về thiếu mẫu và test không bịa accuracy.',
            'Có tài liệu audit nêu rõ các gate đã chạy.',
        ],
        gap: 'Chưa có người học thật, chưa có cohort, chưa có pre/post, retention hoặc effect size.',
        nextUpgrade: 'Thiết kế pilot 4 tuần: pre-test, post-test, retention sau 7 ngày, log thời gian học và lỗi tái phát.',
        evidenceNeededBeforeEfficacyClaim: 'Bắt buộc có dữ liệu người học thật, nhóm so sánh hoặc baseline, tiêu chí loại trừ và phân tích trước khi claim hiệu quả.',
        sourceIds: ['st-math-essa', 'eef-metacognition'],
    },
    {
        key: 'safetyPrivacyGovernance',
        label: 'An toàn trẻ em và quyền riêng tư',
        weightPct: 10,
        henryScore10: 6,
        topBenchmarks: ['Duolingo ABC', 'Khanmigo'],
        currentHenryEvidence: [
            'Có safety settings, vai trò phụ huynh và policy docs.',
            'AI tutor có guardrail để không thay phụ huynh hoặc làm hộ bài.',
        ],
        gap: 'Chưa có privacy checklist deploy, data retention policy trong UI và test cho nội dung nhạy cảm mở rộng.',
        nextUpgrade: 'Thêm privacy status panel: dữ liệu lưu local, quyền xóa, giới hạn AI và checklist consent phụ huynh.',
        evidenceNeededBeforeEfficacyClaim: 'Cần log kiểm thử safety prompt, dữ liệu consent và đánh giá rủi ro trước pilot.',
        sourceIds: ['duolingo-abc', 'khanmigo'],
    },
    {
        key: 'dataInfrastructure',
        label: 'Hạ tầng dữ liệu và vận hành',
        weightPct: 9,
        henryScore10: 4.6,
        topBenchmarks: ['Zearn', 'IXL'],
        currentHenryEvidence: [
            'Có event model, local store và nhiều dashboard đọc dữ liệu thật trong app.',
            'Có test unit cho resource, evidence, tutor, mastery và scheduler.',
        ],
        gap: 'Chưa có backend/persistence đồng bộ, export chuẩn và cohort analytics.',
        nextUpgrade: 'Định nghĩa analytics export schema, snapshot weekly và adapter backend khi rời local-only.',
        evidenceNeededBeforeEfficacyClaim: 'Cần dữ liệu phiên học có timestamp, user cohort, version content và tracking mất mẫu.',
        sourceIds: ['zearn-reports', 'ixl-diagnostic'],
    },
    {
        key: 'deploymentAndQualityGates',
        label: 'Build, test và deploy live',
        weightPct: 6,
        henryScore10: 7,
        topBenchmarks: ['Production learning apps'],
        currentHenryEvidence: [
            'Có GitHub Pages workflow, static export và test suite Vitest.',
            'Repo có audit docs và handoff docs cho nâng cấp tiếp theo.',
        ],
        gap: 'Chưa có end-to-end test bắt buộc trong CI và chưa có monitoring live.',
        nextUpgrade: 'Đưa Playwright smoke vào CI cho trang chính, child session, parent dashboard và benchmark.',
        evidenceNeededBeforeEfficacyClaim: 'Cần release gate có build, unit, visual smoke và dữ liệu phiên bản nội dung.',
        sourceIds: ['zearn-reports'],
    },
];

export const VIETNAM_CURRICULUM_BENCHMARK_CHECKS: VietnamCurriculumBenchmarkCheck[] = [
    {
        key: 'official-program-source',
        label: 'Nguồn Chương trình GDPT chính thức',
        status: 'covered',
        requiredForBenchmark100Pct: true,
        evidence: [
            'Có nguồn Bộ GDĐT cho Chương trình giáo dục phổ thông 2018.',
            'Nguồn được dùng làm chuẩn gốc cho môn học, lớp học và mạch năng lực.',
        ],
        verificationGate: 'Mọi curriculum map phải lưu sourceId moet-ctgdpt-2018 và ngày/asOf của benchmark.',
        sourceIds: ['moet-ctgdpt-2018'],
    },
    {
        key: 'amendment-2025-source',
        label: 'Cập nhật chương trình 2025',
        status: 'covered',
        requiredForBenchmark100Pct: true,
        evidence: [
            'Có nguồn Thông tư 17/2025/TT-BGDĐT sửa đổi, bổ sung một số nội dung của Chương trình GDPT 2018.',
            'Các môn chịu tác động như Lịch sử và Địa lí, Địa lí lớp 12, Lịch sử lớp 10 và Giáo dục công dân/Giáo dục kinh tế và pháp luật lớp 10 được đặt vào scope cập nhật.',
        ],
        verificationGate: 'Các topic Lịch sử - Địa lý và nội dung công dân/pháp luật phải được re-audit theo sourceId moet-tt17-2025 trước khi phát hành content mới.',
        sourceIds: ['moet-tt17-2025'],
    },
    {
        key: 'school-year-2026-2027-source',
        label: 'Mốc năm học 2026-2027',
        status: 'covered',
        requiredForBenchmark100Pct: true,
        evidence: [
            'Có nguồn Bộ GDĐT nêu mốc triển khai một bộ sách giáo khoa thống nhất từ năm học 2026-2027.',
            'Benchmark tách rõ chương trình, sách giáo khoa và item mapping để tránh nói quá phạm vi.',
        ],
        verificationGate: 'Khi Bộ GDĐT công bố danh mục/sách cụ thể, cập nhật source version và so sánh item bank với sách giáo khoa được dùng.',
        sourceIds: ['moet-sgk-2026-2027'],
    },
    {
        key: 'active-subject-source-map',
        label: 'Map nguồn cho toàn bộ môn đang có trong app',
        status: 'covered',
        requiredForBenchmark100Pct: true,
        evidence: [
            'Các môn đang có trong Henry gồm Toán, Tiếng Việt, Tiếng Anh, Khoa học, Lịch sử - Địa lý và Tin học đều có mapping nguồn chương trình.',
            'Benchmark dùng CTGDPT Việt Nam làm nguồn chính, còn Khan Academy/Beast Academy/IXL/DreamBox là benchmark sản phẩm bổ trợ.',
        ],
        verificationGate: 'Không cho thêm môn hoặc generator mới nếu không có subject coverage, sourceIds và nextGate tương ứng.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-tt17-2025'],
    },
    {
        key: 'no-overclaim-gate',
        label: 'Gate chống claim phủ chuẩn quá mức',
        status: 'covered',
        requiredForBenchmark100Pct: true,
        evidence: [
            '100/100 ở đây là coverage của benchmark nguồn và gate kiểm chứng, không phải tuyên bố mọi bài học đã phủ đủ yêu cầu cần đạt.',
            'Score hiệu quả học tập vẫn bị giữ thấp cho đến khi có dữ liệu người học thật.',
        ],
        verificationGate: 'Không được hiển thị claim phủ 100% chương trình ở nội dung học nếu chưa có item-level audit và người duyệt.',
        sourceIds: ['moet-ctgdpt-2018', 'st-math-essa', 'eef-metacognition'],
    },
];

export const VIETNAM_CURRICULUM_SUBJECT_COVERAGE: VietnamCurriculumSubjectCoverage[] = [
    {
        subject: 'Toán',
        gradeBand: 'Lớp 1-5 đang có trong app; CTGDPT 2018 là chuẩn nguồn',
        appSurface: 'math-generator, topic blueprint, enrichment layer',
        status: 'source_mapped',
        sourceIds: ['moet-ctgdpt-2018'],
        nextGate: 'Map từng câu hỏi tới lớp, mạch số và phép tính, hình học, đo lường, thống kê/xác suất.',
    },
    {
        subject: 'Tiếng Việt',
        gradeBand: 'Lớp 1-5 đang có trong app; CTGDPT 2018 là chuẩn nguồn',
        appSurface: 'vietnamese-generator, đọc hiểu, chính tả, từ vựng, ngữ pháp',
        status: 'source_mapped',
        sourceIds: ['moet-ctgdpt-2018'],
        nextGate: 'Map từng bài tới đọc, viết, nói và nghe; kiểm tra lỗi dấu thanh, âm/vần và diễn đạt.',
    },
    {
        subject: 'Tiếng Anh',
        gradeBand: 'Lớp 1-5 trong app; Ngoại ngữ 1 CTGDPT 2018 là chuẩn nguồn',
        appSurface: 'english-generator, vocab, reading, communication practice',
        status: 'source_mapped',
        sourceIds: ['moet-ctgdpt-2018'],
        nextGate: 'Map từ vựng, mẫu câu, nghe-nói-đọc-viết theo lớp và tình huống giao tiếp.',
    },
    {
        subject: 'Khoa học / Tự nhiên và Xã hội',
        gradeBand: 'Tự nhiên và Xã hội lớp 1-3; Khoa học lớp 4-5',
        appSurface: 'science-generator, quan sát, sức khỏe, môi trường, vật chất và năng lượng',
        status: 'source_mapped',
        sourceIds: ['moet-ctgdpt-2018'],
        nextGate: 'Map từng hoạt động tới quan sát, đặt câu hỏi, giải thích hiện tượng và vận dụng an toàn.',
    },
    {
        subject: 'Lịch sử và Địa lý',
        gradeBand: 'Lớp 4-5 đang có trong app; cập nhật theo Thông tư 17/2025 khi liên quan địa giới',
        appSurface: 'history-geo-generator, bản đồ, dòng thời gian, địa phương, Việt Nam',
        status: 'source_mapped',
        sourceIds: ['moet-ctgdpt-2018', 'moet-tt17-2025'],
        nextGate: 'Re-audit câu hỏi địa danh, đơn vị hành chính và nội dung lịch sử/địa lý chịu tác động cập nhật 2025.',
    },
    {
        subject: 'Tin học và Công nghệ',
        gradeBand: 'Lớp 3-5 trong CTGDPT 2018; app đang có computing topics',
        appSurface: 'computing-generator, thiết bị, dữ liệu, an toàn, thuật toán',
        status: 'source_mapped',
        sourceIds: ['moet-ctgdpt-2018'],
        nextGate: 'Map từng item tới thiết bị số, an toàn, dữ liệu, thuật toán và sản phẩm số.',
    },
];

export const PRIMARY_SCHOOL_CURRICULUM_SCOPE: PrimaryCurriculumScopeItem[] = [
    {
        key: 'primary-vietnamese',
        label: 'Tiếng Việt',
        gradeBand: 'Lớp 1-5',
        officialRole: 'mandatory',
        status: 'in_app_mapped',
        appSurface: 'vietnamese-generator, đọc hiểu, chính tả, từ vựng, ngữ pháp',
        plainLanguage: 'Trẻ cần đọc được, viết được, nói rõ ý và nghe hiểu; không chỉ làm đúng trắc nghiệm.',
        verificationGate: 'Mỗi item Tiếng Việt phải ghi rõ lớp, mạch đọc/viết/nói-nghe, lỗi thường gặp và minh chứng con tự diễn đạt.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-primary-scope-2018'],
    },
    {
        key: 'primary-math',
        label: 'Toán',
        gradeBand: 'Lớp 1-5',
        officialRole: 'mandatory',
        status: 'in_app_mapped',
        appSurface: 'math-generator, topic blueprint, enrichment layer',
        plainLanguage: 'Trẻ cần hiểu số, phép tính, hình, đo lường, dữ liệu và biết giải thích cách làm.',
        verificationGate: 'Mỗi item Toán phải ghi rõ lớp, mạch kiến thức, chiến lược giải, bước kiểm tra và lỗi sai dự kiến.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-primary-scope-2018'],
    },
    {
        key: 'primary-ethics',
        label: 'Đạo đức',
        gradeBand: 'Lớp 1-5',
        officialRole: 'mandatory',
        status: 'benchmark_scope_only',
        appSurface: 'Chưa có module riêng; cần nối với parent mission và tình huống gia đình/trường học',
        plainLanguage: 'Trẻ cần biết lựa chọn việc đúng trong tình huống gần gũi, nói được lý do và làm lại được trong đời sống.',
        verificationGate: 'Trước khi claim coverage, cần tình huống đạo đức theo lớp, đáp án mở, tiêu chí hành vi và phản hồi phụ huynh.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-primary-scope-2018'],
    },
    {
        key: 'primary-foreign-language-1-mandatory',
        label: 'Ngoại ngữ 1',
        gradeBand: 'Bắt buộc ở lớp 3-5',
        officialRole: 'mandatory',
        status: 'in_app_mapped',
        appSurface: 'english-generator, vocab, reading, communication practice',
        plainLanguage: 'Trẻ cần dùng tiếng Anh trong tình huống ngắn: nghe, nói, đọc, viết ở mức phù hợp lứa tuổi.',
        verificationGate: 'Mỗi item Tiếng Anh phải ghi rõ kỹ năng, tình huống giao tiếp, từ/mẫu câu mục tiêu và mức hỗ trợ tiếng Việt.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-primary-scope-2018'],
    },
    {
        key: 'primary-natural-social-science',
        label: 'Tự nhiên và Xã hội',
        gradeBand: 'Lớp 1-3',
        officialRole: 'mandatory',
        status: 'in_app_mapped',
        appSurface: 'science-generator, quan sát, sức khỏe, môi trường, gia đình và cộng đồng',
        plainLanguage: 'Trẻ học bằng quan sát đời sống: cơ thể, gia đình, trường học, cây cối, con vật, môi trường và an toàn.',
        verificationGate: 'Mỗi item phải có câu hỏi quan sát, liên hệ đời sống, từ khóa an toàn và bằng chứng con giải thích bằng lời của mình.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-primary-scope-2018'],
    },
    {
        key: 'primary-history-geography',
        label: 'Lịch sử và Địa lý',
        gradeBand: 'Lớp 4-5',
        officialRole: 'mandatory',
        status: 'in_app_mapped',
        appSurface: 'history-geo-generator, bản đồ, dòng thời gian, địa phương, Việt Nam',
        plainLanguage: 'Trẻ cần đọc bản đồ, hiểu mốc thời gian, nhân vật, địa danh và biết nói ý nghĩa bằng lời dễ hiểu.',
        verificationGate: 'Re-audit mọi item địa danh, đơn vị hành chính và bản đồ theo Thông tư 17/2025 trước khi phát hành.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-tt17-2025', 'moet-primary-scope-2018'],
    },
    {
        key: 'primary-science',
        label: 'Khoa học',
        gradeBand: 'Lớp 4-5',
        officialRole: 'mandatory',
        status: 'in_app_mapped',
        appSurface: 'science-generator, vật chất, năng lượng, thực vật, động vật, sức khỏe, môi trường',
        plainLanguage: 'Trẻ cần quan sát, thử nghiệm đơn giản, giải thích hiện tượng và biết áp dụng an toàn trong đời sống.',
        verificationGate: 'Mỗi item Khoa học phải có hiện tượng, bằng chứng quan sát, câu hỏi vì sao và bước vận dụng an toàn.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-primary-scope-2018'],
    },
    {
        key: 'primary-computing-technology',
        label: 'Tin học và Công nghệ',
        gradeBand: 'Lớp 3-5',
        officialRole: 'mandatory',
        status: 'in_app_mapped',
        appSurface: 'computing-generator, thiết bị, dữ liệu, an toàn, thuật toán',
        plainLanguage: 'Trẻ cần dùng thiết bị số an toàn, hiểu dữ liệu đơn giản, làm theo thuật toán và tạo sản phẩm số nhỏ.',
        verificationGate: 'Mỗi item phải ghi rõ thiết bị/dữ liệu/thuật toán/an toàn, kèm thao tác kiểm chứng không cần chat tự do.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-primary-scope-2018'],
    },
    {
        key: 'primary-physical-education',
        label: 'Giáo dục thể chất',
        gradeBand: 'Lớp 1-5',
        officialRole: 'mandatory',
        status: 'benchmark_scope_only',
        appSurface: 'Chưa có module vận động; có thể nối với thói quen nghỉ vận động và parent mission',
        plainLanguage: 'Trẻ cần vận động đúng, an toàn, hình thành thói quen sức khỏe; app chỉ nên nhắc và ghi nhận, không thay giáo viên.',
        verificationGate: 'Nếu đưa vào app, cần bài vận động an toàn theo tuổi, cảnh báo phụ huynh và không chấm kỹ thuật nguy hiểm qua AI.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-primary-scope-2018'],
    },
    {
        key: 'primary-arts',
        label: 'Nghệ thuật',
        gradeBand: 'Âm nhạc, Mĩ thuật lớp 1-5',
        officialRole: 'mandatory',
        status: 'benchmark_scope_only',
        appSurface: 'Chưa có module nghệ thuật; có thể nối với đọc sách, vẽ, kể chuyện và portfolio',
        plainLanguage: 'Trẻ cần cảm thụ, thể hiện và nói về sản phẩm nghệ thuật; không nên chấm theo một đáp án cứng.',
        verificationGate: 'Cần rubric sản phẩm mở, ảnh/ghi âm minh chứng, consent phụ huynh và tiêu chí khuyến khích sáng tạo.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-primary-scope-2018'],
    },
    {
        key: 'primary-experiential-activity',
        label: 'Hoạt động trải nghiệm',
        gradeBand: 'Lớp 1-5',
        officialRole: 'mandatory',
        status: 'benchmark_scope_only',
        appSurface: 'Parent mission, weekly review và hoạt động gia đình đang là nền nối gần nhất',
        plainLanguage: 'Trẻ học qua việc làm thật: tự phục vụ, hợp tác, quan sát cộng đồng, đặt mục tiêu và tự nhìn lại.',
        verificationGate: 'Mỗi nhiệm vụ trải nghiệm phải có mục tiêu, bằng chứng hoàn thành, phản tư của trẻ và xác nhận phụ huynh.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-primary-scope-2018'],
    },
    {
        key: 'primary-minority-language-optional',
        label: 'Tiếng dân tộc thiểu số',
        gradeBand: 'Tự chọn ở cấp tiểu học',
        officialRole: 'optional',
        status: 'optional_reference',
        appSurface: 'Chưa triển khai; chỉ giữ trong scope để không bỏ sót phạm vi chính thức',
        plainLanguage: 'Đây là môn tự chọn theo nhu cầu và điều kiện; app không được tự sinh nội dung nếu thiếu nguồn/người duyệt phù hợp.',
        verificationGate: 'Chỉ triển khai khi có chương trình, ngữ liệu được phép dùng, người duyệt ngôn ngữ và consent gia đình.',
        sourceIds: ['moet-primary-scope-2018'],
    },
    {
        key: 'primary-foreign-language-1-optional',
        label: 'Ngoại ngữ 1 lớp 1-2',
        gradeBand: 'Tự chọn ở lớp 1-2',
        officialRole: 'optional',
        status: 'optional_reference',
        appSurface: 'english-generator có thể dùng như enrichment, không thay chương trình bắt buộc',
        plainLanguage: 'Lớp 1-2 có thể làm quen ngoại ngữ nhẹ nhàng; mục tiêu là nghe-nói vui, không ép thành bài kiểm tra nặng.',
        verificationGate: 'Nội dung lớp 1-2 phải được gắn nhãn tự chọn/enrichment và có giới hạn thời lượng, không tạo áp lực điểm số.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-primary-scope-2018'],
    },
];

export const PRIMARY_CURRICULUM_EXPLANATION_EXAMPLES: PrimaryCurriculumExplanationExample[] = [
    {
        id: 'grade1-vietnamese-phonics',
        grade: 1,
        subject: 'Tiếng Việt',
        competencyFocus: 'Đọc - viết - nói và nghe ở mức âm, vần, tiếng, câu ngắn',
        childFriendlyExplanation: 'Con không chỉ nhìn chữ và chọn đáp án. Con cần nghe được âm, đọc được tiếng, viết lại đúng và nói một câu ngắn có nghĩa.',
        exampleTask: 'Cho tiếng "mẹ": con đọc to, chỉ ra âm đầu, viết lại vào ô, rồi nói một câu như "Mẹ bế em".',
        evidenceToStore: 'Kết quả đọc/viết, lỗi âm-vần-dấu, thời gian làm và câu con tự nói.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-primary-scope-2018'],
    },
    {
        id: 'grade1-math-number-sense',
        grade: 1,
        subject: 'Toán',
        competencyFocus: 'Hiểu số và phép tính qua đồ vật thật',
        childFriendlyExplanation: 'Con cần hiểu số là số lượng thật. Nếu con chỉ nhớ đáp án nhưng không đếm, không so sánh, hệ thống chưa được tính là đạt.',
        exampleTask: 'Hiện 7 quả táo và 2 quả táo nữa; con kéo nhóm lại, nói "7 thêm 2 là 9", rồi chọn phép tính phù hợp.',
        evidenceToStore: 'Số lần đếm lại, cách con giải thích, lỗi nhầm thêm/bớt và mức gợi ý đã dùng.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-primary-scope-2018'],
    },
    {
        id: 'grade2-natural-social-observation',
        grade: 2,
        subject: 'Tự nhiên và Xã hội',
        competencyFocus: 'Quan sát đời sống và nói điều an toàn',
        childFriendlyExplanation: 'Con cần nhìn hiện tượng quanh mình, nói điều con thấy và chọn cách làm an toàn, không chỉ học thuộc một câu định nghĩa.',
        exampleTask: 'Xem hình cây bị héo; con chọn nguyên nhân có thể xảy ra, nói cần làm gì và giải thích vì sao không bẻ cành.',
        evidenceToStore: 'Câu trả lời quan sát, lý do an toàn, từ khóa đời sống và phản hồi phụ huynh nếu có nhiệm vụ ngoài app.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-primary-scope-2018'],
    },
    {
        id: 'grade3-english-communication',
        grade: 3,
        subject: 'Ngoại ngữ 1',
        competencyFocus: 'Nghe - nói - đọc - viết trong tình huống ngắn',
        childFriendlyExplanation: 'Con cần dùng được tiếng Anh trong một tình huống nhỏ. Dịch đúng từng từ chưa đủ nếu con không nghe, nói hoặc chọn câu phù hợp.',
        exampleTask: 'Nghe câu hỏi "What do you like?", chọn câu trả lời, đọc lại thành tiếng và viết một câu về sở thích của mình.',
        evidenceToStore: 'Kỹ năng được đo, từ/mẫu câu mục tiêu, lỗi phát âm hoặc chọn câu và mức hỗ trợ tiếng Việt.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-primary-scope-2018'],
    },
    {
        id: 'grade3-computing-algorithm',
        grade: 3,
        subject: 'Tin học và Công nghệ',
        competencyFocus: 'Thiết bị số, an toàn và thuật toán đơn giản',
        childFriendlyExplanation: 'Con cần biết làm theo các bước rõ ràng và dùng thiết bị an toàn. Học Tin học không phải chỉ gọi tên máy tính.',
        exampleTask: 'Sắp xếp các thẻ lệnh để nhân vật đi tới ngôi nhà, rồi chọn việc nên làm khi gặp một đường link lạ.',
        evidenceToStore: 'Chuỗi lệnh con chọn, lỗi thứ tự bước, quyết định an toàn số và số lần chạy thử.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-primary-scope-2018'],
    },
    {
        id: 'grade4-history-geography-map',
        grade: 4,
        subject: 'Lịch sử và Địa lý',
        competencyFocus: 'Bản đồ, dòng thời gian, địa danh và ý nghĩa sự kiện',
        childFriendlyExplanation: 'Con cần biết nhìn bản đồ, đặt sự kiện vào thời gian và nói ý nghĩa bằng lời của mình. Nhớ tên riêng thôi chưa đủ.',
        exampleTask: 'Con xem bản đồ Việt Nam, chỉ một vùng/địa danh, đặt một sự kiện vào dòng thời gian và nói điều thay đổi sau sự kiện.',
        evidenceToStore: 'Địa danh đã dùng, mốc thời gian, câu giải thích ý nghĩa và trạng thái re-audit theo Thông tư 17/2025.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-tt17-2025', 'moet-primary-scope-2018'],
    },
    {
        id: 'grade4-science-evidence',
        grade: 4,
        subject: 'Khoa học',
        competencyFocus: 'Quan sát, dự đoán, giải thích hiện tượng',
        childFriendlyExplanation: 'Con cần nói được con quan sát thấy gì, dự đoán điều gì sẽ xảy ra và dùng bằng chứng để giải thích.',
        exampleTask: 'Con xem thí nghiệm hòa tan đường trong nước ấm và nước lạnh, dự đoán bên nào nhanh hơn, rồi giải thích bằng quan sát.',
        evidenceToStore: 'Dự đoán ban đầu, quan sát, câu giải thích vì sao và bước vận dụng an toàn.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-primary-scope-2018'],
    },
    {
        id: 'grade5-vietnamese-writing',
        grade: 5,
        subject: 'Tiếng Việt',
        competencyFocus: 'Đọc hiểu sâu hơn và viết có cấu trúc',
        childFriendlyExplanation: 'Con cần hiểu ý chính, tìm chi tiết quan trọng, lập ý và viết đoạn rõ ràng. Viết dài nhưng lạc ý thì chưa đạt.',
        exampleTask: 'Đọc một đoạn ngắn, gạch ý chính, chọn hai chi tiết làm bằng chứng và viết một đoạn 5-7 câu trả lời câu hỏi.',
        evidenceToStore: 'Ý chính, chi tiết làm bằng chứng, cấu trúc đoạn, lỗi diễn đạt và số lần con tự sửa.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-primary-scope-2018'],
    },
    {
        id: 'grade5-math-transfer',
        grade: 5,
        subject: 'Toán',
        competencyFocus: 'Giải bài toán nhiều bước và kiểm tra kết quả',
        childFriendlyExplanation: 'Con cần hiểu đề, chọn phép tính, giải từng bước và kiểm tra lại. Đúng đáp án nhưng không giải thích được thì chưa chắc bền.',
        exampleTask: 'Bài toán mua đồ có hai bước tính; con tóm tắt đề, viết cách làm, nêu vì sao chọn phép tính và thử kiểm tra đáp án.',
        evidenceToStore: 'Tóm tắt đề, các bước giải, lời giải thích chiến lược, lỗi tính toán và cách kiểm tra.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-primary-scope-2018'],
    },
    {
        id: 'grade5-experiential-reflection',
        grade: 5,
        subject: 'Hoạt động trải nghiệm',
        competencyFocus: 'Làm việc thật, tự đánh giá và phụ huynh xác nhận',
        childFriendlyExplanation: 'Con cần làm một việc cụ thể, nhìn lại con đã làm thế nào và nói lần sau sẽ cải thiện gì. Đây không phải bài quiz một đáp án.',
        exampleTask: 'Con lập kế hoạch dọn góc học tập 15 phút, chụp minh chứng, viết 3 câu tự nhận xét và nhờ phụ huynh xác nhận.',
        evidenceToStore: 'Mục tiêu, minh chứng hoàn thành, phản tư của trẻ, xác nhận phụ huynh và việc làm tiếp theo.',
        sourceIds: ['moet-ctgdpt-2018', 'moet-primary-scope-2018'],
    },
];

export const FULLSTACK_BENCHMARK_ROADMAP: BenchmarkRoadmapItem[] = [
    {
        priority: 1,
        title: 'Pilot evidence pack 4 tuần',
        whyNow: 'Đây là lỗ hổng lớn nhất: sản phẩm có nhiều cơ chế học nhưng chưa có dữ liệu người học thật.',
        measurableGate: 'Có pre/post, retention sau 7 ngày, time-on-task, lỗi tái phát và dashboard phân tích theo cohort.',
    },
    {
        priority: 2,
        title: 'Diagnostic warm-start theo môn',
        whyNow: 'Muốn cạnh tranh với IXL/DreamBox phải biết trẻ đang ở đâu trước khi cá nhân hóa.',
        measurableGate: 'Mỗi môn có bài chẩn đoán 12-15 phút, sinh level ban đầu và kế hoạch 7 ngày có kiểm chứng.',
    },
    {
        priority: 3,
        title: 'AI tutor rubric và regression set',
        whyNow: 'AI gia sư phải đo được chất lượng gợi mở, sửa lỗi tư duy và mức không làm hộ.',
        measurableGate: 'Ít nhất 50 kịch bản hội thoại được chấm bằng rubric và chạy lại trong test trước release.',
    },
    {
        priority: 4,
        title: 'Parent weekly outcome loop',
        whyNow: 'Dashboard chỉ hữu ích khi biến insight thành hành động phụ huynh có thể hoàn thành.',
        measurableGate: 'Mỗi tuần có mục tiêu, việc phụ huynh, bằng chứng hoàn thành và thay đổi accuracy/retention sau can thiệp.',
    },
];

export function computeWeightedBenchmarkScore(dimensions = FULLSTACK_BENCHMARK_DIMENSIONS) {
    const totalWeight = dimensions.reduce((sum, dimension) => sum + dimension.weightPct, 0);
    if (totalWeight === 0) return 0;

    const weightedScore = dimensions.reduce(
        (sum, dimension) => sum + dimension.henryScore10 * dimension.weightPct,
        0,
    ) / totalWeight;

    return Math.round(weightedScore * 10) / 10;
}

export function benchmarkGrade(score10: number) {
    if (score10 >= 8) return 'competitive';
    if (score10 >= 6.5) return 'promising';
    if (score10 >= 5) return 'functional_with_evidence_gap';
    return 'prototype';
}

export function sourceLookup(sourceId: string) {
    return FULLSTACK_BENCHMARK_SOURCES.find((source) => source.id === sourceId);
}

export function computeVietnamCurriculumBenchmarkCoverage(checks = VIETNAM_CURRICULUM_BENCHMARK_CHECKS) {
    const requiredChecks = checks.filter((check) => check.requiredForBenchmark100Pct);
    if (requiredChecks.length === 0) return 0;

    const coveredChecks = requiredChecks.filter((check) => check.status === 'covered');
    return Math.round((coveredChecks.length / requiredChecks.length) * 100);
}

export function computePrimarySchoolScopeCoverage(items = PRIMARY_SCHOOL_CURRICULUM_SCOPE) {
    if (items.length === 0) return 0;

    const coveredItems = items.filter((item) => item.sourceIds.length > 0 && item.verificationGate.length > 0);
    return Math.round((coveredItems.length / items.length) * 100);
}

export const VIETNAM_CURRICULUM_BENCHMARK = {
    schoolYear: '2026-2027',
    coverage100: computeVietnamCurriculumBenchmarkCoverage(),
    primarySchoolScopeCoverage100: computePrimarySchoolScopeCoverage(),
    requiredCheckCount: VIETNAM_CURRICULUM_BENCHMARK_CHECKS.filter((check) => check.requiredForBenchmark100Pct).length,
    coveredSubjectCount: VIETNAM_CURRICULUM_SUBJECT_COVERAGE.length,
    primaryOfficialScopeCount: PRIMARY_SCHOOL_CURRICULUM_SCOPE.length,
    primaryMandatoryCount: PRIMARY_SCHOOL_CURRICULUM_SCOPE.filter((item) => item.officialRole === 'mandatory').length,
    primaryOptionalCount: PRIMARY_SCHOOL_CURRICULUM_SCOPE.filter((item) => item.officialRole === 'optional').length,
    primaryExampleCount: PRIMARY_CURRICULUM_EXPLANATION_EXAMPLES.length,
    scope: '100/100 là coverage của benchmark nguồn, phiên bản và gate kiểm chứng CTGDPT Việt Nam; không đồng nghĩa item bank đã phủ 100% mọi yêu cầu cần đạt.',
    noOverclaimGuardrail: 'Chỉ được claim nội dung bám CTGDPT sau khi từng item có môn, lớp, mạch nội dung, yêu cầu cần đạt, source version và người duyệt.',
};

export const HENRY_FULLSTACK_BENCHMARK = {
    asOf: FULLSTACK_BENCHMARK_AS_OF,
    overallScore10: computeWeightedBenchmarkScore(),
    overallScore100: Math.round(computeWeightedBenchmarkScore() * 10),
    grade: benchmarkGrade(computeWeightedBenchmarkScore()),
    vietnamCurriculumBenchmarkCoverage100: VIETNAM_CURRICULUM_BENCHMARK.coverage100,
    primarySchoolScopeCoverage100: VIETNAM_CURRICULUM_BENCHMARK.primarySchoolScopeCoverage100,
    vietnamCurriculumScope: VIETNAM_CURRICULUM_BENCHMARK.scope,
    conclusion: 'Henry Learning OS đã vượt mức display demo ở phần tutor, adaptive, evidence dashboard và deploy; điểm yếu trọng yếu vẫn là bằng chứng hiệu quả học tập từ người học thật.',
    noClaimGuardrail: 'Không claim tăng điểm, tăng năng lực hoặc hiệu quả vượt phần mềm khác khi chưa có pilot đủ mẫu, pre/post và retention.',
};
