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

// ══════════════════════════════════════════════════════════════════
// Cambridge Main Suite (KET / PET) Exam Preparation Data
// ══════════════════════════════════════════════════════════════════

export type CambridgeExamProgramId = 'a2-key' | 'b1-preliminary';
export type CambridgeExamSkill = 'reading-writing' | 'reading' | 'writing' | 'listening' | 'speaking';
export type CambridgeQuestionMode = 'objective' | 'gap' | 'writing' | 'speaking';

export interface CambridgeOfficialSource {
    id: string;
    title: string;
    provider: string;
    sourceUrl: string;
    evidenceUse: string;
}

export interface CambridgeComponentSpec {
    skill: CambridgeExamSkill;
    label: string;
    duration: string;
    parts: number;
    questions: number;
    weight: string;
}

export interface CambridgeExamProgram {
    id: CambridgeExamProgramId;
    shortName: string;
    officialName: string;
    cefr: 'A2' | 'B1';
    cambridgeScale: string;
    examLength: string;
    componentCount: number;
    formatSourceIds: string[];
    componentSpecs: CambridgeComponentSpec[];
    officialBoundary: string;
    parentUse: string;
}

export interface CambridgePracticeQuestion {
    id: string;
    mode: CambridgeQuestionMode;
    prompt: string;
    options?: string[];
    correctAnswer?: string;
    acceptableAnswers?: string[];
    explanation: string;
    skillFocus: string;
    examinerTip: string;
}

export interface CambridgePracticeTask {
    id: string;
    skill: CambridgeExamSkill;
    officialPart: string;
    title: string;
    questionCount: number;
    instructions: string;
    text?: string;
    transcript?: string;
    questions: CambridgePracticeQuestion[];
    sampleAnswer?: string;
    rubric?: string[];
}

export interface CambridgePracticeComponent {
    skill: CambridgeExamSkill;
    label: string;
    duration: string;
    weight: string;
    tasks: CambridgePracticeTask[];
}

export interface CambridgePracticeSet {
    id: string;
    programId: CambridgeExamProgramId;
    setNo: number;
    title: string;
    titleVi: string;
    theme: string;
    sourceBoundary: string;
    timePlan: string[];
    experienceNotes: string[];
    components: CambridgePracticeComponent[];
}

interface ExamTheme {
    slug: string;
    title: string;
    place: string;
    event: string;
    club: string;
    person: string;
    friend: string;
    object: string;
    time: string;
    problem: string;
    solution: string;
    reason: string;
    contrast: string;
    skill: string;
}

const A2_THEMES: ExamTheme[] = [
    {
        slug: 'library-day',
        title: 'Library Day',
        place: 'school library',
        event: 'book swap',
        club: 'reading club',
        person: 'Mia',
        friend: 'Leo',
        object: 'library card',
        time: '3.30',
        problem: 'the old room is too noisy',
        solution: 'use the small room near the office',
        reason: 'it is quiet after lunch',
        contrast: 'busy on Friday but calm on Monday',
        skill: 'choosing a book and asking simple questions',
    },
    {
        slug: 'park-picnic',
        title: 'Park Picnic',
        place: 'city park',
        event: 'class picnic',
        club: 'nature club',
        person: 'Ben',
        friend: 'Sara',
        object: 'water bottle',
        time: '10.15',
        problem: 'some students forget their lunch',
        solution: 'share fruit and sandwiches',
        reason: 'everyone brings something small',
        contrast: 'sunny in the morning but windy later',
        skill: 'talking about food and plans',
    },
    {
        slug: 'science-morning',
        title: 'Science Morning',
        place: 'science room',
        event: 'plant experiment',
        club: 'science club',
        person: 'Noah',
        friend: 'Ivy',
        object: 'notebook',
        time: '9.20',
        problem: 'the plant near the window is dry',
        solution: 'move it and water it twice a week',
        reason: 'plants need light and water',
        contrast: 'small at first but taller after two weeks',
        skill: 'describing observations',
    },
    {
        slug: 'museum-trip',
        title: 'Museum Trip',
        place: 'history museum',
        event: 'class museum trip',
        club: 'history club',
        person: 'Emma',
        friend: 'Tom',
        object: 'ticket',
        time: '8.45',
        problem: 'the bus arrives late',
        solution: 'start with the short film',
        reason: 'the guide is free before lunch',
        contrast: 'old photos but modern screens',
        skill: 'following signs and simple instructions',
    },
    {
        slug: 'sports-fair',
        title: 'Sports Fair',
        place: 'school sports hall',
        event: 'sports fair',
        club: 'basketball club',
        person: 'Jack',
        friend: 'Nina',
        object: 'sports shoes',
        time: '4.00',
        problem: 'the outdoor court is wet',
        solution: 'play inside the sports hall',
        reason: 'the floor is safe and dry',
        contrast: 'running outside but playing games inside',
        skill: 'talking about likes and rules',
    },
    {
        slug: 'art-workshop',
        title: 'Art Workshop',
        place: 'art room',
        event: 'poster workshop',
        club: 'art club',
        person: 'Ruby',
        friend: 'Owen',
        object: 'coloured pencils',
        time: '2.10',
        problem: 'there are not enough blue pencils',
        solution: 'use green and yellow for the poster',
        reason: 'the poster is about a garden',
        contrast: 'simple drawing but bright colours',
        skill: 'describing pictures',
    },
    {
        slug: 'music-practice',
        title: 'Music Practice',
        place: 'music room',
        event: 'school concert practice',
        club: 'music club',
        person: 'Lily',
        friend: 'Adam',
        object: 'song sheet',
        time: '5.05',
        problem: 'one student cannot find the song',
        solution: 'share a song sheet',
        reason: 'the group must practise together',
        contrast: 'quiet verse but loud chorus',
        skill: 'listening for time and people',
    },
    {
        slug: 'market-help',
        title: 'Market Help',
        place: 'weekend market',
        event: 'family market visit',
        club: 'cooking club',
        person: 'Henry',
        friend: 'Anna',
        object: 'shopping bag',
        time: '11.30',
        problem: 'the apples are expensive',
        solution: 'buy bananas instead',
        reason: 'bananas are cheaper today',
        contrast: 'small shop but many choices',
        skill: 'asking prices and making choices',
    },
    {
        slug: 'beach-clean',
        title: 'Beach Clean',
        place: 'small beach',
        event: 'beach clean-up',
        club: 'eco club',
        person: 'Sofia',
        friend: 'Max',
        object: 'gloves',
        time: '7.50',
        problem: 'there is plastic near the rocks',
        solution: 'put it in the blue bags',
        reason: 'the bags are for recycling',
        contrast: 'cold wind but warm sun',
        skill: 'understanding notices and simple reasons',
    },
    {
        slug: 'cafe-project',
        title: 'Cafe Project',
        place: 'school cafe',
        event: 'charity cafe',
        club: 'English club',
        person: 'Oliver',
        friend: 'Grace',
        object: 'menu',
        time: '1.25',
        problem: 'the menu is hard to read',
        solution: 'make a bigger menu',
        reason: 'young children can choose quickly',
        contrast: 'cheap snacks but healthy drinks',
        skill: 'ordering food politely',
    },
];

