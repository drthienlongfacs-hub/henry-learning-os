'use client';

import { useState } from 'react';
import { BookOpen, Lightbulb, Volume2, ChevronRight, Star, Brain, Pencil } from 'lucide-react';

// ── Lesson content generator for international units ──
export interface LessonContent {
  unitTitle: string;
  unitTitleVi: string;
  grade: number;
  framework: string;
  sections: LessonSection[];
}

interface LessonSection {
  type: 'vocabulary' | 'reading' | 'grammar' | 'speaking' | 'tip';
  title: string;
  titleVi: string;
  content: string[];
  contentVi?: string[];
  example?: string;
  exampleVi?: string;
}

// FALLBACK theme — only used when unit data is not available
const FALLBACK_THEME = {
  vocab: [['friend', 'bạn'], ['play', 'chơi'], ['together', 'cùng nhau'], ['share', 'chia sẻ'], ['happy', 'vui vẻ'], ['game', 'trò chơi'], ['turn', 'lượt'], ['fun', 'vui']] as [string, string][],
  sentences: [['I play with my friend.', 'Tôi chơi với bạn.'], ['We share our toys.', 'Chúng tôi chia sẻ đồ chơi.'], ['It is my turn now.', 'Bây giờ đến lượt tôi.'], ['Let us play together!', 'Chúng ta hãy chơi cùng nhau!']] as [string, string][],
  reading: 'Tom and Lily are friends. They play in the park every day. Tom likes to run. Lily likes to jump. They share a ball. "Let us play together!" says Tom. "Yes! That is fun!" says Lily. They are happy.',
  readingVi: 'Tom và Lily là bạn. Họ chơi trong công viên mỗi ngày. Tom thích chạy. Lily thích nhảy. Họ chia sẻ một quả bóng. "Chúng ta hãy chơi cùng nhau!" Tom nói. "Vâng! Thật vui!" Lily nói. Họ rất vui.',
  grammar: 'Simple sentences: Subject + Verb. Example: "I play." "We share." "They run."',
  grammarVi: 'Câu đơn giản: Chủ ngữ + Động từ. Ví dụ: "I play." "We share." "They run."',
  tip: '🎯 Read aloud 3 times: whisper → normal → loud. Point to each word as you read!',
  tipVi: '🎯 Đọc to 3 lần: thì thầm → bình thường → to. Chỉ vào từng từ khi đọc!',
};

// ── Unit data registry for data-driven lesson content ──
// Pre-loaded from english-units-g*.ts to generate UNIQUE content per unit
interface UnitVocab { en: string; vi: string; }
interface UnitPattern { pattern: string; example: string; exampleVi: string; slots: string[]; }
interface CachedUnit { vocabulary: UnitVocab[]; patterns: UnitPattern[]; title: string; titleVi: string; grade: number; }

let _unitCache: Record<string, CachedUnit> | null = null;

function loadUnitCache(): Record<string, CachedUnit> {
  if (_unitCache) return _unitCache;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const g1g2 = require('@/data/english-units-g1g2');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const g3 = require('@/data/english-units-g3');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const g4 = require('@/data/english-units-g4');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const g5 = require('@/data/english-units-g5');
    const all = [
      ...(g1g2.GRADE1_UNITS || []),
      ...(g1g2.GRADE2_UNITS || []),
      ...(g3.GRADE3_UNITS || []),
      ...(g4.GRADE4_UNITS || []),
      ...(g5.GRADE5_UNITS || []),
    ];
    const map: Record<string, CachedUnit> = {};
    for (const u of all) {
      map[u.unitId] = { vocabulary: u.vocabulary, patterns: u.patterns, title: u.title, titleVi: u.titleVi, grade: u.grade };
    }
    _unitCache = map;
    return map;
  } catch {
    _unitCache = {};
    return {};
  }
}

