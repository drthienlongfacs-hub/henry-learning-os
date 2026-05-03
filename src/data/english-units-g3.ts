// ═══════════════════════════════════════════════════════
// English Grade 3 — Global Success (Kết nối tri thức)
// 20 Units × vocab + patterns + exercises
// Source: BGDDT CTGDPT 2018, Global Success textbook
// ═══════════════════════════════════════════════════════

export interface VocabItem {
    en: string;
    vi: string;
    img?: string;
    audio?: string;
}

export interface PatternItem {
    pattern: string;
    example: string;
    exampleVi: string;
    slots: string[];
}

export interface UnitData {
    unitId: string;
    unitNumber: number;
    grade: number;
    title: string;
    titleVi: string;
    textbook: string;
    vocabulary: VocabItem[];
    patterns: PatternItem[];
}

export const GRADE3_UNITS: UnitData[] = [
    {
        unitId: 'g3_u01', unitNumber: 1, grade: 3, title: 'Hello', titleVi: 'Xin chào', textbook: 'global_success',
        vocabulary: [
            { en: 'hello', vi: 'xin chào' }, { en: 'hi', vi: 'chào' }, { en: 'goodbye', vi: 'tạm biệt' },
            { en: 'bye', vi: 'tạm biệt' }, { en: 'morning', vi: 'buổi sáng' }, { en: 'afternoon', vi: 'buổi chiều' },
            { en: 'nice', vi: 'vui' }, { en: 'meet', vi: 'gặp' }, { en: 'too', vi: 'cũng vậy' },
        ],
        patterns: [
            { pattern: 'Hello, I\'m ___.', example: 'Hello, I\'m Mai.', exampleVi: 'Xin chào, tôi là Mai.', slots: ['Mai', 'Nam', 'Lan', 'Henry'] },
            { pattern: 'Hi, ___. Nice to meet you.', example: 'Hi, Nam. Nice to meet you.', exampleVi: 'Chào Nam. Rất vui được gặp bạn.', slots: ['Nam', 'Mai', 'Lan', 'Tom'] },
        ],
    },
    {
        unitId: 'g3_u02', unitNumber: 2, grade: 3, title: 'Our names', titleVi: 'Tên chúng mình', textbook: 'global_success',
        vocabulary: [
            { en: 'name', vi: 'tên' }, { en: 'my', vi: 'của tôi' }, { en: 'your', vi: 'của bạn' },
            { en: 'what', vi: 'cái gì' }, { en: 'spell', vi: 'đánh vần' }, { en: 'please', vi: 'làm ơn' },
            { en: 'friend', vi: 'bạn' }, { en: 'yes', vi: 'vâng' }, { en: 'no', vi: 'không' },
        ],
        patterns: [
            { pattern: 'What\'s your name? My name\'s ___.', example: 'What\'s your name? My name\'s Mai.', exampleVi: 'Bạn tên gì? Tên tôi là Mai.', slots: ['Mai', 'Nam', 'Henry', 'Lan'] },
            { pattern: 'How do you spell your name? ___', example: 'How do you spell your name? M-A-I.', exampleVi: 'Bạn đánh vần tên mình thế nào? M-A-I.', slots: ['M-A-I', 'N-A-M', 'L-A-N'] },
        ],
    },
    {
        unitId: 'g3_u03', unitNumber: 3, grade: 3, title: 'Our friends', titleVi: 'Bạn bè chúng mình', textbook: 'global_success',
        vocabulary: [
            { en: 'he', vi: 'anh ấy' }, { en: 'she', vi: 'cô ấy' }, { en: 'this', vi: 'đây' },
            { en: 'that', vi: 'kia' }, { en: 'boy', vi: 'bạn trai' }, { en: 'girl', vi: 'bạn gái' },
            { en: 'friend', vi: 'bạn' }, { en: 'new', vi: 'mới' }, { en: 'old', vi: 'cũ/già' },
        ],
        patterns: [
            { pattern: 'This is my friend, ___.', example: 'This is my friend, Lan.', exampleVi: 'Đây là bạn tôi, Lan.', slots: ['Lan', 'Mai', 'Nam', 'Tom'] },
            { pattern: 'Is that ___? Yes, it is. / No, it isn\'t.', example: 'Is that Mai? Yes, it is.', exampleVi: 'Đó là Mai phải không? Vâng, đúng rồi.', slots: ['Mai', 'Nam', 'Lan'] },
        ],
    },
    {
        unitId: 'g3_u04', unitNumber: 4, grade: 3, title: 'Our bodies', titleVi: 'Cơ thể chúng mình', textbook: 'global_success',
        vocabulary: [
            { en: 'head', vi: 'đầu' }, { en: 'shoulders', vi: 'vai' }, { en: 'knees', vi: 'đầu gối' },
            { en: 'toes', vi: 'ngón chân' }, { en: 'eyes', vi: 'mắt' }, { en: 'ears', vi: 'tai' },
            { en: 'mouth', vi: 'miệng' }, { en: 'nose', vi: 'mũi' }, { en: 'hands', vi: 'tay' },
            { en: 'fingers', vi: 'ngón tay' },
        ],
        patterns: [
            { pattern: 'Touch your ___.', example: 'Touch your nose.', exampleVi: 'Chạm vào mũi.', slots: ['nose', 'ears', 'head', 'knees'] },
            { pattern: 'Point to your ___.', example: 'Point to your eyes.', exampleVi: 'Chỉ vào mắt.', slots: ['eyes', 'mouth', 'hands', 'toes'] },
        ],
    },
    {
        unitId: 'g3_u05', unitNumber: 5, grade: 3, title: 'My hobbies', titleVi: 'Sở thích của tôi', textbook: 'global_success',
        vocabulary: [
            { en: 'sing', vi: 'hát' }, { en: 'dance', vi: 'nhảy' }, { en: 'draw', vi: 'vẽ' },
            { en: 'swim', vi: 'bơi' }, { en: 'cook', vi: 'nấu ăn' }, { en: 'read', vi: 'đọc' },
            { en: 'play', vi: 'chơi' }, { en: 'hobby', vi: 'sở thích' }, { en: 'like', vi: 'thích' },
        ],
        patterns: [
            { pattern: 'I like ___ing.', example: 'I like singing.', exampleVi: 'Tôi thích hát.', slots: ['singing', 'dancing', 'drawing', 'swimming'] },
            { pattern: 'I can ___.', example: 'I can swim.', exampleVi: 'Tôi biết bơi.', slots: ['swim', 'sing', 'dance', 'cook'] },
        ],
    },
    {
        unitId: 'g3_u06', unitNumber: 6, grade: 3, title: 'Our school', titleVi: 'Trường học của chúng mình', textbook: 'global_success',
        vocabulary: [
            { en: 'school', vi: 'trường' }, { en: 'classroom', vi: 'lớp học' }, { en: 'library', vi: 'thư viện' },
            { en: 'playground', vi: 'sân chơi' }, { en: 'gym', vi: 'phòng thể dục' }, { en: 'garden', vi: 'vườn' },
            { en: 'big', vi: 'to' }, { en: 'small', vi: 'nhỏ' }, { en: 'beautiful', vi: 'đẹp' },
        ],
        patterns: [
            { pattern: 'Where is the ___?', example: 'Where is the library?', exampleVi: 'Thư viện ở đâu?', slots: ['library', 'classroom', 'gym', 'playground'] },
            { pattern: 'My school is ___.', example: 'My school is big.', exampleVi: 'Trường tôi to.', slots: ['big', 'small', 'beautiful', 'new'] },
        ],
    },
    {
        unitId: 'g3_u07', unitNumber: 7, grade: 3, title: 'Classroom instructions', titleVi: 'Mệnh lệnh trong lớp', textbook: 'global_success',
        vocabulary: [
            { en: 'open', vi: 'mở' }, { en: 'close', vi: 'đóng' }, { en: 'stand up', vi: 'đứng lên' },
            { en: 'sit down', vi: 'ngồi xuống' }, { en: 'listen', vi: 'nghe' }, { en: 'repeat', vi: 'nhắc lại' },
            { en: 'write', vi: 'viết' }, { en: 'read', vi: 'đọc' }, { en: 'quiet', vi: 'im lặng' },
        ],
        patterns: [
            { pattern: '___ your book.', example: 'Open your book.', exampleVi: 'Mở sách ra.', slots: ['Open', 'Close'] },
            { pattern: '___, please.', example: 'Stand up, please.', exampleVi: 'Làm ơn đứng lên.', slots: ['Stand up', 'Sit down', 'Listen', 'Be quiet'] },
        ],
    },
    {
        unitId: 'g3_u08', unitNumber: 8, grade: 3, title: 'My school things', titleVi: 'Đồ dùng học tập', textbook: 'global_success',
        vocabulary: [
            { en: 'pen', vi: 'bút mực' }, { en: 'pencil', vi: 'bút chì' }, { en: 'ruler', vi: 'thước' },
            { en: 'eraser', vi: 'cục tẩy' }, { en: 'book', vi: 'sách' }, { en: 'notebook', vi: 'vở' },
            { en: 'pencil case', vi: 'hộp bút' }, { en: 'bag', vi: 'cặp sách' }, { en: 'crayon', vi: 'bút sáp màu' },
        ],
        patterns: [
            { pattern: 'This is my ___.', example: 'This is my pencil.', exampleVi: 'Đây là bút chì của tôi.', slots: ['pencil', 'pen', 'ruler', 'bag'] },
            { pattern: 'Do you have a ___?', example: 'Do you have a ruler?', exampleVi: 'Bạn có thước không?', slots: ['ruler', 'pen', 'eraser', 'crayon'] },
        ],
    },
    {
        unitId: 'g3_u09', unitNumber: 9, grade: 3, title: 'Colours', titleVi: 'Màu sắc', textbook: 'global_success',
        vocabulary: [
            { en: 'red', vi: 'đỏ' }, { en: 'blue', vi: 'xanh dương' }, { en: 'green', vi: 'xanh lá' },
            { en: 'yellow', vi: 'vàng' }, { en: 'orange', vi: 'cam' }, { en: 'purple', vi: 'tím' },
            { en: 'pink', vi: 'hồng' }, { en: 'white', vi: 'trắng' }, { en: 'black', vi: 'đen' },
            { en: 'brown', vi: 'nâu' },
        ],
        patterns: [
            { pattern: 'What colour is it? It\'s ___.', example: 'What colour is it? It\'s red.', exampleVi: 'Nó màu gì? Nó màu đỏ.', slots: ['red', 'blue', 'green', 'yellow'] },
            { pattern: 'I like ___.', example: 'I like blue.', exampleVi: 'Tôi thích màu xanh dương.', slots: ['blue', 'red', 'pink', 'green'] },
        ],
    },
    {
        unitId: 'g3_u10', unitNumber: 10, grade: 3, title: 'Break time activities', titleVi: 'Hoạt động giờ ra chơi', textbook: 'global_success',
        vocabulary: [
            { en: 'skip', vi: 'nhảy dây' }, { en: 'hop', vi: 'nhảy lò cò' }, { en: 'run', vi: 'chạy' },
            { en: 'jump', vi: 'nhảy' }, { en: 'play', vi: 'chơi' }, { en: 'hide and seek', vi: 'trốn tìm' },
            { en: 'tag', vi: 'đuổi bắt' }, { en: 'chat', vi: 'nói chuyện' }, { en: 'fun', vi: 'vui' },
        ],
        patterns: [
            { pattern: 'Let\'s ___.', example: 'Let\'s play tag.', exampleVi: 'Chúng mình chơi đuổi bắt đi.', slots: ['play tag', 'skip', 'run', 'play hide and seek'] },
            { pattern: 'Do you want to ___?', example: 'Do you want to skip?', exampleVi: 'Bạn muốn nhảy dây không?', slots: ['skip', 'run', 'jump', 'play'] },
        ],
    },
    {
        unitId: 'g3_u11', unitNumber: 11, grade: 3, title: 'My family', titleVi: 'Gia đình tôi', textbook: 'global_success',
        vocabulary: [
            { en: 'family', vi: 'gia đình' }, { en: 'mother', vi: 'mẹ' }, { en: 'father', vi: 'bố' },
            { en: 'brother', vi: 'anh/em trai' }, { en: 'sister', vi: 'chị/em gái' }, { en: 'grandmother', vi: 'bà' },
            { en: 'grandfather', vi: 'ông' }, { en: 'baby', vi: 'em bé' }, { en: 'love', vi: 'yêu thương' },
        ],
        patterns: [
            { pattern: 'Who is this? This is my ___.', example: 'Who is this? This is my mother.', exampleVi: 'Đây là ai? Đây là mẹ tôi.', slots: ['mother', 'father', 'sister', 'brother'] },
            { pattern: 'I love my ___.', example: 'I love my family.', exampleVi: 'Tôi yêu gia đình mình.', slots: ['family', 'mother', 'father', 'grandmother'] },
        ],
    },
    {
        unitId: 'g3_u12', unitNumber: 12, grade: 3, title: 'Jobs', titleVi: 'Nghề nghiệp', textbook: 'global_success',
        vocabulary: [
            { en: 'teacher', vi: 'giáo viên' }, { en: 'doctor', vi: 'bác sĩ' }, { en: 'farmer', vi: 'nông dân' },
            { en: 'driver', vi: 'tài xế' }, { en: 'nurse', vi: 'y tá' }, { en: 'worker', vi: 'công nhân' },
            { en: 'police officer', vi: 'cảnh sát' }, { en: 'cook', vi: 'đầu bếp' }, { en: 'job', vi: 'nghề' },
        ],
        patterns: [
            { pattern: 'What does he/she do? He/She is a ___.', example: 'What does she do? She is a teacher.', exampleVi: 'Cô ấy làm nghề gì? Cô ấy là giáo viên.', slots: ['teacher', 'doctor', 'farmer', 'nurse'] },
            { pattern: 'My ___ is a ___.', example: 'My father is a doctor.', exampleVi: 'Bố tôi là bác sĩ.', slots: ['father|doctor', 'mother|teacher', 'brother|driver'] },
        ],
    },
    {
        unitId: 'g3_u13', unitNumber: 13, grade: 3, title: 'My house', titleVi: 'Ngôi nhà của tôi', textbook: 'global_success',
        vocabulary: [
            { en: 'house', vi: 'nhà' }, { en: 'living room', vi: 'phòng khách' }, { en: 'bedroom', vi: 'phòng ngủ' },
            { en: 'kitchen', vi: 'nhà bếp' }, { en: 'bathroom', vi: 'phòng tắm' }, { en: 'garden', vi: 'vườn' },
            { en: 'door', vi: 'cửa ra vào' }, { en: 'window', vi: 'cửa sổ' }, { en: 'room', vi: 'phòng' },
        ],
        patterns: [
            { pattern: 'There is a ___ in my house.', example: 'There is a garden in my house.', exampleVi: 'Nhà tôi có một khu vườn.', slots: ['garden', 'living room', 'kitchen', 'bathroom'] },
            { pattern: 'How many rooms are there?', example: 'There are four rooms.', exampleVi: 'Có bốn phòng.', slots: ['four', 'three', 'five', 'six'] },
        ],
    },
    {
        unitId: 'g3_u14', unitNumber: 14, grade: 3, title: 'My bedroom', titleVi: 'Phòng ngủ của tôi', textbook: 'global_success',
        vocabulary: [
            { en: 'bed', vi: 'giường' }, { en: 'desk', vi: 'bàn học' }, { en: 'chair', vi: 'ghế' },
            { en: 'lamp', vi: 'đèn' }, { en: 'doll', vi: 'búp bê' }, { en: 'pillow', vi: 'gối' },
            { en: 'wardrobe', vi: 'tủ quần áo' }, { en: 'shelf', vi: 'kệ sách' }, { en: 'poster', vi: 'áp phích' },
        ],
        patterns: [
            { pattern: 'Where is the ___? It\'s on/in/under the ___.', example: 'Where is the doll? It\'s on the bed.', exampleVi: 'Con búp bê ở đâu? Nó ở trên giường.', slots: ['doll|bed', 'lamp|desk', 'book|shelf'] },
            { pattern: 'I have a ___ in my bedroom.', example: 'I have a desk in my bedroom.', exampleVi: 'Tôi có một bàn học trong phòng ngủ.', slots: ['desk', 'bed', 'wardrobe', 'lamp'] },
        ],
    },
    {
        unitId: 'g3_u15', unitNumber: 15, grade: 3, title: 'At the dining table', titleVi: 'Trên bàn ăn', textbook: 'global_success',
        vocabulary: [
            { en: 'rice', vi: 'cơm' }, { en: 'bread', vi: 'bánh mì' }, { en: 'milk', vi: 'sữa' },
            { en: 'egg', vi: 'trứng' }, { en: 'juice', vi: 'nước ép' }, { en: 'water', vi: 'nước' },
            { en: 'chicken', vi: 'gà' }, { en: 'fish', vi: 'cá' }, { en: 'noodles', vi: 'mì/phở' },
            { en: 'fruit', vi: 'trái cây' },
        ],
        patterns: [
            { pattern: 'I\'d like some ___, please.', example: 'I\'d like some milk, please.', exampleVi: 'Cho tôi xin một ít sữa.', slots: ['milk', 'rice', 'juice', 'bread'] },
            { pattern: 'Do you like ___?', example: 'Do you like fish?', exampleVi: 'Bạn có thích cá không?', slots: ['fish', 'chicken', 'noodles', 'egg'] },
        ],
    },
    {
        unitId: 'g3_u16', unitNumber: 16, grade: 3, title: 'My pets', titleVi: 'Thú cưng của tôi', textbook: 'global_success',
        vocabulary: [
            { en: 'dog', vi: 'chó' }, { en: 'cat', vi: 'mèo' }, { en: 'fish', vi: 'cá' },
            { en: 'bird', vi: 'chim' }, { en: 'rabbit', vi: 'thỏ' }, { en: 'hamster', vi: 'chuột hamster' },
            { en: 'turtle', vi: 'rùa' }, { en: 'cute', vi: 'dễ thương' }, { en: 'pet', vi: 'thú cưng' },
        ],
        patterns: [
            { pattern: 'I have a ___.', example: 'I have a dog.', exampleVi: 'Tôi có một con chó.', slots: ['dog', 'cat', 'rabbit', 'bird'] },
            { pattern: 'My ___ is ___.', example: 'My cat is cute.', exampleVi: 'Con mèo của tôi dễ thương.', slots: ['cat|cute', 'dog|big', 'bird|small', 'rabbit|white'] },
        ],
    },
    {
        unitId: 'g3_u17', unitNumber: 17, grade: 3, title: 'Our toys', titleVi: 'Đồ chơi của chúng mình', textbook: 'global_success',
        vocabulary: [
            { en: 'ball', vi: 'quả bóng' }, { en: 'kite', vi: 'diều' }, { en: 'car', vi: 'xe ô tô' },
            { en: 'robot', vi: 'người máy' }, { en: 'puzzle', vi: 'xếp hình' }, { en: 'teddy bear', vi: 'gấu bông' },
            { en: 'yo-yo', vi: 'yô-yô' }, { en: 'toy', vi: 'đồ chơi' }, { en: 'favourite', vi: 'yêu thích' },
        ],
        patterns: [
            { pattern: 'Do you have a ___?', example: 'Do you have a robot?', exampleVi: 'Bạn có người máy không?', slots: ['robot', 'ball', 'kite', 'puzzle'] },
            { pattern: 'My favourite toy is a ___.', example: 'My favourite toy is a teddy bear.', exampleVi: 'Đồ chơi yêu thích của tôi là gấu bông.', slots: ['teddy bear', 'robot', 'car', 'ball'] },
        ],
    },
    {
        unitId: 'g3_u18', unitNumber: 18, grade: 3, title: 'Playing and doing', titleVi: 'Chơi và làm', textbook: 'global_success',
        vocabulary: [
            { en: 'flying', vi: 'thả (diều)' }, { en: 'riding', vi: 'đi (xe)' }, { en: 'making', vi: 'làm' },
            { en: 'painting', vi: 'vẽ tranh' }, { en: 'playing', vi: 'đang chơi' }, { en: 'reading', vi: 'đang đọc' },
            { en: 'writing', vi: 'đang viết' }, { en: 'singing', vi: 'đang hát' }, { en: 'doing', vi: 'đang làm' },
        ],
        patterns: [
            { pattern: 'What are you doing? I\'m ___ing.', example: 'What are you doing? I\'m painting.', exampleVi: 'Bạn đang làm gì? Tôi đang vẽ tranh.', slots: ['painting', 'reading', 'singing', 'writing'] },
            { pattern: 'She is ___ a kite.', example: 'She is flying a kite.', exampleVi: 'Cô ấy đang thả diều.', slots: ['flying', 'making', 'riding'] },
        ],
    },
    {
        unitId: 'g3_u19', unitNumber: 19, grade: 3, title: 'Outdoor activities', titleVi: 'Hoạt động ngoài trời', textbook: 'global_success',
        vocabulary: [
            { en: 'cycling', vi: 'đạp xe' }, { en: 'jogging', vi: 'chạy bộ' }, { en: 'camping', vi: 'cắm trại' },
            { en: 'fishing', vi: 'câu cá' }, { en: 'skating', vi: 'trượt patin' }, { en: 'climbing', vi: 'leo trèo' },
            { en: 'walking', vi: 'đi bộ' }, { en: 'outside', vi: 'bên ngoài' }, { en: 'park', vi: 'công viên' },
        ],
        patterns: [
            { pattern: 'Let\'s go ___!', example: 'Let\'s go cycling!', exampleVi: 'Chúng mình đi đạp xe nào!', slots: ['cycling', 'fishing', 'camping', 'jogging'] },
            { pattern: 'I like ___ in the park.', example: 'I like jogging in the park.', exampleVi: 'Tôi thích chạy bộ trong công viên.', slots: ['jogging', 'cycling', 'walking', 'skating'] },
        ],
    },
    {
        unitId: 'g3_u20', unitNumber: 20, grade: 3, title: 'At the zoo', titleVi: 'Ở sở thú', textbook: 'global_success',
        vocabulary: [
            { en: 'elephant', vi: 'voi' }, { en: 'tiger', vi: 'hổ' }, { en: 'monkey', vi: 'khỉ' },
            { en: 'lion', vi: 'sư tử' }, { en: 'bear', vi: 'gấu' }, { en: 'giraffe', vi: 'hươu cao cổ' },
            { en: 'penguin', vi: 'chim cánh cụt' }, { en: 'zebra', vi: 'ngựa vằn' }, { en: 'zoo', vi: 'sở thú' },
            { en: 'big', vi: 'to' },
        ],
        patterns: [
            { pattern: 'I can see a ___.', example: 'I can see a tiger.', exampleVi: 'Tôi thấy một con hổ.', slots: ['tiger', 'elephant', 'monkey', 'lion'] },
            { pattern: 'The ___ is ___.', example: 'The elephant is big.', exampleVi: 'Con voi to.', slots: ['elephant|big', 'monkey|funny', 'giraffe|tall', 'penguin|cute'] },
        ],
    },
];