const B1_THEMES: ExamTheme[] = [
    {
        slug: 'eco-podcast',
        title: 'Eco Podcast',
        place: 'media room',
        event: 'student podcast',
        club: 'eco media team',
        person: 'Amira',
        friend: 'Daniel',
        object: 'microphone',
        time: 'Thursday afternoon',
        problem: 'the first episode sounded too formal',
        solution: 'invite students to tell short personal stories',
        reason: 'listeners remember examples better than rules',
        contrast: 'scientific facts with a friendly student voice',
        skill: 'identifying attitude and purpose',
    },
    {
        slug: 'robotics-fair',
        title: 'Robotics Fair',
        place: 'technology hall',
        event: 'robotics fair',
        club: 'coding club',
        person: 'Ethan',
        friend: 'Maya',
        object: 'sensor kit',
        time: 'Saturday morning',
        problem: 'the robot turned too slowly during practice',
        solution: 'test each sensor before the demonstration',
        reason: 'small technical checks prevent public mistakes',
        contrast: 'creative design with careful engineering',
        skill: 'understanding cause, effect and recommendation',
    },
    {
        slug: 'exchange-week',
        title: 'Exchange Week',
        place: 'host school',
        event: 'student exchange week',
        club: 'international club',
        person: 'Lena',
        friend: 'Oscar',
        object: 'travel diary',
        time: 'the first week of July',
        problem: 'some visitors felt nervous on the first day',
        solution: 'pair each visitor with a local student guide',
        reason: 'informal support makes conversations easier',
        contrast: 'planned lessons with spontaneous friendships',
        skill: 'reading for inference and social purpose',
    },
    {
        slug: 'sports-psychology',
        title: 'Sports Psychology',
        place: 'training centre',
        event: 'young athletes workshop',
        club: 'running club',
        person: 'Lucas',
        friend: 'Priya',
        object: 'training log',
        time: 'before the city race',
        problem: 'students trained hard but ignored rest',
        solution: 'plan lighter sessions before competitions',
        reason: 'recovery improves concentration and confidence',
        contrast: 'ambition with sensible preparation',
        skill: 'recognising advice and opinion',
    },
    {
        slug: 'community-garden',
        title: 'Community Garden',
        place: 'neighbourhood garden',
        event: 'garden redesign',
        club: 'community volunteers',
        person: 'Nora',
        friend: 'Sam',
        object: 'plant map',
        time: 'early spring',
        problem: 'younger children had nowhere safe to help',
        solution: 'create a small herb area with clear labels',
        reason: 'simple tasks let beginners contribute',
        contrast: 'wild spaces with organised learning corners',
        skill: 'matching needs to detailed descriptions',
    },
    {
        slug: 'study-habits',
        title: 'Study Habits',
        place: 'school study centre',
        event: 'exam skills afternoon',
        club: 'study skills group',
        person: 'Karim',
        friend: 'Eva',
        object: 'revision planner',
        time: 'two weeks before exams',
        problem: 'students reread notes but did not test memory',
        solution: 'use short retrieval quizzes and spaced review',
        reason: 'practice recall shows what is really known',
        contrast: 'feeling familiar versus proving recall',
        skill: 'understanding argument and evidence',
    },
    {
        slug: 'film-club',
        title: 'Film Club',
        place: 'school theatre',
        event: 'short film festival',
        club: 'film club',
        person: 'Zoe',
        friend: 'Hugo',
        object: 'camera tripod',
        time: 'Friday evening',
        problem: 'the first script was too long',
        solution: 'focus on one clear conflict and ending',
        reason: 'short films need simple structure',
        contrast: 'strong visuals with limited dialogue',
        skill: 'following narrative development',
    },
    {
        slug: 'city-history',
        title: 'City History Trail',
        place: 'old city centre',
        event: 'history trail',
        club: 'heritage club',
        person: 'Clara',
        friend: 'Minh',
        object: 'route map',
        time: 'during the holiday',
        problem: 'many students passed monuments without noticing details',
        solution: 'give each team a question card',
        reason: 'a task makes observation more active',
        contrast: 'familiar streets with hidden stories',
        skill: 'understanding detail and writer attitude',
    },
    {
        slug: 'healthy-cafe',
        title: 'Healthy Cafe',
        place: 'school cafe',
        event: 'healthy menu project',
        club: 'student council',
        person: 'Jonas',
        friend: 'Mei',
        object: 'survey form',
        time: 'lunchtime for three days',
        problem: 'healthy food was available but not popular',
        solution: 'rename meals and ask students to vote',
        reason: 'choice and language affect motivation',
        contrast: 'nutrition advice with real student preferences',
        skill: 'evaluating reasons and results',
    },
    {
        slug: 'reading-challenge',
        title: 'Reading Challenge',
        place: 'public library',
        event: 'summer reading challenge',
        club: 'library volunteers',
        person: 'Ava',
        friend: 'Rayan',
        object: 'reading passport',
        time: 'six weeks in summer',
        problem: 'some readers chose books that were too difficult',
        solution: 'let volunteers recommend a three-book path',
        reason: 'success builds stamina for harder texts',
        contrast: 'personal choice with gentle guidance',
        skill: 'understanding recommendation and progress',
    },
];

export const CAMBRIDGE_OFFICIAL_SOURCES: CambridgeOfficialSource[] = [
    {
        id: 'cambridge-a2-key-format',
        title: 'A2 Key for Schools and A2 Key exam format',
        provider: 'Cambridge English',
        sourceUrl: 'https://www.cambridgeenglish.org/exams-and-tests/qualifications/key/format/',
        evidenceUse: 'Official component, timing, part-count and question-count source for A2 Key/KET.',
    },
    {
        id: 'cambridge-a2-key-preparation',
        title: 'A2 Key for Schools preparation and sample tests',
        provider: 'Cambridge English',
        sourceUrl: 'https://www.cambridgeenglish.org/exams-and-tests/key-for-schools/preparation/',
        evidenceUse: 'Official free sample-test and answer-key/tapescript access point; linked, not copied.',
    },
    {
        id: 'cambridge-a2-key-handbook',
        title: 'A2 Key for Schools handbook for teachers',
        provider: 'Cambridge English',
        sourceUrl: 'https://www.cambridgeenglish.org/Images/168174-cambridge-english-key-for-schools-handbook-for-teachers.pdf',
        evidenceUse: 'Official teacher guidance for task interpretation and assessment language.',
    },
    {
        id: 'cambridge-b1-preliminary-format',
        title: 'B1 Preliminary for Schools and B1 Preliminary exam format',
        provider: 'Cambridge English',
        sourceUrl: 'https://www.cambridgeenglish.org/exams-and-tests/qualifications/preliminary/format/',
        evidenceUse: 'Official component, timing, part-count and question-count source for B1 Preliminary/PET.',
    },
    {
        id: 'cambridge-b1-preliminary-preparation',
        title: 'B1 Preliminary for Schools preparation and sample tests',
        provider: 'Cambridge English',
        sourceUrl: 'https://www.cambridgeenglish.org/exams-and-tests/preliminary-for-schools/preparation/',
        evidenceUse: 'Official free sample-test and answer-key/tapescript access point; linked, not copied.',
    },
    {
        id: 'cambridge-b1-preliminary-handbook',
        title: 'B1 Preliminary for Schools handbook for teachers',
        provider: 'Cambridge English',
        sourceUrl: 'https://www.cambridgeenglish.org/Images/168143-cambridge-english-preliminary-for-schools-teachers-handbook.pdf',
        evidenceUse: 'Official teacher guidance for skills, rubrics and preparation strategy.',
    },
];

export const CAMBRIDGE_EXAM_PROGRAMS: CambridgeExamProgram[] = [
    {
        id: 'a2-key',
        shortName: 'KET',
        officialName: 'A2 Key for Schools / A2 Key',
        cefr: 'A2',
        cambridgeScale: '120-139',
        examLength: 'about 2 hours',
        componentCount: 3,
        formatSourceIds: ['cambridge-a2-key-format', 'cambridge-a2-key-preparation'],
        componentSpecs: [
            { skill: 'reading-writing', label: 'Reading and Writing', duration: '1 hour', parts: 7, questions: 32, weight: '50%' },
            { skill: 'listening', label: 'Listening', duration: '30 minutes', parts: 5, questions: 25, weight: '25%' },
            { skill: 'speaking', label: 'Speaking', duration: '8-10 minutes per pair', parts: 2, questions: 2, weight: '25%' },
        ],
        officialBoundary:
            'Matches the official A2 Key/KET structure and counts; all built-in questions, answers and explanations are original Henry practice content.',
        parentUse:
            'Dung de luyen format, kiem tra loi, va mo nguon Cambridge chinh thuc khi can sample paper that.',
    },
    {
        id: 'b1-preliminary',
        shortName: 'PET',
        officialName: 'B1 Preliminary for Schools / B1 Preliminary',
        cefr: 'B1',
        cambridgeScale: '140-159',
        examLength: 'about 2 hours 20 minutes',
        componentCount: 4,
        formatSourceIds: ['cambridge-b1-preliminary-format', 'cambridge-b1-preliminary-preparation'],
        componentSpecs: [
            { skill: 'reading', label: 'Reading', duration: '45 minutes', parts: 6, questions: 32, weight: '25%' },
            { skill: 'writing', label: 'Writing', duration: '45 minutes', parts: 2, questions: 2, weight: '25%' },
            { skill: 'listening', label: 'Listening', duration: '30 minutes', parts: 4, questions: 25, weight: '25%' },
            { skill: 'speaking', label: 'Speaking', duration: '10-12 minutes per pair', parts: 4, questions: 4, weight: '25%' },
        ],
        officialBoundary:
            'Matches the official B1 Preliminary/PET structure and counts; all built-in questions, answers and explanations are original Henry practice content.',
        parentUse:
            'Dung de tap chien luoc PET, theo doi loi, va doi chieu sample paper Cambridge chinh thuc qua link.',
    },
];

const rotateOptions = (options: string[], seed: number) => {
    const unique = Array.from(new Set(options));
    return unique.map((_, index) => unique[(index + seed) % unique.length]);
};

const detailed = (value: string, fallback: string) =>
    value.length > 20 ? value : `${value} ${fallback}`;

const objective = (
    id: string,
    prompt: string,
    correctAnswer: string,
    distractors: string[],
    explanation: string,
    skillFocus: string,
    examinerTip: string,
    seed: number,
): CambridgePracticeQuestion => ({
    id,
    mode: 'objective',
    prompt,
    options: rotateOptions([correctAnswer, ...distractors], seed),
    correctAnswer,
    explanation: detailed(explanation, 'Use the exact clue from the text, not outside knowledge.'),
    skillFocus,
    examinerTip: detailed(examinerTip, 'Keep this clue in your mistake ledger for the next practice set.'),
});

const gap = (
    id: string,
    prompt: string,
    correctAnswer: string,
    acceptableAnswers: string[],
    explanation: string,
    skillFocus: string,
    examinerTip: string,
): CambridgePracticeQuestion => ({
    id,
    mode: 'gap',
    prompt,
    correctAnswer,
    acceptableAnswers: Array.from(new Set([correctAnswer, ...acceptableAnswers])),
    explanation: detailed(explanation, 'The surrounding words make this the best answer.'),
    skillFocus,
    examinerTip: detailed(examinerTip, 'Check the grammar pattern before writing the final word.'),
});

const writing = (
    id: string,
    prompt: string,
    explanation: string,
    skillFocus: string,
    examinerTip: string,
): CambridgePracticeQuestion => ({
    id,
    mode: 'writing',
    prompt,
    explanation: detailed(explanation, 'Plan content first, then check grammar and register.'),
    skillFocus,
    examinerTip: detailed(examinerTip, 'Use this as a repeatable checklist before submitting.'),
});

