// =====================================================
// Ethics Generator — Đạo đức (L1-5)
// Sources: CT 2018 Đạo đức, CASEL SEL framework
// =====================================================

export interface EthicsProblem {
    id: string;
    question: string;
    correctAnswer: string;
    options: string[];
    explanation: string;
    difficulty: number;
    hints: string[];
    type: 'behavior' | 'emotion';
    gradeLevel: number;
    topic: string;
    topicKey: string;
    illustration?: string;
}

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const genId = () => `ethics-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// ══════════════════════════════════════════════
// Grade 1: Polite Greet (Chào hỏi lễ phép)
// ══════════════════════════════════════════════

const POLITE_QS = [
    { q: 'Khi gặp ông bà, em nên làm gì?', a: 'Khoanh tay và cúi đầu chào', opts: ['Khoanh tay và cúi đầu chào', 'Ngó lơ đi thẳng', 'Vẫy tay chào như bạn bè', 'Chỉ mỉm cười không nói gì'], e: 'Đối với người lớn tuổi như ông bà, em cần khoanh tay, cúi đầu và chào to rõ để thể hiện sự lễ phép.' },
    { q: 'Gặp cô giáo ở cổng trường, em nên nói gì?', a: '"Em chào cô ạ!"', opts: ['"Em chào cô ạ!"', '"Chào cô nha!"', '"Chào!"', 'Không nói gì'], e: 'Với thầy cô, em cần dùng từ ngữ kính trọng và nói đủ câu.' },
    { q: 'Khi bạn bè cùng lớp đến chơi nhà, em sẽ:', a: 'Mỉm cười, vẫy tay và nói "Chào bạn!"', opts: ['Mỉm cười, vẫy tay và nói "Chào bạn!"', 'Khoanh tay cúi đầu', 'Không thèm nhìn', 'Chạy trốn'], e: 'Với bạn bè ngang hàng, em có thể chào hỏi thân thiện, tự nhiên như vẫy tay và mỉm cười.' },
    { q: 'Tại sao chúng ta cần chào hỏi mọi người?', a: 'Để thể hiện sự tôn trọng và thân thiện', opts: ['Để thể hiện sự tôn trọng và thân thiện', 'Vì bị bắt buộc', 'Để xin kẹo', 'Chỉ để cho vui'], e: 'Chào hỏi là cách chúng ta bắt đầu câu chuyện và thể hiện sự tôn trọng với người đối diện.' },
    { q: 'Nếu em đang ăn kẹo mà có khách đến nhà, em nên làm gì?', a: 'Cất kẹo hoặc nuốt xong rồi mới chào', opts: ['Cất kẹo hoặc nuốt xong rồi mới chào', 'Vừa nhai nhóp nhép vừa chào', 'Không chào vì bận ăn', 'Khóc thét lên'], e: 'Vừa ăn vừa nói/chào hỏi là thiếu lịch sự. Hãy nhai xong rồi mới cất tiếng chào.' },
];

export function genPoliteGreet(): EthicsProblem {
    const item = POLITE_QS[rand(0, POLITE_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'behavior', topic: 'Chào hỏi lễ phép', topicKey: 'polite_greet',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Hãy nghĩ về cách em chào người lớn', `Đáp án: ${item.a}`],
        illustration: '/images/core/books_hd.svg',
    };
}

// ══════════════════════════════════════════════
// Grade 2: Express Emotion (Thể hiện cảm xúc)
// ══════════════════════════════════════════════

const EMOTION_QS = [
    { q: 'Khi em bị điểm kém và cảm thấy buồn, em nên làm gì?', a: 'Nói chuyện với bố mẹ hoặc thầy cô', opts: ['Nói chuyện với bố mẹ hoặc thầy cô', 'Xé bài kiểm tra', 'Gắt gỏng với bạn bè', 'Nhốt mình trong phòng khóc'], e: 'Chia sẻ nỗi buồn với người lớn giúp em nhẹ lòng và nhận được lời khuyên tốt.' },
    { q: 'Bạn của em không may làm hỏng đồ chơi của em. Em rất tức giận. Cách xử lý đúng là:', a: 'Hít thở sâu và nói "Tớ đang rất giận"', opts: ['Hít thở sâu và nói "Tớ đang rất giận"', 'Đánh bạn', 'Làm hỏng lại đồ của bạn', 'La hét ầm ĩ'], e: 'Thể hiện sự tức giận bằng lời nói rõ ràng tốt hơn là dùng bạo lực hay đập phá.' },
    { q: 'Khi được nhận một món quà yêu thích, em sẽ:', a: 'Nói lời cảm ơn với vẻ mặt vui vẻ', opts: ['Nói lời cảm ơn với vẻ mặt vui vẻ', 'Cầm lấy và im lặng bỏ đi', 'Chê quà nhỏ', 'Ném món quà đi'], e: 'Biết ơn và thể hiện niềm vui là cách đáp lại tình cảm của người tặng.' },
    { q: 'Bạn Nam bị ngã đau và đang khóc. Em nên làm gì?', a: 'Đến hỏi thăm và đỡ bạn dậy', opts: ['Đến hỏi thăm và đỡ bạn dậy', 'Chỉ tay cười to', 'Bỏ đi chỗ khác', 'Nói "Có thế mà cũng khóc"'], e: 'Đồng cảm và giúp đỡ người khác khi họ gặp chuyện buồn/đau là hành vi tử tế.' },
    { q: 'Nếu em cảm thấy ghen tị khi bạn được khen nhiều hơn, em nên:', a: 'Tự nhủ sẽ cố gắng hơn ở lần sau', opts: ['Tự nhủ sẽ cố gắng hơn ở lần sau', 'Nói xấu bạn', 'Nghỉ chơi với bạn', 'Cãi lại cô giáo'], e: 'Biến sự ghen tị thành động lực để cố gắng sẽ giúp em tiến bộ hơn.' },
];

export function genExpressEmotion(): EthicsProblem {
    const item = EMOTION_QS[rand(0, EMOTION_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'emotion', topic: 'Thể hiện cảm xúc', topicKey: 'express_emotion',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Hãy nghĩ về cách xử lý khi em tức giận hoặc buồn', `Đáp án: ${item.a}`],
        illustration: '/images/core/books_hd.svg',
    };
}

// ══════════════════════════════════════════════
// Grade 3: Honesty (Trung thực)
// ══════════════════════════════════════════════

const HONESTY_QS = [
    { q: 'Bạn Lan nhặt được chiếc bút rất đẹp trên sân trường. Em nghĩ bạn Lan nên làm gì?', a: 'Mang đến lớp trực hoặc thầy cô để tìm chủ nhân', opts: ['Mang đến lớp trực hoặc thầy cô để tìm chủ nhân', 'Giữ lại vì không ai nhìn thấy', 'Cho bạn thân', 'Vứt đi cho rồi'], e: 'Trung thực là trả lại đồ vật cho người mất, dù không ai biết.' },
    { q: 'Em chưa làm bài tập về nhà nhưng cô giáo hỏi. Em nên trả lời thế nào?', a: 'Thưa cô, em chưa làm xong ạ. Em xin lỗi và sẽ hoàn thành.', opts: ['Thưa cô, em chưa làm xong ạ. Em xin lỗi và sẽ hoàn thành.', 'Nói dối là đã làm', 'Nói quên vở ở nhà', 'Im lặng không trả lời'], e: 'Thừa nhận lỗi lầm và cam kết sửa chữa là biểu hiện của sự trung thực.' },
    { q: 'Trong giờ kiểm tra, bạn ngồi cạnh để lộ bài. Em nên:', a: 'Không nhìn bài bạn và tự làm bài của mình', opts: ['Không nhìn bài bạn và tự làm bài của mình', 'Nhìn lén vài câu khó', 'Chép hết bài bạn', 'Bảo bạn che bài rồi đổi bài sau'], e: 'Tự lực làm bài thể hiện sự trung thực trong học tập.' },
    { q: 'Em vô tình làm vỡ bình hoa trong lớp nhưng không ai nhìn thấy. Em nên:', a: 'Tự giác nhận lỗi với cô giáo', opts: ['Tự giác nhận lỗi với cô giáo', 'Giả vờ không biết', 'Đổ lỗi cho bạn khác', 'Dọn dẹp rồi im lặng'], e: 'Dũng cảm nhận lỗi khi sai là hành vi trung thực đáng khen ngợi.' },
    { q: 'Bạn Minh khoe rằng mình đạt điểm 10 nhưng thực tế chỉ được 8. Em nghĩ:', a: 'Khoe điểm sai sự thật là không trung thực', opts: ['Khoe điểm sai sự thật là không trung thực', 'Không sao vì ai cũng muốn được khen', 'Bình thường thôi', 'Nên khoe cao hơn nữa'], e: 'Nói đúng sự thật, kể cả khi kết quả chưa như ý, là biểu hiện của trung thực.' },
];

export function genHonesty(): EthicsProblem {
    const item = HONESTY_QS[rand(0, HONESTY_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'behavior', topic: 'Trung thực', topicKey: 'honesty',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Hãy nghĩ: nếu em là người bị ảnh hưởng, em muốn bạn làm gì?', `Đáp án: ${item.a}`],
    };
}

// ══════════════════════════════════════════════
// Grade 4: Responsibility (Trách nhiệm)
// ══════════════════════════════════════════════

const RESPONSIBILITY_QS = [
    { q: 'Em được phân công trực nhật nhưng hôm đó trời mưa to và em muốn về sớm. Em nên:', a: 'Hoàn thành trực nhật rồi mới về', opts: ['Hoàn thành trực nhật rồi mới về', 'Bỏ về vì trời mưa', 'Nhờ bạn khác làm hộ', 'Nói với cô là bị ốm'], e: 'Trách nhiệm là hoàn thành nhiệm vụ được giao dù gặp khó khăn.' },
    { q: 'Em nuôi một chú cá cảnh. Việc chăm sóc cá hàng ngày thuộc trách nhiệm của ai?', a: 'Của em vì em là người nuôi', opts: ['Của em vì em là người nuôi', 'Của bố mẹ', 'Của ai rảnh thì làm', 'Không cần chăm sóc'], e: 'Khi nhận nuôi thú cưng, em có trách nhiệm chăm sóc chúng mỗi ngày.' },
    { q: 'Nhóm em làm bài tập nhóm, một bạn không chịu làm phần của mình. Em nên:', a: 'Nhắc nhở bạn và phân công lại rõ ràng', opts: ['Nhắc nhở bạn và phân công lại rõ ràng', 'Làm luôn phần của bạn', 'Mặc kệ bạn', 'Mách cô ngay'], e: 'Nhắc nhở bạn hoàn thành phần việc là thể hiện trách nhiệm với nhóm.' },
    { q: 'Em thấy vòi nước trong nhà vệ sinh bị chảy nhưng không phải em mở. Em nên:', a: 'Tắt vòi nước và báo bảo vệ', opts: ['Tắt vòi nước và báo bảo vệ', 'Bỏ đi vì không phải lỗi em', 'Chơi nước', 'Đợi ai đó đến tắt'], e: 'Trách nhiệm với cộng đồng là hành động đúng kể cả khi đó không phải lỗi của mình.' },
    { q: 'Em hứa sẽ giúp mẹ dọn nhà cuối tuần nhưng bạn rủ đi chơi. Em nên:', a: 'Giữ lời hứa với mẹ, hẹn bạn lần khác', opts: ['Giữ lời hứa với mẹ, hẹn bạn lần khác', 'Đi chơi vì bạn quan trọng hơn', 'Nói mẹ cho đi rồi dọn sau', 'Giả vờ bị ốm'], e: 'Giữ lời hứa là biểu hiện quan trọng của trách nhiệm.' },
];

export function genResponsibility(): EthicsProblem {
    const item = RESPONSIBILITY_QS[rand(0, RESPONSIBILITY_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'behavior', topic: 'Trách nhiệm', topicKey: 'responsibility',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Trách nhiệm là hoàn thành việc được giao và giữ lời hứa.', `Đáp án: ${item.a}`],
    };
}

// ══════════════════════════════════════════════
// Grade 5: Community Empathy (Đồng cảm cộng đồng)
// ══════════════════════════════════════════════

const EMPATHY_QS = [
    { q: 'Trường em tổ chức quyên góp ủng hộ bạn vùng lũ. Em có ít tiền tiêu vặt. Em nên:', a: 'Đóng góp phần nhỏ trong khả năng hoặc quyên góp đồ dùng', opts: ['Đóng góp phần nhỏ trong khả năng hoặc quyên góp đồ dùng', 'Không góp vì em cũng ít tiền', 'Chỉ góp khi bị ép', 'Nói bố mẹ góp thay'], e: 'Đồng cảm cộng đồng là chia sẻ trong khả năng, không nhất thiết phải nhiều tiền.' },
    { q: 'Bạn mới chuyển đến lớp, ngồi một mình không ai chơi cùng. Em nên:', a: 'Chủ động đến làm quen và rủ bạn chơi cùng', opts: ['Chủ động đến làm quen và rủ bạn chơi cùng', 'Đợi bạn ấy tự đến nói chuyện', 'Không quan tâm', 'Nói xấu bạn mới với nhóm'], e: 'Chủ động giúp đỡ người mới hòa nhập thể hiện sự đồng cảm và tử tế.' },
    { q: 'Em thấy một bạn khuyết tật bị trêu chọc trên đường đi học. Em nên:', a: 'Can ngăn việc trêu chọc và an ủi bạn', opts: ['Can ngăn việc trêu chọc và an ủi bạn', 'Đi nhanh cho qua', 'Cười theo', 'Quay video'], e: 'Bảo vệ người yếu thế và phản đối sự bất công là biểu hiện cao của đồng cảm.' },
    { q: 'Trong lớp có bạn nhà nghèo không có đủ sách vở. Em có thể làm gì?', a: 'Chia sẻ đồ dùng dư hoặc đề xuất cô giáo tổ chức hỗ trợ', opts: ['Chia sẻ đồ dùng dư hoặc đề xuất cô giáo tổ chức hỗ trợ', 'Không phải việc của em', 'Nói bạn xin bố mẹ mua', 'Chế giễu bạn'], e: 'Chia sẻ và giúp đỡ bạn bè khó khăn là trách nhiệm cộng đồng nhỏ.' },
    { q: 'Bà cụ bán vé số ngồi giữa trưa nắng gần trường em. Em nghĩ thế nào?', a: 'Thương bà và mời bà vào bóng mát nghỉ nếu có thể', opts: ['Thương bà và mời bà vào bóng mát nghỉ nếu có thể', 'Không liên quan đến em', 'Bà ấy quen rồi', 'Tránh xa'], e: 'Quan tâm đến người xung quanh, đặc biệt người cao tuổi, là biểu hiện của lòng nhân ái.' },
];

export function genCommunityEmpathy(): EthicsProblem {
    const item = EMPATHY_QS[rand(0, EMPATHY_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'emotion', topic: 'Đồng cảm cộng đồng', topicKey: 'community_empathy',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Đặt mình vào vị trí của người khác để hiểu họ cần gì.', `Đáp án: ${item.a}`],
    };
}

// ══════════════════════════════════════════════
// Grade 4: Children's Rights (Quyền trẻ em) — UNCRC + CT 2018
// ══════════════════════════════════════════════

const CHILDREN_RIGHTS_QS = [
    { q: 'Trẻ em có quyền gì quan trọng nhất?', a: 'Được bảo vệ, học hành và vui chơi', opts: ['Được bảo vệ, học hành và vui chơi', 'Được mua đồ chơi', 'Được xem TV cả ngày', 'Không có quyền gì'], e: 'Theo Công ước Liên hợp quốc (UNCRC), trẻ em có quyền sống, phát triển, bảo vệ và tham gia.' },
    { q: 'Nếu em thấy bạn bị đánh ở trường, em nên:', a: 'Báo ngay cho thầy cô hoặc người lớn', opts: ['Báo ngay cho thầy cô hoặc người lớn', 'Quay video', 'Bỏ đi', 'Đánh lại giúp bạn'], e: 'Bạo lực học đường vi phạm quyền trẻ em. Báo cho người lớn là cách xử lý đúng.' },
    { q: 'Trẻ em có được phép lao động nặng nhọc không?', a: 'Không, luật cấm lao động trẻ em', opts: ['Không, luật cấm lao động trẻ em', 'Được nếu bố mẹ cho phép', 'Được nếu trả tiền', 'Chỉ được vào cuối tuần'], e: 'Luật Trẻ em Việt Nam nghiêm cấm sử dụng lao động trẻ em.' },
    { q: 'Em có quyền gì khi đến trường?', a: 'Quyền học tập trong môi trường an toàn', opts: ['Quyền học tập trong môi trường an toàn', 'Quyền không làm bài', 'Quyền nghỉ học bất cứ lúc nào', 'Không có quyền'], e: 'Mọi trẻ em đều có quyền được giáo dục trong môi trường lành mạnh.' },
    { q: 'Khi người lạ rủ em đi theo họ, em nên:', a: 'Từ chối và chạy đến chỗ đông người/người lớn tin cậy', opts: ['Từ chối và chạy đến chỗ đông người/người lớn tin cậy', 'Đi theo nếu họ cho quà', 'Lên xe của họ', 'Nghe theo vì họ là người lớn'], e: 'Em có quyền từ chối và bảo vệ bản thân. Luôn nói với bố mẹ/thầy cô.' },
];

export function genChildrenRights(): EthicsProblem {
    const item = CHILDREN_RIGHTS_QS[rand(0, CHILDREN_RIGHTS_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 4, difficulty: 4,
        type: 'behavior', topic: 'Quyền trẻ em', topicKey: 'children_rights',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Trẻ em có quyền được bảo vệ, học hành, và vui chơi', `Đáp án: ${item.a}`],
    };
}

// ══════════════════════════════════════════════
// Grade 5: Internet Safety (An toàn trên mạng) — CT 2018 + UNICEF
// ══════════════════════════════════════════════

const INTERNET_SAFETY_QS = [
    { q: 'Khi chơi game online, có người lạ hỏi địa chỉ nhà em. Em nên:', a: 'Không bao giờ chia sẻ thông tin cá nhân', opts: ['Không bao giờ chia sẻ thông tin cá nhân', 'Cho địa chỉ vì họ thân thiện', 'Hỏi bạn bè rồi cho', 'Cho số điện thoại thay vì địa chỉ'], e: 'KHÔNG BAO GIỜ chia sẻ thông tin cá nhân (tên thật, địa chỉ, trường, SĐT) trên mạng.' },
    { q: 'Em nhận được tin nhắn trúng thưởng trên mạng. Em nên:', a: 'Không nhấp vào link và báo cho bố mẹ', opts: ['Không nhấp vào link và báo cho bố mẹ', 'Nhấp vào ngay để nhận quà', 'Gửi tiếp cho bạn', 'Điền thông tin để nhận thưởng'], e: 'Tin nhắn trúng thưởng online thường là lừa đảo (scam). Luôn hỏi ý kiến bố mẹ.' },
    { q: 'Mỗi ngày em nên dùng máy tính/điện thoại tối đa bao lâu?', a: '1-2 giờ (theo khuyến cáo WHO)', opts: ['1-2 giờ (theo khuyến cáo WHO)', 'Bao lâu cũng được', '5-6 giờ', 'Cả ngày nếu nghỉ'], e: 'WHO khuyến cáo trẻ em dưới 12 tuổi không nên sử dụng màn hình quá 2 giờ/ngày.' },
    { q: 'Khi thấy nội dung bạo lực/sợ hãi trên mạng, em nên:', a: 'Tắt ngay và nói cho bố mẹ biết', opts: ['Tắt ngay và nói cho bố mẹ biết', 'Xem thêm cho hết', 'Gửi cho bạn xem', 'Giữ bí mật'], e: 'Nội dung không phù hợp có thể gây ảnh hưởng tâm lý. Báo cho người lớn ngay.' },
    { q: 'Mật khẩu tốt nên có đặc điểm gì?', a: 'Dài, có cả chữ, số và ký tự đặc biệt', opts: ['Dài, có cả chữ, số và ký tự đặc biệt', 'Tên + ngày sinh', 'Số 123456', 'Giống nhau cho mọi tài khoản'], e: 'Mật khẩu mạnh: ≥8 ký tự, kết hợp chữ HOA/thường + số + ký tự đặc biệt.' },
];

export function genInternetSafety(): EthicsProblem {
    const item = INTERNET_SAFETY_QS[rand(0, INTERNET_SAFETY_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 5, difficulty: 5,
        type: 'behavior', topic: 'An toàn trên mạng', topicKey: 'internet_safety',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Bảo vệ thông tin cá nhân là quan trọng nhất', `Đáp án: ${item.a}`],
    };
}

// ── NEW G1: Yêu thương gia đình — Đạo đức L1 ──
const GIA_DINH_QS = [
    { q: 'Khi bố mẹ đi làm về, em nên:', a: 'Chào bố mẹ vui vẻ', opts: ['Chào bố mẹ vui vẻ', 'Không nói gì', 'Xin tiền ngay', 'Kêu bố mẹ nấu cơm'], e: 'Chào bố mẹ khi đi làm về thể hiện sự yêu thương và lễ phép.' },
    { q: 'Em có thể giúp bố mẹ việc gì?', a: 'Dọn dẹp, xếp quần áo, tưới cây', opts: ['Dọn dẹp, xếp quần áo, tưới cây', 'Không việc nào', 'Chỉ xem TV', 'Đi chơi cả ngày'], e: 'Giúp bố mẹ việc nhà là cách yêu thương và chia sẻ.' },
    { q: 'Khi em bé em khóc, em nên:', a: 'Dỗ dành hoặc gọi bố mẹ', opts: ['Dỗ dành hoặc gọi bố mẹ', 'Khóc theo', 'Bỏ đi', 'La mắng em'], e: 'Anh chị yêu thương em bé, giúp bố mẹ trông nom.' },
    { q: 'Ông bà già yếu, em nên:', a: 'Nói chuyện vui, lễ phép với ông bà', opts: ['Nói chuyện vui, lễ phép với ông bà', 'Tránh xa', 'Không nghe ông bà', 'Chỉ chơi game'], e: 'Kính trọng ông bà là truyền thống tốt đẹp của người Việt.' },
];

export function genYeuThuongGiaDinh(): EthicsProblem {
    const item = GIA_DINH_QS[rand(0, GIA_DINH_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'behavior', topic: 'Yêu thương gia đình', topicKey: 'yeu_thuong_gia_dinh',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Gia đình là nơi yêu thương nhất', `Đáp án: ${item.a}`],
    };
}

// ── NEW G1: Giữ gìn vệ sinh — Đạo đức L1 ──
const GIU_VE_SINH_QS = [
    { q: 'Ăn xong kẹo, em nên bỏ giấy kẹo vào đâu?', a: 'Thùng rác', opts: ['Thùng rác', 'Xuống đất', 'Bàn học', 'Túi bạn'], e: 'Bỏ rác đúng nơi giữ cho môi trường sạch đẹp.' },
    { q: 'Vì sao phải rửa tay trước khi ăn?', a: 'Để diệt vi khuẩn, phòng bệnh', opts: ['Để diệt vi khuẩn, phòng bệnh', 'Để tay đẹp', 'Vì cô bắt', 'Không cần rửa'], e: 'Rửa tay loại bỏ vi khuẩn gây bệnh tiêu chảy, giun sán.' },
    { q: 'Quần áo bẩn em nên làm gì?', a: 'Thay ra và bỏ vào chậu giặt', opts: ['Thay ra và bỏ vào chậu giặt', 'Mặc tiếp', 'Vứt đi', 'Giấu dưới giường'], e: 'Mặc quần áo sạch sẽ giúp phòng bệnh da và tự tin hơn.' },
];

export function genGiuVeSinh(): EthicsProblem {
    const item = GIU_VE_SINH_QS[rand(0, GIU_VE_SINH_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 1, difficulty: 1,
        type: 'behavior', topic: 'Giữ gìn vệ sinh', topicKey: 'giu_ve_sinh',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Sạch sẽ → khỏe mạnh', `Đáp án: ${item.a}`],
    };
}

// ── NEW G2: Đoàn kết bạn bè — Đạo đức L2 ──
const DOAN_KET_QS = [
    { q: 'Khi bạn bị ngã, em nên:', a: 'Đỡ bạn dậy và hỏi thăm', opts: ['Đỡ bạn dậy và hỏi thăm', 'Cười bạn', 'Bỏ đi', 'Quay video'], e: 'Giúp đỡ bạn khi gặp khó khăn là đoàn kết thân ái.' },
    { q: 'Hai bạn cãi nhau về đồ chơi. Em nên:', a: 'Rủ hai bạn chơi chung hoặc luân phiên', opts: ['Rủ hai bạn chơi chung hoặc luân phiên', 'Cổ vũ bạn mạnh hơn', 'Lấy đồ chơi cho mình', 'Bỏ đi'], e: 'Chia sẻ và nhường nhịn giúp bạn bè hòa thuận.' },
    { q: 'Làm việc nhóm, bạn nào cũng muốn làm thủ lĩnh. Em nên:', a: 'Bầu chọn công bằng hoặc luân phiên', opts: ['Bầu chọn công bằng hoặc luân phiên', 'Tranh giành', 'Bỏ nhóm', 'Để ai mạnh nhất'], e: 'Công bằng và tôn trọng ý kiến nhau là nền tảng đoàn kết.' },
    { q: 'Bạn mới chuyển đến lớp, nói giọng khác. Em nên:', a: 'Chào đón và làm quen thân thiện', opts: ['Chào đón và làm quen thân thiện', 'Trêu chọc giọng bạn', 'Không chơi với bạn', 'Nói xấu sau lưng'], e: 'Tôn trọng sự khác biệt là biểu hiện của lòng đoàn kết.' },
];

export function genDoanKetBanBe(): EthicsProblem {
    const item = DOAN_KET_QS[rand(0, DOAN_KET_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 2, difficulty: 2,
        type: 'behavior', topic: 'Đoàn kết bạn bè', topicKey: 'doan_ket',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['Đoàn kết = chia sẻ + tôn trọng + giúp đỡ', `Đáp án: ${item.a}`],
    };
}

// ── NEW G3: Bảo vệ môi trường — Đạo đức L3 ──
const MOI_TRUONG_QS = [
    { q: 'Tại sao phải phân loại rác?', a: 'Để tái chế, giảm ô nhiễm', opts: ['Để tái chế, giảm ô nhiễm', 'Không cần phân loại', 'Để vui', 'Chỉ người lớn làm'], e: 'Phân loại rác (hữu cơ, vô cơ, tái chế) giúp bảo vệ môi trường.' },
    { q: 'Em có thể làm gì để bảo vệ cây xanh?', a: 'Không bẻ cành, tưới cây, trồng cây mới', opts: ['Không bẻ cành, tưới cây, trồng cây mới', 'Chặt cây', 'Không cần quan tâm', 'Viết lên cây'], e: 'Cây xanh cho khí O₂, bóng mát, giảm ô nhiễm. Hãy bảo vệ cây!' },
    { q: 'Nên tiết kiệm điện bằng cách nào?', a: 'Tắt đèn/quạt khi ra khỏi phòng', opts: ['Tắt đèn/quạt khi ra khỏi phòng', 'Bật đèn cả ngày', 'Không cần tiết kiệm', 'Chỉ dùng nến'], e: 'Tiết kiệm điện = tiết kiệm tài nguyên + giảm ô nhiễm.' },
    { q: 'Sử dụng túi vải thay túi ni-lông vì:', a: 'Túi ni-lông khó phân hủy, gây ô nhiễm', opts: ['Túi ni-lông khó phân hủy, gây ô nhiễm', 'Túi vải đẹp hơn', 'Túi ni-lông đắt hơn', 'Không lý do'], e: 'Túi ni-lông mất 500-1000 năm phân hủy. Dùng túi vải bảo vệ trái đất.' },
];

export function genBaoVeMoiTruong(): EthicsProblem {
    const item = MOI_TRUONG_QS[rand(0, MOI_TRUONG_QS.length - 1)];
    return {
        id: genId(), gradeLevel: 3, difficulty: 3,
        type: 'behavior', topic: 'Bảo vệ môi trường', topicKey: 'bao_ve_moi_truong',
        question: item.q, correctAnswer: item.a, options: item.opts,
        explanation: item.e, hints: ['3R: Reduce (giảm) - Reuse (tái sử dụng) - Recycle (tái chế)', `Đáp án: ${item.a}`],
    };
}

// ══════════════════════════════════════════════
// TOPIC REGISTRY
// ══════════════════════════════════════════════

export interface EthicsTopicInfo {
    key: string;
    name: string;
    gradeLevel: number;
    generator: () => EthicsProblem;
    icon: string;
}

export const ETHICS_TOPICS: EthicsTopicInfo[] = [
    { key: 'polite_greet', name: 'Chào hỏi lễ phép', gradeLevel: 1, generator: genPoliteGreet, icon: '🙏' },
    { key: 'yeu_thuong_gia_dinh', name: 'Yêu thương gia đình', gradeLevel: 1, generator: genYeuThuongGiaDinh, icon: '❤️' },
    { key: 'giu_ve_sinh', name: 'Giữ gìn vệ sinh', gradeLevel: 1, generator: genGiuVeSinh, icon: '🧹' },
    { key: 'express_emotion', name: 'Thể hiện cảm xúc', gradeLevel: 2, generator: genExpressEmotion, icon: '😊' },
    { key: 'doan_ket', name: 'Đoàn kết bạn bè', gradeLevel: 2, generator: genDoanKetBanBe, icon: '🤗' },
    { key: 'honesty', name: 'Trung thực', gradeLevel: 3, generator: genHonesty, icon: '💎' },
    { key: 'bao_ve_moi_truong', name: 'Bảo vệ môi trường', gradeLevel: 3, generator: genBaoVeMoiTruong, icon: '🌍' },
    { key: 'responsibility', name: 'Trách nhiệm', gradeLevel: 4, generator: genResponsibility, icon: '🎯' },
    { key: 'children_rights', name: 'Quyền trẻ em', gradeLevel: 4, generator: genChildrenRights, icon: '🛡️' },
    { key: 'community_empathy', name: 'Đồng cảm cộng đồng', gradeLevel: 5, generator: genCommunityEmpathy, icon: '🤝' },
    { key: 'internet_safety', name: 'An toàn trên mạng', gradeLevel: 5, generator: genInternetSafety, icon: '🔒' },
];

export function generateEthicsSet(grade: number, topicKey?: string, count: number = 10): EthicsProblem[] {
    const topics = ETHICS_TOPICS.filter(t => t.gradeLevel <= grade && (!topicKey || t.key === topicKey));
    if (topics.length === 0) return [];
    return Array.from({ length: count }, () => {
        const t = topics[rand(0, topics.length - 1)];
        return t.generator();
    });
}
