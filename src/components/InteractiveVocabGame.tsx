'use client';

import { useState, useCallback, useEffect } from 'react';
import { Star, RotateCcw, Volume2, Check, X, Sparkles } from 'lucide-react';

// Inject keyframes for vocab game animations
function useVocabAnimations() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById('vocab-game-keyframes')) return;
    const style = document.createElement('style');
    style.id = 'vocab-game-keyframes';
    style.textContent = `
      @keyframes vg-card-flip { 0%{transform:rotateY(0)} 50%{transform:rotateY(90deg)} 100%{transform:rotateY(0)} }
      @keyframes vg-pop { 0%{transform:scale(0.6);opacity:0} 60%{transform:scale(1.15)} 100%{transform:scale(1);opacity:1} }
      @keyframes vg-confetti { 0%{transform:translateY(0) rotate(0);opacity:1} 100%{transform:translateY(-60px) rotate(360deg);opacity:0} }
      @keyframes vg-ring-fill { from{stroke-dashoffset:var(--vg-circ)} to{stroke-dashoffset:var(--vg-offset)} }
      @keyframes vg-bounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
      @keyframes vg-glow { 0%,100%{box-shadow:0 0 8px rgba(34,197,94,0.2)} 50%{box-shadow:0 0 20px rgba(34,197,94,0.5)} }
      @keyframes vg-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
    `;
    document.head.appendChild(style);
  }, []);
}

function ScoreRing({ score, total }: { score: number; total: number }) {
  const size = 120, stroke = 8, r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = total > 0 ? score / total : 0;
  const offset = circ - pct * circ;
  const color = pct >= 0.9 ? '#22c55e' : pct >= 0.7 ? '#f59e0b' : pct >= 0.5 ? '#3b82f6' : '#ef4444';
  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto 16px' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} stroke="#e2e8f0" strokeWidth={stroke} fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ '--vg-circ': circ, '--vg-offset': offset, animation: 'vg-ring-fill 1.5s cubic-bezier(0.4,0,0.2,1) forwards' } as React.CSSProperties} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 32, fontWeight: 900, color }}>{Math.round(pct * 100)}%</span>
        <span style={{ fontSize: 12, color: '#94a3b8' }}>{score}/{total}</span>
      </div>
    </div>
  );
}

interface VocabPair { en: string; vi: string; }

interface InteractiveVocabGameProps {
  words: VocabPair[];
  unitTitle: string;
  onComplete?: (score: number) => void;
}

type GameMode = 'menu' | 'flashcard' | 'match' | 'spell' | 'results';

