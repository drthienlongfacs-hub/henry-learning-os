/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Globe2, ChevronRight, Lightbulb, Trophy, Zap, BookOpen, BarChart3 } from 'lucide-react';
import {
  PHONICS_LEVELS, GRAMMAR_TOPICS, READING_PASSAGES,
  WRITING_TOPICS, LISTENING_SPEAKING_TOPICS, VOCAB_THEMES, COUNTRY_CONTENT,
  CAMBRIDGE_UNITS, US_WONDERS_UNITS, AUSTRALIAN_UNITS, FINNISH_UNITS,
  SINGAPORE_UNITS, CANADIAN_UNITS, LEARNING_TIPS,
  type CountryUnit,
} from '@/data/english-international';
import {
  getFrameworkCoverageSummary,
  type InternationalFrameworkKey,
} from '@/data/international-curriculum-coverage';
import { getFrameworkSourcePlan } from '@/data/international-curriculum-source-registry';
import { EXAM_PRACTICE_BANK_STATS } from '@/data/practice-test-bank';
import { CAMBRIDGE_EXAM_SPECS, type CambridgeExamLevelId } from '@/data/cambridge-official-framework';
import { getOverallExamSummary, type OverallExamSummary } from '@/lib/exam-analytics';

const UNIT_MAP: Record<string, CountryUnit[]> = {
  cambridge: CAMBRIDGE_UNITS, common_core: US_WONDERS_UNITS, australian: AUSTRALIAN_UNITS,
  finnish: FINNISH_UNITS, singapore: SINGAPORE_UNITS, canadian: CANADIAN_UNITS,
};
const getTips = (fw: string) => LEARNING_TIPS.find(t => t.framework === fw);

// ── Country definitions ──
const COUNTRIES = [
  { id: 'uk', flag: '🇬🇧', name: 'United Kingdom', nameVi: 'Vương Quốc Anh', framework: 'cambridge',
    color: '#1e3a8a', gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
    desc: 'Cambridge Primary English & Chứng chỉ Starters → PET',
    skills: ['Reading', 'Writing', 'Speaking & Listening', 'Phonics', 'Grammar'] },
  { id: 'us', flag: '🇺🇸', name: 'United States', nameVi: 'Hoa Kỳ', framework: 'common_core',
    color: '#991b1b', gradient: 'linear-gradient(135deg, #991b1b, #ef4444)',
    desc: 'Common Core State Standards — Tiếng Anh Mỹ K–5',
    skills: ['Reading Foundations', 'Writing', 'Language', 'Speaking & Listening'] },
  { id: 'au', flag: '🇦🇺', name: 'Australia', nameVi: 'Úc', framework: 'australian',
    color: '#14532d', gradient: 'linear-gradient(135deg, #14532d, #22c55e)',
    desc: 'Australian Curriculum — Ngôn ngữ, Văn học & Đọc viết',
    skills: ['Language', 'Literature', 'Literacy', 'Creating Texts'] },
  { id: 'fi', flag: '🇫🇮', name: 'Finland', nameVi: 'Phần Lan', framework: 'finnish',
    color: '#1e40af', gradient: 'linear-gradient(135deg, #1e40af, #60a5fa)',
    desc: 'Finnish National Core Curriculum — Giao tiếp & Tư duy mở',
    skills: ['Communication', 'Cultural Awareness', 'Nature-Based Learning'] },
  { id: 'sg', flag: '🇸🇬', name: 'Singapore', nameVi: 'Singapore', framework: 'singapore',
    color: '#9f1239', gradient: 'linear-gradient(135deg, #9f1239, #fb7185)',
    desc: 'STELLAR Programme — Đọc hiểu sâu & Diễn đạt chuẩn',
    skills: ['Shared Reading', 'Writing Process', 'Oral Communication'] },
  { id: 'ca', flag: '🇨🇦', name: 'Canada', nameVi: 'Canada', framework: 'canadian',
    color: '#7f1d1d', gradient: 'linear-gradient(135deg, #7f1d1d, #f87171)',
    desc: 'Canadian Curriculum — Đọc viết & Truyền thông học đường',
    skills: ['Reading', 'Writing', 'Oral Communication', 'Media Literacy'] },
] as const;

