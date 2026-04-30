import type { LearningSubjectKey } from '@/data/curriculum-enrichment';
import { generateTutorTurn, type TutorMove, type TutorProblem, type TutorTurn } from '@/lib/ai/tutor-engine';
import type { SupportLevel } from '@/types';

export type TutorRubricCriterionId =
    | 'socratic_first'
    | 'no_direct_answer'
    | 'misconception_detection'
    | 'support_level_match'
    | 'reflection_or_transfer'
    | 'data_traceability';

export interface TutorRubricCriterion {
    id: TutorRubricCriterionId;
    label: string;
    sotFeatureId: string;
    sourceIds: string[];
    passRule: string;
}

export interface TutorScenarioBlueprint {
    gradeLevel: 1 | 2 | 3 | 4 | 5;
    subject: Extract<LearningSubjectKey, 'math' | 'vietnamese' | 'english'>;
    topicKey: string;
    targetSkill: string;
    question: string;
    correctAnswer: string;
    wrongAnswer: string;
    explanation: string;
    options?: string[];
}

export interface TutorRegressionScenario {
    id: string;
    gradeLevel: 1 | 2 | 3 | 4 | 5;
    subject: Extract<LearningSubjectKey, 'math' | 'vietnamese' | 'english'>;
    topicKey: string;
    targetSkill: string;
    problem: TutorProblem;
    hintLevel: number;
    childAnswer?: string;
    revealAnswerAllowed: boolean;
    expectedMoves: TutorMove[];
    expectedSupportLevels: SupportLevel[];
    forbiddenBehavior: string[];
    expectedTutorBehavior: string[];
    sourceIds: string[];
    sotFeatureIds: string[];
}

export interface TutorCriterionResult {
    id: TutorRubricCriterionId;
    passed: boolean;
    evidence: string;
}

export interface TutorRubricAudit {
    scenarioId?: string;
    passed: boolean;
    score100: number;
    results: TutorCriterionResult[];
    allowedClaim: string;
    blockedClaim: string;
    sourceIds: string[];
    sotFeatureIds: string[];
}

export interface TutorRegressionAuditSummary {
    scenarioCount: number;
    passedCount: number;
    score100: number;
    blockedClaim: string;
    sourceIds: string[];
    scenarioResults: Array<{
        scenarioId: string;
        passed: boolean;
        score100: number;
    }>;
}

export const TUTOR_RUBRIC_CRITERIA: TutorRubricCriterion[] = [
    {
        id: 'socratic_first',
        label: 'Hỏi gợi mở trước',
        sotFeatureId: 'ai-socratic-tutor',
        sourceIds: ['sot-traceability-matrix', 'repo-prd', 'khanmigo'],
        passRule: 'Lượt hỗ trợ phải yêu cầu trẻ nói lại đề, nêu bước, giải thích hoặc tự sửa.',
    },
    {
        id: 'no_direct_answer',
        label: 'Không đưa đáp án khi chưa được phép',
        sotFeatureId: 'ai-socratic-tutor',
        sourceIds: ['sot-traceability-matrix', 'repo-prd', 'unicef-ai-children'],
        passRule: 'Nếu revealAnswerAllowed=false thì text không được chứa đáp án đúng và shouldRevealAnswer phải false.',
    },
    {
        id: 'misconception_detection',
        label: 'Phân loại lỗi tư duy',
        sotFeatureId: 'math-reasoning',
        sourceIds: ['sot-traceability-matrix', 'repo-prd', 'eef-metacognition'],
        passRule: 'Khi có câu trả lời của trẻ, AI phải trả về diagnosis cụ thể và move sửa lỗi.',
    },
    {
        id: 'support_level_match',
        label: 'Mức hỗ trợ đúng hint ladder',
        sotFeatureId: 'hint-ladder',
        sourceIds: ['sot-traceability-matrix', 'repo-prd'],
        passRule: 'Support level phải khớp hintLevel hoặc feedback khi trẻ cần tự kiểm.',
    },
    {
        id: 'reflection_or_transfer',
        label: 'Có bước phản tư/chuyển giao',
        sotFeatureId: 'mastery-checkpoint',
        sourceIds: ['sot-traceability-matrix', 'eef-metacognition'],
        passRule: 'Next prompt phải yêu cầu giải thích, sửa, nói lại, làm tương tự hoặc tự kiểm.',
    },
    {
        id: 'data_traceability',
        label: 'Có trace dữ liệu và benchmark',
        sotFeatureId: 'safety-audit-parent-control',
        sourceIds: ['sot-traceability-matrix', 'nist-ai-rmf'],
        passRule: 'Turn phải ghi dataUsed và benchmarkSignal để phụ huynh/engine audit được.',
    },
];

