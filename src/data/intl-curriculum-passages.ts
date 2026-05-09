// ══════════════════════════════════════════════════════════════════
// Authentic Curriculum Reading Passages
// Mapped to specific Unit IDs for high-fidelity content delivery
// ══════════════════════════════════════════════════════════════════

export interface AuthenticReading {
  text: string;
  textVi: string;
}

/**
 * Multi-section authentic content — matches original textbook structure
 * Each unit in Cambridge/Wonders has 6-7 sections (lessons), not just 1 passage.
 */
export interface AuthenticSection {
  sectionTitle: string;
  sectionTitleVi: string;
  text: string;
  textVi: string;
  type:
    | 'poem' | 'story' | 'activity' | 'information' | 'review' | 'reading' | 'grammar' | 'tip'
    // ── NEW: Full Cambridge textbook alignment ──
    | 'getting_started'  // Warm-up discussion, prior knowledge
    | 'talk_about'       // Speaking & Listening / Talk Partner
    | 'comprehension'    // Text-based questions (literal + inferential)
    | 'word_work'        // Phonics, spelling patterns, vocabulary
    | 'writing'          // Guided writing task
    | 'skills_tip'       // Reading/writing strategy box
    | 'did_you_know'     // Fun fact related to theme
    | 'self_check';      // "I can…" self-assessment checklist
  /** Optional icon override for UI rendering */
  icon?: string;
  /** Cambridge curriculum objective tag, e.g. "1Rw.01" */
  skillRef?: string;
}

export const AUTHENTIC_UNIT_SECTIONS: Record<string, AuthenticSection[]> = {
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G1 U03: Rhyme time — 7 sections from Learner's Book
  // ══════════════════════════════════════════════════════════════
  'cam_g1_u03': [
    {
      sectionTitle: '3.1 Getting Started',
      sectionTitleVi: '3.1 Khởi động',
      type: 'getting_started',
      text: "Welcome to Rhyme Time! Before we begin, let's talk together.\n\n🗣️ Talk with your partner:\n• Do you know any rhymes or songs? Say one!\n• What makes words sound the same? (cat — hat)\n• Can you clap along to a beat?\n\nToday we will learn about RHYMES — words that sound alike at the end. Listen carefully and join in!",
      textVi: "Chào mừng đến với Thời gian Vần điệu! Trước khi bắt đầu, hãy cùng nói chuyện.\n\n🗣️ Nói chuyện với bạn:\n• Bạn có biết bài vần hoặc bài hát nào không? Hãy đọc lên!\n• Điều gì làm cho các từ nghe giống nhau? (cat — hat)\n• Bạn có thể vỗ tay theo nhịp không?\n\nHôm nay chúng ta sẽ học về VẦN — các từ có âm cuối giống nhau. Hãy lắng nghe cẩn thận và cùng tham gia!"
    },
    {
      sectionTitle: '3.1 Rhyme time',
      sectionTitleVi: '3.1 Thời gian vần điệu',
      type: 'poem',
      text: "Hickory dickory dock,\nThe mouse ran up the clock.\nThe clock struck one,\nThe mouse ran down,\nHickory dickory dock.\n\nRhymes are words that sound the same at the end. Listen: 'dock' and 'clock' — they rhyme! Can you hear it? The sounds '-ock' are the same. Let's find more rhyming words:\n• cat — hat — mat — sat — bat\n• star — car — far — jar\n• rock — sock — lock — knock\n\nSay each pair aloud. Can you clap the rhythm?",
      textVi: "Hickory dickory dock,\nChú chuột chạy lên đồng hồ.\nĐồng hồ điểm một giờ,\nChú chuột chạy xuống,\nHickory dickory dock.\n\nVần là những từ có âm cuối giống nhau. Nghe nào: 'dock' và 'clock' — chúng vần với nhau! Bạn nghe thấy không? Âm '-ock' giống nhau. Hãy tìm thêm từ có vần:\n• cat — hat — mat — sat — bat\n• star — car — far — jar\n• rock — sock — lock — knock\n\nĐọc to từng cặp từ. Bạn có thể vỗ tay theo nhịp không?"
    },
    {
      sectionTitle: '3.2 Number rhyme time',
      sectionTitleVi: '3.2 Vần điệu với số',
      type: 'poem',
      text: "One, two, buckle my shoe.\nThree, four, knock at the door.\nFive, six, pick up sticks.\nSeven, eight, lay them straight.\nNine, ten, a big fat hen!\n\nNumber rhymes help us count and learn new words at the same time. Can you find the rhyming pairs?\n• two — shoe\n• four — door\n• six — sticks\n• eight — straight\n• ten — hen\n\nNow try counting backwards! Ten, nine, eight, seven, six, five, four, three, two, one — BLAST OFF!",
      textVi: "Một, hai, cài khuy giày.\nBa, bốn, gõ cửa nhà.\nNăm, sáu, nhặt que nào.\nBảy, tám, xếp thẳng hàng.\nChín, mười, gà mập tròn!\n\nCác bài vần số giúp chúng ta vừa đếm vừa học từ mới cùng lúc. Bạn có tìm được các cặp vần không?\n• two — shoe (hai — giày)\n• four — door (bốn — cửa)\n• six — sticks (sáu — que)\n• eight — straight (tám — thẳng)\n• ten — hen (mười — gà mái)\n\nBây giờ hãy đếm ngược! Mười, chín, tám, bảy, sáu, năm, bốn, ba, hai, một — PHÓNG!"
    },
    {
      sectionTitle: '3.3 Funny rhymes',
      sectionTitleVi: '3.3 Vần điệu vui nhộn',
      type: 'poem',
      text: "Hey diddle diddle,\nThe cat and the fiddle,\nThe cow jumped over the moon.\nThe little dog laughed to see such fun,\nAnd the dish ran away with the spoon!\n\nThis is a funny rhyme because silly things happen! Can a cow really jump over the moon? Can a dish run? No! That is what makes it funny.\n\nFunny rhymes use imagination. The rhyming words are:\n• diddle — fiddle\n• moon — spoon\n• fun — run\n\nCan you make up a funny rhyme? Try: \"The frog sat on a ___\" (log!)",
      textVi: "Hey diddle diddle,\nCon mèo và cây đàn,\nCon bò nhảy qua mặt trăng.\nChú chó con cười khi thấy trò vui,\nVà cái đĩa chạy đi cùng cái muỗng!\n\nĐây là một bài vần vui nhộn vì những điều ngớ ngẩn xảy ra! Con bò có thể nhảy qua mặt trăng thật không? Cái đĩa có thể chạy không? Không! Đó là điều làm nó buồn cười.\n\nCác bài vần vui dùng trí tưởng tượng. Các từ vần là:\n• diddle — fiddle\n• moon — spoon\n• fun — run\n\nBạn có thể tự nghĩ ra một bài vần vui không? Thử nào: \"The frog sat on a ___\" (log — khúc gỗ!)"
    },
    {
      sectionTitle: '3.4 Silly rhymes',
      sectionTitleVi: '3.4 Vần điệu ngớ ngẩn',
      type: 'poem',
      text: "I saw a purple cow,\nI never saw one before.\nI never hope to see one,\nBut I can tell you furthermore —\nI'd rather see than be one!\n\nSilly rhymes play with words in a nonsense way. They make us laugh because they are so strange! A purple cow? That is very silly!\n\nLet's play a silly rhyme game. I say a word, you find a rhyming word:\n• jelly → belly\n• wiggly → jiggly\n• funny → bunny\n• crazy → lazy\n\nNow make a silly sentence: \"I saw a wiggly jiggly jelly on the belly of a bunny!\"",
      textVi: "Tôi thấy một con bò tím,\nTôi chưa bao giờ thấy trước đây.\nTôi không hy vọng thấy,\nNhưng tôi có thể nói thêm —\nTôi thà thấy nó hơn là làm nó!\n\nCác bài vần ngớ ngẩn chơi với từ theo cách vô nghĩa. Chúng khiến ta cười vì quá kỳ lạ! Một con bò tím? Thật là ngớ ngẩn!\n\nHãy chơi trò vần ngớ ngẩn. Tôi nói một từ, bạn tìm từ vần:\n• jelly → belly (thạch → bụng)\n• wiggly → jiggly (lắc lư → rung rinh)\n• funny → bunny (buồn cười → thỏ)\n• crazy → lazy (điên → lười)\n\nBây giờ hãy đặt một câu ngớ ngẩn: \"Tôi thấy một miếng thạch rung rinh lắc lư trên bụng của một chú thỏ!\""
    },
    {
      sectionTitle: '3.6 Word Work: Rhyming families',
      sectionTitleVi: '3.6 Luyện từ: Họ vần',
      type: 'word_work',
      text: "Words that share the same ending sound belong to a RHYMING FAMILY.\n\n🔤 The -at family: cat, hat, mat, sat, bat, rat, fat, flat\n🔤 The -ock family: dock, clock, rock, sock, lock, knock, block\n🔤 The -oon family: moon, spoon, soon, noon, balloon\n🔤 The -en family: hen, ten, pen, den, men, when, then\n\n✏️ Practice:\n1. I sat on a ___ (mat / map)\n2. The ___ says tick-tock (clock / cloud)\n3. I can see the ___ at night (moon / mood)\n4. Count to ___ (ten / tan)\n\n🌟 Challenge: Can you think of THREE words in the -ig family? (big, dig, pig, fig, wig...)",
      textVi: "Các từ có âm cuối giống nhau thuộc cùng một HỌ VẦN.\n\n🔤 Họ -at: cat, hat, mat, sat, bat, rat, fat, flat\n🔤 Họ -ock: dock, clock, rock, sock, lock, knock, block\n🔤 Họ -oon: moon, spoon, soon, noon, balloon\n🔤 Họ -en: hen, ten, pen, den, men, when, then\n\n✏️ Luyện tập:\n1. I sat on a ___ (mat / map) — Tôi ngồi trên ___\n2. The ___ says tick-tock (clock / cloud) — Cái ___ kêu tích tắc\n3. I can see the ___ at night (moon / mood) — Tôi thấy ___ vào ban đêm\n4. Count to ___ (ten / tan) — Đếm đến ___\n\n🌟 Thử thách: Bạn có thể nghĩ ra BA từ thuộc họ -ig không? (big, dig, pig, fig, wig...)"
    },
    {
      sectionTitle: '3.5 A rhyme that tells a story',
      sectionTitleVi: '3.5 Bài vần kể chuyện',
      type: 'story',
      text: "Fire! Fire! said Mrs McGuire.\nWhere? Where? said Mrs Hare.\nDown town! said Mrs Brown.\nTurn the corner! said Mrs Warner.\nHere it is! said Mrs Fizz.\nPut it out! said Mrs Pout.\nI can't! said Mrs Rant.\nCall the fire brigade! said Mrs Jade.\nGet the hose! said Mrs Rose.\nToo late! said Mrs Fate.\n\nThis rhyme tells a story — a fire breaks out and people try to help! Each line has a new character and a rhyme. Notice:\n• McGuire — Fire\n• Hare — Where\n• Brown — town\n• Warner — corner\n\nA narrative rhyme uses rhyme to tell a story from beginning to end.",
      textVi: "Cháy! Cháy! bà McGuire nói.\nỞ đâu? Ở đâu? bà Hare hỏi.\nDưới phố! bà Brown nói.\nRẽ góc! bà Warner nói.\nĐây rồi! bà Fizz nói.\nDập đi! bà Pout nói.\nTôi không thể! bà Rant nói.\nGọi đội cứu hỏa! bà Jade nói.\nLấy vòi nước! bà Rose nói.\nMuộn rồi! bà Fate nói.\n\nBài vần này kể một câu chuyện — có hỏa hoạn và mọi người cố giúp đỡ! Mỗi dòng có một nhân vật mới và một vần. Chú ý:\n• McGuire — Fire (Lửa)\n• Hare — Where (Ở đâu)\n• Brown — town (phố)\n• Warner — corner (góc)\n\nBài vần kể chuyện dùng vần điệu để kể một câu chuyện từ đầu đến cuối."
    },
    {
      sectionTitle: '3.8 Comprehension',
      sectionTitleVi: '3.8 Đọc hiểu',
      type: 'comprehension',
      text: "Let's check how well you understood the rhymes!\n\n❓ Questions:\n1. In 'Hickory Dickory Dock', what did the mouse run up? (a clock)\n2. Which two words rhyme: 'four' and ___? (door)\n3. In the funny rhyme, what jumped over the moon? (the cow)\n4. In 'Fire! Fire!', who said 'Get the hose'? (Mrs Rose)\n5. What makes a rhyme SILLY? (It has nonsense or impossible things)\n\n🤔 Think deeper:\n• Why do rhymes help us remember things?\n• Which was your favourite rhyme? Why?",
      textVi: "Hãy kiểm tra xem bạn hiểu các bài vần tốt như thế nào!\n\n❓ Câu hỏi:\n1. Trong 'Hickory Dickory Dock', chú chuột chạy lên cái gì? (đồng hồ)\n2. Hai từ nào vần với nhau: 'four' và ___? (door)\n3. Trong bài vần vui, con gì nhảy qua mặt trăng? (con bò)\n4. Trong 'Cháy! Cháy!', ai nói 'Lấy vòi nước'? (bà Rose)\n5. Điều gì làm cho bài vần NGỚ NGẨN? (Có những điều vô nghĩa hoặc không thể)\n\n🤔 Suy nghĩ sâu hơn:\n• Tại sao vần điệu giúp chúng ta nhớ mọi thứ?\n• Bài vần yêu thích của bạn là bài nào? Tại sao?"
    },
    {
      sectionTitle: '3.9 Talk About: Share your rhyme',
      sectionTitleVi: '3.9 Nói về: Chia sẻ bài vần',
      type: 'talk_about',
      text: "🗣️ Speaking Activity — Work with a partner!\n\n1. Choose your FAVOURITE rhyme from this unit.\n2. Practise saying it aloud — use a clear voice!\n3. Clap or tap the RHYTHM as you say it.\n4. Tell your partner WHY you like it.\n\n🎭 Challenge: Can you ACT OUT a rhyme? Use your hands and face!\n• For 'Hickory Dickory Dock' — pretend to be the mouse!\n• For 'Hey Diddle Diddle' — pretend to be the cow jumping!\n\n👂 Listening: While your partner speaks, listen carefully. Can you hear the rhyming words?",
      textVi: "🗣️ Hoạt động Nói — Làm việc với bạn!\n\n1. Chọn bài vần YÊU THÍCH của bạn trong bài này.\n2. Luyện đọc to — dùng giọng rõ ràng!\n3. Vỗ tay theo NHỊP khi bạn đọc.\n4. Nói cho bạn nghe TẠI SAO bạn thích nó.\n\n🎭 Thử thách: Bạn có thể DIỄN bài vần không? Dùng tay và biểu cảm khuôn mặt!\n• Cho 'Hickory Dickory Dock' — giả vờ làm chú chuột!\n• Cho 'Hey Diddle Diddle' — giả vờ là con bò nhảy!\n\n👂 Lắng nghe: Khi bạn nói, hãy lắng nghe cẩn thận. Bạn có nghe thấy các từ vần không?"
    },
    {
      sectionTitle: '3.10 Writing: Make your own rhyme',
      sectionTitleVi: '3.10 Viết: Tạo bài vần riêng',
      type: 'writing',
      text: "Now it is YOUR turn to be a poet!\n\n✏️ Step 1: Pick a word family: -at, -ock, -oon, or -en\n✏️ Step 2: Write 3 words from that family\n✏️ Step 3: Use them in a short rhyme!\n\nExample with -at:\nI have a cat,\nHe wears a hat,\nHe sat on a mat,\nWhat do you think of that?\n\n📝 Now YOU try! Start with:\nI saw a ___ (pick a -ock word)\nIt sat on a ___ (pick another -ock word)\n\n🌟 Remember:\n• Rhyming words go at the END of the line\n• Keep it short — 4 lines is great!\n• It can be funny or silly!",
      textVi: "Bây giờ đến LƯỢT BẠN làm nhà thơ!\n\n✏️ Bước 1: Chọn một họ vần: -at, -ock, -oon, hoặc -en\n✏️ Bước 2: Viết 3 từ thuộc họ đó\n✏️ Bước 3: Dùng chúng trong một bài vần ngắn!\n\nVí dụ với -at:\nI have a cat, (Tôi có một con mèo)\nHe wears a hat, (Nó đội một cái mũ)\nHe sat on a mat, (Nó ngồi trên tấm thảm)\nWhat do you think of that? (Bạn nghĩ sao?)\n\n📝 Giờ BẠN thử! Bắt đầu với:\nI saw a ___ (chọn từ thuộc họ -ock)\nIt sat on a ___ (chọn từ -ock khác)\n\n🌟 Nhớ nhé:\n• Từ vần đặt ở CUỐI dòng\n• Viết ngắn thôi — 4 dòng là tuyệt!\n• Có thể vui nhộn hoặc ngớ ngẩn!"
    },
    {
      sectionTitle: '3.6 Changing a rhyme',
      sectionTitleVi: '3.6 Thay đổi bài vần',
      type: 'activity',
      text: "Now it is YOUR turn to be a poet! Let's change a rhyme we know.\n\nOriginal:\nHickory dickory dock, the mouse ran up the clock.\n\nLet's change it:\nHickory dickory dare, the mouse ran up the stair!\nHickory dickory dop, the mouse ran to the shop!\nHickory dickory doon, the mouse flew to the moon!\n\nSteps to change a rhyme:\n1. Pick a rhyme you know well.\n2. Choose the last word of a line.\n3. Think of a new word that rhymes.\n4. Change the line to match!\n\nTry changing \"Jack and Jill went up the hill\" — what rhymes with 'hill'? Bill? Grill? Chill?",
      textVi: "Bây giờ đến LƯỢT BẠN làm nhà thơ! Hãy thay đổi một bài vần mà ta biết.\n\nBản gốc:\nHickory dickory dock, chú chuột chạy lên đồng hồ.\n\nHãy thay đổi:\nHickory dickory dare, chú chuột chạy lên cầu thang!\nHickory dickory dop, chú chuột chạy đến cửa hàng!\nHickory dickory doon, chú chuột bay lên mặt trăng!\n\nCác bước thay đổi bài vần:\n1. Chọn một bài vần bạn biết rõ.\n2. Chọn từ cuối cùng của một dòng.\n3. Nghĩ ra một từ mới có vần với nó.\n4. Thay đổi dòng cho phù hợp!\n\nThử thay đổi \"Jack and Jill went up the hill\" — từ gì vần với 'hill'? Bill? Grill? Chill?"
    },
    {
      sectionTitle: '3.12 How did I do?',
      sectionTitleVi: '3.12 Tôi làm được gì?',
      type: 'self_check',
      text: "Check what you can do! Read each sentence and think: Can I do this?\n\n✅ I can hear rhyming words (cat/hat, moon/spoon)\n✅ I can say at least 3 rhyming words in a family (-at: cat, hat, mat)\n✅ I can recite a rhyme from memory\n✅ I can clap the rhythm of a rhyme\n✅ I can spot the rhyming words in a new poem\n✅ I can change words in a rhyme to make a new one\n✅ I can write my own short rhyme\n\n⭐ How many did you tick?\n7 = Amazing poet! 🌟\n5-6 = Great work! Keep practising!\n3-4 = Good start! Read more rhymes!\n1-2 = Ask for help and try again!",
      textVi: "Kiểm tra xem bạn làm được gì! Đọc từng câu và suy nghĩ: Tôi có thể làm điều này không?\n\n✅ Tôi có thể nghe các từ vần (cat/hat, moon/spoon)\n✅ Tôi có thể nói ít nhất 3 từ vần trong một họ (-at: cat, hat, mat)\n✅ Tôi có thể đọc thuộc một bài vần\n✅ Tôi có thể vỗ tay theo nhịp của bài vần\n✅ Tôi có thể tìm từ vần trong bài thơ mới\n✅ Tôi có thể thay đổi từ trong bài vần để tạo bài mới\n✅ Tôi có thể viết bài vần ngắn của riêng mình\n\n⭐ Bạn tích được bao nhiêu?\n7 = Nhà thơ tuyệt vời! 🌟\n5-6 = Giỏi lắm! Tiếp tục luyện tập!\n3-4 = Khởi đầu tốt! Đọc thêm bài vần nhé!\n1-2 = Hãy nhờ giúp đỡ và thử lại!"
    },
    {
      sectionTitle: '3.13 Unit 3 Review',
      sectionTitleVi: '3.7 Ôn tập Bài 3',
      type: 'review',
      text: "Well done! You have learned all about rhymes in Unit 3!\n\nLet's review what we know:\n✓ Rhyming words sound the same at the end (dock/clock, cat/hat)\n✓ Number rhymes help us count (one/shoe, four/door)\n✓ Funny rhymes use imagination (the cow jumped over the moon!)\n✓ Silly rhymes are nonsense words that make us laugh\n✓ Narrative rhymes tell a story (Fire! Fire!)\n✓ We can change rhymes to create new ones\n\nRhyme Families we learned:\n-ock: dock, clock, rock, sock, lock, knock\n-at: cat, hat, mat, sat, bat, rat\n-ar: star, car, far, jar, bar\n-oe: shoe, two, blue\n-oor: four, door, floor\n\nKeep practising! Read a rhyme every day!",
      textVi: "Giỏi lắm! Bạn đã học xong tất cả về vần điệu trong Bài 3!\n\nHãy ôn lại những gì chúng ta biết:\n✓ Từ vần có âm cuối giống nhau (dock/clock, cat/hat)\n✓ Vần số giúp ta đếm (one/shoe, four/door)\n✓ Vần vui dùng trí tưởng tượng (con bò nhảy qua mặt trăng!)\n✓ Vần ngớ ngẩn là những từ vô nghĩa làm ta cười\n✓ Vần kể chuyện kể một câu chuyện (Cháy! Cháy!)\n✓ Chúng ta có thể thay đổi vần để tạo vần mới\n\nCác họ vần đã học:\n-ock: dock, clock, rock, sock, lock, knock\n-at: cat, hat, mat, sat, bat, rat\n-ar: star, car, far, jar, bar\n-oe: shoe, two, blue\n-oor: four, door, floor\n\nHãy tiếp tục luyện tập! Đọc một bài vần mỗi ngày!"
    },
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G1 U01: Friends & Playground
  // ══════════════════════════════════════════════════════════════
  'cam_g1_u01': [
    {
      sectionTitle: '1.1 Getting Started',
      sectionTitleVi: '1.1 Khởi động',
      type: 'getting_started',
      text: "Welcome to Unit 1! Let's talk about FRIENDS.\n\n🗣️ Talk with your partner:\n• Who is your best friend?\n• What do you like to play?\n• How do you make a new friend?\n\nLook at the picture. What can you see? Children are playing in the playground. They are having fun TOGETHER. Today we will learn about playing, sharing, and being kind.",
      textVi: "Chào mừng đến Bài 1! Hãy nói về BẠN BÈ.\n\n🗣️ Nói chuyện với bạn:\n• Bạn thân nhất của bạn là ai?\n• Bạn thích chơi gì?\n• Làm thế nào để kết bạn mới?\n\nNhìn bức tranh. Bạn thấy gì? Trẻ em đang chơi ở sân chơi. Họ đang vui vẻ CÙNG NHAU. Hôm nay chúng ta sẽ học về chơi đùa, chia sẻ và tử tế."
    },
    {
      sectionTitle: "1.2 Playing together",
      sectionTitleVi: "1.1 Cùng chơi với nhau",
      type: "reading",
      text: "Look at the children in the playground. What are they doing? Some children are running. Some children are jumping. Two children are on the swing. They are playing together. Playing together is fun. We can share our toys. We can take turns. It is good to share and take turns.",
      textVi: "Hãy nhìn những đứa trẻ ở sân chơi. Họ đang làm gì? Một vài đứa trẻ đang chạy. Một vài đứa trẻ đang nhảy. Hai đứa trẻ đang chơi xích đu. Họ đang chơi cùng nhau. Chơi cùng nhau rất vui. Chúng ta có thể chia sẻ đồ chơi. Chúng ta có thể thay phiên nhau. Chia sẻ và thay phiên nhau là điều tốt."
    },
    {
      sectionTitle: "1.2 Making friends",
      sectionTitleVi: "1.2 Kết bạn",
      type: "information",
      text: "How do you make a new friend? You can say, 'Hello, my name is...' You can ask, 'What is your name?' You can say, 'Do you want to play?' Smiling is a good way to make friends. Being kind is a good way to make friends. We use polite words. We say 'please' and 'thank you'.",
      textVi: "Làm thế nào để kết bạn mới? Bạn có thể nói, 'Xin chào, tên mình là...' Bạn có thể hỏi, 'Tên bạn là gì?' Bạn có thể nói, 'Bạn có muốn chơi không?' Mỉm cười là một cách tốt để kết bạn. Tử tế là một cách tốt để kết bạn. Chúng ta sử dụng từ ngữ lịch sự. Chúng ta nói 'làm ơn' và 'cảm ơn'."
    },
    {
      sectionTitle: "1.3 Let's play",
      sectionTitleVi: "1.3 Hãy cùng chơi",
      type: "reading",
      text: "Let's play a game. Let's play tag. I am 'it'. Run, run, run! I can catch you. Now you are 'it'. Let's play hide and seek. I will close my eyes and count to ten. One, two, three... ten! Ready or not, here I come! Where are you hiding? I found you!",
      textVi: "Hãy chơi một trò chơi. Hãy chơi trò đuổi bắt. Mình làm người bắt (it). Chạy, chạy, chạy! Mình có thể bắt được bạn. Bây giờ bạn làm người bắt. Hãy chơi trò trốn tìm. Mình sẽ nhắm mắt lại và đếm đến mười. Một, hai, ba... mười! Sẵn sàng hay chưa, mình đến đây! Bạn đang trốn ở đâu? Mình tìm thấy bạn rồi!"
    },
    {
      sectionTitle: "1.4 Action words",
      sectionTitleVi: "1.4 Từ chỉ hành động",
      type: "grammar",
      text: "Action words tell us what we are doing. Run, jump, hop, skip, walk. We can run fast. We can jump high. We can hop on one leg. We can skip with a rope. We can walk slowly. What actions can you do? I can clap my hands. I can stomp my feet.",
      textVi: "Từ chỉ hành động cho chúng ta biết chúng ta đang làm gì. Chạy, nhảy, nhảy lò cò, nhảy dây, đi bộ. Chúng ta có thể chạy nhanh. Chúng ta có thể nhảy cao. Chúng ta có thể nhảy lò cò trên một chân. Chúng ta có thể nhảy với dây. Chúng ta có thể đi bộ chậm. Bạn có thể làm những hành động gì? Mình có thể vỗ tay. Mình có thể giậm chân."
    },
    {
      sectionTitle: '1.6 Word Work: Action words',
      sectionTitleVi: '1.6 Luyện từ: Từ chỉ hành động',
      type: 'word_work',
      text: "Action words (VERBS) tell us what we DO.\n\n🏃 Body actions: run, jump, hop, skip, walk, clap, stomp\n🤝 Friend actions: share, help, play, smile, talk, listen\n🎮 Game words: catch, throw, hide, seek, slide, swing, climb\n\n✏️ Fill in the action word:\n1. I can ___ very fast. (run)\n2. We ___ on the swing. (swing)\n3. She can ___ on one leg. (hop)\n4. Let's ___ our toys. (share)\n\n🌟 Challenge: Act out a word! Can your partner guess it?",
      textVi: "Từ chỉ hành động (ĐỘNG TỪ) cho ta biết chúng ta LÀM GÌ.\n\n🏃 Hành động cơ thể: chạy, nhảy, nhảy lò cò, nhảy dây, đi bộ, vỗ tay, giậm chân\n🤝 Hành động bạn bè: chia sẻ, giúp đỡ, chơi, mỉm cười, nói chuyện, lắng nghe\n🎮 Từ trò chơi: bắt, ném, trốn, tìm, trượt, đu, trèo\n\n✏️ Điền từ chỉ hành động:\n1. I can ___ very fast. (run — chạy)\n2. We ___ on the swing. (swing — đu)\n3. She can ___ on one leg. (hop — nhảy lò cò)\n4. Let's ___ our toys. (share — chia sẻ)\n\n🌟 Thử thách: Diễn một từ! Bạn có đoán được không?"
    },
    {
      sectionTitle: '1.7 Comprehension',
      sectionTitleVi: '1.7 Đọc hiểu',
      type: 'comprehension',
      text: "Let's check what you remember!\n\n❓ Questions:\n1. What do children do in the playground? (run, jump, swing, play)\n2. How do you make a new friend? (say hello, ask their name, smile)\n3. What polite words should we use? (please, thank you)\n4. Name THREE action words. (run, jump, hop, skip, walk...)\n5. Why is it important to take turns?\n\n🤔 Think deeper:\n• What is the BEST thing about having friends?\n• What should you do if someone is playing alone?",
      textVi: "Hãy kiểm tra bạn nhớ được gì!\n\n❓ Câu hỏi:\n1. Trẻ em làm gì ở sân chơi? (chạy, nhảy, đu, chơi)\n2. Làm thế nào để kết bạn mới? (chào, hỏi tên, mỉm cười)\n3. Những từ lịch sự nào chúng ta nên dùng? (làm ơn, cảm ơn)\n4. Kể BA từ chỉ hành động. (chạy, nhảy, nhảy lò cò, nhảy dây, đi bộ...)\n5. Tại sao thay phiên nhau lại quan trọng?\n\n🤔 Suy nghĩ sâu hơn:\n• Điều TỐT NHẤT khi có bạn bè là gì?\n• Bạn nên làm gì nếu thấy ai đó chơi một mình?"
    },
    {
      sectionTitle: '1.8 Talk About: My favourite game',
      sectionTitleVi: '1.8 Nói về: Trò chơi yêu thích',
      type: 'talk_about',
      text: "🗣️ Speaking Activity — Tell your partner!\n\n1. What is your favourite game?\n2. How do you play it?\n3. Who do you play it with?\n4. Why do you like it?\n\n📋 Use this sentence pattern:\n'My favourite game is ___. I play it with ___. I like it because ___.\n\n👂 Listening: When your partner talks, listen carefully. Then tell the class what THEIR favourite game is!",
      textVi: "🗣️ Hoạt động Nói — Nói cho bạn nghe!\n\n1. Trò chơi yêu thích của bạn là gì?\n2. Bạn chơi nó như thế nào?\n3. Bạn chơi với ai?\n4. Tại sao bạn thích nó?\n\n📋 Dùng mẫu câu:\n'Trò chơi yêu thích của tôi là ___. Tôi chơi với ___. Tôi thích vì ___.'\n\n👂 Lắng nghe: Khi bạn nói, hãy lắng nghe cẩn thận. Sau đó kể cho cả lớp trò chơi yêu thích của BẠN ẤY!"
    },
    {
      sectionTitle: '1.9 Writing: About my friend',
      sectionTitleVi: '1.9 Viết: Về bạn của tôi',
      type: 'writing',
      text: "✏️ Write about your friend!\n\nStep 1: Think about your friend.\nStep 2: Answer these questions:\n• What is their name?\n• What do they look like?\n• What do you play together?\n• Why are they a good friend?\n\nStep 3: Write 3-4 sentences.\n\nExample:\nMy friend is Lan. She has long hair. We play tag together. She always shares her snacks. She is kind.\n\n🌟 Draw a picture of you and your friend playing!",
      textVi: "✏️ Viết về bạn của bạn!\n\nBước 1: Nghĩ về bạn của bạn.\nBước 2: Trả lời các câu hỏi:\n• Tên bạn ấy là gì?\n• Bạn ấy trông như thế nào?\n• Các bạn chơi gì cùng nhau?\n• Tại sao bạn ấy là người bạn tốt?\n\nBước 3: Viết 3-4 câu.\n\nVí dụ:\nBạn tôi là Lan. Bạn ấy có tóc dài. Chúng tôi chơi đuổi bắt cùng nhau. Bạn ấy luôn chia sẻ đồ ăn vặt. Bạn ấy rất tử tế.\n\n🌟 Vẽ một bức tranh về bạn và bạn ấy đang chơi!"
    },
    {
      sectionTitle: "1.10 Our playground",
      sectionTitleVi: "1.5 Sân chơi của chúng ta",
      type: "information",
      text: "Our playground has many things. We have a slide. We slide down. We have a see-saw. We go up and down. We have a climbing frame. We climb up high. We have a sandbox. We build sandcastles. The playground is a busy place. We must be careful. We must not push.",
      textVi: "Sân chơi của chúng ta có rất nhiều thứ. Chúng ta có cầu trượt. Chúng ta trượt xuống. Chúng ta có bập bênh. Chúng ta đi lên và đi xuống. Chúng ta có khung leo trèo. Chúng ta trèo lên cao. Chúng ta có hộp cát. Chúng ta xây lâu đài cát. Sân chơi là một nơi nhộn nhịp. Chúng ta phải cẩn thận. Chúng ta không được xô đẩy."
    },
    {
      sectionTitle: '1.11 How did I do?',
      sectionTitleVi: '1.11 Tôi làm được gì?',
      type: 'self_check',
      text: "Check what you can do!\n\n✅ I can say hello and ask someone's name\n✅ I can name 5 action words (run, jump, hop, skip, walk)\n✅ I can use polite words (please, thank you)\n✅ I can talk about my favourite game\n✅ I can write sentences about my friend\n✅ I know how to share and take turns\n\n⭐ How many did you tick?\n6 = Super friend! 🌟\n4-5 = Great job!\n2-3 = Keep practising!\n1 = Ask for help!",
      textVi: "Kiểm tra bạn làm được gì!\n\n✅ Tôi có thể chào và hỏi tên ai đó\n✅ Tôi biết 5 từ chỉ hành động (chạy, nhảy, nhảy lò cò, nhảy dây, đi bộ)\n✅ Tôi dùng từ lịch sự (làm ơn, cảm ơn)\n✅ Tôi nói được về trò chơi yêu thích\n✅ Tôi viết được câu về bạn của mình\n✅ Tôi biết cách chia sẻ và thay phiên\n\n⭐ Bạn tích được bao nhiêu?\n6 = Siêu bạn bè! 🌟\n4-5 = Giỏi lắm!\n2-3 = Tiếp tục luyện tập!\n1 = Hãy nhờ giúp đỡ!"
    },
    {
      sectionTitle: "1.12 Unit 1 Review",
      sectionTitleVi: "1.6 Ôn tập Bài 1",
      type: "tip",
      text: "Well done! You have finished Unit 1 all about friends and the playground.\n\nLet's review what we learned:\n✓ We learned words about playing: run, jump, swing, ball.\n✓ We learned how to be a good friend: share, take turns, be kind.\n✓ We learned polite words: please, thank you.\n✓ We learned action words (verbs).\n✓ We talked about things in the playground.\n\nKeep practicing! Be a good friend every day!",
      textVi: "Giỏi lắm! Bạn đã học xong Bài 1 về bạn bè và sân chơi.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta học từ về vui chơi: chạy, nhảy, xích đu, bóng.\n✓ Chúng ta học cách làm một người bạn tốt: chia sẻ, thay phiên, tử tế.\n✓ Chúng ta học từ lịch sự: làm ơn, cảm ơn.\n✓ Chúng ta học từ chỉ hành động (động từ).\n✓ Chúng ta đã nói về các đồ vật ở sân chơi.\n\nHãy tiếp tục luyện tập! Hãy là một người bạn tốt mỗi ngày!"
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G1 U02: Making Things
  // ══════════════════════════════════════════════════════════════
  'cam_g1_u02': [
    {
      sectionTitle: '2.1 Getting Started',
      sectionTitleVi: '2.1 Khởi động',
      type: 'getting_started',
      text: "Welcome to Unit 2 — Making Things!\n\n🗣️ Talk with your partner:\n• Have you ever made something? What was it?\n• What do you need to make a paper hat?\n• Do you like cutting, folding, or drawing best?\n\nToday we will learn how to MAKE things — from paper, with glue, and with our hands. We will also learn to follow INSTRUCTIONS step by step.",
      textVi: "Chào mừng đến Bài 2 — Làm đồ vật!\n\n🗣️ Nói chuyện với bạn:\n• Bạn đã bao giờ làm một thứ gì chưa? Đó là gì?\n• Bạn cần gì để làm một chiếc mũ giấy?\n• Bạn thích cắt, gấp, hay vẽ nhất?\n\nHôm nay chúng ta sẽ học cách LÀM đồ vật — từ giấy, với hồ dán, và bằng đôi tay. Chúng ta cũng sẽ học cách làm theo HƯỚNG DẪN từng bước."
    },
    {
      sectionTitle: "2.1 Making things from paper",
      sectionTitleVi: "2.1 Làm đồ vật từ giấy",
      type: "reading",
      text: "We can make many things from paper. We can make a paper hat. We can make a paper boat. We can make a paper aeroplane. What do we need? We need paper. We need scissors. We need glue. We need colors. Let's make something fun together. Making things is creative.",
      textVi: "Chúng ta có thể làm nhiều đồ vật từ giấy. Chúng ta có thể làm một chiếc mũ giấy. Chúng ta có thể làm một chiếc thuyền giấy. Chúng ta có thể làm một chiếc máy bay giấy. Chúng ta cần những gì? Chúng ta cần giấy. Chúng ta cần kéo. Chúng ta cần hồ dán. Chúng ta cần màu. Hãy cùng nhau làm một cái gì đó vui nhộn. Việc làm đồ vật rất sáng tạo."
    },
    {
      sectionTitle: "2.2 Following instructions",
      sectionTitleVi: "2.2 Làm theo hướng dẫn",
      type: "information",
      text: "To make something, we follow instructions. Instructions tell us what to do step by step. We use order words. First, get a piece of paper. Next, fold the paper in half. Then, fold the corners. Finally, open it out. Now you have a hat! Following instructions is important.",
      textVi: "Để làm một cái gì đó, chúng ta làm theo hướng dẫn. Hướng dẫn cho chúng ta biết phải làm gì từng bước một. Chúng ta sử dụng từ chỉ thứ tự. Đầu tiên, lấy một tờ giấy. Tiếp theo, gấp đôi tờ giấy lại. Sau đó, gấp các góc. Cuối cùng, mở nó ra. Bây giờ bạn đã có một chiếc mũ! Việc làm theo hướng dẫn rất quan trọng."
    },
    {
      sectionTitle: "2.3 Shapes around us",
      sectionTitleVi: "2.3 Các hình dạng quanh ta",
      type: "grammar",
      text: "When we make things, we see shapes. A piece of paper is a rectangle. When we fold it, we can make a square. We can make a triangle. A circle is round. A star has points. Look around the room. What shapes can you see? The door is a rectangle. The clock is a circle.",
      textVi: "Khi chúng ta làm đồ vật, chúng ta nhìn thấy các hình dạng. Một tờ giấy là một hình chữ nhật. Khi chúng ta gấp nó, chúng ta có thể tạo ra một hình vuông. Chúng ta có thể tạo ra một hình tam giác. Một hình tròn thì tròn. Một ngôi sao có các điểm nhọn. Hãy nhìn quanh phòng. Bạn có thể thấy những hình dạng gì? Cửa ra vào là một hình chữ nhật. Đồng hồ là một hình tròn."
    },
    {
      sectionTitle: "2.4 The Paper Boat Story",
      sectionTitleVi: "2.4 Câu chuyện chiếc thuyền giấy",
      type: "reading",
      text: "A boy made a paper boat. He painted it red and blue. He took it to the river. He put the boat in the water. The boat floated. It sailed away. Goodbye, little boat! The boy was happy. He watched his boat sail far away. Where is the boat going?",
      textVi: "Một cậu bé làm một chiếc thuyền giấy. Cậu ấy tô nó màu đỏ và xanh lam. Cậu ấy mang nó ra sông. Cậu ấy đặt thuyền xuống nước. Chiếc thuyền nổi. Nó chèo đi. Tạm biệt, chiếc thuyền nhỏ! Cậu bé rất vui. Cậu ấy nhìn chiếc thuyền của mình trôi ra xa. Chiếc thuyền đang đi đâu?"
    },
    {
      sectionTitle: "2.5 Writing a list",
      sectionTitleVi: "2.5 Viết một danh sách",
      type: "information",
      text: "We can write a list of things we need. A list helps us remember. What do we need to make a card? 1. Paper. 2. Crayons. 3. Stickers. 4. A pencil. We write the items one below the other. We can put numbers next to the items. Let's write a shopping list.",
      textVi: "Chúng ta có thể viết một danh sách những thứ chúng ta cần. Một danh sách giúp chúng ta nhớ. Chúng ta cần gì để làm một tấm thiệp? 1. Giấy. 2. Bút màu sáp. 3. Hình dán. 4. Một cây bút chì. Chúng ta viết các mục cái này dưới cái kia. Chúng ta có thể đặt số bên cạnh các mục. Hãy viết một danh sách mua sắm."
    },
    {
      sectionTitle: '2.6 Word Work: Order words and materials',
      sectionTitleVi: '2.6 Luyện từ: Từ chỉ thứ tự và vật liệu',
      type: 'word_work',
      text: "ORDER WORDS tell us the steps to follow:\nfirst — next — then — after that — finally\n\nMATERIALS — things we use to make stuff:\npaper, card, scissors, glue, tape, string, paint, crayons, stickers\n\nSHAPES we see when making things:\nsquare, rectangle, triangle, circle, star, diamond\n\n✏️ Put in order:\n___, fold the paper. (First)\n___, cut the shape. (Next)\n___, glue the edges. (Then)\n___, decorate it! (Finally)\n\n🌟 Challenge: Can you spell S-C-I-S-S-O-R-S?",
      textVi: "TỪ CHỈ THỨ TỰ cho ta biết các bước phải làm:\nđầu tiên — tiếp theo — sau đó — sau đó nữa — cuối cùng\n\nVẬT LIỆU — những thứ chúng ta dùng:\ngiấy, bìa cứng, kéo, hồ dán, băng dính, dây, sơn, bút màu, hình dán\n\nHÌNH DẠNG ta thấy khi làm đồ:\nvuông, chữ nhật, tam giác, tròn, sao, kim cương\n\n✏️ Sắp xếp thứ tự:\n___, gấp giấy. (Đầu tiên)\n___, cắt hình. (Tiếp theo)\n___, dán các cạnh. (Sau đó)\n___, trang trí! (Cuối cùng)\n\n🌟 Thử thách: Bạn có thể đánh vần S-C-I-S-S-O-R-S không?"
    },
    {
      sectionTitle: '2.7 Comprehension',
      sectionTitleVi: '2.7 Đọc hiểu',
      type: 'comprehension',
      text: "Let's check what you learned!\n\n❓ Questions:\n1. Name THREE things you can make from paper. (hat, boat, aeroplane)\n2. What are the four order words? (first, next, then, finally)\n3. What shape is a piece of paper? (rectangle)\n4. In the story, what colour was the paper boat? (red and blue)\n5. Why do we write a list? (to help us remember)\n\n🤔 Think deeper:\n• Why is it important to follow instructions IN ORDER?\n• What would happen if you glued before you cut?",
      textVi: "Hãy kiểm tra bạn học được gì!\n\n❓ Câu hỏi:\n1. Kể BA thứ có thể làm từ giấy. (mũ, thuyền, máy bay)\n2. Bốn từ chỉ thứ tự là gì? (đầu tiên, tiếp theo, sau đó, cuối cùng)\n3. Tờ giấy có hình gì? (chữ nhật)\n4. Trong câu chuyện, chiếc thuyền giấy màu gì? (đỏ và xanh)\n5. Tại sao chúng ta viết danh sách? (để giúp nhớ)\n\n🤔 Suy nghĩ sâu hơn:\n• Tại sao làm theo hướng dẫn THEO THỨ TỰ lại quan trọng?\n• Điều gì xảy ra nếu dán trước khi cắt?"
    },
    {
      sectionTitle: '2.8 Talk About: What I made',
      sectionTitleVi: '2.8 Nói về: Thứ tôi đã làm',
      type: 'talk_about',
      text: "🗣️ Speaking Activity — Show and Tell!\n\n1. Think of something you have made (at school or home).\n2. Tell your partner:\n   • What did you make?\n   • What did you use? (paper, glue, paint...)\n   • How did you make it? Use order words!\n3. Show your work if you have it.\n\n👂 Listening: Ask your partner ONE question about what they made.",
      textVi: "🗣️ Hoạt động Nói — Trình bày và Kể!\n\n1. Nghĩ về thứ gì đó bạn đã làm (ở trường hoặc ở nhà).\n2. Kể cho bạn nghe:\n   • Bạn đã làm gì?\n   • Bạn dùng gì? (giấy, hồ dán, sơn...)\n   • Bạn làm như thế nào? Dùng từ chỉ thứ tự!\n3. Cho bạn xem nếu có.\n\n👂 Lắng nghe: Hỏi bạn MỘT câu về thứ họ đã làm."
    },
    {
      sectionTitle: '2.9 Writing: Instructions',
      sectionTitleVi: '2.9 Viết: Hướng dẫn',
      type: 'writing',
      text: "✏️ Write instructions to make a paper fan!\n\nYou will need: paper, crayons\n\nSteps:\n1. First, get a piece of paper.\n2. Next, colour both sides with crayons.\n3. Then, fold the paper back and forth like a zigzag.\n4. Finally, hold one end and fan yourself!\n\n📝 Now YOUR turn! Write instructions to make something YOU like. Use:\nFirst, ___\nNext, ___\nThen, ___\nFinally, ___\n\n🌟 Remember: number your steps!",
      textVi: "✏️ Viết hướng dẫn làm quạt giấy!\n\nBạn cần: giấy, bút màu\n\nCác bước:\n1. Đầu tiên, lấy một tờ giấy.\n2. Tiếp theo, tô màu cả hai mặt.\n3. Sau đó, gấp giấy qua lại như hình chữ chi.\n4. Cuối cùng, cầm một đầu và quạt!\n\n📝 Giờ đến LƯỢT BẠN! Viết hướng dẫn làm thứ BẠN thích. Dùng:\nĐầu tiên, ___\nTiếp theo, ___\nSau đó, ___\nCuối cùng, ___\n\n🌟 Nhớ: đánh số các bước!"
    },
    {
      sectionTitle: '2.10 How did I do?',
      sectionTitleVi: '2.10 Tôi làm được gì?',
      type: 'self_check',
      text: "Check what you can do!\n\n✅ I can name materials: paper, scissors, glue, tape\n✅ I can use order words: first, next, then, finally\n✅ I can name shapes: square, triangle, circle, rectangle\n✅ I can follow instructions step by step\n✅ I can write my own instructions\n✅ I can write a list of things I need\n\n⭐ How many did you tick?\n6 = Super maker! 🌟\n4-5 = Great work!\n2-3 = Keep trying!\n1 = Ask for help!",
      textVi: "Kiểm tra bạn làm được gì!\n\n✅ Tôi kể được tên vật liệu: giấy, kéo, hồ dán, băng dính\n✅ Tôi dùng được từ chỉ thứ tự: đầu tiên, tiếp theo, sau đó, cuối cùng\n✅ Tôi gọi được tên hình: vuông, tam giác, tròn, chữ nhật\n✅ Tôi làm theo hướng dẫn từng bước\n✅ Tôi viết được hướng dẫn của riêng mình\n✅ Tôi viết được danh sách những thứ cần\n\n⭐ Bạn tích được bao nhiêu?\n6 = Siêu thợ thủ công! 🌟\n4-5 = Giỏi lắm!\n2-3 = Cố lên!\n1 = Hãy nhờ giúp đỡ!"
    },
    {
      sectionTitle: "2.6 Unit 2 Review",
      sectionTitleVi: "2.6 Ôn tập Bài 2",
      type: "tip",
      text: "Great job! You have finished Unit 2 all about making things.\n\nLet's review what we learned:\n✓ We learned words about materials and actions: paper, fold, cut, glue.\n✓ We learned about shapes: square, triangle, rectangle, circle.\n✓ We learned order words: first, next, then, finally.\n✓ We read instructions on how to make things.\n✓ We learned how to write a list.\n\nKeep practicing! Try making something new today!",
      textVi: "Làm tốt lắm! Bạn đã học xong Bài 2 về làm đồ vật.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta học từ về vật liệu và hành động: giấy, gấp, cắt, hồ dán.\n✓ Chúng ta học về hình dạng: hình vuông, hình tam giác, hình chữ nhật, hình tròn.\n✓ Chúng ta học từ chỉ thứ tự: đầu tiên, tiếp theo, sau đó, cuối cùng.\n✓ Chúng ta đọc hướng dẫn cách làm đồ vật.\n✓ Chúng ta đã học cách viết một danh sách.\n\nHãy tiếp tục luyện tập! Thử làm một thứ gì đó mới hôm nay!"
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G1 U04: Traditional Tales
  // ══════════════════════════════════════════════════════════════
  'cam_g1_u04': [
    {
      sectionTitle: '4.1 Getting Started',
      sectionTitleVi: '4.1 Khởi động',
      type: 'getting_started',
      text: "Welcome to Unit 4 — Traditional Tales!\n\n🗣️ Talk with your partner:\n• Do you know any fairy tales or old stories?\n• Who are the characters in your favourite story?\n• Do stories always end happily?\n\nTraditional tales are stories told again and again for many years. They often start with 'Once upon a time...' Today we will read a famous tale and learn about characters, settings, and teamwork.",
      textVi: "Chào mừng đến Bài 4 — Truyện cổ tích!\n\n🗣️ Nói chuyện với bạn:\n• Bạn có biết câu chuyện cổ tích nào không?\n• Nhân vật trong truyện yêu thích của bạn là ai?\n• Truyện có luôn kết thúc vui vẻ không?\n\nTruyện cổ tích là những câu chuyện được kể đi kể lại qua nhiều năm. Chúng thường bắt đầu bằng 'Ngày xửa ngày xưa...' Hôm nay chúng ta sẽ đọc một câu chuyện nổi tiếng và học về nhân vật, bối cảnh, và tinh thần đồng đội."
    },
    {
      sectionTitle: "4.2 The Enormous Turnip",
      sectionTitleVi: "4.1 Củ cải khổng lồ",
      type: "reading",
      text: "Once upon a time, an old man planted a turnip. The turnip grew and grew. It was enormous! The old man pulled and pulled, but he could not pull it up. He called the old woman. They pulled and pulled, but they could not pull it up. They called a boy. They pulled and pulled. Pop! The enormous turnip came out.",
      textVi: "Ngày xửa ngày xưa, có một ông lão trồng một củ cải. Củ cải lớn dần, lớn dần. Nó trở nên khổng lồ! Ông lão kéo mãi, kéo mãi nhưng không thể nhổ nó lên. Ông gọi bà lão. Họ cùng nhau kéo mãi, kéo mãi nhưng không thể nhổ nó lên. Họ gọi một cậu bé. Họ cùng nhau kéo. Bụp! Củ cải khổng lồ đã được nhổ lên."
    },
    {
      sectionTitle: "4.2 Characters in the story",
      sectionTitleVi: "4.2 Các nhân vật trong truyện",
      type: "information",
      text: "Stories have characters. Characters are the people or animals in a story. In The Enormous Turnip, the characters are the old man, the old woman, and the boy. The characters worked together. They helped each other. Who is your favorite character? I like the old man because he planted the turnip.",
      textVi: "Những câu chuyện có các nhân vật. Nhân vật là con người hoặc động vật trong một câu chuyện. Trong truyện Củ cải khổng lồ, các nhân vật là ông lão, bà lão và cậu bé. Các nhân vật đã làm việc cùng nhau. Họ đã giúp đỡ lẫn nhau. Nhân vật yêu thích của bạn là ai? Mình thích ông lão vì ông đã trồng củ cải."
    },
    {
      sectionTitle: "4.3 Story settings",
      sectionTitleVi: "4.3 Bối cảnh câu chuyện",
      type: "grammar",
      text: "A setting is where a story takes place. A story can happen in a garden, in a forest, or in a castle. The Enormous Turnip takes place in a garden. The old man planted the turnip in the soil. Where does your favorite story take place? My favorite story takes place in a magical forest.",
      textVi: "Bối cảnh là nơi câu chuyện diễn ra. Một câu chuyện có thể xảy ra trong một khu vườn, trong một khu rừng, hoặc trong một lâu đài. Củ cải khổng lồ diễn ra trong một khu vườn. Ông lão đã trồng củ cải trong đất. Câu chuyện yêu thích của bạn diễn ra ở đâu? Câu chuyện yêu thích của mình diễn ra trong một khu rừng phép thuật."
    },
    {
      sectionTitle: "4.4 Retelling the story",
      sectionTitleVi: "4.4 Kể lại câu chuyện",
      type: "reading",
      text: "We can retell a story using our own words. First, the old man planted a turnip. Next, the turnip became enormous. Then, the old man and the old woman tried to pull it up. Finally, they called a boy, and they pulled it up together. They made a big pot of turnip soup.",
      textVi: "Chúng ta có thể kể lại một câu chuyện bằng lời của mình. Đầu tiên, ông lão trồng một củ cải. Tiếp theo, củ cải trở nên khổng lồ. Sau đó, ông lão và bà lão đã cố gắng nhổ nó lên. Cuối cùng, họ gọi một cậu bé, và họ cùng nhau nhổ nó lên. Họ đã nấu một nồi súp củ cải lớn."
    },
    {
      sectionTitle: "4.5 Teamwork",
      sectionTitleVi: "4.5 Làm việc nhóm",
      type: "information",
      text: "The story is about teamwork. The old man could not do it alone. The old woman could not do it alone. They needed help. When we work together, we can do hard things. We can be strong together. Teamwork makes the dream work. Who helps you when things are hard?",
      textVi: "Câu chuyện nói về tinh thần làm việc nhóm. Ông lão không thể làm điều đó một mình. Bà lão không thể làm điều đó một mình. Họ cần sự giúp đỡ. Khi chúng ta làm việc cùng nhau, chúng ta có thể làm được những việc khó khăn. Chúng ta có thể mạnh mẽ cùng nhau. Làm việc nhóm tạo nên thành công. Ai giúp đỡ bạn khi mọi việc trở nên khó khăn?"
    },
    {
      sectionTitle: '4.7 Word Work: Story language',
      sectionTitleVi: '4.7 Luyện từ: Ngôn ngữ kể chuyện',
      type: 'word_work',
      text: "Stories use special words and phrases:\n\n📖 STORY OPENERS: Once upon a time... / Long, long ago... / One day...\n📖 STORY ENDINGS: ...and they lived happily ever after. / The end.\n📖 CHARACTER WORDS: old, young, kind, brave, clever, silly\n📖 ACTION WORDS: pulled, pushed, called, helped, grew, planted\n\n✏️ Match the word to the meaning:\n1. enormous = very ___ (big)\n2. pulled = moved something ___ you (towards)\n3. planted = put a seed in the ___ (ground)\n\n🌟 Challenge: Tell a story using 'Once upon a time' and 'The end'!",
      textVi: "Truyện dùng những từ và cụm từ đặc biệt:\n\n📖 MỞ ĐẦU: Ngày xửa ngày xưa... / Từ rất lâu rồi... / Một ngày nọ...\n📖 KẾT THÚC: ...và họ sống hạnh phúc mãi mãi. / Hết.\n📖 TỪ NHÂN VẬT: già, trẻ, tốt bụng, dũng cảm, thông minh, ngốc nghếch\n📖 TỪ HÀNH ĐỘNG: kéo, đẩy, gọi, giúp, lớn lên, trồng\n\n✏️ Nối từ với nghĩa:\n1. enormous = rất ___ (lớn)\n2. pulled = kéo cái gì đó ___ phía mình (về)\n3. planted = đặt hạt vào ___ (đất)\n\n🌟 Thử thách: Kể chuyện dùng 'Ngày xửa ngày xưa' và 'Hết'!"
    },
    {
      sectionTitle: '4.8 Comprehension',
      sectionTitleVi: '4.8 Đọc hiểu',
      type: 'comprehension',
      text: "Let's check what you remember!\n\n❓ Questions:\n1. Who planted the turnip? (the old man)\n2. Why couldn't the old man pull it up alone? (it was too big)\n3. Who helped him? (the old woman, then the boy)\n4. Where does the story take place? (in a garden)\n5. What is the lesson of this story? (teamwork — working together)\n\n🤔 Think deeper:\n• Could the old man have done it alone? Why not?\n• What other stories do you know about working together?",
      textVi: "Hãy kiểm tra bạn nhớ được gì!\n\n❓ Câu hỏi:\n1. Ai trồng củ cải? (ông lão)\n2. Tại sao ông lão không thể tự nhổ? (nó quá to)\n3. Ai giúp ông? (bà lão, rồi cậu bé)\n4. Câu chuyện diễn ra ở đâu? (trong vườn)\n5. Bài học của câu chuyện là gì? (đồng đội — làm việc cùng nhau)\n\n🤔 Suy nghĩ sâu hơn:\n• Ông lão có thể tự làm một mình không? Tại sao?\n• Bạn biết câu chuyện nào khác về làm việc cùng nhau?"
    },
    {
      sectionTitle: '4.9 Talk About: My favourite tale',
      sectionTitleVi: '4.9 Nói về: Truyện yêu thích',
      type: 'talk_about',
      text: "🗣️ Speaking Activity — Retell a story!\n\n1. Pick a traditional tale you know well.\n2. Tell your partner the story using these words:\n   First, ... Next, ... Then, ... Finally, ...\n3. Use a different VOICE for each character!\n4. Your partner listens, then asks one question.\n\n🎭 Act it out! Can you and your partner act out The Enormous Turnip? One person pulls, the next joins in!\n\n👂 Listening: Who told the best story? Vote as a class!",
      textVi: "🗣️ Hoạt động Nói — Kể lại câu chuyện!\n\n1. Chọn một truyện cổ bạn biết rõ.\n2. Kể cho bạn nghe dùng các từ:\n   Đầu tiên, ... Tiếp theo, ... Sau đó, ... Cuối cùng, ...\n3. Dùng GIỌNG khác nhau cho mỗi nhân vật!\n4. Bạn lắng nghe, rồi hỏi một câu hỏi.\n\n🎭 Diễn kịch! Bạn và bạn có thể diễn Củ cải khổng lồ không? Một người kéo, người tiếp theo nối vào!\n\n👂 Lắng nghe: Ai kể chuyện hay nhất? Bình chọn cả lớp!"
    },
    {
      sectionTitle: '4.10 Writing: My own tale',
      sectionTitleVi: '4.10 Viết: Truyện của tôi',
      type: 'writing',
      text: "✏️ Write your own traditional tale!\n\nUse this plan:\n1. Start: Once upon a time, there was a ___. (character)\n2. Setting: He/She lived in a ___. (place)\n3. Problem: One day, ___ happened.\n4. Help: He/She asked ___ for help.\n5. Ending: Finally, they ___ together. The end!\n\n📝 Example:\nOnce upon a time, there was a little cat. She lived in a cosy house. One day, she lost her ball. She asked the dog for help. Finally, they found it together. The end!\n\n🌟 Draw a picture for your story!",
      textVi: "✏️ Viết truyện cổ tích của riêng bạn!\n\nDùng kế hoạch này:\n1. Mở đầu: Ngày xửa ngày xưa, có một ___. (nhân vật)\n2. Bối cảnh: Anh/Cô ấy sống ở ___. (nơi chốn)\n3. Vấn đề: Một ngày, ___ xảy ra.\n4. Giúp đỡ: Anh/Cô ấy nhờ ___ giúp.\n5. Kết thúc: Cuối cùng, họ ___ cùng nhau. Hết!\n\n📝 Ví dụ:\nNgày xửa ngày xưa, có một chú mèo nhỏ. Cô ấy sống trong một ngôi nhà ấm cúng. Một ngày, cô ấy mất quả bóng. Cô ấy nhờ chú chó giúp. Cuối cùng, họ tìm thấy nó cùng nhau. Hết!\n\n🌟 Vẽ tranh cho câu chuyện của bạn!"
    },
    {
      sectionTitle: '4.11 How did I do?',
      sectionTitleVi: '4.11 Tôi làm được gì?',
      type: 'self_check',
      text: "Check what you can do!\n\n✅ I can name the characters in a story\n✅ I can describe where a story takes place (setting)\n✅ I can retell a story using First, Next, Then, Finally\n✅ I know what 'Once upon a time' means\n✅ I can write a short story with a beginning, middle, and end\n✅ I understand why teamwork is important\n\n⭐ How many did you tick?\n6 = Super storyteller! 🌟\n4-5 = Great work!\n2-3 = Keep reading stories!\n1 = Ask for help!",
      textVi: "Kiểm tra bạn làm được gì!\n\n✅ Tôi gọi được tên các nhân vật trong truyện\n✅ Tôi mô tả được nơi câu chuyện diễn ra (bối cảnh)\n✅ Tôi kể lại được truyện dùng Đầu tiên, Tiếp theo, Sau đó, Cuối cùng\n✅ Tôi biết 'Ngày xửa ngày xưa' nghĩa là gì\n✅ Tôi viết được truyện ngắn có mở đầu, giữa và kết thúc\n✅ Tôi hiểu tại sao làm việc nhóm quan trọng\n\n⭐ Bạn tích được bao nhiêu?\n6 = Siêu kể chuyện! 🌟\n4-5 = Giỏi lắm!\n2-3 = Đọc thêm truyện nhé!\n1 = Hãy nhờ giúp đỡ!"
    },
    {
      sectionTitle: "4.12 Unit 4 Review",
      sectionTitleVi: "4.6 Ôn tập Bài 4",
      type: "tip",
      text: "Fantastic! You have finished Unit 4 all about traditional tales.\n\nLet's review what we learned:\n✓ We learned about story characters: old man, old woman, boy.\n✓ We learned about the setting of a story.\n✓ We practiced retelling a story with First, Next, Then, Finally.\n✓ We learned that teamwork is important.\n\nKeep reading stories! Try to find the characters and the setting in every story you read.",
      textVi: "Tuyệt vời! Bạn đã học xong Bài 4 về những câu chuyện cổ tích.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta học về các nhân vật trong truyện: ông lão, bà lão, cậu bé.\n✓ Chúng ta học về bối cảnh của một câu chuyện.\n✓ Chúng ta thực hành kể lại một câu chuyện với Đầu tiên, Tiếp theo, Sau đó, Cuối cùng.\n✓ Chúng ta học được rằng làm việc nhóm rất quan trọng.\n\nHãy tiếp tục đọc truyện! Cố gắng tìm ra các nhân vật và bối cảnh trong mỗi câu chuyện bạn đọc."
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G1 U05: Animals & Information
  // ══════════════════════════════════════════════════════════════
  'cam_g1_u05': [
    {
      sectionTitle: '5.1 Getting Started',
      sectionTitleVi: '5.1 Khởi động',
      type: 'getting_started',
      text: "Welcome to Unit 5 — Animals!\n\n🗣️ Talk with your partner:\n• What is your favourite animal? Why?\n• Can you name 5 animals?\n• What can animals do that people cannot?\n\nIn this unit we will learn amazing FACTS about animals. We will find out about their bodies, where they live, and what they eat. We will also learn to write INFORMATION texts — writing that tells us true facts.",
      textVi: "Chào mừng đến Bài 5 — Động vật!\n\n🗣️ Nói chuyện với bạn:\n• Động vật yêu thích của bạn là gì? Tại sao?\n• Bạn có thể kể tên 5 loài động vật không?\n• Động vật làm được gì mà con người không thể?\n\nTrong bài này chúng ta sẽ học những SỰ THẬT tuyệt vời về động vật. Chúng ta sẽ tìm hiểu về cơ thể, nơi sống, và thức ăn của chúng. Chúng ta cũng sẽ học viết văn bản THÔNG TIN — bài viết cho ta biết sự thật."
    },
    {
      sectionTitle: "5.2 Animal facts",
      sectionTitleVi: "5.1 Sự thật về động vật",
      type: "reading",
      text: "An elephant is a big animal. It has a long trunk. It has big ears. A mouse is a small animal. It has a long tail. It has small ears. Elephants cannot jump. Mice can run very fast. Birds can fly in the sky. Fish can swim in the water. Every animal is different.",
      textVi: "Voi là một loài động vật lớn. Nó có một cái vòi dài. Nó có đôi tai to. Chuột là một loài động vật nhỏ. Nó có một cái đuôi dài. Nó có đôi tai nhỏ. Voi không thể nhảy. Chuột có thể chạy rất nhanh. Chim có thể bay trên bầu trời. Cá có thể bơi dưới nước. Mỗi loài động vật đều khác nhau."
    },
    {
      sectionTitle: "5.2 Body parts of animals",
      sectionTitleVi: "5.2 Các bộ phận cơ thể của động vật",
      type: "information",
      text: "Animals have different body parts. Birds have wings to fly. Fish have fins to swim. Elephants have trunks to drink water. Monkeys have long tails to swing on trees. Cats have sharp claws. What body parts do dogs have? Dogs have four legs and a tail.",
      textVi: "Động vật có các bộ phận cơ thể khác nhau. Chim có cánh để bay. Cá có vây để bơi. Voi có vòi để uống nước. Khỉ có đuôi dài để đu trên cây. Mèo có móng vuốt sắc nhọn. Chó có những bộ phận cơ thể nào? Chó có bốn chân và một cái đuôi."
    },
    {
      sectionTitle: "5.3 Describing animals",
      sectionTitleVi: "5.3 Miêu tả động vật",
      type: "grammar",
      text: "We use describing words to talk about animals. Big, small, long, short, fast, slow. A giraffe is tall. A turtle is slow. A cheetah is fast. The snake is long. The bug is small. How would you describe a lion? A lion is big and strong.",
      textVi: "Chúng ta sử dụng các từ miêu tả để nói về động vật. To, nhỏ, dài, ngắn, nhanh, chậm. Hươu cao cổ thì cao. Rùa thì chậm. Báo đốm thì nhanh. Con rắn thì dài. Con bọ thì nhỏ. Bạn sẽ miêu tả một con sư tử như thế nào? Một con sư tử thì to và khỏe."
    },
    {
      sectionTitle: "5.4 Where do they live?",
      sectionTitleVi: "5.4 Chúng sống ở đâu?",
      type: "reading",
      text: "Different animals live in different places. Camels live in the desert. It is hot and dry. Penguins live in the ice. It is very cold. Monkeys live in the jungle. There are many trees. Frogs live near the pond. Where do you live? I live in a house.",
      textVi: "Các loài động vật khác nhau sống ở những nơi khác nhau. Lạc đà sống ở sa mạc. Ở đó nóng và khô. Chim cánh cụt sống trên băng. Ở đó rất lạnh. Khỉ sống trong rừng rậm. Có rất nhiều cây cối. Ếch sống gần ao. Bạn sống ở đâu? Mình sống trong một ngôi nhà."
    },
    {
      sectionTitle: "5.5 Writing an information text",
      sectionTitleVi: "5.5 Viết một đoạn văn thông tin",
      type: "information",
      text: "An information text tells us true facts. To write about an animal, we can write: 1. Its name. 2. What it looks like. 3. Where it lives. 4. What it eats. For example: This is a tiger. It is orange with black stripes. It lives in the jungle. It eats meat.",
      textVi: "Một đoạn văn thông tin cho chúng ta biết những sự thật. Để viết về một loài động vật, chúng ta có thể viết: 1. Tên của nó. 2. Trông nó như thế nào. 3. Nó sống ở đâu. 4. Nó ăn gì. Ví dụ: Đây là một con hổ. Nó có màu cam với những sọc đen. Nó sống trong rừng rậm. Nó ăn thịt."
    },
    {
      sectionTitle: '5.7 Word Work: Describing words',
      sectionTitleVi: '5.7 Luyện từ: Từ miêu tả',
      type: 'word_work',
      text: "ADJECTIVES are describing words. They tell us about size, colour, speed, and more.\n\n🐾 SIZE: big, small, tiny, enormous, tall, short\n🎨 COLOUR: brown, grey, orange, black, white, spotted, striped\n🏃 SPEED: fast, slow, quick\n🔊 SOUND: loud, quiet, noisy\n\n✏️ Describe these animals:\n1. A tiger is ___ with ___ stripes. (orange, black)\n2. A mouse is ___ and ___. (small, quick)\n3. An elephant is ___ and ___. (big, grey)\n\n🌟 Challenge: Use TWO adjectives to describe YOUR favourite animal!",
      textVi: "TÍNH TỪ là từ miêu tả. Chúng cho biết về kích thước, màu sắc, tốc độ...\n\n🐾 KÍCH THƯỚC: to, nhỏ, tí hon, khổng lồ, cao, thấp\n🎨 MÀU SẮC: nâu, xám, cam, đen, trắng, đốm, sọc\n🏃 TỐC ĐỘ: nhanh, chậm, mau lẹ\n🔊 ÂM THANH: to, nhỏ, ồn ào\n\n✏️ Miêu tả các con vật này:\n1. Con hổ có màu ___ với sọc ___. (cam, đen)\n2. Con chuột thì ___ và ___. (nhỏ, nhanh)\n3. Con voi thì ___ và ___. (to, xám)\n\n🌟 Thử thách: Dùng HAI tính từ để miêu tả con vật YÊU THÍCH của bạn!"
    },
    {
      sectionTitle: '5.8 Comprehension',
      sectionTitleVi: '5.8 Đọc hiểu',
      type: 'comprehension',
      text: "Let's check what you learned!\n\n❓ Questions:\n1. Name an animal that can fly. (bird)\n2. What body part does an elephant use to drink? (trunk)\n3. Where do penguins live? (on the ice / cold places)\n4. Is a cheetah fast or slow? (fast)\n5. What four things do we write in an information text about an animal? (name, looks, habitat, food)\n\n🤔 Think deeper:\n• Why do different animals live in different places?\n• How is writing facts different from writing a story?",
      textVi: "Hãy kiểm tra bạn học được gì!\n\n❓ Câu hỏi:\n1. Kể tên một con vật biết bay. (chim)\n2. Voi dùng bộ phận nào để uống nước? (vòi)\n3. Chim cánh cụt sống ở đâu? (trên băng / nơi lạnh)\n4. Báo đốm nhanh hay chậm? (nhanh)\n5. Bốn điều gì ta viết trong văn bản thông tin về động vật? (tên, hình dáng, nơi sống, thức ăn)\n\n🤔 Suy nghĩ sâu hơn:\n• Tại sao các loài vật khác nhau sống ở nơi khác nhau?\n• Viết sự thật khác gì so với viết truyện?"
    },
    {
      sectionTitle: '5.9 Talk About: Animal quiz',
      sectionTitleVi: '5.9 Nói về: Đố vui động vật',
      type: 'talk_about',
      text: "🗣️ Speaking Activity — Animal Guessing Game!\n\n1. Think of an animal. Do NOT say its name.\n2. Give 3 clues to your partner:\n   • It is ___ (size/colour)\n   • It lives in ___ (habitat)\n   • It can ___ (action)\n3. Your partner guesses the animal!\n\n🎯 Example:\nIt is big and grey. It lives in Africa. It has a long trunk. What is it? (Elephant!)\n\n👂 Listening: Listen carefully to the clues before guessing.",
      textVi: "🗣️ Hoạt động Nói — Trò đoán động vật!\n\n1. Nghĩ về một con vật. KHÔNG nói tên nó.\n2. Cho bạn 3 gợi ý:\n   • Nó ___ (kích thước/màu sắc)\n   • Nó sống ở ___ (nơi sống)\n   • Nó có thể ___ (hành động)\n3. Bạn đoán con vật!\n\n🎯 Ví dụ:\nNó to và xám. Nó sống ở Châu Phi. Nó có vòi dài. Đó là gì? (Voi!)\n\n👂 Lắng nghe: Nghe kỹ gợi ý trước khi đoán."
    },
    {
      sectionTitle: '5.10 Writing: My animal fact file',
      sectionTitleVi: '5.10 Viết: Hồ sơ động vật',
      type: 'writing',
      text: "✏️ Write a fact file about an animal!\n\nChoose an animal and write:\n🏷️ Name: ___\n👀 What it looks like: It is ___ and ___.\n🏠 Where it lives: It lives in ___.\n🍽️ What it eats: It eats ___.\n⭐ Special fact: It can ___.\n\n📝 Example — Cat:\n🏷️ Name: Cat\n👀 It is small and fluffy.\n🏠 It lives in houses with people.\n🍽️ It eats fish and cat food.\n⭐ It can climb trees and see in the dark.\n\n🌟 Draw a picture of your animal!",
      textVi: "✏️ Viết hồ sơ thông tin về một con vật!\n\nChọn một con vật và viết:\n🏷️ Tên: ___\n👀 Trông như thế nào: Nó ___ và ___.\n🏠 Sống ở đâu: Nó sống ở ___.\n🍽️ Ăn gì: Nó ăn ___.\n⭐ Sự thật đặc biệt: Nó có thể ___.\n\n📝 Ví dụ — Mèo:\n🏷️ Tên: Mèo\n👀 Nó nhỏ và mềm mại.\n🏠 Nó sống trong nhà với người.\n🍽️ Nó ăn cá và thức ăn cho mèo.\n⭐ Nó có thể leo cây và nhìn trong bóng tối.\n\n🌟 Vẽ tranh con vật của bạn!"
    },
    {
      sectionTitle: '5.11 How did I do?',
      sectionTitleVi: '5.11 Tôi làm được gì?',
      type: 'self_check',
      text: "Check what you can do!\n\n✅ I can name 10 animals and their body parts\n✅ I can use describing words (big, small, fast, slow)\n✅ I can say where different animals live\n✅ I can play the animal guessing game\n✅ I can write an animal fact file\n✅ I know the difference between a fact and a story\n\n⭐ How many did you tick?\n6 = Animal expert! 🌟\n4-5 = Great work!\n2-3 = Keep learning!\n1 = Ask for help!",
      textVi: "Kiểm tra bạn làm được gì!\n\n✅ Tôi kể được 10 loài vật và bộ phận cơ thể\n✅ Tôi dùng được từ miêu tả (to, nhỏ, nhanh, chậm)\n✅ Tôi nói được nơi sống của các loài vật\n✅ Tôi chơi được trò đoán động vật\n✅ Tôi viết được hồ sơ thông tin động vật\n✅ Tôi biết sự khác nhau giữa sự thật và truyện\n\n⭐ Bạn tích được bao nhiêu?\n6 = Chuyên gia động vật! 🌟\n4-5 = Giỏi lắm!\n2-3 = Tiếp tục học!\n1 = Hãy nhờ giúp đỡ!"
    },
    {
      sectionTitle: "5.12 Unit 5 Review",
      sectionTitleVi: "5.6 Ôn tập Bài 5",
      type: "tip",
      text: "Excellent! You have finished Unit 5 all about animals and information.\n\nLet's review what we learned:\n✓ We learned animal names: elephant, mouse, bird, fish.\n✓ We learned about animal body parts: trunk, tail, wings.\n✓ We used describing words: big, small, fast, slow.\n✓ We learned where different animals live.\n✓ We practiced writing true facts about animals.\n\nKeep exploring! You can learn more facts from books about animals.",
      textVi: "Tuyệt vời! Bạn đã học xong Bài 5 về động vật và thông tin.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta học tên các loài động vật: voi, chuột, chim, cá.\n✓ Chúng ta học về các bộ phận cơ thể động vật: vòi, đuôi, cánh.\n✓ Chúng ta sử dụng các từ miêu tả: to, nhỏ, nhanh, chậm.\n✓ Chúng ta học nơi sống của các loài động vật khác nhau.\n✓ Chúng ta thực hành viết các sự thật về động vật.\n\nHãy tiếp tục khám phá! Bạn có thể tìm hiểu thêm nhiều sự thật từ sách về động vật."
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G1 U06: Nursery Rhymes
  // ══════════════════════════════════════════════════════════════
  'cam_g1_u06': [
    {
      sectionTitle: "6.1 Jack and Jill",
      sectionTitleVi: "6.1 Jack và Jill",
      type: "reading",
      text: "Jack and Jill went up the hill, to fetch a pail of water. Jack fell down and broke his crown, and Jill came tumbling after. Up Jack got, and home did trot, as fast as he could caper. To old Dame Dob, who patched his nob, with vinegar and brown paper.",
      textVi: "Jack và Jill đi lên đồi, để xách một thùng nước. Jack ngã xuống và vỡ đầu, và Jill lộn nhào theo sau. Jack đứng dậy, và chạy nước kiệu về nhà, nhanh nhất có thể. Đến gặp bà lão Dob, người đã đắp đầu cho cậu, bằng giấm và giấy nâu."
    },
    {
      sectionTitle: "6.2 Rhythm and rhyme",
      sectionTitleVi: "6.2 Nhịp điệu và vần",
      type: "information",
      text: "Nursery rhymes have rhythm. Rhythm is like the beat of a drum. We can clap our hands to the rhythm. Clap, clap, clap. Rhymes also have words that sound the same at the end. Hill and Jill rhyme. Down and crown rhyme. Can you clap the rhythm of a rhyme?",
      textVi: "Các bài đồng dao có nhịp điệu. Nhịp điệu giống như nhịp trống. Chúng ta có thể vỗ tay theo nhịp điệu. Vỗ, vỗ, vỗ. Các bài đồng dao cũng có những từ phát âm giống nhau ở phần cuối. Hill và Jill có vần với nhau. Down và crown có vần với nhau. Bạn có thể vỗ tay theo nhịp điệu của một bài đồng dao không?"
    },
    {
      sectionTitle: "6.3 Old words",
      sectionTitleVi: "6.3 Từ ngữ cổ",
      type: "grammar",
      text: "Some nursery rhymes use old words. A 'pail' is an old word for a bucket. A 'crown' can mean a hat, but here it means the top of Jack's head. 'Tumbling' means falling down. 'To fetch' means to go and get something. We learn new words from old rhymes.",
      textVi: "Một số bài đồng dao sử dụng từ ngữ cổ. 'Pail' (thùng) là một từ cổ chỉ một cái xô. 'Crown' (vương miện) có thể có nghĩa là một cái mũ, nhưng ở đây nó có nghĩa là đỉnh đầu của Jack. 'Tumbling' (lộn nhào) có nghĩa là ngã xuống. 'To fetch' (lấy) có nghĩa là đi và lấy một cái gì đó. Chúng ta học từ mới từ những bài đồng dao cổ."
    },
    {
      sectionTitle: "6.4 Hickory Dickory Dock",
      sectionTitleVi: "6.4 Hickory Dickory Dock",
      type: "reading",
      text: "Hickory, dickory, dock. The mouse ran up the clock. The clock struck one, the mouse ran down. Hickory, dickory, dock. This rhyme is about a mouse. The mouse ran up a tall clock. When the clock made a loud sound, the mouse was scared and ran down.",
      textVi: "Hickory, dickory, dock. Con chuột chạy lên chiếc đồng hồ. Đồng hồ điểm một giờ, con chuột chạy xuống. Hickory, dickory, dock. Bài đồng dao này nói về một con chuột. Con chuột chạy lên một chiếc đồng hồ cao. Khi đồng hồ phát ra âm thanh lớn, con chuột sợ hãi và chạy xuống."
    },
    {
      sectionTitle: "6.5 Singing together",
      sectionTitleVi: "6.5 Cùng nhau hát",
      type: "information",
      text: "Many nursery rhymes are also songs. We can sing them together. Singing is fun! Twinkle Twinkle Little Star is a famous song. Baa Baa Black Sheep is a fun song. We can use actions when we sing. We can twinkle our fingers. We can point to a sheep. Let's sing a song now!",
      textVi: "Nhiều bài đồng dao cũng là bài hát. Chúng ta có thể cùng nhau hát. Hát rất vui! Twinkle Twinkle Little Star (Ngôi sao nhỏ lấp lánh) là một bài hát nổi tiếng. Baa Baa Black Sheep (Cừu đen kêu ba ba) là một bài hát vui nhộn. Chúngtrong ta có thể kết hợp động tác khi hát. Chúng ta có thể làm động tác lấp lánh bằng các ngón tay. Chúng ta có thể chỉ vào một con cừu. Bây giờ hãy cùng hát một bài hát nhé!"
    },
    {
      sectionTitle: "6.6 Unit 6 Review",
      sectionTitleVi: "6.6 Ôn tập Bài 6",
      type: "tip",
      text: "Wonderful! You have finished Unit 6 all about nursery rhymes.\n\nLet's review what we learned:\n✓ We read the rhyme of Jack and Jill.\n✓ We learned about rhythm (the beat) and rhyme (matching sounds).\n✓ We learned some old words like 'pail' and 'crown'.\n✓ We read about the mouse and the clock.\n✓ We talked about singing rhymes as songs.\n\nKeep singing! Try to learn a new nursery rhyme this week.",
      textVi: "Tuyệt vời! Bạn đã học xong Bài 6 về các bài đồng dao.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đã đọc bài đồng dao về Jack và Jill.\n✓ Chúng ta học về nhịp điệu (nhịp đập) và vần điệu (âm thanh tương tự).\n✓ Chúng ta học một số từ cổ như 'pail' và 'crown'.\n✓ Chúng ta đã đọc về con chuột và chiếc đồng hồ.\n✓ Chúng ta đã nói về việc hát các bài đồng dao như những bài hát.\n\nHãy tiếp tục hát! Cố gắng học một bài đồng dao mới trong tuần này."
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G1 U07: Imagination Stories
  // ══════════════════════════════════════════════════════════════
  'cam_g1_u07': [
    {
      sectionTitle: "7.1 A bear in the house",
      sectionTitleVi: "7.1 Một chú gấu trong nhà",
      type: "reading",
      text: "Imagine there is a bear in your house. He is wearing a blue jacket. He is very polite. He says, 'Hello, can I have some tea?' You make him some tea and give him a biscuit. The bear sits on the sofa. He drinks his tea and eats his biscuit. He says, 'Thank you very much.' Then he goes away.",
      textVi: "Hãy tưởng tượng có một chú gấu trong nhà bạn. Chú đang mặc một chiếc áo khoác màu xanh dương. Chú rất lịch sự. Chú nói, 'Xin chào, tôi có thể uống một chút trà không?' Bạn pha cho chú một ít trà và cho chú một cái bánh quy. Chú gấu ngồi trên ghế sô pha. Chú uống trà và ăn bánh quy. Chú nói, 'Cảm ơn bạn rất nhiều.' Sau đó chú rời đi."
    },
    {
      sectionTitle: "7.2 Real or Make-believe?",
      sectionTitleVi: "7.2 Có thật hay giả tưởng?",
      type: "information",
      text: "Is the bear story real or make-believe? It is make-believe. Bears do not wear jackets. Bears do not drink tea. Make-believe stories come from our imagination. Real stories tell us what actually happened. I went to the park yesterday. That is real. I flew to the moon on a dragon. That is make-believe.",
      textVi: "Câu chuyện về chú gấu là có thật hay giả tưởng? Nó là giả tưởng. Những chú gấu không mặc áo khoác. Những chú gấu không uống trà. Những câu chuyện giả tưởng đến từ trí tưởng tượng của chúng ta. Những câu chuyện có thật kể cho chúng ta nghe những gì thực sự đã xảy ra. Hôm qua tôi đã đi công viên. Đó là sự thật. Tôi bay lên mặt trăng trên một con rồng. Đó là giả tưởng."
    },
    {
      sectionTitle: "7.3 Using 'can' and 'cannot'",
      sectionTitleVi: "7.3 Sử dụng 'can' và 'cannot'",
      type: "grammar",
      text: "We use 'can' for things that are possible. We use 'cannot' for things that are not possible. A bird can fly. A dog cannot fly. In make-believe stories, animals can do things they cannot do in real life. In the story, the bear can talk. Real bears cannot talk. What can you do?",
      textVi: "Chúng ta sử dụng 'can' (có thể) cho những điều có thể xảy ra. Chúng ta sử dụng 'cannot' (không thể) cho những điều không thể xảy ra. Chim có thể bay. Chó không thể bay. Trong những câu chuyện giả tưởng, động vật có thể làm những điều chúng không thể làm trong đời thực. Trong truyện, chú gấu có thể nói chuyện. Những chú gấu thật không thể nói chuyện. Bạn có thể làm gì?"
    },
    {
      sectionTitle: "7.4 My imagination",
      sectionTitleVi: "7.4 Trí tưởng tượng của tôi",
      type: "reading",
      text: "When I close my eyes, I can imagine anything. I can imagine I am a brave knight. I can imagine I am a pirate on a ship. I can imagine I have a pet dinosaur. My imagination is a wonderful place. I can go anywhere. I can do anything. What do you imagine?",
      textVi: "Khi nhắm mắt lại, tôi có thể tưởng tượng ra bất cứ điều gì. Tôi có thể tưởng tượng mình là một hiệp sĩ dũng cảm. Tôi có thể tưởng tượng mình là một tên cướp biển trên tàu. Tôi có thể tưởng tượng mình có một con khủng long cưng. Trí tưởng tượng của tôi là một nơi tuyệt vời. Tôi có thể đi bất cứ đâu. Tôi có thể làm bất cứ điều gì. Bạn tưởng tượng điều gì?"
    },
    {
      sectionTitle: "7.5 Writing a make-believe story",
      sectionTitleVi: "7.5 Viết một câu chuyện giả tưởng",
      type: "information",
      text: "Let's write a make-believe story. First, choose a character. Let's choose a rabbit. Next, give the character something special. Our rabbit has magical boots. Then, tell what happens. The rabbit jumps over a mountain. Finally, give it a happy ending. The rabbit finds a field of golden carrots.",
      textVi: "Hãy cùng viết một câu chuyện giả tưởng. Đầu tiên, chọn một nhân vật. Hãy chọn một con thỏ. Tiếp theo, cung cấp cho nhân vật một cái gì đó đặc biệt. Con thỏ của chúng ta có đôi ủng phép thuật. Sau đó, kể những gì xảy ra. Con thỏ nhảy qua một ngọn núi. Cuối cùng, tạo cho nó một kết thúc có hậu. Con thỏ tìm thấy một cánh đồng cà rốt vàng."
    },
    {
      sectionTitle: "7.6 Unit 7 Review",
      sectionTitleVi: "7.6 Ôn tập Bài 7",
      type: "tip",
      text: "Awesome! You have finished Unit 7 all about imagination stories.\n\nLet's review what we learned:\n✓ We learned the difference between 'real' and 'make-believe'.\n✓ We practiced using 'can' and 'cannot'.\n✓ We read a make-believe story about a polite bear.\n✓ We used our imagination to create new ideas.\n✓ We learned how to plan a make-believe story.\n\nKeep imagining! Write your own make-believe story and share it with a friend.",
      textVi: "Tuyệt vời! Bạn đã học xong Bài 7 về những câu chuyện tưởng tượng.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đã học sự khác biệt giữa 'có thật' và 'giả tưởng'.\n✓ Chúng ta thực hành sử dụng 'can' và 'cannot'.\n✓ Chúng ta đã đọc một câu chuyện giả tưởng về một chú gấu lịch sự.\n✓ Chúng ta đã sử dụng trí tưởng tượng của mình để tạo ra những ý tưởng mới.\n✓ Chúng ta học cách lên kế hoạch cho một câu chuyện giả tưởng.\n\nHãy tiếp tục tưởng tượng! Hãy viết câu chuyện giả tưởng của riêng bạn và chia sẻ nó với một người bạn."
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G1 U08: Personal Recounts
  // ══════════════════════════════════════════════════════════════
  'cam_g1_u08': [
    {
      sectionTitle: "8.1 A trip to the zoo",
      sectionTitleVi: "8.1 Một chuyến đi đến sở thú",
      type: "reading",
      text: "Yesterday, I went to the zoo with my family. First, we saw the tall giraffes. They were eating leaves from the trees. Next, we went to see the monkeys. The monkeys were very funny. They jumped and swung on the ropes. My brother laughed a lot. We had a great day at the zoo.",
      textVi: "Hôm qua, tôi đã đi sở thú với gia đình. Đầu tiên, chúng tôi nhìn thấy những con hươu cao cổ cao lêu nghêu. Chúng đang ăn lá trên cây. Tiếp theo, chúng tôi đi xem khỉ. Bầy khỉ rất vui nhộn. Chúng nhảy và đu trên dây. Em trai tôi cười rất nhiều. Chúng tôi đã có một ngày tuyệt vời ở sở thú."
    },
    {
      sectionTitle: "8.2 What is a recount?",
      sectionTitleVi: "8.2 Recount (kể lại) là gì?",
      type: "information",
      text: "A recount is telling a true story about something that happened to you. We write recounts about events in the past. We use words like 'yesterday', 'last week', or 'on Sunday'. A recount needs to be in order. We tell what happened first, next, and last.",
      textVi: "Kể lại (recount) là kể một câu chuyện có thật về một điều gì đó đã xảy ra với bạn. Chúng ta viết các bài kể lại về các sự kiện trong quá khứ. Chúng ta sử dụng các từ như 'hôm qua', 'tuần trước' hoặc 'vào Chủ nhật'. Một bài kể lại cần phải theo thứ tự. Chúng ta kể những gì đã xảy ra đầu tiên, tiếp theo và cuối cùng."
    },
    {
      sectionTitle: "8.3 Talking about the past",
      sectionTitleVi: "8.3 Nói về quá khứ",
      type: "grammar",
      text: "When we write a recount, we use verbs in the past tense. Many past tense verbs end in '-ed'. Today I walk. Yesterday I walked. Today I play. Yesterday I played. Today I visit. Yesterday I visited. Some verbs are different. Today I go. Yesterday I went.",
      textVi: "Khi chúng ta viết một bài kể lại, chúng ta sử dụng động từ ở thì quá khứ. Nhiều động từ thì quá khứ kết thúc bằng '-ed'. Hôm nay tôi đi bộ (walk). Hôm qua tôi đã đi bộ (walked). Hôm nay tôi chơi (play). Hôm qua tôi đã chơi (played). Hôm nay tôi đến thăm (visit). Hôm qua tôi đã đến thăm (visited). Một số động từ thì khác. Hôm nay tôi đi (go). Hôm qua tôi đã đi (went)."
    },
    {
      sectionTitle: "8.4 My weekend",
      sectionTitleVi: "8.4 Cuối tuần của tôi",
      type: "reading",
      text: "On Saturday, I helped my dad in the garden. We planted some flowers. It was hard work, but it was fun. On Sunday, I visited my grandmother. She baked a delicious cake. We drank tea and ate the cake. I was very happy. It was a good weekend.",
      textVi: "Vào thứ Bảy, tôi đã giúp bố trong khu vườn. Chúng tôi trồng một số bông hoa. Đó là một công việc vất vả, nhưng rất vui. Vào Chủ nhật, tôi đi thăm bà. Bà nướng một cái bánh rất ngon. Chúng tôi uống trà và ăn bánh. Tôi rất hạnh phúc. Đó là một ngày cuối tuần tuyệt vời."
    },
    {
      sectionTitle: "8.5 Feelings in recounts",
      sectionTitleVi: "8.5 Cảm xúc trong bài kể lại",
      type: "information",
      text: "At the end of a recount, we often write about how we felt. Did you feel happy, sad, excited, or tired? In the zoo recount, the writer felt it was a 'great day'. In the weekend recount, the writer felt 'very happy'. Adding feelings makes your story better.",
      textVi: "Vào cuối bài kể lại, chúng ta thường viết về cảm giác của mình. Bạn có cảm thấy vui, buồn, hào hứng hay mệt mỏi không? Trong bài kể lại về sở thú, người viết cảm thấy đó là một 'ngày tuyệt vời'. Trong bài kể lại cuối tuần, người viết cảm thấy 'rất vui'. Việc thêm cảm xúc làm cho câu chuyện của bạn hay hơn."
    },
    {
      sectionTitle: "8.6 Unit 8 Review",
      sectionTitleVi: "8.6 Ôn tập Bài 8",
      type: "tip",
      text: "Well done! You have finished Unit 8 all about personal recounts.\n\nLet's review what we learned:\n✓ We learned what a recount is (a true story about the past).\n✓ We used words to show time: yesterday, on Saturday.\n✓ We learned about past tense verbs (walked, played, went).\n✓ We wrote events in the right order.\n✓ We added feelings to the end of our stories.\n\nKeep a diary! Write a short recount of your day every evening.",
      textVi: "Làm tốt lắm! Bạn đã học xong Bài 8 về kể lại chuyện cá nhân.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đã học kể lại là gì (một câu chuyện có thật về quá khứ).\n✓ Chúng ta sử dụng các từ chỉ thời gian: hôm qua, vào thứ Bảy.\n✓ Chúng ta học về động từ thì quá khứ (walked, played, went).\n✓ Chúng ta viết các sự kiện theo đúng thứ tự.\n✓ Chúng ta thêm cảm xúc vào cuối câu chuyện của mình.\n\nHãy viết nhật ký! Viết một bài kể lại ngắn gọn về ngày của bạn vào mỗi buổi tối."
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G1 U09: Weather Poems
  // ══════════════════════════════════════════════════════════════
  'cam_g1_u09': [
    {
      sectionTitle: "9.1 Rain on the roof",
      sectionTitleVi: "9.1 Mưa trên mái nhà",
      type: "reading",
      text: "Pitter patter, pitter patter. The rain falls down. It falls on the trees. It falls on the town. Pitter patter, pitter patter. The rain hits the roof. I am warm inside. I am safe and dry. I like the sound of the rain.",
      textVi: "Lộp bộp, lộp bộp. Mưa rơi xuống. Mưa rơi trên cây cối. Mưa rơi xuống thị trấn. Lộp bộp, lộp bộp. Mưa rơi trên mái nhà. Tôi thấy ấm áp ở bên trong. Tôi an toàn và khô ráo. Tôi thích âm thanh của mưa."
    },
    {
      sectionTitle: "9.2 Poems about weather",
      sectionTitleVi: "9.2 Thơ về thời tiết",
      type: "information",
      text: "Poems use special words. Some words in poems make sounds. 'Pitter patter' sounds like rain. Poems can be about a theme. A theme is the main idea. The theme of this unit is weather. Poems can be about rain, sun, wind, or snow.",
      textVi: "Thơ sử dụng những từ ngữ đặc biệt. Một số từ trong thơ tạo ra âm thanh. 'Lộp bộp' (pitter patter) nghe giống như tiếng mưa. Những bài thơ có thể nói về một chủ đề. Chủ đề là ý chính. Chủ đề của bài này là thời tiết. Thơ có thể về mưa, mặt trời, gió, hoặc tuyết."
    },
    {
      sectionTitle: "9.3 Describing the weather",
      sectionTitleVi: "9.3 Miêu tả thời tiết",
      type: "grammar",
      text: "How is the weather today? Is it sunny? Is it rainy? Is it windy? We can use adjectives to describe the weather. The sun is bright. The wind is strong. The rain is wet. The snow is cold. What is your favorite weather? I like sunny weather.",
      textVi: "Hôm nay thời tiết thế nào? Trời có nắng không? Trời có mưa không? Trời có gió không? Chúng ta có thể sử dụng tính từ để miêu tả thời tiết. Mặt trời thì sáng. Gió thì mạnh. Mưa thì ướt. Tuyết thì lạnh. Thời tiết yêu thích của bạn là gì? Mình thích thời tiết nắng."
    },
    {
      sectionTitle: "9.4 The wind blows",
      sectionTitleVi: "9.4 Gió thổi",
      type: "reading",
      text: "Whoosh! The wind blows. It blows the leaves off the trees. It blows my hat away. Catch it! The wind is invisible. We cannot see it, but we can feel it. We can see what it does. It makes the kite fly high in the sky.",
      textVi: "Vù vù! Gió thổi. Gió thổi những chiếc lá rụng khỏi cây. Nó thổi bay chiếc mũ của tôi. Bắt lấy nó! Gió thì vô hình. Chúng ta không thể nhìn thấy nó, nhưng chúng ta có thể cảm nhận được nó. Chúng ta có thể nhìn thấy những gì nó làm. Nó làm cho cánh diều bay cao trên bầu trời."
    },
    {
      sectionTitle: "9.5 Writing an acrostic poem",
      sectionTitleVi: "9.5 Viết thơ Akrostic",
      type: "information",
      text: "An acrostic poem uses the letters of a word. The letters go down the page. Let's write a poem about SUN.\nS is for Shining so bright.\nU is for Up in the sky.\nN is for Never cold.\nYou can try writing a poem using your own name!",
      textVi: "Một bài thơ Akrostic (thơ kết hợp chữ cái) sử dụng các chữ cái của một từ. Các chữ cái đi xuống theo trang. Hãy viết một bài thơ về chữ SUN (Mặt trời).\nS là Shining so bright (Chiếu sáng rực rỡ).\nU là Up in the sky (Lên cao trên bầu trời).\nN là Never cold (Không bao giờ lạnh).\nBạn có thể thử viết một bài thơ bằng tên của chính mình!"
    },
    {
      sectionTitle: "9.6 Unit 9 Review",
      sectionTitleVi: "9.6 Ôn tập Bài 9",
      type: "tip",
      text: "Brilliant! You have finished Unit 9 all about weather poems.\n\nLet's review what we learned:\n✓ We read poems about rain and wind.\n✓ We learned that 'theme' means the main idea.\n✓ We used words that sound like noises (pitter patter).\n✓ We used adjectives to describe the weather (bright, wet, cold).\n✓ We learned how to write an acrostic poem.\n\nKeep observing the weather! Look out the window and describe the weather every morning.",
      textVi: "Tuyệt vời! Bạn đã học xong Bài 9 về những bài thơ thời tiết.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đọc những bài thơ về mưa và gió.\n✓ Chúng ta đã học được rằng 'chủ đề' có nghĩa là ý chính.\n✓ Chúng ta đã sử dụng những từ có âm thanh giống tiếng ồn (lộp bộp).\n✓ Chúng ta đã sử dụng các tính từ để miêu tả thời tiết (sáng, ướt, lạnh).\n✓ Chúng ta học cách viết một bài thơ Akrostic.\n\nHãy tiếp tục quan sát thời tiết! Nhìn ra cửa sổ và miêu tả thời tiết mỗi buổi sáng."
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G2 U01: Families
  // ══════════════════════════════════════════════════════════════
  'cam_g2_u01': [
    {
      sectionTitle: "1.1 Meet my family",
      sectionTitleVi: "1.1 Gặp gỡ gia đình tôi",
      type: "reading",
      text: "Hello! My name is Mia. I live with my mother, my father, and my little brother, Leo. We live in a house with a small garden. My grandmother and grandfather live near us. We visit them every Sunday. We eat dinner together. Family is very important to me. I love my family.",
      textVi: "Xin chào! Tên tôi là Mia. Tôi sống với mẹ, cha và em trai nhỏ của tôi, Leo. Chúng tôi sống trong một ngôi nhà có một khu vườn nhỏ. Bà và ông của tôi sống gần chúng tôi. Chúng tôi đến thăm họ vào mỗi Chủ nhật. Chúng tôi cùng nhau ăn tối. Gia đình rất quan trọng đối với tôi. Tôi yêu gia đình mình."
    },
    {
      sectionTitle: "1.2 Different families",
      sectionTitleVi: "1.2 Những gia đình khác nhau",
      type: "information",
      text: "Families are not all the same. Some families are big, and some families are small. Some children live with their mother and father. Some children live with only their mother or only their father. Some children live with their grandparents. It does not matter who is in your family. What matters is that you care for each other.",
      textVi: "Các gia đình không giống nhau. Một số gia đình lớn, và một số gia đình nhỏ. Một số trẻ em sống với cả mẹ và cha. Một số trẻ em chỉ sống với mẹ hoặc chỉ sống với cha. Một số trẻ em sống với ông bà. Không quan trọng ai ở trong gia đình của bạn. Điều quan trọng là các bạn quan tâm đến nhau."
    },
    {
      sectionTitle: "1.3 Family trees",
      sectionTitleVi: "1.3 Cây gia phả",
      type: "grammar",
      text: "A family tree is a picture that shows how people in a family are connected. Grandparents are at the top. Parents are in the middle. Children are at the bottom. We use words like 'aunt', 'uncle', and 'cousin' for other family members. An aunt is your mother or father's sister. A cousin is your aunt or uncle's child.",
      textVi: "Cây gia phả là một bức tranh cho thấy những người trong một gia đình kết nối với nhau như thế nào. Ông bà ở trên cùng. Cha mẹ ở giữa. Trẻ em ở dưới cùng. Chúng ta sử dụng các từ như 'dì/cô' (aunt), 'chú/bác' (uncle) và 'anh chị em họ' (cousin) cho các thành viên khác trong gia đình. Dì/cô là chị hoặc em gái của cha hoặc mẹ bạn. Anh chị em họ là con của dì hoặc chú bạn."
    },
    {
      sectionTitle: "1.4 Helping at home",
      sectionTitleVi: "1.4 Giúp đỡ việc nhà",
      type: "reading",
      text: "In a family, everyone helps. Leo and I help our parents. I set the table for dinner. I put the plates and forks on the table. Leo feeds our dog, Max. After dinner, my father washes the dishes, and my mother dries them. Helping at home makes our family happy.",
      textVi: "Trong một gia đình, mọi người đều giúp đỡ lẫn nhau. Leo và tôi giúp đỡ cha mẹ. Tôi dọn bàn ăn tối. Tôi đặt đĩa và nĩa lên bàn. Leo cho chú chó Max của chúng tôi ăn. Sau bữa tối, cha tôi rửa bát đĩa và mẹ tôi lau khô chúng. Giúp đỡ việc nhà làm cho gia đình chúng tôi hạnh phúc."
    },
    {
      sectionTitle: "1.5 Unit 1 Review",
      sectionTitleVi: "1.5 Ôn tập Bài 1",
      type: "tip",
      text: "Great job! You have finished Unit 1 all about families.\n\nLet's review what we learned:\n✓ We learned words for family members (mother, father, brother).\n✓ We learned that families can be different sizes.\n✓ We talked about family trees and extended family (aunts, uncles).\n✓ We read about helping each other at home.\n\nTalk to your family today! Ask them to help you draw your own family tree.",
      textVi: "Làm tốt lắm! Bạn đã hoàn thành Bài 1 về gia đình.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đã học các từ chỉ thành viên gia đình (mẹ, cha, anh em trai).\n✓ Chúng ta học được rằng các gia đình có thể có quy mô khác nhau.\n✓ Chúng ta đã nói về cây gia phả và đại gia đình (cô dì, chú bác).\n✓ Chúng ta đã đọc về việc giúp đỡ lẫn nhau ở nhà.\n\nHãy nói chuyện với gia đình bạn hôm nay! Nhờ họ giúp bạn vẽ cây gia phả của riêng mình."
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G2 U02: Badges & Labels
  // ══════════════════════════════════════════════════════════════
  'cam_g2_u02': [
    {
      sectionTitle: "2.1 The museum badge",
      sectionTitleVi: "2.1 Huy hiệu bảo tàng",
      type: "reading",
      text: "Our class went to the museum today. The teacher gave everyone a red badge. The badge had my name on it. It also had the name of our school. The badge showed the museum guard that I was with a school group. I wore the badge on my shirt. It made me feel important.",
      textVi: "Lớp chúng tôi đã đi bảo tàng hôm nay. Giáo viên đưa cho mỗi người một huy hiệu màu đỏ. Huy hiệu có tên tôi trên đó. Nó cũng có tên trường của chúng tôi. Huy hiệu cho người bảo vệ bảo tàng thấy rằng tôi đi cùng một nhóm trường. Tôi đeo huy hiệu trên áo. Nó làm tôi cảm thấy quan trọng."
    },
    {
      sectionTitle: "2.2 What are labels for?",
      sectionTitleVi: "2.2 Nhãn dùng để làm gì?",
      type: "information",
      text: "Labels give us information. Look around you. You will see labels on many things. A label on a box of cereal tells you what is inside. A label on a shirt tells you the size and how to wash it. Labels can have words or pictures. They help us understand what things are and how to use them.",
      textVi: "Nhãn cung cấp cho chúng ta thông tin. Hãy nhìn xung quanh bạn. Bạn sẽ thấy nhãn trên nhiều thứ. Nhãn trên hộp ngũ cốc cho bạn biết có gì bên trong. Nhãn trên áo cho bạn biết kích cỡ và cách giặt. Nhãn có thể có chữ hoặc hình ảnh. Chúng giúp chúng ta hiểu các vật dụng là gì và cách sử dụng chúng."
    },
    {
      sectionTitle: "2.3 Reading instructions",
      sectionTitleVi: "2.3 Đọc hướng dẫn",
      type: "grammar",
      text: "Some labels give instructions. Instructions tell us what to do. They use command words. Command words are verbs at the beginning of a sentence. For example: 'Push the door.' 'Wash in cold water.' 'Do not eat.' We follow instructions to stay safe and to do things correctly.",
      textVi: "Một số nhãn đưa ra hướng dẫn. Hướng dẫn cho chúng ta biết phải làm gì. Chúng sử dụng các từ mệnh lệnh. Từ mệnh lệnh là động từ ở đầu câu. Ví dụ: 'Đẩy cửa.' 'Giặt trong nước lạnh.' 'Không được ăn.' Chúng ta làm theo hướng dẫn để giữ an toàn và làm mọi việc một cách chính xác."
    },
    {
      sectionTitle: "2.4 Designing a poster",
      sectionTitleVi: "2.4 Thiết kế một tấm áp phích",
      type: "reading",
      text: "We made posters in class to label the different areas. I made a poster for the reading corner. I drew a big book. I used bright blue and yellow colors. I wrote 'Reading Corner' in big letters. Now, everyone knows where to go to read quietly. Good design makes a label easy to see and read.",
      textVi: "Chúng tôi đã làm các tấm áp phích trong lớp để dán nhãn các khu vực khác nhau. Tôi làm một tấm áp phích cho góc đọc sách. Tôi vẽ một cuốn sách lớn. Tôi đã sử dụng màu xanh dương và màu vàng tươi. Tôi viết 'Góc đọc sách' bằng chữ in lớn. Bây giờ, mọi người đều biết nơi để đi đọc sách một cách yên tĩnh. Thiết kế tốt làm cho nhãn dễ nhìn và dễ đọc."
    },
    {
      sectionTitle: "2.5 Unit 2 Review",
      sectionTitleVi: "2.5 Ôn tập Bài 2",
      type: "tip",
      text: "Awesome! You have finished Unit 2 all about badges and labels.\n\nLet's review what we learned:\n✓ We learned that badges can show who we are and where we belong.\n✓ We discovered that labels give us important information about objects.\n✓ We practiced reading instructions and command words (Push, Wash).\n✓ We talked about designing signs with clear words and pictures.\n\nBe a detective! Look around your house today and find three different labels.",
      textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 2 về huy hiệu và nhãn mác.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đã học được rằng huy hiệu có thể cho thấy chúng ta là ai và chúng ta thuộc về đâu.\n✓ Chúng ta phát hiện ra rằng nhãn cung cấp cho chúng ta thông tin quan trọng về các đồ vật.\n✓ Chúng ta đã thực hành đọc các hướng dẫn và từ mệnh lệnh (Push, Wash).\n✓ Chúng ta đã nói về việc thiết kế các biển báo với hình ảnh và từ ngữ rõ ràng.\n\nHãy là một thám tử! Nhìn xung quanh nhà của bạn hôm nay và tìm ba nhãn khác nhau."
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G2 U03: Sounds Around
  // ══════════════════════════════════════════════════════════════
  'cam_g2_u03': [
    {
      sectionTitle: "3.1 The noisy city",
      sectionTitleVi: "3.1 Thành phố ồn ào",
      type: "reading",
      text: "The city is full of sounds. Beep, beep! That is the sound of cars. Vroom! That is a bus. People are talking loudly on the street. A dog is barking. At a construction site, workers are hitting metal. Clang, clang! It is very noisy. I cover my ears. I like the city, but sometimes it is too loud.",
      textVi: "Thành phố tràn ngập âm thanh. Bíp, bíp! Đó là âm thanh của xe ô tô. Vù vù! Đó là một chiếc xe buýt. Mọi người đang nói chuyện ồn ào trên đường phố. Một con chó đang sủa. Tại một công trường xây dựng, công nhân đang đập kim loại. Keng, keng! Thật là ồn ào. Tôi bịt tai lại. Tôi thích thành phố, nhưng đôi khi nó quá ồn ào."
    },
    {
      sectionTitle: "3.2 Quiet sounds",
      sectionTitleVi: "3.2 Những âm thanh nhỏ",
      type: "information",
      text: "Not all sounds are loud. Some sounds are quiet. When the wind blows gently through the trees, it makes a soft sound. A cat purring is a quiet sound. A whisper is a very quiet way of talking. In a library, we must use quiet voices. Silence is when there is no sound at all.",
      textVi: "Không phải tất cả âm thanh đều lớn. Một số âm thanh rất nhỏ. Khi gió thổi nhẹ qua những tán cây, nó tạo ra một âm thanh nhẹ nhàng. Một con mèo kêu gừ gừ là một âm thanh nhỏ. Thì thầm là một cách nói chuyện rất nhỏ. Trong thư viện, chúng ta phải nói giọng nhỏ. Im lặng là khi không có âm thanh nào cả."
    },
    {
      sectionTitle: "3.3 Words that make sounds",
      sectionTitleVi: "3.3 Những từ tạo ra âm thanh",
      type: "grammar",
      text: "Some words sound like the thing they describe. This is called onomatopoeia. Think of the word 'buzz'. It sounds like a bee. Think of the word 'splash'. It sounds like jumping into water. Other sound words are 'crash', 'bang', and 'pop'. Using these words makes writing more exciting.",
      textVi: "Một số từ nghe giống như thứ mà chúng miêu tả. Điều này được gọi là từ tượng thanh. Hãy nghĩ về từ 'buzz' (vo ve). Nghe giống như một con ong. Hãy nghĩ về từ 'splash' (bùm). Nghe giống như nhảy xuống nước. Các từ chỉ âm thanh khác là 'crash' (rầm), 'bang' (đoàng) và 'pop' (bốp). Sử dụng những từ này làm cho bài viết thú vị hơn."
    },
    {
      sectionTitle: "3.4 Music class",
      sectionTitleVi: "3.4 Lớp học âm nhạc",
      type: "reading",
      text: "Today in music class, we played different instruments. I played the drum. I hit it with a stick. Boom, boom! My friend played the triangle. It made a high, ringing sound. Ting! We all played our instruments together. Our teacher said we made a beautiful sound. Music is organized sound.",
      textVi: "Hôm nay trong lớp học âm nhạc, chúng tôi đã chơi các loại nhạc cụ khác nhau. Tôi đã chơi trống. Tôi đánh nó bằng một cái dùi. Bùm, bùm! Bạn tôi chơi kẻng tam giác. Nó tạo ra một âm thanh cao, vang dội. Keng! Tất cả chúng tôi cùng chơi nhạc cụ của mình. Giáo viên của chúng tôi nói rằng chúng tôi đã tạo ra một âm thanh tuyệt vời. Âm nhạc là âm thanh có tổ chức."
    },
    {
      sectionTitle: "3.5 Unit 3 Review",
      sectionTitleVi: "3.5 Ôn tập Bài 3",
      type: "tip",
      text: "Well done! You have finished Unit 3 all about sounds.\n\nLet's review what we learned:\n✓ We learned about loud sounds (cars, construction) and quiet sounds (whispers).\n✓ We learned that silence means no sound at all.\n✓ We practiced using sound words like 'buzz' and 'crash'.\n✓ We read about making musical sounds with instruments.\n\nClose your eyes and listen. What sounds can you hear right now?",
      textVi: "Làm tốt lắm! Bạn đã hoàn thành Bài 3 về các âm thanh.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đã học về những âm thanh lớn (ô tô, công trường xây dựng) và những âm thanh nhỏ (tiếng thì thầm).\n✓ Chúng ta đã học được rằng sự im lặng có nghĩa là không có âm thanh nào cả.\n✓ Chúng ta đã thực hành sử dụng các từ âm thanh như 'buzz' (vo ve) và 'crash' (ầm).\n✓ Chúng ta đã đọc về việc tạo ra âm thanh âm nhạc bằng nhạc cụ.\n\nHãy nhắm mắt lại và lắng nghe. Bạn có thể nghe thấy âm thanh gì ngay bây giờ?"
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G2 U04: Long Ago
  // ══════════════════════════════════════════════════════════════
  'cam_g2_u04': [
    {
      sectionTitle: "4.1 The old castle",
      sectionTitleVi: "4.1 Lâu đài cổ",
      type: "reading",
      text: "Long ago, there were no tall glass buildings. Kings and queens lived in big stone castles. Castles had thick walls to keep people safe. Knights wore heavy metal armour and rode horses. They did not have cars or airplanes. They used candles for light because there was no electricity. Life was very different.",
      textVi: "Cách đây rất lâu, không có những tòa nhà cao tầng bằng kính. Các vị vua và hoàng hậu sống trong những lâu đài lớn bằng đá. Lâu đài có những bức tường dày để giữ an toàn cho mọi người. Các hiệp sĩ mặc áo giáp kim loại nặng và cưỡi ngựa. Họ không có ô tô hay máy bay. Họ sử dụng nến để thắp sáng vì không có điện. Cuộc sống lúc đó rất khác biệt."
    },
    {
      sectionTitle: "4.2 Then and now",
      sectionTitleVi: "4.2 Ngày ấy và bây giờ",
      type: "information",
      text: "We can compare the past and the present. In the past, people traveled by horse or by walking. Now, we travel by cars and trains. In the past, people wrote letters with a feather pen. Now, we send emails on a computer. Some things change, but some things stay the same. People still eat, sleep, and play.",
      textVi: "Chúng ta có thể so sánh quá khứ và hiện tại. Trong quá khứ, mọi người di chuyển bằng ngựa hoặc đi bộ. Bây giờ, chúng ta đi du lịch bằng ô tô và xe lửa. Trong quá khứ, mọi người viết thư bằng bút lông chim. Bây giờ, chúng ta gửi email trên máy tính. Có những thứ thay đổi, nhưng cũng có những thứ vẫn giữ nguyên. Con người vẫn ăn, ngủ và vui chơi."
    },
    {
      sectionTitle: "4.3 Talking about the past",
      sectionTitleVi: "4.3 Nói về quá khứ",
      type: "grammar",
      text: "When we talk about long ago, we use the past tense of 'to be'. We use 'was' for one thing (singular) and 'were' for many things (plural). The castle was big. The knights were brave. The king was old. The horses were fast. Notice how we change 'is' to 'was' and 'are' to 'were'.",
      textVi: "Khi nói về ngày xưa, chúng ta sử dụng thì quá khứ của động từ 'to be'. Chúng ta sử dụng 'was' cho một vật (số ít) và 'were' cho nhiều vật (số nhiều). Lâu đài thì lớn (was). Các hiệp sĩ thì dũng cảm (were). Nhà vua thì già (was). Những con ngựa thì nhanh nhẹn (were). Chú ý cách chúng ta đổi 'is' thành 'was' và 'are' thành 'were'."
    },
    {
      sectionTitle: "4.4 A message from the king",
      sectionTitleVi: "4.4 Thông điệp từ nhà vua",
      type: "reading",
      text: "The king had a message. He wanted everyone to come to a big feast. A messenger rode his horse to every village. He shouted, 'Hear ye, hear ye! The king invites you to a feast.' The people were very excited. They put on their best clothes and walked to the castle. There was lots of food and music.",
      textVi: "Nhà vua có một thông điệp. Ngài muốn mọi người đến dự một bữa tiệc lớn. Một người đưa tin đã cưỡi ngựa đến mọi ngôi làng. Anh ta hét lên: 'Nghe đây, nghe đây! Nhà vua mời các bạn đến dự tiệc.' Mọi người đều rất phấn khích. Họ mặc những bộ quần áo đẹp nhất và đi bộ đến lâu đài. Có rất nhiều đồ ăn và âm nhạc."
    },
    {
      sectionTitle: "4.5 Unit 4 Review",
      sectionTitleVi: "4.5 Ôn tập Bài 4",
      type: "tip",
      text: "Excellent! You have finished Unit 4 all about long ago.\n\nLet's review what we learned:\n✓ We learned about life in the past (castles, knights).\n✓ We compared how things were then to how they are now.\n✓ We practiced using 'was' and 'were'.\n✓ We read a story about a king's feast.\n\nImagine living in a castle! What would you do all day?",
      textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 4 về ngày xưa.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đã học về cuộc sống trong quá khứ (lâu đài, hiệp sĩ).\n✓ Chúng ta đã so sánh mọi thứ ngày xưa với bây giờ như thế nào.\n✓ Chúng ta đã thực hành sử dụng 'was' và 'were'.\n✓ Chúng ta đã đọc một câu chuyện về bữa tiệc của nhà vua.\n\nHãy tưởng tượng việc sống trong một lâu đài! Bạn sẽ làm gì cả ngày?"
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G2 U05: Computers & Robots
  // ══════════════════════════════════════════════════════════════
  'cam_g2_u05': [
    {
      sectionTitle: "5.1 The helpful robot",
      sectionTitleVi: "5.1 Chú robot hữu ích",
      type: "reading",
      text: "My family bought a new robot. Its name is Sparky. Sparky has a screen for a face and wheels instead of legs. Sparky is very helpful. It can clean the floor and wash the windows. I can press buttons to give Sparky commands. Sometimes, Sparky gets confused and tries to wash the cat. The cat does not like that!",
      textVi: "Gia đình tôi đã mua một chú robot mới. Tên của nó là Sparky. Sparky có khuôn mặt là một màn hình và có bánh xe thay vì chân. Sparky rất hữu ích. Nó có thể lau nhà và lau cửa sổ. Tôi có thể nhấn nút để ra lệnh cho Sparky. Đôi khi, Sparky bị nhầm lẫn và cố gắng tắm cho con mèo. Con mèo không thích điều đó chút nào!"
    },
    {
      sectionTitle: "5.2 Parts of a computer",
      sectionTitleVi: "5.2 Các bộ phận của máy tính",
      type: "information",
      text: "A computer has many parts. The screen shows you pictures and words. You use the keyboard to type letters and numbers. You use the mouse to click on things on the screen. Inside the computer, there is a brain that processes information. Computers help us learn, play games, and talk to people far away.",
      textVi: "Một máy tính có rất nhiều bộ phận. Màn hình hiển thị cho bạn hình ảnh và chữ. Bạn sử dụng bàn phím để gõ chữ cái và số. Bạn sử dụng con chuột để nhấp vào các thứ trên màn hình. Bên trong máy tính, có một bộ não xử lý thông tin. Máy tính giúp chúng ta học tập, chơi trò chơi và nói chuyện với những người ở xa."
    },
    {
      sectionTitle: "5.3 Giving commands",
      sectionTitleVi: "5.3 Ra lệnh",
      type: "grammar",
      text: "Robots and computers only do what we tell them to do. We write instructions using code. When we write code, we use imperative verbs, just like when we write instructions for people. 'Move forward.' 'Turn left.' 'Stop.' Code must be very clear. If the code is wrong, the robot will do the wrong thing.",
      textVi: "Robot và máy tính chỉ làm những gì chúng ta bảo chúng làm. Chúng ta viết các hướng dẫn bằng mã lệnh (code). Khi viết mã, chúng ta sử dụng động từ mệnh lệnh, giống như khi chúng ta viết hướng dẫn cho con người. 'Tiến lên.' 'Rẽ trái.' 'Dừng lại.' Mã lệnh phải rất rõ ràng. Nếu mã sai, robot sẽ làm sai."
    },
    {
      sectionTitle: "5.4 A robot's day",
      sectionTitleVi: "5.4 Một ngày của robot",
      type: "reading",
      text: "I am a factory robot. I wake up when someone turns on the power. All day long, I lift heavy boxes. I am very strong. I never get tired, and I never need to sleep. But, I do need electricity. When my battery is low, I have to plug myself into the wall to recharge. Then, I am ready to work again.",
      textVi: "Tôi là một robot nhà máy. Tôi thức dậy khi ai đó bật nguồn. Cả ngày, tôi nâng những chiếc hộp nặng. Tôi rất khỏe. Tôi không bao giờ mệt mỏi và không bao giờ cần ngủ. Nhưng, tôi cần điện. Khi pin yếu, tôi phải cắm mình vào tường để sạc lại. Sau đó, tôi đã sẵn sàng làm việc trở lại."
    },
    {
      sectionTitle: "5.5 Unit 5 Review",
      sectionTitleVi: "5.5 Ôn tập Bài 5",
      type: "tip",
      text: "Great! You have finished Unit 5 all about computers and robots.\n\nLet's review what we learned:\n✓ We read about a robot that cleans the house.\n✓ We learned the names of computer parts (screen, keyboard, mouse).\n✓ We talked about giving commands and writing code.\n✓ We read a story from the point of view of a factory robot.\n\nWhat kind of robot would you like to invent? Draw a picture of it!",
      textVi: "Tuyệt vời! Bạn đã học xong Bài 5 về máy tính và robot.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đã đọc về một con robot dọn dẹp nhà cửa.\n✓ Chúng ta đã học tên các bộ phận máy tính (màn hình, bàn phím, chuột).\n✓ Chúng ta đã nói về việc ra lệnh và viết mã.\n✓ Chúng ta đã đọc một câu chuyện dưới góc nhìn của một con robot nhà máy.\n\nBạn muốn phát minh ra loại robot nào? Hãy vẽ một bức tranh về nó!"
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G2 U06: Journeys
  // ══════════════════════════════════════════════════════════════
  'cam_g2_u06': [
    {
      sectionTitle: "6.1 A trip to the mountains",
      sectionTitleVi: "6.1 Chuyến đi lên núi",
      type: "reading",
      text: "During the holidays, we went on a journey to the mountains. We packed our bags and put them in the car. The drive was very long. We drove on a winding road. We saw tall trees and a river. When we arrived, it was cold. We built a fire and roasted marshmallows. It was a wonderful adventure.",
      textVi: "Trong kỳ nghỉ, chúng tôi đã có một chuyến đi lên núi. Chúng tôi đóng gói đồ đạc và xếp vào xe. Chuyến đi xe rất dài. Chúng tôi lái xe trên một con đường quanh co. Chúng tôi nhìn thấy những cái cây cao và một con sông. Khi chúng tôi đến nơi, trời rất lạnh. Chúng tôi đã đốt lửa và nướng kẹo dẻo. Đó là một cuộc phiêu lưu tuyệt vời."
    },
    {
      sectionTitle: "6.2 Reading a map",
      sectionTitleVi: "6.2 Đọc bản đồ",
      type: "information",
      text: "A map shows us where things are. It helps us find our way on a journey. A map has symbols. A blue line is a river. A green area is a park. A map also has a compass rose. It shows North, South, East, and West. Before GPS, people always used paper maps so they would not get lost.",
      textVi: "Bản đồ cho chúng ta thấy các địa điểm ở đâu. Nó giúp chúng ta tìm đường trong một cuộc hành trình. Một bản đồ có các ký hiệu. Một đường màu xanh là một con sông. Khu vực màu xanh lá cây là công viên. Một bản đồ cũng có hoa tiêu. Nó chỉ phương Bắc, Nam, Đông và Tây. Trước khi có GPS, mọi người luôn sử dụng bản đồ giấy để không bị lạc."
    },
    {
      sectionTitle: "6.3 Transport words",
      sectionTitleVi: "6.3 Từ vựng về phương tiện giao thông",
      type: "grammar",
      text: "There are many vehicles we can use for a journey. We can go 'by car', 'by bus', or 'by train'. We can fly 'by plane' or sail 'by boat'. But if we use our feet, we say we go 'on foot', not 'by foot'. I go to school on foot, but my friend goes by bike.",
      textVi: "Có rất nhiều phương tiện chúng ta có thể sử dụng cho một cuộc hành trình. Chúng ta có thể đi 'bằng ô tô' (by car), 'bằng xe buýt' (by bus) hoặc 'bằng tàu hỏa' (by train). Chúng ta có thể bay 'bằng máy bay' (by plane) hoặc đi thuyền 'bằng tàu' (by boat). Nhưng nếu chúng ta sử dụng đôi chân của mình, chúng ta nói đi 'bộ' (on foot), không phải 'by foot'. Tôi đi bộ đến trường, nhưng bạn tôi đi bằng xe đạp."
    },
    {
      sectionTitle: "6.4 The lost compass",
      sectionTitleVi: "6.4 Chiếc la bàn bị mất",
      type: "reading",
      text: "Tom was exploring the forest. He had a map and a compass. He walked North for an hour. Then, he realized his compass was missing! It fell out of his pocket. Oh no! Tom was lost. He sat on a rock and tried not to cry. Then, he remembered the map. He found a river on the map and followed it back to the road.",
      textVi: "Tom đang khám phá khu rừng. Cậu ấy có một tấm bản đồ và một chiếc la bàn. Cậu ấy đi về hướng Bắc trong một giờ. Sau đó, cậu ấy nhận ra chiếc la bàn của mình bị mất! Nó rơi khỏi túi của cậu ấy. Ôi không! Tom đã bị lạc. Cậu ấy ngồi trên một tảng đá và cố gắng không khóc. Sau đó, cậu ấy nhớ đến bản đồ. Cậu ấy tìm thấy một con sông trên bản đồ và đi theo nó để trở lại con đường."
    },
    {
      sectionTitle: "6.5 Unit 6 Review",
      sectionTitleVi: "6.5 Ôn tập Bài 6",
      type: "tip",
      text: "Brilliant! You have finished Unit 6 all about journeys.\n\nLet's review what we learned:\n✓ We read about a journey to the mountains.\n✓ We learned how to read a map with symbols and a compass rose.\n✓ We practiced using 'by' with transport (by car, by train, on foot).\n✓ We read an adventure story about getting lost and found.\n\nPlan a journey! Where would you like to go? What vehicle will you use?",
      textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 6 về những chuyến hành trình.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đã đọc về một cuộc hành trình lên núi.\n✓ Chúng ta đã học cách đọc bản đồ với các ký hiệu và hoa tiêu.\n✓ Chúng ta đã thực hành sử dụng 'by' với các phương tiện giao thông (by car, by train, on foot).\n✓ Chúng ta đã đọc một câu chuyện phiêu lưu về việc bị lạc và được tìm thấy.\n\nHãy lên kế hoạch cho một cuộc hành trình! Bạn muốn đi đâu? Bạn sẽ sử dụng phương tiện gì?"
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G2 U07: Famous Authors
  // ══════════════════════════════════════════════════════════════
  'cam_g2_u07': [
    {
      sectionTitle: "7.1 Meeting an author",
      sectionTitleVi: "7.1 Gặp gỡ một tác giả",
      type: "reading",
      text: "Today, a famous author visited our school. Her name is Ms. Green. She writes stories about magical forests. She showed us her new book. She told us that writing a book takes a long time. First, she imagines the characters. Then, she writes many drafts. Finally, an illustrator draws the pictures. I want to be an author too.",
      textVi: "Hôm nay, một tác giả nổi tiếng đã đến thăm trường chúng tôi. Tên cô ấy là cô Green. Cô ấy viết những câu chuyện về những khu rừng phép thuật. Cô ấy cho chúng tôi xem cuốn sách mới của mình. Cô ấy nói với chúng tôi rằng việc viết một cuốn sách mất rất nhiều thời gian. Đầu tiên, cô ấy tưởng tượng ra các nhân vật. Sau đó, cô ấy viết nhiều bản nháp. Cuối cùng, một họa sĩ minh họa sẽ vẽ các bức tranh. Tôi cũng muốn trở thành một tác giả."
    },
    {
      sectionTitle: "7.2 Parts of a book",
      sectionTitleVi: "7.2 Các phần của một cuốn sách",
      type: "information",
      text: "A book has different parts. The cover protects the book and has the title. The title is the name of the book. The author is the person who wrote the words. The illustrator is the person who drew the pictures. Inside, the book is divided into chapters. A table of contents tells you what page each chapter starts on.",
      textVi: "Một cuốn sách có nhiều phần khác nhau. Bìa bảo vệ cuốn sách và có chứa tiêu đề. Tiêu đề là tên của cuốn sách. Tác giả là người đã viết ra các từ. Họa sĩ minh họa là người đã vẽ các bức tranh. Bên trong, cuốn sách được chia thành các chương. Mục lục cho bạn biết mỗi chương bắt đầu từ trang nào."
    },
    {
      sectionTitle: "7.3 Describing characters",
      sectionTitleVi: "7.3 Miêu tả nhân vật",
      type: "grammar",
      text: "Authors use adjectives to describe characters. They tell us what characters look like and how they act. 'The old wizard had a long, white beard.' 'The brave girl climbed the tall mountain.' Adjectives make the characters interesting. When you write a story, use lots of adjectives so the reader can imagine the characters clearly.",
      textVi: "Các tác giả sử dụng tính từ để miêu tả nhân vật. Họ cho chúng ta biết nhân vật trông như thế nào và hành động ra sao. 'Vị phù thủy già có một bộ râu dài màu trắng.' 'Cô gái dũng cảm leo lên ngọn núi cao.' Tính từ làm cho các nhân vật trở nên thú vị. Khi bạn viết một câu chuyện, hãy sử dụng nhiều tính từ để người đọc có thể tưởng tượng các nhân vật một cách rõ ràng."
    },
    {
      sectionTitle: "7.4 The magic library",
      sectionTitleVi: "7.4 Thư viện phép thuật",
      type: "reading",
      text: "Leo found a secret door in the school library. Inside, the books were floating! When he opened a book about pirates, he smelled the ocean. When he opened a book about dragons, he felt warm air. This was a magic library. The stories came alive. Leo sat down and started to read the best story ever.",
      textVi: "Leo đã tìm thấy một cánh cửa bí mật trong thư viện trường học. Bên trong, những cuốn sách đang lơ lửng! Khi cậu mở một cuốn sách về cướp biển, cậu ngửi thấy mùi đại dương. Khi cậu mở một cuốn sách về rồng, cậu cảm thấy không khí ấm áp. Đây là một thư viện phép thuật. Những câu chuyện trở nên sống động. Leo ngồi xuống và bắt đầu đọc câu chuyện hay nhất từ trước đến nay."
    },
    {
      sectionTitle: "7.5 Unit 7 Review",
      sectionTitleVi: "7.5 Ôn tập Bài 7",
      type: "tip",
      text: "Excellent! You have finished Unit 7 all about famous authors.\n\nLet's review what we learned:\n✓ We learned about authors and illustrators.\n✓ We discovered the parts of a book (cover, title, chapters).\n✓ We practiced using adjectives to describe characters.\n✓ We read a fantasy story about a magic library.\n\nWho is your favorite author? Read one of their books today!",
      textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 7 về các tác giả nổi tiếng.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đã học về tác giả và họa sĩ minh họa.\n✓ Chúng ta đã khám phá các phần của một cuốn sách (bìa, tiêu đề, các chương).\n✓ Chúng ta đã thực hành sử dụng tính từ để miêu tả nhân vật.\n✓ Chúng ta đã đọc một câu chuyện giả tưởng về một thư viện phép thuật.\n\nAi là tác giả yêu thích của bạn? Hãy đọc một cuốn sách của họ ngay hôm nay!"
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G2 U08: Sea Life
  // ══════════════════════════════════════════════════════════════
  'cam_g2_u08': [
    {
      sectionTitle: "8.1 Exploring the ocean",
      sectionTitleVi: "8.1 Khám phá đại dương",
      type: "reading",
      text: "The ocean is very deep and full of life. We took a boat out to see the coral reef. We wore masks and looked under the water. The coral was bright pink and yellow. Small fish swam everywhere. Suddenly, we saw a large sea turtle. It was swimming slowly. The ocean is a beautiful, busy place.",
      textVi: "Đại dương rất sâu và tràn đầy sự sống. Chúng tôi đi thuyền ra ngoài để ngắm rạn san hô. Chúng tôi đeo mặt nạ và nhìn xuống dưới nước. San hô có màu hồng và vàng tươi. Những con cá nhỏ bơi lội khắp nơi. Đột nhiên, chúng tôi nhìn thấy một con rùa biển lớn. Nó đang bơi từ từ. Đại dương là một nơi tuyệt đẹp, nhộn nhịp."
    },
    {
      sectionTitle: "8.2 Ocean mammals",
      sectionTitleVi: "8.2 Động vật có vú ở đại dương",
      type: "information",
      text: "Did you know that some ocean animals are mammals, not fish? Whales and dolphins are mammals. They do not lay eggs. They have babies. They do not breathe underwater like fish do. They must come to the surface of the water to breathe air. The blue whale is the largest mammal on Earth.",
      textVi: "Bạn có biết rằng một số động vật đại dương là động vật có vú chứ không phải cá? Cá voi và cá heo là động vật có vú. Chúng không đẻ trứng. Chúng sinh con. Chúng không thở dưới nước như cá. Chúng phải nổi lên mặt nước để hít thở không khí. Cá voi xanh là động vật có vú lớn nhất trên Trái đất."
    },
    {
      sectionTitle: "8.3 Comparing things",
      sectionTitleVi: "8.3 So sánh các sự vật",
      type: "grammar",
      text: "We use comparative adjectives to compare two things. We add '-er' to short words. 'A shark is faster than a turtle.' 'The ocean is deeper than a river.' We use superlative adjectives to compare three or more things. We add '-est' to short words. 'The blue whale is the biggest animal in the ocean.'",
      textVi: "Chúng ta sử dụng tính từ so sánh hơn để so sánh hai vật. Chúng ta thêm '-er' vào các từ ngắn. 'Một con cá mập thì nhanh hơn một con rùa.' 'Đại dương thì sâu hơn một con sông.' Chúng ta sử dụng tính từ so sánh nhất để so sánh ba vật trở lên. Chúng ta thêm '-est' vào các từ ngắn. 'Cá voi xanh là loài động vật lớn nhất trong đại dương.'"
    },
    {
      sectionTitle: "8.4 The clever octopus",
      sectionTitleVi: "8.4 Chú bạch tuộc thông minh",
      type: "reading",
      text: "The octopus is a very clever animal. It has eight arms and no bones. Because it has no bones, it can hide in very small holes. When an octopus is scared, it shoots out black ink. The ink makes the water dark so the octopus can escape. Some octopuses can even change their color to hide in the sand.",
      textVi: "Bạch tuộc là một loài động vật rất thông minh. Nó có tám xúc tu và không có xương. Vì không có xương nên nó có thể trốn trong những cái lỗ rất nhỏ. Khi một con bạch tuộc sợ hãi, nó sẽ phun ra mực đen. Mực làm cho nước tối đi để bạch tuộc có thể chạy thoát. Một số loài bạch tuộc thậm chí có thể thay đổi màu sắc để trốn trong cát."
    },
    {
      sectionTitle: "8.5 Unit 8 Review",
      sectionTitleVi: "8.5 Ôn tập Bài 8",
      type: "tip",
      text: "Fantastic! You have finished Unit 8 all about sea life.\n\nLet's review what we learned:\n✓ We learned about the busy life on a coral reef.\n✓ We discovered that whales and dolphins are mammals, not fish.\n✓ We practiced using comparative (faster) and superlative (biggest) adjectives.\n✓ We read about how the clever octopus hides from danger.\n\nProtect the ocean! Remember to never throw plastic into the sea.",
      textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 8 về các sinh vật biển.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đã học về cuộc sống nhộn nhịp trên rạn san hô.\n✓ Chúng ta đã phát hiện ra rằng cá voi và cá heo là động vật có vú, không phải cá.\n✓ Chúng ta đã thực hành sử dụng tính từ so sánh hơn (nhanh hơn) và so sánh nhất (lớn nhất).\n✓ Chúng ta đã đọc về cách chú bạch tuộc thông minh trốn tránh nguy hiểm.\n\nHãy bảo vệ đại dương! Hãy nhớ không bao giờ vứt đồ nhựa xuống biển."
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G2 U09: Creatures
  // ══════════════════════════════════════════════════════════════
  'cam_g2_u09': [
    {
      sectionTitle: "9.1 In the garden",
      sectionTitleVi: "9.1 Trong khu vườn",
      type: "reading",
      text: "If you look closely in the garden, you will see many tiny creatures. A green caterpillar is eating a leaf. A spider is spinning a beautiful web to catch flies. Ants are working hard, carrying food to their home under the ground. A ladybird with red wings and black spots lands on my hand. Gardens are full of insects.",
      textVi: "Nếu bạn nhìn kỹ trong khu vườn, bạn sẽ thấy nhiều sinh vật nhỏ bé. Một con sâu bướm xanh đang ăn một chiếc lá. Một con nhện đang giăng một mạng nhện tuyệt đẹp để bắt ruồi. Những con kiến đang làm việc chăm chỉ, mang thức ăn về tổ dưới lòng đất. Một con bọ rùa có đôi cánh màu đỏ và những đốm đen đậu trên tay tôi. Những khu vườn đầy ắp côn trùng."
    },
    {
      sectionTitle: "9.2 What is an insect?",
      sectionTitleVi: "9.2 Côn trùng là gì?",
      type: "information",
      text: "How do you know if a creature is an insect? All insects have six legs. They also have a body with three parts: a head, a thorax, and an abdomen. Many insects have wings and can fly. Bees, ants, and butterflies are insects. Is a spider an insect? No, a spider has eight legs. It is not an insect.",
      textVi: "Làm sao bạn biết một sinh vật có phải là côn trùng hay không? Tất cả các loài côn trùng đều có sáu chân. Chúng cũng có một cơ thể với ba phần: đầu, ngực và bụng. Nhiều loài côn trùng có cánh và có thể bay. Ong, kiến và bướm là côn trùng. Nhện có phải là côn trùng không? Không, nhện có tám chân. Nó không phải là côn trùng."
    },
    {
      sectionTitle: "9.3 Using 'because'",
      sectionTitleVi: "9.3 Sử dụng 'because' (bởi vì)",
      type: "grammar",
      text: "We use the word 'because' to give a reason. It answers the question 'why?'. 'Why is the spider spinning a web?' 'The spider is spinning a web because it wants to catch flies.' 'Why is a spider not an insect?' 'A spider is not an insect because it has eight legs.' Using 'because' makes your sentences longer and more informative.",
      textVi: "Chúng ta sử dụng từ 'because' (bởi vì) để đưa ra lý do. Nó trả lời cho câu hỏi 'tại sao?'. 'Tại sao con nhện lại giăng mạng nhện?' 'Con nhện giăng mạng nhện vì nó muốn bắt ruồi.' 'Tại sao nhện không phải là côn trùng?' 'Nhện không phải là côn trùng vì nó có tám chân.' Sử dụng 'bởi vì' làm cho câu của bạn dài hơn và nhiều thông tin hơn."
    },
    {
      sectionTitle: "9.4 The butterfly's life",
      sectionTitleVi: "9.4 Cuộc đời của một con bướm",
      type: "reading",
      text: "A butterfly has an amazing life. It starts as a tiny egg on a leaf. A hungry caterpillar hatches from the egg. The caterpillar eats and eats. Then, it changes into a chrysalis. It rests inside for a long time. Finally, the chrysalis opens. A beautiful butterfly comes out and flies into the sky.",
      textVi: "Một con bướm có một cuộc sống kỳ diệu. Nó bắt đầu như một quả trứng nhỏ xíu trên một chiếc lá. Một con sâu bướm đói bụng nở ra từ quả trứng. Con sâu bướm ăn và ăn. Sau đó, nó biến thành một cái kén. Nó nghỉ ngơi bên trong một thời gian dài. Cuối cùng, cái kén mở ra. Một con bướm xinh đẹp chui ra và bay lên bầu trời."
    },
    {
      sectionTitle: "9.5 Unit 9 Review",
      sectionTitleVi: "9.5 Ôn tập Bài 9",
      type: "tip",
      text: "Brilliant! You have finished Unit 9 all about creatures.\n\nLet's review what we learned:\n✓ We observed tiny creatures in the garden (ants, spiders, ladybirds).\n✓ We learned that insects have six legs and three body parts.\n✓ We practiced using 'because' to explain why things happen.\n✓ We learned about the amazing life cycle of a butterfly.\n\nGo outside and explore! How many different creatures can you find today?",
      textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 9 về các loài sinh vật.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đã quan sát những sinh vật nhỏ bé trong vườn (kiến, nhện, bọ rùa).\n✓ Chúng ta đã học được rằng côn trùng có sáu chân và ba phần cơ thể.\n✓ Chúng ta đã thực hành sử dụng 'because' (bởi vì) để giải thích lý do tại sao mọi thứ xảy ra.\n✓ Chúng ta đã học về vòng đời kỳ diệu của một con bướm.\n\nHãy ra ngoài và khám phá! Hôm nay bạn có thể tìm thấy bao nhiêu sinh vật khác nhau?"
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G3 U01: Daily Routines
  // ══════════════════════════════════════════════════════════════
  'cam_g3_u01': [
    {
      sectionTitle: "1.1 A busy morning",
      sectionTitleVi: "1.1 Một buổi sáng bận rộn",
      type: "reading",
      text: "Every morning, I wake up at seven o'clock. First, I wash my face and brush my teeth. Then, I put on my school uniform. I go downstairs and eat a healthy breakfast. I usually have cereal and milk. After breakfast, I pack my school bag. I make sure I have my books and pencils. Finally, I say goodbye to my parents and walk to school.",
      textVi: "Mỗi buổi sáng, tôi thức dậy lúc bảy giờ. Đầu tiên, tôi rửa mặt và đánh răng. Sau đó, tôi mặc đồng phục học sinh vào. Tôi đi xuống nhà và ăn một bữa sáng lành mạnh. Tôi thường ăn ngũ cốc và sữa. Sau bữa sáng, tôi sắp xếp cặp sách. Tôi chắc chắn rằng mình đã mang theo sách và bút chì. Cuối cùng, tôi chào tạm biệt cha mẹ và đi bộ đến trường."
    },
    {
      sectionTitle: "1.2 What is a routine?",
      sectionTitleVi: "1.2 Thói quen là gì?",
      type: "information",
      text: "A daily routine is a set of activities you do every day in the same order. Having a routine helps you get ready for the day without forgetting anything. Most children have a morning routine and a bedtime routine. A bedtime routine might include having a bath, reading a story, and going to sleep at the same time.",
      textVi: "Thói quen hàng ngày là một chuỗi các hoạt động bạn làm mỗi ngày theo cùng một thứ tự. Có một thói quen giúp bạn sẵn sàng cho một ngày mới mà không quên bất cứ điều gì. Hầu hết trẻ em đều có thói quen buổi sáng và thói quen trước khi đi ngủ. Thói quen trước khi đi ngủ có thể bao gồm tắm, đọc truyện và đi ngủ vào cùng một thời điểm."
    },
    {
      sectionTitle: "1.3 Time connectives",
      sectionTitleVi: "1.3 Từ nối chỉ thời gian",
      type: "grammar",
      text: "When we write about a routine, we use time connectives to show the order of events. Words like 'first', 'next', 'then', 'after that', and 'finally' are time connectives. 'First, I wake up. Next, I brush my teeth.' These words make our writing clear and easy to follow.",
      textVi: "Khi chúng ta viết về một thói quen, chúng ta sử dụng các từ nối chỉ thời gian để hiển thị thứ tự của các sự kiện. Các từ như 'first' (đầu tiên), 'next' (tiếp theo), 'then' (sau đó), 'after that' (sau điều đó) và 'finally' (cuối cùng) là những từ nối chỉ thời gian. 'Đầu tiên, tôi thức dậy. Tiếp theo, tôi đánh răng.' Những từ này làm cho bài viết của chúng ta rõ ràng và dễ theo dõi."
    },
    {
      sectionTitle: "1.4 Evening time",
      sectionTitleVi: "1.4 Buổi tối",
      type: "reading",
      text: "After school, I do my homework. Mathematics is my favorite subject. After that, I play outside with my friends. When the sun goes down, I come inside for dinner. Then, I take a warm shower. I put on my pajamas and get into bed. My mother reads me a story, and I go to sleep.",
      textVi: "Sau giờ học, tôi làm bài tập về nhà. Toán học là môn học yêu thích của tôi. Sau đó, tôi ra ngoài chơi với bạn bè. Khi mặt trời lặn, tôi vào nhà ăn tối. Sau đó, tôi tắm nước ấm. Tôi mặc đồ ngủ và lên giường. Mẹ tôi đọc cho tôi nghe một câu chuyện, và tôi chìm vào giấc ngủ."
    },
    {
      sectionTitle: "1.5 Unit 1 Review",
      sectionTitleVi: "1.5 Ôn tập Bài 1",
      type: "tip",
      text: "Well done! You have finished Unit 1 all about daily routines.\n\nLet's review what we learned:\n✓ We read about morning and evening routines.\n✓ We understood that a routine is doing things in the same order.\n✓ We practiced using time connectives (first, next, then, finally).\n✓ We talked about the things we do every day.\n\nMake a chart! Write down your morning routine and stick it on your bedroom wall.",
      textVi: "Làm tốt lắm! Bạn đã hoàn thành Bài 1 về các thói quen hàng ngày.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đã đọc về các thói quen buổi sáng và buổi tối.\n✓ Chúng ta đã hiểu rằng một thói quen là làm mọi việc theo cùng một thứ tự.\n✓ Chúng ta đã thực hành sử dụng các từ nối chỉ thời gian (đầu tiên, tiếp theo, sau đó, cuối cùng).\n✓ Chúng ta đã nói về những việc chúng ta làm mỗi ngày.\n\nHãy lập một biểu đồ! Viết ra thói quen buổi sáng của bạn và dán nó lên tường phòng ngủ."
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G3 U02: Party Planning
  // ══════════════════════════════════════════════════════════════
  'cam_g3_u02': [
    {
      sectionTitle: "2.1 The surprise party",
      sectionTitleVi: "2.1 Bữa tiệc bất ngờ",
      type: "reading",
      text: "Today is my sister's birthday. We are planning a surprise party for her. My mother baked a big chocolate cake. My father blew up twenty red balloons. I made a colorful banner that says 'Happy Birthday!'. We invited all her friends. When she came home, we all shouted 'Surprise!'. She was very happy and excited.",
      textVi: "Hôm nay là sinh nhật của em gái tôi. Chúng tôi đang lên kế hoạch cho một bữa tiệc bất ngờ dành cho em ấy. Mẹ tôi đã nướng một chiếc bánh sô cô la lớn. Bố tôi đã thổi hai mươi quả bóng bay màu đỏ. Tôi đã làm một biểu ngữ đầy màu sắc có dòng chữ 'Chúc mừng sinh nhật!'. Chúng tôi đã mời tất cả bạn bè của cô ấy. Khi cô ấy về nhà, tất cả chúng tôi đã hét lên 'Ngạc nhiên chưa!'. Cô ấy rất vui và phấn khích."
    },
    {
      sectionTitle: "2.2 Writing an invitation",
      sectionTitleVi: "2.2 Viết một lời mời",
      type: "information",
      text: "When you have a party, you send invitations to your guests. An invitation must have important information. It needs to tell the guest 'Who' the party is for. It must say 'When' (the date and time) and 'Where' (the place). It also tells them 'What' kind of party it is, like a pool party or a costume party.",
      textVi: "Khi bạn tổ chức một bữa tiệc, bạn gửi giấy mời cho khách của mình. Một lời mời phải có thông tin quan trọng. Nó cần cho khách biết bữa tiệc dành cho 'Ai' (Who). Nó phải ghi rõ 'Khi nào' (When - ngày và giờ) và 'Ở đâu' (Where - địa điểm). Nó cũng cho họ biết đó là 'Loại tiệc gì' (What), chẳng hạn như tiệc hồ bơi hay tiệc hóa trang."
    },
    {
      sectionTitle: "2.3 Future plans",
      sectionTitleVi: "2.3 Kế hoạch tương lai",
      type: "grammar",
      text: "When we talk about things we are planning to do, we use 'going to' or 'will'. 'We are going to have a party on Saturday.' 'I will bake a cake.' 'Going to' is used when the plan is already made. 'Will' is often used when we decide something right now.",
      textVi: "Khi nói về những việc chúng ta định làm, chúng ta sử dụng 'going to' hoặc 'will'. 'Chúng tôi dự định tổ chức một bữa tiệc vào thứ Bảy.' 'Tôi sẽ nướng một cái bánh.' 'Going to' được sử dụng khi kế hoạch đã được lập ra. 'Will' thường được sử dụng khi chúng ta quyết định một điều gì đó ngay lúc này."
    },
    {
      sectionTitle: "2.4 The piñata",
      sectionTitleVi: "2.4 Trò chơi đập kẹo",
      type: "reading",
      text: "At the party, we played many games. The best game was the piñata. The piñata was shaped like a star. It was filled with candies and small toys. We took turns wearing a blindfold and hitting the piñata with a stick. Finally, it broke! Candies fell everywhere. We all scrambled to collect as many as we could.",
      textVi: "Tại bữa tiệc, chúng tôi đã chơi rất nhiều trò chơi. Trò chơi hay nhất là đập kẹo (piñata). Piñata có hình dạng như một ngôi sao. Nó chứa đầy kẹo và đồ chơi nhỏ. Chúng tôi thay phiên nhau bịt mắt và dùng gậy đánh vào piñata. Cuối cùng, nó đã vỡ! Kẹo rơi khắp nơi. Tất cả chúng tôi đều tranh nhau thu thập càng nhiều càng tốt."
    },
    {
      sectionTitle: "2.5 Unit 2 Review",
      sectionTitleVi: "2.5 Ôn tập Bài 2",
      type: "tip",
      text: "Fantastic! You have finished Unit 2 all about party planning.\n\nLet's review what we learned:\n✓ We read about preparing for a surprise birthday party.\n✓ We learned what information must be on an invitation (Who, When, Where).\n✓ We practiced using 'going to' and 'will' for future plans.\n✓ We read about playing fun party games.\n\nDesign an invitation! Pretend you are having a party and write an invitation for a friend.",
      textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 2 về việc lên kế hoạch cho bữa tiệc.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đã đọc về việc chuẩn bị cho một bữa tiệc sinh nhật bất ngờ.\n✓ Chúng ta đã học được những thông tin nào phải có trong lời mời (Ai, Khi nào, Ở đâu).\n✓ Chúng ta đã thực hành sử dụng 'going to' và 'will' cho các kế hoạch tương lai.\n✓ Chúng ta đã đọc về việc chơi các trò chơi tiệc tùng thú vị.\n\nHãy thiết kế một lời mời! Giả vờ như bạn đang tổ chức một bữa tiệc và viết một lời mời cho một người bạn."
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G3 U03: Senses & Art
  // ══════════════════════════════════════════════════════════════
  'cam_g3_u03': [
    {
      sectionTitle: "3.1 The five senses",
      sectionTitleVi: "3.1 Năm giác quan",
      type: "reading",
      text: "We use our five senses to explore the world. We use our eyes to see colors and shapes. We use our ears to hear music and voices. We use our nose to smell flowers and food. We use our tongue to taste sweet or sour things. We use our skin to feel if something is hot, cold, soft, or rough. Our senses are amazing.",
      textVi: "Chúng ta sử dụng năm giác quan của mình để khám phá thế giới. Chúng ta sử dụng đôi mắt để nhìn màu sắc và hình dạng. Chúng ta sử dụng đôi tai để nghe âm nhạc và giọng nói. Chúng ta sử dụng mũi để ngửi hoa và thức ăn. Chúng ta sử dụng lưỡi để nếm đồ ngọt hoặc chua. Chúng ta sử dụng làn da của mình để cảm nhận xem một cái gì đó nóng, lạnh, mềm hay thô ráp. Giác quan của chúng ta thật tuyệt vời."
    },
    {
      sectionTitle: "3.2 Experiencing art",
      sectionTitleVi: "3.2 Trải nghiệm nghệ thuật",
      type: "information",
      text: "Artists use our senses to make us feel things. A painter uses bright colors to make us feel happy. A musician plays loud, fast music to make us feel excited. A sculptor makes a statue with a rough texture. When we look at art, listen to music, or read a poem, we use our senses to understand what the artist wants to share.",
      textVi: "Các nghệ sĩ sử dụng các giác quan của chúng ta để khiến chúng ta cảm nhận được nhiều thứ. Một họa sĩ sử dụng màu sắc tươi sáng để làm cho chúng ta cảm thấy hạnh phúc. Một nhạc sĩ chơi bản nhạc lớn, nhịp độ nhanh để khiến chúng ta cảm thấy phấn khích. Một nhà điêu khắc tạo ra một bức tượng với bề mặt thô ráp. Khi chúng ta xem nghệ thuật, nghe nhạc hoặc đọc một bài thơ, chúng ta sử dụng các giác quan của mình để hiểu những gì nghệ sĩ muốn chia sẻ."
    },
    {
      sectionTitle: "3.3 Adjectives for senses",
      sectionTitleVi: "3.3 Tính từ chỉ giác quan",
      type: "grammar",
      text: "We have special adjectives to describe what we sense. For sight: bright, dark, shiny. For hearing: loud, quiet, noisy. For smell: sweet, fresh, smelly. For taste: sour, salty, delicious. For touch: smooth, rough, soft. Using these words helps the reader imagine exactly what you are describing.",
      textVi: "Chúng ta có những tính từ đặc biệt để miêu tả những gì chúng ta cảm nhận được. Đối với thị giác: sáng, tối, bóng láng. Đối với thính giác: to, nhỏ, ồn ào. Đối với khứu giác: ngọt ngào, tươi mát, bốc mùi. Đối với vị giác: chua, mặn, ngon. Đối với xúc giác: mịn màng, thô ráp, mềm mại. Sử dụng những từ này giúp người đọc hình dung chính xác những gì bạn đang miêu tả."
    },
    {
      sectionTitle: "3.4 A walk in the forest",
      sectionTitleVi: "3.4 Đi dạo trong rừng",
      type: "reading",
      text: "I walked in the forest today. I saw tall green trees and small blue flowers. I heard the birds singing a sweet song. I smelled the fresh, damp earth. I touched the rough bark of a pine tree. Later, I ate a delicious, sweet apple. My forest walk was wonderful for all my senses.",
      textVi: "Tôi đã đi dạo trong rừng hôm nay. Tôi nhìn thấy những cây xanh cao lớn và những bông hoa nhỏ màu xanh lam. Tôi nghe thấy bầy chim hót một bài hát ngọt ngào. Tôi ngửi thấy mùi đất ẩm ướt, trong lành. Tôi chạm vào lớp vỏ sần sùi của một cây thông. Sau đó, tôi ăn một quả táo ngon ngọt. Chuyến đi dạo trong rừng của tôi thật tuyệt vời đối với mọi giác quan của tôi."
    },
    {
      sectionTitle: "3.5 Unit 3 Review",
      sectionTitleVi: "3.5 Ôn tập Bài 3",
      type: "tip",
      text: "Great work! You have finished Unit 3 all about the senses and art.\n\nLet's review what we learned:\n✓ We learned about the five senses (sight, hearing, smell, taste, touch).\n✓ We discussed how artists use senses to make us feel emotions.\n✓ We practiced using adjectives to describe what we sense (shiny, salty, rough).\n✓ We read about experiencing the forest using all our senses.\n\nEat a piece of fruit! Describe its color, smell, texture, and taste to a friend.",
      textVi: "Làm tốt lắm! Bạn đã hoàn thành Bài 3 về các giác quan và nghệ thuật.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đã học về năm giác quan (thị giác, thính giác, khứu giác, vị giác, xúc giác).\n✓ Chúng ta đã thảo luận về cách các nghệ sĩ sử dụng các giác quan để làm cho chúng ta cảm nhận được cảm xúc.\n✓ Chúng ta đã thực hành sử dụng tính từ để miêu tả những gì chúng ta cảm nhận được (sáng bóng, mặn, thô ráp).\n✓ Chúng ta đã đọc về việc trải nghiệm khu rừng bằng tất cả các giác quan của mình.\n\nHãy ăn một miếng trái cây! Miêu tả màu sắc, mùi, kết cấu và mùi vị của nó cho một người bạn nghe."
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G3 U04: Volcanoes & Fire
  // ══════════════════════════════════════════════════════════════
  'cam_g3_u04': [
    {
      sectionTitle: "4.1 The angry mountain",
      sectionTitleVi: "4.1 Ngọn núi giận dữ",
      type: "reading",
      text: "A volcano is like a mountain with a hole at the top. Deep inside the Earth, it is very hot. Rock becomes liquid, which is called magma. Sometimes, the magma comes out of the volcano. When it comes out, it is called lava. A volcano erupting is very dangerous. It shoots ash and fire high into the sky.",
      textVi: "Núi lửa giống như một ngọn núi có một cái lỗ ở trên đỉnh. Sâu bên trong Trái đất, trời rất nóng. Đá biến thành chất lỏng, được gọi là magma. Đôi khi, magma trào ra khỏi núi lửa. Khi trào ra ngoài, nó được gọi là dung nham (lava). Núi lửa phun trào rất nguy hiểm. Nó bắn tro và lửa lên cao tít trên bầu trời."
    },
    {
      sectionTitle: "4.2 Fire safety",
      sectionTitleVi: "4.2 An toàn phòng cháy",
      type: "information",
      text: "Fire is useful, but it can also be dangerous. It keeps us warm and cooks our food. However, we must be careful. Never play with matches or candles. If you see a fire, do not hide. You must go outside immediately and call for help. Tell an adult or call the emergency services.",
      textVi: "Lửa rất hữu ích, nhưng nó cũng có thể gây nguy hiểm. Nó giữ ấm cho chúng ta và nấu chín thức ăn của chúng ta. Tuy nhiên, chúng ta phải cẩn thận. Không bao giờ chơi với diêm hoặc nến. Nếu bạn thấy có hỏa hoạn, đừng trốn. Bạn phải ra ngoài ngay lập tức và kêu cứu. Hãy nói với người lớn hoặc gọi cho các dịch vụ khẩn cấp."
    },
    {
      sectionTitle: "4.3 Action verbs",
      sectionTitleVi: "4.3 Động từ chỉ hành động",
      type: "grammar",
      text: "Action verbs tell us what someone or something is doing. In the sentence 'The volcano erupts', the word 'erupts' is the action verb. In 'The firefighter runs to the house', the word 'runs' is the action verb. Action verbs make sentences exciting and help us picture the action.",
      textVi: "Động từ chỉ hành động cho chúng ta biết một người hoặc vật nào đó đang làm gì. Trong câu 'The volcano erupts' (Núi lửa phun trào), từ 'erupts' là động từ chỉ hành động. Trong câu 'The firefighter runs to the house' (Lính cứu hỏa chạy đến nhà), từ 'runs' là động từ chỉ hành động. Các động từ chỉ hành động làm cho câu trở nên thú vị và giúp chúng ta hình dung ra hành động đó."
    },
    {
      sectionTitle: "4.4 Pompeii",
      sectionTitleVi: "4.4 Thành phố Pompeii",
      type: "reading",
      text: "Pompeii was an ancient Roman city. A long time ago, a huge volcano called Mount Vesuvius erupted near the city. Ash covered the whole town very quickly. The ash buried the buildings and the people. For hundreds of years, the city was hidden. Today, archaeologists have dug up Pompeii, and we can see how people lived long ago.",
      textVi: "Pompeii là một thành phố cổ của La Mã. Từ rất lâu rồi, một ngọn núi lửa khổng lồ có tên là núi Vesuvius đã phun trào gần thành phố. Tro bụi bao phủ toàn bộ thị trấn rất nhanh. Tro đã vùi lấp các tòa nhà và con người. Hàng trăm năm qua, thành phố này đã bị che giấu. Ngày nay, các nhà khảo cổ học đã đào được Pompeii và chúng ta có thể thấy cách con người sống cách đây rất lâu."
    },
    {
      sectionTitle: "4.5 Unit 4 Review",
      sectionTitleVi: "4.5 Ôn tập Bài 4",
      type: "tip",
      text: "Excellent! You have finished Unit 4 all about volcanoes and fire.\n\nLet's review what we learned:\n✓ We learned how a volcano erupts and produces lava.\n✓ We understood important rules for fire safety.\n✓ We practiced identifying action verbs (erupt, run, bury).\n✓ We read the historical story of Pompeii and Mount Vesuvius.\n\nDraw a volcano! Use bright colors like red and orange for the lava.",
      textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 4 về núi lửa và lửa.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đã học cách một ngọn núi lửa phun trào và tạo ra dung nham.\n✓ Chúng ta đã hiểu các quy tắc quan trọng về an toàn phòng cháy.\n✓ Chúng ta đã thực hành xác định các động từ chỉ hành động (phun trào, chạy, chôn vùi).\n✓ Chúng ta đã đọc câu chuyện lịch sử về Pompeii và núi Vesuvius.\n\nHãy vẽ một ngọn núi lửa! Sử dụng các màu sắc tươi sáng như đỏ và cam cho dung nham."
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G3 U05: Writing Letters
  // ══════════════════════════════════════════════════════════════
  'cam_g3_u05': [
    {
      sectionTitle: "5.1 A letter to Grandma",
      sectionTitleVi: "5.1 Một lá thư gửi bà",
      type: "reading",
      text: "Dear Grandma, How are you? I am writing to tell you about my new school. My teacher is very nice, and I have made a new friend named Sam. We play football together during the break. I am learning how to paint in art class. I miss you very much. Please write back soon. Lots of love, Lily.",
      textVi: "Bà nội thân mến, Bà dạo này thế nào? Cháu viết thư này để kể cho bà nghe về ngôi trường mới của cháu. Cô giáo của cháu rất tốt, và cháu đã kết bạn với một người bạn mới tên là Sam. Chúng cháu cùng nhau chơi bóng đá trong giờ giải lao. Cháu đang học cách vẽ trong lớp học mỹ thuật. Cháu nhớ bà rất nhiều. Bà hãy viết thư lại cho cháu sớm nhé. Yêu bà nhiều, Lily."
    },
    {
      sectionTitle: "5.2 Parts of a letter",
      sectionTitleVi: "5.2 Các phần của một bức thư",
      type: "information",
      text: "A friendly letter has different parts. At the top, we write the date. Then we write a greeting, like 'Dear'. Next is the body of the letter, where we write our message. At the end, we write a closing, like 'Yours sincerely' or 'Love'. Finally, we sign our name at the bottom.",
      textVi: "Một bức thư thân mật có các phần khác nhau. Ở phần trên cùng, chúng ta viết ngày tháng. Sau đó, chúng ta viết lời chào, như 'Dear' (Thân mến). Tiếp theo là phần thân của bức thư, nơi chúng ta viết thông điệp của mình. Ở cuối thư, chúng ta viết lời kết thúc, chẳng hạn như 'Yours sincerely' (Trân trọng) hoặc 'Love' (Yêu thương). Cuối cùng, chúng ta ký tên ở dưới cùng."
    },
    {
      sectionTitle: "5.3 Asking questions",
      sectionTitleVi: "5.3 Đặt câu hỏi",
      type: "grammar",
      text: "When we write a letter, it is polite to ask the other person questions. We use question words like 'Who', 'What', 'Where', 'When', 'Why', and 'How'. 'How are you?' 'What did you do on the weekend?' Don't forget to put a question mark (?) at the end of the sentence.",
      textVi: "Khi chúng ta viết một bức thư, thật lịch sự khi đặt câu hỏi cho người kia. Chúng ta sử dụng các từ để hỏi như 'Who' (Ai), 'What' (Cái gì), 'Where' (Ở đâu), 'When' (Khi nào), 'Why' (Tại sao), và 'How' (Như thế nào). 'Bạn có khỏe không?' 'Bạn đã làm gì vào cuối tuần?' Đừng quên đặt một dấu chấm hỏi (?) ở cuối câu."
    },
    {
      sectionTitle: "5.4 The postal service",
      sectionTitleVi: "5.4 Dịch vụ bưu chính",
      type: "reading",
      text: "When you finish writing a letter, you put it in an envelope. You must write the address on the front and stick a stamp on it. Then, you drop it in a postbox. A postman collects the letters. The letters travel by truck or airplane to different cities. Finally, another postman delivers the letter to your friend's house.",
      textVi: "Khi bạn viết xong một bức thư, bạn đặt nó vào một chiếc phong bì. Bạn phải viết địa chỉ ở mặt trước và dán tem lên đó. Sau đó, bạn thả nó vào hòm thư. Người đưa thư thu thập các bức thư. Các bức thư đi bằng xe tải hoặc máy bay đến các thành phố khác nhau. Cuối cùng, một người đưa thư khác chuyển lá thư đến nhà bạn của bạn."
    },
    {
      sectionTitle: "5.5 Unit 5 Review",
      sectionTitleVi: "5.5 Ôn tập Bài 5",
      type: "tip",
      text: "Brilliant! You have finished Unit 5 all about writing letters.\n\nLet's review what we learned:\n✓ We read a friendly letter to a grandmother.\n✓ We learned the parts of a letter (date, greeting, body, closing, signature).\n✓ We practiced asking questions using words like 'Who', 'What', and 'How'.\n✓ We learned how letters travel through the postal service.\n\nWrite a postcard! Imagine you are on holiday and write a short message to a friend.",
      textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 5 về việc viết thư.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đã đọc một bức thư thân mật gửi cho một người bà.\n✓ Chúng ta đã học các phần của một bức thư (ngày tháng, lời chào, phần thân, lời kết, chữ ký).\n✓ Chúng ta đã thực hành đặt câu hỏi bằng cách sử dụng các từ như 'Ai', 'Cái gì' và 'Như thế nào'.\n✓ Chúng ta đã biết cách các lá thư di chuyển qua dịch vụ bưu chính.\n\nHãy viết một tấm bưu thiếp! Hãy tưởng tượng bạn đang trong kỳ nghỉ và viết một tin nhắn ngắn cho một người bạn."
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G3 U06: World Poems
  // ══════════════════════════════════════════════════════════════
  'cam_g3_u06': [
    {
      sectionTitle: "6.1 Playing with words",
      sectionTitleVi: "6.1 Chơi chữ",
      type: "reading",
      text: "Poems are special because they play with words. Sometimes the words rhyme, which means they sound the same at the end. Like 'cat' and 'hat', or 'play' and 'day'. Poems also have a rhythm, like the beat of a drum. Reading a poem out loud is like singing a song without music. Poems can make us laugh or feel peaceful.",
      textVi: "Những bài thơ thật đặc biệt vì chúng chơi đùa với ngôn từ. Đôi khi các từ có vần với nhau, nghĩa là chúng có âm giống nhau ở phần cuối. Giống như 'cat' (mèo) và 'hat' (mũ), hoặc 'play' (chơi) và 'day' (ngày). Thơ cũng có nhịp điệu, giống như nhịp trống. Đọc to một bài thơ giống như hát một bài hát mà không có nhạc. Thơ có thể làm cho chúng ta cười hoặc cảm thấy bình yên."
    },
    {
      sectionTitle: "6.2 Types of poems",
      sectionTitleVi: "6.2 Các thể loại thơ",
      type: "information",
      text: "There are many types of poems. A haiku is a short poem from Japan. It does not rhyme. It usually describes nature. A limerick is a funny poem from Ireland. It has five lines and a bouncy rhythm. Acrostic poems use the letters of a word to start each line. Poems can be any shape or size.",
      textVi: "Có rất nhiều thể loại thơ. Thơ Haiku là một thể thơ ngắn đến từ Nhật Bản. Nó không có vần. Nó thường miêu tả thiên nhiên. Limerick là một bài thơ hài hước đến từ Ireland. Nó có năm dòng và một nhịp điệu nảy. Thơ Acrostic (thơ tạo chữ) sử dụng các chữ cái của một từ để bắt đầu mỗi dòng. Thơ có thể có bất kỳ hình dạng hoặc kích thước nào."
    },
    {
      sectionTitle: "6.3 Rhyming words",
      sectionTitleVi: "6.3 Những từ có vần điệu",
      type: "grammar",
      text: "Finding rhyming words is fun. Words rhyme when the end sounds match. 'Star' rhymes with 'car' and 'far'. 'Blue' rhymes with 'shoe' and 'zoo'. When we write a poem, we often put rhyming words at the end of the lines. This makes the poem sound musical when we read it aloud.",
      textVi: "Việc tìm kiếm những từ có vần điệu rất thú vị. Các từ có vần điệu khi âm thanh kết thúc khớp nhau. 'Star' (ngôi sao) vần với 'car' (ô tô) và 'far' (xa). 'Blue' (màu xanh) vần với 'shoe' (chiếc giày) và 'zoo' (sở thú). Khi chúng ta viết một bài thơ, chúng ta thường đặt các từ có vần ở cuối các dòng. Điều này làm cho bài thơ nghe có tính nhạc khi chúng ta đọc to lên."
    },
    {
      sectionTitle: "6.4 The wind",
      sectionTitleVi: "6.4 Gió",
      type: "reading",
      text: "Who has seen the wind?\nNeither I nor you.\nBut when the leaves hang trembling,\nThe wind is passing through.\n\nWho has seen the wind?\nNeither you nor I.\nBut when the trees bow down their heads,\nThe wind is passing by.",
      textVi: "Ai đã từng thấy gió?\nCả tôi và bạn đều không.\nNhưng khi những chiếc lá rung rinh,\nLà gió đang đi qua.\n\nAi đã từng thấy gió?\nCả bạn và tôi đều không.\nNhưng khi những cái cây cúi đầu,\nLà gió đang lướt qua."
    },
    {
      sectionTitle: "6.5 Unit 6 Review",
      sectionTitleVi: "6.5 Ôn tập Bài 6",
      type: "tip",
      text: "Fantastic! You have finished Unit 6 all about world poems.\n\nLet's review what we learned:\n✓ We learned that poems play with words, rhyme, and rhythm.\n✓ We discovered different types of poems like haikus and limericks.\n✓ We practiced finding rhyming words (cat/hat, blue/zoo).\n✓ We read a beautiful classic poem about the wind.\n\nWrite a short poem! Try writing an acrostic poem using your own name.",
      textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 6 về các bài thơ trên thế giới.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đã học được rằng những bài thơ đùa giỡn với từ ngữ, vần và nhịp điệu.\n✓ Chúng ta đã khám phá các loại thơ khác nhau như thơ haiku và limerick.\n✓ Chúng ta đã thực hành tìm kiếm các từ có vần (cat/hat, blue/zoo).\n✓ Chúng ta đã đọc một bài thơ cổ điển tuyệt đẹp về gió.\n\nHãy viết một bài thơ ngắn! Hãy thử viết một bài thơ dùng chữ cái đầu tên của chính bạn."
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G3 U07: Fantasy Creatures
  // ══════════════════════════════════════════════════════════════
  'cam_g3_u07': [
    {
      sectionTitle: "7.1 Myths and legends",
      sectionTitleVi: "7.1 Thần thoại và truyền thuyết",
      type: "reading",
      text: "Many old stories are full of fantasy creatures. Some stories tell of brave knights who fight huge, fire-breathing dragons. Other legends speak of mermaids who live deep in the ocean and sing beautiful songs to sailors. There are also stories about unicorns, which look like white horses with a single horn on their head. These creatures are not real, but they are fun to read about.",
      textVi: "Nhiều câu chuyện xưa đầy ắp những sinh vật huyền thoại. Một số câu chuyện kể về những hiệp sĩ dũng cảm chiến đấu với những con rồng khổng lồ, phun lửa. Những truyền thuyết khác kể về những nàng tiên cá sống sâu dưới đại dương và hát những bài hát tuyệt hay cho các thủy thủ nghe. Cũng có những câu chuyện về kỳ lân, trông giống như những con ngựa trắng với một chiếc sừng duy nhất trên đầu. Những sinh vật này không có thật, nhưng đọc về chúng rất thú vị."
    },
    {
      sectionTitle: "7.2 Describing fantasy",
      sectionTitleVi: "7.2 Miêu tả sự giả tưởng",
      type: "information",
      text: "When writers invent fantasy creatures, they often combine parts of real animals. For example, a griffin has the head and wings of an eagle, and the body of a lion. A centaur has the upper body of a human and the lower body of a horse. Combining these features makes the creatures look powerful and magical.",
      textVi: "Khi các nhà văn phát minh ra các sinh vật huyền thoại, họ thường kết hợp các bộ phận của các loài động vật có thật. Ví dụ, một con điểu sư (griffin) có đầu và cánh của đại bàng, và cơ thể của một con sư tử. Nhân mã (centaur) có phần thân trên của con người và phần thân dưới của một con ngựa. Việc kết hợp những đặc điểm này làm cho các sinh vật trông mạnh mẽ và đầy phép thuật."
    },
    {
      sectionTitle: "7.3 Making comparisons",
      sectionTitleVi: "7.3 Đưa ra sự so sánh",
      type: "grammar",
      text: "We use 'as...as' to show that two things are the same in some way. 'The dragon was as big as a mountain.' 'The unicorn was as white as snow.' We use 'not as...as' to show a difference. 'A goblin is not as tall as a giant.' These comparisons help us imagine the creatures better.",
      textVi: "Chúng ta sử dụng 'as...as' (như...như) để chỉ ra rằng hai thứ giống nhau về mặt nào đó. 'Con rồng to như một ngọn núi.' 'Kỳ lân trắng như tuyết.' Chúng ta sử dụng 'not as...as' (không...như) để chỉ ra sự khác biệt. 'Yêu tinh không cao bằng một người khổng lồ.' Những so sánh này giúp chúng ta hình dung các sinh vật tốt hơn."
    },
    {
      sectionTitle: "7.4 The friendly giant",
      sectionTitleVi: "7.4 Người khổng lồ thân thiện",
      type: "reading",
      text: "Once, there was a giant named Grob. He was as tall as a tree, but he was very gentle. The village people were afraid of him because of his size. One day, a huge rock fell and blocked the river. The village had no water. Grob easily pushed the rock away. From that day on, the people knew that Grob was a kind friend.",
      textVi: "Ngày xưa, có một người khổng lồ tên là Grob. Anh ta cao như một cái cây, nhưng rất hiền lành. Người dân trong làng sợ anh ta vì kích thước của anh ta. Một ngày nọ, một tảng đá khổng lồ rơi xuống và chặn dòng sông. Ngôi làng không có nước. Grob dễ dàng đẩy tảng đá đi. Kể từ ngày đó, mọi người biết rằng Grob là một người bạn tốt bụng."
    },
    {
      sectionTitle: "7.5 Unit 7 Review",
      sectionTitleVi: "7.5 Ôn tập Bài 7",
      type: "tip",
      text: "Fantastic! You have finished Unit 7 all about fantasy creatures.\n\nLet's review what we learned:\n✓ We read about legendary creatures like dragons, mermaids, and unicorns.\n✓ We discovered how writers invent creatures by combining animal parts.\n✓ We practiced using 'as...as' to make comparisons.\n✓ We read a story about a giant who helped a village.\n\nInvent your own creature! Draw it and write a short paragraph describing it.",
      textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 7 về các sinh vật huyền thoại.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đã đọc về các sinh vật huyền thoại như rồng, nàng tiên cá và kỳ lân.\n✓ Chúng ta đã khám phá cách các nhà văn phát minh ra các sinh vật bằng cách kết hợp các bộ phận của động vật.\n✓ Chúng ta đã thực hành sử dụng 'as...as' để đưa ra so sánh.\n✓ Chúng ta đã đọc một câu chuyện về một người khổng lồ giúp đỡ ngôi làng.\n\nHãy phát minh ra sinh vật của riêng bạn! Vẽ nó và viết một đoạn văn ngắn miêu tả nó."
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G3 U08: Our Wonderful World
  // ══════════════════════════════════════════════════════════════
  'cam_g3_u08': [
    {
      sectionTitle: "8.1 Amazing landscapes",
      sectionTitleVi: "8.1 Những cảnh quan tuyệt vời",
      type: "reading",
      text: "Our planet has many different landscapes. There are high mountains covered in white snow. There are deep, blue oceans full of fish. There are dry deserts where it hardly ever rains. And there are thick, green forests where lots of animals live. Every part of the world is unique and beautiful.",
      textVi: "Hành tinh của chúng ta có nhiều cảnh quan khác nhau. Có những ngọn núi cao phủ đầy tuyết trắng. Có những đại dương sâu thẳm, xanh biếc đầy ắp cá. Có những sa mạc khô cằn nơi hầu như không bao giờ có mưa. Và có những khu rừng xanh rì, rậm rạp nơi có rất nhiều động vật sinh sống. Mọi nơi trên thế giới đều độc đáo và tuyệt đẹp."
    },
    {
      sectionTitle: "8.2 The water cycle",
      sectionTitleVi: "8.2 Vòng tuần hoàn của nước",
      type: "information",
      text: "Water is always moving. The sun heats the water in the ocean, and it turns into invisible gas called water vapor. This goes up into the sky to make clouds. When the clouds get heavy, the water falls back down as rain or snow. The rain flows into rivers, and the rivers flow back into the ocean. This is the water cycle.",
      textVi: "Nước luôn luôn chuyển động. Mặt trời làm nóng nước trong đại dương, và nó biến thành khí vô hình gọi là hơi nước. Hơi nước bay lên bầu trời để tạo thành mây. Khi những đám mây trở nên nặng nề, nước rơi trở lại dưới dạng mưa hoặc tuyết. Mưa chảy vào các dòng sông, và các dòng sông chảy ngược ra đại dương. Đây là vòng tuần hoàn của nước."
    },
    {
      sectionTitle: "8.3 Using 'should' and 'shouldn't'",
      sectionTitleVi: "8.3 Sử dụng 'should' và 'shouldn't'",
      type: "grammar",
      text: "We use 'should' and 'shouldn't' to give advice about protecting our world. 'We should recycle our rubbish.' 'We shouldn't waste water.' 'Should' tells us what is a good idea to do. 'Shouldn't' tells us what is a bad idea. We all have a responsibility to care for the Earth.",
      textVi: "Chúng ta sử dụng 'should' (nên) và 'shouldn't' (không nên) để đưa ra lời khuyên về việc bảo vệ thế giới của chúng ta. 'Chúng ta nên tái chế rác thải của mình.' 'Chúng ta không nên lãng phí nước.' 'Nên' cho chúng ta biết điều gì là một ý kiến hay để làm. 'Không nên' cho chúng ta biết điều gì là một ý kiến tồi. Tất cả chúng ta đều có trách nhiệm chăm sóc Trái đất."
    },
    {
      sectionTitle: "8.4 Saving the turtles",
      sectionTitleVi: "8.4 Giải cứu rùa biển",
      type: "reading",
      text: "Last summer, our class went to the beach to help clean up the rubbish. We picked up plastic bottles and bags. The guide told us that sea turtles often mistake plastic bags for jellyfish and eat them. Eating plastic makes the turtles very sick. By keeping the beach clean, we helped to save the turtles' lives.",
      textVi: "Mùa hè năm ngoái, lớp chúng tôi đã đến bãi biển để giúp dọn dẹp rác. Chúng tôi đã nhặt chai và túi nhựa. Hướng dẫn viên nói với chúng tôi rằng rùa biển thường nhầm túi nhựa với sứa và ăn chúng. Ăn nhựa khiến những con rùa bị bệnh rất nặng. Bằng cách giữ cho bãi biển sạch sẽ, chúng tôi đã giúp cứu mạng sống của những chú rùa."
    },
    {
      sectionTitle: "8.5 Unit 8 Review",
      sectionTitleVi: "8.5 Ôn tập Bài 8",
      type: "tip",
      text: "Great work! You have finished Unit 8 all about our wonderful world.\n\nLet's review what we learned:\n✓ We learned about different landscapes (mountains, deserts, forests).\n✓ We understood how the water cycle works.\n✓ We practiced using 'should' and 'shouldn't' to give advice.\n✓ We read about the importance of keeping our oceans clean.\n\nThink about one thing you can do every day to help the Earth. Maybe you can turn off the lights when you leave a room!",
      textVi: "Làm tốt lắm! Bạn đã hoàn thành Bài 8 về thế giới tuyệt vời của chúng ta.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đã học về các cảnh quan khác nhau (núi, sa mạc, rừng).\n✓ Chúng ta đã hiểu vòng tuần hoàn của nước hoạt động như thế nào.\n✓ Chúng ta đã thực hành sử dụng 'should' (nên) và 'shouldn't' (không nên) để đưa ra lời khuyên.\n✓ Chúng ta đã đọc về tầm quan trọng của việc giữ cho đại dương của chúng ta sạch sẽ.\n\nHãy nghĩ về một việc bạn có thể làm mỗi ngày để giúp đỡ Trái đất. Có thể bạn có thể tắt đèn khi rời khỏi phòng!"
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G3 U09: Comedy & Jokes
  // ══════════════════════════════════════════════════════════════
  'cam_g3_u09': [
    {
      sectionTitle: "9.1 What makes us laugh?",
      sectionTitleVi: "9.1 Điều gì làm chúng ta cười?",
      type: "reading",
      text: "Laughter is very good for us. It makes us feel happy and relaxed. There are many things that make us laugh. We laugh at funny faces, silly clowns, and clever jokes. Sometimes, people do physical comedy, like slipping on a banana peel or dropping a cake. Cartoons are also very funny because impossible things happen in them.",
      textVi: "Cười rất tốt cho chúng ta. Nó làm cho chúng ta cảm thấy vui vẻ và thư giãn. Có rất nhiều thứ khiến chúng ta cười. Chúng ta cười trước những khuôn mặt buồn cười, những chú hề ngốc nghếch và những câu chuyện cười thông minh. Đôi khi, mọi người làm hài kịch hình thể, như trượt vỏ chuối hoặc làm rơi một chiếc bánh. Phim hoạt hình cũng rất hài hước vì những điều không tưởng xảy ra trong đó."
    },
    {
      sectionTitle: "9.2 How a joke works",
      sectionTitleVi: "9.2 Một câu chuyện cười hoạt động như thế nào",
      type: "information",
      text: "A joke usually has two parts. The first part is the setup. It gives you some information or asks a question. The second part is the punchline. The punchline is the surprising or funny answer. For example: 'Why did the cow cross the road? (Setup) To get to the udder side! (Punchline)'.",
      textVi: "Một câu chuyện cười thường có hai phần. Phần đầu tiên là phần thiết lập (setup). Nó cung cấp cho bạn một số thông tin hoặc đặt một câu hỏi. Phần thứ hai là điểm nhấn (punchline). Điểm nhấn là câu trả lời bất ngờ hoặc hài hước. Ví dụ: 'Tại sao con bò lại băng qua đường? (Thiết lập) Để sang bờ bên kia! (Điểm nhấn - chơi chữ udder/other)'."
    },
    {
      sectionTitle: "9.3 Direct speech",
      sectionTitleVi: "9.3 Lời nói trực tiếp",
      type: "grammar",
      text: "When we write down exactly what someone says, we use direct speech. We must use speech marks (\"\") around the words. Tom said, \"This joke is very funny!\" The teacher asked, \"Why are you laughing?\" Using direct speech makes stories and jokes more lively and interesting to read.",
      textVi: "Khi chúng ta viết ra chính xác những gì ai đó nói, chúng ta sử dụng lời nói trực tiếp. Chúng ta phải sử dụng dấu ngoặc kép (\"\") xung quanh các từ. Tom nói: \"Câu chuyện cười này rất hài hước!\" Cô giáo hỏi: \"Tại sao em lại cười?\" Sử dụng lời nói trực tiếp làm cho các câu chuyện và câu chuyện cười trở nên sống động và thú vị hơn khi đọc."
    },
    {
      sectionTitle: "9.4 The silly parrot",
      sectionTitleVi: "9.4 Chú vẹt ngốc nghếch",
      type: "reading",
      text: "A man had a parrot that learned to speak. One day, the man was looking for his glasses. He looked on the table and under the chair. He couldn't find them anywhere. Suddenly, the parrot said, \"Look on your head!\" The man touched his head, and there were his glasses. He laughed and said, \"You are smarter than me!\"",
      textVi: "Một người đàn ông có một con vẹt học nói. Một ngày nọ, người đàn ông đang tìm kính của mình. Ông tìm trên bàn và dưới ghế. Ông không thể tìm thấy chúng ở đâu cả. Đột nhiên, con vẹt nói: \"Hãy nhìn trên đầu ông kìa!\" Người đàn ông sờ lên đầu, và cặp kính của ông ở đó. Ông cười và nói: \"Mày thông minh hơn tao đấy!\""
    },
    {
      sectionTitle: "9.5 Unit 9 Review",
      sectionTitleVi: "9.5 Ôn tập Bài 9",
      type: "tip",
      text: "Brilliant! You have finished Unit 9 all about comedy and jokes.\n\nLet's review what we learned:\n✓ We discussed the different things that make us laugh.\n✓ We learned that a joke has a setup and a funny punchline.\n✓ We practiced using speech marks (\"\") for direct speech.\n✓ We read a funny story about a clever parrot.\n\nTell a joke! Find a funny joke and tell it to your family to make them smile.",
      textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 9 về hài kịch và truyện cười.\n\nHãy ôn lại những gì chúng ta đã học:\n✓ Chúng ta đã thảo luận về những điều khác nhau khiến chúng ta cười.\n✓ Chúng ta đã biết rằng một câu chuyện cười có phần thiết lập và một điểm nhấn hài hước.\n✓ Chúng ta đã thực hành sử dụng dấu ngoặc kép (\"\") cho lời nói trực tiếp.\n✓ Chúng ta đã đọc một câu chuyện hài hước về một chú vẹt thông minh.\n\nHãy kể một câu chuyện cười! Hãy tìm một câu chuyện hài hước và kể cho gia đình bạn nghe để làm họ mỉm cười."
    }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G4 U01: Saving the Planet
  // ══════════════════════════════════════════════════════════════
  'cam_g4_u01': [
    { sectionTitle: "1.1 Pollution problems", sectionTitleVi: "1.1 Vấn đề ô nhiễm", type: "reading", text: "Our planet is in danger. Pollution is harming the air, water, and land. Factories release smoke that makes the air dirty. People throw plastic into rivers and oceans. When we cut down forests, animals lose their homes. However, we can make a difference. If everyone makes small changes, we can help save our beautiful planet.", textVi: "Hành tinh của chúng ta đang gặp nguy hiểm. Ô nhiễm đang gây hại cho không khí, nước và đất. Các nhà máy thải ra khói làm bẩn không khí. Mọi người vứt nhựa xuống sông và đại dương. Khi chúng ta chặt phá rừng, động vật mất đi ngôi nhà của chúng. Tuy nhiên, chúng ta có thể tạo ra sự khác biệt. Nếu mọi người thực hiện những thay đổi nhỏ, chúng ta có thể giúp cứu hành tinh xinh đẹp của mình." },
    { sectionTitle: "1.2 The three Rs", sectionTitleVi: "1.2 Ba chữ R", type: "information", text: "The three Rs stand for Reduce, Reuse, and Recycle. Reduce means using less. Turn off lights when you leave a room. Reuse means using things again instead of throwing them away. Use a water bottle instead of buying plastic ones. Recycle means turning old materials into new products. Glass, paper, and some plastics can be recycled.", textVi: "Ba chữ R là viết tắt của Reduce (Giảm thiểu), Reuse (Tái sử dụng) và Recycle (Tái chế). Giảm thiểu nghĩa là sử dụng ít hơn. Tắt đèn khi bạn rời khỏi phòng. Tái sử dụng nghĩa là sử dụng lại đồ vật thay vì vứt chúng đi. Dùng bình nước thay vì mua chai nhựa. Tái chế nghĩa là biến vật liệu cũ thành sản phẩm mới. Thủy tinh, giấy và một số loại nhựa có thể được tái chế." },
    { sectionTitle: "1.3 Conditional sentences", sectionTitleVi: "1.3 Câu điều kiện", type: "grammar", text: "We use 'if' to talk about what might happen. 'If we recycle more, there will be less rubbish.' 'If we plant trees, the air will be cleaner.' The 'if' part tells us the condition, and the other part tells us the result. These sentences help us explain why our actions matter.", textVi: "Chúng ta sử dụng 'if' (nếu) để nói về những gì có thể xảy ra. 'Nếu chúng ta tái chế nhiều hơn, sẽ có ít rác hơn.' 'Nếu chúng ta trồng cây, không khí sẽ sạch hơn.' Phần 'nếu' cho chúng ta biết điều kiện, và phần còn lại cho chúng ta biết kết quả. Những câu này giúp chúng ta giải thích tại sao hành động của chúng ta lại quan trọng." },
    { sectionTitle: "1.4 Greta's speech", sectionTitleVi: "1.4 Bài phát biểu của Greta", type: "reading", text: "A young girl named Greta cared deeply about the environment. She noticed that the ice in the Arctic was melting and animals were losing their homes. She decided to speak up. She stood in front of world leaders and asked them to take action. Her message was simple but powerful: 'Our house is on fire. We must act now.' Many children around the world were inspired by her courage.", textVi: "Một cô bé tên Greta rất quan tâm đến môi trường. Cô ấy nhận thấy rằng băng ở Bắc Cực đang tan chảy và các loài động vật đang mất đi ngôi nhà của chúng. Cô ấy quyết định lên tiếng. Cô ấy đứng trước các nhà lãnh đạo thế giới và yêu cầu họ hành động. Thông điệp của cô ấy đơn giản nhưng mạnh mẽ: 'Ngôi nhà của chúng ta đang cháy. Chúng ta phải hành động ngay.' Nhiều trẻ em trên khắp thế giới đã được truyền cảm hứng bởi sự dũng cảm của cô ấy." },
    { sectionTitle: "1.5 Unit 1 Review", sectionTitleVi: "1.5 Ôn tập Bài 1", type: "tip", text: "Excellent! You have finished Unit 1 about saving the planet.\n\n✓ We learned about pollution and its effects.\n✓ We discovered the three Rs: Reduce, Reuse, Recycle.\n✓ We practiced using 'if' sentences.\n✓ We read about a young activist who inspired the world.\n\nMake an eco-poster! Draw and write three things you will do to help the planet.", textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 1 về việc cứu hành tinh.\n\n✓ Chúng ta đã học về ô nhiễm và tác hại của nó.\n✓ Chúng ta đã khám phá ba chữ R: Giảm thiểu, Tái sử dụng, Tái chế.\n✓ Chúng ta đã thực hành sử dụng câu 'nếu'.\n✓ Chúng ta đã đọc về một nhà hoạt động trẻ đã truyền cảm hứng cho thế giới.\n\nHãy làm một tấm áp phích sinh thái! Vẽ và viết ba điều bạn sẽ làm để giúp đỡ hành tinh." }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G4 U02: Adventure Stories
  // ══════════════════════════════════════════════════════════════
  'cam_g4_u02': [
    { sectionTitle: "2.1 The hidden cave", sectionTitleVi: "2.1 Hang động bí ẩn", type: "reading", text: "Maya and Tom were exploring the forest near their village when they found a narrow path behind a waterfall. They squeezed through and discovered a hidden cave. The walls sparkled with crystals. In the middle of the cave, there was a wooden chest covered in dust. Their hearts were beating fast. What could be inside?", textVi: "Maya và Tom đang khám phá khu rừng gần làng thì họ tìm thấy một con đường hẹp phía sau một thác nước. Họ chui qua và phát hiện một hang động ẩn giấu. Các bức tường lấp lánh với những tinh thể. Giữa hang có một chiếc rương gỗ phủ đầy bụi. Tim họ đập rất nhanh. Bên trong có thể có gì?" },
    { sectionTitle: "2.2 Story structure", sectionTitleVi: "2.2 Cấu trúc câu chuyện", type: "information", text: "Every good adventure story has a clear structure. The beginning introduces the characters and the setting. The middle is where the problem or challenge happens — this is called the conflict. The ending is where the problem is solved — this is the resolution. A strong story also has a climax, the most exciting moment.", textVi: "Mọi câu chuyện phiêu lưu hay đều có một cấu trúc rõ ràng. Phần mở đầu giới thiệu các nhân vật và bối cảnh. Phần giữa là nơi vấn đề hoặc thử thách xảy ra — điều này được gọi là xung đột. Phần kết là nơi vấn đề được giải quyết — đây là phần giải quyết. Một câu chuyện hay cũng có một cao trào, khoảnh khắc thú vị nhất." },
    { sectionTitle: "2.3 Past tense verbs", sectionTitleVi: "2.3 Động từ thì quá khứ", type: "grammar", text: "Adventure stories are usually told in the past tense. Regular verbs add '-ed': walk → walked, climb → climbed. Irregular verbs change completely: run → ran, find → found, see → saw. 'Maya walked into the cave. She found a treasure chest. She ran to tell Tom.' Practice changing verbs to the past tense.", textVi: "Các câu chuyện phiêu lưu thường được kể ở thì quá khứ. Động từ có quy tắc thêm '-ed': walk → walked, climb → climbed. Động từ bất quy tắc thay đổi hoàn toàn: run → ran, find → found, see → saw. 'Maya đi vào hang. Cô ấy tìm thấy một rương kho báu. Cô ấy chạy đi nói với Tom.' Hãy thực hành chuyển động từ sang thì quá khứ." },
    { sectionTitle: "2.4 The chest opens", sectionTitleVi: "2.4 Chiếc rương mở ra", type: "reading", text: "Tom carefully lifted the lid of the old chest. Inside, there were no gold coins or jewels. Instead, they found a beautiful hand-drawn map of their village from a hundred years ago. There were also old letters tied with a red ribbon. The letters were written by children who had explored the same cave long ago. Maya smiled. 'This is better than treasure,' she whispered.", textVi: "Tom cẩn thận nâng nắp chiếc rương cũ. Bên trong không có tiền vàng hay đá quý. Thay vào đó, họ tìm thấy một bản đồ vẽ tay tuyệt đẹp về ngôi làng của họ từ một trăm năm trước. Cũng có những lá thư cũ được buộc bằng một dải ruy băng đỏ. Những bức thư được viết bởi những đứa trẻ đã khám phá cùng hang động từ rất lâu. Maya mỉm cười. 'Đây còn tuyệt hơn cả kho báu,' cô thì thầm." },
    { sectionTitle: "2.5 Unit 2 Review", sectionTitleVi: "2.5 Ôn tập Bài 2", type: "tip", text: "Brilliant! You have finished Unit 2 about adventure stories.\n\n✓ We read about Maya and Tom discovering a hidden cave.\n✓ We learned the structure of a story (beginning, middle, end, climax).\n✓ We practiced regular and irregular past tense verbs.\n✓ We found out what was inside the mysterious chest.\n\nWrite the next chapter! What do Maya and Tom do with the old map?", textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 2 về các câu chuyện phiêu lưu.\n\n✓ Chúng ta đã đọc về Maya và Tom khám phá một hang động ẩn giấu.\n✓ Chúng ta đã học cấu trúc của một câu chuyện (mở đầu, diễn biến, kết thúc, cao trào).\n✓ Chúng ta đã thực hành các động từ thì quá khứ có quy tắc và bất quy tắc.\n✓ Chúng ta đã phát hiện ra thứ gì bên trong chiếc rương bí ẩn.\n\nHãy viết chương tiếp theo! Maya và Tom làm gì với tấm bản đồ cũ?" }
  ],
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE G4 U03: Myths & Legends
  // ══════════════════════════════════════════════════════════════
  'cam_g4_u03': [
    { sectionTitle: "3.1 The story of Icarus", sectionTitleVi: "3.1 Câu chuyện về Icarus", type: "reading", text: "Long ago in Greece, a clever inventor named Daedalus was trapped on an island with his son, Icarus. Daedalus made two pairs of wings from feathers and wax. He warned Icarus not to fly too close to the sun. They flew high into the sky. But Icarus was so excited that he flew higher and higher. The hot sun melted the wax, and his wings fell apart. Icarus fell into the sea.", textVi: "Ngày xưa ở Hy Lạp, một nhà phát minh thông minh tên là Daedalus bị mắc kẹt trên một hòn đảo cùng con trai mình, Icarus. Daedalus đã làm hai đôi cánh từ lông vũ và sáp. Ông cảnh báo Icarus không được bay quá gần mặt trời. Họ bay cao lên bầu trời. Nhưng Icarus quá phấn khích nên đã bay cao hơn và cao hơn. Mặt trời nóng bỏng làm tan sáp, và đôi cánh của cậu rời ra. Icarus rơi xuống biển." },
    { sectionTitle: "3.2 What is a myth?", sectionTitleVi: "3.2 Thần thoại là gì?", type: "information", text: "A myth is a very old story that was told to explain things people did not understand, like thunder or the seasons. Myths often have gods, heroes, and magical events. A legend is similar, but it is usually based on a real person or place, with added exaggeration. Both myths and legends teach us important lessons called morals.", textVi: "Thần thoại là một câu chuyện rất cũ được kể để giải thích những điều mà con người không hiểu, như sấm sét hoặc các mùa. Thần thoại thường có các vị thần, anh hùng và các sự kiện kỳ diệu. Truyền thuyết cũng tương tự, nhưng thường dựa trên một người hoặc địa điểm có thật, với sự phóng đại thêm. Cả thần thoại và truyền thuyết đều dạy chúng ta những bài học quan trọng gọi là đạo đức." },
    { sectionTitle: "3.3 Adverbs of manner", sectionTitleVi: "3.3 Trạng từ chỉ cách thức", type: "grammar", text: "Adverbs of manner tell us how something is done. We usually make them by adding '-ly' to an adjective. Slow → slowly, brave → bravely, careful → carefully. 'Icarus flew carelessly towards the sun.' 'Daedalus worked carefully on the wings.' Adverbs of manner make our writing more descriptive and vivid.", textVi: "Trạng từ chỉ cách thức cho chúng ta biết một việc được thực hiện như thế nào. Chúng ta thường tạo chúng bằng cách thêm '-ly' vào tính từ. Slow → slowly, brave → bravely, careful → carefully. 'Icarus đã bay một cách bất cẩn về phía mặt trời.' 'Daedalus đã làm việc cẩn thận trên đôi cánh.' Trạng từ chỉ cách thức làm cho bài viết của chúng ta mô tả nhiều hơn và sống động hơn." },
    { sectionTitle: "3.4 Anansi the spider", sectionTitleVi: "3.4 Nhện Anansi", type: "reading", text: "Anansi is a famous spider from West African myths. He is very clever but also very tricky. In one story, Anansi wanted to own all the stories in the world. The Sky God said he must capture four dangerous creatures. Using his wits, Anansi caught them all. The Sky God was impressed and gave Anansi all the stories. That is why, in West Africa, stories are called 'Anansi stories'.", textVi: "Anansi là một con nhện nổi tiếng trong thần thoại Tây Phi. Nó rất thông minh nhưng cũng rất xảo quyệt. Trong một câu chuyện, Anansi muốn sở hữu tất cả các câu chuyện trên thế giới. Thần Bầu trời nói nó phải bắt bốn sinh vật nguy hiểm. Bằng trí thông minh của mình, Anansi đã bắt được tất cả. Thần Bầu trời ấn tượng và trao cho Anansi tất cả các câu chuyện. Đó là lý do tại sao ở Tây Phi, các câu chuyện được gọi là 'câu chuyện Anansi'." },
    { sectionTitle: "3.5 Unit 3 Review", sectionTitleVi: "3.5 Ôn tập Bài 3", type: "tip", text: "Fantastic! You have finished Unit 3 about myths and legends.\n\n✓ We read the Greek myth of Icarus.\n✓ We learned the difference between myths and legends.\n✓ We practiced using adverbs of manner (slowly, bravely, carefully).\n✓ We read an African myth about the clever spider Anansi.\n\nWhat is the moral of the Icarus story? Write it in your own words.", textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 3 về thần thoại và truyền thuyết.\n\n✓ Chúng ta đã đọc thần thoại Hy Lạp về Icarus.\n✓ Chúng ta đã học sự khác biệt giữa thần thoại và truyền thuyết.\n✓ Chúng ta đã thực hành sử dụng trạng từ chỉ cách thức (từ từ, dũng cảm, cẩn thận).\n✓ Chúng ta đã đọc một thần thoại châu Phi về con nhện thông minh Anansi.\n\nBài học đạo đức của câu chuyện Icarus là gì? Hãy viết nó bằng lời của bạn." }
  ],
  // ── CAMBRIDGE G4 U04: News Reports ──
  'cam_g4_u04': [
    { sectionTitle: "4.1 Breaking news", sectionTitleVi: "4.1 Tin nóng", type: "reading", text: "Good evening. This is the six o'clock news. Today, a local school won a national science competition. The students from Greenfield Primary built a robot that can sort recycling. The team worked on the project for three months. The headteacher said she was incredibly proud. The winning team will visit a real robotics laboratory next week.", textVi: "Xin chào buổi tối. Đây là bản tin lúc sáu giờ. Hôm nay, một trường học địa phương đã giành chiến thắng trong một cuộc thi khoa học quốc gia. Các học sinh từ trường Tiểu học Greenfield đã chế tạo một robot có thể phân loại rác tái chế. Đội đã làm việc trên dự án trong ba tháng. Hiệu trưởng nói rằng bà vô cùng tự hào. Đội chiến thắng sẽ đến thăm một phòng thí nghiệm robot thực sự vào tuần tới." },
    { sectionTitle: "4.2 Features of a report", sectionTitleVi: "4.2 Đặc điểm của một bản tin", type: "information", text: "A news report answers five key questions: Who? What? Where? When? Why? A good headline grabs the reader's attention. The first paragraph, called the lead, gives the most important facts. The following paragraphs add more detail. Reports use formal language and are written in the third person (he, she, they).", textVi: "Một bản tin trả lời năm câu hỏi chính: Ai? Cái gì? Ở đâu? Khi nào? Tại sao? Một tiêu đề hay thu hút sự chú ý của người đọc. Đoạn đầu tiên, gọi là phần dẫn, cung cấp những sự kiện quan trọng nhất. Các đoạn sau thêm chi tiết. Bản tin sử dụng ngôn ngữ trang trọng và được viết ở ngôi thứ ba (anh ấy, cô ấy, họ)." },
    { sectionTitle: "4.3 Reported speech", sectionTitleVi: "4.3 Câu tường thuật", type: "grammar", text: "In news reports, we often use reported speech instead of direct speech. Direct: The teacher said, 'I am proud.' Reported: The teacher said that she was proud. Notice the verb changes from 'am' to 'was'. 'I' changes to 'she'. Reported speech lets us retell what someone said without using exact quotes.", textVi: "Trong các bản tin, chúng ta thường sử dụng câu tường thuật thay vì lời nói trực tiếp. Trực tiếp: Cô giáo nói, 'Tôi tự hào.' Tường thuật: Cô giáo nói rằng cô ấy tự hào. Lưu ý động từ thay đổi từ 'am' thành 'was'. 'I' thay đổi thành 'she'. Câu tường thuật cho phép chúng ta kể lại những gì ai đó đã nói mà không cần dùng trích dẫn chính xác." },
    { sectionTitle: "4.4 Community hero", sectionTitleVi: "4.4 Anh hùng cộng đồng", type: "reading", text: "Local Hero Saves Dog from River. Yesterday afternoon, twelve-year-old Sam Chen jumped into the cold river to rescue a dog that had fallen in. Sam heard the dog barking and saw it struggling in the water. Without hesitation, he swam out and brought the dog safely to the bank. The dog's grateful owner thanked Sam and called him a true hero.", textVi: "Anh hùng địa phương cứu chó khỏi sông. Chiều hôm qua, cậu bé mười hai tuổi Sam Chen đã nhảy xuống dòng sông lạnh để giải cứu một con chó bị rơi xuống nước. Sam nghe thấy tiếng chó sủa và thấy nó đang vật lộn trong nước. Không do dự, cậu bơi ra và đưa con chó an toàn lên bờ. Chủ nhân biết ơn của con chó đã cảm ơn Sam và gọi cậu là một anh hùng thực sự." },
    { sectionTitle: "4.5 Unit 4 Review", sectionTitleVi: "4.5 Ôn tập Bài 4", type: "tip", text: "Great work! You have finished Unit 4 about news reports.\n\n✓ We read a TV news report about a science competition.\n✓ We learned the five Ws of a news report (Who, What, Where, When, Why).\n✓ We practiced changing direct speech to reported speech.\n✓ We read a newspaper article about a community hero.\n\nBe a reporter! Write a short news report about something that happened at your school.", textVi: "Làm tốt lắm! Bạn đã hoàn thành Bài 4 về các bản tin.\n\n✓ Chúng ta đã đọc một bản tin truyền hình về một cuộc thi khoa học.\n✓ Chúng ta đã học năm câu hỏi W của một bản tin (Ai, Cái gì, Ở đâu, Khi nào, Tại sao).\n✓ Chúng ta đã thực hành chuyển lời nói trực tiếp sang câu tường thuật.\n✓ Chúng ta đã đọc một bài báo về một anh hùng cộng đồng.\n\nHãy làm phóng viên! Viết một bản tin ngắn về điều gì đó đã xảy ra ở trường bạn." }
  ],
  // ── CAMBRIDGE G4 U05: Persuasion ──
  'cam_g4_u05': [
    { sectionTitle: "5.1 Should we have homework?", sectionTitleVi: "5.1 Chúng ta có nên có bài tập về nhà không?", type: "reading", text: "I believe that we should not have homework every night. Firstly, children need time to play and relax after a long day at school. Secondly, too much homework causes stress and makes children tired. Furthermore, children can learn many things outside school, like cooking and gardening. In my opinion, homework should only be given twice a week.", textVi: "Tôi tin rằng chúng ta không nên có bài tập về nhà mỗi tối. Thứ nhất, trẻ em cần thời gian để chơi và thư giãn sau một ngày dài ở trường. Thứ hai, quá nhiều bài tập về nhà gây ra căng thẳng và làm trẻ mệt mỏi. Hơn nữa, trẻ em có thể học nhiều thứ ngoài trường, như nấu ăn và làm vườn. Theo ý kiến của tôi, bài tập về nhà chỉ nên được giao hai lần mỗi tuần." },
    { sectionTitle: "5.2 How to persuade", sectionTitleVi: "5.2 Cách thuyết phục", type: "information", text: "Persuasive writing tries to make the reader agree with your point of view. Start with a strong opening statement. Use reasons and evidence to support your argument. Link your points with connectives like 'firstly', 'secondly', 'furthermore', and 'in conclusion'. End with a powerful summary that repeats your main message.", textVi: "Bài viết thuyết phục cố gắng làm cho người đọc đồng ý với quan điểm của bạn. Bắt đầu bằng một câu mở đầu mạnh mẽ. Sử dụng lý do và bằng chứng để hỗ trợ lập luận của bạn. Liên kết các ý bằng các từ nối như 'thứ nhất', 'thứ hai', 'hơn nữa' và 'kết luận'. Kết thúc bằng một tóm tắt mạnh mẽ lặp lại thông điệp chính của bạn." },
    { sectionTitle: "5.3 Connectives for argument", sectionTitleVi: "5.3 Từ nối cho lập luận", type: "grammar", text: "When writing an argument, we use connectives to link our ideas logically. To add a point: 'furthermore', 'moreover', 'in addition'. To contrast: 'however', 'on the other hand', 'although'. To give a reason: 'because', 'therefore', 'as a result'. To conclude: 'in conclusion', 'to sum up', 'overall'.", textVi: "Khi viết một bài lập luận, chúng ta sử dụng các từ nối để liên kết các ý một cách logic. Để thêm một ý: 'furthermore' (hơn nữa), 'moreover' (ngoài ra), 'in addition' (thêm vào đó). Để đối lập: 'however' (tuy nhiên), 'on the other hand' (mặt khác), 'although' (mặc dù). Để đưa ra lý do: 'because' (bởi vì), 'therefore' (do đó), 'as a result' (kết quả là). Để kết luận: 'in conclusion' (kết luận), 'to sum up' (tóm lại), 'overall' (nhìn chung)." },
    { sectionTitle: "5.4 Save our park!", sectionTitleVi: "5.4 Hãy cứu lấy công viên của chúng ta!", type: "reading", text: "Dear Mayor, We are writing to ask you to save Riverside Park. The council plans to build a car park there, but we strongly disagree. Firstly, the park is the only green space in our neighbourhood. Secondly, many families use it every day for exercise and picnics. Furthermore, the old oak tree in the park is over two hundred years old. We believe the park is more valuable than a car park. Please reconsider. Yours sincerely, The Children of Class 4B.", textVi: "Kính gửi Thị trưởng, Chúng cháu viết thư này để xin ngài cứu lấy Công viên Riverside. Hội đồng dự kiến xây dựng một bãi đậu xe ở đó, nhưng chúng cháu rất không đồng ý. Thứ nhất, công viên là không gian xanh duy nhất trong khu phố của chúng cháu. Thứ hai, nhiều gia đình sử dụng nó mỗi ngày để tập thể dục và dã ngoại. Hơn nữa, cây sồi cổ trong công viên đã hơn hai trăm năm tuổi. Chúng cháu tin rằng công viên có giá trị hơn một bãi đậu xe. Xin hãy cân nhắc lại. Trân trọng, Các em học sinh lớp 4B." },
    { sectionTitle: "5.5 Unit 5 Review", sectionTitleVi: "5.5 Ôn tập Bài 5", type: "tip", text: "Well done! You have finished Unit 5 about persuasion.\n\n✓ We read a persuasive argument about homework.\n✓ We learned the structure of persuasive writing.\n✓ We practiced using connectives (furthermore, however, therefore).\n✓ We read a persuasive letter to a mayor about saving a park.\n\nDebate time! Choose a topic and write three reasons to support your opinion.", textVi: "Làm tốt lắm! Bạn đã hoàn thành Bài 5 về thuyết phục.\n\n✓ Chúng ta đã đọc một bài lập luận thuyết phục về bài tập về nhà.\n✓ Chúng ta đã học cấu trúc của bài viết thuyết phục.\n✓ Chúng ta đã thực hành sử dụng các từ nối (hơn nữa, tuy nhiên, do đó).\n✓ Chúng ta đã đọc một lá thư thuyết phục gửi thị trưởng về việc cứu một công viên.\n\nGiờ tranh luận! Chọn một chủ đề và viết ba lý do để ủng hộ ý kiến của bạn." }
  ],
  // ── CAMBRIDGE G4 U06: Poetry Patterns ──
  'cam_g4_u06': [
    { sectionTitle: "6.1 Kennings", sectionTitleVi: "6.1 Thơ Kenning", type: "reading", text: "A kenning is a special type of poem that describes something without naming it. Each line uses a two-word phrase. Can you guess what this kenning describes?\n\nWave-rider\nWind-catcher\nSail-dancer\nStorm-fighter\nHorizon-chaser\n\nThe answer is a ship! Kennings were used by Viking poets long ago.", textVi: "Kenning là một thể thơ đặc biệt miêu tả một thứ gì đó mà không gọi tên nó. Mỗi dòng sử dụng một cụm từ hai từ. Bạn có đoán được bài kenning này miêu tả gì không?\n\nNgười cưỡi sóng\nNgười bắt gió\nNgười nhảy buồm\nNgười chiến đấu với bão\nNgười đuổi theo chân trời\n\nCâu trả lời là một con tàu! Thơ Kenning đã được các nhà thơ Viking sử dụng từ rất lâu." },
    { sectionTitle: "6.2 Poetry forms", sectionTitleVi: "6.2 Các hình thức thơ", type: "information", text: "There are many forms of poetry. A haiku has three lines with a pattern of 5-7-5 syllables. A cinquain has five lines with 2-4-6-8-2 syllables. A kenning uses two-word phrases on each line. A free verse poem has no rules about rhyme or rhythm at all. Each form creates a different feeling.", textVi: "Có nhiều hình thức thơ. Thơ Haiku có ba dòng với mô hình 5-7-5 âm tiết. Thơ Cinquain có năm dòng với 2-4-6-8-2 âm tiết. Thơ Kenning sử dụng các cụm từ hai từ trên mỗi dòng. Thơ tự do không có quy tắc nào về vần hoặc nhịp điệu. Mỗi hình thức tạo ra một cảm giác khác nhau." },
    { sectionTitle: "6.3 Figurative language", sectionTitleVi: "6.3 Ngôn ngữ hình tượng", type: "grammar", text: "Poets use figurative language to create pictures in our minds. A simile compares using 'like' or 'as': 'The moon was like a silver coin.' A metaphor says something is something else: 'The sun is a golden ball.' Personification gives human qualities to non-human things: 'The wind whispered through the trees.' These techniques make poetry powerful.", textVi: "Các nhà thơ sử dụng ngôn ngữ hình tượng để tạo ra những bức tranh trong tâm trí chúng ta. Phép so sánh (simile) so sánh bằng 'like' hoặc 'as': 'Mặt trăng giống như một đồng xu bạc.' Ẩn dụ (metaphor) nói một thứ là một thứ khác: 'Mặt trời là một quả cầu vàng.' Nhân hóa (personification) gán phẩm chất con người cho vật không phải người: 'Gió thì thầm qua những tán cây.' Những kỹ thuật này làm cho thơ trở nên mạnh mẽ." },
    { sectionTitle: "6.4 The river", sectionTitleVi: "6.4 Dòng sông", type: "reading", text: "The river is a dancer,\ntwisting through the valley.\nIt leaps over stones like a playful child\nand rests in pools as still as glass.\nIn winter, it roars like an angry lion,\nbut in summer, it hums a gentle lullaby.\nThe river never stops —\nit is always on its way to the sea.", textVi: "Dòng sông là một vũ công,\nuốn lượn qua thung lũng.\nNó nhảy qua những tảng đá như một đứa trẻ nghịch ngợm\nvà nghỉ ngơi trong những vũng nước phẳng lặng như gương.\nMùa đông, nó gầm rú như một con sư tử giận dữ,\nnhưng mùa hè, nó ngân nga một bài hát ru nhẹ nhàng.\nDòng sông không bao giờ dừng lại —\nnó luôn trên đường đến biển." },
    { sectionTitle: "6.5 Unit 6 Review", sectionTitleVi: "6.5 Ôn tập Bài 6", type: "tip", text: "Fantastic! You have finished Unit 6 about poetry patterns.\n\n✓ We read and created kenning poems.\n✓ We discovered different poetry forms (haiku, cinquain, free verse).\n✓ We practiced figurative language (simile, metaphor, personification).\n✓ We read a poem that used personification to describe a river.\n\nWrite a kenning! Describe an animal using two-word phrases and see if your friend can guess it.", textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 6 về các dạng thơ.\n\n✓ Chúng ta đã đọc và sáng tác thơ kenning.\n✓ Chúng ta đã khám phá các hình thức thơ khác nhau (haiku, cinquain, tự do).\n✓ Chúng ta đã thực hành ngôn ngữ hình tượng (so sánh, ẩn dụ, nhân hóa).\n✓ Chúng ta đã đọc một bài thơ sử dụng nhân hóa để miêu tả dòng sông.\n\nHãy viết một bài kenning! Miêu tả một con vật bằng các cụm từ hai từ và xem bạn của bạn có đoán được không." }
  ],
  // ── CAMBRIDGE G4 U07: Science Fiction ──
  'cam_g4_u07': [
    { sectionTitle: "7.1 Life on Mars", sectionTitleVi: "7.1 Cuộc sống trên sao Hỏa", type: "reading", text: "The year is 2150. Zara lives in a dome city on Mars. Outside, the sky is orange and the wind blows red dust everywhere. Inside the dome, there are gardens, schools, and houses. Zara goes to school on a hoverboard. Her best friend is a robot called Pixel. Today, they are going on a field trip outside the dome in special spacesuits.", textVi: "Năm 2150. Zara sống trong một thành phố hình mái vòm trên sao Hỏa. Bên ngoài, bầu trời màu cam và gió thổi bụi đỏ khắp nơi. Bên trong mái vòm, có vườn cây, trường học và nhà cửa. Zara đi học bằng ván trượt bay. Bạn thân nhất của cô là một robot tên Pixel. Hôm nay, họ sẽ đi tham quan bên ngoài mái vòm trong bộ đồ vũ trụ đặc biệt." },
    { sectionTitle: "7.2 What is science fiction?", sectionTitleVi: "7.2 Khoa học viễn tưởng là gì?", type: "information", text: "Science fiction (sci-fi) is a genre of stories set in the future or in space. They imagine how technology might change our lives. Sci-fi stories often include robots, spaceships, time travel, and alien planets. Some sci-fi ideas from the past have actually come true, like video calls and tablet computers!", textVi: "Khoa học viễn tưởng (sci-fi) là một thể loại truyện lấy bối cảnh trong tương lai hoặc ngoài không gian. Chúng tưởng tượng công nghệ có thể thay đổi cuộc sống của chúng ta như thế nào. Các câu chuyện sci-fi thường bao gồm robot, tàu vũ trụ, du hành thời gian và các hành tinh ngoài Trái đất. Một số ý tưởng sci-fi từ quá khứ đã thực sự trở thành hiện thực, như gọi video và máy tính bảng!" },
    { sectionTitle: "7.3 Modal verbs", sectionTitleVi: "7.3 Động từ khiếm khuyết", type: "grammar", text: "In sci-fi, we use modal verbs to talk about possibilities. 'Could' means something is possible: 'Humans could live on Mars one day.' 'Might' means it is less certain: 'Aliens might exist somewhere.' 'Would' describes imagined situations: 'Life would be very different on another planet.'", textVi: "Trong sci-fi, chúng ta sử dụng các động từ khiếm khuyết để nói về các khả năng. 'Could' có nghĩa là điều gì đó có thể xảy ra: 'Con người có thể sống trên sao Hỏa một ngày nào đó.' 'Might' có nghĩa là ít chắc chắn hơn: 'Người ngoài hành tinh có thể tồn tại ở đâu đó.' 'Would' miêu tả các tình huống tưởng tượng: 'Cuộc sống sẽ rất khác trên một hành tinh khác.'" },
    { sectionTitle: "7.4 The message from space", sectionTitleVi: "7.4 Thông điệp từ vũ trụ", type: "reading", text: "One night, Zara's computer received a strange signal. It was a pattern of beeps that repeated over and over. Pixel analysed the signal and said it could be a message from another planet. Zara's heart raced. She decoded the pattern and found a simple picture: a circle with two dots and a curved line — a smiley face. Someone out there was trying to say hello.", textVi: "Một đêm, máy tính của Zara nhận được một tín hiệu lạ. Đó là một chuỗi tiếng bíp lặp đi lặp lại. Pixel phân tích tín hiệu và nói rằng nó có thể là một thông điệp từ một hành tinh khác. Tim Zara đập nhanh. Cô giải mã mô hình và tìm thấy một hình ảnh đơn giản: một hình tròn với hai chấm và một đường cong — một mặt cười. Ai đó ngoài kia đang cố gắng nói xin chào." },
    { sectionTitle: "7.5 Unit 7 Review", sectionTitleVi: "7.5 Ôn tập Bài 7", type: "tip", text: "Excellent! You have finished Unit 7 about science fiction.\n\n✓ We imagined life on Mars in the year 2150.\n✓ We learned what science fiction is and its key features.\n✓ We practiced using modal verbs (could, might, would).\n✓ We read about a mysterious message from space.\n\nDesign a future invention! Draw it and write a paragraph explaining what it does.", textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 7 về khoa học viễn tưởng.\n\n✓ Chúng ta đã tưởng tượng cuộc sống trên sao Hỏa vào năm 2150.\n✓ Chúng ta đã học khoa học viễn tưởng là gì và các đặc điểm chính.\n✓ Chúng ta đã thực hành sử dụng động từ khiếm khuyết (could, might, would).\n✓ Chúng ta đã đọc về một thông điệp bí ẩn từ vũ trụ.\n\nHãy thiết kế một phát minh tương lai! Vẽ nó và viết một đoạn văn giải thích nó làm gì." }
  ],
  // ── CAMBRIDGE G4 U08: Explanations ──
  'cam_g4_u08': [
    { sectionTitle: "8.1 How do earthquakes happen?", sectionTitleVi: "8.1 Động đất xảy ra như thế nào?", type: "reading", text: "The Earth's surface is made of huge pieces called tectonic plates. These plates float on hot, melted rock underneath. They move very slowly, only a few centimetres each year. Sometimes, the plates push against each other or pull apart. When this happens suddenly, the ground shakes. This is an earthquake. Strong earthquakes can damage buildings and roads.", textVi: "Bề mặt Trái đất được tạo thành từ những mảng khổng lồ gọi là các mảng kiến tạo. Các mảng này trôi nổi trên đá nóng chảy bên dưới. Chúng di chuyển rất chậm, chỉ vài xen-ti-mét mỗi năm. Đôi khi, các mảng đẩy vào nhau hoặc tách ra. Khi điều này xảy ra đột ngột, mặt đất rung chuyển. Đây là động đất. Những trận động đất mạnh có thể phá hủy các tòa nhà và đường sá." },
    { sectionTitle: "8.2 Writing explanations", sectionTitleVi: "8.2 Viết bài giải thích", type: "information", text: "An explanation text tells the reader how or why something happens. It usually starts with a question or a title. The steps are written in order, using cause and effect language. Diagrams or pictures often help the reader understand. Explanation texts are found in science textbooks, encyclopedias, and educational websites.", textVi: "Một bài giải thích cho người đọc biết điều gì đó xảy ra như thế nào hoặc tại sao. Nó thường bắt đầu bằng một câu hỏi hoặc một tiêu đề. Các bước được viết theo thứ tự, sử dụng ngôn ngữ nguyên nhân-kết quả. Sơ đồ hoặc hình ảnh thường giúp người đọc hiểu. Các bài giải thích được tìm thấy trong sách giáo khoa khoa học, bách khoa toàn thư và các trang web giáo dục." },
    { sectionTitle: "8.3 Cause and effect", sectionTitleVi: "8.3 Nguyên nhân và kết quả", type: "grammar", text: "Explanation texts use cause and effect language. 'Because' and 'since' introduce a cause: 'The ground shakes because the plates move.' 'As a result', 'therefore', and 'consequently' introduce an effect: 'The plates collide; as a result, mountains form.' 'This causes' and 'this leads to' also link cause and effect.", textVi: "Các bài giải thích sử dụng ngôn ngữ nguyên nhân-kết quả. 'Because' (bởi vì) và 'since' (vì) giới thiệu nguyên nhân: 'Mặt đất rung chuyển vì các mảng di chuyển.' 'As a result' (kết quả là), 'therefore' (do đó) và 'consequently' (hệ quả là) giới thiệu kết quả: 'Các mảng va chạm; kết quả là, các ngọn núi hình thành.' 'This causes' (điều này gây ra) và 'this leads to' (điều này dẫn đến) cũng liên kết nguyên nhân và kết quả." },
    { sectionTitle: "8.4 Why do we dream?", sectionTitleVi: "8.4 Tại sao chúng ta mơ?", type: "reading", text: "Scientists are not completely sure why we dream, but they have some ideas. When we sleep, our brain sorts through the information from the day. Dreams might be the brain practising important skills or processing emotions. Some dreams are happy, some are strange, and some are scary. Most people dream for about two hours every night, even if they do not remember.", textVi: "Các nhà khoa học không hoàn toàn chắc chắn tại sao chúng ta mơ, nhưng họ có một số ý tưởng. Khi chúng ta ngủ, bộ não của chúng ta sắp xếp thông tin trong ngày. Giấc mơ có thể là bộ não đang thực hành các kỹ năng quan trọng hoặc xử lý cảm xúc. Một số giấc mơ vui vẻ, một số kỳ lạ và một số đáng sợ. Hầu hết mọi người mơ khoảng hai giờ mỗi đêm, ngay cả khi họ không nhớ." },
    { sectionTitle: "8.5 Unit 8 Review", sectionTitleVi: "8.5 Ôn tập Bài 8", type: "tip", text: "Great work! You have finished Unit 8 about explanations.\n\n✓ We learned how earthquakes happen.\n✓ We discovered how to write explanation texts.\n✓ We practiced cause and effect language (because, as a result, therefore).\n✓ We explored why humans dream.\n\nExplain something! Write a short explanation of how rainbows form.", textVi: "Làm tốt lắm! Bạn đã hoàn thành Bài 8 về các bài giải thích.\n\n✓ Chúng ta đã học cách động đất xảy ra.\n✓ Chúng ta đã khám phá cách viết bài giải thích.\n✓ Chúng ta đã thực hành ngôn ngữ nguyên nhân-kết quả (bởi vì, kết quả là, do đó).\n✓ Chúng ta đã khám phá tại sao con người lại mơ.\n\nHãy giải thích điều gì đó! Viết một bài giải thích ngắn về cách cầu vồng hình thành." }
  ],
  // ── CAMBRIDGE G4 U09: Dilemma Stories ──
  'cam_g4_u09': [
    { sectionTitle: "9.1 The lost wallet", sectionTitleVi: "9.1 Chiếc ví bị mất", type: "reading", text: "Priya found a wallet on the playground. Inside, there was a lot of money and a library card with a name on it. She knew the money did not belong to her. But she also knew her family needed money for food this week. She had a dilemma: should she keep the money or return the wallet? Her stomach churned as she tried to decide what was the right thing to do.", textVi: "Priya tìm thấy một chiếc ví trên sân chơi. Bên trong có rất nhiều tiền và một thẻ thư viện có tên trên đó. Cô biết tiền không thuộc về mình. Nhưng cô cũng biết gia đình cô cần tiền để mua thức ăn trong tuần này. Cô có một tình huống khó xử: nên giữ tiền hay trả lại chiếc ví? Bụng cô quặn lại khi cố gắng quyết định đâu là điều đúng đắn nên làm." },
    { sectionTitle: "9.2 What is a dilemma?", sectionTitleVi: "9.2 Tình huống khó xử là gì?", type: "information", text: "A dilemma is a situation where a character must choose between two difficult options. Neither choice is easy. Dilemma stories are interesting because the reader thinks about what they would do. The character's decision reveals their values and personality. Good dilemma stories make us feel empathy for the character.", textVi: "Tình huống khó xử là một tình huống mà nhân vật phải lựa chọn giữa hai lựa chọn khó khăn. Không có lựa chọn nào là dễ dàng. Các câu chuyện tình huống khó xử rất thú vị vì người đọc suy nghĩ về những gì họ sẽ làm. Quyết định của nhân vật tiết lộ giá trị và tính cách của họ. Những câu chuyện tình huống khó xử hay khiến chúng ta cảm thấy đồng cảm với nhân vật." },
    { sectionTitle: "9.3 Expressing feelings", sectionTitleVi: "9.3 Diễn đạt cảm xúc", type: "grammar", text: "When writing dilemma stories, we describe the character's feelings to show their inner conflict. Use 'show, don't tell': instead of 'She was nervous', write 'Her hands trembled and her mouth went dry.' Instead of 'He was happy', write 'A huge grin spread across his face.' This technique draws the reader deeper into the story.", textVi: "Khi viết các câu chuyện tình huống khó xử, chúng ta miêu tả cảm xúc của nhân vật để thể hiện xung đột nội tâm. Sử dụng 'thể hiện, đừng kể': thay vì 'Cô ấy lo lắng', hãy viết 'Tay cô run rẩy và miệng cô khô khốc.' Thay vì 'Anh ấy vui', hãy viết 'Một nụ cười rạng rỡ trải dài trên khuôn mặt anh.' Kỹ thuật này kéo người đọc sâu hơn vào câu chuyện." },
    { sectionTitle: "9.4 Priya's choice", sectionTitleVi: "9.4 Lựa chọn của Priya", type: "reading", text: "Priya took a deep breath. She walked to the library and asked if anyone had lost a wallet. An old man was waiting at the desk, looking worried. When Priya gave him the wallet, tears filled his eyes. He thanked her again and again. As Priya walked home, she felt lighter. She had made the right choice. Sometimes, doing the right thing is the hardest thing, but it always feels the best.", textVi: "Priya hít một hơi thật sâu. Cô đi đến thư viện và hỏi liệu có ai đánh mất ví không. Một ông lão đang đợi ở quầy, trông rất lo lắng. Khi Priya đưa lại chiếc ví cho ông, nước mắt trào ra trên mắt ông. Ông cảm ơn cô hết lần này đến lần khác. Khi Priya đi bộ về nhà, cô cảm thấy nhẹ nhõm hơn. Cô đã đưa ra lựa chọn đúng đắn. Đôi khi, làm điều đúng đắn là điều khó khăn nhất, nhưng nó luôn luôn mang lại cảm giác tốt nhất." },
    { sectionTitle: "9.5 Unit 9 Review", sectionTitleVi: "9.5 Ôn tập Bài 9", type: "tip", text: "Brilliant! You have finished Unit 9 about dilemma stories.\n\n✓ We read about Priya finding a lost wallet.\n✓ We learned what a dilemma is and why it makes stories interesting.\n✓ We practiced 'show, don't tell' to express feelings.\n✓ We discovered what choice Priya made and why.\n\nWrite your own dilemma! Create a character who must make a difficult choice.", textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 9 về các câu chuyện tình huống khó xử.\n\n✓ Chúng ta đã đọc về Priya tìm thấy một chiếc ví bị mất.\n✓ Chúng ta đã học tình huống khó xử là gì và tại sao nó làm cho câu chuyện thú vị.\n✓ Chúng ta đã thực hành 'thể hiện, đừng kể' để diễn đạt cảm xúc.\n✓ Chúng ta đã khám phá Priya đã đưa ra lựa chọn nào và tại sao.\n\nHãy viết tình huống khó xử của riêng bạn! Tạo một nhân vật phải đưa ra một lựa chọn khó khăn." }
  ],
  // ── CAMBRIDGE G5 U01: Fables & Folktales ──
  'cam_g5_u01': [
    { sectionTitle: "1.1 The fox and the crow", sectionTitleVi: "1.1 Cáo và quạ", type: "reading", text: "A crow sat in a tree with a piece of cheese in her beak. A fox walked by and wanted the cheese. He said, 'Beautiful crow, I have heard that you have the most wonderful singing voice. Won't you sing for me?' The foolish crow opened her beak to sing, and the cheese fell to the ground. The fox grabbed it and ran away, laughing.", textVi: "Một con quạ ngồi trên cây với một miếng phô mai trong mỏ. Một con cáo đi ngang qua và muốn lấy phô mai. Nó nói: 'Quạ xinh đẹp ơi, tôi nghe nói bạn có giọng hát tuyệt vời nhất. Bạn hát cho tôi nghe được không?' Con quạ ngu ngốc mở mỏ để hát, và miếng phô mai rơi xuống đất. Con cáo chộp lấy và chạy mất, cười khoái trá." },
    { sectionTitle: "1.2 Features of fables", sectionTitleVi: "1.2 Đặc điểm của truyện ngụ ngôn", type: "information", text: "A fable is a short story that teaches a moral lesson. The characters are usually animals that talk and act like humans. The moral is the lesson we learn, often stated at the end. Aesop, a storyteller from ancient Greece, wrote many famous fables. A folktale is similar but comes from the oral tradition of a culture.", textVi: "Truyện ngụ ngôn là một câu chuyện ngắn dạy một bài học đạo đức. Các nhân vật thường là các loài động vật biết nói và hành động như con người. Đạo đức là bài học chúng ta rút ra, thường được nêu ở cuối truyện. Aesop, một người kể chuyện từ Hy Lạp cổ đại, đã viết nhiều truyện ngụ ngôn nổi tiếng. Truyện dân gian cũng tương tự nhưng đến từ truyền thống truyền miệng." },
    { sectionTitle: "1.3 Complex sentences", sectionTitleVi: "1.3 Câu phức", type: "grammar", text: "Complex sentences join a main clause with a subordinate clause using conjunctions like 'although', 'because', 'when', 'while', 'unless'. 'Although the crow was clever, she was tricked by flattery.' The subordinate clause adds extra information but cannot stand alone as a sentence.", textVi: "Câu phức nối một mệnh đề chính với một mệnh đề phụ bằng các liên từ như 'although' (mặc dù), 'because' (bởi vì), 'when' (khi), 'while' (trong khi), 'unless' (trừ khi). 'Mặc dù con quạ thông minh, nó đã bị lừa bởi lời nịnh hót.' Mệnh đề phụ bổ sung thêm thông tin nhưng không thể đứng một mình thành câu." },
    { sectionTitle: "1.4 The hare and the tortoise", sectionTitleVi: "1.4 Thỏ và rùa", type: "reading", text: "The hare boasted that he was the fastest animal in the forest. The tortoise quietly challenged him to a race. The hare sprinted ahead and, feeling confident, decided to take a nap under a tree. The tortoise kept walking slowly and steadily. When the hare woke up, the tortoise was already crossing the finish line. Slow and steady wins the race.", textVi: "Con thỏ khoe khoang rằng nó là loài động vật nhanh nhất trong rừng. Con rùa lặng lẽ thách nó chạy đua. Con thỏ chạy nhanh về phía trước và, cảm thấy tự tin, quyết định ngủ trưa dưới gốc cây. Con rùa cứ đi từ từ và đều đặn. Khi con thỏ tỉnh dậy, con rùa đã băng qua vạch đích. Chậm mà chắc sẽ thắng cuộc đua." },
    { sectionTitle: "1.5 Unit 1 Review", sectionTitleVi: "1.5 Ôn tập Bài 1", type: "tip", text: "Excellent! You finished Unit 1 about fables and folktales.\n\n✓ We read the fable of the fox and the crow.\n✓ We learned features of fables (animal characters, moral lesson).\n✓ We practiced complex sentences with subordinate clauses.\n✓ We read the classic tale of the hare and the tortoise.\n\nWrite your own fable with animal characters and a moral at the end!", textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 1 về truyện ngụ ngôn và truyện dân gian.\n\n✓ Chúng ta đã đọc truyện ngụ ngôn về cáo và quạ.\n✓ Chúng ta đã học các đặc điểm của truyện ngụ ngôn.\n✓ Chúng ta đã thực hành câu phức với mệnh đề phụ.\n✓ Chúng ta đã đọc câu chuyện kinh điển về thỏ và rùa.\n\nHãy viết truyện ngụ ngôn của riêng bạn với các nhân vật động vật và một bài học đạo đức ở cuối!" }
  ],
  // ── CAMBRIDGE G5 U02: Space Exploration ──
  'cam_g5_u02': [
    { sectionTitle: "2.1 Journey to Mars", sectionTitleVi: "2.1 Hành trình đến sao Hỏa", type: "reading", text: "In 2030, the first crewed mission to Mars launched from Earth. The journey took seven months. The astronauts lived in a small spacecraft, exercising every day to keep their muscles strong in zero gravity. When they finally saw the red planet through the window, Commander Li whispered, 'We made it.' They were the first humans to set foot on another planet.", textVi: "Năm 2030, sứ mệnh có người lái đầu tiên đến sao Hỏa được phóng từ Trái đất. Hành trình mất bảy tháng. Các phi hành gia sống trong một tàu vũ trụ nhỏ, tập thể dục mỗi ngày để giữ cho cơ bắp khỏe trong tình trạng không trọng lực. Khi cuối cùng nhìn thấy hành tinh đỏ qua cửa sổ, Chỉ huy Li thì thầm: 'Chúng ta đã làm được.' Họ là những người đầu tiên đặt chân lên một hành tinh khác." },
    { sectionTitle: "2.2 The solar system", sectionTitleVi: "2.2 Hệ mặt trời", type: "information", text: "Our solar system has eight planets orbiting the Sun. The four inner planets (Mercury, Venus, Earth, Mars) are rocky. The four outer planets (Jupiter, Saturn, Uranus, Neptune) are gas giants. Earth is the only planet known to support life. The Sun is a star — a huge ball of burning gas that provides light and heat to all the planets.", textVi: "Hệ mặt trời của chúng ta có tám hành tinh quay quanh Mặt trời. Bốn hành tinh bên trong (Sao Thủy, Sao Kim, Trái đất, Sao Hỏa) là hành tinh đá. Bốn hành tinh bên ngoài (Sao Mộc, Sao Thổ, Sao Thiên Vương, Sao Hải Vương) là các hành tinh khí khổng lồ. Trái đất là hành tinh duy nhất được biết đến có sự sống. Mặt trời là một ngôi sao — một quả cầu khí cháy khổng lồ cung cấp ánh sáng và nhiệt cho tất cả các hành tinh." },
    { sectionTitle: "2.3 Relative clauses", sectionTitleVi: "2.3 Mệnh đề quan hệ", type: "grammar", text: "Relative clauses give extra information about a noun. They start with 'who', 'which', 'that', 'where', or 'whose'. 'The astronaut who landed on Mars was Commander Li.' 'Mars, which is the fourth planet, has a thin atmosphere.' We use commas for non-essential information.", textVi: "Mệnh đề quan hệ cung cấp thêm thông tin về một danh từ. Chúng bắt đầu bằng 'who' (người mà), 'which' (cái mà), 'that' (mà), 'where' (nơi mà), hoặc 'whose' (của ai). 'Phi hành gia người đã đáp xuống Sao Hỏa là Chỉ huy Li.' 'Sao Hỏa, hành tinh thứ tư, có một bầu khí quyển mỏng.' Chúng ta sử dụng dấu phẩy cho thông tin không thiết yếu." },
    { sectionTitle: "2.4 Life on the space station", sectionTitleVi: "2.4 Cuộc sống trên trạm vũ trụ", type: "reading", text: "Living on the International Space Station is very different from life on Earth. Astronauts float because there is almost no gravity. They sleep in sleeping bags attached to the wall. Water floats in bubbles, so they drink through straws. Food comes in pouches. They exercise for two hours every day to stop their bones getting weak. Despite the challenges, astronauts say the view of Earth from space is breathtaking.", textVi: "Sống trên Trạm Vũ trụ Quốc tế rất khác so với cuộc sống trên Trái đất. Các phi hành gia nổi lơ lửng vì gần như không có trọng lực. Họ ngủ trong túi ngủ gắn vào tường. Nước nổi thành bong bóng, nên họ uống bằng ống hút. Thức ăn đựng trong túi. Họ tập thể dục hai giờ mỗi ngày để xương không bị yếu. Dù có nhiều thách thức, các phi hành gia nói rằng cảnh Trái đất nhìn từ không gian thật ngoạn mục." },
    { sectionTitle: "2.5 Unit 2 Review", sectionTitleVi: "2.5 Ôn tập Bài 2", type: "tip", text: "Brilliant! You finished Unit 2 about space exploration.\n\n✓ We read about the first mission to Mars.\n✓ We learned about the eight planets in our solar system.\n✓ We practiced relative clauses (who, which, that, where).\n✓ We discovered what daily life is like on a space station.\n\nIf you could visit any planet, which would you choose and why?", textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 2 về khám phá vũ trụ.\n\n✓ Chúng ta đã đọc về sứ mệnh đầu tiên đến Sao Hỏa.\n✓ Chúng ta đã học về tám hành tinh trong hệ mặt trời.\n✓ Chúng ta đã thực hành mệnh đề quan hệ (who, which, that, where).\n✓ Chúng ta đã khám phá cuộc sống hàng ngày trên trạm vũ trụ.\n\nNếu bạn có thể đến thăm bất kỳ hành tinh nào, bạn sẽ chọn hành tinh nào và tại sao?" }
  ],
  // ── CAMBRIDGE G5 U03: Myths Around the World ──
  'cam_g5_u03': [
    { sectionTitle: "3.1 The creation of the world", sectionTitleVi: "3.1 Sự sáng tạo thế giới", type: "reading", text: "The Maori people of New Zealand tell a myth about how the world was created. In the beginning, Rangi the Sky Father and Papa the Earth Mother held each other so tightly that their children lived in darkness. Their son, Tane, pushed his parents apart with all his strength. Light flooded in, and the world was born. Rangi's tears became the rain, and Papa's sighs became the mist.", textVi: "Người Maori ở New Zealand kể một thần thoại về cách thế giới được tạo ra. Ban đầu, Rangi Cha Trời và Papa Mẹ Đất ôm nhau chặt đến nỗi con cái họ sống trong bóng tối. Con trai họ, Tane, đẩy cha mẹ ra xa bằng tất cả sức mạnh. Ánh sáng tràn vào, và thế giới được sinh ra. Nước mắt của Rangi trở thành mưa, và tiếng thở dài của Papa trở thành sương mù." },
    { sectionTitle: "3.2 Myths from different cultures", sectionTitleVi: "3.2 Thần thoại từ các nền văn hóa khác nhau", type: "information", text: "Every culture has its own myths. Norse myths from Scandinavia tell of Thor, the god of thunder. Hindu myths from India feature Ganesh, the elephant-headed god of wisdom. Chinese myths include the story of the dragon who controls rivers. Egyptian myths describe Ra, the sun god. Although these myths are different, they all try to explain the natural world and teach values.", textVi: "Mỗi nền văn hóa đều có thần thoại riêng. Thần thoại Bắc Âu từ Scandinavia kể về Thor, thần sấm sét. Thần thoại Hindu từ Ấn Độ có Ganesh, vị thần đầu voi của trí tuệ. Thần thoại Trung Quốc bao gồm câu chuyện về con rồng điều khiển các dòng sông. Thần thoại Ai Cập miêu tả Ra, thần mặt trời. Mặc dù khác nhau, tất cả đều cố gắng giải thích thế giới tự nhiên và dạy các giá trị." },
    { sectionTitle: "3.3 Active and passive voice", sectionTitleVi: "3.3 Câu chủ động và bị động", type: "grammar", text: "In active voice, the subject does the action: 'Tane pushed the sky.' In passive voice, the subject receives the action: 'The sky was pushed by Tane.' We form the passive with 'was/were + past participle'. Passive voice is useful when we want to focus on the action rather than who did it: 'The world was created from darkness.'", textVi: "Ở câu chủ động, chủ ngữ thực hiện hành động: 'Tane đẩy bầu trời.' Ở câu bị động, chủ ngữ nhận hành động: 'Bầu trời được đẩy bởi Tane.' Chúng ta tạo câu bị động với 'was/were + quá khứ phân từ'. Câu bị động hữu ích khi chúng ta muốn tập trung vào hành động thay vì ai đã làm: 'Thế giới được tạo ra từ bóng tối.'" },
    { sectionTitle: "3.4 Prometheus and fire", sectionTitleVi: "3.4 Prometheus và lửa", type: "reading", text: "In Greek mythology, humans lived in cold and darkness. A Titan named Prometheus felt sorry for them. He secretly stole fire from Mount Olympus, the home of the gods, and gave it to the humans. Zeus, the king of the gods, was furious. As punishment, Prometheus was chained to a rock for eternity. But humanity had fire, and with it came warmth, cooking, and civilisation.", textVi: "Trong thần thoại Hy Lạp, con người sống trong lạnh giá và bóng tối. Một thần Titan tên Prometheus thương cảm cho họ. Ông bí mật đánh cắp lửa từ núi Olympus, nơi ở của các vị thần, và trao nó cho con người. Zeus, vua của các vị thần, vô cùng tức giận. Để trừng phạt, Prometheus bị xích vào một tảng đá mãi mãi. Nhưng nhân loại đã có lửa, và cùng với nó là sự ấm áp, nấu nướng và nền văn minh." },
    { sectionTitle: "3.5 Unit 3 Review", sectionTitleVi: "3.5 Ôn tập Bài 3", type: "tip", text: "Fantastic! You finished Unit 3 about myths around the world.\n\n✓ We read a Maori creation myth from New Zealand.\n✓ We explored myths from Norse, Hindu, Chinese, and Egyptian cultures.\n✓ We practiced active and passive voice.\n✓ We read the Greek myth of Prometheus bringing fire to humans.\n\nCompare two myths from different cultures. What do they have in common?", textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 3 về thần thoại trên thế giới.\n\n✓ Chúng ta đã đọc thần thoại sáng tạo của người Maori từ New Zealand.\n✓ Chúng ta đã khám phá thần thoại từ các nền văn hóa Bắc Âu, Hindu, Trung Quốc và Ai Cập.\n✓ Chúng ta đã thực hành câu chủ động và bị động.\n✓ Chúng ta đã đọc thần thoại Hy Lạp về Prometheus mang lửa đến cho con người.\n\nHãy so sánh hai thần thoại từ các nền văn hóa khác nhau. Chúng có điểm gì chung?" }
  ],
  // ── CAMBRIDGE G5 U04: Plays & Scripts ──
  'cam_g5_u04': [
    { sectionTitle: "4.1 The enchanted forest", sectionTitleVi: "4.1 Khu rừng phù phép", type: "reading", text: "NARRATOR: Deep in the forest, two children are lost.\nELLA: (looking around nervously) Which way do we go?\nJAMES: (pointing) I think I see a light through the trees.\nELLA: Wait! Do you hear that? Something is moving in the bushes.\n(A small fairy appears, glowing softly)\nFAIRY: Don't be afraid. I can help you find your way home.\nELLA: (whispering to James) Should we trust her?", textVi: "NGƯỜI DẪN CHUYỆN: Sâu trong rừng, hai đứa trẻ bị lạc.\nELLA: (nhìn quanh lo lắng) Chúng ta đi đường nào?\nJAMES: (chỉ tay) Em nghĩ em thấy ánh sáng qua những tán cây.\nELLA: Đợi đã! Anh có nghe thấy không? Có gì đó đang di chuyển trong bụi rậm.\n(Một nàng tiên nhỏ xuất hiện, phát sáng nhẹ)\nTIÊN: Đừng sợ. Tôi có thể giúp các em tìm đường về nhà.\nELLA: (thì thầm với James) Chúng ta có nên tin cô ấy không?" },
    { sectionTitle: "4.2 Features of a playscript", sectionTitleVi: "4.2 Đặc điểm của kịch bản", type: "information", text: "A playscript is written to be performed on stage. Character names are written in capitals before their lines. Stage directions are written in brackets and italics — they tell actors what to do: (stands up), (whispers), (exits stage left). Dialogue has no speech marks because the character name shows who is speaking. Scenes divide the play into parts.", textVi: "Kịch bản được viết để biểu diễn trên sân khấu. Tên nhân vật được viết bằng chữ in hoa trước lời thoại. Chỉ dẫn sân khấu được viết trong ngoặc và in nghiêng — chúng cho diễn viên biết phải làm gì: (đứng dậy), (thì thầm), (thoát sân khấu trái). Lời thoại không có dấu ngoặc kép vì tên nhân vật cho thấy ai đang nói. Các cảnh chia vở kịch thành các phần." },
    { sectionTitle: "4.3 Punctuating dialogue", sectionTitleVi: "4.3 Dấu câu trong lời thoại", type: "grammar", text: "In stories, we use speech marks for dialogue: 'I can help you,' said the fairy. In playscripts, we don't use speech marks. Instead: FAIRY: I can help you. Notice the colon after the character name. Stage directions use brackets: FAIRY: (smiling) Follow the starlight path. Both formats need correct punctuation — question marks, exclamation marks, and full stops.", textVi: "Trong truyện, chúng ta sử dụng dấu ngoặc kép cho lời thoại: 'Tôi có thể giúp bạn,' nàng tiên nói. Trong kịch bản, chúng ta không dùng dấu ngoặc kép. Thay vào đó: TIÊN: Tôi có thể giúp bạn. Lưu ý dấu hai chấm sau tên nhân vật. Chỉ dẫn sân khấu dùng ngoặc đơn: TIÊN: (mỉm cười) Hãy đi theo con đường ánh sao. Cả hai định dạng đều cần dấu câu đúng." },
    { sectionTitle: "4.4 The fairy's test", sectionTitleVi: "4.4 Phép thử của nàng tiên", type: "reading", text: "FAIRY: Before I show you the way, you must answer a riddle.\nJAMES: (confidently) We love riddles!\nFAIRY: What has roots that nobody sees, is taller than trees, up and up it goes, and yet never grows?\nELLA: (thinking hard) Hmm... roots... taller than trees...\nJAMES: A mountain! A mountain has roots underground!\nFAIRY: (clapping) Correct! Follow the north star and you will find your village.\nELLA and JAMES: (together) Thank you!\n(They run off stage, laughing)", textVi: "TIÊN: Trước khi chỉ đường, các em phải trả lời một câu đố.\nJAMES: (tự tin) Chúng em thích câu đố!\nTIÊN: Cái gì có rễ mà không ai nhìn thấy, cao hơn cây, lên cao mãi, nhưng không bao giờ lớn?\nELLA: (suy nghĩ) Hmm... rễ... cao hơn cây...\nJAMES: Ngọn núi! Ngọn núi có rễ dưới lòng đất!\nTIÊN: (vỗ tay) Đúng rồi! Hãy đi theo ngôi sao phương Bắc và các em sẽ tìm thấy làng.\nELLA và JAMES: (cùng nhau) Cảm ơn cô!\n(Họ chạy khỏi sân khấu, cười vui)" },
    { sectionTitle: "4.5 Unit 4 Review", sectionTitleVi: "4.5 Ôn tập Bài 4", type: "tip", text: "Well done! You finished Unit 4 about plays and scripts.\n\n✓ We read a play about two children lost in an enchanted forest.\n✓ We learned features of playscripts (character names, stage directions, scenes).\n✓ We compared dialogue punctuation in stories vs plays.\n✓ We read a scene where the fairy tested the children with a riddle.\n\nWrite a short play with two characters and stage directions!", textVi: "Làm tốt lắm! Bạn đã hoàn thành Bài 4 về kịch và kịch bản.\n\n✓ Chúng ta đã đọc một vở kịch về hai đứa trẻ lạc trong khu rừng phù phép.\n✓ Chúng ta đã học các đặc điểm của kịch bản.\n✓ Chúng ta đã so sánh dấu câu trong truyện và kịch bản.\n✓ Chúng ta đã đọc một cảnh nàng tiên thử thách bọn trẻ bằng câu đố.\n\nHãy viết một vở kịch ngắn với hai nhân vật và chỉ dẫn sân khấu!" }
  ],
  // ── CAMBRIDGE G5 U05: Non-fiction Reports ──
  'cam_g5_u05': [
    { sectionTitle: "5.1 The Great Barrier Reef", sectionTitleVi: "5.1 Rạn san hô Great Barrier", type: "reading", text: "The Great Barrier Reef, located off the coast of Australia, is the largest coral reef system in the world. It stretches over 2,300 kilometres and is home to more than 1,500 species of fish. The reef is so large that it can be seen from space. However, rising ocean temperatures and pollution are threatening this natural wonder. Scientists are working hard to protect it for future generations.", textVi: "Rạn san hô Great Barrier, nằm ngoài bờ biển Australia, là hệ thống rạn san hô lớn nhất thế giới. Nó trải dài hơn 2.300 km và là nơi sinh sống của hơn 1.500 loài cá. Rạn san hô lớn đến mức có thể nhìn thấy từ vũ trụ. Tuy nhiên, nhiệt độ đại dương tăng và ô nhiễm đang đe dọa kỳ quan thiên nhiên này. Các nhà khoa học đang nỗ lực bảo vệ nó cho các thế hệ tương lai." },
    { sectionTitle: "5.2 Non-fiction text features", sectionTitleVi: "5.2 Đặc điểm văn bản phi hư cấu", type: "information", text: "Non-fiction reports present factual information in an organised way. They use headings and subheadings to break up text. Technical vocabulary is specific to the topic. Facts and statistics add credibility. Photographs and diagrams support the text. The writing is objective — it presents facts, not the author's opinion. Reports are written in the present tense for current topics.", textVi: "Các báo cáo phi hư cấu trình bày thông tin thực tế một cách có tổ chức. Chúng sử dụng các tiêu đề và tiêu đề phụ để chia nhỏ văn bản. Từ vựng chuyên môn dành riêng cho chủ đề. Sự kiện và số liệu thống kê tăng thêm độ tin cậy. Hình ảnh và sơ đồ hỗ trợ văn bản. Bài viết khách quan — trình bày sự thật, không phải ý kiến của tác giả. Báo cáo được viết ở thì hiện tại cho các chủ đề hiện tại." },
    { sectionTitle: "5.3 Formal vs informal language", sectionTitleVi: "5.3 Ngôn ngữ trang trọng và thân mật", type: "grammar", text: "Reports use formal language. Informal: 'The reef is really cool and has loads of fish.' Formal: 'The reef is a remarkable ecosystem supporting over 1,500 species of fish.' Avoid contractions (don't → do not), slang, and emotional language in formal writing. Use precise vocabulary and complete sentences.", textVi: "Báo cáo sử dụng ngôn ngữ trang trọng. Thân mật: 'Rạn san hô thực sự tuyệt vời và có rất nhiều cá.' Trang trọng: 'Rạn san hô là một hệ sinh thái đáng chú ý hỗ trợ hơn 1.500 loài cá.' Tránh dạng viết tắt, tiếng lóng và ngôn ngữ cảm xúc trong văn bản trang trọng. Sử dụng từ vựng chính xác và câu hoàn chỉnh." },
    { sectionTitle: "5.4 Rainforest report", sectionTitleVi: "5.4 Báo cáo về rừng nhiệt đới", type: "reading", text: "Tropical rainforests cover approximately 6% of the Earth's surface, yet they contain more than half of all plant and animal species. The Amazon rainforest in South America is the largest, spanning nine countries. Rainforests produce oxygen and absorb carbon dioxide, earning them the title 'lungs of the Earth'. Deforestation destroys an area the size of a football pitch every second.", textVi: "Rừng nhiệt đới bao phủ khoảng 6% bề mặt Trái đất, nhưng chứa hơn một nửa tất cả các loài thực vật và động vật. Rừng Amazon ở Nam Mỹ là lớn nhất, trải dài qua chín quốc gia. Rừng nhiệt đới tạo ra oxy và hấp thụ carbon dioxide, khiến chúng được mệnh danh là 'lá phổi của Trái đất'. Phá rừng phá hủy một diện tích bằng một sân bóng đá mỗi giây." },
    { sectionTitle: "5.5 Unit 5 Review", sectionTitleVi: "5.5 Ôn tập Bài 5", type: "tip", text: "Great work! You finished Unit 5 about non-fiction reports.\n\n✓ We read a report about the Great Barrier Reef.\n✓ We learned features of non-fiction texts (headings, facts, formal tone).\n✓ We practiced formal vs informal language.\n✓ We read a factual report about tropical rainforests.\n\nResearch an endangered animal and write a short non-fiction report about it.", textVi: "Làm tốt lắm! Bạn đã hoàn thành Bài 5 về các báo cáo phi hư cấu.\n\n✓ Chúng ta đã đọc báo cáo về Rạn san hô Great Barrier.\n✓ Chúng ta đã học các đặc điểm của văn bản phi hư cấu.\n✓ Chúng ta đã thực hành ngôn ngữ trang trọng và thân mật.\n✓ Chúng ta đã đọc báo cáo về rừng nhiệt đới.\n\nHãy nghiên cứu một loài động vật có nguy cơ tuyệt chủng và viết một báo cáo ngắn về nó." }
  ],
  // ── CAMBRIDGE G5 U06: Classic Poetry ──
  'cam_g5_u06': [
    { sectionTitle: "6.1 The Tyger by William Blake", sectionTitleVi: "6.1 Con hổ của William Blake", type: "reading", text: "Tyger Tyger, burning bright,\nIn the forests of the night;\nWhat immortal hand or eye,\nCould frame thy fearful symmetry?\n\nThis famous poem by William Blake asks a powerful question: who could create something as beautiful and terrifying as a tiger? Blake uses vivid imagery of fire and light to describe the tiger's power and mystery.", textVi: "Hổ ơi Hổ, rực cháy sáng,\nTrong những cánh rừng đêm;\nBàn tay hay đôi mắt bất tử nào,\nCó thể tạo nên sự đối xứng đáng sợ của ngươi?\n\nBài thơ nổi tiếng này của William Blake đặt ra một câu hỏi mạnh mẽ: ai có thể tạo ra thứ gì đó vừa đẹp vừa đáng sợ như một con hổ? Blake sử dụng hình ảnh sống động về lửa và ánh sáng để miêu tả sức mạnh và sự huyền bí của con hổ." },
    { sectionTitle: "6.2 Analysing poetry", sectionTitleVi: "6.2 Phân tích thơ", type: "information", text: "When we analyse a poem, we look at several elements. Theme is what the poem is about. Imagery creates pictures in our minds. Rhyme scheme is the pattern of rhyming words (ABAB, AABB). Rhythm is the beat or flow of the poem. Tone is the mood or feeling. We also look at the poet's choice of words (diction) and what effect they create.", textVi: "Khi phân tích một bài thơ, chúng ta xem xét nhiều yếu tố. Chủ đề là bài thơ nói về điều gì. Hình ảnh tạo ra bức tranh trong tâm trí. Cấu trúc vần là mô hình các từ vần (ABAB, AABB). Nhịp điệu là nhịp hoặc dòng chảy của bài thơ. Giọng điệu là tâm trạng hoặc cảm xúc. Chúng ta cũng xem xét cách chọn từ của nhà thơ và hiệu ứng chúng tạo ra." },
    { sectionTitle: "6.3 Imagery techniques", sectionTitleVi: "6.3 Kỹ thuật hình ảnh", type: "grammar", text: "Poets use imagery to appeal to our senses. Visual imagery: 'The golden sun melted into the sea.' Auditory imagery: 'Thunder rumbled like a hungry stomach.' Tactile imagery: 'The rough bark scratched her fingers.' Olfactory imagery: 'The sweet scent of roses filled the room.' The best poems combine multiple senses to create a complete picture.", textVi: "Các nhà thơ sử dụng hình ảnh để kích thích các giác quan. Hình ảnh thị giác: 'Mặt trời vàng tan chảy vào biển.' Hình ảnh thính giác: 'Sấm ầm ầm như một cái bụng đói.' Hình ảnh xúc giác: 'Vỏ cây thô ráp cào vào ngón tay cô.' Hình ảnh khứu giác: 'Hương thơm ngọt ngào của hoa hồng tràn ngập căn phòng.' Những bài thơ hay nhất kết hợp nhiều giác quan để tạo bức tranh hoàn chỉnh." },
    { sectionTitle: "6.4 Daffodils by William Wordsworth", sectionTitleVi: "6.4 Hoa thủy tiên của William Wordsworth", type: "reading", text: "I wandered lonely as a cloud\nThat floats on high o'er vales and hills,\nWhen all at once I saw a crowd,\nA host, of golden daffodils;\nBeside the lake, beneath the trees,\nFluttering and dancing in the breeze.\n\nWordsworth describes finding thousands of daffodils by a lake. The memory of their beauty brings him happiness whenever he feels lonely.", textVi: "Tôi lang thang cô đơn như một đám mây\nTrôi nổi trên cao qua thung lũng và đồi,\nKhi bỗng nhiên tôi nhìn thấy một đám đông,\nMột đoàn hoa thủy tiên vàng rực;\nBên hồ, dưới những tán cây,\nBay phấp phới và nhảy múa trong gió.\n\nWordsworth miêu tả việc tìm thấy hàng nghìn bông hoa thủy tiên bên hồ. Ký ức về vẻ đẹp của chúng mang lại cho ông niềm hạnh phúc mỗi khi ông cảm thấy cô đơn." },
    { sectionTitle: "6.5 Unit 6 Review", sectionTitleVi: "6.5 Ôn tập Bài 6", type: "tip", text: "Fantastic! You finished Unit 6 about classic poetry.\n\n✓ We read 'The Tyger' by William Blake.\n✓ We learned how to analyse poetry (theme, imagery, rhyme, rhythm).\n✓ We practiced identifying different types of imagery.\n✓ We read 'Daffodils' by William Wordsworth.\n\nChoose your favourite poem from this unit and explain why you like it.", textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 6 về thơ cổ điển.\n\n✓ Chúng ta đã đọc 'Con Hổ' của William Blake.\n✓ Chúng ta đã học cách phân tích thơ (chủ đề, hình ảnh, vần, nhịp).\n✓ Chúng ta đã thực hành nhận biết các loại hình ảnh khác nhau.\n✓ Chúng ta đã đọc 'Hoa Thủy Tiên' của William Wordsworth.\n\nHãy chọn bài thơ yêu thích của bạn từ bài này và giải thích tại sao bạn thích nó." }
  ],
  // ── CAMBRIDGE G5 U07: Biographies ──
  'cam_g5_u07': [
    { sectionTitle: "7.1 The life of Marie Curie", sectionTitleVi: "7.1 Cuộc đời Marie Curie", type: "reading", text: "Marie Curie was born in Warsaw, Poland, in 1867. She moved to Paris to study science at a time when few women attended university. With her husband Pierre, she discovered two new elements: polonium and radium. She became the first woman to win a Nobel Prize and remains the only person to win Nobel Prizes in two different sciences — physics and chemistry.", textVi: "Marie Curie sinh ra tại Warsaw, Ba Lan, năm 1867. Bà chuyển đến Paris để học khoa học vào thời điểm ít phụ nữ theo học đại học. Cùng chồng Pierre, bà đã phát hiện hai nguyên tố mới: polonium và radium. Bà trở thành người phụ nữ đầu tiên giành giải Nobel và vẫn là người duy nhất giành giải Nobel trong hai lĩnh vực khoa học khác nhau — vật lý và hóa học." },
    { sectionTitle: "7.2 Writing biographies", sectionTitleVi: "7.2 Viết tiểu sử", type: "information", text: "A biography tells the story of a real person's life, written by someone else. It is written in the third person (he/she) and in chronological order. Key events are highlighted: birth, education, achievements, and legacy. An autobiography is different — it is written by the person themselves, in the first person (I).", textVi: "Tiểu sử kể câu chuyện cuộc đời của một người thật, được viết bởi người khác. Nó được viết ở ngôi thứ ba (anh ấy/cô ấy) và theo thứ tự thời gian. Các sự kiện quan trọng được nêu bật: sinh ra, học vấn, thành tích và di sản. Tự truyện thì khác — nó được viết bởi chính người đó, ở ngôi thứ nhất (tôi)." },
    { sectionTitle: "7.3 Cohesive devices", sectionTitleVi: "7.3 Phương tiện liên kết", type: "grammar", text: "Biographies use cohesive devices to link ideas across paragraphs. Time connectives: 'Later', 'Eventually', 'By the age of 24'. Pronouns replace repeated names: 'Marie... She...' Synonyms add variety: 'the scientist', 'the researcher', 'Curie'. These devices make the text flow smoothly from one event to the next.", textVi: "Tiểu sử sử dụng các phương tiện liên kết để nối các ý giữa các đoạn. Từ nối thời gian: 'Sau đó', 'Cuối cùng', 'Vào năm 24 tuổi'. Đại từ thay thế tên lặp lại: 'Marie... Bà...' Từ đồng nghĩa tăng sự đa dạng: 'nhà khoa học', 'nhà nghiên cứu', 'Curie'. Các phương tiện này giúp văn bản chuyển tiếp mượt mà." },
    { sectionTitle: "7.4 Nelson Mandela", sectionTitleVi: "7.4 Nelson Mandela", type: "reading", text: "Nelson Mandela was born in South Africa in 1918. He fought against apartheid, a system that separated people by the colour of their skin. For his beliefs, he was imprisoned for 27 years. After his release, he became South Africa's first Black president in 1994. He worked to unite the country and promote forgiveness. He once said, 'Education is the most powerful weapon which you can use to change the world.'", textVi: "Nelson Mandela sinh ra ở Nam Phi năm 1918. Ông đấu tranh chống lại chế độ apartheid, một hệ thống phân biệt con người theo màu da. Vì niềm tin của mình, ông bị giam cầm 27 năm. Sau khi được thả, ông trở thành tổng thống da đen đầu tiên của Nam Phi năm 1994. Ông đã làm việc để đoàn kết đất nước và thúc đẩy sự tha thứ. Ông từng nói: 'Giáo dục là vũ khí mạnh mẽ nhất mà bạn có thể sử dụng để thay đổi thế giới.'" },
    { sectionTitle: "7.5 Unit 7 Review", sectionTitleVi: "7.5 Ôn tập Bài 7", type: "tip", text: "Excellent! You finished Unit 7 about biographies.\n\n✓ We read about the life of Marie Curie.\n✓ We learned features of biographies (third person, chronological order).\n✓ We practiced cohesive devices (time connectives, pronouns, synonyms).\n✓ We read about Nelson Mandela's fight for equality.\n\nChoose someone you admire and write a short biography about them.", textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 7 về tiểu sử.\n\n✓ Chúng ta đã đọc về cuộc đời Marie Curie.\n✓ Chúng ta đã học các đặc điểm của tiểu sử.\n✓ Chúng ta đã thực hành phương tiện liên kết.\n✓ Chúng ta đã đọc về cuộc đấu tranh của Nelson Mandela.\n\nHãy chọn một người bạn ngưỡng mộ và viết một tiểu sử ngắn về họ." }
  ],
  // ── CAMBRIDGE G5 U08: Suspense Stories ──
  'cam_g5_u08': [
    { sectionTitle: "8.1 The old house", sectionTitleVi: "8.1 Ngôi nhà cũ", type: "reading", text: "The door creaked open. Inside, the air was thick with dust and the smell of damp wood. Cobwebs hung from the ceiling like grey curtains. Liam's torch flickered, casting strange shadows on the walls. He heard a soft tapping sound coming from upstairs. His heart hammered in his chest. Every instinct told him to run, but his feet kept moving forward, step by slow step.", textVi: "Cánh cửa kẽo kẹt mở ra. Bên trong, không khí đặc quánh bụi bẩn và mùi gỗ ẩm. Mạng nhện treo từ trần nhà như những tấm rèm xám. Đèn pin của Liam nhấp nháy, tạo ra những bóng kỳ lạ trên tường. Cậu nghe thấy một tiếng gõ nhẹ từ tầng trên. Tim cậu đập thình thịch trong lồng ngực. Mọi bản năng nói cậu hãy chạy, nhưng chân cậu vẫn tiếp tục bước về phía trước, từng bước chậm rãi." },
    { sectionTitle: "8.2 Building suspense", sectionTitleVi: "8.2 Xây dựng hồi hộp", type: "information", text: "Writers build suspense by making the reader feel uncertain about what will happen next. Techniques include: short sentences for tension ('He stopped. Listened. Nothing.'), cliffhangers at the end of chapters, foreshadowing (hints about danger), and pathetic fallacy (using weather to reflect mood — a storm for fear). Suspense keeps the reader turning pages.", textVi: "Các nhà văn xây dựng sự hồi hộp bằng cách làm cho người đọc cảm thấy không chắc chắn về điều gì sẽ xảy ra tiếp theo. Các kỹ thuật bao gồm: câu ngắn tạo căng thẳng ('Cậu dừng lại. Lắng nghe. Không có gì.'), kết thúc hấp dẫn ở cuối chương, báo hiệu trước (gợi ý về nguy hiểm), và phép ngụ cảm (dùng thời tiết phản ánh tâm trạng — bão tố cho sự sợ hãi). Sự hồi hộp giữ cho người đọc lật trang liên tục." },
    { sectionTitle: "8.3 Sentence variety for effect", sectionTitleVi: "8.3 Đa dạng câu tạo hiệu ứng", type: "grammar", text: "Varying sentence length creates powerful effects. Long sentences build atmosphere: 'The wind howled through the broken windows, sending shivers down his spine as the shadows danced across the cracked walls.' Short sentences create shock: 'He turned. A face. Right there.' Questions build tension: 'Was someone watching him?' Fragments add drama: 'Silence. Then a scream.'", textVi: "Thay đổi độ dài câu tạo ra hiệu ứng mạnh mẽ. Câu dài xây dựng không khí: 'Gió rít qua những cửa sổ vỡ, gửi những cơn rùng mình xuống xương sống cậu khi những bóng tối nhảy múa trên những bức tường nứt.' Câu ngắn tạo sốc: 'Cậu quay lại. Một khuôn mặt. Ngay đó.' Câu hỏi tạo căng thẳng: 'Có ai đó đang theo dõi cậu không?' Câu rút gọn thêm kịch tính: 'Im lặng. Rồi một tiếng hét.'" },
    { sectionTitle: "8.4 What was upstairs?", sectionTitleVi: "8.4 Có gì ở tầng trên?", type: "reading", text: "Liam reached the top of the stairs. The tapping was louder now. It came from behind a closed door at the end of the corridor. He reached for the handle. His hand was shaking. He pushed the door open and saw — a window, open wide, with a branch tapping against the glass in the wind. He laughed with relief. Just a tree. He looked out and saw the most beautiful sunset he had ever seen.", textVi: "Liam lên đến đầu cầu thang. Tiếng gõ giờ to hơn. Nó phát ra từ phía sau một cánh cửa đóng ở cuối hành lang. Cậu với tay nắm cửa. Tay cậu run rẩy. Cậu đẩy cửa mở và thấy — một cửa sổ, mở rộng, với một cành cây gõ vào kính trong gió. Cậu cười nhẹ nhõm. Chỉ là một cái cây. Cậu nhìn ra và thấy hoàng hôn đẹp nhất mà cậu từng thấy." },
    { sectionTitle: "8.5 Unit 8 Review", sectionTitleVi: "8.5 Ôn tập Bài 8", type: "tip", text: "Brilliant! You finished Unit 8 about suspense stories.\n\n✓ We read a suspenseful story about an old house.\n✓ We learned techniques for building suspense.\n✓ We practiced varying sentence length for dramatic effect.\n✓ We discovered the surprise ending to Liam's adventure.\n\nWrite the opening paragraph of your own suspense story using short and long sentences.", textVi: "Tuyệt vời! Bạn đã hoàn thành Bài 8 về truyện hồi hộp.\n\n✓ Chúng ta đã đọc một câu chuyện hồi hộp về ngôi nhà cũ.\n✓ Chúng ta đã học các kỹ thuật xây dựng sự hồi hộp.\n✓ Chúng ta đã thực hành thay đổi độ dài câu tạo hiệu ứng kịch tính.\n✓ Chúng ta đã khám phá cái kết bất ngờ cho cuộc phiêu lưu của Liam.\n\nHãy viết đoạn mở đầu của câu chuyện hồi hộp của riêng bạn!" }
  ],
  // ── CAMBRIDGE G5 U09: Debate & Discussion ──
  'cam_g5_u09': [
    { sectionTitle: "9.1 Should animals be kept in zoos?", sectionTitleVi: "9.1 Có nên giữ động vật trong sở thú không?", type: "reading", text: "FOR: Zoos protect endangered species from extinction. They breed animals and release them into the wild. Zoos also educate people about wildlife conservation. Without zoos, many species would have disappeared entirely.\n\nAGAINST: Animals in zoos live in small enclosures, far from their natural habitat. They often show signs of stress and boredom. Wild animals belong in the wild, not behind bars for human entertainment.", textVi: "ỦNG HỘ: Sở thú bảo vệ các loài có nguy cơ tuyệt chủng. Chúng nhân giống động vật và thả chúng về tự nhiên. Sở thú cũng giáo dục mọi người về bảo tồn động vật hoang dã. Nếu không có sở thú, nhiều loài đã biến mất hoàn toàn.\n\nPHẢN ĐỐI: Động vật trong sở thú sống trong các khu vực nhỏ hẹp, xa môi trường sống tự nhiên. Chúng thường biểu hiện dấu hiệu căng thẳng và buồn chán. Động vật hoang dã thuộc về tự nhiên, không phải đằng sau song sắt để giải trí cho con người." },
    { sectionTitle: "9.2 Balanced arguments", sectionTitleVi: "9.2 Lập luận cân bằng", type: "information", text: "A balanced argument presents both sides of a debate fairly. It starts with an introduction stating the issue. Then it presents arguments FOR, followed by arguments AGAINST. Each point is supported by evidence. The conclusion summarises both sides and may give the writer's opinion. The tone must remain respectful throughout.", textVi: "Một lập luận cân bằng trình bày cả hai phía của cuộc tranh luận một cách công bằng. Nó bắt đầu bằng phần giới thiệu nêu vấn đề. Sau đó trình bày các lập luận ỦNG HỘ, tiếp theo là các lập luận PHẢN ĐỐI. Mỗi luận điểm được hỗ trợ bởi bằng chứng. Phần kết luận tóm tắt cả hai phía và có thể đưa ra ý kiến của người viết. Giọng điệu phải luôn tôn trọng." },
    { sectionTitle: "9.3 Persuasive techniques", sectionTitleVi: "9.3 Kỹ thuật thuyết phục", type: "grammar", text: "Debaters use rhetorical techniques to persuade. Rhetorical questions: 'How would you feel trapped in a cage?' Rule of three: 'Zoos educate, protect, and inspire.' Emotive language: 'innocent creatures suffering behind cold bars.' Statistics: '1 in 4 mammals is at risk of extinction.' Repetition: 'We must act now. We must protect wildlife. We must change.'", textVi: "Người tranh luận sử dụng các kỹ thuật tu từ để thuyết phục. Câu hỏi tu từ: 'Bạn sẽ cảm thấy thế nào khi bị nhốt trong lồng?' Quy tắc ba: 'Sở thú giáo dục, bảo vệ và truyền cảm hứng.' Ngôn ngữ cảm xúc: 'những sinh vật vô tội đau khổ sau những song sắt lạnh lẽo.' Số liệu thống kê: '1 trong 4 loài động vật có vú có nguy cơ tuyệt chủng.' Lặp lại: 'Chúng ta phải hành động ngay. Chúng ta phải bảo vệ động vật hoang dã. Chúng ta phải thay đổi.'" },
    { sectionTitle: "9.4 The class debate", sectionTitleVi: "9.4 Cuộc tranh luận trong lớp", type: "reading", text: "Ms. Patel's class held a debate about school uniforms. Team A argued that uniforms create equality — nobody is judged by their clothes. Team B argued that uniforms limit self-expression and creativity. Both teams used evidence, spoke clearly, and listened respectfully. In the end, the class voted. The result was close: 16 to 14 in favour of uniforms. Ms. Patel said, 'The winner today is everyone, because you all argued brilliantly.'", textVi: "Lớp của cô Patel tổ chức một cuộc tranh luận về đồng phục học sinh. Đội A lập luận rằng đồng phục tạo sự bình đẳng — không ai bị đánh giá bởi quần áo. Đội B lập luận rằng đồng phục hạn chế sự thể hiện bản thân và sáng tạo. Cả hai đội đều sử dụng bằng chứng, nói rõ ràng và lắng nghe tôn trọng. Cuối cùng, cả lớp bỏ phiếu. Kết quả rất sát: 16 đối 14 ủng hộ đồng phục. Cô Patel nói: 'Người chiến thắng hôm nay là tất cả, vì các em đều lập luận tuyệt vời.'" },
    { sectionTitle: "9.5 Unit 9 Review", sectionTitleVi: "9.5 Ôn tập Bài 9", type: "tip", text: "Well done! You finished Unit 9 about debate and discussion.\n\n✓ We explored both sides of the zoo debate.\n✓ We learned how to write a balanced argument.\n✓ We practiced persuasive techniques (rhetorical questions, rule of three).\n✓ We read about a class debate on school uniforms.\n\nHold your own debate! Pick a topic, choose a side, and present your strongest arguments.", textVi: "Làm tốt lắm! Bạn đã hoàn thành Bài 9 về tranh luận và thảo luận.\n\n✓ Chúng ta đã khám phá cả hai phía của cuộc tranh luận về sở thú.\n✓ Chúng ta đã học cách viết lập luận cân bằng.\n✓ Chúng ta đã thực hành kỹ thuật thuyết phục.\n✓ Chúng ta đã đọc về cuộc tranh luận trong lớp về đồng phục.\n\nHãy tổ chức cuộc tranh luận của riêng bạn! Chọn một chủ đề, chọn một bên, và trình bày những lập luận mạnh nhất." }
  ],
};

/**
 * Unit-specific vocabulary — each unit gets vocab matching its theme
 * instead of random hash-selected vocab themes.
 */
export interface UnitVocabOverride {
  title: string;
  titleVi: string;
  words: string[];
  wordsVi: string[];
}

export const UNIT_VOCAB_OVERRIDES: Record<string, UnitVocabOverride> = {
  // ── CAMBRIDGE G1 ──
  'cam_g1_u01': { title: 'Playing with friends', titleVi: 'Chơi với bạn bè', words: ['friend', 'playground', 'swing', 'ball', 'run', 'jump', 'share', 'please', 'thank you', 'fun'], wordsVi: ['bạn', 'sân chơi', 'xích đu', 'bóng', 'chạy', 'nhảy', 'chia sẻ', 'làm ơn', 'cảm ơn', 'vui'] },
  'cam_g1_u02': { title: 'Finding out and making', titleVi: 'Khám phá và làm đồ', words: ['paper', 'fold', 'triangle', 'hat', 'square', 'instructions', 'first', 'next', 'then', 'finally'], wordsVi: ['giấy', 'gấp', 'tam giác', 'mũ', 'hình vuông', 'hướng dẫn', 'đầu tiên', 'tiếp theo', 'sau đó', 'cuối cùng'] },
  'cam_g1_u03': { title: 'Rhyme time', titleVi: 'Thời gian vần điệu', words: ['dock', 'clock', 'mouse', 'rhyme', 'cat', 'hat', 'star', 'car', 'buckle', 'shoe', 'door', 'hen', 'fiddle', 'moon', 'spoon', 'fire', 'hose', 'jelly', 'belly', 'poet'], wordsVi: ['bến', 'đồng hồ', 'chuột', 'vần', 'mèo', 'mũ', 'ngôi sao', 'xe', 'khuy', 'giày', 'cửa', 'gà mái', 'đàn', 'mặt trăng', 'muỗng', 'lửa', 'vòi nước', 'thạch', 'bụng', 'nhà thơ'] },
  'cam_g1_u04': { title: 'Joining-in stories', titleVi: 'Truyện cùng kể', words: ['turnip', 'pull', 'enormous', 'old man', 'old woman', 'boy', 'soup', 'together', 'finally', 'pop'], wordsVi: ['củ cải', 'kéo', 'khổng lồ', 'ông lão', 'bà lão', 'cậu bé', 'súp', 'cùng nhau', 'cuối cùng', 'bụp'] },
  'cam_g1_u05': { title: 'Reading to find out', titleVi: 'Đọc để tìm hiểu', words: ['elephant', 'mouse', 'bird', 'fish', 'trunk', 'tail', 'fly', 'swim', 'big', 'small'], wordsVi: ['voi', 'chuột', 'chim', 'cá', 'vòi', 'đuôi', 'bay', 'bơi', 'to', 'nhỏ'] },
  'cam_g1_u06': { title: 'Rhyme time 2', titleVi: 'Thời gian vần điệu 2', words: ['Jack', 'Jill', 'hill', 'pail', 'water', 'crown', 'tumble', 'rhythm', 'song', 'nursery'], wordsVi: ['Jack', 'Jill', 'đồi', 'thùng', 'nước', 'vương miện', 'lăn cù', 'nhịp điệu', 'bài hát', 'đồng dao'] },
  'cam_g1_u07': { title: 'Make-believe stories', titleVi: 'Truyện tưởng tượng', words: ['rabbit', 'jacket', 'bear', 'tea', 'imagine', 'make-believe', 'polite', 'brave', 'story', 'real'], wordsVi: ['thỏ', 'áo khoác', 'gấu', 'trà', 'tưởng tượng', 'giả tưởng', 'lịch sự', 'dũng cảm', 'câu chuyện', 'thật'] },
  'cam_g1_u08': { title: 'Things that have happened', titleVi: 'Những điều đã xảy ra', words: ['yesterday', 'zoo', 'giraffe', 'monkey', 'brother', 'family', 'happy', 'laughed', 'visited', 'true'], wordsVi: ['hôm qua', 'sở thú', 'hươu cao cổ', 'khỉ', 'anh/em trai', 'gia đình', 'vui', 'cười', 'đến thăm', 'thật'] },
  'cam_g1_u09': { title: 'Poems and rhymes on a theme', titleVi: 'Thơ và vần theo chủ đề', words: ['rain', 'sun', 'wind', 'poem', 'theme', 'weather', 'roof', 'bright', 'blow', 'write'], wordsVi: ['mưa', 'mặt trời', 'gió', 'bài thơ', 'chủ đề', 'thời tiết', 'mái nhà', 'sáng', 'thổi', 'viết'] },
  // ── CAMBRIDGE G2 ──
  'cam_g2_u01': { title: 'Stories about things we know', titleVi: 'Truyện về những điều quen thuộc', words: ['family', 'mother', 'father', 'sister', 'brother', 'grandparent', 'home', 'love', 'care', 'together'], wordsVi: ['gia đình', 'mẹ', 'cha', 'chị/em gái', 'anh/em trai', 'ông bà', 'nhà', 'yêu', 'chăm sóc', 'cùng nhau'] },
  'cam_g2_u02': { title: 'How to write instructions', titleVi: 'Cách viết hướng dẫn', words: ['badge', 'label', 'sign', 'name', 'purpose', 'design', 'shape', 'colour', 'display', 'instruction'], wordsVi: ['huy hiệu', 'nhãn', 'biển hiệu', 'tên', 'mục đích', 'thiết kế', 'hình dạng', 'màu sắc', 'trưng bày', 'hướng dẫn'] },
  'cam_g2_u03': { title: 'Poems and rhymes about places and people we know', titleVi: 'Thơ và vần về nơi chốn và con người quen thuộc', words: ['sound', 'loud', 'quiet', 'listen', 'hear', 'whisper', 'shout', 'music', 'noise', 'silence'], wordsVi: ['âm thanh', 'to', 'nhỏ', 'lắng nghe', 'nghe', 'thì thầm', 'hét', 'nhạc', 'tiếng ồn', 'yên lặng'] },
  'cam_g2_u04': { title: 'Stories from around the world with a tale to tell', titleVi: 'Truyện từ khắp thế giới có bài học', words: ['castle', 'knight', 'king', 'queen', 'dragon', 'ancient', 'history', 'battle', 'armour', 'treasure'], wordsVi: ['lâu đài', 'hiệp sĩ', 'vua', 'hoàng hậu', 'rồng', 'cổ đại', 'lịch sử', 'trận chiến', 'áo giáp', 'kho báu'] },
  'cam_g2_u05': { title: 'What is my house made of?', titleVi: 'Ngôi nhà của tôi làm bằng gì?', words: ['computer', 'robot', 'screen', 'keyboard', 'mouse', 'program', 'code', 'button', 'machine', 'future'], wordsVi: ['máy tính', 'người máy', 'màn hình', 'bàn phím', 'chuột', 'chương trình', 'mã', 'nút', 'máy móc', 'tương lai'] },
  'cam_g2_u06': { title: 'Poems by famous poets', titleVi: 'Thơ của các nhà thơ nổi tiếng', words: ['journey', 'travel', 'map', 'road', 'destination', 'vehicle', 'adventure', 'explore', 'compass', 'distance'], wordsVi: ['hành trình', 'du lịch', 'bản đồ', 'con đường', 'điểm đến', 'phương tiện', 'phiêu lưu', 'khám phá', 'la bàn', 'khoảng cách'] },
  'cam_g2_u07': { title: 'Stories by famous writers', titleVi: 'Truyện của tác giả nổi tiếng', words: ['author', 'story', 'character', 'illustrate', 'chapter', 'title', 'fiction', 'imagine', 'publish', 'library'], wordsVi: ['tác giả', 'câu chuyện', 'nhân vật', 'minh họa', 'chương', 'tiêu đề', 'hư cấu', 'tưởng tượng', 'xuất bản', 'thư viện'] },
  'cam_g2_u08': { title: 'Things under the sea', titleVi: 'Những thứ dưới biển', words: ['ocean', 'fish', 'whale', 'shark', 'coral', 'seaweed', 'turtle', 'starfish', 'dolphin', 'wave'], wordsVi: ['đại dương', 'cá', 'cá voi', 'cá mập', 'san hô', 'rong biển', 'rùa', 'sao biển', 'cá heo', 'sóng'] },
  'cam_g2_u09': { title: 'All kinds of creatures', titleVi: 'Đủ loại sinh vật', words: ['insect', 'spider', 'butterfly', 'beetle', 'ant', 'caterpillar', 'wings', 'legs', 'crawl', 'habitat'], wordsVi: ['côn trùng', 'nhện', 'bướm', 'bọ cánh cứng', 'kiến', 'sâu bướm', 'cánh', 'chân', 'bò', 'môi trường sống'] },
  // ── CAMBRIDGE G3 ──
  'cam_g3_u01': { title: 'Ordinary days', titleVi: 'Những ngày bình thường', words: ['wake up', 'breakfast', 'brush teeth', 'school', 'homework', 'lunch', 'dinner', 'bedtime', 'routine', 'everyday'], wordsVi: ['thức dậy', 'ăn sáng', 'đánh răng', 'trường', 'bài tập', 'ăn trưa', 'ăn tối', 'giờ ngủ', 'thói quen', 'hàng ngày'] },
  'cam_g3_u02': { title: "Let's have a party!", titleVi: 'Hãy mở tiệc nào!', words: ['party', 'invitation', 'balloon', 'cake', 'celebrate', 'decorate', 'candle', 'present', 'streamer', 'guest'], wordsVi: ['tiệc', 'thiệp mời', 'bóng bay', 'bánh', 'ăn mừng', 'trang trí', 'nến', 'quà', 'ruy băng', 'khách'] },
  'cam_g3_u03': { title: 'See, hear, feel, enjoy', titleVi: 'Nhìn, nghe, cảm nhận, thưởng thức', words: ['see', 'hear', 'feel', 'smell', 'taste', 'music', 'painting', 'sculpture', 'texture', 'enjoy'], wordsVi: ['nhìn', 'nghe', 'cảm nhận', 'ngửi', 'nếm', 'nhạc', 'tranh', 'tượng', 'kết cấu', 'thưởng thức'] },
  'cam_g3_u04': { title: 'Fiery beginnings', titleVi: 'Khởi đầu rực lửa', words: ['volcano', 'lava', 'eruption', 'fire', 'heat', 'smoke', 'ash', 'molten', 'destroy', 'ancient'], wordsVi: ['núi lửa', 'dung nham', 'phun trào', 'lửa', 'nhiệt', 'khói', 'tro', 'nóng chảy', 'phá hủy', 'cổ đại'] },
  'cam_g3_u05': { title: 'Letters', titleVi: 'Thư từ', words: ['letter', 'envelope', 'stamp', 'address', 'dear', 'sincerely', 'postcard', 'reply', 'mailbox', 'message'], wordsVi: ['thư', 'phong bì', 'tem', 'địa chỉ', 'thân mến', 'trân trọng', 'bưu thiếp', 'trả lời', 'hòm thư', 'tin nhắn'] },
  'cam_g3_u06': { title: 'Poems from around the world', titleVi: 'Thơ từ khắp thế giới', words: ['poem', 'verse', 'rhyme', 'rhythm', 'stanza', 'haiku', 'limerick', 'poet', 'imagery', 'feelings'], wordsVi: ['bài thơ', 'vần', 'vần điệu', 'nhịp', 'khổ thơ', 'thơ haiku', 'thơ limerick', 'nhà thơ', 'hình ảnh', 'cảm xúc'] },
  'cam_g3_u07': { title: 'Dragons and pirates', titleVi: 'Rồng và cướp biển', words: ['dragon', 'pirate', 'treasure', 'sword', 'castle', 'cave', 'adventure', 'map', 'quest', 'brave'], wordsVi: ['rồng', 'cướp biển', 'kho báu', 'kiếm', 'lâu đài', 'hang động', 'phiêu lưu', 'bản đồ', 'hành trình', 'dũng cảm'] },
  'cam_g3_u08': { title: 'Wonderful world', titleVi: 'Thế giới kỳ diệu', words: ['mountain', 'river', 'forest', 'desert', 'ocean', 'waterfall', 'island', 'reef', 'glacier', 'rainbow'], wordsVi: ['núi', 'sông', 'rừng', 'sa mạc', 'đại dương', 'thác nước', 'hòn đảo', 'rạn san hô', 'sông băng', 'cầu vồng'] },
  'cam_g3_u09': { title: 'Laughing allowed', titleVi: 'Được phép cười', words: ['joke', 'laugh', 'funny', 'punchline', 'comedy', 'riddle', 'humour', 'clown', 'giggle', 'amuse'], wordsVi: ['trò đùa', 'cười', 'buồn cười', 'câu kết', 'hài', 'câu đố', 'hài hước', 'chú hề', 'cười khúc khích', 'vui vẻ'] },
  // ── CAMBRIDGE G4 ──
  'cam_g4_u01': { title: 'Storybook', titleVi: 'Sách truyện', words: ['story', 'character', 'setting', 'plot', 'chapter', 'narrator', 'fiction', 'genre', 'suspense', 'resolution'], wordsVi: ['câu chuyện', 'nhân vật', 'bối cảnh', 'cốt truyện', 'chương', 'người kể', 'hư cấu', 'thể loại', 'hồi hộp', 'giải quyết'] },
  'cam_g4_u02': { title: 'Going deep', titleVi: 'Đi sâu', words: ['research', 'investigate', 'evidence', 'discover', 'explore', 'observation', 'conclusion', 'source', 'data', 'analyse'], wordsVi: ['nghiên cứu', 'điều tra', 'bằng chứng', 'khám phá', 'thám hiểm', 'quan sát', 'kết luận', 'nguồn', 'dữ liệu', 'phân tích'] },
  'cam_g4_u03': { title: 'Mind pictures', titleVi: 'Hình ảnh trong tâm trí', words: ['imagery', 'describe', 'visualise', 'senses', 'metaphor', 'simile', 'vivid', 'scene', 'detail', 'impression'], wordsVi: ['hình ảnh', 'miêu tả', 'hình dung', 'giác quan', 'ẩn dụ', 'so sánh', 'sống động', 'cảnh', 'chi tiết', 'ấn tượng'] },
  'cam_g4_u04': { title: 'Just imagine', titleVi: 'Hãy tưởng tượng', words: ['imagine', 'creative', 'invention', 'fantasy', 'possibility', 'wonder', 'dream', 'original', 'design', 'inspire'], wordsVi: ['tưởng tượng', 'sáng tạo', 'phát minh', 'huyễn tưởng', 'khả năng', 'kỳ diệu', 'giấc mơ', 'nguyên bản', 'thiết kế', 'truyền cảm hứng'] },
  'cam_g4_u05': { title: 'Making the news', titleVi: 'Làm tin tức', words: ['headline', 'journalist', 'report', 'interview', 'broadcast', 'article', 'editor', 'fact', 'opinion', 'media'], wordsVi: ['tiêu đề', 'nhà báo', 'báo cáo', 'phỏng vấn', 'phát sóng', 'bài báo', 'biên tập', 'sự thật', 'ý kiến', 'truyền thông'] },
  'cam_g4_u06': { title: 'Sensational poems', titleVi: 'Thơ ấn tượng', words: ['poem', 'stanza', 'rhythm', 'rhyme', 'verse', 'imagery', 'alliteration', 'onomatopoeia', 'syllable', 'emotion'], wordsVi: ['bài thơ', 'khổ thơ', 'nhịp', 'vần', 'câu thơ', 'hình ảnh', 'điệp âm', 'từ tượng thanh', 'âm tiết', 'cảm xúc'] },
  'cam_g4_u07': { title: 'What would you do?', titleVi: 'Bạn sẽ làm gì?', words: ['dilemma', 'choice', 'consequence', 'decision', 'moral', 'responsible', 'honest', 'brave', 'character', 'conflict'], wordsVi: ['tình huống khó xử', 'lựa chọn', 'hậu quả', 'quyết định', 'đạo đức', 'có trách nhiệm', 'trung thực', 'dũng cảm', 'nhân vật', 'xung đột'] },
  'cam_g4_u08': { title: 'Food for thought', titleVi: 'Suy ngẫm', words: ['explanation', 'cause', 'effect', 'process', 'reason', 'diagram', 'because', 'therefore', 'result', 'conclude'], wordsVi: ['giải thích', 'nguyên nhân', 'hệ quả', 'quá trình', 'lý do', 'sơ đồ', 'bởi vì', 'do đó', 'kết quả', 'kết luận'] },
  'cam_g4_u09': { title: 'Poems to ponder', titleVi: 'Thơ để suy ngẫm', words: ['ponder', 'reflect', 'figurative', 'literal', 'personification', 'theme', 'mood', 'tone', 'symbol', 'interpretation'], wordsVi: ['suy ngẫm', 'phản ánh', 'nghĩa bóng', 'nghĩa đen', 'nhân hóa', 'chủ đề', 'tâm trạng', 'giọng điệu', 'biểu tượng', 'diễn giải'] },
  // ── CAMBRIDGE G5 ──
  'cam_g5_u01': { title: "There's a lesson in that", titleVi: 'Có bài học trong đó', words: ['fable', 'moral', 'lesson', 'wisdom', 'proverb', 'folktale', 'tradition', 'virtue', 'character', 'consequence'], wordsVi: ['ngụ ngôn', 'đạo đức', 'bài học', 'trí tuệ', 'tục ngữ', 'truyện dân gian', 'truyền thống', 'đức tính', 'nhân vật', 'hậu quả'] },
  'cam_g5_u02': { title: 'Exploring space', titleVi: 'Khám phá không gian', words: ['astronaut', 'planet', 'galaxy', 'orbit', 'telescope', 'rocket', 'satellite', 'gravity', 'atmosphere', 'universe'], wordsVi: ['phi hành gia', 'hành tinh', 'thiên hà', 'quỹ đạo', 'kính viễn vọng', 'tên lửa', 'vệ tinh', 'trọng lực', 'khí quyển', 'vũ trụ'] },
  'cam_g5_u03': { title: 'Reflections', titleVi: 'Suy ngẫm', words: ['reflect', 'journal', 'diary', 'memoir', 'introspection', 'perspective', 'emotion', 'growth', 'experience', 'memory'], wordsVi: ['suy ngẫm', 'nhật ký', 'nhật ký', 'hồi ký', 'tự xem xét', 'góc nhìn', 'cảm xúc', 'trưởng thành', 'trải nghiệm', 'ký ức'] },
  'cam_g5_u04': { title: 'Myths and legends forever', titleVi: 'Thần thoại và truyền thuyết mãi mãi', words: ['myth', 'legend', 'hero', 'quest', 'deity', 'ancient', 'supernatural', 'epic', 'prophecy', 'fate'], wordsVi: ['thần thoại', 'truyền thuyết', 'anh hùng', 'sứ mệnh', 'vị thần', 'cổ đại', 'siêu nhiên', 'sử thi', 'tiên tri', 'số phận'] },
  'cam_g5_u05': { title: 'Tell me how…', titleVi: 'Hãy nói cho tôi cách…', words: ['explanation', 'process', 'instruction', 'procedure', 'method', 'sequence', 'diagram', 'demonstrate', 'illustrate', 'clarify'], wordsVi: ['giải thích', 'quá trình', 'hướng dẫn', 'thủ tục', 'phương pháp', 'trình tự', 'sơ đồ', 'minh họa', 'chứng minh', 'làm rõ'] },
  'cam_g5_u06': { title: 'A different type of story', titleVi: 'Một kiểu truyện khác', words: ['genre', 'science fiction', 'mystery', 'detective', 'thriller', 'suspense', 'twist', 'clue', 'plot', 'narrative'], wordsVi: ['thể loại', 'khoa học viễn tưởng', 'bí ẩn', 'thám tử', 'giật gân', 'hồi hộp', 'bất ngờ', 'manh mối', 'cốt truyện', 'tường thuật'] },
  'cam_g5_u07': { title: 'A box of delights', titleVi: 'Hộp niềm vui', words: ['anthology', 'collection', 'variety', 'selection', 'treasure', 'delight', 'favourite', 'classic', 'recommend', 'review'], wordsVi: ['tuyển tập', 'bộ sưu tập', 'đa dạng', 'lựa chọn', 'kho báu', 'niềm vui', 'yêu thích', 'kinh điển', 'giới thiệu', 'đánh giá'] },
  'cam_g5_u08': { title: 'Share your views', titleVi: 'Chia sẻ quan điểm', words: ['opinion', 'argument', 'debate', 'persuade', 'evidence', 'viewpoint', 'agree', 'disagree', 'balanced', 'conclusion'], wordsVi: ['ý kiến', 'lập luận', 'tranh luận', 'thuyết phục', 'bằng chứng', 'quan điểm', 'đồng ý', 'không đồng ý', 'cân bằng', 'kết luận'] },
  'cam_g5_u09': { title: "Let's perform", titleVi: 'Cùng biểu diễn', words: ['script', 'rehearsal', 'stage', 'audience', 'director', 'performance', 'dialogue', 'act', 'scene', 'costume'], wordsVi: ['kịch bản', 'diễn tập', 'sân khấu', 'khán giả', 'đạo diễn', 'biểu diễn', 'lời thoại', 'hồi', 'cảnh', 'trang phục'] },
  // ── US G1 ──
  'us_g1_u01': { title: 'Getting to Know Us', titleVi: 'Làm quen', words: ['classroom', 'friend', 'teacher', 'learn', 'read', 'draw', 'rules', 'share', 'recess', 'school'], wordsVi: ['lớp học', 'bạn', 'cô giáo', 'học', 'đọc', 'vẽ', 'quy tắc', 'chia sẻ', 'giờ ra chơi', 'trường'] },
  'us_g1_u02': { title: 'Our Community', titleVi: 'Cộng đồng', words: ['family', 'parent', 'brother', 'sister', 'grandparent', 'meal', 'park', 'help', 'care', 'love'], wordsVi: ['gia đình', 'cha mẹ', 'anh/em trai', 'chị/em gái', 'ông bà', 'bữa ăn', 'công viên', 'giúp đỡ', 'chăm sóc', 'yêu thương'] },
  'us_g1_u03': { title: 'Changes Over Time', titleVi: 'Thay đổi theo thời gian', words: ['community', 'library', 'fire station', 'market', 'firefighter', 'help', 'town', 'together', 'neighbor', 'safe'], wordsVi: ['cộng đồng', 'thư viện', 'trạm cứu hỏa', 'chợ', 'lính cứu hỏa', 'giúp đỡ', 'thị trấn', 'cùng nhau', 'hàng xóm', 'an toàn'] },
  'us_g1_u04': { title: 'Animals Everywhere', titleVi: 'Động vật khắp nơi', words: ['animal', 'fish', 'bird', 'bear', 'forest', 'water', 'nest', 'gills', 'cheetah', 'fast'], wordsVi: ['động vật', 'cá', 'chim', 'gấu', 'rừng', 'nước', 'tổ', 'mang', 'báo đốm', 'nhanh'] },
  'us_g1_u05': { title: 'Figure It Out', titleVi: 'Khám phá', words: ['explore', 'museum', 'hike', 'leaf', 'bug', 'map', 'river', 'mountain', 'discover', 'question'], wordsVi: ['khám phá', 'bảo tàng', 'đi bộ', 'lá', 'bọ', 'bản đồ', 'sông', 'núi', 'phát hiện', 'câu hỏi'] },
  'us_g1_u06': { title: 'Together We Can', titleVi: 'Cùng nhau có thể', words: ['baby', 'grow', 'change', 'seed', 'plant', 'butterfly', 'season', 'summer', 'winter', 'time'], wordsVi: ['em bé', 'lớn lên', 'thay đổi', 'hạt', 'cây', 'bướm', 'mùa', 'hè', 'đông', 'thời gian'] },
};

export const AUTHENTIC_PASSAGES: Record<string, AuthenticReading> = {
  // ── CAMBRIDGE GRADE 1 ──
  'cam_g1_u01': {
    text: "Hello! My name is Anna. I am playing in the playground with my friends. Ben is on the swing. Maria is playing with a ball. We like to run and jump. Playing with friends is fun! We share our toys and say 'please' and 'thank you'. Who do you play with at school?",
    textVi: "Xin chào! Tên tôi là Anna. Tôi đang chơi ở sân chơi cùng bạn bè. Ben đang chơi xích đu. Maria đang chơi với một quả bóng. Chúng tôi thích chạy và nhảy. Chơi với bạn bè rất vui! Chúng tôi chia sẻ đồ chơi và nói 'làm ơn' và 'cảm ơn'. Bạn chơi với ai ở trường?"
  },
  'cam_g1_u02': {
    text: "Today we are finding out how to make a paper hat! First, take a piece of square paper. Next, fold it in half to make a triangle. Then, fold the corners up. Finally, put the hat on your head. You made a great paper hat! Making things is fun when we follow instructions.",
    textVi: "Hôm nay chúng ta sẽ tìm hiểu cách làm một chiếc mũ giấy! Đầu tiên, lấy một mảnh giấy hình vuông. Tiếp theo, gấp đôi lại thành hình tam giác. Sau đó, gấp các góc lên. Cuối cùng, đội mũ lên đầu. Bạn đã làm được một chiếc mũ giấy tuyệt vời! Làm đồ vật rất vui khi chúng ta làm theo hướng dẫn."
  },
  'cam_g1_u03': {
    text: "Hickory dickory dock, the mouse ran up the clock! The clock struck one, the mouse ran down, hickory dickory dock. Rhymes are words that sound the same at the end. Can you hear the rhyme in 'dock' and 'clock'? Let's find more words that rhyme, like 'cat' and 'hat', or 'star' and 'car'.",
    textVi: "Hickory dickory dock, chú chuột chạy lên chiếc đồng hồ! Đồng hồ điểm một giờ, chú chuột chạy xuống, hickory dickory dock. Vần là những từ có âm cuối giống nhau. Bạn có nghe thấy vần trong 'dock' và 'clock' không? Hãy tìm thêm những từ có vần, như 'cat' và 'hat', hoặc 'star' và 'car'."
  },
  'cam_g1_u04': {
    text: "Once upon a time, there was an enormous turnip. The old man pulled and pulled, but he could not pull it up. He called the old woman. They pulled and pulled, but it did not come up. They called the boy. They pulled and pulled! Finally, POP! The turnip came up. They all had turnip soup for dinner.",
    textVi: "Ngày xửa ngày xưa, có một củ cải khổng lồ. Ông lão kéo và kéo, nhưng không thể nhổ nó lên. Ông gọi bà lão. Họ cùng kéo và kéo, nhưng nó vẫn không lên. Họ gọi cậu bé. Họ cùng kéo và kéo! Cuối cùng, BỤP! Củ cải đã được nhổ lên. Tất cả đều có món súp củ cải cho bữa tối."
  },
  'cam_g1_u05': {
    text: "We can read to find out information. Look at the animals! An elephant is very big. It has a long trunk and big ears. A mouse is small. It has a long tail. A bird can fly in the sky. A fish can swim in the water. What is your favourite animal? Where does it live?",
    textVi: "Chúng ta có thể đọc để tìm kiếm thông tin. Hãy nhìn những con vật này! Con voi thì rất to. Nó có cái vòi dài và đôi tai lớn. Con chuột thì nhỏ. Nó có cái đuôi dài. Con chim có thể bay trên trời. Con cá có thể bơi dưới nước. Con vật yêu thích của bạn là gì? Nó sống ở đâu?"
  },
  'cam_g1_u06': {
    text: "It is rhyme time again! Jack and Jill went up the hill to fetch a pail of water. Jack fell down and broke his crown, and Jill came tumbling after. Nursery rhymes have a rhythm, like a little song. Do 'hill' and 'Jill' sound the same? Yes, they rhyme!",
    textVi: "Lại đến giờ học vần điệu rồi! Jack và Jill lên đồi lấy một thùng nước. Jack ngã xuống và vỡ vương miện, và Jill lăn cù theo sau. Các bài đồng dao có nhịp điệu, giống như một bài hát nhỏ. 'Hill' và 'Jill' nghe có giống nhau không? Có, chúng vần với nhau!"
  },
  'cam_g1_u07': {
    text: "Let's read a make-believe story. In this story, the animals can talk! The brave little rabbit wore a red jacket and walked on two legs. He met a polite bear who was drinking tea. Make-believe stories are from our imagination. They are not real, but they are very fun to read.",
    textVi: "Hãy cùng đọc một câu chuyện tưởng tượng. Trong câu chuyện này, các con vật có thể nói chuyện! Chú thỏ nhỏ dũng cảm mặc chiếc áo khoác đỏ và đi bằng hai chân. Cậu gặp một chú gấu lịch sự đang uống trà. Những câu chuyện tưởng tượng đến từ trí tưởng tượng của chúng ta. Chúng không có thật, nhưng đọc rất vui."
  },
  'cam_g1_u08': {
    text: "We all have stories about things that happened to us. Yesterday, I went to the zoo with my family. I saw a tall giraffe eating leaves. My little brother laughed at the funny monkeys. It was a happy day. When we write about things that happened, we tell people our own true story.",
    textVi: "Tất cả chúng ta đều có những câu chuyện về những điều đã xảy ra với mình. Hôm qua, tôi đã đi sở thú với gia đình. Tôi thấy một con hươu cao cổ đang ăn lá. Em trai tôi cười đùa với những chú khỉ ngộ nghĩnh. Đó là một ngày vui vẻ. Khi viết về những điều đã xảy ra, chúng ta kể cho mọi người nghe câu chuyện có thật của chính mình."
  },
  'cam_g1_u09': {
    text: "Poems can be about a theme, like 'The Weather'. Rain falls pitter-patter on the roof. The sun shines bright and hot. The wind blows whoosh through the trees. A theme is the main idea of the poems. What is your favourite weather? Can you write a short poem about the rain?",
    textVi: "Thơ có thể viết về một chủ đề, ví dụ như 'Thời tiết'. Mưa rơi tí tách trên mái nhà. Mặt trời chiếu sáng và nóng bức. Gió thổi vù vù qua những tán cây. Chủ đề là ý chính của các bài thơ. Thời tiết yêu thích của bạn là gì? Bạn có thể viết một bài thơ ngắn về mưa không?"
  },

  // ── CAMBRIDGE GRADE 2 ──
  'cam_g2_u01': {
    text: "People all over the world tell stories we know well. Think about Cinderella, Little Red Riding Hood, or The Three Little Pigs. These stories usually have good characters and bad characters. In the end, the good characters usually win. They often start with 'Once upon a time' and end with 'They lived happily ever after.'",
    textVi: "Mọi người trên khắp thế giới đều kể những câu chuyện quen thuộc. Hãy nghĩ về Cô bé Lọ Lem, Cô bé quàng khăn đỏ, hoặc Ba chú heo con. Những câu chuyện này thường có nhân vật tốt và nhân vật xấu. Cuối cùng, các nhân vật tốt thường chiến thắng. Chúng thường bắt đầu bằng 'Ngày xửa ngày xưa' và kết thúc bằng 'Họ sống hạnh phúc mãi mãi về sau.'"
  },
  'cam_g2_u02': {
    text: "How do you write instructions? Instructions tell us how to do something step by step. Let's make a fruit salad! First, wash the fruit. Next, ask an adult to help you cut the apples, bananas, and grapes. Then, put all the fruit in a big bowl. Finally, mix it together and enjoy!",
    textVi: "Làm thế nào để bạn viết hướng dẫn? Hướng dẫn cho chúng ta biết cách làm một việc gì đó từng bước một. Cùng làm salad trái cây nhé! Đầu tiên, rửa trái cây. Tiếp theo, nhờ người lớn giúp bạn cắt táo, chuối và nho. Sau đó, cho tất cả trái cây vào một cái bát lớn. Cuối cùng, trộn đều lên và thưởng thức!"
  },
  'cam_g2_u03': {
    text: "Poems and rhymes can be about different places. 'Down by the station, early in the morning. See the little pufferbellies all in a row.' We can write rhymes about the park, the beach, or the bustling city. When you describe a place in a rhyme, you help the reader see and hear what it is like.",
    textVi: "Thơ và vần điệu có thể nói về những địa điểm khác nhau. 'Dưới nhà ga, vào buổi sáng sớm. Nhìn những chiếc xe lửa nhỏ xếp thành hàng.' Chúng ta có thể viết vần điệu về công viên, bãi biển hoặc thành phố nhộn nhịp. Khi bạn miêu tả một địa điểm bằng vần điệu, bạn giúp người đọc nhìn thấy và nghe thấy nơi đó như thế nào."
  },
  'cam_g2_u04': {
    text: "Tales from around the world show us different cultures. In India, there is a story about a clever monkey and a crocodile. In Africa, there is a tale about Anansi the spider. Tales teach us lessons and make us think. Even though people live in different countries, we all love listening to a good tale.",
    textVi: "Những câu chuyện từ khắp nơi trên thế giới cho chúng ta thấy những nền văn hóa khác nhau. Ở Ấn Độ, có câu chuyện về chú khỉ thông minh và con cá sấu. Ở Châu Phi, có câu chuyện về nhện Anansi. Những câu chuyện dạy cho chúng ta những bài học và làm chúng ta phải suy nghĩ. Mặc dù con người sống ở những quốc gia khác nhau, nhưng tất cả chúng ta đều thích nghe một câu chuyện hay."
  },
  'cam_g2_u05': {
    text: "What is my house made of? Houses are built using different materials. Some houses are made of red bricks, so they are very strong. Some houses are made of wood, and some have roofs made of tiles or straw. Windows are made of glass so we can see outside. Different materials have different jobs.",
    textVi: "Ngôi nhà của tôi được làm bằng gì? Những ngôi nhà được xây dựng bằng nhiều vật liệu khác nhau. Một số ngôi nhà được làm bằng gạch đỏ nên rất chắc chắn. Một số ngôi nhà làm bằng gỗ, và một số có mái lợp ngói hoặc rơm. Cửa sổ làm bằng kính để chúng ta có thể nhìn ra ngoài. Các vật liệu khác nhau có công dụng khác nhau."
  },
  'cam_g2_u06': {
    text: "An information text tells us true facts about a topic. It often has headings, pictures, and labels. For example, an information text about penguins will tell you that they live in cold places and that they cannot fly, but they are excellent swimmers. When you read an information text, you learn facts.",
    textVi: "Văn bản thông tin cho chúng ta biết những sự thật về một chủ đề. Nó thường có các tiêu đề, hình ảnh và nhãn dán. Ví dụ, một văn bản thông tin về chim cánh cụt sẽ cho bạn biết rằng chúng sống ở những nơi lạnh giá và chúng không thể bay, nhưng chúng bơi rất giỏi. Khi bạn đọc một văn bản thông tin, bạn học được các sự thật."
  },
  'cam_g2_u07': {
    text: "Plays and poems are fun to read out loud. A play has characters, and you read what they say. It is like acting in a theatre! 'Bear: Hello, Rabbit! Rabbit: Good morning, Bear.' A poem uses beautiful words to paint a picture in your mind. Both plays and poems are great for sharing with an audience.",
    textVi: "Kịch và thơ rất thú vị khi đọc to. Một vở kịch có các nhân vật, và bạn đọc những gì họ nói. Nó giống như diễn xuất trong rạp hát! 'Gấu: Chào Thỏ! Thỏ: Chào buổi sáng, Gấu.' Một bài thơ sử dụng những từ ngữ đẹp đẽ để vẽ nên một bức tranh trong tâm trí bạn. Cả kịch và thơ đều rất tuyệt để chia sẻ với khán giả."
  },
  'cam_g2_u08': {
    text: "Some stories have a hidden message or lesson. The story of The Boy Who Cried Wolf teaches us that if we lie, people won't believe us when we tell the truth. The story of The Tortoise and the Hare teaches us that slow and steady wins the race. What lesson have you learned from a story?",
    textVi: "Một số câu chuyện có thông điệp hoặc bài học ẩn giấu. Câu chuyện Cậu bé chăn cừu dạy chúng ta rằng nếu chúng ta nói dối, mọi người sẽ không tin chúng ta khi chúng ta nói thật. Câu chuyện Rùa và Thỏ dạy chúng ta rằng chậm mà chắc sẽ giành chiến thắng trong cuộc đua. Bạn đã học được bài học gì từ một câu chuyện?"
  },
  'cam_g2_u09': {
    text: "Words, words, words! There are so many words to explore. Some words are long, like 'hippopotamus', and some are short, like 'cat'. Some words describe things, like 'shiny' or 'fluffy'. We use words to write poems, tell stories, and give instructions. The more words you know, the better you can express yourself!",
    textVi: "Từ ngữ, từ ngữ, từ ngữ! Có rất nhiều từ để khám phá. Một số từ dài, như 'hippopotamus' (hà mã), và một số từ ngắn, như 'cat' (mèo). Một số từ miêu tả sự vật, như 'shiny' (sáng bóng) hoặc 'fluffy' (mềm mại). Chúng ta dùng từ ngữ để viết thơ, kể chuyện và đưa ra hướng dẫn. Càng biết nhiều từ, bạn càng có thể diễn đạt tốt hơn!"
  },

  // ── US WONDERS GRADE 1 ──
  'us_g1_u01': {
    text: "School is a place to learn and grow. In our classroom, we read books, draw pictures, and make new friends. The teacher helps us learn new things every day. We follow rules to keep everyone safe and happy. We share our crayons and play together at recess. Getting to know our classmates makes school fun!",
    textVi: "Trường học là nơi để học tập và phát triển. Trong lớp học của chúng tôi, chúng tôi đọc sách, vẽ tranh và kết bạn mới. Cô giáo giúp chúng tôi học những điều mới mỗi ngày. Chúng tôi tuân theo các quy tắc để giữ cho mọi người an toàn và vui vẻ. Chúng tôi chia sẻ bút màu và cùng chơi vào giờ ra chơi. Việc làm quen với các bạn cùng lớp làm cho trường học thật vui!"
  },
  'us_g1_u02': {
    text: "Families come in all sizes. Some families have many people, and some have just a few. We live with our parents, and some of us have brothers, sisters, or grandparents living with us. Families do things together. They eat meals, go to the park, and help each other. We love our families because they care for us.",
    textVi: "Các gia đình có nhiều quy mô khác nhau. Có gia đình có nhiều người, có gia đình chỉ có vài người. Chúng ta sống cùng cha mẹ, và một số người có anh, chị, em hoặc ông bà sống cùng. Các gia đình làm việc cùng nhau. Họ cùng ăn cơm, đi công viên và giúp đỡ lẫn nhau. Chúng ta yêu gia đình vì họ chăm sóc cho chúng ta."
  },
  'us_g1_u03': {
    text: "A community is a place where people live, work, and play together. Look around our community! We have a library where we can borrow books. We have a fire station with brave firefighters. We have markets where we buy food. People in a community help each other to make the town a great place to live.",
    textVi: "Cộng đồng là nơi mọi người cùng sống, làm việc và vui chơi. Hãy nhìn quanh cộng đồng của chúng ta! Chúng ta có một thư viện nơi có thể mượn sách. Chúng ta có trạm cứu hỏa với những lính cứu hỏa dũng cảm. Chúng ta có chợ để mua thức ăn. Mọi người trong một cộng đồng giúp đỡ lẫn nhau để làm cho thị trấn trở thành một nơi tuyệt vời để sống."
  },
  'us_g1_u04': {
    text: "Animals are amazing! They live in different places. Fish live in the water and use gills to breathe. Birds fly in the sky and build nests in trees. Bears live in forests and sleep all winter. Some animals run very fast, like the cheetah. Every animal has a special way to find food and stay safe.",
    textVi: "Động vật thật kỳ diệu! Chúng sống ở nhiều nơi khác nhau. Cá sống dưới nước và dùng mang để thở. Chim bay trên trời và làm tổ trên cây. Gấu sống trong rừng và ngủ suốt mùa đông. Một số loài vật chạy rất nhanh, như con báo đốm. Mỗi con vật đều có cách đặc biệt để tìm thức ăn và giữ an toàn."
  },
  'us_g1_u05': {
    text: "Let us explore the world around us. We can go to a museum to see dinosaur bones. We can hike in the woods to find colourful leaves and small bugs. We can look at a map to find rivers and mountains. When we explore, we look closely and ask questions. There is always something new to discover!",
    textVi: "Hãy cùng khám phá thế giới xung quanh chúng ta. Chúng ta có thể đến bảo tàng để xem xương khủng long. Chúng ta có thể đi bộ trong rừng để tìm những chiếc lá đầy màu sắc và những con bọ nhỏ. Chúng ta có thể nhìn vào bản đồ để tìm các con sông và ngọn núi. Khi khám phá, chúng ta nhìn kỹ và đặt câu hỏi. Luôn có điều gì đó mới mẻ để khám phá!"
  },
  'us_g1_u06': {
    text: "Things change over time. When you were a baby, you could not walk or talk. Now, you are bigger and can read and write! A tiny seed changes into a tall plant. A caterpillar changes into a beautiful butterfly. Even the seasons change from hot summer to cold winter. Time brings changes to everything around us.",
    textVi: "Mọi thứ thay đổi theo thời gian. Khi còn là em bé, bạn không thể đi hay nói. Bây giờ, bạn lớn hơn và có thể đọc, viết! Một hạt mầm nhỏ thay đổi thành một cái cây cao. Một con sâu bướm biến thành một con bướm xinh đẹp. Ngay cả các mùa cũng thay đổi từ mùa hè nóng bức sang mùa đông lạnh giá. Thời gian mang lại sự thay đổi cho mọi thứ xung quanh chúng ta."
  }
,
  'cam_g3_u01': {
    text: "Ordinary days are full of small routines. We wake up, brush our teeth, and have breakfast. Then we go to school to learn new things. After school, we might do our homework or play outside. Even though these days seem normal, they are the building blocks of our lives.",
    textVi: "Những ngày bình thường đầy ắp những thói quen nhỏ. Chúng ta thức dậy, đánh răng và ăn sáng. Sau đó, chúng ta đến trường để học những điều mới. Sau giờ học, chúng ta có thể làm bài tập hoặc chơi ngoài trời. Mặc dù những ngày này có vẻ bình thường, nhưng chúng là nền tảng của cuộc sống chúng ta."
  },
  'cam_g3_u02': {
    text: "Let us have a party! We need to plan what to eat and drink. We can make invitations to send to our friends. We should decorate the room with colourful balloons and streamers. A party is a time to celebrate and have fun together with the people we care about.",
    textVi: "Hãy mở tiệc nào! Chúng ta cần lên kế hoạch ăn uống gì. Chúng ta có thể làm thiệp mời để gửi cho bạn bè. Chúng ta nên trang trí phòng bằng bóng bay và ruy băng đầy màu sắc. Bữa tiệc là khoảng thời gian để ăn mừng và vui vẻ cùng những người chúng ta quan tâm."
  },
  'cam_g3_u03': {
    text: "We use our five senses to explore the world. We see the bright sun, hear the birds sing, and feel the soft grass. We can taste sweet fruits and smell beautiful flowers. Our senses help us enjoy everything around us and understand how things work.",
    textVi: "Chúng ta sử dụng năm giác quan để khám phá thế giới. Chúng ta nhìn thấy mặt trời sáng chói, nghe chim hót và cảm nhận bãi cỏ mềm mại. Chúng ta có thể nếm trái cây ngọt và ngửi những bông hoa đẹp. Các giác quan giúp chúng ta tận hưởng mọi thứ xung quanh và hiểu cách mọi thứ hoạt động."
  },
  'cam_g3_u04': {
    text: "Fiery beginnings often start with a tiny spark. A small flame can grow into a roaring fire. Long ago, people learned how to make fire to keep warm and cook food. Fire is very useful, but we must always be careful because it can also be very dangerous.",
    textVi: "Những khởi đầu rực lửa thường bắt đầu bằng một tia lửa nhỏ. Một ngọn lửa nhỏ có thể bùng lên thành một đám cháy lớn. Từ xa xưa, con người đã học cách tạo ra lửa để sưởi ấm và nấu thức ăn. Lửa rất hữu ích, nhưng chúng ta phải luôn cẩn thận vì nó cũng có thể rất nguy hiểm."
  },
  'cam_g3_u05': {
    text: "Letters are a special way to communicate with someone far away. You start by writing 'Dear', and then the person's name. In the letter, you can share news, ask questions, or tell a story. Finally, you sign your name at the bottom before sending it in an envelope.",
    textVi: "Thư từ là một cách đặc biệt để giao tiếp với những người ở xa. Bạn bắt đầu bằng cách viết 'Thân gửi', và sau đó là tên của người đó. Trong bức thư, bạn có thể chia sẻ tin tức, đặt câu hỏi hoặc kể một câu chuyện. Cuối cùng, bạn ký tên ở dưới cùng trước khi gửi nó trong một phong bì."
  },
  'cam_g3_u06': {
    text: "Poems from around the world show us how different cultures use language. A haiku from Japan has three short lines. A limerick from Ireland is funny and has a bouncy rhythm. Reading poems from different countries helps us understand how people everywhere share their feelings and ideas.",
    textVi: "Những bài thơ từ khắp nơi trên thế giới cho chúng ta thấy các nền văn hóa khác nhau sử dụng ngôn ngữ như thế nào. Thơ haiku của Nhật Bản có ba dòng ngắn. Thơ limerick của Ireland rất hài hước và có nhịp điệu vui tươi. Đọc những bài thơ từ các quốc gia khác nhau giúp chúng ta hiểu cách mọi người ở khắp mọi nơi chia sẻ cảm xúc và ý tưởng của họ."
  },
  'cam_g3_u07': {
    text: "Dragons and pirates are exciting characters in adventure stories. A mighty dragon might breathe fire and guard a hidden treasure in a dark cave. A brave pirate might sail a ship across the stormy sea to find it. These thrilling stories are full of action and keep us turning the pages.",
    textVi: "Rồng và cướp biển là những nhân vật thú vị trong các câu chuyện phiêu lưu. Một con rồng dũng mãnh có thể phun lửa và canh giữ kho báu ẩn giấu trong một hang động tối tăm. Một tên cướp biển dũng cảm có thể lái thuyền vượt biển bão tố để tìm nó. Những câu chuyện ly kỳ này đầy hành động và khiến chúng ta lật mãi những trang sách."
  },
  'cam_g3_u08': {
    text: "We live in a wonderful world filled with amazing places. From deep oceans with colourful coral reefs to high mountains covered in snow, there is so much to see. Every continent has unique plants and animals. We must take care of our planet so it stays beautiful forever.",
    textVi: "Chúng ta sống trong một thế giới kỳ diệu với đầy những địa điểm tuyệt vời. Từ những đại dương sâu thẳm với rạn san hô rực rỡ đến những ngọn núi cao phủ đầy tuyết, có quá nhiều điều để xem. Mỗi lục địa đều có các loài động thực vật độc đáo. Chúng ta phải chăm sóc hành tinh của mình để nó mãi tươi đẹp."
  },
  'cam_g3_u09': {
    text: "Laughing allowed! Funny stories and jokes make us giggle and smile. Sometimes characters do silly things or make funny mistakes. Humor is a great way to make friends and feel happy. So, read a funny book, share a joke, and don't forget to laugh out loud!",
    textVi: "Được phép cười! Những câu chuyện vui nhộn và những câu nói đùa khiến chúng ta cười khúc khích và mỉm cười. Đôi khi các nhân vật làm những điều ngớ ngẩn hoặc mắc những sai lầm buồn cười. Hài hước là một cách tuyệt vời để kết bạn và cảm thấy hạnh phúc. Vì vậy, hãy đọc một cuốn sách hài hước, chia sẻ một câu nói đùa và đừng quên cười thật to nhé!"
  },
  'cam_g4_u01': {
    text: "A storybook takes you on a journey to places you've never been. You can travel to magical kingdoms, explore outer space, or solve a mystery. As you turn the pages, the characters become your friends. Reading a good storybook is like stepping into a whole new world.",
    textVi: "Một cuốn sách truyện đưa bạn vào một cuộc hành trình đến những nơi bạn chưa từng đến. Bạn có thể du hành đến những vương quốc phép thuật, khám phá không gian bao la, hoặc giải quyết một bí ẩn. Khi bạn lật từng trang sách, các nhân vật trở thành bạn bè của bạn. Đọc một cuốn sách hay giống như bước vào một thế giới hoàn toàn mới."
  },
  'cam_g4_u02': {
    text: "Going deep under the ocean reveals a mysterious world. Sunlight cannot reach the deepest parts of the sea, so it is very dark and cold. Strange creatures with glowing bodies live there. Explorers use special submarines to study this hidden environment and discover new forms of life.",
    textVi: "Đi sâu xuống dưới đáy đại dương tiết lộ một thế giới bí ẩn. Ánh sáng mặt trời không thể chiếu tới những nơi sâu nhất của biển, vì vậy nó rất tối và lạnh. Những sinh vật kỳ lạ với cơ thể phát sáng sống ở đó. Các nhà thám hiểm sử dụng tàu ngầm đặc biệt để nghiên cứu môi trường ẩn giấu này và khám phá ra những dạng sống mới."
  },
  'cam_g4_u03': {
    text: "Mind pictures are the images we create in our heads when we read. Good writers use descriptive words to help us see, hear, and feel the story. When a writer describes a 'cold, howling wind,' we can almost feel the chill. Creating mind pictures makes reading a much richer experience.",
    textVi: "Những hình ảnh trong tâm trí là những hình ảnh chúng ta tạo ra trong đầu khi đọc. Những nhà văn giỏi sử dụng các từ ngữ miêu tả để giúp chúng ta nhìn, nghe và cảm nhận câu chuyện. Khi một nhà văn miêu tả 'một cơn gió lạnh thấu xương,' chúng ta gần như có thể cảm nhận được cái lạnh đó. Việc tạo ra những hình ảnh trong tâm trí làm cho việc đọc trở thành một trải nghiệm phong phú hơn nhiều."
  },
  'cam_g4_u04': {
    text: "Just imagine if you could fly like a bird or breathe underwater like a fish! Imagination allows us to invent amazing things that don't exist. Many great inventions, like airplanes and submarines, started out as someone's wild idea. When you use your imagination, the possibilities are endless.",
    textVi: "Hãy tưởng tượng nếu bạn có thể bay như một con chim hay thở dưới nước như một con cá! Trí tưởng tượng cho phép chúng ta phát minh ra những điều tuyệt vời không hề tồn tại. Nhiều phát minh vĩ đại, như máy bay và tàu ngầm, đã bắt đầu từ một ý tưởng táo bạo của ai đó. Khi bạn sử dụng trí tưởng tượng của mình, những khả năng là vô tận."
  },
  'cam_g4_u05': {
    text: "Making the news is an important job. Journalists gather facts, interview people, and write reports about events happening around the world. A good news report tells you who, what, where, when, and why. The news helps us stay informed about what is going on in our community and beyond.",
    textVi: "Làm tin tức là một công việc quan trọng. Các nhà báo thu thập sự thật, phỏng vấn mọi người và viết báo cáo về các sự kiện diễn ra trên khắp thế giới. Một bản tin tốt cho bạn biết ai, cái gì, ở đâu, khi nào và tại sao. Tin tức giúp chúng ta luôn được cập nhật về những gì đang diễn ra trong cộng đồng của mình và hơn thế nữa."
  },
  'cam_g4_u06': {
    text: "Poetry and plays are two wonderful forms of literature. Poetry uses rhythm and rhyme to express deep feelings and paint beautiful pictures with words. Plays are stories written to be performed on a stage by actors. Both of them offer a unique way to share stories and emotions with an audience.",
    textVi: "Thơ và kịch là hai hình thức văn học tuyệt vời. Thơ sử dụng nhịp điệu và vần điệu để thể hiện những cảm xúc sâu sắc và vẽ nên những bức tranh tuyệt đẹp bằng ngôn từ. Kịch là những câu chuyện được viết để các diễn viên biểu diễn trên sân khấu. Cả hai đều mang đến một cách độc đáo để chia sẻ câu chuyện và cảm xúc với khán giả."
  },
  'cam_g4_u07': {
    text: "What would you do if you found a lost wallet? Sometimes, characters in stories have to make difficult choices. Doing the right thing isn't always easy, but it is important to be honest and responsible. Thinking about 'what would you do' helps us prepare for challenging situations in our own lives.",
    textVi: "Bạn sẽ làm gì nếu nhặt được một chiếc ví bị đánh rơi? Đôi khi, các nhân vật trong truyện phải đưa ra những lựa chọn khó khăn. Làm điều đúng đắn không phải lúc nào cũng dễ dàng, nhưng điều quan trọng là phải trung thực và có trách nhiệm. Suy nghĩ về việc 'bạn sẽ làm gì' giúp chúng ta chuẩn bị cho những tình huống đầy thử thách trong cuộc sống của chính mình."
  },
  'cam_g4_u08': {
    text: "Food for thought means an idea that makes you think deeply. When we read a thought-provoking article or book, it challenges our opinions. We might ask ourselves questions and discuss the topic with our friends. It is healthy to feed our minds with new and interesting ideas.",
    textVi: "Suy ngẫm có nghĩa là một ý tưởng khiến bạn phải suy nghĩ sâu sắc. Khi chúng ta đọc một bài báo hoặc cuốn sách gợi nhiều suy nghĩ, nó thách thức các quan điểm của chúng ta. Chúng ta có thể tự hỏi mình những câu hỏi và thảo luận về chủ đề đó với bạn bè. Việc nuôi dưỡng tâm trí bằng những ý tưởng mới và thú vị là rất lành mạnh."
  },
  'cam_g4_u09': {
    text: "Poems to see and hear use powerful words to create a sensory experience. The sound of words like 'crackle' or 'whisper' adds an auditory layer to the poem. Descriptive phrases like 'golden sunshine' add visual color. Together, these elements make the poem come alive in the reader's mind.",
    textVi: "Những bài thơ để nghe và thấy sử dụng những từ ngữ mạnh mẽ để tạo ra trải nghiệm giác quan. Âm thanh của các từ như 'lách tách' hoặc 'thì thầm' thêm một lớp thính giác vào bài thơ. Những cụm từ miêu tả như 'ánh nắng vàng rực rỡ' thêm vào màu sắc thị giác. Cùng nhau, các yếu tố này làm cho bài thơ trở nên sống động trong tâm trí người đọc."
  },
  'cam_g5_u01': {
    text: "There is a lesson hidden in many ancient fables and folktales. The characters often learn about honesty, kindness, or the value of hard work through their adventures. These timeless stories have been passed down for generations to teach us how to be better people and make wise decisions.",
    textVi: "Có một bài học được ẩn giấu trong nhiều truyện ngụ ngôn và truyện dân gian cổ xưa. Các nhân vật thường học về sự trung thực, lòng tốt, hoặc giá trị của sự chăm chỉ thông qua những cuộc phiêu lưu của họ. Những câu chuyện vượt thời gian này đã được truyền qua nhiều thế hệ để dạy chúng ta cách trở thành những người tốt hơn và đưa ra những quyết định sáng suốt."
  },
  'cam_g5_u02': {
    text: "Exploring space is one of humanity's greatest adventures. Astronauts travel in rockets to visit the International Space Station and study the stars. Scientists use powerful telescopes to look for new planets in distant galaxies. The universe is incredibly vast, and we have only just begun to uncover its secrets.",
    textVi: "Khám phá không gian là một trong những cuộc phiêu lưu vĩ đại nhất của nhân loại. Các phi hành gia du hành bằng tên lửa để đến thăm Trạm Vũ trụ Quốc tế và nghiên cứu các vì sao. Các nhà khoa học sử dụng kính viễn vọng cực mạnh để tìm kiếm các hành tinh mới trong các thiên hà xa xôi. Vũ trụ vô cùng bao la và chúng ta mới chỉ bắt đầu khám phá những bí mật của nó."
  },
  'cam_g5_u03': {
    text: "Mythical stories feature gods, heroes, and magical creatures. These tales were created by ancient cultures to explain how the world worked, like why the sun rises or why storms happen. Greek myths, for example, are full of powerful deities like Zeus and Athena, and epic quests involving brave mortals.",
    textVi: "Những câu chuyện thần thoại xoay quanh các vị thần, anh hùng và những sinh vật huyền bí. Những câu chuyện này được tạo ra bởi các nền văn hóa cổ đại để giải thích cách thức thế giới vận hành, giống như tại sao mặt trời mọc hay tại sao lại có bão. Các thần thoại Hy Lạp, chẳng hạn, có đầy những vị thần đầy quyền năng như Zeus và Athena, và những hành trình sử thi liên quan đến những người phàm trần dũng cảm."
  },
  'cam_g5_u04': {
    text: "Plays offer a unique way to tell a story through dialogue and stage directions. Actors bring the characters to life, conveying emotions with their voices and movements. A well-written play captures the audience's attention and transports them into the world of the story, unfolding scene by scene.",
    textVi: "Kịch mang đến một cách độc đáo để kể một câu chuyện thông qua lời thoại và chỉ dẫn sân khấu. Các diễn viên làm cho các nhân vật sống động, truyền tải cảm xúc bằng giọng nói và chuyển động của họ. Một vở kịch được viết tốt sẽ thu hút sự chú ý của khán giả và đưa họ vào thế giới của câu chuyện, mở ra từng cảnh một."
  },
  'cam_g5_u05': {
    text: "Information texts are designed to educate and inform the reader about specific topics. They use a formal tone, clear headings, and factual data. Whether you are learning about the water cycle or the history of a country, information texts provide reliable knowledge structured in an organized, easy-to-read way.",
    textVi: "Các văn bản thông tin được thiết kế để giáo dục và cung cấp thông tin cho người đọc về những chủ đề cụ thể. Chúng sử dụng giọng văn trang trọng, các tiêu đề rõ ràng và dữ liệu thực tế. Cho dù bạn đang tìm hiểu về vòng tuần hoàn của nước hay lịch sử của một quốc gia, các văn bản thông tin đều cung cấp những kiến thức đáng tin cậy được cấu trúc một cách có tổ chức, dễ đọc."
  },
  'cam_g5_u06': {
    text: "Poetry allows writers to express complex thoughts and vivid imagery in just a few carefully chosen words. Poets use literary devices such as metaphors, similes, and alliteration to give their poems rhythm and impact. Reading poetry can evoke strong feelings and offer a fresh perspective on everyday things.",
    textVi: "Thơ ca cho phép các nhà văn thể hiện những suy nghĩ phức tạp và hình ảnh sống động chỉ bằng vài từ ngữ được lựa chọn cẩn thận. Các nhà thơ sử dụng các biện pháp tu từ như ẩn dụ, so sánh và điệp âm để tạo nhịp điệu và sức ảnh hưởng cho bài thơ của họ. Việc đọc thơ có thể gợi lên những cảm xúc mạnh mẽ và mang đến một góc nhìn mới mẻ về những điều thường ngày."
  },
  'cam_g5_u07': {
    text: "Persuasive writing aims to convince the reader to agree with a specific point of view. A strong persuasive essay presents a clear argument supported by logical reasons and factual evidence. Writers must understand their audience and use compelling language to effectively change people's minds and encourage action.",
    textVi: "Văn viết thuyết phục nhằm mục đích thuyết phục người đọc đồng ý với một quan điểm cụ thể. Một bài luận thuyết phục chặt chẽ đưa ra một lập luận rõ ràng được hỗ trợ bởi các lý lẽ logic và bằng chứng thực tế. Người viết phải thấu hiểu đối tượng độc giả của mình và sử dụng ngôn từ có sức thuyết phục để thay đổi suy nghĩ của mọi người và khuyến khích họ hành động một cách hiệu quả."
  },
  'cam_g5_u08': {
    text: "Biographies tell the true story of a real person's life, written by someone else. They chronicle a person's childhood, challenges, achievements, and legacy. By reading a biography, we can gain inspiration from the struggles and triumphs of historical figures, inventors, leaders, and artists who shaped the world.",
    textVi: "Tiểu sử kể câu chuyện có thật về cuộc đời của một người, do một người khác viết. Nó ghi chép lại tuổi thơ, những thử thách, những thành tựu và di sản của một người. Bằng cách đọc tiểu sử, chúng ta có thể lấy cảm hứng từ những nỗ lực và chiến thắng của các nhân vật lịch sử, nhà phát minh, nhà lãnh đạo và nghệ sĩ đã định hình nên thế giới."
  },
  'cam_g5_u09': {
    text: "Letters and journals offer a personal glimpse into someone's private thoughts and historical events. While letters are written to communicate with others, journals are often kept for personal reflection. Together, these primary sources help historians understand the daily lives and genuine emotions of people from the past.",
    textVi: "Thư từ và nhật ký mang đến một cái nhìn cá nhân về những suy nghĩ thầm kín và những sự kiện lịch sử của ai đó. Trong khi những bức thư được viết để giao tiếp với người khác, nhật ký thường được giữ để tự suy ngẫm. Cùng với nhau, những nguồn tư liệu gốc này giúp các nhà sử học hiểu được cuộc sống hàng ngày và những cảm xúc chân thật của con người từ quá khứ."
  },
  'us_g2_u01': {
    text: "Neighborhoods are places where people live close to each other. People in a neighborhood often share parks, sidewalks, and schools. Neighbors help one another by watching each other's houses or sharing tools. A friendly neighborhood makes everyone feel safe and welcome.",
    textVi: "Khu phố là nơi mọi người sống gần gũi với nhau. Mọi người trong một khu phố thường chia sẻ công viên, vỉa hè và trường học. Hàng xóm giúp đỡ lẫn nhau bằng cách trông nom nhà cửa hoặc chia sẻ đồ dùng. Một khu phố thân thiện làm cho mọi người cảm thấy an toàn và được chào đón."
  },
  'us_g2_u02': {
    text: "Nature is all around us, from the tallest trees to the smallest insects. We can observe the changing leaves in autumn and the blooming flowers in spring. Being outdoors helps us appreciate the beauty of our environment and teaches us why we must protect our forests, rivers, and wildlife.",
    textVi: "Thiên nhiên hiện diện xung quanh chúng ta, từ những cái cây cao nhất đến những loài côn trùng nhỏ bé nhất. Chúng ta có thể quan sát lá thay màu vào mùa thu và hoa nở vào mùa xuân. Việc ở ngoài trời giúp chúng ta trân trọng vẻ đẹp của môi trường và dạy cho chúng ta lý do tại sao phải bảo vệ rừng, sông ngòi và các loài động vật hoang dã."
  },
  'us_g2_u03': {
    text: "Live and learn is a motto that means we grow by experiencing new things. Every mistake is a chance to learn a valuable lesson. When we try a new sport or learn to play an instrument, we might struggle at first. But with practice and patience, we improve and gain new skills.",
    textVi: "Sống và học là một phương châm có nghĩa là chúng ta trưởng thành nhờ trải nghiệm những điều mới mẻ. Mỗi một sai lầm đều là cơ hội để học một bài học quý giá. Khi chúng ta thử một môn thể thao mới hoặc học chơi một loại nhạc cụ, ban đầu chúng ta có thể sẽ gặp khó khăn. Nhưng với sự luyện tập và kiên nhẫn, chúng ta tiến bộ và có được những kỹ năng mới."
  },
  'us_g2_u04': {
    text: "Our life and our world are deeply connected to the Earth's natural systems. The weather affects the clothes we wear and the food farmers can grow. Animals adapt to their habitats to survive. Understanding the relationship between our daily lives and the global environment helps us become responsible citizens.",
    textVi: "Cuộc sống và thế giới của chúng ta gắn kết sâu sắc với các hệ thống tự nhiên của Trái Đất. Thời tiết ảnh hưởng đến quần áo chúng ta mặc và loại lương thực mà nông dân có thể trồng. Động vật thích nghi với môi trường sống của chúng để sinh tồn. Hiểu được mối quan hệ giữa cuộc sống hằng ngày của chúng ta và môi trường toàn cầu giúp chúng ta trở thành những công dân có trách nhiệm."
  },
  'us_g2_u05': {
    text: "Teamwork means working together to achieve a common goal. When a group of people collaborates, they can solve problems faster and come up with better ideas. Whether playing a team sport or completing a group project at school, listening to others and sharing responsibilities leads to success.",
    textVi: "Làm việc nhóm nghĩa là cùng nhau làm việc để đạt được một mục tiêu chung. Khi một nhóm người hợp tác, họ có thể giải quyết vấn đề nhanh hơn và đưa ra những ý tưởng tốt hơn. Dù là chơi thể thao đồng đội hay hoàn thành một dự án nhóm ở trường, việc lắng nghe người khác và chia sẻ trách nhiệm sẽ dẫn đến thành công."
  },
  'us_g2_u06': {
    text: "Think it through before you make a decision. Taking a moment to consider the consequences of your actions can prevent mistakes. If you are faced with a difficult puzzle or a tough choice, breaking the problem down into smaller parts helps you find a logical and thoughtful solution.",
    textVi: "Hãy suy nghĩ kỹ trước khi bạn đưa ra quyết định. Dành một chút thời gian để cân nhắc hậu quả từ những hành động của mình có thể ngăn ngừa những sai lầm. Nếu bạn đang đối mặt với một câu đố khó hoặc một sự lựa chọn gian nan, việc chia nhỏ vấn đề thành từng phần nhỏ sẽ giúp bạn tìm ra giải pháp hợp lý và thấu đáo."
  },
  'au_g1_u01': {
    text: "All about me! Everyone is special and unique. We have different hair colours, eye colours, and favourite foods. Some kids like to run and play sports, while others like to read or draw. It is wonderful to learn about what makes each of us different and special.",
    textVi: "Tất cả về tôi! Mọi người đều đặc biệt và độc đáo. Chúng ta có màu tóc, màu mắt và món ăn yêu thích khác nhau. Một số trẻ em thích chạy nhảy và chơi thể thao, trong khi những đứa trẻ khác lại thích đọc sách hoặc vẽ tranh. Thật tuyệt vời khi tìm hiểu về những điều làm cho mỗi người chúng ta trở nên khác biệt và đặc biệt."
  },
  'au_g1_u02': {
    text: "Amazing animals live all over Australia. Kangaroos can jump very high, and koalas like to sleep in eucalyptus trees. Emus are big birds that cannot fly but can run very fast. Learning about these incredible animals helps us understand how to protect their homes in the bush.",
    textVi: "Những loài động vật tuyệt vời sống trên khắp nước Úc. Chuột túi kangaroo có thể nhảy rất cao, và gấu túi koala thích ngủ trên những cây bạch đàn. Đà điểu emu là loài chim lớn không biết bay nhưng có thể chạy rất nhanh. Tìm hiểu về những loài động vật đáng kinh ngạc này giúp chúng ta hiểu cách bảo vệ ngôi nhà của chúng trong bụi rậm."
  },
  'sg_g1_u01': {
    text: "My school is a large building with many classrooms. I go to school from Monday to Friday. In the morning, we stand together and sing the national anthem. My teacher is very kind and teaches us how to read and write. I like recess time because I can play with my friends in the canteen.",
    textVi: "Trường của tôi là một tòa nhà lớn với nhiều phòng học. Tôi đi học từ thứ Hai đến thứ Sáu. Vào buổi sáng, chúng tôi đứng cùng nhau và hát quốc ca. Cô giáo của tôi rất hiền và dạy chúng tôi cách đọc và viết. Tôi thích giờ ra chơi vì tôi có thể chơi với bạn bè trong căng-tin."
  },
  'sg_g1_u02': {
    text: "Family and friends are the most important people in our lives. On weekends, my family goes to the hawker centre to eat delicious chicken rice. I also play at the playground with my friends from the neighborhood. We share our toys and always help each other when someone falls down.",
    textVi: "Gia đình và bạn bè là những người quan trọng nhất trong cuộc sống của chúng ta. Vào cuối tuần, gia đình tôi đi đến khu ăn uống ngoài trời để ăn cơm gà thơm ngon. Tôi cũng chơi ở sân chơi với các bạn trong khu phố. Chúng tôi chia sẻ đồ chơi của mình và luôn giúp đỡ lẫn nhau khi ai đó bị ngã."
  },

  'us_g3_u01': {
    text: "When a tiny seed is planted in the ground, something magical begins. The seed absorbs water and pushes a small root downward. Then a green shoot breaks through the soil and reaches for the sunlight. As weeks pass, leaves unfurl and the stem grows taller. Just like a plant, we grow a little every day — learning new words, solving harder problems, and understanding more about the world around us. Growth takes patience, but every small step matters.",
    textVi: "Khi một hạt giống nhỏ bé được gieo xuống đất, điều kỳ diệu bắt đầu. Hạt giống hấp thụ nước và đẩy một rễ nhỏ xuống phía dưới. Sau đó một mầm xanh xuyên qua đất và vươn tới ánh nắng. Qua nhiều tuần, lá mở ra và thân cây cao dần. Giống như một cái cây, chúng ta lớn lên mỗi ngày — học từ mới, giải bài khó hơn, và hiểu nhiều hơn về thế giới xung quanh. Trưởng thành cần sự kiên nhẫn, nhưng mỗi bước nhỏ đều quan trọng."
  },
  'us_g3_u02': {
    text: "Maya stared at the puzzle on her desk. The pieces did not seem to fit anywhere. She turned one piece upside down and tried again. 'Think about what you already know,' her teacher suggested. Maya looked at the colors on each piece. She found two pieces with the same shade of blue and clicked them together. Soon she had the whole sky finished. Sometimes figuring things out means looking at the problem from a different angle and using clues you already have.",
    textVi: "Maya nhìn chằm chằm vào bộ xếp hình trên bàn. Các mảnh ghép dường như không khớp ở đâu cả. Cô bé lật ngược một mảnh và thử lại. 'Hãy nghĩ về những gì con đã biết,' cô giáo gợi ý. Maya nhìn vào màu sắc trên mỗi mảnh ghép. Cô bé tìm thấy hai mảnh có cùng sắc xanh và ghép chúng lại với nhau. Chẳng mấy chốc cô đã hoàn thành cả bầu trời. Đôi khi tìm ra đáp án nghĩa là nhìn vấn đề từ một góc khác và sử dụng những manh mối bạn đã có."
  },
  'us_g3_u03': {
    text: "No two snowflakes are exactly the same. Scientists have studied thousands of them under microscopes and found that each one forms a unique pattern of ice crystals. People are like snowflakes in many ways. You might have curly hair while your best friend has straight hair. You might love painting while someone else prefers singing. These differences make each of us one of a kind, and that is something to celebrate, not hide.",
    textVi: "Không có hai bông tuyết nào giống hệt nhau. Các nhà khoa học đã nghiên cứu hàng nghìn bông tuyết dưới kính hiển vi và phát hiện rằng mỗi bông đều tạo thành một hoa văn tinh thể băng độc nhất. Con người cũng giống bông tuyết theo nhiều cách. Bạn có thể có mái tóc xoăn trong khi bạn thân bạn có tóc thẳng. Bạn có thể yêu vẽ tranh trong khi người khác thích ca hát. Những khác biệt này làm cho mỗi chúng ta trở nên độc nhất vô nhị, và đó là điều đáng tự hào, không phải để giấu đi."
  },
  'us_g3_u04': {
    text: "The first time Kai tried to ride a bicycle, he fell off three times. His knees were scraped and his palms stung. He wanted to give up, but his older sister said, 'Every expert was once a beginner.' Kai climbed back on. He wobbled, then steadied, then pedaled all the way to the end of the street without stopping. Meeting a challenge means being brave enough to try again, even when it is hard and even when you fall.",
    textVi: "Lần đầu tiên Kai thử đi xe đạp, cậu bé ngã ba lần. Đầu gối bị trầy xước và lòng bàn tay rát buốt. Cậu muốn bỏ cuộc, nhưng chị gái nói, 'Mọi chuyên gia đều từng là người mới bắt đầu.' Kai trèo lên xe lại. Cậu lảo đảo, rồi giữ thăng bằng, rồi đạp suốt đến cuối con phố mà không dừng lại. Đối mặt thử thách nghĩa là đủ dũng cảm để thử lại, ngay cả khi rất khó và ngay cả khi bạn ngã."
  },
  'us_g3_u05': {
    text: "When the river near Greenfield flooded last spring, the whole town came together. Volunteers filled sandbags along the riverbank to protect houses. Neighbors shared food with families who had to leave their homes. Students at the local school collected blankets and warm clothes. Taking action means doing something helpful when you see a problem, instead of just watching. Even small acts of kindness can make a big difference during tough times.",
    textVi: "Khi con sông gần Greenfield bị ngập lụt mùa xuân năm ngoái, cả thị trấn đã cùng nhau hành động. Tình nguyện viên đắp bao cát dọc bờ sông để bảo vệ nhà cửa. Hàng xóm chia sẻ thức ăn với các gia đình phải rời nhà. Học sinh trường địa phương quyên góp chăn và quần áo ấm. Hành động nghĩa là làm điều gì đó hữu ích khi bạn thấy vấn đề, thay vì chỉ đứng nhìn. Ngay cả những hành động tử tế nhỏ cũng có thể tạo ra sự khác biệt lớn trong những lúc khó khăn."
  },
  'us_g3_u06': {
    text: "Should students have homework every night? Some people think homework helps children practice what they learned at school. Others believe children need free time to play, rest, and explore on their own. Before you decide, think it over carefully. Consider both sides of the argument. What evidence supports each opinion? Thinking critically means weighing the facts before forming your own view, rather than just agreeing with the loudest voice.",
    textVi: "Học sinh có nên có bài tập về nhà mỗi tối không? Một số người nghĩ bài tập giúp trẻ luyện tập những gì đã học ở trường. Người khác tin rằng trẻ cần thời gian rảnh để chơi, nghỉ ngơi và tự khám phá. Trước khi bạn quyết định, hãy suy nghĩ thật kỹ. Cân nhắc cả hai mặt của lập luận. Bằng chứng nào hỗ trợ mỗi quan điểm? Tư duy phản biện nghĩa là cân nhắc các sự thật trước khi hình thành quan điểm riêng, thay vì chỉ đồng ý với ý kiến ồn ào nhất."
  },
  'us_g4_u01': {
    text: "Detective Nora examined the muddy footprints leading from the garden gate to the kitchen door. The prints were small with a zigzag pattern on the sole. She measured them with a ruler — only eighteen centimeters long. 'These belong to a child wearing trainers,' she concluded. Thinking things through means gathering evidence, examining it closely, and drawing a logical conclusion, just like a real detective solving a mystery.",
    textVi: "Thám tử Nora xem xét những dấu chân bùn dẫn từ cổng vườn đến cửa bếp. Những dấu chân nhỏ với hoa văn zigzag trên đế giày. Cô đo chúng bằng thước — chỉ dài mười tám phân. 'Đây là của một đứa trẻ mang giày thể thao,' cô kết luận. Suy nghĩ thấu đáo nghĩa là thu thập bằng chứng, kiểm tra kỹ lưỡng, và rút ra kết luận logic, giống như một thám tử thật sự giải quyết bí ẩn."
  },
  'us_g4_u02': {
    text: "The octopus is one of the most intelligent creatures in the ocean. It has eight flexible arms, each covered with hundreds of suckers that can taste and grip. When threatened, an octopus can change its skin color and texture in less than a second to blend with rocks, coral, or sand. Some octopuses have been observed unscrewing jar lids to reach food inside. These amazing animals remind us that intelligence comes in many different forms.",
    textVi: "Bạch tuộc là một trong những sinh vật thông minh nhất đại dương. Nó có tám cánh tay linh hoạt, mỗi cánh tay phủ hàng trăm giác hút có thể nếm và bám. Khi bị đe dọa, bạch tuộc có thể thay đổi màu da và kết cấu trong chưa đầy một giây để hòa lẫn với đá, san hô hoặc cát. Một số bạch tuộc đã được quan sát thấy vặn nắp lọ để lấy thức ăn bên trong. Những loài động vật tuyệt vời này nhắc nhở chúng ta rằng trí thông minh có nhiều dạng khác nhau."
  },
  'us_g4_u03': {
    text: "In 1920, a group of women in the United States finally won the right to vote after decades of peaceful protest. They marched in parades, gave speeches, and wrote letters to lawmakers. Many were arrested, but they never gave up because they believed in fairness and equality. Their determination changed the law forever. That is the spirit — standing up for what is right, even when the path is long and difficult.",
    textVi: "Năm 1920, một nhóm phụ nữ ở Hoa Kỳ cuối cùng đã giành được quyền bầu cử sau nhiều thập kỷ phản đối ôn hòa. Họ diễu hành, phát biểu và viết thư cho các nhà lập pháp. Nhiều người bị bắt, nhưng họ không bao giờ bỏ cuộc vì tin vào sự công bằng và bình đẳng. Sự quyết tâm của họ đã thay đổi luật pháp mãi mãi. Đó là tinh thần — đấu tranh cho điều đúng đắn, ngay cả khi con đường dài và gian nan."
  },
  'us_g4_u04': {
    text: "Did dragons ever really exist? Ancient civilizations around the world told stories of enormous flying reptiles that breathed fire. Some historians believe these legends were inspired by real dinosaur fossils that people discovered long before science could explain them. Others think dragon myths come from encounters with large reptiles like crocodiles and komodo dragons. Separating fact from fiction requires asking questions and looking for evidence in reliable sources.",
    textVi: "Rồng có thực sự tồn tại không? Các nền văn minh cổ đại trên khắp thế giới kể những câu chuyện về những loài bò sát bay khổng lồ phun lửa. Một số nhà sử học tin rằng những truyền thuyết này được lấy cảm hứng từ hóa thạch khủng long thật mà người xưa phát hiện trước khi khoa học có thể giải thích. Người khác nghĩ rằng huyền thoại rồng đến từ việc gặp các loài bò sát lớn như cá sấu và rồng Komodo. Phân biệt sự thật và hư cấu đòi hỏi phải đặt câu hỏi và tìm bằng chứng từ nguồn đáng tin cậy."
  },
  'us_g4_u05': {
    text: "How do birds find their way during migration? Scientists discovered that many birds use Earth's magnetic field as a built-in compass. They also navigate by the position of the sun during the day and the stars at night. Some birds, like the Arctic tern, travel over 70,000 kilometers each year between the Arctic and Antarctic. Figuring out these natural wonders takes careful observation, creative experiments, and years of patient research.",
    textVi: "Chim tìm đường như thế nào khi di cư? Các nhà khoa học phát hiện rằng nhiều loài chim sử dụng từ trường Trái Đất như một la bàn tích hợp. Chúng cũng định hướng bằng vị trí mặt trời ban ngày và các vì sao ban đêm. Một số loài chim, như nhạn Bắc Cực, di chuyển hơn 70.000 km mỗi năm giữa Bắc Cực và Nam Cực. Tìm hiểu những kỳ quan tự nhiên này đòi hỏi quan sát cẩn thận, thí nghiệm sáng tạo và nhiều năm nghiên cứu kiên nhẫn."
  },
  'us_g4_u06': {
    text: "The Great Wall of China took over two thousand years to build, stretching across mountains and valleys for thousands of kilometers. In ancient times, workers carried heavy stones by hand up steep hillsides. Today, visitors walk along its winding path and imagine the lives of those who built it. The past shapes our present in countless ways — the languages we speak, the buildings we admire, and the traditions we celebrate all have roots in history.",
    textVi: "Vạn Lý Trường Thành mất hơn hai nghìn năm để xây dựng, trải dài qua núi và thung lũng hàng nghìn km. Thời cổ đại, công nhân khiêng đá nặng bằng tay lên những sườn đồi dốc. Ngày nay, du khách đi bộ dọc con đường uốn lượn và tưởng tượng cuộc sống của những người đã xây nó. Quá khứ định hình hiện tại theo vô số cách — ngôn ngữ chúng ta nói, tòa nhà chúng ta ngưỡng mộ, và truyền thống chúng ta kỷ niệm đều có gốc rễ từ lịch sử."
  },
  'us_g5_u01': {
    text: "In 1928, Alexander Fleming returned from holiday to find mold growing on a petri dish in his laboratory. Instead of throwing it away, he noticed something remarkable: bacteria near the mold had died. This accidental discovery led to penicillin, the world's first antibiotic, which has since saved millions of lives. 'Eureka' moments often come not from planning, but from paying attention to unexpected results and having the curiosity to investigate further.",
    textVi: "Năm 1928, Alexander Fleming trở về sau kỳ nghỉ và thấy nấm mốc mọc trên đĩa nuôi cấy trong phòng thí nghiệm. Thay vì vứt đi, ông nhận thấy điều đáng chú ý: vi khuẩn gần nấm mốc đã chết. Phát hiện tình cờ này dẫn đến penicillin, loại kháng sinh đầu tiên trên thế giới, đã cứu hàng triệu mạng người. Những khoảnh khắc 'Eureka' thường không đến từ kế hoạch, mà từ việc chú ý đến kết quả bất ngờ và có sự tò mò để tìm hiểu thêm."
  },
  'us_g5_u02': {
    text: "Malala Yousafzai was only fifteen years old when she stood up for girls' education in Pakistan. Despite facing serious danger, she spoke out publicly and wrote about the importance of schooling for every child. Her courage inspired people around the world and earned her the Nobel Peace Prize at age seventeen, making her the youngest person ever to receive it. Taking the lead sometimes means using your voice for others who cannot speak for themselves.",
    textVi: "Malala Yousafzai chỉ mới mười lăm tuổi khi cô đứng lên vì quyền được đi học của trẻ em gái ở Pakistan. Dù đối mặt với nguy hiểm nghiêm trọng, cô lên tiếng công khai và viết về tầm quan trọng của việc đi học cho mọi trẻ em. Sự dũng cảm của cô đã truyền cảm hứng cho mọi người trên toàn thế giới và mang về giải Nobel Hòa bình khi mười bảy tuổi, trở thành người trẻ nhất nhận giải. Dẫn dắt đôi khi có nghĩa là dùng tiếng nói của mình cho những người không thể tự lên tiếng."
  },
  'us_g5_u03': {
    text: "Before 1953, nobody knew the shape of DNA, the molecule that carries the instructions for life. James Watson and Francis Crick, with crucial data from Rosalind Franklin's X-ray photographs, discovered that DNA is shaped like a twisted ladder — a double helix. This breakthrough opened the door to modern medicine, forensic science, and our understanding of heredity. Great breakthroughs often build upon the work of many people, not just one.",
    textVi: "Trước năm 1953, không ai biết hình dạng của DNA, phân tử mang hướng dẫn cho sự sống. James Watson và Francis Crick, với dữ liệu quan trọng từ ảnh chụp tia X của Rosalind Franklin, phát hiện rằng DNA có hình dạng như một cái thang xoắn — chuỗi xoắn kép. Bước đột phá này mở ra cánh cửa cho y học hiện đại, khoa học pháp y và sự hiểu biết của chúng ta về di truyền. Những đột phá lớn thường được xây dựng dựa trên công sức của nhiều người, không chỉ một người."
  },
  'us_g5_u04': {
    text: "The Amazon Rainforest produces about twenty percent of the world's oxygen and is home to more species of plants and animals than any other place on Earth. A single hectare may contain over 400 tree species. Hidden beneath the thick canopy, scientists continue to discover new insects, frogs, and plants every year. The wonders of nature remind us that our planet is a living system where every creature, no matter how small, plays an important role.",
    textVi: "Rừng mưa Amazon tạo ra khoảng hai mươi phần trăm lượng oxy của thế giới và là nơi sinh sống của nhiều loài động thực vật hơn bất kỳ nơi nào khác trên Trái Đất. Một hecta có thể chứa hơn 400 loài cây. Ẩn mình dưới tán rừng rậm rạp, các nhà khoa học tiếp tục phát hiện côn trùng, ếch và thực vật mới mỗi năm. Những kỳ quan thiên nhiên nhắc nhở chúng ta rằng hành tinh là một hệ thống sống nơi mọi sinh vật, dù nhỏ bé, đều đóng vai trò quan trọng."
  },
  'us_g5_u05': {
    text: "On July 20, 1969, astronaut Neil Armstrong became the first person to walk on the Moon. Over 600 million people watched on television as he stepped onto the dusty surface and said, 'That is one small step for man, one giant leap for mankind.' The Apollo 11 mission was a milestone that proved what humans could achieve through teamwork, engineering, and sheer determination. It inspired generations of scientists and explorers who followed.",
    textVi: "Ngày 20 tháng 7 năm 1969, phi hành gia Neil Armstrong trở thành người đầu tiên đi bộ trên Mặt Trăng. Hơn 600 triệu người theo dõi trên truyền hình khi ông bước lên bề mặt đầy bụi và nói, 'Đây là một bước nhỏ của con người, một bước nhảy vọt của nhân loại.' Sứ mệnh Apollo 11 là cột mốc chứng minh những gì con người có thể đạt được thông qua làm việc nhóm, kỹ thuật và sự quyết tâm. Nó đã truyền cảm hứng cho nhiều thế hệ nhà khoa học và nhà thám hiểm."
  },
  'us_g5_u06': {
    text: "Everything on Earth is connected in ways we are still discovering. The water you drink may have fallen as rain on a mountain thousands of kilometers away. The cotton in your shirt was grown by a farmer in another country. The air you breathe contains oxygen produced by ocean algae on the other side of the world. Understanding these connections helps us see that our actions — recycling, saving energy, being kind — ripple outward and affect people and places far beyond our own neighborhood.",
    textVi: "Mọi thứ trên Trái Đất đều liên kết theo những cách chúng ta vẫn đang khám phá. Nước bạn uống có thể đã rơi xuống như mưa trên một ngọn núi cách hàng nghìn km. Bông vải trong áo bạn được trồng bởi nông dân ở một quốc gia khác. Không khí bạn thở chứa oxy do tảo đại dương ở phía bên kia thế giới tạo ra. Hiểu những mối liên kết này giúp chúng ta nhận ra rằng hành động của mình — tái chế, tiết kiệm năng lượng, tử tế — lan tỏa ra xa và ảnh hưởng đến con người và nơi chốn vượt xa khu phố của chúng ta."
  },
  'au_g1_u03': {
    text: "People who help us are all around our community. Firefighters rush to put out fires and rescue people from danger. Doctors and nurses take care of us when we are sick. Police officers keep our streets safe. Postal workers deliver letters and parcels to our doors every day. Each of these helpers has an important job that makes our lives better and safer.",
    textVi: "Những người giúp đỡ chúng ta ở khắp nơi trong cộng đồng. Lính cứu hỏa lao đến dập lửa và giải cứu mọi người khỏi nguy hiểm. Bác sĩ và y tá chăm sóc chúng ta khi ốm. Cảnh sát giữ cho đường phố an toàn. Nhân viên bưu điện giao thư và bưu kiện đến tận cửa nhà mỗi ngày. Mỗi người giúp đỡ đều có một công việc quan trọng làm cuộc sống chúng ta tốt đẹp và an toàn hơn."
  },
  'au_g1_u04': {
    text: "Once upon a time, a little wombat got lost in the big bush. He looked left and right but could not see his burrow anywhere. A kind kookaburra sitting on a branch called out, 'Follow the river and you will find your way home!' The wombat walked along the river until he saw his mother waiting at the burrow entrance. Stories we love often teach us that help can come from unexpected friends.",
    textVi: "Ngày xửa ngày xưa, một chú wombat nhỏ bị lạc trong bụi rậm rộng lớn. Chú nhìn trái nhìn phải nhưng không thấy hang ở đâu cả. Một chú chim kookaburra tốt bụng đậu trên cành cây gọi, 'Đi theo con sông và con sẽ tìm được đường về nhà!' Chú wombat đi dọc theo sông cho đến khi thấy mẹ đang đợi ở cửa hang. Những câu chuyện chúng ta yêu thích thường dạy rằng sự giúp đỡ có thể đến từ những người bạn bất ngờ."
  },
  'au_g1_u05': {
    text: "Our world is full of amazing places. In Australia, you can find golden sandy beaches where waves crash against the shore. Inland, the red desert stretches as far as the eye can see. Up in the mountains, tall eucalyptus trees provide homes for koalas and possums. Every part of our world is special, and it is our job to look after it by keeping it clean and caring for its plants and animals.",
    textVi: "Thế giới chúng ta đầy những nơi tuyệt vời. Ở Úc, bạn có thể tìm thấy những bãi biển cát vàng nơi sóng vỗ vào bờ. Sâu trong đất liền, sa mạc đỏ trải dài tít tắp. Trên núi, những cây bạch đàn cao cung cấp nhà cho koala và thú có túi. Mỗi phần của thế giới đều đặc biệt, và nhiệm vụ của chúng ta là chăm sóc nó bằng cách giữ sạch sẽ và bảo vệ cây cối và động vật."
  },
  'au_g1_u06': {
    text: "Lunchtime is the best part of the school day! Today we are playing a new game called 'Kangaroo Jump'. You hop from one circle to the next without stepping on the lines. If you touch a line, you go back to the start. Emma hopped all the way to the finish first. 'That was so much fun!' she laughed. Playing games with friends teaches us to follow rules, take turns, and be good sports whether we win or lose.",
    textVi: "Giờ ăn trưa là phần tuyệt nhất trong ngày học! Hôm nay chúng tôi chơi một trò mới gọi là 'Nhảy Kangaroo'. Bạn nhảy lò cò từ vòng tròn này sang vòng tròn kia mà không chạm vào vạch. Nếu chạm vạch, bạn quay lại vạch xuất phát. Emma nhảy đến đích đầu tiên. 'Vui quá!' cô bé cười. Chơi trò chơi với bạn bè dạy chúng ta tuân thủ luật, đợi lượt và có tinh thần thể thao dù thắng hay thua."
  },
  'au_g1_u07': {
    text: "Australia has four seasons, but they are opposite to those in Europe and North America. When it is summer in Sydney, it is winter in London. Summer means trips to the beach and eating mangoes. Autumn brings cooler air and leaves that turn orange and red. Winter is the time for warm jackets and hot chocolate. Spring fills parks with wildflowers and baby animals. Each season brings its own special beauty.",
    textVi: "Nước Úc có bốn mùa, nhưng ngược lại với Châu Âu và Bắc Mỹ. Khi Sydney là mùa hè thì London là mùa đông. Mùa hè nghĩa là đi biển và ăn xoài. Mùa thu mang không khí mát mẻ và lá chuyển màu cam đỏ. Mùa đông là lúc mặc áo ấm và uống sô-cô-la nóng. Mùa xuân phủ đầy hoa dại và thú con trong công viên. Mỗi mùa đều mang vẻ đẹp riêng."
  },
  'au_g1_u08': {
    text: "Australia Day is celebrated on January 26th each year. Families gather for barbecues in parks and watch fireworks light up the night sky. NAIDOC Week is another important celebration that honours Aboriginal and Torres Strait Islander cultures, the oldest living cultures in the world. During this week, people learn traditional dances, art, and stories. Celebrations bring communities together and help us appreciate our shared history.",
    textVi: "Ngày nước Úc được tổ chức vào ngày 26 tháng 1 hàng năm. Các gia đình tụ họp nướng barbecue trong công viên và xem pháo hoa thắp sáng bầu trời đêm. Tuần NAIDOC là một lễ kỷ niệm quan trọng khác tôn vinh văn hóa Thổ dân và dân đảo Torres, những nền văn hóa sống lâu đời nhất thế giới. Trong tuần này, mọi người học múa, nghệ thuật và câu chuyện truyền thống. Lễ kỷ niệm gắn kết cộng đồng và giúp chúng ta trân trọng lịch sử chung."
  },
  'au_g2_u01': {
    text: "Everyone feels different emotions at different times. Sometimes you feel happy when a friend shares a toy with you. Other times you might feel worried before a test. Liam felt angry when his little sister broke his model airplane, but then he took three deep breaths and felt calmer. Talking about feelings with friends and family helps us understand each other and solve problems without shouting or fighting.",
    textVi: "Mỗi người có những cảm xúc khác nhau vào những lúc khác nhau. Đôi khi bạn vui khi bạn bè chia sẻ đồ chơi. Lúc khác bạn có thể lo lắng trước kỳ thi. Liam giận khi em gái làm hỏng mô hình máy bay, nhưng rồi cậu hít ba hơi thở sâu và bình tĩnh hơn. Nói về cảm xúc với bạn bè và gia đình giúp chúng ta hiểu nhau và giải quyết vấn đề mà không cần la hét hay đánh nhau."
  },
  'au_g2_u02': {
    text: "Exploring nature is like being a detective. You can find clues everywhere — a trail of ants carrying crumbs, a spider web covered in morning dew, or a bird nest hidden in the bushes. Zoe kept a nature journal where she drew pictures of every insect she found in her garden. By the end of the month, she had sketched twenty-three different species. Looking closely at nature reveals a hidden world full of wonders.",
    textVi: "Khám phá thiên nhiên giống như làm thám tử. Bạn có thể tìm manh mối khắp nơi — một hàng kiến tha vụn bánh mì, mạng nhện phủ sương mai, hay tổ chim ẩn trong bụi cây. Zoe giữ một cuốn nhật ký tự nhiên nơi cô vẽ hình mọi côn trùng tìm thấy trong vườn. Cuối tháng, cô đã phác họa hai mươi ba loài khác nhau. Nhìn kỹ thiên nhiên hé lộ một thế giới ẩn giấu đầy kỳ diệu."
  },
  'au_g2_u03': {
    text: "Water is one of the most precious resources on Earth. We need it to drink, cook, wash, and grow food. In Australia, water is especially valuable because many areas receive very little rain. Farmers depend on dams and rivers to water their crops. At home, we can save water by turning off the tap while brushing our teeth and taking shorter showers. Every drop counts when it comes to protecting our wonderful water.",
    textVi: "Nước là một trong những tài nguyên quý giá nhất trên Trái Đất. Chúng ta cần nước để uống, nấu ăn, giặt giũ và trồng trọt. Ở Úc, nước đặc biệt quý vì nhiều vùng nhận rất ít mưa. Nông dân phụ thuộc vào đập và sông để tưới hoa màu. Ở nhà, chúng ta có thể tiết kiệm nước bằng cách tắt vòi khi đánh răng và tắm nhanh hơn. Mỗi giọt nước đều quan trọng khi nói đến việc bảo vệ nguồn nước quý giá."
  },
  'au_g2_u04': {
    text: "Long ago, an old fisherman caught a tiny golden fish in his net. 'Please let me go,' begged the fish, 'and I will grant you one wish.' The fisherman thought carefully. He did not wish for gold or a castle. Instead, he wished for good health so he could keep fishing and feeding his family. The golden fish smiled and swam away. Good stories often show us that the simplest wishes can be the wisest ones.",
    textVi: "Ngày xưa, một lão ngư dân bắt được một con cá vàng nhỏ trong lưới. 'Xin hãy thả tôi,' con cá van nài, 'và tôi sẽ ban cho ông một điều ước.' Lão ngư dân suy nghĩ kỹ. Ông không ước vàng hay lâu đài. Thay vào đó, ông ước có sức khỏe tốt để tiếp tục đánh cá và nuôi gia đình. Con cá vàng mỉm cười và bơi đi. Những câu chuyện hay thường cho chúng ta thấy rằng những điều ước đơn giản nhất có thể là khôn ngoan nhất."
  },
  'au_g2_u05': {
    text: "Being healthy means taking care of your body and mind. Eating a rainbow of fruits and vegetables gives your body the vitamins it needs. Running, swimming, and playing outside make your muscles and heart stronger. Sleep is important too — your brain sorts through everything you learned during the day while you rest. Drinking plenty of water, washing your hands, and laughing with friends are all simple habits that keep you feeling your best.",
    textVi: "Khỏe mạnh nghĩa là chăm sóc cơ thể và tâm trí. Ăn nhiều trái cây và rau củ đủ màu sắc cung cấp vitamin cho cơ thể. Chạy, bơi và chơi ngoài trời giúp cơ bắp và tim mạnh hơn. Giấc ngủ cũng quan trọng — não bộ sắp xếp mọi thứ bạn học trong ngày khi bạn nghỉ ngơi. Uống nhiều nước, rửa tay và cười với bạn bè đều là thói quen đơn giản giữ cho bạn luôn khỏe mạnh."
  },
  'au_g2_u06': {
    text: "How do people and goods move from one place to another? Trucks carry food from farms to supermarkets along highways. Trains transport passengers between cities on steel tracks. Ships loaded with containers cross the ocean carrying products from country to country. In outback Australia, the Royal Flying Doctor Service uses airplanes to bring medical help to remote communities. Transport connects us all, no matter how far apart we live.",
    textVi: "Làm thế nào con người và hàng hóa di chuyển từ nơi này đến nơi khác? Xe tải chở thực phẩm từ nông trại đến siêu thị dọc đường cao tốc. Tàu hỏa chở hành khách giữa các thành phố trên đường ray thép. Tàu chở container vượt đại dương mang sản phẩm từ nước này sang nước khác. Ở vùng hẻo lánh Úc, Dịch vụ Bác sĩ Bay dùng máy bay đưa y tế đến cộng đồng xa xôi. Giao thông kết nối tất cả chúng ta, dù sống cách xa nhau bao nhiêu."
  },
  'au_g2_u07': {
    text: "A habitat is the natural home of an animal or plant. Coral reefs are underwater habitats where colourful fish, sea turtles, and starfish live among the coral. The Australian bush is a habitat for kangaroos, echidnas, and parrots. Deserts, rainforests, and wetlands are all different habitats with their own special conditions. Animals have adapted over thousands of years to survive in their particular habitat — the thick fur of a polar bear or the long neck of a giraffe.",
    textVi: "Môi trường sống là ngôi nhà tự nhiên của động vật hoặc thực vật. Rạn san hô là môi trường sống dưới nước nơi cá đầy màu sắc, rùa biển và sao biển sống giữa san hô. Bụi rậm Úc là môi trường sống của kangaroo, thú lông nhím và vẹt. Sa mạc, rừng mưa và đất ngập nước đều là những môi trường khác nhau với điều kiện riêng. Động vật đã thích nghi qua hàng nghìn năm để sống sót trong môi trường riêng — bộ lông dày của gấu Bắc Cực hay cổ dài của hươu cao cổ."
  },
  'au_g2_u08': {
    text: "The Dreamtime stories of Aboriginal Australians explain how the land, rivers, and animals were created. In one story, the Rainbow Serpent slithered across the flat earth, carving out rivers and valleys as it moved. Where it rested, lakes formed. These stories have been told for over 65,000 years, making them the oldest continuous narratives in human history. Australian stories connect people to Country and teach respect for the natural world.",
    textVi: "Những câu chuyện Thời Mơ của Thổ dân Úc giải thích cách đất đai, sông ngòi và động vật được tạo ra. Trong một câu chuyện, Rắn Cầu Vồng trườn qua mặt đất bằng phẳng, tạo ra sông và thung lũng khi di chuyển. Nơi nó nghỉ ngơi, hồ nước hình thành. Những câu chuyện này đã được kể hơn 65.000 năm, khiến chúng trở thành những câu chuyện liên tục lâu đời nhất trong lịch sử loài người. Câu chuyện Úc kết nối con người với Đất và dạy sự tôn trọng thế giới tự nhiên."
  },
  'au_g3_u01': {
    text: "Our community is full of heroes who don't wear capes. The local SES (State Emergency Service) volunteers are always ready to help during storms or floods. They wear orange uniforms and spend their weekends training to keep us safe. Teachers, nurses, and crossing supervisors also work hard every day to support our town. We can be heroes too, just by helping a neighbour carry their groceries or picking up rubbish in the park.",
    textVi: "Cộng đồng của chúng ta đầy những anh hùng không mặc áo choàng. Các tình nguyện viên Dịch vụ Khẩn cấp Tiểu bang (SES) luôn sẵn sàng giúp đỡ trong bão hoặc lũ lụt. Họ mặc đồng phục màu cam và dành những ngày cuối tuần để rèn luyện nhằm giữ an toàn cho chúng ta. Giáo viên, y tá và người hướng dẫn qua đường cũng làm việc chăm chỉ mỗi ngày để hỗ trợ thị trấn. Chúng ta cũng có thể là anh hùng, chỉ bằng cách giúp hàng xóm xách đồ hoặc nhặt rác trong công viên."
  },
  'au_g3_u02': {
    text: "Did you know that the black box flight recorder, used in airplanes all over the world, was invented by an Australian? Dr. David Warren invented it in 1958 to help understand why planes crash, so engineers could make them safer. Another famous Australian invention is the cochlear implant, or 'bionic ear', which has helped hundreds of thousands of deaf people hear. Great inventions often start with a simple question: 'How can I fix this problem?'",
    textVi: "Bạn có biết hộp đen ghi âm chuyến bay, được dùng trên máy bay khắp thế giới, do một người Úc phát minh không? Tiến sĩ David Warren đã phát minh ra nó năm 1958 để giúp hiểu tại sao máy bay rơi, từ đó kỹ sư có thể làm chúng an toàn hơn. Một phát minh nổi tiếng khác của Úc là ốc tai điện tử, hay 'tai sinh học', đã giúp hàng trăm nghìn người khiếm thính nghe được. Những phát minh vĩ đại thường bắt đầu bằng một câu hỏi đơn giản: 'Làm thế nào để tôi giải quyết vấn đề này?'"
  },
  'au_g3_u03': {
    text: "Indigenous stories, often called Dreamtime stories, are more than just tales. They are maps of the land, rules for living, and history lessons all rolled into one. For example, the story of Tiddalik the Frog teaches us about the importance of sharing water. When Tiddalik drank all the water in the land, the other animals had to make him laugh to get it back. These stories have been passed down by Elders for thousands of generations.",
    textVi: "Các câu chuyện của người bản địa, thường gọi là chuyện Thời Mơ, không chỉ là những câu chuyện kể. Đó là bản đồ vùng đất, các quy tắc sống và những bài học lịch sử gộp làm một. Ví dụ, câu chuyện về Ếch Tiddalik dạy chúng ta tầm quan trọng của việc chia sẻ nước. Khi Tiddalik uống sạch nước trên đất, các con vật khác phải làm cho cậu ta cười để lấy lại nước. Những câu chuyện này đã được các Trưởng lão truyền lại qua hàng nghìn thế hệ."
  },
  'au_g3_u04': {
    text: "When you want to convince someone to agree with you, you use persuasion. If you want your parents to buy you a new bike, you need good arguments. You might say, 'A bike will help me stay healthy by exercising outside.' You could also add, 'I will ride it safely and wear my helmet every time.' Good writers use strong words, facts, and emotional appeals to persuade their readers to take action or change their minds.",
    textVi: "Khi bạn muốn thuyết phục ai đó đồng ý với mình, bạn sử dụng sự thuyết phục. Nếu bạn muốn bố mẹ mua cho một chiếc xe đạp mới, bạn cần những lý lẽ tốt. Bạn có thể nói, 'Xe đạp sẽ giúp con khỏe mạnh nhờ tập thể dục ngoài trời.' Bạn cũng có thể thêm, 'Con sẽ đi an toàn và đội mũ bảo hiểm mỗi lần đi.' Những người viết giỏi dùng từ ngữ mạnh mẽ, sự thật và lời kêu gọi cảm xúc để thuyết phục độc giả hành động hoặc thay đổi suy nghĩ."
  },
  'au_g3_u05': {
    text: "Poetry is like painting a picture with words. Poets use rhythm, rhyme, and special techniques like alliteration to make their writing musical. 'The sun sank slowly, a slice of silver' is an example of alliteration because of the repeating 's' sounds. Haiku is a short form of Japanese poetry with only three lines. Reading poetry out loud helps you hear the beat and feel the emotion the writer wanted to share.",
    textVi: "Làm thơ giống như vẽ một bức tranh bằng ngôn từ. Các nhà thơ sử dụng nhịp điệu, vần và các kỹ thuật đặc biệt như điệp âm để làm cho bài viết có tính nhạc. 'The sun sank slowly, a slice of silver' là một ví dụ về điệp âm vì âm 's' lặp lại. Haiku là một thể thơ ngắn của Nhật Bản chỉ có ba dòng. Đọc to thơ giúp bạn nghe được nhịp điệu và cảm nhận cảm xúc mà người viết muốn chia sẻ."
  },
  'au_g3_u06': {
    text: "Every good story needs a setting, characters, and a plot. The plot is what happens in the story. It usually starts with an introduction, builds up to an exciting problem or climax, and ends with a resolution. When Mia wrote her story about a lost puppy, she described the dark, rainy night (setting), made the puppy brave but scared (character), and had a kind police officer find him (resolution). Planning these parts makes writing a narrative much easier.",
    textVi: "Mỗi câu chuyện hay đều cần bối cảnh, nhân vật và cốt truyện. Cốt truyện là những gì xảy ra trong câu chuyện. Thường bắt đầu bằng phần giới thiệu, tiến đến một vấn đề thú vị hoặc cao trào, và kết thúc bằng cách giải quyết. Khi Mia viết câu chuyện về chú cún đi lạc, cô miêu tả đêm tối trời mưa (bối cảnh), làm cho chú cún dũng cảm nhưng sợ hãi (nhân vật), và để một sĩ quan cảnh sát tốt bụng tìm thấy chú (giải quyết). Lập kế hoạch các phần này làm việc viết truyện dễ dàng hơn nhiều."
  },
  'au_g3_u07': {
    text: "An information report gives facts about a specific topic, like an animal, place, or event. It does not include the writer's opinions. If you are writing a report about the Great Barrier Reef, you would use headings like 'Location', 'Marine Life', and 'Threats'. Under 'Marine Life', you would list facts about the 1,500 species of fish and 400 types of coral found there. Good reports help readers learn new information quickly and easily.",
    textVi: "Một báo cáo thông tin đưa ra các sự thật về một chủ đề cụ thể, như động vật, địa điểm hoặc sự kiện. Nó không bao gồm ý kiến của người viết. Nếu bạn viết báo cáo về Rạn san hô Great Barrier, bạn sẽ dùng các tiêu đề như 'Vị trí', 'Sinh vật biển' và 'Mối đe dọa'. Dưới phần 'Sinh vật biển', bạn sẽ liệt kê sự thật về 1.500 loài cá và 400 loại san hô ở đó. Báo cáo tốt giúp người đọc học thông tin mới nhanh chóng và dễ dàng."
  },
  'au_g3_u08': {
    text: "Drama is all about telling a story through acting. In a play, actors use their voices, facial expressions, and body language to show how their characters feel. The script tells them what to say, and stage directions tell them where to stand or how to move. When playing a villain, an actor might use a low, slow voice and stand very tall. Practising drama helps build confidence and teaches us how to communicate clearly with others.",
    textVi: "Kịch là việc kể câu chuyện thông qua diễn xuất. Trong một vở kịch, diễn viên dùng giọng nói, nét mặt và ngôn ngữ cơ thể để thể hiện cảm xúc của nhân vật. Kịch bản bảo họ nói gì, và chỉ dẫn sân khấu bảo họ đứng đâu hay di chuyển thế nào. Khi đóng vai phản diện, diễn viên có thể dùng giọng trầm, chậm và đứng thật cao. Tập kịch giúp xây dựng sự tự tin và dạy chúng ta cách giao tiếp rõ ràng với người khác."
  },
  'au_g4_u01': {
    text: "Different people can look at the exact same event and see it differently. This is called having different perspectives. Imagine a rainy day: a farmer whose crops are dry will be thrilled, but a child who wanted to play cricket at the park will be disappointed. When reading history or watching the news, it is important to ask, 'Whose story is being told?' Understanding different perspectives helps us become more empathetic and open-minded.",
    textVi: "Những người khác nhau có thể nhìn vào cùng một sự kiện và thấy nó theo cách khác nhau. Điều này được gọi là có những góc nhìn khác nhau. Tưởng tượng một ngày mưa: một người nông dân có mùa màng khô hạn sẽ vui mừng, nhưng một đứa trẻ muốn chơi cricket ở công viên sẽ thất vọng. Khi đọc lịch sử hay xem tin tức, điều quan trọng là hỏi, 'Câu chuyện của ai đang được kể?' Hiểu các góc nhìn khác nhau giúp chúng ta đồng cảm và cởi mở hơn."
  },
  'au_g4_u02': {
    text: "Sustainability means living in a way that protects the Earth so future generations can also enjoy it. In Australia, we are learning to be more sustainable by recycling plastic, composting food scraps, and using renewable energy from the sun and wind. Many schools now have kitchen gardens where students grow their own vegetables. Every time we choose to use a reusable water bottle instead of buying a plastic one, we are helping to keep our oceans clean.",
    textVi: "Bền vững nghĩa là sống theo cách bảo vệ Trái Đất để thế hệ tương lai cũng có thể tận hưởng nó. Ở Úc, chúng ta đang học cách bền vững hơn bằng việc tái chế nhựa, ủ phân từ thức ăn thừa và sử dụng năng lượng tái tạo từ mặt trời và gió. Nhiều trường học hiện có vườn bếp nơi học sinh tự trồng rau. Mỗi lần chúng ta chọn dùng bình nước dùng lại thay vì mua chai nhựa, chúng ta đang giúp giữ sạch đại dương."
  },
  'au_g4_u03': {
    text: "Australia is one of the most culturally diverse countries in the world. People from over 200 different countries have migrated here, bringing their languages, traditions, and delicious food. In any Australian city, you can eat Italian pasta for lunch and Vietnamese pho for dinner. Celebrating cultural diversity means respecting our differences and learning from each other. Events like Harmony Day remind us that everyone belongs, no matter where they or their parents were born.",
    textVi: "Úc là một trong những quốc gia đa dạng văn hóa nhất thế giới. Người từ hơn 200 quốc gia khác nhau đã di cư đến đây, mang theo ngôn ngữ, truyền thống và thức ăn ngon của họ. Ở bất kỳ thành phố nào của Úc, bạn có thể ăn mì Ý bữa trưa và phở Việt bữa tối. Kỷ niệm sự đa dạng văn hóa nghĩa là tôn trọng sự khác biệt và học hỏi lẫn nhau. Những sự kiện như Ngày Hòa hợp nhắc nhở chúng ta rằng mọi người đều thuộc về nơi này, bất kể họ hay cha mẹ họ sinh ra ở đâu."
  },
  'au_g4_u04': {
    text: "News tells us what is happening in our local area and around the world. Journalists work hard to gather facts, interview witnesses, and write articles that are accurate and fair. However, not everything we read online is true. It is important to check the source of the news. Is it a respected newspaper or just a random website? Learning to be a critical consumer of media helps us tell the difference between real news and fake news.",
    textVi: "Tin tức cho chúng ta biết những gì đang xảy ra ở khu vực địa phương và trên toàn thế giới. Các nhà báo làm việc chăm chỉ để thu thập sự thật, phỏng vấn nhân chứng và viết các bài báo chính xác và công bằng. Tuy nhiên, không phải mọi thứ chúng ta đọc trên mạng đều đúng. Việc kiểm tra nguồn tin là rất quan trọng. Đó có phải là một tờ báo uy tín hay chỉ là một trang web ngẫu nhiên? Học cách trở thành người tiêu thụ truyền thông có tư duy phản biện giúp chúng ta phân biệt giữa tin thật và tin giả."
  },
  'au_g4_u05': {
    text: "Myths and legends are ancient stories that try to explain how the world works. The ancient Greeks told myths about powerful gods like Zeus, who controlled the thunder. Legends often feature heroic humans, like King Arthur and the Knights of the Round Table. While these stories might not be scientifically true, they tell us a lot about what ancient cultures valued, such as bravery, wisdom, and loyalty.",
    textVi: "Thần thoại và truyền thuyết là những câu chuyện cổ xưa cố gắng giải thích cách thế giới vận hành. Người Hy Lạp cổ đại kể thần thoại về những vị thần quyền năng như Zeus, người điều khiển sấm sét. Truyền thuyết thường có những con người anh hùng, như Vua Arthur và các Hiệp sĩ Bàn Tròn. Dù những câu chuyện này có thể không đúng về mặt khoa học, chúng cho chúng ta biết nhiều điều về những gì các nền văn hóa cổ coi trọng, như lòng dũng cảm, sự khôn ngoan và lòng trung thành."
  },
  'au_g4_u06': {
    text: "Even in the age of emails and text messages, writing a formal letter is an important skill. A formal letter has a specific structure: your address at the top right, the date, a polite greeting like 'Dear Mr. Smith,', clear paragraphs explaining your purpose, and a sign-off like 'Yours sincerely'. If you wanted to ask your local council to build a new skate park, writing a well-structured, respectful letter is the best way to get their attention.",
    textVi: "Ngay cả trong thời đại email và tin nhắn, viết thư trang trọng vẫn là một kỹ năng quan trọng. Thư trang trọng có cấu trúc cụ thể: địa chỉ của bạn ở góc trên bên phải, ngày tháng, lời chào lịch sự như 'Kính gửi ông Smith,', các đoạn rõ ràng giải thích mục đích của bạn, và lời kết như 'Trân trọng'. Nếu bạn muốn yêu cầu hội đồng địa phương xây công viên trượt ván mới, viết một lá thư có cấu trúc tốt, tôn trọng là cách tốt nhất để thu hút sự chú ý của họ."
  },
  'au_g4_u07': {
    text: "Good research skills involve more than just typing a question into a search engine. When researching a topic like the solar system, you need to use multiple sources: books, encyclopedias, and educational websites. You must take notes in your own words instead of copying directly, which is called plagiarism. Finally, you should organize your notes into headings and paragraphs so you can present the information clearly to others.",
    textVi: "Kỹ năng nghiên cứu tốt không chỉ là gõ một câu hỏi vào công cụ tìm kiếm. Khi nghiên cứu một chủ đề như hệ mặt trời, bạn cần sử dụng nhiều nguồn: sách, bách khoa toàn thư và các trang web giáo dục. Bạn phải ghi chú bằng lời của mình thay vì chép trực tiếp, điều đó gọi là đạo văn. Cuối cùng, bạn nên sắp xếp các ghi chú thành tiêu đề và đoạn văn để có thể trình bày thông tin rõ ràng cho người khác."
  },
  'au_g4_u08': {
    text: "Creative expression is how we share our ideas and feelings with the world. You can express yourself through painting, dancing, writing poetry, or playing an instrument. There is no 'right' or 'wrong' in creative expression. When Jackson felt sad, he played his guitar loudly. When Sarah felt peaceful, she painted landscapes with soft watercolours. Finding a creative outlet helps keep our minds healthy and allows us to show others who we truly are.",
    textVi: "Biểu đạt sáng tạo là cách chúng ta chia sẻ ý tưởng và cảm xúc với thế giới. Bạn có thể thể hiện bản thân qua vẽ tranh, nhảy múa, làm thơ hoặc chơi nhạc cụ. Không có 'đúng' hay 'sai' trong biểu đạt sáng tạo. Khi Jackson buồn, cậu chơi guitar thật to. Khi Sarah thấy bình yên, cô vẽ phong cảnh bằng màu nước nhẹ nhàng. Tìm một lối thoát sáng tạo giúp tâm trí khỏe mạnh và cho phép ta cho người khác thấy con người thật của mình."
  },
  'au_g5_u01': {
    text: "Identity is what makes you, you. It includes your family background, your culture, the languages you speak, and the things you are passionate about. Belonging is the feeling of being accepted for who you are. Many Australians have dual identities, like being Greek-Australian or Vietnamese-Australian. They celebrate traditional festivals while also barracking for their favourite AFL team. Embracing our complex identities makes our society richer and more interesting.",
    textVi: "Bản sắc là điều tạo nên con người bạn. Nó bao gồm nền tảng gia đình, văn hóa, ngôn ngữ bạn nói và những điều bạn đam mê. Thuộc về là cảm giác được chấp nhận vì chính mình. Nhiều người Úc có bản sắc kép, như người Úc gốc Hy Lạp hay Úc gốc Việt. Họ tổ chức các lễ hội truyền thống trong khi vẫn cổ vũ cho đội bóng AFL yêu thích. Việc đón nhận những bản sắc phức tạp làm cho xã hội chúng ta phong phú và thú vị hơn."
  },
  'au_g5_u02': {
    text: "Global issues are problems that affect the whole planet, like climate change, poverty, and protecting endangered species. Because the world is so connected, pollution created in one country can affect the oceans halfway around the globe. To solve these massive problems, countries must work together. The United Nations is an organization where leaders meet to discuss solutions. We can help locally by reducing waste and raising awareness about global challenges.",
    textVi: "Các vấn đề toàn cầu là những vấn đề ảnh hưởng đến toàn hành tinh, như biến đổi khí hậu, nghèo đói và bảo vệ các loài nguy cấp. Vì thế giới rất kết nối, ô nhiễm ở một quốc gia có thể ảnh hưởng đến đại dương ở nửa kia địa cầu. Để giải quyết những vấn đề khổng lồ này, các nước phải làm việc cùng nhau. Liên Hợp Quốc là tổ chức nơi các nhà lãnh đạo gặp gỡ để thảo luận giải pháp. Chúng ta có thể giúp tại địa phương bằng cách giảm rác thải và nâng cao nhận thức về thách thức toàn cầu."
  },
  'au_g5_u03': {
    text: "Australian literature tells the unique stories of our vast continent. Classic authors like Colin Thiele wrote about life in rural Australia, while modern writers like Mem Fox create beloved picture books. Indigenous authors like Sally Morgan share powerful stories of Aboriginal history and resilience. Reading Australian literature helps us understand the harshness of the outback, the beauty of the coast, and the diverse lives of the people who call this country home.",
    textVi: "Văn học Úc kể những câu chuyện độc đáo về lục địa rộng lớn của chúng ta. Các tác giả kinh điển như Colin Thiele viết về cuộc sống ở vùng nông thôn Úc, trong khi những nhà văn hiện đại như Mem Fox tạo ra những cuốn sách tranh được yêu thích. Các tác giả bản địa như Sally Morgan chia sẻ những câu chuyện mạnh mẽ về lịch sử và sự kiên cường của Thổ dân. Đọc văn học Úc giúp ta hiểu sự khắc nghiệt của vùng hẻo lánh, vẻ đẹp của bờ biển và cuộc sống đa dạng của những người gọi đất nước này là nhà."
  },
  'au_g5_u04': {
    text: "A debate is a structured argument where two sides present opposing views on a topic. In a debate about whether school uniforms should be banned, the affirmative team argues 'Yes', while the negative team argues 'No'. Good debaters must research facts to support their points and anticipate what the other team will say. Debating teaches critical thinking, public speaking, and the ability to disagree respectfully with others.",
    textVi: "Tranh biện là một cuộc tranh luận có cấu trúc nơi hai bên trình bày quan điểm đối lập về một chủ đề. Trong cuộc tranh biện về việc có nên cấm đồng phục học sinh không, đội ủng hộ lập luận 'Có', trong khi đội phản đối lập luận 'Không'. Những người tranh biện giỏi phải nghiên cứu sự thật để ủng hộ luận điểm và dự đoán đội kia sẽ nói gì. Tranh biện dạy tư duy phản biện, nói trước công chúng và khả năng không đồng ý một cách tôn trọng với người khác."
  },
  'au_g5_u05': {
    text: "A biography is the true story of a person's life, written by someone else. When writing a biography about Sir Donald Bradman, Australia's greatest cricketer, a writer would include his childhood, his major achievements, and the legacy he left behind. An autobiography, on the other hand, is when a person writes their own life story. Reading biographies of famous scientists, leaders, and athletes can inspire us to overcome our own challenges.",
    textVi: "Tiểu sử là câu chuyện có thật về cuộc đời một người, do người khác viết. Khi viết tiểu sử về Sir Donald Bradman, vận động viên cricket vĩ đại nhất của Úc, người viết sẽ bao gồm tuổi thơ, những thành tựu chính và di sản ông để lại. Mặt khác, tự truyện là khi một người tự viết câu chuyện đời mình. Đọc tiểu sử của các nhà khoa học, nhà lãnh đạo và vận động viên nổi tiếng có thể truyền cảm hứng để chúng ta vượt qua thử thách của chính mình."
  },
  'au_g5_u06': {
    text: "Visual texts, like films, advertisements, and photographs, use images and sound to communicate meaning. A filmmaker uses camera angles to make a character look powerful (filming from below) or weak (filming from above). Lighting and music also set the mood. In a scary movie, the music might be fast and high-pitched. Learning to 'read' visual texts helps us understand how media can influence our emotions and opinions.",
    textVi: "Văn bản hình ảnh, như phim, quảng cáo và ảnh chụp, dùng hình ảnh và âm thanh để truyền đạt ý nghĩa. Một nhà làm phim dùng góc máy để làm nhân vật trông quyền lực (quay từ dưới lên) hoặc yếu đuối (quay từ trên xuống). Ánh sáng và âm nhạc cũng tạo tâm trạng. Trong phim kinh dị, nhạc có thể nhanh và cao vút. Học cách 'đọc' văn bản hình ảnh giúp chúng ta hiểu cách truyền thông có thể ảnh hưởng đến cảm xúc và ý kiến của ta."
  },
  'au_g5_u07': {
    text: "Journalistic writing is designed to give the reader the most important information right away. News articles use the 'inverted pyramid' structure. The first paragraph, called the lead, answers the 5 Ws: Who, What, When, Where, and Why. The following paragraphs give extra details and quotes from witnesses. Good journalists must stay objective, meaning they report the facts without adding their personal feelings or bias to the story.",
    textVi: "Lối viết báo chí được thiết kế để đưa thông tin quan trọng nhất cho người đọc ngay lập tức. Bài báo dùng cấu trúc 'kim tự tháp ngược'. Đoạn đầu, gọi là phần mở đầu, trả lời 5 chữ W: Ai, Cái gì, Khi nào, Ở đâu và Tại sao. Các đoạn sau cung cấp chi tiết thêm và trích dẫn từ nhân chứng. Các nhà báo giỏi phải giữ khách quan, nghĩa là họ báo cáo sự thật mà không thêm cảm xúc cá nhân hay thành kiến vào câu chuyện."
  },
  'au_g5_u08': {
    text: "Reflection is the process of looking back on an experience to learn from it. At the end of a big school project, you might ask yourself: 'What did I do well? What was difficult? What would I do differently next time?' Writing a reflection journal helps you understand your own learning process. By recognizing our mistakes and celebrating our successes, reflection helps us grow and improve for future challenges.",
    textVi: "Phản tư là quá trình nhìn lại một trải nghiệm để học hỏi từ nó. Cuối một dự án lớn ở trường, bạn có thể tự hỏi: 'Mình đã làm tốt điều gì? Cái gì khó khăn? Lần sau mình sẽ làm gì khác đi?' Viết nhật ký phản tư giúp bạn hiểu quá trình học tập của chính mình. Bằng cách nhận ra sai lầm và ăn mừng thành công, phản tư giúp chúng ta trưởng thành và cải thiện cho những thử thách tương lai."
  },
  'fi_g1_u01': {
    text: "In Finland, we greet our friends by saying 'Hei' or 'Moi'. It is polite to look people in the eye and give a firm handshake when you meet someone new. Even young children learn to take off their shoes when entering a house or a classroom to keep the floors clean. Saying 'kiitos', which means thank you, shows respect. Friendly greetings are the first step to making everyone feel welcome in our school community.",
    textVi: "Ở Phần Lan, chúng tôi chào bạn bè bằng cách nói 'Hei' hoặc 'Moi'. Thật lịch sự khi nhìn vào mắt người khác và bắt tay chặt khi bạn gặp ai đó mới. Thậm chí trẻ nhỏ cũng học cách cởi giày khi vào nhà hoặc lớp học để giữ cho sàn nhà sạch sẽ. Nói 'kiitos', có nghĩa là cảm ơn, thể hiện sự tôn trọng. Những lời chào thân thiện là bước đầu tiên để làm cho mọi người cảm thấy được chào đón trong cộng đồng trường học của chúng ta."
  },
  'fi_g1_u02': {
    text: "My family loves to spend weekends together outdoors. We often walk in the nearby forest to pick wild berries and mushrooms. My grandparents, or 'isovanhemmat', teach me how to recognize which mushrooms are safe to eat. In the evening, we might go to the sauna, a special room heated by hot stones. Taking a sauna is a very important Finnish family tradition where we relax and talk about our day in peace.",
    textVi: "Gia đình tôi thích dành những ngày cuối tuần cùng nhau ở ngoài trời. Chúng tôi thường đi dạo trong khu rừng gần đó để hái quả mọng và nấm hoang dã. Ông bà tôi, hay 'isovanhemmat', dạy tôi cách nhận biết loại nấm nào an toàn để ăn. Vào buổi tối, chúng tôi có thể đến phòng tắm hơi (sauna), một căn phòng đặc biệt được làm nóng bằng những viên đá nóng. Tắm hơi là một truyền thống gia đình Phần Lan rất quan trọng, nơi chúng tôi thư giãn và nói về ngày của mình trong sự yên bình."
  },
  'fi_g1_u03': {
    text: "Nature is all around us, even in the city. In the winter, the snow covers everything like a thick white blanket, and we can see the tracks of hares and foxes. The reindeer is a special animal that lives in Lapland, the northern part of Finland. Reindeer have thick fur to keep them warm and wide hooves to walk on the deep snow. Finnish children are taught early to respect nature and never leave rubbish behind in the forest.",
    textVi: "Thiên nhiên ở xung quanh chúng ta, ngay cả trong thành phố. Vào mùa đông, tuyết phủ mọi thứ giống như một tấm chăn trắng dày, và chúng ta có thể nhìn thấy dấu vết của thỏ rừng và cáo. Tuần lộc là một loài động vật đặc biệt sống ở Lapland, phần phía bắc của Phần Lan. Tuần lộc có bộ lông dày để giữ ấm và móng guốc rộng để đi trên tuyết sâu. Trẻ em Phần Lan được dạy từ sớm việc tôn trọng thiên nhiên và không bao giờ vứt rác lại trong rừng."
  },
  'fi_g1_u04': {
    text: "Learning colours and numbers is fun! In the autumn, the leaves turn keltainen (yellow), punainen (red), and oranssi (orange). This beautiful season is called 'ruska'. We count the leaves as they fall: yksi, kaksi, kolme, neljä, viisi! When the snow comes, everything is valkoinen (white). By counting the stars in the dark winter sky or the colorful wooden blocks in our classroom, we practice numbers every single day.",
    textVi: "Học màu sắc và những con số thật thú vị! Vào mùa thu, lá chuyển sang keltainen (màu vàng), punainen (màu đỏ) và oranssi (màu cam). Mùa tuyệt đẹp này được gọi là 'ruska'. Chúng tôi đếm lá khi chúng rụng: yksi, kaksi, kolme, neljä, viisi! Khi tuyết rơi, mọi thứ đều valkoinen (màu trắng). Bằng cách đếm các vì sao trên bầu trời đêm mùa đông hoặc các khối gỗ đầy màu sắc trong lớp học, chúng tôi thực hành các con số mỗi ngày."
  },
  'fi_g1_u05': {
    text: "Healthy food gives us energy to play and learn. A typical Finnish school lunch is free for every student and includes a warm meal, fresh salad, crispbread, and milk. We love eating ruisleipä, a dark rye bread that makes our teeth and tummies strong. Drinking pure tap water is the best way to stay hydrated. Sitting together for a healthy meal is an important part of our school day.",
    textVi: "Thức ăn lành mạnh mang lại cho chúng ta năng lượng để vui chơi và học tập. Bữa trưa ở trường học điển hình của Phần Lan là miễn phí cho mọi học sinh và bao gồm một bữa ăn nóng, salad tươi, bánh mì giòn và sữa. Chúng tôi thích ăn ruisleipä, một loại bánh mì lúa mạch đen sẫm màu làm cho răng và bụng của chúng tôi khỏe mạnh. Uống nước máy tinh khiết là cách tốt nhất để giữ đủ nước. Ngồi cùng nhau ăn một bữa ăn lành mạnh là một phần quan trọng trong ngày học của chúng tôi."
  },
  'fi_g1_u06': {
    text: "Songs and rhymes help us learn new words easily. In music class, we sing traditional folk songs and play instruments like the kantele, which sounds like ringing bells. Rhyming games make reading fun because we match words that sound the same, like 'kissa' (cat) and 'pissa' (puddle). Singing together creates a happy atmosphere in the classroom and teaches us to listen carefully to the rhythm of our language.",
    textVi: "Các bài hát và vần điệu giúp chúng tôi học từ mới dễ dàng. Trong lớp học âm nhạc, chúng tôi hát những bài hát dân ca truyền thống và chơi các nhạc cụ như đàn kantele, có âm thanh giống như tiếng chuông reo. Các trò chơi gieo vần làm cho việc đọc trở nên thú vị vì chúng tôi ghép các từ có âm thanh giống nhau, như 'kissa' (con mèo) và 'pissa' (vũng nước). Hát cùng nhau tạo ra một bầu không khí vui vẻ trong lớp học và dạy chúng tôi lắng nghe cẩn thận nhịp điệu ngôn ngữ của mình."
  },
  'fi_g2_u01': {
    text: "My day starts with a hearty breakfast of porridge and berries. I pack my bag and walk or cycle to school, wearing a warm coat and a safety reflector so cars can see me in the dark. In Finland, we have short school days with plenty of outdoor breaks. After school, I attend a local hobby club before doing a little bit of homework. My day ends by reading a book tucked warmly in my bed.",
    textVi: "Ngày của tôi bắt đầu bằng một bữa sáng thịnh soạn với cháo yến mạch và quả mọng. Tôi thu dọn cặp sách và đi bộ hoặc đạp xe đến trường, mặc một chiếc áo khoác ấm và một miếng phản quang an toàn để ô tô có thể nhìn thấy tôi trong bóng tối. Ở Phần Lan, chúng tôi có những ngày học ngắn với nhiều giờ nghỉ ngoài trời. Sau giờ học, tôi tham gia một câu lạc bộ sở thích địa phương trước khi làm một chút bài tập về nhà. Ngày của tôi kết thúc bằng việc đọc một cuốn sách trong lúc rúc ấm áp trên giường."
  },
  'fi_g2_u02': {
    text: "School life in Finland is focused on cooperation, not competition. We do not have many tests; instead, we work on projects in small groups. During our 15-minute recess after every lesson, we go outside to run and play, even if it is snowing. This fresh air helps our brains focus better when we return to the classroom. Our teachers trust us to be responsible, and we call them by their first names.",
    textVi: "Cuộc sống học đường ở Phần Lan tập trung vào sự hợp tác, không phải cạnh tranh. Chúng tôi không có nhiều bài kiểm tra; thay vào đó, chúng tôi làm việc theo các dự án trong các nhóm nhỏ. Trong 15 phút giải lao sau mỗi bài học, chúng tôi ra ngoài để chạy và vui chơi, ngay cả khi trời đang có tuyết. Không khí trong lành này giúp não bộ của chúng tôi tập trung tốt hơn khi trở lại lớp học. Giáo viên tin tưởng chúng tôi sẽ có trách nhiệm, và chúng tôi gọi họ bằng tên."
  },
  'fi_g2_u03': {
    text: "Hobbies are an important part of growing up. Almost every child in Finland plays a sport, learns an instrument, or does arts and crafts. Ice hockey and cross-country skiing are very popular in the winter. In the summer, many children learn to swim in the thousands of clean lakes across the country. Hobbies are not just about becoming the best; they are about having fun, making friends, and learning new skills outside of school.",
    textVi: "Sở thích là một phần quan trọng của việc trưởng thành. Hầu như mọi đứa trẻ ở Phần Lan đều chơi một môn thể thao, học một loại nhạc cụ, hoặc làm đồ thủ công mỹ nghệ. Khúc côn cầu trên băng và trượt tuyết băng đồng rất phổ biến vào mùa đông. Vào mùa hè, nhiều trẻ em học bơi trong hàng ngàn hồ nước sạch trên khắp đất nước. Sở thích không chỉ là để trở thành người giỏi nhất; chúng là để vui chơi, kết bạn và học những kỹ năng mới bên ngoài trường học."
  },
  'fi_g2_u04': {
    text: "The weather changes dramatically across the four seasons. In winter, the sun barely rises, creating a magical blue twilight called 'kaamos'. Spring brings melting snow and the first green buds. Summer is the time of the 'Midnight Sun', when it stays light outside almost all night long. Autumn brings crisp air and dark, rainy evenings. We believe there is no such thing as bad weather, only bad clothing, so we always dress right for the season.",
    textVi: "Thời tiết thay đổi đáng kể qua bốn mùa. Vào mùa đông, mặt trời hầu như không mọc, tạo ra một ánh sáng chạng vạng màu xanh kỳ diệu gọi là 'kaamos'. Mùa xuân mang đến tuyết tan và những chồi xanh đầu tiên. Mùa hè là thời điểm của 'Mặt trời lúc nửa đêm', khi trời vẫn sáng gần như suốt đêm. Mùa thu mang đến không khí se lạnh và những buổi tối tối tăm, có mưa. Chúng tôi tin rằng không có thời tiết xấu, chỉ có quần áo không phù hợp, vì vậy chúng tôi luôn mặc đúng trang phục cho từng mùa."
  },
  'fi_g2_u05': {
    text: "At the shop, we practice using math and being polite. When buying ingredients to bake pulla (sweet cardamom bread), we count our euros and cents to make sure we have enough. We greet the cashier with a smile and pack our own groceries into a reusable cloth bag to protect the environment. Learning to handle money and shop responsibly are practical skills that prepare us for everyday life.",
    textVi: "Tại cửa hàng, chúng tôi thực hành sử dụng toán học và lịch sự. Khi mua nguyên liệu để nướng bánh pulla (bánh mì ngọt vị thảo quả), chúng tôi đếm số euro và xu của mình để đảm bảo có đủ. Chúng tôi chào thu ngân bằng một nụ cười và tự đóng gói hàng hóa của mình vào một chiếc túi vải có thể tái sử dụng để bảo vệ môi trường. Học cách xử lý tiền bạc và mua sắm có trách nhiệm là những kỹ năng thiết thực chuẩn bị cho chúng tôi trong cuộc sống hàng ngày."
  },
  'fi_g2_u06': {
    text: "Festivals bring light and joy throughout the year. At Christmas, we believe Santa Claus lives in Korvatunturi, right here in Finland. We decorate trees and eat ginger biscuits. In the summer, we celebrate Midsummer (Juhannus) by going to a summer cottage, lighting a big bonfire by the lake, and enjoying the long, bright night. These traditions connect us to our history and give us special moments to share with family and friends.",
    textVi: "Các lễ hội mang lại ánh sáng và niềm vui trong suốt cả năm. Vào dịp Giáng sinh, chúng tôi tin rằng Ông già Noel sống ở Korvatunturi, ngay tại Phần Lan này. Chúng tôi trang trí cây thông và ăn bánh quy gừng. Vào mùa hè, chúng tôi kỷ niệm Lễ Hạ chí (Juhannus) bằng cách đến một ngôi nhà tranh mùa hè, đốt một đống lửa lớn bên hồ, và tận hưởng đêm dài, rực sáng. Những truyền thống này kết nối chúng tôi với lịch sử và mang lại những khoảnh khắc đặc biệt để chia sẻ cùng gia đình và bạn bè."
  },
  'fi_g3_u01': {
    text: "Learning about other countries and cultures makes us global citizens. Finland is part of the Nordic countries, along with Sweden, Norway, Denmark, and Iceland. Even though we are close neighbors, each country has its own language and traditions. By studying maps, tasting new foods, and learning a few words in different languages, we build bridges of understanding. Respecting other cultures is just as important as being proud of our own.",
    textVi: "Việc tìm hiểu về các quốc gia và nền văn hóa khác giúp chúng ta trở thành những công dân toàn cầu. Phần Lan là một phần của các nước Bắc Âu, cùng với Thụy Điển, Na Uy, Đan Mạch và Iceland. Mặc dù là những nước láng giềng gần gũi, mỗi quốc gia có ngôn ngữ và truyền thống riêng. Bằng cách nghiên cứu bản đồ, nếm thử các món ăn mới và học một vài từ trong các ngôn ngữ khác nhau, chúng ta xây dựng những nhịp cầu thấu hiểu. Tôn trọng các nền văn hóa khác cũng quan trọng như việc tự hào về nền văn hóa của chính mình."
  },
  'fi_g3_u02': {
    text: "Nature and the environment are central to Finnish life. We have a concept called 'Everyman's Right', which means anyone can walk, ski, or camp in nature, and pick wild berries and mushrooms, regardless of who owns the land. But with this freedom comes responsibility. We must never damage trees, disturb animals, or leave trash behind. Protecting our forests and thousands of lakes ensures that future generations can also enjoy the beauty of our environment.",
    textVi: "Thiên nhiên và môi trường là trung tâm của cuộc sống Phần Lan. Chúng tôi có một khái niệm gọi là 'Quyền của Mọi người', nghĩa là bất cứ ai cũng có thể đi bộ, trượt tuyết hoặc cắm trại trong tự nhiên, và hái quả mọng cùng nấm hoang dã, bất kể ai sở hữu khu đất đó. Nhưng đi kèm với tự do này là trách nhiệm. Chúng ta không bao giờ được làm hỏng cây cối, quấy rầy động vật, hoặc để lại rác. Việc bảo vệ các khu rừng và hàng ngàn hồ nước của chúng ta đảm bảo rằng các thế hệ tương lai cũng có thể tận hưởng vẻ đẹp của môi trường."
  },
  'fi_g3_u03': {
    text: "Healthy living is about finding a balance between activity and rest. Physical education is a core part of the Finnish curriculum, teaching us skills like ice skating in winter and orienteering in the forest during autumn. Equally important is mental well-being. Schools provide quiet spaces for relaxation, and teachers emphasize the importance of getting enough sleep. A healthy lifestyle gives us the energy to learn and the resilience to face life's challenges.",
    textVi: "Sống khỏe mạnh là tìm kiếm sự cân bằng giữa hoạt động và nghỉ ngơi. Giáo dục thể chất là một phần cốt lõi của chương trình giảng dạy Phần Lan, dạy chúng tôi các kỹ năng như trượt băng vào mùa đông và chạy định hướng trong rừng vào mùa thu. Tương đương với tầm quan trọng đó là sức khỏe tinh thần. Các trường học cung cấp không gian yên tĩnh để thư giãn, và giáo viên nhấn mạnh tầm quan trọng của việc ngủ đủ giấc. Lối sống lành mạnh mang lại cho chúng ta năng lượng để học tập và sự kiên cường để đối mặt với những thách thức trong cuộc sống."
  },
  'fi_g3_u04': {
    text: "Travel opens our eyes to the vast and diverse world. Whether taking a train across Europe or flying to a different continent, every journey is an adventure. When we travel, we learn how to navigate airports, read maps, and communicate even when we do not share a language. We also learn that despite our differences, people everywhere share similar hopes and dreams. Traveling teaches us independence and broadens our perspective on life.",
    textVi: "Du lịch mở rộng tầm mắt của chúng ta về một thế giới rộng lớn và đa dạng. Cho dù đi tàu qua châu Âu hay bay đến một lục địa khác, mỗi chuyến đi đều là một cuộc phiêu lưu. Khi chúng ta đi du lịch, chúng ta học cách điều hướng ở sân bay, đọc bản đồ và giao tiếp ngay cả khi không cùng ngôn ngữ. Chúng ta cũng học được rằng mặc dù có sự khác biệt, mọi người ở khắp nơi đều chia sẻ những hy vọng và ước mơ tương tự. Du lịch dạy chúng ta sự tự lập và mở rộng góc nhìn của chúng ta về cuộc sống."
  },
  'fi_g3_u05': {
    text: "Stories and fairy tales have been told around campfires for centuries. Finland's national epic, the Kalevala, is a collection of ancient myths and poems about heroes, magic, and the creation of the world. Tove Jansson's Moomin books are modern classics, loved worldwide for their gentle philosophy and quirky characters. These stories do more than entertain; they pass down cultural values and teach us about courage, friendship, and the eternal struggle between good and evil.",
    textVi: "Những câu chuyện và truyện cổ tích đã được kể quanh lửa trại trong nhiều thế kỷ. Sử thi quốc gia của Phần Lan, Kalevala, là một tập hợp các thần thoại và bài thơ cổ về các anh hùng, phép thuật và sự sáng tạo ra thế giới. Những cuốn sách Moomin của Tove Jansson là những tác phẩm kinh điển hiện đại, được yêu thích trên toàn thế giới vì triết lý nhẹ nhàng và các nhân vật kỳ quặc. Những câu chuyện này không chỉ để giải trí; chúng truyền lại các giá trị văn hóa và dạy chúng ta về lòng dũng cảm, tình bạn và cuộc đấu tranh vĩnh cửu giữa thiện và ác."
  },
  'fi_g3_u06': {
    text: "Music and art are vital languages of human expression. In Finland, music education starts early, and many children sing in choirs or learn instruments. The music of Jean Sibelius, our most famous composer, captures the spirit of the Finnish landscape. In art class, we experiment with different materials, from painting watercolors of the Northern Lights to building sculptures from recycled materials. The arts allow us to communicate feelings that cannot be easily put into words.",
    textVi: "Âm nhạc và nghệ thuật là những ngôn ngữ quan trọng của sự biểu đạt con người. Ở Phần Lan, giáo dục âm nhạc bắt đầu sớm, và nhiều trẻ em hát trong dàn đồng ca hoặc học nhạc cụ. Âm nhạc của Jean Sibelius, nhà soạn nhạc nổi tiếng nhất của chúng tôi, nắm bắt được tinh thần của phong cảnh Phần Lan. Trong lớp học nghệ thuật, chúng tôi thử nghiệm với các vật liệu khác nhau, từ việc vẽ màu nước về Bắc Cực Quang đến việc xây dựng các tác phẩm điêu khắc từ vật liệu tái chế. Nghệ thuật cho phép chúng ta truyền đạt những cảm xúc không dễ dàng diễn tả bằng lời."
  },
  'fi_g4_u01': {
    text: "Media and technology are deeply integrated into modern life. Finland is known for its tech innovations, like the mobile phone giant Nokia and the Linux operating system. In school, we learn media literacy: how to search for reliable information online, protect our privacy, and recognize fake news. We also learn basic coding as a new type of literacy. Using technology responsibly empowers us to be active creators, not just passive consumers.",
    textVi: "Truyền thông và công nghệ được tích hợp sâu sắc vào cuộc sống hiện đại. Phần Lan được biết đến với những đổi mới công nghệ, như người khổng lồ điện thoại di động Nokia và hệ điều hành Linux. Ở trường, chúng tôi học kiến thức truyền thông: cách tìm kiếm thông tin đáng tin cậy trên mạng, bảo vệ quyền riêng tư và nhận biết tin giả. Chúng tôi cũng học lập trình cơ bản như một loại kiến thức mới. Việc sử dụng công nghệ một cách có trách nhiệm trao quyền cho chúng ta trở thành những người sáng tạo tích cực, không chỉ là người tiêu thụ thụ động."
  },
  'fi_g4_u02': {
    text: "History and heritage shape who we are today. Finland has a unique history, having been a part of Sweden for centuries and later an autonomous part of the Russian Empire before gaining independence in 1917. We celebrate Independence Day on December 6th with solemn traditions. Understanding our history helps us appreciate the struggles of past generations and the value of the democratic, free society we live in now.",
    textVi: "Lịch sử và di sản định hình nên con người chúng ta ngày nay. Phần Lan có một lịch sử độc đáo, từng là một phần của Thụy Điển trong nhiều thế kỷ và sau đó là một phần tự trị của Đế quốc Nga trước khi giành độc lập vào năm 1917. Chúng tôi kỷ niệm Ngày Độc lập vào ngày 6 tháng 12 với những truyền thống trang nghiêm. Việc hiểu về lịch sử giúp chúng ta trân trọng những cuộc đấu tranh của các thế hệ trước và giá trị của xã hội dân chủ, tự do mà chúng ta đang sống hiện nay."
  },
  'fi_g4_u03': {
    text: "Sustainability is a guiding principle in Finland. We aim to be a carbon-neutral society. This means finding innovative ways to heat our homes during long, cold winters without relying on fossil fuels. Wind power and sustainable forestry are key industries. At school, sustainability is woven into every subject. We learn that every choice matters, from reducing food waste in the cafeteria to repairing old clothes instead of always buying new ones.",
    textVi: "Sự bền vững là một nguyên tắc chỉ đạo ở Phần Lan. Chúng tôi hướng tới việc trở thành một xã hội trung hòa carbon. Điều này có nghĩa là tìm ra những cách sáng tạo để sưởi ấm nhà cửa trong những mùa đông dài và lạnh giá mà không phụ thuộc vào nhiên liệu hóa thạch. Năng lượng gió và lâm nghiệp bền vững là những ngành công nghiệp then chốt. Ở trường, sự bền vững được đan xen vào mọi môn học. Chúng tôi học được rằng mọi lựa chọn đều quan trọng, từ việc giảm lãng phí thức ăn trong căng tin đến việc sửa chữa quần áo cũ thay vì luôn mua đồ mới."
  },
  'fi_g4_u04': {
    text: "Rights and responsibilities are the foundations of a fair society. The UN Convention on the Rights of the Child guarantees every child the right to education, safety, and play. In Finland, education is free for everyone, ensuring equal opportunities regardless of a family's background. However, with rights come responsibilities. We must respect the rights of others, follow laws, and contribute positively to our community. A well-functioning society relies on trust and mutual respect.",
    textVi: "Quyền lợi và trách nhiệm là nền tảng của một xã hội công bằng. Công ước Liên Hợp Quốc về Quyền Trẻ em đảm bảo mọi trẻ em đều có quyền được giáo dục, an toàn và vui chơi. Ở Phần Lan, giáo dục là miễn phí cho tất cả mọi người, đảm bảo cơ hội bình đẳng bất kể nền tảng gia đình. Tuy nhiên, đi kèm với quyền lợi là trách nhiệm. Chúng ta phải tôn trọng quyền của người khác, tuân thủ luật pháp và đóng góp tích cực cho cộng đồng. Một xã hội vận hành tốt dựa trên sự tin tưởng và tôn trọng lẫn nhau."
  },
  'fi_g4_u05': {
    text: "Innovation is the process of creating new ideas, products, or methods. It is not just about technology; it can be a new way of organizing a library or reducing waste in a factory. Finnish schools encourage innovation by teaching problem-solving skills and allowing students to work on cross-curricular phenomena, rather than just isolated subjects. By learning to think creatively and not being afraid of failure, we prepare ourselves to tackle future challenges.",
    textVi: "Đổi mới là quá trình tạo ra những ý tưởng, sản phẩm hoặc phương pháp mới. Nó không chỉ liên quan đến công nghệ; nó có thể là một cách mới để tổ chức thư viện hoặc giảm thiểu chất thải trong một nhà máy. Các trường học ở Phần Lan khuyến khích sự đổi mới bằng cách dạy các kỹ năng giải quyết vấn đề và cho phép học sinh làm việc trên các hiện tượng liên môn, thay vì chỉ là các môn học biệt lập. Bằng cách học tư duy sáng tạo và không sợ thất bại, chúng ta chuẩn bị cho bản thân để giải quyết những thách thức trong tương lai."
  },
  'fi_g4_u06': {
    text: "Nordic culture shares common values like equality, trust, and a deep connection to nature. The Nordic model combines a free-market economy with a strong welfare state, ensuring healthcare and education for all. We also share cultural traits like 'sisu' in Finland—a stoic determination and resilience in the face of adversity. Exploring the literature, design, and history of our Nordic neighbors helps us understand the region's strong spirit of cooperation.",
    textVi: "Văn hóa Bắc Âu chia sẻ những giá trị chung như sự bình đẳng, lòng tin và sự kết nối sâu sắc với thiên nhiên. Mô hình Bắc Âu kết hợp nền kinh tế thị trường tự do với một nhà nước phúc lợi mạnh mẽ, đảm bảo chăm sóc sức khỏe và giáo dục cho tất cả mọi người. Chúng tôi cũng chia sẻ các đặc điểm văn hóa như 'sisu' ở Phần Lan—sự quyết tâm và kiên cường đối mặt với nghịch cảnh. Khám phá văn học, thiết kế và lịch sử của các nước láng giềng Bắc Âu giúp chúng ta hiểu được tinh thần hợp tác mạnh mẽ của khu vực."
  },
  'fi_g5_u01': {
    text: "Global citizenship means understanding that we are part of a worldwide community. The challenges we face, such as climate change and pandemics, do not respect national borders. Therefore, solutions require global cooperation. By studying world geography, current affairs, and human rights, we learn how our local actions impact the global environment and economy. A true global citizen is informed, empathetic, and ready to act for the common good of humanity.",
    textVi: "Công dân toàn cầu có nghĩa là hiểu rằng chúng ta là một phần của cộng đồng trên toàn thế giới. Những thách thức mà chúng ta phải đối mặt, chẳng hạn như biến đổi khí hậu và đại dịch, không tôn trọng biên giới quốc gia. Do đó, các giải pháp đòi hỏi sự hợp tác toàn cầu. Bằng cách nghiên cứu địa lý thế giới, các vấn đề thời sự và nhân quyền, chúng ta học được cách hành động địa phương của mình tác động đến môi trường và nền kinh tế toàn cầu. Một công dân toàn cầu thực sự là người có hiểu biết, đồng cảm và sẵn sàng hành động vì lợi ích chung của nhân loại."
  },
  'fi_g5_u02': {
    text: "Science and discovery fuel human progress. The scientific method teaches us to observe the world, ask questions, form hypotheses, and conduct experiments. Finland has a strong tradition in science, from forestry research to space technology. At school, we conduct hands-on experiments to understand physics, chemistry, and biology. Critical thinking is key in science: we must always evaluate evidence objectively and be willing to change our minds when new data emerges.",
    textVi: "Khoa học và sự khám phá thúc đẩy sự tiến bộ của con người. Phương pháp khoa học dạy chúng ta quan sát thế giới, đặt câu hỏi, hình thành các giả thuyết và tiến hành các thí nghiệm. Phần Lan có truyền thống mạnh mẽ về khoa học, từ nghiên cứu lâm nghiệp đến công nghệ không gian. Ở trường, chúng tôi tiến hành các thí nghiệm thực hành để hiểu vật lý, hóa học và sinh học. Tư duy phản biện là chìa khóa trong khoa học: chúng ta phải luôn đánh giá bằng chứng một cách khách quan và sẵn sàng thay đổi suy nghĩ khi có dữ liệu mới xuất hiện."
  },
  'fi_g5_u03': {
    text: "Literature is a mirror of society and a window into the human soul. Reading diverse literature—novels, poems, and plays—allows us to explore complex themes like justice, love, and identity. In Finland, literacy rates are among the highest in the world, and libraries are central to our communities. Engaging with literature improves our vocabulary and analytical skills, but most importantly, it nurtures empathy by letting us live a thousand different lives.",
    textVi: "Văn học là tấm gương phản chiếu xã hội và là cửa sổ nhìn vào tâm hồn con người. Việc đọc văn học đa dạng—tiểu thuyết, thơ và kịch—cho phép chúng ta khám phá các chủ đề phức tạp như công lý, tình yêu và bản sắc. Ở Phần Lan, tỷ lệ biết chữ thuộc hàng cao nhất thế giới và các thư viện là trung tâm của cộng đồng chúng tôi. Việc tiếp xúc với văn học cải thiện vốn từ vựng và kỹ năng phân tích của chúng ta, nhưng quan trọng nhất, nó nuôi dưỡng sự đồng cảm bằng cách cho phép chúng ta sống hàng ngàn cuộc đời khác nhau."
  },
  'fi_g5_u04': {
    text: "Current events connect what we learn in school to the real world. By following domestic and international news, we stay informed about politics, economics, and social issues. However, in the digital age, information spreads rapidly, and not all of it is accurate. Therefore, analyzing current events requires media literacy—the ability to identify bias, verify sources, and distinguish between facts and opinions. Active citizens must stay informed to participate meaningfully in democracy.",
    textVi: "Các vấn đề thời sự kết nối những gì chúng ta học ở trường với thế giới thực. Bằng cách theo dõi tin tức trong nước và quốc tế, chúng ta được cập nhật về chính trị, kinh tế và các vấn đề xã hội. Tuy nhiên, trong thời đại kỹ thuật số, thông tin lan truyền nhanh chóng, và không phải tất cả đều chính xác. Do đó, việc phân tích các sự kiện hiện tại đòi hỏi kiến thức truyền thông—khả năng xác định sự thiên vị, xác minh các nguồn tin và phân biệt giữa sự thật và ý kiến. Những công dân tích cực phải luôn cập nhật thông tin để tham gia một cách có ý nghĩa vào nền dân chủ."
  },
  'fi_g5_u05': {
    text: "Future careers will look very different from the jobs of today. Automation and artificial intelligence are changing the landscape of work. To prepare for the future, we focus on transversal skills: problem-solving, collaboration, creativity, and adaptability. In Finland, vocational and academic paths are equally respected, and lifelong learning is encouraged. Understanding that learning does not stop when school ends is the best preparation for the careers of tomorrow.",
    textVi: "Sự nghiệp trong tương lai sẽ rất khác so với những công việc ngày nay. Tự động hóa và trí tuệ nhân tạo đang làm thay đổi bối cảnh việc làm. Để chuẩn bị cho tương lai, chúng tôi tập trung vào các kỹ năng xuyên suốt: giải quyết vấn đề, hợp tác, sáng tạo và khả năng thích ứng. Ở Phần Lan, con đường học nghề và học thuật được tôn trọng như nhau, và việc học tập suốt đời được khuyến khích. Việc hiểu rằng việc học không dừng lại khi kết thúc trường học là sự chuẩn bị tốt nhất cho sự nghiệp của ngày mai."
  },
  'fi_g5_u06': {
    text: "Project work is a cornerstone of the Finnish educational philosophy. Instead of studying subjects in isolation, we often engage in phenomenon-based learning. For example, a project on 'The Baltic Sea' might combine biology, history, geography, and art. Working in teams, we define research questions, gather data, and present our findings. Project work mirrors the real world, teaching us how to manage time, negotiate ideas, and take ownership of our own learning journey.",
    textVi: "Làm việc theo dự án là nền tảng của triết lý giáo dục Phần Lan. Thay vì học các môn học một cách biệt lập, chúng tôi thường tham gia vào việc học tập dựa trên hiện tượng. Ví dụ, một dự án về 'Biển Baltic' có thể kết hợp sinh học, lịch sử, địa lý và nghệ thuật. Làm việc theo nhóm, chúng tôi xác định các câu hỏi nghiên cứu, thu thập dữ liệu và trình bày các phát hiện của mình. Làm việc theo dự án phản ánh thế giới thực, dạy chúng tôi cách quản lý thời gian, thương lượng các ý tưởng và làm chủ hành trình học tập của chính mình."
  },
  'sg_g1_u03': {
    text: "The playground at the HDB void deck is my favourite place. Every evening, I meet my friends there. We take turns going down the slide and pushing each other on the swings. Sometimes we play catch until the streetlights turn on. Playing together helps us make new friends and stay active. We always remember to share the equipment and say 'thank you' when someone lets us have a turn.",
    textVi: "Sân chơi ở khu vực sinh hoạt chung HDB là nơi tôi thích nhất. Mỗi buổi tối, tôi gặp bạn bè ở đó. Chúng tôi thay phiên nhau trượt cầu trượt và đẩy xích đu cho nhau. Đôi khi chúng tôi chơi đuổi bắt cho đến khi đèn đường bật sáng. Chơi cùng nhau giúp chúng tôi kết bạn mới và năng động. Chúng tôi luôn nhớ chia sẻ thiết bị và nói 'cảm ơn' khi ai đó nhường lượt cho mình."
  },
  'sg_g1_u04': {
    text: "Singapore is famous for its delicious food. At the hawker centre, you can smell chicken rice, roti prata, and laksa. My family likes to eat at the hawker centre on Sundays. I always order warm soya bean milk to drink. Food brings people together. Even though people in Singapore come from different cultures, we all share a love for our local dishes and enjoy eating meals together as a family.",
    textVi: "Singapore nổi tiếng với đồ ăn ngon. Tại trung tâm ẩm thực, bạn có thể ngửi thấy mùi cơm gà, bánh roti prata và bún laksa. Gia đình tôi thích ăn ở trung tâm ẩm thực vào các ngày Chủ nhật. Tôi luôn gọi sữa đậu nành ấm để uống. Đồ ăn mang mọi người đến gần nhau. Mặc dù người dân Singapore đến từ các nền văn hóa khác nhau, tất cả chúng ta đều chung tình yêu với các món ăn địa phương và thích ăn cùng nhau như một gia đình."
  },
  'sg_g1_u05': {
    text: "If you walk through the Botanic Gardens, you will see many animals around us. You might spot a monitor lizard resting on the grass or a hornbill bird sitting in a high tree. We must remember not to feed the wild animals, especially the macaques. Feeding them makes them forget how to find their own food in the forest. Observing animals quietly helps us learn about nature without disturbing their homes.",
    textVi: "Nếu đi dạo qua Vườn Bách Thảo, bạn sẽ thấy nhiều động vật quanh ta. Bạn có thể bắt gặp một con kỳ đà nghỉ ngơi trên bãi cỏ hoặc một con chim hồng hoàng đậu trên cây cao. Chúng ta phải nhớ không cho động vật hoang dã ăn, đặc biệt là khỉ đuôi dài. Việc cho ăn làm chúng quên cách tự tìm thức ăn trong rừng. Quan sát động vật một cách yên lặng giúp chúng ta học về thiên nhiên mà không quấy rầy nhà của chúng."
  },
  'sg_g1_u06': {
    text: "In Singapore, we celebrate many special days together. During Chinese New Year, families share mandarin oranges for good luck. On Hari Raya Puasa, people visit relatives wearing beautiful traditional clothes. Deepavali is the Festival of Lights, and streets are decorated with bright oil lamps. On National Day in August, we all wear red and white to watch the fireworks. These celebrations teach us about the different traditions of our neighbours.",
    textVi: "Tại Singapore, chúng ta cùng nhau ăn mừng nhiều ngày đặc biệt. Trong dịp Tết Nguyên Đán, các gia đình trao nhau quả quýt để cầu may. Vào ngày Hari Raya Puasa, mọi người mặc trang phục truyền thống đẹp đi thăm họ hàng. Deepavali là Lễ hội Ánh sáng, và đường phố được trang trí bằng những đèn dầu sáng rực. Vào Ngày Quốc khánh tháng Tám, tất cả chúng ta mặc màu đỏ và trắng để xem pháo hoa. Những lễ kỷ niệm này dạy chúng ta về các truyền thống khác nhau của hàng xóm."
  },
  'sg_g2_u01': {
    text: "Our neighbourhood is a busy and exciting place. Near the MRT station, there is a wet market where people buy fresh fish and vegetables early in the morning. Beside it is the community club, where residents take classes like martial arts or cooking. We also have a polyclinic to visit when we are sick. Having all these places close to home makes our neighbourhood a convenient and happy place to live.",
    textVi: "Khu phố của chúng ta là một nơi bận rộn và thú vị. Gần ga tàu điện ngầm, có một khu chợ truyền thống nơi mọi người mua cá và rau tươi từ sáng sớm. Bên cạnh là nhà văn hóa cộng đồng, nơi cư dân tham gia các lớp như võ thuật hay nấu ăn. Chúng ta cũng có phòng khám đa khoa để đến khi bị ốm. Có tất cả những nơi này gần nhà làm cho khu phố của chúng ta trở thành một nơi thuận tiện và vui vẻ để sống."
  },
  'sg_g2_u02': {
    text: "Helping others makes our community stronger. When Mrs. Lim, the elderly lady downstairs, dropped her groceries, Ravi quickly helped her pick up the apples. In school, when Sarah forgot her pencils, Mei shared hers without being asked. Even small actions, like holding the lift door open for someone, show kindness. Being considerate of others is an important part of living together in harmony in Singapore.",
    textVi: "Giúp đỡ người khác làm cho cộng đồng chúng ta mạnh mẽ hơn. Khi bà Lim, một bà cụ ở tầng dưới, làm rơi đồ đi chợ, Ravi đã nhanh chóng giúp bà nhặt những quả táo. Ở trường, khi Sarah quên bút chì, Mei đã chia sẻ của mình mà không cần ai yêu cầu. Ngay cả những hành động nhỏ, như giữ cửa thang máy mở cho ai đó, cũng thể hiện sự tử tế. Quan tâm đến người khác là phần quan trọng để sống chung hòa thuận ở Singapore."
  },
  'sg_g2_u03': {
    text: "Singapore is often called a 'City in a Nature' because we have plants and gardens everywhere. Trees line our roads to provide shade from the hot sun. The Supertrees at Gardens by the Bay are famous worldwide. Plants are important because they clean the air we breathe and make our city look beautiful. At school, students take turns watering the plants in the eco-garden to learn responsibility.",
    textVi: "Singapore thường được gọi là 'Thành phố trong Thiên nhiên' vì chúng ta có cây cối và vườn tược khắp nơi. Cây trồng dọc các con đường để che bóng mát dưới nắng nóng. Các Siêu Cây tại Gardens by the Bay nổi tiếng toàn thế giới. Thực vật rất quan trọng vì chúng làm sạch không khí ta thở và làm thành phố trông đẹp hơn. Ở trường, học sinh thay phiên nhau tưới cây trong vườn sinh thái để học tinh thần trách nhiệm."
  },
  'sg_g2_u04': {
    text: "As an island nation, water surrounds Singapore. We also have reservoirs, which are large lakes that store the rainwater we use for drinking and washing. Because water is precious, Singapore has invented NEWater, which is used water that has been cleaned using advanced technology until it is pure and safe. Everyone must play a part in saving water by taking shorter showers and not leaving taps running.",
    textVi: "Là một quốc đảo, nước bao quanh Singapore. Chúng ta cũng có các hồ chứa, là những hồ lớn trữ nước mưa để dùng cho ăn uống và tắm giặt. Vì nước rất quý, Singapore đã phát minh ra NEWater, là nước đã qua sử dụng được làm sạch bằng công nghệ tiên tiến cho đến khi tinh khiết và an toàn. Mọi người phải góp phần tiết kiệm nước bằng cách tắm nhanh hơn và không để vòi nước chảy lãng phí."
  },
  'sg_g2_u05': {
    text: "Singapore is our home. It is a small red dot on the world map, but it is a successful and safe country. Long ago, it was a fishing village, but hard work transformed it into a modern city with tall skyscrapers and a busy port. The Merlion, with the head of a lion and the body of a fish, is a famous symbol of our history. We pledge to build a democratic society, based on justice and equality.",
    textVi: "Singapore là nhà của chúng ta. Dù là một chấm đỏ nhỏ trên bản đồ thế giới, nhưng đây là một quốc gia thành công và an toàn. Rất lâu trước đây, nó là một làng chài, nhưng sự chăm chỉ đã biến nó thành một thành phố hiện đại với những tòa nhà chọc trời và bến cảng nhộn nhịp. Sư tử biển Merlion, với đầu sư tử và mình cá, là một biểu tượng nổi tiếng của lịch sử chúng ta. Chúng ta cam kết xây dựng một xã hội dân chủ, dựa trên công lý và bình đẳng."
  },
  'sg_g2_u06': {
    text: "Being kind starts with simple words and actions. Saying 'Good morning' to the bus captain or clearing your tray after eating at the hawker centre are acts of kindness. Kindness is like a smile — it is contagious. When you are kind to someone, they are more likely to be kind to someone else. The Singapore Kindness Movement encourages everyone to be gracious, showing that a city of good people is a great place to live.",
    textVi: "Sự tử tế bắt đầu từ những lời nói và hành động đơn giản. Chào 'Buổi sáng tốt lành' với tài xế xe buýt hay dọn khay sau khi ăn ở trung tâm ẩm thực là những hành động tử tế. Sự tử tế giống như nụ cười — nó có tính lây lan. Khi bạn đối xử tốt với ai đó, họ sẽ có khả năng đối xử tốt với người khác. Phong trào Tử tế Singapore khuyến khích mọi người trở nên thanh lịch, cho thấy rằng một thành phố có những người tốt là một nơi tuyệt vời để sống."
  },
  'sg_g3_u01': {
    text: "Friendship is built on trust and respect. True friends stand up for each other, even when it is difficult. When Wei Ming was teased about his glasses, his friend Siti immediately told the bullies to stop. A good friend also listens when you are sad and celebrates when you succeed. We do not have to agree on everything to be friends, but we must always be kind and understanding towards one another.",
    textVi: "Tình bạn được xây dựng dựa trên sự tin tưởng và tôn trọng. Những người bạn thực sự đứng ra bảo vệ nhau, ngay cả khi điều đó khó khăn. Khi Wei Ming bị trêu chọc vì đeo kính, bạn của cậu là Siti ngay lập tức bảo những kẻ bắt nạt dừng lại. Một người bạn tốt cũng lắng nghe khi bạn buồn và ăn mừng khi bạn thành công. Chúng ta không cần phải đồng ý về mọi thứ để làm bạn, nhưng luôn phải tử tế và thấu hiểu lẫn nhau."
  },
  'sg_g3_u02': {
    text: "Singapore's heritage is a rich tapestry of different cultures and histories. Kampong Glam, Chinatown, and Little India are historical districts where early immigrants settled. The Peranakans, also known as Straits Chinese, have a unique culture blending Chinese and Malay traditions, famous for their colorful beaded slippers and spicy laksa. Exploring our heritage helps us understand the sacrifices our pioneers made to build the modern Singapore we enjoy today.",
    textVi: "Di sản của Singapore là một bức tranh phong phú về các nền văn hóa và lịch sử khác nhau. Kampong Glam, Chinatown và Little India là những khu vực lịch sử nơi những người nhập cư đầu tiên định cư. Người Peranakan, hay còn gọi là người Hoa eo biển, có một nền văn hóa độc đáo pha trộn truyền thống Trung Quốc và Mã Lai, nổi tiếng với dép đính cườm đầy màu sắc và món laksa cay nồng. Khám phá di sản giúp chúng ta hiểu được những hy sinh của những người tiên phong để xây dựng Singapore hiện đại mà ta tận hưởng hôm nay."
  },
  'sg_g3_u03': {
    text: "The rainforests of Southeast Asia are home to some amazing creatures. The orangutan, meaning 'man of the forest' in Malay, is highly intelligent and builds a new nest high in the trees every night. The pangolin is the world's only scaly mammal, rolling into a tight ball to protect itself from predators. Sadly, both of these incredible animals are endangered due to habitat loss and poaching, reminding us of our duty to protect wildlife.",
    textVi: "Các khu rừng mưa nhiệt đới ở Đông Nam Á là nơi sinh sống của một số sinh vật tuyệt vời. Đười ươi (orangutan), nghĩa là 'người rừng' trong tiếng Mã Lai, rất thông minh và xây một tổ mới trên cây cao mỗi đêm. Tê tê là loài động vật có vú duy nhất trên thế giới có vảy, cuộn tròn thành quả bóng chặt để tự vệ khỏi kẻ săn mồi. Đáng buồn thay, cả hai loài động vật đáng kinh ngạc này đều có nguy cơ tuyệt chủng do mất môi trường sống và nạn săn trộm, nhắc nhở chúng ta về nghĩa vụ bảo vệ động vật hoang dã."
  },
  'sg_g3_u04': {
    text: "Food culture in Singapore reflects our multiracial society. A typical breakfast might be kaya toast with soft-boiled eggs, or a bowl of spicy mee rebus. For dinner, families might share a steamboat, where everyone cooks raw ingredients in a boiling pot of broth at the center of the table. Sharing meals is an important way Singaporeans bond with family and friends, and the hawker centres are the heart of this communal dining experience.",
    textVi: "Văn hóa ẩm thực ở Singapore phản ánh xã hội đa sắc tộc của chúng ta. Bữa sáng điển hình có thể là bánh mì nướng kaya với trứng lòng đào, hoặc một bát mee rebus cay. Đối với bữa tối, các gia đình có thể cùng ăn lẩu, nơi mọi người tự nấu các nguyên liệu sống trong một nồi nước dùng sôi ở giữa bàn. Chia sẻ bữa ăn là một cách quan trọng để người Singapore gắn kết với gia đình và bạn bè, và các trung tâm ẩm thực là trung tâm của trải nghiệm ăn uống cộng đồng này."
  },
  'sg_g3_u05': {
    text: "Good manners show that we respect the people around us. In Singapore, it is customary to greet elders respectfully and offer them a seat on the MRT or bus. When receiving a gift, it is polite to use both hands and say thank you. Covering your mouth when coughing and keeping your volume down in public spaces are also important manners. Small gestures of courtesy make society more pleasant for everyone.",
    textVi: "Cách cư xử tốt cho thấy chúng ta tôn trọng những người xung quanh. Ở Singapore, theo phong tục, chúng ta phải chào hỏi người lớn tuổi một cách tôn trọng và nhường ghế cho họ trên tàu điện ngầm hoặc xe buýt. Khi nhận một món quà, lịch sự là dùng cả hai tay và nói lời cảm ơn. Che miệng khi ho và giữ âm lượng nhỏ ở không gian công cộng cũng là những cách cư xử quan trọng. Những cử chỉ lịch sự nhỏ làm cho xã hội trở nên dễ chịu hơn đối với mọi người."
  },
  'sg_g3_u06': {
    text: "Folktales are stories passed down from generation to generation, often teaching a moral lesson. One famous Asian folktale is the story of Sang Nila Utama, a prince who saw a strange beast on an island and named the place 'Singapura', or Lion City. Another is the tale of the clever mousedeer (Sang Kancil), who used his wits to outsmart much larger animals like crocodiles and tigers. These stories preserve our cultural wisdom.",
    textVi: "Truyện dân gian là những câu chuyện được truyền từ thế hệ này sang thế hệ khác, thường dạy một bài học đạo đức. Một truyện dân gian nổi tiếng của châu Á là câu chuyện về Sang Nila Utama, một hoàng tử đã nhìn thấy một con thú lạ trên một hòn đảo và đặt tên nơi đó là 'Singapura', hay Thành phố Sư tử. Một truyện khác là câu chuyện về con cheo cheo thông minh (Sang Kancil), người đã dùng trí thông minh của mình để đánh lừa những con vật lớn hơn nhiều như cá sấu và hổ. Những câu chuyện này gìn giữ sự khôn ngoan văn hóa của chúng ta."
  },
  'sg_g4_u01': {
    text: "Every adventure requires preparation, courage, and teamwork. When the primary four students went on their outdoor adventure camp at Pulau Ubin, they learned how to pitch tents and navigate using a compass. The highlight was the high elements course, where they had to conquer their fear of heights by walking across a wobbly bridge suspended in the trees. The adventure taught them that they are capable of much more than they thought.",
    textVi: "Mỗi cuộc phiêu lưu đều đòi hỏi sự chuẩn bị, lòng can đảm và tinh thần đồng đội. Khi học sinh lớp 4 đi cắm trại phiêu lưu ngoài trời tại Pulau Ubin, các em đã học cách dựng lều và định vị bằng la bàn. Điểm nhấn là khóa học trên cao, nơi các em phải chinh phục nỗi sợ độ cao bằng cách đi qua một cây cầu chông chênh treo trên cây. Cuộc phiêu lưu đã dạy cho các em thấy rằng mình có khả năng làm được nhiều điều hơn mình nghĩ."
  },
  'sg_g4_u02': {
    text: "Inventions solve problems and change the way we live. The USB flash drive, an essential tool for storing digital data, was invented by a Singaporean company called Trek 2000 International. Before this invention, people used floppy disks that held very little information and broke easily. Innovation requires identifying a need, thinking creatively, and testing ideas over and over until they work. Today's students are the inventors of tomorrow.",
    textVi: "Các phát minh giải quyết vấn đề và thay đổi cách chúng ta sống. Ổ đĩa flash USB, một công cụ thiết yếu để lưu trữ dữ liệu kỹ thuật số, được phát minh bởi một công ty Singapore tên là Trek 2000 International. Trước phát minh này, mọi người sử dụng đĩa mềm chứa rất ít thông tin và dễ hỏng. Sự đổi mới đòi hỏi phải xác định được nhu cầu, suy nghĩ sáng tạo và thử nghiệm các ý tưởng lặp đi lặp lại cho đến khi chúng hoạt động hiệu quả. Học sinh hôm nay là những nhà phát minh của ngày mai."
  },
  'sg_g4_u03': {
    text: "Environmental care is critical for a small island like Singapore. We rely heavily on imported resources, so managing waste is a priority. Semakau Landfill is an offshore landfill created entirely from the ash of incinerated rubbish, yet it is thriving with mangroves and marine life. This shows that with careful planning, we can manage waste without destroying nature. The 3Rs—Reduce, Reuse, Recycle—are actions everyone must practice daily.",
    textVi: "Bảo vệ môi trường là điều tối quan trọng đối với một hòn đảo nhỏ như Singapore. Chúng ta phụ thuộc nhiều vào các nguồn tài nguyên nhập khẩu, vì vậy quản lý rác thải là một ưu tiên. Bãi rác Semakau là một bãi rác ngoài khơi được tạo ra hoàn toàn từ tro của rác đã được đốt, nhưng nó vẫn phát triển mạnh với rừng ngập mặn và sinh vật biển. Điều này cho thấy rằng với kế hoạch cẩn thận, chúng ta có thể quản lý rác thải mà không phá hủy thiên nhiên. 3R—Giảm thiểu, Tái sử dụng, Tái chế—là những hành động mọi người phải thực hành hàng ngày."
  },
  'sg_g4_u04': {
    text: "Singapore is a founding member of ASEAN (Association of Southeast Asian Nations), a group of ten countries that work together to promote peace and economic growth. Our ASEAN neighbours include Malaysia, Indonesia, Thailand, and Vietnam. Although each country has its own distinct language and culture, we share many similarities in food, climate, and history. Strong relations with our neighbours are essential for regional stability and prosperity.",
    textVi: "Singapore là một thành viên sáng lập của ASEAN (Hiệp hội các quốc gia Đông Nam Á), một nhóm gồm mười quốc gia hợp tác cùng nhau để thúc đẩy hòa bình và tăng trưởng kinh tế. Các nước láng giềng ASEAN của chúng ta bao gồm Malaysia, Indonesia, Thái Lan và Việt Nam. Mặc dù mỗi quốc gia có ngôn ngữ và văn hóa riêng biệt, chúng ta chia sẻ nhiều điểm tương đồng về ẩm thực, khí hậu và lịch sử. Mối quan hệ bền chặt với các nước láng giềng là điều cần thiết cho sự ổn định và thịnh vượng của khu vực."
  },
  'sg_g4_u05': {
    text: "The choices we make are guided by our values. Integrity means doing the right thing, even when no one is watching. When Ali found a wallet on the MRT train, he did not keep the money; he handed it to the station master. His choice was guided by honesty. Courage, respect, and responsibility are other core values taught in Character and Citizenship Education, helping students grow into ethical and dependable adults.",
    textVi: "Những lựa chọn của chúng ta được dẫn dắt bởi các giá trị của chúng ta. Chính trực nghĩa là làm điều đúng đắn, ngay cả khi không có ai đang quan sát. Khi Ali nhặt được một chiếc ví trên tàu điện ngầm, cậu ấy đã không giữ lại số tiền; cậu đã giao nó cho trưởng ga. Lựa chọn của cậu được dẫn dắt bởi sự trung thực. Dũng cảm, tôn trọng và trách nhiệm là những giá trị cốt lõi khác được dạy trong môn Giáo dục Công dân và Đạo đức, giúp học sinh phát triển thành những người lớn có đạo đức và đáng tin cậy."
  },
  'sg_g4_u06': {
    text: "Inspiring people are those who overcome great odds to achieve their goals and help others. Yip Pin Xiu, a Singaporean swimmer with muscular dystrophy, won multiple Paralympic gold medals through sheer grit and determination. Despite losing her physical strength over time, she never gave up on her passion for swimming. Her story teaches us that resilience and a positive mindset can conquer the most difficult physical limitations.",
    textVi: "Những người truyền cảm hứng là những người vượt qua những nghịch cảnh lớn lao để đạt được mục tiêu và giúp đỡ người khác. Yip Pin Xiu, một vận động viên bơi lội người Singapore mắc chứng loạn dưỡng cơ, đã giành được nhiều huy chương vàng Paralympic thông qua lòng can đảm và sự quyết tâm tuyệt đối. Bất chấp việc mất đi sức mạnh thể chất theo thời gian, cô không bao giờ từ bỏ niềm đam mê bơi lội của mình. Câu chuyện của cô dạy chúng ta rằng sự kiên cường và tư duy tích cực có thể chinh phục những hạn chế về thể chất khó khăn nhất."
  },
  'sg_g5_u01': {
    text: "Global connections are vital for Singapore's survival. We are a global hub for aviation, finance, and trade. Changi Airport connects us to over a hundred countries, while our seaport handles thousands of shipping containers daily. Because we have no natural resources, we depend on these global connections to import food and export our manufactured goods. Being globally connected also means we must understand international affairs and appreciate diverse worldviews.",
    textVi: "Kết nối toàn cầu là yếu tố sống còn đối với sự tồn tại của Singapore. Chúng ta là trung tâm toàn cầu về hàng không, tài chính và thương mại. Sân bay Changi kết nối chúng ta với hơn một trăm quốc gia, trong khi cảng biển của chúng ta xử lý hàng ngàn container hàng hóa mỗi ngày. Vì không có tài nguyên thiên nhiên, chúng ta phụ thuộc vào những kết nối toàn cầu này để nhập khẩu thực phẩm và xuất khẩu hàng hóa sản xuất của mình. Kết nối toàn cầu cũng có nghĩa là chúng ta phải hiểu các vấn đề quốc tế và trân trọng các thế giới quan đa dạng."
  },
  'sg_g5_u02': {
    text: "Science and technology drive Singapore's progress toward becoming a Smart Nation. From driverless buses tested in university campuses to robotic cleaners in shopping malls, technology improves efficiency and addresses our manpower shortage. In healthcare, wearable devices monitor patients' vital signs remotely. Embracing STEM (Science, Technology, Engineering, and Mathematics) education prepares students to innovate and solve the complex problems of the 21st century.",
    textVi: "Khoa học và công nghệ thúc đẩy sự tiến bộ của Singapore để trở thành một Quốc gia Thông minh. Từ xe buýt không người lái được thử nghiệm trong khuôn viên trường đại học đến rô-bốt dọn dẹp trong các trung tâm mua sắm, công nghệ cải thiện hiệu quả và giải quyết tình trạng thiếu nhân lực của chúng ta. Trong chăm sóc sức khỏe, các thiết bị đeo theo dõi các dấu hiệu sinh tồn của bệnh nhân từ xa. Việc nắm bắt giáo dục STEM (Khoa học, Công nghệ, Kỹ thuật và Toán học) chuẩn bị cho học sinh khả năng đổi mới và giải quyết các vấn đề phức tạp của thế kỷ 21."
  },
  'sg_g5_u03': {
    text: "Literary appreciation involves reading closely to understand the deeper meanings in a text. When reading a poem about a storm, we notice how the poet uses similes, comparing the thunder to a roaring lion, to create a vivid image. Analyzing literature improves our empathy by letting us experience life through the eyes of characters from different times and places. A well-written story can challenge our assumptions and broaden our understanding of human nature.",
    textVi: "Cảm thụ văn học liên quan đến việc đọc kỹ để hiểu những ý nghĩa sâu sắc hơn trong một văn bản. Khi đọc một bài thơ về cơn bão, chúng ta nhận thấy cách nhà thơ sử dụng phép so sánh, so sánh tiếng sấm với một con sư tử gầm rống, để tạo ra một hình ảnh sống động. Phân tích văn học cải thiện sự đồng cảm của chúng ta bằng cách cho phép chúng ta trải nghiệm cuộc sống qua con mắt của các nhân vật từ những thời điểm và địa điểm khác nhau. Một câu chuyện được viết tốt có thể thách thức những giả định của chúng ta và mở rộng sự hiểu biết của chúng ta về bản chất con người."
  },
  'sg_g5_u04': {
    text: "Multicultural harmony is the foundation of Singapore's social fabric. We celebrate Racial Harmony Day every July 21st to commemorate the communal riots of 1964 and to remind ourselves that peace must never be taken for granted. Living in HDB flats with quotas for different ethnic groups ensures that we interact with neighbors of various backgrounds daily. True harmony goes beyond tolerance; it requires deep mutual respect and active understanding of each other's beliefs.",
    textVi: "Hòa hợp đa văn hóa là nền tảng của cấu trúc xã hội Singapore. Chúng ta kỷ niệm Ngày Hòa hợp Sắc tộc vào ngày 21 tháng 7 hàng năm để tưởng nhớ các cuộc bạo loạn cộng đồng năm 1964 và để nhắc nhở bản thân rằng hòa bình không bao giờ là điều hiển nhiên. Việc sống trong các căn hộ HDB với hạn ngạch cho các nhóm dân tộc khác nhau đảm bảo rằng chúng ta tương tác với những người hàng xóm có nguồn gốc khác nhau hàng ngày. Sự hòa hợp thực sự vượt xa sự khoan dung; nó đòi hỏi sự tôn trọng sâu sắc lẫn nhau và sự chủ động tìm hiểu tín ngưỡng của nhau."
  },
  'sg_g5_u05': {
    text: "Critical thinking is the ability to analyze information objectively and make reasoned judgments. In an era of fake news and digital misinformation, we cannot believe everything we read online. Critical thinkers ask questions: Who wrote this? What is their motive? Is the evidence reliable? When discussing a controversial topic like banning single-use plastics, a critical thinker weighs the environmental benefits against the economic costs before forming a well-reasoned opinion.",
    textVi: "Tư duy phản biện là khả năng phân tích thông tin một cách khách quan và đưa ra những đánh giá có lý. Trong kỷ nguyên của tin giả và thông tin sai lệch kỹ thuật số, chúng ta không thể tin mọi thứ mình đọc trên mạng. Những người có tư duy phản biện đặt câu hỏi: Ai đã viết điều này? Động cơ của họ là gì? Bằng chứng có đáng tin cậy không? Khi thảo luận về một chủ đề gây tranh cãi như cấm đồ nhựa dùng một lần, một người có tư duy phản biện sẽ cân nhắc những lợi ích môi trường với các chi phí kinh tế trước khi hình thành một quan điểm có lý lẽ."
  },
  'sg_g5_u06': {
    text: "Being Future Ready means equipping ourselves with the skills and mindset to adapt to a rapidly changing world. The jobs of tomorrow may not even exist today. Therefore, lifelong learning, adaptability, and emotional intelligence are more valuable than memorizing facts. The SkillsFuture initiative encourages Singaporeans of all ages to continually upgrade their abilities. To thrive in the future, we must remain curious, resilient, and open to continuous self-improvement.",
    textVi: "Sẵn sàng cho Tương lai có nghĩa là trang bị cho bản thân những kỹ năng và tư duy để thích ứng với một thế giới đang thay đổi nhanh chóng. Những công việc của ngày mai thậm chí có thể chưa tồn tại ngày hôm nay. Do đó, việc học tập suốt đời, khả năng thích ứng và trí tuệ cảm xúc có giá trị hơn là ghi nhớ các sự kiện. Sáng kiến SkillsFuture khuyến khích người dân Singapore ở mọi lứa tuổi không ngừng nâng cao khả năng của mình. Để phát triển trong tương lai, chúng ta phải luôn tò mò, kiên cường và cởi mở với việc không ngừng hoàn thiện bản thân."
  },
  'ca_g1_u01': {
    text: "All about me! Every child is unique and special. We all have different talents, interests, and appearances. Some of us are tall, some are short. Some like to draw, others like to run. Recognizing what makes us special helps build our self-esteem. When we share things about ourselves with our classmates, we learn to appreciate the wonderful differences that make our classroom a colorful and interesting place to learn.",
    textVi: "Tất cả về tôi! Mỗi đứa trẻ đều độc đáo và đặc biệt. Tất cả chúng ta đều có những tài năng, sở thích và ngoại hình khác nhau. Một số người trong chúng ta cao, một số người thấp. Một số thích vẽ, những người khác thích chạy. Việc nhận ra điều gì làm cho chúng ta trở nên đặc biệt giúp xây dựng lòng tự trọng của chúng ta. Khi chúng ta chia sẻ những điều về bản thân với các bạn cùng lớp, chúng ta học cách trân trọng những sự khác biệt tuyệt vời làm cho lớp học của chúng ta trở thành một nơi đầy màu sắc và thú vị để học tập."
  },
  'ca_g1_u02': {
    text: "Family traditions are special activities that families do together repeatedly. In Canada, many families celebrate Thanksgiving in October by having a big dinner with turkey and giving thanks for the harvest. Other traditions might include a special Sunday pancake breakfast, an annual camping trip to a provincial park, or celebrating cultural festivals like Diwali or Lunar New Year. Traditions create strong family bonds and give us happy memories to cherish.",
    textVi: "Truyền thống gia đình là những hoạt động đặc biệt mà các gia đình làm cùng nhau lặp đi lặp lại. Ở Canada, nhiều gia đình tổ chức Lễ Tạ ơn vào tháng 10 bằng cách có một bữa tối thịnh soạn với gà tây và tạ ơn vì vụ thu hoạch. Những truyền thống khác có thể bao gồm bữa sáng với bánh pancake đặc biệt vào Chủ nhật, chuyến cắm trại hàng năm đến công viên tỉnh, hoặc kỷ niệm các lễ hội văn hóa như Diwali hay Tết Nguyên Đán. Các truyền thống tạo ra những mối quan hệ gia đình bền chặt và mang lại cho chúng ta những kỷ niệm hạnh phúc để trân trọng."
  },
  'ca_g1_u03': {
    text: "Canadian animals are fascinating and adapted to live in our vast environments. The beaver is Canada's national animal; it has sharp teeth to cut down trees and build dams. The moose is the largest member of the deer family and can be found in our boreal forests. In the Arctic, polar bears have thick white fur to stay warm on the ice. Learning about these native animals teaches us to respect and protect wildlife habitats.",
    textVi: "Động vật Canada rất hấp dẫn và thích nghi để sống trong môi trường rộng lớn của chúng ta. Hải ly là động vật quốc gia của Canada; nó có hàm răng sắc nhọn để đốn cây và xây đập. Nai sừng tấm là thành viên lớn nhất của họ hươu nai và có thể được tìm thấy trong các khu rừng taiga của chúng ta. Ở Bắc Cực, gấu Bắc Cực có bộ lông dày màu trắng để giữ ấm trên băng. Việc tìm hiểu về những loài động vật bản địa này dạy chúng ta cách tôn trọng và bảo vệ môi trường sống của động vật hoang dã."
  },
  'ca_g1_u04': {
    text: "Seasons in Canada bring distinct changes to our landscape and activities. Winter is cold and snowy, perfect for ice skating and building snowmen. Spring brings warmer weather, melting snow, and blooming tulips. Summer is hot, and many Canadians spend time swimming in lakes or camping. Autumn turns the maple leaves brilliant shades of red, orange, and yellow before they fall. Experiencing the four seasons teaches us about the cycles of nature.",
    textVi: "Các mùa ở Canada mang lại những thay đổi rõ rệt cho cảnh quan và các hoạt động của chúng ta. Mùa đông lạnh và có tuyết, hoàn hảo để trượt băng và đắp người tuyết. Mùa xuân mang lại thời tiết ấm hơn, tuyết tan và hoa tulip nở rộ. Mùa hè nóng nực, và nhiều người Canada dành thời gian bơi lội ở các hồ hoặc đi cắm trại. Mùa thu biến những chiếc lá phong thành những sắc đỏ, cam và vàng rực rỡ trước khi chúng rụng. Việc trải nghiệm bốn mùa dạy chúng ta về các chu kỳ của tự nhiên."
  },
  'ca_g1_u05': {
    text: "Community helpers are the people who make our neighborhoods safe and clean. Paramedics drive ambulances to help people who are sick or hurt. Garbage collectors keep our streets clean by taking away waste and recycling. Librarians help us find great books to read. Dentists check our teeth to keep our smiles healthy. We are thankful for all the community helpers who work hard every day to provide important services to us.",
    textVi: "Những người giúp đỡ cộng đồng là những người làm cho các khu phố của chúng ta an toàn và sạch sẽ. Nhân viên y tế lái xe cứu thương để giúp đỡ những người bị bệnh hoặc bị thương. Công nhân vệ sinh giữ cho đường phố của chúng ta sạch sẽ bằng cách mang rác thải và đồ tái chế đi. Thủ thư giúp chúng ta tìm những cuốn sách hay để đọc. Nha sĩ kiểm tra răng của chúng ta để giữ cho nụ cười của chúng ta khỏe mạnh. Chúng ta biết ơn tất cả những người giúp đỡ cộng đồng, những người làm việc chăm chỉ mỗi ngày để cung cấp các dịch vụ quan trọng cho chúng ta."
  },
  'ca_g1_u06': {
    text: "Stories and songs are wonderful ways to learn and use our imagination. Fairy tales often start with 'Once upon a time' and teach us lessons about bravery and kindness. Traditional Canadian folk songs, like 'Land of the Silver Birch', tell us about the beauty of nature. When we listen to a story or sing a song together, we practice listening carefully and join in a shared cultural experience that brings joy to the classroom.",
    textVi: "Những câu chuyện và bài hát là những cách tuyệt vời để học hỏi và sử dụng trí tưởng tượng của chúng ta. Truyện cổ tích thường bắt đầu bằng 'Ngày xửa ngày xưa' và dạy chúng ta những bài học về lòng dũng cảm và sự tử tế. Các bài hát dân ca truyền thống của Canada, như 'Land of the Silver Birch', kể cho chúng ta nghe về vẻ đẹp của thiên nhiên. Khi chúng ta cùng nhau nghe một câu chuyện hoặc hát một bài hát, chúng ta thực hành việc lắng nghe cẩn thận và tham gia vào một trải nghiệm văn hóa chung mang lại niềm vui cho lớp học."
  },
  'ca_g2_u01': {
    text: "Our community is a place where people live, work, and play together. Communities have different features, like residential areas where houses are, commercial areas with shops, and recreational areas like parks and arenas. In Canada, communities can be bustling cities like Toronto or quiet rural towns in the Prairies. Understanding how our community functions helps us appreciate the services provided, like schools, public transit, and community centers, that make life better for everyone.",
    textVi: "Cộng đồng của chúng ta là nơi mọi người cùng sống, làm việc và vui chơi. Các cộng đồng có những đặc điểm khác nhau, như khu dân cư nơi có những ngôi nhà, khu thương mại với các cửa hàng, và khu giải trí như công viên và nhà thi đấu. Ở Canada, các cộng đồng có thể là những thành phố sầm uất như Toronto hoặc những thị trấn nông thôn yên tĩnh ở vùng Đồng bằng. Việc hiểu cách cộng đồng của chúng ta vận hành giúp chúng ta đánh giá cao các dịch vụ được cung cấp, như trường học, phương tiện giao thông công cộng và các trung tâm cộng đồng, làm cho cuộc sống tốt đẹp hơn cho tất cả mọi người."
  },
  'ca_g2_u02': {
    text: "Weather and water are essential to life on Earth. The water cycle shows how water evaporates from oceans, forms clouds, and falls as rain or snow. Canada holds a large portion of the world's freshwater in its millions of lakes, including the Great Lakes. Weather affects our daily choices, like what to wear and what activities we can do. It is important to monitor weather patterns and understand how to conserve our valuable freshwater resources.",
    textVi: "Thời tiết và nước là những yếu tố thiết yếu đối với sự sống trên Trái Đất. Vòng tuần hoàn nước cho thấy cách nước bốc hơi từ các đại dương, tạo thành mây và rơi xuống dưới dạng mưa hoặc tuyết. Canada nắm giữ một phần lớn lượng nước ngọt của thế giới trong hàng triệu hồ nước của mình, bao gồm cả Ngũ Hồ. Thời tiết ảnh hưởng đến những lựa chọn hàng ngày của chúng ta, như mặc gì và có thể tham gia những hoạt động nào. Điều quan trọng là phải theo dõi các kiểu thời tiết và hiểu cách bảo tồn các nguồn tài nguyên nước ngọt quý giá của chúng ta."
  },
  'ca_g2_u03': {
    text: "Canadian heritage is diverse and built upon the contributions of many groups. Indigenous peoples, including First Nations, Inuit, and Métis, have lived on this land for thousands of years and have rich cultural traditions. Later, settlers from France and Britain arrived, followed by immigrants from all over the world. The Canadian flag, with its red maple leaf, is a proud symbol of our nation. Exploring our heritage helps us understand the mosaic of cultures that make up Canada.",
    textVi: "Di sản của Canada rất đa dạng và được xây dựng dựa trên những đóng góp của nhiều nhóm người. Các dân tộc bản địa, bao gồm First Nations, Inuit và Métis, đã sống trên vùng đất này hàng ngàn năm và có truyền thống văn hóa phong phú. Sau đó, những người định cư từ Pháp và Anh đã đến, tiếp theo là những người nhập cư từ khắp nơi trên thế giới. Lá cờ Canada, với chiếc lá phong đỏ, là một biểu tượng đáng tự hào của quốc gia chúng ta. Việc khám phá di sản của chúng ta giúp chúng ta hiểu được bức tranh khảm của các nền văn hóa tạo nên Canada."
  },
  'ca_g2_u04': {
    text: "Healthy choices involve taking care of our bodies and minds. Eating a balanced diet based on Canada's Food Guide ensures we get the right nutrients to grow strong. Physical activity, like playing sports or riding a bike, keeps our hearts healthy. It is also vital to practice good hygiene, like washing hands, to prevent the spread of germs. Making healthy choices every day gives us the energy to learn, play, and feel our best.",
    textVi: "Những lựa chọn lành mạnh liên quan đến việc chăm sóc cơ thể và tâm trí của chúng ta. Việc ăn một chế độ ăn uống cân bằng dựa trên Hướng dẫn Thực phẩm của Canada đảm bảo chúng ta nhận được các chất dinh dưỡng phù hợp để phát triển khỏe mạnh. Hoạt động thể chất, như chơi thể thao hoặc đi xe đạp, giúp trái tim của chúng ta khỏe mạnh. Việc thực hành vệ sinh tốt, như rửa tay, để ngăn ngừa sự lây lan của vi trùng cũng rất quan trọng. Việc đưa ra những lựa chọn lành mạnh mỗi ngày mang lại cho chúng ta năng lượng để học tập, vui chơi và cảm thấy tốt nhất."
  },
  'ca_g2_u05': {
    text: "Plants and growth are fascinating processes to observe. A plant starts as a tiny seed and needs soil, water, and sunlight to germinate and grow. Plants are crucial to our environment because they produce the oxygen we breathe and provide food for humans and animals. In Canada, agriculture is a major industry, growing crops like wheat in Saskatchewan and apples in Nova Scotia. Understanding plant growth teaches us the importance of agriculture and nature conservation.",
    textVi: "Thực vật và sự phát triển là những quá trình hấp dẫn để quan sát. Một cái cây bắt đầu như một hạt giống nhỏ bé và cần đất, nước và ánh sáng mặt trời để nảy mầm và phát triển. Thực vật rất quan trọng đối với môi trường của chúng ta vì chúng sản xuất ra lượng oxy chúng ta hít thở và cung cấp thức ăn cho con người và động vật. Ở Canada, nông nghiệp là một ngành công nghiệp lớn, trồng các loại cây trồng như lúa mì ở Saskatchewan và táo ở Nova Scotia. Việc hiểu biết về sự phát triển của thực vật dạy chúng ta tầm quan trọng của nông nghiệp và bảo tồn thiên nhiên."
  },
  'ca_g2_u06': {
    text: "Celebrations bring communities together to mark special events. Canada Day, on July 1st, is a national holiday celebrating the anniversary of Confederation, usually marked with parades and fireworks. Many communities also celebrate local festivals, like the Calgary Stampede or the Winterlude in Ottawa. These celebrations often feature traditional music, food, and dances. Participating in celebrations helps us build a sense of community identity and share joy with our neighbors.",
    textVi: "Các lễ kỷ niệm mang cộng đồng lại gần nhau để đánh dấu các sự kiện đặc biệt. Ngày Canada, vào ngày 1 tháng 7, là một ngày lễ quốc gia kỷ niệm ngày thành lập Liên bang, thường được đánh dấu bằng các cuộc diễu hành và pháo hoa. Nhiều cộng đồng cũng tổ chức các lễ hội địa phương, như Lễ hội Rodeo Calgary (Calgary Stampede) hoặc Lễ hội Mùa đông (Winterlude) ở Ottawa. Những lễ kỷ niệm này thường có âm nhạc, ẩm thực và các điệu múa truyền thống. Việc tham gia vào các lễ kỷ niệm giúp chúng ta xây dựng ý thức về bản sắc cộng đồng và chia sẻ niềm vui với những người hàng xóm."
  },
  'ca_g3_u01': {
    text: "Early communities in Canada were shaped by the environment and the people who lived there. Indigenous peoples had well-established, complex societies long before European contact, living in harmony with the land. When French and British settlers arrived, they established communities based on the fur trade and farming. These early interactions, though sometimes fraught with conflict, laid the groundwork for the diverse nation we know today. Understanding these early communities helps us appreciate the history of our country.",
    textVi: "Các cộng đồng sơ khai ở Canada được định hình bởi môi trường và những người sống ở đó. Các dân tộc bản địa đã có những xã hội phức tạp, lâu đời trước khi tiếp xúc với người châu Âu, sống hài hòa với đất đai. Khi những người định cư Pháp và Anh đến, họ đã thành lập các cộng đồng dựa trên buôn bán lông thú và nông nghiệp. Những tương tác ban đầu này, dù đôi khi có xung đột, đã đặt nền móng cho một quốc gia đa dạng mà chúng ta biết ngày nay. Việc hiểu về những cộng đồng sơ khai này giúp chúng ta trân trọng lịch sử đất nước mình."
  },
  'ca_g3_u02': {
    text: "Urban and rural life in Canada offer different experiences but are deeply connected. Urban areas, like Vancouver and Montreal, are densely populated with skyscrapers, diverse cultural neighborhoods, and extensive public transit. Rural areas have smaller populations and are often centered around agriculture or natural resource extraction. Rural communities supply food and materials to the cities, while cities provide specialized services and markets. Both urban and rural areas are vital to Canada's economy.",
    textVi: "Cuộc sống thành thị và nông thôn ở Canada mang đến những trải nghiệm khác nhau nhưng lại kết nối sâu sắc với nhau. Các khu vực thành thị, như Vancouver và Montreal, đông dân cư với các tòa nhà chọc trời, các khu phố văn hóa đa dạng và phương tiện giao thông công cộng rộng khắp. Các khu vực nông thôn có dân số ít hơn và thường tập trung vào nông nghiệp hoặc khai thác tài nguyên thiên nhiên. Các cộng đồng nông thôn cung cấp thực phẩm và vật liệu cho các thành phố, trong khi các thành phố cung cấp các dịch vụ và thị trường chuyên biệt. Cả khu vực thành thị và nông thôn đều quan trọng đối với nền kinh tế Canada."
  },
  'ca_g3_u03': {
    text: "Natural resources are materials found in nature that humans use. Canada is rich in natural resources, including vast forests for timber, minerals like gold and nickel, and abundant freshwater for hydroelectric power. The fishing industry on both the Atlantic and Pacific coasts has been historically significant. However, the extraction of these resources must be managed carefully to ensure they are sustainable and to protect the environment for future generations.",
    textVi: "Tài nguyên thiên nhiên là những vật liệu được tìm thấy trong tự nhiên mà con người sử dụng. Canada rất giàu tài nguyên thiên nhiên, bao gồm các khu rừng rộng lớn để lấy gỗ, khoáng sản như vàng và niken, và nguồn nước ngọt dồi dào cho thủy điện. Ngành công nghiệp đánh cá trên cả bờ biển Đại Tây Dương và Thái Bình Dương đã có ý nghĩa lịch sử quan trọng. Tuy nhiên, việc khai thác các nguồn tài nguyên này phải được quản lý cẩn thận để đảm bảo tính bền vững và bảo vệ môi trường cho các thế hệ tương lai."
  },
  'ca_g3_u04': {
    text: "Pioneers and settlers faced many challenges when they arrived in Canada. They had to clear dense forests to build log cabins and plant crops, often using basic hand tools. The harsh Canadian winters required careful preparation, including storing enough food and firewood. They relied heavily on the knowledge and assistance of Indigenous peoples to survive. The resilience and hard work of these early settlers helped build the agricultural foundations of the country.",
    textVi: "Những người tiên phong và những người định cư đã phải đối mặt với nhiều thách thức khi đến Canada. Họ phải dọn sạch những khu rừng rậm rạp để xây dựng các ngôi nhà bằng gỗ và trồng trọt, thường sử dụng các công cụ cầm tay cơ bản. Mùa đông khắc nghiệt của Canada đòi hỏi sự chuẩn bị cẩn thận, bao gồm dự trữ đủ thức ăn và củi. Họ phụ thuộc nhiều vào kiến thức và sự trợ giúp của các dân tộc bản địa để tồn tại. Sự kiên cường và làm việc chăm chỉ của những người định cư ban đầu này đã giúp xây dựng nền tảng nông nghiệp của đất nước."
  },
  'ca_g3_u05': {
    text: "Ecosystems and habitats are areas where plants, animals, and non-living things interact. Canada has diverse ecosystems, from the Arctic tundra in the north, where polar bears and Arctic foxes live, to the temperate rainforests of British Columbia, home to the Spirit Bear. Changes to a habitat, such as pollution or deforestation, can disrupt the balance and threaten the survival of the species living there. Protecting ecosystems is essential for maintaining biodiversity.",
    textVi: "Hệ sinh thái và môi trường sống là những khu vực nơi thực vật, động vật và các vật vô sinh tương tác với nhau. Canada có các hệ sinh thái đa dạng, từ vùng lãnh nguyên Bắc Cực ở phía bắc, nơi gấu Bắc Cực và cáo Bắc Cực sinh sống, đến các khu rừng mưa ôn đới ở British Columbia, quê hương của loài Gấu Thần (Spirit Bear). Những thay đổi đối với môi trường sống, chẳng hạn như ô nhiễm hoặc phá rừng, có thể phá vỡ sự cân bằng và đe dọa sự sống còn của các loài sống ở đó. Việc bảo vệ các hệ sinh thái là điều cần thiết để duy trì sự đa dạng sinh học."
  },
  'ca_g3_u06': {
    text: "Local government plays a crucial role in our daily lives. Municipal governments, led by a mayor and councilors, are responsible for services like garbage collection, local parks, public transit, and libraries. Citizens can participate in local government by attending town hall meetings, voting in municipal elections, and voicing their concerns. Understanding how local government works helps us be active and responsible members of our community.",
    textVi: "Chính quyền địa phương đóng một vai trò quan trọng trong cuộc sống hàng ngày của chúng ta. Chính quyền thành phố, do một thị trưởng và các ủy viên hội đồng đứng đầu, chịu trách nhiệm về các dịch vụ như thu gom rác thải, công viên địa phương, phương tiện giao thông công cộng và thư viện. Công dân có thể tham gia vào chính quyền địa phương bằng cách tham dự các cuộc họp tại tòa thị chính, bỏ phiếu trong các cuộc bầu cử thành phố và lên tiếng về những mối quan tâm của họ. Việc hiểu cách chính quyền địa phương hoạt động giúp chúng ta trở thành những thành viên tích cực và có trách nhiệm của cộng đồng."
  },
  'ca_g4_u01': {
    text: "Physical regions of Canada divide our vast country into areas with similar geographical features. The Canadian Shield, a large area of exposed Precambrian rock, is rich in minerals and covers much of central and eastern Canada. The Interior Plains are flat and fertile, making them ideal for farming. The Cordillera region in the west is known for its towering mountain ranges. Each region's unique geography influences the industries, lifestyle, and culture of the people who live there.",
    textVi: "Các vùng địa lý của Canada chia đất nước rộng lớn của chúng ta thành những khu vực có những đặc điểm địa lý tương tự nhau. Khiên Canada (Canadian Shield), một khu vực rộng lớn của đá Tiền Cambri lộ thiên, rất giàu khoáng sản và bao phủ phần lớn miền trung và miền đông Canada. Vùng Đồng bằng Nội địa (Interior Plains) bằng phẳng và màu mỡ, khiến chúng trở nên lý tưởng cho nông nghiệp. Vùng Cordillera ở phía tây được biết đến với những dãy núi cao chót vót. Vị trí địa lý độc đáo của mỗi vùng ảnh hưởng đến các ngành công nghiệp, lối sống và văn hóa của những người sống ở đó."
  },
  'ca_g4_u02': {
    text: "Early societies made significant contributions to human history. Ancient civilizations, such as those in Mesopotamia, Egypt, and the Indus Valley, developed writing systems, agriculture, and complex architecture. They built monumental structures like the pyramids and developed early forms of government and law. By studying these early societies, we can trace the origins of many modern technologies and social structures, understanding how human ingenuity has evolved over millennia.",
    textVi: "Các xã hội sơ khai đã có những đóng góp đáng kể cho lịch sử nhân loại. Các nền văn minh cổ đại, chẳng hạn như ở Lưỡng Hà, Ai Cập và Thung lũng sông Ấn, đã phát triển các hệ thống chữ viết, nông nghiệp và kiến trúc phức tạp. Họ đã xây dựng các cấu trúc hoành tráng như kim tự tháp và phát triển các hình thức chính phủ và luật pháp sơ khai. Bằng cách nghiên cứu các xã hội sơ khai này, chúng ta có thể truy nguyên nguồn gốc của nhiều công nghệ và cấu trúc xã hội hiện đại, hiểu được sự khéo léo của con người đã tiến hóa như thế nào qua hàng thiên niên kỷ."
  },
  'ca_g4_u03': {
    text: "Energy and conservation are critical topics for Canada's future. We rely on various energy sources to heat our homes, power our vehicles, and run our industries. While fossil fuels like oil and gas are widely used, they contribute to climate change. Canada is increasingly investing in renewable energy sources like wind, solar, and hydroelectric power. Conserving energy by turning off lights, improving home insulation, and using energy-efficient appliances is essential for reducing our environmental impact.",
    textVi: "Năng lượng và bảo tồn là những chủ đề quan trọng cho tương lai của Canada. Chúng ta dựa vào các nguồn năng lượng khác nhau để sưởi ấm nhà cửa, cung cấp năng lượng cho các phương tiện và vận hành các ngành công nghiệp. Mặc dù nhiên liệu hóa thạch như dầu mỏ và khí đốt được sử dụng rộng rãi, nhưng chúng góp phần gây ra biến đổi khí hậu. Canada đang ngày càng đầu tư vào các nguồn năng lượng tái tạo như năng lượng gió, năng lượng mặt trời và thủy điện. Việc bảo tồn năng lượng bằng cách tắt đèn, cải thiện lớp cách nhiệt trong nhà và sử dụng các thiết bị tiết kiệm năng lượng là điều cần thiết để giảm thiểu tác động đến môi trường của chúng ta."
  },
  'ca_g4_u04': {
    text: "Provincial government responsibilities affect many aspects of our lives. In Canada, each province and territory has its own government, led by a Premier. Provincial governments are responsible for areas such as education, healthcare, and natural resources. For example, they decide the curriculum taught in schools and fund hospitals. Understanding the division of powers between the federal, provincial, and municipal governments is a key part of understanding Canadian federalism.",
    textVi: "Trách nhiệm của chính quyền tỉnh bang ảnh hưởng đến nhiều khía cạnh trong cuộc sống của chúng ta. Ở Canada, mỗi tỉnh bang và vùng lãnh thổ đều có chính quyền riêng, do một Thủ hiến đứng đầu. Chính quyền tỉnh bang chịu trách nhiệm về các lĩnh vực như giáo dục, chăm sóc sức khỏe và tài nguyên thiên nhiên. Ví dụ, họ quyết định chương trình giảng dạy ở các trường học và tài trợ cho các bệnh viện. Việc hiểu sự phân chia quyền lực giữa chính quyền liên bang, tỉnh bang và thành phố là một phần quan trọng để hiểu được chế độ liên bang của Canada."
  },
  'ca_g4_u05': {
    text: "Canadian industries are diverse and drive the nation's economy. The primary sector involves extracting natural resources, such as logging, mining, and fishing. The secondary sector involves manufacturing, such as producing cars in Ontario or processing food. The tertiary sector involves providing services, like banking, retail, and tourism. The Canadian economy is highly interconnected with the global market, relying heavily on international trade, particularly with the United States.",
    textVi: "Các ngành công nghiệp Canada rất đa dạng và thúc đẩy nền kinh tế của quốc gia. Khu vực sơ cấp liên quan đến việc khai thác tài nguyên thiên nhiên, chẳng hạn như khai thác gỗ, khai thác mỏ và đánh bắt cá. Khu vực thứ cấp liên quan đến sản xuất, chẳng hạn như sản xuất ô tô ở Ontario hoặc chế biến thực phẩm. Khu vực thứ ba liên quan đến việc cung cấp dịch vụ, như ngân hàng, bán lẻ và du lịch. Nền kinh tế Canada có tính kết nối cao với thị trường toàn cầu, phụ thuộc nhiều vào thương mại quốc tế, đặc biệt là với Hoa Kỳ."
  },
  'ca_g4_u06': {
    text: "Light and sound are forms of energy that travel in waves. Light waves can reflect off surfaces, like a mirror, or refract when passing through different materials, like a prism. Sound is created by vibrations and requires a medium, like air or water, to travel through. We use our eyes and ears to perceive these energies. Understanding the properties of light and sound helps us design technologies like lenses, microphones, and musical instruments.",
    textVi: "Ánh sáng và âm thanh là những dạng năng lượng di chuyển theo sóng. Sóng ánh sáng có thể phản xạ lại từ các bề mặt, giống như gương, hoặc khúc xạ khi đi qua các vật liệu khác nhau, giống như lăng kính. Âm thanh được tạo ra bởi các rung động và cần một môi trường, như không khí hoặc nước, để di chuyển qua. Chúng ta sử dụng mắt và tai để cảm nhận những năng lượng này. Việc hiểu các đặc tính của ánh sáng và âm thanh giúp chúng ta thiết kế các công nghệ như thấu kính, micrô và các nhạc cụ."
  },
  'ca_g5_u01': {
    text: "The human body is a complex and interconnected system. The circulatory system, with the heart pumping blood, delivers oxygen and nutrients to cells. The respiratory system allows us to breathe, taking in oxygen and expelling carbon dioxide. The digestive system breaks down food for energy. Understanding how these systems work together helps us make informed choices about nutrition, exercise, and healthy habits to keep our bodies functioning optimally.",
    textVi: "Cơ thể con người là một hệ thống phức tạp và kết nối với nhau. Hệ tuần hoàn, với trái tim bơm máu, cung cấp oxy và các chất dinh dưỡng cho các tế bào. Hệ hô hấp cho phép chúng ta thở, lấy oxy vào và thải carbon dioxide ra. Hệ tiêu hóa phân hủy thức ăn để tạo năng lượng. Việc hiểu cách các hệ thống này làm việc cùng nhau giúp chúng ta đưa ra những lựa chọn sáng suốt về dinh dưỡng, tập thể dục và những thói quen lành mạnh để giữ cho cơ thể hoạt động tối ưu."
  },
  'ca_g5_u02': {
    text: "First Nations and European explorers had complex interactions that shaped Canada's history. When European explorers arrived, seeking new trade routes to Asia, they encountered diverse First Nations societies. These initial contacts led to the fur trade, which created both alliances and conflicts. European diseases, to which Indigenous peoples had no immunity, caused devastating population losses. Studying this era requires looking at historical events from multiple perspectives to understand the lasting impacts of colonization.",
    textVi: "First Nations và những nhà thám hiểm châu Âu đã có những tương tác phức tạp định hình nên lịch sử Canada. Khi những nhà thám hiểm châu Âu đến, tìm kiếm các tuyến đường thương mại mới đến châu Á, họ đã gặp các xã hội đa dạng của First Nations. Những cuộc tiếp xúc ban đầu này đã dẫn đến buôn bán lông thú, tạo ra cả những liên minh và xung đột. Các căn bệnh châu Âu, mà các dân tộc bản địa không có khả năng miễn dịch, đã gây ra những tổn thất dân số tàn khốc. Việc nghiên cứu thời đại này đòi hỏi phải nhìn vào các sự kiện lịch sử từ nhiều góc độ để hiểu những tác động lâu dài của quá trình thực dân hóa."
  },
  'ca_g5_u03': {
    text: "Government structure in Canada is a parliamentary democracy and a constitutional monarchy. At the federal level, Parliament consists of the Monarch (represented by the Governor General), the Senate, and the House of Commons. Members of Parliament are elected to represent their constituencies. The Prime Minister, usually the leader of the party with the most seats, heads the government. This system is designed to ensure that laws are debated and passed democratically.",
    textVi: "Cơ cấu chính phủ ở Canada là một nền dân chủ đại nghị và chế độ quân chủ lập hiến. Ở cấp liên bang, Quốc hội bao gồm Quốc vương (do Toàn quyền đại diện), Thượng viện và Hạ viện. Các Thành viên Quốc hội được bầu ra để đại diện cho khu vực bầu cử của họ. Thủ tướng, thường là nhà lãnh đạo của đảng có nhiều ghế nhất, đứng đầu chính phủ. Hệ thống này được thiết kế để đảm bảo rằng luật pháp được tranh luận và thông qua một cách dân chủ."
  },
  'ca_g5_u04': {
    text: "Properties of and changes in matter are fundamental concepts in chemistry. Matter can exist in three main states: solid, liquid, and gas. A physical change, like melting ice, changes the state but not the substance itself. A chemical change, like rusting iron or baking a cake, creates a new substance with different properties. Understanding these changes is crucial for everything from cooking to developing new materials and understanding environmental processes.",
    textVi: "Các đặc tính và những thay đổi trong vật chất là những khái niệm cơ bản trong hóa học. Vật chất có thể tồn tại ở ba trạng thái chính: rắn, lỏng và khí. Một sự thay đổi vật lý, giống như băng tan, thay đổi trạng thái nhưng không thay đổi bản thân chất đó. Một sự thay đổi hóa học, giống như sắt rỉ sét hoặc nướng bánh, tạo ra một chất mới với các đặc tính khác nhau. Việc hiểu những thay đổi này là rất quan trọng cho mọi thứ, từ nấu ăn đến phát triển các vật liệu mới và hiểu các quá trình môi trường."
  },
  'ca_g5_u05': {
    text: "Citizenship and civic participation are about more than just voting. It means being an active and responsible member of the community. Citizens can participate by volunteering for local organizations, staying informed about current events, advocating for social justice, and respecting the rights and diversity of others. In Canada, the Charter of Rights and Freedoms guarantees fundamental freedoms, but upholding a democratic society requires the active engagement of all its citizens.",
    textVi: "Quyền công dân và sự tham gia vào dân sự không chỉ đơn thuần là việc bỏ phiếu. Nó có nghĩa là trở thành một thành viên tích cực và có trách nhiệm của cộng đồng. Công dân có thể tham gia bằng cách tình nguyện cho các tổ chức địa phương, cập nhật thông tin về các sự kiện hiện tại, vận động cho công lý xã hội, và tôn trọng quyền lợi và sự đa dạng của những người khác. Ở Canada, Hiến chương về Quyền lợi và Tự do đảm bảo các quyền tự do cơ bản, nhưng việc duy trì một xã hội dân chủ đòi hỏi sự tham gia tích cực của tất cả các công dân."
  },
  'ca_g5_u06': {
    text: "Forces acting on structures dictate how buildings and bridges are designed. Structures must withstand internal forces, like tension and compression, and external forces, like wind, snow loads, and earthquakes. Engineers use strong shapes, like triangles, and durable materials to ensure stability. Understanding these forces helps us appreciate the complexity of the built environment and the engineering principles required to keep our infrastructure safe and resilient.",
    textVi: "Các lực tác động lên cấu trúc quyết định cách các tòa nhà và cây cầu được thiết kế. Các cấu trúc phải chịu được các lực bên trong, giống như lực căng và lực nén, và các lực bên ngoài, giống như gió, tải trọng tuyết và động đất. Các kỹ sư sử dụng các hình dạng chắc chắn, như hình tam giác, và các vật liệu bền vững để đảm bảo sự ổn định. Việc hiểu những lực này giúp chúng ta đánh giá cao sự phức tạp của môi trường xây dựng và các nguyên tắc kỹ thuật cần thiết để giữ cho cơ sở hạ tầng của chúng ta an toàn và kiên cố."
  },
};

/**
 * Returns an authentic curriculum passage if mapped, otherwise generates a high-quality 
 * context-aware fallback based on the unit title and vocabulary.
 */
export function getAuthenticReading(unitId: string, title: string, titleVi: string, vocabWords: string[], vocabWordsVi: string[]): AuthenticReading {
  if (AUTHENTIC_PASSAGES[unitId]) {
    return AUTHENTIC_PASSAGES[unitId];
  }

  // Fallback generator for unmapped units that STILL produces unique, relevant content
  const w = (i: number) => vocabWords[i % vocabWords.length] || 'word';
  const wv = (i: number) => vocabWordsVi[i % vocabWordsVi.length] || 'từ';
  
  const text = `Today we are exploring the exciting topic of "${title}". In this lesson, you will learn important words like ${w(0)}, ${w(1)}, and ${w(2)}. When you understand these words, it is easier to read and communicate. Can you think of a sentence using ${w(3)}? Let's dive in and learn more about "${title}" together!`;
  
  const textVi = `Hôm nay chúng ta sẽ khám phá chủ đề thú vị về "${titleVi}". Trong bài học này, bạn sẽ học các từ quan trọng như ${wv(0)}, ${wv(1)}, và ${wv(2)}. Khi bạn hiểu những từ này, việc đọc và giao tiếp sẽ dễ dàng hơn. Bạn có thể nghĩ ra một câu sử dụng từ ${wv(3)} không? Cùng tìm hiểu thêm về "${titleVi}" nhé!`;

  return { text, textVi };
}

/**
 * Returns multi-section content for a unit if available.
 * Falls back to wrapping the single AUTHENTIC_PASSAGES entry as a 1-element array.
 */
export function getUnitSections(unitId: string, title: string, titleVi: string, vocabWords: string[], vocabWordsVi: string[]): AuthenticSection[] {
  // Priority 1: Full multi-section data
  if (AUTHENTIC_UNIT_SECTIONS[unitId]) {
    return AUTHENTIC_UNIT_SECTIONS[unitId];
  }

  // Priority 2: Wrap single passage as a section
  const single = getAuthenticReading(unitId, title, titleVi, vocabWords, vocabWordsVi);
  return [{
    sectionTitle: title,
    sectionTitleVi: titleVi,
    text: single.text,
    textVi: single.textVi,
    type: 'information' as const,
  }];
}
