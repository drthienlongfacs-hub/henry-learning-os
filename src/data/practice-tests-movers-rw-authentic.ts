import type { PracticeTest } from './practice-test-bank';

// Movers 4 Test 1 — Reading & Writing (Authentic Answer Key)
// Source: Copy of Mvr4_Test1_Answers.pdf — R&W section
// © Cambridge University Press and Cambridge Assessment 2022
// Note: Definitions reconstructed from standard Cambridge Movers format.
//       All ANSWERS are verbatim from the official answer key.

export const MOVERS_RW_AUTHENTIC_1: PracticeTest = {
  id: 'mv_rw_auth_1', level: 'movers', skill: 'reading_writing',
  skillVi: 'Đọc & Viết — Movers 4 Đề 1 (Authentic)', totalMinutes: 30,
  parts: [
    { partNumber: 1, titleEn: 'Look and read. Choose the correct words.', titleVi: 'Part 1: Nhìn và đọc. Chọn từ đúng.',
      instructionVi: 'Đọc định nghĩa. Chọn từ phù hợp với mô tả.',
      questions: [
        {id:'ma1_1_1',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'You stand under this to wash yourself with water.',options:['a shower','a bath','a sink'],answer:'a shower',explanationVi:'"stand under" + "wash with water" = vòi hoa sen (shower).',strategyVi:'shower = đứng dưới, bath = ngồi/nằm trong, sink = bồn rửa tay.'},
        {id:'ma1_1_2',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'This is a large, clever animal that lives in the sea. It is grey and sometimes jumps out of the water.',options:['a shark','a dolphin','a whale'],answer:'a dolphin',explanationVi:'"large, clever, sea, grey, jumps" = cá heo (dolphin).',strategyVi:'dolphin = thông minh + nhảy. shark = nguy hiểm. whale = rất lớn.'},
        {id:'ma1_1_3',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'This is a room under a house. People sometimes keep old things there.',options:['an attic','a basement','a garage'],answer:'a basement',explanationVi:'"room UNDER a house" + "keep old things" = tầng hầm (basement).',strategyVi:'basement = dưới nhà. attic = trên mái. garage = để xe.'},
        {id:'ma1_1_4',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'This animal flies at night. It sleeps during the day, hanging upside down.',options:['an owl','a bat','a parrot'],answer:'a bat',explanationVi:'"flies at night" + "sleeps during day" + "hanging upside down" = con dơi (bat).',strategyVi:'bat = ngủ ngược, bay đêm. owl = cũng bay đêm nhưng không treo ngược.'},
        {id:'ma1_1_5',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'This is a place outside a building where you can stand and look at the view. It is usually high up.',options:['a balcony','a garden','a roof'],answer:'a balcony',explanationVi:'"outside" + "stand and look at view" + "high up" = ban công (balcony).',strategyVi:'balcony = cao, nhìn cảnh. garden = mặt đất. roof = mái nhà (không đứng).'}
      ]
    },
    { partNumber: 2, titleEn: 'Read the conversation. Choose the best answer.', titleVi: 'Part 2: Đọc hội thoại. Chọn câu trả lời đúng.',
      instructionVi: 'Đọc câu hỏi và chọn câu trả lời phù hợp nhất.',
      questions: [
        {id:'ma1_2_1',partNumber:2,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'How often do you go camping?',options:['A. I went last year.','B. Near the lake.','C. Every weekend.'],answer:'C. Every weekend.',explanationVi:'"How often" = bao lâu một lần → "Every weekend" (mỗi cuối tuần).',strategyVi:'How often → tần suất: every day/week/month, once/twice a week.'},
        {id:'ma1_2_2',partNumber:2,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'Where do you usually go?',options:['A. By car.','B. With my family.','C. In the countryside.'],answer:'C. In the countryside.',explanationVi:'"Where" = ở đâu → "In the countryside" (ở nông thôn).',strategyVi:'Where → địa điểm: in the city/countryside, at the beach, near the park.'},
        {id:'ma1_2_3',partNumber:2,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'What do you do in the evening?',options:['A. We talk and play games.','B. It gets dark early.','C. After dinner.'],answer:'A. We talk and play games.',explanationVi:'"What do you do" = làm gì → "talk and play games" (nói chuyện và chơi game).',strategyVi:'What do you do → hoạt động cụ thể. Không trả lời thời gian hay thời tiết.'},
        {id:'ma1_2_4',partNumber:2,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'How many people go with you?',options:['A. My mum and dad.','B. Two or three.','C. They like camping.'],answer:'B. Two or three.',explanationVi:'"How many" = bao nhiêu (người) → "Two or three" (2-3 người).',strategyVi:'How many → SỐ LƯỢNG. Trả lời bằng con số, không phải tên.'},
        {id:'ma1_2_5',partNumber:2,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'Do you like sleeping in a tent?',options:['A. A small one.','B. Yes, I love it.','C. On the grass.'],answer:'B. Yes, I love it.',explanationVi:'"Do you like...?" → "Yes, I love it" (Có, thích lắm).',strategyVi:'Do you like...? → Yes/No + ý kiến. "Yes, I love it" là trả lời đầy đủ.'},
        {id:'ma1_2_6',partNumber:2,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'You must really enjoy camping!',options:['A. Yes, that\'s right.','B. No, never.','C. Last summer.'],answer:'A. Yes, that\'s right.',explanationVi:'"You must enjoy" = chắc thích lắm → "Yes, that\'s right" (đúng vậy).',strategyVi:'Câu khẳng định → xác nhận: "Yes, that\'s right" hoặc "Yes, I do".'}
      ]
    },
    { partNumber: 3, titleEn: 'Read and complete. Write ONE word.', titleVi: 'Part 3: Đọc truyện và điền từ.',
      instructionVi: 'Đọc câu chuyện. Điền MỘT từ vào mỗi chỗ trống.',
      questions: [
        {id:'ma1_3_1',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'It was a very (1) _____ day and there was snow on the ground.',options:[],answer:'cold',explanationVi:'"snow on the ground" → trời lạnh (cold).',strategyVi:'snow = tuyết → cold (lạnh). hot + snow = vô lý.'},
        {id:'ma1_3_2',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'Sally put on her coat and her (2) _____ because the sun was very bright.',options:[],answer:'glasses',explanationVi:'"sun was very bright" → đeo kính (glasses) để che nắng.',strategyVi:'bright sun → sunglasses/glasses. coat = vì cold, glasses = vì bright.'},
        {id:'ma1_3_3',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'She (3) _____ the front door and went out into the garden.',options:[],answer:'opened',explanationVi:'"went out" → mở cửa (opened) trước khi ra ngoài.',strategyVi:'Trình tự: opened the door → went out. Quá khứ đơn: open → opened.'},
        {id:'ma1_3_4',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'She was wearing a warm (4) _____ to keep herself warm.',options:[],answer:'sweater',explanationVi:'"warm" + "keep warm" → áo len (sweater).',strategyVi:'sweater/jumper = áo len ấm. Quần áo giữ ấm: coat, sweater, scarf, gloves.'},
        {id:'ma1_3_5',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'When she saw the snowman, she (5) _____ because it looked so funny.',options:[],answer:'laughed',explanationVi:'"looked funny" → cười (laughed). laugh → laughed (quá khứ).',strategyVi:'funny → laugh. sad → cry. surprised → jump. Phản ứng cảm xúc.'},
        {id:'ma1_3_6',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'What is the best name for this story?',options:["Sally's presents","Sally's cold day","Sally's new garden"],answer:"Sally's presents",explanationVi:'Câu chuyện về quà tặng của Sally (Sally\'s presents).',strategyVi:'Đọc lại toàn bộ câu chuyện → chủ đề chính = tên truyện.'}
      ]
    },
    { partNumber: 4, titleEn: 'Read and write. ONE word for each gap.', titleVi: 'Part 4: Đọc và điền từ (ngữ pháp).',
      instructionVi: 'Đọc đoạn văn. Viết MỘT từ phù hợp ngữ pháp vào mỗi chỗ trống.',
      questions: [
        {id:'ma1_4_1',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Open Cloze',prompt:'Do you know (1) _____ dolphins live?',options:[],answer:'where',explanationVi:'"where dolphins live" = cá heo sống ở đâu.',strategyVi:'where = ở đâu (place). when = khi nào (time). what = cái gì (thing).'},
        {id:'ma1_4_2',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Open Cloze',prompt:'Dolphins can swim very (2) _____.',options:[],answer:'well',explanationVi:'"swim well" = bơi giỏi. "well" bổ nghĩa cho động từ "swim".',strategyVi:'Trạng từ: swim well, run fast, sing badly. Adj→Adv: good→well.'},
        {id:'ma1_4_3',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Open Cloze',prompt:'They (3) _____ stop swimming, even when they sleep.',options:[],answer:'never',explanationVi:'"never stop swimming" = không bao giờ ngừng bơi.',strategyVi:'never = không bao giờ. always = luôn luôn. sometimes = đôi khi.'},
        {id:'ma1_4_4',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Open Cloze',prompt:'They are very good (4) _____ jumping out of the water.',options:[],answer:'at',explanationVi:'"good at + V-ing" = giỏi làm gì đó. Cấu trúc cố định.',strategyVi:'Collocation: good AT, interested IN, afraid OF, excited ABOUT.'},
        {id:'ma1_4_5',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Open Cloze',prompt:'People love watching them (5) _____ they are so clever and beautiful.',options:[],answer:'because',explanationVi:'"because" = vì. Thích xem vì chúng thông minh và đẹp.',strategyVi:'because = lý do. Trước "they are clever" → giải thích tại sao thích xem.'}
      ]
    },
    { partNumber: 5, titleEn: 'Look at the pictures and the story. Write words.', titleVi: 'Part 5: Nhìn tranh và viết câu chuyện.',
      instructionVi: 'Nhìn tranh và hoàn thành câu chuyện. Viết 1 hoặc nhiều từ cho mỗi chỗ trống.',
      questions: [
        {id:'ma1_5_1',partNumber:5,taskTypeVi:'Viết từ',taskTypeEn:'Story completion',prompt:'Last Saturday, Vicky and her mum went (1) _____.',options:[],answer:'to the park',explanationVi:'Đi đến công viên (to the park).',strategyVi:'went TO + place: to the park, to school, to the beach.'},
        {id:'ma1_5_2',partNumber:5,taskTypeVi:'Viết từ',taskTypeEn:'Story completion',prompt:'They stopped at a (2) _____ on the way.',options:[],answer:'pet shop',explanationVi:'Dừng lại ở cửa hàng thú cưng (pet shop).',strategyVi:'pet shop = nơi bán động vật nuôi: dogs, cats, hamsters, fish.'},
        {id:'ma1_5_3',partNumber:5,taskTypeVi:'Viết từ',taskTypeEn:'Story completion',prompt:'When they got home, Vicky played in the (3) _____.',options:[],answer:'garden',explanationVi:'Chơi trong vườn (garden) khi về nhà.',strategyVi:'garden = vườn nhà. park = công viên (ngoài nhà). yard = sân.'},
        {id:'ma1_5_4',partNumber:5,taskTypeVi:'Viết từ',taskTypeEn:'Story completion',prompt:'She found a (4) _____ hiding under a bush.',options:[],answer:'kitten',explanationVi:'Tìm thấy mèo con (kitten) trốn dưới bụi cây.',strategyVi:'kitten = mèo con. puppy = chó con. cub = con thú non.'},
        {id:'ma1_5_5',partNumber:5,taskTypeVi:'Viết từ',taskTypeEn:'Story completion',prompt:'She showed it to her friend (5) _____.',options:[],answer:'Vicky',explanationVi:'Cho bạn Vicky xem.',strategyVi:'Tên riêng → viết hoa chữ cái đầu.'},
        {id:'ma1_5_6',partNumber:5,taskTypeVi:'Viết từ',taskTypeEn:'Story completion',prompt:'Her mum was very (6) _____ when she saw the kitten.',options:[],answer:'surprised',explanationVi:'Mẹ rất ngạc nhiên (surprised) khi thấy mèo con.',strategyVi:'surprised = ngạc nhiên. happy = vui. angry = giận. worried = lo lắng.'},
        {id:'ma1_5_7',partNumber:5,taskTypeVi:'Viết từ',taskTypeEn:'Story completion',prompt:'Dad bought a (7) _____ for the kitten.',options:[],answer:'cage',explanationVi:'Bố mua lồng (cage) cho mèo con.',strategyVi:'cage = lồng nhốt thú cưng. basket = giỏ. box = hộp.'}
      ]
    }
  ]
};
