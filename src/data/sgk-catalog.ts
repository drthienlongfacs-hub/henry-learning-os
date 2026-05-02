// =============================================================================
// SGK CATALOG — Bộ Sách Giáo Khoa Thống Nhất (CTGDPT 2018)
// Nguồn: NXB Giáo dục Việt Nam — hanhtrangso.nxbgd.vn
// Dùng cho mục đích học tập cá nhân/gia đình (Luật SHTT Điều 25 Khoản 1a)
// =============================================================================

export interface SGKBook {
    id: string;
    title: string;
    grade: number;
    subject: string;
    subjectLabel: string;
    volume?: string; // "Tập 1", "Tập 2"
    coverColor: string; // gradient background
    coverEmoji: string;
    ebookUrl: string; // direct link to hanhtrangso
}

export const SGK_SUBJECTS = [
    { id: 'tieng-viet', label: 'Tiếng Việt', emoji: '📖', color: '#ec4899' },
    { id: 'toan', label: 'Toán', emoji: '🔢', color: '#f59e0b' },
    { id: 'tieng-anh', label: 'Tiếng Anh', emoji: '🇬🇧', color: '#6366f1' },
    { id: 'tn-xh', label: 'Tự nhiên và Xã hội', emoji: '🌿', color: '#10b981' },
    { id: 'khoa-hoc', label: 'Khoa học', emoji: '🔬', color: '#06b6d4' },
    { id: 'lich-su-dia-ly', label: 'Lịch sử và Địa lí', emoji: '🗺️', color: '#8b5cf6' },
    { id: 'dao-duc', label: 'Đạo đức', emoji: '💛', color: '#f97316' },
    { id: 'am-nhac', label: 'Âm nhạc', emoji: '🎵', color: '#a855f7' },
    { id: 'mi-thuat', label: 'Mĩ thuật', emoji: '🎨', color: '#14b8a6' },
    { id: 'hdtn', label: 'Hoạt động trải nghiệm', emoji: '🏕️', color: '#22c55e' },
    { id: 'gdtc', label: 'Giáo dục thể chất', emoji: '⚽', color: '#ef4444' },
    { id: 'tin-hoc', label: 'Tin học', emoji: '💻', color: '#3b82f6' },
    { id: 'cong-nghe', label: 'Công nghệ', emoji: '⚙️', color: '#64748b' },
] as const;

const HTS = 'https://hanhtrangso.nxbgd.vn';

// Helper to build book entries
const b = (
    grade: number,
    subject: string,
    subjectLabel: string,
    emoji: string,
    color: string,
    volume?: string,
): SGKBook => ({
    id: `sgk-${subject}-${grade}${volume ? `-t${volume.replace('Tập ', '')}` : ''}`,
    title: `${subjectLabel} ${grade}${volume ? `, ${volume.toLowerCase()}` : ''}`,
    grade,
    subject,
    subjectLabel,
    volume,
    coverColor: color,
    coverEmoji: emoji,
    ebookUrl: HTS,
});

// =============================================================================
// COMPLETE CATALOG — Lớp 1-5, tất cả môn học theo CTGDPT 2018
// =============================================================================

