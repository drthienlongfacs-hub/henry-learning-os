/**
 * fsrs.ts — Free Spaced Repetition Scheduler (FSRS v4)
 * Ported from LinguaKids — 15% better retention than SM-2 (Anki default)
 * Reference: https://github.com/open-spaced-repetition/ts-fsrs
 */

const DEFAULT_PARAMS = {
  w: [0.4, 0.6, 2.4, 5.8, 4.93, 0.94, 0.86, 0.01, 1.49, 0.14, 0.94, 2.18, 0.05, 0.34, 1.26, 0.29, 2.61],
  requestRetention: 0.9,
  maximumInterval: 36500,
};

export const Rating = { Again: 1, Hard: 2, Good: 3, Easy: 4 } as const;
export type RatingValue = typeof Rating[keyof typeof Rating];

export const State = { New: 0, Learning: 1, Review: 2, Relearning: 3 } as const;

export interface FSRSCard {
  due: string;
  stability: number;
  difficulty: number;
  elapsedDays: number;
  scheduledDays: number;
  reps: number;
  lapses: number;
  state: number;
  lastReview: string | null;
}

export function createCard(): FSRSCard {
  return {
    due: new Date().toISOString(),
    stability: 0, difficulty: 0,
    elapsedDays: 0, scheduledDays: 0,
    reps: 0, lapses: 0,
    state: State.New, lastReview: null,
  };
}

class FSRSScheduler {
  private w: number[];
  private requestRetention: number;
  private maximumInterval: number;

  constructor(params = DEFAULT_PARAMS) {
    this.w = params.w;
    this.requestRetention = params.requestRetention;
    this.maximumInterval = params.maximumInterval;
  }

  private initStability(r: number) { return Math.max(this.w[r - 1], 0.1); }
  private initDifficulty(r: number) { return Math.min(Math.max(this.w[4] - (r - 3) * this.w[5], 1), 10); }
  private nextDifficulty(d: number, r: number) {
    return Math.min(Math.max(this.w[7] * this.w[4] + (1 - this.w[7]) * (d - this.w[6] * (r - 3)), 1), 10);
  }
  private nextRecallStability(d: number, s: number, r: number, elapsed: number) {
    const hp = r === Rating.Hard ? this.w[15] : 1;
    const eb = r === Rating.Easy ? this.w[16] : 1;
    return s * (1 + Math.exp(this.w[8]) * (11 - d) *
      Math.pow(s, -this.w[9]) *
      (Math.exp((1 - (elapsed / s)) * this.w[10]) - 1) * hp * eb);
  }
  private nextForgetStability(d: number, s: number) {
    return this.w[11] * Math.pow(d, -this.w[12]) * (Math.pow(s + 1, this.w[13]) - 1) * Math.exp((1 - 0.9) * this.w[14]);
  }
  private nextInterval(s: number) {
    const interval = (s / 0.9) * (Math.pow(this.requestRetention, 1 / -0.5) - 1);
    return Math.min(Math.max(Math.round(interval), 1), this.maximumInterval);
  }

  schedule(card: FSRSCard, rating: RatingValue, now = new Date()): FSRSCard {
    const c = { ...card };
    const elapsed = c.lastReview ? Math.max(0, (now.getTime() - new Date(c.lastReview).getTime()) / 86400000) : 0;
    c.lastReview = now.toISOString();
    c.reps += 1;

    if (c.state === State.New) {
      c.stability = this.initStability(rating);
      c.difficulty = this.initDifficulty(rating);
      c.elapsedDays = 0;
      if (rating <= Rating.Good) {
        c.state = State.Learning;
        c.scheduledDays = 0;
        const delays: Record<number, number> = { [Rating.Again]: 60000, [Rating.Hard]: 300000, [Rating.Good]: 600000 };
        c.due = new Date(now.getTime() + (delays[rating as number] || 600000)).toISOString();
      } else {
        c.state = State.Review;
        const interval = this.nextInterval(c.stability);
        c.scheduledDays = interval;
        c.due = new Date(now.getTime() + interval * 86400000).toISOString();
      }
    } else if (c.state === State.Learning || c.state === State.Relearning) {
      c.elapsedDays = elapsed;
      if (rating === Rating.Again) {
        c.stability = this.initStability(rating);
        c.scheduledDays = 0;
        c.due = new Date(now.getTime() + 300000).toISOString();
        c.lapses += 1;
      } else if (rating === Rating.Hard) {
        c.stability = this.initStability(rating);
        c.scheduledDays = 0;
        c.due = new Date(now.getTime() + 600000).toISOString();
      } else {
        c.state = State.Review;
        c.stability = this.initStability(rating);
        const interval = this.nextInterval(c.stability);
        c.scheduledDays = interval;
        c.due = new Date(now.getTime() + interval * 86400000).toISOString();
      }
    } else {
      c.elapsedDays = elapsed;
      if (rating === Rating.Again) {
        c.state = State.Relearning;
        c.lapses += 1;
        c.stability = this.nextForgetStability(c.difficulty, c.stability);
        c.difficulty = this.nextDifficulty(c.difficulty, rating);
        c.scheduledDays = 0;
        c.due = new Date(now.getTime() + 300000).toISOString();
      } else {
        c.stability = this.nextRecallStability(c.difficulty, c.stability, rating, elapsed);
        c.difficulty = this.nextDifficulty(c.difficulty, rating);
        const interval = this.nextInterval(c.stability);
        c.scheduledDays = interval;
        c.due = new Date(now.getTime() + interval * 86400000).toISOString();
      }
    }
    return c;
  }
}

export const fsrs = new FSRSScheduler();

// LocalStorage persistence
const STORAGE_KEY = 'henry-fsrs-cards';

export function loadFSRSCards(): Record<string, FSRSCard> {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch { return {}; }
}

export function saveFSRSCards(cards: Record<string, FSRSCard>) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cards)); } catch {}
}

export function reviewCard(wordId: string, rating: RatingValue): FSRSCard {
  const cards = loadFSRSCards();
  const card = cards[wordId] || createCard();
  const updated = fsrs.schedule(card, rating);
  cards[wordId] = updated;
  saveFSRSCards(cards);
  return updated;
}

export function getDueWordIds(): string[] {
  const cards = loadFSRSCards();
  const now = new Date();
  return Object.entries(cards)
    .filter(([, card]) => new Date(card.due) <= now)
    .sort((a, b) => (a[1].stability || 0) - (b[1].stability || 0))
    .map(([id]) => id);
}
