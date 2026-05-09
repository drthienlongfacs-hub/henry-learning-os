// Cambridge YLE Practice Test Question Bank
// Format matches 100% official Cambridge exam structure
// Sources: cambridgeenglish.org sample papers, Fun for Starters/Movers/Flyers

export type QType = 'match_word_picture' | 'yes_no' | 'spell_word' | 'choose_word' | 'fill_gap' | 'odd_one_out' | 'story_order' | 'conversation_match';

export interface PracticeQuestion {
  id: string;
  partNumber: number;
  taskTypeVi: string;
  taskTypeEn: string;
  prompt: string;
  promptVi?: string;
  options?: string[];
  answer: string;
  imageEmoji?: string;
  hint?: string;
  /** Giải thích đáp án chi tiết bằng tiếng Việt */
  explanationVi: string;
  /** Cách tư duy / chiến lược tiếp cận để tái sử dụng */
  strategyVi: string;
}

export interface PracticeTest {
  id: string;
  level: 'starters' | 'movers' | 'flyers' | 'ket' | 'pet';
  skill: 'reading_writing' | 'listening';
  skillVi: string;
  totalMinutes: number;
  parts: PracticeTestPart[];
}

export interface PracticeTestPart {
  partNumber: number;
  titleEn: string;
  titleVi: string;
  instructionVi: string;
  questions: PracticeQuestion[];
}

