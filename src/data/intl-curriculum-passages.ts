// ══════════════════════════════════════════════════════════════════
// Authentic Curriculum Reading Passages
// Mapped to specific Unit IDs for high-fidelity content delivery
// ══════════════════════════════════════════════════════════════════

export interface AuthenticReading {
  text: string;
  textVi: string;
}

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
