'use client';
/**
 * XPDashboard.tsx — Gamification progress widget
 * Shows: Level, XP bar, Streak, Today XP, Badges
 * Ported from LinguaKids XP Engine
 */
import React, { useState, useEffect } from 'react';
import { getXPData, getAllBadges, getLevelProgress, type Badge } from '@/lib/xpEngine';
import { Flame, Star, Trophy, Zap, ChevronDown, ChevronUp } from 'lucide-react';

export default function XPDashboard({ lang = 'vi' }: { lang?: string }) {
  const vi = lang === 'vi';
  const [data, setData] = useState<ReturnType<typeof getXPData> | null>(null);
  const [badges, setBadges] = useState<(Badge & { unlocked: boolean })[]>([]);
  const [showBadges, setShowBadges] = useState(false);

  useEffect(() => {
    setData(getXPData());
    setBadges(getAllBadges());
  }, []);

  if (!data) return null;
  const lp = data.levelProgress;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
      borderRadius: '20px', padding: '20px', color: '#fff',
      boxShadow: '0 8px 32px rgba(67, 56, 202, 0.3)',
    }}>
      {/* Header — Level + Streak */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: '1.1rem',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)',
          }}>
            {lp.level}
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {vi ? 'Cấp độ' : 'Level'}
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
              {data.totalXP.toLocaleString()} XP
            </div>
          </div>
        </div>

        {/* Streak */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'rgba(245, 158, 11, 0.2)', padding: '8px 14px',
          borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.3)',
        }}>
          <Flame size={18} color="#f59e0b" />
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', lineHeight: 1 }}>{data.streak}</div>
            <div style={{ fontSize: '0.6rem', opacity: 0.7 }}>{vi ? 'ngày' : 'day'}{data.streak !== 1 ? 's' : ''}</div>
          </div>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', opacity: 0.7, marginBottom: '6px' }}>
          <span>{vi ? `Cấp ${lp.level}` : `Level ${lp.level}`}</span>
          <span>{lp.progress}/{lp.needed} XP</span>
        </div>
        <div style={{ height: '10px', borderRadius: '5px', background: 'rgba(255,255,255,0.15)', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: '5px', width: `${lp.percentage}%`,
            background: 'linear-gradient(90deg, #10b981, #34d399)',
            transition: 'width 0.5s ease',
            boxShadow: '0 0 12px rgba(16, 185, 129, 0.5)',
          }} />
        </div>
      </div>

      {/* Today Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '14px',
      }}>
        {[
          { icon: <Zap size={14} />, value: data.todayXP, label: vi ? 'XP hôm nay' : 'Today XP', color: '#10b981' },
          { icon: <Star size={14} />, value: data.activities?.total_activities || 0, label: vi ? 'Hoạt động' : 'Activities', color: '#f59e0b' },
          { icon: <Trophy size={14} />, value: data.unlockedBadges?.length || 0, label: vi ? 'Huy chương' : 'Badges', color: '#8b5cf6' },
        ].map((s, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px 8px',
            textAlign: 'center',
          }}>
            <div style={{ color: s.color, marginBottom: '4px' }}>{s.icon}</div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem' }}>{s.value}</div>
            <div style={{ fontSize: '0.58rem', opacity: 0.6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Badges Toggle */}
      <button onClick={() => setShowBadges(!showBadges)} style={{
        width: '100%', padding: '8px', borderRadius: '10px',
        background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)',
        color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 600,
      }}>
        🏆 {vi ? 'Bộ sưu tập huy chương' : 'Badge Collection'}
        {showBadges ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {showBadges && (
        <div style={{
          marginTop: '10px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '8px',
        }}>
          {badges.map(b => (
            <div key={b.id} style={{
              padding: '10px 6px', borderRadius: '12px', textAlign: 'center',
              background: b.unlocked ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${b.unlocked ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.08)'}`,
              opacity: b.unlocked ? 1 : 0.5,
            }}>
              <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>{b.name.split(' ')[0]}</div>
              <div style={{ fontSize: '0.6rem', fontWeight: 600, lineHeight: 1.2 }}>
                {vi ? b.nameVi : b.name.split(' ').slice(1).join(' ')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
