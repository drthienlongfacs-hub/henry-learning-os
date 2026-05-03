'use client';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { TEXTBOOK_LIBRARY } from '@/data/textbook-library';
import { Volume2, Check, X, Brain, Sparkles } from 'lucide-react';
import { speak, type Accent } from '@/lib/voiceEngine';

interface VocabCard {
  word: string;
  viMeaning: string;
  phonetic: string;
  bookTitle: string;
  passageTitle: string;
  difficulty: string;
}

interface ReviewState {
  word: string;
  nextReview: number; // timestamp
  interval: number; // hours
  ease: number; // 1.3-2.5
  reps: number;
}

const STORAGE_KEY = 'henry-vocab-review';

function getReviewStates(): Record<string, ReviewState> {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch { return {}; }
}

function saveReviewStates(states: Record<string, ReviewState>) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
}




export default function VocabReview({ lang }: { lang: string }) {
  const vi = lang === 'vi';
  const [accent, setAccent] = useState<Accent>('en-US');
  const [flipped, setFlipped] = useState(false);
  const [cardIdx, setCardIdx] = useState(0);
  const [sessionDone, setSessionDone] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [reviewStates, setReviewStates] = useState<Record<string, ReviewState>>({});
  const [nowMs, setNowMs] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setNowMs(Date.now());
      setReviewStates(getReviewStates());
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  // Collect ALL vocab from ALL textbooks
  const allVocab: VocabCard[] = useMemo(() => {
    const cards: VocabCard[] = [];
    for (const book of TEXTBOOK_LIBRARY) {
      for (const p of book.passages) {
        for (const v of p.keyVocabulary) {
          cards.push({
            word: v.word,
            viMeaning: v.viMeaning,
            phonetic: v.phonetic || '',
            bookTitle: book.title,
            passageTitle: p.title,
            difficulty: p.difficulty,
          });
        }
      }
    }
    return cards;
  }, []);

  // Sort by review urgency — due items first, then new
  const sortedCards = useMemo(() => {
    const now = nowMs;
    return [...allVocab].sort((a, b) => {
      const sa = reviewStates[a.word];
      const sb = reviewStates[b.word];
      const da = sa ? sa.nextReview - now : -Infinity; // new = highest priority
      const db = sb ? sb.nextReview - now : -Infinity;
      return da - db;
    });
  }, [allVocab, reviewStates, nowMs]);

  const currentCard = sortedCards[cardIdx % sortedCards.length];
  const dueCount = useMemo(() => {
    return allVocab.filter(v => {
      const s = reviewStates[v.word];
      return !s || s.nextReview <= nowMs;
    }).length;
  }, [allVocab, reviewStates, nowMs]);

  const handleResult = useCallback((correct: boolean) => {
    if (!currentCard) return;
    const word = currentCard.word;
    const existing = { ...(reviewStates[word] || { word, nextReview: 0, interval: 1, ease: 2.0, reps: 0 }) };

    if (correct) {
      existing.reps += 1;
      existing.interval = Math.min(existing.interval * existing.ease, 720); // cap 30 days
      existing.ease = Math.min(existing.ease + 0.1, 2.5);
      setSessionCorrect(c => c + 1);
    } else {
      existing.interval = 1; // reset to 1 hour
      existing.ease = Math.max(existing.ease - 0.2, 1.3);
    }
    const now = Date.now();
    existing.nextReview = now + existing.interval * 3600000;

    const updated = { ...reviewStates, [word]: existing };
    setReviewStates(updated);
    saveReviewStates(updated);
    setNowMs(now);
    setSessionDone(d => d + 1);
    setFlipped(false);
    setCardIdx(i => i + 1);
  }, [currentCard, reviewStates]);

  if (!currentCard) return null;

  const masteredCount = Object.values(reviewStates).filter(s => s.reps >= 3).length;

  return (
    <div style={{
      marginBottom: '1.5rem', background: '#fff', borderRadius: '20px',
      border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
        padding: '1rem 1.25rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -15, right: -15, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <Brain size={18} color="#fff" />
            <h2 style={{ fontWeight: 800, fontSize: '0.95rem', margin: 0, color: '#fff' }}>
              {vi ? '🧠 Ôn Từ Vựng — Spaced Repetition' : '🧠 Vocab Review — Spaced Repetition'}
            </h2>
          </div>
          <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
            {vi ? `${dueCount} từ cần ôn • ${masteredCount}/${allVocab.length} đã thuộc` : `${dueCount} due • ${masteredCount}/${allVocab.length} mastered`}
          </p>
        </div>
      </div>

      {/* Accent selector */}
      <div style={{ padding: '0.5rem 1.25rem 0', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontSize: '0.58rem', color: '#64748b', fontWeight: 600 }}>🔊</span>
        {[
          { k: 'en-US' as Accent, f: '🇺🇸', l: 'US' },
          { k: 'en-GB' as Accent, f: '🇬🇧', l: 'UK' },
          { k: 'en-AU' as Accent, f: '🇦🇺', l: 'AU' },
        ].map(a => (
          <button key={a.k} onClick={() => setAccent(a.k)} style={{
            padding: '3px 8px', borderRadius: '6px', border: 'none', cursor: 'pointer',
            fontSize: '0.58rem', fontWeight: accent === a.k ? 700 : 500,
            background: accent === a.k ? '#2563eb' : '#f1f5f9',
            color: accent === a.k ? '#fff' : '#475569',
          }}>{a.f} {a.l}</button>
        ))}
      </div>

      <div style={{ padding: '1rem 1.25rem' }}>
        {/* Session progress */}
        {sessionDone > 0 && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            marginBottom: '0.75rem', fontSize: '0.65rem', color: '#64748b',
          }}>
            <Sparkles size={12} color="#f59e0b" />
            {vi ? `Phiên này: ${sessionDone} từ • ${sessionCorrect} đúng` : `Session: ${sessionDone} words • ${sessionCorrect} correct`}
            <div style={{
              flex: 1, height: 4, borderRadius: 2, background: '#f1f5f9', overflow: 'hidden',
            }}>
              <div style={{
                width: `${sessionDone > 0 ? (sessionCorrect / sessionDone * 100) : 0}%`,
                height: '100%', borderRadius: 2,
                background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
                transition: 'width 0.3s',
              }} />
            </div>
          </div>
        )}

        {/* Flashcard */}
        <div
          onClick={() => { if (!flipped) { setFlipped(true); speak(currentCard.word, accent, 0.65); } }}
          style={{
            background: flipped ? 'linear-gradient(135deg, #eff6ff, #dbeafe)' : 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
            borderRadius: '16px', border: `2px solid ${flipped ? '#93c5fd' : '#e2e8f0'}`,
            padding: '2rem 1.5rem', textAlign: 'center', cursor: flipped ? 'default' : 'pointer',
            minHeight: '180px', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          {!flipped ? (
            <>
              <div style={{ fontSize: '0.6rem', color: '#94a3b8', marginBottom: '0.5rem', fontWeight: 600 }}>
                {vi ? 'Chạm để lật thẻ' : 'Tap to flip'}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.3rem' }}>
                {currentCard.viMeaning}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                {vi ? 'Từ tiếng Anh là gì?' : 'What is the English word?'}
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#2563eb', marginBottom: '0.2rem' }}>
                {currentCard.word}
              </div>
              {currentCard.phonetic && (
                <div style={{ fontSize: '0.78rem', color: '#6366f1', fontStyle: 'italic', marginBottom: '0.3rem' }}>
                  {currentCard.phonetic}
                </div>
              )}
              <div style={{ fontSize: '0.88rem', color: '#059669', fontWeight: 600, marginBottom: '0.5rem' }}>
                🇻🇳 {currentCard.viMeaning}
              </div>
              <button onClick={(e) => { e.stopPropagation(); speak(currentCard.word, accent, 0.6); }} style={{
                padding: '5px 16px', borderRadius: '8px', border: 'none',
                background: '#2563eb', color: '#fff', fontWeight: 600, fontSize: '0.68rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
              }}>
                <Volume2 size={12} /> {vi ? 'Nghe phát âm' : 'Listen'}
              </button>
              <div style={{ fontSize: '0.55rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                📖 {currentCard.bookTitle} → {currentCard.passageTitle}
              </div>
            </>
          )}
        </div>

        {/* Answer buttons */}
        {flipped && (
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
            <button onClick={() => handleResult(false)} style={{
              flex: 1, padding: '10px', borderRadius: '12px', border: '2px solid #fca5a5',
              background: '#fef2f2', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer',
              color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
            }}>
              <X size={14} /> {vi ? 'Chưa nhớ' : 'Again'}
            </button>
            <button onClick={() => handleResult(true)} style={{
              flex: 2, padding: '10px', borderRadius: '12px', border: 'none',
              background: 'linear-gradient(135deg, #059669, #10b981)', color: '#fff',
              fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
            }}>
              <Check size={14} /> {vi ? 'Đã nhớ!' : 'Got it!'}
            </button>
          </div>
        )}

        {/* Stats bar */}
        <div style={{
          marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between',
          fontSize: '0.58rem', color: '#94a3b8',
        }}>
          <span>📚 {allVocab.length} {vi ? 'từ' : 'words'}</span>
          <span>🎯 {dueCount} {vi ? 'cần ôn' : 'due'}</span>
          <span>🏆 {masteredCount} {vi ? 'thuộc' : 'mastered'}</span>
        </div>
      </div>
    </div>
  );
}
