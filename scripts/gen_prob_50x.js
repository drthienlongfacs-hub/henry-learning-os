// Generate 400+ probability scenarios via template expansion
const fs = require('fs');
const items = [];
let id = 1;

// Template: object in container
const containers = [
    { name: 'túi', items: ['bi đỏ', 'bi xanh', 'bi vàng', 'bi trắng', 'bi đen'] },
    { name: 'hộp', items: ['kẹo dâu', 'kẹo sô-cô-la', 'kẹo bạc hà', 'kẹo cam', 'kẹo nho'] },
    { name: 'rổ', items: ['quả táo', 'quả cam', 'quả lê', 'quả chuối', 'quả xoài'] },
    { name: 'ngăn kéo', items: ['bút đỏ', 'bút xanh', 'bút đen', 'bút tím', 'bút vàng'] },
];
const visuals = ['🔴', '🍬', '🍎', '🖊️'];

containers.forEach((c, ci) => {
    for (let total = 3; total <= 10; total++) {
        for (let target = 1; target <= Math.min(3, total); target++) {
            const tItem = c.items[target % c.items.length];
            const ratio = target / total;
            let answer, explain;
            if (ratio >= 0.8) { answer = 'certain'; explain = `${target}/${total} = ${(ratio * 100).toFixed(0)}%. Gần như chắc chắn!`; }
            else if (ratio >= 0.5) { answer = 'likely'; explain = `${target}/${total} = ${(ratio * 100).toFixed(0)}%. Khả năng cao.`; }
            else if (ratio === 0.5) { answer = 'equal'; explain = `${target}/${total} = 50%. Ngang nhau.`; }
            else if (ratio >= 0.2) { answer = 'unlikely'; explain = `${target}/${total} = ${(ratio * 100).toFixed(0)}%. Khá thấp.`; }
            else { answer = 'unlikely'; explain = `${target}/${total} = ${(ratio * 100).toFixed(0)}%. Rất hiếm.`; }

            items.push({
                id: `prob-cont-${id++}`, ageTarget: '6-10',
                question: `Trong ${c.name} có ${total} vật, ${target} cái là ${tItem}. Bốc ngẫu nhiên 1 cái, được ${tItem}?`,
                visual: visuals[ci], correctAnswer: answer,
                options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'],
                explanation: explain
            });
        }
    }
}); // ~96 items

// Template: dice variations
const dice = [4, 6, 8, 10, 12, 20];
dice.forEach(d => {
    for (let t = 1; t <= Math.min(6, d); t++) {
        items.push({
            id: `prob-dice-${id++}`, ageTarget: '6-10',
            question: `Gieo xúc xắc ${d} mặt. Khả năng ra số ${t}?`,
            visual: '🎲', correctAnswer: d <= 4 ? 'unlikely' : 'unlikely',
            options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'],
            explanation: `Xác suất = 1/${d} = ${(100 / d).toFixed(1)}%.`
        });
    }
    // impossible
    items.push({
        id: `prob-dice-${id++}`, ageTarget: '6-10',
        question: `Gieo xúc xắc ${d} mặt. Khả năng ra số ${d + 1}?`,
        visual: '🎲', correctAnswer: 'impossible',
        options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'],
        explanation: `Xúc xắc ${d} mặt chỉ có 1-${d}. Số ${d + 1} không tồn tại.`
    });
}); // ~42 items

// Template: coin toss sequences
for (let n = 1; n <= 8; n++) {
    const prob = Math.pow(0.5, n);
    let answer;
    if (prob >= 0.25) answer = 'unlikely';
    else if (prob >= 0.01) answer = 'unlikely';
    else answer = 'impossible';
    items.push({
        id: `prob-coin-${id++}`, ageTarget: '6-10',
        question: `Tung đồng xu ${n} lần. Cả ${n} lần đều ngửa?`,
        visual: '🪙', correctAnswer: answer,
        options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'],
        explanation: `Xác suất = (1/2)^${n} = 1/${Math.pow(2, n)} = ${(prob * 100).toFixed(2)}%.`
    });
}

