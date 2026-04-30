import { describe, expect, it } from 'vitest';
import { PRIVACY_INVENTORY, buildPrivacyEvidencePanel } from '@/lib/privacy/privacy-evidence';

describe('privacy evidence panel', () => {
    it('keeps every stored data group purpose-bound and SOT-traceable', () => {
        expect(PRIVACY_INVENTORY.length).toBeGreaterThanOrEqual(10);

        PRIVACY_INVENTORY.forEach((item) => {
            expect(item.purpose.length).toBeGreaterThan(30);
            expect(item.minimizationRule.length).toBeGreaterThan(30);
            expect(item.retentionRule.length).toBeGreaterThan(20);
            expect(item.sourceIds).toContain('sot-traceability-matrix');
            expect(item.exportStatus).toBe('available_local');
            expect(item.deleteStatus).toBe('available_local');
        });
    });

    it('builds a runtime inventory without legal overclaim', () => {
        const panel = buildPrivacyEvidencePanel({
            child_profile: 1,
            attempts: 12,
            mistakes: 3,
            ai_logs: 5,
        });

        expect(panel.readiness100).toBe(100);
        expect(panel.totalRecordCount).toBe(21);
        expect(panel.noAdsTracking).toBe(true);
        expect(panel.legalCertificationClaimAllowed).toBe(false);
        expect(panel.allowedClaim).toContain('privacy evidence inventory');
        expect(panel.blockedClaim).toContain('Không claim tuân thủ pháp lý đầy đủ');
        expect(panel.sourceIds).toEqual(expect.arrayContaining(['unicef-ai-children', 'nist-ai-rmf']));
    });
});

