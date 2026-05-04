// ═══════════════════════════════════════════════════════════════
// International English Curriculum Data
// Cambridge Primary (UK) + Common Core (US) + Australian Curriculum
// Mapped to Vietnamese grade levels 1-5
// ═══════════════════════════════════════════════════════════════

// ── Phonics Progression (Cambridge Stage 1-2, US CCSS RF.K-2) ──

export interface PhonicsLevel {
  levelId: string;
  grade: number;
  title: string;
  titleVi: string;
  framework: string;  // cambridge | common_core | australian
  letters: string[];
  digraphs?: string[];
  blends?: string[];
  sightWords: string[];
  decodableWords: string[];
}

export const PHONICS_LEVELS: PhonicsLevel[] = [
  // ── Grade 1: Letter Sounds & CVC ──
  {
    levelId: 'ph_g1_01', grade: 1, title: 'Letter Sounds A-M', titleVi: 'Âm chữ cái A-M',
    framework: 'cambridge',
    letters: ['a','b','c','d','e','f','g','h','i','j','k','l','m'],
    sightWords: ['I', 'a', 'the', 'is', 'it', 'in', 'at', 'on', 'my', 'we'],
    decodableWords: ['cat', 'bed', 'dig', 'jam', 'leg', 'him', 'big', 'had', 'kid', 'fig'],
  },
  {
    levelId: 'ph_g1_02', grade: 1, title: 'Letter Sounds N-Z', titleVi: 'Âm chữ cái N-Z',
    framework: 'cambridge',
    letters: ['n','o','p','q','r','s','t','u','v','w','x','y','z'],
    sightWords: ['to', 'no', 'go', 'so', 'do', 'up', 'you', 'and', 'can', 'see'],
    decodableWords: ['not', 'pot', 'run', 'sun', 'wet', 'yet', 'zip', 'van', 'top', 'nut'],
  },
  {
    levelId: 'ph_g1_03', grade: 1, title: 'CVC Words', titleVi: 'Từ CVC (Phụ âm-Nguyên âm-Phụ âm)',
    framework: 'common_core',
    letters: [],
    sightWords: ['he', 'she', 'has', 'was', 'for', 'are', 'but', 'not', 'with', 'they'],
    decodableWords: ['bat', 'cap', 'den', 'fin', 'got', 'hop', 'jig', 'kit', 'log', 'mug', 'net', 'pan', 'red', 'sit', 'ten'],
  },
  {
    levelId: 'ph_g1_04', grade: 1, title: 'Beginning Digraphs', titleVi: 'Đôi phụ âm đầu',
    framework: 'cambridge',
    letters: [],
    digraphs: ['sh', 'ch', 'th', 'wh', 'ph'],
    sightWords: ['this', 'that', 'then', 'them', 'what', 'when', 'where', 'who'],
    decodableWords: ['ship', 'chip', 'thin', 'whip', 'shop', 'chat', 'then', 'shed', 'chop', 'them'],
  },
  // ── Grade 2: Blends, Long Vowels, Fluency ──
  {
    levelId: 'ph_g2_01', grade: 2, title: 'Consonant Blends', titleVi: 'Ghép phụ âm',
    framework: 'common_core',
    letters: [],
    blends: ['bl', 'cl', 'fl', 'gl', 'pl', 'sl', 'br', 'cr', 'dr', 'fr', 'gr', 'pr', 'tr', 'st', 'sp', 'sn', 'sw'],
    sightWords: ['said', 'come', 'some', 'very', 'here', 'there', 'were', 'been', 'have', 'from'],
    decodableWords: ['black', 'clap', 'flag', 'glad', 'plan', 'slip', 'brown', 'crab', 'drop', 'frog', 'grin', 'print', 'trip', 'stop', 'spin'],
  },
  {
    levelId: 'ph_g2_02', grade: 2, title: 'Long Vowels (Silent E)', titleVi: 'Nguyên âm dài (E câm)',
    framework: 'cambridge',
    letters: [],
    sightWords: ['make', 'like', 'home', 'time', 'made', 'came', 'give', 'live', 'take', 'five'],
    decodableWords: ['cake', 'bike', 'bone', 'cute', 'name', 'ride', 'rope', 'tune', 'hide', 'lake', 'fire', 'wine', 'nose', 'huge'],
  },
  {
    levelId: 'ph_g2_03', grade: 2, title: 'Vowel Teams', titleVi: 'Cặp nguyên âm',
    framework: 'common_core',
    letters: [],
    digraphs: ['ai', 'ay', 'ea', 'ee', 'oa', 'ow', 'oo', 'ou', 'ie', 'ue'],
    sightWords: ['read', 'each', 'about', 'many', 'other', 'their', 'could', 'would', 'should', 'people'],
    decodableWords: ['rain', 'play', 'meat', 'tree', 'boat', 'slow', 'moon', 'loud', 'pie', 'blue', 'pain', 'seed', 'road', 'clue'],
  },
  {
    levelId: 'ph_g2_04', grade: 2, title: 'R-Controlled Vowels', titleVi: 'Nguyên âm + R',
    framework: 'australian',
    letters: [],
    digraphs: ['ar', 'er', 'ir', 'or', 'ur'],
    sightWords: ['first', 'water', 'after', 'other', 'over', 'under', 'never', 'before', 'every', 'work'],
    decodableWords: ['car', 'her', 'bird', 'corn', 'turn', 'star', 'fern', 'girl', 'born', 'hurt', 'farm', 'term', 'skirt', 'fork', 'burn'],
  },
  // ── Grade 3: Multisyllabic Words, Prefixes ──
  {
    levelId: 'ph_g3_01', grade: 3, title: 'Multisyllabic Words', titleVi: 'Từ nhiều âm tiết',
    framework: 'cambridge',
    letters: [],
    sightWords: ['another', 'because', 'different', 'important', 'wonderful', 'together', 'remember', 'beautiful'],
    decodableWords: ['butterfly', 'elephant', 'umbrella', 'waterfall', 'hospital', 'telephone', 'adventure', 'dinosaur', 'hamburger', 'kangaroo'],
  },
  {
    levelId: 'ph_g3_02', grade: 3, title: 'Prefixes (un-, re-, pre-)', titleVi: 'Tiền tố (un-, re-, pre-)',
    framework: 'common_core',
    letters: [],
    sightWords: ['undo', 'redo', 'preview', 'unhappy', 'rewrite', 'preschool', 'untie', 'reread'],
    decodableWords: ['unhappy', 'unkind', 'unlock', 'unsafe', 'replay', 'rewrite', 'rebuild', 'preview', 'prepaid', 'preschool'],
  },
  {
    levelId: 'ph_g3_03', grade: 3, title: 'Suffixes (-ly, -ful, -less)', titleVi: 'Hậu tố (-ly, -ful, -less)',
    framework: 'australian',
    letters: [],
    sightWords: ['quickly', 'carefully', 'hopeless', 'wonderful', 'beautiful', 'thankful', 'helpless', 'slowly'],
    decodableWords: ['quickly', 'slowly', 'kindly', 'helpful', 'thankful', 'wonderful', 'hopeless', 'careless', 'fearless', 'cheerful'],
  },
  // ── Grade 4: Silent Letters, Homophones ──
  {
    levelId: 'ph_g4_01', grade: 4, title: 'Silent Letters', titleVi: 'Chữ câm',
    framework: 'cambridge',
    letters: [],
    sightWords: ['know', 'write', 'island', 'listen', 'castle', 'honest', 'answer', 'doubt'],
    decodableWords: ['knight', 'knife', 'knock', 'wreck', 'wrist', 'climb', 'comb', 'lamb', 'thumb', 'island'],
  },
  {
    levelId: 'ph_g4_02', grade: 4, title: 'Homophones', titleVi: 'Từ đồng âm',
    framework: 'common_core',
    letters: [],
    sightWords: ['there', 'their', 'they\'re', 'to', 'too', 'two', 'your', 'you\'re'],
    decodableWords: ['there', 'their', 'right', 'write', 'sea', 'see', 'flour', 'flower', 'hear', 'here', 'no', 'know', 'sun', 'son'],
  },
  // ── Grade 5: Greek/Latin Roots, Advanced Phonics ──
  {
    levelId: 'ph_g5_01', grade: 5, title: 'Word Roots (Greek & Latin)', titleVi: 'Gốc từ (Hy Lạp & La-tinh)',
    framework: 'cambridge',
    letters: [],
    sightWords: ['telephone', 'microscope', 'photograph', 'biography', 'autograph', 'geography', 'bicycle', 'submarine'],
    decodableWords: ['telephone', 'television', 'microscope', 'biology', 'autobiography', 'photograph', 'submarine', 'bicycle', 'transport', 'export'],
  },
  {
    levelId: 'ph_g5_02', grade: 5, title: 'Stress & Intonation', titleVi: 'Trọng âm & Ngữ điệu',
    framework: 'australian',
    letters: [],
    sightWords: ['present', 'record', 'object', 'desert', 'produce', 'project', 'contest', 'permit'],
    decodableWords: ['present', 'record', 'permit', 'desert', 'object', 'produce', 'project', 'contest', 'rebel', 'protest'],
  },
];

// ── Grammar Progression (Cross-curriculum) ──