const speaking = (
    id: string,
    prompt: string,
    explanation: string,
    skillFocus: string,
    examinerTip: string,
): CambridgePracticeQuestion => ({
    id,
    mode: 'speaking',
    prompt,
    explanation: detailed(explanation, 'Answer the prompt directly, then extend with one reason.'),
    skillFocus,
    examinerTip: detailed(examinerTip, 'Practise aloud and reuse the structure in the next set.'),
});

const makeA2ReadingWritingTasks = (setNo: number, theme: ExamTheme): CambridgePracticeTask[] => [
    {
        id: `a2-${setNo}-rw-1`,
        skill: 'reading-writing',
        officialPart: 'Part 1 - Multiple choice',
        title: 'Short messages and notices',
        questionCount: 6,
        instructions: 'Read each short notice or message. Choose the answer that shows the main message.',
        questions: [
            objective(`a2-${setNo}-rw1-1`, `Notice: ${theme.event} starts at ${theme.time}. Bring your ${theme.object}. What must students do?`, `Bring a ${theme.object}.`, ['Arrive after lunch.', 'Call the teacher first.'], `The notice tells students what item they need for ${theme.event}.`, 'Main message in a notice', 'Look for must/bring/meet words before choosing.', setNo),
            objective(`a2-${setNo}-rw1-2`, `Message from ${theme.person}: I am waiting outside the ${theme.place}. Where is ${theme.person}?`, `Outside the ${theme.place}.`, [`Inside the ${theme.place}.`, `At home with ${theme.friend}.`], 'The preposition outside gives the location.', 'Place words', 'Small prepositions often decide the answer.', setNo + 1),
            objective(`a2-${setNo}-rw1-3`, `Sign: Please do not eat in the ${theme.place}. What does the sign mean?`, 'Food is not allowed there.', ['Students can buy snacks there.', 'The room is closed today.'], 'Do not eat means food is not allowed.', 'Prohibition signs', 'Do not choose an option that adds information not in the sign.', setNo + 2),
            objective(`a2-${setNo}-rw1-4`, `Text from ${theme.friend}: The meeting is now in the small room because ${theme.problem}. Why did the place change?`, theme.problem, [`${theme.solution}.`, `${theme.event} is cancelled.`], 'Because introduces the reason for the change.', 'Reason markers', 'After because, expect a reason, not a new plan.', setNo + 3),
            objective(`a2-${setNo}-rw1-5`, `Notice: New students should ask ${theme.person} for help at the desk. Who helps new students?`, theme.person, [theme.friend, 'the bus driver'], `The notice names ${theme.person} as the helper.`, 'Identifying people', 'Names are often the easiest anchor in short texts.', setNo + 4),
            objective(`a2-${setNo}-rw1-6`, `Message: We cannot use the big room today. Please meet near the office. Where should students meet?`, 'Near the office.', ['In the big room.', `At the ${theme.place}.`], 'The second sentence gives the new meeting place.', 'Following changed instructions', 'When a message says cannot, look for the replacement instruction.', setNo + 5),
        ],
    },
    {
        id: `a2-${setNo}-rw-2`,
        skill: 'reading-writing',
        officialPart: 'Part 2 - Multiple matching',
        title: 'Three short texts on one topic',
        questionCount: 7,
        instructions: 'Read the three texts. For each question, choose Text A, Text B or Text C.',
        text: `Text A: ${theme.person} likes quiet places and wants to practise ${theme.skill}. Text B: ${theme.friend} likes working with a group and enjoys making posters for ${theme.event}. Text C: The ${theme.club} meets at ${theme.time} and is best for students who can bring a ${theme.object}.`,
        questions: [
            objective(`a2-${setNo}-rw2-1`, 'Which text is about a student who likes quiet work?', 'Text A', ['Text B', 'Text C'], `Text A says ${theme.person} likes quiet places.`, 'Matching detail to text', 'Underline one unique detail in each text.', setNo),
            objective(`a2-${setNo}-rw2-2`, 'Which text mentions making posters?', 'Text B', ['Text A', 'Text C'], 'Only Text B mentions making posters.', 'Finding exact detail', 'Match meaning, not just repeated nouns.', setNo + 1),
            objective(`a2-${setNo}-rw2-3`, `Which text tells students to bring a ${theme.object}?`, 'Text C', ['Text A', 'Text B'], `Text C says students can bring a ${theme.object}.`, 'Object detail', 'In A2 matching, one clear object can identify the text.', setNo + 2),
            objective(`a2-${setNo}-rw2-4`, `Which text is best for ${theme.skill}?`, 'Text A', ['Text B', 'Text C'], `Text A connects the student with ${theme.skill}.`, 'Purpose matching', 'Find the activity that fits the person.', setNo + 3),
            objective(`a2-${setNo}-rw2-5`, 'Which text includes a meeting time?', 'Text C', ['Text A', 'Text B'], `Text C includes ${theme.time}.`, 'Time detail', 'Times usually answer when questions.', setNo + 4),
            objective(`a2-${setNo}-rw2-6`, 'Which text is about group work?', 'Text B', ['Text A', 'Text C'], 'Text B says the student likes working with a group.', 'People preferences', 'Group/alone is a common A2 contrast.', setNo + 5),
            objective(`a2-${setNo}-rw2-7`, `Which text names the ${theme.club}?`, 'Text C', ['Text A', 'Text B'], `Text C begins with the ${theme.club}.`, 'Club names', 'Capitalise and identify names quickly.', setNo + 6),
        ],
    },
    {
        id: `a2-${setNo}-rw-3`,
        skill: 'reading-writing',
        officialPart: 'Part 3 - Multiple choice',
        title: 'Longer text for detailed understanding',
        questionCount: 5,
        instructions: 'Read the story. Choose the correct answer for each question.',
        text: `${theme.person} wanted to help at the ${theme.event} in the ${theme.place}. At first, ${theme.problem}, so the teacher asked the students to change the plan. ${theme.friend} suggested that they should ${theme.solution}. The new plan worked well because ${theme.reason}. By the end of the day, ${theme.person} felt proud. The day was ${theme.contrast}, and everyone learned something useful about ${theme.skill}.`,
        questions: [
            objective(`a2-${setNo}-rw3-1`, `Where did the story happen?`, `In the ${theme.place}.`, ['On a train.', 'At a cinema.'], `The first sentence names the ${theme.place}.`, 'Setting', 'The setting often appears in the first sentence.', setNo),
            objective(`a2-${setNo}-rw3-2`, 'What happened at first?', theme.problem, [theme.solution, 'everyone went home early'], 'At first introduces the initial problem.', 'Sequence words', 'At first/before/later help you follow a story.', setNo + 1),
            objective(`a2-${setNo}-rw3-3`, `Who suggested the new plan?`, theme.friend, [theme.person, 'the bus driver'], `${theme.friend} suggested the solution.`, 'Identifying agent', 'Ask who did the action before choosing.', setNo + 2),
            objective(`a2-${setNo}-rw3-4`, 'Why did the new plan work?', theme.reason, [theme.problem, theme.contrast], `Because introduces the reason: ${theme.reason}.`, 'Reasoning', 'A why question needs a reason, not a description.', setNo + 3),
            objective(`a2-${setNo}-rw3-5`, `How did ${theme.person} feel at the end?`, 'Proud.', ['Angry.', 'Bored.'], 'The story says the student felt proud.', 'Feelings', 'End feelings often show the main result.', setNo + 4),
        ],
    },
    {
        id: `a2-${setNo}-rw-4`,
        skill: 'reading-writing',
        officialPart: 'Part 4 - Multiple-choice cloze',
        title: 'Choose the correct word',
        questionCount: 6,
        instructions: 'Choose the correct word to complete each gap.',
        text: `The ${theme.club} meets ___ school on Tuesdays. Students ___ bring a ${theme.object}. They work ___ small groups and talk ___ their ideas. The teacher helps them ___ the end of the lesson. Everyone feels happy ___ they can use English in a real activity.`,
        questions: [
            objective(`a2-${setNo}-rw4-1`, 'Gap 1: The club meets ___ school on Tuesdays.', 'after', ['between', 'under'], 'After school is the natural time phrase.', 'Time prepositions', 'Check if the gap talks about time or place.', setNo),
            objective(`a2-${setNo}-rw4-2`, `Gap 2: Students ___ bring a ${theme.object}.`, 'should', ['much', 'there'], 'Should gives advice about what students need.', 'Modal verb', 'A modal comes before the base verb bring.', setNo + 1),
            objective(`a2-${setNo}-rw4-3`, 'Gap 3: They work ___ small groups.', 'in', ['on', 'at'], 'We work in groups.', 'Preposition collocation', 'Learn common chunks: in groups, at school, on Monday.', setNo + 2),
            objective(`a2-${setNo}-rw4-4`, 'Gap 4: They talk ___ their ideas.', 'about', ['from', 'over'], 'Talk about is the correct phrase.', 'Verb phrase', 'Read two words before and after the gap.', setNo + 3),
            objective(`a2-${setNo}-rw4-5`, 'Gap 5: The teacher helps them ___ the end of the lesson.', 'at', ['for', 'by'], 'At the end is the fixed phrase.', 'Fixed phrase', 'Some gaps test common expressions.', setNo + 4),
            objective(`a2-${setNo}-rw4-6`, 'Gap 6: Everyone feels happy ___ they can use English.', 'because', ['but', 'than'], 'Because introduces the reason for feeling happy.', 'Linking words', 'Use because when the second part gives a reason.', setNo + 5),
        ],
    },
    {
        id: `a2-${setNo}-rw-5`,
        skill: 'reading-writing',
        officialPart: 'Part 5 - Open cloze',
        title: 'One word in each gap',
        questionCount: 6,
        instructions: 'Write one word in each gap.',
        text: `Hi ${theme.friend}, I am going ___ the ${theme.event} tomorrow. It starts ___ ${theme.time}. I want to take my ${theme.object} because ___ helps me. Can you come ___ me? We will meet ___ the ${theme.place}. See you soon!`,
        questions: [
            gap(`a2-${setNo}-rw5-1`, `Gap 1: I am going ___ the ${theme.event} tomorrow.`, 'to', [], 'Going to + place/event is the correct structure.', 'Preposition after going', 'Use one word only in this part.'),
            gap(`a2-${setNo}-rw5-2`, `Gap 2: It starts ___ ${theme.time}.`, 'at', [], 'At is used for clock time.', 'Time preposition', 'Clock times usually take at.'),
            gap(`a2-${setNo}-rw5-3`, `Gap 3: I want to take my ${theme.object} because ___ helps me.`, 'it', [], `It refers to the ${theme.object}.`, 'Pronoun reference', 'Find what noun the missing pronoun replaces.'),
            gap(`a2-${setNo}-rw5-4`, 'Gap 4: Can you come ___ me?', 'with', [], 'Come with me is the correct phrase.', 'Common phrase', 'Read the whole short phrase, not just one word.'),
            gap(`a2-${setNo}-rw5-5`, `Gap 5: We will meet ___ the ${theme.place}.`, 'at', [], 'At is used for a meeting point.', 'Place preposition', 'Meet at + place is common.'),
            gap(`a2-${setNo}-rw5-6`, 'Gap 6: See you ___!', 'soon', ['there'], 'Soon is a natural closing for a message.', 'Message closing', 'Use a word that fits the social purpose of the text.'),
        ],
    },
    {
        id: `a2-${setNo}-rw-6`,
        skill: 'reading-writing',
        officialPart: 'Part 6 - Guided writing',
        title: 'Short email or note',
        questionCount: 1,
        instructions: 'Write 25 words or more. Answer all three points.',
        questions: [
            writing(
                `a2-${setNo}-rw6-1`,
                `You are going to the ${theme.event}. Write an email to ${theme.friend}. Say when it is, what to bring, and why you want to go.`,
                'A strong answer covers all three bullet points: time, object and reason.',
                'Short functional writing',
                'Do not write many difficult sentences. Write clear A2 sentences and answer every point.',
            ),
        ],
        sampleAnswer: `Hi ${theme.friend},\nThe ${theme.event} is at ${theme.time}. Please bring your ${theme.object}. I want to go because ${theme.reason}. See you tomorrow!\n${theme.person}`,
        rubric: ['25+ words', 'Answers every point', 'Clear opening and closing', 'Simple grammar is accurate enough to understand'],
    },
    {
        id: `a2-${setNo}-rw-7`,
        skill: 'reading-writing',
        officialPart: 'Part 7 - Picture story',
        title: 'Story from three prompts',
        questionCount: 1,
        instructions: 'Write 35 words or more. Use the three prompts to make a simple story.',
        questions: [
            writing(
                `a2-${setNo}-rw7-1`,
                `Picture prompts: 1) ${theme.person} arrives at the ${theme.place}; 2) ${theme.problem}; 3) ${theme.solution}. Write the story.`,
                'A good story has beginning, problem and ending. Use past simple for completed events.',
                'Narrative writing',
                'Name the people, say what happened, and finish with how they felt.',
            ),
        ],
        sampleAnswer: `${theme.person} went to the ${theme.place} for the ${theme.event}. At first, ${theme.problem}. ${theme.friend} had an idea: they could ${theme.solution}. The idea worked, and the class felt happy because ${theme.reason}.`,
        rubric: ['35+ words', 'Clear sequence', 'Problem and solution included', 'Past simple used consistently where possible'],
    },
];

