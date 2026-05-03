export type PrivacySensitivity = 'low' | 'medium' | 'high';
export type PrivacyActionStatus = 'available_local' | 'planned' | 'not_applicable';

export interface PrivacyInventoryItem {
    id: string;
    label: string;
    sensitivity: PrivacySensitivity;
    storedIn: string;
    purpose: string;
    minimizationRule: string;
    retentionRule: string;
    exportStatus: PrivacyActionStatus;
    deleteStatus: PrivacyActionStatus;
    sourceIds: string[];
}

export interface PrivacyInventoryRuntimeItem extends PrivacyInventoryItem {
    recordCount: number;
}

export interface PrivacyEvidencePanel {
    asOf: string;
    items: PrivacyInventoryRuntimeItem[];
    totalRecordCount: number;
    highSensitivityCount: number;
    readiness100: number;
    allowedClaim: string;
    blockedClaim: string;
    noAdsTracking: boolean;
    legalCertificationClaimAllowed: false;
    sourceIds: string[];
}

export const PRIVACY_INVENTORY: PrivacyInventoryItem[] = [
    {
        id: 'child_profile',
        label: 'Hồ sơ trẻ',
        sensitivity: 'high',
        storedIn: 'localStorage: henry-os-v2',
        purpose: 'Cá nhân hóa lớp, ngôn ngữ, safety mode và hành trình học.',
        minimizationRule: 'Chỉ lưu nickname, năm sinh, lớp, bối cảnh học và sở thích cần cho học tập.',
        retentionRule: 'Giữ trên thiết bị cho đến khi phụ huynh xóa/reset local app.',
        exportStatus: 'available_local',
        deleteStatus: 'available_local',
        sourceIds: ['sot-traceability-matrix', 'unicef-ai-children', 'coppa'],
    },
    {
        id: 'parent_profile',
        label: 'Hồ sơ phụ huynh',
        sensitivity: 'medium',
        storedIn: 'localStorage: henry-os-v2',
        purpose: 'Hiển thị dashboard, nhiệm vụ đồng hành và nhắc trách nhiệm phụ huynh.',
        minimizationRule: 'Không lưu dữ liệu nhạy cảm ngoài tên/role và lựa chọn đồng hành.',
        retentionRule: 'Giữ local cho đến khi phụ huynh xóa/reset.',
        exportStatus: 'available_local',
        deleteStatus: 'available_local',
        sourceIds: ['sot-traceability-matrix', 'unicef-ai-children'],
    },
    {
        id: 'attempts',
        label: 'Bài làm và câu trả lời',
        sensitivity: 'high',
        storedIn: 'localStorage: attempts',
        purpose: 'Tính accuracy, hint dependency, mastery, RCA và PDCA.',
        minimizationRule: 'Lưu kết quả học và metadata cần thiết; không lưu hội thoại tự do dài.',
        retentionRule: 'Giữ local để theo dõi tiến bộ; cần export/delete UI trước khi backend hóa.',
        exportStatus: 'available_local',
        deleteStatus: 'available_local',
        sourceIds: ['sot-traceability-matrix', 'wwc-standards', 'eef-metacognition'],
    },
    {
        id: 'reading_quiz_history',
        label: 'Lịch sử evidence đọc hiểu đã redacted',
        sensitivity: 'medium',
        storedIn: 'localStorage: henry-reading-quiz-history-v1',
        purpose: 'Theo dõi số lần thử, đúng/sai, gợi ý và độ tin cậy của từng đoạn đọc.',
        minimizationRule: 'Không lưu câu trả lời thô; chỉ lưu metadata chấm câu hỏi và matched terms đã giới hạn.',
        retentionRule: 'Giữ local tối đa theo giới hạn attempt history; phụ huynh có thể reset local app.',
        exportStatus: 'available_local',
        deleteStatus: 'available_local',
        sourceIds: ['sot-traceability-matrix', 'ies-foundational-reading', 'unicef-ai-children'],
    },
    {
        id: 'mistakes',
        label: 'Sổ lỗi sai',
        sensitivity: 'high',
        storedIn: 'localStorage: mistakes',
        purpose: 'Phân loại lỗi, tạo lịch ôn và parent mission.',
        minimizationRule: 'Không dùng nhãn cố định như giỏi/yếu; chỉ ghi lỗi theo bài làm.',
        retentionRule: 'Giữ đến khi resolved hoặc phụ huynh xóa dữ liệu local.',
        exportStatus: 'available_local',
        deleteStatus: 'available_local',
        sourceIds: ['sot-traceability-matrix', 'eef-metacognition'],
    },
    {
        id: 'review_schedules',
        label: 'Lịch ôn tập',
        sensitivity: 'medium',
        storedIn: 'localStorage: reviewSchedules',
        purpose: 'Nhắc spaced repetition và retention checkpoint.',
        minimizationRule: 'Chỉ lưu itemId, ngày ôn, interval và kết quả gần nhất.',
        retentionRule: 'Giữ đến khi item không còn dùng hoặc phụ huynh reset.',
        exportStatus: 'available_local',
        deleteStatus: 'available_local',
        sourceIds: ['sot-traceability-matrix', 'eef-metacognition'],
    },
    {
        id: 'reflections',
        label: 'Phản tư của trẻ',
        sensitivity: 'high',
        storedIn: 'localStorage: reflections',
        purpose: 'Theo dõi metacognition, mood/energy và teach-back.',
        minimizationRule: 'Không dùng phản tư để chẩn đoán tâm lý; chỉ dùng cho học tập và phụ huynh.',
        retentionRule: 'Giữ local; nội dung nhạy cảm cần escalation thay vì khai thác.',
        exportStatus: 'available_local',
        deleteStatus: 'available_local',
        sourceIds: ['sot-traceability-matrix', 'unicef-ai-children', 'eef-metacognition'],
    },
    {
        id: 'reading_entries',
        label: 'Nhật ký đọc',
        sensitivity: 'medium',
        storedIn: 'localStorage: readingEntries',
        purpose: 'Theo dõi sách, phút đọc, tóm tắt và từ mới.',
        minimizationRule: 'Không cần lưu file/ảnh nếu chỉ cần tóm tắt và số trang.',
        retentionRule: 'Giữ local như portfolio học tập, phụ huynh có quyền xóa.',
        exportStatus: 'available_local',
        deleteStatus: 'available_local',
        sourceIds: ['sot-traceability-matrix', 'repo-prd'],
    },
    {
        id: 'weekly_reviews',
        label: 'Đánh giá tuần',
        sensitivity: 'medium',
        storedIn: 'localStorage: weeklyReviews',
        purpose: 'Lưu PDCA, điểm sáng, lo ngại và mục tiêu tuần sau.',
        minimizationRule: 'Tập trung vào hành động học tập, tránh mô tả đời tư không cần thiết.',
        retentionRule: 'Giữ local cho báo cáo tiến bộ; có thể xóa khi reset.',
        exportStatus: 'available_local',
        deleteStatus: 'available_local',
        sourceIds: ['sot-traceability-matrix', 'zearn-reporting'],
    },
    {
        id: 'ai_logs',
        label: 'Metadata tương tác AI',
        sensitivity: 'high',
        storedIn: 'localStorage: aiInteractionLogs',
        purpose: 'Audit role, support level, safety flags và response quality.',
        minimizationRule: 'Chỉ lưu metadata; không lưu toàn bộ hội thoại tự do.',
        retentionRule: 'Giữ local để phụ huynh audit; cần retention policy trước backend.',
        exportStatus: 'available_local',
        deleteStatus: 'available_local',
        sourceIds: ['sot-traceability-matrix', 'nist-ai-rmf', 'unicef-ai-children'],
    },
    {
        id: 'safety_events',
        label: 'Sự kiện an toàn',
        sensitivity: 'high',
        storedIn: 'localStorage: safetyEvents',
        purpose: 'Ghi cảnh báo, escalation và trạng thái thông báo phụ huynh.',
        minimizationRule: 'Chỉ ghi trigger summary và actionTaken đủ để xử lý an toàn.',
        retentionRule: 'Giữ local cho audit; cần chính sách retention khi có backend.',
        exportStatus: 'available_local',
        deleteStatus: 'available_local',
        sourceIds: ['sot-traceability-matrix', 'unicef-ai-children', 'nist-ai-rmf'],
    },
];