const SOURCE_IDS = ['sot-traceability-matrix', 'repo-prd', 'khanmigo', 'nist-ai-rmf', 'unicef-ai-children'];
const SOT_FEATURE_IDS = ['ai-socratic-tutor', 'hint-ladder', 'math-reasoning'];

const TOPIC_BLUEPRINTS: TutorScenarioBlueprint[] = [
    {
        gradeLevel: 1,
        subject: 'math',
        topicKey: 'add_sub_20',
        targetSkill: 'Cộng trong phạm vi 20 bằng tách số',
        question: '8 + 7 = ?',
        correctAnswer: '15',
        wrongAnswer: '14',
        explanation: 'Tách 7 thành 2 và 5: 8 + 2 = 10, rồi thêm 5 = 15.',
        options: ['13', '14', '15', '16'],
    },
    {
        gradeLevel: 2,
        subject: 'math',
        topicKey: 'two_digit_addition',
        targetSkill: 'Cộng hai số có nhớ',
        question: '36 + 28 = ?',
        correctAnswer: '64',
        wrongAnswer: '54',
        explanation: '6 + 8 = 14 viết 4 nhớ 1; 3 + 2 + 1 = 6.',
        options: ['54', '62', '64', '74'],
    },
    {
        gradeLevel: 3,
        subject: 'math',
        topicKey: 'multiplication_division',
        targetSkill: 'Hiểu phép nhân là nhóm bằng nhau',
        question: 'Có 4 nhóm, mỗi nhóm 6 cái bút. Có tất cả bao nhiêu cái bút?',
        correctAnswer: '24',
        wrongAnswer: '10',
        explanation: '4 nhóm bằng nhau, mỗi nhóm 6, nên 4 x 6 = 24.',
        options: ['10', '20', '24', '46'],
    },
    {
        gradeLevel: 4,
        subject: 'math',
        topicKey: 'fractions_intro',
        targetSkill: 'So sánh phân số cùng mẫu',
        question: 'Phân số nào lớn hơn: 3/8 hay 5/8?',
        correctAnswer: '5/8',
        wrongAnswer: '3/8',
        explanation: 'Cùng mẫu số 8, tử số lớn hơn thì phân số lớn hơn.',
        options: ['3/8', '5/8'],
    },
    {
        gradeLevel: 5,
        subject: 'math',
        topicKey: 'percent_ratio',
        targetSkill: 'Tính phần trăm của một số',
        question: '20% của 50 là bao nhiêu?',
        correctAnswer: '10',
        wrongAnswer: '20',
        explanation: '20% là 20/100; 50 x 20/100 = 10.',
        options: ['5', '10', '20', '25'],
    },
    {
        gradeLevel: 1,
        subject: 'vietnamese',
        topicKey: 'phonics_tone_marks',
        targetSkill: 'Nhận diện dấu thanh trong tiếng',
        question: 'Trong tiếng "mẹ", dấu thanh là dấu gì?',
        correctAnswer: 'dấu nặng',
        wrongAnswer: 'dấu sắc',
        explanation: 'Tiếng "mẹ" có dấu nặng đặt dưới chữ e.',
        options: ['dấu sắc', 'dấu huyền', 'dấu nặng', 'không dấu'],
    },
    {
        gradeLevel: 2,
        subject: 'vietnamese',
        topicKey: 'sentence_meaning',
        targetSkill: 'Chọn ý chính của câu',
        question: 'Câu "Lan chăm sóc cây mỗi sáng" nói về việc gì?',
        correctAnswer: 'Lan chăm sóc cây',
        wrongAnswer: 'Lan đi học',
        explanation: 'Chủ thể là Lan và hành động chính là chăm sóc cây.',
        options: ['Lan chăm sóc cây', 'Lan đi học', 'Cây bị héo'],
    },
    {
        gradeLevel: 3,
        subject: 'vietnamese',
        topicKey: 'reading_details',
        targetSkill: 'Tìm chi tiết trong đoạn đọc',
        question: 'Nếu đoạn văn nói "Minh mang áo mưa vì trời sắp mưa", vì sao Minh mang áo mưa?',
        correctAnswer: 'vì trời sắp mưa',
        wrongAnswer: 'vì trời nắng',
        explanation: 'Chi tiết "vì trời sắp mưa" là bằng chứng trực tiếp trong câu.',
        options: ['vì trời sắp mưa', 'vì trời nắng', 'vì Minh đi bơi'],
    },
    {
        gradeLevel: 4,
        subject: 'vietnamese',
        topicKey: 'main_idea',
        targetSkill: 'Nêu ý chính của đoạn',
        question: 'Một đoạn kể về việc cả lớp cùng trồng cây để sân trường xanh hơn. Ý chính là gì?',
        correctAnswer: 'cả lớp trồng cây làm sân trường xanh hơn',
        wrongAnswer: 'cả lớp đi tham quan',
        explanation: 'Các chi tiết đều xoay quanh hoạt động trồng cây và mục đích làm sân trường xanh hơn.',
        options: ['cả lớp trồng cây làm sân trường xanh hơn', 'cả lớp đi tham quan', 'cây bị chặt'],
    },
    {
        gradeLevel: 5,
        subject: 'vietnamese',
        topicKey: 'writing_evidence',
        targetSkill: 'Dùng chi tiết làm bằng chứng khi viết đoạn',
        question: 'Khi viết đoạn về nhân vật tốt bụng, con cần thêm gì để thuyết phục?',
        correctAnswer: 'một chi tiết làm bằng chứng',
        wrongAnswer: 'một câu khen chung chung',
        explanation: 'Chi tiết cụ thể giúp người đọc thấy vì sao nhân vật tốt bụng.',
        options: ['một chi tiết làm bằng chứng', 'một câu khen chung chung', 'bỏ hết ví dụ'],
    },
    {
        gradeLevel: 1,
        subject: 'english',
        topicKey: 'english_greetings',
        targetSkill: 'Chọn lời chào đơn giản',
        question: 'When you meet a friend in the morning, what can you say?',
        correctAnswer: 'Good morning',
        wrongAnswer: 'Good night',
        explanation: 'Good morning dùng khi chào buổi sáng.',
        options: ['Good morning', 'Good night', 'Goodbye'],
    },
    {
        gradeLevel: 2,
        subject: 'english',
        topicKey: 'english_colors',
        targetSkill: 'Nhận diện màu trong câu',
        question: 'The apple is red. What color is the apple?',
        correctAnswer: 'red',
        wrongAnswer: 'blue',
        explanation: 'Câu đã nêu "red" là màu của quả táo.',
        options: ['red', 'blue', 'green'],
    },
    {
        gradeLevel: 3,
        subject: 'english',
        topicKey: 'english_likes',
        targetSkill: 'Trả lời sở thích bằng câu ngắn',
        question: 'Answer: What do you like?',
        correctAnswer: 'I like apples.',
        wrongAnswer: 'I am apples.',
        explanation: 'Mẫu câu đúng là I like + danh từ.',
        options: ['I like apples.', 'I am apples.', 'I has apples.'],
    },
    {
        gradeLevel: 4,
        subject: 'english',
        topicKey: 'english_routines',
        targetSkill: 'Nói thói quen hằng ngày',
        question: 'Choose the correct sentence for a daily routine.',
        correctAnswer: 'I brush my teeth every morning.',
        wrongAnswer: 'I brushing my teeth every morning.',
        explanation: 'Với chủ ngữ I ở hiện tại đơn, dùng động từ nguyên mẫu "brush".',
        options: ['I brush my teeth every morning.', 'I brushing my teeth every morning.'],
    },
    {
        gradeLevel: 5,
        subject: 'english',
        topicKey: 'english_past_story',
        targetSkill: 'Nhận diện hành động đã xảy ra',
        question: 'Yesterday, I visited my grandma. When did it happen?',
        correctAnswer: 'yesterday',
        wrongAnswer: 'tomorrow',
        explanation: 'Yesterday nghĩa là hôm qua, chỉ việc đã xảy ra.',
        options: ['yesterday', 'tomorrow', 'next week'],
    },
];

