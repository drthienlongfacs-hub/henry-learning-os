import type { PracticeTest } from './practice-test-bank';

// Answer Key — Cambridge Preliminary English Test 1, Test 3
// Part 1: 1A 2B 3C 4A 5C 6B 7A
// Part 2: 8B 9A 10C 11B 12C 13A
// Part 3: 14 cycling/bike, 15 12/twelve, 16 newspaper, 17 website, 18 Saturday, 19 café/cafe
// Part 4: 20A 21B 22A 23B 24A 25B

export const PET_1_TEST_3_LISTENING: PracticeTest = {
  id: 'pet_1_test_3_listening',
  level: 'pet',
  skill: 'listening',
  skillVi: 'Nghe — B1 Preliminary (PET 1, Test 3)',
  totalMinutes: 35,
  parts: [
    {
      partNumber: 1,
      titleEn: 'Listening Part 1: Multiple-choice pictures',
      titleVi: 'Nghe Phần 1: Chọn tranh đúng',
      instructionVi: 'Nghe 7 đoạn hội thoại ngắn. Với mỗi câu, chọn tranh đúng (A, B hoặc C).',
      sourcePages: ['/exam-assets/pet1/test3/page-071.png', '/exam-assets/pet1/test3/page-072.png'],
      questions: [
        { id: 'pet_1_t3_l1', partNumber: 1, taskTypeVi: 'Chọn tranh', taskTypeEn: 'Picture MCQ', prompt: '1. What sport will the boy do at the sports centre?', options: ['A. Swimming (bơi lội)', 'B. Tennis (quần vợt)', 'C. Basketball (bóng rổ)'], answer: 'A', explanationVi: 'Cậu bé sẽ đi bơi tại trung tâm thể thao.', strategyVi: 'Nghe từ khóa xác nhận cuối cùng sau khi loại bỏ các môn thể thao được đề cập ban đầu.' },
        { id: 'pet_1_t3_l2', partNumber: 1, taskTypeVi: 'Chọn tranh', taskTypeEn: 'Picture MCQ', prompt: '2. What did the woman leave on the bus?', options: ['A. Laptop (máy tính xách tay)', 'B. Handbag (túi xách)', 'C. Jacket (áo khoác)'], answer: 'B', explanationVi: 'Người phụ nữ để quên túi xách trên xe buýt.', strategyVi: 'Nghe kỹ: \"I left my...\" — đáp án cuối cùng là đúng sau khi sửa.' },
        { id: 'pet_1_t3_l3', partNumber: 1, taskTypeVi: 'Chọn tranh', taskTypeEn: 'Picture MCQ', prompt: '3. Which musical instrument does the girl play?', options: ['A. Guitar (đàn guitar)', 'B. Piano (đàn piano)', 'C. Violin (đàn violin)'], answer: 'C', explanationVi: 'Cô gái chơi đàn violin.', strategyVi: 'Phân biệt nhạc cụ: guitar (đàn gảy), piano (đàn phím), violin (đàn kéo).' },
        { id: 'pet_1_t3_l4', partNumber: 1, taskTypeVi: 'Chọn tranh', taskTypeEn: 'Picture MCQ', prompt: '4. What will the weather be like at the weekend?', options: ['A. Sunny and hot (nắng và nóng)', 'B. Cloudy and cool (mây và mát)', 'C. Rainy (mưa)'], answer: 'A', explanationVi: 'Cuối tuần sẽ có nắng và nóng.', strategyVi: 'Chú ý: \"at the weekend\" — không nhầm với thời tiết ngày hôm nay.' },
        { id: 'pet_1_t3_l5', partNumber: 1, taskTypeVi: 'Chọn tranh', taskTypeEn: 'Picture MCQ', prompt: '5. Which photo will the boy use for the project?', options: ['A. City skyline (đường chân trời thành phố)', 'B. Park scene (cảnh công viên)', 'C. Beach photo (ảnh bãi biển)'], answer: 'C', explanationVi: 'Cậu bé sẽ dùng ảnh bãi biển cho dự án.', strategyVi: 'Nghe lý do chọn lựa cuối cùng: \"I think I\'ll use the one of...\"' },
        { id: 'pet_1_t3_l6', partNumber: 1, taskTypeVi: 'Chọn tranh', taskTypeEn: 'Picture MCQ', prompt: '6. Where does the family decide to eat tonight?', options: ['A. At home (ở nhà)', 'B. At a restaurant (ở nhà hàng)', 'C. At a friend\'s house (ở nhà bạn)'], answer: 'B', explanationVi: 'Gia đình quyết định ăn tối tại nhà hàng.', strategyVi: 'Nghe thỏa thuận cuối: \"OK, let\'s go to...\"' },
        { id: 'pet_1_t3_l7', partNumber: 1, taskTypeVi: 'Chọn tranh', taskTypeEn: 'Picture MCQ', prompt: '7. Which bag has the girl bought?', options: ['A. Backpack (ba lô)', 'B. Shoulder bag (túi đeo vai)', 'C. Suitcase (vali)'], answer: 'A', explanationVi: 'Cô gái đã mua ba lô.', strategyVi: 'Phân biệt 3 loại túi. Nghe mô tả hình dạng và cách mang.' }
      ]
    },
    {
      partNumber: 2,
      titleEn: 'Listening Part 2: MCQ — Youth Club Interview',
      titleVi: 'Nghe Phần 2: Trắc nghiệm — Phỏng vấn câu lạc bộ thanh thiếu niên',
      instructionVi: 'Nghe phỏng vấn Emma về câu lạc bộ thanh thiếu niên mới. Chọn A, B hoặc C.',
      sourcePages: ['/exam-assets/pet1/test3/page-073.png'],
      questions: [
        { id: 'pet_1_t3_l8', partNumber: 2, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: '8. How did Emma first hear about the youth club?', options: ['A. from a friend', 'B. from a poster', 'C. from the internet'], answer: 'B', explanationVi: 'Emma biết về câu lạc bộ qua tờ áp phích (poster).', strategyVi: 'Nghe nguồn thông tin: friend/poster/internet — chọn cái được xác nhận cuối.' },
        { id: 'pet_1_t3_l9', partNumber: 2, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: '9. What does Emma say about the location of the club?', options: ['A. It is easy to get to by bus.', 'B. It is very close to her school.', 'C. It is difficult to find the first time.'], answer: 'A', explanationVi: 'Emma nói câu lạc bộ dễ đến bằng xe buýt.', strategyVi: 'Nghe đánh giá về vị trí: easy/difficult to get to, close to...' },
        { id: 'pet_1_t3_l10', partNumber: 2, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: '10. What activity does Emma enjoy most at the club?', options: ['A. painting', 'B. cooking', 'C. drama'], answer: 'C', explanationVi: 'Emma thích hoạt động kịch nghệ (drama) nhất.', strategyVi: 'Nghe superlative hoặc từ nhấn mạnh: \"most\", \"favourite\", \"best thing\".' },
        { id: 'pet_1_t3_l11', partNumber: 2, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: '11. What does Emma think about the club leader?', options: ['A. She is too strict.', 'B. She is very encouraging.', 'C. She is sometimes unfair.'], answer: 'B', explanationVi: 'Emma nghĩ người dẫn dắt câu lạc bộ rất khích lệ động viên.', strategyVi: 'Nghe nhận xét tích cực/tiêu cực về người lãnh đạo.' },
        { id: 'pet_1_t3_l12', partNumber: 2, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: '12. What problem does Emma mention about the club?', options: ['A. It closes too early.', 'B. There are not enough activities.', 'C. It can be crowded at times.'], answer: 'C', explanationVi: 'Vấn đề của câu lạc bộ là đôi khi quá đông người.', strategyVi: 'Nghe từ chỉ vấn đề/nhược điểm. "crowded" = đông người.' },
        { id: 'pet_1_t3_l13', partNumber: 2, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ', prompt: '13. What does Emma plan to do at the club next month?', options: ['A. take part in a competition', 'B. help organise an event', 'C. teach a new skill to others'], answer: 'A', explanationVi: 'Emma có kế hoạch tham gia cuộc thi tháng tới.', strategyVi: 'Nghe kế hoạch tương lai: \"I\'m going to...\", \"I\'m planning to...\", \"next month\".' }
      ]
    },
    {
      partNumber: 3,
      titleEn: 'Listening Part 3: Gap-fill — Community Park Project',
      titleVi: 'Nghe Phần 3: Điền từ — Dự án công viên cộng đồng',
      instructionVi: 'Nghe người phụ nữ giới thiệu về dự án công viên cộng đồng. Điền thông tin còn thiếu.',
      sourcePages: ['/exam-assets/pet1/test3/page-074.png'],
      questions: [
        { id: 'pet_1_t3_l14', partNumber: 3, taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill', prompt: 'Main activity planned for the park: (14) ____________ track', options: [], answer: 'cycling/bike', explanationVi: 'Hoạt động chính được lên kế hoạch là đường đua xe đạp (cycling track).', strategyVi: 'Nghe danh từ sau \"track\" để biết loại đường: cycling/bike/running...' },
        { id: 'pet_1_t3_l15', partNumber: 3, taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill', prompt: 'Number of volunteers needed to start the project: (15) ____________', options: [], answer: '12/twelve', explanationVi: 'Dự án cần 12 tình nguyện viên để bắt đầu.', strategyVi: 'Nghe số: twelve/12. Ghi nhanh khi nghe số đề phòng nhầm (12/20, 12/13).' },
        { id: 'pet_1_t3_l16', partNumber: 3, taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill', prompt: 'Find updates about the project in the local (16) ____________', options: [], answer: 'newspaper', explanationVi: 'Tìm cập nhật về dự án trên báo địa phương.', strategyVi: 'Nghe phương tiện truyền thông: newspaper/radio/website/social media.' },
        { id: 'pet_1_t3_l17', partNumber: 3, taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill', prompt: 'Sign up for the project on the council (17) ____________', options: [], answer: 'website', explanationVi: 'Đăng ký tham gia dự án trên trang web của hội đồng.', strategyVi: 'Nghe cách thức đăng ký: website/phone/email/in person.' },
        { id: 'pet_1_t3_l18', partNumber: 3, taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill', prompt: 'First volunteer meeting: (18) ____________ morning at 10am', options: [], answer: 'Saturday', explanationVi: 'Buổi họp tình nguyện đầu tiên vào sáng thứ Bảy lúc 10 giờ.', strategyVi: 'Nghe ngày trong tuần: Saturday/Sunday/Monday... Viết hoa chữ cái đầu.' },
        { id: 'pet_1_t3_l19', partNumber: 3, taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill', prompt: 'Refreshments will be available at the (19) ____________ next to the park', options: [], answer: 'café/cafe', explanationVi: 'Đồ ăn nhẹ sẽ có tại quán cà phê cạnh công viên.', strategyVi: 'Nghe địa điểm: café/shop/centre. Cả hai cách viết đều chấp nhận.' }
      ]
    },
    {
      partNumber: 4,
      titleEn: 'Listening Part 4: Yes/No — School Magazine',
      titleVi: 'Nghe Phần 4: Đúng/Sai — Tạp chí học sinh',
      instructionVi: 'Nghe Sara và Tom nói về tạp chí của trường. Chọn A (YES) hoặc B (NO).',
      sourcePages: ['/exam-assets/pet1/test3/page-075.png'],
      questions: [
        { id: 'pet_1_t3_l20', partNumber: 4, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No', prompt: '20. Sara thinks the magazine needs more interesting articles.', options: ['A. YES', 'B. NO'], answer: 'A', explanationVi: 'Sara nghĩ tạp chí cần có các bài viết thú vị hơn → ĐÚNG.', strategyVi: 'Nghe ý kiến của Sara: \"I think\", \"In my opinion\", \"We should\".' },
        { id: 'pet_1_t3_l21', partNumber: 4, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No', prompt: '21. Tom is happy with the photos currently used in the magazine.', options: ['A. YES', 'B. NO'], answer: 'B', explanationVi: 'Tom KHÔNG hài lòng với ảnh hiện tại trong tạp chí → SAI.', strategyVi: 'Chú ý phủ định hoặc ý kiến không hài lòng của Tom.' },
        { id: 'pet_1_t3_l22', partNumber: 4, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No', prompt: '22. Both Sara and Tom agree that more students should contribute to the magazine.', options: ['A. YES', 'B. NO'], answer: 'A', explanationVi: 'Cả Sara và Tom đều đồng ý rằng cần nhiều học sinh đóng góp hơn → ĐÚNG.', strategyVi: '\"Both agree\" = cả hai cùng ý kiến. Nghe xác nhận từ phía Tom sau khi Sara nói.' },
        { id: 'pet_1_t3_l23', partNumber: 4, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No', prompt: '23. Tom suggests that the magazine should be published more often.', options: ['A. YES', 'B. NO'], answer: 'B', explanationVi: 'Tom KHÔNG đề nghị tăng tần suất xuất bản → SAI.', strategyVi: 'Nghe kỹ: Tom có nói \"more often\", \"more frequently\" không?' },
        { id: 'pet_1_t3_l24', partNumber: 4, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No', prompt: '24. Sara wants to include a section about students\' future plans.', options: ['A. YES', 'B. NO'], answer: 'A', explanationVi: 'Sara muốn thêm mục về kế hoạch tương lai của học sinh → ĐÚNG.', strategyVi: 'Nghe đề nghị của Sara: \"I\'d like to...\", \"What about adding...\"' },
        { id: 'pet_1_t3_l25', partNumber: 4, taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No', prompt: '25. Tom thinks that finding advertisers for the magazine will be easy.', options: ['A. YES', 'B. NO'], answer: 'B', explanationVi: 'Tom KHÔNG nghĩ việc tìm nhà quảng cáo là dễ dàng → SAI.', strategyVi: 'Nghe đánh giá độ khó: \"easy\" trái ngược với \"difficult\", \"hard\", \"not easy\".' }
      ]
    }
  ]
};
