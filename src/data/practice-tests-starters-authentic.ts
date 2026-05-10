import type { PracticeTest } from './practice-test-bank';

// Pre A1 Starters — Sample Test (Authentic)
// Source: starter-1.pdf (Cambridge Assessment English official sample)
// Includes: Listening (4 parts) + R&W (5 parts) with full tapescript & answer key

export const STARTERS_LISTENING_AUTHENTIC: PracticeTest = {
  id: 'st_list_auth', level: 'starters', skill: 'listening',
  skillVi: 'Starters — Nghe (Sample Test — Authentic)', totalMinutes: 20,
  parts: [
    { partNumber: 1, titleEn: 'Part 1: Listen and draw lines', titleVi: 'Phần 1: Nghe và nối tên (5 câu)',
      instructionVi: 'Nghe và nối tên với đúng người trong bức tranh.',
      partImage: '/exam-images/starters-listening-park.png',
      questions: [
        {id:'sa_l_1_1',partNumber:1,taskTypeVi:'Nghe & Nối',taskTypeEn:'Draw lines',prompt:'Who is Lucy?',audioTranscript:'F: There\'s a girl here, too. She\'s behind the pear tree!\nMch: Yes. She\'s funny. Her name\'s Lucy.\nF: And what\'s Lucy doing behind that tree?\nMch: Sorry! I don\'t know. Playing a game?',options:['A. Girl behind tree','B. Girl feeding ducks','C. Girl reading'],answer:'A. Girl behind tree',explanationVi:'Lucy đang ở phía sau cây lê (behind the pear tree).',strategyVi:'Nghe "behind the pear tree" → nối Lucy.'},
        {id:'sa_l_1_2',partNumber:1,taskTypeVi:'Nghe & Nối',taskTypeEn:'Draw lines',prompt:'Who is Jill?',audioTranscript:'Mch: And there\'s Jill. She\'s got some bread in her hand.\nF: Is she giving it to the ducks?\nMch: Yes! Jill loves ducks.\nF: Me too!',options:['A. Girl feeding ducks','B. Boy with kite','C. Boy on bike'],answer:'A. Girl feeding ducks',explanationVi:'Jill đang cho vịt ăn bánh mì (giving bread to ducks).',strategyVi:'Nghe "bread" + "ducks" → Jill.'},
        {id:'sa_l_1_3',partNumber:1,taskTypeVi:'Nghe & Nối',taskTypeEn:'Draw lines',prompt:'Who is Dan?',audioTranscript:'F: That\'s a great kite!\nMch: Yes, that\'s Dan\'s kite.\nF: Is Dan the boy in the red T-shirt?\nMch: Yes, that\'s right.',options:['A. Boy with kite in red T-shirt','B. Boy on bike','C. Girl reading'],answer:'A. Boy with kite in red T-shirt',explanationVi:'Dan là cậu bé mặc áo đỏ, có cánh diều (kite).',strategyVi:'Nghe "Dan\'s kite" + "red T-shirt" → Dan.'},
        {id:'sa_l_1_4',partNumber:1,taskTypeVi:'Nghe & Nối',taskTypeEn:'Draw lines',prompt:'Who is Ann?',audioTranscript:'F: One person is reading. What\'s her name?\nMch: The girl with the book?\nF: Yes.\nMch: That\'s my friend Ann. Reading is Ann\'s favourite hobby.',options:['A. Girl reading a book','B. Girl behind tree','C. Girl feeding ducks'],answer:'A. Girl reading a book',explanationVi:'Ann đang đọc sách (reading) — sở thích yêu thích.',strategyVi:'Nghe "reading" + "Ann\'s favourite hobby" → Ann.'},
        {id:'sa_l_1_5',partNumber:1,taskTypeVi:'Nghe & Nối',taskTypeEn:'Draw lines',prompt:'Who is Nick?',audioTranscript:'F: And what\'s that boy\'s name? The boy on the bike.\nMch: That\'s Nick. Nick\'s in my class at school.\nF: Oh! He\'s got a nice bike!\nMch: I know! It\'s new. He loves it.',options:['A. Boy on bike','B. Boy with kite','C. Boy with cats'],answer:'A. Boy on bike',explanationVi:'Nick đi xe đạp mới (bike).',strategyVi:'Nghe "boy on the bike" → Nick.'}
      ]
    },
    { partNumber: 2, titleEn: 'Part 2: Listen and write', titleVi: 'Phần 2: Nghe và viết (5 câu)',
      instructionVi: 'Nghe và viết tên hoặc số.',
      questions: [
        {id:'sa_l_2_1',partNumber:2,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'What is Kim\'s family name?',audioTranscript:'M: What\'s your family name, please?\nFch: It\'s Wall. W-A-L-L.\nM: Wall? That\'s my name, too.',options:[],answer:'Wall',explanationVi:'Họ của Kim là Wall (W-A-L-L).',strategyVi:'Tên được đánh vần: W-A-L-L.'},
        {id:'sa_l_2_2',partNumber:2,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'Where does Kim live? In _____ Street',audioTranscript:'M: Where do you live, Kim?\nFch: In Sun Street.\nM: Sun Street?\nFch: Yes. S-U-N. It\'s behind the zoo.',options:[],answer:'Sun',explanationVi:'Kim sống ở phố Sun (S-U-N), phía sau sở thú.',strategyVi:'S-U-N = Sun. Nghe kỹ tên đường.'},
        {id:'sa_l_2_3',partNumber:2,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'What number is Kim\'s house?',audioTranscript:'M: What number\'s your house?\nFch: It\'s 15.\nM: 15. Oh, is it that house with the big garden?\nFch: Yes, it is. And it\'s got a pink door!',options:[],answer:'15',explanationVi:'Nhà Kim số 15, có vườn lớn và cửa hồng.',strategyVi:'Nghe số nhà: fifteen = 15.'},
        {id:'sa_l_2_4',partNumber:2,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'What is the name of Kim\'s horse?',audioTranscript:'M: What\'s your horse\'s name?\nFch: Tiger. That\'s T-I-G-E-R.\nM: Tiger?!\nFch: Yes, it\'s a funny name for a horse but I like it.',options:[],answer:'Tiger',explanationVi:'Ngựa tên Tiger (T-I-G-E-R). Tên hài hước cho một con ngựa!',strategyVi:'Đánh vần: T-I-G-E-R.'},
        {id:'sa_l_2_5',partNumber:2,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'How old is Kim\'s horse?',audioTranscript:'M: How old is your horse?\nFch: He\'s seven.\nM: Seven?\nFch: Yes. And he can run and jump.',options:[],answer:'7',explanationVi:'Ngựa 7 tuổi (seven).',strategyVi:'seven = 7. Nghe số tuổi.'}
      ]
    },
    { partNumber: 3, titleEn: 'Part 3: Listen and tick the box', titleVi: 'Phần 3: Nghe và đánh dấu (5 câu)',
      instructionVi: 'Nghe và chọn hình đúng (A, B hoặc C).',
      questions: [
        {id:'sa_l_3_1',partNumber:3,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Pictures',prompt:'Which picture are May and Sam looking at?',audioTranscript:'Fch: This picture\'s nice, Sam. Who\'s in it?\nMch: Mum, my grandpa and my cousin, Tom.\nFch: Where\'s your dad and your grandma?\nMch: They\'re not in this picture, May.',options:['A','B','C'],answer:'B',explanationVi:'Ảnh có mẹ, ông nội và anh họ Tom (3 người, không có bố và bà).',strategyVi:'Đếm: 3 người (mum, grandpa, cousin). Loại ảnh có bố/bà.'},
        {id:'sa_l_3_2',partNumber:3,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Pictures',prompt:'What are Mrs Good\'s class doing this afternoon?',audioTranscript:'M: Where are your class this afternoon, Mrs Good? At their swimming lesson?\nF: No, they\'re in the playground.\nM: Are they playing football?\nF: Not today. They\'re taking photos for our class book.',options:['A. Swimming','B. Football','C. Taking photos'],answer:'A',explanationVi:'Lớp đang chụp ảnh cho sách lớp (taking photos). Không bơi, không đá bóng.',strategyVi:'Bẫy: swimming? → No. football? → Not today. → taking photos.'},
        {id:'sa_l_3_3',partNumber:3,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Pictures',prompt:'What is Mum\'s favourite fruit?',audioTranscript:'Mch: Mum, can we have this coconut?\nF: Well, they\'re very nice but I can\'t open them.\nMch: What about these oranges?\nF: OK. They\'re my favourites. And let\'s have this pineapple too.',options:['A. Coconut','B. Oranges','C. Pineapple'],answer:'A',explanationVi:'Cam (oranges) là trái cây yêu thích: "They\'re my favourites".',strategyVi:'Nghe "my favourites" → oranges. coconut thì "can\'t open".'},
        {id:'sa_l_3_4',partNumber:3,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Pictures',prompt:'Which dog is Anna\'s?',audioTranscript:'Mch: Is that your dog, Anna?\nFch: No, my dog\'s dirty.\nMch: Is it young?\nFch: Yes. My brother\'s dog is that old one.',options:['A. Clean old dog','B. Dirty young dog','C. Clean young dog'],answer:'B',explanationVi:'Chó của Anna bẩn (dirty) và trẻ (young). Chó của anh trai là con già.',strategyVi:'2 đặc điểm: dirty + young = chó Anna.'},
        {id:'sa_l_3_5',partNumber:3,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Pictures',prompt:'What is Lucy wearing?',audioTranscript:'F: Lucy, your skirt\'s on the bed.\nFch: Thanks, Mum but I don\'t want it. I\'m wearing my jeans.\nF: And your new T-shirt?\nFch: Yes. It\'s great!',options:['A. Skirt + T-shirt','B. Jeans + T-shirt','C. Jeans + sweater'],answer:'C',explanationVi:'Lucy mặc quần jeans và áo T-shirt mới. Không mặc váy (skirt).',strategyVi:'Bẫy: skirt → "don\'t want it". Nghe "I\'m wearing" → jeans + T-shirt.'}
      ]
    },
    { partNumber: 4, titleEn: 'Part 4: Listen and colour', titleVi: 'Phần 4: Nghe và tô màu (5 câu)',
      instructionVi: 'Nghe và tô màu bóng bay đúng.',
      questions: [
        {id:'sa_l_4_1',partNumber:4,taskTypeVi:'Nghe & Tô',taskTypeEn:'Colour',prompt:'Colour the balloon in the boy\'s hand',audioTranscript:'M: Colour the balloon in the small boy\'s hand now.\nFch: Sorry? The balloon in the boy\'s hand?\nM: Yes. Have you got a yellow pencil?\nFch: Yes, I have.',options:['yellow','red','blue'],answer:'yellow',explanationVi:'Tô màu vàng (yellow) cho bóng bay trong tay cậu bé.',strategyVi:'Nghe "yellow pencil" → bóng bay = vàng.'},
        {id:'sa_l_4_2',partNumber:4,taskTypeVi:'Nghe & Tô',taskTypeEn:'Colour',prompt:'Colour the balloon between the boxes',audioTranscript:'M: And can you see a balloon between the boxes?\nFch: Yes!\nM: Well done! Colour that balloon now, please.\nFch: What colour for the balloon between the boxes?\nM: Would you like to colour it pink?',options:['pink','green','orange'],answer:'pink',explanationVi:'Tô màu hồng (pink) cho bóng bay giữa các hộp.',strategyVi:'between the boxes + pink.'},
        {id:'sa_l_4_3',partNumber:4,taskTypeVi:'Nghe & Tô',taskTypeEn:'Colour',prompt:'Colour the balloon under the table',audioTranscript:'M: Now colour the balloon under the table.\nFch: The balloon under the table? OK!\nM: You can choose the colour!\nFch: Green! I love that colour!',options:['green','brown','yellow'],answer:'green',explanationVi:'Tô màu xanh lá (green) cho bóng bay dưới bàn.',strategyVi:'Bé gái chọn: "Green! I love that colour!"'},
        {id:'sa_l_4_4',partNumber:4,taskTypeVi:'Nghe & Tô',taskTypeEn:'Colour',prompt:'Colour the balloon on the chair',audioTranscript:'M: There\'s a balloon on the chair. Find that one, please.\nFch: I can see it.\nM: Good. Make that balloon brown.',options:['brown','pink','red'],answer:'brown',explanationVi:'Tô màu nâu (brown) cho bóng bay trên ghế.',strategyVi:'Nghe "Make that balloon brown" → nâu.'},
        {id:'sa_l_4_5',partNumber:4,taskTypeVi:'Nghe & Tô',taskTypeEn:'Colour',prompt:'Colour the balloon behind the cat',audioTranscript:'Fch: And which balloon can I colour now?\nM: The one behind the cat. Colour that balloon!\nFch: Can I make it orange?\nM: Yes. Thank you!',options:['orange','green','blue'],answer:'orange',explanationVi:'Tô màu cam (orange) cho bóng bay phía sau con mèo.',strategyVi:'behind the cat + orange.'}
      ]
    }
  ]
};

