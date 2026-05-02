'use client';

// ========================================
// Reading Practice — LinguaKids-inspired interactive reader
// Features: Tap-to-define, 4 tabs (Read/Bilingual/Hard sentences/Vocab),
// Read-to-Me TTS with 3 accents (US/UK/AU), reading timer, quiz
// Benchmark: LinguaKids ReadingHub + Khan Academy + Reading Eggs
// ========================================

import React, { useState, useMemo, useCallback } from 'react';
import { TEXTBOOK_LIBRARY, type TextbookPassage, type ComprehensionCheck } from '@/data/textbook-library';
import { lookupWord, type DictionaryEntry } from '@/lib/resources/adapters/dictionary-adapter';
import {
    BookOpen, CheckCircle, Sparkles, Brain, ChevronRight, Eye, EyeOff,
    RotateCcw, Volume2, X, Languages, Lightbulb, BookMarked, Loader2
} from 'lucide-react';

type AccentKey = 'en-US' | 'en-GB' | 'en-AU';
const ACCENTS: { key: AccentKey; flag: string; label: string; voices: string[] }[] = [
    { key: 'en-US', flag: '🇺🇸', label: 'American', voices: ['Samantha', 'Google US English', 'Microsoft Aria'] },
    { key: 'en-GB', flag: '🇬🇧', label: 'British', voices: ['Daniel', 'Google UK English', 'Microsoft Hazel'] },
    { key: 'en-AU', flag: '🇦🇺', label: 'Australian', voices: ['Karen', 'Google Australian', 'Microsoft Natasha'] },
];

function speakWithAccent(text: string, accent: AccentKey, rate = 0.85) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = accent;
    utter.rate = rate;
    utter.pitch = 1.05;
    const voices = window.speechSynthesis.getVoices();
    const accentInfo = ACCENTS.find(a => a.key === accent);
    if (accentInfo) {
        for (const pref of accentInfo.voices) {
            const v = voices.find(vo => vo.name.includes(pref) && vo.lang.startsWith(accent.split('-')[0]));
            if (v) { utter.voice = v; break; }
        }
    }
    if (!utter.voice) {
        const fallback = voices.find(v => v.lang.startsWith(accent.split('-')[0]));
        if (fallback) utter.voice = fallback;
    }
    window.speechSynthesis.speak(utter);
}