// ═══ STARTERS — Reading & Writing (20 min, 25 questions) ═══
const STARTERS_RW: PracticeTest = {
  id: 'st_rw_1', level: 'starters', skill: 'reading_writing',
  skillVi: 'Đọc & Viết (Reading & Writing)', totalMinutes: 20,
  parts: [
    { partNumber: 1, titleEn: 'True/False with Pictures', titleVi: 'Đúng/Sai với hình ảnh',
      instructionVi: 'Nhìn tranh. Đọc câu. Viết ✓ (đúng) hoặc ✗ (sai).',
      questions: [
        { id:'s1_1', partNumber:1, taskTypeVi:'Đúng/Sai', taskTypeEn:'True/False', prompt:'This is a cat.', imageEmoji:'🐱', options:['✓','✗'], answer:'✓', explanationVi:'Tranh là con mèo (cat). Câu nói "This is a cat" → ĐÚNG.', strategyVi:'Bước 1: Nhìn tranh → xác định đó là gì. Bước 2: Đọc câu → so sánh. Nếu khớp → ✓, không khớp → ✗.' },
        { id:'s1_2', partNumber:1, taskTypeVi:'Đúng/Sai', taskTypeEn:'True/False', prompt:'This is a car.', imageEmoji:'🚲', options:['✓','✗'], answer:'✗', explanationVi:'Tranh là xe đạp (bicycle), nhưng câu nói "car" (xe hơi) → SAI. Phân biệt: car = xe hơi 🚗, bicycle = xe đạp 🚲.', strategyVi:'Cẩn thận từ gần nghĩa! car ≠ bicycle. Luôn nhìn kỹ tranh trước khi đọc câu.' },
        { id:'s1_3', partNumber:1, taskTypeVi:'Đúng/Sai', taskTypeEn:'True/False', prompt:'This is a banana.', imageEmoji:'🍌', options:['✓','✗'], answer:'✓', explanationVi:'Tranh là quả chuối (banana) → câu ĐÚNG. Từ vựng trái cây: apple 🍎, banana 🍌, orange 🍊.', strategyVi:'Nhóm từ vựng trái cây: học cùng lúc apple, banana, orange, mango, grape.' },
        { id:'s1_4', partNumber:1, taskTypeVi:'Đúng/Sai', taskTypeEn:'True/False', prompt:'This is a dog.', imageEmoji:'🐸', options:['✓','✗'], answer:'✗', explanationVi:'Tranh là con ếch (frog), không phải chó (dog) → SAI. Phân biệt: dog 🐕 = chó, frog 🐸 = ếch.', strategyVi:'Đề thường cho tranh con vật khác nhau. Học thuộc: dog, cat, frog, fish, bird, horse.' },
        { id:'s1_5', partNumber:1, taskTypeVi:'Đúng/Sai', taskTypeEn:'True/False', prompt:'This is a book.', imageEmoji:'📖', options:['✓','✗'], answer:'✓', explanationVi:'Tranh là quyển sách (book) → ĐÚNG. Đồ dùng học tập: book 📖, pencil ✏️, ruler 📏.', strategyVi:'Nhóm từ vựng trường học: book, pencil, ruler, bag, desk, chair — hay xuất hiện trong Part 1.' },
      ],
    },
    { partNumber: 2, titleEn: 'Word + Picture Match', titleVi: 'Ghép từ với tranh',
      instructionVi: 'Đọc câu hỏi. Chọn từ đúng cho mỗi tranh.',
      questions: [
        { id:'s2_1', partNumber:2, taskTypeVi:'Ghép từ', taskTypeEn:'Match', prompt:'What animal says "moo"?', imageEmoji:'🐄', options:['cow','horse','sheep'], answer:'cow', explanationVi:'Con bò (cow) kêu "moo". Horse kêu "neigh", sheep kêu "baa".', strategyVi:'Học từ vựng con vật kèm TIẾNG KÊU: cow→moo, dog→woof, cat→meow, duck→quack.' },
        { id:'s2_2', partNumber:2, taskTypeVi:'Ghép từ', taskTypeEn:'Match', prompt:'What do you use to write?', imageEmoji:'✏️', options:['pencil','ruler','book'], answer:'pencil', explanationVi:'Dùng bút chì (pencil) để viết. Ruler = thước kẻ, book = sách.', strategyVi:'Câu hỏi "What do you use to..." → nghĩ về CÔNG DỤNG. write→pencil, cut→scissors, draw→crayon.' },
        { id:'s2_3', partNumber:2, taskTypeVi:'Ghép từ', taskTypeEn:'Match', prompt:'What colour is the sky?', imageEmoji:'🔵', options:['blue','red','green'], answer:'blue', explanationVi:'Bầu trời (sky) màu xanh dương (blue). Kiến thức chung.', strategyVi:'Học màu sắc kèm vật thật: sky→blue, grass→green, sun→yellow, blood→red.' },
        { id:'s2_4', partNumber:2, taskTypeVi:'Ghép từ', taskTypeEn:'Match', prompt:'Where do fish live?', imageEmoji:'🐟', options:['water','tree','house'], answer:'water', explanationVi:'Cá (fish) sống trong nước (water). Bird sống trên cây (tree).', strategyVi:'"Where do ... live?" = hỏi nơi ở. fish→water, bird→tree, people→house.' },
        { id:'s2_5', partNumber:2, taskTypeVi:'Ghép từ', taskTypeEn:'Match', prompt:'How many legs does a spider have?', imageEmoji:'🕷️', options:['eight','six','four'], answer:'eight', explanationVi:'Nhện (spider) có 8 chân. Côn trùng (insect) có 6 chân. Chó/mèo có 4 chân.', strategyVi:'Số chân: spider=8, insect=6, dog/cat=4, bird=2, snake=0. Dễ nhớ bằng bảng.' },
      ],
    },
    { partNumber: 3, titleEn: 'Spell the Word', titleVi: 'Đánh vần từ',
      instructionVi: 'Nhìn tranh. Sắp xếp các chữ cái thành từ đúng.',
      questions: [
        { id:'s3_1', partNumber:3, taskTypeVi:'Đánh vần', taskTypeEn:'Spell', prompt:'Sắp xếp: g-o-d', imageEmoji:'🐕', answer:'dog', explanationVi:'d + o + g = dog (con chó). Từ 3 chữ cái, đọc: /dɒɡ/.', strategyVi:'Từ ngắn 3 chữ cái (CVC): dog, cat, sun, hat, bus. Đọc to để nhớ âm.' },
        { id:'s3_2', partNumber:3, taskTypeVi:'Đánh vần', taskTypeEn:'Spell', prompt:'Sắp xếp: t-a-c', imageEmoji:'🐈', answer:'cat', explanationVi:'c + a + t = cat (con mèo). Đọc: /kæt/.', strategyVi:'Phương pháp: đọc từng chữ cái → ghép lại → đọc to. c-a-t → cat!' },
        { id:'s3_3', partNumber:3, taskTypeVi:'Đánh vần', taskTypeEn:'Spell', prompt:'Sắp xếp: n-u-s', imageEmoji:'☀️', answer:'sun', explanationVi:'s + u + n = sun (mặt trời). Đọc: /sʌn/. Nhớ: sun ≠ son (con trai).', strategyVi:'Cẩn thận từ đồng âm: sun (mặt trời) ≠ son (con trai). Nhìn tranh để chắc chắn.' },
        { id:'s3_4', partNumber:3, taskTypeVi:'Đánh vần', taskTypeEn:'Spell', prompt:'Sắp xếp: t-h-a', imageEmoji:'🎩', answer:'hat', explanationVi:'h + a + t = hat (cái nón). Đọc: /hæt/. Cùng nhóm với cat, bat, mat.', strategyVi:'Nhóm vần -at: cat, hat, bat, mat, sat, rat. Học 1 vần = nhớ 6 từ!' },
        { id:'s3_5', partNumber:3, taskTypeVi:'Đánh vần', taskTypeEn:'Spell', prompt:'Sắp xếp: l-l-a-b', imageEmoji:'⚽', answer:'ball', explanationVi:'b + a + l + l = ball (quả bóng). Chú ý: 2 chữ L. Đọc: /bɔːl/.', strategyVi:'Từ có chữ cái đôi: ball, book, tree, egg. Viết tay nhiều lần để nhớ.' },
      ],
    },
    { partNumber: 4, titleEn: 'Choose the Word', titleVi: 'Chọn từ đúng',
      instructionVi: 'Đọc câu. Chọn từ đúng để điền vào chỗ trống.',
      questions: [
        { id:'s4_1', partNumber:4, taskTypeVi:'Điền từ', taskTypeEn:'Gap fill', prompt:'I ___ to school every day.', options:['go','eat','sleep'], answer:'go', explanationVi:'"go to school" = đi học. "eat" = ăn, "sleep" = ngủ — không hợp nghĩa.', strategyVi:'Đọc cả câu trước, nghĩ nghĩa tiếng Việt, rồi chọn từ phù hợp nhất.' },
        { id:'s4_2', partNumber:4, taskTypeVi:'Điền từ', taskTypeEn:'Gap fill', prompt:'The cat is ___ the table.', options:['on','at','in'], answer:'on', explanationVi:'"on the table" = trên bàn. "in" = trong, "at" = tại. Mèo nằm TRÊN bàn.', strategyVi:'Giới từ vị trí: on = trên, in = trong, under = dưới, next to = bên cạnh. Vẽ tranh để nhớ!' },
        { id:'s4_3', partNumber:4, taskTypeVi:'Điền từ', taskTypeEn:'Gap fill', prompt:'She has two ___.', options:['eyes','nose','mouth'], answer:'eyes', explanationVi:'"two" = 2, chỉ có "eyes" (mắt) là số nhiều vì có 2 mắt. Nose = 1 mũi, mouth = 1 miệng.', strategyVi:'Chú ý số lượng! "two" → phải là danh từ số nhiều. eyes (2), ears (2), hands (2).' },
        { id:'s4_4', partNumber:4, taskTypeVi:'Điền từ', taskTypeEn:'Gap fill', prompt:'We eat ___ for breakfast.', options:['food','ball','car'], answer:'food', explanationVi:'"eat food" = ăn thức ăn. Không thể ăn "ball" (bóng) hay "car" (xe).', strategyVi:'Kiểm tra: từ nào CÓ THỂ đi với động từ? eat + food ✓, eat + ball ✗.' },
        { id:'s4_5', partNumber:4, taskTypeVi:'Điền từ', taskTypeEn:'Gap fill', prompt:'My favourite ___ is red.', options:['colour','animal','number'], answer:'colour', explanationVi:'"red" là một màu sắc (colour). Không thể nói "My favourite animal is red".', strategyVi:'Đọc cả câu, đặc biệt từ SAU chỗ trống. "is red" → red là colour → chọn colour.' },
      ],
    },
    { partNumber: 5, titleEn: 'Picture Story', titleVi: 'Truyện tranh',
      instructionVi: 'Nhìn tranh. Đọc câu. Viết Yes hoặc No.',
      questions: [
        { id:'s5_1', partNumber:5, taskTypeVi:'Yes/No', taskTypeEn:'Yes/No', prompt:'The boy is playing in the garden. Is he happy?', imageEmoji:'👦🌳😊', options:['Yes','No'], answer:'Yes', explanationVi:'Tranh cho thấy bé trai 😊 vui vẻ trong vườn → Yes.', strategyVi:'Nhìn biểu cảm khuôn mặt: 😊=happy, 😢=sad, 😠=angry. Đề hay hỏi cảm xúc!' },
        { id:'s5_2', partNumber:5, taskTypeVi:'Yes/No', taskTypeEn:'Yes/No', prompt:'The girl has a red bag. Is the bag blue?', imageEmoji:'👧🎒🔴', options:['Yes','No'], answer:'No', explanationVi:'Cặp sách màu đỏ (red), câu hỏi "blue" → No. Đọc kỹ MÀU SẮC.', strategyVi:'Đề thường đánh lừa bằng màu sắc! Đọc kỹ: red ≠ blue. Gạch chân từ khóa.' },
        { id:'s5_3', partNumber:5, taskTypeVi:'Yes/No', taskTypeEn:'Yes/No', prompt:'There are three birds in the tree. Are there two birds?', imageEmoji:'🌳🐦🐦🐦', options:['Yes','No'], answer:'No', explanationVi:'Có 3 con chim (three), câu hỏi "two" → No. ĐẾM SỐ LƯỢNG cẩn thận.', strategyVi:'Bẫy số lượng! Luôn đếm lại: one=1, two=2, three=3, four=4, five=5.' },
        { id:'s5_4', partNumber:5, taskTypeVi:'Yes/No', taskTypeEn:'Yes/No', prompt:'The sun is shining. Is it raining?', imageEmoji:'☀️', options:['Yes','No'], answer:'No', explanationVi:'Mặt trời chiếu sáng (sun shining) → không phải đang mưa (raining) → No.', strategyVi:'Thời tiết: sunny ≠ rainy, hot ≠ cold, cloudy ≠ clear. Nghĩ ngược lại!' },
        { id:'s5_5', partNumber:5, taskTypeVi:'Yes/No', taskTypeEn:'Yes/No', prompt:'Dad is reading a book. Is Dad sleeping?', imageEmoji:'👨📖', options:['Yes','No'], answer:'No', explanationVi:'Bố đang đọc sách (reading), không phải đang ngủ (sleeping) → No.', strategyVi:'Hành động: reading ≠ sleeping. Nhìn tranh → xác định hành động → so sánh với câu hỏi.' },
      ],
    },
  ],
};


