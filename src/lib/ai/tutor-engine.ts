import type { AIRole, SupportLevel } from '@/types';
import type { LearningSubjectKey } from '@/data/curriculum-enrichment';
import type { TopicEvidenceProfile } from '@/lib/evidence/learning-evidence';
import type { QuestionPresentationPlan } from '@/lib/pedagogy/question-presentation';

export type TutorMove =
    | 'read_prompt'
    | 'find_evidence'
    | 'choose_strategy'
    | 'try_step'
    | 'self_check'
    | 'repair_misconception'
    | 'transfer';

export interface TutorProblem {
    question: string;
    correctAnswer: string;
    explanation: string;
    topic: string;
    topicKey: string;
    type: string;
    options?: string[];
    hints?: string[];
}

export interface TutorTurnInput {
    role?: AIRole;
    subject: LearningSubjectKey | string;
    problem: TutorProblem;
    hintLevel?: number;
    childAnswer?: string;
    evidenceProfile?: TopicEvidenceProfile;
    presentationPlan?: QuestionPresentationPlan;
    revealAnswerAllowed?: boolean;
}

export interface TutorTurn {
    text: string;
    supportLevel: SupportLevel;
    move: TutorMove;
    diagnosis: string;
    nextPrompt: string;
    shouldRevealAnswer: boolean;
    dataUsed: string[];
    benchmarkSignal: string;
    qualityScore: number;
}

const SUBJECT_LABEL: Record<LearningSubjectKey, string> = {
    math: 'Toán',
    vietnamese: 'Tiếng Việt',
    english: 'Tiếng Anh',
    science: 'Khoa học',
    hisgeo: 'Lịch sử & Địa lý',
    computing: 'Tin học',
    elite: 'Năng lực tinh hoa',
    ethics: 'Đạo đức',
    art: 'Nghệ thuật',
};

