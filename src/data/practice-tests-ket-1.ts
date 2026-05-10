import type { PracticeTest } from './practice-test-bank';

export const KET_RW_2: PracticeTest = {
  id: 'ket_rw_2',
  level: 'ket',
  skill: 'reading_writing',
  skillVi: 'Đọc & Viết (A2 Key 2020 Sample)',
  totalMinutes: 60,
  parts: [
    {
      partNumber: 1,
      titleEn: 'Multiple Choice (Notices)',
      titleVi: 'Đọc hiểu thông báo ngắn (Part 1)',
      instructionVi: 'Đọc mỗi thông báo/tin nhắn ngắn và chọn đáp án A, B hoặc C.',
      questions: [
        {id:'k1_1_1',partNumber:1,taskTypeVi:'Đọc hiểu',taskTypeEn:'MCQ Notices',prompt:'Debbie\'s bike – for sale!\nOnly 1 year old.\nNew tyres.\nGreat for ages 10–14.\nPhone: 0798 657432',options:['A. The bicycle that\'s for sale was built for a child.','B. Some parts of the bicycle must be changed.','C. Debbie is selling the bike because she\'s too big for it now.'],answer:'A. The bicycle that\'s for sale was built for a child.',explanationVi:'"Great for ages 10–14" cho thấy xe đạp dành cho trẻ em.',strategyVi:'Đọc kỹ chi tiết "ages 10-14" = built for a child.'},
        {id:'k1_1_2',partNumber:1,taskTypeVi:'Đọc hiểu',taskTypeEn:'MCQ Notices',prompt:'Hi Ben,\nI\'ve got two tickets for the rock concert on Friday. Do you want to come?\nTim',options:['A. Tim thinks Ben should look on the concert website.','B. Tim hopes that Ben will be able to come with him.','C. Tim wants to know if Ben can pay him back today.'],answer:'B. Tim hopes that Ben will be able to come with him.',explanationVi:'"Do you want to come?" = Tim mời Ben đi cùng.',strategyVi:'Mục đích tin nhắn: mời ai đó đi cùng (invitation).'},
        {id:'k1_1_3',partNumber:1,taskTypeVi:'Đọc hiểu',taskTypeEn:'MCQ Notices',prompt:'KING\'S PARK\nAdults: £5\nChildren under 12: £3\nFamily ticket (2 adults + 2 children): £12\nENTRANCE →',options:['A. You get into the park by going this way.','B. It is more expensive to go here alone.','C. You will have fun if you come with friends.'],answer:'A. You get into the park by going this way.',explanationVi:'"ENTRANCE →" = lối vào theo hướng mũi tên.',strategyVi:'Chú ý biển chỉ dẫn: "ENTRANCE →" = "You get into the park by going this way."'},
        {id:'k1_1_4',partNumber:1,taskTypeVi:'Đọc hiểu',taskTypeEn:'MCQ Notices',prompt:'Lynne,\nSorry I can\'t get to the party until 8. Don\'t wait for me – go without me and I\'ll find you there!\nEmma',options:['A. Emma knows that Lynne can\'t be at the party when it starts.','B. Emma wants to go to the party a bit later than Lynne.','C. Emma wants to go out with Lynne but not to the party.'],answer:'B. Emma wants to go to the party a bit later than Lynne.',explanationVi:'"Sorry I can\'t get to the party until 8. Go without me" = Emma sẽ đến muộn hơn Lynne.',strategyVi:'Phân tích: "Don\'t wait for me" + "I\'ll find you there" = Emma muốn Lynne đi trước.'},
        {id:'k1_1_5',partNumber:1,taskTypeVi:'Đọc hiểu',taskTypeEn:'MCQ Notices',prompt:'ICE CREAM WORLD\nBuy one, get one free!\nToday only: 2pm – 4pm',options:['A. The ice cream shop is open for only 2 hours.','B. Two ice creams will cost the same as one.','C. You can get free ice creams all afternoon.'],answer:'B. Two ice creams will cost the same as one.',explanationVi:'"Buy one, get one free" = mua 1 tặng 1, tức 2 cái giá của 1.',strategyVi:'"Buy one, get one free" là khuyến mãi phổ biến: trả tiền 1 cái, được 2 cái.'},
        {id:'k1_1_6',partNumber:1,taskTypeVi:'Đọc hiểu',taskTypeEn:'MCQ Notices',prompt:'Anna,\nWe did pages 34–36 of the English book in class today. Mrs Grant says please do page 37 for homework.\nSophie\n\nWhy did Sophie write this message?',options:['A. to check if Anna has completed her homework','B. to let Anna know what they did in class today','C. to ask Anna to contact her about the homework'],answer:'B. to let Anna know what they did in class today',explanationVi:'Sophie thông báo cho Anna những gì đã làm trong lớp hôm nay (pages 34-36) và bài tập về nhà (page 37).',strategyVi:'Mục đích tin nhắn: thông báo (inform), không phải hỏi (ask) hay kiểm tra (check).'}
      ]
    },
    {
      partNumber: 2,
      titleEn: 'Multiple Matching',
      titleVi: 'Ghép nối thông tin (Part 2)',
      instructionVi: 'Đọc 3 đoạn văn ngắn về Young blog writers. Chọn người phù hợp (A=Tasha, B=Danni, C=Chrissie).',
      questions: [
        {id:'k1_2_1',partNumber:2,taskTypeVi:'Ghép nối',taskTypeEn:'Matching',prompt:'Young blog writers\n\nTasha: Last year I wrote for my college magazine, which I found really difficult, but I don\'t think it\'s hard to write a good blog. Mine is about things from daily life that make me laugh. My older brother also has a blog, but we\'re writing about different subjects. We don\'t discuss what we\'re planning, but we read each other\'s blogs sometimes. I like giving advice to people who write in asking for it – it\'s good to know I\'ve helped.\n\nDanni: I started writing my popular film blog because I love movies. I like it when readers send me articles by email about a film they\'ve seen, and I put these on my blog for everyone to read. I\'m still at college, so I\'m careful about spending too long on my blog, which is difficult as writing well takes time. I don\'t think I\'ll write it for much longer. I\'m busy, and it\'s time to do something new.\n\nChrissie: I began writing on a school magazine. I stopped after a few years, but I missed it, so I started my own – I\'m still writing it now! The blog\'s new for me, and I write about daily life. I get ideas from friends or my sister when I can\'t decide what to write about – we always think of something interesting, sad or serious. At first, almost nobody visited my site, but now more do, I\'ve had some lovely comments.\n\nWho writes both a magazine and a blog?',options:['Tasha','Danni','Chrissie'],answer:'Chrissie',explanationVi:'Chrissie: "I began writing on a school magazine... I\'m still writing it now! The blog\'s new for me."',strategyVi:'Scan: "magazine" + "blog" cùng lúc ở hiện tại.'},
        {id:'k1_2_2',partNumber:2,taskTypeVi:'Ghép nối',taskTypeEn:'Matching',prompt:'Who says that studying and writing a blog at the same time can be hard?',options:['Tasha','Danni','Chrissie'],answer:'Danni',explanationVi:'Danni: "I\'m still at college, so I\'m careful about spending too long on my blog, which is difficult as writing well takes time."',strategyVi:'"difficult" = "hard", "at college" = "studying".'},
        {id:'k1_2_3',partNumber:2,taskTypeVi:'Ghép nối',taskTypeEn:'Matching',prompt:'Who answers questions from other people who read her blog?',options:['Tasha','Danni','Chrissie'],answer:'Tasha',explanationVi:'Tasha: "I like giving advice to people who write in asking for it."',strategyVi:'"answers questions" = "giving advice to people who write in asking".'},
        {id:'k1_2_4',partNumber:2,taskTypeVi:'Ghép nối',taskTypeEn:'Matching',prompt:'Who plans to stop writing her blog soon?',options:['Tasha','Danni','Chrissie'],answer:'Danni',explanationVi:'Danni: "I don\'t think I\'ll write it for much longer. I\'m busy, and it\'s time to do something new."',strategyVi:'"stop writing soon" = "don\'t think I\'ll write it for much longer".'},
        {id:'k1_2_5',partNumber:2,taskTypeVi:'Ghép nối',taskTypeEn:'Matching',prompt:'Who didn\'t have many people reading her blog in the beginning?',options:['Tasha','Danni','Chrissie'],answer:'Chrissie',explanationVi:'Chrissie: "At first, almost nobody visited my site."',strategyVi:'"didn\'t have many people" = "almost nobody visited". "in the beginning" = "At first".'},
        {id:'k1_2_6',partNumber:2,taskTypeVi:'Ghép nối',taskTypeEn:'Matching',prompt:'Who asks a member of her family to help her write her blog?',options:['Tasha','Danni','Chrissie'],answer:'Chrissie',explanationVi:'Chrissie: "I get ideas from friends or my sister." (sister = family member)',strategyVi:'"family member" = "sister". Tasha có anh trai nhưng không nói anh ấy giúp viết.'},
        {id:'k1_2_7',partNumber:2,taskTypeVi:'Ghép nối',taskTypeEn:'Matching',prompt:'Who says writing a blog is easier than some other types of writing?',options:['Tasha','Danni','Chrissie'],answer:'Tasha',explanationVi:'Tasha: "Last year I wrote for my college magazine, which I found really difficult, but I don\'t think it\'s hard to write a good blog."',strategyVi:'So sánh: magazine = "really difficult", blog = "don\'t think it\'s hard" → blog dễ hơn.'}
      ]
    },
    {
      partNumber: 3,
      titleEn: 'Multiple Choice Long Text',
      titleVi: 'Đọc hiểu chi tiết (Part 3)',
      instructionVi: 'Đọc đoạn văn và trả lời câu hỏi A, B hoặc C.',
      questions: [
        {
          id: 'k1_3_1',
          partNumber: 3,
          taskTypeVi: 'Đọc hiểu',
          taskTypeEn: 'Multiple Choice',
          prompt: `A family of dancers

The women in the Watson family are all crazy about ballet. These days, Alice Watson gives ballet lessons, but for many years, she was a dancer with the National Ballet Company. Her mother, Hannah, also had a full-time job there, making costumes for the dancers.

Alice's daughter Demi started learning ballet as soon as she could walk. "I never taught her," says Alice, "because she never let me." Now aged sixteen, Demi is a member of the ballet company where her mother was the star dancer.

What is Alice Watson's job now?`,
          options: ['dancer', 'teacher', 'dress-maker'],
          answer: 'teacher',
          explanationVi: 'Bài viết nói: "These days, Alice Watson gives ballet lessons". (Hiện tại cô ấy dạy múa ballet = teacher). Cô ấy từng là dancer "for many years" (trong quá khứ).',
          strategyVi: 'Chú ý trạng từ thời gian: "now" = "these days". Tránh bẫy thông tin quá khứ ("was a dancer").'
        },
        {
          id: 'k1_3_2',
          partNumber: 3,
          taskTypeVi: 'Đọc hiểu',
          taskTypeEn: 'Multiple Choice',
          prompt: `A family of dancers
...
Alice's daughter Demi started learning ballet as soon as she could walk. "I never taught her," says Alice, "because she never let me." Now aged sixteen, Demi is a member of the ballet company...

Demi had her first ballet lessons:`,
          options: ['at a very young age.', 'at the National Ballet Company.', 'from her mother.'],
          answer: 'at a very young age.',
          explanationVi: '"as soon as she could walk" = ngay khi biết đi (rất nhỏ tuổi). Mẹ cô bé (Alice) không dạy cô bé ("I never taught her").',
          strategyVi: 'Paraphrase: "as soon as she could walk" = "at a very young age". Loại trừ đáp án C vì văn bản ghi rõ ngược lại.'
        },
        {
          id: 'k1_3_3',
          partNumber: 3,
          taskTypeVi: 'Đọc hiểu',
          taskTypeEn: 'Multiple Choice',
          prompt: `A family of dancers
...
Alice's husband, Jack, is an electrician. "When Demi started dancing, the house was too small for her and Alice to practise in so I made the garage into a dance studio. Now the living room is nice and quiet when I'm watching television!" he says.

Jack helped his wife and daughter by:`,
          options: ['moving to a larger house.', 'letting them use the living room for dancing.', 'making a place for them to practise in.'],
          answer: 'making a place for them to practise in.',
          explanationVi: 'Jack nói "I made the garage into a dance studio" (Biến garage thành phòng tập = tạo nơi để tập).',
          strategyVi: 'Đọc cẩn thận hành động cụ thể: made garage into studio = making a place.'
        },
        {
          id: 'k1_3_4',
          partNumber: 3,
          taskTypeVi: 'Đọc hiểu',
          taskTypeEn: 'Multiple Choice',
          prompt: 'What was the best thing about the Swan Lake show for Demi?',
          options: ['It was her first show with the company.', 'All her family were there.', 'She was wearing a new dress.'],
          answer: 'All her family were there.',
          explanationVi: 'Alice, Hannah VÀ Jack đều đến xem: "even Jack was there, which made it very special for Demi".',
          strategyVi: 'Từ khóa "very special" gắn với "even Jack was there" = cả gia đình có mặt.'
        },
        {
          id: 'k1_3_5',
          partNumber: 3,
          taskTypeVi: 'Đọc hiểu',
          taskTypeEn: 'Multiple Choice',
          prompt: 'Hannah says that Demi',
          options: ['will be a star one day.', 'is her favourite granddaughter.', 'dances better than Alice did.'],
          answer: 'will be a star one day.',
          explanationVi: 'Hannah nói: "I think she has a great future!" (có tương lai tuyệt vời = sẽ là ngôi sao).',
          strategyVi: 'Paraphrase: "great future" = "will be a star one day".'
        }
      ]
    },
    {
      partNumber: 4,
      titleEn: 'Multiple-Choice Cloze',
      titleVi: 'Điền từ trắc nghiệm (Part 4)',
      instructionVi: 'Chọn từ đúng (A, B hoặc C) để điền vào chỗ trống.',
      questions: [
        {
          id: 'k1_4_1',
          partNumber: 4,
          taskTypeVi: 'Trắc nghiệm từ vựng',
          taskTypeEn: 'MC Cloze',
          prompt: 'William Perkin\n\nWilliam Perkin was born in London in 1838. As a child he had many hobbies... But it was the (19) _____ of chemistry that really interested him. At the age of 15, he went to college to study it.',
          options: ['class', 'subject', 'course'],
          answer: 'subject',
          explanationVi: 'Chemistry (hóa học) là một môn học (subject).',
          strategyVi: 'Collocation (kết hợp từ): chemistry, math, history đều là "subjects".'
        },
        {
          id: 'k1_4_2',
          partNumber: 4,
          taskTypeVi: 'Trắc nghiệm từ vựng',
          taskTypeEn: 'MC Cloze',
          prompt: 'While he was there, he was (20) _____ to make a medicine from coal. This didn\'t go well, but when he was working on the problem, he found a cheap way to make the colour purple.',
          options: ['thinking', 'trying', 'deciding'],
          answer: 'trying',
          explanationVi: '"try to make" = cố gắng làm gì đó. "This didn\'t go well" chứng tỏ anh ta đã thử làm.',
          strategyVi: 'Grammar + context: "trying to do something" là cấu trúc phổ biến chỉ sự nỗ lực.'
        },
        {
          id: 'k1_4_3',
          partNumber: 4,
          taskTypeVi: 'Trắc nghiệm từ vựng',
          taskTypeEn: 'MC Cloze',
          prompt: 'he found a cheap (21) _____ to make the colour purple.',
          options: ['way', 'path', 'plan'],
          answer: 'way',
          explanationVi: '"a cheap way to make" = cách rẻ tiền để làm. "way" đi với "to make".',
          strategyVi: 'Collocation: "a way to do something". "path" và "plan" không dùng với "cheap" + "to make".'
        },
        {
          id: 'k1_4_4',
          partNumber: 4,
          taskTypeVi: 'Trắc nghiệm từ vựng',
          taskTypeEn: 'MC Cloze',
          prompt: 'At that (22) _____ it was very expensive to make clothes in different colours.',
          options: ['day', 'time', 'hour'],
          answer: 'time',
          explanationVi: '"At that time" = vào thời điểm đó. Cụm từ cố định.',
          strategyVi: 'Fixed expression: "at that time" (NOT "at that day" hoặc "at that hour").'
        },
        {
          id: 'k1_4_5',
          partNumber: 4,
          taskTypeVi: 'Trắc nghiệm từ vựng',
          taskTypeEn: 'MC Cloze',
          prompt: 'Helped by his father and brother, William (23) _____ his own factory to make the colour.',
          options: ['brought', 'turned', 'opened'],
          answer: 'opened',
          explanationVi: '"open a factory" = mở/thành lập nhà máy.',
          strategyVi: 'Collocation: open a factory, start a business, build a company.'
        },
        {
          id: 'k1_4_6',
          partNumber: 4,
          taskTypeVi: 'Trắc nghiệm ngữ pháp',
          taskTypeEn: 'MC Cloze',
          prompt: 'It sold well, and soon purple clothes (24) _____ very popular in England and the rest of the world.',
          options: ['began', 'arrived', 'became'],
          answer: 'became',
          explanationVi: '"became popular" = trở nên phổ biến.',
          strategyVi: 'Linking verb: become + adjective (popular, famous, expensive).'
        }
      ]
    },
    {
      partNumber: 5,
      titleEn: 'Open Cloze',
      titleVi: 'Điền từ tự do (Part 5)',
      instructionVi: 'Viết MỘT TỪ vào mỗi chỗ trống. (Không có danh sách từ)',
      questions: [
        {
          id: 'k1_5_1',
          partNumber: 5,
          taskTypeVi: 'Điền từ tự do',
          taskTypeEn: 'Open Cloze',
          prompt: 'From: Maria  To: John\n\nI hope (0) _you_ are well. I\'m having a great holiday here in Thailand. Our hotel is very nice and there are a lot of good restaurants near it.\n\nYesterday morning, we went to (25) _____ lovely beach.',
          options: [],
          answer: 'a',
          explanationVi: '"went to a lovely beach" (đến MỘT bãi biển đẹp). Dùng mạo từ không xác định "a".',
          strategyVi: 'Ngữ pháp: mạo từ a/an/the. Lần đầu nhắc đến danh từ đếm được số ít dùng "a".'
        },
        {
          id: 'k1_5_2',
          partNumber: 5,
          taskTypeVi: 'Điền từ tự do',
          taskTypeEn: 'Open Cloze',
          prompt: 'We had to leave before lunch because it was very hot. We went to a party (26) _____ the evening in the centre of the town.',
          options: [],
          answer: 'in',
          explanationVi: '"in the evening" (vào buổi tối) là cụm giới từ chỉ thời gian cố định.',
          strategyVi: 'Giới từ thời gian: IN the morning/afternoon/evening. ON Monday/Friday. AT night/noon.'
        },
        {
          id: 'k1_5_3',
          partNumber: 5,
          taskTypeVi: 'Điền từ tự do',
          taskTypeEn: 'Open Cloze',
          prompt: 'We went to a party in the evening in the centre (27) _____ the town.',
          options: [],
          answer: 'of',
          explanationVi: '"the centre of the town" = trung tâm CỦA thị trấn.',
          strategyVi: 'Giới từ chỉ sự sở hữu hoặc một phần của tổng thể: the middle OF, the top OF, the centre OF.'
        },
        {
          id: 'k1_5_4',
          partNumber: 5,
          taskTypeVi: 'Điền từ tự do',
          taskTypeEn: 'Open Cloze',
          prompt: 'Tomorrow, we want to (28) _____ on a boat trip or play tennis.',
          options: [],
          answer: 'go',
          explanationVi: '"go on a boat trip" = đi dạo trên thuyền. Cụm động từ cố định (collocation).',
          strategyVi: 'Collocation: go on a trip, go on holiday, go for a walk.'
        },
        {
          id: 'k1_5_5',
          partNumber: 5,
          taskTypeVi: 'Điền từ tự do',
          taskTypeEn: 'Open Cloze',
          prompt: 'Tomorrow, we want to go on a boat trip or (29) _____ tennis.',
          options: [],
          answer: 'play',
          explanationVi: '"play tennis" = chơi tennis. Cụm động từ cố định.',
          strategyVi: 'Collocation: play + sport (play football, play tennis, play basketball).'
        },
        {
          id: 'k1_5_6',
          partNumber: 5,
          taskTypeVi: 'Điền từ tự do',
          taskTypeEn: 'Open Cloze',
          prompt: 'I\'ll show you my photos (30) _____ I get back. See you soon, Maria.',
          options: [],
          answer: 'when',
          explanationVi: '"when I get back" = khi tôi trở về.',
          strategyVi: 'Liên từ chỉ thời gian: when (khi), after (sau khi), before (trước khi).'
        }
      ]
    }
  ]
};
