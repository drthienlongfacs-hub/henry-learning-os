import type {
    ComprehensionCheck,
    KeyVocabularyEntry,
    ReadingSupport,
    SentenceGuide,
} from '@/data/textbook-library';

export type LocalTextbookFileType = 'pdf' | 'epub' | 'text' | 'markdown';

export interface LocalTextbookRecord {
    id: string;
    title: string;
    fileName: string;
    fileType: LocalTextbookFileType;
    mimeType: string;
    sizeBytes: number;
    importedAt: string;
    sourceLabel: string;
    rightsNote: string;
    textContent?: string;
    dataUrl?: string;
}

export interface LocalTextbookReaderSupport {
    keyVocabulary: KeyVocabularyEntry[];
    sentenceGuides: SentenceGuide[];
    support: ReadingSupport;
    comprehensionChecks: ComprehensionCheck[];
    viSummary: string;
    sourceAlignment: string[];
}

export const LOCAL_TEXTBOOK_DB_NAME = 'henry-learning-os-local-textbook-vault';
export const LOCAL_TEXTBOOK_DB_VERSION = 1;
export const LOCAL_TEXTBOOK_STORE_NAME = 'embeddedTextbooks';
export const LOCAL_TEXTBOOK_MAX_FILE_SIZE_BYTES = 80 * 1024 * 1024;

export const TEXTBOOK_EMBEDDING_AUDIT = {
    scope: 'Direct in-app textbook embedding for licensed family files',
    surface: '/child/library',
    storage: 'Browser IndexedDB, local to the family device; no upload to GitHub Pages.',
    readerModes: ['PDF in-app frame', 'TXT/MD interactive bilingual reader', 'EPUB stored as embedded file'],
    gates: [
        'Textbook files are imported from the user device, not external links.',
        'Copyrighted PDF/EPUB files are not committed to the public repository.',
        'Plain-text/OCR files open in InteractiveReader with tap-to-lookup and bilingual scaffolding.',
        'The route keeps built-in companion passages and public-domain/OER content available.',
    ],
};

export const LOCAL_BILINGUAL_WORD_BANK: Record<string, string> = {
    a: 'một',
    about: 'về',
    after: 'sau khi',
    all: 'tất cả',
    also: 'cũng',
    and: 'và',
    animal: 'động vật',
    are: 'là/đang',
    at: 'ở/tại',
    because: 'bởi vì',
    before: 'trước khi',
    big: 'lớn',
    book: 'sách',
    boy: 'bé trai',
    can: 'có thể',
    child: 'trẻ em',
    children: 'trẻ em',
    city: 'thành phố',
    clean: 'sạch',
    color: 'màu sắc',
    day: 'ngày',
    do: 'làm',
    does: 'làm',
    earth: 'trái đất',
    eat: 'ăn',
    family: 'gia đình',
    first: 'đầu tiên',
    food: 'thức ăn',
    for: 'cho',
    friend: 'bạn',
    friends: 'bạn bè',
    from: 'từ',
    garden: 'khu vườn',
    girl: 'bé gái',
    go: 'đi',
    good: 'tốt',
    has: 'có',
    have: 'có',
    he: 'cậu ấy/anh ấy',
    help: 'giúp đỡ',
    her: 'của cô ấy',
    his: 'của cậu ấy',
    home: 'nhà',
    in: 'trong',
    is: 'là/đang',
    it: 'nó',
    learn: 'học',
    like: 'thích/giống như',
    little: 'nhỏ',
    live: 'sống',
    make: 'làm/tạo ra',
    many: 'nhiều',
    math: 'toán',
    mother: 'mẹ',
    my: 'của tôi',
    name: 'tên',
    new: 'mới',
    not: 'không',
    number: 'số',
    of: 'của',
    on: 'trên',
    one: 'một',
    our: 'của chúng ta',
    people: 'mọi người',
    plant: 'cây',
    read: 'đọc',
    school: 'trường học',
    see: 'nhìn thấy',
    she: 'cô ấy',
    small: 'nhỏ',
    story: 'câu chuyện',
    student: 'học sinh',
    teacher: 'giáo viên',
    the: 'mạo từ xác định',
    their: 'của họ',
    they: 'họ/chúng',
    this: 'này',
    to: 'đến/để',
    use: 'sử dụng',
    water: 'nước',
    we: 'chúng ta',
    with: 'với',
    word: 'từ',
    work: 'làm việc',
    write: 'viết',
    you: 'bạn/con',
};

export function detectLocalTextbookFileType(fileName: string, mimeType: string): LocalTextbookFileType | null {
    const lowerName = fileName.toLowerCase();
    const lowerMime = mimeType.toLowerCase();

    if (lowerMime === 'application/pdf' || lowerName.endsWith('.pdf')) return 'pdf';
    if (lowerMime === 'application/epub+zip' || lowerName.endsWith('.epub')) return 'epub';
    if (lowerMime.startsWith('text/') || lowerName.endsWith('.txt')) return 'text';
    if (lowerName.endsWith('.md') || lowerName.endsWith('.markdown')) return 'markdown';

    return null;
}

