// Expand thin pillars to 100+ each: Civics, Negotiation, Finance/WVN
const fs = require('fs');
const path = require('path');

// ═══════ CIVICS/POLICY — expand to 100 ═══════
const pol_kids = [
    ['Ai dọn bàn ăn sau bữa cơm?', '🍽️', [{ t: 'Chia đều: hôm nay anh, mai em', c: 'Ai cũng học trách nhiệm.', f: 95, h: 85 }, { t: 'Ai ăn xong trước thì dọn', c: 'Bạn ăn chậm thiệt thòi.', f: 40, h: 50 }, { t: 'Thuê người dọn', c: 'Tốn tiền và các em không học được.', f: 30, h: 60 }]],
    ['Lớp có 1 chỗ ngồi đầu, 3 bạn muốn?', '💺', [{ t: 'Luân phiên mỗi tuần 1 bạn', c: 'Công bằng, ai cũng được.', f: 95, h: 90 }, { t: 'Ai điểm cao nhất thì ngồi', c: 'Chỉ ưu tiên giỏi, bạn khác buồn.', f: 50, h: 40 }, { t: 'Cô giáo chọn bạn cô thích', c: 'Thiên vị, gây bất mãn.', f: 15, h: 20 }]],
    ['Bạn mới chuyển trường, không ai chơi cùng?', '👋', [{ t: 'Rủ bạn mới chơi chung giờ ra chơi', c: 'Bạn mới vui, lớp đoàn kết hơn.', f: 90, h: 95 }, { t: 'Mặc kệ, tự bạn ấy quen', c: 'Bạn ấy buồn và cô đơn lâu.', f: 20, h: 30 }, { t: 'Nói bạn mới phải tự hòa nhập', c: 'Đúng 1 phần, nhưng thiếu tình người.', f: 45, h: 40 }]],
    ['Thùng rác lớp đầy, ai đổ?', '🗑️', [{ t: 'Bạn trực nhật hôm nay đổ', c: 'Có quy tắc rõ ràng.', f: 85, h: 80 }, { t: 'Ai ngồi gần thùng rác thì đổ', c: 'Không công bằng cho bạn ngồi gần.', f: 40, h: 35 }, { t: 'Chờ lao công đổ', c: 'Lớp bốc mùi cả buổi.', f: 20, h: 15 }]],
    ['Có 3 quả bóng, 10 bạn muốn chơi?', '⚽', [{ t: 'Chia 3 đội, luân phiên dùng bóng', c: 'Ai cũng được chơi.', f: 90, h: 85 }, { t: 'Ai đến sân trước dùng trước', c: 'Bạn ở xa thiệt thòi.', f: 35, h: 40 }, { t: 'Chỉ cho bạn giỏi bóng chơi', c: 'Phân biệt, gây buồn.', f: 15, h: 20 }]],
    ['Bạn A đánh bạn B, cô giáo hỏi ai thấy?', '👀', [{ t: 'Kể thật cho cô giáo nghe', c: 'Bảo vệ bạn B, cô xử lý đúng.', f: 85, h: 70 }, { t: 'Im lặng vì sợ bạn A', c: 'Bạn B tiếp tục bị bắt nạt.', f: 30, h: 25 }, { t: 'Nói bạn B trêu trước (không đúng)', c: 'Bạn B bị oan, A không rút kinh nghiệm.', f: 10, h: 10 }]],
    ['Cả lớp muốn đi picnic nhưng 1 bạn bệnh?', '🏥', [{ t: 'Đợi bạn khỏe rồi cả lớp đi', c: 'Đoàn kết, không bỏ ai lại.', f: 90, h: 80 }, { t: 'Đi luôn, bạn bệnh ở nhà', c: 'Bạn ấy buồn vì bị bỏ rơi.', f: 40, h: 60 }, { t: 'Hủy luôn chuyến picnic', c: 'Cả lớp thất vọng vì 1 người.', f: 50, h: 20 }]],
    ['Mẹ cho tiền mua 1 món, em muốn 2?', '💰', [{ t: 'Chọn 1 món cần hơn, để dành tiền', c: 'Học cách ưu tiên và tiết kiệm.', f: 85, h: 75 }, { t: 'Xin mẹ thêm tiền', c: 'Mẹ có thể không có thêm.', f: 50, h: 60 }, { t: 'Lấy trộm tiền mua thêm', c: 'Sai trái, mất niềm tin.', f: 5, h: 10 }]],
    ['Bạn mượn đồ chơi rồi không trả?', '🧸', [{ t: 'Nhắc nhẹ bạn trả, nếu quên thì nói cô', c: 'Giải quyết hòa bình.', f: 85, h: 80 }, { t: 'Giật lại đồ chơi', c: 'Gây đánh nhau.', f: 20, h: 30 }, { t: 'Không cho ai mượn nữa', c: 'Mất bạn, cô đơn.', f: 40, h: 40 }]],
    ['Hai nhóm muốn dùng sân bóng cùng lúc?', '🏟️', [{ t: 'Chia sân làm 2 hoặc chơi luân phiên', c: 'Cả 2 nhóm đều được chơi.', f: 90, h: 85 }, { t: 'Nhóm nào đông hơn thì được', c: 'Nhóm ít người thiệt thòi.', f: 40, h: 45 }, { t: 'Đá banh chung 1 đội to', c: 'Quá đông, khó chơi.', f: 50, h: 50 }]],
    ['Cô phát phần thưởng chỉ cho bạn giỏi?', '🏆', [{ t: 'Đề xuất thêm giải "Tiến bộ nhất"', c: 'Khuyến khích mọi người cố gắng.', f: 90, h: 90 }, { t: 'Chỉ giỏi mới xứng đáng', c: 'Bạn yếu mất động lực.', f: 40, h: 35 }, { t: 'Không phát giải cho ai', c: 'Không ai có động lực.', f: 20, h: 20 }]],
    ['Bạn bị chê béo ở trường?', '😢', [{ t: 'Nói chuyện với cô, bảo vệ bạn', c: 'Chống bắt nạt, bạn ấy được an toàn.', f: 90, h: 85 }, { t: 'Chê lại bạn kia', c: 'Leo thang bạo lực lời nói.', f: 10, h: 15 }, { t: 'Cười theo đám đông', c: 'Bạn bị tổn thương nặng hơn.', f: 5, h: 5 }]],
    ['Em út đòi xem TV khi anh đang học?', '📺', [{ t: 'Thỏa thuận: anh học 30 phút, sau đó em xem', c: 'Cả hai được thỏa mãn.', f: 85, h: 85 }, { t: 'Tắt TV luôn', c: 'Em khóc, nhà ồn hơn.', f: 40, h: 30 }, { t: 'Cho em xem to, anh đeo tai nghe', c: 'Anh phân tâm, học kém.', f: 50, h: 55 }]],
    ['Bạn quên mang bút, hỏi mượn?', '✏️', [{ t: 'Cho bạn mượn 1 cây dự phòng', c: 'Giúp đỡ bạn, tình bạn tốt hơn.', f: 90, h: 90 }, { t: 'Không cho vì sợ bạn làm hỏng', c: 'Bạn không có bút viết bài.', f: 40, h: 30 }, { t: 'Bảo bạn tự xin cô', c: 'Đúng nhưng thiếu tình đồng đội.', f: 55, h: 50 }]],
    ['Mưa lớn, chỉ có 1 ô dù cho 3 bạn?', '☂️', [{ t: '3 bạn che chung dù, đi chậm', c: 'Ai cũng ít ướt nhất có thể.', f: 90, h: 80 }, { t: 'Bạn có dù giữ cho mình', c: '2 bạn bị ướt sũng.', f: 20, h: 30 }, { t: 'Ai chạy nhanh nhất đến trước', c: 'Bạn chậm bị ướt nhất.', f: 30, h: 35 }]],
    ['Cả tổ làm bài nhóm, 1 bạn không làm?', '📋', [{ t: 'Nói chuyện riêng, hỏi bạn gặp khó gì', c: 'Hiểu lý do, giúp bạn tham gia.', f: 85, h: 80 }, { t: 'Mách cô giáo ngay', c: 'Bạn bị phạt nhưng chưa hiểu lý do.', f: 50, h: 40 }, { t: 'Làm phần bạn ấy luôn', c: 'Bạn ấy không học được gì.', f: 30, h: 50 }]],
];

