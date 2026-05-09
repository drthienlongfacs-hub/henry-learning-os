'use client';

import { useEffect, useState } from 'react';
import { FUTURE_SKILL_AXES } from '@/data/future-skills';
import Link from 'next/link';
import { ArrowLeft, Target, Shield, BookOpen, Lightbulb, Zap, CheckCircle, TrendingUp, Cpu, Sparkles, BrainCircuit } from 'lucide-react';
import { useMemo } from 'react';

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

  const aiInsights = useMemo(() => {
    if (totalActivities === 0 || completedActivities === 0) return null;
    const insights: string[] = [];
    
    // 1. Phân tích tiến độ
    if (overallProgress < 30) {
      insights.push(`Bé đang ở giai đoạn khởi động (${overallProgress}%). Các hoạt động hiện tại giúp bé xây dựng nền tảng Nhận thức (Understanding) vững chắc theo chuẩn UNESCO.`);
    } else if (overallProgress < 70) {
      insights.push(`Bé có tiến độ học tập rất tốt (${overallProgress}%). Hệ thống ghi nhận sự phát triển đều ở các kỹ năng nền tảng thế kỷ 21.`);
    } else {
      insights.push(`Xuất sắc! Bé đã hoàn thành phần lớn lộ trình (${overallProgress}%). Bé đã hoàn toàn sẵn sàng cho các thử thách phức tạp hơn ở cấp độ Sáng tạo (Creating).`);
    }

    // 2. Phân tích cấp độ nhận thức (Bloom's Taxonomy)
    const totalBloom = competencyStats.Understanding.completed + competencyStats.Applying.completed + competencyStats.Creating.completed;
    if (totalBloom > 0) {
      if (competencyStats.Creating.completed === 0 && competencyStats.Understanding.completed > 0) {
        insights.push("Dữ liệu cho thấy bé nắm bắt tốt khái niệm nhưng chưa có nhiều hoạt động Sáng tạo (Creating). Khuyến nghị ba mẹ cùng bé làm thêm các dự án (Project) hoặc thuyết trình.");
      } else if (competencyStats.Creating.completed > 0) {
        insights.push("Điểm sáng: Bé đã tham gia vào các hoạt động Sáng tạo (Creating). Theo OECD Learning Compass 2030, đây là năng lực cốt lõi giúp bé tạo ra giá trị mới (Creating New Value).");
      }
    }

    // 3. Phân tích trục kỹ năng mạnh
    const sortedAxes = [...axisStats].sort((a, b) => b.progressPct - a.progressPct);
    const strongest = sortedAxes[0];
    if (strongest && strongest.progressPct > 0) {
      insights.push(`Trục kỹ năng nổi trội nhất hiện tại: "${strongest.nameVi}" (${strongest.progressPct}%).`);
    }

    // 4. Phát hiện đặc biệt (Critical Thinking & Debate)
    if (progress['Mini Debate'] || progress['AI Ethics Discussion']) {
      insights.push("Dấu ấn Thực chứng (Evidence-based): Bé đã tiếp cận bài tập Tư duy phản biện (Debate/Ethics). Theo WEF 2025, tư duy phân tích (Analytical Thinking) là kỹ năng top đầu giúp bé lập luận bằng logic thay vì học thuộc lòng.");
    }

    return insights;
  }, [progress, overallProgress, competencyStats, axisStats, totalActivities, completedActivities]);

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

        {/* AI Insight Card */}
        {aiInsights && (
          <div style={{ background: 'linear-gradient(135deg, #fdf4ff, #f3e8ff)', borderRadius: 24, padding: 24, marginBottom: 24, border: '1px solid #e9d5ff', boxShadow: '0 10px 25px rgba(168,85,247,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ background: 'linear-gradient(135deg, #a855f7, #d946ef)', padding: 8, borderRadius: 12 }}>
                <BrainCircuit size={20} color="#fff" />
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#701a75', margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
                AI Insights
                <Sparkles size={16} color="#d946ef" />
              </h2>
              <span style={{ background: '#fbcfe8', color: '#be185d', padding: '2px 8px', borderRadius: 12, fontSize: 10, fontWeight: 800, marginLeft: 'auto' }}>
                DATA-DRIVEN
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {aiInsights.map((insight, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'rgba(255,255,255,0.6)', padding: 16, borderRadius: 16 }}>
                  <div style={{ marginTop: 2 }}>
                    <Lightbulb size={18} color="#a855f7" />
                  </div>
                  <p style={{ color: '#4a044e', fontSize: 14, lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                    {insight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

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
