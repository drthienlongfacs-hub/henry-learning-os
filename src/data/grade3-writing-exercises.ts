// ═══════════════════════════════════════════════════════════════
// English Grade 3 Writing Exercises — Global Success textbook
// 20 Units × 3-4 writing exercises per unit
// Exercise types matched to unit vocabulary and patterns
// ═══════════════════════════════════════════════════════════════

import type { WritingExercise } from '@/components/WritingExercise';

export const GRADE3_WRITING_EXERCISES: Record<string, WritingExercise[]> = {
  // ══ Unit 1: Hello ══
  'g3_u01': [
    { type: 'fill-blank', prompt: '___, I\'m Mai.', promptVi: '___. Tôi là Mai.', answer: 'Hello,Hi', imageEmoji: '👋' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'Nice to meet you.', imageEmoji: '🤝' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'Good morning.', audioText: 'Good morning.', imageEmoji: '🌅' },
  ],

  // ══ Unit 2: Our names ══
  'g3_u02': [
    { type: 'fill-blank', prompt: 'What\'s your ___? My name\'s Henry.', promptVi: '___ bạn là gì? Tên tôi là Henry.', answer: 'name', imageEmoji: '📛' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'How do you spell your name?', imageEmoji: '🔤' },
    { type: 'free-write', prompt: 'Write a short introduction about yourself:', promptVi: 'Viết giới thiệu ngắn về bản thân:', answer: 'My name is Henry. I am seven years old.', hints: ['Start: My name is...', 'Add: I am ___ years old.'], imageEmoji: '👦' },
  ],

  // ══ Unit 3: Our friends ══
  'g3_u03': [
    { type: 'fill-blank', prompt: 'This is ___ friend, Lan.', promptVi: 'Đây là bạn ___ tôi, Lan.', answer: 'my', imageEmoji: '👫' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'Is that your friend?', imageEmoji: '❓' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'She is my new friend.', audioText: 'She is my new friend.', imageEmoji: '👧' },
  ],

  // ══ Unit 4: Our bodies ══
  'g3_u04': [
    { type: 'fill-blank', prompt: 'Touch your ___. (part of the face that smells)', promptVi: 'Chạm vào ___. (bộ phận ngửi)', answer: 'nose', hints: ['It is in the middle of your face'], imageEmoji: '👃' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'Point to your eyes.', imageEmoji: '👀' },
    { type: 'fill-blank', prompt: 'I have two ___ and two ears.', promptVi: 'Tôi có hai ___ và hai tai.', answer: 'eyes', imageEmoji: '👁️' },
  ],

  // ══ Unit 5: My hobbies ══
  'g3_u05': [
    { type: 'fill-blank', prompt: 'I like ___. (activity with water)', promptVi: 'Tôi thích ___. (hoạt động dưới nước)', answer: 'swimming', hints: ['You do this in a pool'], imageEmoji: '🏊' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'I can sing and dance.', imageEmoji: '🎵' },
    { type: 'free-write', prompt: 'Write 2 sentences about your hobbies:', promptVi: 'Viết 2 câu về sở thích của em:', answer: 'I like reading. I can draw.', hints: ['I like ___ing.', 'I can ___.'], imageEmoji: '🎨' },
  ],

  // ══ Unit 6: Our school ══
  'g3_u06': [
    { type: 'fill-blank', prompt: 'Where is the ___? (place with books)', promptVi: '___ ở đâu? (nơi có sách)', answer: 'library', imageEmoji: '📚' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'My school is beautiful.', imageEmoji: '🏫' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'The playground is big.', audioText: 'The playground is big.', imageEmoji: '🏃' },
  ],

  // ══ Unit 7: Classroom instructions ══
  'g3_u07': [
    { type: 'fill-blank', prompt: '___ your book, please.', promptVi: '___ sách ra, làm ơn.', answer: 'Open', imageEmoji: '📖' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'Stand up, please.', imageEmoji: '🧍' },
    { type: 'fill-blank', prompt: 'Be ___, please! (not making noise)', promptVi: 'Xin hãy ___! (không làm ồn)', answer: 'quiet', imageEmoji: '🤫' },
  ],

  // ══ Unit 8: My school things ══
  'g3_u08': [
    { type: 'fill-blank', prompt: 'Do you have a ___? (writing tool)', promptVi: 'Bạn có ___ không? (dụng cụ viết)', answer: 'pencil,pen', imageEmoji: '✏️' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'This is my pencil case.', imageEmoji: '🎒' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'I have a new bag.', audioText: 'I have a new bag.', imageEmoji: '👜' },
  ],

  // ══ Unit 9: Colours ══
  'g3_u09': [
    { type: 'fill-blank', prompt: 'What colour is it? It\'s ___.', promptVi: 'Nó màu gì? Nó màu ___.', answer: 'red,blue,green,yellow', hints: ['Pick any color!'], imageEmoji: '🌈' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'I like the colour blue.', imageEmoji: '💙' },
    { type: 'free-write', prompt: 'Write 2 sentences about your favourite colour:', promptVi: 'Viết 2 câu về màu em thích:', answer: 'My favourite colour is blue. The sky is blue.', hints: ['My favourite colour is...', 'The ___ is (colour).'], imageEmoji: '🎨' },
  ],

  // ══ Unit 10: Break time activities ══
  'g3_u10': [
    { type: 'fill-blank', prompt: 'Let\'s play ___! (chasing game)', promptVi: 'Chúng mình chơi ___ đi! (trò đuổi bắt)', answer: 'tag', imageEmoji: '🏃' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'Do you want to skip?', imageEmoji: '🤸' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'Let\'s play hide and seek.', audioText: "Let's play hide and seek.", imageEmoji: '🙈' },
  ],

  // ══ Unit 11: My family ══
  'g3_u11': [
    { type: 'fill-blank', prompt: 'Who is this? This is my ___.', promptVi: 'Đây là ai? Đây là ___ tôi.', answer: 'mother,father,sister,brother', imageEmoji: '👨‍👩‍👧‍👦' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'I love my family.', imageEmoji: '❤️' },
    { type: 'free-write', prompt: 'Write 3 sentences about your family:', promptVi: 'Viết 3 câu về gia đình em:', answer: 'I have a big family. My mother is kind. My father is strong.', hints: ['I have a ___ family.', 'My mother/father is ___.', 'I love ___.'], imageEmoji: '👪' },
  ],

  // ══ Unit 12: Jobs ══
  'g3_u12': [
    { type: 'fill-blank', prompt: 'She is a ___. She teaches at school.', promptVi: 'Cô ấy là ___. Cô ấy dạy ở trường.', answer: 'teacher', imageEmoji: '👩‍🏫' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'My father is a doctor.', imageEmoji: '👨‍⚕️' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'What does she do?', audioText: 'What does she do?', imageEmoji: '❓' },
  ],

  // ══ Unit 13: My house ══
  'g3_u13': [
    { type: 'fill-blank', prompt: 'There is a ___ in my house. (where we cook)', promptVi: 'Nhà tôi có một ___. (nơi nấu ăn)', answer: 'kitchen', imageEmoji: '🍳' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'How many rooms are there?', imageEmoji: '🏠' },
    { type: 'free-write', prompt: 'Describe your house in 2 sentences:', promptVi: 'Mô tả nhà em bằng 2 câu:', answer: 'My house has four rooms. There is a garden.', hints: ['My house has ___ rooms.', 'There is a ___.'], imageEmoji: '🏡' },
  ],

  // ══ Unit 14: My bedroom ══
  'g3_u14': [
    { type: 'fill-blank', prompt: 'Where is the doll? It\'s ___ the bed.', promptVi: 'Con búp bê ở đâu? Nó ở ___ giường.', answer: 'on,under', imageEmoji: '🛏️' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'I have a desk in my bedroom.', imageEmoji: '📝' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'The lamp is on the desk.', audioText: 'The lamp is on the desk.', imageEmoji: '💡' },
  ],

  // ══ Unit 15: At the dining table ══
  'g3_u15': [
    { type: 'fill-blank', prompt: 'I\'d like some ___, please. (white drink)', promptVi: 'Cho tôi xin một ít ___, làm ơn. (đồ uống trắng)', answer: 'milk', imageEmoji: '🥛' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'Do you like chicken?', imageEmoji: '🍗' },
    { type: 'free-write', prompt: 'Write what you like to eat:', promptVi: 'Viết những gì em thích ăn:', answer: 'I like rice and fish. I like juice too.', hints: ['I like ___ and ___.', 'I like ___ too.'], imageEmoji: '🍚' },
  ],

  // ══ Unit 16: My pets ══
  'g3_u16': [
    { type: 'fill-blank', prompt: 'I have a ___. It is cute. (barks)', promptVi: 'Tôi có một con ___. Nó dễ thương. (sủa)', answer: 'dog', imageEmoji: '🐕' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'My cat is very cute.', imageEmoji: '🐱' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'I have a rabbit.', audioText: 'I have a rabbit.', imageEmoji: '🐰' },
  ],

  // ══ Unit 17: Our toys ══
  'g3_u17': [
    { type: 'fill-blank', prompt: 'My favourite toy is a ___.', promptVi: 'Đồ chơi yêu thích của tôi là ___.', answer: 'robot,ball,kite,car', imageEmoji: '🤖' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'Do you have a teddy bear?', imageEmoji: '🧸' },
    { type: 'free-write', prompt: 'Write about your favourite toy:', promptVi: 'Viết về đồ chơi yêu thích:', answer: 'My favourite toy is a car. It is red and fast.', hints: ['My favourite toy is a ___.', 'It is ___ and ___.'], imageEmoji: '🚗' },
  ],

  // ══ Unit 18: Playing and doing ══
  'g3_u18': [
    { type: 'fill-blank', prompt: 'What are you doing? I\'m ___.', promptVi: 'Bạn đang làm gì? Tôi đang ___.', answer: 'reading,painting,singing,writing', imageEmoji: '🎨' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'She is flying a kite.', imageEmoji: '🪁' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'I am painting a picture.', audioText: 'I am painting a picture.', imageEmoji: '🖼️' },
  ],

  // ══ Unit 19: Outdoor activities ══
  'g3_u19': [
    { type: 'fill-blank', prompt: 'Let\'s go ___! (riding a bicycle)', promptVi: 'Chúng mình đi ___ nào! (đi xe đạp)', answer: 'cycling', imageEmoji: '🚴' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'I like jogging in the park.', imageEmoji: '🏃' },
    { type: 'free-write', prompt: 'Write about your favourite outdoor activity:', promptVi: 'Viết về hoạt động ngoài trời yêu thích:', answer: 'I like cycling in the park. It is fun and healthy.', hints: ['I like ___ing.', 'It is ___ and ___.'], imageEmoji: '🌳' },
  ],

  // ══ Unit 20: At the zoo ══
  'g3_u20': [
    { type: 'fill-blank', prompt: 'I can see a ___. It is very big. (largest land animal)', promptVi: 'Tôi thấy một con ___. Nó rất to. (động vật trên cạn lớn nhất)', answer: 'elephant', imageEmoji: '🐘' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'The monkey is very funny.', imageEmoji: '🐒' },
    { type: 'free-write', prompt: 'Write about 3 animals at the zoo:', promptVi: 'Viết về 3 con vật ở sở thú:', answer: 'I can see a tiger. The elephant is big. The penguin is cute.', hints: ['I can see a ___.', 'The ___ is ___ (big/funny/cute).'], imageEmoji: '🦁' },
  ],
};

// Helper to get exercises for Grade 3 units
export function getGrade3WritingExercises(unitId: string): WritingExercise[] {
  return GRADE3_WRITING_EXERCISES[unitId] || [];
}
