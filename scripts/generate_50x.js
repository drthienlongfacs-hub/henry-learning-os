#!/usr/bin/env node
/**
 * 50x Content Generator for Elite Learning OS
 * Target: 1,900+ scenarios (38 current × 50)
 * Pillars: Probability, Finance/WantsVsNeeds, Civics, Ethics, Negotiation
 * Age groups: 6-10 and 11+
 */
const fs = require('fs');

// ─── PROBABILITY (target: 400 = 8×50) ───
const PROB_TEMPLATES_KIDS = [
    // Dice & coins
    ...Array.from({ length: 30 }, (_, i) => {
        const faces = [4, 6, 8, 10, 12, 20]; const f = faces[i % 6];
        const target = Math.floor(Math.random() * f) + 1;
        return { q: `Con gieo xúc xắc ${f} mặt. Khả năng ra số ${target}?`, v: '🎲', a: f <= 4 ? 'likely' : 'unlikely', e: `Xúc xắc ${f} mặt: xác suất ra ${target} là 1/${f} = ${(100 / f).toFixed(0)}%.` };
    }),
    // Weather
    { q: 'Trời nắng chang chang, không một gợn mây. Khả năng mưa?', v: '☀️', a: 'unlikely', e: 'Không có mây = không có mưa. Rất khó xảy ra.' },
    { q: 'Bầu trời xám xịt, gió thổi mạnh. Khả năng mưa?', v: '🌪️', a: 'likely', e: 'Gió mạnh + mây xám = dấu hiệu mưa rõ ràng.' },
    { q: 'Mùa hè nóng bức, con bỏ kem ra ngoài. Kem có tan không?', v: '🍦', a: 'certain', e: 'Kem gặp nóng chắc chắn tan chảy 100%.' },
    { q: 'Con bỏ đá vào nước nóng. Đá có tan không?', v: '🧊', a: 'certain', e: 'Đá gặp nhiệt luôn tan.' },
    { q: 'Con thả bóng bay lên trời. Bóng có bay lên không?', v: '🎈', a: 'certain', e: 'Bóng bay chứa khí nhẹ hơn không khí, chắc chắn bay lên.' },
    { q: 'Con gieo 2 xúc xắc cùng lúc. Cả 2 đều ra số 6?', v: '🎲', a: 'unlikely', e: 'Xác suất = 1/6 × 1/6 = 1/36 ≈ 2.8%. Rất khó.' },
    { q: 'Bốc ngẫu nhiên 1 viên bi từ túi 10 bi xanh. Được bi xanh?', v: '🔵', a: 'certain', e: 'Tất cả đều xanh = 100% chắc chắn.' },
    { q: 'Bốc 1 viên bi từ túi có 5 bi đỏ và 5 bi xanh. Được bi đỏ?', v: '🔴', a: 'equal', e: '50% đỏ, 50% xanh = cơ hội ngang nhau.' },
    { q: 'Con tung đồng xu 10 lần. Cả 10 lần đều ngửa?', v: '🪙', a: 'unlikely', e: 'Xác suất = (1/2)^10 = 1/1024. Cực kỳ hiếm.' },
    { q: 'Mặt trời có mọc vào sáng mai không?', v: '🌅', a: 'certain', e: 'Trái đất quay quanh mặt trời, sáng mai chắc chắn có ánh sáng.' },
    { q: 'Con nhắm mắt bốc 1 bút từ hộp 3 bút đỏ, 1 bút xanh. Được bút đỏ?', v: '🖊️', a: 'likely', e: '3/4 = 75% cơ hội. Rất có khả năng.' },
    { q: 'Thả 1 hòn đá xuống nước. Đá nổi lên mặt nước?', v: '🪨', a: 'impossible', e: 'Đá nặng hơn nước, không thể nổi.' },
    { q: 'Con người nhảy từ mặt đất lên tới mặt trăng?', v: '🌙', a: 'impossible', e: 'Lực hấp dẫn quá mạnh, con người không thể nhảy tới mặt trăng.' },
    { q: 'Con có thể chạy nhanh hơn xe hơi trên đường cao tốc?', v: '🏎️', a: 'impossible', e: 'Tốc độ tối đa của con người ~45km/h, xe hơi ~120km/h.' },
    // Animals
    { q: 'Mèo nhà rơi từ trên cao xuống đất, nó đáp bằng 4 chân?', v: '🐱', a: 'likely', e: 'Mèo có phản xạ xoay người rất tốt, thường đáp bằng chân.' },
    { q: 'Con cá sống được trên cạn không có nước?', v: '🐟', a: 'impossible', e: 'Cá cần nước để thở bằng mang. Không thể sống trên cạn.' },
    { q: 'Trồng hạt đậu tưới nước đều, cây mọc lên?', v: '🌱', a: 'certain', e: 'Có đất, nước, ánh sáng = cây chắc chắn mọc.' },
    { q: 'Chim cánh cụt biết bay?', v: '🐧', a: 'impossible', e: 'Cánh cụt không có khả năng bay dù là loài chim.' },
    // Food & daily
    { q: 'Bỏ muối vào nước, nước có vị mặn?', v: '🧂', a: 'certain', e: 'Muối tan trong nước tạo vị mặn chắc chắn.' },
    { q: 'Ăn ớt cay nhưng miệng không cay?', v: '🌶️', a: 'impossible', e: 'Capsaicin trong ớt luôn kích thích vị giác gây cay.' },
    { q: 'Bỏ bánh mì vào lò nướng, bánh có nóng giòn?', v: '🍞', a: 'certain', e: 'Nhiệt từ lò sẽ làm bánh nóng và giòn.' },
    { q: 'Đổ nước vào cát, nước có thấm xuống?', v: '🏖️', a: 'certain', e: 'Cát có khe hở, nước chắc chắn thấm qua.' },
    { q: 'Xe đạp không ai đạp, tự chạy trên đường bằng?', v: '🚲', a: 'impossible', e: 'Không có lực tác động, xe không thể tự chạy.' },
];

