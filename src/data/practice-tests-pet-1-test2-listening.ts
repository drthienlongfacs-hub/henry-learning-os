import type { PracticeTest } from './practice-test-bank';

// Answer Key verified from page 123 of Cambridge Preliminary English Test 1
// Part 1: 1B 2C 3A 4C 5B 6B 7C
// Part 2: 8A 9C 10B 11C 12A 13B
// Part 3: 14 March, 15 England, 16 father, 17 money, 18 trainer, 19 apples
// Part 4: 20A 21B 22A 23A 24B 25A

export const PET_1_TEST_2_LISTENING: PracticeTest = {
  id: 'pet_1_test_2_listening',
  level: 'pet',
  skill: 'listening',
  skillVi: 'Nghe — B1 Preliminary (PET 1, Test 2)',
  totalMinutes: 35,
  parts: [
    {
      partNumber: 1,
      titleEn: 'Listening Part 1: Multiple-choice pictures',
      titleVi: 'Nghe Phần 1: Chọn tranh đúng',
      instructionVi: 'Nghe 7 đoạn hội thoại ngắn. Với mỗi câu, chọn tranh đúng (A, B hoặc C).',
      sourcePages: ['/exam-assets/pet1/test2/page-045.png', '/exam-assets/pet1/test2/page-046.png', '/exam-assets/pet1/test2/page-047.png'],
      questions: [
        { id: 'pet_1_t2_l1', partNumber: 1, taskTypeVi: 'Chọn tranh', taskTypeEn: 'Picture MCQ', prompt: 'What can\'t the woman find?', options: ['A. Scissors (kéo)', 'B. Umbrella (ô)', 'C. Torch (đèn pin)'], answer: 'B', explanationVi: 'Người phụ nữ không tìm thấy ô (umbrella).', strategyVi: 'Nghe từ khóa: "I can\'t find my..."' },
        { id: 'pet_1_t2_l2', partNumber: 1, taskTypeVi: 'Chọn tranh', taskTypeEn: 'Picture MCQ', prompt: 'What is the weather forecast for tomorrow?', options: ['A. Rain (mưa)', 'B. Wind and rain (gió và mưa)', 'C. Cloudy with wind (mây và gió)'], answer: 'C', explanationVi: 'Dự báo ngày mai: mây và gió, không mưa.', strategyVi: 'Chú ý phân biệt thời tiết hôm nay vs ngày mai.' },
        { id: 'pet_1_t2_l3', partNumber: 1, taskTypeVi: 'Chọn tranh', taskTypeEn: 'Picture MCQ', prompt: 'What did the boy buy?', options: ['A. Fruit and bread (trái cây và bánh mì)', 'B. Fruit and eggs (trái cây và trứng)', 'C. Fruit, bread, and newspaper (trái cây, bánh mì, và báo)'], answer: 'A', explanationVi: 'Cậu bé mua trái cây và bánh mì.', strategyVi: 'Nghe kỹ: "What did you get?"' },
        { id: 'pet_1_t2_l4', partNumber: 1, taskTypeVi: 'Chọn tranh', taskTypeEn: 'Picture MCQ', prompt: 'Which present has the girl bought her mother?', options: ['A. Jewellery box (hộp trang sức)', 'B. Picture frame (khung ảnh)', 'C. Pen set (bộ bút)'], answer: 'C', explanationVi: 'Cô gái mua bộ bút cho mẹ.', strategyVi: 'Nghe: "I got her..." — đáp án cuối cùng thường là đúng.' },
        { id: 'pet_1_t2_l5', partNumber: 1, taskTypeVi: 'Chọn tranh', taskTypeEn: 'Picture MCQ', prompt: 'Which TV programme will they watch together?', options: ['A. Film (phim)', 'B. Basketball (bóng rổ)', 'C. Nature/Animals (thiên nhiên/động vật)'], answer: 'B', explanationVi: 'Họ sẽ xem chương trình bóng rổ cùng nhau.', strategyVi: 'Nghe thỏa thuận cuối: "OK, let\'s watch..."' },
        { id: 'pet_1_t2_l6', partNumber: 1, taskTypeVi: 'Chọn tranh', taskTypeEn: 'Picture MCQ', prompt: 'What time is the swimming lesson today?', options: ['A. 5:30', 'B. 4:45', 'C. 3:15'], answer: 'B', explanationVi: 'Bài bơi hôm nay lúc 4:45.', strategyVi: 'Chú ý: giờ ban đầu có thể bị thay đổi trong hội thoại.' },
        { id: 'pet_1_t2_l7', partNumber: 1, taskTypeVi: 'Chọn tranh', taskTypeEn: 'Picture MCQ', prompt: 'Which subject does the boy like best?', options: ['A. IT/Computers (tin học)', 'B. Geography (địa lý)', 'C. Sport/PE (thể thao)'], answer: 'C', explanationVi: 'Cậu bé thích thể thao nhất.', strategyVi: 'Nghe superlatve: "best", "favourite", "most".' }
      ]
    },
    {
      partNumber: 2,
      titleEn: 'Listening Part 2: MCQ — Indoor Climbing Centre',
      titleVi: 'Nghe Phần 2: Trắc nghiệm — Trung tâm leo núi trong nhà',
      instructionVi: 'Nghe phỏng vấn Simon về trung tâm leo núi trong nhà. Chọn A, B hoặc C.',
      sourcePages: ['/exam-assets/pet1/test2/page-048.png', '/exam-assets/pet1/test2/page-049.png'],
      questions: [
        { id: 'pet_1_t2_l8', partNumber: 2, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'Simon\'s mum decided to take him to the climbing centre because', options: ['A. she had enjoyed going there.', 'B. her friend had recommended it.', 'C. Simon had been there with his school.'], answer: 'A', explanationVi: 'Mẹ Simon đã từng đến và thích nên dẫn Simon đi.', strategyVi: 'Nghe lý do: "she\'d been before and enjoyed it".' },
        { id: 'pet_1_t2_l9', partNumber: 2, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'Before he went to the centre, Simon was', options: ['A. worried about going climbing there.', 'B. interested in seeing the climbing wall.', 'C. disappointed to hear it was all indoors.'], answer: 'C', explanationVi: 'Simon thất vọng khi biết là trong nhà, vì muốn leo ngoài trời.', strategyVi: 'Nghe cảm xúc trước khi đi: "disappointed".' },
        { id: 'pet_1_t2_l10', partNumber: 2, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'Simon says that at the centre there were', options: ['A. lots of people when it opened.', 'B. many different types of people.', 'C. no other people his age.'], answer: 'B', explanationVi: 'Có nhiều loại người khác nhau — già, trẻ, gia đình.', strategyVi: 'Nghe: "all sorts of people", "different types".' },
        { id: 'pet_1_t2_l11', partNumber: 2, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'What did Simon think about the climbing wall?', options: ['A. He thought it looked very high.', 'B. He was afraid he might fall.', 'C. He found the foot holes helpful.'], answer: 'C', explanationVi: 'Simon thấy các lỗ chân hữu ích khi leo.', strategyVi: 'Nghe chi tiết: "the foot holes helped".' },
        { id: 'pet_1_t2_l12', partNumber: 2, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'Why was Simon unhappy with his first climb?', options: ['A. He was slower than everyone else.', 'B. He found it hurt his arms.', 'C. He didn\'t get to the top.'], answer: 'A', explanationVi: 'Simon chậm hơn mọi người trong lần leo đầu tiên.', strategyVi: 'Nghe so sánh: "slower than everyone".' },
        { id: 'pet_1_t2_l13', partNumber: 2, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: 'What does Simon feel he learnt from climbing at the centre?', options: ['A. how to improve his fitness', 'B. to think before he does something', 'C. the best way to work with other people'], answer: 'B', explanationVi: 'Simon học được cần suy nghĩ trước khi hành động.', strategyVi: 'Nghe bài học: "think before you act".' }
      ]
    },
    {
      partNumber: 3,
      titleEn: 'Listening Part 3: Gap-fill — Griffon the Horse',
      titleVi: 'Nghe Phần 3: Điền từ — Griffon, chú ngựa',
      instructionVi: 'Nghe Hannah nói về chú ngựa vô địch Griffon của gia đình. Điền từ còn thiếu.',
      sourcePages: ['/exam-assets/pet1/test2/page-050.png'],
      questions: [
        { id: 'pet_1_t2_l14', partNumber: 3, taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill', prompt: 'The international horse show will be held in the month of (14) ______, just after Hannah\'s birthday.', options: [], answer: 'March', explanationVi: 'Cuộc thi ngựa quốc tế diễn ra vào tháng 3, ngay sau sinh nhật Hannah.', strategyVi: 'Nghe tháng: "March, just after my birthday".' },
        { id: 'pet_1_t2_l15', partNumber: 3, taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill', prompt: 'The family will travel from Poland to the horse show in (15) ______.', options: [], answer: 'England', explanationVi: 'Gia đình sẽ đi từ Ba Lan đến Anh để dự cuộc thi.', strategyVi: 'Nghe quốc gia: "travel to England".' },
        { id: 'pet_1_t2_l16', partNumber: 3, taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill', prompt: 'The person who will ride Griffon round the ring in the international show is Hannah\'s (16) ______.', options: [], answer: 'father', explanationVi: 'Bố Hannah sẽ cưỡi Griffon trong cuộc thi quốc tế.', strategyVi: 'Nghe: "my father/dad will ride him".' },
        { id: 'pet_1_t2_l17', partNumber: 3, taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill', prompt: 'Two weeks ago Griffon won some (17) ______ as a prize.', options: [], answer: 'money', explanationVi: 'Griffon thắng giải được tiền thưởng 2 tuần trước.', strategyVi: 'Nghe giải thưởng: "won some money".' },
        { id: 'pet_1_t2_l18', partNumber: 3, taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill', prompt: 'Hannah\'s ambition is to work as a (18) ______.', options: [], answer: 'trainer', explanationVi: 'Ước mơ của Hannah là làm huấn luyện viên ngựa.', strategyVi: 'Nghe: "I want to be a trainer".' },
        { id: 'pet_1_t2_l19', partNumber: 3, taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill', prompt: 'When Griffon wins a competition, he is given some (19) ______ by the family.', options: [], answer: 'apples', explanationVi: 'Khi thắng, gia đình thưởng cho Griffon táo.', strategyVi: 'Nghe: "we give him apples as a reward".' }
      ]
    },
    {
      partNumber: 4,
      titleEn: 'Listening Part 4: True/False — Sharing a Bedroom',
      titleVi: 'Nghe Phần 4: Đúng/Sai — Chia sẻ phòng ngủ',
      instructionVi: 'Nghe Jamie và Miranda nói về việc chia phòng ngủ với anh/chị em. Chọn A (Yes) hoặc B (No).',
      sourcePages: ['/exam-assets/pet1/test2/page-051.png'],
      questions: [
        { id: 'pet_1_t2_l20', partNumber: 4, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No', prompt: 'Miranda accepts what her sister\'s side of the room looks like.', options: ['A. YES', 'B. NO'], answer: 'A', explanationVi: 'Miranda chấp nhận cách bên phòng của chị trông như thế nào.', strategyVi: 'Nghe: "I don\'t mind" = accepts.' },
        { id: 'pet_1_t2_l21', partNumber: 4, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No', prompt: 'Jamie complains that his brother refuses to share his electronic equipment.', options: ['A. YES', 'B. NO'], answer: 'B', explanationVi: 'Jamie KHÔNG phàn nàn về việc anh không chia sẻ thiết bị điện tử.', strategyVi: 'Nghe kỹ: Jamie có nói "refuses" không? → NO.' },
        { id: 'pet_1_t2_l22', partNumber: 4, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No', prompt: 'Miranda is annoyed about some things that her sister tells their mother.', options: ['A. YES', 'B. NO'], answer: 'A', explanationVi: 'Miranda bực mình vì chị mách mẹ một số chuyện.', strategyVi: 'Nghe: "annoyed", "tells mum".' },
        { id: 'pet_1_t2_l23', partNumber: 4, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No', prompt: 'Miranda was surprised that she felt lonely when her sister was away.', options: ['A. YES', 'B. NO'], answer: 'A', explanationVi: 'Miranda ngạc nhiên khi thấy cô đơn lúc chị đi vắng.', strategyVi: 'Nghe: "I was surprised" + "lonely".' },
        { id: 'pet_1_t2_l24', partNumber: 4, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No', prompt: 'Despite sharing a bedroom, Jamie finds he can still easily do his homework.', options: ['A. YES', 'B. NO'], answer: 'B', explanationVi: 'Jamie thấy KHÓ làm bài tập khi chia phòng (anh gây ồn).', strategyVi: 'Nghe: "it\'s hard to concentrate" = NOT easily.' },
        { id: 'pet_1_t2_l25', partNumber: 4, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No', prompt: 'Jamie and Miranda can both share problems with their brother or sister.', options: ['A. YES', 'B. NO'], answer: 'A', explanationVi: 'Cả hai đều có thể chia sẻ vấn đề với anh/chị em.', strategyVi: 'Nghe cả hai đồng ý: "we can talk about problems".' }
      ]
    }
  ]
};
