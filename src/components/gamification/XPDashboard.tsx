'use client';
/**
 * XPDashboard.tsx — Premium Gamification Widget
 * Shows: Animated Level Ring, XP bar, Streak, Today XP, Badges
 * Upgraded: SVG progress ring, micro-animations, glassmorphism
 */
import React, { useState, useEffect, useRef } from 'react';
import { getXPData, getAllBadges, type Badge } from '@/lib/xpEngine';
import { Flame, Star, Trophy, Zap, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

const RING_SIZE = 64;
const RING_STROKE = 5;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function AnimatedRing({ percentage, level }: { percentage: number; level: number }) {
  const [animPct, setAnimPct] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => setAnimPct(percentage), 100);
    return () => clearTimeout(timeout);
  }, [percentage]);

  const offset = RING_CIRCUMFERENCE - (animPct / 100) * RING_CIRCUMFERENCE;

  return (
    <div style={{ position: 'relative', width: RING_SIZE, height: RING_SIZE }}>
      <svg width={RING_SIZE} height={RING_SIZE} style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id="xp-ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <circle cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_RADIUS}
          stroke="rgba(255,255,255,0.1)" strokeWidth={RING_STROKE} fill="none" />
        <circle cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={RING_RADIUS}
          stroke="url(#xp-ring-grad)" strokeWidth={RING_STROKE} fill="none"
          strokeDasharray={RING_CIRCUMFERENCE} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontWeight: 900, fontSize: '1.3rem', lineHeight: 1,
          background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>{level}</span>
        <span style={{ fontSize: '0.5rem', opacity: 0.6, letterSpacing: '0.5px', marginTop: 1 }}>LEVEL</span>
      </div>
    </div>
  );
}

function PulsingFlame({ streak }: { streak: number }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '6px',
      background: streak > 0 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.08)',
      padding: '8px 14px', borderRadius: '14px',
      border: `1px solid ${streak > 0 ? 'rgba(245, 158, 11, 0.3)' : 'rgba(255,255,255,0.1)'}`,
      animation: streak >= 7 ? 'xp-pulse 2s ease-in-out infinite' : undefined,
    }}>
      <Flame size={18} color={streak > 0 ? '#f59e0b' : '#6b7280'}
        style={{ animation: streak > 0 ? 'xp-flicker 1.5s ease-in-out infinite' : undefined }} />
      <div>
        <div style={{ fontWeight: 800, fontSize: '1.1rem', lineHeight: 1 }}>{streak}</div>
        <div style={{ fontSize: '0.58rem', opacity: 0.7 }}>
          {streak === 1 ? 'day' : 'days'}
        </div>
      </div>
    </div>
  );
}