const PROB_TEMPLATES_ADV = [
    { q: 'Monty Hall Problem: Đổi cửa sau khi MC mở 1 cửa trống?', v: '🚪', a: 'likely', e: 'Đổi cửa tăng xác suất thắng từ 1/3 lên 2/3.' },
    { q: 'Birthday Paradox: 23 người, 2 người trùng sinh nhật?', v: '🎂', a: 'equal', e: 'Xác suất ≈ 50.7%. Phản trực giác nhưng đúng toán học.' },
    { q: 'Gambler\'s Fallacy: Roulette ra đỏ 10 lần, lần 11 ra đen?', v: '🎰', a: 'equal', e: 'Mỗi lần quay độc lập. Quá khứ không ảnh hưởng.' },
    { q: 'Law of Large Numbers: Tung xu 10,000 lần, tỉ lệ ngửa gần 50%?', v: '📊', a: 'certain', e: 'Luật số lớn đảm bảo hội tụ về xác suất lý thuyết.' },
    { q: 'Bayes Theorem: Xét nghiệm 99% chính xác, bệnh hiếm 1/10000. Dương tính thật = ?', v: '🧬', a: 'unlikely', e: 'P(bệnh|+) ≈ 1% do tỉ lệ dương tính giả cao hơn.' },
    { q: 'Central Limit Theorem: Trung bình mẫu n=30 phân phối chuẩn?', v: '📈', a: 'likely', e: 'CLT: n≥30 thì phân phối mẫu xấp xỉ chuẩn.' },
    { q: 'St. Petersburg Paradox: Trả bao nhiêu cho trò chơi kỳ vọng vô hạn?', v: '💰', a: 'unlikely', e: 'Mặc dù kỳ vọng vô hạn, thực tế ít ai trả >$25.' },
    { q: 'Simpson\'s Paradox: Xu hướng đảo ngược khi gộp dữ liệu?', v: '🔄', a: 'likely', e: 'Dữ liệu tổng hợp có thể cho kết luận ngược.' },
    { q: 'Regression to the Mean: Lần thi đầu điểm cực cao, lần sau?', v: '📉', a: 'likely', e: 'Điểm cực đoan có xu hướng quay về trung bình.' },
    { q: 'Poisson Distribution: 2 tai nạn/tuần, xác suất 0 tai nạn tuần sau?', v: '🚗', a: 'unlikely', e: 'P(X=0) = e^(-2) ≈ 13.5%. Khá thấp.' },
    { q: 'Hot Hand Fallacy: Cầu thủ ghi 5 bàn liên tiếp, bàn 6 chắc chắn?', v: '⚽', a: 'equal', e: 'Hiệu ứng tay nóng thường là ảo giác thống kê.' },
    { q: 'Binomial: Tung xu 4 lần, đúng 3 ngửa?', v: '🪙', a: 'unlikely', e: 'C(4,3)×(0.5)^4 = 25%. Có thể nhưng không phổ biến.' },
    { q: 'Conditional Probability: Mưa hôm nay 60%, mưa liền 2 ngày = ?', v: '🌧️', a: 'unlikely', e: 'P = 0.6 × 0.6 = 0.36 = 36%.' },
    { q: 'Expected Value: Xổ số 1 triệu, 1/million thắng. Kỳ vọng = ?', v: '🎫', a: 'equal', e: 'EV = 1tr × 1/1tr - giá vé ≈ 0 hoặc âm.' },
    { q: 'Chi-square test: Xúc xắc gian lận nếu 1000 lần gieo lệch nhiều?', v: '📐', a: 'likely', e: 'Chi-square phát hiện bất thường phân phối.' },
];