export interface GrammarTopic {
  topicId: string;
  grade: number;
  title: string;
  titleVi: string;
  framework: string;
  rules: { rule: string; ruleVi: string; examples: string[]; examplesVi: string[] }[];
}

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  // ── Grade 1: Basic Sentence Patterns ──
  {
    topicId: 'gr_g1_01', grade: 1, title: 'Verb To Be (am/is/are)', titleVi: 'Động từ To Be',
    framework: 'common_core',
    rules: [
      { rule: 'I am, He/She/It is, You/We/They are', ruleVi: 'I am, He/She/It is, You/We/They are',
        examples: ['I am a boy.', 'She is my friend.', 'They are happy.', 'It is a cat.'],
        examplesVi: ['Tôi là con trai.', 'Cô ấy là bạn tôi.', 'Họ vui.', 'Đó là con mèo.'] },
      { rule: 'Use "not" for negatives: is not, am not, are not', ruleVi: 'Dùng "not" cho phủ định',
        examples: ['I am not sad.', 'It is not big.', 'They are not here.'],
        examplesVi: ['Tôi không buồn.', 'Nó không to.', 'Họ không ở đây.'] },
    ],
  },
  {
    topicId: 'gr_g1_02', grade: 1, title: 'This & That', titleVi: 'This và That',
    framework: 'cambridge',
    rules: [
      { rule: 'This = near, That = far', ruleVi: 'This = gần, That = xa',
        examples: ['This is a pen.', 'That is a tree.', 'This is my bag.', 'That is your house.'],
        examplesVi: ['Đây là cây bút.', 'Kia là cái cây.', 'Đây là cặp của tôi.', 'Kia là nhà bạn.'] },
    ],
  },
  // ── Grade 2: Expanding Patterns ──
  {
    topicId: 'gr_g2_01', grade: 2, title: 'Can & Cannot', titleVi: 'Can và Cannot',
    framework: 'australian',
    rules: [
      { rule: 'Use "can" for ability, "cannot/can\'t" for inability', ruleVi: 'Dùng "can" cho khả năng, "cannot" cho không thể',
        examples: ['I can swim.', 'She can sing.', 'He cannot fly.', 'They can run fast.'],
        examplesVi: ['Tôi biết bơi.', 'Cô ấy biết hát.', 'Anh ấy không bay được.', 'Họ chạy nhanh được.'] },
    ],
  },
  {
    topicId: 'gr_g2_02', grade: 2, title: 'There is / There are', titleVi: 'There is / There are',
    framework: 'common_core',
    rules: [
      { rule: 'There is + singular, There are + plural', ruleVi: 'There is + số ít, There are + số nhiều',
        examples: ['There is a book on the desk.', 'There are two cats.', 'There is one apple.'],
        examplesVi: ['Có một quyển sách trên bàn.', 'Có hai con mèo.', 'Có một quả táo.'] },
    ],
  },
  // ── Grade 3: Foundation ──
  {
    topicId: 'gr_g3_01', grade: 3, title: 'Nouns & Articles', titleVi: 'Danh từ & Mạo từ',
    framework: 'cambridge',
    rules: [
      { rule: 'Use "a" before consonant sounds, "an" before vowel sounds', ruleVi: 'Dùng "a" trước phụ âm, "an" trước nguyên âm',
        examples: ['a cat', 'a dog', 'an apple', 'an egg', 'an umbrella', 'a house'],
        examplesVi: ['một con mèo', 'một con chó', 'một quả táo', 'một quả trứng', 'một cái ô', 'một ngôi nhà'] },
      { rule: 'Add -s for most plurals, -es for s/sh/ch/x', ruleVi: 'Thêm -s cho số nhiều, -es cho s/sh/ch/x',
        examples: ['cats', 'dogs', 'buses', 'dishes', 'watches', 'boxes'],
        examplesVi: ['những con mèo', 'những con chó', 'xe buýt', 'đĩa', 'đồng hồ', 'hộp'] },
    ],
  },
  {
    topicId: 'gr_g3_02', grade: 3, title: 'Simple Present Tense', titleVi: 'Thì hiện tại đơn',
    framework: 'common_core',
    rules: [
      { rule: 'Add -s/-es for he/she/it', ruleVi: 'Thêm -s/-es cho ngôi thứ ba số ít',
        examples: ['He plays football.', 'She watches TV.', 'It rains a lot.'],
        examplesVi: ['Anh ấy chơi bóng đá.', 'Cô ấy xem ti vi.', 'Trời mưa nhiều.'] },
      { rule: 'Use do/does for questions', ruleVi: 'Dùng do/does cho câu hỏi',
        examples: ['Do you like milk?', 'Does she play?', 'Do they sing?'],
        examplesVi: ['Bạn thích sữa không?', 'Cô ấy chơi không?', 'Họ hát không?'] },
    ],
  },
  {
    topicId: 'gr_g4_01', grade: 4, title: 'Past Simple Tense', titleVi: 'Thì quá khứ đơn',
    framework: 'cambridge',
    rules: [
      { rule: 'Add -ed for regular verbs', ruleVi: 'Thêm -ed cho động từ có quy tắc',
        examples: ['played', 'walked', 'jumped', 'watched', 'cleaned', 'cooked'],
        examplesVi: ['đã chơi', 'đã đi bộ', 'đã nhảy', 'đã xem', 'đã dọn', 'đã nấu'] },
      { rule: 'Irregular verbs change form', ruleVi: 'Động từ bất quy tắc thay đổi hình thức',
        examples: ['go→went', 'eat→ate', 'see→saw', 'have→had', 'come→came', 'make→made'],
        examplesVi: ['đi→đã đi', 'ăn→đã ăn', 'thấy→đã thấy', 'có→đã có', 'đến→đã đến', 'làm→đã làm'] },
    ],
  },
  {
    topicId: 'gr_g4_02', grade: 4, title: 'Comparatives & Superlatives', titleVi: 'So sánh hơn & nhất',
    framework: 'australian',
    rules: [
      { rule: 'Short adj: add -er/-est', ruleVi: 'Tính từ ngắn: thêm -er/-est',
        examples: ['tall→taller→tallest', 'big→bigger→biggest', 'fast→faster→fastest'],
        examplesVi: ['cao→cao hơn→cao nhất', 'lớn→lớn hơn→lớn nhất', 'nhanh→nhanh hơn→nhanh nhất'] },
      { rule: 'Long adj: use more/most', ruleVi: 'Tính từ dài: dùng more/most',
        examples: ['beautiful→more beautiful→most beautiful', 'interesting→more interesting'],
        examplesVi: ['đẹp→đẹp hơn→đẹp nhất', 'thú vị→thú vị hơn'] },
    ],
  },
  {
    topicId: 'gr_g5_01', grade: 5, title: 'Present Continuous', titleVi: 'Thì hiện tại tiếp diễn',
    framework: 'cambridge',
    rules: [
      { rule: 'am/is/are + verb-ing', ruleVi: 'am/is/are + động từ-ing',
        examples: ['I am reading.', 'She is cooking.', 'They are playing.'],
        examplesVi: ['Tôi đang đọc.', 'Cô ấy đang nấu.', 'Họ đang chơi.'] },
    ],
  },
  {
    topicId: 'gr_g5_02', grade: 5, title: 'Future with "going to"', titleVi: 'Tương lai với "going to"',
    framework: 'common_core',
    rules: [
      { rule: 'am/is/are + going to + verb', ruleVi: 'am/is/are + going to + động từ',
        examples: ['I am going to swim.', 'She is going to study.', 'We are going to travel.'],
        examplesVi: ['Tôi sẽ đi bơi.', 'Cô ấy sẽ học.', 'Chúng tôi sẽ du lịch.'] },
    ],
  },
  {
    topicId: 'gr_g5_03', grade: 5, title: 'Modal Verbs', titleVi: 'Động từ khiếm khuyết',
    framework: 'australian',
    rules: [
      { rule: 'can/could/should/must + base verb', ruleVi: 'can/could/should/must + động từ nguyên mẫu',
        examples: ['You should eat vegetables.', 'I can swim.', 'You must stop.', 'Could you help?'],
        examplesVi: ['Con nên ăn rau.', 'Tôi biết bơi.', 'Bạn phải dừng lại.', 'Bạn giúp được không?'] },
    ],
  },
  {
    topicId: 'gr_g3_03', grade: 3, title: 'Prepositions of Place', titleVi: 'Giới từ chỉ vị trí',
    framework: 'cambridge',
    rules: [
      { rule: 'in, on, under, next to, between, behind, in front of', ruleVi: 'trong, trên, dưới, bên cạnh, giữa, đằng sau, đằng trước',
        examples: ['The cat is on the table.', 'The ball is under the bed.', 'The tree is next to the house.'],
        examplesVi: ['Con mèo ở trên bàn.', 'Quả bóng ở dưới giường.', 'Cái cây ở bên cạnh nhà.'] },
    ],
  },
  {
    topicId: 'gr_g3_04', grade: 3, title: 'Personal Pronouns', titleVi: 'Đại từ nhân xưng',
    framework: 'common_core',
    rules: [
      { rule: 'I, you, he, she, it, we, they → me, you, him, her, it, us, them', ruleVi: 'Chủ ngữ → Tân ngữ',
        examples: ['She likes him.', 'They gave us a gift.', 'I can see them.'],
        examplesVi: ['Cô ấy thích anh ấy.', 'Họ tặng chúng tôi một món quà.', 'Tôi có thể thấy họ.'] },
    ],
  },
  {
    topicId: 'gr_g4_03', grade: 4, title: 'Conjunctions', titleVi: 'Liên từ',
    framework: 'australian',
    rules: [
      { rule: 'and, but, or, so, because', ruleVi: 'và, nhưng, hoặc, vì vậy, bởi vì',
        examples: ['I like cats and dogs.', 'She is tired but happy.', 'He stayed home because it rained.'],
        examplesVi: ['Tôi thích mèo và chó.', 'Cô ấy mệt nhưng vui.', 'Anh ấy ở nhà vì trời mưa.'] },
    ],
  },
  {
    topicId: 'gr_g4_04', grade: 4, title: 'Adverbs of Frequency', titleVi: 'Trạng từ chỉ tần suất',
    framework: 'cambridge',
    rules: [
      { rule: 'always, usually, often, sometimes, rarely, never', ruleVi: 'luôn luôn, thường, hay, đôi khi, hiếm khi, không bao giờ',
        examples: ['I always brush my teeth.', 'She sometimes reads before bed.', 'They never eat fast food.'],
        examplesVi: ['Tôi luôn đánh răng.', 'Cô ấy đôi khi đọc sách trước khi ngủ.', 'Họ không bao giờ ăn đồ ăn nhanh.'] },
    ],
  },
  {
    topicId: 'gr_g4_05', grade: 4, title: 'Possessives', titleVi: 'Sở hữu cách',
    framework: 'common_core',
    rules: [
      { rule: 'my/your/his/her + noun; noun\'s', ruleVi: 'tính từ sở hữu + danh từ; danh từ + \'s',
        examples: ['This is my book.', 'Tom\'s dog is big.', 'Her shoes are new.'],
        examplesVi: ['Đây là sách của tôi.', 'Chó của Tom to.', 'Giày của cô ấy mới.'] },
    ],
  },
  {
    topicId: 'gr_g5_04', grade: 5, title: 'Question Words', titleVi: 'Từ để hỏi',
    framework: 'cambridge',
    rules: [
      { rule: 'What, Where, When, Who, Why, How, How many, How much', ruleVi: 'Cái gì, Ở đâu, Khi nào, Ai, Tại sao, Như thế nào, Bao nhiêu',
        examples: ['What is your name?', 'Where do you live?', 'How many books do you have?'],
        examplesVi: ['Bạn tên gì?', 'Bạn sống ở đâu?', 'Bạn có bao nhiêu sách?'] },
    ],
  },
  {
    topicId: 'gr_g5_05', grade: 5, title: 'Conditionals (If)', titleVi: 'Câu điều kiện (Nếu)',
    framework: 'australian',
    rules: [
      { rule: 'If + present, will + verb', ruleVi: 'Nếu + hiện tại, sẽ + động từ',
        examples: ['If it rains, I will stay home.', 'If you study, you will pass.', 'If we hurry, we will catch the bus.'],
        examplesVi: ['Nếu trời mưa, tôi sẽ ở nhà.', 'Nếu bạn học, bạn sẽ đậu.', 'Nếu chúng ta nhanh, chúng ta sẽ kịp xe buýt.'] },
    ],
  },
  {
    topicId: 'gr_g5_06', grade: 5, title: 'Passive Voice (Basic)', titleVi: 'Câu bị động (Cơ bản)',
    framework: 'cambridge',
    rules: [
      { rule: 'Subject + is/are + past participle', ruleVi: 'Chủ ngữ + is/are + quá khứ phân từ',
        examples: ['The cake is made by Mum.', 'Books are read by children.', 'The door is opened.'],
        examplesVi: ['Bánh được mẹ làm.', 'Sách được trẻ em đọc.', 'Cửa được mở.'] },
    ],
  },
];

// ── Reading Comprehension Passages ──

export interface ReadingPassage {
  passageId: string;
  grade: number;
  title: string;
  titleVi: string;
  framework: string;
  text: string;
  questions: { q: string; qVi: string; options: string[]; correct: string }[];
  wordCount: number;
}