const makeA2ListeningTasks = (setNo: number, theme: ExamTheme): CambridgePracticeTask[] => [
    {
        id: `a2-${setNo}-l-1`,
        skill: 'listening',
        officialPart: 'Part 1 - Multiple choice',
        title: 'Five short dialogues',
        questionCount: 5,
        instructions: 'Listen and choose the correct answer. In the app, play the transcript with text-to-speech.',
        transcript: `${theme.person}: Are we meeting at ${theme.time}? ${theme.friend}: Yes, outside the ${theme.place}. Bring your ${theme.object}. Teacher: The big room is closed, so use the small room today. Student: I like the ${theme.event} because ${theme.reason}.`,
        questions: [
            objective(`a2-${setNo}-l1-1`, 'Where are the students meeting?', `Outside the ${theme.place}.`, ['In the big room.', 'At the bus stop.'], 'The speaker says outside the place.', 'Listening for place', 'Listen for the second speaker when the first speaker asks a question.', setNo),
            objective(`a2-${setNo}-l1-2`, 'What should students bring?', `A ${theme.object}.`, ['A camera.', 'A lunch box.'], `The dialogue says bring your ${theme.object}.`, 'Listening for object', 'The answer often comes after bring/take/need.', setNo + 1),
            objective(`a2-${setNo}-l1-3`, 'Which room should they use?', 'The small room.', ['The big room.', 'No room.'], 'The big room is closed, so they use the small room.', 'Changed instruction', 'But/so often introduces the final answer.', setNo + 2),
            objective(`a2-${setNo}-l1-4`, `Why does the student like the ${theme.event}?`, theme.reason, [theme.problem, theme.contrast], 'The student gives the reason after because.', 'Reason in listening', 'Because is an answer marker for why questions.', setNo + 3),
            objective(`a2-${setNo}-l1-5`, 'What time is mentioned?', theme.time, ['6.30', '12.45'], `The first speaker asks about ${theme.time}.`, 'Listening for time', 'Write down numbers as soon as you hear them.', setNo + 4),
        ],
    },
    {
        id: `a2-${setNo}-l-2`,
        skill: 'listening',
        officialPart: 'Part 2 - Gap fill',
        title: 'Complete notes',
        questionCount: 5,
        instructions: 'Listen and write one word or number in each gap.',
        transcript: `Announcement: The ${theme.club} trip is on Tuesday. Meet at the ${theme.place} at ${theme.time}. Please bring a ${theme.object}. The leader is ${theme.person}. If it rains, the group will ${theme.solution}.`,
        questions: [
            gap(`a2-${setNo}-l2-1`, 'Trip day: ___', 'Tuesday', ['tuesday'], 'The announcement says the trip is on Tuesday.', 'Listening note completion', 'Capital letters are not important, but spelling is.'),
            gap(`a2-${setNo}-l2-2`, 'Meeting place: ___', theme.place, [theme.place.toLowerCase()], `The meeting place is the ${theme.place}.`, 'Place detail', 'If the answer is a place phrase, include the key noun.'),
            gap(`a2-${setNo}-l2-3`, 'Meeting time: ___', theme.time, [], `The time is ${theme.time}.`, 'Time detail', 'Practise writing times quickly.'),
            gap(`a2-${setNo}-l2-4`, 'Bring: ___', theme.object, [theme.object.toLowerCase()], `Students need a ${theme.object}.`, 'Object detail', 'Listen after bring or need.'),
            gap(`a2-${setNo}-l2-5`, 'Leader: ___', theme.person, [theme.person.toLowerCase()], `${theme.person} is the leader.`, 'Name detail', 'Names are often spelled clearly in real exams.'),
        ],
    },
    {
        id: `a2-${setNo}-l-3`,
        skill: 'listening',
        officialPart: 'Part 3 - Multiple choice',
        title: 'Dialogue for key information',
        questionCount: 5,
        instructions: 'Listen to two students talking and choose the correct answer.',
        transcript: `${theme.friend}: I thought the ${theme.event} would be difficult. ${theme.person}: Me too, but it was useful. We learned ${theme.skill}. ${theme.friend}: The only problem was that ${theme.problem}. ${theme.person}: Yes, but the teacher helped us ${theme.solution}.`,
        questions: [
            objective(`a2-${setNo}-l3-1`, 'How did the students feel before the activity?', 'They thought it might be difficult.', ['They were angry.', 'They wanted to cancel it.'], 'The first speaker says it would be difficult.', 'Attitude before event', 'Listen for adjectives about feelings or expectations.', setNo),
            objective(`a2-${setNo}-l3-2`, 'How was the activity in the end?', 'Useful.', ['Boring.', 'Too long.'], 'The second speaker says it was useful.', 'Overall opinion', 'In dialogues, the final opinion can change.', setNo + 1),
            objective(`a2-${setNo}-l3-3`, 'What did they learn?', theme.skill, [theme.reason, theme.object], `They learned ${theme.skill}.`, 'Activity purpose', 'After learned, expect the skill/content.', setNo + 2),
            objective(`a2-${setNo}-l3-4`, 'What was the problem?', theme.problem, [theme.solution, theme.contrast], 'The first speaker names the problem.', 'Problem detail', 'The word problem is not always repeated; listen for but/only.', setNo + 3),
            objective(`a2-${setNo}-l3-5`, 'Who helped them?', 'The teacher.', [theme.friend, 'The driver.'], 'The transcript says the teacher helped.', 'Identifying helper', 'Check subject + verb: who did the helping?', setNo + 4),
        ],
    },
    {
        id: `a2-${setNo}-l-4`,
        skill: 'listening',
        officialPart: 'Part 4 - Multiple choice',
        title: 'Main idea in short talks',
        questionCount: 5,
        instructions: 'Listen and choose the main idea.',
        transcript: `Speaker 1: I like ${theme.event} because ${theme.reason}. Speaker 2: I prefer quiet activities when the room is busy. Speaker 3: If ${theme.problem}, we should ${theme.solution}. Speaker 4: My favourite part is using English with friends.`,
        questions: [
            objective(`a2-${setNo}-l4-1`, 'Speaker 1 is talking about...', `why they like the ${theme.event}.`, ['where to buy food.', 'a lost ticket.'], 'Because introduces the reason for liking the event.', 'Main idea', 'Do not pick an option from one small word only.', setNo),
            objective(`a2-${setNo}-l4-2`, 'Speaker 2 prefers...', 'quiet activities.', ['loud music.', 'late meetings.'], 'The speaker directly says quiet activities.', 'Preference', 'Prefer means the chosen option.', setNo + 1),
            objective(`a2-${setNo}-l4-3`, 'Speaker 3 gives...', 'a solution.', ['a price.', 'a birthday date.'], `The speaker says if there is a problem, students should ${theme.solution}.`, 'Problem-solution', 'If + should often gives advice.', setNo + 2),
            objective(`a2-${setNo}-l4-4`, 'Speaker 4 enjoys...', 'using English with friends.', ['cleaning the classroom.', 'travelling alone.'], 'The speaker names using English with friends as the favourite part.', 'Favourite activity', 'Favourite part signals an opinion.', setNo + 3),
            objective(`a2-${setNo}-l4-5`, 'Which speaker mentions a problem?', 'Speaker 3', ['Speaker 1', 'Speaker 4'], 'Speaker 3 starts with if and names the problem.', 'Matching speaker to idea', 'Listen for problem words before choosing.', setNo + 4),
        ],
    },
    {
        id: `a2-${setNo}-l-5`,
        skill: 'listening',
        officialPart: 'Part 5 - Matching',
        title: 'Match people and activities',
        questionCount: 5,
        instructions: 'Listen and match each person to what they will do.',
        transcript: `${theme.person} will bring the ${theme.object}. ${theme.friend} will make a poster. The teacher will open the room. A new student will write the list. The group leader will check the time.`,
        questions: [
            objective(`a2-${setNo}-l5-1`, `What will ${theme.person} do?`, `Bring the ${theme.object}.`, ['Make a poster.', 'Open the room.'], `The transcript says ${theme.person} will bring the object.`, 'Person-action matching', 'Write initials beside actions while listening.', setNo),
            objective(`a2-${setNo}-l5-2`, `What will ${theme.friend} do?`, 'Make a poster.', [`Bring the ${theme.object}.`, 'Check the time.'], `${theme.friend} will make a poster.`, 'Person-action matching', 'Do not confuse adjacent names.', setNo + 1),
            objective(`a2-${setNo}-l5-3`, 'Who will open the room?', 'The teacher.', [theme.person, 'The new student.'], 'The teacher will open the room.', 'Role detail', 'Roles can be answers just like names.', setNo + 2),
            objective(`a2-${setNo}-l5-4`, 'Who will write the list?', 'A new student.', [theme.friend, 'The group leader.'], 'The new student will write the list.', 'Role-action detail', 'Listen for will + verb.', setNo + 3),
            objective(`a2-${setNo}-l5-5`, 'What will the group leader check?', 'The time.', ['The poster.', 'The door.'], 'The group leader checks the time.', 'Object detail', 'After check, listen for the noun.', setNo + 4),
        ],
    },
];

