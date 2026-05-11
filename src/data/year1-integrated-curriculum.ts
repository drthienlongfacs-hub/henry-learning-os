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
  { id:'en_u5', unitNumber:5, titleEn:"Sam's Island / Where is my house?", titleVi:'Đảo của Sam / Nhà tôi ở đâu?', subject:'english', book:'Macmillan English 1', term:2, iconEmoji:'🏝️',
    topics:[
      {id:'en5_1',titleEn:"Sam's island (Fluency)",titleVi:'Đảo của Sam',type:'lesson',keyVocab:['island','sea','sand','shell','boat','swim']},
      {id:'en5_2',titleEn:'Where is my house? (Puzzle poem)',titleVi:'Nhà tôi ở đâu? (Thơ đố)',type:'lesson',objectives:['Prepositions of place','Question: Where is...?','Puzzle-solving']},
      {id:'en5_3',titleEn:'Sight words & word building',titleVi:'Từ thông dụng & ghép từ',type:'practice',keyVocab:['the','is','my','on','in','at','it','and'],objectives:['Recognise high-frequency words','Build CVC words','Read sight words fluently']},
      {id:'en5_4',titleEn:'Writing: Describe your island',titleVi:'Viết: Mô tả hòn đảo của em',type:'activity',objectives:['Use adjectives','Write 3-4 sentences','Draw and label']},
      {id:'en5_r',titleEn:'Practice Book exercises',titleVi:'Bài tập thực hành',type:'practice'},
    ]},
  { id:'en_u6', unitNumber:6, titleEn:'On the Beach / We love the beach', titleVi:'Trên bãi biển', subject:'english', book:'Macmillan English 1', term:2, iconEmoji:'🏖️',
    topics:[
      {id:'en6_1',titleEn:'On the beach (Fluency)',titleVi:'Trên bãi biển',type:'lesson',keyVocab:['beach','wave','crab','seagull','sunhat','towel']},
      {id:'en6_2',titleEn:'We love the beach (Story)',titleVi:'Chúng ta thích biển',type:'lesson',objectives:['Story elements','Past tense intro','Feelings vocabulary']},
      {id:'en6_3',titleEn:'Writing: Beach postcard',titleVi:'Viết: Bưu thiếp từ biển',type:'activity',objectives:['Postcard format','Use I saw... I liked...','Descriptive sentences']},
      {id:'en6_4',titleEn:'Practice Book exercises',titleVi:'Bài tập thực hành',type:'practice'},
      {id:'en6_r',titleEn:'Revision Units 4-6',titleVi:'Ôn tập bài 4-6',type:'review'},
    ]},
  { id:'en_u7', unitNumber:7, titleEn:"Do or Don't?", titleVi:'Nên và Không nên', subject:'english', book:'Macmillan English 1', term:3, iconEmoji:'✅',
    topics:[
      {id:'en7_1',titleEn:"Do or don't? (Fluency)",titleVi:'Nên hay không nên',type:'lesson',keyVocab:['do','dont','must','rules','careful','safe']},
      {id:'en7_2',titleEn:'Imperatives & Rules (Language)',titleVi:'Câu mệnh lệnh & Luật lệ',type:'lesson',objectives:['Imperatives: Do/Don\'t','School rules','Safety rules']},
      {id:'en7_3',titleEn:'Writing: Class rules poster',titleVi:'Viết: Áp phích nội quy lớp',type:'activity',objectives:['Write rules with Do/Don\'t','Design a poster','Use imperative sentences']},
      {id:'en7_r',titleEn:'Practice Book exercises',titleVi:'Bài tập thực hành',type:'practice'},
    ]},
  { id:'en_u8', unitNumber:8, titleEn:'Monkey Fun / Where are the animals?', titleVi:'Khỉ vui nhộn / Thú ở đâu?', subject:'english', book:'Macmillan English 1', term:3, iconEmoji:'🐒',
    topics:[
      {id:'en8_1',titleEn:'Monkey fun (Fluency)',titleVi:'Khỉ vui nhộn',type:'lesson',keyVocab:['monkey','elephant','giraffe','lion','parrot','snake']},
      {id:'en8_2',titleEn:'Where are the animals? (Information)',titleVi:'Thú ở đâu?',type:'lesson',objectives:['Animal habitats','Plural nouns','Information text reading']},
      {id:'en8_3',titleEn:'Writing: My favourite animal',titleVi:'Viết: Con vật em yêu thích',type:'activity',objectives:['Write 3-4 sentences about an animal','Use adjectives (big, small, fast)','Draw and label animal parts']},
      {id:'en8_r',titleEn:'Practice Book exercises',titleVi:'Bài tập thực hành',type:'practice'},
    ]},
  { id:'en_u9', unitNumber:9, titleEn:'In the Cave / Playtime', titleVi:'Trong hang / Giờ chơi', subject:'english', book:'Macmillan English 1', term:3, iconEmoji:'🕳️',
    topics:[
      {id:'en9_1',titleEn:'In the cave (Fluency)',titleVi:'Trong hang động',type:'lesson',keyVocab:['cave','dark','torch','explore','adventure','treasure']},
      {id:'en9_2',titleEn:'Playtime (Descriptive text)',titleVi:'Giờ chơi (Văn miêu tả)',type:'lesson',objectives:['Descriptive writing','Adjectives','End-of-year review']},
      {id:'en9_3',titleEn:'Writing: My adventure story',titleVi:'Viết: Câu chuyện phiêu lưu của em',type:'activity',objectives:['Story beginning, middle, end','Use time words (first, then, finally)','Creative writing']},
      {id:'en9_r',titleEn:'Revision Units 7-9',titleVi:'Ôn tập bài 7-9',type:'review'},
    ]},
];