export const READING_PASSAGES: ReadingPassage[] = [
  {
    passageId: 'rd_g1_01', grade: 1, title: 'My Pet Cat', titleVi: 'Con mèo của tôi',
    framework: 'cambridge', wordCount: 40,
    text: 'I have a cat. My cat is big. It is black and white. My cat can run and jump. It likes to sit on my bed. I love my cat!',
    questions: [
      { q: 'What colour is the cat?', qVi: 'Con mèo màu gì?', options: ['Black and white', 'Brown', 'Orange', 'Grey'], correct: 'Black and white' },
      { q: 'Where does the cat like to sit?', qVi: 'Con mèo thích ngồi ở đâu?', options: ['On the bed', 'On the chair', 'On the floor', 'On the table'], correct: 'On the bed' },
    ],
  },
  {
    passageId: 'rd_g2_01', grade: 2, title: 'A Day at the Park', titleVi: 'Một ngày ở công viên',
    framework: 'common_core', wordCount: 65,
    text: 'Today is sunny. Tom and his sister go to the park. They play on the slide and the swings. Tom sees a bird in a tree. The bird is red. His sister finds a flower. It is pink. They eat sandwiches for lunch. It is a fun day!',
    questions: [
      { q: 'Who goes to the park with Tom?', qVi: 'Ai đi công viên với Tom?', options: ['His sister', 'His brother', 'His friend', 'His mother'], correct: 'His sister' },
      { q: 'What colour is the bird?', qVi: 'Con chim màu gì?', options: ['Red', 'Blue', 'Green', 'Yellow'], correct: 'Red' },
      { q: 'What do they eat for lunch?', qVi: 'Họ ăn gì vào bữa trưa?', options: ['Sandwiches', 'Pizza', 'Rice', 'Noodles'], correct: 'Sandwiches' },
    ],
  },
  {
    passageId: 'rd_g3_01', grade: 3, title: 'The Little Turtle', titleVi: 'Chú rùa nhỏ',
    framework: 'cambridge', wordCount: 90,
    text: 'Once there was a little turtle named Tim. Tim lived near a pond with his family. Every morning, Tim swam in the cool water. One day, Tim found a shiny stone at the bottom of the pond. He showed it to his mother. She said, "That is very special!" Tim put the stone next to his bed. Every night, the stone glowed softly. Tim was the happiest turtle in the pond.',
    questions: [
      { q: 'Where did Tim live?', qVi: 'Tim sống ở đâu?', options: ['Near a pond', 'In a river', 'On a mountain', 'In the sea'], correct: 'Near a pond' },
      { q: 'What did Tim find?', qVi: 'Tim tìm thấy gì?', options: ['A shiny stone', 'A fish', 'A flower', 'A shell'], correct: 'A shiny stone' },
      { q: 'What happened to the stone at night?', qVi: 'Điều gì xảy ra với viên đá vào ban đêm?', options: ['It glowed softly', 'It disappeared', 'It grew bigger', 'It changed colour'], correct: 'It glowed softly' },
    ],
  },
  {
    passageId: 'rd_g4_01', grade: 4, title: 'Saving Water', titleVi: 'Tiết kiệm nước',
    framework: 'australian', wordCount: 110,
    text: 'Water is very important for all living things. People, animals, and plants all need water to survive. But did you know that only a small amount of the water on Earth is fresh water that we can drink? That is why we must save water every day. Here are some easy ways to help: Turn off the tap when you brush your teeth. Take shorter showers. Fix any leaking taps at home. Water the garden in the early morning or evening. If everyone saves a little water each day, we can make a big difference for our planet.',
    questions: [
      { q: 'Why should we save water?', qVi: 'Tại sao chúng ta nên tiết kiệm nước?', options: ['Only a small amount is drinkable', 'Water is expensive', 'There is no rain', 'Plants do not need water'], correct: 'Only a small amount is drinkable' },
      { q: 'When should you water the garden?', qVi: 'Khi nào nên tưới vườn?', options: ['Morning or evening', 'At noon', 'At midnight', 'All day'], correct: 'Morning or evening' },
      { q: 'What should you do when brushing teeth?', qVi: 'Nên làm gì khi đánh răng?', options: ['Turn off the tap', 'Use more water', 'Leave the tap on', 'Take a bath'], correct: 'Turn off the tap' },
    ],
  },
  {
    passageId: 'rd_g5_01', grade: 5, title: 'The Internet and Safety', titleVi: 'Internet và An toàn',
    framework: 'common_core', wordCount: 130,
    text: 'The Internet is an amazing tool that connects people around the world. We use it to learn, communicate, and have fun. However, it is important to stay safe online. Never share personal information like your full name, address, or phone number with strangers. Always ask a parent or teacher before downloading anything. If someone online makes you feel uncomfortable, tell an adult right away. Be kind to others online, just as you would be in person. Remember that not everything you read online is true — always check facts from trusted sources. By following these rules, you can enjoy the Internet safely and responsibly.',
    questions: [
      { q: 'What should you never share online?', qVi: 'Bạn không bao giờ nên chia sẻ gì trên mạng?', options: ['Personal information', 'Your favourite colour', 'Your hobbies', 'Your pet name'], correct: 'Personal information' },
      { q: 'What should you do if someone makes you uncomfortable?', qVi: 'Nên làm gì nếu có người làm bạn khó chịu?', options: ['Tell an adult', 'Ignore it', 'Reply angrily', 'Share with friends'], correct: 'Tell an adult' },
      { q: 'Is everything online true?', qVi: 'Mọi thứ trên mạng đều đúng không?', options: ['No, check facts', 'Yes, always', 'Only videos', 'Only photos'], correct: 'No, check facts' },
    ],
  },
  {
    passageId: 'rd_g1_02', grade: 1, title: 'My Dog Spot', titleVi: 'Chó Spot của tôi',
    framework: 'common_core', wordCount: 35,
    text: 'I have a dog. His name is Spot. Spot is brown and small. He can run fast. Spot likes to play with a ball. I love Spot!',
    questions: [
      { q: 'What is the dog\'s name?', qVi: 'Con chó tên gì?', options: ['Spot', 'Max', 'Buddy', 'Rex'], correct: 'Spot' },
      { q: 'What does Spot like to play with?', qVi: 'Spot thích chơi với gì?', options: ['A ball', 'A stick', 'A bone', 'A toy'], correct: 'A ball' },
    ],
  },
  {
    passageId: 'rd_g2_02', grade: 2, title: 'The Rainy Day', titleVi: 'Ngày mưa',
    framework: 'australian', wordCount: 70,
    text: 'It is raining today. Anna cannot go outside. She looks out the window. She sees a rainbow! It has many colours — red, orange, yellow, green, blue, and purple. Anna draws the rainbow on paper. She shows it to her mother. Her mother smiles and says, "Beautiful!" Anna is happy now.',
    questions: [
      { q: 'Why can Anna not go outside?', qVi: 'Tại sao Anna không ra ngoài được?', options: ['It is raining', 'It is dark', 'She is sick', 'She is tired'], correct: 'It is raining' },
      { q: 'What does Anna draw?', qVi: 'Anna vẽ gì?', options: ['A rainbow', 'A flower', 'A cat', 'A house'], correct: 'A rainbow' },
      { q: 'How does Anna feel at the end?', qVi: 'Anna cảm thấy thế nào cuối cùng?', options: ['Happy', 'Sad', 'Angry', 'Scared'], correct: 'Happy' },
    ],
  },
  {
    passageId: 'rd_g1_03', grade: 1, title: 'At the Park', titleVi: 'Ở công viên',
    framework: 'australian', wordCount: 30,
    text: 'I go to the park. I see a tree. I see a bird. The bird is red. I play on the swing. I am happy!',
    questions: [
      { q: 'What does the child see?', qVi: 'Bạn nhỏ thấy gì?', options: ['A tree and a bird', 'A dog', 'A car', 'A fish'], correct: 'A tree and a bird' },
      { q: 'What colour is the bird?', qVi: 'Con chim màu gì?', options: ['Red', 'Blue', 'Green', 'Yellow'], correct: 'Red' },
    ],
  },
  {
    passageId: 'rd_g1_04', grade: 1, title: 'My Family', titleVi: 'Gia đình tôi',
    framework: 'cambridge', wordCount: 35,
    text: 'This is my family. I have a mum and a dad. I have one sister. Her name is Lan. We have a cat. The cat is white. I love my family.',
    questions: [
      { q: 'How many sisters does the child have?', qVi: 'Bạn nhỏ có mấy chị/em gái?', options: ['One', 'Two', 'Three', 'None'], correct: 'One' },
      { q: 'What pet do they have?', qVi: 'Họ nuôi con gì?', options: ['A cat', 'A dog', 'A bird', 'A fish'], correct: 'A cat' },
    ],
  },
  {
    passageId: 'rd_g2_03', grade: 2, title: 'Going to School', titleVi: 'Đi học',
    framework: 'cambridge', wordCount: 60,
    text: 'Every morning, I wake up at six. I brush my teeth and eat breakfast. Then I put on my uniform. My mum takes me to school by motorbike. At school, I learn English, Maths, and Vietnamese. My favourite subject is English. After school, I play with my friends.',
    questions: [
      { q: 'What time does the child wake up?', qVi: 'Bạn nhỏ thức dậy lúc mấy giờ?', options: ['Six', 'Seven', 'Five', 'Eight'], correct: 'Six' },
      { q: 'What is the favourite subject?', qVi: 'Môn học yêu thích là gì?', options: ['English', 'Maths', 'Vietnamese', 'Science'], correct: 'English' },
    ],
  },
  {
    passageId: 'rd_g2_04', grade: 2, title: 'My Pet Dog', titleVi: 'Chó cưng của tôi',
    framework: 'common_core', wordCount: 55,
    text: 'I have a pet dog. His name is Lucky. Lucky is brown and white. He has big brown eyes. Lucky can run very fast. He likes to play catch with me. I give him food and water every day. Lucky is my best friend.',
    questions: [
      { q: 'What is the dog\'s name?', qVi: 'Con chó tên gì?', options: ['Lucky', 'Buddy', 'Max', 'Rex'], correct: 'Lucky' },
      { q: 'What colour is Lucky?', qVi: 'Lucky màu gì?', options: ['Brown and white', 'Black', 'Yellow', 'Grey'], correct: 'Brown and white' },
      { q: 'What does Lucky like to do?', qVi: 'Lucky thích làm gì?', options: ['Play catch', 'Sleep', 'Swim', 'Read'], correct: 'Play catch' },
    ],
  },
  {
    passageId: 'rd_g3_02', grade: 3, title: 'The Brave Little Ant', titleVi: 'Chú kiến dũng cảm',
    framework: 'common_core', wordCount: 95,
    text: 'A little ant lived near a big river. One day, a dove saw the ant fall into the water. The dove quickly dropped a leaf. The ant climbed on the leaf and was safe. A few days later, a hunter came. He wanted to catch the dove with a net. The ant saw this and bit the hunter on his foot. The hunter dropped the net. The dove flew away safely. The ant and the dove became best friends.',
    questions: [
      { q: 'Who saved the ant first?', qVi: 'Ai cứu kiến đầu tiên?', options: ['The dove', 'The hunter', 'A fish', 'Another ant'], correct: 'The dove' },
      { q: 'How did the ant save the dove?', qVi: 'Kiến cứu chim bồ câu bằng cách nào?', options: ['Bit the hunter', 'Called for help', 'Threw a stone', 'Built a wall'], correct: 'Bit the hunter' },
    ],
  },
  {
    passageId: 'rd_g3_03', grade: 3, title: 'My Favourite Sport', titleVi: 'Môn thể thao yêu thích',
    framework: 'australian', wordCount: 85,
    text: 'My favourite sport is swimming. I go to the pool every Saturday with my dad. First, I do warm-up exercises. Then I swim four laps. My coach says I am getting faster each week. I like swimming because it is fun and keeps me healthy. My best friend Minh also swims with me. After swimming, we always drink orange juice. I want to be in a race one day!',
    questions: [
      { q: 'When does the child go swimming?', qVi: 'Bạn nhỏ đi bơi khi nào?', options: ['Every Saturday', 'Every Monday', 'Every day', 'Every Sunday'], correct: 'Every Saturday' },
      { q: 'What do they drink after swimming?', qVi: 'Họ uống gì sau khi bơi?', options: ['Orange juice', 'Water', 'Milk', 'Tea'], correct: 'Orange juice' },
    ],
  },
  {
    passageId: 'rd_g4_02', grade: 4, title: 'The Solar System', titleVi: 'Hệ mặt trời',
    framework: 'cambridge', wordCount: 120,
    text: 'Our solar system has eight planets that orbit the Sun. The four planets closest to the Sun — Mercury, Venus, Earth, and Mars — are called rocky planets. They have solid surfaces. The four outer planets — Jupiter, Saturn, Uranus, and Neptune — are called gas giants. They are much bigger than the rocky planets. Earth is the only planet known to have life. It has water, air, and the right temperature for living things. The Moon orbits Earth and affects our tides. Scientists continue to explore space to learn more about our amazing solar system.',
    questions: [
      { q: 'How many planets are in our solar system?', qVi: 'Hệ mặt trời có bao nhiêu hành tinh?', options: ['Eight', 'Nine', 'Seven', 'Ten'], correct: 'Eight' },
      { q: 'Which planet has life?', qVi: 'Hành tinh nào có sự sống?', options: ['Earth', 'Mars', 'Venus', 'Jupiter'], correct: 'Earth' },
      { q: 'What are Jupiter and Saturn called?', qVi: 'Jupiter và Saturn được gọi là gì?', options: ['Gas giants', 'Rocky planets', 'Ice worlds', 'Star systems'], correct: 'Gas giants' },
    ],
  },
  {
    passageId: 'rd_g4_03', grade: 4, title: 'Vietnamese Festivals', titleVi: 'Lễ hội Việt Nam',
    framework: 'common_core', wordCount: 115,
    text: 'Vietnam has many wonderful festivals. The most important is Tet, the Lunar New Year. During Tet, families clean their houses, cook special food, and visit relatives. Children receive lucky money in red envelopes. Another famous festival is the Mid-Autumn Festival. Children carry colourful lanterns and eat mooncakes. There are also lion dances and drum performances in the streets. The Hung Kings Festival honours the founders of Vietnam. People visit temples and remember their ancestors. These festivals bring families together and keep Vietnamese traditions alive for future generations.',
    questions: [
      { q: 'What is the most important festival?', qVi: 'Lễ hội quan trọng nhất là gì?', options: ['Tet', 'Mid-Autumn', 'Christmas', 'New Year'], correct: 'Tet' },
      { q: 'What do children carry during Mid-Autumn?', qVi: 'Trẻ em mang gì trong Trung thu?', options: ['Lanterns', 'Flowers', 'Books', 'Kites'], correct: 'Lanterns' },
    ],
  },
  {
    passageId: 'rd_g5_02', grade: 5, title: 'Protecting the Environment', titleVi: 'Bảo vệ môi trường',
    framework: 'australian', wordCount: 140,
    text: 'Climate change is one of the biggest challenges facing our planet. As temperatures rise, ice caps melt and sea levels go up. This can cause flooding in coastal areas. Deforestation also contributes to climate change because trees absorb carbon dioxide from the air. There are many things we can do to help. We can reduce, reuse, and recycle waste. Using public transport or riding a bicycle instead of driving a car reduces pollution. Planting trees helps clean the air. Saving energy by turning off lights and unplugging devices also makes a difference. Every small action counts. If we all work together, we can protect our beautiful planet for future generations.',
    questions: [
      { q: 'What happens when ice caps melt?', qVi: 'Điều gì xảy ra khi băng tan?', options: ['Sea levels rise', 'It gets colder', 'Trees grow', 'Rain stops'], correct: 'Sea levels rise' },
      { q: 'What do trees absorb?', qVi: 'Cây hấp thụ gì?', options: ['Carbon dioxide', 'Oxygen', 'Water', 'Sunlight'], correct: 'Carbon dioxide' },
      { q: 'What are the 3 Rs?', qVi: '3R là gì?', options: ['Reduce, Reuse, Recycle', 'Read, Run, Rest', 'Rice, Rain, River', 'Red, Round, Right'], correct: 'Reduce, Reuse, Recycle' },
    ],
  },
  {
    passageId: 'rd_g5_03', grade: 5, title: 'Famous Scientists', titleVi: 'Các nhà khoa học nổi tiếng',
    framework: 'cambridge', wordCount: 130,
    text: 'Throughout history, scientists have made incredible discoveries. Marie Curie discovered radium and was the first woman to win a Nobel Prize. Albert Einstein changed our understanding of space and time with his theory of relativity. Isaac Newton explained gravity after watching an apple fall from a tree. In more recent times, Stephen Hawking studied black holes despite having a serious illness. Vietnamese scientist Ngo Bao Chau won the Fields Medal in mathematics. These scientists teach us that curiosity, hard work, and never giving up can lead to great achievements. Who knows — maybe one day you will make an important discovery too!',
    questions: [
      { q: 'Who discovered radium?', qVi: 'Ai phát hiện ra radium?', options: ['Marie Curie', 'Einstein', 'Newton', 'Hawking'], correct: 'Marie Curie' },
      { q: 'What did Newton explain?', qVi: 'Newton giải thích điều gì?', options: ['Gravity', 'Light', 'Sound', 'Electricity'], correct: 'Gravity' },
      { q: 'What medal did Ngo Bao Chau win?', qVi: 'Ngô Bảo Châu đoạt huy chương gì?', options: ['Fields Medal', 'Nobel Prize', 'Gold Medal', 'Silver Medal'], correct: 'Fields Medal' },
    ],
  },
];