const makeA2SpeakingTasks = (setNo: number, theme: ExamTheme): CambridgePracticeTask[] => [
    {
        id: `a2-${setNo}-s-1`,
        skill: 'speaking',
        officialPart: 'Part 1 - Interview',
        title: 'Personal questions',
        questionCount: 1,
        instructions: 'Answer simple personal questions clearly. Practise aloud.',
        questions: [
            speaking(
                `a2-${setNo}-s1-1`,
                `Answer three questions: What do you like doing after school? Do you prefer ${theme.event} or reading? Why?`,
                'Good A2 answers are short but complete: I like..., I prefer..., because...',
                'Personal factual information',
                'Use one reason with because. Avoid memorised answers that do not fit the question.',
            ),
        ],
        sampleAnswer: `I like playing with my friends after school. I prefer ${theme.event} because ${theme.reason}. I also like learning new words.`,
        rubric: ['Answers the question', 'Uses simple complete sentences', 'Gives one clear reason', 'Pronunciation is clear enough'],
    },
    {
        id: `a2-${setNo}-s-2`,
        skill: 'speaking',
        officialPart: 'Part 2 - Discussion',
        title: 'Likes, dislikes and reasons',
        questionCount: 1,
        instructions: 'Discuss the prompt with a partner. Ask and answer simple questions.',
        questions: [
            speaking(
                `a2-${setNo}-s2-1`,
                `You and a friend want to join the ${theme.club}. Talk about what to bring, when to meet, and what activity you like best.`,
                'A strong practice answer asks a question, answers a question, and gives a reason.',
                'Interactive communication',
                'Ask your partner one real question. Speaking is not a solo speech.',
            ),
        ],
        sampleAnswer: `What should we bring? I think we should bring a ${theme.object}. We can meet at ${theme.time}. I like ${theme.event} because ${theme.reason}. What do you like?`,
        rubric: ['Asks at least one question', 'Responds to partner idea', 'Mentions time and object', 'Gives a simple reason'],
    },
];

