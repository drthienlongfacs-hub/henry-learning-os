'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  ArrowLeft, Home, BookOpen, RotateCcw, Brain,
  Trophy, Target, Clock, ChevronRight, GraduationCap,
  Zap, Award, Shield,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { LangToggle } from '@/components/LangToggle';
import { CAMBRIDGE_EXAM_CLAIM_GUARDRAIL, CAMBRIDGE_EXAM_FRAMEWORK_STATS } from '@/data/cambridge-official-framework';
import { EXAM_PRACTICE_BANK_STATS } from '@/data/practice-test-bank';

const ExamPrepGuide = dynamic(() => import('@/components/ExamPrepGuide'), { ssr: false });
const PracticeTestEngine = dynamic(() => import('@/components/PracticeTestEngine'), { ssr: false });

// ── Exam level config ──
const EXAM_LEVELS = [
  {
    id: 'starters',
    name: 'Starters',
    nameVi: 'Starters',
    cefr: 'Pre-A1',
    icon: '🌟',
    color: '#22c55e',
    gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
    ageRange: '6-8',
    gradeRange: '1-2',
    desc: 'Bước đầu tiên trong hành trình Cambridge',
    descEn: 'First step in Cambridge journey',
    skills: ['Listening', 'Reading & Writing', 'Speaking'],
    totalHours: '~100h',
  },
  {
    id: 'movers',
    name: 'Movers',
    nameVi: 'Movers',
    cefr: 'A1',
    icon: '🚀',
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    ageRange: '8-10',
    gradeRange: '3-4',
    desc: 'Nâng cao kỹ năng với từ vựng phong phú',
    descEn: 'Build skills with richer vocabulary',
    skills: ['Listening', 'Reading & Writing', 'Speaking'],
    totalHours: '~175h',
  },
  {
    id: 'flyers',
    name: 'Flyers',
    nameVi: 'Flyers',
    cefr: 'A2',
    icon: '🦅',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    ageRange: '10-12',
    gradeRange: '4-5',
    desc: 'Trình độ cao nhất của YLE — sẵn sàng KET',
    descEn: 'Highest YLE level — KET ready',
    skills: ['Listening', 'Reading & Writing', 'Speaking'],
    totalHours: '~250h',
  },
  {
    id: 'ket',
    name: 'KET (Key)',
    nameVi: 'KET',
    cefr: 'A2+',
    icon: '🔑',
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
    ageRange: '11-14',
    gradeRange: '5-7',
    desc: 'Chứng chỉ quốc tế đầu tiên — Cambridge A2 Key',
    descEn: 'First international certificate — Cambridge A2 Key',
    skills: ['Reading', 'Writing', 'Listening', 'Speaking'],
    totalHours: '~350h',
  },
  {
    id: 'pet',
    name: 'PET (Preliminary)',
    nameVi: 'PET',
    cefr: 'B1',
    icon: '📋',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    ageRange: '12-16',
    gradeRange: '6-9',
    desc: 'Trình độ B1 — giao tiếp độc lập, du học sẵn sàng',
    descEn: 'B1 level — independent communication, study abroad ready',
    skills: ['Reading', 'Writing', 'Listening', 'Speaking'],
    totalHours: '~500h',
  },
] as const;

type ExamView = 'hub' | 'guide' | 'practice';

