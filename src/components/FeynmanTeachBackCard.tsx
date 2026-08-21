'use client';

import React, { useState } from 'react';
import { Sparkles, Star, Award, Mic, CheckCircle2, HeartHandshake, Lightbulb, Volume2, ArrowRight } from 'lucide-react';
import { speak, type Accent } from '@/lib/voiceEngine';

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
    // Stage: 'confused' (Robo asks help) -> 'teaching' (Child chooses method) -> 'eureka' (Robo understands)
    const [stage, setStage] = useState<'confused' | 'teaching' | 'eureka'>('confused');
    const [selectedTeachingMethod, setSelectedTeachingMethod] = useState<string | null>(null);
    const [isListening, setIsListening] = useState(false);
    const [heardText, setHeardText] = useState('');

    const isEnglish = subject === 'english';
    const isVietnamese = subject === 'vietnamese';
    const voiceLang: Accent = isVietnamese ? 'vi-VN' : 'en-US';

    // ── Concrete Scaffolding: Kid-Friendly Teaching Tricks ──
    const generateTeachingTricks = () => {
        if (isEnglish) {
            return [
                {
                    id: 'sound',
                    icon: '🗣️',
                    title: 'Dạy phát âm chuẩn',
                    actionText: `Chỉ cho Robo phát âm đúng từ: "${correctAnswer}"`,
                    detail: `Robo ơi, phải đọc là "${correctAnswer}" và nhớ bật âm cuối nhé!`,
                },
                {
                    id: 'rule',
                    icon: '💡',
                    title: 'Dạy mẹo ghi nhớ',
                    actionText: explanation.length > 55 ? `${explanation.slice(0, 55)}...` : explanation,
                    detail: `Robo chú ý câu hỏi: ${questionContext} -> Đáp án chính là ${correctAnswer}!`,
                },
            ];
        } else if (isVietnamese) {
            return [
                {
                    id: 'spelling',
                    icon: '📖',
                    title: 'Dạy ghép vần & dấu',
                    actionText: `Nhắc Robo quy tắc: ${correctAnswer}`,
                    detail: `Robo nhớ đọc đúng chính tả: "${correctAnswer}"!`,
                },
                {
                    id: 'meaning',
                    icon: '💡',
                    title: 'Giải thích ý nghĩa',
                    actionText: explanation.length > 55 ? `${explanation.slice(0, 55)}...` : explanation,
                    detail: explanation,
                },
            ];
        } else {
            return [
                {
                    id: 'logic',
                    icon: '🔢',
                    title: 'Chỉ cách tính nhanh',
                    actionText: `Đáp án đúng là ${correctAnswer}`,
                    detail: `Robo nhìn này: ${explanation || `Đáp án chính xác là ${correctAnswer}`}`,
                },
                {
                    id: 'tip',
                    icon: '💡',
                    title: 'Mẹo không bị lừa',
                    actionText: 'Đọc kỹ đề và làm từng bước',
                    detail: 'Đừng vội vàng, kiểm tra lại phép tính là đúng ngay!',
                },
            ];
        }
    };

    const teachingTricks = generateTeachingTricks();

    // Guided Sentence Starter for child
    const sentenceStarter = isEnglish
        ? `Robo ơi, câu này là "${correctAnswer}"!`
        : `Robo ơi, đáp án đúng là "${correctAnswer}" vì ${explanation.slice(0, 30)}...`;

    const handleSelectTrick = (trick: typeof teachingTricks[0]) => {
        setSelectedTeachingMethod(trick.title);
        // Instant non-blocking sound bite
        speak(trick.detail, 'vi-VN', 0.95);
        triggerEureka();
    };

    const handleVoiceRecord = () => {
        const SpeechRecognition = typeof window !== 'undefined' ? ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition) : null;
        if (!SpeechRecognition) {
            const mock = prompt('🎤 Con muốn giảng gì cho bạn Robot:', sentenceStarter);
            if (mock) {
                setHeardText(mock);
                triggerEureka();
            }
            return;
        }

        try {
            const rec = new SpeechRecognition();
            rec.lang = isEnglish ? 'en-US' : 'vi-VN';
            rec.onstart = () => setIsListening(true);
            rec.onresult = (e: any) => {
                const text = e.results[0][0]?.transcript || '';
                setHeardText(text);
                setIsListening(false);
                triggerEureka();
            };
            rec.onerror = () => setIsListening(false);
            rec.onend = () => setIsListening(false);
            rec.start();
        } catch {
            setIsListening(false);
        }
    };

    const triggerEureka = () => {
        setStage('eureka');
        if (onCompleted) {
            onCompleted();
        }
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #312e81 0%, #4338ca 50%, #6366f1 100%)',
            borderRadius: 24,
            padding: '20px 22px',
            color: 'white',
            boxShadow: '0 10px 30px rgba(67,56,202,0.35)',
            marginBottom: '1.25rem',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Header Pill */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '5px 12px', borderRadius: 999,
                    background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
                    fontSize: '0.82rem', fontWeight: 850,
                }}>
                    <HeartHandshake size={16} /> BÉ DẠY LẠI CHO BẠN ROBOT (FEYNMAN)
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

            {/* ═══ BƯỚC 1: ROBOT BỐI RỐI & HỎI BÉ (CONFUSED STAGE) ═══ */}
            {stage === 'confused' && (
                <div>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 16 }}>
                        <div style={{
                            width: 60, height: 60, borderRadius: 20,
                            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '2.4rem', flexShrink: 0,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        }}>
                            🤔
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '-0.01em' }}>
                                Robot: "Sao câu này lại chọn {correctAnswer} nhỉ?"
                            </div>
                            <div style={{ fontSize: '0.88rem', opacity: 0.9, marginTop: 4, lineHeight: 1.45 }}>
                                Robo chưa hiểu bí quyết. Henry đóng vai Thầy Giáo chỉ cho Robo 1 mẹo nhé!
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setStage('teaching')}
                        style={{
                            width: '100%', padding: '14px 20px', borderRadius: 16,
                            background: '#ffffff', color: '#3730a3',
                            border: 'none', fontWeight: 900, fontSize: '1.05rem',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                            boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                            transition: 'all 0.2s',
                        }}
                    >
                        <span>🧑‍🏫 Bắt Đầu Dạy Robo Ngay</span>
                        <ArrowRight size={20} />
                    </button>
                </div>
            )}

            {/* ═══ BƯỚC 2: BÉ CHỌN CÁCH GIẢNG BÀI (DẪN DẮT CỤ THỂ) ═══ */}
            {stage === 'teaching' && (
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <span style={{ fontSize: '1.6rem' }}>🤖</span>
                        <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>
                            Henry muốn dạy Robo bằng cách nào?
                        </div>
                    </div>

                    {/* Lựa chọn 1: Bấm thẻ mẹo có sẵn */}
                    <div style={{ display: 'grid', gap: 8, marginBottom: 14 }}>
                        {teachingTricks.map((trick) => (
                            <button
                                key={trick.id}
                                onClick={() => handleSelectTrick(trick)}
                                style={{
                                    padding: '12px 14px', borderRadius: 14,
                                    background: 'rgba(255,255,255,0.18)',
                                    border: '1.5px solid rgba(255,255,255,0.3)',
                                    color: '#ffffff', textAlign: 'left',
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                                    transition: 'all 0.2s',
                                }}
                            >
                                <span style={{ fontSize: '1.8rem' }}>{trick.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 900, fontSize: '0.95rem' }}>{trick.title}</div>
                                    <div style={{ fontSize: '0.82rem', opacity: 0.88, marginTop: 2 }}>{trick.actionText}</div>
                                </div>
                                <ArrowRight size={18} style={{ opacity: 0.7 }} />
                            </button>
                        ))}
                    </div>

                    {/* Lựa chọn 2: Bé bấm Mic nói theo câu mồi gợi ý */}
                    <div style={{
                        background: 'rgba(0,0,0,0.2)', padding: '12px 14px', borderRadius: 16,
                        border: '1px dashed rgba(255,255,255,0.3)',
                    }}>
                        <div style={{ fontSize: '0.78rem', color: '#fde047', fontWeight: 850, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Lightbulb size={14} /> GỢI Ý CÂU NÓI CHO BÉ:
                        </div>
                        <div style={{ fontSize: '0.85rem', fontStyle: 'italic', marginBottom: 10, opacity: 0.95 }}>
                            "{sentenceStarter}"
                        </div>

                        <button
                            onClick={handleVoiceRecord}
                            style={{
                                width: '100%', padding: '11px 14px', borderRadius: 12,
                                background: isListening ? '#ef4444' : '#10b981',
                                border: 'none', color: '#fff', fontWeight: 900, fontSize: '0.9rem',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                            }}
                        >
                            <Mic size={18} />
                            {isListening ? 'Đang nghe Henry giảng bài...' : '🎤 Bấm Mic & Giảng Cho Robo'}
                        </button>
                    </div>
                </div>
            )}

            {/* ═══ BƯỚC 3: ROBOT BỪNG SÁNG HIỂU BÀI (INSTANT EUREKA) ═══ */}
            {stage === 'eureka' && (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                    <div style={{
                        width: 72, height: 72, borderRadius: 24,
                        background: 'rgba(255,255,255,0.25)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '3rem', margin: '0 auto 10px',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                    }}>
                        💡
                    </div>

                    <div style={{ fontSize: '1.35rem', fontWeight: 900, letterSpacing: '-0.01em' }}>
                        "Bíp Bíp! Robo Đã Hiểu Bài Rồi!"
                    </div>

                    <div style={{ fontSize: '0.9rem', opacity: 0.92, marginTop: 6, maxWidth: 420, margin: '6px auto 14px', lineHeight: 1.5 }}>
                        Cảm ơn Thầy Giáo Nhí Henry! Khi con chỉ cho bạn khác hiểu, kiến thức đã được khắc sâu vào trí não của con.
                    </div>

                    {heardText && (
                        <div style={{
                            background: 'rgba(255,255,255,0.15)', padding: '6px 12px',
                            borderRadius: 10, fontSize: '0.8rem', fontStyle: 'italic', marginBottom: 12, display: 'inline-block',
                        }}>
                            📝 Lời giảng của bé: "{heardText}"
                        </div>
                    )}

                    <div>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: 8,
                            background: '#fef3c7', color: '#92400e',
                            padding: '8px 18px', borderRadius: 999,
                            fontWeight: 900, fontSize: '0.95rem',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        }}>
                            <Award size={20} /> HUY HIỆU: BẬC THẦY GIẢNG BÀI ⭐⭐⭐
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