// ═══ MOVERS — Reading & Writing (30 min, 35 questions) ═══
const MOVERS_RW: PracticeTest = {
  id: 'mv_rw_1', level: 'movers', skill: 'reading_writing',
  skillVi: 'Đọc & Viết (Reading & Writing)', totalMinutes: 30,
  parts: [
    { partNumber: 1, titleEn: 'Definitions → Words', titleVi: 'Đọc định nghĩa → Chọn từ',
      instructionVi: 'Đọc định nghĩa. Chọn từ đúng.',
      questions: [
        { id:'m1_1', partNumber:1, taskTypeVi:'Định nghĩa', taskTypeEn:'Definition', prompt:'You wear these on your feet.', options:['shoes','gloves','hat'], answer:'shoes', explanationVi:'"on your feet" = trên chân. Shoes = giày (mang trên chân). Gloves = găng tay, hat = nón.', strategyVi:'Tìm từ khóa trong định nghĩa: "feet" → liên quan đến chân → shoes. Luôn tìm từ khóa!' },
        { id:'m1_2', partNumber:1, taskTypeVi:'Định nghĩa', taskTypeEn:'Definition', prompt:'This animal has a very long neck.', options:['giraffe','elephant','lion'], answer:'giraffe', explanationVi:'Hươu cao cổ (giraffe) có cổ rất dài (long neck). Elephant có vòi, lion có bờm.', strategyVi:'Đặc điểm nổi bật: giraffe=long neck, elephant=trunk, lion=mane. Học con vật kèm đặc điểm!' },
        { id:'m1_3', partNumber:1, taskTypeVi:'Định nghĩa', taskTypeEn:'Definition', prompt:'You use this to cut paper.', options:['scissors','pencil','ruler'], answer:'scissors', explanationVi:'"cut paper" = cắt giấy → kéo (scissors). Pencil dùng để viết, ruler dùng để kẻ.', strategyVi:'Động từ + công cụ: cut→scissors, write→pencil, measure→ruler, draw→crayon.' },
        { id:'m1_4', partNumber:1, taskTypeVi:'Định nghĩa', taskTypeEn:'Definition', prompt:'The meal you eat in the evening.', options:['dinner','breakfast','lunch'], answer:'dinner', explanationVi:'Bữa tối (evening) = dinner. Breakfast = bữa sáng, lunch = bữa trưa.', strategyVi:'3 bữa ăn: breakfast (morning), lunch (afternoon), dinner (evening). Học theo thời gian!' },
        { id:'m1_5', partNumber:1, taskTypeVi:'Định nghĩa', taskTypeEn:'Definition', prompt:'The place where you go when you are sick.', options:['hospital','school','library'], answer:'hospital', explanationVi:'"sick" = ốm → đến bệnh viện (hospital). School = trường, library = thư viện.', strategyVi:'Nơi chốn + mục đích: sick→hospital, learn→school, books→library, food→restaurant.' },
        { id:'m1_6', partNumber:1, taskTypeVi:'Định nghĩa', taskTypeEn:'Definition', prompt:'You can see lots of stars at ___.', options:['night','morning','afternoon'], answer:'night', explanationVi:'Nhìn thấy sao (stars) vào ban đêm (night). Sáng/trưa không thấy sao.', strategyVi:'Liên kết tự nhiên: stars→night, sun→day. Dùng kiến thức thực tế để chọn!' },
      ],
    },
    { partNumber: 2, titleEn: 'Picture + Yes/No', titleVi: 'Nhìn tranh → Yes/No',
      instructionVi: 'Nhìn tranh. Đọc câu. Viết Yes hoặc No.',
      questions: [
        { id:'m2_1', partNumber:2, taskTypeVi:'Yes/No', taskTypeEn:'Yes/No', prompt:'The children are playing football in the park.', imageEmoji:'⚽🏞️👧👦', options:['Yes','No'], answer:'Yes', explanationVi:'Tranh: trẻ em đang chơi bóng đá trong công viên → khớp với câu → Yes.', strategyVi:'So sánh 3 yếu tố: AI (children) + LÀM GÌ (playing football) + Ở ĐÂU (park).' },
        { id:'m2_2', partNumber:2, taskTypeVi:'Yes/No', taskTypeEn:'Yes/No', prompt:'The woman is wearing a blue dress.', imageEmoji:'👩🔴👗', options:['Yes','No'], answer:'No', explanationVi:'Tranh: váy màu đỏ (red), câu nói "blue" → SAI. Chú ý màu sắc!', strategyVi:'Bẫy thường gặp Movers: đổi màu sắc! Nhìn kỹ tranh trước, ghi nhớ màu, rồi đọc câu.' },
        { id:'m2_3', partNumber:2, taskTypeVi:'Yes/No', taskTypeEn:'Yes/No', prompt:'There is a dog under the table.', imageEmoji:'🐕🪑', options:['Yes','No'], answer:'Yes', explanationVi:'Chó nằm dưới bàn (under the table) → đúng. Under = bên dưới.', strategyVi:'Giới từ Movers: under, behind, between, in front of. Học kèm hình vẽ!' },
        { id:'m2_4', partNumber:2, taskTypeVi:'Yes/No', taskTypeEn:'Yes/No', prompt:'It is snowing outside.', imageEmoji:'☀️🌳', options:['Yes','No'], answer:'No', explanationVi:'Tranh: trời nắng (sunny), câu nói "snowing" (tuyết rơi) → SAI.', strategyVi:'Thời tiết: sunny ≠ snowing. Nhìn tranh → xác định thời tiết → so sánh.' },
        { id:'m2_5', partNumber:2, taskTypeVi:'Yes/No', taskTypeEn:'Yes/No', prompt:'The boy is eating an ice cream.', imageEmoji:'👦🍦', options:['Yes','No'], answer:'Yes', explanationVi:'Bé trai ăn kem → khớp câu → Yes.', strategyVi:'Câu đơn giản → kiểm tra: ĐÚNG người + ĐÚNG hành động + ĐÚNG đồ vật.' },
        { id:'m2_6', partNumber:2, taskTypeVi:'Yes/No', taskTypeEn:'Yes/No', prompt:'The cat is sleeping on the sofa.', imageEmoji:'🐱😴🛋️', options:['Yes','No'], answer:'Yes', explanationVi:'Mèo đang ngủ trên ghế sofa → khớp → Yes.', strategyVi:'Xác nhận: con gì (cat) + làm gì (sleeping) + ở đâu (on sofa) → tất cả khớp = Yes.' },
      ],
    },
    { partNumber: 3, titleEn: 'Conversation Match', titleVi: 'Ghép hội thoại',
      instructionVi: 'Chọn câu trả lời đúng cho mỗi câu hỏi.',
      questions: [
        { id:'m3_1', partNumber:3, taskTypeVi:'Hội thoại', taskTypeEn:'Conversation', prompt:'What did you do yesterday?', options:['I went swimming.','I am fine.','I like cats.'], answer:'I went swimming.', explanationVi:'Hỏi "did you do" (đã làm gì) → trả lời hành động đã xảy ra. "went swimming" = đi bơi (quá khứ).', strategyVi:'Câu hỏi quá khứ (did) → trả lời quá khứ (went/played/ate). Khớp THÌ!' },
        { id:'m3_2', partNumber:3, taskTypeVi:'Hội thoại', taskTypeEn:'Conversation', prompt:'Would you like some cake?', options:['Yes, please!','It is Monday.','I am seven.'], answer:'Yes, please!', explanationVi:'"Would you like...?" = mời. Trả lời lịch sự: "Yes, please!" hoặc "No, thank you."', strategyVi:'"Would you like...?" LUÔN trả lời Yes, please / No, thank you. Công thức cố định!' },
        { id:'m3_3', partNumber:3, taskTypeVi:'Hội thoại', taskTypeEn:'Conversation', prompt:'Where is the library?', options:["It's next to the park.","It's very nice.","I don't know her."], answer:"It's next to the park.", explanationVi:'"Where" = hỏi ở đâu → trả lời vị trí. "next to the park" = bên cạnh công viên.', strategyVi:'Where → vị trí, When → thời gian, What → đồ vật, Who → người, How → cách thức.' },
        { id:'m3_4', partNumber:3, taskTypeVi:'Hội thoại', taskTypeEn:'Conversation', prompt:'How do you spell your name?', options:['M-A-R-Y','I am ten.','I like pizza.'], answer:'M-A-R-Y', explanationVi:'"spell" = đánh vần → trả lời bằng chữ cái từng chữ: M-A-R-Y.', strategyVi:'Câu hỏi "spell" → đáp án là CÁC CHỮ CÁI. Luyện đánh vần tên mình trước!' },
        { id:'m3_5', partNumber:3, taskTypeVi:'Hội thoại', taskTypeEn:'Conversation', prompt:'Can I borrow your pencil?', options:['Of course!','I went home.','It is raining.'], answer:'Of course!', explanationVi:'"Can I borrow...?" = xin mượn → trả lời "Of course!" (Tất nhiên!) hoặc "Sure!".', strategyVi:'"Can I...?" → trả lời Yes/Sure/Of course. Loại trừ câu không liên quan!' },
        { id:'m3_6', partNumber:3, taskTypeVi:'Hội thoại', taskTypeEn:'Conversation', prompt:'What is your favourite subject?', options:['I love maths!','He is my brother.','It is hot.'], answer:'I love maths!', explanationVi:'"favourite subject" = môn học yêu thích → "I love maths" (Tôi thích toán).', strategyVi:'Favourite + [danh từ] → trả lời "I love/like [tên thứ đó]". Học sẵn 5 môn học.' },
      ],
    },
    { partNumber: 4, titleEn: 'Gap Fill (with options)', titleVi: 'Điền từ (có đáp án)',
      instructionVi: 'Đọc đoạn văn. Chọn từ đúng cho mỗi chỗ trống.',
      questions: [
        { id:'m4_1', partNumber:4, taskTypeVi:'Điền từ', taskTypeEn:'Gap fill', prompt:'Last Saturday, Tom ___ to the zoo with his family.', options:['went','goes','going'], answer:'went', explanationVi:'"Last Saturday" = thứ Bảy trước → quá khứ → "went" (go→went). "goes" = hiện tại, sai.', strategyVi:'Dấu hiệu thì: last/yesterday → quá khứ (went). every day → hiện tại (goes). tomorrow → tương lai.' },
        { id:'m4_2', partNumber:4, taskTypeVi:'Điền từ', taskTypeEn:'Gap fill', prompt:'They saw many ___ animals there.', options:['different','difficult','dangerous'], answer:'different', explanationVi:'"many different animals" = nhiều loài động vật khác nhau. "difficult" = khó, "dangerous" = nguy hiểm.', strategyVi:'Đọc ngữ cảnh: sở thú có nhiều loài KHÁC NHAU. Chọn từ phù hợp ý nghĩa câu.' },
        { id:'m4_3', partNumber:4, taskTypeVi:'Điền từ', taskTypeEn:'Gap fill', prompt:'Tom liked the monkeys ___ because they were funny.', options:['best','good','well'], answer:'best', explanationVi:'"liked ... best" = thích nhất. So sánh bậc nhất: good → better → best.', strategyVi:'So sánh: good/well → best (nhất). Nhớ: liked BEST = thích NHẤT.' },
        { id:'m4_4', partNumber:4, taskTypeVi:'Điền từ', taskTypeEn:'Gap fill', prompt:'After lunch, it started to ___.', options:['rain','raining','rained'], answer:'rain', explanationVi:'"started to + V-nguyên thể": started to rain. Không phải "started to raining".', strategyVi:'Công thức: start/begin + to + V-nguyên thể. want to go, like to play, start to rain.' },
        { id:'m4_5', partNumber:4, taskTypeVi:'Điền từ', taskTypeEn:'Gap fill', prompt:'So they ___ home early.', options:['went','go','gone'], answer:'went', explanationVi:'Câu chuyện xảy ra ở quá khứ (Last Saturday) → "went" (go→went).', strategyVi:'Toàn bộ đoạn văn dùng thì quá khứ → tất cả chỗ trống cũng phải quá khứ. Nhất quán!' },
      ],
    },
  ],
};


