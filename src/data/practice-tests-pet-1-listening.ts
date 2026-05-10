import type { PracticeTest } from './practice-test-bank';

export const PET_1_TEST_1_LISTENING: PracticeTest = {
  id: 'pet_1_test_1_listening',
  level: 'pet',
  skill: 'listening',
  skillVi: 'Nghe — B1 Preliminary (PET 1)',
  totalMinutes: 35,
  parts: [
    {
      partNumber: 1,
      titleEn: 'Listening Part 1: Picture-based MCQ',
      titleVi: 'Nghe Phần 1: Chọn hình đúng',
      instructionVi: 'Nghe 7 đoạn hội thoại ngắn. Mỗi câu có 3 hình, chọn A, B hoặc C.',
      sourcePages: ['/exam-assets/pet1/test1/listening-part1-025.png', '/exam-assets/pet1/test1/listening-part1-026.png', '/exam-assets/pet1/test1/listening-part1-027.png'],
      questions: [
        {
          id: 'pet_1_l1_1', partNumber: 1, taskTypeVi: 'Chọn hình', taskTypeEn: 'Picture MCQ',
          prompt: '1. Which dish did Mark cook in the competition?\n(A) pizza/pasta on plate (B) meat/fish dish on plate (C) salad/vegetables on plate',
          options: ['A', 'B', 'C'],
          answer: 'C',
          explanationVi: 'Mark nói: "I couldn\'t decide between fish and vegetables — I\'ve never been brilliant at meat dishes. Then I found the judge was an expert in cooking fish, which worried me, so I went for my other choice — and won!" → chọn rau/vegetable dish (C).',
          strategyVi: 'Listening Part 1: Nghe KỸ phần cuối hội thoại — đáp án thật thường ở câu cuối sau khi loại bỏ các lựa chọn sai.'
        },
        {
          id: 'pet_1_l1_2', partNumber: 1, taskTypeVi: 'Chọn hình', taskTypeEn: 'Picture MCQ',
          prompt: '2. Where is the girl\'s book now?\n(A) on a table/bench outside (B) in a bag/cabinet inside (C) on a desk/drawer',
          options: ['A', 'B', 'C'],
          answer: 'B',
          explanationVi: 'Người đàn ông nói: "I took it inside with the empty glass... I gave it to the manager, who put it with the other lost property. He keeps it all in the drawer of his desk." → sách đang ở trong ngăn kéo bàn quản lý (bên trong quán).',
          strategyVi: 'Chú ý chuỗi hành động: took inside → gave to manager → in the drawer. Đáp án là vị trí CUỐI CÙNG.'
        },
        {
          id: 'pet_1_l1_3', partNumber: 1, taskTypeVi: 'Chọn hình', taskTypeEn: 'Picture MCQ',
          prompt: '3. Who lives with Josh in his house?\n(A) grandparents + parents (3 adults) (B) parents + siblings (4 people) (C) parent + 1 sibling (2 adults + 1 child)',
          options: ['A', 'B', 'C'],
          answer: 'A',
          explanationVi: 'Đáp án chính thức là A — Josh sống cùng ông bà và bố mẹ (đại gia đình gồm người lớn tuổi).',
          strategyVi: 'Quan sát KỸ hình: phân biệt người lớn tuổi (ông bà) và trẻ em (anh chị em). Đếm số người trong mỗi hình.'
        },
        {
          id: 'pet_1_l1_4', partNumber: 1, taskTypeVi: 'Chọn hình', taskTypeEn: 'Picture MCQ',
          prompt: '4. What will the girl take with her on holiday?\n(A) a suitcase (B) a shoulder bag/holdall (C) a backpack/rucksack',
          options: ['A', 'B', 'C'],
          answer: 'B',
          explanationVi: 'Cô gái chọn mang túi đeo vai (shoulder bag/holdall) đi du lịch, không phải vali hay ba lô.',
          strategyVi: 'Phân biệt 3 loại túi: suitcase (vali cứng), holdall (túi xách mềm), backpack (ba lô). Nghe từ mô tả.'
        },
        {
          id: 'pet_1_l1_5', partNumber: 1, taskTypeVi: 'Chọn hình', taskTypeEn: 'Picture MCQ',
          prompt: '5. What time will the train to Manchester leave?\n(A) 11:30 (B) 11:45 (C) 11:50',
          options: ['A', 'B', 'C'],
          answer: 'C',
          explanationVi: 'Tàu đi Manchester sẽ khởi hành lúc 11:50. Chú ý: các thời gian khác (11:30, 11:45) có thể được đề cập nhưng là distractor.',
          strategyVi: 'Khi nghe số/giờ: GHI NHANH tất cả số nghe được → chọn đáp án ĐÚNG ngữ cảnh, thường là số CUỐI.'
        },
        {
          id: 'pet_1_l1_6', partNumber: 1, taskTypeVi: 'Chọn hình', taskTypeEn: 'Picture MCQ',
          prompt: '6. Where will the friends meet?\n(A) in a café/restaurant (B) outside a building/gallery (C) at a bus stop',
          options: ['A', 'B', 'C'],
          answer: 'A',
          explanationVi: 'Hai bạn sẽ hẹn gặp nhau ở quán cà phê/nhà hàng (café). Các địa điểm khác được đề cập nhưng không phải nơi hẹn.',
          strategyVi: 'Câu hỏi "Where will... meet?" = địa điểm CUỐI CÙNG được thống nhất, không phải nơi đề xuất đầu tiên.'
        },
        {
          id: 'pet_1_l1_7', partNumber: 1, taskTypeVi: 'Chọn hình', taskTypeEn: 'Picture MCQ',
          prompt: '7. Which sport will the boy do soon at the centre?\n(A) water-skiing (B) climbing/abseiling (C) sailing',
          options: ['A', 'B', 'C'],
          answer: 'C',
          explanationVi: 'Cậu bé sẽ chơi chèo thuyền buồm (sailing) sắp tới. Các môn khác đã chơi rồi hoặc chưa có kế hoạch.',
          strategyVi: 'Phân biệt thì: "will do SOON" = tương lai gần. Loại các hoạt động đã làm (past) hoặc chưa chắc (maybe).'
        }
      ]
    },
    {
      partNumber: 2,
      titleEn: 'Listening Part 2: Interview MCQ',
      titleVi: 'Nghe Phần 2: Phỏng vấn (Trắc nghiệm)',
      instructionVi: 'Nghe phỏng vấn ca sĩ Nick Parker (ban nhạc Krispy) và chị gái Mel. Chọn A, B hoặc C.',
      sourcePages: ['/exam-assets/pet1/test1/reading-017.png'],
      questions: [
        {
          id: 'pet_1_l2_8', partNumber: 2, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ',
          prompt: '8. When Nick and Mel were younger,',
          options: ['A. they studied music at school.', 'B. their father took them to live concerts.', 'C. their mother encouraged them to play music.'],
          answer: 'B. their father took them to live concerts.',
          explanationVi: 'Khi còn nhỏ, bố đưa Nick và Mel đi xem hòa nhạc trực tiếp (live concerts) → đáp án B.',
          strategyVi: 'Part 2: Nghe theo thứ tự câu hỏi. Mỗi câu tương ứng 1 đoạn trong bài phỏng vấn.'
        },
        {
          id: 'pet_1_l2_9', partNumber: 2, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ',
          prompt: '9. When Nick and Mel started writing music together, they',
          options: ['A. disagreed about the style they should have.', 'B. didn\'t want to be the same as other bands.', 'C. were influenced by different kinds of music.'],
          answer: 'C. were influenced by different kinds of music.',
          explanationVi: 'Khi bắt đầu viết nhạc, Nick và Mel chịu ảnh hưởng bởi nhiều thể loại nhạc khác nhau.',
          strategyVi: 'Nghe từ khóa: "influenced", "different kinds/types". Đáp án thường paraphrase ý trong bài nói.'
        },
        {
          id: 'pet_1_l2_10', partNumber: 2, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ',
          prompt: '10. The band Krispy was started after',
          options: ['A. Nick began studying at music school.', 'B. two other musicians heard Nick and Mel playing.', 'C. Nick and Mel advertised for the band members.'],
          answer: 'B. two other musicians heard Nick and Mel playing.',
          explanationVi: 'Ban nhạc Krispy hình thành sau khi 2 nhạc sĩ khác nghe Nick và Mel chơi nhạc.',
          strategyVi: 'Chú ý chuỗi sự kiện: event A → then event B → result. Đáp án = trigger event.'
        },
        {
          id: 'pet_1_l2_11', partNumber: 2, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ',
          prompt: '11. In the band\'s first year together,',
          options: ['A. concert audiences liked their music.', 'B. they signed a recording contract.', 'C. their national tour was very successful.'],
          answer: 'A. concert audiences liked their music.',
          explanationVi: 'Trong năm đầu, khán giả concert thích nhạc của họ. Hợp đồng thu âm và tour quốc gia đến sau.',
          strategyVi: 'Timeline: "first year" = chỉ sự kiện xảy ra trong 12 tháng đầu. Loại sự kiện xảy ra sau đó.'
        },
        {
          id: 'pet_1_l2_12', partNumber: 2, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ',
          prompt: '12. What does Nick say about life in the band today?',
          options: ['A. The older members look after him and Mel.', 'B. He\'s pleased to have the chance to travel.', 'C. There\'s no opportunity for them to relax together.'],
          answer: 'A. The older members look after him and Mel.',
          explanationVi: 'Nick nói các thành viên lớn tuổi hơn chăm sóc anh và Mel.',
          strategyVi: 'Câu hỏi "What does X say about Y today?" = ý kiến/nhận xét HIỆN TẠI, không phải quá khứ.'
        },
        {
          id: 'pet_1_l2_13', partNumber: 2, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ',
          prompt: '13. What disappointment has the band had?',
          options: ['A. They haven\'t yet had a number one single.', 'B. Their first album sold under a million copies.', 'C. A health problem delayed their album recording.'],
          answer: 'C. A health problem delayed their album recording.',
          explanationVi: 'Điều đáng thất vọng là vấn đề sức khỏe đã làm trì hoãn việc thu âm album.',
          strategyVi: 'Từ khóa "disappointment" = điều tiêu cực. Nghe tone giọng buồn/tiếc nuối để xác định đáp án.'
        }
      ]
    },
    {
      partNumber: 3,
      titleEn: 'Listening Part 3: Gap-fill',
      titleVi: 'Nghe Phần 3: Điền thông tin (Saturday course)',
      instructionVi: 'Nghe Ben nói về khóa học thứ Bảy. Điền thông tin còn thiếu vào mỗi chỗ trống.',
      sourcePages: ['/exam-assets/pet1/test1/listening-part3-4-030.png'],
      questions: [
        {
          id: 'pet_1_l3_14', partNumber: 3, taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill',
          prompt: 'Name of Ben\'s organisation: (14) ___________',
          options: [],
          answer: 'Nature',
          explanationVi: 'Tổ chức của Ben tên là "Nature" (Thiên nhiên).',
          strategyVi: 'Part 3: Ghi nhanh từ nghe được. Thường là danh từ riêng hoặc số. Chú ý chính tả.'
        },
        {
          id: 'pet_1_l3_15', partNumber: 3, taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill',
          prompt: 'Aim of course: Discovering (15) ___________',
          options: [],
          answer: 'wildlife',
          explanationVi: 'Mục tiêu khóa học: Khám phá đời sống hoang dã (wildlife).',
          strategyVi: 'Đọc trước form trước khi nghe → dự đoán loại từ cần điền (danh từ, tính từ, số...).'
        },
        {
          id: 'pet_1_l3_16', partNumber: 3, taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill',
          prompt: 'Closest course location for this group: (16) ___________',
          options: [],
          answer: 'forest',
          explanationVi: 'Địa điểm gần nhất cho nhóm này: rừng (forest).',
          strategyVi: 'Từ "closest" gợi ý sẽ có nhiều địa điểm được đề cập → chọn địa điểm GẦN NHẤT.'
        },
        {
          id: 'pet_1_l3_17', partNumber: 3, taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill',
          prompt: 'Length of course: (17) ___________ weeks',
          options: [],
          answer: '12/twelve',
          explanationVi: 'Khóa học kéo dài 12 tuần.',
          strategyVi: 'Có thể viết số (12) hoặc chữ (twelve). Cả hai đều được chấp nhận.'
        },
        {
          id: 'pet_1_l3_18', partNumber: 3, taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill',
          prompt: 'Examples of activities: Learn how to climb, Cut up wood, Make a (18) ___________',
          options: [],
          answer: 'fire',
          explanationVi: 'Hoạt động: nhóm lửa (make a fire).',
          strategyVi: '"Make a ___" → dự đoán: fire, cake, shelter... Nghe ngữ cảnh outdoor activities.'
        },
        {
          id: 'pet_1_l3_19', partNumber: 3, taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill',
          prompt: 'Design a (19) ___________ to take home.',
          options: [],
          answer: 'birdhouse/bird house',
          explanationVi: 'Thiết kế nhà chim (birdhouse) để mang về nhà.',
          strategyVi: 'Cả "birdhouse" (1 từ) và "bird house" (2 từ) đều chấp nhận.'
        }
      ]
    },
    {
      partNumber: 4,
      titleEn: 'Listening Part 4: Yes/No (True/False)',
      titleVi: 'Nghe Phần 4: Đúng/Sai (Poster for Sports Day)',
      instructionVi: 'Nghe Thomas và Ruby nói về poster cho ngày thể thao trường. Chọn A (YES) hoặc B (NO).',
      sourcePages: ['/exam-assets/pet1/test1/listening-part3-4-031.png'],
      questions: [
        {
          id: 'pet_1_l4_20', partNumber: 4, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No',
          prompt: '20. Ruby realises that the first design of the poster may need improving.',
          options: ['A. YES', 'B. NO'],
          answer: 'A. YES',
          explanationVi: 'Ruby nhận ra rằng thiết kế đầu tiên của poster có thể cần cải thiện → ĐÚNG.',
          strategyVi: 'Part 4: Nghe CẢ HAI người nói. Xác định AI nói gì và có ĐỒNG Ý hay KHÔNG.'
        },
        {
          id: 'pet_1_l4_21', partNumber: 4, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No',
          prompt: '21. Thomas thinks the poster should be bigger than last year\'s.',
          options: ['A. YES', 'B. NO'],
          answer: 'B. NO',
          explanationVi: 'Thomas KHÔNG nghĩ poster cần to hơn năm ngoái → SAI.',
          strategyVi: 'Chú ý phủ định: "I don\'t think...", "not really", "actually..." có thể đảo ý.'
        },
        {
          id: 'pet_1_l4_22', partNumber: 4, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No',
          prompt: '22. Ruby and Thomas agree that the poster should be in colour.',
          options: ['A. YES', 'B. NO'],
          answer: 'B. NO',
          explanationVi: 'Ruby và Thomas KHÔNG đồng ý về việc poster nên in màu → SAI (họ không thống nhất).',
          strategyVi: '"agree" = CẢ HAI cùng ý. Nếu chỉ 1 người đồng ý → NO.'
        },
        {
          id: 'pet_1_l4_23', partNumber: 4, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No',
          prompt: '23. Ruby thinks the photograph should be in the middle of the poster.',
          options: ['A. YES', 'B. NO'],
          answer: 'A. YES',
          explanationVi: 'Ruby nghĩ ảnh nên ở giữa poster → ĐÚNG.',
          strategyVi: 'Xác định chủ ngữ: "Ruby thinks..." → chỉ cần nghe ý kiến của Ruby, không phải Thomas.'
        },
        {
          id: 'pet_1_l4_24', partNumber: 4, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No',
          prompt: '24. Thomas suggests they use the same photograph as last year.',
          options: ['A. YES', 'B. NO'],
          answer: 'B. NO',
          explanationVi: 'Thomas KHÔNG đề nghị dùng lại ảnh năm ngoái → SAI.',
          strategyVi: '"suggests" = đề nghị. Nghe Thomas có nói "we could use the same one" không.'
        },
        {
          id: 'pet_1_l4_25', partNumber: 4, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No',
          prompt: '25. Ruby thinks every word on the poster should be the same size.',
          options: ['A. YES', 'B. NO'],
          answer: 'B. NO',
          explanationVi: 'Ruby KHÔNG nghĩ mọi chữ trên poster nên cùng kích thước → SAI (cô ấy muốn chữ to nhỏ khác nhau).',
          strategyVi: 'Từ "every" = tất cả. Nếu Ruby muốn một số chữ to hơn → NO.'
        }
      ]
    }
  ]
};
