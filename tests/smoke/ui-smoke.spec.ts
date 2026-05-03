import { expect, test, type Page } from '@playwright/test';
import { createReadStream, existsSync, statSync } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import {
    UI_SMOKE_BASE_PATH,
    UI_SMOKE_GATE,
    UI_SMOKE_ROUTES,
} from '../../src/data/ui-smoke-gate';
import { LEARNING_I18N_REQUIRED_EN_STRINGS } from '../../src/lib/i18n-learning';

type VoiceSmokeEvent = {
    type: 'cancel' | 'speak';
    at: number;
    text?: string;
    pitch?: number;
};

declare global {
    interface Window {
        __henryVoiceEvents?: VoiceSmokeEvent[];
        __henryVoiceClickStart?: number;
    }
}

const outDir = path.resolve(process.cwd(), 'out');
const mimeByExtension: Record<string, string> = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
    '.ico': 'image/x-icon',
    '.jpg': 'image/jpeg',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.md': 'text/markdown; charset=utf-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.txt': 'text/plain; charset=utf-8',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
};

let server: http.Server;
let baseUrl = '';

function safeJoin(root: string, requestPath: string) {
    const cleanPath = requestPath.replace(/^\/+/, '');
    const filePath = path.resolve(root, cleanPath);

    return filePath.startsWith(root) ? filePath : null;
}

function resolveStaticPath(rawPathname: string) {
    let pathname = decodeURIComponent(rawPathname);

    if (pathname === UI_SMOKE_BASE_PATH) pathname = '/';
    if (pathname.startsWith(`${UI_SMOKE_BASE_PATH}/`)) {
        pathname = pathname.slice(UI_SMOKE_BASE_PATH.length);
    }

    const candidate = safeJoin(outDir, pathname === '/' ? 'index.html' : pathname);
    if (!candidate) return null;

    if (existsSync(candidate) && statSync(candidate).isDirectory()) {
        const indexPath = path.join(candidate, 'index.html');
        return existsSync(indexPath) ? indexPath : null;
    }

    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;

    if (!path.extname(candidate)) {
        const indexPath = path.join(candidate, 'index.html');
        if (existsSync(indexPath)) return indexPath;
    }

    return null;
}

function startStaticServer() {
    if (!existsSync(path.join(outDir, 'index.html'))) {
        throw new Error('Missing out/index.html. Run npm run build before npm run smoke:ui.');
    }

    return new Promise<{ server: http.Server; baseUrl: string }>((resolve) => {
        const staticServer = http.createServer((request, response) => {
            const requestUrl = new URL(request.url ?? '/', 'http://localhost');
            const filePath = resolveStaticPath(requestUrl.pathname);

            if (!filePath) {
                response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
                response.end(`Not found: ${requestUrl.pathname}`);
                return;
            }

            response.writeHead(200, {
                'cache-control': 'no-store',
                'content-type': mimeByExtension[path.extname(filePath)] ?? 'application/octet-stream',
            });
            createReadStream(filePath).pipe(response);
        });

        staticServer.listen(0, '127.0.0.1', () => {
            const address = staticServer.address();
            if (typeof address === 'object' && address) {
                resolve({ server: staticServer, baseUrl: `http://127.0.0.1:${address.port}` });
            }
        });
    });
}

test.beforeAll(async () => {
    const started = await startStaticServer();
    server = started.server;
    baseUrl = started.baseUrl;
});

test.afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
    });
});

test.beforeEach(async ({ context }) => {
    await context.addInitScript(() => {
        const now = '2026-04-30T00:00:00.000Z';
        localStorage.setItem('henry-os-v2', JSON.stringify({
            state: {
                childProfile: {
                    id: 'child-smoke',
                    nameOrNickname: 'Henry Smoke',
                    birthYear: 2020,
                    gradeLevel: 1,
                    locationContext: 'TP.HCM',
                    primaryLanguage: 'vi',
                    secondaryLanguage: 'en',
                    learningPathway: 'vietnam_public',
                    parentIds: ['parent-smoke'],
                    safetyLevel: 'under_13',
                    interests: ['Khoa học', 'Đọc sách'],
                    strengths: ['Tò mò'],
                    challenges: [],
                    createdAt: now,
                    updatedAt: now,
                },
                parentProfile: {
                    id: 'parent-smoke',
                    name: 'Ba Henry Smoke',
                    role: 'father',
                    notificationPreferences: ['daily_summary', 'weekly_review'],
                    coLearningTimeAvailable: 15,
                    valuesPreferences: [],
                },
                isOnboarded: true,
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
                skillStates: [],
                accelerationRecommendations: [],
            },
            version: 0,
        }));
    });
});

