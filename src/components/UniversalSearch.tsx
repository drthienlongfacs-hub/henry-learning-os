'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Clock, Sparkles } from 'lucide-react';

// ── Searchable index ──
interface SearchItem {
  id: string;
  title: string;
  titleVi: string;
  category: string;
  categoryIcon: string;
  href: string;
  keywords: string[];
}

const SEARCH_INDEX: SearchItem[] = [
  // Modules
  { id: 'mod-math', title: 'Mathematics', titleVi: 'Toán', category: 'Môn học', categoryIcon: '🔢', href: '/child/learn?subject=math', keywords: ['toán', 'math', 'số', 'phép tính', 'hình học'] },
  { id: 'mod-viet', title: 'Vietnamese', titleVi: 'Tiếng Việt', category: 'Môn học', categoryIcon: '📖', href: '/child/learn?subject=vietnamese', keywords: ['tiếng việt', 'vietnamese', 'đọc', 'viết', 'chính tả'] },
  { id: 'mod-eng', title: 'English', titleVi: 'Tiếng Anh', category: 'Môn học', categoryIcon: '🌍', href: '/child/learn?subject=english', keywords: ['english', 'tiếng anh', 'grammar', 'vocabulary', 'reading'] },
  { id: 'mod-sci', title: 'Science', titleVi: 'Khoa học', category: 'Môn học', categoryIcon: '🔬', href: '/child/learn?subject=science', keywords: ['khoa học', 'science', 'thí nghiệm', 'tự nhiên'] },
  { id: 'mod-ethics', title: 'Ethics', titleVi: 'Đạo đức', category: 'Môn học', categoryIcon: '💛', href: '/child/learn?subject=ethics', keywords: ['đạo đức', 'ethics', 'lễ phép'] },
  { id: 'mod-art', title: 'Art', titleVi: 'Nghệ thuật', category: 'Môn học', categoryIcon: '🎨', href: '/child/learn?subject=art', keywords: ['nghệ thuật', 'art', 'vẽ', 'âm nhạc'] },
  { id: 'mod-comp', title: 'Computing', titleVi: 'Tin học', category: 'Môn học', categoryIcon: '💻', href: '/child/learn?subject=computing', keywords: ['tin học', 'computing', 'máy tính', 'lập trình'] },
  { id: 'mod-hisgeo', title: 'History & Geography', titleVi: 'Sử & Địa', category: 'Môn học', categoryIcon: '🗺️', href: '/child/learn?subject=hisgeo', keywords: ['sử', 'địa', 'history', 'geography', 'lịch sử'] },

  // Features
  { id: 'feat-review', title: 'Spaced Review', titleVi: 'Ôn tập', category: 'Tính năng', categoryIcon: '🔄', href: '/child/review', keywords: ['ôn tập', 'review', 'quiz', 'spaced repetition'] },
  { id: 'feat-mistakes', title: 'Mistake Journal', titleVi: 'Sổ lỗi sai', category: 'Tính năng', categoryIcon: '🧠', href: '/child/mistakes', keywords: ['lỗi', 'sai', 'mistakes', 'sửa lỗi', 'journal'] },
  { id: 'feat-reading', title: 'Bilingual Reading', titleVi: 'Đọc sách song ngữ', category: 'Tính năng', categoryIcon: '📚', href: '/child/reading', keywords: ['đọc', 'reading', 'song ngữ', 'bilingual', 'stories'] },
  { id: 'feat-library', title: 'Library', titleVi: 'Thư viện sách', category: 'Tính năng', categoryIcon: '📚', href: '/child/library', keywords: ['thư viện', 'library', 'sách', 'SGK', 'textbook'] },
  { id: 'feat-elite', title: 'Elite Training', titleVi: 'Tinh hoa nâng cao', category: 'Tính năng', categoryIcon: '⭐', href: '/child/elite', keywords: ['tinh hoa', 'elite', 'nâng cao', 'advanced', 'olympiad'] },
  { id: 'feat-discover', title: 'Discover', titleVi: 'Khám phá', category: 'Tính năng', categoryIcon: '🔍', href: '/child/discover', keywords: ['khám phá', 'discover', 'tìm sách'] },
  { id: 'feat-future', title: 'Future Skills', titleVi: 'Kỹ năng tương lai', category: 'Tính năng', categoryIcon: '🚀', href: '/child/future', keywords: ['tương lai', 'future', 'AI', 'coding', 'STEM', 'kỹ năng'] },

  // International
  { id: 'intl-cam', title: 'Cambridge UK', titleVi: 'Giáo trình Anh Quốc', category: 'Quốc tế', categoryIcon: '🇬🇧', href: '/child/international?country=uk', keywords: ['cambridge', 'UK', 'anh', 'phonics'] },
  { id: 'intl-us', title: 'Common Core US', titleVi: 'Giáo trình Mỹ', category: 'Quốc tế', categoryIcon: '🇺🇸', href: '/child/international?country=us', keywords: ['common core', 'US', 'mỹ', 'wonders'] },
  { id: 'intl-au', title: 'Australian Curriculum', titleVi: 'Giáo trình Úc', category: 'Quốc tế', categoryIcon: '🇦🇺', href: '/child/international?country=au', keywords: ['australia', 'úc'] },
  { id: 'intl-fi', title: 'Finnish Curriculum', titleVi: 'Giáo trình Phần Lan', category: 'Quốc tế', categoryIcon: '🇫🇮', href: '/child/international?country=fi', keywords: ['finland', 'phần lan'] },
  { id: 'intl-sg', title: 'Singapore STELLAR', titleVi: 'Giáo trình Singapore', category: 'Quốc tế', categoryIcon: '🇸🇬', href: '/child/international?country=sg', keywords: ['singapore', 'stellar'] },
  { id: 'intl-ca', title: 'Canadian Curriculum', titleVi: 'Giáo trình Canada', category: 'Quốc tế', categoryIcon: '🇨🇦', href: '/child/international?country=ca', keywords: ['canada'] },

  // Exams
  { id: 'exam-hub', title: 'Cambridge Exams Hub', titleVi: 'Trung tâm luyện thi Cambridge', category: 'Luyện thi', categoryIcon: '🏆', href: '/child/exams', keywords: ['exam', 'thi', 'cambridge', 'luyện thi', 'test'] },
  { id: 'exam-starters', title: 'YLE Starters', titleVi: 'Starters (Pre-A1)', category: 'Luyện thi', categoryIcon: '🌟', href: '/child/exams', keywords: ['starters', 'pre-a1', 'yle', 'young learners'] },
  { id: 'exam-movers', title: 'YLE Movers', titleVi: 'Movers (A1)', category: 'Luyện thi', categoryIcon: '🚀', href: '/child/exams', keywords: ['movers', 'a1', 'yle'] },
  { id: 'exam-flyers', title: 'YLE Flyers', titleVi: 'Flyers (A2)', category: 'Luyện thi', categoryIcon: '🦅', href: '/child/exams', keywords: ['flyers', 'a2', 'yle'] },
  { id: 'exam-ket', title: 'KET (A2 Key)', titleVi: 'KET — Cambridge A2 Key', category: 'Luyện thi', categoryIcon: '🔑', href: '/child/exams', keywords: ['ket', 'key', 'a2', 'cambridge key'] },
  { id: 'exam-pet', title: 'PET (B1 Preliminary)', titleVi: 'PET — Cambridge B1', category: 'Luyện thi', categoryIcon: '📋', href: '/child/exams', keywords: ['pet', 'preliminary', 'b1'] },

  // Parent
  { id: 'parent-dashboard', title: 'Parent Dashboard', titleVi: 'Bảng điều khiển phụ huynh', category: 'Phụ huynh', categoryIcon: '👨‍👩‍👧', href: '/parent', keywords: ['phụ huynh', 'parent', 'dashboard', 'báo cáo'] },
];

