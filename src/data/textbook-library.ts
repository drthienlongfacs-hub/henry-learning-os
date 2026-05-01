// ========================================
// Textbook Library — Curated Reading Materials
// Vietnamese MOE (CTGDPT 2018) + International Curricula
// Built-in passages for interactive bilingual reading
// ========================================

export type TextbookCategory = 'vn-moe' | 'cambridge' | 'oxford' | 'singapore' | 'classic';
export type SubjectArea = 'english' | 'math-en' | 'science' | 'literature' | 'social-studies';

export interface TextbookPassage {
    id: string;
    title: string;
    text: string; // English text — each word is tappable
    viSummary: string; // Vietnamese summary
    difficulty: 'easy' | 'medium' | 'hard';
    wordCount: number;
    keyVocabulary: { word: string; viMeaning: string; phonetic?: string }[];
}

export interface TextbookEntry {
    id: string;
    title: string;
    titleVi: string;
    category: TextbookCategory;
    subject: SubjectArea;
    grade: number; // 1-5
    description: string;
    descriptionVi: string;
    coverEmoji: string;
    passages: TextbookPassage[];
    sourceNote: string; // Attribution
}

// ========================================
// CURATED LIBRARY
// ========================================

export const TEXTBOOK_LIBRARY: TextbookEntry[] = [
    // --- Vietnamese MOE (CTGDPT 2018) — English Subject ---
    {
        id: 'vn-english-g1',
        title: 'English 1 — Global Success',
        titleVi: 'Tiếng Anh 1 — Kết nối tri thức',
        category: 'vn-moe',
        subject: 'english',
        grade: 1,
        description: 'MOE Grade 1 English — basic greetings, colors, numbers, family',
        descriptionVi: 'Tiếng Anh lớp 1 Bộ GD&ĐT — chào hỏi, màu sắc, số đếm, gia đình',
        coverEmoji: '🇻🇳',
        sourceNote: 'Adapted from CTGDPT 2018 curriculum framework',
        passages: [
            {
                id: 'vn-e1-p1',
                title: 'Hello! My Name Is...',
                text: 'Hello! My name is Minh. I am six years old. I live in Ho Chi Minh City. I go to school every day. I like to play with my friends. We play in the park after school. My favorite color is blue. I have a dog. His name is Lucky. He is very friendly.',
                viSummary: 'Xin chào! Tên mình là Minh. Mình 6 tuổi, sống ở TP.HCM. Mình đi học mỗi ngày và thích chơi với bạn bè ở công viên. Màu yêu thích là xanh dương. Mình có một con chó tên Lucky rất thân thiện.',
                difficulty: 'easy',
                wordCount: 56,
                keyVocabulary: [
                    { word: 'hello', viMeaning: 'xin chào', phonetic: '/həˈloʊ/' },
                    { word: 'name', viMeaning: 'tên', phonetic: '/neɪm/' },
                    { word: 'school', viMeaning: 'trường học', phonetic: '/skuːl/' },
                    { word: 'friends', viMeaning: 'bạn bè', phonetic: '/frɛndz/' },
                    { word: 'favorite', viMeaning: 'yêu thích', phonetic: '/ˈfeɪvərɪt/' },
                    { word: 'friendly', viMeaning: 'thân thiện', phonetic: '/ˈfrɛndli/' },
                ],
            },
            {
                id: 'vn-e1-p2',
                title: 'My Family',
                text: 'This is my family. My father is a doctor. My mother is a teacher. I have one sister. Her name is Lan. She is four years old. We live in a big house. My grandmother lives with us. She cooks delicious food. I love my family very much.',
                viSummary: 'Đây là gia đình mình. Bố là bác sĩ, mẹ là giáo viên. Mình có một em gái tên Lan, 4 tuổi. Gia đình sống trong nhà to. Bà ngoại ở cùng và nấu ăn rất ngon.',
                difficulty: 'easy',
                wordCount: 54,
                keyVocabulary: [
                    { word: 'family', viMeaning: 'gia đình', phonetic: '/ˈfæmɪli/' },
                    { word: 'doctor', viMeaning: 'bác sĩ', phonetic: '/ˈdɑːktər/' },
                    { word: 'teacher', viMeaning: 'giáo viên', phonetic: '/ˈtiːtʃər/' },
                    { word: 'grandmother', viMeaning: 'bà ngoại/bà nội', phonetic: '/ˈɡrænˌmʌðər/' },
                    { word: 'delicious', viMeaning: 'ngon', phonetic: '/dɪˈlɪʃəs/' },
                ],
            },
        ],
    },
    {
        id: 'vn-english-g2',
        title: 'English 2 — Global Success',
        titleVi: 'Tiếng Anh 2 — Kết nối tri thức',
        category: 'vn-moe',
        subject: 'english',
        grade: 2,
        description: 'MOE Grade 2 English — daily routines, weather, animals, hobbies',
        descriptionVi: 'Tiếng Anh lớp 2 — sinh hoạt hàng ngày, thời tiết, động vật, sở thích',
        coverEmoji: '🇻🇳',
        sourceNote: 'Adapted from CTGDPT 2018 curriculum framework',
        passages: [
            {
                id: 'vn-e2-p1',
                title: 'My Day',
                text: 'I wake up at six o\'clock every morning. First, I brush my teeth and wash my face. Then I eat breakfast with my family. I usually eat rice and eggs. After breakfast, I walk to school with my mother. School starts at seven thirty. I study many subjects like math, Vietnamese, and English. After school, I do my homework. Then I play outside until dinner time.',
                viSummary: 'Mình thức dậy lúc 6 giờ sáng. Đánh răng rửa mặt rồi ăn sáng cùng gia đình. Đi bộ tới trường với mẹ. Trường bắt đầu lúc 7:30. Học nhiều môn rồi về nhà làm bài tập.',
                difficulty: 'easy',
                wordCount: 73,
                keyVocabulary: [
                    { word: 'breakfast', viMeaning: 'bữa sáng', phonetic: '/ˈbrɛkfəst/' },
                    { word: 'usually', viMeaning: 'thường', phonetic: '/ˈjuːʒuəli/' },
                    { word: 'subjects', viMeaning: 'các môn học', phonetic: '/ˈsʌbdʒɪkts/' },
                    { word: 'homework', viMeaning: 'bài tập về nhà', phonetic: '/ˈhoʊmwɜːrk/' },
                ],
            },
        ],
    },
    {
        id: 'vn-english-g3',
        title: 'English 3 — Global Success',
        titleVi: 'Tiếng Anh 3 — Kết nối tri thức',
        category: 'vn-moe',
        subject: 'english',
        grade: 3,
        description: 'MOE Grade 3 English — community, travel, environment, seasons',
        descriptionVi: 'Tiếng Anh lớp 3 — cộng đồng, du lịch, môi trường, mùa',
        coverEmoji: '🇻🇳',
        sourceNote: 'Adapted from CTGDPT 2018 curriculum framework',
        passages: [
            {
                id: 'vn-e3-p1',
                title: 'The Four Seasons in Vietnam',
                text: 'Vietnam has different weather in different places. In the north, there are four seasons: spring, summer, autumn, and winter. Spring is warm and flowers bloom everywhere. Summer is very hot. People go swimming in the sea. Autumn is cool and the leaves change color. Winter is cold and people wear thick jackets. In the south, there are only two seasons: the rainy season and the dry season. The rainy season starts in May.',
                viSummary: 'Việt Nam có thời tiết khác nhau ở mỗi vùng. Miền Bắc có 4 mùa: xuân, hạ, thu, đông. Miền Nam chỉ có 2 mùa: mùa mưa và mùa khô.',
                difficulty: 'medium',
                wordCount: 82,
                keyVocabulary: [
                    { word: 'seasons', viMeaning: 'mùa', phonetic: '/ˈsiːzənz/' },
                    { word: 'bloom', viMeaning: 'nở hoa', phonetic: '/bluːm/' },
                    { word: 'autumn', viMeaning: 'mùa thu', phonetic: '/ˈɔːtəm/' },
                    { word: 'temperature', viMeaning: 'nhiệt độ', phonetic: '/ˈtɛmpərətʃər/' },
                    { word: 'jackets', viMeaning: 'áo khoác', phonetic: '/ˈdʒækɪts/' },
                ],
            },
        ],
    },

    // --- Cambridge Primary ---
    {
        id: 'cambridge-science-g3',
        title: 'Cambridge Primary Science Stage 3',
        titleVi: 'Khoa học Cambridge Tiểu học Giai đoạn 3',
        category: 'cambridge',
        subject: 'science',
        grade: 3,
        description: 'Living things, materials, forces — inquiry-based learning',
        descriptionVi: 'Sinh vật, vật liệu, lực — học tập dựa trên khám phá',
        coverEmoji: '🔬',
        sourceNote: 'Inspired by Cambridge Primary Science Framework',
        passages: [
            {
                id: 'cam-sci3-p1',
                title: 'What Do Plants Need?',
                text: 'Plants are living things. They need water, sunlight, and air to grow. The roots of a plant take in water from the soil. The leaves use sunlight to make food. This process is called photosynthesis. Without sunlight, plants cannot make food and they will die. Some plants grow very fast, like bamboo. Other plants, like oak trees, grow very slowly. All plants produce oxygen, which is the gas that humans need to breathe.',
                viSummary: 'Thực vật là sinh vật sống. Chúng cần nước, ánh sáng và không khí để phát triển. Rễ hút nước từ đất. Lá dùng ánh sáng để tạo thức ăn qua quang hợp. Tất cả thực vật tạo ra oxy cho con người thở.',
                difficulty: 'medium',
                wordCount: 79,
                keyVocabulary: [
                    { word: 'photosynthesis', viMeaning: 'quang hợp', phonetic: '/ˌfoʊtoʊˈsɪnθəsɪs/' },
                    { word: 'roots', viMeaning: 'rễ cây', phonetic: '/ruːts/' },
                    { word: 'oxygen', viMeaning: 'oxy', phonetic: '/ˈɑːksɪdʒən/' },
                    { word: 'soil', viMeaning: 'đất', phonetic: '/sɔɪl/' },
                    { word: 'breathe', viMeaning: 'thở', phonetic: '/briːð/' },
                ],
            },
        ],
    },

    // --- Oxford Reading Tree ---
    {
        id: 'oxford-reading-g1',
        title: 'Oxford Reading Tree — Stage 3',
        titleVi: 'Oxford Đọc sách — Giai đoạn 3',
        category: 'oxford',
        subject: 'literature',
        grade: 1,
        description: 'Classic graded readers — stories about Kipper, Biff, and Chip',
        descriptionVi: 'Truyện đọc phân cấp kinh điển — về Kipper, Biff và Chip',
        coverEmoji: '🌳',
        sourceNote: 'Original passages inspired by Oxford Reading Tree methodology',
        passages: [
            {
                id: 'ort-s3-p1',
                title: 'A Day at the Beach',
                text: 'The family went to the beach on Saturday. The children were very excited. They built a big sandcastle near the water. Dad helped them dig a deep moat around it. Mom sat under a colorful umbrella and read her book. The waves came closer and closer. Suddenly, a big wave crashed into the sandcastle! The children laughed and started to build a new one. They had so much fun that they did not want to go home.',
                viSummary: 'Gia đình đi biển ngày thứ Bảy. Bọn trẻ xây lâu đài cát lớn. Bố giúp đào hào xung quanh. Mẹ ngồi đọc sách dưới ô. Một con sóng lớn đánh sập lâu đài! Bọn trẻ cười và xây lại cái mới.',
                difficulty: 'easy',
                wordCount: 76,
                keyVocabulary: [
                    { word: 'sandcastle', viMeaning: 'lâu đài cát', phonetic: '/ˈsændˌkæsəl/' },
                    { word: 'excited', viMeaning: 'phấn khích', phonetic: '/ɪkˈsaɪtɪd/' },
                    { word: 'moat', viMeaning: 'hào (quanh lâu đài)', phonetic: '/moʊt/' },
                    { word: 'umbrella', viMeaning: 'cái ô/dù', phonetic: '/ʌmˈbrɛlə/' },
                    { word: 'crashed', viMeaning: 'đâm/va vào', phonetic: '/kræʃt/' },
                    { word: 'waves', viMeaning: 'sóng', phonetic: '/weɪvz/' },
                ],
            },
        ],
    },

    // --- Singapore Math (English) ---
    {
        id: 'singapore-math-g2',
        title: 'Singapore Math — Primary 2 Word Problems',
        titleVi: 'Toán Singapore — Lớp 2 Toán có lời văn',
        category: 'singapore',
        subject: 'math-en',
        grade: 2,
        description: 'Math word problems in English — CPA approach',
        descriptionVi: 'Toán có lời văn tiếng Anh — phương pháp CPA',
        coverEmoji: '🔢',
        sourceNote: 'Inspired by Singapore Primary Mathematics curriculum',
        passages: [
            {
                id: 'sg-m2-p1',
                title: 'Shopping at the Market',
                text: 'Lily goes to the market with her mother. She buys three apples. Each apple costs two dollars. How much does she pay for all the apples? Her mother buys five oranges. Each orange costs one dollar. How much do the oranges cost in total? How much money do they spend altogether? Lily has ten dollars. How much change does she get back after buying the apples?',
                viSummary: 'Lily đi chợ với mẹ. Cô mua 3 quả táo, mỗi quả 2 đô-la. Mẹ mua 5 quả cam, mỗi quả 1 đô-la. Tính tổng tiền và tiền thối.',
                difficulty: 'easy',
                wordCount: 67,
                keyVocabulary: [
                    { word: 'costs', viMeaning: 'có giá', phonetic: '/kɒsts/' },
                    { word: 'total', viMeaning: 'tổng cộng', phonetic: '/ˈtoʊtəl/' },
                    { word: 'altogether', viMeaning: 'tất cả', phonetic: '/ˌɔːltəˈɡɛðər/' },
                    { word: 'change', viMeaning: 'tiền thối', phonetic: '/tʃeɪndʒ/' },
                ],
            },
        ],
    },

    // --- Classic Literature ---
    {
        id: 'classic-aesop-g2',
        title: 'Aesop\'s Fables — Easy Read',
        titleVi: 'Truyện Ngụ Ngôn Aesop — Đọc Dễ',
        category: 'classic',
        subject: 'literature',
        grade: 2,
        description: 'Timeless fables with moral lessons — adapted for young readers',
        descriptionVi: 'Ngụ ngôn kinh điển có bài học đạo đức — chuyển thể cho trẻ nhỏ',
        coverEmoji: '🦊',
        sourceNote: 'Public domain — Aesop\'s Fables',
        passages: [
            {
                id: 'aesop-p1',
                title: 'The Tortoise and the Hare',
                text: 'Once upon a time, there was a hare who was very proud of being fast. He always made fun of the slow tortoise. One day, the tortoise challenged the hare to a race. The hare laughed and agreed. When the race started, the hare ran very fast and soon got far ahead. He decided to take a nap under a tree because he was so confident. Meanwhile, the tortoise kept walking slowly but steadily. When the hare woke up, the tortoise was already near the finish line. The hare ran as fast as he could, but it was too late. The tortoise won the race! The lesson is: slow and steady wins the race.',
                viSummary: 'Thỏ kiêu ngạo vì chạy nhanh, hay chê rùa chậm. Rùa thách thỏ chạy đua. Thỏ chạy nhanh rồi ngủ quên vì tự tin. Rùa đi chậm nhưng đều. Khi thỏ tỉnh dậy, rùa đã gần đích. Rùa thắng! Bài học: chậm mà chắc thì thắng.',
                difficulty: 'medium',
                wordCount: 120,
                keyVocabulary: [
                    { word: 'tortoise', viMeaning: 'con rùa', phonetic: '/ˈtɔːrtəs/' },
                    { word: 'hare', viMeaning: 'con thỏ rừng', phonetic: '/hɛr/' },
                    { word: 'challenged', viMeaning: 'thách thức', phonetic: '/ˈtʃælɪndʒd/' },
                    { word: 'confident', viMeaning: 'tự tin', phonetic: '/ˈkɑːnfɪdənt/' },
                    { word: 'steadily', viMeaning: 'đều đặn', phonetic: '/ˈstɛdɪli/' },
                    { word: 'meanwhile', viMeaning: 'trong khi đó', phonetic: '/ˈmiːnwaɪl/' },
                ],
            },
            {
                id: 'aesop-p2',
                title: 'The Fox and the Grapes',
                text: 'A hungry fox saw some beautiful grapes hanging high on a vine. The grapes looked sweet and juicy. The fox jumped and jumped, trying to reach them. But the grapes were too high. After many tries, the fox gave up. As he walked away, he said to himself, "Those grapes are probably sour anyway." The lesson is: it is easy to hate what you cannot have.',
                viSummary: 'Cáo đói thấy chùm nho đẹp treo cao. Cáo nhảy mãi không tới. Bỏ cuộc, cáo tự an ủi: "Nho chắc chua lắm." Bài học: dễ chê bai thứ ta không có được.',
                difficulty: 'easy',
                wordCount: 70,
                keyVocabulary: [
                    { word: 'grapes', viMeaning: 'nho', phonetic: '/ɡreɪps/' },
                    { word: 'vine', viMeaning: 'dây leo/giàn nho', phonetic: '/vaɪn/' },
                    { word: 'juicy', viMeaning: 'mọng nước', phonetic: '/ˈdʒuːsi/' },
                    { word: 'sour', viMeaning: 'chua', phonetic: '/ˈsaʊər/' },
                    { word: 'probably', viMeaning: 'có lẽ', phonetic: '/ˈprɑːbəbli/' },
                ],
            },
        ],
    },
    {
        id: 'vn-english-g4',
        title: 'English 4 — Global Success',
        titleVi: 'Tiếng Anh 4 — Kết nối tri thức',
        category: 'vn-moe',
        subject: 'english',
        grade: 4,
        description: 'MOE Grade 4 English — places, food, celebrations, the future',
        descriptionVi: 'Tiếng Anh lớp 4 — địa danh, ẩm thực, lễ hội, tương lai',
        coverEmoji: '🇻🇳',
        sourceNote: 'Adapted from CTGDPT 2018 curriculum framework',
        passages: [
            {
                id: 'vn-e4-p1',
                title: 'Traditional Vietnamese Food',
                text: 'Vietnam is famous for its delicious food. Pho is the most popular dish. It is a noodle soup with beef or chicken. People eat pho for breakfast. Banh mi is a Vietnamese sandwich with meat, vegetables, and special sauce inside a crispy bread roll. Spring rolls are another favorite. They can be fried or fresh. Each region in Vietnam has its own special dishes. In the south, people like sweet food. In the north, the food is less sweet but very flavorful.',
                viSummary: 'Việt Nam nổi tiếng với ẩm thực. Phở là món phổ biến nhất — mì nước với bò hoặc gà. Bánh mì kẹp thịt, rau và nước sốt. Nem cuốn cũng được yêu thích. Mỗi vùng có món đặc trưng riêng.',
                difficulty: 'medium',
                wordCount: 85,
                keyVocabulary: [
                    { word: 'famous', viMeaning: 'nổi tiếng', phonetic: '/ˈfeɪməs/' },
                    { word: 'popular', viMeaning: 'phổ biến', phonetic: '/ˈpɑːpjələr/' },
                    { word: 'vegetables', viMeaning: 'rau củ', phonetic: '/ˈvɛdʒtəbəlz/' },
                    { word: 'region', viMeaning: 'vùng/miền', phonetic: '/ˈriːdʒən/' },
                    { word: 'flavorful', viMeaning: 'đậm đà', phonetic: '/ˈfleɪvərfəl/' },
                ],
            },
        ],
    },
    {
        id: 'vn-english-g5',
        title: 'English 5 — Global Success',
        titleVi: 'Tiếng Anh 5 — Kết nối tri thức',
        category: 'vn-moe',
        subject: 'english',
        grade: 5,
        description: 'MOE Grade 5 English — technology, environment, global citizenship',
        descriptionVi: 'Tiếng Anh lớp 5 — công nghệ, môi trường, công dân toàn cầu',
        coverEmoji: '🇻🇳',
        sourceNote: 'Adapted from CTGDPT 2018 curriculum framework',
        passages: [
            {
                id: 'vn-e5-p1',
                title: 'Protecting Our Environment',
                text: 'Our planet Earth needs our help. Every year, people produce millions of tons of trash. Plastic bags and bottles take hundreds of years to decompose. We can help by following the three Rs: Reduce, Reuse, and Recycle. Reduce means using less. For example, bring your own water bottle instead of buying plastic ones. Reuse means using things again. Old clothes can be donated to people who need them. Recycle means turning old materials into new products. Together, we can make our planet cleaner and healthier for future generations.',
                viSummary: 'Trái Đất cần sự giúp đỡ của chúng ta. Rác nhựa mất hàng trăm năm để phân hủy. Hãy thực hiện 3R: Giảm thiểu (dùng ít hơn), Tái sử dụng (dùng lại), Tái chế (biến đồ cũ thành sản phẩm mới). Cùng nhau bảo vệ hành tinh xanh.',
                difficulty: 'hard',
                wordCount: 95,
                keyVocabulary: [
                    { word: 'environment', viMeaning: 'môi trường', phonetic: '/ɪnˈvaɪrənmənt/' },
                    { word: 'decompose', viMeaning: 'phân hủy', phonetic: '/ˌdiːkəmˈpoʊz/' },
                    { word: 'recycle', viMeaning: 'tái chế', phonetic: '/riːˈsaɪkəl/' },
                    { word: 'donated', viMeaning: 'quyên góp', phonetic: '/ˈdoʊneɪtɪd/' },
                    { word: 'generations', viMeaning: 'thế hệ', phonetic: '/ˌdʒɛnəˈreɪʃənz/' },
                ],
            },
        ],
    },
];

