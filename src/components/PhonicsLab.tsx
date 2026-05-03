'use client';
import React, { useState, useCallback } from 'react';
import { Volume2, CheckCircle, RotateCcw, Star, Mic, ChevronRight } from 'lucide-react';

type Accent = 'en-US' | 'en-GB' | 'en-AU';

const PHONICS_LESSONS = [
  {
    id: 'short-vowels',
    title: 'Short Vowels',
    titleVi: 'Nguyên âm ngắn',
    icon: '🔤',
    pairs: [
      { sound: '/æ/', example: 'cat', vi: 'con mèo', words: ['bat', 'hat', 'map', 'fan', 'bag'] },
      { sound: '/ɛ/', example: 'bed', vi: 'cái giường', words: ['red', 'hen', 'pen', 'ten', 'leg'] },
      { sound: '/ɪ/', example: 'sit', vi: 'ngồi', words: ['big', 'pig', 'fin', 'kit', 'lip'] },
      { sound: '/ɒ/', example: 'hot', vi: 'nóng', words: ['dog', 'box', 'pot', 'mop', 'top'] },
      { sound: '/ʌ/', example: 'cup', vi: 'cái cốc', words: ['bus', 'run', 'sun', 'mud', 'nut'] },
    ],
  },
  {
    id: 'long-vowels',
    title: 'Long Vowels',
    titleVi: 'Nguyên âm dài',
    icon: '📏',
    pairs: [
      { sound: '/eɪ/', example: 'cake', vi: 'bánh', words: ['name', 'game', 'lake', 'make', 'rain'] },
      { sound: '/iː/', example: 'tree', vi: 'cái cây', words: ['see', 'bee', 'green', 'leaf', 'read'] },
      { sound: '/aɪ/', example: 'kite', vi: 'diều', words: ['bike', 'five', 'nice', 'time', 'mine'] },
      { sound: '/oʊ/', example: 'boat', vi: 'thuyền', words: ['goat', 'home', 'nose', 'bone', 'road'] },
      { sound: '/uː/', example: 'moon', vi: 'mặt trăng', words: ['food', 'cool', 'pool', 'blue', 'true'] },
    ],
  },
  {
    id: 'consonant-blends',
    title: 'Consonant Blends',
    titleVi: 'Phụ âm ghép',
    icon: '🔗',
    pairs: [
      { sound: '/θ/', example: 'think', vi: 'nghĩ', words: ['thin', 'three', 'math', 'bath', 'tooth'] },
      { sound: '/ð/', example: 'this', vi: 'cái này', words: ['that', 'them', 'then', 'with', 'weather'] },
      { sound: '/ʃ/', example: 'ship', vi: 'tàu', words: ['shop', 'fish', 'shoe', 'push', 'wish'] },
      { sound: '/tʃ/', example: 'chair', vi: 'ghế', words: ['child', 'cheese', 'lunch', 'teach', 'beach'] },
      { sound: '/dʒ/', example: 'jump', vi: 'nhảy', words: ['joy', 'gem', 'page', 'bridge', 'large'] },
    ],
  },
  {
    id: 'tricky-pairs',
    title: 'Tricky Pairs',
    titleVi: 'Cặp âm dễ nhầm',
    icon: '⚡',
    pairs: [
      { sound: '/b/ vs /v/', example: 'bat vs vat', vi: 'con dơi vs thùng', words: ['berry–very', 'boat–vote', 'ban–van'] },
      { sound: '/l/ vs /r/', example: 'light vs right', vi: 'ánh sáng vs phải', words: ['lead–read', 'lip–rip', 'lice–rice'] },
      { sound: '/s/ vs /z/', example: 'sip vs zip', vi: 'nhấp vs kéo khóa', words: ['seal–zeal', 'bus–buzz', 'price–prize'] },
      { sound: '/n/ vs /ŋ/', example: 'sin vs sing', vi: 'tội vs hát', words: ['win–wing', 'thin–thing', 'ban–bang'] },
    ],
  },
];

function speak(text: string, accent: Accent, rate = 0.7) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = accent; u.rate = rate; u.pitch = 1.05;
  window.speechSynthesis.speak(u);
}