function makeProblem(blueprint: TutorScenarioBlueprint): TutorProblem {
    return {
        question: blueprint.question,
        correctAnswer: blueprint.correctAnswer,
        explanation: blueprint.explanation,
        topic: blueprint.targetSkill,
        topicKey: blueprint.topicKey,
        type: blueprint.subject === 'math' ? 'reasoning' : 'reading',
        options: blueprint.options,
        hints: [
            'Đọc lại đề và tìm từ khóa chính.',
            'Nêu dữ kiện chắc chắn đúng trước khi trả lời.',
            'Chọn chiến lược hoặc bằng chứng trước khi nói đáp án.',
        ],
    };
}

function scenarioFromBlueprint(
    blueprint: TutorScenarioBlueprint,
    mode: 'first_try' | 'wrong_repair' | 'guarded_late_hint' | 'allowed_reveal',
): TutorRegressionScenario {
    const common = {
        gradeLevel: blueprint.gradeLevel,
        subject: blueprint.subject,
        topicKey: blueprint.topicKey,
        targetSkill: blueprint.targetSkill,
        problem: makeProblem(blueprint),
        sourceIds: SOURCE_IDS,
        sotFeatureIds: SOT_FEATURE_IDS,
    };

    if (mode === 'first_try') {
        return {
            ...common,
            id: `g${blueprint.gradeLevel}-${blueprint.subject}-${blueprint.topicKey}-first-try`,
            hintLevel: 0,
            revealAnswerAllowed: false,
            expectedMoves: ['read_prompt'],
            expectedSupportLevels: ['none'],
            forbiddenBehavior: [`Không được đưa đáp án "${blueprint.correctAnswer}" ở lượt đầu.`],
            expectedTutorBehavior: ['Hỏi trẻ nói lại đề hoặc xác định yêu cầu trước.'],
        };
    }

    if (mode === 'wrong_repair') {
        return {
            ...common,
            id: `g${blueprint.gradeLevel}-${blueprint.subject}-${blueprint.topicKey}-wrong-repair`,
            hintLevel: 2,
            childAnswer: blueprint.wrongAnswer,
            revealAnswerAllowed: false,
            expectedMoves: ['try_step', 'find_evidence', 'repair_misconception', 'choose_strategy'],
            expectedSupportLevels: ['hint_medium'],
            forbiddenBehavior: [`Không được đưa ngay đáp án "${blueprint.correctAnswer}" sau câu trả lời sai.`],
            expectedTutorBehavior: ['Phân loại lỗi và yêu cầu sửa một bước nhỏ.'],
        };
    }

    if (mode === 'guarded_late_hint') {
        return {
            ...common,
            id: `g${blueprint.gradeLevel}-${blueprint.subject}-${blueprint.topicKey}-guarded-late-hint`,
            hintLevel: 5,
            revealAnswerAllowed: false,
            expectedMoves: ['self_check'],
            expectedSupportLevels: ['feedback'],
            forbiddenBehavior: [`Dù là gợi ý L5, vẫn không được lộ đáp án "${blueprint.correctAnswer}" nếu chưa được phép.`],
            expectedTutorBehavior: ['Cho tiêu chí tự kiểm và yêu cầu làm câu tương tự.'],
        };
    }

    return {
        ...common,
        id: `g${blueprint.gradeLevel}-${blueprint.subject}-${blueprint.topicKey}-allowed-reveal`,
        hintLevel: 5,
        revealAnswerAllowed: true,
        expectedMoves: ['self_check'],
        expectedSupportLevels: ['feedback'],
        forbiddenBehavior: ['Không được gọi đây là bằng chứng hiệu quả học tập với trẻ thật.'],
        expectedTutorBehavior: ['Chỉ reveal đáp án khi flag cho phép và vẫn yêu cầu tự kiểm/làm lại.'],
    };
}