async function hydrateProfileThroughOnboarding(page: Page) {
    await page.goto(`${baseUrl}${UI_SMOKE_BASE_PATH}/parent/onboarding/`, { waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: /Skip Onboarding/i }).click();
    await expect(page.locator('body')).toContainText('Dashboard & nhiệm vụ hôm nay');
}

for (const route of UI_SMOKE_ROUTES) {
    test(`${route.label} renders and passes basic WCAG smoke`, async ({ page }) => {
        const badLocalResponses: string[] = [];
        page.on('response', (response) => {
            if (response.url().startsWith(baseUrl) && response.status() >= 400) {
                badLocalResponses.push(`${response.status()} ${response.url()}`);
            }
        });

        if (route.requiresHydratedProfile) {
            await hydrateProfileThroughOnboarding(page);
        }

        const response = await page.goto(`${baseUrl}${UI_SMOKE_BASE_PATH}${route.path}`, { waitUntil: 'domcontentloaded' });
        expect(response?.status(), route.path).toBe(200);
        await page.waitForLoadState('networkidle', { timeout: 5_000 }).catch(() => undefined);

        for (const requiredText of route.requiredText) {
            await expect(page.locator('body'), `${route.path} contains ${requiredText}`).toContainText(requiredText);
        }

        const metrics = await page.evaluate((gate) => {
            const mainLike = (document.querySelector('main, .page-container') ?? document.body) as HTMLElement | null;
            const mainRect = mainLike?.getBoundingClientRect();
            const candidates = Array.from(document.querySelectorAll<HTMLElement>('button, input, select, textarea, [role="button"], a[href]'));
            const smallTargets = candidates.flatMap((element) => {
                const rect = element.getBoundingClientRect();
                const style = window.getComputedStyle(element);
                const isVisible = rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
                const isTextOnlyLink = element.tagName === 'A' && !element.querySelector('button, .card') && !element.className.toString().includes('btn');
                if (!isVisible || isTextOnlyLink) return [];
                if (rect.width >= gate.minimumTargetSizePx && rect.height >= gate.minimumTargetSizePx) return [];

                return [`${element.tagName.toLowerCase()} "${(element.innerText || element.getAttribute('aria-label') || '').trim().slice(0, 40)}" ${Math.round(rect.width)}x${Math.round(rect.height)}`];
            });

            const viewportWidth = Math.max(
                document.documentElement.clientWidth,
                window.innerWidth,
                Math.floor(window.visualViewport?.width ?? 0)
            );

            return {
                bodyTextLength: document.body.innerText.trim().length,
                hasMainContent: Boolean(mainRect && mainRect.width > 0 && mainRect.height > 120),
                horizontalOverflowPx: Math.max(0, document.documentElement.scrollWidth - viewportWidth),
                smallTargets,
            };
        }, UI_SMOKE_GATE);

        expect(metrics.bodyTextLength).toBeGreaterThan(route.minimumBodyTextLength);
        expect(metrics.hasMainContent).toBe(true);
        expect(metrics.horizontalOverflowPx).toBeLessThanOrEqual(UI_SMOKE_GATE.maxHorizontalOverflowPx);
        expect(metrics.smallTargets).toEqual([]);

        await page.keyboard.press('Tab');
        const focusState = await page.evaluate(() => {
            const active = document.activeElement as HTMLElement | null;
            if (!active || active === document.body) return null;
            const rect = active.getBoundingClientRect();

            return {
                tagName: active.tagName,
                text: (active.innerText || active.getAttribute('aria-label') || '').trim().slice(0, 60),
                isVisible: rect.width > 0 && rect.height > 0,
            };
        });

        expect(focusState, `${route.path} should expose keyboard focus`).toBeTruthy();
        expect(focusState?.isVisible).toBe(true);
        expect(badLocalResponses).toEqual([]);
    });
}

test('Child learning engine starts a real science lesson from the topic card', async ({ page }) => {
    const badLocalResponses: string[] = [];
    const pageErrors: string[] = [];
    page.on('response', (response) => {
        if (response.url().startsWith(baseUrl) && response.status() >= 400) {
            badLocalResponses.push(`${response.status()} ${response.url()}`);
        }
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));

    await page.goto(`${baseUrl}${UI_SMOKE_BASE_PATH}/child/learn/`, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 5_000 }).catch(() => undefined);
    await page.getByText('Khoa học', { exact: true }).first().click();
    await page.getByRole('button', { name: /Cơ thể & Sức khỏe/ }).click();

    await expect(page.getByText(/\?$/).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /^Gợi ý$/ })).toBeVisible();
    await expect.poll(async () => page.locator('button').evaluateAll((buttons) => buttons
        .filter((button) => {
            const text = (button as HTMLButtonElement).innerText.trim();
            const rect = button.getBoundingClientRect();
            return rect.width > 120 && rect.height > 40 && !/Gợi ý|EN|VN/.test(text);
        })
        .length)).toBeGreaterThanOrEqual(4);
    await expect(page.getByText('Cách trình bày câu hỏi').first()).toBeHidden();
    await expect(page.getByText('Audit CTGDPT trên từng câu').first()).toBeHidden();
    await expect(page.getByText('Benchmark phần mềm').first()).toBeHidden();
    expect(pageErrors).toEqual([]);
    expect(badLocalResponses).toEqual([]);
});