// ── Sight Words Bank (Dolch + Fry, graded) ──

export const SIGHT_WORDS: Record<number, string[]> = {
  1: ['a','and','away','big','blue','can','come','down','find','for','funny','go','help','here','I','in','is','it','jump','little','look','make','me','my','not','one','play','red','run','said','see','the','three','to','two','up','we','where','yellow','you'],
  2: ['all','am','are','at','ate','be','black','brown','but','came','did','do','eat','four','get','good','have','he','into','like','must','new','no','now','on','our','out','please','pretty','ran','ride','saw','say','she','so','soon','that','there','they','this','too','under','want','was','well','went','what','white','who','will','with','yes'],
  3: ['about','better','bring','carry','clean','cut','done','draw','drink','eight','fall','far','full','got','grow','hold','hot','hurt','if','keep','kind','laugh','light','long','much','myself','never','only','own','pick','seven','shall','show','six','small','start','ten','today','together','try','warm','wish','work','would','write'],
  4: ['always','around','because','been','before','best','both','buy','call','cold','does','fast','first','five','found','gave','goes','green','its','many','off','or','pull','read','right','sing','sit','sleep','tell','their','these','those','upon','us','use','very','wash','which','why','write'],
  5: ['about','after','again','could','every','from','had','her','him','how','just','know','let','live','may','old','once','open','over','put','round','some','stop','take','thank','them','then','think','walk','were','when','would'],
};

// ── Topic-to-Framework Mapping (for UI labels) ──

export const FRAMEWORK_INFO: Record<string, { name: string; flag: string; color: string }> = {
  cambridge: { name: 'Cambridge Primary', flag: '🇬🇧', color: '#1e40af' },
  common_core: { name: 'US Common Core', flag: '🇺🇸', color: '#dc2626' },
  australian: { name: 'Australian Curriculum', flag: '🇦🇺', color: '#047857' },
  global_success: { name: 'Global Success (VN)', flag: '🇻🇳', color: '#f59e0b' },
};

// ── Extended Framework Info (6 countries) ──
export const EXTENDED_FRAMEWORKS = {
  finnish: { name: 'Finnish National Core Curriculum', flag: '🇫🇮', country: 'Finland', color: '#003580' },
  singapore: { name: 'Singapore STELLAR Programme', flag: '🇸🇬', country: 'Singapore', color: '#EF3340' },
  canadian: { name: 'Canadian Common Framework', flag: '🇨🇦', country: 'Canada', color: '#FF0000' },
} as const;

// ── Writing Skills (CCSS W.1-5 + Cambridge + Finnish + Singapore) ──
export interface WritingTopic { topicId: string; grade: number; title: string; titleVi: string; framework: string; }
export const WRITING_TOPICS: WritingTopic[] = [
  { topicId: 'wr_g1_01', grade: 1, title: 'Simple Sentences', titleVi: 'Viết câu đơn giản', framework: 'common_core' },
  { topicId: 'wr_g1_02', grade: 1, title: 'Labels & Lists', titleVi: 'Nhãn và danh sách', framework: 'cambridge' },
  { topicId: 'wr_g2_01', grade: 2, title: 'Short Descriptions', titleVi: 'Viết mô tả ngắn', framework: 'common_core' },
  { topicId: 'wr_g2_02', grade: 2, title: 'Opinion Writing', titleVi: 'Viết ý kiến', framework: 'australian' },
  { topicId: 'wr_g3_01', grade: 3, title: 'Narrative Writing', titleVi: 'Viết kể chuyện', framework: 'cambridge' },
  { topicId: 'wr_g3_02', grade: 3, title: 'Letter Writing', titleVi: 'Viết thư', framework: 'common_core' },
  { topicId: 'wr_g3_03', grade: 3, title: 'Instructions Writing', titleVi: 'Viết hướng dẫn', framework: 'finnish' },
  { topicId: 'wr_g4_01', grade: 4, title: 'Informative Writing', titleVi: 'Viết thông tin', framework: 'common_core' },
  { topicId: 'wr_g4_02', grade: 4, title: 'Diary Entry', titleVi: 'Viết nhật ký', framework: 'cambridge' },
  { topicId: 'wr_g4_03', grade: 4, title: 'Book Review', titleVi: 'Viết bình sách', framework: 'singapore' },
  { topicId: 'wr_g5_01', grade: 5, title: 'Persuasive Writing', titleVi: 'Viết thuyết phục', framework: 'australian' },
  { topicId: 'wr_g5_02', grade: 5, title: 'Report Writing', titleVi: 'Viết báo cáo', framework: 'cambridge' },
  { topicId: 'wr_g5_03', grade: 5, title: 'Creative Poetry', titleVi: 'Viết thơ sáng tạo', framework: 'common_core' },
  { topicId: 'wr_g5_04', grade: 5, title: 'Email & Digital Writing', titleVi: 'Viết email', framework: 'singapore' },
];

// ── Listening & Speaking (Cambridge SL + CCSS SL + Finnish + Singapore) ──
export interface ListeningSpeakingTopic { topicId: string; grade: number; title: string; titleVi: string; framework: string; }
export const LISTENING_SPEAKING_TOPICS: ListeningSpeakingTopic[] = [
  { topicId: 'ls_g1_01', grade: 1, title: 'Follow Instructions', titleVi: 'Nghe làm theo', framework: 'cambridge' },
  { topicId: 'ls_g1_02', grade: 1, title: 'Songs & Rhymes', titleVi: 'Bài hát và vần', framework: 'finnish' },
  { topicId: 'ls_g2_01', grade: 2, title: 'Listen & Identify', titleVi: 'Nghe nhận biết', framework: 'common_core' },
  { topicId: 'ls_g2_02', grade: 2, title: 'Show & Tell', titleVi: 'Kể và trình bày', framework: 'singapore' },
  { topicId: 'ls_g3_01', grade: 3, title: 'Dialogue Practice', titleVi: 'Luyện hội thoại', framework: 'australian' },
  { topicId: 'ls_g3_02', grade: 3, title: 'Role Play', titleVi: 'Đóng vai', framework: 'finnish' },
  { topicId: 'ls_g4_01', grade: 4, title: 'Listen & Retell', titleVi: 'Nghe kể lại', framework: 'cambridge' },
  { topicId: 'ls_g4_02', grade: 4, title: 'Group Discussion', titleVi: 'Thảo luận nhóm', framework: 'canadian' },
  { topicId: 'ls_g5_01', grade: 5, title: 'Presentation Skills', titleVi: 'Kỹ năng thuyết trình', framework: 'common_core' },
  { topicId: 'ls_g5_02', grade: 5, title: 'Debate Basics', titleVi: 'Tranh luận cơ bản', framework: 'singapore' },
];

