// =====================================================
// Art Generator — Nghệ thuật (L1-2)
// Sources: CT 2018 Mĩ thuật & Âm nhạc, CAST UDL
// =====================================================

export interface ArtProblem {
    id: string;
    question: string;
    correctAnswer: string;
    options: string[];
    explanation: string;
    difficulty: number;
    hints: string[];
    type: 'visual' | 'audio';
    gradeLevel: number;
    topic: string;
    topicKey: string;
    illustration?: string;
}

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const genId = () => `art-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// ══════════════════════════════════════════════
// Grade 1: Basic Colors (Màu sắc cơ bản)
// ══════════════════════════════════════════════

const COLOR_QS = [
    { q: 'Ba màu cơ bản (màu gốc) là những màu nào?', a: 'Đỏ, vàng, xanh lam', opts: ['Đỏ, vàng, xanh lam', 'Đen, trắng, xám', 'Xanh lá, cam, tím', 'Hồng, nâu, lục'], e: 'Trong mỹ thuật, Đỏ, Vàng và Xanh lam là 3 màu cơ bản. Từ 3 màu này có thể pha ra các màu khác.' },
    { q: 'Khi ta trộn màu Đỏ và màu Vàng với nhau, ta sẽ được màu gì?', a: 'Màu Cam', opts: ['Màu Cam', 'Màu Xanh lá', 'Màu Tím', 'Màu Đen'], e: 'Đỏ + Vàng = Cam.' },
    { q: 'Khi ta trộn màu Xanh lam và màu Vàng, ta sẽ được màu gì?', a: 'Màu Xanh lá cây', opts: ['Màu Xanh lá cây', 'Màu Cam', 'Màu Nâu', 'Màu Tím'], e: 'Xanh lam + Vàng = Xanh lá cây.' },
    { q: 'Khi ta trộn màu Đỏ và màu Xanh lam, ta sẽ được màu gì?', a: 'Màu Tím', opts: ['Màu Tím', 'Màu Cam', 'Màu Xanh lá', 'Màu Đen'], e: 'Đỏ + Xanh lam = Tím.' },
    { q: 'Màu của ông mặt trời chiếu sáng thường được vẽ bằng màu gì?', a: 'Màu Vàng hoặc Đỏ', opts: ['Màu Vàng hoặc Đỏ', 'Màu Xanh lam', 'Màu Tím', 'Màu Đen'], e: 'Ông mặt trời thường tượng trưng cho ánh sáng và sự ấm áp nên hay dùng màu Vàng, Cam, Đỏ.' },
];

export function genBasicColors(): ArtProblem {
    const item = COLOR_QS[rand(0, COLOR_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'visual', topic: 'Màu sắc cơ bản', topicKey: 'basic_colors',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Hãy nhớ lại hộp màu sáp của em', `Đáp án: ${item.a}`],
        illustration: '/images/core/books_hd.svg',
    };
}

// ══════════════════════════════════════════════
// Grade 2: Music Rhythm (Nhịp điệu cơ bản)
// ══════════════════════════════════════════════

const RHYTHM_QS = [
    { q: 'Nhịp điệu trong âm nhạc là gì?', a: 'Sự lặp lại đều đặn của các âm thanh (phách mạnh, nhẹ)', opts: ['Sự lặp lại đều đặn của các âm thanh (phách mạnh, nhẹ)', 'Lời của bài hát', 'Độ cao thấp của nốt nhạc', 'Tên của ca sĩ'], e: 'Nhịp điệu tạo ra chuyển động của bài hát, giống như tiếng đập của trái tim.' },
    { q: 'Khi hát nhịp 2/4, phách thứ nhất thường như thế nào?', a: 'Phách mạnh', opts: ['Phách mạnh', 'Phách nhẹ', 'Không có âm thanh', 'Kéo dài rất lâu'], e: 'Nhịp 2/4 gồm 1 phách mạnh và 1 phách nhẹ lặp lại.' },
    { q: 'Nhạc cụ nào sau đây thường dùng để giữ nhịp?', a: 'Trống con', opts: ['Trống con', 'Cây sáo', 'Đàn kèn', 'Giọng hát'], e: 'Các loại nhạc cụ gõ (trống, phách, song loan) rất tốt để giữ nhịp điệu.' },
    { q: 'Tốc độ của bài hát (nhanh, chậm) được gọi là gì?', a: 'Nhịp độ', opts: ['Nhịp độ', 'Cao độ', 'Âm lượng', 'Giai điệu'], e: 'Nhịp độ (Tempo) chỉ sự nhanh hay chậm của bài hát.' },
    { q: 'Khi nghe một bài hát vui nhộn, nhịp điệu thường như thế nào?', a: 'Nhanh và rộn ràng', opts: ['Nhanh và rộn ràng', 'Rất chậm', 'Buồn bã', 'Không có tiếng động'], e: 'Bài hát vui tươi thường có nhịp điệu nhanh, thôi thúc người nghe nhún nhảy.' },
];

export function genMusicRhythm(): ArtProblem {
    const item = RHYTHM_QS[rand(0, RHYTHM_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'audio', topic: 'Nhịp điệu cơ bản', topicKey: 'music_rhythm',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Hãy nhớ lại lúc em vỗ tay theo bài hát', `Đáp án: ${item.a}`],
        illustration: '/images/core/books_hd.svg',
    };
}

// ══════════════════════════════════════════════
// TOPIC REGISTRY
// ══════════════════════════════════════════════

export interface ArtTopicInfo {
    key: string;
    name: string;
    gradeLevel: number;
    generator: () => ArtProblem;
    icon: string;
}

export const ART_TOPICS: ArtTopicInfo[] = [
    { key: 'basic_colors', name: 'Màu sắc cơ bản', gradeLevel: 1, generator: genBasicColors, icon: '🎨' },
    { key: 'music_rhythm', name: 'Nhịp điệu cơ bản', gradeLevel: 2, generator: genMusicRhythm, icon: '🎵' },
];

export function generateArtSet(grade: number, topicKey?: string, count: number = 10): ArtProblem[] {
    const topics = ART_TOPICS.filter(t => t.gradeLevel <= grade && (!topicKey || t.key === topicKey));
    if (topics.length === 0) return [];
    return Array.from({ length: count }, () => {
        const t = topics[rand(0, topics.length - 1)];
        return t.generator();
    });
}