// ─── WANTS VS NEEDS (target: 400 = 8×50) ───
const WVN_KIDS = [
    { n: 'Sữa tươi uống mỗi ngày', v: '🥛', c: 'need', e: 'Canxi giúp xương chắc khỏe. Cần thiết cho sức khỏe!' },
    { n: 'Bộ Lego Star Wars giới hạn', v: '🧱', c: 'want', e: 'Vui nhưng không cần thiết cho sức khỏe hay học tập.' },
    { n: 'Áo ấm mùa đông', v: '🧥', c: 'need', e: 'Giữ ấm cơ thể là nhu cầu thiết yếu khi trời lạnh.' },
    { n: 'Đôi giày thể thao đi học', v: '👟', c: 'need', e: 'Cần giày để bảo vệ chân và đi lại an toàn.' },
    { n: 'Kẹo mút size khổng lồ', v: '🍭', c: 'want', e: 'Chỉ là đồ ăn vặt, không cần cho sức khỏe.' },
    { n: 'Kem que 3 tầng', v: '🍦', c: 'want', e: 'Giải khát vui miệng nhưng không phải nhu cầu.' },
    { n: 'Sách Toán lớp 1', v: '📘', c: 'need', e: 'Sách giáo khoa cần thiết cho việc học.' },
    { n: 'Sticker dán lên mũ bảo hiểm', v: '⭐', c: 'want', e: 'Trang trí vui thôi, không ảnh hưởng an toàn.' },
    { n: 'Cơm trưa ở trường', v: '🍱', c: 'need', e: 'Ăn trưa giúp con có năng lượng học buổi chiều.' },
    { n: 'Điện thoại iPhone đời mới nhất', v: '📱', c: 'want', e: 'Trẻ nhỏ không cần điện thoại đắt tiền.' },
    { n: 'Thuốc nhỏ mắt khi đau mắt', v: '💧', c: 'need', e: 'Thuốc chữa bệnh là nhu cầu y tế.' },
    { n: 'Búp bê Barbie phiên bản giới hạn', v: '👸', c: 'want', e: 'Đồ chơi giới hạn = muốn, không phải cần.' },
    { n: 'Nước uống sạch mỗi ngày', v: '🚰', c: 'need', e: 'Nước sinh tồn, không thể thiếu.' },
    { n: 'Băng vệ sinh vết thương khi bị đứt tay', v: '🩹', c: 'need', e: 'Cầm máu và bảo vệ vết thương rất cần thiết.' },
    { n: 'Pháo hoa bông nhỏ đốt chơi', v: '🎇', c: 'want', e: 'Chỉ là trò vui, không phải nhu cầu.' },
    { n: 'Mũ bảo hiểm khi đi xe đạp', v: '⛑️', c: 'need', e: 'Bảo vệ đầu khỏi chấn thương, cần thiết!' },
    { n: 'Kính mát thời trang hình trái tim', v: '😎', c: 'want', e: 'Trang trí thôi, không bảo vệ thị lực tốt.' },
    { n: 'Kem chống nắng khi ra biển', v: '🧴', c: 'need', e: 'Bảo vệ da khỏi cháy nắng, rất cần.' },
    { n: 'Máy chơi game Nintendo Switch', v: '🎮', c: 'want', e: 'Giải trí vui nhưng không thiết yếu.' },
    { n: 'Chăn ấm khi ngủ mùa lạnh', v: '🛏️', c: 'need', e: 'Giữ ấm khi ngủ là nhu cầu cơ bản.' },
    { n: 'Bút chì viết bài', v: '✏️', c: 'need', e: 'Dụng cụ học tập cơ bản không thể thiếu.' },
    { n: 'Bình nước uống mang theo', v: '🍶', c: 'need', e: 'Uống nước suốt ngày rất cần bình chứa.' },
    { n: 'Gấu bông khổng lồ 2 mét', v: '🧸', c: 'want', e: 'Dễ thương nhưng chỉ là đồ chơi.' },
    { n: 'Dù che mưa khi đi bộ', v: '☂️', c: 'need', e: 'Tránh ướt và cảm lạnh, cần thiết!' },
    { n: 'Bộ tô màu 120 cây bút', v: '🖍️', c: 'want', e: '12 màu cơ bản đủ rồi, 120 chỉ là muốn thêm.' },
    { n: 'Giấy vệ sinh', v: '🧻', c: 'need', e: 'Nhu cầu vệ sinh cá nhân bắt buộc.' },
    { n: 'Đồng hồ thông minh Apple Watch', v: '⌚', c: 'want', e: 'Trẻ em không cần đồng hồ đắt tiền.' },
    { n: 'Rau xanh ăn kèm cơm', v: '🥬', c: 'need', e: 'Rau cung cấp vitamin và chất xơ cần thiết.' },
    { n: 'Bong bóng nước chơi mùa hè', v: '💦', c: 'want', e: 'Trò chơi vui nhưng không thiết yếu.' },
    { n: 'Xà phòng rửa tay', v: '🧼', c: 'need', e: 'Rửa tay sạch sẽ phòng bệnh rất quan trọng.' },
];

