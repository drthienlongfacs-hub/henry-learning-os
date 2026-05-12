// ═══════════════════════════════════════════════════════════════
// English Grade 4 & 5 Writing Exercises — Global Success textbook
// 40 Units × 3 exercises = 120 exercises total
// Complexity escalates with grade level
// ═══════════════════════════════════════════════════════════════

import type { WritingExercise } from '@/components/WritingExercise';

// ══════════════════════════ GRADE 4 ══════════════════════════

export const GRADE4_WRITING_EXERCISES: Record<string, WritingExercise[]> = {
  'g4_u01': [
    { type: 'fill-blank', prompt: 'Where are you from? I\'m from ___.', promptVi: 'Bạn đến từ đâu? Tôi đến từ ___.', answer: 'Vietnam', imageEmoji: '🇻🇳' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'What nationality are you?', imageEmoji: '🌍' },
    { type: 'free-write', prompt: 'Introduce yourself and your nationality:', promptVi: 'Giới thiệu bản thân và quốc tịch:', answer: 'My name is Henry. I am Vietnamese. I am from Ho Chi Minh City.', hints: ['My name is...', 'I am (nationality).', 'I am from (city/country).'], imageEmoji: '🧑' },
  ],
  'g4_u02': [
    { type: 'fill-blank', prompt: 'What time do you get up? I get up at ___ o\'clock.', promptVi: 'Mấy giờ em thức dậy? Em thức dậy lúc ___ giờ.', answer: '6,7', imageEmoji: '⏰' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'I have breakfast at seven.', imageEmoji: '🥣' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'I go to school at seven o\'clock.', audioText: "I go to school at seven o'clock.", imageEmoji: '🏫' },
  ],
  'g4_u03': [
    { type: 'fill-blank', prompt: 'What day is it today? It\'s ___.', promptVi: 'Hôm nay là thứ mấy? Hôm nay là ___.', answer: 'Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday', imageEmoji: '📅' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'I have English on Monday.', imageEmoji: '📚' },
    { type: 'free-write', prompt: 'Write your timetable for Monday:', promptVi: 'Viết thời khóa biểu thứ Hai:', answer: 'On Monday, I have Maths and English. I also have Science.', hints: ['On Monday, I have...', 'I also have...'], imageEmoji: '📋' },
  ],
  'g4_u04': [
    { type: 'fill-blank', prompt: 'When is your birthday? It\'s in ___.', promptVi: 'Sinh nhật em khi nào? Vào tháng ___.', answer: 'January,February,March,April,May,June,July,August,September,October,November,December', imageEmoji: '🎂' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'Happy birthday to you!', imageEmoji: '🎉' },
    { type: 'free-write', prompt: 'Write about your birthday party:', promptVi: 'Viết về bữa tiệc sinh nhật:', answer: 'My birthday is in March. I have a big cake. My friends come to my party.', hints: ['My birthday is in...', 'I have a... cake.', 'My friends...'], imageEmoji: '🎈' },
  ],
  'g4_u05': [
    { type: 'fill-blank', prompt: 'Can you ___ a bike? Yes, I can.', promptVi: 'Bạn có biết ___ xe đạp không? Có, tôi biết.', answer: 'ride', imageEmoji: '🚲' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'She can play the piano.', imageEmoji: '🎹' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'I can speak English well.', audioText: 'I can speak English well.', imageEmoji: '🗣️' },
  ],
  'g4_u06': [
    { type: 'fill-blank', prompt: 'There is a ___ in our school. (place to swim)', promptVi: 'Trường chúng tôi có một ___. (nơi bơi)', answer: 'swimming pool', imageEmoji: '🏊' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'The computer room is on the second floor.', imageEmoji: '🖥️' },
    { type: 'free-write', prompt: 'Describe your school in 3 sentences:', promptVi: 'Mô tả trường em bằng 3 câu:', answer: 'My school is big. It has a library and a swimming pool. The playground is very large.', hints: ['My school is...', 'It has a... and a...', 'The ___ is very ___'], imageEmoji: '🏫' },
  ],
  'g4_u07': [
    { type: 'fill-blank', prompt: 'What do you have on ___? I have Maths.', promptVi: 'Thứ ___ bạn có môn gì? Tôi có Toán.', answer: 'Monday,Tuesday,Wednesday,Thursday,Friday', imageEmoji: '📅' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'I have Science on Wednesday.', imageEmoji: '🔬' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'My favourite day is Friday.', audioText: 'My favourite day is Friday.', imageEmoji: '📆' },
  ],
  'g4_u08': [
    { type: 'fill-blank', prompt: 'My favourite ___ is English.', promptVi: '___ yêu thích của tôi là Tiếng Anh.', answer: 'subject', imageEmoji: '📖' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'English is interesting and useful.', imageEmoji: '✨' },
    { type: 'free-write', prompt: 'Write about your favourite subject:', promptVi: 'Viết về môn học yêu thích:', answer: 'My favourite subject is English. It is interesting. I like learning new words.', hints: ['My favourite subject is...', 'It is... (interesting/fun/useful)', 'I like...'], imageEmoji: '🌟' },
  ],
  'g4_u09': [
    { type: 'fill-blank', prompt: 'Mai is ___er than Lan. (fast)', promptVi: 'Mai ___ hơn Lan. (nhanh)', answer: 'faster', imageEmoji: '🏃' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'He is taller than his brother.', imageEmoji: '📏' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'Who is the winner of the race?', audioText: 'Who is the winner of the race?', imageEmoji: '🏆' },
  ],
  'g4_u10': [
    { type: 'fill-blank', prompt: 'Where did you go? I went to the ___.', promptVi: 'Bạn đã đi đâu? Tôi đã đi ___.', answer: 'beach,mountains,park', imageEmoji: '🏖️' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'I visited Da Lat last summer.', imageEmoji: '🏔️' },
    { type: 'free-write', prompt: 'Write about your summer holiday:', promptVi: 'Viết về kỳ nghỉ hè:', answer: 'Last summer, I went to Nha Trang. I swam in the sea. I had a great time.', hints: ['Last summer, I went to...', 'I swam/played/visited...', 'I had a... time.'], imageEmoji: '☀️' },
  ],
  'g4_u11': [
    { type: 'fill-blank', prompt: 'I live in a ___ with my family. (house/apartment)', promptVi: 'Tôi sống trong ___ với gia đình. (nhà/căn hộ)', answer: 'house,apartment', imageEmoji: '🏠' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'My home has three bedrooms.', imageEmoji: '🛏️' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'There is a big garden behind my house.', audioText: 'There is a big garden behind my house.', imageEmoji: '🌳' },
  ],
  'g4_u12': [
    { type: 'fill-blank', prompt: 'I want to be a ___ in the future.', promptVi: 'Tôi muốn làm ___ trong tương lai.', answer: 'doctor,pilot,teacher,scientist', imageEmoji: '👨‍⚕️' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'She wants to be a singer.', imageEmoji: '🎤' },
    { type: 'free-write', prompt: 'Write about what you want to be:', promptVi: 'Viết về ước mơ nghề nghiệp:', answer: 'I want to be a doctor. I want to help sick people. I study hard every day.', hints: ['I want to be a...', 'I want to help/make/teach...', 'I study/practice...'], imageEmoji: '⭐' },
  ],
  'g4_u13': [
    { type: 'fill-blank', prompt: 'She has ___ hair and big eyes.', promptVi: 'Cô ấy có tóc ___ và mắt to.', answer: 'long,short,curly', imageEmoji: '👩' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'He is tall and thin.', imageEmoji: '🧍' },
    { type: 'free-write', prompt: 'Describe your best friend:', promptVi: 'Mô tả bạn thân:', answer: 'My best friend is Minh. He is tall. He has short hair and glasses.', hints: ['My best friend is...', 'He/She is... (tall/short/thin)', 'He/She has... (hair/eyes)'], imageEmoji: '👫' },
  ],
  'g4_u14': [
    { type: 'fill-blank', prompt: 'I ___ exercise in the morning. (always/sometimes)', promptVi: 'Tôi ___ tập thể dục buổi sáng.', answer: 'always,usually,sometimes', imageEmoji: '🏋️' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'I usually wash my face every morning.', imageEmoji: '🧼' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'She always does homework after dinner.', audioText: 'She always does homework after dinner.', imageEmoji: '📝' },
  ],
  'g4_u15': [
    { type: 'fill-blank', prompt: 'On weekends, we ___ our grandparents.', promptVi: 'Cuối tuần, chúng tôi ___ ông bà.', answer: 'visit', imageEmoji: '👴' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'My family goes shopping on Saturday.', imageEmoji: '🛒' },
    { type: 'free-write', prompt: 'Write about your family\'s weekend:', promptVi: 'Viết về cuối tuần gia đình:', answer: 'On weekends, we visit our grandparents. We have lunch together. It is very happy.', hints: ['On weekends, we...', 'We have/play/visit...', 'It is very...'], imageEmoji: '👨‍👩‍👧‍👦' },
  ],
  'g4_u16': [
    { type: 'fill-blank', prompt: 'What is the weather like? It is ___ and warm.', promptVi: 'Thời tiết thế nào? Trời ___ và ấm.', answer: 'sunny', imageEmoji: '☀️' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'It is rainy and cold today.', imageEmoji: '🌧️' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'The weather is cloudy and cool.', audioText: 'The weather is cloudy and cool.', imageEmoji: '⛅' },
  ],
  'g4_u17': [
    { type: 'fill-blank', prompt: 'How do I get to the ___? (place for sick people)', promptVi: 'Tôi đến ___ thế nào? (nơi cho người bệnh)', answer: 'hospital', imageEmoji: '🏥' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'Go straight and turn left.', imageEmoji: '🗺️' },
    { type: 'free-write', prompt: 'Give directions from your school to a place:', promptVi: 'Chỉ đường từ trường đến một nơi:', answer: 'Go straight. Then turn left. The library is on the right.', hints: ['Go straight...', 'Then turn left/right...', 'The ___ is on the left/right.'], imageEmoji: '📍' },
  ],
  'g4_u18': [
    { type: 'fill-blank', prompt: 'How much is the T-shirt? It\'s ___ dong.', promptVi: 'Áo phông bao nhiêu tiền? ___ đồng.', answer: '100000,100,000', imageEmoji: '👕' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'I want to buy new shoes.', imageEmoji: '👟' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'This dress is very beautiful.', audioText: 'This dress is very beautiful.', imageEmoji: '👗' },
  ],
  'g4_u19': [
    { type: 'fill-blank', prompt: 'A ___ has black and white stripes.', promptVi: 'Con ___ có sọc đen trắng.', answer: 'zebra', imageEmoji: '🦓' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'The panda eats bamboo.', imageEmoji: '🐼' },
    { type: 'free-write', prompt: 'Write about your favourite wild animal:', promptVi: 'Viết về động vật hoang dã yêu thích:', answer: 'My favourite animal is the panda. It lives in China. It eats bamboo and is very cute.', hints: ['My favourite animal is...', 'It lives in...', 'It eats... / It can...'], imageEmoji: '🦁' },
  ],
  'g4_u20': [
    { type: 'fill-blank', prompt: 'At summer camp, we sat around the ___.', promptVi: 'Ở trại hè, chúng tôi ngồi quanh ___.', answer: 'campfire', imageEmoji: '🔥' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'We explored the forest together.', imageEmoji: '🌲' },
    { type: 'free-write', prompt: 'Write about a camping adventure:', promptVi: 'Viết về chuyến cắm trại:', answer: 'Last summer, I went to camp. We hiked in the mountains and sat around the campfire. It was amazing!', hints: ['Last summer, I went to...', 'We hiked/explored/played...', 'It was... (exciting/amazing/fun)'], imageEmoji: '⛺' },
  ],
};

