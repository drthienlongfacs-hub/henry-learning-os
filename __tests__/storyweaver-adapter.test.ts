import { afterEach, describe, expect, it, vi } from 'vitest';
import {
    normalizeStoryWeaverBook,
    searchStoryWeaver,
    storyWeaverAdapter,
    type StoryWeaverBook,
} from '@/lib/resources/adapters/storyweaver-adapter';

const rawStory: StoryWeaverBook = {
    id: 42,
    title: 'The Helpful Library',
    language: 'English',
    level: '2',
    slug: 'helpful-library',
    coverUrl: 'https://example.test/cover.jpg',
    synopsis: 'A short story about finding books.',
    authors: ['Pratham Books'],
    readUrl: 'https://storyweaver.org.in/stories/helpful-library',
    license: 'CC-BY 4.0',
};

describe('StoryWeaver adapter', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('normalizes books with license, attribution, safety, and pedagogy gates', () => {
        const resource = normalizeStoryWeaverBook(rawStory, { ageBand: '6-8' }, '2026-05-03T00:00:00.000Z');

        expect(resource.providerId).toBe('storyweaver');
        expect(resource.attribution.license).toBe('CC-BY 4.0');
        expect(resource.attribution.author).toBe('Pratham Books');
        expect(resource.safety.passed).toBe(true);
        expect(resource.pedagogy?.retrievalQuestions.join(' ')).toContain('bằng chứng');
        expect(resource.skillTags).toContain('retell_with_evidence');
        expect(resource.localCacheKey).toBe('storyweaver:helpful-library');
    });

    it('keeps the age gate real instead of marking advanced books safe for younger age bands', () => {
        const advanced = normalizeStoryWeaverBook(
            { ...rawStory, level: '4' },
            { ageBand: '6-8' },
            '2026-05-03T00:00:00.000Z',
        );

        expect(advanced.safety.passed).toBe(false);
        expect(advanced.safety.failedGates).toContain('age');
    });

    it('fetches normalized metadata through the adapter contract', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => ({
                data: [
                    {
                        id: 42,
                        title: 'The Helpful Library',
                        language: 'English',
                        reading_level: '2',
                        slug: 'helpful-library',
                        synopsis: 'A short story about finding books.',
                        cover_image: { url: 'https://example.test/cover.jpg' },
                        authors: [{ name: 'Pratham Books' }],
                    },
                ],
            }),
        } as Response);

        const results = await storyWeaverAdapter.fetchMetadata({ query: 'library', ageBand: '6-8', limit: 1 });

        expect(results).toHaveLength(1);
        expect(results[0].id).toBe('storyweaver-42');
        expect(results[0].safety.passed).toBe(true);
        expect(results[0].pedagogy?.parentMission).toContain('StoryWeaver');
    });

    it('keeps the legacy search API but enriches results with safety and learning prompts', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => ({
                data: [
                    {
                        id: 42,
                        title: 'The Helpful Library',
                        language: 'English',
                        reading_level: '2',
                        slug: 'helpful-library',
                        synopsis: 'A short story about finding books.',
                        cover_image: { url: 'https://example.test/cover.jpg' },
                        authors: [{ name: 'Pratham Books' }],
                    },
                ],
            }),
        } as Response);

        const results = await searchStoryWeaver({ language: 'English', level: '2', limit: 1 });

        expect(results).toHaveLength(1);
        expect(results[0].safetyPassed).toBe(true);
        expect(results[0].retrievalQuestions?.length).toBeGreaterThan(0);
    });
});
