// ========================================
// Gutendex Adapter — public-domain book metadata
// https://gutendex.com/
// All Project Gutenberg texts are public domain in the US
// ========================================

import type {
    ExternalResourceAdapter,
    LicensePolicy,
    NormalizedLearningResource,
    ResourceQuery,
} from '@/types/resource-types';
import { runSafetyGates } from '@/lib/resources/safety-gate';

const GUTENDEX_LICENSE: LicensePolicy = {
    spdxId: 'public-domain',
    allowedUse: 'cache_content',
    requiresAttribution: true,
    commercialOk: true,
    shareAlikeRequired: false,
    notes: 'Project Gutenberg texts are public domain in the US. Attribution to PG is expected.',
};

const API_BASE = 'https://gutendex.com';

interface GutendexAuthor {
    name: string;
    birth_year: number | null;
    death_year: number | null;
}

interface GutendexBook {
    id: number;
    title: string;
    authors: GutendexAuthor[];
    subjects: string[];
    languages: string[];
    formats: Record<string, string>;
    download_count: number;
}

interface GutendexResponse {
    count: number;
    results: GutendexBook[];
}

export const gutendexAdapter: ExternalResourceAdapter = {
    id: 'gutendex',
    displayName: 'Project Gutenberg (via Gutendex)',
    resourceType: 'book',
    licensePolicy: GUTENDEX_LICENSE,

    async fetchMetadata(query: ResourceQuery): Promise<NormalizedLearningResource[]> {
        const searchTerm = query.query || 'children';
        const language = query.language ?? 'en';
        const limit = Math.min(query.limit ?? 10, 32); // Gutendex max page size is 32

        const url = `${API_BASE}/books/?search=${encodeURIComponent(searchTerm)}&languages=${language}&page=1`;

        const response = await fetch(url, {
            headers: { 'User-Agent': 'HenryLearningOS/0.1 (family-learning-app)' },
        });

        if (!response.ok) {
            console.warn(`[Gutendex] Search failed: ${response.status}`);
            return [];
        }

        const data = (await response.json()) as GutendexResponse;

        return data.results.slice(0, limit).map((book): NormalizedLearningResource => {
            const textUrl =
                book.formats['text/plain; charset=utf-8'] ||
                book.formats['text/plain'] ||
                book.formats['text/html'] ||
                `https://www.gutenberg.org/ebooks/${book.id}`;

            return {
                id: `pg-${book.id}`,
                providerId: 'gutendex',
                title: book.title,
                description: book.subjects.slice(0, 3).join(', '),
                language: book.languages[0] ?? 'en',
                ageBand: '6-18',
                subjectTags: book.subjects.slice(0, 5),
                skillTags: ['reading', 'vocabulary', 'literature'],
                contentUrl: textUrl,
                attribution: {
                    title: book.title,
                    sourceName: 'Project Gutenberg',
                    sourceUrl: `https://www.gutenberg.org/ebooks/${book.id}`,
                    author: book.authors.map(a => a.name).join(', '),
                    license: 'Public Domain (US)',
                    licenseUrl: 'https://www.gutenberg.org/policy/license.html',
                    retrievedAt: new Date().toISOString(),
                },
                safety: runSafetyGates(
                    { ageMin: 6, ageMax: 18 },
                    { childAge: 6 },
                ),
            };
        });
    },
};
