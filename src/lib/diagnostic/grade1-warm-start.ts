import { buildCurriculumMapId } from '@/lib/curriculum/item-audit';
import type { PrimaryCurriculumSubjectKey } from '@/data/primary-curriculum-map';

export type DiagnosticSubject = Extract<PrimaryCurriculumSubjectKey, 'math' | 'vietnamese'>;
export type DiagnosticDomain =
    | 'math_number_sense'
    | 'math_spatial_reasoning'
    | 'vietnamese_letters_sounds'
    | 'vietnamese_tones_meaning';
export type DiagnosticStatus = 'missing_data' | 'ready_for_plan';
export type DiagnosticReadinessBand =
    | 'insufficient_evidence'
    | 'foundation_needed'
    | 'guided_practice'
    | 'ready_to_learn'
    | 'stretch_candidate';

export interface Grade1DiagnosticItem {
    id: string;
    subject: DiagnosticSubject;
    subjectLabel: string;
    domain: DiagnosticDomain;
    topicKey: string;
    curriculumMapId: string;
    prompt: string;
    expectedEvidence: string;
    correctAnswer: string;
    misconceptionWatch: string[];
    estimatedSeconds: number;
    sourceIds: string[];
}

export interface DiagnosticItemResponse {
    itemId: string;
    isCorrect: boolean;
    hintLevelUsed: number;
    confidenceSelfRating?: number;
    childExplanation?: string;
    answeredAt?: string;
}

export interface DiagnosticDomainResult {
    domain: DiagnosticDomain;
    subject: DiagnosticSubject;
    answeredCount: number;
    accuracyPct: number | null;
    hintDependencyPct: number | null;
    readinessBand: DiagnosticReadinessBand;
    rootCause: string;
    nextAction: string;
}

export interface DiagnosticWarmStartResult {
    status: DiagnosticStatus;
    gradeLevel: 1;
    answeredCount: number;
    totalItems: number;
    completionPct: number;
    accuracyPct: number | null;
    confidencePct: number;
    weakestDomain: DiagnosticDomain | null;
    domainResults: DiagnosticDomainResult[];
    sevenDayPlan: {
        focus: string;
        parentExplanation: string;
        dailyActions: string[];
        recheckMetric: string;
        recheckAt: string;
    };
    missingDataReason: string | null;
    allowedClaim: string;
    blockedClaim: string;
    sourceIds: string[];
}

export const GRADE1_DIAGNOSTIC_BLUEPRINT = {
    id: 'grade1-math-vietnamese-warm-start-v1',
    gradeLevel: 1,
    estimatedMinutes: 14,
    minimumAnsweredItems: 8,
    minimumAnsweredBySubject: 3,
    sourceIds: ['sot-traceability-matrix', 'repo-curriculum-map', 'moet-ctgdpt-2018', 'ixl-diagnostic', 'dreambox-adaptivity'],
    noOverclaim: 'Diagnostic warm-start chỉ là baseline vận hành ban đầu. Không gọi trẻ là giỏi/yếu và không claim level chính xác nếu chưa validation cohort.',
};

