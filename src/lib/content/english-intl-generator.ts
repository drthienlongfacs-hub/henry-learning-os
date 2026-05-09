// ═══════════════════════════════════════════════════════════
// International English Exercise Generator
// Phonics, Grammar, Reading Comprehension, Sight Words
// Cambridge + US Common Core + Australian Curriculum
// ═══════════════════════════════════════════════════════════

import {
  PHONICS_LEVELS, GRAMMAR_TOPICS, READING_PASSAGES, SIGHT_WORDS,
  type PhonicsLevel, type GrammarTopic, type ReadingPassage,
} from '@/data/english-international';
import type { EnglishProblem } from './english-generator';

const rand = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = <T>(arr: T[]): T => arr[rand(0, arr.length - 1)];
const shuffle = <T>(arr: T[]): T[] => {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = rand(0, i);[a[i], a[j]] = [a[j], a[i]]; } return a;
};
const genId = () => `en-intl-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// ── SAFETY: Guarantee correctAnswer always exists in options ──
function ensureCorrectInOptions(correct: string, opts: string[]): string[] {
  // Remove correct from wrongs, deduplicate
  const wrongs = [...new Set(opts.filter(o => o !== correct))];
  // Take exactly 3 wrongs
  while (wrongs.length < 3) wrongs.push(`${correct}?`);
  const final3 = wrongs.slice(0, 3);
  // Correct + 3 wrongs, shuffled
  return shuffle([correct, ...final3]);
}

// ── 1. Phonics: Letter Sound Recognition ──
function genPhonicsLetterSound(level: PhonicsLevel): EnglishProblem {
  if (level.letters.length === 0 && level.digraphs) {
    // Digraph/blend recognition
    const target = pick(level.digraphs);
    // FIX: word MUST contain the target digraph — if not found, pick another target that has a matching word
    let word = level.decodableWords.find(w => w.startsWith(target));
    let actualTarget = target;
    if (!word) {
      // Try to find any digraph that has a matching decodable word
      for (const dg of shuffle(level.digraphs)) {
        const match = level.decodableWords.find(w => w.startsWith(dg));
        if (match) { word = match; actualTarget = dg; break; }
      }
    }
    if (!word) { word = pick(level.decodableWords); actualTarget = word.slice(0, 2); }
    const wrongs = shuffle(level.digraphs.filter(d => d !== actualTarget)).slice(0, 3);
    return {
      id: genId(), gradeLevel: level.grade, difficulty: level.grade,
      type: 'phonics',
      topic: level.title,
      topicKey: level.levelId,
      question: `Which sound do you hear at the start of "${word}"?`,
      correctAnswer: actualTarget,
      options: ensureCorrectInOptions(actualTarget, [actualTarget, ...wrongs]),
      explanation: `"${word}" starts with the sound "${actualTarget}".`,
      hints: [`Listen: ${word}`, `The sound is: ${actualTarget}`],
    };
  }
  // FIX: Pick a letter that actually has a matching decodable word
  const lettersWithWords = (level.letters.length > 0 ? level.letters : ['a']).filter(
    l => level.decodableWords.some(w => w.startsWith(l))
  );
  const letter = lettersWithWords.length > 0 ? pick(lettersWithWords) : pick(level.letters.length > 0 ? level.letters : ['a']);
  const word = level.decodableWords.find(w => w.startsWith(letter))!;
  // If still no match (shouldn't happen), derive letter from actual word
  const actualLetter = word ? letter : level.decodableWords[0][0];
  const actualWord = word || level.decodableWords[0];
  const wrongs = shuffle(
    (level.letters.length > 0 ? level.letters : 'abcdefghijklm'.split('')).filter(l => l !== actualLetter)
  ).slice(0, 3);
  return {
    id: genId(), gradeLevel: level.grade, difficulty: level.grade,
    type: 'phonics',
    topic: level.title,
    topicKey: level.levelId,
    question: `🔤 What letter does "${actualWord}" start with?`,
    correctAnswer: actualLetter.toUpperCase(),
    options: ensureCorrectInOptions(actualLetter.toUpperCase(), [actualLetter.toUpperCase(), ...wrongs.map(w => w.toUpperCase())]),
    explanation: `"${actualWord}" starts with the letter "${actualLetter.toUpperCase()}".`,
    hints: [`Say the word: ${actualWord}`, `First sound: /${actualLetter}/`],
  };
}

// ── 2. Phonics: Sight Word Flash ──
function genSightWordFlash(level: PhonicsLevel): EnglishProblem {
  const word = pick(level.sightWords);
  const scrambled = shuffle(word.split('')).join('');
  const wrongs = shuffle(level.sightWords.filter(w => w !== word)).slice(0, 3);
  return {
    id: genId(), gradeLevel: level.grade, difficulty: level.grade,
    type: 'sight_words',
    topic: level.title,
    topicKey: level.levelId,
    question: `🔍 Unscramble: "${scrambled}" — Which word is it?`,
    correctAnswer: word,
    options: shuffle([word, ...wrongs]),
    explanation: `The word is "${word}". It's a sight word you should know by heart!`,
    hints: [`It has ${word.length} letters`, `Starts with "${word[0]}"`],
  };
}

