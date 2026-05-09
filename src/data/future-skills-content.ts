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
      { question: 'How is an algorithm like a recipe for a cake?', questionVi: 'Thuật toán giống công thức làm bánh như thế nào?', options: ['It needs an oven', 'It is a set of step-by-step instructions to get a result', 'It is sweet', 'It has ingredients'], optionsVi: ['Nó cần lò nướng', 'Đó là tập hợp các bước hướng dẫn để có kết quả', 'Nó ngọt', 'Nó có nguyên liệu'], correct: 1, explanation: 'Both an algorithm and a recipe are step-by-step instructions to complete a task successfully!', explanationVi: 'Cả thuật toán và công thức đều là các bước hướng dẫn để hoàn thành một nhiệm vụ thành công!' },
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
      { question: 'If you want the cat to say "Hello" before it jumps, which block order is correct?', questionVi: 'Nếu muốn mèo nói "Hello" trước khi nhảy, thứ tự khối nào đúng?', options: ['Jump then Say', 'Say then Jump', 'Only Jump', 'Green flag only'], optionsVi: ['Nhảy rồi Nói', 'Nói rồi Nhảy', 'Chỉ Nhảy', 'Chỉ Cờ xanh'], correct: 1, explanation: 'The computer reads blocks in order. So the "Say" block must come before the "Jump" block!', explanationVi: 'Máy tính đọc các khối theo thứ tự. Vì vậy khối "Nói" phải đứng trước khối "Nhảy"!' },
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
      { question: 'If you have 100 random LEGO blocks, what is the best first step to build a red car?', questionVi: 'Nếu bạn có 100 khối LEGO lộn xộn, bước đầu tiên tốt nhất để xếp một chiếc xe màu đỏ là gì?', options: ['Close your eyes and pick', 'Sort all the RED blocks into one pile', 'Throw them on the floor', 'Sort by size only'], optionsVi: ['Nhắm mắt và chọn đại', 'Phân loại tất cả các khối MÀU ĐỎ thành một đống', 'Vứt chúng xuống sàn', 'Chỉ phân loại theo kích thước'], correct: 1, explanation: 'Sorting by the feature you need (color) makes your task much easier and faster!', explanationVi: 'Phân loại theo đặc điểm bạn cần (màu sắc) giúp nhiệm vụ của bạn dễ dàng và nhanh chóng hơn nhiều!' },
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
      { question: 'You have a dirty plastic bottle with old milk inside. What must you do before putting it in the Recycle bin?', questionVi: 'Bạn có một chai nhựa bẩn còn sữa cũ bên trong. Bạn phải làm gì trước khi bỏ vào thùng Tái chế?', options: ['Throw it in Trash instead', 'Wash it clean and empty it first', 'Put it in Compost', 'Hide it'], optionsVi: ['Cứ vứt vào Thùng rác thường', 'Rửa sạch và làm rỗng nó trước', 'Bỏ vào thùng Ủ phân', 'Giấu nó đi'], correct: 1, explanation: 'Items must be clean to be recycled! Dirty items can ruin a whole batch of recycling.', explanationVi: 'Đồ vật phải sạch thì mới tái chế được! Đồ bẩn có thể làm hỏng cả một mẻ tái chế.' },
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
      { question: 'You plant two seeds. Seed A is by the sunny window. Seed B is in a dark closet. After a week, what will happen?', questionVi: 'Bạn trồng hai hạt. Hạt A ở bậu cửa sổ đầy nắng. Hạt B ở trong tủ tối. Sau một tuần, điều gì sẽ xảy ra?', options: ['Both grow the same', 'Seed A grows tall and green, Seed B is pale and weak', 'Seed B grows faster', 'They both die'], optionsVi: ['Cả hai lớn như nhau', 'Hạt A cao và xanh, Hạt B nhợt nhạt và yếu', 'Hạt B lớn nhanh hơn', 'Cả hai đều chết'], correct: 1, explanation: 'Plants need sunlight to make food. Without light, Seed B cannot grow strong!', explanationVi: 'Cây cần ánh sáng mặt trời để tạo thức ăn. Không có ánh sáng, Hạt B không thể lớn khỏe!' },
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
  'Predict & Observe': {
    activityKey: 'Predict & Observe',
    intro: 'Before doing an experiment, scientists GUESS what will happen. This is called a Prediction!',
    introVi: 'Trước khi làm thí nghiệm, nhà khoa học ĐOÁN xem điều gì sẽ xảy ra. Đây gọi là Dự đoán!',
    steps: [
      { instruction: 'Get a bowl of water and 5 small objects (coin, leaf, key, plastic toy, rock)', instructionVi: 'Lấy một bát nước và 5 vật nhỏ (đồng xu, chiếc lá, chìa khóa, đồ chơi nhựa, cục đá)', emoji: '💧' },
      { instruction: 'PREDICT: Which things will FLOAT? Which will SINK? Write it down.', instructionVi: 'DỰ ĐOÁN: Vật nào sẽ NỔI? Vật nào sẽ CHÌM? Ghi lại nhé.', emoji: '🤔' },
      { instruction: 'TEST: Put them in the water one by one.', instructionVi: 'KIỂM TRA: Lần lượt thả từng vật vào nước.', emoji: '🧪' },
      { instruction: 'OBSERVE: Were your predictions right? It\'s OK if they were wrong!', instructionVi: 'QUAN SÁT: Dự đoán của bạn có đúng không? Không sao nếu đoán sai nhé!', emoji: '👀' },
    ],
    quiz: [
      { question: 'You drop a heavy rock and a light feather over the water. You guess the rock will sink. What are you doing?', questionVi: 'Bạn thả một hòn đá nặng và một chiếc lông nhẹ trên mặt nước. Bạn đoán hòn đá sẽ chìm. Bạn đang làm gì?', options: ['Making a magic spell', 'Making a prediction based on what you know', 'Making a mistake', 'Drawing'], optionsVi: ['Làm phép thuật', 'Đưa ra một dự đoán (prediction) dựa trên những gì bạn biết', 'Mắc lỗi', 'Đang vẽ'], correct: 1, explanation: 'Using your past experience to guess what will happen in an experiment is called making a prediction!', explanationVi: 'Sử dụng kinh nghiệm quá khứ để đoán xem điều gì sẽ xảy ra trong thí nghiệm được gọi là dự đoán!' },
    ],
    challenge: { task: 'Predict how many jumps you can do in 1 minute. Write it down. Then set a timer and test it!', taskVi: 'Dự đoán bạn nhảy được bao nhiêu cái trong 1 phút. Ghi lại. Đặt giờ và làm thử xem!', duration: '10 min' },
    realWorldLink: 'Cambridge Primary Science — Scientific Enquiry',
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
      { question: 'During your Show & Tell, your friend in the back row says they cannot hear you. What is the best logic to fix this?', questionVi: 'Trong buổi Show & Tell, bạn ở hàng cuối nói không nghe thấy bạn. Cách giải quyết logic nhất là gì?', options: ['Talk much faster', 'Hide behind the desk', 'Stand up tall, face them, and project your voice louder', 'Stop talking immediately'], optionsVi: ['Nói nhanh hơn nhiều', 'Trốn sau bàn', 'Đứng thẳng, hướng về phía họ và nói to hơn', 'Ngừng nói ngay lập tức'], correct: 2, explanation: 'Good communication means making sure your audience can hear and understand you. Body posture helps volume!', explanationVi: 'Giao tiếp tốt nghĩa là đảm bảo khán giả có thể nghe và hiểu bạn. Tư thế cơ thể giúp tăng âm lượng!' },
    ],
    challenge: { task: 'Record a 30-second video of your Show and Tell in English. Watch it and try again — can you improve?', taskVi: 'Quay video 30 giây Show and Tell bằng tiếng Anh. Xem lại và thử lại — bạn có thể cải thiện không?', duration: '15 min' },
    realWorldLink: 'Cambridge Speaking Assessment Criteria — Pronunciation, Interactive Communication',
  },
  'Story Retelling': {
    activityKey: 'Story Retelling',
    intro: 'Good leaders are great storytellers! Can you tell a story so everyone wants to listen?',
    introVi: 'Nhà lãnh đạo giỏi là người kể chuyện hay! Bạn có thể kể một câu chuyện khiến ai cũng muốn nghe không?',
    steps: [
      { instruction: 'Read a short, fun book (like "The Very Hungry Caterpillar")', instructionVi: 'Đọc một cuốn sách ngắn, vui (ví dụ "Chú sâu háu ăn")', emoji: '📖' },
      { instruction: 'Draw 3 pictures: the BEGINNING, the MIDDLE, and the END', instructionVi: 'Vẽ 3 bức tranh: phần ĐẦU, phần GIỮA, và phần CUỐI', emoji: '🖼️' },
      { instruction: 'Use your pictures to tell the story to your parents', instructionVi: 'Dùng tranh của bạn để kể lại câu chuyện cho ba mẹ', emoji: '🗣️' },
      { instruction: 'Use big words and a loud, clear voice!', instructionVi: 'Dùng từ vựng hay và giọng nói to, rõ ràng!', emoji: '🌟' },
    ],
    quiz: [
      { question: 'If you tell a story about a hero, but you skip the "middle" part where they face a challenge, what happens?', questionVi: 'Nếu bạn kể chuyện về một anh hùng, nhưng bỏ qua phần "giữa" khi họ đối mặt thử thách, chuyện gì xảy ra?', options: ['The story is much better', 'The story makes no sense because the problem and action are missing', 'The story becomes a song', 'Nothing changes at all'], optionsVi: ['Truyện hay hơn nhiều', 'Truyện vô lý vì thiếu đi vấn đề và hành động giải quyết', 'Truyện trở thành bài hát', 'Không có gì thay đổi cả'], correct: 1, explanation: 'The "middle" is the most important part! It holds the problem, the action, and the excitement.', explanationVi: 'Phần "giữa" là quan trọng nhất! Nó chứa đựng vấn đề, hành động và sự kịch tính.' },
    ],
    challenge: { task: 'Change the ending of your favourite story! Tell the new story to your family.', taskVi: 'Thay đổi phần kết thúc của câu chuyện yêu thích! Kể câu chuyện mới cho gia đình nghe.', duration: '20 min' },
    realWorldLink: 'CEFR A1 Narrative Skills — Cohesion and Sequencing',
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
  'Book Donation Drive': {
    activityKey: 'Book Donation Drive',
    intro: 'Leaders take action to help the community. Sharing books is a great way to start!',
    introVi: 'Lãnh đạo hành động để giúp đỡ cộng đồng. Chia sẻ sách là một cách tuyệt vời để bắt đầu!',
    steps: [
      { instruction: 'Look at your bookshelf — find 3 books you have read and loved', instructionVi: 'Nhìn giá sách của bạn — tìm 3 cuốn bạn đã đọc và rất thích', emoji: '📚' },
      { instruction: 'Check if they are clean and in good condition', instructionVi: 'Kiểm tra xem sách có sạch sẽ và còn mới không', emoji: '✨' },
      { instruction: 'Make a nice "Donation Box" using a cardboard box and crayons', instructionVi: 'Làm một "Hộp quyên góp" thật đẹp bằng thùng carton và bút sáp màu', emoji: '📦' },
      { instruction: 'With your parents, take the box to a school or library to donate!', instructionVi: 'Cùng ba mẹ mang hộp sách đến trường hoặc thư viện để tặng nhé!', emoji: '🏫' },
    ],
    quiz: [
      { question: 'Why is donating books a good thing?', questionVi: 'Vì sao tặng sách là một việc tốt?', options: ['To make your room messy', 'To share knowledge and joy with others', 'To get money', 'To throw them away'], optionsVi: ['Để phòng bề bộn', 'Để chia sẻ niềm vui và kiến thức với người khác', 'Để lấy tiền', 'Để vứt chúng đi'], correct: 1, explanation: 'Sharing books helps other children learn and discover new things!', explanationVi: 'Chia sẻ sách giúp các bạn nhỏ khác học hỏi và khám phá nhiều điều mới!' },
    ],
    challenge: { task: 'Write a small "friendly note" and put it inside one of the books before donating it!', taskVi: 'Viết một "lời nhắn dễ thương" nhỏ và kẹp vào trong một cuốn sách trước khi tặng nhé!', duration: '15 min' },
    realWorldLink: 'OECD Learning Compass — Student Agency & Co-agency',
  },
  'Mini Debate': {
    activityKey: 'Mini Debate',
    intro: 'A debate is when people share different opinions using facts and logic. It is not an argument, it is a smart discussion!',
    introVi: 'Tranh luận là khi mọi người chia sẻ ý kiến khác nhau bằng thực tế và logic. Đó không phải cãi vã, mà là một cuộc thảo luận thông minh!',
    steps: [
      { instruction: 'Listen carefully to the topic', instructionVi: 'Lắng nghe kỹ chủ đề', emoji: '👂' },
      { instruction: 'Think: Do you agree or disagree? Why?', instructionVi: 'Suy nghĩ: Bạn đồng ý hay không đồng ý? Tại sao?', emoji: '🤔' },
      { instruction: 'Find facts to support your idea', instructionVi: 'Tìm sự thật (facts) để hỗ trợ ý tưởng của bạn', emoji: '🔍' },
      { instruction: 'Speak clearly and respect the other person', instructionVi: 'Nói rõ ràng và tôn trọng người khác', emoji: '🗣️' },
    ],
    quiz: [
      { question: 'If someone disagrees with you in a debate, what should you do?', questionVi: 'Nếu ai đó không đồng ý với bạn trong một cuộc tranh luận, bạn nên làm gì?', options: ['Shout at them', 'Listen to their reasons and politely share yours', 'Walk away', 'Cry'], optionsVi: ['Hét vào mặt họ', 'Lắng nghe lý do của họ và lịch sự chia sẻ lý do của mình', 'Bỏ đi', 'Khóc'], correct: 1, explanation: 'Good debaters listen to others and use logic, not anger, to make their point!', explanationVi: 'Người tranh luận giỏi lắng nghe người khác và dùng logic, không phải sự tức giận, để đưa ra quan điểm!' },
    ],
    challenge: { task: 'Debate with your parents: "Should kids eat dessert before dinner?" Prepare 2 strong reasons!', taskVi: 'Tranh luận với ba mẹ: "Trẻ con có nên ăn tráng miệng trước bữa tối không?" Chuẩn bị 2 lý do thuyết phục!', duration: '20 min' },
    realWorldLink: 'World Schools Debating Championships Format',
  },
  'AI Ethics Discussion': {
    activityKey: 'AI Ethics Discussion',
    intro: 'AI is very smart, but it does not know what is right or wrong. Humans must teach AI to be fair and kind!',
    introVi: 'AI rất thông minh, nhưng nó không biết điều gì là đúng hay sai. Con người phải dạy AI cách công bằng và tử tế!',
    steps: [
      { instruction: 'Think about a situation where someone uses AI', instructionVi: 'Nghĩ về một tình huống ai đó dùng AI', emoji: '🤖' },
      { instruction: 'Ask: Is this fair to everyone?', instructionVi: 'Hỏi: Điều này có công bằng với mọi người không?', emoji: '⚖️' },
      { instruction: 'Ask: Could this hurt someone\'s feelings?', instructionVi: 'Hỏi: Điều này có thể làm tổn thương ai không?', emoji: '❤️' },
      { instruction: 'Discuss: How can we use AI responsibly?', instructionVi: 'Thảo luận: Làm sao để dùng AI có trách nhiệm?', emoji: '🌍' },
    ],
    quiz: [
      { question: 'If you ask an AI to write a mean story about your friend, what is the most ethical choice?', questionVi: 'Nếu bạn nhờ AI viết một câu chuyện xấu về bạn của mình, lựa chọn đạo đức nhất là gì?', options: ['Do it, because AI wrote it, not you', 'Do not do it, because it is still hurtful and wrong', 'Share it with everyone', 'Tell the AI it did a good job'], optionsVi: ['Làm đi, vì AI viết chứ không phải bạn', 'Không làm thế, vì nó vẫn gây tổn thương và sai trái', 'Chia sẻ cho mọi người', 'Khen AI làm tốt lắm'], correct: 1, explanation: 'You are responsible for how you use AI. Using it to hurt others is never ethical!', explanationVi: 'Bạn chịu trách nhiệm về cách bạn dùng AI. Dùng nó để làm tổn thương người khác không bao giờ là đạo đức!' },
    ],
    challenge: { task: 'Talk to your parents: If an AI makes a mistake that causes a problem, who is responsible? The AI, or the person who made it?', taskVi: 'Nói chuyện với ba mẹ: Nếu AI mắc lỗi gây ra vấn đề, ai chịu trách nhiệm? AI hay người tạo ra nó?', duration: '30 min' },
    realWorldLink: 'UNESCO Recommendation on the Ethics of AI (2021)',
  },
};