export const GRADE1_DIAGNOSTIC_ITEMS: Grade1DiagnosticItem[] = [
    {
        id: 'diag-g1-math-add-sub-10',
        subject: 'math',
        subjectLabel: 'Toán',
        domain: 'math_number_sense',
        topicKey: 'add_sub_10',
        curriculumMapId: buildCurriculumMapId('math', 'add_sub_10'),
        prompt: 'Con có 6 que tính, thêm 3 que nữa. Con có tất cả bao nhiêu que?',
        expectedEvidence: 'Trẻ nói hoặc thể hiện được hành động thêm vào, không chỉ đoán số.',
        correctAnswer: '9',
        misconceptionWatch: ['Đếm lại từ 1 quá lâu', 'Nhầm thêm với bớt'],
        estimatedSeconds: 70,
        sourceIds: ['moet-ctgdpt-2018', 'repo-curriculum-map'],
    },
    {
        id: 'diag-g1-math-count-20',
        subject: 'math',
        subjectLabel: 'Toán',
        domain: 'math_number_sense',
        topicKey: 'count_20',
        curriculumMapId: buildCurriculumMapId('math', 'count_20'),
        prompt: 'Số 14 gồm mấy chục và mấy đơn vị?',
        expectedEvidence: 'Trẻ phân tích được 14 là 1 chục và 4 đơn vị.',
        correctAnswer: '1 chục 4 đơn vị',
        misconceptionWatch: ['Đọc số đúng nhưng không hiểu chục-đơn vị', 'Bỏ qua vai trò số 1 ở hàng chục'],
        estimatedSeconds: 70,
        sourceIds: ['moet-ctgdpt-2018', 'repo-curriculum-map'],
    },
    {
        id: 'diag-g1-math-number-bonds',
        subject: 'math',
        subjectLabel: 'Toán',
        domain: 'math_number_sense',
        topicKey: 'number_bonds',
        curriculumMapId: buildCurriculumMapId('math', 'number_bonds'),
        prompt: 'Số 8 có thể tách thành 5 và mấy?',
        expectedEvidence: 'Trẻ thấy 8 gồm hai phần 5 và 3, hoặc dùng vật thật để tách.',
        correctAnswer: '3',
        misconceptionWatch: ['Thuộc phép tính rời rạc', 'Không thấy quan hệ tách-ghép'],
        estimatedSeconds: 70,
        sourceIds: ['moet-ctgdpt-2018', 'repo-curriculum-map'],
    },
    {
        id: 'diag-g1-math-compare',
        subject: 'math',
        subjectLabel: 'Toán',
        domain: 'math_number_sense',
        topicKey: 'compare_g1',
        curriculumMapId: buildCurriculumMapId('math', 'compare_g1'),
        prompt: 'Điền dấu đúng: 12 ___ 17.',
        expectedEvidence: 'Trẻ dùng được lớn hơn, bé hơn hoặc trục số để giải thích.',
        correctAnswer: '<',
        misconceptionWatch: ['Đảo chiều dấu', 'So sánh theo chữ số đầu mà không hiểu số lượng'],
        estimatedSeconds: 60,
        sourceIds: ['moet-ctgdpt-2018', 'repo-curriculum-map'],
    },
    {
        id: 'diag-g1-math-shapes',
        subject: 'math',
        subjectLabel: 'Toán',
        domain: 'math_spatial_reasoning',
        topicKey: 'shapes_g1',
        curriculumMapId: buildCurriculumMapId('math', 'shapes_g1'),
        prompt: 'Hình nào có 3 cạnh? Con nói tên hình và chỉ 3 cạnh.',
        expectedEvidence: 'Trẻ gọi đúng hình tam giác và nhận ra đặc điểm cạnh.',
        correctAnswer: 'hình tam giác',
        misconceptionWatch: ['Nhận hình theo hướng xoay quen thuộc', 'Gọi tên theo màu/kích thước thay vì đặc điểm'],
        estimatedSeconds: 70,
        sourceIds: ['moet-ctgdpt-2018', 'repo-curriculum-map'],
    },
    {
        id: 'diag-g1-math-spatial',
        subject: 'math',
        subjectLabel: 'Toán',
        domain: 'math_spatial_reasoning',
        topicKey: 'ordinal_spatial',
        curriculumMapId: buildCurriculumMapId('math', 'ordinal_spatial'),
        prompt: 'Trong hàng 5 đồ vật, con chỉ đồ vật thứ ba từ bên trái.',
        expectedEvidence: 'Trẻ đếm đúng hướng và dùng được từ chỉ vị trí.',
        correctAnswer: 'đồ vật thứ ba từ bên trái',
        misconceptionWatch: ['Đếm từ sai hướng', 'Nhầm trái/phải'],
        estimatedSeconds: 70,
        sourceIds: ['moet-ctgdpt-2018', 'repo-curriculum-map'],
    },
    {
        id: 'diag-g1-vn-letter-after',
        subject: 'vietnamese',
        subjectLabel: 'Tiếng Việt',
        domain: 'vietnamese_letters_sounds',
        topicKey: 'alphabet',
        curriculumMapId: buildCurriculumMapId('vietnamese', 'alphabet'),
        prompt: 'Chữ nào đứng sau chữ a trong bảng chữ cái tiếng Việt?',
        expectedEvidence: 'Trẻ phân biệt thứ tự chữ cái tiếng Việt, gồm a, ă, â.',
        correctAnswer: 'ă',
        misconceptionWatch: ['Nhầm bảng chữ cái tiếng Việt với tiếng Anh', 'Bỏ qua chữ ă/â'],
        estimatedSeconds: 60,
        sourceIds: ['moet-ctgdpt-2018', 'repo-curriculum-map'],
    },
    {
        id: 'diag-g1-vn-letter-sound',
        subject: 'vietnamese',
        subjectLabel: 'Tiếng Việt',
        domain: 'vietnamese_letters_sounds',
        topicKey: 'alphabet',
        curriculumMapId: buildCurriculumMapId('vietnamese', 'alphabet'),
        prompt: 'Con nghe âm "m", chọn chữ m và nói một tiếng có âm m.',
        expectedEvidence: 'Trẻ nối được âm với chữ và tạo được tiếng quen thuộc.',
        correctAnswer: 'm',
        misconceptionWatch: ['Nhầm tên chữ và âm', 'Chỉ nhận chữ in hoa/in thường quen thuộc'],
        estimatedSeconds: 75,
        sourceIds: ['moet-ctgdpt-2018', 'repo-curriculum-map'],
    },
    {
        id: 'diag-g1-vn-letter-write',
        subject: 'vietnamese',
        subjectLabel: 'Tiếng Việt',
        domain: 'vietnamese_letters_sounds',
        topicKey: 'alphabet',
        curriculumMapId: buildCurriculumMapId('vietnamese', 'alphabet'),
        prompt: 'Con viết lại chữ đ và nói một tiếng có chữ đ.',
        expectedEvidence: 'Trẻ phân biệt d/đ và tạo tiếng có nghĩa.',
        correctAnswer: 'đ',
        misconceptionWatch: ['Nhầm d và đ', 'Viết đúng nhưng không đọc được âm'],
        estimatedSeconds: 85,
        sourceIds: ['moet-ctgdpt-2018', 'repo-curriculum-map'],
    },
    {
        id: 'diag-g1-vn-tone-sac',
        subject: 'vietnamese',
        subjectLabel: 'Tiếng Việt',
        domain: 'vietnamese_tones_meaning',
        topicKey: 'tones',
        curriculumMapId: buildCurriculumMapId('vietnamese', 'tones'),
        prompt: 'Tiếng "má" mang dấu gì?',
        expectedEvidence: 'Trẻ nhận ra dấu sắc và nói được tiếng đổi nghĩa khi đổi dấu.',
        correctAnswer: 'dấu sắc',
        misconceptionWatch: ['Nhầm thanh sắc với thanh huyền', 'Không thấy đổi dấu đổi nghĩa'],
        estimatedSeconds: 60,
        sourceIds: ['moet-ctgdpt-2018', 'repo-curriculum-map'],
    },
    {
        id: 'diag-g1-vn-tone-hoi-nga',
        subject: 'vietnamese',
        subjectLabel: 'Tiếng Việt',
        domain: 'vietnamese_tones_meaning',
        topicKey: 'tones',
        curriculumMapId: buildCurriculumMapId('vietnamese', 'tones'),
        prompt: 'Con đọc cặp "mả" và "mã", rồi nói hai tiếng khác nhau ở dấu nào.',
        expectedEvidence: 'Trẻ phân biệt được hỏi/ngã ở mức nghe-đọc ban đầu.',
        correctAnswer: 'dấu hỏi và dấu ngã',
        misconceptionWatch: ['Lẫn hỏi/ngã', 'Đọc theo trí nhớ mà không nhìn dấu'],
        estimatedSeconds: 90,
        sourceIds: ['moet-ctgdpt-2018', 'repo-curriculum-map'],
    },
    {
        id: 'diag-g1-vn-tone-meaning',
        subject: 'vietnamese',
        subjectLabel: 'Tiếng Việt',
        domain: 'vietnamese_tones_meaning',
        topicKey: 'tones',
        curriculumMapId: buildCurriculumMapId('vietnamese', 'tones'),
        prompt: 'Con chọn tiếng chỉ mẹ: ma, má, mà, mã, mả, mạ.',
        expectedEvidence: 'Trẻ hiểu dấu thanh làm đổi nghĩa của tiếng.',
        correctAnswer: 'má',
        misconceptionWatch: ['Đọc đúng nhưng không hiểu nghĩa', 'Chọn theo vị trí quen thuộc'],
        estimatedSeconds: 75,
        sourceIds: ['moet-ctgdpt-2018', 'repo-curriculum-map'],
    },
];

