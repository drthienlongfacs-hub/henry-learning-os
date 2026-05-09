'use client';
import { useState } from 'react';
import { CAMBRIDGE_EXAMS, LEARNING_STRATEGIES, EXAM_PATHWAY } from '@/data/cambridge-exam-prep';

export default function ExamPrepGuide({ grade = 1 }: { grade?: number }) {
  const [activeTab, setActiveTab] = useState<'exams' | 'strategies' | 'resources'>('exams');
  const [expandedExam, setExpandedExam] = useState<string | null>(null);

  const pathway = EXAM_PATHWAY[grade as keyof typeof EXAM_PATHWAY];
  const relevantExams = CAMBRIDGE_EXAMS.filter(e => e.gradeMapping.includes(grade));
  const relevantStrategies = LEARNING_STRATEGIES.filter(s => s.gradeRange.includes(grade));

  const tabs = [
    { id: 'exams' as const, label: '📝 Exam Structure', labelVi: '📝 Cấu trúc thi' },
    { id: 'strategies' as const, label: '🧠 Learning Tips', labelVi: '🧠 Chiến lược học' },
    { id: 'resources' as const, label: '📚 Free Resources', labelVi: '📚 Tài nguyên miễn phí' },
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      borderRadius: 20,
      padding: 24,
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h2 style={{
          fontSize: 24,
          fontWeight: 800,
          background: 'linear-gradient(90deg, #f9d423, #ff4e50)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0,
        }}>
          🏆 Cambridge Exam Prep — Grade {grade}
        </h2>
        {pathway && (
          <p style={{ color: '#a0aec0', fontSize: 14, marginTop: 6 }}>
            Preparing: <strong style={{ color: '#63b3ed' }}>{pathway.preparing}</strong>
            {' → Next: '}<strong style={{ color: '#68d391' }}>{pathway.next}</strong>
          </p>
        )}
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '8px 16px',
              borderRadius: 12,
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
              background: activeTab === t.id
                ? 'linear-gradient(135deg, #667eea, #764ba2)'
                : 'rgba(255,255,255,0.08)',
              color: '#fff',
              transition: 'all 0.2s',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Exam Structure Tab */}
      {activeTab === 'exams' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {relevantExams.map(exam => (
            <div key={exam.id} style={{
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 16,
              padding: 16,
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <div
                onClick={() => setExpandedExam(expandedExam === exam.id ? null : exam.id)}
                style={{ cursor: 'pointer' }}
              >
                <h3 style={{ margin: 0, fontSize: 18, color: '#f9d423' }}>
                  {exam.name} <span style={{ fontSize: 12, color: '#a0aec0' }}>({exam.cefr})</span>
                </h3>
                <p style={{ fontSize: 12, color: '#a0aec0', margin: '4px 0' }}>
                  Ages {exam.ageRange} • {exam.scoringVi}
                </p>
              </div>

              {expandedExam === exam.id && (
                <div style={{ marginTop: 12 }}>
                  {/* Exam parts table */}
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                        <th style={{ textAlign: 'left', padding: '6px 8px', color: '#63b3ed' }}>Skill</th>
                        <th style={{ textAlign: 'left', padding: '6px 8px', color: '#63b3ed' }}>Duration</th>
                        <th style={{ textAlign: 'left', padding: '6px 8px', color: '#63b3ed' }}>Parts</th>
                        <th style={{ textAlign: 'left', padding: '6px 8px', color: '#63b3ed' }}>Tasks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exam.structure.map((s, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '6px 8px', fontWeight: 600 }}>{s.skillVi}</td>
                          <td style={{ padding: '6px 8px', color: '#a0aec0' }}>{s.duration}</td>
                          <td style={{ padding: '6px 8px', color: '#a0aec0' }}>{s.parts}</td>
                          <td style={{ padding: '6px 8px', color: '#cbd5e0', fontSize: 12 }}>{s.descriptionVi}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Tips */}
                  <div style={{ marginTop: 12 }}>
                    <h4 style={{ fontSize: 14, color: '#68d391', margin: '0 0 8px' }}>💡 Mẹo thi</h4>
                    {exam.examTips.slice(0, 5).map((tip, i) => (
                      <div key={i} style={{
                        padding: '6px 10px',
                        background: 'rgba(104,211,145,0.08)',
                        borderRadius: 8,
                        marginBottom: 4,
                        fontSize: 12,
                        borderLeft: '3px solid #68d391',
                      }}>
                        {tip.tipVi}
                        {tip.evidenceBased && <span style={{ color: '#68d391', marginLeft: 6 }}>✓ Evidence-based</span>}
                      </div>
                    ))}
                  </div>

                  {/* Common mistakes */}
                  <div style={{ marginTop: 12 }}>
                    <h4 style={{ fontSize: 14, color: '#fc8181', margin: '0 0 8px' }}>⚠️ Lỗi thường gặp</h4>
                    {exam.commonMistakes.map((m, i) => (
                      <div key={i} style={{
                        padding: '6px 10px',
                        background: 'rgba(252,129,129,0.08)',
                        borderRadius: 8,
                        marginBottom: 4,
                        fontSize: 12,
                      }}>
                        <span style={{ color: '#fc8181' }}>✗ </span>{m.mistakeVi}
                        <br />
                        <span style={{ color: '#68d391' }}>→ </span>{m.fixVi}
                      </div>
                    ))}
                  </div>

                  {/* Vocab topics */}
                  <div style={{ marginTop: 12 }}>
                    <h4 style={{ fontSize: 14, color: '#d6bcfa', margin: '0 0 8px' }}>📖 Vocabulary Topics</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {exam.vocabularyTopics.map((t, i) => (
                        <span key={i} style={{
                          padding: '3px 8px',
                          background: 'rgba(214,188,250,0.12)',
                          borderRadius: 6,
                          fontSize: 11,
                          color: '#d6bcfa',
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Strategies Tab */}
      {activeTab === 'strategies' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {relevantStrategies.map(s => (
            <div key={s.id} style={{
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 14,
              padding: 14,
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <h4 style={{ margin: 0, fontSize: 15, color: '#f9d423' }}>{s.titleVi}</h4>
              <p style={{ fontSize: 13, color: '#e2e8f0', margin: '6px 0' }}>{s.descriptionVi}</p>
              <p style={{
                fontSize: 11,
                color: '#a0aec0',
                margin: 0,
                padding: '4px 8px',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: 6,
                fontStyle: 'italic',
              }}>
                📊 {s.evidence}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {relevantExams.map(exam => (
            <div key={exam.id}>
              <h4 style={{ color: '#63b3ed', fontSize: 15, margin: '0 0 8px' }}>
                {exam.name} — Official Resources
              </h4>
              {[...exam.officialResources, ...exam.communityResources].map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    padding: '10px 14px',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: 10,
                    marginBottom: 6,
                    textDecoration: 'none',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.08)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                >
                  <div style={{ fontSize: 13, fontWeight: 600 }}>
                    {r.type === 'official_sample' ? '📄' : r.type === 'video' ? '🎬' : r.type === 'app' ? '📱' : '🌐'} {r.titleVi}
                  </div>
                  <div style={{ fontSize: 11, color: '#a0aec0', marginTop: 2 }}>
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
