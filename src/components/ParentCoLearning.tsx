'use client';
import React, { useState } from 'react';
import { Users, ChevronDown, ChevronUp, MessageCircle, Clock, Lightbulb } from 'lucide-react';

interface CoLearningTip {
  id: string;
  category: 'before' | 'during' | 'after';
  title: string;
  titleVi: string;
  description: string;
  descriptionVi: string;
  timeMinutes: number;
  icon: string;
  evidence?: string;
}

const TIPS: CoLearningTip[] = [
  // BEFORE reading
  { id:'b1', category:'before', title:'Preview the title & pictures', titleVi:'Xem trước tiêu đề & hình ảnh',
    description:'Ask: "What do you think this story is about?" Activates prior knowledge and sets prediction expectations.',
    descriptionVi:'Hỏi: "Con nghĩ câu chuyện này nói về gì?" Kích hoạt kiến thức nền và tạo dự đoán.',
    timeMinutes:2, icon:'🔮', evidence:'Schema theory — Anderson (1977)' },
  { id:'b2', category:'before', title:'Introduce 3 key words', titleVi:'Giới thiệu 3 từ khóa',
    description:'Pre-teach 3 vocabulary words from the passage. Use gestures, pictures, or real objects. Reduces cognitive load during reading.',
    descriptionVi:'Dạy trước 3 từ vựng trong bài. Dùng cử chỉ, hình ảnh, hoặc đồ vật thật. Giảm tải nhận thức khi đọc.',
    timeMinutes:3, icon:'🎯', evidence:'Beck et al. (2002) Bringing Words to Life' },

  // DURING reading
  { id:'d1', category:'during', title:'Read together, take turns', titleVi:'Đọc cùng nhau, luân phiên',
    description:'Parent reads one sentence, child reads the next. Build fluency through modeling. Use finger tracking for younger children.',
    descriptionVi:'Ba mẹ đọc 1 câu, con đọc câu tiếp. Xây lưu loát qua mô phỏng. Dùng ngón tay chỉ theo cho trẻ nhỏ.',
    timeMinutes:5, icon:'🤝' },
  { id:'d2', category:'during', title:'Pause and ask "Why?"', titleVi:'Dừng lại và hỏi "Tại sao?"',
    description:'After every 2-3 sentences, pause: "Why did the character do that?" or "What do you think will happen next?" Builds comprehension.',
    descriptionVi:'Sau mỗi 2-3 câu, dừng lại hỏi: "Tại sao nhân vật làm vậy?" hoặc "Con nghĩ chuyện gì sẽ xảy ra tiếp?"',
    timeMinutes:3, icon:'❓', evidence:'Dialogic reading — Whitehurst (1988)' },
  { id:'d3', category:'during', title:'Tap unknown words together', titleVi:'Chạm từ lạ cùng nhau',
    description:'When the child encounters an unknown word, tap it in the app to see the definition. Discuss the meaning in Vietnamese context.',
    descriptionVi:'Khi con gặp từ lạ, chạm vào app để xem nghĩa. Thảo luận ý nghĩa trong ngữ cảnh tiếng Việt.',
    timeMinutes:2, icon:'👆' },

  // AFTER reading
  { id:'a1', category:'after', title:'Retell in Vietnamese', titleVi:'Kể lại bằng tiếng Việt',
    description:'Ask the child to summarize the story in Vietnamese. This bridges L1-L2 and confirms comprehension. No need for perfect English retelling.',
    descriptionVi:'Nhờ con tóm tắt lại bằng tiếng Việt. Kết nối tiếng mẹ đẻ - tiếng Anh, xác nhận hiểu bài.',
    timeMinutes:3, icon:'🇻🇳', evidence:'Cummins (1979) Linguistic Interdependence' },
  { id:'a2', category:'after', title:'Connect to real life', titleVi:'Kết nối với đời thực',
    description:'"Have you ever seen a penguin? Where?" — Transfer learning from screen to real world; keep the claim descriptive until local retention data exists.',
    descriptionVi:'"Con đã bao giờ thấy chim cánh cụt chưa? Ở đâu?" — Chuyển học từ màn hình sang đời thực.',
    timeMinutes:2, icon:'🌍', evidence:'Transfer theory — Bransford (1999)' },
  { id:'a3', category:'after', title:'Star rating together', titleVi:'Cùng chấm sao',
    description:'Rate the passage 1-5 stars together. Ask "What was your favorite part?" Builds metacognitive reflection and ownership.',
    descriptionVi:'Cùng chấm sao 1-5 cho bài đọc. Hỏi "Con thích phần nào nhất?" Xây phản tư và quyền sở hữu học tập.',
    timeMinutes:1, icon:'⭐' },
];

