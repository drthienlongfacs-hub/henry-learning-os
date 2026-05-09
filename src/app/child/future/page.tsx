'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Lightbulb, Trophy, CheckCircle, Star, Play, BookOpen } from 'lucide-react';
import { FUTURE_SKILL_AXES, BLUE_OCEAN_PROFILE } from '@/data/future-skills';
import { ACTIVITY_CONTENT } from '@/data/future-skills-content';
import { ACTIVITY_GAMES, ACTIVITY_SAMPLES } from '@/data/future-skills-games';
import { SortingGame, SequenceGame, MatchingGame, DebateGame, ProgressRing, SampleGallery, StarRating } from '@/components/future/InteractiveGames';

type View = 'home' | 'axis' | 'activity';
type FutureCompetition = (typeof FUTURE_SKILL_AXES)[number]['competitions'][number];
type FutureFramework = (typeof FUTURE_SKILL_AXES)[number]['frameworks'][number];
type FutureMilestone = (typeof FUTURE_SKILL_AXES)[number]['developmentalMilestones'][number];
type SortingGameConfig = Omit<React.ComponentProps<typeof SortingGame>, 'onComplete'>;
type SequenceGameConfig = Omit<React.ComponentProps<typeof SequenceGame>, 'onComplete'>;
type MatchingGameConfig = Omit<React.ComponentProps<typeof MatchingGame>, 'onComplete'>;
type DebateGameConfig = Omit<React.ComponentProps<typeof DebateGame>, 'onComplete'>;

function getProgress(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem('fs_progress') || '{}'); } catch { return {}; }
}
function markDone(key: string) { const p = getProgress(); p[key] = true; localStorage.setItem('fs_progress', JSON.stringify(p)); }
function getGrade(): number {
  if (typeof window === 'undefined') return 1;
  try { const s = localStorage.getItem('app-store'); if (s) { const d = JSON.parse(s); return d?.state?.childProfile?.gradeLevel || 1; } } catch {} return 1;
}

