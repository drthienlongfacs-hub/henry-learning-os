import type { PracticeTest } from './practice-test-bank';

// ================================================================
// KET (A2 Key) — Listening Practice Test 2
// Family-use practice material — original Henry content
// Structure matches official A2 Key format: 5 Parts, 25 questions
// ================================================================

export const KET_LISTENING_2: PracticeTest = {
  id: 'ket_list_2', level: 'ket', skill: 'listening',
  skillVi: 'KET — Nghe (Practice Test 2)', totalMinutes: 35,
  sourceBoundary: 'Family-use practice material. Not official Cambridge content.',
  isOfficialCambridgeContent: false,
  parts: [
    // ──────────────────────────────────────────
    // PART 1: Questions 1-5 — MCQ Pictures
    // 5 short conversations, choose A/B/C picture
    // ──────────────────────────────────────────
    { partNumber: 1, titleEn: 'Part 1: Multiple Choice (Pictures)', titleVi: 'Phần 1: Trắc nghiệm hình ảnh (5 câu)',
      instructionVi: 'Nghe 5 đoạn hội thoại ngắn. Với mỗi câu, chọn đáp án đúng (A, B hoặc C).',
      questions: [
        {
          id: 'k2_l_1_1', partNumber: 1,
          taskTypeVi: 'Nghe & Chọn', taskTypeEn: 'MCQ Pictures',
          prompt: 'What time does the train leave?',
          options: ['A. 9:15', 'B. 9:45', 'C. 10:15'],
          answer: 'B. 9:45',
          audioTranscript: 'Woman: What time is the next train to London?\nMan: Well, the 9:15 has already gone. There\'s one at quarter to ten.\nWoman: Oh good, that\'s soon.',
          explanationVi: 'Tàu 9:15 đã đi rồi. Chuyến tiếp theo lúc "quarter to ten" = 9:45.',
          strategyVi: 'Nghe kỹ thời gian THỰC TẾ, không phải thời gian đã qua. "quarter to ten" = 9:45.',
        },
        {
          id: 'k2_l_1_2', partNumber: 1,
          taskTypeVi: 'Nghe & Chọn', taskTypeEn: 'MCQ Pictures',
          prompt: 'What present did the girl get for her birthday?',
          options: ['A. a watch ⌚', 'B. a phone 📱', 'C. a camera 📷'],
          answer: 'A. a watch ⌚',
          audioTranscript: 'Boy: What did you get for your birthday, Emma?\nGirl: My parents wanted to get me a phone, but I already have one. So they got me a beautiful watch instead.\nBoy: Nice! I thought you wanted a camera.\nGirl: I do, but I\'m saving up for that myself.',
          explanationVi: 'Ba mẹ muốn mua điện thoại nhưng Emma đã có → mua đồng hồ (watch). Camera thì cô tự tiết kiệm.',
          strategyVi: 'Bẫy: 3 món quà đều được nhắc. Nghe "got me... instead" → đáp án thật.',
        },
        {
          id: 'k2_l_1_3', partNumber: 1,
          taskTypeVi: 'Nghe & Chọn', taskTypeEn: 'MCQ Pictures',
          prompt: 'How will they get to the cinema?',
          options: ['A. by bus 🚌', 'B. by taxi 🚕', 'C. on foot 🚶'],
          answer: 'C. on foot 🚶',
          audioTranscript: 'Girl: Shall we get the bus to the cinema?\nBoy: The bus takes ages on Saturdays. We could get a taxi?\nGirl: That\'s expensive. It\'s only a 15-minute walk. Let\'s just walk.\nBoy: OK, good idea.',
          explanationVi: 'Xe bus lâu, taxi đắt → quyết định đi bộ (walk). "Let\'s just walk" + "OK, good idea" = xác nhận.',
          strategyVi: 'Nghe quyết định CUỐI CÙNG. Bus bị từ chối, taxi bị từ chối → walk được đồng ý.',
        },
        {
          id: 'k2_l_1_4', partNumber: 1,
          taskTypeVi: 'Nghe & Chọn', taskTypeEn: 'MCQ Pictures',
          prompt: 'What sport does the man play now?',
          options: ['A. tennis 🎾', 'B. football ⚽', 'C. swimming 🏊'],
          answer: 'C. swimming 🏊',
          audioTranscript: 'Woman: Do you still play tennis, Mark?\nMark: No, I stopped last year. I tried football for a while but I hurt my knee. Now I go swimming three times a week.\nWoman: That\'s great exercise!',
          explanationVi: 'Mark đã bỏ tennis, thử bóng đá nhưng đau gối → giờ bơi (swimming).',
          strategyVi: '"Now I..." = hiện tại → đáp án. "still" = vẫn còn, "stopped" = đã ngừng.',
        },
        {
          id: 'k2_l_1_5', partNumber: 1,
          taskTypeVi: 'Nghe & Chọn', taskTypeEn: 'MCQ Pictures',
          prompt: 'Where is the woman\'s hat?',
          options: ['A. on the chair 🪑', 'B. in the car 🚗', 'C. on the bed 🛏️'],
          answer: 'B. in the car 🚗',
          audioTranscript: 'Woman: Have you seen my hat? I left it on the chair.\nMan: I moved it. I thought it was on the bed but actually I put it in the car this morning.\nWoman: Oh, OK. I\'ll get it later.',
          explanationVi: 'Mũ ban đầu trên ghế → được chuyển → thực tế đang ở trong xe (in the car).',
          strategyVi: 'Bẫy vị trí: chair (ban đầu), bed (tưởng là), car (thực tế). Nghe "actually" = sự thật.',
        },
      ],
    },

    // ──────────────────────────────────────────
    // PART 2: Questions 6-10 — Gap Fill (Notes)
    // Topic: Tennis Club information
    // ──────────────────────────────────────────
    { partNumber: 2, titleEn: 'Part 2: Gap Fill (Notes)', titleVi: 'Phần 2: Điền từ (5 câu)',
      instructionVi: 'Nghe thông tin về câu lạc bộ tennis. Điền 1 từ, số hoặc ngày vào mỗi chỗ trống.',
      questions: [
        {
          id: 'k2_l_2_1', partNumber: 2,
          taskTypeVi: 'Điền từ', taskTypeEn: 'Gap fill',
          prompt: 'Greenfield Tennis Club\nAddress: 48 __________ Road',
          options: [], answer: 'Park',
          audioTranscript: 'The club is at 48 Park Road. That\'s P-A-R-K, Park Road.',
          explanationVi: 'Địa chỉ: 48 Park Road. Tên đường được đánh vần: P-A-R-K.',
          strategyVi: 'Nghe tên đường + đánh vần xác nhận. Viết hoa chữ cái đầu.',
        },
        {
          id: 'k2_l_2_2', partNumber: 2,
          taskTypeVi: 'Điền từ', taskTypeEn: 'Gap fill',
          prompt: 'Open: every day except __________',
          options: [], answer: 'Monday',
          audioTranscript: 'We\'re open every day of the week, apart from Monday. So that\'s Tuesday to Sunday.',
          explanationVi: 'Mở cửa mỗi ngày trừ thứ Hai (Monday). "apart from" = "except" = trừ.',
          strategyVi: '"except" / "apart from" = trừ → từ theo sau là đáp án.',
        },
        {
          id: 'k2_l_2_3', partNumber: 2,
          taskTypeVi: 'Điền từ', taskTypeEn: 'Gap fill',
          prompt: 'Cost for under 16s: £__________ a month',
          options: [], answer: '12',
          audioTranscript: 'For adults, it\'s £25 a month. But for anyone under 16, it\'s only £12 a month.',
          explanationVi: 'Người lớn £25, dưới 16 tuổi £12/tháng. Đề hỏi "under 16s" → £12.',
          strategyVi: 'Có 2 mức giá: adults vs under 16s. Đọc câu hỏi TRƯỚC để biết cần nghe giá nào.',
        },
        {
          id: 'k2_l_2_4', partNumber: 2,
          taskTypeVi: 'Điền từ', taskTypeEn: 'Gap fill',
          prompt: 'Beginners\' class: every __________ afternoon',
          options: [], answer: 'Wednesday',
          audioTranscript: 'If you\'re a beginner, we have a special class every Wednesday afternoon, from 2 to 4.',
          explanationVi: 'Lớp dành cho người mới vào chiều thứ Tư (Wednesday).',
          strategyVi: 'Nghe "beginner" + ngày trong tuần. Wednesday = thứ Tư.',
        },
        {
          id: 'k2_l_2_5', partNumber: 2,
          taskTypeVi: 'Điền từ', taskTypeEn: 'Gap fill',
          prompt: 'Phone the club manager: Mr __________',
          options: [], answer: 'Collins',
          audioTranscript: 'For more information, please phone the club manager, Mr Collins. That\'s C-O-L-L-I-N-S.',
          explanationVi: 'Quản lý CLB: Mr Collins. Được đánh vần: C-O-L-L-I-N-S.',
          strategyVi: 'Tên riêng luôn được đánh vần. Nghe từng chữ cái, viết nhanh.',
        },
      ],
    },

    // ──────────────────────────────────────────
    // PART 3: Questions 11-15 — MCQ Conversation
    // Topic: Two friends discussing a music festival
    // ──────────────────────────────────────────
    { partNumber: 3, titleEn: 'Part 3: Multiple Choice (Conversation)', titleVi: 'Phần 3: Trắc nghiệm hội thoại (5 câu)',
      instructionVi: 'Nghe Lisa nói chuyện với Tom về lễ hội âm nhạc. Chọn đáp án đúng.',
      questions: [
        {
          id: 'k2_l_3_1', partNumber: 3,
          taskTypeVi: 'Nghe & Chọn', taskTypeEn: 'MCQ Conversation',
          prompt: 'How did Lisa hear about the festival?',
          options: ['A. from a friend', 'B. on the radio', 'C. on social media'],
          answer: 'C. on social media',
          audioTranscript: 'Tom: How did you find out about this music festival?\nLisa: Well, my friend Sarah mentioned it, but I\'d already seen it on Instagram. I heard them talking about it on the radio too, but that was after I\'d booked my ticket.',
          explanationVi: 'Lisa biết từ Instagram (social media) trước khi bạn nhắc và radio đưa tin.',
          strategyVi: 'Nghe nguồn thông tin ĐẦU TIÊN. "I\'d already seen it" = đã thấy trước đó.',
        },
        {
          id: 'k2_l_3_2', partNumber: 3,
          taskTypeVi: 'Nghe & Chọn', taskTypeEn: 'MCQ Conversation',
          prompt: 'How long is the festival?',
          options: ['A. one day', 'B. two days', 'C. three days'],
          answer: 'B. two days',
          audioTranscript: 'Tom: Is it just one day?\nLisa: No, it\'s on Saturday and Sunday. They wanted to make it three days but the park wouldn\'t allow it.',
          explanationVi: 'Lễ hội 2 ngày (Thứ Bảy + Chủ Nhật). Muốn 3 ngày nhưng không được phép.',
          strategyVi: 'Bẫy: 3 ngày được đề cập nhưng bị từ chối. Đáp án là 2 ngày.',
        },
        {
          id: 'k2_l_3_3', partNumber: 3,
          taskTypeVi: 'Nghe & Chọn', taskTypeEn: 'MCQ Conversation',
          prompt: 'What is included in the ticket price?',
          options: ['A. food and drinks', 'B. a camping space', 'C. a t-shirt'],
          answer: 'B. a camping space',
          audioTranscript: 'Tom: What do you get with the ticket?\nLisa: You get a camping space, which is great. Food and drinks cost extra though. They used to give everyone a free t-shirt, but not any more.',
          explanationVi: 'Vé bao gồm chỗ cắm trại (camping space). Đồ ăn tính thêm, áo phông không còn tặng.',
          strategyVi: '"cost extra" = tính thêm = KHÔNG bao gồm. "not any more" = không còn nữa.',
        },
        {
          id: 'k2_l_3_4', partNumber: 3,
          taskTypeVi: 'Nghe & Chọn', taskTypeEn: 'MCQ Conversation',
          prompt: 'Which band does Tom want to see most?',
          options: ['A. The Waves', 'B. Star City', 'C. Blue Mountains'],
          answer: 'A. The Waves',
          audioTranscript: 'Tom: I really want to see Star City — actually no, The Waves are my absolute favourite. Blue Mountains are good too.\nLisa: I agree, The Waves are amazing!',
          explanationVi: 'Tom tự sửa: từ Star City → The Waves là yêu thích nhất ("absolute favourite").',
          strategyVi: 'Nghe "actually no" = tự sửa lại. Đáp án là phần SAU khi sửa.',
        },
        {
          id: 'k2_l_3_5', partNumber: 3,
          taskTypeVi: 'Nghe & Chọn', taskTypeEn: 'MCQ Conversation',
          prompt: 'What does Lisa suggest they bring?',
          options: ['A. warm clothes', 'B. sun cream', 'C. extra water'],
          answer: 'A. warm clothes',
          audioTranscript: 'Lisa: Don\'t forget to bring warm clothes. It can get really cold at night even in summer. We won\'t need sun cream — the forecast says cloudy. And there are water stations everywhere.\nTom: Good point about the warm clothes.',
          explanationVi: 'Lisa gợi ý mang quần áo ấm (warm clothes). Kem chống nắng không cần (trời nhiều mây), nước có sẵn.',
          strategyVi: '"Don\'t forget to bring" = gợi ý chính. "Won\'t need" và "there are... everywhere" = loại bỏ.',
        },
      ],
    },

    // ──────────────────────────────────────────
    // PART 4: Questions 16-20 — MCQ Short Texts
    // 5 independent short conversations
    // ──────────────────────────────────────────
    { partNumber: 4, titleEn: 'Part 4: Multiple Choice (Short Texts)', titleVi: 'Phần 4: Hội thoại ngắn (5 câu)',
      instructionVi: 'Nghe 5 đoạn hội thoại ngắn khác nhau. Chọn đáp án đúng.',
      questions: [
        {
          id: 'k2_l_4_1', partNumber: 4,
          taskTypeVi: 'Nghe & Chọn', taskTypeEn: 'MCQ Short',
          prompt: 'You will hear a boy talking about his weekend. What did he enjoy most?',
          options: ['A. cooking with his dad', 'B. visiting his grandparents', 'C. playing video games'],
          answer: 'A. cooking with his dad',
          audioTranscript: 'Boy: I had a great weekend. I played video games on Saturday morning, then visited my grandparents. But the best part was cooking dinner with my dad on Sunday. We made pasta from scratch — it was brilliant!',
          explanationVi: '"the best part" = phần hay nhất → nấu ăn với bố (cooking with dad).',
          strategyVi: 'Nghe "the best part" / "enjoyed most" / "favourite" → đáp án thật.',
        },
        {
          id: 'k2_l_4_2', partNumber: 4,
          taskTypeVi: 'Nghe & Chọn', taskTypeEn: 'MCQ Short',
          prompt: 'You will hear two people talking about a book. What does the woman think about it?',
          options: ['A. It\'s too long.', 'B. It\'s exciting.', 'C. It\'s difficult to understand.'],
          answer: 'B. It\'s exciting.',
          audioTranscript: 'Man: Have you finished that book yet?\nWoman: Nearly! It\'s quite long but I don\'t mind — it\'s so exciting! The story is easy to follow, which is nice. I can\'t put it down.',
          explanationVi: 'Sách dài nhưng không phiền ("don\'t mind"). Hấp dẫn ("exciting"). Dễ hiểu ("easy to follow").',
          strategyVi: '"don\'t mind" = không phiền = không phải vấn đề. Cảm nhận chính: "so exciting".',
        },
        {
          id: 'k2_l_4_3', partNumber: 4,
          taskTypeVi: 'Nghe & Chọn', taskTypeEn: 'MCQ Short',
          prompt: 'You will hear a teacher talking to students. What must they do tomorrow?',
          options: ['A. bring their textbooks', 'B. wear sports clothes', 'C. arrive early'],
          answer: 'C. arrive early',
          audioTranscript: 'Teacher: Right, everyone. Tomorrow is our school trip. You don\'t need your textbooks — leave them at home. Wear your school uniform, not sports clothes. But please arrive at school by 8 o\'clock, that\'s half an hour earlier than usual.',
          explanationVi: 'Sách không cần mang. Mặc đồng phục, không phải đồ thể thao. Phải đến sớm lúc 8h (sớm hơn 30 phút).',
          strategyVi: '"don\'t need" = loại bỏ A. "not sports clothes" = loại bỏ B. "arrive... earlier" = đáp án C.',
        },
        {
          id: 'k2_l_4_4', partNumber: 4,
          taskTypeVi: 'Nghe & Chọn', taskTypeEn: 'MCQ Short',
          prompt: 'You will hear a girl talking about her new neighbour. What does the neighbour do?',
          options: ['A. She\'s a nurse.', 'B. She\'s a teacher.', 'C. She\'s a vet.'],
          answer: 'C. She\'s a vet.',
          audioTranscript: 'Girl: Our new neighbour is really nice. My mum thought she was a nurse because she wears a uniform, but she\'s actually a vet — she works with animals at the clinic on Green Street. My teacher knows her too.',
          explanationVi: 'Mẹ tưởng là y tá (nurse) nhưng thực tế là bác sĩ thú y (vet). Giáo viên biết cô ấy nhưng KHÔNG phải nghề của cô ấy.',
          strategyVi: '"thought she was" = tưởng là (SAI). "actually" = thực tế → đáp án.',
        },
        {
          id: 'k2_l_4_5', partNumber: 4,
          taskTypeVi: 'Nghe & Chọn', taskTypeEn: 'MCQ Short',
          prompt: 'You will hear a man leaving a message. What does he want the woman to do?',
          options: ['A. phone him back', 'B. send an email', 'C. come to his office'],
          answer: 'A. phone him back',
          audioTranscript: 'Man: Hi Sarah, it\'s David. I\'m calling about the meeting on Thursday. Don\'t worry about sending an email — just give me a call when you get this message. My office is being painted so I\'m working from home.',
          explanationVi: '"give me a call" = gọi lại. "Don\'t worry about sending an email" = không cần email. Văn phòng đang sửa → không đến.',
          strategyVi: '"give me a call" = phone back. "don\'t worry about" = loại bỏ B. Office unavailable → loại C.',
        },
      ],
    },

    // ──────────────────────────────────────────
    // PART 5: Questions 21-25 — Matching
    // Topic: A group planning a day trip — what each person wants to do
    // Activities: A-go shopping, B-visit a museum, C-walk by the river, D-have a picnic, E-go swimming, F-see a film, G-play football, H-visit a castle
    // ──────────────────────────────────────────
    { partNumber: 5, titleEn: 'Part 5: Matching', titleVi: 'Phần 5: Ghép thông tin (5 câu)',
      instructionVi: 'Nghe nhóm bạn lên kế hoạch đi chơi. Mỗi người muốn làm gì? Ghép tên với hoạt động.',
      questions: [
        {
          id: 'k2_l_5_1', partNumber: 5,
          taskTypeVi: 'Ghép thông tin', taskTypeEn: 'Matching',
          prompt: 'What does Sophie want to do?',
          options: ['A. go shopping', 'B. visit a museum', 'C. walk by the river', 'D. have a picnic', 'E. go swimming', 'F. see a film', 'G. play football', 'H. visit a castle'],
          answer: 'H. visit a castle',
          audioTranscript: 'Sophie: I\'ve heard there\'s an amazing castle near the town. I\'d really love to go and see it. Can we go there?',
          explanationVi: 'Sophie muốn thăm lâu đài (visit a castle) gần thị trấn.',
          strategyVi: 'Nghe "I\'d love to" / "Can we" → mong muốn chính.',
        },
        {
          id: 'k2_l_5_2', partNumber: 5,
          taskTypeVi: 'Ghép thông tin', taskTypeEn: 'Matching',
          prompt: 'What does James want to do?',
          options: ['A. go shopping', 'B. visit a museum', 'C. walk by the river', 'D. have a picnic', 'E. go swimming', 'F. see a film', 'G. play football', 'H. visit a castle'],
          answer: 'E. go swimming',
          audioTranscript: 'James: The weather\'s going to be hot, so I\'d like to go swimming. Is there a lake or pool nearby?',
          explanationVi: 'James muốn đi bơi (go swimming) vì thời tiết nóng.',
          strategyVi: '"I\'d like to" = muốn → hoạt động được nêu ngay sau.',
        },
        {
          id: 'k2_l_5_3', partNumber: 5,
          taskTypeVi: 'Ghép thông tin', taskTypeEn: 'Matching',
          prompt: 'What does Maria want to do?',
          options: ['A. go shopping', 'B. visit a museum', 'C. walk by the river', 'D. have a picnic', 'E. go swimming', 'F. see a film', 'G. play football', 'H. visit a castle'],
          answer: 'D. have a picnic',
          audioTranscript: 'Maria: Why don\'t we bring some food and have a picnic in the park? It\'s much nicer than eating in a restaurant, and cheaper too.',
          explanationVi: 'Maria đề nghị mang đồ ăn và dã ngoại (picnic) trong công viên.',
          strategyVi: '"Why don\'t we" = đề nghị → hoạt động theo sau.',
        },
        {
          id: 'k2_l_5_4', partNumber: 5,
          taskTypeVi: 'Ghép thông tin', taskTypeEn: 'Matching',
          prompt: 'What does Oliver want to do?',
          options: ['A. go shopping', 'B. visit a museum', 'C. walk by the river', 'D. have a picnic', 'E. go swimming', 'F. see a film', 'G. play football', 'H. visit a castle'],
          answer: 'B. visit a museum',
          audioTranscript: 'Oliver: I read that there\'s a really interesting museum in town — it\'s about local history. I\'d love to spend an hour there.',
          explanationVi: 'Oliver muốn thăm bảo tàng lịch sử địa phương (museum).',
          strategyVi: 'Nghe "museum" + "I\'d love to" → xác nhận.',
        },
        {
          id: 'k2_l_5_5', partNumber: 5,
          taskTypeVi: 'Ghép thông tin', taskTypeEn: 'Matching',
          prompt: 'What does Anna want to do?',
          options: ['A. go shopping', 'B. visit a museum', 'C. walk by the river', 'D. have a picnic', 'E. go swimming', 'F. see a film', 'G. play football', 'H. visit a castle'],
          answer: 'C. walk by the river',
          audioTranscript: 'Anna: I just want something relaxing. Let\'s walk by the river — the views are supposed to be beautiful.',
          explanationVi: 'Anna muốn đi bộ ven sông (walk by the river) để thư giãn.',
          strategyVi: '"something relaxing" + "walk by the river" → hoạt động cụ thể.',
        },
      ],
    },
  ],
};
