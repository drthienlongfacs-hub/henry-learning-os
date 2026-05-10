// Cambridge practice question bank.
// Official Cambridge pages define the structure; bundled Henry items are original
// family-use practice material and must not be described as official papers.

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
  /** Script audio cho bài Listening (nếu có) */
  audioTranscript?: string;
  /** Self-assessed prompt for writing/speaking tasks. */
  selfAssessment?: boolean;
  /** Rubric shown after the learner attempts an open writing/speaking task. */
  rubricVi?: string[];
  /** Model answer or response frame for open production tasks. */
  modelAnswer?: string;
  /** Accessibility label for generated visual prompt. */
  visualAlt?: string;
  /** Copyright/source boundary shown by UI and tests. */
  sourceBoundary?: string;
}

export interface PracticeTest {
  id: string;
  level: 'starters' | 'movers' | 'flyers' | 'ket' | 'pet';
  skill: 'reading_writing' | 'reading' | 'writing' | 'listening' | 'speaking';
  skillVi: string;
  totalMinutes: number;
  parts: PracticeTestPart[];
  setNo?: number;
  componentKey?: string;
  officialExamName?: string;
  sourceBoundary?: string;
  officialSampleUrl?: string;
  isOfficialCambridgeContent?: false;
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
import { KET_LISTENING_1, PET_LISTENING_1 } from './practice-tests-ket-pet-listening';
import { STARTERS_LISTENING } from './practice-tests-yle-listening';
import { STARTERS_SPEAKING, KET_SPEAKING, PET_SPEAKING } from './practice-tests-speaking';
import {
  CAMBRIDGE_EXAM_CLAIM_GUARDRAIL,
  CAMBRIDGE_EXAM_SPECS,
  type CambridgeExamLevelId,
  type CambridgeOfficialComponentSpec,
  type CambridgeOfficialPartSpec,
} from './cambridge-official-framework';

const GENERATED_SET_COUNT = 10;

const EXAM_THEMES = [
  { title: 'Library project', scene: '📚🧒🎒', place: 'school library', person: 'Mia', object: 'library card', activity: 'reading club', answer: 'library', distractors: ['market', 'station'], color: 'blue', time: '3.30',
    passage: 'Last Tuesday, Mia went to the school library with her class. The teacher said they could each choose two books. Mia found a book about animals and another about space. She sat in the reading corner and started to read. At 3.30, the bell rang and it was time to go home. Mia took her books to the desk and showed her library card. She was very happy with her new books.',
    questions: [
      { q: 'Where did Mia go with her class?', opts: ['the school library', 'the market', 'the station'], a: 'the school library' },
      { q: 'How many books could each child choose?', opts: ['two', 'three', 'one'], a: 'two' },
      { q: 'What time did the bell ring?', opts: ['3.30', '2.30', '4.00'], a: '3.30' },
    ],
  },
  { title: 'Park picnic', scene: '🧺🌳👧', place: 'city park', person: 'Ben', object: 'water bottle', activity: 'class picnic', answer: 'class picnic', distractors: ['museum', 'hospital'], color: 'green', time: '10.15',
    passage: 'On Saturday morning, Ben and his friends went to the city park for a class picnic. They arrived at 10.15 and put a big blanket on the grass under a tree. Everyone brought food to share. Ben brought sandwiches and a water bottle. They played football after lunch. It started to rain at 2 o\'clock, so they packed up and went home. It was a great day!',
    questions: [
      { q: 'Why did Ben go to the park?', opts: ['for a class picnic', 'to visit the museum', 'to go to hospital'], a: 'for a class picnic' },
      { q: 'What did Ben bring to share?', opts: ['sandwiches', 'cake', 'fruit'], a: 'sandwiches' },
      { q: 'Why did they go home?', opts: ['it started to rain', 'it was dark', 'they were bored'], a: 'it started to rain' },
    ],
  },
  { title: 'Science morning', scene: '🌱🔎📝', place: 'science room', person: 'Noah', object: 'notebook', activity: 'plant experiment', answer: 'plant', distractors: ['ticket', 'menu'], color: 'yellow', time: '9.20',
    passage: 'Noah\'s class did a plant experiment on Monday morning. The teacher gave each child a small pot and some seeds. Noah put his seeds in the pot and added water. He wrote the date in his notebook: 9.20 am. The teacher told them to put the pots near the window so the plants could get sunlight. After two weeks, Noah\'s plant was the tallest in the class!',
    questions: [
      { q: 'What did each child get from the teacher?', opts: ['a small pot and some seeds', 'a ticket and a menu', 'a book and a pen'], a: 'a small pot and some seeds' },
      { q: 'Where did they put the pots?', opts: ['near the window', 'on the floor', 'in the cupboard'], a: 'near the window' },
      { q: 'What happened after two weeks?', opts: ['Noah\'s plant was the tallest', 'the plants died', 'they moved the pots'], a: 'Noah\'s plant was the tallest' },
    ],
  },
  { title: 'Museum trip', scene: '🏛️🎟️🚌', place: 'history museum', person: 'Emma', object: 'ticket', activity: 'class trip', answer: 'museum', distractors: ['library', 'beach'], color: 'red', time: '8.45',
    passage: 'Emma\'s class went on a trip to the history museum. They left school by bus at 8.45. At the museum, a guide showed them old clothes, toys and tools from 100 years ago. Emma liked the old dolls best. She drew pictures of them in her notebook. They had lunch in the museum cafe and bought postcards from the gift shop before going home.',
    questions: [
      { q: 'How did Emma\'s class get to the museum?', opts: ['by bus', 'by train', 'on foot'], a: 'by bus' },
      { q: 'What did Emma like best?', opts: ['the old dolls', 'the old tools', 'the old clothes'], a: 'the old dolls' },
      { q: 'What did they buy from the gift shop?', opts: ['postcards', 'tickets', 'books'], a: 'postcards' },
    ],
  },
  { title: 'Sports fair', scene: '🏀🏃👟', place: 'sports hall', person: 'Jack', object: 'sports shoes', activity: 'basketball game', answer: 'sports', distractors: ['music', 'cooking'], color: 'orange', time: '4.00',
    passage: 'Jack was excited about the school sports fair on Friday. He put on his new sports shoes and went to the sports hall at 4 o\'clock. There were many activities: running races, a basketball game and a long jump competition. Jack played in the basketball game with his friends. His team won! The teacher gave everyone an orange juice at the end.',
    questions: [
      { q: 'When was the school sports fair?', opts: ['on Friday', 'on Monday', 'on Sunday'], a: 'on Friday' },
      { q: 'Which sport did Jack play?', opts: ['basketball', 'football', 'tennis'], a: 'basketball' },
      { q: 'What did the teacher give everyone?', opts: ['an orange juice', 'a medal', 'new shoes'], a: 'an orange juice' },
    ],
  },
  { title: 'Art workshop', scene: '🎨✏️🖼️', place: 'art room', person: 'Ruby', object: 'coloured pencils', activity: 'poster workshop', answer: 'pencils', distractors: ['gloves', 'keys'], color: 'purple', time: '2.10',
    passage: 'Ruby went to an art workshop in the art room after school. It started at 2.10. The art teacher showed the children how to make posters. Ruby used her coloured pencils to draw a picture of a rainbow. She wrote "Save Our Planet" in big purple letters at the top. The teacher put all the posters on the wall. Ruby\'s poster was the most colourful one.',
    questions: [
      { q: 'What did the children learn to make?', opts: ['posters', 'gloves', 'keys'], a: 'posters' },
      { q: 'What did Ruby draw?', opts: ['a rainbow', 'a house', 'a cat'], a: 'a rainbow' },
      { q: 'Where did the teacher put the posters?', opts: ['on the wall', 'on the floor', 'in a box'], a: 'on the wall' },
    ],
  },
  { title: 'Music practice', scene: '🎵🎤📄', place: 'music room', person: 'Lily', object: 'song sheet', activity: 'school concert', answer: 'music', distractors: ['science', 'sport'], color: 'pink', time: '5.05',
    passage: 'Lily was practising for the school concert every day after school. She went to the music room at 5.05 and the music teacher gave her a song sheet. Lily sang the songs and played the piano. The concert was on Saturday evening. Lily wore a pink dress. Her parents came to watch. When Lily finished singing, everyone clapped. She felt very proud.',
    questions: [
      { q: 'What was Lily practising for?', opts: ['the school concert', 'a science test', 'a sport day'], a: 'the school concert' },
      { q: 'What instrument did Lily play?', opts: ['the piano', 'the guitar', 'the drums'], a: 'the piano' },
      { q: 'How did Lily feel at the end?', opts: ['very proud', 'very tired', 'very sad'], a: 'very proud' },
    ],
  },
  { title: 'Weekend market', scene: '🍎🛍️👨', place: 'weekend market', person: 'Henry', object: 'shopping bag', activity: 'buying fruit', answer: 'market', distractors: ['classroom', 'cinema'], color: 'brown', time: '11.30',
    passage: 'Every Sunday, Henry goes to the weekend market with his dad. They leave home at 11.30 and walk there. Henry carries a big shopping bag. His dad buys fruit and vegetables. Henry always chooses the apples because they are his favourite. Sometimes they stop at a stall that sells fresh bread. Henry likes the market because it is busy and friendly.',
    questions: [
      { q: 'Who does Henry go to the market with?', opts: ['his dad', 'his mum', 'his friends'], a: 'his dad' },
      { q: 'What is Henry\'s favourite fruit?', opts: ['apples', 'oranges', 'bananas'], a: 'apples' },
      { q: 'How do they get to the market?', opts: ['they walk', 'they drive', 'they take the bus'], a: 'they walk' },
    ],
  },
  { title: 'Beach clean-up', scene: '🏖️♻️🧤', place: 'small beach', person: 'Sofia', object: 'gloves', activity: 'clean-up', answer: 'beach', distractors: ['zoo', 'library'], color: 'white', time: '7.50',
    passage: 'Sofia and her family joined a beach clean-up on Sunday morning. They arrived at the small beach at 7.50 and put on gloves. They picked up plastic bottles, bags and old cans from the sand. After two hours, they filled five big bags with rubbish. A man from the town hall thanked everyone and gave them all a drink. Sofia felt happy because the beach looked beautiful and clean again.',
    questions: [
      { q: 'What did Sofia pick up from the beach?', opts: ['plastic bottles, bags and cans', 'shells and stones', 'books and toys'], a: 'plastic bottles, bags and cans' },
      { q: 'How many bags of rubbish did they fill?', opts: ['five', 'three', 'ten'], a: 'five' },
      { q: 'How did Sofia feel afterwards?', opts: ['happy', 'tired', 'angry'], a: 'happy' },
    ],
  },
  { title: 'Cafe project', scene: '☕🥪📋', place: 'school cafe', person: 'Oliver', object: 'menu', activity: 'charity cafe', answer: 'cafe', distractors: ['farm', 'pool'], color: 'black', time: '1.25',
    passage: 'Oliver\'s class opened a charity cafe at school to raise money for new books. Oliver helped write the menu. They sold sandwiches, cakes and juice. The cafe opened at 1.25 after lunch. Many parents and teachers came. Oliver served the drinks and his friend Zara made the sandwiches. By the end of the day, they had raised enough money to buy 30 new books for the school library.',
    questions: [
      { q: 'Why did the class open a cafe?', opts: ['to raise money for new books', 'to have a party', 'to learn cooking'], a: 'to raise money for new books' },
      { q: 'What did Oliver do at the cafe?', opts: ['served the drinks', 'made sandwiches', 'wrote a story'], a: 'served the drinks' },
      { q: 'How many new books could they buy?', opts: ['30', '10', '50'], a: '30' },
    ],
  },
];

const componentMinutes = (duration: string): number => {
  const match = duration.match(/(\d+)/);
  return match ? Number(match[1]) : 15;
};

function buildOfficialFormatPracticeTests(setCount = GENERATED_SET_COUNT): PracticeTest[] {
  const tests: PracticeTest[] = [];

  (Object.keys(CAMBRIDGE_EXAM_SPECS) as CambridgeExamLevelId[]).forEach((levelId) => {
    const spec = CAMBRIDGE_EXAM_SPECS[levelId];

    for (let setNo = 1; setNo <= setCount; setNo += 1) {
      spec.components.forEach((component) => {
        tests.push({
          id: `${levelId}_official_format_set_${setNo}_${component.key}`,
          level: levelId,
          skill: component.skill,
          skillVi: `${component.labelVi} — Bộ ${setNo}`,
          totalMinutes: componentMinutes(component.duration),
          setNo,
          componentKey: component.key,
          officialExamName: spec.officialName,
          sourceBoundary: spec.sourceBoundary,
          officialSampleUrl: spec.officialSampleUrl,
          isOfficialCambridgeContent: false,
          parts: component.partSpecs.map((part) => ({
            partNumber: part.partNumber,
            titleEn: part.titleEn,
            titleVi: `Part ${part.partNumber}: ${part.titleVi}`,
            instructionVi: buildInstructionVi(component, part),
            questions: buildGeneratedQuestions(levelId, setNo, component, part),
          })),
        });
      });
    }
  });

  return tests;
}

function buildInstructionVi(component: CambridgeOfficialComponentSpec, part: CambridgeOfficialPartSpec): string {
  if (part.mode === 'speaking') {
    return `Luyện nói theo format ${component.labelVi}: ${part.taskFocusVi}. Bấm xem gợi ý sau khi con đã thử nói.`;
  }

  if (part.mode === 'writing') {
    return `Viết câu trả lời theo yêu cầu. Sau đó mở rubric để tự chấm với phụ huynh: ${part.taskFocusVi}.`;
  }

  if (part.mode === 'gap') {
    return `Gõ một từ/số/cụm ngắn. Tập trung vào: ${part.taskFocusVi}.`;
  }

  return `Chọn đáp án đúng. Tập trung vào: ${part.taskFocusVi}.`;
}

function buildGeneratedQuestions(
  levelId: CambridgeExamLevelId,
  setNo: number,
  component: CambridgeOfficialComponentSpec,
  part: CambridgeOfficialPartSpec,
): PracticeQuestion[] {
  return Array.from({ length: part.questionCount }, (_, index) => {
    const theme = EXAM_THEMES[(setNo + part.partNumber + index) % EXAM_THEMES.length];
    const questionNo = index + 1;
    const id = `${levelId}_${setNo}_${component.key}_p${part.partNumber}_q${questionNo}`;
    const base = {
      id,
      partNumber: part.partNumber,
      taskTypeVi: part.titleVi,
      taskTypeEn: part.mode === 'speaking' ? 'Speaking' : part.mode === 'writing' ? 'Writing' : part.titleEn,
      imageEmoji: theme.scene,
      visualAlt: `${theme.title}: ${theme.place}, ${theme.person}, ${theme.object}`,
      explanationVi: '',
      strategyVi: '',
      sourceBoundary: CAMBRIDGE_EXAM_CLAIM_GUARDRAIL.blockedClaim,
    };

    if (part.mode === 'speaking') {
      return {
        ...base,
        prompt: buildSpeakingPrompt(levelId, part, theme),
        options: [],
        answer: 'self-assessed',
        selfAssessment: true,
        explanationVi: buildSpeakingModelAnswer(part, theme),
        modelAnswer: buildSpeakingModelAnswer(part, theme),
        strategyVi: 'Nói chậm, trả lời đúng trọng tâm, thêm một lý do bằng because, và không học thuộc nguyên văn.',
        rubricVi: [
          'Trả lời đúng câu hỏi, không lạc đề.',
          'Dùng câu đầy đủ hoặc cụm rõ nghĩa phù hợp trình độ.',
          'Phát âm đủ nghe; nếu sai thì tự sửa và nói lại.',
          'Thêm lý do/ví dụ ngắn khi trình độ yêu cầu.',
        ],
      };
    }

    if (part.mode === 'writing') {
      return {
        ...base,
        prompt: buildWritingPrompt(levelId, part, theme),
        options: [],
        answer: 'self-assessed',
        selfAssessment: true,
        explanationVi: buildWritingModelAnswer(levelId, part, theme),
        modelAnswer: buildWritingModelAnswer(levelId, part, theme),
        strategyVi: 'Trước khi viết: xác định người nhận, mục đích, đủ ý bắt buộc, độ dài, rồi kiểm tra thì động từ và chính tả.',
        rubricVi: [
          'Đủ ý theo đề, không bỏ bullet/ghi chú.',
          'Tổ chức mạch lạc: mở đầu, ý chính, kết thúc.',
          'Ngữ pháp và chính tả phù hợp cấp độ.',
          'Dùng từ nối tự nhiên: and, but, because, then, after that.',
        ],
      };
    }

    if (part.mode === 'gap') {
      const answer = selectGapAnswer(questionNo, theme);
      return {
        ...base,
        prompt: buildGapPrompt(component, part, theme, questionNo),
        options: [],
        answer,
        audioTranscript: component.skill === 'listening' ? buildListeningTranscript(theme, answer, questionNo) : undefined,
        explanationVi: `Đáp án là "${answer}" vì thông tin then chốt trong ngữ cảnh là ${theme.place}, ${theme.object} hoặc thời gian ${theme.time}.`,
        strategyVi: 'Với gap-fill, đọc/nghe cả câu trước và sau chỗ trống; dự đoán loại từ rồi mới điền.',
      };
    }

    const answer = buildObjectiveAnswer(theme, questionNo);
    // Use passage-based options from theme.questions when available
    const tq = theme.questions;
    let options: string[];
    let explanation: string;
    if (tq && tq.length > 0) {
      const qi = (questionNo - 1) % tq.length;
      options = rotateOptions(tq[qi].opts, questionNo);
      explanation = `Đáp án đúng là "${answer}". Đọc kỹ đoạn văn về ${theme.title} — thông tin nằm rõ trong bài đọc.`;
    } else {
      options = rotateOptions([answer, ...theme.distractors].slice(0, 3), questionNo);
      explanation = `Đáp án đúng là "${answer}" vì dữ kiện chính của tình huống là ${theme.person} ở ${theme.place} với hoạt động ${theme.activity}.`;
    }
    return {
      ...base,
      prompt: buildObjectivePrompt(component, part, theme, questionNo),
      options,
      answer,
      audioTranscript: component.skill === 'listening' ? buildListeningTranscript(theme, answer, questionNo) : undefined,
      explanationVi: explanation,
      strategyVi: 'Đọc kỹ toàn bộ đoạn văn trước. Gạch chân từ khóa trong câu hỏi. Tìm thông tin tương ứng trong bài. Loại trừ đáp án sai rồi chọn.',
    };
  });
}

function selectGapAnswer(questionNo: number, theme: typeof EXAM_THEMES[number]): string {
  const answers = [theme.answer, theme.object.split(' ')[0], theme.time, theme.color, theme.person];
  return answers[questionNo % answers.length];
}

function buildObjectiveAnswer(theme: typeof EXAM_THEMES[number], questionNo: number): string {
  const tq = theme.questions;
  if (tq && tq.length > 0) {
    return tq[(questionNo - 1) % tq.length].a;
  }
  const answers = [theme.answer, theme.activity, theme.place];
  return answers[questionNo % answers.length];
}

function rotateOptions(options: string[], questionNo: number): string[] {
  const offset = questionNo % options.length;
  return [...options.slice(offset), ...options.slice(0, offset)];
}

function buildObjectivePrompt(
  component: CambridgeOfficialComponentSpec,
  part: CambridgeOfficialPartSpec,
  theme: typeof EXAM_THEMES[number],
  questionNo: number,
): string {
  if (component.skill === 'listening') {
    return `Listen and choose the correct answer for ${theme.person}. Question ${questionNo}: where or what is the key information?`;
  }

  if (part.titleEn.toLowerCase().includes('definition')) {
    return `Which word best matches this definition: a place or thing connected with ${theme.activity}?`;
  }

  if (part.titleEn.toLowerCase().includes('conversation')) {
    return `${theme.person}: Would you like to join the ${theme.activity}?`;
  }

  // Embed the full passage so the learner can actually read before answering
  const tq = theme.questions;
  if (tq && tq.length > 0) {
    const qi = (questionNo - 1) % tq.length;
    return `📖 Read the text, then answer the question.\n\n"${theme.passage}"\n\n${tq[qi].q}`;
  }

  return `📖 Read the text, then answer the question.\n\n"${theme.passage}"\n\nWhat is this text mainly about?`;
}

function buildGapPrompt(
  component: CambridgeOfficialComponentSpec,
  part: CambridgeOfficialPartSpec,
  theme: typeof EXAM_THEMES[number],
  questionNo: number,
): string {
  if (component.skill === 'listening') {
    return `🔊 Listen and write the missing word or number.\n\n${theme.person}'s note about the ${theme.activity}:\nPlace: ${theme.place}\nTime: ____\nBring: ____\n\nAnswer ${questionNo}: ____`;
  }

  if (part.titleEn.toLowerCase().includes('jumbled')) {
    const word = selectGapAnswer(questionNo, theme);
    const shuffled = word.split('').sort(() => Math.random() - 0.5).join(' ');
    return `🔤 Look at the picture ${theme.scene}. Put the letters in the right order to spell the word.\n\n${shuffled.toUpperCase()}`;
  }

  // Reading gap-fill: embed passage with a blank
  const answer = selectGapAnswer(questionNo, theme);
  const passageWithGap = theme.passage.replace(new RegExp(answer, 'i'), '____');
  return `📖 Read the text and write the missing word.\n\n"${passageWithGap}"\n\nThe missing word is: ____`;
}

function buildListeningTranscript(theme: typeof EXAM_THEMES[number], answer: string, questionNo: number): string {
  const dialogues = [
    `Woman: Hello, ${theme.person}! What are you doing today?\n${theme.person}: I'm going to the ${theme.place} for the ${theme.activity}.\nWoman: That sounds fun! What time does it start?\n${theme.person}: It starts at ${theme.time}.\nWoman: And what do you need to bring?\n${theme.person}: I need to bring my ${theme.object}.`,
    `Man: Good morning, ${theme.person}. Where are you going?\n${theme.person}: I'm going to the ${theme.place}.\nMan: What colour is your ${theme.object}?\n${theme.person}: It's ${theme.color}.\nMan: And what will you do there?\n${theme.person}: We're having a ${theme.activity}. It starts at ${theme.time}.`,
    `Woman: ${theme.person}, can you help me? I'm looking for the ${theme.place}.\n${theme.person}: Yes, it's near the ${theme.activity} area.\nWoman: What time is it open?\n${theme.person}: From ${theme.time}. You should bring a ${theme.object}.\nWoman: Thank you! That's very helpful.`,
  ];
  return dialogues[(questionNo - 1) % dialogues.length];
}

function buildWritingPrompt(levelId: CambridgeExamLevelId, part: CambridgeOfficialPartSpec, theme: typeof EXAM_THEMES[number]): string {
  if (levelId === 'ket' && part.partNumber === 7) {
    return `Look at the picture story ${theme.scene}. Write 35 words or more about ${theme.person}, the ${theme.object}, and what happened at the ${theme.place}.`;
  }

  if (levelId === 'pet') {
    return part.partNumber === 1
      ? `You received an email from a friend about ${theme.activity}. Write about 100 words. Say when you can meet, what to bring, and why you like the plan.`
      : `Write an article or story of about 100 words: "${theme.title} changed my day".`;
  }

  return `Write 3-5 simple sentences about the picture ${theme.scene}. Include ${theme.person}, ${theme.place}, and ${theme.object}.`;
}

function buildWritingModelAnswer(levelId: CambridgeExamLevelId, part: CambridgeOfficialPartSpec, theme: typeof EXAM_THEMES[number]): string {
  if (levelId === 'pet') {
    return `Hi Alex, I can join the ${theme.activity} at ${theme.time}. I will bring my ${theme.object} because it will help us. I like this plan because the ${theme.place} is friendly and we can learn together. See you soon, Henry.`;
  }

  if (levelId === 'ket' && part.partNumber === 7) {
    return `${theme.person} went to the ${theme.place} with a ${theme.object}. First, the room was busy. Then ${theme.person} found a quiet place. In the end, everyone enjoyed the ${theme.activity}.`;
  }

  return `${theme.person} is at the ${theme.place}. I can see a ${theme.object}. The ${theme.activity} looks fun because everyone is learning.`;
}

function buildSpeakingPrompt(levelId: CambridgeExamLevelId, part: CambridgeOfficialPartSpec, theme: typeof EXAM_THEMES[number]): string {
  if (levelId === 'ket') {
    return part.partNumber === 1
      ? `Answer the examiner: Tell me about a ${theme.place} you like. What do you do there?`
      : `Ask and answer with a partner about planning a ${theme.activity}. Talk about time, place, and what to bring.`;
  }

  if (levelId === 'pet') {
    return part.partNumber === 2
      ? `Describe the picture ${theme.scene} for about one minute. Say who is there, where they are, and what is happening.`
      : `Discuss this question: Is ${theme.activity} better alone or with friends? Give reasons.`;
  }

  return `Look at ${theme.scene}. Answer the examiner about ${theme.person}, the ${theme.object}, and the ${theme.place}.`;
}

function buildSpeakingModelAnswer(part: CambridgeOfficialPartSpec, theme: typeof EXAM_THEMES[number]): string {
  return `I can see ${theme.person} at the ${theme.place}. ${theme.person} has a ${theme.object}. I think the ${theme.activity} is useful because children can practise English and work with friends.`;
}

export const PRACTICE_TESTS: PracticeTest[] = [
  ...buildOfficialFormatPracticeTests(),
  STARTERS_RW, STARTERS_RW_2, STARTERS_RW_3, STARTERS_LISTENING, STARTERS_SPEAKING,
  MOVERS_RW, MOVERS_RW_2, MOVERS_RW_3,
  FLYERS_RW, FLYERS_RW_2,
  KET_RW_1, KET_LISTENING_1, KET_SPEAKING,
  PET_RW_1, PET_LISTENING_1, PET_SPEAKING,
];

export const OFFICIAL_FORMAT_PRACTICE_TESTS = PRACTICE_TESTS.filter((test) => test.setNo !== undefined);

export const EXAM_PRACTICE_BANK_STATS = {
  generatedSetCountPerLevel: GENERATED_SET_COUNT,
  levelCount: Object.keys(CAMBRIDGE_EXAM_SPECS).length,
  fullPracticeSetCount: Object.keys(CAMBRIDGE_EXAM_SPECS).length * GENERATED_SET_COUNT,
  generatedComponentTestCount: OFFICIAL_FORMAT_PRACTICE_TESTS.length,
  officialContentPolicy: CAMBRIDGE_EXAM_CLAIM_GUARDRAIL.blockedClaim,
  setCountsByLevel: (Object.keys(CAMBRIDGE_EXAM_SPECS) as CambridgeExamLevelId[]).reduce<Record<CambridgeExamLevelId, number>>((acc, levelId) => {
    acc[levelId] = new Set(OFFICIAL_FORMAT_PRACTICE_TESTS.filter((test) => test.level === levelId).map((test) => test.setNo)).size;
    return acc;
  }, {
    starters: 0,
    movers: 0,
    flyers: 0,
    ket: 0,
    pet: 0,
  }),
};

export function getTestByLevel(level: string): PracticeTest | undefined {
  return PRACTICE_TESTS.find(t => t.level === level);
}

export function getAllTestsByLevel(level: string): PracticeTest[] {
  return PRACTICE_TESTS.filter(t => t.level === level);
}