const WVN_ADV = [
    { n: 'Bảo hiểm y tế', v: '🏥', c: 'need', e: 'Mạng lưới an toàn tài chính khi ốm đau.' },
    { n: 'Túi xách hiệu Louis Vuitton', v: '👜', c: 'want', e: 'Hàng xa xỉ Veblen, giá trị biểu tượng > công năng.' },
    { n: 'Quỹ hưu trí', v: '🏦', c: 'need', e: 'Thu nhập thay thế khi không còn làm việc.' },
    { n: 'Xe thể thao Lamborghini', v: '🏎️', c: 'want', e: 'Di chuyển có xe bình dân đủ rồi.' },
    { n: 'Internet cáp quang gia đình', v: '📡', c: 'need', e: 'Thời đại số, kết nối là nhu cầu cơ bản.' },
    { n: 'Vé VIP concert K-pop', v: '🎤', c: 'want', e: 'Giải trí không ảnh hưởng sinh tồn.' },
    { n: 'Vitamin tổng hợp hàng ngày', v: '💊', c: 'want', e: 'Ăn uống cân bằng thì không cần bổ sung.' },
    { n: 'Giáo dục cơ bản 12 năm', v: '🎓', c: 'need', e: 'Nền tảng kiến thức và cơ hội việc làm.' },
    { n: 'Phần mềm Microsoft Office bản quyền', v: '💻', c: 'want', e: 'Có nhiều phần mềm miễn phí thay thế.' },
    { n: 'Nước sạch hệ thống lọc', v: '🚰', c: 'need', e: 'Nước sạch là quyền cơ bản của mọi người.' },
    { n: 'Đồng hồ Rolex Submariner', v: '⌚', c: 'want', e: 'Xem giờ có điện thoại. Rolex = biểu tượng địa vị.' },
    { n: 'Tiêm phòng vaccine cơ bản', v: '💉', c: 'need', e: 'Phòng bệnh truyền nhiễm, bảo vệ cộng đồng.' },
    { n: 'Giày sneaker limited edition', v: '👠', c: 'want', e: 'Resale culture, không phải nhu cầu đi lại.' },
    { n: 'Nhà ở che mưa che nắng', v: '🏠', c: 'need', e: 'Nơi trú ẩn an toàn là nhu cầu Maslow bậc 1.' },
    { n: 'Subscription Netflix Premium', v: '📺', c: 'want', e: 'Giải trí, không ảnh hưởng chất lượng sống.' },
];

// ─── CIRCLE OF CONTROL (target: 300 = 6×50) ───
const COC_KIDS = [
    { s: 'Bạn thân chuyển trường đi xa.', v: '😢', c: 'uncontrollable', e: 'Quyết định của gia đình bạn, con không thể thay đổi.' },
    { s: 'Con chọn đọc sách thay vì xem TV.', v: '📖', c: 'controllable', e: 'Lựa chọn cá nhân hoàn toàn do con quyết.' },
    { s: 'Cô giáo cho bài kiểm tra bất ngờ.', v: '📝', c: 'uncontrollable', e: 'Lịch kiểm tra do cô quyết định.' },
    { s: 'Con ôn bài chuẩn bị cho kiểm tra.', v: '📚', c: 'controllable', e: 'Nỗ lực học tập là của con.' },
    { s: 'Trời nóng quá không thể ra ngoài chơi.', v: '🥵', c: 'uncontrollable', e: 'Thời tiết nằm ngoài tầm kiểm soát.' },
    { s: 'Con uống đủ nước khi trời nóng.', v: '💧', c: 'controllable', e: 'Chăm sóc bản thân là việc con làm được.' },
    { s: 'Em bé khóc ré lên lúc nửa đêm.', v: '👶', c: 'uncontrollable', e: 'Em bé chưa biết kiểm soát, con không thể bắt em ngừng.' },
    { s: 'Con nói lời cảm ơn khi được cho quà.', v: '🎁', c: 'controllable', e: 'Lời nói lễ phép do con chọn.' },
    { s: 'Xe buýt đến trễ làm con muộn học.', v: '🚌', c: 'uncontrollable', e: 'Lịch xe buýt không do con điều khiển.' },
    { s: 'Con dậy sớm 15 phút để không vội.', v: '⏰', c: 'controllable', e: 'Thói quen buổi sáng con tự quyết.' },
    { s: 'WiFi nhà bị mất khi đang học online.', v: '📶', c: 'uncontrollable', e: 'Sự cố kỹ thuật ngoài tầm con.' },
    { s: 'Con xếp ngăn nắp góc học tập.', v: '🗂️', c: 'controllable', e: 'Không gian học là do con sắp xếp.' },
    { s: 'Bạn cùng bàn quay cóp bài con.', v: '👀', c: 'uncontrollable', e: 'Hành vi của bạn, con không kiểm soát được.' },
    { s: 'Con che bài mình và tập trung làm.', v: '✋', c: 'controllable', e: 'Bảo vệ bài của mình là quyết định đúng.' },
    { s: 'Mẹ bận việc không đón con đúng giờ.', v: '⏳', c: 'uncontrollable', e: 'Lịch làm việc của mẹ ngoài tầm con.' },
    { s: 'Con ngồi chờ mẹ ở chỗ an toàn.', v: '🏫', c: 'controllable', e: 'Chọn nơi an toàn để chờ là quyết định thông minh.' },
    { s: 'Cún con nhà hàng xóm sủa to suốt đêm.', v: '🐕', c: 'uncontrollable', e: 'Con vật không nghe lời con.' },
    { s: 'Con đeo tai nghe để không bị ồn.', v: '🎧', c: 'controllable', e: 'Tìm cách thích ứng là trong tầm kiểm soát.' },
    { s: 'Trận đấu bóng đá bị hủy vì mưa.', v: '⚽', c: 'uncontrollable', e: 'Thời tiết quyết định, không phải con.' },
    { s: 'Con tập thể dục trong nhà thay thế.', v: '🤸', c: 'controllable', e: 'Tìm phương án thay thế là kỹ năng tốt.' },
    { s: 'Bài thi được điểm thấp hơn mong đợi.', v: '😞', c: 'uncontrollable', e: 'Kết quả đã công bố, không thay đổi được.' },
    { s: 'Con xem lại bài làm sai để rút kinh nghiệm.', v: '📖', c: 'controllable', e: 'Học hỏi từ sai lầm là trong tầm kiểm soát.' },
    { s: 'Anh/chị trêu chọc con.', v: '😤', c: 'uncontrollable', e: 'Lời nói của người khác con không kiểm soát.' },
    { s: 'Con rời đi calmly thay vì cãi lại.', v: '🚶', c: 'controllable', e: 'Phản ứng bình tĩnh là sức mạnh nội tại.' },
    { s: 'Món đồ yêu thích bị hết hàng.', v: '🛒', c: 'uncontrollable', e: 'Tồn kho không do con quyết.' },
    { s: 'Con chọn món đồ khác phù hợp.', v: '🔄', c: 'controllable', e: 'Linh hoạt thay đổi lựa chọn.' },
    { s: 'Bạn không mời con dự tiệc sinh nhật.', v: '🎂', c: 'uncontrollable', e: 'Quyết định mời ai là của bạn đó.' },
    { s: 'Con vẫn chúc mừng sinh nhật bạn.', v: '💌', c: 'controllable', e: 'Tử tế dù không được mời.' },
];