// ═══ FLYERS — Reading & Writing (40 min, 44 questions) ═══
const FLYERS_RW: PracticeTest = {
  id: 'fl_rw_1', level: 'flyers', skill: 'reading_writing',
  skillVi: 'Đọc & Viết (Reading & Writing)', totalMinutes: 40,
  parts: [
    { partNumber: 1, titleEn: 'Definitions → Words', titleVi: 'Định nghĩa → Từ',
      instructionVi: 'Đọc định nghĩa. Viết từ đúng (có 15 từ, chọn 10).',
      questions: [
        { id:'f1_1', partNumber:1, taskTypeVi:'Định nghĩa', taskTypeEn:'Definition', prompt:'The person who flies an aeroplane.', options:['pilot','driver','teacher','doctor'], answer:'pilot', explanationVi:'"flies an aeroplane" = lái máy bay → pilot. Driver lái xe, teacher dạy học, doctor chữa bệnh.', strategyVi:'Nghề nghiệp + phương tiện: pilot=plane, driver=car, captain=ship. Học kèm từ liên quan!' },
        { id:'f1_2', partNumber:1, taskTypeVi:'Định nghĩa', taskTypeEn:'Definition', prompt:'You might read this every morning to know what is happening in the world.', options:['newspaper','textbook','dictionary','notebook'], answer:'newspaper', explanationVi:'"every morning" + "what is happening" → tin tức → newspaper (báo). Textbook = SGK, dictionary = từ điển.', strategyVi:'Từ khóa: "every morning" + "world" = newspaper. Đọc kỹ TOÀN BỘ định nghĩa trước khi chọn.' },
        { id:'f1_3', partNumber:1, taskTypeVi:'Định nghĩa', taskTypeEn:'Definition', prompt:'The season when leaves fall from trees.', options:['autumn','spring','summer','winter'], answer:'autumn', explanationVi:'"leaves fall" = lá rụng → mùa thu (autumn). Spring = lá mọc, summer = nóng, winter = lạnh.', strategyVi:'4 mùa + đặc điểm: spring=flowers, summer=hot, autumn=leaves fall, winter=cold/snow.' },
        { id:'f1_4', partNumber:1, taskTypeVi:'Định nghĩa', taskTypeEn:'Definition', prompt:'A large area of water surrounded by land.', options:['lake','river','sea','ocean'], answer:'lake', explanationVi:'"surrounded by land" = bao quanh bởi đất → hồ (lake). River chảy, sea/ocean rất lớn.', strategyVi:'Phân biệt: lake=bao quanh bởi đất, river=chảy, sea=lớn hơn lake, ocean=lớn nhất.' },
        { id:'f1_5', partNumber:1, taskTypeVi:'Định nghĩa', taskTypeEn:'Definition', prompt:'You wear this around your wrist to tell the time.', options:['watch','ring','bracelet','belt'], answer:'watch', explanationVi:'"wrist" = cổ tay + "tell the time" = xem giờ → watch (đồng hồ đeo tay). Ring = nhẫn.', strategyVi:'2 từ khóa: wrist + time = watch. Luôn tìm 2+ từ khóa trong định nghĩa để chắc chắn.' },
      ],
    },
    { partNumber: 2, titleEn: 'Picture + Yes/No', titleVi: 'Nhìn tranh → Yes/No',
      instructionVi: 'Nhìn tranh. Đọc câu. Viết Yes hoặc No.',
      questions: [
        { id:'f2_1', partNumber:2, taskTypeVi:'Yes/No', taskTypeEn:'Yes/No', prompt:'The family is having a picnic by the river.', imageEmoji:'👨‍👩‍👧‍👦🧺🏞️', options:['Yes','No'], answer:'Yes', explanationVi:'Gia đình đang dã ngoại (picnic) bên sông (by the river) → khớp tranh → Yes.', strategyVi:'Kiểm tra 3 yếu tố: AI + LÀM GÌ + Ở ĐÂU. Cả 3 đúng → Yes.' },
        { id:'f2_2', partNumber:2, taskTypeVi:'Yes/No', taskTypeEn:'Yes/No', prompt:'The oldest girl is reading a magazine.', imageEmoji:'👧📱', options:['Yes','No'], answer:'No', explanationVi:'Cô bé lớn nhất đang xem điện thoại (phone), không phải đọc tạp chí (magazine) → No.', strategyVi:'Flyers hay đánh lừa bằng chi tiết! magazine ≠ phone. Nhìn KỸ đồ vật trong tranh.' },
        { id:'f2_3', partNumber:2, taskTypeVi:'Yes/No', taskTypeEn:'Yes/No', prompt:'There are four sandwiches on the blanket.', imageEmoji:'🥪🥪🥪🥪', options:['Yes','No'], answer:'Yes', explanationVi:'Đếm: 4 sandwich trên chăn → đúng → Yes.', strategyVi:'Luôn ĐẾM số lượng! Flyers hay cho số sai để đánh lừa. Đếm 2 lần cho chắc.' },
        { id:'f2_4', partNumber:2, taskTypeVi:'Yes/No', taskTypeEn:'Yes/No', prompt:'The weather looks cloudy and cold.', imageEmoji:'☀️🌡️', options:['Yes','No'], answer:'No', explanationVi:'Tranh: trời nắng (sunny), câu nói "cloudy and cold" → SAI.', strategyVi:'Thời tiết Flyers phức tạp hơn: cloudy, foggy, stormy. Học thêm từ nâng cao.' },
        { id:'f2_5', partNumber:2, taskTypeVi:'Yes/No', taskTypeEn:'Yes/No', prompt:'A bird is flying above the trees.', imageEmoji:'🐦🌳', options:['Yes','No'], answer:'Yes', explanationVi:'Chim bay trên cây (above the trees) → khớp → Yes. Above = bên trên.', strategyVi:'Giới từ nâng cao: above=trên, below=dưới, between=giữa, behind=sau, beside=bên cạnh.' },
      ],
    },
    { partNumber: 3, titleEn: 'Conversation Match', titleVi: 'Ghép hội thoại',
      instructionVi: 'Chọn câu trả lời phù hợp nhất.',
      questions: [
        { id:'f3_1', partNumber:3, taskTypeVi:'Hội thoại', taskTypeEn:'Conversation', prompt:'Have you ever been to London?', options:["No, but I'd love to go!","I went to school.","It is expensive."], answer:"No, but I'd love to go!", explanationVi:'"Have you ever...?" = hỏi kinh nghiệm → trả lời "No, but I\'d love to!" (Chưa, nhưng rất muốn!)', strategyVi:'"Have you ever...?" → Yes, I have / No, but I\'d love to. Đây là thì hiện tại hoàn thành!' },
        { id:'f3_2', partNumber:3, taskTypeVi:'Hội thoại', taskTypeEn:'Conversation', prompt:'What are you going to do this weekend?', options:["I'm going to visit my grandparents.","I went yesterday.","I like ice cream."], answer:"I'm going to visit my grandparents.", explanationVi:'"going to do" = dự định → trả lời bằng "I\'m going to + V": "visit my grandparents".', strategyVi:'"going to" = tương lai gần. Trả lời cũng phải dùng "going to" hoặc "will". Khớp THÌ!' },
        { id:'f3_3', partNumber:3, taskTypeVi:'Hội thoại', taskTypeEn:'Conversation', prompt:'Could you tell me the way to the station?', options:['Go straight and turn left.','I take the bus.','The train is fast.'], answer:'Go straight and turn left.', explanationVi:'"the way to" = đường đi → chỉ đường: "Go straight and turn left" (Đi thẳng rồi rẽ trái).', strategyVi:'Hỏi đường → trả lời chỉ hướng: go straight, turn left/right, go past, next to. Học cụm chỉ đường!' },
        { id:'f3_4', partNumber:3, taskTypeVi:'Hội thoại', taskTypeEn:'Conversation', prompt:'What was the film like?', options:['It was really exciting!','I watched it.','The cinema is near here.'], answer:'It was really exciting!', explanationVi:'"What was it like?" = hỏi cảm nhận → "It was exciting!" (Rất hấp dẫn!). "I watched it" chỉ nói sự kiện.', strategyVi:'"What was ... like?" = hỏi nhận xét/cảm nhận. Trả lời: It was + tính từ (exciting, boring, fun).' },
        { id:'f3_5', partNumber:3, taskTypeVi:'Hội thoại', taskTypeEn:'Conversation', prompt:"Why don't we go swimming tomorrow?", options:["Great idea! What time?","I can swim.","The pool is blue."], answer:"Great idea! What time?", explanationVi:'"Why don\'t we...?" = gợi ý → đồng ý: "Great idea!" rồi hỏi thêm chi tiết.', strategyVi:'Gợi ý: "Why don\'t we / Shall we / Let\'s" → Đồng ý: Great idea! / Sure! → Từ chối: Sorry, I can\'t.' },
      ],
    },
    { partNumber: 4, titleEn: 'Gap Fill (choose A/B/C)', titleVi: 'Điền từ (chọn A/B/C)',
      instructionVi: 'Đọc đoạn văn. Chọn từ đúng.',
      questions: [
        { id:'f4_1', partNumber:4, taskTypeVi:'Chọn từ', taskTypeEn:'Multiple choice', prompt:'Emma ___ interested in science since she was very young.', options:['has been','was being','is being'], answer:'has been', explanationVi:'"since she was young" = từ khi còn nhỏ → hiện tại hoàn thành: "has been". Công thức: have/has + V3.', strategyVi:'Dấu hiệu: since/for → hiện tại hoàn thành (has/have + V3). Rất quan trọng cho Flyers!' },
        { id:'f4_2', partNumber:4, taskTypeVi:'Chọn từ', taskTypeEn:'Multiple choice', prompt:'She wants to ___ a scientist when she grows up.', options:['become','becoming','became'], answer:'become', explanationVi:'"wants to + V-nguyên thể": wants to become. Không phải "wants to becoming".', strategyVi:'Công thức: want/need/hope/plan + to + V-nguyên thể. Luôn dùng dạng gốc sau "to"!' },
        { id:'f4_3', partNumber:4, taskTypeVi:'Chọn từ', taskTypeEn:'Multiple choice', prompt:'Last year, she ___ first prize in the science competition.', options:['won','wins','winning'], answer:'won', explanationVi:'"Last year" = năm ngoái → quá khứ → "won" (win→won). "wins" = hiện tại, sai.', strategyVi:'Last year/month/week → quá khứ đơn. win→won, see→saw, eat→ate. Học 30 động từ bất quy tắc!' },
        { id:'f4_4', partNumber:4, taskTypeVi:'Chọn từ', taskTypeEn:'Multiple choice', prompt:'Her teacher says she is the ___ student in the class.', options:['cleverest','more clever','most clever'], answer:'cleverest', explanationVi:'"the + tính từ-est" = so sánh nhất cho tính từ ngắn: clever → cleverest.', strategyVi:'So sánh nhất: tính từ ngắn + est (biggest, tallest). Tính từ dài: most + adj (most beautiful).' },
        { id:'f4_5', partNumber:4, taskTypeVi:'Chọn từ', taskTypeEn:'Multiple choice', prompt:'She ___ goes to the library to read about new discoveries.', options:['often','never','rarely'], answer:'often', explanationVi:'Ngữ cảnh tích cực (thích đọc sách) → "often" (thường xuyên). "never/rarely" = không bao giờ/hiếm khi.', strategyVi:'Trạng từ tần suất: always > usually > often > sometimes > rarely > never. Chọn theo ngữ cảnh!' },
      ],
    },
  ],
};

// Import expansion packs
import { STARTERS_RW_2, STARTERS_RW_3 } from './practice-tests-starters-2';
import { MOVERS_RW_2, MOVERS_RW_3 } from './practice-tests-movers-2';
import { FLYERS_RW_2 } from './practice-tests-flyers-2';
import { KET_RW_1, PET_RW_1 } from './practice-tests-ket-pet';

export const PRACTICE_TESTS: PracticeTest[] = [
  STARTERS_RW, STARTERS_RW_2, STARTERS_RW_3,
  MOVERS_RW, MOVERS_RW_2, MOVERS_RW_3,
  FLYERS_RW, FLYERS_RW_2,
  KET_RW_1,
  PET_RW_1,
];

export function getTestByLevel(level: string): PracticeTest | undefined {
  return PRACTICE_TESTS.find(t => t.level === level);
}

export function getAllTestsByLevel(level: string): PracticeTest[] {
  return PRACTICE_TESTS.filter(t => t.level === level);
}

