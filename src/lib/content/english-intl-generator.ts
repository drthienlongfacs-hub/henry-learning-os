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
  return [];
}

// ── Topic info for UI registration ──
export interface IntlTopicInfo {
  key: string;
  name: string;
  gradeLevel: number;
  icon: string;
  framework: string;
  category: 'phonics' | 'grammar' | 'reading' | 'sight_words';
}

export function getInternationalTopics(grade: number): IntlTopicInfo[] {
  const topics: IntlTopicInfo[] = [];

  // Phonics (Grade 1-2)
  PHONICS_LEVELS.filter(l => l.grade <= grade).forEach(l => {
    topics.push({
      key: l.levelId, name: `${l.title}`, gradeLevel: l.grade,
      icon: '🔤', framework: l.framework, category: 'phonics',
    });
  });

  // Grammar (Grade 3-5)
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

  return topics;
}
