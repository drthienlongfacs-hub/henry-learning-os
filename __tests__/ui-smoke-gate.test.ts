import { describe, expect, it } from 'vitest';
import {
    UI_SMOKE_GATE,
    UI_SMOKE_ROUTES,
    UI_SMOKE_VIEWPORTS,
} from '@/data/ui-smoke-gate';

describe('UI smoke gate manifest', () => {
    it('defines a desktop/mobile route manifest for CI smoke testing', () => {
        expect(UI_SMOKE_ROUTES).toHaveLength(10);
        expect(UI_SMOKE_VIEWPORTS.map((viewport) => viewport.key)).toEqual(['desktop', 'mobile']);
        expect(UI_SMOKE_GATE.checkCount).toBe(UI_SMOKE_ROUTES.length * UI_SMOKE_VIEWPORTS.length);
        expect(UI_SMOKE_GATE.minimumTargetSizePx).toBeGreaterThanOrEqual(24);
        expect(UI_SMOKE_GATE.maxHorizontalOverflowPx).toBeLessThanOrEqual(32);
    });

    it('keeps each route tied to visible text instead of only checking HTTP status', () => {
        UI_SMOKE_ROUTES.forEach((route) => {
            expect(route.path).toMatch(/^\/.*\/?$/);
            expect(route.requiredText.length).toBeGreaterThanOrEqual(3);
            expect(route.minimumBodyTextLength).toBeGreaterThanOrEqual(250);
        });
    });

    it('does not overclaim WCAG conformance from a smoke gate', () => {
        expect(UI_SMOKE_GATE.allowedClaim).toContain('smoke gate nội bộ');
        expect(UI_SMOKE_GATE.blockedClaim).toContain('Chưa được nói đạt WCAG 2.2 đầy đủ');
        expect(UI_SMOKE_GATE.sourceIds).toEqual(expect.arrayContaining(['iso-25010', 'wcag-22']));
    });
});
