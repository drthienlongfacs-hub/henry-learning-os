'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Home, BookOpen, RotateCcw, Brain, Trophy, ChevronRight, ArrowLeft, CheckCircle2, BookMarked } from 'lucide-react';
import { LangToggle } from '@/components/LangToggle';
import { useTranslation } from '@/lib/i18n';
import { YEAR1_CURRICULUM, YEAR1_STATS, type CurriculumUnit } from '@/data/year1-integrated-curriculum';

type SubjectFilter = 'all' | 'english' | 'math' | 'science';
type TermFilter = 0 | 1 | 2 | 3;

const SUB_META: Record<string, { emoji: string; color: string; bg: string; label: string; labelEn: string }> = {
  english: { emoji: '🌍', color: '#10b981', bg: 'linear-gradient(135deg,#10b981,#34d399)', label: 'Tiếng Anh', labelEn: 'English' },
  math:    { emoji: '🔢', color: '#6366f1', bg: 'linear-gradient(135deg,#6366f1,#818cf8)', label: 'Toán', labelEn: 'Math' },
  science: { emoji: '🔬', color: '#f59e0b', bg: 'linear-gradient(135deg,#f59e0b,#fbbf24)', label: 'Khoa học', labelEn: 'Science' },
};

const TERM_LABELS = ['Cả năm','Học kỳ 1','Học kỳ 2','Học kỳ 3'];

