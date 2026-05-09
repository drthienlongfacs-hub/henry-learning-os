// ══════════════════════════════════════════════════════════════════
// Cambridge YLE Exam Preparation Data
// Pre A1 Starters → A1 Movers → A2 Flyers
// Sources: cambridgeenglish.org (official), evidence-based strategies
// ══════════════════════════════════════════════════════════════════

export interface ExamLevel {
  id: string;
  name: string;
  nameVi: string;
  cefr: string;
  ageRange: string;
  gradeMapping: number[];
  structure: ExamPart[];
  scoring: string;
  scoringVi: string;
  officialResources: Resource[];
  communityResources: Resource[];
  examTips: ExamTip[];
  vocabularyTopics: string[];
  commonMistakes: Mistake[];
}

export interface DetailedPartInfo {
  partNumber: number;
  taskType: string;
  taskTypeVi: string;
  questions: number;
  description: string;
  descriptionVi: string;
  exampleTask?: string;
  tip?: string;
}

export interface ExamPart {
  skill: 'listening' | 'reading_writing' | 'speaking';
  skillVi: string;
  duration: string;
  parts: number;
  questions?: number;
  description: string;
  descriptionVi: string;
  taskTypes: string[];
  detailedParts?: DetailedPartInfo[];
}

export interface Resource {
  title: string;
  titleVi: string;
  url: string;
  type: 'official_sample' | 'video' | 'app' | 'website' | 'wordlist' | 'handbook';
  free: boolean;
}

export interface ExamTip {
  tip: string;
  tipVi: string;
  category: 'listening' | 'reading' | 'writing' | 'speaking' | 'general';
  evidenceBased: boolean;
}

export interface Mistake {
  mistake: string;
  mistakeVi: string;
  fix: string;
  fixVi: string;
}

// ══════════════════════════════════════════════════════════════════

