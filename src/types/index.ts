// ========================================
// Henry Learning OS — Complete Type System
// Based on: DATA_MODEL.md + ADAPTIVE_ACCELERATION_SPEC.md
// ========================================

// --- Enums & Union Types ---

export type LearningPathway = 'vietnam_public' | 'bilingual' | 'cambridge' | 'ib' | 'us_ap' | 'custom';
export type ParentRole = 'father' | 'mother' | 'guardian';
export type SafetyLevel = 'under_13' | 'teen_13_15' | 'teen_16_18';

export type MasteryStateValue =
  | 'not_started'
  | 'exposed'
  | 'practicing'
  | 'assisted_success'
  | 'independent_success'
  | 'retained_after_delay'
  | 'transfer_success'
  | 'mastered'
  | 'needs_review';

export type ErrorType =
  | 'concept'
  | 'procedure'
  | 'calculation'
  | 'reading'
  | 'vocabulary'
  | 'attention'
  | 'strategy'
  | 'unknown';

export type AIRole =
  | 'tutor'
  | 'classmate'
  | 'opponent'
  | 'coach'
  | 'examiner'
  | 'librarian'
  | 'project_mentor'
  | 'parent_assistant'
  | 'safety_guardian';

export type SupportLevel =
  | 'none'
  | 'hint_light'
  | 'hint_medium'
  | 'worked_example'
  | 'explanation'
  | 'feedback';

export type SafetySeverity = 'low' | 'medium' | 'high' | 'urgent';

export type ReviewItemType = 'competency' | 'flashcard' | 'mistake' | 'reading_vocab';

export type PortfolioItemType =
  | 'writing'
  | 'project'
  | 'code'
  | 'science'
  | 'reading'
  | 'presentation'
  | 'art'
  | 'life_skill';

export type LearningDomain =
  | 'vietnamese_reading'
  | 'vietnamese_writing'
  | 'math'
  | 'english'
  | 'science'
  | 'coding'
  | 'life_skills'
  | 'emotional'
  | 'physical'
  | 'projects'
  // --- Elite Capability Domains (6 Pillars) ---
  | 'bilingual_deep'       // Pillar 1: Song ngu sau
  | 'probability_data'     // Pillar 2: Xac suat & Du lieu
  | 'civics_geopolitics'   // Pillar 3: Lich su, Luat, Chinh sach
  | 'finance_assets'       // Pillar 4: Tai chinh, Ke toan, Tai san
  | 'negotiation_leadership' // Pillar 5: Ban hang, Thuyet phuc
  | 'ethics_resilience';   // Pillar 6: Dao duc, Tu chu, Chiu ap luc

export type AccelerationStatus =
  | 'foundation_needed'
  | 'on_track'
  | 'ready_for_stretch'
  | 'ready_for_acceleration'
  | 'accelerating'
  | 'needs_consolidation'
  | 'overchallenged'
  | 'underchallenged'
  | 'asynchronous_profile_detected';

export type RecommendationType =
  | 'compact'
  | 'enrich'
  | 'accelerate'
  | 'consolidate'
  | 'scaffold';

export type RecommendationStatus = 'proposed' | 'accepted' | 'dismissed' | 'paused';

export type SessionStep =
  | 'check_in'
  | 'retrieval'
  | 'new_concept'
  | 'guided_practice'
  | 'independent_challenge'
  | 'teach_back'
  | 'reflection';

export type LearningEventType =
  | 'SESSION_STARTED'
  | 'QUESTION_ATTEMPTED'
  | 'HINT_USED'
  | 'MISTAKE_CLASSIFIED'
  | 'MASTERY_UPDATED'
  | 'REVIEW_SCHEDULED'
  | 'REFLECTION_SUBMITTED'
  | 'PORTFOLIO_ITEM_CREATED'
  | 'PARENT_MISSION_COMPLETED'
  | 'SAFETY_EVENT_CREATED';

export type CurriculumReviewStatus =
  | 'needs_human_review'
  | 'approved'
  | 'blocked';

export type CurriculumCalibrationStatus =
  | 'needs_real_attempts'
  | 'calibrating'
  | 'calibrated';

