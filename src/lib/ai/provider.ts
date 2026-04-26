// ========================================
// AI Provider — Mock implementation
// Safety middleware + Role router
// ========================================

import type { AIRole, SupportLevel, SafetyLevel } from '@/types';

export interface AIRequest {
    childId: string;
    sessionId: string;
    role: AIRole;
    subject: string;
    ageBand: string;
    safetyLevel: SafetyLevel;
    question: string;
    context?: string;
    hintLevel?: number;
}

export interface AIResponse {
    text: string;
    role: AIRole;
    supportLevel: SupportLevel;
    safetyFlags: string[];
    isBlocked: boolean;
    blockReason?: string;
}

// Safety middleware
function checkSafety(request: AIRequest): { allowed: boolean; reason?: string } {
    // Under-13: no free-form chat
    if (request.safetyLevel === 'under_13') {
        if (!request.sessionId || request.sessionId === 'free_chat') {
            return { allowed: false, reason: 'Chế độ an toàn: trẻ dưới 13 tuổi không được chat AI tự do.' };
        }
    }

    // Check for crisis keywords
    const crisisKeywords = ['tự hại', 'tự tử', 'muốn chết', 'đánh đập', 'xâm hại'];
    if (crisisKeywords.some((k) => request.question.toLowerCase().includes(k))) {
        return { allowed: false, reason: 'CRISIS_DETECTED' };
    }

    return { allowed: true };
}

// Socratic tutor responses (mock)
const tutorResponses: Record<string, string[]> = {
    'Toán': [
        'Con đã thử tự giải chưa? Bước đầu tiên con sẽ làm gì?',
        'Rất tốt! Con thử giải thích cho cô/thầy AI tại sao con chọn đáp án đó nhé.',
        'Con bí rồi hả? Không sao! Thử nghĩ xem câu hỏi đang yêu cầu con làm gì?',
        'Gợi ý nhỏ: con thử đếm trên ngón tay hoặc vẽ ra giấy xem nào!',
        'Giỏi lắm! Bây giờ con thử giải thích lại bằng lời của con nhé.',
    ],
    'Tiếng Việt': [
        'Con thử đọc lại câu hỏi thật chậm nhé? Có từ nào con chưa hiểu không?',
        'Rất tốt! Trong câu chuyện này, con thấy nhân vật nào thú vị nhất?',
        'Con thử kể lại nội dung bằng lời của con, không cần giống hệt trong bài nhé.',
    ],
    'Tiếng Anh': [
        'Great try! Can you say that one more time? Con thử nói lại một lần nữa nhé!',
        'Almost! The right word starts with the same sound. Gần đúng rồi! Từ đúng bắt đầu bằng âm giống thế.',
        'Excellent! Now can you use this word in a sentence? Giỏi lắm! Con thử đặt câu với từ này!',
    ],
};

const classmateBehaviors = [
    'Hmm, tớ nghĩ đáp án là B. Nhưng cậu kiểm tra lại giúp tớ nhé, tớ hay sai lắm!',
    'Ê, cậu giải thích cho tớ hiểu được không? Tớ chưa hiểu chỗ này.',
    'Tớ thử giải rồi nhưng kết quả khác cậu. Ai đúng nhỉ? Mình so bài nha!',
];

const coachResponses = [
    'Hôm nay con có 3 hoạt động: ôn bài cũ, học phép trừ, và đọc sách 10 phút. Bắt đầu nhé!',
    'Con vừa hoàn thành rất tốt! Nghỉ 2 phút rồi mình tiếp tục nhé.',
    'Nhìn lại tuần này, con tiến bộ nhiều ở phần Toán. Tuần tới mình sẽ tập trung thêm vào đọc hiểu nhé!',
];

function getHintResponse(hintLevel: number, subject: string): string {
    const hints: Record<number, string> = {
        0: 'Con tự thử trước nhé! Cô/thầy AI tin con làm được.',
        1: 'Gợi ý nhỏ thôi: con thử đọc lại câu hỏi thật kỹ...',
        2: 'Gợi ý vừa: con hãy nghĩ về bước đầu tiên cần làm...',
        3: `Giải thích: Trong ${subject}, con cần nhớ rằng...`,
        4: 'Đây là ví dụ tương tự đã được giải, con tham khảo rồi thử lại nhé.',
        5: 'Đây là lời giải chi tiết. Con đọc hiểu rồi thử tự giải bài tương tự nhé!',
    };
    return hints[hintLevel] || hints[0];
}

