// Year 1 Integrated Curriculum — Henry's School Program
// English: Macmillan English 1 (Fluency + Language + Practice)
// Math: Pearson Abacus Year 1 (Workbooks 1-3)
// Science: Science Bug Pupil Book Year 1

export interface CurriculumUnit {
  id: string;
  unitNumber: number;
  titleEn: string;
  titleVi: string;
  subject: 'english' | 'math' | 'science';
  book: string;
  term: 1 | 2 | 3;
  topics: CurriculumTopic[];
  iconEmoji: string;
}

export interface VocabItem {
  word: string;
  meaning: string;
  example?: string;
  imageEmoji?: string;
}

export interface QuizItem {
  question: string;
  options: string[];
  answer: string;
  explanationVi?: string;
}

export interface InteractiveContent {
  vocabCards?: VocabItem[];
  quizzes?: QuizItem[];
  readingText?: string;
  instructions?: string[];
}

export interface CurriculumTopic {
  id: string;
  titleEn: string;
  titleVi: string;
  type: 'lesson' | 'activity' | 'practice' | 'review';
  keyVocab?: string[];
  objectives?: string[];
  completed?: boolean;
  interactive?: InteractiveContent;
}

// ═══ ENGLISH — Macmillan English 1 ═══
const ENGLISH_UNITS: CurriculumUnit[] = [
  { id:'en_u1', unitNumber:1, titleEn:'My Family and Me', titleVi:'Gia đình và Bé', subject:'english', book:'Macmillan English 1', term:1, iconEmoji:'👨‍👩‍👧‍👦',
    topics:[
      {id:'en1_1',titleEn:'The island of adventure (Fluency)',titleVi:'Đảo phiêu lưu',type:'lesson',keyVocab:['family','mother','father','sister','brother']},
      {id:'en1_2',titleEn:'My family and me (Language)',titleVi:'Gia đình tôi',type:'lesson',objectives:['Introduce yourself','Name family members','Simple sentences: I am...']},
      {id:'en1_3',titleEn:'Autobiography writing',titleVi:'Viết về bản thân',type:'activity',objectives:['Write name and age','Draw family picture','Label family members']},
      {id:'en1_4',titleEn:'Phonics: Letter sounds a-f',titleVi:'Phát âm: a đến f',type:'practice',keyVocab:['apple','ball','cat','dog','egg','fish']},
      {id:'en1_r',titleEn:'Practice Book exercises',titleVi:'Bài tập thực hành',type:'practice'},
    ]},
  { id:'en_u2', unitNumber:2, titleEn:"Sam's House / A New Room", titleVi:'Nhà của Sam / Phòng mới', subject:'english', book:'Macmillan English 1', term:1, iconEmoji:'🏠',
    topics:[
      {id:'en2_1',titleEn:"Sam's house (Fluency)",titleVi:'Nhà của Sam',type:'lesson',keyVocab:['house','room','door','window','bed','table']},
      {id:'en2_2',titleEn:'A new room for Amy (Language)',titleVi:'Phòng mới cho Amy',type:'lesson',objectives:['Describe rooms','Prepositions: in, on, under','There is / There are']},
      {id:'en2_3',titleEn:'Descriptive text & Poem',titleVi:'Văn miêu tả & Thơ',type:'activity'},
      {id:'en2_4',titleEn:'Phonics: Letter sounds g-l',titleVi:'Phát âm: g đến l',type:'practice',keyVocab:['girl','hat','ice','jug','kite','lion']},
      {id:'en2_r',titleEn:'Practice Book exercises',titleVi:'Bài tập thực hành',type:'practice'},
    ]},
  { id:'en_u3', unitNumber:3, titleEn:'The Moon and the Stars', titleVi:'Mặt trăng và Những ngôi sao', subject:'english', book:'Macmillan English 1', term:1, iconEmoji:'🌙',
    topics:[
      {id:'en3_1',titleEn:'The moon and the stars (Fluency)',titleVi:'Mặt trăng và sao',type:'lesson',keyVocab:['moon','star','sky','night','dark','light']},
      {id:'en3_2',titleEn:'Can the moon see me? (Poem)',titleVi:'Mặt trăng có thấy tôi?',type:'lesson',objectives:['Read poem aloud','Rhyming words','Question words: Can...?']},
      {id:'en3_3',titleEn:'Phonics: Letter sounds m-r',titleVi:'Phát âm: m đến r',type:'practice',keyVocab:['mouse','nose','orange','pen','queen','rabbit']},
      {id:'en3_r',titleEn:'Revision Units 1-3',titleVi:'Ôn tập bài 1-3',type:'review'},
    ]},
  { id:'en_u4', unitNumber:4, titleEn:"Sam's Garden / My Secret Garden", titleVi:'Vườn của Sam', subject:'english', book:'Macmillan English 1', term:2, iconEmoji:'🌻',
    topics:[
      {id:'en4_1',titleEn:"Sam's garden (Fluency)",titleVi:'Vườn của Sam',type:'lesson',keyVocab:['garden','flower','tree','grass','butterfly','bee']},
      {id:'en4_2',titleEn:'My secret garden (Information)',titleVi:'Khu vườn bí mật',type:'lesson',objectives:['Nature vocabulary','Colours in nature','Simple information text']},
      {id:'en4_3',titleEn:'Phonics: Letter sounds s-z',titleVi:'Phát âm: s đến z',type:'practice',keyVocab:['sun','tiger','umbrella','van','watch','xylophone','yo-yo','zebra']},
      {id:'en4_r',titleEn:'Practice Book exercises',titleVi:'Bài tập thực hành',type:'practice'},
    ]},
  { id:'en_u5', unitNumber:5, titleEn:"Sam's Island / Where is my house?", titleVi:'Đảo của Sam', subject:'english', book:'Macmillan English 1', term:2, iconEmoji:'🏝️',
    topics:[
      {id:'en5_1',titleEn:"Sam's island (Fluency)",titleVi:'Đảo của Sam',type:'lesson',keyVocab:['island','sea','sand','shell','boat','swim']},
      {id:'en5_2',titleEn:'Where is my house? (Puzzle poem)',titleVi:'Nhà tôi ở đâu?',type:'lesson',objectives:['Prepositions of place','Question: Where is...?','Puzzle-solving']},
      {id:'en5_r',titleEn:'Practice Book exercises',titleVi:'Bài tập thực hành',type:'practice'},
    ]},
  { id:'en_u6', unitNumber:6, titleEn:'On the Beach / We love the beach', titleVi:'Trên bãi biển', subject:'english', book:'Macmillan English 1', term:2, iconEmoji:'🏖️',
    topics:[
      {id:'en6_1',titleEn:'On the beach (Fluency)',titleVi:'Trên bãi biển',type:'lesson',keyVocab:['beach','wave','crab','seagull','sunhat','towel']},
      {id:'en6_2',titleEn:'We love the beach (Story)',titleVi:'Chúng ta thích biển',type:'lesson',objectives:['Story elements','Past tense intro','Feelings vocabulary']},
      {id:'en6_r',titleEn:'Revision Units 4-6',titleVi:'Ôn tập bài 4-6',type:'review'},
    ]},
  { id:'en_u7', unitNumber:7, titleEn:"Do or Don't?", titleVi:'Nên và Không nên', subject:'english', book:'Macmillan English 1', term:3, iconEmoji:'✅',
    topics:[
      {id:'en7_1',titleEn:"Do or don't? (Fluency)",titleVi:'Nên hay không nên',type:'lesson',keyVocab:['do','dont','must','rules','careful','safe']},
      {id:'en7_2',titleEn:'Imperatives & Rules (Language)',titleVi:'Câu mệnh lệnh & Luật lệ',type:'lesson',objectives:['Imperatives: Do/Don\'t','School rules','Safety rules']},
      {id:'en7_r',titleEn:'Practice Book exercises',titleVi:'Bài tập thực hành',type:'practice'},
    ]},
  { id:'en_u8', unitNumber:8, titleEn:'Monkey Fun / Where are the animals?', titleVi:'Khỉ vui nhộn / Thú ở đâu?', subject:'english', book:'Macmillan English 1', term:3, iconEmoji:'🐒',
    topics:[
      {id:'en8_1',titleEn:'Monkey fun (Fluency)',titleVi:'Khỉ vui nhộn',type:'lesson',keyVocab:['monkey','elephant','giraffe','lion','parrot','snake']},
      {id:'en8_2',titleEn:'Where are the animals? (Information)',titleVi:'Thú ở đâu?',type:'lesson',objectives:['Animal habitats','Plural nouns','Information text reading']},
      {id:'en8_r',titleEn:'Practice Book exercises',titleVi:'Bài tập thực hành',type:'practice'},
    ]},
  { id:'en_u9', unitNumber:9, titleEn:'In the Cave / Playtime', titleVi:'Trong hang / Giờ chơi', subject:'english', book:'Macmillan English 1', term:3, iconEmoji:'🕳️',
    topics:[
      {id:'en9_1',titleEn:'In the cave (Fluency)',titleVi:'Trong hang động',type:'lesson',keyVocab:['cave','dark','torch','explore','adventure','treasure']},
      {id:'en9_2',titleEn:'Playtime (Descriptive text)',titleVi:'Giờ chơi',type:'lesson',objectives:['Descriptive writing','Adjectives','End-of-year review']},
      {id:'en9_r',titleEn:'Revision Units 7-9',titleVi:'Ôn tập bài 7-9',type:'review'},
    ]},
];

