'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, BookOpen, RotateCcw, Brain, Trophy, ChevronRight, ArrowLeft, BookMarked, ChevronDown } from 'lucide-react';
import { LangToggle } from '@/components/LangToggle';
import { useTranslation } from '@/lib/i18n';
import { YEAR1_CURRICULUM, YEAR1_STATS, type CurriculumUnit, type CurriculumTopic } from '@/data/year1-integrated-curriculum';
import { Year1LessonModal } from '@/components/Year1LessonModal';
import { YEAR1_INTERACTIVE } from '@/data/year1-interactive-content';
import { CROSS_DOMAIN_LINKS } from '@/data/year1-cross-domain-links';

/* ─── Base path for assets ─── */
const BASE = process.env.NODE_ENV === 'production' ? '/henry-learning-os' : '';

/* ─── Book definitions ─── */
const BOOKS = [
  { id: 'macmillan', name: 'Macmillan English 1', subject: 'english' as const, cover: `${BASE}/year1-assets/english-cover.png`, color: '#3b82f6', gradient: 'linear-gradient(135deg,#3b82f6,#60a5fa)', desc: 'Fluency + Language + Practice', bookKey: 'Macmillan English 1' },
  { id: 'abacus1', name: 'Abacus Math — WB 1', subject: 'math' as const, cover: `${BASE}/year1-assets/math-cover.png`, color: '#f59e0b', gradient: 'linear-gradient(135deg,#f59e0b,#fbbf24)', desc: 'Counting & Place Value', bookKey: 'Abacus Workbook 1' },
  { id: 'abacus2', name: 'Abacus Math — WB 2', subject: 'math' as const, cover: `${BASE}/year1-assets/math-cover.png`, color: '#f97316', gradient: 'linear-gradient(135deg,#f97316,#fb923c)', desc: 'Addition & Subtraction', bookKey: 'Abacus Workbook 2' },
  { id: 'abacus3', name: 'Abacus Math — WB 3', subject: 'math' as const, cover: `${BASE}/year1-assets/math-cover.png`, color: '#ef4444', gradient: 'linear-gradient(135deg,#ef4444,#f87171)', desc: 'Measurement & Data', bookKey: 'Abacus Workbook 3' },
  { id: 'sciencebug', name: 'Science Bug Year 1', subject: 'science' as const, cover: `${BASE}/year1-assets/science-cover.png`, color: '#22c55e', gradient: 'linear-gradient(135deg,#22c55e,#4ade80)', desc: 'Pupil Book', bookKey: 'Science Bug Year 1' },
];

const SUB_META: Record<string, { emoji: string; color: string; label: string }> = {
  english: { emoji: '📖', color: '#3b82f6', label: 'Tiếng Anh' },
  math:    { emoji: '🔢', color: '#f59e0b', label: 'Toán' },
  science: { emoji: '🔬', color: '#22c55e', label: 'Khoa học' },
};

