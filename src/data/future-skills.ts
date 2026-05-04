// Future Skills Data — Based on 5-Axis Framework
// Source: Educational strategy doc (AI Literacy, Green STEM, Research, Leadership, Social Impact)

export interface FutureSkillAxis {
  id: string; name: string; nameVi: string; icon: string;
  color: string; gradient: string;
  desc: string; descVi: string;
  ageRange: string;
  activities: { title: string; titleVi: string; grade: number; type: string }[];
  competitions: { name: string; age: string; value: string }[];
  tips: string[];
}

export const FUTURE_SKILL_AXES: FutureSkillAxis[] = [
  {
    id: 'ai-literacy', name: 'AI & Computational Thinking', nameVi: 'Tư duy AI & Thuật toán',
    icon: '🤖', color: '#8b5cf6', gradient: 'linear-gradient(135deg,#7c3aed,#a78bfa)',
    desc: 'UNESCO AI Competency Framework — understand AI safely, responsibly, creatively',
    descVi: 'Hiểu AI an toàn, có trách nhiệm và sáng tạo (UNESCO)',
    ageRange: '6-10',
    activities: [
      { title: 'Algorithmic Thinking Games', titleVi: 'Trò chơi tư duy thuật toán', grade: 1, type: 'interactive' },
      { title: 'ScratchJr Block Coding', titleVi: 'Lập trình khối ScratchJr', grade: 1, type: 'project' },
      { title: 'Data Sorting & Classifying', titleVi: 'Phân loại và sắp xếp dữ liệu', grade: 1, type: 'activity' },
      { title: 'Pattern Recognition', titleVi: 'Nhận dạng quy luật', grade: 2, type: 'interactive' },
      { title: 'Simple Charts & Tables', titleVi: 'Biểu đồ và bảng đơn giản', grade: 2, type: 'project' },
      { title: 'Human vs Machine Quiz', titleVi: 'Người hay Máy — Đố vui', grade: 2, type: 'quiz' },
      { title: 'Scratch Animations', titleVi: 'Hoạt hình Scratch', grade: 3, type: 'project' },
      { title: 'Robot Commands Maze', titleVi: 'Điều khiển robot qua mê cung', grade: 3, type: 'interactive' },
      { title: 'Digital Safety Rules', titleVi: 'An toàn số — Quy tắc vàng', grade: 3, type: 'lesson' },
      { title: 'AI Image Recognition', titleVi: 'AI nhận dạng hình ảnh', grade: 4, type: 'experiment' },
      { title: 'Data Collection Project', titleVi: 'Dự án thu thập dữ liệu', grade: 4, type: 'project' },
      { title: 'Chatbot Design Basics', titleVi: 'Thiết kế chatbot cơ bản', grade: 5, type: 'project' },
      { title: 'AI Ethics Discussion', titleVi: 'Thảo luận đạo đức AI', grade: 5, type: 'discussion' },
      { title: 'Mini Machine Learning', titleVi: 'Máy học mini — Teachable Machine', grade: 5, type: 'experiment' },
    ],
    competitions: [
      { name: 'FIRST LEGO League Explore', age: '6-10', value: 'Teamwork + Design + Coding' },
      { name: 'WRO Future Innovators', age: '8-12', value: 'Robotics + Problem Solving' },
      { name: 'Scratch Day Challenge', age: '7-12', value: 'Creativity + Coding' },
    ],
    tips: [
      'Bắt đầu với ScratchJr (6+), chuyển Scratch (8+) — KHÔNG cần học Python/JS ở tuổi này',
      'Mỗi tuần 1 "thí nghiệm AI": dùng Google Lens, voice assistant — hỏi con "máy biết hay đoán?"',
      'Xây portfolio video: quay con giải thích dự án Scratch bằng tiếng Anh mỗi tháng',
    ],
  },
  {
    id: 'green-stem', name: 'Green STEM & Environment', nameVi: 'STEM Xanh & Môi trường',
    icon: '🌱', color: '#22c55e', gradient: 'linear-gradient(135deg,#16a34a,#4ade80)',
    desc: 'Vietnam Green Growth Strategy 2021-2030 + UNDP Green Skills',
    descVi: 'Chiến lược Tăng trưởng Xanh VN 2021-2030 + Kỹ năng Xanh UNDP',
    ageRange: '6-10',
    activities: [
      { title: 'Waste Sorting at Home', titleVi: 'Phân loại rác tại nhà', grade: 1, type: 'project' },
      { title: 'Plant Growth Diary', titleVi: 'Nhật ký trồng cây', grade: 1, type: 'journal' },
      { title: 'Water Saving Tracker', titleVi: 'Theo dõi tiết kiệm nước', grade: 2, type: 'data' },
      { title: 'Simple Water Filter', titleVi: 'Thí nghiệm lọc nước', grade: 2, type: 'experiment' },
      { title: 'Plastic Waste Counter', titleVi: 'Đếm rác nhựa hàng tuần', grade: 3, type: 'data' },
      { title: 'Energy Use Monitor', titleVi: 'Theo dõi điện tiêu thụ', grade: 3, type: 'project' },
      { title: 'Mini Compost Project', titleVi: 'Dự án ủ phân mini', grade: 3, type: 'experiment' },
      { title: 'Safe Walk to School Map', titleVi: 'Bản đồ đi bộ an toàn', grade: 4, type: 'project' },
      { title: 'Solar Energy Basics', titleVi: 'Năng lượng mặt trời cơ bản', grade: 4, type: 'lesson' },
      { title: 'Climate Change Poster', titleVi: 'Poster biến đổi khí hậu (EN)', grade: 5, type: 'project' },
      { title: 'Green City Design', titleVi: 'Thiết kế thành phố xanh', grade: 5, type: 'project' },
    ],
    competitions: [
      { name: 'Science Fair — Green Projects', age: '7-12', value: 'Research + Presentation' },
      { name: 'UNESCO Green Citizen', age: '8+', value: 'Environmental Stewardship' },
    ],
    tips: [
      'Mỗi năm 1 dự án "Science for real life" bằng tiếng Anh → portfolio 5 năm rất mạnh',
      'Dự án mẫu lớp 1: "How can my family reduce plastic waste?" — cân rác, vẽ biểu đồ, quay video',
      'Poster + video tiếng Anh = bằng chứng STEM + English + Leadership cùng lúc',
    ],
  },
  {
    id: 'research', name: 'Research Mindset', nameVi: 'Tư duy Nghiên cứu',
    icon: '🔬', color: '#f59e0b', gradient: 'linear-gradient(135deg,#d97706,#fbbf24)',
    desc: 'Scientific method foundation — Question → Predict → Observe → Conclude',
    descVi: 'Nền tảng phương pháp khoa học — Hỏi → Dự đoán → Quan sát → Kết luận',
    ageRange: '6-10',
    activities: [
      { title: 'Ask a Question', titleVi: 'Đặt câu hỏi khoa học', grade: 1, type: 'thinking' },
      { title: 'Predict & Observe', titleVi: 'Dự đoán và Quan sát', grade: 1, type: 'experiment' },
      { title: 'Simple Data Recording', titleVi: 'Ghi dữ liệu đơn giản', grade: 2, type: 'data' },
      { title: 'Draw a Bar Chart', titleVi: 'Vẽ biểu đồ cột', grade: 2, type: 'skill' },
      { title: 'Monthly Science Question', titleVi: 'Câu hỏi khoa học hàng tháng', grade: 3, type: 'project' },
      { title: 'Fair Test Design', titleVi: 'Thiết kế thí nghiệm công bằng', grade: 3, type: 'method' },
      { title: 'Science Journal in English', titleVi: 'Nhật ký khoa học tiếng Anh', grade: 4, type: 'journal' },
      { title: 'Mini Research Poster', titleVi: 'Poster nghiên cứu mini', grade: 4, type: 'project' },
      { title: 'Present Findings (EN)', titleVi: 'Trình bày kết quả (tiếng Anh)', grade: 5, type: 'presentation' },
      { title: 'ViSEF Pathway Intro', titleVi: 'Giới thiệu con đường ViSEF', grade: 5, type: 'info' },
    ],
    competitions: [
      { name: 'School Science Fair', age: '7+', value: 'Question → Data → Conclusion' },
      { name: 'ViSEF/ISEF Pathway', age: '14+', value: 'Start building foundation NOW' },
    ],
    tips: [
      'Chu trình hàng tháng: Hỏi → Dự đoán → Đo → Ghi dữ liệu → Vẽ biểu đồ → Trình bày EN+VN → Kết luận',
      'Không chỉ "lắp robot" — phải biết ĐẶT VẤN ĐỀ + ĐO DỮ LIỆU + GIẢI THÍCH + TRÌNH BÀY',
      'Đến lớp 5, con đã có 4 năm lịch sử dự án — rất khó để người khác bắt chước nhanh',
    ],
  },
  {
    id: 'english-leadership', name: 'English for Leadership', nameVi: 'Tiếng Anh cho Lãnh đạo',
    icon: '🎤', color: '#3b82f6', gradient: 'linear-gradient(135deg,#2563eb,#60a5fa)',
    desc: 'English as a working language — not just exam English',
    descVi: 'Tiếng Anh là công cụ làm việc — không chỉ tiếng Anh thi cử',
    ageRange: '6-10',
    activities: [
      { title: 'Show and Tell (EN)', titleVi: 'Kể và Trình bày (tiếng Anh)', grade: 1, type: 'speaking' },
      { title: 'Story Retelling', titleVi: 'Kể lại truyện', grade: 1, type: 'speaking' },
      { title: 'Reading Log (50 books/year)', titleVi: 'Nhật ký đọc (50 cuốn/năm)', grade: 2, type: 'reading' },
      { title: 'Video Storytelling Monthly', titleVi: 'Video kể chuyện hàng tháng', grade: 2, type: 'project' },
      { title: 'Science Presentation (EN)', titleVi: 'Thuyết trình STEM tiếng Anh', grade: 3, type: 'presentation' },
      { title: 'Mini Debate', titleVi: 'Tranh luận nhỏ', grade: 3, type: 'speaking' },
      { title: 'Book Review Writing', titleVi: 'Viết bình sách', grade: 4, type: 'writing' },
      { title: 'Project Pitch (EN)', titleVi: 'Giới thiệu dự án (tiếng Anh)', grade: 4, type: 'presentation' },
      { title: 'Persuasive Essay', titleVi: 'Bài luận thuyết phục', grade: 5, type: 'writing' },
      { title: 'Team Leadership Role', titleVi: 'Vai trò trưởng nhóm', grade: 5, type: 'leadership' },
    ],
    competitions: [
      { name: 'Cambridge YLE Starters→Movers→Flyers', age: '7-12', value: 'Standardized benchmark' },
      { name: 'Storytelling/Public Speaking', age: '7+', value: 'Communication + Confidence' },
    ],
    tips: [
      '4 lớp năng lực: Chuẩn hóa (Cambridge) + Đọc (50-100 cuốn/năm) + Nói (video/tháng) + Học thuật (poster STEM)',
      'Tiếng Anh KHÔNG phải "môn học" — là CÔNG CỤ để học khoa học, làm dự án, lãnh đạo nhóm',
      'English as a working language: mỗi dự án STEM đều trình bày bằng tiếng Anh',
    ],
  },
  {
    id: 'social-impact', name: 'Leadership & Social Impact', nameVi: 'Lãnh đạo & Tác động Xã hội',
    icon: '💡', color: '#f43f5e', gradient: 'linear-gradient(135deg,#e11d48,#fb7185)',
    desc: 'OECD Student Agency + UNICEF Transferable Skills',
    descVi: 'Năng lực tự chủ (OECD) + Kỹ năng chuyển đổi (UNICEF)',
    ageRange: '6-10',
    activities: [
      { title: 'Empathy Activities', titleVi: 'Hoạt động đồng cảm', grade: 1, type: 'social' },
      { title: 'Book Donation Drive', titleVi: 'Quyên sách cho bạn', grade: 1, type: 'project' },
      { title: 'Team Captain Role', titleVi: 'Làm đội trưởng', grade: 2, type: 'leadership' },
      { title: 'Reading Schedule Self-Management', titleVi: 'Tự quản lý lịch đọc sách', grade: 2, type: 'responsibility' },
      { title: 'Present to Family', titleVi: 'Trình bày trước gia đình', grade: 3, type: 'presentation' },
      { title: 'Fact-Check Challenge', titleVi: 'Thử thách kiểm chứng thông tin', grade: 3, type: 'digital' },
      { title: 'Community Helper Interview', titleVi: 'Phỏng vấn người giúp đỡ cộng đồng', grade: 4, type: 'project' },
      { title: 'Kindness Journal', titleVi: 'Nhật ký việc tốt', grade: 4, type: 'journal' },
      { title: 'Mini Social Project', titleVi: 'Dự án xã hội nhỏ', grade: 5, type: 'project' },
      { title: 'Portfolio Building', titleVi: 'Xây dựng portfolio cá nhân', grade: 5, type: 'portfolio' },
    ],
    competitions: [
      { name: 'School Community Service', age: '6+', value: 'Character + Impact evidence' },
      { name: 'Student Council', age: '8+', value: 'Agency + Responsibility' },
    ],
    tips: [
      'Lưu bằng chứng: ảnh, video, nhật ký, poster, phản hồi giáo viên → portfolio "character + impact"',
      'Không chỉ điểm + chứng chỉ — trường tốt đánh giá agency, trách nhiệm, khả năng tạo tác động',
      'Mỗi học kỳ 1 hoạt động xã hội nhỏ: quyên sách, thăm bạn khó khăn, trồng cây cùng lớp',
    ],
  },
];

// Blue Ocean positioning
export const BLUE_OCEAN_PROFILE = {
  title: 'Young AI + Green Problem Solver',
  titleVi: 'Nhà giải quyết vấn đề trẻ — AI + Xanh',
  formula: 'English tốt + Toán tư duy + STEM/AI projects + Thuyết trình EN + Ý thức môi trường + Thể thao/Nghệ thuật',
  advantage: 'Không cạnh tranh trực diện trong "đám đông" — định vị như young problem-solver',
};
