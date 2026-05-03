'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { getStreak, getRecentBooks, getFavoriteBookIds, type ReadingRecord, type DailyStreak } from '@/lib/reading-tracker';
import { TEXTBOOK_LIBRARY, getAllPassages } from '@/data/textbook-library';
import { BookOpen, Flame, Heart, Trophy, TrendingUp, Clock, Star, BarChart3 } from 'lucide-react';

function StatCard({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div style={{
      background: '#fff', borderRadius: '16px', border: '1px solid #f1f5f9',
      padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      display: 'flex', alignItems: 'center', gap: '0.75rem',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: '12px',
        background: `linear-gradient(135deg, ${color}22, ${color}11)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color, flexShrink: 0,
      }}>{icon}</div>
      <div>
        <div style={{ fontWeight: 800, fontSize: '1.3rem', color: '#1e293b', lineHeight: 1.2 }}>{value}</div>
        <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>{label}</div>
        {sub && <div style={{ fontSize: '0.6rem', color: '#94a3b8' }}>{sub}</div>}
      </div>
    </div>
  );
}

function StreakCalendar({ streak }: { streak: DailyStreak }) {
  // Generate last 7 days
  const days = useMemo(() => {
    const result: { date: string; label: string; active: boolean }[] = [];
    const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const dateStr = d.toISOString().slice(0, 10);
      result.push({
        date: dateStr,
        label: dayNames[d.getDay()],
        active: dateStr <= streak.lastReadDate && dateStr >= new Date(Date.now() - (streak.currentStreak - 1) * 86400000).toISOString().slice(0, 10),
      });
    }
    return result;
  }, [streak]);

  return (
    <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center', margin: '0.5rem 0' }}>
      {days.map(d => (
        <div key={d.date} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.55rem', color: '#94a3b8', fontWeight: 600, marginBottom: '4px' }}>{d.label}</div>
          <div style={{
            width: 32, height: 32, borderRadius: '8px',
            background: d.active ? 'linear-gradient(135deg, #f97316, #fb923c)' : '#f1f5f9',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.8rem',
            boxShadow: d.active ? '0 2px 8px rgba(249,115,22,0.3)' : 'none',
          }}>
            {d.active ? '🔥' : '·'}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ReadingProgressDashboard({ lang }: { lang: string }) {
  const [streak, setStreak] = useState<DailyStreak>({ currentStreak: 0, longestStreak: 0, lastReadDate: '', totalBooksOpened: 0, todayBooksOpened: 0 });
  const [recent, setRecent] = useState<ReadingRecord[]>([]);
  const [favIds, setFavIds] = useState<string[]>([]);

  useEffect(() => {
    setStreak(getStreak());
    setRecent(getRecentBooks(8));
    setFavIds(getFavoriteBookIds());
  }, []);

  const vi = lang === 'vi';
  const allPassages = useMemo(() => getAllPassages(), []);
  const totalGuides = useMemo(() =>
    TEXTBOOK_LIBRARY.reduce((sum, b) => sum + b.passages.reduce((s2, p) => s2 + p.sentenceGuides.length, 0), 0)
    , []);

  // Reading level estimate based on books read
  const readingLevel = streak.totalBooksOpened >= 30 ? 'B1' :
    streak.totalBooksOpened >= 15 ? 'A2+' :
      streak.totalBooksOpened >= 5 ? 'A2' :
        streak.totalBooksOpened >= 1 ? 'A1' : 'Pre-A1';

  return (
    <div style={{
      background: 'linear-gradient(180deg, #f0fdf4 0%, #fff 40%)',
      borderRadius: '20px', border: '1px solid rgba(0,0,0,0.06)',
      overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
      marginBottom: '1.5rem',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #059669, #10b981)',
        padding: '1.25rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <BarChart3 size={20} color="#fff" />
            <h2 style={{ fontWeight: 800, fontSize: '1.05rem', margin: 0, color: '#fff' }}>
              {vi ? '📊 Tiến Trình Đọc' : '📊 Reading Progress'}
            </h2>
          </div>
          <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
            {vi ? `${allPassages.length} bài đọc • ${totalGuides} câu song ngữ • Chuẩn CTGDPT 2018` : `${allPassages.length} passages • ${totalGuides} bilingual guides`}
          </p>
        </div>
      </div>

      <div style={{ padding: '1rem 1.25rem' }}>
        {/* Streak section */}
        <div style={{
          background: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
          borderRadius: '14px', border: '1px solid #fed7aa44',
          padding: '0.75rem 1rem', marginBottom: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
            <Flame size={16} color="#f97316" />
            <span style={{ fontWeight: 700, fontSize: '0.82rem', color: '#9a3412' }}>
              {vi ? `Chuỗi đọc: ${streak.currentStreak} ngày 🔥` : `Reading streak: ${streak.currentStreak} days 🔥`}
            </span>
          </div>
          <StreakCalendar streak={streak} />
          <div style={{ fontSize: '0.6rem', color: '#9a3412', textAlign: 'center' }}>
            {vi ? `Kỷ lục: ${streak.longestStreak} ngày` : `Best: ${streak.longestStreak} days`}
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
          <StatCard icon={<BookOpen size={20} />} label={vi ? 'Bài đã đọc' : 'Books read'} value={streak.totalBooksOpened} sub={vi ? `Hôm nay: ${streak.todayBooksOpened}` : `Today: ${streak.todayBooksOpened}`} color="#6366f1" />
          <StatCard icon={<Trophy size={20} />} label={vi ? 'Trình độ ước tính' : 'Est. Level'} value={readingLevel} sub="CEFR" color="#f59e0b" />
          <StatCard icon={<Heart size={20} />} label={vi ? 'Yêu thích' : 'Favorites'} value={favIds.length} sub={vi ? 'bài' : 'books'} color="#ef4444" />
          <StatCard icon={<Star size={20} />} label={vi ? 'Thư viện' : 'Library'} value={allPassages.length} sub={vi ? 'bài sẵn sàng' : 'ready to read'} color="#10b981" />
        </div>

        {/* Recent activity */}
        {recent.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
              <Clock size={14} color="#64748b" />
              <span style={{ fontWeight: 700, fontSize: '0.78rem', color: '#475569' }}>
                {vi ? 'Đọc gần đây' : 'Recently Read'}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {recent.slice(0, 5).map(r => {
                const book = TEXTBOOK_LIBRARY.find(b => b.id === r.bookId);
                if (!book) return null;
                return (
                  <div key={r.bookId} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.4rem 0.6rem', borderRadius: '8px',
                    background: '#f8fafc', border: '1px solid #f1f5f9',
                  }}>
                    <span style={{ fontSize: '1.2rem' }}>{book.coverEmoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#1e293b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {vi ? book.titleVi || book.title : book.title}
                      </div>
                      <div style={{ fontSize: '0.58rem', color: '#94a3b8' }}>
                        {vi ? `Đã mở ${r.openCount} lần` : `Opened ${r.openCount} times`}
                      </div>
                    </div>
                    <TrendingUp size={12} color="#10b981" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty state */}
        {recent.length === 0 && (
          <div style={{ textAlign: 'center', padding: '1.5rem 0', color: '#94a3b8' }}>
            <BookOpen size={32} style={{ marginBottom: '0.5rem', opacity: 0.4 }} />
            <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              {vi ? 'Chưa có dữ liệu đọc' : 'No reading data yet'}
            </div>
            <div style={{ fontSize: '0.68rem', marginTop: '0.2rem' }}>
              {vi ? 'Hãy mở một bài đọc để bắt đầu!' : 'Open a passage to start!'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
