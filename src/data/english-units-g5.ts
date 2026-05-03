// English Grade 5 — Global Success 20 Units
import type { UnitData } from './english-units-g3';

export const GRADE5_UNITS: UnitData[] = [
    {
        unitId: 'g5_u01', unitNumber: 1, grade: 5, title: 'All about me!', titleVi: 'Tất cả về tôi', textbook: 'global_success',
        vocabulary: [
            { en: 'introduce', vi: 'giới thiệu' }, { en: 'hobby', vi: 'sở thích' },
            { en: 'favourite', vi: 'yêu thích' }, { en: 'age', vi: 'tuổi' },
            { en: 'address', vi: 'địa chỉ' }, { en: 'grade', vi: 'lớp' },
            { en: 'describe', vi: 'mô tả' }, { en: 'personality', vi: 'tính cách' },
        ],
        patterns: [
            { pattern: 'I am ___. I am ___ years old. I like ___.', example: 'I am Henry. I am 10 years old. I like reading.', exampleVi: 'Tôi là Henry. Tôi 10 tuổi. Tôi thích đọc sách.', slots: ['Henry|10|reading', 'Mai|9|drawing', 'Nam|10|football'] },
        ],
    },
    {
        unitId: 'g5_u02', unitNumber: 2, grade: 5, title: 'Our homes', titleVi: 'Nhà của chúng mình', textbook: 'global_success',
        vocabulary: [
            { en: 'countryside', vi: 'nông thôn' }, { en: 'city', vi: 'thành phố' },
            { en: 'flat', vi: 'căn hộ' }, { en: 'village', vi: 'làng' },
            { en: 'quiet', vi: 'yên tĩnh' }, { en: 'noisy', vi: 'ồn ào' },
            { en: 'cosy', vi: 'ấm cúng' }, { en: 'spacious', vi: 'rộng rãi' },
        ],
        patterns: [
            { pattern: 'I live in a ___ in the ___. It\'s ___.', example: 'I live in a house in the countryside. It\'s quiet.', exampleVi: 'Tôi sống trong một ngôi nhà ở nông thôn. Nó yên tĩnh.', slots: ['house|countryside|quiet', 'flat|city|noisy', 'house|village|cosy'] },
        ],
    },
    {
        unitId: 'g5_u03', unitNumber: 3, grade: 5, title: 'My foreign friends', titleVi: 'Bạn nước ngoài', textbook: 'global_success',
        vocabulary: [
            { en: 'England', vi: 'Anh' }, { en: 'Korea', vi: 'Hàn Quốc' },
            { en: 'Thailand', vi: 'Thái Lan' }, { en: 'France', vi: 'Pháp' },
            { en: 'language', vi: 'ngôn ngữ' }, { en: 'capital', vi: 'thủ đô' },
            { en: 'culture', vi: 'văn hóa' }, { en: 'flag', vi: 'cờ' },
        ],
        patterns: [
            { pattern: 'Where does he/she live? He/She lives in ___.', example: 'She lives in England.', exampleVi: 'Cô ấy sống ở Anh.', slots: ['England', 'Korea', 'Thailand', 'France'] },
        ],
    },
    {
        unitId: 'g5_u04', unitNumber: 4, grade: 5, title: 'Our free-time activities', titleVi: 'Hoạt động thời gian rảnh', textbook: 'global_success',
        vocabulary: [
            { en: 'collect stamps', vi: 'sưu tập tem' }, { en: 'take photos', vi: 'chụp ảnh' },
            { en: 'play badminton', vi: 'chơi cầu lông' }, { en: 'go hiking', vi: 'đi bộ đường dài' },
            { en: 'often', vi: 'thường' }, { en: 'rarely', vi: 'hiếm khi' },
            { en: 'every day', vi: 'mỗi ngày' }, { en: 'twice a week', vi: 'hai lần một tuần' },
        ],
        patterns: [
            { pattern: 'How often do you ___? I ___ ___.', example: 'How often do you play badminton? I play badminton twice a week.', exampleVi: 'Bạn chơi cầu lông bao lâu một lần? Tôi chơi hai lần một tuần.', slots: ['play badminton|twice a week', 'go hiking|every weekend', 'take photos|often'] },
        ],
    },
    {
        unitId: 'g5_u05', unitNumber: 5, grade: 5, title: 'My future job', titleVi: 'Nghề tương lai', textbook: 'global_success',
        vocabulary: [
            { en: 'astronaut', vi: 'phi hành gia' }, { en: 'architect', vi: 'kiến trúc sư' },
            { en: 'programmer', vi: 'lập trình viên' }, { en: 'journalist', vi: 'nhà báo' },
            { en: 'because', vi: 'bởi vì' }, { en: 'dream', vi: 'ước mơ' },
            { en: 'goal', vi: 'mục tiêu' }, { en: 'study', vi: 'học' },
        ],
        patterns: [
            { pattern: 'I want to be a ___ because ___.', example: 'I want to be a programmer because I like computers.', exampleVi: 'Tôi muốn làm lập trình viên vì tôi thích máy tính.', slots: ['programmer|I like computers', 'astronaut|I like space', 'architect|I like drawing'] },
        ],
    },
    {
        unitId: 'g5_u06', unitNumber: 6, grade: 5, title: 'Our school rooms', titleVi: 'Các phòng ở trường', textbook: 'global_success',
        vocabulary: [
            { en: 'bigger', vi: 'to hơn' }, { en: 'smaller', vi: 'nhỏ hơn' },
            { en: 'newer', vi: 'mới hơn' }, { en: 'older', vi: 'cũ hơn' },
            { en: 'cleaner', vi: 'sạch hơn' }, { en: 'more modern', vi: 'hiện đại hơn' },
            { en: 'than', vi: 'hơn' }, { en: 'compare', vi: 'so sánh' },
        ],
        patterns: [
            { pattern: 'The ___ is ___er than the ___.', example: 'The library is bigger than the classroom.', exampleVi: 'Thư viện to hơn phòng học.', slots: ['library|bigger|classroom', 'gym|newer|hall', 'lab|cleaner|art room'] },
        ],
    },
    {
        unitId: 'g5_u07', unitNumber: 7, grade: 5, title: 'Our favourite school activities', titleVi: 'Hoạt động trường yêu thích', textbook: 'global_success',
        vocabulary: [
            { en: 'sports day', vi: 'ngày thể thao' }, { en: 'school trip', vi: 'dã ngoại' },
            { en: 'concert', vi: 'buổi hòa nhạc' }, { en: 'competition', vi: 'cuộc thi' },
            { en: 'exciting', vi: 'hào hứng' }, { en: 'enjoyable', vi: 'thú vị' },
            { en: 'more fun', vi: 'vui hơn' }, { en: 'the best', vi: 'tốt nhất' },
        ],
        patterns: [
            { pattern: 'What\'s more fun, ___ or ___?', example: 'What\'s more fun, sports day or school trip?', exampleVi: 'Cái nào vui hơn, ngày thể thao hay dã ngoại?', slots: ['sports day|school trip', 'concert|competition'] },
        ],
    },
    {
        unitId: 'g5_u08', unitNumber: 8, grade: 5, title: 'In our classroom', titleVi: 'Trong lớp học', textbook: 'global_success',
        vocabulary: [
            { en: 'more', vi: 'nhiều hơn' }, { en: 'fewer', vi: 'ít hơn' },
            { en: 'most', vi: 'nhiều nhất' }, { en: 'least', vi: 'ít nhất' },
            { en: 'poster', vi: 'áp phích' }, { en: 'board', vi: 'bảng' },
            { en: 'projector', vi: 'máy chiếu' }, { en: 'screen', vi: 'màn hình' },
        ],
        patterns: [
            { pattern: 'There are more ___ than ___.', example: 'There are more desks than chairs.', exampleVi: 'Có nhiều bàn hơn ghế.', slots: ['desks|chairs', 'books|pens', 'boys|girls'] },
        ],
    },
    {
        unitId: 'g5_u09', unitNumber: 9, grade: 5, title: 'Our outdoor activities', titleVi: 'Hoạt động ngoài trời', textbook: 'global_success',
        vocabulary: [
            { en: 'the fastest', vi: 'nhanh nhất' }, { en: 'the tallest', vi: 'cao nhất' },
            { en: 'the strongest', vi: 'khỏe nhất' }, { en: 'the most popular', vi: 'phổ biến nhất' },
            { en: 'marathon', vi: 'chạy marathon' }, { en: 'relay', vi: 'chạy tiếp sức' },
            { en: 'champion', vi: 'nhà vô địch' }, { en: 'medal', vi: 'huy chương' },
        ],
        patterns: [
            { pattern: '___ is the ___est in the class.', example: 'Mai is the fastest in the class.', exampleVi: 'Mai nhanh nhất lớp.', slots: ['Mai|fastest', 'Nam|tallest', 'Lan|strongest'] },
        ],
    },
    {
        unitId: 'g5_u10', unitNumber: 10, grade: 5, title: 'Our school trip', titleVi: 'Chuyến dã ngoại', textbook: 'global_success',
        vocabulary: [
            { en: 'went', vi: 'đã đi' }, { en: 'saw', vi: 'đã thấy' },
            { en: 'ate', vi: 'đã ăn' }, { en: 'had', vi: 'đã có' },
            { en: 'bought', vi: 'đã mua' }, { en: 'took', vi: 'đã chụp' },
            { en: 'yesterday', vi: 'hôm qua' }, { en: 'last week', vi: 'tuần trước' },
        ],
        patterns: [
            { pattern: 'What did you do? I ___.', example: 'What did you do? I went to the museum.', exampleVi: 'Bạn đã làm gì? Tôi đã đi viện bảo tàng.', slots: ['went to the museum', 'saw many animals', 'ate local food', 'took photos'] },
        ],
    },
    {
        unitId: 'g5_u11', unitNumber: 11, grade: 5, title: 'Family time', titleVi: 'Thời gian gia đình', textbook: 'global_success',
        vocabulary: [
            { en: 'cooking', vi: 'đang nấu' }, { en: 'watching', vi: 'đang xem' },
            { en: 'cleaning', vi: 'đang dọn' }, { en: 'watering', vi: 'đang tưới' },
            { en: 'helping', vi: 'đang giúp' }, { en: 'chatting', vi: 'đang nói chuyện' },
            { en: 'right now', vi: 'ngay bây giờ' }, { en: 'at the moment', vi: 'lúc này' },
        ],
        patterns: [
            { pattern: 'What is ___ doing? He/She is ___.', example: 'What is Mum doing? She is cooking dinner.', exampleVi: 'Mẹ đang làm gì? Mẹ đang nấu cơm.', slots: ['Mum|cooking dinner', 'Dad|watching TV', 'Sister|doing homework'] },
        ],
    },
    {
        unitId: 'g5_u12', unitNumber: 12, grade: 5, title: 'Our Tet holiday', titleVi: 'Tết của chúng mình', textbook: 'global_success',
        vocabulary: [
            { en: 'Tet', vi: 'Tết' }, { en: 'lucky money', vi: 'tiền lì xì' },
            { en: 'fireworks', vi: 'pháo hoa' }, { en: 'peach blossom', vi: 'hoa đào' },
            { en: 'apricot blossom', vi: 'hoa mai' }, { en: 'decorate', vi: 'trang trí' },
            { en: 'wish', vi: 'chúc' }, { en: 'traditional', vi: 'truyền thống' },
        ],
        patterns: [
            { pattern: 'What do you usually do at Tet? I ___.', example: 'I visit my grandparents and get lucky money.', exampleVi: 'Tôi đi thăm ông bà và nhận lì xì.', slots: ['visit grandparents', 'watch fireworks', 'eat banh chung', 'decorate the house'] },
        ],
    },
    {
        unitId: 'g5_u13', unitNumber: 13, grade: 5, title: 'Our special days', titleVi: 'Những ngày đặc biệt', textbook: 'global_success',
        vocabulary: [
            { en: 'Children\'s Day', vi: 'Ngày Thiếu nhi' }, { en: 'Teacher\'s Day', vi: 'Ngày Nhà giáo' },
            { en: 'Women\'s Day', vi: 'Ngày Phụ nữ' }, { en: 'National Day', vi: 'Quốc khánh' },
            { en: 'celebrate', vi: 'kỷ niệm' }, { en: 'date', vi: 'ngày tháng' },
            { en: 'first', vi: 'đầu tiên' }, { en: 'second', vi: 'thứ hai' },
        ],
        patterns: [
            { pattern: 'When is ___? It\'s on ___.', example: 'When is Children\'s Day? It\'s on June 1st.', exampleVi: 'Ngày Thiếu nhi khi nào? Ngày 1 tháng 6.', slots: ['Children\'s Day|June 1st', 'Teacher\'s Day|November 20th', 'National Day|September 2nd'] },
        ],
    },
    {
        unitId: 'g5_u14', unitNumber: 14, grade: 5, title: 'Staying healthy', titleVi: 'Sống lành mạnh', textbook: 'global_success',
        vocabulary: [
            { en: 'healthy', vi: 'khỏe mạnh' }, { en: 'unhealthy', vi: 'không khỏe' },
            { en: 'should', vi: 'nên' }, { en: 'shouldn\'t', vi: 'không nên' },
            { en: 'exercise', vi: 'tập thể dục' }, { en: 'junk food', vi: 'đồ ăn vặt' },
            { en: 'vegetables', vi: 'rau củ' }, { en: 'sleep early', vi: 'ngủ sớm' },
        ],
        patterns: [
            { pattern: 'You should ___. You shouldn\'t ___.', example: 'You should eat vegetables. You shouldn\'t eat junk food.', exampleVi: 'Con nên ăn rau. Con không nên ăn đồ ăn vặt.', slots: ['eat vegetables|eat junk food', 'exercise|watch TV too much', 'sleep early|stay up late'] },
        ],
    },
    {
        unitId: 'g5_u15', unitNumber: 15, grade: 5, title: 'Our health', titleVi: 'Sức khỏe', textbook: 'global_success',
        vocabulary: [
            { en: 'headache', vi: 'đau đầu' }, { en: 'toothache', vi: 'đau răng' },
            { en: 'stomachache', vi: 'đau bụng' }, { en: 'fever', vi: 'sốt' },
            { en: 'cold', vi: 'cảm lạnh' }, { en: 'cough', vi: 'ho' },
            { en: 'medicine', vi: 'thuốc' }, { en: 'rest', vi: 'nghỉ ngơi' },
        ],
        patterns: [
            { pattern: 'What\'s the matter? I have a ___.', example: 'What\'s the matter? I have a headache.', exampleVi: 'Bạn bị sao vậy? Tôi bị đau đầu.', slots: ['headache', 'toothache', 'stomachache', 'fever'] },
        ],
    },
    {
        unitId: 'g5_u16', unitNumber: 16, grade: 5, title: 'Seasons and the weather', titleVi: 'Các mùa và thời tiết', textbook: 'global_success',
        vocabulary: [
            { en: 'spring', vi: 'mùa xuân' }, { en: 'summer', vi: 'mùa hè' },
            { en: 'autumn', vi: 'mùa thu' }, { en: 'winter', vi: 'mùa đông' },
            { en: 'dry', vi: 'khô' }, { en: 'wet', vi: 'ẩm ướt' },
            { en: 'season', vi: 'mùa' }, { en: 'weather', vi: 'thời tiết' },
        ],
        patterns: [
            { pattern: 'In ___, it\'s ___.', example: 'In summer, it\'s hot and sunny.', exampleVi: 'Vào mùa hè, trời nóng và nắng.', slots: ['summer|hot and sunny', 'winter|cold and cloudy', 'spring|warm and rainy'] },
        ],
    },
    {
        unitId: 'g5_u17', unitNumber: 17, grade: 5, title: 'Stories for children', titleVi: 'Truyện thiếu nhi', textbook: 'global_success',
        vocabulary: [
            { en: 'once upon a time', vi: 'ngày xửa ngày xưa' }, { en: 'princess', vi: 'công chúa' },
            { en: 'prince', vi: 'hoàng tử' }, { en: 'dragon', vi: 'rồng' },
            { en: 'brave', vi: 'dũng cảm' }, { en: 'kind', vi: 'tốt bụng' },
            { en: 'happily ever after', vi: 'sống hạnh phúc mãi mãi' }, { en: 'story', vi: 'câu chuyện' },
        ],
        patterns: [
            { pattern: 'Once upon a time, there was a ___. He/She was ___.', example: 'Once upon a time, there was a princess. She was kind.', exampleVi: 'Ngày xửa ngày xưa, có một nàng công chúa. Cô ấy tốt bụng.', slots: ['princess|kind', 'prince|brave', 'dragon|big'] },
        ],
    },
    {
        unitId: 'g5_u18', unitNumber: 18, grade: 5, title: 'Means of transport', titleVi: 'Phương tiện giao thông', textbook: 'global_success',
        vocabulary: [
            { en: 'bus', vi: 'xe buýt' }, { en: 'train', vi: 'tàu hỏa' },
            { en: 'plane', vi: 'máy bay' }, { en: 'motorbike', vi: 'xe máy' },
            { en: 'bicycle', vi: 'xe đạp' }, { en: 'taxi', vi: 'xe taxi' },
            { en: 'on foot', vi: 'đi bộ' }, { en: 'by', vi: 'bằng' },
        ],
        patterns: [
            { pattern: 'How do you go to ___? I go by ___.', example: 'How do you go to school? I go by bus.', exampleVi: 'Bạn đi học bằng gì? Tôi đi bằng xe buýt.', slots: ['school|bus', 'the park|bicycle', 'grandma\'s house|motorbike'] },
        ],
    },
    {
        unitId: 'g5_u19', unitNumber: 19, grade: 5, title: 'Places of interest', titleVi: 'Địa điểm nổi tiếng', textbook: 'global_success',
        vocabulary: [
            { en: 'museum', vi: 'viện bảo tàng' }, { en: 'temple', vi: 'chùa/đền' },
            { en: 'tower', vi: 'tháp' }, { en: 'bridge', vi: 'cầu' },
            { en: 'palace', vi: 'cung điện' }, { en: 'famous', vi: 'nổi tiếng' },
            { en: 'visited', vi: 'đã thăm' }, { en: 'been to', vi: 'đã từng đến' },
        ],
        patterns: [
            { pattern: 'Have you been to ___? Yes, I have. / No, I haven\'t.', example: 'Have you been to the museum? Yes, I have.', exampleVi: 'Bạn đã từng đến viện bảo tàng chưa? Rồi.', slots: ['the museum', 'the temple', 'the tower', 'the palace'] },
        ],
    },
    {
        unitId: 'g5_u20', unitNumber: 20, grade: 5, title: 'Our summer holiday', titleVi: 'Kỳ nghỉ hè', textbook: 'global_success',
        vocabulary: [
            { en: 'going to', vi: 'sẽ/dự định' }, { en: 'plan', vi: 'kế hoạch' },
            { en: 'travel', vi: 'du lịch' }, { en: 'visit', vi: 'thăm' },
            { en: 'stay', vi: 'ở lại' }, { en: 'pack', vi: 'đóng gói' },
            { en: 'sunscreen', vi: 'kem chống nắng' }, { en: 'suitcase', vi: 'vali' },
        ],
        patterns: [
            { pattern: 'I\'m going to ___ this summer.', example: 'I\'m going to visit Da Nang this summer.', exampleVi: 'Mùa hè này tôi sẽ đi Đà Nẵng.', slots: ['visit Da Nang', 'go to the beach', 'travel to Japan', 'stay at grandma\'s house'] },
        ],
    },
];