export interface CurriculumEvidenceRef {
  curriculumMapId: string;
  curriculumSubject: string;
  curriculumGrade: number;
  curriculumTopicKey: string;
  curriculumSourceVersion: string;
  curriculumOfficialStrand: string;
  curriculumReviewStatus: CurriculumReviewStatus;
  curriculumCalibrationStatus: CurriculumCalibrationStatus;
}

// --- Core Entities ---

export interface ChildProfile {
  id: string;
  nameOrNickname: string;
  birthYear: number;
  gradeLevel: number;
  locationContext: string;
  primaryLanguage: string;
  secondaryLanguage: string;
  learningPathway: LearningPathway;
  parentIds: string[];
  safetyLevel: SafetyLevel;
  interests: string[];
  strengths: string[];
  challenges: string[];
  eliteMetrics?: EliteCapabilityMetrics;
  createdAt: string;
  updatedAt: string;
}

// --- Elite Capability Metrics (6 Pillars) ---
// Evidence Base: Garcia 2014 (Translanguaging), Batanero 2016 (Stochastic),
// NCSS C3 2013, Jump$tart 2015, Wimmer & Perner 1983 (ToM), CASEL 2015
export interface EliteCapabilityMetrics {
  bilingual_agility: number;        // 0-100: Speed & naturalness of VN/EN switching
  stochastic_intuition: number;     // 0-100: Understanding of likelihood/probability
  systemic_reasoning: number;       // 0-100: Cause-effect & conflict resolution scoring
  investor_quotient: number;        // 0-100: Save/invest ratio vs spend ratio
  empathy_persuasion: number;       // 0-100: Win-win negotiation success rate
  stoic_resilience: number;         // 0-100: Recovery time & response after stress events
}

export interface ParentProfile {
  id: string;
  name: string;
  role: ParentRole;
  notificationPreferences: string[];
  coLearningTimeAvailable: number; // minutes per day
  valuesPreferences: string[];
}

export interface Competency {
  id: string;
  domain: LearningDomain;
  subject: string;
  ageBand: string;
  gradeBand: string;
  title: string;
  description: string;
  prerequisites: string[];
  evidenceRequired: string[];
}

export interface MasteryState {
  childId: string;
  competencyId: string;
  state: MasteryStateValue;
  masteryScore: number;
  retentionScore: number;
  transferScore: number;
  lastAttemptAt: string;
  nextReviewAt: string;
  evidenceCount: number;
}

export interface Lesson {
  id: string;
  subject: string;
  ageBand: string;
  competencyIds: string[];
  title: string;
  objective: string;
  contentBlocks: ContentBlock[];
  exercises: Exercise[];
  rubric: string[];
}

export interface ContentBlock {
  id: string;
  type: 'text' | 'example' | 'visual' | 'interactive';
  content: string;
  hint?: string;
}

export interface Exercise {
  id: string;
  question: string;
  type: 'multiple_choice' | 'free_text' | 'explain' | 'fill_blank';
  options?: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: number; // 1-5
  hints: string[];
  variations?: string[];
  tags?: string[];
  subject?: string;
  topicKey?: string;
  gradeLevel?: number;
  curriculum?: CurriculumEvidenceRef;
}

export interface Attempt {
  id: string;
  childId: string;
  lessonId: string;
  competencyId: string;
  exerciseId: string;
  answer: string;
  isCorrect: boolean;
  errorType: ErrorType | null;
  hintLevelUsed: number; // 0-5
  timeSpentSeconds: number;
  confidenceSelfRating: number; // 1-5
  aiRoleUsed: AIRole;
  curriculum?: CurriculumEvidenceRef;
  createdAt: string;
}

export interface Mistake {
  id: string;
  childId: string;
  competencyId: string;
  attemptId: string;
  errorType: ErrorType;
  explanation: string;
  correctionPlan: string;
  reviewSchedule: string[];
  resolvedAt: string | null;
}

export interface ReviewSchedule {
  id: string;
  childId: string;
  itemType: ReviewItemType;
  itemId: string;
  scheduledAt: string;
  intervalDays: number;
  easeFactor: number;
  lastResult: 'correct' | 'incorrect' | 'hint_needed' | null;
}

