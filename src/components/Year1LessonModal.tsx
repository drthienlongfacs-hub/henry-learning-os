'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { CurriculumTopic, InteractiveContent } from '@/data/year1-integrated-curriculum';
import { YEAR1_INTERACTIVE } from '@/data/year1-interactive-content';
import { speak, stopSpeech } from '@/lib/voiceEngine';
import { getOfflineIPA } from '@/data/ipaDatabase';

type Mode = 'vocab' | 'quiz' | 'overview';

interface Props {
  topic: CurriculumTopic;
  subjectColor: string;
  onClose: () => void;
  onComplete: (topicId: string) => void;
}

/* ─── Pronunciation Scoring (Web Speech Recognition) ─── */
function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const recognitionRef = useRef<ReturnType<typeof createRecognition> | null>(null);

  function createRecognition() {
    if (typeof window === 'undefined') return null;
    const SR = (window as unknown as Record<string, unknown>).SpeechRecognition || (window as unknown as Record<string, unknown>).webkitSpeechRecognition;
    if (!SR) return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r = new (SR as any)();
    r.lang = 'en-US';
    r.interimResults = false;
    r.maxAlternatives = 3;
    return r;
  }

  const startListening = useCallback((targetWord: string, onResult: (score: number, heard: string) => void) => {
    const r = createRecognition();
    if (!r) return;
    recognitionRef.current = r;
    setIsListening(true);
    setTranscript('');
    setConfidence(0);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    r.onresult = (e: any) => {
      const results = e.results[0];
      let bestScore = 0;
      let bestText = '';
      for (let i = 0; i < results.length; i++) {
        const alt = results[i];
        const heard = alt.transcript.toLowerCase().trim();
        const target = targetWord.toLowerCase().trim();
        // Simple similarity: exact match = 100%, contains = 80%, first letter = 40%
        let score = 0;
        if (heard === target) score = 100;
        else if (heard.includes(target) || target.includes(heard)) score = 80;
        else if (heard[0] === target[0]) score = 40 + alt.confidence * 30;
        else score = Math.round(alt.confidence * 50);

        if (score > bestScore) { bestScore = score; bestText = alt.transcript; }
      }
      setTranscript(bestText);
      setConfidence(bestScore);
      onResult(bestScore, bestText);
    };
    r.onerror = () => { setIsListening(false); };
    r.onend = () => { setIsListening(false); };
    r.start();
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
    setIsListening(false);
  }, []);

  return { isListening, transcript, confidence, startListening, stopListening };
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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [pronScore, setPronScore] = useState<number | null>(null);
  const [pronText, setPronText] = useState('');

  const { isListening, startListening, stopListening } = useSpeechRecognition();

  const vocabCards = content?.vocabCards || [];
  const quizzes = content?.quizzes || [];

  // Cleanup speech on unmount
  useEffect(() => () => { stopSpeech(); stopListening(); }, [stopListening]);

  // Speak a word/sentence
  const handleSpeak = (text: string, rate = 0.85) => {
    setIsSpeaking(true);
    speak(text, 'en-US', rate, () => setIsSpeaking(false));
  };

  // Record & score pronunciation
  const handleRecord = (word: string) => {
    setPronScore(null);
    setPronText('');
    startListening(word, (s, heard) => {
      setPronScore(s);
      setPronText(heard);
    });
  };

  // Get IPA for a word
  const getIPA = (word: string): string | null => {
    // Try exact word first, then try each word in a phrase
    const ipa = getOfflineIPA(word);
    if (ipa) return ipa;
    const words = word.split(/\s+/);
    if (words.length > 1) {
      const parts = words.map(w => getOfflineIPA(w)).filter(Boolean);
      return parts.length > 0 ? parts.join(' ') : null;
    }
    return null;
  };

  // Score emoji & feedback
  const getPronFeedback = (s: number) => {
    if (s >= 90) return { emoji: '🌟', label: 'Tuyệt vời!', color: '#22c55e' };
    if (s >= 70) return { emoji: '👍', label: 'Khá tốt!', color: '#f59e0b' };
    if (s >= 40) return { emoji: '💪', label: 'Cần luyện thêm', color: '#f97316' };
    return { emoji: '🔄', label: 'Thử lại nhé', color: '#ef4444' };
  };

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
          {hasVocab && <button onClick={() => { setMode('vocab'); setFlipped(false); setPronScore(null); }} style={{ flex:1, padding:'0.4rem', borderRadius:10, border:'none', cursor:'pointer', background: mode==='vocab' ? subjectColor : '#f5f5f5', color: mode==='vocab' ? '#fff' : '#666', fontWeight:700, fontSize:'0.72rem', transition:'all 0.2s' }}>🃏 Flashcards</button>}
          {hasQuiz && <button onClick={() => setMode('quiz')} style={{ flex:1, padding:'0.4rem', borderRadius:10, border:'none', cursor:'pointer', background: mode==='quiz' ? subjectColor : '#f5f5f5', color: mode==='quiz' ? '#fff' : '#666', fontWeight:700, fontSize:'0.72rem', transition:'all 0.2s' }}>📝 Quiz</button>}
          <button onClick={() => setMode('overview')} style={{ flex:1, padding:'0.4rem', borderRadius:10, border:'none', cursor:'pointer', background: mode==='overview' ? subjectColor : '#f5f5f5', color: mode==='overview' ? '#fff' : '#666', fontWeight:700, fontSize:'0.72rem', transition:'all 0.2s' }}>📋 Tổng quan</button>
        </div>

        {/* Content */}
        <div style={{ padding:'1rem 1.2rem', minHeight:250 }}>
          {/* ── VOCAB FLASHCARDS with Pronunciation ── */}
          {mode === 'vocab' && vocabCards.length > 0 && (() => {
            const card = vocabCards[vocabIdx];
            const ipa = getIPA(card.word);
            return (
              <div>
                <div style={{ textAlign:'center', fontSize:'0.7rem', color:'#999', marginBottom:8 }}>
                  Thẻ {vocabIdx + 1} / {vocabCards.length}
                </div>

                {/* Flashcard */}
                <button onClick={() => setFlipped(!flipped)} style={{
                  width:'100%', minHeight:160, borderRadius:16, border:`2px solid ${subjectColor}20`,
                  background: flipped ? `linear-gradient(135deg, ${subjectColor}08, ${subjectColor}15)` : '#fafafe',
                  cursor:'pointer', padding:'1.2rem', transition:'all 0.3s',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4,
                }}>
                  <span style={{ fontSize:'2.2rem' }}>{card.imageEmoji}</span>
                  <span style={{ fontSize:'1.4rem', fontWeight:900, color: flipped ? subjectColor : '#1a1a2e' }}>{card.word}</span>
                  {/* IPA Pronunciation */}
                  {ipa && <span style={{ fontSize:'0.82rem', color:'#8b5cf6', fontFamily:'serif', fontWeight:600, letterSpacing:0.5 }}>{ipa}</span>}
                  {flipped && (
                    <>
                      <span style={{ fontSize:'1rem', fontWeight:700, color:'#333', marginTop:4 }}>{card.meaning}</span>
                      {card.example && <span style={{ fontSize:'0.78rem', color:'#666', fontStyle:'italic', marginTop:2 }}>{`"${card.example}"`}</span>}
                    </>
                  )}
                  {!flipped && <span style={{ fontSize:'0.62rem', color:'#bbb' }}>Nhấn để lật</span>}
                </button>

                {/* ── Pronunciation Controls ── */}
                <div style={{ display:'flex', gap:6, marginTop:10, justifyContent:'center', flexWrap:'wrap' }}>
                  {/* Listen button */}
                  <button onClick={(e) => { e.stopPropagation(); handleSpeak(card.word, 0.8); }} disabled={isSpeaking}
                    style={{ display:'flex', alignItems:'center', gap:4, padding:'0.45rem 0.8rem', borderRadius:99, border:'none', background: isSpeaking ? '#dbeafe' : '#eff6ff', color:'#3b82f6', fontWeight:700, cursor:'pointer', fontSize:'0.7rem', transition:'all 0.2s' }}>
                    {isSpeaking ? '🔊' : '🔈'} Nghe phát âm
                  </button>
                  {/* Speak slow */}
                  <button onClick={(e) => { e.stopPropagation(); handleSpeak(card.word, 0.55); }} disabled={isSpeaking}
                    style={{ display:'flex', alignItems:'center', gap:4, padding:'0.45rem 0.8rem', borderRadius:99, border:'none', background:'#fef3c7', color:'#f59e0b', fontWeight:700, cursor:'pointer', fontSize:'0.7rem' }}>
                    🐢 Chậm
                  </button>
                  {/* Record & check */}
                  <button onClick={(e) => { e.stopPropagation(); isListening ? stopListening() : handleRecord(card.word); }}
                    style={{ display:'flex', alignItems:'center', gap:4, padding:'0.45rem 0.8rem', borderRadius:99, border:'none', background: isListening ? '#fee2e2' : '#fce7f3', color: isListening ? '#ef4444' : '#ec4899', fontWeight:700, cursor:'pointer', fontSize:'0.7rem', animation: isListening ? 'pulse 1s ease-in-out infinite' : 'none' }}>
                    {isListening ? '⏹️ Đang nghe...' : '🎤 Đọc thử'}
                  </button>
                </div>

                {/* Example sentence listen */}
                {card.example && (
                  <button onClick={(e) => { e.stopPropagation(); handleSpeak(card.example!, 0.82); }} disabled={isSpeaking}
                    style={{ display:'flex', alignItems:'center', gap:4, padding:'0.4rem 0.8rem', borderRadius:99, border:'1px solid #e2e8f0', background:'white', color:'#64748b', fontWeight:600, cursor:'pointer', fontSize:'0.62rem', margin:'6px auto 0' }}>
                    {`🔊 Nghe câu ví dụ: "${card.example}"`}
                  </button>
                )}

                {/* Pronunciation Feedback */}
                {pronScore !== null && (
                  <div style={{ marginTop:10, padding:'0.6rem 0.8rem', borderRadius:12, background: getPronFeedback(pronScore).color + '10', border: `1.5px solid ${getPronFeedback(pronScore).color}30`, textAlign:'center' }}>
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                      <span style={{ fontSize:'1.5rem' }}>{getPronFeedback(pronScore).emoji}</span>
                      <div>
                        <div style={{ fontWeight:800, fontSize:'0.82rem', color: getPronFeedback(pronScore).color }}>
                          {getPronFeedback(pronScore).label} — {pronScore}%
                        </div>
                        {pronText && (
                          <div style={{ fontSize:'0.65rem', color:'#64748b', marginTop:2 }}>
                            {`Nghe được: "${pronText}"`} {pronScore < 70 && ` → Thử nói rõ hơn: "${card.word}"`}
                          </div>
                        )}
                      </div>
                    </div>
                    {pronScore < 90 && (
                      <button onClick={() => { setPronScore(null); handleSpeak(card.word, 0.6); }}
                        style={{ marginTop:8, padding:'0.35rem 0.8rem', borderRadius:99, border:'none', background: getPronFeedback(pronScore).color, color:'#fff', fontWeight:700, cursor:'pointer', fontSize:'0.65rem' }}>
                        🔁 Nghe lại & Thử lại
                      </button>
                    )}
                  </div>
                )}

                {/* Nav */}
                <div style={{ display:'flex', gap:8, marginTop:12, justifyContent:'center' }}>
                  <button disabled={vocabIdx === 0} onClick={() => { setVocabIdx(vocabIdx - 1); setFlipped(false); setPronScore(null); }} style={{ padding:'0.5rem 1.2rem', borderRadius:10, border:'none', background: vocabIdx === 0 ? '#eee' : subjectColor, color: vocabIdx === 0 ? '#aaa' : '#fff', fontWeight:700, cursor: vocabIdx === 0 ? 'default' : 'pointer', fontSize:'0.8rem' }}>← Trước</button>
                  <button disabled={vocabIdx === vocabCards.length - 1} onClick={() => { setVocabIdx(vocabIdx + 1); setFlipped(false); setPronScore(null); }} style={{ padding:'0.5rem 1.2rem', borderRadius:10, border:'none', background: vocabIdx === vocabCards.length - 1 ? '#eee' : subjectColor, color: vocabIdx === vocabCards.length - 1 ? '#aaa' : '#fff', fontWeight:700, cursor: vocabIdx === vocabCards.length - 1 ? 'default' : 'pointer', fontSize:'0.8rem' }}>Tiếp →</button>
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
                {/* Read question aloud */}
                <button onClick={() => handleSpeak(q.question, 0.85)} disabled={isSpeaking}
                  style={{ display:'flex', alignItems:'center', gap:4, margin:'0 auto 10px', padding:'0.3rem 0.7rem', borderRadius:99, border:'1px solid #e2e8f0', background:'white', color:'#3b82f6', fontWeight:600, cursor:'pointer', fontSize:'0.6rem' }}>
                  🔈 Nghe câu hỏi
                </button>
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

          {/* ── OVERVIEW with pronunciation ── */}
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
                  <div style={{ fontWeight:800, fontSize:'0.8rem', color:'#1a1a2e', marginBottom:8 }}>📖 Từ vựng chính — Nhấn để nghe</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                    {topic.keyVocab.map(v => {
                      const ipa = getIPA(v);
                      return (
                        <button key={v} onClick={() => handleSpeak(v, 0.8)} style={{ padding:'0.3rem 0.6rem', borderRadius:99, background:`${subjectColor}10`, color:subjectColor, fontWeight:700, fontSize:'0.72rem', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>
                          🔈 {v} {ipa && <span style={{ color:'#8b5cf6', fontFamily:'serif', fontSize:'0.6rem' }}>{ipa}</span>}
                        </button>
                      );
                    })}
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

      {/* Pulse animation for recording */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
