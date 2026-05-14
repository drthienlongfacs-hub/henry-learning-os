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
  /** Path to illustration image in /public/exam-images/ */
  imagePath?: string;
  hint?: string;
  /** Giải thích đáp án chi tiết bằng tiếng Việt */
  explanationVi: string;
  /** Cách tư duy / chiến lược tiếp cận để tái sử dụng */
  strategyVi: string;
  /** Script audio cho bài Listening (nếu có) */
  audioTranscript?: string;
  /** Link file audio thực tế cho bài nghe chuẩn (nếu có) */
  audioUrl?: string;
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
  sourcePages?: string[]; // paths to original exam page images
  /** Đường dẫn file âm thanh thực tế áp dụng cho toàn bộ phần thi (VD: 1 audio file cho cả Part) */
  audioUrl?: string;
  /** Illustration image for this part (scene picture, etc.) */
  partImage?: string;
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
import { KET_RW_2 } from './practice-tests-ket-1';
import { KET_RW_1, PET_RW_1 } from './practice-tests-ket-pet';
import { PET_1_TEST_1 } from './practice-tests-pet-1';
import { PET_1_TEST_1_LISTENING } from './practice-tests-pet-1-listening';
import { PET_1_TEST_2 } from './practice-tests-pet-1-test2';
import { PET_1_TEST_2_LISTENING } from './practice-tests-pet-1-test2-listening';
import { PET_1_TEST_3_LISTENING } from './practice-tests-pet-1-test3-listening';
import { PET_1_TEST_3 } from './practice-tests-pet-1-test3';
import { KET_LISTENING_1, PET_LISTENING_1 } from './practice-tests-ket-pet-listening';
import { STARTERS_LISTENING, MOVERS_LISTENING_1 } from './practice-tests-yle-listening';
import { STARTERS_LISTENING_AUTHENTIC, STARTERS_RW_AUTHENTIC } from './practice-tests-starters-authentic';
import { MOVERS_LISTENING_2 } from './practice-tests-movers-listening-2';
import { MOVERS_LISTENING_3 } from './practice-tests-movers-listening-3';
import { MOVERS_RW_AUTHENTIC_1 } from './practice-tests-movers-rw-authentic';
import { MOVERS_RW_AUTHENTIC_2, MOVERS_RW_AUTHENTIC_3 } from './practice-tests-movers-rw-authentic-2-3';
import { KET_LISTENING_AUTHENTIC } from './practice-tests-ket-listening-authentic';
import { STARTERS_SPEAKING, KET_SPEAKING, PET_SPEAKING } from './practice-tests-speaking';
import { FLYERS_LISTENING_AUTHENTIC_1 } from './practice-tests-flyers-listening-authentic';
import { FLYERS_LISTENING_2 } from './practice-tests-flyers-listening-2';
import { KET_LISTENING_2 } from './practice-tests-ket-listening-2';
import { FLYERS_RW_AUTHENTIC_1 } from './practice-tests-flyers-rw-authentic';
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
      return { ...base, prompt: buildSpeakingPrompt(levelId, part, theme), options: [], answer: 'self-assessed', selfAssessment: true, explanationVi: buildSpeakingModelAnswer(part, theme), modelAnswer: buildSpeakingModelAnswer(part, theme), strategyVi: 'Nói chậm, trả lời đúng trọng tâm, thêm một lý do bằng because.', rubricVi: ['Trả lời đúng câu hỏi.', 'Dùng câu đầy đủ phù hợp trình độ.', 'Phát âm đủ nghe.', 'Thêm lý do/ví dụ ngắn.'] };
    }
    if (part.mode === 'writing') {
      return { ...base, prompt: buildWritingPrompt(levelId, part, theme), options: [], answer: 'self-assessed', selfAssessment: true, explanationVi: buildWritingModelAnswer(levelId, part, theme), modelAnswer: buildWritingModelAnswer(levelId, part, theme), strategyVi: 'Xác định mục đích, đủ ý, kiểm tra chính tả.', rubricVi: ['Đủ ý theo đề.', 'Mạch lạc.', 'Ngữ pháp phù hợp.', 'Dùng từ nối tự nhiên.'] };
    }

    // ══ PART-SPECIFIC DISPATCH — match exact Cambridge format ══
    return buildPartSpecificQuestion(base, levelId, setNo, component, part, theme, questionNo);
  });
}

// ══════════════════════════════════════════════════════════════
// EXAM STRATEGY FRAMEWORK — systematic thinking for each part
// ══════════════════════════════════════════════════════════════