export const STARTERS_RW_AUTHENTIC: PracticeTest = {
  id: 'st_rw_auth', level: 'starters', skill: 'reading_writing',
  skillVi: 'Starters — Đọc & Viết (Sample Test — Authentic)', totalMinutes: 20,
  parts: [
    { partNumber: 1, titleEn: 'Part 1: Look and read. Tick or cross.', titleVi: 'Phần 1: Nhìn và đọc. Đúng/Sai.',
      instructionVi: 'Nhìn hình và đọc câu. Đánh dấu ✓ nếu đúng, ✗ nếu sai.',
      questions: [
        {id:'sa_rw_1_1',partNumber:1,taskTypeVi:'Đúng/Sai',taskTypeEn:'Tick/Cross',prompt:'This is a helicopter.',options:['✓','✗'],answer:'✓',explanationVi:'Hình vẽ là trực thăng → đúng (✓).',strategyVi:'Nhìn hình → so sánh với từ → ✓ hoặc ✗.'},
        {id:'sa_rw_1_2',partNumber:1,taskTypeVi:'Đúng/Sai',taskTypeEn:'Tick/Cross',prompt:'This is a clock.',options:['✓','✗'],answer:'✗',explanationVi:'Hình không phải đồng hồ → sai (✗).',strategyVi:'Đọc kỹ từ tiếng Anh, nhìn kỹ hình.'},
        {id:'sa_rw_1_3',partNumber:1,taskTypeVi:'Đúng/Sai',taskTypeEn:'Tick/Cross',prompt:'These are shells.',options:['✓','✗'],answer:'✓',explanationVi:'Hình vẽ là vỏ sò → đúng (✓).',strategyVi:'shells = vỏ sò/vỏ ốc.'},
        {id:'sa_rw_1_4',partNumber:1,taskTypeVi:'Đúng/Sai',taskTypeEn:'Tick/Cross',prompt:'This is a sock.',options:['✓','✗'],answer:'✗',explanationVi:'Hình không phải tất → sai (✗).',strategyVi:'sock = tất/vớ.'},
        {id:'sa_rw_1_5',partNumber:1,taskTypeVi:'Đúng/Sai',taskTypeEn:'Tick/Cross',prompt:'These are chairs.',options:['✓','✗'],answer:'✓',explanationVi:'Hình vẽ là ghế → đúng (✓).',strategyVi:'chairs = ghế (số nhiều).'}
      ]
    },
    { partNumber: 2, titleEn: 'Part 2: Look and read. Write yes or no.', titleVi: 'Phần 2: Nhìn tranh, viết yes/no.',
      instructionVi: 'Nhìn bức tranh lớn. Đọc câu. Viết "yes" hoặc "no".',
      questions: [
        {id:'sa_rw_2_1',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The man has got black hair and glasses.',options:['yes','no'],answer:'yes',explanationVi:'Ông có tóc đen và đeo kính.',strategyVi:'Kiểm tra 2 thông tin: tóc đen ✓, kính ✓ → yes.'},
        {id:'sa_rw_2_2',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'There is a lamp on the bookcase.',options:['yes','no'],answer:'yes',explanationVi:'Có đèn trên kệ sách.',strategyVi:'Nhìn kỹ: bookcase = kệ sách, lamp = đèn.'},
        {id:'sa_rw_2_3',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'Some of the children are singing.',options:['yes','no'],answer:'no',explanationVi:'Không có trẻ em nào đang hát.',strategyVi:'singing = hát. Kiểm tra hình xem có ai hát không.'},
        {id:'sa_rw_2_4',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The woman is holding some drinks.',options:['yes','no'],answer:'yes',explanationVi:'Người phụ nữ đang cầm đồ uống.',strategyVi:'holding = cầm. drinks = đồ uống.'},
        {id:'sa_rw_2_5',partNumber:2,taskTypeVi:'Yes/No',taskTypeEn:'Yes/No',prompt:'The cat is sleeping under an armchair.',options:['yes','no'],answer:'yes',explanationVi:'Con mèo đang ngủ dưới ghế bành.',strategyVi:'under = ở dưới. armchair = ghế bành.'}
      ]
    },
    { partNumber: 3, titleEn: 'Part 3: Spell the word', titleVi: 'Phần 3: Xếp chữ cái thành từ.',
      instructionVi: 'Nhìn hình. Sắp xếp các chữ cái thành từ đúng.',
      questions: [
        {id:'sa_rw_3_1',partNumber:3,taskTypeVi:'Ghép chữ',taskTypeEn:'Spelling',prompt:'Letters: d, u, c, k → ?',options:[],answer:'duck',explanationVi:'d-u-c-k = con vịt (duck).',strategyVi:'Nhìn hình con vật → ghép chữ.'},
        {id:'sa_rw_3_2',partNumber:3,taskTypeVi:'Ghép chữ',taskTypeEn:'Spelling',prompt:'Letters: m, o, u, s, e → ?',options:[],answer:'mouse',explanationVi:'m-o-u-s-e = con chuột (mouse).',strategyVi:'5 chữ cái → từ 5 chữ = mouse.'},
        {id:'sa_rw_3_3',partNumber:3,taskTypeVi:'Ghép chữ',taskTypeEn:'Spelling',prompt:'Letters: h, i, p, p, o → ?',options:[],answer:'hippo',explanationVi:'h-i-p-p-o = hà mã (hippo).',strategyVi:'2 chữ p liên tiếp → hippo.'},
        {id:'sa_rw_3_4',partNumber:3,taskTypeVi:'Ghép chữ',taskTypeEn:'Spelling',prompt:'Letters: m, o, n, k, e, y → ?',options:[],answer:'monkey',explanationVi:'m-o-n-k-e-y = con khỉ (monkey).',strategyVi:'6 chữ cái → monkey.'},
        {id:'sa_rw_3_5',partNumber:3,taskTypeVi:'Ghép chữ',taskTypeEn:'Spelling',prompt:'Letters: c, h, i, c, k, e, n → ?',options:[],answer:'chicken',explanationVi:'c-h-i-c-k-e-n = con gà (chicken).',strategyVi:'7 chữ cái → chicken.'}
      ]
    },
    { partNumber: 4, titleEn: 'Part 4: Read and choose', titleVi: 'Phần 4: Đọc về Lizards, chọn từ.',
      instructionVi: 'Đọc đoạn văn về thằn lằn (Lizards). Chọn từ trong khung điền vào chỗ trống.',
      questions: [
        {id:'sa_rw_4_1',partNumber:4,taskTypeVi:'Chọn từ',taskTypeEn:'Cloze',prompt:'Many lizards are green, grey or yellow. Some like eating (1) _____.',options:['spiders','legs','tail','trees','sand'],answer:'spiders',explanationVi:'Thằn lằn thích ăn nhện (spiders).',strategyVi:'Ăn → thức ăn: spiders (nhện).'},
        {id:'sa_rw_4_2',partNumber:4,taskTypeVi:'Chọn từ',taskTypeEn:'Cloze',prompt:'A lizard can run on its four (2) _____.',options:['spiders','legs','tail','trees','sand'],answer:'legs',explanationVi:'Chạy trên bốn chân (legs).',strategyVi:'four + body part = legs.'},
        {id:'sa_rw_4_3',partNumber:4,taskTypeVi:'Chọn từ',taskTypeEn:'Cloze',prompt:'...and it has a long (3) _____ at the end of its body.',options:['spiders','legs','tail','trees','sand'],answer:'tail',explanationVi:'Đuôi dài (long tail) ở cuối thân.',strategyVi:'long + end of body = tail.'},
        {id:'sa_rw_4_4',partNumber:4,taskTypeVi:'Chọn từ',taskTypeEn:'Cloze',prompt:'Many lizards live in (4) _____.',options:['spiders','legs','tail','trees','sand'],answer:'trees',explanationVi:'Nhiều thằn lằn sống trên cây (trees).',strategyVi:'live in + nơi ở: trees.'},
        {id:'sa_rw_4_5',partNumber:4,taskTypeVi:'Chọn từ',taskTypeEn:'Cloze',prompt:'...at the beach, you can find some lizards on the (5) _____.',options:['spiders','legs','tail','trees','sand'],answer:'sand',explanationVi:'Ở bãi biển, thằn lằn trên cát (sand).',strategyVi:'beach → sand. Từ còn lại cuối cùng.'}
      ]
    },
    { partNumber: 5, titleEn: 'Part 5: Look and write', titleVi: 'Phần 5: Nhìn tranh, viết 1 từ.',
      instructionVi: 'Nhìn tranh và trả lời câu hỏi bằng 1 từ.',
      questions: [
        {id:'sa_rw_5_1',partNumber:5,taskTypeVi:'Viết từ',taskTypeEn:'Write word',prompt:'What are the children playing with? Some toy _____',options:[],answer:'spiders',explanationVi:'Trẻ em chơi với nhện đồ chơi (toy spiders).',strategyVi:'Nhìn hình → xác định đồ chơi.'},
        {id:'sa_rw_5_2',partNumber:5,taskTypeVi:'Viết từ',taskTypeEn:'Write word',prompt:'What is Mum standing on? A _____',options:[],answer:'chair',explanationVi:'Mẹ đứng trên ghế (chair).',strategyVi:'standing on → vật dụng bên dưới.'},
        {id:'sa_rw_5_3',partNumber:5,taskTypeVi:'Viết từ',taskTypeEn:'Write word',prompt:'Where is the spider? On Mum\'s _____',options:[],answer:'shoe',explanationVi:'Nhện trên giày mẹ (shoe).',strategyVi:'on Mum\'s + body part/clothing.'},
        {id:'sa_rw_5_4',partNumber:5,taskTypeVi:'Viết từ',taskTypeEn:'Write word',prompt:'Who is pointing?',options:[],answer:'girl',explanationVi:'Bé gái đang chỉ tay (pointing).',strategyVi:'Nhìn hình → ai đang chỉ tay?'},
        {id:'sa_rw_5_5',partNumber:5,taskTypeVi:'Viết từ',taskTypeEn:'Write word',prompt:'Where are the children? In the _____',options:[],answer:'garden',explanationVi:'Trẻ em ở trong vườn (garden).',strategyVi:'Nhìn cảnh → ngoài trời = garden.'}
      ]
    }
  ]
};