export const SGK_CATALOG: SGKBook[] = [
    // ======================== LỚP 1 ========================
    b(1, 'tieng-viet', 'Tiếng Việt', '📖', '#ec4899', 'Tập 1'),
    b(1, 'tieng-viet', 'Tiếng Việt', '📖', '#ec4899', 'Tập 2'),
    b(1, 'toan', 'Toán', '🔢', '#f59e0b', 'Tập 1'),
    b(1, 'toan', 'Toán', '🔢', '#f59e0b', 'Tập 2'),
    b(1, 'tieng-anh', 'Tiếng Anh', '🇬🇧', '#6366f1'),
    b(1, 'tn-xh', 'Tự nhiên và Xã hội', '🌿', '#10b981'),
    b(1, 'dao-duc', 'Đạo đức', '💛', '#f97316'),
    b(1, 'am-nhac', 'Âm nhạc', '🎵', '#a855f7'),
    b(1, 'mi-thuat', 'Mĩ thuật', '🎨', '#14b8a6'),
    b(1, 'hdtn', 'Hoạt động trải nghiệm', '🏕️', '#22c55e'),
    b(1, 'gdtc', 'Giáo dục thể chất', '⚽', '#ef4444'),

    // ======================== LỚP 2 ========================
    b(2, 'tieng-viet', 'Tiếng Việt', '📖', '#ec4899', 'Tập 1'),
    b(2, 'tieng-viet', 'Tiếng Việt', '📖', '#ec4899', 'Tập 2'),
    b(2, 'toan', 'Toán', '🔢', '#f59e0b', 'Tập 1'),
    b(2, 'toan', 'Toán', '🔢', '#f59e0b', 'Tập 2'),
    b(2, 'tieng-anh', 'Tiếng Anh', '🇬🇧', '#6366f1'),
    b(2, 'tn-xh', 'Tự nhiên và Xã hội', '🌿', '#10b981'),
    b(2, 'dao-duc', 'Đạo đức', '💛', '#f97316'),
    b(2, 'am-nhac', 'Âm nhạc', '🎵', '#a855f7'),
    b(2, 'mi-thuat', 'Mĩ thuật', '🎨', '#14b8a6'),
    b(2, 'hdtn', 'Hoạt động trải nghiệm', '🏕️', '#22c55e'),
    b(2, 'gdtc', 'Giáo dục thể chất', '⚽', '#ef4444'),

    // ======================== LỚP 3 ========================
    b(3, 'tieng-viet', 'Tiếng Việt', '📖', '#ec4899', 'Tập 1'),
    b(3, 'tieng-viet', 'Tiếng Việt', '📖', '#ec4899', 'Tập 2'),
    b(3, 'toan', 'Toán', '🔢', '#f59e0b', 'Tập 1'),
    b(3, 'toan', 'Toán', '🔢', '#f59e0b', 'Tập 2'),
    b(3, 'tieng-anh', 'Tiếng Anh', '🇬🇧', '#6366f1', 'Tập 1'),
    b(3, 'tieng-anh', 'Tiếng Anh', '🇬🇧', '#6366f1', 'Tập 2'),
    b(3, 'tn-xh', 'Tự nhiên và Xã hội', '🌿', '#10b981'),
    b(3, 'dao-duc', 'Đạo đức', '💛', '#f97316'),
    b(3, 'am-nhac', 'Âm nhạc', '🎵', '#a855f7'),
    b(3, 'mi-thuat', 'Mĩ thuật', '🎨', '#14b8a6'),
    b(3, 'hdtn', 'Hoạt động trải nghiệm', '🏕️', '#22c55e'),
    b(3, 'gdtc', 'Giáo dục thể chất', '⚽', '#ef4444'),
    b(3, 'tin-hoc', 'Tin học', '💻', '#3b82f6'),
    b(3, 'cong-nghe', 'Công nghệ', '⚙️', '#64748b'),

    // ======================== LỚP 4 ========================
    b(4, 'tieng-viet', 'Tiếng Việt', '📖', '#ec4899', 'Tập 1'),
    b(4, 'tieng-viet', 'Tiếng Việt', '📖', '#ec4899', 'Tập 2'),
    b(4, 'toan', 'Toán', '🔢', '#f59e0b', 'Tập 1'),
    b(4, 'toan', 'Toán', '🔢', '#f59e0b', 'Tập 2'),
    b(4, 'tieng-anh', 'Tiếng Anh', '🇬🇧', '#6366f1', 'Tập 1'),
    b(4, 'tieng-anh', 'Tiếng Anh', '🇬🇧', '#6366f1', 'Tập 2'),
    b(4, 'khoa-hoc', 'Khoa học', '🔬', '#06b6d4'),
    b(4, 'lich-su-dia-ly', 'Lịch sử và Địa lí', '🗺️', '#8b5cf6'),
    b(4, 'dao-duc', 'Đạo đức', '💛', '#f97316'),
    b(4, 'am-nhac', 'Âm nhạc', '🎵', '#a855f7'),
    b(4, 'mi-thuat', 'Mĩ thuật', '🎨', '#14b8a6'),
    b(4, 'hdtn', 'Hoạt động trải nghiệm', '🏕️', '#22c55e'),
    b(4, 'gdtc', 'Giáo dục thể chất', '⚽', '#ef4444'),
    b(4, 'tin-hoc', 'Tin học', '💻', '#3b82f6'),
    b(4, 'cong-nghe', 'Công nghệ', '⚙️', '#64748b'),

    // ======================== LỚP 5 ========================
    b(5, 'tieng-viet', 'Tiếng Việt', '📖', '#ec4899', 'Tập 1'),
    b(5, 'tieng-viet', 'Tiếng Việt', '📖', '#ec4899', 'Tập 2'),
    b(5, 'toan', 'Toán', '🔢', '#f59e0b', 'Tập 1'),
    b(5, 'toan', 'Toán', '🔢', '#f59e0b', 'Tập 2'),
    b(5, 'tieng-anh', 'Tiếng Anh', '🇬🇧', '#6366f1', 'Tập 1'),
    b(5, 'tieng-anh', 'Tiếng Anh', '🇬🇧', '#6366f1', 'Tập 2'),
    b(5, 'khoa-hoc', 'Khoa học', '🔬', '#06b6d4'),
    b(5, 'lich-su-dia-ly', 'Lịch sử và Địa lí', '🗺️', '#8b5cf6'),
    b(5, 'dao-duc', 'Đạo đức', '💛', '#f97316'),
    b(5, 'am-nhac', 'Âm nhạc', '🎵', '#a855f7'),
    b(5, 'mi-thuat', 'Mĩ thuật', '🎨', '#14b8a6'),
    b(5, 'hdtn', 'Hoạt động trải nghiệm', '🏕️', '#22c55e'),
    b(5, 'gdtc', 'Giáo dục thể chất', '⚽', '#ef4444'),
    b(5, 'tin-hoc', 'Tin học', '💻', '#3b82f6'),
    b(5, 'cong-nghe', 'Công nghệ', '⚙️', '#64748b'),
];
