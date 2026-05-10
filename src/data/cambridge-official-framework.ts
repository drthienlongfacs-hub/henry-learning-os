export type CambridgeExamLevelId = 'starters' | 'movers' | 'flyers' | 'ket' | 'pet';
export type CambridgeExamSkill = 'listening' | 'reading_writing' | 'reading' | 'writing' | 'speaking';
export type CambridgeTaskMode = 'objective' | 'gap' | 'writing' | 'speaking';

export interface CambridgeOfficialSource {
  id: string;
  title: string;
  url: string;
  provider: 'Cambridge English' | 'Cambridge English Support';
  verifiedAt: string;
  useInApp: string;
}

export interface CambridgeOfficialPartSpec {
  partNumber: number;
  titleEn: string;
  titleVi: string;
  questionCount: number;
  mode: CambridgeTaskMode;
  taskFocusVi: string;
}

export interface CambridgeOfficialComponentSpec {
  key: string;
  skill: CambridgeExamSkill;
  labelEn: string;
  labelVi: string;
  duration: string;
  parts: number;
  questions: number;
  weight: string;
  partSpecs: CambridgeOfficialPartSpec[];
}

export interface CambridgeOfficialExamSpec {
  id: CambridgeExamLevelId;
  officialName: string;
  displayName: string;
  cefr: string;
  family: 'Young Learners' | 'A2 Key' | 'B1 Preliminary';
  ageRange: string;
  sourceIds: string[];
  officialSampleUrl: string;
  formatStatus2026: string;
  components: CambridgeOfficialComponentSpec[];
  sourceBoundary: string;
}

export const CAMBRIDGE_OFFICIAL_SOURCES: CambridgeOfficialSource[] = [
  {
    id: 'cambridge-starters-format',
    title: 'Pre A1 Starters exam format',
    url: 'https://www.cambridgeenglish.org/exams-and-tests/qualifications/young-learners/paper/starters/format/',
    provider: 'Cambridge English',
    verifiedAt: '2026-05-09',
    useInApp: 'Authoritative structure for Starters Listening, Reading and Writing, and Speaking parts.',
  },
  {
    id: 'cambridge-movers-format',
    title: 'A1 Movers exam format',
    url: 'https://www.cambridgeenglish.org/exams-and-tests/qualifications/young-learners/paper/movers/format/',
    provider: 'Cambridge English',
    verifiedAt: '2026-05-09',
    useInApp: 'Authoritative structure for Movers component timing, part count, and question count.',
  },
  {
    id: 'cambridge-flyers-format',
    title: 'A2 Flyers exam format',
    url: 'https://www.cambridgeenglish.org/exams-and-tests/qualifications/young-learners/paper/flyers/format/',
    provider: 'Cambridge English',
    verifiedAt: '2026-05-09',
    useInApp: 'Authoritative structure for Flyers component timing, part count, and question count.',
  },
  {
    id: 'cambridge-a2-key-format',
    title: 'A2 Key for Schools and A2 Key exam format',
    url: 'https://www.cambridgeenglish.org/exams-and-tests/qualifications/key/format/',
    provider: 'Cambridge English',
    verifiedAt: '2026-05-09',
    useInApp: 'Authoritative structure for A2 Key Reading and Writing, Listening, and Speaking.',
  },
  {
    id: 'cambridge-b1-preliminary-format',
    title: 'B1 Preliminary for Schools and B1 Preliminary exam format',
    url: 'https://www.cambridgeenglish.org/exams-and-tests/qualifications/preliminary/format/',
    provider: 'Cambridge English',
    verifiedAt: '2026-05-09',
    useInApp: 'Authoritative structure for B1 Preliminary Reading, Writing, Listening, and Speaking.',
  },
  {
    id: 'cambridge-candidate-regulations-2026',
    title: 'Summary Regulations for Candidates - updated April 2026',
    url: 'https://support.cambridgeenglish.org/hc/en-gb/articles/202842836-Summary-Regulations-for-Candidates',
    provider: 'Cambridge English Support',
    verifiedAt: '2026-05-09',
    useInApp: 'Copyright and exam-material boundary: official papers are linked, not copied into Henry Learning OS.',
  },
];

