import { LEARNING_SOURCES, type SourceId } from '@/data/curriculum-enrichment';

export type EvidenceClaimStatus =
    | 'source_backed'
    | 'source_backed_localized'
    | 'local_practice'
    | 'needs_local_measurement'
    | 'needs_review';

export type EvidenceSourceKind = 'official_guidance' | 'research_review' | 'practice_guide' | 'product_benchmark';

export interface InternetEvidenceSource {
    id: string;
    sourceId?: SourceId;
    title: string;
    provider: string;
    kind: EvidenceSourceKind;
    url: string;
    verifiedAt: string;
    useInHenry: string;
}

export interface LocalEvidenceRef {
    path: string;
    signal: string;
}

export interface WikiEvidenceRecord {
    wikiId: string;
    status: EvidenceClaimStatus;
    confidence: 'high' | 'medium' | 'low';
    sourceIds: SourceId[];
    internetSourceIds: string[];
    localEvidence: LocalEvidenceRef[];
    operationalRule: string;
    caveat: string;
}

export const EVIDENCE_LEDGER_VERIFIED_AT = '2026-05-03T00:00:00.000Z';

export const INTERNET_EVIDENCE_SOURCES: InternetEvidenceSource[] = [
    {
        id: 'ies-study-learning-2007',
        sourceId: 'ies-study-learning',
        title: 'Organizing Instruction and Study to Improve Student Learning',
        provider: 'Institute of Education Sciences / What Works Clearinghouse',
        kind: 'practice_guide',
        url: 'https://ies.ed.gov/ncee/wwc/PracticeGuide/1',
        verifiedAt: EVIDENCE_LEDGER_VERIFIED_AT,
        useInHenry: 'Spacing, worked examples, graphics plus verbal descriptions, concrete-abstract mapping, quizzing and deep explanatory questions.',
    },
    {
        id: 'ies-reading-comprehension-k3-2010',
        sourceId: 'ies-foundational-reading',
        title: 'Improving Reading Comprehension in Kindergarten Through 3rd Grade',
        provider: 'Institute of Education Sciences / What Works Clearinghouse',
        kind: 'practice_guide',
        url: 'https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/readingcomp_pg_092810.pdf',
        verifiedAt: EVIDENCE_LEDGER_VERIFIED_AT,
        useInHenry: 'Reading comprehension strategies, text structure, focused discussion, purposeful texts and motivating reading context.',
    },
    {
        id: 'aero-spacing-retrieval-2021',
        sourceId: 'aero-spacing-retrieval',
        title: 'Spacing and retrieval practice guide',
        provider: 'Australian Education Research Organisation',
        kind: 'practice_guide',
        url: 'https://www.edresearch.edu.au/guides-resources/practice-guides/spacing-and-retrieval-practice-guide-full-publication',
        verifiedAt: EVIDENCE_LEDGER_VERIFIED_AT,
        useInHenry: 'Low-risk recall, spaced review and transfer prompts across lessons instead of rereading.',
    },
    {
        id: 'eef-metacognition-toolkit-2025',
        sourceId: 'eef-metacognition',
        title: 'Metacognition and self-regulation',
        provider: 'Education Endowment Foundation',
        kind: 'research_review',
        url: 'https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/metacognition-and-self-regulation',
        verifiedAt: EVIDENCE_LEDGER_VERIFIED_AT,
        useInHenry: 'Plan-monitor-evaluate prompts, teacher/AI modelling, scaffolding and explicit strategy talk.',
    },
    {
        id: 'unicef-ai-children-v3',
        sourceId: 'unicef-ai-children',
        title: 'Guidance on AI and children, Version 3.0',
        provider: 'UNICEF Innocenti',
        kind: 'official_guidance',
        url: 'https://www.unicef.org/innocenti/reports/policy-guidance-ai-children',
        verifiedAt: EVIDENCE_LEDGER_VERIFIED_AT,
        useInHenry: 'Under-13 AI safety, privacy, transparency, inclusion and parent-visible controls.',
    },
    {
        id: 'aap-family-media-plan',
        sourceId: 'aap-family-media',
        title: 'Family Media Plan',
        provider: 'American Academy of Pediatrics / HealthyChildren.org',
        kind: 'official_guidance',
        url: 'https://www.healthychildren.org/English/fmp/Pages/MediaPlan.aspx',
        verifiedAt: EVIDENCE_LEDGER_VERIFIED_AT,
        useInHenry: 'Short sessions, parent co-learning, screen boundaries and offline follow-up.',
    },
    {
        id: 'cast-udl-framework',
        sourceId: 'cast-udl',
        title: 'Universal Design for Learning',
        provider: 'CAST',
        kind: 'official_guidance',
        url: 'https://www.cast.org/what-we-do/universal-design-for-learning/',
        verifiedAt: EVIDENCE_LEDGER_VERIFIED_AT,
        useInHenry: 'Multiple ways to engage, represent knowledge and answer without lowering the learning goal.',
    },
];