const RECENT_KEY = 'henry-search-recent';

export default function UniversalSearch() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try { setRecentIds(JSON.parse(localStorage.getItem(RECENT_KEY) || '[]')); } catch { /* */ }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Keyboard shortcut: Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setIsOpen(true); }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.titleVi.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.keywords.some(k => k.includes(q))
    ).slice(0, 12);
  }, [query]);

  const recentItems = useMemo(() =>
    recentIds.map(id => SEARCH_INDEX.find(i => i.id === id)).filter(Boolean) as SearchItem[]
  , [recentIds]);

  const navigate = useCallback((item: SearchItem) => {
    const updated = [item.id, ...recentIds.filter(id => id !== item.id)].slice(0, 6);
    setRecentIds(updated);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(updated)); } catch { /* */ }
    setIsOpen(false);
    setQuery('');
    router.push(item.href);
  }, [recentIds, router]);

  const grouped = useMemo(() => {
    const map: Record<string, SearchItem[]> = {};
    results.forEach(r => { (map[r.category] ??= []).push(r); });
    return map;
  }, [results]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        id="universal-search-trigger"
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.5rem 0.85rem',
          background: 'rgba(99,102,241,0.06)',
          border: '1.5px solid rgba(99,102,241,0.12)',
          borderRadius: 999, cursor: 'pointer',
          color: 'var(--color-text-muted, #94a3b8)',
          fontSize: '0.72rem', fontWeight: 600,
          transition: 'all 0.25s',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Search size={14} />
        <span>Tìm kiếm...</span>
        <kbd style={{
          fontSize: '0.55rem', padding: '0.1rem 0.3rem',
          background: 'rgba(0,0,0,0.06)', borderRadius: 4,
          fontFamily: 'system-ui', color: 'var(--color-text-muted)',
          border: '1px solid rgba(0,0,0,0.08)',
        }}>⌘K</kbd>
      </button>
    );
  }

  return (
    <div
      onClick={() => setIsOpen(false)}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.45)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: 'max(60px, 10vh)',
        animation: 'fadeInUp 0.2s ease-out',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 520,
          margin: '0 1rem',
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(24px)',
          borderRadius: 24,
          boxShadow: '0 25px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.4)',
          overflow: 'hidden',
          maxHeight: '70vh',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Search input */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.75rem',
          padding: '1rem 1.25rem',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}>
          <Search size={20} color="#6366f1" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Tìm môn học, tính năng, luyện thi..."
            style={{
              flex: 1, border: 'none', outline: 'none',
              fontSize: '1rem', fontWeight: 500,
              background: 'transparent',
              color: '#1e293b',
              fontFamily: 'inherit',
            }}
          />
          {query && (
            <button onClick={() => setQuery('')} style={{
              background: 'rgba(0,0,0,0.06)', border: 'none',
              borderRadius: 8, padding: '0.3rem', cursor: 'pointer',
              display: 'flex', color: '#64748b',
            }}>
              <X size={16} />
            </button>
          )}
          <button onClick={() => setIsOpen(false)} style={{
            background: 'rgba(0,0,0,0.06)', border: 'none',
            borderRadius: 8, padding: '0.25rem 0.5rem',
            cursor: 'pointer', fontSize: '0.65rem',
            fontWeight: 700, color: '#64748b',
          }}>ESC</button>
        </div>

        {/* Results */}
        <div style={{ overflowY: 'auto', padding: '0.5rem 0' }}>
          {/* Empty state — show recent + suggestions */}
          {!query.trim() && (
            <>
              {recentItems.length > 0 && (
                <div style={{ padding: '0.5rem 1.25rem' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.35rem',
                    marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.7rem', fontWeight: 700,
                  }}>
                    <Clock size={12} /> Gần đây
                  </div>
                  {recentItems.map(item => (
                    <button key={item.id} onClick={() => navigate(item)} style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.6rem 0.75rem', borderRadius: 12,
                      border: 'none', background: 'transparent', cursor: 'pointer',
                      textAlign: 'left', transition: 'background 0.15s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.06)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <span style={{ fontSize: '1.1rem', width: 28, textAlign: 'center' }}>{item.categoryIcon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#1e293b' }}>{item.titleVi}</div>
                        <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{item.category}</div>
                      </div>
                      <ArrowRight size={14} color="#cbd5e1" />
                    </button>
                  ))}
                </div>
              )}
              <div style={{ padding: '0.5rem 1.25rem' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.35rem',
                  marginBottom: '0.5rem', color: '#94a3b8', fontSize: '0.7rem', fontWeight: 700,
                }}>
                  <Sparkles size={12} /> Gợi ý tìm kiếm
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {['Cambridge Exams', 'Toán', 'Đọc sách', 'Starters', 'KET', 'Future Skills', 'Ôn tập', 'Thư viện'].map(s => (
                    <button key={s} onClick={() => setQuery(s)} style={{
                      padding: '0.35rem 0.7rem', borderRadius: 999,
                      background: 'rgba(99,102,241,0.06)',
                      border: '1px solid rgba(99,102,241,0.1)',
                      color: '#6366f1', fontSize: '0.7rem', fontWeight: 600,
                      cursor: 'pointer',
                    }}>{s}</button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Search results grouped */}
          {query.trim() && results.length > 0 && Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} style={{ padding: '0.35rem 1.25rem' }}>
              <div style={{
                color: '#94a3b8', fontSize: '0.65rem', fontWeight: 800,
                textTransform: 'uppercase', letterSpacing: '0.05em',
                padding: '0.25rem 0',
              }}>{cat}</div>
              {items.map(item => (
                <button key={item.id} onClick={() => navigate(item)} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.65rem 0.75rem', borderRadius: 12,
                  border: 'none', background: 'transparent', cursor: 'pointer',
                  textAlign: 'left', transition: 'background 0.15s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <span style={{
                    fontSize: '1.2rem', width: 36, height: 36,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(99,102,241,0.06)', borderRadius: 10,
                  }}>{item.categoryIcon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1e293b' }}>{item.titleVi}</div>
                    <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{item.title}</div>
                  </div>
                  <ArrowRight size={14} color="#cbd5e1" />
                </button>
              ))}
            </div>
          ))}

          {/* No results */}
          {query.trim() && results.length === 0 && (
            <div style={{
              textAlign: 'center', padding: '2rem 1rem', color: '#94a3b8',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#64748b' }}>
                Không tìm thấy &quot;{query}&quot;
              </div>
              <div style={{ fontSize: '0.72rem', marginTop: '0.25rem' }}>
                Thử từ khóa khác hoặc chọn gợi ý bên dưới
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
