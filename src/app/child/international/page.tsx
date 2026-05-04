'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Globe2, BookOpen, Pencil, Headphones, BookA, MapPin, ChevronRight, Star } from 'lucide-react';
import { useAppStore } from '@/stores/app-store';
import {
  PHONICS_LEVELS, GRAMMAR_TOPICS, READING_PASSAGES, SIGHT_WORDS,
  WRITING_TOPICS, LISTENING_SPEAKING_TOPICS, VOCAB_THEMES, COUNTRY_CONTENT,
} from '@/data/english-international';

// ── Country definitions ──
const COUNTRIES = [
  { id: 'uk', flag: '🇬🇧', name: 'United Kingdom', nameVi: 'Vương Quốc Anh', framework: 'cambridge',
    color: '#1e3a8a', gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
    desc: 'Cambridge Primary English — Chuẩn quốc tế hàng đầu',
    skills: ['Reading', 'Writing', 'Speaking & Listening', 'Phonics', 'Grammar'] },
  { id: 'us', flag: '🇺🇸', name: 'United States', nameVi: 'Hoa Kỳ', framework: 'common_core',
    color: '#991b1b', gradient: 'linear-gradient(135deg, #991b1b, #ef4444)',
    desc: 'Common Core State Standards — ELA K-5',
    skills: ['Reading Foundations', 'Writing', 'Language', 'Speaking & Listening'] },
  { id: 'au', flag: '🇦🇺', name: 'Australia', nameVi: 'Úc', framework: 'australian',
    color: '#14532d', gradient: 'linear-gradient(135deg, #14532d, #22c55e)',
    desc: 'Australian Curriculum — English F-6',
    skills: ['Language', 'Literature', 'Literacy', 'Creating Texts'] },
  { id: 'fi', flag: '🇫🇮', name: 'Finland', nameVi: 'Phần Lan', framework: 'finnish',
    color: '#1e40af', gradient: 'linear-gradient(135deg, #1e40af, #60a5fa)',
    desc: 'Finnish National Core Curriculum — #1 PISA Education',
    skills: ['Communication', 'Cultural Awareness', 'Nature-Based Learning'] },
  { id: 'sg', flag: '🇸🇬', name: 'Singapore', nameVi: 'Singapore', framework: 'singapore',
    color: '#9f1239', gradient: 'linear-gradient(135deg, #9f1239, #fb7185)',
    desc: 'STELLAR Programme — Top ASEAN Education',
    skills: ['Shared Reading', 'Writing Process', 'Oral Communication'] },
  { id: 'ca', flag: '🇨🇦', name: 'Canada', nameVi: 'Canada', framework: 'canadian',
    color: '#7f1d1d', gradient: 'linear-gradient(135deg, #7f1d1d, #f87171)',
    desc: 'Canadian Common Framework — Bilingual Excellence',
    skills: ['Reading', 'Writing', 'Oral Communication', 'Media Literacy'] },
] as const;

type CountryId = typeof COUNTRIES[number]['id'];

// Category definitions
const CATEGORIES = [
  { key: 'phonics', icon: '🔤', name: 'Phonics', nameVi: 'Ngữ âm' },
  { key: 'grammar', icon: '📝', name: 'Grammar', nameVi: 'Ngữ pháp' },
  { key: 'reading', icon: '📖', name: 'Reading', nameVi: 'Đọc hiểu' },
  { key: 'writing', icon: '✍️', name: 'Writing', nameVi: 'Viết' },
  { key: 'listening', icon: '🎧', name: 'Listening & Speaking', nameVi: 'Nghe & Nói' },
  { key: 'vocabulary', icon: '📚', name: 'Vocabulary', nameVi: 'Từ vựng' },
  { key: 'culture', icon: '🌍', name: 'Culture', nameVi: 'Văn hóa' },
  { key: 'sightwords', icon: '⚡', name: 'Sight Words', nameVi: 'Từ thông dụng' },
] as const;