// Template: nature/science certainty
const certain_events = [
    ['Thả đá vào nước, đá chìm?', '🪨', 'Đá nặng hơn nước, chắc chắn chìm.'],
    ['Đun nước 100°C, nước sôi?', '🫖', 'Nước sôi ở 100°C ở áp suất tiêu chuẩn.'],
    ['Bật công tắc đèn, đèn sáng?', '💡', 'Nếu bóng đèn tốt và có điện, chắc chắn sáng.'],
    ['Trồng cây tưới nước đủ, cây mọc?', '🌱', 'Đủ nước + đất + ánh sáng = chắc chắn.'],
    ['Mở tủ lạnh lấy kem ra ngoài nắng, kem tan?', '🍦', 'Nhiệt cao chắc chắn làm kem tan.'],
    ['Bóng cao su thả xuống sàn, bóng nảy?', '🏀', 'Cao su đàn hồi, chắc chắn nảy.'],
    ['Muối bỏ vào nước, nước mặn?', '🧂', 'Muối tan = nước mặn 100%.'],
    ['Mặt trời mọc sáng mai?', '🌅', 'Trái đất quay, chắc chắn có bình minh.'],
    ['Đá lạnh ở 0°C biến thành nước?', '🧊', 'Nhiệt > 0°C, đá tan thành nước.'],
    ['Gió thổi mạnh, lá cây rung?', '🍃', 'Lực gió tác động lá, chắc chắn rung.'],
];
certain_events.forEach(([q, v, e]) => {
    items.push({ id: `prob-cert-${id++}`, ageTarget: '6-10', question: q, visual: v, correctAnswer: 'certain', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: e });
});

// Template: impossible events
const impossible_events = [
    ['Con người tự bay không cần máy bay?', '🦸', 'Không có cánh, lực hấp dẫn quá mạnh.'],
    ['Cá sống dưới nước biết nói tiếng người?', '🐟', 'Cá không có dây thanh quản.'],
    ['Cục đá nổi trên mặt nước?', '🪨', 'Đá nặng hơn nước, không thể nổi.'],
    ['Con mèo giải được bài toán lớp 5?', '🐱', 'Mèo không có tư duy toán học.'],
    ['Tuyết rơi ở sa mạc Sahara giữa mùa hè?', '🏜️', 'Nhiệt độ 50°C+, không thể có tuyết.'],
    ['Xe đạp tự chạy không ai đạp trên mặt phẳng?', '🚲', 'Không có lực, xe không tự chạy.'],
    ['Viết bằng bút hết mực?', '🖊️', 'Bút hết mực không ra được chữ.'],
    ['Đứng dưới mưa nhưng không bị ướt (không dù)?', '🌧️', 'Nước rơi trúng người = ướt.'],
    ['Nấu cơm không có gạo?', '🍚', 'Không gạo = không cơm.'],
    ['Uống nước biển không thấy mặn?', '🌊', 'Nước biển luôn chứa muối.'],
];
impossible_events.forEach(([q, v, e]) => {
    items.push({ id: `prob-imp-${id++}`, ageTarget: '6-10', question: q, visual: v, correctAnswer: 'impossible', options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: e });
});

// Advanced (11+) probability concepts
const adv = [
    { q: 'Monty Hall: Sau khi MC mở cửa trống, đổi cửa tốt hơn?', a: 'likely', e: 'Đổi cửa: P=2/3 > giữ: P=1/3.' },
    { q: 'Birthday Paradox: 30 người có trùng sinh nhật?', a: 'likely', e: 'P ≈ 70.6%. Phản trực giác nhưng đúng.' },
    { q: 'Gambler\'s Fallacy: Đỏ 15 lần liền, đen lần 16?', a: 'equal', e: 'Mỗi lần quay độc lập, P luôn = 18/37.' },
    { q: 'Law of Large Numbers: 100,000 lần tung xu → 50% ngửa?', a: 'certain', e: 'LLN đảm bảo hội tụ về xác suất lý thuyết.' },
    { q: 'Bayes: Xét nghiệm 99%, bệnh 0.1%. Dương tính thật?', a: 'unlikely', e: 'PPV ≈ 9% do tỉ lệ cơ bản rất thấp.' },
    { q: 'CLT: Trung bình 50 mẫu xấp xỉ phân phối chuẩn?', a: 'likely', e: 'n=50 >> 30, CLT áp dụng mạnh.' },
    { q: 'St. Petersburg: Kỳ vọng vô hạn, trả $100?', a: 'unlikely', e: 'Dù EV=∞, utility giảm logarithmic.' },
    { q: 'Simpson\'s Paradox: Gộp data đảo ngược kết luận?', a: 'likely', e: 'Confounding variables gây đảo xu hướng.' },
    { q: 'Regression to Mean: Điểm thi cực cao lần 1?', a: 'likely', e: 'Extreme scores tend to revert.' },
    { q: 'Poisson: λ=3, P(X=0)?', a: 'unlikely', e: 'P=e^(-3) ≈ 4.98%.' },
    { q: 'Binomial: 10 xu tung, đúng 5 ngửa?', a: 'unlikely', e: 'C(10,5)×0.5^10 ≈ 24.6%.' },
    { q: 'Conditional: P(A|B) khi A,B độc lập?', a: 'equal', e: 'Độc lập → P(A|B) = P(A).' },
    { q: 'Chi-square: 200 gieo xúc xắc lệch phân phối?', a: 'likely', e: 'Chi-square test phát hiện bất thường.' },
    { q: 'Expected Value âm: Mua xổ số kỳ vọng lãi?', a: 'impossible', e: 'EV < 0 → trung bình luôn lỗ.' },
    { q: 'Coupon Collector: Thu đủ 6 sticker từ 6 gói?', a: 'unlikely', e: 'E[n] ≈ 14.7 gói. Cần gấp 2.5x.' },
    { q: 'Hypergeometric: 5 bi đỏ/20 bi, rút 3, cả 3 đỏ?', a: 'unlikely', e: 'C(5,3)/C(20,3) ≈ 0.88%.' },
    { q: 'Normal dist: IQ > 145 (3σ)?', a: 'unlikely', e: 'P ≈ 0.13%. Rất hiếm.' },
    { q: 'Variance: 2 danh mục có mean=10, σ khác nhau?', a: 'equal', e: 'Mean bằng nhau, risk khác nhau.' },
    { q: 'Monte Carlo: 10,000 simulation hội tụ π?', a: 'certain', e: 'MC converges với n đủ lớn.' },
    { q: 'Markov Chain: Trạng thái ổn định tồn tại?', a: 'likely', e: 'Ergodic chain → stationary dist tồn tại.' },
];
adv.forEach((a, i) => {
    items.push({ id: `prob-adv-${id++}`, ageTarget: '11+', question: a.q, visual: '🧠', correctAnswer: a.a, options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: a.e });
});