function pct(numerator: number, denominator: number) {
    if (denominator === 0) return null;
    return Math.round((numerator / denominator) * 100);
}

function addDays(date: Date, days: number) {
    const copy = new Date(date);
    copy.setDate(copy.getDate() + days);
    return copy;
}

function readinessBand(accuracyPct: number | null, hintDependencyPct: number | null, answeredCount: number): DiagnosticReadinessBand {
    if (answeredCount < 2 || accuracyPct === null) return 'insufficient_evidence';
    if (accuracyPct < 50) return 'foundation_needed';
    if (accuracyPct < 75 || (hintDependencyPct ?? 0) >= 50) return 'guided_practice';
    if (accuracyPct < 90) return 'ready_to_learn';
    return 'stretch_candidate';
}

function domainLabel(domain: DiagnosticDomain) {
    switch (domain) {
        case 'math_number_sense':
            return 'số và phép tính lớp 1';
        case 'math_spatial_reasoning':
            return 'hình học, vị trí và không gian';
        case 'vietnamese_letters_sounds':
            return 'chữ cái và âm tiếng Việt';
        case 'vietnamese_tones_meaning':
            return 'dấu thanh và nghĩa của tiếng';
    }
}

function rootCauseForBand(band: DiagnosticReadinessBand, domain: DiagnosticDomain) {
    if (band === 'insufficient_evidence') return 'Chưa đủ dữ liệu để kết luận domain này.';
    if (band === 'foundation_needed') return `Cần củng cố nền ${domainLabel(domain)} bằng vật thật/đọc chậm trước khi tăng độ khó.`;
    if (band === 'guided_practice') return `Có thể học tiếp nhưng cần practice có gợi ý thấp ở ${domainLabel(domain)}.`;
    if (band === 'ready_to_learn') return `Baseline đủ để bắt đầu kế hoạch 7 ngày ở ${domainLabel(domain)}.`;
    return `Có thể thêm stretch task nhẹ ở ${domainLabel(domain)}, nhưng vẫn cần theo dõi quá tải.`;
}