// ══════════════════════════ GRADE 5 ══════════════════════════
// Units from english-units-g5.ts — higher complexity

export const GRADE5_WRITING_EXERCISES: Record<string, WritingExercise[]> = {
  'g5_u01': [
    { type: 'fill-blank', prompt: 'How did you ___ your summer? (spend)', promptVi: 'Em ___ hè như thế nào? (trải qua)', answer: 'spend', imageEmoji: '☀️' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'I visited my grandparents last summer.', imageEmoji: '👴' },
    { type: 'free-write', prompt: 'Write a paragraph about your summer holiday (4 sentences):', promptVi: 'Viết đoạn văn về kỳ nghỉ hè (4 câu):', answer: 'Last summer, I went to Da Lat. I visited the flower garden. I ate strawberries. It was wonderful!', hints: ['Last summer, I went to...', 'I visited/saw...', 'I ate/played/swam...', 'It was wonderful/amazing/great!'], imageEmoji: '✍️' },
  ],
  'g5_u02': [
    { type: 'fill-blank', prompt: 'I have English ___ a week. (how often)', promptVi: 'Tôi có Tiếng Anh ___ một tuần.', answer: 'three times,twice,four times', imageEmoji: '📚' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'How often do you have English?', imageEmoji: '📅' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'We practice English every day.', audioText: 'We practice English every day.', imageEmoji: '🎧' },
  ],
  'g5_u03': [
    { type: 'fill-blank', prompt: 'He is ___ than his brother. (old)', promptVi: 'Anh ấy ___ hơn em trai. (già/lớn)', answer: 'older', imageEmoji: '👦👧' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'My sister is younger than me.', imageEmoji: '👧' },
    { type: 'free-write', prompt: 'Compare yourself with a family member:', promptVi: 'So sánh bản thân với người thân:', answer: 'I am taller than my sister. She is younger than me. But she is smarter than me!', hints: ['I am ___er than my...', 'He/She is ___er than me.', 'But he/she is also ___er.'], imageEmoji: '📊' },
  ],
  'g5_u04': [
    { type: 'fill-blank', prompt: 'Ha Long Bay is in ___ Vietnam. (north/south)', promptVi: 'Vịnh Hạ Long ở ___ Việt Nam.', answer: 'north,northern', imageEmoji: '🏝️' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'Vietnam is a beautiful country.', imageEmoji: '🇻🇳' },
    { type: 'free-write', prompt: 'Write about a famous place in Vietnam:', promptVi: 'Viết về một danh lam thắng cảnh:', answer: 'Ha Long Bay is in northern Vietnam. It has beautiful islands and clear water. Many tourists visit Ha Long Bay every year.', hints: ['___ is in (north/south/central) Vietnam.', 'It has beautiful...', 'Many tourists visit... every year.'], imageEmoji: '⛰️' },
  ],
  'g5_u05': [
    { type: 'fill-blank', prompt: 'I ___ like to be a doctor. (would)', promptVi: 'Tôi ___ muốn làm bác sĩ.', answer: 'would', imageEmoji: '👨‍⚕️' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'What would you like to be?', imageEmoji: '❓' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'I would like to be a teacher.', audioText: 'I would like to be a teacher.', imageEmoji: '👩‍🏫' },
  ],
  'g5_u06': [
    { type: 'fill-blank', prompt: 'You ___ go to bed early. (should)', promptVi: 'Em ___ đi ngủ sớm.', answer: 'should', imageEmoji: '🛌' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'You should eat more vegetables.', imageEmoji: '🥦' },
    { type: 'free-write', prompt: 'Write 3 health tips:', promptVi: 'Viết 3 lời khuyên sức khỏe:', answer: 'You should eat vegetables. You should exercise every day. You should not eat too much candy.', hints: ['You should eat/do/sleep...', 'You should exercise/drink...', 'You should not eat/play too much...'], imageEmoji: '💪' },
  ],
  'g5_u07': [
    { type: 'fill-blank', prompt: 'What is ___ favourite festival? (your)', promptVi: 'Lễ hội yêu thích ___ em là gì?', answer: 'your', imageEmoji: '🎊' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'We celebrate Tet in January or February.', imageEmoji: '🏮' },
    { type: 'free-write', prompt: 'Write about your favourite festival:', promptVi: 'Viết về lễ hội yêu thích:', answer: 'My favourite festival is Tet. We celebrate Tet in January or February. We eat banh chung and visit our relatives.', hints: ['My favourite festival is...', 'We celebrate it in...', 'We eat/play/visit...'], imageEmoji: '🎆' },
  ],
  'g5_u08': [
    { type: 'fill-blank', prompt: 'My neighbourhood is very ___. (quiet/noisy)', promptVi: 'Khu phố của tôi rất ___.', answer: 'quiet,noisy,peaceful', imageEmoji: '🏘️' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'There are many trees in my neighbourhood.', imageEmoji: '🌳' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'I live near a park and a school.', audioText: 'I live near a park and a school.', imageEmoji: '🏞️' },
  ],
  'g5_u09': [
    { type: 'fill-blank', prompt: 'There is a ___ opposite the bank. (place to eat)', promptVi: 'Có một ___ đối diện ngân hàng. (nơi ăn)', answer: 'restaurant', imageEmoji: '🍽️' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'The bookshop is between the bank and the cinema.', imageEmoji: '📍' },
    { type: 'free-write', prompt: 'Describe your neighbourhood:', promptVi: 'Mô tả khu phố:', answer: 'My neighbourhood is quiet. There is a park near my house. There are many shops and restaurants.', hints: ['My neighbourhood is...', 'There is a... near my house.', 'There are many...'], imageEmoji: '🗺️' },
  ],
  'g5_u10': [
    { type: 'fill-blank', prompt: 'The Great Wall is in ___.', promptVi: 'Vạn Lý Trường Thành ở ___.', answer: 'China', imageEmoji: '🏯' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'I would like to visit London.', imageEmoji: '🗼' },
    { type: 'free-write', prompt: 'Write about a country you want to visit:', promptVi: 'Viết về đất nước em muốn đến:', answer: 'I want to visit Japan. It has beautiful temples and cherry blossoms. The food is delicious.', hints: ['I want to visit...', 'It has beautiful...', 'The food/people/weather is...'], imageEmoji: '✈️' },
  ],
};

// Helpers
export function getGrade4WritingExercises(unitId: string): WritingExercise[] {
  return GRADE4_WRITING_EXERCISES[unitId] || [];
}

export function getGrade5WritingExercises(unitId: string): WritingExercise[] {
  return GRADE5_WRITING_EXERCISES[unitId] || [];
}
