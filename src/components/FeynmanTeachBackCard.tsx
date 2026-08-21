'use client';

import React, { useState } from 'react';
import { Sparkles, Star, Award, ChevronRight, Mic, CheckCircle2, HeartHandshake } from 'lucide-react';
import { speak } from '@/lib/voiceEngine';

interface FeynmanTeachBackCardProps {
    conceptTitle: string;
    questionContext: string;
    correctAnswer: string;
    explanation: string;
    subject?: string;
    onCompleted?: () => void;
}

export default function FeynmanTeachBackCard({
    conceptTitle,
    questionContext,
    correctAnswer,
    explanation,
    subject = 'english',
    onCompleted,
}: FeynmanTeachBackCardProps) {
    const [mode, setMode] = useState<'prompt' | 'teaching' | 'thanked'>('prompt');
    const [childSpeech, setChildSpeech] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [selectedTip, setSelectedTip] = useState<string | null>(null);

    // Teach-back quick tips generator based on subject
    const teachOptions = [
        `Quy tắc chính: ${explanation.slice(0, 60)}`,
        `Mẹo nhớ nhanh: Chú ý từ khóa quan trọng và kiểm tra lại!`,
        `Thực hành: Làm thử một ví dụ tương tự sẽ hiểu ngay!`,
    ];

    const handleStartTeach = () => {
        setMode('teaching');
        speak('Henry ơi, Robo chưa hiểu câu này. Henry dạy lại cho Robo với nhé!', 'vi-VN', 0.9);
    };

    const handleVoiceTeach = () => {
        const SpeechRecognition = typeof window !== 'undefined' ? ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition) : null;
        if (!SpeechRecognition) {
            const input = prompt('🎤 Con muốn dạy gì cho bạn Robot AI:', explanation);
            if (input) {
                setChildSpeech(input);
                finishTeaching();
            }
            return;
        }

        try {
            const rec = new SpeechRecognition();
            rec.lang = 'vi-VN';
            rec.onstart = () => setIsListening(true);
            rec.onresult = (e: any) => {
                const text = e.results[0][0]?.transcript || '';
                setChildSpeech(text);
                setIsListening(false);
                finishTeaching();
            };
            rec.onerror = () => setIsListening(false);
            rec.onend = () => setIsListening(false);
            rec.start();
        } catch {
            setIsListening(false);
        }
    };

    const finishTeaching = () => {
        setMode('thanked');
        speak('Cảm ơn Thầy Giáo Nhí Henry! Giờ thì Robo đã hiểu bài thật sâu rồi!', 'vi-VN', 0.92);
        if (onCompleted) {
            onCompleted();
        }
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #4338ca 0%, #6366f1 50%, #8b5cf6 100%)',
            borderRadius: 24,
            padding: '22px 24px',
            color: 'white',
            boxShadow: '0 12px 32px rgba(99,102,241,0.35)',
            marginBottom: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Soft decorative background circles */}
            <div style={{
                position: 'absolute', top: -30, right: -30, width: 140, height: 140,
                borderRadius: '50%', background: 'rgba(255,255,255,0.12)', pointerEvents: 'none',
            }} />

            {/* Header Badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '6px 12px', borderRadius: 999,
                    background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
                    fontSize: '0.82rem', fontWeight: 850, letterSpacing: '0.02em',
                }}>
                    <HeartHandshake size={16} /> BÉ DẠY LẠI GIA SƯ AI (FEYNMAN MODE)
                </div>

                <div style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    background: '#f59e0b', color: '#fff',
                    padding: '4px 10px', borderRadius: 999,
                    fontSize: '0.8rem', fontWeight: 900,
                }}>
                    <Star size={14} fill="#fff" /> +20 SAO
                </div>
            </div>

            {/* Stage 1: Invitation Prompt */}
            {mode === 'prompt' && (
                <div>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
                        <div style={{
                            width: 56, height: 56, borderRadius: 18,
                            background: 'rgba(255,255,255,0.25)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '2rem', flexShrink: 0,
                        }}>
                            🤖
                        </div>
                        <div>
                            <div style={{ fontSize: '1.15rem', fontWeight: 900 }}>
                                Bạn Robot AI muốn xin Henry chỉ giáo!
                            </div>
                            <div style={{ fontSize: '0.88rem', opacity: 0.92, marginTop: 4, lineHeight: 1.45 }}>
                                "Henry vừa giải đúng câu <strong>{conceptTitle}</strong>. Con đóng vai thầy giáo dạy lại cho Robo để nhớ bài siêu lâu nhé!"
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleStartTeach}
                        style={{
                            width: '100%', padding: '12px 18px', borderRadius: 16,
                            background: '#ffffff', color: '#4338ca',
                            border: 'none', fontWeight: 900, fontSize: '1rem',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                        }}
                    >
                        <span>🧑‍🏫 Con Đồng Ý Dạy Bạn Robot</span>
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}

            {/* Stage 2: Child Teaching Interaction */}
            {mode === 'teaching' && (
                <div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 900, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>🤖 Robot lắng nghe:</span>
                        <span style={{ fontSize: '0.85rem', opacity: 0.85, fontWeight: 500 }}>"{questionContext}"</span>
                    </div>

                    <div style={{
                        background: 'rgba(255,255,255,0.15)', padding: '12px 16px',
                        borderRadius: 16, marginBottom: 14, fontSize: '0.9rem', lineHeight: 1.5,
                    }}>
                        👉 Đáp án chuẩn: <strong>{correctAnswer}</strong>
                        <div style={{ opacity: 0.88, fontSize: '0.82rem', marginTop: 4 }}>
                            {explanation}
                        </div>
                    </div>

                    <div style={{ fontSize: '0.88rem', fontWeight: 850, marginBottom: 8 }}>
                        CHỌN CÁCH DẠY CHO ROBOT:
                    </div>

                    {/* Quick Logic Cards */}
                    <div style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
                        {teachOptions.map((tip, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setSelectedTip(tip);
                                    finishTeaching();
                                }}
                                style={{
                                    padding: '10px 14px', borderRadius: 12,
                                    background: selectedTip === tip ? '#ffffff' : 'rgba(255,255,255,0.2)',
                                    color: selectedTip === tip ? '#4338ca' : '#ffffff',
                                    border: 'none', textAlign: 'left',
                                    fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                                }}
                            >
                                💡 {tip}
                            </button>
                        ))}
                    </div>

                    {/* Or Speak with Mic */}
                    <button
                        onClick={handleVoiceTeach}
                        style={{
                            width: '100%', padding: '12px 16px', borderRadius: 14,
                            background: isListening ? '#ef4444' : 'rgba(255,255,255,0.95)',
                            color: isListening ? '#ffffff' : '#312e81',
                            border: 'none', fontWeight: 900, fontSize: '0.92rem',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        }}
                    >
                        <Mic size={18} />
                        {isListening ? 'Đang nghe con giảng bài...' : '🎤 Hoặc Bấm Mic Giảng Bài Cho Robot'}
                    </button>
                </div>
            )}

            {/* Stage 3: Gratitude & Junior Teacher Award */}
            {mode === 'thanked' && (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                    <div style={{ fontSize: '3rem', marginBottom: 6 }}>🎓</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.01em' }}>
                        Tuyệt Vời Thầy Giáo Nhí Henry!
                    </div>
                    <div style={{ fontSize: '0.9rem', opacity: 0.92, marginTop: 6, maxWidth: 440, margin: '6px auto 14px', lineHeight: 1.5 }}>
                        Robot AI đã ghi chép lại lời giảng của con. Khi con dạy lại cho người khác, kiến thức đã ngấm sâu vào trí nhớ dài hạn (Hiệu ứng Protégé)!
                    </div>

                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: '#fef3c7', color: '#92400e',
                        padding: '8px 16px', borderRadius: 999,
                        fontWeight: 900, fontSize: '0.92rem',
                    }}>
                        <Award size={18} /> Đạt Danh Hiệu: BẬC THẦY GIẢNG BÀI ⭐⭐⭐
                    </div>
                </div>
            )}
        </div>
    );
}
