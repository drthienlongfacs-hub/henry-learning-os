// ========================================
// StoryWeaver Adapter — CC-BY 4.0 Children's Stories
// https://storyweaver.org.in/ — Pratham Books
// Thousands of free, open-licensed stories in 300+ languages
// Including Vietnamese and English
// ========================================

import type {
    ExternalResourceAdapter,
    LicensePolicy,
    NormalizedLearningResource,
    ResourceQuery,
    SafetyClassification,
} from '@/types/resource-types';
import { checkLicense } from '@/lib/resources/license-gate';
import { runSafetyGates } from '@/lib/resources/safety-gate';

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
    safetyPassed?: boolean;
    learningObjective?: string;
    retrievalQuestions?: string[];
}

const SW_API = 'https://storyweaver.org.in/api/v1';
const SW_WEB = 'https://storyweaver.org.in';

export const STORYWEAVER_LICENSE: LicensePolicy = {
    spdxId: 'CC-BY-4.0',
    allowedUse: 'transform_allowed',
    requiresAttribution: true,
    commercialOk: true,
    shareAlikeRequired: false,
    notes: 'StoryWeaver/Pratham Books stories are published for reuse under Creative Commons Attribution 4.0 unless a specific story states otherwise.',
};

interface RawStoryWeaverStory {
    id?: number | string;
    title?: string;
    language?: string;
    reading_level?: string | number;
    slug?: string;
    cover_image?: { url?: string };
    synopsis?: string;
    authors?: Array<{ name?: string }>;
}

interface RawStoryWeaverResponse {
    data?: RawStoryWeaverStory[];
}

function asString(value: unknown, fallback = '') {
    return typeof value === 'string' ? value : fallback;
}

function asNumber(value: unknown, fallback = 0) {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : fallback;
    }
    return fallback;
}

function languageForStoryWeaver(language?: string): 'English' | 'Vietnamese' {
    if (!language) return 'English';
    const normalized = language.toLowerCase();
    if (normalized === 'vi' || normalized.includes('vietnam')) return 'Vietnamese';
    return 'English';
}

function isoLanguage(language: string) {
    const normalized = language.toLowerCase();
    if (normalized.includes('vietnam')) return 'vi';
    if (normalized.includes('english')) return 'en';
    return normalized.slice(0, 2) || 'en';
}

function levelFromAgeBand(ageBand?: string): '1' | '2' | '3' | '4' | undefined {
    if (!ageBand) return undefined;
    const firstAge = Number(ageBand.match(/\d+/)?.[0]);
    if (!Number.isFinite(firstAge)) return undefined;
    if (firstAge <= 5) return '1';
    if (firstAge <= 7) return '2';
    if (firstAge <= 9) return '3';
    return '4';
}

function ageMinForLevel(level: string) {
    switch (level) {
        case '1':
            return 4;
        case '2':
            return 6;
        case '3':
            return 8;
        case '4':
            return 10;
        default:
            return 6;
    }
}

function ageBandForLevel(level: string) {
    switch (level) {
        case '1':
            return '4-6';
        case '2':
            return '6-8';
        case '3':
            return '8-10';
        case '4':
            return '10-13';
        default:
            return '6-13';
    }
}

function childAgeFromQuery(query: ResourceQuery, fallbackAge: number) {
    const firstAge = Number(query.ageBand?.match(/\d+/)?.[0]);
    return Number.isFinite(firstAge) ? firstAge : fallbackAge;
}

function difficultyEstimate(level: string) {
    switch (level) {
        case '1':
            return 0.2;
        case '2':
            return 0.4;
        case '3':
            return 0.65;
        case '4':
            return 0.85;
        default:
            return 0.5;
    }
}

function withLicenseGate(safety: SafetyClassification, licenseAllowed: boolean): SafetyClassification {
    if (licenseAllowed) return safety;
    return {
        ...safety,
        passed: false,
        failedGates: Array.from(new Set([...safety.failedGates, 'license'])),
        notes: [safety.notes, 'License gate blocked the requested use.'].filter(Boolean).join(' '),
    };
}

function mapRawStory(story: RawStoryWeaverStory, language: 'English' | 'Vietnamese'): StoryWeaverBook {
    const id = asNumber(story.id);
    const slug = asString(story.slug, String(id));
    return {
        id,
        title: asString(story.title),
        language: asString(story.language, language),
        level: String(story.reading_level || '1'),
        slug,
        coverUrl: story.cover_image?.url || '',
        synopsis: asString(story.synopsis),
        authors: (story.authors || []).map((author) => author.name || '').filter(Boolean),
        readUrl: `${SW_WEB}/stories/${slug}`,
        license: 'CC-BY 4.0',
    };
}