export default function XPDashboard({ lang = 'vi' }: { lang?: string }) {
  const vi = lang === 'vi';
  const [data, setData] = useState<ReturnType<typeof getXPData> | null>(null);
  const [badges, setBadges] = useState<(Badge & { unlocked: boolean })[]>([]);
  const [showBadges, setShowBadges] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(getXPData());
    setBadges(getAllBadges());

    // Inject keyframes once
    if (!document.getElementById('xp-dash-keyframes')) {
      const style = document.createElement('style');
      style.id = 'xp-dash-keyframes';
      style.textContent = `
        @keyframes xp-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes xp-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes xp-flicker {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.15); }
        }
        @keyframes xp-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.6); }
        }
        @keyframes xp-badge-pop {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes xp-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `;
      document.head.appendChild(style);
      styleRef.current = style;
    }
  }, []);

  if (!data) return null;
  const lp = data.levelProgress;
  const streakMilestone = data.streak >= 7;

  const stats = [
    { icon: <Zap size={16} />, value: data.todayXP, label: vi ? 'XP hôm nay' : 'Today XP', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)' },
    { icon: <Star size={16} />, value: data.activities?.total_activities || 0, label: vi ? 'Hoạt động' : 'Activities', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)' },
    { icon: <Trophy size={16} />, value: data.unlockedBadges?.length || 0, label: vi ? 'Huy chương' : 'Badges', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.12)' },
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f0c29 0%, #1e1b4b 40%, #312e81 100%)',
      borderRadius: '24px', padding: '22px', color: '#fff',
      boxShadow: '0 12px 40px rgba(30, 27, 75, 0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
      fontFamily: "'Inter', sans-serif",
      backdropFilter: 'blur(12px)',
    }}>

      {/* ── Header: Animated Ring + Streak ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <AnimatedRing percentage={lp.percentage} level={lp.level} />
          <div>
            <div style={{ fontSize: '0.65rem', opacity: 0.5, textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 500 }}>
              {vi ? 'Tổng cộng' : 'Total'}
            </div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.5px' }}>
              {data.totalXP.toLocaleString()} <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>XP</span>
            </div>
          </div>
        </div>
        <PulsingFlame streak={data.streak} />
      </div>

      {/* ── XP Progress Bar with Shimmer ── */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', opacity: 0.5, marginBottom: '6px' }}>
          <span>{vi ? `Cấp ${lp.level}` : `Level ${lp.level}`}</span>
          <span>{lp.progress}/{lp.needed} XP → {vi ? `Cấp ${lp.level + 1}` : `Level ${lp.level + 1}`}</span>
        </div>
        <div style={{
          height: '12px', borderRadius: '6px',
          background: 'rgba(255,255,255,0.08)', overflow: 'hidden',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
        }}>
          <div style={{
            height: '100%', borderRadius: '6px',
            width: `${lp.percentage}%`,
            background: 'linear-gradient(90deg, #10b981, #34d399, #6ee7b7)',
            backgroundSize: '200% 100%',
            animation: 'xp-shimmer 2.5s ease-in-out infinite',
            transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
            boxShadow: '0 0 16px rgba(16, 185, 129, 0.4)',
          }} />
        </div>
        {streakMilestone && (
          <div style={{
            marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px',
            background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', padding: '6px 10px',
            border: '1px solid rgba(245, 158, 11, 0.15)',
          }}>
            <Sparkles size={14} color="#f59e0b" />
            <span style={{ fontSize: '0.65rem', color: '#f59e0b', fontWeight: 600 }}>
              {vi ? `🔥 Chuỗi ${data.streak} ngày! Tuyệt vời!` : `🔥 ${data.streak}-day streak! Amazing!`}
            </span>
          </div>
        )}
      </div>

      {/* ── Today Stats with Hover Effects ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
        {stats.map((s, i) => (
          <div
            key={i}
            onMouseEnter={() => setHoveredStat(i)}
            onMouseLeave={() => setHoveredStat(null)}
            style={{
              background: hoveredStat === i ? s.bg : 'rgba(255,255,255,0.06)',
              borderRadius: '14px', padding: '12px 8px',
              textAlign: 'center', cursor: 'default',
              border: `1px solid ${hoveredStat === i ? `${s.color}30` : 'rgba(255,255,255,0.06)'}`,
              transition: 'all 0.3s ease',
              transform: hoveredStat === i ? 'translateY(-2px)' : 'translateY(0)',
            }}
          >
            <div style={{ color: s.color, marginBottom: '5px', transition: 'transform 0.3s',
              transform: hoveredStat === i ? 'scale(1.2)' : 'scale(1)',
            }}>{s.icon}</div>
            <div style={{ fontWeight: 800, fontSize: '1.15rem', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '0.56rem', opacity: 0.5, marginTop: '3px', letterSpacing: '0.3px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Badge Collection Toggle ── */}
      <button onClick={() => setShowBadges(!showBadges)} style={{
        width: '100%', padding: '10px', borderRadius: '12px',
        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
        color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 600,
        transition: 'all 0.2s',
      }}>
        <Trophy size={14} color="#8b5cf6" />
        {vi ? 'Bộ sưu tập huy chương' : 'Badge Collection'}
        ({badges.filter(b => b.unlocked).length}/{badges.length})
        {showBadges ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {showBadges && (
        <div style={{
          marginTop: '12px', display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
          gap: '8px',
        }}>
          {badges.map((b, bi) => (
            <div key={b.id} style={{
              padding: '12px 6px', borderRadius: '14px', textAlign: 'center',
              background: b.unlocked
                ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(139, 92, 246, 0.08))'
                : 'rgba(255,255,255,0.03)',
              border: `1px solid ${b.unlocked ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255,255,255,0.06)'}`,
              opacity: b.unlocked ? 1 : 0.4,
              animation: b.unlocked ? `xp-badge-pop 0.4s ease-out ${bi * 0.06}s both` : undefined,
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { if (b.unlocked) { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.08)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 16px rgba(16,185,129,0.3)'; }}}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
            >
              <div style={{
                fontSize: '1.6rem', marginBottom: '4px',
                filter: b.unlocked ? 'none' : 'grayscale(1)',
                animation: b.unlocked ? 'xp-float 3s ease-in-out infinite' : undefined,
                animationDelay: `${bi * 0.3}s`,
              }}>{b.name.split(' ')[0]}</div>
              <div style={{ fontSize: '0.58rem', fontWeight: 600, lineHeight: 1.2, color: b.unlocked ? '#d1d5db' : '#6b7280' }}>
                {vi ? b.nameVi : b.name.split(' ').slice(1).join(' ')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