export function buildPrivacyEvidencePanel(counts: Partial<Record<string, number>> = {}): PrivacyEvidencePanel {
    const items = PRIVACY_INVENTORY.map((item) => ({
        ...item,
        recordCount: counts[item.id] ?? 0,
    }));
    const checks = [
        items.every((item) => item.purpose.length > 30),
        items.every((item) => item.minimizationRule.length > 30),
        items.every((item) => item.sourceIds.includes('sot-traceability-matrix')),
        items.every((item) => item.exportStatus !== 'planned' || item.sensitivity !== 'high'),
        items.every((item) => item.deleteStatus !== 'planned' || item.sensitivity !== 'high'),
        items.every((item) => !item.purpose.toLowerCase().includes('ads')),
    ];

    return {
        asOf: '2026-04-30',
        items,
        totalRecordCount: items.reduce((sum, item) => sum + item.recordCount, 0),
        highSensitivityCount: items.filter((item) => item.sensitivity === 'high').length,
        readiness100: Math.round((checks.filter(Boolean).length / checks.length) * 100),
        allowedClaim: 'Henry có privacy evidence inventory local-first, data minimization và parent-visible audit baseline.',
        blockedClaim: 'Không claim tuân thủ pháp lý đầy đủ hoặc COPPA/FERPA compliant nếu chưa có legal review và backend policy.',
        noAdsTracking: true,
        legalCertificationClaimAllowed: false,
        sourceIds: Array.from(new Set(items.flatMap((item) => item.sourceIds))),
    };
}
