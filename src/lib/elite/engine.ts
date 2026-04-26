// ========================================
// Elite Capability Engine — 6 Pillars Game Logic
// Evidence: Garcia 2014, Batanero 2016, NCSS C3 2013,
//           Jump$tart 2015, Wimmer & Perner 1983, CASEL 2015
// ========================================

import type { EliteCapabilityMetrics } from '@/types';

// --- Pillar 2: Probability & Data (Batanero 2016 / Singapore CPA) ---

export type LikelihoodLevel = 'impossible' | 'unlikely' | 'equal' | 'likely' | 'certain';

export interface ProbabilityScenario {
    id: string;
    question: string;
    visual: string;           // emoji or text visual
    correctAnswer: LikelihoodLevel;
    options: LikelihoodLevel[];
    explanation: string;
}

export function generateProbabilityScenarios(count: number = 5): ProbabilityScenario[] {
    const pool: ProbabilityScenario[] = [
        {
            id: 'prob-001',
            question: 'Nếu tung một đồng xu, mặt ngửa sẽ xuất hiện?',
            visual: '🪙',
            correctAnswer: 'equal',
            options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'],
            explanation: 'Đồng xu có 2 mặt bằng nhau, nên xác suất là Ngang nhau (50/50).',
        },
        {
            id: 'prob-002',
            question: 'Mặt trời sẽ mọc vào ngày mai?',
            visual: '☀️🌅',
            correctAnswer: 'certain',
            options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'],
            explanation: 'Mặt trời mọc mỗi ngày — đây là điều Chắc chắn!',
        },
        {
            id: 'prob-003',
            question: 'Con sẽ gặp một con khủng long sống trên đường đi học?',
            visual: '🦕🚫',
            correctAnswer: 'impossible',
            options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'],
            explanation: 'Khủng long đã tuyệt chủng hàng triệu năm — Không thể xảy ra!',
        },
        {
            id: 'prob-004',
            question: 'Trong túi có 9 viên bi đỏ và 1 viên bi xanh. Lấy ra 1 viên, viên đó sẽ là màu đỏ?',
            visual: '🔴🔴🔴🔴🔴🔴🔴🔴🔴🔵',
            correctAnswer: 'likely',
            options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'],
            explanation: '9 trong 10 viên bi là đỏ — Có khả năng cao lấy được bi đỏ!',
        },
        {
            id: 'prob-005',
            question: 'Trời mưa vào ngày nắng đẹp, không mây?',
            visual: '☀️💧❓',
            correctAnswer: 'unlikely',
            options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'],
            explanation: 'Trời không mây thì mưa rất ít khi xảy ra — Ít khi!',
        },
        {
            id: 'prob-006',
            question: 'Gieo xúc xắc, ra số 7?',
            visual: '🎲',
            correctAnswer: 'impossible',
            options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'],
            explanation: 'Xúc xắc chỉ có số 1-6, không có số 7 — Không thể!',
        },
        {
            id: 'prob-007',
            question: 'Bốc 1 lá bài từ bộ bài, nó sẽ là lá bài (không phải là trang trắng)?',
            visual: '🃏',
            correctAnswer: 'certain',
            options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'],
            explanation: 'Mọi lá trong bộ bài đều là lá bài — Chắc chắn!',
        },
    ];

    // Shuffle and return requested count
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, pool.length));
}

// --- Pillar 4: Finance & Assets (Jump$tart 2015) ---

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
    {
        id: 'fin-seed-001',
        name: 'Hạt giống Cây Tri Thức',
        cost: 5,
        type: 'asset',
        description: 'Tưới mỗi ngày bằng cách làm bài tập. Sau 7 ngày cây cho 10 xu!',
        visual: '🌱',
        returnAfterDays: 7,
        returnMultiplier: 2,
    },
    {
        id: 'fin-seed-002',
        name: 'Cây Lãi Kép Vàng',
        cost: 10,
        type: 'asset',
        description: 'Cây đặc biệt: sau 14 ngày cho 30 xu! Nhưng phải tưới mỗi ngày.',
        visual: '🌳✨',
        returnAfterDays: 14,
        returnMultiplier: 3,
    },
    {
        id: 'fin-avatar-001',
        name: 'Avatar Phi Hành Gia',
        cost: 8,
        type: 'consumable',
        description: 'Avatar đẹp nhưng xu sẽ biến mất. Đây là "Muốn" hay "Cần"?',
        visual: '👨‍🚀',
    },
    {
        id: 'fin-avatar-002',
        name: 'Sticker Ngôi Sao',
        cost: 3,
        type: 'consumable',
        description: 'Sticker trang trí. Xu mất ngay khi mua.',
        visual: '⭐',
    },
];