const EXAM_STRATEGIES: Record<string, { strategyVi: string; rubricVi: string[] }> = {
  'true_false': {
    strategyVi: '🧠 KHUNG TƯ DUY 3 BƯỚC:\n① Nhìn tranh → gọi tên đồ vật/con vật bằng tiếng Anh trong đầu.\n② Đọc từ bên dưới → so sánh với tên vừa nghĩ.\n③ Khớp → ✓. Không khớp → ✗.\n\n💡 MẸO KHI KHÔNG CHẮC:\n• Nếu từ và tranh cùng chủ đề (VD: cả hai đều là động vật) → kiểm tra kỹ hơn, có thể là bẫy (VD: tranh "cat" nhưng từ viết "dog").\n• Đếm chữ cái: nếu từ quá dài/ngắn so với vật trong tranh, có thể sai.\n• Nhớ: bài này kiểm tra VOCABULARY — con chỉ cần biết từ đó nghĩa là gì.',
    rubricVi: ['Nhận diện đúng đồ vật trong tranh.', 'So sánh chính xác tranh với từ viết.', 'Không bị đánh lừa bởi từ cùng chủ đề nhưng khác nghĩa.'],
  },
  'yes_no': {
    strategyVi: '🧠 KHUNG TƯ DUY 4 BƯỚC:\n① Nhìn tranh tổng thể → liệt kê 3-4 chi tiết chính (ai, ở đâu, làm gì, màu gì).\n② Đọc câu → gạch chân từ khóa quan trọng.\n③ Đối chiếu TỪNG từ khóa với tranh: tất cả đúng → Yes. Chỉ 1 chi tiết sai → No.\n④ Cẩn thận với số lượng và màu sắc — đây là bẫy phổ biến nhất!\n\n💡 MẸO KHI KHÔNG CHẮC:\n• Nếu câu nói "There are THREE..." → đếm trong tranh. Sai số = No.\n• Nếu câu dùng từ con không biết → nhìn tranh xem có thứ gì lạ/mới không.\n• Câu phủ định (no, not, never) → đọc chậm lại, dễ nhầm.',
    rubricVi: ['Quan sát kỹ mọi chi tiết trong tranh.', 'Đọc câu chậm, gạch chân từ khóa.', 'Đối chiếu từng chi tiết — chỉ cần 1 sai là No.', 'Cẩn thận bẫy số lượng và màu sắc.'],
  },
  'jumbled': {
    strategyVi: '🧠 KHUNG TƯ DUY 3 BƯỚC:\n① Nhìn tranh → đoán từ tiếng Anh.\n② Kiểm tra các chữ cái có sẵn → xem có khớp với từ đoán không.\n③ Nếu đúng → sắp xếp lại. Nếu chưa chắc → thử ghép từ nguyên âm (a, e, i, o, u) với phụ âm.\n\n💡 MẸO KHI KHÔNG CHẮC:\n• Tìm nguyên âm trước (a, e, i, o, u) — mỗi từ tiếng Anh đều có ít nhất 1 nguyên âm.\n• Thử ghép 2-3 chữ cái quen: th, ch, sh, oo, ee, ea.\n• Nếu có 3 chữ cái → từ ngắn như cat, dog, bus. Nếu 4-5 chữ → từ dài hơn.\n• Đọc to kết quả — nếu nghe tự nhiên thì đúng.',
    rubricVi: ['Nhận diện đồ vật trong tranh.', 'Biết đánh vần từ cơ bản.', 'Sử dụng quy tắc ghép phụ âm-nguyên âm.'],
  },
  'gap_fill_wordbank': {
    strategyVi: '🧠 KHUNG TƯ DUY 5 BƯỚC:\n① Đọc TOÀN BỘ đoạn văn trước — đừng vội điền.\n② Đọc lại câu có chỗ trống → xác định LOẠI TỪ cần điền (danh từ? động từ? tính từ?).\n③ Nhìn word bank → loại bỏ từ sai loại (VD: cần danh từ mà từ đó là động từ).\n④ Thử lần lượt các từ còn lại vào chỗ trống → đọc thầm cả câu.\n⑤ Chọn từ làm câu có nghĩa nhất.\n\n💡 MẸO KHI KHÔNG CHẮC:\n• Đọc câu TRƯỚC và SAU chỗ trống — ngữ cảnh xung quanh là manh mối lớn nhất.\n• Nếu trước chỗ trống là "a/an/the" → cần DANH TỪ. Nếu là "is/are/was" → cần TÍNH TỪ hoặc V-ing.\n• Mỗi từ trong word bank chỉ dùng 1 lần — nếu đã dùng từ nào rồi → loại bỏ.\n• Khi còn 2 từ phân vân → đọc to cả câu với từng từ, từ nào nghe tự nhiên hơn thì chọn.',
    rubricVi: ['Đọc toàn bộ bài trước khi điền.', 'Xác định đúng loại từ cần điền.', 'Sử dụng ngữ cảnh câu trước/sau.', 'Mỗi từ trong word bank chỉ dùng 1 lần.'],
  },
  'one_word_story': {
    strategyVi: '🧠 KHUNG TƯ DUY 4 BƯỚC:\n① Đọc CÂU HỎI trước — biết mình cần tìm gì.\n② Đọc đoạn văn → tìm CÂU chứa thông tin liên quan.\n③ Câu trả lời thường NẰM NGUYÊN trong bài — chỉ cần chép lại 1 từ.\n④ Kiểm tra chính tả — sai chính tả = mất điểm.\n\n💡 MẸO KHI KHÔNG CHẮC:\n• Câu hỏi "How did X feel?" → tìm từ chỉ cảm xúc: happy, sad, tired, excited, proud.\n• Câu hỏi "Where/When/Who" → tìm tên riêng, số, nơi chốn.\n• Đáp án 90% là từ CÓ SẴN trong bài — không cần nghĩ từ mới.\n• Nếu câu hỏi hỏi "How many?" → đáp án là SỐ, tìm số trong bài.',
    rubricVi: ['Đọc câu hỏi trước bài.', 'Tìm câu trả lời trực tiếp trong bài.', 'Chỉ viết 1 từ, kiểm tra chính tả.', 'Dùng từ có sẵn trong đoạn văn.'],
  },
  'definition': {
    strategyVi: '🧠 KHUNG TƯ DUY 3 BƯỚC:\n① Đọc định nghĩa → tìm TỪ KHÓA CHÍNH (VD: "flies a plane" → liên quan đến máy bay).\n② Hình dung trong đầu đồ vật/người/nơi chốn được mô tả.\n③ Chọn từ khớp nhất với hình ảnh vừa tưởng tượng.\n\n💡 MẸO KHI KHÔNG BIẾT NGHĨA CÁC TỪ:\n• Dùng LOẠI TRỪ: nếu định nghĩa nói "a place" → loại từ chỉ người/đồ vật.\n• Nếu định nghĩa nói "a person who..." → loại từ chỉ nơi chốn/đồ vật.\n• Tìm gốc từ quen: nếu thấy "hospital" có "hospit-" giống "host" = chủ nhà → nơi chăm sóc.\n• Khi 2 đáp án đều có thể đúng → đọc lại TOÀN BỘ định nghĩa, từ nào khớp 100% mới chọn.',
    rubricVi: ['Xác định từ khóa chính trong định nghĩa.', 'Phân loại: người / nơi chốn / đồ vật.', 'Dùng loại trừ khi không chắc.', 'Đọc lại toàn bộ định nghĩa trước khi chọn.'],
  },
  'conversation': {
    strategyVi: '🧠 KHUNG TƯ DUY 4 BƯỚC:\n① Đọc câu hỏi/câu nói của A → xác định A đang HỎI GÌ hoặc NÓI VỀ GÌ.\n② Nghĩ: "Nếu mình là B, mình sẽ trả lời gì?" → hình dung câu trả lời trong đầu.\n③ Đọc 3 đáp án → tìm đáp án GẦN NHẤT với câu trả lời vừa nghĩ.\n④ Kiểm tra: đáp án có ĐÚNG CHỦ ĐỀ không? (A hỏi về thời gian → B phải trả lời về thời gian).\n\n💡 MẸO KHI KHÔNG CHẮC:\n• Nếu A hỏi "What/Where/When/Who" → B phải trả lời ĐÚNG loại thông tin đó.\n• Nếu A hỏi "Do you...?" → B phải trả lời "Yes/No" trước.\n• LOẠI ngay đáp án LẠC ĐỀ: A hỏi về đồ uống, B nói về bơi lội → SAI.\n• Đọc to cả đoạn hội thoại (A + B) — nếu nghe tự nhiên như 2 người nói chuyện thật thì đúng.',
    rubricVi: ['Xác định chủ đề câu hỏi của A.', 'Loại đáp án lạc đề ngay.', 'Đáp án phải trả lời đúng dạng câu hỏi (What→vật, Where→nơi, When→giờ).', 'Đọc to để kiểm tra tự nhiên.'],
  },
  'story_completion': {
    strategyVi: '🧠 KHUNG TƯ DUY 4 BƯỚC:\n① Đọc câu hỏi/câu cần điền TRƯỚC.\n② Đọc đoạn văn → đánh dấu câu chứa thông tin liên quan.\n③ Viết 1-3 từ dựa trên thông tin trong bài — KHÔNG bịa thêm.\n④ Đọc lại câu hoàn chỉnh → kiểm tra ngữ pháp + nghĩa.\n\n💡 MẸO KHI KHÔNG CHẮC:\n• Đáp án hầu như luôn CÓ SẴN trong bài — chỉ cần tìm và chép.\n• Nếu câu cần điền bắt đầu bằng "He/She was..." → cần tính từ hoặc V-ing.\n• Nếu câu cần điền bắt đầu bằng "They went to the..." → cần danh từ chỉ nơi chốn.\n• Đếm số từ: đề yêu cầu 1-3 từ → không viết cả câu dài.',
    rubricVi: ['Tìm thông tin trong bài, không bịa.', 'Viết đúng số từ yêu cầu.', 'Kiểm tra ngữ pháp câu hoàn chỉnh.', 'Chính tả đúng — chép từ bài nếu cần.'],
  },
  'reading_mc': {
    strategyVi: '🧠 KHUNG TƯ DUY 5 BƯỚC:\n① Đọc CÂU HỎI trước — biết mình cần tìm gì.\n② Đọc đoạn văn 1 lần nhanh (skim) → nắm ý chính.\n③ Đọc lại → tìm CÂU chứa đáp án (thường có từ khóa giống câu hỏi).\n④ So sánh thông tin tìm được với 3 đáp án → chọn đáp án khớp nhất.\n⑤ Kiểm tra 2 đáp án còn lại có bị "gần đúng" không — bẫy phổ biến!\n\n💡 MẸO LOẠI TRỪ KHI KHÔNG CHẮC:\n• Đáp án có từ KHÔNG xuất hiện trong bài → thường SAI.\n• Đáp án "quá tuyệt đối" (always, never, all, none) → thường SAI.\n• Đáp án dùng lại ĐÚNG từ trong bài nhưng ĐỔI NGHĨA → bẫy! Đọc lại nguyên câu.\n• Khi 2 đáp án gần giống nhau → đáp án đúng thường là cái CỤ THỂ hơn.\n• Nếu hoàn toàn không biết → chọn đáp án DÀI NHẤT (thường chứa thông tin chính xác hơn).',
    rubricVi: ['Đọc câu hỏi trước bài.', 'Tìm câu chứa đáp án bằng từ khóa.', 'Loại đáp án có từ không xuất hiện trong bài.', 'Cẩn thận đáp án "gần đúng" — bẫy phổ biến.', 'Chọn đáp án cụ thể nhất khi phân vân.'],
  },
  'listening_general': {
    strategyVi: '🧠 KHUNG TƯ DUY NGHE 4 BƯỚC:\n① TRƯỚC khi nghe: đọc câu hỏi + xem tranh → dự đoán nội dung.\n② Lần nghe 1: nghe TỔNG THỂ → chọn đáp án sơ bộ.\n③ Lần nghe 2: kiểm tra đáp án → đặc biệt chú ý số, tên, màu sắc.\n④ Nếu không chắc → chọn đáp án nghe được RÕ NHẤT trong bài.\n\n💡 MẸO KHI NGHE KHÔNG KỊP:\n• Viết chữ cái đầu tiên của từ nghe được → hoàn thiện sau.\n• Số thường được nhắc lại 2 lần — lần 2 mới là đáp án chính xác.\n• Nếu speaker tự sửa ("No, wait, it is...") → đáp án là phần SAU khi sửa.\n• Tên riêng thường được ĐÁNH VẦN — nghe từng chữ cái.',
    rubricVi: ['Đọc câu hỏi trước khi nghe.', 'Nghe lần 1 chọn, lần 2 kiểm tra.', 'Chú ý khi speaker tự sửa lại.', 'Ghi nhanh chữ cái đầu để nhớ.'],
  },
  'open_gap': {
    strategyVi: '🧠 KHUNG TƯ DUY 4 BƯỚC:\n① Đọc cả câu có chỗ trống → xác định LOẠI TỪ (danh từ? giới từ? động từ?).\n② Nhìn từ TRƯỚC chỗ trống: "a/an/the" → cần DANH TỪ. "is/are" → TÍNH TỪ hoặc V-ing. "to" → ĐỘNG TỪ nguyên mẫu.\n③ Nhìn từ SAU chỗ trống: để xác định nghĩa.\n④ Nghĩ từ phù hợp → kiểm tra chính tả.\n\n💡 MẸO KHI KHÔNG CHẮC:\n• Các từ hay xuất hiện ở open gap: is, are, was, were, the, a, an, in, on, at, to, for, with, and, but, or, not.\n• Nếu câu thiếu ĐỘNG TỪ "to be" → thử is/are/was/were.\n• Nếu câu thiếu GIỚI TỪ → thử in/on/at.\n• Đọc to cả câu với từ đã điền — phải nghe tự nhiên.',
    rubricVi: ['Xác định loại từ cần điền.', 'Dùng manh mối từ trước/sau chỗ trống.', 'Ưu tiên từ chức năng phổ biến.', 'Đọc to kiểm tra.'],
  },
  'mc_cloze': {
    strategyVi: '🧠 KHUNG TƯ DUY 3 BƯỚC:\n① Đọc cả câu → hiểu NGHĨA tổng thể.\n② Xác định bài đang kiểm tra NGỮ PHÁP gì (thì? giới từ? từ nối?).\n③ Thử từng đáp án → chọn đáp án đúng ngữ pháp VÀ đúng nghĩa.\n\n💡 MẸO KHI KHÔNG CHẮC:\n• Nếu 3 đáp án cùng nghĩa nhưng khác dạng (go/went/going) → bài kiểm tra THÌ → tìm từ chỉ thời gian (yesterday, now, tomorrow).\n• Nếu 3 đáp án là giới từ (in/on/at) → nhớ: AT + giờ/tuổi, ON + ngày/thứ, IN + tháng/năm/buổi.\n• "Much" + danh từ không đếm được. "Many" + danh từ đếm được.\n• Khi phân vân → đọc to 3 phiên bản — tai sẽ chọn được câu tự nhiên nhất.',
    rubricVi: ['Hiểu nghĩa tổng thể câu.', 'Xác định điểm ngữ pháp được kiểm tra.', 'Dùng manh mối thời gian/số lượng.', 'Đọc to để kiểm tra.'],
  },
};