// ========================================
// HELPERS
// ========================================

export const CATEGORY_LABELS: Record<TextbookCategory, { vi: string; en: string; emoji: string }> = {
    'vn-moe': { vi: 'Bộ GD&ĐT', en: 'Vietnam MOE', emoji: '🇻🇳' },
    'cambridge': { vi: 'Cambridge', en: 'Cambridge', emoji: '🎓' },
    'oxford': { vi: 'Oxford', en: 'Oxford', emoji: '🌳' },
    'singapore': { vi: 'Singapore', en: 'Singapore', emoji: '🇸🇬' },
    'classic': { vi: 'Kinh điển', en: 'Classics', emoji: '📚' },
};

export function getTextbooksByGrade(grade: number): TextbookEntry[] {
    return TEXTBOOK_LIBRARY.filter(book => book.grade === grade);
}

export function getTextbooksByCategory(category: TextbookCategory): TextbookEntry[] {
    return TEXTBOOK_LIBRARY.filter(book => book.category === category);
}

export function getAllPassages(): (TextbookPassage & { bookTitle: string; bookId: string; grade: number })[] {
    return TEXTBOOK_LIBRARY.flatMap(book =>
        book.passages.map(p => ({ ...p, bookTitle: book.title, bookId: book.id, grade: book.grade }))
    );
}

export const LIBRARY_STATS = {
    totalBooks: TEXTBOOK_LIBRARY.length,
    totalPassages: TEXTBOOK_LIBRARY.reduce((sum, b) => sum + b.passages.length, 0),
    grades: [...new Set(TEXTBOOK_LIBRARY.map(b => b.grade))].sort(),
    categories: [...new Set(TEXTBOOK_LIBRARY.map(b => b.category))],
};