export const CAMBRIDGE_EXAMS: ExamLevel[] = [
  // ── PRE A1 STARTERS ──
  {
    id: 'yle_starters',
    name: 'Pre A1 Starters',
    nameVi: 'Pre A1 Starters (Bắt đầu)',
    cefr: 'Pre-A1',
    ageRange: '6-8',
    gradeMapping: [1, 2],
    structure: [
      {
        skill: 'listening', skillVi: 'Nghe', duration: '~20 phút', parts: 4, questions: 20,
        description: 'Draw lines matching names to people, write names/numbers, tick boxes, colour objects',
        descriptionVi: 'Nối tên với người, viết tên/số, đánh dấu ô, tô màu đồ vật',
        taskTypes: ['matching', 'gap-fill', 'tick-box', 'colouring'],
        detailedParts: [
          { partNumber: 1, taskType: 'Draw lines', taskTypeVi: 'Nối đường', questions: 5, description: 'Listen to conversation, draw lines matching names to people in a big picture', descriptionVi: 'Nghe hội thoại, nối tên với đúng người trong tranh lớn', exampleTask: 'Draw a line from "Sam" to the boy with the red shirt', tip: 'Look at the picture carefully before listening starts' },
          { partNumber: 2, taskType: 'Write words/numbers', taskTypeVi: 'Viết từ/số', questions: 5, description: 'Listen and write missing names or numbers in gaps', descriptionVi: 'Nghe và viết tên hoặc số còn thiếu vào chỗ trống', exampleTask: 'Name: ___  Age: ___', tip: 'Practice spelling names and numbers 1-20' },
          { partNumber: 3, taskType: 'Multiple choice (pictures)', taskTypeVi: 'Trắc nghiệm (tranh)', questions: 5, description: 'Listen to short conversations, choose correct picture (A, B or C)', descriptionVi: 'Nghe hội thoại ngắn, chọn tranh đúng (A, B hoặc C)', exampleTask: 'What is the girl eating? A) apple B) banana C) cake', tip: 'Listen for the KEY word that matches the picture' },
          { partNumber: 4, taskType: 'Colour and draw', taskTypeVi: 'Tô màu và vẽ', questions: 5, description: 'Listen to instructions to colour specific objects and write a word', descriptionVi: 'Nghe hướng dẫn tô màu đồ vật cụ thể và viết một từ', exampleTask: 'Colour the big ball red. Write "dog" under the picture.', tip: 'Know all colour words and position words (under, next to, between)' },
        ],
      },
      {
        skill: 'reading_writing', skillVi: 'Đọc & Viết', duration: '20 phút', parts: 5, questions: 25,
        description: 'Match words to pictures, spell words, answer yes/no, complete sentences',
        descriptionVi: 'Nối từ với tranh, đánh vần, trả lời có/không, hoàn thành câu',
        taskTypes: ['true-false', 'matching', 'spell-word', 'gap-fill', 'picture-story'],
        detailedParts: [
          { partNumber: 1, taskType: 'True/False with pictures', taskTypeVi: 'Đúng/Sai với tranh', questions: 5, description: 'Look at picture and word. Tick if correct, cross if wrong.', descriptionVi: 'Nhìn tranh và từ. Đánh dấu ✓ nếu đúng, ✗ nếu sai.', exampleTask: '"This is a dog" (picture shows a cat) → ✗' },
          { partNumber: 2, taskType: 'Yes/No sentences', taskTypeVi: 'Câu Có/Không', questions: 5, description: 'Look at a big picture. Read sentences. Write "yes" or "no".', descriptionVi: 'Nhìn tranh lớn. Đọc câu. Viết "yes" hoặc "no".', exampleTask: '"There are three birds." → yes/no' },
          { partNumber: 3, taskType: 'Spell the word', taskTypeVi: 'Đánh vần từ', questions: 5, description: 'Picture + scrambled letters. Write correct word.', descriptionVi: 'Tranh + chữ cái xáo trộn. Viết đúng từ.', exampleTask: 'Picture of fish: h-s-i-f → fish', tip: 'Practice unscrambling common Starters vocabulary' },
          { partNumber: 4, taskType: 'Gap-fill with word box', taskTypeVi: 'Điền từ có hộp từ', questions: 5, description: 'Short text with gaps. Choose correct word from box.', descriptionVi: 'Đoạn văn ngắn có chỗ trống. Chọn từ đúng từ hộp từ.', exampleTask: 'I like to eat ___. (words: apples, dogs, chairs)' },
          { partNumber: 5, taskType: 'Read and write', taskTypeVi: 'Đọc và viết', questions: 5, description: 'Story with 3 pictures. Read questions. Write ONE word answers.', descriptionVi: 'Truyện có 3 tranh. Đọc câu hỏi. Viết câu trả lời MỘT từ.', exampleTask: 'What colour is the ball? → red', tip: 'Answers are always ONE word — do not write sentences' },
        ],
      },
      {
        skill: 'speaking', skillVi: 'Nói', duration: '3-5 phút', parts: 4,
        description: 'Point to objects, answer questions about a scene, answer personal questions',
        descriptionVi: 'Chỉ đồ vật, trả lời câu hỏi về tranh, trả lời câu hỏi cá nhân',
        taskTypes: ['point-and-show', 'describe-picture', 'personal-questions', 'object-card'],
        detailedParts: [
          { partNumber: 1, taskType: 'Point and show', taskTypeVi: 'Chỉ và cho xem', questions: 0, description: 'Examiner greets child, asks name. Child points to objects in picture.', descriptionVi: 'Giám khảo chào, hỏi tên. Bé chỉ vào đồ vật trong tranh.', exampleTask: '"Show me the dog." "Where is the red ball?"' },
          { partNumber: 2, taskType: 'Describe picture', taskTypeVi: 'Mô tả tranh', questions: 0, description: 'Talk about objects and people in the picture.', descriptionVi: 'Nói về đồ vật và người trong tranh.', exampleTask: '"Tell me about this picture."' },
          { partNumber: 3, taskType: 'Object cards', taskTypeVi: 'Thẻ đồ vật', questions: 0, description: 'Examiner shows object cards. Child answers questions about them.', descriptionVi: 'Giám khảo cho xem thẻ đồ vật. Bé trả lời câu hỏi.', exampleTask: '"What is this?" "What colour is it?"' },
          { partNumber: 4, taskType: 'Personal questions', taskTypeVi: 'Câu hỏi cá nhân', questions: 0, description: 'Simple questions about self, family, school, favorites.', descriptionVi: 'Câu hỏi đơn giản về bản thân, gia đình, trường, sở thích.', exampleTask: '"How old are you?" "What is your favorite food?"', tip: 'Practice answering naturally — do not memorize scripts' },
        ],
      },
    ],
    scoring: 'No pass/fail. Up to 5 shields per skill (max 15). Each shield = Cambridge badge of achievement.',
    scoringVi: 'Không đậu/rớt. Tối đa 5 khiên mỗi kỹ năng (tổng 15). Mỗi khiên = huy hiệu thành tích.',
    vocabularyTopics: [
      'Animals', 'Body & Face', 'Clothes', 'Colours', 'Family & Friends',
      'Food & Drink', 'Health', 'Home', 'Materials', 'Numbers 1-20',
      'Places & Directions', 'School', 'Sports & Leisure', 'Time',
      'Toys', 'Transport', 'Weather', 'Work',
    ],
    officialResources: [
      { title: 'Official Sample Papers (Vol 1 & 2)', titleVi: 'Đề mẫu chính thức', url: 'https://www.cambridgeenglish.org/exams-and-tests/starters/preparation/', type: 'official_sample', free: true },
      { title: 'Starters Word List (Official PDF)', titleVi: 'Danh sách từ vựng chính thức', url: 'https://www.cambridgeenglish.org/images/starters-word-list-picture-book.pdf', type: 'wordlist', free: true },
      { title: 'Starters Handbook for Teachers', titleVi: 'Sổ tay giáo viên', url: 'https://www.cambridgeenglish.org/exams-and-tests/starters/', type: 'handbook', free: true },
      { title: 'Cambridge Test App (Fun English)', titleVi: 'App luyện thi Cambridge', url: 'https://www.cambridgeenglish.org/learning-english/games-social/fun-english/', type: 'app', free: true },
    ],
    communityResources: [
      { title: 'British Council LearnEnglish Kids', titleVi: 'British Council cho trẻ em', url: 'https://learnenglishkids.britishcouncil.org/', type: 'website', free: true },
      { title: 'Cambridge YouTube — YLE Prep', titleVi: 'Kênh YouTube Cambridge', url: 'https://www.youtube.com/c/CambridgeEnglishTV', type: 'video', free: true },
      { title: 'Oxford Owl — Free eBooks', titleVi: 'Oxford Owl — Sách miễn phí', url: 'https://www.oxfordowl.co.uk/for-home/find-a-book/library-page/', type: 'website', free: true },
    ],
    examTips: [
      { tip: 'Look at ALL the pictures BEFORE listening starts', tipVi: 'Nhìn TẤT CẢ tranh TRƯỚC khi nghe', category: 'listening', evidenceBased: true },
      { tip: 'Each recording plays TWICE — use first listen to understand, second to check', tipVi: 'Mỗi bài nghe PHÁT HAI LẦN — lần 1 hiểu, lần 2 kiểm tra', category: 'listening', evidenceBased: true },
      { tip: 'Read the question first, then look at the picture', tipVi: 'Đọc câu hỏi trước, rồi nhìn tranh', category: 'reading', evidenceBased: true },
      { tip: 'Spelling must be correct in Reading & Writing', tipVi: 'Chính tả phải đúng trong phần Đọc & Viết', category: 'writing', evidenceBased: true },
      { tip: 'In Speaking, smile and say hello — it is a friendly chat, not a test!', tipVi: 'Khi Nói, mỉm cười và chào — đây là trò chuyện thân thiện, không phải bài kiểm tra!', category: 'speaking', evidenceBased: true },
      { tip: "If you don't understand, say 'Sorry, can you say that again?' — the examiner will repeat", tipVi: "Nếu không hiểu, nói 'Sorry, can you say that again?' — giám khảo sẽ nhắc lại", category: 'speaking', evidenceBased: true },
      { tip: 'Practice 15 minutes daily is better than 2 hours once a week (spaced repetition)', tipVi: 'Luyện 15 phút mỗi ngày tốt hơn 2 giờ mỗi tuần (lặp lại cách quãng)', category: 'general', evidenceBased: true },
      { tip: 'Use Total Physical Response (TPR) — act out words while learning them', tipVi: 'Dùng TPR — diễn từ bằng hành động khi học', category: 'general', evidenceBased: true },
    ],
    commonMistakes: [
      { mistake: 'Not reading instructions carefully', mistakeVi: 'Không đọc kỹ hướng dẫn', fix: 'Underline key words in instructions: "draw a line", "tick the box"', fixVi: 'Gạch chân từ khóa: "draw a line", "tick the box"' },
      { mistake: 'Rushing without checking answers', mistakeVi: 'Làm vội không kiểm tra', fix: 'After finishing, go back and check every answer once', fixVi: 'Sau khi xong, quay lại kiểm tra mỗi câu một lần' },
      { mistake: 'Memorizing scripted answers for Speaking', mistakeVi: 'Học thuộc lòng câu trả lời Nói', fix: 'Practice answering different questions naturally', fixVi: 'Luyện trả lời các câu hỏi khác nhau tự nhiên' },
      { mistake: 'Confusing similar-sounding words (e.g. thirteen/thirty)', mistakeVi: 'Nhầm từ phát âm giống (thirteen/thirty)', fix: 'Practice minimal pairs and number dictation', fixVi: 'Luyện cặp từ tối thiểu và chính tả số' },
    ],
  },

  // ── A1 MOVERS ──
  {
    id: 'yle_movers',
    name: 'A1 Movers',
    nameVi: 'A1 Movers (Tiến bộ)',
    cefr: 'A1',
    ageRange: '8-10',
    gradeMapping: [2, 3],
    structure: [
      {
        skill: 'listening', skillVi: 'Nghe', duration: '~25 phút', parts: 5, questions: 25,
        description: 'Match names to descriptions, write words/numbers, match pictures to days, colour and write',
        descriptionVi: 'Nối tên với mô tả, viết từ/số, nối tranh với ngày, tô màu và viết',
        taskTypes: ['matching', 'gap-fill', 'multiple-choice', 'colouring-writing'],
        detailedParts: [
          { partNumber: 1, taskType: 'Draw lines', taskTypeVi: 'Nối đường', questions: 5, description: 'Listen and draw lines matching names to people in a picture', descriptionVi: 'Nghe và nối tên với đúng người trong tranh', exampleTask: 'Draw a line from "Peter" to the boy playing football' },
          { partNumber: 2, taskType: 'Write words/numbers', taskTypeVi: 'Viết từ/số', questions: 5, description: 'Listen and write missing word or number in form/notepad', descriptionVi: 'Nghe và viết từ hoặc số còn thiếu vào mẫu', exampleTask: 'Day: ___  Time: ___  Place: ___' },
          { partNumber: 3, taskType: 'Match pictures', taskTypeVi: 'Nối tranh', questions: 5, description: 'Listen and match items from two sets of pictures', descriptionVi: 'Nghe và nối các mục từ hai bộ tranh', exampleTask: 'Match each person to the activity they did' },
          { partNumber: 4, taskType: 'Multiple choice', taskTypeVi: 'Trắc nghiệm', questions: 5, description: 'Five short conversations. Choose correct picture (A, B or C)', descriptionVi: 'Năm hội thoại ngắn. Chọn tranh đúng (A, B hoặc C)' },
          { partNumber: 5, taskType: 'Colour and write', taskTypeVi: 'Tô màu và viết', questions: 5, description: 'Listen, colour objects in picture and write a simple word', descriptionVi: 'Nghe, tô màu đồ vật trong tranh và viết một từ đơn giản', tip: 'Listen carefully for BOTH the colour AND the object' },
        ],
      },
      {
        skill: 'reading_writing', skillVi: 'Đọc & Viết', duration: '30 phút', parts: 6, questions: 35,
        description: 'Match definitions, choose correct word, gap-fill conversation, read story and answer',
        descriptionVi: 'Nối định nghĩa, chọn từ đúng, điền hội thoại, đọc truyện trả lời',
        taskTypes: ['definition-match', 'true-false', 'gap-fill', 'multiple-choice', 'open-answer', 'story-writing'],
        detailedParts: [
          { partNumber: 1, taskType: 'Definition matching', taskTypeVi: 'Nối định nghĩa', questions: 6, description: 'Match 5 definitions to correct words from 8 options', descriptionVi: 'Nối 5 định nghĩa với từ đúng từ 8 lựa chọn', exampleTask: '"You can read this. It has pages." → book' },
          { partNumber: 2, taskType: 'Yes/No with picture', taskTypeVi: 'Có/Không với tranh', questions: 6, description: 'Read sentences about a picture. Write "yes" or "no"', descriptionVi: 'Đọc câu về tranh. Viết "yes" hoặc "no"' },
          { partNumber: 3, taskType: 'Conversation gap-fill', taskTypeVi: 'Điền hội thoại', questions: 6, description: 'Complete a conversation choosing correct responses from list', descriptionVi: 'Hoàn thành hội thoại chọn câu trả lời đúng từ danh sách' },
          { partNumber: 4, taskType: 'Gap-fill text', taskTypeVi: 'Điền đoạn văn', questions: 6, description: 'Read text with gaps. Choose correct word from list', descriptionVi: 'Đọc đoạn văn có chỗ trống. Chọn từ đúng từ danh sách' },
          { partNumber: 5, taskType: 'Story completion', taskTypeVi: 'Hoàn thành truyện', questions: 7, description: 'Read story. Complete sentences using 1-3 words', descriptionVi: 'Đọc truyện. Hoàn thành câu dùng 1-3 từ', tip: 'Count words! Usually 1-3 words maximum' },
          { partNumber: 6, taskType: 'Picture writing', taskTypeVi: 'Viết theo tranh', questions: 4, description: 'Look at picture. Write words and sentences about it', descriptionVi: 'Nhìn tranh. Viết từ và câu về tranh', tip: 'Use simple sentences with correct spelling' },
        ],
      },
      {
        skill: 'speaking', skillVi: 'Nói', duration: '5-7 phút', parts: 4,
        description: 'Find differences between pictures, tell a picture story, answer odd-one-out, personal questions',
        descriptionVi: 'Tìm khác biệt giữa tranh, kể truyện tranh, trả lời loại trừ, câu hỏi cá nhân',
        taskTypes: ['find-differences', 'picture-story', 'odd-one-out', 'personal-questions'],
        detailedParts: [
          { partNumber: 1, taskType: 'Find differences', taskTypeVi: 'Tìm khác biệt', questions: 0, description: 'Two similar pictures. Describe differences between them', descriptionVi: 'Hai tranh giống nhau. Mô tả sự khác biệt', exampleTask: '"In this picture there is a cat, but in this picture there is a dog"', tip: 'Scan left to right systematically' },
          { partNumber: 2, taskType: 'Picture story', taskTypeVi: 'Kể truyện tranh', questions: 0, description: 'Four pictures telling a story. Tell what happened', descriptionVi: 'Bốn tranh kể một câu chuyện. Kể lại chuyện gì đã xảy ra', tip: 'Use past tense: went, saw, ate, played' },
          { partNumber: 3, taskType: 'Odd one out', taskTypeVi: 'Loại trừ', questions: 0, description: 'Four pictures. Say which is different and explain why', descriptionVi: 'Bốn tranh. Nói cái nào khác và giải thích tại sao', exampleTask: 'Three fruits and one vegetable → "The carrot is different because it is a vegetable"' },
          { partNumber: 4, taskType: 'Personal questions', taskTypeVi: 'Câu hỏi cá nhân', questions: 0, description: 'Questions about school, hobbies, friends, weekends', descriptionVi: 'Câu hỏi về trường, sở thích, bạn bè, cuối tuần', tip: 'Give longer answers: "I like swimming BECAUSE it is fun"' },
        ],
      },
    ],
    scoring: 'No pass/fail. Up to 5 shields per skill (max 15).',
    scoringVi: 'Không đậu/rớt. Tối đa 5 khiên mỗi kỹ năng (tổng 15).',
    vocabularyTopics: [
      'Animals', 'Body & Face', 'Clothes', 'Colours', 'Family & Friends',
      'Food & Drink', 'Health', 'Home', 'Materials', 'Numbers 1-50',
      'Places & Directions', 'School', 'Sports & Leisure', 'The world around us',
      'Time', 'Toys', 'Transport', 'Weather', 'Work',
    ],
    officialResources: [
      { title: 'Official Sample Papers', titleVi: 'Đề mẫu chính thức', url: 'https://www.cambridgeenglish.org/exams-and-tests/movers/preparation/', type: 'official_sample', free: true },
      { title: 'Movers Word List (Official PDF)', titleVi: 'Danh sách từ vựng', url: 'https://www.cambridgeenglish.org/images/movers-word-list-picture-book.pdf', type: 'wordlist', free: true },
    ],
    communityResources: [
      { title: 'British Council LearnEnglish Kids', titleVi: 'British Council cho trẻ em', url: 'https://learnenglishkids.britishcouncil.org/', type: 'website', free: true },
    ],
    examTips: [
      { tip: 'In Movers, spelling becomes more important — practice writing words daily', tipVi: 'Ở Movers, chính tả quan trọng hơn — luyện viết từ mỗi ngày', category: 'writing', evidenceBased: true },
      { tip: 'For the story writing task: use simple past tense (walked, played, ate)', tipVi: 'Cho bài viết truyện: dùng thì quá khứ đơn (walked, played, ate)', category: 'writing', evidenceBased: true },
      { tip: 'Find Differences: describe BOTH pictures systematically (left to right)', tipVi: 'Tìm khác biệt: mô tả CẢ HAI tranh có hệ thống (trái sang phải)', category: 'speaking', evidenceBased: true },
    ],
    commonMistakes: [
      { mistake: 'Writing more words than required in gap-fill', mistakeVi: 'Viết nhiều từ hơn yêu cầu', fix: 'Count words before writing — usually only 1-3 words needed', fixVi: 'Đếm từ trước khi viết — thường chỉ cần 1-3 từ' },
      { mistake: 'Not knowing past tense for story writing', mistakeVi: 'Không biết thì quá khứ khi viết truyện', fix: 'Learn top 30 irregular past tenses (went, saw, ate, had...)', fixVi: 'Học 30 quá khứ bất quy tắc hàng đầu (went, saw, ate, had...)' },
    ],
  },

  // ── A2 FLYERS ──
  {
    id: 'yle_flyers',
    name: 'A2 Flyers',
    nameVi: 'A2 Flyers (Bay cao)',
    cefr: 'A2',
    ageRange: '9-12',
    gradeMapping: [3, 4, 5],
    structure: [
      {
        skill: 'listening', skillVi: 'Nghe', duration: '~25 phút', parts: 5, questions: 25,
        description: 'Match, write, multiple choice — more complex scenarios and longer recordings',
        descriptionVi: 'Nối, viết, trắc nghiệm — tình huống phức tạp hơn, bài nghe dài hơn',
        taskTypes: ['matching', 'gap-fill', 'multiple-choice', 'colouring-writing', 'map-matching'],
        detailedParts: [
          { partNumber: 1, taskType: 'Draw lines', taskTypeVi: 'Nối đường', questions: 5, description: 'Listen and draw lines matching names to people in a picture', descriptionVi: 'Nghe và nối tên với đúng người trong tranh' },
          { partNumber: 2, taskType: 'Write words/numbers', taskTypeVi: 'Viết từ/số', questions: 5, description: 'Listen and fill in missing words/numbers in a form', descriptionVi: 'Nghe và điền từ/số còn thiếu vào mẫu' },
          { partNumber: 3, taskType: 'Match items', taskTypeVi: 'Nối mục', questions: 5, description: 'Listen and match items from two sets of pictures', descriptionVi: 'Nghe và nối các mục từ hai bộ tranh' },
          { partNumber: 4, taskType: 'Multiple choice', taskTypeVi: 'Trắc nghiệm', questions: 5, description: 'Five conversations. Choose correct picture (A, B or C)', descriptionVi: 'Năm hội thoại. Chọn tranh đúng (A, B hoặc C)' },
          { partNumber: 5, taskType: 'Colour and write', taskTypeVi: 'Tô màu và viết', questions: 5, description: 'Listen, colour objects and write a word on picture', descriptionVi: 'Nghe, tô màu đồ vật và viết một từ trên tranh' },
        ],
      },
      {
        skill: 'reading_writing', skillVi: 'Đọc & Viết', duration: '40 phút', parts: 7, questions: 44,
        description: 'Definitions, grammar choice, conversation, factual text, story writing with picture prompts',
        descriptionVi: 'Định nghĩa, ngữ pháp, hội thoại, văn bản thực tế, viết truyện theo tranh',
        taskTypes: ['definition-match', 'grammar-choice', 'gap-fill', 'factual-text', 'story-completion', 'open-writing'],
        detailedParts: [
          { partNumber: 1, taskType: 'Vocabulary matching', taskTypeVi: 'Nối từ vựng', questions: 10, description: '15 words, 10 definitions. Write correct word next to definition', descriptionVi: '15 từ, 10 định nghĩa. Viết từ đúng bên cạnh định nghĩa' },
          { partNumber: 2, taskType: 'Yes/No sentences', taskTypeVi: 'Câu Có/Không', questions: 7, description: 'Read picture + text. Decide if sentences are true or false', descriptionVi: 'Đọc tranh + văn bản. Xác định câu đúng hay sai' },
          { partNumber: 3, taskType: 'Conversation completion', taskTypeVi: 'Hoàn thành hội thoại', questions: 5, description: 'Read dialogue with gaps. Choose best response from list', descriptionVi: 'Đọc hội thoại có chỗ trống. Chọn câu trả lời tốt nhất' },
          { partNumber: 4, taskType: 'Gap-fill text', taskTypeVi: 'Điền đoạn văn', questions: 6, description: 'Longer text with gaps. Choose correct words from list', descriptionVi: 'Đoạn văn dài hơn có chỗ trống. Chọn từ đúng từ danh sách' },
          { partNumber: 5, taskType: 'Story comprehension', taskTypeVi: 'Hiểu truyện', questions: 7, description: 'Read story. Complete sentences using 1-4 words', descriptionVi: 'Đọc truyện. Hoàn thành câu dùng 1-4 từ', tip: 'Answers come from the text — do not invent' },
          { partNumber: 6, taskType: 'Open gap-fill', taskTypeVi: 'Điền từ tự do', questions: 5, description: 'Short text (diary/letter) with 5 gaps. Write missing word (no list)', descriptionVi: 'Đoạn văn ngắn (nhật ký/thư) có 5 chỗ trống. Viết từ còn thiếu (không có danh sách)', tip: 'Think about grammar: articles, prepositions, verb forms' },
          { partNumber: 7, taskType: 'Story writing', taskTypeVi: 'Viết truyện', questions: 4, description: 'Look at 3 pictures. Write a short story based on them', descriptionVi: 'Nhìn 3 tranh. Viết một câu chuyện ngắn dựa trên tranh', tip: 'Use connectors: then, after that, finally, because, so' },
        ],
      },
      {
        skill: 'speaking', skillVi: 'Nói', duration: '7-9 phút', parts: 4,
        description: 'Tell story from pictures, describe and compare, answer extended personal questions',
        descriptionVi: 'Kể truyện theo tranh, mô tả và so sánh, trả lời câu hỏi cá nhân mở rộng',
        taskTypes: ['picture-story', 'describe-compare', 'personal-extended', 'information-exchange'],
        detailedParts: [
          { partNumber: 1, taskType: 'Find differences', taskTypeVi: 'Tìm khác biệt', questions: 0, description: 'Two similar pictures. Describe 4 differences', descriptionVi: 'Hai tranh giống nhau. Mô tả 4 điểm khác biệt', tip: 'Use "In this picture... but in this picture..."' },
          { partNumber: 2, taskType: 'Information exchange', taskTypeVi: 'Trao đổi thông tin', questions: 0, description: 'Examiner and child have similar pictures. Ask and answer to find missing info', descriptionVi: 'Giám khảo và bé có tranh giống nhau. Hỏi và trả lời để tìm thông tin thiếu' },
          { partNumber: 3, taskType: 'Picture story', taskTypeVi: 'Kể truyện tranh', questions: 0, description: 'Four pictures. Examiner starts story. Child continues', descriptionVi: 'Bốn tranh. Giám khảo bắt đầu truyện. Bé kể tiếp', tip: 'Use past tense and connectors for a smooth narrative' },
          { partNumber: 4, taskType: 'Personal questions', taskTypeVi: 'Câu hỏi cá nhân', questions: 0, description: 'Extended questions about school, hobbies, family, future plans', descriptionVi: 'Câu hỏi mở rộng về trường, sở thích, gia đình, kế hoạch', tip: 'Give reasons and examples to show depth' },
        ],
      },
    ],
    scoring: 'No pass/fail. Up to 5 shields per skill (max 15). Often used as KET/A2 Key stepping stone.',
    scoringVi: 'Không đậu/rớt. Tối đa 5 khiên/kỹ năng. Thường là bước đệm lên KET/A2 Key.',
    vocabularyTopics: [
      'Animals', 'Body & Face', 'Clothes', 'Colours', 'Family & Friends',
      'Food & Drink', 'Health', 'Home', 'Materials', 'Numbers 1-1000',
      'Places & Directions', 'School', 'Sports & Leisure', 'The world around us',
      'Time', 'Toys', 'Transport', 'Weather', 'Work', 'Daily routines',
    ],
    officialResources: [
      { title: 'Official Sample Papers', titleVi: 'Đề mẫu chính thức', url: 'https://www.cambridgeenglish.org/exams-and-tests/flyers/preparation/', type: 'official_sample', free: true },
      { title: 'Flyers Word List (Official PDF)', titleVi: 'Danh sách từ vựng', url: 'https://www.cambridgeenglish.org/images/flyers-word-list-picture-book.pdf', type: 'wordlist', free: true },
    ],
    communityResources: [
      { title: 'British Council LearnEnglish Kids', titleVi: 'British Council cho trẻ em', url: 'https://learnenglishkids.britishcouncil.org/', type: 'website', free: true },
    ],
    examTips: [
      { tip: 'Flyers requires understanding longer texts — read short stories daily (10 min)', tipVi: 'Flyers cần hiểu văn bản dài hơn — đọc truyện ngắn mỗi ngày (10 phút)', category: 'reading', evidenceBased: true },
      { tip: 'Story writing: use connectors (then, after that, finally, because)', tipVi: 'Viết truyện: dùng từ nối (then, after that, finally, because)', category: 'writing', evidenceBased: true },
      { tip: 'Speaking: extend your answers — add reasons with "because"', tipVi: 'Nói: mở rộng câu trả lời — thêm lý do với "because"', category: 'speaking', evidenceBased: true },
    ],
    commonMistakes: [
      { mistake: 'Not managing time in 40-min Reading & Writing', mistakeVi: 'Không quản lý thời gian trong 40 phút Đọc & Viết', fix: 'Allocate ~5 min per part, save 5 min for checking', fixVi: 'Phân bổ ~5 phút/phần, dành 5 phút kiểm tra' },
    ],
  },
];

