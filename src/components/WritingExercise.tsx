'use client';

import { useState, useRef, useCallback } from 'react';
import { Check, X, ChevronRight, RotateCcw, Pencil, Eye, EyeOff, Star, Sparkles, Volume2 } from 'lucide-react';

// ═══════════════════════════════════════════════════════
// Interactive Writing Exercise — Like Writing in a Textbook
// 4 exercise types for textbook-like interaction:
//   1. FillBlank — fill in missing words (cloze test)
//   2. Dictation — listen + type what you hear
//   3. Reorder — arrange words into correct sentence
//   4. FreeWrite — open-ended with guided prompts
// ═══════════════════════════════════════════════════════

export interface WritingExercise {
  type: 'fill-blank' | 'dictation' | 'reorder' | 'free-write';
  prompt: string;
  promptVi: string;
  answer: string; // expected answer (or comma-separated acceptable answers)
  hints?: string[];
  imageEmoji?: string;
  audioText?: string; // text for TTS in dictation mode
}

interface WritingExerciseEngineProps {
  exercises: WritingExercise[];
  unitTitle: string;
  onComplete?: (score: number, total: number) => void;
}

export function WritingExerciseEngine({ exercises, unitTitle, onComplete }: WritingExerciseEngineProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [reorderWords, setReorderWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const exercise = exercises[currentIdx];
  const isLast = currentIdx === exercises.length - 1;
  const progress = ((currentIdx + (showResult ? 1 : 0)) / exercises.length) * 100;

  // Initialize reorder words when exercise type is reorder
  const initReorder = useCallback(() => {
    if (exercise.type === 'reorder') {
      const words = exercise.answer.split(/\s+/);
      // Shuffle
      const shuffled = [...words].sort(() => Math.random() - 0.5);
      setReorderWords(shuffled);
      setSelectedWords([]);
    }
  }, [exercise]);

  // Check answer
  const checkAnswer = useCallback(() => {
    let answer = '';
    if (exercise.type === 'reorder') {
      answer = selectedWords.join(' ');
    } else {
      answer = userInput.trim();
    }

    const acceptableAnswers = exercise.answer.split(',').map(a => a.trim().toLowerCase());
    const correct = acceptableAnswers.includes(answer.toLowerCase());
    
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) setScore(s => s + 1);
  }, [exercise, userInput, selectedWords]);

  // Next exercise
  const next = useCallback(() => {
    if (isLast) {
      onComplete?.(score + (isCorrect ? 0 : 0), exercises.length); // score already updated
      return;
    }
    setCurrentIdx(i => i + 1);
    setUserInput('');
    setShowResult(false);
    setIsCorrect(false);
    setShowHint(false);
    setSelectedWords([]);
    setTimeout(() => {
      inputRef.current?.focus();
      initReorder();
    }, 100);
  }, [isLast, score, isCorrect, exercises.length, onComplete, initReorder]);

  // Speak (dictation)
  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.7;
    speechSynthesis.speak(u);
  }, []);

  // Reorder: select/deselect word
  const toggleWord = (word: string, idx: number) => {
    if (showResult) return;
    setSelectedWords(prev => [...prev, word]);
    setReorderWords(prev => prev.filter((_, i) => i !== idx));
  };

  const removeSelectedWord = (idx: number) => {
    if (showResult) return;
    const word = selectedWords[idx];
    setSelectedWords(prev => prev.filter((_, i) => i !== idx));
    setReorderWords(prev => [...prev, word]);
  };

  // Initialize on mount
  useState(() => { initReorder(); });

  if (!exercise) return null;

  return (
    <div style={{
      background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)',
      borderRadius: 20, padding: 24,
      border: '1px solid rgba(255,255,255,0.3)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: 1 }}>
            ✏️ BÀI TẬP VIẾT — {unitTitle}
          </div>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
            Câu {currentIdx + 1} / {exercises.length}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Star size={16} style={{ color: '#f59e0b' }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: '#f59e0b' }}>{score}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 6, background: '#e2e8f0', borderRadius: 3, marginBottom: 20, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', borderRadius: 3, transition: 'width 0.3s ease' }} />
      </div>

      {/* Exercise content */}
      <div style={{ marginBottom: 20 }}>
        {/* Emoji illustration */}
        {exercise.imageEmoji && (
          <div style={{ fontSize: 48, textAlign: 'center', marginBottom: 12 }}>{exercise.imageEmoji}</div>
        )}

        {/* Prompt */}
        <div style={{
          background: '#faf5ff', borderRadius: 14, padding: 18,
          border: '1px solid #e9d5ff', marginBottom: 16,
        }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#1e1b4b', lineHeight: 1.6 }}>
            {exercise.prompt}
          </div>
          <div style={{ fontSize: 13, color: '#7c3aed', marginTop: 4 }}>
            {exercise.promptVi}
          </div>
        </div>

        {/* Dictation: play button */}
        {exercise.type === 'dictation' && exercise.audioText && (
          <button
            onClick={() => speak(exercise.audioText!)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              width: '100%', padding: '14px 18px', borderRadius: 14,
              border: '2px dashed #93c5fd', background: '#eff6ff',
              color: '#1e40af', fontSize: 15, fontWeight: 700, cursor: 'pointer',
              marginBottom: 16, transition: 'all 0.2s',
            }}
          >
            <Volume2 size={20} /> 🎧 Bấm để nghe — viết lại câu em nghe được
          </button>
        )}

        {/* Fill-blank / Dictation: text input */}
        {(exercise.type === 'fill-blank' || exercise.type === 'dictation') && (
          <input
            ref={inputRef}
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && userInput.trim()) checkAnswer(); }}
            disabled={showResult}
            placeholder={exercise.type === 'fill-blank' ? 'Điền từ vào chỗ trống...' : 'Viết câu em nghe được...'}
            style={{
              width: '100%', padding: '14px 18px', borderRadius: 14,
              border: showResult ? `2px solid ${isCorrect ? '#22c55e' : '#ef4444'}` : '2px solid #e2e8f0',
              fontSize: 17, fontFamily: "'Segoe UI', sans-serif",
              background: showResult ? (isCorrect ? '#f0fdf4' : '#fef2f2') : '#fff',
              outline: 'none', transition: 'all 0.3s',
              boxSizing: 'border-box',
            }}
          />
        )}

        {/* Free write: textarea */}
        {exercise.type === 'free-write' && (
          <textarea
            value={userInput}
            onChange={e => setUserInput(e.target.value)}
            disabled={showResult}
            placeholder="Viết câu trả lời của em..."
            rows={4}
            style={{
              width: '100%', padding: '14px 18px', borderRadius: 14,
              border: '2px solid #e2e8f0', fontSize: 16,
              fontFamily: "'Segoe UI', sans-serif",
              outline: 'none', resize: 'vertical',
              boxSizing: 'border-box',
            }}
          />
        )}

        {/* Reorder: word tiles */}
        {exercise.type === 'reorder' && (
          <div>
            {/* Selected words (answer area) */}
            <div style={{
              minHeight: 56, borderRadius: 14, padding: 12,
              border: showResult ? `2px solid ${isCorrect ? '#22c55e' : '#ef4444'}` : '2px dashed #cbd5e1',
              background: showResult ? (isCorrect ? '#f0fdf4' : '#fef2f2') : '#f8fafc',
              display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12,
            }}>
              {selectedWords.length === 0 && (
                <span style={{ color: '#94a3b8', fontSize: 14, padding: 8 }}>Bấm vào các từ để sắp xếp câu...</span>
              )}
              {selectedWords.map((word, i) => (
                <button key={`sel-${i}`} onClick={() => removeSelectedWord(i)}
                  style={{
                    padding: '8px 14px', borderRadius: 10,
                    background: '#6366f1', color: '#fff',
                    border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                  }}>
                  {word}
                </button>
              ))}
            </div>

            {/* Available words */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {reorderWords.map((word, i) => (
                <button key={`avail-${i}`} onClick={() => toggleWord(word, i)}
                  style={{
                    padding: '8px 14px', borderRadius: 10,
                    background: '#e0e7ff', color: '#3730a3',
                    border: '1px solid #c7d2fe', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}>
                  {word}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Hint */}
        {exercise.hints && exercise.hints.length > 0 && !showResult && (
          <button
            onClick={() => setShowHint(!showHint)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              marginTop: 12, padding: '8px 14px', borderRadius: 10,
              border: '1px solid #fde68a', background: '#fffbeb',
              color: '#92400e', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}
          >
            {showHint ? <EyeOff size={14} /> : <Eye size={14} />}
            {showHint ? 'Ẩn gợi ý' : '💡 Xem gợi ý'}
          </button>
        )}
        {showHint && exercise.hints && (
          <div style={{ marginTop: 8, padding: '10px 14px', background: '#fffbeb', borderRadius: 10, border: '1px solid #fde68a' }}>
            {exercise.hints.map((h, i) => (
              <div key={i} style={{ fontSize: 13, color: '#92400e', lineHeight: 1.6 }}>💡 {h}</div>
            ))}
          </div>
        )}
      </div>

      {/* Result feedback */}
      {showResult && (
        <div style={{
          padding: 16, borderRadius: 14, marginBottom: 16,
          background: isCorrect ? 'linear-gradient(135deg, #dcfce7, #bbf7d0)' : 'linear-gradient(135deg, #fef2f2, #fecaca)',
          border: `1px solid ${isCorrect ? '#86efac' : '#fca5a5'}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: isCorrect ? '#22c55e' : '#ef4444',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {isCorrect ? <Check size={20} /> : <X size={20} />}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: isCorrect ? '#166534' : '#991b1b' }}>
                {isCorrect ? '🎉 Chính xác!' : '❌ Chưa đúng'}
              </div>
              {!isCorrect && (
                <div style={{ fontSize: 14, color: '#991b1b', marginTop: 4 }}>
                  Đáp án: <strong>{exercise.answer}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12 }}>
        {!showResult ? (
          <button
            onClick={checkAnswer}
            disabled={exercise.type === 'reorder' ? selectedWords.length === 0 : !userInput.trim()}
            style={{
              flex: 1, padding: '14px 20px', borderRadius: 14, border: 'none',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
              opacity: (exercise.type === 'reorder' ? selectedWords.length === 0 : !userInput.trim()) ? 0.5 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <Pencil size={16} /> Kiểm tra
          </button>
        ) : (
          <button
            onClick={next}
            style={{
              flex: 1, padding: '14px 20px', borderRadius: 14, border: 'none',
              background: isLast ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {isLast ? (
              <><Sparkles size={16} /> Hoàn thành! ({score}/{exercises.length})</>
            ) : (
              <><ChevronRight size={16} /> Câu tiếp</>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
