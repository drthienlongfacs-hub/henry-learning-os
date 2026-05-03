'use client';

import { useState } from 'react';
import { useAppStore } from '@/stores/app-store';
import { useTranslation } from '@/lib/i18n';
import { LangToggle } from '@/components/LangToggle';
import { generateId, formatDate } from '@/lib/utils';
import Link from 'next/link';
import { ArrowLeft, Plus, BookOpen, Home, RotateCcw, Brain, Sparkles } from 'lucide-react';
import ReadingQuiz from '@/components/ReadingQuiz';
import PhonicsLab from '@/components/PhonicsLab';
import VocabReview from '@/components/VocabReview';
import ReadingProgressDashboard from '@/components/ReadingProgressDashboard';
import WikiExplorer from '@/components/WikiExplorer';
import ParentCoLearning from '@/components/ParentCoLearning';

export default function ReadingPage() {
    const { readingEntries, addReadingEntry, childProfile } = useAppStore();
    const { t, lang } = useTranslation();
    const [showForm, setShowForm] = useState(false);
    const [bookTitle, setBookTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [pagesRead, setPagesRead] = useState('');
    const [minutesRead, setMinutesRead] = useState('');
    const [summary, setSummary] = useState('');
    const [newWords, setNewWords] = useState('');

    const handleSubmit = () => {
        if (!bookTitle.trim() || !childProfile) return;
        addReadingEntry({
            id: generateId(),
            childId: childProfile.id,
            bookTitle: bookTitle.trim(),
            author: author.trim(),
            pagesRead: parseInt(pagesRead) || 0,
            minutesRead: parseInt(minutesRead) || 0,
            childSummary: summary.trim(),
            newWords: newWords.split(',').map((w) => w.trim()).filter(Boolean),
            parentNote: '',
            createdAt: new Date().toISOString(),
        });
        setShowForm(false);
        setBookTitle(''); setAuthor(''); setPagesRead(''); setMinutesRead(''); setSummary(''); setNewWords('');
    };

    return (
        <div style={{ paddingBottom: '5rem', background: 'var(--color-bg-child)', minHeight: '100dvh' }}>
            <div className="page-container">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Link href="/child"><button className="btn btn-ghost btn-sm"><ArrowLeft size={18} /></button></Link>
                        <h1 style={{ fontWeight: 800, fontSize: '1.5rem' }}>{t('reading_title')}</h1>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <LangToggle />
                        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)}>
                            <Plus size={16} /> {t('reading_add')}
                        </button>
                    </div>
                </div>

                {showForm && (
                    <div className="card animate-fade-in" style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ fontWeight: 700, marginBottom: '1rem' }}>{t('reading_form_title')}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <input className="input-field" placeholder={t('reading_book_name')} value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} />
                            <input className="input-field" placeholder={t('reading_author')} value={author} onChange={(e) => setAuthor(e.target.value)} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                <input className="input-field" type="number" placeholder={t('reading_pages')} value={pagesRead} onChange={(e) => setPagesRead(e.target.value)} />
                                <input className="input-field" type="number" placeholder={t('reading_minutes')} value={minutesRead} onChange={(e) => setMinutesRead(e.target.value)} />
                            </div>
                            <textarea className="textarea-field" placeholder={t('reading_summary')} value={summary} onChange={(e) => setSummary(e.target.value)} />
                            <input className="input-field" placeholder={t('reading_new_words')} value={newWords} onChange={(e) => setNewWords(e.target.value)} />
                            <button className="btn btn-primary" onClick={handleSubmit} disabled={!bookTitle.trim()}>{t('reading_save')}</button>
                        </div>
                    </div>
                )}

                {readingEntries.length === 0 && !showForm && (
                    <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📚</div>
                        <p style={{ fontWeight: 600 }}>{t('reading_empty_title')}</p>
                        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{t('reading_empty_sub')}</p>
                    </div>
                )}

                {/* ===== NEW MODULES: Full-stack learning experience ===== */}
                <ReadingProgressDashboard lang={lang} />
                <ReadingQuiz lang={lang} />
                <PhonicsLab lang={lang} />
                <VocabReview lang={lang} />
                <WikiExplorer lang={lang} />
                <ParentCoLearning lang={lang} />

                {readingEntries.slice().reverse().map((entry, idx) => (
                    <div key={entry.id} className="card animate-fade-in" style={{ marginBottom: '0.75rem', animationDelay: `${idx * 0.05}s` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                            <div>
                                <div style={{ fontWeight: 700 }}>{entry.bookTitle}</div>
                                {entry.author && <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{entry.author}</div>}
                            </div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{formatDate(entry.createdAt)}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                            {entry.pagesRead > 0 && <span>📄 {entry.pagesRead} {t('reading_pages_unit')}</span>}
                            {entry.minutesRead > 0 && <span>⏱ {entry.minutesRead} {t('reading_minutes_unit')}</span>}
                        </div>
                        {entry.childSummary && <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>{entry.childSummary}</p>}
                        {entry.newWords.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                                {entry.newWords.map((w) => <span key={w} className="badge badge-primary">{w}</span>)}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <nav className="bottom-nav">
                <Link href="/child" className="nav-item"><Home size={20} /><span>{t('nav_home')}</span></Link>
                <Link href="/child/elite" className="nav-item"><Sparkles size={20} /><span>{t('nav_elite')}</span></Link>
                <Link href="/child/review" className="nav-item"><RotateCcw size={20} /><span>{t('nav_review')}</span></Link>
                <Link href="/child/mistakes" className="nav-item"><Brain size={20} /><span>{t('nav_mistakes')}</span></Link>
                <Link href="/child/reading" className="nav-item active"><BookOpen size={20} /><span>{t('nav_reading')}</span></Link>
            </nav>
        </div>
    );
}