export interface Reflection {
  id: string;
  childId: string;
  sessionId: string;
  prompt: string;
  responseText: string;
  responseAudioUrl: string | null;
  mood: number; // 1-5
  energyLevel: number; // 1-5
  createdAt: string;
}

export interface PortfolioItem {
  id: string;
  childId: string;
  type: PortfolioItemType;
  title: string;
  description: string;
  fileUrls: string[];
  linkedCompetencies: string[];
  parentComment: string;
  childReflection: string;
  createdAt: string;
}

export interface ParentObservation {
  id: string;
  parentId: string;
  childId: string;
  observationType: string;
  note: string;
  linkedSessionId: string | null;
  createdAt: string;
}

export interface AIInteractionLog {
  id: string;
  childId: string;
  sessionId: string;
  role: AIRole;
  subject: string;
  ageBand: string;
  supportLevel: SupportLevel;
  safetyFlags: string[];
  responseQualityScore: number;
  createdAt: string;
}

export interface SafetyEvent {
  id: string;
  childId: string;
  eventType: string;
  severity: SafetySeverity;
  triggerSummary: string;
  actionTaken: string;
  parentNotified: boolean;
  createdAt: string;
}

// --- Adaptive Acceleration Entities ---

export interface LearningLevel {
  id: string;
  domain: LearningDomain;
  levelCode: string;
  title: string;
  prerequisites: string[];
  conceptDescription: string;
  cognitiveDemandRating: number;
  emotionalDemandRating: number;
  contentSafetyRating: number;
  ageUiMin: number;
  parentApprovalRequired: boolean;
  masteryCriteria: string[];
  transferTasks: string[];
  enrichmentTasks: string[];
}

export interface SkillState {
  id: string;
  childId: string;
  skillId: string;
  currentLevel: string;
  recommendedNextLevel: string | null;
  exposureCount: number;
  independentAccuracy: number;
  guidedAccuracy: number;
  hintDependency: number;
  averageResponseLatency: number;
  explanationQuality: number;
  retentionScore: number;
  transferScore: number;
  challengeFitScore: number;
  learningVelocity: number;
  frustrationSignal: number;
  boredomSignal: number;
  parentObservationScore: number;
  accelerationStatus: AccelerationStatus;
  lastMasteryCheckAt: string;
  nextReviewAt: string;
}

export interface AccelerationRecommendation {
  id: string;
  childId: string;
  domain: LearningDomain;
  skillCluster: string;
  recommendationType: RecommendationType;
  evidenceSummary: string;
  riskNotes: string;
  parentAction: string;
  status: RecommendationStatus;
  createdAt: string;
}

export interface AsynchronousProfileSnapshot {
  id: string;
  childId: string;
  snapshotDate: string;
  domainLevels: Record<LearningDomain, string>;
  strengths: string[];
  typicalAreas: string[];
  supportAreas: string[];
  underchallengeRisks: string[];
  overchallengeRisks: string[];
  parentNotes: string;
}

// --- Session & Learning Event ---

export interface LearningSession {
  id: string;
  childId: string;
  lessonId: string;
  currentStep: SessionStep;
  startedAt: string;
  completedAt: string | null;
  mood: number;
  energyLevel: number;
  attempts: Attempt[];
  reflectionId: string | null;
}

export interface LearningEvent {
  id: string;
  type: LearningEventType;
  childId: string;
  sessionId: string | null;
  payload: Record<string, unknown>;
  createdAt: string;
}

// --- Weekly Review ---

export interface WeeklyReview {
  id: string;
  childId: string;
  parentId: string;
  weekStartDate: string;
  childReflection: string;
  parentReflection: string;
  highlights: string[];
  concerns: string[];
  nextWeekGoals: string[];
  createdAt: string;
}

// --- Parent Mission ---

export interface ParentMission {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  category: 'listen' | 'read' | 'ask' | 'review' | 'project' | 'discuss';
  completedAt: string | null;
}

// --- Reading Journal ---

export interface ReadingEntry {
  id: string;
  childId: string;
  bookTitle: string;
  author: string;
  pagesRead: number;
  minutesRead: number;
  childSummary: string;
  newWords: string[];
  parentNote: string;
  createdAt: string;
}
