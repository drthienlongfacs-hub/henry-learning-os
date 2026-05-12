import type { PracticeTest } from './practice-test-bank';

// Cambridge Preliminary English Test 2, Test 1 — Reading & Writing
// Source: Cambridge PET 2 PDF, pages 6-18 (test) + page 86 (answer key)
// Answer key VERIFIED from scan-095.png (PDF page 95 = book page 86)

export const PET_2_TEST_1: PracticeTest = {
  id: 'pet_2_test_1',
  level: 'pet',
  skill: 'reading_writing',
  skillVi: 'Đọc & Viết — B1 Preliminary (PET 2, Test 1)',
  totalMinutes: 90,
  parts: [
    {
      partNumber: 1,
      titleEn: 'Reading Part 1: Multiple-choice short texts',
      titleVi: 'Đọc Phần 1: Biển báo và tin nhắn ngắn',
      instructionVi: 'Đọc văn bản ngắn và chọn đáp án đúng (A, B hoặc C).',
      sourcePages: ['/exam-assets/pet2/test1/page-006.png', '/exam-assets/pet2/test1/page-007.png'],
      questions: [
        { id: 'p2t1_1', partNumber: 1, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: '(See source page for notice/sign)', options: ['A', 'B', 'C'], answer: 'C', explanationVi: 'Đáp án C đúng theo đề gốc.', strategyVi: 'Đọc kỹ nội dung biển báo, tìm từ khóa chính.' },
        { id: 'p2t1_2', partNumber: 1, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: '(See source page for notice/sign)', options: ['A', 'B', 'C'], answer: 'B', explanationVi: 'Đáp án B đúng theo đề gốc.', strategyVi: 'Xác định mục đích chính của tin nhắn.' },
        { id: 'p2t1_3', partNumber: 1, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: '(See source page for notice/sign)', options: ['A', 'B', 'C'], answer: 'B', explanationVi: 'Đáp án B đúng theo đề gốc.', strategyVi: 'Tìm thông tin cụ thể trong thông báo.' },
        { id: 'p2t1_4', partNumber: 1, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: '(See source page for notice/sign)', options: ['A', 'B', 'C'], answer: 'A', explanationVi: 'Đáp án A đúng theo đề gốc.', strategyVi: 'Hiểu ý chính của biển báo.' },
        { id: 'p2t1_5', partNumber: 1, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: '(See source page for notice/sign)', options: ['A', 'B', 'C'], answer: 'C', explanationVi: 'Đáp án C đúng theo đề gốc.', strategyVi: 'Chú ý chi tiết số liệu, thời gian.' }
      ]
    },
    {
      partNumber: 2,
      titleEn: 'Reading Part 2: Matching',
      titleVi: 'Đọc Phần 2: Nối thông tin',
      instructionVi: 'Đọc mô tả 5 người và 8 đoạn văn. Nối mỗi người với đoạn phù hợp nhất.',
      sourcePages: ['/exam-assets/pet2/test1/page-008.png', '/exam-assets/pet2/test1/page-009.png'],
      questions: [
        { id: 'p2t1_6', partNumber: 2, taskTypeVi: 'Nối', taskTypeEn: 'Matching', prompt: 'Person 6 (See source page)', options: ['A','B','C','D','E','F','G','H'], answer: 'C', explanationVi: 'Đáp án C đúng theo answer key.', strategyVi: 'Gạch chân từ khóa ở mô tả người, tìm đoạn khớp.' },
        { id: 'p2t1_7', partNumber: 2, taskTypeVi: 'Nối', taskTypeEn: 'Matching', prompt: 'Person 7 (See source page)', options: ['A','B','C','D','E','F','G','H'], answer: 'F', explanationVi: 'Đáp án F đúng theo answer key.', strategyVi: 'Tìm từ đồng nghĩa giữa mô tả và đoạn văn.' },
        { id: 'p2t1_8', partNumber: 2, taskTypeVi: 'Nối', taskTypeEn: 'Matching', prompt: 'Person 8 (See source page)', options: ['A','B','C','D','E','F','G','H'], answer: 'G', explanationVi: 'Đáp án G đúng theo answer key.', strategyVi: 'Chú ý chi tiết cụ thể về sở thích, nhu cầu.' },
        { id: 'p2t1_9', partNumber: 2, taskTypeVi: 'Nối', taskTypeEn: 'Matching', prompt: 'Person 9 (See source page)', options: ['A','B','C','D','E','F','G','H'], answer: 'D', explanationVi: 'Đáp án D đúng theo answer key.', strategyVi: 'So sánh yêu cầu với dịch vụ/hoạt động.' },
        { id: 'p2t1_10', partNumber: 2, taskTypeVi: 'Nối', taskTypeEn: 'Matching', prompt: 'Person 10 (See source page)', options: ['A','B','C','D','E','F','G','H'], answer: 'B', explanationVi: 'Đáp án B đúng theo answer key.', strategyVi: 'Loại trừ đáp án đã dùng, chọn khớp nhất.' }
      ]
    },
    {
      partNumber: 3,
      titleEn: 'Reading Part 3: True/False',
      titleVi: 'Đọc Phần 3: Đúng/Sai',
      instructionVi: 'Đọc văn bản và chọn A (Right), B (Wrong) hoặc C (Doesn\'t say).',
      sourcePages: ['/exam-assets/pet2/test1/page-010.png', '/exam-assets/pet2/test1/page-011.png'],
      questions: [
        { id: 'p2t1_11', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Right/Wrong/DS', prompt: 'Question 11 (See source page)', options: ['A. Right', 'B. Wrong', 'C. Doesn\'t say'], answer: 'B', explanationVi: 'Đáp án B (Wrong) theo answer key.', strategyVi: 'So sánh câu phát biểu với nội dung bài đọc.' },
        { id: 'p2t1_12', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Right/Wrong/DS', prompt: 'Question 12 (See source page)', options: ['A. Right', 'B. Wrong', 'C. Doesn\'t say'], answer: 'A', explanationVi: 'Đáp án A (Right) theo answer key.', strategyVi: 'Tìm bằng chứng trực tiếp trong bài.' },
        { id: 'p2t1_13', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Right/Wrong/DS', prompt: 'Question 13 (See source page)', options: ['A. Right', 'B. Wrong', 'C. Doesn\'t say'], answer: 'B', explanationVi: 'Đáp án B (Wrong) theo answer key.', strategyVi: 'Chú ý từ phủ định và so sánh.' },
        { id: 'p2t1_14', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Right/Wrong/DS', prompt: 'Question 14 (See source page)', options: ['A. Right', 'B. Wrong', 'C. Doesn\'t say'], answer: 'A', explanationVi: 'Đáp án A (Right) theo answer key.', strategyVi: 'Xác định thông tin được nêu rõ ràng.' },
        { id: 'p2t1_15', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Right/Wrong/DS', prompt: 'Question 15 (See source page)', options: ['A. Right', 'B. Wrong', 'C. Doesn\'t say'], answer: 'A', explanationVi: 'Đáp án A (Right) theo answer key.', strategyVi: 'Tìm paraphrase (diễn đạt lại) trong bài.' },
        { id: 'p2t1_16', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Right/Wrong/DS', prompt: 'Question 16 (See source page)', options: ['A. Right', 'B. Wrong', 'C. Doesn\'t say'], answer: 'B', explanationVi: 'Đáp án B (Wrong) theo answer key.', strategyVi: 'Phân biệt Wrong vs Doesn\'t say.' },
        { id: 'p2t1_17', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Right/Wrong/DS', prompt: 'Question 17 (See source page)', options: ['A. Right', 'B. Wrong', 'C. Doesn\'t say'], answer: 'B', explanationVi: 'Đáp án B (Wrong) theo answer key.', strategyVi: 'Kiểm tra mâu thuẫn với bài đọc.' },
        { id: 'p2t1_18', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Right/Wrong/DS', prompt: 'Question 18 (See source page)', options: ['A. Right', 'B. Wrong', 'C. Doesn\'t say'], answer: 'B', explanationVi: 'Đáp án B (Wrong) theo answer key.', strategyVi: 'Chú ý từ chỉ mức độ (all, every, never).' },
        { id: 'p2t1_19', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Right/Wrong/DS', prompt: 'Question 19 (See source page)', options: ['A. Right', 'B. Wrong', 'C. Doesn\'t say'], answer: 'A', explanationVi: 'Đáp án A (Right) theo answer key.', strategyVi: 'Tìm bằng chứng cụ thể.' },
        { id: 'p2t1_20', partNumber: 3, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Right/Wrong/DS', prompt: 'Question 20 (See source page)', options: ['A. Right', 'B. Wrong', 'C. Doesn\'t say'], answer: 'B', explanationVi: 'Đáp án B (Wrong) theo answer key.', strategyVi: 'So sánh cẩn thận với nguyên văn.' }
      ]
    },
    {
      partNumber: 4,
      titleEn: 'Reading Part 4: MCQ Long Text',
      titleVi: 'Đọc Phần 4: Trắc nghiệm văn bản dài',
      instructionVi: 'Đọc văn bản và chọn A, B, C hoặc D.',
      sourcePages: ['/exam-assets/pet2/test1/page-012.png', '/exam-assets/pet2/test1/page-013.png'],
      questions: [
        { id: 'p2t1_21', partNumber: 4, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'Question 21 (See source page)', options: ['A', 'B', 'C', 'D'], answer: 'D', explanationVi: 'Đáp án D theo answer key.', strategyVi: 'Đọc câu hỏi trước, scan bài tìm đáp án.' },
        { id: 'p2t1_22', partNumber: 4, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'Question 22 (See source page)', options: ['A', 'B', 'C', 'D'], answer: 'C', explanationVi: 'Đáp án C theo answer key.', strategyVi: 'Tìm từ khóa trong bài đọc.' },
        { id: 'p2t1_23', partNumber: 4, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'Question 23 (See source page)', options: ['A', 'B', 'C', 'D'], answer: 'A', explanationVi: 'Đáp án A theo answer key.', strategyVi: 'Hiểu ý chính của đoạn văn.' },
        { id: 'p2t1_24', partNumber: 4, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'Question 24 (See source page)', options: ['A', 'B', 'C', 'D'], answer: 'C', explanationVi: 'Đáp án C theo answer key.', strategyVi: 'Suy luận từ ngữ cảnh.' },
        { id: 'p2t1_25', partNumber: 4, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'Question 25 (See source page)', options: ['A', 'B', 'C', 'D'], answer: 'B', explanationVi: 'Đáp án B theo answer key.', strategyVi: 'Hiểu mục đích/thái độ tác giả.' }
      ]
    },
    {
      partNumber: 5,
      titleEn: 'Reading Part 5: Multiple-choice cloze',
      titleVi: 'Đọc Phần 5: Điền từ — The First Woman Scientist',
      instructionVi: 'Đọc bài về Hypatia và chọn từ đúng (A, B, C hoặc D) cho mỗi chỗ trống.',
      sourcePages: ['/exam-assets/pet2/test1/page-014.png'],
      questions: [
        { id: 'p2t1_26', partNumber: 5, taskTypeVi: 'Điền từ', taskTypeEn: 'Cloze', prompt: 'Hypatia was (0) born in Alexandria... she was (26) _____ only woman scientist...', options: ['A. one', 'B. the', 'C. a', 'D. an'], answer: 'B', explanationVi: '\"the only\" = duy nhất → dùng \"the\".', strategyVi: 'Mạo từ xác định: the + only/first/last.' },
        { id: 'p2t1_27', partNumber: 5, taskTypeVi: 'Điền từ', taskTypeEn: 'Cloze', prompt: 'he (27) _____ sure his daughter had the best education', options: ['A. could', 'B. made', 'C. said', 'D. put'], answer: 'B', explanationVi: '\"made sure\" = đảm bảo. Collocation cố định.', strategyVi: 'make sure = collocation phổ biến.' },
        { id: 'p2t1_28', partNumber: 5, taskTypeVi: 'Điền từ', taskTypeEn: 'Cloze', prompt: 'most women then had few (28) _____ to study', options: ['A. classes', 'B. customs', 'C. opportunities', 'D. teachers'], answer: 'C', explanationVi: '\"opportunities to study\" = cơ hội học tập.', strategyVi: 'Collocation: opportunities + to V.' },
        { id: 'p2t1_29', partNumber: 5, taskTypeVi: 'Điền từ', taskTypeEn: 'Cloze', prompt: 'returned to Alexandria (29) _____ she began teaching', options: ['A. where', 'B. how', 'C. there', 'D. which'], answer: 'A', explanationVi: '\"returned to Alexandria where she began\" — mệnh đề quan hệ chỉ nơi chốn.', strategyVi: 'Relative clause: where + place.' },
        { id: 'p2t1_30', partNumber: 5, taskTypeVi: 'Điền từ', taskTypeEn: 'Cloze', prompt: 'became famous (30) _____ her knowledge', options: ['A. from', 'B. by', 'C. for', 'D. in'], answer: 'C', explanationVi: '\"famous for\" = nổi tiếng vì. Collocation.', strategyVi: 'famous for = collocation cố định.' },
        { id: 'p2t1_31', partNumber: 5, taskTypeVi: 'Điền từ', taskTypeEn: 'Cloze', prompt: 'We have no copies... (31) _____ we know that she wrote', options: ['A. because', 'B. but', 'C. or', 'D. as'], answer: 'B', explanationVi: '\"No copies... but we know\" = tương phản.', strategyVi: 'Liên từ tương phản: but.' },
        { id: 'p2t1_32', partNumber: 5, taskTypeVi: 'Điền từ', taskTypeEn: 'Cloze', prompt: 'interested in technology and (32) _____ several scientific tools', options: ['A. did', 'B. experimented', 'C. invented', 'D. learnt'], answer: 'C', explanationVi: '\"invented scientific tools\" = phát minh công cụ khoa học.', strategyVi: 'Nghĩa: invented = tạo ra, phát minh.' },
        { id: 'p2t1_33', partNumber: 5, taskTypeVi: 'Điền từ', taskTypeEn: 'Cloze', prompt: 'At the (33) _____ many rulers were afraid of science', options: ['A. day', 'B. period', 'C. year', 'D. time'], answer: 'D', explanationVi: '\"at the time\" = vào thời điểm đó.', strategyVi: 'Fixed expression: at the time.' },
        { id: 'p2t1_34', partNumber: 5, taskTypeVi: 'Điền từ', taskTypeEn: 'Cloze', prompt: 'and (34) _____ connected with it was in danger', options: ['A. anyone', 'B. nobody', 'C. all', 'D. something'], answer: 'A', explanationVi: '\"anyone connected with it\" = bất kỳ ai liên quan.', strategyVi: 'Logic: anyone + was in danger.' },
        { id: 'p2t1_35', partNumber: 5, taskTypeVi: 'Điền từ', taskTypeEn: 'Cloze', prompt: 'Hypatia (35) _____ attacked in the street and killed', options: ['A. was', 'B. had', 'C. has', 'D. is'], answer: 'A', explanationVi: '\"was attacked\" = bị động quá khứ đơn.', strategyVi: 'Passive voice: was + V3 (past simple).' }
      ]
    },
    {
      partNumber: 6,
      titleEn: 'Writing Part 1: Sentence Transformations',
      titleVi: 'Viết Phần 1: Biến đổi câu',
      instructionVi: 'Hoàn thành câu thứ hai sao cho nghĩa giống câu thứ nhất. Dùng KHÔNG QUÁ BA từ.',
      sourcePages: ['/exam-assets/pet2/test1/page-015.png'],
      questions: [
        { id: 'p2t1_36', partNumber: 6, taskTypeVi: 'Biến đổi câu', taskTypeEn: 'Transformation', prompt: 'My parents prefer jazz to classical music.\n→ My parents think jazz is ______ than classical music.', options: [], answer: 'better', explanationVi: '\"prefer A to B\" = \"think A is better than B\".', strategyVi: 'prefer → is better than.' },
        { id: 'p2t1_37', partNumber: 6, taskTypeVi: 'Biến đổi câu', taskTypeEn: 'Transformation', prompt: 'My parents only go swimming at the weekend.\n→ On weekdays, my parents aren\'t ______ go swimming.', options: [], answer: 'able to', explanationVi: '\"only at weekend\" → \"aren\'t able to on weekdays\".', strategyVi: 'only + time → not able to (at other times).' },
        { id: 'p2t1_38', partNumber: 6, taskTypeVi: 'Biến đổi câu', taskTypeEn: 'Transformation', prompt: 'If I finish my homework, I can go out at the weekend.\n→ I can\'t go out at the weekend ______ I finish my homework.', options: [], answer: 'unless', explanationVi: '\"if\" → \"unless\" (= if not).', strategyVi: 'if → unless = if... not.' },
        { id: 'p2t1_39', partNumber: 6, taskTypeVi: 'Biến đổi câu', taskTypeEn: 'Transformation', prompt: 'My sister watches more TV than me.\n→ I don\'t ______ TV as/so much/often as my sister does.', options: [], answer: 'watch', explanationVi: '\"watches more than me\" → \"I don\'t watch as much as\".', strategyVi: 'more than → not as much/often as.' },
        { id: 'p2t1_40', partNumber: 6, taskTypeVi: 'Biến đổi câu', taskTypeEn: 'Transformation', prompt: 'My parents suggested going out for a meal.\n→ My parents said, \'Why ______ we go out for a meal?\'', options: [], answer: 'don\'t', explanationVi: '\"suggested\" → \"Why don\'t we...?\" (gợi ý).', strategyVi: 'suggest → Why don\'t we...?' }
      ]
    },
    {
      partNumber: 7,
      titleEn: 'Writing Part 2: Short Message',
      titleVi: 'Viết Phần 2: Tin nhắn ngắn',
      instructionVi: 'Viết thẻ (card) 35-45 từ bao gồm tất cả các điểm yêu cầu.',
      sourcePages: ['/exam-assets/pet2/test1/page-016.png'],
      questions: [
        { id: 'p2t1_41', partNumber: 7, taskTypeVi: 'Viết card', taskTypeEn: 'Short message', prompt: 'Your English friend Jo was going to visit you next month but now can\'t come.\n\nWrite a card to Jo. In your card, you should:\n• apologise to Jo\n• explain why you can\'t see Jo next month\n• suggest when Jo could come instead.\n\nWrite 35-45 words.', options: [], answer: '(Open-ended — must cover all 3 content points)', explanationVi: 'Cần đủ 3 ý: (1) xin lỗi Jo, (2) giải thích tại sao, (3) đề xuất thời gian khác.', strategyVi: 'Mỗi bullet = 1 ý bắt buộc. 35-45 từ.', selfAssessment: true, rubricVi: ['Đủ 3 ý (apologise + explain + suggest)', 'Đúng format card/letter', '35-45 từ, ngữ pháp tự nhiên'] }
      ]
    },
    {
      partNumber: 8,
      titleEn: 'Writing Part 3: Letter or Story',
      titleVi: 'Viết Phần 3: Thư hoặc Truyện ngắn (~100 từ)',
      instructionVi: 'Chọn MỘT trong hai câu hỏi. Viết khoảng 100 từ.',
      sourcePages: ['/exam-assets/pet2/test1/page-017.png', '/exam-assets/pet2/test1/page-018.png'],
      questions: [
        { id: 'p2t1_42', partNumber: 8, taskTypeVi: 'Viết thư', taskTypeEn: 'Letter', prompt: 'Question 7 (Letter):\nThis is part of a letter from your penfriend:\n\n"I\'m glad you like learning English. Your teacher sounds really nice – and your friends do too! Tell me all about your English classes."\n\nWrite a letter to your penfriend. Write about 100 words.', options: [], answer: '(Open-ended — Band 1-5)', explanationVi: 'Trả lời về: (1) lớp học tiếng Anh, (2) giáo viên, (3) bạn bè.', strategyVi: 'Format thư bạn bè: Dear..., trả lời đủ ý, Best wishes.', selfAssessment: true, rubricVi: ['Trả lời đủ nội dung về lớp học', 'Giọng thân mật', '~100 từ'] },
        { id: 'p2t1_43', partNumber: 8, taskTypeVi: 'Viết truyện', taskTypeEn: 'Story', prompt: 'Question 8 (Story):\nYour English teacher has asked you to write a story.\nTitle: The last film I saw\n\nWrite about 100 words.', options: [], answer: '(Open-ended — Band 1-5)', explanationVi: 'Viết về bộ phim cuối cùng đã xem.', strategyVi: 'Dùng Past Simple. Mô tả: phim gì, xem ở đâu, cảm nhận.', selfAssessment: true, rubricVi: ['Liên quan tiêu đề', 'Có mở-thân-kết', '~100 từ, Past Simple'] }
      ]
    }
  ]
};