const rw = 'Reading & Writing';

export const CAMBRIDGE_EXAM_SPECS: Record<CambridgeExamLevelId, CambridgeOfficialExamSpec> = {
  starters: {
    id: 'starters',
    officialName: 'Pre A1 Starters',
    displayName: 'Starters',
    cefr: 'Pre-A1',
    family: 'Young Learners',
    ageRange: '6-8',
    sourceIds: ['cambridge-starters-format', 'cambridge-candidate-regulations-2026'],
    officialSampleUrl: 'https://www.cambridgeenglish.org/exams-and-tests/starters/preparation/',
    formatStatus2026: 'Current Cambridge Young Learners paper format verified on 2026-05-09.',
    sourceBoundary: 'Henry practice packs are original family-use practice items aligned to the official format. They are not official Cambridge papers and do not copy official test content.',
    components: [
      {
        key: 'starters-listening',
        skill: 'listening',
        labelEn: 'Listening',
        labelVi: 'Nghe',
        duration: 'about 20 minutes',
        parts: 4,
        questions: 20,
        weight: 'up to 5 shields',
        partSpecs: [
          { partNumber: 1, titleEn: 'Draw lines', titleVi: 'Nối tên với người trong tranh', questionCount: 5, mode: 'objective', taskFocusVi: 'Nghe tên và mô tả người' },
          { partNumber: 2, titleEn: 'Write names or numbers', titleVi: 'Viết tên hoặc số', questionCount: 5, mode: 'gap', taskFocusVi: 'Nghe số, tên riêng và đánh vần' },
          { partNumber: 3, titleEn: 'Picture multiple choice', titleVi: 'Chọn tranh đúng', questionCount: 5, mode: 'objective', taskFocusVi: 'Nghe thông tin cụ thể trong hội thoại ngắn' },
          { partNumber: 4, titleEn: 'Colouring', titleVi: 'Tô màu theo chỉ dẫn', questionCount: 5, mode: 'objective', taskFocusVi: 'Nghe màu sắc, vị trí và đồ vật' },
        ],
      },
      {
        key: 'starters-reading-writing',
        skill: 'reading_writing',
        labelEn: rw,
        labelVi: 'Đọc & Viết',
        duration: 'about 20 minutes',
        parts: 5,
        questions: 25,
        weight: 'up to 5 shields',
        partSpecs: [
          { partNumber: 1, titleEn: 'True/false words and pictures', titleVi: 'Đúng/sai với tranh và từ', questionCount: 5, mode: 'objective', taskFocusVi: 'Nhận diện từ đơn theo tranh' },
          { partNumber: 2, titleEn: 'Yes/no picture sentences', titleVi: 'Yes/No theo tranh lớn', questionCount: 5, mode: 'objective', taskFocusVi: 'Đọc câu đơn và kiểm tra chi tiết tranh' },
          { partNumber: 3, titleEn: 'Jumbled letters', titleVi: 'Sắp chữ thành từ', questionCount: 5, mode: 'gap', taskFocusVi: 'Đánh vần từ đơn' },
          { partNumber: 4, titleEn: 'Word-box gap fill', titleVi: 'Điền từ từ hộp từ', questionCount: 5, mode: 'objective', taskFocusVi: 'Đọc đoạn ngắn và chọn danh từ phù hợp' },
          { partNumber: 5, titleEn: 'One-word picture story answers', titleVi: 'Trả lời một từ theo truyện tranh', questionCount: 5, mode: 'gap', taskFocusVi: 'Đọc câu hỏi và viết một từ đúng' },
        ],
      },
      {
        key: 'starters-speaking',
        skill: 'speaking',
        labelEn: 'Speaking',
        labelVi: 'Nói',
        duration: '3-5 minutes',
        parts: 4,
        questions: 4,
        weight: 'up to 5 shields',
        partSpecs: [
          { partNumber: 1, titleEn: 'Point and place cards', titleVi: 'Chỉ và đặt thẻ theo hướng dẫn', questionCount: 1, mode: 'speaking', taskFocusVi: 'Hiểu chỉ dẫn nói' },
          { partNumber: 2, titleEn: 'Picture questions', titleVi: 'Trả lời câu hỏi về tranh', questionCount: 1, mode: 'speaking', taskFocusVi: 'Mô tả đồ vật, màu sắc, vị trí' },
          { partNumber: 3, titleEn: 'Object cards', titleVi: 'Hỏi đáp theo thẻ đồ vật', questionCount: 1, mode: 'speaking', taskFocusVi: 'Từ vựng đơn và câu ngắn' },
          { partNumber: 4, titleEn: 'Personal questions', titleVi: 'Câu hỏi cá nhân', questionCount: 1, mode: 'speaking', taskFocusVi: 'Tự giới thiệu tự nhiên' },
        ],
      },
    ],
  },
  movers: {
    id: 'movers',
    officialName: 'A1 Movers',
    displayName: 'Movers',
    cefr: 'A1',
    family: 'Young Learners',
    ageRange: '8-10',
    sourceIds: ['cambridge-movers-format', 'cambridge-candidate-regulations-2026'],
    officialSampleUrl: 'https://www.cambridgeenglish.org/exams-and-tests/movers/preparation/',
    formatStatus2026: 'Current Cambridge Young Learners paper format verified on 2026-05-09.',
    sourceBoundary: 'Henry practice packs are original family-use practice items aligned to the official format. They are not official Cambridge papers and do not copy official test content.',
    components: [
      {
        key: 'movers-listening',
        skill: 'listening',
        labelEn: 'Listening',
        labelVi: 'Nghe',
        duration: 'about 25 minutes',
        parts: 5,
        questions: 25,
        weight: 'up to 5 shields',
        partSpecs: [
          { partNumber: 1, titleEn: 'Draw lines', titleVi: 'Nối tên với người', questionCount: 5, mode: 'objective', taskFocusVi: 'Nghe mô tả người trong tranh' },
          { partNumber: 2, titleEn: 'Write words or numbers', titleVi: 'Viết từ hoặc số', questionCount: 5, mode: 'gap', taskFocusVi: 'Nghe biểu mẫu, số, tên, địa điểm' },
          { partNumber: 3, titleEn: 'Match pictures', titleVi: 'Nối hai nhóm tranh', questionCount: 5, mode: 'objective', taskFocusVi: 'Nghe lựa chọn đúng trong nhiều lựa chọn' },
          { partNumber: 4, titleEn: 'Picture multiple choice', titleVi: 'Chọn tranh đúng', questionCount: 5, mode: 'objective', taskFocusVi: 'Nghe thông tin cụ thể' },
          { partNumber: 5, titleEn: 'Colour and write', titleVi: 'Tô màu và viết', questionCount: 5, mode: 'objective', taskFocusVi: 'Nghe màu sắc, vị trí, đồ vật' },
        ],
      },
      {
        key: 'movers-reading-writing',
        skill: 'reading_writing',
        labelEn: rw,
        labelVi: 'Đọc & Viết',
        duration: '30 minutes',
        parts: 6,
        questions: 35,
        weight: 'up to 5 shields',
        partSpecs: [
          { partNumber: 1, titleEn: 'Definitions', titleVi: 'Nối định nghĩa với từ', questionCount: 6, mode: 'objective', taskFocusVi: 'Từ vựng qua định nghĩa' },
          { partNumber: 2, titleEn: 'Picture yes/no', titleVi: 'Yes/No theo tranh', questionCount: 6, mode: 'objective', taskFocusVi: 'Đọc hiểu câu về tranh' },
          { partNumber: 3, titleEn: 'Conversation gap fill', titleVi: 'Hoàn thành hội thoại', questionCount: 6, mode: 'objective', taskFocusVi: 'Chọn câu trả lời phù hợp' },
          { partNumber: 4, titleEn: 'Text gap fill', titleVi: 'Điền đoạn văn', questionCount: 6, mode: 'objective', taskFocusVi: 'Đọc đoạn văn và chọn từ đúng' },
          { partNumber: 5, titleEn: 'Story completion', titleVi: 'Hoàn thành câu theo truyện', questionCount: 7, mode: 'gap', taskFocusVi: 'Viết 1-3 từ dựa trên bài đọc' },
          { partNumber: 6, titleEn: 'Complete the text', titleVi: 'Hoàn thành đoạn văn', questionCount: 4, mode: 'gap', taskFocusVi: 'Đọc đoạn văn về tranh, chọn và viết từ đúng vào chỗ trống' },
        ],
      },
      {
        key: 'movers-speaking',
        skill: 'speaking',
        labelEn: 'Speaking',
        labelVi: 'Nói',
        duration: '5-7 minutes',
        parts: 4,
        questions: 4,
        weight: 'up to 5 shields',
        partSpecs: [
          { partNumber: 1, titleEn: 'Find differences', titleVi: 'Tìm khác biệt', questionCount: 1, mode: 'speaking', taskFocusVi: 'Mô tả khác biệt giữa hai tranh' },
          { partNumber: 2, titleEn: 'Picture story', titleVi: 'Kể truyện tranh', questionCount: 1, mode: 'speaking', taskFocusVi: 'Kể chuyện theo chuỗi tranh' },
          { partNumber: 3, titleEn: 'Odd one out', titleVi: 'Chọn hình khác loại', questionCount: 1, mode: 'speaking', taskFocusVi: 'Giải thích lý do đơn giản' },
          { partNumber: 4, titleEn: 'Personal questions', titleVi: 'Câu hỏi cá nhân', questionCount: 1, mode: 'speaking', taskFocusVi: 'Trả lời tự nhiên, thêm lý do' },
        ],
      },
    ],
  },
  flyers: {
    id: 'flyers',
    officialName: 'A2 Flyers',
    displayName: 'Flyers',
    cefr: 'A2',
    family: 'Young Learners',
    ageRange: '9-12',
    sourceIds: ['cambridge-flyers-format', 'cambridge-candidate-regulations-2026'],
    officialSampleUrl: 'https://www.cambridgeenglish.org/exams-and-tests/flyers/preparation/',
    formatStatus2026: 'Current Cambridge Young Learners paper format verified on 2026-05-09.',
    sourceBoundary: 'Henry practice packs are original family-use practice items aligned to the official format. They are not official Cambridge papers and do not copy official test content.',
    components: [
      {
        key: 'flyers-listening',
        skill: 'listening',
        labelEn: 'Listening',
        labelVi: 'Nghe',
        duration: 'about 25 minutes',
        parts: 5,
        questions: 25,
        weight: 'up to 5 shields',
        partSpecs: [
          { partNumber: 1, titleEn: 'Draw lines', titleVi: 'Nối tên với người', questionCount: 5, mode: 'objective', taskFocusVi: 'Nghe mô tả trong tranh lớn' },
          { partNumber: 2, titleEn: 'Write words or numbers', titleVi: 'Viết từ hoặc số', questionCount: 5, mode: 'gap', taskFocusVi: 'Nghe ghi chú chi tiết' },
          { partNumber: 3, titleEn: 'Match pictures', titleVi: 'Nối thông tin với tranh', questionCount: 5, mode: 'objective', taskFocusVi: 'Nghe lựa chọn và loại trừ' },
          { partNumber: 4, titleEn: 'Picture multiple choice', titleVi: 'Chọn tranh đúng', questionCount: 5, mode: 'objective', taskFocusVi: 'Nghe hội thoại ngắn' },
          { partNumber: 5, titleEn: 'Colour and write', titleVi: 'Tô màu và viết', questionCount: 5, mode: 'objective', taskFocusVi: 'Nghe vị trí và chi tiết nâng cao' },
        ],
      },
      {
        key: 'flyers-reading-writing',
        skill: 'reading_writing',
        labelEn: rw,
        labelVi: 'Đọc & Viết',
        duration: '40 minutes',
        parts: 7,
        questions: 44,
        weight: 'up to 5 shields',
        partSpecs: [
          { partNumber: 1, titleEn: 'Definitions', titleVi: 'Định nghĩa từ vựng', questionCount: 10, mode: 'objective', taskFocusVi: 'Từ vựng nâng cao qua định nghĩa' },
          { partNumber: 2, titleEn: 'Dialogue completion', titleVi: 'Hoàn thành hội thoại (chọn A-H)', questionCount: 7, mode: 'objective', taskFocusVi: 'Đọc đoạn hội thoại, chọn phản hồi phù hợp từ danh sách A-H' },
          { partNumber: 3, titleEn: 'Word-bank gap fill', titleVi: 'Điền từ từ hộp từ', questionCount: 5, mode: 'objective', taskFocusVi: 'Chọn từ đúng từ hộp từ để điền vào đoạn văn thông tin' },
          { partNumber: 4, titleEn: 'MC grammar cloze', titleVi: 'Trắc nghiệm ngữ pháp', questionCount: 6, mode: 'objective', taskFocusVi: 'Chọn A/B/C dạng ngữ pháp đúng để hoàn thành đoạn văn' },
          { partNumber: 5, titleEn: 'Story comprehension', titleVi: 'Hoàn thành câu theo truyện', questionCount: 7, mode: 'gap', taskFocusVi: 'Viết 1-4 từ dựa vào bài đọc' },
          { partNumber: 6, titleEn: 'Open gap fill', titleVi: 'Điền từ tự do', questionCount: 5, mode: 'gap', taskFocusVi: 'Ngữ pháp chức năng không có hộp từ' },
          { partNumber: 7, titleEn: 'Picture story writing', titleVi: 'Viết truyện theo tranh', questionCount: 4, mode: 'writing', taskFocusVi: 'Viết truyện ngắn mạch lạc' },
        ],
      },
      {
        key: 'flyers-speaking',
        skill: 'speaking',
        labelEn: 'Speaking',
        labelVi: 'Nói',
        duration: '7-9 minutes',
        parts: 4,
        questions: 4,
        weight: 'up to 5 shields',
        partSpecs: [
          { partNumber: 1, titleEn: 'Find differences', titleVi: 'Tìm khác biệt', questionCount: 1, mode: 'speaking', taskFocusVi: 'So sánh tranh có hệ thống' },
          { partNumber: 2, titleEn: 'Information exchange', titleVi: 'Trao đổi thông tin', questionCount: 1, mode: 'speaking', taskFocusVi: 'Đặt và trả lời câu hỏi để lấy thông tin' },
          { partNumber: 3, titleEn: 'Picture story', titleVi: 'Kể truyện tranh', questionCount: 1, mode: 'speaking', taskFocusVi: 'Kể chuyện với liên từ và thì quá khứ' },
          { partNumber: 4, titleEn: 'Personal questions', titleVi: 'Câu hỏi cá nhân mở rộng', questionCount: 1, mode: 'speaking', taskFocusVi: 'Trả lời dài hơn, thêm lý do và ví dụ' },
        ],
      },
    ],
  },
  ket: {
    id: 'ket',
    officialName: 'A2 Key for Schools / A2 Key',
    displayName: 'KET / A2 Key',
    cefr: 'A2',
    family: 'A2 Key',
    ageRange: '11-14',
    sourceIds: ['cambridge-a2-key-format', 'cambridge-candidate-regulations-2026'],
    officialSampleUrl: 'https://www.cambridgeenglish.org/exams-and-tests/key-for-schools/preparation/',
    formatStatus2026: 'A2 Key paper-based exam is withdrawn after the last session in June 2026; A2 Key digital remains. A2 Key for Schools remains paper-based and digital.',
    sourceBoundary: 'Henry practice packs are original family-use practice items aligned to the official format. They are not official Cambridge papers and do not copy official test content.',
    components: [
      {
        key: 'ket-reading-writing',
        skill: 'reading_writing',
        labelEn: rw,
        labelVi: 'Đọc & Viết',
        duration: '1 hour',
        parts: 7,
        questions: 32,
        weight: '50%',
        partSpecs: [
          { partNumber: 1, titleEn: 'Multiple choice short texts', titleVi: 'Chọn đáp án cho văn bản ngắn', questionCount: 6, mode: 'objective', taskFocusVi: 'Ý chính trong thông báo/tin nhắn' },
          { partNumber: 2, titleEn: 'Multiple matching', titleVi: 'Nối câu hỏi với đoạn văn', questionCount: 7, mode: 'objective', taskFocusVi: 'Tìm thông tin phù hợp trong nhiều đoạn' },
          { partNumber: 3, titleEn: 'Multiple choice long text', titleVi: 'Đọc văn bản dài và chọn đáp án', questionCount: 5, mode: 'objective', taskFocusVi: 'Hiểu ý chính và chi tiết' },
          { partNumber: 4, titleEn: 'Multiple-choice cloze', titleVi: 'Điền từ trắc nghiệm', questionCount: 6, mode: 'objective', taskFocusVi: 'Từ vựng trong ngữ cảnh' },
          { partNumber: 5, titleEn: 'Open cloze', titleVi: 'Điền một từ', questionCount: 6, mode: 'gap', taskFocusVi: 'Ngữ pháp chức năng trong email' },
          { partNumber: 6, titleEn: 'Guided writing', titleVi: 'Viết email/ghi chú ngắn', questionCount: 1, mode: 'writing', taskFocusVi: 'Viết ít nhất 25 từ' },
          { partNumber: 7, titleEn: 'Picture story', titleVi: 'Viết truyện theo 3 tranh', questionCount: 1, mode: 'writing', taskFocusVi: 'Viết ít nhất 35 từ theo tranh' },
        ],
      },
      {
        key: 'ket-listening',
        skill: 'listening',
        labelEn: 'Listening',
        labelVi: 'Nghe',
        duration: '30 minutes including transfer time',
        parts: 5,
        questions: 25,
        weight: '25%',
        partSpecs: [
          { partNumber: 1, titleEn: 'Multiple choice visuals', titleVi: 'Nghe chọn tranh', questionCount: 5, mode: 'objective', taskFocusVi: 'Thông tin chính trong hội thoại ngắn' },
          { partNumber: 2, titleEn: 'Gap fill notes', titleVi: 'Điền ghi chú', questionCount: 5, mode: 'gap', taskFocusVi: 'Nghe độc thoại và ghi thông tin' },
          { partNumber: 3, titleEn: 'Dialogue multiple choice', titleVi: 'Hội thoại trắc nghiệm', questionCount: 5, mode: 'objective', taskFocusVi: 'Nghe chi tiết và ý chính' },
          { partNumber: 4, titleEn: 'Multiple choice', titleVi: 'Trắc nghiệm hội thoại ngắn', questionCount: 5, mode: 'objective', taskFocusVi: 'Nghe thái độ/lý do đơn giản' },
          { partNumber: 5, titleEn: 'Matching', titleVi: 'Nối thông tin', questionCount: 5, mode: 'objective', taskFocusVi: 'Nghe và nối người với hoạt động/đồ vật' },
        ],
      },
      {
        key: 'ket-speaking',
        skill: 'speaking',
        labelEn: 'Speaking',
        labelVi: 'Nói',
        duration: '8-10 minutes per pair',
        parts: 2,
        questions: 2,
        weight: '25%',
        partSpecs: [
          { partNumber: 1, titleEn: 'Interview', titleVi: 'Phỏng vấn cá nhân', questionCount: 1, mode: 'speaking', taskFocusVi: 'Thông tin cá nhân, sở thích, thói quen' },
          { partNumber: 2, titleEn: 'Discussion', titleVi: 'Thảo luận theo chủ đề', questionCount: 1, mode: 'speaking', taskFocusVi: 'Hỏi và trả lời câu hỏi đơn giản với bạn thi' },
        ],
      },
    ],
  },
  pet: {
    id: 'pet',
    officialName: 'B1 Preliminary for Schools / B1 Preliminary',
    displayName: 'PET / B1 Preliminary',
    cefr: 'B1',
    family: 'B1 Preliminary',
    ageRange: '12-16',
    sourceIds: ['cambridge-b1-preliminary-format', 'cambridge-candidate-regulations-2026'],
    officialSampleUrl: 'https://www.cambridgeenglish.org/exams-and-tests/preliminary-for-schools/preparation/',
    formatStatus2026: 'Current B1 Preliminary and B1 Preliminary for Schools format verified on 2026-05-09.',
    sourceBoundary: 'Henry practice packs are original family-use practice items aligned to the official format. They are not official Cambridge papers and do not copy official test content.',
    components: [
      {
        key: 'pet-reading',
        skill: 'reading',
        labelEn: 'Reading',
        labelVi: 'Đọc',
        duration: '45 minutes',
        parts: 6,
        questions: 32,
        weight: '25%',
        partSpecs: [
          { partNumber: 1, titleEn: 'Short texts multiple choice', titleVi: 'Văn bản ngắn trắc nghiệm', questionCount: 5, mode: 'objective', taskFocusVi: 'Ý chính trong thông báo/tin nhắn' },
          { partNumber: 2, titleEn: 'Matching', titleVi: 'Nối người với văn bản', questionCount: 5, mode: 'objective', taskFocusVi: 'Tìm văn bản phù hợp nhu cầu' },
          { partNumber: 3, titleEn: 'Multiple choice long text', titleVi: 'Đọc văn bản dài chọn đáp án', questionCount: 5, mode: 'objective', taskFocusVi: 'Hiểu ý chính, chi tiết, thái độ' },
          { partNumber: 4, titleEn: 'Gapped text', titleVi: 'Điền câu vào đoạn văn', questionCount: 5, mode: 'objective', taskFocusVi: 'Liên kết mạch văn' },
          { partNumber: 5, titleEn: 'Multiple-choice cloze', titleVi: 'Điền từ trắc nghiệm', questionCount: 6, mode: 'objective', taskFocusVi: 'Từ vựng và ngữ pháp' },
          { partNumber: 6, titleEn: 'Open cloze', titleVi: 'Điền một từ', questionCount: 6, mode: 'gap', taskFocusVi: 'Ngữ pháp chức năng' },
        ],
      },
      {
        key: 'pet-writing',
        skill: 'writing',
        labelEn: 'Writing',
        labelVi: 'Viết',
        duration: '45 minutes',
        parts: 2,
        questions: 2,
        weight: '25%',
        partSpecs: [
          { partNumber: 1, titleEn: 'Email', titleVi: 'Viết email khoảng 100 từ', questionCount: 1, mode: 'writing', taskFocusVi: 'Trả lời email và ghi chú cho sẵn' },
          { partNumber: 2, titleEn: 'Article or story', titleVi: 'Chọn viết bài báo hoặc truyện', questionCount: 1, mode: 'writing', taskFocusVi: 'Viết khoảng 100 từ theo đề chọn' },
        ],
      },
      {
        key: 'pet-listening',
        skill: 'listening',
        labelEn: 'Listening',
        labelVi: 'Nghe',
        duration: '30 minutes',
        parts: 4,
        questions: 25,
        weight: '25%',
        partSpecs: [
          { partNumber: 1, titleEn: 'Multiple choice visuals', titleVi: 'Chọn tranh đúng', questionCount: 7, mode: 'objective', taskFocusVi: 'Nghe thông tin chính trong đoạn ngắn' },
          { partNumber: 2, titleEn: 'Multiple choice short dialogues', titleVi: 'Hội thoại ngắn trắc nghiệm', questionCount: 6, mode: 'objective', taskFocusVi: 'Nghe ý chính từng hội thoại' },
          { partNumber: 3, titleEn: 'Gap fill', titleVi: 'Điền ghi chú', questionCount: 6, mode: 'gap', taskFocusVi: 'Nghe độc thoại và điền 6 chỗ trống' },
          { partNumber: 4, titleEn: 'Multiple choice longer text', titleVi: 'Văn bản nghe dài trắc nghiệm', questionCount: 6, mode: 'objective', taskFocusVi: 'Nghe thái độ, ý kiến và chi tiết' },
        ],
      },
      {
        key: 'pet-speaking',
        skill: 'speaking',
        labelEn: 'Speaking',
        labelVi: 'Nói',
        duration: '10-12 minutes per pair',
        parts: 4,
        questions: 4,
        weight: '25%',
        partSpecs: [
          { partNumber: 1, titleEn: 'Interview', titleVi: 'Phỏng vấn', questionCount: 1, mode: 'speaking', taskFocusVi: 'Trả lời thông tin cá nhân và trải nghiệm' },
          { partNumber: 2, titleEn: 'Extended turn', titleVi: 'Nói dài theo ảnh', questionCount: 1, mode: 'speaking', taskFocusVi: 'Mô tả ảnh trong khoảng 1 phút' },
          { partNumber: 3, titleEn: 'Collaborative task', titleVi: 'Thảo luận cùng bạn thi', questionCount: 1, mode: 'speaking', taskFocusVi: 'Trao đổi và quyết định chung' },
          { partNumber: 4, titleEn: 'Discussion', titleVi: 'Thảo luận mở rộng', questionCount: 1, mode: 'speaking', taskFocusVi: 'Nêu ý kiến, lý do, ví dụ' },
        ],
      },
    ],
  },
};

