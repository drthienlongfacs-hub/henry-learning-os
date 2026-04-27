const fs = require('fs');

const base = JSON.parse(fs.readFileSync('scripts/generated_data.json', 'utf8'));
const probNew = JSON.parse(fs.readFileSync('scripts/prob_50x.json', 'utf8'));

// Deduplicate prob
const probIds = new Set(base.probability.map(p => p.id));
const newProb = probNew.filter(p => !probIds.has(p.id));
const mergedProb = [...base.probability, ...newProb];

// Constants for WVN, COC, NEG
const moreWVN_kids = [
  {n:'Giày dép đi mưa',v:'🥾',c:'need',e:'Bảo vệ chân khi trời mưa.'},
  {n:'Máy bay điều khiển từ xa',v:'✈️',c:'want',e:'Đồ chơi vui nhưng không thiết yếu.'},
  {n:'Kem đánh răng cho trẻ em',v:'🪥',c:'need',e:'Vệ sinh răng miệng hàng ngày.'},
  {n:'Bộ Pokemon cards sưu tầm',v:'🃏',c:'want',e:'Sưu tầm giải trí, không cần thiết.'},
  {n:'Cặp kính cận khi mắt yếu',v:'👓',c:'need',e:'Nhìn rõ bảng cần thiết cho việc học.'},
  {n:'Tai nghe Bluetooth xịn',v:'🎧',c:'want',e:'Nghe nhạc vui nhưng tai nghe dây cũng được.'},
  {n:'Áo khoác đi học mùa mưa',v:'🧥',c:'need',e:'Giữ ấm và khô ráo, cần thiết.'},
  {n:'Slime đất nặn màu loại xịn',v:'🟢',c:'want',e:'Chơi vui nhưng không ảnh hưởng cuộc sống.'},
  {n:'Cặp sách đi học bền chắc',v:'💼',c:'need',e:'Đựng sách vở đi học mỗi ngày.'},
  {n:'Vòng tay phát sáng',v:'💫',c:'want',e:'Đẹp mắt nhưng không cần thiết.'},
  {n:'Khăn mặt sạch hàng ngày',v:'🧣',c:'need',e:'Vệ sinh cá nhân cơ bản.'},
  {n:'Bộ lắp ráp xe tăng mô hình',v:'🔧',c:'want',e:'Sáng tạo nhưng không thiết yếu.'},
  {n:'Đèn bàn học buổi tối',v:'💡',c:'need',e:'Ánh sáng đủ bảo vệ mắt khi học.'},
  {n:'Kẹp tóc đính đá kim sa',v:'💎',c:'want',e:'Trang trí xinh nhưng không cần.'},
  {n:'Giấy vở viết bài hàng ngày',v:'📝',c:'need',e:'Dụng cụ học tập thiết yếu.'},
  {n:'Đồ chơi fidget spinner',v:'🌀',c:'want',e:'Giải stress nhưng không phải nhu cầu.'},
  {n:'Nón bảo hiểm đi xe đạp',v:'⛑️',c:'need',e:'An toàn giao thông bắt buộc.'},
  {n:'Sticker hoạt hình dán tập',v:'🌟',c:'want',e:'Trang trí vui nhưng không thiết yếu.'},
  {n:'Tất/vớ đi giày hàng ngày',v:'🧦',c:'need',e:'Giữ vệ sinh, tránh phồng rộp.'},
  {n:'Robot đồ chơi biến hình Transformer',v:'🤖',c:'want',e:'Đồ chơi giải trí không ảnh hưởng sống còn.'},
].map((w,i) => ({id:`wvn-mega-kid-${i+1}`,ageTarget:'6-10',name:w.n,visual:w.v,correctCategory:w.c,explanation:w.e}));

