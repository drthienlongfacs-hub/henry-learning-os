// English Grade 1-2 - Global Success companion map (CTGDPT 2018).
// This is a unit-level interactive companion. It must not be called a
// 100% textbook reproduction until licensed SGK pages/assets are imported
// privately and reviewed lesson by lesson.
import type { UnitData } from './english-units-g3';

export const GRADE1_UNITS: UnitData[] = [
  { unitId: 'g1_u01', unitNumber: 1, grade: 1, title: 'In the school playground', titleVi: 'Ở sân trường', textbook: 'global_success',
    vocabulary: [
      { en: 'hello', vi: 'xin chào' },
      { en: 'hi', vi: 'chào' },
      { en: 'goodbye', vi: 'tạm biệt' },
      { en: 'friend', vi: 'bạn' },
      { en: 'name', vi: 'tên' },
      { en: 'boy', vi: 'con trai' },
      { en: 'girl', vi: 'con gái' },
      { en: 'teacher', vi: 'thầy/cô giáo' },
      { en: 'play', vi: 'chơi' }
    ],
    patterns: [
      { pattern: 'Hello! I am ___.', example: 'Hello! I am Mai.', exampleVi: 'Xin chào! Tôi là Mai.', slots: ['Mai', 'Nam', 'Lan', 'Henry'] },
      { pattern: 'Hi! My name is ___.', example: 'Hi! My name is Tom.', exampleVi: 'Chào! Tên tôi là Tom.', slots: ['Tom', 'Anna', 'Ben', 'Lily'] }
    ],
  },
  { unitId: 'g1_u02', unitNumber: 2, grade: 1, title: 'In the classroom', titleVi: 'Trong lớp học', textbook: 'global_success',
    vocabulary: [
      { en: 'book', vi: 'sách' },
      { en: 'pen', vi: 'bút' },
      { en: 'pencil', vi: 'bút chì' },
      { en: 'ruler', vi: 'thước' },
      { en: 'bag', vi: 'cặp sách' },
      { en: 'desk', vi: 'bàn' },
      { en: 'chair', vi: 'ghế' },
      { en: 'open', vi: 'mở' },
      { en: 'close', vi: 'đóng' }
    ],
    patterns: [
      { pattern: 'It is a ___.', example: 'It is a pen.', exampleVi: 'Đó là cây bút.', slots: ['pen', 'book', 'ruler', 'bag'] },
      { pattern: 'Open your ___.', example: 'Open your book.', exampleVi: 'Mở sách ra.', slots: ['book', 'bag', 'pencil case'] }
    ],
  },
  { unitId: 'g1_u03', unitNumber: 3, grade: 1, title: 'At the park', titleVi: 'Ở công viên', textbook: 'global_success',
    vocabulary: [
      { en: 'tree', vi: 'cây' },
      { en: 'flower', vi: 'hoa' },
      { en: 'bird', vi: 'chim' },
      { en: 'butterfly', vi: 'bướm' },
      { en: 'swing', vi: 'xích đu' },
      { en: 'slide', vi: 'cầu trượt' },
      { en: 'bench', vi: 'ghế đá' },
      { en: 'sun', vi: 'mặt trời' },
      { en: 'grass', vi: 'cỏ' }
    ],
    patterns: [
      { pattern: 'I can see a ___.', example: 'I can see a tree.', exampleVi: 'Tôi thấy một cái cây.', slots: ['tree', 'flower', 'bird', 'butterfly'] },
      { pattern: 'Let us play on the ___.', example: 'Let us play on the swing.', exampleVi: 'Chúng ta chơi xích đu nào.', slots: ['swing', 'slide'] }
    ],
  },
  { unitId: 'g1_u04', unitNumber: 4, grade: 1, title: 'In the garden', titleVi: 'Trong vườn', textbook: 'global_success',
    vocabulary: [
      { en: 'flower', vi: 'hoa' },
      { en: 'leaf', vi: 'lá' },
      { en: 'seed', vi: 'hạt' },
      { en: 'water', vi: 'nước/tưới' },
      { en: 'dig', vi: 'đào' },
      { en: 'plant', vi: 'trồng/cây' },
      { en: 'bee', vi: 'con ong' },
      { en: 'ladybug', vi: 'bọ rùa' },
      { en: 'garden', vi: 'vườn' }
    ],
    patterns: [
      { pattern: 'I see a ___ in the garden.', example: 'I see a bee in the garden.', exampleVi: 'Tôi thấy con ong trong vườn.', slots: ['bee', 'flower', 'ladybug', 'leaf'] },
      { pattern: 'Let us ___ a seed.', example: 'Let us plant a seed.', exampleVi: 'Chúng ta trồng hạt nào.', slots: ['plant', 'water', 'dig'] }
    ],
  },
  { unitId: 'g1_u05', unitNumber: 5, grade: 1, title: 'In the house', titleVi: 'Trong nhà', textbook: 'global_success',
    vocabulary: [
      { en: 'bedroom', vi: 'phòng ngủ' },
      { en: 'kitchen', vi: 'nhà bếp' },
      { en: 'bathroom', vi: 'phòng tắm' },
      { en: 'living room', vi: 'phòng khách' },
      { en: 'door', vi: 'cửa' },
      { en: 'window', vi: 'cửa sổ' },
      { en: 'bed', vi: 'giường' },
      { en: 'table', vi: 'bàn' },
      { en: 'lamp', vi: 'đèn' }
    ],
    patterns: [
      { pattern: 'This is the ___.', example: 'This is the kitchen.', exampleVi: 'Đây là nhà bếp.', slots: ['kitchen', 'bedroom', 'bathroom', 'living room'] },
      { pattern: 'I sleep in my ___.', example: 'I sleep in my bedroom.', exampleVi: 'Tôi ngủ trong phòng ngủ.', slots: ['bedroom'] }
    ],
  },
  { unitId: 'g1_u06', unitNumber: 6, grade: 1, title: 'At the beach', titleVi: 'Ở bãi biển', textbook: 'global_success',
    vocabulary: [
      { en: 'sea', vi: 'biển' },
      { en: 'sand', vi: 'cát' },
      { en: 'shell', vi: 'vỏ sò' },
      { en: 'fish', vi: 'cá' },
      { en: 'crab', vi: 'cua' },
      { en: 'boat', vi: 'thuyền' },
      { en: 'swim', vi: 'bơi' },
      { en: 'wave', vi: 'sóng' },
      { en: 'umbrella', vi: 'ô/dù' }
    ],
    patterns: [
      { pattern: 'I can see the ___.', example: 'I can see the sea.', exampleVi: 'Tôi thấy biển.', slots: ['sea', 'sand', 'boat', 'shell'] },
      { pattern: 'Let us ___ in the sea!', example: 'Let us swim in the sea!', exampleVi: 'Chúng ta bơi ở biển nào!', slots: ['swim', 'play'] }
    ],
  },
  { unitId: 'g1_u07', unitNumber: 7, grade: 1, title: 'At the snack bar', titleVi: 'Ở quầy ăn nhẹ', textbook: 'global_success',
    vocabulary: [
      { en: 'juice', vi: 'nước ép' },
      { en: 'milk', vi: 'sữa' },
      { en: 'cake', vi: 'bánh' },
      { en: 'biscuit', vi: 'bánh quy' },
      { en: 'ice cream', vi: 'kem' },
      { en: 'candy', vi: 'kẹo' },
      { en: 'water', vi: 'nước' },
      { en: 'yummy', vi: 'ngon' },
      { en: 'please', vi: 'làm ơn' }
    ],
    patterns: [
      { pattern: 'I want ___, please.', example: 'I want juice, please.', exampleVi: 'Cho tôi nước ép nhé.', slots: ['juice', 'milk', 'cake', 'ice cream'] },
      { pattern: 'Can I have ___?', example: 'Can I have a biscuit?', exampleVi: 'Cho tôi bánh quy được không?', slots: ['a biscuit', 'some milk', 'ice cream', 'cake'] }
    ],
  },
  { unitId: 'g1_u08', unitNumber: 8, grade: 1, title: 'At the toy store', titleVi: 'Ở cửa hàng đồ chơi', textbook: 'global_success',
    vocabulary: [
      { en: 'ball', vi: 'quả bóng' },
      { en: 'doll', vi: 'búp bê' },
      { en: 'car', vi: 'xe hơi' },
      { en: 'teddy bear', vi: 'gấu bông' },
      { en: 'kite', vi: 'diều' },
      { en: 'robot', vi: 'người máy' },
      { en: 'puzzle', vi: 'xếp hình' },
      { en: 'toy', vi: 'đồ chơi' },
      { en: 'buy', vi: 'mua' }
    ],
    patterns: [
      { pattern: 'I have a ___.', example: 'I have a ball.', exampleVi: 'Tôi có quả bóng.', slots: ['ball', 'doll', 'car', 'kite'] },
      { pattern: 'I like the ___.', example: 'I like the robot.', exampleVi: 'Tôi thích người máy.', slots: ['robot', 'teddy bear', 'puzzle', 'doll'] }
    ],
  },
  { unitId: 'g1_u09', unitNumber: 9, grade: 1, title: 'At the circus', titleVi: 'Ở rạp xiếc', textbook: 'global_success',
    vocabulary: [
      { en: 'clown', vi: 'chú hề' },
      { en: 'lion', vi: 'sư tử' },
      { en: 'elephant', vi: 'voi' },
      { en: 'monkey', vi: 'khỉ' },
      { en: 'juggle', vi: 'tung hứng' },
      { en: 'jump', vi: 'nhảy' },
      { en: 'funny', vi: 'vui nhộn' },
      { en: 'show', vi: 'biểu diễn' },
      { en: 'balloon', vi: 'bóng bay' }
    ],
    patterns: [
      { pattern: 'Look at the ___!', example: 'Look at the clown!', exampleVi: 'Nhìn chú hề kìa!', slots: ['clown', 'lion', 'elephant', 'monkey'] },
      { pattern: 'The ___ is funny!', example: 'The clown is funny!', exampleVi: 'Chú hề vui nhộn!', slots: ['clown', 'monkey', 'show'] }
    ],
  },
  { unitId: 'g1_u10', unitNumber: 10, grade: 1, title: 'At the zoo', titleVi: 'Ở sở thú', textbook: 'global_success',
    vocabulary: [
      { en: 'tiger', vi: 'hổ' },
      { en: 'giraffe', vi: 'hươu cao cổ' },
      { en: 'panda', vi: 'gấu trúc' },
      { en: 'penguin', vi: 'chim cánh cụt' },
      { en: 'snake', vi: 'rắn' },
      { en: 'parrot', vi: 'vẹt' },
      { en: 'hippo', vi: 'hà mã' },
      { en: 'zebra', vi: 'ngựa vằn' },
      { en: 'zoo', vi: 'sở thú' }
    ],
    patterns: [
      { pattern: 'I see a ___ at the zoo.', example: 'I see a tiger at the zoo.', exampleVi: 'Tôi thấy con hổ ở sở thú.', slots: ['tiger', 'giraffe', 'panda', 'penguin'] },
      { pattern: 'The ___ is big!', example: 'The elephant is big!', exampleVi: 'Con voi to quá!', slots: ['elephant', 'hippo', 'giraffe', 'tiger'] }
    ],
  },
  { unitId: 'g1_u11', unitNumber: 11, grade: 1, title: 'At the farm', titleVi: 'Ở nông trại', textbook: 'global_success',
    vocabulary: [
      { en: 'hen', vi: 'gà mái' },
      { en: 'chick', vi: 'gà con' },
      { en: 'horse', vi: 'ngựa' },
      { en: 'sheep', vi: 'cừu' },
      { en: 'goat', vi: 'dê' },
      { en: 'farmer', vi: 'nông dân' },
      { en: 'barn', vi: 'chuồng' },
      { en: 'field', vi: 'cánh đồng' },
      { en: 'tractor', vi: 'máy cày' }
    ],
    patterns: [
      { pattern: 'I see a ___ on the farm.', example: 'I see a horse on the farm.', exampleVi: 'Tôi thấy con ngựa ở nông trại.', slots: ['horse', 'hen', 'sheep', 'goat'] },
      { pattern: 'The ___ is big!', example: 'The horse is big!', exampleVi: 'Con ngựa to quá!', slots: ['horse', 'goat', 'tractor', 'barn'] }
    ],
  },
  { unitId: 'g1_u12', unitNumber: 12, grade: 1, title: 'At the birthday party', titleVi: 'Ở tiệc sinh nhật', textbook: 'global_success',
    vocabulary: [
      { en: 'birthday', vi: 'sinh nhật' },
      { en: 'cake', vi: 'bánh' },
      { en: 'candle', vi: 'nến' },
      { en: 'present', vi: 'quà' },
      { en: 'balloon', vi: 'bóng bay' },
      { en: 'happy', vi: 'vui' },
      { en: 'song', vi: 'bài hát' },
      { en: 'party', vi: 'tiệc' },
      { en: 'friend', vi: 'bạn' }
    ],
    patterns: [
      { pattern: 'Happy birthday, ___!', example: 'Happy birthday, Mai!', exampleVi: 'Chúc mừng sinh nhật, Mai!', slots: ['Mai', 'Tom', 'Henry', 'Lan'] },
      { pattern: 'I have a ___ for you.', example: 'I have a present for you.', exampleVi: 'Tôi có quà cho bạn.', slots: ['present', 'balloon', 'cake', 'song'] }
    ],
  },
  { unitId: 'g1_u13', unitNumber: 13, grade: 1, title: 'At the grocery store', titleVi: 'Ở cửa hàng tạp hóa', textbook: 'global_success',
    vocabulary: [
      { en: 'shop', vi: 'cửa hàng' },
      { en: 'buy', vi: 'mua' },
      { en: 'cheese', vi: 'phô mai' },
      { en: 'juice', vi: 'nước ép' },
      { en: 'biscuit', vi: 'bánh quy' },
      { en: 'candy', vi: 'kẹo' },
      { en: 'basket', vi: 'giỏ' },
      { en: 'money', vi: 'tiền' },
      { en: 'apple', vi: 'táo' }
    ],
    patterns: [
      { pattern: 'I want ___, please.', example: 'I want juice, please.', exampleVi: 'Cho tôi nước ép nhé.', slots: ['juice', 'cheese', 'biscuit', 'candy'] },
      { pattern: 'Can I have ___?', example: 'Can I have an apple?', exampleVi: 'Cho tôi quả táo được không?', slots: ['an apple', 'some juice', 'some candy', 'cheese'] }
    ],
  },
  { unitId: 'g1_u14', unitNumber: 14, grade: 1, title: 'At the library', titleVi: 'Ở thư viện', textbook: 'global_success',
    vocabulary: [
      { en: 'library', vi: 'thư viện' },
      { en: 'story', vi: 'câu chuyện' },
      { en: 'picture', vi: 'hình ảnh' },
      { en: 'read', vi: 'đọc' },
      { en: 'quiet', vi: 'yên lặng' },
      { en: 'shelf', vi: 'kệ sách' },
      { en: 'borrow', vi: 'mượn' },
      { en: 'return', vi: 'trả' },
      { en: 'book', vi: 'sách' }
    ],
    patterns: [
      { pattern: 'I like to read ___.', example: 'I like to read stories.', exampleVi: 'Tôi thích đọc truyện.', slots: ['stories', 'books', 'pictures'] },
      { pattern: 'Please be ___.', example: 'Please be quiet.', exampleVi: 'Xin hãy yên lặng.', slots: ['quiet', 'kind', 'nice'] }
    ],
  },
  { unitId: 'g1_u15', unitNumber: 15, grade: 1, title: 'In the music room', titleVi: 'Trong phòng nhạc', textbook: 'global_success',
    vocabulary: [
      { en: 'music', vi: 'âm nhạc' },
      { en: 'drum', vi: 'trống' },
      { en: 'guitar', vi: 'đàn ghi-ta' },
      { en: 'piano', vi: 'đàn piano' },
      { en: 'bell', vi: 'chuông' },
      { en: 'listen', vi: 'nghe' },
      { en: 'loud', vi: 'to' },
      { en: 'soft', vi: 'nhẹ' },
      { en: 'sing', vi: 'hát' }
    ],
    patterns: [
      { pattern: 'I can play the ___.', example: 'I can play the drum.', exampleVi: 'Tôi biết chơi trống.', slots: ['drum', 'guitar', 'piano', 'bell'] },
      { pattern: 'The ___ is loud!', example: 'The drum is loud!', exampleVi: 'Trống to quá!', slots: ['drum', 'bell', 'guitar', 'music'] }
    ],
  },
  { unitId: 'g1_u16', unitNumber: 16, grade: 1, title: 'In the art room', titleVi: 'Trong phòng mỹ thuật', textbook: 'global_success',
    vocabulary: [
      { en: 'draw', vi: 'vẽ' },
      { en: 'paint', vi: 'tô màu' },
      { en: 'brush', vi: 'cọ' },
      { en: 'paper', vi: 'giấy' },
      { en: 'colour', vi: 'màu' },
      { en: 'cut', vi: 'cắt' },
      { en: 'glue', vi: 'keo dán' },
      { en: 'star', vi: 'ngôi sao' },
      { en: 'picture', vi: 'tranh' }
    ],
    patterns: [
      { pattern: 'I can draw a ___.', example: 'I can draw a star.', exampleVi: 'Tôi vẽ được ngôi sao.', slots: ['star', 'cat', 'house', 'flower'] },
      { pattern: 'Let us paint it ___.', example: 'Let us paint it blue.', exampleVi: 'Chúng ta tô màu xanh nào.', slots: ['blue', 'red', 'green', 'yellow'] }
    ],
  },
];