const MATH_UNITS: CurriculumUnit[] = [
  { id:'ma_u1', unitNumber:1, titleEn:'Counting & Place Value (0-10)', titleVi:'Đếm & Giá trị hàng (0-10)', subject:'math', book:'Abacus Workbook 1', term:1, iconEmoji:'🔢',
    topics:[
      {id:'ma1_1',titleEn:'Count objects to 10',titleVi:'Đếm đồ vật đến 10',type:'lesson',objectives:['1-to-1 correspondence','Count forwards 1→10','Count backwards 10→1'],keyVocab:['count','number','one','two','three','four','five']},
      {id:'ma1_2',titleEn:'Read and write numbers 0-10',titleVi:'Đọc và viết số 0-10',type:'lesson',objectives:['Recognise numerals 0-10','Write numerals correctly','Match numeral to quantity'],keyVocab:['zero','six','seven','eight','nine','ten']},
      {id:'ma1_3',titleEn:'Number lines',titleVi:'Trục số',type:'activity',objectives:['Place numbers on a number line','Find numbers that come before/after','Jump along a number line'],keyVocab:['number line','before','after','between']},
      {id:'ma1_4',titleEn:'Comparing: more, fewer, same',titleVi:'So sánh: nhiều, ít, bằng',type:'practice',objectives:['Compare two groups of objects','Use words: more, fewer, same','Order groups from smallest to largest'],keyVocab:['more','fewer','less','same','equal']},
    ]},
  { id:'ma_u2', unitNumber:2, titleEn:'Addition within 10', titleVi:'Phép cộng trong phạm vi 10', subject:'math', book:'Abacus Workbook 1', term:1, iconEmoji:'➕',
    topics:[
      {id:'ma2_1',titleEn:'Adding by counting on',titleVi:'Cộng bằng đếm tiếp',type:'lesson',objectives:['Count on from a number','Use number line for addition','Add two small numbers'],keyVocab:['add','plus','equals','count on','total']},
      {id:'ma2_2',titleEn:'Addition stories',titleVi:'Bài toán cộng có lời văn',type:'lesson',objectives:['Read a word problem','Find the numbers to add','Write the number sentence'],keyVocab:['altogether','how many','in total','and']},
      {id:'ma2_3',titleEn:'Number bonds to 10',titleVi:'Cặp số tạo thành 10',type:'practice',keyVocab:['1+9','2+8','3+7','4+6','5+5'],objectives:['Know all number bonds to 10 by heart','Use bonds to calculate quickly','Spot patterns in number bonds']},
    ]},
  { id:'ma_u3', unitNumber:3, titleEn:'Subtraction within 10', titleVi:'Phép trừ trong phạm vi 10', subject:'math', book:'Abacus Workbook 1', term:1, iconEmoji:'➖',
    topics:[
      {id:'ma3_1',titleEn:'Taking away',titleVi:'Bớt đi',type:'lesson',objectives:['Subtract by counting back','Use objects to take away','Write subtraction sentences'],keyVocab:['subtract','take away','minus','left','remain']},
      {id:'ma3_2',titleEn:'Finding the difference',titleVi:'Tìm hiệu',type:'lesson',objectives:['Compare two amounts','Count up to find the difference','Use a number line to compare'],keyVocab:['difference','compare','how many more','how many fewer']},
      {id:'ma3_3',titleEn:'Subtraction stories',titleVi:'Bài toán trừ có lời văn',type:'practice',objectives:['Read subtraction word problems','Choose the right operation','Check answers by adding back'],keyVocab:['left over','remaining','flew away','ate']},
    ]},
  { id:'ma_u4', unitNumber:4, titleEn:'2D and 3D Shapes', titleVi:'Hình phẳng và Hình khối', subject:'math', book:'Abacus Workbook 1', term:1, iconEmoji:'🔷',
    topics:[
      {id:'ma4_1',titleEn:'Recognise 2D shapes',titleVi:'Nhận biết hình phẳng',type:'lesson',keyVocab:['circle','square','triangle','rectangle'],objectives:['Name 4 basic 2D shapes','Count sides and corners','Find shapes in the environment']},
      {id:'ma4_2',titleEn:'Recognise 3D shapes',titleVi:'Nhận biết hình khối',type:'lesson',keyVocab:['cube','cuboid','sphere','cylinder','cone'],objectives:['Name 5 basic 3D shapes','Identify faces, edges, vertices','Match 3D shapes to real objects']},
      {id:'ma4_3',titleEn:'Sort shapes by properties',titleVi:'Phân loại hình theo tính chất',type:'activity',objectives:['Sort shapes by number of sides','Sort by curved vs straight','Create shape patterns'],keyVocab:['sides','corners','flat','curved','face','edge']},
    ]},
  { id:'ma_u5', unitNumber:5, titleEn:'Place Value (11-20)', titleVi:'Giá trị hàng (11-20)', subject:'math', book:'Abacus Workbook 2', term:2, iconEmoji:'🔟',
    topics:[
      {id:'ma5_1',titleEn:'Counting 11-20',titleVi:'Đếm 11-20',type:'lesson',objectives:['Teens = 10 + ones','Read/write 11-20','Count objects in teen numbers'],keyVocab:['eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty']},
      {id:'ma5_2',titleEn:'Tens and ones',titleVi:'Hàng chục và hàng đơn vị',type:'lesson',objectives:['Split teen numbers into 10 + ones','Use place value chart','Understand tens and ones columns'],keyVocab:['tens','ones','place value','digit']},
      {id:'ma5_3',titleEn:'Ordering numbers to 20',titleVi:'Sắp xếp số đến 20',type:'practice',objectives:['Put numbers in order smallest to largest','Find missing numbers in a sequence','Compare two numbers using > < ='],keyVocab:['order','smallest','largest','greater than','less than']},
    ]},
  { id:'ma_u6', unitNumber:6, titleEn:'Addition & Subtraction (to 20)', titleVi:'Cộng & Trừ (đến 20)', subject:'math', book:'Abacus Workbook 2', term:2, iconEmoji:'🧮',
    topics:[
      {id:'ma6_1',titleEn:'Add within 20',titleVi:'Cộng trong phạm vi 20',type:'lesson',objectives:['Add by counting on past 10','Use number bonds to bridge 10','Check answers on a number line'],keyVocab:['add','plus','sum','bridge ten']},
      {id:'ma6_2',titleEn:'Subtract within 20',titleVi:'Trừ trong phạm vi 20',type:'lesson',objectives:['Subtract by counting back past 10','Use related addition facts','Check by counting up'],keyVocab:['subtract','minus','difference','count back']},
      {id:'ma6_3',titleEn:'Word problems',titleVi:'Bài toán có lời văn',type:'practice',objectives:['Read and understand the question','Choose add or subtract','Write a number sentence and solve'],keyVocab:['how many','altogether','left','more','fewer']},
      {id:'ma6_4',titleEn:'Missing numbers',titleVi:'Tìm số thiếu',type:'practice',objectives:['Find the missing number in _+3=7','Use inverse operations','Think systematically'],keyVocab:['missing number','unknown','solve','check']},
    ]},
  { id:'ma_u7', unitNumber:7, titleEn:'Measurement: Length & Weight', titleVi:'Đo lường: Độ dài & Khối lượng', subject:'math', book:'Abacus Workbook 2', term:2, iconEmoji:'📏',
    topics:[
      {id:'ma7_1',titleEn:'Compare lengths',titleVi:'So sánh độ dài',type:'lesson',keyVocab:['long','short','tall','longer','shorter'],objectives:['Compare two objects by length','Use words: longer, shorter, taller','Order 3 objects by length']},
      {id:'ma7_2',titleEn:'Compare weights',titleVi:'So sánh khối lượng',type:'lesson',keyVocab:['heavy','light','heavier','lighter'],objectives:['Hold objects to compare weight','Use a balance scale','Order objects from lightest to heaviest']},
      {id:'ma7_3',titleEn:'Measuring with non-standard units',titleVi:'Đo bằng đơn vị phi chuẩn',type:'activity',objectives:['Measure using cubes, hands, feet','Record measurements','Understand why standard units are needed'],keyVocab:['measure','unit','cubes','hands','length']},
    ]},
  { id:'ma_u8', unitNumber:8, titleEn:'Time', titleVi:'Thời gian', subject:'math', book:'Abacus Workbook 2', term:2, iconEmoji:'🕐',
    topics:[
      {id:'ma8_1',titleEn:"O'clock times",titleVi:'Giờ đúng',type:'lesson',objectives:["Read o'clock on analog clock","Know the hour hand points to the number","Tell the time for daily routines"],keyVocab:["o'clock",'hour hand','minute hand','clock face']},
      {id:'ma8_2',titleEn:'Half past times',titleVi:'Giờ rưỡi',type:'lesson',objectives:['Read half past on analog clock','Know the minute hand points to 6','Sequence daily events by time'],keyVocab:['half past','30 minutes','afternoon','morning']},
      {id:'ma8_3',titleEn:'Days of the week',titleVi:'Các ngày trong tuần',type:'practice',keyVocab:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],objectives:['Name all 7 days in order','Know today, yesterday, tomorrow','Understand a weekly timetable']},
    ]},
  { id:'ma_u9', unitNumber:9, titleEn:'Numbers to 50', titleVi:'Số đến 50', subject:'math', book:'Abacus Workbook 3', term:3, iconEmoji:'5️⃣',
    topics:[
      {id:'ma9_1',titleEn:'Counting to 50',titleVi:'Đếm đến 50',type:'lesson',objectives:['Count forwards to 50','Count backwards from 50','Read and write numbers to 50'],keyVocab:['twenty','thirty','forty','fifty']},
      {id:'ma9_2',titleEn:'Counting in 2s, 5s, 10s',titleVi:'Đếm cách 2, 5, 10',type:'lesson',objectives:['Count in steps of 2: 2,4,6,8,10...','Count in steps of 5: 5,10,15,20...','Count in steps of 10: 10,20,30,40,50'],keyVocab:['skip count','pattern','sequence','step']},
      {id:'ma9_3',titleEn:'One more, one less',titleVi:'Thêm 1, bớt 1',type:'practice',objectives:['Find 1 more than any number to 50','Find 1 less than any number to 50','Complete number sequences'],keyVocab:['one more','one less','next','previous']},
    ]},
  { id:'ma_u10', unitNumber:10, titleEn:'Money', titleVi:'Tiền tệ', subject:'math', book:'Abacus Workbook 3', term:3, iconEmoji:'💰',
    topics:[
      {id:'ma10_1',titleEn:'Recognise coins (UK)',titleVi:'Nhận biết tiền xu (Anh)',type:'lesson',keyVocab:['1p','2p','5p','10p','20p','50p','£1'],objectives:['Identify UK coins by value','Sort coins by size and colour']},
      {id:'ma10_1b',titleEn:'Recognise money (Vietnam)',titleVi:'Nhận biết tiền Việt Nam',type:'lesson',keyVocab:['1.000đ','2.000đ','5.000đ','10.000đ','20.000đ','50.000đ','100.000đ'],objectives:['Identify Vietnamese banknotes','Compare values','Match amount to item']},
      {id:'ma10_2',titleEn:'Counting coins & notes',titleVi:'Đếm tiền xu và tiền giấy',type:'practice',objectives:['Count mixed coins (UK)','Count mixed banknotes (VN)','Write total amounts']},
      {id:'ma10_3',titleEn:'Simple shopping problems',titleVi:'Bài toán mua sắm đơn giản',type:'activity',objectives:['Calculate total cost','Work out change','Use both £/p and VNĐ']},
    ]},
  { id:'ma_u11', unitNumber:11, titleEn:'Fractions: Halves & Quarters', titleVi:'Phân số: Một nửa & Một phần tư', subject:'math', book:'Abacus Workbook 3', term:3, iconEmoji:'🍕',
    topics:[
      {id:'ma11_1',titleEn:'Find half of a shape',titleVi:'Tìm nửa hình',type:'lesson',objectives:['Fold shapes in half','Colour one half','Know that half = 2 equal parts'],keyVocab:['half','equal','parts','fold','share']},
      {id:'ma11_2',titleEn:'Find quarter of a shape',titleVi:'Tìm một phần tư hình',type:'lesson',objectives:['Fold shapes into quarters','Colour one quarter','Know that quarter = 4 equal parts'],keyVocab:['quarter','four parts','equal','divide']},
      {id:'ma11_3',titleEn:'Half and quarter of amounts',titleVi:'Nửa và một phần tư số lượng',type:'practice',objectives:['Find half of 6, 8, 10...','Find quarter of 4, 8, 12...','Share objects equally'],keyVocab:['share equally','divide','group','each']},
    ]},
  { id:'ma_u12', unitNumber:12, titleEn:'Position & Direction', titleVi:'Vị trí & Hướng', subject:'math', book:'Abacus Workbook 3', term:3, iconEmoji:'🧭',
    topics:[
      {id:'ma12_1',titleEn:'Left, right, above, below',titleVi:'Trái, phải, trên, dưới',type:'lesson',keyVocab:['left','right','above','below','between','next to'],objectives:['Use position words correctly','Describe where objects are','Follow position instructions']},
      {id:'ma12_2',titleEn:'Turns: whole, half, quarter',titleVi:'Xoay: cả vòng, nửa, phần tư',type:'lesson',objectives:['Whole turn, half turn, quarter turn','Clockwise and anti-clockwise','Make turns with your body'],keyVocab:['turn','whole turn','half turn','quarter turn','clockwise']},
      {id:'ma12_3',titleEn:'Giving directions',titleVi:'Chỉ đường',type:'activity',objectives:['Use position words in sentences','Follow and give simple directions','Draw a route on a grid'],keyVocab:['forwards','backwards','turn left','turn right','straight']},
    ]},
];

