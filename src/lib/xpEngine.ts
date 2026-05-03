/**
 * xpEngine.ts — XP & Gamification Engine
 * Ported from LinguaKids — Streak, Badges, Levels (Duolingo-inspired)
 * Adapted for Henry Learning OS multi-subject (Math, Vietnamese, English, Science, etc.)
 */

const STORAGE_KEY = 'henry-xp-data';

export const XP_TABLE: Record<string, number> = {
  quiz_correct: 10,
  quiz_perfect: 25,
  reading_complete: 10,
  vocab_learn: 5,
  vocab_review: 3,
  phonics_practice: 8,
  math_correct: 10,
  science_correct: 10,
  vietnamese_correct: 10,
  daily_login: 10,
  streak_bonus_7: 50,
  streak_bonus_30: 200,
};

const LEVEL_XP = Array.from({ length: 50 }, (_, i) => (i + 1) * 100);

export interface Badge {
  id: string;
  name: string;
  nameVi: string;
  desc: string;
  requirement: { type: string; count: number };
  unlocked?: boolean;
}

const BADGES: Badge[] = [
  { id: 'first_step', name: '🌱 First Step', nameVi: 'Bước đầu tiên', desc: 'Complete first activity', requirement: { type: 'total_activities', count: 1 } },
  { id: 'reader_5', name: '📖 Bookworm', nameVi: 'Mọt sách', desc: 'Read 5 passages', requirement: { type: 'reading_done', count: 5 } },
  { id: 'reader_20', name: '📚 Library Hero', nameVi: 'Anh hùng thư viện', desc: 'Read 20 passages', requirement: { type: 'reading_done', count: 20 } },
  { id: 'vocab_10', name: '🔤 Word Builder', nameVi: 'Xây từ vựng', desc: 'Learn 10 words', requirement: { type: 'words_learned', count: 10 } },
  { id: 'vocab_50', name: '🧠 Vocab Master', nameVi: 'Bậc thầy từ vựng', desc: 'Learn 50 words', requirement: { type: 'words_learned', count: 50 } },
  { id: 'vocab_100', name: '👑 Word King', nameVi: 'Vua từ vựng', desc: 'Learn 100 words', requirement: { type: 'words_learned', count: 100 } },
  { id: 'streak_3', name: '🔥 On Fire', nameVi: 'Đang cháy', desc: '3-day streak', requirement: { type: 'streak', count: 3 } },
  { id: 'streak_7', name: '🔥🔥 Week Warrior', nameVi: 'Chiến binh tuần', desc: '7-day streak', requirement: { type: 'streak', count: 7 } },
  { id: 'streak_30', name: '🔥🔥🔥 Monthly Master', nameVi: 'Sư phụ tháng', desc: '30-day streak', requirement: { type: 'streak', count: 30 } },
  { id: 'quiz_10', name: '✅ Quiz Pro', nameVi: 'Siêu trắc nghiệm', desc: '10 perfect quizzes', requirement: { type: 'perfect_quizzes', count: 10 } },
  { id: 'math_star', name: '🔢 Math Star', nameVi: 'Ngôi sao Toán', desc: '20 math correct', requirement: { type: 'math_done', count: 20 } },
  { id: 'science_explorer', name: '🔬 Explorer', nameVi: 'Nhà khám phá', desc: '10 science activities', requirement: { type: 'science_done', count: 10 } },
  { id: 'level_5', name: '⭐ Rising Star', nameVi: 'Ngôi sao đang lên', desc: 'Reach level 5', requirement: { type: 'level', count: 5 } },
  { id: 'level_10', name: '🌟 Shining Star', nameVi: 'Ngôi sao sáng', desc: 'Reach level 10', requirement: { type: 'level', count: 10 } },
  { id: 'level_25', name: '💫 Superstar', nameVi: 'Siêu sao', desc: 'Reach level 25', requirement: { type: 'level', count: 25 } },
];

export interface XPData {
  totalXP: number;
  todayXP: number;
  todayDate: string;
  streak: number;
  lastActiveDate: string | null;
  activities: Record<string, number>;
  unlockedBadges: string[];
  xpHistory: { date: string; xp: number }[];
}