// Build a unique reading passage from the unit's OWN vocabulary and patterns
function buildReadingFromUnit(unit: CachedUnit): { reading: string; readingVi: string } {
  const v = unit.vocabulary;
  const p = unit.patterns;
  
  if (v.length < 3) return { reading: `Let's learn about ${unit.title}.`, readingVi: `Hãy cùng học về ${unit.titleVi}.` };
  
  // Use a simple hash of unit's title to pick a template deterministically
  const hash = unit.title.length + (v[0]?.en.length || 0);
  const templateIdx = hash % 4;
  
  const en: string[] = [];
  const vi: string[] = [];
  
  if (templateIdx === 0) {
    en.push(`Today is a great day to learn about ${unit.title}.`);
    vi.push(`Hôm nay là một ngày tuyệt vời để học về ${unit.titleVi}.`);
    en.push(`We can see many things like ${v[0].en} and ${v[1].en}.`);
    vi.push(`Chúng ta có thể thấy nhiều thứ như ${v[0].vi} và ${v[1].vi}.`);
    if (p.length > 0) {
      en.push(p[0].example);
      vi.push(p[0].exampleVi);
    }
    if (v[2]) {
      en.push(`Do you know the word "${v[2].en}"?`);
      vi.push(`Bạn có biết từ "${v[2].vi}" không?`);
    }
    en.push(`Let's practice these words together!`);
    vi.push(`Hãy cùng nhau thực hành những từ này nhé!`);
  } else if (templateIdx === 1) {
    en.push(`Welcome to the lesson on ${unit.title}.`);
    vi.push(`Chào mừng đến với bài học về ${unit.titleVi}.`);
    if (p.length > 0) {
      en.push(p[0].example);
      vi.push(p[0].exampleVi);
    }
    en.push(`Look at the ${v[0].en}. It is next to the ${v[1].en}.`);
    vi.push(`Nhìn vào ${v[0].vi}. Nó ở cạnh ${v[1].vi}.`);
    if (v[2]) {
      en.push(`Can you find the ${v[2].en}?`);
      vi.push(`Bạn có thể tìm thấy ${v[2].vi} không?`);
    }
    en.push(`Learning English is fun!`);
    vi.push(`Học tiếng Anh thật là vui!`);
  } else if (templateIdx === 2) {
    en.push(`Let's talk about ${unit.title}.`);
    vi.push(`Hãy cùng nói về ${unit.titleVi}.`);
    en.push(`My favorite word is ${v[0].en}. What about you?`);
    vi.push(`Từ yêu thích của tôi là ${v[0].vi}. Còn bạn thì sao?`);
    if (p.length > 0) {
      en.push(p[0].example);
      vi.push(p[0].exampleVi);
    }
    if (v[1] && v[2]) {
      en.push(`We also have ${v[1].en} and ${v[2].en}.`);
      vi.push(`Chúng ta cũng có ${v[1].vi} và ${v[2].vi}.`);
    }
    en.push(`Read them aloud to remember!`);
    vi.push(`Hãy đọc to lên để ghi nhớ nhé!`);
  } else {
    en.push(`Here is a short story about ${unit.title}.`);
    vi.push(`Đây là một câu chuyện ngắn về ${unit.titleVi}.`);
    if (p.length > 0) {
      en.push(p[0].example);
      vi.push(p[0].exampleVi);
    }
    en.push(`The ${v[0].en} and the ${v[1].en} are here.`);
    vi.push(`${v[0].vi} và ${v[1].vi} đang ở đây.`);
    if (p.length > 1) {
      en.push(p[1].example);
      vi.push(p[1].exampleVi);
    }
    en.push(`Good job! Keep practicing.`);
    vi.push(`Làm tốt lắm! Hãy tiếp tục luyện tập.`);
  }

  return { reading: en.join(' '), readingVi: vi.join(' ') };
}

