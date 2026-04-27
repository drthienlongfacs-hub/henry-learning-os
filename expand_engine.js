const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'lib', 'elite', 'engine.ts');

const buildProbabilityPool = () => {
    let str = "";
    for (let i = 0; i < 30; i++) {
        const types = [
            { q: `Trong hộp có ${10 + i} bi xanh và 1 bi đỏ. Lấy 1 viên, nó sẽ là bi đỏ?`, a: 'unlikely', exp: 'Tỉ lệ lấy được bi đỏ rất nhỏ.' },
            { q: `Ngày mai sau thứ Ba sẽ là thứ Tư?`, a: 'certain', exp: 'Thứ tự các ngày trong tuần là cố định.' },
            { q: `Con tung một viên xúc xắc ${6 + (i % 3)} mặt, nó sẽ ra số 100?`, a: 'impossible', exp: 'Không có số 100 trên xúc xắc này.' },
            { q: `Tung một đồng xu bình thường, nó sẽ ra mặt sấp?`, a: 'equal', exp: 'Xác suất là 50/50.' },
            { q: `Trong túi có ${20 + i} kẹo dâu và 2 kẹo chanh. Lấy 1 cái, nó sẽ là kẹo dâu?`, a: 'likely', exp: 'Có rất nhiều kẹo dâu nên xác suất cao.' }
        ];
        const t = types[i % types.length];
        str += `        { id: 'prob-gen-${i}', question: '${t.q}', visual: '🎲', correctAnswer: '${t.a}', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: '${t.exp}' },\n`;
    }
    return str;
};

const buildWantsNeeds = () => {
    let str = "";
    const items = [
        { c: 'need', n: 'Nước sạch để uống', exp: 'Nước là thiết yếu cho sự sống.' },
        { c: 'want', n: 'Đồng hồ thông minh mới', exp: 'Nó tiện lợi nhưng không bắt buộc phải có.' },
        { c: 'need', n: 'Thuốc khi bị ốm', exp: 'Sức khỏe là ưu tiên hàng đầu.' },
        { c: 'want', n: 'Chuyến đi chơi công viên giải trí', exp: 'Rất vui nhưng là mong muốn giải trí, không phải nhu cầu thiết yếu.' },
        { c: 'need', n: 'Bữa sáng đầy đủ dinh dưỡng', exp: 'Cơ thể cần năng lượng để hoạt động.' },
        { c: 'want', n: 'Mô hình siêu nhân phiên bản giới hạn', exp: 'Chỉ là sở thích cá nhân sưu tầm.' }
    ];
    for (let i = 0; i < 30; i++) {
        const t = items[i % items.length];
        str += `    { id: 'wvn-gen-${i}', name: '${t.n} ${i > 5 ? `(${i})` : ''}', visual: '📦', correctCategory: '${t.c}', explanation: '${t.exp}' },\n`;
    }
    return str;
};

const buildPolicies = () => {
    let str = "";
    for (let i = 0; i < 20; i++) {
        str += `    {
        id: 'pol-gen-${i}',
        situation: 'Thành phố chỉ còn đủ điện cho ${50 + i}% khu vực. Lãnh đạo nên phân bổ thế nào?',
        visual: '⚡',
        options: [
            { text: 'Ưu tiên bệnh viện và dịch vụ công', consequence: 'Đảm bảo an toàn sinh mạng, nhưng dân cư sẽ khó chịu.', fairnessScore: 90, happinessScore: 60 },
            { text: 'Cắt điện đều mỗi khu vực 2 tiếng', consequence: 'Mọi người chia sẻ khó khăn, nhưng bệnh viện gặp rủi ro.', fairnessScore: 70, happinessScore: 50 },
            { text: 'Chỉ cung cấp cho khu nhà giàu', consequence: 'Xã hội bất bình đẳng, gây ra phản đối gay gắt.', fairnessScore: 10, happinessScore: 20 }
        ]
    },\n`;
    }
    return str;
};

const buildNegotiation = () => {
    let str = "";
    for (let i = 0; i < 15; i++) {
        str += `    {
        id: 'neg-gen-${i}',
        scenario: 'Bạn AI muốn học toán ${30 + i} phút, con muốn chơi game.',
        aiPersonality: 'Nhu cương kết hợp, đề cao sự hợp tác',
        visual: '🤝',
        targetOutcome: 'Học xong sớm rồi chơi',
        winWinCriteria: 'Chia nhỏ thời gian để đạt cả hai mục tiêu',
        sampleRequest: 'Hoặc con chơi, hoặc không gì cả!',
        sampleWinWin: 'Hay chúng ta học Toán 15 phút, sau đó chơi game 15 phút?',
    },\n`;
    }
    return str;
};

