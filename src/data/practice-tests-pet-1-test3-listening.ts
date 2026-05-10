import type { PracticeTest } from './practice-test-bank';

// ═══════════════════════════════════════════════════════════════════════
// VERIFIED Answer Key — Cambridge Preliminary English Test 1, Test 3
// Source: Book page 135, PDF page 144 (key-p144.png)
// ═══════════════════════════════════════════════════════════════════════
// Part 1 (Picture MCQ):  1A  2C  3C  4B  5C  6A  7B
// Part 2 (MCQ – Abby):  8B  9C  10A 11B 12C 13A
// Part 3 (Gap-fill):    14 rope  15 20/twenty  16 tall  17 band  18 rabbit  19 ice(-)cream
// Part 4 (Yes/No):      20B 21B 22B 23A 24B 25A
// ═══════════════════════════════════════════════════════════════════════
// Question paper pages: 064-070 (book pages 64-70)
// Audioscript pages:    136-140 (book pages 136-140)
// ═══════════════════════════════════════════════════════════════════════

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
      titleVi: 'Nghe Phần 1: Chọn tranh đúng (Questions 1–7)',
      instructionVi: 'Có 7 câu hỏi. Mỗi câu có 3 bức tranh và một đoạn ghi âm ngắn. Chọn đáp án đúng A, B hoặc C.',
      sourcePages: [
        '/exam-assets/pet1/test3/page-065.png',
        '/exam-assets/pet1/test3/page-066.png',
        '/exam-assets/pet1/test3/page-067.png'
      ],
      questions: [
        {
          id: 'pet_1_t3_l1', partNumber: 1,
          taskTypeVi: 'Chọn tranh', taskTypeEn: 'Picture MCQ',
          prompt: '1. Which T-shirt does the boy decide to buy?',
          options: [
            'A. White T-shirt with short sleeves and round neck',
            'B. Dark V-neck T-shirt with short sleeves',
            'C. Dark long-sleeved round-neck top'
          ],
          answer: 'A',
          explanationVi: 'Cậu bé muốn áo đen tay ngắn nhưng chỉ còn tay dài. Áo tay ngắn chỉ có màu nhạt. Cậu chọn áo tay ngắn cổ tròn màu nhạt (A) vì "colour\'s not so important".',
          strategyVi: 'Nghe đến quyết định cuối cùng: "I\'ll take one of the short-sleeved ones" → đáp án A.'
        },
        {
          id: 'pet_1_t3_l2', partNumber: 1,
          taskTypeVi: 'Chọn tranh', taskTypeEn: 'Picture MCQ',
          prompt: '2. Who will be on the stage next?',
          options: [
            'A. Solo female pianist',
            'B. Band with instruments',
            'C. Band with female singer and drums'
          ],
          answer: 'C',
          explanationVi: 'MC giới thiệu ban nhạc Subway — gồm tay trống và tay guitar, nhưng hôm nay có thêm Sarah Ireland (em gái tay trống) hát cùng → ban nhạc có nữ ca sĩ hát (C).',
          strategyVi: 'Chú ý "here are Subway... singing here with them for the first time is Sarah Ireland, the drummer\'s sister" → C.'
        },
        {
          id: 'pet_1_t3_l3', partNumber: 1,
          taskTypeVi: 'Chọn tranh', taskTypeEn: 'Picture MCQ',
          prompt: '3. What time will the pie be ready?',
          options: [
            'A. Clock showing 3:00 (ba giờ)',
            'B. Clock showing 12:00/1:00',
            'C. Clock showing 4:20-5:00 range'
          ],
          answer: 'C',
          explanationVi: 'Bây giờ là 4:35. Bánh vào lò lúc 4:15. Mẹ nói "don\'t take it out until twenty past" (5:20 giờ) → 45 phút nữa. Đáp án C (đồng hồ chỉ khoảng 5:20).',
          strategyVi: 'Nghe phép tính giờ: 4:35 hiện tại + "forty-five minutes to go" ≈ 5:20 → C.'
        },
        {
          id: 'pet_1_t3_l4', partNumber: 1,
          taskTypeVi: 'Chọn tranh', taskTypeEn: 'Picture MCQ',
          prompt: '4. Which photo does the girl dislike?',
          options: [
            'A. Beach photo with two people walking',
            'B. Beach photo with two people under palm tree',
            'C. Boat/sailing photo'
          ],
          answer: 'B',
          explanationVi: 'Cô gái nói "that dress I\'m wearing looks awful. I only bought it because it was half-price" → cô không thích bức ảnh mình mặc váy xấu (B).',
          strategyVi: 'Nghe từ tiêu cực: "looks awful" → bức ảnh cô gái không thích là B.'
        },
        {
          id: 'pet_1_t3_l5', partNumber: 1,
          taskTypeVi: 'Chọn tranh', taskTypeEn: 'Picture MCQ',
          prompt: '5. What should the students take on the school trip?',
          options: [
            'A. Water bottle and coins',
            'B. Banana and fruit',
            'C. Banana and coloured pencils'
          ],
          answer: 'C',
          explanationVi: 'Cô giáo nói mang hoa quả (trái cây) vì chuyến đi dài, và cần mang bút màu (coloured pencils) cho bài tập → C.',
          strategyVi: 'Nghe hai thứ cần mang: "Bring some... fruit" + "bring all your coloured pencils" → C.'
        },
        {
          id: 'pet_1_t3_l6', partNumber: 1,
          taskTypeVi: 'Chọn tranh', taskTypeEn: 'Picture MCQ',
          prompt: '6. Where do the boys decide to go?',
          options: [
            'A. Cinema (rạp chiếu phim)',
            'B. Computer/game shop',
            'C. Skateboarding park'
          ],
          answer: 'A',
          explanationVi: 'Bạn 1 không đủ tiền mua game → "Let\'s go and watch the film". Bạn 2 đồng ý: "We can go skateboarding any time" → đi xem phim (A).',
          strategyVi: 'Nghe quyết định cuối cùng sau khi loại các phương án khác → cinema (A).'
        },
        {
          id: 'pet_1_t3_l7', partNumber: 1,
          taskTypeVi: 'Chọn tranh', taskTypeEn: 'Picture MCQ',
          prompt: '7. What has the girl lost?',
          options: [
            'A. Mobile phone (điện thoại)',
            'B. Purse (ví tiền)',
            'C. Pen (bút)'
          ],
          answer: 'B',
          explanationVi: 'Cô gái lấy điện thoại ra khỏi cặp, cần bút để ghi → ví tiền rơi ra: "I think my purse fell out. I can\'t find it now" → B.',
          strategyVi: 'Phân biệt: phone và pen được nhắc đến nhưng KHÔNG bị mất. Purse mới là thứ bị mất → B.'
        }
      ]
    },
    {
      partNumber: 2,
      titleEn: 'Listening Part 2: MCQ — Interview with Abby Fielding (Teenage Surfer)',
      titleVi: 'Nghe Phần 2: Trắc nghiệm — Phỏng vấn Abby Fielding (Vận động viên lướt sóng tuổi teen)',
      instructionVi: 'Nghe phỏng vấn trên radio với Abby Fielding, vận động viên lướt sóng tuổi teen. Chọn đáp án đúng A, B hoặc C cho mỗi câu.',
      sourcePages: [
        '/exam-assets/pet1/test3/page-068.png',
        '/exam-assets/pet1/test3/page-069.png'
      ],
      questions: [
        {
          id: 'pet_1_t3_l8', partNumber: 2,
          taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ',
          prompt: '8. Abby first decided to go surfing when',
          options: [
            'A. her dad offered to teach her.',
            'B. she saw some local competitions.',
            'C. her mother gave her money for a surfboard.'
          ],
          answer: 'B',
          explanationVi: 'Bố muốn dạy (A đúng nhưng Abby vẫn chưa quyết). Mẹ cho tiền mua ván (C sai — mẹ đề nghị mua). Abby quyết định khi xem thi đấu: "I saw the standard... I just felt I could do better!" → B.',
          strategyVi: 'Nghe thứ tự sự kiện: dad offered → mum offered board → watched competitions = decided → B.'
        },
        {
          id: 'pet_1_t3_l9', partNumber: 2,
          taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ',
          prompt: '9. What did Abby discover when she started surfing?',
          options: [
            'A. Her local surfing school was expensive.',
            'B. She needed more equipment than she\'d expected.',
            'C. It was good to try different surfboards.'
          ],
          answer: 'C',
          explanationVi: 'Abby nói: "I went to the local surfing school... I was lent some boards before I bought one, to see which type I liked best — that was useful" → thử nhiều ván khác nhau là tốt (C).',
          strategyVi: 'Nghe "lent some boards... to see which type I liked best" → C.'
        },
        {
          id: 'pet_1_t3_l10', partNumber: 2,
          taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ',
          prompt: '10. What does Abby say about surfing in the winter?',
          options: [
            'A. The sea is warm enough where she lives.',
            'B. She wears a special suit for winter surfing.',
            'C. The beaches are very quiet then.'
          ],
          answer: 'A',
          explanationVi: 'Abby nói: "The sea is actually warmer than the land. I just wear the same wetsuit as I do in the summer" → biển đủ ấm (A).',
          strategyVi: 'Nghe "the sea is actually warmer than the land" → A. B sai vì "same wetsuit". C không được đề cập.'
        },
        {
          id: 'pet_1_t3_l11', partNumber: 2,
          taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ',
          prompt: '11. How did Abby feel about surfing the enormous wave?',
          options: [
            'A. disappointed she didn\'t have the right board',
            'B. worried at first by the size of the wave',
            'C. scared about falling off her board'
          ],
          answer: 'B',
          explanationVi: 'Abby nói: "I was nervous — the waves were a lot bigger than they look from the beach" → lo lắng ban đầu vì kích thước sóng (B).',
          strategyVi: 'Nghe cảm xúc: "nervous" = worried → B. A sai (mượn ván lớn hơn). C sai ("I didn\'t have time to think about that").'
        },
        {
          id: 'pet_1_t3_l12', partNumber: 2,
          taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ',
          prompt: '12. What advice does Abby give to teenagers interested in surfing?',
          options: [
            'A. don\'t start until you\'re a very strong swimmer',
            'B. find a good surfing teacher',
            'C. learn to surf in different conditions'
          ],
          answer: 'C',
          explanationVi: 'Abby khuyên: "you need to know how to surf whatever the waves are like — good and bad" → học lướt trong mọi điều kiện (C).',
          strategyVi: 'Nghe lời khuyên: "whatever the waves are like — good and bad" = different conditions → C.'
        },
        {
          id: 'pet_1_t3_l13', partNumber: 2,
          taskTypeVi: 'Trắc nghiệm', taskTypeEn: 'MCQ',
          prompt: '13. What does Abby want to do next?',
          options: [
            'A. find out about surfing as a career',
            'B. study surfing science at university',
            'C. train for the next surfing competition'
          ],
          answer: 'A',
          explanationVi: 'Abby nói: "my future\'s definitely in surfing, so I need to investigate what opportunities there are" → tìm hiểu cơ hội nghề nghiệp lướt sóng (A).',
          strategyVi: 'Nghe "investigate what opportunities" = find out about career → A. B sai ("not sure that\'s the right path"). C sai (chấn thương mắt cá).'
        }
      ]
    },
    {
      partNumber: 3,
      titleEn: 'Listening Part 3: Gap-fill — Caspar and the Circus Family',
      titleVi: 'Nghe Phần 3: Điền từ — Caspar và Gia đình Xiếc (Questions 14–19)',
      instructionVi: 'Nghe cậu bé Caspar, thành viên một gia đình xiếc, kể về cuộc sống của mình. Điền thông tin còn thiếu vào chỗ trống.',
      sourcePages: [
        '/exam-assets/pet1/test3/page-070.png'
      ],
      questions: [
        {
          id: 'pet_1_t3_l14', partNumber: 3,
          taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill',
          prompt: "Caspar's mother dances across a (14) ____________ in the circus.",
          options: [],
          answer: 'rope',
          explanationVi: 'Mẹ Caspar mặc trang phục đẹp và nhảy múa trên dây (rope) cách mặt đất 15 mét.',
          strategyVi: 'Nghe "dances across a rope about fifteen metres above the ground" → rope.'
        },
        {
          id: 'pet_1_t3_l15', partNumber: 3,
          taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill',
          prompt: "Caspar's brother is in an act where as many as (15) ____________ people balance on a motorbike.",
          options: [],
          answer: '20/twenty',
          explanationVi: 'Anh trai Caspar tham gia tiết mục có tới 20 người giữ thăng bằng trên xe máy.',
          strategyVi: 'Nghe số: "up to twenty people balance on a motorbike" → 20/twenty.'
        },
        {
          id: 'pet_1_t3_l16', partNumber: 3,
          taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill',
          prompt: "Caspar's dad is a good circus boss because he is (16) ____________ and has a strong voice.",
          options: [],
          answer: 'tall',
          explanationVi: 'Bố Caspar là ông bầu rạp xiếc giỏi vì ông cao (tall) và có giọng to.',
          strategyVi: 'Nghe tính từ mô tả: "He\'s good at his job because he\'s tall and has a loud voice" → tall.'
        },
        {
          id: 'pet_1_t3_l17', partNumber: 3,
          taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill',
          prompt: "Caspar starts the show by marching in front of the (17) ____________.",
          options: [],
          answer: 'band',
          explanationVi: 'Caspar bắt đầu buổi diễn bằng cách diễu hành phía trước ban nhạc (band).',
          strategyVi: 'Nghe "I march beside my dad ahead of the band" → band.'
        },
        {
          id: 'pet_1_t3_l18', partNumber: 3,
          taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill',
          prompt: "There are no animals in the show except a (18) ____________.",
          options: [],
          answer: 'rabbit',
          explanationVi: 'Rạp xiếc không có ngựa hay chó, chỉ có một con thỏ (rabbit) — luôn là ngôi sao của buổi diễn.',
          strategyVi: 'Nghe "the only animal in the circus is a rabbit" → rabbit.'
        },
        {
          id: 'pet_1_t3_l19', partNumber: 3,
          taskTypeVi: 'Điền từ', taskTypeEn: 'Gap-fill',
          prompt: "One of Caspar's jobs is selling (19) ____________.",
          options: [],
          answer: 'ice cream',
          explanationVi: 'Một trong các công việc của Caspar là bán kem (ice-cream) giờ giải lao.',
          strategyVi: 'Nghe "sell ice-cream at half-time" → ice cream / ice-cream.'
        }
      ]
    },
    {
      partNumber: 4,
      titleEn: 'Listening Part 4: Yes/No — Book Discussion (Lime County)',
      titleVi: 'Nghe Phần 4: Đúng/Sai — Thảo luận về sách "Lime County" (Questions 20–25)',
      instructionVi: 'Nghe Lisa và Sam nói về cuốn sách "Lime County" mà cả hai đã đọc. Nếu câu đúng, chọn A (YES). Nếu sai, chọn B (NO).',
      sourcePages: [
        '/exam-assets/pet1/test3/page-071.png'
      ],
      questions: [
        {
          id: 'pet_1_t3_l20', partNumber: 4,
          taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No',
          prompt: '20. Lisa disliked the book when she first started reading it.',
          options: ['A. YES', 'B. NO'],
          answer: 'B',
          explanationVi: 'Lisa nói: "I liked it from the first page" → Lisa THÍCH sách ngay từ đầu, không phải ghét → B (NO).',
          strategyVi: 'Nghe Lisa: "I liked it from the first page" trái ngược với "disliked" → NO.'
        },
        {
          id: 'pet_1_t3_l21', partNumber: 4,
          taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No',
          prompt: '21. Sam and Lisa felt sorry for Paul, the main character in the book.',
          options: ['A. YES', 'B. NO'],
          answer: 'B',
          explanationVi: 'Sam nói Paul bị đau chân, nhưng "the author didn\'t make you feel pity for him" và Lisa xác nhận "he was such a strong character" → KHÔNG thấy thương hại → B (NO).',
          strategyVi: 'Nghe "didn\'t make you feel pity" = didn\'t feel sorry → NO.'
        },
        {
          id: 'pet_1_t3_l22', partNumber: 4,
          taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No',
          prompt: '22. Sam was interested in the mystery about Paul and his brother.',
          options: ['A. YES', 'B. NO'],
          answer: 'B',
          explanationVi: 'Sam nói: "I didn\'t care so much about that. It was the football matches I liked" → Sam KHÔNG quan tâm bí ẩn → B (NO).',
          strategyVi: 'Nghe "I didn\'t care so much about that" → Sam không quan tâm mystery → NO.'
        },
        {
          id: 'pet_1_t3_l23', partNumber: 4,
          taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No',
          prompt: '23. Lisa thought the author helped the reader to understand Paul.',
          options: ['A. YES', 'B. NO'],
          answer: 'A',
          explanationVi: 'Lisa nói: "The author was clever because when Paul was unhappy, the whole story — the weather, the background — sort of got darker, so the reader could feel what Paul was feeling" → tác giả giúp người đọc hiểu Paul → A (YES).',
          strategyVi: 'Nghe Lisa khen tác giả: "the reader could feel what Paul was feeling" = helped understand → YES.'
        },
        {
          id: 'pet_1_t3_l24', partNumber: 4,
          taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No',
          prompt: '24. Sam wished there was more information about football in the book.',
          options: ['A. YES', 'B. NO'],
          answer: 'B',
          explanationVi: 'Sam nói: "I think the author got that just right" → Sam hài lòng với lượng thông tin bóng đá, KHÔNG muốn thêm → B (NO).',
          strategyVi: 'Nghe "just right" = vừa đủ, không cần thêm → NO.'
        },
        {
          id: 'pet_1_t3_l25', partNumber: 4,
          taskTypeVi: 'Đúng/Sai', taskTypeEn: 'Yes/No',
          prompt: '25. Lisa liked the way the author developed Paul\'s character.',
          options: ['A. YES', 'B. NO'],
          answer: 'A',
          explanationVi: 'Lisa nói: "the best part was that Paul realised what\'s important in life and how to deal with tough situations. He really grew as a person" → Lisa thích cách tác giả phát triển nhân vật → A (YES).',
          strategyVi: 'Nghe "He really grew as a person" = character development → YES.'
        }
      ]
    }
  ]
};
