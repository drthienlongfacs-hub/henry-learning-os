// =====================================================
// Ethics Generator — Đạo đức (L1-2)
// Sources: CT 2018 Đạo đức, CASEL SEL framework
// =====================================================

export interface EthicsProblem {
    id: string;
    question: string;
    correctAnswer: string;
    options: string[];
    explanation: string;
    difficulty: number;
    hints: string[];
    type: 'behavior' | 'emotion';
    gradeLevel: number;
    topic: string;
    topicKey: string;
    illustration?: string;
}

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const genId = () => `ethics-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// ══════════════════════════════════════════════
// Grade 1: Polite Greet (Chào hỏi lễ phép)
// ══════════════════════════════════════════════

const POLITE_QS = [
    { q: 'Khi gặp ông bà, em nên làm gì?', a: 'Khoanh tay và cúi đầu chào', opts: ['Khoanh tay và cúi đầu chào', 'Ngó lơ đi thẳng', 'Vẫy tay chào như bạn bè', 'Chỉ mỉm cười không nói gì'], e: 'Đối với người lớn tuổi như ông bà, em cần khoanh tay, cúi đầu và chào to rõ để thể hiện sự lễ phép.' },
    { q: 'Gặp cô giáo ở cổng trường, em nên nói gì?', a: '"Em chào cô ạ!"', opts: ['"Em chào cô ạ!"', '"Chào cô nha!"', '"Chào!"', 'Không nói gì'], e: 'Với thầy cô, em cần dùng từ ngữ kính trọng và nói đủ câu.' },
    { q: 'Khi bạn bè cùng lớp đến chơi nhà, em sẽ:', a: 'Mỉm cười, vẫy tay và nói "Chào bạn!"', opts: ['Mỉm cười, vẫy tay và nói "Chào bạn!"', 'Khoanh tay cúi đầu', 'Không thèm nhìn', 'Chạy trốn'], e: 'Với bạn bè ngang hàng, em có thể chào hỏi thân thiện, tự nhiên như vẫy tay và mỉm cười.' },
    { q: 'Tại sao chúng ta cần chào hỏi mọi người?', a: 'Để thể hiện sự tôn trọng và thân thiện', opts: ['Để thể hiện sự tôn trọng và thân thiện', 'Vì bị bắt buộc', 'Để xin kẹo', 'Chỉ để cho vui'], e: 'Chào hỏi là cách chúng ta bắt đầu câu chuyện và thể hiện sự tôn trọng với người đối diện.' },
    { q: 'Nếu em đang ăn kẹo mà có khách đến nhà, em nên làm gì?', a: 'Cất kẹo hoặc nuốt xong rồi mới chào', opts: ['Cất kẹo hoặc nuốt xong rồi mới chào', 'Vừa nhai nhóp nhép vừa chào', 'Không chào vì bận ăn', 'Khóc thét lên'], e: 'Vừa ăn vừa nói/chào hỏi là thiếu lịch sự. Hãy nhai xong rồi mới cất tiếng chào.' },
];

export function genPoliteGreet(): EthicsProblem {
    const item = POLITE_QS[rand(0, POLITE_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'behavior', topic: 'Chào hỏi lễ phép', topicKey: 'polite_greet',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Hãy nghĩ về cách em chào người lớn', `Đáp án: ${item.a}`],
        illustration: '/images/core/books_hd.svg',
    };
}

// ══════════════════════════════════════════════
// Grade 2: Express Emotion (Thể hiện cảm xúc)
// ══════════════════════════════════════════════

const EMOTION_QS = [
    { q: 'Khi em bị điểm kém và cảm thấy buồn, em nên làm gì?', a: 'Nói chuyện với bố mẹ hoặc thầy cô', opts: ['Nói chuyện với bố mẹ hoặc thầy cô', 'Xé bài kiểm tra', 'Gắt gỏng với bạn bè', 'Nhốt mình trong phòng khóc'], e: 'Chia sẻ nỗi buồn với người lớn giúp em nhẹ lòng và nhận được lời khuyên tốt.' },
    { q: 'Bạn của em không may làm hỏng đồ chơi của em. Em rất tức giận. Cách xử lý đúng là:', a: 'Hít thở sâu và nói "Tớ đang rất giận"', opts: ['Hít thở sâu và nói "Tớ đang rất giận"', 'Đánh bạn', 'Làm hỏng lại đồ của bạn', 'La hét ầm ĩ'], e: 'Thể hiện sự tức giận bằng lời nói rõ ràng tốt hơn là dùng bạo lực hay đập phá.' },
    { q: 'Khi được nhận một món quà yêu thích, em sẽ:', a: 'Nói lời cảm ơn với vẻ mặt vui vẻ', opts: ['Nói lời cảm ơn với vẻ mặt vui vẻ', 'Cầm lấy và im lặng bỏ đi', 'Chê quà nhỏ', 'Ném món quà đi'], e: 'Biết ơn và thể hiện niềm vui là cách đáp lại tình cảm của người tặng.' },
    { q: 'Bạn Nam bị ngã đau và đang khóc. Em nên làm gì?', a: 'Đến hỏi thăm và đỡ bạn dậy', opts: ['Đến hỏi thăm và đỡ bạn dậy', 'Chỉ tay cười to', 'Bỏ đi chỗ khác', 'Nói "Có thế mà cũng khóc"'], e: 'Đồng cảm và giúp đỡ người khác khi họ gặp chuyện buồn/đau là hành vi tử tế.' },
    { q: 'Nếu em cảm thấy ghen tị khi bạn được khen nhiều hơn, em nên:', a: 'Tự nhủ sẽ cố gắng hơn ở lần sau', opts: ['Tự nhủ sẽ cố gắng hơn ở lần sau', 'Nói xấu bạn', 'Nghỉ chơi với bạn', 'Cãi lại cô giáo'], e: 'Biến sự ghen tị thành động lực để cố gắng sẽ giúp em tiến bộ hơn.' },
];

export function genExpressEmotion(): EthicsProblem {
    const item = EMOTION_QS[rand(0, EMOTION_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'emotion', topic: 'Thể hiện cảm xúc', topicKey: 'express_emotion',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Hãy nghĩ về cách xử lý khi em tức giận hoặc buồn', `Đáp án: ${item.a}`],
        illustration: '/images/core/books_hd.svg',
    };
}

// ══════════════════════════════════════════════
// TOPIC REGISTRY
// ══════════════════════════════════════════════

export interface EthicsTopicInfo {
    key: string;
    name: string;
    gradeLevel: number;
    generator: () => EthicsProblem;
    icon: string;
}

export const ETHICS_TOPICS: EthicsTopicInfo[] = [
    { key: 'polite_greet', name: 'Chào hỏi lễ phép', gradeLevel: 1, generator: genPoliteGreet, icon: '🙏' },
    { key: 'express_emotion', name: 'Thể hiện cảm xúc', gradeLevel: 2, generator: genExpressEmotion, icon: '😊' },
];

export function generateEthicsSet(grade: number, topicKey?: string, count: number = 10): EthicsProblem[] {
    const topics = ETHICS_TOPICS.filter(t => t.gradeLevel <= grade && (!topicKey || t.key === topicKey));
    if (topics.length === 0) return [];
    return Array.from({ length: count }, () => {
        const t = topics[rand(0, topics.length - 1)];
        return t.generator();
    });
}
