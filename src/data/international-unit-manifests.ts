import {
  AUSTRALIAN_UNITS,
  CAMBRIDGE_UNITS,
  CANADIAN_UNITS,
  FINNISH_UNITS,
  SINGAPORE_UNITS,
  US_WONDERS_UNITS,
  type CountryUnit,
} from './english-international';
import { getFrameworkSourcePlan, type InternationalFrameworkKey } from './international-curriculum-source-registry';

export interface GeneratedUnitSection {
  sectionTitle: string;
  sectionTitleVi: string;
  text: string;
  textVi: string;
  type: 'getting_started' | 'reading' | 'word_work' | 'comprehension' | 'talk_about' | 'writing' | 'review';
  skillRefs: string[];
  sourceIds: string[];
}

export interface GeneratedAssessmentItem {
  type: 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'writing' | 'phonics' | 'sight_words';
  question: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
  hints: string[];
}

export interface GeneratedUnitManifest {
  unit: CountryUnit;
  framework: InternationalFrameworkKey;
  sourceIds: string[];
  completionEvidence: string[];
  sections: GeneratedUnitSection[];
  assessmentItems: GeneratedAssessmentItem[];
}

const FRAMEWORK_BY_PREFIX: Record<string, InternationalFrameworkKey> = {
  cam: 'cambridge',
  us: 'common_core',
  au: 'australian',
  fi: 'finnish',
  sg: 'singapore',
  ca: 'canadian',
};

const ALL_UNITS = [
  ...CAMBRIDGE_UNITS,
  ...US_WONDERS_UNITS,
  ...AUSTRALIAN_UNITS,
  ...FINNISH_UNITS,
  ...SINGAPORE_UNITS,
  ...CANADIAN_UNITS,
];

const FRAMEWORK_LABEL: Record<InternationalFrameworkKey, string> = {
  cambridge: 'Cambridge Primary English',
  common_core: 'Common Core ELA',
  australian: 'Australian Curriculum English',
  finnish: 'Finnish National Core Curriculum',
  singapore: 'Singapore English/STELLAR',
  canadian: 'Ontario/Canadian Language Curriculum',
};

const FRAMEWORK_LABEL_VI: Record<InternationalFrameworkKey, string> = {
  cambridge: 'Cambridge Primary English',
  common_core: 'Common Core ELA Hoa Kỳ',
  australian: 'Australian Curriculum English',
  finnish: 'Chương trình lõi quốc gia Phần Lan',
  singapore: 'Tiếng Anh Singapore/STELLAR',
  canadian: 'Chương trình ngôn ngữ Ontario/Canada',
};

function getFrameworkForUnit(unitId: string): InternationalFrameworkKey {
  const prefix = unitId.split('_')[0];
  return FRAMEWORK_BY_PREFIX[prefix] ?? 'cambridge';
}

export function getAllInternationalUnits(): CountryUnit[] {
  return ALL_UNITS;
}

export function getCountryUnitById(unitId: string): CountryUnit | undefined {
  return ALL_UNITS.find(unit => unit.unitId === unitId);
}

function cleanWords(words: string | string[]): string[] {
  const stop = new Set(['and', 'the', 'for', 'with', 'about', 'into', 'from', 'that', 'have', 'what', 'would']);
  const input = Array.isArray(words) ? words : [words];
  return input
    .flatMap(word => word.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/[\s-]+/))
    .filter(word => word.length > 2 && !stop.has(word));
}

function deriveKeywords(unit: CountryUnit): string[] {
  const base = unit.keyVocab && unit.keyVocab.length > 0 ? unit.keyVocab : cleanWords(unit.title);
  const keywords = [...new Set(base.map(word => word.toLowerCase()))].slice(0, 8);
  while (keywords.length < 6) {
    keywords.push(['read', 'talk', 'write', 'explain', 'review', 'connect'][keywords.length]);
  }
  return keywords;
}

function unitGenre(unit: CountryUnit): string {
  const title = unit.title.toLowerCase();
  if (/rhyme|poem|poems|song/.test(title)) return 'poetry and rhythm';
  if (/story|stories|myth|legend|make-believe|happened|tale/.test(title)) return 'story reading';
  if (/instruction|how to|making|make|process|how/.test(title)) return 'instructions and explanation';
  if (/views|opinion|argument|debate|persuade/.test(title)) return 'opinion and discussion';
  if (/find out|information|animals|world|space|sea|creatures|weather|body|science/.test(title)) return 'information reading';
  return 'language and communication';
}