// ══════════════════════════════════════════════════════════════════
// Evidence-Based Learning Strategies
// Sources: Cambridge research, spaced repetition studies, phonics meta-analyses
// ══════════════════════════════════════════════════════════════════

export interface LearningStrategy {
  id: string;
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  evidence: string;
  gradeRange: number[];
  category: 'phonics' | 'reading' | 'writing' | 'speaking' | 'vocabulary' | 'exam_prep' | 'metacognition';
}

export const LEARNING_STRATEGIES: LearningStrategy[] = [
  {
    id: 'ls_ssp', title: 'Systematic Synthetic Phonics (SSP)',
    titleVi: 'Phonics Tổng hợp Có hệ thống',
    description: 'Teach letter-sound correspondences in a fixed sequence. Blend sounds to read words. Segment words to spell. Most effective method for early reading.',
    descriptionVi: 'Dạy tương ứng chữ-âm theo trình tự cố định. Ghép âm để đọc từ. Tách từ để đánh vần. Phương pháp hiệu quả nhất cho đọc sớm.',
    evidence: 'Rose Review (2006), National Reading Panel meta-analysis — systematic phonics produces significantly better reading outcomes than non-systematic approaches.',
    gradeRange: [1, 2], category: 'phonics',
  },
  {
    id: 'ls_sr', title: 'Spaced Repetition',
    titleVi: 'Lặp lại cách quãng',
    description: '15 min daily beats 2 hours weekly. Review vocabulary at increasing intervals: 1 day → 3 days → 7 days → 14 days.',
    descriptionVi: '15 phút mỗi ngày hiệu quả hơn 2 giờ mỗi tuần. Ôn từ vựng theo khoảng cách tăng dần: 1 ngày → 3 ngày → 7 ngày → 14 ngày.',
    evidence: 'Ebbinghaus forgetting curve research; Pimsleur graduated interval recall; Leitner system studies.',
    gradeRange: [1, 2, 3, 4, 5], category: 'vocabulary',
  },
  {
    id: 'ls_tpr', title: 'Total Physical Response (TPR)',
    titleVi: 'Phản hồi Vật lý Toàn phần',
    description: 'Act out words with body movements while learning. "Jump!" → student jumps. Multi-sensory encoding improves retention 40%+.',
    descriptionVi: 'Diễn từ bằng cử động cơ thể khi học. "Jump!" → học sinh nhảy. Mã hóa đa giác quan tăng ghi nhớ 40%+.',
    evidence: 'Asher (1969) original research; replicated across 30+ studies showing kinesthetic learning boosts young learner retention.',
    gradeRange: [1, 2, 3], category: 'vocabulary',
  },
  {
    id: 'ls_ra', title: 'Read Aloud Daily (15 min)',
    titleVi: 'Đọc to mỗi ngày (15 phút)',
    description: 'Parent/teacher reads TO child → child reads WITH adult → child reads ALONE. Gradual release model builds fluency and comprehension.',
    descriptionVi: 'Phụ huynh/giáo viên đọc CHO con → con đọc CÙNG người lớn → con đọc MỘT MÌNH. Mô hình chuyển giao dần xây dựng trôi chảy và hiểu.',
    evidence: 'Jim Trelease "The Read-Aloud Handbook"; National Literacy Trust data: children read to daily are 13x more likely to read above expected level.',
    gradeRange: [1, 2, 3, 4, 5], category: 'reading',
  },
  {
    id: 'ls_meta', title: 'Metacognitive Self-Check',
    titleVi: 'Tự kiểm tra Siêu nhận thức',
    description: '"What did I learn? What was tricky? What will I try next?" — builds autonomous learners who can identify their own gaps.',
    descriptionVi: '"Tôi đã học gì? Cái gì khó? Lần sau tôi sẽ thử gì?" — xây dựng người học tự chủ nhận biết lỗ hổng.',
    evidence: 'Education Endowment Foundation: metacognition adds +7 months progress. Cambridge self-check aligns with this.',
    gradeRange: [1, 2, 3, 4, 5], category: 'metacognition',
  },
  {
    id: 'ls_exam', title: 'Exam Familiarization (not cramming)',
    titleVi: 'Làm quen đề thi (không nhồi nhét)',
    description: 'Do 1 practice test per week in final month. Focus on FORMAT not memorization. Review mistakes, not just scores.',
    descriptionVi: 'Làm 1 đề thử/tuần trong tháng cuối. Tập trung HÌNH THỨC không phải học thuộc. Xem lại lỗi sai, không chỉ điểm.',
    evidence: 'Cambridge Assessment research: format familiarity reduces test anxiety by 30% and improves performance.',
    gradeRange: [1, 2, 3, 4, 5], category: 'exam_prep',
  },
];

