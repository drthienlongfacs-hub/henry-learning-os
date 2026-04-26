// ========================================
// License Gate — blocks prohibited actions
// ========================================

import type { LicensePolicy, LicenseUse } from '@/types/resource-types';

export type LicenseAction = 'link' | 'cache_metadata' | 'cache_content' | 'transform';

const ACTION_HIERARCHY: Record<LicenseAction, number> = {
    link: 0,
    cache_metadata: 1,
    cache_content: 2,
    transform: 3,
};

const USE_CEILING: Record<LicenseUse, number> = {
    unknown: -1,        // block everything except linking
    link_only: 0,
    cache_metadata: 1,
    cache_content: 2,
    transform_allowed: 3,
};

export interface LicenseCheckResult {
    allowed: boolean;
    reason?: string;
    requiredAttribution: boolean;
}

/**
 * Check if a given action is allowed under the resource's license policy.
 * Unknown licenses block everything except direct linking.
 */
export function checkLicense(
    policy: LicensePolicy,
    action: LicenseAction,
): LicenseCheckResult {
    const actionLevel = ACTION_HIERARCHY[action];
    const ceiling = USE_CEILING[policy.allowedUse];

    if (ceiling < 0) {
        return {
            allowed: action === 'link',
            reason: action === 'link' ? undefined : `License is unknown — only direct linking is permitted`,
            requiredAttribution: policy.requiresAttribution,
        };
    }

    if (actionLevel > ceiling) {
        return {
            allowed: false,
            reason: `Action "${action}" exceeds allowed use "${policy.allowedUse}"`,
            requiredAttribution: policy.requiresAttribution,
        };
    }

    return {
        allowed: true,
        requiredAttribution: policy.requiresAttribution,
    };
}
