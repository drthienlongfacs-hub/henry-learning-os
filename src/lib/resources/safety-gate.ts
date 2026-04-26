// ========================================
// Safety Gate — 7 gates for child protection
// Age, PII, Social, License, Tool, Finance, Medical
// ========================================

import type { SafetyClassification, SafetyGateType } from '@/types/resource-types';

export interface SafetyContext {
    childAge: number;
    parentApproved?: boolean;
}

export interface SafetyCheckInput {
    ageMin?: number;
    ageMax?: number;
    containsPII?: boolean;
    hasSocialFeatures?: boolean;
    hasFinanceFeatures?: boolean;
    hasMedicalContent?: boolean;
    requiresToolAccess?: boolean;
}

/**
 * Run all 7 safety gates. Returns a SafetyClassification
 * with `passed: true` only if ALL gates pass.
 */
export function runSafetyGates(
    input: SafetyCheckInput,
    context: SafetyContext,
): SafetyClassification {
    const failedGates: SafetyGateType[] = [];

    // Gate 1: Age
    const ageAppropriate =
        (input.ageMin === undefined || context.childAge >= input.ageMin) &&
        (input.ageMax === undefined || context.childAge <= input.ageMax);
    if (!ageAppropriate) failedGates.push('age');

    // Gate 2: PII — no PII in external-facing resources
    if (input.containsPII) failedGates.push('pii');

    // Gate 3: Social — no direct child posting to third-party platforms
    if (input.hasSocialFeatures && !context.parentApproved) failedGates.push('social');

    // Gate 4: License — handled separately by license-gate.ts
    // (included for completeness in the classification)

    // Gate 5: Tool — no external state-changing tools without parent approval
    if (input.requiresToolAccess && !context.parentApproved) failedGates.push('tool');

    // Gate 6: Finance — no real-money features
    if (input.hasFinanceFeatures) failedGates.push('finance');

    // Gate 7: Medical — no diagnosis
    if (input.hasMedicalContent) failedGates.push('medical');

    return {
        passed: failedGates.length === 0,
        failedGates,
        ageAppropriate,
        ageMin: input.ageMin,
        ageMax: input.ageMax,
        containsPII: input.containsPII ?? false,
        hasSocialFeatures: input.hasSocialFeatures ?? false,
        hasFinanceFeatures: input.hasFinanceFeatures ?? false,
        hasMedicalContent: input.hasMedicalContent ?? false,
    };
}