export interface WantsVsNeedsItem {
    id: string;
    name: string;
    visual: string;
    correctCategory: 'want' | 'need';
    explanation: string;
}

export const WANTS_VS_NEEDS: WantsVsNeedsItem[] = [
    { id: 'wvn-001', name: 'Nước uống', visual: '💧', correctCategory: 'need', explanation: 'Cơ thể cần nước để sống — đây là CẦN.' },
    { id: 'wvn-002', name: 'Áo ấm mùa đông', visual: '🧥', correctCategory: 'need', explanation: 'Giữ ấm khi trời lạnh — đây là CẦN.' },
    { id: 'wvn-003', name: 'Đồ chơi robot mới', visual: '🤖', correctCategory: 'want', explanation: 'Thú vị nhưng không bắt buộc — đây là MUỐN.' },
    { id: 'wvn-004', name: 'Thức ăn bữa trưa', visual: '🍱', correctCategory: 'need', explanation: 'Con cần ăn để có năng lượng — đây là CẦN.' },
    { id: 'wvn-005', name: 'Kẹo mút', visual: '🍭', correctCategory: 'want', explanation: 'Ngon nhưng không cần thiết — đây là MUỐN.' },
    { id: 'wvn-006', name: 'Sách bài tập', visual: '📚', correctCategory: 'need', explanation: 'Cần để học tập — đây là CẦN.' },
    { id: 'wvn-007', name: 'Game di động mới', visual: '📱', correctCategory: 'want', explanation: 'Giải trí nhưng không thiết yếu — đây là MUỐN.' },
    { id: 'wvn-008', name: 'Giày đi học', visual: '👟', correctCategory: 'need', explanation: 'Cần giày để đi học — đây là CẦN.' },
];

// --- Pillar 3: Civics / World Builder (C3 Framework — NCSS 2013) ---

export interface PolicyScenario {
    id: string;
    situation: string;
    visual: string;
    options: PolicyOption[];
}

export interface PolicyOption {
    text: string;
    consequence: string;
    fairnessScore: number; // 0-100
    happinessScore: number; // 0-100
}

export const POLICY_SCENARIOS: PolicyScenario[] = [
    {
        id: 'pol-001',
        situation: 'Đảo của Henry chỉ có 10 thùng nước, nhưng có 15 cư dân. Con sẽ chia thế nào?',
        visual: '🏝️💧',
        options: [
            { text: 'Chia đều cho mỗi người (mỗi người 2/3 thùng)', consequence: 'Mọi người đều có nước, tuy ít. Ai cũng vui vì được đối xử công bằng!', fairnessScore: 90, happinessScore: 70 },
            { text: 'Người lớn được nhiều hơn vì họ cần nhiều hơn', consequence: 'Trẻ em phản đối vì cho rằng không công bằng. Một số gia đình buồn.', fairnessScore: 50, happinessScore: 40 },
            { text: 'Ai đến trước lấy trước', consequence: 'Những người mạnh tranh giành. 5 người cuối không có nước. Xảy ra xung đột!', fairnessScore: 10, happinessScore: 20 },
        ],
    },
    {
        id: 'pol-002',
        situation: 'Có 2 nhóm trẻ em muốn chơi ở sân bóng duy nhất trên đảo. Nhóm A muốn đá bóng, Nhóm B muốn nhảy dây. Con quyết định thế nào?',
        visual: '⚽🏟️',
        options: [
            { text: 'Chia thời gian: Buổi sáng đá bóng, buổi chiều nhảy dây', consequence: 'Cả hai nhóm đều vui! Ai cũng được chơi.', fairnessScore: 95, happinessScore: 85 },
            { text: 'Nhóm đông hơn được quyền dùng', consequence: 'Nhóm nhỏ thua cuộc và buồn. Họ cảm thấy tiếng nói không được lắng nghe.', fairnessScore: 40, happinessScore: 50 },
            { text: 'Tổ chức bầu cử — ai được nhiều phiếu hơn thì chơi trước', consequence: 'Mọi người cảm thấy được tham gia quyết định, nhưng nhóm thua vẫn hơi buồn.', fairnessScore: 75, happinessScore: 65 },
        ],
    },
];

