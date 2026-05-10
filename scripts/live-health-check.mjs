#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const baseUrl = (process.env.LIVE_BASE_URL || 'https://drthienlongfacs-hub.github.io/henry-learning-os').replace(/\/$/, '');
const outputPath = process.env.LIVE_HEALTH_OUTPUT || '';
const runStamp = new Date().toISOString().replace(/[:.]/g, '-');

const viewports = [
  { key: 'desktop', width: 1366, height: 900 },
  { key: 'mobile', width: 390, height: 844 },
];

const routes = [
  {
    key: 'home',
    path: '/',
    requiredText: ['SOT Control Center', 'Benchmark full-stack'],
    minBodyTextLength: 250,
    maxReadyMs: 8_000,
    maxDomContentLoadedMs: 3_500,
  },
  {
    key: 'child-learn',
    path: '/child/learn/',
    requiredText: ['Hôm nay con muốn học gì?', 'Chọn nhịp học', 'Toán'],
    minBodyTextLength: 600,
    maxReadyMs: 8_000,
    maxDomContentLoadedMs: 3_500,
    interaction: 'learn-topic-open',
  },
  {
    key: 'child-exams',
    path: '/child/exams/',
    requiredText: ['Nguồn Cambridge chính thức', '10 bộ đề mỗi cấp', 'Không sao chép đề chính thức'],
    minBodyTextLength: 1_100,
    maxReadyMs: 8_000,
    maxDomContentLoadedMs: 3_500,
    interaction: 'exam-first-question',
  },
  {
    key: 'child-reading',
    path: '/child/reading/',
    requiredText: ['Luyện Đọc & Phát Âm', 'Đọc toàn bài', 'Real data'],
    minBodyTextLength: 1_000,
    maxReadyMs: 9_000,
    maxDomContentLoadedMs: 4_000,
    interaction: 'reading-voice-instant',
  },
  {
    key: 'child-library',
    path: '/child/library/',
    requiredText: ['Thư viện Sách', 'Nhúng sách trực tiếp vào app', 'Kệ SGK/textbook cứng'],
    minBodyTextLength: 1_200,
    maxReadyMs: 9_000,
    maxDomContentLoadedMs: 4_000,
  },
  {
    key: 'parent-dashboard',
    path: '/parent/dashboard/',
    requiredText: ['Dashboard phụ huynh', 'RCA/PDCA tuần này theo SOT'],
    minBodyTextLength: 600,
    maxReadyMs: 8_000,
    maxDomContentLoadedMs: 3_500,
    hydrateProfile: true,
  },
];