export const WIKI_EVIDENCE_LEDGER: WikiEvidenceRecord[] = [
    {
        wikiId: 'lm-01',
        status: 'source_backed_localized',
        confidence: 'high',
        sourceIds: ['aero-spacing-retrieval', 'ies-study-learning', 'dunlosky-learning-techniques'],
        internetSourceIds: ['aero-spacing-retrieval-2021', 'ies-study-learning-2007'],
        localEvidence: [
            { path: 'src/components/VocabReview.tsx', signal: 'Vocab review stores interval, ease and nextReview per word.' },
            { path: 'src/data/learning-science-system.ts', signal: 'Spacing is a first-class learning science principle.' },
        ],
        operationalRule: 'Schedule review after spacing; never repeat everything every day.',
        caveat: 'Local effect size is not claimed until retention data is collected from Henry sessions.',
    },
    {
        wikiId: 'lm-02',
        status: 'source_backed_localized',
        confidence: 'high',
        sourceIds: ['aero-spacing-retrieval', 'ies-study-learning', 'dunlosky-learning-techniques'],
        internetSourceIds: ['aero-spacing-retrieval-2021', 'ies-study-learning-2007'],
        localEvidence: [
            { path: 'src/lib/evidence/reading-quiz-evidence.ts', signal: 'Quiz decisions are based on attempts before showing the next move.' },
            { path: 'src/lib/evidence/reading-quiz-history.ts', signal: 'Reading attempt history persists redacted metadata for passage-level trend evidence.' },
            { path: 'src/components/ReadingQuiz.tsx', signal: 'Reading answers are checked before the hint becomes evidence.' },
        ],
        operationalRule: 'Ask for retrieval before explanation; use hints only after an attempt.',
        caveat: 'Correct after hint is progress, not independent mastery.',
    },
    {
        wikiId: 'lm-03',
        status: 'source_backed',
        confidence: 'medium',
        sourceIds: ['ies-study-learning', 'dunlosky-learning-techniques'],
        internetSourceIds: ['ies-study-learning-2007'],
        localEvidence: [
            { path: 'src/data/learning-benchmark-system.ts', signal: 'Deep/challenge sessions mix recall, core practice, traps and transfer.' },
        ],
        operationalRule: 'Use interleaving after basic exposure, not before the learner knows the task family.',
        caveat: 'The current reading quiz is passage-focused; full interleaving needs cross-passage history.',
    },
    {
        wikiId: 'lm-06',
        status: 'source_backed_localized',
        confidence: 'high',
        sourceIds: ['national-reading-panel', 'ies-foundational-reading'],
        internetSourceIds: ['ies-reading-comprehension-k3-2010'],
        localEvidence: [
            { path: 'src/data/textbook-library.ts', signal: 'Passages contain vocabulary, sentence guides and comprehension checks.' },
            { path: 'src/components/ReadingQuiz.tsx', signal: 'Reading UI combines text, TTS, vocabulary and comprehension evidence.' },
        ],
        operationalRule: 'Do not reduce reading to phonics only; keep vocabulary, fluency and comprehension evidence visible.',
        caveat: 'Formal fluency norms such as WCPM are not yet measured in-app.',
    },
    {
        wikiId: 'pe-01',
        status: 'source_backed_localized',
        confidence: 'high',
        sourceIds: ['eef-feedback', 'eef-metacognition', 'ies-study-learning'],
        internetSourceIds: ['eef-metacognition-toolkit-2025', 'ies-study-learning-2007'],
        localEvidence: [
            { path: 'src/lib/evidence/learning-evidence.ts', signal: 'Topic evidence chooses observe/repair/practice/stretch from local attempts and reviews.' },
            { path: 'src/lib/evidence/reading-quiz-evidence.ts', signal: 'Reading evidence separates first attempt, hint use and retry success.' },
            { path: 'src/lib/evidence/reading-quiz-history.ts', signal: 'History summaries report no-data, collecting and usable states without inventing accuracy.' },
        ],
        operationalRule: 'Feedback must name the next learning move, not just correct/incorrect.',
        caveat: 'Parent-facing claims must state sample size and reliability.',
    },
    {
        wikiId: 'pe-02',
        status: 'needs_review',
        confidence: 'low',
        sourceIds: ['self-determination-theory', 'eef-metacognition'],
        internetSourceIds: ['eef-metacognition-toolkit-2025'],
        localEvidence: [
            { path: 'docs/dev-handoff/policies/AI_SAFETY_POLICY.md', signal: 'Child-facing AI should encourage effort and strategy without labeling the child.' },
        ],
        operationalRule: 'Use process praise and strategy reflection; avoid claiming mindset intervention efficacy without local review.',
        caveat: 'Growth mindset evidence is mixed; keep as language policy, not efficacy claim.',
    },
    {
        wikiId: 'lm-08',
        status: 'local_practice',
        confidence: 'medium',
        sourceIds: ['ies-foundational-reading', 'aap-family-media'],
        internetSourceIds: ['ies-reading-comprehension-k3-2010', 'aap-family-media-plan'],
        localEvidence: [
            { path: 'src/lib/resources/adapters/storyweaver-adapter.ts', signal: 'StoryWeaver resources are wrapped with retrieval questions and parent mission.' },
            { path: 'src/components/FreeStoriesShelf.tsx', signal: 'Stories are loaded by language/level with CC-BY attribution.' },
        ],
        operationalRule: 'Use stories as motivating context, then require text evidence or retell output.',
        caveat: 'No local controlled comparison versus isolated word lists; do not claim percentage lift.',
    },
    {
        wikiId: 'pe-05',
        status: 'source_backed_localized',
        confidence: 'medium',
        sourceIds: ['aap-family-media', 'unicef-ai-children'],
        internetSourceIds: ['aap-family-media-plan', 'unicef-ai-children-v3'],
        localEvidence: [
            { path: 'docs/dev-handoff/policies/AI_SAFETY_POLICY.md', signal: 'Under-13 mode forbids unrestricted chatbot behavior.' },
            { path: 'src/lib/resources/adapters/storyweaver-adapter.ts', signal: 'External story use includes parent mission and link-opening caveat.' },
        ],
        operationalRule: 'Prefer parent-mediated discussion and offline transfer for child media use.',
        caveat: 'Do not claim doubled language output without a direct local study.',
    },
    {
        wikiId: 'lm-09',
        status: 'local_practice',
        confidence: 'medium',
        sourceIds: ['aero-spacing-retrieval'],
        internetSourceIds: ['aero-spacing-retrieval-2021'],
        localEvidence: [
            { path: 'src/components/VocabReview.tsx', signal: 'The current implementation stores ease, interval, reps and next review timestamp.' },
        ],
        operationalRule: 'Treat SM-2 style scheduling as a practical heuristic and validate it with retention results.',
        caveat: 'This app has a simplified child-safe scheduler, not a full SuperMemo clone.',
    },
    {
        wikiId: 'lm-11',
        status: 'local_practice',
        confidence: 'medium',
        sourceIds: ['unicef-ai-children', 'eef-metacognition'],
        internetSourceIds: ['unicef-ai-children-v3', 'eef-metacognition-toolkit-2025'],
        localEvidence: [
            { path: 'src/data/wiki-knowledge-base.ts', signal: 'Wiki entries are structured as reusable concept records with links and tags.' },
            { path: 'src/components/WikiExplorer.tsx', signal: 'Wiki UI now shows evidence status, caveat, source links and local evidence.' },
            { path: 'src/data/evidence-source-ledger.ts', signal: 'Evidence ledger blocks source-backed claims unless source and local traces are explicit.' },
        ],
        operationalRule: 'Treat the wiki pattern as a local knowledge-management workflow; every strong claim needs a source ledger record before display as evidence.',
        caveat: 'This is not a validated learning intervention by itself; it is a governance pattern for keeping evidence traceable.',
    },
    {
        wikiId: 'pe-06',
        status: 'needs_local_measurement',
        confidence: 'medium',
        sourceIds: ['national-reading-panel', 'ies-foundational-reading'],
        internetSourceIds: ['ies-reading-comprehension-k3-2010'],
        localEvidence: [
            { path: 'src/components/ReadingQuiz.tsx', signal: 'TTS and sentence guides support oral reading, but WCPM is not measured yet.' },
        ],
        operationalRule: 'Add WCPM only after a consented timer/audio workflow exists.',
        caveat: 'Norm targets are not displayed as Henry performance claims.',
    },
    {
        wikiId: 'pe-07',
        status: 'needs_review',
        confidence: 'low',
        sourceIds: ['national-reading-panel'],
        internetSourceIds: [],
        localEvidence: [
            { path: 'src/data/textbook-library.ts', signal: 'Key vocabulary includes phonetics for spoken practice.' },
        ],
        operationalRule: 'Track Vietnamese L1 pronunciation patterns as local observations before using them for adaptive decisions.',
        caveat: 'Specific error-rate reductions require a direct source and local measurement.',
    },
    {
        wikiId: 'lm-10',
        status: 'source_backed_localized',
        confidence: 'high',
        sourceIds: ['ies-study-learning', 'cast-udl'],
        internetSourceIds: ['ies-study-learning-2007', 'cast-udl-framework'],
        localEvidence: [
            { path: 'src/components/ReadingQuiz.tsx', signal: 'Reading UI pairs text, TTS, vocabulary, bilingual guide and evidence checks.' },
        ],
        operationalRule: 'Pair visual/text representation with spoken or written explanation.',
        caveat: 'Do not claim a fixed comprehension percentage without a study in this product.',
    },
    {
        wikiId: 'pe-08',
        status: 'source_backed_localized',
        confidence: 'medium',
        sourceIds: ['self-determination-theory', 'aap-family-media'],
        internetSourceIds: ['aap-family-media-plan'],
        localEvidence: [
            { path: 'src/lib/reading-tracker.ts', signal: 'Streak and open count exist as habit signals.' },
            { path: 'src/components/ReadingProgressDashboard.tsx', signal: 'Progress display is separated from mastery evidence.' },
        ],
        operationalRule: 'Use streaks as engagement data, not as proof of learning.',
        caveat: 'Gamification is a habit support; mastery still needs attempt/retention/transfer evidence.',
    },
    {
        wikiId: 'cu-04',
        status: 'local_practice',
        confidence: 'medium',
        sourceIds: ['ies-study-learning', 'cast-udl'],
        internetSourceIds: ['ies-study-learning-2007', 'cast-udl-framework'],
        localEvidence: [
            { path: 'src/components/ReadingQuiz.tsx', signal: 'Sentence-level TTS and bilingual sentence guides are implemented.' },
        ],
        operationalRule: 'Use audio plus text to support access, then still require an independent comprehension attempt.',
        caveat: 'Current implementation supports sentence playback, not synchronized word-level highlighting.',
    },
    {
        wikiId: 'pe-09',
        status: 'source_backed_localized',
        confidence: 'medium',
        sourceIds: ['eef-feedback', 'ies-study-learning'],
        internetSourceIds: ['ies-study-learning-2007'],
        localEvidence: [
            { path: 'src/lib/evidence/reading-quiz-evidence.ts', signal: 'Challenge decisions read independent accuracy, hint dependency and completion.' },
            { path: 'src/lib/evidence/reading-quiz-history.ts', signal: 'Cross-passage reading history separates stored evidence from raw child answers.' },
            { path: 'src/lib/evidence/learning-evidence.ts', signal: 'Topic challenge fit uses local sample size and reliability.' },
        ],
        operationalRule: 'Increase challenge only after independent success and low hint dependency.',
        caveat: 'Adaptive decisions are recommendations, not proof of learner acceleration.',
    },
    {
        wikiId: 'lm-12',
        status: 'local_practice',
        confidence: 'medium',
        sourceIds: ['unicef-ai-children'],
        internetSourceIds: ['unicef-ai-children-v3'],
        localEvidence: [
            { path: 'AGENTS.md', signal: 'Agent rules require gates before deploy and forbid overclaiming.' },
            { path: 'docs/dev-handoff/AGENTS.md', signal: 'Agent handoff requires source-of-truth reading and safety checks.' },
        ],
        operationalRule: 'Use agent orchestration principles as operator workflow only; do not create autonomous self-editing agents.',
        caveat: 'No external product named here is treated as verified unless an official source is added.',
    },
];

