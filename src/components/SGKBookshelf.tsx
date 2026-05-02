'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { SGK_CATALOG, SGK_SUBJECTS, type SGKBook } from '@/data/sgk-catalog';
import { GraduationCap, ExternalLink, BookOpen, Sparkles, Star, Users, Lightbulb, Search, Flame, Clock, Heart, CheckCircle2 } from 'lucide-react';
import { trackBookOpen, getStreak, getRecentBooks, toggleFavorite, getFavoriteBookIds, getBookRecord, type DailyStreak } from '@/lib/reading-tracker';

const GRADES = [1, 2, 3, 4, 5];

// Grade theme colors for visual differentiation
const GRADE_THEMES: Record<number, { bg: string; accent: string; emoji: string; label: string }> = {
    1: { bg: 'linear-gradient(135deg, #fbbf24, #f59e0b)', accent: '#f59e0b', emoji: '🌟', label: 'Lớp 1 — Khám phá' },
    2: { bg: 'linear-gradient(135deg, #34d399, #10b981)', accent: '#10b981', emoji: '🌱', label: 'Lớp 2 — Vươn cao' },
    3: { bg: 'linear-gradient(135deg, #60a5fa, #3b82f6)', accent: '#3b82f6', emoji: '🚀', label: 'Lớp 3 — Chinh phục' },
    4: { bg: 'linear-gradient(135deg, #a78bfa, #8b5cf6)', accent: '#8b5cf6', emoji: '🏆', label: 'Lớp 4 — Bứt phá' },
    5: { bg: 'linear-gradient(135deg, #f472b6, #ec4899)', accent: '#ec4899', emoji: '👑', label: 'Lớp 5 — Tỏa sáng' },
};

interface SGKBookshelfProps {
    lang: string;
}