function ExamsPageContent() {
  const { t, lang } = useTranslation();
  const [view, setView] = useState<ExamView>('hub');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [gradeForGuide, setGradeForGuide] = useState(1);

  // Map level to grade for ExamPrepGuide
  const levelToGrade: Record<string, number> = {
    starters: 1, movers: 3, flyers: 5, ket: 6, pet: 7,
  };

  const handleSelectLevel = (levelId: string, viewMode: ExamView) => {
    setSelectedLevel(levelId);
    setGradeForGuide(levelToGrade[levelId] || 1);
    setView(viewMode);
  };

  const level = EXAM_LEVELS.find(l => l.id === selectedLevel);

  return (
    <div style={{
      paddingBottom: '5.5rem',
      minHeight: '100dvh',
      background: 'linear-gradient(180deg, #0f172a 0%, #1e1b4b 40%, #1e293b 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative elements */}
      <div style={{
        position: 'absolute', top: -80, right: -60, width: 250, height: 250,
        borderRadius: '50%', background: 'rgba(99,102,241,0.08)',
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 100, left: -80, width: 200, height: 200,
        borderRadius: '50%', background: 'rgba(168,85,247,0.06)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 1.25rem' }}>
        {/* ═══ Header ═══ */}
        <div style={{
          padding: '1.25rem 0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          marginBottom: '1.25rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {view !== 'hub' ? (
              <button
                onClick={() => { setView('hub'); setSelectedLevel(null); }}
                style={{
                  background: 'rgba(255,255,255,0.06)', border: 'none',
                  borderRadius: 10, padding: '0.5rem', cursor: 'pointer',
                  color: '#94a3b8', display: 'flex',
                }}
              >
                <ArrowLeft size={20} />
              </button>
            ) : (
              <Link href="/child" style={{
                background: 'rgba(255,255,255,0.06)', border: 'none',
                borderRadius: 10, padding: '0.5rem', cursor: 'pointer',
                color: '#94a3b8', display: 'flex', textDecoration: 'none',
              }}>
                <ArrowLeft size={20} />
              </Link>
            )}
            <div>
              <h1 style={{
                color: '#fff', fontSize: '1.35rem', fontWeight: 800, margin: 0,
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}>
                <Trophy size={22} color="#fbbf24" />
                {view === 'hub' ? 'Cambridge Exams' : level?.name}
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '0.75rem', margin: '0.15rem 0 0' }}>
                {view === 'hub'
                  ? (lang === 'vi' ? 'Luyện thi Cambridge — từ Starters đến PET' : 'Cambridge exam prep — Starters to PET')
                  : level?.cefr + ' • ' + (lang === 'vi' ? level?.desc : level?.descEn)
                }
              </p>
            </div>
          </div>
          <LangToggle />
        </div>

        {/* ═══ HUB VIEW — Exam Level Cards ═══ */}
        {view === 'hub' && (
          <>
            {/* Hero stats */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem',
              marginBottom: '1.5rem',
            }}>
              {[
                { icon: <GraduationCap size={16} />, val: '5', label: 'Trình độ', color: '#6366f1' },
                { icon: <Target size={16} />, val: 'Pre-A1→B1', label: 'CEFR', color: '#22c55e' },
                { icon: <Clock size={16} />, val: '~1375h', label: 'Tổng giờ học', color: '#f59e0b' },
                { icon: <Award size={16} />, val: '5', label: 'Chứng chỉ', color: '#ef4444' },
              ].map((s, i) => (
                <div key={i} style={{
                  textAlign: 'center', padding: '0.75rem 0.5rem',
                  background: `${s.color}10`, borderRadius: 14,
                  border: `1px solid ${s.color}20`,
                }}>
                  <div style={{ color: s.color, marginBottom: '0.25rem', display: 'flex', justifyContent: 'center' }}>{s.icon}</div>
                  <div style={{ fontWeight: 900, fontSize: '0.85rem', color: '#fff' }}>{s.val}</div>
                  <div style={{ fontSize: '0.6rem', color: '#94a3b8', marginTop: '0.1rem' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Pathway visualization */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.25rem', marginBottom: '1.5rem', padding: '0.75rem',
              background: 'rgba(255,255,255,0.03)', borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              {EXAM_LEVELS.map((lv, i) => (
                <div key={lv.id} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem',
                  }}>
                    <span style={{ fontSize: '1.3rem' }}>{lv.icon}</span>
                    <span style={{ fontSize: '0.55rem', color: lv.color, fontWeight: 800 }}>{lv.cefr}</span>
                  </div>
                  {i < EXAM_LEVELS.length - 1 && (
                    <ChevronRight size={14} color="rgba(255,255,255,0.2)" />
                  )}
                </div>
              ))}
            </div>

            {/* Evidence and coverage gate */}
            <div style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              background: 'rgba(15,23,42,0.72)',
              border: '1px solid rgba(148,163,184,0.18)',
              borderRadius: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                <Shield size={18} color="#38bdf8" />
                <h2 style={{ color: '#fff', fontSize: '0.95rem', margin: 0, fontWeight: 900 }}>
                  Nguồn Cambridge chính thức • 10 bộ đề mỗi cấp
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
                {[
                  { label: 'Level', value: CAMBRIDGE_EXAM_FRAMEWORK_STATS.levelCount },
                  { label: 'Full sets', value: EXAM_PRACTICE_BANK_STATS.fullPracticeSetCount },
                  { label: 'Sources', value: CAMBRIDGE_EXAM_FRAMEWORK_STATS.sourceCount },
                ].map(item => (
                  <div key={item.label} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '0.55rem' }}>
                    <div style={{ color: '#38bdf8', fontSize: '0.95rem', fontWeight: 900 }}>{item.value}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.62rem', fontWeight: 700 }}>{item.label}</div>
                  </div>
                ))}
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.72rem', lineHeight: 1.55, margin: 0 }}>
                Format chính thức đã đối chiếu ngày {CAMBRIDGE_EXAM_FRAMEWORK_STATS.verifiedAt}. Không sao chép đề chính thức:
                {' '}{CAMBRIDGE_EXAM_CLAIM_GUARDRAIL.allowedClaim}
              </p>
            </div>

            {/* Level cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {EXAM_LEVELS.map((lv) => (
                <div
                  key={lv.id}
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: 20, padding: '1.25rem',
                    border: '1px solid rgba(255,255,255,0.08)',
                    position: 'relative', overflow: 'hidden',
                    transition: 'all 0.3s',
                  }}
                >
                  {/* Background accent */}
                  <div style={{
                    position: 'absolute', top: -30, right: -30,
                    width: 100, height: 100, borderRadius: '50%',
                    background: `${lv.color}12`,
                    filter: 'blur(20px)', pointerEvents: 'none',
                  }} />

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', position: 'relative' }}>
                    {/* Icon */}
                    <div style={{
                      width: 56, height: 56, borderRadius: 16,
                      background: lv.gradient,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.6rem',
                      boxShadow: `0 4px 20px ${lv.color}30`,
                      flexShrink: 0,
                    }}>
                      {lv.icon}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                        <h3 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>{lv.name}</h3>
                        <span style={{
                          background: `${lv.color}20`, color: lv.color,
                          fontSize: '0.6rem', fontWeight: 800, padding: '0.15rem 0.5rem',
                          borderRadius: 6,
                        }}>{lv.cefr}</span>
                      </div>

                      <p style={{ color: '#94a3b8', fontSize: '0.75rem', margin: '0 0 0.5rem', lineHeight: 1.4 }}>
                        {lang === 'vi' ? lv.desc : lv.descEn}
                      </p>

                      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.65rem' }}>
                        <span style={{
                          fontSize: '0.6rem', color: '#cbd5e1', padding: '0.15rem 0.4rem',
                          background: 'rgba(255,255,255,0.06)', borderRadius: 4,
                        }}>
                          🎂 {lv.ageRange} tuổi
                        </span>
                        <span style={{
                          fontSize: '0.6rem', color: '#cbd5e1', padding: '0.15rem 0.4rem',
                          background: 'rgba(255,255,255,0.06)', borderRadius: 4,
                        }}>
                          📚 Lớp {lv.gradeRange}
                        </span>
                        <span style={{
                          fontSize: '0.6rem', color: '#cbd5e1', padding: '0.15rem 0.4rem',
                          background: 'rgba(255,255,255,0.06)', borderRadius: 4,
                        }}>
                          ⏱ {lv.totalHours}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleSelectLevel(lv.id, 'guide')}
                          style={{
                            flex: 1, padding: '0.55rem 0.75rem', border: 'none',
                            borderRadius: 10, cursor: 'pointer', fontSize: '0.72rem',
                            fontWeight: 700, background: `${lv.color}18`,
                            color: lv.color, display: 'flex', alignItems: 'center',
                            justifyContent: 'center', gap: '0.35rem',
                            transition: 'all 0.2s',
                          }}
                        >
                          <BookOpen size={14} /> {lang === 'vi' ? 'Hướng dẫn' : 'Guide'}
                        </button>
                        <button
                          onClick={() => handleSelectLevel(lv.id, 'practice')}
                          style={{
                            flex: 1, padding: '0.55rem 0.75rem', border: 'none',
                            borderRadius: 10, cursor: 'pointer', fontSize: '0.72rem',
                            fontWeight: 700, background: lv.gradient,
                            color: '#fff', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', gap: '0.35rem',
                            boxShadow: `0 2px 12px ${lv.color}30`,
                            transition: 'all 0.2s',
                          }}
                        >
                          <Zap size={14} /> {lang === 'vi' ? 'Thi thử' : 'Practice'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cambridge info footer */}
            <div style={{
              marginTop: '1.5rem', padding: '1rem 1.25rem',
              background: 'rgba(251,191,36,0.06)', borderRadius: 16,
              border: '1px solid rgba(251,191,36,0.12)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Shield size={16} color="#fbbf24" />
                <span style={{ color: '#fbbf24', fontWeight: 700, fontSize: '0.8rem' }}>
                  {lang === 'vi' ? 'Về Cambridge Assessment' : 'About Cambridge Assessment'}
                </span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.7rem', lineHeight: 1.6, margin: 0 }}>
                {lang === 'vi'
                  ? 'App dùng nguồn Cambridge để bám cấu trúc thi, số phần và số câu. Đề luyện trong app là nội dung tự biên soạn; link đề mẫu chính thức được mở riêng để học hợp lệ.'
                  : 'The app uses Cambridge sources for structure, parts, and question counts. In-app practice is original Henry content; official samples are linked separately for authorised study.'}
              </p>
            </div>
          </>
        )}

        {/* ═══ GUIDE VIEW ═══ */}
        {view === 'guide' && (
          <div style={{ marginTop: '0.5rem' }}>
            <ExamPrepGuide grade={gradeForGuide} />
          </div>
        )}

        {/* ═══ PRACTICE VIEW ═══ */}
        {view === 'practice' && (
          <div style={{ marginTop: '0.5rem' }}>
            <PracticeTestEngine grade={gradeForGuide} />
          </div>
        )}
      </div>

      {/* ═══ Bottom Navigation ═══ */}
      <nav className="bottom-nav">
        <Link href="/child" className="nav-item"><Home size={20} /><span>{t('nav_home')}</span></Link>
        <Link href="/child/learn" className="nav-item"><BookOpen size={20} /><span>Học</span></Link>
        <Link href="/child/exams" className="nav-item active"><Trophy size={20} /><span>Exams</span></Link>
        <Link href="/child/review" className="nav-item"><RotateCcw size={20} /><span>{t('nav_review')}</span></Link>
        <Link href="/child/mistakes" className="nav-item"><Brain size={20} /><span>{t('nav_mistakes')}</span></Link>
      </nav>
    </div>
  );
}

export default function ExamsPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh', background: '#0f172a',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8',
      }}>
        Loading...
      </div>
    }>
      <ExamsPageContent />
    </Suspense>
  );
}