// ═══ MATH — Pearson Abacus Year 1 ═══
const MATH_UNITS: CurriculumUnit[] = [
  { id:'ma_u1', unitNumber:1, titleEn:'Counting & Place Value (0-10)', titleVi:'Đếm & Giá trị hàng (0-10)', subject:'math', book:'Abacus Workbook 1', term:1, iconEmoji:'🔢',
    topics:[
      {id:'ma1_1',titleEn:'Count objects to 10',titleVi:'Đếm đồ vật đến 10',type:'lesson',objectives:['1-to-1 correspondence','Count forwards/backwards']},
      {id:'ma1_2',titleEn:'Read and write numbers 0-10',titleVi:'Đọc và viết số 0-10',type:'lesson'},
      {id:'ma1_3',titleEn:'Number lines',titleVi:'Trục số',type:'activity'},
      {id:'ma1_4',titleEn:'Comparing: more, fewer, same',titleVi:'So sánh: nhiều, ít, bằng',type:'practice'},
    ]},
  { id:'ma_u2', unitNumber:2, titleEn:'Addition within 10', titleVi:'Phép cộng trong phạm vi 10', subject:'math', book:'Abacus Workbook 1', term:1, iconEmoji:'➕',
    topics:[
      {id:'ma2_1',titleEn:'Adding by counting on',titleVi:'Cộng bằng đếm tiếp',type:'lesson',objectives:['Count on from a number','Use number line']},
      {id:'ma2_2',titleEn:'Addition stories',titleVi:'Bài toán cộng có lời văn',type:'lesson'},
      {id:'ma2_3',titleEn:'Number bonds to 10',titleVi:'Cặp số tạo thành 10',type:'practice',keyVocab:['1+9','2+8','3+7','4+6','5+5']},
    ]},
  { id:'ma_u3', unitNumber:3, titleEn:'Subtraction within 10', titleVi:'Phép trừ trong phạm vi 10', subject:'math', book:'Abacus Workbook 1', term:1, iconEmoji:'➖',
    topics:[
      {id:'ma3_1',titleEn:'Taking away',titleVi:'Bớt đi',type:'lesson',objectives:['Subtract by counting back','Use objects']},
      {id:'ma3_2',titleEn:'Finding the difference',titleVi:'Tìm hiệu',type:'lesson'},
      {id:'ma3_3',titleEn:'Subtraction stories',titleVi:'Bài toán trừ có lời văn',type:'practice'},
    ]},
  { id:'ma_u4', unitNumber:4, titleEn:'2D and 3D Shapes', titleVi:'Hình phẳng và Hình khối', subject:'math', book:'Abacus Workbook 1', term:1, iconEmoji:'🔷',
    topics:[
      {id:'ma4_1',titleEn:'Recognise 2D shapes',titleVi:'Nhận biết hình phẳng',type:'lesson',keyVocab:['circle','square','triangle','rectangle']},
      {id:'ma4_2',titleEn:'Recognise 3D shapes',titleVi:'Nhận biết hình khối',type:'lesson',keyVocab:['cube','cuboid','sphere','cylinder','cone']},
      {id:'ma4_3',titleEn:'Sort shapes by properties',titleVi:'Phân loại hình theo tính chất',type:'activity'},
    ]},
  { id:'ma_u5', unitNumber:5, titleEn:'Place Value (11-20)', titleVi:'Giá trị hàng (11-20)', subject:'math', book:'Abacus Workbook 2', term:2, iconEmoji:'🔟',
    topics:[
      {id:'ma5_1',titleEn:'Counting 11-20',titleVi:'Đếm 11-20',type:'lesson',objectives:['Teens = 10 + ones','Read/write 11-20']},
      {id:'ma5_2',titleEn:'Tens and ones',titleVi:'Hàng chục và hàng đơn vị',type:'lesson'},
      {id:'ma5_3',titleEn:'Ordering numbers to 20',titleVi:'Sắp xếp số đến 20',type:'practice'},
    ]},
  { id:'ma_u6', unitNumber:6, titleEn:'Addition & Subtraction (to 20)', titleVi:'Cộng & Trừ (đến 20)', subject:'math', book:'Abacus Workbook 2', term:2, iconEmoji:'🧮',
    topics:[
      {id:'ma6_1',titleEn:'Add within 20',titleVi:'Cộng trong phạm vi 20',type:'lesson'},
      {id:'ma6_2',titleEn:'Subtract within 20',titleVi:'Trừ trong phạm vi 20',type:'lesson'},
      {id:'ma6_3',titleEn:'Word problems',titleVi:'Bài toán có lời văn',type:'practice'},
      {id:'ma6_4',titleEn:'Missing numbers',titleVi:'Tìm số thiếu',type:'practice'},
    ]},
  { id:'ma_u7', unitNumber:7, titleEn:'Measurement: Length & Weight', titleVi:'Đo lường: Độ dài & Khối lượng', subject:'math', book:'Abacus Workbook 2', term:2, iconEmoji:'📏',
    topics:[
      {id:'ma7_1',titleEn:'Compare lengths',titleVi:'So sánh độ dài',type:'lesson',keyVocab:['long','short','tall','longer','shorter']},
      {id:'ma7_2',titleEn:'Compare weights',titleVi:'So sánh khối lượng',type:'lesson',keyVocab:['heavy','light','heavier','lighter']},
      {id:'ma7_3',titleEn:'Measuring with non-standard units',titleVi:'Đo bằng đơn vị phi chuẩn',type:'activity'},
    ]},
  { id:'ma_u8', unitNumber:8, titleEn:'Time', titleVi:'Thời gian', subject:'math', book:'Abacus Workbook 2', term:2, iconEmoji:'🕐',
    topics:[
      {id:'ma8_1',titleEn:"O'clock times",titleVi:'Giờ đúng',type:'lesson',objectives:["Read o'clock on analog clock"]},
      {id:'ma8_2',titleEn:'Half past times',titleVi:'Giờ rưỡi',type:'lesson'},
      {id:'ma8_3',titleEn:'Days of the week',titleVi:'Các ngày trong tuần',type:'practice',keyVocab:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']},
    ]},
  { id:'ma_u9', unitNumber:9, titleEn:'Numbers to 50', titleVi:'Số đến 50', subject:'math', book:'Abacus Workbook 3', term:3, iconEmoji:'5️⃣',
    topics:[
      {id:'ma9_1',titleEn:'Counting to 50',titleVi:'Đếm đến 50',type:'lesson'},
      {id:'ma9_2',titleEn:'Counting in 2s, 5s, 10s',titleVi:'Đếm cách 2, 5, 10',type:'lesson'},
      {id:'ma9_3',titleEn:'One more, one less',titleVi:'Thêm 1, bớt 1',type:'practice'},
    ]},
  { id:'ma_u10', unitNumber:10, titleEn:'Money', titleVi:'Tiền tệ', subject:'math', book:'Abacus Workbook 3', term:3, iconEmoji:'💰',
    topics:[
      {id:'ma10_1',titleEn:'Recognise coins',titleVi:'Nhận biết tiền xu',type:'lesson',keyVocab:['1p','2p','5p','10p','20p','50p','£1']},
      {id:'ma10_2',titleEn:'Counting coins',titleVi:'Đếm tiền xu',type:'practice'},
      {id:'ma10_3',titleEn:'Simple shopping problems',titleVi:'Bài toán mua sắm đơn giản',type:'activity'},
    ]},
  { id:'ma_u11', unitNumber:11, titleEn:'Fractions: Halves & Quarters', titleVi:'Phân số: Một nửa & Một phần tư', subject:'math', book:'Abacus Workbook 3', term:3, iconEmoji:'🍕',
    topics:[
      {id:'ma11_1',titleEn:'Find half of a shape',titleVi:'Tìm nửa hình',type:'lesson'},
      {id:'ma11_2',titleEn:'Find quarter of a shape',titleVi:'Tìm một phần tư hình',type:'lesson'},
      {id:'ma11_3',titleEn:'Half and quarter of amounts',titleVi:'Nửa và một phần tư số lượng',type:'practice'},
    ]},
  { id:'ma_u12', unitNumber:12, titleEn:'Position & Direction', titleVi:'Vị trí & Hướng', subject:'math', book:'Abacus Workbook 3', term:3, iconEmoji:'🧭',
    topics:[
      {id:'ma12_1',titleEn:'Left, right, above, below',titleVi:'Trái, phải, trên, dưới',type:'lesson',keyVocab:['left','right','above','below','between','next to']},
      {id:'ma12_2',titleEn:'Turns: whole, half, quarter',titleVi:'Xoay: cả vòng, nửa, phần tư',type:'lesson'},
    ]},
];

// ═══ SCIENCE — Science Bug Year 1 ═══
const SCIENCE_UNITS: CurriculumUnit[] = [
  { id:'sc_u1', unitNumber:1, titleEn:'Plants', titleVi:'Thực vật', subject:'science', book:'Science Bug Year 1', term:1, iconEmoji:'🌱',
    topics:[
      {id:'sc1_1',titleEn:'What is a plant?',titleVi:'Cây là gì?',type:'lesson',keyVocab:['plant','leaf','stem','root','flower','petal']},
      {id:'sc1_2',titleEn:'Parts of a plant',titleVi:'Các bộ phận của cây',type:'lesson',objectives:['Label plant parts','Identify roots, stem, leaf, flower']},
      {id:'sc1_3',titleEn:'Wild plants vs Garden plants',titleVi:'Cây dại và cây trồng',type:'lesson'},
      {id:'sc1_4',titleEn:'Trees: deciduous & evergreen',titleVi:'Cây rụng lá & cây thường xanh',type:'lesson',keyVocab:['deciduous','evergreen','trunk','branch','bark']},
      {id:'sc1_5',titleEn:'Plant investigation',titleVi:'Thí nghiệm: Cây cần gì để sống?',type:'activity'},
    ]},
  { id:'sc_u2', unitNumber:2, titleEn:'Animals including Humans', titleVi:'Động vật và Con người', subject:'science', book:'Science Bug Year 1', term:1, iconEmoji:'🐾',
    topics:[
      {id:'sc2_1',titleEn:'Animal groups: fish, birds, mammals',titleVi:'Nhóm động vật: cá, chim, thú',type:'lesson',keyVocab:['fish','amphibian','reptile','bird','mammal']},
      {id:'sc2_2',titleEn:'Carnivores, herbivores, omnivores',titleVi:'Ăn thịt, ăn cỏ, ăn tạp',type:'lesson'},
      {id:'sc2_3',titleEn:'Human body parts',titleVi:'Các bộ phận cơ thể người',type:'lesson',keyVocab:['head','arm','leg','hand','foot','eye','ear','nose','mouth']},
      {id:'sc2_4',titleEn:'Our five senses',titleVi:'Năm giác quan',type:'lesson',keyVocab:['see','hear','smell','taste','touch']},
      {id:'sc2_5',titleEn:'Senses investigation',titleVi:'Thí nghiệm giác quan',type:'activity'},
    ]},
  { id:'sc_u3', unitNumber:3, titleEn:'Everyday Materials', titleVi:'Vật liệu quanh ta', subject:'science', book:'Science Bug Year 1', term:2, iconEmoji:'🧱',
    topics:[
      {id:'sc3_1',titleEn:'Objects and materials',titleVi:'Đồ vật và vật liệu',type:'lesson',keyVocab:['wood','plastic','glass','metal','fabric','paper']},
      {id:'sc3_2',titleEn:'Properties of materials',titleVi:'Tính chất vật liệu',type:'lesson',keyVocab:['hard','soft','rough','smooth','shiny','dull','bendy','stiff']},
      {id:'sc3_3',titleEn:'Choosing the right material',titleVi:'Chọn vật liệu phù hợp',type:'activity'},
      {id:'sc3_4',titleEn:'Waterproof investigation',titleVi:'Thí nghiệm chống nước',type:'activity'},
    ]},
  { id:'sc_u4', unitNumber:4, titleEn:'Seasonal Changes: Autumn & Winter', titleVi:'Thay đổi mùa: Thu & Đông', subject:'science', book:'Science Bug Year 1', term:2, iconEmoji:'🍂',
    topics:[
      {id:'sc4_1',titleEn:'The four seasons',titleVi:'Bốn mùa',type:'lesson',keyVocab:['spring','summer','autumn','winter']},
      {id:'sc4_2',titleEn:'Autumn changes',titleVi:'Thay đổi mùa thu',type:'lesson'},
      {id:'sc4_3',titleEn:'Winter weather',titleVi:'Thời tiết mùa đông',type:'lesson',keyVocab:['cold','frost','ice','snow','wind']},
      {id:'sc4_4',titleEn:'Day length changes',titleVi:'Ngày dài ngắn thay đổi',type:'lesson'},
    ]},
  { id:'sc_u5', unitNumber:5, titleEn:'Seasonal Changes: Spring & Summer', titleVi:'Thay đổi mùa: Xuân & Hè', subject:'science', book:'Science Bug Year 1', term:3, iconEmoji:'🌸',
    topics:[
      {id:'sc5_1',titleEn:'Spring changes',titleVi:'Thay đổi mùa xuân',type:'lesson',keyVocab:['blossom','bud','lamb','chick','nest']},
      {id:'sc5_2',titleEn:'Summer weather',titleVi:'Thời tiết mùa hè',type:'lesson'},
      {id:'sc5_3',titleEn:'Weather diary',titleVi:'Nhật ký thời tiết',type:'activity'},
      {id:'sc5_4',titleEn:'Seasons comparison',titleVi:'So sánh các mùa',type:'review'},
    ]},
  { id:'sc_u6', unitNumber:6, titleEn:'Growing Plants', titleVi:'Trồng cây', subject:'science', book:'Science Bug Year 1', term:3, iconEmoji:'🌻',
    topics:[
      {id:'sc6_1',titleEn:'What do plants need?',titleVi:'Cây cần gì?',type:'lesson',keyVocab:['water','sunlight','soil','warmth']},
      {id:'sc6_2',titleEn:'Grow a bean investigation',titleVi:'Thí nghiệm trồng đậu',type:'activity'},
      {id:'sc6_3',titleEn:'Recording observations',titleVi:'Ghi chép quan sát',type:'practice'},
      {id:'sc6_4',titleEn:'Year 1 Science review',titleVi:'Ôn tập Khoa học lớp 1',type:'review'},
    ]},
];

export const YEAR1_CURRICULUM = {
  english: { units: ENGLISH_UNITS, bookList: ['Macmillan English 1 Fluency Book','Macmillan English 1 Language Book','Macmillan English 1 Practice Book + CD'] },
  math: { units: MATH_UNITS, bookList: ['Pearson Abacus Year 1 Workbook 1','Pearson Abacus Year 1 Workbook 2','Pearson Abacus Year 1 Workbook 3'] },
  science: { units: SCIENCE_UNITS, bookList: ['Science Bug Pupil Book Year 1'] },
};

export const ALL_YEAR1_UNITS = [...ENGLISH_UNITS, ...MATH_UNITS, ...SCIENCE_UNITS];
export const YEAR1_STATS = {
  totalUnits: ALL_YEAR1_UNITS.length,
  totalTopics: ALL_YEAR1_UNITS.reduce((s,u) => s + u.topics.length, 0),
  english: { units: ENGLISH_UNITS.length, topics: ENGLISH_UNITS.reduce((s,u) => s + u.topics.length, 0) },
  math: { units: MATH_UNITS.length, topics: MATH_UNITS.reduce((s,u) => s + u.topics.length, 0) },
  science: { units: SCIENCE_UNITS.length, topics: SCIENCE_UNITS.reduce((s,u) => s + u.topics.length, 0) },
};
