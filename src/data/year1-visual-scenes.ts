// Year 1 Visual Scene Illustrations — child-friendly visual learning
// Maps each topic to a rich visual scene with colors, icons, and illustration hints

export interface VisualScene {
  /** Large hero illustration emoji cluster */
  sceneEmojis: string[];
  /** Background gradient for the scene */
  bgGradient: string;
  /** Accent pattern color */
  accentColor: string;
  /** Decorative floating elements */
  floatingIcons: string[];
  /** Scene description for alt-text / aria */
  sceneAlt: string;
  /** Visual learning tip for parents */
  visualTip?: string;
}

/** Fallback scene per subject */
const SUBJECT_FALLBACK: Record<string, VisualScene> = {
  english: { sceneEmojis: ['📖','✏️','🔤'], bgGradient: 'linear-gradient(135deg,#dbeafe,#eff6ff)', accentColor: '#3b82f6', floatingIcons: ['⭐','📚','🎯'], sceneAlt: 'English lesson' },
  math: { sceneEmojis: ['🔢','➕','🧮'], bgGradient: 'linear-gradient(135deg,#fef3c7,#fffbeb)', accentColor: '#f59e0b', floatingIcons: ['⭐','🔟','🎯'], sceneAlt: 'Math lesson' },
  science: { sceneEmojis: ['🔬','🌿','💡'], bgGradient: 'linear-gradient(135deg,#dcfce7,#f0fdf4)', accentColor: '#22c55e', floatingIcons: ['⭐','🧪','🎯'], sceneAlt: 'Science lesson' },
};