// ── 3. Phonics: CVC / Decodable Word Build ──
function genDecodableWord(level: PhonicsLevel): EnglishProblem {
  const word = pick(level.decodableWords);
  const missing = rand(0, word.length - 1);
  const blank = word.slice(0, missing) + '_' + word.slice(missing + 1);
  const correctLetter = word[missing];
  const wrongLetters = shuffle('abcdefghijklmnopqrstuvwxyz'.split('').filter(l => l !== correctLetter)).slice(0, 3);
  return {
    id: genId(), gradeLevel: level.grade, difficulty: level.grade,
    type: 'phonics',
    topic: level.title,
    topicKey: level.levelId,
    question: `Fill in the missing letter: "${blank}"`,
    correctAnswer: correctLetter,
    options: shuffle([correctLetter, ...wrongLetters]),
    explanation: `The word is "${word}". The missing letter is "${correctLetter}".`,
    hints: [`Sound it out: ${word}`, `Missing: ${correctLetter}`],
  };
}

// ── 4. Grammar: Rule Application ──
function genGrammarRule(topic: GrammarTopic): EnglishProblem {
  const rule = pick(topic.rules);
  const idx = rand(0, rule.examples.length - 1);
  const correct = rule.examples[idx];
  const wrongs = shuffle(topic.rules.flatMap(r => r.examples).filter(e => e !== correct)).slice(0, 3);
  if (wrongs.length < 3) {
    wrongs.push(...['incorrect answer', 'wrong option', 'not this one'].slice(0, 3 - wrongs.length));
  }
  return {
    id: genId(), gradeLevel: topic.grade, difficulty: topic.grade,
    type: 'grammar',
    topic: topic.title,
    topicKey: topic.topicId,
    question: `📝 ${rule.rule}.\nWhich is correct?`,
    correctAnswer: correct,
    options: shuffle([correct, ...wrongs]),
    explanation: `${rule.rule}\n${rule.ruleVi}\nExample: ${correct} = ${rule.examplesVi[idx] || ''}`,
    hints: [`Rule: ${rule.ruleVi}`, `Answer: ${correct}`],
  };
}

// ── 5. Grammar: Error Correction ──
function genGrammarCorrection(topic: GrammarTopic): EnglishProblem {
  const rule = pick(topic.rules);
  const correct = pick(rule.examples);
  // Create intentional error
  const errorVersions: Record<string, string> = {
    'He plays football.': 'He play football.',
    'She watches TV.': 'She watch TV.',
    'Do you like milk?': 'Does you like milk?',
    'I am reading.': 'I reading.',
    'She is cooking.': 'She cooking.',
    'They are playing.': 'They is playing.',
  };
  const errorSentence = errorVersions[correct] || correct.replace(/s\./, '.');
  if (errorSentence === correct) {
    return genGrammarRule(topic); // fallback
  }
  // FIX: Build distinct wrong options, avoid duplicates with correct
  const wrongOpts = [errorSentence];
  const candidate1 = `${correct.slice(0, -1)}?`;
  const candidate2 = correct.charAt(0).toLowerCase() + correct.slice(1);
  if (candidate1 !== correct && !wrongOpts.includes(candidate1)) wrongOpts.push(candidate1);
  if (candidate2 !== correct && !wrongOpts.includes(candidate2)) wrongOpts.push(candidate2);
  if (wrongOpts.length < 3) wrongOpts.push(correct.replace(/\./, '!'));
  return {
    id: genId(), gradeLevel: topic.grade, difficulty: topic.grade,
    type: 'grammar',
    topic: topic.title,
    topicKey: topic.topicId,
    question: `🔧 Find the correct sentence:`,
    correctAnswer: correct,
    options: ensureCorrectInOptions(correct, [correct, ...wrongOpts.slice(0, 3)]),
    explanation: `Correct: "${correct}"\nRule: ${rule.ruleVi}`,
    hints: [`Check the verb form`, `${rule.rule}`],
  };
}

// ── 6. Reading Comprehension ──
function genReadingComprehension(passage: ReadingPassage): EnglishProblem {
  const q = pick(passage.questions);
  return {
    id: genId(), gradeLevel: passage.grade, difficulty: passage.grade,
    type: 'reading',
    topic: passage.title,
    topicKey: passage.passageId,
    question: `📖 Read:\n"${passage.text}"\n\n${q.q}`,
    correctAnswer: q.correct,
    options: shuffle(q.options),
    explanation: `${q.qVi}\nAnswer: ${q.correct}`,
    hints: [`Re-read the passage carefully`, `${q.qVi}`],
  };
}

