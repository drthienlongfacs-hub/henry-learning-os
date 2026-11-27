// Real Data-Driven Exam Analytics Store for Cambridge Exams (Starters -> PET)

import type { CambridgeExamLevelId } from '@/data/cambridge-official-framework';

export type ExamPracticeMode = 'guided' | 'exam';
export type ExamAttemptSource = 'exams-bank' | 'cambridge-ket-pet';

export interface ExamPartBreakdown {
  partNumber: number;
  partTitle: string;
  taskTypeVi: string;
  correct: number;
  total: number;
  accuracyPct: number;
}

export interface ExamAttemptRecord {
  id: string;
  completedAt: string;
  source: ExamAttemptSource;
  level: CambridgeExamLevelId;
  testId: string;
  testTitle: string;
  setNo?: number;
  skill: string;
  mode: ExamPracticeMode;
  score: number;
  total: number;
  accuracyPct: number;
  shields: number;
  durationSec: number;
  partBreakdown: ExamPartBreakdown[];
  wrongQuestionIds: string[];
}

export interface TaskTypePerformance {
  taskTypeVi: string;
  correct: number;
  total: number;
  accuracyPct: number;
  strategyTipVi: string;
}

export interface LevelExamAnalytics {
  level: CambridgeExamLevelId;
  attemptCount: number;
  completedTestIds: string[];
  averageAccuracyPct: number;
  bestAccuracyPct: number;
  bestShields: number;
  latestAttempt: ExamAttemptRecord | null;
  bestByTestId: Record<string, { score: number; total: number; accuracyPct: number; shields: number }>;
  weakTaskTypes: TaskTypePerformance[];
  strongTaskTypes: TaskTypePerformance[];
  wrongQuestionPool: string[];
  nextActionVi: string;
  recommendedStrategyVi: string;
}

export interface OverallExamSummary {
  totalAttempts: number;
  uniqueTestsCompleted: number;
  averageAccuracyPct: number;
  byLevel: Record<CambridgeExamLevelId, LevelExamAnalytics>;
}

const EXAM_HISTORY_STORAGE_KEY = 'henry-cambridge-exam-history-v1';
const MAX_HISTORY_RECORDS = 200;

const STRATEGY_BY_TASK_KEYWORD: Array<{ match: RegExp; tipVi: string }> = [
  {
    match: /nghe|listen|nối tên|tô màu|mô tả người/i,
    tipVi: 'Đọc câu hỏi & dự đoán loại thông tin trước khi nghe; cảnh giác đoạn người nói tự sửa ("actually", "no, wait").',
  },
  {
    match: /chính tả|đánh vần|sắp chữ|spell|jumbled/i,
    tipVi: 'Tìm nguyên âm (a, e, i, o, u) trước khi ghép phụ âm và kiểm tra chính tả từng chữ cái.',
  },
  {
    match: /đọc|truyện|hiểu|thông báo|biển báo|chèn câu|gapped|long text|short text/i,
    tipVi: 'Đọc câu hỏi trước đoạn văn, gạch từ khóa và tìm câu diễn đạt đồng nghĩa (paraphrase) thay vì chỉ ghép từ giống hệt.',
  },
  {
    match: /điền|cloze|word-box|hộp từ|mở/i,
    tipVi: 'Xác định loại từ cần điền dựa vào từ đứng ngay trước và sau chỗ trống rồi đọc lại cả câu để kiểm tra nghĩa.',
  },
  {
    match: /hội thoại|dialogue|conversation/i,
    tipVi: 'Xác định đúng chủ đề và thì động từ của câu hỏi A trước khi loại trừ các đáp án lạc đề.',
  },
  {
    match: /viết|writing|email|truyện|story/i,
    tipVi: 'Kiểm tra đủ tất cả ý yêu cầu của đề, dùng từ nối (First, Then, Because, Finally) và soát lại thì động từ.',
  },
  {
    match: /nói|speaking|phỏng vấn|thảo luận/i,
    tipVi: 'Trả lời thành câu đầy đủ, bổ sung lý do với "because" hoặc ví dụ cụ thể thay vì trả lời 1-2 từ.',
  },
];

