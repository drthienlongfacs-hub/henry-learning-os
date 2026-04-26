// ========================================
// Open Library Adapter — book metadata + covers
// https://openlibrary.org/dev/docs/api/search
// License: metadata is CC0 / public domain
// ========================================

import type {
    ExternalResourceAdapter,
    LicensePolicy,
    NormalizedLearningResource,
    ResourceQuery,
} from '@/types/resource-types';
import { runSafetyGates } from '@/lib/resources/safety-gate';

const OPEN_LIBRARY_LICENSE: LicensePolicy = {
    spdxId: 'CC0-1.0',
    allowedUse: 'cache_metadata',
    requiresAttribution: true,
    commercialOk: true,
    shareAlikeRequired: false,
    notes: 'Metadata is public; full book text varies by title license.',
};

const API_BASE = 'https://openlibrary.org';

interface OpenLibraryDoc {
    key: string;
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    subject?: string[];
    cover_i?: number;
    language?: string[];
    isbn?: string[];
}

interface OpenLibrarySearchResponse {
    numFound: number;
    docs: OpenLibraryDoc[];
}

export const openLibraryAdapter: ExternalResourceAdapter = {
    id: 'open-library',
    displayName: 'Open Library',
    resourceType: 'book',
    licensePolicy: OPEN_LIBRARY_LICENSE,

    async fetchMetadata(query: ResourceQuery): Promise<NormalizedLearningResource[]> {
        const searchTerm = query.query || query.subject || 'children';
        const limit = query.limit ?? 10;
        const url = `${API_BASE}/search.json?q=${encodeURIComponent(searchTerm)}&limit=${limit}&fields=key,title,author_name,first_publish_year,subject,cover_i,language,isbn`;

        const response = await fetch(url, {
            headers: { 'User-Agent': 'HenryLearningOS/0.1 (family-learning-app)' },
        });

        if (!response.ok) {
            console.warn(`[OpenLibrary] Search failed: ${response.status}`);
            return [];
        }

        const data = (await response.json()) as OpenLibrarySearchResponse;

        return data.docs.map((doc): NormalizedLearningResource => {
            const coverUrl = doc.cover_i
                ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
                : undefined;

            return {
                id: `ol-${doc.key.replace('/works/', '')}`,
                providerId: 'open-library',
                title: doc.title,
                description: doc.subject?.slice(0, 3).join(', '),
                language: doc.language?.[0] ?? 'en',
                ageBand: '6-18',
                subjectTags: doc.subject?.slice(0, 5) ?? [],
                skillTags: ['reading', 'vocabulary'],
                contentUrl: `${API_BASE}${doc.key}`,
                attribution: {
                    title: doc.title,
                    sourceName: 'Open Library',
                    sourceUrl: `${API_BASE}${doc.key}`,
                    author: doc.author_name?.join(', '),
                    license: 'CC0-1.0 (metadata)',
                    licenseUrl: 'https://openlibrary.org/developers/licensing',
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