function seededProfileScript() {
  const now = '2026-05-10T00:00:00.000Z';
  window.localStorage.setItem('henry-os-v2', JSON.stringify({
    state: {
      childProfile: {
        id: 'child-live-health',
        nameOrNickname: 'Henry Live Health',
        birthYear: 2020,
        gradeLevel: 1,
        locationContext: 'TP.HCM',
        primaryLanguage: 'vi',
        secondaryLanguage: 'en',
        learningPathway: 'vietnam_public',
        parentIds: ['parent-live-health'],
        safetyLevel: 'under_13',
        interests: ['Khoa học', 'Đọc sách'],
        strengths: ['Tò mò'],
        challenges: [],
        createdAt: now,
        updatedAt: now,
      },
      parentProfile: {
        id: 'parent-live-health',
        name: 'Ba Henry Live Health',
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
}

async function installVoiceMock(page) {
  await page.addInitScript(() => {
    class MockSpeechSynthesisUtterance {
      constructor(text) {
        this.text = text;
        this.lang = '';
        this.rate = 1;
        this.pitch = 1;
        this.volume = 1;
        this.voice = null;
        this.onend = null;
        this.onerror = null;
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
        speak: (utterance) => {
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
}

function withCacheBust(routePath) {
  const separator = routePath.includes('?') ? '&' : '?';
  return `${baseUrl}${routePath}${separator}health=${runStamp}`;
}

async function runInteraction(page, route, viewportKey) {
  if (!route.interaction || viewportKey !== 'desktop') return null;

  if (route.interaction === 'learn-topic-open') {
    const started = Date.now();
    await page.getByText('Khoa học', { exact: true }).first().click({ timeout: 2_000 });
    await page.getByRole('button', { name: /Cơ thể & Sức khỏe/ }).waitFor({ state: 'visible', timeout: 1_500 });
    return { name: route.interaction, latencyMs: Date.now() - started, budgetMs: 1_500 };
  }

  if (route.interaction === 'exam-first-question') {
    const started = Date.now();
    await page.getByRole('button', { name: 'Thi thử' }).first().click({ timeout: 2_000 });
    await page.getByText('Nghe — Bộ 1').waitFor({ state: 'visible', timeout: 1_500 });
    await page.getByText('Nghe — Bộ 1').click({ timeout: 2_000 });
    await page.getByText('Câu 1/20').waitFor({ state: 'visible', timeout: 1_500 });
    await page.getByRole('button', { name: /^A\./ }).click({ timeout: 2_000 });
    const nextEnabled = await page.getByRole('button', { name: /Tiếp theo/ }).isEnabled({ timeout: 1_000 });
    return { name: route.interaction, latencyMs: Date.now() - started, budgetMs: 2_500, nextEnabled };
  }

  if (route.interaction === 'reading-voice-instant') {
    await page.evaluate(() => {
      window.__henryVoiceClickStart = performance.now();
    });
    await page.getByRole('button', { name: /Đọc toàn bài|Full passage/ }).first().click({ timeout: 2_000 });
    await page.waitForFunction(() => window.__henryVoiceEvents?.some((event) => event.type === 'speak'), null, { timeout: 1_000 });
    const voiceResult = await page.evaluate(() => {
      const start = window.__henryVoiceClickStart ?? 0;
      const speak = window.__henryVoiceEvents?.find((event) => event.type === 'speak');
      return {
        delayMs: speak ? speak.at - start : null,
        textLength: speak?.text?.length ?? 0,
      };
    });
    return {
      name: route.interaction,
      latencyMs: Math.round(voiceResult.delayMs ?? Infinity),
      budgetMs: 250,
      textLength: voiceResult.textLength,
    };
  }

  return null;
}

function summarizeIssueList(items, limit = 5) {
  return [...new Set(items)].slice(0, limit);
}

async function probeRoute(browser, route, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    userAgent: viewport.key === 'mobile'
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      : undefined,
  });
  const page = await context.newPage();
  if (route.hydrateProfile) {
    await page.addInitScript(seededProfileScript);
  }
  if (route.interaction === 'reading-voice-instant') {
    await installVoiceMock(page);
  }

  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  const badResponses = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('requestfailed', (request) => {
    const errorText = request.failure()?.errorText || 'failed';
    // Next/Chromium can abort internal route prefetches when the probe closes a
    // page or navigates during an interaction. Those are not user-visible live
    // failures; real network errors still surface as ERR_FAILED, 4xx/5xx
    // responses, console errors, or page errors.
    if (errorText === 'net::ERR_ABORTED' && request.url().startsWith(baseUrl)) return;
    failedRequests.push(`${errorText} ${request.url()}`);
  });
  page.on('response', (response) => {
    if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`);
  });

  const started = Date.now();
  const response = await page.goto(withCacheBust(route.path), { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await page.waitForLoadState('networkidle', { timeout: 8_000 }).catch(() => undefined);
  const readyMs = Date.now() - started;

  const metrics = await page.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0];
    const resources = performance.getEntriesByType('resource');
    const viewportWidth = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth,
      Math.floor(window.visualViewport?.width ?? 0),
    );
    return {
      bodyTextLength: document.body.innerText.trim().length,
      resourceCount: resources.length,
      transferKb: Math.round(resources.reduce((sum, entry) => sum + (entry.transferSize || 0), 0) / 1024),
      domContentLoadedMs: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
      loadMs: nav ? Math.round(nav.duration) : null,
      horizontalOverflowPx: Math.max(0, document.documentElement.scrollWidth - viewportWidth),
    };
  });

  const bodyText = await page.locator('body').innerText({ timeout: 5_000 });
  const normalizedBodyText = bodyText.toLowerCase();
  const missingText = route.requiredText.filter((text) => !normalizedBodyText.includes(text.toLowerCase()));
  let interaction = null;
  let interactionError = '';
  try {
    interaction = await runInteraction(page, route, viewport.key);
  } catch (error) {
    interactionError = error instanceof Error ? error.message : String(error);
  }

  await context.close();

  const issues = [];
  if (response?.status() !== 200) issues.push(`HTTP status ${response?.status() ?? 'missing'}`);
  if (metrics.bodyTextLength < route.minBodyTextLength) issues.push(`body text too short: ${metrics.bodyTextLength}`);
  if (missingText.length > 0) issues.push(`missing required text: ${missingText.join(', ')}`);
  if (readyMs > route.maxReadyMs) issues.push(`ready ${readyMs}ms > ${route.maxReadyMs}ms`);
  if ((metrics.domContentLoadedMs ?? 0) > route.maxDomContentLoadedMs) {
    issues.push(`domContentLoaded ${metrics.domContentLoadedMs}ms > ${route.maxDomContentLoadedMs}ms`);
  }
  if (metrics.horizontalOverflowPx > 32) issues.push(`horizontal overflow ${metrics.horizontalOverflowPx}px`);
  if (consoleErrors.length > 0) issues.push(`console errors: ${summarizeIssueList(consoleErrors).join(' | ')}`);
  if (pageErrors.length > 0) issues.push(`page errors: ${summarizeIssueList(pageErrors).join(' | ')}`);
  if (failedRequests.length > 0) issues.push(`failed requests: ${summarizeIssueList(failedRequests).join(' | ')}`);
  if (badResponses.length > 0) issues.push(`bad responses: ${summarizeIssueList(badResponses).join(' | ')}`);
  if (interactionError) issues.push(`interaction failed: ${interactionError}`);
  if (interaction && interaction.latencyMs > interaction.budgetMs) {
    issues.push(`interaction ${interaction.name} ${interaction.latencyMs}ms > ${interaction.budgetMs}ms`);
  }
  if (interaction?.name === 'exam-first-question' && !interaction.nextEnabled) {
    issues.push('exam next button did not enable after answer');
  }
  if (interaction?.name === 'reading-voice-instant' && interaction.textLength < 80) {
    issues.push('reading voice spoke too little text');
  }

  return {
    route: route.key,
    path: route.path,
    viewport: viewport.key,
    status: response?.status() ?? null,
    ok: issues.length === 0,
    issues,
    readyMs,
    metrics,
    interaction,
    consoleErrors: summarizeIssueList(consoleErrors),
    pageErrors: summarizeIssueList(pageErrors),
    failedRequests: summarizeIssueList(failedRequests),
    badResponses: summarizeIssueList(badResponses),
  };
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const route of routes) {
      for (const viewport of viewports) {
        results.push(await probeRoute(browser, route, viewport));
      }
    }
  } finally {
    await browser.close();
  }

  const failed = results.filter((result) => !result.ok);
  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    routeCount: routes.length,
    checkCount: results.length,
    passed: failed.length === 0,
    results,
  };

  if (outputPath) {
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  }

  console.log(JSON.stringify(report, null, 2));
  if (failed.length > 0) {
    const summary = failed.map((result) => `${result.route}/${result.viewport}: ${result.issues.join('; ')}`).join('\n');
    throw new Error(`Live health check failed:\n${summary}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
