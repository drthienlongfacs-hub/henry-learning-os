// ========================================
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
        { id: 'prob-gen-0', question: 'Trong hộp có 10 bi xanh và 1 bi đỏ. Lấy 1 viên, nó sẽ là bi đỏ?', visual: '🎲', correctAnswer: 'unlikely', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Tỉ lệ lấy được bi đỏ rất nhỏ.' },
        { id: 'prob-gen-1', question: 'Ngày mai sau thứ Ba sẽ là thứ Tư?', visual: '🎲', correctAnswer: 'certain', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Thứ tự các ngày trong tuần là cố định.' },
        { id: 'prob-gen-2', question: 'Con tung một viên xúc xắc 8 mặt, nó sẽ ra số 100?', visual: '🎲', correctAnswer: 'impossible', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Không có số 100 trên xúc xắc này.' },
        { id: 'prob-gen-3', question: 'Tung một đồng xu bình thường, nó sẽ ra mặt sấp?', visual: '🎲', correctAnswer: 'equal', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Xác suất là 50/50.' },
        { id: 'prob-gen-4', question: 'Trong túi có 24 kẹo dâu và 2 kẹo chanh. Lấy 1 cái, nó sẽ là kẹo dâu?', visual: '🎲', correctAnswer: 'likely', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Có rất nhiều kẹo dâu nên xác suất cao.' },
        { id: 'prob-gen-5', question: 'Trong hộp có 15 bi xanh và 1 bi đỏ. Lấy 1 viên, nó sẽ là bi đỏ?', visual: '🎲', correctAnswer: 'unlikely', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Tỉ lệ lấy được bi đỏ rất nhỏ.' },
        { id: 'prob-gen-6', question: 'Ngày mai sau thứ Ba sẽ là thứ Tư?', visual: '🎲', correctAnswer: 'certain', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Thứ tự các ngày trong tuần là cố định.' },
        { id: 'prob-gen-7', question: 'Con tung một viên xúc xắc 7 mặt, nó sẽ ra số 100?', visual: '🎲', correctAnswer: 'impossible', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Không có số 100 trên xúc xắc này.' },
        { id: 'prob-gen-8', question: 'Tung một đồng xu bình thường, nó sẽ ra mặt sấp?', visual: '🎲', correctAnswer: 'equal', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Xác suất là 50/50.' },
        { id: 'prob-gen-9', question: 'Trong túi có 29 kẹo dâu và 2 kẹo chanh. Lấy 1 cái, nó sẽ là kẹo dâu?', visual: '🎲', correctAnswer: 'likely', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Có rất nhiều kẹo dâu nên xác suất cao.' },
        { id: 'prob-gen-10', question: 'Trong hộp có 20 bi xanh và 1 bi đỏ. Lấy 1 viên, nó sẽ là bi đỏ?', visual: '🎲', correctAnswer: 'unlikely', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Tỉ lệ lấy được bi đỏ rất nhỏ.' },
        { id: 'prob-gen-11', question: 'Ngày mai sau thứ Ba sẽ là thứ Tư?', visual: '🎲', correctAnswer: 'certain', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Thứ tự các ngày trong tuần là cố định.' },
        { id: 'prob-gen-12', question: 'Con tung một viên xúc xắc 6 mặt, nó sẽ ra số 100?', visual: '🎲', correctAnswer: 'impossible', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Không có số 100 trên xúc xắc này.' },
        { id: 'prob-gen-13', question: 'Tung một đồng xu bình thường, nó sẽ ra mặt sấp?', visual: '🎲', correctAnswer: 'equal', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Xác suất là 50/50.' },
        { id: 'prob-gen-14', question: 'Trong túi có 34 kẹo dâu và 2 kẹo chanh. Lấy 1 cái, nó sẽ là kẹo dâu?', visual: '🎲', correctAnswer: 'likely', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Có rất nhiều kẹo dâu nên xác suất cao.' },
        { id: 'prob-gen-15', question: 'Trong hộp có 25 bi xanh và 1 bi đỏ. Lấy 1 viên, nó sẽ là bi đỏ?', visual: '🎲', correctAnswer: 'unlikely', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Tỉ lệ lấy được bi đỏ rất nhỏ.' },
        { id: 'prob-gen-16', question: 'Ngày mai sau thứ Ba sẽ là thứ Tư?', visual: '🎲', correctAnswer: 'certain', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Thứ tự các ngày trong tuần là cố định.' },
        { id: 'prob-gen-17', question: 'Con tung một viên xúc xắc 8 mặt, nó sẽ ra số 100?', visual: '🎲', correctAnswer: 'impossible', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Không có số 100 trên xúc xắc này.' },
        { id: 'prob-gen-18', question: 'Tung một đồng xu bình thường, nó sẽ ra mặt sấp?', visual: '🎲', correctAnswer: 'equal', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Xác suất là 50/50.' },
        { id: 'prob-gen-19', question: 'Trong túi có 39 kẹo dâu và 2 kẹo chanh. Lấy 1 cái, nó sẽ là kẹo dâu?', visual: '🎲', correctAnswer: 'likely', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Có rất nhiều kẹo dâu nên xác suất cao.' },
        { id: 'prob-gen-20', question: 'Trong hộp có 30 bi xanh và 1 bi đỏ. Lấy 1 viên, nó sẽ là bi đỏ?', visual: '🎲', correctAnswer: 'unlikely', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Tỉ lệ lấy được bi đỏ rất nhỏ.' },
        { id: 'prob-gen-21', question: 'Ngày mai sau thứ Ba sẽ là thứ Tư?', visual: '🎲', correctAnswer: 'certain', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Thứ tự các ngày trong tuần là cố định.' },
        { id: 'prob-gen-22', question: 'Con tung một viên xúc xắc 7 mặt, nó sẽ ra số 100?', visual: '🎲', correctAnswer: 'impossible', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Không có số 100 trên xúc xắc này.' },
        { id: 'prob-gen-23', question: 'Tung một đồng xu bình thường, nó sẽ ra mặt sấp?', visual: '🎲', correctAnswer: 'equal', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Xác suất là 50/50.' },
        { id: 'prob-gen-24', question: 'Trong túi có 44 kẹo dâu và 2 kẹo chanh. Lấy 1 cái, nó sẽ là kẹo dâu?', visual: '🎲', correctAnswer: 'likely', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Có rất nhiều kẹo dâu nên xác suất cao.' },
        { id: 'prob-gen-25', question: 'Trong hộp có 35 bi xanh và 1 bi đỏ. Lấy 1 viên, nó sẽ là bi đỏ?', visual: '🎲', correctAnswer: 'unlikely', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Tỉ lệ lấy được bi đỏ rất nhỏ.' },
        { id: 'prob-gen-26', question: 'Ngày mai sau thứ Ba sẽ là thứ Tư?', visual: '🎲', correctAnswer: 'certain', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Thứ tự các ngày trong tuần là cố định.' },
        { id: 'prob-gen-27', question: 'Con tung một viên xúc xắc 6 mặt, nó sẽ ra số 100?', visual: '🎲', correctAnswer: 'impossible', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Không có số 100 trên xúc xắc này.' },
        { id: 'prob-gen-28', question: 'Tung một đồng xu bình thường, nó sẽ ra mặt sấp?', visual: '🎲', correctAnswer: 'equal', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Xác suất là 50/50.' },
        { id: 'prob-gen-29', question: 'Trong túi có 49 kẹo dâu và 2 kẹo chanh. Lấy 1 cái, nó sẽ là kẹo dâu?', visual: '🎲', correctAnswer: 'likely', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Có rất nhiều kẹo dâu nên xác suất cao.' },

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
    { id: 'wvn-gen-0', name: 'Nước sạch để uống ', visual: '📦', correctCategory: 'need', explanation: 'Nước là thiết yếu cho sự sống.' },
    { id: 'wvn-gen-1', name: 'Đồng hồ thông minh mới ', visual: '📦', correctCategory: 'want', explanation: 'Nó tiện lợi nhưng không bắt buộc phải có.' },
    { id: 'wvn-gen-2', name: 'Thuốc khi bị ốm ', visual: '📦', correctCategory: 'need', explanation: 'Sức khỏe là ưu tiên hàng đầu.' },
    { id: 'wvn-gen-3', name: 'Chuyến đi chơi công viên giải trí ', visual: '📦', correctCategory: 'want', explanation: 'Rất vui nhưng là mong muốn giải trí, không phải nhu cầu thiết yếu.' },
    { id: 'wvn-gen-4', name: 'Bữa sáng đầy đủ dinh dưỡng ', visual: '📦', correctCategory: 'need', explanation: 'Cơ thể cần năng lượng để hoạt động.' },
    { id: 'wvn-gen-5', name: 'Mô hình siêu nhân phiên bản giới hạn ', visual: '📦', correctCategory: 'want', explanation: 'Chỉ là sở thích cá nhân sưu tầm.' },
    { id: 'wvn-gen-6', name: 'Nước sạch để uống (6)', visual: '📦', correctCategory: 'need', explanation: 'Nước là thiết yếu cho sự sống.' },
    { id: 'wvn-gen-7', name: 'Đồng hồ thông minh mới (7)', visual: '📦', correctCategory: 'want', explanation: 'Nó tiện lợi nhưng không bắt buộc phải có.' },
    { id: 'wvn-gen-8', name: 'Thuốc khi bị ốm (8)', visual: '📦', correctCategory: 'need', explanation: 'Sức khỏe là ưu tiên hàng đầu.' },
    { id: 'wvn-gen-9', name: 'Chuyến đi chơi công viên giải trí (9)', visual: '📦', correctCategory: 'want', explanation: 'Rất vui nhưng là mong muốn giải trí, không phải nhu cầu thiết yếu.' },
    { id: 'wvn-gen-10', name: 'Bữa sáng đầy đủ dinh dưỡng (10)', visual: '📦', correctCategory: 'need', explanation: 'Cơ thể cần năng lượng để hoạt động.' },
    { id: 'wvn-gen-11', name: 'Mô hình siêu nhân phiên bản giới hạn (11)', visual: '📦', correctCategory: 'want', explanation: 'Chỉ là sở thích cá nhân sưu tầm.' },
    { id: 'wvn-gen-12', name: 'Nước sạch để uống (12)', visual: '📦', correctCategory: 'need', explanation: 'Nước là thiết yếu cho sự sống.' },
    { id: 'wvn-gen-13', name: 'Đồng hồ thông minh mới (13)', visual: '📦', correctCategory: 'want', explanation: 'Nó tiện lợi nhưng không bắt buộc phải có.' },
    { id: 'wvn-gen-14', name: 'Thuốc khi bị ốm (14)', visual: '📦', correctCategory: 'need', explanation: 'Sức khỏe là ưu tiên hàng đầu.' },
    { id: 'wvn-gen-15', name: 'Chuyến đi chơi công viên giải trí (15)', visual: '📦', correctCategory: 'want', explanation: 'Rất vui nhưng là mong muốn giải trí, không phải nhu cầu thiết yếu.' },
    { id: 'wvn-gen-16', name: 'Bữa sáng đầy đủ dinh dưỡng (16)', visual: '📦', correctCategory: 'need', explanation: 'Cơ thể cần năng lượng để hoạt động.' },
    { id: 'wvn-gen-17', name: 'Mô hình siêu nhân phiên bản giới hạn (17)', visual: '📦', correctCategory: 'want', explanation: 'Chỉ là sở thích cá nhân sưu tầm.' },
    { id: 'wvn-gen-18', name: 'Nước sạch để uống (18)', visual: '📦', correctCategory: 'need', explanation: 'Nước là thiết yếu cho sự sống.' },
    { id: 'wvn-gen-19', name: 'Đồng hồ thông minh mới (19)', visual: '📦', correctCategory: 'want', explanation: 'Nó tiện lợi nhưng không bắt buộc phải có.' },
    { id: 'wvn-gen-20', name: 'Thuốc khi bị ốm (20)', visual: '📦', correctCategory: 'need', explanation: 'Sức khỏe là ưu tiên hàng đầu.' },
    { id: 'wvn-gen-21', name: 'Chuyến đi chơi công viên giải trí (21)', visual: '📦', correctCategory: 'want', explanation: 'Rất vui nhưng là mong muốn giải trí, không phải nhu cầu thiết yếu.' },
    { id: 'wvn-gen-22', name: 'Bữa sáng đầy đủ dinh dưỡng (22)', visual: '📦', correctCategory: 'need', explanation: 'Cơ thể cần năng lượng để hoạt động.' },
    { id: 'wvn-gen-23', name: 'Mô hình siêu nhân phiên bản giới hạn (23)', visual: '📦', correctCategory: 'want', explanation: 'Chỉ là sở thích cá nhân sưu tầm.' },
    { id: 'wvn-gen-24', name: 'Nước sạch để uống (24)', visual: '📦', correctCategory: 'need', explanation: 'Nước là thiết yếu cho sự sống.' },
    { id: 'wvn-gen-25', name: 'Đồng hồ thông minh mới (25)', visual: '📦', correctCategory: 'want', explanation: 'Nó tiện lợi nhưng không bắt buộc phải có.' },
    { id: 'wvn-gen-26', name: 'Thuốc khi bị ốm (26)', visual: '📦', correctCategory: 'need', explanation: 'Sức khỏe là ưu tiên hàng đầu.' },
    { id: 'wvn-gen-27', name: 'Chuyến đi chơi công viên giải trí (27)', visual: '📦', correctCategory: 'want', explanation: 'Rất vui nhưng là mong muốn giải trí, không phải nhu cầu thiết yếu.' },
    { id: 'wvn-gen-28', name: 'Bữa sáng đầy đủ dinh dưỡng (28)', visual: '📦', correctCategory: 'need', explanation: 'Cơ thể cần năng lượng để hoạt động.' },
    { id: 'wvn-gen-29', name: 'Mô hình siêu nhân phiên bản giới hạn (29)', visual: '📦', correctCategory: 'want', explanation: 'Chỉ là sở thích cá nhân sưu tầm.' },

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
    {
        id: 'pol-gen-0',
        situation: 'Thành phố chỉ còn đủ điện cho 50% khu vực. Lãnh đạo nên phân bổ thế nào?',
        visual: '⚡',
        options: [
            { text: 'Ưu tiên bệnh viện và dịch vụ công', consequence: 'Đảm bảo an toàn sinh mạng, nhưng dân cư sẽ khó chịu.', fairnessScore: 90, happinessScore: 60 },
            { text: 'Cắt điện đều mỗi khu vực 2 tiếng', consequence: 'Mọi người chia sẻ khó khăn, nhưng bệnh viện gặp rủi ro.', fairnessScore: 70, happinessScore: 50 },
            { text: 'Chỉ cung cấp cho khu nhà giàu', consequence: 'Xã hội bất bình đẳng, gây ra phản đối gay gắt.', fairnessScore: 10, happinessScore: 20 }
        ]
    },
    {
        id: 'pol-gen-1',
        situation: 'Thành phố chỉ còn đủ điện cho 51% khu vực. Lãnh đạo nên phân bổ thế nào?',
        visual: '⚡',
        options: [
            { text: 'Ưu tiên bệnh viện và dịch vụ công', consequence: 'Đảm bảo an toàn sinh mạng, nhưng dân cư sẽ khó chịu.', fairnessScore: 90, happinessScore: 60 },
            { text: 'Cắt điện đều mỗi khu vực 2 tiếng', consequence: 'Mọi người chia sẻ khó khăn, nhưng bệnh viện gặp rủi ro.', fairnessScore: 70, happinessScore: 50 },
            { text: 'Chỉ cung cấp cho khu nhà giàu', consequence: 'Xã hội bất bình đẳng, gây ra phản đối gay gắt.', fairnessScore: 10, happinessScore: 20 }
        ]
    },
    {
        id: 'pol-gen-2',
        situation: 'Thành phố chỉ còn đủ điện cho 52% khu vực. Lãnh đạo nên phân bổ thế nào?',
        visual: '⚡',
        options: [
            { text: 'Ưu tiên bệnh viện và dịch vụ công', consequence: 'Đảm bảo an toàn sinh mạng, nhưng dân cư sẽ khó chịu.', fairnessScore: 90, happinessScore: 60 },
            { text: 'Cắt điện đều mỗi khu vực 2 tiếng', consequence: 'Mọi người chia sẻ khó khăn, nhưng bệnh viện gặp rủi ro.', fairnessScore: 70, happinessScore: 50 },
            { text: 'Chỉ cung cấp cho khu nhà giàu', consequence: 'Xã hội bất bình đẳng, gây ra phản đối gay gắt.', fairnessScore: 10, happinessScore: 20 }
        ]
    },
    {
        id: 'pol-gen-3',
        situation: 'Thành phố chỉ còn đủ điện cho 53% khu vực. Lãnh đạo nên phân bổ thế nào?',
        visual: '⚡',
        options: [
            { text: 'Ưu tiên bệnh viện và dịch vụ công', consequence: 'Đảm bảo an toàn sinh mạng, nhưng dân cư sẽ khó chịu.', fairnessScore: 90, happinessScore: 60 },
            { text: 'Cắt điện đều mỗi khu vực 2 tiếng', consequence: 'Mọi người chia sẻ khó khăn, nhưng bệnh viện gặp rủi ro.', fairnessScore: 70, happinessScore: 50 },
            { text: 'Chỉ cung cấp cho khu nhà giàu', consequence: 'Xã hội bất bình đẳng, gây ra phản đối gay gắt.', fairnessScore: 10, happinessScore: 20 }
        ]
    },
    {
        id: 'pol-gen-4',
        situation: 'Thành phố chỉ còn đủ điện cho 54% khu vực. Lãnh đạo nên phân bổ thế nào?',
        visual: '⚡',
        options: [
            { text: 'Ưu tiên bệnh viện và dịch vụ công', consequence: 'Đảm bảo an toàn sinh mạng, nhưng dân cư sẽ khó chịu.', fairnessScore: 90, happinessScore: 60 },
            { text: 'Cắt điện đều mỗi khu vực 2 tiếng', consequence: 'Mọi người chia sẻ khó khăn, nhưng bệnh viện gặp rủi ro.', fairnessScore: 70, happinessScore: 50 },
            { text: 'Chỉ cung cấp cho khu nhà giàu', consequence: 'Xã hội bất bình đẳng, gây ra phản đối gay gắt.', fairnessScore: 10, happinessScore: 20 }
        ]
    },
    {
        id: 'pol-gen-5',
        situation: 'Thành phố chỉ còn đủ điện cho 55% khu vực. Lãnh đạo nên phân bổ thế nào?',
        visual: '⚡',
        options: [
            { text: 'Ưu tiên bệnh viện và dịch vụ công', consequence: 'Đảm bảo an toàn sinh mạng, nhưng dân cư sẽ khó chịu.', fairnessScore: 90, happinessScore: 60 },
            { text: 'Cắt điện đều mỗi khu vực 2 tiếng', consequence: 'Mọi người chia sẻ khó khăn, nhưng bệnh viện gặp rủi ro.', fairnessScore: 70, happinessScore: 50 },
            { text: 'Chỉ cung cấp cho khu nhà giàu', consequence: 'Xã hội bất bình đẳng, gây ra phản đối gay gắt.', fairnessScore: 10, happinessScore: 20 }
        ]
    },
    {
        id: 'pol-gen-6',
        situation: 'Thành phố chỉ còn đủ điện cho 56% khu vực. Lãnh đạo nên phân bổ thế nào?',
        visual: '⚡',
        options: [
            { text: 'Ưu tiên bệnh viện và dịch vụ công', consequence: 'Đảm bảo an toàn sinh mạng, nhưng dân cư sẽ khó chịu.', fairnessScore: 90, happinessScore: 60 },
            { text: 'Cắt điện đều mỗi khu vực 2 tiếng', consequence: 'Mọi người chia sẻ khó khăn, nhưng bệnh viện gặp rủi ro.', fairnessScore: 70, happinessScore: 50 },
            { text: 'Chỉ cung cấp cho khu nhà giàu', consequence: 'Xã hội bất bình đẳng, gây ra phản đối gay gắt.', fairnessScore: 10, happinessScore: 20 }
        ]
    },
    {
        id: 'pol-gen-7',
        situation: 'Thành phố chỉ còn đủ điện cho 57% khu vực. Lãnh đạo nên phân bổ thế nào?',
        visual: '⚡',
        options: [
            { text: 'Ưu tiên bệnh viện và dịch vụ công', consequence: 'Đảm bảo an toàn sinh mạng, nhưng dân cư sẽ khó chịu.', fairnessScore: 90, happinessScore: 60 },
            { text: 'Cắt điện đều mỗi khu vực 2 tiếng', consequence: 'Mọi người chia sẻ khó khăn, nhưng bệnh viện gặp rủi ro.', fairnessScore: 70, happinessScore: 50 },
            { text: 'Chỉ cung cấp cho khu nhà giàu', consequence: 'Xã hội bất bình đẳng, gây ra phản đối gay gắt.', fairnessScore: 10, happinessScore: 20 }
        ]
    },
    {
        id: 'pol-gen-8',
        situation: 'Thành phố chỉ còn đủ điện cho 58% khu vực. Lãnh đạo nên phân bổ thế nào?',
        visual: '⚡',
        options: [
            { text: 'Ưu tiên bệnh viện và dịch vụ công', consequence: 'Đảm bảo an toàn sinh mạng, nhưng dân cư sẽ khó chịu.', fairnessScore: 90, happinessScore: 60 },
            { text: 'Cắt điện đều mỗi khu vực 2 tiếng', consequence: 'Mọi người chia sẻ khó khăn, nhưng bệnh viện gặp rủi ro.', fairnessScore: 70, happinessScore: 50 },
            { text: 'Chỉ cung cấp cho khu nhà giàu', consequence: 'Xã hội bất bình đẳng, gây ra phản đối gay gắt.', fairnessScore: 10, happinessScore: 20 }
        ]
    },
    {
        id: 'pol-gen-9',
        situation: 'Thành phố chỉ còn đủ điện cho 59% khu vực. Lãnh đạo nên phân bổ thế nào?',
        visual: '⚡',
        options: [
            { text: 'Ưu tiên bệnh viện và dịch vụ công', consequence: 'Đảm bảo an toàn sinh mạng, nhưng dân cư sẽ khó chịu.', fairnessScore: 90, happinessScore: 60 },
            { text: 'Cắt điện đều mỗi khu vực 2 tiếng', consequence: 'Mọi người chia sẻ khó khăn, nhưng bệnh viện gặp rủi ro.', fairnessScore: 70, happinessScore: 50 },
            { text: 'Chỉ cung cấp cho khu nhà giàu', consequence: 'Xã hội bất bình đẳng, gây ra phản đối gay gắt.', fairnessScore: 10, happinessScore: 20 }
        ]
    },
    {
        id: 'pol-gen-10',
        situation: 'Thành phố chỉ còn đủ điện cho 60% khu vực. Lãnh đạo nên phân bổ thế nào?',
        visual: '⚡',
        options: [
            { text: 'Ưu tiên bệnh viện và dịch vụ công', consequence: 'Đảm bảo an toàn sinh mạng, nhưng dân cư sẽ khó chịu.', fairnessScore: 90, happinessScore: 60 },
            { text: 'Cắt điện đều mỗi khu vực 2 tiếng', consequence: 'Mọi người chia sẻ khó khăn, nhưng bệnh viện gặp rủi ro.', fairnessScore: 70, happinessScore: 50 },
            { text: 'Chỉ cung cấp cho khu nhà giàu', consequence: 'Xã hội bất bình đẳng, gây ra phản đối gay gắt.', fairnessScore: 10, happinessScore: 20 }
        ]
    },
    {
        id: 'pol-gen-11',
        situation: 'Thành phố chỉ còn đủ điện cho 61% khu vực. Lãnh đạo nên phân bổ thế nào?',
        visual: '⚡',
        options: [
            { text: 'Ưu tiên bệnh viện và dịch vụ công', consequence: 'Đảm bảo an toàn sinh mạng, nhưng dân cư sẽ khó chịu.', fairnessScore: 90, happinessScore: 60 },
            { text: 'Cắt điện đều mỗi khu vực 2 tiếng', consequence: 'Mọi người chia sẻ khó khăn, nhưng bệnh viện gặp rủi ro.', fairnessScore: 70, happinessScore: 50 },
            { text: 'Chỉ cung cấp cho khu nhà giàu', consequence: 'Xã hội bất bình đẳng, gây ra phản đối gay gắt.', fairnessScore: 10, happinessScore: 20 }
        ]
    },
    {
        id: 'pol-gen-12',
        situation: 'Thành phố chỉ còn đủ điện cho 62% khu vực. Lãnh đạo nên phân bổ thế nào?',
        visual: '⚡',
        options: [
            { text: 'Ưu tiên bệnh viện và dịch vụ công', consequence: 'Đảm bảo an toàn sinh mạng, nhưng dân cư sẽ khó chịu.', fairnessScore: 90, happinessScore: 60 },
            { text: 'Cắt điện đều mỗi khu vực 2 tiếng', consequence: 'Mọi người chia sẻ khó khăn, nhưng bệnh viện gặp rủi ro.', fairnessScore: 70, happinessScore: 50 },
            { text: 'Chỉ cung cấp cho khu nhà giàu', consequence: 'Xã hội bất bình đẳng, gây ra phản đối gay gắt.', fairnessScore: 10, happinessScore: 20 }
        ]
    },
    {
        id: 'pol-gen-13',
        situation: 'Thành phố chỉ còn đủ điện cho 63% khu vực. Lãnh đạo nên phân bổ thế nào?',
        visual: '⚡',
        options: [
            { text: 'Ưu tiên bệnh viện và dịch vụ công', consequence: 'Đảm bảo an toàn sinh mạng, nhưng dân cư sẽ khó chịu.', fairnessScore: 90, happinessScore: 60 },
            { text: 'Cắt điện đều mỗi khu vực 2 tiếng', consequence: 'Mọi người chia sẻ khó khăn, nhưng bệnh viện gặp rủi ro.', fairnessScore: 70, happinessScore: 50 },
            { text: 'Chỉ cung cấp cho khu nhà giàu', consequence: 'Xã hội bất bình đẳng, gây ra phản đối gay gắt.', fairnessScore: 10, happinessScore: 20 }
        ]
    },
    {
        id: 'pol-gen-14',
        situation: 'Thành phố chỉ còn đủ điện cho 64% khu vực. Lãnh đạo nên phân bổ thế nào?',
        visual: '⚡',
        options: [
            { text: 'Ưu tiên bệnh viện và dịch vụ công', consequence: 'Đảm bảo an toàn sinh mạng, nhưng dân cư sẽ khó chịu.', fairnessScore: 90, happinessScore: 60 },
            { text: 'Cắt điện đều mỗi khu vực 2 tiếng', consequence: 'Mọi người chia sẻ khó khăn, nhưng bệnh viện gặp rủi ro.', fairnessScore: 70, happinessScore: 50 },
            { text: 'Chỉ cung cấp cho khu nhà giàu', consequence: 'Xã hội bất bình đẳng, gây ra phản đối gay gắt.', fairnessScore: 10, happinessScore: 20 }
        ]
    },
    {
        id: 'pol-gen-15',
        situation: 'Thành phố chỉ còn đủ điện cho 65% khu vực. Lãnh đạo nên phân bổ thế nào?',
        visual: '⚡',
        options: [
            { text: 'Ưu tiên bệnh viện và dịch vụ công', consequence: 'Đảm bảo an toàn sinh mạng, nhưng dân cư sẽ khó chịu.', fairnessScore: 90, happinessScore: 60 },
            { text: 'Cắt điện đều mỗi khu vực 2 tiếng', consequence: 'Mọi người chia sẻ khó khăn, nhưng bệnh viện gặp rủi ro.', fairnessScore: 70, happinessScore: 50 },
            { text: 'Chỉ cung cấp cho khu nhà giàu', consequence: 'Xã hội bất bình đẳng, gây ra phản đối gay gắt.', fairnessScore: 10, happinessScore: 20 }
        ]
    },
    {
        id: 'pol-gen-16',
        situation: 'Thành phố chỉ còn đủ điện cho 66% khu vực. Lãnh đạo nên phân bổ thế nào?',
        visual: '⚡',
        options: [
            { text: 'Ưu tiên bệnh viện và dịch vụ công', consequence: 'Đảm bảo an toàn sinh mạng, nhưng dân cư sẽ khó chịu.', fairnessScore: 90, happinessScore: 60 },
            { text: 'Cắt điện đều mỗi khu vực 2 tiếng', consequence: 'Mọi người chia sẻ khó khăn, nhưng bệnh viện gặp rủi ro.', fairnessScore: 70, happinessScore: 50 },
            { text: 'Chỉ cung cấp cho khu nhà giàu', consequence: 'Xã hội bất bình đẳng, gây ra phản đối gay gắt.', fairnessScore: 10, happinessScore: 20 }
        ]
    },
    {
        id: 'pol-gen-17',
        situation: 'Thành phố chỉ còn đủ điện cho 67% khu vực. Lãnh đạo nên phân bổ thế nào?',
        visual: '⚡',
        options: [
            { text: 'Ưu tiên bệnh viện và dịch vụ công', consequence: 'Đảm bảo an toàn sinh mạng, nhưng dân cư sẽ khó chịu.', fairnessScore: 90, happinessScore: 60 },
            { text: 'Cắt điện đều mỗi khu vực 2 tiếng', consequence: 'Mọi người chia sẻ khó khăn, nhưng bệnh viện gặp rủi ro.', fairnessScore: 70, happinessScore: 50 },
            { text: 'Chỉ cung cấp cho khu nhà giàu', consequence: 'Xã hội bất bình đẳng, gây ra phản đối gay gắt.', fairnessScore: 10, happinessScore: 20 }
        ]
    },
    {
        id: 'pol-gen-18',
        situation: 'Thành phố chỉ còn đủ điện cho 68% khu vực. Lãnh đạo nên phân bổ thế nào?',
        visual: '⚡',
        options: [
            { text: 'Ưu tiên bệnh viện và dịch vụ công', consequence: 'Đảm bảo an toàn sinh mạng, nhưng dân cư sẽ khó chịu.', fairnessScore: 90, happinessScore: 60 },
            { text: 'Cắt điện đều mỗi khu vực 2 tiếng', consequence: 'Mọi người chia sẻ khó khăn, nhưng bệnh viện gặp rủi ro.', fairnessScore: 70, happinessScore: 50 },
            { text: 'Chỉ cung cấp cho khu nhà giàu', consequence: 'Xã hội bất bình đẳng, gây ra phản đối gay gắt.', fairnessScore: 10, happinessScore: 20 }
        ]
    },
    {
        id: 'pol-gen-19',
        situation: 'Thành phố chỉ còn đủ điện cho 69% khu vực. Lãnh đạo nên phân bổ thế nào?',
        visual: '⚡',
        options: [
            { text: 'Ưu tiên bệnh viện và dịch vụ công', consequence: 'Đảm bảo an toàn sinh mạng, nhưng dân cư sẽ khó chịu.', fairnessScore: 90, happinessScore: 60 },
            { text: 'Cắt điện đều mỗi khu vực 2 tiếng', consequence: 'Mọi người chia sẻ khó khăn, nhưng bệnh viện gặp rủi ro.', fairnessScore: 70, happinessScore: 50 },
            { text: 'Chỉ cung cấp cho khu nhà giàu', consequence: 'Xã hội bất bình đẳng, gây ra phản đối gay gắt.', fairnessScore: 10, happinessScore: 20 }
        ]
    },

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
    {
        id: 'neg-gen-0',
        scenario: 'Bạn AI muốn học toán 30 phút, con muốn chơi game.',
        aiPersonality: 'Nhu cương kết hợp, đề cao sự hợp tác',
        visual: '🤝',
        targetOutcome: 'Học xong sớm rồi chơi',
        winWinCriteria: 'Chia nhỏ thời gian để đạt cả hai mục tiêu',
        sampleRequest: 'Hoặc con chơi, hoặc không gì cả!',
        sampleWinWin: 'Hay chúng ta học Toán 15 phút, sau đó chơi game 15 phút?',
    },
    {
        id: 'neg-gen-1',
        scenario: 'Bạn AI muốn học toán 31 phút, con muốn chơi game.',
        aiPersonality: 'Nhu cương kết hợp, đề cao sự hợp tác',
        visual: '🤝',
        targetOutcome: 'Học xong sớm rồi chơi',
        winWinCriteria: 'Chia nhỏ thời gian để đạt cả hai mục tiêu',
        sampleRequest: 'Hoặc con chơi, hoặc không gì cả!',
        sampleWinWin: 'Hay chúng ta học Toán 15 phút, sau đó chơi game 15 phút?',
    },
    {
        id: 'neg-gen-2',
        scenario: 'Bạn AI muốn học toán 32 phút, con muốn chơi game.',
        aiPersonality: 'Nhu cương kết hợp, đề cao sự hợp tác',
        visual: '🤝',
        targetOutcome: 'Học xong sớm rồi chơi',
        winWinCriteria: 'Chia nhỏ thời gian để đạt cả hai mục tiêu',
        sampleRequest: 'Hoặc con chơi, hoặc không gì cả!',
        sampleWinWin: 'Hay chúng ta học Toán 15 phút, sau đó chơi game 15 phút?',
    },
    {
        id: 'neg-gen-3',
        scenario: 'Bạn AI muốn học toán 33 phút, con muốn chơi game.',
        aiPersonality: 'Nhu cương kết hợp, đề cao sự hợp tác',
        visual: '🤝',
        targetOutcome: 'Học xong sớm rồi chơi',
        winWinCriteria: 'Chia nhỏ thời gian để đạt cả hai mục tiêu',
        sampleRequest: 'Hoặc con chơi, hoặc không gì cả!',
        sampleWinWin: 'Hay chúng ta học Toán 15 phút, sau đó chơi game 15 phút?',
    },
    {
        id: 'neg-gen-4',
        scenario: 'Bạn AI muốn học toán 34 phút, con muốn chơi game.',
        aiPersonality: 'Nhu cương kết hợp, đề cao sự hợp tác',
        visual: '🤝',
        targetOutcome: 'Học xong sớm rồi chơi',
        winWinCriteria: 'Chia nhỏ thời gian để đạt cả hai mục tiêu',
        sampleRequest: 'Hoặc con chơi, hoặc không gì cả!',
        sampleWinWin: 'Hay chúng ta học Toán 15 phút, sau đó chơi game 15 phút?',
    },
    {
        id: 'neg-gen-5',
        scenario: 'Bạn AI muốn học toán 35 phút, con muốn chơi game.',
        aiPersonality: 'Nhu cương kết hợp, đề cao sự hợp tác',
        visual: '🤝',
        targetOutcome: 'Học xong sớm rồi chơi',
        winWinCriteria: 'Chia nhỏ thời gian để đạt cả hai mục tiêu',
        sampleRequest: 'Hoặc con chơi, hoặc không gì cả!',
        sampleWinWin: 'Hay chúng ta học Toán 15 phút, sau đó chơi game 15 phút?',
    },
    {
        id: 'neg-gen-6',
        scenario: 'Bạn AI muốn học toán 36 phút, con muốn chơi game.',
        aiPersonality: 'Nhu cương kết hợp, đề cao sự hợp tác',
        visual: '🤝',
        targetOutcome: 'Học xong sớm rồi chơi',
        winWinCriteria: 'Chia nhỏ thời gian để đạt cả hai mục tiêu',
        sampleRequest: 'Hoặc con chơi, hoặc không gì cả!',
        sampleWinWin: 'Hay chúng ta học Toán 15 phút, sau đó chơi game 15 phút?',
    },
    {
        id: 'neg-gen-7',
        scenario: 'Bạn AI muốn học toán 37 phút, con muốn chơi game.',
        aiPersonality: 'Nhu cương kết hợp, đề cao sự hợp tác',
        visual: '🤝',
        targetOutcome: 'Học xong sớm rồi chơi',
        winWinCriteria: 'Chia nhỏ thời gian để đạt cả hai mục tiêu',
        sampleRequest: 'Hoặc con chơi, hoặc không gì cả!',
        sampleWinWin: 'Hay chúng ta học Toán 15 phút, sau đó chơi game 15 phút?',
    },
    {
        id: 'neg-gen-8',
        scenario: 'Bạn AI muốn học toán 38 phút, con muốn chơi game.',
        aiPersonality: 'Nhu cương kết hợp, đề cao sự hợp tác',
        visual: '🤝',
        targetOutcome: 'Học xong sớm rồi chơi',
        winWinCriteria: 'Chia nhỏ thời gian để đạt cả hai mục tiêu',
        sampleRequest: 'Hoặc con chơi, hoặc không gì cả!',
        sampleWinWin: 'Hay chúng ta học Toán 15 phút, sau đó chơi game 15 phút?',
    },
    {
        id: 'neg-gen-9',
        scenario: 'Bạn AI muốn học toán 39 phút, con muốn chơi game.',
        aiPersonality: 'Nhu cương kết hợp, đề cao sự hợp tác',
        visual: '🤝',
        targetOutcome: 'Học xong sớm rồi chơi',
        winWinCriteria: 'Chia nhỏ thời gian để đạt cả hai mục tiêu',
        sampleRequest: 'Hoặc con chơi, hoặc không gì cả!',
        sampleWinWin: 'Hay chúng ta học Toán 15 phút, sau đó chơi game 15 phút?',
    },
    {
        id: 'neg-gen-10',
        scenario: 'Bạn AI muốn học toán 40 phút, con muốn chơi game.',
        aiPersonality: 'Nhu cương kết hợp, đề cao sự hợp tác',
        visual: '🤝',
        targetOutcome: 'Học xong sớm rồi chơi',
        winWinCriteria: 'Chia nhỏ thời gian để đạt cả hai mục tiêu',
        sampleRequest: 'Hoặc con chơi, hoặc không gì cả!',
        sampleWinWin: 'Hay chúng ta học Toán 15 phút, sau đó chơi game 15 phút?',
    },
    {
        id: 'neg-gen-11',
        scenario: 'Bạn AI muốn học toán 41 phút, con muốn chơi game.',
        aiPersonality: 'Nhu cương kết hợp, đề cao sự hợp tác',
        visual: '🤝',
        targetOutcome: 'Học xong sớm rồi chơi',
        winWinCriteria: 'Chia nhỏ thời gian để đạt cả hai mục tiêu',
        sampleRequest: 'Hoặc con chơi, hoặc không gì cả!',
        sampleWinWin: 'Hay chúng ta học Toán 15 phút, sau đó chơi game 15 phút?',
    },
    {
        id: 'neg-gen-12',
        scenario: 'Bạn AI muốn học toán 42 phút, con muốn chơi game.',
        aiPersonality: 'Nhu cương kết hợp, đề cao sự hợp tác',
        visual: '🤝',
        targetOutcome: 'Học xong sớm rồi chơi',
        winWinCriteria: 'Chia nhỏ thời gian để đạt cả hai mục tiêu',
        sampleRequest: 'Hoặc con chơi, hoặc không gì cả!',
        sampleWinWin: 'Hay chúng ta học Toán 15 phút, sau đó chơi game 15 phút?',
    },
    {
        id: 'neg-gen-13',
        scenario: 'Bạn AI muốn học toán 43 phút, con muốn chơi game.',
        aiPersonality: 'Nhu cương kết hợp, đề cao sự hợp tác',
        visual: '🤝',
        targetOutcome: 'Học xong sớm rồi chơi',
        winWinCriteria: 'Chia nhỏ thời gian để đạt cả hai mục tiêu',
        sampleRequest: 'Hoặc con chơi, hoặc không gì cả!',
        sampleWinWin: 'Hay chúng ta học Toán 15 phút, sau đó chơi game 15 phút?',
    },
    {
        id: 'neg-gen-14',
        scenario: 'Bạn AI muốn học toán 44 phút, con muốn chơi game.',
        aiPersonality: 'Nhu cương kết hợp, đề cao sự hợp tác',
        visual: '🤝',
        targetOutcome: 'Học xong sớm rồi chơi',
        winWinCriteria: 'Chia nhỏ thời gian để đạt cả hai mục tiêu',
        sampleRequest: 'Hoặc con chơi, hoặc không gì cả!',
        sampleWinWin: 'Hay chúng ta học Toán 15 phút, sau đó chơi game 15 phút?',
    },

];

export interface CircleOfControlItem {
    id: string;
    situation: string;
    visual: string;
    correctCategory: 'controllable' | 'uncontrollable';
    explanation: string;
}

export const CIRCLE_OF_CONTROL: CircleOfControlItem[] = [
    { id: 'coc-gen-0', situation: 'Thái độ của con khi thua cuộc ', visual: '🎯', correctCategory: 'controllable', explanation: 'Cảm xúc và cách nhìn nhận là do con quyết định.' },
    { id: 'coc-gen-1', situation: 'Bạn bè gian lận trong trò chơi ', visual: '🎯', correctCategory: 'uncontrollable', explanation: 'Con không thể kiểm soát hành động của người khác, chỉ có thể chọn không chơi chung.' },
    { id: 'coc-gen-2', situation: 'Thời gian con dành để đọc sách ', visual: '🎯', correctCategory: 'controllable', explanation: 'Lịch trình cá nhân là thứ con hoàn toàn làm chủ.' },
    { id: 'coc-gen-3', situation: 'Bài thi Toán quá khó ', visual: '🎯', correctCategory: 'uncontrollable', explanation: 'Độ khó do giáo viên quyết định, con chỉ kiểm soát sự nỗ lực của mình.' },
    { id: 'coc-gen-4', situation: 'Thái độ của con khi thua cuộc (4)', visual: '🎯', correctCategory: 'controllable', explanation: 'Cảm xúc và cách nhìn nhận là do con quyết định.' },
    { id: 'coc-gen-5', situation: 'Bạn bè gian lận trong trò chơi (5)', visual: '🎯', correctCategory: 'uncontrollable', explanation: 'Con không thể kiểm soát hành động của người khác, chỉ có thể chọn không chơi chung.' },
    { id: 'coc-gen-6', situation: 'Thời gian con dành để đọc sách (6)', visual: '🎯', correctCategory: 'controllable', explanation: 'Lịch trình cá nhân là thứ con hoàn toàn làm chủ.' },
    { id: 'coc-gen-7', situation: 'Bài thi Toán quá khó (7)', visual: '🎯', correctCategory: 'uncontrollable', explanation: 'Độ khó do giáo viên quyết định, con chỉ kiểm soát sự nỗ lực của mình.' },
    { id: 'coc-gen-8', situation: 'Thái độ của con khi thua cuộc (8)', visual: '🎯', correctCategory: 'controllable', explanation: 'Cảm xúc và cách nhìn nhận là do con quyết định.' },
    { id: 'coc-gen-9', situation: 'Bạn bè gian lận trong trò chơi (9)', visual: '🎯', correctCategory: 'uncontrollable', explanation: 'Con không thể kiểm soát hành động của người khác, chỉ có thể chọn không chơi chung.' },
    { id: 'coc-gen-10', situation: 'Thời gian con dành để đọc sách (10)', visual: '🎯', correctCategory: 'controllable', explanation: 'Lịch trình cá nhân là thứ con hoàn toàn làm chủ.' },
    { id: 'coc-gen-11', situation: 'Bài thi Toán quá khó (11)', visual: '🎯', correctCategory: 'uncontrollable', explanation: 'Độ khó do giáo viên quyết định, con chỉ kiểm soát sự nỗ lực của mình.' },
    { id: 'coc-gen-12', situation: 'Thái độ của con khi thua cuộc (12)', visual: '🎯', correctCategory: 'controllable', explanation: 'Cảm xúc và cách nhìn nhận là do con quyết định.' },
    { id: 'coc-gen-13', situation: 'Bạn bè gian lận trong trò chơi (13)', visual: '🎯', correctCategory: 'uncontrollable', explanation: 'Con không thể kiểm soát hành động của người khác, chỉ có thể chọn không chơi chung.' },
    { id: 'coc-gen-14', situation: 'Thời gian con dành để đọc sách (14)', visual: '🎯', correctCategory: 'controllable', explanation: 'Lịch trình cá nhân là thứ con hoàn toàn làm chủ.' },
    { id: 'coc-gen-15', situation: 'Bài thi Toán quá khó (15)', visual: '🎯', correctCategory: 'uncontrollable', explanation: 'Độ khó do giáo viên quyết định, con chỉ kiểm soát sự nỗ lực của mình.' },
    { id: 'coc-gen-16', situation: 'Thái độ của con khi thua cuộc (16)', visual: '🎯', correctCategory: 'controllable', explanation: 'Cảm xúc và cách nhìn nhận là do con quyết định.' },
    { id: 'coc-gen-17', situation: 'Bạn bè gian lận trong trò chơi (17)', visual: '🎯', correctCategory: 'uncontrollable', explanation: 'Con không thể kiểm soát hành động của người khác, chỉ có thể chọn không chơi chung.' },
    { id: 'coc-gen-18', situation: 'Thời gian con dành để đọc sách (18)', visual: '🎯', correctCategory: 'controllable', explanation: 'Lịch trình cá nhân là thứ con hoàn toàn làm chủ.' },
    { id: 'coc-gen-19', situation: 'Bài thi Toán quá khó (19)', visual: '🎯', correctCategory: 'uncontrollable', explanation: 'Độ khó do giáo viên quyết định, con chỉ kiểm soát sự nỗ lực của mình.' },
    { id: 'coc-gen-20', situation: 'Thái độ của con khi thua cuộc (20)', visual: '🎯', correctCategory: 'controllable', explanation: 'Cảm xúc và cách nhìn nhận là do con quyết định.' },
    { id: 'coc-gen-21', situation: 'Bạn bè gian lận trong trò chơi (21)', visual: '🎯', correctCategory: 'uncontrollable', explanation: 'Con không thể kiểm soát hành động của người khác, chỉ có thể chọn không chơi chung.' },
    { id: 'coc-gen-22', situation: 'Thời gian con dành để đọc sách (22)', visual: '🎯', correctCategory: 'controllable', explanation: 'Lịch trình cá nhân là thứ con hoàn toàn làm chủ.' },
    { id: 'coc-gen-23', situation: 'Bài thi Toán quá khó (23)', visual: '🎯', correctCategory: 'uncontrollable', explanation: 'Độ khó do giáo viên quyết định, con chỉ kiểm soát sự nỗ lực của mình.' },
    { id: 'coc-gen-24', situation: 'Thái độ của con khi thua cuộc (24)', visual: '🎯', correctCategory: 'controllable', explanation: 'Cảm xúc và cách nhìn nhận là do con quyết định.' },
    { id: 'coc-gen-25', situation: 'Bạn bè gian lận trong trò chơi (25)', visual: '🎯', correctCategory: 'uncontrollable', explanation: 'Con không thể kiểm soát hành động của người khác, chỉ có thể chọn không chơi chung.' },
    { id: 'coc-gen-26', situation: 'Thời gian con dành để đọc sách (26)', visual: '🎯', correctCategory: 'controllable', explanation: 'Lịch trình cá nhân là thứ con hoàn toàn làm chủ.' },
    { id: 'coc-gen-27', situation: 'Bài thi Toán quá khó (27)', visual: '🎯', correctCategory: 'uncontrollable', explanation: 'Độ khó do giáo viên quyết định, con chỉ kiểm soát sự nỗ lực của mình.' },
    { id: 'coc-gen-28', situation: 'Thái độ của con khi thua cuộc (28)', visual: '🎯', correctCategory: 'controllable', explanation: 'Cảm xúc và cách nhìn nhận là do con quyết định.' },
    { id: 'coc-gen-29', situation: 'Bạn bè gian lận trong trò chơi (29)', visual: '🎯', correctCategory: 'uncontrollable', explanation: 'Con không thể kiểm soát hành động của người khác, chỉ có thể chọn không chơi chung.' },

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
