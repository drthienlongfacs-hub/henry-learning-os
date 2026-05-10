// Year 1 Cross-Domain Resource Registry
// Maps related topics ACROSS English, Math, and Science
// Enables holistic learning: same concept, different subjects

export interface CrossDomainLink {
  id: string;
  theme: string;
  themeVi: string;
  themeEmoji: string;
  connections: {
    subject: 'english' | 'math' | 'science';
    topicId: string;
    relevance: string;
    relevanceVi: string;
  }[];
  suggestedActivity?: string;
  suggestedActivityVi?: string;
}

export const CROSS_DOMAIN_LINKS: CrossDomainLink[] = [
  {
    id: 'xd_counting_nature',
    theme: 'Counting in Nature',
    themeVi: 'Đếm trong Tự nhiên',
    themeEmoji: '🌿',
    connections: [
      { subject: 'english', topicId: 'en4_1', relevance: 'Garden vocabulary (flower, tree, butterfly)', relevanceVi: 'Từ vựng vườn (hoa, cây, bướm)' },
      { subject: 'math', topicId: 'ma1_1', relevance: 'Count objects (count flowers, leaves)', relevanceVi: 'Đếm đồ vật (đếm hoa, lá)' },
      { subject: 'science', topicId: 'sc1_1', relevance: 'Plant parts (count petals, leaves)', relevanceVi: 'Bộ phận cây (đếm cánh hoa, lá)' },
    ],
    suggestedActivity: 'Go to the garden. Count the petals on 5 flowers. Write the numbers and flower names in English.',
    suggestedActivityVi: 'Ra vườn. Đếm cánh hoa trên 5 bông hoa. Viết số và tên hoa bằng tiếng Anh.',
  },
  {
    id: 'xd_animal_classification',
    theme: 'Animal World',
    themeVi: 'Thế giới Động vật',
    themeEmoji: '🐾',
    connections: [
      { subject: 'english', topicId: 'en8_1', relevance: 'Animal names (monkey, elephant, giraffe)', relevanceVi: 'Tên động vật (khỉ, voi, hươu cao cổ)' },
      { subject: 'english', topicId: 'en8_2', relevance: 'Habitats (jungle, ocean, desert)', relevanceVi: 'Môi trường sống (rừng, đại dương, sa mạc)' },
      { subject: 'math', topicId: 'ma4_1', relevance: 'Sort animals by shape (round, tall)', relevanceVi: 'Phân loại thú theo hình dạng' },
      { subject: 'science', topicId: 'sc2_1', relevance: 'Animal groups (fish, birds, mammals)', relevanceVi: 'Nhóm động vật (cá, chim, thú)' },
      { subject: 'science', topicId: 'sc2_2', relevance: 'Diet classification (carnivore, herbivore)', relevanceVi: 'Phân loại chế độ ăn' },
    ],
    suggestedActivity: 'Draw 6 animals. Label each with its English name, group (mammal/bird/fish), and diet (herbivore/carnivore/omnivore).',
    suggestedActivityVi: 'Vẽ 6 con vật. Ghi tên tiếng Anh, nhóm (thú/chim/cá), chế độ ăn (ăn cỏ/thịt/tạp).',
  },
  {
    id: 'xd_seasons_weather',
    theme: 'Seasons & Weather',
    themeVi: 'Mùa & Thời tiết',
    themeEmoji: '🌦️',
    connections: [
      { subject: 'english', topicId: 'en4_2', relevance: 'Colours in nature (changing leaves)', relevanceVi: 'Màu sắc thiên nhiên (lá đổi màu)' },
      { subject: 'math', topicId: 'ma8_3', relevance: 'Days of the week (weather diary)', relevanceVi: 'Ngày trong tuần (nhật ký thời tiết)' },
      { subject: 'science', topicId: 'sc4_1', relevance: 'Four seasons overview', relevanceVi: 'Tổng quan bốn mùa' },
      { subject: 'science', topicId: 'sc4_2', relevance: 'Autumn changes (leaves fall)', relevanceVi: 'Thay đổi mùa thu' },
      { subject: 'science', topicId: 'sc5_1', relevance: 'Spring changes (buds, blossom)', relevanceVi: 'Thay đổi mùa xuân' },
      { subject: 'science', topicId: 'sc5_3', relevance: 'Weather diary recording', relevanceVi: 'Ghi chép nhật ký thời tiết' },
    ],
    suggestedActivity: 'Keep a weather diary for one week. Each day: write the day name, draw weather symbols, record temperature.',
    suggestedActivityVi: 'Ghi nhật ký thời tiết 1 tuần. Mỗi ngày: viết tên ngày, vẽ biểu tượng thời tiết, ghi nhiệt độ.',
  },
  {
    id: 'xd_my_body_senses',
    theme: 'My Body & Senses',
    themeVi: 'Cơ thể & Giác quan',
    themeEmoji: '🧑',
    connections: [
      { subject: 'english', topicId: 'en1_1', relevance: 'Family & self introduction', relevanceVi: 'Gia đình & tự giới thiệu' },
      { subject: 'math', topicId: 'ma1_1', relevance: 'Count body parts (fingers, toes)', relevanceVi: 'Đếm bộ phận cơ thể (ngón tay, ngón chân)' },
      { subject: 'science', topicId: 'sc2_3', relevance: 'Human body parts', relevanceVi: 'Các bộ phận cơ thể người' },
      { subject: 'science', topicId: 'sc2_4', relevance: 'Five senses', relevanceVi: 'Năm giác quan' },
    ],
    suggestedActivity: 'Play "Body Counting": Touch your head (1), clap hands (2), stomp feet (3). Name each body part in English.',
    suggestedActivityVi: 'Trò chơi "Đếm bộ phận": Chạm đầu (1), vỗ tay (2), dậm chân (3). Nói tên mỗi bộ phận bằng tiếng Anh.',
  },
  {
    id: 'xd_shapes_everywhere',
    theme: 'Shapes Everywhere',
    themeVi: 'Hình dạng quanh ta',
    themeEmoji: '🔷',
    connections: [
      { subject: 'english', topicId: 'en2_1', relevance: 'House vocabulary (door = rectangle, window = square)', relevanceVi: 'Từ vựng nhà (cửa = hình chữ nhật, cửa sổ = hình vuông)' },
      { subject: 'math', topicId: 'ma4_1', relevance: '2D shapes (circle, square, triangle)', relevanceVi: 'Hình phẳng (tròn, vuông, tam giác)' },
      { subject: 'math', topicId: 'ma4_2', relevance: '3D shapes (cube, sphere, cylinder)', relevanceVi: 'Hình khối (lập phương, cầu, trụ)' },
      { subject: 'science', topicId: 'sc3_1', relevance: 'Materials and their shapes', relevanceVi: 'Vật liệu và hình dạng' },
    ],
    suggestedActivity: 'Shape Hunt: Walk around the house. Find 3 circles, 3 squares, 3 rectangles. Write what material each is made of.',
    suggestedActivityVi: 'Truy tìm hình: Đi quanh nhà. Tìm 3 hình tròn, 3 hình vuông, 3 hình chữ nhật. Viết mỗi hình làm từ vật liệu gì.',
  },
  {
    id: 'xd_beach_adventure',
    theme: 'Beach & Sea Adventure',
    themeVi: 'Phiêu lưu Biển',
    themeEmoji: '🏖️',
    connections: [
      { subject: 'english', topicId: 'en5_1', relevance: 'Island & sea vocabulary', relevanceVi: 'Từ vựng đảo & biển' },
      { subject: 'english', topicId: 'en6_1', relevance: 'Beach vocabulary (wave, crab)', relevanceVi: 'Từ vựng bãi biển' },
      { subject: 'math', topicId: 'ma7_1', relevance: 'Measure shell lengths', relevanceVi: 'Đo chiều dài vỏ sò' },
      { subject: 'science', topicId: 'sc3_2', relevance: 'Material properties (sand = rough, shell = hard)', relevanceVi: 'Tính chất vật liệu (cát = thô, vỏ sò = cứng)' },
    ],
    suggestedActivity: 'Collect 5 shells. Measure each with a ruler. Describe each: colour, texture (rough/smooth), and size (long/short).',
    suggestedActivityVi: 'Thu 5 vỏ sò. Đo mỗi chiếc bằng thước. Mô tả: màu, bề mặt (thô/mịn), kích thước (dài/ngắn).',
  },
  {
    id: 'xd_money_shopping',
    theme: 'Shopping & Money',
    themeVi: 'Mua sắm & Tiền tệ',
    themeEmoji: '🛒',
    connections: [
      { subject: 'english', topicId: 'en4_2', relevance: 'Colour & description words for items', relevanceVi: 'Từ mô tả màu sắc cho đồ vật' },
      { subject: 'math', topicId: 'ma2_1', relevance: 'Addition (total cost)', relevanceVi: 'Phép cộng (tổng giá)' },
      { subject: 'math', topicId: 'ma3_1', relevance: 'Subtraction (change)', relevanceVi: 'Phép trừ (tiền thối)' },
      { subject: 'math', topicId: 'ma10_1', relevance: 'Recognise coins', relevanceVi: 'Nhận biết tiền xu' },
      { subject: 'math', topicId: 'ma10_3', relevance: 'Shopping word problems', relevanceVi: 'Bài toán mua sắm' },
    ],
    suggestedActivity: 'Set up a pretend shop. Label items with prices. Practice buying: "I want the red apple. It costs 5p. I pay 10p. My change is 5p."',
    suggestedActivityVi: 'Lập cửa hàng giả. Ghi giá mỗi món. Thực hành mua: "I want the red apple. It costs 5p. I pay 10p. My change is 5p."',
  },
  {
    id: 'xd_growing_plants',
    theme: 'Growing & Measuring',
    themeVi: 'Trồng cây & Đo lường',
    themeEmoji: '🌱',
    connections: [
      { subject: 'english', topicId: 'en4_1', relevance: 'Garden vocabulary', relevanceVi: 'Từ vựng vườn' },
      { subject: 'math', topicId: 'ma7_1', relevance: 'Measure plant height', relevanceVi: 'Đo chiều cao cây' },
      { subject: 'math', topicId: 'ma8_3', relevance: 'Days of the week (growth diary)', relevanceVi: 'Ngày trong tuần (nhật ký phát triển)' },
      { subject: 'science', topicId: 'sc6_1', relevance: 'What plants need', relevanceVi: 'Cây cần gì' },
      { subject: 'science', topicId: 'sc6_2', relevance: 'Bean growing experiment', relevanceVi: 'Thí nghiệm trồng đậu' },
      { subject: 'science', topicId: 'sc6_3', relevance: 'Recording observations', relevanceVi: 'Ghi chép quan sát' },
    ],
    suggestedActivity: 'Plant a bean seed. Every 2 days: measure height (Math), describe in English ("My plant is 3cm tall, it has 2 leaves"), and record weather (Science).',
    suggestedActivityVi: 'Gieo hạt đậu. Cách 2 ngày: đo chiều cao (Toán), mô tả bằng tiếng Anh ("My plant is 3cm tall, it has 2 leaves"), ghi thời tiết (Khoa học).',
  },
  {
    id: 'xd_time_daily_routine',
    theme: 'Time & Daily Routine',
    themeVi: 'Thời gian & Sinh hoạt hàng ngày',
    themeEmoji: '🕐',
    connections: [
      { subject: 'english', topicId: 'en7_1', relevance: 'Rules & routine (Do/Don\'t)', relevanceVi: 'Quy tắc & thói quen (Nên/Không nên)' },
      { subject: 'math', topicId: 'ma8_1', relevance: "O'clock times", relevanceVi: 'Giờ đúng' },
      { subject: 'math', topicId: 'ma8_2', relevance: 'Half past times', relevanceVi: 'Giờ rưỡi' },
      { subject: 'science', topicId: 'sc4_4', relevance: 'Day length changes', relevanceVi: 'Ngày dài ngắn thay đổi' },
    ],
    suggestedActivity: 'Draw a clock for each activity: "I wake up at 7 o\'clock. I go to school at half past 7. I eat lunch at 12 o\'clock."',
    suggestedActivityVi: 'Vẽ đồng hồ cho mỗi hoạt động: "I wake up at 7 o\'clock. I go to school at half past 7. I eat lunch at 12 o\'clock."',
  },
  {
    id: 'xd_fractions_sharing',
    theme: 'Sharing & Fractions',
    themeVi: 'Chia sẻ & Phân số',
    themeEmoji: '🍕',
    connections: [
      { subject: 'english', topicId: 'en9_1', relevance: 'Adventure & treasure sharing', relevanceVi: 'Phiêu lưu & chia kho báu' },
      { subject: 'math', topicId: 'ma11_1', relevance: 'Half of a shape/amount', relevanceVi: 'Một nửa hình/số lượng' },
      { subject: 'math', topicId: 'ma11_2', relevance: 'Quarter of a shape/amount', relevanceVi: 'Một phần tư hình/số lượng' },
      { subject: 'science', topicId: 'sc3_1', relevance: 'Sorting materials into groups', relevanceVi: 'Phân loại vật liệu thành nhóm' },
    ],
    suggestedActivity: 'Cut a pizza/paper circle into halves, then quarters. Say: "This is one half. This is one quarter. One half is bigger than one quarter."',
    suggestedActivityVi: 'Cắt pizza/giấy tròn thành 2 nửa, rồi 4 phần. Nói: "This is one half. This is one quarter. One half is bigger than one quarter."',
  },
];

export const CROSS_DOMAIN_STATS = {
  totalThemes: CROSS_DOMAIN_LINKS.length,
  totalConnections: CROSS_DOMAIN_LINKS.reduce((s, l) => s + l.connections.length, 0),
  subjectCoverage: {
    english: new Set(CROSS_DOMAIN_LINKS.flatMap(l => l.connections.filter(c => c.subject === 'english').map(c => c.topicId))).size,
    math: new Set(CROSS_DOMAIN_LINKS.flatMap(l => l.connections.filter(c => c.subject === 'math').map(c => c.topicId))).size,
    science: new Set(CROSS_DOMAIN_LINKS.flatMap(l => l.connections.filter(c => c.subject === 'science').map(c => c.topicId))).size,
  },
};
