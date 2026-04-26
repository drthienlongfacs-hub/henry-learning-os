// ========================================
// Henry Learning OS — Zustand Store
// State management with localStorage persistence
// ========================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateId } from '@/lib/utils';
import { competencies, lessons, parentMissions } from '@/data/seed';
import type {
    ChildProfile,
    ParentProfile,
    MasteryState,
    Attempt,
    Mistake,
    ReviewSchedule,
    Reflection,
    LearningSession,
    ReadingEntry,
    WeeklyReview,
    AIInteractionLog,
    SafetyEvent,
    ParentMission,
    Competency,
    Lesson,
    SkillState,
    AccelerationRecommendation,
} from '@/types';

interface AppState {
    // --- Profiles ---
    childProfile: ChildProfile | null;
    parentProfile: ParentProfile | null;
    isOnboarded: boolean;

    // --- Learning Data ---
    competencies: Competency[];
    lessons: Lesson[];
    masteryStates: MasteryState[];
    attempts: Attempt[];
    mistakes: Mistake[];
    reviewSchedules: ReviewSchedule[];
    reflections: Reflection[];
    readingEntries: ReadingEntry[];
    weeklyReviews: WeeklyReview[];

    // --- Session ---
    currentSession: LearningSession | null;

    // --- AI & Safety ---
    aiInteractionLogs: AIInteractionLog[];
    safetyEvents: SafetyEvent[];

    // --- Parent ---
    parentMissions: ParentMission[];

    // --- Adaptive ---
    skillStates: SkillState[];
    accelerationRecommendations: AccelerationRecommendation[];

    // --- Actions ---
    setChildProfile: (profile: ChildProfile) => void;
    setParentProfile: (profile: ParentProfile) => void;
    completeOnboarding: (parent: ParentProfile, child: ChildProfile) => void;

    addAttempt: (attempt: Attempt) => void;
    addMistake: (mistake: Mistake) => void;
    addReviewSchedule: (review: ReviewSchedule) => void;
    addReflection: (reflection: Reflection) => void;
    addReadingEntry: (entry: ReadingEntry) => void;
    addWeeklyReview: (review: WeeklyReview) => void;
    addAIInteractionLog: (log: AIInteractionLog) => void;
    addSafetyEvent: (event: SafetyEvent) => void;

    updateMasteryState: (competencyId: string, updates: Partial<MasteryState>) => void;
    resolveMistake: (mistakeId: string) => void;
    completeParentMission: (missionId: string) => void;

    startSession: (lessonId: string) => void;
    updateSessionStep: (step: LearningSession['currentStep']) => void;
    endSession: () => void;

    updateReviewResult: (reviewId: string, result: 'correct' | 'incorrect' | 'hint_needed') => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            // --- Initial State ---
            childProfile: null,
            parentProfile: null,
            isOnboarded: false,
            competencies,
            lessons,
            masteryStates: [],
            attempts: [],
            mistakes: [],
            reviewSchedules: [],
            reflections: [],
            readingEntries: [],
            weeklyReviews: [],
            currentSession: null,
            aiInteractionLogs: [],
            safetyEvents: [],
            parentMissions,
            skillStates: [],
            accelerationRecommendations: [],

            // --- Profile Actions ---
            setChildProfile: (profile) => set({ childProfile: profile }),
            setParentProfile: (profile) => set({ parentProfile: profile }),

            completeOnboarding: (parent, child) => {
                // Initialize mastery states for all competencies
                const initialMasteryStates: MasteryState[] = competencies.map((c) => ({
                    childId: child.id,
                    competencyId: c.id,
                    state: 'not_started',
                    masteryScore: 0,
                    retentionScore: 0,
                    transferScore: 0,
                    lastAttemptAt: '',
                    nextReviewAt: '',
                    evidenceCount: 0,
                }));

                set({
                    parentProfile: parent,
                    childProfile: child,
                    isOnboarded: true,
                    masteryStates: initialMasteryStates,
                });
            },

            // --- Learning Actions ---
            addAttempt: (attempt) =>
                set((s) => ({ attempts: [...s.attempts, attempt] })),

            addMistake: (mistake) =>
                set((s) => ({ mistakes: [...s.mistakes, mistake] })),

            addReviewSchedule: (review) =>
                set((s) => ({ reviewSchedules: [...s.reviewSchedules, review] })),

            addReflection: (reflection) =>
                set((s) => ({ reflections: [...s.reflections, reflection] })),

            addReadingEntry: (entry) =>
                set((s) => ({ readingEntries: [...s.readingEntries, entry] })),

            addWeeklyReview: (review) =>
                set((s) => ({ weeklyReviews: [...s.weeklyReviews, review] })),

            addAIInteractionLog: (log) =>
                set((s) => ({ aiInteractionLogs: [...s.aiInteractionLogs, log] })),

            addSafetyEvent: (event) =>
                set((s) => ({ safetyEvents: [...s.safetyEvents, event] })),

            updateMasteryState: (competencyId, updates) =>
                set((s) => ({
                    masteryStates: s.masteryStates.map((ms) =>
                        ms.competencyId === competencyId ? { ...ms, ...updates } : ms
                    ),
                })),

            resolveMistake: (mistakeId) =>
                set((s) => ({
                    mistakes: s.mistakes.map((m) =>
                        m.id === mistakeId ? { ...m, resolvedAt: new Date().toISOString() } : m
                    ),
                })),

            completeParentMission: (missionId) =>
                set((s) => ({
                    parentMissions: s.parentMissions.map((m) =>
                        m.id === missionId ? { ...m, completedAt: new Date().toISOString() } : m
                    ),
                })),

            // --- Session Actions ---
            startSession: (lessonId) => {
                const child = get().childProfile;
                if (!child) return;

                const session: LearningSession = {
                    id: generateId(),
                    childId: child.id,
                    lessonId,
                    currentStep: 'check_in',
                    startedAt: new Date().toISOString(),
                    completedAt: null,
                    mood: 3,
                    energyLevel: 3,
                    attempts: [],
                    reflectionId: null,
                };

                set({ currentSession: session });
            },

            updateSessionStep: (step) =>
                set((s) => ({
                    currentSession: s.currentSession
                        ? { ...s.currentSession, currentStep: step }
                        : null,
                })),

            endSession: () =>
                set((s) => ({
                    currentSession: s.currentSession
                        ? { ...s.currentSession, completedAt: new Date().toISOString() }
                        : null,
                })),

            updateReviewResult: (reviewId, result) =>
                set((s) => ({
                    reviewSchedules: s.reviewSchedules.map((r) =>
                        r.id === reviewId ? { ...r, lastResult: result } : r
                    ),
                })),
        }),
        {
            name: 'henry-learning-os-store',
        }
    )
);
