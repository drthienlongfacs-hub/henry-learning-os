// ========================================
// Henry Learning OS — Global i18n System
// Bilingual EN/VI — Pillar 1 (Translanguaging)
// Garcia 2014: Domain-specific language switching
// ========================================

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Lang = 'vi' | 'en';

interface LangState {
    lang: Lang;
    setLang: (l: Lang) => void;
    toggleLang: () => void;
}

export const useLangStore = create<LangState>()(
    persist(
        (set, get) => ({
            lang: 'vi',
            setLang: (l) => set({ lang: l }),
            toggleLang: () => set({ lang: get().lang === 'vi' ? 'en' : 'vi' }),
        }),
        {
            name: 'henry-lang',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

// ========================================
// MASTER DICTIONARY — All app strings
// ========================================

const dict: Record<string, Record<Lang, string>> = {
    // --- Global / Layout ---
    app_title: { vi: 'Long Learning OS', en: 'Long Learning OS' },
    choose_role: { vi: 'Chọn vai trò của bạn', en: 'Choose your role' },
    child_learn: { vi: 'Con học', en: 'Learn' },
    child_learn_desc: { vi: 'Bắt đầu buổi học hôm nay', en: 'Start today\'s lesson' },
    parent: { vi: 'Ba Mẹ', en: 'Parents' },
    parent_desc: { vi: 'Dashboard & nhiệm vụ hôm nay', en: 'Dashboard & today\'s missions' },

    // --- Landing page ---
    landing_tagline: { vi: 'Hệ thống học tập thông minh cho con.', en: 'Smart learning system for your child.' },
    landing_sub: { vi: 'AI dạy theo cách của con — không làm hộ, mà giúp con tự học.', en: 'AI teaches your child\'s way — not doing it for them, but helping them learn independently.' },
    landing_cta: { vi: 'Bắt đầu — Tạo hồ sơ cho con', en: 'Get Started — Create your child\'s profile' },
    landing_privacy: { vi: 'Dữ liệu lưu trên thiết bị của bạn. Không quảng cáo. Không chia sẻ dữ liệu trẻ em.', en: 'Data stored on your device. No ads. No child data sharing.' },
    feat_ai_tutor: { vi: 'AI Gia Sư', en: 'AI Tutor' },
    feat_reading: { vi: 'Đọc Sách', en: 'Reading' },
    feat_self_learn: { vi: 'Tự Học', en: 'Self-Learn' },
    feat_safety: { vi: 'An Toàn', en: 'Safety' },

    // --- Child Dashboard ---
    greeting: { vi: 'Xin chào', en: 'Hello' },
    errors_to_fix: { vi: 'Lỗi cần sửa', en: 'Errors to fix' },
    need_review: { vi: 'Cần ôn tập', en: 'Need review' },
    mastered: { vi: 'Đã thành thạo', en: 'Mastered' },
    today_plan: { vi: 'Kế hoạch hôm nay', en: 'Today\'s Plan' },
    learn_btn: { vi: 'Học', en: 'Learn' },
    exercises: { vi: 'bài tập', en: 'exercises' },
    elite_title: { vi: 'Năng lực Tinh Hoa', en: 'Elite Capabilities' },
    elite_desc: { vi: '6 trụ cột — Xác suất, Tài chính, Công dân, Thương lượng, Đạo đức', en: '6 pillars — Probability, Finance, Civics, Negotiation, Ethics' },

    // --- Bottom Nav ---
    nav_home: { vi: 'Trang chủ', en: 'Home' },
    nav_elite: { vi: 'Tinh Hoa', en: 'Elite' },
    nav_review: { vi: 'Ôn tập', en: 'Review' },
    nav_mistakes: { vi: 'Lỗi sai', en: 'Mistakes' },
    nav_reading: { vi: 'Đọc sách', en: 'Reading' },

    // --- Elite Dashboard ---
    back: { vi: 'Về trang chính', en: 'Back to Home' },
    elite_page_title: { vi: 'Năng lực Tinh Hoa', en: 'Elite Capabilities' },
    elite_subtitle: { vi: '6 trụ cột để trở thành người tạo luật chơi', en: '6 pillars to become the rule maker' },
    tab_overview: { vi: 'Tổng quan', en: 'Overview' },
    tab_probability: { vi: 'Xác suất', en: 'Probability' },
    tab_finance: { vi: 'Tài chính', en: 'Finance' },
    tab_civics: { vi: 'Công dân', en: 'Civics' },
    tab_negotiation: { vi: 'Thương lượng', en: 'Negotiation' },
    tab_ethics: { vi: 'Đạo đức', en: 'Ethics' },
    metrics_title: { vi: 'Chỉ số 6 trụ cột', en: '6 Pillar Metrics' },
    m_bilingual: { vi: 'Song ngữ', en: 'Bilingual' },
    m_stochastic: { vi: 'Xác suất', en: 'Probability' },
    m_systemic: { vi: 'Hệ thống', en: 'Systemic' },
    m_investor: { vi: 'Nhà đầu tư', en: 'Investor' },
    m_persuasion: { vi: 'Thuyết phục', en: 'Persuasion' },
    m_resilience: { vi: 'Phục hồi', en: 'Resilience' },
    prob_title: { vi: 'Dự đoán khả năng xảy ra', en: 'Predict the Likelihood' },
    q_label: { vi: 'Câu', en: 'Q' },
    score_label: { vi: 'Điểm', en: 'Score' },
    correct: { vi: 'Đúng rồi!', en: 'Correct!' },
    wrong: { vi: 'Chưa đúng!', en: 'Not quite!' },
    next: { vi: 'Tiếp theo', en: 'Next' },
    done: { vi: 'Hoàn thành!', en: 'Complete!' },
    replay: { vi: 'Chơi lại', en: 'Play Again' },
    fin_title: { vi: 'Muốn hay Cần?', en: 'Want or Need?' },
    fin_want: { vi: '💎 MUỐN', en: '💎 WANT' },
    fin_need: { vi: '🛡️ CẦN', en: '🛡️ NEED' },
    civ_title: { vi: 'Quốc gia của Henry', en: 'Henry\'s Nation' },
    civ_scenario: { vi: 'Tình huống', en: 'Scenario' },
    civ_fairness: { vi: 'Công bằng', en: 'Fairness' },
    civ_happiness: { vi: 'Hạnh phúc', en: 'Happiness' },
    eth_title: { vi: 'Vòng tròn Kiểm soát', en: 'Circle of Control' },
    eth_ctrl: { vi: '✊ Kiểm soát được', en: '✊ Controllable' },
    eth_no_ctrl: { vi: '🌊 Không kiểm soát', en: '🌊 Uncontrollable' },
    eth_retry: { vi: 'Thử thách lại', en: 'Try Again' },
    neg_title: { vi: 'Thương lượng với AI', en: 'Negotiate with AI' },
    neg_common: { vi: 'Cách thường thấy:', en: 'Common approach:' },
    neg_winwin: { vi: 'Cách Win-Win:', en: 'Win-Win approach:' },
    neg_learn: { vi: 'Hãy học cách nói sao cho cả hai bên đều vui!', en: 'Learn to speak so both sides are happy!' },
    toggle_vi: { vi: 'VN 🇻🇳', en: 'VN 🇻🇳' },
    toggle_en: { vi: 'EN 🇬🇧', en: 'EN 🇬🇧' },

    // --- Review page ---
    review_title: { vi: 'Ôn tập', en: 'Review' },
    review_count: { vi: 'bài', en: 'items' },
    review_empty_title: { vi: 'Không có bài ôn tập nào hôm nay!', en: 'No reviews scheduled today!' },
    review_empty_sub: { vi: 'Quay lại sau nhé, hệ thống sẽ tự lên lịch.', en: 'Come back later, the system will auto-schedule.' },
    review_show_answer: { vi: 'Xem đáp án / gợi ý', en: 'Show answer / hint' },
    review_remembered: { vi: 'Nhớ rồi', en: 'Remembered' },
    review_need_hint: { vi: 'Cần gợi ý', en: 'Need hint' },
    review_forgot: { vi: 'Quên rồi', en: 'Forgot' },
    review_history: { vi: 'Lịch ôn tập', en: 'Review History' },
    review_mistake_label: { vi: '🧠 Lỗi sai', en: '🧠 Mistake' },
    review_flashcard_label: { vi: '📚 Flashcard', en: '📚 Flashcard' },
    review_result_correct: { vi: 'Đúng', en: 'Correct' },
    review_result_incorrect: { vi: 'Sai', en: 'Wrong' },
    review_result_hint: { vi: 'Cần gợi ý', en: 'Needed hint' },
    review_result_pending: { vi: 'Chưa ôn', en: 'Pending' },
    review_default_q: { vi: 'Ôn lại lỗi sai', en: 'Review past mistake' },
    review_default_fc: { vi: 'Flashcard ôn tập', en: 'Review flashcard' },
    review_default_a: { vi: 'Đã ôn', en: 'Reviewed' },

    // --- Mistakes page ---
    mistakes_title: { vi: 'Sổ lỗi sai', en: 'Mistake Journal' },
    mistakes_unfixed: { vi: 'chưa sửa', en: 'unfixed' },
    mistakes_empty_title: { vi: 'Không có lỗi nào cần sửa!', en: 'No mistakes to fix!' },
    mistakes_empty_sub: { vi: 'Hãy tiếp tục học để luôn giỏi nhé!', en: 'Keep learning and stay sharp!' },
    mistakes_fixed_btn: { vi: 'Đã sửa', en: 'Fixed' },
    mistakes_fix_plan: { vi: 'Kế hoạch sửa:', en: 'Fix plan:' },
    mistakes_resolved: { vi: 'Đã sửa', en: 'Resolved' },
    err_concept: { vi: 'Chưa hiểu khái niệm', en: 'Concept gap' },
    err_procedure: { vi: 'Sai quy trình', en: 'Wrong procedure' },
    err_calculation: { vi: 'Sai phép tính', en: 'Calculation error' },
    err_reading: { vi: 'Đọc đề sai', en: 'Misread question' },
    err_vocabulary: { vi: 'Thiếu từ vựng', en: 'Vocabulary gap' },
    err_attention: { vi: 'Thiếu chú ý', en: 'Attention error' },
    err_strategy: { vi: 'Sai chiến lược', en: 'Wrong strategy' },
    err_unknown: { vi: 'Chưa phân loại', en: 'Unclassified' },

    // --- Reading page ---
    reading_title: { vi: 'Nhật ký đọc sách', en: 'Reading Journal' },
    reading_add: { vi: 'Thêm', en: 'Add' },
    reading_form_title: { vi: 'Ghi nhật ký đọc sách', en: 'Log a reading entry' },
    reading_book_name: { vi: 'Tên sách', en: 'Book title' },
    reading_author: { vi: 'Tác giả', en: 'Author' },
    reading_pages: { vi: 'Số trang đọc', en: 'Pages read' },
    reading_minutes: { vi: 'Số phút đọc', en: 'Minutes read' },
    reading_summary: { vi: 'Con kể lại nội dung vừa đọc...', en: 'Tell what you just read...' },
    reading_new_words: { vi: 'Từ mới (phân cách bằng dấu phẩy)', en: 'New words (comma-separated)' },
    reading_save: { vi: 'Lưu', en: 'Save' },
    reading_empty_title: { vi: 'Chưa có ghi chú đọc sách nào!', en: 'No reading entries yet!' },
    reading_empty_sub: { vi: 'Nhấn "Thêm" để ghi lại cuốn sách con đang đọc.', en: 'Tap "Add" to log the book you\'re reading.' },
    reading_pages_unit: { vi: 'trang', en: 'pages' },
    reading_minutes_unit: { vi: 'phút', en: 'min' },

    // --- Session page ---
    session_exit: { vi: 'Thoát', en: 'Exit' },
    session_not_found: { vi: 'Không tìm thấy bài học.', en: 'Lesson not found.' },
    session_back: { vi: 'Quay lại', en: 'Go back' },
    session_checkin: { vi: 'Check-in', en: 'Check-in' },
    session_retrieval: { vi: 'Ôn bài cũ', en: 'Recall' },
    session_new: { vi: 'Kiến thức mới', en: 'New Concept' },
    session_practice: { vi: 'Luyện tập', en: 'Practice' },
    session_challenge: { vi: 'Thử thách', en: 'Challenge' },
    session_teachback: { vi: 'Con dạy lại', en: 'Teach Back' },
    session_reflection: { vi: 'Suy ngẫm', en: 'Reflection' },
    session_energy_q: { vi: 'Hôm nay con thấy năng lượng mấy điểm?', en: 'How much energy do you feel today?' },
    session_start: { vi: 'Bắt đầu học!', en: 'Start learning!' },
    session_question_n: { vi: 'Câu', en: 'Q' },
    session_explain_ph: { vi: 'Con hãy giải thích...', en: 'Explain your answer...' },
    session_answer_ph: { vi: 'Nhập câu trả lời...', en: 'Type your answer...' },
    session_submit: { vi: 'Gửi câu trả lời', en: 'Submit answer' },
    session_hint_btn: { vi: 'Con bí rồi — cho gợi ý!', en: 'Stuck — give me a hint!' },
    session_hint_label: { vi: 'Gợi ý', en: 'Hint' },
    session_correct: { vi: 'Chính xác! 🎉', en: 'Correct! 🎉' },
    session_wrong: { vi: 'Chưa đúng rồi!', en: 'Not quite right!' },
    session_explain_label: { vi: 'Giải thích:', en: 'Explanation:' },
    session_next_q: { vi: 'Câu tiếp theo', en: 'Next question' },
    session_next_step: { vi: 'Bước tiếp', en: 'Next step' },
    session_example: { vi: 'Ví dụ:', en: 'Example:' },
    session_understood: { vi: 'Đã hiểu! Bắt đầu luyện tập', en: 'Got it! Start practicing' },
    session_teachback_prompt: { vi: 'Bây giờ, con hãy giải thích lại bài học hôm nay bằng lời của con. Tưởng tượng con đang dạy cho một người bạn nhé!', en: 'Now, explain today\'s lesson in your own words. Imagine you\'re teaching a friend!' },
    session_teachback_ph: { vi: 'Con giải thích lại bài hôm nay...', en: 'Explain today\'s lesson...' },
    session_continue: { vi: 'Tiếp tục', en: 'Continue' },
    session_reflect_q: { vi: 'Hôm nay con hiểu gì? Con còn vướng gì?', en: 'What did you learn today? What\'s still confusing?' },
    session_reflect_ph: { vi: 'Con viết suy ngẫm...', en: 'Write your reflection...' },
    session_finish: { vi: '🌟 Hoàn thành buổi học!', en: '🌟 Finish lesson!' },
    session_complete_title: { vi: 'Tuyệt vời!', en: 'Awesome!' },
    session_complete_sub_pre: { vi: 'Con đã hoàn thành bài học', en: 'You completed the lesson' },
    session_go_home: { vi: 'Quay lại trang chủ', en: 'Back to Home' },
    session_1min: { vi: '1 phút', en: '1 min' },
    session_3min: { vi: '3 phút', en: '3 min' },
    session_5min: { vi: '5 phút', en: '5 min' },
    session_7min: { vi: '7 phút', en: '7 min' },
    session_8min: { vi: '8 phút', en: '8 min' },
    session_loading: { vi: 'Đang tải...', en: 'Loading...' },

    // --- Discover page ---
    discover_title: { vi: 'Khám phá Sách', en: 'Discover Books' },
    discover_desc: { vi: 'Open Library & Gutenberg', en: 'Open Library & Gutenberg' },
    discover_search_placeholder: { vi: 'Tìm kiếm sách...', en: 'Search for books...' },
    discover_searching: { vi: 'Đang tìm kiếm...', en: 'Searching...' },
    discover_no_results: { vi: 'Không tìm thấy sách', en: 'No books found' },
    discover_try_another: { vi: 'Thử từ khóa khác nhé', en: 'Try a different search term' },
    discover_welcome: { vi: 'Tìm cuộc phiêu lưu tiếp theo', en: 'Find your next adventure' },
    discover_welcome_sub: { vi: 'Tìm hàng triệu cuốn sách từ Open Library và Project Gutenberg', en: 'Search millions of books from Open Library and Project Gutenberg' },

    // --- Vocab page ---
    vocab_title: { vi: 'Xây Từ Vựng', en: 'Vocabulary Builder' },
    vocab_desc: { vi: 'Tra từ & Trắc nghiệm', en: 'Learn & quiz words' },
    vocab_search_word: { vi: 'Tra một từ', en: 'Look up a word' },
    vocab_type_word: { vi: 'Nhập từ tiếng Anh...', en: 'Type an English word...' },
    vocab_test_me: { vi: 'Kiểm tra con!', en: 'Test me!' },
    vocab_new_word: { vi: 'Từ mới', en: 'New word' },
    vocab_quiz_question: { vi: 'Từ này nghĩa là gì?', en: 'What does this word mean?' },
    vocab_correct: { vi: 'Chính xác!', en: 'Correct!' },
    vocab_incorrect: { vi: 'Chưa đúng!', en: 'Not quite!' },
    vocab_next: { vi: 'Từ tiếp theo', en: 'Next word' },
};

// ========================================
// Hook: useTranslation
// ========================================
export function useTranslation() {
    const lang = useLangStore((s) => s.lang);
    const t = (key: string): string => dict[key]?.[lang] ?? key;
    return { t, lang };
}
