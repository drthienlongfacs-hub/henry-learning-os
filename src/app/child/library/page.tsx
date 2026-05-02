'use client';

// ========================================
// Textbook Library - Browse & Read with Interactive Bilingual Reader
// Curated: CTGDPT 2018 + Cambridge + Oxford + Singapore + Classics
// Tap any word → instant EN definition + VN translation
// ========================================

import { useState, useMemo } from 'react';
import { useTranslation } from '@/lib/i18n';
import { LangToggle } from '@/components/LangToggle';
import { InteractiveReader } from '@/components/InteractiveReader';
import { LocalTextbookVault } from '@/components/LocalTextbookVault';
import dynamic from 'next/dynamic';
const PdfReader = dynamic(() => import('@/components/PdfReader').then(mod => mod.PdfReader), { ssr: false });
import SGKBookshelf from '@/components/SGKBookshelf';
const FreeStoriesShelf = dynamic(() => import('@/components/FreeStoriesShelf'), { ssr: false });
const ReadingQuiz = dynamic(() => import('@/components/ReadingQuiz'), { ssr: false });
import Link from 'next/link';
import {
    ArrowLeft, Home, RotateCcw, Brain, Sparkles, BookOpen,
    Library, ChevronRight, ArrowRight, Filter, GraduationCap, FileText,
} from 'lucide-react';
import {
    buildLocalTextbookReaderSupport,
    formatFileSize,
    type LocalTextbookRecord,
} from '@/lib/textbook/local-textbook';
import {
    TEXTBOOK_LIBRARY,
    CATEGORY_LABELS,
    COVERAGE_STATUS_LABELS,
    LICENSE_STATUS_LABELS,
    LIBRARY_STATS,
    OFFICIAL_LIBRARY_SOURCE_PACKS,
    TEXTBOOK_COPYRIGHT_GUARDRAIL,
    type TextbookEntry,
    type TextbookPassage,
    type TextbookCategory,
    type LibraryLicenseStatus,
} from '@/data/textbook-library';

type ViewMode = 'library' | 'book' | 'reader' | 'embedded-reader' | 'pdf' | 'ebook';