/** Topic-specific visual scenes */
const TOPIC_SCENES: Record<string, VisualScene> = {
  // ─── ENGLISH ───
  en1_1: { sceneEmojis: ['👨‍👩‍👧‍👦','🏠','❤️'], bgGradient: 'linear-gradient(135deg,#fce7f3,#fdf2f8)', accentColor: '#ec4899', floatingIcons: ['👶','🧸','🌸','💕'], sceneAlt: 'Happy family at home', visualTip: 'Hãy chỉ vào từng thành viên trong gia đình và nói tên bằng tiếng Anh' },
  en1_2: { sceneEmojis: ['👋','📛','🎂'], bgGradient: 'linear-gradient(135deg,#e0e7ff,#eef2ff)', accentColor: '#6366f1', floatingIcons: ['🎈','🎁','✨'], sceneAlt: 'Child introducing themselves' },
  en1_4: { sceneEmojis: ['🍎','⚽','🐱'], bgGradient: 'linear-gradient(135deg,#fef9c3,#fefce8)', accentColor: '#eab308', floatingIcons: ['🔤','🅰️','🅱️','🔡'], sceneAlt: 'Phonics alphabet fun', visualTip: 'Chỉ vào mỗi hình, nói chữ cái đầu: A-Apple, B-Ball...' },
  en2_1: { sceneEmojis: ['🏠','🚪','🪟'], bgGradient: 'linear-gradient(135deg,#fed7aa,#fff7ed)', accentColor: '#ea580c', floatingIcons: ['🛏️','🪑','💡'], sceneAlt: 'Inside a cozy house' },
  en2_2: { sceneEmojis: ['🛏️','🎨','✨'], bgGradient: 'linear-gradient(135deg,#e9d5ff,#f5f3ff)', accentColor: '#a855f7', floatingIcons: ['🖼️','🧸','🌙'], sceneAlt: 'A new bedroom for Amy' },
  en3_1: { sceneEmojis: ['🌙','⭐','🌠'], bgGradient: 'linear-gradient(135deg,#1e1b4b,#312e81)', accentColor: '#818cf8', floatingIcons: ['✨','💫','🌟','⭐'], sceneAlt: 'Moon and stars in night sky' },
  en4_1: { sceneEmojis: ['🌻','🦋','🌳'], bgGradient: 'linear-gradient(135deg,#dcfce7,#f0fdf4)', accentColor: '#16a34a', floatingIcons: ['🐝','🌸','🌺','🍃'], sceneAlt: 'Beautiful garden with flowers', visualTip: 'Ra vườn thật, chỉ và gọi tên: flower, tree, butterfly' },
  en5_1: { sceneEmojis: ['🏝️','🌊','⛵'], bgGradient: 'linear-gradient(135deg,#bae6fd,#e0f2fe)', accentColor: '#0284c7', floatingIcons: ['🐚','🦀','🐠','☀️'], sceneAlt: 'Tropical island adventure' },
  en5_3: { sceneEmojis: ['🔤','📝','🧩'], bgGradient: 'linear-gradient(135deg,#fef3c7,#fffbeb)', accentColor: '#d97706', floatingIcons: ['🅰️','🅱️','✏️','📖'], sceneAlt: 'Sight words building blocks', visualTip: 'Viết từ lên bảng, con đọc to 3 lần' },
  en6_1: { sceneEmojis: ['🏖️','🌊','🦀'], bgGradient: 'linear-gradient(135deg,#fef08a,#fef9c3)', accentColor: '#ca8a04', floatingIcons: ['☀️','🐚','🕊️','🏄'], sceneAlt: 'Fun day at the beach' },
  en6_3: { sceneEmojis: ['✉️','🏖️','✍️'], bgGradient: 'linear-gradient(135deg,#fbcfe8,#fce7f3)', accentColor: '#db2777', floatingIcons: ['📮','💌','🌴'], sceneAlt: 'Writing a beach postcard' },
  en7_1: { sceneEmojis: ['✅','🚫','📋'], bgGradient: 'linear-gradient(135deg,#d1fae5,#ecfdf5)', accentColor: '#059669', floatingIcons: ['👍','👎','🏫','📏'], sceneAlt: 'School rules and safety' },
  en7_3: { sceneEmojis: ['📋','✍️','🎨'], bgGradient: 'linear-gradient(135deg,#e0e7ff,#eef2ff)', accentColor: '#4f46e5', floatingIcons: ['📌','✂️','🖍️'], sceneAlt: 'Making a rules poster' },
  en8_1: { sceneEmojis: ['🐒','🐘','🦒'], bgGradient: 'linear-gradient(135deg,#fef3c7,#fffbeb)', accentColor: '#b45309', floatingIcons: ['🦁','🦜','🐍','🌴'], sceneAlt: 'Zoo animals', visualTip: 'Bắt chước tiếng kêu mỗi con vật!' },
  en8_3: { sceneEmojis: ['✍️','🐾','❤️'], bgGradient: 'linear-gradient(135deg,#fce7f3,#fdf2f8)', accentColor: '#be185d', floatingIcons: ['🖍️','📝','🎨'], sceneAlt: 'Writing about favourite animal' },
  en9_1: { sceneEmojis: ['🕳️','🔦','💎'], bgGradient: 'linear-gradient(135deg,#374151,#4b5563)', accentColor: '#fbbf24', floatingIcons: ['🗺️','🧭','✨','🪙'], sceneAlt: 'Exploring a dark cave' },
  en9_3: { sceneEmojis: ['📝','🗺️','🌟'], bgGradient: 'linear-gradient(135deg,#ede9fe,#f5f3ff)', accentColor: '#7c3aed', floatingIcons: ['✍️','📖','🎭'], sceneAlt: 'Writing an adventure story' },

  // ─── MATH ───
  ma1_1: { sceneEmojis: ['1️⃣','2️⃣','3️⃣'], bgGradient: 'linear-gradient(135deg,#fef3c7,#fffbeb)', accentColor: '#f59e0b', floatingIcons: ['🍎','🍊','🍋','🫐'], sceneAlt: 'Counting fruits', visualTip: 'Đếm đồ vật thật: 1 quả táo, 2 quả cam...' },
  ma2_1: { sceneEmojis: ['➕','🧮','🎯'], bgGradient: 'linear-gradient(135deg,#dbeafe,#eff6ff)', accentColor: '#2563eb', floatingIcons: ['1️⃣','2️⃣','3️⃣','🔟'], sceneAlt: 'Addition with abacus' },
  ma3_1: { sceneEmojis: ['➖','🧮','🎯'], bgGradient: 'linear-gradient(135deg,#fce7f3,#fdf2f8)', accentColor: '#db2777', floatingIcons: ['5️⃣','4️⃣','3️⃣','🔢'], sceneAlt: 'Subtraction with objects' },
  ma4_1: { sceneEmojis: ['🔵','🟡','🔺'], bgGradient: 'linear-gradient(135deg,#e0e7ff,#eef2ff)', accentColor: '#4f46e5', floatingIcons: ['⬜','⭕','🔷','🔶'], sceneAlt: '2D shapes everywhere' },
  ma4_2: { sceneEmojis: ['📦','⚽','🧊'], bgGradient: 'linear-gradient(135deg,#f0fdf4,#dcfce7)', accentColor: '#16a34a', floatingIcons: ['🎲','🏀','🧱'], sceneAlt: '3D shapes' },
  ma7_1: { sceneEmojis: ['📏','🦒','🐁'], bgGradient: 'linear-gradient(135deg,#fef9c3,#fefce8)', accentColor: '#ca8a04', floatingIcons: ['📐','🔍','↕️'], sceneAlt: 'Comparing lengths' },
  ma8_1: { sceneEmojis: ['🕐','⏰','🌅'], bgGradient: 'linear-gradient(135deg,#e0f2fe,#f0f9ff)', accentColor: '#0369a1', floatingIcons: ['🕑','🕒','🕓','🕔'], sceneAlt: 'Telling time' },
  ma10_1: { sceneEmojis: ['🪙','💷','🛒'], bgGradient: 'linear-gradient(135deg,#fef3c7,#fffbeb)', accentColor: '#b45309', floatingIcons: ['💰','🏪','🧾'], sceneAlt: 'UK coins and shopping' },
  'ma10_1b': { sceneEmojis: ['💵','🇻🇳','🛒'], bgGradient: 'linear-gradient(135deg,#dcfce7,#f0fdf4)', accentColor: '#15803d', floatingIcons: ['💰','🏪','🧾','🍬'], sceneAlt: 'Vietnamese money', visualTip: 'Dùng tiền thật để con tập nhận biết!' },
  ma11_1: { sceneEmojis: ['🍕','½','🔪'], bgGradient: 'linear-gradient(135deg,#fee2e2,#fef2f2)', accentColor: '#dc2626', floatingIcons: ['🍰','🥧','🍫'], sceneAlt: 'Fractions with food' },
  ma12_1: { sceneEmojis: ['⬅️','➡️','⬆️'], bgGradient: 'linear-gradient(135deg,#e0e7ff,#eef2ff)', accentColor: '#6366f1', floatingIcons: ['🧭','🗺️','📍'], sceneAlt: 'Position and direction' },

  // ─── SCIENCE ───
  sc1_1: { sceneEmojis: ['🌱','🌿','🌳'], bgGradient: 'linear-gradient(135deg,#dcfce7,#f0fdf4)', accentColor: '#16a34a', floatingIcons: ['🌸','🍃','🌻','☀️'], sceneAlt: 'Plants growing', visualTip: 'Quan sát cây thật: chỉ vào lá, thân, rễ, hoa' },
  sc1_2: { sceneEmojis: ['🌸','🌿','🪴'], bgGradient: 'linear-gradient(135deg,#d9f99d,#ecfccb)', accentColor: '#65a30d', floatingIcons: ['🏷️','📌','✏️'], sceneAlt: 'Labelling plant parts' },
  sc2_1: { sceneEmojis: ['🐟','🐦','🐕'], bgGradient: 'linear-gradient(135deg,#fef3c7,#fffbeb)', accentColor: '#d97706', floatingIcons: ['🦎','🐸','🦋','🐾'], sceneAlt: 'Animal groups' },
  sc2_4: { sceneEmojis: ['👁️','👂','👃'], bgGradient: 'linear-gradient(135deg,#fce7f3,#fdf2f8)', accentColor: '#ec4899', floatingIcons: ['👅','✋','🎵','🌺'], sceneAlt: 'Five senses', visualTip: 'Chơi trò đoán: bịt mắt, ngửi, sờ, nếm!' },
  sc3_1: { sceneEmojis: ['🪵','🧱','🔩'], bgGradient: 'linear-gradient(135deg,#fed7aa,#fff7ed)', accentColor: '#ea580c', floatingIcons: ['🧶','📄','🔍'], sceneAlt: 'Everyday materials' },
  sc4_1: { sceneEmojis: ['🌸','☀️','🍂','❄️'], bgGradient: 'linear-gradient(135deg,#fef9c3,#fefce8)', accentColor: '#ca8a04', floatingIcons: ['🌈','🌧️','☃️','🌻'], sceneAlt: 'Four seasons' },
  sc6_1: { sceneEmojis: ['💧','☀️','🌱'], bgGradient: 'linear-gradient(135deg,#d1fae5,#ecfdf5)', accentColor: '#059669', floatingIcons: ['🧪','📏','📓'], sceneAlt: 'What plants need to grow' },
};

/** Get visual scene for a topic, with subject fallback */
export function getVisualScene(topicId: string, subject?: string): VisualScene {
  if (TOPIC_SCENES[topicId]) return TOPIC_SCENES[topicId];
  const sub = subject || (topicId.startsWith('en') ? 'english' : topicId.startsWith('ma') ? 'math' : 'science');
  return SUBJECT_FALLBACK[sub] || SUBJECT_FALLBACK.english;
}
