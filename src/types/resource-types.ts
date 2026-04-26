// ========================================
// Resource Layer — Core Types
// Adapter pattern, Safety gates, Learning events
// Architecture: RESOURCE_INTEGRATION_ARCHITECTURE.md
// ========================================

// ── License ──────────────────────────────────

export type LicenseUse =
    | 'link_only'
    | 'cache_metadata'
    | 'cache_content'
    | 'transform_allowed'
    | 'unknown';

export interface LicensePolicy {
    spdxId?: string;        // e.g. "CC-BY-4.0", "MIT", "public-domain"
    allowedUse: LicenseUse;
    requiresAttribution: boolean;
    commercialOk: boolean;
    shareAlikeRequired: boolean;
    notes?: string;
}

// ── Attribution ──────────────────────────────

export interface ResourceAttribution {
    title: string;
    sourceName: string;
    sourceUrl: string;
    author?: string;
    license?: string;
    licenseUrl?: string;
    retrievedAt: string;    // ISO-8601
}

// ── Safety ───────────────────────────────────

export type SafetyGateType =
    | 'age'
    | 'pii'
    | 'social'
    | 'license'
    | 'tool'
    | 'finance'
    | 'medical';

export interface SafetyClassification {
    passed: boolean;
    failedGates: SafetyGateType[];
    ageAppropriate: boolean;
    ageMin?: number;
    ageMax?: number;
    containsPII: boolean;
    hasSocialFeatures: boolean;
    hasFinanceFeatures: boolean;
    hasMedicalContent: boolean;
    notes?: string;
}

// ── Pedagogy ─────────────────────────────────

export interface PedagogyWrapper {
    learningObjective: string;
    prerequisites: string[];
    retrievalQuestions: string[];
    discussionPrompts: string[];
    transferChallenge?: string;
    parentMission?: string;
    assessmentRubric?: Record<string, string>;
}

// ── Normalized Resource ──────────────────────

export interface NormalizedLearningResource {
    id: string;
    providerId: string;
    title: string;
    description?: string;
    language?: string;
    ageBand?: string;         // e.g. "6-8", "9-12", "13-18"
    subjectTags: string[];
    skillTags: string[];
    difficultyEstimate?: number; // 0.0 – 1.0
    contentUrl?: string;
    localCacheKey?: string;
    attribution: ResourceAttribution;
    safety: SafetyClassification;
    pedagogy?: PedagogyWrapper;
}

// ── Resource Query ───────────────────────────

export interface ResourceQuery {
    query?: string;
    subject?: string;
    ageBand?: string;
    language?: string;
    limit?: number;
}

// ── Adapter Interface ────────────────────────

export interface ExternalResourceAdapter {
    id: string;
    displayName: string;
    resourceType: 'book' | 'article' | 'simulation' | 'dataset' | 'exercise' | 'media' | 'tool';
    licensePolicy: LicensePolicy;
    fetchMetadata(query: ResourceQuery): Promise<NormalizedLearningResource[]>;
    fetchContent?(resourceId: string): Promise<{ content: string; mimeType: string }>;
}

// ── Learning Events (xAPI/Caliper-compatible) ─

export type LearningVerb =
    | 'attempted'
    | 'completed'
    | 'mastered'
    | 'reviewed'
    | 'hinted'
    | 'skipped'
    | 'reflected'
    | 'discussed';

export interface LearningEvent {
    id: string;
    actor: string;                   // "child:<id>"
    verb: LearningVerb;
    object: string;                  // "skill:fractions.add_unlike_denominators"
    context: {
        module: string;
        resourceProvider: string;      // adapter id or "internal"
        aiAssistanceLevel?: string;    // "none" | "hint_1" | "hint_2" | "explanation"
        parentPresent?: boolean;
    };
    result?: {
        success?: boolean;
        score?: number;                // 0.0 – 1.0
        durationSec?: number;
        confidence?: number;           // 0.0 – 1.0
    };
    timestamp: string;               // ISO-8601
}
