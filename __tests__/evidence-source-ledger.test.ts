import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { LEARNING_SOURCES } from '@/data/curriculum-enrichment';
import { WIKI_ENTRIES } from '@/data/wiki-knowledge-base';
import {
    EVIDENCE_SOURCE_LEDGER_STATS,
    INTERNET_EVIDENCE_SOURCES,
    WIKI_EVIDENCE_LEDGER,
    getInternetEvidenceSource,
    getWikiEvidenceRecord,
} from '@/data/evidence-source-ledger';

const repoRoot = process.cwd();

describe('evidence source ledger', () => {
    it('keeps internet evidence sources verified and URL-backed', () => {
        expect(EVIDENCE_SOURCE_LEDGER_STATS.internetSourceCount).toBeGreaterThanOrEqual(7);

        for (const source of INTERNET_EVIDENCE_SOURCES) {
            expect(source.url, source.id).toMatch(/^https:\/\//);
            expect(Date.parse(source.verifiedAt), source.id).not.toBeNaN();
            expect(source.useInHenry.length, source.id).toBeGreaterThan(40);

            if (source.sourceId) {
                expect(LEARNING_SOURCES[source.sourceId], source.id).toBeDefined();
            }
        }
    });

    it('requires every strong or local-practice wiki claim to have a ledger record', () => {
        const evidenceBearingEntries = WIKI_ENTRIES.filter((entry) =>
            entry.tags.some((tag) =>
                [
                    'evidence-based',
                    'source-backed',
                    'local-practice',
                    'needs-local-measurement',
                    'needs-review',
                    'implemented',
                    'operator-gate',
                ].includes(tag)
            )
        );

        expect(evidenceBearingEntries.length).toBeGreaterThan(10);
        for (const entry of evidenceBearingEntries) {
            expect(getWikiEvidenceRecord(entry.id), entry.id).toBeDefined();
        }
    });

    it('keeps wiki evidence source IDs resolvable and local evidence paths real', () => {
        for (const record of WIKI_EVIDENCE_LEDGER) {
            expect(WIKI_ENTRIES.some((entry) => entry.id === record.wikiId), record.wikiId).toBe(true);
            expect(record.operationalRule.length, record.wikiId).toBeGreaterThan(30);
            expect(record.caveat.length, record.wikiId).toBeGreaterThan(30);

            for (const sourceId of record.sourceIds) {
                expect(LEARNING_SOURCES[sourceId], `${record.wikiId}:${sourceId}`).toBeDefined();
            }

            for (const internetSourceId of record.internetSourceIds) {
                expect(getInternetEvidenceSource(internetSourceId), `${record.wikiId}:${internetSourceId}`).toBeDefined();
            }

            for (const local of record.localEvidence) {
                expect(existsSync(join(repoRoot, local.path)), `${record.wikiId}:${local.path}`).toBe(true);
                expect(local.signal.length, `${record.wikiId}:${local.path}`).toBeGreaterThan(20);
            }
        }
    });

    it('does not treat unverified internet rumors as product evidence', () => {
        const orchestration = WIKI_ENTRIES.find((entry) => entry.id === 'lm-12');
        expect(orchestration?.definition).not.toContain('OpenAI Symphony');
        expect(orchestration?.source).toContain('Local AGENTS.md');
        expect(getWikiEvidenceRecord('lm-12')?.status).toBe('local_practice');
    });

    it('blocks unsupported quantified efficacy claims in visible evidence copy', () => {
        const wikiCopy = WIKI_ENTRIES.map((entry) =>
            [entry.term, entry.definition, entry.definitionVi, entry.source].join('\n')
        ).join('\n');
        const parentCoLearningCopy = readFileSync(join(repoRoot, 'src/components/ParentCoLearning.tsx'), 'utf8');
        const visibleEvidenceCopy = `${wikiCopy}\n${parentCoLearningCopy}`;

        const unsupportedPatterns = [
            /doubles?\s+(long-term\s+)?retention/i,
            /co-learning\s+doubles/i,
            /gấp đôi\s+(ghi nhớ|output|đầu ra)/i,
            /\b\d+\s*-\s*\d+%\s+(retention|transfer|better|ghi nhớ)/i,
            /effect size\s+\d/i,
            /retention boost/i,
        ];

        for (const pattern of unsupportedPatterns) {
            expect(visibleEvidenceCopy).not.toMatch(pattern);
        }
    });
});