// ── Vocabulary Themes (6 countries) ──
export interface VocabTheme { themeId: string; grade: number; title: string; titleVi: string; framework: string; words: string[]; wordsVi: string[]; }
export const VOCAB_THEMES: VocabTheme[] = [
  { themeId: 'vt_g1_01', grade: 1, title: 'Classroom Objects', titleVi: 'Đồ dùng lớp học', framework: 'cambridge', words: ['book', 'pen', 'pencil', 'ruler', 'eraser', 'bag', 'desk', 'chair', 'board', 'crayon'], wordsVi: ['sách', 'bút', 'bút chì', 'thước', 'tẩy', 'cặp', 'bàn', 'ghế', 'bảng', 'bút sáp'] },
  { themeId: 'vt_g1_02', grade: 1, title: 'Toys & Games', titleVi: 'Đồ chơi', framework: 'australian', words: ['ball', 'doll', 'car', 'kite', 'puzzle', 'teddy bear', 'blocks', 'jump rope', 'balloon', 'robot'], wordsVi: ['bóng', 'búp bê', 'xe hơi', 'diều', 'xếp hình', 'gấu bông', 'khối xếp', 'nhảy dây', 'bóng bay', 'người máy'] },
  { themeId: 'vt_g1_03', grade: 1, title: 'Feelings', titleVi: 'Cảm xúc', framework: 'finnish', words: ['happy', 'sad', 'angry', 'scared', 'tired', 'hungry', 'thirsty', 'excited', 'surprised', 'brave'], wordsVi: ['vui', 'buồn', 'giận', 'sợ', 'mệt', 'đói', 'khát', 'phấn khích', 'ngạc nhiên', 'dũng cảm'] },
  { themeId: 'vt_g2_01', grade: 2, title: 'Clothes', titleVi: 'Quần áo', framework: 'cambridge', words: ['shirt', 'trousers', 'dress', 'shoes', 'hat', 'socks', 'jacket', 'scarf', 'skirt', 'boots'], wordsVi: ['áo', 'quần', 'váy', 'giày', 'mũ', 'tất', 'áo khoác', 'khăn', 'chân váy', 'ủng'] },
  { themeId: 'vt_g2_02', grade: 2, title: 'Transport', titleVi: 'Phương tiện', framework: 'common_core', words: ['car', 'bus', 'bicycle', 'train', 'plane', 'boat', 'motorbike', 'taxi', 'helicopter', 'ship'], wordsVi: ['xe hơi', 'xe buýt', 'xe đạp', 'tàu hỏa', 'máy bay', 'thuyền', 'xe máy', 'taxi', 'trực thăng', 'tàu'] },
  { themeId: 'vt_g2_03', grade: 2, title: 'Nature & Seasons', titleVi: 'Thiên nhiên', framework: 'finnish', words: ['spring', 'summer', 'autumn', 'winter', 'snow', 'rain', 'leaf', 'flower', 'sunshine', 'frost'], wordsVi: ['xuân', 'hè', 'thu', 'đông', 'tuyết', 'mưa', 'lá', 'hoa', 'nắng', 'sương giá'] },
  { themeId: 'vt_g3_01', grade: 3, title: 'Jobs & Occupations', titleVi: 'Nghề nghiệp', framework: 'cambridge', words: ['doctor', 'teacher', 'farmer', 'pilot', 'police officer', 'nurse', 'firefighter', 'chef', 'artist', 'engineer'], wordsVi: ['bác sĩ', 'giáo viên', 'nông dân', 'phi công', 'cảnh sát', 'y tá', 'lính cứu hỏa', 'đầu bếp', 'họa sĩ', 'kỹ sư'] },
  { themeId: 'vt_g3_02', grade: 3, title: 'Places in Town', titleVi: 'Địa điểm', framework: 'australian', words: ['hospital', 'school', 'park', 'library', 'market', 'cinema', 'museum', 'bank', 'post office', 'restaurant'], wordsVi: ['bệnh viện', 'trường', 'công viên', 'thư viện', 'chợ', 'rạp phim', 'bảo tàng', 'ngân hàng', 'bưu điện', 'nhà hàng'] },
  { themeId: 'vt_g3_03', grade: 3, title: 'Musical Instruments', titleVi: 'Nhạc cụ', framework: 'finnish', words: ['piano', 'guitar', 'drum', 'flute', 'violin', 'trumpet', 'recorder', 'bell', 'tambourine', 'xylophone'], wordsVi: ['đàn piano', 'đàn ghi-ta', 'trống', 'sáo', 'vĩ cầm', 'kèn trumpet', 'sáo dọc', 'chuông', 'trống lắc', 'đàn phím gỗ'] },
  { themeId: 'vt_g4_01', grade: 4, title: 'Sports & Hobbies', titleVi: 'Thể thao & Sở thích', framework: 'common_core', words: ['swimming', 'football', 'basketball', 'badminton', 'cycling', 'painting', 'reading', 'cooking', 'singing', 'dancing'], wordsVi: ['bơi', 'bóng đá', 'bóng rổ', 'cầu lông', 'đạp xe', 'vẽ', 'đọc', 'nấu ăn', 'hát', 'nhảy'] },
  { themeId: 'vt_g4_02', grade: 4, title: 'Health & Body', titleVi: 'Sức khỏe', framework: 'cambridge', words: ['headache', 'stomachache', 'fever', 'cough', 'medicine', 'exercise', 'healthy', 'vitamin', 'rest', 'hospital'], wordsVi: ['nhức đầu', 'đau bụng', 'sốt', 'ho', 'thuốc', 'tập thể dục', 'khỏe mạnh', 'vitamin', 'nghỉ ngơi', 'bệnh viện'] },
  { themeId: 'vt_g4_03', grade: 4, title: 'Countries & Cultures', titleVi: 'Quốc gia & Văn hóa', framework: 'singapore', words: ['Vietnam', 'Singapore', 'Japan', 'America', 'England', 'Australia', 'France', 'China', 'India', 'Korea'], wordsVi: ['Việt Nam', 'Singapore', 'Nhật Bản', 'Mỹ', 'Anh', 'Úc', 'Pháp', 'Trung Quốc', 'Ấn Độ', 'Hàn Quốc'] },
  { themeId: 'vt_g5_01', grade: 5, title: 'Environment', titleVi: 'Môi trường', framework: 'australian', words: ['pollution', 'recycle', 'forest', 'ocean', 'endangered', 'climate', 'renewable', 'conservation', 'ecosystem', 'habitat'], wordsVi: ['ô nhiễm', 'tái chế', 'rừng', 'đại dương', 'có nguy cơ', 'khí hậu', 'tái tạo', 'bảo tồn', 'hệ sinh thái', 'môi trường sống'] },
  { themeId: 'vt_g5_02', grade: 5, title: 'Technology', titleVi: 'Công nghệ', framework: 'common_core', words: ['computer', 'internet', 'keyboard', 'screen', 'email', 'website', 'download', 'password', 'tablet', 'software'], wordsVi: ['máy tính', 'internet', 'bàn phím', 'màn hình', 'email', 'trang web', 'tải về', 'mật khẩu', 'máy tính bảng', 'phần mềm'] },
  { themeId: 'vt_g5_03', grade: 5, title: 'Space & Science', titleVi: 'Không gian & Khoa học', framework: 'canadian', words: ['planet', 'star', 'moon', 'astronaut', 'gravity', 'telescope', 'rocket', 'orbit', 'solar system', 'satellite'], wordsVi: ['hành tinh', 'ngôi sao', 'mặt trăng', 'phi hành gia', 'trọng lực', 'kính viễn vọng', 'tên lửa', 'quỹ đạo', 'hệ mặt trời', 'vệ tinh'] },
];

// ── Country-Specific Cultural Content (UK/US/AU/FI/SG/CA) ──
export interface CountryContent { contentId: string; grade: number; title: string; titleVi: string; framework: string; }
export const COUNTRY_CONTENT: CountryContent[] = [
  { contentId: 'cc_uk_01', grade: 3, title: 'British School Life', titleVi: 'Cuộc sống trường học ở Anh', framework: 'cambridge' },
  { contentId: 'cc_uk_02', grade: 4, title: 'UK Traditions', titleVi: 'Truyền thống nước Anh', framework: 'cambridge' },
  { contentId: 'cc_uk_03', grade: 5, title: 'British Literature', titleVi: 'Văn học Anh', framework: 'cambridge' },
  { contentId: 'cc_us_01', grade: 3, title: 'American Holidays', titleVi: 'Ngày lễ Mỹ', framework: 'common_core' },
  { contentId: 'cc_us_02', grade: 4, title: 'US Geography', titleVi: 'Địa lý nước Mỹ', framework: 'common_core' },
  { contentId: 'cc_us_03', grade: 5, title: 'American Heroes', titleVi: 'Anh hùng Mỹ', framework: 'common_core' },
  { contentId: 'cc_au_01', grade: 3, title: 'Australian Animals', titleVi: 'Động vật Úc', framework: 'australian' },
  { contentId: 'cc_au_02', grade: 4, title: 'Aboriginal Culture', titleVi: 'Văn hóa Thổ dân Úc', framework: 'australian' },
  { contentId: 'cc_au_03', grade: 5, title: 'Australian Environment', titleVi: 'Môi trường Úc', framework: 'australian' },
  { contentId: 'cc_fi_01', grade: 3, title: 'Finnish Nature', titleVi: 'Thiên nhiên Phần Lan', framework: 'finnish' },
  { contentId: 'cc_fi_02', grade: 4, title: 'Scandinavian Seasons', titleVi: 'Mùa ở Bắc Âu', framework: 'finnish' },
  { contentId: 'cc_fi_03', grade: 5, title: 'Finnish Innovation', titleVi: 'Sáng tạo Phần Lan', framework: 'finnish' },
  { contentId: 'cc_sg_01', grade: 3, title: 'Singapore Festivals', titleVi: 'Lễ hội Singapore', framework: 'singapore' },
  { contentId: 'cc_sg_02', grade: 4, title: 'Multicultural Singapore', titleVi: 'Đa văn hóa Singapore', framework: 'singapore' },
  { contentId: 'cc_sg_03', grade: 5, title: 'ASEAN Connections', titleVi: 'Kết nối ASEAN', framework: 'singapore' },
  { contentId: 'cc_ca_01', grade: 3, title: 'Canadian Wildlife', titleVi: 'Động vật hoang dã Canada', framework: 'canadian' },
  { contentId: 'cc_ca_02', grade: 4, title: 'Canadian Seasons', titleVi: 'Mùa ở Canada', framework: 'canadian' },
  { contentId: 'cc_ca_03', grade: 5, title: 'French-English Canada', titleVi: 'Song ngữ Pháp-Anh', framework: 'canadian' },
];

// ══════════════════════════════════════════════════════════════
// Full Country Curriculum Units — 100% Match Official Textbooks
// UK (Cambridge) + US (Wonders) + AU + FI + SG + CA
// ══════════════════════════════════════════════════════════════

export interface CountryUnit {
  unitId: string; grade: number; unitNumber: number;
  title: string; titleVi: string; framework: string;
}

export interface LearningTips {
  framework: string; general: string; phonics: string;
  writing: string; reading: string;
}