function nextActionForBand(band: DiagnosticReadinessBand, domain: DiagnosticDomain) {
    if (band === 'insufficient_evidence') return 'Thu thêm 2-3 câu cùng domain trước khi lập kế hoạch.';
    if (band === 'foundation_needed') return `Ngày 1-2: quay lại nhiệm vụ rất ngắn về ${domainLabel(domain)}, dùng vật thật hoặc đọc mẫu một bước.`;
    if (band === 'guided_practice') return `Ngày 1-3: luyện 5-7 phút/ngày, chỉ dùng gợi ý L1-L2 và yêu cầu con nói lại bước làm.`;
    if (band === 'ready_to_learn') return 'Bắt đầu lộ trình 7 ngày với bài ngắn, có recheck sau 7 ngày.';
    return 'Thêm 1 nhiệm vụ chuyển giao nhẹ sau khi con giải thích được cách làm.';
}

function scoreDomain(domain: DiagnosticDomain, responsesById: Map<string, DiagnosticItemResponse>): DiagnosticDomainResult {
    const items = GRADE1_DIAGNOSTIC_ITEMS.filter((item) => item.domain === domain);
    const responses = items.flatMap((item) => {
        const response = responsesById.get(item.id);
        return response ? [response] : [];
    });
    const answeredCount = responses.length;
    const accuracy = pct(responses.filter((response) => response.isCorrect).length, answeredCount);
    const hintDependency = pct(responses.filter((response) => response.hintLevelUsed > 0).length, answeredCount);
    const band = readinessBand(accuracy, hintDependency, answeredCount);

    return {
        domain,
        subject: items[0]?.subject ?? 'math',
        answeredCount,
        accuracyPct: accuracy,
        hintDependencyPct: hintDependency,
        readinessBand: band,
        rootCause: rootCauseForBand(band, domain),
        nextAction: nextActionForBand(band, domain),
    };
}

function selectWeakestDomain(results: DiagnosticDomainResult[]) {
    const rank: Record<DiagnosticReadinessBand, number> = {
        insufficient_evidence: 0,
        foundation_needed: 1,
        guided_practice: 2,
        ready_to_learn: 3,
        stretch_candidate: 4,
    };

    return [...results].sort((a, b) => {
        if (rank[a.readinessBand] !== rank[b.readinessBand]) return rank[a.readinessBand] - rank[b.readinessBand];
        return (a.accuracyPct ?? -1) - (b.accuracyPct ?? -1);
    })[0];
}

function buildSevenDayPlan(weakest: DiagnosticDomainResult | undefined, now: Date) {
    const focus = weakest ? domainLabel(weakest.domain) : 'baseline Toán và Tiếng Việt lớp 1';

    return {
        focus,
        parentExplanation: weakest
            ? `Baseline hiện nghiêng về ${focus}. Đây là giả thuyết vận hành để chọn bài 7 ngày, không phải nhãn năng lực cố định.`
            : 'Cần thêm dữ liệu diagnostic trước khi chọn lộ trình.',
        dailyActions: [
            `Ngày 1: làm lại 2 câu dễ về ${focus}, phụ huynh ghi mức gợi ý cao nhất.`,
            'Ngày 2-3: luyện 5-7 phút/ngày, yêu cầu con nói một câu giải thích.',
            'Ngày 4: đổi ngữ cảnh bài tương tự để kiểm tra transfer nhẹ.',
            'Ngày 5-6: giảm gợi ý một bậc, chỉ nhắc con nêu bước đầu tiên.',
            'Ngày 7: recheck 3 câu, so accuracy và hint dependency với baseline.',
        ],
        recheckMetric: 'accuracy + hint dependency + child explanation note',
        recheckAt: addDays(now, 7).toISOString(),
    };
}

