// MEGA EXPAND: WVN → 100+, COC → 100+, NEG → 60+, POL → 60+
// Based on: CASEL, Jump$tart/CFPB, Harvard PON, Kohlberg, CHARACTER COUNTS!
const fs = require('fs');
const path = require('path');
const genPath = path.join(__dirname, 'generated_data.json');
const gen = JSON.parse(fs.readFileSync(genPath, 'utf8'));

// ═════ WVN BULK (Jump$tart/CFPB T-Chart framework) ═════
const wvn_bulk_kids = [
  // Needs — based on Maslow + CFPB essentials
  {n:'Nước uống sạch mỗi ngày',v:'💧',c:'need',e:'Maslow bậc 1: nước là thiết yếu sinh tồn.'},
  {n:'Cơm trưa ở trường',v:'🍱',c:'need',e:'Dinh dưỡng cần cho học tập và phát triển.'},
  {n:'Áo ấm mùa đông',v:'🧥',c:'need',e:'Bảo vệ cơ thể khỏi lạnh — nhu cầu sinh lý.'},
  {n:'Giày thể dục đi học',v:'👟',c:'need',e:'Bảo vệ chân, cần cho thể chất.'},
  {n:'Vở viết bài tập',v:'📓',c:'need',e:'Dụng cụ học tập cơ bản bắt buộc.'},
  {n:'Bút chì và tẩy',v:'✏️',c:'need',e:'Không có bút thì không viết bài được.'},
  {n:'Hộp bút màu 12 màu cơ bản',v:'🖍️',c:'need',e:'Môn mỹ thuật yêu cầu bút màu.'},
  {n:'Khăn mặt sạch',v:'🧣',c:'need',e:'Vệ sinh mặt hàng ngày.'},
  {n:'Kem đánh răng trẻ em',v:'🪥',c:'need',e:'Sức khỏe răng miệng cần thiết.'},
  {n:'Dầu gội đầu',v:'🧴',c:'need',e:'Tóc sạch, da đầu khỏe.'},
  {n:'Quần áo đồng phục',v:'👔',c:'need',e:'Trường bắt buộc mặc đồng phục.'},
  {n:'Cặp sách đi học',v:'🎒',c:'need',e:'Đựng sách vở thiết yếu.'},
  {n:'Mũ bảo hiểm đi xe',v:'⛑️',c:'need',e:'An toàn giao thông bắt buộc.'},
  {n:'Thuốc cảm khi bị ốm',v:'💊',c:'need',e:'Sức khỏe là nhu cầu cơ bản.'},
  {n:'Đèn bàn học buổi tối',v:'💡',c:'need',e:'Ánh sáng đủ bảo vệ mắt.'},
  {n:'Bình nước mang theo',v:'🫗',c:'need',e:'Uống đủ nước suốt ngày.'},
  {n:'Kem chống nắng',v:'🧴',c:'need',e:'Bảo vệ da khi ra ngoài nắng.'},
  {n:'Nón che nắng đi học',v:'🧢',c:'need',e:'Tránh nắng nóng đầu.'},
  {n:'Tất/vớ sạch mỗi ngày',v:'🧦',c:'need',e:'Vệ sinh chân, tránh nấm.'},
  {n:'Thước kẻ học toán',v:'📏',c:'need',e:'Dụng cụ học tập cần thiết.'},
  // Wants — based on CFPB "not essential for survival"
  {n:'iPhone 16 Pro Max',v:'📱',c:'want',e:'Điện thoại bình dân đủ dùng, đây là xa xỉ.'},
  {n:'Bộ LEGO Star Wars 5000 mảnh',v:'🧱',c:'want',e:'Đồ chơi đắt tiền, bộ nhỏ đủ vui.'},
  {n:'Giày Nike Air Jordan limited',v:'👟',c:'want',e:'Giày bình thường đủ đi, Jordan = thời trang.'},
  {n:'Kem 3 tầng topping socola',v:'🍦',c:'want',e:'Ngon nhưng 1 tầng cũng đủ.'},
  {n:'Robot điều khiển từ xa',v:'🤖',c:'want',e:'Đồ chơi giải trí không thiết yếu.'},
  {n:'Máy chơi game Nintendo Switch',v:'🎮',c:'want',e:'Giải trí, không ảnh hưởng sinh tồn.'},
  {n:'Đồng hồ Apple Watch',v:'⌚',c:'want',e:'Xem giờ có điện thoại rồi.'},
  {n:'Búp bê Barbie sưu tầm',v:'👸',c:'want',e:'Sưu tầm thú vị nhưng không cần.'},
  {n:'Kẹo mút khổng lồ',v:'🍭',c:'want',e:'Ngon nhưng ăn nhiều sâu răng.'},
  {n:'Xe điện scooter',v:'🛴',c:'want',e:'Di chuyển vui nhưng đi bộ được.'},
  {n:'Sticker hoạt hình lấp lánh',v:'⭐',c:'want',e:'Trang trí xinh nhưng không cần.'},
  {n:'Slime đất nặn loại xịn',v:'🟢',c:'want',e:'Chơi vui nhưng hết cũng không sao.'},
  {n:'Máy chiếu phim mini',v:'🎥',c:'want',e:'Xem phim trên TV đủ rồi.'},
  {n:'Kính VR thực tế ảo',v:'🥽',c:'want',e:'Công nghệ giải trí cao cấp.'},
  {n:'Bể bơi phao bơm hơi',v:'🏊',c:'want',e:'Mùa hè vui nhưng không thiết yếu.'},
  {n:'Pokemon cards sưu tầm',v:'🃏',c:'want',e:'Sưu tầm phổ biến nhưng không cần.'},
  {n:'Headphone Bluetooth xịn',v:'🎧',c:'want',e:'Tai nghe dây cũng nghe nhạc được.'},
  {n:'Fidget spinner đắt tiền',v:'🌀',c:'want',e:'Đồ chơi giải stress, không thiết yếu.'},
  {n:'Thú bông gấu bông khổng lồ',v:'🧸',c:'want',e:'Dễ thương nhưng không ảnh hưởng sống.'},
  {n:'Vòng tay phát sáng',v:'��',c:'want',e:'Trang sức vui nhưng không cần.'},
].map((w,i) => ({id:'wvn-mega2-kid-'+(i+1),ageTarget:'6-10',name:w.n,visual:w.v,correctCategory:w.c,explanation:w.e}));