const CATEGORIES = [
  { key: 'before' as const, label: 'Before Reading', labelVi: 'Trước khi đọc', icon: '🔮', color: '#8b5cf6' },
  { key: 'during' as const, label: 'While Reading', labelVi: 'Trong khi đọc', icon: '📖', color: '#2563eb' },
  { key: 'after' as const, label: 'After Reading', labelVi: 'Sau khi đọc', icon: '✅', color: '#059669' },
];

export default function ParentCoLearning({ lang }: { lang: string }) {
  const vi = lang === 'vi';
  const [expanded, setExpanded] = useState(true);
  const [doneTips, setDoneTips] = useState<Set<string>>(new Set());

  const toggleDone = (id: string) => {
    setDoneTips(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const totalTime = TIPS.reduce((s, t) => s + t.timeMinutes, 0);
  const doneCount = doneTips.size;

  return (
    <div style={{
      marginBottom: '1.5rem', background: '#fff', borderRadius: '20px',
      border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
    }}>
      {/* Header */}
      <div onClick={() => setExpanded(!expanded)} style={{
        background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
        padding: '1rem 1.25rem', cursor: 'pointer', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -15, right: -15, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <Users size={18} color="#fff" />
              <h2 style={{ fontWeight: 800, fontSize: '0.95rem', margin: 0, color: '#fff' }}>
                {vi ? '👨‍👩‍👧 Ba Mẹ Cùng Học' : '👨‍👩‍👧 Parent Co-Learning'}
              </h2>
            </div>
            <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
              {vi
                ? `${TIPS.length} hoạt động • ~${totalTime} phút • ${doneCount}/${TIPS.length} đã làm • Nguồn hướng dẫn, chưa claim hiệu quả định lượng`
                : `${TIPS.length} activities • ~${totalTime}min • ${doneCount}/${TIPS.length} done • Source-guided, no quantified claim yet`}
            </p>
          </div>
          {expanded ? <ChevronUp size={18} color="#fff" /> : <ChevronDown size={18} color="#fff" />}
        </div>
      </div>

      {expanded && (
        <div style={{ padding: '0.75rem 1.25rem' }}>
          {CATEGORIES.map(cat => {
            const catTips = TIPS.filter(t => t.category === cat.key);
            return (
              <div key={cat.key} style={{ marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.35rem' }}>
                  <span>{cat.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: '0.72rem', color: cat.color }}>{vi ? cat.labelVi : cat.label}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {catTips.map(tip => {
                    const isDone = doneTips.has(tip.id);
                    return (
                      <div key={tip.id} onClick={() => toggleDone(tip.id)} style={{
                        display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                        padding: '0.5rem 0.6rem', borderRadius: '10px', cursor: 'pointer',
                        background: isDone ? '#f0fdf4' : '#fafbfc',
                        border: isDone ? '1px solid #86efac' : '1px solid #f1f5f9',
                        transition: 'all 0.2s',
                      }}>
                        <div style={{
                          width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                          border: isDone ? '2px solid #16a34a' : '2px solid #d1d5db',
                          background: isDone ? '#16a34a' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.6rem', color: '#fff', marginTop: '2px',
                        }}>{isDone ? '✓' : ''}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <span style={{ fontSize: '0.8rem' }}>{tip.icon}</span>
                            <span style={{ fontWeight: 600, fontSize: '0.75rem', color: isDone ? '#16a34a' : '#1e293b', textDecoration: isDone ? 'line-through' : 'none' }}>
                              {vi ? tip.titleVi : tip.title}
                            </span>
                            <span style={{ fontSize: '0.5rem', color: '#94a3b8', marginLeft: 'auto' }}>
                              <Clock size={8} style={{ display: 'inline', verticalAlign: 'middle' }} /> {tip.timeMinutes}m
                            </span>
                          </div>
                          <div style={{ fontSize: '0.65rem', color: '#64748b', lineHeight: 1.5, marginTop: '2px' }}>
                            {vi ? tip.descriptionVi : tip.description}
                          </div>
                          {tip.evidence && (
                            <div style={{ fontSize: '0.5rem', color: '#a78bfa', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                              <Lightbulb size={8} /> {tip.evidence}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div style={{ marginTop: '0.3rem', fontSize: '0.5rem', color: '#94a3b8', lineHeight: 1.5, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MessageCircle size={8} />
            {vi ? 'Nguồn tham chiếu: AAP Family Media Plan, IES reading comprehension guide, UNICEF AI for children. Hiệu quả định lượng cần dữ liệu phiên học Henry.'
              : 'Sources: AAP Family Media Plan, IES reading comprehension guide, UNICEF AI for children. Quantified impact requires Henry session data.'}
          </div>
        </div>
      )}
    </div>
  );
}