// ══════════════════════════════════════════════════════════════════
// Grade → Exam Pathway Mapping
// ══════════════════════════════════════════════════════════════════

export const EXAM_PATHWAY = {
  1: { current: 'yle_starters', preparing: 'Pre A1 Starters', next: 'A1 Movers' },
  2: { current: 'yle_starters', preparing: 'Pre A1 Starters → A1 Movers', next: 'A1 Movers' },
  3: { current: 'yle_movers', preparing: 'A1 Movers', next: 'A2 Flyers' },
  4: { current: 'yle_flyers', preparing: 'A2 Flyers', next: 'A2 Key (KET)' },
  5: { current: 'yle_flyers', preparing: 'A2 Flyers → A2 Key', next: 'B1 Preliminary (PET)' },
} as const;

// ══════════════════════════════════════════════════════════════════
// COMMUNITY WISDOM — Synthesized from parents, teachers, forums
// Sources: Facebook groups, YouTube channels, Cambridge.org, VN edu blogs
// ══════════════════════════════════════════════════════════════════

export interface StudyPlan {
  id: string;
  level: 'starters' | 'movers' | 'flyers';
  titleVi: string;
  totalWeeks: number;
  hoursNeeded: number;
  phases: StudyPhase[];
}

export interface StudyPhase {
  weekRange: string;
  titleVi: string;
  focus: string[];
  dailyMinutes: number;
  activitiesVi: string[];
}

