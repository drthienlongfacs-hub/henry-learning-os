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
