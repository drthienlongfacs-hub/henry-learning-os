'use client';

import { useState } from 'react';
import {
  CAMBRIDGE_EXAMS,
  LEARNING_STRATEGIES,
  EXAM_PATHWAY,
  STUDY_PLANS,
  RECOMMENDED_BOOKS,
  YOUTUBE_CHANNELS,
  RECOMMENDED_APPS,
  PARENT_GUIDE,
  SMART_PATHS,
} from '@/data/cambridge-exam-prep';
import type { CambridgeExamLevelId } from '@/data/cambridge-official-framework';

const LEVEL_TO_EXAM_ID: Record<CambridgeExamLevelId, string> = {
  starters: 'yle_starters',
  movers: 'yle_movers',
  flyers: 'yle_flyers',
  ket: 'main_ket',
  pet: 'main_pet',
};

const LEVEL_TO_GRADE: Record<CambridgeExamLevelId, number> = {
  starters: 1,
  movers: 3,
  flyers: 5,
  ket: 6,
  pet: 7,
};

const LEVEL_TABS: Array<{ id: CambridgeExamLevelId; label: string; cefr: string }> = [
  { id: 'starters', label: '🌟 Starters', cefr: 'Pre-A1' },
  { id: 'movers', label: '🚀 Movers', cefr: 'A1' },
  { id: 'flyers', label: '🦅 Flyers', cefr: 'A2' },
  { id: 'ket', label: '🔑 KET', cefr: 'A2+' },
  { id: 'pet', label: '📋 PET', cefr: 'B1' },
];

const EVIDENCE_PLAYBOOK = [
  {
    skill: '🎧 Nghe (Listening)',
    steps: [
      'Đọc câu hỏi và xem tranh TRƯỚC khi băng chạy để dự đoán loại thông tin (tên, số, nơi chốn, màu sắc).',
      'Nghe trọn vẹn lần 1 để bắt ý chính và chọn sơ bộ; không dừng lại quá lâu ở 1 câu bỏ lỡ.',
      'Cảnh giác bẫy tự sửa: người nói thường nói phương án nhiễu trước rồi đổi sang đáp án đúng sau từ khóa "actually", "no, wait", "sorry, I mean".',
      'Lần 2 kiểm tra lại chính tả tên riêng được đánh vần và các cặp số dễ nhầm (13/30, 14/40, 15/50).',
    ],
    evidence: 'Cambridge Assessment English Listening Research & Field Testing Notes',
  },
  {
    skill: '📖 Đọc & Điền từ (Reading & Cloze)',
    steps: [
      'Đọc câu hỏi trước đoạn văn để kích hoạt mục tiêu tìm kiếm (scanning).',
      'Với bài trắc nghiệm Flyers/KET/PET, đối chiếu bằng từ đồng nghĩa (paraphrase) thay vì chọn đáp án lặp nguyên từ trong bài.',
      'Với Open Cloze (điền 1 từ không có hộp từ), xác định từ loại dựa vào từ ngay trước và sau chỗ trống (mạo từ, giới từ, trợ động từ).',
      'Loại trừ các lựa chọn quá tuyệt đối (always, never, all) nếu bài văn không khẳng định tuyệt đối.',
    ],
    evidence: 'Cambridge Reading Cognitive Processing Framework + Roediger & Karpicke (2006)',
  },
  {
    skill: '✍️ Viết (Writing)',
    steps: [
      'Gạch chân đủ các ý bắt buộc (3 ý ở KET Part 6, 4 ghi chú ở PET Part 1) và kiểm tra tick từng ý khi viết.',
      'Dùng thì quá khứ đơn nhất quán cho bài kể truyện theo tranh và nối mạch bằng First, Then, After that, Because, Finally.',
      'Giữ câu rõ ràng, chính xác ngữ pháp thay vì viết câu quá dài dễ sai cấu trúc.',
    ],
    evidence: 'Cambridge Writing Assessment Scales (Content, Communicative Achievement, Organisation, Language)',
  },
  {
    skill: '🗣️ Nói (Speaking)',
    steps: [
      'Luôn trả lời thành câu hoàn chỉnh và mở rộng thêm 1 lý do ("because...") hoặc 1 ví dụ ngắn.',
      'Khi chưa nghe rõ câu hỏi giám khảo, chủ động hỏi lịch sự: "Sorry, could you repeat that, please?".',
      'Ở phần mô tả tranh hoặc thảo luận cặp, đi từ tổng quát đến chi tiết và tương tác tự nhiên với bạn thi.',
    ],
    evidence: 'Vygotsky Scaffolded Speaking + Cambridge Speaking Examiners Handbook',
  },
];

