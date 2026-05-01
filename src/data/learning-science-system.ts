import type { SourceId } from './curriculum-enrichment';

export type LearningSciencePrincipleId =
    | 'retrieval'
    | 'spacing'
    | 'interleaving'
    | 'dual_coding'
    | 'concrete_abstract'
    | 'metacognition'
    | 'adaptive_challenge'
    | 'motivation'
    | 'executive_function'
    | 'udl';

export interface LearningSciencePrinciple {
    id: LearningSciencePrincipleId;
    label: string;
    learnerBenefit: string;
    appMechanism: string;
    benchmarkPattern: string;
    benchmarkPatternVi: string;
    sourceIds: SourceId[];
    implementationCheck: string[];
}

export const LEARNING_SCIENCE_PRINCIPLES: Record<LearningSciencePrincipleId, LearningSciencePrinciple> = {
    retrieval: {
        id: 'retrieval',
        label: 'Nhớ lại chủ động',
        learnerBenefit: 'Kéo kiến thức ra khỏi trí nhớ giúp nhớ bền hơn đọc lại thụ động.',
        appMechanism: 'Mỗi phiên bắt đầu bằng câu nhớ lại và mỗi câu sai tạo lịch ôn.',
        benchmarkPattern: 'Khan Academy mastery + IXL skill checks',
        benchmarkPatternVi: 'Luyện thành thạo Khan Academy + kiểm tra kỹ năng IXL',
        sourceIds: ['ies-study-learning', 'dunlosky-learning-techniques', 'khan-academy-mastery', 'ixl-diagnostic'],
        implementationCheck: ['Có câu hỏi trước khi xem đáp án', 'Có lịch ôn sau khi sai', 'Có phản hồi bước tiếp theo'],
    },
    spacing: {
        id: 'spacing',
        label: 'Giãn cách ôn tập',
        learnerBenefit: 'Ôn sau khoảng nghỉ phù hợp giúp chống quên và giảm học dồn.',
        appMechanism: 'Review dùng mốc 0-1-3-7-21-60 ngày và cập nhật sau mỗi lần nhớ/quên.',
        benchmarkPattern: 'Anki/SuperMemo-style interval scheduling adapted for children',
        benchmarkPatternVi: 'Lịch ôn giãn cách kiểu Anki/SuperMemo cho trẻ em',
        sourceIds: ['aero-spacing-retrieval', 'ies-study-learning', 'dunlosky-learning-techniques'],
        implementationCheck: ['Không ôn lại mọi thứ mỗi ngày', 'Sai thì kéo gần lịch ôn', 'Đúng thì tăng khoảng cách'],
    },
    interleaving: {
        id: 'interleaving',
        label: 'Luyện xen kẽ',
        learnerBenefit: 'Xen dạng bài giúp bé nhận ra khi nào dùng chiến lược nào.',
        appMechanism: 'Chế độ hỗn hợp và phiên Sâu/Thử thách trộn nhớ lại, thao tác lõi, bẫy khái niệm, chuyển giao.',
        benchmarkPattern: 'IXL diagnostic path + Beast Academy problem variation',
        benchmarkPatternVi: 'Lộ trình chẩn đoán IXL + đa dạng bài Beast Academy',
        sourceIds: ['ies-study-learning', 'beast-academy', 'ixl-diagnostic'],
        implementationCheck: ['Có bài hỗn hợp', 'Có bẫy khái niệm', 'Có nhiệm vụ chuyển giao'],
    },
    dual_coding: {
        id: 'dual_coding',
        label: 'Hình + lời',
        learnerBenefit: 'Kết hợp mô hình trực quan và lời giải giúp hiểu sâu hơn.',
        appMechanism: 'Mỗi chủ đề có ảnh/mô hình và yêu cầu nói lại bằng lời.',
        benchmarkPattern: 'ST Math visual reasoning + Zearn visual models',
        benchmarkPatternVi: 'Tư duy trực quan ST Math + mô hình Zearn',
        sourceIds: ['ies-study-learning', 'st-math', 'zearn-math', 'cast-udl'],
        implementationCheck: ['Có hình minh họa', 'Có lời giải thích', 'Có chuyển từ hình sang ký hiệu'],
    },
    concrete_abstract: {
        id: 'concrete_abstract',
        label: 'Cụ thể -> trừu tượng',
        learnerBenefit: 'Bé hiểu khái niệm thay vì chỉ nhớ công thức.',
        appMechanism: 'Bài học đi từ đồ vật/ảnh -> mô hình -> ký hiệu -> tình huống mới.',
        benchmarkPattern: 'Zearn concept development + Singapore-style CPA',
        benchmarkPatternVi: 'Phát triển khái niệm Zearn + CPA kiểu Singapore',
        sourceIds: ['ies-study-learning', 'zearn-math', 'cambridge-primary-math'],
        implementationCheck: ['Có ví dụ cụ thể', 'Có mô hình', 'Có ký hiệu', 'Có bài đời sống'],
    },
    metacognition: {
        id: 'metacognition',
        label: 'Tự quản học tập',
        learnerBenefit: 'Bé biết lập kế hoạch, theo dõi và tự sửa cách học.',
        appMechanism: 'Sau phản hồi, app hỏi chiến lược, bằng chứng thành thạo và bước tiếp theo.',
        benchmarkPattern: 'EEF plan-monitor-evaluate loop',
        benchmarkPatternVi: 'Quy trình lập kế hoạch - theo dõi - đánh giá EEF',
        sourceIds: ['eef-metacognition', 'harvard-executive-function'],
        implementationCheck: ['Có mục tiêu', 'Có tự kiểm', 'Có câu hỏi dạy lại'],
    },
    adaptive_challenge: {
        id: 'adaptive_challenge',
        label: 'Độ khó vừa tầm',
        learnerBenefit: 'Giữ bài học đủ khó để phát triển nhưng không quá tải.',
        appMechanism: 'Learning path advisor đọc accuracy, lỗi gần đây và gợi ý Gọn/Sâu/Thử thách.',
        benchmarkPattern: 'DreamBox adaptive instruction + IXL diagnostic recommendation',
        benchmarkPatternVi: 'Dạy thích ứng DreamBox + gợi ý chẩn đoán IXL',
        sourceIds: ['dreambox-learning', 'ixl-diagnostic', 'eef-feedback'],
        implementationCheck: ['Có trạng thái topic', 'Có gợi ý độ sâu', 'Có cảnh báo cần sửa lỗi'],
    },
    motivation: {
        id: 'motivation',
        label: 'Tự chủ - năng lực - kết nối',
        learnerBenefit: 'Động lực bền đến từ được chọn, thấy mình tiến bộ và có người đồng hành.',
        appMechanism: 'Cho chọn nhịp học, hiển thị tiến bộ, thêm nhiệm vụ ba/mẹ 10 phút.',
        benchmarkPattern: 'Khan Academy Kids path + SDT autonomy/competence/relatedness',
        benchmarkPatternVi: 'Lộ trình Khan Academy Kids + SDT tự chủ/năng lực/kết nối',
        sourceIds: ['self-determination-theory', 'khan-academy-kids', 'aap-family-media'],
        implementationCheck: ['Có lựa chọn thật', 'Có bằng chứng tiến bộ', 'Có tương tác phụ huynh'],
    },
    executive_function: {
        id: 'executive_function',
        label: 'Chức năng điều hành',
        learnerBenefit: 'Rèn trí nhớ làm việc, kiểm soát chú ý và linh hoạt khi đổi chiến lược.',
        appMechanism: 'Pha học hiện tại, kế hoạch ngắn, bẫy khái niệm và nhiệm vụ tự giải thích.',
        benchmarkPattern: 'Harvard executive function activities adapted into lesson phases',
        benchmarkPatternVi: 'Hoạt động chức năng điều hành Harvard áp dụng vào pha học',
        sourceIds: ['harvard-executive-function', 'eef-metacognition'],
        implementationCheck: ['Có pha học rõ', 'Có bước kiểm tra', 'Có đổi chiến lược khi sai'],
    },
    udl: {
        id: 'udl',
        label: 'Thiết kế phổ quát',
        learnerBenefit: 'Bé có nhiều đường vào bài học: nhìn, đọc, nói, làm, giải thích.',
        appMechanism: 'Hình ảnh, văn bản, lựa chọn, gợi ý tầng và nhiệm vụ phụ huynh cùng tồn tại.',
        benchmarkPattern: 'CAST UDL: engagement, representation, action/expression',
        benchmarkPatternVi: 'CAST UDL: tương tác, trình bày, hành động/thể hiện',
        sourceIds: ['cast-udl'],
        implementationCheck: ['Có nhiều cách tiếp cận', 'Có nhiều cách trả lời', 'Có tự điều chỉnh'],
    },
};

export const PRINCIPLE_SEQUENCE: LearningSciencePrincipleId[] = [
    'retrieval',
    'spacing',
    'dual_coding',
    'concrete_abstract',
    'interleaving',
    'metacognition',
    'adaptive_challenge',
    'motivation',
    'executive_function',
    'udl',
];

export function getLearningSciencePrinciples(ids: LearningSciencePrincipleId[] = PRINCIPLE_SEQUENCE) {
    return ids.map((id) => LEARNING_SCIENCE_PRINCIPLES[id]);
}

export const LEARNING_SCIENCE_STATS = {
    principleCount: PRINCIPLE_SEQUENCE.length,
    sourceCount: new Set(Object.values(LEARNING_SCIENCE_PRINCIPLES).flatMap((principle) => principle.sourceIds)).size,
};

/** Get benchmarkPattern in the correct language */
export function getBenchmarkPattern(principle: LearningSciencePrinciple, lang: 'vi' | 'en' = 'vi'): string {
    return lang === 'vi' ? principle.benchmarkPatternVi : principle.benchmarkPattern;
}
