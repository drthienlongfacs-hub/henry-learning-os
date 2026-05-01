// ========================================
// StoryWeaver Adapter — CC-BY 4.0 Children's Stories
// https://storyweaver.org.in/ — Pratham Books
// Thousands of free, open-licensed stories in 300+ languages
// Including Vietnamese and English
// ========================================

export interface StoryWeaverBook {
    id: number;
    title: string;
    language: string;
    level: string; // '1' | '2' | '3' | '4'
    slug: string;
    coverUrl: string;
    synopsis: string;
    authors: string[];
    readUrl: string;
    license: string;
}

const SW_API = 'https://storyweaver.org.in/api/v1';

/**
 * Search StoryWeaver for children's stories.
 * Supports English and Vietnamese.
 */
export async function searchStoryWeaver(opts: {
    query?: string;
    language?: 'English' | 'Vietnamese';
    level?: '1' | '2' | '3' | '4';
    limit?: number;
}): Promise<StoryWeaverBook[]> {
    const { query = '', language = 'English', level, limit = 12 } = opts;

    const params = new URLSearchParams();
    if (query) params.set('search', query);
    params.set('languages[]', language);
    if (level) params.set('levels[]', level);
    params.set('page', '1');
    params.set('per_page', String(limit));

    try {
        const res = await fetch(`${SW_API}/stories-search?${params}`, {
            headers: { 'Accept': 'application/json' },
        });
        if (!res.ok) return [];
        const data = await res.json();

        return (data.data || []).map((story: Record<string, unknown>) => ({
            id: story.id,
            title: story.title || '',
            language: story.language || language,
            level: story.reading_level || '1',
            slug: story.slug || '',
            coverUrl: (story.cover_image as Record<string, string>)?.url || '',
            synopsis: story.synopsis || '',
            authors: ((story.authors as Record<string, string>[]) || []).map(a => a.name || ''),
            readUrl: `https://storyweaver.org.in/stories/${story.slug || story.id}`,
            license: 'CC-BY 4.0',
        }));
    } catch {
        return [];
    }
}

/**
 * Get story text content for interactive reading.
 * Note: Full text requires fetching the story page.
 */
export async function getStoryText(slug: string): Promise<string | null> {
    try {
        const res = await fetch(`${SW_API}/stories/${slug}`, {
            headers: { 'Accept': 'application/json' },
        });
        if (!res.ok) return null;
        const data = await res.json();

        // Extract text from pages
        const pages = data.data?.pages || [];
        return pages
            .map((p: Record<string, string>) => p.content || '')
            .filter(Boolean)
            .join('\n\n');
    } catch {
        return null;
    }
}

/** StoryWeaver level → our difficulty mapping */
export function swLevelToDifficulty(level: string): 'easy' | 'medium' | 'hard' {
    switch (level) {
        case '1': return 'easy';
        case '2': return 'easy';
        case '3': return 'medium';
        case '4': return 'hard';
        default: return 'medium';
    }
}