const SCIENCE_UNITS: CurriculumUnit[] = [
  { id:'sc_u1', unitNumber:1, titleEn:'Plants', titleVi:'Thực vật', subject:'science', book:'Science Bug Year 1', term:1, iconEmoji:'🌱',
    topics:[
      {id:'sc1_1',titleEn:'What is a plant?',titleVi:'Cây là gì?',type:'lesson',keyVocab:['plant','leaf','stem','root','flower','petal'],objectives:['Identify common plants','Know that plants are living things','Observe plants in the environment']},
      {id:'sc1_2',titleEn:'Parts of a plant',titleVi:'Các bộ phận của cây',type:'lesson',objectives:['Label plant parts: root, stem, leaf, flower','Understand the function of each part','Draw and label a plant diagram'],keyVocab:['root','stem','leaf','flower','petal','seed']},
      {id:'sc1_3',titleEn:'Wild plants vs Garden plants',titleVi:'Cây dại và cây trồng',type:'lesson',objectives:['Sort plants into wild and garden groups','Name common wild plants: daisy, dandelion','Name common garden plants: rose, sunflower'],keyVocab:['wild','garden','daisy','dandelion','rose','sunflower']},
      {id:'sc1_4',titleEn:'Trees: deciduous & evergreen',titleVi:'Cây rụng lá & cây thường xanh',type:'lesson',keyVocab:['deciduous','evergreen','trunk','branch','bark'],objectives:['Distinguish deciduous from evergreen trees','Observe seasonal changes in trees','Identify common trees: oak, pine']},
      {id:'sc1_5',titleEn:'Plant investigation',titleVi:'Thí nghiệm: Cây cần gì để sống?',type:'activity',objectives:['Set up a simple investigation','Predict what plants need','Observe and record results over a week'],keyVocab:['predict','observe','record','grow']},
    ]},
  { id:'sc_u2', unitNumber:2, titleEn:'Animals including Humans', titleVi:'Động vật và Con người', subject:'science', book:'Science Bug Year 1', term:1, iconEmoji:'🐾',
    topics:[
      {id:'sc2_1',titleEn:'Animal groups: fish, birds, mammals',titleVi:'Nhóm động vật: cá, chim, thú',type:'lesson',keyVocab:['fish','amphibian','reptile','bird','mammal'],objectives:['Name the 5 animal groups','Sort animals into groups','Know key features of each group']},
      {id:'sc2_2',titleEn:'Carnivores, herbivores, omnivores',titleVi:'Ăn thịt, ăn cỏ, ăn tạp',type:'lesson',objectives:['Know what carnivore, herbivore, omnivore mean','Sort animals by diet','Identify what different animals eat'],keyVocab:['carnivore','herbivore','omnivore','meat','plants','diet']},
      {id:'sc2_3',titleEn:'Human body parts',titleVi:'Các bộ phận cơ thể người',type:'lesson',keyVocab:['head','arm','leg','hand','foot','eye','ear','nose','mouth'],objectives:['Name and label body parts','Point to body parts on a diagram','Understand that humans are animals too']},
      {id:'sc2_4',titleEn:'Our five senses',titleVi:'Năm giác quan',type:'lesson',keyVocab:['see','hear','smell','taste','touch'],objectives:['Name all 5 senses and their body parts','Match senses to body parts: eyes→see, ears→hear','Use senses to explore objects']},
      {id:'sc2_5',titleEn:'Senses investigation',titleVi:'Thí nghiệm giác quan',type:'activity',objectives:['Use senses to identify mystery objects','Record observations using pictures and words','Work safely: do not taste unknown items'],keyVocab:['investigate','describe','texture','sound']},
    ]},
  { id:'sc_u3', unitNumber:3, titleEn:'Everyday Materials', titleVi:'Vật liệu quanh ta', subject:'science', book:'Science Bug Year 1', term:2, iconEmoji:'🧱',
    topics:[
      {id:'sc3_1',titleEn:'Objects and materials',titleVi:'Đồ vật và vật liệu',type:'lesson',keyVocab:['wood','plastic','glass','metal','fabric','paper'],objectives:['Name common materials','Know the difference between an object and a material','Identify what everyday objects are made of']},
      {id:'sc3_2',titleEn:'Properties of materials',titleVi:'Tính chất vật liệu',type:'lesson',keyVocab:['hard','soft','rough','smooth','shiny','dull','bendy','stiff'],objectives:['Describe materials using property words','Compare 2 materials by touch','Sort materials by properties']},
      {id:'sc3_3',titleEn:'Choosing the right material',titleVi:'Chọn vật liệu phù hợp',type:'activity',objectives:['Explain why certain materials are chosen for objects','Match material to purpose: umbrella→waterproof','Design an object choosing the best material'],keyVocab:['suitable','waterproof','strong','transparent']},
      {id:'sc3_4',titleEn:'Waterproof investigation',titleVi:'Thí nghiệm chống nước',type:'activity',objectives:['Test which materials are waterproof','Record results in a simple table','Draw conclusions from results'],keyVocab:['waterproof','absorbent','drip','soak']},
    ]},
  { id:'sc_u4', unitNumber:4, titleEn:'Seasonal Changes: Autumn & Winter', titleVi:'Thay đổi mùa: Thu & Đông', subject:'science', book:'Science Bug Year 1', term:2, iconEmoji:'🍂',
    topics:[
      {id:'sc4_1',titleEn:'The four seasons',titleVi:'Bốn mùa',type:'lesson',keyVocab:['spring','summer','autumn','winter'],objectives:['Name the 4 seasons in order','Describe typical weather for each season','Know that seasons repeat every year']},
      {id:'sc4_2',titleEn:'Autumn changes',titleVi:'Thay đổi mùa thu',type:'lesson',objectives:['Observe autumn signs: falling leaves, cooler weather','Know that days get shorter in autumn','Identify autumn colours: red, orange, yellow, brown'],keyVocab:['autumn','leaves','fall','harvest','cooler','shorter']},
      {id:'sc4_3',titleEn:'Winter weather',titleVi:'Thời tiết mùa đông',type:'lesson',keyVocab:['cold','frost','ice','snow','wind'],objectives:['Describe winter weather','Know winter has the shortest days','Understand how animals and people prepare for winter']},
      {id:'sc4_4',titleEn:'Day length changes',titleVi:'Ngày dài ngắn thay đổi',type:'lesson',objectives:['Know that day length changes through the year','Summer = longest day, Winter = shortest day','Observe sunrise and sunset times'],keyVocab:['daylight','sunrise','sunset','longer','shorter']},
    ]},
  { id:'sc_u5', unitNumber:5, titleEn:'Seasonal Changes: Spring & Summer', titleVi:'Thay đổi mùa: Xuân & Hè', subject:'science', book:'Science Bug Year 1', term:3, iconEmoji:'🌸',
    topics:[
      {id:'sc5_1',titleEn:'Spring changes',titleVi:'Thay đổi mùa xuân',type:'lesson',keyVocab:['blossom','bud','lamb','chick','nest'],objectives:['Observe signs of spring: buds, blossom, baby animals','Know that days get longer in spring','Describe spring weather: warmer, rainy']},
      {id:'sc5_2',titleEn:'Summer weather',titleVi:'Thời tiết mùa hè',type:'lesson',objectives:['Describe summer weather: hot, sunny, dry','Know summer has the longest days','Compare summer weather to other seasons'],keyVocab:['hot','sunny','dry','warm','shade','sunscreen']},
      {id:'sc5_3',titleEn:'Weather diary',titleVi:'Nhật ký thời tiết',type:'activity',objectives:['Record daily weather for one week','Use weather symbols: ☀️ ☁️ 🌧️ ❄️','Compare weather across different days'],keyVocab:['sunny','cloudy','rainy','windy','foggy','snowy']},
      {id:'sc5_4',titleEn:'Seasons comparison',titleVi:'So sánh các mùa',type:'review',objectives:['Compare all 4 seasons side by side','Create a seasons poster','Review key vocabulary from all units']},
    ]},
  { id:'sc_u6', unitNumber:6, titleEn:'Growing Plants', titleVi:'Trồng cây', subject:'science', book:'Science Bug Year 1', term:3, iconEmoji:'🌻',
    topics:[
      {id:'sc6_1',titleEn:'What do plants need?',titleVi:'Cây cần gì?',type:'lesson',keyVocab:['water','sunlight','soil','warmth'],objectives:['Know the 4 things plants need to grow','Predict what happens without water/light','Understand that plants are living things']},
      {id:'sc6_2',titleEn:'Grow a bean investigation',titleVi:'Thí nghiệm trồng đậu',type:'activity',objectives:['Plant a bean seed and observe daily','Measure growth with a ruler','Draw the bean plant at different stages'],keyVocab:['seed','germinate','shoot','seedling','measure']},
      {id:'sc6_3',titleEn:'Recording observations',titleVi:'Ghi chép quan sát',type:'practice',objectives:['Draw what you see accurately','Label drawings with key words','Use a table to record measurements'],keyVocab:['observe','record','draw','label','measure','table']},
      {id:'sc6_4',titleEn:'Year 1 Science review',titleVi:'Ôn tập Khoa học lớp 1',type:'review',objectives:['Review plants, animals, materials, seasons','Answer review questions from all topics','Celebrate learning achievements!']},
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