const pol_adv = [
    ['Tragedy of Commons: Hồ cá chung, ai cũng câu không giới hạn?', '🐟', [{ t: 'Đặt hạn ngạch câu cá theo mùa (Ostrom)', c: 'Tài nguyên phục hồi bền vững.', f: 90, h: 70 }, { t: 'Để tự do khai thác', c: 'Cá cạn kiệt, mọi người đều thiệt.', f: 10, h: 10 }, { t: 'Cấm câu hoàn toàn', c: 'Mất nguồn sống, dân phản đối.', f: 40, h: 30 }]],
    ['Ngoại ứng: Nhà máy xả khói nhưng tạo 500 việc làm?', '🏭', [{ t: 'Thuế Pigou + bộ lọc khói bắt buộc', c: 'Giảm ô nhiễm, giữ việc làm.', f: 85, h: 75 }, { t: 'Đóng cửa nhà máy', c: '500 người mất việc.', f: 30, h: 30 }, { t: 'Để công nhân biểu quyết', c: 'Thiên vị vì họ cần thu nhập.', f: 50, h: 55 }]],
    ['Public Goods: Ai trả tiền đèn đường?', '💡', [{ t: 'Thuế chung, nhà nước quản lý', c: 'Mọi người đều hưởng lợi.', f: 85, h: 80 }, { t: 'Ai dùng đường thì đóng phí', c: 'Khó thu, nhiều người trốn.', f: 40, h: 40 }, { t: 'Doanh nghiệp tài trợ đổi quảng cáo', c: 'Phụ thuộc tư nhân, không bền.', f: 55, h: 60 }]],
    ['Moral Hazard: Bảo hiểm toàn phần → lái xe ẩu?', '🚗', [{ t: 'Đặt mức khấu trừ + thưởng lái an toàn', c: 'Khuyến khích cẩn thận.', f: 85, h: 75 }, { t: 'Bảo hiểm trả 100% mọi thiệt hại', c: 'Không ai cẩn thận nữa.', f: 20, h: 40 }, { t: 'Bỏ bảo hiểm hoàn toàn', c: 'Tai nạn = phá sản.', f: 15, h: 15 }]],
    ['Prisoner\'s Dilemma: 2 nước cùng tăng vũ khí?', '⚔️', [{ t: 'Hiệp ước giải trừ vũ khí (Nash Eq.)', c: 'Cả 2 bên giảm chi phí, hòa bình.', f: 90, h: 80 }, { t: 'Tăng vũ khí để "mạnh hơn"', c: 'Chạy đua vũ trang, thêm nguy hiểm.', f: 10, h: 20 }, { t: '1 bên giải giáp đơn phương', c: 'Rủi ro bị tấn công.', f: 30, h: 35 }]],
    ['Free Rider: Dự án nhóm, 1 người không làm vẫn được điểm?', '📝', [{ t: 'Chấm điểm cá nhân + nhóm (Peer review)', c: 'Công bằng, ai cũng phải đóng góp.', f: 90, h: 80 }, { t: 'Điểm chung cho cả nhóm', c: 'Người lười được lợi.', f: 20, h: 40 }, { t: 'Đuổi bạn lười ra khỏi nhóm', c: 'Khắc nghiệt, không giải quyết gốc.', f: 40, h: 35 }]],
    ['Discrimination: Công ty chỉ tuyển nam giới?', '⚖️', [{ t: 'Luật bình đẳng giới + giám sát', c: 'Mọi người có cơ hội ngang nhau.', f: 95, h: 85 }, { t: 'Để thị trường tự điều chỉnh', c: 'Bất bình đẳng kéo dài.', f: 20, h: 25 }, { t: 'Quota bắt buộc 50/50', c: 'Có thể tuyển người chưa đủ năng lực.', f: 60, h: 55 }]],
    ['Information Asymmetry: Bán xe cũ, che giấu lỗi?', '🚙', [{ t: 'Luật bắt buộc công khai lịch sử xe', c: 'Người mua được bảo vệ.', f: 90, h: 80 }, { t: 'Người mua tự kiểm tra', c: 'Không phải ai cũng biết kiểm tra.', f: 40, h: 40 }, { t: 'Bảo hành bắt buộc 6 tháng', c: 'Chi phí cao, giá xe tăng.', f: 60, h: 60 }]],
];

