// English Grade 1-2 — Làm quen Tiếng Anh (CTGDPT 2018, TT32)
// 70 tiết/năm, 2 tiết/tuần, ưu tiên Nghe-Nói
// SGK: Global Success, Family and Friends, i-Learn Smart Start
import type { UnitData } from './english-units-g3';

export const GRADE1_UNITS: UnitData[] = [
  { unitId: 'g1_u01', unitNumber: 1, grade: 1, title: 'Hello!', titleVi: 'Xin chào!', textbook: 'global_success',
    vocabulary: [
      { en: 'hello', vi: 'xin chào' }, { en: 'hi', vi: 'chào' }, { en: 'goodbye', vi: 'tạm biệt' },
      { en: 'bye', vi: 'tạm biệt' }, { en: 'I', vi: 'tôi' }, { en: 'am', vi: 'là' },
      { en: 'name', vi: 'tên' }, { en: 'my', vi: 'của tôi' }, { en: 'your', vi: 'của bạn' },
    ],
    patterns: [
      { pattern: 'Hello! I am ___.', example: 'Hello! I am Mai.', exampleVi: 'Xin chào! Tôi là Mai.', slots: ['Mai', 'Nam', 'Lan', 'Henry'] },
      { pattern: 'Hi! My name is ___.', example: 'Hi! My name is Tom.', exampleVi: 'Chào! Tên tôi là Tom.', slots: ['Tom', 'Anna', 'Ben', 'Lily'] },
    ],
  },
  { unitId: 'g1_u02', unitNumber: 2, grade: 1, title: 'My family', titleVi: 'Gia đình tôi', textbook: 'global_success',
    vocabulary: [
      { en: 'mum', vi: 'mẹ' }, { en: 'dad', vi: 'bố' }, { en: 'brother', vi: 'anh/em trai' },
      { en: 'sister', vi: 'chị/em gái' }, { en: 'baby', vi: 'em bé' }, { en: 'family', vi: 'gia đình' },
      { en: 'grandma', vi: 'bà' }, { en: 'grandpa', vi: 'ông' }, { en: 'love', vi: 'yêu' },
    ],
    patterns: [
      { pattern: 'This is my ___.', example: 'This is my mum.', exampleVi: 'Đây là mẹ tôi.', slots: ['mum', 'dad', 'brother', 'sister'] },
      { pattern: 'I love my ___.', example: 'I love my family.', exampleVi: 'Tôi yêu gia đình.', slots: ['family', 'mum', 'dad', 'grandma'] },
    ],
  },
  { unitId: 'g1_u03', unitNumber: 3, grade: 1, title: 'My school', titleVi: 'Trường của tôi', textbook: 'global_success',
    vocabulary: [
      { en: 'school', vi: 'trường' }, { en: 'teacher', vi: 'thầy/cô giáo' }, { en: 'book', vi: 'sách' },
      { en: 'pen', vi: 'bút' }, { en: 'pencil', vi: 'bút chì' }, { en: 'ruler', vi: 'thước' },
      { en: 'bag', vi: 'cặp sách' }, { en: 'desk', vi: 'bàn' }, { en: 'chair', vi: 'ghế' },
    ],
    patterns: [
      { pattern: 'It is a ___.', example: 'It is a pen.', exampleVi: 'Đó là cây bút.', slots: ['pen', 'book', 'ruler', 'bag'] },
    ],
  },
  { unitId: 'g1_u04', unitNumber: 4, grade: 1, title: 'My toys', titleVi: 'Đồ chơi của tôi', textbook: 'global_success',
    vocabulary: [
      { en: 'ball', vi: 'quả bóng' }, { en: 'doll', vi: 'búp bê' }, { en: 'car', vi: 'xe hơi' },
      { en: 'teddy bear', vi: 'gấu bông' }, { en: 'kite', vi: 'diều' }, { en: 'robot', vi: 'người máy' },
      { en: 'toy', vi: 'đồ chơi' }, { en: 'play', vi: 'chơi' },
    ],
    patterns: [
      { pattern: 'I have a ___.', example: 'I have a ball.', exampleVi: 'Tôi có quả bóng.', slots: ['ball', 'doll', 'car', 'kite'] },
    ],
  },
  { unitId: 'g1_u05', unitNumber: 5, grade: 1, title: 'Colours', titleVi: 'Màu sắc', textbook: 'global_success',
    vocabulary: [
      { en: 'red', vi: 'đỏ' }, { en: 'blue', vi: 'xanh dương' }, { en: 'yellow', vi: 'vàng' },
      { en: 'green', vi: 'xanh lá' }, { en: 'orange', vi: 'cam' }, { en: 'pink', vi: 'hồng' },
      { en: 'white', vi: 'trắng' }, { en: 'black', vi: 'đen' }, { en: 'purple', vi: 'tím' },
    ],
    patterns: [
      { pattern: 'It is ___.', example: 'It is red.', exampleVi: 'Nó màu đỏ.', slots: ['red', 'blue', 'green', 'yellow'] },
      { pattern: 'I like ___.', example: 'I like pink.', exampleVi: 'Tôi thích màu hồng.', slots: ['pink', 'blue', 'green', 'purple'] },
    ],
  },
  { unitId: 'g1_u06', unitNumber: 6, grade: 1, title: 'Numbers 1-10', titleVi: 'Số đếm 1-10', textbook: 'global_success',
    vocabulary: [
      { en: 'one', vi: 'một' }, { en: 'two', vi: 'hai' }, { en: 'three', vi: 'ba' },
      { en: 'four', vi: 'bốn' }, { en: 'five', vi: 'năm' }, { en: 'six', vi: 'sáu' },
      { en: 'seven', vi: 'bảy' }, { en: 'eight', vi: 'tám' }, { en: 'nine', vi: 'chín' },
      { en: 'ten', vi: 'mười' },
    ],
    patterns: [
      { pattern: 'I have ___ pencils.', example: 'I have three pencils.', exampleVi: 'Tôi có ba cây bút chì.', slots: ['three', 'five', 'two', 'ten'] },
    ],
  },
  { unitId: 'g1_u07', unitNumber: 7, grade: 1, title: 'My body', titleVi: 'Cơ thể tôi', textbook: 'global_success',
    vocabulary: [
      { en: 'head', vi: 'đầu' }, { en: 'eyes', vi: 'mắt' }, { en: 'nose', vi: 'mũi' },
      { en: 'mouth', vi: 'miệng' }, { en: 'ears', vi: 'tai' }, { en: 'hands', vi: 'tay' },
      { en: 'feet', vi: 'chân' }, { en: 'face', vi: 'khuôn mặt' },
    ],
    patterns: [
      { pattern: 'Touch your ___.', example: 'Touch your nose.', exampleVi: 'Chạm mũi nào.', slots: ['nose', 'head', 'ears', 'mouth'] },
    ],
  },
  { unitId: 'g1_u08', unitNumber: 8, grade: 1, title: 'Animals', titleVi: 'Động vật', textbook: 'global_success',
    vocabulary: [
      { en: 'cat', vi: 'mèo' }, { en: 'dog', vi: 'chó' }, { en: 'bird', vi: 'chim' },
      { en: 'fish', vi: 'cá' }, { en: 'rabbit', vi: 'thỏ' }, { en: 'duck', vi: 'vịt' },
      { en: 'cow', vi: 'bò' }, { en: 'pig', vi: 'heo' },
    ],
    patterns: [
      { pattern: 'I see a ___.', example: 'I see a cat.', exampleVi: 'Tôi thấy một con mèo.', slots: ['cat', 'dog', 'bird', 'fish'] },
    ],
  },
  { unitId: 'g1_u09', unitNumber: 9, grade: 1, title: 'Food', titleVi: 'Đồ ăn', textbook: 'global_success',
    vocabulary: [
      { en: 'apple', vi: 'táo' }, { en: 'banana', vi: 'chuối' }, { en: 'milk', vi: 'sữa' },
      { en: 'bread', vi: 'bánh mì' }, { en: 'egg', vi: 'trứng' }, { en: 'rice', vi: 'cơm' },
      { en: 'water', vi: 'nước' }, { en: 'cake', vi: 'bánh' },
    ],
    patterns: [
      { pattern: 'I like ___.', example: 'I like apples.', exampleVi: 'Tôi thích táo.', slots: ['apples', 'bananas', 'milk', 'cake'] },
    ],
  },
  { unitId: 'g1_u10', unitNumber: 10, grade: 1, title: 'Actions', titleVi: 'Hành động', textbook: 'global_success',
    vocabulary: [
      { en: 'run', vi: 'chạy' }, { en: 'jump', vi: 'nhảy' }, { en: 'sing', vi: 'hát' },
      { en: 'dance', vi: 'nhảy múa' }, { en: 'clap', vi: 'vỗ tay' }, { en: 'stand up', vi: 'đứng lên' },
      { en: 'sit down', vi: 'ngồi xuống' }, { en: 'walk', vi: 'đi bộ' },
    ],
    patterns: [
      { pattern: 'I can ___.', example: 'I can run.', exampleVi: 'Tôi biết chạy.', slots: ['run', 'jump', 'sing', 'dance'] },
    ],
  },
];

