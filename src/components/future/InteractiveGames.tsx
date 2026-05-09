'use client';
import { useState, useCallback } from 'react';

// ═══ SORTING GAME — Drag items into correct bins (Khan Academy Kids pattern) ═══
interface SortItem { id: string; label: string; emoji: string; category: string }
interface SortGameProps { items: SortItem[]; categories: { id: string; label: string; color: string; emoji: string }[]; onComplete: (score: number) => void; title: string }

export function SortingGame({ items, categories, onComplete, title }: SortGameProps) {
  const [remaining, setRemaining] = useState(items);
  const [bins, setBins] = useState<Record<string, SortItem[]>>(() => Object.fromEntries(categories.map(c => [c.id, []])));
  const [feedback, setFeedback] = useState<{ correct: boolean; item: string } | null>(null);
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);

  const handleDrop = (catId: string) => {
    if (current >= items.length) return;
    const item = remaining[0];
    if (!item) return;
    const correct = item.category === catId;
    setFeedback({ correct, item: item.label });
    if (correct) {
      setScore(s => s + 1);
      setBins(b => ({ ...b, [catId]: [...b[catId], item] }));
      setRemaining(r => r.slice(1));
      setCurrent(c => c + 1);
    }
    setTimeout(() => {
      setFeedback(null);
      if (correct && current + 1 >= items.length) onComplete(score + 1);
    }, 800);
  };

  const item = remaining[0];
  const done = current >= items.length;

  return (
    <div style={{ background: 'linear-gradient(135deg,#1e1b4b,#312e81)', borderRadius: 20, padding: 24, marginBottom: 16 }}>
      <h3 style={{ color: '#c7d2fe', fontSize: 16, fontWeight: 700, margin: '0 0 4px', textAlign: 'center' }}>🎮 {title}</h3>
      <p style={{ color: '#818cf8', fontSize: 12, margin: '0 0 16px', textAlign: 'center' }}>Chạm vào nhóm đúng cho mỗi vật!</p>

      {/* Progress dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 16 }}>
        {items.map((_, i) => (
          <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: i < current ? '#22c55e' : i === current ? '#fbbf24' : 'rgba(255,255,255,0.2)', transition: 'all 0.3s' }} />
        ))}
      </div>

      {!done && item && (
        <>
          {/* Current item to sort */}
          <div style={{
            background: feedback ? (feedback.correct ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)') : 'rgba(255,255,255,0.1)',
            borderRadius: 16, padding: 20, textAlign: 'center', marginBottom: 16,
            border: feedback ? (feedback.correct ? '2px solid #22c55e' : '2px solid #ef4444') : '2px solid rgba(255,255,255,0.2)',
            transition: 'all 0.3s', animation: feedback && !feedback.correct ? 'shake 0.4s' : undefined,
          }}>
            <span style={{ fontSize: 48, display: 'block', marginBottom: 8 }}>{item.emoji}</span>
            <span style={{ color: '#e2e8f0', fontSize: 18, fontWeight: 700 }}>{item.label}</span>
            {feedback && <div style={{ color: feedback.correct ? '#86efac' : '#fca5a5', fontSize: 14, marginTop: 8, fontWeight: 600 }}>
              {feedback.correct ? '✅ Đúng rồi!' : '❌ Thử lại nhé!'}
            </div>}
          </div>

          {/* Category bins */}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${categories.length}, 1fr)`, gap: 10 }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => handleDrop(cat.id)} style={{
                background: cat.color, border: 'none', borderRadius: 14, padding: '16px 8px', cursor: 'pointer',
                transition: 'transform 0.2s', minHeight: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
                <span style={{ fontSize: 28 }}>{cat.emoji}</span>
                <span style={{ color: '#fff', fontSize: 12, fontWeight: 700, textAlign: 'center' }}>{cat.label}</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10 }}>{bins[cat.id].length} items</span>
              </button>
            ))}
          </div>
        </>
      )}

      {done && (
        <div style={{ textAlign: 'center', padding: 20, animation: 'scaleIn 0.4s' }}>
          <div style={{ fontSize: 64, marginBottom: 8 }}>{score === items.length ? '🌟' : '👍'}</div>
          <p style={{ color: '#86efac', fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>{score}/{items.length} đúng!</p>
          <p style={{ color: '#a5b4fc', fontSize: 13 }}>{score === items.length ? 'Xuất sắc! Bạn phân loại giỏi lắm!' : 'Khá lắm! Thử lại để đạt điểm cao hơn!'}</p>
        </div>
      )}
    </div>
  );
}

// ═══ SEQUENCE GAME — Arrange steps in correct order (Duolingo pattern) ═══
interface SeqGameProps { steps: { text: string; emoji: string }[]; title: string; onComplete: (score: number) => void }

export function SequenceGame({ steps, title, onComplete }: SeqGameProps) {
  const [shuffled] = useState(() => [...steps].sort(() => Math.random() - 0.5));
  const [placed, setPlaced] = useState<typeof steps>([]);
  const [available, setAvailable] = useState(shuffled);
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);

  const handlePick = (idx: number) => {
    const item = available[idx];
    const correctNext = steps[placed.length];
    if (item.text === correctNext.text) {
      setPlaced(p => [...p, item]);
      setAvailable(a => a.filter((_, i) => i !== idx));
      if (placed.length + 1 === steps.length) onComplete(steps.length);
    } else {
      setWrongIdx(idx);
      setTimeout(() => setWrongIdx(null), 600);
    }
  };

  const done = placed.length === steps.length;

  return (
    <div style={{ background: 'linear-gradient(135deg,#0c4a6e,#0369a1)', borderRadius: 20, padding: 24, marginBottom: 16 }}>
      <h3 style={{ color: '#bae6fd', fontSize: 16, fontWeight: 700, margin: '0 0 4px', textAlign: 'center' }}>🧩 {title}</h3>
      <p style={{ color: '#7dd3fc', fontSize: 12, margin: '0 0 16px', textAlign: 'center' }}>Sắp xếp các bước theo đúng thứ tự!</p>

      {/* Placed steps */}
      <div style={{ marginBottom: 16 }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            background: i < placed.length ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.05)',
            border: i < placed.length ? '2px solid rgba(34,197,94,0.4)' : '2px dashed rgba(255,255,255,0.15)',
            borderRadius: 12, padding: '10px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10,
            transition: 'all 0.3s',
          }}>
            <span style={{ background: i < placed.length ? '#22c55e' : 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
            <span style={{ color: i < placed.length ? '#86efac' : '#475569', fontSize: 13, fontWeight: 500 }}>
              {i < placed.length ? `${placed[i].emoji} ${placed[i].text}` : '...'}
            </span>
          </div>
        ))}
      </div>

      {/* Available choices */}
      {!done && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {available.map((item, i) => (
            <button key={i} onClick={() => handlePick(i)} style={{
              background: wrongIdx === i ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.12)',
              border: wrongIdx === i ? '2px solid #ef4444' : '2px solid rgba(255,255,255,0.2)',
              borderRadius: 12, padding: '10px 14px', cursor: 'pointer', color: '#e2e8f0', fontSize: 13, fontWeight: 600,
              transition: 'all 0.2s', animation: wrongIdx === i ? 'shake 0.4s' : undefined,
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
              {item.emoji} {item.text}
            </button>
          ))}
        </div>
      )}

      {done && (
        <div style={{ textAlign: 'center', padding: 16, animation: 'scaleIn 0.4s' }}>
          <div style={{ fontSize: 48 }}>🎉</div>
          <p style={{ color: '#86efac', fontSize: 18, fontWeight: 700, margin: '8px 0' }}>Sắp xếp đúng hết!</p>
        </div>
      )}
    </div>
  );
}

// ═══ MATCHING GAME — Match items with their pairs ═══
interface MatchPair { left: string; leftEmoji: string; right: string; rightEmoji: string }
interface MatchGameProps { pairs: MatchPair[]; title: string; onComplete: (score: number) => void }

export function MatchingGame({ pairs, title, onComplete }: MatchGameProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [rightShuffled] = useState(() => [...pairs].sort(() => Math.random() - 0.5));
  const [wrongPair, setWrongPair] = useState<{ l: number; r: number } | null>(null);

  const handleRightClick = (rightIdx: number) => {
    if (selected === null) return;
    const leftItem = pairs[selected];
    const rightItem = rightShuffled[rightIdx];
    if (leftItem.right === rightItem.right) {
      setMatched(m => new Set([...m, selected]));
      setSelected(null);
      if (matched.size + 1 === pairs.length) onComplete(pairs.length);
    } else {
      setWrongPair({ l: selected, r: rightIdx });
      setTimeout(() => { setWrongPair(null); setSelected(null); }, 600);
    }
  };

  return (
    <div style={{ background: 'linear-gradient(135deg,#3b0764,#6b21a8)', borderRadius: 20, padding: 24, marginBottom: 16 }}>
      <h3 style={{ color: '#e9d5ff', fontSize: 16, fontWeight: 700, margin: '0 0 4px', textAlign: 'center' }}>🔗 {title}</h3>
      <p style={{ color: '#c084fc', fontSize: 12, margin: '0 0 16px', textAlign: 'center' }}>Nối cặp phù hợp!</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {pairs.map((p, i) => (
            <button key={i} onClick={() => !matched.has(i) && setSelected(i)} style={{
              background: matched.has(i) ? 'rgba(34,197,94,0.2)' : selected === i ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.08)',
              border: matched.has(i) ? '2px solid #22c55e' : selected === i ? '2px solid #fbbf24' : '2px solid rgba(255,255,255,0.15)',
              borderRadius: 12, padding: '12px 10px', cursor: matched.has(i) ? 'default' : 'pointer',
              color: '#e2e8f0', fontSize: 13, fontWeight: 600, textAlign: 'center', transition: 'all 0.2s',
              opacity: matched.has(i) ? 0.6 : 1,
            }}>
              {p.leftEmoji} {p.left}
            </button>
          ))}
        </div>
        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {rightShuffled.map((p, i) => {
            const isMatched = [...matched].some(mi => pairs[mi].right === p.right);
            return (
              <button key={i} onClick={() => !isMatched && handleRightClick(i)} style={{
                background: isMatched ? 'rgba(34,197,94,0.2)' : wrongPair?.r === i ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.08)',
                border: isMatched ? '2px solid #22c55e' : wrongPair?.r === i ? '2px solid #ef4444' : '2px solid rgba(255,255,255,0.15)',
                borderRadius: 12, padding: '12px 10px', cursor: isMatched ? 'default' : 'pointer',
                color: '#e2e8f0', fontSize: 13, fontWeight: 600, textAlign: 'center', transition: 'all 0.2s',
                opacity: isMatched ? 0.6 : 1, animation: wrongPair?.r === i ? 'shake 0.4s' : undefined,
              }}>
                {p.rightEmoji} {p.right}
              </button>
            );
          })}
        </div>
      </div>

      {matched.size === pairs.length && (
        <div style={{ textAlign: 'center', padding: 16, marginTop: 12, animation: 'scaleIn 0.4s' }}>
          <div style={{ fontSize: 48 }}>🌟</div>
          <p style={{ color: '#86efac', fontSize: 18, fontWeight: 700 }}>Nối đúng hết rồi!</p>
        </div>
      )}
    </div>
  );
}

// ═══ VISUAL PROGRESS RING — SVG circular progress (Duolingo style) ═══
export function ProgressRing({ progress, color, size = 80, label }: { progress: number; color: string; size?: number; label: string }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (progress / 100) * circ;
  return (
    <div style={{ textAlign: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={6} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={6}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
      </svg>
      <div style={{ marginTop: -size/2 - 10, position: 'relative', zIndex: 1 }}>
        <span style={{ color: '#fff', fontSize: size/4, fontWeight: 800 }}>{Math.round(progress)}%</span>
      </div>
      <p style={{ color: '#94a3b8', fontSize: 11, marginTop: size/4, fontWeight: 600 }}>{label}</p>
    </div>
  );
}

// ═══ SAMPLE GALLERY — Show example outputs (Montessori pattern) ═══
export function SampleGallery({ samples }: { samples: { emoji: string; label: string; desc: string }[] }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h4 style={{ color: '#fbbf24', fontSize: 14, fontWeight: 700, margin: '0 0 10px' }}>📸 Ví dụ mẫu — Bé có thể làm thế này:</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10 }}>
        {samples.map((s, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 14, padding: 14, textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: 40, marginBottom: 6 }}>{s.emoji}</div>
            <div style={{ color: '#e2e8f0', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{s.label}</div>
            <div style={{ color: '#94a3b8', fontSize: 10, lineHeight: 1.4 }}>{s.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══ STAR RATING — Visual reward feedback ═══
export function StarRating({ earned, total }: { earned: number; total: number }) {
  return (
    <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} style={{ fontSize: 28, filter: i < earned ? 'none' : 'grayscale(1) opacity(0.3)', transition: 'all 0.3s', animationDelay: `${i * 0.1}s` }}>⭐</span>
      ))}
    </div>
  );
}