const policies = [];
pol_kids.forEach(([sit, vis, opts], i) => {
    policies.push({
        id: `pol-exp-kid-${i + 1}`, ageTarget: '6-10', situation: sit, visual: vis,
        options: opts.map(o => ({ text: o.t, consequence: o.c, fairnessScore: o.f, happinessScore: o.h }))
    });
});
pol_adv.forEach(([sit, vis, opts], i) => {
    policies.push({
        id: `pol-exp-adv-${i + 1}`, ageTarget: '11+', situation: sit, visual: vis,
        options: opts.map(o => ({ text: o.t, consequence: o.c, fairnessScore: o.f, happinessScore: o.h }))
    });
});

// ═══════ NEGOTIATION — expand to 100 ═══════
const neg_kids = [
    ['Con muốn nuôi cún nhưng mẹ sợ bẩn.', 'Mẹ Lo Lắng', '🐕', 'Thương lượng trách nhiệm', 'Con cam kết tắm và dọn vệ sinh cho cún.', 'Mua cún ngay! Con thích!', 'Mẹ ơi con hứa sáng nào cũng dắt cún đi, chiều dọn vệ sinh. Nếu 1 tháng con làm tốt, mẹ cho nuôi nhé?'],
    ['Bạn rủ chơi game nhưng con chưa xong bài.', 'Bạn Thân', '📱', 'Hoàn thành bài trước', 'Bạn đợi, con học xong rồi chơi vui hơn.', 'Chơi liền! Bài mai làm!', 'Cho mình 25 phút nữa xong bài. Rồi mình chơi tới chiều luôn, khỏi lo gì!'],
    ['Con muốn ở nhà bạn chơi qua đêm.', 'Ba Bảo Thủ', '🏠', 'Lập kế hoạch an toàn', 'Ba yên tâm khi biết người lớn nào trông.', 'Con đi! Đừng cấm!', 'Ba ơi, nhà bạn có bác Hoa trông. Ba gọi hỏi bác trước nhé? Con hứa ngủ đúng 9 giờ.'],
    ['Hai anh em giành remote TV.', 'Anh Trai', '📺', 'Luân phiên xem', 'Mỗi người xem 30 phút.', 'Tao xem trước! Em đi chỗ khác!', 'Anh xem trước 30 phút, sau đó em xem 30 phút. Ai đúng giờ thì ngày mai được chọn trước.'],
    ['Con muốn đi sinh nhật bạn nhưng ba mẹ bận.', 'Ba Mẹ Bận', '🎂', 'Tìm giải pháp vận chuyển', 'Con đi được, ba mẹ không phải sắp xếp.', 'Ba chở con đi! Bận thì nghỉ!', 'Ba mẹ ơi, bác Tú nhà bạn nói chở con đi chung. 3 giờ ba đón con nhé?'],
    ['Cô giáo giao bài nhóm, con không muốn làm với bạn A.', 'Cô Giáo', '📚', 'Đề xuất nhóm khác', 'Cô đồng ý, con học hiệu quả hơn.', 'Con không làm với A! Đổi ngay!', 'Cô ơi, con nghĩ con và bạn B phối hợp tốt hơn vì hai đứa giỏi khác môn. Cô cho đổi nhóm được không ạ?'],
    ['Con muốn mua sách mới nhưng hết tiền tiêu vặt.', 'Mẹ Tiết Kiệm', '📖', 'Đề xuất làm việc nhà kiếm thêm', 'Mẹ hài lòng, con học giá trị lao động.', 'Mẹ mua cho con!', 'Mẹ ơi, con rửa bát 1 tuần thì mẹ cho con thêm tiền mua sách nhé? Sách này về khoa học hay lắm.'],
    ['Bạn muốn ngồi chỗ của con.', 'Bạn Cùng Lớp', '🪑', 'Thỏa thuận luân phiên', 'Cả hai đều hài lòng.', 'Chỗ tao! Đi chỗ khác!', 'Tuần này bạn ngồi đây, tuần sau mình đổi. Vậy công bằng cho cả hai nhé?'],
    ['Con muốn đi công viên nhưng trời nóng.', 'Mẹ Cẩn Thận', '☀️', 'Đi vào buổi chiều mát', 'Mẹ yên tâm, con vẫn được đi.', 'Đi ngay! Nóng kệ!', 'Mẹ ơi, 4 giờ chiều mát hơn. Con đội mũ + mang nước. Mẹ cho con đi 4 giờ nhé?'],
    ['Bạn không muốn chia banh khi chơi.', 'Bạn Ích Kỷ', '⚽', 'Đề xuất luật chung', 'Ai cũng được chơi.', 'Trả banh đây!', 'Mỗi đội chơi 5 phút rồi đổi. Bạn nào ghi bàn đẹp nhất thì được MVP. Vui hơn!'],
    ['Con muốn học vẽ online nhưng ba mẹ lo internet.', 'Ba Mẹ Lo Mạng', '🎨', 'Giải pháp an toàn', 'Ba mẹ kiểm soát, con được học.', 'Cho con WiFi!', 'Ba mẹ cài app kiểm soát, chỉ cho vào trang học vẽ. Mỗi buổi 45 phút. Ba mẹ check được mọi lúc.'],
    ['Mẹ muốn con ăn rau nhưng con ghét rau.', 'Mẹ Dinh Dưỡng', '🥬', 'Tìm loại rau con thích', 'Con ăn rau dạng con thích, mẹ yên tâm.', 'Con không ăn rau!', 'Mẹ ơi con ăn được rau cải luộc chấm nước mắm. Mẹ nấu kiểu đó nhé? Con hứa ăn hết.'],
];

