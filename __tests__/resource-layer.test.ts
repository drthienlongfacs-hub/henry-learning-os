// ========================================
// Resource Layer Tests
// License gate, safety gate, adapters, learning events
// ========================================

import { describe, it, expect, beforeEach } from 'vitest';
import { checkLicense } from '@/lib/resources/license-gate';
import { runSafetyGates } from '@/lib/resources/safety-gate';
import {
    emitLearningEvent,
    getEvents,
    clearEvents,
    getEventCount,
} from '@/lib/events/learning-events';
import type { LicensePolicy } from '@/types/resource-types';

// ── License Gate ────────────────────────────

describe('License Gate', () => {
    const linkOnlyPolicy: LicensePolicy = {
        allowedUse: 'link_only',
        requiresAttribution: true,
        commercialOk: false,
        shareAlikeRequired: false,
    };

    const cacheMetaPolicy: LicensePolicy = {
        spdxId: 'CC0-1.0',
        allowedUse: 'cache_metadata',
        requiresAttribution: true,
        commercialOk: true,
        shareAlikeRequired: false,
    };

    const unknownPolicy: LicensePolicy = {
        allowedUse: 'unknown',
        requiresAttribution: false,
        commercialOk: false,
        shareAlikeRequired: false,
    };

    const publicDomainPolicy: LicensePolicy = {
        spdxId: 'public-domain',
        allowedUse: 'cache_content',
        requiresAttribution: true,
        commercialOk: true,
        shareAlikeRequired: false,
    };

    it('blocks cache_content for link_only policy', () => {
        const result = checkLicense(linkOnlyPolicy, 'cache_content');
        expect(result.allowed).toBe(false);
        expect(result.reason).toContain('exceeds allowed use');
    });

    it('allows linking for link_only policy', () => {
        const result = checkLicense(linkOnlyPolicy, 'link');
        expect(result.allowed).toBe(true);
    });

    it('allows cache_metadata for cache_metadata policy', () => {
        const result = checkLicense(cacheMetaPolicy, 'cache_metadata');
        expect(result.allowed).toBe(true);
    });

    it('blocks cache_content for cache_metadata policy', () => {
        const result = checkLicense(cacheMetaPolicy, 'cache_content');
        expect(result.allowed).toBe(false);
    });

    it('blocks everything except link for unknown license', () => {
        expect(checkLicense(unknownPolicy, 'link').allowed).toBe(true);
        expect(checkLicense(unknownPolicy, 'cache_metadata').allowed).toBe(false);
        expect(checkLicense(unknownPolicy, 'cache_content').allowed).toBe(false);
        expect(checkLicense(unknownPolicy, 'transform').allowed).toBe(false);
        expect(checkLicense(unknownPolicy, 'cache_metadata').reason).toContain('unknown');
    });

    it('allows cache_content for public domain policy', () => {
        const result = checkLicense(publicDomainPolicy, 'cache_content');
        expect(result.allowed).toBe(true);
    });

    it('blocks transform for public domain cache_content policy', () => {
        const result = checkLicense(publicDomainPolicy, 'transform');
        expect(result.allowed).toBe(false);
    });

    it('reports requiredAttribution correctly', () => {
        expect(checkLicense(cacheMetaPolicy, 'link').requiredAttribution).toBe(true);
        expect(checkLicense(unknownPolicy, 'link').requiredAttribution).toBe(false);
    });
});

// ── Safety Gate ─────────────────────────────

describe('Safety Gate', () => {
    it('passes for age-appropriate content without risky features', () => {
        const result = runSafetyGates(
            { ageMin: 6, ageMax: 18 },
            { childAge: 7 },
        );
        expect(result.passed).toBe(true);
        expect(result.failedGates).toHaveLength(0);
    });

    it('fails age gate if child is too young', () => {
        const result = runSafetyGates(
            { ageMin: 13, ageMax: 18 },
            { childAge: 7 },
        );
        expect(result.passed).toBe(false);
        expect(result.failedGates).toContain('age');
    });

    it('fails finance gate — no real-money features', () => {
        const result = runSafetyGates(
            { ageMin: 6, hasFinanceFeatures: true },
            { childAge: 10 },
        );
        expect(result.passed).toBe(false);
        expect(result.failedGates).toContain('finance');
    });

    it('fails medical gate — no diagnosis', () => {
        const result = runSafetyGates(
            { ageMin: 6, hasMedicalContent: true },
            { childAge: 10 },
        );
        expect(result.passed).toBe(false);
        expect(result.failedGates).toContain('medical');
    });

    it('fails PII gate if resource contains PII', () => {
        const result = runSafetyGates(
            { ageMin: 6, containsPII: true },
            { childAge: 10 },
        );
        expect(result.passed).toBe(false);
        expect(result.failedGates).toContain('pii');
    });

    it('blocks social features without parent approval', () => {
        const result = runSafetyGates(
            { ageMin: 6, hasSocialFeatures: true },
            { childAge: 10, parentApproved: false },
        );
        expect(result.passed).toBe(false);
        expect(result.failedGates).toContain('social');
    });

    it('allows social features with parent approval', () => {
        const result = runSafetyGates(
            { ageMin: 6, hasSocialFeatures: true },
            { childAge: 10, parentApproved: true },
        );
        expect(result.failedGates).not.toContain('social');
    });

    it('can fail multiple gates simultaneously', () => {
        const result = runSafetyGates(
            { ageMin: 13, hasFinanceFeatures: true, containsPII: true },
            { childAge: 7 },
        );
        expect(result.passed).toBe(false);
        expect(result.failedGates).toContain('age');
        expect(result.failedGates).toContain('finance');
        expect(result.failedGates).toContain('pii');
        expect(result.failedGates.length).toBe(3);
    });
});