export function generateLessonContent(unitId: string, title: string, titleVi: string, grade: number, framework: string): LessonContent {
  const cache = loadUnitCache();
  const unit = cache[unitId];

  // ── PRIMARY PATH: Data-driven unique content per domestic unit ──
  if (unit && unit.vocabulary.length > 0) {
    const { reading, readingVi } = buildReadingFromUnit(unit);
    const grammarNote = unit.patterns.length > 0
      ? `Pattern: "${unit.patterns[0].example}" — ${unit.patterns[0].exampleVi}`
      : `Learn new words about: ${title}`;

    return {
      unitTitle: title, unitTitleVi: titleVi, grade, framework,
      sections: [
        {
          type: 'vocabulary', title: '📚 Key Vocabulary', titleVi: '📚 Từ vựng chính',
          content: unit.vocabulary.map(v => `${v.en} — ${v.vi}`),
        },
        {
          type: 'reading', title: '📖 Reading Passage', titleVi: '📖 Bài đọc',
          content: [reading],
          contentVi: [readingVi],
        },
        {
          type: 'grammar', title: '📝 Grammar Focus', titleVi: '📝 Ngữ pháp trọng tâm',
          content: [unit.patterns.map(p => `"${p.pattern}"`).join(' | ')],
          contentVi: [grammarNote],
          example: unit.patterns[0]?.example,
          exampleVi: unit.patterns[0]?.exampleVi,
        },
        {
          type: 'speaking', title: '🗣️ Practice Sentences', titleVi: '🗣️ Câu luyện tập',
          content: unit.patterns.map(p => p.example),
          contentVi: unit.patterns.map(p => p.exampleVi),
        },
        {
          type: 'tip', title: '💡 Learning Tip', titleVi: '💡 Mẹo học',
          content: [`🎯 Practice saying each word 3 times. Point to objects around you and say their English name!`],
          contentVi: [`🎯 Luyện nói mỗi từ 3 lần. Chỉ vào đồ vật xung quanh và nói tên tiếng Anh của chúng!`],
        },
      ],
    };
  }

  // ── FALLBACK for units not in cache (shouldn't happen for domestic, intl uses buildIntlLessonFromData) ──
  return buildFallbackLesson(title, titleVi, grade, framework);
}

function buildFallbackLesson(title: string, titleVi: string, grade: number, framework: string): LessonContent {
  const theme = FALLBACK_THEME;
  return {
    unitTitle: title, unitTitleVi: titleVi, grade, framework,
    sections: [
      { type: 'vocabulary', title: '📚 Key Vocabulary', titleVi: '📚 Từ vựng chính',
        content: theme.vocab.map(([en, vi]) => `${en} — ${vi}`), },
      { type: 'reading', title: '📖 Reading Passage', titleVi: '📖 Bài đọc',
        content: [theme.reading], contentVi: [theme.readingVi], },
      { type: 'grammar', title: '📝 Grammar Focus', titleVi: '📝 Ngữ pháp trọng tâm',
        content: [theme.grammar], contentVi: [theme.grammarVi],
        example: theme.sentences[0]?.[0], exampleVi: theme.sentences[0]?.[1], },
      { type: 'speaking', title: '🗣️ Practice Sentences', titleVi: '🗣️ Câu luyện tập',
        content: theme.sentences.map(([en]) => en), contentVi: theme.sentences.map(([, vi]) => vi), },
      { type: 'tip', title: '💡 Learning Tip', titleVi: '💡 Mẹo học',
        content: [theme.tip], contentVi: [theme.tipVi], },
    ],
  };
}

import { getAuthenticReading } from '@/data/intl-curriculum-passages';

// ══════════════════════════════════════════════════════════════════
// INTERNATIONAL LESSON BUILDER — receives data as parameters
// Called from learn/page.tsx where data is already loaded via import()
// ══════════════════════════════════════════════════════════════════

interface IntlDataArrays {
  readingPassages: { passageId: string; grade: number; title: string; titleVi: string; text: string;
    questions: { q: string; qVi: string; options: string[]; correct: string }[] }[];
  vocabThemes: { themeId: string; grade: number; title: string; titleVi: string;
    words: string[]; wordsVi: string[] }[];
  grammarTopics: { topicId: string; grade: number; title: string; titleVi: string;
    rules: { rule: string; ruleVi: string; examples: string[]; examplesVi: string[] }[] }[];
}