test('Child learning engine switches core surface and topic cards to English', async ({ page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('henry-lang', JSON.stringify({
            state: { lang: 'en' },
            version: 0,
        }));
    });

    const badLocalResponses: string[] = [];
    page.on('response', (response) => {
        if (response.url().startsWith(baseUrl) && response.status() >= 400) {
            badLocalResponses.push(`${response.status()} ${response.url()}`);
        }
    });

    await page.goto(`${baseUrl}${UI_SMOKE_BASE_PATH}/child/learn/`, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 5_000 }).catch(() => undefined);

    await expect(page.locator('body')).toContainText('Choose learning rhythm');
    await page.getByText('Science', { exact: true }).first().click();

    for (const requiredText of LEARNING_I18N_REQUIRED_EN_STRINGS) {
        await expect(page.locator('body'), `English learning surface contains ${requiredText}`).toContainText(requiredText);
    }

    await expect(page.locator('body')).not.toContainText('Cơ thể & Sức khỏe');
    await expect(page.locator('body')).not.toContainText('Chọn nhịp học');

    const brokenImages = await page.locator('img').evaluateAll((images) =>
        images
            .map((image) => image as HTMLImageElement)
            .filter((image) => image.complete && image.naturalWidth === 0)
            .map((image) => image.getAttribute('src') ?? image.getAttribute('alt') ?? 'unknown image')
    );

    expect(brokenImages).toEqual([]);
    expect(badLocalResponses).toEqual([]);
});

test('Child reading full-passage voice responds before Kokoro background rendering', async ({ page }) => {
    await page.addInitScript(() => {
        class MockSpeechSynthesisUtterance {
            text: string;
            lang = '';
            rate = 1;
            pitch = 1;
            volume = 1;
            voice: SpeechSynthesisVoice | null = null;
            onend: (() => void) | null = null;
            onerror: (() => void) | null = null;

            constructor(text: string) {
                this.text = text;
            }
        }

        window.__henryVoiceEvents = [];
        Object.defineProperty(window, 'SpeechSynthesisUtterance', {
            configurable: true,
            value: MockSpeechSynthesisUtterance,
        });
        Object.defineProperty(window, 'speechSynthesis', {
            configurable: true,
            value: {
                speaking: false,
                getVoices: () => [{
                    name: 'Samantha',
                    lang: 'en-US',
                    localService: true,
                    default: true,
                    voiceURI: 'Samantha',
                }],
                cancel: () => window.__henryVoiceEvents?.push({ type: 'cancel', at: performance.now() }),
                speak: (utterance: MockSpeechSynthesisUtterance) => {
                    window.__henryVoiceEvents?.push({
                        type: 'speak',
                        at: performance.now(),
                        text: utterance.text,
                        pitch: utterance.pitch,
                    });
                    window.setTimeout(() => utterance.onend?.(), 0);
                },
                pause: () => undefined,
                resume: () => undefined,
            },
        });
    });

    await page.goto(`${baseUrl}${UI_SMOKE_BASE_PATH}/child/reading/`, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('networkidle', { timeout: 5_000 }).catch(() => undefined);

    await page.evaluate(() => {
        window.__henryVoiceClickStart = performance.now();
    });
    await page.getByRole('button', { name: /Đọc toàn bài|Full passage/ }).first().click();
    await page.waitForFunction(() => window.__henryVoiceEvents?.some((event) => event.type === 'speak'));

    const voiceResult = await page.evaluate(() => {
        const start = window.__henryVoiceClickStart ?? 0;
        const speak = window.__henryVoiceEvents?.find((event) => event.type === 'speak');
        return {
            delayMs: speak ? speak.at - start : null,
            pitch: speak?.pitch,
            textLength: speak?.text?.length ?? 0,
        };
    });

    expect(voiceResult.delayMs).not.toBeNull();
    expect(voiceResult.delayMs ?? Infinity).toBeLessThan(250);
    expect(voiceResult.pitch).toBe(1);
    expect(voiceResult.textLength).toBeGreaterThan(80);
});
