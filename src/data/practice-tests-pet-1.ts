import type { PracticeTest } from './practice-test-bank';

export const PET_1_TEST_1: PracticeTest = {
  id: 'pet_1_test_1',
  level: 'pet',
  skill: 'reading_writing',
  skillVi: 'Đọc & Viết — B1 Preliminary (PET 1)',
  totalMinutes: 90,
  parts: [
    {
      partNumber: 1,
      titleEn: 'Reading Part 1: Multiple-choice short texts',
      titleVi: 'Đọc Phần 1: Biển báo và tin nhắn ngắn',
      instructionVi: 'Đọc văn bản ngắn (biển báo, email, tin nhắn) và chọn đáp án đúng (A, B hoặc C).',
      sourcePages: ['/exam-assets/pet1/test1/reading-part1-013.png', '/exam-assets/pet1/test1/reading-part1-014.png'],
      questions: [
        {
          id: 'pet_1_1_1', partNumber: 1, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Multiple choice',
          prompt: 'STUDENTS!\nYOUR 6€ DEPOSIT FOR LOCKER KEYS WON\'T BE REFUNDED IF KEYS ARE LOST.',
          options: ['A. Lost locker keys can be replaced for a charge of 6€.', 'B. You cannot collect your locker key until you have paid a 6€ deposit.', 'C. We cannot return your 6€ deposit if you lose your locker key.'],
          answer: 'C. We cannot return your 6€ deposit if you lose your locker key.',
          explanationVi: 'Thông báo nói rằng tiền cọc 6€ cho chìa khóa tủ sẽ KHÔNG được hoàn lại nếu mất chìa khóa. Đáp án C diễn đạt đúng ý này.',
          strategyVi: 'Part 1: Đọc kỹ từ khóa "won\'t be refunded" = "cannot return". Chú ý điều kiện "if keys are lost".'
        },
        {
          id: 'pet_1_1_2', partNumber: 1, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Multiple choice',
          prompt: 'Jo,\nCan you get me a \'Fast Boys\' T-shirt from their concert tomorrow? I like the purple ones, but another colour\'s OK if they haven\'t got one in my size.\nThanks\nHannah',
          options: ['A. Hannah has got a purple \'Fast Boys\' T-shirt and wants one in another colour.', 'B. Hannah would rather have a purple \'Fast Boys\' T-shirt if possible.', 'C. Hannah only wants a \'Fast Boys\' T-shirt if it\'s a purple one.'],
          answer: 'B. Hannah would rather have a purple \'Fast Boys\' T-shirt if possible.',
          explanationVi: 'Hannah thích màu tím ("I like the purple ones") nhưng chấp nhận màu khác nếu không có đúng size ("another colour\'s OK"). Vậy cô ấy ưu tiên (would rather) màu tím nếu có thể.',
          strategyVi: 'Xác định ý muốn chính và ý dự phòng. "I like... but another\'s OK" = ưu tiên nhưng linh hoạt.'
        },
        {
          id: 'pet_1_1_3', partNumber: 1, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Multiple choice',
          prompt: 'Class 5 Garden Party\n17 July 3.30pm\nBecause of bad weather, tomorrow\'s party will now be in the School Hall. Please give party food and drink to Mrs Bloom by 11am.',
          options: ['A. the time', 'B. the place', 'C. the refreshments'],
          answer: 'B. the place',
          explanationVi: 'Thông báo cho biết bữa tiệc sẽ chuyển sang School Hall vì thời tiết xấu. Thay đổi ở đây là ĐỊA ĐIỂM (the place), không phải thời gian hay đồ ăn.',
          strategyVi: 'Câu hỏi "What has changed?" — tìm thông tin khác biệt so với kế hoạch ban đầu. "will now be in" = thay đổi địa điểm.'
        },
        {
          id: 'pet_1_1_4', partNumber: 1, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Multiple choice',
          prompt: 'Becky,\nDon\'t forget your Aunt Jane\'s coming to stay tonight, so can you make sure the house is neat when you go out this afternoon?\nMum',
          options: ['A. tell Becky to stay at home to see her aunt.', 'B. ask Becky to tidy the house before she leaves.', 'C. remind Becky to go to her aunt\'s house.'],
          answer: 'B. ask Becky to tidy the house before she leaves.',
          explanationVi: 'Mẹ nhờ Becky "make sure the house is neat when you go out" = dọn dẹp nhà trước khi ra ngoài. Đáp án B diễn đạt đúng ý này.',
          strategyVi: 'Xác định mục đích viết (purpose). "make sure the house is neat" = tidy the house. "when you go out" = before she leaves.'
        },
        {
          id: 'pet_1_1_5', partNumber: 1, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Multiple choice',
          prompt: 'School Fitness Centre\nFrom the end of August, the fitness centre will be closed during the weekends and evenings.',
          options: ['A. change its opening hours at the end of August.', 'B. have shorter opening hours until the end of August.', 'C. open again to students at the end of August.'],
          answer: 'A. change its opening hours at the end of August.',
          explanationVi: 'Từ cuối tháng 8, trung tâm sẽ đóng cửa vào cuối tuần và buổi tối → giờ mở cửa sẽ thay đổi (change opening hours) từ thời điểm đó.',
          strategyVi: '"From the end of August" = bắt đầu từ cuối tháng 8. "closed during weekends and evenings" = giảm giờ mở cửa = thay đổi giờ.'
        }
      ]
    },
    {
      partNumber: 2,
      titleEn: 'Reading Part 2: Matching',
      titleVi: 'Đọc Phần 2: Nối thông tin (Matching)',
      instructionVi: 'Đọc mô tả về 5 người và 8 văn bản ngắn. Nối mỗi người với văn bản phù hợp nhất.',
      sourcePages: ['/exam-assets/pet1/test1/reading-part2-015.png', '/exam-assets/pet1/test1/reading-part2-016.png'],
      questions: [
        {
          id: 'pet_1_2_6', partNumber: 2, taskTypeVi: 'Nối thông tin', taskTypeEn: 'Matching',
          prompt: 'Short Art Courses (A-H):\nA. Wild Art — drawing/painting animals, wall poster, exhibition\nB. Colourscape — make a bag for school games clothes, football/hockey colours, gallery trip\nC. Create! — cartoon films, draw favourite characters, imagination important, cartoon museum visit\nD. Art Attack — printing, photography, cartoons, movie-making, latest technology, for college prep\nE. Art Matters — drawing techniques, inks/colour, live models, designer fashions/sportswear\nF. Art Magic — fashion jewellery from natural materials, photography for ideas\nG. Arts Centre — comic drawings on film, bring comic drawings/prints\nH. Rainbow — printing inks/paints on T-shirt, take home and wear\n\nPerson 6: Alice wants to help her with her drawing skills, particularly with drawing the latest styles of clothes, shoes and bags, because she wants to study this later at college.',
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          answer: 'E',
          explanationVi: 'Alice muốn vẽ quần áo, giày, túi xách (fashion) và học tiếp ở đại học. Course E (Art Matters) dạy vẽ kỹ thuật với mẫu sống mặc thời trang thiết kế (designer fashions/sportswear), phù hợp nhất.',
          strategyVi: 'Part 2: Gạch chân từ khóa của mỗi người (drawing + clothes/fashion + college). Đối chiếu với mô tả khóa học.'
        },
        {
          id: 'pet_1_2_7', partNumber: 2, taskTypeVi: 'Nối thông tin', taskTypeEn: 'Matching',
          prompt: 'Person 7: Darius loves making comic books, but isn\'t confident about his drawing. He wants to draw superheroes and animals and create adventures about them, but doesn\'t want to display his work.',
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          answer: 'C',
          explanationVi: 'Darius thích truyện tranh (comic books), vẽ siêu anh hùng và động vật. Course C (Create!) dạy kể chuyện bằng hình, vẽ nhân vật yêu thích, trí tưởng tượng quan trọng hơn kỹ năng vẽ — phù hợp vì Darius chưa tự tin về vẽ.',
          strategyVi: 'Chú ý cả điều kiện phụ: "doesn\'t want to display" → loại G (Arts Centre có film show).'
        },
        {
          id: 'pet_1_2_8', partNumber: 2, taskTypeVi: 'Nối thông tin', taskTypeEn: 'Matching',
          prompt: 'Person 8: Cassie enjoys making pictures and objects from different materials. During the course she\'d like to use her love of sport in her designs, and visit an exhibition to get new ideas.',
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          answer: 'B',
          explanationVi: 'Cassie thích dùng nhiều chất liệu, yêu thể thao và muốn xem triển lãm. Course B (Colourscape) dùng vải len/cotton, chủ đề thể thao (football/hockey colours), và có chuyến đi gallery.',
          strategyVi: 'Tìm 3 từ khóa: materials + sport + exhibition → Course B khớp cả 3.'
        },
        {
          id: 'pet_1_2_9', partNumber: 2, taskTypeVi: 'Nối thông tin', taskTypeEn: 'Matching',
          prompt: 'Person 9: Marc is talented at drawing, but also likes filming his friends on an old digital camera. He wants to develop this skill by learning to use more advanced equipment, and prepare for further study.',
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          answer: 'D',
          explanationVi: 'Marc giỏi vẽ, thích quay phim và muốn dùng thiết bị hiện đại hơn, chuẩn bị cho việc học tiếp. Course D (Art Attack) dạy nhiếp ảnh, hoạt hình, làm phim với công nghệ mới nhất, phù hợp cho ai muốn học đại học.',
          strategyVi: 'filming + advanced equipment + further study → Course D: photography, movie-making, latest technology, for college.'
        },
        {
          id: 'pet_1_2_10', partNumber: 2, taskTypeVi: 'Nối thông tin', taskTypeEn: 'Matching',
          prompt: 'Person 10: Harry has done a course about printing on paper, and would like to learn how to print on other materials. He also wants to produce something to take home and wear.',
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          answer: 'H',
          explanationVi: 'Harry muốn in trên chất liệu khác (không phải giấy) và làm thứ gì đó để mang về mặc. Course H (Rainbow) dạy in bằng mực và sơn trên áo T-shirt trắng — mang về mặc được.',
          strategyVi: 'print on other materials + take home and wear → Course H: printing on T-shirt, take home and wear. Khớp hoàn toàn.'
        }
      ]
    },
    {
      partNumber: 3,
      titleEn: 'Reading Part 3: True/False',
      titleVi: 'Đọc Phần 3: Đúng/Sai (True/False)',
      instructionVi: 'Đọc văn bản và chọn True (Đúng) hoặc False (Sai) cho mỗi câu.',
      sourcePages: ['/exam-assets/pet1/test1/reading-017.png', '/exam-assets/pet1/test1/reading-018.png'],
      questions: [
        {
          id: 'pet_1_3_11',
          partNumber: 3,
          taskTypeVi: 'Đúng/Sai',
          taskTypeEn: 'True/False',
          prompt: 'Read the text and answer the question:\n"My family have always been huge fans of New Zealand - my mum comes from the capital - so we saved up and went for a holiday there. We started with a week in the city she grew up in. After that, we toured around for a while before ending up by chance in Kaikoura..."\n\nPaul has family connections with the place he first visited in New Zealand.',
          options: ['True', 'False'],
          answer: 'True',
          explanationVi: 'Đúng. Mẹ của Paul đến từ thủ đô ("my mum comes from the capital") và họ đã dành một tuần ở thành phố nơi bà lớn lên ("the city she grew up in").',
          strategyVi: 'Part 3: So sánh thông tin trong câu hỏi với chi tiết trong bài đọc. Chú ý từ đồng nghĩa.'
        },
        {
          id: 'pet_1_3_12',
          partNumber: 3,
          taskTypeVi: 'Đúng/Sai',
          taskTypeEn: 'True/False',
          prompt: 'Read the text and answer the question:\n"After that, we toured around for a while before ending up by chance in Kaikoura, a small town on the coast."\n\nPaul and his family chose to go to Kaikoura as part of their tour.',
          options: ['True', 'False'],
          answer: 'False',
          explanationVi: 'Sai. Họ đến Kaikoura một cách tình cờ ("ending up by chance in Kaikoura").',
          strategyVi: 'Part 3: "chose to go" trái ngược với "ending up by chance" (tình cờ).'
        },
        {
          id: 'pet_1_3_13',
          partNumber: 3,
          taskTypeVi: 'Đúng/Sai',
          taskTypeEn: 'True/False',
          prompt: 'Read the text and answer the question:\n"The first evening it seemed a rather dull place, but the next day I remembered what I\'d read about it - that it was often possible to see dolphins and whales there!"\n\nAs soon as Paul arrived in Kaikoura he knew he might see some dolphins there.',
          options: ['True', 'False'],
          answer: 'False',
          explanationVi: 'Sai. Tối đầu tiên anh ấy thấy nơi đó khá tẻ nhạt, đến ngày hôm sau anh ấy mới nhớ ra ("but the next day I remembered...").',
          strategyVi: 'Part 3: Chú ý các cụm từ chỉ thời gian. "As soon as" (ngay khi) trái ngược với "the next day" (ngày hôm sau).'
        },
        {
          id: 'pet_1_3_14',
          partNumber: 3,
          taskTypeVi: 'Đúng/Sai',
          taskTypeEn: 'True/False',
          prompt: 'Read the text and answer the question:\n"My family and I set off on a dolphin trip on a cold, grey day with a number of other people on a small boat. However, the sky soon turned blue..."\n\nThe weather got worse during Paul\'s boat trip.',
          options: ['True', 'False'],
          answer: 'False',
          explanationVi: 'Sai. Chuyến đi bắt đầu vào một ngày lạnh lẽo và xám xịt nhưng sau đó bầu trời chuyển sang màu xanh ("the sky soon turned blue").',
          strategyVi: 'Part 3: "got worse" (trở nên tệ hơn) trái ngược với "turned blue" (quang đãng, đẹp lên).'
        },
        {
          id: 'pet_1_3_15',
          partNumber: 3,
          taskTypeVi: 'Đúng/Sai',
          taskTypeEn: 'True/False',
          prompt: 'Read the text and answer the question:\n"we raced across the waves in the sunshine until we finally reached the place where we were supposed to go swimming. To my surprise, this was more than 40 km from land."\n\nPaul had expected to go swimming closer to land.',
          options: ['True', 'False'],
          answer: 'True',
          explanationVi: 'Đúng. Anh ấy ngạc nhiên khi thấy nơi bơi lội cách đất liền hơn 40 km ("To my surprise, this was more than 40 km from land").',
          strategyVi: 'Part 3: Sự ngạc nhiên ("To my surprise") chứng tỏ anh ấy đã không mong đợi điều đó.'
        }
      ]
    },
    {
      partNumber: 4,
      titleEn: 'Reading Part 4: Multiple Choice (Long Text)',
      titleVi: 'Đọc Phần 4: Đọc hiểu văn bản dài (Trắc nghiệm)',
      instructionVi: 'Đọc văn bản và chọn đáp án đúng (A, B, C hoặc D) cho các câu hỏi từ 21 đến 25.',
      sourcePages: ['/exam-assets/pet1/test1/reading-019.png', '/exam-assets/pet1/test1/reading-020.png'],
      questions: [
        {
          id: 'pet_1_4_21',
          partNumber: 4,
          taskTypeVi: 'Trắc nghiệm',
          taskTypeEn: 'Multiple choice',
          prompt: 'Read the text and answer the question:\n"One to watch! Essay by Jessica Bourne, aged 14\nI\'m a big fan of films featuring the spy James Bond. I\'ve got most of them on DVD. We\'ve recently bought Quantum of Solace, in which Daniel Craig plays the part of Bond... Unfortunately I found the story difficult to follow in places... This is a more serious, darker Bond film, but I still really enjoyed it."\n\nWhat is Jessica trying to do in her essay?',
          options: [
            'A. explain what first attracted her to Bond films',
            'B. tell readers about the Bond DVDs she owns',
            'C. give a balanced view of a Bond film she has seen',
            'D. describe how Daniel Craig got the part of James Bond'
          ],
          answer: 'C. give a balanced view of a Bond film she has seen',
          explanationVi: 'Jessica khen ngợi phim (khen Daniel Craig, cảnh hành động) nhưng cũng chỉ ra điểm trừ (cốt truyện khó hiểu, ít trò đùa). Do đó, cô ấy đưa ra "a balanced view" (quan điểm đa chiều/cân bằng).',
          strategyVi: 'Câu hỏi đầu tiên thường hỏi về ý chính (main idea) hoặc mục đích của toàn bài (purpose). Hãy đọc lướt cả bài để nắm tinh thần chung.'
        },
        {
          id: 'pet_1_4_22',
          partNumber: 4,
          taskTypeVi: 'Trắc nghiệm',
          taskTypeEn: 'Multiple choice',
          prompt: 'What can a reader find out from Jessica\'s essay?',
          options: [
            'A. whether Quantum of Solace is her favourite Bond film',
            'B. what other films Daniel Craig has made',
            'C. which other actors have played James Bond',
            'D. whether she thinks Daniel Craig is the best James Bond'
          ],
          answer: 'D. whether she thinks Daniel Craig is the best James Bond',
          explanationVi: 'Trong bài, Jessica viết: "Daniel Craig... plays the part better than any of them" (đóng vai này giỏi hơn bất kỳ ai). Nghĩa là cô ấy cho rằng anh ấy là diễn viên đóng Bond tốt nhất.',
          strategyVi: 'Tìm thông tin chi tiết trong đoạn văn tương ứng. "plays the part better than any of them" = "the best James Bond".'
        },
        {
          id: 'pet_1_4_23',
          partNumber: 4,
          taskTypeVi: 'Trắc nghiệm',
          taskTypeEn: 'Multiple choice',
          prompt: 'What does Jessica tell us about Craig in the new Bond film?',
          options: [
            'A. He performs some of the action scenes.',
            'B. He wears some stylish clothes.',
            'C. He is given a lot of lines to say.',
            'D. He looks strong and fit enough to fight the criminals.'
          ],
          answer: 'A. He performs some of the action scenes.',
          explanationVi: 'Đoạn 2 có viết: "He even does a few of the more dangerous things in the film himself, instead of getting someone else to do them" (Anh ấy tự mình thực hiện những cảnh nguy hiểm).',
          strategyVi: 'Câu hỏi chi tiết. Chú ý các từ khoá trong đáp án và đối chiếu với bài đọc.'
        },
        {
          id: 'pet_1_4_24',
          partNumber: 4,
          taskTypeVi: 'Trắc nghiệm',
          taskTypeEn: 'Multiple choice',
          prompt: 'What is one problem with the film, according to Jessica?',
          options: [
            'A. It seems a bit too long.',
            'B. It\'s sometimes hard to understand what\'s happening.',
            'C. It has too much silly technology in it.',
            'D. It has jokes that aren\'t very funny.'
          ],
          answer: 'B. It\'s sometimes hard to understand what\'s happening.',
          explanationVi: 'Trong đoạn cuối, Jessica nói: "I found the story difficult to follow in places" (cốt truyện đôi chỗ khó theo dõi). Điều này tương ứng với đáp án B (đôi khi khó hiểu chuyện gì đang xảy ra).',
          strategyVi: 'Xác định đoạn văn đề cập đến những điểm chưa tốt (nhược điểm) và paraphrase (đổi từ) sang đáp án.'
        },
        {
          id: 'pet_1_4_25',
          partNumber: 4,
          taskTypeVi: 'Trắc nghiệm',
          taskTypeEn: 'Multiple choice',
          prompt: 'Which of these might appear in a magazine review of the new Bond film?',
          options: [
            'A. It\'s full of excitement, with Bond jumping across rooftops, so don\'t be disappointed by the slow start.',
            'B. The director wanted to move away from the last Bond film and include a bit less action.',
            'C. I\'m not sure the title tells you much... but be prepared to watch a rather different kind of Bond movie.',
            'D. Daniel Craig performed well as James Bond, but the main female star was disappointing.'
          ],
          answer: 'C. I\'m not sure the title tells you much... but be prepared to watch a rather different kind of Bond movie.',
          explanationVi: 'Trong bài, tác giả nói không hiểu vì sao phim lại có tên đó ("I don\'t know why the film\'s got that name") và bộ phim mang màu sắc khác biệt, u ám hơn ("This is a more serious, darker Bond film"). Điều này khớp hoàn toàn với mô tả của C.',
          strategyVi: 'Câu 25 thường yêu cầu suy luận tổng quát (global meaning) hoặc tóm tắt ý chính của tác giả về toàn bộ chủ đề.'
        }
      ]
    },
    {
      partNumber: 5,
      titleEn: 'Reading Part 5: Multiple-choice cloze',
      titleVi: 'Đọc Phần 5: Điền từ vào chỗ trống',
      instructionVi: 'Đọc đoạn văn "New Home — New School" và chọn từ đúng (A, B, C hoặc D) cho mỗi chỗ trống từ 26 đến 35.',
      sourcePages: ['/exam-assets/pet1/test1/reading-021.png', '/exam-assets/pet1/test1/reading-022.png'],
      questions: [
        {
          id: 'pet_1_5_26', partNumber: 5, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Multiple choice cloze',
          prompt: '"New Home — New School by Megan Williams, aged 13"\n\nLast year my Dad got a new job. It was in a town (0) __which__ was 100 kms from our home. Mum and Dad (26) _______ we would have to move...',
          options: ['A. chose', 'B. decided', 'C. selected', 'D. picked'],
          answer: 'B. decided',
          explanationVi: '"decided" đi với mệnh đề that (decided that we would...). Các từ khác không phù hợp về cấu trúc ngữ pháp.',
          strategyVi: 'Chú ý cấu trúc: decided + (that) clause. "chose/selected/picked" thường cần tân ngữ trực tiếp.'
        },
        {
          id: 'pet_1_5_27', partNumber: 5, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Multiple choice cloze',
          prompt: '...because it was a long way for Dad to (27) _______ every day.',
          options: ['A. transport', 'B. carry', 'C. tour', 'D. travel'],
          answer: 'D. travel',
          explanationVi: '"travel" = đi lại, di chuyển hàng ngày. "transport" cần tân ngữ (chở cái gì), "carry" = mang vác, "tour" = đi du lịch.',
          strategyVi: '"travel every day" = đi lại mỗi ngày (commute). Đây là collocation phổ biến.'
        },
        {
          id: 'pet_1_5_28', partNumber: 5, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Multiple choice cloze',
          prompt: 'When they (28) _______ me about their plan I was upset...',
          options: ['A. said', 'B. spoke', 'C. told', 'D. explained'],
          answer: 'C. told',
          explanationVi: '"told me about" = nói cho tôi biết về. "said" không có tân ngữ trực tiếp (said TO me). "spoke" dùng "spoke to me". "explained" dùng "explained TO me".',
          strategyVi: 'Phân biệt say/tell/speak/explain: chỉ "tell" + person trực tiếp (told me).'
        },
        {
          id: 'pet_1_5_29', partNumber: 5, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Multiple choice cloze',
          prompt: '...I was upset (29) _______ I loved my home and school.',
          options: ['A. because', 'B. so', 'C. but', 'D. and'],
          answer: 'A. because',
          explanationVi: 'Cần liên từ chỉ nguyên nhân: tôi buồn VÌ tôi yêu nhà và trường. "because" = bởi vì.',
          strategyVi: 'Xác định mối quan hệ logic: nguyên nhân (because), kết quả (so), tương phản (but), bổ sung (and).'
        },
        {
          id: 'pet_1_5_30', partNumber: 5, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Multiple choice cloze',
          prompt: 'I was worried that I would (30) _______ all my friends and teachers a lot.',
          options: ['A. forget', 'B. lose', 'C. leave', 'D. miss'],
          answer: 'D. miss',
          explanationVi: '"miss" = nhớ (ai đó khi xa). "forget" = quên. "lose" = mất. "leave" = rời khỏi. Ở đây nói về cảm xúc nhớ nhung.',
          strategyVi: '"miss someone" = nhớ ai đó. Collocation cố định khi nói về tình cảm xa cách.'
        },
        {
          id: 'pet_1_5_31', partNumber: 5, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Multiple choice cloze',
          prompt: 'Anyway, six months (31) _______, my family moved to the town of Hexford.',
          options: ['A. further', 'B. after', 'C. next', 'D. later'],
          answer: 'B. after',
          explanationVi: '"six months after" hoặc "six months later" đều đúng ngữ pháp, nhưng đáp án chính thức là B (after). Kiểm tra: "later" cũng có thể chấp nhận trong nhiều ngữ cảnh.',
          strategyVi: 'Cụm chỉ thời gian: "X time + after/later" = sau X thời gian.'
        },
        {
          id: 'pet_1_5_32', partNumber: 5, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Multiple choice cloze',
          prompt: 'The house was much bigger than our old one, and (32) _______ my bedroom window I could see the sea.',
          options: ['A. down', 'B. along', 'C. from', 'D. away'],
          answer: 'C. from',
          explanationVi: '"from my bedroom window" = từ cửa sổ phòng ngủ. Giới từ "from" chỉ vị trí quan sát.',
          strategyVi: '"from + vị trí" = nhìn từ đâu. Collocation: "from the window".'
        },
        {
          id: 'pet_1_5_33', partNumber: 5, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Multiple choice cloze',
          prompt: '...my bedroom window I (33) _______ see the sea.',
          options: ['A. shall', 'B. could', 'C. must', 'D. would'],
          answer: 'B. could',
          explanationVi: '"could see" = có thể nhìn thấy (khả năng trong quá khứ). Câu chuyện kể ở thì quá khứ nên dùng "could".',
          strategyVi: 'Modal verb trong quá khứ: could = was able to. Phân biệt: shall (tương lai), must (bắt buộc), would (ý muốn).'
        },
        {
          id: 'pet_1_5_34', partNumber: 5, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Multiple choice cloze',
          prompt: 'I wasn\'t looking forward to the first day at my new school. I felt really (34) _______ about meeting lots of new people.',
          options: ['A. nervous', 'B. disappointed', 'C. angry', 'D. bored'],
          answer: 'A. nervous',
          explanationVi: '"nervous about" = lo lắng về. Ngữ cảnh: ngày đầu trường mới, gặp nhiều người lạ → cảm giác hồi hộp, lo lắng.',
          strategyVi: 'Đọc ngữ cảnh cảm xúc: "wasn\'t looking forward to" + "meeting new people" → nervous (lo lắng), không phải angry/bored.'
        },
        {
          id: 'pet_1_5_35', partNumber: 5, taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'Multiple choice cloze',
          prompt: 'But when I got there everyone was great! My class teacher was nice and I (35) _______ friends with two girls in my class.',
          options: ['A. knew', 'B. found', 'C. made', 'D. met'],
          answer: 'C. made',
          explanationVi: '"made friends with" = kết bạn với. Đây là cụm từ cố định (collocation). Không nói "knew/found/met friends with".',
          strategyVi: 'Collocation quan trọng: "make friends (with)" = kết bạn. Học thuộc cụm này.'
        }
      ]
    },
    {
      partNumber: 6,
      titleEn: 'Writing Part 1: Sentence Transformations',
      titleVi: 'Viết Phần 1: Biến đổi câu',
      instructionVi: 'Hoàn thành câu thứ hai sao cho nghĩa giống câu thứ nhất. Dùng KHÔNG QUÁ BA từ.',
      questions: [
        {
          id: 'pet_1_w1_1', partNumber: 6, taskTypeVi: 'Biến đổi câu', taskTypeEn: 'Sentence transformation',
          prompt: 'You can\'t play Jotto unless there are at least two players.\n→ You can only play Jotto _______ there are at least two players.',
          options: [],
          answer: 'if/when',
          explanationVi: '"unless" = "if...not" (trừ khi). Biến đổi: "can\'t... unless" → "can only... if/when".',
          strategyVi: 'Quy tắc: unless = if not. "can\'t X unless Y" = "can only X if/when Y".'
        },
        {
          id: 'pet_1_w1_2', partNumber: 6, taskTypeVi: 'Biến đổi câu', taskTypeEn: 'Sentence transformation',
          prompt: 'You can play Jotto in a team or by yourself.\n→ You can play Jotto in a team or on _______ own.',
          options: [],
          answer: 'your',
          explanationVi: '"by yourself" = "on your own" (một mình). Cả hai đều diễn đạt ý "tự mình".',
          strategyVi: 'Cụm từ đồng nghĩa: by yourself = on your own. Chú ý đại từ sở hữu phù hợp.'
        },
        {
          id: 'pet_1_w1_3', partNumber: 6, taskTypeVi: 'Biến đổi câu', taskTypeEn: 'Sentence transformation',
          prompt: 'I enjoy the game, and my parents enjoy it too.\n→ I enjoy the game and so _______ my parents.',
          options: [],
          answer: 'do',
          explanationVi: '"so do + S" = "S cũng vậy" (đồng tình khẳng định). Thì hiện tại đơn → dùng "do".',
          strategyVi: 'Cấu trúc đảo ngữ đồng tình: So + auxiliary + S. Present simple → so do.'
        },
        {
          id: 'pet_1_w1_4', partNumber: 6, taskTypeVi: 'Biến đổi câu', taskTypeEn: 'Sentence transformation',
          prompt: 'My friend said that she had never played Jotto.\n→ My friend said, \'I _______ played Jotto.\'',
          options: [],
          answer: '\'ve/have never',
          explanationVi: 'Chuyển từ gián tiếp (had never played) sang trực tiếp (have never played). Lùi thì: had → have.',
          strategyVi: 'Reported → Direct speech: lùi thì ngược lại. Past perfect → Present perfect.'
        },
        {
          id: 'pet_1_w1_5', partNumber: 6, taskTypeVi: 'Biến đổi câu', taskTypeEn: 'Sentence transformation',
          prompt: 'What about playing the game now?\n→ Shall _______ the game now?',
          options: [],
          answer: 'we play',
          explanationVi: '"What about + V-ing?" = "Shall we + V?" (đề nghị). Cả hai đều dùng để gợi ý làm gì đó.',
          strategyVi: 'Cách đề nghị: What about V-ing? = Shall we V? = Why don\'t we V? = Let\'s V.'
        }
      ]
    },
    {
      partNumber: 7,
      titleEn: 'Writing Part 2: Short Message',
      titleVi: 'Viết Phần 2: Tin nhắn ngắn (Email)',
      instructionVi: 'Viết email 35-45 từ. Bạn phải bao gồm tất cả các điểm được yêu cầu.',
      questions: [
        {
          id: 'pet_1_w2_6', partNumber: 7, taskTypeVi: 'Viết email', taskTypeEn: 'Short message',
          prompt: 'Your English friend, Emma, has sent you some birthday money for you to buy a music CD.\n\nWrite an email to Emma. In your email, you should:\n• thank Emma for the present\n• say which music CD you are going to buy\n• explain why you have chosen this CD.\n\nWrite 35-45 words on your answer sheet.',
          options: [],
          answer: '(Open-ended writing task — see marking scheme: must cover all 3 content points)',
          explanationVi: 'Bài viết cần đủ 3 ý: (1) cảm ơn Emma về quà, (2) nói CD nào sẽ mua, (3) giải thích lý do chọn CD đó. Thiếu 1 ý sẽ bị trừ điểm.',
          strategyVi: 'Writing Part 2: Đếm số bullet points → mỗi bullet = 1 ý bắt buộc. Viết ngắn gọn 35-45 từ, đầy đủ 3 ý.'
        }
      ]
    },
    {
      partNumber: 8,
      titleEn: 'Writing Part 3: Letter or Story',
      titleVi: 'Viết Phần 3: Thư hoặc Truyện ngắn (~100 từ)',
      instructionVi: 'Chọn MỘT trong hai câu hỏi (7 hoặc 8). Viết khoảng 100 từ.',
      questions: [
        {
          id: 'pet_1_w3_7', partNumber: 8, taskTypeVi: 'Viết thư', taskTypeEn: 'Letter',
          prompt: 'Question 7 (Letter):\nThis is part of a letter you receive from a British friend:\n\n"I went to a great restaurant with my family last night. Which do you prefer: eating at home or in restaurants? Tell me about your favourite place to eat."\n\n• Now write a letter to your friend.\n• Write your letter in about 100 words.',
          options: [],
          answer: '(Open-ended — Band 1-5 marking: content, communicative achievement, organisation, language)',
          explanationVi: 'Thư phải trả lời 2 câu hỏi: (1) thích ăn ở nhà hay nhà hàng hơn? (2) Mô tả nơi ăn yêu thích. Cần mở đầu (Dear...) và kết thúc (Love/Best wishes) đúng format thư bạn bè.',
          strategyVi: 'Writing Part 3 Letter: Đọc kỹ câu hỏi trong thư → trả lời ĐẦY ĐỦ. Dùng liên từ (because, so, also). Giọng văn thân mật (informal).'
        },
        {
          id: 'pet_1_w3_8', partNumber: 8, taskTypeVi: 'Viết truyện', taskTypeEn: 'Story',
          prompt: 'Question 8 (Story):\n• Your English teacher wants you to write a story.\n• This is the title for your story:\n\nHow I met my best friend\n\n• Write your story in about 100 words.',
          options: [],
          answer: '(Open-ended — Band 1-5 marking: content, communicative achievement, organisation, language)',
          explanationVi: 'Truyện phải có cấu trúc rõ ràng: mở đầu (setting), diễn biến (events), kết thúc (ending). Phải liên quan đến tiêu đề "How I met my best friend".',
          strategyVi: 'Writing Part 3 Story: Dùng thì quá khứ đơn (Past Simple) là chính. Có mở-thân-kết rõ ràng. Thêm chi tiết thú vị để đạt điểm cao.'
        }
      ]
    }
  ]
};