// ══════════════════════════════════════════════════════════════
// PART-SPECIFIC QUESTION BUILDER — matches real Cambridge format
// ══════════════════════════════════════════════════════════════

// Word banks for true/false and yes/no parts
const PICTURE_WORDS = [
  { word: 'dog', emoji: '🐕', category: 'animal' }, { word: 'cat', emoji: '🐈', category: 'animal' },
  { word: 'bird', emoji: '🐦', category: 'animal' }, { word: 'fish', emoji: '🐟', category: 'animal' },
  { word: 'horse', emoji: '🐴', category: 'animal' }, { word: 'frog', emoji: '🐸', category: 'animal' },
  { word: 'apple', emoji: '🍎', category: 'food' }, { word: 'banana', emoji: '🍌', category: 'food' },
  { word: 'bread', emoji: '🍞', category: 'food' }, { word: 'cake', emoji: '🎂', category: 'food' },
  { word: 'ball', emoji: '⚽', category: 'toy' }, { word: 'kite', emoji: '🪁', category: 'toy' },
  { word: 'car', emoji: '🚗', category: 'transport' }, { word: 'bus', emoji: '🚌', category: 'transport' },
  { word: 'boat', emoji: '⛵', category: 'transport' }, { word: 'bike', emoji: '🚲', category: 'transport' },
  { word: 'pen', emoji: '🖊️', category: 'school' }, { word: 'book', emoji: '📖', category: 'school' },
  { word: 'chair', emoji: '🪑', category: 'furniture' }, { word: 'table', emoji: '🪑', category: 'furniture' },
];

