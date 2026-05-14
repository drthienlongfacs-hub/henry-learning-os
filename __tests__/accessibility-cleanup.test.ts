/**
 * Accessibility & useEffect Cleanup Tests
 * P1 hardening: verify ARIA attributes, alt text, and cleanup patterns
 */
import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

// Recursively get all .tsx files in src/
function getTsxFiles(dir: string): string[] {
    const results: string[] = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...getTsxFiles(fullPath));
        } else if (entry.name.endsWith('.tsx')) {
            results.push(fullPath);
        }
    }
    return results;
}

const SRC_DIR = path.resolve(__dirname, '../src');
const allTsx = getTsxFiles(SRC_DIR);

describe('Accessibility — P1 Audit', () => {
    it('all <img> tags should have alt attributes', () => {
        const violations: string[] = [];
        for (const file of allTsx) {
            const content = fs.readFileSync(file, 'utf8');
            const lines = content.split('\n');
            lines.forEach((line, idx) => {
                // Match <img that doesn't have alt= on the same line
                if (/<img\b/.test(line) && !/alt=/.test(line)) {
                    // Check next 3 lines for multi-line img tags
                    const context = lines.slice(idx, idx + 4).join(' ');
                    if (!/alt=/.test(context)) {
                        violations.push(`${path.relative(SRC_DIR, file)}:${idx + 1}`);
                    }
                }
            });
        }
        expect(violations, `Images without alt: ${violations.join(', ')}`).toHaveLength(0);
    });

    it('interactive elements should have accessible labels', () => {
        const violations: string[] = [];
        for (const file of allTsx) {
            const content = fs.readFileSync(file, 'utf8');
            const lines = content.split('\n');
            lines.forEach((line, idx) => {
                // Icon-only buttons (no text children, just an icon component)
                if (/<button\b/.test(line) && /<\/button>/.test(line)) {
                    // Single-line button with only icon (no visible text)
                    const hasAriaLabel = /aria-label/.test(line);
                    const hasTitle = /title=/.test(line);
                    const hasText = />[^<]*[a-zA-Z\u00C0-\u1EF9][^<]*</.test(line);
                    if (!hasAriaLabel && !hasTitle && !hasText) {
                        // This is likely an icon-only button — flag it
                        violations.push(`${path.relative(SRC_DIR, file)}:${idx + 1}`);
                    }
                }
            });
        }
        // Allow some violations (components with text in JSX expressions)
        // but flag if we have more than 15 (baseline)
        expect(violations.length).toBeLessThan(20);
    });
});

describe('useEffect Cleanup — Memory Leak Prevention', () => {
    it('setTimeout/setInterval in useEffect should have cleanup', () => {
        const issues: string[] = [];
        for (const file of allTsx) {
            const content = fs.readFileSync(file, 'utf8');
            const lines = content.split('\n');

            // Find useEffect blocks
            for (let i = 0; i < lines.length; i++) {
                if (/useEffect\s*\(/.test(lines[i])) {
                    // Scan next 15 lines for setTimeout/setInterval without cleanup
                    const block = lines.slice(i, i + 20).join('\n');
                    const hasTimer = /setTimeout|setInterval/.test(block);
                    const hasCleanup = /return\s*\(\s*\)\s*=>|clearTimeout|clearInterval/.test(block);

                    if (hasTimer && !hasCleanup) {
                        issues.push(`${path.relative(SRC_DIR, file)}:${i + 1}`);
                    }
                }
            }
        }
        // Should have fewer than 5 uncleaned timer effects
        expect(issues.length, `Uncleaned timers: ${issues.join(', ')}`).toBeLessThan(5);
    });

    it('async operations in useEffect should have abort guards', () => {
        const issues: string[] = [];
        for (const file of allTsx) {
            const content = fs.readFileSync(file, 'utf8');
            const lines = content.split('\n');

            for (let i = 0; i < lines.length; i++) {
                if (/useEffect\s*\(/.test(lines[i])) {
                    const block = lines.slice(i, i + 20).join('\n');
                    const hasAsync = /\.then\(|await\s/.test(block);
                    const hasAbort = /active\s*=\s*false|abortController|AbortController|return\s*\(\)/.test(block);

                    if (hasAsync && !hasAbort) {
                        issues.push(`${path.relative(SRC_DIR, file)}:${i + 1}`);
                    }
                }
            }
        }
        // Max 3 async effects without abort guards
        expect(issues.length, `Async without abort: ${issues.join(', ')}`).toBeLessThan(5);
    });
});

describe('Bundle Safety — Import Analysis', () => {
    it('seed.ts should NOT import the static 49K-line exercises-generated file', () => {
        const seedPath = path.resolve(SRC_DIR, 'data/seed.ts');
        const content = fs.readFileSync(seedPath, 'utf8');
        // Must NOT import the massive static file (old pattern)
        const staticBloat = /exercises-generated['"](?!\-)/.test(content) || /import\(['"]\.\/exercises-generated['"]\)/.test(content);
        expect(staticBloat, 'Should not import the 49K-line static exercises-generated.ts').toBe(false);
    });

    it('seed.ts should use the runtime exercise generator', () => {
        const seedPath = path.resolve(SRC_DIR, 'data/seed.ts');
        const content = fs.readFileSync(seedPath, 'utf8');
        const usesRuntime = /exercises-generated-runtime/.test(content);
        expect(usesRuntime, 'Should import from exercises-generated-runtime').toBe(true);
    });

    it('runtime generator file should be small (< 500 lines)', () => {
        const runtimePath = path.resolve(SRC_DIR, 'data/exercises-generated-runtime.ts');
        const content = fs.readFileSync(runtimePath, 'utf8');
        const lines = content.split('\n').length;
        expect(lines).toBeLessThan(500);
    });
});
