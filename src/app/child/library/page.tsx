'use client';

// ========================================
// Textbook Library — Browse & Read with Interactive Bilingual Reader
// Curated: CTGDPT 2018 + Cambridge + Oxford + Singapore + Classics
// Tap any word → instant EN definition + VN translation
// ========================================

import { useState, useMemo } from 'react';
import { useTranslation } from '@/lib/i18n';
import { LangToggle } from '@/components/LangToggle';
import { InteractiveReader } from '@/components/InteractiveReader';
import Link from 'next/link';
import {
    ArrowLeft, Home, RotateCcw, Brain, Sparkles, BookOpen,
    Library, ChevronRight, ArrowRight, Filter, GraduationCap,
} from 'lucide-react';
import {
    TEXTBOOK_LIBRARY,
    CATEGORY_LABELS,
    LIBRARY_STATS,
    type TextbookEntry,
    type TextbookPassage,
    type TextbookCategory,
} from '@/data/textbook-library';

type ViewMode = 'library' | 'book' | 'reader';

export default function LibraryPage() {
    const { t, lang } = useTranslation();
    const [viewMode, setViewMode] = useState<ViewMode>('library');
    const [selectedBook, setSelectedBook] = useState<TextbookEntry | null>(null);
    const [selectedPassage, setSelectedPassage] = useState<TextbookPassage | null>(null);
    const [gradeFilter, setGradeFilter] = useState<number | null>(null);
    const [categoryFilter, setCategoryFilter] = useState<TextbookCategory | null>(null);
    const [learnedCount, setLearnedCount] = useState(0);

    const filteredBooks = useMemo(() => {
        return TEXTBOOK_LIBRARY.filter(book => {
            if (gradeFilter !== null && book.grade !== gradeFilter) return false;
            if (categoryFilter !== null && book.category !== categoryFilter) return false;
            return true;
        });
    }, [gradeFilter, categoryFilter]);

    const openBook = (book: TextbookEntry) => {
        setSelectedBook(book);
        setViewMode('book');
    };

    const openPassage = (passage: TextbookPassage) => {
        setSelectedPassage(passage);
        setViewMode('reader');
        setLearnedCount(0);
    };

    const goBack = () => {
        if (viewMode === 'reader') {
            setViewMode('book');
            setSelectedPassage(null);
        } else if (viewMode === 'book') {
            setViewMode('library');
            setSelectedBook(null);
        }
    };

    const difficultyColors: Record<string, string> = {
        easy: '#22c55e', medium: '#f59e0b', hard: '#ef4444',
    };

    const difficultyLabels: Record<string, { vi: string; en: string }> = {
        easy: { vi: 'Dễ', en: 'Easy' },
        medium: { vi: 'Trung bình', en: 'Medium' },
        hard: { vi: 'Khó', en: 'Hard' },
    };

    return (
        <div style={{ paddingBottom: '5rem', background: 'var(--color-bg-child)', minHeight: '100dvh' }}>
            <div className="page-container">
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {viewMode !== 'library' ? (
                            <button className="btn btn-ghost btn-sm" onClick={goBack}>
                                <ArrowLeft size={18} />
                            </button>
                        ) : (
                            <Link href="/child"><button className="btn btn-ghost btn-sm"><ArrowLeft size={18} /></button></Link>
                        )}
                        <h1 style={{ fontWeight: 800, fontSize: '1.4rem' }}>
                            {viewMode === 'library' && (lang === 'vi' ? '📚 Thư viện Sách' : '📚 Library')}
                            {viewMode === 'book' && selectedBook && (lang === 'vi' ? selectedBook.titleVi : selectedBook.title)}
                            {viewMode === 'reader' && selectedPassage?.title}
                        </h1>
                    </div>
                    <LangToggle />
                </div>

                {/* ===================== LIBRARY VIEW ===================== */}
                {viewMode === 'library' && (
                    <>
                        {/* Stats banner */}
                        <div className="card" style={{
                            marginBottom: '1rem',
                            background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08))',
                            border: '1px solid rgba(99,102,241,0.12)',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <Library size={20} style={{ color: 'var(--color-primary)' }} />
                                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                                    {lang === 'vi'
                                        ? `${LIBRARY_STATS.totalBooks} cuốn • ${LIBRARY_STATS.totalPassages} bài đọc`
                                        : `${LIBRARY_STATS.totalBooks} books • ${LIBRARY_STATS.totalPassages} passages`}
                                </span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                                {lang === 'vi'
                                    ? 'Chạm vào bất kỳ từ nào khi đọc → xem nghĩa tiếng Anh + tiếng Việt ngay trên màn hình. Không cần tra từ điển!'
                                    : 'Tap any word while reading → see English definition + Vietnamese translation right on screen. No dictionary needed!'}
                            </p>
                        </div>

                        {/* Filters */}
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                <Filter size={13} /> {lang === 'vi' ? 'Lọc:' : 'Filter:'}
                            </div>
                            {/* Grade filter */}
                            {LIBRARY_STATS.grades.map(g => (
                                <button
                                    key={g}
                                    className={`btn btn-sm ${gradeFilter === g ? 'btn-primary' : 'btn-ghost'}`}
                                    onClick={() => setGradeFilter(gradeFilter === g ? null : g)}
                                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                                >
                                    <GraduationCap size={12} /> {lang === 'vi' ? `Lớp ${g}` : `Grade ${g}`}
                                </button>
                            ))}
                            {/* Category filter */}
                            {LIBRARY_STATS.categories.map(c => (
                                <button
                                    key={c}
                                    className={`btn btn-sm ${categoryFilter === c ? 'btn-primary' : 'btn-ghost'}`}
                                    onClick={() => setCategoryFilter(categoryFilter === c ? null : c)}
                                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                                >
                                    {CATEGORY_LABELS[c].emoji} {lang === 'vi' ? CATEGORY_LABELS[c].vi : CATEGORY_LABELS[c].en}
                                </button>
                            ))}
                        </div>

                        {/* Book grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
                            {filteredBooks.map((book, idx) => (
                                <button
                                    key={book.id}
                                    className="card animate-fade-in"
                                    onClick={() => openBook(book)}
                                    style={{
                                        animationDelay: `${idx * 0.04}s`,
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        display: 'flex', flexDirection: 'column', gap: '0.4rem',
                                        transition: 'all 0.2s ease',
                                        border: '2px solid transparent',
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary, #6366f1)';
                                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                                        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '1.5rem' }}>{book.coverEmoji}</span>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 700, fontSize: '0.9rem', lineHeight: 1.3 }}>
                                                {lang === 'vi' ? book.titleVi : book.title}
                                            </div>
                                            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                                                {lang === 'vi' ? `Lớp ${book.grade}` : `Grade ${book.grade}`} • {book.passages.length} {lang === 'vi' ? 'bài' : 'passages'}
                                            </div>
                                        </div>
                                        <ChevronRight size={16} style={{ color: 'var(--color-text-muted)' }} />
                                    </div>
                                    <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                                        {lang === 'vi' ? book.descriptionVi : book.description}
                                    </p>
                                    <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                                        <span className="badge" style={{
                                            background: 'rgba(99,102,241,0.08)',
                                            color: 'var(--color-primary)',
                                            fontSize: '0.65rem',
                                        }}>
                                            {CATEGORY_LABELS[book.category].emoji} {lang === 'vi' ? CATEGORY_LABELS[book.category].vi : CATEGORY_LABELS[book.category].en}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {filteredBooks.length === 0 && (
                            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                                <p style={{ fontWeight: 600 }}>{lang === 'vi' ? 'Không tìm thấy sách phù hợp' : 'No books match filter'}</p>
                            </div>
                        )}
                    </>
                )}

                {/* ===================== BOOK VIEW ===================== */}
                {viewMode === 'book' && selectedBook && (
                    <>
                        {/* Book info */}
                        <div className="card" style={{
                            marginBottom: '1rem',
                            background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(168,85,247,0.06))',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <span style={{ fontSize: '2rem' }}>{selectedBook.coverEmoji}</span>
                                <div>
                                    <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>
                                        {lang === 'vi' ? selectedBook.titleVi : selectedBook.title}
                                    </div>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                                        {CATEGORY_LABELS[selectedBook.category].emoji} {lang === 'vi' ? CATEGORY_LABELS[selectedBook.category].vi : CATEGORY_LABELS[selectedBook.category].en}
                                        {' • '}
                                        {lang === 'vi' ? `Lớp ${selectedBook.grade}` : `Grade ${selectedBook.grade}`}
                                    </div>
                                </div>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                                {lang === 'vi' ? selectedBook.descriptionVi : selectedBook.description}
                            </p>
                            <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                                📖 {selectedBook.sourceNote}
                            </div>
                        </div>

                        {/* Passage list */}
                        <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.75rem' }}>
                            {lang === 'vi' ? 'Bài đọc' : 'Passages'}
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            {selectedBook.passages.map((passage, idx) => (
                                <button
                                    key={passage.id}
                                    className="card animate-fade-in"
                                    onClick={() => openPassage(passage)}
                                    style={{
                                        animationDelay: `${idx * 0.05}s`,
                                        textAlign: 'left', cursor: 'pointer',
                                        transition: 'all 0.2s', border: '2px solid transparent',
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary)';
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                                    }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{passage.title}</div>
                                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                                <span>{passage.wordCount} {lang === 'vi' ? 'từ' : 'words'}</span>
                                                <span>•</span>
                                                <span style={{ color: difficultyColors[passage.difficulty], fontWeight: 600 }}>
                                                    {lang === 'vi' ? difficultyLabels[passage.difficulty].vi : difficultyLabels[passage.difficulty].en}
                                                </span>
                                                <span>•</span>
                                                <span>{passage.keyVocabulary.length} {lang === 'vi' ? 'từ vựng chính' : 'key words'}</span>
                                            </div>
                                        </div>
                                        <ArrowRight size={18} style={{ color: 'var(--color-primary)' }} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </>
                )}

                {/* ===================== READER VIEW ===================== */}
                {viewMode === 'reader' && selectedPassage && selectedBook && (
                    <>
                        {/* Progress */}
                        {selectedPassage.keyVocabulary.length > 0 && (
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                marginBottom: '0.75rem', padding: '0.5rem 0.75rem',
                                background: 'rgba(34, 197, 94, 0.06)', borderRadius: 10,
                            }}>
                                <Sparkles size={14} color="#22c55e" />
                                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#16a34a' }}>
                                    {lang === 'vi'
                                        ? `Đã khám phá ${learnedCount}/${selectedPassage.keyVocabulary.length} từ vựng chính`
                                        : `Explored ${learnedCount}/${selectedPassage.keyVocabulary.length} key words`}
                                </span>
                                {learnedCount >= selectedPassage.keyVocabulary.length && (
                                    <span style={{ marginLeft: 'auto', fontSize: '1.2rem' }}>🎉</span>
                                )}
                            </div>
                        )}

                        {/* Interactive reader */}
                        <div className="card" style={{ padding: '1.25rem' }}>
                            <InteractiveReader
                                text={selectedPassage.text}
                                keyVocabulary={selectedPassage.keyVocabulary}
                                viSummary={selectedPassage.viSummary}
                                title={selectedPassage.title}
                                difficulty={selectedPassage.difficulty}
                                onWordLearned={() => setLearnedCount(prev => prev + 1)}
                            />
                        </div>

                        {/* Key vocabulary list */}
                        {selectedPassage.keyVocabulary.length > 0 && (
                            <div className="card" style={{ marginTop: '0.75rem' }}>
                                <h3 style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                                    {lang === 'vi' ? '📝 Từ vựng chính' : '📝 Key Vocabulary'}
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                                    {selectedPassage.keyVocabulary.map(v => (
                                        <div key={v.word} style={{
                                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                                            padding: '0.4rem 0.6rem', borderRadius: 8,
                                            background: 'rgba(99,102,241,0.04)',
                                        }}>
                                            <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-primary)', minWidth: 90 }}>
                                                {v.word}
                                            </span>
                                            {v.phonetic && (
                                                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', minWidth: 80 }}>
                                                    {v.phonetic}
                                                </span>
                                            )}
                                            <span style={{ fontSize: '0.82rem', color: '#16a34a', fontWeight: 600 }}>
                                                {v.viMeaning}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            <nav className="bottom-nav">
                <Link href="/child" className="nav-item"><Home size={20} /><span>{t('nav_home')}</span></Link>
                <Link href="/child/elite" className="nav-item"><Sparkles size={20} /><span>{t('nav_elite')}</span></Link>
                <Link href="/child/review" className="nav-item"><RotateCcw size={20} /><span>{t('nav_review')}</span></Link>
                <Link href="/child/mistakes" className="nav-item"><Brain size={20} /><span>{t('nav_mistakes')}</span></Link>
                <Link href="/child/reading" className="nav-item"><BookOpen size={20} /><span>{t('nav_reading')}</span></Link>
            </nav>
        </div>
    );
}
