'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Volume2, Mic, MicOff, Award, Sparkles } from 'lucide-react';
import { speak, type Accent } from '@/lib/voiceEngine';
import { analyzePronunciation, type PronunciationAnalysis } from '@/lib/pronunciationCoach';

// Levenshtein distance for fuzzy matching
function levenshtein(a: string, b: string): number {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = a[i - 1] === b[j - 1]
                ? dp[i - 1][j - 1]
                : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
    }
    return dp[m][n];
}

function wordSimilarity(spoken: string, expected: string): number {
    if (!spoken || !expected) return 0;
    const a = spoken.toLowerCase().trim();
    const b = expected.toLowerCase().trim();
    if (a === b) return 100;
    const dist = levenshtein(a, b);
    const maxLen = Math.max(a.length, b.length);
    return Math.max(0, Math.round((1 - dist / maxLen) * 100));
}

interface VoicePracticeCardProps {
    targetText: string;
    lang?: 'en-US' | 'vi-VN';
    title?: string;
    onScoreAchieved?: (score: number) => void;
    compact?: boolean;
}

export default function VoicePracticeCard({
    targetText,
    lang = 'en-US',
    title = 'Luyện đọc & Chấm điểm phát âm',
    onScoreAchieved,
    compact = false,
}: VoicePracticeCardProps) {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [score, setScore] = useState<number | null>(null);
    const [analysis, setAnalysis] = useState<PronunciationAnalysis | null>(null);
    const [wordMatches, setWordMatches] = useState<{ word: string; status: 'perfect' | 'close' | 'wrong' | 'missing'; color: string }[]>([]);
    const recognitionRef = useRef<any>(null);

    // Clean target words
    const targetWords = targetText
        .toLowerCase()
        .replace(/[.,!?'"():;]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 0);

    const handleSpeakSample = (slow = false) => {
        const accent: Accent = lang === 'vi-VN' ? ('vi-VN' as any) : 'en-US';
        speak(targetText, accent, slow ? 0.70 : 0.88);
    };

    const evaluateSpeech = useCallback((heardText: string) => {
        const cleanedHeard = heardText.toLowerCase().replace(/[.,!?'"():;]/g, '').trim();
        const heardWords = cleanedHeard.split(/\s+/).filter(w => w.length > 0);

        // Word-by-word matching
        const wordsAnalysis = targetWords.map((tw, i) => {
            let bestSim = 0;
            if (heardWords[i]) {
                bestSim = wordSimilarity(heardWords[i], tw);
            }
            for (let offset = -2; offset <= 2; offset++) {
                const idx = i + offset;
                if (idx >= 0 && idx < heardWords.length && idx !== i) {
                    bestSim = Math.max(bestSim, wordSimilarity(heardWords[idx], tw));
                }
            }

            let status: 'perfect' | 'close' | 'wrong' | 'missing';
            let color: string;
            if (bestSim >= 80) { status = 'perfect'; color = '#10b981'; }
            else if (bestSim >= 50) { status = 'close'; color = '#f59e0b'; }
            else if (bestSim >= 25) { status = 'wrong'; color = '#ef4444'; }
            else { status = 'missing'; color = '#94a3b8'; }

            return { word: tw, status, color };
        });

        setWordMatches(wordsAnalysis);

        // Overall sentence similarity
        const fullSim = wordSimilarity(cleanedHeard, targetWords.join(' '));
        const avgWordSim = wordsAnalysis.reduce((acc, w) => acc + (w.status === 'perfect' ? 100 : w.status === 'close' ? 70 : w.status === 'wrong' ? 35 : 0), 0) / Math.max(1, wordsAnalysis.length);
        const finalScore = Math.min(100, Math.round(fullSim * 0.4 + avgWordSim * 0.6));

        setScore(finalScore);

        // Analyze deeper phonemes & coaching
        const coachAnalysis = analyzePronunciation(targetText, cleanedHeard, finalScore);
        setAnalysis(coachAnalysis);

        if (onScoreAchieved) {
            onScoreAchieved(finalScore);
        }
    }, [targetText, targetWords, onScoreAchieved]);

    const startRecording = () => {
        const SpeechRecognition = typeof window !== 'undefined' ? ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition) : null;
        if (!SpeechRecognition) {
            const simulated = prompt('🎤 Mic trình duyệt chưa cấp quyền. Con có thể gõ câu con vừa đọc:', targetText);
            if (simulated) {
                setTranscript(simulated);
                evaluateSpeech(simulated);
            }
            return;
        }

        try {
            if (recognitionRef.current) {
                try { recognitionRef.current.stop(); } catch { /* ignore */ }
            }

            const rec = new SpeechRecognition();
            rec.lang = lang;
            rec.continuous = false;
            rec.interimResults = false;
            rec.maxAlternatives = 3;

            rec.onstart = () => {
                setIsListening(true);
                setTranscript('');
            };

            rec.onresult = (event: any) => {
                const heard = event.results[0][0]?.transcript || '';
                setTranscript(heard);
                evaluateSpeech(heard);
            };

            rec.onerror = (e: any) => {
                console.warn('Speech recognition error:', e.error);
                setIsListening(false);
            };

            rec.onend = () => {
                setIsListening(false);
            };

            recognitionRef.current = rec;
            rec.start();
        } catch (err) {
            console.error('Failed to start speech recognition:', err);
            setIsListening(false);
        }
    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            try { recognitionRef.current.stop(); } catch { /* ignore */ }
        }
        setIsListening(false);
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(240,249,255,0.95))',
            borderRadius: 20,
            border: '2px solid rgba(59,130,246,0.25)',
            boxShadow: '0 8px 24px rgba(59,130,246,0.12)',
            padding: compact ? '14px 16px' : '20px 22px',
            marginBottom: '1.25rem',
            position: 'relative',
        }}>
            {/* Header / Title */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                        width: 32, height: 32, borderRadius: 10,
                        background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                    }}>
                        <Volume2 size={18} />
                    </div>
                    <div style={{ fontWeight: 850, fontSize: '0.95rem', color: '#1e293b' }}>
                        {title}
                    </div>
                </div>

                {score !== null && (
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '4px 10px', borderRadius: 999,
                        background: score >= 80 ? '#ecfdf5' : score >= 50 ? '#fffbeb' : '#fef2f2',
                        border: `1.5px solid ${score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'}`,
                        color: score >= 80 ? '#059669' : score >= 50 ? '#d97706' : '#dc2626',
                        fontWeight: 900, fontSize: '0.9rem',
                    }}>
                        <Award size={16} />
                        <span>{score}% {score >= 80 ? '🌟 Chuẩn!' : score >= 50 ? '👍 Tốt' : '🔄 Thử lại'}</span>
                    </div>
                )}
            </div>

            {/* Target sentence display with word breakdown colors */}
            <div style={{
                background: '#ffffff',
                padding: '14px 18px',
                borderRadius: 16,
                border: '1px solid #e2e8f0',
                marginBottom: 14,
            }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 700, marginBottom: 4 }}>
                    MẪU CẦN ĐỌC:
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e1b4b', display: 'flex', flexWrap: 'wrap', gap: 6, lineHeight: 1.5 }}>
                    {wordMatches.length > 0 ? (
                        wordMatches.map((w, idx) => (
                            <span key={idx} style={{
                                color: w.color,
                                borderBottom: `2.5px solid ${w.color}`,
                                paddingBottom: 2,
                            }}>
                                {w.word}
                            </span>
                        ))
                    ) : (
                        <span>{targetText}</span>
                    )}
                </div>

                {/* IPA transcription if available */}
                {analysis?.targetIPA && (
                    <div style={{ fontSize: '0.85rem', color: '#6366f1', marginTop: 4, fontFamily: 'monospace', fontWeight: 600 }}>
                        {analysis.targetIPA}
                    </div>
                )}
            </div>

            {/* Heard Transcript */}
            {transcript && (
                <div style={{
                    background: '#f8fafc',
                    padding: '8px 14px',
                    borderRadius: 12,
                    border: '1px dashed #cbd5e1',
                    marginBottom: 14,
                    fontSize: '0.88rem',
                    color: '#334155',
                }}>
                    <span style={{ fontWeight: 700, color: '#64748b' }}>Máy nghe thấy: </span>
                    <span style={{ fontStyle: 'italic', fontWeight: 600 }}>"{transcript}"</span>
                </div>
            )}

            {/* Coaching Tips if score is imperfect */}
            {analysis && analysis.coachingTips.length > 0 && score !== null && score < 90 && (
                <div style={{
                    background: '#fffbeb', border: '1.5px solid #fde68a',
                    borderRadius: 14, padding: '10px 14px', marginBottom: 14,
                }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 850, color: '#92400e', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Sparkles size={14} /> MẸO PHÁT ÂM CHUẨN:
                    </div>
                    {analysis.coachingTips.map((tip, i) => (
                        <div key={i} style={{ fontSize: '0.82rem', color: '#78350f', lineHeight: 1.45, marginTop: 3 }}>
                            {tip.icon} <strong>{tip.title}:</strong> {tip.description}
                        </div>
                    ))}
                </div>
            )}

            {/* Action Buttons Row */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                {/* 1. Nghe đọc mẫu chuẩn */}
                <button
                    onClick={() => handleSpeakSample(false)}
                    style={{
                        flex: 1, minWidth: 120, padding: '10px 14px', borderRadius: 14,
                        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                        border: 'none', color: '#fff', fontWeight: 800, fontSize: '0.88rem',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                        boxShadow: '0 4px 12px rgba(37,99,235,0.25)',
                    }}
                >
                    <Volume2 size={18} /> Nghe Mẫu
                </button>

                {/* 2. Nghe chậm */}
                <button
                    onClick={() => handleSpeakSample(true)}
                    style={{
                        padding: '10px 14px', borderRadius: 14,
                        background: '#eff6ff', border: '1.5px solid #bfdbfe',
                        color: '#1d4ed8', fontWeight: 800, fontSize: '0.88rem',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                    }}
                    title="Nghe tốc độ chậm"
                >
                    🐢 Chậm
                </button>

                {/* 3. Ghi âm & Chấm điểm */}
                <button
                    onClick={isListening ? stopRecording : startRecording}
                    style={{
                        flex: 1.2, minWidth: 150, padding: '10px 16px', borderRadius: 14,
                        background: isListening
                            ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                            : 'linear-gradient(135deg, #10b981, #059669)',
                        border: 'none', color: '#fff', fontWeight: 850, fontSize: '0.92rem',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        boxShadow: isListening ? '0 0 0 4px rgba(239,68,68,0.3)' : '0 4px 14px rgba(16,185,129,0.3)',
                    }}
                >
                    {isListening ? (
                        <>
                            <MicOff size={20} /> Đang nghe... Dừng
                        </>
                    ) : (
                        <>
                            <Mic size={20} /> 🎤 Bấm & Đọc Ngay
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