/* ========== PREMIUM BOOK CARD ========== */
function BookCard({ book, lang, isFav, onFav, openCount }: { book: SGKBook; lang: string; isFav?: boolean; onFav?: () => void; openCount?: number }) {
    const [hovered, setHovered] = useState(false);

    return (
        <a
            href={book.ebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackBookOpen(book.id)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hovered ? 'translateY(-6px) scale(1.02)' : 'none',
                filter: hovered ? 'brightness(1.02)' : 'none',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            title={`${book.title} — Đọc trên Hành trang số (NXB Giáo dục VN)`}
        >
            {/* Book Cover — 3D-ish design */}
            <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '3/4',
                borderRadius: '14px',
                background: `linear-gradient(155deg, ${book.coverColor}18, ${book.coverColor}35, ${book.coverColor}50)`,
                border: `2px solid ${book.coverColor}40`,
                boxShadow: hovered
                    ? `0 12px 32px ${book.coverColor}30, 0 4px 12px rgba(0,0,0,0.08)`
                    : `0 3px 10px ${book.coverColor}12, 0 1px 4px rgba(0,0,0,0.04)`,
                transition: 'box-shadow 0.25s ease',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {/* Decorative corner accent */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '40px',
                    height: '40px',
                    background: `linear-gradient(135deg, transparent 50%, ${book.coverColor}25 50%)`,
                    borderRadius: '0 14px 0 0',
                }} />

                {/* NXB badge top-center */}
                <div style={{
                    position: 'absolute',
                    top: '8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}>
                    <span style={{
                        fontSize: '0.48rem',
                        fontWeight: 700,
                        color: '#fff',
                        background: book.coverColor,
                        padding: '2px 8px',
                        borderRadius: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        whiteSpace: 'nowrap',
                        opacity: 0.85,
                    }}>
                        Bộ GD&ĐT
                    </span>
                </div>

                {/* Read count badge */}
                {openCount != null && openCount > 0 && (
                    <div style={{
                        position: 'absolute',
                        bottom: '6px',
                        left: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px',
                        background: 'rgba(22,163,74,0.85)',
                        color: '#fff',
                        padding: '1px 6px',
                        borderRadius: '6px',
                        fontSize: '0.48rem',
                        fontWeight: 700,
                        backdropFilter: 'blur(4px)',
                        zIndex: 2,
                    }}>
                        <CheckCircle2 size={9} />
                        {openCount}x
                    </div>
                )}

                {/* Big Emoji */}
                <span style={{
                    fontSize: '2.5rem',
                    filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))',
                    marginTop: '0.3rem',
                    transition: 'transform 0.3s ease',
                    transform: hovered ? 'scale(1.15) rotate(-3deg)' : 'none',
                }}>
                    {book.coverEmoji}
                </span>

                {/* Subject Name */}
                <div style={{
                    fontWeight: 800,
                    fontSize: '0.72rem',
                    color: book.coverColor,
                    textAlign: 'center',
                    lineHeight: 1.2,
                    textTransform: 'uppercase',
                    letterSpacing: '0.03em',
                    marginTop: '0.2rem',
                    padding: '0 0.3rem',
                }}>
                    {book.subjectLabel}
                </div>

                {/* Grade Number */}
                <div style={{
                    fontWeight: 900,
                    fontSize: '1.8rem',
                    color: book.coverColor,
                    lineHeight: 1,
                    textShadow: `0 1px 2px ${book.coverColor}20`,
                }}>
                    {book.grade}
                </div>

                {/* Volume Tag */}
                {book.volume && (
                    <span style={{
                        fontSize: '0.58rem',
                        fontWeight: 700,
                        color: book.coverColor,
                        background: `${book.coverColor}18`,
                        padding: '2px 10px',
                        borderRadius: '6px',
                        border: `1px solid ${book.coverColor}25`,
                    }}>
                        {book.volume}
                    </span>
                )}

                {/* Favorite heart */}
                {onFav && (
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onFav(); }}
                        style={{
                            position: 'absolute',
                            top: '6px',
                            right: '6px',
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            border: 'none',
                            background: isFav ? '#fee2e2' : 'rgba(255,255,255,0.7)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                            zIndex: 2,
                            backdropFilter: 'blur(4px)',
                        }}
                        title={isFav ? 'Bỏ yêu thích' : 'Yêu thích'}
                    >
                        <Heart size={13} fill={isFav ? '#ef4444' : 'none'} color={isFav ? '#ef4444' : '#94a3b8'} />
                    </button>
                )}

                {/* Bottom open indicator */}
                <div style={{
                    position: 'absolute',
                    bottom: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    opacity: hovered ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                }}>
                    <ExternalLink size={10} color={book.coverColor} />
                    <span style={{ fontSize: '0.5rem', fontWeight: 600, color: book.coverColor }}>
                        {lang === 'vi' ? 'Đọc sách' : 'Read'}
                    </span>
                </div>
            </div>

            {/* Label below card */}
            <span style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                color: 'var(--color-text-secondary, #64748b)',
                textAlign: 'center',
                marginTop: '0.4rem',
                lineHeight: 1.3,
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
            }}>
                {book.title}
            </span>
        </a>
    );
}

