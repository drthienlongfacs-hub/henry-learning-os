import { PRIMARY_CURRICULUM_MAP_STATS } from './primary-curriculum-map';

export type UiSmokeRouteKey =
    | 'home'
    | 'child-learn'
    | 'parent-dashboard'
    | 'parent-benchmark'
    | 'parent-foundation'
    | 'parent-sot'
    | 'parent-review-queue'
    | 'parent-diagnostic';

export interface UiSmokeRoute {
    key: UiSmokeRouteKey;
    path: string;
    label: string;
    requiredText: string[];
    minimumBodyTextLength: number;
    requiresHydratedProfile?: boolean;
}

export interface UiSmokeViewport {
    key: 'desktop' | 'mobile';
    width: number;
    height: number;
}

export const UI_SMOKE_BASE_PATH = '/henry-learning-os';

export const UI_SMOKE_VIEWPORTS: UiSmokeViewport[] = [
    { key: 'desktop', width: 1366, height: 900 },
    { key: 'mobile', width: 390, height: 844 },
];

export const UI_SMOKE_ROUTES: UiSmokeRoute[] = [
    {
        key: 'home',
        path: '/',
        label: 'Home hub',
        requiredText: ['SOT Control Center', 'Benchmark full-stack', 'Diagnostic warm-start'],
        minimumBodyTextLength: 250,
    },
    {
        key: 'child-learn',
        path: '/child/learn/',
        label: 'Child learning engine',
        requiredText: ['Learning engine', 'Chọn nhịp học', 'Toán'],
        minimumBodyTextLength: 600,
    },
    {
        key: 'parent-dashboard',
        path: '/parent/dashboard/',
        label: 'Parent dashboard',
        requiredText: ['Dashboard phụ huynh', 'RCA/PDCA tuần này theo SOT', 'Diagnostic warm-start lớp 1'],
        minimumBodyTextLength: 600,
        requiresHydratedProfile: true,
    },
    {
        key: 'parent-benchmark',
        path: '/parent/benchmark/',
        label: 'Benchmark scorecard',
        requiredText: ['Henry Learning OS so với các nền tảng học hàng đầu', 'Chưa claim hiệu quả học tập', 'Diagnostic'],
        minimumBodyTextLength: 1000,
    },
    {
        key: 'parent-foundation',
        path: '/parent/foundation/',
        label: 'Product foundation',
        requiredText: ['Family-first Learning Evidence OS', 'Source of Truth control plane', 'SOT upgrade queue'],
        minimumBodyTextLength: 1000,
    },
    {
        key: 'parent-sot',
        path: '/parent/sot/',
        label: 'SOT control center',
        requiredText: ['Nâng cấp full-stack bám ma trận căn cứ', 'Lane đã triển khai theo SOT', 'Diagnostic warm-start lớp 1'],
        minimumBodyTextLength: 900,
    },
    {
        key: 'parent-review-queue',
        path: '/parent/review-queue/',
        label: 'Human review queue',
        requiredText: ['Hàng đợi duyệt item theo curriculum SOT', `${PRIMARY_CURRICULUM_MAP_STATS.topicMapCount} item`, 'Không được nói item bank đã được duyệt 100%'],
        minimumBodyTextLength: 800,
    },
    {
        key: 'parent-diagnostic',
        path: '/parent/diagnostic/',
        label: 'Diagnostic warm-start',
        requiredText: ['Diagnostic warm-start', 'Kế hoạch 7 ngày', 'Claim gate'],
        minimumBodyTextLength: 800,
    },
];

export const UI_SMOKE_GATE = {
    id: 'playwright-wcag-smoke-v1',
    routeCount: UI_SMOKE_ROUTES.length,
    viewportCount: UI_SMOKE_VIEWPORTS.length,
    checkCount: UI_SMOKE_ROUTES.length * UI_SMOKE_VIEWPORTS.length,
    minimumTargetSizePx: 24,
    maxHorizontalOverflowPx: 32,
    checkedSurfaces: UI_SMOKE_ROUTES.map((route) => route.label),
    checkTypes: [
        'HTTP 200 cho route static export',
        'Required route text xuất hiện sau hydration',
        'Body không trắng và có main/page container',
        'Desktop/mobile viewport không tràn ngang quá ngưỡng',
        'Keyboard Tab đưa focus vào control nhìn thấy được',
        'Control/button/card link chính đạt target tối thiểu 24px',
    ],
    allowedClaim: 'Có Playwright smoke gate nội bộ cho desktop/mobile route chính và kiểm WCAG cơ bản về focus/target-size.',
    blockedClaim: 'Chưa được nói đạt WCAG 2.2 đầy đủ, production-grade toàn diện hoặc không có lỗi UI nếu chưa có audit accessibility đầy đủ, visual diff và monitoring live.',
    sourceIds: ['iso-25010', 'wcag-22', 'repo-architecture'],
};
