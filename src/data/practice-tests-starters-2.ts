import type { PracticeTest } from './practice-test-bank';

export const STARTERS_RW_2: PracticeTest = {
  id:'st_rw_2', level:'starters', skill:'reading_writing',
  skillVi:'Đọc & Viết — Đề 2', totalMinutes:20,
  parts:[
    { partNumber:1, titleEn:'True/False with Pictures', titleVi:'Đúng/Sai với hình ảnh',
      instructionVi:'Nhìn tranh. Đọc câu. Đánh dấu ✓ hoặc ✗.',
      questions:[
        {id:'s2_1_1',partNumber:1,taskTypeVi:'Đúng/Sai',taskTypeEn:'True/False',prompt:'This is a dog.',imageEmoji:'🐕',options:['✓','✗'],answer:'✓',explanationVi:'Tranh là con chó (dog) → đúng ✓.',strategyVi:'Nhận diện con vật: dog=chó, cat=mèo, bird=chim. Học 20 con vật Starters!'},
        {id:'s2_1_2',partNumber:1,taskTypeVi:'Đúng/Sai',taskTypeEn:'True/False',prompt:'This is a fish.',imageEmoji:'🐸',options:['✓','✗'],answer:'✗',explanationVi:'Tranh là con ếch (frog), không phải cá (fish) → sai ✗.',strategyVi:'Nhìn kỹ tranh trước khi đọc câu. Frog ≠ fish dù đều sống gần nước.'},
        {id:'s2_1_3',partNumber:1,taskTypeVi:'Đúng/Sai',taskTypeEn:'True/False',prompt:'This is a banana.',imageEmoji:'🍌',options:['✓','✗'],answer:'✓',explanationVi:'Tranh là quả chuối (banana) → đúng ✓.',strategyVi:'Trái cây Starters: banana, apple, mango, orange, lemon, grape.'},
        {id:'s2_1_4',partNumber:1,taskTypeVi:'Đúng/Sai',taskTypeEn:'True/False',prompt:'This is a pencil.',imageEmoji:'📏',options:['✓','✗'],answer:'✗',explanationVi:'Tranh là thước (ruler), không phải bút chì (pencil) → sai ✗.',strategyVi:'Đồ dùng học tập: pencil=bút chì, ruler=thước, eraser=gôm, pen=bút mực.'},
        {id:'s2_1_5',partNumber:1,taskTypeVi:'Đúng/Sai',taskTypeEn:'True/False',prompt:'This is a chair.',imageEmoji:'🪑',options:['✓','✗'],answer:'✓',explanationVi:'Tranh là ghế (chair) → đúng ✓.',strategyVi:'Đồ nội thất: chair=ghế, table=bàn, bed=giường, sofa=ghế sofa.'},
      ]
    },
    { partNumber:2, titleEn:'Read & Write Yes/No', titleVi:'Đọc và viết Yes/No',
      instructionVi:'Nhìn tranh. Đọc câu. Viết Yes hoặc No.',
      questions:[
        {id:'s2_2_1',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The boy is riding a bike.',imageEmoji:'🚲👦',options:['Yes','No'],answer:'Yes',explanationVi:'Bé trai đang đạp xe (riding a bike) → Yes.',strategyVi:'ride a bike = đạp xe. Phân biệt: ride (xe đạp/ngựa) vs drive (ô tô).'},
        {id:'s2_2_2',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'There are three balls on the table.',imageEmoji:'🏀🏀',options:['Yes','No'],answer:'No',explanationVi:'Chỉ có 2 quả bóng, câu nói 3 → No. ĐẾM cẩn thận!',strategyVi:'Bẫy số đếm! Luôn đếm số lượng trong tranh trước. 2 ≠ 3.'},
        {id:'s2_2_3',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The girl is wearing a hat.',imageEmoji:'👧👒',options:['Yes','No'],answer:'Yes',explanationVi:'Cô bé đang đội nón (wearing a hat) → Yes.',strategyVi:'wear = mặc/đội/đeo. wear a hat, wear shoes, wear glasses.'},
        {id:'s2_2_4',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The cat is under the bed.',imageEmoji:'🛏️🐱',options:['Yes','No'],answer:'Yes',explanationVi:'Mèo nằm dưới giường (under the bed) → Yes.',strategyVi:'Giới từ vị trí: under=dưới, on=trên, in=trong, next to=bên cạnh.'},
        {id:'s2_2_5',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The woman is cooking fish.',imageEmoji:'👩🍳🍗',options:['Yes','No'],answer:'No',explanationVi:'Bà đang nấu gà (chicken), không phải cá (fish) → No.',strategyVi:'Chú ý CHI TIẾT: chicken ≠ fish. Nhìn kỹ đồ ăn trong tranh.'},
      ]
    },
    { partNumber:3, titleEn:'Spell the Word', titleVi:'Đánh vần từ',
      instructionVi:'Nhìn tranh. Sắp xếp chữ cái thành từ đúng.',
      questions:[
        {id:'s2_3_1',partNumber:3,taskTypeVi:'Đánh vần',taskTypeEn:'Spell',prompt:'🐘 p-e-l-e-h-a-n-t',options:[],answer:'elephant',explanationVi:'Con voi = elephant. Sắp xếp: e-l-e-p-h-a-n-t.',strategyVi:'Elephant là từ dài nhất Starters. Nhớ: e-le-phant (3 âm tiết).'},
        {id:'s2_3_2',partNumber:3,taskTypeVi:'Đánh vần',taskTypeEn:'Spell',prompt:'🍎 p-a-l-p-e',options:[],answer:'apple',explanationVi:'Quả táo = apple. Sắp xếp: a-p-p-l-e.',strategyVi:'Apple có 2 chữ p. Nhớ: app-le.'},
        {id:'s2_3_3',partNumber:3,taskTypeVi:'Đánh vần',taskTypeEn:'Spell',prompt:'🏫 o-s-h-c-l-o',options:[],answer:'school',explanationVi:'Trường học = school. Sắp xếp: s-c-h-o-o-l.',strategyVi:'School có "sch" ở đầu và 2 chữ o. Nhớ: sch-ool.'},
        {id:'s2_3_4',partNumber:3,taskTypeVi:'Đánh vần',taskTypeEn:'Spell',prompt:'🌳 e-e-r-t',options:[],answer:'tree',explanationVi:'Cây = tree. Sắp xếp: t-r-e-e.',strategyVi:'Tree có 2 chữ e. Nhớ: tr-ee.'},
        {id:'s2_3_5',partNumber:3,taskTypeVi:'Đánh vần',taskTypeEn:'Spell',prompt:'🐊 d-c-o-c-o-r-i-l-e',options:[],answer:'crocodile',explanationVi:'Cá sấu = crocodile. Sắp xếp: c-r-o-c-o-d-i-l-e.',strategyVi:'Crocodile = cro-co-dile. Từ dài, tách 3 phần để nhớ!'},
      ]
    },
    { partNumber:4, titleEn:'Gap Fill', titleVi:'Điền từ vào chỗ trống',
      instructionVi:'Đọc đoạn văn. Chọn từ đúng.',
      questions:[
        {id:'s2_4_1',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'I like to ___ in the swimming pool.',options:['swim','run','fly'],answer:'swim',explanationVi:'swimming pool = hồ bơi → swim (bơi). Không thể run (chạy) hay fly (bay) trong hồ bơi.',strategyVi:'Nơi + hành động: pool→swim, park→play, school→learn. Logic!'},
        {id:'s2_4_2',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'My sister has ___ hair.',options:['long','tall','big'],answer:'long',explanationVi:'Tóc dài = long hair. "tall" dùng cho chiều cao người, "big" = to.',strategyVi:'long hair (tóc dài), tall boy (cao), big house (to). Mỗi tính từ đi với danh từ riêng!'},
        {id:'s2_4_3',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'We go to school ___ Monday to Friday.',options:['from','on','at'],answer:'from',explanationVi:'"from Monday to Friday" = từ thứ Hai đến thứ Sáu. Cấu trúc: from...to...',strategyVi:'from...to... = từ...đến... Dùng cho khoảng thời gian/khoảng cách.'},
        {id:'s2_4_4',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'The sun is ___ in the sky.',options:['yellow','blue','green'],answer:'yellow',explanationVi:'Mặt trời màu vàng (yellow). Bầu trời xanh (blue sky), nhưng mặt trời = yellow.',strategyVi:'Kiến thức chung: sun=yellow, sky=blue, grass=green, snow=white.'},
        {id:'s2_4_5',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'My favourite ___ is football.',options:['sport','food','colour'],answer:'sport',explanationVi:'Football là môn thể thao (sport), không phải thức ăn hay màu sắc.',strategyVi:'Phân loại: football/tennis=sport, pizza/rice=food, red/blue=colour.'},
      ]
    },
    { partNumber:5, titleEn:'Questions about a Picture', titleVi:'Trả lời câu hỏi về tranh',
      instructionVi:'Nhìn tranh. Đọc câu hỏi. Viết câu trả lời 1 từ.',
      questions:[
        {id:'s2_5_1',partNumber:5,taskTypeVi:'Viết 1 từ',taskTypeEn:'Write 1 word',prompt:'What colour is the ball? 🔵',imageEmoji:'🔵',options:['blue','red','green'],answer:'blue',explanationVi:'Quả bóng màu xanh dương → blue.',strategyVi:'Học 10 màu: red, blue, green, yellow, orange, purple, pink, black, white, brown.'},
        {id:'s2_5_2',partNumber:5,taskTypeVi:'Viết 1 từ',taskTypeEn:'Write 1 word',prompt:'How many birds are there? 🐦🐦🐦🐦',imageEmoji:'🐦🐦🐦🐦',options:['three','four','five'],answer:'four',explanationVi:'Đếm: 4 con chim → four.',strategyVi:'ĐẾM 2 lần cho chắc! Starters thường hỏi số 1-10.'},
        {id:'s2_5_3',partNumber:5,taskTypeVi:'Viết 1 từ',taskTypeEn:'Write 1 word',prompt:'Where is the duck? 🦆🌊',imageEmoji:'🦆🌊',options:['water','sky','tree'],answer:'water',explanationVi:'Con vịt ở trong nước (water).',strategyVi:'Where = hỏi ở đâu. Trả lời bằng nơi chốn: water, park, garden, room.'},
        {id:'s2_5_4',partNumber:5,taskTypeVi:'Viết 1 từ',taskTypeEn:'Write 1 word',prompt:'What is the girl eating? 👧🍌',imageEmoji:'👧🍌',options:['banana','apple','cake'],answer:'banana',explanationVi:'Cô bé đang ăn chuối (banana).',strategyVi:'What...eating? = ăn gì. Nhìn đồ ăn trong tranh rồi viết tên.'},
        {id:'s2_5_5',partNumber:5,taskTypeVi:'Viết 1 từ',taskTypeEn:'Write 1 word',prompt:'What animal is this? 🐍',imageEmoji:'🐍',options:['snake','worm','lizard'],answer:'snake',explanationVi:'Con rắn = snake.',strategyVi:'snake=rắn (dài, trườn). worm=giun (nhỏ). lizard=thằn lằn (có chân).'},
      ]
    },
  ]
};

export const STARTERS_RW_3: PracticeTest = {
  id:'st_rw_3', level:'starters', skill:'reading_writing',
  skillVi:'Đọc & Viết — Đề 3', totalMinutes:20,
  parts:[
    { partNumber:1, titleEn:'True/False with Pictures', titleVi:'Đúng/Sai với hình ảnh',
      instructionVi:'Nhìn tranh. Đọc câu. Đánh dấu ✓ hoặc ✗.',
      questions:[
        {id:'s3_1_1',partNumber:1,taskTypeVi:'Đúng/Sai',taskTypeEn:'True/False',prompt:'This is a horse.',imageEmoji:'🐴',options:['✓','✗'],answer:'✓',explanationVi:'Con ngựa (horse) → đúng ✓.',strategyVi:'Động vật trang trại: horse=ngựa, cow=bò, sheep=cừu, chicken=gà, duck=vịt.'},
        {id:'s3_1_2',partNumber:1,taskTypeVi:'Đúng/Sai',taskTypeEn:'True/False',prompt:'This is a guitar.',imageEmoji:'🎹',options:['✓','✗'],answer:'✗',explanationVi:'Piano (🎹), không phải guitar → sai ✗.',strategyVi:'Nhạc cụ: guitar, piano, drums, violin. Nhìn HÌNH DẠNG để phân biệt.'},
        {id:'s3_1_3',partNumber:1,taskTypeVi:'Đúng/Sai',taskTypeEn:'True/False',prompt:'This is a lemon.',imageEmoji:'🍋',options:['✓','✗'],answer:'✓',explanationVi:'Quả chanh vàng (lemon) → đúng ✓.',strategyVi:'lemon = chanh vàng, lime = chanh xanh, orange = cam. Phân biệt bằng MÀU.'},
        {id:'s3_1_4',partNumber:1,taskTypeVi:'Đúng/Sai',taskTypeEn:'True/False',prompt:'This is a boat.',imageEmoji:'✈️',options:['✓','✗'],answer:'✗',explanationVi:'Máy bay (plane/aeroplane), không phải thuyền (boat) → sai ✗.',strategyVi:'Phương tiện: boat=thuyền (nước), plane=máy bay (trời), car=xe (đất).'},
        {id:'s3_1_5',partNumber:1,taskTypeVi:'Đúng/Sai',taskTypeEn:'True/False',prompt:'This is a spider.',imageEmoji:'🕷️',options:['✓','✗'],answer:'✓',explanationVi:'Con nhện (spider) → đúng ✓.',strategyVi:'spider = nhện (8 chân), ant = kiến (nhỏ), bee = ong (bay, đốt).'},
      ]
    },
    { partNumber:2, titleEn:'Read & Write Yes/No', titleVi:'Đọc và viết Yes/No',
      instructionVi:'Nhìn tranh. Đọc câu. Viết Yes hoặc No.',
      questions:[
        {id:'s3_2_1',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The children are playing in the garden.',imageEmoji:'👧👦🌻',options:['Yes','No'],answer:'Yes',explanationVi:'Trẻ em chơi trong vườn (garden) → Yes.',strategyVi:'garden = vườn, park = công viên, playground = sân chơi.'},
        {id:'s3_2_2',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The man is reading a book.',imageEmoji:'👨📺',options:['Yes','No'],answer:'No',explanationVi:'Ông đang xem TV, không đọc sách → No.',strategyVi:'reading a book ≠ watching TV. Nhìn kỹ hành động!'},
        {id:'s3_2_3',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'There is a clock on the wall.',imageEmoji:'🕐',options:['Yes','No'],answer:'Yes',explanationVi:'Có đồng hồ treo tường (clock on the wall) → Yes.',strategyVi:'clock = đồng hồ treo tường, watch = đồng hồ đeo tay.'},
        {id:'s3_2_4',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The baby is sleeping.',imageEmoji:'👶😊',options:['Yes','No'],answer:'No',explanationVi:'Em bé đang cười (smiling), không ngủ (sleeping) → No.',strategyVi:'sleeping = ngủ (mắt nhắm), smiling = cười (mắt mở). Nhìn biểu cảm!'},
        {id:'s3_2_5',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The butterfly is purple.',imageEmoji:'🦋💜',options:['Yes','No'],answer:'Yes',explanationVi:'Bướm màu tím (purple) → Yes.',strategyVi:'Màu nâng cao: purple=tím, grey=xám, brown=nâu, gold=vàng kim.'},
      ]
    },
    { partNumber:3, titleEn:'Spell the Word', titleVi:'Đánh vần từ',
      instructionVi:'Nhìn tranh. Sắp xếp chữ cái thành từ đúng.',
      questions:[
        {id:'s3_3_1',partNumber:3,taskTypeVi:'Đánh vần',taskTypeEn:'Spell',prompt:'🐒 k-m-n-o-y-e',options:[],answer:'monkey',explanationVi:'Con khỉ = monkey. m-o-n-k-e-y.',strategyVi:'monkey: mon-key. "Key" ở cuối giúp nhớ!'},
        {id:'s3_3_2',partNumber:3,taskTypeVi:'Đánh vần',taskTypeEn:'Spell',prompt:'🏖️ a-b-c-h-e',options:[],answer:'beach',explanationVi:'Bãi biển = beach. b-e-a-c-h.',strategyVi:'beach: be-ach. "each" ở cuối.'},
        {id:'s3_3_3',partNumber:3,taskTypeVi:'Đánh vần',taskTypeEn:'Spell',prompt:'🍕 z-z-i-p-a',options:[],answer:'pizza',explanationVi:'Bánh pizza. p-i-z-z-a.',strategyVi:'pizza: 2 chữ z! pi-zza.'},
        {id:'s3_3_4',partNumber:3,taskTypeVi:'Đánh vần',taskTypeEn:'Spell',prompt:'🌺 w-f-l-o-r-e',options:[],answer:'flower',explanationVi:'Bông hoa = flower. f-l-o-w-e-r.',strategyVi:'flower: flow-er. "flow" + "er".'},
        {id:'s3_3_5',partNumber:3,taskTypeVi:'Đánh vần',taskTypeEn:'Spell',prompt:'🦁 o-l-n-i',options:[],answer:'lion',explanationVi:'Sư tử = lion. l-i-o-n.',strategyVi:'lion: 4 chữ cái ngắn gọn. li-on.'},
      ]
    },
    { partNumber:4, titleEn:'Gap Fill', titleVi:'Điền từ vào chỗ trống',
      instructionVi:'Đọc đoạn văn. Chọn từ đúng.',
      questions:[
        {id:'s3_4_1',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'My dad ___ to work by car every day.',options:['goes','plays','eats'],answer:'goes',explanationVi:'"goes to work" = đi làm. Không "plays to work" hay "eats to work".',strategyVi:'go to work = đi làm, go to school = đi học, go home = về nhà. "go" + nơi.'},
        {id:'s3_4_2',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'I ___ my teeth every morning.',options:['brush','wash','clean'],answer:'brush',explanationVi:'"brush my teeth" = đánh răng. Cụm từ cố định trong tiếng Anh.',strategyVi:'brush teeth = đánh răng, wash hands = rửa tay, comb hair = chải tóc.'},
        {id:'s3_4_3',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'The baby is ___ because she is hungry.',options:['crying','laughing','sleeping'],answer:'crying',explanationVi:'Đói (hungry) → khóc (crying). Laughing = cười, sleeping = ngủ.',strategyVi:'hungry → cry, happy → laugh, tired → sleep. Cảm xúc → hành động.'},
        {id:'s3_4_4',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'Can you ___ the door, please?',options:['open','eat','drink'],answer:'open',explanationVi:'"open the door" = mở cửa. Không thể eat/drink cửa!',strategyVi:'open/close + door/window/book. eat/drink + food. Hành động khớp đồ vật!'},
        {id:'s3_4_5',partNumber:4,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'We have English ___ on Wednesdays.',options:['lessons','games','dinners'],answer:'lessons',explanationVi:'"English lessons" = bài học tiếng Anh. "on Wednesdays" = vào thứ Tư.',strategyVi:'lesson = bài học ở trường. Ngày trong tuần + on: on Monday, on Tuesday...'},
      ]
    },
    { partNumber:5, titleEn:'Questions about a Picture', titleVi:'Trả lời câu hỏi về tranh',
      instructionVi:'Nhìn tranh. Đọc câu hỏi. Viết câu trả lời 1 từ.',
      questions:[
        {id:'s3_5_1',partNumber:5,taskTypeVi:'Viết 1 từ',taskTypeEn:'Write 1 word',prompt:'What is the boy holding? 🧒🏀',imageEmoji:'🧒🏀',options:['ball','bat','kite'],answer:'ball',explanationVi:'Bé trai cầm quả bóng (ball).',strategyVi:'holding = đang cầm. What...holding? → nhìn tay trong tranh.'},
        {id:'s3_5_2',partNumber:5,taskTypeVi:'Viết 1 từ',taskTypeEn:'Write 1 word',prompt:'What is on the plate? 🍰',imageEmoji:'🍰',options:['cake','bread','rice'],answer:'cake',explanationVi:'Trên đĩa có bánh (cake).',strategyVi:'on the plate = trên đĩa. Nhìn đồ ăn trên đĩa.'},
        {id:'s3_5_3',partNumber:5,taskTypeVi:'Viết 1 từ',taskTypeEn:'Write 1 word',prompt:'How many legs does a spider have?',imageEmoji:'🕷️',options:['six','eight','four'],answer:'eight',explanationVi:'Nhện có 8 chân = eight.',strategyVi:'spider = 8 legs, insect = 6 legs, dog = 4 legs. Kiến thức sinh học cơ bản!'},
        {id:'s3_5_4',partNumber:5,taskTypeVi:'Viết 1 từ',taskTypeEn:'Write 1 word',prompt:'What colour are the leaves? 🍃',imageEmoji:'🍃',options:['green','red','blue'],answer:'green',explanationVi:'Lá cây màu xanh lá = green.',strategyVi:'leaves = lá cây, thường green. Mùa thu: brown/yellow/red.'},
        {id:'s3_5_5',partNumber:5,taskTypeVi:'Viết 1 từ',taskTypeEn:'Write 1 word',prompt:'Where is the fish? 🐟🥣',imageEmoji:'🐟🥣',options:['bowl','bag','box'],answer:'bowl',explanationVi:'Cá trong bát/chậu (bowl).',strategyVi:'bowl = chậu/bát tròn, tank = bể cá lớn. fish bowl = chậu cá cảnh.'},
      ]
    },
  ]
};
