import type { LearningSubjectKey } from '@/data/curriculum-enrichment';
import { getTopicEnrichment } from '@/data/curriculum-enrichment';
import { getTopicLearningBlueprint } from '@/data/learning-benchmark-system';
import type { TopicEvidenceProfile } from '@/lib/evidence/learning-evidence';

export interface QuestionLike {
    question: string;
    explanation: string;
    topic: string;
    topicKey: string;
    type: string;
}

export interface QuestionPresentationStep {
    label: string;
    prompt: string;
}

export interface QuestionPresentationPlan {
    title: string;
    focus: string;
    beforeAnswer: QuestionPresentationStep[];
    answerProtocol: string[];
    selfCheck: string[];
    misconceptionCheck: string[];
    supportRule: string;
    benchmarkSignal: string;
    dataSignal: string;
}

const SUBJECT_PROTOCOL: Record<LearningSubjectKey, string[]> = {
    math: [
        'Ghi con biết gì và đề hỏi gì.',
        'Chọn mô hình: đồ vật, hình, trục số, sơ đồ phần - tổng hoặc phép tính.',
        'Làm từng bước, sau đó kiểm tra bằng phép ngược hoặc cách thứ hai.',
    ],
    vietnamese: [
        'Đọc chậm câu hoặc đoạn có bằng chứng.',
        'Gạch từ khóa: ai, làm gì, ở đâu, khi nào, vì sao.',
        'Trả lời bằng một câu trọn ý và chỉ lại bằng chứng trong văn bản.',
    ],
    english: [
        'Nhìn ngữ cảnh trước, không dịch từng chữ ngay.',
        'Nói từ hoặc câu thành tiếng.',
        'Dùng mẫu câu để tạo một câu mới gần đời sống.',
    ],
    science: [
        'Nói quan sát trước khi kết luận.',
        'Viết theo khung: nhận định - bằng chứng - lý do.',
        'Hỏi điều gì sẽ thay đổi nếu một điều kiện thay đổi.',
    ],
    hisgeo: [
        'Đặt thông tin lên bản đồ, ảnh hoặc dòng thời gian.',
        'Nêu nhân vật, địa điểm, mốc hoặc bằng chứng.',
        'Giải thích vì sao sự kiện hoặc nơi chốn đó quan trọng.',
    ],
    computing: [
        'Nói thuật toán bằng câu thường.',
        'Thử từng bước và tìm điểm sai.',
        'Nêu một quy tắc an toàn hoặc tác động xã hội nếu có liên quan.',
    ],
    elite: [
        'Nêu mục tiêu và các lựa chọn.',
        'So sánh hệ quả cho mình và cho người khác.',
        'Chọn phương án, rồi nói điều kiện nào khiến con đổi ý.',
    ],
};

function focusFromEvidence(profile?: TopicEvidenceProfile) {
    if (!profile) return 'Đọc đề kỹ, chọn chiến lược, làm và tự kiểm.';
    if (profile.decision === 'repair') return 'Sửa hiểu nhầm trước khi làm nhanh.';
    if (profile.decision === 'stretch' || profile.decision === 'accelerate_guarded') return 'Giải thích sâu và chuyển giao sang tình huống mới.';
    if (profile.decision === 'observe') return 'Làm chậm để tạo dữ liệu chẩn đoán đầu tiên.';
    return 'Giữ độ khó vừa tầm và giảm phụ thuộc gợi ý.';
}

function supportRuleFromEvidence(profile?: TopicEvidenceProfile) {
    if (!profile) return 'Dùng gợi ý từ L0 đến L2 trước khi xem lời giải.';
    if (profile.decision === 'repair') return 'Cho phép gợi ý L1-L2, nhưng yêu cầu nói lại lỗi đã sửa.';
    if (profile.decision === 'stretch' || profile.decision === 'accelerate_guarded') return 'Bắt đầu L0; chỉ mở gợi ý sau khi con đã nêu chiến lược.';
    if (profile.hintDependencyPct !== null && profile.hintDependencyPct > 45) {
        return 'Giảm gợi ý từng bước: con phải nói chiến lược trước khi mở L1.';
    }
    return 'Ưu tiên tự làm L0, sau đó dùng gợi ý như câu hỏi dẫn đường.';
}

export function buildQuestionPresentationPlan(args: {
    subject: LearningSubjectKey;
    problem: QuestionLike;
    evidenceProfile?: TopicEvidenceProfile;
}): QuestionPresentationPlan {
    const { subject, problem, evidenceProfile } = args;
    const enrichment = getTopicEnrichment(problem.topicKey, subject);
    const blueprint = getTopicLearningBlueprint(problem.topicKey, subject);
    const benchmark = blueprint.benchmarkPatterns[0];
    const commonPitfalls = enrichment.commonPitfalls.length > 0
        ? enrichment.commonPitfalls
        : ['Trả lời quá nhanh', 'Không đọc hết đề', 'Không kiểm tra lại bằng cách khác'];

    return {
        title: `Cách trình bày: ${problem.topic}`,
        focus: focusFromEvidence(evidenceProfile),
        beforeAnswer: [
            { label: 'Hiểu đề', prompt: 'Đề đang hỏi điều gì? Nói lại bằng lời của con.' },
            { label: 'Dữ kiện', prompt: 'Thông tin nào trong đề, hình hoặc đoạn văn là bằng chứng chính?' },
            { label: 'Chiến lược', prompt: blueprint.practiceDesign[0] ?? SUBJECT_PROTOCOL[subject][0] },
            { label: 'Dự đoán lỗi', prompt: commonPitfalls[0] },
        ],
        answerProtocol: SUBJECT_PROTOCOL[subject],
        selfCheck: [
            blueprint.evidenceOfMastery[0] ?? 'Làm đúng khi chưa có gợi ý',
            blueprint.evidenceOfMastery[1] ?? 'Giải thích được cách nghĩ',
            enrichment.transferPrompt,
        ],
        misconceptionCheck: commonPitfalls.slice(0, 3),
        supportRule: supportRuleFromEvidence(evidenceProfile),
        benchmarkSignal: benchmark ? `${benchmark.product}: ${benchmark.pattern}` : 'Benchmark: mastery + feedback + transfer',
        dataSignal: evidenceProfile?.evidenceSummary ?? 'Chưa có dữ liệu làm bài cho câu hỏi này.',
    };
}