export interface RecommendedBook {
  title: string;
  publisher: string;
  levels: string[];
  bestFor: string;
  bestForVi: string;
  rating: number;
  free: boolean;
  url?: string;
}

export interface YouTubeChannel {
  name: string;
  url: string;
  subscribers?: string;
  bestForVi: string;
  contentType: string;
  free: boolean;
}

export interface AppRecommendation {
  name: string;
  platform: string;
  free: boolean;
  bestForVi: string;
  url?: string;
}

export interface ParentGuideTip {
  id: string;
  categoryVi: string;
  icon: string;
  titleVi: string;
  descriptionVi: string;
  evidence?: string;
  level: 'all' | 'starters' | 'movers' | 'flyers';
}

export interface SmartLearningPath {
  id: string;
  titleVi: string;
  descriptionVi: string;
  steps: { stepVi: string; toolVi: string; durationVi: string }[];
  evidenceVi: string;
}

// ── STUDY PLANS ──
export const STUDY_PLANS: StudyPlan[] = [
  {
    id: 'sp_starters', level: 'starters',
    titleVi: 'Lộ trình ôn Starters — 8 tuần (tổng ~100 giờ)',
    totalWeeks: 8, hoursNeeded: 100,
    phases: [
      { weekRange: 'Tuần 1-2', titleVi: 'Nền tảng từ vựng', focus: ['vocabulary', 'phonics'], dailyMinutes: 20, activitiesVi: ['Flashcards 10 từ/ngày theo chủ đề (Animals, Colours, Family)', 'Nghe bài hát tiếng Anh (Super Simple Songs)', 'TPR — diễn từ bằng hành động'] },
      { weekRange: 'Tuần 3-4', titleVi: 'Kỹ năng Nghe + Đọc', focus: ['listening', 'reading'], dailyMinutes: 25, activitiesVi: ['Nghe audio Cambridge chính thức (mỗi bài 2 lần)', 'Đọc truyện Oxford Reading Tree Level 1-3', 'Luyện Yes/No với tranh'] },
      { weekRange: 'Tuần 5-6', titleVi: 'Kỹ năng Viết + Nói', focus: ['writing', 'speaking'], dailyMinutes: 25, activitiesVi: ['Tập đánh vần 5 từ/ngày (viết tay)', 'Miêu tả tranh bằng câu đơn giản', 'Chơi trò hỏi-đáp với phụ huynh'] },
      { weekRange: 'Tuần 7-8', titleVi: 'Luyện đề + Ôn tổng', focus: ['practice_test', 'review'], dailyMinutes: 30, activitiesVi: ['Làm 1 đề mẫu chính thức/tuần', 'Xem lại lỗi sai — ghi vào sổ', 'Mô phỏng phần Speaking với phụ huynh'] },
    ],
  },
  {
    id: 'sp_movers', level: 'movers',
    titleVi: 'Lộ trình ôn Movers — 10 tuần (tổng ~175 giờ)',
    totalWeeks: 10, hoursNeeded: 175,
    phases: [
      { weekRange: 'Tuần 1-3', titleVi: 'Mở rộng từ vựng + Ngữ pháp', focus: ['vocabulary', 'grammar'], dailyMinutes: 25, activitiesVi: ['Học 15 từ/ngày theo chủ đề mới (Weather, Transport, Health)', 'Ngữ pháp: thì hiện tại đơn, tiếp diễn, quá khứ đơn', 'Đọc truyện Storyfun for Movers'] },
      { weekRange: 'Tuần 4-6', titleVi: 'Luyện 4 kỹ năng chuyên sâu', focus: ['listening', 'reading', 'writing', 'speaking'], dailyMinutes: 30, activitiesVi: ['Nghe: phân biệt tên, số, ngày trong tuần', 'Đọc: hiểu đoạn văn ngắn, trả lời câu hỏi', 'Viết: hoàn thành câu 1-3 từ', 'Nói: tìm khác biệt giữa 2 tranh'] },
      { weekRange: 'Tuần 7-8', titleVi: 'Luyện dạng bài thi', focus: ['exam_format'], dailyMinutes: 30, activitiesVi: ['Làm từng phần riêng (Part 1-5 Listening, Part 1-6 R&W)', 'Học 30 động từ bất quy tắc hàng đầu', 'Luyện kể truyện theo 4 tranh (Speaking Part 2)'] },
      { weekRange: 'Tuần 9-10', titleVi: 'Luyện đề + Tự tin', focus: ['practice_test', 'confidence'], dailyMinutes: 35, activitiesVi: ['Làm 2 đề mẫu chính thức', 'Bấm giờ như thi thật', 'Mô phỏng Speaking test hoàn chỉnh'] },
    ],
  },
  {
    id: 'sp_flyers', level: 'flyers',
    titleVi: 'Lộ trình ôn Flyers — 12 tuần (tổng ~250 giờ)',
    totalWeeks: 12, hoursNeeded: 250,
    phases: [
      { weekRange: 'Tuần 1-3', titleVi: 'Nâng vốn từ + Ngữ pháp nâng cao', focus: ['vocabulary', 'grammar'], dailyMinutes: 30, activitiesVi: ['20 từ/ngày + word families', 'Ngữ pháp: thì tương lai, so sánh, câu điều kiện loại 1', 'Đọc sách thiếu nhi bằng tiếng Anh (10 phút/ngày)'] },
      { weekRange: 'Tuần 4-6', titleVi: 'Đọc hiểu + Viết truyện', focus: ['reading', 'writing'], dailyMinutes: 35, activitiesVi: ['Đọc đoạn văn dài, trả lời câu hỏi 1-4 từ', 'Viết truyện ngắn theo 3 tranh (dùng từ nối)', 'Điền từ tự do (không có danh sách)'] },
      { weekRange: 'Tuần 7-9', titleVi: 'Nghe nâng cao + Nói mở rộng', focus: ['listening', 'speaking'], dailyMinutes: 35, activitiesVi: ['Nghe hội thoại phức tạp, ghi chú thông tin', 'Nói: trao đổi thông tin, kể truyện mạch lạc', 'Trả lời câu hỏi cá nhân mở rộng với "because"'] },
      { weekRange: 'Tuần 10-12', titleVi: 'Luyện đề toàn diện', focus: ['practice_test', 'time_management'], dailyMinutes: 40, activitiesVi: ['Làm 3 đề mẫu đầy đủ', 'Quản lý thời gian: ~5 phút/phần R&W', 'Ôn lỗi sai, strengthen điểm yếu'] },
    ],
  },
];