export const CAMBRIDGE_EXAM_CLAIM_GUARDRAIL = {
  allowedClaim: 'Henry Learning OS contains original practice packs aligned to current official Cambridge format metadata verified on 2026-05-09.',
  blockedClaim: 'Do not claim bundled Henry practice packs are official Cambridge papers, official answer keys, leaked exams, or a 100% copy of official exam content.',
  officialContentPath: 'Use official Cambridge preparation/sample-test links for authorised official materials. User-owned licensed PDFs can be imported privately into the local library, not republished in the app bundle.',
  sourceIds: CAMBRIDGE_OFFICIAL_SOURCES.map(source => source.id),
};

export const CAMBRIDGE_EXAM_FRAMEWORK_STATS = {
  levelCount: Object.keys(CAMBRIDGE_EXAM_SPECS).length,
  sourceCount: CAMBRIDGE_OFFICIAL_SOURCES.length,
  verifiedAt: '2026-05-09',
  totalOfficialComponents: Object.values(CAMBRIDGE_EXAM_SPECS).reduce((sum, exam) => sum + exam.components.length, 0),
  totalOfficialObjectiveAndPromptItemsPerFullCycle: Object.values(CAMBRIDGE_EXAM_SPECS).reduce(
    (sum, exam) => sum + exam.components.reduce((componentSum, component) => componentSum + component.questions, 0),
    0,
  ),
};