function frameworkObjectives(framework: InternationalFrameworkKey, grade: number): string[] {
  if (framework === 'cambridge') return [`CPE-${grade}-Reading`, `CPE-${grade}-Writing`, `CPE-${grade}-SpeakingListening`, `CPE-${grade}-Vocabulary`];
  if (framework === 'common_core') return [`CCSS-ELA-G${grade}-Reading`, `CCSS-ELA-G${grade}-Writing`, `CCSS-ELA-G${grade}-SpeakingListening`, `CCSS-ELA-G${grade}-Language`];
  if (framework === 'australian') return [`ACARA-G${grade}-Language`, `ACARA-G${grade}-Literature`, `ACARA-G${grade}-Literacy`, `ACARA-G${grade}-CreatingTexts`];
  if (framework === 'finnish') return [`FNCC-G${grade}-Interaction`, `FNCC-G${grade}-Multiliteracy`, `FNCC-G${grade}-LearningToLearn`, `FNCC-G${grade}-CulturalCompetence`];
  if (framework === 'singapore') return [`MOE-SG-G${grade}-SharedReading`, `MOE-SG-G${grade}-OralCommunication`, `MOE-SG-G${grade}-WritingProcess`, `MOE-SG-G${grade}-LanguageUse`];
  return [`ONT-LANG-G${grade}-Foundations`, `ONT-LANG-G${grade}-Comprehension`, `ONT-LANG-G${grade}-Composition`, `ONT-LANG-G${grade}-DigitalMedia`];
}

function optionSet(correct: string, wrongs: string[]): string[] {
  return [correct, ...wrongs.filter(wrong => wrong !== correct).slice(0, 3)];
}

function buildCoreText(unit: CountryUnit, framework: InternationalFrameworkKey, keywords: string[], genre: string): { en: string; vi: string } {
  const label = FRAMEWORK_LABEL[framework];
  const labelVi = FRAMEWORK_LABEL_VI[framework];
  const [a, b, c, d] = keywords;
  return {
    en: `This ${label} unit is about "${unit.title}". The main learning path is ${genre}: first notice the topic, then read a short model, talk about the idea, write a small response, and review by retrieval. Key words for this unit include ${a}, ${b}, ${c}, and ${d}. A strong learner does not only remember the words; the learner explains the idea, uses one sentence aloud, writes one clear example, and checks the answer against the source goal.`,
    vi: `Bài học ${labelVi} này có chủ đề "${unit.titleVi}". Trình tự học theo thể loại ${genre}: nhận biết chủ đề → đọc đoạn văn mẫu → thảo luận ý chính → viết phản hồi ngắn → ôn tập bằng phương pháp truy hồi chủ động. Từ vựng trọng tâm gồm: ${a}, ${b}, ${c}, ${d}. Học sinh giỏi không chỉ ghi nhớ từ vựng mà cần giải thích được ý nghĩa, diễn đạt thành câu, viết ví dụ minh họa, và đối chiếu đáp án với mục tiêu bài học.`,
  };
}

