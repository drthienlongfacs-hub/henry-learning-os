'use client';
import { useState } from 'react';
import type { CurriculumTopic, InteractiveContent } from '@/data/year1-integrated-curriculum';
import { YEAR1_INTERACTIVE } from '@/data/year1-interactive-content';

type Mode = 'vocab' | 'quiz' | 'overview';

interface Props {
  topic: CurriculumTopic;
  subjectColor: string;
  onClose: () => void;
  onComplete: (topicId: string) => void;
}

export function Year1LessonModal({ topic, subjectColor, onClose, onComplete }: Props) {
  const content: InteractiveContent | undefined = YEAR1_INTERACTIVE[topic.id];
  const hasVocab = content?.vocabCards && content.vocabCards.length > 0;
  const hasQuiz = content?.quizzes && content.quizzes.length > 0;

  const [mode, setMode] = useState<Mode>(hasVocab ? 'vocab' : hasQuiz ? 'quiz' : 'overview');
  const [vocabIdx, setVocabIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  const vocabCards = content?.vocabCards || [];
  const quizzes = content?.quizzes || [];

  return (
    <div style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }} onClick={onClose}>
      <div style={{ background:'#fff', borderRadius:20, maxWidth:480, width:'100%', maxHeight:'85vh', overflow:'auto', boxShadow:'0 20px 60px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ padding:'1rem 1.2rem', borderBottom:'1px solid #f0f0f0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div>
            <div style={{ fontSize:'0.65rem', fontWeight:700, color:subjectColor, textTransform:'uppercase', letterSpacing:1 }}>{topic.type}</div>
            <div style={{ fontSize:'1rem', fontWeight:900, color:'#1a1a2e', marginTop:2 }}>{topic.titleEn}</div>
            <div style={{ fontSize:'0.75rem', color:'#666' }}>{topic.titleVi}</div>
          </div>
          <button onClick={onClose} style={{ width:32, height:32, borderRadius:99, border:'none', background:'#f5f5f5', cursor:'pointer', fontSize:'1rem', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:4, padding:'0.5rem 1rem', borderBottom:'1px solid #f5f5f5' }}>
          {hasVocab && <button onClick={() => { setMode('vocab'); setFlipped(false); }} style={{ flex:1, padding:'0.4rem', borderRadius:10, border:'none', cursor:'pointer', background: mode==='vocab' ? subjectColor : '#f5f5f5', color: mode==='vocab' ? '#fff' : '#666', fontWeight:700, fontSize:'0.72rem', transition:'all 0.2s' }}>🃏 Flashcards</button>}
          {hasQuiz && <button onClick={() => setMode('quiz')} style={{ flex:1, padding:'0.4rem', borderRadius:10, border:'none', cursor:'pointer', background: mode==='quiz' ? subjectColor : '#f5f5f5', color: mode==='quiz' ? '#fff' : '#666', fontWeight:700, fontSize:'0.72rem', transition:'all 0.2s' }}>📝 Quiz</button>}
          <button onClick={() => setMode('overview')} style={{ flex:1, padding:'0.4rem', borderRadius:10, border:'none', cursor:'pointer', background: mode==='overview' ? subjectColor : '#f5f5f5', color: mode==='overview' ? '#fff' : '#666', fontWeight:700, fontSize:'0.72rem', transition:'all 0.2s' }}>📋 Tổng quan</button>
        </div>

        {/* Content */}
        <div style={{ padding:'1rem 1.2rem', minHeight:250 }}>
          {/* ── VOCAB FLASHCARDS ── */}
          {mode === 'vocab' && vocabCards.length > 0 && (() => {
            const card = vocabCards[vocabIdx];
            return (
              <div>
                <div style={{ textAlign:'center', fontSize:'0.7rem', color:'#999', marginBottom:8 }}>
                  Thẻ {vocabIdx + 1} / {vocabCards.length} — Nhấn để lật
                </div>
                <button onClick={() => setFlipped(!flipped)} style={{
                  width:'100%', minHeight:180, borderRadius:16, border:`2px solid ${subjectColor}20`,
                  background: flipped ? `linear-gradient(135deg, ${subjectColor}08, ${subjectColor}15)` : '#fafafe',
                  cursor:'pointer', padding:'1.5rem', transition:'all 0.3s',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8,
                }}>
                  {!flipped ? (
                    <>
                      <span style={{ fontSize:'2.5rem' }}>{card.imageEmoji}</span>
                      <span style={{ fontSize:'1.5rem', fontWeight:900, color:'#1a1a2e' }}>{card.word}</span>
                      <span style={{ fontSize:'0.7rem', color:'#aaa' }}>Tap to see meaning</span>
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize:'1.8rem' }}>{card.imageEmoji}</span>
                      <span style={{ fontSize:'1.2rem', fontWeight:900, color: subjectColor }}>{card.word}</span>
                      <span style={{ fontSize:'1rem', fontWeight:700, color:'#333' }}>{card.meaning}</span>
                      {card.example && <span style={{ fontSize:'0.8rem', color:'#666', fontStyle:'italic', marginTop:4 }}>"{card.example}"</span>}
                    </>
                  )}
                </button>
                <div style={{ display:'flex', gap:8, marginTop:12, justifyContent:'center' }}>
                  <button disabled={vocabIdx === 0} onClick={() => { setVocabIdx(vocabIdx - 1); setFlipped(false); }} style={{ padding:'0.5rem 1.2rem', borderRadius:10, border:'none', background: vocabIdx === 0 ? '#eee' : subjectColor, color: vocabIdx === 0 ? '#aaa' : '#fff', fontWeight:700, cursor: vocabIdx === 0 ? 'default' : 'pointer', fontSize:'0.8rem' }}>← Trước</button>
                  <button disabled={vocabIdx === vocabCards.length - 1} onClick={() => { setVocabIdx(vocabIdx + 1); setFlipped(false); }} style={{ padding:'0.5rem 1.2rem', borderRadius:10, border:'none', background: vocabIdx === vocabCards.length - 1 ? '#eee' : subjectColor, color: vocabIdx === vocabCards.length - 1 ? '#aaa' : '#fff', fontWeight:700, cursor: vocabIdx === vocabCards.length - 1 ? 'default' : 'pointer', fontSize:'0.8rem' }}>Tiếp →</button>
                </div>
              </div>
            );
          })()}

          {/* ── QUIZ ── */}
          {mode === 'quiz' && quizzes.length > 0 && !quizDone && (() => {
            const q = quizzes[quizIdx];
            return (
              <div>
                <div style={{ textAlign:'center', fontSize:'0.7rem', color:'#999', marginBottom:8 }}>
                  Câu {quizIdx + 1} / {quizzes.length} • Điểm: {score}
                </div>
                <div style={{ fontSize:'0.95rem', fontWeight:800, color:'#1a1a2e', textAlign:'center', marginBottom:16, lineHeight:1.4 }}>
                  {q.question}
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {q.options.map(opt => {
                    const isSelected = selected === opt;
                    const isCorrect = opt === q.answer;
                    const showResult = selected !== null;
                    let bg = '#f8f9fa';
                    let border = '2px solid #e9ecef';
                    let color = '#333';
                    if (showResult && isCorrect) { bg = '#d4edda'; border = '2px solid #28a745'; color = '#155724'; }
                    else if (showResult && isSelected && !isCorrect) { bg = '#f8d7da'; border = '2px solid #dc3545'; color = '#721c24'; }
                    return (
                      <button key={opt} disabled={selected !== null} onClick={() => {
                        setSelected(opt);
                        if (opt === q.answer) setScore(s => s + 1);
                      }} style={{
                        padding:'0.7rem 1rem', borderRadius:12, border, background:bg, color,
                        fontWeight:700, fontSize:'0.8rem', cursor: selected ? 'default' : 'pointer',
                        textAlign:'left', transition:'all 0.2s',
                      }}>
                        {opt} {showResult && isCorrect && ' ✅'}{showResult && isSelected && !isCorrect && ' ❌'}
                      </button>
                    );
                  })}
                </div>
                {selected && (
                  <div style={{ marginTop:12, padding:'0.7rem', borderRadius:10, background:`${subjectColor}08`, border:`1px solid ${subjectColor}20` }}>
                    <div style={{ fontSize:'0.75rem', color: subjectColor, fontWeight:700 }}>
                      {selected === q.answer ? '🎉 Chính xác!' : '💡 Giải thích:'}
                    </div>
                    <div style={{ fontSize:'0.72rem', color:'#555', marginTop:4 }}>{q.explanationVi}</div>
                  </div>
                )}
                {selected && (
                  <button onClick={() => {
                    if (quizIdx < quizzes.length - 1) {
                      setQuizIdx(quizIdx + 1);
                      setSelected(null);
                    } else {
                      setQuizDone(true);
                    }
                  }} style={{ width:'100%', marginTop:12, padding:'0.6rem', borderRadius:10, border:'none', background:subjectColor, color:'#fff', fontWeight:700, cursor:'pointer', fontSize:'0.85rem' }}>
                    {quizIdx < quizzes.length - 1 ? 'Câu tiếp →' : '🏁 Xem kết quả'}
                  </button>
                )}
              </div>
            );
          })()}

          {/* ── QUIZ DONE ── */}
          {mode === 'quiz' && quizDone && (
            <div style={{ textAlign:'center', padding:'1rem 0' }}>
              <div style={{ fontSize:'3rem', marginBottom:8 }}>{score === quizzes.length ? '🏆' : score >= quizzes.length / 2 ? '⭐' : '💪'}</div>
              <div style={{ fontSize:'1.2rem', fontWeight:900, color:'#1a1a2e' }}>Kết quả: {score}/{quizzes.length}</div>
              <div style={{ fontSize:'0.8rem', color:'#666', marginTop:4 }}>
                {score === quizzes.length ? 'Xuất sắc! Giỏi quá!' : score >= quizzes.length / 2 ? 'Khá tốt! Cố gắng thêm nhé!' : 'Hãy ôn lại bài học nhé!'}
              </div>
              <div style={{ display:'flex', gap:8, marginTop:16, justifyContent:'center' }}>
                <button onClick={() => { setQuizIdx(0); setSelected(null); setScore(0); setQuizDone(false); }} style={{ padding:'0.5rem 1rem', borderRadius:10, border:'none', background:'#f5f5f5', color:'#333', fontWeight:700, cursor:'pointer', fontSize:'0.8rem' }}>🔄 Làm lại</button>
                <button onClick={() => { onComplete(topic.id); onClose(); }} style={{ padding:'0.5rem 1rem', borderRadius:10, border:'none', background:subjectColor, color:'#fff', fontWeight:700, cursor:'pointer', fontSize:'0.8rem' }}>✅ Đánh dấu hoàn thành</button>
              </div>
            </div>
          )}

          {/* ── OVERVIEW ── */}
          {mode === 'overview' && (
            <div>
              {topic.objectives && topic.objectives.length > 0 && (
                <div style={{ marginBottom:16 }}>
                  <div style={{ fontWeight:800, fontSize:'0.8rem', color:'#1a1a2e', marginBottom:8 }}>🎯 Mục tiêu bài học</div>
                  {topic.objectives.map((o, i) => (
                    <div key={i} style={{ fontSize:'0.75rem', color:'#555', padding:'0.4rem 0', paddingLeft:12, borderLeft:`3px solid ${subjectColor}30`, marginBottom:4 }}>• {o}</div>
                  ))}
                </div>
              )}
              {topic.keyVocab && topic.keyVocab.length > 0 && (
                <div style={{ marginBottom:16 }}>
                  <div style={{ fontWeight:800, fontSize:'0.8rem', color:'#1a1a2e', marginBottom:8 }}>📖 Từ vựng chính</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                    {topic.keyVocab.map(v => (
                      <span key={v} style={{ padding:'0.3rem 0.6rem', borderRadius:99, background:`${subjectColor}10`, color:subjectColor, fontWeight:700, fontSize:'0.72rem' }}>{v}</span>
                    ))}
                  </div>
                </div>
              )}
              {!hasVocab && !hasQuiz && (
                <div style={{ textAlign:'center', padding:'2rem 0' }}>
                  <div style={{ fontSize:'2rem', marginBottom:8 }}>📚</div>
                  <div style={{ fontSize:'0.8rem', color:'#999' }}>Nội dung tương tác đang được bổ sung...</div>
                </div>
              )}
              <button onClick={() => { onComplete(topic.id); onClose(); }} style={{ width:'100%', marginTop:16, padding:'0.6rem', borderRadius:10, border:'none', background:subjectColor, color:'#fff', fontWeight:700, cursor:'pointer', fontSize:'0.85rem' }}>
                ✅ Đánh dấu đã học
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