function getCountryTopics(framework: string, grade: number) {
  const topics: { key: string; name: string; nameVi: string; category: string; grade: number }[] = [];

  PHONICS_LEVELS.filter(l => l.framework === framework && l.grade <= grade).forEach(l =>
    topics.push({ key: l.levelId, name: l.title, nameVi: l.titleVi, category: 'phonics', grade: l.grade }));
  GRAMMAR_TOPICS.filter(t => t.framework === framework && t.grade <= grade).forEach(t =>
    topics.push({ key: t.topicId, name: t.title, nameVi: t.titleVi, category: 'grammar', grade: t.grade }));
  READING_PASSAGES.filter(p => p.framework === framework && p.grade <= grade).forEach(p =>
    topics.push({ key: p.passageId, name: p.title, nameVi: p.titleVi, category: 'reading', grade: p.grade }));
  WRITING_TOPICS.filter(w => w.framework === framework && w.grade <= grade).forEach(w =>
    topics.push({ key: w.topicId, name: w.title, nameVi: w.titleVi, category: 'writing', grade: w.grade }));
  LISTENING_SPEAKING_TOPICS.filter(l => l.framework === framework && l.grade <= grade).forEach(l =>
    topics.push({ key: l.topicId, name: l.title, nameVi: l.titleVi, category: 'listening', grade: l.grade }));
  VOCAB_THEMES.filter(v => v.framework === framework && v.grade <= grade).forEach(v =>
    topics.push({ key: v.themeId, name: v.title, nameVi: v.titleVi, category: 'vocabulary', grade: v.grade }));
  COUNTRY_CONTENT.filter(c => c.framework === framework && c.grade <= grade).forEach(c =>
    topics.push({ key: c.contentId, name: c.title, nameVi: c.titleVi, category: 'culture', grade: c.grade }));

  return topics;
}

