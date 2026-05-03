'use client';
/**
 * WordOfDay.tsx — Daily vocabulary spotlight
 * Ported from LinguaKids WordOfDay concept
 * Uses offline IPA database + TTS engine
 */
import React, { useState, useMemo } from 'react';
import { getOfflineIPA } from '@/data/ipaDatabase';
import { speak, type Accent } from '@/lib/voiceEngine';
import { Volume2, BookOpen, RefreshCw } from 'lucide-react';

interface WordEntry {
  word: string;
  meaning: string;
  meaningVi: string;
  example: string;
  exampleVi: string;
  category: string;
}

const WORD_BANK: WordEntry[] = [
  { word: 'adventure', meaning: 'An exciting experience', meaningVi: 'Cuộc phiêu lưu', example: 'We went on a great adventure.', exampleVi: 'Chúng tôi đã có một cuộc phiêu lưu tuyệt vời.', category: '🌍 Travel' },
  { word: 'courage', meaning: 'Bravery when facing danger', meaningVi: 'Lòng dũng cảm', example: 'She showed great courage.', exampleVi: 'Cô ấy thể hiện lòng dũng cảm lớn.', category: '💪 Character' },
  { word: 'curious', meaning: 'Eager to learn or know', meaningVi: 'Tò mò', example: 'The curious cat explored the garden.', exampleVi: 'Con mèo tò mò khám phá khu vườn.', category: '🧠 Mind' },
  { word: 'discover', meaning: 'Find something for the first time', meaningVi: 'Khám phá', example: 'Scientists discover new species every year.', exampleVi: 'Các nhà khoa học khám phá loài mới mỗi năm.', category: '🔬 Science' },
  { word: 'enormous', meaning: 'Extremely large', meaningVi: 'Khổng lồ', example: 'The elephant was enormous!', exampleVi: 'Con voi thật khổng lồ!', category: '📏 Size' },
  { word: 'imagine', meaning: 'Form a picture in your mind', meaningVi: 'Tưởng tượng', example: 'Imagine you can fly!', exampleVi: 'Hãy tưởng tượng bạn có thể bay!', category: '🎨 Creativity' },
  { word: 'journey', meaning: 'A long trip', meaningVi: 'Hành trình', example: 'The journey took three days.', exampleVi: 'Hành trình kéo dài ba ngày.', category: '🌍 Travel' },
  { word: 'knowledge', meaning: 'Facts and information', meaningVi: 'Kiến thức', example: 'Reading builds knowledge.', exampleVi: 'Đọc sách xây dựng kiến thức.', category: '📚 Learning' },
  { word: 'laughter', meaning: 'The sound of laughing', meaningVi: 'Tiếng cười', example: 'The room was full of laughter.', exampleVi: 'Căn phòng tràn ngập tiếng cười.', category: '😄 Emotions' },
  { word: 'mystery', meaning: 'Something hard to explain', meaningVi: 'Bí ẩn', example: 'The old house was a mystery.', exampleVi: 'Ngôi nhà cũ là một bí ẩn.', category: '🔍 Puzzle' },
  { word: 'patience', meaning: 'Ability to wait calmly', meaningVi: 'Sự kiên nhẫn', example: 'Learning requires patience.', exampleVi: 'Học tập cần sự kiên nhẫn.', category: '💪 Character' },
  { word: 'precious', meaning: 'Very valuable', meaningVi: 'Quý giá', example: 'Time is precious.', exampleVi: 'Thời gian thật quý giá.', category: '💎 Value' },
  { word: 'strength', meaning: 'Being strong', meaningVi: 'Sức mạnh', example: 'Exercise builds strength.', exampleVi: 'Tập thể dục xây dựng sức mạnh.', category: '💪 Character' },
  { word: 'wonderful', meaning: 'Extremely good', meaningVi: 'Tuyệt vời', example: 'What a wonderful day!', exampleVi: 'Thật là một ngày tuyệt vời!', category: '🌟 Quality' },
];

function getTodayWord(): WordEntry {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return WORD_BANK[dayOfYear % WORD_BANK.length];
}

export default function WordOfDay({ lang = 'vi' }: { lang?: string }) {
  const vi = lang === 'vi';
  const todayWord = useMemo(() => getTodayWord(), []);
  const ipa = getOfflineIPA(todayWord.word);
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
      borderRadius: '20px', padding: '20px', color: '#fff',
      boxShadow: '0 8px 32px rgba(20, 184, 166, 0.3)',
      cursor: 'pointer', transition: 'transform 0.2s',
    }} onClick={() => setExpanded(!expanded)}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={16} />
          <span style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>
            {vi ? 'Từ vựng mỗi ngày' : 'Word of the Day'}
          </span>
        </div>
        <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>{todayWord.category}</span>
      </div>

      {/* Word */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <span style={{ fontSize: '1.6rem', fontWeight: 900, letterSpacing: '-0.5px' }}>{todayWord.word}</span>
        <button onClick={(e) => { e.stopPropagation(); speak(todayWord.word, 'en-US', 0.85); }}
          style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
            width: '32px', height: '32px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', cursor: 'pointer', color: '#fff',
          }}>
          <Volume2 size={16} />
        </button>
      </div>

      {ipa && <div style={{ fontSize: '0.82rem', opacity: 0.7, marginBottom: '6px', fontFamily: 'serif' }}>{ipa}</div>}
      <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{vi ? todayWord.meaningVi : todayWord.meaning}</div>

      {expanded && (
        <div style={{
          marginTop: '14px', padding: '14px', borderRadius: '14px',
          background: 'rgba(0,0,0,0.15)',
        }}>
          <div style={{ fontSize: '0.82rem', fontStyle: 'italic', marginBottom: '6px', opacity: 0.9 }}>
            &ldquo;{todayWord.example}&rdquo;
          </div>
          <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>
            {todayWord.exampleVi}
          </div>
          <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
            {(['en-US', 'en-GB', 'en-AU'] as Accent[]).map(acc => (
              <button key={acc} onClick={(e) => { e.stopPropagation(); speak(todayWord.example, acc, 0.88); }}
                style={{
                  padding: '4px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.65rem',
                  fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                }}>
                <Volume2 size={10} />
                {acc === 'en-US' ? '🇺🇸' : acc === 'en-GB' ? '🇬🇧' : '🇦🇺'}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