export function normalizeStoryWeaverBook(
    book: StoryWeaverBook,
    query: ResourceQuery = {},
    retrievedAt = new Date().toISOString(),
): NormalizedLearningResource {
    const ageMin = ageMinForLevel(book.level);
    const licenseCheck = checkLicense(STORYWEAVER_LICENSE, 'transform');
    const safety = withLicenseGate(
        runSafetyGates(
            {
                ageMin,
                ageMax: 13,
                containsPII: false,
                hasSocialFeatures: false,
                hasFinanceFeatures: false,
                hasMedicalContent: false,
                requiresToolAccess: false,
            },
            { childAge: childAgeFromQuery(query, ageMin), parentApproved: false },
        ),
        licenseCheck.allowed,
    );
    const sourceUrl = book.readUrl || `${SW_WEB}/stories/${book.slug || book.id}`;

    return {
        id: `storyweaver-${book.id}`,
        providerId: 'storyweaver',
        title: book.title,
        description: book.synopsis,
        language: isoLanguage(book.language),
        ageBand: ageBandForLevel(book.level),
        subjectTags: ['reading', 'story', 'literacy'],
        skillTags: ['reading_comprehension', 'vocabulary', 'oral_reading', 'retell_with_evidence'],
        difficultyEstimate: difficultyEstimate(book.level),
        contentUrl: sourceUrl,
        localCacheKey: `storyweaver:${book.slug || book.id}`,
        attribution: {
            title: book.title,
            sourceName: 'StoryWeaver / Pratham Books',
            sourceUrl,
            author: book.authors.join(', ') || undefined,
            license: 'CC-BY 4.0',
            licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
            retrievedAt,
        },
        safety,
        pedagogy: {
            learningObjective: 'Đọc hiểu truyện ngắn, trả lời bằng chứng từ văn bản và kể lại ý chính.',
            prerequisites: ['Biết đọc câu ngắn', 'Có người lớn hỗ trợ khi mở liên kết ngoài'],
            retrievalQuestions: [
                'Nhân vật chính là ai?',
                'Điều gì xảy ra trước và sau trong câu chuyện?',
                'Con tìm được câu nào trong truyện làm bằng chứng?',
            ],
            discussionPrompts: [
                'Con thích hành động nào của nhân vật? Vì sao?',
                'Nếu đổi kết thúc, câu chuyện sẽ thay đổi thế nào?',
            ],
            transferChallenge: 'Kể lại truyện bằng 3 câu và dùng ít nhất một từ mới.',
            parentMission: 'Ngồi cùng con khi mở StoryWeaver, hỏi con chỉ vào câu trong truyện trước khi trả lời.',
            assessmentRubric: {
                evidence: 'Câu trả lời có chỉ ra chi tiết trong truyện.',
                sequence: 'Kể đúng thứ tự trước - sau.',
                vocabulary: 'Dùng được từ mới trong ngữ cảnh.',
            },
        },
    };
}

async function fetchRawStoryWeaver(opts: {
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

    const res = await fetch(`${SW_API}/stories-search?${params}`, {
        headers: { Accept: 'application/json' },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as RawStoryWeaverResponse;

    return (data.data || []).map((story) => mapRawStory(story, language));
}

export const storyWeaverAdapter: ExternalResourceAdapter = {
    id: 'storyweaver',
    displayName: 'StoryWeaver',
    resourceType: 'book',
    licensePolicy: STORYWEAVER_LICENSE,

    async fetchMetadata(query: ResourceQuery): Promise<NormalizedLearningResource[]> {
        const language = languageForStoryWeaver(query.language);
        const rawStories = await fetchRawStoryWeaver({
            query: query.query || query.subject,
            language,
            level: levelFromAgeBand(query.ageBand),
            limit: query.limit ?? 12,
        });

        return rawStories
            .map((book) => normalizeStoryWeaverBook(book, query))
            .filter((resource) => resource.safety.passed);
    },

    async fetchContent(resourceId: string): Promise<{ content: string; mimeType: string }> {
        const slug = resourceId.replace(/^storyweaver:/, '').replace(/^storyweaver-/, '');
        const content = await getStoryText(slug);
        return { content: content ?? '', mimeType: 'text/plain; charset=utf-8' };
    },
};

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
    try {
        const rawStories = await fetchRawStoryWeaver(opts);
        return rawStories.map((story) => {
            const normalized = normalizeStoryWeaverBook(story, {
                query: opts.query,
                language: opts.language,
                ageBand: opts.level ? ageBandForLevel(opts.level) : undefined,
                limit: opts.limit,
            });
            return {
                ...story,
                safetyPassed: normalized.safety.passed,
                learningObjective: normalized.pedagogy?.learningObjective,
                retrievalQuestions: normalized.pedagogy?.retrievalQuestions,
            };
        });
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
