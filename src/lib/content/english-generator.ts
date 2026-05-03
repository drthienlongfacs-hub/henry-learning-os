// =====================================================
// English Language Generator — CT 2018 Grades 1-5
// Sources: CT 2018 (Grade 3+ mandatory), enrichment Grades 1-2
// Cambridge Primary English, US Common Core ELA, Jolly Phonics
// =====================================================

export interface EnglishProblem {
    id: string;
    question: string;
    correctAnswer: string;
    options?: string[];
    explanation: string;
    difficulty: number;
    hints: string[];
    type: 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'writing' | 'phonics' | 'sight_words';
    gradeLevel: number;
    topic: string;
    topicKey: string;
    passage?: string;
    illustration?: string;
}

interface VocabPair {
    en: string;
    vi: string;
    img?: string;
}

interface VocabBank {
    theme: string;
    img?: string;
    pairs: VocabPair[];
}

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const genId = () => `en-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const shuffle = <T>(arr: T[]): T[] => {
    const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = rand(0, i);[a[i], a[j]] = [a[j], a[i]]; } return a;
};
const ENGLISH_TOPIC_GRADE = {
    reading: 4,
} as const;

// ══════════════════════════════════════════════
// GRADE 3: Basic Vocabulary (Family, School, Colors, Numbers, Animals)
// ══════════════════════════════════════════════

const VOCAB_BANKS: VocabBank[] = [
    {
        theme: 'Family', pairs: [
            { en: 'mother', vi: 'mẹ' }, { en: 'father', vi: 'bố' }, { en: 'brother', vi: 'anh/em trai' },
            { en: 'sister', vi: 'chị/em gái' }, { en: 'grandmother', vi: 'bà' }, { en: 'grandfather', vi: 'ông' },
            { en: 'uncle', vi: 'chú/cậu' }, { en: 'aunt', vi: 'cô/dì' }, { en: 'cousin', vi: 'anh chị em họ' },
        ]
    },
    {
        theme: 'School', pairs: [
            { en: 'teacher', vi: 'giáo viên' }, { en: 'student', vi: 'học sinh' }, { en: 'classroom', vi: 'phòng học' },
            { en: 'pencil', vi: 'bút chì' }, { en: 'book', vi: 'sách' }, { en: 'ruler', vi: 'thước' },
            { en: 'eraser', vi: 'cục tẩy' }, { en: 'notebook', vi: 'vở' }, { en: 'backpack', vi: 'ba lô' },
        ]
    },
    {
        theme: 'Colors & Shapes', pairs: [
            { en: 'red', vi: 'đỏ' }, { en: 'blue', vi: 'xanh dương' }, { en: 'green', vi: 'xanh lá' },
            { en: 'yellow', vi: 'vàng' }, { en: 'purple', vi: 'tím' }, { en: 'orange', vi: 'cam' },
            { en: 'circle', vi: 'hình tròn' }, { en: 'square', vi: 'hình vuông' }, { en: 'triangle', vi: 'hình tam giác' },
        ]
    },
    {
        theme: 'Animals', pairs: [
            { en: 'dog', vi: 'chó', img: '/images/english/Huskiesatrest.jpg' },
            { en: 'cat', vi: 'mèo', img: '/images/english/Cat_August_2010-4.jpg' },
            { en: 'bird', vi: 'chim', img: '/images/english/Passer_domesticus_male__15_.jpg' },
            { en: 'fish', vi: 'cá', img: '/images/english/Amphiprion_ocellaris__Clown_anemonefish__by_Nick_Hobgood.jpg' },
            { en: 'elephant', vi: 'voi', img: '/images/english/African_Elephant__Loxodonta_africana__male__17289351322_.jpg' },
            { en: 'monkey', vi: 'khỉ', img: '/images/english/Japanese_Snow_Monkey__Macaque__Mother_Grooms_Her_Young.jpg' },
            { en: 'rabbit', vi: 'thỏ', img: '/images/english/Oryctolagus_cuniculus_Rcdo.jpg' },
            { en: 'tiger', vi: 'hổ', img: '/images/english/Bengal_tiger__Panthera_tigris_tigris__female_3_crop.jpg' },
            { en: 'dolphin', vi: 'cá heo', img: '/images/english/Tursiops_truncatus_01.jpg' },
        ]
    },
    {
        theme: 'Food & Drink', pairs: [
            { en: 'rice', vi: 'cơm/gạo', img: '/images/english/20201102.Hengnan.Hybrid_rice_Sanyou-1.6.jpg' },
            { en: 'milk', vi: 'sữa' },
            { en: 'bread', vi: 'bánh mì', img: '/images/english/Korb_mit_Br_C3_B6tchen.JPG' },
            { en: 'water', vi: 'nước' }, { en: 'apple', vi: 'táo', img: '/images/english/Pink_lady_and_cross_section.jpg' },
            { en: 'chicken', vi: 'gà' },
            { en: 'egg', vi: 'trứng' }, { en: 'juice', vi: 'nước ép' }, { en: 'noodle', vi: 'mì/phở' },
        ]
    },
    {
        theme: 'Body Parts', pairs: [
            { en: 'head', vi: 'đầu' }, { en: 'hand', vi: 'bàn tay' }, { en: 'eye', vi: 'mắt' },
            { en: 'ear', vi: 'tai' }, { en: 'nose', vi: 'mũi' }, { en: 'mouth', vi: 'miệng' },
            { en: 'leg', vi: 'chân' }, { en: 'arm', vi: 'cánh tay' }, { en: 'finger', vi: 'ngón tay' },
        ]
    },
    {
        theme: 'Weather & Nature', pairs: [
            { en: 'sunny', vi: 'nắng' }, { en: 'rainy', vi: 'mưa' }, { en: 'cloudy', vi: 'nhiều mây' },
            { en: 'windy', vi: 'có gió' }, { en: 'hot', vi: 'nóng' }, { en: 'cold', vi: 'lạnh' },
            { en: 'river', vi: 'sông' }, { en: 'mountain', vi: 'núi' }, { en: 'forest', vi: 'rừng' },
        ]
    },
    {
        theme: 'Daily Activities', pairs: [
            { en: 'wake up', vi: 'thức dậy' }, { en: 'brush teeth', vi: 'đánh răng' }, { en: 'eat breakfast', vi: 'ăn sáng' },
            { en: 'go to school', vi: 'đi học' }, { en: 'do homework', vi: 'làm bài tập' }, { en: 'play', vi: 'chơi' },
            { en: 'read', vi: 'đọc' }, { en: 'sleep', vi: 'ngủ' }, { en: 'take a shower', vi: 'tắm' },
        ]
    },
];

// ══════════════════════════════════════════════
// GRADE 1: Alphabet Recognition & Phonics Intro
// ══════════════════════════════════════════════

const ALPHABET_DATA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => ({
    upper: l, lower: l.toLowerCase(),
    phonics: { A:'æ', B:'b', C:'k', D:'d', E:'ɛ', F:'f', G:'ɡ', H:'h', I:'ɪ',
               J:'dʒ', K:'k', L:'l', M:'m', N:'n', O:'ɒ', P:'p', Q:'kw', R:'r',
               S:'s', T:'t', U:'ʌ', V:'v', W:'w', X:'ks', Y:'j', Z:'z' }[l] || l.toLowerCase(),
    word: { A:'apple', B:'ball', C:'cat', D:'dog', E:'egg', F:'fish', G:'go', H:'hat',
            I:'ink', J:'jam', K:'kite', L:'lamp', M:'moon', N:'net', O:'ox', P:'pen',
            Q:'queen', R:'red', S:'sun', T:'top', U:'up', V:'van', W:'web', X:'box',
            Y:'yes', Z:'zoo' }[l] || 'apple',
}));

export function genAlphabetEn(): EnglishProblem {
    const templates = [
        // uppercase → lowercase matching
        () => {
            const letter = ALPHABET_DATA[rand(0, 25)];
            const wrongs = shuffle(ALPHABET_DATA.filter(l => l.upper !== letter.upper)).slice(0, 3);
            return {
                q: `Chữ hoa "${letter.upper}" viết thường là gì?`,
                a: letter.lower, opts: shuffle([letter.lower, ...wrongs.map(w => w.lower)]),
                e: `${letter.upper} viết thường là ${letter.lower}.`,
            };
        },
        // letter → beginning sound word
        () => {
            const letter = ALPHABET_DATA[rand(0, 25)];
            const wrongs = shuffle(ALPHABET_DATA.filter(l => l.upper !== letter.upper)).slice(0, 3);
            return {
                q: `Which word starts with "${letter.upper}"?`,
                a: letter.word, opts: shuffle([letter.word, ...wrongs.map(w => w.word)]),
                e: `"${letter.word}" starts with ${letter.upper} /${letter.phonics}/.`,
            };
        },
        // phonics sound
        () => {
            const letter = ALPHABET_DATA[rand(0, 25)];
            const wrongs = shuffle(ALPHABET_DATA.filter(l => l.upper !== letter.upper)).slice(0, 3);
            return {
                q: `Chữ "${letter.upper}" phát âm bắt đầu /${letter.phonics}/. Từ nào bắt đầu bằng âm này?`,
                a: letter.word, opts: shuffle([letter.word, ...wrongs.map(w => w.word)]),
                e: `/${letter.phonics}/ → "${letter.word}" (${letter.upper}${letter.lower}).`,
            };
        },
    ];
    const t = templates[rand(0, templates.length - 1)]();
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'vocabulary', topic: 'Alphabet & Phonics', topicKey: 'alphabet_en',
        question: t.q, correctAnswer: t.a, options: t.opts,
        explanation: t.e, hints: ['Look at the first letter', `Answer: ${t.a}`],
    };
}

// ══════════════════════════════════════════════
// GRADE 2: Basic Greetings & Simple Phrases
// ══════════════════════════════════════════════

const GREETING_PAIRS = [
    { en: 'Hello!', vi: 'Xin chào!' },
    { en: 'Good morning!', vi: 'Chào buổi sáng!' },
    { en: 'Good afternoon!', vi: 'Chào buổi chiều!' },
    { en: 'Good night!', vi: 'Chúc ngủ ngon!' },
    { en: 'Goodbye!', vi: 'Tạm biệt!' },
    { en: 'Thank you!', vi: 'Cảm ơn!' },
    { en: 'Sorry!', vi: 'Xin lỗi!' },
    { en: 'Yes', vi: 'Vâng/Có' },
    { en: 'No', vi: 'Không' },
    { en: 'Please', vi: 'Làm ơn' },
    { en: 'How are you?', vi: 'Bạn khỏe không?' },
    { en: 'I am fine.', vi: 'Tôi khỏe.' },
    { en: 'What is your name?', vi: 'Bạn tên là gì?' },
    { en: 'My name is...', vi: 'Tên tôi là...' },
    { en: 'Stand up!', vi: 'Đứng lên!' },
    { en: 'Sit down!', vi: 'Ngồi xuống!' },
];

export function genGreetingsEn(): EnglishProblem {
    const pair = GREETING_PAIRS[rand(0, GREETING_PAIRS.length - 1)];
    const direction = Math.random() > 0.5;
    const others = shuffle(GREETING_PAIRS.filter(p => p.en !== pair.en)).slice(0, 3);
    const opts = direction
        ? shuffle([pair.vi, ...others.map(o => o.vi)])
        : shuffle([pair.en, ...others.map(o => o.en)]);
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'vocabulary', topic: 'Greetings & Phrases', topicKey: 'greetings_en',
        question: direction ? `"${pair.en}" nghĩa là gì?` : `"${pair.vi}" in English?`,
        correctAnswer: direction ? pair.vi : pair.en,
        options: opts,
        explanation: `${pair.en} = ${pair.vi}.`,
        hints: ['Think about daily conversations', `Answer: ${direction ? pair.vi : pair.en}`],
    };
}

// ══════════════════════════════════════════════
// GRADE 3: Vocabulary Themes
// ══════════════════════════════════════════════

export function genVocabEn(): EnglishProblem {
    const bank = VOCAB_BANKS[rand(0, VOCAB_BANKS.length - 1)];
    const pair = bank.pairs[rand(0, bank.pairs.length - 1)];
    const direction = Math.random() > 0.5;
    const others = shuffle(bank.pairs.filter(p => p.en !== pair.en)).slice(0, 3);
    const opts = direction
        ? shuffle([pair.vi, ...others.map(o => o.vi)])
        : shuffle([pair.en, ...others.map(o => o.en)]);
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'vocabulary', topic: `Vocabulary: ${bank.theme}`, topicKey: 'vocab_en',
        question: direction ? `"${pair.en}" nghĩa là gì?` : `"${pair.vi}" in English is?`,
        correctAnswer: direction ? pair.vi : pair.en,
        options: opts,
        explanation: `${pair.en} = ${pair.vi} (Theme: ${bank.theme}).`,
        hints: [`Topic: ${bank.theme}`, `Answer: ${direction ? pair.vi : pair.en}`],
        illustration: pair.img ?? bank.img,
    };
}

// ══════════════════════════════════════════════
// GRADE 4: Grammar (Simple Present, Pronouns, Prepositions)
// ══════════════════════════════════════════════

export function genGrammarEn(): EnglishProblem {
    const templates = [
        // Subject-Verb Agreement (Simple Present)
        () => {
            const items = [
                { s: 'She ___ to school every day.', a: 'goes', opts: ['go', 'goes', 'going', 'went'] },
                { s: 'They ___ football on Sundays.', a: 'play', opts: ['play', 'plays', 'playing', 'played'] },
                { s: 'He ___ his homework after dinner.', a: 'does', opts: ['do', 'does', 'doing', 'did'] },
                { s: 'I ___ milk every morning.', a: 'drink', opts: ['drink', 'drinks', 'drinking', 'drank'] },
                { s: 'The cat ___ on the sofa.', a: 'sits', opts: ['sit', 'sits', 'sitting', 'sat'] },
                { s: 'We ___ English at school.', a: 'learn', opts: ['learn', 'learns', 'learning', 'learned'] },
                { s: 'My mother ___ delicious food.', a: 'cooks', opts: ['cook', 'cooks', 'cooking', 'cooked'] },
            ];
            const item = items[rand(0, items.length - 1)];
            return { q: `Fill in: "${item.s}"`, a: item.a, opts: item.opts, e: `Simple Present: He/She/It + verb-s/es. I/You/We/They + verb.`, grade: 4 };
        },
        // Pronouns
        () => {
            const items = [
                { s: 'This is my sister. ___ is a student.', a: 'She', opts: ['She', 'He', 'It', 'They'] },
                { s: '___ are playing in the park. (Lan and Mai)', a: 'They', opts: ['She', 'He', 'They', 'We'] },
                { s: 'The dog is big. ___ is friendly.', a: 'It', opts: ['He', 'She', 'It', 'They'] },
                { s: 'My father is a doctor. ___ works at a hospital.', a: 'He', opts: ['She', 'He', 'It', 'They'] },
            ];
            const item = items[rand(0, items.length - 1)];
            return { q: `Choose the correct pronoun: "${item.s}"`, a: item.a, opts: item.opts, e: `${item.a} is correct. Pronouns replace nouns.`, grade: 4 };
        },
        // Prepositions
        () => {
            const items = [
                { s: 'The book is ___ the table.', a: 'on', opts: ['on', 'in', 'under', 'at'] },
                { s: 'The cat is ___ the box.', a: 'in', opts: ['on', 'in', 'at', 'under'] },
                { s: 'She lives ___ 12 Tran Hung Dao Street.', a: 'at', opts: ['in', 'on', 'at', 'under'] },
                { s: 'The ball is ___ the chair.', a: 'under', opts: ['on', 'in', 'under', 'at'] },
                { s: 'We go to school ___ the morning.', a: 'in', opts: ['in', 'on', 'at', 'for'] },
            ];
            const item = items[rand(0, items.length - 1)];
            return { q: `Fill in the preposition: "${item.s}"`, a: item.a, opts: item.opts, e: `"${item.a}" is correct. Prepositions show position/time.`, grade: 4 };
        },
    ];
    const t = templates[rand(0, templates.length - 1)]();
    return {
        id: genId(), gradeLevel: t.grade, difficulty: t.grade,
        type: 'grammar', topic: 'English Grammar', topicKey: 'grammar_en',
        question: t.q, correctAnswer: t.a, options: t.opts,
        explanation: t.e, hints: ['Read the sentence carefully', `Answer: ${t.a}`],
    };
}

// ══════════════════════════════════════════════
// GRADE 4-5: Reading Comprehension
// ══════════════════════════════════════════════

const EN_PASSAGES = [
    {
        grade: 4, title: 'My Best Friend',
        text: 'My best friend is Minh. He is 10 years old. He likes playing football and reading books. Every Saturday, we go to the park together. Minh is very kind and always helps his friends.',
        questions: [
            { q: 'How old is Minh?', a: '10 years old', opts: ['10 years old', '9 years old', '11 years old', '8 years old'] },
            { q: 'What does Minh like doing?', a: 'Playing football and reading', opts: ['Playing football and reading', 'Swimming', 'Cooking', 'Drawing'] },
            { q: 'When do they go to the park?', a: 'Every Saturday', opts: ['Every Saturday', 'Every Sunday', 'Every Monday', 'Every day'] },
        ]
    },
    {
        grade: 4, title: 'The Four Seasons',
        text: 'There are four seasons in a year: spring, summer, autumn, and winter. In spring, flowers bloom and birds sing. Summer is hot and children love swimming. Autumn brings colorful leaves. Winter is cold and sometimes it snows.',
        questions: [
            { q: 'How many seasons are there in a year?', a: 'Four', opts: ['Four', 'Three', 'Five', 'Two'] },
            { q: 'What happens in spring?', a: 'Flowers bloom and birds sing', opts: ['Flowers bloom and birds sing', 'It snows', 'Leaves fall', 'Children swim'] },
            { q: 'Which season is cold?', a: 'Winter', opts: ['Winter', 'Summer', 'Spring', 'Autumn'] },
        ]
    },
    {
        grade: 5, title: 'A Visit to the Zoo',
        text: 'Last Sunday, our class visited the city zoo. We saw many animals: lions, elephants, monkeys, and penguins. The elephants were the biggest. The monkeys were very funny — they jumped from tree to tree. My favorite was the penguin because it walked in a cute way. We learned that we should protect wild animals.',
        questions: [
            { q: 'When did the class visit the zoo?', a: 'Last Sunday', opts: ['Last Sunday', 'Last Monday', 'Yesterday', 'Last Friday'] },
            { q: 'Which animal was the biggest?', a: 'The elephant', opts: ['The elephant', 'The lion', 'The monkey', 'The penguin'] },
            { q: "Why was the penguin the writer's favorite?", a: 'It walked in a cute way', opts: ['It walked in a cute way', 'It was big', 'It could fly', 'It was fast'] },
            { q: 'What lesson did they learn?', a: 'Protect wild animals', opts: ['Protect wild animals', 'Feed the animals', 'Take photos', 'Buy souvenirs'] },
        ]
    },
    {
        grade: 5, title: 'Healthy Habits',
        text: 'To stay healthy, we should eat fruits and vegetables every day. We need to drink at least 6 glasses of water. Exercise is important — playing sports or walking for 30 minutes daily keeps us strong. We should sleep 8-10 hours each night and brush our teeth twice a day.',
        questions: [
            { q: 'What should we eat every day?', a: 'Fruits and vegetables', opts: ['Fruits and vegetables', 'Candy', 'Fast food', 'Chips'] },
            { q: 'How much water should we drink?', a: 'At least 6 glasses', opts: ['At least 6 glasses', '2 glasses', '1 glass', '10 glasses'] },
            { q: 'How long should we exercise daily?', a: '30 minutes', opts: ['30 minutes', '10 minutes', '2 hours', '5 minutes'] },
            { q: 'How many hours should children sleep?', a: '8-10 hours', opts: ['8-10 hours', '5 hours', '12 hours', '4 hours'] },
        ]
    },
];

export function genReadingEn(): EnglishProblem {
    const p = EN_PASSAGES[rand(0, EN_PASSAGES.length - 1)];
    const qItem = p.questions[rand(0, p.questions.length - 1)];
    return {
        id: genId(), gradeLevel: ENGLISH_TOPIC_GRADE.reading, difficulty: p.grade,
        type: 'reading', topic: 'Reading Comprehension', topicKey: 'reading_en',
        passage: `📖 ${p.title}\n\n${p.text}`,
        question: qItem.q, correctAnswer: qItem.a, options: qItem.opts,
        explanation: `The answer "${qItem.a}" can be found in the passage "${p.title}".`,
        hints: ['Read the passage carefully', `Answer: ${qItem.a}`],
    };
}

// ══════════════════════════════════════════════
// GRADE 5: Sentence Building
// ══════════════════════════════════════════════

export function genSentenceEn(): EnglishProblem {
    const templates = [
        // Unscramble sentences
        () => {
            const sentences = [
                { words: ['I', 'like', 'to', 'eat', 'apples'], answer: 'I like to eat apples.' },
                { words: ['She', 'goes', 'to', 'school', 'by', 'bus'], answer: 'She goes to school by bus.' },
                { words: ['They', 'are', 'playing', 'in', 'the', 'garden'], answer: 'They are playing in the garden.' },
                { words: ['My', 'father', 'reads', 'the', 'newspaper', 'every', 'morning'], answer: 'My father reads the newspaper every morning.' },
                { words: ['We', 'have', 'English', 'on', 'Monday', 'and', 'Wednesday'], answer: 'We have English on Monday and Wednesday.' },
            ];
            const s = sentences[rand(0, sentences.length - 1)];
            return { q: `Arrange into a sentence: ${shuffle(s.words).join(' / ')}`, a: s.answer, opts: undefined, e: `Correct order: "${s.answer}"`, grade: 5 };
        },
        // Question-Answer matching
        () => {
            const items = [
                { q: 'What is your name?', a: 'My name is...', opts: ['My name is...', 'I am fine', 'I am 10', 'I like football'] },
                { q: 'How old are you?', a: 'I am 10 years old.', opts: ['I am 10 years old.', 'I am fine', 'My name is Lan', 'I like cats'] },
                { q: 'Where do you live?', a: 'I live in Ho Chi Minh City.', opts: ['I live in Ho Chi Minh City.', 'I am 10', 'I like rice', 'I go to school'] },
                { q: 'What do you like?', a: 'I like playing football.', opts: ['I like playing football.', 'I am fine', 'I am from Vietnam', 'It is sunny'] },
            ];
            const item = items[rand(0, items.length - 1)];
            return { q: `Which answer is correct for: "${item.q}"`, a: item.a, opts: item.opts, e: `"${item.a}" correctly answers "${item.q}".`, grade: 5 };
        },
    ];
    const t = templates[rand(0, 1)]();
    return {
        id: genId(), gradeLevel: t.grade, difficulty: t.grade,
        type: 'writing', topic: 'Sentence Building', topicKey: 'sentence_en',
        question: t.q, correctAnswer: t.a,
        options: t.opts,
        explanation: t.e, hints: ['Subject + Verb + Object', `Answer: ${t.a}`],
    };
}

// ── BATCH 9: Colors & Numbers — Global Success 1 ──
export function genColorsNumbers(): EnglishProblem {
    const templates = [
        { q: 'What colour is the sky?', a: 'Blue', opts: ['Blue', 'Red', 'Green', 'Yellow'], e: 'The sky is blue. Blue = xanh da trời.', grade: 1 },
        { q: 'How many fingers do you have on one hand?', a: 'Five', opts: ['Five', 'Three', 'Ten', 'Four'], e: 'One hand has five fingers. Five = 5.', grade: 1 },
        { q: 'What colour is a banana?', a: 'Yellow', opts: ['Yellow', 'Red', 'Blue', 'Purple'], e: 'A banana is yellow. Yellow = vàng.', grade: 1 },
        { q: 'How do you say "10" in English?', a: 'Ten', opts: ['Ten', 'Two', 'Twelve', 'Twenty'], e: 'Ten = 10. Counting: ...eight, nine, ten.', grade: 1 },
        { q: 'What colour is grass?', a: 'Green', opts: ['Green', 'Blue', 'Red', 'Orange'], e: 'Grass is green. Green = xanh lá.', grade: 1 },
        { q: 'Which colour do you get when you mix red and yellow?', a: 'Orange', opts: ['Orange', 'Purple', 'Green', 'Brown'], e: 'Red + Yellow = Orange.', grade: 1 },
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: t.grade, difficulty: t.grade,
        type: 'vocabulary', topic: 'Colors & Numbers', topicKey: 'colors_numbers',
        question: t.q, correctAnswer: t.a, options: t.opts,
        explanation: t.e, hints: ['Look at the colours around you!', `Answer: ${t.a}`],
    };
}

// ── BATCH 9: My Body & School — Global Success 2 ──
export function genBodySchool(): EnglishProblem {
    const templates = [
        { q: 'Point to your "nose". Where is it?', a: 'On your face', opts: ['On your face', 'On your hand', 'On your foot', 'On your leg'], e: 'Nose = mũi. It is in the middle of your face.', grade: 2 },
        { q: 'What do you use to write?', a: 'A pencil', opts: ['A pencil', 'A ruler', 'A book', 'An eraser'], e: 'A pencil is used to write. Pencil = bút chì.', grade: 2 },
        { q: 'How many eyes do you have?', a: 'Two', opts: ['Two', 'One', 'Three', 'Four'], e: 'We have two eyes. Eyes = mắt.', grade: 2 },
        { q: 'What is a "ruler" used for?', a: 'To draw straight lines', opts: ['To draw straight lines', 'To write', 'To erase', 'To cut'], e: 'A ruler = thước kẻ. It helps draw straight lines and measure.', grade: 2 },
        { q: 'Which of these is a school supply?', a: 'Eraser', opts: ['Eraser', 'Pillow', 'Cup', 'Shoe'], e: 'Eraser = cục tẩy (cục gôm). It is used at school.', grade: 2 },
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: t.grade, difficulty: t.grade,
        type: 'vocabulary', topic: 'My Body & School', topicKey: 'body_school',
        question: t.q, correctAnswer: t.a, options: t.opts,
        explanation: t.e, hints: ['Look at your body and school bag!', `Answer: ${t.a}`],
    };
}

// ── BATCH 9: Hobbies & Food — Global Success 3 ──
export function genHobbiesFood(): EnglishProblem {
    const templates = [
        { q: 'What is your hobby? — I like _____.', a: 'swimming', opts: ['swimming', 'homework', 'sleeping all day', 'being angry'], e: 'Swimming is a popular hobby. Hobby = sở thích.', grade: 3 },
        { q: 'Which food is from Vietnam?', a: 'Pho', opts: ['Pho', 'Sushi', 'Pizza', 'Hamburger'], e: 'Pho (phở) is a famous Vietnamese noodle soup.', grade: 3 },
        { q: '"I like _____ football." Fill in the blank.', a: 'playing', opts: ['playing', 'play', 'plays', 'played'], e: '"I like + V-ing": I like playing football.', grade: 3 },
        { q: 'What do you have for breakfast?', a: 'Bread and milk', opts: ['Bread and milk', 'Dinner and lunch', 'A car', 'A book'], e: 'Breakfast = bữa sáng. Common foods: bread, milk, eggs.', grade: 3 },
        { q: 'Which is a fruit?', a: 'Mango', opts: ['Mango', 'Rice', 'Fish', 'Chicken'], e: 'Mango = xoài. It is a tropical fruit.', grade: 3 },
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: t.grade, difficulty: t.grade,
        type: 'vocabulary', topic: 'Hobbies & Food', topicKey: 'hobbies_food',
        question: t.q, correctAnswer: t.a, options: t.opts,
        explanation: t.e, hints: ['Think about what you like to do and eat!', `Answer: ${t.a}`],
    };
}

// ── BATCH 9: Daily Routines — Global Success 4 ──
export function genDailyRoutines(): EnglishProblem {
    const templates = [
        { q: 'What time do you usually wake up?', a: 'I wake up at 6 o\'clock.', opts: ['I wake up at 6 o\'clock.', 'I like cats.', 'It is sunny.', 'I am 10.'], e: '"Wake up at + time" describes when you get up.', grade: 4 },
        { q: 'What do you do after school?', a: 'I do my homework.', opts: ['I do my homework.', 'I go to bed.', 'I cook dinner.', 'I drive a car.'], e: 'After school = sau giờ học. Homework = bài tập về nhà.', grade: 4 },
        { q: 'He _____ to school every day. (go)', a: 'goes', opts: ['goes', 'go', 'going', 'went'], e: 'Present Simple with He/She/It: add -s → He goes.', grade: 4 },
        { q: 'What do you do at 7 pm?', a: 'I have dinner.', opts: ['I have dinner.', 'I go to school.', 'I wake up.', 'I have breakfast.'], e: '7 pm = buổi tối → dinner time. Dinner = bữa tối.', grade: 4 },
        { q: '"She always _____ her teeth before bed." Fill in:', a: 'brushes', opts: ['brushes', 'brush', 'brushing', 'brushed'], e: 'She + Verb-s: She brushes her teeth. Always = luôn luôn.', grade: 4 },
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: t.grade, difficulty: t.grade,
        type: 'grammar', topic: 'Daily Routines', topicKey: 'daily_routines',
        question: t.q, correctAnswer: t.a, options: t.opts,
        explanation: t.e, hints: ['Think about your daily schedule!', `Answer: ${t.a}`],
    };
}

// ── BATCH 9: Travel & Environment — Global Success 5 ──
export function genTravelEnvironment(): EnglishProblem {
    const templates = [
        { q: 'How do you go to school?', a: 'I go to school by bicycle.', opts: ['I go to school by bicycle.', 'I like cats.', 'I am happy.', 'It is cold.'], e: 'By + transport: by bicycle, by bus, on foot.', grade: 5 },
        { q: 'What should we do to protect the environment?', a: 'Reduce, Reuse, Recycle', opts: ['Reduce, Reuse, Recycle', 'Cut down trees', 'Use more plastic', 'Waste water'], e: 'The 3Rs: Reduce, Reuse, Recycle help protect our environment.', grade: 5 },
        { q: '"We _____ plant more trees." (should/must)', a: 'should', opts: ['should', 'can\'t', 'don\'t', 'isn\'t'], e: 'Should = nên. We should plant more trees to help the environment.', grade: 5 },
        { q: 'Which is a means of transport?', a: 'Bus', opts: ['Bus', 'Apple', 'Pencil', 'House'], e: 'Bus = xe buýt. Transport = phương tiện giao thông.', grade: 5 },
        { q: '"Pollution" means:', a: 'Making the environment dirty', opts: ['Making the environment dirty', 'Making food', 'Playing games', 'Sleeping'], e: 'Pollution = ô nhiễm. Air pollution, water pollution, noise pollution.', grade: 5 },
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: t.grade, difficulty: t.grade,
        type: 'vocabulary', topic: 'Travel & Environment', topicKey: 'travel_environment',
        question: t.q, correctAnswer: t.a, options: t.opts,
        explanation: t.e, hints: ['Think about how you travel and nature around you!', `Answer: ${t.a}`],
    };
}

// ── BATCH 13: Animals — Global Success G1 ──
export function genAnimalsEn(): EnglishProblem {
    const templates = [
        { q: 'What animal says "Meow"?', a: 'Cat', opts: ['Cat', 'Dog', 'Bird', 'Fish'], e: 'Cat = mèo. Cats say "Meow!".', grade: 1 },
        { q: 'Which animal can fly?', a: 'Bird', opts: ['Bird', 'Fish', 'Dog', 'Cat'], e: 'Birds have wings and can fly. Bird = chim.', grade: 1 },
        { q: 'How many legs does a dog have?', a: 'Four', opts: ['Four', 'Two', 'Six', 'Eight'], e: 'A dog has four legs. Dog = chó.', grade: 1 },
        { q: 'Which animal lives in water?', a: 'Fish', opts: ['Fish', 'Cat', 'Rabbit', 'Chicken'], e: 'Fish live in water (rivers, lakes, sea). Fish = cá.', grade: 1 },
        { q: '"Elephant" in Vietnamese is:', a: 'Con voi', opts: ['Con voi', 'Con hổ', 'Con gấu', 'Con sư tử'], e: 'Elephant = con voi. It is the largest land animal.', grade: 1 },
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: t.grade, difficulty: t.grade,
        type: 'vocabulary', topic: 'Animals', topicKey: 'animals_en',
        question: t.q, correctAnswer: t.a, options: t.opts,
        explanation: t.e, hints: ['Think about pets and zoo animals!', `Answer: ${t.a}`],
    };
}

// ── BATCH 13: Family Members — Global Success G2 ──
export function genFamilyEn(): EnglishProblem {
    const templates = [
        { q: 'Who is your mother\'s mother?', a: 'Grandmother', opts: ['Grandmother', 'Aunt', 'Sister', 'Mother'], e: 'Grandmother = bà ngoại/bà nội. Your mother\'s mother is your grandmother.', grade: 2 },
        { q: '"Brother" means:', a: 'Anh/em trai', opts: ['Anh/em trai', 'Chị/em gái', 'Bố', 'Mẹ'], e: 'Brother = anh trai hoặc em trai.', grade: 2 },
        { q: 'How many people are there in your family? — There are ___ people.', a: 'four', opts: ['four', 'many much', 'is four', 'has four'], e: '"There are + number + people in my family." Number words: one, two, three, four, five.', grade: 2 },
        { q: '"She is my ___." (mẹ)', a: 'mother', opts: ['mother', 'father', 'brother', 'sister'], e: 'Mother = mẹ. Father = bố. Sister = chị/em gái.', grade: 2 },
        { q: 'What do you call your father\'s brother?', a: 'Uncle', opts: ['Uncle', 'Aunt', 'Cousin', 'Nephew'], e: 'Uncle = chú/bác. Your father\'s or mother\'s brother is your uncle.', grade: 2 },
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: t.grade, difficulty: t.grade,
        type: 'vocabulary', topic: 'Family Members', topicKey: 'family_en',
        question: t.q, correctAnswer: t.a, options: t.opts,
        explanation: t.e, hints: ['Think about your family!', `Answer: ${t.a}`],
    };
}

// ── BATCH 13: Weather & Seasons — Global Success G3 ──
export function genWeatherEn(): EnglishProblem {
    const templates = [
        { q: 'What is the weather like today? — It is _____.', a: 'sunny', opts: ['sunny', 'sun', 'the sun', 'sunning'], e: '"It is + adjective": It is sunny / rainy / cloudy / windy.', grade: 3 },
        { q: 'In winter, the weather is:', a: 'Cold', opts: ['Cold', 'Hot', 'Warm', 'Cool'], e: 'Winter = mùa đông → cold (lạnh). Summer = mùa hè → hot (nóng).', grade: 3 },
        { q: 'How many seasons are there in a year? (in temperate zones)', a: 'Four', opts: ['Four', 'Two', 'Three', 'Six'], e: 'Four seasons: Spring, Summer, Autumn (Fall), Winter.', grade: 3 },
        { q: '"It\'s raining." means:', a: 'Trời đang mưa', opts: ['Trời đang mưa', 'Trời nắng', 'Trời có gió', 'Trời lạnh'], e: 'Rain = mưa. It\'s raining = Trời đang mưa. Present continuous.', grade: 3 },
        { q: 'Which is NOT a weather word?', a: 'Happy', opts: ['Happy', 'Sunny', 'Rainy', 'Cloudy'], e: 'Happy = vui vẻ (feeling, not weather). Weather: sunny, rainy, cloudy, windy, stormy.', grade: 3 },
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: t.grade, difficulty: t.grade,
        type: 'vocabulary', topic: 'Weather & Seasons', topicKey: 'weather_en',
        question: t.q, correctAnswer: t.a, options: t.opts,
        explanation: t.e, hints: ['Look outside the window!', `Answer: ${t.a}`],
    };
}

// ── BATCH 13: Past Tense — Global Success G4 ──
export function genPastTense(): EnglishProblem {
    const templates = [
        { q: '"I _____ to the park yesterday." (go)', a: 'went', opts: ['went', 'go', 'goes', 'going'], e: 'Past tense of "go" = "went" (irregular verb). Yesterday → Past Simple.', grade: 4 },
        { q: '"She _____ a book last night." (read)', a: 'read', opts: ['read', 'reads', 'reading', 'readed'], e: '"Read" past tense = "read" (same spelling, different pronunciation: /red/).', grade: 4 },
        { q: 'Which word signals Past Simple tense?', a: 'Yesterday', opts: ['Yesterday', 'Tomorrow', 'Now', 'Always'], e: 'Time markers: yesterday, last week, ago → Past Simple. Tomorrow → Future.', grade: 4 },
        { q: '"They _____ football last Sunday." (play)', a: 'played', opts: ['played', 'play', 'plays', 'playing'], e: 'Regular verb: play → played (add -ed). Last Sunday → Past Simple.', grade: 4 },
        { q: '"Did you _____ your homework?" Fill in:', a: 'do', opts: ['do', 'did', 'does', 'doing'], e: '"Did + subject + base verb?" → Did you do...? Did she eat...? Did they go...?', grade: 4 },
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: t.grade, difficulty: t.grade,
        type: 'grammar', topic: 'Past Tense', topicKey: 'past_tense',
        question: t.q, correctAnswer: t.a, options: t.opts,
        explanation: t.e, hints: ['Past Simple: V-ed or irregular form', `Answer: ${t.a}`],
    };
}

// ── BATCH 13: Storytelling & Writing — Global Success G5 ──
export function genStoryWriting(): EnglishProblem {
    const templates = [
        { q: 'A story usually has: beginning, _____, and ending.', a: 'middle', opts: ['middle', 'title', 'picture', 'question'], e: 'Story structure: Beginning → Middle → Ending. Middle has the main events.', grade: 5 },
        { q: '"Once upon a time" is used to start a:', a: 'Fairy tale', opts: ['Fairy tale', 'Letter', 'Report', 'Recipe'], e: '"Once upon a time..." = "Ngày xửa ngày xưa..." — opening of fairy tales.', grade: 5 },
        { q: 'Which is a correct way to end a letter?', a: 'Best wishes,', opts: ['Best wishes,', 'Once upon a time', 'Dear Sir', 'Hello'], e: 'Letter ending: Best wishes, / Yours sincerely, / Kind regards,', grade: 5 },
        { q: '"Dear Mom, ..." is used in:', a: 'A letter or email', opts: ['A letter or email', 'A recipe', 'A report', 'A test'], e: '"Dear + name" = cách mở đầu thư/email. Dear Mom = Mẹ thân mến.', grade: 5 },
        { q: 'Put in order: "the / boy / kicked / ball / the"', a: 'The boy kicked the ball.', opts: ['The boy kicked the ball.', 'The ball kicked the boy.', 'Boy the kicked ball the.', 'Kicked the boy the ball.'], e: 'SVO order: Subject (The boy) + Verb (kicked) + Object (the ball).', grade: 5 },
    ];
    const t = templates[rand(0, templates.length - 1)];
    return {
        id: genId(), gradeLevel: t.grade, difficulty: t.grade,
        type: 'writing', topic: 'Storytelling & Writing', topicKey: 'story_writing',
        question: t.q, correctAnswer: t.a, options: t.opts,
        explanation: t.e, hints: ['Remember: Beginning → Middle → Ending', `Answer: ${t.a}`],
    };
}

import { generateUnitExercises, getUnitRegistry } from './english-unit-generator';
import { generateInternationalTopicExercises, getInternationalTopics } from './english-intl-generator';
import { FRAMEWORK_INFO } from '@/data/english-international';

export interface EnTopicInfo {
    key: string;
    name: string;
    gradeLevel: number;
    generator: () => EnglishProblem;
    icon: string;
    isUnit?: boolean;
    unitNumber?: number;
    isIntl?: boolean;
    framework?: string;
    category?: string;
}

// ── Core skill-based topics ──
const CORE_TOPICS: EnTopicInfo[] = [
    { key: 'alphabet_en', name: 'Alphabet & Phonics', gradeLevel: 1, generator: genAlphabetEn, icon: '🔤' },
    { key: 'colors_numbers', name: 'Colors & Numbers', gradeLevel: 1, generator: genColorsNumbers, icon: '🌈' },
    { key: 'animals_en', name: 'Animals', gradeLevel: 1, generator: genAnimalsEn, icon: '🐾' },
    { key: 'greetings_en', name: 'Greetings & Phrases', gradeLevel: 2, generator: genGreetingsEn, icon: '👋' },
    { key: 'body_school', name: 'My Body & School', gradeLevel: 2, generator: genBodySchool, icon: '🏫' },
    { key: 'family_en', name: 'Family Members', gradeLevel: 2, generator: genFamilyEn, icon: '👨‍👩‍👧' },
    { key: 'vocab_en', name: 'Vocabulary Themes', gradeLevel: 3, generator: genVocabEn, icon: '📚' },
    { key: 'hobbies_food', name: 'Hobbies & Food', gradeLevel: 3, generator: genHobbiesFood, icon: '🎾' },
    { key: 'weather_en', name: 'Weather & Seasons', gradeLevel: 3, generator: genWeatherEn, icon: '🌦️' },
    { key: 'grammar_en', name: 'Grammar', gradeLevel: 4, generator: genGrammarEn, icon: '📝' },
    { key: 'reading_en', name: 'Reading', gradeLevel: 4, generator: genReadingEn, icon: '📖' },
    { key: 'daily_routines', name: 'Daily Routines', gradeLevel: 4, generator: genDailyRoutines, icon: '⏰' },
    { key: 'past_tense', name: 'Past Tense', gradeLevel: 4, generator: genPastTense, icon: '⏪' },
    { key: 'sentence_en', name: 'Sentences', gradeLevel: 5, generator: genSentenceEn, icon: '✍️' },
    { key: 'travel_environment', name: 'Travel & Environment', gradeLevel: 5, generator: genTravelEnvironment, icon: '🌍' },
    { key: 'story_writing', name: 'Storytelling & Writing', gradeLevel: 5, generator: genStoryWriting, icon: '📝' },
];

// ── SGK Unit-based topics (Global Success 🇻🇳) ──
function buildUnitTopics(): EnTopicInfo[] {
    const units: EnTopicInfo[] = [];
    for (const grade of [1, 2, 3, 4, 5] as const) {
        const registry = getUnitRegistry(grade);
        for (const u of registry) {
            units.push({
                key: u.unitId,
                name: `Unit ${u.unitNumber}: ${u.title}`,
                gradeLevel: u.grade,
                isUnit: true,
                unitNumber: u.unitNumber,
                icon: '📘',
                framework: 'global_success',
                generator: () => {
                    const exercises = generateUnitExercises(u.grade, u.unitId, 1);
                    return exercises[0] || genVocabEn();
                },
            });
        }
    }
    return units;
}

// ── International Curriculum topics (Cambridge 🇬🇧, US 🇺🇸, Australian 🇦🇺) ──
function buildIntlTopics(): EnTopicInfo[] {
    const topics: EnTopicInfo[] = [];
    for (const grade of [1, 2, 3, 4, 5]) {
        const intlTopics = getInternationalTopics(grade);
        // Only add topics at their native grade level (avoid duplicates)
        for (const t of intlTopics.filter(it => it.gradeLevel === grade)) {
            const info = FRAMEWORK_INFO[t.framework];
            topics.push({
                key: t.key,
                name: `${info?.flag || '🌍'} ${t.name}`,
                gradeLevel: t.gradeLevel,
                isIntl: true,
                framework: t.framework,
                category: t.category,
                icon: t.icon,
                generator: () => {
                    const exercises = generateInternationalTopicExercises(t.key, 1);
                    return exercises[0] || genVocabEn();
                },
            });
        }
    }
    return topics;
}

export const ENGLISH_TOPICS: EnTopicInfo[] = [
    ...CORE_TOPICS,
    ...buildUnitTopics(),
    ...buildIntlTopics(),
];

export function generateEnglishSet(grade: number, topicKey?: string, count: number = 10): EnglishProblem[] {
    // SGK unit-specific
    if (topicKey?.startsWith('g1_u') || topicKey?.startsWith('g2_u') || topicKey?.startsWith('g3_u') || topicKey?.startsWith('g4_u') || topicKey?.startsWith('g5_u')) {
        return generateUnitExercises(grade, topicKey, count);
    }
    // International category-specific
    if (topicKey?.startsWith('ph_') || topicKey?.startsWith('gr_') || topicKey?.startsWith('rd_') || topicKey?.startsWith('sw_')) {
        return generateInternationalTopicExercises(topicKey, count);
    }
    const topics = ENGLISH_TOPICS.filter(t => t.gradeLevel <= grade && (!topicKey || t.key === topicKey));
    if (topics.length === 0) return [];
    return Array.from({ length: count }, () => {
        const t = topics[rand(0, topics.length - 1)];
        return t.generator();
    });
}