const SCENE_SENTENCES: { scene: string; emoji: string; sentences: { text: string; answer: 'Yes' | 'No' }[] }[] = [
  { scene: 'a park with children playing', emoji: '🏞️🧒⚽', sentences: [
    { text: 'There are three children in the park.', answer: 'Yes' },
    { text: 'The children are playing football.', answer: 'Yes' },
    { text: 'It is raining in the picture.', answer: 'No' },
    { text: 'There is a dog in the park.', answer: 'No' },
    { text: 'The children look happy.', answer: 'Yes' },
  ]},
  { scene: 'a classroom with a teacher', emoji: '🏫👩‍🏫📚', sentences: [
    { text: 'The teacher is standing next to the board.', answer: 'Yes' },
    { text: 'The children are sitting at their desks.', answer: 'Yes' },
    { text: 'There are books on the table.', answer: 'Yes' },
    { text: 'The teacher is cooking food.', answer: 'No' },
    { text: 'The classroom has no windows.', answer: 'No' },
  ]},
  { scene: 'a kitchen with a family cooking', emoji: '🍳👨‍👩‍👧🥗', sentences: [
    { text: 'The family is in the kitchen.', answer: 'Yes' },
    { text: 'Mum is making a salad.', answer: 'Yes' },
    { text: 'The children are watching TV.', answer: 'No' },
    { text: 'There is food on the table.', answer: 'Yes' },
    { text: 'Dad is reading a newspaper.', answer: 'No' },
  ]},
  { scene: 'a beach with people swimming', emoji: '🏖️🏊🌊', sentences: [
    { text: 'Some people are swimming in the sea.', answer: 'Yes' },
    { text: 'There is a boat on the water.', answer: 'Yes' },
    { text: 'It is snowing at the beach.', answer: 'No' },
    { text: 'A child is building a sandcastle.', answer: 'Yes' },
    { text: 'Everyone is wearing coats.', answer: 'No' },
  ]},
];

const CONVERSATION_EXCHANGES: { setup: string; options: string[]; answer: string }[] = [
  { setup: 'A: What would you like to drink?\nB:', options: ['Orange juice, please.', 'I like swimming.', 'It is Monday.'], answer: 'Orange juice, please.' },
  { setup: 'A: Where is the supermarket?\nB:', options: ['It is next to the bank.', 'I have two brothers.', 'She is nine years old.'], answer: 'It is next to the bank.' },
  { setup: 'A: Can I have a pencil, please?\nB:', options: ['Yes, here you are.', 'No, I do not like pens.', 'It is in the garden.'], answer: 'Yes, here you are.' },
  { setup: 'A: How old is your sister?\nB:', options: ['She is seven.', 'She likes cats.', 'She is at school.'], answer: 'She is seven.' },
  { setup: 'A: What is your favourite subject?\nB:', options: ['I like maths.', 'I have a red bag.', 'It is three o\'clock.'], answer: 'I like maths.' },
  { setup: 'A: Do you want to play football?\nB:', options: ['Yes, that sounds fun!', 'No, it is raining cats.', 'I ate lunch already.'], answer: 'Yes, that sounds fun!' },
  { setup: 'A: What time does school start?\nB:', options: ['At eight thirty.', 'I like my teacher.', 'There are twenty children.'], answer: 'At eight thirty.' },
  { setup: 'A: Where did you go on holiday?\nB:', options: ['We went to the beach.', 'I have a new book.', 'My dog is brown.'], answer: 'We went to the beach.' },
];