function buildSections(unit: CountryUnit, framework: InternationalFrameworkKey, sourceIds: string[]): GeneratedUnitSection[] {
  const keywords = deriveKeywords(unit);
  const genre = unitGenre(unit);
  const objectives = frameworkObjectives(framework, unit.grade);
  const core = buildCoreText(unit, framework, keywords, genre);
  const prefix = `${unit.unitNumber}`;
  const [a, b, c, d, e, f] = keywords;

  return [
    {
      sectionTitle: `${prefix}.1 Source map and goal`,
      sectionTitleVi: `${prefix}.1 Khung chương trình và mục tiêu bài học`,
      type: 'getting_started',
      skillRefs: objectives,
      sourceIds,
      text: `Source benchmark: ${FRAMEWORK_LABEL[framework]}. Unit focus: ${unit.title}. By the end, the learner should understand the topic, use key words, answer text-based questions, speak one idea aloud, and produce a short written response. Learning routine: preview, read, retrieve, explain, apply.`,
      textVi: `Chương trình chuẩn: ${FRAMEWORK_LABEL_VI[framework]}. Chủ đề bài học: ${unit.titleVi}. Kết thúc bài, học sinh cần nắm được chủ đề, sử dụng từ vựng trọng tâm, trả lời câu hỏi dựa trên văn bản, trình bày một ý kiến bằng lời nói, và viết một đoạn phản hồi ngắn. Quy trình học: xem trước → đọc → truy hồi → giải thích → vận dụng.`,
    },
    {
      sectionTitle: `${prefix}.2 Core reading`,
      sectionTitleVi: `${prefix}.2 Bài đọc chính`,
      type: 'reading',
      skillRefs: [objectives[0]],
      sourceIds,
      text: core.en,
      textVi: core.vi,
    },
    {
      sectionTitle: `${prefix}.3 Word study`,
      sectionTitleVi: `${prefix}.3 Luyện từ vựng`,
      type: 'word_work',
      skillRefs: [objectives[3] ?? objectives[0]],
      sourceIds,
      text: `Study these unit words: ${a}, ${b}, ${c}, ${d}, ${e}, ${f}. Say each word, connect it to the unit title, and make one sentence. Word families and meaning links help memory: group similar ideas, draw one picture, and test yourself after a short break.`,
      textVi: `Từ vựng trọng tâm: ${a}, ${b}, ${c}, ${d}, ${e}, ${f}. Đọc to từng từ, liên hệ với chủ đề bài học, rồi đặt câu với mỗi từ. Nhóm các từ cùng nghĩa, vẽ hình minh họa, sau đó tự kiểm tra lại sau vài phút nghỉ để ghi nhớ lâu dài.`,
    },
    {
      sectionTitle: `${prefix}.4 Comprehension`,
      sectionTitleVi: `${prefix}.4 Đọc hiểu`,
      type: 'comprehension',
      skillRefs: [objectives[0]],
      sourceIds,
      text: `Answer with evidence. 1. What is the unit mainly about? 2. Which key word best matches the topic? 3. What is one detail from the reading? 4. How can this idea be used in real life? Good answers point back to the text, not only memory.`,
      textVi: `Trả lời có dẫn chứng: 1. Bài học nói về nội dung gì? 2. Từ vựng nào phù hợp chủ đề nhất? 3. Nêu một chi tiết cụ thể trong bài đọc. 4. Kiến thức này áp dụng vào thực tế ra sao? Câu trả lời tốt phải bám sát văn bản, không chỉ dựa vào trí nhớ.`,
    },
    {
      sectionTitle: `${prefix}.5 Talk and listen`,
      sectionTitleVi: `${prefix}.5 Nói và nghe`,
      type: 'talk_about',
      skillRefs: [objectives[2] ?? objectives[0]],
      sourceIds,
      text: `Talk routine: I notice..., I think..., My evidence is.... Partner routine: listen without interrupting, repeat one idea, then ask one question. This turns the unit into communication practice instead of silent memorising.`,
      textVi: `Khung câu gợi ý: Con nhận thấy..., Con cho rằng..., Dẫn chứng của con là.... Khi nghe bạn nói: lắng nghe trọn vẹn, nhắc lại một ý, rồi đặt một câu hỏi. Phương pháp này rèn kỹ năng giao tiếp thay vì chỉ học thuộc lòng.`,
    },
    {
      sectionTitle: `${prefix}.6 Write or create`,
      sectionTitleVi: `${prefix}.6 Luyện viết`,
      type: 'writing',
      skillRefs: [objectives[1] ?? objectives[0]],
      sourceIds,
      text: `Write three clear sentences about "${unit.title}". Sentence 1 names the topic. Sentence 2 gives one detail. Sentence 3 gives your response or example. Improve it by checking capital letters, full stops, and one stronger word.`,
      textVi: `Viết ba câu mạch lạc về chủ đề "${unit.titleVi}". Câu 1: giới thiệu chủ đề. Câu 2: nêu một chi tiết cụ thể. Câu 3: đưa ra ý kiến hoặc ví dụ của bản thân. Hoàn thiện bài viết bằng cách kiểm tra chữ hoa, dấu chấm câu, và thay thế một từ bằng từ diễn đạt mạnh hơn.`,
    },
    {
      sectionTitle: `${prefix}.7 Review and transfer`,
      sectionTitleVi: `${prefix}.7 Ôn tập và vận dụng`,
      type: 'review',
      skillRefs: objectives,
      sourceIds,
      text: `Review with the evidence-based routine: retrieve without looking, check the source text, explain the idea to someone, space the next review, and use the idea in a new example. Mastery means the learner can read, say, write, and transfer the unit idea.`,
      textVi: `Ôn tập theo phương pháp có dẫn chứng: tự nhớ lại nội dung trước khi mở sách, đối chiếu với văn bản gốc, giải thích cho người khác nghe, lên kế hoạch ôn lần tiếp, và áp dụng kiến thức vào tình huống mới. Đạt chuẩn khi học sinh đọc được, nói được, viết được, và vận dụng được ý chính của bài.`,
    },
  ];
}