const makeB1ReadingTasks = (setNo: number, theme: ExamTheme): CambridgePracticeTask[] => [
    {
        id: `b1-${setNo}-r-1`,
        skill: 'reading',
        officialPart: 'Part 1 - Multiple choice',
        title: 'Five notices and messages',
        questionCount: 5,
        instructions: 'Read five short texts and choose the main message.',
        questions: [
            objective(`b1-${setNo}-r1-1`, `Message: The ${theme.event} has moved to the ${theme.place}; students who booked late should report to ${theme.person}. What should late students do?`, `Report to ${theme.person}.`, [`Go directly to the ${theme.place}.`, 'Book again online.'], 'The phrase should report gives the required action for late students.', 'Main message under condition', 'Check who the instruction is for before answering.', setNo),
            objective(`b1-${setNo}-r1-2`, `Notice: Bring your ${theme.object} only if you want to join the demonstration. What does this mean?`, `The ${theme.object} is optional for some students.`, [`Everyone must bring the ${theme.object}.`, 'No one can join the demonstration.'], 'Only if limits the instruction to students joining the demonstration.', 'Condition language', 'Only if is a strong condition marker.', setNo + 1),
            objective(`b1-${setNo}-r1-3`, `Text from ${theme.friend}: I liked the plan, although ${theme.problem}. What is ${theme.friend}'s opinion?`, 'Mostly positive but with one problem.', ['Completely negative.', 'Uninterested in the plan.'], 'Although introduces a contrast after a positive statement.', 'Attitude and contrast', 'In B1 notices, attitude may be mixed.', setNo + 2),
            objective(`b1-${setNo}-r1-4`, `Announcement: Because ${theme.reason}, tomorrow's session will begin with student stories instead of a lecture. Why was the session changed?`, theme.reason, [theme.solution, theme.contrast], 'Because introduces the reason for the change.', 'Reason and result', 'Identify cause first, then result.', setNo + 3),
            objective(`b1-${setNo}-r1-5`, `Email: Please check the ${theme.object} before Friday so we can avoid the same mistake during the ${theme.event}. What is the purpose of the email?`, 'To prevent a problem before the event.', ['To cancel the event.', 'To ask for money.'], 'The writer wants checks before Friday to avoid a mistake.', 'Purpose', 'Purpose questions ask why the text was written.', setNo + 4),
        ],
    },
    {
        id: `b1-${setNo}-r-2`,
        skill: 'reading',
        officialPart: 'Part 2 - Matching',
        title: 'Match people to eight texts',
        questionCount: 5,
        instructions: 'Match each student to the best activity. There are three extra options.',
        text: `A. A quiet workshop on planning and reflection. B. A practical demonstration using a ${theme.object}. C. A team challenge linked to ${theme.event}. D. A discussion about ${theme.problem}. E. A short talk by ${theme.person} about ${theme.skill}. F. A beginner session with no equipment. G. An advanced debate with long reading. H. A social lunch with no learning task.`,
        questions: [
            objective(`b1-${setNo}-r2-1`, 'A student wants calm study strategies and dislikes group competition.', 'A', ['C', 'H'], 'Option A is quiet and focused on planning/reflection.', 'Need-detail matching', 'Match both the positive need and the negative preference.', setNo),
            objective(`b1-${setNo}-r2-2`, `A student wants to use a ${theme.object} in a real demonstration.`, 'B', ['F', 'G'], `Option B directly mentions a practical demonstration using a ${theme.object}.`, 'Specific activity matching', 'Concrete nouns help identify the right text.', setNo + 1),
            objective(`b1-${setNo}-r2-3`, `A student enjoys teamwork and wants a challenge connected with ${theme.event}.`, 'C', ['A', 'E'], `Option C says team challenge linked to ${theme.event}.`, 'Preference matching', 'Do not choose a talk when the student wants a challenge.', setNo + 2),
            objective(`b1-${setNo}-r2-4`, `A student is worried about ${theme.problem} and wants to hear possible solutions.`, 'D', ['H', 'G'], `Option D is a discussion about ${theme.problem}.`, 'Problem matching', 'The best option should address the exact worry.', setNo + 3),
            objective(`b1-${setNo}-r2-5`, `A student wants to hear ${theme.person} explain ${theme.skill}.`, 'E', ['B', 'F'], `Option E names ${theme.person} and ${theme.skill}.`, 'Named detail matching', 'Names make matching faster, but still read the purpose.', setNo + 4),
        ],
    },
    {
        id: `b1-${setNo}-r-3`,
        skill: 'reading',
        officialPart: 'Part 3 - Multiple choice',
        title: 'Longer text for detailed comprehension',
        questionCount: 5,
        instructions: 'Read the text and choose the best answer.',
        text: `${theme.person} joined the ${theme.club} because the ${theme.event} sounded practical rather than theoretical. During the first meeting, the group discovered that ${theme.problem}. Some students wanted to cancel the public part, but ${theme.friend} argued that small failures could become useful learning moments. The group decided to ${theme.solution}. This worked because ${theme.reason}. By the end, the project combined ${theme.contrast}. ${theme.person} later wrote that confidence grows when students prepare carefully but still accept surprises.`,
        questions: [
            objective(`b1-${setNo}-r3-1`, `Why did ${theme.person} join the club?`, 'The activity seemed practical.', ['A friend forced them to join.', 'The club had no meetings.'], 'The first sentence contrasts practical with theoretical.', 'Reason for action', 'Look for because in the opening sentence.', setNo),
            objective(`b1-${setNo}-r3-2`, 'What problem did the group find?', theme.problem, [theme.solution, theme.contrast], 'The problem is introduced after discovered that.', 'Detailed comprehension', 'Separate the problem from the solution that follows later.', setNo + 1),
            objective(`b1-${setNo}-r3-3`, `What was ${theme.friend}'s view?`, 'Failures can help students learn.', ['The project should be cancelled.', 'Only adults should decide.'], 'The friend says small failures could become learning moments.', 'Inferring opinion', 'B1 questions often paraphrase, not repeat exact words.', setNo + 2),
            objective(`b1-${setNo}-r3-4`, 'Why did the solution work?', theme.reason, [theme.problem, 'it was the cheapest idea'], 'The text says this worked because of the reason.', 'Cause and effect', 'When you see this worked because, mark the reason.', setNo + 3),
            objective(`b1-${setNo}-r3-5`, 'What lesson did the student learn?', 'Prepare carefully but accept surprises.', ['Avoid all public activities.', 'Never change a plan.'], 'The final sentence states the lesson about preparation and surprises.', 'Global meaning', 'The final sentence often summarises the writer message.', setNo + 4),
        ],
    },
    {
        id: `b1-${setNo}-r-4`,
        skill: 'reading',
        officialPart: 'Part 4 - Gapped text',
        title: 'Put sentences into a text',
        questionCount: 5,
        instructions: 'Choose the best sentence for each gap.',
        text: `A student team prepared for the ${theme.event}. [1] They first focused on facts, but the audience wanted examples. [2] The team then changed the plan. [3] This made the presentation easier to follow. [4] After the event, students wrote down what they would repeat next time. [5]`,
        questions: [
            objective(`b1-${setNo}-r4-1`, 'Gap 1', `The aim was to explain ${theme.skill} in a way younger students could understand.`, ['The bus left before anyone arrived.', 'Nobody wanted to speak English again.'], 'This sentence introduces the aim before the preparation details.', 'Text cohesion', 'A first gap often needs context or purpose.', setNo),
            objective(`b1-${setNo}-r4-2`, 'Gap 2', `That was when ${theme.friend} suggested using short stories.`, ['The chairs were blue and new.', 'The weather was colder than expected.'], 'The sentence connects audience needs with a new suggestion.', 'Reference words', 'That was when refers back to the problem just described.', setNo + 1),
            objective(`b1-${setNo}-r4-3`, 'Gap 3', `Instead of a long talk, they decided to ${theme.solution}.`, ['They forgot the school address.', 'They stopped learning vocabulary.'], 'Instead of signals contrast with the old plan.', 'Contrast and replacement', 'Instead of usually introduces the new approach.', setNo + 2),
            objective(`b1-${setNo}-r4-4`, 'Gap 4', `Several listeners said the balance of ${theme.contrast} was memorable.`, ['Everyone complained about the price.', 'The school closed for a month.'], 'This sentence evaluates the result after the presentation.', 'Result and feedback', 'Feedback often follows an outcome sentence.', setNo + 3),
            objective(`b1-${setNo}-r4-5`, 'Gap 5', `Their main conclusion was that ${theme.reason}.`, ['They never met again.', 'The object was made of metal.'], 'This sentence gives the final lesson after reflection.', 'Conclusion', 'Conclusion words often fit the final gap.', setNo + 4),
        ],
    },
    {
        id: `b1-${setNo}-r-5`,
        skill: 'reading',
        officialPart: 'Part 5 - Multiple-choice cloze',
        title: 'Vocabulary cloze',
        questionCount: 6,
        instructions: 'Choose the correct word for each gap.',
        text: `The ${theme.club} wanted to make the ${theme.event} more useful. The first plan was too ___, so students added examples. They ___ feedback from younger learners and made a new schedule. The final session was ___ because it mixed practice with reflection. Students said they felt more ___ when they understood the purpose of each task.`,
        questions: [
            objective(`b1-${setNo}-r5-1`, 'Gap 1: The first plan was too ___.', 'formal', ['hungry', 'wooden'], 'Formal fits a plan that needs friendlier examples.', 'Vocabulary in context', 'Choose the word that fits the sentence meaning.', setNo),
            objective(`b1-${setNo}-r5-2`, 'Gap 2: so students ___ examples.', 'added', ['borrowed', 'lost'], 'Added examples means put examples into the plan.', 'Verb meaning', 'Check if the object after the verb makes sense.', setNo + 1),
            objective(`b1-${setNo}-r5-3`, 'Gap 3: They ___ feedback.', 'collected', ['slept', 'painted'], 'Collected feedback is a common collocation.', 'Collocation', 'Learn verb + noun chunks such as collect feedback.', setNo + 2),
            objective(`b1-${setNo}-r5-4`, 'Gap 4: made a new ___.', 'schedule', ['mountain', 'mirror'], 'A schedule fits planning times.', 'Noun selection', 'Use topic context: planning needs a schedule.', setNo + 3),
            objective(`b1-${setNo}-r5-5`, 'Gap 5: The final session was ___.', 'effective', ['empty', 'silent'], 'Effective means it worked well.', 'Evaluative adjective', 'Look for the result described after because.', setNo + 4),
            objective(`b1-${setNo}-r5-6`, 'Gap 6: students felt more ___.', 'confident', ['square', 'foreign'], 'Confident fits understanding purpose and success.', 'Feeling adjective', 'Pick adjectives that describe people, not objects.', setNo + 5),
        ],
    },
    {
        id: `b1-${setNo}-r-6`,
        skill: 'reading',
        officialPart: 'Part 6 - Open cloze',
        title: 'Grammar cloze',
        questionCount: 6,
        instructions: 'Write one word in each gap.',
        text: `${theme.person} used to think revision meant reading notes again and again. Now, however, the group tests itself ___ short questions. They do this ___ the end of each session because it shows what they still need ___ practise. The method is simple, but it works ___ students return to difficult points later. It also helps them explain ideas ___ their own words.`,
        questions: [
            gap(`b1-${setNo}-r6-1`, 'Gap 1: tests itself ___ short questions.', 'with', [], 'Test with short questions is the correct phrase.', 'Preposition after verb', 'Think of verb + preposition combinations.'),
            gap(`b1-${setNo}-r6-2`, 'Gap 2: They do this ___ the end of each session.', 'at', [], 'At the end is a fixed phrase.', 'Fixed expression', 'Do not use in for the phrase at the end.'),
            gap(`b1-${setNo}-r6-3`, 'Gap 3: need ___ practise.', 'to', [], 'Need to + verb is required.', 'Infinitive after need', 'After need, use to before the verb.'),
            gap(`b1-${setNo}-r6-4`, 'Gap 4: it works ___ students return to difficult points later.', 'because', ['when'], 'Because clearly gives the reason.', 'Linking word', 'Check whether the second clause gives reason or time.'),
            gap(`b1-${setNo}-r6-5`, 'Gap 5: explain ideas ___ their own words.', 'in', [], 'In their own words is the fixed expression.', 'Fixed expression', 'Learn common exam phrases as chunks.'),
            gap(`b1-${setNo}-r6-6`, 'Gap 6: This is more useful ___ only reading notes.', 'than', [], 'More useful than is the comparative structure.', 'Comparative structure', 'More + adjective usually needs than for comparison.'),
        ],
    },
];

const makeB1WritingTasks = (setNo: number, theme: ExamTheme): CambridgePracticeTask[] => [
    {
        id: `b1-${setNo}-w-1`,
        skill: 'writing',
        officialPart: 'Part 1 - Email',
        title: 'Write an email',
        questionCount: 1,
        instructions: 'Write about 100 words. Answer all notes in the email.',
        questions: [
            writing(
                `b1-${setNo}-w1-1`,
                `Your English friend asks about the ${theme.event}. Reply and explain what happened, what problem you solved, and whether your friend should join next time.`,
                'A strong B1 email answers every content point, uses friendly opening/closing, and gives reasons.',
                'Transactional email',
                'Plan three content points before writing. Do not forget the recommendation.',
            ),
        ],
        sampleAnswer: `Hi ${theme.friend},\nThe ${theme.event} was much better than I expected. At first, ${theme.problem}, but our team decided to ${theme.solution}. That worked because ${theme.reason}. I think you should join next time, especially if you enjoy ${theme.skill}. It is friendly, useful and not too difficult.\nBest,\n${theme.person}`,
        rubric: ['About 100 words', 'Answers all notes', 'Friendly register', 'Clear reason and recommendation', 'Paragraphing supports meaning'],
    },
    {
        id: `b1-${setNo}-w-2`,
        skill: 'writing',
        officialPart: 'Part 2 - Article or story',
        title: 'Choose article or story',
        questionCount: 1,
        instructions: 'Choose one task and write about 100 words.',
        questions: [
            writing(
                `b1-${setNo}-w2-1`,
                `Choose one: Article - "Why ${theme.event} helped me learn better"; Story - begin with "I did not expect the day to change my mind."`,
                'The article needs opinion and examples. The story needs sequence, tension and ending.',
                'Extended writing choice',
                'Choose the task you can complete clearly. Do not mix article and story formats.',
            ),
        ],
        sampleAnswer: `Article sample:\nWhy ${theme.event} helped me learn better\nI used to think ${theme.skill} was only about remembering facts. The ${theme.event} changed my view because we had to solve a real problem: ${theme.problem}. When we decided to ${theme.solution}, I saw that ${theme.reason}. I learned more because I had to explain my ideas to other people.`,
        rubric: ['Clear genre', 'About 100 words', 'Logical sequence', 'Range of B1 vocabulary', 'Errors do not block meaning'],
    },
];

