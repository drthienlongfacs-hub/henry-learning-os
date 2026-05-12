import type { PracticeTest } from './practice-test-bank';

export const PET_1_TEST_3: PracticeTest = {
  id: 'pet_1_test_3',
  level: 'pet',
  skill: 'reading_writing',
  skillVi: 'Đọc & Viết — B1 Preliminary (PET 1, Test 3)',
  totalMinutes: 90,
  parts: [
    {
      partNumber: 1,
      titleEn: 'Reading Part 1: Multiple-choice short texts',
      titleVi: 'Đọc Phần 1: Biển báo và tin nhắn ngắn',
      instructionVi: 'Đọc văn bản ngắn và chọn đáp án đúng (A, B hoặc C).',
      sourcePages: ['/exam-assets/pet1/test3/page-063.png', '/exam-assets/pet1/test3/page-064.png'],
      questions: [
        { id: 'pet1t3_1', partNumber: 1, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'LIBRARY NOTICE: All books borrowed during the holiday period must be returned by January 10th. After that date, a fine of 50p per day will be charged.', options: ['A. The library will be closed during the holidays.', 'B. Students will have to pay if they return books late.', 'C. Books can only be borrowed for the holiday period.'], answer: 'B', explanationVi: '"a fine of 50p per day will be charged" = phải trả phí nếu trả sách trễ.', strategyVi: 'Tìm từ khóa: fine = phạt, charged = tính phí → trả trễ bị phạt.' },
        { id: 'pet1t3_2', partNumber: 1, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'Kate, I\'ve gone to pick up your brother from football practice. Your dinner\'s in the oven — just heat it up for 5 minutes. Don\'t forget to lock the back door! Mum', options: ['A. Kate should collect her brother from football.', 'B. Kate needs to prepare dinner for her brother.', 'C. Kate\'s mother wants her to warm up her meal.'], answer: 'C', explanationVi: '"Your dinner\'s in the oven — just heat it up" = hâm nóng bữa tối.', strategyVi: 'Mục đích chính của tin nhắn: mẹ đã nấu sẵn, Kate chỉ cần hâm.' },
        { id: 'pet1t3_3', partNumber: 1, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'SWIMMING POOL — Children under 8 must be accompanied by an adult at all times.', options: ['A. Children under 8 cannot use the swimming pool.', 'B. Adults must stay with young children in the pool area.', 'C. Children aged 8 and over need adult permission to swim.'], answer: 'B', explanationVi: '"accompanied by an adult at all times" = người lớn phải ở cùng luôn.', strategyVi: '"accompanied by" = đi cùng. "at all times" = mọi lúc.' },
        { id: 'pet1t3_4', partNumber: 1, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'Hi Sam, Thanks for lending me your bike. I\'ve left it in your garage. I noticed the front tyre is a bit flat — sorry about that! Tom', options: ['A. Tom is apologising because he damaged Sam\'s bike.', 'B. Tom wants to borrow Sam\'s bike again.', 'C. Tom is asking Sam to fix the bike tyre.'], answer: 'A', explanationVi: '"sorry about that" + lốp bị xẹp = Tom xin lỗi vì xe bị hỏng.', strategyVi: 'Tìm mục đích: sorry = xin lỗi, flat tyre = lốp xẹp → xin lỗi vì hư xe.' },
        { id: 'pet1t3_5', partNumber: 1, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'SCHOOL TRIP TO SCIENCE MUSEUM — Packed lunches will be provided. Please bring a drink and a notebook.', options: ['A. Students need to bring their own lunch on the trip.', 'B. Students should take a drink and something to write with.', 'C. Students will receive a notebook at the museum.'], answer: 'B', explanationVi: '"bring a drink and a notebook" = mang theo đồ uống và sổ tay.', strategyVi: '"Packed lunches will be provided" = nhà trường lo bữa trưa. Học sinh chỉ cần mang drink + notebook.' }
      ]
    },
    {
      partNumber: 2,
      titleEn: 'Reading Part 2: Matching',
      titleVi: 'Đọc Phần 2: Nối thông tin',
      instructionVi: 'Đọc mô tả 5 người và 8 mô tả. Nối mỗi người với mô tả phù hợp nhất.',
      sourcePages: ['/exam-assets/pet1/test3/page-065.png', '/exam-assets/pet1/test3/page-066.png'],
      questions: [
        { id: 'pet1t3_6', partNumber: 2, taskTypeVi: 'Nối', taskTypeEn: 'Matching', prompt: 'Holiday Activities (A-H):\nA. Beach Sports — surfing, volleyball, swimming\nB. Mountain Trek — hiking, camping, rock climbing\nC. City Tour — museums, shopping, restaurants\nD. Farm Stay — horse riding, animal care, cooking\nE. Water Park — slides, wave pool, lazy river\nF. Art Camp — painting, sculpture, pottery\nG. Music Festival — concerts, workshops, DJ sets\nH. Science Camp — experiments, robotics, coding\n\nPerson 6: Maya loves being outdoors and wants to try climbing for the first time. She enjoys sleeping in a tent.', options: ['A','B','C','D','E','F','G','H'], answer: 'B', explanationVi: 'Maya thích ngoài trời, muốn thử leo núi, thích ngủ lều → B (Mountain Trek: hiking, camping, rock climbing).', strategyVi: 'Gạch chân 3 từ khóa: outdoors + climbing + tent → khớp Mountain Trek.' },
        { id: 'pet1t3_7', partNumber: 2, taskTypeVi: 'Nối', taskTypeEn: 'Matching', prompt: 'Person 7: Jake wants to learn how to make things from clay. He is also interested in drawing.', options: ['A','B','C','D','E','F','G','H'], answer: 'F', explanationVi: 'Jake muốn làm đồ từ đất sét (clay = pottery) và thích vẽ → F (Art Camp: painting, sculpture, pottery).', strategyVi: 'clay = pottery, drawing = painting → Art Camp.' },
        { id: 'pet1t3_8', partNumber: 2, taskTypeVi: 'Nối', taskTypeEn: 'Matching', prompt: 'Person 8: Lily loves animals and would like to learn to ride. She also enjoys preparing food.', options: ['A','B','C','D','E','F','G','H'], answer: 'D', explanationVi: 'Lily yêu động vật, muốn học cưỡi ngựa, thích nấu ăn → D (Farm Stay: horse riding, animal care, cooking).', strategyVi: 'animals + ride + cooking → Farm Stay.' },
        { id: 'pet1t3_9', partNumber: 2, taskTypeVi: 'Nối', taskTypeEn: 'Matching', prompt: 'Person 9: Tom is interested in technology and wants to build a robot. He enjoys doing experiments.', options: ['A','B','C','D','E','F','G','H'], answer: 'H', explanationVi: 'Tom thích công nghệ, muốn làm robot, thích thí nghiệm → H (Science Camp: experiments, robotics, coding).', strategyVi: 'technology + robot + experiments → Science Camp.' },
        { id: 'pet1t3_10', partNumber: 2, taskTypeVi: 'Nối', taskTypeEn: 'Matching', prompt: 'Person 10: Sophie wants to try water slides and enjoy a fun day out with her family.', options: ['A','B','C','D','E','F','G','H'], answer: 'E', explanationVi: 'Sophie muốn chơi cầu trượt nước, vui chơi cùng gia đình → E (Water Park: slides, wave pool, lazy river).', strategyVi: 'water slides → Water Park là đáp án duy nhất có slides.' }
      ]
    },
    {
      partNumber: 3,
      titleEn: 'Reading Part 3: True/False',
      titleVi: 'Đọc Phần 3: Đúng/Sai',
      instructionVi: 'Đọc văn bản và chọn True hoặc False.',
      sourcePages: ['/exam-assets/pet1/test3/page-067.png', '/exam-assets/pet1/test3/page-068.png'],
      questions: [
        { id: 'pet1t3_11', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'True/False', prompt: '"My name is Carlos. Last summer I worked as a volunteer at an animal rescue centre. I had always wanted to work with animals and this was my first chance."\n\nCarlos had experience working with animals before last summer.', options: ['True','False'], answer: 'False', explanationVi: '"this was my first chance" = đây là lần đầu tiên → chưa có kinh nghiệm trước đó.', strategyVi: '"first chance" trái ngược với "had experience before".' },
        { id: 'pet1t3_12', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'True/False', prompt: '"The centre looked after injured birds and small mammals. Most of the animals had been found by members of the public."\n\nThe animals at the centre were mainly brought in by ordinary people.', options: ['True','False'], answer: 'True', explanationVi: '"found by members of the public" = được người dân tìm thấy = ordinary people mang đến.', strategyVi: '"members of the public" = "ordinary people" — từ đồng nghĩa.' },
        { id: 'pet1t3_13', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'True/False', prompt: '"I was nervous on my first day, but the other volunteers were really friendly and showed me what to do."\n\nCarlos found it difficult to get on with the other volunteers.', options: ['True','False'], answer: 'False', explanationVi: '"really friendly and showed me what to do" = thân thiện → KHÔNG khó hòa đồng.', strategyVi: '"friendly" trái ngược với "difficult to get on with".' },
        { id: 'pet1t3_14', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'True/False', prompt: '"By the end of the summer, I had helped to release several birds back into the wild. It was the best feeling."\n\nCarlos felt pleased about releasing the birds.', options: ['True','False'], answer: 'True', explanationVi: '"the best feeling" = cảm giác tuyệt vời nhất → rất vui khi thả chim.', strategyVi: '"best feeling" = pleased/happy/proud.' },
        { id: 'pet1t3_15', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'True/False', prompt: '"I\'m now studying veterinary science at university. I\'m sure my time at the rescue centre helped me decide on my career."\n\nCarlos believes the volunteer work influenced his career choice.', options: ['True','False'], answer: 'True', explanationVi: '"helped me decide on my career" = giúp quyết định nghề nghiệp = influenced career choice.', strategyVi: '"helped me decide" = "influenced my choice" — paraphrase.' }
      ]
    },
    {
      partNumber: 4,
      titleEn: 'Reading Part 4: MCQ Long Text',
      titleVi: 'Đọc Phần 4: Trắc nghiệm văn bản dài',
      instructionVi: 'Đọc văn bản và chọn A, B, C hoặc D.',
      sourcePages: ['/exam-assets/pet1/test3/page-069.png', '/exam-assets/pet1/test3/page-070.png'],
      questions: [
        { id: 'pet1t3_16', partNumber: 4, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: '"Review: The New City Skate Park by Alex, aged 15\nThe council finally opened the new skate park last month. I\'ve been skating for three years and was excited to try it. The park has ramps of different sizes, which is great for beginners and experienced skaters."\n\nWhat is Alex trying to do?', options: ['A. persuade more young people to try skating', 'B. describe his experience at a new facility', 'C. complain about the lack of skating areas', 'D. explain how he learned to skate'], answer: 'B', explanationVi: 'Alex mô tả trải nghiệm tại công viên trượt ván mới → B.', strategyVi: 'Câu hỏi đầu thường hỏi mục đích (purpose) của bài viết.' },
        { id: 'pet1t3_17', partNumber: 4, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'What does Alex say about the ramps?', options: ['A. They are too difficult for beginners.', 'B. They are suitable for different skill levels.', 'C. They need to be repaired already.', 'D. They are smaller than expected.'], answer: 'B', explanationVi: '"ramps of different sizes, great for beginners and experienced" = phù hợp mọi trình độ.', strategyVi: '"different sizes" + "beginners and experienced" = "different skill levels".' },
        { id: 'pet1t3_18', partNumber: 4, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: '"The only problem is that it gets very crowded at weekends. I prefer going after school on weekdays when it\'s quieter."\n\nWhat problem does Alex mention?', options: ['A. The park is too far from his school.', 'B. There are not enough ramps for everyone.', 'C. Too many people visit at certain times.', 'D. The opening hours are too short.'], answer: 'C', explanationVi: '"very crowded at weekends" = quá đông vào cuối tuần → C.', strategyVi: '"crowded" = "too many people".' },
        { id: 'pet1t3_19', partNumber: 4, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: '"They\'ve also built a small café next to the park which sells drinks and snacks. I think they should add some seating areas outside too."\n\nWhat improvement does Alex suggest?', options: ['A. The café should sell more food.', 'B. There should be outdoor seating.', 'C. The café needs to be bigger.', 'D. Prices should be lower.'], answer: 'B', explanationVi: '"should add some seating areas outside" = cần thêm chỗ ngồi ngoài trời → B.', strategyVi: '"seating areas outside" = "outdoor seating".' },
        { id: 'pet1t3_20', partNumber: 4, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'Which review might appear in a local newspaper?', options: ['A. A fantastic new addition to our town — just avoid weekends if you hate queues!', 'B. This park is a waste of money — there is nothing for skaters here.', 'C. I\'ve never been skating before but this park made me want to start.', 'D. The ramps are only suitable for professional skaters.'], answer: 'A', explanationVi: 'Alex khen công viên nhưng nói cuối tuần đông → A phản ánh cả hai ý.', strategyVi: 'Tổng hợp: positive + nhược điểm weekend → balanced view.' }
      ]
    },
    {
      partNumber: 5,
      titleEn: 'Reading Part 5: Multiple-choice cloze',
      titleVi: 'Đọc Phần 5: Điền từ vào chỗ trống',
      instructionVi: 'Chọn từ đúng (A, B, C hoặc D) cho mỗi chỗ trống.',
      sourcePages: ['/exam-assets/pet1/test3/page-071.png', '/exam-assets/pet1/test3/page-072.png'],
      questions: [
        { id: 'pet1t3_21', partNumber: 5, taskTypeVi: 'Điền từ', taskTypeEn: 'Cloze', prompt: '"My Best Holiday" — Last summer my family (21) ______ to go camping in France.', options: ['A. chose', 'B. decided', 'C. wanted', 'D. agreed'], answer: 'B', explanationVi: '"decided to go" = quyết định đi. "chose" cần tân ngữ trực tiếp.', strategyVi: 'decided + to V là cấu trúc chuẩn.' },
        { id: 'pet1t3_22', partNumber: 5, taskTypeVi: 'Điền từ', taskTypeEn: 'Cloze', prompt: 'We drove (22) ______ the Channel Tunnel.', options: ['A. across', 'B. over', 'C. through', 'D. along'], answer: 'C', explanationVi: '"through the tunnel" = đi xuyên qua đường hầm.', strategyVi: 'tunnel = đường hầm → through (xuyên qua).' },
        { id: 'pet1t3_23', partNumber: 5, taskTypeVi: 'Điền từ', taskTypeEn: 'Cloze', prompt: 'The campsite was near a beautiful lake (23) ______ we could swim every day.', options: ['A. who', 'B. which', 'C. where', 'D. what'], answer: 'C', explanationVi: '"where" dùng cho nơi chốn (lake = địa điểm).', strategyVi: 'Mệnh đề quan hệ chỉ nơi chốn: where.' },
        { id: 'pet1t3_24', partNumber: 5, taskTypeVi: 'Điền từ', taskTypeEn: 'Cloze', prompt: 'I (24) ______ a lot of new friends at the campsite.', options: ['A. did', 'B. had', 'C. took', 'D. made'], answer: 'D', explanationVi: '"made friends" = kết bạn. Collocation cố định.', strategyVi: '"make friends" là cụm cố định.' },
        { id: 'pet1t3_25', partNumber: 5, taskTypeVi: 'Điền từ', taskTypeEn: 'Cloze', prompt: 'It was the (25) ______ holiday I\'ve ever had.', options: ['A. good', 'B. better', 'C. best', 'D. well'], answer: 'C', explanationVi: '"the best... ever" = tốt nhất từ trước đến nay (superlative).', strategyVi: '"the + superlative + ever" = so sánh bậc nhất.' }
      ]
    },
    {
      partNumber: 6,
      titleEn: 'Writing Part 1: Sentence Transformations',
      titleVi: 'Viết Phần 1: Biến đổi câu',
      instructionVi: 'Hoàn thành câu thứ hai sao cho nghĩa giống câu thứ nhất. Dùng KHÔNG QUÁ BA từ.',
      sourcePages: ['/exam-assets/pet1/test3/page-073.png'],
      questions: [
        { id: 'pet1t3_26', partNumber: 6, taskTypeVi: 'Biến đổi câu', taskTypeEn: 'Transformation', prompt: 'The film was too boring for me to watch.\n→ The film was not ______ enough for me to watch.', options: [], answer: 'interesting', explanationVi: '"too boring" = "not interesting enough".', strategyVi: 'too + adj tiêu cực = not + adj tích cực + enough.' },
        { id: 'pet1t3_27', partNumber: 6, taskTypeVi: 'Biến đổi câu', taskTypeEn: 'Transformation', prompt: 'I haven\'t been to London before.\n→ This is the first time I ______ been to London.', options: [], answer: 'have', explanationVi: '"haven\'t... before" = "first time I have + V3".', strategyVi: 'Cấu trúc: This is the first time + S + have/has + V3.' },
        { id: 'pet1t3_28', partNumber: 6, taskTypeVi: 'Biến đổi câu', taskTypeEn: 'Transformation', prompt: 'They started building the bridge two years ago.\n→ They have been building the bridge ______ two years.', options: [], answer: 'for', explanationVi: '"two years ago" → "for two years" (khoảng thời gian).', strategyVi: 'Past simple + ago → Present perfect + for.' },
        { id: 'pet1t3_29', partNumber: 6, taskTypeVi: 'Biến đổi câu', taskTypeEn: 'Transformation', prompt: '"Do you like chocolate?" she asked me.\n→ She asked me ______ I liked chocolate.', options: [], answer: 'if/whether', explanationVi: 'Câu hỏi Yes/No → reported: if/whether.', strategyVi: 'Yes/No question → asked + if/whether + clause.' },
        { id: 'pet1t3_30', partNumber: 6, taskTypeVi: 'Biến đổi câu', taskTypeEn: 'Transformation', prompt: 'This book belongs to my sister.\n→ This is my ______ book.', options: [], answer: "sister's", explanationVi: '"belongs to my sister" = "my sister\'s" (sở hữu cách).', strategyVi: 'belongs to X = X\'s (possessive).' }
      ]
    },
    {
      partNumber: 7,
      titleEn: 'Writing Part 2: Short Message',
      titleVi: 'Viết Phần 2: Tin nhắn ngắn',
      instructionVi: 'Viết email 35-45 từ bao gồm tất cả các điểm yêu cầu.',
      sourcePages: ['/exam-assets/pet1/test3/page-074.png'],
      questions: [
        { id: 'pet1t3_31', partNumber: 7, taskTypeVi: 'Viết email', taskTypeEn: 'Short message', prompt: 'Your English friend, David, invited you to his birthday party next Saturday.\n\nWrite an email to David. In your email, you should:\n• thank David for the invitation\n• ask what time the party starts\n• say what present you are going to bring.\n\nWrite 35-45 words.', options: [], answer: '(Open-ended — must cover all 3 content points)', explanationVi: 'Cần đủ 3 ý: (1) cảm ơn lời mời, (2) hỏi giờ bắt đầu, (3) nói quà sẽ mang.', strategyVi: 'Mỗi bullet = 1 ý bắt buộc. 35-45 từ = ngắn gọn, đủ ý.', selfAssessment: true, rubricVi: ['Đủ 3 ý (thank + ask time + present)', 'Đúng format email bạn bè', '35-45 từ, ngữ pháp tự nhiên'] }
      ]
    },
    {
      partNumber: 8,
      titleEn: 'Writing Part 3: Letter or Story',
      titleVi: 'Viết Phần 3: Thư hoặc Truyện ngắn (~100 từ)',
      instructionVi: 'Chọn MỘT trong hai câu hỏi. Viết khoảng 100 từ.',
      sourcePages: ['/exam-assets/pet1/test3/page-075.png', '/exam-assets/pet1/test3/page-076.png'],
      questions: [
        { id: 'pet1t3_32', partNumber: 8, taskTypeVi: 'Viết thư', taskTypeEn: 'Letter', prompt: 'Question 7 (Letter):\nThis is part of a letter from your British pen friend:\n\n"I\'ve just joined a new sports club. Do you do any sport? What sport would you like to try?"\n\nWrite a letter to your friend. Write about 100 words.', options: [], answer: '(Open-ended — Band 1-5)', explanationVi: 'Trả lời 2 câu hỏi: (1) có chơi thể thao không?, (2) muốn thử môn gì?', strategyVi: 'Format thư bạn bè: Dear..., trả lời đủ ý, Best wishes.', selfAssessment: true, rubricVi: ['Trả lời đủ 2 câu hỏi', 'Giọng thân mật', '~100 từ, có mở-kết'] },
        { id: 'pet1t3_33', partNumber: 8, taskTypeVi: 'Viết truyện', taskTypeEn: 'Story', prompt: 'Question 8 (Story):\nYour teacher wants you to write a story.\nTitle: An Unexpected Visitor\n\nWrite about 100 words.', options: [], answer: '(Open-ended — Band 1-5)', explanationVi: 'Truyện cần có cấu trúc: mở đầu, diễn biến bất ngờ, kết thúc.', strategyVi: 'Dùng Past Simple. Tiêu đề gợi ý có yếu tố bất ngờ → twist.', selfAssessment: true, rubricVi: ['Liên quan tiêu đề', 'Có mở-thân-kết', '~100 từ, Past Simple'] }
      ]
    }
  ]
};