// ── 7. Sight Words: Speed Challenge ──
function genSightWordChallenge(grade: number): EnglishProblem {
  const words = SIGHT_WORDS[grade] || SIGHT_WORDS[1];
  const target = pick(words);
  const wrongs = shuffle(words.filter(w => w !== target && w.length === target.length)).slice(0, 2);
  // Add a near-miss (one letter different)
  const nearMiss = target.length > 2
    ? target.slice(0, -1) + (target.endsWith('e') ? 'a' : 'e')
    : target + 's';
  // FIX: Ensure we always have 4 unique options including the correct answer
  const allOpts = [target, nearMiss, ...wrongs];
  // Pad if needed
  const moreFiller = shuffle(words.filter(w => w !== target && !allOpts.includes(w))).slice(0, 4);
  allOpts.push(...moreFiller);
  return {
    id: genId(), gradeLevel: grade, difficulty: grade,
    type: 'sight_words',
    topic: `Sight Words Grade ${grade}`,
    topicKey: `sw_g${grade}`,
    question: `⚡ Which one is a real word? (Quick!)`,
    correctAnswer: target,
    options: ensureCorrectInOptions(target, allOpts),
    explanation: `"${target}" is a sight word for Grade ${grade}. Practice reading it fast!`,
    hints: [`Sound it out`, `It's a common word`],
  };
}

// ══════════════════════════════════════
// PUBLIC API
// ══════════════════════════════════════

const PHONICS_GENS = [genPhonicsLetterSound, genSightWordFlash, genDecodableWord];
const GRAMMAR_GENS = [genGrammarRule, genGrammarCorrection];

export function generateInternationalExercises(
  grade: number,
  category?: 'phonics' | 'grammar' | 'reading' | 'sight_words' | 'all',
  count: number = 10
): EnglishProblem[] {
  const cat = category || 'all';
  const exercises: EnglishProblem[] = [];

  for (let i = 0; i < count; i++) {
    const roll = cat === 'all' ? rand(0, 3) : { phonics: 0, grammar: 1, reading: 2, sight_words: 3 }[cat];
    switch (roll) {
      case 0: { // Phonics
        const levels = PHONICS_LEVELS.filter(l => l.grade <= grade);
        if (levels.length > 0) {
          const level = pick(levels);
          exercises.push(pick(PHONICS_GENS)(level));
        }
        break;
      }
      case 1: { // Grammar
        const topics = GRAMMAR_TOPICS.filter(t => t.grade <= grade);
        if (topics.length > 0) {
          exercises.push(pick(GRAMMAR_GENS)(pick(topics)));
        }
        break;
      }
      case 2: { // Reading
        const passages = READING_PASSAGES.filter(p => p.grade <= grade);
        if (passages.length > 0) {
          exercises.push(genReadingComprehension(pick(passages)));
        }
        break;
      }
      case 3: { // Sight Words
        exercises.push(genSightWordChallenge(Math.min(grade, 5)));
        break;
      }
    }
  }
  return exercises;
}

export function generateInternationalTopicExercises(topicKey: string, count: number = 10): EnglishProblem[] {
  if (topicKey.startsWith('ph_')) {
    const level = PHONICS_LEVELS.find(l => l.levelId === topicKey);
    return level ? Array.from({ length: count }, () => pick(PHONICS_GENS)(level)) : [];
  }
  if (topicKey.startsWith('gr_')) {
    const topic = GRAMMAR_TOPICS.find(t => t.topicId === topicKey);
    return topic ? Array.from({ length: count }, () => pick(GRAMMAR_GENS)(topic)) : [];
  }
  if (topicKey.startsWith('rd_')) {
    const passage = READING_PASSAGES.find(p => p.passageId === topicKey);
    return passage ? Array.from({ length: count }, () => genReadingComprehension(passage)) : [];
  }
  if (topicKey.startsWith('sw_g')) {
    const grade = Number(topicKey.replace('sw_g', ''));
    return Number.isFinite(grade) ? Array.from({ length: count }, () => genSightWordChallenge(Math.min(Math.max(grade, 1), 5))) : [];
  }
  // ── Country textbook unit exercises (cam_, us_, au_, fi_, sg_, ca_) ──
  if (/^(cam|us|au|fi|sg|ca)_g\d/.test(topicKey)) {
    return generateCountryUnitExercises(topicKey, count);
  }
  // Writing/Listening/Vocab topic exercises
  if (topicKey.startsWith('wr_') || topicKey.startsWith('ls_') || topicKey.startsWith('vt_') || topicKey.startsWith('cc_')) {
    return generateSkillTopicExercises(topicKey, count);
  }
  return [];
}

// ── Country Unit Exercise Generator ──
import {
  CAMBRIDGE_UNITS, US_WONDERS_UNITS, AUSTRALIAN_UNITS, FINNISH_UNITS,
  SINGAPORE_UNITS, CANADIAN_UNITS, type CountryUnit,
} from '@/data/english-international';
import { getGeneratedUnitAssessmentItems } from '@/data/international-unit-manifests';

const ALL_COUNTRY_UNITS = [
  ...CAMBRIDGE_UNITS, ...US_WONDERS_UNITS, ...AUSTRALIAN_UNITS,
  ...FINNISH_UNITS, ...SINGAPORE_UNITS, ...CANADIAN_UNITS,
];