export default function Year1Page() {
  const { t, lang } = useTranslation();
  const [subFilter, setSubFilter] = useState<SubjectFilter>('all');
  const [termFilter, setTermFilter] = useState<TermFilter>(0);
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set());

  const allUnits = useMemo(() => {
    let units = [...YEAR1_CURRICULUM.english.units, ...YEAR1_CURRICULUM.math.units, ...YEAR1_CURRICULUM.science.units];
    if (subFilter !== 'all') units = units.filter(u => u.subject === subFilter);
    if (termFilter > 0) units = units.filter(u => u.term === termFilter);
    return units;
  }, [subFilter, termFilter]);

  const toggleTopic = (topicId: string) => {
    setCompletedTopics(prev => {
      const next = new Set(prev);
      if (next.has(topicId)) next.delete(topicId); else next.add(topicId);
      return next;
    });
  };

  const totalTopics = allUnits.reduce((s, u) => s + u.topics.length, 0);
  const doneTopics = allUnits.reduce((s, u) => s + u.topics.filter(t => completedTopics.has(t.id)).length, 0);
  const progressPct = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;

  return (
    <div style={{ paddingBottom: '5.5rem', minHeight: '100dvh', background: 'linear-gradient(180deg, #eef2ff 0%, #f0f4ff 40%, #faf5ff 100%)' }}>
      <div className="page-container">
        {/* Header */}
        <div className="animate-fade-in" style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/child" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#6366f1', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem' }}>
              <ArrowLeft size={18} /> Trang chủ
            </Link>
            <LangToggle />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, background: 'linear-gradient(135deg,#4f46e5,#7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0.5rem 0 0.2rem' }}>
            📚 Chương trình Lớp 1
          </h1>
          <p style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', margin: 0 }}>
            Tích hợp Pearson • Macmillan English + Abacus Math + Science Bug
          </p>
        </div>

        {/* Subject hero cards */}
        <div className="animate-fade-in" style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[
            { sub: 'english' as const, img: '/exam-images/year1-english-hero.png', title: 'English', desc: 'Macmillan English 1' },
            { sub: 'math' as const, img: '/exam-images/year1-math-hero.png', title: 'Toán', desc: 'Pearson Abacus' },
            { sub: 'science' as const, img: '/exam-images/year1-science-hero.png', title: 'Khoa học', desc: 'Science Bug' },
          ].map(c => (
            <button key={c.sub} onClick={() => setSubFilter(subFilter === c.sub ? 'all' : c.sub)} style={{
              flex: '0 0 42%', border: subFilter === c.sub ? `2px solid ${SUB_META[c.sub].color}` : '2px solid transparent',
              borderRadius: 'var(--radius-xl)', overflow: 'hidden', cursor: 'pointer',
              background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', transition: 'all 0.25s', padding: 0,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt={c.title} style={{ width: '100%', height: 100, objectFit: 'cover' }} />
              <div style={{ padding: '0.4rem 0.5rem' }}>
                <div style={{ fontWeight: 800, fontSize: '0.75rem', color: SUB_META[c.sub].color }}>{c.title}</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>{c.desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="card animate-fade-in" style={{ padding: '0.85rem 1rem', marginBottom: '0.75rem', background: 'linear-gradient(135deg,rgba(99,102,241,0.06),rgba(139,92,246,0.06))' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontWeight: 800, fontSize: '0.8rem', color: 'var(--color-text-primary)' }}>Tiến độ tổng</span>
            <span style={{ fontWeight: 900, fontSize: '0.85rem', color: '#6366f1' }}>{doneTopics}/{totalTopics} bài • {progressPct}%</span>
          </div>
          <div style={{ height: 8, borderRadius: 99, background: 'rgba(99,102,241,0.12)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progressPct}%`, borderRadius: 99, background: 'linear-gradient(90deg,#6366f1,#8b5cf6)', transition: 'width 0.5s ease' }} />
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem' }}>
            {(['english','math','science'] as const).map(s => {
              const m = SUB_META[s];
              const sub = YEAR1_STATS[s];
              return (
                <div key={s} style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '1rem' }}>{m.emoji}</div>
                  <div style={{ fontWeight: 800, fontSize: '0.65rem', color: m.color }}>{m.label}</div>
                  <div style={{ fontSize: '0.58rem', color: 'var(--color-text-muted)' }}>{sub.units} bài • {sub.topics} mục</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Book list */}
        <div className="card animate-fade-in" style={{ padding: '0.7rem 0.85rem', marginBottom: '0.75rem' }}>
          <div style={{ fontWeight: 800, fontSize: '0.78rem', color: 'var(--color-text-primary)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <BookMarked size={14} color="#6366f1" /> Sách giáo khoa
          </div>
          <div style={{ display: 'grid', gap: '0.25rem' }}>
            {[
              { n: 1, t: 'Macmillan English 1 Fluency Book', s: 'english' },
              { n: 2, t: 'Macmillan English 1 Language Book', s: 'english' },
              { n: 3, t: 'Macmillan English Practice Book + CD', s: 'english' },
              { n: 4, t: 'Pearson Abacus Year 1 Workbook 1', s: 'math' },
              { n: 5, t: 'Pearson Abacus Year 1 Workbook 2', s: 'math' },
              { n: 6, t: 'Pearson Abacus Year 1 Workbook 3', s: 'math' },
              { n: 7, t: 'Science Bug Pupil Book Year 1', s: 'science' },
            ].map(b => (
              <div key={b.n} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                <span style={{ width: 20, height: 20, borderRadius: 6, background: SUB_META[b.s].bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 900, flexShrink: 0 }}>{b.n}</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{b.t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="animate-fade-in" style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          {(['all','english','math','science'] as SubjectFilter[]).map(f => {
            const label = f === 'all' ? 'Tất cả' : SUB_META[f].label;
            const emoji = f === 'all' ? '📋' : SUB_META[f].emoji;
            const active = subFilter === f;
            return (
              <button key={f} onClick={() => setSubFilter(f)} style={{
                padding: '0.4rem 0.7rem', borderRadius: 99, border: 'none', cursor: 'pointer',
                background: active ? (f === 'all' ? '#6366f1' : SUB_META[f].color) : 'rgba(0,0,0,0.05)',
                color: active ? '#fff' : 'var(--color-text-secondary)',
                fontWeight: 700, fontSize: '0.72rem', transition: 'all 0.2s',
              }}>
                {emoji} {label}
              </button>
            );
          })}
        </div>
        <div className="animate-fade-in" style={{ display: 'flex', gap: '0.3rem', marginBottom: '1rem' }}>
          {([0,1,2,3] as TermFilter[]).map(t => (
            <button key={t} onClick={() => setTermFilter(t)} style={{
              padding: '0.3rem 0.6rem', borderRadius: 99, border: 'none', cursor: 'pointer',
              background: termFilter === t ? '#8b5cf6' : 'rgba(0,0,0,0.04)',
              color: termFilter === t ? '#fff' : 'var(--color-text-muted)',
              fontWeight: 600, fontSize: '0.65rem', transition: 'all 0.2s',
            }}>
              {TERM_LABELS[t]}
            </button>
          ))}
        </div>

        {/* Unit cards */}
        <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {allUnits.map(unit => {
            const meta = SUB_META[unit.subject];
            const isOpen = expandedUnit === unit.id;
            const unitDone = unit.topics.filter(t => completedTopics.has(t.id)).length;
            const unitPct = Math.round((unitDone / unit.topics.length) * 100);
            return (
              <div key={unit.id} className="card animate-fade-scale" style={{ overflow: 'hidden', borderLeft: `3px solid ${meta.color}` }}>
                <button onClick={() => setExpandedUnit(isOpen ? null : unit.id)} style={{
                  width: '100%', padding: '0.75rem 0.85rem', border: 'none', cursor: 'pointer',
                  background: 'transparent', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '0.6rem',
                }}>
                  <span style={{ fontSize: '1.4rem' }}>{unit.iconEmoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <span style={{ fontSize: '0.58rem', padding: '0.1rem 0.4rem', borderRadius: 99, background: `${meta.color}15`, color: meta.color, fontWeight: 700 }}>
                        {meta.label} • Unit {unit.unitNumber}
                      </span>
                      <span style={{ fontSize: '0.55rem', color: 'var(--color-text-muted)' }}>HK{unit.term}</span>
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.82rem', color: 'var(--color-text-primary)', marginTop: '0.15rem' }}>
                      {unit.titleEn}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--color-text-secondary)' }}>{unit.titleVi}</div>
                    {/* Mini progress */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.3rem' }}>
                      <div style={{ flex: 1, height: 4, borderRadius: 99, background: `${meta.color}15`, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${unitPct}%`, borderRadius: 99, background: meta.color, transition: 'width 0.3s' }} />
                      </div>
                      <span style={{ fontSize: '0.58rem', fontWeight: 700, color: meta.color }}>{unitDone}/{unit.topics.length}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} style={{ color: 'var(--color-text-muted)', transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>

                {/* Expanded topics */}
                {isOpen && (
                  <div style={{ padding: '0 0.85rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <div style={{ fontSize: '0.62rem', color: 'var(--color-text-muted)', marginBottom: '0.15rem', fontWeight: 600 }}>
                      📖 {unit.book}
                    </div>
                    {unit.topics.map(topic => {
                      const isDone = completedTopics.has(topic.id);
                      const typeColors: Record<string, string> = { lesson: '#3b82f6', activity: '#10b981', practice: '#f59e0b', review: '#8b5cf6' };
                      const typeLabels: Record<string, string> = { lesson: 'Bài học', activity: 'Hoạt động', practice: 'Luyện tập', review: 'Ôn tập' };
                      return (
                        <button key={topic.id} onClick={() => toggleTopic(topic.id)} style={{
                          width: '100%', padding: '0.55rem 0.65rem', border: 'none', cursor: 'pointer',
                          borderRadius: 'var(--radius-md)', textAlign: 'left',
                          background: isDone ? `${meta.color}08` : 'rgba(0,0,0,0.02)',
                          display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                          transition: 'all 0.2s',
                        }}>
                          <CheckCircle2 size={16} style={{ color: isDone ? meta.color : '#d1d5db', marginTop: '0.05rem', flexShrink: 0 }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                              <span style={{ fontSize: '0.52rem', padding: '0.05rem 0.3rem', borderRadius: 99, background: `${typeColors[topic.type]}15`, color: typeColors[topic.type], fontWeight: 700 }}>
                                {typeLabels[topic.type]}
                              </span>
                            </div>
                            <div style={{ fontWeight: 700, fontSize: '0.75rem', color: isDone ? meta.color : 'var(--color-text-primary)', textDecoration: isDone ? 'line-through' : 'none', marginTop: '0.1rem' }}>
                              {topic.titleEn}
                            </div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)' }}>{topic.titleVi}</div>
                            {topic.keyVocab && topic.keyVocab.length > 0 && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem', marginTop: '0.25rem' }}>
                                {topic.keyVocab.slice(0, 6).map(v => (
                                  <span key={v} style={{ fontSize: '0.55rem', padding: '0.1rem 0.35rem', borderRadius: 99, background: 'rgba(99,102,241,0.08)', color: '#6366f1', fontWeight: 600 }}>{v}</span>
                                ))}
                              </div>
                            )}
                            {topic.objectives && (
                              <div style={{ marginTop: '0.2rem' }}>
                                {topic.objectives.map((o, i) => (
                                  <div key={i} style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', paddingLeft: '0.5rem', borderLeft: `2px solid ${meta.color}30` }}>• {o}</div>
                                ))}
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {allUnits.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '2rem', marginTop: '1rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
            <div style={{ fontWeight: 700, color: 'var(--color-text-secondary)' }}>Không có bài nào trong bộ lọc này</div>
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <nav className="bottom-nav">
        <Link href="/child" className="nav-item"><Home size={20} /><span>Trang chủ</span></Link>
        <Link href="/child/learn" className="nav-item"><BookOpen size={20} /><span>Học</span></Link>
        <Link href="/child/exams" className="nav-item"><Trophy size={20} /><span>Exams</span></Link>
        <Link href="/child/review" className="nav-item"><RotateCcw size={20} /><span>Ôn tập</span></Link>
        <Link href="/child/mistakes" className="nav-item"><Brain size={20} /><span>Lỗi sai</span></Link>
      </nav>
    </div>
  );
}
