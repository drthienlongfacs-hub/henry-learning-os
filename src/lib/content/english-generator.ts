// =====================================================
// English Language Generator — CT 2018 Grades 3-5
// Sources: CT 2018, Cambridge Primary English, US Common Core ELA
// =====================================================

export interface EnglishProblem {
    id: string;
    question: string;
    correctAnswer: string;
    options?: string[];
    explanation: string;
    difficulty: number;
    hints: string[];
    type: 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'writing';
    gradeLevel: number;
    topic: string;
    topicKey: string;
    passage?: string;
    illustration?: any;
}

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const genId = () => `en-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const shuffle = <T>(arr: T[]): T[] => {
    const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = rand(0, i);[a[i], a[j]] = [a[j], a[i]]; } return a;
};

// ══════════════════════════════════════════════
// GRADE 3: Basic Vocabulary (Family, School, Colors, Numbers, Animals)
// ══════════════════════════════════════════════

const VOCAB_BANKS = [
    {
        theme: 'Family', img: '/images/english/Huskiesatrest.jpg', pairs: [
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
        theme: 'Animals', img: '/images/english/Huskiesatrest.jpg', pairs: [
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
            { en: 'bread', vi: 'bánh mì', img: '/images/english/Korb_mit_Br_tchen.JPG' },
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

export function genVocabEn(): EnglishProblem {
    const bank = VOCAB_BANKS[rand(0, VOCAB_BANKS.length - 1)];
    const pair = bank.pairs[rand(0, bank.pairs.length - 1)];
    const direction = Math.random() > 0.5; // true = en→vi, false = vi→en
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
        illustration: (pair as any).img || (bank as any).img,
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
        id: genId(), gradeLevel: p.grade, difficulty: p.grade,
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

// ══════════════════════════════════════════════
// TOPIC REGISTRY
// ══════════════════════════════════════════════

export interface EnTopicInfo {
    key: string;
    name: string;
    gradeLevel: number;
    generator: () => EnglishProblem;
    icon: string;
}

export const ENGLISH_TOPICS: EnTopicInfo[] = [
    { key: 'vocab_en', name: 'Vocabulary', gradeLevel: 3, generator: genVocabEn, icon: '🔤' },
    { key: 'grammar_en', name: 'Grammar', gradeLevel: 4, generator: genGrammarEn, icon: '📝' },
    { key: 'reading_en', name: 'Reading', gradeLevel: 4, generator: genReadingEn, icon: '📖' },
    { key: 'sentence_en', name: 'Sentences', gradeLevel: 5, generator: genSentenceEn, icon: '✍️' },
];

export function generateEnglishSet(grade: number, topicKey?: string, count: number = 10): EnglishProblem[] {
    const topics = ENGLISH_TOPICS.filter(t => t.gradeLevel <= grade && (!topicKey || t.key === topicKey));
    if (topics.length === 0) return [];
    return Array.from({ length: count }, () => {
        const t = topics[rand(0, topics.length - 1)];
        return t.generator();
    });
}