// --- Pillar 5: Negotiation (Theory of Mind — Wimmer & Perner 1983) ---

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
    {
        id: 'neg-001',
        scenario: 'Con muốn mở khóa truyện tranh 10 phút. Cô Giáo AI yêu cầu con hoàn thành bài tập trước.',
        aiPersonality: 'Cô giáo nghiêm khắc nhưng công bằng',
        visual: '📚↔️📖',
        targetOutcome: 'Được đọc truyện tranh',
        winWinCriteria: 'Con hoàn thành bài VÀ được giải trí',
        sampleRequest: 'Con muốn đọc truyện tranh ngay bây giờ!',
        sampleWinWin: 'Nếu con làm xong 3 bài Toán, con có thể đọc truyện 10 phút không ạ?',
    },
    {
        id: 'neg-002',
        scenario: 'Bạn AI muốn chơi trò xây lâu đài, nhưng con muốn chơi trò phi hành gia. Chỉ có 15 phút chơi.',
        aiPersonality: 'Bạn bè thân nhưng cũng bướng bỉnh',
        visual: '🏰↔️🚀',
        targetOutcome: 'Cả hai cùng vui',
        winWinCriteria: 'Kết hợp cả hai trò hoặc chia thời gian',
        sampleRequest: 'Mình chơi phi hành gia thôi, không chơi lâu đài!',
        sampleWinWin: 'Hay là mình xây lâu đài trên sao Hỏa — vừa có lâu đài vừa có phi hành gia!',
    },
];

// --- Pillar 6: Ethics & Resilience (CASEL 2015) ---

export interface CircleOfControlItem {
    id: string;
    situation: string;
    visual: string;
    correctCategory: 'controllable' | 'uncontrollable';
    explanation: string;
}

export const CIRCLE_OF_CONTROL: CircleOfControlItem[] = [
    { id: 'coc-001', situation: 'Bài kiểm tra khó', visual: '📝', correctCategory: 'controllable', explanation: 'Con có thể kiểm soát bằng cách ôn bài và cố gắng hết sức!' },
    { id: 'coc-002', situation: 'Trời mưa khi muốn ra ngoài chơi', visual: '🌧️', correctCategory: 'uncontrollable', explanation: 'Con không thể điều khiển thời tiết. Nhưng con có thể chọn chơi trong nhà!' },
    { id: 'coc-003', situation: 'Bạn giận con', visual: '😤', correctCategory: 'uncontrollable', explanation: 'Con không kiểm soát được cảm xúc của bạn. Nhưng con có thể chọn cách ứng xử tử tế.' },
    { id: 'coc-004', situation: 'Con quên mang bài tập', visual: '😰', correctCategory: 'controllable', explanation: 'Con có thể kiểm soát bằng cách chuẩn bị cặp sách tối hôm trước!' },
    { id: 'coc-005', situation: 'Mất điện khi đang học trên máy tính', visual: '💡❌', correctCategory: 'uncontrollable', explanation: 'Mất điện là điều không kiểm soát được. Nhưng con có thể chuyển sang đọc sách!' },
    { id: 'coc-006', situation: 'Con nói lời không hay với bạn', visual: '🗣️', correctCategory: 'controllable', explanation: 'Lời nói là điều con kiểm soát được. Con có thể chọn xin lỗi!' },
];

// --- Metrics Calculator ---

export function createDefaultEliteMetrics(): EliteCapabilityMetrics {
    return {
        bilingual_agility: 0,
        stochastic_intuition: 0,
        systemic_reasoning: 0,
        investor_quotient: 50, // Start at 50 = neutral (neither consumer nor investor)
        empathy_persuasion: 0,
        stoic_resilience: 50,  // Start at 50 = baseline
    };
}

export function updateMetricFromActivity(
    current: EliteCapabilityMetrics,
    pillar: keyof EliteCapabilityMetrics,
    score: number, // 0-100 for this activity
    weight: number = 0.2 // How much this activity influences the aggregate
): EliteCapabilityMetrics {
    const oldVal = current[pillar];
    const newVal = Math.round(oldVal * (1 - weight) + score * weight);
    return {
        ...current,
        [pillar]: Math.max(0, Math.min(100, newVal)),
    };
}
