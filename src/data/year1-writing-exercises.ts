// ═══════════════════════════════════════════════════════════════
// Year 1 Writing Exercises — Matched to Macmillan English 1
// Each unit has 3-5 writing exercises aligned to textbook content
// Exercise types: fill-blank, dictation, reorder, free-write
// ═══════════════════════════════════════════════════════════════

import type { WritingExercise } from '@/components/WritingExercise';

export const YEAR1_WRITING_EXERCISES: Record<string, WritingExercise[]> = {
  // ══ Unit 1: My Family and Me ══
  'en_u1': [
    { type: 'fill-blank', prompt: 'I am ___. (Write your name)', promptVi: 'Tôi là ___. (Viết tên em)', answer: 'Henry', hints: ['Your name goes here!'], imageEmoji: '👦' },
    { type: 'fill-blank', prompt: 'This is my ___. She is kind.', promptVi: 'Đây là ___ tôi. Bà ấy tốt bụng.', answer: 'mother,mum,mom', hints: ['Female parent'], imageEmoji: '👩' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'I have a sister.', imageEmoji: '👧' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'My father is tall.', audioText: 'My father is tall.', imageEmoji: '👨' },
  ],

  // ══ Unit 2: Sam's House ══
  'en_u2': [
    { type: 'fill-blank', prompt: 'The book is ___ the table.', promptVi: 'Quyển sách ở ___ bàn.', answer: 'on', hints: ['Preposition: on top of'], imageEmoji: '📚' },
    { type: 'fill-blank', prompt: 'The cat is ___ the bed.', promptVi: 'Con mèo ở ___ giường.', answer: 'under', hints: ['Below, underneath'], imageEmoji: '🐱' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'There is a bed in my room.', imageEmoji: '🛏️' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'Open the door.', audioText: 'Open the door.', imageEmoji: '🚪' },
  ],

  // ══ Unit 3: The Moon and the Stars ══
  'en_u3': [
    { type: 'fill-blank', prompt: 'The ___ is bright at night.', promptVi: '___ sáng vào ban đêm.', answer: 'moon', hints: ['It shines at night, not the sun'], imageEmoji: '🌙' },
    { type: 'fill-blank', prompt: 'Stars are in the ___.', promptVi: 'Các ngôi sao ở trên ___.', answer: 'sky', hints: ['Where birds fly'], imageEmoji: '⭐' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'Can the moon see me?', imageEmoji: '🌙' },
    { type: 'fill-blank', prompt: '___ and spoon rhyme. (What word?)', promptVi: '___ và spoon vần với nhau. (Từ nào?)', answer: 'moon', hints: ['m-oo-n, sp-oo-n'], imageEmoji: '🥄' },
  ],

  // ══ Unit 4: Sam's Garden ══
  'en_u4': [
    { type: 'fill-blank', prompt: 'A ___ flies in the garden.', promptVi: 'Một con ___ bay trong vườn.', answer: 'butterfly', hints: ['It has colorful wings'], imageEmoji: '🦋' },
    { type: 'fill-blank', prompt: 'The ___ makes honey.', promptVi: 'Con ___ làm mật.', answer: 'bee', hints: ['Buzz buzz! 🐝'], imageEmoji: '🐝' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'The flower is red.', imageEmoji: '🌹' },
    { type: 'dictation', prompt: 'Listen and write:', promptVi: 'Nghe và viết:', answer: 'I like the green grass.', audioText: 'I like the green grass.', imageEmoji: '🌿' },
  ],

  // ══ Unit 5: Sam's Island ══
  'en_u5': [
    { type: 'fill-blank', prompt: 'I found a ___ on the beach.', promptVi: 'Tôi tìm thấy một ___ trên bãi biển.', answer: 'shell', hints: ['Sea creatures leave these behind'], imageEmoji: '🐚' },
    { type: 'fill-blank', prompt: '___ is my house? (Question word)', promptVi: '___ là nhà tôi? (Từ để hỏi)', answer: 'Where', hints: ['Asking about place/location'], imageEmoji: '📍' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'A boat goes on the sea.', imageEmoji: '⛵' },
    { type: 'free-write', prompt: 'Write 2 sentences about your dream island:', promptVi: 'Viết 2 câu về hòn đảo mơ ước:', answer: 'My island has sand and sea.', hints: ['Start with: My island has...', 'Use words: sand, sea, trees, animals'], imageEmoji: '🏝️' },
  ],

  // ══ Unit 6: On the Beach ══
  'en_u6': [
    { type: 'fill-blank', prompt: 'A ___ lives on the beach.', promptVi: 'Một con ___ sống trên bãi biển.', answer: 'crab', hints: ['It walks sideways! 🦀'], imageEmoji: '🦀' },
    { type: 'fill-blank', prompt: 'I ___ a crab at the beach. (past tense of "see")', promptVi: 'Tôi ___ một con cua ở biển. (quá khứ của "see")', answer: 'saw', hints: ['see → saw'], imageEmoji: '👀' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'We went to the beach.', imageEmoji: '🏖️' },
    { type: 'free-write', prompt: 'Write a postcard from the beach. Start with "Dear...":', promptVi: 'Viết bưu thiếp từ biển. Bắt đầu bằng "Dear...":', answer: 'Dear friend, I am at the beach!', hints: ['Start: Dear [name],', 'Write: I can see... / I played with...', 'End: Wish you were here!'], imageEmoji: '✉️' },
  ],

  // ══ Unit 7: Do or Don't? ══
  'en_u7': [
    { type: 'fill-blank', prompt: "___ run in the classroom!", promptVi: "___ chạy trong lớp học!", answer: "Don't,Do not", hints: ['This is a rule telling you NOT to do something'], imageEmoji: '🚫' },
    { type: 'fill-blank', prompt: '___ listen to the teacher.', promptVi: '___ nghe thầy cô giáo.', answer: 'Do', hints: ['This is a positive rule'], imageEmoji: '✅' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: "Don't run in the classroom.", imageEmoji: '🏃' },
    { type: 'free-write', prompt: 'Write 2 class rules. One "Do" and one "Don\'t":', promptVi: 'Viết 2 nội quy lớp. Một câu "Do" và một câu "Don\'t":', answer: "Do listen carefully. Don't run in class.", hints: ['Do + positive action', "Don't + action to avoid"], imageEmoji: '📋' },
  ],

  // ══ Unit 8: Monkey Fun ══
  'en_u8': [
    { type: 'fill-blank', prompt: 'An ___ has a long trunk.', promptVi: 'Một con ___ có vòi dài.', answer: 'elephant', hints: ['The biggest land animal'], imageEmoji: '🐘' },
    { type: 'fill-blank', prompt: 'A ___ is the tallest animal.', promptVi: 'Con ___ là động vật cao nhất.', answer: 'giraffe', hints: ['It has a very long neck'], imageEmoji: '🦒' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'Monkeys climb trees.', imageEmoji: '🐒' },
    { type: 'free-write', prompt: 'Write 3 sentences about your favourite animal:', promptVi: 'Viết 3 câu về con vật em yêu thích:', answer: 'My favourite animal is a dog. It is big and friendly. I like it because it can play with me.', hints: ['Sentence 1: My favourite animal is a ___', 'Sentence 2: It is ___ (big/small/fast)', 'Sentence 3: I like it because ___'], imageEmoji: '🐾' },
  ],

  // ══ Unit 9: In the Cave / Playtime ══
  'en_u9': [
    { type: 'fill-blank', prompt: 'You need a ___ in a dark cave.', promptVi: 'Em cần một ___ trong hang tối.', answer: 'torch', hints: ['It gives light in the dark'], imageEmoji: '🔦' },
    { type: 'fill-blank', prompt: 'Let\'s ___ the treasure!', promptVi: 'Hãy ___ kho báu!', answer: 'find', hints: ['Discover, look for'], imageEmoji: '💎' },
    { type: 'reorder', prompt: 'Put the words in order:', promptVi: 'Sắp xếp từ thành câu:', answer: 'First, I went to the cave.', imageEmoji: '🕳️' },
    { type: 'free-write', prompt: 'Write a short adventure story (3 sentences). Use: First, Then, Finally:', promptVi: 'Viết câu chuyện phiêu lưu ngắn (3 câu). Dùng: First, Then, Finally:', answer: 'First, I went to the cave. Then, I found the treasure. Finally, I went home happy.', hints: ['First, I went to ___', 'Then, I found/saw ___', 'Finally, I ___'], imageEmoji: '📖' },
  ],
};

// ── Import other grade exercise banks ──
import { GRADE3_WRITING_EXERCISES } from './grade3-writing-exercises';
import { GRADE4_WRITING_EXERCISES, GRADE5_WRITING_EXERCISES } from './grade4-5-writing-exercises';

// Unified helper — searches all grade banks
export function getWritingExercises(unitId: string): WritingExercise[] {
  return YEAR1_WRITING_EXERCISES[unitId] 
    || GRADE3_WRITING_EXERCISES[unitId] 
    || GRADE4_WRITING_EXERCISES[unitId]
    || GRADE5_WRITING_EXERCISES[unitId]
    || [];
}