function generateCountryUnitExercises(topicKey: string, count: number): EnglishProblem[] {
  const benchmarked = getBenchmarkedCountryUnitExercises(topicKey, count);
  if (benchmarked) return benchmarked;

  const sourceManifestExercises = getSourceManifestCountryUnitExercises(topicKey, count);
  if (sourceManifestExercises) return sourceManifestExercises;

  const unit = ALL_COUNTRY_UNITS.find(u => u.unitId === topicKey);
  if (!unit) return [];

  const UNIT_EXERCISE_GENS = [
    genUnitVocabMatch, genUnitTitleTranslation, genUnitSkillIdentify,
    genUnitSentenceBuild, genUnitTopicQuestion,
  ];

  return Array.from({ length: count }, () => pick(UNIT_EXERCISE_GENS)(unit));
}

type BenchmarkedUnitExercise = Omit<EnglishProblem, 'id' | 'gradeLevel' | 'difficulty' | 'topicKey' | 'topic'>;

const CAM_G1_U03_BENCHMARKED_EXERCISES: BenchmarkedUnitExercise[] = [
  {
    type: 'reading',
    question: '🎯 In Unit 3.1, what are rhyming words?',
    correctAnswer: 'Words that sound the same at the end',
    options: [
      'Words that sound the same at the end',
      'Words that start with the same capital letter',
      'Words that mean the same thing',
      'Words that are always numbers',
    ],
    explanation: 'Unit 3.1 explains that rhyming words sound the same at the end, like dock and clock.',
    hints: ['Listen to the end sound.', 'dock and clock both end with -ock.'],
  },
  {
    type: 'phonics',
    question: '📖 Which pair rhymes in "Hickory Dickory Dock"?',
    correctAnswer: 'dock — clock',
    options: ['dock — clock', 'mouse — clock', 'one — down', 'ran — clock'],
    explanation: 'Unit 3.1 uses dock and clock as the first clear rhyming pair.',
    hints: ['Say the words aloud.', 'Both words end with the -ock sound.'],
  },
  {
    type: 'phonics',
    question: '🔤 Which rhyme family contains dock, clock, rock, sock, lock, and knock?',
    correctAnswer: '-ock',
    options: ['-ock', '-at', '-ar', '-oe'],
    explanation: 'The Unit 3 review lists the -ock family: dock, clock, rock, sock, lock, knock.',
    hints: ['Look at the ending letters.', 'They all end with ock.'],
  },
  {
    type: 'reading',
    question: '🔢 In Unit 3.2, which words rhyme in "One, two, buckle my shoe"?',
    correctAnswer: 'two — shoe',
    options: ['two — shoe', 'one — shoe', 'buckle — two', 'my — shoe'],
    explanation: 'Unit 3.2 teaches number rhymes. In this line, two rhymes with shoe.',
    hints: ['Listen to the last words.', 'two and shoe have the same ending sound.'],
  },
  {
    type: 'reading',
    question: '🚪 In Unit 3.2, which pair rhymes with "Three, four, knock at the door"?',
    correctAnswer: 'four — door',
    options: ['four — door', 'three — door', 'knock — door', 'at — door'],
    explanation: 'The number rhyme pairs four with door, exactly as shown in Unit 3.2.',
    hints: ['Say four and door slowly.', 'They share the /or/ ending sound.'],
  },
  {
    type: 'vocabulary',
    question: '🔢 What do number rhymes help us practise in Unit 3.2?',
    correctAnswer: 'Counting and rhyming at the same time',
    options: [
      'Counting and rhyming at the same time',
      'Writing long essays',
      'Learning animal habitats',
      'Only drawing pictures',
    ],
    explanation: 'Unit 3.2 says number rhymes help us count and learn new words at the same time.',
    hints: ['Think about one, two, three, four...', 'The lesson uses numbers with rhyming words.'],
  },
  {
    type: 'reading',
    question: '🌙 In Unit 3.3 "Funny rhymes", what silly event happens?',
    correctAnswer: 'The cow jumped over the moon',
    options: [
      'The cow jumped over the moon',
      'The mouse ran down the clock',
      'The hen picked up sticks',
      'The firefighter read a book',
    ],
    explanation: 'Unit 3.3 uses Hey Diddle Diddle. It is funny because impossible things happen.',
    hints: ['Look for the impossible picture in the rhyme.', 'A cow cannot really jump over the moon.'],
  },
  {
    type: 'phonics',
    question: '🥄 Which rhyming pair is in "Hey Diddle Diddle"?',
    correctAnswer: 'moon — spoon',
    options: ['moon — spoon', 'cat — moon', 'dog — dish', 'cow — fun'],
    explanation: 'Unit 3.3 points out moon and spoon as a rhyming pair.',
    hints: ['Say both words aloud.', 'They share the same /oon/ ending sound.'],
  },
  {
    type: 'reading',
    question: '🤪 What makes a rhyme "silly" in Unit 3.4?',
    correctAnswer: 'It plays with strange or nonsense words to make us laugh',
    options: [
      'It plays with strange or nonsense words to make us laugh',
      'It must be a true story',
      'It only lists numbers',
      'It has no sound pattern',
    ],
    explanation: 'Unit 3.4 says silly rhymes play with words in a nonsense way and make us laugh.',
    hints: ['Think about a purple cow.', 'Silly means funny and strange.'],
  },
  {
    type: 'phonics',
    question: '🍮 In the silly rhyme game, which word rhymes with "jelly"?',
    correctAnswer: 'belly',
    options: ['belly', 'clock', 'moon', 'door'],
    explanation: 'Unit 3.4 gives jelly -> belly as a silly rhyming pair.',
    hints: ['Listen to the ending sound.', 'jelly and belly end the same way.'],
  },
  {
    type: 'reading',
    question: '🔥 What happens in Unit 3.5 "Fire! Fire!"?',
    correctAnswer: 'People see a fire and try to help',
    options: [
      'People see a fire and try to help',
      'A cow jumps over the moon',
      'A mouse runs up a clock',
      'A child makes a paper hat',
    ],
    explanation: 'Unit 3.5 is a narrative rhyme: a fire breaks out and people try to help.',
    hints: ['The title is Fire! Fire!', 'The people call for help and get the hose.'],
  },
  {
    type: 'phonics',
    question: '🔥 Which rhyming pair is named in the "Fire! Fire!" story rhyme?',
    correctAnswer: 'McGuire — Fire',
    options: ['McGuire — Fire', 'Hare — town', 'Brown — corner', 'Rose — Jade'],
    explanation: 'Unit 3.5 asks learners to notice pairs such as McGuire — Fire, Hare — Where, and Brown — town.',
    hints: ['Look at the character name.', 'McGuire has the same ending sound as Fire.'],
  },
  {
    type: 'reading',
    question: '📚 Why is "Fire! Fire!" called a narrative rhyme?',
    correctAnswer: 'It tells a story from beginning to end',
    options: [
      'It tells a story from beginning to end',
      'It only teaches numbers',
      'It is a list of animals',
      'It has no characters',
    ],
    explanation: 'Unit 3.5 explains that a narrative rhyme uses rhyme to tell a story from beginning to end.',
    hints: ['Narrative means story.', 'The fire rhyme has events and characters.'],
  },
  {
    type: 'writing',
    question: '✍️ In Unit 3.6, what is the key step for changing a rhyme?',
    correctAnswer: 'Choose a last word and replace it with a new rhyming word',
    options: [
      'Choose a last word and replace it with a new rhyming word',
      'Remove all the rhyming words',
      'Turn every line into a question',
      'Only copy the original rhyme',
    ],
    explanation: 'Unit 3.6 teaches four steps: pick a rhyme, choose the last word, think of a new rhyming word, then change the line.',
    hints: ['The new word must still rhyme.', 'Change the ending word carefully.'],
  },
  {
    type: 'writing',
    question: '⛰️ Which word can rhyme with "hill" when changing "Jack and Jill went up the hill"?',
    correctAnswer: 'Bill',
    options: ['Bill', 'clock', 'shoe', 'moon'],
    explanation: 'Unit 3.6 suggests words such as Bill, grill, and chill because they rhyme with hill.',
    hints: ['Listen to the /ill/ sound.', 'hill and Bill end the same way.'],
  },
  {
    type: 'reading',
    question: '✅ Which Unit 3 review statement is correct?',
    correctAnswer: 'Rhyming words sound the same at the end',
    options: [
      'Rhyming words sound the same at the end',
      'Funny rhymes must be true',
      'Narrative rhymes never have characters',
      'Changing a rhyme means removing the rhythm',
    ],
    explanation: 'The Unit 3 review confirms the core idea: rhyming words sound the same at the end.',
    hints: ['Think of dock/clock and cat/hat.', 'The end sound matters most.'],
  },
];

