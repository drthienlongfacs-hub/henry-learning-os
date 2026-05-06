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
    text: "Look at the animals! An elephant is very big. It has a long trunk and big ears. A mouse is small. It has a long tail. A bird can fly in the sky. A fish can swim in the water. What is your favourite animal? Where does it live?",
    textVi: "Hãy nhìn những con vật này! Con voi thì rất to. Nó có cái vòi dài và đôi tai lớn. Con chuột thì nhỏ. Nó có cái đuôi dài. Con chim có thể bay trên trời. Con cá có thể bơi dưới nước. Con vật yêu thích của bạn là gì? Nó sống ở đâu?"
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
    text: "Let's learn our sounds. 'S' is for sun, 's-s-sun'. 'A' is for apple, 'a-a-apple'. 'T' is for tap, 't-t-tap'. 'P' is for pan, 'p-p-pan'. 'I' is for ink, 'i-i-ink'. 'N' is for net, 'n-n-net'. When we put sounds together, we can make words! Can you sound out the word 's-i-t'? It makes 'sit'.",
    textVi: "Cùng học các âm nhé. 'S' cho sun (mặt trời), 's-s-sun'. 'A' cho apple (quả táo), 'a-a-apple'. 'T' cho tap (vòi nước), 't-t-tap'. 'P' cho pan (cái chảo), 'p-p-pan'. 'I' cho ink (mực), 'i-i-ink'. 'N' cho net (cái lưới), 'n-n-net'. Khi ghép các âm lại, ta có thể tạo thành từ! Bạn có thể phát âm từ 's-i-t' không? Nó tạo thành 'sit' (ngồi)."
  },
  'cam_g1_u06': {
    text: "Let's explore nature! Step outside and look at the trees. Trees have brown trunks and green leaves. In autumn, the leaves turn red and yellow and fall to the ground. Look closely at the grass. You might see a small bug or an ant. Nature is everywhere, from the sky above to the dirt below our feet.",
    textVi: "Hãy cùng khám phá thiên nhiên! Bước ra ngoài và nhìn những cái cây. Cây có thân màu nâu và lá màu xanh. Vào mùa thu, lá chuyển sang màu đỏ, vàng và rụng xuống đất. Nhìn kỹ vào bãi cỏ. Bạn có thể thấy một con bọ nhỏ hoặc một con kiến. Thiên nhiên có ở khắp mọi nơi, từ bầu trời trên cao đến lớp đất dưới chân chúng ta."
  },
  'cam_g1_u07': {
    text: "We can read to find out information. Books tell us facts. A fact is something that is true. If you want to know how a plant grows, you can read a book about plants. You will find out that plants need water, sunlight, and soil to grow. What do you want to find out about today?",
    textVi: "Chúng ta có thể đọc để tìm kiếm thông tin. Sách cho chúng ta biết các sự thật. Sự thật là điều có thật. Nếu bạn muốn biết làm thế nào một cái cây lớn lên, bạn có thể đọc một cuốn sách về cây cối. Bạn sẽ biết được rằng cây cần nước, ánh sáng mặt trời và đất để lớn lên. Hôm nay bạn muốn tìm hiểu về điều gì?"
  },
  'cam_g1_u08': {
    text: "We all have stories to share. Yesterday, I went to the zoo with my family. I saw a tall giraffe eating leaves. My little brother laughed at the funny monkeys. It was a happy day. When we share stories, we tell people what happened to us, how we felt, and who was there. What is a story you can share?",
    textVi: "Tất cả chúng ta đều có những câu chuyện để chia sẻ. Hôm qua, tôi đã đi sở thú với gia đình. Tôi thấy một con hươu cao cổ đang ăn lá. Em trai tôi cười đùa với những chú khỉ ngộ nghĩnh. Đó là một ngày vui vẻ. Khi chia sẻ câu chuyện, chúng ta kể cho mọi người biết chuyện gì đã xảy ra, chúng ta cảm thấy thế nào và có ai ở đó. Bạn có câu chuyện nào để chia sẻ không?"
  },
  'cam_g1_u09': {
    text: "Patterns are things that repeat. Look at a zebra. It has a pattern of black and white stripes: black, white, black, white. We also have patterns in our days. On Monday, Tuesday, Wednesday, Thursday, and Friday, we go to school. On Saturday and Sunday, we stay at home. This is the pattern of our week.",
    textVi: "Mẫu hình là những thứ lặp đi lặp lại. Hãy nhìn một con ngựa vằn. Nó có một mẫu hình gồm các sọc đen và trắng: đen, trắng, đen, trắng. Chúng ta cũng có những mẫu hình trong các ngày của mình. Vào Thứ Hai, Thứ Ba, Thứ Tư, Thứ Năm và Thứ Sáu, chúng ta đi học. Vào Thứ Bảy và Chủ Nhật, chúng ta ở nhà. Đây là mẫu hình của tuần chúng ta."
  },

  // ── CAMBRIDGE GRADE 2 ──
  'cam_g2_u01': {
    text: "People all over the world tell stories. Some stories are very old. In India, there is a story about a clever monkey and a crocodile. In Africa, there is a story about Anansi the spider. Stories teach us lessons and make us think. Even though people live in different countries, we all love listening to a good story.",
    textVi: "Mọi người trên khắp thế giới đều kể chuyện. Một số câu chuyện rất cổ xưa. Ở Ấn Độ, có câu chuyện về chú khỉ thông minh và con cá sấu. Ở Châu Phi, có câu chuyện về nhện Anansi. Những câu chuyện dạy cho chúng ta những bài học và làm chúng ta phải suy nghĩ. Mặc dù con người sống ở những quốc gia khác nhau, nhưng tất cả chúng ta đều thích nghe một câu chuyện hay."
  },
  'cam_g2_u02': {
    text: "A poem is a special way of writing. Poems often have rhyming words at the end of the lines. Sometimes poems are funny, and sometimes they are beautiful. 'The gentle wind blows, over the green meadows.' When you read a poem aloud, it can sound like music. Try writing a short poem about your favourite animal!",
    textVi: "Thơ là một cách viết đặc biệt. Các bài thơ thường có các từ có vần ở cuối các dòng. Đôi khi những bài thơ rất hài hước, và đôi khi chúng rất đẹp. 'Cơn gió nhẹ thổi qua, trên những đồng cỏ xanh.' Khi bạn đọc to một bài thơ, nó có thể nghe như âm nhạc. Hãy thử viết một bài thơ ngắn về con vật yêu thích của bạn!"
  },
  'cam_g2_u03': {
    text: "An information text tells us true facts about a topic. It often has headings, pictures, and labels. For example, an information text about penguins will tell you that they live in cold places and that they cannot fly, but they are excellent swimmers. When you read an information text, you learn something new about the real world.",
    textVi: "Văn bản thông tin cho chúng ta biết những sự thật về một chủ đề. Nó thường có các tiêu đề, hình ảnh và nhãn dán. Ví dụ, một văn bản thông tin về chim cánh cụt sẽ cho bạn biết rằng chúng sống ở những nơi lạnh giá và chúng không thể bay, nhưng chúng bơi rất giỏi. Khi bạn đọc một văn bản thông tin, bạn học được điều gì đó mới mẻ về thế giới thực."
  },
  'cam_g2_u04': {
    text: "Traditional tales are stories that have been told for many, many years. Think about Cinderella, Little Red Riding Hood, or The Three Little Pigs. These stories usually have good characters and bad characters. In the end, the good characters usually win. They often start with 'Once upon a time' and end with 'They lived happily ever after.'",
    textVi: "Truyện cổ tích truyền thống là những câu chuyện đã được kể trong rất nhiều năm. Hãy nghĩ về Cô bé Lọ Lem, Cô bé quàng khăn đỏ, hoặc Ba chú heo con. Những câu chuyện này thường có nhân vật tốt và nhân vật xấu. Cuối cùng, các nhân vật tốt thường chiến thắng. Chúng thường bắt đầu bằng 'Ngày xửa ngày xưa' và kết thúc bằng 'Họ sống hạnh phúc mãi mãi về sau.'"
  },
  'cam_g2_u05': {
    text: "Fantasy stories take us to magical worlds. In a fantasy story, animals might talk, children might fly, and dragons might guard treasures. Anything is possible! You might read about a magic tree that takes kids to different lands, or a talking lion who is the king of a magical forest. Fantasy lets our imagination soar.",
    textVi: "Những câu chuyện kỳ ảo đưa chúng ta đến những thế giới phép thuật. Trong một câu chuyện kỳ ảo, động vật có thể nói chuyện, trẻ em có thể bay, và những con rồng có thể canh giữ kho báu. Bất cứ điều gì cũng có thể xảy ra! Bạn có thể đọc về một cái cây ma thuật đưa lũ trẻ đến những vùng đất khác nhau, hoặc một con sư tử biết nói là vua của một khu rừng phép thuật. Câu chuyện kỳ ảo để cho trí tưởng tượng của chúng ta bay cao."
  },
  'cam_g2_u06': {
    text: "How do you make a fruit salad? First, wash the fruit. Next, ask an adult to help you cut the apples, bananas, and grapes. Then, put all the fruit in a big bowl. Finally, mix it together and enjoy! This is called a recipe. A recipe is a set of instructions that tells you how to make something to eat.",
    textVi: "Làm thế nào để bạn làm món salad trái cây? Đầu tiên, rửa trái cây. Tiếp theo, nhờ người lớn giúp bạn cắt táo, chuối và nho. Sau đó, cho tất cả trái cây vào một cái bát lớn. Cuối cùng, trộn đều lên và thưởng thức! Đây được gọi là một công thức nấu ăn. Công thức nấu ăn là một bộ hướng dẫn chỉ cho bạn cách làm ra một thứ gì đó để ăn."
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
