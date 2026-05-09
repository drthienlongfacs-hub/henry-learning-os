'use client';
import { useState } from 'react';
import {
  CAMBRIDGE_EXAMS, LEARNING_STRATEGIES, EXAM_PATHWAY,
  STUDY_PLANS, RECOMMENDED_BOOKS, YOUTUBE_CHANNELS,
  RECOMMENDED_APPS, PARENT_GUIDE, SMART_PATHS,
} from '@/data/cambridge-exam-prep';

export default function ExamPrepGuide({ grade = 1 }: { grade?: number }) {
  const [activeTab, setActiveTab] = useState<string>('smart');
  const [expandedExam, setExpandedExam] = useState<string | null>(null);
  const [expandedPath, setExpandedPath] = useState<string | null>(null);
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);

  const pathway = EXAM_PATHWAY[grade as keyof typeof EXAM_PATHWAY];
  const relevantExams = CAMBRIDGE_EXAMS.filter(e => e.gradeMapping.includes(grade));
  const currentLevel = grade <= 2 ? 'starters' : grade <= 3 ? 'movers' : 'flyers';
  const studyPlan = STUDY_PLANS.find(s => s.level === currentLevel);
  const parentTips = PARENT_GUIDE.filter(p => p.level === 'all' || p.level === currentLevel);

  const tabs = [
    { id: 'smart', label: '🧠 Học thông minh', sub: 'Smart Paths' },
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
      borderRadius: 20, padding: 20, color: '#fff',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h2 style={{
          fontSize: 22, fontWeight: 800, margin: 0,
          background: 'linear-gradient(90deg, #f9d423, #ff4e50)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          🏆 Cambridge Exam Prep — Grade {grade}
        </h2>
        {pathway && (
          <p style={{ color: '#a0aec0', fontSize: 13, marginTop: 4 }}>
            Đang ôn: <strong style={{ color: '#63b3ed' }}>{pathway.preparing}</strong>
            {' → Tiếp: '}<strong style={{ color: '#68d391' }}>{pathway.next}</strong>
          </p>
        )}
      </div>

      {/* Tab bar — scrollable */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding: '6px 12px', borderRadius: 10, border: 'none', cursor: 'pointer',
            fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
            background: activeTab === t.id ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'rgba(255,255,255,0.08)',
            color: '#fff', transition: 'all 0.2s',
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ═══ TAB: SMART LEARNING PATHS ═══ */}
      {activeTab === 'smart' && (
        <div>
          <p style={{ fontSize: 12, color: '#a0aec0', marginBottom: 12 }}>
            💡 Phương pháp học được tổng hợp từ kinh nghiệm hàng nghìn phụ huynh & giáo viên — có căn cứ khoa học
          </p>
          {SMART_PATHS.map(path => (
            <div key={path.id} style={cardStyle()}>
              <div onClick={() => setExpandedPath(expandedPath === path.id ? null : path.id)}
                style={{ cursor: 'pointer' }}>
                <h4 style={{ margin: 0, fontSize: 15, color: '#f9d423' }}>{path.titleVi}</h4>
                <p style={{ fontSize: 12, color: '#a0aec0', margin: '4px 0 0' }}>{path.descriptionVi}</p>
              </div>
              {expandedPath === path.id && (
                <div style={{ marginTop: 10 }}>
                  {path.steps.map((step, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: 10, padding: '8px 0',
                      borderBottom: i < path.steps.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                    }}>
                      <div style={{
                        minWidth: 28, height: 28, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontWeight: 700,
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
                  <div style={{ marginTop: 8, padding: '6px 10px', background: 'rgba(249,212,35,0.08)', borderRadius: 8, fontSize: 11, color: '#f9d423' }}>
                    📊 Căn cứ: {path.evidenceVi}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Quick learning strategies */}
          <h4 style={{ fontSize: 14, color: '#68d391', margin: '16px 0 8px' }}>⚡ Chiến lược học nhanh (Evidence-Based)</h4>
          {LEARNING_STRATEGIES.filter(s => s.gradeRange.includes(grade)).map(s => (
            <div key={s.id} style={cardStyle()}>
              <h5 style={{ margin: 0, fontSize: 14, color: '#f9d423' }}>{s.titleVi}</h5>
              <p style={{ fontSize: 12, color: '#e2e8f0', margin: '4px 0' }}>{s.descriptionVi}</p>
              <p style={{ fontSize: 11, color: '#a0aec0', margin: 0, padding: '3px 6px', background: 'rgba(255,255,255,0.04)', borderRadius: 4, fontStyle: 'italic' }}>
                📊 {s.evidence}
              </p>
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

          {studyPlan.phases.map((phase, pi) => (
            <div key={pi} style={{
              ...cardStyle(),
              borderLeft: `3px solid ${['#63b3ed','#68d391','#d6bcfa','#f9d423'][pi % 4]}`,
            }}>
              <div onClick={() => setExpandedPhase(expandedPhase === phase.weekRange ? null : phase.weekRange)}
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: 12, color: ['#63b3ed','#68d391','#d6bcfa','#f9d423'][pi % 4], fontWeight: 700 }}>
                    {phase.weekRange}
                  </span>
                  <h4 style={{ margin: '2px 0 0', fontSize: 14 }}>{phase.titleVi}</h4>
                </div>
                <span style={{ fontSize: 11, color: '#a0aec0', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: 6 }}>
                  {phase.dailyMinutes} phút/ngày
                </span>
              </div>
              {expandedPhase === phase.weekRange && (
                <div style={{ marginTop: 8 }}>
                  {phase.activitiesVi.map((act, ai) => (
                    <div key={ai} style={{
                      padding: '6px 10px', fontSize: 12, color: '#e2e8f0',
                      borderBottom: ai < phase.activitiesVi.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    }}>
                      ✅ {act}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <p style={{ fontSize: 11, color: '#a0aec0', textAlign: 'center', marginTop: 8 }}>
            📊 Nguồn: Cambridge Assessment — Starters ~100h, Movers ~175h, Flyers ~250h guided learning
          </p>
        </div>
      )}

      {/* ═══ TAB: EXAM STRUCTURE ═══ */}
      {activeTab === 'exams' && (
        <div>
          {relevantExams.map(exam => (
            <div key={exam.id} style={cardStyle()}>
              <div onClick={() => setExpandedExam(expandedExam === exam.id ? null : exam.id)} style={{ cursor: 'pointer' }}>
                <h3 style={{ margin: 0, fontSize: 17, color: '#f9d423' }}>
                  {exam.name} <span style={{ fontSize: 11, color: '#a0aec0' }}>({exam.cefr})</span>
                </h3>
                <p style={{ fontSize: 12, color: '#a0aec0', margin: '3px 0' }}>
                  Ages {exam.ageRange} • {exam.scoringVi}
                </p>
              </div>
              {expandedExam === exam.id && (
                <div style={{ marginTop: 10 }}>
                  {/* Summary table */}
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                    <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                      <th style={{ textAlign: 'left', padding: '5px 6px', color: '#63b3ed' }}>Kỹ năng</th>
                      <th style={{ textAlign: 'left', padding: '5px 6px', color: '#63b3ed' }}>Thời gian</th>
                      <th style={{ textAlign: 'left', padding: '5px 6px', color: '#63b3ed' }}>Phần</th>
                      <th style={{ textAlign: 'left', padding: '5px 6px', color: '#63b3ed' }}>Câu hỏi</th>
                    </tr></thead>
                    <tbody>{exam.structure.map((s, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '5px 6px', fontWeight: 600 }}>{s.skillVi}</td>
                        <td style={{ padding: '5px 6px', color: '#a0aec0' }}>{s.duration}</td>
                        <td style={{ padding: '5px 6px', color: '#a0aec0' }}>{s.parts}</td>
                        <td style={{ padding: '5px 6px', color: '#f9d423', fontWeight: 600 }}>{s.questions || '—'}</td>
                      </tr>
                    ))}</tbody>
                  </table>

                  {/* Detailed parts */}
                  {exam.structure.map((s, si) => s.detailedParts?.length ? (
                    <div key={si} style={{ marginTop: 12 }}>
                      <h4 style={{ fontSize: 13, color: '#f9d423', margin: '0 0 6px', borderBottom: '1px solid rgba(249,212,35,0.15)', paddingBottom: 3 }}>
                        📋 {s.skillVi} — Chi tiết
                      </h4>
                      {s.detailedParts.map((dp, dpi) => (
                        <div key={dpi} style={{
                          padding: '6px 10px', marginBottom: 4, background: 'rgba(255,255,255,0.03)', borderRadius: 8,
                          borderLeft: `3px solid ${s.skill === 'listening' ? '#63b3ed' : s.skill === 'reading_writing' ? '#68d391' : '#d6bcfa'}`,
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 600, fontSize: 12 }}>Part {dp.partNumber}: {dp.taskTypeVi}</span>
                            {dp.questions > 0 && <span style={{ fontSize: 10, color: '#f9d423', background: 'rgba(249,212,35,0.1)', padding: '1px 5px', borderRadius: 3 }}>{dp.questions} câu</span>}
                          </div>
                          <p style={{ fontSize: 11, color: '#cbd5e0', margin: '2px 0 0' }}>{dp.descriptionVi}</p>
                          {dp.exampleTask && <p style={{ fontSize: 10, color: '#a0aec0', margin: '2px 0 0', fontStyle: 'italic' }}>💬 {dp.exampleTask}</p>}
                          {dp.tip && <p style={{ fontSize: 10, color: '#68d391', margin: '2px 0 0' }}>💡 {dp.tip}</p>}
                        </div>
                      ))}
                    </div>
                  ) : null)}

                  {/* Common mistakes */}
                  <div style={{ marginTop: 10 }}>
                    <h4 style={{ fontSize: 13, color: '#fc8181', margin: '0 0 6px' }}>⚠️ Lỗi thường gặp</h4>
                    {exam.commonMistakes.map((m, i) => (
                      <div key={i} style={{ padding: '5px 8px', background: 'rgba(252,129,129,0.06)', borderRadius: 6, marginBottom: 3, fontSize: 11 }}>
                        <span style={{ color: '#fc8181' }}>✗ </span>{m.mistakeVi}
                        <br /><span style={{ color: '#68d391' }}>→ </span>{m.fixVi}
                      </div>
                    ))}
                  </div>

                  {/* Vocab topics */}
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
            👨‍👩‍👧 Kinh nghiệm thực tế từ hàng nghìn phụ huynh Việt Nam + nghiên cứu giáo dục quốc tế
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
              {tip.evidence && (
                <p style={{ fontSize: 10, color: '#68d391', margin: '4px 0 0', fontStyle: 'italic' }}>
                  📊 {tip.evidence}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ═══ TAB: BOOKS & APPS ═══ */}
      {activeTab === 'tools' && (
        <div>
          {/* Books */}
          <h4 style={{ fontSize: 14, color: '#f9d423', margin: '0 0 8px' }}>📚 Sách luyện thi được giáo viên khuyên dùng</h4>
          {RECOMMENDED_BOOKS.filter(b => b.levels.includes(currentLevel)).map((book, i) => (
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
                    {book.free ? '✅ Miễn phí' : '💰 Trả phí'}
                  </span>
                </div>
              </div>
              {book.url && (
                <a href={book.url} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 11, color: '#63b3ed', textDecoration: 'none', display: 'inline-block', marginTop: 4 }}>
                  🔗 Tải ngay →
                </a>
              )}
            </div>
          ))}

          {/* Apps */}
          <h4 style={{ fontSize: 14, color: '#68d391', margin: '16px 0 8px' }}>📱 App luyện thi miễn phí & trả phí</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {RECOMMENDED_APPS.map((app, i) => (
              <div key={i} style={{
                ...cardStyle(),
                padding: 10, textAlign: 'center',
              }}>
                <h5 style={{ margin: 0, fontSize: 12, color: '#fff' }}>{app.name}</h5>
                <p style={{ margin: '3px 0', fontSize: 10, color: '#a0aec0' }}>{app.platform}</p>
                <p style={{ margin: '3px 0', fontSize: 11, color: '#e2e8f0' }}>{app.bestForVi}</p>
                <span style={{ fontSize: 10, color: app.free ? '#68d391' : '#d6bcfa' }}>
                  {app.free ? '✅ Free' : '💎 Premium'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ TAB: FREE RESOURCES (YouTube + Official) ═══ */}
      {activeTab === 'resources' && (
        <div>
          {/* YouTube channels */}
          <h4 style={{ fontSize: 14, color: '#fc8181', margin: '0 0 8px' }}>🎬 Kênh YouTube học tiếng Anh miễn phí</h4>
          {YOUTUBE_CHANNELS.map((ch, i) => (
            <a key={i} href={ch.url} target="_blank" rel="noopener noreferrer"
              style={{ ...cardStyle(), display: 'block', textDecoration: 'none', color: '#fff', cursor: 'pointer' }}>
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

          {/* Official resources */}
          <h4 style={{ fontSize: 14, color: '#63b3ed', margin: '16px 0 8px' }}>📄 Tài liệu chính thức từ Cambridge</h4>
          {relevantExams.map(exam => (
            <div key={exam.id}>
              <h5 style={{ fontSize: 13, color: '#f9d423', margin: '8px 0 4px' }}>{exam.name}</h5>
              {[...exam.officialResources, ...exam.communityResources].map((r, i) => (
                <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                  style={{ ...cardStyle(), display: 'block', textDecoration: 'none', color: '#fff', padding: 10 }}>
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