const makeB1ListeningTasks = (setNo: number, theme: ExamTheme): CambridgePracticeTask[] => [
    {
        id: `b1-${setNo}-l-1`,
        skill: 'listening',
        officialPart: 'Part 1 - Multiple choice',
        title: 'Seven short texts',
        questionCount: 7,
        instructions: 'Listen and identify key information.',
        transcript: `${theme.person} explains that the ${theme.event} moved to the ${theme.place}. ${theme.friend} says the best part was ${theme.contrast}. A teacher warns that ${theme.problem}, so teams should ${theme.solution}. Another student says confidence improved because ${theme.reason}.`,
        questions: [
            objective(`b1-${setNo}-l1-1`, 'Where will the event happen?', `At the ${theme.place}.`, ['At the bus station.', 'At home.'], 'The first sentence gives the place.', 'Key information', 'Places may be corrected after a change, so listen for moved to.', setNo),
            objective(`b1-${setNo}-l1-2`, 'What did the friend like best?', theme.contrast, [theme.problem, theme.object], `The friend says the best part was ${theme.contrast}.`, 'Opinion detail', 'Best part marks a personal opinion.', setNo + 1),
            objective(`b1-${setNo}-l1-3`, 'What warning does the teacher give?', theme.problem, [theme.solution, theme.reason], 'The warning is the problem stated before so.', 'Warning and advice', 'A warning often comes before so/should.', setNo + 2),
            objective(`b1-${setNo}-l1-4`, 'What should teams do?', theme.solution, [theme.problem, 'stop the project'], `Teams should ${theme.solution}.`, 'Advice', 'Should gives the recommended action.', setNo + 3),
            objective(`b1-${setNo}-l1-5`, 'Why did confidence improve?', theme.reason, [theme.contrast, 'the tickets were cheap'], `Because introduces the reason: ${theme.reason}.`, 'Reason', 'Listen for because clauses.', setNo + 4),
            objective(`b1-${setNo}-l1-6`, `Who is explaining the event?`, theme.person, [theme.friend, 'a tourist'], `The transcript begins with ${theme.person} explains.`, 'Speaker identification', 'Names are anchors in listening.', setNo + 5),
            objective(`b1-${setNo}-l1-7`, 'What is the general topic?', theme.event, [theme.place, 'buying a new phone'], `All details are about the ${theme.event}.`, 'Gist', 'Choose the topic that covers all details, not only one item.', setNo + 6),
        ],
    },
    {
        id: `b1-${setNo}-l-2`,
        skill: 'listening',
        officialPart: 'Part 2 - Multiple choice',
        title: 'Six short dialogues',
        questionCount: 6,
        instructions: 'Listen for the gist of each short dialogue.',
        transcript: `Dialogue 1: The speaker expected a lecture but found a workshop. Dialogue 2: Students changed the plan because ${theme.problem}. Dialogue 3: ${theme.friend} preferred the practical task. Dialogue 4: A parent asked how the project would help study. Dialogue 5: The leader said reflection was as important as action. Dialogue 6: The final advice was to prepare early.`,
        questions: [
            objective(`b1-${setNo}-l2-1`, 'What surprised the first speaker?', 'It was a workshop, not a lecture.', ['It was cancelled.', 'It was online only.'], 'The contrast is lecture versus workshop.', 'Gist and contrast', 'Listen for but/not to catch the turn in meaning.', setNo),
            objective(`b1-${setNo}-l2-2`, 'Why did students change the plan?', theme.problem, [theme.reason, 'the room was beautiful'], `The dialogue says they changed because ${theme.problem}.`, 'Cause', 'Because gives the cause of change.', setNo + 1),
            objective(`b1-${setNo}-l2-3`, `What did ${theme.friend} prefer?`, 'The practical task.', ['The long lecture.', 'The written test.'], 'The friend preferred the practical task.', 'Preference', 'Prefer can be paraphrased as liked better.', setNo + 2),
            objective(`b1-${setNo}-l2-4`, 'What did the parent want to know?', 'How the project would help study.', ['Where to park.', 'Who lost the object.'], 'The parent asks about study benefit.', 'Question purpose', 'Identify what the question is really asking.', setNo + 3),
            objective(`b1-${setNo}-l2-5`, 'What was as important as action?', 'Reflection.', ['Decoration.', 'Shopping.'], 'The leader says reflection was as important as action.', 'Comparing importance', 'As important as signals equal value.', setNo + 4),
            objective(`b1-${setNo}-l2-6`, 'What was the final advice?', 'Prepare early.', ['Speak faster.', 'Avoid questions.'], 'The final advice was to prepare early.', 'Advice', 'Final advice often appears at the end of a dialogue.', setNo + 5),
        ],
    },
    {
        id: `b1-${setNo}-l-3`,
        skill: 'listening',
        officialPart: 'Part 3 - Gap fill',
        title: 'Complete six gaps',
        questionCount: 6,
        instructions: 'Listen to the monologue and write the missing word or phrase.',
        transcript: `Talk notes. Project: ${theme.event}. Place: ${theme.place}. Leader: ${theme.person}. Equipment: ${theme.object}. Main problem: ${theme.problem}. Final lesson: ${theme.reason}.`,
        questions: [
            gap(`b1-${setNo}-l3-1`, 'Project: ___', theme.event, [theme.event.toLowerCase()], `The project is ${theme.event}.`, 'Note completion', 'Use the exact key noun phrase where possible.'),
            gap(`b1-${setNo}-l3-2`, 'Place: ___', theme.place, [theme.place.toLowerCase()], `The place is ${theme.place}.`, 'Place detail', 'Keep spelling simple and clear.'),
            gap(`b1-${setNo}-l3-3`, 'Leader: ___', theme.person, [theme.person.toLowerCase()], `${theme.person} is the leader.`, 'Name detail', 'Names may be capitalised but matching is meaning-based here.'),
            gap(`b1-${setNo}-l3-4`, 'Equipment: ___', theme.object, [theme.object.toLowerCase()], `The equipment is ${theme.object}.`, 'Object detail', 'Listen after equipment/materials.'),
            gap(`b1-${setNo}-l3-5`, 'Main problem: ___', theme.problem, [theme.problem.toLowerCase()], `The main problem is ${theme.problem}.`, 'Problem detail', 'Do not write the solution in the problem gap.'),
            gap(`b1-${setNo}-l3-6`, 'Final lesson: ___', theme.reason, [theme.reason.toLowerCase()], `The final lesson is ${theme.reason}.`, 'Lesson summary', 'For longer answers, capture the core phrase.'),
        ],
    },
    {
        id: `b1-${setNo}-l-4`,
        skill: 'listening',
        officialPart: 'Part 4 - Multiple choice',
        title: 'Interview for detailed meaning',
        questionCount: 6,
        instructions: 'Listen to an interview and choose the correct answer.',
        transcript: `Interviewer: What changed your view of the ${theme.event}? ${theme.person}: I thought it would be simple, but ${theme.problem}. Interviewer: What did you do? ${theme.person}: We decided to ${theme.solution}. It worked because ${theme.reason}. I also learned that ${theme.contrast} can belong together.`,
        questions: [
            objective(`b1-${setNo}-l4-1`, `What changed ${theme.person}'s view?`, theme.problem, [theme.solution, theme.object], 'The problem changed the student\'s view.', 'Interview detail', 'In interviews, questions set up the exact information needed.', setNo),
            objective(`b1-${setNo}-l4-2`, 'What action did the team take?', theme.solution, [theme.problem, 'they ended the interview'], `They decided to ${theme.solution}.`, 'Action detail', 'Decided to signals the chosen action.', setNo + 1),
            objective(`b1-${setNo}-l4-3`, 'Why did the action work?', theme.reason, [theme.contrast, 'it was expensive'], `It worked because ${theme.reason}.`, 'Reasoning', 'Reason clauses often follow worked because.', setNo + 2),
            objective(`b1-${setNo}-l4-4`, 'What did the student learn?', `${theme.contrast} can belong together.`, [theme.problem, 'practice is not useful'], 'The final sentence states the lesson.', 'Meaning and attitude', 'Listen for I learned that.', setNo + 3),
            objective(`b1-${setNo}-l4-5`, 'How does the student sound?', 'Reflective and positive.', ['Angry and dismissive.', 'Confused and silent.'], 'The student explains learning and success.', 'Attitude', 'Positive reflection is shown through worked and learned.', setNo + 4),
            objective(`b1-${setNo}-l4-6`, 'What is the main purpose of the interview?', 'To reflect on a learning project.', ['To advertise a shop.', 'To describe a holiday only.'], 'The interview is about a project, problem, solution and lesson.', 'Global purpose', 'Purpose combines the whole conversation.', setNo + 5),
        ],
    },
];