// ── RECOMMENDED BOOKS ──
export const RECOMMENDED_BOOKS: RecommendedBook[] = [
  { title: 'Fun for Starters/Movers/Flyers (4th Ed)', publisher: 'Cambridge', levels: ['starters','movers','flyers'], bestFor: 'Balanced exam prep + skill building', bestForVi: 'Ôn thi cân bằng + phát triển kỹ năng', rating: 5, free: false },
  { title: 'Storyfun for Starters/Movers/Flyers', publisher: 'Cambridge', levels: ['starters','movers','flyers'], bestFor: 'Story-based learning', bestForVi: 'Học qua truyện — thú vị, nhớ lâu', rating: 5, free: false },
  { title: "Kid's Box (Updated 2nd Ed)", publisher: 'Cambridge', levels: ['starters','movers','flyers'], bestFor: 'Full-year English course + exam prep', bestForVi: 'Giáo trình toàn diện cả năm + luyện thi', rating: 4, free: false },
  { title: 'Get Ready for Starters/Movers/Flyers', publisher: 'Oxford', levels: ['starters','movers','flyers'], bestFor: 'Grammar + vocab practice', bestForVi: 'Luyện ngữ pháp + từ vựng chuyên sâu', rating: 4, free: false },
  { title: 'Authentic Practice Tests', publisher: 'Cambridge', levels: ['starters','movers','flyers'], bestFor: 'Final exam rehearsal', bestForVi: 'Luyện đề thi thật — bước cuối cùng', rating: 5, free: false },
  { title: 'Starters/Movers/Flyers Word List Picture Book', publisher: 'Cambridge', levels: ['starters','movers','flyers'], bestFor: 'Visual vocabulary', bestForVi: 'Học từ vựng qua hình ảnh (MIỄN PHÍ)', rating: 5, free: true, url: 'https://www.cambridgeenglish.org/exams-and-tests/starters/preparation/' },
  { title: 'Oxford Reading Tree', publisher: 'Oxford', levels: ['starters','movers'], bestFor: 'Graded readers for fluency', bestForVi: 'Sách đọc theo trình độ — xây dựng trôi chảy', rating: 5, free: false },
];