// ── Learning Events ─────────────────────────

describe('Learning Events', () => {
    beforeEach(() => {
        clearEvents();
    });

    it('emits an event with correct xAPI-compatible shape', () => {
        const event = emitLearningEvent({
            childId: 'henry',
            verb: 'attempted',
            object: 'skill:fractions.add_unlike_denominators',
            module: 'math',
            resourceProvider: 'internal',
            success: true,
            score: 0.8,
            durationSec: 120,
        });

        expect(event.actor).toBe('child:henry');
        expect(event.verb).toBe('attempted');
        expect(event.object).toBe('skill:fractions.add_unlike_denominators');
        expect(event.context.module).toBe('math');
        expect(event.context.resourceProvider).toBe('internal');
        expect(event.result?.success).toBe(true);
        expect(event.result?.score).toBe(0.8);
        expect(event.timestamp).toBeTruthy();
        expect(event.id).toContain('evt-');
    });

    it('stores events and retrieves by child ID', () => {
        emitLearningEvent({
            childId: 'henry',
            verb: 'completed',
            object: 'skill:reading.phonics',
            module: 'reading',
        });
        emitLearningEvent({
            childId: 'henry',
            verb: 'attempted',
            object: 'skill:math.addition',
            module: 'math',
        });
        emitLearningEvent({
            childId: 'other',
            verb: 'attempted',
            object: 'skill:math.addition',
            module: 'math',
        });

        const henryEvents = getEvents('henry');
        expect(henryEvents).toHaveLength(2);

        const henryMath = getEvents('henry', 'math');
        expect(henryMath).toHaveLength(1);
        expect(henryMath[0].object).toBe('skill:math.addition');
    });

    it('tracks event count correctly', () => {
        expect(getEventCount()).toBe(0);

        emitLearningEvent({
            childId: 'henry',
            verb: 'mastered',
            object: 'skill:reading.sight_words',
            module: 'reading',
        });

        expect(getEventCount()).toBe(1);
    });

    it('stores curriculum traceability on learning events', () => {
        const event = emitLearningEvent({
            childId: 'henry',
            verb: 'attempted',
            object: 'exercise:math-1',
            module: 'math',
            curriculumMapId: 'primary:math:add_sub_10',
            curriculumSourceVersion: 'CTGDPT 2018 + cập nhật 2025, dùng cho benchmark năm học 2026-2027',
            curriculumOfficialStrand: 'Số và phép tính',
            curriculumReviewStatus: 'needs_human_review',
        });

        expect(event.context.curriculumMapId).toBe('primary:math:add_sub_10');
        expect(event.context.curriculumSourceVersion).toContain('2026-2027');
        expect(event.context.curriculumOfficialStrand).toBe('Số và phép tính');
        expect(event.context.curriculumReviewStatus).toBe('needs_human_review');
    });

    it('clearEvents resets the store', () => {
        emitLearningEvent({
            childId: 'henry',
            verb: 'reviewed',
            object: 'skill:science.plants',
            module: 'science',
        });
        expect(getEventCount()).toBe(1);

        clearEvents();
        expect(getEventCount()).toBe(0);
        expect(getEvents('henry')).toHaveLength(0);
    });

    it('assigns unique IDs to each event', () => {
        const e1 = emitLearningEvent({
            childId: 'henry',
            verb: 'attempted',
            object: 'skill:a',
            module: 'math',
        });
        const e2 = emitLearningEvent({
            childId: 'henry',
            verb: 'attempted',
            object: 'skill:b',
            module: 'math',
        });
        expect(e1.id).not.toBe(e2.id);
    });
});