const moreWVN_adv = [
  {n:'Laptop cho việc học',v:'💻',c:'need',e:'Công cụ học tập thời đại số.'},
  {n:'Đồng hồ Casio G-Shock limited',v:'⌚',c:'want',e:'Xem giờ có điện thoại, G-Shock = phong cách.'},
  {n:'Tiền phòng trọ ở gần trường',v:'🏠',c:'need',e:'Nơi ở an toàn là Maslow bậc 1.'},
  {n:'Túi xách hiệu Gucci',v:'👜',c:'want',e:'Xa xỉ phẩm, túi bình dân đủ đựng.'},
  {n:'Bảo hiểm tai nạn cá nhân',v:'🛡️',c:'need',e:'Mạng lưới an toàn tài chính.'},
  {n:'PlayStation 5 Pro',v:'🎮',c:'want',e:'Giải trí, không ảnh hưởng sinh tồn.'},
  {n:'Khám sức khỏe định kỳ hàng năm',v:'🏥',c:'need',e:'Phát hiện bệnh sớm, cần thiết.'},
  {n:'Áo hoodie brand Supreme',v:'👕',c:'want',e:'Áo giữ ấm bình dân đủ rồi.'},
  {n:'Sách giáo khoa và tài liệu ôn thi',v:'📚',c:'need',e:'Kiến thức quyết định tương lai.'},
  {n:'Vé concert Taylor Swift VIP',v:'🎵',c:'want',e:'Trải nghiệm 1 lần, không thiết yếu.'},
].map((w,i) => ({id:`wvn-mega-adv-${i+1}`,ageTarget:'11+',name:w.n,visual:w.v,correctCategory:w.c,explanation:w.e}));

const mergedWVN = [...base.wantsVsNeeds, ...moreWVN_kids, ...moreWVN_adv];

const moreCOC_kids = [
  {s:'Cô giáo cho điểm không công bằng.',v:'📋',c:'uncontrollable',e:'Cách chấm điểm là quyền của cô.'},
  {s:'Con học thuộc bài trước khi thi.',v:'📖',c:'controllable',e:'Nỗ lực ôn bài là việc con làm.'},
  {s:'Ba mẹ cãi nhau ở nhà.',v:'😟',c:'uncontrollable',e:'Mâu thuẫn người lớn ngoài tầm con.'},
  {s:'Con viết nhật ký mỗi tối trước ngủ.',v:'📔',c:'controllable',e:'Thói quen tốt từ ý chí cá nhân.'},
  {s:'Bạn thân không muốn chơi chung nữa.',v:'💔',c:'uncontrollable',e:'Cảm xúc bạn ấy, con không ép được.'},
  {s:'Con mỉm cười chào mọi người mỗi sáng.',v:'😊',c:'controllable',e:'Thái độ tích cực do con chọn.'},
  {s:'Nhà hàng xóm phá đồ chơi bên ngoài.',v:'🏚️',c:'uncontrollable',e:'Hành vi hàng xóm ngoài tầm kiểm soát.'},
  {s:'Con khóa cửa cẩn thận trước khi đi.',v:'🔐',c:'controllable',e:'Cẩn thận bảo vệ đồ là việc con.'},
  {s:'Máy tính bị hỏng giữa chừng bài tập.',v:'💻',c:'uncontrollable',e:'Sự cố kỹ thuật bất ngờ.'},
  {s:'Con lưu bài thường xuyên để không mất.',v:'💾',c:'controllable',e:'Thói quen backup là phòng ngừa thông minh.'},
  {s:'Sân bóng bị chiếm bởi đội lớn hơn.',v:'⚽',c:'uncontrollable',e:'Đội khác quyết định, con không kiểm soát.'},
  {s:'Con tập thể dục 10 phút mỗi sáng.',v:'🏋️',c:'controllable',e:'Rèn luyện sức khỏe từ kỷ luật bản thân.'},
  {s:'Trường thay đổi lịch học đột ngột.',v:'📅',c:'uncontrollable',e:'Quyết định nhà trường.'},
  {s:'Con chuẩn bị sách vở từ tối hôm trước.',v:'🎒',c:'controllable',e:'Chuẩn bị sẵn sàng là lựa chọn.'},
  {s:'Bé em lấy đồ chơi của con mà không hỏi.',v:'👶',c:'uncontrollable',e:'Em bé chưa hiểu luật.'},
  {s:'Con nói "em ơi, hỏi anh/chị trước nhé".',v:'🗣️',c:'controllable',e:'Dạy em bé cách xin phép là trong tầm tay.'},
].map((c,i) => ({id:`coc-mega-kid-${i+1}`,ageTarget:'6-10',situation:c.s,visual:c.v,correctCategory:c.c,explanation:c.e}));

