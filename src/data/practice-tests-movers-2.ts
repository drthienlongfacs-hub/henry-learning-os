import type { PracticeTest } from './practice-test-bank';

export const MOVERS_RW_2: PracticeTest = {
  id:'mv_rw_2', level:'movers', skill:'reading_writing',
  skillVi:'Đọc & Viết — Đề 2', totalMinutes:30,
  parts:[
    { partNumber:1, titleEn:'Definitions → Words', titleVi:'Đọc định nghĩa → Chọn từ',
      instructionVi:'Đọc định nghĩa. Chọn từ đúng.',
      questions:[
        {id:'m2_1_1',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'You sleep in this at night.',options:['bed','chair','desk'],answer:'bed',explanationVi:'"sleep at night" = ngủ vào ban đêm → bed (giường). Chair = ghế, desk = bàn làm việc.',strategyVi:'sleep → bed. Hành động + đồ vật: eat→table, sit→chair, sleep→bed, cook→kitchen.'},
        {id:'m2_1_2',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'This is the coldest season of the year.',options:['winter','autumn','spring'],answer:'winter',explanationVi:'"coldest" = lạnh nhất → mùa đông (winter).',strategyVi:'coldest→winter, hottest→summer, flowers→spring, leaves fall→autumn.'},
        {id:'m2_1_3',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'You can see yourself in this.',options:['mirror','window','picture'],answer:'mirror',explanationVi:'"see yourself" = nhìn thấy chính mình → gương (mirror).',strategyVi:'mirror phản chiếu hình ảnh. window = cửa sổ (nhìn ra ngoài), picture = ảnh.'},
        {id:'m2_1_4',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'You put letters in this and send them.',options:['envelope','bag','box'],answer:'envelope',explanationVi:'"put letters" + "send" → phong bì (envelope).',strategyVi:'letter + send = envelope. Dây chuyền: write letter → put in envelope → post it.'},
        {id:'m2_1_5',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'This person helps sick people get better.',options:['doctor','teacher','farmer'],answer:'doctor',explanationVi:'"sick people get better" = giúp người bệnh khỏe lại → bác sĩ (doctor).',strategyVi:'Nghề + chức năng: doctor=chữa bệnh, teacher=dạy, farmer=trồng trọt, pilot=lái bay.'},
        {id:'m2_1_6',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'You wear these to see better.',options:['glasses','gloves','shoes'],answer:'glasses',explanationVi:'"see better" = nhìn rõ hơn → kính mắt (glasses).',strategyVi:'glasses = kính mắt (see), gloves = găng tay (hands), shoes = giày (feet).'},
      ]
    },
    { partNumber:2, titleEn:'Picture + Yes/No', titleVi:'Nhìn tranh → Yes/No',
      instructionVi:'Nhìn tranh. Đọc câu. Viết Yes hoặc No.',
      questions:[
        {id:'m2_2_1',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The girl is climbing a tree.',imageEmoji:'👧🌳⬆️',options:['Yes','No'],answer:'Yes',explanationVi:'Bé gái đang leo cây (climbing a tree) → Yes.',strategyVi:'climb = leo. climb a tree, climb a mountain, climb stairs.'},
        {id:'m2_2_2',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'There are two dogs in the park.',imageEmoji:'🐕🐕🐕🏞️',options:['Yes','No'],answer:'No',explanationVi:'Có 3 con chó, câu nói 2 → No.',strategyVi:'ĐẾM kỹ! Movers thường đánh lừa bằng số. 3 ≠ 2.'},
        {id:'m2_2_3',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The boy is drinking milk.',imageEmoji:'👦🥛',options:['Yes','No'],answer:'Yes',explanationVi:'Bé trai uống sữa (milk) → Yes.',strategyVi:'drink milk/juice/water. eat cake/bread/rice. Phân biệt drink vs eat!'},
        {id:'m2_2_4',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'It is raining heavily.',imageEmoji:'🌤️',options:['Yes','No'],answer:'No',explanationVi:'Trời nắng nhẹ, không mưa to → No.',strategyVi:'raining heavily = mưa to. Tranh cho thấy nắng → sunny ≠ raining.'},
        {id:'m2_2_5',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The family is having breakfast.',imageEmoji:'👨‍👩‍👧🍳☀️',options:['Yes','No'],answer:'Yes',explanationVi:'Gia đình ăn sáng (breakfast) với trứng buổi sáng → Yes.',strategyVi:'breakfast = sáng (☀️), lunch = trưa, dinner = tối. Thời gian xác định bữa ăn!'},
        {id:'m2_2_6',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The teacher is writing on the board.',imageEmoji:'👩‍🏫📋',options:['Yes','No'],answer:'Yes',explanationVi:'Cô giáo viết trên bảng → Yes.',strategyVi:'board = bảng (trắng/đen), book = sách, paper = giấy. Giáo viên dùng board!'},
      ]
    },
    { partNumber:3, titleEn:'Conversation Match', titleVi:'Ghép hội thoại',
      instructionVi:'Chọn câu trả lời đúng cho mỗi câu hỏi.',
      questions:[
        {id:'m2_3_1',partNumber:3,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'How old are you?',options:["I'm nine.","I'm fine.","I'm at home."],answer:"I'm nine.",explanationVi:'"How old" = bao nhiêu tuổi → "I\'m nine" (9 tuổi). "How are you?" mới hỏi "I\'m fine".',strategyVi:'How OLD = tuổi (số). How ARE you = khỏe không. Cẩn thận nhầm 2 câu này!'},
        {id:'m2_3_2',partNumber:3,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:"What's the weather like today?",options:["It's sunny and warm.","It's a dog.","I like it."],answer:"It's sunny and warm.",explanationVi:'"weather" = thời tiết → "sunny and warm" (nắng và ấm).',strategyVi:'What\'s the weather like? → It\'s + sunny/rainy/cloudy/windy/cold/hot.'},
        {id:'m2_3_3',partNumber:3,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'Whose bag is this?',options:["It's mine.","It's blue.","It's big."],answer:"It's mine.",explanationVi:'"Whose" = của ai → "mine" (của tôi). Không hỏi màu hay kích thước.',strategyVi:'Whose = của ai. mine=của tôi, yours=của bạn, his=của anh ấy, hers=của cô ấy.'},
        {id:'m2_3_4',partNumber:3,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'When is your birthday?',options:["It's in June.","It's Monday.","It's fun."],answer:"It's in June.",explanationVi:'"When is your birthday" = sinh nhật khi nào → "in June" (tháng 6).',strategyVi:'birthday + in + tháng: in January, in February... Nhớ 12 tháng tiếng Anh!'},
        {id:'m2_3_5',partNumber:3,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'Do you want to play outside?',options:['Yes, let\'s go!','No, I\'m a student.','Yes, I have a cat.'],answer:'Yes, let\'s go!',explanationVi:'Rủ chơi ngoài → đồng ý "Yes, let\'s go!" (Ừ, đi thôi!).',strategyVi:'Lời mời: "Do you want to...?" → Đồng ý: Yes!/Sure!/Let\'s go! → Từ chối: No thanks.'},
        {id:'m2_3_6',partNumber:3,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'How much is this T-shirt?',options:["It's ten dollars.","It's red.","It's for my brother."],answer:"It's ten dollars.",explanationVi:'"How much" = giá bao nhiêu → "ten dollars" (10 đô la).',strategyVi:'How much = giá tiền. Trả lời: It\'s + [số] + dollars/pounds. Không trả lời màu!'},
      ]
    },
    { partNumber:4, titleEn:'Gap Fill (with options)', titleVi:'Điền từ (có đáp án)',
      instructionVi:'Đọc đoạn văn. Chọn từ đúng cho mỗi chỗ trống.',
      questions:[
        {id:'m2_4_1',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'Yesterday, we ___ to the beach.',options:['went','go','going'],answer:'went',explanationVi:'"Yesterday" → quá khứ → went (go→went).',strategyVi:'Yesterday/Last week → quá khứ. go→went, see→saw, eat→ate, have→had.'},
        {id:'m2_4_2',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'The water was very ___ so we could swim.',options:['warm','cold','deep'],answer:'warm',explanationVi:'Nước ấm (warm) nên bơi được. Cold = lạnh (không muốn bơi).',strategyVi:'Đọc ngữ cảnh: "could swim" = bơi được → nước phải warm (ấm), không cold (lạnh).'},
        {id:'m2_4_3',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'My mum made sandwiches ___ we ate on the beach.',options:['which','who','where'],answer:'which',explanationVi:'"which" dùng cho đồ vật (sandwiches). "who" cho người, "where" cho nơi.',strategyVi:'which = cho đồ vật, who = cho người, where = cho nơi chốn. Đại từ quan hệ Movers!'},
        {id:'m2_4_4',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'We played ___ the sand all afternoon.',options:['in','on','at'],answer:'in',explanationVi:'"played in the sand" = chơi trong cát. Cấu trúc cố định.',strategyVi:'in the sand, in the water, in the garden. on the beach, on the grass. Giới từ cần nhớ!'},
        {id:'m2_4_5',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'We came home ___ it was getting dark.',options:['when','but','so'],answer:'when',explanationVi:'"when" = khi. Khi trời tối (getting dark) → về nhà.',strategyVi:'when = khi nào. because = vì. but = nhưng. so = nên. Liên từ quan trọng!'},
      ]
    },
  ]
};

export const MOVERS_RW_3: PracticeTest = {
  id:'mv_rw_3', level:'movers', skill:'reading_writing',
  skillVi:'Đọc & Viết — Đề 3', totalMinutes:30,
  parts:[
    { partNumber:1, titleEn:'Definitions → Words', titleVi:'Đọc định nghĩa → Chọn từ',
      instructionVi:'Đọc định nghĩa. Chọn từ đúng.',
      questions:[
        {id:'m3_1_1',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'A very big animal with a trunk.',options:['elephant','lion','tiger'],answer:'elephant',explanationVi:'"trunk" = vòi → voi (elephant). Lion có bờm, tiger có vằn.',strategyVi:'trunk = vòi (chỉ voi có). mane = bờm (sư tử). stripes = vằn (hổ).'},
        {id:'m3_1_2',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'The room where you cook food.',options:['kitchen','bedroom','bathroom'],answer:'kitchen',explanationVi:'"cook food" = nấu ăn → nhà bếp (kitchen).',strategyVi:'Phòng trong nhà: kitchen=nấu, bedroom=ngủ, bathroom=tắm, living room=ngồi chơi.'},
        {id:'m3_1_3',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'You use this to take photographs.',options:['camera','computer','telephone'],answer:'camera',explanationVi:'"take photographs" = chụp ảnh → máy ảnh (camera).',strategyVi:'take photos → camera, make calls → telephone, play games → computer.'},
        {id:'m3_1_4',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'A sweet food made with sugar, eggs and flour.',options:['cake','soup','salad'],answer:'cake',explanationVi:'"sugar, eggs, flour" → bánh (cake). Soup = canh, salad = rau trộn.',strategyVi:'Nguyên liệu → món ăn: sugar+eggs+flour=cake, vegetables=salad, water+vegetables=soup.'},
        {id:'m3_1_5',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'The day after Monday.',options:['Tuesday','Wednesday','Sunday'],answer:'Tuesday',explanationVi:'Sau Monday (thứ 2) là Tuesday (thứ 3).',strategyVi:'Thứ tự: Mon→Tue→Wed→Thu→Fri→Sat→Sun. Học thuộc 7 ngày!'},
        {id:'m3_1_6',partNumber:1,taskTypeVi:'Định nghĩa',taskTypeEn:'Definition',prompt:'Water that falls from the sky.',options:['rain','snow','wind'],answer:'rain',explanationVi:'"water falls from sky" = nước rơi từ trời → mưa (rain). Snow = tuyết (trắng, lạnh).',strategyVi:'rain=nước, snow=tuyết (đông lạnh), hail=mưa đá. Tất cả rơi từ trời nhưng khác nhau!'},
      ]
    },
    { partNumber:2, titleEn:'Picture + Yes/No', titleVi:'Nhìn tranh → Yes/No',
      instructionVi:'Nhìn tranh. Đọc câu. Viết Yes hoặc No.',
      questions:[
        {id:'m3_2_1',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The boy is flying a kite.',imageEmoji:'👦🪁',options:['Yes','No'],answer:'Yes',explanationVi:'Bé trai thả diều (flying a kite) → Yes.',strategyVi:'fly a kite = thả diều, fly a plane = lái máy bay. "fly" có nhiều nghĩa!'},
        {id:'m3_2_2',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The woman is carrying two bags.',imageEmoji:'👩🛍️🛍️🛍️',options:['Yes','No'],answer:'No',explanationVi:'Bà mang 3 túi, câu nói 2 → No.',strategyVi:'ĐẾM túi: 3 ≠ 2. Movers hay đánh lừa bằng số lượng!'},
        {id:'m3_2_3',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The children are singing.',imageEmoji:'👧👦🎵',options:['Yes','No'],answer:'Yes',explanationVi:'Trẻ em đang hát (singing) → Yes.',strategyVi:'🎵 = hát (singing). 📖 = đọc (reading). ✏️ = viết (writing). Icon gợi ý!'},
        {id:'m3_2_4',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The door is closed.',imageEmoji:'🚪➡️',options:['Yes','No'],answer:'No',explanationVi:'Cửa đang mở (open), không đóng (closed) → No.',strategyVi:'open ≠ closed. Nhìn kỹ trạng thái: cửa mở hay đóng?'},
        {id:'m3_2_5',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'There is a rainbow in the sky.',imageEmoji:'🌈',options:['Yes','No'],answer:'Yes',explanationVi:'Có cầu vồng (rainbow) trên trời → Yes.',strategyVi:'rainbow = cầu vồng (7 màu). Thường xuất hiện sau mưa.'},
        {id:'m3_2_6',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The grandfather is sleeping in the chair.',imageEmoji:'👴📰',options:['Yes','No'],answer:'No',explanationVi:'Ông đang đọc báo (reading newspaper), không ngủ → No.',strategyVi:'sleeping ≠ reading. Nhìn kỹ mắt: nhắm = sleeping, mở = awake!'},
      ]
    },
    { partNumber:3, titleEn:'Conversation Match', titleVi:'Ghép hội thoại',
      instructionVi:'Chọn câu trả lời đúng cho mỗi câu hỏi.',
      questions:[
        {id:'m3_3_1',partNumber:3,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'What does your father do?',options:["He's a doctor.","He's tall.","He's at home."],answer:"He's a doctor.",explanationVi:'"What does he do?" = hỏi nghề nghiệp → "He\'s a doctor" (bác sĩ).',strategyVi:'What does [person] do? = hỏi NGHỀ NGHIỆP. Không hỏi ngoại hình hay vị trí!'},
        {id:'m3_3_2',partNumber:3,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'Which one do you prefer, the red or the blue?',options:['I like the blue one.','I have two.','They are nice.'],answer:'I like the blue one.',explanationVi:'"prefer" = thích hơn → chọn 1 trong 2. "the blue one" = cái màu xanh.',strategyVi:'Which...prefer? = chọn cái nào hơn. Trả lời: I like the [colour/size] one.'},
        {id:'m3_3_3',partNumber:3,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'Shall I help you with your homework?',options:['Yes, please! That would be great.','I did my homework.','Homework is easy.'],answer:'Yes, please! That would be great.',explanationVi:'"Shall I help?" = đề nghị giúp → "Yes, please!" (Vâng, xin giúp!).',strategyVi:'Shall I...? = đề nghị giúp. → Yes, please! / No, thanks, I can do it.'},
        {id:'m3_3_4',partNumber:3,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'How often do you play tennis?',options:['Twice a week.','For two hours.','At the park.'],answer:'Twice a week.',explanationVi:'"How often" = bao lâu 1 lần → "twice a week" (2 lần/tuần).',strategyVi:'How often → tần suất: once/twice/three times a week. How long → thời lượng. How far → khoảng cách.'},
        {id:'m3_3_5',partNumber:3,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'What time does school start?',options:['At eight o\'clock.','It\'s Monday.','I like school.'],answer:'At eight o\'clock.',explanationVi:'"What time" = mấy giờ → "eight o\'clock" (8 giờ).',strategyVi:'What time = hỏi giờ. Trả lời: At + giờ. "o\'clock" = giờ đúng.'},
        {id:'m3_3_6',partNumber:3,taskTypeVi:'Hội thoại',taskTypeEn:'Conversation',prompt:'Why are you sad?',options:['Because I lost my toy.','I am sad.','Yes, I am.'],answer:'Because I lost my toy.',explanationVi:'"Why" = tại sao → "Because..." (Vì...). "I lost my toy" = mất đồ chơi.',strategyVi:'Why → Because. LUÔN trả lời bằng "Because..." khi gặp "Why...?"'},
      ]
    },
    { partNumber:4, titleEn:'Gap Fill (with options)', titleVi:'Điền từ (có đáp án)',
      instructionVi:'Đọc đoạn văn. Chọn từ đúng cho mỗi chỗ trống.',
      questions:[
        {id:'m3_4_1',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'Every morning, Lucy ___ up at seven o\'clock.',options:['gets','got','getting'],answer:'gets',explanationVi:'"Every morning" = mỗi sáng → hiện tại đơn → "gets" (get up = thức dậy).',strategyVi:'Every day/morning/week → hiện tại đơn. Thêm -s/-es cho ngôi thứ 3: she gets, he plays.'},
        {id:'m3_4_2',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'She ___ breakfast with her family.',options:['has','had','having'],answer:'has',explanationVi:'Thói quen hàng ngày → "has" (have→has cho she). "have breakfast" = ăn sáng.',strategyVi:'have breakfast/lunch/dinner = ăn bữa... She has (ngôi 3 số ít + s).'},
        {id:'m3_4_3',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'Then she walks to school ___ her best friend.',options:['with','by','for'],answer:'with',explanationVi:'"with her friend" = cùng bạn. "by" dùng cho phương tiện, "for" = cho.',strategyVi:'with = cùng ai đó. by = bằng phương tiện (by bus, by car). for = cho ai đó.'},
        {id:'m3_4_4',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'Lucy\'s favourite subject is maths ___ she is very good at numbers.',options:['because','but','or'],answer:'because',explanationVi:'"because" = vì. Thích toán VÌ giỏi số.',strategyVi:'because = lý do. but = tương phản. or = lựa chọn. and = thêm vào.'},
        {id:'m3_4_5',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'After school, she ___ does her homework before playing.',options:['always','never','sometimes'],answer:'always',explanationVi:'"always" = luôn luôn. Lucy luôn làm bài trước khi chơi (học sinh ngoan!).',strategyVi:'always=luôn(100%), usually=thường(90%), sometimes=đôi khi(50%), never=không bao giờ(0%).'},
      ]
    },
  ]
};