const wvn_bulk_adv = [
  {n:'Laptop cho việc học',v:'💻',c:'need',e:'Công cụ học tập thời đại số.'},
  {n:'Bảo hiểm y tế BHXH',v:'🛡️',c:'need',e:'Mạng lưới an toàn tài chính y tế.'},
  {n:'Khám sức khỏe định kỳ',v:'🏥',c:'need',e:'Phát hiện bệnh sớm cần thiết.'},
  {n:'Sách tham khảo ôn thi',v:'📚',c:'need',e:'Kiến thức quyết định tương lai.'},
  {n:'Xe đạp đi học 2km',v:'🚲',c:'need',e:'Phương tiện đi lại hàng ngày.'},
  {n:'Đồng hồ Rolex',v:'⌚',c:'want',e:'Casio xem giờ đủ rồi.'},
  {n:'Túi xách hiệu Gucci',v:'👜',c:'want',e:'Túi bình dân đủ đựng.'},
  {n:'PlayStation 5 Pro',v:'🎮',c:'want',e:'Giải trí cao cấp, không thiết yếu.'},
  {n:'Áo hoodie Supreme',v:'👕',c:'want',e:'Áo bình dân giữ ấm đủ.'},
  {n:'Vé concert VIP',v:'🎵',c:'want',e:'Trải nghiệm 1 lần, không thiết yếu.'},
].map((w,i) => ({id:'wvn-mega2-adv-'+(i+1),ageTarget:'11+',name:w.n,visual:w.v,correctCategory:w.c,explanation:w.e}));

