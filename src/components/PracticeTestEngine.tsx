'use client';
import { useState, useEffect, useCallback } from 'react';
import { PRACTICE_TESTS, type PracticeTest, type PracticeQuestion } from '@/data/practice-test-bank';

type TestState = 'menu' | 'testing' | 'review';

export default function PracticeTestEngine({ grade = 1 }: { grade?: number }) {
  const [state, setState] = useState<TestState>('menu');
  const [activeTest, setActiveTest] = useState<PracticeTest | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [spellInput, setSpellInput] = useState('');

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

  const score = allQuestions.filter(q => answers[q.id] === q.answer).length;
  const shields = total > 0 ? Math.round((score / total) * 5) : 0;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  const levelMap: Record<number, string> = { 1: 'starters', 2: 'starters', 3: 'movers', 4: 'flyers', 5: 'flyers' };
  const currentLevel = levelMap[grade] || 'starters';
  const availableTests = PRACTICE_TESTS.filter(t => t.level === currentLevel);

  const card = { background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: 14, border: '1px solid rgba(255,255,255,0.08)', marginBottom: 10 };

  // ═══ MENU ═══
  if (state === 'menu') return (
    <div style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', borderRadius: 20, padding: 20, color: '#fff', fontFamily: "'Inter',sans-serif" }}>
      <h2 style={{ textAlign: 'center', fontSize: 20, fontWeight: 800, margin: '0 0 4px', background: 'linear-gradient(90deg,#f9d423,#ff4e50)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        🎯 Thi thử Cambridge YLE
      </h2>
      <p style={{ textAlign: 'center', fontSize: 12, color: '#a0aec0', margin: '0 0 16px' }}>
        Mô phỏng 100% đề thi thật — có đáp án chi tiết & chiến lược làm bài
      </p>
      {availableTests.map(t => (
        <div key={t.id} style={{ ...card, cursor: 'pointer' }} onClick={() => startTest(t)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: 15, color: '#f9d423' }}>📝 {t.skillVi}</h4>
              <p style={{ margin: '3px 0', fontSize: 12, color: '#a0aec0' }}>
                {t.level.charAt(0).toUpperCase() + t.level.slice(1)} • {t.parts.flatMap(p => p.questions).length} câu • {t.totalMinutes} phút
              </p>
            </div>
            <span style={{ fontSize: 24 }}>▶️</span>
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
            {t.parts.map(p => (
              <span key={p.partNumber} style={{ fontSize: 10, padding: '2px 6px', background: 'rgba(99,179,237,0.15)', color: '#63b3ed', borderRadius: 4 }}>
                Part {p.partNumber}: {p.titleVi}
              </span>
            ))}
          </div>
        </div>
      ))}
      <p style={{ fontSize: 10, color: '#a0aec0', textAlign: 'center', marginTop: 8 }}>
        📊 Đề thi theo chuẩn Cambridge Assessment • Đáp án có giải thích + chiến lược
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
          {part.questions.map((q, qi) => {
            const userAns = answers[q.id];
            const correct = userAns === q.answer;
            return (
              <div key={q.id} style={{ ...card, borderLeft: `3px solid ${correct ? '#68d391' : '#fc8181'}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>
                    {q.imageEmoji && <span style={{ marginRight: 4 }}>{q.imageEmoji}</span>}
                    {q.prompt}
                  </span>
                  <span style={{ fontSize: 18 }}>{correct ? '✅' : '❌'}</span>
                </div>
                <div style={{ fontSize: 12, marginTop: 4 }}>
                  {!correct && <p style={{ margin: '2px 0', color: '#fc8181' }}>❌ Bạn chọn: {userAns || '(chưa trả lời)'}</p>}
                  <p style={{ margin: '2px 0', color: '#68d391' }}>✅ Đáp án: {q.answer}</p>
                </div>

                {/* Expandable explanation */}
                <div onClick={() => setShowExplanation(showExplanation === q.id ? null : q.id)}
                  style={{ cursor: 'pointer', marginTop: 6, padding: '4px 8px', background: 'rgba(249,212,35,0.06)', borderRadius: 6, fontSize: 11, color: '#f9d423' }}>
                  {showExplanation === q.id ? '▼' : '▶'} Xem giải thích & chiến lược
                </div>
                {showExplanation === q.id && (
                  <div style={{ marginTop: 6, padding: '8px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                    <p style={{ margin: '0 0 4px', fontSize: 12, color: '#e2e8f0' }}>
                      📖 <strong>Giải thích:</strong> {q.explanationVi}
                    </p>
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

      {/* Question */}
      <div style={{ ...card, padding: 16 }}>
        {q.imageEmoji && <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 8 }}>{q.imageEmoji}</div>}
        <p style={{ fontSize: 16, fontWeight: 600, margin: '0 0 12px', lineHeight: 1.5 }}>{q.prompt}</p>

        {/* Options or spell input */}
        {isSpellType ? (
          <div>
            <input type="text" value={spellInput} onChange={e => { setSpellInput(e.target.value); selectAnswer(q.id, e.target.value.toLowerCase().trim()); }}
              placeholder="Gõ từ ở đây..."
              style={{ width: '100%', padding: '10px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: 16, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        ) : q.options?.map((opt, i) => {
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
