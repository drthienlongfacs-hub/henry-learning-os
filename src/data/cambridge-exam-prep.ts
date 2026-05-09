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

export interface ExamPart {
  skill: 'listening' | 'reading_writing' | 'speaking';
  skillVi: string;
  duration: string;
  parts: number;
  description: string;
  descriptionVi: string;
  taskTypes: string[];
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
        skill: 'listening',
        skillVi: 'Nghe',
        duration: '~20 phút',
        parts: 4,
        description: 'Draw lines matching names to people, write names/numbers, tick boxes, colour objects',
        descriptionVi: 'Nối tên với người, viết tên/số, đánh dấu ô, tô màu đồ vật',
        taskTypes: ['matching', 'gap-fill', 'tick-box', 'colouring'],
      },
      {
        skill: 'reading_writing',
        skillVi: 'Đọc & Viết',
        duration: '20 phút',
        parts: 5,
        description: 'Match words to pictures, spell words, answer yes/no, complete sentences',
        descriptionVi: 'Nối từ với tranh, đánh vần, trả lời có/không, hoàn thành câu',
        taskTypes: ['true-false', 'matching', 'spell-word', 'gap-fill', 'picture-story'],
      },
      {
        skill: 'speaking',
        skillVi: 'Nói',
        duration: '3-5 phút',
        parts: 4,
        description: 'Point to objects, answer questions about a scene, answer personal questions',
        descriptionVi: 'Chỉ đồ vật, trả lời câu hỏi về tranh, trả lời câu hỏi cá nhân',
        taskTypes: ['point-and-show', 'describe-picture', 'personal-questions', 'object-card'],
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
        skill: 'listening', skillVi: 'Nghe', duration: '~25 phút', parts: 5,
        description: 'Match names to descriptions, write words/numbers, match pictures to days, colour and write',
        descriptionVi: 'Nối tên với mô tả, viết từ/số, nối tranh với ngày, tô màu và viết',
        taskTypes: ['matching', 'gap-fill', 'multiple-choice', 'colouring-writing'],
      },
      {
        skill: 'reading_writing', skillVi: 'Đọc & Viết', duration: '30 phút', parts: 6,
        description: 'Match definitions, choose correct word, gap-fill conversation, read story and answer',
        descriptionVi: 'Nối định nghĩa, chọn từ đúng, điền hội thoại, đọc truyện trả lời',
        taskTypes: ['definition-match', 'true-false', 'gap-fill', 'multiple-choice', 'open-answer', 'story-writing'],
      },
      {
        skill: 'speaking', skillVi: 'Nói', duration: '5-7 phút', parts: 4,
        description: 'Find differences between pictures, tell a picture story, answer odd-one-out, personal questions',
        descriptionVi: 'Tìm khác biệt giữa tranh, kể truyện tranh, trả lời loại trừ, câu hỏi cá nhân',
        taskTypes: ['find-differences', 'picture-story', 'odd-one-out', 'personal-questions'],
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
        skill: 'listening', skillVi: 'Nghe', duration: '~25 phút', parts: 5,
        description: 'Match, write, multiple choice — more complex scenarios and longer recordings',
        descriptionVi: 'Nối, viết, trắc nghiệm — tình huống phức tạp hơn, bài nghe dài hơn',
        taskTypes: ['matching', 'gap-fill', 'multiple-choice', 'colouring-writing', 'map-matching'],
      },
      {
        skill: 'reading_writing', skillVi: 'Đọc & Viết', duration: '40 phút', parts: 7,
        description: 'Definitions, grammar choice, conversation, factual text, story writing with picture prompts',
        descriptionVi: 'Định nghĩa, ngữ pháp, hội thoại, văn bản thực tế, viết truyện theo tranh',
        taskTypes: ['definition-match', 'grammar-choice', 'gap-fill', 'factual-text', 'story-completion', 'open-writing'],
      },
      {
        skill: 'speaking', skillVi: 'Nói', duration: '7-9 phút', parts: 4,
        description: 'Tell story from pictures, describe and compare, answer extended personal questions',
        descriptionVi: 'Kể truyện theo tranh, mô tả và so sánh, trả lời câu hỏi cá nhân mở rộng',
        taskTypes: ['picture-story', 'describe-compare', 'personal-extended', 'information-exchange'],
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
