'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Lightbulb, Trophy, Target, Rocket } from 'lucide-react';
import { useAppStore } from '@/stores/app-store';
import { FUTURE_SKILL_AXES, BLUE_OCEAN_PROFILE } from '@/data/future-skills';

export default function FutureSkillsPage() {
  const [selectedAxis, setSelectedAxis] = useState<string | null>(null);
  const grade = (useAppStore.getState().childProfile as { gradeLevel?: number } | null)?.gradeLevel || 1;
  const axis = FUTURE_SKILL_AXES.find(a => a.id === selectedAxis);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#0f172a,#1e293b)' }}>
      <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Link href="/child" style={{ color: '#94a3b8', display: 'flex' }}><ArrowLeft size={24} /></Link>
        <Rocket size={28} color="#a78bfa" />
        <div>
          <h1 style={{ color: '#fff', fontSize: 20, fontWeight: 700, margin: 0 }}>Future Skills 🚀</h1>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>Năng lực tương lai — Công dân quốc tế tại TPHCM</p>
        </div>
      </div>

      <div style={{ padding: 20, maxWidth: 900, margin: '0 auto' }}>
        {!selectedAxis && (<>
          {/* Blue Ocean Profile */}
          <div style={{ background: 'linear-gradient(135deg,#1e1b4b,#312e81)', borderRadius: 16, padding: '20px', marginBottom: 20, border: '1px solid rgba(129,140,248,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Target size={20} color="#818cf8" />
              <span style={{ color: '#c7d2fe', fontSize: 15, fontWeight: 600 }}>🌊 Blue Ocean — Định vị khác biệt</span>
            </div>
            <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>{BLUE_OCEAN_PROFILE.titleVi}</h3>
            <p style={{ color: '#a5b4fc', fontSize: 13, margin: '0 0 8px', lineHeight: 1.6 }}>💎 {BLUE_OCEAN_PROFILE.formula}</p>
            <p style={{ color: '#818cf8', fontSize: 12, margin: 0, fontStyle: 'italic' }}>→ {BLUE_OCEAN_PROFILE.advantage}</p>
          </div>

          {/* 5 Axes */}
          <h2 style={{ color: '#e2e8f0', fontSize: 16, fontWeight: 600, marginBottom: 12 }}>🎯 5 Trục năng lực tương lai</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FUTURE_SKILL_AXES.map(ax => {
              const actCount = ax.activities.filter(a => a.grade <= grade).length;
              return (
                <button key={ax.id} onClick={() => setSelectedAxis(ax.id)} style={{
                  background: ax.gradient, border: 'none', borderRadius: 16, padding: '20px', cursor: 'pointer',
                  textAlign: 'left', transition: 'transform 0.2s', display: 'flex', alignItems: 'center', gap: 16,
                }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                   onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}>
                  <span style={{ fontSize: 40 }}>{ax.icon}</span>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, margin: '0 0 4px' }}>{ax.nameVi}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, margin: '0 0 6px' }}>{ax.descVi}</p>
                    <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>
                      <span>📋 {actCount} hoạt động</span>
                      <span>🏆 {ax.competitions.length} sân chơi</span>
                      <span>💡 {ax.tips.length} mẹo</span>
                    </div>
                  </div>
                  <ChevronRight size={20} color="rgba(255,255,255,0.6)" />
                </button>
              );
            })}
          </div>

          {/* Evidence sources */}
          <div style={{ marginTop: 20, padding: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ color: '#94a3b8', fontSize: 12, margin: 0 }}>
              📚 Nguồn: UNESCO AI Framework | WEF Future of Jobs 2025 | OECD Learning Compass 2030 | UNICEF Transferable Skills | VN Green Growth Strategy 2021-2030
            </p>
          </div>
        </>)}

        {selectedAxis && axis && (<>
          <button onClick={() => setSelectedAxis(null)} style={{ background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, padding: 0 }}>
            <ArrowLeft size={16} /> Quay lại 5 trục
          </button>

          <div style={{ background: axis.gradient, borderRadius: 16, padding: '20px', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 48 }}>{axis.icon}</span>
              <div>
                <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: 0 }}>{axis.nameVi}</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, margin: '4px 0 0' }}>{axis.descVi}</p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div style={{ background: 'rgba(251,191,36,0.1)', borderRadius: 12, padding: 16, marginBottom: 16, border: '1px solid rgba(251,191,36,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Lightbulb size={16} color="#fbbf24" /><span style={{ color: '#fbbf24', fontSize: 13, fontWeight: 600 }}>Mẹo cho ba mẹ</span>
            </div>
            {axis.tips.map((tip, i) => (
              <p key={i} style={{ color: '#e2e8f0', fontSize: 13, margin: '0 0 6px', lineHeight: 1.5 }}>💡 {tip}</p>
            ))}
          </div>

          {/* Activities by grade */}
          {[1,2,3,4,5].filter(g => g <= grade && axis.activities.some(a => a.grade === g)).map(g => (
            <div key={g} style={{ marginBottom: 20 }}>
              <h3 style={{ color: '#94a3b8', fontSize: 13, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Lớp {g}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {axis.activities.filter(a => a.grade === g).map(act => {
                  const typeIcon: Record<string,string> = { interactive: '🎮', project: '📁', activity: '🎯', quiz: '❓', experiment: '🧪', lesson: '📖', data: '📊', journal: '📓', discussion: '💬', thinking: '🧠', skill: '⭐', method: '🔧', presentation: '🎤', info: 'ℹ️', speaking: '🗣️', reading: '📚', writing: '✍️', leadership: '👑', social: '🤝', digital: '🔐', responsibility: '✅', portfolio: '📂' };
                  return (
                    <div key={act.title} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
                      <span style={{ fontSize: 20 }}>{typeIcon[act.type] || '📋'}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 500 }}>{act.title}</div>
                        <div style={{ color: '#64748b', fontSize: 12 }}>{act.titleVi}</div>
                      </div>
                      <span style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa', fontSize: 10, padding: '2px 8px', borderRadius: 10 }}>{act.type}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Competitions */}
          <h3 style={{ color: '#e2e8f0', fontSize: 14, fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Trophy size={16} color="#fbbf24" /> Sân chơi đáng đầu tư
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
            {axis.competitions.map(comp => (
              <div key={comp.name} style={{ background: 'rgba(251,191,36,0.08)', borderRadius: 12, padding: '12px 16px', border: '1px solid rgba(251,191,36,0.15)' }}>
                <div style={{ color: '#fbbf24', fontSize: 14, fontWeight: 600 }}>🏆 {comp.name}</div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>Tuổi: {comp.age} | Giá trị: {comp.value}</div>
              </div>
            ))}
          </div>
        </>)}
      </div>
    </div>
  );
}