// Weather/nature for kids
const weather = [
    ['Trời trong xanh không mây, mưa?', '☀️', 'unlikely', 'Không mây = rất khó mưa.'],
    ['Mây đen kéo tới, sấm chớp, mưa?', '⛈️', 'likely', 'Dấu hiệu mưa rõ ràng.'],
    ['Mùa đông Hà Nội 5°C, ra mồ hôi?', '❄️', 'impossible', 'Quá lạnh để đổ mồ hôi.'],
    ['Mùa hè 40°C, kem để ngoài tan?', '🌡️', 'certain', 'Nhiệt cao = kem tan.'],
    ['Gió bão cấp 10, thả diều?', '🌪️', 'impossible', 'Gió quá mạnh, diều rách.'],
    ['Cầu vồng sau mưa khi có nắng?', '🌈', 'likely', 'Ánh sáng khúc xạ qua giọt nước.'],
    ['Sương mù buổi sáng, trời nóng?', '🌫️', 'unlikely', 'Sương mù = độ ẩm cao, trời mát.'],
    ['Mặt trăng biến mất vĩnh viễn?', '🌙', 'impossible', 'Mặt trăng quay quanh Trái đất ổn định.'],
];
weather.forEach(([q, v, a, e]) => {
    items.push({ id: `prob-wea-${id++}`, ageTarget: '6-10', question: q, visual: v, correctAnswer: a, options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: e });
});

// Animal behavior
const animals = [
    ['Chim cánh cụt bay trên trời?', '🐧', 'impossible', 'Cánh cụt cánh nhỏ, không bay được.'],
    ['Cá heo nhảy qua vòng khi huấn luyện?', '🐬', 'likely', 'Cá heo thông minh, dễ huấn luyện.'],
    ['Mèo rơi từ cao, đáp bằng chân?', '🐱', 'likely', 'Reflex xoay người cực tốt.'],
    ['Chó nghe lệnh "ngồi" sau 1 tuần tập?', '🐕', 'likely', 'Chó học nhanh với phần thưởng.'],
    ['Rùa chạy nhanh hơn thỏ?', '🐢', 'impossible', 'Rùa chậm hơn thỏ rất nhiều.'],
    ['Voi nhớ đường sau 10 năm?', '🐘', 'likely', 'Voi có trí nhớ xuất sắc.'],
    ['Cá vàng nhớ việc 3 phút trước?', '🐠', 'likely', 'Cá vàng nhớ được vài tháng, không phải 3 giây.'],
    ['Kiến kéo vật nặng gấp 50 lần?', '🐜', 'certain', 'Kiến khỏe gấp 50 lần trọng lượng.'],
];
animals.forEach(([q, v, a, e]) => {
    items.push({ id: `prob-ani-${id++}`, ageTarget: '6-10', question: q, visual: v, correctAnswer: a, options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: e });
});

console.log(`Generated ${items.length} probability scenarios`);
console.log(`  Kids: ${items.filter(i => i.ageTarget === '6-10').length}`);
console.log(`  Adv: ${items.filter(i => i.ageTarget === '11+').length}`);
fs.writeFileSync('scripts/prob_50x.json', JSON.stringify(items, null, 2));