const nego = [];
neg_kids.forEach(([sc, ai, v, to, ww, sr, sw], i) => {
    nego.push({
        id: `neg-exp-kid-${i + 1}`, ageTarget: '6-10', scenario: sc, aiPersonality: ai, visual: v,
        targetOutcome: to, winWinCriteria: ww, sampleRequest: sr, sampleWinWin: sw
    });
});

// ═══════ FINANCE/WVN — more items ═══════
const wvn_extra = [
    { n: 'Xà bông tắm hàng ngày', v: '🧴', c: 'need', e: 'Vệ sinh cơ thể cần thiết.' },
    { n: 'Truyện tranh Doraemon bộ mới', v: '📕', c: 'want', e: 'Giải trí vui nhưng không ảnh hưởng sống.' },
    { n: 'Dầu gội đầu cho trẻ em', v: '🧴', c: 'need', e: 'Tóc sạch, da đầu khỏe mạnh.' },
    { n: 'Xe scooter điện', v: '🛴', c: 'want', e: 'Phương tiện vui chơi, không thiết yếu.' },
    { n: 'Thuốc ho khi bị cảm', v: '💊', c: 'need', e: 'Thuốc chữa bệnh là nhu cầu y tế.' },
    { n: 'Máy chiếu phim mini', v: '🎥', c: 'want', e: 'Giải trí tại nhà, không cần thiết.' },
    { n: 'Ống hút tre thay nhựa', v: '🎋', c: 'want', e: 'Bảo vệ môi trường nhưng không thiết yếu.' },
    { n: 'Quần áo đồng phục đi học', v: '👔', c: 'need', e: 'Đồng phục là yêu cầu bắt buộc.' },
    { n: 'Bể bơi phao bơm hơi', v: '🏊', c: 'want', e: 'Chơi mùa hè vui nhưng không cần.' },
    { n: 'Thước kẻ và compa học hình', v: '📐', c: 'need', e: 'Dụng cụ học tập toán hình học.' },
    { n: 'Bộ LEGO Creator Expert', v: '🧱', c: 'want', e: 'Đắt tiền, bộ bình thường đủ chơi.' },
    { n: 'Mũ lưỡi trai chống nắng', v: '🧢', c: 'need', e: 'Bảo vệ đầu và mắt dưới nắng.' },
    { n: 'Kính VR thực tế ảo', v: '🥽', c: 'want', e: 'Công nghệ giải trí, không thiết yếu.' },
    { n: 'Bình giữ nhiệt đựng nước', v: '🫗', c: 'need', e: 'Uống nước ấm/mát suốt ngày.' },
    { n: 'Thú bông Pusheen khổng lồ', v: '🐱', c: 'want', e: 'Dễ thương nhưng chỉ là đồ chơi.' },
].map((w, i) => ({ id: `wvn-exp-kid-${i + 1}`, ageTarget: '6-10', name: w.n, visual: w.v, correctCategory: w.c, explanation: w.e }));