// Word popup component
function WordPopup({ word, onClose, lang }: { word: string; onClose: () => void; lang: string }) {
    const [entry, setEntry] = useState<DictionaryEntry | null>(null);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const clean = word.replace(/[^a-zA-Z'-]/g, '').toLowerCase();
        if (clean.length < 2) { setLoading(false); return; }
        lookupWord(clean).then(r => { setEntry(r); setLoading(false); });
    }, [word]);

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(3px)',
        }} onClick={onClose}>
            <div onClick={e => e.stopPropagation()} style={{
                background: '#fff', borderRadius: '18px', width: '90%', maxWidth: '380px',
                padding: '1.2rem', boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>{word}</span>
                    <button onClick={onClose} style={{ border: 'none', background: '#f1f5f9', borderRadius: '50%', width: 26, height: 26, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={12} />
                    </button>
                </div>

                {loading && <div style={{ textAlign: 'center', padding: '1rem', color: '#6366f1' }}><Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /></div>}

                {entry && (
                    <>
                        {entry.phonetic && <div style={{ fontSize: '0.78rem', color: '#6366f1', marginBottom: '0.4rem' }}>/{entry.phonetic}/</div>}
                        {/* 3-accent pronunciation */}
                        <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                            {ACCENTS.map(a => (
                                <button key={a.key} onClick={() => speakWithAccent(word, a.key)} style={{
                                    display: 'flex', alignItems: 'center', gap: '3px',
                                    padding: '3px 10px', borderRadius: '8px', border: '1px solid #e2e8f0',
                                    background: '#f8fafc', fontSize: '0.62rem', fontWeight: 600, cursor: 'pointer',
                                }}>
                                    <Volume2 size={10} /> {a.flag} {a.label}
                                </button>
                            ))}
                        </div>
                        {entry.meanings.slice(0, 2).map((m, i) => (
                            <div key={i} style={{ marginBottom: '0.4rem' }}>
                                <span style={{ padding: '1px 6px', borderRadius: '4px', background: '#eef2ff', color: '#4338ca', fontSize: '0.58rem', fontWeight: 700 }}>{m.partOfSpeech}</span>
                                {m.definitions.slice(0, 2).map((d, di) => (
                                    <div key={di} style={{ fontSize: '0.75rem', color: '#334155', margin: '0.2rem 0 0 0.5rem', lineHeight: 1.5 }}>
                                        {di + 1}. {d.definition}
                                        {d.example && <div style={{ fontStyle: 'italic', color: '#64748b', fontSize: '0.68rem' }}>"{d.example}"</div>}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </>
                )}
                {!loading && !entry && <div style={{ fontSize: '0.78rem', color: '#94a3b8', padding: '0.5rem' }}>Không tìm thấy định nghĩa</div>}
                <div style={{ fontSize: '0.5rem', color: '#cbd5e1', marginTop: '0.4rem' }}>Free Dictionary API · CC BY-SA 3.0</div>
            </div>
            <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
        </div>
    );
}

function getAllQuizPassages(): TextbookPassage[] {
    const all: TextbookPassage[] = [];
    for (const entry of TEXTBOOK_LIBRARY) {
        for (const p of entry.passages) {
            if (p.comprehensionChecks.length > 0) all.push(p);
        }
    }
    return all;
}

type TabKey = 'read' | 'bilingual' | 'hard' | 'vocab';

export default function ReadingQuiz({ lang }: { lang: string }) {
    const quizPassages = useMemo(getAllQuizPassages, []);
    const [quizIndex, setQuizIndex] = useState(0);
    const [tab, setTab] = useState<TabKey>('read');
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [accent, setAccent] = useState<AccentKey>('en-US');
    const [speed, setSpeed] = useState(0.85);
    const [viewCount, setViewCount] = useState(0);

    // Quiz state
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [checked, setChecked] = useState<Record<number, 'correct' | 'hint'>>({});
    const [showHints, setShowHints] = useState<Record<number, boolean>>({});
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);

    if (quizPassages.length === 0) return null;
    const passage = quizPassages[quizIndex % quizPassages.length];
    const checks = passage.comprehensionChecks;

    const handleWordClick = useCallback((word: string) => {
        const clean = word.replace(/[^a-zA-Z'-]/g, '');
        if (clean.length >= 2) setSelectedWord(clean);
    }, []);

    const handleCheck = (idx: number) => {
        const userAnswer = (answers[idx] || '').trim().toLowerCase();
        const hint = checks[idx].answerHint.toLowerCase();
        const hintWords = hint.split(/\s+/).filter(w => w.length > 2);
        const matchCount = hintWords.filter(w => userAnswer.includes(w)).length;
        const isCorrect = matchCount >= Math.max(1, Math.floor(hintWords.length * 0.4));
        if (isCorrect) {
            setChecked(p => ({ ...p, [idx]: 'correct' }));
            setScore(s => s + 1);
        } else {
            setChecked(p => ({ ...p, [idx]: 'hint' }));
            setShowHints(p => ({ ...p, [idx]: true }));
        }
    };

    const allAnswered = checks.every((_, i) => checked[i]);

    const nextPassage = () => {
        setQuizIndex(i => i + 1);
        setAnswers({}); setChecked({}); setShowHints({}); setTab('read');
        setViewCount(v => v + 1);
        if (quizIndex + 1 >= quizPassages.length) setCompleted(true);
    };

    const restart = () => {
        setQuizIndex(0); setAnswers({}); setChecked({}); setShowHints({});
        setScore(0); setCompleted(false); setTab('read'); setViewCount(0);
    };

    const TABS: { key: TabKey; icon: React.ReactNode; label: string }[] = [
        { key: 'read', icon: <BookOpen size={13} />, label: lang === 'vi' ? 'Đọc' : 'Read' },
        { key: 'bilingual', icon: <Languages size={13} />, label: lang === 'vi' ? 'Song ngữ' : 'Bilingual' },
        { key: 'hard', icon: <Lightbulb size={13} />, label: lang === 'vi' ? 'Câu khó' : 'Quiz' },
        { key: 'vocab', icon: <BookMarked size={13} />, label: lang === 'vi' ? 'Từ vựng' : 'Vocab' },
    ];

    return (
        <div style={{ marginBottom: '1.5rem', background: '#fff', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #059669, #10b981)', padding: '1.1rem 1.25rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -15, right: -15, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                        <Brain size={18} color="#fff" />
                        <h2 style={{ fontWeight: 800, fontSize: '0.95rem', margin: 0, color: '#fff' }}>
                            {lang === 'vi' ? '📖 Luyện Đọc & Phát Âm' : '📖 Reading & Pronunciation'}
                        </h2>
                    </div>
                    <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                        {lang === 'vi'
                            ? `Bài ${quizIndex + 1}/${quizPassages.length} • Điểm: ${score} ⭐ • Chạm từ để tra nghĩa`
                            : `Passage ${quizIndex + 1}/${quizPassages.length} • Score: ${score} ⭐ • Tap any word`}
                    </p>
                </div>
            </div>

            {/* Accent & Speed selector */}
            <div style={{ padding: '0.6rem 1.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.6rem', color: '#64748b', fontWeight: 600 }}>🔊 Giọng:</span>
                {ACCENTS.map(a => (
                    <button key={a.key} onClick={() => setAccent(a.key)} style={{
                        padding: '2px 8px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                        fontSize: '0.58rem', fontWeight: accent === a.key ? 700 : 500,
                        background: accent === a.key ? '#059669' : '#f1f5f9',
                        color: accent === a.key ? '#fff' : '#475569',
                    }}>{a.flag} {a.label}</button>
                ))}
                <span style={{ fontSize: '0.58rem', color: '#94a3b8' }}>|</span>
                {[0.6, 0.75, 0.85, 1.0].map(s => (
                    <button key={s} onClick={() => setSpeed(s)} style={{
                        padding: '2px 6px', borderRadius: '5px', border: 'none', cursor: 'pointer',
                        fontSize: '0.55rem', fontWeight: speed === s ? 700 : 400,
                        background: speed === s ? '#4f46e5' : 'transparent',
                        color: speed === s ? '#fff' : '#94a3b8',
                    }}>{s}x</button>
                ))}
            </div>

            {/* Tab bar — LinguaKids style */}
            <div style={{ display: 'flex', gap: '0', padding: '0.5rem 1.25rem 0', borderBottom: '1px solid #f1f5f9' }}>
                {TABS.map(t => (
                    <button key={t.key} onClick={() => setTab(t.key)} style={{
                        display: 'flex', alignItems: 'center', gap: '4px', flex: 1,
                        padding: '8px 0', border: 'none', cursor: 'pointer',
                        background: 'transparent', justifyContent: 'center',
                        fontSize: '0.68rem', fontWeight: tab === t.key ? 700 : 500,
                        color: tab === t.key ? '#059669' : '#94a3b8',
                        borderBottom: tab === t.key ? '2px solid #059669' : '2px solid transparent',
                    }}>{t.icon} {t.label}</button>
                ))}
            </div>

            <div style={{ padding: '1rem 1.25rem' }}>
                {completed ? (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
                        <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#059669' }}>{lang === 'vi' ? 'Hoàn thành!' : 'All Done!'}</div>
                        <div style={{ fontSize: '0.82rem', color: '#64748b', margin: '0.3rem 0 1rem' }}>Điểm: {score} ⭐</div>
                        <button onClick={restart} style={{ padding: '10px 24px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #059669, #10b981)', color: '#fff', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}>
                            <RotateCcw size={14} /> {lang === 'vi' ? 'Làm lại' : 'Restart'}
                        </button>
                    </div>
                ) : (
                    <>
                        {/* TAB: Read — tap-to-define interactive passage */}
                        {tab === 'read' && (
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{ fontWeight: 700, color: '#059669', fontSize: '0.85rem' }}>📖 {passage.title}</span>
                                    <span style={{ fontSize: '0.55rem', color: '#94a3b8' }}>{viewCount + 1}/{quizPassages.length} đã xem</span>
                                </div>
                                <div style={{ fontSize: '0.6rem', color: '#64748b', marginBottom: '0.4rem', fontStyle: 'italic' }}>
                                    {lang === 'vi' ? '= Từ vựng chính (key word) - chạm để xem nghĩa' : '= Key words — tap to see definition'}
                                </div>

                                {/* Interactive passage — each word is tappable */}
                                <div style={{ padding: '1rem', borderRadius: '14px', background: '#fafbfc', border: '1px solid #f1f5f9', lineHeight: 2, fontSize: '0.92rem' }}>
                                    {passage.text.split(/\s+/).map((word, i) => {
                                        const isKey = passage.keyVocabulary.some(v => word.toLowerCase().replace(/[^a-z]/g, '') === v.word.toLowerCase());
                                        return (
                                            <span key={i} onClick={() => handleWordClick(word)} style={{
                                                cursor: 'pointer', borderBottom: isKey ? '2px solid #059669' : 'none',
                                                fontWeight: isKey ? 700 : 400,
                                                color: isKey ? '#1e293b' : '#334155',
                                                padding: '1px 0', transition: 'background 0.15s',
                                            }}>{word} </span>
                                        );
                                    })}
                                </div>

                                {/* Read aloud button */}
                                <button onClick={() => speakWithAccent(passage.text, accent, speed)} style={{
                                    margin: '0.6rem 0', padding: '8px 16px', borderRadius: '10px', border: 'none',
                                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff',
                                    fontWeight: 600, fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                                }}>
                                    <Volume2 size={13} /> {ACCENTS.find(a => a.key === accent)?.flag} {lang === 'vi' ? 'Nghe đọc' : 'Listen'} ({speed}x)
                                </button>

                                {passage.viSummary && (
                                    <div style={{ marginTop: '0.4rem', fontSize: '0.72rem', color: '#64748b', fontStyle: 'italic', borderLeft: '3px solid #10b981', paddingLeft: '0.6rem' }}>
                                        🇻🇳 {passage.viSummary}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* TAB: Bilingual */}
                        {tab === 'bilingual' && (
                            <div>
                                <div style={{ fontWeight: 700, color: '#059669', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🌍 {passage.title}</div>
                                <div style={{ display: 'grid', gap: '0.6rem' }}>
                                    <div style={{ padding: '0.8rem', borderRadius: '12px', background: '#f0fdf4', border: '1px solid #bbf7d044' }}>
                                        <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#059669', marginBottom: '0.3rem' }}>🇬🇧 English</div>
                                        <div style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#1e293b' }}>{passage.text}</div>
                                    </div>
                                    {passage.viSummary && (
                                        <div style={{ padding: '0.8rem', borderRadius: '12px', background: '#eff6ff', border: '1px solid #bfdbfe44' }}>
                                            <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#2563eb', marginBottom: '0.3rem' }}>🇻🇳 Tiếng Việt</div>
                                            <div style={{ fontSize: '0.82rem', lineHeight: 1.7, color: '#1e293b' }}>{passage.viSummary}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* TAB: Quiz (Hard sentences) */}
                        {tab === 'hard' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {checks.map((check, i) => (
                                    <div key={i} style={{
                                        padding: '0.75rem 1rem', borderRadius: '12px',
                                        background: checked[i] === 'correct' ? '#f0fdf4' : checked[i] === 'hint' ? '#fef3c7' : '#f8fafc',
                                        border: `1px solid ${checked[i] === 'correct' ? '#bbf7d0' : checked[i] === 'hint' ? '#fde68a' : '#e2e8f0'}`,
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                                            {checked[i] === 'correct' ? <CheckCircle size={16} color="#16a34a" /> :
                                             checked[i] === 'hint' ? <Sparkles size={16} color="#d97706" /> :
                                             <span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#6366f1' }}>Q{i + 1}</span>}
                                            <span style={{ fontWeight: 600, fontSize: '0.78rem', color: '#1e293b' }}>{check.question}</span>
                                        </div>
                                        {checked[i] !== 'correct' && (
                                            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                                                <input type="text" value={answers[i] || ''} onChange={e => setAnswers(p => ({ ...p, [i]: e.target.value }))}
                                                    placeholder={lang === 'vi' ? 'Nhập câu trả lời...' : 'Type answer...'} onKeyDown={e => e.key === 'Enter' && handleCheck(i)}
                                                    style={{ flex: 1, padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.75rem', outline: 'none' }} />
                                                <button onClick={() => handleCheck(i)} style={{ padding: '6px 14px', borderRadius: '8px', border: 'none', background: '#4f46e5', color: '#fff', fontWeight: 600, fontSize: '0.7rem', cursor: 'pointer' }}>
                                                    {lang === 'vi' ? 'Kiểm tra' : 'Check'}
                                                </button>
                                            </div>
                                        )}
                                        {checked[i] === 'correct' && <span style={{ fontSize: '0.7rem', color: '#16a34a', fontWeight: 600 }}>✅ Đúng! +1 ⭐</span>}
                                        {showHints[i] && <div style={{ marginTop: '0.3rem', fontSize: '0.68rem', color: '#92400e', fontStyle: 'italic' }}>💡 Gợi ý: {check.answerHint}</div>}
                                    </div>
                                ))}
                                {allAnswered && (
                                    <button onClick={nextPassage} style={{ marginTop: '0.5rem', padding: '10px 24px', borderRadius: '12px', border: 'none', width: '100%', background: 'linear-gradient(135deg, #059669, #10b981)', color: '#fff', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                                        <ChevronRight size={16} /> {lang === 'vi' ? 'Bài tiếp theo' : 'Next'}
                                    </button>
                                )}
                            </div>
                        )}

                        {/* TAB: Vocabulary with 3-accent pronunciation */}
                        {tab === 'vocab' && (
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                {passage.keyVocabulary.map(v => (
                                    <div key={v.word} style={{ padding: '0.6rem 0.8rem', borderRadius: '10px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <div>
                                                <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{v.word}</span>
                                                <span style={{ fontSize: '0.7rem', color: '#6366f1', marginLeft: '0.4rem' }}>= {v.viMeaning}</span>
                                            </div>
                                        </div>
                                        {/* 3-accent buttons per word */}
                                        <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.3rem' }}>
                                            {ACCENTS.map(a => (
                                                <button key={a.key} onClick={() => speakWithAccent(v.word, a.key, 0.75)} style={{
                                                    padding: '2px 7px', borderRadius: '6px', border: '1px solid #e2e8f0',
                                                    background: '#fff', fontSize: '0.55rem', fontWeight: 600, cursor: 'pointer',
                                                    display: 'flex', alignItems: 'center', gap: '2px',
                                                }}>
                                                    <Volume2 size={9} /> {a.flag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Attribution */}
                <div style={{ marginTop: '0.75rem', fontSize: '0.55rem', color: '#94a3b8', lineHeight: 1.5 }}>
                    📋 {lang === 'vi' ? 'Bài đọc tự biên soạn theo CTGDPT 2018. Phát âm: Web Speech API (miễn phí). Nguồn từ điển: Free Dictionary API (CC BY-SA 3.0).' : 'Original content aligned to CTGDPT 2018. Pronunciation: Web Speech API. Dictionary: Free Dictionary API (CC BY-SA 3.0).'}
                </div>
            </div>

            {/* Word popup modal */}
            {selectedWord && <WordPopup word={selectedWord} onClose={() => setSelectedWord(null)} lang={lang} />}
        </div>
    );
}
