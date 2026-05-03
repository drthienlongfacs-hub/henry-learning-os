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
    definition:'Review material at increasing intervals. Henry OS treats this as a supported practice design, then measures retention locally before making any gain claim.',
    definitionVi:'Ôn tập theo khoảng cách tăng dần. Henry OS xem đây là thiết kế thực hành có nguồn ủng hộ, sau đó phải đo giữ nhớ nội bộ trước khi claim mức tăng.',
    tags:['evidence-based','retention'], relatedIds:['lm-02','lm-03'],
    source:'AERO spacing/retrieval guide; IES study-learning guide; local VocabReview evidence' },
  { id:'lm-02', term:'Active Recall', termVi:'Nhớ lại chủ động', category:'learning-method',
    definition:'Try to answer before seeing the explanation or hint. In Henry OS, correct after hint is progress, but independent first-attempt success is stronger evidence.',
    definitionVi:'Thử trả lời trước khi xem giải thích hoặc gợi ý. Trong Henry OS, đúng sau gợi ý là tiến bộ, nhưng đúng tự lực lần đầu mới là bằng chứng mạnh hơn.',
    tags:['evidence-based','retention'], relatedIds:['lm-01'],
    source:'AERO spacing/retrieval guide; IES study-learning guide; local ReadingQuiz evidence' },
  { id:'lm-03', term:'Interleaving', termVi:'Xen kẽ chủ đề', category:'learning-method',
    definition:'Mix related problem types after the learner has enough basic exposure. In Henry OS, interleaving is used to test transfer, not to inflate performance claims.',
    definitionVi:'Xen kẽ các dạng bài liên quan sau khi con đã có nền cơ bản. Trong Henry OS, xen kẽ dùng để kiểm tra chuyển giao, không dùng để thổi phồng hiệu quả.',
    tags:['evidence-based','practice'], relatedIds:['lm-01','lm-04'],
    source:'IES study-learning guide; local lesson-mode blueprint' },
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
    definition:'Ongoing assessment during learning to provide feedback and adjust the next move. Henry OS keeps this separate from grading and exposes reliability before parent-facing claims.',
    definitionVi:'Đánh giá trong quá trình học để phản hồi và điều chỉnh bước tiếp theo. Henry OS tách khỏi chấm điểm và phải hiển thị độ tin cậy trước khi báo cáo cho phụ huynh.',
    tags:['evidence-based','assessment'], relatedIds:['pe-02'],
    source:'EEF feedback/metacognition guidance + local evidence engines' },
  { id:'pe-02', term:'Growth Mindset', termVi:'Tư duy phát triển', category:'pedagogy',
    definition:'Use process praise and strategy reflection instead of labeling a child as smart or weak. Henry OS treats this as a language-safety rule because intervention evidence is mixed.',
    definitionVi:'Khen quá trình và chiến lược thay vì gắn nhãn con là thông minh hoặc yếu. Henry OS xem đây là luật ngôn ngữ an toàn vì bằng chứng can thiệp còn không đồng nhất.',
    tags:['motivation','evidence-based'], relatedIds:['pe-01'],
    source:'Local child-safety language policy; needs review before efficacy claim' },
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

  // === NEW ENTRIES — Research 2025-2026 + practical experience ===
  { id:'lm-08', term:'Narrative-Based Learning', termVi:'Học qua câu chuyện', category:'learning-method',
    definition:'Embedding educational content within meaningful stories. In Henry OS this is treated as a motivating context plus a required text-evidence or retell task, not as a standalone efficacy claim.',
    definitionVi:'Lồng ghép nội dung học vào câu chuyện có ý nghĩa. Trong Henry OS, đây là bối cảnh tạo hứng thú kèm yêu cầu chỉ bằng chứng trong văn bản hoặc kể lại, không phải claim hiệu quả độc lập.',
    tags:['engagement','local-practice','needs-local-measurement'], relatedIds:['pe-04','lm-07'],
    source:'IES reading comprehension guide + local StoryWeaver wrapper' },
  { id:'pe-05', term:'Co-Learning (Parent+Child)', termVi:'Đồng học (Phụ huynh+Con)', category:'pedagogy',
    definition:'Parent-mediated app use is the app rule: adult opens external links, asks open questions, and connects content to daily life. Henry OS records this as a safety and engagement practice, not a measured effect-size claim.',
    definitionVi:'Phụ huynh đồng hành là luật vận hành của app: người lớn mở liên kết ngoài, hỏi câu mở và nối nội dung với đời sống. Henry OS ghi đây là thực hành an toàn và gắn kết, không phải claim hiệu quả đã đo.',
    tags:['source-backed','parent-engagement','local-practice'], relatedIds:['pe-04','lm-04'],
    source:'AAP Family Media Plan; UNICEF AI for children; local AI safety policy' },
  { id:'lm-09', term:'SM-2 Algorithm', termVi:'Thuật toán SM-2', category:'learning-method',
    definition:'SM-2 style schedulers adjust review intervals from answer quality and ease. Henry OS uses a simplified child-safe scheduler and validates it with local retention data.',
    definitionVi:'Các bộ lập lịch kiểu SM-2 điều chỉnh khoảng ôn theo chất lượng câu trả lời và độ dễ. Henry OS dùng phiên bản đơn giản, an toàn cho trẻ và kiểm chứng bằng dữ liệu giữ nhớ nội bộ.',
    tags:['algorithm','local-practice','implemented'], relatedIds:['lm-01','lm-02'],
    source:'SuperMemo scheduling pattern + local VocabReview implementation' },
  { id:'ph-07', term:'Sight Words', termVi:'Từ nhận mặt', category:'phonics',
    definition:'High-frequency words that children practice until recognition becomes quick and accurate. Henry OS should still check sentence-level comprehension, not only fast word recognition.',
    definitionVi:'Những từ tần suất cao cần luyện đến khi nhận diện nhanh và đúng. Henry OS vẫn phải kiểm tra hiểu câu, không chỉ nhận mặt từ nhanh.',
    tags:['reading','grade-1-2','high-impact'], relatedIds:['ph-03','lm-07'],
    source:'Reading practice tradition; needs source review before quantified coverage claims' },
  { id:'pe-06', term:'Reading Fluency (WCPM)', termVi:'Lưu loát đọc (WCPM)', category:'assessment',
    definition:'Words Correct Per Minute — the standard measure. Grade 1 target: 60 WCPM by year-end. Grade 3: 100+ WCPM. Hasbrouck & Tindal (2017) norms widely used.',
    definitionVi:'Số từ đọc đúng mỗi phút. Lớp 1 mục tiêu: 60 WCPM cuối năm. Lớp 3: 100+ WCPM.',
    tags:['assessment','evidence-based','benchmark'], relatedIds:['lm-07','pe-01'],
    source:'Hasbrouck & Tindal (2017) Oral Reading Fluency Norms' },
  { id:'pe-07', term:'Vietnamese L1 Interference', termVi:'Ảnh hưởng tiếng mẹ đẻ', category:'pedagogy',
    definition:'Local risk pattern for Vietnamese learners of English: final consonants, consonant clusters, /th/ sounds and vowel length may need explicit listening and production practice. Use this as a review hypothesis until Henry records pronunciation data.',
    definitionVi:'Mẫu rủi ro thực hành cho trẻ Việt học tiếng Anh: phụ âm cuối, cụm phụ âm, âm /th/ và độ dài nguyên âm có thể cần luyện nghe - nói rõ. Chỉ dùng như giả thuyết ôn tập cho đến khi Henry có dữ liệu phát âm.',
    tags:['pronunciation','vietnamese-specific','needs-review'], relatedIds:['ph-06','ph-01'],
    source:'Vietnamese-English pronunciation literature + local observation; needs source-by-source review before adaptive use' },
  { id:'lm-10', term:'Dual Coding Theory', termVi:'Lý thuyết mã hóa kép', category:'learning-method',
    definition:'Use verbal and visual channels together: text, audio, image, model and child explanation. Henry OS treats this as a design principle that still needs local comprehension evidence after the child answers.',
    definitionVi:'Kết hợp kênh lời và hình: văn bản, âm thanh, ảnh, mô hình và phần con giải thích. Henry OS xem đây là nguyên tắc thiết kế, vẫn cần bằng chứng đọc hiểu sau khi con trả lời.',
    tags:['evidence-based','multimedia'], relatedIds:['pe-03','lm-07'],
    source:'IES study-learning guide; CAST UDL' },
  { id:'pe-08', term:'Gamification Science', termVi:'Khoa học trò chơi hóa', category:'pedagogy',
    definition:'Points, streaks and levels are engagement signals only. They can support routines, but mastery still requires attempts, retention and transfer evidence.',
    definitionVi:'Điểm, streak và level chỉ là tín hiệu gắn kết. Chúng hỗ trợ thói quen, nhưng thành thạo vẫn phải dựa vào bài làm, giữ nhớ và chuyển giao.',
    tags:['engagement','local-practice','source-backed'], relatedIds:['pe-02'],
    source:'Self-determination theory + AAP media boundary + local reading tracker' },
  { id:'lm-11', term:'Evidence Wiki Pattern', termVi:'Mô hình wiki có ledger bằng chứng', category:'learning-method',
    definition:'Use AI to compile raw sources into structured, interlinked wiki records, then attach evidence status, caveats and local traces before any strong learning claim is shown.',
    definitionVi:'Dùng AI để biên soạn nguồn thô thành wiki có cấu trúc và liên kết chéo, sau đó gắn trạng thái bằng chứng, giới hạn diễn giải và dấu vết nội bộ trước khi hiển thị claim mạnh.',
    tags:['AI','knowledge-management','implemented','local-practice'], relatedIds:['lm-01'],
    source:'Local Wiki module + evidence-source ledger; external attribution requires a verified source before citation' },
  { id:'cu-04', term:'Sentence Highlight Reading', termVi:'Đọc highlight từng câu', category:'curriculum',
    definition:'Sentence-level reading support: play TTS for a sentence, show bilingual guide, then ask a comprehension question. Implemented in ReadingQuiz as access support, not as a measured comprehension-gain claim.',
    definitionVi:'Hỗ trợ đọc theo câu: nghe TTS từng câu, xem hướng dẫn song ngữ, rồi trả lời câu đọc hiểu. Đã triển khai trong ReadingQuiz như hỗ trợ tiếp cận, không phải claim tăng hiểu bài đã đo.',
    tags:['multimedia','implemented','local-practice'], relatedIds:['pe-03','lm-10'],
    source:'ReadingQuiz implementation + IES/CAST design principles' },
  { id:'pe-09', term:'Adaptive Difficulty', termVi:'Độ khó thích ứng', category:'pedagogy',
    definition:'Adjust challenge from local signals: completion, independent accuracy, first-attempt success, hint dependency and transfer. In Henry OS it recommends the next move; it does not prove acceleration.',
    definitionVi:'Điều chỉnh thử thách từ tín hiệu nội bộ: hoàn thành, đúng tự lực, đúng lần đầu, phụ thuộc gợi ý và chuyển giao. Trong Henry OS, đây là khuyến nghị bước tiếp theo, không phải bằng chứng tăng tốc.',
    tags:['evidence-based','adaptive','AI'], relatedIds:['lm-04','lm-05','pe-04'],
    source:'Local evidence engine + IES/EEF feedback principles' },
  { id:'vo-01', term:'Word Families', termVi:'Họ từ', category:'vocabulary',
    definition:'Groups of words sharing a common pattern: -at (cat, bat, hat), -ig (big, dig, pig). Teaching word families helps children decode 500+ words from just 37 rimes.',
    definitionVi:'Nhóm từ cùng mẫu: -at (cat, bat, hat). Dạy họ từ giúp trẻ giải mã 500+ từ chỉ từ 37 vần.',
    tags:['decoding','grade-1','high-impact'], relatedIds:['ph-03','ph-01'],
    examples:['-at: cat, bat, hat', '-ig: big, dig, pig', '-op: top, hop, mop'],
    source:'Wylie & Durrell (1970) Elementary English' },
  { id:'lm-12', term:'Agent Orchestration (Operator Gate)', termVi:'Điều phối tác nhân có cổng người vận hành', category:'learning-method',
    definition:'Agent orchestration pattern for our work: rules, isolated changes, sensors such as lint/type/test, and proof of work before claims. Use as operator workflow only; do not add autonomous self-editing agents.',
    definitionVi:'Mô hình điều phối tác nhân cho công việc của chúng ta: luật, thay đổi có phạm vi, sensor như lint/type/test, và bằng chứng trước khi claim. Chỉ dùng như workflow vận hành, không thêm agent tự sửa hệ thống.',
    tags:['AI','architecture','local-practice','operator-gate'], relatedIds:['lm-11'],
    source:'Local AGENTS.md + harvest skill + gate history' },
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
