// English Grade 4 — Global Success 20 Units
import type { UnitData } from './english-units-g3';

export const GRADE4_UNITS: UnitData[] = [
    {
        unitId: 'g4_u01', unitNumber: 1, grade: 4, title: 'My friends', titleVi: 'Bạn bè của tôi', textbook: 'global_success',
        vocabulary: [
            { en: 'nationality', vi: 'quốc tịch' }, { en: 'Vietnamese', vi: 'người Việt Nam' },
            { en: 'Japanese', vi: 'người Nhật' }, { en: 'American', vi: 'người Mỹ' },
            { en: 'Australian', vi: 'người Úc' }, { en: 'Malaysian', vi: 'người Malaysia' },
            { en: 'from', vi: 'đến từ' }, { en: 'country', vi: 'đất nước' },
        ],
        patterns: [
            { pattern: 'Where are you from? I\'m from ___.', example: 'Where are you from? I\'m from Vietnam.', exampleVi: 'Bạn đến từ đâu? Tôi đến từ Việt Nam.', slots: ['Vietnam', 'Japan', 'America', 'Australia'] },
            { pattern: 'What nationality are you? I\'m ___.', example: 'What nationality are you? I\'m Vietnamese.', exampleVi: 'Bạn quốc tịch gì? Tôi là người Việt Nam.', slots: ['Vietnamese', 'Japanese', 'American'] },
        ],
    },
    {
        unitId: 'g4_u02', unitNumber: 2, grade: 4, title: 'Time and daily routines', titleVi: 'Thời gian và thói quen', textbook: 'global_success',
        vocabulary: [
            { en: 'get up', vi: 'thức dậy' }, { en: 'have breakfast', vi: 'ăn sáng' },
            { en: 'go to school', vi: 'đi học' }, { en: 'have lunch', vi: 'ăn trưa' },
            { en: 'do homework', vi: 'làm bài tập' }, { en: 'have dinner', vi: 'ăn tối' },
            { en: 'go to bed', vi: 'đi ngủ' }, { en: "o'clock", vi: 'giờ đúng' },
        ],
        patterns: [
            { pattern: 'What time do you ___? I ___ at ___ o\'clock.', example: 'What time do you get up? I get up at 6 o\'clock.', exampleVi: 'Bạn thức dậy lúc mấy giờ? Tôi thức dậy lúc 6 giờ.', slots: ['get up|6', 'go to school|7', 'have lunch|11'] },
        ],
    },
    {
        unitId: 'g4_u03', unitNumber: 3, grade: 4, title: 'My week', titleVi: 'Tuần của tôi', textbook: 'global_success',
        vocabulary: [
            { en: 'Monday', vi: 'thứ Hai' }, { en: 'Tuesday', vi: 'thứ Ba' },
            { en: 'Wednesday', vi: 'thứ Tư' }, { en: 'Thursday', vi: 'thứ Năm' },
            { en: 'Friday', vi: 'thứ Sáu' }, { en: 'Saturday', vi: 'thứ Bảy' },
            { en: 'Sunday', vi: 'Chủ nhật' }, { en: 'today', vi: 'hôm nay' },
        ],
        patterns: [
            { pattern: 'What day is it today? It\'s ___.', example: 'What day is it today? It\'s Monday.', exampleVi: 'Hôm nay là thứ mấy? Hôm nay là thứ Hai.', slots: ['Monday', 'Tuesday', 'Friday', 'Sunday'] },
        ],
    },
    {
        unitId: 'g4_u04', unitNumber: 4, grade: 4, title: 'My birthday party', titleVi: 'Tiệc sinh nhật', textbook: 'global_success',
        vocabulary: [
            { en: 'birthday', vi: 'sinh nhật' }, { en: 'January', vi: 'tháng Một' },
            { en: 'February', vi: 'tháng Hai' }, { en: 'March', vi: 'tháng Ba' },
            { en: 'April', vi: 'tháng Tư' }, { en: 'party', vi: 'tiệc' },
            { en: 'cake', vi: 'bánh' }, { en: 'present', vi: 'quà' },
        ],
        patterns: [
            { pattern: 'When is your birthday? It\'s in ___.', example: 'When is your birthday? It\'s in March.', exampleVi: 'Sinh nhật bạn khi nào? Vào tháng Ba.', slots: ['March', 'January', 'April', 'February'] },
        ],
    },
    {
        unitId: 'g4_u05', unitNumber: 5, grade: 4, title: 'Things we can do', titleVi: 'Những việc chúng ta có thể làm', textbook: 'global_success',
        vocabulary: [
            { en: 'ride a bike', vi: 'đạp xe' }, { en: 'play the piano', vi: 'chơi piano' },
            { en: 'speak English', vi: 'nói tiếng Anh' }, { en: 'play chess', vi: 'chơi cờ' },
            { en: 'skate', vi: 'trượt patin' }, { en: 'cook', vi: 'nấu ăn' },
            { en: 'climb', vi: 'leo' }, { en: 'juggle', vi: 'tung hứng' },
        ],
        patterns: [
            { pattern: 'Can you ___? Yes, I can. / No, I can\'t.', example: 'Can you ride a bike? Yes, I can.', exampleVi: 'Bạn có biết đạp xe không? Có, tôi biết.', slots: ['ride a bike', 'play the piano', 'skate', 'cook'] },
        ],
    },
    {
        unitId: 'g4_u06', unitNumber: 6, grade: 4, title: 'Our school facilities', titleVi: 'Cơ sở vật chất trường', textbook: 'global_success',
        vocabulary: [
            { en: 'computer room', vi: 'phòng máy tính' }, { en: 'music room', vi: 'phòng nhạc' },
            { en: 'art room', vi: 'phòng mĩ thuật' }, { en: 'swimming pool', vi: 'hồ bơi' },
            { en: 'field', vi: 'sân vận động' }, { en: 'canteen', vi: 'căn-tin' },
            { en: 'hall', vi: 'hội trường' }, { en: 'floor', vi: 'tầng' },
        ],
        patterns: [
            { pattern: 'There is a ___ in our school.', example: 'There is a swimming pool in our school.', exampleVi: 'Trường chúng tôi có hồ bơi.', slots: ['swimming pool', 'computer room', 'music room', 'canteen'] },
        ],
    },
    {
        unitId: 'g4_u07', unitNumber: 7, grade: 4, title: 'Our timetables', titleVi: 'Thời khóa biểu', textbook: 'global_success',
        vocabulary: [
            { en: 'Maths', vi: 'Toán' }, { en: 'English', vi: 'Tiếng Anh' },
            { en: 'Vietnamese', vi: 'Tiếng Việt' }, { en: 'Science', vi: 'Khoa học' },
            { en: 'Music', vi: 'Âm nhạc' }, { en: 'PE', vi: 'Thể dục' },
            { en: 'Art', vi: 'Mĩ thuật' }, { en: 'IT', vi: 'Tin học' },
        ],
        patterns: [
            { pattern: 'What do you have on ___? I have ___.', example: 'What do you have on Monday? I have Maths and English.', exampleVi: 'Thứ Hai bạn có môn gì? Tôi có Toán và Tiếng Anh.', slots: ['Monday|Maths and English', 'Tuesday|Science', 'Friday|PE and Music'] },
        ],
    },
    {
        unitId: 'g4_u08', unitNumber: 8, grade: 4, title: 'My favourite subjects', titleVi: 'Môn học yêu thích', textbook: 'global_success',
        vocabulary: [
            { en: 'favourite', vi: 'yêu thích' }, { en: 'subject', vi: 'môn học' },
            { en: 'interesting', vi: 'thú vị' }, { en: 'boring', vi: 'chán' },
            { en: 'easy', vi: 'dễ' }, { en: 'difficult', vi: 'khó' },
            { en: 'fun', vi: 'vui' }, { en: 'useful', vi: 'hữu ích' },
        ],
        patterns: [
            { pattern: 'What\'s your favourite subject? My favourite subject is ___.', example: 'What\'s your favourite subject? My favourite subject is English.', exampleVi: 'Môn học yêu thích của bạn là gì? Môn yêu thích của tôi là Tiếng Anh.', slots: ['English', 'Maths', 'Science', 'Music'] },
        ],
    },
    {
        unitId: 'g4_u09', unitNumber: 9, grade: 4, title: 'Our sports day', titleVi: 'Ngày hội thể thao', textbook: 'global_success',
        vocabulary: [
            { en: 'fast', vi: 'nhanh' }, { en: 'slow', vi: 'chậm' },
            { en: 'strong', vi: 'khỏe' }, { en: 'tall', vi: 'cao' },
            { en: 'short', vi: 'thấp' }, { en: 'winner', vi: 'người thắng' },
            { en: 'race', vi: 'cuộc đua' }, { en: 'team', vi: 'đội' },
        ],
        patterns: [
            { pattern: 'Who\'s ___er? ___ is ___er than ___.', example: 'Who\'s faster? Mai is faster than Lan.', exampleVi: 'Ai nhanh hơn? Mai nhanh hơn Lan.', slots: ['faster|Mai|Lan', 'taller|Nam|Minh', 'stronger|Tom|Ben'] },
        ],
    },
    {
        unitId: 'g4_u10', unitNumber: 10, grade: 4, title: 'Our summer holidays', titleVi: 'Kỳ nghỉ hè', textbook: 'global_success',
        vocabulary: [
            { en: 'beach', vi: 'bãi biển' }, { en: 'mountain', vi: 'núi' },
            { en: 'trip', vi: 'chuyến đi' }, { en: 'visited', vi: 'đã thăm' },
            { en: 'played', vi: 'đã chơi' }, { en: 'swam', vi: 'đã bơi' },
            { en: 'enjoyed', vi: 'đã thích' }, { en: 'holiday', vi: 'kỳ nghỉ' },
        ],
        patterns: [
            { pattern: 'Where did you go? I went to ___.', example: 'Where did you go? I went to the beach.', exampleVi: 'Bạn đã đi đâu? Tôi đã đi biển.', slots: ['the beach', 'the mountains', 'Da Lat', 'Nha Trang'] },
        ],
    },
    {
        unitId: 'g4_u11', unitNumber: 11, grade: 4, title: 'My home', titleVi: 'Nhà của tôi', textbook: 'global_success',
        vocabulary: [
            { en: 'apartment', vi: 'căn hộ' }, { en: 'house', vi: 'nhà' },
            { en: 'sofa', vi: 'ghế sofa' }, { en: 'fridge', vi: 'tủ lạnh' },
            { en: 'TV', vi: 'ti vi' }, { en: 'table', vi: 'bàn' },
            { en: 'balcony', vi: 'ban công' }, { en: 'stairs', vi: 'cầu thang' },
        ],
        patterns: [
            { pattern: 'What\'s your home like? It has ___.', example: 'It has a big living room and a balcony.', exampleVi: 'Nhà có phòng khách lớn và ban công.', slots: ['a big living room', 'three bedrooms', 'a garden'] },
        ],
    },
    {
        unitId: 'g4_u12', unitNumber: 12, grade: 4, title: 'Jobs', titleVi: 'Nghề nghiệp', textbook: 'global_success',
        vocabulary: [
            { en: 'pilot', vi: 'phi công' }, { en: 'singer', vi: 'ca sĩ' },
            { en: 'scientist', vi: 'nhà khoa học' }, { en: 'firefighter', vi: 'lính cứu hỏa' },
            { en: 'dentist', vi: 'nha sĩ' }, { en: 'vet', vi: 'bác sĩ thú y' },
            { en: 'future', vi: 'tương lai' }, { en: 'want', vi: 'muốn' },
        ],
        patterns: [
            { pattern: 'What do you want to be? I want to be a ___.', example: 'I want to be a pilot.', exampleVi: 'Tôi muốn làm phi công.', slots: ['pilot', 'scientist', 'singer', 'vet'] },
        ],
    },
    {
        unitId: 'g4_u13', unitNumber: 13, grade: 4, title: 'Appearance', titleVi: 'Ngoại hình', textbook: 'global_success',
        vocabulary: [
            { en: 'tall', vi: 'cao' }, { en: 'short', vi: 'thấp' },
            { en: 'thin', vi: 'gầy' }, { en: 'chubby', vi: 'mập mạp' },
            { en: 'long hair', vi: 'tóc dài' }, { en: 'short hair', vi: 'tóc ngắn' },
            { en: 'glasses', vi: 'kính' }, { en: 'curly', vi: 'xoăn' },
        ],
        patterns: [
            { pattern: 'He/She has ___.', example: 'She has long hair and big eyes.', exampleVi: 'Cô ấy có tóc dài và mắt to.', slots: ['long hair', 'short hair', 'glasses', 'curly hair'] },
        ],
    },
    {
        unitId: 'g4_u14', unitNumber: 14, grade: 4, title: 'Daily activities', titleVi: 'Hoạt động hàng ngày', textbook: 'global_success',
        vocabulary: [
            { en: 'always', vi: 'luôn luôn' }, { en: 'usually', vi: 'thường xuyên' },
            { en: 'sometimes', vi: 'thỉnh thoảng' }, { en: 'never', vi: 'không bao giờ' },
            { en: 'exercise', vi: 'tập thể dục' }, { en: 'wash', vi: 'rửa' },
            { en: 'tidy', vi: 'dọn dẹp' }, { en: 'practice', vi: 'luyện tập' },
        ],
        patterns: [
            { pattern: 'I ___ ___ in the morning.', example: 'I always exercise in the morning.', exampleVi: 'Tôi luôn tập thể dục buổi sáng.', slots: ['always|exercise', 'usually|read', 'sometimes|jog'] },
        ],
    },
    {
        unitId: 'g4_u15', unitNumber: 15, grade: 4, title: "My family's weekends", titleVi: 'Cuối tuần gia đình', textbook: 'global_success',
        vocabulary: [
            { en: 'go shopping', vi: 'đi mua sắm' }, { en: 'visit grandparents', vi: 'thăm ông bà' },
            { en: 'watch TV', vi: 'xem ti vi' }, { en: 'have a picnic', vi: 'đi dã ngoại' },
            { en: 'clean', vi: 'dọn dẹp' }, { en: 'together', vi: 'cùng nhau' },
            { en: 'weekend', vi: 'cuối tuần' }, { en: 'relax', vi: 'thư giãn' },
        ],
        patterns: [
            { pattern: 'What does your family do at weekends? We ___.', example: 'We visit our grandparents.', exampleVi: 'Chúng tôi đi thăm ông bà.', slots: ['visit our grandparents', 'go shopping', 'have a picnic'] },
        ],
    },
    {
        unitId: 'g4_u16', unitNumber: 16, grade: 4, title: 'Weather', titleVi: 'Thời tiết', textbook: 'global_success',
        vocabulary: [
            { en: 'sunny', vi: 'nắng' }, { en: 'rainy', vi: 'mưa' },
            { en: 'cloudy', vi: 'nhiều mây' }, { en: 'windy', vi: 'có gió' },
            { en: 'stormy', vi: 'bão' }, { en: 'foggy', vi: 'sương mù' },
            { en: 'warm', vi: 'ấm' }, { en: 'cool', vi: 'mát' },
        ],
        patterns: [
            { pattern: 'What is the weather like? It is ___.', example: 'It is sunny and warm.', exampleVi: 'Trời nắng và ấm.', slots: ['sunny and warm', 'rainy and cold', 'cloudy and cool', 'windy'] },
        ],
    },
    {
        unitId: 'g4_u17', unitNumber: 17, grade: 4, title: 'In the city', titleVi: 'Trong thành phố', textbook: 'global_success',
        vocabulary: [
            { en: 'hospital', vi: 'bệnh viện' }, { en: 'supermarket', vi: 'siêu thị' },
            { en: 'bank', vi: 'ngân hàng' }, { en: 'post office', vi: 'bưu điện' },
            { en: 'cinema', vi: 'rạp phim' }, { en: 'bus stop', vi: 'trạm xe buýt' },
            { en: 'turn left', vi: 'rẽ trái' }, { en: 'turn right', vi: 'rẽ phải' },
        ],
        patterns: [
            { pattern: 'How do I get to the ___? Go straight and turn ___.', example: 'Go straight and turn left.', exampleVi: 'Đi thẳng rồi rẽ trái.', slots: ['hospital|left', 'cinema|right', 'bank|left'] },
        ],
    },
    {
        unitId: 'g4_u18', unitNumber: 18, grade: 4, title: 'At the shopping centre', titleVi: 'Ở trung tâm mua sắm', textbook: 'global_success',
        vocabulary: [
            { en: 'T-shirt', vi: 'áo phông' }, { en: 'dress', vi: 'váy' },
            { en: 'shoes', vi: 'giày' }, { en: 'hat', vi: 'mũ' },
            { en: 'cheap', vi: 'rẻ' }, { en: 'expensive', vi: 'đắt' },
            { en: 'buy', vi: 'mua' }, { en: 'price', vi: 'giá' },
        ],
        patterns: [
            { pattern: 'How much is the ___? It\'s ___ dong.', example: 'How much is the T-shirt? It\'s 100,000 dong.', exampleVi: 'Áo phông bao nhiêu tiền? 100.000 đồng.', slots: ['T-shirt|100,000', 'dress|200,000', 'hat|50,000'] },
        ],
    },
    {
        unitId: 'g4_u19', unitNumber: 19, grade: 4, title: 'The animal world', titleVi: 'Thế giới động vật', textbook: 'global_success',
        vocabulary: [
            { en: 'whale', vi: 'cá voi' }, { en: 'parrot', vi: 'vẹt' },
            { en: 'crocodile', vi: 'cá sấu' }, { en: 'panda', vi: 'gấu trúc' },
            { en: 'kangaroo', vi: 'chuột túi' }, { en: 'eagle', vi: 'đại bàng' },
            { en: 'dangerous', vi: 'nguy hiểm' }, { en: 'wild', vi: 'hoang dã' },
        ],
        patterns: [
            { pattern: 'It has ___. It can ___.', example: 'It has four legs. It can run fast.', exampleVi: 'Nó có bốn chân. Nó chạy nhanh.', slots: ['four legs|run fast', 'wings|fly', 'big teeth|swim'] },
        ],
    },
    {
        unitId: 'g4_u20', unitNumber: 20, grade: 4, title: 'At summer camp', titleVi: 'Ở trại hè', textbook: 'global_success',
        vocabulary: [
            { en: 'camp', vi: 'trại' }, { en: 'tent', vi: 'lều' },
            { en: 'campfire', vi: 'lửa trại' }, { en: 'hike', vi: 'đi bộ đường dài' },
            { en: 'explore', vi: 'khám phá' }, { en: 'adventure', vi: 'phiêu lưu' },
            { en: 'exciting', vi: 'hào hứng' }, { en: 'amazing', vi: 'tuyệt vời' },
        ],
        patterns: [
            { pattern: 'What did you do at camp? I ___.', example: 'I hiked in the mountains.', exampleVi: 'Tôi đã đi bộ trên núi.', slots: ['hiked in the mountains', 'sat around the campfire', 'explored the forest'] },
        ],
    },
];