const COC_ADV = [
    { s: 'Lạm phát tăng 15% làm giá xăng tăng gấp đôi.', v: '📈', c: 'uncontrollable', e: 'Chính sách tiền tệ vĩ mô ngoài tầm cá nhân.' },
    { s: 'Tự học coding 1 tiếng mỗi ngày.', v: '💻', c: 'controllable', e: 'Đầu tư vào bản thân hoàn toàn do mình.' },
    { s: 'AI thay thế nhiều việc làm truyền thống.', v: '🤖', c: 'uncontrollable', e: 'Xu hướng công nghệ toàn cầu.' },
    { s: 'Chủ động học kỹ năng mới để thích ứng.', v: '📚', c: 'controllable', e: 'Upskilling là quyết định cá nhân.' },
    { s: 'Đại dịch COVID bùng phát toàn cầu.', v: '🦠', c: 'uncontrollable', e: 'Dịch bệnh là biến cố vĩ mô.' },
    { s: 'Đeo khẩu trang và rửa tay thường xuyên.', v: '😷', c: 'controllable', e: 'Biện pháp phòng ngừa cá nhân.' },
    { s: 'Bạn bè unfriend trên mạng xã hội.', v: '📱', c: 'uncontrollable', e: 'Quyết định kết bạn của người khác.' },
    { s: 'Tập trung xây dựng mối quan hệ ngoài đời.', v: '🤝', c: 'controllable', e: 'Chất lượng quan hệ do mình tạo.' },
    { s: 'Động đất xảy ra bất ngờ.', v: '🌍', c: 'uncontrollable', e: 'Thiên tai ngoài tầm kiểm soát.' },
    { s: 'Chuẩn bị túi khẩn cấp sẵn sàng.', v: '🎒', c: 'controllable', e: 'Sẵn sàng ứng phó là trong tầm kiểm soát.' },
    { s: 'Giá Bitcoin lao dốc 50% qua đêm.', v: '₿', c: 'uncontrollable', e: 'Thị trường crypto biến động cực đoan.' },
    { s: 'Chỉ đầu tư số tiền sẵn sàng mất.', v: '💰', c: 'controllable', e: 'Quản lý rủi ro là trách nhiệm cá nhân.' },
    { s: 'Giáo viên đánh giá không công bằng.', v: '👨‍🏫', c: 'uncontrollable', e: 'Nhận xét chủ quan của người khác.' },
    { s: 'Chuẩn bị bài kỹ lưỡng với bằng chứng.', v: '📋', c: 'controllable', e: 'Sự chuẩn bị là vũ khí tốt nhất.' },
];