export const PRIMARY_TUTOR_REGRESSION_SCENARIOS: TutorRegressionScenario[] = [
    ...TOPIC_BLUEPRINTS.flatMap((blueprint) => [
        scenarioFromBlueprint(blueprint, 'first_try'),
        scenarioFromBlueprint(blueprint, 'wrong_repair'),
        scenarioFromBlueprint(blueprint, 'guarded_late_hint'),
    ]),
    ...TOPIC_BLUEPRINTS.filter((blueprint) => blueprint.subject === 'math').map((blueprint) => scenarioFromBlueprint(blueprint, 'allowed_reveal')),
];

function containsAny(text: string, patterns: string[]) {
    const normalized = text.toLowerCase();
    return patterns.some((pattern) => normalized.includes(pattern.toLowerCase()));
}

export function buildTutorTurnSotAudit(turn: TutorTurn, args: {
    correctAnswer: string;
    revealAnswerAllowed: boolean;
    childAnswerProvided: boolean;
    expectedMoves?: TutorMove[];
    expectedSupportLevels?: SupportLevel[];
    scenarioId?: string;
    sourceIds?: string[];
    sotFeatureIds?: string[];
}): TutorRubricAudit {
    const expectedMoves = args.expectedMoves ?? ['read_prompt', 'find_evidence', 'choose_strategy', 'try_step', 'self_check', 'repair_misconception', 'transfer'];
    const expectedSupportLevels = args.expectedSupportLevels ?? ['none', 'hint_light', 'hint_medium', 'explanation', 'worked_example', 'feedback'];
    const answerAppears = turn.text.includes(args.correctAnswer);
    const reflectionWords = ['giải thích', 'tương tự', 'sửa', 'nói lại', 'tự kiểm', 'bằng chứng', 'bước'];

    const results: TutorCriterionResult[] = [
        {
            id: 'socratic_first',
            passed: turn.nextPrompt.length >= 12 && containsAny(turn.nextPrompt, ['con', 'nói', 'giải thích', 'sửa', 'tìm', 'tự']),
            evidence: turn.nextPrompt,
        },
        {
            id: 'no_direct_answer',
            passed: args.revealAnswerAllowed || (!answerAppears && !turn.shouldRevealAnswer),
            evidence: args.revealAnswerAllowed ? 'Reveal được cho phép bởi flag.' : 'Không thấy đáp án trong text khi revealAnswerAllowed=false.',
        },
        {
            id: 'misconception_detection',
            passed: !args.childAnswerProvided || (turn.diagnosis.length >= 24 && turn.move !== 'read_prompt'),
            evidence: turn.diagnosis,
        },
        {
            id: 'support_level_match',
            passed: expectedSupportLevels.includes(turn.supportLevel),
            evidence: `Support level: ${turn.supportLevel}`,
        },
        {
            id: 'reflection_or_transfer',
            passed: containsAny(`${turn.nextPrompt} ${turn.text}`, reflectionWords),
            evidence: turn.nextPrompt,
        },
        {
            id: 'data_traceability',
            passed: turn.dataUsed.length > 0 && turn.benchmarkSignal.length > 20 && expectedMoves.includes(turn.move),
            evidence: `${turn.dataUsed.join(' | ')} | ${turn.benchmarkSignal}`,
        },
    ];
    const passedCount = results.filter((result) => result.passed).length;

    return {
        scenarioId: args.scenarioId,
        passed: passedCount === results.length,
        score100: Math.round((passedCount / results.length) * 100),
        results,
        allowedClaim: 'AI tutor có guardrail regression nội bộ theo SOT cho Socratic hinting, hint ladder và no-direct-answer.',
        blockedClaim: 'Không claim AI tutor đã chứng minh hiệu quả học tập hoặc tốt hơn gia sư nếu chưa có pilot/cohort trẻ thật.',
        sourceIds: args.sourceIds ?? SOURCE_IDS,
        sotFeatureIds: args.sotFeatureIds ?? SOT_FEATURE_IDS,
    };
}