export const GRADE2_UNITS: UnitData[] = [
  { unitId: 'g2_u01', unitNumber: 1, grade: 2, title: 'In the classroom', titleVi: 'Trong lớp học', textbook: 'global_success',
    vocabulary: [
      { en: 'open', vi: 'mở' }, { en: 'close', vi: 'đóng' }, { en: 'listen', vi: 'nghe' },
      { en: 'look', vi: 'nhìn' }, { en: 'read', vi: 'đọc' }, { en: 'write', vi: 'viết' },
      { en: 'say', vi: 'nói' }, { en: 'draw', vi: 'vẽ' }, { en: 'colour', vi: 'tô màu' },
    ],
    patterns: [
      { pattern: 'Please ___ your book.', example: 'Please open your book.', exampleVi: 'Làm ơn mở sách ra.', slots: ['open', 'close', 'read'] },
    ],
  },
  { unitId: 'g2_u02', unitNumber: 2, grade: 2, title: 'Feelings', titleVi: 'Cảm xúc', textbook: 'global_success',
    vocabulary: [
      { en: 'happy', vi: 'vui' }, { en: 'sad', vi: 'buồn' }, { en: 'angry', vi: 'giận' },
      { en: 'scared', vi: 'sợ' }, { en: 'tired', vi: 'mệt' }, { en: 'hungry', vi: 'đói' },
      { en: 'thirsty', vi: 'khát' }, { en: 'fine', vi: 'khỏe' },
    ],
    patterns: [
      { pattern: 'How are you? I am ___.', example: 'How are you? I am happy.', exampleVi: 'Bạn khỏe không? Tôi vui.', slots: ['happy', 'fine', 'hungry', 'tired'] },
    ],
  },
  { unitId: 'g2_u03', unitNumber: 3, grade: 2, title: 'My house', titleVi: 'Nhà tôi', textbook: 'global_success',
    vocabulary: [
      { en: 'bedroom', vi: 'phòng ngủ' }, { en: 'kitchen', vi: 'nhà bếp' }, { en: 'bathroom', vi: 'phòng tắm' },
      { en: 'living room', vi: 'phòng khách' }, { en: 'garden', vi: 'vườn' }, { en: 'door', vi: 'cửa' },
      { en: 'window', vi: 'cửa sổ' }, { en: 'bed', vi: 'giường' },
    ],
    patterns: [
      { pattern: 'This is the ___.', example: 'This is the kitchen.', exampleVi: 'Đây là nhà bếp.', slots: ['kitchen', 'bedroom', 'bathroom', 'garden'] },
    ],
  },
  { unitId: 'g2_u04', unitNumber: 4, grade: 2, title: 'Clothes', titleVi: 'Quần áo', textbook: 'global_success',
    vocabulary: [
      { en: 'shirt', vi: 'áo sơ mi' }, { en: 'trousers', vi: 'quần dài' }, { en: 'dress', vi: 'váy' },
      { en: 'shoes', vi: 'giày' }, { en: 'hat', vi: 'mũ' }, { en: 'socks', vi: 'tất' },
      { en: 'jacket', vi: 'áo khoác' }, { en: 'skirt', vi: 'chân váy' },
    ],
    patterns: [
      { pattern: 'I am wearing a ___.', example: 'I am wearing a shirt.', exampleVi: 'Tôi đang mặc áo sơ mi.', slots: ['shirt', 'dress', 'hat', 'jacket'] },
    ],
  },
  { unitId: 'g2_u05', unitNumber: 5, grade: 2, title: 'Weather', titleVi: 'Thời tiết', textbook: 'global_success',
    vocabulary: [
      { en: 'sunny', vi: 'nắng' }, { en: 'rainy', vi: 'mưa' }, { en: 'cloudy', vi: 'nhiều mây' },
      { en: 'windy', vi: 'gió' }, { en: 'hot', vi: 'nóng' }, { en: 'cold', vi: 'lạnh' },
      { en: 'warm', vi: 'ấm' }, { en: 'sky', vi: 'bầu trời' },
    ],
    patterns: [
      { pattern: 'It is ___ today.', example: 'It is sunny today.', exampleVi: 'Hôm nay trời nắng.', slots: ['sunny', 'rainy', 'cloudy', 'windy'] },
    ],
  },
  { unitId: 'g2_u06', unitNumber: 6, grade: 2, title: 'In the park', titleVi: 'Ở công viên', textbook: 'global_success',
    vocabulary: [
      { en: 'tree', vi: 'cây' }, { en: 'flower', vi: 'hoa' }, { en: 'grass', vi: 'cỏ' },
      { en: 'slide', vi: 'cầu trượt' }, { en: 'swing', vi: 'xích đu' }, { en: 'bench', vi: 'ghế đá' },
      { en: 'pond', vi: 'ao' }, { en: 'park', vi: 'công viên' },
    ],
    patterns: [
      { pattern: 'I can see a ___.', example: 'I can see a tree.', exampleVi: 'Tôi thấy một cái cây.', slots: ['tree', 'flower', 'slide', 'pond'] },
    ],
  },
  { unitId: 'g2_u07', unitNumber: 7, grade: 2, title: 'Fruit', titleVi: 'Trái cây', textbook: 'global_success',
    vocabulary: [
      { en: 'mango', vi: 'xoài' }, { en: 'grape', vi: 'nho' }, { en: 'orange', vi: 'cam' },
      { en: 'watermelon', vi: 'dưa hấu' }, { en: 'strawberry', vi: 'dâu' }, { en: 'pineapple', vi: 'dứa' },
      { en: 'lemon', vi: 'chanh' }, { en: 'coconut', vi: 'dừa' },
    ],
    patterns: [
      { pattern: 'Do you like ___? Yes! / No!', example: 'Do you like mangoes? Yes!', exampleVi: 'Bạn thích xoài không? Có!', slots: ['mangoes', 'grapes', 'oranges', 'watermelon'] },
    ],
  },
  { unitId: 'g2_u08', unitNumber: 8, grade: 2, title: 'Days of the week', titleVi: 'Các ngày trong tuần', textbook: 'global_success',
    vocabulary: [
      { en: 'Monday', vi: 'thứ Hai' }, { en: 'Tuesday', vi: 'thứ Ba' }, { en: 'Wednesday', vi: 'thứ Tư' },
      { en: 'Thursday', vi: 'thứ Năm' }, { en: 'Friday', vi: 'thứ Sáu' }, { en: 'Saturday', vi: 'thứ Bảy' },
      { en: 'Sunday', vi: 'Chủ nhật' }, { en: 'today', vi: 'hôm nay' },
    ],
    patterns: [
      { pattern: 'Today is ___.', example: 'Today is Monday.', exampleVi: 'Hôm nay là thứ Hai.', slots: ['Monday', 'Friday', 'Sunday', 'Wednesday'] },
    ],
  },
  { unitId: 'g2_u09', unitNumber: 9, grade: 2, title: 'My friends', titleVi: 'Bạn bè tôi', textbook: 'global_success',
    vocabulary: [
      { en: 'friend', vi: 'bạn' }, { en: 'boy', vi: 'con trai' }, { en: 'girl', vi: 'con gái' },
      { en: 'tall', vi: 'cao' }, { en: 'short', vi: 'thấp' }, { en: 'kind', vi: 'tốt bụng' },
      { en: 'funny', vi: 'vui tính' }, { en: 'nice', vi: 'dễ thương' },
    ],
    patterns: [
      { pattern: 'My friend is ___.', example: 'My friend is kind.', exampleVi: 'Bạn tôi tốt bụng.', slots: ['kind', 'funny', 'tall', 'nice'] },
    ],
  },
  { unitId: 'g2_u10', unitNumber: 10, grade: 2, title: 'Fun time!', titleVi: 'Vui chơi!', textbook: 'global_success',
    vocabulary: [
      { en: 'draw', vi: 'vẽ' }, { en: 'paint', vi: 'tô màu' }, { en: 'play games', vi: 'chơi trò chơi' },
      { en: 'ride a bike', vi: 'đạp xe' }, { en: 'swim', vi: 'bơi' }, { en: 'fly a kite', vi: 'thả diều' },
      { en: 'climb', vi: 'leo trèo' }, { en: 'skip', vi: 'nhảy dây' },
    ],
    patterns: [
      { pattern: 'Let us ___!', example: 'Let us play games!', exampleVi: 'Chúng ta chơi trò chơi nào!', slots: ['play games', 'swim', 'ride a bike', 'fly a kite'] },
    ],
  },
];