export const GRADE2_UNITS: UnitData[] = [
  { unitId: 'g2_u01', unitNumber: 1, grade: 2, title: 'At my birthday party', titleVi: 'Ở tiệc sinh nhật', textbook: 'global_success',
    vocabulary: [
      { en: 'birthday', vi: 'sinh nhật' },
      { en: 'present', vi: 'quà' },
      { en: 'balloon', vi: 'bóng bay' },
      { en: 'candle', vi: 'nến' },
      { en: 'cake', vi: 'bánh' },
      { en: 'sing', vi: 'hát' },
      { en: 'dance', vi: 'nhảy' },
      { en: 'happy', vi: 'vui' },
      { en: 'wish', vi: 'ước' }
    ],
    patterns: [
      { pattern: 'Happy birthday to ___!', example: 'Happy birthday to you!', exampleVi: 'Chúc mừng sinh nhật bạn!', slots: ['you', 'me', 'Mai', 'Henry'] },
      { pattern: 'I got a ___ for my birthday.', example: 'I got a present for my birthday.', exampleVi: 'Tôi nhận được quà sinh nhật.', slots: ['present', 'cake', 'balloon', 'card'] }
    ],
  },
  { unitId: 'g2_u02', unitNumber: 2, grade: 2, title: 'In the backyard', titleVi: 'Trong sân sau', textbook: 'global_success',
    vocabulary: [
      { en: 'tree', vi: 'cây' },
      { en: 'swing', vi: 'xích đu' },
      { en: 'dog', vi: 'chó' },
      { en: 'cat', vi: 'mèo' },
      { en: 'butterfly', vi: 'bướm' },
      { en: 'grass', vi: 'cỏ' },
      { en: 'flower', vi: 'hoa' },
      { en: 'run', vi: 'chạy' },
      { en: 'climb', vi: 'leo' }
    ],
    patterns: [
      { pattern: 'I play in the ___.', example: 'I play in the backyard.', exampleVi: 'Tôi chơi trong sân sau.', slots: ['backyard', 'garden', 'park'] },
      { pattern: 'I can see a ___.', example: 'I can see a butterfly.', exampleVi: 'Tôi thấy con bướm.', slots: ['butterfly', 'dog', 'cat', 'flower'] }
    ],
  },
  { unitId: 'g2_u03', unitNumber: 3, grade: 2, title: 'At the seaside', titleVi: 'Ở bờ biển', textbook: 'global_success',
    vocabulary: [
      { en: 'sea', vi: 'biển' },
      { en: 'sand', vi: 'cát' },
      { en: 'shell', vi: 'vỏ sò' },
      { en: 'crab', vi: 'cua' },
      { en: 'starfish', vi: 'sao biển' },
      { en: 'bucket', vi: 'xô' },
      { en: 'spade', vi: 'xẻng' },
      { en: 'swim', vi: 'bơi' },
      { en: 'splash', vi: 'tung nước' }
    ],
    patterns: [
      { pattern: 'I found a ___ on the beach.', example: 'I found a shell on the beach.', exampleVi: 'Tôi tìm thấy vỏ sò trên bãi biển.', slots: ['shell', 'crab', 'starfish'] },
      { pattern: 'Let us ___ in the sea!', example: 'Let us swim in the sea!', exampleVi: 'Chúng ta bơi biển nào!', slots: ['swim', 'splash', 'play'] }
    ],
  },
  { unitId: 'g2_u04', unitNumber: 4, grade: 2, title: 'In the countryside', titleVi: 'Ở nông thôn', textbook: 'global_success',
    vocabulary: [
      { en: 'field', vi: 'cánh đồng' },
      { en: 'river', vi: 'sông' },
      { en: 'bridge', vi: 'cầu' },
      { en: 'cow', vi: 'bò' },
      { en: 'buffalo', vi: 'trâu' },
      { en: 'rice', vi: 'lúa' },
      { en: 'mountain', vi: 'núi' },
      { en: 'fresh', vi: 'trong lành' },
      { en: 'quiet', vi: 'yên tĩnh' }
    ],
    patterns: [
      { pattern: 'I can see a ___ in the field.', example: 'I can see a cow in the field.', exampleVi: 'Tôi thấy con bò trên đồng.', slots: ['cow', 'buffalo', 'bird', 'farmer'] },
      { pattern: 'The countryside is ___.', example: 'The countryside is quiet.', exampleVi: 'Nông thôn yên tĩnh.', slots: ['quiet', 'fresh', 'beautiful', 'green'] }
    ],
  },
  { unitId: 'g2_u05', unitNumber: 5, grade: 2, title: 'In the classroom', titleVi: 'Trong lớp học', textbook: 'global_success',
    vocabulary: [
      { en: 'open', vi: 'mở' },
      { en: 'close', vi: 'đóng' },
      { en: 'listen', vi: 'nghe' },
      { en: 'look', vi: 'nhìn' },
      { en: 'read', vi: 'đọc' },
      { en: 'write', vi: 'viết' },
      { en: 'say', vi: 'nói' },
      { en: 'draw', vi: 'vẽ' },
      { en: 'colour', vi: 'tô màu' }
    ],
    patterns: [
      { pattern: 'Please ___ your book.', example: 'Please open your book.', exampleVi: 'Làm ơn mở sách ra.', slots: ['open', 'close', 'read'] },
      { pattern: 'Listen and ___.', example: 'Listen and say.', exampleVi: 'Nghe và nói.', slots: ['say', 'write', 'read', 'draw'] }
    ],
  },
  { unitId: 'g2_u06', unitNumber: 6, grade: 2, title: 'On the farm', titleVi: 'Ở nông trại', textbook: 'global_success',
    vocabulary: [
      { en: 'pig', vi: 'heo' },
      { en: 'duck', vi: 'vịt' },
      { en: 'hen', vi: 'gà mái' },
      { en: 'rooster', vi: 'gà trống' },
      { en: 'egg', vi: 'trứng' },
      { en: 'milk', vi: 'sữa' },
      { en: 'feed', vi: 'cho ăn' },
      { en: 'collect', vi: 'thu gom' },
      { en: 'barn', vi: 'chuồng' }
    ],
    patterns: [
      { pattern: 'The ___ says quack!', example: 'The duck says quack!', exampleVi: 'Con vịt kêu quác quác!', slots: ['duck', 'hen', 'pig', 'rooster'] },
      { pattern: 'I can feed the ___.', example: 'I can feed the hen.', exampleVi: 'Tôi cho gà ăn được.', slots: ['hen', 'duck', 'pig', 'rooster'] }
    ],
  },
  { unitId: 'g2_u07', unitNumber: 7, grade: 2, title: 'In the kitchen', titleVi: 'Trong nhà bếp', textbook: 'global_success',
    vocabulary: [
      { en: 'cook', vi: 'nấu' },
      { en: 'plate', vi: 'đĩa' },
      { en: 'cup', vi: 'cốc' },
      { en: 'spoon', vi: 'thìa' },
      { en: 'fork', vi: 'dĩa' },
      { en: 'bowl', vi: 'bát' },
      { en: 'rice', vi: 'cơm' },
      { en: 'soup', vi: 'canh' },
      { en: 'wash', vi: 'rửa' }
    ],
    patterns: [
      { pattern: 'Mum is cooking ___.', example: 'Mum is cooking rice.', exampleVi: 'Mẹ đang nấu cơm.', slots: ['rice', 'soup', 'noodles', 'fish'] },
      { pattern: 'Put the ___ on the table.', example: 'Put the plate on the table.', exampleVi: 'Đặt đĩa lên bàn.', slots: ['plate', 'cup', 'spoon', 'bowl'] }
    ],
  },
  { unitId: 'g2_u08', unitNumber: 8, grade: 2, title: 'In the village', titleVi: 'Ở làng quê', textbook: 'global_success',
    vocabulary: [
      { en: 'house', vi: 'nhà' },
      { en: 'road', vi: 'đường' },
      { en: 'market', vi: 'chợ' },
      { en: 'temple', vi: 'đền' },
      { en: 'well', vi: 'giếng' },
      { en: 'bicycle', vi: 'xe đạp' },
      { en: 'walk', vi: 'đi bộ' },
      { en: 'neighbour', vi: 'hàng xóm' },
      { en: 'friendly', vi: 'thân thiện' }
    ],
    patterns: [
      { pattern: 'I live in a ___.', example: 'I live in a village.', exampleVi: 'Tôi sống ở làng quê.', slots: ['village', 'city', 'town'] },
      { pattern: 'My neighbour is ___.', example: 'My neighbour is friendly.', exampleVi: 'Hàng xóm tôi thân thiện.', slots: ['friendly', 'kind', 'nice', 'funny'] }
    ],
  },
  { unitId: 'g2_u09', unitNumber: 9, grade: 2, title: 'In the grocery store', titleVi: 'Ở cửa hàng tạp hóa', textbook: 'global_success',
    vocabulary: [
      { en: 'bread', vi: 'bánh mì' },
      { en: 'cheese', vi: 'phô mai' },
      { en: 'egg', vi: 'trứng' },
      { en: 'fruit', vi: 'trái cây' },
      { en: 'vegetable', vi: 'rau' },
      { en: 'price', vi: 'giá' },
      { en: 'bag', vi: 'túi' },
      { en: 'buy', vi: 'mua' },
      { en: 'pay', vi: 'trả tiền' }
    ],
    patterns: [
      { pattern: 'I want some ___, please.', example: 'I want some bread, please.', exampleVi: 'Cho tôi bánh mì nhé.', slots: ['bread', 'cheese', 'eggs', 'fruit'] },
      { pattern: 'How much is the ___?', example: 'How much is the cheese?', exampleVi: 'Phô mai bao nhiêu tiền?', slots: ['cheese', 'bread', 'fruit', 'egg'] }
    ],
  },
  { unitId: 'g2_u10', unitNumber: 10, grade: 2, title: 'At the zoo', titleVi: 'Ở sở thú', textbook: 'global_success',
    vocabulary: [
      { en: 'lion', vi: 'sư tử' },
      { en: 'monkey', vi: 'khỉ' },
      { en: 'elephant', vi: 'voi' },
      { en: 'bear', vi: 'gấu' },
      { en: 'snake', vi: 'rắn' },
      { en: 'penguin', vi: 'chim cánh cụt' },
      { en: 'feed', vi: 'cho ăn' },
      { en: 'scary', vi: 'đáng sợ' },
      { en: 'cute', vi: 'dễ thương' }
    ],
    patterns: [
      { pattern: 'The ___ is cute!', example: 'The penguin is cute!', exampleVi: 'Chim cánh cụt dễ thương!', slots: ['penguin', 'monkey', 'bear', 'panda'] },
      { pattern: 'Do not feed the ___!', example: 'Do not feed the lion!', exampleVi: 'Đừng cho sư tử ăn!', slots: ['lion', 'bear', 'snake', 'monkey'] }
    ],
  },
  { unitId: 'g2_u11', unitNumber: 11, grade: 2, title: 'In the playground', titleVi: 'Ở sân chơi', textbook: 'global_success',
    vocabulary: [
      { en: 'seesaw', vi: 'bập bênh' },
      { en: 'roundabout', vi: 'vòng xoay' },
      { en: 'sandpit', vi: 'hố cát' },
      { en: 'climbing frame', vi: 'khung leo' },
      { en: 'hide', vi: 'trốn' },
      { en: 'seek', vi: 'tìm' },
      { en: 'turn', vi: 'lượt' },
      { en: 'catch', vi: 'bắt' },
      { en: 'throw', vi: 'ném' }
    ],
    patterns: [
      { pattern: 'Let us play on the ___.', example: 'Let us play on the seesaw.', exampleVi: 'Chúng ta chơi bập bênh nào.', slots: ['seesaw', 'swing', 'slide', 'roundabout'] },
      { pattern: 'It is my ___ now!', example: 'It is my turn now!', exampleVi: 'Đến lượt tôi rồi!', slots: ['turn'] }
    ],
  },
  { unitId: 'g2_u12', unitNumber: 12, grade: 2, title: 'At the cafe', titleVi: 'Ở quán cà phê', textbook: 'global_success',
    vocabulary: [
      { en: 'tea', vi: 'trà' },
      { en: 'coffee', vi: 'cà phê' },
      { en: 'ice cream', vi: 'kem' },
      { en: 'sandwich', vi: 'bánh mì kẹp' },
      { en: 'cookie', vi: 'bánh quy' },
      { en: 'please', vi: 'làm ơn' },
      { en: 'thank you', vi: 'cảm ơn' },
      { en: 'menu', vi: 'thực đơn' }
    ],
    patterns: [
      { pattern: 'Can I have ___, please?', example: 'Can I have ice cream, please?', exampleVi: 'Cho tôi kem, làm ơn?', slots: ['ice cream', 'tea', 'a cookie', 'a sandwich'] },
      { pattern: 'Here you are. ___!', example: 'Here you are. Thank you!', exampleVi: 'Của bạn đây. Cảm ơn!', slots: ['Thank you'] }
    ],
  },
  { unitId: 'g2_u13', unitNumber: 13, grade: 2, title: 'At the math class', titleVi: 'Ở lớp toán', textbook: 'global_success',
    vocabulary: [
      { en: 'add', vi: 'cộng' },
      { en: 'count', vi: 'đếm' },
      { en: 'number', vi: 'số' },
      { en: 'more', vi: 'nhiều hơn' },
      { en: 'less', vi: 'ít hơn' },
      { en: 'equal', vi: 'bằng' },
      { en: 'shape', vi: 'hình' },
      { en: 'circle', vi: 'hình tròn' },
      { en: 'square', vi: 'hình vuông' }
    ],
    patterns: [
      { pattern: 'How many ___?', example: 'How many apples?', exampleVi: 'Bao nhiêu quả táo?', slots: ['apples', 'books', 'pens', 'stars'] },
      { pattern: '___ plus ___ is ___.', example: 'Two plus three is five.', exampleVi: 'Hai cộng ba bằng năm.', slots: ['Two', 'three', 'five'] }
    ],
  },
  { unitId: 'g2_u14', unitNumber: 14, grade: 2, title: 'At home', titleVi: 'Ở nhà', textbook: 'global_success',
    vocabulary: [
      { en: 'table', vi: 'bàn' },
      { en: 'sofa', vi: 'ghế sofa' },
      { en: 'lamp', vi: 'đèn' },
      { en: 'clock', vi: 'đồng hồ' },
      { en: 'mirror', vi: 'gương' },
      { en: 'tidy', vi: 'gọn gàng' },
      { en: 'clean', vi: 'sạch' },
      { en: 'messy', vi: 'bừa bộn' },
      { en: 'cosy', vi: 'ấm cúng' }
    ],
    patterns: [
      { pattern: 'The ___ is on the table.', example: 'The lamp is on the table.', exampleVi: 'Đèn ở trên bàn.', slots: ['lamp', 'clock', 'book', 'cup'] },
      { pattern: 'My room is ___.', example: 'My room is tidy.', exampleVi: 'Phòng tôi gọn gàng.', slots: ['tidy', 'clean', 'messy', 'cosy'] }
    ],
  },
  { unitId: 'g2_u15', unitNumber: 15, grade: 2, title: 'In the clothes shop', titleVi: 'Ở cửa hàng quần áo', textbook: 'global_success',
    vocabulary: [
      { en: 'T-shirt', vi: 'áo phông' },
      { en: 'shorts', vi: 'quần đùi' },
      { en: 'sandals', vi: 'dép' },
      { en: 'scarf', vi: 'khăn quàng' },
      { en: 'try on', vi: 'thử' },
      { en: 'fit', vi: 'vừa' },
      { en: 'too big', vi: 'quá to' },
      { en: 'too small', vi: 'quá nhỏ' },
      { en: 'pretty', vi: 'đẹp' }
    ],
    patterns: [
      { pattern: 'Can I try on this ___?', example: 'Can I try on this T-shirt?', exampleVi: 'Tôi thử áo phông này được không?', slots: ['T-shirt', 'dress', 'hat', 'scarf'] },
      { pattern: 'It is ___.', example: 'It is too big.', exampleVi: 'Nó quá to.', slots: ['too big', 'too small', 'nice', 'pretty'] }
    ],
  },
  { unitId: 'g2_u16', unitNumber: 16, grade: 2, title: 'At the campsite', titleVi: 'Ở khu cắm trại', textbook: 'global_success',
    vocabulary: [
      { en: 'tent', vi: 'lều' },
      { en: 'campfire', vi: 'lửa trại' },
      { en: 'map', vi: 'bản đồ' },
      { en: 'torch', vi: 'đèn pin' },
      { en: 'star', vi: 'ngôi sao' },
      { en: 'night', vi: 'đêm' },
      { en: 'morning', vi: 'buổi sáng' },
      { en: 'adventure', vi: 'cuộc phiêu lưu' },
      { en: 'marshmallow', vi: 'kẹo dẻo' }
    ],
    patterns: [
      { pattern: 'I can see the ___.', example: 'I can see the stars.', exampleVi: 'Tôi thấy những ngôi sao.', slots: ['stars', 'campfire', 'tent', 'map'] },
      { pattern: 'It is ___ time!', example: 'It is adventure time!', exampleVi: 'Giờ phiêu lưu rồi!', slots: ['adventure', 'morning', 'night'] }
    ],
  },
];