function buildAssessment(unit: CountryUnit, framework: InternationalFrameworkKey, sections: GeneratedUnitSection[]): GeneratedAssessmentItem[] {
  const keywords = deriveKeywords(unit);
  const [a, b, c] = keywords;
  const label = FRAMEWORK_LABEL[framework];
  const objective = frameworkObjectives(framework, unit.grade)[0];

  return [
    {
      type: 'reading',
      question: `🎯 What is Unit ${unit.unitNumber}: "${unit.title}" mainly about?`,
      correctAnswer: unit.title,
      options: optionSet(unit.title, ['Random spelling only', 'Unrelated number facts', 'A topic from another unit']),
      explanation: `The source manifest names "${unit.title}" as the unit focus.`,
      hints: ['Look at the unit title.', `Framework: ${label}`],
    },
    {
      type: 'reading',
      question: `📚 Which source framework is this unit mapped to?`,
      correctAnswer: label,
      options: optionSet(label, ['Unmapped worksheet', 'Untitled internet notes', 'No source framework']),
      explanation: `This unit is mapped to ${label} and uses permitted-source/original practice content.`,
      hints: ['Use the country card.', 'Check the evidence gate.'],
    },
    {
      type: 'vocabulary',
      question: `🔤 Which word best belongs to "${unit.title}"?`,
      correctAnswer: a,
      options: optionSet(a, ['triangle', 'volcano', 'airport']),
      explanation: `"${a}" is one of the unit keywords derived from the title or unit vocabulary.`,
      hints: ['Think about the topic words.', `Unit title: ${unit.title}`],
    },
    {
      type: 'vocabulary',
      question: `🧩 Which pair should you connect while studying this unit?`,
      correctAnswer: `${a} — ${b}`,
      options: optionSet(`${a} — ${b}`, ['moon — spoon', 'red — bicycle', 'quiet — mountain']),
      explanation: `The unit word-study section asks learners to connect key words such as ${a} and ${b}.`,
      hints: ['Look for words in the same unit.', 'Grouping words helps memory.'],
    },
    {
      type: 'reading',
      question: `📖 What should a good answer use in the comprehension section?`,
      correctAnswer: 'Evidence from the text',
      options: optionSet('Evidence from the text', ['Only a guess', 'Only a drawing', 'Only the longest option']),
      explanation: 'The comprehension section requires text-based evidence, not guessing.',
      hints: ['Re-read the passage.', 'Point to the sentence that helps you answer.'],
    },
    {
      type: 'listening',
      question: '👂 What is the best partner-listening move?',
      correctAnswer: 'Listen, repeat one idea, then ask one question',
      options: optionSet('Listen, repeat one idea, then ask one question', ['Interrupt quickly', 'Ignore the speaker', 'Only copy silently']),
      explanation: 'The talk-and-listen routine builds real oral communication.',
      hints: ['Good speaking needs good listening.', 'Repeat then ask.'],
    },
    {
      type: 'writing',
      question: `✍️ What is the writing task for "${unit.title}"?`,
      correctAnswer: 'Write three clear sentences about the unit topic',
      options: optionSet('Write three clear sentences about the unit topic', ['Write unrelated words', 'Skip writing', 'Only choose a color']),
      explanation: 'The writing section asks for topic sentence, detail, and personal response/example.',
      hints: ['Sentence 1 names the topic.', 'Sentence 2 gives a detail.'],
    },
    {
      type: 'reading',
      question: '🧠 Which review routine is strongest for long-term learning?',
      correctAnswer: 'Retrieve, check, explain, space, transfer',
      options: optionSet('Retrieve, check, explain, space, transfer', ['Read once and stop', 'Guess without checking', 'Copy without thinking']),
      explanation: 'The review section uses retrieval practice, feedback, explanation, spaced review, and transfer.',
      hints: ['Recall before looking.', 'Use the idea in a new example.'],
    },
    {
      type: 'reading',
      question: `✅ Which section comes first in the manifest for Unit ${unit.unitNumber}?`,
      correctAnswer: sections[0].sectionTitle,
      options: optionSet(sections[0].sectionTitle, [sections[2].sectionTitle, sections[4].sectionTitle, sections[6].sectionTitle]),
      explanation: 'Every generated unit starts by mapping the source and goal before reading or practice.',
      hints: ['Begin with the source map.', 'The first section sets the target.'],
    },
    {
      type: 'reading',
      question: `📖 Which section is the core reading section?`,
      correctAnswer: sections[1].sectionTitle,
      options: optionSet(sections[1].sectionTitle, [sections[0].sectionTitle, sections[5].sectionTitle, sections[6].sectionTitle]),
      explanation: 'The core reading section provides the original model text for the unit.',
      hints: ['Look for reading.', 'It follows the source map.'],
    },
    {
      type: 'phonics',
      question: `🔎 In this unit, what should the learner do with the word "${c}"?`,
      correctAnswer: 'Say it, connect it to the topic, and use it in a sentence',
      options: optionSet('Say it, connect it to the topic, and use it in a sentence', ['Delete it from the unit', 'Ignore its meaning', 'Only count its letters']),
      explanation: 'Word study is active: say, connect, use, and review.',
      hints: ['Vocabulary needs use.', 'Make one sentence.'],
    },
    {
      type: 'grammar',
      question: '📝 What should the learner check after writing?',
      correctAnswer: 'Capital letters, full stops, and one stronger word',
      options: optionSet('Capital letters, full stops, and one stronger word', ['Only the page color', 'Only the button size', 'Nothing at all']),
      explanation: 'The writing section includes a concrete revision checklist.',
      hints: ['Check mechanics.', 'Improve one word.'],
    },
    {
      type: 'reading',
      question: `🌉 What does transfer mean after learning "${unit.title}"?`,
      correctAnswer: 'Use the unit idea in a new example',
      options: optionSet('Use the unit idea in a new example', ['Forget the unit', 'Only repeat the title', 'Avoid explaining']),
      explanation: 'Transfer shows the learner can apply the idea beyond the first example.',
      hints: ['Try a new situation.', 'Explain it in your own words.'],
    },
    {
      type: 'reading',
      question: `🏷️ Which objective tag family is attached to this unit?`,
      correctAnswer: objective,
      options: optionSet(objective, ['No-objective', 'Unmapped-freeplay', 'Unknown-standard']),
      explanation: `The generated manifest links the unit to objective family ${objective}.`,
      hints: ['Check the framework source.', 'Objective tags keep the unit auditable.'],
    },
    {
      type: 'listening',
      question: '🗣️ Which sentence frame helps the learner explain evidence?',
      correctAnswer: 'My evidence is...',
      options: optionSet('My evidence is...', ['I will not answer', 'The page is blue', 'I forgot every word']),
      explanation: 'The talk section uses evidence frames: I notice, I think, My evidence is.',
      hints: ['Use a sentence starter.', 'Evidence means proof from the text.'],
    },
    {
      type: 'reading',
      question: `🏁 What counts as mastery for Unit ${unit.unitNumber}?`,
      correctAnswer: 'Read, say, write, and transfer the unit idea',
      options: optionSet('Read, say, write, and transfer the unit idea', ['Only tap random answers', 'Only see the title', 'Only finish one flashcard']),
      explanation: 'The review section defines mastery across reading, speaking, writing, and transfer.',
      hints: ['Mastery uses multiple skills.', 'Can the learner use the idea elsewhere?'],
    },
  ];
}