// ═══════ MERGE INTO expanded-data.ts ═══════
const edPath = path.join(__dirname, '..', 'src/lib/elite/expanded-data.ts');
const content = fs.readFileSync(edPath, 'utf8');
// Parse existing generated_data
const genData = JSON.parse(fs.readFileSync(path.join(__dirname, 'generated_data.json'), 'utf8'));

// Add new items
genData.policy = [...genData.policy, ...policies];
genData.negotiation = [...genData.negotiation, ...nego];
genData.wantsVsNeeds = [...genData.wantsVsNeeds, ...wvn_extra];

// Save updated generated_data
fs.writeFileSync(path.join(__dirname, 'generated_data.json'), JSON.stringify(genData, null, 2));

// Regenerate expanded-data.ts
const probData = JSON.parse(fs.readFileSync(path.join(__dirname, 'prob_50x.json'), 'utf8'));
// Merge prob: existing generated + prob_50x
const probIds = new Set(genData.probability.map(p => p.id));
const newProb = probData.filter(p => !probIds.has(p.id));
const mergedProb = [...genData.probability, ...newProb];

const tsContent = `// AUTO-GENERATED: 50x Content Expansion Bank
// Generated: ${new Date().toISOString()}
// DO NOT EDIT MANUALLY — regenerate via scripts/expand_thin.js

import type { AgeGroup, LikelihoodLevel } from "./engine";

export const EXPANDED_PROBABILITY = ${JSON.stringify(mergedProb, null, 2)} as const;

export const EXPANDED_WANTS_VS_NEEDS = ${JSON.stringify(genData.wantsVsNeeds, null, 2)} as const;

export const EXPANDED_CIRCLE_OF_CONTROL = ${JSON.stringify(genData.circleOfControl, null, 2)} as const;

export const EXPANDED_NEGOTIATION = ${JSON.stringify(genData.negotiation, null, 2)} as const;

export const EXPANDED_POLICY = ${JSON.stringify(genData.policy, null, 2)} as const;
`;