function buildPartSpecificQuestion(base: Omit<PracticeQuestion, 'prompt' | 'options' | 'answer'>, levelId: CambridgeExamLevelId, setNo: number, component: CambridgeOfficialComponentSpec, part: CambridgeOfficialPartSpec, theme: typeof EXAM_THEMES[number], questionNo: number) {
  const title = part.titleEn.toLowerCase();

  // ── LISTENING PARTS ──
  if (component.skill === 'listening') {
    if (title.includes('draw lines') || title.includes('matching')) {
      // Listening Part 1: Match names to people
      const names = ['Tom', 'Anna', 'Sam', 'Grace', 'Ben'];
      const items = ['the tall boy with glasses', 'the girl with a red hat', 'the child next to the tree', 'the woman with a bag', 'the boy holding a ball'];
      const ni = (setNo + questionNo - 1) % names.length;
      return { ...base, prompt: `🔊 Listen. Which person is ${names[ni]}?`, options: items.map((_, i) => `Person ${i + 1}`), answer: `Person ${ni + 1}`, audioTranscript: `Woman: Where is ${names[ni]}?\nMan: ${names[ni]} is ${items[ni]}.`, explanationVi: `${names[ni]} được mô tả là "${items[ni]}". Khi nghe, chú ý mô tả ngoại hình (tall, short, glasses, hat) và vị trí (next to, behind, near) — đây là manh mối chính để nối tên với người.`, ...EXAM_STRATEGIES.listening_general };
    }
    if (title.includes('write') || title.includes('number')) {
      // Listening Part 2: Write name/number
      const answer = selectGapAnswer(questionNo, theme);
      return { ...base, prompt: `🔊 Listen and write the missing word or number.\n\n${theme.person}'s note:\nActivity: ${theme.activity}\nPlace: ${theme.place}\nTime: ____`, options: [], answer, audioTranscript: buildListeningTranscript(theme, answer, questionNo), explanationVi: `Đáp án là "${answer}". Trong bài nghe, thông tin này được nói rõ — chú ý phân biệt số dễ nhầm (13/30, 14/40, 15/50) và tên riêng được đánh vần từng chữ cái.`, ...EXAM_STRATEGIES.listening_general };
    }
    if (title.includes('multiple choice') || title.includes('picture')) {
      // Listening Part 3: Picture MC
      const tq = theme.questions;
      const qi = (questionNo - 1) % tq.length;
      return { ...base, prompt: `🔊 Listen to the conversation. Choose the correct picture.\n\n${tq[qi].q}`, options: tq[qi].opts, answer: tq[qi].a, audioTranscript: buildListeningTranscript(theme, tq[qi].a, questionNo), explanationVi: `Đáp án "${tq[qi].a}". Bẫy phổ biến: speakers thường nhắc đến cả 3 đáp án nhưng chỉ XÁC NHẬN 1 cái. Chú ý từ khóa "actually", "no wait", "I mean" — đáp án đúng là phần SAU khi sửa.`, ...EXAM_STRATEGIES.listening_general };
    }
    if (title.includes('colour')) {
      // Listening Part 4: Colouring
      const colours = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown'];
      const objects = ['the ball', 'the hat', 'the bag', 'the flower', 'the car'];
      const ci = (setNo + questionNo) % colours.length;
      const oi = (setNo + questionNo) % objects.length;
      return { ...base, prompt: `🔊 Listen and colour. What colour is ${objects[oi]}?\n\nColour ${objects[oi]} ____`, options: [colours[ci], colours[(ci + 2) % colours.length], colours[(ci + 4) % colours.length]], answer: colours[ci], audioTranscript: `Woman: Can you see ${objects[oi]}? Colour it ${colours[ci]}, please.\nChild: ${colours[ci]}?\nWoman: Yes, ${colours[ci]}.`, explanationVi: `Tô ${objects[oi]} màu ${colours[ci]}. Trong bài nghe, người lớn sẽ nói tên đồ vật TRƯỚC, rồi mới nói màu — nghe 2 thông tin theo thứ tự.`, ...EXAM_STRATEGIES.listening_general };
    }
    // Default listening
    const answer = selectGapAnswer(questionNo, theme);
    return { ...base, prompt: `🔊 Listen and answer.\n\n${theme.questions[(questionNo - 1) % theme.questions.length].q}`, options: theme.questions[(questionNo - 1) % theme.questions.length].opts, answer: theme.questions[(questionNo - 1) % theme.questions.length].a, audioTranscript: buildListeningTranscript(theme, answer, questionNo), explanationVi: `Đáp án nằm trong đoạn hội thoại. Khi nghe, tập trung vào câu trả lời trực tiếp của nhân vật — bỏ qua phần chào hỏi và câu lặp lại.`, ...EXAM_STRATEGIES.listening_general };
  }

  // ── READING & WRITING: TRUE/FALSE (Starters P1) ──
  if (title.includes('true/false') || title.includes('true or false')) {
    const pw = PICTURE_WORDS[(setNo + questionNo - 1) % PICTURE_WORDS.length];
    const isTrue = questionNo % 2 === 1;
    const wrongWord = PICTURE_WORDS[(setNo + questionNo + 3) % PICTURE_WORDS.length];
    const shownWord = isTrue ? pw.word : wrongWord.word;
    return { ...base, imageEmoji: pw.emoji, prompt: `Look at the picture. Read the word.\n\n${pw.emoji}  →  "${shownWord}"\n\nIs this correct? ✓ (tick) or ✗ (cross)?`, options: ['✓ (Yes — correct)', '✗ (No — wrong)'], answer: isTrue ? '✓ (Yes — correct)' : '✗ (No — wrong)', explanationVi: isTrue ? `Đúng — tranh là ${pw.word} và từ viết "${shownWord}" khớp nhau. Bài này kiểm tra con có BIẾT TỪ VỰNG cơ bản không.` : `Sai — tranh là ${pw.word} nhưng từ viết "${shownWord}" không khớp. Cả hai đều là từ quen thuộc — bẫy là chúng cùng chủ đề (${pw.category}) nên dễ nhầm.`, ...EXAM_STRATEGIES.true_false };
  }

  // ── READING & WRITING: YES/NO PICTURE SENTENCES (Starters P2, Movers P2) ──
  if (title.includes('yes/no') || title.includes('yes or no')) {
    const sceneData = SCENE_SENTENCES[(setNo + questionNo) % SCENE_SENTENCES.length];
    const sent = sceneData.sentences[(questionNo - 1) % sceneData.sentences.length];
    return { ...base, imageEmoji: sceneData.emoji, prompt: `Look at the picture: ${sceneData.scene}\n\n${sceneData.emoji}\n\n"${sent.text}"\n\nIs this sentence correct? Choose Yes or No.`, options: ['Yes', 'No'], answer: sent.answer, explanationVi: sent.answer === 'Yes' ? `Đúng — câu "${sent.text}" mô tả chính xác chi tiết trong tranh ${sceneData.scene}. Mỗi từ khóa trong câu đều khớp với tranh.` : `Sai — câu "${sent.text}" có chi tiết KHÔNG khớp với tranh ${sceneData.scene}. Bẫy phổ biến: câu ĐÚNG một phần nhưng SAI ở 1 chi tiết nhỏ (số lượng, màu sắc, hành động).`, ...EXAM_STRATEGIES.yes_no };
  }

  // ── READING & WRITING: DIALOGUE COMPLETION A-H (Flyers P2) ──
  // Official Flyers format: Read a continuous dialogue with gaps, choose best response from list A-H
  if (title.includes('dialogue completion') || title.includes('dialogue')) {
    const dialogueResponses = [
      { gap: 'A: What did you do at the weekend?\nB: ____', responses: ['A) I went swimming with my friends.', 'B) I like chocolate cake.', 'C) It was very sunny yesterday.', 'D) We have a new teacher.', 'E) My brother is older than me.', 'F) I played computer games all day.', 'G) She went to the cinema.', 'H) I want to be a doctor.'], answer: 'A) I went swimming with my friends.' },
      { gap: 'A: Would you like to come to my party?\nB: ____', responses: ['A) Yes, I had a great time.', 'B) I went to school yesterday.', 'C) Yes, that sounds great! When is it?', 'D) No, it is too hot today.', 'E) My favourite colour is blue.', 'F) I have got two cats.', 'G) She likes pizza.', 'H) I am ten years old.'], answer: 'C) Yes, that sounds great! When is it?' },
      { gap: 'A: How do you get to school?\nB: ____', responses: ['A) I like maths and science.', 'B) I walk because it is very near.', 'C) School starts at half past eight.', 'D) My teacher is very nice.', 'E) I am in class 5B.', 'F) I take the bus every day.', 'G) I do my homework after dinner.', 'H) There are thirty children in my class.'], answer: 'B) I walk because it is very near.' },
      { gap: 'A: What do you want to be when you grow up?\nB: ____', responses: ['A) I want to be a pilot because I love planes.', 'B) I went to the park yesterday.', 'C) My mum works in a hospital.', 'D) I have three brothers.', 'E) I like watching cartoons.', 'F) It was rainy last week.', 'G) I ate pasta for dinner.', 'H) My favourite animal is a dolphin.'], answer: 'A) I want to be a pilot because I love planes.' },
    ];
    const di = (setNo + questionNo - 1) % dialogueResponses.length;
    const d = dialogueResponses[di];
    return { ...base, prompt: `📖 Read the conversation. Choose the best answer from A to H.\n\n${d.gap}\n\nChoose from:\n${d.responses.join('\n')}`, options: [d.answer, d.responses.find(r => r !== d.answer && r.includes('yesterday')) || d.responses[1], d.responses.find(r => r !== d.answer && !r.includes('yesterday') && r !== d.responses[1]) || d.responses[3]], answer: d.answer, explanationVi: `"${d.answer}" đúng vì trả lời ĐÚNG CHỦ ĐỀ mà A hỏi. Các đáp án khác lạc đề — nói về chủ đề không liên quan. Kỹ thuật: xác định A hỏi về GÌ (thời gian? nơi chốn? hoạt động?) → chỉ chọn đáp án trả lời đúng loại thông tin đó.`, ...EXAM_STRATEGIES.conversation };
  }

  // ── READING & WRITING: WORD-BANK GAP FILL (Flyers P3) ──
  // Official Flyers format: Choose correct word from word bank to complete factual text
  if (title.includes('word-bank')) {
    const answer = selectGapAnswer(questionNo, theme);
    const passageWithGap = theme.passage.replace(new RegExp(answer, 'i'), '____');
    const wordBank = [answer, theme.object.split(' ')[0], theme.color, theme.person, theme.place.split(' ')[0]].filter((v, i, a) => a.indexOf(v) === i).slice(0, 5);
    return { ...base, prompt: `📖 Read the text. Choose the correct word from the box to fill each gap.\n\nWord box: ${wordBank.join(' | ')}\n\n"${passageWithGap}"`, options: wordBank.slice(0, 3), answer, explanationVi: `Đáp án "${answer}" — từ này phù hợp vì câu trước/sau nói về ${theme.title}. Mẹo: đọc CẢ CÂU trước và sau chỗ trống. Loại bỏ từ đã dùng ở gap khác. Thử từng từ còn lại — chỉ 1 từ khớp cả nghĩa và ngữ pháp.`, ...EXAM_STRATEGIES.gap_fill_wordbank };
  }

  // ── READING & WRITING: MC GRAMMAR CLOZE (Flyers P4) ──
  // Official Flyers format: Choose A, B, or C grammatical form to complete text
  if (title.includes('mc grammar')) {
    const grammarItems = [
      { sentence: `${theme.person} ____ to the ${theme.place} yesterday.`, options: ['went', 'go', 'going'], answer: 'went', rule: 'THÌ: "yesterday" → past simple → went' },
      { sentence: `There ____ many people at the ${theme.activity}.`, options: ['were', 'was', 'is'], answer: 'were', rule: 'CHỦ NGỮ SỐ NHIỀU: "many people" → were' },
      { sentence: `${theme.person} has ____ been to the ${theme.place} before.`, options: ['never', 'ever', 'always'], answer: 'never', rule: 'NGHĨA: "has never been" = chưa từng đến' },
      { sentence: `The ${theme.object} was ____ the table.`, options: ['on', 'at', 'to'], answer: 'on', rule: 'GIỚI TỪ: trên bề mặt → on' },
      { sentence: `${theme.person} ____ like to try the ${theme.activity}.`, options: ['would', 'will', 'is'], answer: 'would', rule: 'CẤU TRÚC: "would like to" = muốn' },
    ];
    const gi = (setNo + questionNo - 1) % grammarItems.length;
    const g = grammarItems[gi];
    return { ...base, prompt: `📖 Choose the correct word (A, B or C) to complete the sentence.\n\n"${g.sentence}"\n\nA) ${g.options[0]}   B) ${g.options[1]}   C) ${g.options[2]}`, options: g.options, answer: g.answer, explanationVi: `"${g.answer}" đúng. Quy tắc: ${g.rule}. Các đáp án khác sai ngữ pháp trong ngữ cảnh này. Mẹo tổng quát: tìm manh mối thời gian (yesterday/now/tomorrow), số lượng (one/many), và cấu trúc cố định.`, ...EXAM_STRATEGIES.mc_cloze };
  }

  // ── READING & WRITING: JUMBLED LETTERS (Starters P3) ──
  if (title.includes('jumbled')) {
    const pw = PICTURE_WORDS[(setNo * 3 + questionNo) % PICTURE_WORDS.length];
    const letters = pw.word.split('');
    // Shuffle deterministically based on setNo
    const shuffled = [...letters].sort((a, b) => ((setNo + letters.indexOf(a)) % 3) - ((setNo + letters.indexOf(b)) % 3));
    const jumbledDisplay = shuffled.join('  ').toUpperCase();
    return { ...base, taskTypeEn: 'Spell', imageEmoji: pw.emoji, prompt: `Look at the picture. Put the letters in the right order.\n\n${pw.emoji}\n\n${jumbledDisplay}`, options: [], answer: pw.word, explanationVi: `Từ đúng là "${pw.word}" (${pw.category}). Các chữ cái ${jumbledDisplay} sắp xếp lại thành ${pw.word}. Nhớ: mỗi từ tiếng Anh phải có ít nhất 1 nguyên âm (a/e/i/o/u).`, ...EXAM_STRATEGIES.jumbled };
  }

  // ── READING & WRITING: WORD-BOX GAP FILL (Starters P4, Movers P4) ──
  if (title.includes('gap fill') || title.includes('word-box') || title.includes('cloze')) {
    const answer = selectGapAnswer(questionNo, theme);
    const passageWithGap = theme.passage.replace(new RegExp(answer, 'i'), '____');
    const wordBank = [answer, theme.object.split(' ')[0], theme.color, theme.person, theme.place.split(' ')[0]].filter((v, i, a) => a.indexOf(v) === i).slice(0, 5);
    return { ...base, prompt: `📖 Read the text. Choose the correct word to fill the gap.\n\nWord bank: ${wordBank.join(' | ')}\n\n"${passageWithGap}"`, options: wordBank.slice(0, 3), answer, explanationVi: `Đáp án "${answer}" — từ này phù hợp vì câu trước/sau nói về ${theme.title}. Các từ khác trong word bank sai vì không khớp ngữ cảnh (loại từ hoặc nghĩa). Luôn đọc CẢ CÂU sau khi điền để kiểm tra.`, ...EXAM_STRATEGIES.gap_fill_wordbank };
  }

  // ── READING & WRITING: ONE-WORD STORY ANSWERS (Starters P5) ──
  if (title.includes('one-word') || title.includes('story answer')) {
    const tq = theme.questions;
    const qi = (questionNo - 1) % tq.length;
    return { ...base, prompt: `📖 Read the story and answer with ONE word.\n\n"${theme.passage}"\n\n${tq[qi].q}`, options: [], answer: tq[qi].a.split(' ')[0], explanationVi: `Đáp án: "${tq[qi].a}". Câu trả lời nằm trực tiếp trong đoạn văn — tìm câu có từ khóa giống câu hỏi ("${tq[qi].q.split(' ').slice(0, 3).join(' ')}..."). Chỉ cần chép lại 1 từ, kiểm tra chính tả kỹ.`, ...EXAM_STRATEGIES.one_word_story };
  }

  // == READING & WRITING: STORY WORD-BOX CLOZE (Movers P3) ==
  // Real exam: Read a story, choose words from a box to fill 5 gaps + choose best title
  if (title.includes('story word-box')) {
    const answer = selectGapAnswer(questionNo, theme);
    const passageWithGap = theme.passage.replace(new RegExp(answer, 'i'), '____');
    const wordBank = [answer, theme.object.split(' ')[0], theme.color, theme.person, theme.place.split(' ')[0], theme.activity].filter((v, i, a) => a.indexOf(v) === i).slice(0, 8);
    if (questionNo <= 5) {
      return { ...base, prompt: `Read the story. Choose a word from the box. Write the correct word next to number ${questionNo}.\n\nWord box: ${wordBank.join(' | ')}\n\n"${passageWithGap}"`, options: wordBank.slice(0, 4), answer, explanationVi: `"${answer}". Doc ca cau chua cho trong, xac dinh loai tu can dien. Thu tung tu con lai trong hop tu, chi 1 tu vua dung nghia vua dung ngu phap. Meo: gach bo tu da dung.`, ...EXAM_STRATEGIES.gap_fill_wordbank };
    }
    const titles = [`${theme.title}`, `A day at the ${theme.place}`, `${theme.person}'s adventure`];
    return { ...base, prompt: `Now choose the best name for the story. Tick one box.\n\nA) ${titles[0]}\nB) ${titles[1]}\nC) ${titles[2]}`, options: titles, answer: titles[0], explanationVi: `"${titles[0]}" phu hop nhat vi bao quat noi dung chinh cua toan bo truyen.`, ...EXAM_STRATEGIES.mc_cloze };
  }

  // == READING & WRITING: FACTUAL MC CLOZE (Movers P4) ==
  // Real exam: Read factual text, choose the right word from 3 options per gap
  if (title.includes('factual mc')) {
    const grammarItems = [
      { sentence: `${theme.person} went to the ${theme.place}. It was bigger ____ the one near home.`, options: ['than', 'then', 'that'], answer: 'than', rule: 'SO SANH HON: bigger + than' },
      { sentence: `The ${theme.object} moved very ____ across the ${theme.place}.`, options: ['quickly', 'quick', 'quicker'], answer: 'quickly', rule: 'TRANG TU: bo nghia cho dong tu -> dung -ly' },
      { sentence: `${theme.person} looked ____ of the window and saw the ${theme.place}.`, options: ['out', 'on', 'up'], answer: 'out', rule: 'GIOI TU: look out of = nhin ra ngoai' },
      { sentence: `The people ____ live near the ${theme.place} are very friendly.`, options: ['who', 'which', 'where'], answer: 'who', rule: 'DAI TU QUAN HE: people = nguoi -> who' },
      { sentence: `Some ${theme.object}s can ____ very fast in the water.`, options: ['swim', 'swims', 'swimming'], answer: 'swim', rule: 'DONG TU NGUYEN MAU: can + V-nguyen mau' },
    ];
    const gi = (setNo + questionNo - 1) % grammarItems.length;
    const g = grammarItems[gi];
    return { ...base, prompt: `Read the text. Choose the right words and write them on the lines.\n\n"${g.sentence}"\n\nA) ${g.options[0]}   B) ${g.options[1]}   C) ${g.options[2]}`, options: g.options, answer: g.answer, explanationVi: `"${g.answer}" dung. Quy tac: ${g.rule}. Doc CA CAU, tim manh moi ngu phap. Loai dap an sai ngu phap truoc, roi chon dap an dung nghia.`, ...EXAM_STRATEGIES.mc_cloze };
  }

  // == READING & WRITING: LOOK READ AND WRITE (Movers P6) ==
  // Real exam: 3 sub-tasks from a picture: 1-word answers, sentence answers, write 2 sentences
  if (title.includes('look read and write')) {
    const sceneData = SCENE_SENTENCES[(setNo + questionNo) % SCENE_SENTENCES.length];
    if (questionNo <= 2) {
      const oneWordQs = [
        { q: `What colour is the ${theme.object}?`, a: theme.color },
        { q: `How many ${theme.object}s can you see?`, a: 'two' },
      ];
      const qItem = oneWordQs[(questionNo - 1) % oneWordQs.length];
      return { ...base, prompt: `Look at the picture. Answer the question.\n\n${sceneData.emoji}\n\n${qItem.q}\n\nWrite ONE word.`, options: [], answer: qItem.a, explanationVi: `"${qItem.a}". Bai nay yeu cau CHI 1 TU. Nhin ky tranh, tim doi tuong duoc hoi, viet chinh xac 1 tu.`, ...EXAM_STRATEGIES.one_word_story };
    } else if (questionNo <= 4) {
      const sentQs = [
        { q: `What is ${theme.person} doing?`, a: `${theme.person} is ${theme.activity.toLowerCase()}.` },
        { q: `Where are the ${theme.object}s?`, a: `The ${theme.object}s are in the ${theme.place.toLowerCase()}.` },
      ];
      const qItem = sentQs[(questionNo - 3) % sentQs.length];
      return { ...base, prompt: `Look at the picture. Answer the question.\n\n${sceneData.emoji}\n\n${qItem.q}\n\nWrite a COMPLETE sentence.`, options: [], answer: qItem.a, explanationVi: `"${qItem.a}". Bai nay yeu cau CAU DAY DU: chu ngu + dong tu. Kiem tra thi, chinh ta.`, ...EXAM_STRATEGIES.open_gap };
    }
    return { ...base, prompt: `Now write TWO sentences about the picture.\n\n${sceneData.emoji}\n\nWrite about what you can see.`, options: [], answer: `There is a ${theme.object} in the ${theme.place}. ${theme.person} is ${theme.activity.toLowerCase()}.`, explanationVi: `Viet 2 cau don gian mo ta tranh. Cau 1 = mo ta do vat ("There is/are..."). Cau 2 = mo ta hanh dong ("... is/are doing...").`, ...EXAM_STRATEGIES.open_gap };
  }

  // == READING & WRITING: DEFINITIONS WITH PICTURES (Movers P1, Flyers P1) ==
  // Real exam: Look at picture + read definition, write the correct word on the line
  if (title.includes('definition')) {
    const defItems: { word: string; def: string; distractors: string[] }[] = [
      { word: 'nurse', def: 'a person who works in a hospital and helps sick people', distractors: ['teacher', 'farmer'] },
      { word: 'tea', def: 'a hot drink made by putting leaves in boiling water', distractors: ['coffee', 'juice'] },
      { word: 'city', def: 'a very big town where many people live and work', distractors: ['village', 'forest'] },
      { word: 'sandwich', def: 'you can put cheese or meat between bread to make this', distractors: ['salad', 'soup'] },
      { word: 'field', def: 'this is part of a farm where you often see animals or crops', distractors: ['garden', 'kitchen'] },
      { word: 'hospital', def: 'a place where sick people go to see a doctor', distractors: ['supermarket', 'cinema'] },
      { word: 'dictionary', def: 'a book that tells you what words mean', distractors: ['newspaper', 'envelope'] },
      { word: 'island', def: 'a piece of land with water all around it', distractors: ['mountain', 'forest'] },
      { word: 'pilot', def: 'a person who flies a plane', distractors: ['farmer', 'dentist'] },
      { word: 'umbrella', def: 'you hold this over your head when it rains', distractors: ['scarf', 'mirror'] },
    ];
    const di = (setNo + questionNo - 1) % defItems.length;
    const d = defItems[di];
    return { ...base, prompt: `Look and read. Choose the correct word and write it on the line.\n\n"${d.def}"`, options: rotateOptions([d.word, ...d.distractors], questionNo), answer: d.word, explanationVi: `"${d.def}" -> "${d.word}". Tim TU KHOA trong dinh nghia de xac dinh dap an. Loai tru: "${d.distractors[0]}" sai vi khong khop dac diem chinh, "${d.distractors[1]}" cung sai vi khac loai/chuc nang.`, ...EXAM_STRATEGIES.definition };
  }

  // == READING & WRITING: CONVERSATION BEST ANSWER (Movers P2) ==
  // Real exam: Read a text (conversation), choose the best answer A, B, or C for each turn
  if (title.includes('conversation')) {
    const ci = (setNo + questionNo - 1) % CONVERSATION_EXCHANGES.length;
    const conv = CONVERSATION_EXCHANGES[ci];
    return { ...base, prompt: `Read the text and choose the best answer.\n\n${conv.setup}`, options: rotateOptions(conv.options, questionNo), answer: conv.answer, explanationVi: `"${conv.answer}" dung vi tra loi DUNG CHU DE ma A hoi. Cac dap an sai bi lac de. Meo: xac dinh A hoi ve GI (thoi gian? noi chon? hoat dong?) -> chi chon dap an tra loi DUNG loai thong tin do.`, ...EXAM_STRATEGIES.conversation };
  }

  // ── READING & WRITING: STORY COMPLETION (Movers P5, Flyers P5) ──
  if (title.includes('story') && !title.includes('one-word') && part.mode !== 'writing') {
    const tq = theme.questions;
    const qi = (questionNo - 1) % tq.length;
    return { ...base, prompt: `📖 Read the story. Write ONE to THREE words to complete the sentence.\n\n"${theme.passage}"\n\n${tq[qi].q} ____`, options: [], answer: tq[qi].a, explanationVi: `Đáp án: "${tq[qi].a}". Thông tin nằm trong đoạn văn — tìm câu chứa từ khóa giống câu hỏi. Đáp án phải khớp ngữ pháp: kiểm tra chủ ngữ-động từ, thì, và số ít/số nhiều.`, ...EXAM_STRATEGIES.story_completion };
  }

  // ── READING & WRITING: OPEN GAP FILL (Flyers P6, KET P5, PET P6) ──
  if (title.includes('open') && title.includes('gap')) {
    const answer = selectGapAnswer(questionNo, theme);
    const passageWithGap = theme.passage.replace(new RegExp(answer, 'i'), '____');
    return { ...base, prompt: `📖 Read the text. Write ONE word to fill the gap. No word bank.\n\n"${passageWithGap}"`, options: [], answer, explanationVi: `Đáp án "${answer}". Manh mối: từ TRƯỚC chỗ trống cho biết loại từ cần điền, từ SAU cho biết nghĩa. Nếu trước là "a/the" → cần danh từ. Nếu trước là "is/are" → cần tính từ hoặc V-ing.`, ...EXAM_STRATEGIES.open_gap };
  }

  // ── READING: SHORT TEXT MC (KET P1, PET P1) ──
  if (title.includes('short text') || title.includes('notices') || title.includes('signs')) {
    const tq = theme.questions;
    const qi = (questionNo - 1) % tq.length;
    return { ...base, prompt: `📖 Read the short text, then answer the question.\n\n"${theme.passage}"\n\n${tq[qi].q}`, options: tq[qi].opts, answer: tq[qi].a, explanationVi: `Đáp án: "${tq[qi].a}". Đoạn văn ngắn nên đáp án nằm trong 1-2 câu then chốt. Loại trừ: đáp án có từ KHÔNG xuất hiện trong bài thường sai. Đáp án dùng lại từ trong bài nhưng đổi nghĩa là BẪY phổ biến.`, ...EXAM_STRATEGIES.reading_mc };
  }

  // ── READING: LONG TEXT MC (KET P3, PET P3) ──
  if (title.includes('long text') || title.includes('detailed')) {
    const tq = theme.questions;
    const qi = (questionNo - 1) % tq.length;
    return { ...base, prompt: `📖 Read the text carefully, then answer the question.\n\n"${theme.passage}"\n\n${tq[qi].q}`, options: tq[qi].opts, answer: tq[qi].a, explanationVi: `Đáp án: "${tq[qi].a}". Với bài dài, dùng kỹ thuật SCAN: tìm từ khóa trong câu hỏi → quét bài tìm từ đó → đọc kỹ câu chứa từ khóa → đối chiếu đáp án. Đáp án "quá tuyệt đối" (always, never, all) thường SAI.`, ...EXAM_STRATEGIES.reading_mc };
  }

  // ── READING: MATCHING (KET P2, PET P2) ──
  if (title.includes('matching') || title.includes('multiple matching')) {
    const tq = theme.questions;
    const qi = (questionNo - 1) % tq.length;
    return { ...base, prompt: `📖 Read the descriptions. Match each one to the correct answer.\n\n"${theme.passage}"\n\n${tq[qi].q}`, options: tq[qi].opts, answer: tq[qi].a, explanationVi: `"${tq[qi].a}" khớp vì có cùng từ khóa/ý nghĩa với mô tả. Kỹ thuật: gạch chân 2-3 từ quan trọng nhất trong mô tả → tìm đáp án chứa từ đồng nghĩa (synonym) hoặc cùng ý.`, ...EXAM_STRATEGIES.reading_mc };
  }

  // ── READING: MC CLOZE (KET P4, PET P5) ──
  if (title.includes('mc cloze') || title.includes('multiple-choice cloze') || (title.includes('cloze') && part.mode === 'objective')) {
    const grammarItems = [
      { sentence: `${theme.person} ____ to the ${theme.place} yesterday.`, options: ['went', 'go', 'going'], answer: 'went' },
      { sentence: `There ____ many people at the ${theme.activity}.`, options: ['were', 'was', 'is'], answer: 'were' },
      { sentence: `${theme.person} has ____ been to the ${theme.place} before.`, options: ['never', 'ever', 'always'], answer: 'never' },
      { sentence: `The ${theme.object} was ____ the table.`, options: ['on', 'at', 'to'], answer: 'on' },
      { sentence: `${theme.person} ____ like to try the ${theme.activity}.`, options: ['would', 'will', 'is'], answer: 'would' },
    ];
    const gi = (setNo + questionNo - 1) % grammarItems.length;
    const g = grammarItems[gi];
    return { ...base, prompt: `📖 Choose the correct word to complete the sentence.\n\n"${g.sentence}"`, options: g.options, answer: g.answer, explanationVi: `"${g.answer}" đúng ngữ pháp. Phân tích: 3 đáp án ${g.options.join('/')} kiểm tra ${g.options[0] === 'went' ? 'THÌ động từ (yesterday → past simple → went)' : g.options[0] === 'were' ? 'chia to be (many people → số nhiều → were)' : g.options[0] === 'on' ? 'GIỚI TỪ (trên bề mặt → on)' : 'dạng động từ phù hợp ngữ cảnh'}. Tìm manh mối thời gian/số lượng trong câu.`, ...EXAM_STRATEGIES.mc_cloze };
  }

  // ── READING: GAPPED TEXT (PET P4) ──
  if (title.includes('gapped text')) {
    const tq = theme.questions;
    const qi = (questionNo - 1) % tq.length;
    return { ...base, prompt: `📖 Read the text. Choose the correct sentence for each gap.\n\n"${theme.passage}"\n\nWhich sentence fits gap ${questionNo}?`, options: tq[qi].opts, answer: tq[qi].a, explanationVi: `"${tq[qi].a}" phù hợp vì NỐI mạch lạc với câu trước và câu sau. Kỹ thuật: đọc câu TRƯỚC gap → xác định chủ đề → đọc câu SAU gap → tìm câu nối logic. Chú ý đại từ (he/she/it/they) phải khớp với danh từ trước đó.`, ...EXAM_STRATEGIES.reading_mc };
  }

  // ── DEFAULT FALLBACK: Reading passage + MC ──
  const tq = theme.questions;
  const qi = (questionNo - 1) % tq.length;
  return { ...base, prompt: `📖 Read the text, then answer the question.\n\n"${theme.passage}"\n\n${tq[qi].q}`, options: tq[qi].opts, answer: tq[qi].a, explanationVi: `Đáp án: "${tq[qi].a}". Thông tin nằm trong đoạn văn — tìm câu có từ khóa giống câu hỏi. Khi 2 đáp án gần giống → chọn cái CỤ THỂ hơn. Nếu hoàn toàn không biết → chọn đáp án DÀI NHẤT (thường chứa thông tin chính xác hơn).`, ...EXAM_STRATEGIES.reading_mc };
}