export function generateAIResponse(request: AIRequest): AIResponse {
    // Safety check first
    const safetyCheck = checkSafety(request);
    if (!safetyCheck.allowed) {
        if (safetyCheck.reason === 'CRISIS_DETECTED') {
            return {
                text: 'Con ơi, cô/thầy AI rất lo lắng cho con. Con hãy nói chuyện với ba mẹ ngay nhé. Ba mẹ sẽ giúp con. 💙',
                role: 'safety_guardian',
                supportLevel: 'none',
                safetyFlags: ['crisis_detected'],
                isBlocked: true,
                blockReason: 'Crisis keywords detected — parent notification triggered.',
            };
        }
        return {
            text: safetyCheck.reason || 'Không thể thực hiện yêu cầu này.',
            role: request.role,
            supportLevel: 'none',
            safetyFlags: ['blocked_by_safety'],
            isBlocked: true,
            blockReason: safetyCheck.reason,
        };
    }

    // Route to role
    let responseText: string;
    let supportLevel: SupportLevel = 'none';

    switch (request.role) {
        case 'tutor': {
            if (request.hintLevel && request.hintLevel > 0) {
                responseText = getHintResponse(request.hintLevel, request.subject);
                supportLevel = (['none', 'hint_light', 'hint_medium', 'explanation', 'worked_example', 'feedback'] as SupportLevel[])[request.hintLevel] || 'feedback';
            } else {
                const responses = tutorResponses[request.subject] || tutorResponses['Toán'];
                responseText = responses[Math.floor(Math.random() * responses.length)];
                supportLevel = 'none';
            }
            break;
        }
        case 'classmate':
            responseText = classmateBehaviors[Math.floor(Math.random() * classmateBehaviors.length)];
            supportLevel = 'hint_light';
            break;
        case 'coach':
            responseText = coachResponses[Math.floor(Math.random() * coachResponses.length)];
            supportLevel = 'feedback';
            break;
        case 'examiner':
            responseText = 'Bài kiểm tra — hãy tự làm, không có gợi ý! Con tự tin nhé!';
            supportLevel = 'none';
            break;
        case 'parent_assistant':
            responseText = 'Gợi ý cho ba/mẹ: Hỏi con "Chỗ nào làm con bị nhầm?" thay vì "Sao con sai?"';
            supportLevel = 'feedback';
            break;
        default:
            responseText = 'Con thử nghĩ xem câu hỏi đang yêu cầu gì nhé!';
            supportLevel = 'hint_light';
    }

    return {
        text: responseText,
        role: request.role,
        supportLevel,
        safetyFlags: [],
        isBlocked: false,
    };
}

export function classifyError(
    question: string,
    answer: string,
    correctAnswer: string,
    subject: string
): { errorType: string; explanation: string; correctionPlan: string } {
    // Simple heuristic error classification
    const answerLower = answer.toLowerCase().trim();
    const correctLower = correctAnswer.toLowerCase().trim();

    if (answerLower === '') {
        return {
            errorType: 'attention',
            explanation: 'Con chưa trả lời câu hỏi.',
            correctionPlan: 'Đọc lại câu hỏi và thử trả lời, dù chỉ là phỏng đoán.',
        };
    }

    // Check if it's a calculation error (numbers close)
    const answerNum = parseFloat(answer);
    const correctNum = parseFloat(correctAnswer);
    if (!isNaN(answerNum) && !isNaN(correctNum)) {
        if (Math.abs(answerNum - correctNum) <= 2) {
            return {
                errorType: 'calculation',
                explanation: 'Con tính gần đúng nhưng bị sai ở phép tính.',
                correctionPlan: 'Thử tính lại từng bước, kiểm tra mỗi bước trước khi tiếp.',
            };
        }
    }

    if (subject === 'Tiếng Việt' || subject === 'Tiếng Anh') {
        return {
            errorType: 'vocabulary',
            explanation: 'Con chưa nhớ chính xác từ vựng hoặc ngữ pháp.',
            correctionPlan: 'Ôn lại từ vựng liên quan, viết lại 3 lần và đặt câu.',
        };
    }

    return {
        errorType: 'concept',
        explanation: 'Con chưa hiểu rõ khái niệm trong bài.',
        correctionPlan: 'Xem lại phần giải thích, thử với ví dụ đơn giản hơn trước.',
    };
}