fs.writeFileSync(edPath, tsContent);

// Final audit
const count = (arr) => arr.length;
console.log('=== FINAL POOL AUDIT ===');
console.log('Probability:', count(mergedProb), `(kids: ${mergedProb.filter(p => p.ageTarget === '6-10').length}, adv: ${mergedProb.filter(p => p.ageTarget === '11+').length})`);
console.log('WantsVsNeeds:', count(genData.wantsVsNeeds), `(kids: ${genData.wantsVsNeeds.filter(p => p.ageTarget === '6-10').length}, adv: ${genData.wantsVsNeeds.filter(p => p.ageTarget === '11+').length})`);
console.log('CircleOfControl:', count(genData.circleOfControl), `(kids: ${genData.circleOfControl.filter(p => p.ageTarget === '6-10').length}, adv: ${genData.circleOfControl.filter(p => p.ageTarget === '11+').length})`);
console.log('Negotiation:', count(genData.negotiation), `(kids: ${genData.negotiation.filter(p => p.ageTarget === '6-10').length}, adv: ${genData.negotiation.filter(p => p.ageTarget === '11+').length})`);
console.log('Policy:', count(genData.policy), `(kids: ${genData.policy.filter(p => p.ageTarget === '6-10').length}, adv: ${genData.policy.filter(p => p.ageTarget === '11+').length})`);
const total = count(mergedProb) + count(genData.wantsVsNeeds) + count(genData.circleOfControl) + count(genData.negotiation) + count(genData.policy);
console.log('EXPANDED TOTAL:', total);
console.log('+ CORE (38) = GRAND:', total + 38);
