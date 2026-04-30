import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests/smoke',
    timeout: 30_000,
    expect: {
        timeout: 5_000,
    },
    fullyParallel: false,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 1 : 0,
    workers: 1,
    reporter: [['list']],
    use: {
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
    },
    projects: [
        {
            name: 'chromium-desktop',
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1366, height: 900 },
            },
        },
        {
            name: 'chromium-mobile',
            use: {
                ...devices['Pixel 5'],
                viewport: { width: 390, height: 844 },
            },
        },
    ],
});
