import type { InternationalFrameworkKey } from './international-curriculum-coverage';
export type { InternationalFrameworkKey } from './international-curriculum-coverage';

export type SourceUse =
  | 'official-standard'
  | 'public-domain-text'
  | 'open-education-practice'
  | 'learning-science';

export interface CurriculumSource {
  id: string;
  title: string;
  publisher: string;
  url: string;
  use: SourceUse;
  allowedUse: string;
  appUse: string;
}

export interface FrameworkSourcePlan {
  framework: InternationalFrameworkKey;
  benchmarkSources: CurriculumSource[];
  textSources: CurriculumSource[];
  practiceSources: CurriculumSource[];
  completionRule: string;
}

export const LEARNING_SCIENCE_SOURCES: CurriculumSource[] = [
  {
    id: 'ies-foundational-reading-k3',
    title: 'Foundational Skills to Support Reading for Understanding in Kindergarten Through 3rd Grade',
    publisher: 'Institute of Education Sciences / What Works Clearinghouse',
    url: 'https://ies.ed.gov/ncee/wwc/Docs/PracticeGuide/wwc_foundationalreading_040717.pdf',
    use: 'learning-science',
    allowedUse: 'Use as research guidance; do not copy long report text into lessons.',
    appUse: 'Map early reading practice to phonological awareness, decoding, fluency, vocabulary, and comprehension checks.',
  },
  {
    id: 'ies-effective-writers',
    title: 'Teaching Elementary School Students to Be Effective Writers',
    publisher: 'Institute of Education Sciences / What Works Clearinghouse',
    url: 'https://ies.ed.gov/ncee/wwc/PracticeGuide/17',
    use: 'learning-science',
    allowedUse: 'Use recommendations and implementation patterns with attribution.',
    appUse: 'Turn writing units into plan, draft, revise, sentence-construction, and daily short-writing routines.',
  },
  {
    id: 'eef-literacy-ks1',
    title: 'Improving Literacy in Key Stage 1',
    publisher: 'Education Endowment Foundation',
    url: 'https://educationendowmentfoundation.org.uk/education-evidence/guidance-reports/literacy-ks-1',
    use: 'learning-science',
    allowedUse: 'Use recommendations and classroom strategy patterns with attribution.',
    appUse: 'Strengthen speaking/listening, vocabulary, phonics, fluency, comprehension, and writing sequence for young learners.',
  },
  {
    id: 'learning-scientists-six-strategies',
    title: 'Six Strategies for Effective Learning',
    publisher: 'The Learning Scientists',
    url: 'https://www.learningscientists.org/blog/2016/8/18-1',
    use: 'learning-science',
    allowedUse: 'Use strategy names and transformed implementation patterns with attribution.',
    appUse: 'Add retrieval practice, spacing, interleaving, elaboration, concrete examples, and dual coding to review sessions.',
  },
];

export const PUBLIC_DOMAIN_TEXT_SOURCES: CurriculumSource[] = [
  {
    id: 'gutenberg-mother-goose-baum',
    title: 'Mother Goose in Prose',
    publisher: 'Project Gutenberg',
    url: 'https://www.gutenberg.org/ebooks/21150',
    use: 'public-domain-text',
    allowedUse: 'Public domain in the USA according to Project Gutenberg metadata.',
    appUse: 'Use as an auditable nursery-rhyme source for rhyme, rhythm, and retelling units.',
  },
  {
    id: 'gutenberg-mother-goose-greenaway',
    title: 'Mother Goose, or the Old Nursery Rhymes',
    publisher: 'Project Gutenberg / The Online Books Page',
    url: 'https://onlinebooks.library.upenn.edu/webbin/gutbook/lookup?num=23794',
    use: 'public-domain-text',
    allowedUse: 'Public-domain Project Gutenberg text; verify local jurisdiction before bundling.',
    appUse: 'Use traditional rhymes as source texts for early Cambridge poetry/rhyme units.',
  },
  {
    id: 'smithsonian-mother-goose-elliott',
    title: "Mother Goose's Nursery Rhymes and Nursery Songs",
    publisher: 'Smithsonian Libraries and Archives',
    url: 'https://library.si.edu/digital-library/book/mothergoosesnur00elli',
    use: 'public-domain-text',
    allowedUse: 'Smithsonian page marks the content public domain.',
    appUse: 'Use as an additional public-domain rhyme source and image provenance reference.',
  },
];

