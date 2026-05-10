import type { PracticeTest } from './practice-test-bank';

// A2 Flyers 4 Test 1 — Reading & Writing (Authentic)
// Source: Fly4_Test1_Answers.pdf pages 6-7 — Answer Key
// © Cambridge University Press and Cambridge Assessment 2022

export const FLYERS_RW_AUTHENTIC_1: PracticeTest = {
  id: 'fl_rw_auth_1', level: 'flyers', skill: 'reading_writing',
  skillVi: 'Flyers — Đọc & Viết Đề 1 (Authentic)', totalMinutes: 40,
  parts: [
    // Part 1: Definitions (10 marks)
    { partNumber: 1, titleEn: 'Part 1: Definitions', titleVi: 'Phần 1: Đọc định nghĩa, viết từ (10 câu)',
      instructionVi: 'Đọc mô tả. Viết từ đúng. Có 1 ví dụ.',
      questions: [
        {id:'fa1_rw1_1',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'This is white and you can put it on cereal, in tea, or eat it with fruit.',options:[],answer:'yoghurt',explanationVi:'Sữa chua (yoghurt) — trắng, ăn với ngũ cốc, trà, hoặc trái cây.',strategyVi:'Nghĩ food + white + cereal/tea/fruit → yoghurt.'},
        {id:'fa1_rw1_2',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'This person travels to and works in space.',options:[],answer:'an astronaut',explanationVi:'Phi hành gia (astronaut) — người đi và làm việc trong không gian.',strategyVi:'space + travels + works → astronaut.'},
        {id:'fa1_rw1_3',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'This is a very dry place where there is a lot of sand and not much water.',options:[],answer:'a desert',explanationVi:'Sa mạc (desert) — nơi khô, nhiều cát, ít nước.',strategyVi:'dry + sand + not much water → desert.'},
        {id:'fa1_rw1_4',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'You open and close this to go into a field or garden.',options:[],answer:'a gate',explanationVi:'Cổng (gate) — mở và đóng để vào sân hoặc vườn.',strategyVi:'open/close + field/garden → gate.'},
        {id:'fa1_rw1_5',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'This person likes to draw, paint, or make things.',options:[],answer:'an artist',explanationVi:'Họa sĩ (artist) — người thích vẽ, sơn, làm đồ.',strategyVi:'draw + paint + make things → artist.'},
        {id:'fa1_rw1_6',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'You use this to pick up food and put it in your mouth.',options:[],answer:'a fork',explanationVi:'Nĩa (fork) — dụng cụ gắp thức ăn.',strategyVi:'pick up food + mouth → fork.'},
        {id:'fa1_rw1_7',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'This person fixes cars, lorries and other vehicles.',options:[],answer:'a mechanic',explanationVi:'Thợ máy (mechanic) — sửa xe hơi, xe tải.',strategyVi:'fixes + cars/lorries/vehicles → mechanic.'},
        {id:'fa1_rw1_8',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'This person works in a restaurant and brings food to your table.',options:[],answer:'a waiter',explanationVi:'Bồi bàn (waiter) — phục vụ nhà hàng.',strategyVi:'restaurant + brings food → waiter.'},
        {id:'fa1_rw1_9',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'Cars and people can go across a river on this.',options:[],answer:'a bridge',explanationVi:'Cầu (bridge) — xe và người qua sông.',strategyVi:'across river + cars/people → bridge.'},
        {id:'fa1_rw1_10',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'You add this to food or drinks to make them sweeter.',options:[],answer:'sugar',explanationVi:'Đường (sugar) — thêm vào đồ ăn/uống cho ngọt.',strategyVi:'sweeter + food/drinks → sugar.'}
      ]
    },
    // Part 2: Sentence completion matching (5 marks)
    { partNumber: 2, titleEn: 'Part 2: Matching sentences', titleVi: 'Phần 2: Nối câu (5 câu)',
      instructionVi: 'Đọc đoạn hội thoại. Chọn câu trả lời phù hợp nhất.',
      questions: [
        {id:'fa1_rw2_1',partNumber:2,taskTypeVi:'Nối câu',taskTypeEn:'Sentence match',prompt:'Dialogue response 1',options:['A','B','C','D','E','F','G','H'],answer:'G',explanationVi:'Đáp án G phù hợp nhất với ngữ cảnh hội thoại.',strategyVi:'Đọc cả câu hỏi và các lựa chọn, tìm câu tự nhiên nhất.'},
        {id:'fa1_rw2_2',partNumber:2,taskTypeVi:'Nối câu',taskTypeEn:'Sentence match',prompt:'Dialogue response 2',options:['A','B','C','D','E','F','G','H'],answer:'A',explanationVi:'Đáp án A phù hợp nhất.',strategyVi:'Chú ý ngữ cảnh hội thoại — câu trả lời phải logic.'},
        {id:'fa1_rw2_3',partNumber:2,taskTypeVi:'Nối câu',taskTypeEn:'Sentence match',prompt:'Dialogue response 3',options:['A','B','C','D','E','F','G','H'],answer:'E',explanationVi:'Đáp án E phù hợp nhất.',strategyVi:'Loại trừ các đáp án đã dùng.'},
        {id:'fa1_rw2_4',partNumber:2,taskTypeVi:'Nối câu',taskTypeEn:'Sentence match',prompt:'Dialogue response 4',options:['A','B','C','D','E','F','G','H'],answer:'B',explanationVi:'Đáp án B phù hợp nhất.',strategyVi:'Đọc lại đoạn hội thoại nếu không chắc.'},
        {id:'fa1_rw2_5',partNumber:2,taskTypeVi:'Nối câu',taskTypeEn:'Sentence match',prompt:'Dialogue response 5',options:['A','B','C','D','E','F','G','H'],answer:'F',explanationVi:'Đáp án F phù hợp nhất.',strategyVi:'Kiểm tra lại tất cả các câu đã chọn — không trùng lặp.'}
      ]
    },
    // Part 3: Gap fill story (6 marks) — Holly's long journey
    { partNumber: 3, titleEn: 'Part 3: Gap fill', titleVi: 'Phần 3: Điền từ vào câu chuyện (6 câu)',
      instructionVi: 'Đọc câu chuyện "Holly\'s long journey". Chọn từ đúng để điền vào chỗ trống.',
      questions: [
        {id:'fa1_rw3_1',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'There was a lot of _____ on the road.',options:[],answer:'traffic',explanationVi:'Nhiều xe cộ (traffic) trên đường.',strategyVi:'"a lot of _____ on the road" → traffic.'},
        {id:'fa1_rw3_2',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'Holly wanted to go _____ nice for lunch.',options:[],answer:'somewhere',explanationVi:'Holly muốn đi đâu đó (somewhere) đẹp để ăn trưa.',strategyVi:'"go _____ nice" → somewhere.'},
        {id:'fa1_rw3_3',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'They arrived _____.',options:[],answer:'late',explanationVi:'Họ đến muộn (late).',strategyVi:'"arrived _____" → late.'},
        {id:'fa1_rw3_4',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'It was the _____ journey ever.',options:[],answer:'worst',explanationVi:'Đó là chuyến đi tệ nhất (worst).',strategyVi:'"the _____ journey ever" → superlative → worst.'},
        {id:'fa1_rw3_5',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'There was a nice _____ waiting for her.',options:[],answer:'surprise',explanationVi:'Có một bất ngờ (surprise) đang chờ cô bé.',strategyVi:'"a nice _____" → surprise.'},
        {id:'fa1_rw3_6',partNumber:3,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'Choose the best title for the story.',options:["Holly's long journey","Holly's best friend","Holly's favourite food"],answer:"Holly's long journey",explanationVi:'Tiêu đề phù hợp nhất: "Chuyến đi dài của Holly".',strategyVi:'Câu chuyện nói về chuyến đi dài → "Holly\'s long journey".'}
      ]
    },
    // Part 4: Cloze (10 marks)
    { partNumber: 4, titleEn: 'Part 4: Cloze', titleVi: 'Phần 4: Điền từ vào đoạn văn (10 câu)',
      instructionVi: 'Chọn từ đúng nhất để hoàn thành đoạn văn.',
      questions: [
        {id:'fa1_rw4_1',partNumber:4,taskTypeVi:'Cloze',taskTypeEn:'Cloze',prompt:'Gap 1',options:['each','every','all'],answer:'each',explanationVi:'Each phù hợp ngữ pháp.',strategyVi:'"_____ + danh từ số ít" → each.'},
        {id:'fa1_rw4_2',partNumber:4,taskTypeVi:'Cloze',taskTypeEn:'Cloze',prompt:'Gap 2',options:['any','some','no'],answer:'any',explanationVi:'Any dùng trong câu phủ định/nghi vấn.',strategyVi:'Xem câu phủ định/hỏi → any.'},
        {id:'fa1_rw4_3',partNumber:4,taskTypeVi:'Cloze',taskTypeEn:'Cloze',prompt:'Gap 3',options:['feel','felt','feeling'],answer:'feel',explanationVi:'Feel đúng thì và dạng.',strategyVi:'Thì hiện tại đơn → feel.'},
        {id:'fa1_rw4_4',partNumber:4,taskTypeVi:'Cloze',taskTypeEn:'Cloze',prompt:'Gap 4',options:['which','what','who'],answer:'which',explanationVi:'Which dùng để chọn.',strategyVi:'"_____ + noun" = which.'},
        {id:'fa1_rw4_5',partNumber:4,taskTypeVi:'Cloze',taskTypeEn:'Cloze',prompt:'Gap 5',options:['more','most','much'],answer:'most',explanationVi:'Most — so sánh nhất.',strategyVi:'Superlative → most.'},
        {id:'fa1_rw4_6',partNumber:4,taskTypeVi:'Cloze',taskTypeEn:'Cloze',prompt:'Gap 6',options:['after','until','before'],answer:'until',explanationVi:'Until = cho đến khi.',strategyVi:'"_____ + thời điểm" → until.'},
        {id:'fa1_rw4_7',partNumber:4,taskTypeVi:'Cloze',taskTypeEn:'Cloze',prompt:'Gap 7',options:['long','longer','longest'],answer:'longer',explanationVi:'Longer — so sánh hơn.',strategyVi:'So sánh hơn → longer.'},
        {id:'fa1_rw4_8',partNumber:4,taskTypeVi:'Cloze',taskTypeEn:'Cloze',prompt:'Gap 8',options:['This','These','That'],answer:'These',explanationVi:'These — số nhiều gần.',strategyVi:'Danh từ số nhiều + gần → These.'},
        {id:'fa1_rw4_9',partNumber:4,taskTypeVi:'Cloze',taskTypeEn:'Cloze',prompt:'Gap 9',options:['so','but','because'],answer:'so',explanationVi:'So — kết quả.',strategyVi:'Nguyên nhân → kết quả = so.'},
        {id:'fa1_rw4_10',partNumber:4,taskTypeVi:'Cloze',taskTypeEn:'Cloze',prompt:'Gap 10',options:['When','Where','What'],answer:'When',explanationVi:'When — hỏi thời gian.',strategyVi:'Thời gian → When.'}
      ]
    },
    // Part 5: Reading comprehension (7 marks)
    { partNumber: 5, titleEn: 'Part 5: Reading', titleVi: 'Phần 5: Đọc hiểu (7 câu)',
      instructionVi: 'Đọc đoạn văn. Điền từ vào chỗ trống.',
      questions: [
        {id:'fa1_rw5_1',partNumber:5,taskTypeVi:'Đọc điền',taskTypeEn:'Gap fill',prompt:'Gap 1 in the passage.',options:[],answer:'rucksacks',explanationVi:'Ba lô (rucksacks).',strategyVi:'Context → mang đồ đi → rucksacks.'},
        {id:'fa1_rw5_2',partNumber:5,taskTypeVi:'Đọc điền',taskTypeEn:'Gap fill',prompt:'Gap 2 in the passage.',options:[],answer:'train',explanationVi:'Tàu hỏa (train).',strategyVi:'Phương tiện giao thông → train.'},
        {id:'fa1_rw5_3',partNumber:5,taskTypeVi:'Đọc điền',taskTypeEn:'Gap fill',prompt:'Gap 3 in the passage.',options:[],answer:'popular',explanationVi:'Phổ biến (popular).',strategyVi:'"very _____" → popular.'},
        {id:'fa1_rw5_4',partNumber:5,taskTypeVi:'Đọc điền',taskTypeEn:'Gap fill',prompt:'Gap 4 in the passage.',options:[],answer:'on a tour',explanationVi:'Đi tham quan (on a tour).',strategyVi:'Ngữ cảnh → on a tour.'},
        {id:'fa1_rw5_5',partNumber:5,taskTypeVi:'Đọc điền',taskTypeEn:'Gap fill',prompt:'Gap 5 in the passage.',options:[],answer:'woman',explanationVi:'Người phụ nữ (woman).',strategyVi:'Context → woman.'},
        {id:'fa1_rw5_6',partNumber:5,taskTypeVi:'Đọc điền',taskTypeEn:'Gap fill',prompt:'Gap 6 in the passage.',options:[],answer:'grass',explanationVi:'Cỏ (grass).',strategyVi:'Ngoài trời + xanh → grass.'},
        {id:'fa1_rw5_7',partNumber:5,taskTypeVi:'Đọc điền',taskTypeEn:'Gap fill',prompt:'Gap 7 in the passage.',options:[],answer:'secret room',explanationVi:'Phòng bí mật (secret room).',strategyVi:'"a _____" → secret room.'}
      ]
    },
    // Part 6: Gap fill short (5 marks)
    { partNumber: 6, titleEn: 'Part 6: Gap fill', titleVi: 'Phần 6: Điền 1 từ (5 câu)',
      instructionVi: 'Đọc email/thư. Điền MỘT từ vào mỗi chỗ trống.',
      questions: [
        {id:'fa1_rw6_1',partNumber:6,taskTypeVi:'Điền 1 từ',taskTypeEn:'One-word gap',prompt:'Gap 1',options:[],answer:'me',explanationVi:'me/us — đại từ tân ngữ.',strategyVi:'Sau giới từ → me.'},
        {id:'fa1_rw6_2',partNumber:6,taskTypeVi:'Điền 1 từ',taskTypeEn:'One-word gap',prompt:'Gap 2',options:[],answer:'pair',explanationVi:'pair — a pair of.',strategyVi:'"a _____ of shoes" → pair.'},
        {id:'fa1_rw6_3',partNumber:6,taskTypeVi:'Điền 1 từ',taskTypeEn:'One-word gap',prompt:'Gap 3',options:[],answer:'on',explanationVi:'on — giới từ.',strategyVi:'Context → on.'},
        {id:'fa1_rw6_4',partNumber:6,taskTypeVi:'Điền 1 từ',taskTypeEn:'One-word gap',prompt:'Gap 4',options:[],answer:'walk',explanationVi:'walk — đi bộ.',strategyVi:'"go for a _____" → walk.'},
        {id:'fa1_rw6_5',partNumber:6,taskTypeVi:'Điền 1 từ',taskTypeEn:'One-word gap',prompt:'Gap 5',options:[],answer:'After',explanationVi:'After — sau đó.',strategyVi:'Thứ tự thời gian → After.'}
      ]
    },
    // Part 7: Story writing (5 marks)
    { partNumber: 7, titleEn: 'Part 7: Story writing', titleVi: 'Phần 7: Viết câu chuyện (tự đánh giá)',
      instructionVi: 'Nhìn 3 bức tranh. Viết câu chuyện. Viết 20 từ trở lên.',
      questions: [
        {id:'fa1_rw7_1',partNumber:7,taskTypeVi:'Viết chuyện',taskTypeEn:'Writing',prompt:'Look at the 3 pictures. Write the story. Write 20 or more words.\n\nPicture 1: Children see a cat in a tree.\nPicture 2: Fire fighters arrive.\nPicture 3: Cat is rescued, children are happy.',selfAssessment:true,options:[],answer:'(self-assessed)',
        modelAnswer:"Harry and Jane were playing with their cat in the garden when it ran up a tree. 'Please come down,' shouted Harry, but the cat stayed in the tree. 'I have an idea,' said Jane. 'Let's ask those fire fighters to help us.' They ran to the gate and waved at the fire fighters. One fire fighter climbed the tree and saved the cat. The children were smiling.",
        rubricVi:['Viết ít nhất 20 từ','Mô tả cả 3 bức tranh','Dùng thì quá khứ (past simple)','Có liên kết logic giữa các sự kiện','Sáng tạo thêm chi tiết (lời thoại, cảm xúc)'],
        explanationVi:'Viết câu chuyện theo 3 tranh: mèo trên cây → lính cứu hỏa đến → giải cứu.',
        strategyVi:'Bước 1: Nhìn 3 tranh → xác định chuyện gì xảy ra. Bước 2: Viết 1-2 câu cho mỗi tranh. Bước 3: Thêm tên, lời thoại, cảm xúc. Bước 4: Kiểm tra thì quá khứ.'}
      ]
    }
  ]
};