export function buildIntlLessonFromData(
  unitId: string, title: string, titleVi: string, grade: number, framework: string,
  data: IntlDataArrays,
): LessonContent {
  // Better hash with prime multiplication for good distribution
  const hash = unitId.split('').reduce((acc, ch, i) => ((acc * 31) ^ ch.charCodeAt(0)) >>> 0, 0);

  // Select vocab & grammar — use different seed for each to decorrelate
  const gradeVocabs = data.vocabThemes.filter(v => v.grade === grade);
  const gradeGrammars = data.grammarTopics.filter(g => g.grade === grade);
  const vocabs = gradeVocabs.length > 0 ? gradeVocabs : data.vocabThemes;
  const grammars = gradeGrammars.length > 0 ? gradeGrammars : data.grammarTopics;
  const vocabHash = unitId.split('').reduce((acc, ch) => ((acc * 37) ^ ch.charCodeAt(0)) >>> 0, 7);
  const grammarHash = unitId.split('').reduce((acc, ch) => ((acc * 41) ^ ch.charCodeAt(0)) >>> 0, 13);
  const vocab = vocabs[vocabHash % vocabs.length];
  const grammar = grammars[grammarHash % grammars.length];

  if (!vocab || !grammar) {
    return buildFallbackLesson(title, titleVi, grade, framework);
  }

  // ── GET AUTHENTIC READING PASSAGE ──
  // Use exact texts mapped to unitId (e.g., Cambridge G1 Learner's Book texts)
  const authenticReading = getAuthenticReading(unitId, title, titleVi, vocab.words, vocab.wordsVi);

  // Build speaking sentences from grammar rules
  const speakingSentences = grammar.rules.flatMap(r => r.examples.slice(0, 2));
  const speakingSentencesVi = grammar.rules.flatMap(r => r.examplesVi.slice(0, 2));

  return {
    unitTitle: title, unitTitleVi: titleVi, grade, framework,
    sections: [
      {
        type: 'vocabulary', title: `📚 Vocabulary: ${vocab.title}`, titleVi: `📚 Từ vựng: ${vocab.titleVi}`,
        content: vocab.words.map((en, i) => `${en} — ${vocab.wordsVi[i] ?? en}`),
      },
      {
        type: 'reading', title: `📖 ${title}`, titleVi: `📖 ${titleVi}`,
        content: [authenticReading.text],
        contentVi: [authenticReading.textVi],
      },
      {
        type: 'grammar', title: `📝 ${grammar.title}`, titleVi: `📝 ${grammar.titleVi}`,
        content: grammar.rules.map(r => r.rule),
        contentVi: grammar.rules.map(r => r.ruleVi),
        example: grammar.rules[0]?.examples?.[0],
        exampleVi: grammar.rules[0]?.examplesVi?.[0],
      },
      {
        type: 'speaking', title: '🗣️ Practice Sentences', titleVi: '🗣️ Câu luyện tập',
        content: speakingSentences.length > 0 ? speakingSentences : [`Practice: I like ${title.toLowerCase()}.`],
        contentVi: speakingSentencesVi.length > 0 ? speakingSentencesVi : [`Luyện tập: Tôi thích ${titleVi.toLowerCase()}.`],
      },
      {
        type: 'tip', title: '💡 Learning Tip', titleVi: '💡 Mẹo học',
        content: [LEARNING_TIPS[hash % LEARNING_TIPS.length]],
        contentVi: [LEARNING_TIPS_VI[hash % LEARNING_TIPS_VI.length]],
      },
    ],
  };
}

// ── 12 unique reading templates — filled with unit title + vocab words ──
// Each unit's title is unique → each generated passage is unique

// generateUniqueReading functions removed in favor of getAuthenticReading

const LEARNING_TIPS = [
  '🎯 Read aloud 3 times: whisper → normal → loud. Point to each word as you read!',
  '🎯 Draw a picture for each new word. Visual learners remember 2x better!',
  '🎯 Make flashcards: English on one side, Vietnamese on the other. Quiz yourself daily!',
  '🎯 Try to use one new word in a real conversation today. Practice makes perfect!',
  '🎯 Write each word 5 times in your notebook. Your hand remembers what your brain forgets!',
  '🎯 Teach someone else what you learned. Teaching is the best way to remember!',
  '🎯 Listen to English songs or watch cartoons in English. Your ears will learn too!',
  '🎯 Before bed, say all the new words you learned today. Sleep helps your brain remember!',
  '🎯 Group similar words together. Learning in categories is easier than random words!',
  '🎯 Challenge yourself: close the book and write down as many words as you can remember!',
];

