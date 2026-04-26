// ========================================
// Free Dictionary Adapter — English definitions
// https://dictionaryapi.dev/
// CC BY-SA 3.0 — free, no key required
// ========================================

export interface DictionaryEntry {
    word: string;
    phonetic?: string;
    phonetics: { text?: string; audio?: string }[];
    meanings: {
        partOfSpeech: string;
        definitions: {
            definition: string;
            example?: string;
            synonyms: string[];
            antonyms: string[];
        }[];
    }[];
    sourceUrls: string[];
}

/**
 * Lookup a word in the Free Dictionary API.
 * Returns null if no definition found.
 */
export async function lookupWord(word: string): Promise<DictionaryEntry | null> {
    try {
        const res = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.trim().toLowerCase())}`,
        );
        if (!res.ok) return null;
        const data = (await res.json()) as DictionaryEntry[];
        return data[0] ?? null;
    } catch {
        return null;
    }
}

/**
 * Get a simple definition string for a word.
 */
export async function getSimpleDefinition(word: string): Promise<string | null> {
    const entry = await lookupWord(word);
    if (!entry) return null;
    return entry.meanings[0]?.definitions[0]?.definition ?? null;
}

/**
 * Get synonyms for a word.
 */
export async function getSynonyms(word: string): Promise<string[]> {
    const entry = await lookupWord(word);
    if (!entry) return [];
    const synonyms = new Set<string>();
    for (const meaning of entry.meanings) {
        for (const def of meaning.definitions) {
            def.synonyms.forEach(s => synonyms.add(s));
        }
    }
    return Array.from(synonyms).slice(0, 10);
}
