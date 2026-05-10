import type { PracticeTest } from './practice-test-bank';

export const PET_1_TEST_2: PracticeTest = {
  id: 'pet_1_test_2',
  level: 'pet',
  skill: 'reading_writing',
  skillVi: 'Đọc & Viết — B1 Preliminary (PET 1, Test 2)',
  totalMinutes: 90,
  parts: [
    {
      partNumber: 1,
      titleEn: 'Reading Part 1: Multiple-choice short texts',
      titleVi: 'Đọc Phần 1: Biển báo và tin nhắn ngắn',
      instructionVi: 'Đọc văn bản ngắn và chọn đáp án đúng (A, B hoặc C).',
      sourcePages: ['/exam-assets/pet1/test2/page-033.png', '/exam-assets/pet1/test2/page-034.png'],
      questions: [
        {
          id: 'pet_1_t2_1', partNumber: 1, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Multiple choice',
          prompt: 'Mr Wright\'s English lesson today will be in Room 24D beside the language laboratory. He\'s off sick, so use the lesson to revise for the test. Bring your workbooks!',
          options: ['A. The English class must take their workbooks to the language laboratory.', 'B. The room for English lessons is changing because of the test.', 'C. The usual English teacher cannot attend today\'s lesson.'],
          answer: 'C', explanationVi: 'Thầy Wright nghỉ ốm (He\'s off sick) → giáo viên bình thường không thể dạy.', strategyVi: 'Tìm thông tin chính: ai không đến, lý do gì.'
        },
        {
          id: 'pet_1_t2_2', partNumber: 1, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Multiple choice',
          prompt: 'Trip to New York — Application forms will be available from the school office from 1st November.',
          options: ['A. Application forms are unavailable after 1st November.', 'B. The earliest that students can pick up their application forms is 1st November.', 'C. Students should give in their application forms on 1st November.'],
          answer: 'B', explanationVi: '"available from 1st November" = có sẵn từ ngày 1/11 → sớm nhất là 1/11.', strategyVi: 'Chú ý "from" = kể từ, không phải "by" = trước.'
        },
        {
          id: 'pet_1_t2_3', partNumber: 1, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Multiple choice',
          prompt: 'Having a great holiday! Went windsurfing today after playing beach volleyball. Stopped for a barbecue on the way to the funfair yesterday. See you soon! Louis',
          options: ['A. Louis went windsurfing after he went to the funfair yesterday.', 'B. Louis played beach volleyball before he went windsurfing.', 'C. Louis went to the funfair before he had lunch.'],
          answer: 'B', explanationVi: '"Went windsurfing today after playing beach volleyball" → chơi bóng chuyền trước, lướt ván sau.', strategyVi: 'Đọc kỹ trình tự thời gian: today vs yesterday.'
        },
        {
          id: 'pet_1_t2_4', partNumber: 1, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Multiple choice',
          prompt: 'Jungle Café — SORRY! Tables at the front of the café are reserved for a birthday party.',
          options: ['A. Don\'t sit at the front of the café unless you\'re attending the party.', 'B. Only people invited to the party can come into the café.', 'C. If you\'re coming to the party you shouldn\'t use the tables at the front.'],
          answer: 'A', explanationVi: 'Bàn phía trước được giữ cho tiệc sinh nhật → đừng ngồi trừ khi bạn dự tiệc.', strategyVi: 'Phân biệt: reserved for = dành riêng cho.'
        },
        {
          id: 'pet_1_t2_5', partNumber: 1, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Multiple choice',
          prompt: 'From: Marie — To: Sylviane — Subject: Science Textbooks. Thanks for lending me that biology book – I\'m glad you got it back OK. You can borrow my chemistry one and return it next week if you want.',
          options: ['A. Marie is offering to lend Sylviane a book.', 'B. Marie wants to return one of Sylviane\'s books to her.', 'C. Marie is asking Sylviane to give back a book she has borrowed.'],
          answer: 'A', explanationVi: '"You can borrow my chemistry one" → Marie đề nghị cho Sylviane mượn sách hóa.', strategyVi: 'Xác định ai cho mượn, ai mượn, sách nào.'
        }
      ]
    },
    {
      partNumber: 2,
      titleEn: 'Reading Part 2: Matching (Swimming Clubs)',
      titleVi: 'Đọc Phần 2: Nối thông tin (Câu lạc bộ bơi)',
      instructionVi: 'Đọc mô tả về 5 người và 8 câu lạc bộ bơi (A-H). Nối mỗi người với CLB phù hợp nhất.',
      sourcePages: ['/exam-assets/pet1/test2/page-035.png', '/exam-assets/pet1/test2/page-036.png'],
      questions: [
        {
          id: 'pet_1_t2_6', partNumber: 2, taskTypeVi: 'Nối thông tin', taskTypeEn: 'Matching',
          prompt: 'Ralph is a strong swimmer, and would like a club that organises challenging long-distance events. He\'d also like to improve his technique, but only has weekends free.',
          options: ['A. Elvers', 'B. Mermaid Club', 'C. Penguins', 'D. Splash!', 'E. Waterworld', 'F. Seals Group', 'G. Waves', 'H. Sharks'],
          answer: 'D', explanationVi: 'Splash! — CLB nâng cao, bơi 20km biển, thứ Bảy, huấn luyện kỹ thuật → phù hợp Ralph.', strategyVi: 'Tìm từ khóa: long-distance + weekends + technique.'
        },
        {
          id: 'pet_1_t2_7', partNumber: 2, taskTypeVi: 'Nối thông tin', taskTypeEn: 'Matching',
          prompt: 'Marta has just learnt to swim and wants to improve quickly so she can jump off the top board into a big pool. She prefers indoor pools, but doesn\'t like doing competitions.',
          options: ['A. Elvers', 'B. Mermaid Club', 'C. Penguins', 'D. Splash!', 'E. Waterworld', 'F. Seals Group', 'G. Waves', 'H. Sharks'],
          answer: 'H', explanationVi: 'Sharks — bể trong nhà, từ beginner lên, có high-diving, không nhấn mạnh thi đấu.', strategyVi: 'Tìm: beginner + indoor + diving board + no competitions.'
        },
        {
          id: 'pet_1_t2_8', partNumber: 2, taskTypeVi: 'Nối thông tin', taskTypeEn: 'Matching',
          prompt: 'Fiona wants a club where she can swim for pleasure and meet other people. She\'d also like a club that organises games in the pool, and regular social events.',
          options: ['A. Elvers', 'B. Mermaid Club', 'C. Penguins', 'D. Splash!', 'E. Waterworld', 'F. Seals Group', 'G. Waves', 'H. Sharks'],
          answer: 'C', explanationVi: 'Penguins — bơi vui, water volleyball, make friends, club discos → xã hội.', strategyVi: 'Tìm: pleasure + social events + games.'
        },
        {
          id: 'pet_1_t2_9', partNumber: 2, taskTypeVi: 'Nối thông tin', taskTypeEn: 'Matching',
          prompt: 'Jay can\'t swim very far at the moment, so he wants to get stronger. He can only attend one evening per week, so would like individual instruction.',
          options: ['A. Elvers', 'B. Mermaid Club', 'C. Penguins', 'D. Splash!', 'E. Waterworld', 'F. Seals Group', 'G. Waves', 'H. Sharks'],
          answer: 'G', explanationVi: 'Waves — all levels, shallow pool, 1-to-1 teaching, once a week, after 6pm.', strategyVi: 'Tìm: beginner + one evening + individual instruction.'
        },
        {
          id: 'pet_1_t2_10', partNumber: 2, taskTypeVi: 'Nối thông tin', taskTypeEn: 'Matching',
          prompt: 'Daisy wants to attend a swimming club after 6 p.m. on Tuesday and Thursday. She wants to take swimming tests as she moves up from intermediate to advanced level, and hopes to become a winner in club races.',
          options: ['A. Elvers', 'B. Mermaid Club', 'C. Penguins', 'D. Splash!', 'E. Waterworld', 'F. Seals Group', 'G. Waves', 'H. Sharks'],
          answer: 'E', explanationVi: 'Waterworld — weekday evenings, progress certificates, competitions, twice a week.', strategyVi: 'Tìm: evenings + tests/certificates + races + twice a week.'
        }
      ]
    },
    {
      partNumber: 3,
      titleEn: 'Reading Part 3: True/False (Metal Giraffe)',
      titleVi: 'Đọc Phần 3: Đúng/Sai — Hươu cao cổ kim loại',
      instructionVi: 'Đọc bài về tác phẩm hươu cao cổ kim loại của Tom Bennett. Chọn A (Đúng) hoặc B (Sai).',
      sourcePages: ['/exam-assets/pet1/test2/page-037.png', '/exam-assets/pet1/test2/page-038.png'],
      questions: [
        { id: 'pet_1_t2_11', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'True/False', prompt: 'The headmaster wrote to the artist to ask about buying the sculpture for the school.', options: ['A. True', 'B. False'], answer: 'B', explanationVi: 'Hiệu trưởng nhờ học sinh viết thư hỏi giá, không tự viết.', strategyVi: 'Ai viết thư? Headmaster hay students?' },
        { id: 'pet_1_t2_12', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'True/False', prompt: 'The school got the giraffe sculpture free of charge.', options: ['A. True', 'B. False'], answer: 'A', explanationVi: '"all for nothing" = miễn phí hoàn toàn.', strategyVi: 'Tìm: "all for nothing" = free of charge.' },
        { id: 'pet_1_t2_13', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'True/False', prompt: 'The schoolchildren were looking forward to the arrival of the giraffe.', options: ['A. True', 'B. False'], answer: 'B', explanationVi: '"they had no idea that we were getting it" → học sinh không biết trước.', strategyVi: 'Tìm: "no idea" = không mong đợi vì không biết.' },
        { id: 'pet_1_t2_14', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'True/False', prompt: 'The artist Tom Bennett started making metal objects while he was working at a university.', options: ['A. True', 'B. False'], answer: 'B', explanationVi: 'Tom là giáo sư hóa, nghỉ hưu 2006, chỉ bắt đầu làm kim loại vài năm trước bài viết.', strategyVi: 'Phân biệt: "before he retired" vs "while working".' },
        { id: 'pet_1_t2_15', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'True/False', prompt: 'Tom thinks that he did an excellent drawing on his first day at school.', options: ['A. True', 'B. False'], answer: 'B', explanationVi: '"I don\'t think I succeeded!" → Tom nghĩ bức vẽ ngựa không thành công.', strategyVi: 'Đọc kỹ: "I don\'t think I succeeded" = không xuất sắc.' },
        { id: 'pet_1_t2_16', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'True/False', prompt: 'Tom only made one metal bicycle for himself and his wife.', options: ['A. True', 'B. False'], answer: 'A', explanationVi: '"a bicycle for two" → chỉ một chiếc, rồi bỏ làm xe đạp, chuyển sang điêu khắc.', strategyVi: '"a bicycle for two" = 1 chiếc cho 2 người.' },
        { id: 'pet_1_t2_17', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'True/False', prompt: 'Tom changed one of his metal sculptures into a different animal while he was making it.', options: ['A. True', 'B. False'], answer: 'A', explanationVi: '"started out as a cat, but it just didn\'t look right, so I made it into a lion."', strategyVi: 'Tìm: started as cat → became lion.' },
        { id: 'pet_1_t2_18', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'True/False', prompt: 'Tom says that his lion sculpture was very popular with small children.', options: ['A. True', 'B. False'], answer: 'A', explanationVi: '"Some small children wouldn\'t walk past the lion unless they could have a turn sitting and playing on its back."', strategyVi: 'Tìm: "small children" + "sitting and playing" = popular.' },
        { id: 'pet_1_t2_19', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'True/False', prompt: 'Tom intends his animal sculptures to appear realistic.', options: ['A. True', 'B. False'], answer: 'A', explanationVi: '"I think children feel that my sculptures look like actual live animals, and that\'s what I want."', strategyVi: 'Tìm: "actual live animals" + "that\'s what I want" = realistic.' },
        { id: 'pet_1_t2_20', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'True/False', prompt: 'The pupils of Grangetown High have decided on a name for their giraffe sculpture.', options: ['A. True', 'B. False'], answer: 'B', explanationVi: '"going to hold a competition to give it a proper name" → chưa quyết định, đang tổ chức cuộc thi.', strategyVi: 'Phân biệt: "going to" = tương lai, chưa xong.' }
      ]
    },
    {
      partNumber: 4,
      titleEn: 'Reading Part 4: Multiple Choice — Cycling in the countryside',
      titleVi: 'Đọc Phần 4: Đọc hiểu văn bản dài — Đạp xe nông thôn',
      instructionVi: 'Đọc bài của Chris Jones, 14 tuổi, về chuyến đạp xe nông thôn. Chọn A, B, C hoặc D.',
      sourcePages: ['/exam-assets/pet1/test2/page-039.png', '/exam-assets/pet1/test2/page-040.png'],
      questions: [
        { id: 'pet_1_t2_21', partNumber: 4, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'What is Chris Jones doing in this text?', options: ['A. describing the different places he saw while cycling', 'B. comparing cycling to other forms of exercise', 'C. suggesting places to stay on a cycling holiday', 'D. recommending cycling as a good type of holiday'], answer: 'D', explanationVi: 'Bài viết kết luận: "If you\'re looking for a short break that\'s active and cheap, then cycling is a great choice!"', strategyVi: 'Đọc câu cuối để xác định mục đích tổng thể.' },
        { id: 'pet_1_t2_22', partNumber: 4, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'What do we find out about Chris\'s bike?', options: ['A. It wasn\'t as good as his brother\'s.', 'B. It was too old to go fast.', 'C. It needed attention at one point.', 'D. It had trouble going up hills.'], answer: 'C', explanationVi: '"my brakes started making a terrible noise" → phanh cần sửa tại quán cà phê.', strategyVi: 'Tìm chi tiết về xe: brakes → needed attention.' },
        { id: 'pet_1_t2_23', partNumber: 4, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'Chris was pleased because', options: ['A. he and his brother had chosen a good route.', 'B. he felt much healthier than before he began his trip.', 'C. he met other people who were keen on cycling.', 'D. he went away at the best time of year for cycling.'], answer: 'A', explanationVi: '"every few kilometres there was a village where we could find everything we needed"', strategyVi: 'Tìm: route had villages → good route.' },
        { id: 'pet_1_t2_24', partNumber: 4, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'What did Chris dislike about his trip?', options: ['A. breaking down', 'B. the food', 'C. the weather', 'D. getting lost'], answer: 'B', explanationVi: '"most places we stopped at served chips with all the meals, which soon got fairly boring"', strategyVi: 'Tìm negative: "boring" food.' },
        { id: 'pet_1_t2_25', partNumber: 4, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'What might Chris say in a postcard to a friend?', options: ['A. I\'m having a great holiday, spending lots of time in friendly cafes and enjoying being by myself for once!', 'B. I\'m having really fit cycling so fast up and down the hills in this part of the countryside.', 'C. I\'m pleased to be away from cars and lorries for a change. Having a good time, despite some problems.', 'D. I\'m enjoying cycling with my brother this weekend, and staying at a very quiet hotel in this countryside.'], answer: 'C', explanationVi: '"traffic-free country paths" + "despite some problems" (brakes, noise at hotel) → C phù hợp.', strategyVi: 'Tổng hợp: traffic-free + problems = C.' }
      ]
    },
    {
      partNumber: 5,
      titleEn: 'Reading Part 5: Multiple-choice cloze — Making Honey',
      titleVi: 'Đọc Phần 5: Điền từ vào chỗ trống — Làm mật ong',
      instructionVi: 'Đọc bài "Making honey" và chọn từ đúng (A, B, C hoặc D) cho mỗi chỗ trống từ 26 đến 35.',
      sourcePages: ['/exam-assets/pet1/test2/page-041.png'],
      questions: [
        { id: 'pet_1_t2_26', partNumber: 5, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Cloze', prompt: 'Honey is a (0) natural product, and it is made (26) ...... honey bees.', options: ['A. of', 'B. from', 'C. with', 'D. by'], answer: 'D', explanationVi: '"made BY honey bees" — thể bị động + tác nhân.', strategyVi: 'Passive voice: made + by + agent.' },
        { id: 'pet_1_t2_27', partNumber: 5, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Cloze', prompt: '(27) ...... some people prefer to ordinary sugar.', options: ['A. what', 'B. who', 'C. which', 'D. whose'], answer: 'C', explanationVi: '"which" thay thế cho "honey" trong mệnh đề quan hệ.', strategyVi: 'Đại từ quan hệ thay cho vật = which.' },
        { id: 'pet_1_t2_28', partNumber: 5, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Cloze', prompt: 'it is even possible to (28) ...... from the flavour', options: ['A. know', 'B. take', 'C. inform', 'D. answer'], answer: 'A', explanationVi: '"know from the flavour" = nhận biết từ hương vị.', strategyVi: 'Collocation: know from = nhận biết từ.' },
        { id: 'pet_1_t2_29', partNumber: 5, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Cloze', prompt: 'the bees (29) ...... before producing the honey.', options: ['A. went', 'B. visited', 'C. met', 'D. passed'], answer: 'B', explanationVi: '"flowers the bees visited" — ong ghé thăm hoa.', strategyVi: 'Bees visit flowers = ong ghé thăm hoa.' },
        { id: 'pet_1_t2_30', partNumber: 5, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Cloze', prompt: 'Have you ever (30) ...... about how honey is produced?', options: ['A. considered', 'B. guessed', 'C. wondered', 'D. doubted'], answer: 'C', explanationVi: '"wondered about" = tự hỏi về.', strategyVi: 'Collocation: wonder about = tự hỏi.' },
        { id: 'pet_1_t2_31', partNumber: 5, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Cloze', prompt: 'They (31) ...... the bees in their care produce', options: ['A. start', 'B. cause', 'C. let', 'D. bring'], answer: 'C', explanationVi: '"let the bees produce" = để ong sản xuất.', strategyVi: 'let + O + V(bare) = cho phép.' },
        { id: 'pet_1_t2_32', partNumber: 5, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Cloze', prompt: '(32) ...... honey than is needed.', options: ['A. much', 'B. many', 'C. most', 'D. more'], answer: 'D', explanationVi: '"more honey than is needed" — so sánh hơn.', strategyVi: 'So sánh: more ... than.' },
        { id: 'pet_1_t2_33', partNumber: 5, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Cloze', prompt: 'the honey can be removed (33) ...... causing problems', options: ['A. although', 'B. without', 'C. instead', 'D. unless'], answer: 'B', explanationVi: '"without causing problems" = mà không gây vấn đề.', strategyVi: 'without + V-ing = mà không.' },
        { id: 'pet_1_t2_34', partNumber: 5, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Cloze', prompt: 'an ancient activity, (34) ...... back at least 10,000 years', options: ['A. coming', 'B. going', 'C. falling', 'D. moving'], answer: 'B', explanationVi: '"going back" = trở lại, có từ.', strategyVi: 'Collocation: go back = có từ (thời gian).' },
        { id: 'pet_1_t2_35', partNumber: 5, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Cloze', prompt: 'and honey has (35) ...... increasingly popular nowadays', options: ['A. become', 'B. turned', 'C. gone', 'D. changed'], answer: 'A', explanationVi: '"become popular" = trở nên phổ biến.', strategyVi: 'Collocation: become + adj.' }
      ]
    },
    {
      partNumber: 6,
      titleEn: 'Writing Part 1: Sentence Transformations (Camping)',
      titleVi: 'Viết Phần 1: Viết lại câu — Cắm trại',
      instructionVi: 'Hoàn thành câu thứ hai sao cho nghĩa giống câu đầu. Dùng tối đa 3 từ.',
      sourcePages: ['/exam-assets/pet1/test2/page-042.png'],
      questions: [
        { id: 'pet_1_t2_w1', partNumber: 6, taskTypeVi: 'Viết lại câu', taskTypeEn: 'Transformation', prompt: 'Everyone in our family enjoys camping holidays.\nIn our family, all of us ______ camping holidays.', options: [], answer: 'enjoy', explanationVi: '"all of us enjoy" = tất cả chúng tôi đều thích.', strategyVi: 'Chủ ngữ số nhiều → enjoy (không -s).' },
        { id: 'pet_1_t2_w2', partNumber: 6, taskTypeVi: 'Viết lại câu', taskTypeEn: 'Transformation', prompt: 'Camping is cheaper than staying in a hotel.\nCamping costs ______ than staying in a hotel.', options: [], answer: 'less', explanationVi: '"costs less" = tốn ít hơn (so sánh).', strategyVi: 'cheaper → costs less.' },
        { id: 'pet_1_t2_w3', partNumber: 6, taskTypeVi: 'Viết lại câu', taskTypeEn: 'Transformation', prompt: 'The campsite we\'re going to is near the beach.\nThe campsite we\'re going to is not too ______ the beach.', options: [], answer: 'far (away) from', explanationVi: '"not too far from" = không quá xa.', strategyVi: 'near = not too far from.' },
        { id: 'pet_1_t2_w4', partNumber: 6, taskTypeVi: 'Viết lại câu', taskTypeEn: 'Transformation', prompt: 'The campsite has a swimming pool.\nAt the campsite ______ a swimming pool.', options: [], answer: 'there is', explanationVi: '"there is" = có (tồn tại).', strategyVi: 'has → there is.' },
        { id: 'pet_1_t2_w5', partNumber: 6, taskTypeVi: 'Viết lại câu', taskTypeEn: 'Transformation', prompt: 'I asked my friend if he wanted to come camping with us.\nI asked my friend: \'______ want to come camping with us?\'', options: [], answer: 'Do you', explanationVi: 'Chuyển gián tiếp → trực tiếp: "Do you want..."', strategyVi: 'Reported → direct: if he wanted → Do you want.' }
      ]
    },
    {
      partNumber: 7,
      titleEn: 'Writing Part 2: Email (Party)',
      titleVi: 'Viết Phần 2: Email — Từ chối tiệc',
      instructionVi: 'Bạn Alex mời bạn đến tiệc thứ Bảy nhưng bạn không đi được. Viết email 35-45 từ: xin lỗi, giải thích lý do, đề nghị gặp ngày khác.',
      sourcePages: ['/exam-assets/pet1/test2/page-043.png'],
      questions: [
        { id: 'pet_1_t2_w6', partNumber: 7, taskTypeVi: 'Viết email', taskTypeEn: 'Email writing', prompt: 'Your friend Alex has invited you to a party this Saturday afternoon but you can\'t go. Write an email to Alex. In your email, you should:\n• apologise to Alex\n• explain why you can\'t go\n• suggest another day when you could meet.\nWrite 35-45 words.', options: [], answer: 'open_ended', explanationVi: 'Cần 3 nội dung: xin lỗi + lý do + đề nghị ngày khác. Band 5 mẫu trong Answer Key.', strategyVi: 'Viết đủ 3 bullet points, dùng linking words (so, because, also).' }
      ]
    },
    {
      partNumber: 8,
      titleEn: 'Writing Part 3: Letter or Story',
      titleVi: 'Viết Phần 3: Thư hoặc Truyện ngắn',
      instructionVi: 'Chọn 1 trong 2 đề: (Q7) Viết thư trả lời bạn về môn học yêu thích, HOẶC (Q8) Viết truyện bắt đầu bằng: "I was really excited when I opened the letter." Viết khoảng 100 từ.',
      sourcePages: ['/exam-assets/pet1/test2/page-044.png'],
      questions: [
        { id: 'pet_1_t2_w7', partNumber: 8, taskTypeVi: 'Viết thư', taskTypeEn: 'Letter', prompt: 'This is part of a letter you receive from an English friend:\n"My favourite subjects at school are history and art. I don\'t like maths. Tell me about the subjects you study and what you think about them! What would you like to study in the future? Why?"\nNow write a letter answering your friend\'s questions. Write about 100 words.', options: [], answer: 'open_ended', explanationVi: 'Trả lời 3 câu hỏi: môn học, cảm nghĩ, tương lai. Band 5 cần linking devices, ít lỗi.', strategyVi: 'Trả lời từng câu hỏi, dùng because/so/also.' },
        { id: 'pet_1_t2_w8', partNumber: 8, taskTypeVi: 'Viết truyện', taskTypeEn: 'Story', prompt: 'Your English teacher has asked you to write a story.\nYour story must begin with this sentence: I was really excited when I opened the letter.\nWrite your story on your answer sheet. Write about 100 words.', options: [], answer: 'open_ended', explanationVi: 'Truyện phải bắt đầu đúng câu cho sẵn, có cốt truyện rõ ràng, kết thúc bất ngờ.', strategyVi: 'Bắt đầu đúng câu gốc, kể theo trình tự thời gian, có kết.' }
      ]
    }
  ]
};