// ═════ COC BULK (CASEL Self-Management + Responsible Decision-Making) ═════
const coc_bulk_kids = [
  {s:'Trời mưa to không đi được công viên.',v:'🌧️',c:'uncontrollable',e:'Thời tiết ngoài tầm kiểm soát.'},
  {s:'Con chọn đọc sách trước khi ngủ.',v:'📖',c:'controllable',e:'Thói quen tốt từ quyết định cá nhân.'},
  {s:'Bạn thân chuyển trường đi xa.',v:'😢',c:'uncontrollable',e:'Quyết định gia đình bạn, con không can thiệp.'},
  {s:'Con tập viết chữ đẹp mỗi ngày.',v:'✍️',c:'controllable',e:'Rèn luyện từ nỗ lực bản thân.'},
  {s:'Cúp điện giữa chừng xem phim.',v:'🔌',c:'uncontrollable',e:'Sự cố điện ngoài tầm kiểm soát.'},
  {s:'Con uống đủ 8 ly nước mỗi ngày.',v:'💧',c:'controllable',e:'Sức khỏe từ kỷ luật bản thân.'},
  {s:'Đội bóng con thích thua trận chung kết.',v:'⚽',c:'uncontrollable',e:'Kết quả thi đấu do nhiều yếu tố.'},
  {s:'Con ăn rau xanh mỗi bữa cơm.',v:'🥬',c:'controllable',e:'Dinh dưỡng là lựa chọn tốt.'},
  {s:'Máy bay bị delay 3 tiếng.',v:'✈️',c:'uncontrollable',e:'Lịch bay do hãng hàng không quyết định.'},
  {s:'Con sắp xếp bàn học gọn gàng.',v:'🗂️',c:'controllable',e:'Tổ chức không gian là quyết định.'},
  {s:'Ba mẹ phải đi công tác xa.',v:'🧳',c:'uncontrollable',e:'Công việc ba mẹ ngoài tầm con.'},
  {s:'Con nói "cảm ơn" khi nhận quà.',v:'🎁',c:'controllable',e:'Lễ phép là thái độ con chọn.'},
  {s:'Siêu thị hết đồ chơi con muốn mua.',v:'🏪',c:'uncontrollable',e:'Tồn kho siêu thị ngoài tầm.'},
  {s:'Con giúp mẹ dọn nhà mỗi cuối tuần.',v:'🏠',c:'controllable',e:'Phụ giúp gia đình là lựa chọn.'},
  {s:'Cô giáo bị ốm, thay giáo viên mới.',v:'📋',c:'uncontrollable',e:'Sức khỏe cô giáo ngoài tầm.'},
  {s:'Con luyện tập piano 20 phút mỗi ngày.',v:'🎹',c:'controllable',e:'Kỹ năng từ sự kiên nhẫn.'},
  {s:'Trận động đất làm trường hư hại.',v:'🌍',c:'uncontrollable',e:'Thiên tai hoàn toàn ngoài tầm.'},
  {s:'Con xin lỗi khi làm sai.',v:'🙏',c:'controllable',e:'Nhận lỗi là hành động can đảm.'},
  {s:'Hàng xóm nuôi gà gáy sáng sớm.',v:'🐓',c:'uncontrollable',e:'Hành vi hàng xóm ngoài tầm.'},
  {s:'Con tắt máy tính đúng giờ quy định.',v:'💻',c:'controllable',e:'Kỷ luật thời gian do con quyết.'},
  {s:'Bạn nói xấu con sau lưng.',v:'😤',c:'uncontrollable',e:'Lời nói của bạn, con không kiểm soát.'},
  {s:'Con chọn không nói xấu lại.',v:'🤐',c:'controllable',e:'Phản ứng của con là lựa chọn.'},
  {s:'Giá xăng tăng, xe buýt đông hơn.',v:'⛽',c:'uncontrollable',e:'Giá năng lượng do thị trường.'},
  {s:'Con đi bộ đến trường để khỏe hơn.',v:'🚶',c:'controllable',e:'Chọn đi bộ là quyết định tốt.'},
  {s:'Wifi nhà yếu tín hiệu.',v:'📶',c:'uncontrollable',e:'Hạ tầng mạng ngoài tầm con.'},
  {s:'Con đọc sách thay vì chờ wifi.',v:'📚',c:'controllable',e:'Thích ứng thông minh.'},
  {s:'Ông bà bị bệnh phải nằm viện.',v:'🏥',c:'uncontrollable',e:'Sức khỏe ông bà ngoài tầm.'},
  {s:'Con gọi điện hỏi thăm ông bà.',v:'📞',c:'controllable',e:'Quan tâm gia đình là lựa chọn.'},
  {s:'Em bé khóc to giữa đêm.',v:'👶',c:'uncontrollable',e:'Em bé chưa tự kiểm soát.'},
  {s:'Con đeo tai nghe để ngủ ngon.',v:'😴',c:'controllable',e:'Giải pháp thông minh.'},
].map((c,i)=>({id:'coc-mega2-kid-'+(i+1),ageTarget:'6-10',situation:c.s,visual:c.v,correctCategory:c.c,explanation:c.e}));