export default function LibraryPage() {
    const { t, lang } = useTranslation();
    const [viewMode, setViewMode] = useState<ViewMode>('library');
    const [selectedBook, setSelectedBook] = useState<TextbookEntry | null>(null);
    const [selectedPassage, setSelectedPassage] = useState<TextbookPassage | null>(null);
    const [selectedEmbeddedBook, setSelectedEmbeddedBook] = useState<LocalTextbookRecord | null>(null);
    const [gradeFilter, setGradeFilter] = useState<number | null>(null);
    const [categoryFilter, setCategoryFilter] = useState<TextbookCategory | null>(null);
    const [licenseFilter, setLicenseFilter] = useState<LibraryLicenseStatus | null>(null);
    const [learnedCount, setLearnedCount] = useState(0);

    const filteredBooks = useMemo(() => {
        return TEXTBOOK_LIBRARY.filter(book => {
            if (gradeFilter !== null && book.grade !== gradeFilter) return false;
            if (categoryFilter !== null && book.category !== categoryFilter) return false;
            if (licenseFilter !== null && book.licenseStatus !== licenseFilter) return false;
            return true;
        });
    }, [gradeFilter, categoryFilter, licenseFilter]);

    const embeddedReaderSupport = useMemo(() => {
        if (!selectedEmbeddedBook?.textContent) return null;
        return buildLocalTextbookReaderSupport(selectedEmbeddedBook.title, selectedEmbeddedBook.textContent);
    }, [selectedEmbeddedBook]);

    const openBook = (book: TextbookEntry) => {
        setSelectedBook(book);
        setViewMode('book');
    };

    const openPassage = (passage: TextbookPassage) => {
        setSelectedPassage(passage);
        setSelectedEmbeddedBook(null);
        setViewMode('reader');
        setLearnedCount(0);
    };

    const openEmbeddedBook = (book: LocalTextbookRecord) => {
        setSelectedEmbeddedBook(book);
        setSelectedBook(null);
        setSelectedPassage(null);
        setViewMode('embedded-reader');
        setLearnedCount(0);
    };

    const goBack = () => {
        if (viewMode === 'reader') {
            setViewMode('book');
            setSelectedPassage(null);
        } else if (viewMode === 'embedded-reader') {
            setViewMode('library');
            setSelectedEmbeddedBook(null);
        } else if (viewMode === 'pdf' || viewMode === 'ebook') {
            setViewMode('book');
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
                            {viewMode === 'embedded-reader' && selectedEmbeddedBook?.title}
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
                                        ? `${LIBRARY_STATS.totalBooks} kệ sách • ${LIBRARY_STATS.readableBooks} đọc ngay • ${LIBRARY_STATS.totalPassages} bài đọc`
                                        : `${LIBRARY_STATS.totalBooks} shelves • ${LIBRARY_STATS.readableBooks} read now • ${LIBRARY_STATS.totalPassages} passages`}
                                </span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                                {lang === 'vi'
                                    ? 'Đọc ngay các đoạn luyện tập tự biên soạn và nguồn public domain. SGK/textbook có bản quyền chỉ mở toàn văn khi gia đình có file hoặc tài khoản hợp lệ.'
                                    : 'Read original companion passages and public-domain content now. Copyrighted textbooks open only when the family has a licensed file or account.'}
                            </p>
                        </div>

                        <LocalTextbookVault lang={lang} onOpenTextbook={openEmbeddedBook} />

                        {/* ========== SGK BOOKSHELF — Bộ SGK Thống Nhất ========== */}
                        <SGKBookshelf lang={lang} />

                        {/* ========== FREE STORIES — StoryWeaver CC-BY 4.0 ========== */}
                        <FreeStoriesShelf lang={lang} />

                        {/* ========== READING QUIZ — Comprehension checks ========== */}
                        <ReadingQuiz lang={lang} />

                        {/* Copyright-aware hard textbook policy */}
                        <div className="card" style={{
                            marginBottom: '1rem',
                            background: 'rgba(255,255,255,0.82)',
                            border: '1px solid rgba(245,158,11,0.22)',
                        }}>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: 10,
                                    background: 'rgba(245,158,11,0.12)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.2rem',
                                }}>🔐</div>
                                <div style={{ flex: 1, minWidth: 220 }}>
                                    <div style={{ fontWeight: 900, fontSize: '0.92rem' }}>
                                        {lang === 'vi' ? 'Kệ SGK/textbook cứng có kiểm soát bản quyền' : 'Copyright-aware textbook shelf'}
                                    </div>
                                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.78rem', lineHeight: 1.5, marginTop: '0.25rem' }}>
                                        {lang === 'vi' ? TEXTBOOK_COPYRIGHT_GUARDRAIL.importPolicy : TEXTBOOK_COPYRIGHT_GUARDRAIL.allowedClaim}
                                    </p>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.5rem', marginTop: '0.75rem' }}>
                                {OFFICIAL_LIBRARY_SOURCE_PACKS.slice(0, 4).map(source => (
                                    <a
                                        key={source.id}
                                        href={source.sourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            textDecoration: 'none',
                                            border: '1px solid rgba(15,23,42,0.08)',
                                            background: 'rgba(15,23,42,0.025)',
                                            borderRadius: 10,
                                            padding: '0.65rem',
                                            minHeight: 92,
                                        }}
                                    >
                                        <div style={{ fontWeight: 850, color: 'var(--color-text-primary)', fontSize: '0.78rem', lineHeight: 1.25 }}>
                                            {source.title}
                                        </div>
                                        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.68rem', marginTop: '0.25rem' }}>
                                            {source.provider}
                                        </div>
                                        <div style={{ color: LICENSE_STATUS_LABELS[source.licenseStatus].tone, fontWeight: 850, fontSize: '0.68rem', marginTop: '0.35rem' }}>
                                            {lang === 'vi' ? LICENSE_STATUS_LABELS[source.licenseStatus].vi : LICENSE_STATUS_LABELS[source.licenseStatus].en}
                                        </div>
                                    </a>
                                ))}
                            </div>
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
                            {LIBRARY_STATS.licenseStatuses.map(status => (
                                <button
                                    key={status}
                                    className={`btn btn-sm ${licenseFilter === status ? 'btn-primary' : 'btn-ghost'}`}
                                    onClick={() => setLicenseFilter(licenseFilter === status ? null : status)}
                                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                                >
                                    {lang === 'vi' ? LICENSE_STATUS_LABELS[status].vi : LICENSE_STATUS_LABELS[status].en}
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
                                        <span className="badge" style={{
                                            background: `${LICENSE_STATUS_LABELS[book.licenseStatus].tone}14`,
                                            color: LICENSE_STATUS_LABELS[book.licenseStatus].tone,
                                            fontSize: '0.65rem',
                                        }}>
                                            {lang === 'vi' ? LICENSE_STATUS_LABELS[book.licenseStatus].vi : LICENSE_STATUS_LABELS[book.licenseStatus].en}
                                        </span>
                                        <span className="badge" style={{
                                            background: 'rgba(15,23,42,0.05)',
                                            color: 'var(--color-text-secondary)',
                                            fontSize: '0.65rem',
                                        }}>
                                            {lang === 'vi' ? COVERAGE_STATUS_LABELS[book.coverageStatus].vi : COVERAGE_STATUS_LABELS[book.coverageStatus].en}
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

                {/* ===================== EMBEDDED LOCAL READER VIEW ===================== */}
                {viewMode === 'embedded-reader' && selectedEmbeddedBook && (
                    <>
                        <div className="card" style={{
                            marginBottom: '1rem',
                            background: 'linear-gradient(135deg, rgba(22,163,74,0.06), rgba(99,102,241,0.05))',
                            border: '1px solid rgba(22,163,74,0.16)',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', flexWrap: 'wrap' }}>
                                <FileText size={22} color="#16a34a" />
                                <div style={{ flex: 1, minWidth: 220 }}>
                                    <div style={{ fontWeight: 900, fontSize: '1rem' }}>
                                        {selectedEmbeddedBook.title}
                                    </div>
                                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.74rem', marginTop: '0.2rem' }}>
                                        {selectedEmbeddedBook.fileType.toUpperCase()} • {formatFileSize(selectedEmbeddedBook.sizeBytes)} • {selectedEmbeddedBook.sourceLabel}
                                    </div>
                                </div>
                                <span className="badge" style={{ background: 'rgba(22,163,74,0.1)', color: '#16a34a', fontSize: '0.72rem' }}>
                                    {lang === 'vi' ? 'Đã nhúng trong app' : 'Embedded in app'}
                                </span>
                            </div>
                            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.78rem', lineHeight: 1.5, marginTop: '0.65rem' }}>
                                {selectedEmbeddedBook.rightsNote}
                            </p>
                        </div>

                        {selectedEmbeddedBook.textContent && embeddedReaderSupport ? (
                            <>
                                {embeddedReaderSupport.keyVocabulary.length > 0 && (
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                                        marginBottom: '0.75rem', padding: '0.5rem 0.75rem',
                                        background: 'rgba(34, 197, 94, 0.06)', borderRadius: 10,
                                    }}>
                                        <Sparkles size={14} color="#22c55e" />
                                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#16a34a' }}>
                                            {lang === 'vi'
                                                ? `Đã khám phá ${learnedCount}/${embeddedReaderSupport.keyVocabulary.length} từ vựng gợi ý`
                                                : `Explored ${learnedCount}/${embeddedReaderSupport.keyVocabulary.length} suggested words`}
                                        </span>
                                    </div>
                                )}

                                <div className="card" style={{ padding: '1.25rem' }}>
                                    <InteractiveReader
                                        text={selectedEmbeddedBook.textContent}
                                        keyVocabulary={embeddedReaderSupport.keyVocabulary}
                                        viSummary={embeddedReaderSupport.viSummary}
                                        title={selectedEmbeddedBook.title}
                                        difficulty="medium"
                                        sentenceGuides={embeddedReaderSupport.sentenceGuides}
                                        support={embeddedReaderSupport.support}
                                        comprehensionChecks={embeddedReaderSupport.comprehensionChecks}
                                        sourceAlignment={embeddedReaderSupport.sourceAlignment}
                                        sourceNote={selectedEmbeddedBook.sourceLabel}
                                        licenseNote={selectedEmbeddedBook.rightsNote}
                                        onWordLearned={() => setLearnedCount(prev => prev + 1)}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="card" style={{ padding: '0.85rem', border: '1px solid rgba(99,102,241,0.14)' }}>
                                {selectedEmbeddedBook.fileType === 'pdf' && selectedEmbeddedBook.dataUrl ? (
                                    <div style={{ height: '70vh', background: 'white', borderRadius: 12, overflow: 'hidden' }}>
                                        <PdfReader
                                            fileUrl={selectedEmbeddedBook.dataUrl}
                                            title={selectedEmbeddedBook.title}
                                            onClose={goBack}
                                        />
                                    </div>
                                ) : (
                                    <div style={{
                                        minHeight: 260,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '0.65rem',
                                        color: 'var(--color-text-secondary)',
                                        textAlign: 'center',
                                        padding: '1.5rem',
                                    }}>
                                        <BookOpen size={34} color="var(--color-primary, #6366f1)" />
                                        <div style={{ fontWeight: 900, color: 'var(--color-text-primary)' }}>
                                            {lang === 'vi' ? 'File đã được nhúng trong app' : 'File embedded in the app'}
                                        </div>
                                        <p style={{ maxWidth: 520, fontSize: '0.84rem', lineHeight: 1.55 }}>
                                            {lang === 'vi'
                                                ? 'EPUB đã được lưu cục bộ. Nếu muốn tra từ từng câu như TXT/MD, hãy nhập thêm bản OCR/text của cùng sách hoặc chuyển EPUB sang TXT rồi nhúng lại.'
                                                : 'The EPUB is stored locally. For sentence-level bilingual lookup like TXT/MD, import an OCR/text version of the same book or convert the EPUB to TXT and embed it again.'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                )}

                {/* ===================== NATIVE PDF VIEW ===================== */}
                {viewMode === 'pdf' && selectedBook && selectedBook.pdfUrl && (
                    <div style={{ height: '80vh', background: 'white', borderRadius: 12, overflow: 'hidden' }}>
                        <PdfReader
                            fileUrl={selectedBook.pdfUrl}
                            title={lang === 'vi' ? selectedBook.titleVi : selectedBook.title}
                            onClose={goBack}
                        />
                    </div>
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
                            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.65rem' }}>
                                <span className="badge" style={{
                                    background: `${LICENSE_STATUS_LABELS[selectedBook.licenseStatus].tone}14`,
                                    color: LICENSE_STATUS_LABELS[selectedBook.licenseStatus].tone,
                                    fontSize: '0.68rem',
                                }}>
                                    {lang === 'vi' ? LICENSE_STATUS_LABELS[selectedBook.licenseStatus].vi : LICENSE_STATUS_LABELS[selectedBook.licenseStatus].en}
                                </span>
                                <span className="badge" style={{ background: 'rgba(15,23,42,0.05)', color: 'var(--color-text-secondary)', fontSize: '0.68rem' }}>
                                    {lang === 'vi' ? COVERAGE_STATUS_LABELS[selectedBook.coverageStatus].vi : COVERAGE_STATUS_LABELS[selectedBook.coverageStatus].en}
                                </span>
                            </div>
                            <div style={{ marginTop: '0.6rem', fontSize: '0.72rem', color: 'var(--color-text-muted)', lineHeight: 1.45 }}>
                                <div>📖 {selectedBook.sourceNote}</div>
                                <div>🔎 {selectedBook.licenseNote}</div>
                                {selectedBook.officialSourceUrl && (
                                    <a href={selectedBook.officialSourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 800, textDecoration: 'none' }}>
                                        {lang === 'vi' ? 'Mở nguồn chính thức' : 'Open official source'}
                                    </a>
                                )}
                            </div>
                        </div>
                        
                        {/* PDF View Action */}
                        {selectedBook.pdfUrl && (
                            <button
                                className="btn btn-primary"
                                style={{ width: '100%', marginBottom: '0.5rem', padding: '0.85rem' }}
                                onClick={() => setViewMode('pdf')}
                            >
                                <BookOpen size={18} />
                                {lang === 'vi' ? 'Đọc toàn văn SGK (PDF Interactive)' : 'Read full textbook (PDF Interactive)'}
                            </button>
                        )}

                        {/* Official E-Book Reader — embedded directly */}
                        {selectedBook.officialReaderUrl && (
                            <button
                                className="btn"
                                style={{
                                    width: '100%',
                                    marginBottom: '1rem',
                                    padding: '0.85rem',
                                    background: 'linear-gradient(135deg, #16a34a, #15803d)',
                                    color: '#fff',
                                    fontWeight: 800,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    borderRadius: '12px',
                                    border: 'none',
                                    fontSize: '0.92rem',
                                    cursor: 'pointer',
                                }}
                                onClick={() => setViewMode('ebook')}
                            >
                                <GraduationCap size={18} />
                                {lang === 'vi' ? 'Đọc sách điện tử chính thức (NXB Giáo dục)' : 'Read official e-book (NXB Giáo dục)'}
                            </button>
                        )}

                        {/* Passage list */}
                        <h2 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.75rem' }}>
                            {lang === 'vi' ? 'Bài đọc' : 'Passages'}
                        </h2>
                        {selectedBook.passages.length > 0 ? (
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
                        ) : (
                            <div className="card" style={{ border: '1px solid rgba(220,38,38,0.18)', background: 'rgba(220,38,38,0.04)' }}>
                                <div style={{ fontWeight: 900, color: '#dc2626', marginBottom: '0.35rem' }}>
                                    {lang === 'vi' ? 'Chưa mở toàn văn trong app' : 'Full text is not bundled'}
                                </div>
                                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.84rem', lineHeight: 1.55 }}>
                                    {selectedBook.importHint ?? (lang === 'vi'
                                        ? 'Cần file PDF/EPUB có quyền sử dụng hoặc tài khoản chính thức trước khi mở trong reader.'
                                        : 'A licensed PDF/EPUB file or official account is required before opening it in the reader.')}
                                </p>
                            </div>
                        )}
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
                                sentenceGuides={selectedPassage.sentenceGuides}
                                support={selectedPassage.support}
                                comprehensionChecks={selectedPassage.comprehensionChecks}
                                sourceAlignment={selectedPassage.sourceAlignment}
                                sourceNote={selectedBook.sourceNote}
                                licenseNote={selectedBook.licenseNote}
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
