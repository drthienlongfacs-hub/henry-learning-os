import fs from 'fs';
import path from 'path';

const outPath = path.join(__dirname, '../src/data/exercises-generated.ts');

function shuffledOptions(correct: string | number, count: number, generateFake: () => string | number): string[] {
    const set = new Set<string>();
    set.add(String(correct));
    while (set.size < count) {
        set.add(String(generateFake()));
    }
    return Array.from(set).sort(() => Math.random() - 0.5);
}

// ---------------------------------------------------------
// 1. MATH GENERATION (3000+ Combinations)
// ---------------------------------------------------------
const generatedMath = [];

// Addition up to 100 (selected ranges suitable for advanced 6yo / grade 1-2)
let idCounter = 1;
for (let a = 1; a <= 50; a++) {
    for (let b = 1; b <= 50; b++) {
        // Skip overly simple ones potentially covered manually or too spammy
        if (a % 5 !== 0 && b % 2 !== 0 && Math.random() > 0.3) continue;

        const sum = a + b;
        generatedMath.push(`{
            id: 'gen-math-add-\${${idCounter++}}',
            type: 'multiple_choice' as const,
            subject: 'Toán',
            difficulty: ${sum > 50 ? 4 : sum > 20 ? 3 : 2},
            question: '${a} + ${b} = ?',
            options: ${JSON.stringify(shuffledOptions(sum, 4, () => sum + Math.floor(Math.random() * 11) - 5))},
            correctAnswer: '${sum}',
            hints: ['Thử đếm thêm từ số lớn hơn nhé!', 'Tính cẩn thận ở hàng chục và hàng đơn vị.'] as string[],
            explanation: '${a} + ${b} = ${sum}.',
            tags: ['addition', 'generated']
        }`);
    }
}

// Subtraction up to 100
for (let a = 10; a <= 100; a++) {
    for (let b = 1; b < a; b++) {
        if (a % 10 !== 0 && b % 3 !== 0 && Math.random() > 0.1) continue;

        const diff = a - b;
        generatedMath.push(`{
            id: 'gen-math-sub-\${${idCounter++}}',
            type: 'multiple_choice' as const,
            subject: 'Toán',
            difficulty: ${a > 50 ? 4 : a > 20 ? 3 : 2},
            question: '${a} - ${b} = ?',
            options: ${JSON.stringify(shuffledOptions(diff, 4, () => diff + Math.floor(Math.random() * 11) - 5))},
            correctAnswer: '${diff}',
            hints: ['Đặt tính rồi tính nhé', 'Lưu ý nếu có mượn qua hàng chục.'] as string[],
            explanation: '${a} - ${b} = ${diff}.',
            tags: ['subtraction', 'generated']
        }`);
    }
}

// ---------------------------------------------------------
// 2. ELITE GENERATION (2000+ Combinations)
// ---------------------------------------------------------
const generatedElite = [];

// Elite Probability / Logistics Target Practice
let eliteCounter = 1;

// Supply transport decisions
const locations = ['Cứ điểm Alpha', 'Vùng đỏ', 'Rừng hắc ám', 'Căn cứ trung tâm'];
for (let distance = 5; distance <= 50; distance += 5) {
    for (let speed = 2; speed <= 10; speed += 2) {
        const time = Math.ceil(distance / speed);
        locations.forEach(loc => {
            generatedElite.push(`{
                id: 'gen-elite-logistics-\${${eliteCounter++}}',
                type: 'multiple_choice' as const,
                subject: 'elite',
                difficulty: ${distance > 30 ? 4 : 3},
                question: '[QUẢN LÝ QUÂN NHU] Xe chở đạn đi từ kho đến ${loc} cách ${distance}km với tốc độ ${speed}km/h. Cần ít nhất bao nhiêu giờ để tới nơi?',
                options: ${JSON.stringify(shuffledOptions(time, 4, () => time + Math.floor(Math.random() * 5) - 2).map(String))},
                correctAnswer: '${time}',
                hints: ['Lấy quãng đường chia cho tốc độ'] as string[],
                explanation: 'Thời gian = Quãng đường / Tốc độ = ${distance} / ${speed} = ${time} giờ.',
                tags: ['finance', 'logistics', 'military', 'generated']
            }`);
        });
    }
}

// Radar Recon Probability
for (let total = 20; total <= 100; total += 10) {
    for (let red = 5; red < total; red += 5) {
        const blue = total - red;
        const moreEnemies = red > blue;
        generatedElite.push(`{
            id: 'gen-elite-recon-\${${eliteCounter++}}',
            type: 'multiple_choice' as const,
            subject: 'elite',
            difficulty: 3,
            question: '[TÌNH BÁO QUÂN SỰ] Rada quét được ${total} tín hiệu. Có ${red} tín hiệu Địch (Đỏ). Vậy có bao nhiêu tín hiệu Đồng minh (Xanh)? Bên nào đông hơn?',
            options: [
                '${blue} Xanh, Địch đông hơn',
                '${blue} Xanh, Đồng minh đông hơn',
                '${blue + 5} Xanh, Địch đông hơn',
                '${blue - 5} Xanh, Đồng minh đông hơn',
            ].sort(() => Math.random() - 0.5),
            correctAnswer: '${blue} Xanh, ${moreEnemies ? 'Địch' : blue === red ? 'Bằng nhau' : 'Đồng minh'} đông hơn',
            hints: ['Lấy tổng trừ đi tín hiệu đỏ'] as string[],
            explanation: 'Tổng ${total} - ${red} đỏ = ${blue} xanh.',
            tags: ['probability', 'radar', 'military', 'generated']
        }`);
    }
}

const fileContent = "/* eslint-disable */\n" +
    "import type { Exercise } from '@/types';\n\n" +
    "export const massiveMathGenerated: Exercise[] = [\n    " +
    generatedMath.join(',\n    ') + "\n];\n\n" +
    "export const massiveEliteGenerated: Exercise[] = [\n    " +
    generatedElite.join(',\n    ') + "\n];\n";

fs.writeFileSync(outPath, fileContent, 'utf-8');
console.log("Successfully generated " + generatedMath.length + " Math exercises and " + generatedElite.length + " Elite exercises to " + outPath);