// ─── NEGOTIATION (target: 250 = 5×50) ───
const NEG_KIDS = [
    { sc: 'Ba muốn con ngủ trưa nhưng con muốn chơi.', ai: 'Ba Kiên Quyết', v: '😴', to: 'Thỏa thuận chơi 10 phút rồi ngủ', ww: 'Ba không bị con cãi, con không bị ép ngay.', sr: 'Ba ơi con không ngủ! Chơi tiếp đi!', sw: 'Ba ơi cho con chơi thêm 10 phút rồi con tự ngủ, được không ạ?' },
    { sc: 'Mẹ bảo ăn bông cải xanh nhưng con ghét.', ai: 'Mẹ Lo Dinh Dưỡng', v: '🥦', to: 'Thử ăn 3 miếng nhỏ', ww: 'Mẹ hài lòng con thử, con không phải ăn hết.', sr: 'Con không ăn cái này! Dở lắm!', sw: 'Mẹ ơi con sẽ thử 3 miếng nhỏ. Nếu con ăn hết, mẹ cho con ăn thêm trái cây tráng miệng nha?' },
    { sc: 'Con muốn nuôi chó nhưng ba mẹ chưa đồng ý.', ai: 'Ba Mẹ Thận Trọng', v: '🐶', to: 'Chứng minh trách nhiệm', ww: 'Ba mẹ thấy con đủ trách nhiệm, con có bạn đồng hành.', sr: 'Ba mẹ tệ quá! Ai cũng có chó hết!', sw: 'Con hứa sẽ tự dọn, tự cho ăn, và tự đi dạo chó mỗi ngày. Con viết cam kết cho ba mẹ kiểm tra 1 tháng trước khi mua được không?' },
    { sc: 'Bạn mượn đồ chơi nhưng không trả.', ai: 'Bạn Hay Quên', v: '🤔', to: 'Nhắc nhẹ và thỏa thuận hạn trả', ww: 'Bạn không bị xấu hổ, con lấy lại được đồ.', sr: 'Mày ăn cắp đồ chơi tao!', sw: 'Mình cho bạn mượn tuần trước nè. Ngày mai bạn mang trả mình nhé, mình cũng muốn chơi.' },
    { sc: 'Con muốn thức khuya xem phim hoạt hình.', ai: 'Mẹ Nghiêm Khắc', v: '📺', to: 'Thỏa thuận xem 1 tập rồi ngủ', ww: 'Mẹ không lo con thức quá khuya, con vẫn được xem.', sr: 'Mẹ ác quá! Con muốn xem hết!', sw: 'Mẹ cho con xem đúng 1 tập (20 phút) rồi con tự tắt TV nha? Con hứa sáng mai dậy đúng giờ.' },
    { sc: 'Con muốn mua đồ chơi nhưng tiết kiệm chưa đủ.', ai: 'Ba Dạy Tài Chính', v: '💰', to: 'Lập kế hoạch tiết kiệm', ww: 'Ba ủng hộ, con học được kiên nhẫn.', sr: 'Ba mua cho con đi! Con muốn ngay!', sw: 'Ba ơi con thiếu 50k nữa. Con sẽ tiết kiệm mỗi tuần 10k. 5 tuần nữa con mua được. Ba giữ tiền cho con nhé?' },
    { sc: 'Hai chị em tranh TV, mỗi người muốn xem kênh khác.', ai: 'Chị Gái', v: '📺', to: 'Chia sẻ thời gian', ww: 'Cả hai đều được xem chương trình mình thích.', sr: 'Em xem trước! Đưa điều khiển đây!', sw: 'Chị ơi mình chia nhé: chị xem 30 phút rồi đổi em 30 phút. Ai đi trước đi sau đoán số chẵn lẻ nha?' },
    { sc: 'Con muốn đi công viên nhưng mẹ bảo phải làm bài xong.', ai: 'Mẹ Coi Trọng Học', v: '🏞️', to: 'Hoàn thành bài rồi đi chơi', ww: 'Mẹ yên tâm về bài vở, con được đi chơi.', sr: 'Con ghét học! Đi chơi thôi!', sw: 'Mẹ cho con 45 phút làm xong bài Toán. Xong rồi mình đi công viên 1 tiếng nha mẹ?' },
    { sc: 'Con muốn ăn pizza nhưng mẹ nấu cơm rồi.', ai: 'Mẹ Đã Nấu Cơm', v: '🍕', to: 'Ăn cơm hôm nay, pizza cuối tuần', ww: 'Mẹ không phí công nấu, con có pizza cuối tuần.', sr: 'Con không ăn cơm! Pizza pizza!', sw: 'Mẹ nấu cơm ngon rồi con ăn hôm nay. Cuối tuần mình đặt pizza thưởng cho cả nhà nha mẹ?' },
    { sc: 'Bạn muốn con cho chép bài kiểm tra.', ai: 'Bạn Lười Học', v: '📝', to: 'Từ chối nhẹ nhàng và đề nghị giúp ôn', ww: 'Bạn không giận, con giữ được sự công bằng.', sr: 'Được thôi, chép đi (đưa bài).', sw: 'Mình không cho chép được vì cô phát hiện là cả hai bị phạt. Nhưng chiều nay mình ôn bài cùng nhau nhé?' },
];

const NEG_ADV = [
    { sc: 'Thỏa thuận lương với nhà tuyển dụng.', ai: 'HR Director', v: '💼', to: 'Lương cao hơn offer 15%', ww: 'Cả hai đều hài lòng với gói bồi thường.', sr: 'Offer này quá thấp, tôi từ chối!', sw: 'Tôi rất hứng thú với vị trí. Dựa trên kinh nghiệm và benchmark thị trường, mức X sẽ phù hợp hơn. Bạn nghĩ sao?' },
    { sc: 'Mua xe secondhand, người bán hét giá cao.', ai: 'Người Bán Xe Cũ', v: '🚗', to: 'Giảm 20% giá niêm yết', ww: 'Chốt giá hợp lý cho cả hai bên.', sr: 'Giá này điên rồ, tôi đi chỗ khác!', sw: 'Tôi thấy xe tương tự trên chợ tốt giá X. Nếu bạn chốt ở mức Y, tôi thanh toán tiền mặt ngay hôm nay.' },
    { sc: 'Chia công việc nhóm không đều.', ai: 'Bạn Nhóm Ỷ Lại', v: '👥', to: 'Phân chia công bằng', ww: 'Mọi người đều đóng góp, sản phẩm tốt hơn.', sr: 'Tao làm hết mày ngồi chơi à? Báo thầy!', sw: 'Mình chia công việc ra thành 4 phần, mỗi người chọn 1 phần mình giỏi nhé. Ai cũng có deadline chung.' },
    { sc: 'Thuê nhà, chủ nhà tăng giá 30%.', ai: 'Landlord Tham', v: '🏠', to: 'Giữ giá hoặc tăng <10%', ww: 'Chủ nhà giữ tenant tốt, bạn tiết kiệm.', sr: 'Giá này vô lý! Tôi dọn ngay!', sw: 'Tôi đã ở đây 3 năm, luôn trả đúng hạn. Tăng 30% vượt xa thị trường. Mức 5-8% phù hợp hơn. Tôi sẵn sàng ký dài hạn 2 năm.' },
    { sc: 'Trả lại sản phẩm lỗi, cửa hàng từ chối.', ai: 'Quản Lý Cửa Hàng', v: '🛍️', to: 'Đổi hoặc hoàn tiền', ww: 'Bạn được công bằng, cửa hàng giữ uy tín.', sr: 'Tôi sẽ đăng lên Facebook tố cáo!', sw: 'Theo luật bảo vệ người tiêu dùng, sản phẩm lỗi được đổi trong 7 ngày. Đây là hóa đơn. Tôi muốn đổi sản phẩm mới.' },
];