function selectGapAnswer(questionNo: number, theme: typeof EXAM_THEMES[number]): string {
  const answers = [theme.answer, theme.object.split(' ')[0], theme.time, theme.color, theme.person];
  return answers[questionNo % answers.length];
}

function _buildObjectiveAnswer(theme: typeof EXAM_THEMES[number], questionNo: number): string {
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

function _buildObjectivePrompt(
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

function _buildGapPrompt(
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
  STARTERS_RW, STARTERS_RW_2, STARTERS_RW_3, STARTERS_RW_AUTHENTIC, STARTERS_LISTENING, STARTERS_LISTENING_AUTHENTIC, STARTERS_SPEAKING,
  MOVERS_RW, MOVERS_RW_2, MOVERS_RW_3, MOVERS_RW_AUTHENTIC_1, MOVERS_RW_AUTHENTIC_2, MOVERS_RW_AUTHENTIC_3, MOVERS_LISTENING_1, MOVERS_LISTENING_2, MOVERS_LISTENING_3,
  FLYERS_RW, FLYERS_RW_2, FLYERS_RW_AUTHENTIC_1, FLYERS_LISTENING_AUTHENTIC_1, FLYERS_LISTENING_2,
  KET_RW_1, KET_RW_2, KET_LISTENING_1, KET_LISTENING_AUTHENTIC, KET_LISTENING_2, KET_SPEAKING,
  PET_RW_1, PET_LISTENING_1, PET_SPEAKING, PET_1_TEST_1, PET_1_TEST_1_LISTENING, PET_1_TEST_2, PET_1_TEST_2_LISTENING, PET_1_TEST_3, PET_1_TEST_3_LISTENING,
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