function cloneBenchmarkedExercise(topicKey: string, unitTitle: string, unitNumber: number, exercise: BenchmarkedUnitExercise, index: number): EnglishProblem {
  return {
    id: `${topicKey}-bench-${index + 1}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    gradeLevel: 1,
    difficulty: 1,
    topic: `Unit ${unitNumber}: ${unitTitle}`,
    topicKey,
    ...exercise,
    options: exercise.options ? [...exercise.options] : undefined,
    hints: [...exercise.hints],
  };
}

function getBenchmarkedCountryUnitExercises(topicKey: string, count: number): EnglishProblem[] | null {
  if (topicKey !== 'cam_g1_u03') return null;

  const unit = ALL_COUNTRY_UNITS.find(u => u.unitId === topicKey);
  const unitTitle = unit?.title || 'Rhyme time';
  const unitNumber = unit?.unitNumber || 3;
  const limit = Math.max(count, CAM_G1_U03_BENCHMARKED_EXERCISES.length);
  const selected = Array.from({ length: limit }, (_, index) => {
    const exercise = CAM_G1_U03_BENCHMARKED_EXERCISES[index % CAM_G1_U03_BENCHMARKED_EXERCISES.length];
    return cloneBenchmarkedExercise(topicKey, unitTitle, unitNumber, exercise, index);
  });

  return selected;
}

function getSourceManifestCountryUnitExercises(topicKey: string, count: number): EnglishProblem[] | null {
  const unit = ALL_COUNTRY_UNITS.find(u => u.unitId === topicKey);
  if (!unit) return null;

  const items = getGeneratedUnitAssessmentItems(topicKey);
  if (items.length === 0) return null;

  const limit = Math.max(count, items.length);
  return Array.from({ length: limit }, (_, index) => {
    const item = items[index % items.length];
    return {
      id: `${topicKey}-manifest-${index + 1}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      gradeLevel: unit.grade,
      difficulty: unit.grade,
      topic: `Unit ${unit.unitNumber}: ${unit.title}`,
      topicKey,
      ...item,
      options: [...item.options],
      hints: [...item.hints],
    };
  });
}

