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
  const en: string[] = [];
  const vi: string[] = [];

  // Opening — introduce the topic
  if (v.length >= 3) {
    en.push(`Today we will learn about ${v[0].en}, ${v[1].en}, and ${v[2].en}.`);
    vi.push(`Hôm nay chúng ta sẽ học về ${v[0].vi}, ${v[1].vi}, và ${v[2].vi}.`);
  }

  // Use each pattern's example sentence (unique per unit!)
  for (const pat of p.slice(0, 3)) {
    en.push(pat.example);
    vi.push(pat.exampleVi);
  }

  // Vocabulary in context
  for (const word of v.slice(3, 6)) {
    en.push(`Can you say "${word.en}"? It means "${word.vi}" in Vietnamese.`);
    vi.push(`Bạn nói được "${word.en}" không? Nó nghĩa là "${word.vi}".`);
  }

  // Closing
  en.push(`Great job! Now you know words about "${unit.title}".`);
  vi.push(`Giỏi lắm! Bây giờ bạn biết các từ về "${unit.title}".`);

  return { reading: en.join(' '), readingVi: vi.join(' ') };
}

export function generateLessonContent(unitId: string, title: string, titleVi: string, grade: number, framework: string): LessonContent {
  const cache = loadUnitCache();
  const unit = cache[unitId];

  // ── PRIMARY PATH: Data-driven unique content per unit ──
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

  // ── FALLBACK: generic theme (only for non-unit international topics) ──
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