// ─── CIVICS/POLICY (target: 250 = 5×50) ───
const POL_KIDS = [
    {
        s: 'Trong lớp chỉ có 2 máy tính nhưng 10 bạn muốn dùng.', v: '💻', o: [
            { t: 'Lập bảng đăng ký luân phiên 15 phút/bạn', c: 'Mọi người đều có lượt, rất công bằng.', f: 95, h: 85 },
            { t: 'Ai chạy nhanh tới trước thì được dùng', c: 'Bạn chậm chân bị thiệt, không công bằng.', f: 15, h: 30 },
            { t: 'Cô giáo chọn 2 bạn giỏi nhất xài cả ngày', c: 'Có vẻ tuyên dương nhưng 8 bạn khác buồn.', f: 30, h: 25 }]
    },
    {
        s: 'Bạn mới chuyển trường đến, không ai chơi cùng.', v: '🧒', o: [
            { t: 'Rủ bạn mới vào nhóm chơi của mình', c: 'Bạn mới vui vẻ hòa nhập, mình có thêm bạn.', f: 90, h: 95 },
            { t: 'Mặc kệ, ai quen thì chơi', c: 'Bạn mới cô đơn, có thể bị bắt nạt.', f: 20, h: 20 },
            { t: 'Chờ bạn mới tự hòa nhập', c: 'Mất thời gian, bạn mới lo lắng.', f: 50, h: 40 }]
    },
    {
        s: 'Lớp bầu lớp trưởng, 2 bạn gần nhau phiếu bầu.', v: '🗳️', o: [
            { t: 'Bầu lại công khai, mỗi người 1 phiếu kín', c: 'Kết quả dân chủ, ai cũng chấp nhận.', f: 100, h: 80 },
            { t: 'Cô giáo tự chọn luôn', c: 'Nhanh nhưng các bạn không phục.', f: 40, h: 30 },
            { t: 'Hai bạn oẳn tù tì quyết định', c: 'Vui nhưng lãnh đạo nên được chọn bằng năng lực.', f: 50, h: 60 }]
    },
    {
        s: 'Sân bóng nhỏ, đội lớn chiếm hết không cho đội nhỏ chơi.', v: '⚽', o: [
            { t: 'Chia giờ: đội lớn 30 phút, đội nhỏ 30 phút', c: 'Công bằng cho cả hai đội.', f: 90, h: 85 },
            { t: 'Đội nào to hơn thì chơi trước', c: 'Bắt nạt kẻ yếu, không công bằng.', f: 10, h: 15 },
            { t: 'Gộp thành 1 đội chung chơi chung', c: 'Vui nhưng đội nhỏ yếu hơn sẽ không hòa nhập.', f: 60, h: 50 }]
    },
    {
        s: 'Căn tin hết suất cơm, 5 bạn cuối hàng không được ăn.', v: '🍽️', o: [
            { t: 'Chia sẻ: mỗi bạn có suất bớt lại 1 phần cho bạn thiếu', c: 'Mọi người đều ăn no, tình bạn gắn bó.', f: 85, h: 75 },
            { t: 'Ai xui thì nhịn, lần sau tới sớm', c: 'Bạn đói buồn, mất tinh thần học.', f: 20, h: 10 },
            { t: 'Gọi ngoài canteen mua thêm cơm', c: 'Tốn tiền thêm nhưng giải quyết được.', f: 70, h: 70 }]
    },
    {
        s: 'Nhóm trưởng giao hết việc khó cho 1 bạn.', v: '📋', o: [
            { t: 'Chia việc đều theo khả năng mỗi người', c: 'Mọi người cùng học, sản phẩm tốt hơn.', f: 95, h: 85 },
            { t: 'Ai giỏi nhất thì làm việc khó', c: 'Bạn giỏi quá tải, bạn yếu không được học.', f: 40, h: 30 },
            { t: 'Rút thăm ngẫu nhiên', c: 'Công bằng cơ hội nhưng có thể không hiệu quả.', f: 70, h: 55 }]
    },
    {
        s: 'Hộp bút màu dùng chung bị gãy mất 3 cây.', v: '🖍️', o: [
            { t: 'Cả lớp góp tiền mua bộ mới', c: 'Công bằng chia sẻ, ai cũng dùng được.', f: 85, h: 80 },
            { t: 'Tìm bạn làm gãy bắt đền', c: 'Có thể đúng thủ phạm nhưng gây mâu thuẫn.', f: 50, h: 40 },
            { t: 'Dùng bút còn lại, kệ đi', c: 'Thiếu màu ảnh hưởng bài vẽ.', f: 40, h: 30 }]
    },
    {
        s: 'Con mèo hoang đói nằm trước cổng trường.', v: '🐱', o: [
            { t: 'Các bạn góp đồ ăn thừa cho mèo', c: 'Mèo được ăn, các bạn học lòng thương.', f: 85, h: 90 },
            { t: 'Đuổi mèo đi cho sạch cổng trường', c: 'Mèo đói thêm, thiếu lòng trắc ẩn.', f: 20, h: 15 },
            { t: 'Gọi cơ sở cứu hộ đến', c: 'Giải pháp chuyên nghiệp nhưng mất thời gian.', f: 75, h: 70 }]
    },
];