export const FRAMEWORK_SOURCE_PLANS: Record<InternationalFrameworkKey, FrameworkSourcePlan> = {
  cambridge: {
    framework: 'cambridge',
    benchmarkSources: [
      {
        id: 'cambridge-primary-english-0058',
        title: 'Cambridge Primary English (0058)',
        publisher: 'Cambridge International Education',
        url: 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/english',
        use: 'official-standard',
        allowedUse: 'Use public curriculum framework and learning-objective structure for mapping; do not copy proprietary learner book pages.',
        appUse: 'Benchmark strand coverage: Reading, Writing, Speaking and Listening, poetry, fiction, non-fiction, phonics, grammar.',
      },
    ],
    textSources: PUBLIC_DOMAIN_TEXT_SOURCES,
    practiceSources: LEARNING_SCIENCE_SOURCES,
    completionRule: 'Each Cambridge unit needs a source manifest with expected sections, objective tags, permitted text provenance, original practice items, and a rendered route check.',
  },
  common_core: {
    framework: 'common_core',
    benchmarkSources: [
      {
        id: 'ccss-ela-k5',
        title: 'English Language Arts Standards',
        publisher: 'Common Core State Standards Initiative',
        url: 'https://corestandards.org/english-language-arts-standards/',
        use: 'official-standard',
        allowedUse: 'Use public standards for alignment; generate original passages and questions unless source text is open licensed.',
        appUse: 'Map reading literature/informational text, foundational skills, writing, speaking/listening, and language standards K-5.',
      },
    ],
    textSources: PUBLIC_DOMAIN_TEXT_SOURCES,
    practiceSources: LEARNING_SCIENCE_SOURCES,
    completionRule: 'Each Common Core unit needs a manifest mapping grade-level CCSS codes to open/sourceable texts or original passages with standards-aligned questions.',
  },
  australian: {
    framework: 'australian',
    benchmarkSources: [
      {
        id: 'acara-english-v9',
        title: 'Australian Curriculum Version 9.0: English',
        publisher: 'Australian Curriculum, Assessment and Reporting Authority',
        url: 'https://www.australiancurriculum.edu.au/curriculum-information/understand-this-learning-area/english',
        use: 'official-standard',
        allowedUse: 'Use public curriculum structure, content descriptions, and achievement-standard framing with attribution.',
        appUse: 'Map Language, Literature, and Literacy strands across F-6, then generate original unit activities.',
      },
    ],
    textSources: PUBLIC_DOMAIN_TEXT_SOURCES,
    practiceSources: LEARNING_SCIENCE_SOURCES,
    completionRule: 'Each Australian unit needs a manifest citing ACARA strand/content-description coverage before all required year-level elements are called complete.',
  },
  finnish: {
    framework: 'finnish',
    benchmarkSources: [
      {
        id: 'oph-basic-education-core',
        title: 'National core curriculum for primary and lower secondary education',
        publisher: 'Finnish National Agency for Education',
        url: 'https://www.oph.fi/en/education-and-qualifications/national-core-curriculum-primary-and-lower-secondary-basic-education',
        use: 'official-standard',
        allowedUse: 'Use official curriculum principles and subject/objective structure; local curricula vary and must be labelled as such.',
        appUse: 'Map transversal competences, multilingual communication, cultural competence, and language-learning routines.',
      },
      {
        id: 'oph-a1-language-grades-1-2',
        title: 'A1 language in grades 1-2 amendments',
        publisher: 'Finnish National Agency for Education',
        url: 'https://verkkokauppa.oph.fi/sivu/tuote/amendments-and-additions-to-the-national-core-curriculum-for-basic-education-2014-regarding-the-instruction-of-the-a1-language-in-grades-1-2/2693563',
        use: 'official-standard',
        allowedUse: 'Use bibliographic metadata and objective categories; full paid publication must not be reproduced.',
        appUse: 'Keep early language units playful, oral, differentiated, and goal-setting based.',
      },
    ],
    textSources: PUBLIC_DOMAIN_TEXT_SOURCES,
    practiceSources: LEARNING_SCIENCE_SOURCES,
    completionRule: 'Each Finnish unit needs a manifest distinguishing national core objectives from local curriculum choices and transversal-competence evidence.',
  },
  singapore: {
    framework: 'singapore',
    benchmarkSources: [
      {
        id: 'moe-singapore-primary-syllabus',
        title: 'Primary school subjects and syllabuses',
        publisher: 'Singapore Ministry of Education',
        url: 'https://www.moe.gov.sg/primary/curriculum/syllabus',
        use: 'official-standard',
        allowedUse: 'Use syllabus listing and public framing for alignment; do not copy non-open textbooks or school packs.',
        appUse: 'Map English Language syllabus, STELLAR shared reading/oral/writing process, and grade bands.',
      },
    ],
    textSources: PUBLIC_DOMAIN_TEXT_SOURCES,
    practiceSources: LEARNING_SCIENCE_SOURCES,
    completionRule: 'Each Singapore unit needs a syllabus-code or STELLAR activity manifest plus original/open text and explicit shared-reading/oral-writing workflow.',
  },
  canadian: {
    framework: 'canadian',
    benchmarkSources: [
      {
        id: 'ontario-language-2023',
        title: 'The Ontario Curriculum, Grades 1-8: Language, 2023',
        publisher: 'Ontario Ministry of Education',
        url: 'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-language/grades-list',
        use: 'official-standard',
        allowedUse: 'Use public curriculum expectations; Canada is province-specific, so this is an Ontario lane unless another province is selected.',
        appUse: 'Map literacy connections, foundations, comprehension, composition, and media/digital literacy expectations.',
      },
    ],
    textSources: PUBLIC_DOMAIN_TEXT_SOURCES,
    practiceSources: LEARNING_SCIENCE_SOURCES,
    completionRule: 'Each Canadian unit needs a manifest naming the province/territory source; do not present Ontario coverage as all-Canada coverage.',
  },
};

export function getFrameworkSourcePlan(framework: InternationalFrameworkKey): FrameworkSourcePlan {
  return FRAMEWORK_SOURCE_PLANS[framework];
}
