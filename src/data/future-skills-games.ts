// Interactive game configurations for Future Skills activities
// Each activity gets a mini-game matching its learning objective

export const ACTIVITY_GAMES: Record<string, {
  type: 'sort' | 'sequence' | 'match';
  config: Record<string, unknown>;
}> = {
  'Algorithmic Thinking Games': {
    type: 'sequence',
    config: {
      title: 'Sắp xếp thuật toán đánh răng',
      steps: [
        { text: 'Cầm bàn chải', emoji: '🪥' },
        { text: 'Bôi kem đánh răng', emoji: '🧴' },
        { text: 'Chải lên-xuống 2 phút', emoji: '⬆️' },
        { text: 'Súc miệng bằng nước', emoji: '💧' },
        { text: 'Rửa bàn chải sạch', emoji: '🚿' },
      ],
    },
  },
  'Data Sorting & Classifying': {
    type: 'sort',
    config: {
      title: 'Phân loại đồ vật',
      categories: [
        { id: 'animal', label: 'Động vật', color: 'rgba(34,197,94,0.8)', emoji: '🐾' },
        { id: 'food', label: 'Thức ăn', color: 'rgba(251,146,60,0.8)', emoji: '🍎' },
        { id: 'toy', label: 'Đồ chơi', color: 'rgba(96,165,250,0.8)', emoji: '🧸' },
      ],
      items: [
        { id: '1', label: 'Con mèo', emoji: '🐱', category: 'animal' },
        { id: '2', label: 'Quả cam', emoji: '🍊', category: 'food' },
        { id: '3', label: 'Xe ô tô', emoji: '🚗', category: 'toy' },
        { id: '4', label: 'Con chó', emoji: '🐕', category: 'animal' },
        { id: '5', label: 'Bánh mì', emoji: '🍞', category: 'food' },
        { id: '6', label: 'Con gấu bông', emoji: '🧸', category: 'toy' },
        { id: '7', label: 'Con cá', emoji: '🐟', category: 'animal' },
        { id: '8', label: 'Chuối', emoji: '🍌', category: 'food' },
        { id: '9', label: 'Bóng', emoji: '⚽', category: 'toy' },
      ],
    },
  },
  'Waste Sorting at Home': {
    type: 'sort',
    config: {
      title: 'Phân loại rác thải',
      categories: [
        { id: 'recycle', label: 'Tái chế ♻️', color: 'rgba(59,130,246,0.8)', emoji: '♻️' },
        { id: 'compost', label: 'Ủ phân 🍂', color: 'rgba(34,197,94,0.8)', emoji: '🍂' },
        { id: 'trash', label: 'Rác thường', color: 'rgba(107,114,128,0.8)', emoji: '🗑️' },
      ],
      items: [
        { id: '1', label: 'Chai nhựa', emoji: '🧴', category: 'recycle' },
        { id: '2', label: 'Vỏ chuối', emoji: '🍌', category: 'compost' },
        { id: '3', label: 'Túi nilon bẩn', emoji: '🛍️', category: 'trash' },
        { id: '4', label: 'Hộp giấy', emoji: '📦', category: 'recycle' },
        { id: '5', label: 'Vỏ trứng', emoji: '🥚', category: 'compost' },
        { id: '6', label: 'Khăn giấy dùng rồi', emoji: '🧻', category: 'trash' },
        { id: '7', label: 'Lon nước', emoji: '🥫', category: 'recycle' },
        { id: '8', label: 'Lá cây', emoji: '🍃', category: 'compost' },
      ],
    },
  },
  'Empathy Activities': {
    type: 'match',
    config: {
      title: 'Nối cảm xúc đúng',
      pairs: [
        { left: 'Được quà sinh nhật', leftEmoji: '🎁', right: 'Vui mừng', rightEmoji: '😊' },
        { left: 'Bạn thân chuyển trường', leftEmoji: '👋', right: 'Buồn', rightEmoji: '😢' },
        { left: 'Bị lạc ở siêu thị', leftEmoji: '🏪', right: 'Sợ hãi', rightEmoji: '😨' },
        { left: 'Ai đó lấy đồ chơi', leftEmoji: '😤', right: 'Tức giận', rightEmoji: '😠' },
        { left: 'Bất ngờ gặp bạn cũ', leftEmoji: '✨', right: 'Ngạc nhiên', rightEmoji: '😲' },
      ],
    },
  },
  'Predict & Observe': {
    type: 'sort',
    config: {
      title: 'Dự đoán: Nổi hay Chìm?',
      categories: [
        { id: 'float', label: 'NỔI 🌊', color: 'rgba(59,130,246,0.8)', emoji: '🌊' },
        { id: 'sink', label: 'CHÌM ⬇️', color: 'rgba(107,114,128,0.8)', emoji: '⬇️' },
      ],
      items: [
        { id: '1', label: 'Chiếc lá', emoji: '🍃', category: 'float' },
        { id: '2', label: 'Đồng xu', emoji: '🪙', category: 'sink' },
        { id: '3', label: 'Quả bóng nhựa', emoji: '🏀', category: 'float' },
        { id: '4', label: 'Cục đá', emoji: '🪨', category: 'sink' },
        { id: '5', label: 'Miếng gỗ', emoji: '🪵', category: 'float' },
        { id: '6', label: 'Chìa khóa', emoji: '🔑', category: 'sink' },
      ],
    },
  },
  'ScratchJr Block Coding': {
    type: 'sequence',
    config: {
      title: 'Sắp xếp code ScratchJr',
      steps: [
        { text: 'Mở app ScratchJr', emoji: '📱' },
        { text: 'Chọn nhân vật mèo', emoji: '🐱' },
        { text: 'Kéo khối MOVE sang phải', emoji: '➡️' },
        { text: 'Thêm khối SAY "Hello!"', emoji: '💬' },
        { text: 'Nhấn cờ xanh để chạy', emoji: '🟢' },
      ],
    },
  },
  'Show and Tell (EN)': {
    type: 'sequence',
    config: {
      title: 'Chuẩn bị Show and Tell',
      steps: [
        { text: 'Chọn đồ vật yêu thích', emoji: '⭐' },
        { text: 'Tập câu: "This is my..."', emoji: '🗣️' },
        { text: 'Thêm 2 câu mô tả', emoji: '✌️' },
        { text: 'Đứng dậy, nói rõ ràng', emoji: '🧍' },
        { text: 'Nhìn vào mắt khán giả', emoji: '👀' },
      ],
    },
  },
};

