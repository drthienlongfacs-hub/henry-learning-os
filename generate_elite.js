const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'src', 'data', 'exercises-generated.ts');

const templates = [
    {
        sub: 'Tư Duy Hệ Thống',
        diff: 4,
        tags: ['systems', 'logistics', 'casel', 'generated'],
        generate: (i) => {
            const distance = 10 + i * 5;
            const speed = 2 + (i % 3);
            const hours = distance / speed;
            return {
                q: `[TƯ DUY HỆ THỐNG] Đoàn xe tiếp tế cần đi qua ${distance} km đường đèo. Tốc độ an toàn tối đa là ${speed} km/h. Nếu xuất phát lúc 6h sáng, đoàn xe sẽ cần chạy liên tục bao nhiêu giờ?`,
                opts: [hours.toFixed(1), (hours + 1).toFixed(1), (hours - 1).toFixed(1), (hours + 2).toFixed(1)].map(String),
                correct: hours.toFixed(1),
                exp: `Hệ thống hóa: Quãng đường / Tốc độ = ${distance} / ${speed} = ${hours.toFixed(1)} giờ.`,
            };
        }
    },
    {
        sub: 'Tài Chính & Rủi Ro',
        diff: 5,
        tags: ['finance', 'risk', 'wef', 'generated'],
        generate: (i) => {
            const budget = 1000 + (i * 100);
            const loss = 200 + (i * 20);
            const ratio = (loss / budget) * 100;
            return {
                q: `[QUẢN TRỊ NGÂN SÁCH] Một chiến dịch đầu tư ban đầu có quỹ ${budget} Vàng. Do biến động thị trường, danh mục giảm ${loss} Vàng. Tỉ lệ rủi ro/tổn thất hiện tại là bao nhiêu %?`,
                opts: [ratio.toFixed(1), (ratio + 2).toFixed(1), (ratio - 1).toFixed(1), (ratio * 2).toFixed(1)].map(String),
                correct: ratio.toFixed(1),
                exp: `Đánh giá rủi ro: Phần trăm tổn thất = Tổn thất / Tổng vốn = ${loss} / ${budget} = ${ratio.toFixed(1)}%.`,
            };
        }
    },
    {
        sub: 'Lãnh Đạo & Ra Quyết Định',
        diff: 4,
        tags: ['civics', 'leadership', 'casel', 'generated'],
        generate: (i) => {
            const scenarios = [
                ["Đội ngũ A muốn tấn công, Đội B muốn phòng thủ. Chỉ huy nên làm gì?", "Phân tích nguồn lực và vị trí chiến lược", "Ra lệnh theo ý Đội A", "Ra lệnh theo ý Đội B", "Bỏ phiếu ngẫu nhiên"],
                ["Thị trấn thiếu nước ngọt. Nguồn 1 gần nhưng ô nhiễm. Nguồn 2 xa nhưng sạch. Quyết định của Thị trưởng?", "Cử đội đi trinh sát và lọc nước từ Nguồn 1, đồng thời xây đường tới Nguồn 2", "Chỉ dùng Nguồn 1", "Chỉ dùng Nguồn 2", "Chờ trời mưa"],
                ["Nguồn cung lương thực giảm 40%. Xử lý cấp bách thế nào?", "Áp dụng thiết quân luật phân bổ theo định mức sinh tồn tối thiểu", "Cứ để thị trường tự quyết định", "Chuyển hết cho quân đội", "Chuyển hết người già"]
            ];
            const s = scenarios[i % scenarios.length];
            return {
                q: `[CHỈ HUY TÁC CHIẾN] ${s[0]}`,
                opts: [s[1], s[2], s[3], s[4]],
                correct: s[1],
                exp: `Lãnh đạo hệ thống: Việc ưu tiên đánh giá nguồn lực thực tế, xây dựng giải pháp song song thay vì quyết định cảm tính là cốt lõi của Lãnh đạo (CASEL).`,
            };
        }
    },
    {
        sub: 'Toán Học Xác Suất (Game Theory)',
        diff: 5,
        tags: ['probability', 'game-theory', 'ncss', 'generated'],
        generate: (i) => {
            const EV = 20 + i;
            const P = 50 + (i % 20);
            const W = (EV * 100 / P).toFixed(0);
            return {
                q: `[LÝ THUYẾT TRÒ CHƠI] Một nhiệm vụ có xác suất thành công là ${P}%. Nếu thành công sẽ nhận được ${W} điểm kinh nghiệm. Giá trị kỳ vọng (Expected Value) của quyết định này là bao nhiêu?`,
                opts: [EV.toString(), (EV + 5).toString(), (EV - 2).toString(), (EV * 2).toString()],
                correct: EV.toString(),
                exp: `Xác suất kỳ vọng = Giá trị thưởng * Xác suất thành công = ${W} * ${P}% = ${EV} điểm.`,
            };
        }
    }
];

let generatedItems = [];
let counter = 1;

for (let j = 0; j < 25; j++) {
    templates.forEach(t => {
        let item = t.generate(j);
        // Shuffle options
        let correctStr = item.correct;
        let opts = item.opts.sort(() => Math.random() - 0.5);

        generatedItems.push(`    {
        id: 'gen-elite-advanced-${counter++}',
        type: 'multiple_choice' as const,
        subject: 'elite',
        difficulty: ${t.diff},
        question: '${item.q}',
        options: ${JSON.stringify(opts)},
        correctAnswer: '${correctStr}',
        hints: ['Phân tích cục diện từ quan điểm Hệ Thống (CASEL/WEF).'],
        explanation: '${item.exp}',
        tags: ${JSON.stringify(t.tags)}
    }`);
    });
}

const fileContent = fs.readFileSync(targetFile, 'utf8');

// Find where export const massiveEliteGenerated begins
const eliteStartIndex = fileContent.indexOf('export const massiveEliteGenerated');

if (eliteStartIndex === -1) {
    console.error("Could not find the Elite array start.");
    process.exit(1);
}

const fileTop = fileContent.substring(0, eliteStartIndex);

const finalStr = fileTop + `export const massiveEliteGenerated: Exercise[] = [\n${generatedItems.join(',\n')}\n];\n`;

fs.writeFileSync(targetFile, finalStr, 'utf8');
console.log("Successfully rebuilt massiveEliteGenerated with " + generatedItems.length + " distinct items.");
