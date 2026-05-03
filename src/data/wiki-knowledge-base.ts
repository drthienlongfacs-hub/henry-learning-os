// ========================================
// Henry Learning OS — Wiki Knowledge Base
// Karpathy-style "Second Brain": structured, searchable, cross-linked
// Evidence: Zettelkasten method + Karpathy's wiki-as-memory pattern
// ========================================

export interface WikiEntry {
  id: string;
  term: string;
  termVi: string;
  category: WikiCategory;
  definition: string;
  definitionVi: string;
  tags: string[];
  relatedIds: string[];
  examples?: string[];
  source?: string;
}

export type WikiCategory =
  | 'phonics'
  | 'grammar'
  | 'vocabulary'
  | 'learning-method'
  | 'curriculum'
  | 'pedagogy'
  | 'assessment';

export const WIKI_ENTRIES: WikiEntry[] = [
  // === PHONICS ===
  { id:'ph-01', term:'Short Vowels', termVi:'Nguyên âm ngắn', category:'phonics',
    definition:'The 5 short vowel sounds /æ/ /ɛ/ /ɪ/ /ɒ/ /ʌ/ found in CVC words like cat, bed, sit, hot, cup.',
    definitionVi:'5 âm nguyên âm ngắn trong tiếng Anh, thường xuất hiện trong từ CVC (phụ âm-nguyên âm-phụ âm).',
    tags:['IPA','pronunciation','grade-1'], relatedIds:['ph-02','ph-03'],
    examples:['cat /kæt/', 'bed /bɛd/', 'sit /sɪt/'], source:'IPA Handbook' },
  { id:'ph-02', term:'Long Vowels', termVi:'Nguyên âm dài', category:'phonics',
    definition:'Vowel sounds where the letter "says its name": /eɪ/ /iː/ /aɪ/ /oʊ/ /uː/. Often with silent-e or digraphs.',
    definitionVi:'Âm nguyên âm dài — phát âm giống tên chữ cái. Thường có e câm hoặc cặp nguyên âm.',
    tags:['IPA','pronunciation','grade-1-2'], relatedIds:['ph-01','ph-04'],
    examples:['cake /keɪk/', 'tree /triː/', 'bike /baɪk/'], source:'Jolly Phonics' },
  { id:'ph-03', term:'CVC Pattern', termVi:'Mẫu CVC', category:'phonics',
    definition:'Consonant-Vowel-Consonant — the simplest decodable word pattern (cat, dog, bus). Foundation of phonics instruction.',
    definitionVi:'Phụ âm-Nguyên âm-Phụ âm — mẫu từ đơn giản nhất, nền tảng dạy đọc phonics.',
    tags:['decoding','grade-1'], relatedIds:['ph-01'],
    examples:['c-a-t', 'd-o-g', 'b-u-s'] },
  { id:'ph-04', term:'Consonant Blends', termVi:'Phụ âm ghép', category:'phonics',
    definition:'Two or three consonants together where each keeps its sound: bl, cr, str, spl.',
    definitionVi:'2-3 phụ âm đứng cạnh nhau, mỗi âm vẫn giữ nguyên: bl, cr, str.',
    tags:['pronunciation','grade-2'], relatedIds:['ph-05'],
    examples:['bl-ack', 'cr-ab', 'str-ong'] },
  { id:'ph-05', term:'Digraphs', termVi:'Nhị hợp âm', category:'phonics',
    definition:'Two letters making ONE new sound: th, sh, ch, wh, ph. Unlike blends, the original sounds disappear.',
    definitionVi:'Hai chữ cái tạo thành MỘT âm mới: th, sh, ch. Khác blend — âm gốc biến mất.',
    tags:['pronunciation','grade-1-2'], relatedIds:['ph-04'],
    examples:['sh-ip', 'ch-air', 'th-ink'] },
  { id:'ph-06', term:'Minimal Pairs', termVi:'Cặp tối thiểu', category:'phonics',
    definition:'Word pairs differing by one phoneme: bat/vat, ship/chip. Essential for discrimination training.',
    definitionVi:'Cặp từ chỉ khác 1 âm vị: bat/vat, ship/chip. Quan trọng để luyện phân biệt âm.',
    tags:['pronunciation','listening'], relatedIds:['ph-01','ph-05'],
    examples:['bat–vat', 'ship–chip', 'light–right'], source:'Cambridge Phonetics' },

  // === GRAMMAR ===
  { id:'gr-01', term:'Simple Present Tense', termVi:'Thì hiện tại đơn', category:'grammar',
    definition:'Used for habits, facts, and routines. Form: S + V(s/es). "She reads every day."',
    definitionVi:'Dùng cho thói quen, sự thật. Công thức: S + V(s/es). "Cô ấy đọc mỗi ngày."',
    tags:['tense','grade-3-4'], relatedIds:['gr-02','gr-03'],
    examples:['I play soccer.', 'She reads books.', 'The sun rises in the east.'] },
  { id:'gr-02', term:'Present Continuous', termVi:'Thì hiện tại tiếp diễn', category:'grammar',
    definition:'Actions happening NOW. Form: S + am/is/are + V-ing. "He is reading."',
    definitionVi:'Hành động đang xảy ra. Công thức: S + am/is/are + V-ing.',
    tags:['tense','grade-3-4'], relatedIds:['gr-01'],
    examples:['I am eating lunch.', 'They are playing outside.'] },
  { id:'gr-03', term:'Simple Past Tense', termVi:'Thì quá khứ đơn', category:'grammar',
    definition:'Completed actions in the past. Regular: +ed. Irregular: went, saw, ate.',
    definitionVi:'Hành động đã hoàn thành. Động từ có quy tắc thêm -ed, bất quy tắc: went, saw.',
    tags:['tense','grade-4-5'], relatedIds:['gr-01'],
    examples:['I walked to school.', 'She ate an apple.', 'He went home.'] },
  { id:'gr-04', term:'Articles (a/an/the)', termVi:'Mạo từ', category:'grammar',
    definition:'"A" before consonant sounds, "an" before vowel sounds, "the" for specific items.',
    definitionVi:'"A" trước phụ âm, "an" trước nguyên âm, "the" cho vật cụ thể.',
    tags:['grammar-basics','grade-2-3'], relatedIds:[],
    examples:['a cat', 'an apple', 'the red book'] },
  { id:'gr-05', term:'Subject-Verb Agreement', termVi:'Hòa hợp chủ-vị', category:'grammar',
    definition:'Singular subjects take singular verbs. "He runs" not "He run".',
    definitionVi:'Chủ ngữ số ít đi với động từ số ít. "He runs" không phải "He run".',
    tags:['grammar-basics','grade-3'], relatedIds:['gr-01'],
    examples:['The dog runs fast.', 'The dogs run fast.'] },

  // === LEARNING METHODS ===
  { id:'lm-01', term:'Spaced Repetition', termVi:'Lặp lại ngắt quãng', category:'learning-method',
    definition:'Review material at increasing intervals (1d→3d→7d→14d). Based on Ebbinghaus forgetting curve. Evidence: 200+ studies confirm 40-50% retention boost.',
    definitionVi:'Ôn tập theo khoảng cách tăng dần. Dựa trên đường cong quên Ebbinghaus. Bằng chứng: 200+ nghiên cứu, tăng 40-50% ghi nhớ.',
    tags:['evidence-based','retention'], relatedIds:['lm-02','lm-03'],
    source:'Cepeda et al. (2006) Psychological Bulletin' },
  { id:'lm-02', term:'Active Recall', termVi:'Nhớ lại chủ động', category:'learning-method',
    definition:'Testing yourself rather than re-reading. Flashcards, self-quizzing. Evidence: Roediger & Karpicke (2006) — testing effect doubles long-term retention.',
    definitionVi:'Tự kiểm tra thay vì đọc lại. Thẻ nhớ, tự hỏi đáp. Bằng chứng: hiệu ứng kiểm tra tăng gấp đôi ghi nhớ dài hạn.',
    tags:['evidence-based','retention'], relatedIds:['lm-01'],
    source:'Roediger & Karpicke (2006) Psychological Science' },
  { id:'lm-03', term:'Interleaving', termVi:'Xen kẽ chủ đề', category:'learning-method',
    definition:'Mixing different topics during practice instead of blocking. Evidence: 25-70% better transfer in math and motor skills.',
    definitionVi:'Trộn nhiều chủ đề khi luyện tập thay vì học từng khối. Bằng chứng: 25-70% transfer tốt hơn.',
    tags:['evidence-based','practice'], relatedIds:['lm-01','lm-04'],
    source:'Rohrer & Taylor (2007)' },
  { id:'lm-04', term:'Scaffolding', termVi:'Giàn giáo học tập', category:'learning-method',
    definition:'Temporary support that helps learners reach the next level, then gradually removed. Based on Vygotsky ZPD.',
    definitionVi:'Hỗ trợ tạm thời giúp người học đạt mức tiếp theo, sau đó dần gỡ bỏ. Dựa trên vùng phát triển gần Vygotsky.',
    tags:['pedagogy','adaptive'], relatedIds:['lm-05'],
    source:'Vygotsky (1978) Mind in Society' },
  { id:'lm-05', term:'Zone of Proximal Development', termVi:'Vùng phát triển gần (ZPD)', category:'learning-method',
    definition:'The gap between what a learner can do alone and what they can do with guidance. Optimal learning zone.',
    definitionVi:'Khoảng cách giữa điều người học tự làm được và điều cần hướng dẫn. Vùng học tập tối ưu.',
    tags:['pedagogy','adaptive'], relatedIds:['lm-04'],
    source:'Vygotsky (1978)' },
  { id:'lm-06', term:'Phonics vs Whole Language', termVi:'Phonics và Ngôn ngữ toàn phần', category:'learning-method',
    definition:'Phonics: decode sounds systematically. Whole Language: learn through immersion. Evidence: National Reading Panel (2000) — systematic phonics is more effective for beginners.',
    definitionVi:'Phonics: giải mã âm có hệ thống. Whole Language: học qua hòa nhập. NRP (2000): phonics hiệu quả hơn cho người mới.',
    tags:['reading','evidence-based'], relatedIds:['ph-01','lm-07'],
    source:'National Reading Panel (2000)' },
  { id:'lm-07', term:'5 Pillars of Reading', termVi:'5 trụ cột đọc hiểu', category:'learning-method',
    definition:'Phonemic Awareness, Phonics, Fluency, Vocabulary, Comprehension. The NRP framework used worldwide.',
    definitionVi:'Nhận thức âm vị, Phonics, Lưu loát, Từ vựng, Đọc hiểu. Khung NRP dùng toàn cầu.',
    tags:['reading','framework'], relatedIds:['lm-06','ph-01'],
    source:'National Reading Panel (2000)' },

  // === CURRICULUM ===
  { id:'cu-01', term:'CTGDPT 2018', termVi:'Chương trình GDPT 2018', category:'curriculum',
    definition:'Vietnam\'s 2018 national curriculum reform. Competency-based, 5 qualities + 10 competencies. Applies to Grades 1-12.',
    definitionVi:'Chương trình Giáo dục Phổ thông 2018. Dựa trên năng lực, 5 phẩm chất + 10 năng lực. Áp dụng lớp 1-12.',
    tags:['vietnam','official'], relatedIds:['cu-02','cu-03'],
    source:'Bộ GD&ĐT Thông tư 32/2018' },
  { id:'cu-02', term:'CEFR', termVi:'Khung tham chiếu ngôn ngữ châu Âu', category:'curriculum',
    definition:'Common European Framework: Pre-A1 → A1 → A2 → B1 → B2 → C1 → C2. Vietnam Grade 3 English starts at Pre-A1, Grade 5 targets A1.',
    definitionVi:'Khung châu Âu: Pre-A1 đến C2. Lớp 3 bắt đầu Pre-A1, lớp 5 hướng tới A1.',
    tags:['english','assessment'], relatedIds:['cu-01'],
    source:'Council of Europe (2001)' },
  { id:'cu-03', term:'Bloom\'s Taxonomy', termVi:'Thang Bloom', category:'curriculum',
    definition:'6 levels: Remember → Understand → Apply → Analyze → Evaluate → Create. Used to design questions at appropriate cognitive levels.',
    definitionVi:'6 bậc: Nhớ → Hiểu → Áp dụng → Phân tích → Đánh giá → Sáng tạo. Dùng thiết kế câu hỏi phù hợp.',
    tags:['assessment','pedagogy'], relatedIds:['cu-01'],
    source:'Anderson & Krathwohl (2001)' },

  // === PEDAGOGY ===
  { id:'pe-01', term:'Formative Assessment', termVi:'Đánh giá quá trình', category:'assessment',
    definition:'Ongoing assessment DURING learning to provide feedback and adjust instruction. Not graded. Evidence: Black & Wiliam (1998) — effect size 0.4-0.7.',
    definitionVi:'Đánh giá TRONG QUÁ TRÌNH học để phản hồi và điều chỉnh. Không chấm điểm. Hiệu quả: 0.4-0.7.',
    tags:['evidence-based','assessment'], relatedIds:['pe-02'],
    source:'Black & Wiliam (1998) Assessment in Education' },
  { id:'pe-02', term:'Growth Mindset', termVi:'Tư duy phát triển', category:'pedagogy',
    definition:'Believing ability can be developed through effort. Dweck (2006): praising effort > praising intelligence.',
    definitionVi:'Tin rằng năng lực có thể phát triển qua nỗ lực. Khen nỗ lực > khen thông minh.',
    tags:['motivation','evidence-based'], relatedIds:['pe-01'],
    source:'Dweck (2006) Mindset' },
  { id:'pe-03', term:'Multisensory Learning', termVi:'Học đa giác quan', category:'pedagogy',
    definition:'Engaging visual + auditory + kinesthetic channels simultaneously. Used in Orton-Gillingham for dyslexia.',
    definitionVi:'Kết hợp thị giác + thính giác + vận động. Dùng trong phương pháp Orton-Gillingham cho trẻ khó đọc.',
    tags:['inclusive','reading'], relatedIds:['lm-06','ph-01'],
    source:'Orton-Gillingham approach' },
  { id:'pe-04', term:'Comprehensible Input', termVi:'Input dễ hiểu (i+1)', category:'pedagogy',
    definition:'Krashen\'s hypothesis: language is acquired when input is slightly above current level (i+1). Not too easy, not too hard.',
    definitionVi:'Giả thuyết Krashen: ngôn ngữ được tiếp thu khi đầu vào hơi cao hơn trình độ hiện tại (i+1).',
    tags:['language-acquisition','theory'], relatedIds:['lm-04','lm-05'],
    source:'Krashen (1985) The Input Hypothesis' },
];