const LEARNING_TIPS_VI = [
  '🎯 Đọc to 3 lần: thì thầm → bình thường → to. Chỉ vào từng từ khi đọc!',
  '🎯 Vẽ một bức tranh cho mỗi từ mới. Người học bằng hình ảnh nhớ tốt gấp 2 lần!',
  '🎯 Làm thẻ nhớ: tiếng Anh một mặt, tiếng Việt một mặt. Tự kiểm tra mỗi ngày!',
  '🎯 Hãy dùng một từ mới trong cuộc trò chuyện thực tế hôm nay. Luyện tập tạo nên hoàn hảo!',
  '🎯 Viết mỗi từ 5 lần vào vở. Tay bạn sẽ nhớ những gì não quên!',
  '🎯 Dạy người khác những gì bạn đã học. Dạy là cách tốt nhất để nhớ!',
  '🎯 Nghe bài hát hoặc xem phim hoạt hình tiếng Anh. Tai bạn cũng sẽ học theo!',
  '🎯 Trước khi ngủ, hãy nói tất cả các từ mới hôm nay. Giấc ngủ giúp não nhớ lâu!',
  '🎯 Nhóm các từ giống nhau lại. Học theo nhóm dễ hơn học từ lẻ!',
  '🎯 Thử thách: gấp sách lại và viết ra càng nhiều từ bạn nhớ càng tốt!',
];


// ── Lesson Phase UI Component ──
interface LessonPhaseProps {
  lesson: LessonContent;
  onStartQuiz: () => void;
  lang?: 'vi' | 'en';
}