function normalize(value: string) {
    return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function isCorrectAnswer(childAnswer: string | undefined, correctAnswer: string) {
    if (!childAnswer) return false;
    return normalize(childAnswer) === normalize(correctAnswer);
}

function supportLevelForHint(hintLevel: number): SupportLevel {
    if (hintLevel <= 0) return 'none';
    if (hintLevel === 1) return 'hint_light';
    if (hintLevel === 2) return 'hint_medium';
    if (hintLevel === 3) return 'explanation';
    if (hintLevel === 4) return 'worked_example';
    return 'feedback';
}

function parseNumeric(value: string) {
    const parsed = Number.parseFloat(value.replace(',', '.'));
    return Number.isFinite(parsed) ? parsed : null;
}

function diagnoseAnswer(problem: TutorProblem, childAnswer?: string) {
    if (!childAnswer || normalize(childAnswer) === '') {
        return {
            diagnosis: 'Con chưa trả lời, nên chưa đủ dữ liệu để phân loại lỗi.',
            move: 'read_prompt' as TutorMove,
            nextPrompt: 'Con nói lại đề hỏi gì trước, rồi mới chọn đáp án.',
        };
    }

    if (isCorrectAnswer(childAnswer, problem.correctAnswer)) {
        return {
            diagnosis: 'Đáp án đúng. Bây giờ cần kiểm tra con hiểu cách làm hay chỉ nhận ra đáp án.',
            move: 'self_check' as TutorMove,
            nextPrompt: 'Con giải thích vì sao đáp án này đúng bằng một câu của con.',
        };
    }

    const childNumber = parseNumeric(childAnswer);
    const correctNumber = parseNumeric(problem.correctAnswer);
    if (childNumber !== null && correctNumber !== null) {
        const delta = Math.abs(childNumber - correctNumber);
        if (delta <= 2) {
            return {
                diagnosis: 'Đáp án rất gần đáp án đúng, nhiều khả năng là sai phép tính hoặc sót một bước.',
                move: 'try_step' as TutorMove,
                nextPrompt: 'Con tính lại từng bước và kiểm tra bước cuối bằng phép ngược.',
            };
        }
        return {
            diagnosis: 'Đáp án lệch khá xa, cần quay lại hiểu đề và chọn chiến lược trước khi tính.',
            move: 'choose_strategy' as TutorMove,
            nextPrompt: 'Con tìm dữ kiện chính và nói phép hoặc mô hình sẽ dùng.',
        };
    }

    if (problem.options?.some((option) => normalize(option) === normalize(childAnswer))) {
        return {
            diagnosis: 'Con đã chọn một phương án có sẵn nhưng chưa khớp đáp án đúng.',
            move: 'repair_misconception' as TutorMove,
            nextPrompt: 'Con loại trừ một đáp án sai và nêu lý do vì sao nó sai.',
        };
    }

    return {
        diagnosis: 'Câu trả lời chưa khớp. Cần kiểm tra từ khóa, bằng chứng và cách diễn đạt.',
        move: 'find_evidence' as TutorMove,
        nextPrompt: 'Con chỉ ra từ khóa hoặc bằng chứng trong đề trước khi sửa câu trả lời.',
    };
}

function hintPrompt(input: TutorTurnInput, hintLevel: number) {
    const plan = input.presentationPlan;
    const problemHint = input.problem.hints?.[Math.max(0, hintLevel - 1)];
    const steps = plan?.beforeAnswer ?? [];

    if (hintLevel <= 0) {
        return {
            move: 'read_prompt' as TutorMove,
            text: 'Con thử tự làm lượt đầu. AI chỉ hỏi: đề đang hỏi điều gì?',
            nextPrompt: 'Nói lại đề bằng lời của con.',
        };
    }
    if (hintLevel === 1) {
        return {
            move: 'read_prompt' as TutorMove,
            text: `Gợi ý L1: ${steps[0]?.prompt ?? 'Đọc lại đề thật chậm và tìm câu hỏi chính.'}`,
            nextPrompt: 'Con gạch hoặc nói từ khóa chính.',
        };
    }
    if (hintLevel === 2) {
        return {
            move: 'find_evidence' as TutorMove,
            text: `Gợi ý L2: ${steps[1]?.prompt ?? problemHint ?? 'Tìm dữ kiện chính trong đề.'}`,
            nextPrompt: 'Con nêu dữ kiện nào chắc chắn đúng.',
        };
    }
    if (hintLevel === 3) {
        return {
            move: 'choose_strategy' as TutorMove,
            text: `Gợi ý L3: ${steps[2]?.prompt ?? problemHint ?? 'Chọn chiến lược trước khi trả lời.'}`,
            nextPrompt: 'Con nói bước đầu tiên sẽ làm.',
        };
    }
    if (hintLevel === 4) {
        return {
            move: 'try_step' as TutorMove,
            text: `Gợi ý L4: Làm một ví dụ nhỏ hơn cùng dạng, rồi quay lại câu này. ${input.problem.explanation}`,
            nextPrompt: 'Con tự làm lại câu hiện tại, chưa cần xem đáp án cuối.',
        };
    }
    return {
        move: 'self_check' as TutorMove,
        text: input.revealAnswerAllowed
            ? `Gợi ý L5: Đáp án là ${input.problem.correctAnswer}. Điều quan trọng là: ${input.problem.explanation}`
            : `Gợi ý L5 không đưa đáp án ngay. Con hãy so câu trả lời với tiêu chí: ${plan?.selfCheck[0] ?? 'làm đúng và giải thích được'}.`,
        nextPrompt: 'Sau khi sửa, con làm một câu tương tự không dùng gợi ý.',
    };
}

function dataSignals(profile?: TopicEvidenceProfile) {
    if (!profile) return ['Chưa có hồ sơ dữ liệu cho chủ đề này.'];
    return [
        `Mẫu: ${profile.sampleSize} bài`,
        profile.accuracyPct === null ? 'Accuracy: chưa có' : `Accuracy: ${profile.accuracyPct}%`,
        profile.hintDependencyPct === null ? 'Gợi ý: chưa có' : `Gợi ý: ${profile.hintDependencyPct}%`,
        `Quyết định: ${profile.challengeFitLabel}`,
    ];
}

function benchmarkSignal(input: TutorTurnInput) {
    if (input.presentationPlan?.benchmarkSignal) return input.presentationPlan.benchmarkSignal;
    if (input.evidenceProfile?.benchmark) {
        return `${input.evidenceProfile.benchmark.product}: ${input.evidenceProfile.benchmark.pattern}`;
    }
    return 'Benchmark: Socratic hinting + explain mistakes + mastery evidence';
}

function subjectLabel(subject: LearningSubjectKey | string) {
    return SUBJECT_LABEL[subject as LearningSubjectKey] ?? subject;
}

export function generateTutorTurn(input: TutorTurnInput): TutorTurn {
    const hintLevel = input.hintLevel ?? 0;
    const supportLevel = supportLevelForHint(hintLevel);
    const benchmark = benchmarkSignal(input);
    const dataUsed = dataSignals(input.evidenceProfile);

    if (input.childAnswer !== undefined) {
        const diagnosis = diagnoseAnswer(input.problem, input.childAnswer);
        const correct = isCorrectAnswer(input.childAnswer, input.problem.correctAnswer);
        const shouldRevealAnswer = !correct && !!input.revealAnswerAllowed && hintLevel >= 5;
        const repairText = correct
            ? `${diagnosis.diagnosis} ${input.presentationPlan?.selfCheck[1] ?? 'Con cần giải thích cách nghĩ.'}`
            : `${diagnosis.diagnosis} Chưa cần xem đáp án ngay; sửa theo một bước nhỏ trước.`;

        return {
            text: [
                `AI gia sư (${subjectLabel(input.subject)}): ${repairText}`,
                `Dữ liệu dùng: ${dataUsed.join(' · ')}.`,
                shouldRevealAnswer ? `Đáp án để đối chiếu: ${input.problem.correctAnswer}.` : diagnosis.nextPrompt,
            ].join(' '),
            supportLevel: correct ? 'feedback' : supportLevel,
            move: correct ? 'self_check' : diagnosis.move,
            diagnosis: diagnosis.diagnosis,
            nextPrompt: correct
                ? input.presentationPlan?.selfCheck[2] ?? 'Con tự tạo một câu tương tự.'
                : diagnosis.nextPrompt,
            shouldRevealAnswer,
            dataUsed,
            benchmarkSignal: benchmark,
            qualityScore: input.evidenceProfile?.reliability === 'strong' ? 0.92 : 0.82,
        };
    }

    const hint = hintPrompt(input, hintLevel);
    return {
        text: [
            `AI gia sư (${subjectLabel(input.subject)}): ${hint.text}`,
            `Dữ liệu dùng: ${dataUsed.join(' · ')}.`,
            `Benchmark: ${benchmark}.`,
        ].join(' '),
        supportLevel,
        move: hint.move,
        diagnosis: input.evidenceProfile?.dataQualityNote ?? 'Gợi ý dựa trên câu hỏi hiện tại và chưa có dữ liệu cá nhân đủ mạnh.',
        nextPrompt: hint.nextPrompt,
        shouldRevealAnswer: hintLevel >= 5 && !!input.revealAnswerAllowed,
        dataUsed,
        benchmarkSignal: benchmark,
        qualityScore: input.evidenceProfile?.reliability === 'strong' ? 0.9 : 0.8,
    };
}
