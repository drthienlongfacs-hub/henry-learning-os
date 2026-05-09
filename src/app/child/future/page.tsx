'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Lightbulb, Trophy, Target, Rocket, CheckCircle, Star, Play, BookOpen } from 'lucide-react';
import { useAppStore } from '@/stores/app-store';
import { FUTURE_SKILL_AXES, BLUE_OCEAN_PROFILE } from '@/data/future-skills';
import { ACTIVITY_CONTENT } from '@/data/future-skills-content';

type View = 'home' | 'axis' | 'activity';

// Progress persistence
function getProgress(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem('fs_progress') || '{}'); } catch { return {}; }
}
function markDone(key: string) {
  const p = getProgress(); p[key] = true;
  localStorage.setItem('fs_progress', JSON.stringify(p));
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
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const grade = (useAppStore.getState().childProfile as { gradeLevel?: number } | null)?.gradeLevel || 1;

  useEffect(() => { setProgress(getProgress()); }, []);

  const axis = FUTURE_SKILL_AXES.find(a => a.id === axisId);
  const content = actKey ? ACTIVITY_CONTENT[actKey] : null;

  const openAxis = (id: string) => { setAxisId(id); setView('axis'); };
  const openActivity = (key: string) => { setActKey(key); setQuizIdx(0); setPicked(null); setScore(0); setStepIdx(0); setView('activity'); };
  const goBack = () => {
    if (view === 'activity') { setView('axis'); setActKey(null); }
    else if (view === 'axis') { setView('home'); setAxisId(null); }
  };

  const celebrate = useCallback(() => {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 2000);
  }, []);

  const completeActivity = useCallback(() => {
    if (actKey) { markDone(actKey); setProgress(p => ({ ...p, [actKey]: true })); }
    celebrate();
  }, [actKey, celebrate]);

  const totalDone = Object.keys(progress).length;

  // Styles
  const card = { background: 'rgba(255,255,255,0.06)', borderRadius: 16, padding: 16, border: '1px solid rgba(255,255,255,0.1)', marginBottom: 12 };
  const btn = (bg: string) => ({ background: bg, border: 'none', borderRadius: 12, padding: '12px 20px', color: '#fff', fontWeight: 700 as const, cursor: 'pointer', fontSize: 14, width: '100%', transition: 'all 0.2s' });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#0f172a,#1e293b)', fontFamily: "'Inter',sans-serif" }}>
      {/* Celebration overlay */}
      {showCelebration && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)', animation: 'fadeIn 0.3s' }}>
          <div style={{ textAlign: 'center', animation: 'scaleIn 0.4s' }}>
            <div style={{ fontSize: 80 }}>🎉</div>
            <h2 style={{ color: '#fbbf24', fontSize: 28, margin: '12px 0 4px' }}>Tuyệt vời!</h2>
            <p style={{ color: '#e2e8f0', fontSize: 16 }}>Bạn đã hoàn thành hoạt động!</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        {view === 'home' ? (
          <Link href="/child" style={{ color: '#94a3b8', display: 'flex' }}><ArrowLeft size={24} /></Link>
        ) : (
          <button onClick={goBack} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex' }}><ArrowLeft size={24} /></button>
        )}
        <Rocket size={28} color="#a78bfa" />
        <div style={{ flex: 1 }}>
          <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 700, margin: 0 }}>Future Skills 🚀</h1>
          <p style={{ color: '#94a3b8', fontSize: 12, margin: 0 }}>
            {view === 'home' && `${totalDone} hoạt động hoàn thành`}
            {view === 'axis' && axis?.nameVi}
            {view === 'activity' && content?.introVi?.slice(0, 50) + '...'}
          </p>
        </div>
      </div>

      <div style={{ padding: 20, maxWidth: 700, margin: '0 auto' }}>

        {/* ═══ HOME VIEW ═══ */}
        {view === 'home' && (<>
          {/* Blue Ocean */}
          <div style={{ background: 'linear-gradient(135deg,#1e1b4b,#312e81)', borderRadius: 16, padding: 20, marginBottom: 20, border: '1px solid rgba(129,140,248,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Target size={20} color="#818cf8" />
              <span style={{ color: '#c7d2fe', fontSize: 15, fontWeight: 600 }}>🌊 Blue Ocean — Định vị khác biệt</span>
            </div>
            <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>{BLUE_OCEAN_PROFILE.titleVi}</h3>
            <p style={{ color: '#a5b4fc', fontSize: 13, margin: '0 0 8px', lineHeight: 1.6 }}>💎 {BLUE_OCEAN_PROFILE.formula}</p>
            <p style={{ color: '#818cf8', fontSize: 12, margin: 0, fontStyle: 'italic' }}>→ {BLUE_OCEAN_PROFILE.advantage}</p>
          </div>

          {/* Progress bar */}
          <div style={{ ...card, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ color: '#c4b5fd', fontSize: 13, fontWeight: 600 }}>📊 Tiến độ tổng</span>
              <span style={{ color: '#a78bfa', fontSize: 13, fontWeight: 700 }}>{totalDone} / {Object.keys(ACTIVITY_CONTENT).length}</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 8, height: 10, overflow: 'hidden' }}>
              <div style={{ background: 'linear-gradient(90deg,#7c3aed,#a78bfa)', height: '100%', width: `${Math.min(100, (totalDone / Math.max(1, Object.keys(ACTIVITY_CONTENT).length)) * 100)}%`, borderRadius: 8, transition: 'width 0.5s' }} />
            </div>
          </div>

          {/* 5 Axes */}
          <h2 style={{ color: '#e2e8f0', fontSize: 16, fontWeight: 600, marginBottom: 12 }}>🎯 5 Trục năng lực tương lai</h2>
          {FUTURE_SKILL_AXES.map(ax => {
            const acts = ax.activities.filter(a => a.grade <= grade);
            const done = acts.filter(a => progress[a.title]).length;
            return (
              <button key={ax.id} onClick={() => openAxis(ax.id)} style={{
                background: ax.gradient, border: 'none', borderRadius: 16, padding: 20, cursor: 'pointer',
                textAlign: 'left', transition: 'transform 0.2s', display: 'flex', alignItems: 'center', gap: 16, width: '100%', marginBottom: 12,
              }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                 onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}>
                <span style={{ fontSize: 40 }}>{ax.icon}</span>
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, margin: '0 0 4px' }}>{ax.nameVi}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, margin: '0 0 6px' }}>{ax.descVi}</p>
                  <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
                    <span>✅ {done}/{acts.length}</span>
                    <span>🏆 {ax.competitions.length} sân chơi</span>
                  </div>
                  {/* Mini progress */}
                  <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 4, height: 4, marginTop: 6 }}>
                    <div style={{ background: '#fff', borderRadius: 4, height: '100%', width: `${acts.length ? (done / acts.length) * 100 : 0}%`, transition: 'width 0.4s' }} />
                  </div>
                </div>
                <ChevronRight size={20} color="rgba(255,255,255,0.6)" />
              </button>
            );
          })}

          {/* Evidence */}
          <div style={{ marginTop: 20, padding: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ color: '#94a3b8', fontSize: 11, margin: 0 }}>
              📚 Benchmark: Khan Academy Kids (MIT) • ScratchJr (Lifelong Kindergarten) • Duolingo (gamification) • OECD Learning Compass 2030 • UNESCO AI Framework 2024 • WEF Future of Jobs 2025
            </p>
          </div>
        </>)}

        {/* ═══ AXIS VIEW ═══ */}
        {view === 'axis' && axis && (<>
          <div style={{ background: axis.gradient, borderRadius: 16, padding: 20, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 48 }}>{axis.icon}</span>
            <div>
              <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: 0 }}>{axis.nameVi}</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, margin: '4px 0 0' }}>{axis.descVi}</p>
            </div>
          </div>

          {/* Tips */}
          <div style={{ ...card, background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Lightbulb size={16} color="#fbbf24" /><span style={{ color: '#fbbf24', fontSize: 13, fontWeight: 600 }}>Mẹo cho ba mẹ</span>
            </div>
            {axis.tips.map((tip, i) => <p key={i} style={{ color: '#e2e8f0', fontSize: 12, margin: '0 0 6px', lineHeight: 1.5 }}>💡 {tip}</p>)}
          </div>

          {/* Activities */}
          <h3 style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 600, marginBottom: 8 }}>📋 Hoạt động (Lớp {grade})</h3>
          {axis.activities.filter(a => a.grade <= grade).map(act => {
            const hasContent = !!ACTIVITY_CONTENT[act.title];
            const isDone = !!progress[act.title];
            const icons: Record<string, string> = { interactive: '🎮', project: '📁', activity: '🎯', quiz: '❓', experiment: '🧪', lesson: '📖', data: '📊', journal: '📓', discussion: '💬', thinking: '🧠', skill: '⭐', method: '🔧', presentation: '🎤', speaking: '🗣️', reading: '📚', writing: '✍️', leadership: '👑', social: '🤝', digital: '🔐', responsibility: '✅', portfolio: '📂' };
            return (
              <button key={act.title} onClick={() => hasContent ? openActivity(act.title) : null}
                style={{ ...card, display: 'flex', alignItems: 'center', gap: 12, cursor: hasContent ? 'pointer' : 'default', opacity: hasContent ? 1 : 0.5, width: '100%', textAlign: 'left', transition: 'all 0.2s' }}
                onMouseEnter={e => hasContent && (e.currentTarget.style.borderColor = 'rgba(139,92,246,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}>
                <span style={{ fontSize: 24 }}>{icons[act.type] || '📋'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 600 }}>{act.titleVi}</div>
                  <div style={{ color: '#64748b', fontSize: 11 }}>{act.title} • Lớp {act.grade}</div>
                </div>
                {isDone ? <CheckCircle size={20} color="#22c55e" /> : hasContent ? <Play size={18} color="#a78bfa" /> : <span style={{ color: '#475569', fontSize: 11 }}>Sắp có</span>}
              </button>
            );
          })}

          {/* Competitions */}
          <h3 style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 600, margin: '20px 0 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Trophy size={16} color="#fbbf24" /> Sân chơi đáng đầu tư
          </h3>
          {axis.competitions.map(c => (
            <div key={c.name} style={{ ...card, background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)' }}>
              <div style={{ color: '#fbbf24', fontSize: 14, fontWeight: 600 }}>🏆 {c.name}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>Tuổi: {c.age} | {c.value}</div>
            </div>
          ))}
        </>)}

        {/* ═══ ACTIVITY VIEW ═══ */}
        {view === 'activity' && content && (<>
          {/* Intro */}
          <div style={{ ...card, background: 'linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.1))', border: '1px solid rgba(139,92,246,0.2)' }}>
            <BookOpen size={20} color="#a78bfa" style={{ marginBottom: 8 }} />
            <p style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{content.introVi}</p>
            <p style={{ color: '#94a3b8', fontSize: 12, margin: '8px 0 0', fontStyle: 'italic' }}>{content.intro}</p>
          </div>

          {/* Step-by-step guide */}
          <h3 style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 600, margin: '16px 0 8px' }}>📝 Hướng dẫn từng bước</h3>
          {content.steps.map((s, i) => (
            <button key={i} onClick={() => setStepIdx(i)} style={{
              ...card, display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left', cursor: 'pointer',
              background: i <= stepIdx ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.04)',
              border: i === stepIdx ? '2px solid rgba(34,197,94,0.4)' : '1px solid rgba(255,255,255,0.08)',
              transition: 'all 0.3s',
            }}>
              <span style={{ fontSize: 28 }}>{s.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: i <= stepIdx ? '#86efac' : '#94a3b8', fontSize: 13, fontWeight: 600 }}>Bước {i + 1}: {s.instructionVi}</div>
                <div style={{ color: '#64748b', fontSize: 11, marginTop: 2 }}>{s.instruction}</div>
              </div>
              {i < stepIdx && <CheckCircle size={18} color="#22c55e" />}
              {i === stepIdx && <Star size={18} color="#fbbf24" />}
            </button>
          ))}
          {stepIdx < content.steps.length - 1 && (
            <button onClick={() => setStepIdx(s => s + 1)} style={btn('linear-gradient(135deg,#7c3aed,#a78bfa)')}>
              Bước tiếp theo →
            </button>
          )}

          {/* Quiz */}
          {content.quiz && content.quiz.length > 0 && (<>
            <h3 style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 600, margin: '20px 0 8px' }}>🧠 Kiểm tra hiểu biết</h3>
            {quizIdx < content.quiz.length ? (() => {
              const q = content.quiz![quizIdx];
              return (
                <div style={card}>
                  <p style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 600, margin: '0 0 12px' }}>
                    Câu {quizIdx + 1}/{content.quiz!.length}: {q.questionVi}
                  </p>
                  <p style={{ color: '#94a3b8', fontSize: 11, margin: '0 0 12px', fontStyle: 'italic' }}>{q.question}</p>
                  {q.optionsVi.map((opt, oi) => {
                    const isCorrect = oi === q.correct;
                    const isPicked = picked === oi;
                    let bg = 'rgba(255,255,255,0.06)';
                    let border = '1px solid rgba(255,255,255,0.1)';
                    if (picked !== null) {
                      if (isCorrect) { bg = 'rgba(34,197,94,0.15)'; border = '2px solid #22c55e'; }
                      else if (isPicked) { bg = 'rgba(239,68,68,0.15)'; border = '2px solid #ef4444'; }
                    }
                    return (
                      <button key={oi} onClick={() => {
                        if (picked !== null) return;
                        setPicked(oi);
                        if (oi === q.correct) setScore(s => s + 1);
                      }} style={{
                        display: 'block', width: '100%', textAlign: 'left', padding: '12px 16px', borderRadius: 12,
                        background: bg, border, color: '#e2e8f0', fontSize: 13, cursor: picked !== null ? 'default' : 'pointer',
                        marginBottom: 8, transition: 'all 0.2s',
                      }}>
                        {opt}
                        {picked !== null && isCorrect && ' ✅'}
                        {picked !== null && isPicked && !isCorrect && ' ❌'}
                      </button>
                    );
                  })}
                  {picked !== null && (
                    <div style={{ background: 'rgba(139,92,246,0.1)', borderRadius: 10, padding: 12, marginTop: 8 }}>
                      <p style={{ color: '#c4b5fd', fontSize: 12, margin: 0 }}>💡 {q.explanationVi}</p>
                      <button onClick={() => { setQuizIdx(qi => qi + 1); setPicked(null); }} style={{ ...btn('linear-gradient(135deg,#7c3aed,#a78bfa)'), marginTop: 10 }}>
                        {quizIdx < content.quiz!.length - 1 ? 'Câu tiếp →' : 'Xem kết quả 🎯'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })() : (
              <div style={{ ...card, textAlign: 'center', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <div style={{ fontSize: 48, marginBottom: 8 }}>{score === content.quiz.length ? '🌟' : score > 0 ? '👍' : '💪'}</div>
                <p style={{ color: '#86efac', fontSize: 18, fontWeight: 700, margin: '0 0 4px' }}>
                  {score}/{content.quiz.length} đúng!
                </p>
                <p style={{ color: '#94a3b8', fontSize: 12, margin: 0 }}>
                  {score === content.quiz.length ? 'Xuất sắc! Bạn hiểu rất rõ!' : 'Tiếp tục cố gắng nhé!'}
                </p>
              </div>
            )}
          </>)}

          {/* Challenge */}
          {content.challenge && (
            <div style={{ ...card, background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', marginTop: 16 }}>
              <h4 style={{ color: '#fbbf24', fontSize: 14, fontWeight: 700, margin: '0 0 8px' }}>🏆 Thử thách mở rộng ({content.challenge.duration})</h4>
              <p style={{ color: '#e2e8f0', fontSize: 13, margin: '0 0 4px', lineHeight: 1.5 }}>{content.challenge.taskVi}</p>
              <p style={{ color: '#94a3b8', fontSize: 11, margin: 0, fontStyle: 'italic' }}>{content.challenge.task}</p>
            </div>
          )}

          {/* Evidence source */}
          {content.realWorldLink && (
            <p style={{ color: '#64748b', fontSize: 11, marginTop: 12 }}>📚 Nguồn: {content.realWorldLink}</p>
          )}

          {/* Complete button */}
          <button onClick={completeActivity} style={{ ...btn(progress[actKey!] ? 'linear-gradient(135deg,#16a34a,#22c55e)' : 'linear-gradient(135deg,#7c3aed,#a78bfa)'), marginTop: 16, padding: 16, fontSize: 16 }}>
            {progress[actKey!] ? '✅ Đã hoàn thành — Làm lại?' : '🎯 Đánh dấu hoàn thành'}
          </button>
        </>)}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { transform: scale(0.5); opacity: 0 } to { transform: scale(1); opacity: 1 } }
      `}</style>
    </div>
  );
}