export default function InternationalPage() {
  const [selectedCountry, setSelectedCountry] = useState<CountryId | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const grade = (useAppStore.getState().childProfile as { gradeLevel?: number } | null)?.gradeLevel || 3;

  const country = COUNTRIES.find(c => c.id === selectedCountry);
  const topics = country ? getCountryTopics(country.framework, grade) : [];
  const filteredTopics = selectedCategory
    ? topics.filter(t => t.category === selectedCategory)
    : topics;
  const categoryCounts = CATEGORIES.map(cat => ({
    ...cat,
    count: topics.filter(t => t.category === cat.key).length,
  })).filter(c => c.count > 0);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)' }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Link href="/child" style={{ color: '#94a3b8', display: 'flex' }}><ArrowLeft size={24} /></Link>
        <Globe2 size={28} color="#60a5fa" />
        <div>
          <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 700, margin: 0 }}>
            International Curriculum 🌍
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>
            Giáo trình quốc tế — Sẵn sàng du học từ lớp {grade}
          </p>
        </div>
      </div>

      <div style={{ padding: '20px', maxWidth: 900, margin: '0 auto' }}>
        {/* Country Selector */}
        {!selectedCountry && (
          <>
            <h2 style={{ color: '#e2e8f0', fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
              🗺️ Chọn giáo trình quốc gia
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
              {COUNTRIES.map(c => {
                const cTopics = getCountryTopics(c.framework, grade);
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCountry(c.id)}
                    style={{
                      background: c.gradient, border: 'none', borderRadius: 16, padding: '24px 20px',
                      cursor: 'pointer', textAlign: 'left', transition: 'transform 0.2s, box-shadow 0.2s',
                      position: 'relative', overflow: 'hidden',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 40px ${c.color}60`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{ fontSize: 48, marginBottom: 12 }}>{c.flag}</div>
                    <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>{c.name}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, margin: '0 0 12px' }}>{c.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
                      {c.skills.map(s => (
                        <span key={s} style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 11, padding: '2px 8px', borderRadius: 12 }}>{s}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: 600 }}>
                        {cTopics.length} bài học
                      </span>
                      <ChevronRight size={20} color="rgba(255,255,255,0.8)" />
                    </div>
                    <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                  </button>
                );
              })}
            </div>

            {/* Stats bar */}
            <div style={{ marginTop: 24, padding: '16px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                <div>
                  <div style={{ color: '#60a5fa', fontSize: 28, fontWeight: 700 }}>6</div>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>Quốc gia</div>
                </div>
                <div>
                  <div style={{ color: '#34d399', fontSize: 28, fontWeight: 700 }}>221</div>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>Bài học</div>
                </div>
                <div>
                  <div style={{ color: '#fbbf24', fontSize: 28, fontWeight: 700 }}>8</div>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>Kỹ năng</div>
                </div>
                <div>
                  <div style={{ color: '#fb7185', fontSize: 28, fontWeight: 700 }}>G1-G5</div>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>Lớp</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Country Detail View */}
        {selectedCountry && country && (
          <>
            {/* Country header */}
            <button
              onClick={() => { setSelectedCountry(null); setSelectedCategory(null); }}
              style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, padding: 0 }}
            >
              <ArrowLeft size={16} /> Quay lại danh sách quốc gia
            </button>

            <div style={{ background: country.gradient, borderRadius: 16, padding: '24px 20px', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 56 }}>{country.flag}</span>
                <div>
                  <h2 style={{ color: '#fff', fontSize: 24, fontWeight: 700, margin: 0 }}>{country.name}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, margin: '4px 0 0' }}>{country.desc}</p>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, margin: '4px 0 0' }}>
                    📊 {topics.length} bài học cho lớp {grade} | {categoryCounts.length} danh mục
                  </p>
                </div>
              </div>
            </div>

            {/* Category filter */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              <button
                onClick={() => setSelectedCategory(null)}
                style={{
                  background: !selectedCategory ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                  color: '#fff', border: 'none', borderRadius: 20, padding: '8px 16px',
                  fontSize: 13, cursor: 'pointer', fontWeight: !selectedCategory ? 600 : 400,
                }}
              >
                Tất cả ({topics.length})
              </button>
              {categoryCounts.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  style={{
                    background: selectedCategory === cat.key ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                    color: '#fff', border: 'none', borderRadius: 20, padding: '8px 16px',
                    fontSize: 13, cursor: 'pointer', fontWeight: selectedCategory === cat.key ? 600 : 400,
                  }}
                >
                  {cat.icon} {cat.nameVi} ({cat.count})
                </button>
              ))}
            </div>

            {/* Topics list grouped by grade */}
            {[1, 2, 3, 4, 5].filter(g => g <= grade && filteredTopics.some(t => t.grade === g)).map(g => (
              <div key={g} style={{ marginBottom: 24 }}>
                <h3 style={{ color: '#94a3b8', fontSize: 14, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Grade {g} — Lớp {g}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {filteredTopics.filter(t => t.grade === g).map(topic => {
                    const catInfo = CATEGORIES.find(c => c.key === topic.category);
                    return (
                      <Link
                        key={topic.key}
                        href={`/child/learn?subject=english&topic=${topic.key}`}
                        style={{
                          background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '14px 16px',
                          display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none',
                          border: '1px solid rgba(255,255,255,0.08)', transition: 'background 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                      >
                        <span style={{ fontSize: 24, width: 36, textAlign: 'center' }}>{catInfo?.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ color: '#e2e8f0', fontSize: 15, fontWeight: 500 }}>{topic.name}</div>
                          <div style={{ color: '#64748b', fontSize: 12 }}>{topic.nameVi}</div>
                        </div>
                        <span style={{
                          background: 'rgba(96,165,250,0.15)', color: '#60a5fa',
                          fontSize: 11, padding: '3px 10px', borderRadius: 12, fontWeight: 500,
                        }}>
                          {catInfo?.name}
                        </span>
                        <ChevronRight size={16} color="#475569" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {filteredTopics.length === 0 && (
              <div style={{ textAlign: 'center', padding: 40, color: '#64748b' }}>
                <Globe2 size={48} style={{ marginBottom: 12, opacity: 0.5 }} />
                <p>Chưa có bài học cho danh mục này ở lớp {grade}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