// === SEARCH & FILTER FUNCTIONS ===
export function searchWiki(query: string): WikiEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return WIKI_ENTRIES;
  return WIKI_ENTRIES.filter(e =>
    e.term.toLowerCase().includes(q) ||
    e.termVi.toLowerCase().includes(q) ||
    e.definition.toLowerCase().includes(q) ||
    e.definitionVi.toLowerCase().includes(q) ||
    e.tags.some(t => t.includes(q))
  );
}

export function getByCategory(cat: WikiCategory): WikiEntry[] {
  return WIKI_ENTRIES.filter(e => e.category === cat);
}

export function getRelated(entry: WikiEntry): WikiEntry[] {
  return WIKI_ENTRIES.filter(e => entry.relatedIds.includes(e.id));
}

export function getById(id: string): WikiEntry | undefined {
  return WIKI_ENTRIES.find(e => e.id === id);
}

export const WIKI_CATEGORIES: { key: WikiCategory; label: string; labelVi: string; icon: string; color: string }[] = [
  { key: 'phonics', label: 'Phonics', labelVi: 'Ngữ âm', icon: '🔤', color: '#7c3aed' },
  { key: 'grammar', label: 'Grammar', labelVi: 'Ngữ pháp', icon: '📝', color: '#2563eb' },
  { key: 'vocabulary', label: 'Vocabulary', labelVi: 'Từ vựng', icon: '📖', color: '#059669' },
  { key: 'learning-method', label: 'Learning Methods', labelVi: 'Phương pháp học', icon: '🧠', color: '#f59e0b' },
  { key: 'curriculum', label: 'Curriculum', labelVi: 'Chương trình', icon: '🎓', color: '#0f766e' },
  { key: 'pedagogy', label: 'Pedagogy', labelVi: 'Sư phạm', icon: '👩‍🏫', color: '#ec4899' },
  { key: 'assessment', label: 'Assessment', labelVi: 'Đánh giá', icon: '📊', color: '#ef4444' },
];

export const WIKI_STATS = {
  totalEntries: WIKI_ENTRIES.length,
  categories: WIKI_CATEGORIES.length,
  evidenceBased: WIKI_ENTRIES.filter(e => e.tags.includes('evidence-based')).length,
  crossLinks: WIKI_ENTRIES.reduce((s, e) => s + e.relatedIds.length, 0),
};
