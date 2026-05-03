'use client';

// ========================================
// Book Discovery — Search Open Library & Gutenberg
// Pipeline: API → Adapter → SafetyGate → UI + Attribution
// ========================================

import { useState, useCallback } from 'react';
import { useTranslation } from '@/lib/i18n';
import { LangToggle } from '@/components/LangToggle';
import { ResourceAttribution } from '@/components/ResourceAttribution';
import Link from 'next/link';
import { ArrowLeft, Search, BookOpen, Home, RotateCcw, Brain, Sparkles, ExternalLink, Loader2 } from 'lucide-react';
import type { NormalizedLearningResource } from '@/types/resource-types';

export default function DiscoverPage() {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<NormalizedLearningResource[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [activeSource, setActiveSource] = useState<'open-library' | 'gutendex' | 'storyweaver'>('open-library');

    const searchBooks = useCallback(async () => {
        if (!query.trim()) return;
        setLoading(true);
        setSearched(true);

        try {
            if (activeSource === 'open-library') {
                const { openLibraryAdapter } = await import('@/lib/resources/adapters/open-library-adapter');
                const res = await openLibraryAdapter.fetchMetadata({ query: query.trim(), limit: 12 });
                setResults(res);
            } else {
                if (activeSource === 'storyweaver') {
                    const { storyWeaverAdapter } = await import('@/lib/resources/adapters/storyweaver-adapter');
                    const res = await storyWeaverAdapter.fetchMetadata({ query: query.trim(), ageBand: '6-8', limit: 12 });
                    setResults(res);
                    return;
                }
                const { gutendexAdapter } = await import('@/lib/resources/adapters/gutendex-adapter');
                const res = await gutendexAdapter.fetchMetadata({ query: query.trim(), limit: 12 });
                setResults(res);
            }
        } catch (err) {
            console.error('Search failed:', err);
            setResults([]);
        } finally {
            setLoading(false);
        }
    }, [query, activeSource]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') searchBooks();
    };

    return (
        <div style={{ paddingBottom: '5rem', background: 'var(--color-bg-child)', minHeight: '100dvh' }}>
            <div className="page-container">
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Link href="/child"><button className="btn btn-ghost btn-sm"><ArrowLeft size={18} /></button></Link>
                        <h1 style={{ fontWeight: 800, fontSize: '1.5rem' }}>
                            {t('discover_title') || 'Discover Books'}
                        </h1>
                    </div>
                    <LangToggle />
                </div>

                {/* Search bar */}
                <div className="card" style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        <input
                            className="input-field"
                            placeholder={t('discover_search_placeholder') || 'Search for books...'}
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            style={{ flex: 1 }}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={searchBooks}
                            disabled={loading || !query.trim()}
                        >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                        </button>
                    </div>
                    {/* Source toggle */}
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            className={`btn btn-sm ${activeSource === 'open-library' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setActiveSource('open-library')}
                        >
                            Open Library
                        </button>
                        <button
                            className={`btn btn-sm ${activeSource === 'gutendex' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setActiveSource('gutendex')}
                        >
                            Project Gutenberg
                        </button>
                        <button
                            className={`btn btn-sm ${activeSource === 'storyweaver' ? 'btn-primary' : 'btn-ghost'}`}
                            onClick={() => setActiveSource('storyweaver')}
                        >
                            StoryWeaver
                        </button>
                    </div>
                </div>

                {/* Results */}
                {loading && (
                    <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                        <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 0.75rem', color: 'var(--color-primary)' }} />
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            {t('discover_searching') || 'Searching...'}
                        </p>
                    </div>
                )}

                {!loading && searched && results.length === 0 && (
                    <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔍</div>
                        <p style={{ fontWeight: 600 }}>
                            {t('discover_no_results') || 'No books found'}
                        </p>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                            {t('discover_try_another') || 'Try a different search term'}
                        </p>
                    </div>
                )}

                {!loading && results.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
                        {results.map((book, idx) => (
                            <div
                                key={book.id}
                                className="card animate-fade-in"
                                style={{ animationDelay: `${idx * 0.04}s`, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <h3 style={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.3, flex: 1 }}>
                                        {book.title}
                                    </h3>
                                    {book.contentUrl && (
                                        <a
                                            href={book.contentUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-ghost btn-sm"
                                            style={{ flexShrink: 0, marginLeft: '0.5rem' }}
                                        >
                                            <ExternalLink size={14} />
                                        </a>
                                    )}
                                </div>

                                {book.description && (
                                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                                        {book.description}
                                    </p>
                                )}

                                {book.subjectTags.length > 0 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                                        {book.subjectTags.slice(0, 3).map(tag => (
                                            <span key={tag} className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {book.language && (
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                        Language: {book.language.toUpperCase()}
                                    </span>
                                )}

                                <ResourceAttribution attribution={book.attribution} compact />
                            </div>
                        ))}
                    </div>
                )}

                {!searched && !loading && (
                    <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📖</div>
                        <p style={{ fontWeight: 600 }}>
                            {t('discover_welcome') || 'Find your next adventure'}
                        </p>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                            {t('discover_welcome_sub') || 'Search millions of books from Open Library and Project Gutenberg'}
                        </p>
                    </div>
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
