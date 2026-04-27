import { Exercise } from '../types';

export const englishExercises: Exercise[] = [
    // ALPHABET (50 exercises)
    ...Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').flatMap((letter) => [
        {
            id: `en-alpha-upper-${letter}`,
            type: 'multiple_choice' as const,
            subject: 'english',
            difficulty: 1,
            question: `Chữ cái tiếng Anh sau đây đọc là gì: ${letter}?`,
            options: [letter, `${letter}x`, `A${letter}`, `Z`].sort(() => Math.random() - 0.5),
            correctAnswer: letter,
            hints: [] as string[],
            explanation: `Đây là chữ ${letter} viết hoa trong tiếng Anh.`,
            tags: ['alphabet', 'phonics'],
        },
        {
            id: `en-alpha-lower-${letter.toLowerCase()}`,
            type: 'multiple_choice' as const,
            subject: 'english',
            difficulty: 1,
            question: `Chữ hoa của '${letter.toLowerCase()}' là chữ nào?`,
            options: [letter, letter === 'A' ? 'B' : 'A', letter.toLowerCase(), 'Z'].sort(() => Math.random() - 0.5),
            correctAnswer: letter,
            hints: [] as string[],
            explanation: `Chữ hoa của ${letter.toLowerCase()} là ${letter}.`,
            tags: ['alphabet'],
        }
    ]),

    // ANIMALS (30 exercises)
    ...[
        { en: 'dog', vi: 'con chó' },
        { en: 'cat', vi: 'con mèo' },
        { en: 'bird', vi: 'con chim' },
        { en: 'fish', vi: 'con cá' },
        { en: 'lion', vi: 'sư tử' },
        { en: 'tiger', vi: 'con hổ' },
        { en: 'monkey', vi: 'con khỉ' },
        { en: 'elephant', vi: 'con voi' },
        { en: 'bear', vi: 'con gấu' },
        { en: 'snake', vi: 'con rắn' },
        { en: 'rabbit', vi: 'con thỏ' },
        { en: 'horse', vi: 'con ngựa' },
        { en: 'pig', vi: 'con lợn' },
        { en: 'cow', vi: 'con bò' },
        { en: 'chicken', vi: 'con gà' },
    ].flatMap((animal) => [
        {
            id: `en-animal-en-vi-${animal.en}`,
            type: 'multiple_choice' as const,
            subject: 'english',
            difficulty: 2,
            question: `Từ "${animal.en}" có nghĩa là gì?`,
            options: [
                animal.vi,
                animal.en === 'dog' ? 'con mèo' : 'con chó',
                'con rồng',
                'cái cây'
            ].sort(() => Math.random() - 0.5),
            correctAnswer: animal.vi,
            hints: [] as string[],
            explanation: `"${animal.en}" là ${animal.vi}.`,
            tags: ['vocabulary', 'animals'],
        },
        {
            id: `en-animal-vi-en-${animal.en}`,
            type: 'multiple_choice' as const,
            subject: 'english',
            difficulty: 2,
            question: `${animal.vi} trong tiếng Anh là gì?`,
            options: [
                animal.en,
                animal.en === 'dog' ? 'cat' : 'dog',
                'apple',
                'car'
            ].sort(() => Math.random() - 0.5),
            correctAnswer: animal.en,
            hints: [] as string[],
            explanation: `${animal.vi} là "${animal.en}".`,
            tags: ['vocabulary', 'animals'],
        }
    ]),

    // COLORS (20 exercises)
    ...[
        { en: 'red', vi: 'màu đỏ' },
        { en: 'blue', vi: 'màu xanh dương' },
        { en: 'green', vi: 'màu xanh lá' },
        { en: 'yellow', vi: 'màu vàng' },
        { en: 'black', vi: 'màu đen' },
        { en: 'white', vi: 'màu trắng' },
        { en: 'pink', vi: 'màu hồng' },
        { en: 'purple', vi: 'màu tím' },
        { en: 'orange', vi: 'màu cam' },
        { en: 'brown', vi: 'màu nâu' },
    ].flatMap((color) => [
        {
            id: `en-color-en-vi-${color.en}`,
            type: 'multiple_choice' as const,
            subject: 'english',
            difficulty: 1,
            question: `Màu "${color.en}" là màu gì?`,
            options: [color.vi, 'màu cầu vồng', color.en === 'red' ? 'màu xanh dương' : 'màu đỏ', 'màu xám'].sort(() => Math.random() - 0.5),
            correctAnswer: color.vi,
            hints: [] as string[],
            explanation: `"${color.en}" là ${color.vi}.`,
            tags: ['vocabulary', 'colors'],
        },
        {
            id: `en-color-vi-en-${color.en}`,
            type: 'multiple_choice' as const,
            subject: 'english',
            difficulty: 1,
            question: `${color.vi} viết tiếng Anh là gì?`,
            options: [color.en, color.en === 'red' ? 'blue' : 'red', 'green', 'black'].sort(() => Math.random() - 0.5),
            correctAnswer: color.en,
            hints: [] as string[],
            explanation: `${color.vi} là "${color.en}".`,
            tags: ['vocabulary', 'colors'],
        }
    ]),

    // NUMBERS (40 exercises)
    ...Array.from({ length: 20 }, (_, i) => {
        const num = i + 1;
        const words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
        const word = words[i];
        return [
            {
                id: `en-number-word-${num}`,
                type: 'multiple_choice' as const,
                subject: 'english',
                difficulty: 2,
                question: `Số ${num} tiếng Anh viết là gì?`,
                options: [word, i === 0 ? 'two' : 'one', 'hundred', 'zero'].sort(() => Math.random() - 0.5),
                correctAnswer: word,
                hints: [] as string[],
                explanation: `Số ${num} là "${word}".`,
                tags: ['vocabulary', 'numbers'],
            },
            {
                id: `en-number-digit-${num}`,
                type: 'multiple_choice' as const,
                subject: 'english',
                difficulty: 2,
                question: `Từ "${word}" nghĩa là số mấy?`,
                options: [num.toString(), (num + 1).toString(), (num > 1 ? num - 1 : 2).toString(), '100'].sort(() => Math.random() - 0.5),
                correctAnswer: num.toString(),
                hints: [] as string[],
                explanation: `"${word}" là số ${num}.`,
                tags: ['vocabulary', 'numbers'],
            }
        ];
    }).flat(),

    // GREETINGS & SHORT SENTENCES (20 exercises)
    ...[
        { en: 'Hello', vi: 'Xin chào' },
        { en: 'Goodbye', vi: 'Tạm biệt' },
        { en: 'Good morning', vi: 'Chào buổi sáng' },
        { en: 'Good night', vi: 'Chúc ngủ ngon' },
        { en: 'Thank you', vi: 'Cảm ơn' },
        { en: 'Sorry', vi: 'Xin lỗi' },
        { en: 'How are you?', vi: 'Bạn khỏe không?' },
        { en: 'I love you', vi: 'Cảnh sát/Bố mẹ yêu Henry' }, // fun context
        { en: 'Stand up', vi: 'Đứng lên' },
        { en: 'Sit down', vi: 'Ngồi xuống' },
    ].flatMap((ph, idx) => [
        {
            id: `en-phrase-en-vi-${idx}`,
            type: 'multiple_choice' as const,
            subject: 'english',
            difficulty: 3,
            question: `Người ta nói "${ph.en}", con hiểu là gì?`,
            options: [ph.vi, ph.en === 'Hello' ? 'Tạm biệt' : 'Xin chào', 'Không có gì', 'Cười'].sort(() => Math.random() - 0.5),
            correctAnswer: ph.vi,
            hints: [] as string[],
            explanation: `"${ph.en}" nghĩa là "${ph.vi}".`,
            tags: ['greetings', 'phrases'],
        },
        {
            id: `en-phrase-vi-en-${idx}`,
            type: 'multiple_choice' as const,
            subject: 'english',
            difficulty: 3,
            question: `Để nói "${ph.vi}" bằng tiếng Anh, con chọn câu nào?`,
            options: [ph.en, ph.en === 'Hello' ? 'Goodbye' : 'Hello', 'What is your name?', 'Yes'].sort(() => Math.random() - 0.5),
            correctAnswer: ph.en,
            hints: [],
            explanation: `"${ph.vi}" nói là "${ph.en}".`,
            tags: ['greetings', 'phrases'],
        }
    ])
];