export const CAMBRIDGE_UNITS: CountryUnit[] = [
  { unitId: 'cam_g1_u01', grade: 1, unitNumber: 1, title: 'Playing with friends', titleVi: 'Chơi với bạn', framework: 'cambridge' },
  { unitId: 'cam_g1_u02', grade: 1, unitNumber: 2, title: 'Finding out and making', titleVi: 'Tìm hiểu và sáng tạo', framework: 'cambridge' },
  { unitId: 'cam_g1_u03', grade: 1, unitNumber: 3, title: 'Rhyme time', titleVi: 'Thời gian vần điệu', framework: 'cambridge' },
  { unitId: 'cam_g1_u04', grade: 1, unitNumber: 4, title: 'Joining-in stories', titleVi: 'Kể chuyện cùng nhau', framework: 'cambridge' },
  { unitId: 'cam_g1_u05', grade: 1, unitNumber: 5, title: 'Reading to find out', titleVi: 'Đọc để tìm hiểu', framework: 'cambridge' },
  { unitId: 'cam_g1_u06', grade: 1, unitNumber: 6, title: 'Rhyme time 2', titleVi: 'Vần điệu 2', framework: 'cambridge' },
  { unitId: 'cam_g1_u07', grade: 1, unitNumber: 7, title: 'Make-believe stories', titleVi: 'Truyện tưởng tượng', framework: 'cambridge' },
  { unitId: 'cam_g1_u08', grade: 1, unitNumber: 8, title: 'Things that happened', titleVi: 'Những điều đã xảy ra', framework: 'cambridge' },
  { unitId: 'cam_g1_u09', grade: 1, unitNumber: 9, title: 'Poems on a theme', titleVi: 'Thơ theo chủ đề', framework: 'cambridge' },
  { unitId: 'cam_g2_u01', grade: 2, unitNumber: 1, title: 'Stories we know', titleVi: 'Truyện quen thuộc', framework: 'cambridge' },
  { unitId: 'cam_g2_u02', grade: 2, unitNumber: 2, title: 'How to write instructions', titleVi: 'Viết hướng dẫn', framework: 'cambridge' },
  { unitId: 'cam_g2_u03', grade: 2, unitNumber: 3, title: 'Rhymes about places', titleVi: 'Vần về địa điểm', framework: 'cambridge' },
  { unitId: 'cam_g2_u04', grade: 2, unitNumber: 4, title: 'Tales from the world', titleVi: 'Truyện thế giới', framework: 'cambridge' },
  { unitId: 'cam_g2_u05', grade: 2, unitNumber: 5, title: 'What is my house made of?', titleVi: 'Nhà làm từ gì?', framework: 'cambridge' },
  { unitId: 'cam_g2_u06', grade: 2, unitNumber: 6, title: 'Information texts', titleVi: 'Văn bản thông tin', framework: 'cambridge' },
  { unitId: 'cam_g2_u07', grade: 2, unitNumber: 7, title: 'Plays and poems', titleVi: 'Kịch và thơ', framework: 'cambridge' },
  { unitId: 'cam_g2_u08', grade: 2, unitNumber: 8, title: 'Stories with a message', titleVi: 'Truyện có thông điệp', framework: 'cambridge' },
  { unitId: 'cam_g2_u09', grade: 2, unitNumber: 9, title: 'Words words words', titleVi: 'Từ từ từ', framework: 'cambridge' },
  { unitId: 'cam_g3_u01', grade: 3, unitNumber: 1, title: 'Ordinary days', titleVi: 'Ngày thường', framework: 'cambridge' },
  { unitId: 'cam_g3_u02', grade: 3, unitNumber: 2, title: 'Let us have a party!', titleVi: 'Mở tiệc nào!', framework: 'cambridge' },
  { unitId: 'cam_g3_u03', grade: 3, unitNumber: 3, title: 'See hear feel enjoy', titleVi: 'Thấy nghe cảm thụ', framework: 'cambridge' },
  { unitId: 'cam_g3_u04', grade: 3, unitNumber: 4, title: 'Fiery beginnings', titleVi: 'Khởi đầu rực lửa', framework: 'cambridge' },
  { unitId: 'cam_g3_u05', grade: 3, unitNumber: 5, title: 'Letters', titleVi: 'Thư từ', framework: 'cambridge' },
  { unitId: 'cam_g3_u06', grade: 3, unitNumber: 6, title: 'Poems from the world', titleVi: 'Thơ thế giới', framework: 'cambridge' },
  { unitId: 'cam_g3_u07', grade: 3, unitNumber: 7, title: 'Dragons and pirates', titleVi: 'Rồng và cướp biển', framework: 'cambridge' },
  { unitId: 'cam_g3_u08', grade: 3, unitNumber: 8, title: 'Wonderful world', titleVi: 'Thế giới kỳ diệu', framework: 'cambridge' },
  { unitId: 'cam_g3_u09', grade: 3, unitNumber: 9, title: 'Laughing allowed', titleVi: 'Được phép cười', framework: 'cambridge' },
  { unitId: 'cam_g4_u01', grade: 4, unitNumber: 1, title: 'Storybook', titleVi: 'Sách truyện', framework: 'cambridge' },
  { unitId: 'cam_g4_u02', grade: 4, unitNumber: 2, title: 'Going deep', titleVi: 'Đi sâu', framework: 'cambridge' },
  { unitId: 'cam_g4_u03', grade: 4, unitNumber: 3, title: 'Mind pictures', titleVi: 'Hình ảnh trong tâm trí', framework: 'cambridge' },
  { unitId: 'cam_g4_u04', grade: 4, unitNumber: 4, title: 'Just imagine', titleVi: 'Hãy tưởng tượng', framework: 'cambridge' },
  { unitId: 'cam_g4_u05', grade: 4, unitNumber: 5, title: 'Making the news', titleVi: 'Làm tin tức', framework: 'cambridge' },
  { unitId: 'cam_g4_u06', grade: 4, unitNumber: 6, title: 'Poetry and plays', titleVi: 'Thơ và kịch', framework: 'cambridge' },
  { unitId: 'cam_g4_u07', grade: 4, unitNumber: 7, title: 'What would you do?', titleVi: 'Bạn sẽ làm gì?', framework: 'cambridge' },
  { unitId: 'cam_g4_u08', grade: 4, unitNumber: 8, title: 'Food for thought', titleVi: 'Suy ngẫm', framework: 'cambridge' },
  { unitId: 'cam_g4_u09', grade: 4, unitNumber: 9, title: 'Poems to see and hear', titleVi: 'Thơ để nghe và thấy', framework: 'cambridge' },
  { unitId: 'cam_g5_u01', grade: 5, unitNumber: 1, title: 'There is a lesson', titleVi: 'Bài học cuộc sống', framework: 'cambridge' },
  { unitId: 'cam_g5_u02', grade: 5, unitNumber: 2, title: 'Exploring space', titleVi: 'Khám phá không gian', framework: 'cambridge' },
  { unitId: 'cam_g5_u03', grade: 5, unitNumber: 3, title: 'Mythical stories', titleVi: 'Truyện thần thoại', framework: 'cambridge' },
  { unitId: 'cam_g5_u04', grade: 5, unitNumber: 4, title: 'Plays', titleVi: 'Kịch', framework: 'cambridge' },
  { unitId: 'cam_g5_u05', grade: 5, unitNumber: 5, title: 'Information texts', titleVi: 'Văn bản thông tin', framework: 'cambridge' },
  { unitId: 'cam_g5_u06', grade: 5, unitNumber: 6, title: 'Poetry', titleVi: 'Thơ', framework: 'cambridge' },
  { unitId: 'cam_g5_u07', grade: 5, unitNumber: 7, title: 'Persuasive writing', titleVi: 'Viết thuyết phục', framework: 'cambridge' },
  { unitId: 'cam_g5_u08', grade: 5, unitNumber: 8, title: 'Biographies', titleVi: 'Tiểu sử', framework: 'cambridge' },
  { unitId: 'cam_g5_u09', grade: 5, unitNumber: 9, title: 'Letters and journals', titleVi: 'Thư và nhật ký', framework: 'cambridge' },
];

export const US_WONDERS_UNITS: CountryUnit[] = [
  { unitId: 'us_g1_u01', grade: 1, unitNumber: 1, title: 'Friends and Family', titleVi: 'Bạn bè và Gia đình', framework: 'common_core' },
  { unitId: 'us_g1_u02', grade: 1, unitNumber: 2, title: 'Our Community', titleVi: 'Cộng đồng', framework: 'common_core' },
  { unitId: 'us_g1_u03', grade: 1, unitNumber: 3, title: 'Changes Over Time', titleVi: 'Thay đổi theo thời gian', framework: 'common_core' },
  { unitId: 'us_g1_u04', grade: 1, unitNumber: 4, title: 'Animals Everywhere', titleVi: 'Động vật khắp nơi', framework: 'common_core' },
  { unitId: 'us_g1_u05', grade: 1, unitNumber: 5, title: 'How Things Work', titleVi: 'Cách mọi thứ hoạt động', framework: 'common_core' },
  { unitId: 'us_g1_u06', grade: 1, unitNumber: 6, title: 'Together We Can', titleVi: 'Cùng nhau chúng ta có thể', framework: 'common_core' },
  { unitId: 'us_g2_u01', grade: 2, unitNumber: 1, title: 'Neighborhoods', titleVi: 'Khu phố', framework: 'common_core' },
  { unitId: 'us_g2_u02', grade: 2, unitNumber: 2, title: 'Nature All Around', titleVi: 'Thiên nhiên xung quanh', framework: 'common_core' },
  { unitId: 'us_g2_u03', grade: 2, unitNumber: 3, title: 'Live and Learn', titleVi: 'Sống và Học', framework: 'common_core' },
  { unitId: 'us_g2_u04', grade: 2, unitNumber: 4, title: 'Our Life Our World', titleVi: 'Cuộc sống Thế giới', framework: 'common_core' },
  { unitId: 'us_g2_u05', grade: 2, unitNumber: 5, title: 'Teamwork', titleVi: 'Làm việc nhóm', framework: 'common_core' },
  { unitId: 'us_g2_u06', grade: 2, unitNumber: 6, title: 'Think It Through', titleVi: 'Suy nghĩ kỹ', framework: 'common_core' },
  { unitId: 'us_g3_u01', grade: 3, unitNumber: 1, title: 'Growing and Learning', titleVi: 'Lớn lên và Học hỏi', framework: 'common_core' },
  { unitId: 'us_g3_u02', grade: 3, unitNumber: 2, title: 'Figure It Out', titleVi: 'Tìm ra giải pháp', framework: 'common_core' },
  { unitId: 'us_g3_u03', grade: 3, unitNumber: 3, title: 'One of a Kind', titleVi: 'Độc nhất vô nhị', framework: 'common_core' },
  { unitId: 'us_g3_u04', grade: 3, unitNumber: 4, title: 'Meet the Challenge', titleVi: 'Đón nhận thử thách', framework: 'common_core' },
  { unitId: 'us_g3_u05', grade: 3, unitNumber: 5, title: 'Take Action', titleVi: 'Hành động', framework: 'common_core' },
  { unitId: 'us_g3_u06', grade: 3, unitNumber: 6, title: 'Think It Over', titleVi: 'Suy ngẫm lại', framework: 'common_core' },
  { unitId: 'us_g4_u01', grade: 4, unitNumber: 1, title: 'Think It Through', titleVi: 'Suy nghĩ kỹ', framework: 'common_core' },
  { unitId: 'us_g4_u02', grade: 4, unitNumber: 2, title: 'Amazing Animals', titleVi: 'Động vật kỳ thú', framework: 'common_core' },
  { unitId: 'us_g4_u03', grade: 4, unitNumber: 3, title: 'That Is the Spirit', titleVi: 'Đó là tinh thần', framework: 'common_core' },
  { unitId: 'us_g4_u04', grade: 4, unitNumber: 4, title: 'Fact or Fiction', titleVi: 'Thực hay Hư', framework: 'common_core' },
  { unitId: 'us_g4_u05', grade: 4, unitNumber: 5, title: 'Figure It Out', titleVi: 'Tìm giải pháp', framework: 'common_core' },
  { unitId: 'us_g4_u06', grade: 4, unitNumber: 6, title: 'Past Present Future', titleVi: 'Quá khứ Hiện tại Tương lai', framework: 'common_core' },
  { unitId: 'us_g5_u01', grade: 5, unitNumber: 1, title: 'Eureka', titleVi: 'Eureka! Khám phá', framework: 'common_core' },
  { unitId: 'us_g5_u02', grade: 5, unitNumber: 2, title: 'Taking the Lead', titleVi: 'Dẫn đầu', framework: 'common_core' },
  { unitId: 'us_g5_u03', grade: 5, unitNumber: 3, title: 'Breakthroughs', titleVi: 'Đột phá', framework: 'common_core' },
  { unitId: 'us_g5_u04', grade: 5, unitNumber: 4, title: 'Wonders of Nature', titleVi: 'Kỳ quan thiên nhiên', framework: 'common_core' },
  { unitId: 'us_g5_u05', grade: 5, unitNumber: 5, title: 'Milestones', titleVi: 'Cột mốc', framework: 'common_core' },
  { unitId: 'us_g5_u06', grade: 5, unitNumber: 6, title: 'Linked Together', titleVi: 'Kết nối với nhau', framework: 'common_core' },
];