// ── YOUTUBE CHANNELS ──
export const YOUTUBE_CHANNELS: YouTubeChannel[] = [
  { name: 'Cambridge English', url: 'https://www.youtube.com/c/CambridgeEnglishTV', subscribers: '1M+', bestForVi: 'Video thi mẫu chính thức, tips từ Cambridge', contentType: 'official', free: true },
  { name: 'British Council LearnEnglish Kids', url: 'https://www.youtube.com/user/BritishCouncilLEKids', subscribers: '2M+', bestForVi: 'Bài hát, truyện, ngữ pháp cho trẻ em', contentType: 'learning', free: true },
  { name: 'Super Simple Songs', url: 'https://www.youtube.com/c/SuperSimpleSongs', subscribers: '40M+', bestForVi: 'Bài hát tiếng Anh — học từ vựng qua giai điệu', contentType: 'songs', free: true },
  { name: 'English Singsing', url: 'https://www.youtube.com/c/EnglishSingsing', subscribers: '5M+', bestForVi: 'Hội thoại, từ vựng theo chủ đề cho trẻ 5-10', contentType: 'vocabulary', free: true },
  { name: 'BBC Learning English', url: 'https://www.youtube.com/user/bbclearningenglish', subscribers: '10M+', bestForVi: 'Ngữ pháp, từ vựng nâng cao (Movers/Flyers)', contentType: 'grammar', free: true },
  { name: 'Jack Hartmann Kids Music', url: 'https://www.youtube.com/c/JackHartmann', subscribers: '5M+', bestForVi: 'Phonics, đếm số, TPR qua nhạc và vận động', contentType: 'phonics', free: true },
];

// ── APPS ──
export const RECOMMENDED_APPS: AppRecommendation[] = [
  { name: 'Word Fun World', platform: 'iOS/Android', free: true, bestForVi: 'Từ vựng Cambridge chính thức — game đua thời gian' },
  { name: 'Monkey Puzzles', platform: 'iOS/Android', free: true, bestForVi: 'Mini-games đọc + từ vựng theo cấp YLE' },
  { name: 'Lingokids', platform: 'iOS/Android', free: false, bestForVi: 'Học tiếng Anh toàn diện qua trò chơi (3-8 tuổi)' },
  { name: 'Khan Academy Kids', platform: 'iOS/Android', free: true, bestForVi: 'Đọc, phonics, toán — chương trình Mỹ miễn phí 100%' },
  { name: 'Duolingo ABC', platform: 'iOS/Android', free: true, bestForVi: 'Phonics + đọc cơ bản cho trẻ mới bắt đầu' },
  { name: 'Epic! Kids Books', platform: 'iOS/Android', free: false, bestForVi: 'Thư viện 40,000+ sách thiếu nhi tiếng Anh' },
];

