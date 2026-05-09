// Interactive content for Future Skills activities
// Evidence-based: UNESCO AI Framework, OECD Learning Compass 2030, WEF Future of Jobs 2025

export interface ActivityContent {
  activityKey: string; // matches title from future-skills.ts
  intro: string;
  introVi: string;
  steps: { instruction: string; instructionVi: string; emoji: string }[];
  quiz?: { question: string; questionVi: string; options: string[]; optionsVi: string[]; correct: number; explanation: string; explanationVi: string }[];
  challenge?: { task: string; taskVi: string; duration: string };
  realWorldLink?: string; // evidence source
}

export const ACTIVITY_CONTENT: Record<string, ActivityContent> = {
  // ═══════ AI & COMPUTATIONAL THINKING — Grade 1 ═══════
  'Algorithmic Thinking Games': {
    activityKey: 'Algorithmic Thinking Games',
    intro: 'An algorithm is a set of steps to solve a problem. Even making a sandwich is an algorithm!',
    introVi: 'Thuật toán là một tập hợp các bước để giải quyết vấn đề. Ngay cả làm một chiếc bánh sandwich cũng là thuật toán!',
    steps: [
      { instruction: 'Think of how you brush your teeth every morning', instructionVi: 'Nghĩ về cách bạn đánh răng mỗi sáng', emoji: '🪥' },
      { instruction: 'Write down each step: pick up brush → add paste → brush up-down → rinse', instructionVi: 'Viết ra từng bước: cầm bàn chải → bôi kem → chải lên-xuống → súc miệng', emoji: '📝' },
      { instruction: 'Try changing the order — does it still work?', instructionVi: 'Thử đổi thứ tự — có còn đúng không?', emoji: '🔄' },
      { instruction: 'Draw your algorithm as pictures!', instructionVi: 'Vẽ thuật toán của bạn thành tranh!', emoji: '🎨' },
    ],
    quiz: [
      { question: 'What is an algorithm?', questionVi: 'Thuật toán là gì?', options: ['A type of robot', 'Steps to solve a problem', 'A computer game', 'A math formula'], optionsVi: ['Một loại robot', 'Các bước để giải quyết vấn đề', 'Một trò chơi máy tính', 'Một công thức toán'], correct: 1, explanation: 'An algorithm is a sequence of steps to complete a task or solve a problem.', explanationVi: 'Thuật toán là một chuỗi các bước để hoàn thành một nhiệm vụ hoặc giải quyết một vấn đề.' },
      { question: 'Which is the correct order to make a sandwich?', questionVi: 'Thứ tự nào đúng để làm bánh sandwich?', options: ['Eat → Put filling → Get bread', 'Get bread → Put filling → Close → Eat', 'Close → Get bread → Eat', 'Put filling → Close → Get bread'], optionsVi: ['Ăn → Cho nhân → Lấy bánh', 'Lấy bánh → Cho nhân → Gập lại → Ăn', 'Gập lại → Lấy bánh → Ăn', 'Cho nhân → Gập lại → Lấy bánh'], correct: 1, explanation: 'Steps must be in the right order for the algorithm to work!', explanationVi: 'Các bước phải đúng thứ tự để thuật toán hoạt động!' },
    ],
    challenge: { task: 'Create an algorithm for getting ready for school — draw it with pictures and share with your family!', taskVi: 'Tạo thuật toán chuẩn bị đi học — vẽ bằng tranh và chia sẻ với gia đình!', duration: '20 min' },
    realWorldLink: 'UNESCO AI Competency Framework for Students (2024)',
  },
  'ScratchJr Block Coding': {
    activityKey: 'ScratchJr Block Coding',
    intro: 'ScratchJr lets you create stories and games by snapping blocks together — like digital LEGO!',
    introVi: 'ScratchJr cho phép bạn tạo truyện và trò chơi bằng cách ghép các khối lại — như LEGO kỹ thuật số!',
    steps: [
      { instruction: 'Open ScratchJr app (free on iPad/Android)', instructionVi: 'Mở ứng dụng ScratchJr (miễn phí trên iPad/Android)', emoji: '📱' },
      { instruction: 'Choose a character (cat, dog, or draw your own!)', instructionVi: 'Chọn nhân vật (mèo, chó, hoặc tự vẽ!)', emoji: '🐱' },
      { instruction: 'Drag blue MOVE blocks to make it walk', instructionVi: 'Kéo khối MOVE xanh để nhân vật đi', emoji: '🟦' },
      { instruction: 'Add a SAY block to make it talk!', instructionVi: 'Thêm khối SAY để nhân vật nói!', emoji: '💬' },
      { instruction: 'Press the green flag to RUN your code!', instructionVi: 'Nhấn cờ xanh để CHẠY code!', emoji: '🟢' },
    ],
    quiz: [
      { question: 'What does the green flag do in ScratchJr?', questionVi: 'Cờ xanh làm gì trong ScratchJr?', options: ['Deletes everything', 'Starts the program', 'Stops the program', 'Saves your work'], optionsVi: ['Xóa hết', 'Bắt đầu chương trình', 'Dừng chương trình', 'Lưu bài'], correct: 1, explanation: 'The green flag is like pressing "Play" — it runs all your code blocks!', explanationVi: 'Cờ xanh giống như nhấn "Play" — nó chạy tất cả khối code của bạn!' },
    ],
    challenge: { task: 'Make a 3-scene story: a cat walks to a house, says "Hello!", then jumps. Record a video explaining your code in English!', taskVi: 'Làm truyện 3 cảnh: mèo đi đến nhà, nói "Hello!", rồi nhảy. Quay video giải thích code bằng tiếng Anh!', duration: '30 min' },
    realWorldLink: 'MIT Media Lab — Lifelong Kindergarten Group',
  },
  'Data Sorting & Classifying': {
    activityKey: 'Data Sorting & Classifying',
    intro: 'Scientists organize things into groups to understand patterns. You can do it too!',
    introVi: 'Nhà khoa học sắp xếp mọi thứ thành nhóm để hiểu quy luật. Bạn cũng làm được!',
    steps: [
      { instruction: 'Collect 10 objects from your room (toys, books, clothes)', instructionVi: 'Thu thập 10 đồ vật trong phòng (đồ chơi, sách, quần áo)', emoji: '🧸' },
      { instruction: 'Sort them by COLOR — how many groups?', instructionVi: 'Phân theo MÀU SẮC — có bao nhiêu nhóm?', emoji: '🎨' },
      { instruction: 'Now sort the SAME objects by SIZE — different groups!', instructionVi: 'Giờ phân CÙNG đồ vật theo KÍCH THƯỚC — khác nhóm rồi!', emoji: '📏' },
      { instruction: 'Draw a simple chart showing your groups', instructionVi: 'Vẽ biểu đồ đơn giản các nhóm của bạn', emoji: '📊' },
    ],
    quiz: [
      { question: 'If you sort animals by number of legs, which group has a spider?', questionVi: 'Nếu phân loại theo số chân, nhện thuộc nhóm nào?', options: ['2 legs', '4 legs', '6 legs', '8 legs'], optionsVi: ['2 chân', '4 chân', '6 chân', '8 chân'], correct: 3, explanation: 'Spiders are arachnids with 8 legs — they are NOT insects (which have 6)!', explanationVi: 'Nhện thuộc lớp hình nhện có 8 chân — KHÔNG phải côn trùng (6 chân)!' },
      { question: 'Why do scientists classify things?', questionVi: 'Tại sao nhà khoa học phân loại?', options: ['For fun', 'To find patterns', 'Because teachers say so', 'To make it hard'], optionsVi: ['Cho vui', 'Để tìm quy luật', 'Vì thầy cô bảo', 'Để làm khó'], correct: 1, explanation: 'Classification helps us see patterns and understand the world better!', explanationVi: 'Phân loại giúp ta nhìn thấy quy luật và hiểu thế giới tốt hơn!' },
    ],
    challenge: { task: 'Sort your family\'s shoes by 3 different criteria. Draw 3 charts. Which way of sorting is most useful? Why?', taskVi: 'Phân giày dép gia đình theo 3 tiêu chí khác nhau. Vẽ 3 biểu đồ. Cách nào hữu ích nhất? Tại sao?', duration: '25 min' },
    realWorldLink: 'OECD Learning Compass 2030 — Creating New Value',
  },
  // ═══════ GREEN STEM — Grade 1 ═══════
  'Waste Sorting at Home': {
    activityKey: 'Waste Sorting at Home',
    intro: 'Every day we create waste. Learning to sort it helps our planet!',
    introVi: 'Mỗi ngày chúng ta tạo ra rác. Học cách phân loại giúp ích cho hành tinh!',
    steps: [
      { instruction: 'Get 3 bags or boxes — label them: RECYCLE ♻️, COMPOST 🍂, TRASH 🗑️', instructionVi: 'Lấy 3 túi hoặc hộp — dán nhãn: TÁI CHẾ ♻️, Ủ PHÂN 🍂, RÁC 🗑️', emoji: '📦' },
      { instruction: 'For one day, sort ALL your family waste into the 3 groups', instructionVi: 'Trong một ngày, phân TOÀN BỘ rác gia đình vào 3 nhóm', emoji: '🔍' },
      { instruction: 'Count how many items in each group', instructionVi: 'Đếm bao nhiêu thứ trong mỗi nhóm', emoji: '🔢' },
      { instruction: 'Draw a bar chart — which group has the most?', instructionVi: 'Vẽ biểu đồ cột — nhóm nào nhiều nhất?', emoji: '📊' },
    ],
    quiz: [
      { question: 'Where does a banana peel go?', questionVi: 'Vỏ chuối thuộc nhóm nào?', options: ['Recycle', 'Compost', 'Trash', 'None'], optionsVi: ['Tái chế', 'Ủ phân', 'Rác thường', 'Không thuộc nhóm nào'], correct: 1, explanation: 'Banana peels are organic waste — they can decompose and become compost!', explanationVi: 'Vỏ chuối là rác hữu cơ — có thể phân hủy và thành phân bón!' },
      { question: 'Can a plastic bottle be recycled?', questionVi: 'Chai nhựa có tái chế được không?', options: ['No, never', 'Yes, always', 'Only if clean and empty', 'Only glass can be recycled'], optionsVi: ['Không bao giờ', 'Luôn được', 'Chỉ khi sạch và rỗng', 'Chỉ thủy tinh mới tái chế được'], correct: 2, explanation: 'Clean, empty plastic bottles can be recycled — rinse them first!', explanationVi: 'Chai nhựa sạch, rỗng có thể tái chế — rửa sạch trước nhé!' },
    ],
    challenge: { task: 'Track your family waste for 7 days. Make a weekly chart. Can you REDUCE the trash group by 50%?', taskVi: 'Theo dõi rác gia đình 7 ngày. Làm biểu đồ tuần. Bạn có thể GIẢM nhóm rác 50% không?', duration: '7 days' },
    realWorldLink: 'VN Green Growth Strategy 2021-2030, UNDP Green Skills Framework',
  },
  'Plant Growth Diary': {
    activityKey: 'Plant Growth Diary',
    intro: 'Scientists observe and record. Grow a plant and track it like a real researcher!',
    introVi: 'Nhà khoa học quan sát và ghi chép. Trồng cây và theo dõi như nhà nghiên cứu thật!',
    steps: [
      { instruction: 'Plant a bean seed in a small cup with soil', instructionVi: 'Trồng hạt đậu trong ly nhỏ có đất', emoji: '🫘' },
      { instruction: 'Water it the same amount every day', instructionVi: 'Tưới cùng lượng nước mỗi ngày', emoji: '💧' },
      { instruction: 'Measure the height with a ruler every 3 days', instructionVi: 'Đo chiều cao bằng thước mỗi 3 ngày', emoji: '📏' },
      { instruction: 'Draw or photograph what you see', instructionVi: 'Vẽ hoặc chụp ảnh những gì bạn thấy', emoji: '📸' },
      { instruction: 'After 3 weeks, make a growth chart!', instructionVi: 'Sau 3 tuần, làm biểu đồ tăng trưởng!', emoji: '📈' },
    ],
    quiz: [
      { question: 'What do plants need to grow?', questionVi: 'Cây cần gì để lớn?', options: ['Only water', 'Water + light + soil', 'Only sunlight', 'Only soil'], optionsVi: ['Chỉ nước', 'Nước + ánh sáng + đất', 'Chỉ ánh sáng', 'Chỉ đất'], correct: 1, explanation: 'Plants need water, sunlight, and nutrients from soil to grow!', explanationVi: 'Cây cần nước, ánh sáng mặt trời, và chất dinh dưỡng từ đất để lớn!' },
    ],
    challenge: { task: 'Grow TWO plants — one in sunlight, one in a dark closet. After 2 weeks, compare. Write what you discovered!', taskVi: 'Trồng HAI cây — một ngoài nắng, một trong tủ tối. Sau 2 tuần, so sánh. Viết ra phát hiện!', duration: '2 weeks' },
    realWorldLink: 'Cambridge Primary Science Stage 1 — Plants and Growth',
  },
  // ═══════ RESEARCH MINDSET — Grade 1 ═══════
  'Ask a Question': {
    activityKey: 'Ask a Question',
    intro: 'Great scientists start with great questions. Learn to ask "Why?" and "What if?"',
    introVi: 'Nhà khoa học vĩ đại bắt đầu bằng câu hỏi hay. Học cách hỏi "Tại sao?" và "Nếu...thì sao?"',
    steps: [
      { instruction: 'Look around your house — find something interesting', instructionVi: 'Nhìn quanh nhà — tìm điều thú vị', emoji: '👀' },
      { instruction: 'Ask a "Why" question: Why is the sky blue? Why do dogs bark?', instructionVi: 'Hỏi câu "Tại sao": Tại sao trời xanh? Tại sao chó sủa?', emoji: '❓' },
      { instruction: 'Ask a "What if" question: What if it never rained?', instructionVi: 'Hỏi câu "Nếu...thì sao": Nếu không bao giờ mưa thì sao?', emoji: '🤔' },
      { instruction: 'Write your 3 best questions in a "Wonder Book"', instructionVi: 'Viết 3 câu hỏi hay nhất vào "Sổ Thắc Mắc"', emoji: '📓' },
    ],
    quiz: [
      { question: 'Which is a good science question?', questionVi: 'Câu nào là câu hỏi khoa học tốt?', options: ['Is blue nice?', 'Do plants grow faster in sunlight or shade?', 'I like cats', 'Rain is wet'], optionsVi: ['Màu xanh có đẹp không?', 'Cây lớn nhanh hơn khi ngoài nắng hay trong bóng râm?', 'Tôi thích mèo', 'Mưa thì ướt'], correct: 1, explanation: 'Good science questions can be tested and measured!', explanationVi: 'Câu hỏi khoa học tốt có thể kiểm tra và đo lường được!' },
    ],
    challenge: { task: 'Ask 5 "Why" questions today. Try to find answers for 2 of them using books or asking an adult. Draw the answers!', taskVi: 'Hỏi 5 câu "Tại sao" hôm nay. Tìm câu trả lời cho 2 câu bằng sách hoặc hỏi người lớn. Vẽ câu trả lời!', duration: '30 min' },
    realWorldLink: 'OECD PISA Scientific Literacy Framework',
  },
  // ═══════ ENGLISH LEADERSHIP — Grade 1 ═══════
  'Show and Tell (EN)': {
    activityKey: 'Show and Tell (EN)',
    intro: 'Show and Tell builds confidence! Bring something special and tell everyone about it — in English!',
    introVi: 'Show and Tell xây dựng sự tự tin! Mang một thứ đặc biệt và kể cho mọi người nghe — bằng tiếng Anh!',
    steps: [
      { instruction: 'Choose one favourite thing (toy, book, photo)', instructionVi: 'Chọn một thứ yêu thích (đồ chơi, sách, ảnh)', emoji: '⭐' },
      { instruction: 'Practice saying: "This is my ___. I like it because ___."', instructionVi: 'Tập nói: "This is my ___. I like it because ___."', emoji: '🗣️' },
      { instruction: 'Add 2 more sentences about it', instructionVi: 'Thêm 2 câu nữa về nó', emoji: '✌️' },
      { instruction: 'Present to your family — stand up, speak clearly, make eye contact!', instructionVi: 'Trình bày trước gia đình — đứng dậy, nói rõ ràng, nhìn vào mắt!', emoji: '👪' },
    ],
    quiz: [
      { question: 'What makes a good presentation?', questionVi: 'Điều gì tạo nên bài trình bày tốt?', options: ['Speaking very fast', 'Looking at the floor', 'Speaking clearly and making eye contact', 'Reading from paper only'], optionsVi: ['Nói rất nhanh', 'Nhìn xuống sàn', 'Nói rõ ràng và nhìn vào mắt', 'Chỉ đọc từ giấy'], correct: 2, explanation: 'Good presenters speak clearly, slowly, and connect with their audience through eye contact!', explanationVi: 'Người trình bày giỏi nói rõ, chậm, và kết nối với khán giả qua ánh mắt!' },
    ],
    challenge: { task: 'Record a 30-second video of your Show and Tell in English. Watch it and try again — can you improve?', taskVi: 'Quay video 30 giây Show and Tell bằng tiếng Anh. Xem lại và thử lại — bạn có thể cải thiện không?', duration: '15 min' },
    realWorldLink: 'Cambridge Speaking Assessment Criteria — Pronunciation, Interactive Communication',
  },
  // ═══════ SOCIAL IMPACT — Grade 1 ═══════
  'Empathy Activities': {
    activityKey: 'Empathy Activities',
    intro: 'Empathy means understanding how others feel. It is the most important skill for leaders!',
    introVi: 'Đồng cảm nghĩa là hiểu cảm xúc của người khác. Đây là kỹ năng quan trọng nhất của nhà lãnh đạo!',
    steps: [
      { instruction: 'Look at pictures of faces — happy, sad, angry, scared, surprised', instructionVi: 'Nhìn hình các khuôn mặt — vui, buồn, giận, sợ, ngạc nhiên', emoji: '😊' },
      { instruction: 'Name each feeling and act it out!', instructionVi: 'Gọi tên từng cảm xúc và diễn lại!', emoji: '🎭' },
      { instruction: 'Think: "When did I feel this way?"', instructionVi: 'Nghĩ: "Lúc nào mình cảm thấy thế?"', emoji: '💭' },
      { instruction: 'Practice: "How would my friend feel if ___?"', instructionVi: 'Tập: "Bạn mình sẽ cảm thấy sao nếu ___?"', emoji: '🤝' },
    ],
    quiz: [
      { question: 'Your friend falls and hurts their knee. What should you do?', questionVi: 'Bạn bạn ngã đau đầu gối. Bạn nên làm gì?', options: ['Laugh at them', 'Walk away', 'Ask if they are OK and help them', 'Tell the teacher only'], optionsVi: ['Cười bạn ấy', 'Bỏ đi', 'Hỏi bạn có ổn không và giúp bạn', 'Chỉ nói với cô giáo'], correct: 2, explanation: 'Empathy means caring about others and taking action to help!', explanationVi: 'Đồng cảm nghĩa là quan tâm đến người khác và hành động để giúp đỡ!' },
    ],
    challenge: { task: 'Do 3 kind things today without being asked. Write them in your Kindness Journal. How did it make you feel?', taskVi: 'Làm 3 điều tốt hôm nay mà không ai nhờ. Viết vào Nhật ký Tốt bụng. Bạn cảm thấy thế nào?', duration: '1 day' },
    realWorldLink: 'UNICEF Transferable Skills — Empathy & Respect',
  },
};
