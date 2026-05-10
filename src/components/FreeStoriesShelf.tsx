'use client';

// ========================================
// Free Stories Shelf — StoryWeaver CC-BY 4.0
// Benchmark: Epic! "Read to Me" free library
// ========================================

import React, { useMemo, useState } from 'react';
import { BookOpen, Globe, ExternalLink } from 'lucide-react';

interface FreeStoriesShelfProps {
    lang: string;
}

const READING_LEVELS = [
    { value: '1', label: 'Level 1 — Dễ', emoji: '🌟' },
    { value: '2', label: 'Level 2 — Cơ bản', emoji: '🌱' },
    { value: '3', label: 'Level 3 — Trung bình', emoji: '🚀' },
    { value: '4', label: 'Level 4 — Nâng cao', emoji: '🏆' },
];

type CuratedStory = {
    id: string;
    title: string;
    language: 'English' | 'Vietnamese';
    level: '1' | '2' | '3' | '4';
    synopsis: string;
    authors: string[];
    readUrl: string;
};

const CURATED_STORY_LINKS: CuratedStory[] = [
    {
        id: 'storyweaver-en-l1',
        title: 'StoryWeaver Level 1 stories',
        language: 'English',
        level: '1',
        synopsis: 'Short illustrated stories for early readers. Open on StoryWeaver when the child wants a fresh free story.',
        authors: ['Pratham Books / StoryWeaver'],
        readUrl: 'https://storyweaver.org.in/en/stories?level=1&language=English',
    },
    {
        id: 'storyweaver-en-l2',
        title: 'StoryWeaver Level 2 stories',
        language: 'English',
        level: '2',
        synopsis: 'Simple English stories with more sentences per page for daily reading practice.',
        authors: ['Pratham Books / StoryWeaver'],
        readUrl: 'https://storyweaver.org.in/en/stories?level=2&language=English',
    },
    {
        id: 'storyweaver-en-l3',
        title: 'StoryWeaver Level 3 stories',
        language: 'English',
        level: '3',
        synopsis: 'Longer stories for vocabulary, retelling, and parent-child discussion.',
        authors: ['Pratham Books / StoryWeaver'],
        readUrl: 'https://storyweaver.org.in/en/stories?level=3&language=English',
    },
    {
        id: 'storyweaver-en-l4',
        title: 'StoryWeaver Level 4 stories',
        language: 'English',
        level: '4',
        synopsis: 'Chapter-style free reading links for confident readers.',
        authors: ['Pratham Books / StoryWeaver'],
        readUrl: 'https://storyweaver.org.in/en/stories?level=4&language=English',
    },
    {
        id: 'storyweaver-vi-l1',
        title: 'Truyện tiếng Việt Level 1',
        language: 'Vietnamese',
        level: '1',
        synopsis: 'Truyện ngắn minh họa cho trẻ mới đọc, mở trực tiếp trên StoryWeaver.',
        authors: ['Pratham Books / StoryWeaver'],
        readUrl: 'https://storyweaver.org.in/en/stories?level=1&language=Vietnamese',
    },
    {
        id: 'storyweaver-vi-l2',
        title: 'Truyện tiếng Việt Level 2',
        language: 'Vietnamese',
        level: '2',
        synopsis: 'Truyện tiếng Việt đơn giản để luyện đọc thành tiếng và kể lại.',
        authors: ['Pratham Books / StoryWeaver'],
        readUrl: 'https://storyweaver.org.in/en/stories?level=2&language=Vietnamese',
    },
    {
        id: 'storyweaver-vi-l3',
        title: 'Truyện tiếng Việt Level 3',
        language: 'Vietnamese',
        level: '3',
        synopsis: 'Truyện dài hơn để luyện hiểu ý chính, nhân vật và bằng chứng trong câu.',
        authors: ['Pratham Books / StoryWeaver'],
        readUrl: 'https://storyweaver.org.in/en/stories?level=3&language=Vietnamese',
    },
    {
        id: 'storyweaver-vi-l4',
        title: 'Truyện tiếng Việt Level 4',
        language: 'Vietnamese',
        level: '4',
        synopsis: 'Nguồn đọc mở rộng cho trẻ đã đọc tốt, dùng như thư viện ngoài app.',
        authors: ['Pratham Books / StoryWeaver'],
        readUrl: 'https://storyweaver.org.in/en/stories?level=4&language=Vietnamese',
    },
];

function StoryCard({ story }: { story: CuratedStory }) {
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
                background: 'linear-gradient(135deg, #ddd6fe, #c4b5fd)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.2rem',
            }}>
                📖
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
                <p style={{
                    fontSize: '0.58rem',
                    color: '#64748b',
                    lineHeight: 1.35,
                    margin: '0 0 0.3rem',
                    minHeight: 32,
                }}>
                    {story.synopsis}
                </p>
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
    const [selectedLang, setSelectedLang] = useState<'English' | 'Vietnamese'>('English');
    const [selectedLevel, setSelectedLevel] = useState<string>('1');

    const stories = useMemo(() => CURATED_STORY_LINKS.filter((story) =>
        story.language === selectedLang && story.level === selectedLevel
    ), [selectedLang, selectedLevel]);

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
                            ? 'Pratham Books / StoryWeaver • CC-BY 4.0 • link tĩnh không auto-fetch'
                            : 'Pratham Books / StoryWeaver • CC-BY 4.0 • static links, no auto-fetch'}
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
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: '0.75rem',
                }}>
                    {stories.map(story => (
                        <StoryCard key={story.id} story={story} />
                    ))}
                </div>

                {/* Attribution */}
                <div style={{
                    marginTop: '0.75rem',
                    fontSize: '0.58rem',
                    color: '#94a3b8',
                    lineHeight: 1.5,
                }}>
                    📋 {lang === 'vi'
                        ? 'StoryWeaver không được auto-fetch trên GitHub Pages để tránh CORS/lag; các thẻ này là link tĩnh tới nguồn CC-BY 4.0.'
                        : 'StoryWeaver is not auto-fetched on GitHub Pages to avoid CORS/lag; these are static links to the CC-BY 4.0 source.'}
                </div>
            </div>
        </div>
    );
}