// ─── ASSEMBLE & WRITE ───
function buildProbPool() {
    const kids = PROB_TEMPLATES_KIDS.map((p, i) => ({
        id: `prob-gen-kid-${i + 1}`, ageTarget: '6-10', question: p.q, visual: p.v,
        correctAnswer: p.a, options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: p.e
    }));
    const adv = PROB_TEMPLATES_ADV.map((p, i) => ({
        id: `prob-gen-adv-${i + 1}`, ageTarget: '11+', question: p.q, visual: p.v,
        correctAnswer: p.a, options: ['impossible', 'unlikely', 'equal', 'likely', 'certain'], explanation: p.e
    }));
    return [...kids, ...adv];
}

function buildWvnPool() {
    const kids = WVN_KIDS.map((w, i) => ({
        id: `wvn-gen-kid-${i + 1}`, ageTarget: '6-10', name: w.n, visual: w.v,
        correctCategory: w.c, explanation: w.e
    }));
    const adv = WVN_ADV.map((w, i) => ({
        id: `wvn-gen-adv-${i + 1}`, ageTarget: '11+', name: w.n, visual: w.v,
        correctCategory: w.c, explanation: w.e
    }));
    return [...kids, ...adv];
}

function buildCocPool() {
    const kids = COC_KIDS.map((c, i) => ({
        id: `coc-gen-kid-${i + 1}`, ageTarget: '6-10', situation: c.s, visual: c.v,
        correctCategory: c.c, explanation: c.e
    }));
    const adv = COC_ADV.map((c, i) => ({
        id: `coc-gen-adv-${i + 1}`, ageTarget: '11+', situation: c.s, visual: c.v,
        correctCategory: c.c, explanation: c.e
    }));
    return [...kids, ...adv];
}

function buildNegPool() {
    const kids = NEG_KIDS.map((n, i) => ({
        id: `neg-gen-kid-${i + 1}`, ageTarget: '6-10', scenario: n.sc, aiPersonality: n.ai,
        visual: n.v, targetOutcome: n.to, winWinCriteria: n.ww,
        sampleRequest: n.sr, sampleWinWin: n.sw
    }));
    const adv = NEG_ADV.map((n, i) => ({
        id: `neg-gen-adv-${i + 1}`, ageTarget: '11+', scenario: n.sc, aiPersonality: n.ai,
        visual: n.v, targetOutcome: n.to, winWinCriteria: n.ww,
        sampleRequest: n.sr, sampleWinWin: n.sw
    }));
    return [...kids, ...adv];
}

function buildPolPool() {
    return POL_KIDS.map((p, i) => ({
        id: `pol-gen-kid-${i + 1}`, ageTarget: '6-10', situation: p.s, visual: p.v,
        options: p.o.map(o => ({ text: o.t, consequence: o.c, fairnessScore: o.f, happinessScore: o.h }))
    }));
}

// Generate
const prob = buildProbPool();
const wvn = buildWvnPool();
const coc = buildCocPool();
const neg = buildNegPool();
const pol = buildPolPool();

const total = prob.length + wvn.length + coc.length + neg.length + pol.length;

console.log('=== 50x Content Generation Report ===');
console.log(`Probability:    ${prob.length} (${prob.filter(p => p.ageTarget === '6-10').length} kids + ${prob.filter(p => p.ageTarget === '11+').length} adv)`);
console.log(`WantsVsNeeds:   ${wvn.length} (${wvn.filter(p => p.ageTarget === '6-10').length} kids + ${wvn.filter(p => p.ageTarget === '11+').length} adv)`);
console.log(`CircleControl:  ${coc.length} (${coc.filter(p => p.ageTarget === '6-10').length} kids + ${coc.filter(p => p.ageTarget === '11+').length} adv)`);
console.log(`Negotiation:    ${neg.length} (${neg.filter(p => p.ageTarget === '6-10').length} kids + ${neg.filter(p => p.ageTarget === '11+').length} adv)`);
console.log(`Civics/Policy:  ${pol.length} (all kids)`);
console.log(`────────────────────────────`);
console.log(`TOTAL NEW:      ${total}`);
console.log(`EXISTING:       38`);
console.log(`GRAND TOTAL:    ${total + 38}`);
console.log(`MULTIPLIER:     ${((total + 38) / 38).toFixed(1)}x`);

// Write JSON for import
fs.writeFileSync('scripts/generated_data.json', JSON.stringify({
    probability: prob, wantsVsNeeds: wvn, circleOfControl: coc,
    negotiation: neg, policy: pol, meta: { total, generated: new Date().toISOString() }
}, null, 2));

console.log('\n✅ Written to scripts/generated_data.json');
