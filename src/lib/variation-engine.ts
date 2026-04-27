// Runtime Variation Engine — ×5 multiplier for effective 50x content
// Generates parametric variations of base scenarios at runtime

import type { AgeGroup, LikelihoodLevel } from './elite/engine';

// Seeded random for reproducible daily variations
function seededRandom(seed: number): () => number {
    let s = seed;
    return () => {
        s = (s * 16807 + 0) % 2147483647;
        return s / 2147483647;
    };
}

// Get today's seed (same variations throughout the day)
function getDailySeed(): number {
    const d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

// Shuffle array with seed
function shuffleArray<T>(arr: T[], seed?: number): T[] {
    const rng = seededRandom(seed ?? getDailySeed());
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Pick N random items without repetition
export function pickRandom<T>(arr: T[], n: number, seed?: number): T[] {
    const shuffled = shuffleArray(arr, seed ?? Date.now());
    return shuffled.slice(0, Math.min(n, arr.length));
}

// ─── Probability Variation Templates ───
interface ProbTemplate {
    pattern: string;
    items: string[];
    containers: string[];
    visuals: string[];
}

const PROB_TEMPLATES: ProbTemplate[] = [
    {
        pattern: 'Trong {container} có {total} vật, {count} cái là {item}. Bốc ra 1 cái, được {item}?',
        items: ['bi đỏ', 'bi xanh', 'bi vàng', 'kẹo dâu', 'kẹo cam', 'quả táo', 'quả cam'],
        containers: ['túi', 'hộp', 'rổ', 'ngăn kéo', 'bao'],
        visuals: ['🔴', '🔵', '🟡', '🍬', '🍊', '🍎', '🍊'],
    },
    {
        pattern: 'Gieo xúc xắc {sides} mặt. Được số {target}?',
        items: ['1', '2', '3', '4', '5', '6'],
        containers: ['4', '6', '8', '10', '12', '20'],
        visuals: ['🎲'],
    },
];

export function generateProbVariation(ageGroup: AgeGroup, count: number): Array<{
    id: string; ageTarget: AgeGroup; question: string; visual: string;
    correctAnswer: LikelihoodLevel; options: LikelihoodLevel[]; explanation: string;
}> {
    const rng = seededRandom(Date.now());
    const results: ReturnType<typeof generateProbVariation> = [];

    for (let i = 0; i < count; i++) {
        const template = PROB_TEMPLATES[Math.floor(rng() * PROB_TEMPLATES.length)];

        if (template.pattern.includes('{container}')) {
            const total = Math.floor(rng() * 8) + 3;
            const targetCount = Math.floor(rng() * Math.min(total, 4)) + 1;
            const item = template.items[Math.floor(rng() * template.items.length)];
            const container = template.containers[Math.floor(rng() * template.containers.length)];
            const ratio = targetCount / total;
            let answer: LikelihoodLevel;
            if (ratio >= 0.8) answer = 'certain';
            else if (ratio > 0.5) answer = 'likely';
            else if (ratio === 0.5) answer = 'equal';
            else answer = 'unlikely';

            results.push({
                id: `var-prob-${i}-${Date.now()}`,
                ageTarget: ageGroup,
                question: template.pattern
                    .replace('{container}', container)
                    .replace('{total}', String(total))
                    .replace('{count}', String(targetCount))
                    .replace(/{item}/g, item),
                visual: template.visuals[Math.floor(rng() * template.visuals.length)],
                correctAnswer: answer,
                options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'] as LikelihoodLevel[],
                explanation: `${targetCount}/${total} = ${(ratio * 100).toFixed(0)}%. ${answer === 'certain' ? 'Gần như chắc chắn!' : answer === 'likely' ? 'Khả năng cao.' : answer === 'equal' ? 'Ngang nhau.' : 'Khá thấp.'}`,
            });
        } else {
            const sides = parseInt(template.containers[Math.floor(rng() * template.containers.length)]);
            const target = Math.floor(rng() * sides) + 1;
            results.push({
                id: `var-dice-${i}-${Date.now()}`,
                ageTarget: ageGroup,
                question: `Gieo xúc xắc ${sides} mặt. Được số ${target}?`,
                visual: '🎲',
                correctAnswer: 'unlikely',
                options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'] as LikelihoodLevel[],
                explanation: `Xác suất = 1/${sides} = ${(100 / sides).toFixed(1)}%. Khá thấp.`,
            });
        }
    }
    return results;
}

// ─── WantsVsNeeds Variation ───
const WVN_NEEDS = [
    'Nước uống sạch', 'Thức ăn dinh dưỡng', 'Quần áo mùa đông', 'Thuốc trị bệnh',
    'Sách giáo khoa', 'Giày đi học', 'Mũ bảo hiểm', 'Kem chống nắng', 'Đèn bàn học',
    'Chăn ấm mùa lạnh', 'Khẩu trang y tế', 'Bàn chải đánh răng', 'Kem đánh răng',
];
const WVN_WANTS = [
    'iPhone mới nhất', 'Đồ chơi Lego Star Wars', 'Kem 3 tầng', 'Búp bê sưu tầm',
    'Game Nintendo Switch', 'Kẹo mút khổng lồ', 'Xe điều khiển từ xa', 'Sticker lấp lánh',
    'Đồng hồ Apple Watch', 'Áo hiệu Supreme', 'Slime đất nặn xịn', 'Pokemon cards',
];
const WVN_VISUALS_NEED = ['💧', '🍚', '🧥', '💊', '📘', '👟', '⛑️', '🧴', '💡', '🛏️', '😷', '🪥', '🪥'];
const WVN_VISUALS_WANT = ['📱', '🧱', '🍦', '👸', '🎮', '🍭', '✈️', '⭐', '⌚', '👕', '🟢', '🃏'];

export function generateWvnVariation(ageGroup: AgeGroup, count: number) {
    const rng = seededRandom(Date.now());
    const results = [];
    for (let i = 0; i < count; i++) {
        const isNeed = rng() > 0.5;
        const pool = isNeed ? WVN_NEEDS : WVN_WANTS;
        const visuals = isNeed ? WVN_VISUALS_NEED : WVN_VISUALS_WANT;
        const idx = Math.floor(rng() * pool.length);
        results.push({
            id: `var-wvn-${i}-${Date.now()}`,
            ageTarget: ageGroup,
            name: pool[idx],
            visual: visuals[idx % visuals.length],
            correctCategory: isNeed ? 'need' as const : 'want' as const,
            explanation: isNeed ? 'Đây là nhu cầu thiết yếu cho cuộc sống.' : 'Đây chỉ là mong muốn, không thiết yếu.',
        });
    }
    return results;
}

// ─── Analytics Summary Generator ───
export interface PillarStats {
    pillar: string;
    total: number;
    correct: number;
    accuracy: number;
    avgTimeSeconds: number;
    mistakes: string[];
}

export function computeEliteAnalytics(attempts: Array<{
    lessonId: string; isCorrect: boolean; timeSpentSeconds: number;
    exerciseId: string; answer: string; createdAt: string;
}>): {
    pillars: PillarStats[];
    totalAttempts: number;
    overallAccuracy: number;
    dailyActivity: Record<string, number>;
    weeklyTrend: number[];
} {
    const pillarMap: Record<string, { total: number; correct: number; totalTime: number; mistakes: string[] }> = {};
    const dailyActivity: Record<string, number> = {};

    for (const a of attempts) {
        if (!a.lessonId.startsWith('elite-')) continue;
        const pillar = a.lessonId.replace('elite-', '');

        if (!pillarMap[pillar]) {
            pillarMap[pillar] = { total: 0, correct: 0, totalTime: 0, mistakes: [] };
        }
        pillarMap[pillar].total++;
        if (a.isCorrect) pillarMap[pillar].correct++;
        pillarMap[pillar].totalTime += a.timeSpentSeconds;
        if (!a.isCorrect) pillarMap[pillar].mistakes.push(a.exerciseId);

        const day = a.createdAt.slice(0, 10);
        dailyActivity[day] = (dailyActivity[day] || 0) + 1;
    }

    const pillars: PillarStats[] = Object.entries(pillarMap).map(([pillar, data]) => ({
        pillar,
        total: data.total,
        correct: data.correct,
        accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
        avgTimeSeconds: data.total > 0 ? Math.round(data.totalTime / data.total) : 0,
        mistakes: data.mistakes,
    }));

    const totalAttempts = attempts.filter(a => a.lessonId.startsWith('elite-')).length;
    const totalCorrect = attempts.filter(a => a.lessonId.startsWith('elite-') && a.isCorrect).length;

    // Weekly trend (last 7 days accuracy)
    const weeklyTrend: number[] = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dayStr = d.toISOString().slice(0, 10);
        const dayAttempts = attempts.filter(a => a.createdAt.startsWith(dayStr) && a.lessonId.startsWith('elite-'));
        const dayCorrect = dayAttempts.filter(a => a.isCorrect).length;
        weeklyTrend.push(dayAttempts.length > 0 ? Math.round((dayCorrect / dayAttempts.length) * 100) : -1);
    }

    return {
        pillars,
        totalAttempts,
        overallAccuracy: totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0,
        dailyActivity,
        weeklyTrend,
    };
}
