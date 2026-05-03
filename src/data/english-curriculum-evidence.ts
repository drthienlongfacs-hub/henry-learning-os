export type EnglishCurriculumEvidenceStatus = 'implemented' | 'guarded' | 'needs_school_confirmation';

export interface EnglishCurriculumEvidenceItem {
  label: string;
  status: EnglishCurriculumEvidenceStatus;
  source: string;
  detail: string;
}

export const ENGLISH_CURRICULUM_EVIDENCE = {
  retrievedAt: '2026-05-03',
  evidenceItems: [
    {
      label: 'Bộ GDĐT lớp 1-2',
      status: 'implemented',
      source: 'Thông tư 32/2018/TT-BGDĐT và hướng dẫn tiếng Anh tự chọn lớp 1-2',
      detail: 'App triển khai như phần làm quen/tự chọn: nghe, nói, chữ cái, âm, từ quen thuộc và câu ngắn. Không ghi là môn bắt buộc lớp 1-2.',
    },
    {
      label: 'TP.HCM tích hợp',
      status: 'guarded',
      source: 'Đề án 5695/QĐ-UBND và hướng dẫn chuyên môn tiểu học TP.HCM',
      detail: 'App mở khung 8 tiết/tuần theo hướng Tiếng Anh, Toán, Khoa học bằng tiếng Anh. Đây là benchmark hỗ trợ học ở nhà, không tự nhận thay giáo trình trường.',
    },
    {
      label: 'Hệ quốc tế',
      status: 'implemented',
      source: 'Cambridge Primary English as a Second Language, Cambridge Young Learners, US Common Core, Australian Curriculum',
      detail: 'Đã có phonics, sight words, đọc hiểu, ngữ pháp và bài đọc theo grade 1-5 để bổ sung cho SGK Việt Nam.',
    },
    {
      label: 'Điểm cần xác nhận với trường',
      status: 'needs_school_confirmation',
      source: 'Kế hoạch giáo dục nhà trường và bộ sách trường chọn',
      detail: 'Tên bộ sách, nhà cung cấp, lịch 8 tiết/tuần và chuẩn đầu ra cụ thể phải lấy từ trường của Henry để khóa 100% theo lớp thật.',
    },
  ] satisfies EnglishCurriculumEvidenceItem[],
  noOverclaim:
    'Đã đủ để học và kiểm tra thực hành lớp 1-5 trong app; chưa claim là giáo trình chính thức của một trường cụ thể nếu chưa có kế hoạch giáo dục nhà trường.',
};