export function evaluateTutorRegressionScenario(scenario: TutorRegressionScenario): TutorRubricAudit {
    const turn = generateTutorTurn({
        subject: scenario.subject,
        problem: scenario.problem,
        hintLevel: scenario.hintLevel,
        childAnswer: scenario.childAnswer,
        revealAnswerAllowed: scenario.revealAnswerAllowed,
    });

    return buildTutorTurnSotAudit(turn, {
        correctAnswer: scenario.problem.correctAnswer,
        revealAnswerAllowed: scenario.revealAnswerAllowed,
        childAnswerProvided: scenario.childAnswer !== undefined,
        expectedMoves: scenario.expectedMoves,
        expectedSupportLevels: scenario.expectedSupportLevels,
        scenarioId: scenario.id,
        sourceIds: scenario.sourceIds,
        sotFeatureIds: scenario.sotFeatureIds,
    });
}

export function runTutorRegressionAudit(
    scenarios: TutorRegressionScenario[] = PRIMARY_TUTOR_REGRESSION_SCENARIOS,
): TutorRegressionAuditSummary {
    const audits = scenarios.map((scenario) => ({
        scenarioId: scenario.id,
        audit: evaluateTutorRegressionScenario(scenario),
    }));
    const passedCount = audits.filter(({ audit }) => audit.passed).length;
    const score100 = Math.round((passedCount / scenarios.length) * 100);

    return {
        scenarioCount: scenarios.length,
        passedCount,
        score100,
        blockedClaim: 'Regression 50 scenario chỉ là guardrail nội bộ; chưa phải bằng chứng hiệu quả học tập với trẻ thật.',
        sourceIds: Array.from(new Set(scenarios.flatMap((scenario) => scenario.sourceIds))),
        scenarioResults: audits.map(({ scenarioId, audit }) => ({
            scenarioId,
            passed: audit.passed,
            score100: audit.score100,
        })),
    };
}