function genUnitVocabMatch(unit: CountryUnit): EnglishProblem {
  const vocab = unit.keyVocab || extractVocabFromTitle(unit.title);
  const target = pick(vocab);
  const allVocab = ALL_COUNTRY_UNITS
    .filter(u => u.grade === unit.grade && u.unitId !== unit.unitId)
    .flatMap(u => u.keyVocab || extractVocabFromTitle(u.title));
  const wrongs = shuffle(allVocab.filter(w => w !== target)).slice(0, 3);
  return {
    id: genId(), gradeLevel: unit.grade, difficulty: unit.grade,
    type: 'vocabulary',
    topic: `Unit ${unit.unitNumber}: ${unit.title}`,
    topicKey: unit.unitId,
    question: `📚 Which word belongs to the topic "${unit.title}"?`,
    correctAnswer: target,
    options: ensureCorrectInOptions(target, [target, ...wrongs]),
    explanation: `"${target}" is a key word in Unit ${unit.unitNumber}: ${unit.title} (${unit.titleVi}).`,
    hints: [`This unit is about: ${unit.titleVi}`, `Think about: ${unit.title}`],
  };
}

function genUnitTitleTranslation(unit: CountryUnit): EnglishProblem {
  const others = ALL_COUNTRY_UNITS
    .filter(u => u.grade === unit.grade && u.unitId !== unit.unitId)
    .map(u => u.titleVi);
  const wrongs = shuffle(others).slice(0, 3);
  return {
    id: genId(), gradeLevel: unit.grade, difficulty: unit.grade,
    type: 'vocabulary',
    topic: `Unit ${unit.unitNumber}: ${unit.title}`,
    topicKey: unit.unitId,
    question: `🌍 "${unit.title}" means:`,
    correctAnswer: unit.titleVi,
    options: ensureCorrectInOptions(unit.titleVi, [unit.titleVi, ...wrongs]),
    explanation: `"${unit.title}" = "${unit.titleVi}"`,
    hints: [`Think about: ${unit.title}`, `It's Unit ${unit.unitNumber}`],
  };
}

function genUnitSkillIdentify(unit: CountryUnit): EnglishProblem {
  const skills = unit.skills || ['Reading', 'Writing', 'Speaking', 'Listening'];
  const skill = pick(skills);
  const allSkills = ['Reading', 'Writing', 'Speaking', 'Listening', 'Phonics', 'Grammar', 'Vocabulary', 'Culture'];
  const wrongs = shuffle(allSkills.filter(s => s !== skill)).slice(0, 3);
  return {
    id: genId(), gradeLevel: unit.grade, difficulty: unit.grade,
    type: 'grammar',
    topic: `Unit ${unit.unitNumber}: ${unit.title}`,
    topicKey: unit.unitId,
    question: `🎯 Unit "${unit.title}" focuses on which skill?`,
    correctAnswer: skill,
    options: ensureCorrectInOptions(skill, [skill, ...wrongs]),
    explanation: `This unit practices: ${skills.join(', ')}`,
    hints: [`Think about what you do in "${unit.title}"`],
  };
}

function genUnitSentenceBuild(unit: CountryUnit): EnglishProblem {
  const patterns = unit.sentencePatterns || getSentencePatternsForGrade(unit.grade);
  const pattern = pick(patterns);
  const others = ALL_COUNTRY_UNITS
    .filter(u => u.unitId !== unit.unitId)
    .flatMap(u => u.sentencePatterns || getSentencePatternsForGrade(u.grade));
  const wrongs = shuffle(others.filter(p => p !== pattern)).slice(0, 3);
  return {
    id: genId(), gradeLevel: unit.grade, difficulty: unit.grade,
    type: 'grammar',
    topic: `Unit ${unit.unitNumber}: ${unit.title}`,
    topicKey: unit.unitId,
    question: `✍️ Which sentence pattern fits "${unit.title}"?`,
    correctAnswer: pattern,
    options: ensureCorrectInOptions(pattern, [pattern, ...wrongs]),
    explanation: `Pattern: "${pattern}" — used in Unit ${unit.unitNumber}: ${unit.title}`,
    hints: [`Topic: ${unit.titleVi}`],
  };
}

