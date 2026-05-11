import { SGK_CATALOG, SGK_SUBJECTS, type SGKBook } from './sgk-catalog';
import type { LearningSubjectKey } from './curriculum-enrichment';
import { MATH_TOPICS } from '@/lib/content/math-generator';
import { VIETNAMESE_TOPICS } from '@/lib/content/vietnamese-generator';
import { ENGLISH_TOPICS } from '@/lib/content/english-generator';
import { SCIENCE_TOPICS } from '@/lib/content/science-generator';
import { HISGEO_TOPICS } from '@/lib/content/history-geo-generator';
import { COMPUTING_TOPICS } from '@/lib/content/computing-generator';
import { ETHICS_TOPICS } from '@/lib/content/ethics-generator';
import { ART_TOPICS } from '@/lib/content/art-generator';

export type TextbookAssetGate =
    | 'public_open_or_original'
    | 'licensed_private_import_required'
    | 'not_in_learn_yet';

export type TextbookReplacementReadiness =
    | 'interactive_curriculum_ready_guarded'
    | 'catalog_only_private_book_required'
    | 'not_in_child_learn_yet';

export interface TextbookFidelityRow {
    grade: 1 | 2 | 3 | 4 | 5;
    sgkSubject: string;
    sgkSubjectLabel: string;
    appSubject: LearningSubjectKey | null;
    bookCount: number;
    bookTitles: string[];
    interactiveTopicCount: number;
    assetGate: TextbookAssetGate;
    readiness: TextbookReplacementReadiness;
    canClaimTextbookReplacement: boolean;
    learnerUpgrade: string;
    nextAction: string;
}

export interface SubjectTextbookFidelitySummary {
    appSubject: LearningSubjectKey;
    grade: number;
    rows: TextbookFidelityRow[];
    bookCount: number;
    interactiveTopicCount: number;
    privateImportRequired: boolean;
    replacementLabel: string;
    learnerUpgrade: string;
}

type TopicInfo = { gradeLevel: number; key: string };

const LEARN_SUBJECT_BY_SGK: Record<string, LearningSubjectKey | null> = {
    'tieng-viet': 'vietnamese',
    toan: 'math',
    'tieng-anh': 'english',
    'tn-xh': 'science',
    'khoa-hoc': 'science',
    'lich-su-dia-ly': 'hisgeo',
    'tin-hoc': 'computing',
    'cong-nghe': 'computing',
    'dao-duc': 'ethics',
    'am-nhac': 'art',
    'mi-thuat': 'art',
    hdtn: null,
    gdtc: null,
};

const TOPICS_BY_SUBJECT: Record<LearningSubjectKey, TopicInfo[]> = {
    math: MATH_TOPICS,
    vietnamese: VIETNAMESE_TOPICS,
    english: ENGLISH_TOPICS,
    science: SCIENCE_TOPICS,
    hisgeo: HISGEO_TOPICS,
    computing: COMPUTING_TOPICS,
    ethics: ETHICS_TOPICS,
    art: ART_TOPICS,
    elite: [],
};

const SUBJECT_LABEL_BY_ID = Object.fromEntries(SGK_SUBJECTS.map((subject) => [subject.id, subject.label]));

function groupBooksByGradeSubject(): Map<string, SGKBook[]> {
    const groups = new Map<string, SGKBook[]>();
    SGK_CATALOG.forEach((book) => {
        const key = `${book.grade}:${book.subject}`;
        groups.set(key, [...(groups.get(key) ?? []), book]);
    });
    return groups;
}

function countInteractiveTopics(appSubject: LearningSubjectKey | null, grade: number): number {
    if (!appSubject) return 0;
    return TOPICS_BY_SUBJECT[appSubject].filter((topic) => topic.gradeLevel === grade).length;
}

function buildRow(grade: 1 | 2 | 3 | 4 | 5, sgkSubject: string, books: SGKBook[]): TextbookFidelityRow {
    const appSubject = LEARN_SUBJECT_BY_SGK[sgkSubject] ?? null;
    const interactiveTopicCount = countInteractiveTopics(appSubject, grade);
    const isInLearn = appSubject !== null;
    const hasInteractivePractice = interactiveTopicCount > 0;
    const readiness: TextbookReplacementReadiness = !isInLearn
        ? 'not_in_child_learn_yet'
        : hasInteractivePractice
            ? 'interactive_curriculum_ready_guarded'
            : 'catalog_only_private_book_required';
    const assetGate: TextbookAssetGate = !isInLearn
        ? 'not_in_learn_yet'
        : 'licensed_private_import_required';

    return {
        grade,
        sgkSubject,
        sgkSubjectLabel: SUBJECT_LABEL_BY_ID[sgkSubject] ?? books[0]?.subjectLabel ?? sgkSubject,
        appSubject,
        bookCount: books.length,
        bookTitles: books.map((book) => book.title),
        interactiveTopicCount,
        assetGate,
        readiness,
        canClaimTextbookReplacement: false,
        learnerUpgrade: hasInteractivePractice
            ? 'Có bài học tương tác, gợi ý, ôn lại và lưu bằng chứng học thay vì chỉ đọc sách tĩnh.'
            : isInLearn
                ? 'Đã có catalog SGK nhưng cần bổ sung topic tương tác trước khi gọi là học thay được.'
                : 'Cần mở module riêng hoặc liên kết sang hoạt động ngoài màn hình trước khi đưa vào Learn.',
        nextAction: isInLearn
            ? 'Nhập PDF/EPUB/ảnh SGK có quyền vào Thư viện riêng tư, sau đó đối chiếu từng bài và ảnh minh họa.'
            : 'Giữ trong catalog phụ huynh; chưa hiện thành môn riêng trong Child Learn.',
    };
}

