'use client';

import { useState, useCallback } from 'react';
import { Volume2, VolumeX, Pause, RotateCcw } from 'lucide-react';
import { speak as speakVoice, stopSpeech, findBestVoice, type Accent } from '@/lib/voiceEngine';

interface TextToSpeechProps {
  text: string;
  lang?: 'en-US' | 'vi-VN' | 'en-GB';
  rate?: number;
  label?: string;
  variant?: 'inline' | 'block';
}

export function TextToSpeech({ text, lang = 'en-US', rate = 0.9, label, variant = 'inline' }: TextToSpeechProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported] = useState(() =>
    typeof window !== 'undefined' && ('speechSynthesis' in window || 'indexedDB' in window)
  );

  const speak = useCallback(() => {
    if (!isSupported) return;
    const accent: Accent = lang === 'en-GB' ? 'en-GB' : 'en-US';
    setIsSpeaking(true);
    speakVoice(
      text,
      accent,
      rate,
      () => setIsSpeaking(false),
      () => setIsSpeaking(true)
    );
  }, [text, lang, rate, isSupported]);

  const stop = useCallback(() => {
    stopSpeech();
    setIsSpeaking(false);
  }, []);

  if (!isSupported) return null;

  if (variant === 'block') {
    return (
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 12,
          background: isSpeaking ? 'linear-gradient(135deg, #dbeafe, #ede9fe)' : '#f8fafc',
          borderRadius: 14, padding: '12px 18px',
          border: `1px solid ${isSpeaking ? '#93c5fd' : '#e2e8f0'}`,
          transition: 'all 0.3s ease',
          cursor: 'pointer',
        }}
        onClick={isSpeaking ? stop : speak}
      >
        <div style={{
          width: 42, height: 42, borderRadius: '50%',
          background: isSpeaking ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'linear-gradient(135deg, #3b82f6, #6366f1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', flexShrink: 0,
          animation: isSpeaking ? 'pulse 1.5s infinite' : 'none',
        }}>
          {isSpeaking ? <Pause size={20} /> : <Volume2 size={20} />}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1e1b4b' }}>
            {label || (isSpeaking ? '🔊 Đang nghe...' : '🔈 Bấm để nghe đọc')}
          </div>
          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2, lineHeight: 1.4 }}>
            {text.length > 80 ? text.slice(0, 80) + '...' : text}
          </div>
        </div>
        {isSpeaking && (
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{
                width: 3, borderRadius: 2,
                background: '#6366f1',
                animation: `soundbar 0.6s ${i * 0.15}s ease-in-out infinite alternate`,
              }} />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Inline variant — small button
  return (
    <button
      onClick={isSpeaking ? stop : speak}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 32, height: 32, borderRadius: '50%',
        background: isSpeaking ? '#6366f1' : '#e0e7ff',
        color: isSpeaking ? '#fff' : '#6366f1',
        border: 'none', cursor: 'pointer',
        transition: 'all 0.2s',
        animation: isSpeaking ? 'pulse 1.5s infinite' : 'none',
      }}
      title={isSpeaking ? 'Dừng' : 'Nghe phát âm'}
    >
      {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
    </button>
  );
}

// Highlight words as they are read — used in reading passages
interface ReadAlongProps {
  text: string;
  lang?: 'en-US' | 'vi-VN' | 'en-GB';
  rate?: number;
}

export function ReadAlong({ text, lang = 'en-US', rate = 0.7 }: ReadAlongProps) {
  const [isReading, setIsReading] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const words = text.split(/\s+/);

  const startReading = useCallback(() => {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const accent: Accent = lang === 'en-GB' ? 'en-GB' : 'en-US';
    const bestVoice = findBestVoice(accent);
    if (bestVoice) {
      utterance.voice = bestVoice;
    }
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = 1.0; // Natural warm pitch
    
    // Word boundary events for highlighting
    let wordIdx = 0;
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        setCurrentWordIndex(wordIdx);
        wordIdx++;
      }
    };
    
    utterance.onstart = () => { setIsReading(true); setCurrentWordIndex(0); };
    utterance.onend = () => { setIsReading(false); setCurrentWordIndex(-1); };
    utterance.onerror = () => { setIsReading(false); setCurrentWordIndex(-1); };
    
    speechSynthesis.speak(utterance);
  }, [text, lang, rate]);

  const stopReading = useCallback(() => {
    speechSynthesis.cancel();
    setIsReading(false);
    setCurrentWordIndex(-1);
  }, []);

  return (
    <div>
      {/* Control button */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button
          onClick={isReading ? stopReading : startReading}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 18px', borderRadius: 12, border: 'none',
            background: isReading ? '#ef4444' : 'linear-gradient(135deg, #3b82f6, #6366f1)',
            color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          {isReading ? <><Pause size={16} /> Dừng</> : <><Volume2 size={16} /> 📖 Nghe đọc cùng</>}
        </button>
        {!isReading && currentWordIndex === -1 && (
          <button
            onClick={startReading}
            style={{
              padding: '10px 14px', borderRadius: 12, border: '1px solid #e2e8f0',
              background: '#f8fafc', color: '#475569', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}
          >
            <RotateCcw size={14} style={{ marginRight: 4 }} /> Nghe lại
          </button>
        )}
      </div>

      {/* Highlighted text */}
      <div style={{
        background: '#fffbeb', borderRadius: 14, padding: 20,
        fontSize: 18, lineHeight: 2.2, color: '#1e1b4b',
        border: '1px solid #fde68a',
      }}>
        {words.map((word, i) => (
          <span key={i}>
            <span style={{
              background: i === currentWordIndex ? '#fbbf24' : 'transparent',
              borderRadius: 4, padding: '2px 4px',
              transition: 'background 0.15s',
              fontWeight: i === currentWordIndex ? 800 : 400,
              color: i === currentWordIndex ? '#92400e' : '#1e1b4b',
            }}>
              {word}
            </span>
            {' '}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes soundbar {
          from { height: 8px; }
          to { height: 20px; }
        }
      `}</style>
    </div>
  );
}