/* ========== LEARNING TIPS SECTION — Benchmark Epic/KAK ========== */
function LearningTips({ lang, grade }: { lang: string; grade: number }) {
    const tips = {
        1: {
            parent: lang === 'vi'
                ? '🧸 Đọc cùng bé 15-20 phút/ngày. Chỉ vào từng chữ khi đọc. Hỏi "Con thấy gì trong tranh?" sau mỗi trang.'
                : '🧸 Read together 15-20 min/day. Point to each word. Ask "What do you see?" after each page.',
            child: lang === 'vi'
                ? '⭐ Tập đánh vần mỗi ngày. Vẽ tranh về câu chuyện vừa đọc!'
                : '⭐ Practice spelling daily. Draw pictures about the story!',
        },
        2: {
            parent: lang === 'vi'
                ? '📖 Khuyến khích bé đọc to. Thảo luận ý nghĩa câu chuyện. Ghi lại từ mới vào sổ tay.'
                : '📖 Encourage reading aloud. Discuss story meanings. Write new words in a notebook.',
            child: lang === 'vi'
                ? '🌈 Đọc ít nhất 1 bài mỗi ngày. Kể lại câu chuyện cho ba mẹ nghe!'
                : '🌈 Read at least 1 passage daily. Retell the story to parents!',
        },
        3: {
            parent: lang === 'vi'
                ? '🔑 Bắt đầu cho bé đọc độc lập. Kiểm tra hiểu bài bằng 3 câu hỏi đơn giản sau khi đọc.'
                : '🔑 Start independent reading. Check comprehension with 3 simple questions after reading.',
            child: lang === 'vi'
                ? '🚀 Tập đọc thầm và tóm tắt nội dung bằng 2-3 câu. Bắt đầu học Tiếng Anh vui!'
                : '🚀 Practice silent reading and summarize in 2-3 sentences. Start fun English!',
        },
        4: {
            parent: lang === 'vi'
                ? '📊 Giúp bé lập kế hoạch học tập. Dạy cách ghi chú và lập sơ đồ tư duy đơn giản.'
                : '📊 Help create study plans. Teach note-taking and simple mind maps.',
            child: lang === 'vi'
                ? '🏆 Tập phân tích bài đọc: Ai? Ở đâu? Khi nào? Tại sao? So sánh các môn học.'
                : '🏆 Analyze readings: Who? Where? When? Why? Compare across subjects.',
        },
        5: {
            parent: lang === 'vi'
                ? '🎯 Chuẩn bị cho THCS. Rèn tư duy phản biện: "Con nghĩ gì khác?", "Có cách nào khác không?"'
                : '🎯 Prepare for middle school. Build critical thinking: "What do you think differently?"',
            child: lang === 'vi'
                ? '👑 Tự đặt mục tiêu học tập. Viết nhật ký đọc sách. Thuyết trình trước lớp!'
                : '👑 Set learning goals. Keep a reading journal. Present to class!',
        },
    };

    const tip = tips[grade as keyof typeof tips] || tips[1];

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '0.75rem',
            marginBottom: '1rem',
        }}>
            {/* Parent Tip */}
            <div style={{
                background: 'linear-gradient(135deg, #fef3c7, #fde68a33)',
                border: '1px solid #fbbf2433',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                    <Users size={14} color="#d97706" />
                    <span style={{ fontWeight: 700, fontSize: '0.72rem', color: '#92400e' }}>
                        {lang === 'vi' ? 'Gợi ý cho Ba Mẹ' : 'Parent Tips'}
                    </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.7rem', color: '#78350f', lineHeight: 1.5 }}>{tip.parent}</p>
            </div>
            {/* Child Tip */}
            <div style={{
                background: 'linear-gradient(135deg, #dbeafe, #bfdbfe33)',
                border: '1px solid #3b82f633',
                borderRadius: '12px',
                padding: '0.75rem 1rem',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                    <Lightbulb size={14} color="#2563eb" />
                    <span style={{ fontWeight: 700, fontSize: '0.72rem', color: '#1e3a5f' }}>
                        {lang === 'vi' ? `Cách học hiệu quả (Lớp ${grade})` : `Study Tips (Grade ${grade})`}
                    </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.7rem', color: '#1e40af', lineHeight: 1.5 }}>{tip.child}</p>
            </div>
        </div>
    );
}

/* ========== MAIN COMPONENT ========== */
export default function SGKBookshelf({ lang }: SGKBookshelfProps) {
    const [selectedGrade, setSelectedGrade] = useState(1);
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [streak, setStreak] = useState<DailyStreak>({ currentStreak: 0, longestStreak: 0, lastReadDate: '', totalBooksOpened: 0, todayBooksOpened: 0 });
    const [recentIds, setRecentIds] = useState<string[]>([]);
    const [favIds, setFavIds] = useState<string[]>([]);

    useEffect(() => {
        setStreak(getStreak());
        setRecentIds(getRecentBooks(6).map(r => r.bookId));
        setFavIds(getFavoriteBookIds());
    }, []);

    const filteredBooks = useMemo(() => {
        let books = SGK_CATALOG.filter(b => b.grade === selectedGrade);
        if (selectedSubject) {
            books = books.filter(b => b.subject === selectedSubject);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            books = SGK_CATALOG.filter(b => b.title.toLowerCase().includes(q) || b.subjectLabel.toLowerCase().includes(q));
        }
        return books;
    }, [selectedGrade, selectedSubject, searchQuery]);

    const availableSubjects = useMemo(() => {
        const subjects = new Set(SGK_CATALOG.filter(b => b.grade === selectedGrade).map(b => b.subject));
        return SGK_SUBJECTS.filter(s => subjects.has(s.id));
    }, [selectedGrade]);

    const gradeTheme = GRADE_THEMES[selectedGrade];

    return (
        <div style={{
            marginBottom: '1.5rem',
            background: 'var(--color-surface, #fff)',
            borderRadius: '20px',
            border: '1px solid rgba(0,0,0,0.06)',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        }}>
            {/* ========== HERO HEADER ========== */}
            <div style={{
                background: gradeTheme.bg,
                padding: '1.5rem 1.5rem 1.25rem',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Background decorative circles */}
                <div style={{
                    position: 'absolute', top: '-20px', right: '-20px',
                    width: '120px', height: '120px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.15)',
                }} />
                <div style={{
                    position: 'absolute', bottom: '-30px', left: '20%',
                    width: '80px', height: '80px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        marginBottom: '0.35rem',
                    }}>
                        <GraduationCap size={22} color="#fff" />
                        <h2 style={{ fontWeight: 800, fontSize: '1.15rem', margin: 0, color: '#fff' }}>
                            {lang === 'vi' ? '📚 Thư viện SGK Điện tử' : '📚 Digital Textbook Library'}
                        </h2>
                    </div>
                    <p style={{
                        fontSize: '0.78rem', color: 'rgba(255,255,255,0.92)',
                        margin: 0, lineHeight: 1.4,
                    }}>
                        {lang === 'vi'
                            ? `${gradeTheme.emoji} ${gradeTheme.label} • ${filteredBooks.length} cuốn SGK chính thức (NXB Giáo dục VN) • CTGDPT 2018`
                            : `${gradeTheme.emoji} Grade ${selectedGrade} • ${filteredBooks.length} official textbooks • CTGDPT 2018`}
                    </p>
                </div>

                {/* ========== GRADE TABS — Pill style ========== */}
                <div style={{
                    display: 'flex', gap: '0.5rem', marginTop: '1rem',
                    position: 'relative', zIndex: 1,
                }}>
                    {GRADES.map(g => (
                        <button
                            key={g}
                            onClick={() => { setSelectedGrade(g); setSelectedSubject(null); }}
                            style={{
                                width: '44px',
                                height: '44px',
                                borderRadius: '50%',
                                border: selectedGrade === g
                                    ? '3px solid #fff'
                                    : '2px solid rgba(255,255,255,0.4)',
                                background: selectedGrade === g
                                    ? '#fff'
                                    : 'rgba(255,255,255,0.2)',
                                color: selectedGrade === g
                                    ? gradeTheme.accent
                                    : 'rgba(255,255,255,0.9)',
                                fontWeight: 900,
                                fontSize: '1rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: selectedGrade === g
                                    ? '0 4px 12px rgba(0,0,0,0.15)'
                                    : 'none',
                                transform: selectedGrade === g ? 'scale(1.08)' : 'none',
                            }}
                        >
                            {g}
                        </button>
                    ))}
                </div>
            </div>

            {/* ========== CONTENT AREA ========== */}
            <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>

                {/* ========== STREAK + STATS BAR — Benchmark: Duolingo/Epic ========== */}
                {(streak.currentStreak > 0 || streak.totalBooksOpened > 0) && (
                    <div style={{
                        display: 'flex', gap: '0.75rem', marginBottom: '1rem',
                        flexWrap: 'wrap',
                    }}>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '0.4rem',
                            padding: '8px 14px', borderRadius: '12px',
                            background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                            border: '1px solid #fbbf2433',
                        }}>
                            <Flame size={16} color="#ea580c" />
                            <span style={{ fontWeight: 800, fontSize: '0.82rem', color: '#9a3412' }}>
                                {streak.currentStreak}
                            </span>
                            <span style={{ fontSize: '0.65rem', color: '#92400e', fontWeight: 600 }}>
                                {lang === 'vi' ? 'ngày liên tiếp' : 'day streak'}
                            </span>
                        </div>
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '0.4rem',
                            padding: '8px 14px', borderRadius: '12px',
                            background: '#f0fdf4', border: '1px solid #bbf7d033',
                        }}>
                            <BookOpen size={14} color="#16a34a" />
                            <span style={{ fontWeight: 700, fontSize: '0.72rem', color: '#166534' }}>
                                {streak.totalBooksOpened} {lang === 'vi' ? 'lần đọc' : 'reads'}
                                {streak.todayBooksOpened > 0 && ` • ${streak.todayBooksOpened} ${lang === 'vi' ? 'hôm nay' : 'today'}`}
                            </span>
                        </div>
                    </div>
                )}

                {/* ========== STREAK BADGES — Benchmark: Reading Eggs rewards ========== */}
                {streak.currentStreak >= 3 && (
                    <div style={{
                        display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap',
                    }}>
                        {streak.currentStreak >= 3 && (
                            <span style={{
                                padding: '4px 12px', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 700,
                                background: '#fef3c7', color: '#92400e', border: '1px solid #fbbf2433',
                            }}>🌟 3 ngày</span>
                        )}
                        {streak.currentStreak >= 7 && (
                            <span style={{
                                padding: '4px 12px', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 700,
                                background: '#dbeafe', color: '#1e40af', border: '1px solid #3b82f633',
                            }}>🚀 7 ngày</span>
                        )}
                        {streak.currentStreak >= 14 && (
                            <span style={{
                                padding: '4px 12px', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 700,
                                background: '#f3e8ff', color: '#6b21a8', border: '1px solid #8b5cf633',
                            }}>🏆 14 ngày</span>
                        )}
                        {streak.currentStreak >= 30 && (
                            <span style={{
                                padding: '4px 12px', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 700,
                                background: 'linear-gradient(135deg, #fef3c7, #fde68a)', color: '#78350f',
                                border: '1px solid #f59e0b55', boxShadow: '0 2px 8px rgba(245,158,11,0.2)',
                            }}>👑 30 ngày — Siêu sao!</span>
                        )}
                    </div>
                )}

                {/* ========== SEARCH BAR — Benchmark: Epic library ========== */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '8px 14px', borderRadius: '14px',
                    background: '#f8fafc', border: '1px solid #e2e8f0',
                    marginBottom: '1rem',
                }}>
                    <Search size={16} color="#94a3b8" />
                    <input
                        type="text"
                        placeholder={lang === 'vi' ? '🔍 Tìm sách... (vd: Toán, Tiếng Anh, Khoa học)' : '🔍 Search books...'}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        style={{
                            flex: 1, border: 'none', outline: 'none',
                            background: 'transparent', fontSize: '0.8rem',
                            color: '#1e293b', fontWeight: 500,
                        }}
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')} style={{
                            border: 'none', background: '#e2e8f0', borderRadius: '50%',
                            width: 22, height: 22, cursor: 'pointer', fontSize: '0.7rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#64748b',
                        }}>✕</button>
                    )}
                </div>

                {/* ========== RECENTLY OPENED — Benchmark: Epic history ========== */}
                {recentIds.length > 0 && !searchQuery && (
                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                            <Clock size={14} color="#6366f1" />
                            <span style={{ fontWeight: 700, fontSize: '0.75rem', color: '#4338ca' }}>
                                {lang === 'vi' ? 'Đọc gần đây' : 'Recently opened'}
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                            {recentIds.map(id => {
                                const book = SGK_CATALOG.find(b => b.id === id);
                                if (!book) return null;
                                return (
                                    <a key={id} href={book.ebookUrl} target="_blank" rel="noopener noreferrer"
                                       onClick={() => trackBookOpen(book.id)}
                                       style={{
                                           minWidth: '70px', padding: '8px', borderRadius: '10px',
                                           background: `${book.coverColor}10`, border: `1px solid ${book.coverColor}20`,
                                           textDecoration: 'none', textAlign: 'center',
                                           transition: 'transform 0.15s', cursor: 'pointer',
                                       }}>
                                        <div style={{ fontSize: '1.3rem' }}>{book.coverEmoji}</div>
                                        <div style={{ fontSize: '0.55rem', fontWeight: 600, color: book.coverColor, marginTop: '2px', lineHeight: 1.2 }}>
                                            {book.subjectLabel} {book.grade}
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ========== FAVORITES SHELF — Benchmark: Epic "My Collection" ========== */}
                {favIds.length > 0 && !searchQuery && (
                    <div style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                            <Heart size={14} color="#ef4444" fill="#ef4444" />
                            <span style={{ fontWeight: 700, fontSize: '0.75rem', color: '#dc2626' }}>
                                {lang === 'vi' ? `Yêu thích (${favIds.length})` : `Favorites (${favIds.length})`}
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                            {favIds.map(id => {
                                const book = SGK_CATALOG.find(b => b.id === id);
                                if (!book) return null;
                                return (
                                    <a key={id} href={book.ebookUrl} target="_blank" rel="noopener noreferrer"
                                       onClick={() => trackBookOpen(book.id)}
                                       style={{
                                           minWidth: '70px', padding: '8px', borderRadius: '10px',
                                           background: '#fef2f2', border: '1px solid #fca5a520',
                                           textDecoration: 'none', textAlign: 'center',
                                           transition: 'transform 0.15s', cursor: 'pointer',
                                       }}>
                                        <div style={{ fontSize: '1.3rem' }}>{book.coverEmoji}</div>
                                        <div style={{ fontSize: '0.55rem', fontWeight: 600, color: book.coverColor, marginTop: '2px', lineHeight: 1.2 }}>
                                            {book.subjectLabel} {book.grade}
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Learning Tips — Benchmark: Khan Academy / Epic coaching */}
                <LearningTips lang={lang} grade={selectedGrade} />

                {/* Subject Filter Chips */}
                <div style={{
                    display: 'flex',
                    gap: '0.4rem',
                    marginBottom: '1.25rem',
                    flexWrap: 'wrap',
                    padding: '0.5rem 0',
                }}>
                    <button
                        onClick={() => setSelectedSubject(null)}
                        style={{
                            padding: '6px 14px',
                            borderRadius: '20px',
                            border: selectedSubject === null ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                            background: selectedSubject === null
                                ? 'linear-gradient(135deg, #4f46e5, #6d28d9)'
                                : '#f8fafc',
                            color: selectedSubject === null ? '#fff' : '#64748b',
                            fontWeight: 700,
                            fontSize: '0.72rem',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                        }}
                    >
                        ✨ {lang === 'vi' ? 'Tất cả' : 'All'} ({SGK_CATALOG.filter(b => b.grade === selectedGrade).length})
                    </button>
                    {availableSubjects.map(s => (
                        <button
                            key={s.id}
                            onClick={() => setSelectedSubject(s.id)}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '20px',
                                border: selectedSubject === s.id
                                    ? `2px solid ${s.color}`
                                    : '1px solid #e2e8f0',
                                background: selectedSubject === s.id
                                    ? `${s.color}15`
                                    : '#f8fafc',
                                color: selectedSubject === s.id ? s.color : '#64748b',
                                fontWeight: 600,
                                fontSize: '0.7rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                transition: 'all 0.15s ease',
                            }}
                        >
                            <span style={{ fontSize: '0.82rem' }}>{s.emoji}</span> {s.label}
                        </button>
                    ))}
                </div>

                {/* ========== BOOK GRID — Responsive ========== */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                    gap: '1rem 0.75rem',
                    padding: '0.25rem 0',
                }}>
                    {filteredBooks.map(book => (
                        <BookCard
                            key={book.id}
                            book={book}
                            lang={lang}
                            isFav={favIds.includes(book.id)}
                            openCount={getBookRecord(book.id)?.openCount || 0}
                            onFav={() => {
                                const newState = toggleFavorite(book.id);
                                setFavIds(newState ? [...favIds, book.id] : favIds.filter(id => id !== book.id));
                            }}
                        />
                    ))}
                </div>

                {/* ========== STATS + ATTRIBUTION ========== */}
                <div style={{
                    marginTop: '1.25rem',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #f0fdf4, #ecfdf5)',
                    border: '1px solid #bbf7d022',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.3rem',
                }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                        fontSize: '0.72rem', fontWeight: 700, color: '#166534',
                    }}>
                        <BookOpen size={14} />
                        {filteredBooks.length} {lang === 'vi' ? 'cuốn' : 'books'} — {lang === 'vi' ? 'Lớp' : 'Grade'} {selectedGrade}
                        {selectedSubject ? ` • ${availableSubjects.find(s => s.id === selectedSubject)?.label}` : ''}
                    </div>
                    <div style={{ fontSize: '0.62rem', color: '#15803d', lineHeight: 1.5 }}>
                        {lang === 'vi'
                            ? '📋 Nguồn: NXB Giáo dục Việt Nam (hanhtrangso.nxbgd.vn). Sử dụng cho mục đích học tập cá nhân/gia đình theo Luật SHTT Điều 25 Khoản 1a.'
                            : '📋 Source: Vietnam Education Publishing House (hanhtrangso.nxbgd.vn). Personal/family educational use under IP Law Art. 25§1a.'}
                    </div>
                </div>
            </div>
        </div>
    );
}