function missingDataReason(responses: DiagnosticItemResponse[]) {
    const mathCount = responses.filter((response) => GRADE1_DIAGNOSTIC_ITEMS.find((item) => item.id === response.itemId)?.subject === 'math').length;
    const vietnameseCount = responses.filter((response) => GRADE1_DIAGNOSTIC_ITEMS.find((item) => item.id === response.itemId)?.subject === 'vietnamese').length;

    if (responses.length < GRADE1_DIAGNOSTIC_BLUEPRINT.minimumAnsweredItems) {
        return `Cần ít nhất ${GRADE1_DIAGNOSTIC_BLUEPRINT.minimumAnsweredItems} câu trả lời; hiện mới có ${responses.length}.`;
    }
    if (mathCount < GRADE1_DIAGNOSTIC_BLUEPRINT.minimumAnsweredBySubject) {
        return `Cần ít nhất ${GRADE1_DIAGNOSTIC_BLUEPRINT.minimumAnsweredBySubject} câu Toán; hiện mới có ${mathCount}.`;
    }
    if (vietnameseCount < GRADE1_DIAGNOSTIC_BLUEPRINT.minimumAnsweredBySubject) {
        return `Cần ít nhất ${GRADE1_DIAGNOSTIC_BLUEPRINT.minimumAnsweredBySubject} câu Tiếng Việt; hiện mới có ${vietnameseCount}.`;
    }

    return null;
}

export function scoreGrade1DiagnosticWarmStart(args: {
    responses?: DiagnosticItemResponse[];
    now?: Date;
} = {}): DiagnosticWarmStartResult {
    const responses = args.responses ?? [];
    const now = args.now ?? new Date();
    const responsesById = new Map(responses.map((response) => [response.itemId, response]));
    const answeredCount = responsesById.size;
    const totalItems = GRADE1_DIAGNOSTIC_ITEMS.length;
    const accuracy = pct([...responsesById.values()].filter((response) => response.isCorrect).length, answeredCount);
    const domains: DiagnosticDomain[] = ['math_number_sense', 'math_spatial_reasoning', 'vietnamese_letters_sounds', 'vietnamese_tones_meaning'];
    const domainResults = domains.map((domain) => scoreDomain(domain, responsesById));
    const weakest = selectWeakestDomain(domainResults);
    const reason = missingDataReason([...responsesById.values()]);
    const completionPct = Math.round((answeredCount / totalItems) * 100);
    const coveredDomainCount = domainResults.filter((result) => result.answeredCount > 0).length;
    const averageSelfConfidence = (() => {
        const ratings = [...responsesById.values()].flatMap((response) => response.confidenceSelfRating ? [response.confidenceSelfRating] : []);
        if (ratings.length === 0) return 60;
        return Math.round((ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length / 5) * 100);
    })();
    const confidencePct = Math.min(95, Math.round((completionPct * 0.55) + ((coveredDomainCount / domains.length) * 100 * 0.25) + (averageSelfConfidence * 0.2)));

    return {
        status: reason ? 'missing_data' : 'ready_for_plan',
        gradeLevel: 1,
        answeredCount,
        totalItems,
        completionPct,
        accuracyPct: accuracy,
        confidencePct: reason ? Math.min(confidencePct, 60) : confidencePct,
        weakestDomain: weakest?.domain ?? null,
        domainResults,
        sevenDayPlan: buildSevenDayPlan(weakest, now),
        missingDataReason: reason,
        allowedClaim: 'Có diagnostic warm-start nội bộ cho Toán và Tiếng Việt lớp 1, tạo baseline, confidence và kế hoạch 7 ngày.',
        blockedClaim: 'Không được gọi trẻ là giỏi/yếu, không claim level chính xác hoặc hiệu quả học tập nếu chưa có validation cohort và recheck thật.',
        sourceIds: GRADE1_DIAGNOSTIC_BLUEPRINT.sourceIds,
    };
}
