import type { PracticeTest } from './practice-test-bank';

// Movers 4 Test 2 — R&W (Authentic Answer Key)
// Source: Mvr4_Test2_Answers.pdf — R&W section
// © Cambridge University Press and Cambridge Assessment 2022

export const MOVERS_RW_AUTHENTIC_2: PracticeTest = {
  id: 'mv_rw_auth_2', level: 'movers', skill: 'reading_writing',
  skillVi: 'Đọc & Viết — Movers 4 Đề 2 (Authentic)', totalMinutes: 30,
  parts: [
    { partNumber: 1, titleEn: 'Look and read. Choose the correct words.', titleVi: 'Part 1: Chọn từ đúng.',
      instructionVi: 'Đọc định nghĩa. Chọn từ phù hợp.',
      questions: [
        {id:'ma2_1_1',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'You put this around your neck when the weather is cold.',options:['a scarf','a belt','a hat'],answer:'a scarf',explanationVi:'"around your neck" + "cold weather" = khăn quàng cổ (scarf).',strategyVi:'neck = cổ → scarf. head = hat. waist = belt.'},
        {id:'ma2_1_2',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'You use this to catch fish or hit a ball over it in a game like tennis.',options:['a bat','a net','a racket'],answer:'a net',explanationVi:'"catch fish" hoặc "hit ball over it" = lưới (net).',strategyVi:'net = lưới (cả đánh cá lẫn thể thao). racket = vợt.'},
        {id:'ma2_1_3',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'This is a place where people go to have drinks and something to eat. It is smaller than a restaurant.',options:['a café','a hotel','a market'],answer:'a café',explanationVi:'"drinks and something to eat" + "smaller than restaurant" = quán cà phê (café).',strategyVi:'café < restaurant. hotel = khách sạn. market = chợ.'},
        {id:'ma2_1_4',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'You stand under this to wash yourself with water. It is in the bathroom.',options:['a shower','a bath','a pool'],answer:'a shower',explanationVi:'"stand under" + "wash with water" + "bathroom" = vòi hoa sen (shower).',strategyVi:'shower = đứng. bath = ngồi/nằm.'},
        {id:'ma2_1_5',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'You put these on your feet and use them to move quickly on a smooth floor.',options:['roller skates','boots','sandals'],answer:'roller skates',explanationVi:'"on feet" + "move quickly" + "smooth floor" = giày patin (roller skates).',strategyVi:'roller skates = có bánh xe, trượt trên sàn nhẵn.'}
      ]
    },
    { partNumber: 2, titleEn: 'Read the conversation.', titleVi: 'Part 2: Chọn câu trả lời.',
      instructionVi: 'Đọc câu hỏi và chọn câu trả lời phù hợp nhất.',
      questions: [
        {id:'ma2_2_1',partNumber:2,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'Do you like your new school?',options:['A. Yes, I love it there.','B. It starts at nine.','C. On the bus.'],answer:'A. Yes, I love it there.',explanationVi:'"Do you like...?" → "Yes, I love it" (Có, thích lắm).',strategyVi:'Do you like? → Yes/No + ý kiến.'},
        {id:'ma2_2_2',partNumber:2,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'I really like playing football.',options:['A. I\'ve got two.','B. That sounds boring.','C. Me too.'],answer:'C. Me too.',explanationVi:'"I like..." → "Me too" (Tôi cũng vậy) là phản hồi tự nhiên.',strategyVi:'Me too = đồng tình. Là phản hồi phổ biến.'},
        {id:'ma2_2_3',partNumber:2,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'Which days do you have swimming lessons?',options:['A. In the pool.','B. Monday and Friday.','C. Yes, every week.'],answer:'B. Monday and Friday.',explanationVi:'"Which days" = ngày nào → "Monday and Friday".',strategyVi:'Which days → tên ngày cụ thể.'},
        {id:'ma2_2_4',partNumber:2,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'Are you good at tennis?',options:['A. I\'m better at hockey.','B. It\'s on Tuesday.','C. I\'ve got a new racket.'],answer:'A. I\'m better at hockey.',explanationVi:'"Are you good at?" → trả lời về khả năng: "I\'m better at hockey" (giỏi hockey hơn).',strategyVi:'Are you good at X? → So sánh: better at Y.'},
        {id:'ma2_2_5',partNumber:2,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'When did you learn to ride a bike?',options:['A. In the park.','B. Every day.','C. I was very young.'],answer:'C. I was very young.',explanationVi:'"When" = khi nào → "I was very young" (lúc rất nhỏ).',strategyVi:'When → thời điểm/thời gian.'},
        {id:'ma2_2_6',partNumber:2,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'Would you like to come to my party?',options:['A. Yes, it was fun.','B. I\'m sorry, I can\'t.','C. At the weekend.'],answer:'B. I\'m sorry, I can\'t.',explanationVi:'"Would you like to...?" → "I\'m sorry, I can\'t" (Xin lỗi, mình không thể).',strategyVi:'Would you like to...? → Yes, I\'d love to / I\'m sorry, I can\'t.'}
      ]
    },
    { partNumber: 3, titleEn: 'Read and complete.', titleVi: 'Part 3: Điền từ vào truyện.',
      instructionVi: 'Đọc câu chuyện. Điền MỘT từ vào mỗi chỗ trống.',
      questions: [
        {id:'ma2_3_1',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'Everyone (1) _____ when the music stopped.',options:[],answer:'clapped',explanationVi:'Mọi người vỗ tay (clapped) khi nhạc dừng.',strategyVi:'clap → clapped (quá khứ). Vỗ tay khi nhạc kết thúc.'},
        {id:'ma2_3_2',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'She made sandwiches with (2) _____ and tomato.',options:[],answer:'cheese',explanationVi:'Sandwich với phô mai (cheese) và cà chua.',strategyVi:'Sandwich = bánh mì kẹp. Nhân phổ biến: cheese, ham, egg.'},
        {id:'ma2_3_3',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'She poured some juice into a (3) _____.',options:[],answer:'cup',explanationVi:'Rót nước trái cây vào cốc (cup).',strategyVi:'pour into → cup/glass/bowl.'},
        {id:'ma2_3_4',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'She (4) _____ the tray carefully to the table.',options:[],answer:'carried',explanationVi:'Cô bé bê (carried) khay đến bàn cẩn thận.',strategyVi:'carried = bê/mang. Quá khứ của carry.'},
        {id:'ma2_3_5',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'Then she gave her mum a nice (5) _____.',options:[],answer:'present',explanationVi:'Tặng mẹ một món quà (present).',strategyVi:'gave + present/gift.'},
        {id:'ma2_3_6',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'What is the best name for this story?',options:['A happy morning for Mum!','A new friend','A day at school'],answer:'A happy morning for Mum!',explanationVi:'Câu chuyện về buổi sáng vui vẻ cho mẹ.',strategyVi:'Đọc toàn bộ → chọn tiêu đề phù hợp nội dung.'}
      ]
    },
    { partNumber: 4, titleEn: 'Read and write.', titleVi: 'Part 4: Điền từ ngữ pháp.',
      instructionVi: 'Viết MỘT từ phù hợp vào mỗi chỗ trống.',
      questions: [
        {id:'ma2_4_1',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Open Cloze',prompt:'Penguins (1) _____ in very cold places.',options:[],answer:'live',explanationVi:'Chim cánh cụt sống (live) ở nơi rất lạnh.',strategyVi:'Chủ ngữ số nhiều (Penguins) + hiện tại: live.'},
        {id:'ma2_4_2',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Open Cloze',prompt:'(2) _____ can stop them from getting cold.',options:[],answer:'Nothing',explanationVi:'Không gì (Nothing) ngăn được chúng bị lạnh.',strategyVi:'Nothing = không gì cả. Đầu câu → viết hoa.'},
        {id:'ma2_4_3',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Open Cloze',prompt:'A penguin (3) _____ two short legs.',options:[],answer:'has',explanationVi:'Một con cánh cụt có (has) hai chân ngắn.',strategyVi:'A penguin (số ít) → has (không phải have).'},
        {id:'ma2_4_4',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Open Cloze',prompt:'Some penguins are very (4) _____.',options:[],answer:'tall',explanationVi:'Một số loài chim cánh cụt rất cao (tall).',strategyVi:'very + tính từ: tall, big, small.'},
        {id:'ma2_4_5',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Open Cloze',prompt:'They eat fish (5) _____ they catch in the sea.',options:[],answer:'who',explanationVi:'"fish who/that they catch" = cá mà chúng bắt.',strategyVi:'Đại từ quan hệ: who/that/which.'}
      ]
    }
  ]
};

// Movers 4 Test 3 — R&W (Authentic Answer Key)
// Source: Mvr4_Test3_Answers.pdf — R&W section

export const MOVERS_RW_AUTHENTIC_3: PracticeTest = {
  id: 'mv_rw_auth_3', level: 'movers', skill: 'reading_writing',
  skillVi: 'Đọc & Viết — Movers 4 Đề 3 (Authentic)', totalMinutes: 30,
  parts: [
    { partNumber: 1, titleEn: 'Look and read.', titleVi: 'Part 1: Chọn từ đúng.',
      instructionVi: 'Đọc định nghĩa. Chọn từ phù hợp.',
      questions: [
        {id:'ma3_1_1',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'These are the hard white things in your mouth that you use to eat food.',options:['teeth','lips','ears'],answer:'teeth',explanationVi:'"hard white things in mouth" + "eat food" = răng (teeth).',strategyVi:'teeth = răng. lips = môi. ears = tai.'},
        {id:'ma3_1_2',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'This is a big shop where you can buy food and other things for your home.',options:['a supermarket','a restaurant','a cinema'],answer:'a supermarket',explanationVi:'"big shop" + "buy food" = siêu thị (supermarket).',strategyVi:'supermarket = mua đồ. restaurant = ăn uống.'},
        {id:'ma3_1_3',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'This is the place where you go to get on a train.',options:['a station','an airport','a bus stop'],answer:'a station',explanationVi:'"get on a train" = nhà ga (station).',strategyVi:'station = tàu hỏa. airport = máy bay.'},
        {id:'ma3_1_4',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'These are the parts of your body between your neck and your arms.',options:['shoulders','knees','elbows'],answer:'shoulders',explanationVi:'"between neck and arms" = vai (shoulders).',strategyVi:'shoulders = vai. knees = đầu gối.'},
        {id:'ma3_1_5',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'Men sometimes have these on their faces. They are made of hair.',options:['beards','glasses','hats'],answer:'beards',explanationVi:'"men" + "faces" + "made of hair" = râu (beards).',strategyVi:'beards = râu. moustache = ria mép.'}
      ]
    },
    { partNumber: 2, titleEn: 'Read the conversation.', titleVi: 'Part 2: Chọn câu trả lời.',
      instructionVi: 'Chọn câu trả lời phù hợp nhất.',
      questions: [
        {id:'ma3_2_1',partNumber:2,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'Where is your new house?',options:['A. Near the park.','B. It\'s quite big.','C. Last month.'],answer:'A. Near the park.',explanationVi:'"Where" → "Near the park" (gần công viên).',strategyVi:'Where → địa điểm.'},
        {id:'ma3_2_2',partNumber:2,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'Do you walk to school?',options:['A. It\'s not far.','B. At half past eight.','C. No, I take the bus.'],answer:'C. No, I take the bus.',explanationVi:'"Do you walk?" → "No, I take the bus" (Không, đi xe buýt).',strategyVi:'Do you + V? → Yes/No + phương tiện thay thế.'},
        {id:'ma3_2_3',partNumber:2,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'When do you see your friends?',options:['A. At the weekend.','B. In the park.','C. They\'re very nice.'],answer:'A. At the weekend.',explanationVi:'"When" → "At the weekend" (cuối tuần).',strategyVi:'When → thời gian.'},
        {id:'ma3_2_4',partNumber:2,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'What\'s your bedroom like?',options:['A. I share it.','B. On the second floor.','C. It\'s bigger than my old one.'],answer:'C. It\'s bigger than my old one.',explanationVi:'"What\'s X like?" = X thế nào → mô tả: "bigger than my old one".',strategyVi:'What\'s it like? → mô tả tính chất/đặc điểm.'},
        {id:'ma3_2_5',partNumber:2,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'Have you got a computer?',options:['A. I like games.','B. Yes, it\'s on my desk.','C. It\'s very old.'],answer:'B. Yes, it\'s on my desk.',explanationVi:'"Have you got?" → "Yes, it\'s on my desk" (Có, ở trên bàn).',strategyVi:'Have you got? → Yes + thông tin bổ sung.'},
        {id:'ma3_2_6',partNumber:2,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'Would you like to come and play at my house?',options:['A. I\'d love to.','B. It was great.','C. Not very far.'],answer:'A. I\'d love to.',explanationVi:'"Would you like to?" → "I\'d love to" (Rất muốn).',strategyVi:'Would you like to? → I\'d love to / I\'m sorry, I can\'t.'}
      ]
    },
    { partNumber: 3, titleEn: 'Read and complete.', titleVi: 'Part 3: Điền từ.',
      instructionVi: 'Điền MỘT từ vào mỗi chỗ trống.',
      questions: [
        {id:'ma3_3_1',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'It was Mum\'s birthday and Jim wanted to give her a (1) _____.',options:[],answer:'present',explanationVi:'Sinh nhật mẹ → muốn tặng quà (present).',strategyVi:'birthday + give → present/gift.'},
        {id:'ma3_3_2',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'He decided to (2) _____ her favourite cake.',options:[],answer:'cook',explanationVi:'Quyết định nấu/làm (cook) bánh yêu thích của mẹ.',strategyVi:'cook/make/bake a cake.'},
        {id:'ma3_3_3',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'He put lots of (3) _____ on top.',options:[],answer:'chocolate',explanationVi:'Để nhiều sô cô la (chocolate) lên trên.',strategyVi:'chocolate = topping phổ biến cho cake.'},
        {id:'ma3_3_4',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'He put the milk into a (4) _____.',options:[],answer:'bottle',explanationVi:'Đổ sữa vào chai (bottle).',strategyVi:'put milk into → bottle/jug/glass.'},
        {id:'ma3_3_5',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'When Mum saw it, she (5) _____ because she was so happy.',options:[],answer:'laughed',explanationVi:'Mẹ cười (laughed) vì vui.',strategyVi:'happy → laughed/smiled.'},
        {id:'ma3_3_6',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'Best name for this story?',options:["Mum's birthday present","A day at school","Jim's new friend"],answer:"Mum's birthday present",explanationVi:'Câu chuyện về quà sinh nhật mẹ.',strategyVi:'Chọn tiêu đề khớp nội dung chính.'}
      ]
    },
    { partNumber: 4, titleEn: 'Read and write.', titleVi: 'Part 4: Điền từ ngữ pháp.',
      instructionVi: 'Viết MỘT từ vào mỗi chỗ trống.',
      questions: [
        {id:'ma3_4_1',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Open Cloze',prompt:'Elephants are bigger (1) _____ most animals.',options:[],answer:'than',explanationVi:'"bigger than" = lớn hơn. So sánh hơn.',strategyVi:'comparative + than: bigger than, faster than.'},
        {id:'ma3_4_2',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Open Cloze',prompt:'People come from all over the world to see (2) _____ amazing animals.',options:[],answer:'that',explanationVi:'"see that/those/these" = xem những con vật tuyệt vời đó.',strategyVi:'Đại từ chỉ định: that/those (xa), this/these (gần).'},
        {id:'ma3_4_3',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Open Cloze',prompt:'Baby elephants (3) _____ stay close to their mothers.',options:[],answer:'sometimes',explanationVi:'"sometimes stay close" = đôi khi ở gần mẹ.',strategyVi:'Trạng từ tần suất: always, sometimes, never.'},
        {id:'ma3_4_4',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Open Cloze',prompt:'Elephants are very good (4) _____ swimming.',options:[],answer:'at',explanationVi:'"good at swimming" = giỏi bơi.',strategyVi:'good AT + V-ing = collocation cố định.'},
        {id:'ma3_4_5',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Open Cloze',prompt:'What (5) _____ elephants eat?',options:[],answer:'do',explanationVi:'"What do elephants eat?" = Voi ăn gì?',strategyVi:'Trợ động từ cho câu hỏi: do/does.'}
      ]
    }
  ]
};