const moreCOC_adv = [
  {s:'Công ty cắt giảm nhân sự hàng loạt.',v:'🏢',c:'uncontrollable',e:'Quyết định doanh nghiệp ở cấp lãnh đạo.'},
  {s:'Đọc 30 phút sách chuyên ngành mỗi ngày.',v:'📚',c:'controllable',e:'Đầu tư tri thức là quyết định.'},
  {s:'Biến đổi khí hậu gây lũ lụt.',v:'🌊',c:'uncontrollable',e:'Hiện tượng toàn cầu.'},
  {s:'Giảm rác thải nhựa cá nhân.',v:'♻️',c:'controllable',e:'Đóng góp nhỏ nhưng trong tầm tay.'},
  {s:'Thi trượt do đề quá khó.',v:'📝',c:'uncontrollable',e:'Độ khó đề thi không do mình.'},
  {s:'Rút kinh nghiệm và ôn lại bài chưa vững.',v:'🔄',c:'controllable',e:'Học từ thất bại.'},
  {s:'Tỉ giá ngoại tệ biến động mạnh.',v:'💱',c:'uncontrollable',e:'Chính sách tiền tệ quốc gia.'},
  {s:'Đa dạng hóa danh mục đầu tư.',v:'📊',c:'controllable',e:'Quản trị rủi ro cá nhân.'},
].map((c,i) => ({id:`coc-mega-adv-${i+1}`,ageTarget:'11+',situation:c.s,visual:c.v,correctCategory:c.c,explanation:c.e}));

const mergedCOC = [...base.circleOfControl, ...moreCOC_kids, ...moreCOC_adv];

const moreNEG_kids = [
  {sc:'Con muốn xem phim nhưng chị đang xem.',ai:'Chị Gái',v:'📺',to:'Chia thời gian',ww:'Cả hai đều được xem.',sr:'Em xem trước!',sw:'Chị xem 30 phút rồi đổi em nhé? Mình oẳn tù tì ai trước.'},
  {sc:'Bạn muốn đổi sandwich nhưng con thích sandwich mình.',ai:'Bạn Cùng Bàn',v:'🥪',to:'Từ chối lịch sự',ww:'Bạn không buồn, con giữ đồ ăn.',sr:'Không đổi! Của tao!',sw:'Mình thích sandwich mình lắm. Nhưng mai mình mang thêm bánh chia bạn nhé?'},
  {sc:'Con muốn đi bơi nhưng ba bảo phải dọn phòng.',ai:'Ba Nghiêm Túc',v:'🏊',to:'Dọn xong rồi đi bơi',ww:'Ba hài lòng, con được đi bơi.',sr:'Con không dọn! Đi bơi ngay!',sw:'Ba cho con 30 phút dọn phòng sạch. Xong ba chở con đi bơi 1 tiếng nha ba?'},
  {sc:'Mẹ muốn con học đàn nhưng con thích vẽ.',ai:'Mẹ Kỳ Vọng',v:'🎨',to:'Thử cả hai',ww:'Mẹ hài lòng con mở rộng, con vẫn được vẽ.',sr:'Con ghét đàn! Chỉ thích vẽ!',sw:'Mẹ ơi con thử học đàn 1 tháng. Nếu con không thích thì cho con chuyển sang vẽ nhé?'},
  {sc:'Bạn rủ con chơi nhưng con đang làm bài.',ai:'Bạn Háo Hức',v:'🎮',to:'Hẹn chơi sau',ww:'Bạn không buồn, con hoàn thành bài.',sr:'Được rồi bỏ bài chơi luôn!',sw:'Mình cần 20 phút nữa làm xong bài. Sau đó mình chơi thoải mái nhé!'},
].map((n,i) => ({id:`neg-mega-kid-${i+1}`,ageTarget:'6-10',scenario:n.sc,aiPersonality:n.ai,visual:n.v,targetOutcome:n.to,winWinCriteria:n.ww,sampleRequest:n.sr,sampleWinWin:n.sw}));

const mergedNEG = [...base.negotiation, ...moreNEG_kids];

const tsContent = `// AUTO-GENERATED: 50x Content Expansion Bank
// Generated: ${new Date().toISOString()}
// DO NOT EDIT MANUALLY — regenerate via scripts/merge_all2.js

import type { AgeGroup, LikelihoodLevel } from "./engine";

export const EXPANDED_PROBABILITY = ${JSON.stringify(mergedProb, null, 2)} as const;

export const EXPANDED_WANTS_VS_NEEDS = ${JSON.stringify(mergedWVN, null, 2)} as const;

export const EXPANDED_CIRCLE_OF_CONTROL = ${JSON.stringify(mergedCOC, null, 2)} as const;

export const EXPANDED_NEGOTIATION = ${JSON.stringify(mergedNEG, null, 2)} as const;

export const EXPANDED_POLICY = ${JSON.stringify(base.policy, null, 2)} as const;
`;

fs.writeFileSync('src/lib/elite/expanded-data.ts', tsContent);
console.log('Successfully wrote expanded-data.ts with safe merging!');
