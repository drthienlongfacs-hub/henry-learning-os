'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Lightbulb, Trophy, CheckCircle, Star, Play, BookOpen } from 'lucide-react';
import { FUTURE_SKILL_AXES, BLUE_OCEAN_PROFILE } from '@/data/future-skills';
import { ACTIVITY_CONTENT } from '@/data/future-skills-content';
import { ACTIVITY_GAMES, ACTIVITY_SAMPLES } from '@/data/future-skills-games';
import { SortingGame, SequenceGame, MatchingGame, ProgressRing, SampleGallery, StarRating } from '@/components/future/InteractiveGames';

type View = 'home' | 'axis' | 'activity';
type SortingGameConfig = Omit<React.ComponentProps<typeof SortingGame>, 'onComplete'>;
type SequenceGameConfig = Omit<React.ComponentProps<typeof SequenceGame>, 'onComplete'>;
type MatchingGameConfig = Omit<React.ComponentProps<typeof MatchingGame>, 'onComplete'>;

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

  const axis = FUTURE_SKILL_AXES.find(a => a.id === axisId);
  const content = actKey ? ACTIVITY_CONTENT[actKey] : null;
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
          <div style={{ background: 'linear-gradient(135deg,#1e1b4b,#312e81)', borderRadius: 20, padding: 20, marginBottom: 20, border: '1px solid rgba(129,140,248,0.3)' }}>
            <h3 style={{ color: '#fff', fontSize: 17, fontWeight: 800, margin: '0 0 6px' }}>🌊 {BLUE_OCEAN_PROFILE.titleVi}</h3>
            <p style={{ color: '#a5b4fc', fontSize: 13, margin: '0 0 8px', lineHeight: 1.6 }}>💎 {BLUE_OCEAN_PROFILE.formula}</p>
            <p style={{ color: '#818cf8', fontSize: 11, margin: 0, fontStyle: 'italic' }}>→ {BLUE_OCEAN_PROFILE.advantage}</p>
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

          <div style={{ ...card, background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Lightbulb size={16} color="#fbbf24" /><span style={{ color: '#fbbf24', fontSize: 13, fontWeight: 700 }}>Mẹo cho ba mẹ</span>
            </div>
            {axis.tips.map((tip, i) => <p key={i} style={{ color: '#e2e8f0', fontSize: 12, margin: '0 0 6px', lineHeight: 1.6 }}>💡 {tip}</p>)}
          </div>

          <h3 style={{ color: '#e2e8f0', fontSize: 15, fontWeight: 700, marginBottom: 10 }}>🎮 Hoạt động tương tác (Lớp {grade})</h3>
          {axis.activities.filter(a => a.grade <= grade).map(act => {
            const hasContent = !!ACTIVITY_CONTENT[act.title];
            const hasGame = !!ACTIVITY_GAMES[act.title];
            const isDone = !!progress[act.title];
            const icons: Record<string, string> = { interactive:'🎮', project:'📁', activity:'🎯', quiz:'❓', experiment:'🧪', lesson:'📖', data:'📊', journal:'📓', discussion:'💬', thinking:'🧠', skill:'⭐', method:'🔧', presentation:'🎤', speaking:'🗣️', reading:'📚', writing:'✍️', leadership:'👑', social:'🤝', digital:'🔐', responsibility:'✅', portfolio:'📂' };
            return (
              <button key={act.title} onClick={() => hasContent ? openActivity(act.title) : null}
                style={{ ...card, display: 'flex', alignItems: 'center', gap: 14, cursor: hasContent ? 'pointer' : 'default', opacity: hasContent ? 1 : 0.4, width: '100%', textAlign: 'left', transition: 'all 0.2s', borderRadius: 16 }}
                onMouseEnter={e => hasContent && (e.currentTarget.style.borderColor = axis.color)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${axis.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                  {icons[act.type] || '📋'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 700 }}>{act.titleVi}</div>
                  <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>
                    {act.title}
                    {hasGame && <span style={{ background: 'rgba(139,92,246,0.2)', color: '#a78bfa', padding: '1px 6px', borderRadius: 6, marginLeft: 6, fontSize: 10, fontWeight: 700 }}>🎮 Game</span>}
                  </div>
                </div>
                {isDone ? <CheckCircle size={22} color="#22c55e" /> : hasContent ? <Play size={20} color={axis.color} /> : <span style={{ color: '#475569', fontSize: 10 }}>Sắp có</span>}
              </button>
            );
          })}

          <h3 style={{ color: '#e2e8f0', fontSize: 15, fontWeight: 700, margin: '20px 0 10px' }}><Trophy size={16} color="#fbbf24" style={{ verticalAlign: 'middle', marginRight: 6 }} />Sân chơi đáng đầu tư</h3>
          {axis.competitions.map(c => (
            <div key={c.name} style={{ ...card, background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.12)' }}>
              <div style={{ color: '#fbbf24', fontSize: 14, fontWeight: 700 }}>🏆 {c.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>Tuổi: {c.age} | {c.value}</div>
            </div>
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
