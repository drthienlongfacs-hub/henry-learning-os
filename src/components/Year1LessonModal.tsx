'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { CurriculumTopic, InteractiveContent } from '@/data/year1-integrated-curriculum';
import { YEAR1_INTERACTIVE } from '@/data/year1-interactive-content';
import { getVisualScene } from '@/data/year1-visual-scenes';
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
    <div style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,0.55)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }} onClick={onClose}>
      <div style={{ background:'#fff', borderRadius:24, maxWidth:500, width:'100%', maxHeight:'90vh', overflow:'auto', boxShadow:'0 25px 80px rgba(0,0,0,0.35)' }} onClick={e => e.stopPropagation()}>
        {/* ── Visual Hero Scene ── */}
        {(() => { const scene = getVisualScene(topic.id); return (
          <div style={{ position:'relative', background: scene.bgGradient, borderRadius:'24px 24px 0 0', padding:'1.5rem 1.2rem 1rem', overflow:'hidden', minHeight: 140 }}>
            {/* Floating decorations */}
            {scene.floatingIcons.map((icon, i) => (
              <span key={i} style={{ position:'absolute', fontSize: `${1.2 + (i % 2) * 0.5}rem`, opacity: 0.35, top: `${10 + i * 18}%`, right: `${5 + i * 12}%`, animation: `float${i % 3} ${3 + i}s ease-in-out infinite`, pointerEvents:'none' }}>{icon}</span>
            ))}
            {/* Close button */}
            <button onClick={onClose} style={{ position:'absolute', top:12, right:12, width:32, height:32, borderRadius:99, border:'none', background:'rgba(255,255,255,0.7)', backdropFilter:'blur(8px)', cursor:'pointer', fontSize:'1rem', display:'flex', alignItems:'center', justifyContent:'center', zIndex:2 }}>✕</button>
            {/* Scene illustration */}
            <div style={{ display:'flex', justifyContent:'center', gap:6, marginBottom:8 }}>
              {scene.sceneEmojis.map((e, i) => (
                <span key={i} style={{ fontSize: i === 1 ? '3rem' : '2.2rem', filter:'drop-shadow(0 2px 4px rgba(0,0,0,0.15))', animation: `bounce${i % 2} 2s ease-in-out infinite ${i * 0.3}s` }}>{e}</span>
              ))}
            </div>
            {/* Title */}
            <div style={{ textAlign:'center', position:'relative', zIndex:1 }}>
              <div style={{ fontSize:'0.6rem', fontWeight:800, color: scene.accentColor, textTransform:'uppercase', letterSpacing:2, marginBottom:2 }}>{topic.type === 'lesson' ? '📖 Bài học' : topic.type === 'practice' ? '✏️ Luyện tập' : topic.type === 'activity' ? '🎨 Hoạt động' : '📝 Ôn tập'}</div>
              <div style={{ fontSize:'1.1rem', fontWeight:900, color:'#1a1a2e', lineHeight:1.3 }}>{topic.titleEn}</div>
              <div style={{ fontSize:'0.8rem', color:'#555', marginTop:2 }}>{topic.titleVi}</div>
            </div>
            {/* Visual tip */}
            {scene.visualTip && (
              <div style={{ marginTop:8, padding:'0.4rem 0.7rem', borderRadius:10, background:'rgba(255,255,255,0.7)', backdropFilter:'blur(4px)', fontSize:'0.65rem', color:'#555', textAlign:'center', display:'flex', alignItems:'center', gap:4, justifyContent:'center' }}>
                <span>💡</span> {scene.visualTip}
              </div>
            )}
          </div>
        ); })()}

        {/* Tabs */}
        <div style={{ display:'flex', gap:4, padding:'0.5rem 1rem', borderBottom:'1px solid #f5f5f5' }}>
          {hasVocab && <button onClick={() => { setMode('vocab'); setFlipped(false); setPronScore(null); }} style={{ flex:1, padding:'0.5rem', borderRadius:12, border:'none', cursor:'pointer', background: mode==='vocab' ? subjectColor : '#f5f5f5', color: mode==='vocab' ? '#fff' : '#666', fontWeight:700, fontSize:'0.75rem', transition:'all 0.2s' }}>🃏 Thẻ từ vựng</button>}
          {hasQuiz && <button onClick={() => setMode('quiz')} style={{ flex:1, padding:'0.5rem', borderRadius:12, border:'none', cursor:'pointer', background: mode==='quiz' ? subjectColor : '#f5f5f5', color: mode==='quiz' ? '#fff' : '#666', fontWeight:700, fontSize:'0.75rem', transition:'all 0.2s' }}>📝 Trắc nghiệm</button>}
          <button onClick={() => setMode('overview')} style={{ flex:1, padding:'0.5rem', borderRadius:12, border:'none', cursor:'pointer', background: mode==='overview' ? subjectColor : '#f5f5f5', color: mode==='overview' ? '#fff' : '#666', fontWeight:700, fontSize:'0.75rem', transition:'all 0.2s' }}>📋 Tổng quan</button>
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

                {/* Flashcard — large visual */}
                <button onClick={() => setFlipped(!flipped)} style={{
                  width:'100%', minHeight:180, borderRadius:20, border:`3px solid ${subjectColor}25`,
                  background: flipped ? `linear-gradient(135deg, ${subjectColor}05, ${subjectColor}12)` : 'linear-gradient(135deg, #fafafe, #f5f7ff)',
                  cursor:'pointer', padding:'1.5rem 1.2rem', transition:'all 0.4s ease',
                  boxShadow: flipped ? `0 8px 30px ${subjectColor}20` : '0 4px 20px rgba(0,0,0,0.06)',
                  display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:6,
                  transform: flipped ? 'scale(1.02)' : 'scale(1)',
                }}>
                  <span style={{ fontSize:'3.5rem', filter:'drop-shadow(0 3px 6px rgba(0,0,0,0.15))', transition:'all 0.3s', transform: flipped ? 'scale(0.8)' : 'scale(1)' }}>{card.imageEmoji}</span>
                  <span style={{ fontSize:'1.6rem', fontWeight:900, color: flipped ? subjectColor : '#1a1a2e', letterSpacing:1 }}>{card.word}</span>
                  {ipa && <span style={{ fontSize:'0.85rem', color:'#8b5cf6', fontFamily:'serif', fontWeight:600, letterSpacing:0.5, background:'#f5f3ff', padding:'2px 10px', borderRadius:99 }}>{ipa}</span>}
                  {flipped && (
                    <>
                      <div style={{ width:40, height:2, background:`${subjectColor}30`, borderRadius:2, margin:'4px 0' }} />
                      <span style={{ fontSize:'1.15rem', fontWeight:800, color:'#333' }}>{card.meaning}</span>
                      {card.example && <span style={{ fontSize:'0.82rem', color:'#666', fontStyle:'italic', marginTop:2, background:'#f8fafc', padding:'4px 12px', borderRadius:8 }}>{`"${card.example}"`}</span>}
                    </>
                  )}
                  {!flipped && <span style={{ fontSize:'0.65rem', color:'#bbb', marginTop:4 }}>👆 Nhấn để lật thẻ</span>}
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
              {/* Instructions (for activity topics) */}
              {content?.instructions && content.instructions.length > 0 && (
                <div style={{ marginBottom:16, padding:'0.8rem', borderRadius:14, background:'linear-gradient(135deg,#fef3c7,#fffbeb)', border:'1.5px solid #fde68a' }}>
                  <div style={{ fontWeight:800, fontSize:'0.82rem', color:'#92400e', marginBottom:8, display:'flex', alignItems:'center', gap:6 }}>📝 Hướng dẫn hoạt động</div>
                  {content.instructions.map((inst, i) => (
                    <div key={i} style={{ fontSize:'0.78rem', color:'#78350f', padding:'0.35rem 0', paddingLeft:16, display:'flex', gap:8, alignItems:'flex-start' }}>
                      <span style={{ fontSize:'1rem', minWidth:24 }}>{['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣'][i] || '▪️'}</span>
                      <span>{inst}</span>
                    </div>
                  ))}
                </div>
              )}
              {topic.objectives && topic.objectives.length > 0 && (
                <div style={{ marginBottom:16 }}>
                  <div style={{ fontWeight:800, fontSize:'0.82rem', color:'#1a1a2e', marginBottom:8, display:'flex', alignItems:'center', gap:6 }}>🎯 Mục tiêu bài học</div>
                  {topic.objectives.map((o, i) => (
                    <div key={i} style={{ fontSize:'0.78rem', color:'#444', padding:'0.45rem 0.6rem', paddingLeft:14, borderLeft:`3px solid ${subjectColor}40`, marginBottom:4, background:'#fafafa', borderRadius:'0 8px 8px 0', display:'flex', alignItems:'center', gap:6 }}>
                      <span style={{ color: subjectColor }}>✦</span> {o}
                    </div>
                  ))}
                </div>
              )}
              {topic.keyVocab && topic.keyVocab.length > 0 && (
                <div style={{ marginBottom:16 }}>
                  <div style={{ fontWeight:800, fontSize:'0.82rem', color:'#1a1a2e', marginBottom:8, display:'flex', alignItems:'center', gap:6 }}>📖 Từ vựng chính — Nhấn để nghe 🔊</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {topic.keyVocab.map(v => {
                      const ipa = getIPA(v);
                      return (
                        <button key={v} onClick={() => handleSpeak(v, 0.8)} style={{ padding:'0.4rem 0.8rem', borderRadius:12, background:`${subjectColor}08`, color:subjectColor, fontWeight:700, fontSize:'0.78rem', border:`1.5px solid ${subjectColor}20`, cursor:'pointer', display:'flex', alignItems:'center', gap:5, transition:'all 0.2s', boxShadow:'0 2px 6px rgba(0,0,0,0.04)' }}>
                          🔈 {v} {ipa && <span style={{ color:'#8b5cf6', fontFamily:'serif', fontSize:'0.65rem', background:'#f5f3ff', padding:'1px 6px', borderRadius:6 }}>{ipa}</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
              {!hasVocab && !hasQuiz && !content?.instructions && (
                <div style={{ textAlign:'center', padding:'2rem 0' }}>
                  <div style={{ fontSize:'2.5rem', marginBottom:8 }}>📚</div>
                  <div style={{ fontSize:'0.82rem', color:'#999' }}>Nội dung tương tác đang được bổ sung...</div>
                </div>
              )}
              <button onClick={() => { onComplete(topic.id); onClose(); }} style={{ width:'100%', marginTop:16, padding:'0.7rem', borderRadius:14, border:'none', background:`linear-gradient(135deg, ${subjectColor}, ${subjectColor}dd)`, color:'#fff', fontWeight:800, cursor:'pointer', fontSize:'0.9rem', boxShadow:`0 4px 15px ${subjectColor}40`, transition:'all 0.2s' }}>
                ⭐ Đánh dấu đã học xong!
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
        @keyframes float0 { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-8px) rotate(5deg); } }
        @keyframes float1 { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-12px) rotate(-5deg); } }
        @keyframes float2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes bounce0 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes bounce1 { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-4px) scale(1.05); } }
      `}</style>
    </div>
  );
}
