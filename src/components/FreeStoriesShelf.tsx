'use client';

// ========================================
// Free Stories Shelf — StoryWeaver CC-BY 4.0
// Benchmark: Epic! "Read to Me" free library
// ========================================

import React, { useState, useEffect } from 'react';
import { BookOpen, Globe, ExternalLink, RefreshCw } from 'lucide-react';
import { searchStoryWeaver, type StoryWeaverBook } from '@/lib/resources/adapters/storyweaver-adapter';

interface FreeStoriesShelfProps {
    lang: string;
}

const READING_LEVELS = [
    { value: '1', label: 'Level 1 — Dễ', emoji: '🌟' },
    { value: '2', label: 'Level 2 — Cơ bản', emoji: '🌱' },
    { value: '3', label: 'Level 3 — Trung bình', emoji: '🚀' },
    { value: '4', label: 'Level 4 — Nâng cao', emoji: '🏆' },
];

function StoryCard({ story }: { story: StoryWeaverBook }) {
    const [hovered, setHovered] = useState(false);

    return (
        <a
            href={story.readUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.06)',
                background: '#fff',
                transition: 'all 0.2s ease',
                transform: hovered ? 'translateY(-3px)' : 'none',
                boxShadow: hovered
                    ? '0 8px 24px rgba(99,102,241,0.12)'
                    : '0 2px 8px rgba(0,0,0,0.04)',
                cursor: 'pointer',
            }}
        >
            {/* Cover Image */}
            <div style={{
                width: '100%',
                aspectRatio: '4/3',
                background: story.coverUrl
                    ? `url(${story.coverUrl}) center/cover`
                    : 'linear-gradient(135deg, #ddd6fe, #c4b5fd)',
                position: 'relative',
            }}>
                {/* Level badge */}
                <span style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    background: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    fontSize: '0.55rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '8px',
                    backdropFilter: 'blur(4px)',
                }}>
                    Lv.{story.level}
                </span>
                {/* CC-BY badge */}
                <span style={{
                    position: 'absolute',
                    bottom: '6px',
                    left: '6px',
                    background: 'rgba(16,185,129,0.85)',
                    color: '#fff',
                    fontSize: '0.48rem',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '6px',
                }}>
                    CC-BY 4.0 FREE
                </span>
            </div>

            {/* Info */}
            <div style={{ padding: '0.6rem 0.7rem' }}>
                <div style={{
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    color: '#1e293b',
                    lineHeight: 1.3,
                    marginBottom: '0.25rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                }}>
                    {story.title}
                </div>
                {story.authors.length > 0 && (
                    <div style={{ fontSize: '0.58rem', color: '#64748b', marginBottom: '0.2rem' }}>
                        {story.authors.slice(0, 2).join(', ')}
                    </div>
                )}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    fontSize: '0.55rem', color: '#6366f1', fontWeight: 600,
                }}>
                    <ExternalLink size={10} />
                    {story.language === 'Vietnamese' ? 'Đọc miễn phí' : 'Read free'}
                </div>
            </div>
        </a>
    );
}

export default function FreeStoriesShelf({ lang }: FreeStoriesShelfProps) {
    const [stories, setStories] = useState<StoryWeaverBook[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedLang, setSelectedLang] = useState<'English' | 'Vietnamese'>('English');
    const [selectedLevel, setSelectedLevel] = useState<string>('1');
    const [error, setError] = useState('');

    const fetchStories = async () => {
        setLoading(true);
        setError('');
        try {
            const result = await searchStoryWeaver({
                language: selectedLang,
                level: selectedLevel as '1' | '2' | '3' | '4',
                limit: 8,
            });
            setStories(result);
            if (result.length === 0) setError(lang === 'vi' ? 'Không tìm thấy truyện' : 'No stories found');
        } catch {
            setError(lang === 'vi' ? 'Lỗi kết nối' : 'Connection error');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchStories();
    }, [selectedLang, selectedLevel]);

    return (
        <div style={{
            marginBottom: '1.5rem',
            background: 'var(--color-surface, #fff)',
            borderRadius: '20px',
            border: '1px solid rgba(0,0,0,0.06)',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                padding: '1.25rem 1.5rem',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', top: '-15px', right: '-15px',
                    width: '90px', height: '90px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                        <BookOpen size={20} color="#fff" />
                        <h2 style={{ fontWeight: 800, fontSize: '1.05rem', margin: 0, color: '#fff' }}>
                            {lang === 'vi' ? '📖 Truyện Miễn Phí — Đọc Ngay' : '📖 Free Stories — Read Now'}
                        </h2>
                    </div>
                    <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                        {lang === 'vi'
                            ? 'Pratham Books / StoryWeaver • CC-BY 4.0 • Tiếng Anh & Tiếng Việt'
                            : 'Pratham Books / StoryWeaver • CC-BY 4.0 • English & Vietnamese'}
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div style={{ padding: '1rem 1.5rem 0' }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                    {/* Language toggle */}
                    {(['English', 'Vietnamese'] as const).map(l => (
                        <button
                            key={l}
                            onClick={() => setSelectedLang(l)}
                            style={{
                                padding: '5px 14px',
                                borderRadius: '20px',
                                border: selectedLang === l ? '2px solid #6366f1' : '1px solid #e2e8f0',
                                background: selectedLang === l ? '#eef2ff' : '#f8fafc',
                                color: selectedLang === l ? '#4f46e5' : '#64748b',
                                fontWeight: 700,
                                fontSize: '0.7rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                            }}
                        >
                            <Globe size={12} />
                            {l === 'English' ? '🇬🇧 English' : '🇻🇳 Tiếng Việt'}
                        </button>
                    ))}
                    {/* Level pills */}
                    {READING_LEVELS.map(lv => (
                        <button
                            key={lv.value}
                            onClick={() => setSelectedLevel(lv.value)}
                            style={{
                                padding: '5px 10px',
                                borderRadius: '20px',
                                border: selectedLevel === lv.value ? '2px solid #8b5cf6' : '1px solid #e2e8f0',
                                background: selectedLevel === lv.value ? '#f5f3ff' : '#f8fafc',
                                color: selectedLevel === lv.value ? '#7c3aed' : '#64748b',
                                fontWeight: 600,
                                fontSize: '0.65rem',
                                cursor: 'pointer',
                            }}
                        >
                            {lv.emoji} {lv.value}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stories Grid */}
            <div style={{ padding: '0 1.5rem 1.5rem' }}>
                {loading ? (
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: '0.5rem', padding: '2rem', color: '#94a3b8',
                    }}>
                        <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                        <span style={{ fontSize: '0.8rem' }}>{lang === 'vi' ? 'Đang tải...' : 'Loading...'}</span>
                    </div>
                ) : error ? (
                    <div style={{ textAlign: 'center', padding: '1.5rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                        {error}
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                        gap: '0.75rem',
                    }}>
                        {stories.map(story => (
                            <StoryCard key={story.id} story={story} />
                        ))}
                    </div>
                )}

                {/* Attribution */}
                <div style={{
                    marginTop: '0.75rem',
                    fontSize: '0.58rem',
                    color: '#94a3b8',
                    lineHeight: 1.5,
                }}>
                    📋 {lang === 'vi'
                        ? 'Truyện từ StoryWeaver (storyweaver.org.in) — Pratham Books. Giấy phép CC-BY 4.0. Đọc miễn phí, chia sẻ tự do.'
                        : 'Stories from StoryWeaver (storyweaver.org.in) — Pratham Books. CC-BY 4.0 License. Free to read and share.'}
                </div>
            </div>

            <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
        </div>
    );
}
