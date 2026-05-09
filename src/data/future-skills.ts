// Future Skills Data — Based on 5-Axis Framework
// Source: Educational strategy doc (AI Literacy, Green STEM, Research, Leadership, Social Impact)
// Updated with rigorous evidence-base: WEF Future of Jobs 2025, UNESCO AI 2024, OECD Learning Compass 2030

export interface FutureSkillAxis {
  id: string; name: string; nameVi: string; icon: string;
  color: string; gradient: string;
  desc: string; descVi: string;
  ageRange: string;
  frameworks: { name: string; org: string; year: string }[];
  developmentalMilestones: { age: string; milestone: string; evidence: string }[];
  activities: { title: string; titleVi: string; grade: number; type: string; competencyLevel: 'Understanding' | 'Applying' | 'Creating' }[];
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
    frameworks: [
      { name: 'AI Competency Framework for Students', org: 'UNESCO', year: '2024' },
      { name: 'Future of Jobs Report', org: 'WEF', year: '2025' }
    ],
    developmentalMilestones: [
      { age: '6-8', milestone: 'Hiểu khái niệm nhân-quả (cause-and-effect)', evidence: 'Concrete Operational Stage (Piaget) - Bắt đầu tư duy logic với vật thể cụ thể.' },
      { age: '9-10', milestone: 'Nhận dạng quy luật phức tạp và tạo ra giải pháp (Creating)', evidence: 'Phát triển năng lực "Analytical thinking" (WEF 2025 Core Skills).' }
    ],
    activities: [
      { title: 'Algorithmic Thinking Games', titleVi: 'Trò chơi tư duy thuật toán', grade: 1, type: 'interactive', competencyLevel: 'Understanding' },
      { title: 'ScratchJr Block Coding', titleVi: 'Lập trình khối ScratchJr', grade: 1, type: 'project', competencyLevel: 'Applying' },
      { title: 'Data Sorting & Classifying', titleVi: 'Phân loại và sắp xếp dữ liệu', grade: 1, type: 'activity', competencyLevel: 'Understanding' },
      { title: 'Pattern Recognition', titleVi: 'Nhận dạng quy luật', grade: 2, type: 'interactive', competencyLevel: 'Applying' },
      { title: 'Simple Charts & Tables', titleVi: 'Biểu đồ và bảng đơn giản', grade: 2, type: 'project', competencyLevel: 'Applying' },
      { title: 'Human vs Machine Quiz', titleVi: 'Người hay Máy — Đố vui', grade: 2, type: 'quiz', competencyLevel: 'Understanding' },
      { title: 'Scratch Animations', titleVi: 'Hoạt hình Scratch', grade: 3, type: 'project', competencyLevel: 'Creating' },
      { title: 'Robot Commands Maze', titleVi: 'Điều khiển robot qua mê cung', grade: 3, type: 'interactive', competencyLevel: 'Applying' },
      { title: 'Digital Safety Rules', titleVi: 'An toàn số — Quy tắc vàng', grade: 3, type: 'lesson', competencyLevel: 'Understanding' },
      { title: 'AI Image Recognition', titleVi: 'AI nhận dạng hình ảnh', grade: 4, type: 'experiment', competencyLevel: 'Applying' },
      { title: 'Data Collection Project', titleVi: 'Dự án thu thập dữ liệu', grade: 4, type: 'project', competencyLevel: 'Applying' },
      { title: 'Chatbot Design Basics', titleVi: 'Thiết kế chatbot cơ bản', grade: 5, type: 'project', competencyLevel: 'Creating' },
      { title: 'AI Ethics Discussion', titleVi: 'Thảo luận đạo đức AI', grade: 5, type: 'discussion', competencyLevel: 'Understanding' },
      { title: 'Mini Machine Learning', titleVi: 'Máy học mini — Teachable Machine', grade: 5, type: 'experiment', competencyLevel: 'Creating' },
    ],
    competitions: [
      { name: 'FIRST LEGO League Explore', age: '6-10', value: 'Teamwork + Design + Coding' },
      { name: 'WRO Future Innovators', age: '8-12', value: 'Robotics + Problem Solving' },
      { name: 'Scratch Day Challenge', age: '7-12', value: 'Creativity + Coding' },
    ],
    tips: [
      'Căn cứ khoa học: Bắt đầu với ScratchJr (6+) giúp cụ thể hóa tư duy logic (Piaget Concrete Operational).',
      'Benchmark WEF 2025: Tập trung vào "Analytical Thinking" (Tư duy phân tích) — không ép học cú pháp code sớm.',
      'Khung UNESCO 2024: Hỏi con "Máy biết hay đoán?" để hình thành tư duy đạo đức AI (AI Ethics).'
    ],
  },
  {
    id: 'green-stem', name: 'Green STEM & Environment', nameVi: 'STEM Xanh & Môi trường',
    icon: '🌱', color: '#22c55e', gradient: 'linear-gradient(135deg,#16a34a,#4ade80)',
    desc: 'Vietnam Green Growth Strategy 2021-2030 + UNDP Green Skills',
    descVi: 'Chiến lược Tăng trưởng Xanh VN 2021-2030 + Kỹ năng Xanh UNDP',
    ageRange: '6-10',
    frameworks: [
      { name: 'Green Skills for Youth', org: 'UNDP', year: '2023' },
      { name: 'Green Growth Strategy', org: 'Vietnam Gov', year: '2021-2030' }
    ],
    developmentalMilestones: [
      { age: '6-8', milestone: 'Nhận thức môi trường xung quanh và hành động nhỏ', evidence: 'Phát triển năng lực "Tạo giá trị mới" (Creating New Value - OECD 2030).' },
      { age: '9-10', milestone: 'Hiểu hệ thống sinh thái và tác động (Systems Thinking)', evidence: 'Năng lực cốt lõi WEF 2025 (Resilience, Flexibility, Agility) trong giải quyết bài toán tài nguyên.' }
    ],
    activities: [
      { title: 'Waste Sorting at Home', titleVi: 'Phân loại rác tại nhà', grade: 1, type: 'project', competencyLevel: 'Applying' },
      { title: 'Plant Growth Diary', titleVi: 'Nhật ký trồng cây', grade: 1, type: 'journal', competencyLevel: 'Understanding' },
      { title: 'Water Saving Tracker', titleVi: 'Theo dõi tiết kiệm nước', grade: 2, type: 'data', competencyLevel: 'Applying' },
      { title: 'Simple Water Filter', titleVi: 'Thí nghiệm lọc nước', grade: 2, type: 'experiment', competencyLevel: 'Creating' },
      { title: 'Plastic Waste Counter', titleVi: 'Đếm rác nhựa hàng tuần', grade: 3, type: 'data', competencyLevel: 'Applying' },
      { title: 'Energy Use Monitor', titleVi: 'Theo dõi điện tiêu thụ', grade: 3, type: 'project', competencyLevel: 'Applying' },
      { title: 'Mini Compost Project', titleVi: 'Dự án ủ phân mini', grade: 3, type: 'experiment', competencyLevel: 'Creating' },
      { title: 'Safe Walk to School Map', titleVi: 'Bản đồ đi bộ an toàn', grade: 4, type: 'project', competencyLevel: 'Creating' },
      { title: 'Solar Energy Basics', titleVi: 'Năng lượng mặt trời cơ bản', grade: 4, type: 'lesson', competencyLevel: 'Understanding' },
      { title: 'Climate Change Poster', titleVi: 'Poster biến đổi khí hậu (EN)', grade: 5, type: 'project', competencyLevel: 'Applying' },
      { title: 'Green City Design', titleVi: 'Thiết kế thành phố xanh', grade: 5, type: 'project', competencyLevel: 'Creating' },
    ],
    competitions: [
      { name: 'Science Fair — Green Projects', age: '7-12', value: 'Research + Presentation' },
      { name: 'UNESCO Green Citizen', age: '8+', value: 'Environmental Stewardship' },
    ],
    tips: [
      'OECD Learning Compass: Dự án thực tế (Project-Based Learning) phát triển năng lực "Creating New Value".',
      'Đo lường thục chứng: Cân rác thải, ghi biểu đồ — dạy Toán học thống kê trên dữ liệu thực.',
      'Portfolio: Quay video tiếng Anh thuyết trình dự án — tích hợp đa kỹ năng (WEF: Leadership & Social Influence).'
    ],
  },
  {
    id: 'research', name: 'Research Mindset', nameVi: 'Tư duy Nghiên cứu',
    icon: '🔬', color: '#f59e0b', gradient: 'linear-gradient(135deg,#d97706,#fbbf24)',
    desc: 'Scientific method foundation — Question → Predict → Observe → Conclude',
    descVi: 'Nền tảng phương pháp khoa học — Hỏi → Dự đoán → Quan sát → Kết luận',
    ageRange: '6-10',
    frameworks: [
      { name: 'PISA Scientific Literacy', org: 'OECD', year: '2025' },
      { name: 'Curiosity & Lifelong Learning', org: 'WEF', year: '2025' }
    ],
    developmentalMilestones: [
      { age: '6-8', milestone: 'Chuyển từ tư duy cảm tính sang tư duy nhân-quả', evidence: 'Piaget Concrete Operational Stage. Khả năng thiết lập giả thuyết (Predict).' },
      { age: '9-10', milestone: 'Kiểm chứng độc lập và ghi nhận dữ liệu khách quan', evidence: 'Phát triển "Analytical Thinking" và "Complex Problem-Solving" (WEF).' }
    ],
    activities: [
      { title: 'Ask a Question', titleVi: 'Đặt câu hỏi khoa học', grade: 1, type: 'thinking', competencyLevel: 'Understanding' },
      { title: 'Predict & Observe', titleVi: 'Dự đoán và Quan sát', grade: 1, type: 'experiment', competencyLevel: 'Applying' },
      { title: 'Simple Data Recording', titleVi: 'Ghi dữ liệu đơn giản', grade: 2, type: 'data', competencyLevel: 'Applying' },
      { title: 'Draw a Bar Chart', titleVi: 'Vẽ biểu đồ cột', grade: 2, type: 'skill', competencyLevel: 'Applying' },
      { title: 'Monthly Science Question', titleVi: 'Câu hỏi khoa học hàng tháng', grade: 3, type: 'project', competencyLevel: 'Creating' },
      { title: 'Fair Test Design', titleVi: 'Thiết kế thí nghiệm công bằng', grade: 3, type: 'method', competencyLevel: 'Applying' },
      { title: 'Science Journal in English', titleVi: 'Nhật ký khoa học tiếng Anh', grade: 4, type: 'journal', competencyLevel: 'Applying' },
      { title: 'Mini Research Poster', titleVi: 'Poster nghiên cứu mini', grade: 4, type: 'project', competencyLevel: 'Creating' },
      { title: 'Present Findings (EN)', titleVi: 'Trình bày kết quả (tiếng Anh)', grade: 5, type: 'presentation', competencyLevel: 'Creating' },
      { title: 'ViSEF Pathway Intro', titleVi: 'Giới thiệu con đường ViSEF', grade: 5, type: 'info', competencyLevel: 'Understanding' },
    ],
    competitions: [
      { name: 'School Science Fair', age: '7+', value: 'Question → Data → Conclusion' },
      { name: 'ViSEF/ISEF Pathway', age: '14+', value: 'Start building foundation NOW' },
    ],
    tips: [
      'WEF 2025: Khuyến khích con hỏi "Tại sao?" (Curiosity) thay vì chỉ cho sẵn đáp án.',
      'AAR Cycle (OECD): Anticipation (Dự đoán) → Action (Thí nghiệm) → Reflection (Kết luận).',
      'Định lượng: Mọi kết luận khoa học phải dựa trên dữ liệu (biểu đồ, số đếm) — chống ngụy biện cảm tính.'
    ],
  },
  {
    id: 'english-leadership', name: 'English for Leadership', nameVi: 'Tiếng Anh cho Lãnh đạo',
    icon: '🎤', color: '#3b82f6', gradient: 'linear-gradient(135deg,#2563eb,#60a5fa)',
    desc: 'English as a working language — not just exam English',
    descVi: 'Tiếng Anh là công cụ làm việc — không chỉ tiếng Anh thi cử',
    ageRange: '6-10',
    frameworks: [
      { name: 'CEFR Framework', org: 'Council of Europe', year: '2020' },
      { name: 'Leadership & Social Influence', org: 'WEF', year: '2025' }
    ],
    developmentalMilestones: [
      { age: '6-8', milestone: 'Kể chuyện mạch lạc và mở rộng vốn từ', evidence: 'Giai đoạn phát triển ngôn ngữ tăng tốc; xây dựng sự tự tin (Show & Tell).' },
      { age: '9-10', milestone: 'Thuyết phục và tranh luận dựa trên lập luận', evidence: 'Phát triển "Creative Thinking" và "Leadership" (WEF).' }
    ],
    activities: [
      { title: 'Show and Tell (EN)', titleVi: 'Kể và Trình bày (tiếng Anh)', grade: 1, type: 'speaking', competencyLevel: 'Applying' },
      { title: 'Story Retelling', titleVi: 'Kể lại truyện', grade: 1, type: 'speaking', competencyLevel: 'Understanding' },
      { title: 'Reading Log (50 books/year)', titleVi: 'Nhật ký đọc (50 cuốn/năm)', grade: 2, type: 'reading', competencyLevel: 'Applying' },
      { title: 'Video Storytelling Monthly', titleVi: 'Video kể chuyện hàng tháng', grade: 2, type: 'project', competencyLevel: 'Creating' },
      { title: 'Science Presentation (EN)', titleVi: 'Thuyết trình STEM tiếng Anh', grade: 3, type: 'presentation', competencyLevel: 'Applying' },
      { title: 'Mini Debate', titleVi: 'Tranh luận nhỏ', grade: 3, type: 'speaking', competencyLevel: 'Creating' },
      { title: 'Book Review Writing', titleVi: 'Viết bình sách', grade: 4, type: 'writing', competencyLevel: 'Applying' },
      { title: 'Project Pitch (EN)', titleVi: 'Giới thiệu dự án (tiếng Anh)', grade: 4, type: 'presentation', competencyLevel: 'Creating' },
      { title: 'Persuasive Essay', titleVi: 'Bài luận thuyết phục', grade: 5, type: 'writing', competencyLevel: 'Creating' },
      { title: 'Team Leadership Role', titleVi: 'Vai trò trưởng nhóm', grade: 5, type: 'leadership', competencyLevel: 'Applying' },
    ],
    competitions: [
      { name: 'Cambridge YLE Starters→Movers→Flyers', age: '7-12', value: 'Standardized benchmark' },
      { name: 'Storytelling/Public Speaking', age: '7+', value: 'Communication + Confidence' },
    ],
    tips: [
      'CEFR A1/A2: Đánh giá qua khả năng tương tác (Interactive Communication) thay vì chỉ ngữ pháp.',
      'WEF 2025: Lãnh đạo (Leadership) bắt đầu từ việc trình bày rõ ràng ý tưởng cá nhân (Pitching).',
      'Định lượng: Đọc 50-100 cuốn sách/năm tạo "input" tự nhiên, xuất ra "output" qua 1 video/tháng.'
    ],
  },
  {
    id: 'social-impact', name: 'Leadership & Social Impact', nameVi: 'Lãnh đạo & Tác động Xã hội',
    icon: '💡', color: '#f43f5e', gradient: 'linear-gradient(135deg,#e11d48,#fb7185)',
    desc: 'OECD Student Agency + UNICEF Transferable Skills',
    descVi: 'Năng lực tự chủ (OECD) + Kỹ năng chuyển đổi (UNICEF)',
    ageRange: '6-10',
    frameworks: [
      { name: 'Learning Compass 2030 (Agency)', org: 'OECD', year: '2030' },
      { name: 'Transferable Skills Framework', org: 'UNICEF', year: '2019' }
    ],
    developmentalMilestones: [
      { age: '6-8', milestone: 'Nhận diện cảm xúc (Empathy) và chịu trách nhiệm cá nhân', evidence: 'Trẻ chuyển sang trung tâm xã hội (Social Circle Expansion), hình thành Moral Compass.' },
      { age: '9-10', milestone: 'Giải quyết mâu thuẫn và tạo tác động cộng đồng', evidence: 'Năng lực "Reconciling Tensions and Dilemmas" (OECD).' }
    ],
    activities: [
      { title: 'Empathy Activities', titleVi: 'Hoạt động đồng cảm', grade: 1, type: 'social', competencyLevel: 'Understanding' },
      { title: 'Book Donation Drive', titleVi: 'Quyên sách cho bạn', grade: 1, type: 'project', competencyLevel: 'Applying' },
      { title: 'Team Captain Role', titleVi: 'Làm đội trưởng', grade: 2, type: 'leadership', competencyLevel: 'Applying' },
      { title: 'Reading Schedule Self-Management', titleVi: 'Tự quản lý lịch đọc sách', grade: 2, type: 'responsibility', competencyLevel: 'Applying' },
      { title: 'Present to Family', titleVi: 'Trình bày trước gia đình', grade: 3, type: 'presentation', competencyLevel: 'Applying' },
      { title: 'Fact-Check Challenge', titleVi: 'Thử thách kiểm chứng thông tin', grade: 3, type: 'digital', competencyLevel: 'Understanding' },
      { title: 'Community Helper Interview', titleVi: 'Phỏng vấn người giúp đỡ cộng đồng', grade: 4, type: 'project', competencyLevel: 'Applying' },
      { title: 'Kindness Journal', titleVi: 'Nhật ký việc tốt', grade: 4, type: 'journal', competencyLevel: 'Understanding' },
      { title: 'Mini Social Project', titleVi: 'Dự án xã hội nhỏ', grade: 5, type: 'project', competencyLevel: 'Creating' },
      { title: 'Portfolio Building', titleVi: 'Xây dựng portfolio cá nhân', grade: 5, type: 'portfolio', competencyLevel: 'Applying' },
    ],
    competitions: [
      { name: 'School Community Service', age: '6+', value: 'Character + Impact evidence' },
      { name: 'Student Council', age: '8+', value: 'Agency + Responsibility' },
    ],
    tips: [
      'OECD Co-Agency: Ba mẹ đồng hành (co-agency) để giúp trẻ tự đưa ra quyết định (Student Agency).',
      'UNICEF: Kỹ năng đồng cảm (Empathy) là nền tảng cốt lõi của Trí tuệ Xã hội (Social Intelligence).',
      'Portfolio: Ghi nhận mọi hoạt động thiện nguyện, làm nhóm bằng số liệu (VD: quyên góp 20 cuốn sách).'
    ],
  },
];

// Blue Ocean positioning
export const BLUE_OCEAN_PROFILE = {
  title: 'Young AI + Green Problem Solver',
  titleVi: 'Nhà giải quyết vấn đề trẻ — AI + Xanh',
  formula: 'Tiếng Anh Lãnh đạo + Tư duy Dữ liệu + STEM/AI Projects + Trách nhiệm Xã hội + Sức bền thể chất',
  advantage: 'Vượt qua bài toán "học vẹt" — xây dựng năng lực lõi theo chuẩn WEF & OECD, đáp ứng tiêu chuẩn tuyển sinh tinh hoa (ViSEF, Ivy League prep).',
};