const coc_bulk_adv = [
  {s:'Lạm phát khiến đồ ăn đắt hơn.',v:'📈',c:'uncontrollable',e:'Kinh tế vĩ mô ngoài tầm.'},
  {s:'Lập ngân sách chi tiêu hàng tháng.',v:'📊',c:'controllable',e:'Quản lý tài chính cá nhân.'},
  {s:'Biến đổi khí hậu gây bão mạnh hơn.',v:'🌊',c:'uncontrollable',e:'Hiện tượng toàn cầu.'},
  {s:'Giảm rác thải nhựa cá nhân.',v:'♻️',c:'controllable',e:'Đóng góp nhỏ trong tầm tay.'},
  {s:'Công ty cắt giảm nhân sự.',v:'🏢',c:'uncontrollable',e:'Quyết định cấp lãnh đạo.'},
  {s:'Học thêm kỹ năng mới mỗi tháng.',v:'📚',c:'controllable',e:'Đầu tư bản thân.'},
  {s:'Tỉ giá ngoại tệ biến động.',v:'💱',c:'uncontrollable',e:'Chính sách tiền tệ quốc gia.'},
  {s:'Đa dạng hóa đầu tư tiết kiệm.',v:'📊',c:'controllable',e:'Quản trị rủi ro cá nhân.'},
  {s:'Dịch bệnh bùng phát bất ngờ.',v:'🦠',c:'uncontrollable',e:'Y tế cộng đồng ngoài tầm.'},
  {s:'Rửa tay thường xuyên, đeo khẩu trang.',v:'😷',c:'controllable',e:'Phòng ngừa cá nhân.'},
].map((c,i)=>({id:'coc-mega2-adv-'+(i+1),ageTarget:'11+',situation:c.s,visual:c.v,correctCategory:c.c,explanation:c.e}));

// ═════ NEG BULK (Harvard Mutual-Gains + Montessori Peace Talks) ═════
const neg_bulk_kids = [
  ['3 bạn muốn làm đội trưởng trò chơi.','Hai Bạn Khác','👑','Bầu cử/luân phiên','Ai cũng được cơ hội lãnh đạo.','Tao làm đội trưởng! Tao giỏi nhất!','Mỗi trò chơi 1 đội trưởng khác. Trò này bạn A, trò sau bạn B, con làm trò tiếp. Ai cũng được!'],
  ['Em muốn mẹ đi ngủ cùng nhưng mẹ mệt.','Mẹ Mệt Mỏi','😴','Thỏa hiệp thời gian','Mẹ nghỉ ngơi, em vẫn thấy an toàn.','Mẹ ngủ với con! Bây giờ!','Mẹ ơi, mẹ kể cho con 1 câu chuyện ngắn rồi mẹ nghỉ nhé. Con ôm gấu bông ngủ.'],
  ['Con muốn nuôi hamster, ba nói nhà chật.','Ba Thực Tế','🐹','Chứng minh khả năng chăm sóc','Ba thấy con có trách nhiệm.','Ba mua cho con!','Ba ơi, con nuôi hamster nhỏ trong hộp 30cm thôi. Con dọn mỗi ngày. Thử 2 tuần nếu hôi ba cho trả nhé?'],
  ['Bạn muốn con cho copy bài kiểm tra.','Bạn Nhờ Vả','📝','Giúp bạn hiểu bài, không cho copy','Bạn học được, con không gian lận.','Không cho copy!','Mình giải thích cách làm cho bạn hiểu. Mai trước giờ thi mình ôn chung 15 phút nhé?'],
  ['2 bạn tranh nhau ngồi cạnh cửa sổ xe buýt.','Bạn Cãi Nhau','🚌','Luân phiên theo chặng','Cả hai đều ngồi cửa sổ.','Tao ngồi trước!','Nửa đường đầu bạn ngồi, nửa sau mình đổi. Vậy ai cũng ngắm cảnh nhé!'],
  ['Con muốn mua kem nhưng chỉ đủ tiền 1 cây, em cũng muốn.','Em Bé','🍦','Chia sẻ 1 cây kem','Cả hai đều được ăn kem.','Kem của tao!','Mình mua 1 cây to rồi chia đôi. Em thích vị gì? Nửa em nửa anh nhé!'],
  ['Cô giao bài nhóm 4, nhưng 5 bạn muốn vào.','Bạn Thứ 5','👥','Xin cô cho nhóm 5','Không ai bị loại ra.','Đủ 4 rồi, bạn đi chỗ khác!','Cô ơi, nhóm con có 5 bạn muốn làm chung. Cho chúng con nhóm 5 được không ạ? Con hứa ai cũng làm.'],
  ['Anh lớn chiếm hết ghế sofa xem TV.','Anh Trai Lớn','🛋️','Chia thời gian sofa','Cả hai đều thoải mái.','Em đi chỗ khác!','Anh xem 30 phút nữa rồi em ngồi nhé. Em mang gối ra ngồi cạnh anh luôn, cùng xem.'],
  ['Mẹ bảo đi ngủ 8 giờ nhưng phim chưa hết.','Mẹ Nghiêm Khắc','🌙','Xem nốt + ngủ sớm mai','Mẹ đồng ý, con giữ kỷ luật.','Con xem hết đã!','Mẹ ơi phim còn 15 phút. Con xem nốt rồi ngủ ngay, mai con dậy sớm 15 phút bù lại.'],
  ['Bạn rủ đi chơi xa nhưng con chưa xin phép ba mẹ.','Bạn Hào Hứng','🏖️','Xin phép trước khi đi','Ba mẹ yên tâm, con được đi.','Đi luôn! Về nói sau!','Bạn ơi đợi mình hỏi ba mẹ 5 phút. Nếu ba mẹ OK thì đi ngay. Mình gọi điện luôn nhé!'],
].map((n,i) => ({id:'neg-mega2-kid-'+(i+1),ageTarget:'6-10',scenario:n[0],aiPersonality:n[1],visual:n[2],targetOutcome:n[3],winWinCriteria:n[4],sampleRequest:n[5],sampleWinWin:n[6]}));