// ── PARENT GUIDE — Evidence-based tips ──
export const PARENT_GUIDE: ParentGuideTip[] = [
  { id: 'pg1', categoryVi: 'Tâm lý', icon: '💚', titleVi: 'Không đặt nặng áp lực', descriptionVi: 'Cambridge YLE không có đậu/rớt. Hãy coi đây là trải nghiệm tích cực. Bé đạt 5 shields = xuất sắc, 3 shields = tốt, 1 shield = đang tiến bộ. Tất cả đều nhận chứng chỉ.', evidence: 'Cambridge Assessment: test anxiety reduces performance 15-20%', level: 'all' },
  { id: 'pg2', categoryVi: 'Phương pháp', icon: '⏰', titleVi: '15 phút/ngày > 2 giờ/tuần', descriptionVi: 'Não trẻ em ghi nhớ tốt nhất qua lặp lại cách quãng. 15 phút mỗi ngày hiệu quả GẤP 3 LẦN so với 2 giờ cuối tuần. Chia nhỏ: 5 phút từ vựng + 5 phút nghe + 5 phút đọc.', evidence: 'Ebbinghaus forgetting curve: 80% information lost within 24h without review', level: 'all' },
  { id: 'pg3', categoryVi: 'Nghe', icon: '🎧', titleVi: 'Bật tiếng Anh nền mỗi ngày', descriptionVi: 'Bật nhạc/podcast/cartoon tiếng Anh khi bé chơi, ăn cơm. Không cần tập trung 100% — tai sẽ quen với nhịp điệu, ngữ điệu tiếng Anh một cách tự nhiên.', evidence: 'Input hypothesis (Krashen): comprehensible input builds subconscious language acquisition', level: 'starters' },
  { id: 'pg4', categoryVi: 'Nói', icon: '🗣️', titleVi: 'Đừng sửa lỗi liên tục', descriptionVi: 'Khi bé nói sai, ĐỪNG ngắt lời sửa ngay. Thay vào đó, lặp lại câu đúng một cách tự nhiên. Bé nói "I goed school" → bạn nói "Oh, you WENT to school! Nice!"', evidence: 'Recast technique: 40+ studies show implicit correction more effective than explicit for children', level: 'all' },
  { id: 'pg5', categoryVi: 'Đọc', icon: '📖', titleVi: 'Đọc cùng con mỗi tối', descriptionVi: 'Ba mẹ đọc CHO con → đọc CÙNG con → con đọc MỘT MÌNH. Chỉ vào từ khi đọc. Hỏi "Con thấy gì trong tranh?" sau mỗi trang. 15 phút/tối là đủ.', evidence: 'National Literacy Trust: children read to daily are 13x more likely to read above expected level', level: 'all' },
  { id: 'pg6', categoryVi: 'Viết', icon: '✏️', titleVi: 'Viết tay mỗi ngày — 5 từ', descriptionVi: 'Cho bé viết 5 từ mới vào sổ mỗi ngày. VIẾT TAY, không đánh máy. Vẽ tranh bên cạnh từ. Não ghi nhớ tốt hơn 40% khi viết tay so với đánh máy.', evidence: 'Mueller & Oppenheimer (2014): handwriting enhances conceptual learning and retention', level: 'all' },
  { id: 'pg7', categoryVi: 'Thi Speaking', icon: '🎭', titleVi: 'Mô phỏng thi Nói tại nhà', descriptionVi: 'Ngồi đối diện con. Nói "Hello! What is your name?" rồi hỏi tiếp. Xem video thi mẫu trên Cambridge YouTube. Bé quen thì thi sẽ tự tin. Luyện 2 lần/tuần, mỗi lần 5 phút.', level: 'all' },
  { id: 'pg8', categoryVi: 'Lỗi phổ biến', icon: '⚠️', titleVi: 'Top 5 lỗi phụ huynh VN thường mắc', descriptionVi: '1) Nhồi nhét — hiệu quả ngược. 2) Chỉ học ngữ pháp — bỏ quên Nghe+Nói. 3) So sánh con với bạn. 4) Bắt học thuộc câu trả lời Speaking. 5) Không cho con làm đề mẫu.', evidence: 'Synthesized from Vietnamese parent forums, teacher blogs (2023-2025)', level: 'all' },
];

// ── SMART LEARNING PATHS ──
export const SMART_PATHS: SmartLearningPath[] = [
  {
    id: 'slp1', titleVi: '🧠 Học từ vựng thông minh (không nhồi nhét)',
    descriptionVi: 'Phương pháp được hàng triệu phụ huynh áp dụng thành công',
    steps: [
      { stepVi: 'Gặp từ mới trong ngữ cảnh (truyện, video)', toolVi: 'Storyfun, Oxford Reading Tree', durationVi: '5 phút' },
      { stepVi: 'Dùng flashcard có HÌNH — không dịch sang tiếng Việt', toolVi: 'Cambridge Word List Picture Book', durationVi: '3 phút' },
      { stepVi: 'Diễn từ bằng hành động (TPR)', toolVi: 'Chơi tại nhà', durationVi: '2 phút' },
      { stepVi: 'Viết từ ra giấy + vẽ tranh', toolVi: 'Sổ từ vựng cá nhân', durationVi: '3 phút' },
      { stepVi: 'Ôn lại sau 1 ngày → 3 ngày → 7 ngày', toolVi: 'Leitner Box / Spaced Repetition', durationVi: '2 phút' },
    ],
    evidenceVi: 'Ebbinghaus (1885) + Asher TPR (1969) + Mueller handwriting study (2014)',
  },
  {
    id: 'slp2', titleVi: '🎧 Luyện Nghe hiệu quả (từ 0 đến 5 shields)',
    descriptionVi: 'Lộ trình 4 bước từ nghe thụ động → nghe chủ động',
    steps: [
      { stepVi: 'Nghe nền: bật nhạc/cartoon tiếng Anh khi chơi', toolVi: 'Super Simple Songs, Peppa Pig', durationVi: '30 phút/ngày' },
      { stepVi: 'Nghe + lặp lại: pause → bé nói theo', toolVi: 'Cambridge audio files', durationVi: '10 phút' },
      { stepVi: 'Nghe + trả lời: hỏi "Who? What? Where?"', toolVi: 'Fun for Starters/Movers audio', durationVi: '10 phút' },
      { stepVi: 'Nghe đề thi: làm Part 1-4/5 có bấm giờ', toolVi: 'Authentic Practice Tests', durationVi: '20 phút' },
    ],
    evidenceVi: 'Krashen Input Hypothesis (1982) + Cambridge Assessment listening progression framework',
  },
  {
    id: 'slp3', titleVi: '🗣️ Tự tin Nói (cho bé nhút nhát)',
    descriptionVi: 'Từ im lặng → trả lời 1 từ → nói câu đầy đủ',
    steps: [
      { stepVi: 'Bước 1: Chỉ vào đồ vật, hỏi "What is this?"', toolVi: 'Flashcards, đồ vật trong nhà', durationVi: '3 phút' },
      { stepVi: 'Bước 2: Hỏi Yes/No → "Do you like apples?"', toolVi: 'Trò chơi hỏi-đáp', durationVi: '3 phút' },
      { stepVi: 'Bước 3: Miêu tả tranh → "I can see a dog"', toolVi: 'Cambridge Speaking pictures', durationVi: '5 phút' },
      { stepVi: 'Bước 4: Kể chuyện → "First..., then..., finally..."', toolVi: 'Picture story cards', durationVi: '5 phút' },
    ],
    evidenceVi: 'Vygotsky Zone of Proximal Development (1978) + scaffolded speaking progression',
  },
];