export default function Year1Page() {
  const { t: _t, lang: _lang } = useTranslation();
  const [activeBook, setActiveBook] = useState<string | null>(null);
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('y1_progress');
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    }
    return new Set<string>();
  });
  const [activeTopic, setActiveTopic] = useState<{topic: CurriculumTopic; color: string} | null>(null);

  const markComplete = (topicId: string) => {
    setCompletedTopics(prev => {
      const next = new Set(prev);
      next.add(topicId);
      if (typeof window !== 'undefined') localStorage.setItem('y1_progress', JSON.stringify([...next]));
      return next;
    });
  };

  // Get units for a specific book
  const getBookUnits = (bookKey: string, subject: string) => {
    const subData = YEAR1_CURRICULUM[subject as keyof typeof YEAR1_CURRICULUM];
    if (!subData) return [];
    return subData.units.filter((u: CurriculumUnit) => u.book === bookKey);
  };

  // Global stats
  const allUnits = [...YEAR1_CURRICULUM.english.units, ...YEAR1_CURRICULUM.math.units, ...YEAR1_CURRICULUM.science.units];
  const totalTopics = allUnits.reduce((s, u) => s + u.topics.length, 0);
  const doneTopics = allUnits.reduce((s, u) => s + u.topics.filter(t => completedTopics.has(t.id)).length, 0);
  const progressPct = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;

  return (
    <div style={{ paddingBottom: '5.5rem', minHeight: '100dvh', background: 'linear-gradient(180deg, #f0f4ff 0%, #faf5ff 50%, #fff 100%)' }}>
      <div className="page-container">
        {/* ═══ Header ═══ */}
        <div className="animate-fade-in" style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/child" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#6366f1', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem' }}>
              <ArrowLeft size={18} /> Trang chủ
            </Link>
            <LangToggle />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0.5rem 0 0.15rem' }}>
            📚 Chương trình Lớp 1
          </h1>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
            Cambridge Integrated — Macmillan English • Pearson Abacus • Science Bug
          </p>
        </div>

        {/* ═══ Progress Overview ═══ */}
        <div className="card animate-fade-in" style={{ padding: '0.8rem 1rem', marginBottom: '1rem', background: 'white', border: '1px solid rgba(99,102,241,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 800, fontSize: '0.82rem', color: '#1e293b' }}>📊 Tiến độ tổng</span>
            <span style={{ fontWeight: 900, fontSize: '0.9rem', color: progressPct > 50 ? '#22c55e' : '#6366f1' }}>
              {doneTopics}/{totalTopics} • {progressPct}%
            </span>
          </div>
          <div style={{ height: 10, borderRadius: 99, background: '#f1f5f9', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progressPct}%`, borderRadius: 99, background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#a78bfa)', transition: 'width 0.6s ease', boxShadow: progressPct > 0 ? '0 0 8px rgba(99,102,241,0.4)' : 'none' }} />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem' }}>
            {(['english','math','science'] as const).map(s => {
              const sub = YEAR1_STATS[s];
              const meta = SUB_META[s];
              const subDone = YEAR1_CURRICULUM[s].units.reduce((c: number, u: CurriculumUnit) => c + u.topics.filter(t => completedTopics.has(t.id)).length, 0);
              return (
                <div key={s} style={{ flex: 1, padding: '0.5rem', borderRadius: 12, background: `${meta.color}08`, textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem' }}>{meta.emoji}</div>
                  <div style={{ fontWeight: 800, fontSize: '0.68rem', color: meta.color }}>{meta.label}</div>
                  <div style={{ fontSize: '0.6rem', color: '#64748b', marginTop: 2 }}>{subDone}/{sub.topics} bài</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══ Book Shelf ═══ */}
        <div style={{ marginBottom: '0.5rem' }}>
          <h2 style={{ fontSize: '0.9rem', fontWeight: 900, color: '#1e293b', margin: '0 0 0.6rem', display: 'flex', alignItems: 'center', gap: 6 }}>
            <BookMarked size={16} color="#6366f1" /> Chọn sách để học
          </h2>

          {/* Book cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem', marginBottom: '0.6rem' }}>
            {BOOKS.map(book => {
              const units = getBookUnits(book.bookKey, book.subject);
              const bookTopics = units.reduce((s: number, u: CurriculumUnit) => s + u.topics.length, 0);
              const bookDone = units.reduce((s: number, u: CurriculumUnit) => s + u.topics.filter(t => completedTopics.has(t.id)).length, 0);
              const isActive = activeBook === book.id;
              const pct = bookTopics > 0 ? Math.round((bookDone / bookTopics) * 100) : 0;

              return (
                <button
                  key={book.id}
                  onClick={() => { setActiveBook(isActive ? null : book.id); setExpandedUnit(null); }}
                  style={{
                    padding: 0, border: isActive ? `2.5px solid ${book.color}` : '2px solid #e2e8f0',
                    borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
                    background: 'white', boxShadow: isActive ? `0 4px 20px ${book.color}30` : '0 2px 8px rgba(0,0,0,0.04)',
                    transition: 'all 0.3s ease', transform: isActive ? 'scale(1.02)' : 'scale(1)',
                    gridColumn: book.id === 'macmillan' ? 'span 2' : 'auto',
                  }}
                >
                  {/* Cover image */}
                  <div style={{ position: 'relative', height: book.id === 'macmillan' ? 100 : 90, overflow: 'hidden', background: book.gradient }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={book.cover} alt={book.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, mixBlendMode: 'multiply' }} />
                    {pct > 0 && (
                      <div style={{ position: 'absolute', top: 6, right: 6, padding: '0.15rem 0.4rem', borderRadius: 99, background: 'rgba(255,255,255,0.95)', fontSize: '0.55rem', fontWeight: 800, color: pct === 100 ? '#22c55e' : book.color }}>
                        {pct === 100 ? '✅' : `${pct}%`}
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div style={{ padding: '0.5rem 0.6rem 0.6rem' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.72rem', color: '#1e293b', textAlign: 'left', lineHeight: 1.2 }}>{book.name}</div>
                    <div style={{ fontSize: '0.58rem', color: '#94a3b8', textAlign: 'left', marginTop: 2 }}>{book.desc}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
                      <div style={{ flex: 1, height: 4, borderRadius: 99, background: '#f1f5f9', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: book.gradient, borderRadius: 99, transition: 'width 0.5s' }} />
                      </div>
                      <span style={{ fontSize: '0.52rem', fontWeight: 700, color: '#94a3b8' }}>{bookDone}/{bookTopics}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══ Active Book Content ═══ */}
        {activeBook && (() => {
          const book = BOOKS.find(b => b.id === activeBook)!;
          const units = getBookUnits(book.bookKey, book.subject);
          const meta = SUB_META[book.subject];

          return (
            <div className="animate-fade-in" style={{ marginBottom: '1rem' }}>
              {/* Book header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.6rem', padding: '0.6rem 0.8rem', borderRadius: 14, background: `${book.color}08`, border: `1px solid ${book.color}15` }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: book.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', color: '#fff', fontWeight: 900, flexShrink: 0 }}>
                  {meta.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#1e293b' }}>{book.name}</div>
                  <div style={{ fontSize: '0.62rem', color: '#64748b' }}>{units.length} bài • {units.reduce((s: number, u: CurriculumUnit) => s + u.topics.length, 0)} mục</div>
                </div>
              </div>

              {/* Units list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {units.map((unit: CurriculumUnit) => {
                  const isExpanded = expandedUnit === unit.id;
                  const unitDone = unit.topics.filter(t => completedTopics.has(t.id)).length;
                  const unitPct = unit.topics.length > 0 ? Math.round((unitDone / unit.topics.length) * 100) : 0;

                  return (
                    <div key={unit.id} style={{ borderRadius: 14, overflow: 'hidden', border: isExpanded ? `1.5px solid ${book.color}30` : '1px solid #e2e8f0', background: 'white', transition: 'all 0.3s' }}>
                      {/* Unit header */}
                      <button onClick={() => setExpandedUnit(isExpanded ? null : unit.id)} style={{
                        width: '100%', padding: '0.65rem 0.8rem', border: 'none', cursor: 'pointer',
                        background: isExpanded ? `${book.color}05` : 'white', display: 'flex', alignItems: 'center', gap: '0.5rem',
                      }}>
                        {/* Unit number badge */}
                        <div style={{
                          width: 30, height: 30, borderRadius: 10, background: unitPct === 100 ? '#dcfce7' : book.gradient,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: unitPct === 100 ? '0.85rem' : '0.7rem', fontWeight: 900, color: unitPct === 100 ? '#22c55e' : '#fff', flexShrink: 0,
                        }}>
                          {unitPct === 100 ? '✓' : unit.unitNumber}
                        </div>
                        <div style={{ flex: 1, textAlign: 'left' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.76rem', color: '#1e293b', lineHeight: 1.2 }}>{unit.titleEn}</div>
                          <div style={{ fontSize: '0.62rem', color: '#94a3b8', marginTop: 1 }}>{unit.titleVi} • {unit.topics.length} mục</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <span style={{ fontSize: '0.55rem', fontWeight: 700, color: unitPct === 100 ? '#22c55e' : '#94a3b8' }}>{unitDone}/{unit.topics.length}</span>
                          <ChevronDown size={14} style={{ color: '#94a3b8', transition: 'transform 0.3s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }} />
                        </div>
                      </button>

                      {/* Topics */}
                      {isExpanded && (
                        <div style={{ padding: '0 0.6rem 0.6rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          {unit.topics.map(topic => {
                            const isDone = completedTopics.has(topic.id);
                            const hasContent = !!YEAR1_INTERACTIVE[topic.id];
                            const typeIcons: Record<string, string> = { lesson: '📖', activity: '🎯', practice: '✏️', review: '🔄' };
                            const typeLabels: Record<string, string> = { lesson: 'Bài học', activity: 'Hoạt động', practice: 'Luyện tập', review: 'Ôn tập' };

                            return (
                              <button key={topic.id} onClick={() => setActiveTopic({ topic, color: book.color })} style={{
                                width: '100%', padding: '0.6rem 0.7rem', border: isDone ? `1.5px solid ${book.color}20` : '1px solid #f1f5f9',
                                borderRadius: 12, background: isDone ? `${book.color}05` : '#fafbfc', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s',
                                textAlign: 'left',
                              }}>
                                {/* Status icon */}
                                <div style={{
                                  width: 28, height: 28, borderRadius: 99,
                                  background: isDone ? '#dcfce7' : hasContent ? `${book.color}10` : '#f8fafc',
                                  border: isDone ? '2px solid #22c55e' : hasContent ? `2px solid ${book.color}30` : '2px solid #e2e8f0',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  fontSize: '0.7rem', flexShrink: 0,
                                }}>
                                  {isDone ? '✅' : typeIcons[topic.type] || '📖'}
                                </div>
                                {/* Content */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <span style={{ fontSize: '0.5rem', padding: '0.1rem 0.35rem', borderRadius: 99, background: `${book.color}10`, color: book.color, fontWeight: 700 }}>
                                      {typeLabels[topic.type]}
                                    </span>
                                    {hasContent && !isDone && (
                                      <span style={{ fontSize: '0.45rem', padding: '0.08rem 0.3rem', borderRadius: 99, background: '#dbeafe', color: '#3b82f6', fontWeight: 700 }}>
                                        Tương tác
                                      </span>
                                    )}
                                  </div>
                                  <div style={{ fontWeight: 700, fontSize: '0.72rem', color: isDone ? '#22c55e' : '#1e293b', marginTop: 2, textDecoration: isDone ? 'line-through' : 'none', lineHeight: 1.25, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {topic.titleEn}
                                  </div>
                                  <div style={{ fontSize: '0.6rem', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{topic.titleVi}</div>
                                  {/* Vocab preview */}
                                  {topic.keyVocab && topic.keyVocab.length > 0 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginTop: 4 }}>
                                      {topic.keyVocab.slice(0, 4).map(v => (
                                        <span key={v} style={{ fontSize: '0.5rem', padding: '0.08rem 0.3rem', borderRadius: 99, background: '#f1f5f9', color: '#64748b', fontWeight: 600 }}>{v}</span>
                                      ))}
                                      {topic.keyVocab.length > 4 && <span style={{ fontSize: '0.5rem', color: '#94a3b8' }}>+{topic.keyVocab.length - 4}</span>}
                                    </div>
                                  )}
                                </div>
                                <ChevronRight size={14} style={{ color: '#cbd5e1', flexShrink: 0 }} />
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* ═══ Empty state ═══ */}
        {!activeBook && (
          <div className="animate-fade-in" style={{ textAlign: 'center', padding: '2rem 1rem', borderRadius: 16, background: 'white', border: '1px dashed #e2e8f0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>👆</div>
            <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#1e293b' }}>Chọn một cuốn sách để bắt đầu</div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: 4 }}>Nhấn vào bìa sách phía trên để xem nội dung bài học</div>
          </div>
        )}

        {/* ═══ Cross-Domain Learning ═══ */}
        <div style={{ marginTop: '1.2rem' }}>
          <h2 style={{ fontSize: '0.9rem', fontWeight: 900, color: '#1e293b', margin: '0 0 0.6rem', display: 'flex', alignItems: 'center', gap: 6 }}>
            🔗 Học liên môn
            <span style={{ fontSize: '0.55rem', fontWeight: 600, color: '#94a3b8', marginLeft: 4 }}>{CROSS_DOMAIN_LINKS.length} chủ đề</span>
          </h2>
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 4 }}>
            {CROSS_DOMAIN_LINKS.map(link => (
              <div key={link.id} style={{ flex: '0 0 260px', borderRadius: 14, border: '1px solid #e2e8f0', background: 'white', overflow: 'hidden' }}>
                <div style={{ padding: '0.6rem 0.7rem', background: 'linear-gradient(135deg,#f8fafc,#eef2ff)', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: '1.2rem' }}>{link.themeEmoji}</span>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.72rem', color: '#1e293b' }}>{link.theme}</div>
                      <div style={{ fontSize: '0.58rem', color: '#94a3b8' }}>{link.themeVi}</div>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '0.5rem 0.7rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginBottom: 6 }}>
                    {link.connections.map((c, i) => (
                      <span key={i} style={{ fontSize: '0.48rem', padding: '0.1rem 0.3rem', borderRadius: 99, background: `${SUB_META[c.subject]?.color || '#666'}12`, color: SUB_META[c.subject]?.color || '#666', fontWeight: 700 }}>
                        {SUB_META[c.subject]?.emoji} {c.relevanceVi}
                      </span>
                    ))}
                  </div>
                  {link.suggestedActivityVi && (
                    <div style={{ fontSize: '0.58rem', color: '#64748b', padding: '0.4rem', borderRadius: 8, background: '#fef3c7', border: '1px solid #fde68a', lineHeight: 1.4 }}>
                      💡 {link.suggestedActivityVi}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <nav className="bottom-nav">
        <Link href="/child" className="nav-item"><Home size={20} /><span>Trang chủ</span></Link>
        <Link href="/child/learn" className="nav-item"><BookOpen size={20} /><span>Học</span></Link>
        <Link href="/child/exams" className="nav-item"><Trophy size={20} /><span>Exams</span></Link>
        <Link href="/child/review" className="nav-item"><RotateCcw size={20} /><span>Ôn tập</span></Link>
        <Link href="/child/mistakes" className="nav-item"><Brain size={20} /><span>Lỗi sai</span></Link>
      </nav>

      {/* Interactive Lesson Modal */}
      {activeTopic && (
        <Year1LessonModal
          topic={activeTopic.topic}
          subjectColor={activeTopic.color}
          onClose={() => setActiveTopic(null)}
          onComplete={markComplete}
        />
      )}
    </div>
  );
}
