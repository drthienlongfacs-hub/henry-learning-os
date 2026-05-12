'use client';
import { useState, useEffect } from 'react';
import {
  EXAM_PRACTICE_BANK_STATS,
  PRACTICE_TESTS,
  type PracticeQuestion,
  type PracticeTest,
} from '@/data/practice-test-bank';
import { CAMBRIDGE_EXAM_SPECS, type CambridgeExamLevelId } from '@/data/cambridge-official-framework';
import { speak } from '@/lib/voiceEngine';

type TestState = 'menu' | 'testing' | 'review';
type PracticeLevel = PracticeTest['level'];

const isSelfAssessmentQuestion = (question: PracticeQuestion) =>
  question.selfAssessment || question.taskTypeEn === 'Speaking' || question.taskTypeEn === 'Writing';

const levelForGrade = (grade: number): PracticeLevel => {
  if (grade <= 2) return 'starters';
  if (grade === 3) return 'movers';
  if (grade <= 5) return 'flyers';
  if (grade <= 7) return 'ket';
  return 'pet';
};

export default function PracticeTestEngine({ grade = 1 }: { grade?: number }) {
  const [state, setState] = useState<TestState>('menu');
  const [activeTest, setActiveTest] = useState<PracticeTest | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [spellInput, setSpellInput] = useState('');
  const [loadingAudioId, setLoadingAudioId] = useState<string | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<PracticeLevel>(levelForGrade(grade));
  const [selectedSetNo, setSelectedSetNo] = useState(1);

  const allQuestions = activeTest?.parts.flatMap(p => p.questions) ?? [];
  const total = allQuestions.length;
  const q = allQuestions[currentQ];

  // Timer
  useEffect(() => {
    if (state !== 'testing' || timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(t);
  }, [state, timeLeft]);

  const startTest = (test: PracticeTest) => {
    setActiveTest(test);
    setCurrentQ(0);
    setAnswers({});
    setShowExplanation(null);
    setSpellInput('');
    setTimeLeft(test.totalMinutes * 60);
    setState('testing');
  };

  const selectAnswer = (qId: string, ans: string) => {
    setAnswers(prev => ({ ...prev, [qId]: ans }));
  };

  const isCorrectAnswer = (userAns: string, correctAns: string) => {
    const u = (userAns || '').trim().toLowerCase();
    const c = correctAns.trim().toLowerCase();
    if (!u) return false;
    // Exact match
    if (u === c) return true;
    // User selected full option text like "A. Swimming..." but answer is just "A"
    // Extract leading letter from both and compare
    const uLetter = u.match(/^([a-z])[\.\)\s]/)?.[1];
    const cLetter = c.match(/^([a-z])[\.\)\s]/)?.[1] || (c.length === 1 ? c : null);
    if (uLetter && cLetter && uLetter === cLetter) return true;
    // Answer is full text "A. YES" and user stored "A. YES"
    if (u.startsWith(c + '.') || u.startsWith(c + ' ')) return true;
    // Gap-fill: accept alternate answers separated by /
    const alts = c.split('/').map(s => s.trim());
    if (alts.some(alt => u === alt)) return true;
    return false;
  };

  const score = allQuestions.filter(q => {
    if (isSelfAssessmentQuestion(q)) return Boolean(answers[q.id]);
    return isCorrectAnswer(answers[q.id] || '', q.answer);
  }).length;
  const shields = total > 0 ? Math.round((score / total) * 5) : 0;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  // Show ALL available levels, not just one grade
  const LEVEL_INFO: { key: string; label: string; cefr: string; color: string }[] = [
    { key: 'starters', label: '🌟 Starters', cefr: 'Pre A1', color: '#68d391' },
    { key: 'movers', label: '🚀 Movers', cefr: 'A1', color: '#63b3ed' },
    { key: 'flyers', label: '🦅 Flyers', cefr: 'A2', color: '#f6ad55' },
    { key: 'ket', label: '🔑 KET (Key)', cefr: 'A2+', color: '#fc8181' },
    { key: 'pet', label: '📋 PET (Preliminary)', cefr: 'B1', color: '#b794f4' },
  ];
  const levelTests = PRACTICE_TESTS.filter(t => t.level === selectedLevel);
  const availableSetNumbers = Array.from(new Set(levelTests.map(t => t.setNo ?? 0))).sort((a, b) => a - b);
  const availableTests = levelTests.filter(t => (t.setNo ?? 0) === selectedSetNo);
  const activeSpec = CAMBRIDGE_EXAM_SPECS[selectedLevel as CambridgeExamLevelId];

  const card = { background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: 14, border: '1px solid rgba(255,255,255,0.08)', marginBottom: 10 };

  // ═══ MENU ═══
  if (state === 'menu') return (
    <div style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', borderRadius: 20, padding: 20, color: '#fff', fontFamily: "'Inter',sans-serif" }}>
      <h2 style={{ textAlign: 'center', fontSize: 20, fontWeight: 800, margin: '0 0 4px', background: 'linear-gradient(90deg,#f9d423,#ff4e50)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        🎯 Thi thử Cambridge
      </h2>
      <p style={{ textAlign: 'center', fontSize: 12, color: '#a0aec0', margin: '0 0 12px' }}>
        {EXAM_PRACTICE_BANK_STATS.generatedSetCountPerLevel} bộ đề/level • Bộ {selectedSetNo} có {availableTests.length} component • {availableTests.reduce((s,t) => s + t.parts.flatMap(p=>p.questions).length, 0)} câu/prompt
      </p>
      <div style={{ ...card, background: 'rgba(72,187,120,0.08)', borderColor: 'rgba(72,187,120,0.2)' }}>
        <p style={{ margin: 0, fontSize: 12, color: '#c6f6d5', lineHeight: 1.55 }}>
          Nguồn chính thức: cấu trúc, số phần và số câu bám Cambridge English. Nội dung trong app là đề tự luyện gốc của Henry, không sao chép đề chính thức. Muốn làm đề chính thức, mở link Cambridge trong phần hướng dẫn.
        </p>
      </div>

      {/* Level tabs */}
      <div style={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
        {LEVEL_INFO.map(lv => (
          <button key={lv.key} onClick={() => { setSelectedLevel(lv.key as PracticeLevel); setSelectedSetNo(1); }} style={{
            padding: '5px 10px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: selectedLevel === lv.key ? 800 : 500,
            background: selectedLevel === lv.key ? lv.color : 'rgba(255,255,255,0.08)',
            color: selectedLevel === lv.key ? '#0f0c29' : '#a0aec0', transition: 'all 0.2s',
          }}>
            {lv.label} <span style={{ fontSize: 9, opacity: 0.7 }}>({lv.cefr})</span>
          </button>
        ))}
      </div>

      {/* Full-set picker */}
      <div style={{ display: 'flex', gap: 4, overflowX: 'auto', paddingBottom: 6, marginBottom: 12 }}>
        {availableSetNumbers.map(setNo => (
          <button key={setNo} onClick={() => setSelectedSetNo(setNo)} style={{
            minWidth: 44,
            padding: '6px 9px',
            borderRadius: 8,
            border: selectedSetNo === setNo ? '1px solid #f9d423' : '1px solid rgba(255,255,255,0.08)',
            cursor: 'pointer',
            fontSize: 11,
            fontWeight: 800,
            background: selectedSetNo === setNo ? 'rgba(249,212,35,0.18)' : 'rgba(255,255,255,0.06)',
            color: selectedSetNo === setNo ? '#f9d423' : '#cbd5e0',
          }}>
            {setNo === 0 ? 'Đề gốc' : `Bộ ${setNo}`}
          </button>
        ))}
      </div>

      {activeSpec && (
        <div style={{ ...card, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          <div>
            <div style={{ fontSize: 10, color: '#a0aec0' }}>Chuẩn</div>
            <div style={{ fontSize: 12, color: '#fff', fontWeight: 800 }}>{activeSpec.officialName}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#a0aec0' }}>CEFR</div>
            <div style={{ fontSize: 12, color: '#fff', fontWeight: 800 }}>{activeSpec.cefr}</div>
          </div>
          <a href={activeSpec.officialSampleUrl} target="_blank" rel="noreferrer" style={{ color: '#63b3ed', fontSize: 12, fontWeight: 800, textDecoration: 'none', alignSelf: 'center' }}>
            Đề mẫu chính thức ↗
          </a>
        </div>
      )}

      {availableTests.map(t => {
        const hasSourcePages = t.parts.some(p => p.sourcePages && p.sourcePages.length > 0);
        return (
        <div key={t.id} style={{ ...card, cursor: 'pointer', borderLeft: hasSourcePages ? '3px solid #68d391' : '3px solid rgba(246,173,85,0.4)' }} onClick={() => startTest(t)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: 15, color: '#f9d423' }}>📝 {t.skillVi}</h4>
              <p style={{ margin: '3px 0', fontSize: 12, color: '#a0aec0' }}>
                {t.level.charAt(0).toUpperCase() + t.level.slice(1)} • {t.parts.flatMap(p => p.questions).length} câu • {t.totalMinutes} phút
              </p>
            </div>
            <span style={{ fontSize: 24 }}>▶️</span>
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            {hasSourcePages && (
              <span style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(72,187,120,0.15)', color: '#68d391', borderRadius: 4, fontWeight: 700 }}>
                📘 Đề gốc đầy đủ
              </span>
            )}
            {!hasSourcePages && (
              <span style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(246,173,85,0.12)', color: '#f6ad55', borderRadius: 4, fontWeight: 600 }}>
                📝 Tự luyện (text-only)
              </span>
            )}
            {t.parts.map(p => (
              <span key={p.partNumber} style={{ fontSize: 10, padding: '2px 6px', background: 'rgba(99,179,237,0.15)', color: '#63b3ed', borderRadius: 4 }}>
                Part {p.partNumber}: {p.titleVi}
              </span>
            ))}
          </div>
        </div>
        );
      })}
      <p style={{ fontSize: 10, color: '#a0aec0', textAlign: 'center', marginTop: 8 }}>
        📊 Practice theo format Cambridge • audio TTS tức thì • đáp án/giải thích/rubric • không copy đề chính thức
      </p>
    </div>
  );

  // ═══ REVIEW ═══
  if (state === 'review') return (
    <div style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', borderRadius: 20, padding: 20, color: '#fff', fontFamily: "'Inter',sans-serif" }}>
      {/* Score summary */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 48 }}>{'🛡️'.repeat(shields)}{'⬜'.repeat(5 - shields)}</div>
        <h3 style={{ margin: '4px 0', fontSize: 20, color: '#f9d423' }}>{score}/{total} câu đúng</h3>
        <p style={{ fontSize: 12, color: '#a0aec0' }}>
          {shields >= 4 ? '🌟 Xuất sắc! Sẵn sàng thi thật!' : shields >= 3 ? '👍 Khá tốt! Ôn thêm phần sai.' : '💪 Cần luyện thêm. Xem giải thích bên dưới.'}
        </p>
      </div>

      {/* Per-question review */}
      {activeTest?.parts.map(part => (
        <div key={part.partNumber}>
          <h4 style={{ fontSize: 13, color: '#63b3ed', margin: '12px 0 6px', borderBottom: '1px solid rgba(99,179,237,0.2)', paddingBottom: 3 }}>
            Part {part.partNumber}: {part.titleVi}
          </h4>
          {part.questions.map((q) => {
            const userAns = answers[q.id];
            const correct = isSelfAssessmentQuestion(q)
              ? Boolean(userAns)
              : isCorrectAnswer(userAns || '', q.answer);
            return (
              <div key={q.id} style={{ ...card, borderLeft: `3px solid ${correct ? '#68d391' : '#fc8181'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>
                    {q.imageEmoji && <span style={{ marginRight: 4 }}>{q.imageEmoji}</span>}
                    {q.prompt}
                  </span>
                  <span style={{ fontSize: 18 }}>{correct ? '✅' : '❌'}</span>
                </div>
                {!isSelfAssessmentQuestion(q) ? (
                  <div style={{ fontSize: 12, marginTop: 4 }}>
                    {!correct && <p style={{ margin: '2px 0', color: '#fc8181' }}>❌ Bạn chọn: {userAns || '(chưa trả lời)'}</p>}
                    <p style={{ margin: '2px 0', color: '#68d391' }}>✅ Đáp án: {q.answer}</p>
                  </div>
                ) : (
                  <p style={{ margin: '4px 0 0', color: '#68d391', fontSize: 12 }}>✅ Đã hoàn thành câu tự đánh giá.</p>
                )}

                {/* Expandable explanation */}
                <div onClick={() => setShowExplanation(showExplanation === q.id ? null : q.id)}
                  style={{ cursor: 'pointer', marginTop: 6, padding: '4px 8px', background: 'rgba(249,212,35,0.06)', borderRadius: 6, fontSize: 11, color: '#f9d423' }}>
                  {showExplanation === q.id ? '▼' : '▶'} Xem giải thích & chiến lược
                </div>
                {showExplanation === q.id && (
                  <div style={{ marginTop: 6, padding: '8px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                    <p style={{ margin: '0 0 4px', fontSize: 12, color: '#e2e8f0' }}>
                      📖 <strong>{isSelfAssessmentQuestion(q) ? 'Gợi ý mẫu' : 'Giải thích'}:</strong> {q.modelAnswer || q.explanationVi}
                    </p>
                    {q.rubricVi?.map((rubric, index) => (
                      <p key={index} style={{ margin: '2px 0', fontSize: 11, color: '#cbd5e0' }}>• {rubric}</p>
                    ))}
                    <p style={{ margin: 0, fontSize: 12, color: '#68d391' }}>
                      🧠 <strong>Chiến lược:</strong> {q.strategyVi}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      <button onClick={() => setState('menu')} style={{
        width: '100%', padding: '10px', border: 'none', borderRadius: 10, cursor: 'pointer',
        background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', fontSize: 14, fontWeight: 700, marginTop: 10,
      }}>🔄 Làm lại</button>
    </div>
  );

  // ═══ TESTING ═══
  if (!q) return null;
  const currentPart = activeTest?.parts.find(p => p.questions.includes(q));
  const isSpellType = q.taskTypeEn === 'Spell';
  // RCA fix: open gap fill questions have options=[] → need text input
  const isOpenGapFill = !isSpellType && (!q.options || q.options.length === 0);
  const isSelfAssessmentType = isSelfAssessmentQuestion(q);

  // Visual-dependency detection: warn when question requires images but part has none
  const VISUAL_TASK_TYPES = ['Draw lines', 'Draw Lines', 'Colour', 'Color', 'Colour and write', 'Tô màu', 'Nối tranh', 'Matching'];
  const isVisualDependent = VISUAL_TASK_TYPES.some(t =>
    q.taskTypeEn?.toLowerCase().includes(t.toLowerCase()) ||
    q.taskTypeVi?.toLowerCase().includes(t.toLowerCase())
  );
  const partHasImages = Boolean(currentPart?.sourcePages?.length || currentPart?.partImage || q.imagePath);
  const showVisualWarning = isVisualDependent && !partHasImages;

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', borderRadius: 20, padding: 16, color: '#fff', fontFamily: "'Inter',sans-serif" }}>
      {/* Header: timer + progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: 12, color: '#a0aec0' }}>
          Part {currentPart?.partNumber}: {currentPart?.titleVi}
        </span>
        <span style={{ fontSize: 13, fontWeight: 700, color: timeLeft < 60 ? '#fc8181' : '#f9d423' }}>
          ⏱ {mins}:{secs.toString().padStart(2, '0')}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, marginBottom: 12 }}>
        <div style={{ height: '100%', width: `${((currentQ + 1) / total) * 100}%`, background: 'linear-gradient(90deg, #667eea, #764ba2)', borderRadius: 2, transition: 'width 0.3s' }} />
      </div>

      <p style={{ fontSize: 11, color: '#a0aec0', margin: '0 0 8px' }}>
        Câu {currentQ + 1}/{total} • {currentPart?.instructionVi}
      </p>

      {/* ⚠️ Visual Dependency Warning — RCA systemic fix */}
      {showVisualWarning && (
        <div style={{
          marginBottom: 12, padding: '10px 14px', borderRadius: 12,
          background: 'linear-gradient(135deg, rgba(246,173,85,0.15), rgba(237,137,54,0.1))',
          border: '1px solid rgba(246,173,85,0.3)',
        }}>
          <p style={{ margin: 0, fontSize: 12, color: '#f6ad55', fontWeight: 600 }}>
            🖼️ Câu hỏi này yêu cầu quan sát tranh trong sách. Hãy mở sách bài thi gốc để xem tranh minh họa.
          </p>
          <p style={{ margin: '4px 0 0', fontSize: 11, color: '#ed8936' }}>
            Dạng bài: {q.taskTypeVi} — cần hình ảnh gốc từ đề thi Cambridge.
          </p>
        </div>
      )}

      {/* Part Audio (if any) */}
      {currentPart?.audioUrl && (
        <div style={{ marginBottom: 16 }}>
          <audio controls src={currentPart.audioUrl} style={{ width: '100%', borderRadius: 8 }} />
        </div>
      )}

      {/* Part illustration images (Source Pages) */}
      {(currentPart?.sourcePages?.length || currentPart?.partImage) && (
        <div style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {currentPart?.sourcePages?.map((pageSrc, idx) => (
            <div key={idx} style={{ width: '100%', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: '#fff' }}>
              <img src={pageSrc} alt={`Source page ${idx + 1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
          ))}
          {(!currentPart?.sourcePages || currentPart.sourcePages.length === 0) && currentPart?.partImage && (
            <div style={{ borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <img src={currentPart.partImage} alt={currentPart.titleVi} style={{ width: '100%', maxHeight: 240, objectFit: 'contain', background: 'rgba(255,255,255,0.04)' }} />
            </div>
          )}
        </div>
      )}

      {/* Question */}
      <div style={{ ...card, padding: 16 }}>
        {q.imagePath && <img src={q.imagePath} alt={q.prompt} style={{ width: '100%', maxHeight: 280, objectFit: 'contain', borderRadius: 12, marginBottom: 10, border: '1px solid rgba(255,255,255,0.1)' }} />}
        {q.imageEmoji && !q.imagePath && <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 8 }}>{q.imageEmoji}</div>}
        <p style={{ fontSize: 16, fontWeight: 600, margin: '0 0 12px', lineHeight: 1.5, whiteSpace: 'pre-line' }}>{q.prompt}</p>

        {q.audioUrl ? (
          <div style={{ marginBottom: 16 }}>
            <audio controls src={q.audioUrl} style={{ width: '100%', borderRadius: 8 }} />
          </div>
        ) : q.audioTranscript ? (
          <button 
            disabled={loadingAudioId === q.id}
            onClick={() => {
              if (playingAudioId === q.id) return;
              setLoadingAudioId(q.id);
              speak(
                q.audioTranscript!, 
                'en-GB', 
                0.92, 
                () => { setLoadingAudioId(null); setPlayingAudioId(null); }, // onEnd
                () => { setLoadingAudioId(null); setPlayingAudioId(q.id); }  // onStart
              );
            }}
            style={{ width: '100%', padding: 12, background: playingAudioId === q.id ? '#48bb78' : 'linear-gradient(90deg, #667eea, #764ba2)', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: loadingAudioId === q.id ? 'not-allowed' : 'pointer', marginBottom: 16, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, opacity: loadingAudioId === q.id ? 0.7 : 1 }}
          >
            {loadingAudioId === q.id ? '⏳ Đang tải audio...' : playingAudioId === q.id ? '🔊 Đang phát...' : '🔊 Nghe đoạn hội thoại (Audio)'}
          </button>
        ) : null}

        {/* === ANSWER INPUT SECTION === */}
        {/* Type 1: Spell (Starters — unscramble letters) */}
        {isSpellType && (
          <div>
            <input type="text" value={spellInput} onChange={e => { setSpellInput(e.target.value); selectAnswer(q.id, e.target.value.toLowerCase().trim()); }}
              placeholder="Gõ từ ở đây..."
              autoComplete="off" autoCapitalize="off" spellCheck={false}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '2px solid rgba(102,126,234,0.4)', background: 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 18, outline: 'none', boxSizing: 'border-box', letterSpacing: 2, fontWeight: 600 }}
            />
          </div>
        )}

        {/* Type 2: Open gap fill (KET/PET — type one word/number) */}
        {isOpenGapFill && !isSelfAssessmentType && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 18 }}>✏️</span>
              <span style={{ fontSize: 12, color: '#a0aec0' }}>Gõ câu trả lời vào ô bên dưới:</span>
            </div>
            <input 
              type="text" 
              value={answers[q.id] || ''} 
              onChange={e => selectAnswer(q.id, e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && answers[q.id] && currentQ < total - 1) {
                  setCurrentQ(currentQ + 1); setSpellInput('');
                }
              }}
              placeholder="Gõ 1 từ hoặc số..."
              autoComplete="off" autoCapitalize="off" spellCheck={false}
              style={{ 
                width: '100%', padding: '14px 16px', borderRadius: 12, 
                border: '2px solid rgba(102,126,234,0.5)', 
                background: 'rgba(102,126,234,0.08)', 
                color: '#fff', fontSize: 20, fontWeight: 600,
                outline: 'none', boxSizing: 'border-box',
                letterSpacing: 1,
                transition: 'border-color 0.2s',
              }}
              onFocus={e => { e.target.style.borderColor = '#667eea'; }}
              onBlur={e => { e.target.style.borderColor = 'rgba(102,126,234,0.5)'; }}
            />
            <p style={{ fontSize: 10, color: '#718096', marginTop: 4, marginBottom: 0 }}>
              💡 Nhấn Enter để sang câu tiếp theo
            </p>
          </div>
        )}

        {/* Type 3: Speaking (self-assessment — show sample, mark yourself) */}
        {isSelfAssessmentType && (
          <div>
            {/* Show/hide sample answer */}
            <button 
              onClick={() => {
                setShowExplanation(showExplanation === q.id ? null : q.id);
                if (!answers[q.id]) selectAnswer(q.id, q.answer); // auto-mark as "done"
              }}
              style={{ 
                width: '100%', padding: 12, borderRadius: 10, border: 'none', cursor: 'pointer',
                background: showExplanation === q.id ? 'rgba(72,187,120,0.2)' : 'linear-gradient(135deg, #48bb78, #38a169)',
                color: '#fff', fontSize: 14, fontWeight: 600, marginBottom: 8,
              }}
            >
              {showExplanation === q.id ? '🔽 Ẩn gợi ý' : '💬 Xem rubric & trả lời mẫu'}
            </button>
            {showExplanation === q.id && (
              <div style={{ padding: '12px 14px', background: 'rgba(72,187,120,0.08)', borderRadius: 10, border: '1px solid rgba(72,187,120,0.2)' }}>
                <p style={{ margin: '0 0 6px', fontSize: 13, color: '#68d391', fontWeight: 600 }}>📝 Gợi ý trả lời:</p>
                <p style={{ margin: '0 0 8px', fontSize: 13, color: '#e2e8f0', lineHeight: 1.6, fontStyle: 'italic' }}>
                  &quot;{(q.modelAnswer || q.explanationVi)?.replace(/^Gợi ý:\s*/, '').replace(/^"/, '').replace(/"$/, '')}&quot;
                </p>
                {q.rubricVi?.map((rubric, index) => (
                  <p key={index} style={{ margin: '2px 0', fontSize: 11, color: '#cbd5e0' }}>• {rubric}</p>
                ))}
                {q.strategyVi && (
                  <p style={{ margin: 0, fontSize: 11, color: '#a0aec0' }}>
                    🧠 <strong>Mẹo:</strong> {q.strategyVi}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Type 4: MCQ (standard multiple choice with options) */}
        {!isSpellType && !isOpenGapFill && !isSelfAssessmentType && q.options?.map((opt, i) => {
          const selected = answers[q.id] === opt;
          return (
            <button key={i} onClick={() => selectAnswer(q.id, opt)} style={{
              width: '100%', padding: '10px 12px', marginBottom: 6, borderRadius: 10, border: 'none', cursor: 'pointer',
              textAlign: 'left', fontSize: 14, fontWeight: selected ? 700 : 400, transition: 'all 0.2s',
              background: selected ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.06)',
              color: '#fff',
            }}>
              {String.fromCharCode(65 + i)}. {opt}
            </button>
          );
        })}
      </div>

      {/* Nav buttons */}
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        {currentQ > 0 && (
          <button onClick={() => { setCurrentQ(currentQ - 1); setShowExplanation(null); setSpellInput(''); }} style={{
            flex: 1, padding: '10px', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10,
            background: 'transparent', color: '#fff', fontSize: 13, cursor: 'pointer',
          }}>← Quay lại</button>
        )}
        {currentQ < total - 1 ? (
          <button onClick={() => { setCurrentQ(currentQ + 1); setShowExplanation(null); setSpellInput(''); }} disabled={!answers[q.id]} style={{
            flex: 1, padding: '10px', border: 'none', borderRadius: 10, cursor: answers[q.id] ? 'pointer' : 'not-allowed',
            background: answers[q.id] ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.1)',
            color: '#fff', fontSize: 13, fontWeight: 700,
          }}>Tiếp theo →</button>
        ) : (
          <button onClick={() => setState('review')} disabled={!answers[q.id]} style={{
            flex: 1, padding: '10px', border: 'none', borderRadius: 10, cursor: answers[q.id] ? 'pointer' : 'not-allowed',
            background: answers[q.id] ? 'linear-gradient(135deg, #f9d423, #ff4e50)' : 'rgba(255,255,255,0.1)',
            color: '#fff', fontSize: 13, fontWeight: 700,
          }}>🏆 Nộp bài & Xem kết quả</button>
        )}
      </div>

      {/* Quick jump dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 3, marginTop: 10, flexWrap: 'wrap' }}>
        {allQuestions.map((_, i) => (
          <div key={i} onClick={() => { setCurrentQ(i); setSpellInput(''); }} style={{
            width: 8, height: 8, borderRadius: '50%', cursor: 'pointer',
            background: i === currentQ ? '#f9d423' : answers[allQuestions[i].id] ? '#68d391' : 'rgba(255,255,255,0.2)',
          }} />
        ))}
      </div>
    </div>
  );
}
