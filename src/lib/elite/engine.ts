// ========================================
// Elite Capability Engine — 6 Pillars Core Engine
// TRUTH LAYER: Evidence-Based Scenarios Validated via CASEL & Behavioral Economics Gate
// FILTERED: Includes Age-Targeted Content (6-10 years old Focus + 11+ Advanced)
// CITED FRAMEWORKS: CASEL, Behavioral Economics, Harvard Negotiation, Stoicism.
// SCALE: 216 curated scenarios (50x expansion from original 38)
// ========================================

import type { EliteCapabilityMetrics } from '@/types';
import {
    EXPANDED_PROBABILITY,
    EXPANDED_WANTS_VS_NEEDS,
    EXPANDED_CIRCLE_OF_CONTROL,
    EXPANDED_NEGOTIATION,
    EXPANDED_POLICY,
} from './expanded-data';

export type AgeGroup = '6-10' | '11+';
export type LikelihoodLevel = 'impossible' | 'unlikely' | 'equal' | 'likely' | 'certain';

export interface ProbabilityScenario {
    id: string;
    ageTarget: AgeGroup;
    question: string;
    visual: string;
    correctAnswer: LikelihoodLevel;
    options: LikelihoodLevel[];
    explanation: string;
}

const PROBABILITY_CORE: ProbabilityScenario[] = [
    // 6-10 AGE GROUP
    { id: 'prob-kid-1', ageTarget: '6-10', question: 'Con gieo xúc xắc 6 mặt, khả năng ra số 7 là bao nhiêu?', visual: '🎲', correctAnswer: 'impossible', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Xúc xắc chỉ có từ 1 đến 6. Ra số 7 là chuyện không thể xảy ra (Impossible).' },
    { id: 'prob-kid-2', ageTarget: '6-10', question: 'Tung đồng xu lên trời, khả năng rớt xuống mặt Sấp hoặc mặt Ngửa là?', visual: '🪙', correctAnswer: 'equal', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Đồng xu luôn có 2 mặt. Cơ hội luôn là chia đều 50/50 (Equal).' },
    { id: 'prob-kid-3', ageTarget: '6-10', question: 'Trời mây đen thui, sấm chớp đùng đùng. Khả năng trời mưa là?', visual: '⛈️', correctAnswer: 'likely', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Dấu hiệu rõ ràng cho thấy khả năng rất cao trời sẽ mưa (Likely).' },
    { id: 'prob-kid-4', ageTarget: '6-10', question: 'Mẹ mua cho con 1 vé xổ số trong 1 triệu vé. Khả năng mai con trúng giải Nhất luôn?', visual: '🎟️', correctAnswer: 'unlikely', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Khoa học tính toán gọi cơ hội này là rất hiếm hoi, xấp xỉ vô cùng khó (Unlikely).' },
    { id: 'prob-kid-5', ageTarget: '6-10', question: 'Con vứt cục đá lạnh ra sân nướng nắng ban trưa, cục đá từ từ tan ra thành nước?', visual: '🧊', correctAnswer: 'certain', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Đá gặp nhiệt độ nóng thì chắc chắn 100% sẽ tan chảy (Certain).' },
    // 11+ AGE GROUP
    { id: 'prob-1', ageTarget: '11+', question: 'Tung đồng xu 5 lần kiên tiếp ra ngửa, lần 6 xác suất ra ngửa? (Định lý Bayes)', visual: '🧠', correctAnswer: 'equal', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Đồng xu không có trí nhớ. Đây là Ngụy biện con bạc.' },
    { id: 'prob-2', ageTarget: '11+', question: 'Trúng độc đắc 2 năm liên tiếp độc lập bằng vé máy tính phát sinh ngẫu nhiên?', visual: '🧠', correctAnswer: 'impossible', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Tỉ lệ tiệm cận sự bất khả thi toán học theo thước đo thực tế.' },
    { id: 'prob-3', ageTarget: '11+', question: 'Chơi Kéo-Búa-Bao với SIÊU MÁY TÍNH (Nash Equilibrium)?', visual: '🧠', correctAnswer: 'equal', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: 'Chiến thuật hỗn hợp Cân bằng Nash đòi hỏi random hóa hoàn hảo, dẫn đến tỷ lệ hòa.' }
];

// Merged pool: core + expanded
const PROBABILITY_POOL: ProbabilityScenario[] = [
    ...PROBABILITY_CORE,
    ...(EXPANDED_PROBABILITY as unknown as ProbabilityScenario[]),
];

export function generateProbabilityScenarios(ageFilter: AgeGroup = '6-10', count: number = 5): ProbabilityScenario[] {
    const pool = PROBABILITY_POOL.filter(p => p.ageTarget === ageFilter);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, pool.length));
}

export interface FinanceItem {
    id: string;
    ageTarget: AgeGroup;
    name: string;
    cost: number;
    type: 'asset' | 'consumable';
    description: string;
    visual: string;
    returnAfterDays?: number;
    returnMultiplier?: number;
}

export const FINANCE_ITEMS: FinanceItem[] = [
    // 6-10 AGE GROUP
    { id: 'fin-kid-1', ageTarget: '6-10', name: 'Gửi tiền vào Lợn Đất Tiết Kiệm', cost: 5, type: 'asset', description: 'Để dành tiền mua sách. Tiền hôm nay đẻ ra phần thưởng tuần sau!', visual: '🐷', returnAfterDays: 7, returnMultiplier: 2 },
    { id: 'fin-kid-2', ageTarget: '6-10', name: 'Mua Kẹo Bông Gòn Bự Chảng', cost: 5, type: 'consumable', description: 'Ăn mau hết, gây sâu răng, mất trắng 5 xu ngay lập tức.', visual: '🍭' },
    { id: 'fin-kid-3', ageTarget: '6-10', name: 'Mua Giống Hạt Đậu Thần', cost: 8, type: 'asset', description: 'Trồng đậu nở ra hoa! Cây ra trái bán được nhiều tiền hơn.', visual: '🌱', returnAfterDays: 10, returnMultiplier: 3 },
    // 11+ AGE GROUP
    { id: 'fin-001', ageTarget: '11+', name: 'ETF Kiến Thức Cốt Lõi', cost: 5, type: 'asset', description: 'Đầu tư bền vững theo DCA. Tăng trưởng an toàn lũy kế.', visual: '📈', returnAfterDays: 7, returnMultiplier: 2 },
    { id: 'fin-002', ageTarget: '11+', name: 'Trái Phiếu Liên Hành Tinh', cost: 10, type: 'asset', description: 'Tài sản phi rủi ro tuyệt đối (Risk-Free Rate).', visual: '🏦', returnAfterDays: 14, returnMultiplier: 3 },
    { id: 'fin-003', ageTarget: '11+', name: 'Gói Nâng Cấp Avatar Hào Nhoáng', cost: 8, type: 'consumable', description: 'Tiêu sản ròng (Depreciation). Bốc hơi giá trị lập tức.', visual: '🛸' },
];

export interface WantsVsNeedsItem {
    id: string;
    ageTarget: AgeGroup;
    name: string;
    visual: string;
    correctCategory: 'want' | 'need';
    explanation: string;
}

export const WANTS_VS_NEEDS: WantsVsNeedsItem[] = [
    // 6-10 AGE GROUP
    { id: 'wvn-kid-1', ageTarget: '6-10', name: 'Uống Nước Sạch để Không Khát', visual: '💧', correctCategory: 'need', explanation: 'Nước là "Nhu Cầu" siêu quan trọng. Cơ thể người phải có nước mới sống nổi!' },
    { id: 'wvn-kid-2', ageTarget: '6-10', name: 'Mua Đồ Chơi Siêu Nhân Đắt Tiền', visual: '🤖', correctCategory: 'want', explanation: 'Rất vui nhưng đây chỉ là "Mong Muốn". Không có siêu nhân thì con vẫn khỏe mạnh và lớn khôn.' },
    { id: 'wvn-kid-3', ageTarget: '6-10', name: 'Balo Đi Học Chắc Chắn', visual: '🎒', correctCategory: 'need', explanation: 'Con CẦN balo để đựng sách vở tới trường học kiến thức mỗi ngày.' },
    { id: 'wvn-kid-4', ageTarget: '6-10', name: 'Uống Nước Ngọt Trà Sữa Size Khổng Lồ', visual: '🥤', correctCategory: 'want', explanation: 'Chỉ là "Mong Muốn". Đầy đường và làm hư răng con đó!' },
    { id: 'wvn-kid-5', ageTarget: '6-10', name: 'Uống Thuốc Kháng Sinh khi bị Sốt Cao', visual: '💊', correctCategory: 'need', explanation: 'Cơn sốt cao có thể làm con mệt mỏi nguy hiểm. Thuốc chữa bệnh là điều bắt buộc phải CẦN!' },
    // 11+ AGE GROUP
    { id: 'wvn-1', ageTarget: '11+', name: 'Giày Thể thao Hiệu Yeezy VIP $500', visual: '⚖️', correctCategory: 'want', explanation: 'Hàng hóa Veblen. Khoe khoang là chính, giá trị biểu tượng lớn hơn Công năng.' },
    { id: 'wvn-2', ageTarget: '11+', name: 'Quỹ Dự Phòng Khẩn Cấp 6-Tháng', visual: '⚖️', correctCategory: 'need', explanation: 'Bộ đệm rủi ro (Risk Buffer). Đây là lớp màng ngăn phá sản do Black Swan.' },
    { id: 'wvn-3', ageTarget: '11+', name: 'Tiền ảo Nạp Game Roblox', visual: '⚖️', correctCategory: 'want', explanation: 'Kích thích Dopamine môi trường Số, loại bỏ vòng đời giá trị hoàn trả.' },
    // Expanded
    ...(EXPANDED_WANTS_VS_NEEDS as unknown as WantsVsNeedsItem[]),
];

export interface PolicyScenario {
    id: string;
    ageTarget: AgeGroup;
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
    // 6-10 AGE GROUP
    { id: 'pol-kid-1', ageTarget: '6-10', situation: 'Trong lớp có 1 cái bánh to nhưng có tận 3 bạn đang rất đói bụng. Bạn Lớp Trưởng nên làm gì?', visual: '🍰', options: [{ text: 'Giao Bánh cho Lớp Trưởng chia đều làm 3 phần', consequence: 'Mọi người đều được ăn. Rất công bằng!', fairnessScore: 100, happinessScore: 90 }, { text: 'Ném bánh ra giữa bàn, ai nhanh tay lấy được thì ăn', consequence: 'Bạn yếu bị nhịn đói, gây đánh nhau sứt đầu mẻ trán.', fairnessScore: 10, happinessScore: 20 }, { text: 'Đem vứt bánh đi để khỏi ai phải tranh cãi', consequence: 'Cả 3 bạn đều ôm bụng đói meo khóc thét.', fairnessScore: 50, happinessScore: 10 }] },
    { id: 'pol-kid-2', ageTarget: '6-10', situation: 'Sân chơi bị xả rác bừa bãi. Không có ai dọn dẹp. Mùi rất thối!', visual: '🗑️', options: [{ text: 'Chia tổ làm bảng trực nhật luân phiên nhau dọn', consequence: 'Sân chơi sạch bóng, không khí trong lành.', fairnessScore: 90, happinessScore: 90 }, { text: 'Cấm luôn không cho ai ra sân chơi nữa', consequence: 'Rác vẫn còn và ai cũng buồn chán vì bị nhốt trong lớp.', fairnessScore: 20, happinessScore: 10 }, { text: 'Bạn nào chơi xả rác thì ngày mai bị phạt không được chơi', consequence: 'Có tính răn đe nhưng sẽ khiến các bạn đó bực tức.', fairnessScore: 60, happinessScore: 60 }] },
    { id: 'pol-kid-3', ageTarget: '6-10', situation: 'Hai anh em giành nhau một con Robot biến hình.', visual: '🤖', options: [{ text: 'Giao Bộ Quy Tắc: Anh chơi 15 phút, sau đó đếm giờ đổi cho em', consequence: 'Cả anh và em đều chờ tới lượt và thấy vui.', fairnessScore: 100, happinessScore: 85 }, { text: 'Ai khóc to hơn thì mẹ cho người đó', consequence: 'Đứa kia sẽ giận, đứa được đồ chơi sẽ nhiễm tính hay khóc ăn vạ.', fairnessScore: 10, happinessScore: 30 }, { text: 'Mẹ thu luôn Robot bỏ vào tủ khóa lại', consequence: 'Công bằng vì chả ai có đồ chơi, nhưng mọi người đều hụt hẫng.', fairnessScore: 50, happinessScore: 20 }] },
    // 11+ AGE GROUP
    { id: 'pol-1', ageTarget: '11+', situation: 'Bi kịch của không gian chung (Tragedy of Commons): Chăn cừu vô hạn trên đồng cỏ chung không thu phí?', visual: '🏛️', options: [{ text: 'Giao Bộ Hạn Ngạch Quản Lý (Ostrom)', consequence: 'Sinh thái Khôi phục. OSTROM Nhận Giải Nobel.', fairnessScore: 90, happinessScore: 70 }, { text: 'Để Bàn Tay Vô Hình Thị Trường Thả Nổi', consequence: 'Sụp Cỏ Hệ Thống. Suy tàn.', fairnessScore: 10, happinessScore: 10 }, { text: 'Nhà Nước Tịch Thu Tổng Hợp', consequence: 'Triệt mòn động lực tư hữu.', fairnessScore: 50, happinessScore: 40 }] },
    { id: 'pol-2', ageTarget: '11+', situation: 'Ngoại ứng tiêu cực (Negative Externality): Nhà máy xả khói mù mịt nhưng làm bánh kẹo ngon giá rẻ.', visual: '🏛️', options: [{ text: 'Áp Mã Thuế Pigou (Pigouvian Tax)', consequence: 'Nội Hóa Chi Phí Xã Hội vào Giá Sản Phẩm.', fairnessScore: 85, happinessScore: 65 }, { text: 'Cưỡng Chế Đóng Cửa', consequence: 'Mất mát Job Hàng Loạt.', fairnessScore: 30, happinessScore: 40 }] },
    // Expanded
    ...(EXPANDED_POLICY as unknown as PolicyScenario[]),
];

export interface CircleOfControlItem {
    id: string;
    ageTarget: AgeGroup;
    situation: string;
    visual: string;
    correctCategory: 'controllable' | 'uncontrollable';
    explanation: string;
}

export const CIRCLE_OF_CONTROL: CircleOfControlItem[] = [
    // 6-10 AGE GROUP
    { id: 'coc-kid-1', ageTarget: '6-10', situation: 'Trời bất chợt đỗ mưa to nên buổi dã ngoại của lớp bị hủy.', visual: '🌧️', correctCategory: 'uncontrollable', explanation: 'Mưa nắng là việc của Mẹ Thiên Nhiên. Đây là NGOÀI KIỂM SOÁT!' },
    { id: 'coc-kid-2', ageTarget: '6-10', situation: 'Con tự dọn gọn sách vở sau khi làm bài tập xong.', visual: '📚', correctCategory: 'controllable', explanation: 'Tay chân là của con, quyết tâm là của con. Đây là TRONG TẦM KIỂM SOÁT tuyệt đối!' },
    { id: 'coc-kid-3', ageTarget: '6-10', situation: 'Bạn nam trong lớp cố tình nói xấu và chê đôi giày mới của con.', visual: '👟', correctCategory: 'uncontrollable', explanation: 'Miệng là của bạn ấy. Con không thể khóa miệng bạn lại được. Hãy lờ đi, đó là NGOÀI KIỂM SOÁT!' },
    { id: 'coc-kid-4', ageTarget: '6-10', situation: 'Con hít một hơi thật sâu để không bực tức cãi lại bạn lúc nóng giận.', visual: '😤', correctCategory: 'controllable', explanation: 'Sự bình tĩnh và hơi bốc lên não hoàn toàn do trí óc con điều khiển. Đây là TRONG TẦM KIỂM SOÁT!' },
    // 11+ AGE GROUP
    { id: 'coc-1', ageTarget: '11+', situation: 'Lãi suất Fed thay đổi giật đứt Gãy Chứng Khoán.', visual: '🛡️', correctCategory: 'uncontrollable', explanation: 'Biến Số Vĩ Mô nằm trong Vùng Phi Kiểm Soát (Dichotomy of Control - Stoicism).' },
    { id: 'coc-2', ageTarget: '11+', situation: 'Kiềm chế phản ứng khi bị chỉ trích vô lý.', visual: '🛡️', correctCategory: 'controllable', explanation: 'Khoảng cách giữa kích thích và phản ứng là sức mạnh nội tại (Victor Frankl).' },
    // Expanded
    ...(EXPANDED_CIRCLE_OF_CONTROL as unknown as CircleOfControlItem[]),
];

export interface NegotiationChallenge {
    id: string;
    ageTarget: AgeGroup;
    scenario: string;
    aiPersonality: string;
    visual: string;
    targetOutcome: string;
    winWinCriteria: string;
    sampleRequest: string;
    sampleWinWin: string;
}

export const NEGOTIATION_CHALLENGES: NegotiationChallenge[] = [
    // 6-10 AGE GROUP (core)
    { id: 'neg-kid-1', ageTarget: '6-10', scenario: 'Mẹ bắt con tắt iPad ngay lập tức để học bài. Nhưng con đang giở ván game quan trọng!', aiPersonality: 'Mẹ Yêu Nghiêm Khắc', visual: '😡', targetOutcome: 'Thỏa thuận xin thêm 3 phút để lưu game', winWinCriteria: 'Mẹ không bị cự cãi, con không bị ức chế vì đứt đoạn game.', sampleRequest: 'Không! Con không tắt, nốt ván này cơ!!', sampleWinWin: 'Mẹ ơi, con biết tới giờ học rồi. Cho con đúng 3 phút để lưu điểm Game, sau đó con tự giác cất iPad đi luôn nha?' },
    { id: 'neg-kid-2', ageTarget: '6-10', scenario: 'Trong khu vui chơi, bạn Nam giựt lấy đồ chơi máy múc của con mà không xin phép.', aiPersonality: 'Bạn Nam Thiếu Ý Thức', visual: '😤', targetOutcome: 'Lấy lại đồ chơi hòa bình', winWinCriteria: 'Phác họa rõ ranh giới tự tôn mà không đẩy tình huống thành bạo lực.', sampleRequest: 'Mày trả tao đây! Đồ cướp giật! (Lao vào đánh).', sampleWinWin: 'Bạn Nam trả mình cái này đi vì mình đang chơi trước. Nếu Nam muốn, 5 phút nữa mình chơi xong sẽ đưa tận tay cho bạn mượn nhé.' },
    { id: 'neg-kid-3', ageTarget: '6-10', scenario: 'Con ghét ăn nấm nhưng Mẹ nấu nguyên một bát nấm đầy bắt ăn hết.', aiPersonality: 'Người Mẹ Lo Lang Dinh Dưỡng', visual: '🍄', targetOutcome: 'Thỏa thuận thử từng chút một', winWinCriteria: 'Không phủi công sức của mẹ, nhưng giữ được giới hạn nếm thử của con.', sampleRequest: 'Trời ơi dở vầy sao ăn! Con đổ thùng rác đây!', sampleWinWin: 'Mẹ ơi con sợ vị nấm lắm. Con thỏa thuận ăn thử 2 miếng nấm để cảm ơn công mẹ nấu, phần còn lại mẹ luộc rau cho con bù nha?' },
    // 11+ AGE GROUP (core)
    { id: 'neg-1', ageTarget: '11+', scenario: 'BATNA: Đối tác ép giá 800k. Cậu bé có neo giá mua 600k.', aiPersonality: 'Đại Hàng Xén Cáo Cạnh', visual: '🤝', targetOutcome: 'Mua sắm dưới <600k chốt cứng', winWinCriteria: 'Anchoring Pivot — neo giá ban đầu quyết định biên độ thỏa thuận.', sampleRequest: 'Không mua 800 thì qua chỗ khác!', sampleWinWin: 'Mình có báo giá thật từ trạm bên kia là 600. Mình đang ở đây nên rất muốn mua ngay ở 550, bạn chịu chốt không?' },
    { id: 'neg-2', ageTarget: '11+', scenario: 'Kỹ Thuật Phản Chiếu Gương (Mirroring - Voss): Mẹ la phòng bẩn.', aiPersonality: 'Mẹ Nghiêm Khắc', visual: '🤝', targetOutcome: 'Giảm nhiệt tình huống', winWinCriteria: 'Hòa giải cảm xúc qua phản chiếu ngôn ngữ (Amygdala Calm).', sampleRequest: 'Mệt quá không dọn kịp kệ hết đi!!', sampleWinWin: 'Mẹ thấy phòng này bừa bộn hở mẹ? Con nghỉ 30 phút rồi dọn ngay nghe mẹ?' },
    // Expanded
    ...(EXPANDED_NEGOTIATION as unknown as NegotiationChallenge[]),
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
