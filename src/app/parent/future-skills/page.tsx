'use client';

import { useEffect, useState } from 'react';
import { FUTURE_SKILL_AXES } from '@/data/future-skills';
import Link from 'next/link';
import { ArrowLeft, Target, Shield, BookOpen, Lightbulb, Zap, CheckCircle, TrendingUp, Cpu } from 'lucide-react';

export default function FutureSkillsDashboard() {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('fs_progress');
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch {}
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) return null;

  // Calculate stats
  let totalActivities = 0;
  let completedActivities = 0;
  
  const competencyStats = {
    Understanding: { total: 0, completed: 0 },
    Applying: { total: 0, completed: 0 },
    Creating: { total: 0, completed: 0 }
  };

  const axisStats = FUTURE_SKILL_AXES.map(axis => {
    const axisTotal = axis.activities.length;
    let axisCompleted = 0;
    
    axis.activities.forEach(act => {
      totalActivities++;
      if (progress[act.title]) {
        axisCompleted++;
        completedActivities++;
      }
      
      if (act.competencyLevel) {
        competencyStats[act.competencyLevel].total++;
        if (progress[act.title]) {
          competencyStats[act.competencyLevel].completed++;
        }
      }
    });

    return {
      ...axis,
      axisTotal,
      axisCompleted,
      progressPct: axisTotal > 0 ? Math.round((axisCompleted / axisTotal) * 100) : 0
    };
  });

  const overallProgress = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;

  return (
    <div style={{ minHeight: '100dvh', background: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 16px', paddingBottom: 100 }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <Link href="/parent/dashboard">
            <button style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 8, cursor: 'pointer', display: 'flex' }}>
              <ArrowLeft size={20} color="#64748b" />
            </button>
          </Link>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', margin: 0 }}>Phân tích Future Skills</h1>
            <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0' }}>Báo cáo dựa trên chuẩn UNESCO, WEF & OECD</p>
          </div>
        </div>

        {/* Overall Progress Card */}
        <div style={{ background: 'linear-gradient(135deg,#1e1b4b,#312e81)', borderRadius: 24, padding: 24, marginBottom: 24, color: '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Cpu size={24} color="#818cf8" />
              <span style={{ fontSize: 16, fontWeight: 700 }}>Năng lực Thế kỷ 21</span>
            </div>
            <span style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
              {completedActivities} / {totalActivities} Hoạt động
            </span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 16 }}>
            <span style={{ fontSize: 48, fontWeight: 900, lineHeight: 1 }}>{overallProgress}%</span>
            <span style={{ color: '#818cf8', fontSize: 14, fontWeight: 600 }}>Tiến độ tổng thể</span>
          </div>
          
          <div style={{ width: '100%', height: 12, background: 'rgba(0,0,0,0.3)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ width: `${overallProgress}%`, height: '100%', background: 'linear-gradient(90deg, #818cf8, #c084fc)', transition: 'width 1s ease-out' }} />
          </div>
        </div>

        {/* Competency Levels Breakdown */}
        <div style={{ background: '#fff', borderRadius: 24, padding: 24, marginBottom: 24, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <Target size={20} color="#0f172a" />
            <h2 style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', margin: 0 }}>Cấp độ Nhận thức (Bloom's Taxonomy)</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <div style={{ background: '#f0f9ff', padding: 16, borderRadius: 16, border: '1px solid #bae6fd', textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>🧠</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#0284c7' }}>Tự nhận thức</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#0369a1', marginTop: 8 }}>
                {competencyStats.Understanding.completed}/{competencyStats.Understanding.total}
              </div>
            </div>
            <div style={{ background: '#fefce8', padding: 16, borderRadius: 16, border: '1px solid #fef08a', textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>🛠️</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#ca8a04' }}>Ứng dụng</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#a16207', marginTop: 8 }}>
                {competencyStats.Applying.completed}/{competencyStats.Applying.total}
              </div>
            </div>
            <div style={{ background: '#fff1f2', padding: 16, borderRadius: 16, border: '1px solid #fecdd3', textAlign: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>🚀</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#e11d48' }}>Sáng tạo</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#be123c', marginTop: 8 }}>
                {competencyStats.Creating.completed}/{competencyStats.Creating.total}
              </div>
            </div>
          </div>
        </div>

        {/* Individual Axes Progress */}
        <h2 style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrendingUp size={20} color="#475569" />
          Phát triển theo 5 Trục (OECD/UNESCO)
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {axisStats.map(axis => (
            <div key={axis.id} style={{ background: '#fff', borderRadius: 20, padding: 20, border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 32 }}>{axis.icon}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', margin: '0 0 4px' }}>{axis.nameVi}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>{axis.axisCompleted} / {axis.axisTotal} HĐ</span>
                    <span style={{ fontSize: 14, fontWeight: 800, color: axis.color }}>{axis.progressPct}%</span>
                  </div>
                </div>
              </div>
              <div style={{ width: '100%', height: 8, background: '#f1f5f9', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
                <div style={{ width: `${axis.progressPct}%`, height: '100%', background: axis.color, transition: 'width 1s ease-out' }} />
              </div>
              
              {/* Completed Milestones Highlight */}
              {axis.axisCompleted > 0 && axis.developmentalMilestones && axis.developmentalMilestones.length > 0 && (
                <div style={{ background: '#f8fafc', padding: 12, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                    <CheckCircle size={14} color="#10b981" />
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>Cột mốc đạt được:</span>
                  </div>
                  <p style={{ fontSize: 12, color: '#475569', margin: 0, fontStyle: 'italic' }}>
                    "{axis.developmentalMilestones[0].milestone}" 
                    <br />
                    <span style={{ fontSize: 10, color: '#94a3b8' }}>({axis.developmentalMilestones[0].evidence})</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