export default function PhonicsLab({ lang }: { lang: string }) {
  const [lessonIdx, setLessonIdx] = useState(0);
  const [pairIdx, setPairIdx] = useState(0);
  const [accent, setAccent] = useState<Accent>('en-US');
  const [practiced, setPracticed] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const vi = lang === 'vi';
  const lesson = PHONICS_LESSONS[lessonIdx];
  const pair = lesson.pairs[pairIdx];

  const markPracticed = useCallback((word: string) => {
    setPracticed(prev => new Set(prev).add(word));
    speak(word, accent, 0.65);
  }, [accent]);

  const nextPair = () => {
    if (pairIdx < lesson.pairs.length - 1) {
      setPairIdx(p => p + 1);
    } else if (lessonIdx < PHONICS_LESSONS.length - 1) {
      setLessonIdx(l => l + 1);
      setPairIdx(0);
    }
  };

  const totalPracticed = practiced.size;
  const totalWords = PHONICS_LESSONS.reduce((s, l) => s + l.pairs.reduce((s2, p) => s2 + p.words.length, 0), 0);

  return (
    <div style={{
      marginBottom: '1.5rem', background: '#fff', borderRadius: '20px',
      border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
        padding: '1rem 1.25rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -15, right: -15, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <Mic size={18} color="#fff" />
            <h2 style={{ fontWeight: 800, fontSize: '0.95rem', margin: 0, color: '#fff' }}>
              {vi ? '🎤 Phòng Luyện Phát Âm' : '🎤 Phonics Lab'}
            </h2>
          </div>
          <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
            {vi ? `${totalPracticed}/${totalWords} từ đã luyện • IPA chuẩn quốc tế` : `${totalPracticed}/${totalWords} words practiced • International IPA`}
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
            background: accent === a.k ? '#7c3aed' : '#f1f5f9',
            color: accent === a.k ? '#fff' : '#475569',
          }}>{a.f} {a.l}</button>
        ))}
      </div>

      {/* Lesson tabs */}
      <div style={{ display: 'flex', padding: '0.5rem 1.25rem', gap: '0.3rem', overflowX: 'auto' }}>
        {PHONICS_LESSONS.map((l, i) => (
          <button key={l.id} onClick={() => { setLessonIdx(i); setPairIdx(0); }} style={{
            padding: '5px 10px', borderRadius: '8px', border: 'none', cursor: 'pointer',
            fontSize: '0.6rem', fontWeight: lessonIdx === i ? 700 : 500, whiteSpace: 'nowrap',
            background: lessonIdx === i ? '#7c3aed' : '#f8fafc',
            color: lessonIdx === i ? '#fff' : '#64748b',
          }}>{l.icon} {vi ? l.titleVi : l.title}</button>
        ))}
      </div>

      <div style={{ padding: '0.75rem 1.25rem 1.25rem' }}>
        {/* Current sound card */}
        <div style={{
          background: 'linear-gradient(135deg, #faf5ff, #f3e8ff)',
          borderRadius: '16px', border: '1px solid #e9d5ff',
          padding: '1.25rem', textAlign: 'center', marginBottom: '0.75rem',
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#7c3aed', fontFamily: 'serif', marginBottom: '0.3rem' }}>
            {pair.sound}
          </div>
          <button onClick={() => speak(pair.example, accent, 0.55)} style={{
            padding: '6px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', color: '#fff',
            fontWeight: 700, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px',
          }}>
            <Volume2 size={16} /> {pair.example}
          </button>
          <div style={{ fontSize: '0.72rem', color: '#7c3aed', fontStyle: 'italic', marginTop: '0.3rem' }}>
            🇻🇳 {pair.vi}
          </div>
        </div>

        {/* Practice words */}
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
          {vi ? '🎯 Luyện tập — chạm để nghe và đánh dấu:' : '🎯 Practice — tap to hear and mark:'}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '0.4rem' }}>
          {pair.words.map(w => {
            const isDone = practiced.has(w);
            return (
              <button key={w} onClick={() => markPracticed(w)} style={{
                padding: '8px', borderRadius: '10px', cursor: 'pointer',
                border: isDone ? '2px solid #7c3aed' : '1px solid #e2e8f0',
                background: isDone ? '#f5f3ff' : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                fontWeight: 600, fontSize: '0.78rem', color: isDone ? '#7c3aed' : '#334155',
                transition: 'all 0.15s',
              }}>
                {isDone ? <CheckCircle size={12} color="#7c3aed" /> : <Volume2 size={12} color="#94a3b8" />}
                {w}
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
          <button onClick={() => setPairIdx(p => Math.max(0, p - 1))} disabled={pairIdx === 0 && lessonIdx === 0} style={{
            flex: 1, padding: '8px', borderRadius: '10px', border: '1px solid #e2e8f0',
            background: '#f8fafc', fontWeight: 600, fontSize: '0.72rem', cursor: 'pointer',
            color: '#64748b', opacity: pairIdx === 0 && lessonIdx === 0 ? 0.4 : 1,
          }}>
            <RotateCcw size={12} /> {vi ? 'Trước' : 'Prev'}
          </button>
          <button onClick={nextPair} style={{
            flex: 2, padding: '8px 16px', borderRadius: '10px', border: 'none',
            background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', color: '#fff',
            fontWeight: 700, fontSize: '0.72rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
          }}>
            {vi ? 'Tiếp theo' : 'Next'} <ChevronRight size={14} />
          </button>
        </div>

        {/* Progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '0.5rem' }}>
          {lesson.pairs.map((_, i) => (
            <div key={i} style={{
              width: i === pairIdx ? 20 : 8, height: 8, borderRadius: '4px',
              background: i < pairIdx ? '#7c3aed' : i === pairIdx ? '#a78bfa' : '#e2e8f0',
              transition: 'all 0.2s',
            }} />
          ))}
        </div>
      </div>
    </div>
  );
}