// Sample galleries for each activity (visual examples)
export const ACTIVITY_SAMPLES: Record<string, { emoji: string; label: string; desc: string }[]> = {
  'Algorithmic Thinking Games': [
    { emoji: '🥪', label: 'Thuật toán sandwich', desc: 'Lấy bánh → Phết bơ → Kẹp nhân → Cắt đôi' },
    { emoji: '🎒', label: 'Thuật toán đi học', desc: 'Thức dậy → Đánh răng → Mặc đồ → Ăn sáng → Ra cửa' },
    { emoji: '🎨', label: 'Vẽ thuật toán', desc: 'Vẽ từng bước bằng tranh, dán lên tường' },
  ],
  'Data Sorting & Classifying': [
    { emoji: '🧦', label: 'Phân loại tất', desc: 'Theo màu, theo size, theo hoa văn' },
    { emoji: '📊', label: 'Biểu đồ cột', desc: 'Vẽ biểu đồ đếm số lượng mỗi nhóm' },
    { emoji: '🏠', label: 'Phân loại đồ nhà', desc: 'Phòng bếp vs Phòng ngủ vs Phòng tắm' },
  ],
  'Waste Sorting at Home': [
    { emoji: '📦', label: '3 thùng rác', desc: 'Dán nhãn Tái chế / Ủ phân / Rác thường' },
    { emoji: '📊', label: 'Biểu đồ 7 ngày', desc: 'Theo dõi rác mỗi ngày, vẽ biểu đồ' },
    { emoji: '🏆', label: 'Thử thách giảm rác', desc: 'Giảm 50% rác thường trong 1 tuần' },
  ],
  'Plant Growth Diary': [
    { emoji: '📏', label: 'Bảng đo chiều cao', desc: 'Đo mỗi 3 ngày, ghi vào bảng' },
    { emoji: '📸', label: 'Album ảnh tăng trưởng', desc: 'Chụp ảnh mỗi tuần, so sánh' },
    { emoji: '📈', label: 'Biểu đồ đường', desc: 'Vẽ biểu đồ chiều cao theo thời gian' },
  ],
  'Empathy Activities': [
    { emoji: '🎭', label: 'Diễn khuôn mặt', desc: 'Vui, buồn, giận, sợ, ngạc nhiên' },
    { emoji: '📖', label: 'Đọc và cảm nhận', desc: 'Đọc truyện, hỏi "nhân vật cảm thấy sao?"' },
    { emoji: '💝', label: 'Nhật ký tốt bụng', desc: 'Viết 1 việc tốt mỗi ngày' },
  ],
};