export function LessonPhase({ lesson, onStartQuiz, lang = 'vi' }: LessonPhaseProps) {
  const [sectionIdx, setSectionIdx] = useState(0);
  const section = lesson.sections[sectionIdx];
  const isLast = sectionIdx === lesson.sections.length - 1;
  const isVi = lang === 'vi';

  const glass = {
    card: { background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', borderRadius: 20, padding: 24, border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' } as React.CSSProperties,
  };

  const sectionIcons: Record<string, React.ReactNode> = {
    vocabulary: <BookOpen size={20} />,
    reading: <BookOpen size={20} />,
    grammar: <Pencil size={20} />,
    speaking: <Volume2 size={20} />,
    tip: <Lightbulb size={20} />,
  };

  return (
    <div>
      {/* Unit Header */}
      <div style={{ ...glass.card, marginBottom: 16, background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.1))' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: 1 }}>
          {isVi ? 'BÀI HỌC' : 'LESSON'} — Grade {lesson.grade}
        </div>
        <div style={{ fontSize: 22, fontWeight: 900, color: '#1e1b4b', marginTop: 4 }}>
          {lesson.unitTitle}
        </div>
        <div style={{ fontSize: 14, color: '#6366f1', marginTop: 2 }}>
          {lesson.unitTitleVi}
        </div>
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 16 }}>
        {lesson.sections.map((s, i) => (
          <button
            key={i}
            onClick={() => setSectionIdx(i)}
            style={{
              width: i === sectionIdx ? 28 : 10, height: 10, borderRadius: 5, border: 'none', cursor: 'pointer',
              background: i < sectionIdx ? '#22c55e' : i === sectionIdx ? '#6366f1' : '#cbd5e1',
              transition: 'all 0.3s',
            }}
            aria-label={`Section ${i + 1}`}
          />
        ))}
      </div>

      {/* Section Content */}
      <div style={glass.card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: '#f0e6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed' }}>
            {sectionIcons[section.type] || <Star size={20} />}
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#1e1b4b' }}>
              {isVi ? section.titleVi : section.title}
            </div>
            <div style={{ fontSize: 12, color: '#64748b' }}>
              {sectionIdx + 1} / {lesson.sections.length}
            </div>
          </div>
        </div>

        {/* Content rendering */}
        {section.type === 'vocabulary' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {section.content.map((item, i) => {
              const [en, vi] = item.split(' — ');
              return (
                <div key={i} style={{ background: '#f8fafc', borderRadius: 12, padding: '12px 14px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#1e1b4b' }}>{en}</div>
                  <div style={{ fontSize: 13, color: '#6366f1', marginTop: 2 }}>{vi}</div>
                </div>
              );
            })}
          </div>
        )}

        {section.type === 'reading' && (
          <div>
            <div style={{ background: '#fefce8', borderRadius: 14, padding: 20, fontSize: 16, lineHeight: 2, color: '#1e1b4b', whiteSpace: 'pre-line', border: '1px solid #fde68a', marginBottom: 12 }}>
              {section.content[0]}
            </div>
            {section.contentVi?.[0] && (
              <details style={{ marginTop: 8 }}>
                <summary style={{ cursor: 'pointer', color: '#6366f1', fontSize: 13, fontWeight: 600 }}>
                  {isVi ? '📖 Xem bản dịch tiếng Việt' : '📖 Vietnamese translation'}
                </summary>
                <div style={{ background: '#f0fdf4', borderRadius: 12, padding: 16, fontSize: 14, lineHeight: 1.8, color: '#166534', marginTop: 8, whiteSpace: 'pre-line' }}>
                  {section.contentVi[0]}
                </div>
              </details>
            )}
          </div>
        )}

        {section.type === 'grammar' && (
          <div>
            <div style={{ background: '#eff6ff', borderRadius: 14, padding: 18, fontSize: 15, lineHeight: 1.7, color: '#1e40af', border: '1px solid #bfdbfe' }}>
              <Brain size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
              {isVi ? section.contentVi?.[0] : section.content[0]}
            </div>
            {section.example && (
              <div style={{ marginTop: 12, background: '#f8fafc', borderRadius: 12, padding: 14, borderLeft: '4px solid #6366f1' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1e1b4b' }}>✏️ {section.example}</div>
                {section.exampleVi && <div style={{ fontSize: 13, color: '#6366f1', marginTop: 4 }}>→ {section.exampleVi}</div>}
              </div>
            )}
          </div>
        )}

        {section.type === 'speaking' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {section.content.map((sentence, i) => (
              <div key={i} style={{ background: '#faf5ff', borderRadius: 12, padding: '14px 16px', border: '1px solid #e9d5ff', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#7c3aed', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#1e1b4b' }}>{sentence}</div>
                  {section.contentVi?.[i] && <div style={{ fontSize: 13, color: '#7c3aed', marginTop: 2 }}>{section.contentVi[i]}</div>}
                </div>
              </div>
            ))}
            <div style={{ textAlign: 'center', fontSize: 13, color: '#64748b', marginTop: 4 }}>
              🎤 {isVi ? 'Đọc to từng câu 3 lần!' : 'Read each sentence aloud 3 times!'}
            </div>
          </div>
        )}

        {section.type === 'tip' && (
          <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: 14, padding: 20, fontSize: 16, lineHeight: 1.7, color: '#92400e', fontWeight: 600 }}>
            {isVi ? section.contentVi?.[0] : section.content[0]}
          </div>
        )}

        {/* Navigation buttons */}
        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          {sectionIdx > 0 && (
            <button
              onClick={() => setSectionIdx(sectionIdx - 1)}
              style={{ flex: 1, padding: '14px 20px', borderRadius: 14, border: '1px solid #e2e8f0', background: '#f8fafc', color: '#475569', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
            >
              ← {isVi ? 'Trước' : 'Back'}
            </button>
          )}
          {!isLast ? (
            <button
              onClick={() => setSectionIdx(sectionIdx + 1)}
              style={{ flex: 1, padding: '14px 20px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              {isVi ? 'Tiếp theo' : 'Next'} <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={onStartQuiz}
              style={{ flex: 1, padding: '14px 20px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              🎯 {isVi ? 'Bắt đầu luyện tập!' : 'Start Practice!'} <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
