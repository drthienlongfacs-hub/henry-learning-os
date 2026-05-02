'use client';

import React, { useState, useMemo } from 'react';
import { SGK_CATALOG, SGK_SUBJECTS, type SGKBook } from '@/data/sgk-catalog';
import { GraduationCap } from 'lucide-react';

const GRADES = [1, 2, 3, 4, 5];

interface SGKBookshelfProps {
    lang: string;
}

function BookCard({ book, lang }: { book: SGKBook; lang: string }) {
    const [hovered, setHovered] = useState(false);

    return (
        <a
            href={book.ebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                transform: hovered ? 'translateY(-4px) scale(1.03)' : 'none',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            title={`${book.title} — Đọc trên Hành trang số (NXB Giáo dục VN)`}
        >
            {/* Book Cover */}
            <div
                style={{
                    width: '100%',
                    aspectRatio: '3/4',
                    borderRadius: '12px',
                    background: `linear-gradient(145deg, ${book.coverColor}22, ${book.coverColor}44)`,
                    border: `2px solid ${book.coverColor}55`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    padding: '0.75rem 0.5rem',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: hovered
                        ? `0 8px 24px ${book.coverColor}33`
                        : `0 2px 8px ${book.coverColor}15`,
                    transition: 'box-shadow 0.2s ease',
                }}
            >
                {/* NXB badge */}
                <div style={{
                    position: 'absolute',
                    top: '6px',
                    left: '6px',
                    right: '6px',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <span style={{
                        fontSize: '0.52rem',
                        fontWeight: 700,
                        color: book.coverColor,
                        background: `${book.coverColor}15`,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.03em',
                        whiteSpace: 'nowrap',
                    }}>
                        NXB Giáo dục VN
                    </span>
                </div>
                {/* Big Emoji */}
                <span style={{
                    fontSize: '2.2rem',
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                    marginTop: '0.5rem',
                }}>
                    {book.coverEmoji}
                </span>
                {/* Title */}
                <div style={{
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    color: book.coverColor,
                    textAlign: 'center',
                    lineHeight: 1.25,
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                }}>
                    {book.subjectLabel}
                </div>
                {/* Grade + Volume */}
                <div style={{
                    fontWeight: 800,
                    fontSize: '1.6rem',
                    color: book.coverColor,
                    lineHeight: 1,
                }}>
                    {book.grade}
                </div>
                {book.volume && (
                    <span style={{
                        fontSize: '0.62rem',
                        fontWeight: 600,
                        color: `${book.coverColor}aa`,
                        background: `${book.coverColor}10`,
                        padding: '1px 8px',
                        borderRadius: '4px',
                    }}>
                        {book.volume.toLowerCase()}
                    </span>
                )}
            </div>
            {/* Label below card */}
            <span style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                color: 'var(--color-text-secondary, #64748b)',
                textAlign: 'center',
                marginTop: '0.35rem',
                lineHeight: 1.3,
                maxWidth: '100%',
            }}>
                {book.title}
            </span>
        </a>
    );
}

export default function SGKBookshelf({ lang }: SGKBookshelfProps) {
    const [selectedGrade, setSelectedGrade] = useState(1);
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

    const filteredBooks = useMemo(() => {
        let books = SGK_CATALOG.filter(b => b.grade === selectedGrade);
        if (selectedSubject) {
            books = books.filter(b => b.subject === selectedSubject);
        }
        return books;
    }, [selectedGrade, selectedSubject]);

    // Available subjects for current grade
    const availableSubjects = useMemo(() => {
        const subjects = new Set(SGK_CATALOG.filter(b => b.grade === selectedGrade).map(b => b.subject));
        return SGK_SUBJECTS.filter(s => subjects.has(s.id));
    }, [selectedGrade]);

    return (
        <div style={{ marginBottom: '1.5rem' }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #4338ca, #6d28d9)',
                borderRadius: '16px',
                padding: '1.25rem 1.5rem',
                marginBottom: '1.25rem',
                color: '#fff',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <GraduationCap size={22} />
                    <h2 style={{ fontWeight: 800, fontSize: '1.1rem', margin: 0 }}>
                        {lang === 'vi' ? 'Bộ SGK Thống Nhất — CTGDPT 2018' : 'Unified Textbooks — CTGDPT 2018'}
                    </h2>
                </div>
                <p style={{ fontSize: '0.75rem', opacity: 0.85, margin: 0, lineHeight: 1.4 }}>
                    {lang === 'vi'
                        ? 'Sách điện tử chính thức từ NXB Giáo dục Việt Nam. Nhấn vào sách để đọc trực tiếp trên Hành trang số (hanhtrangso.nxbgd.vn).'
                        : 'Official e-textbooks from Vietnam Education Publishing House. Tap any book to read on Hành trang số.'}
                </p>
            </div>

            {/* Grade Tabs */}
            <div style={{ marginBottom: '1rem' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.75rem',
                    flexWrap: 'wrap',
                }}>
                    <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--color-text, #1e293b)' }}>
                        {lang === 'vi' ? 'Lớp' : 'Grade'}
                    </span>
                    {GRADES.map(g => (
                        <button
                            key={g}
                            onClick={() => {
                                setSelectedGrade(g);
                                setSelectedSubject(null);
                            }}
                            style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '50%',
                                border: selectedGrade === g ? '2px solid #4f46e5' : '2px solid #e2e8f0',
                                background: selectedGrade === g
                                    ? 'linear-gradient(135deg, #4f46e5, #6d28d9)'
                                    : '#fff',
                                color: selectedGrade === g ? '#fff' : '#64748b',
                                fontWeight: 800,
                                fontSize: '0.92rem',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {g}
                        </button>
                    ))}
                </div>
            </div>

            {/* Subject Filter */}
            <div style={{
                display: 'flex',
                gap: '0.35rem',
                marginBottom: '1rem',
                flexWrap: 'wrap',
            }}>
                <button
                    onClick={() => setSelectedSubject(null)}
                    style={{
                        padding: '4px 12px',
                        borderRadius: '8px',
                        border: selectedSubject === null ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                        background: selectedSubject === null ? '#eef2ff' : '#fff',
                        color: selectedSubject === null ? '#4f46e5' : '#64748b',
                        fontWeight: 600,
                        fontSize: '0.72rem',
                        cursor: 'pointer',
                    }}
                >
                    {lang === 'vi' ? 'Tất cả' : 'All'}
                </button>
                {availableSubjects.map(s => (
                    <button
                        key={s.id}
                        onClick={() => setSelectedSubject(s.id)}
                        style={{
                            padding: '4px 10px',
                            borderRadius: '8px',
                            border: selectedSubject === s.id ? `2px solid ${s.color}` : '1px solid #e2e8f0',
                            background: selectedSubject === s.id ? `${s.color}15` : '#fff',
                            color: selectedSubject === s.id ? s.color : '#64748b',
                            fontWeight: 600,
                            fontSize: '0.72rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                        }}
                    >
                        <span>{s.emoji}</span> {s.label}
                    </button>
                ))}
            </div>

            {/* Book Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(105px, 1fr))',
                gap: '1rem',
                padding: '0.25rem',
            }}>
                {filteredBooks.map(book => (
                    <BookCard key={book.id} book={book} lang={lang} />
                ))}
            </div>

            {/* Count + Attribution */}
            <div style={{
                marginTop: '1rem',
                padding: '10px 14px',
                borderRadius: '10px',
                background: '#f0fdf4',
                fontSize: '0.68rem',
                color: '#15803d',
                lineHeight: 1.5,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
            }}>
                <div style={{ fontWeight: 700 }}>
                    📚 {filteredBooks.length} {lang === 'vi' ? 'cuốn sách' : 'books'} — Lớp {selectedGrade}
                    {selectedSubject ? ` (${availableSubjects.find(s => s.id === selectedSubject)?.label})` : ''}
                </div>
                <div>
                    {lang === 'vi'
                        ? '📋 Nội dung sách thuộc bản quyền NXB Giáo dục Việt Nam. Hiển thị từ hanhtrangso.nxbgd.vn phục vụ học tập cá nhân/gia đình theo Luật SHTT Điều 25 Khoản 1a.'
                        : '📋 Content copyrighted by Vietnam Education Publishing House. For personal/family educational use under IP Law Art. 25§1a.'}
                </div>
            </div>
        </div>
    );
}