const buildCircleControl = () => {
    let str = "";
    const controls = [
        { c: 'controllable', s: 'Thái độ của con khi thua cuộc', exp: 'Cảm xúc và cách nhìn nhận là do con quyết định.' },
        { c: 'uncontrollable', s: 'Bạn bè gian lận trong trò chơi', exp: 'Con không thể kiểm soát hành động của người khác, chỉ có thể chọn không chơi chung.' },
        { c: 'controllable', s: 'Thời gian con dành để đọc sách', exp: 'Lịch trình cá nhân là thứ con hoàn toàn làm chủ.' },
        { c: 'uncontrollable', s: 'Bài thi Toán quá khó', exp: 'Độ khó do giáo viên quyết định, con chỉ kiểm soát sự nỗ lực của mình.' }
    ];
    for (let i = 0; i < 30; i++) {
        const t = controls[i % controls.length];
        str += `    { id: 'coc-gen-${i}', situation: '${t.s} ${i > 3 ? `(${i})` : ''}', visual: '🎯', correctCategory: '${t.c}', explanation: '${t.exp}' },\n`;
    }
    return str;
};


const fullContent = `// ========================================
// Elite Capability Engine — 6 Pillars Game Logic
// Evidence: Garcia 2014, Batanero 2016, NCSS C3 2013,
//           Jump$tart 2015, Wimmer & Perner 1983, CASEL 2015
// ========================================

import type { EliteCapabilityMetrics } from '@/types';

export type LikelihoodLevel = 'impossible' | 'unlikely' | 'equal' | 'likely' | 'certain';

export interface ProbabilityScenario {
    id: string;
    question: string;
    visual: string;
    correctAnswer: LikelihoodLevel;
    options: LikelihoodLevel[];
    explanation: string;
}

export function generateProbabilityScenarios(count: number = 5): ProbabilityScenario[] {
    const pool: ProbabilityScenario[] = [
${buildProbabilityPool()}
    ];
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, pool.length));
}

export interface FinanceItem {
    id: string;
    name: string;
    cost: number;
    type: 'asset' | 'consumable';
    description: string;
    visual: string;
    returnAfterDays?: number;
    returnMultiplier?: number;
}

export const FINANCE_ITEMS: FinanceItem[] = [
    { id: 'fin-seed-001', name: 'Hạt giống Cây Tri Thức', cost: 5, type: 'asset', description: 'Tưới mỗi ngày. 7 ngày cho 10 xu!', visual: '🌱', returnAfterDays: 7, returnMultiplier: 2 },
    { id: 'fin-seed-002', name: 'Cây Lãi Kép Vàng', cost: 10, type: 'asset', description: '14 ngày cho 30 xu!', visual: '🌳✨', returnAfterDays: 14, returnMultiplier: 3 },
    { id: 'fin-avatar-001', name: 'Avatar Phi Hành Gia', cost: 8, type: 'consumable', description: 'Trang trí đẹp. Xu mất ngay.', visual: '👨‍🚀' },
];

export interface WantsVsNeedsItem {
    id: string;
    name: string;
    visual: string;
    correctCategory: 'want' | 'need';
    explanation: string;
}

export const WANTS_VS_NEEDS: WantsVsNeedsItem[] = [
${buildWantsNeeds()}
];

export interface PolicyScenario {
    id: string;
    situation: string;
    visual: string;
    options: PolicyOption[];
}

export interface PolicyOption {
    text: string;
    consequence: string;
    fairnessScore: number;
    happinessScore: number;
}

export const POLICY_SCENARIOS: PolicyScenario[] = [
${buildPolicies()}
];

export interface NegotiationChallenge {
    id: string;
    scenario: string;
    aiPersonality: string;
    visual: string;
    targetOutcome: string;
    winWinCriteria: string;
    sampleRequest: string;
    sampleWinWin: string;
}

export const NEGOTIATION_CHALLENGES: NegotiationChallenge[] = [
${buildNegotiation()}
];

export interface CircleOfControlItem {
    id: string;
    situation: string;
    visual: string;
    correctCategory: 'controllable' | 'uncontrollable';
    explanation: string;
}

export const CIRCLE_OF_CONTROL: CircleOfControlItem[] = [
${buildCircleControl()}
];

export function createDefaultEliteMetrics(): EliteCapabilityMetrics {
    return {
        bilingual_agility: 0,
        stochastic_intuition: 0,
        systemic_reasoning: 0,
        investor_quotient: 50,
        empathy_persuasion: 0,
        stoic_resilience: 50,
    };
}

export function updateMetricFromActivity(current: EliteCapabilityMetrics, pillar: keyof EliteCapabilityMetrics, score: number, weight: number = 0.2): EliteCapabilityMetrics {
    const oldVal = current[pillar];
    const newVal = Math.round(oldVal * (1 - weight) + score * weight);
    return { ...current, [pillar]: Math.max(0, Math.min(100, newVal)) };
}
`;

fs.writeFileSync(targetFile, fullContent, 'utf8');
console.log("Successfully rebuilt engine.ts with massive CASEL arrays.");