export function normalizeLocalTextbookTitle(fileName: string): string {
    return fileName
        .replace(/\.(pdf|epub|txt|md|markdown)$/i, '')
        .replace(/[_-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

export function formatFileSize(sizeBytes: number): string {
    if (sizeBytes < 1024 * 1024) return `${Math.max(1, Math.round(sizeBytes / 1024))} KB`;
    return `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function lookupLocalWordHint(word: string): KeyVocabularyEntry | undefined {
    const cleanWord = word.toLowerCase().replace(/[^a-z'-]/g, '');
    const viMeaning = LOCAL_BILINGUAL_WORD_BANK[cleanWord];
    if (!viMeaning) return undefined;
    return { word: cleanWord, viMeaning };
}

export function extractSentences(text: string, limit = 6): string[] {
    return text
        .replace(/\s+/g, ' ')
        .split(/(?<=[.!?])\s+/)
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length >= 12)
        .slice(0, limit);
}

export function buildLocalTextbookVocabulary(text: string, limit = 18): KeyVocabularyEntry[] {
    const words = text
        .toLowerCase()
        .match(/[a-z][a-z'-]{2,}/g);

    if (!words) return [];

    const counts = new Map<string, number>();
    for (const word of words) {
        counts.set(word, (counts.get(word) ?? 0) + 1);
    }

    return [...counts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, limit)
        .map(([word]) => lookupLocalWordHint(word) ?? ({
            word,
            viMeaning: 'từ cần hiểu trong văn cảnh; chạm vào từ để xem định nghĩa tiếng Anh ngay trong app',
        }));
}

export function buildSentenceExplanation(sentence: string): string {
    const terms = sentence
        .toLowerCase()
        .match(/[a-z][a-z'-]{2,}/g)
        ?.map(word => lookupLocalWordHint(word))
        .filter((entry): entry is KeyVocabularyEntry => Boolean(entry))
        .slice(0, 5) ?? [];

    if (terms.length === 0) {
        return 'Diễn giải tiếng Việt: đọc câu theo cụm chủ ngữ - hành động - chi tiết; chạm từng từ để xem nghĩa ngay trong app.';
    }

    return `Diễn giải tiếng Việt: ${terms.map(term => `${term.word} = ${term.viMeaning}`).join('; ')}. Ghép các cụm này để hiểu ý chính của câu.`;
}

export function buildLocalTextbookSentenceGuides(text: string): SentenceGuide[] {
    return extractSentences(text).map((sentence, index) => {
        const keyTerms = sentence
            .toLowerCase()
            .match(/[a-z][a-z'-]{2,}/g)
            ?.filter((word, wordIndex, arr) => arr.indexOf(word) === wordIndex)
            .slice(0, 4) ?? [];

        return {
            en: sentence,
            vi: buildSentenceExplanation(sentence),
            focus: index === 0 ? 'Nắm ý chính của đoạn mở đầu' : 'Đọc theo cụm và kiểm tra từ khóa',
            question: index === 0 ? 'Câu này đang giới thiệu điều gì?' : 'Từ khóa nào giúp con hiểu câu này?',
            answerHint: keyTerms.length > 0 ? `Nhìn các từ: ${keyTerms.join(', ')}` : 'Tìm chủ ngữ và động từ chính.',
            keyTerms,
        };
    });
}

export function buildLocalTextbookReaderSupport(title: string, text: string): LocalTextbookReaderSupport {
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

    return {
        keyVocabulary: buildLocalTextbookVocabulary(text),
        sentenceGuides: buildLocalTextbookSentenceGuides(text),
        support: {
            beforeReading: [
                `Xác định tên sách/bài: ${title}.`,
                'Nhìn tiêu đề, dự đoán bài nói về ai, ở đâu, việc gì.',
            ],
            whileReading: [
                'Chạm các từ chưa rõ để xem nghĩa ngay trong app.',
                'Dùng tab Song ngữ để đọc từng câu kèm diễn giải tiếng Việt.',
            ],
            afterReading: [
                'Kể lại ý chính bằng 3 câu tiếng Việt.',
                'Chọn 5 từ mới và đặt câu ngắn bằng tiếng Anh.',
            ],
            parentPrompt: 'Phụ huynh hỏi: con hiểu câu nào nhất, câu nào cần đọc lại?',
        },
        comprehensionChecks: [
            { question: 'Ý chính của đoạn này là gì?', answerHint: 'Tìm nhân vật/chủ đề, hành động và kết quả.' },
            { question: 'Từ nào con chưa chắc nghĩa?', answerHint: 'Chạm từ đó trong màn đọc để xem nghĩa.' },
        ],
        viSummary: `Tài liệu "${title}" đã được nhúng trực tiếp từ thiết bị gia đình. Đoạn này có khoảng ${wordCount} từ; app hỗ trợ đọc từng câu, tra từ và ghi chú song ngữ ngay trên màn hình.`,
        sourceAlignment: [
            'Local authorized textbook import',
            'In-app bilingual reading layer',
            'No public repost of copyrighted file',
        ],
    };
}