export default function ExamPrepGuide({
  grade = 1,
  levelId,
}: {
  grade?: number;
  levelId?: CambridgeExamLevelId;
}) {
  const inferredLevel: CambridgeExamLevelId =
    levelId ??
    (grade <= 2 ? 'starters' : grade <= 3 ? 'movers' : grade <= 5 ? 'flyers' : grade === 6 ? 'ket' : 'pet');

  const [selectedLevel, setSelectedLevel] = useState<CambridgeExamLevelId>(inferredLevel);
  const [activeTab, setActiveTab] = useState<string>('smart');
  const [expandedExam, setExpandedExam] = useState<string | null>(LEVEL_TO_EXAM_ID[inferredLevel]);
  const [expandedPath, setExpandedPath] = useState<string | null>(SMART_PATHS[0]?.id ?? null);
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  const effectiveGrade = LEVEL_TO_GRADE[selectedLevel];
  const pathway = EXAM_PATHWAY[effectiveGrade as keyof typeof EXAM_PATHWAY];
  const targetExamId = LEVEL_TO_EXAM_ID[selectedLevel];
  const relevantExams = CAMBRIDGE_EXAMS.filter(e => e.id === targetExamId || e.gradeMapping.includes(effectiveGrade));
  const studyPlan = STUDY_PLANS.find(s => s.level === selectedLevel) ?? STUDY_PLANS[0];
  const parentTips = PARENT_GUIDE.filter(p => p.level === 'all' || p.level === selectedLevel);
  const strategiesForLevel = LEARNING_STRATEGIES.filter(s => s.gradeRange.includes(effectiveGrade));

  const tabs = [
    { id: 'smart', label: '🧠 Chiến lược giải đề', sub: 'Evidence-Based' },
    { id: 'plan', label: '📅 Lộ trình', sub: 'Study Plan' },
    { id: 'exams', label: '📝 Cấu trúc thi', sub: 'Exam Format' },
    { id: 'parent', label: '👨‍👩‍👧 Cho Ba Mẹ', sub: 'Parent Guide' },
    { id: 'tools', label: '📚 Sách & App', sub: 'Books & Apps' },
    { id: 'resources', label: '🎬 Tài nguyên', sub: 'Free Resources' },
  ];

  const cardStyle = (accent = 'rgba(255,255,255,0.06)') => ({
    background: accent,
    borderRadius: 14,
    padding: 14,
    border: '1px solid rgba(255,255,255,0.08)',
    marginBottom: 10,
  });

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      borderRadius: 20,
      padding: 20,
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <h2 style={{
          fontSize: 21,
          fontWeight: 800,
          margin: 0,
          background: 'linear-gradient(90deg, #f9d423, #ff4e50)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          🏆 Hướng dẫn & Chiến lược Cambridge — {selectedLevel.toUpperCase()}
        </h2>
        {pathway && (
          <p style={{ color: '#cbd5e0', fontSize: 13, marginTop: 4, marginBottom: 0 }}>
            Đang ôn: <strong style={{ color: '#63b3ed' }}>{pathway.preparing}</strong>
            {' → Tiếp: '}<strong style={{ color: '#68d391' }}>{pathway.next}</strong>
          </p>
        )}
      </div>

      {/* Level selector inside guide */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
        {LEVEL_TABS.map(lv => (
          <button
            type="button"
            key={lv.id}
            onClick={() => {
              setSelectedLevel(lv.id);
              setExpandedExam(LEVEL_TO_EXAM_ID[lv.id]);
            }}
            style={{
              minHeight: 32,
              padding: '5px 10px',
              borderRadius: 9,
              border: selectedLevel === lv.id ? '1.5px solid #f9d423' : '1px solid rgba(255,255,255,0.12)',
              background: selectedLevel === lv.id ? 'rgba(249,212,35,0.18)' : 'rgba(255,255,255,0.05)',
              color: selectedLevel === lv.id ? '#f9d423' : '#cbd5e0',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            {lv.label} ({lv.cefr})
          </button>
        ))}
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
        {tabs.map(t => (
          <button
            type="button"
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              minHeight: 34,
              padding: '6px 12px',
              borderRadius: 10,
              border: 'none',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              whiteSpace: 'nowrap',
              background: activeTab === t.id ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.08)',
              color: '#fff',
              transition: 'all 0.2s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ═══ TAB: EVIDENCE-BASED STRATEGIES ═══ */}
      {activeTab === 'smart' && (
        <div>
          <h4 style={{ fontSize: 14, color: '#f9d423', margin: '0 0 8px' }}>
            🎯 Cách giải đề hiệu quả theo 4 kỹ năng (Real Evidence-Based)
          </h4>
          {EVIDENCE_PLAYBOOK.map(item => (
            <div key={item.skill} style={{ ...cardStyle(), borderLeft: '3px solid #63b3ed' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#90cdf4', marginBottom: 6 }}>{item.skill}</div>
              {item.steps.map((st, idx) => (
                <div key={idx} style={{ fontSize: 12, color: '#e2e8f0', lineHeight: 1.55, marginBottom: 4 }}>
                  {idx + 1}. {st}
                </div>
              ))}
              <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 4 }}>
                📚 Căn cứ: {item.evidence}
              </div>
            </div>
          ))}

          <h4 style={{ fontSize: 14, color: '#68d391', margin: '14px 0 8px' }}>
            ⚡ Nguyên lý học sâu & nhớ lâu
          </h4>
          {strategiesForLevel.map(s => (
            <div key={s.id} style={cardStyle()}>
              <h5 style={{ margin: 0, fontSize: 14, color: '#f9d423' }}>{s.titleVi}</h5>
              <p style={{ fontSize: 12, color: '#e2e8f0', margin: '4px 0', lineHeight: 1.5 }}>{s.descriptionVi}</p>
              <p style={{ fontSize: 10, color: '#94a3b8', margin: 0 }}>📚 Bằng chứng: {s.evidence}</p>
            </div>
          ))}

          <h4 style={{ fontSize: 14, color: '#d6bcfa', margin: '14px 0 8px' }}>
            💡 Lộ trình thực hành hàng ngày
          </h4>
          {SMART_PATHS.map(path => (
            <div key={path.id} style={cardStyle()}>
              <button
                type="button"
                onClick={() => setExpandedPath(expandedPath === path.id ? null : path.id)}
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#fff' }}
              >
                <h4 style={{ margin: 0, fontSize: 15, color: '#f9d423' }}>{path.titleVi}</h4>
                <p style={{ fontSize: 12, color: '#a0aec0', margin: '4px 0 0' }}>{path.descriptionVi}</p>
              </button>
              {expandedPath === path.id && (
                <div style={{ marginTop: 10 }}>
                  {path.steps.map((step, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        gap: 10,
                        padding: '8px 0',
                        borderBottom: i < path.steps.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                      }}
                    >
                      <div style={{
                        minWidth: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 13,
                        fontWeight: 700,
                      }}>{i + 1}</div>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 600 }}>{step.stepVi}</p>
                        <div style={{ display: 'flex', gap: 8, marginTop: 3, flexWrap: 'wrap' }}>
                          <span style={{ fontSize: 11, color: '#68d391', background: 'rgba(104,211,145,0.1)', padding: '1px 6px', borderRadius: 4 }}>
                            🔧 {step.toolVi}
                          </span>
                          <span style={{ fontSize: 11, color: '#63b3ed', background: 'rgba(99,179,237,0.1)', padding: '1px 6px', borderRadius: 4 }}>
                            ⏱ {step.durationVi}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 6 }}>📚 Căn cứ: {path.evidenceVi}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ═══ TAB: STUDY PLAN ═══ */}
      {activeTab === 'plan' && studyPlan && (
        <div>
          <div style={{ textAlign: 'center', marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: 16, color: '#f9d423' }}>{studyPlan.titleVi}</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#63b3ed' }}>{studyPlan.totalWeeks}</div>
                <div style={{ fontSize: 11, color: '#a0aec0' }}>tuần</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#68d391' }}>~{studyPlan.hoursNeeded}</div>
                <div style={{ fontSize: 11, color: '#a0aec0' }}>giờ tổng</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#d6bcfa' }}>{studyPlan.phases[0].dailyMinutes}</div>
                <div style={{ fontSize: 11, color: '#a0aec0' }}>phút/ngày</div>
              </div>
            </div>
          </div>

          {studyPlan.phases.map((phase, pi) => {
            const isOpen = expandedPhase === null ? pi === 0 : expandedPhase === phase.weekRange;
            return (
              <div
                key={pi}
                style={{
                  ...cardStyle(),
                  borderLeft: `3px solid ${['#63b3ed', '#68d391', '#d6bcfa', '#f9d423'][pi % 4]}`,
                }}
              >
                <button
                  type="button"
                  onClick={() => setExpandedPhase(isOpen ? '__none__' : phase.weekRange)}
                  style={{ width: '100%', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}
                >
                  <div>
                    <span style={{ fontSize: 12, color: ['#63b3ed', '#68d391', '#d6bcfa', '#f9d423'][pi % 4], fontWeight: 700 }}>
                      {phase.weekRange}
                    </span>
                    <h4 style={{ margin: '2px 0 0', fontSize: 14 }}>{phase.titleVi}</h4>
                  </div>
                  <span style={{ fontSize: 11, color: '#a0aec0', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 6 }}>
                    {phase.dailyMinutes} phút/ngày
                  </span>
                </button>
                {isOpen && (
                  <div style={{ marginTop: 8 }}>
                    {phase.activitiesVi.map((act, ai) => (
                      <div
                        key={ai}
                        style={{
                          padding: '6px 10px',
                          fontSize: 12,
                          color: '#e2e8f0',
                          borderBottom: ai < phase.activitiesVi.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                        }}
                      >
                        ✅ {act}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <p style={{ fontSize: 11, color: '#a0aec0', textAlign: 'center', marginTop: 8 }}>
            🎯 Giờ tích lũy tham chiếu Cambridge: Starters ~100h • Movers ~175h • Flyers ~250h • KET ~350h • PET ~500h
          </p>
        </div>
      )}

      {/* ═══ TAB: EXAM STRUCTURE ═══ */}
      {activeTab === 'exams' && (
        <div>
          {relevantExams.map(exam => (
            <div key={exam.id} style={cardStyle()}>
              <button
                type="button"
                onClick={() => setExpandedExam(expandedExam === exam.id ? null : exam.id)}
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#fff' }}
              >
                <h3 style={{ margin: 0, fontSize: 17, color: '#f9d423' }}>
                  {exam.name} <span style={{ fontSize: 11, color: '#a0aec0' }}>({exam.cefr})</span>
                </h3>
                <p style={{ fontSize: 12, color: '#a0aec0', margin: '3px 0' }}>
                  Tuổi {exam.ageRange} • {exam.scoringVi}
                </p>
              </button>
              {expandedExam === exam.id && (
                <div style={{ marginTop: 10 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                        <th style={{ textAlign: 'left', padding: '5px 6px', color: '#63b3ed' }}>Kỹ năng</th>
                        <th style={{ textAlign: 'left', padding: '5px 6px', color: '#63b3ed' }}>Thời gian</th>
                        <th style={{ textAlign: 'left', padding: '5px 6px', color: '#63b3ed' }}>Phần</th>
                        <th style={{ textAlign: 'left', padding: '5px 6px', color: '#63b3ed' }}>Câu hỏi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exam.structure.map((s, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '5px 6px', fontWeight: 600 }}>{s.skillVi}</td>
                          <td style={{ padding: '5px 6px', color: '#a0aec0' }}>{s.duration}</td>
                          <td style={{ padding: '5px 6px', color: '#a0aec0' }}>{s.parts}</td>
                          <td style={{ padding: '5px 6px', color: '#f9d423', fontWeight: 600 }}>{s.questions || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {exam.structure.map((s, si) => (s.detailedParts?.length ? (
                    <div key={si} style={{ marginTop: 12 }}>
                      <h4 style={{ fontSize: 13, color: '#f9d423', margin: '0 0 6px', borderBottom: '1px solid rgba(249,212,35,0.15)', paddingBottom: 3 }}>
                        📋 {s.skillVi} — Chi tiết từng Part
                      </h4>
                      {s.detailedParts.map((dp, dpi) => (
                        <div
                          key={dpi}
                          style={{
                            padding: '6px 10px',
                            marginBottom: 4,
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: 8,
                            borderLeft: `3px solid ${s.skill === 'listening' ? '#63b3ed' : s.skill === 'reading_writing' ? '#68d391' : '#d6bcfa'}`,
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 600, fontSize: 12 }}>Part {dp.partNumber}: {dp.taskTypeVi}</span>
                            {dp.questions > 0 && (
                              <span style={{ fontSize: 10, color: '#f9d423', background: 'rgba(249,212,35,0.1)', padding: '1px 5px', borderRadius: 3 }}>
                                {dp.questions} câu
                              </span>
                            )}
                          </div>
                          <p style={{ fontSize: 11, color: '#cbd5e0', margin: '2px 0 0' }}>{dp.descriptionVi}</p>
                          {dp.exampleTask && <p style={{ fontSize: 10, color: '#a0aec0', margin: '2px 0 0', fontStyle: 'italic' }}>💬 {dp.exampleTask}</p>}
                          {dp.tip && <p style={{ fontSize: 10, color: '#68d391', margin: '2px 0 0' }}>💡 {dp.tip}</p>}
                        </div>
                      ))}
                    </div>
                  ) : null))}

                  <div style={{ marginTop: 10 }}>
                    <h4 style={{ fontSize: 13, color: '#fc8181', margin: '0 0 6px' }}>⚠️ Lỗi thường gặp</h4>
                    {exam.commonMistakes.map((m, i) => (
                      <div key={i} style={{ padding: '5px 8px', background: 'rgba(252,129,129,0.06)', borderRadius: 6, marginBottom: 3, fontSize: 11 }}>
                        <span style={{ color: '#fc8181' }}>✗ </span>{m.mistakeVi}
                        <br />
                        <span style={{ color: '#68d391' }}>→ </span>{m.fixVi}
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 10 }}>
                    <h4 style={{ fontSize: 13, color: '#d6bcfa', margin: '0 0 6px' }}>📖 Chủ đề từ vựng (Vocabulary Topics)</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                      {exam.vocabularyTopics.map((t, i) => (
                        <span key={i} style={{ padding: '2px 7px', background: 'rgba(214,188,250,0.1)', borderRadius: 5, fontSize: 10, color: '#d6bcfa' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ═══ TAB: PARENT GUIDE ═══ */}
      {activeTab === 'parent' && (
        <div>
          <p style={{ fontSize: 12, color: '#a0aec0', marginBottom: 12 }}>
            👨‍👩‍👧 Kinh nghiệm thực tế đồng hành 15 phút mỗi ngày cùng con
          </p>
          {parentTips.map(tip => (
            <div key={tip.id} style={cardStyle()}>
              <h4 style={{ margin: 0, fontSize: 14 }}>
                <span style={{ fontSize: 18, marginRight: 6 }}>{tip.icon}</span>
                {tip.titleVi}
              </h4>
              <span style={{ fontSize: 10, color: '#a0aec0', background: 'rgba(255,255,255,0.06)', padding: '1px 6px', borderRadius: 4, display: 'inline-block', marginTop: 3 }}>
                {tip.categoryVi}
              </span>
              <p style={{ fontSize: 12, color: '#e2e8f0', margin: '6px 0 0', lineHeight: 1.5 }}>{tip.descriptionVi}</p>
              {tip.evidence && <p style={{ fontSize: 10, color: '#94a3b8', margin: '4px 0 0' }}>📚 {tip.evidence}</p>}
            </div>
          ))}
        </div>
      )}

      {/* ═══ TAB: BOOKS & APPS ═══ */}
      {activeTab === 'tools' && (
        <div>
          <h4 style={{ fontSize: 14, color: '#f9d423', margin: '0 0 8px' }}>📚 Sách luyện thi được khuyên dùng ({selectedLevel.toUpperCase()})</h4>
          {RECOMMENDED_BOOKS.filter(b => b.levels.includes(selectedLevel)).map((book, i) => (
            <div key={i} style={cardStyle()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <h5 style={{ margin: 0, fontSize: 13, color: '#fff' }}>{book.title}</h5>
                  <p style={{ margin: '2px 0', fontSize: 11, color: '#a0aec0' }}>{book.publisher}</p>
                  <p style={{ margin: '2px 0', fontSize: 12, color: '#e2e8f0' }}>{book.bestForVi}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#f9d423', fontSize: 12 }}>{'★'.repeat(book.rating)}{'☆'.repeat(5 - book.rating)}</div>
                  <span style={{ fontSize: 10, color: book.free ? '#68d391' : '#a0aec0' }}>
                    {book.free ? '✅ Miễn phí' : '💰 Tham khảo'}
                  </span>
                </div>
              </div>
              {book.url && (
                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 11, color: '#63b3ed', textDecoration: 'none', display: 'inline-block', marginTop: 4 }}
                >
                  🔗 Mở nguồn Cambridge →
                </a>
              )}
            </div>
          ))}

          <h4 style={{ fontSize: 14, color: '#68d391', margin: '16px 0 8px' }}>📱 App luyện thi bổ trợ</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {RECOMMENDED_APPS.map((app, i) => (
              <div key={i} style={{ ...cardStyle(), padding: 10, textAlign: 'center' }}>
                <h5 style={{ margin: 0, fontSize: 12, color: '#fff' }}>{app.name}</h5>
                <p style={{ margin: '3px 0', fontSize: 10, color: '#a0aec0' }}>{app.platform}</p>
                <p style={{ margin: '3px 0', fontSize: 11, color: '#e2e8f0' }}>{app.bestForVi}</p>
                <span style={{ fontSize: 10, color: app.free ? '#68d391' : '#d6bcfa' }}>
                  {app.free ? '✅ Free' : '💎 Trả phí'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ TAB: FREE RESOURCES ═══ */}
      {activeTab === 'resources' && (
        <div>
          <h4 style={{ fontSize: 14, color: '#fc8181', margin: '0 0 8px' }}>🎬 Kênh YouTube học tiếng Anh miễn phí</h4>
          {YOUTUBE_CHANNELS.map((ch, i) => (
            <a
              key={i}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...cardStyle(), display: 'block', textDecoration: 'none', color: '#fff', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h5 style={{ margin: 0, fontSize: 13 }}>▶️ {ch.name}</h5>
                  <p style={{ margin: '2px 0', fontSize: 11, color: '#a0aec0' }}>{ch.subscribers} subscribers</p>
                </div>
                <span style={{ fontSize: 10, color: '#68d391' }}>✅ Free</span>
              </div>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: '#e2e8f0' }}>{ch.bestForVi}</p>
            </a>
          ))}

          <h4 style={{ fontSize: 14, color: '#63b3ed', margin: '16px 0 8px' }}>📄 Tài liệu chính thức từ Cambridge</h4>
          {relevantExams.map(exam => (
            <div key={exam.id}>
              <h5 style={{ fontSize: 13, color: '#f9d423', margin: '8px 0 4px' }}>{exam.name}</h5>
              {[...exam.officialResources, ...exam.communityResources].map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...cardStyle(), display: 'block', textDecoration: 'none', color: '#fff', padding: 10 }}
                >
                  <div style={{ fontSize: 12, fontWeight: 600 }}>
                    {r.type === 'official_sample' ? '📄' : r.type === 'video' ? '🎬' : r.type === 'app' ? '📱' : r.type === 'wordlist' ? '📖' : '🌐'} {r.titleVi}
                  </div>
                  <div style={{ fontSize: 10, color: '#a0aec0', marginTop: 2 }}>
                    {r.free ? '✅ Miễn phí' : '💰 Trả phí'} • {r.url.replace(/https?:\/\//, '').split('/')[0]}
                  </div>
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