export function getGeneratedUnitManifest(unitId: string): GeneratedUnitManifest | null {
  const unit = getCountryUnitById(unitId);
  if (!unit) return null;

  const framework = getFrameworkForUnit(unit.unitId);
  const sourcePlan = getFrameworkSourcePlan(framework);
  const sourceIds = [
    ...sourcePlan.benchmarkSources.map(source => source.id),
    ...sourcePlan.textSources.map(source => source.id),
    ...sourcePlan.practiceSources.map(source => source.id),
  ];
  const sections = buildSections(unit, framework, sourceIds);

  return {
    unit,
    framework,
    sourceIds,
    sections,
    assessmentItems: buildAssessment(unit, framework, sections),
    completionEvidence: [
      'official-framework-source-registered',
      'permitted-public-domain-or-original-text-policy',
      'seven-part-lesson-sequence',
      'sixteen-item-assessment-bank',
      'retrieval-spaced-transfer-learning-routine',
    ],
  };
}

export function getGeneratedUnitSections(unitId: string): GeneratedUnitSection[] {
  return getGeneratedUnitManifest(unitId)?.sections ?? [];
}

export function getGeneratedUnitAssessmentItems(unitId: string): GeneratedAssessmentItem[] {
  return getGeneratedUnitManifest(unitId)?.assessmentItems ?? [];
}