export const TEXTBOOK_REPLACEMENT_POLICY = {
    claim: 'not_100_percent_textbook_replacement_yet',
    publicAssetRule:
        'Public GitHub Pages chỉ được dùng ảnh mở, ảnh tự tạo, hoặc metadata/link chính thức. Ảnh/trang SGK gốc cần file có quyền và nhúng riêng tư bằng LocalVault.',
    replacementGate:
        'Chỉ được gọi 100% thay SGK khi mỗi bài có map nguồn, thứ tự bài, media có quyền, bài tập tương tác, review của người lớn và live/render evidence.',
    familyWorkflow:
        'Gia đình đưa file PDF/EPUB/ảnh đã mua hoặc được trường cấp quyền vào /child/library; app đọc trong trình duyệt và không public lại nội dung bản quyền.',
};

export const TEXTBOOK_FIDELITY_ROWS: TextbookFidelityRow[] = Array.from(groupBooksByGradeSubject().entries())
    .map(([key, books]) => {
        const [gradeText, sgkSubject] = key.split(':');
        return buildRow(Number(gradeText) as 1 | 2 | 3 | 4 | 5, sgkSubject, books);
    })
    .sort((a, b) => a.grade - b.grade || a.sgkSubjectLabel.localeCompare(b.sgkSubjectLabel, 'vi'));

const learnSubjectSet = new Set(TEXTBOOK_FIDELITY_ROWS.map((row) => row.appSubject).filter(Boolean));
const missingSubjectRows = TEXTBOOK_FIDELITY_ROWS.filter((row) => row.appSubject === null);

export const TEXTBOOK_FIDELITY_STATS = {
    gradeCount: 5,
    sgkCatalogRecords: SGK_CATALOG.length,
    gradeSubjectRows: TEXTBOOK_FIDELITY_ROWS.length,
    learnSubjectCount: learnSubjectSet.size,
    interactiveTopicCount: Object.values(TOPICS_BY_SUBJECT).flat().length,
    rowsWithInteractivePractice: TEXTBOOK_FIDELITY_ROWS.filter((row) => row.interactiveTopicCount > 0).length,
    rowsRequiringPrivateImport: TEXTBOOK_FIDELITY_ROWS.filter((row) => row.assetGate === 'licensed_private_import_required').length,
    rowsNotInLearnYet: missingSubjectRows.length,
    notInLearnLabels: [...new Set(missingSubjectRows.map((row) => row.sgkSubjectLabel))],
    noOverclaim:
        'Chưa được gọi 100% thay SGK gốc: public app chưa có toàn bộ trang/ảnh SGK được cấp quyền và tất cả row vẫn cần private import hoặc review.',
};

export function getTextbookFidelityRowsForSubject(appSubject: LearningSubjectKey, grade?: number): TextbookFidelityRow[] {
    return TEXTBOOK_FIDELITY_ROWS.filter((row) =>
        row.appSubject === appSubject && (grade == null || row.grade === grade),
    );
}

export function getSubjectTextbookFidelitySummary(appSubject: LearningSubjectKey, grade: number): SubjectTextbookFidelitySummary {
    const rows = getTextbookFidelityRowsForSubject(appSubject, grade);
    const bookCount = rows.reduce((total, row) => total + row.bookCount, 0);
    const interactiveTopicCount = rows.reduce((total, row) => total + row.interactiveTopicCount, 0);
    const privateImportRequired = rows.some((row) => row.assetGate === 'licensed_private_import_required');

    return {
        appSubject,
        grade,
        rows,
        bookCount,
        interactiveTopicCount,
        privateImportRequired,
        replacementLabel: privateImportRequired
            ? 'Có thể học tương tác theo chuẩn; cần file/ảnh SGK có quyền để thay sách gốc 100%.'
            : 'Chỉ dùng nội dung mở/tự tạo trong public build.',
        learnerUpgrade:
            'Mỗi phiên học ưu tiên: đọc mục tiêu, xem hình/ngữ liệu hợp pháp, làm câu hỏi, nhận gợi ý đúng lúc, lưu lỗi sai và hẹn ôn lại.',
    };
}