function genUnitTopicQuestion(unit: CountryUnit): EnglishProblem {
  const correct = unit.title;
  const others = ALL_COUNTRY_UNITS
    .filter(u => u.grade === unit.grade && u.unitId !== unit.unitId)
    .map(u => u.title);
  const wrongs = shuffle(others).slice(0, 3);
  return {
    id: genId(), gradeLevel: unit.grade, difficulty: unit.grade,
    type: 'reading',
    topic: `Unit ${unit.unitNumber}: ${unit.title}`,
    topicKey: unit.unitId,
    question: `📖 Which unit topic matches: "${unit.titleVi}"?`,
    correctAnswer: correct,
    options: ensureCorrectInOptions(correct, [correct, ...wrongs]),
    explanation: `"${unit.titleVi}" = "${unit.title}" (Unit ${unit.unitNumber})`,
    hints: [`Think about the English translation`],
  };
}

// Skill topic exercises (writing, listening, vocab, culture)
function generateSkillTopicExercises(topicKey: string, count: number): EnglishProblem[] {
  const wt = WRITING_TOPICS.find(w => w.topicId === topicKey);
  if (wt) return Array.from({ length: count }, () => ({
    id: genId(), gradeLevel: wt.grade, difficulty: wt.grade, type: 'writing',
    topic: wt.title, topicKey: wt.topicId,
    question: `✍️ Writing: ${wt.title}\n${wt.titleVi}\n\nWhich is the best approach?`,
    correctAnswer: 'Plan before writing',
    options: ensureCorrectInOptions('Plan before writing', ['Plan before writing', 'Write without thinking', 'Copy from a book', 'Skip the topic']),
    explanation: `Good writing starts with planning! ${wt.titleVi}`,
    hints: [`Think about: ${wt.title}`],
  }));

  const listeningTopic = LISTENING_SPEAKING_TOPICS.find(topic => topic.topicId === topicKey);
  if (listeningTopic) return Array.from({ length: count }, () => ({
    id: genId(), gradeLevel: listeningTopic.grade, difficulty: listeningTopic.grade, type: 'listening',
    topic: listeningTopic.title, topicKey: listeningTopic.topicId,
    question: `🎧 Listening & Speaking: ${listeningTopic.title}\n${listeningTopic.titleVi}\n\nWhat should a learner do first?`,
    correctAnswer: 'Listen carefully before answering',
    options: ensureCorrectInOptions('Listen carefully before answering', ['Listen carefully before answering', 'Interrupt immediately', 'Ignore the speaker', 'Only copy words silently']),
    explanation: `This topic practices oral communication: ${listeningTopic.titleVi}.`,
    hints: ['Listen first.', `Topic: ${listeningTopic.title}`],
  }));

  const vocabTheme = VOCAB_THEMES.find(theme => theme.themeId === topicKey);
  if (vocabTheme) return Array.from({ length: count }, () => {
    const word = pick(vocabTheme.words);
    const wordIndex = vocabTheme.words.indexOf(word);
    const correctVi = vocabTheme.wordsVi[wordIndex] ?? vocabTheme.titleVi;
    const wrongs = shuffle(vocabTheme.wordsVi.filter(item => item !== correctVi)).slice(0, 3);
    return {
      id: genId(), gradeLevel: vocabTheme.grade, difficulty: vocabTheme.grade, type: 'vocabulary',
      topic: vocabTheme.title, topicKey: vocabTheme.themeId,
      question: `📚 Vocabulary theme: ${vocabTheme.title}\nWhat does "${word}" mean?`,
      correctAnswer: correctVi,
      options: ensureCorrectInOptions(correctVi, [correctVi, ...wrongs]),
      explanation: `"${word}" belongs to ${vocabTheme.titleVi}.`,
      hints: [`Theme: ${vocabTheme.titleVi}`, `Framework: ${vocabTheme.framework}`],
    };
  });

  const cultureTopic = COUNTRY_CONTENT.find(content => content.contentId === topicKey);
  if (cultureTopic) return Array.from({ length: count }, () => ({
    id: genId(), gradeLevel: cultureTopic.grade, difficulty: cultureTopic.grade, type: 'reading',
    topic: cultureTopic.title, topicKey: cultureTopic.contentId,
    question: `🌍 Culture: ${cultureTopic.title}\n${cultureTopic.titleVi}\n\nWhich learning move is best?`,
    correctAnswer: 'Connect the culture fact to evidence and respectful discussion',
    options: ensureCorrectInOptions('Connect the culture fact to evidence and respectful discussion', ['Connect the culture fact to evidence and respectful discussion', 'Memorize a flag only', 'Avoid comparing cultures', 'Guess without source evidence']),
    explanation: `Culture topics should build respectful, evidence-based understanding: ${cultureTopic.titleVi}.`,
    hints: ['Look for evidence.', `Framework: ${cultureTopic.framework}`],
  }));

  return [];
}

