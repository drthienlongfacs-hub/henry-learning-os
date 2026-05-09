import type { PracticeTest } from './practice-test-bank';

export const FLYERS_RW_2: PracticeTest = {
  id:'fl_rw_2', level:'flyers', skill:'reading_writing',
  skillVi:'Đọc & Viết — Đề 2', totalMinutes:40,
  parts:[
    { partNumber:1, titleEn:'Definitions → Words', titleVi:'Định nghĩa → Từ',
      instructionVi:'Đọc định nghĩa. Viết từ đúng.',
      questions:[
        {id:'f2_1_1',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'A building where you can borrow books.',options:['library','school','museum','shop'],answer:'library',explanationVi:'"borrow books" = mượn sách → thư viện (library).',strategyVi:'borrow books=library, buy things=shop, see art=museum, learn=school.'},
        {id:'f2_1_2',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'The brother of your mother or father.',options:['uncle','cousin','nephew','grandfather'],answer:'uncle',explanationVi:'Anh/em trai của bố/mẹ = chú/bác (uncle).',strategyVi:'Gia đình: uncle=chú/bác, aunt=cô/dì, cousin=anh em họ, nephew=cháu trai.'},
        {id:'f2_1_3',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'A person who plays a musical instrument.',options:['musician','artist','actor','dancer'],answer:'musician',explanationVi:'"plays instrument" = chơi nhạc cụ → nhạc sĩ (musician).',strategyVi:'-ician/-ist = người làm nghề: musician=nhạc sĩ, artist=họa sĩ, scientist=nhà khoa học.'},
        {id:'f2_1_4',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'The opposite of easy.',options:['difficult','simple','quick','different'],answer:'difficult',explanationVi:'Trái nghĩa "easy" (dễ) = "difficult" (khó).',strategyVi:'Trái nghĩa Flyers: easy↔difficult, hot↔cold, fast↔slow, tall↔short, old↔young.'},
        {id:'f2_1_5',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'You use this to find your way in a new city.',options:['map','diary','dictionary','compass'],answer:'map',explanationVi:'"find way in a city" = tìm đường → bản đồ (map).',strategyVi:'map=bản đồ, dictionary=từ điển, diary=nhật ký, compass=la bàn.'},
      ]
    },
    { partNumber:2, titleEn:'Picture + Yes/No', titleVi:'Nhìn tranh → Yes/No',
      instructionVi:'Nhìn tranh. Đọc câu. Viết Yes hoặc No.',
      questions:[
        {id:'f2_2_1',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The students are doing a science experiment.',imageEmoji:'👩‍🔬🧪',options:['Yes','No'],answer:'Yes',explanationVi:'Học sinh làm thí nghiệm khoa học → Yes.',strategyVi:'science experiment = thí nghiệm khoa học. Flyers cần từ vựng chủ đề trường học!'},
        {id:'f2_2_2',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The man is repairing the bicycle.',imageEmoji:'👨🔧🚗',options:['Yes','No'],answer:'No',explanationVi:'Ông sửa xe hơi (car), không phải xe đạp (bicycle) → No.',strategyVi:'bicycle ≠ car. Đọc kỹ PHƯƠNG TIỆN: bicycle=xe đạp, car=xe hơi, motorbike=xe máy.'},
        {id:'f2_2_3',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'There are five children waiting for the bus.',imageEmoji:'🧒🧒🧒🧒🧒🚌',options:['Yes','No'],answer:'Yes',explanationVi:'Đếm: 5 trẻ em đợi xe buýt → Yes.',strategyVi:'Đếm đúng + kiểm tra hành động (waiting) + nơi (bus stop). 3 yếu tố!'},
        {id:'f2_2_4',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The chef is making pasta.',imageEmoji:'👨‍🍳🍕',options:['Yes','No'],answer:'No',explanationVi:'Đầu bếp làm pizza, không phải pasta → No.',strategyVi:'pasta ≠ pizza. Đều là đồ Ý nhưng khác nhau! Nhìn kỹ hình.'},
        {id:'f2_2_5',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The teenagers are skateboarding in the park.',imageEmoji:'🛹🏞️',options:['Yes','No'],answer:'Yes',explanationVi:'Thanh thiếu niên trượt ván (skateboarding) trong công viên → Yes.',strategyVi:'skateboarding = trượt ván, surfing = lướt sóng, skiing = trượt tuyết.'},
      ]
    },
    { partNumber:3, titleEn:'Conversation Match', titleVi:'Ghép hội thoại',
      instructionVi:'Chọn câu trả lời phù hợp nhất.',
      questions:[
        {id:'f2_3_1',partNumber:3,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'What would you do if you found a wallet?',options:["I'd take it to the police.","I found it yesterday.","It's brown."],answer:"I'd take it to the police.",explanationVi:'"What would you do if...?" = giả định → "I\'d take it to the police" (mang đến công an).',strategyVi:'Câu điều kiện: What would you do if...? → I\'d (I would) + V. Flyers nâng cao!'},
        {id:'f2_3_2',partNumber:3,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'I failed my maths test.',options:["Oh no! Don't worry, you'll do better next time.","I like maths.","The test is tomorrow."],answer:"Oh no! Don't worry, you'll do better next time.",explanationVi:'Bạn thi trượt → an ủi: "Don\'t worry, you\'ll do better next time" (Đừng lo, lần sau sẽ tốt hơn).',strategyVi:'An ủi: Don\'t worry, Cheer up, It\'s OK. Chúc mừng: Well done! Congratulations!'},
        {id:'f2_3_3',partNumber:3,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'Do you mind if I open the window?',options:['No, not at all. Go ahead!','The window is big.','I opened it.'],answer:'No, not at all. Go ahead!',explanationVi:'"Do you mind if...?" → ĐỒNG Ý = "No, not at all" (Không sao, cứ mở). LƯU Ý: "No" = đồng ý!',strategyVi:'Do you mind...? → "No" = ĐỒNG Ý (không phiền). "Yes" = PHẢN ĐỐI. Ngược với bình thường!'},
        {id:'f2_3_4',partNumber:3,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'How long have you been learning English?',options:['For three years.','Three books.','At school.'],answer:'For three years.',explanationVi:'"How long have you been..." → khoảng thời gian → "For three years" (3 năm).',strategyVi:'How long + have been → For + khoảng thời gian. Since + mốc thời gian (since 2023).'},
        {id:'f2_3_5',partNumber:3,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'I think we should recycle more.',options:['I agree. It helps the environment.','I recycled yesterday.','Recycling is a word.'],answer:'I agree. It helps the environment.',explanationVi:'Ý kiến → đồng ý: "I agree" (Tôi đồng ý). Environment = môi trường.',strategyVi:'Đồng ý: I agree, You\'re right. Không đồng ý: I disagree, I don\'t think so.'},
      ]
    },
    { partNumber:4, titleEn:'Gap Fill (choose A/B/C)', titleVi:'Điền từ (chọn A/B/C)',
      instructionVi:'Đọc đoạn văn. Chọn từ đúng.',
      questions:[
        {id:'f2_4_1',partNumber:4,taskTypeVi:'Chọn từ',taskTypeEn:'Multiple choice',prompt:'If I ___ enough money, I would travel around the world.',options:['had','have','has'],answer:'had',explanationVi:'Câu điều kiện loại 2: If + quá khứ đơn. "If I had" (Nếu tôi có).',strategyVi:'Điều kiện 2 (không có thật): If + V-quá khứ, would + V. "If I had..., I would..."'},
        {id:'f2_4_2',partNumber:4,taskTypeVi:'Chọn từ',taskTypeEn:'Multiple choice',prompt:'The book was ___ interesting that I couldn\'t stop reading.',options:['so','very','too'],answer:'so',explanationVi:'"so...that" = quá...đến nỗi. "so interesting that" = hay đến nỗi.',strategyVi:'so + adj + that = quá...đến nỗi. too + adj + to = quá...không thể. very = rất (không có that).'},
        {id:'f2_4_3',partNumber:4,taskTypeVi:'Chọn từ',taskTypeEn:'Multiple choice',prompt:'She asked me ___ I wanted to join the team.',options:['whether','weather','wether'],answer:'whether',explanationVi:'"whether" = liệu/có...không. "weather" = thời tiết (khác nhau!).',strategyVi:'whether = liệu (hỏi gián tiếp). weather = thời tiết. Đồng âm nhưng khác nghĩa!'},
        {id:'f2_4_4',partNumber:4,taskTypeVi:'Chọn từ',taskTypeEn:'Multiple choice',prompt:'By the time we arrived, the film ___ already started.',options:['had','has','have'],answer:'had',explanationVi:'"By the time" → quá khứ hoàn thành: had + V3. "had already started" = đã bắt đầu rồi.',strategyVi:'By the time + quá khứ đơn, had + V3 (quá khứ hoàn thành). Flyers grammar nâng cao!'},
        {id:'f2_4_5',partNumber:4,taskTypeVi:'Chọn từ',taskTypeEn:'Multiple choice',prompt:'The museum is ___ visiting. There are amazing exhibitions.',options:['worth','worthy','worthwhile'],answer:'worth',explanationVi:'"worth + V-ing" = đáng làm. "worth visiting" = đáng ghé thăm.',strategyVi:'worth + V-ing = đáng. It\'s worth reading/seeing/trying. Cấu trúc cố định!'},
      ]
    },
  ]
};