const makeB1SpeakingTasks = (setNo: number, theme: ExamTheme): CambridgePracticeTask[] => [
    {
        id: `b1-${setNo}-s-1`,
        skill: 'speaking',
        officialPart: 'Part 1 - Interview',
        title: 'Personal information and opinions',
        questionCount: 1,
        instructions: 'Answer personal questions with reasons and examples.',
        questions: [
            speaking(`b1-${setNo}-s1-1`, `Would you rather learn through ${theme.event} or through a normal lesson? Give reasons.`, 'A B1 answer gives an opinion, reason and example.', 'Personal opinion', 'Use because, for example and however to show range.',),
        ],
        sampleAnswer: `I would rather learn through ${theme.event} because ${theme.reason}. For example, I remember ideas better when I use them in a real task. However, a normal lesson is useful before the project starts.`,
        rubric: ['Opinion is clear', 'At least one reason', 'At least one example', 'Some linking words'],
    },
    {
        id: `b1-${setNo}-s-2`,
        skill: 'speaking',
        officialPart: 'Part 2 - Extended turn',
        title: 'Describe a photograph',
        questionCount: 1,
        instructions: 'Describe a photo for about one minute.',
        questions: [
            speaking(`b1-${setNo}-s2-1`, `Photo prompt: students are in the ${theme.place}, using a ${theme.object}, and preparing for ${theme.event}. Describe what you can see and what might happen next.`, 'A strong description covers people, place, action, and prediction.', 'Photo description', 'Use present continuous for what is happening and might for prediction.'),
        ],
        sampleAnswer: `In the picture, some students are working in the ${theme.place}. One student is holding a ${theme.object}, and the others are preparing for ${theme.event}. They look focused. I think they might ${theme.solution} because ${theme.reason}.`,
        rubric: ['Describes visible details', 'Uses present continuous', 'Adds a reasonable prediction', 'Keeps speaking for about one minute'],
    },
    {
        id: `b1-${setNo}-s-3`,
        skill: 'speaking',
        officialPart: 'Part 3 - Discussion',
        title: 'Make and respond to suggestions',
        questionCount: 1,
        instructions: 'Discuss alternatives and reach agreement with a partner.',
        questions: [
            speaking(`b1-${setNo}-s3-1`, `You and a partner must improve the ${theme.event}. Discuss these ideas: better equipment, student stories, a shorter talk, parent help, and more practice time.`, 'The task needs suggestions, responses and agreement.', 'Collaborative discussion', 'Use What about...? I agree because... Maybe we should...'),
        ],
        sampleAnswer: `What about using better equipment? That would help, but I think student stories are more memorable. We should also make the talk shorter because ${theme.reason}. Shall we choose student stories and more practice time?`,
        rubric: ['Makes suggestions', 'Responds to partner', 'Compares options', 'Reaches an agreement'],
    },
    {
        id: `b1-${setNo}-s-4`,
        skill: 'speaking',
        officialPart: 'Part 4 - General conversation',
        title: 'Discuss opinions and experience',
        questionCount: 1,
        instructions: 'Discuss broader questions connected to the topic.',
        questions: [
            speaking(`b1-${setNo}-s4-1`, `Do students learn more from mistakes or from success? Use the ${theme.event} as an example.`, 'A B1 discussion answer gives a balanced opinion and connects it to experience.', 'Extended opinion', 'Show balance with on the one hand / on the other hand, but keep it natural.'),
        ],
        sampleAnswer: `I think students learn from both. Success gives confidence, but mistakes show what we need to improve. In the ${theme.event}, ${theme.problem}, but when we decided to ${theme.solution}, we learned that ${theme.reason}.`,
        rubric: ['Balanced opinion', 'Topic example', 'Clear reason', 'Natural interaction'],
    },
];

const makeA2Set = (theme: ExamTheme, index: number): CambridgePracticeSet => {
    const setNo = index + 1;

    return {
        id: `a2-key-set-${setNo}`,
        programId: 'a2-key',
        setNo,
        title: `KET Practice Set ${setNo}: ${theme.title}`,
        titleVi: `Bộ đề KET ${setNo}: ${theme.title}`,
        theme: theme.title,
        sourceBoundary:
            'Original Henry practice test. It follows the official A2 Key/KET component and question counts, but it is not an official Cambridge paper and does not copy official test content.',
        timePlan: ['Reading and Writing: 60 minutes', 'Listening: about 30 minutes', 'Speaking: 8-10 minutes per pair', 'Review mistakes: 20 minutes'],
        experienceNotes: [
            'A2 learners should first secure instruction words, times, places and reasons before trying harder vocabulary.',
            'For writing, short correct sentences usually score better than long unclear sentences.',
            'For listening, read the question first and predict the type of answer: person, place, object, time or reason.',
        ],
        components: [
            { skill: 'reading-writing', label: 'Reading and Writing', duration: '1 hour', weight: '50%', tasks: makeA2ReadingWritingTasks(setNo, theme) },
            { skill: 'listening', label: 'Listening', duration: '30 minutes', weight: '25%', tasks: makeA2ListeningTasks(setNo, theme) },
            { skill: 'speaking', label: 'Speaking', duration: '8-10 minutes per pair', weight: '25%', tasks: makeA2SpeakingTasks(setNo, theme) },
        ],
    };
};

const makeB1Set = (theme: ExamTheme, index: number): CambridgePracticeSet => {
    const setNo = index + 1;

    return {
        id: `b1-preliminary-set-${setNo}`,
        programId: 'b1-preliminary',
        setNo,
        title: `PET Practice Set ${setNo}: ${theme.title}`,
        titleVi: `Bộ đề PET ${setNo}: ${theme.title}`,
        theme: theme.title,
        sourceBoundary:
            'Original Henry practice test. It follows the official B1 Preliminary/PET component and question counts, but it is not an official Cambridge paper and does not copy official test content.',
        timePlan: ['Reading: 45 minutes', 'Writing: 45 minutes', 'Listening: about 30 minutes', 'Speaking: 10-12 minutes per pair', 'Error review: 30 minutes'],
        experienceNotes: [
            'B1 success depends on paraphrase recognition: the correct answer often says the same idea in different words.',
            'For writing, content coverage and organisation matter as much as vocabulary range.',
            'For speaking, respond to your partner and extend ideas with reasons, examples and gentle contrast.',
        ],
        components: [
            { skill: 'reading', label: 'Reading', duration: '45 minutes', weight: '25%', tasks: makeB1ReadingTasks(setNo, theme) },
            { skill: 'writing', label: 'Writing', duration: '45 minutes', weight: '25%', tasks: makeB1WritingTasks(setNo, theme) },
            { skill: 'listening', label: 'Listening', duration: '30 minutes', weight: '25%', tasks: makeB1ListeningTasks(setNo, theme) },
            { skill: 'speaking', label: 'Speaking', duration: '10-12 minutes per pair', weight: '25%', tasks: makeB1SpeakingTasks(setNo, theme) },
        ],
    };
};

export const CAMBRIDGE_PRACTICE_SETS: CambridgePracticeSet[] = [
    ...A2_THEMES.map(makeA2Set),
    ...B1_THEMES.map(makeB1Set),
];

export const getPracticeSetsForProgram = (programId: CambridgeExamProgramId) =>
    CAMBRIDGE_PRACTICE_SETS.filter(set => set.programId === programId);

export const getCambridgeProgram = (programId: CambridgeExamProgramId) =>
    CAMBRIDGE_EXAM_PROGRAMS.find(program => program.id === programId) ?? CAMBRIDGE_EXAM_PROGRAMS[0];

export const getObjectiveQuestions = (practiceSet: CambridgePracticeSet) =>
    practiceSet.components.flatMap(component =>
        component.tasks.flatMap(task =>
            task.questions.filter(question => question.correctAnswer && ['objective', 'gap'].includes(question.mode)),
        ),
    );

export const getAllPracticeQuestions = (practiceSet: CambridgePracticeSet) =>
    practiceSet.components.flatMap(component => component.tasks.flatMap(task => task.questions));

export const normaliseExamAnswer = (value: string) =>
    value.trim().toLowerCase().replace(/\s+/g, ' ');

export const isCorrectExamAnswer = (question: CambridgePracticeQuestion, value: string) => {
    const accepted = question.acceptableAnswers ?? (question.correctAnswer ? [question.correctAnswer] : []);
    const cleanValue = normaliseExamAnswer(value);

    return accepted.some(answer => normaliseExamAnswer(answer) === cleanValue);
};

const a2Sets = getPracticeSetsForProgram('a2-key');
const b1Sets = getPracticeSetsForProgram('b1-preliminary');

export const CAMBRIDGE_EXAM_PREP_STATS = {
    programCount: CAMBRIDGE_EXAM_PROGRAMS.length,
    officialSourceCount: CAMBRIDGE_OFFICIAL_SOURCES.length,
    a2PracticeSetCount: a2Sets.length,
    b1PracticeSetCount: b1Sets.length,
    totalPracticeSetCount: CAMBRIDGE_PRACTICE_SETS.length,
    a2ObjectiveQuestionCountPerSet: getObjectiveQuestions(a2Sets[0]).length,
    b1ObjectiveQuestionCountPerSet: getObjectiveQuestions(b1Sets[0]).length,
    copyrightPolicy:
        'Format-aligned original practice only. Official Cambridge sample papers and answer keys are linked for authorised study, not copied into the app.',
};
