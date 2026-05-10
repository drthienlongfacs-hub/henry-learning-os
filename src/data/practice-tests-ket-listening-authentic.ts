import type { PracticeTest } from './practice-test-bank';

// ================================================================
// KET (A2 Key) — Listening Sample Test 2020 — AUTHENTIC
// Source: A2-Key-2020-sample-tests-Listening-question-paper.pdf
//         A2-Key-2020-Listening-AK.pdf (Answer Key)
// © Cambridge Assessment English 2020
// ================================================================

export const KET_LISTENING_AUTHENTIC: PracticeTest = {
  id: 'ket_list_auth_1', level: 'ket', skill: 'listening',
  skillVi: 'KET — Nghe (Sample Test 2020 — Authentic)', totalMinutes: 35,
  parts: [
    // ──────────────────────────────────────────
    // PART 1: Questions 1-5, MCQ Pictures
    // Answer Key: 1-A, 2-C, 3-C, 4-A, 5-A
    // ──────────────────────────────────────────
    { partNumber: 1, titleEn: 'Part 1: Multiple Choice (Pictures)', titleVi: 'Phần 1: Trắc nghiệm hình ảnh (5 câu)',
      instructionVi: 'Nghe 5 đoạn hội thoại ngắn. Chọn đáp án đúng nhất (A, B hoặc C).',
      questions: [
        {id:'ka_l_1_1',partNumber:1,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Pictures',prompt:'Where will Claire meet Alex?',options:['A','B','C'],answer:'A',explanationVi:'Claire sẽ gặp Alex tại vị trí A (theo PDF hình ảnh: ngoài quán cà phê/bên ngoài).',strategyVi:'Nghe địa điểm cuối cùng được thống nhất, bỏ qua đề nghị bị từ chối.'},
        {id:'ka_l_1_2',partNumber:1,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Pictures',prompt:'What time should the man telephone again?',options:['A (clock showing time)','B (clock showing time)','C (clock showing time)'],answer:'C',explanationVi:'Người đàn ông nên gọi lại vào giờ C (thời gian được xác nhận cuối cùng).',strategyVi:'Có nhiều mốc giờ được đề cập → chờ giờ cuối cùng được đề nghị và đồng ý.'},
        {id:'ka_l_1_3',partNumber:1,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Pictures',prompt:'When are they going to have the party?',options:['A. July 11','B. July 18','C. July 25'],answer:'C. July 25',explanationVi:'Bữa tiệc sẽ vào ngày 25 tháng 7 (July 25).',strategyVi:'3 ngày được đề cập nhưng chỉ 1 ngày được chốt cuối cùng → July 25.'},
        {id:'ka_l_1_4',partNumber:1,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Pictures',prompt:'What was the weather like on the picnic?',options:['A (sunny then rain)','B (cloudy)','C (windy)'],answer:'A',explanationVi:'Thời tiết trong buổi dã ngoại: nắng rồi mưa (A).',strategyVi:'Nghe diễn biến thời tiết: thường có thay đổi trong câu chuyện.'},
        {id:'ka_l_1_5',partNumber:1,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Pictures',prompt:'How much are the shorts?',options:['A. £5','B. £15','C. £20'],answer:'A. £5',explanationVi:'Quần short giá £5.',strategyVi:'Có nhiều giá được đề cập. Nghe kỹ giá thực tế phải trả, không phải giá gốc hoặc giá khuyến mãi khác.'}
      ]
    },
    // ──────────────────────────────────────────
    // PART 2: Questions 6-10, Gap Fill
    // Topic: Jobs for students with Sunshine Holidays
    // AK: 6-August, 7-19, 8-drive, 9-65, 10-photograph
    // ──────────────────────────────────────────
    { partNumber: 2, titleEn: 'Part 2: Gap Fill (Notes)', titleVi: 'Phần 2: Điền từ (5 câu)',
      instructionVi: 'Nghe giáo viên nói về công việc mùa hè. Điền 1 từ, số hoặc ngày vào chỗ trống.',
      questions: [
        {id:'ka_l_2_1',partNumber:2,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'Jobs for students with Sunshine Holidays\nWork in: Children\'s summer camps\nDates of jobs: 15th June – 20th __________',options:[],answer:'August',explanationVi:'Công việc từ 15 tháng 6 đến 20 tháng 8 (August).',strategyVi:'Nghe tháng kết thúc: "20th August".'},
        {id:'ka_l_2_2',partNumber:2,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'Staff must be: __________ years old',options:[],answer:'19',explanationVi:'Nhân viên phải từ 19 tuổi trở lên.',strategyVi:'Nghe số tuổi tối thiểu. Chú ý phân biệt 19/90, 15/50.'},
        {id:'ka_l_2_3',partNumber:2,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'Staff must be able to: __________',options:[],answer:'drive',explanationVi:'Nhân viên phải biết lái xe (drive).',strategyVi:'Nghe "must be able to" + động từ nguyên mẫu.'},
        {id:'ka_l_2_4',partNumber:2,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'Pay: £ __________ a week',options:[],answer:'65',explanationVi:'Lương £65 mỗi tuần.',strategyVi:'Nghe số tiền. Phân biệt 65/56, pounds/a week.'},
        {id:'ka_l_2_5',partNumber:2,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'Send: a letter and a __________',options:[],answer:'photograph',explanationVi:'Gửi một lá thư và một tấm ảnh (photograph).',strategyVi:'Nghe "and a..." → từ cần điền đi sau "and".'}
      ]
    },
    // ──────────────────────────────────────────
    // PART 3: Questions 11-15, MCQ (Interview)
    // Topic: Robert talking to Laura about a trip to Dublin
    // AK: 11-B, 12-A, 13-C, 14-B, 15-B
    // ──────────────────────────────────────────
    { partNumber: 3, titleEn: 'Part 3: Multiple Choice (Conversation)', titleVi: 'Phần 3: Trắc nghiệm hội thoại (5 câu)',
      instructionVi: 'Nghe Robert nói chuyện với Laura về chuyến đi Dublin. Chọn đáp án đúng.',
      questions: [
        {id:'ka_l_3_1',partNumber:3,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Conversation',prompt:'Who has already decided to go with Robert?',options:['A. family members','B. colleagues','C. tennis partners'],answer:'B. colleagues',explanationVi:'Các đồng nghiệp (colleagues) đã quyết định đi cùng Robert.',strategyVi:'Nghe "already decided" → đi với ai? colleagues.'},
        {id:'ka_l_3_2',partNumber:3,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Conversation',prompt:'They\'ll stay in',options:['A. a university','B. a guest house','C. a hotel'],answer:'A. a university',explanationVi:'Họ sẽ ở đại học (university) — có lẽ phòng ký túc xá mùa hè.',strategyVi:'Nghe nơi ở được xác nhận cuối cùng.'},
        {id:'ka_l_3_3',partNumber:3,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Conversation',prompt:'Laura must remember to take',options:['A. a map','B. a camera','C. a coat'],answer:'C. a coat',explanationVi:'Laura phải nhớ mang theo áo khoác (coat) vì thời tiết Dublin lạnh.',strategyVi:'Nghe "must remember" hoặc "don\'t forget" → vật dụng cần mang.'},
        {id:'ka_l_3_4',partNumber:3,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Conversation',prompt:'Why does Laura like Dublin?',options:['A. The people are friendly','B. The buildings are interesting','C. The shops are good'],answer:'B. The buildings are interesting',explanationVi:'Laura thích Dublin vì các tòa nhà thú vị (buildings are interesting).',strategyVi:'Nghe lý do Laura nêu ra, không phải Robert.'},
        {id:'ka_l_3_5',partNumber:3,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Conversation',prompt:'What will Laura do on Monday?',options:['A. visit a castle','B. go shopping','C. see a show'],answer:'B. go shopping',explanationVi:'Thứ Hai Laura sẽ đi mua sắm (go shopping).',strategyVi:'Ghép ngày với hoạt động: Monday → shopping.'}
      ]
    },
    // ──────────────────────────────────────────
    // PART 4: Questions 16-20, MCQ Short Texts
    // AK: 16-A, 17-B, 18-C, 19-B, 20-A
    // ──────────────────────────────────────────
    { partNumber: 4, titleEn: 'Part 4: Multiple Choice (Short Texts)', titleVi: 'Phần 4: Hội thoại ngắn (5 câu)',
      instructionVi: 'Nghe 5 đoạn hội thoại ngắn khác nhau. Chọn đáp án đúng.',
      questions: [
        {id:'ka_l_4_1',partNumber:4,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Short',prompt:'You will hear a woman talking to her friend about why she\'s bought a motorbike. Why did she buy it?',options:['A. It\'s fast.','B. It was cheap.','C. It\'ll be easy to repair.'],answer:'A. It\'s fast.',explanationVi:'Cô ấy mua xe máy vì nó nhanh (fast).',strategyVi:'Nghe lý do chính. Cheap/repair có thể được đề cập nhưng không phải lý do chính.'},
        {id:'ka_l_4_2',partNumber:4,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Short',prompt:'You will hear two friends talking about going to University. What subject is the man going to study?',options:['A. history','B. geography','C. chemistry'],answer:'B. geography',explanationVi:'Người đàn ông sẽ học địa lý (geography).',strategyVi:'Bẫy: có thể đề cập nhiều môn. Nghe môn được chốt cuối cùng.'},
        {id:'ka_l_4_3',partNumber:4,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Short',prompt:'You will hear two friends talking about the weekend. What did the woman enjoy most?',options:['A. a meal in a restaurant','B. a walk by the sea','C. a visit to a market'],answer:'C. a visit to a market',explanationVi:'Phụ nữ thích nhất là chuyến thăm chợ (a visit to a market).',strategyVi:'Nghe "enjoyed most" hoặc "favourite part" → đáp án thật.'},
        {id:'ka_l_4_4',partNumber:4,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Short',prompt:'You will hear a man talking about his new flat. What doesn\'t he like about it?',options:['A. the kitchen','B. the view from the window','C. the bathroom'],answer:'B. the view from the window',explanationVi:'Anh ấy không thích tầm nhìn từ cửa sổ (view from the window).',strategyVi:'Nghe từ phủ định: "don\'t like" hoặc "the problem is" + danh từ.'},
        {id:'ka_l_4_5',partNumber:4,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Short',prompt:'You will hear a girl talking about her school day. How did she get to school today?',options:['A. by car','B. by bus','C. on foot'],answer:'A. by car',explanationVi:'Hôm nay cô bé đến trường bằng xe hơi (by car).',strategyVi:'Phân biệt phương tiện: today (hôm nay) vs usually (thường ngày).'}
      ]
    },
    // ──────────────────────────────────────────
    // PART 5: Questions 21-25, Matching
    // Topic: Simon talking to Maria about a party — what food each person brings
    // AK: 21-F, 22-C, 23-A, 24-D, 25-H
    // Food options: A-bread, B-cake, C-cheese, D-chicken, E-fish, F-fruit, G-pizza, H-salad
    // ──────────────────────────────────────────
    { partNumber: 5, titleEn: 'Part 5: Matching', titleVi: 'Phần 5: Ghép thông tin (5 câu)',
      instructionVi: 'Nghe Simon nói chuyện với Maria về bữa tiệc. Mỗi người mang đồ ăn gì? Ghép người với đồ ăn.',
      questions: [
        {id:'ka_l_5_1',partNumber:5,taskTypeVi:'Ghép thông tin',taskTypeEn:'Matching',prompt:'What food will Barbara bring to the party?',options:['A. bread','B. cake','C. cheese','D. chicken','E. fish','F. fruit','G. pizza','H. salad'],answer:'F. fruit',explanationVi:'Barbara sẽ mang trái cây (fruit).',strategyVi:'Nghe tên người + loại đồ ăn được xác nhận.'},
        {id:'ka_l_5_2',partNumber:5,taskTypeVi:'Ghép thông tin',taskTypeEn:'Matching',prompt:'What food will Simon bring?',options:['A. bread','B. cake','C. cheese','D. chicken','E. fish','F. fruit','G. pizza','H. salad'],answer:'C. cheese',explanationVi:'Simon sẽ mang phô mai (cheese).',strategyVi:'Simon là người nói → nghe "I\'ll bring..." hoặc "I\'m bringing...".'},
        {id:'ka_l_5_3',partNumber:5,taskTypeVi:'Ghép thông tin',taskTypeEn:'Matching',prompt:'What food will Anita bring?',options:['A. bread','B. cake','C. cheese','D. chicken','E. fish','F. fruit','G. pizza','H. salad'],answer:'A. bread',explanationVi:'Anita sẽ mang bánh mì (bread).',strategyVi:'Chú ý: mỗi đáp án chỉ dùng 1 lần.'},
        {id:'ka_l_5_4',partNumber:5,taskTypeVi:'Ghép thông tin',taskTypeEn:'Matching',prompt:'What food will Peter bring?',options:['A. bread','B. cake','C. cheese','D. chicken','E. fish','F. fruit','G. pizza','H. salad'],answer:'D. chicken',explanationVi:'Peter sẽ mang gà (chicken).',strategyVi:'Nghe tên Peter + đồ ăn liên quan.'},
        {id:'ka_l_5_5',partNumber:5,taskTypeVi:'Ghép thông tin',taskTypeEn:'Matching',prompt:'What food will Tom bring?',options:['A. bread','B. cake','C. cheese','D. chicken','E. fish','F. fruit','G. pizza','H. salad'],answer:'H. salad',explanationVi:'Tom sẽ mang sa-lát (salad).',strategyVi:'Đáp án cuối → loại trừ các đáp án đã dùng.'}
      ]
    }
  ]
};