const internetSourceLookup = new Map(INTERNET_EVIDENCE_SOURCES.map((source) => [source.id, source]));
const wikiEvidenceLookup = new Map(WIKI_EVIDENCE_LEDGER.map((record) => [record.wikiId, record]));

export function getWikiEvidenceRecord(wikiId: string): WikiEvidenceRecord | undefined {
    return wikiEvidenceLookup.get(wikiId);
}

export function getInternetEvidenceSource(id: string): InternetEvidenceSource | undefined {
    return internetSourceLookup.get(id);
}

export function getResolvedLearningSources(sourceIds: SourceId[]) {
    return sourceIds.map((sourceId) => LEARNING_SOURCES[sourceId]).filter(Boolean);
}

export function evidenceStatusLabel(status: EvidenceClaimStatus) {
    switch (status) {
        case 'source_backed':
            return 'Nguồn ngoài đã xác minh';
        case 'source_backed_localized':
            return 'Nguồn ngoài + evidence nội bộ';
        case 'local_practice':
            return 'Kinh nghiệm nội bộ có đường dẫn';
        case 'needs_local_measurement':
            return 'Cần đo thêm trong app';
        case 'needs_review':
            return 'Cần rà soát trước khi claim';
    }
}

export const EVIDENCE_SOURCE_LEDGER_STATS = {
    internetSourceCount: INTERNET_EVIDENCE_SOURCES.length,
    wikiRecordCount: WIKI_EVIDENCE_LEDGER.length,
    sourceBackedCount: WIKI_EVIDENCE_LEDGER.filter((record) =>
        record.status === 'source_backed' || record.status === 'source_backed_localized'
    ).length,
    needsReviewCount: WIKI_EVIDENCE_LEDGER.filter((record) =>
        record.status === 'needs_review' || record.status === 'needs_local_measurement'
    ).length,
    localEvidenceRefCount: WIKI_EVIDENCE_LEDGER.reduce((sum, record) => sum + record.localEvidence.length, 0),
};
