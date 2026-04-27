import { Exercise } from '../types';

// Elite subjects with military / strategy / commander gamification context
export const eliteExercises: Exercise[] = [
    // PROBABILITY & DATA (Recon & Intelligence) - 25 exercises
    ...Array.from({ length: 25 }, (_, i) => {
        const totalTanks = 10;
        const enemyTanks = Math.floor(Math.random() * 8) + 1; // 1 to 8
        const allyTanks = totalTanks - enemyTanks;
        const moreEnemy = enemyTanks > allyTanks;

        return {
            id: `elite-prob-${i}`,
            type: 'multiple_choice' as const,
            subject: 'elite',
            difficulty: i < 10 ? 2 : 3,
            question: `[TÌNH BÁO QUÂN SỰ] Rada phát hiện ${totalTanks} xe tăng đang tiến tới. Trong đó có ${enemyTanks} xe màu đỏ (Địch) và ${allyTanks} xe màu xanh (Đồng minh). Lực lượng nào đông nguy hiểm hơn lúc này?`,
            options: [
                'Xe màu đỏ (Địch)',
                'Xe màu xanh (Đồng minh)',
                'Bằng nhau',
                'Không có xe nào'
            ].sort(() => Math.random() - 0.5),
            correctAnswer: moreEnemy ? 'Xe màu đỏ (Địch)' : enemyTanks === allyTanks ? 'Bằng nhau' : 'Xe màu xanh (Đồng minh)',
            hints: [] as string[],
            explanation: `Có ${enemyTanks} xe đỏ và ${allyTanks} xe xanh. Vị tri huy cần ra quyết định dựa trên số đông.`,
            tags: ['probability', 'data', 'strategy', 'military'],
        };
    }),

    // FINANCE & RESOURCE MANAGEMENT (Base Supply) - 25 exercises
    ...Array.from({ length: 25 }, (_, i) => {
        const coins = Math.floor(Math.random() * 20) + 10; // 10 to 29
        const cost = Math.floor(Math.random() * 10) + 5; // 5 to 14
        const canBuy = coins >= cost;

        return {
            id: `elite-finance-${i}`,
            type: 'multiple_choice' as const,
            subject: 'elite',
            difficulty: 3,
            question: `[QUẢN LÝ QUÂN NHU] Chỉ huy Henry có ${coins} đồng tiền vàng. Một tháp phòng thủ giá ${cost} đồng vàng. Chỉ huy có đủ tiền mua 1 tháp phòng thủ không và còn dư bao nhiêu?`,
            options: canBuy ? [
                `Có, còn dư ${coins - cost} đồng`,
                `Không đủ tiền`,
                `Có, còn dư 1 đồng`,
                `Có, không còn dư`
            ] : [
                `Không đủ tiền`,
                `Có, còn dư 10 đồng`,
                `Có, còn dư 5 đồng`,
                `Mua được 2 tháp`
            ],
            correctAnswer: canBuy ? `Có, còn dư ${coins - cost} đồng` : `Không đủ tiền`,
            hints: [] as string[],
            explanation: `Lấy số tiền đang có (${coins}) trừ đi giá tiền (${cost}) để biết còn dư hay thiếu.`,
            tags: ['finance', 'resources', 'military'],
        };
    }),

    // CIVICS & DISCIPLINE (Base Rules & Morale) - 25 exercises
    ...Array.from({ length: 25 }, (_, i) => {
        const isGoodBehavior = i % 2 === 0;
        const actions = [
            { action: 'Giúp đỡ đồng đội gác đêm', good: true },
            { action: 'Xả rác trong căn cứ', good: false },
            { action: 'Nghe lời chỉ huy trưởng', good: true },
            { action: 'Lơ là nhiệm vụ cảnh giới', good: false },
            { action: 'Bảo vệ căn cứ an toàn', good: true },
            { action: 'Tiêu phí quá nhiều đạn tập bắn', good: false },
        ];
        const pickedAction = actions[i % actions.length];

        return {
            id: `elite-civics-${i}`,
            type: 'multiple_choice' as const,
            subject: 'elite',
            difficulty: 2,
            question: `[KỶ LUẬT QUÂN ĐỘI] Hành động: "${pickedAction.action}". Đây là hành động nên làm hay không nên làm đối với một người lính giỏi?`,
            options: ['Nên làm, được thưởng huân chương!', 'Không nên làm, sẽ bị phạt', 'Chỉ thỉnh thoảng mới làm', 'Bỏ qua'],
            correctAnswer: pickedAction.good ? 'Nên làm, được thưởng huân chương!' : 'Không nên làm, sẽ bị phạt',
            hints: [] as string[],
            explanation: pickedAction.good ? `Hành động này giúp căn cứ mạnh hơn và đồng đội an toàn.` : `Kỷ luật là sức mạnh quân đội. Không được làm sai nội quy.`,
            tags: ['civics', 'ethics', 'military'],
        };
    }),

    // STRATEGY & LOGIC (Battle Tactics) - 25 exercises
    ...Array.from({ length: 25 }, (_, i) => {
        const attackLeft = i % 2 === 0;
        return {
            id: `elite-logic-${i}`,
            type: 'multiple_choice' as const,
            subject: 'elite',
            difficulty: 4,
            question: `[CHIẾN THUẬT TÁC CHIẾN] Rada chỉ báo Cổng Trái có 10 lính địch, Cổng Phải có 2 lính địch. Tư lệnh Henry nên điều máy bay hỗ trợ bắn vào cổng nào để bảo vệ căn cứ tốt nhất?`,
            options: [
                'Cổng Trái, vì đông địch hơn!',
                'Cổng Phải, vì ít địch hơn',
                'Bắn lên trời',
                'Cất máy bay đi ngủ'
            ].sort(() => Math.random() - 0.5),
            correctAnswer: 'Cổng Trái, vì đông địch hơn!',
            hints: [] as string[],
            explanation: `Cổng Trái đang gặp nguy hiểm nhất vì đông địch. Cần chi viện hỏa lực ngay!`,
            tags: ['strategy', 'logic', 'critical-thinking', 'military'],
        };
    }),

];