export default function FutureSkillsPage() {
  const [view, setView] = useState<View>('home');
  const [axisId, setAxisId] = useState<string | null>(null);
  const [actKey, setActKey] = useState<string | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [progress, setProgress] = useState<Record<string, boolean>>(() => getProgress());
  const [grade] = useState(() => getGrade());
  const [gameScore, setGameScore] = useState<number | null>(null);
  const [selectedCompetition, setSelectedCompetition] = useState<FutureCompetition | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<FutureFramework | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<FutureMilestone | null>(null);

  const axis = FUTURE_SKILL_AXES.find(a => a.id === axisId);
  const content = actKey ? (ACTIVITY_CONTENT[actKey] || {
    activityKey: actKey,
    intro: 'This is an interactive learning module designed to build future-ready competencies.',
    introVi: 'Đây là module học tập tương tác giúp phát triển các năng lực cốt lõi cho tương lai.',
    steps: [
      { instruction: 'Review the foundational theory and guidelines.', instructionVi: 'Đọc kỹ lý thuyết nền tảng và các hướng dẫn.', emoji: '📖' },
      { instruction: 'Apply this concept to a real-world scenario.', instructionVi: 'Áp dụng khái niệm này vào một tình huống thực tế.', emoji: '🌍' },
      { instruction: 'Reflect on your outcome and discuss with your family.', instructionVi: 'Suy ngẫm về kết quả và thảo luận với gia đình.', emoji: '🤔' },
    ],
    quiz: [
      {
        question: 'Why is this skill important for your future development?',
        questionVi: 'Vì sao kỹ năng này quan trọng cho sự phát triển tương lai của bạn?',
        options: ['It helps me memorize facts', 'It builds adaptability and complex problem solving', 'It is only useful for school tests', 'It is not important'],
        optionsVi: ['Nó giúp tôi học thuộc lòng', 'Nó xây dựng sự thích ứng và giải quyết vấn đề phức tạp', 'Nó chỉ hữu ích cho bài kiểm tra ở trường', 'Nó không quan trọng'],
        correct: 1,
        explanation: 'The World Economic Forum identifies adaptability and problem-solving as top skills for 2025 and beyond.',
        explanationVi: 'Diễn đàn Kinh tế Thế giới (WEF) xác định sự thích ứng và giải quyết vấn đề là kỹ năng hàng đầu cho năm 2025.'
      }
    ],
    challenge: {
      task: 'Practice this skill for 15 minutes today with a real-world project.',
      taskVi: 'Thực hành kỹ năng này 15 phút hôm nay với một dự án thực tế.',
      duration: '15 min'
    },
    realWorldLink: 'OECD Learning Compass 2030 / WEF Future of Jobs 2025'
  }) : null;
  const game = actKey ? ACTIVITY_GAMES[actKey] : undefined;
  const samples = actKey ? ACTIVITY_SAMPLES[actKey] : undefined;

  const openAxis = (id: string) => { setAxisId(id); setView('axis'); };
  const openActivity = (key: string) => { setActKey(key); setQuizIdx(0); setPicked(null); setScore(0); setStepIdx(0); setGameScore(null); setView('activity'); };
  const goBack = () => { if (view === 'activity') { setView('axis'); setActKey(null); } else if (view === 'axis') { setView('home'); setAxisId(null); } };
  const celebrate = useCallback(() => { setShowCelebration(true); setTimeout(() => setShowCelebration(false), 2500); }, []);
  const completeActivity = useCallback(() => { if (actKey) { markDone(actKey); setProgress(p => ({ ...p, [actKey]: true })); } celebrate(); }, [actKey, celebrate]);
  const totalDone = Object.keys(progress).length;
  const totalActs = Object.keys(ACTIVITY_CONTENT).length;

  const card: React.CSSProperties = { background: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: 16, border: '1px solid rgba(255,255,255,0.1)', marginBottom: 12 };
  const btnStyle = (bg: string): React.CSSProperties => ({ background: bg, border: 'none', borderRadius: 14, padding: '14px 20px', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: 15, width: '100%', transition: 'all 0.2s', letterSpacing: 0.3 });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#0f172a,#1e293b)', fontFamily: "'Inter',sans-serif" }}>
      {/* Celebration */}
      {showCelebration && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', animation: 'fadeIn 0.3s' }}>
          <div style={{ textAlign: 'center', animation: 'bounceIn 0.5s' }}>
            <div style={{ fontSize: 80 }}>🎉</div>
            <StarRating earned={3} total={3} />
            <h2 style={{ color: '#fbbf24', fontSize: 28, margin: '12px 0 4px' }}>Tuyệt vời!</h2>
            <p style={{ color: '#e2e8f0', fontSize: 16 }}>Bạn đã hoàn thành xuất sắc!</p>
          </div>
        </div>
      )}

      {/* Competition Modal — Full-Screen Deep Layer */}
      {selectedCompetition && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', animation: 'fadeIn 0.2s', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <div style={{ maxWidth: 680, margin: '0 auto', padding: '20px 16px 40px' }}>
            {/* Sticky Header */}
            <div style={{ position: 'sticky', top: 0, zIndex: 10, background: 'linear-gradient(180deg,rgba(15,23,42,0.98) 80%,transparent)', padding: '16px 0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ color: '#fbbf24', fontSize: 26, fontWeight: 800, margin: 0, lineHeight: 1.3 }}>🏆 {selectedCompetition.name}</h2>
                <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
                  <span style={{ background: 'rgba(251,191,36,0.15)', color: '#fde047', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>Tuổi: {selectedCompetition.age}</span>
                  <span style={{ background: 'rgba(56,189,248,0.15)', color: '#7dd3fc', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{selectedCompetition.value}</span>
                </div>
              </div>
              <button onClick={() => setSelectedCompetition(null)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#e2e8f0', fontSize: 20, width: 40, height: 40, borderRadius: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, backdropFilter: 'blur(8px)' }}>✕</button>
            </div>

            {/* Section 1: Đây là gì? */}
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 20, padding: 20, border: '1px solid rgba(255,255,255,0.08)', marginBottom: 16 }}>
              <h3 style={{ color: '#f8fafc', fontSize: 16, fontWeight: 800, margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>📋 Đây là gì?</h3>
              <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, margin: 0 }}>{selectedCompetition.whatItIs || selectedCompetition.description}</p>
            </div>

            {/* Section 2: Tại sao quan trọng? */}
            {selectedCompetition.whyItMatters && (
              <div style={{ background: 'rgba(139,92,246,0.08)', borderRadius: 20, padding: 20, border: '1px solid rgba(139,92,246,0.2)', marginBottom: 16 }}>
                <h3 style={{ color: '#a78bfa', fontSize: 16, fontWeight: 800, margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>🧠 Tại sao quan trọng? (Evidence-Based)</h3>
                <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, margin: 0 }}>{selectedCompetition.whyItMatters}</p>
              </div>
            )}

            {/* Section 3: Kỹ năng rèn luyện */}
            <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 20, padding: 20, border: '1px solid rgba(255,255,255,0.06)', marginBottom: 16 }}>
              <h3 style={{ color: '#f8fafc', fontSize: 16, fontWeight: 800, margin: '0 0 12px' }}>🎯 Kỹ năng rèn luyện</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {selectedCompetition.skills?.map((sk: string) => (
                  <span key={sk} style={{ background: 'rgba(251,191,36,0.12)', color: '#fde047', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, border: '1px solid rgba(251,191,36,0.2)' }}>{sk}</span>
                ))}
              </div>
            </div>

            {/* Section 4: Điều kiện tham gia */}
            {selectedCompetition.eligibility && (
              <div style={{ background: 'rgba(34,197,94,0.06)', borderRadius: 20, padding: 20, border: '1px solid rgba(34,197,94,0.15)', marginBottom: 16 }}>
                <h3 style={{ color: '#86efac', fontSize: 16, fontWeight: 800, margin: '0 0 12px' }}>✅ Điều kiện tham gia</h3>
                <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, margin: 0 }}>{selectedCompetition.eligibility}</p>
              </div>
            )}

            {/* Section 5: Chi phí thực tế */}
            {selectedCompetition.cost && (
              <div style={{ background: 'rgba(251,191,36,0.06)', borderRadius: 20, padding: 20, border: '1px solid rgba(251,191,36,0.12)', marginBottom: 16 }}>
                <h3 style={{ color: '#fbbf24', fontSize: 16, fontWeight: 800, margin: '0 0 12px' }}>💰 Chi phí thực tế</h3>
                <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, margin: 0 }}>{selectedCompetition.cost}</p>
              </div>
            )}

            {/* Section 6: Bối cảnh Việt Nam */}
            {selectedCompetition.vietnamContext && (
              <div style={{ background: 'rgba(239,68,68,0.06)', borderRadius: 20, padding: 20, border: '1px solid rgba(239,68,68,0.12)', marginBottom: 16 }}>
                <h3 style={{ color: '#fca5a5', fontSize: 16, fontWeight: 800, margin: '0 0 12px' }}>🇻🇳 Tại Việt Nam</h3>
                <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, margin: 0 }}>{selectedCompetition.vietnamContext}</p>
              </div>
            )}

            {/* Section 7: Lộ trình chuẩn bị chi tiết */}
            {selectedCompetition.preparationRoadmap && selectedCompetition.preparationRoadmap.length > 0 && (
              <div style={{ background: 'rgba(56,189,248,0.06)', borderRadius: 20, padding: 20, border: '1px solid rgba(56,189,248,0.15)', marginBottom: 16 }}>
                <h3 style={{ color: '#7dd3fc', fontSize: 16, fontWeight: 800, margin: '0 0 16px' }}>🗺️ Lộ trình chuẩn bị chi tiết</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {selectedCompetition.preparationRoadmap.map((r: { step: string; timeline: string; detail: string }, i: number) => (
                    <div key={i} style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 16, padding: 16, borderLeft: '4px solid #38bdf8' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <span style={{ color: '#f8fafc', fontSize: 14, fontWeight: 700, flex: 1 }}>{r.step}</span>
                        <span style={{ background: 'rgba(56,189,248,0.15)', color: '#7dd3fc', padding: '2px 10px', borderRadius: 12, fontSize: 11, fontWeight: 700, flexShrink: 0, marginLeft: 8 }}>{r.timeline}</span>
                      </div>
                      <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{r.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 8: Tiêu chí đánh giá */}
            {selectedCompetition.evaluationCriteria && selectedCompetition.evaluationCriteria.length > 0 && (
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 20, padding: 20, border: '1px solid rgba(255,255,255,0.06)', marginBottom: 16 }}>
                <h3 style={{ color: '#f8fafc', fontSize: 16, fontWeight: 800, margin: '0 0 12px' }}>📊 Tiêu chí đánh giá (Rubric)</h3>
                {selectedCompetition.evaluationCriteria.map((c: string, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8 }}>
                    <span style={{ color: '#fbbf24', fontSize: 14, flexShrink: 0 }}>•</span>
                    <p style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{c}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Section 9: Câu chuyện thành công */}
            {selectedCompetition.successStories && (
              <div style={{ background: 'linear-gradient(135deg,rgba(251,191,36,0.08),rgba(245,158,11,0.05))', borderRadius: 20, padding: 20, border: '1px solid rgba(251,191,36,0.15)', marginBottom: 16 }}>
                <h3 style={{ color: '#fbbf24', fontSize: 16, fontWeight: 800, margin: '0 0 12px' }}>⭐ Câu chuyện thành công</h3>
                <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, margin: 0, fontStyle: 'italic' }}>{selectedCompetition.successStories}</p>
              </div>
            )}

            {/* Section 10: Benchmark & Số liệu */}
            {selectedCompetition.benchmarkData && (
              <div style={{ background: 'rgba(99,102,241,0.06)', borderRadius: 20, padding: 20, border: '1px solid rgba(99,102,241,0.15)', marginBottom: 16 }}>
                <h3 style={{ color: '#a5b4fc', fontSize: 16, fontWeight: 800, margin: '0 0 12px' }}>📈 Benchmark & Số liệu thực tế</h3>
                <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, margin: 0 }}>{selectedCompetition.benchmarkData}</p>
              </div>
            )}

            {/* Section 11: Ba mẹ cần làm NGAY */}
            {selectedCompetition.parentActionItems && selectedCompetition.parentActionItems.length > 0 && (
              <div style={{ background: 'linear-gradient(135deg,rgba(34,197,94,0.1),rgba(16,185,129,0.06))', borderRadius: 20, padding: 20, border: '2px solid rgba(34,197,94,0.25)', marginBottom: 16 }}>
                <h3 style={{ color: '#86efac', fontSize: 16, fontWeight: 800, margin: '0 0 16px' }}>🎯 Ba mẹ cần làm NGAY</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {selectedCompetition.parentActionItems.map((item: string, i: number) => (
                    <div key={i} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: '12px 16px' }}>
                      <p style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6, margin: 0, fontWeight: 500 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
              {selectedCompetition.link && (
                <a href={selectedCompetition.link} target="_blank" rel="noopener noreferrer"
                  style={{ background: 'linear-gradient(135deg,#d97706,#fbbf24)', border: 'none', borderRadius: 16, padding: '16px', color: '#fff', fontWeight: 800, cursor: 'pointer', fontSize: 16, width: '100%', boxShadow: '0 4px 12px rgba(251,191,36,0.3)', textAlign: 'center', textDecoration: 'none', display: 'block' }}>
                  🚀 {selectedCompetition.action || 'Khám phá ngay'} — Truy cập website chính thức
                </a>
              )}
              <button onClick={() => setSelectedCompetition(null)}
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 16, padding: '14px', color: '#94a3b8', fontWeight: 700, cursor: 'pointer', fontSize: 14, width: '100%' }}>
                ← Quay lại
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Framework Modal */}
      {selectedFramework && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', animation: 'fadeIn 0.2s', padding: 20 }}>
          <div style={{ background: '#1e293b', borderRadius: 24, padding: 32, maxWidth: 600, width: '100%', border: '1px solid rgba(255,255,255,0.2)', animation: 'scaleIn 0.3s', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <h2 style={{ color: '#f8fafc', fontSize: 22, fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
                <BookOpen size={22} style={{ verticalAlign: 'middle', marginRight: 8 }} color="#94a3b8" />
                {selectedFramework.org} {selectedFramework.year}
              </h2>
              <button onClick={() => setSelectedFramework(null)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#e2e8f0', fontSize: 20, width: 36, height: 36, borderRadius: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>
            <h3 style={{ color: '#cbd5e1', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>{selectedFramework.name}</h3>
            <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, margin: '0 0 20px' }}>{selectedFramework.description}</p>
            {selectedFramework.evidenceLink && (
              <a href={selectedFramework.evidenceLink} target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: 'rgba(255,255,255,0.05)', textAlign: 'center', padding: '12px', borderRadius: 12, color: '#38bdf8', textDecoration: 'none', fontWeight: 700, fontSize: 14, border: '1px solid rgba(56,189,248,0.2)' }}>
                🔗 Xem tài liệu gốc
              </a>
            )}
          </div>
        </div>
      )}

      {/* Milestone Modal */}
      {selectedMilestone && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)', animation: 'fadeIn 0.2s', padding: 20 }}>
          <div style={{ background: '#1e293b', borderRadius: 24, padding: 32, maxWidth: 600, width: '100%', border: '1px solid rgba(56,189,248,0.3)', animation: 'scaleIn 0.3s', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <h2 style={{ color: '#38bdf8', fontSize: 22, fontWeight: 800, margin: 0, lineHeight: 1.3 }}>
                🌱 Tuổi {selectedMilestone.age}
              </h2>
              <button onClick={() => setSelectedMilestone(null)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#e2e8f0', fontSize: 20, width: 36, height: 36, borderRadius: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>
            <h3 style={{ color: '#f8fafc', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>{selectedMilestone.milestone}</h3>
            <div style={{ background: 'rgba(56,189,248,0.1)', padding: 12, borderRadius: 12, marginBottom: 16 }}>
              <p style={{ color: '#7dd3fc', fontSize: 13, margin: 0, fontStyle: 'italic', lineHeight: 1.5 }}>🔬 Dữ liệu: {selectedMilestone.evidence}</p>
            </div>
            {selectedMilestone.actionableTip && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16 }}>
                <div style={{ color: '#fbbf24', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>💡 Lời khuyên hành động:</div>
                <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0, lineHeight: 1.6 }}>{selectedMilestone.actionableTip}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)' }}>
        {view === 'home' ? (
          <Link href="/child" style={{ color: '#94a3b8', display: 'flex' }}><ArrowLeft size={24} /></Link>
        ) : (
          <button onClick={goBack} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex' }}><ArrowLeft size={24} /></button>
        )}
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#7c3aed,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🚀</div>
        <div style={{ flex: 1 }}>
          <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 800, margin: 0 }}>Future Skills</h1>
          <p style={{ color: '#94a3b8', fontSize: 11, margin: 0 }}>
            {view === 'home' && `${totalDone} / ${totalActs} hoạt động hoàn thành`}
            {view === 'axis' && axis?.nameVi}
            {view === 'activity' && actKey}
          </p>
        </div>
      </div>

      <div style={{ padding: 20, maxWidth: 700, margin: '0 auto' }}>

        {/* ═══ HOME ═══ */}
        {view === 'home' && (<>
          {/* Progress dashboard */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 20, padding: 16, background: 'rgba(255,255,255,0.04)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)' }}>
            {FUTURE_SKILL_AXES.map(ax => {
              const acts = ax.activities.filter(a => a.grade <= grade);
              const done = acts.filter(a => progress[a.title]).length;
              const pct = acts.length ? (done / acts.length) * 100 : 0;
              return <ProgressRing key={ax.id} progress={pct} color={ax.color} size={64} label={ax.icon} />;
            })}
          </div>

          {/* Blue Ocean */}
          <div style={{ background: 'linear-gradient(135deg,#1e1b4b,#312e81)', borderRadius: 20, padding: 20, marginBottom: 20, border: '1px solid rgba(129,140,248,0.3)', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3 style={{ color: '#fff', fontSize: 17, fontWeight: 800, margin: '0 0 6px' }}>🌊 {BLUE_OCEAN_PROFILE.titleVi}</h3>
              <span style={{ background: 'rgba(129,140,248,0.2)', color: '#a5b4fc', fontSize: 10, padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>EVIDENCE-BASED</span>
            </div>
            <p style={{ color: '#a5b4fc', fontSize: 13, margin: '0 0 8px', lineHeight: 1.6 }}>💎 {BLUE_OCEAN_PROFILE.formula}</p>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: 10, borderRadius: 12, marginTop: 10 }}>
              <p style={{ color: '#818cf8', fontSize: 11, margin: 0, fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle size={14} color="#818cf8" style={{ flexShrink: 0 }} />
                <span>{BLUE_OCEAN_PROFILE.advantage}</span>
              </p>
            </div>
          </div>

          {/* 5 Axes with visual cards */}
          {FUTURE_SKILL_AXES.map(ax => {
            const acts = ax.activities.filter(a => a.grade <= grade);
            const done = acts.filter(a => progress[a.title]).length;
            return (
              <button key={ax.id} onClick={() => openAxis(ax.id)} style={{
                background: ax.gradient, border: 'none', borderRadius: 20, padding: 20, cursor: 'pointer',
                textAlign: 'left', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 16, width: '100%', marginBottom: 12,
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.01)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}>
                <span style={{ fontSize: 44, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>{ax.icon}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: '#fff', fontSize: 17, fontWeight: 800, margin: '0 0 4px' }}>{ax.nameVi}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, margin: '0 0 8px' }}>{ax.descVi}</p>
                  <div style={{ display: 'flex', gap: 10, fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>
                    <span>✅ {done}/{acts.length}</span>
                    <span>🏆 {ax.competitions.length} sân chơi</span>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 6, height: 6, marginTop: 8 }}>
                    <div style={{ background: '#fff', borderRadius: 6, height: '100%', width: `${acts.length ? (done / acts.length) * 100 : 0}%`, transition: 'width 0.4s' }} />
                  </div>
                </div>
                <ChevronRight size={22} color="rgba(255,255,255,0.7)" />
              </button>
            );
          })}

          <div style={{ marginTop: 16, padding: 14, background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ color: '#64748b', fontSize: 10, margin: 0 }}>📚 Benchmark: Khan Academy Kids • ScratchJr (MIT) • Duolingo • OECD 2030 • UNESCO AI 2024 • WEF 2025</p>
          </div>
        </>)}

        {/* ═══ AXIS VIEW ═══ */}
        {view === 'axis' && axis && (<>
          <div style={{ background: axis.gradient, borderRadius: 20, padding: 24, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            <span style={{ fontSize: 52 }}>{axis.icon}</span>
            <div>
              <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 800, margin: 0 }}>{axis.nameVi}</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, margin: '4px 0 0' }}>{axis.descVi}</p>
            </div>
          </div>

          {/* Evidence Frameworks Badges */}
          {axis.frameworks && axis.frameworks.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {axis.frameworks.map((fw, i) => (
                <button key={i} onClick={() => setSelectedFramework(fw)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}>
                  <BookOpen size={12} color="#94a3b8" />
                  <span style={{ color: '#cbd5e1', fontSize: 11, fontWeight: 600 }}>{fw.org} {fw.year}:</span>
                  <span style={{ color: '#94a3b8', fontSize: 11 }}>{fw.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Developmental Milestones */}
          {axis.developmentalMilestones && axis.developmentalMilestones.length > 0 && (
            <div style={{ ...card, background: 'rgba(14,165,233,0.05)', border: '1px solid rgba(14,165,233,0.15)', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <CheckCircle size={16} color="#38bdf8" />
                <span style={{ color: '#38bdf8', fontSize: 13, fontWeight: 700 }}>Cột mốc Phát triển Thực chứng (Milestones)</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {axis.developmentalMilestones.map((m, i) => (
                  <button key={i} onClick={() => setSelectedMilestone(m)} style={{ background: 'rgba(0,0,0,0.2)', padding: '12px 16px', borderRadius: 12, border: '1px solid transparent', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(56,189,248,0.3)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>Tuổi {m.age}</span>
                      <span style={{ color: '#38bdf8', fontSize: 11, fontWeight: 600, textAlign: 'right' }}>{m.milestone}</span>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: 11, margin: 0, fontStyle: 'italic' }}>🔬 Cơ sở: {m.evidence}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ ...card, background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Lightbulb size={16} color="#fbbf24" /><span style={{ color: '#fbbf24', fontSize: 13, fontWeight: 700 }}>Chỉ dẫn Dữ liệu cho Ba mẹ</span>
            </div>
            {axis.tips.map((tip, i) => <p key={i} style={{ color: '#e2e8f0', fontSize: 12, margin: '0 0 6px', lineHeight: 1.6 }}>💡 {tip}</p>)}
          </div>

          <h3 style={{ color: '#e2e8f0', fontSize: 15, fontWeight: 700, marginBottom: 10 }}>🎮 Hoạt động tương tác (Lớp {grade})</h3>
          {axis.activities.filter(a => a.grade <= grade).map(act => {
            const hasContent = true; // All activities now have dynamic fallback content
            const hasGame = !!ACTIVITY_GAMES[act.title];
            const isDone = !!progress[act.title];
            const icons: Record<string, string> = { interactive:'🎮', project:'📁', activity:'🎯', quiz:'❓', experiment:'🧪', lesson:'📖', data:'📊', journal:'📓', discussion:'💬', thinking:'🧠', skill:'⭐', method:'🔧', presentation:'🎤', speaking:'🗣️', reading:'📚', writing:'✍️', leadership:'👑', social:'🤝', digital:'🔐', responsibility:'✅', portfolio:'📂' };
            return (
              <button key={act.title} onClick={() => openActivity(act.title)}
                style={{ ...card, display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', opacity: 1, width: '100%', textAlign: 'left', transition: 'all 0.2s', borderRadius: 16 }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = axis.color)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${axis.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                  {icons[act.type] || '📋'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700 }}>{act.titleVi}</div>
                  <div style={{ color: '#64748b', fontSize: 11, marginTop: 4, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <span>{act.title}</span>
                    {act.competencyLevel && (
                      <span style={{ 
                        background: act.competencyLevel === 'Understanding' ? 'rgba(56,189,248,0.15)' : act.competencyLevel === 'Applying' ? 'rgba(250,204,21,0.15)' : 'rgba(244,63,94,0.15)',
                        color: act.competencyLevel === 'Understanding' ? '#7dd3fc' : act.competencyLevel === 'Applying' ? '#fde047' : '#fda4af',
                        padding: '2px 8px', borderRadius: 10, fontSize: 9, fontWeight: 700, border: '1px solid rgba(255,255,255,0.05)'
                      }}>
                        {act.competencyLevel === 'Understanding' ? '🧠 Nhận thức' : act.competencyLevel === 'Applying' ? '🛠️ Ứng dụng' : '🚀 Sáng tạo'}
                      </span>
                    )}
                    {hasGame && <span style={{ background: 'rgba(139,92,246,0.2)', color: '#a78bfa', padding: '2px 6px', borderRadius: 6, fontSize: 9, fontWeight: 700 }}>🎮 Game</span>}
                  </div>
                </div>
                {isDone ? <CheckCircle size={22} color="#22c55e" /> : hasContent ? <Play size={20} color={axis.color} /> : <span style={{ color: '#475569', fontSize: 10 }}>Sắp có</span>}
              </button>
            );
          })}

          <h3 style={{ color: '#e2e8f0', fontSize: 15, fontWeight: 700, margin: '20px 0 10px' }}><Trophy size={16} color="#fbbf24" style={{ verticalAlign: 'middle', marginRight: 6 }} />Sân chơi đáng đầu tư</h3>
          {axis.competitions.map(c => (
            <button key={c.name} onClick={() => setSelectedCompetition(c)} style={{ ...card, background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.12)', width: '100%', textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s', padding: 16 }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.background = 'rgba(251,191,36,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.background = 'rgba(251,191,36,0.05)'; }}
            >
              <div style={{ color: '#fbbf24', fontSize: 15, fontWeight: 800 }}>🏆 {c.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginTop: 4 }}>Tuổi: {c.age} | {c.value}</div>
            </button>
          ))}
        </>)}

        {/* ═══ ACTIVITY VIEW ═══ */}
        {view === 'activity' && content && (<>
          {/* Hero intro */}
          <div style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.15))', borderRadius: 20, padding: 24, border: '1px solid rgba(139,92,246,0.25)', marginBottom: 16 }}>
            <BookOpen size={24} color="#a78bfa" style={{ marginBottom: 10 }} />
            <p style={{ color: '#e2e8f0', fontSize: 16, lineHeight: 1.7, margin: 0, fontWeight: 500 }}>{content.introVi}</p>
            <p style={{ color: '#94a3b8', fontSize: 12, margin: '10px 0 0', fontStyle: 'italic' }}>{content.intro}</p>
          </div>

          {/* Sample gallery */}
          {samples && <SampleGallery samples={samples} />}

          {/* Interactive Game */}
          {game && gameScore === null && (
            <>
              <h3 style={{ color: '#e2e8f0', fontSize: 16, fontWeight: 700, margin: '16px 0 10px' }}>🎮 Trò chơi tương tác</h3>
              {game.type === 'sort' && <SortingGame {...game.config as SortingGameConfig} onComplete={(s: number) => setGameScore(s)} />}
              {game.type === 'sequence' && <SequenceGame {...game.config as SequenceGameConfig} onComplete={(s: number) => setGameScore(s)} />}
              {game.type === 'match' && <MatchingGame {...game.config as MatchingGameConfig} onComplete={(s: number) => setGameScore(s)} />}
              {game.type === 'debate' && <DebateGame {...game.config as DebateGameConfig} onComplete={(s: number) => setGameScore(s)} />}
            </>
          )}
          {gameScore !== null && (
            <div style={{ background: 'rgba(34,197,94,0.1)', borderRadius: 16, padding: 16, border: '1px solid rgba(34,197,94,0.2)', marginBottom: 16, textAlign: 'center' }}>
              <StarRating earned={gameScore >= 8 ? 3 : gameScore >= 5 ? 2 : 1} total={3} />
              <p style={{ color: '#86efac', fontSize: 15, fontWeight: 700, margin: '8px 0 0' }}>🎮 Trò chơi hoàn thành! Điểm: {gameScore}</p>
            </div>
          )}

          {/* Steps */}
          <h3 style={{ color: '#e2e8f0', fontSize: 16, fontWeight: 700, margin: '16px 0 10px' }}>📝 Hướng dẫn từng bước</h3>
          {content.steps.map((s, i) => (
            <button key={i} onClick={() => setStepIdx(i)} style={{
              ...card, display: 'flex', alignItems: 'center', gap: 14, width: '100%', textAlign: 'left', cursor: 'pointer',
              background: i <= stepIdx ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.03)',
              border: i === stepIdx ? '2px solid rgba(34,197,94,0.4)' : '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, transition: 'all 0.3s',
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: i <= stepIdx ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{s.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: i <= stepIdx ? '#86efac' : '#94a3b8', fontSize: 13, fontWeight: 700 }}>Bước {i + 1}: {s.instructionVi}</div>
                <div style={{ color: '#475569', fontSize: 11, marginTop: 2 }}>{s.instruction}</div>
              </div>
              {i < stepIdx && <CheckCircle size={20} color="#22c55e" />}
              {i === stepIdx && <Star size={20} color="#fbbf24" />}
            </button>
          ))}
          {stepIdx < content.steps.length - 1 && (
            <button onClick={() => setStepIdx(s => s + 1)} style={btnStyle('linear-gradient(135deg,#7c3aed,#a78bfa)')}>Bước tiếp theo →</button>
          )}

          {/* Quiz */}
          {content.quiz && content.quiz.length > 0 && (<>
            <h3 style={{ color: '#e2e8f0', fontSize: 16, fontWeight: 700, margin: '20px 0 10px' }}>🧠 Kiểm tra hiểu biết</h3>
            {quizIdx < content.quiz.length ? (() => {
              const q = content.quiz![quizIdx];
              return (
                <div style={{ ...card, borderRadius: 20, padding: 20 }}>
                  <p style={{ color: '#e2e8f0', fontSize: 15, fontWeight: 700, margin: '0 0 4px' }}>Câu {quizIdx + 1}/{content.quiz!.length}: {q.questionVi}</p>
                  <p style={{ color: '#94a3b8', fontSize: 11, margin: '0 0 14px', fontStyle: 'italic' }}>{q.question}</p>
                  {q.optionsVi.map((opt, oi) => {
                    const isCorrect = oi === q.correct;
                    const isPicked = picked === oi;
                    let bg = 'rgba(255,255,255,0.06)'; let border = '2px solid rgba(255,255,255,0.1)';
                    if (picked !== null) {
                      if (isCorrect) { bg = 'rgba(34,197,94,0.15)'; border = '2px solid #22c55e'; }
                      else if (isPicked) { bg = 'rgba(239,68,68,0.15)'; border = '2px solid #ef4444'; }
                    }
                    return (
                      <button key={oi} onClick={() => { if (picked !== null) return; setPicked(oi); if (oi === q.correct) setScore(s => s + 1); }}
                        style={{ display: 'block', width: '100%', textAlign: 'left', padding: '14px 16px', borderRadius: 14, background: bg, border, color: '#e2e8f0', fontSize: 14, cursor: picked !== null ? 'default' : 'pointer', marginBottom: 8, transition: 'all 0.2s', fontWeight: 500 }}>
                        {opt}{picked !== null && isCorrect && ' ✅'}{picked !== null && isPicked && !isCorrect && ' ❌'}
                      </button>
                    );
                  })}
                  {picked !== null && (
                    <div style={{ background: 'rgba(139,92,246,0.1)', borderRadius: 14, padding: 14, marginTop: 10 }}>
                      <p style={{ color: '#c4b5fd', fontSize: 13, margin: '0 0 10px' }}>💡 {q.explanationVi}</p>
                      <button onClick={() => { setQuizIdx(qi => qi + 1); setPicked(null); }} style={btnStyle('linear-gradient(135deg,#7c3aed,#a78bfa)')}>
                        {quizIdx < content.quiz!.length - 1 ? 'Câu tiếp →' : 'Xem kết quả 🎯'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })() : (
              <div style={{ ...card, textAlign: 'center', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 20, padding: 24 }}>
                <StarRating earned={score} total={content.quiz.length} />
                <p style={{ color: '#86efac', fontSize: 22, fontWeight: 800, margin: '8px 0 4px' }}>{score}/{content.quiz.length} đúng!</p>
                <p style={{ color: '#94a3b8', fontSize: 13 }}>{score === content.quiz.length ? 'Xuất sắc! 🌟' : 'Cố gắng thêm nhé!'}</p>
              </div>
            )}
          </>)}

          {/* Challenge */}
          {content.challenge && (
            <div style={{ ...card, background: 'linear-gradient(135deg,rgba(251,191,36,0.1),rgba(245,158,11,0.1))', border: '1px solid rgba(251,191,36,0.2)', marginTop: 16, borderRadius: 20, padding: 20 }}>
              <h4 style={{ color: '#fbbf24', fontSize: 15, fontWeight: 800, margin: '0 0 10px' }}>🏆 Thử thách mở rộng ({content.challenge.duration})</h4>
              <p style={{ color: '#e2e8f0', fontSize: 14, margin: '0 0 6px', lineHeight: 1.6 }}>{content.challenge.taskVi}</p>
              <p style={{ color: '#94a3b8', fontSize: 11, margin: 0, fontStyle: 'italic' }}>{content.challenge.task}</p>
            </div>
          )}

          {content.realWorldLink && <p style={{ color: '#64748b', fontSize: 11, marginTop: 12 }}>📚 Nguồn: {content.realWorldLink}</p>}

          <button onClick={completeActivity} style={{ ...btnStyle(progress[actKey!] ? 'linear-gradient(135deg,#16a34a,#22c55e)' : 'linear-gradient(135deg,#7c3aed,#a78bfa)'), marginTop: 16, padding: 16, fontSize: 16 }}>
            {progress[actKey!] ? '✅ Đã hoàn thành — Làm lại?' : '🎯 Đánh dấu hoàn thành'}
          </button>
        </>)}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { transform: scale(0.5); opacity: 0 } to { transform: scale(1); opacity: 1 } }
        @keyframes bounceIn { 0% { transform: scale(0.3); opacity: 0 } 50% { transform: scale(1.05) } 70% { transform: scale(0.95) } 100% { transform: scale(1); opacity: 1 } }
        @keyframes shake { 0%,100% { transform: translateX(0) } 20% { transform: translateX(-8px) } 40% { transform: translateX(8px) } 60% { transform: translateX(-4px) } 80% { transform: translateX(4px) } }
      `}</style>
    </div>
  );
}
