// ═══════════════════════════════════════════════════════════════
// Year 1 English Unit Image Registry
// Maps each unit to its AI-generated educational illustration
// Images stored in /public/images/english/y1/
// ═══════════════════════════════════════════════════════════════

export interface UnitImage {
  unitId: string;
  unitNumber: number;
  title: string;
  titleVi: string;
  imagePath: string;
  imageAlt: string;
  imageAltVi: string;
}

export const YEAR1_ENGLISH_IMAGES: UnitImage[] = [
  {
    unitId: 'en_u1', unitNumber: 1,
    title: 'My Family and Me', titleVi: 'Gia đình và tôi',
    imagePath: '/images/english/y1/unit1-family.webp',
    imageAlt: 'A happy family standing in front of their house with a garden',
    imageAltVi: 'Gia đình vui vẻ đứng trước ngôi nhà có vườn',
  },
  {
    unitId: 'en_u2', unitNumber: 2,
    title: "Sam's House", titleVi: 'Nhà của Sam',
    imagePath: '/images/english/y1/unit2-house.webp',
    imageAlt: 'Inside a cozy house showing bedroom, kitchen, living room, and bathroom',
    imageAltVi: 'Bên trong ngôi nhà ấm cúng với phòng ngủ, bếp, phòng khách, phòng tắm',
  },
  {
    unitId: 'en_u3', unitNumber: 3,
    title: 'The Moon and the Stars', titleVi: 'Mặt trăng và những ngôi sao',
    imagePath: '/images/english/y1/unit3-moon.webp',
    imageAlt: 'A child looking at a smiling moon and colorful stars in the night sky',
    imageAltVi: 'Em bé nhìn mặt trăng cười và những ngôi sao đầy màu sắc trên bầu trời đêm',
  },
  {
    unitId: 'en_u4', unitNumber: 4,
    title: "Sam's Garden", titleVi: 'Khu vườn của Sam',
    imagePath: '/images/english/y1/unit4-garden.webp',
    imageAlt: 'A beautiful garden with flowers, butterflies, bees, and a child watering plants',
    imageAltVi: 'Khu vườn đẹp với hoa, bướm, ong, và em bé đang tưới cây',
  },
  {
    unitId: 'en_u5', unitNumber: 5,
    title: "Sam's Island", titleVi: 'Hòn đảo của Sam',
    imagePath: '/images/english/y1/unit5-island.webp',
    imageAlt: 'A tropical island with sandy beach, palm trees, seashells, and a child exploring',
    imageAltVi: 'Hòn đảo nhiệt đới với bãi cát, cây dừa, vỏ sò, và em bé đang khám phá',
  },
  {
    unitId: 'en_u6', unitNumber: 6,
    title: 'On the Beach', titleVi: 'Trên bãi biển',
    imagePath: '/images/english/y1/unit6-beach.webp',
    imageAlt: 'A sunny beach with a child building sandcastles, a crab, and seagulls',
    imageAltVi: 'Bãi biển nắng với em bé xây lâu đài cát, con cua, và chim hải âu',
  },
  {
    unitId: 'en_u7', unitNumber: 7,
    title: "Do or Don't?", titleVi: 'Nên hay không nên?',
    imagePath: '/images/english/y1/unit7-rules.webp',
    imageAlt: 'A classroom with children following rules, teacher at whiteboard, rules poster',
    imageAltVi: 'Lớp học với các em tuân theo nội quy, cô giáo bên bảng, bảng nội quy',
  },
  {
    unitId: 'en_u8', unitNumber: 8,
    title: 'Monkey Fun', titleVi: 'Vui cùng khỉ',
    imagePath: '/images/english/y1/unit8-animals.webp',
    imageAlt: 'A zoo with elephants, giraffes, monkeys, a parrot, and a child watching',
    imageAltVi: 'Sở thú với voi, hươu cao cổ, khỉ, vẹt, và em bé đang xem',
  },
  {
    unitId: 'en_u9', unitNumber: 9,
    title: 'In the Cave / Playtime', titleVi: 'Trong hang động / Giờ chơi',
    imagePath: '/images/english/y1/unit9-cave.webp',
    imageAlt: 'A child exploring a magical cave with crystals, treasure chest, and friendly bats',
    imageAltVi: 'Em bé khám phá hang động kỳ diệu với pha lê, rương kho báu, và dơi thân thiện',
  },
];

// Quick lookup by unitId
export function getUnitImage(unitId: string): UnitImage | undefined {
  return YEAR1_ENGLISH_IMAGES.find(img => img.unitId === unitId);
}