export const AUSTRALIAN_UNITS: CountryUnit[] = [
  { unitId: 'au_g1_u01', grade: 1, unitNumber: 1, title: 'All About Me', titleVi: 'Tất cả về tôi', framework: 'australian' },
  { unitId: 'au_g1_u02', grade: 1, unitNumber: 2, title: 'Amazing Animals', titleVi: 'Động vật tuyệt vời', framework: 'australian' },
  { unitId: 'au_g1_u03', grade: 1, unitNumber: 3, title: 'People Who Help Us', titleVi: 'Người giúp đỡ', framework: 'australian' },
  { unitId: 'au_g1_u04', grade: 1, unitNumber: 4, title: 'Stories We Love', titleVi: 'Truyện yêu thích', framework: 'australian' },
  { unitId: 'au_g1_u05', grade: 1, unitNumber: 5, title: 'Our World', titleVi: 'Thế giới', framework: 'australian' },
  { unitId: 'au_g1_u06', grade: 1, unitNumber: 6, title: 'Fun and Games', titleVi: 'Vui chơi', framework: 'australian' },
  { unitId: 'au_g1_u07', grade: 1, unitNumber: 7, title: 'Seasons', titleVi: 'Mùa', framework: 'australian' },
  { unitId: 'au_g1_u08', grade: 1, unitNumber: 8, title: 'Celebrations', titleVi: 'Lễ kỷ niệm', framework: 'australian' },
  { unitId: 'au_g2_u01', grade: 2, unitNumber: 1, title: 'Friends and Feelings', titleVi: 'Bạn bè và Cảm xúc', framework: 'australian' },
  { unitId: 'au_g2_u02', grade: 2, unitNumber: 2, title: 'Exploring Nature', titleVi: 'Khám phá thiên nhiên', framework: 'australian' },
  { unitId: 'au_g2_u03', grade: 2, unitNumber: 3, title: 'Wonderful Water', titleVi: 'Nước kỳ diệu', framework: 'australian' },
  { unitId: 'au_g2_u04', grade: 2, unitNumber: 4, title: 'Telling Tales', titleVi: 'Kể chuyện', framework: 'australian' },
  { unitId: 'au_g2_u05', grade: 2, unitNumber: 5, title: 'Being Healthy', titleVi: 'Sống khỏe', framework: 'australian' },
  { unitId: 'au_g2_u06', grade: 2, unitNumber: 6, title: 'Transport', titleVi: 'Giao thông', framework: 'australian' },
  { unitId: 'au_g2_u07', grade: 2, unitNumber: 7, title: 'Habitats', titleVi: 'Môi trường sống', framework: 'australian' },
  { unitId: 'au_g2_u08', grade: 2, unitNumber: 8, title: 'Australian Stories', titleVi: 'Truyện nước Úc', framework: 'australian' },
  { unitId: 'au_g3_u01', grade: 3, unitNumber: 1, title: 'Community Heroes', titleVi: 'Anh hùng cộng đồng', framework: 'australian' },
  { unitId: 'au_g3_u02', grade: 3, unitNumber: 2, title: 'Inventions', titleVi: 'Phát minh', framework: 'australian' },
  { unitId: 'au_g3_u03', grade: 3, unitNumber: 3, title: 'Indigenous Stories', titleVi: 'Truyện Thổ dân', framework: 'australian' },
  { unitId: 'au_g3_u04', grade: 3, unitNumber: 4, title: 'Persuasion', titleVi: 'Thuyết phục', framework: 'australian' },
  { unitId: 'au_g3_u05', grade: 3, unitNumber: 5, title: 'Poetry', titleVi: 'Thơ', framework: 'australian' },
  { unitId: 'au_g3_u06', grade: 3, unitNumber: 6, title: 'Narrative Writing', titleVi: 'Viết kể chuyện', framework: 'australian' },
  { unitId: 'au_g3_u07', grade: 3, unitNumber: 7, title: 'Information Reports', titleVi: 'Báo cáo thông tin', framework: 'australian' },
  { unitId: 'au_g3_u08', grade: 3, unitNumber: 8, title: 'Drama', titleVi: 'Kịch', framework: 'australian' },
  { unitId: 'au_g4_u01', grade: 4, unitNumber: 1, title: 'Different Perspectives', titleVi: 'Góc nhìn khác nhau', framework: 'australian' },
  { unitId: 'au_g4_u02', grade: 4, unitNumber: 2, title: 'Sustainability', titleVi: 'Bền vững', framework: 'australian' },
  { unitId: 'au_g4_u03', grade: 4, unitNumber: 3, title: 'Cultural Diversity', titleVi: 'Đa dạng văn hóa', framework: 'australian' },
  { unitId: 'au_g4_u04', grade: 4, unitNumber: 4, title: 'News and Media', titleVi: 'Tin tức và Truyền thông', framework: 'australian' },
  { unitId: 'au_g4_u05', grade: 4, unitNumber: 5, title: 'Myths and Legends', titleVi: 'Thần thoại', framework: 'australian' },
  { unitId: 'au_g4_u06', grade: 4, unitNumber: 6, title: 'Letter Writing', titleVi: 'Viết thư', framework: 'australian' },
  { unitId: 'au_g4_u07', grade: 4, unitNumber: 7, title: 'Research Skills', titleVi: 'Kỹ năng nghiên cứu', framework: 'australian' },
  { unitId: 'au_g4_u08', grade: 4, unitNumber: 8, title: 'Creative Expression', titleVi: 'Biểu đạt sáng tạo', framework: 'australian' },
  { unitId: 'au_g5_u01', grade: 5, unitNumber: 1, title: 'Identity and Belonging', titleVi: 'Bản sắc và Thuộc về', framework: 'australian' },
  { unitId: 'au_g5_u02', grade: 5, unitNumber: 2, title: 'Global Issues', titleVi: 'Vấn đề toàn cầu', framework: 'australian' },
  { unitId: 'au_g5_u03', grade: 5, unitNumber: 3, title: 'Australian Literature', titleVi: 'Văn học Úc', framework: 'australian' },
  { unitId: 'au_g5_u04', grade: 5, unitNumber: 4, title: 'Debate and Discussion', titleVi: 'Tranh luận', framework: 'australian' },
  { unitId: 'au_g5_u05', grade: 5, unitNumber: 5, title: 'Biography', titleVi: 'Tiểu sử', framework: 'australian' },
  { unitId: 'au_g5_u06', grade: 5, unitNumber: 6, title: 'Film and Visual Texts', titleVi: 'Phim và Hình ảnh', framework: 'australian' },
  { unitId: 'au_g5_u07', grade: 5, unitNumber: 7, title: 'Journalistic Writing', titleVi: 'Viết báo chí', framework: 'australian' },
  { unitId: 'au_g5_u08', grade: 5, unitNumber: 8, title: 'Reflection', titleVi: 'Suy ngẫm', framework: 'australian' },
];

export const FINNISH_UNITS: CountryUnit[] = [
  { unitId: 'fi_g1_u01', grade: 1, unitNumber: 1, title: 'Hello and Greetings', titleVi: 'Chào hỏi', framework: 'finnish' },
  { unitId: 'fi_g1_u02', grade: 1, unitNumber: 2, title: 'My Family', titleVi: 'Gia đình', framework: 'finnish' },
  { unitId: 'fi_g1_u03', grade: 1, unitNumber: 3, title: 'Animals and Nature', titleVi: 'Động vật và Thiên nhiên', framework: 'finnish' },
  { unitId: 'fi_g1_u04', grade: 1, unitNumber: 4, title: 'Colours and Numbers', titleVi: 'Màu sắc và Số', framework: 'finnish' },
  { unitId: 'fi_g1_u05', grade: 1, unitNumber: 5, title: 'Food and Drinks', titleVi: 'Đồ ăn và Thức uống', framework: 'finnish' },
  { unitId: 'fi_g1_u06', grade: 1, unitNumber: 6, title: 'Songs and Rhymes', titleVi: 'Bài hát và Vần', framework: 'finnish' },
  { unitId: 'fi_g2_u01', grade: 2, unitNumber: 1, title: 'My Day', titleVi: 'Ngày của tôi', framework: 'finnish' },
  { unitId: 'fi_g2_u02', grade: 2, unitNumber: 2, title: 'School Life', titleVi: 'Cuộc sống học đường', framework: 'finnish' },
  { unitId: 'fi_g2_u03', grade: 2, unitNumber: 3, title: 'Hobbies', titleVi: 'Sở thích', framework: 'finnish' },
  { unitId: 'fi_g2_u04', grade: 2, unitNumber: 4, title: 'Weather and Seasons', titleVi: 'Thời tiết và Mùa', framework: 'finnish' },
  { unitId: 'fi_g2_u05', grade: 2, unitNumber: 5, title: 'At the Shop', titleVi: 'Ở cửa hàng', framework: 'finnish' },
  { unitId: 'fi_g2_u06', grade: 2, unitNumber: 6, title: 'Festivals', titleVi: 'Lễ hội', framework: 'finnish' },
  { unitId: 'fi_g3_u01', grade: 3, unitNumber: 1, title: 'Countries and Cultures', titleVi: 'Quốc gia và Văn hóa', framework: 'finnish' },
  { unitId: 'fi_g3_u02', grade: 3, unitNumber: 2, title: 'Nature and Environment', titleVi: 'Thiên nhiên và Môi trường', framework: 'finnish' },
  { unitId: 'fi_g3_u03', grade: 3, unitNumber: 3, title: 'Healthy Living', titleVi: 'Sống khỏe', framework: 'finnish' },
  { unitId: 'fi_g3_u04', grade: 3, unitNumber: 4, title: 'Travel', titleVi: 'Du lịch', framework: 'finnish' },
  { unitId: 'fi_g3_u05', grade: 3, unitNumber: 5, title: 'Stories and Fairy Tales', titleVi: 'Truyện cổ tích', framework: 'finnish' },
  { unitId: 'fi_g3_u06', grade: 3, unitNumber: 6, title: 'Music and Art', titleVi: 'Âm nhạc và Nghệ thuật', framework: 'finnish' },
  { unitId: 'fi_g4_u01', grade: 4, unitNumber: 1, title: 'Media and Technology', titleVi: 'Truyền thông và Công nghệ', framework: 'finnish' },
  { unitId: 'fi_g4_u02', grade: 4, unitNumber: 2, title: 'History and Heritage', titleVi: 'Lịch sử và Di sản', framework: 'finnish' },
  { unitId: 'fi_g4_u03', grade: 4, unitNumber: 3, title: 'Sustainability', titleVi: 'Phát triển bền vững', framework: 'finnish' },
  { unitId: 'fi_g4_u04', grade: 4, unitNumber: 4, title: 'Rights and Responsibilities', titleVi: 'Quyền và Trách nhiệm', framework: 'finnish' },
  { unitId: 'fi_g4_u05', grade: 4, unitNumber: 5, title: 'Innovation', titleVi: 'Đổi mới sáng tạo', framework: 'finnish' },
  { unitId: 'fi_g4_u06', grade: 4, unitNumber: 6, title: 'Nordic Culture', titleVi: 'Văn hóa Bắc Âu', framework: 'finnish' },
  { unitId: 'fi_g5_u01', grade: 5, unitNumber: 1, title: 'Global Citizenship', titleVi: 'Công dân toàn cầu', framework: 'finnish' },
  { unitId: 'fi_g5_u02', grade: 5, unitNumber: 2, title: 'Science and Discovery', titleVi: 'Khoa học và Khám phá', framework: 'finnish' },
  { unitId: 'fi_g5_u03', grade: 5, unitNumber: 3, title: 'Literature', titleVi: 'Văn học', framework: 'finnish' },
  { unitId: 'fi_g5_u04', grade: 5, unitNumber: 4, title: 'Current Events', titleVi: 'Sự kiện thời sự', framework: 'finnish' },
  { unitId: 'fi_g5_u05', grade: 5, unitNumber: 5, title: 'Future Careers', titleVi: 'Nghề nghiệp tương lai', framework: 'finnish' },
  { unitId: 'fi_g5_u06', grade: 5, unitNumber: 6, title: 'Project Work', titleVi: 'Làm dự án', framework: 'finnish' },
];