export function InteractiveVocabGame({ words, unitTitle, onComplete }: InteractiveVocabGameProps) {
  useVocabAnimations();
  const [mode, setMode] = useState<GameMode>('menu');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [matchPairs, setMatchPairs] = useState<{ id: string; text: string; type: 'en' | 'vi'; matched: boolean; selected: boolean }[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [spellInput, setSpellInput] = useState('');
  const [spellFeedback, setSpellFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [streak, setStreak] = useState(0);
  const [, setTotalAttempts] = useState(0);

  const subset = words.slice(0, Math.min(8, words.length));
  const totalRounds = subset.length;

  // ── Speak word using Web Speech API ──
  const speak = useCallback((text: string, lang: string = 'en-US') => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      u.rate = 0.85;
      u.pitch = 1.1;
      window.speechSynthesis.speak(u);
    }
  }, []);

  // ── Init match game ──
  const initMatch = useCallback(() => {
    const pairs = subset.slice(0, 6);
    const cards = [
      ...pairs.map((w, i) => ({ id: `en-${i}`, text: w.en, type: 'en' as const, matched: false, selected: false })),
      ...pairs.map((w, i) => ({ id: `vi-${i}`, text: w.vi, type: 'vi' as const, matched: false, selected: false })),
    ].sort(() => Math.random() - 0.5);
    setMatchPairs(cards);
    setSelectedMatch(null);
    setScore(0);
  }, [subset]);

  // ── Handle match selection ──
  const handleMatch = useCallback((id: string) => {
    const card = matchPairs.find(c => c.id === id);
    if (!card || card.matched) return;

    if (!selectedMatch) {
      setSelectedMatch(id);
      setMatchPairs(prev => prev.map(c => c.id === id ? { ...c, selected: true } : c));
      return;
    }

    const first = matchPairs.find(c => c.id === selectedMatch)!;
    if (first.type === card.type) {
      setSelectedMatch(id);
      setMatchPairs(prev => prev.map(c => c.id === id ? { ...c, selected: true } : { ...c, selected: c.id === id }));
      return;
    }

    const firstIdx = parseInt(first.id.split('-')[1]);
    const secondIdx = parseInt(id.split('-')[1]);

    setTotalAttempts(p => p + 1);

    if (firstIdx === secondIdx) {
      setScore(p => p + 1);
      setStreak(p => p + 1);
      setMatchPairs(prev => prev.map(c =>
        (c.id === selectedMatch || c.id === id) ? { ...c, matched: true, selected: false } : c
      ));
      speak('Great!');
    } else {
      setStreak(0);
      const _t = setTimeout(() => {
        setMatchPairs(prev => prev.map(c => ({ ...c, selected: false })));
      }, 600);
      // Note: timer cleanup handled by component unmount
    }
    setSelectedMatch(null);
  }, [matchPairs, selectedMatch, speak]);

  // ── Check if match game is complete ──
  useEffect(() => {
    if (mode === 'match' && matchPairs.length > 0 && matchPairs.every(c => c.matched)) {
      const timer = setTimeout(() => setMode('results'), 800);
      return () => clearTimeout(timer);
    }
  }, [matchPairs, mode]);

  const glass = {
    background: 'rgba(255,255,255,0.85)',
    backdropFilter: 'blur(16px)',
    borderRadius: 20,
    border: '1px solid rgba(255,255,255,0.3)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
  };

  // ── MENU ──
  if (mode === 'menu') {
    return (
      <div style={{ ...glass, padding: 28 }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Sparkles size={28} style={{ color: '#f59e0b' }} />
          <h3 style={{ fontSize: 20, fontWeight: 900, color: '#1e1b4b', margin: '8px 0 4px' }}>
            🎮 Trò chơi từ vựng
          </h3>
          <p style={{ fontSize: 13, color: '#64748b' }}>{unitTitle} — {words.length} từ</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { id: 'flashcard' as GameMode, icon: '🃏', label: 'Flashcard', desc: 'Lật thẻ để nhớ từ', color: '#6366f1' },
            { id: 'match' as GameMode, icon: '🧩', label: 'Nối cặp', desc: 'Nối tiếng Anh với tiếng Việt', color: '#8b5cf6' },
            { id: 'spell' as GameMode, icon: '✏️', label: 'Chính tả', desc: 'Nghe và viết đúng từ', color: '#ec4899' },
          ].map(g => (
            <button
              key={g.id}
              onClick={() => { setMode(g.id); setScore(0); setRound(0); setStreak(0); setTotalAttempts(0); if (g.id === 'match') initMatch(); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px',
                borderRadius: 16, border: `2px solid ${g.color}22`, background: `${g.color}08`,
                cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = `0 4px 20px ${g.color}30`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <span style={{ fontSize: 32 }}>{g.icon}</span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 800, color: g.color }}>{g.label}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{g.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── FLASHCARD ──
  if (mode === 'flashcard') {
    const word = subset[round];
    return (
      <div style={{ ...glass, padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button onClick={() => setMode('menu')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontWeight: 700, fontSize: 14 }}>← Quay lại</button>
          <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>{round + 1} / {totalRounds}</span>
        </div>

        {/* Progress bar */}
        <div style={{ height: 6, background: '#e2e8f0', borderRadius: 3, marginBottom: 20, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${((round + 1) / totalRounds) * 100}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', borderRadius: 3, transition: 'width 0.4s' }} />
        </div>

        <div
          onClick={() => { setShowAnswer(!showAnswer); if (!showAnswer) speak(word.en); }}
          style={{
            ...glass, padding: 40, textAlign: 'center', cursor: 'pointer',
            background: showAnswer ? 'linear-gradient(135deg, #ede9fe, #fce7f3)' : 'linear-gradient(135deg, #eef2ff, #e0e7ff)',
            minHeight: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.4s, box-shadow 0.3s',
            animation: showAnswer ? 'vg-card-flip 0.5s ease' : undefined,
            boxShadow: showAnswer ? '0 8px 30px rgba(124, 58, 237, 0.15)' : '0 4px 16px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ fontSize: 36, fontWeight: 900, color: '#1e1b4b', marginBottom: 8 }}>
            {word.en}
          </div>
          {showAnswer ? (
            <div style={{ fontSize: 22, color: '#7c3aed', fontWeight: 700, marginTop: 8 }}>
              {word.vi}
            </div>
          ) : (
            <div style={{ fontSize: 14, color: '#94a3b8', marginTop: 8 }}>👆 Nhấn để xem nghĩa</div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, margin: '16px 0' }}>
          <button onClick={() => speak(word.en)} style={{ background: '#6366f1', border: 'none', borderRadius: 12, padding: '10px 16px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600 }}>
            <Volume2 size={16} /> Nghe phát âm
          </button>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <button
            onClick={() => { setShowAnswer(false); if (round < totalRounds - 1) setRound(r => r + 1); else setMode('results'); }}
            style={{ flex: 1, padding: '14px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #f97316, #ef4444)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          >
            <X size={16} /> Chưa nhớ
          </button>
          <button
            onClick={() => { setShowAnswer(false); setScore(s => s + 1); if (round < totalRounds - 1) setRound(r => r + 1); else setMode('results'); }}
            style={{ flex: 1, padding: '14px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          >
            <Check size={16} /> Đã nhớ!
          </button>
        </div>
      </div>
    );
  }

  // ── MATCH GAME ──
  if (mode === 'match') {
    return (
      <div style={{ ...glass, padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button onClick={() => setMode('menu')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontWeight: 700, fontSize: 14 }}>← Quay lại</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Star size={16} style={{ color: '#f59e0b' }} />
            <span style={{ fontSize: 14, fontWeight: 700, color: '#1e1b4b' }}>{score} cặp</span>
            {streak >= 2 && <span style={{ fontSize: 12, background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: 8, fontWeight: 700 }}>🔥 {streak}</span>}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {matchPairs.map(card => (
            <button
              key={card.id}
              onClick={() => !card.matched && handleMatch(card.id)}
              disabled={card.matched}
              style={{
                padding: '14px 8px', borderRadius: 14, fontSize: 14, fontWeight: 700, cursor: card.matched ? 'default' : 'pointer',
                border: card.selected ? '3px solid #6366f1' : card.matched ? '2px solid #22c55e' : '2px solid #e2e8f0',
                background: card.matched ? '#dcfce7' : card.selected ? '#eef2ff' : '#fff',
                color: card.matched ? '#16a34a' : card.type === 'en' ? '#1e1b4b' : '#7c3aed',
                opacity: card.matched ? 0.7 : 1,
                transition: 'all 0.25s',
                animation: card.matched ? 'vg-pop 0.4s ease-out' : card.selected ? 'vg-bounce 0.6s ease-in-out infinite' : undefined,
                minHeight: 56, wordBreak: 'break-word',
                boxShadow: card.selected ? '0 0 16px rgba(99,102,241,0.3)' : card.matched ? '0 0 12px rgba(34,197,94,0.2)' : 'none',
              }}
            >
              {card.text}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── SPELL GAME ──
  if (mode === 'spell') {
    const word = subset[round];
    return (
      <div style={{ ...glass, padding: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button onClick={() => setMode('menu')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontWeight: 700, fontSize: 14 }}>← Quay lại</button>
          <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>{round + 1} / {totalRounds}</span>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#7c3aed', marginBottom: 8 }}>
            {word.vi}
          </div>
          <button onClick={() => speak(word.en)} style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: 'none', borderRadius: 14, padding: '12px 24px', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 700, margin: '0 auto' }}>
            <Volume2 size={18} /> Nghe từ tiếng Anh
          </button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <input
            value={spellInput}
            onChange={e => { setSpellInput(e.target.value); setSpellFeedback(null); }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                setTotalAttempts(p => p + 1);
                if (spellInput.trim().toLowerCase() === word.en.toLowerCase()) {
                  setSpellFeedback('correct');
                  setScore(s => s + 1);
                  setStreak(s => s + 1);
                  speak('Excellent!');
                  setTimeout(() => {
                    setSpellInput(''); setSpellFeedback(null);
                    if (round < totalRounds - 1) setRound(r => r + 1); else setMode('results');
                  }, 1000);
                } else {
                  setSpellFeedback('wrong');
                  setStreak(0);
                }
              }
            }}
            placeholder="Viết từ tiếng Anh ở đây..."
            style={{
              width: '100%', padding: '16px 20px', fontSize: 20, fontWeight: 700, textAlign: 'center',
              borderRadius: 16, border: spellFeedback === 'correct' ? '3px solid #22c55e' : spellFeedback === 'wrong' ? '3px solid #ef4444' : '2px solid #e2e8f0',
              background: spellFeedback === 'correct' ? '#dcfce7' : spellFeedback === 'wrong' ? '#fef2f2' : '#fff',
              outline: 'none', color: '#1e1b4b', boxSizing: 'border-box',
            }}
          />
        </div>

        {spellFeedback === 'wrong' && (
          <div style={{ textAlign: 'center', color: '#ef4444', fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
            ❌ Thử lại! Gợi ý: {word.en.charAt(0)}{'_'.repeat(word.en.length - 1)}
          </div>
        )}

        {spellFeedback === 'correct' && (
          <div style={{ textAlign: 'center', color: '#22c55e', fontSize: 18, fontWeight: 800 }}>
            ✅ Chính xác! 🎉
          </div>
        )}

        {streak >= 3 && (
          <div style={{ textAlign: 'center', fontSize: 13, color: '#f59e0b', fontWeight: 700, marginTop: 8 }}>
            🔥 Streak: {streak} liên tiếp!
          </div>
        )}
      </div>
    );
  }

  // ── RESULTS ──
  const pct = totalRounds > 0 ? Math.round((score / totalRounds) * 100) : 0;
  const emoji = pct >= 90 ? '🏆' : pct >= 70 ? '⭐' : pct >= 50 ? '👍' : '💪';
  const confettiColors = ['#f59e0b', '#22c55e', '#6366f1', '#ec4899', '#3b82f6'];

  return (
    <div style={{ ...glass, padding: 32, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Confetti burst */}
      {pct >= 70 && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, pointerEvents: 'none', display: 'flex', justifyContent: 'center' }}>
          {confettiColors.map((c, i) => (
            <span key={i} style={{
              display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: c,
              animation: `vg-confetti 1.5s ease-out ${i * 0.15}s forwards`,
              marginLeft: (i - 2) * 24, marginTop: 20,
            }} />
          ))}
        </div>
      )}

      <div style={{ animation: 'vg-pop 0.6s ease-out' }}>
        <ScoreRing score={score} total={totalRounds} />
      </div>

      <h3 style={{ fontSize: 24, fontWeight: 900, color: '#1e1b4b', marginBottom: 4, animation: 'vg-pop 0.5s ease-out 0.3s both' }}>
        {emoji} Kết quả!
      </h3>
      <div style={{ fontSize: 16, color: '#64748b', marginBottom: 20, animation: 'vg-pop 0.5s ease-out 0.5s both' }}>
        {pct >= 90 ? 'Xuất sắc! Bạn đã thành thạo!' : pct >= 70 ? 'Rất tốt! Gần hoàn hảo!' : pct >= 50 ? 'Khá tốt! Cố thêm nữa nhé!' : 'Hãy ôn lại và thử lại!'}
      </div>

      <div style={{ display: 'flex', gap: 10, animation: 'vg-pop 0.5s ease-out 0.7s both' }}>
        <button
          onClick={() => { setMode('menu'); setScore(0); setRound(0); setStreak(0); setShowAnswer(false); setSpellInput(''); setSpellFeedback(null); setTotalAttempts(0); }}
          style={{ flex: 1, padding: '14px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'transform 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <RotateCcw size={16} /> Chơi lại
        </button>
      </div>
      {onComplete && (
        <button
          onClick={() => onComplete(score)}
          style={{ width: '100%', marginTop: 10, padding: '14px', borderRadius: 14, border: '2px solid #e2e8f0', background: '#fff', color: '#1e1b4b', fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#6366f1'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
        >
          Tiếp tục bài học →
        </button>
      )}
    </div>
  );
}