function extractVocabFromTitle(title: string): string[] {
  return title.toLowerCase().split(/[\s,&]+/).filter(w => w.length > 2 && !['and', 'the', 'for', 'with'].includes(w));
}

function getSentencePatternsForGrade(grade: number): string[] {
  const patterns: Record<number, string[]> = {
    1: ['I like ___', 'This is a ___', 'I can see ___', 'My name is ___'],
    2: ['I have a ___', 'She is ___', 'They are ___', 'We can ___'],
    3: ['I want to ___', 'He likes to ___', 'We should ___', 'Can you ___?'],
    4: ['I think that ___', 'She believes ___', 'They decided to ___', 'We need to ___'],
    5: ['Although ___, we ___', 'If I were ___, I would ___', 'Not only ___ but also ___', 'In my opinion, ___'],
  };
  return patterns[grade] || patterns[1];
}

// ── Topic info for UI registration ──
export interface IntlTopicInfo {
  key: string;
  name: string;
  gradeLevel: number;
  icon: string;
  framework: string;
  category: 'unit' | 'phonics' | 'grammar' | 'reading' | 'sight_words' | 'writing' | 'listening' | 'vocabulary' | 'culture';
}

// Import new data types
import {
  WRITING_TOPICS, LISTENING_SPEAKING_TOPICS, VOCAB_THEMES, COUNTRY_CONTENT,
} from '@/data/english-international';

const getFlag = (fw: string) => {
  const flags: Record<string, string> = {
    cambridge: '🇬🇧', common_core: '🇺🇸', australian: '🇦🇺',
    finnish: '🇫🇮', singapore: '🇸🇬', canadian: '🇨🇦',
    jolly_phonics: '🔤',
  };
  return flags[fw] || '🌍';
};

export function getInternationalTopics(grade: number): IntlTopicInfo[] {
  const topics: IntlTopicInfo[] = [];

  // Country textbook unit lanes. These are the image/manifest-backed lessons
  // used by LessonPhase, so they must be visible from /child/learn, not only
  // reachable through direct ?subject=english&topic=... URLs.
  ALL_COUNTRY_UNITS.filter(u => u.grade === grade).forEach(u => {
    topics.push({
      key: u.unitId,
      name: `${getFlag(u.framework)} Unit ${u.unitNumber}: ${u.title}`,
      gradeLevel: u.grade,
      icon: '📘',
      framework: u.framework,
      category: 'unit',
    });
  });

  // Phonics (Grade 1-5)
  PHONICS_LEVELS.filter(l => l.grade <= grade).forEach(l => {
    topics.push({
      key: l.levelId, name: `${l.title}`, gradeLevel: l.grade,
      icon: '🔤', framework: l.framework, category: 'phonics',
    });
  });

  // Grammar (Grade 1-5)
  GRAMMAR_TOPICS.filter(t => t.grade <= grade).forEach(t => {
    topics.push({
      key: t.topicId, name: t.title, gradeLevel: t.grade,
      icon: '📝', framework: t.framework, category: 'grammar',
    });
  });

  // Reading (all grades)
  READING_PASSAGES.filter(p => p.grade <= grade).forEach(p => {
    topics.push({
      key: p.passageId, name: `📖 ${p.title}`, gradeLevel: p.grade,
      icon: '📖', framework: p.framework, category: 'reading',
    });
  });

  // Sight Words (all grades)
  if (SIGHT_WORDS[Math.min(grade, 5)]) {
    topics.push({
      key: `sw_g${grade}`, name: `Sight Words Lv.${grade}`, gradeLevel: grade,
      icon: '⚡', framework: 'common_core', category: 'sight_words',
    });
  }

  // Writing (G1-G5)
  WRITING_TOPICS.filter(w => w.grade <= grade).forEach(w => {
    topics.push({
      key: w.topicId, name: `${getFlag(w.framework)} ${w.title}`, gradeLevel: w.grade,
      icon: '✍️', framework: w.framework, category: 'writing',
    });
  });

  // Listening & Speaking (G1-G5)
  LISTENING_SPEAKING_TOPICS.filter(l => l.grade <= grade).forEach(l => {
    topics.push({
      key: l.topicId, name: `${getFlag(l.framework)} ${l.title}`, gradeLevel: l.grade,
      icon: '🎧', framework: l.framework, category: 'listening',
    });
  });

  // Vocabulary Themes (G1-G5)
  VOCAB_THEMES.filter(v => v.grade <= grade).forEach(v => {
    topics.push({
      key: v.themeId, name: `${getFlag(v.framework)} ${v.title}`, gradeLevel: v.grade,
      icon: '📚', framework: v.framework, category: 'vocabulary',
    });
  });

  // Country-Specific Content (G3-G5)
  COUNTRY_CONTENT.filter(c => c.grade <= grade).forEach(c => {
    topics.push({
      key: c.contentId, name: `${getFlag(c.framework)} ${c.title}`, gradeLevel: c.grade,
      icon: '🌍', framework: c.framework, category: 'culture',
    });
  });

  return topics;
}