function inferStrategyTip(taskTypeVi: string): string {
  const matched = STRATEGY_BY_TASK_KEYWORD.find(entry => entry.match.test(taskTypeVi));
  return (
    matched?.tipVi ??
    'Làm chậm từng bước theo khung tư duy, gạch chân từ khóa và xem kỹ phần giải thích ở câu vừa sai.'
  );
}

function isValidRecord(item: unknown): item is ExamAttemptRecord {
  if (!item || typeof item !== 'object') return false;
  const candidate = item as Partial<ExamAttemptRecord>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.level === 'string' &&
    typeof candidate.testId === 'string' &&
    typeof candidate.score === 'number' &&
    typeof candidate.total === 'number' &&
    Array.isArray(candidate.partBreakdown)
  );
}

export function loadExamHistory(): ExamAttemptRecord[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(EXAM_HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidRecord);
  } catch {
    return [];
  }
}

function saveExamHistory(records: ExamAttemptRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(
      EXAM_HISTORY_STORAGE_KEY,
      JSON.stringify(records.slice(0, MAX_HISTORY_RECORDS)),
    );
  } catch {
    // Ignore quota or sandboxed storage errors gracefully
  }
}

export function clearExamHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(EXAM_HISTORY_STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }
}

export function recordExamAttempt(
  input: Omit<ExamAttemptRecord, 'id' | 'completedAt'>,
): ExamAttemptRecord {
  const newRecord: ExamAttemptRecord = {
    ...input,
    id: `exam-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    completedAt: new Date().toISOString(),
  };

  const existing = loadExamHistory();
  const next = [newRecord, ...existing].slice(0, MAX_HISTORY_RECORDS);
  saveExamHistory(next);
  return newRecord;
}

export function getLevelAnalytics(
  level: CambridgeExamLevelId,
  historyInput?: ExamAttemptRecord[],
): LevelExamAnalytics {
  const history = historyInput ?? loadExamHistory();
  const levelAttempts = history.filter(item => item.level === level);

  if (levelAttempts.length === 0) {
    return {
      level,
      attemptCount: 0,
      completedTestIds: [],
      averageAccuracyPct: 0,
      bestAccuracyPct: 0,
      bestShields: 0,
      latestAttempt: null,
      bestByTestId: {},
      weakTaskTypes: [],
      strongTaskTypes: [],
      wrongQuestionPool: [],
      nextActionVi: 'Chưa có dữ liệu thi ở cấp độ này. Hãy bắt đầu với Bộ 1 ở chế độ Luyện có hướng dẫn để hệ thống đo điểm mạnh/yếu.',
      recommendedStrategyVi: 'Ở lượt làm đầu tiên, bật khung chiến lược giải đề ở từng câu để nắm quy tắc 3–5 bước chuẩn Cambridge.',
    };
  }

  const bestByTestId: Record<string, { score: number; total: number; accuracyPct: number; shields: number }> = {};
  const taskStats = new Map<string, { correct: number; total: number }>();
  const wrongIds = new Set<string>();

  let accuracySum = 0;
  let bestAccuracyPct = 0;
  let bestShields = 0;

  for (const attempt of levelAttempts) {
    accuracySum += attempt.accuracyPct;
    if (attempt.accuracyPct > bestAccuracyPct) bestAccuracyPct = attempt.accuracyPct;
    if (attempt.shields > bestShields) bestShields = attempt.shields;

    const prevBest = bestByTestId[attempt.testId];
    if (!prevBest || attempt.accuracyPct > prevBest.accuracyPct) {
      bestByTestId[attempt.testId] = {
        score: attempt.score,
        total: attempt.total,
        accuracyPct: attempt.accuracyPct,
        shields: attempt.shields,
      };
    }

    for (const part of attempt.partBreakdown) {
      const label = part.taskTypeVi || part.partTitle;
      const cur = taskStats.get(label) ?? { correct: 0, total: 0 };
      cur.correct += part.correct;
      cur.total += part.total;
      taskStats.set(label, cur);
    }

    for (const qId of attempt.wrongQuestionIds ?? []) {
      wrongIds.add(qId);
    }
  }

  const taskPerformances: TaskTypePerformance[] = Array.from(taskStats.entries())
    .filter(([, stats]) => stats.total > 0)
    .map(([taskTypeVi, stats]) => ({
      taskTypeVi,
      correct: stats.correct,
      total: stats.total,
      accuracyPct: Math.round((stats.correct / stats.total) * 100),
      strategyTipVi: inferStrategyTip(taskTypeVi),
    }));

  const weakTaskTypes = taskPerformances
    .filter(item => item.accuracyPct < 75)
    .sort((a, b) => a.accuracyPct - b.accuracyPct)
    .slice(0, 3);

  const strongTaskTypes = taskPerformances
    .filter(item => item.accuracyPct >= 75)
    .sort((a, b) => b.accuracyPct - a.accuracyPct)
    .slice(0, 3);

  const averageAccuracyPct = Math.round(accuracySum / levelAttempts.length);
  const topWeak = weakTaskTypes[0];

  const nextActionVi = topWeak
    ? `Dạng bài cần ưu tiên: "${topWeak.taskTypeVi}" (${topWeak.accuracyPct}%). Hãy dùng chế độ Luyện lại câu sai hoặc ôn lại Part này ở Bộ đề kế tiếp.`
    : averageAccuracyPct >= 85
      ? `Phong độ tốt (${averageAccuracyPct}%). Bé có thể chuyển sang chế độ Thi thử bấm giờ hoặc nâng cấp độ tiếp theo.`
      : `Đã hoàn thành ${Object.keys(bestByTestId).length} bài với trung bình ${averageAccuracyPct}%. Tiếp tục luyện thêm các bộ đề tiếp theo để giữ vững 4–5 khiên.`;

  const recommendedStrategyVi = topWeak
    ? topWeak.strategyTipVi
    : 'Duy trì thói quen đọc kỹ từ khóa câu hỏi trước khi xem đáp án hoặc nghe băng, và rà lại toàn bộ bài trước khi nộp.';

  return {
    level,
    attemptCount: levelAttempts.length,
    completedTestIds: Object.keys(bestByTestId),
    averageAccuracyPct,
    bestAccuracyPct,
    bestShields,
    latestAttempt: levelAttempts[0] ?? null,
    bestByTestId,
    weakTaskTypes,
    strongTaskTypes,
    wrongQuestionPool: Array.from(wrongIds),
    nextActionVi,
    recommendedStrategyVi,
  };
}

export function getOverallExamSummary(historyInput?: ExamAttemptRecord[]): OverallExamSummary {
  const history = historyInput ?? loadExamHistory();
  const levels: CambridgeExamLevelId[] = ['starters', 'movers', 'flyers', 'ket', 'pet'];

  const byLevel = levels.reduce<Record<CambridgeExamLevelId, LevelExamAnalytics>>((acc, lv) => {
    acc[lv] = getLevelAnalytics(lv, history);
    return acc;
  }, {} as Record<CambridgeExamLevelId, LevelExamAnalytics>);

  const uniqueTestsCompleted = new Set(history.map(item => item.testId)).size;
  const averageAccuracyPct =
    history.length > 0
      ? Math.round(history.reduce((sum, item) => sum + item.accuracyPct, 0) / history.length)
      : 0;

  return {
    totalAttempts: history.length,
    uniqueTestsCompleted,
    averageAccuracyPct,
    byLevel,
  };
}