// MERGE
const existingIds = {
  wvn: new Set(gen.wantsVsNeeds.map(w=>w.id)),
  coc: new Set(gen.circleOfControl.map(c=>c.id)),
  neg: new Set(gen.negotiation.map(n=>n.id)),
};
gen.wantsVsNeeds = [...gen.wantsVsNeeds, ...wvn_bulk_kids.filter(x=>!existingIds.wvn.has(x.id)), ...wvn_bulk_adv.filter(x=>!existingIds.wvn.has(x.id))];
gen.circleOfControl = [...gen.circleOfControl, ...coc_bulk_kids.filter(x=>!existingIds.coc.has(x.id)), ...coc_bulk_adv.filter(x=>!existingIds.coc.has(x.id))];
gen.negotiation = [...gen.negotiation, ...neg_bulk_kids.filter(x=>!existingIds.neg.has(x.id))];

fs.writeFileSync(genPath, JSON.stringify(gen, null, 2));

// Regenerate expanded-data.ts
const probData = JSON.parse(fs.readFileSync(path.join(__dirname, 'prob_50x.json'), 'utf8'));
const probIds = new Set(gen.probability.map(p => p.id));
const newProb = probData.filter(p => !probIds.has(p.id));
const mergedProb = [...gen.probability, ...newProb];

const edPath = path.join(__dirname, '..', 'src/lib/elite/expanded-data.ts');
const tsContent = '// AUTO-GENERATED: 50x Content Expansion Bank\n'
  + '// Generated: ' + new Date().toISOString() + '\n'
  + '// Sources: CASEL, Jump\\$tart/CFPB, Harvard PON, Kohlberg, Alliance for Decision Ed\n'
  + '// DO NOT EDIT MANUALLY\n\n'
  + 'import type { AgeGroup, LikelihoodLevel } from "./engine";\n\n'
  + 'export const EXPANDED_PROBABILITY = ' + JSON.stringify(mergedProb, null, 2) + ' as const;\n\n'
  + 'export const EXPANDED_WANTS_VS_NEEDS = ' + JSON.stringify(gen.wantsVsNeeds, null, 2) + ' as const;\n\n'
  + 'export const EXPANDED_CIRCLE_OF_CONTROL = ' + JSON.stringify(gen.circleOfControl, null, 2) + ' as const;\n\n'
  + 'export const EXPANDED_NEGOTIATION = ' + JSON.stringify(gen.negotiation, null, 2) + ' as const;\n\n'
  + 'export const EXPANDED_POLICY = ' + JSON.stringify(gen.policy, null, 2) + ' as const;\n';

fs.writeFileSync(edPath, tsContent);

console.log('=== FINAL POOL AUDIT ===');
const c = a => a.length;
const kf = (a,age) => a.filter(x=>x.ageTarget===age).length;
console.log('Probability:', c(mergedProb), '(kids:', kf(mergedProb,'6-10'), 'adv:', kf(mergedProb,'11+'), ')');
console.log('WantsVsNeeds:', c(gen.wantsVsNeeds), '(kids:', kf(gen.wantsVsNeeds,'6-10'), 'adv:', kf(gen.wantsVsNeeds,'11+'), ')');
console.log('CircleOfControl:', c(gen.circleOfControl), '(kids:', kf(gen.circleOfControl,'6-10'), 'adv:', kf(gen.circleOfControl,'11+'), ')');
console.log('Negotiation:', c(gen.negotiation), '(kids:', kf(gen.negotiation,'6-10'), 'adv:', kf(gen.negotiation,'11+'), ')');
console.log('Policy:', c(gen.policy), '(kids:', kf(gen.policy,'6-10'), 'adv:', kf(gen.policy,'11+'), ')');
const total = c(mergedProb)+c(gen.wantsVsNeeds)+c(gen.circleOfControl)+c(gen.negotiation)+c(gen.policy);
console.log('GRAND TOTAL:', total);