type CountryId = typeof COUNTRIES[number]['id'];

const CAMBRIDGE_QUICK_LEVELS: Array<{
  id: CambridgeExamLevelId;
  icon: string;
  title: string;
  cefr: string;
  grades: string;
  accent: string;
}> = [
  { id: 'starters', icon: '🌟', title: 'Starters', cefr: 'Pre-A1', grades: 'Lớp 1–2', accent: '#22c55e' },
  { id: 'movers', icon: '🚀', title: 'Movers', cefr: 'A1', grades: 'Lớp 3–4', accent: '#3b82f6' },
  { id: 'flyers', icon: '🦅', title: 'Flyers', cefr: 'A2', grades: 'Lớp 4–5', accent: '#f59e0b' },
  { id: 'ket', icon: '🔑', title: 'A2 Key (KET)', cefr: 'A2+', grades: 'Lớp 5–7', accent: '#ef4444' },
  { id: 'pet', icon: '📋', title: 'B1 Preliminary (PET)', cefr: 'B1', grades: 'Lớp 6–9', accent: '#a855f7' },
];

// Category definitions
const CATEGORIES = [
  { key: 'textbook', icon: '📕', name: 'Textbook Units', nameVi: 'Bài SGK' },
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
  const topics: { key: string; name: string; nameVi: string; category: string; grade: number; unitNum?: number }[] = [];

  const units = UNIT_MAP[framework] || [];
  units.filter(u => u.grade <= grade).forEach(u =>
    topics.push({ key: u.unitId, name: `Unit ${u.unitNumber}: ${u.title}`, nameVi: u.titleVi, category: 'textbook', grade: u.grade, unitNum: u.unitNumber }));

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

function InternationalPageContent() {
  const searchParams = useSearchParams();
  const [selectedCountry, setSelectedCountry] = useState<CountryId | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [examSummary, setExamSummary] = useState<OverallExamSummary | null>(null);
  const grade = 5;

  useEffect(() => {
    const urlCountry = searchParams.get('country') as CountryId | null;
    if (urlCountry && COUNTRIES.some(c => c.id === urlCountry)) {
      setSelectedCountry(urlCountry);
    }
    setExamSummary(getOverallExamSummary());
  }, [searchParams]);

  const country = COUNTRIES.find(c => c.id === selectedCountry);
  const topics = country ? getCountryTopics(country.framework, grade) : [];
  const filteredTopics = selectedCategory
    ? topics.filter(t => t.category === selectedCategory)
    : topics;
  const categoryCounts = CATEGORIES.map(cat => ({
    ...cat,
    count: topics.filter(t => t.category === cat.key).length,
  })).filter(c => c.count > 0);
  const countryCoverage = country ? getFrameworkCoverageSummary(country.framework as InternationalFrameworkKey) : null;
  const countrySourcePlan = country ? getFrameworkSourcePlan(country.framework as InternationalFrameworkKey) : null;
  const allCoverage = COUNTRIES.map(c => getFrameworkCoverageSummary(c.framework as InternationalFrameworkKey));
  const totalTextbookUnits = allCoverage.reduce((sum, summary) => sum + summary.totalUnits, 0);
  const totalBenchmarkedUnits = allCoverage.reduce((sum, summary) => sum + summary.benchmarkedUnits, 0);
  const totalLearningItems = COUNTRIES.reduce((sum, c) => sum + getCountryTopics(c.framework, grade).length, 0);

  const renderExamGatewaySection = (compact = false) => (
    <section
      aria-label="Thi thử và hướng dẫn Cambridge"
      style={{
        marginBottom: 24,
        padding: compact ? '16px' : '20px',
        borderRadius: 18,
        background: 'linear-gradient(135deg, rgba(30,58,138,0.65), rgba(49,46,129,0.72), rgba(15,23,42,0.88))',
        border: '1px solid rgba(96,165,250,0.3)',
        boxShadow: '0 10px 30px rgba(15,23,42,0.35)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap', marginBottom: 14 }}>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Trophy size={22} color="#fbbf24" />
            <h2 style={{ color: '#fff', fontSize: compact ? 17 : 19, fontWeight: 800, margin: 0 }}>
              Thi thử & Chiến lược giải đề Cambridge (Starters → PET)
            </h2>
          </div>
          <p style={{ color: '#cbd5e1', fontSize: 13, margin: 0, lineHeight: 1.55 }}>
            {EXAM_PRACTICE_BANK_STATS.fullPracticeSetCount} bộ đề tự luyện bám cấu trúc Cambridge chính thức ({EXAM_PRACTICE_BANK_STATS.generatedSetCountPerLevel} bộ/cấp), kèm đáp án chi tiết, hướng dẫn giải đề 3–5 bước thực chứng và theo dõi điểm yếu theo dữ liệu làm bài thật.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <Link
            href="/child/exams"
            style={{
              minHeight: 38,
              padding: '8px 14px',
              borderRadius: 10,
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#fff',
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Zap size={16} /> Trung tâm Thi thử
          </Link>
          <Link
            href="/child/cambridge-exams"
            style={{
              minHeight: 38,
              padding: '8px 14px',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#e2e8f0',
              textDecoration: 'none',
              fontSize: 12,
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            📋 Full-Paper KET / PET
          </Link>
        </div>
      </div>

      {/* Real Data-Driven Summary Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          flexWrap: 'wrap',
          padding: '10px 14px',
          borderRadius: 12,
          background: 'rgba(15,23,42,0.5)',
          border: '1px solid rgba(148,163,184,0.2)',
          marginBottom: 14,
          fontSize: 12,
          color: '#e2e8f0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, color: '#38bdf8' }}>
          <BarChart3 size={16} />
          {examSummary && examSummary.totalAttempts > 0
            ? `Dữ liệu thực tế: Đã làm ${examSummary.totalAttempts} lượt (${examSummary.uniqueTestsCompleted} bài) • Chính xác TB ${examSummary.averageAccuracyPct}%`
            : 'Dữ liệu thực tế: Chưa có lượt thi nào — chọn cấp độ bên dưới để làm bài đầu tiên'}
        </div>
        <span style={{ color: '#94a3b8', fontSize: 11 }}>
          Tự động lưu lịch sử, nhận diện Part yếu & mở bài luyện lại câu sai
        </span>
      </div>

      {/* 5 Cambridge Level Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10 }}>
        {CAMBRIDGE_QUICK_LEVELS.map(lv => {
          const spec = CAMBRIDGE_EXAM_SPECS[lv.id];
          const lvStat = examSummary?.byLevel[lv.id];
          const totalQCount = spec.components.reduce((s, c) => s + c.questions, 0);
          return (
            <div
              key={lv.id}
              style={{
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 14,
                padding: '12px',
                border: `1px solid ${lv.accent}44`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 8,
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 22 }}>{lv.icon}</span>
                  <span style={{ fontSize: 10, fontWeight: 800, padding: '2px 7px', borderRadius: 999, background: `${lv.accent}28`, color: '#fff' }}>
                    {lv.cefr}
                  </span>
                </div>
                <div style={{ color: '#fff', fontSize: 14, fontWeight: 800 }}>{lv.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 2 }}>
                  {lv.grades} • {totalQCount} câu/bộ
                </div>
                {lvStat && lvStat.attemptCount > 0 && (
                  <div style={{ color: '#68d391', fontSize: 11, fontWeight: 700, marginTop: 4 }}>
                    Đã thi {lvStat.attemptCount} lượt • TB {lvStat.averageAccuracyPct}%
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <Link
                  href={`/child/exams?level=${lv.id}&mode=practice`}
                  style={{
                    minHeight: 32,
                    padding: '6px 10px',
                    borderRadius: 8,
                    background: lv.accent,
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: 12,
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                  }}
                >
                  <Zap size={13} /> Thi thử {lv.title.split(' ')[0]}
                </Link>
                <Link
                  href={`/child/exams?level=${lv.id}&mode=guide`}
                  style={{
                    minHeight: 30,
                    padding: '5px 10px',
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    color: '#e2e8f0',
                    textDecoration: 'none',
                    fontSize: 11,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                  }}
                >
                  <BookOpen size={12} /> Hướng dẫn & Mẹo
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)' }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <button
          type="button"
          onClick={() => {
            if (selectedCountry) {
              setSelectedCountry(null);
              setSelectedCategory(null);
              window.history.replaceState(null, '', window.location.pathname);
            } else {
              window.location.href = `${process.env.NODE_ENV === 'production' ? '/henry-learning-os' : ''}/child`;
            }
          }}
          aria-label="Quay lại"
          style={{ color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 32, minHeight: 32, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        ><ArrowLeft size={24} /></button>
        <Globe2 size={28} color="#60a5fa" />
        <div>
          <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 700, margin: 0 }}>
            International Curriculum 🌍
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>
            Giáo trình quốc tế & Thi thử Cambridge (Starters → PET) — Lớp 1 đến 5+
          </p>
        </div>
      </div>

      <div style={{ padding: '20px', maxWidth: 940, margin: '0 auto' }}>
        {/* Country Selector */}
        {!selectedCountry && (
          <>
            {renderExamGatewaySection(false)}

            <h2 style={{ color: '#e2e8f0', fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
              🗺️ Chọn giáo trình quốc gia — Lớp 1 đến 5
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
              {COUNTRIES.map(c => {
                const cTopics = getCountryTopics(c.framework, grade);
                const coverage = getFrameworkCoverageSummary(c.framework as InternationalFrameworkKey);
                return (
                  <button
                    type="button"
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
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, margin: '0 0 12px' }}>{c.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
                      {c.skills.map(s => (
                        <span key={s} style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', fontSize: 11, padding: '2px 8px', borderRadius: 12 }}>{s}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'rgba(255,255,255,0.95)', fontSize: 14, fontWeight: 600 }}>
                        {cTopics.length} đơn vị nội dung
                      </span>
                      <ChevronRight size={20} color="rgba(255,255,255,0.8)" />
                    </div>
                    <div style={{ marginTop: 10, color: '#fff', background: 'rgba(15,23,42,0.22)', borderRadius: 12, padding: '8px 10px', fontSize: 11, lineHeight: 1.45 }}>
                      <div style={{ fontWeight: 800 }}>{coverage.statusLabelVi}</div>
                      <div>{coverage.benchmarkedUnits}/{coverage.totalUnits} unit đối chiếu chuẩn</div>
                    </div>
                    <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                  </button>
                );
              })}
            </div>

            {/* Stats bar */}
            <div style={{ marginTop: 24, padding: '16px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ color: '#60a5fa', fontSize: 28, fontWeight: 700 }}>6</div>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>Quốc gia</div>
                </div>
                <div>
                  <div style={{ color: '#34d399', fontSize: 28, fontWeight: 700 }}>{totalLearningItems}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>Đơn vị nội dung</div>
                </div>
                <div>
                  <div style={{ color: '#fbbf24', fontSize: 28, fontWeight: 700 }}>{EXAM_PRACTICE_BANK_STATS.fullPracticeSetCount}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>Bộ đề Cambridge</div>
                </div>
                <div>
                  <div style={{ color: '#c084fc', fontSize: 28, fontWeight: 700 }}>{totalBenchmarkedUnits}/{totalTextbookUnits}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>Unit đối chiếu chuẩn</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Country Detail View */}
        {selectedCountry && country && (
          <>
            <button
              type="button"
              onClick={() => { setSelectedCountry(null); setSelectedCategory(null); }}
              style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, padding: 0, minHeight: 28 }}
            >
              <ArrowLeft size={16} /> Quay lại danh sách quốc gia
            </button>

            {selectedCountry === 'uk' && renderExamGatewaySection(true)}

            {(() => { const tips = getTips(country.framework); return tips ? (
              <div style={{ background: 'rgba(251,191,36,0.1)', borderRadius: 12, padding: '16px 20px', marginBottom: 16, border: '1px solid rgba(251,191,36,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <Lightbulb size={18} color="#fbbf24" />
                  <span style={{ color: '#fbbf24', fontSize: 14, fontWeight: 600 }}>💡 Mẹo học hiệu quả</span>
                </div>
                <p style={{ color: '#e2e8f0', fontSize: 13, margin: '0 0 6px', lineHeight: 1.5 }}>📌 {tips.general}</p>
                <p style={{ color: '#94a3b8', fontSize: 12, margin: '0 0 4px' }}>🔤 Phonics: {tips.phonics}</p>
                <p style={{ color: '#94a3b8', fontSize: 12, margin: '0 0 4px' }}>✍️ Writing: {tips.writing}</p>
                <p style={{ color: '#94a3b8', fontSize: 12, margin: 0 }}>📖 Reading: {tips.reading}</p>
              </div>
            ) : null; })()}

            <div style={{ background: country.gradient, borderRadius: 16, padding: '24px 20px', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 56 }}>{country.flag}</span>
                <div>
                  <h2 style={{ color: '#fff', fontSize: 24, fontWeight: 700, margin: 0 }}>{country.name}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, margin: '4px 0 0' }}>{country.desc}</p>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, margin: '4px 0 0' }}>
                    📊 {topics.length} đơn vị nội dung đến lớp {grade} | {categoryCounts.length} danh mục
                  </p>
                </div>
              </div>
            </div>

            {countryCoverage && (
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '14px 16px', marginBottom: 16, border: '1px solid rgba(255,255,255,0.12)' }}>
                <div style={{ color: '#fbbf24', fontSize: 13, fontWeight: 900, marginBottom: 6 }}>Evidence gate</div>
                <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 800 }}>{countryCoverage.statusLabelVi}</div>
                <div style={{ color: '#94a3b8', fontSize: 12, lineHeight: 1.55, marginTop: 6 }}>
                  {countryCoverage.statusDetailVi} Đã đối chiếu: {countryCoverage.benchmarkedUnits}/{countryCoverage.totalUnits} unit.
                </div>
                {countrySourcePlan && (
                  <div style={{ color: '#cbd5e1', fontSize: 12, lineHeight: 1.55, marginTop: 8 }}>
                    Nguồn hợp lệ: {countrySourcePlan.benchmarkSources.length} chuẩn chính thức, {countrySourcePlan.textSources.length} nguồn văn bản mở,{' '}
                    {countrySourcePlan.practiceSources.length} nguồn phương pháp học.
                  </div>
                )}
              </div>
            )}

            {/* Category filter */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                style={{
                  background: !selectedCategory ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                  color: '#fff', border: 'none', borderRadius: 20, padding: '8px 16px',
                  fontSize: 13, cursor: 'pointer', fontWeight: !selectedCategory ? 600 : 400, minHeight: 34,
                }}
              >
                Tất cả ({topics.length})
              </button>
              {categoryCounts.map(cat => (
                <button
                  type="button"
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  style={{
                    background: selectedCategory === cat.key ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                    color: '#fff', border: 'none', borderRadius: 20, padding: '8px 16px',
                    fontSize: 13, cursor: 'pointer', fontWeight: selectedCategory === cat.key ? 600 : 400, minHeight: 34,
                  }}
                >
                  {cat.icon} {cat.nameVi} ({cat.count})
                </button>
              ))}
            </div>

            {/* Topics list grouped by grade */}
            {[1, 2, 3, 4, 5].filter(g => filteredTopics.some(t => t.grade === g)).map(g => (
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
                          border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(96,165,250,0.3)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                      >
                        <span style={{ fontSize: 24, width: 36, textAlign: 'center' }}>{catInfo?.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ color: '#e2e8f0', fontSize: 15, fontWeight: 500 }}>{topic.name}</div>
                          <div style={{ color: '#64748b', fontSize: 12 }}>{topic.nameVi}</div>
                        </div>
                        <span style={{
                          background: 'rgba(34,197,94,0.15)', color: '#4ade80',
                          fontSize: 11, padding: '3px 10px', borderRadius: 12, fontWeight: 500,
                        }}>
                          ▶ Luyện tập
                        </span>
                        <ChevronRight size={16} color="#4ade80" />
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

export default function InternationalPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>Loading...</div>}>
      <InternationalPageContent />
    </Suspense>
  );
}