function loadXPData(): XPData {
  if (typeof window === 'undefined') return getDefaultXPData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return getDefaultXPData();
}

function getDefaultXPData(): XPData {
  return {
    totalXP: 0, todayXP: 0, todayDate: new Date().toDateString(),
    streak: 0, lastActiveDate: null,
    activities: { total_activities: 0, words_learned: 0, perfect_quizzes: 0, reading_done: 0, math_done: 0, science_done: 0 },
    unlockedBadges: [], xpHistory: [],
  };
}

function saveXPData(data: XPData) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

export interface XPResult {
  earnedXP: number;
  totalXP: number;
  level: number;
  newBadges: Badge[];
  streak: number;
}

export function awardXP(activityType: string, count = 1): XPResult {
  const data = loadXPData();
  const today = new Date().toDateString();

  if (data.todayDate !== today) {
    data.todayXP = 0;
    data.todayDate = today;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (data.lastActiveDate === yesterday) data.streak += 1;
    else if (data.lastActiveDate !== today) data.streak = 1;
  }
  data.lastActiveDate = today;

  const baseXP = (XP_TABLE[activityType] || 5) * count;
  const streakMult = data.streak >= 7 ? 1.5 : data.streak >= 3 ? 1.2 : 1;
  const earnedXP = Math.round(baseXP * streakMult);

  data.totalXP += earnedXP;
  data.todayXP += earnedXP;
  data.activities.total_activities = (data.activities.total_activities || 0) + count;

  // Map activity to counter
  const actMap: Record<string, string> = {
    vocab_learn: 'words_learned', vocab_review: 'words_learned',
    quiz_perfect: 'perfect_quizzes', reading_complete: 'reading_done',
    math_correct: 'math_done', science_correct: 'science_done',
  };
  if (actMap[activityType]) {
    data.activities[actMap[activityType]] = (data.activities[actMap[activityType]] || 0) + count;
  }

  // XP history (30 days)
  const existing = data.xpHistory.find(h => h.date === today);
  if (existing) existing.xp += earnedXP;
  else data.xpHistory.push({ date: today, xp: earnedXP });
  if (data.xpHistory.length > 30) data.xpHistory.shift();

  // Check new badges
  const newBadges = checkNewBadges(data);
  saveXPData(data);

  return { earnedXP, totalXP: data.totalXP, level: getLevel(data.totalXP), newBadges, streak: data.streak };
}

function checkNewBadges(data: XPData): Badge[] {
  const newlyUnlocked: Badge[] = [];
  const level = getLevel(data.totalXP);
  for (const badge of BADGES) {
    if (data.unlockedBadges.includes(badge.id)) continue;
    const req = badge.requirement;
    let met = false;
    if (req.type === 'level') met = level >= req.count;
    else if (req.type === 'streak') met = data.streak >= req.count;
    else met = (data.activities[req.type] || 0) >= req.count;
    if (met) {
      data.unlockedBadges.push(badge.id);
      newlyUnlocked.push(badge);
    }
  }
  return newlyUnlocked;
}

export function getLevel(totalXP: number): number {
  for (let i = 0; i < LEVEL_XP.length; i++) {
    if (totalXP < LEVEL_XP[i]) return i + 1;
  }
  return 50;
}

export function getLevelProgress(totalXP: number) {
  const level = getLevel(totalXP);
  const prev = level > 1 ? LEVEL_XP[level - 2] : 0;
  const next = LEVEL_XP[level - 1];
  const progress = totalXP - prev;
  const needed = next - prev;
  return { level, progress, needed, percentage: Math.min(100, Math.round((progress / needed) * 100)) };
}

export function getXPData() {
  const data = loadXPData();
  const today = new Date().toDateString();
  if (data.todayDate !== today) { data.todayXP = 0; data.todayDate = today; }
  return { ...data, level: getLevel(data.totalXP), levelProgress: getLevelProgress(data.totalXP) };
}

export function getAllBadges(): (Badge & { unlocked: boolean })[] {
  const data = loadXPData();
  return BADGES.map(b => ({ ...b, unlocked: data.unlockedBadges.includes(b.id) }));
}

export function getUnlockedBadges(): Badge[] {
  const data = loadXPData();
  return BADGES.filter(b => data.unlockedBadges.includes(b.id));
}
