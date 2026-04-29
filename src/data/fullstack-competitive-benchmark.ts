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

export type BenchmarkSourceKind = 'official_product' | 'external_efficacy' | 'learning_science';

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

export const FULLSTACK_BENCHMARK_AS_OF = '2026-04-29';

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
        henryScore10: 6.3,
        topBenchmarks: ['Beast Academy', 'Khan Academy'],
        currentHenryEvidence: [
            'Có topic blueprint theo môn, practice design, parent coaching và stretch task.',
            'Có nhiều generator nội dung cho Toán, Tiếng Việt, Tiếng Anh, Khoa học, Lịch sử - Địa lý, Tin học.',
        ],
        gap: 'Nhiều nội dung vẫn là generated seed, chưa có review học thuật từng mạch và chưa có item calibration.',
        nextUpgrade: 'Ưu tiên 3 mạch Toán/Tiếng Việt/Tiếng Anh lớp 1-3, review item theo misconception và difficulty.',
        evidenceNeededBeforeEfficacyClaim: 'Cần item bank đã duyệt, độ khó thực nghiệm, tỉ lệ phân biệt và lỗi thường gặp theo tuổi.',
        sourceIds: ['beast-academy', 'khanmigo'],
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

export const HENRY_FULLSTACK_BENCHMARK = {
    asOf: FULLSTACK_BENCHMARK_AS_OF,
    overallScore10: computeWeightedBenchmarkScore(),
    overallScore100: Math.round(computeWeightedBenchmarkScore() * 10),
    grade: benchmarkGrade(computeWeightedBenchmarkScore()),
    conclusion: 'Henry Learning OS đã vượt mức display demo ở phần tutor, adaptive, evidence dashboard và deploy; điểm yếu trọng yếu vẫn là bằng chứng hiệu quả học tập từ người học thật.',
    noClaimGuardrail: 'Không claim tăng điểm, tăng năng lực hoặc hiệu quả vượt phần mềm khác khi chưa có pilot đủ mẫu, pre/post và retention.',
};