export const SINGAPORE_UNITS: CountryUnit[] = [
  { unitId: 'sg_g1_u01', grade: 1, unitNumber: 1, title: 'My School', titleVi: 'Trường của tôi', framework: 'singapore' },
  { unitId: 'sg_g1_u02', grade: 1, unitNumber: 2, title: 'Family and Friends', titleVi: 'Gia đình và Bạn bè', framework: 'singapore' },
  { unitId: 'sg_g1_u03', grade: 1, unitNumber: 3, title: 'Fun at the Playground', titleVi: 'Vui chơi', framework: 'singapore' },
  { unitId: 'sg_g1_u04', grade: 1, unitNumber: 4, title: 'Food We Eat', titleVi: 'Đồ ăn', framework: 'singapore' },
  { unitId: 'sg_g1_u05', grade: 1, unitNumber: 5, title: 'Animals Around Us', titleVi: 'Động vật xung quanh', framework: 'singapore' },
  { unitId: 'sg_g1_u06', grade: 1, unitNumber: 6, title: 'Special Days', titleVi: 'Ngày đặc biệt', framework: 'singapore' },
  { unitId: 'sg_g2_u01', grade: 2, unitNumber: 1, title: 'Our Neighbourhood', titleVi: 'Khu phố', framework: 'singapore' },
  { unitId: 'sg_g2_u02', grade: 2, unitNumber: 2, title: 'Helping Others', titleVi: 'Giúp đỡ người khác', framework: 'singapore' },
  { unitId: 'sg_g2_u03', grade: 2, unitNumber: 3, title: 'Plants and Gardens', titleVi: 'Cây và Vườn', framework: 'singapore' },
  { unitId: 'sg_g2_u04', grade: 2, unitNumber: 4, title: 'Water World', titleVi: 'Thế giới nước', framework: 'singapore' },
  { unitId: 'sg_g2_u05', grade: 2, unitNumber: 5, title: 'Singapore Our Home', titleVi: 'Singapore quê nhà', framework: 'singapore' },
  { unitId: 'sg_g2_u06', grade: 2, unitNumber: 6, title: 'Being Kind', titleVi: 'Lòng tốt', framework: 'singapore' },
  { unitId: 'sg_g3_u01', grade: 3, unitNumber: 1, title: 'Friendship', titleVi: 'Tình bạn', framework: 'singapore' },
  { unitId: 'sg_g3_u02', grade: 3, unitNumber: 2, title: 'Singapore Heritage', titleVi: 'Di sản Singapore', framework: 'singapore' },
  { unitId: 'sg_g3_u03', grade: 3, unitNumber: 3, title: 'Amazing Creatures', titleVi: 'Sinh vật kỳ thú', framework: 'singapore' },
  { unitId: 'sg_g3_u04', grade: 3, unitNumber: 4, title: 'Food Culture', titleVi: 'Văn hóa ẩm thực', framework: 'singapore' },
  { unitId: 'sg_g3_u05', grade: 3, unitNumber: 5, title: 'Good Manners', titleVi: 'Phép lịch sự', framework: 'singapore' },
  { unitId: 'sg_g3_u06', grade: 3, unitNumber: 6, title: 'Folktales', titleVi: 'Truyện dân gian', framework: 'singapore' },
  { unitId: 'sg_g4_u01', grade: 4, unitNumber: 1, title: 'Adventures', titleVi: 'Cuộc phiêu lưu', framework: 'singapore' },
  { unitId: 'sg_g4_u02', grade: 4, unitNumber: 2, title: 'Inventions', titleVi: 'Phát minh', framework: 'singapore' },
  { unitId: 'sg_g4_u03', grade: 4, unitNumber: 3, title: 'Environmental Care', titleVi: 'Bảo vệ môi trường', framework: 'singapore' },
  { unitId: 'sg_g4_u04', grade: 4, unitNumber: 4, title: 'ASEAN Neighbours', titleVi: 'Láng giềng ASEAN', framework: 'singapore' },
  { unitId: 'sg_g4_u05', grade: 4, unitNumber: 5, title: 'Values and Choices', titleVi: 'Giá trị và Lựa chọn', framework: 'singapore' },
  { unitId: 'sg_g4_u06', grade: 4, unitNumber: 6, title: 'Inspiring People', titleVi: 'Người truyền cảm hứng', framework: 'singapore' },
  { unitId: 'sg_g5_u01', grade: 5, unitNumber: 1, title: 'Global Connections', titleVi: 'Kết nối toàn cầu', framework: 'singapore' },
  { unitId: 'sg_g5_u02', grade: 5, unitNumber: 2, title: 'Science and Technology', titleVi: 'Khoa học Công nghệ', framework: 'singapore' },
  { unitId: 'sg_g5_u03', grade: 5, unitNumber: 3, title: 'Literary Appreciation', titleVi: 'Thưởng thức văn học', framework: 'singapore' },
  { unitId: 'sg_g5_u04', grade: 5, unitNumber: 4, title: 'Multicultural Harmony', titleVi: 'Hòa hợp đa văn hóa', framework: 'singapore' },
  { unitId: 'sg_g5_u05', grade: 5, unitNumber: 5, title: 'Critical Thinking', titleVi: 'Tư duy phản biện', framework: 'singapore' },
  { unitId: 'sg_g5_u06', grade: 5, unitNumber: 6, title: 'Future Ready', titleVi: 'Sẵn sàng tương lai', framework: 'singapore' },
];

export const CANADIAN_UNITS: CountryUnit[] = [
  { unitId: 'ca_g1_u01', grade: 1, unitNumber: 1, title: 'All About Me', titleVi: 'Tất cả về tôi', framework: 'canadian' },
  { unitId: 'ca_g1_u02', grade: 1, unitNumber: 2, title: 'Family Traditions', titleVi: 'Truyền thống gia đình', framework: 'canadian' },
  { unitId: 'ca_g1_u03', grade: 1, unitNumber: 3, title: 'Canadian Animals', titleVi: 'Động vật Canada', framework: 'canadian' },
  { unitId: 'ca_g1_u04', grade: 1, unitNumber: 4, title: 'Seasons in Canada', titleVi: 'Mùa ở Canada', framework: 'canadian' },
  { unitId: 'ca_g1_u05', grade: 1, unitNumber: 5, title: 'Community Helpers', titleVi: 'Người giúp đỡ cộng đồng', framework: 'canadian' },
  { unitId: 'ca_g1_u06', grade: 1, unitNumber: 6, title: 'Stories and Songs', titleVi: 'Truyện và Bài hát', framework: 'canadian' },
  { unitId: 'ca_g2_u01', grade: 2, unitNumber: 1, title: 'Our Community', titleVi: 'Cộng đồng', framework: 'canadian' },
  { unitId: 'ca_g2_u02', grade: 2, unitNumber: 2, title: 'Weather and Water', titleVi: 'Thời tiết và Nước', framework: 'canadian' },
  { unitId: 'ca_g2_u03', grade: 2, unitNumber: 3, title: 'Canadian Heritage', titleVi: 'Di sản Canada', framework: 'canadian' },
  { unitId: 'ca_g2_u04', grade: 2, unitNumber: 4, title: 'Healthy Choices', titleVi: 'Lựa chọn lành mạnh', framework: 'canadian' },
  { unitId: 'ca_g2_u05', grade: 2, unitNumber: 5, title: 'Plants and Growth', titleVi: 'Cây và Sự phát triển', framework: 'canadian' },
  { unitId: 'ca_g2_u06', grade: 2, unitNumber: 6, title: 'Celebrations', titleVi: 'Lễ kỷ niệm', framework: 'canadian' },
  { unitId: 'ca_g3_u01', grade: 3, unitNumber: 1, title: 'Strong Communities', titleVi: 'Cộng đồng vững mạnh', framework: 'canadian' },
  { unitId: 'ca_g3_u02', grade: 3, unitNumber: 2, title: 'Forces and Movement', titleVi: 'Lực và Chuyển động', framework: 'canadian' },
  { unitId: 'ca_g3_u03', grade: 3, unitNumber: 3, title: 'Soil and Plants', titleVi: 'Đất và Cây', framework: 'canadian' },
  { unitId: 'ca_g3_u04', grade: 3, unitNumber: 4, title: 'Canadian Regions', titleVi: 'Vùng miền Canada', framework: 'canadian' },
  { unitId: 'ca_g3_u05', grade: 3, unitNumber: 5, title: 'Light and Sound', titleVi: 'Ánh sáng và Âm thanh', framework: 'canadian' },
  { unitId: 'ca_g3_u06', grade: 3, unitNumber: 6, title: 'First Nations Stories', titleVi: 'Truyện Thổ dân', framework: 'canadian' },
  { unitId: 'ca_g4_u01', grade: 4, unitNumber: 1, title: 'Habitats and Communities', titleVi: 'Môi trường sống', framework: 'canadian' },
  { unitId: 'ca_g4_u02', grade: 4, unitNumber: 2, title: 'Pulleys and Gears', titleVi: 'Ròng rọc và Bánh răng', framework: 'canadian' },
  { unitId: 'ca_g4_u03', grade: 4, unitNumber: 3, title: 'Rocks and Minerals', titleVi: 'Đá và Khoáng sản', framework: 'canadian' },
  { unitId: 'ca_g4_u04', grade: 4, unitNumber: 4, title: 'Early Societies', titleVi: 'Xã hội thời kỳ đầu', framework: 'canadian' },
  { unitId: 'ca_g4_u05', grade: 4, unitNumber: 5, title: 'Light and Sound', titleVi: 'Ánh sáng và Âm thanh', framework: 'canadian' },
  { unitId: 'ca_g4_u06', grade: 4, unitNumber: 6, title: 'French Canadian Culture', titleVi: 'Văn hóa Pháp-Canada', framework: 'canadian' },
  { unitId: 'ca_g5_u01', grade: 5, unitNumber: 1, title: 'Human Body Systems', titleVi: 'Hệ cơ thể người', framework: 'canadian' },
  { unitId: 'ca_g5_u02', grade: 5, unitNumber: 2, title: 'Conservation', titleVi: 'Bảo tồn', framework: 'canadian' },
  { unitId: 'ca_g5_u03', grade: 5, unitNumber: 3, title: 'Forces Acting on Structures', titleVi: 'Lực tác dụng', framework: 'canadian' },
  { unitId: 'ca_g5_u04', grade: 5, unitNumber: 4, title: 'First Nations and Europeans', titleVi: 'Thổ dân và Châu Âu', framework: 'canadian' },
  { unitId: 'ca_g5_u05', grade: 5, unitNumber: 5, title: 'Properties of Matter', titleVi: 'Tính chất vật chất', framework: 'canadian' },
  { unitId: 'ca_g5_u06', grade: 5, unitNumber: 6, title: 'Canadian Identity', titleVi: 'Bản sắc Canada', framework: 'canadian' },
];

export const LEARNING_TIPS: LearningTips[] = [
  { framework: 'cambridge', general: 'Đọc to mỗi ngày 15 phút. Cambridge nhấn mạnh Reading → Writing → Speaking cycle.', phonics: 'Học âm theo nhóm: a-e-i-o-u trước, sau đó digraphs sh/ch/th.', writing: 'Luôn lập dàn ý (plan) trước khi viết. Dùng First/Then/Finally.', reading: 'Đặt câu hỏi Who/What/Where/When/Why khi đọc.' },
  { framework: 'common_core', general: 'CCSS chia 3 trụ: Reading Foundation, Writing, Language. Học đều cả 3.', phonics: 'Sight words + CVC blending. Flashcards mỗi ngày 10 phút.', writing: 'Opinion → Informative → Narrative. Bắt đầu từ 1 câu, tăng dần.', reading: 'Close reading: đọc 3 lần — lần 1 hiểu chung, lần 2 chi tiết, lần 3 phân tích.' },
  { framework: 'australian', general: 'Úc nhấn mạnh 3 strands: Language, Literature, Literacy. Kết hợp thực tế.', phonics: 'Jolly Phonics phổ biến ở Úc. Học qua actions + songs.', writing: 'Narrative → Persuasive → Informative. Dùng PEEL paragraphs.', reading: 'Reading groups + guided reading. Chọn sách "just right" level.' },
  { framework: 'finnish', general: 'Phần Lan: ít bài tập, nhiều trải nghiệm. Học qua chơi đến lớp 3.', phonics: 'Phonics through songs and games. Không áp lực thi cử.', writing: 'Creative journaling. Viết tự do, không sửa lỗi ngay.', reading: 'Đọc sách tự chọn 30 phút/ngày. Thư viện là trung tâm.' },
  { framework: 'singapore', general: 'STELLAR: Shared reading → Oral → Writing. Rất có hệ thống.', phonics: 'iRead programme. Phonics + word recognition song song.', writing: 'Writing Process Cycle: Plan → Draft → Edit → Publish.', reading: 'Big Book approach ở lớp 1-3. Guided reading lớp 4-5.' },
  { framework: 'canadian', general: 'Canada: song ngữ Anh-Pháp. Immersion approach hiệu quả nhất.', phonics: 'Balanced literacy: phonics + whole language cân bằng.', writing: 'Writer\'s Workshop model. Peer editing quan trọng.', reading: 'Read-aloud → Shared → Guided → Independent progression.' },
];

// Total units per country:
//   cambridge: 45 units
//   common_core: 30 units
//   australian: 40 units
//   finnish: 30 units
//   singapore: 30 units
//   canadian: 30 units
// Grand total: 205 units
