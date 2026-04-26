'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/stores/app-store';
import { generateId } from '@/lib/utils';
import type { ParentRole, LearningPathway, SafetyLevel } from '@/types';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const STEPS = ['Phụ huynh', 'Hồ sơ con', 'Sở thích', 'An toàn', 'Hoàn tất'];

export default function OnboardingPage() {
    const router = useRouter();
    const completeOnboarding = useAppStore((s) => s.completeOnboarding);
    const [step, setStep] = useState(0);

    // Parent fields
    const [parentName, setParentName] = useState('');
    const [parentRole, setParentRole] = useState<ParentRole>('father');

    // Child fields
    const [childName, setChildName] = useState('');
    const [birthYear, setBirthYear] = useState(2020);
    const [grade, setGrade] = useState(1);
    const [pathway, setPathway] = useState<LearningPathway>('vietnam_public');

    // Interests
    const [interests, setInterests] = useState<string[]>([]);
    const [strengths, setStrengths] = useState('');
    const [challenges, setChallenges] = useState('');

    // Safety
    const [safetyLevel, setSafetyLevel] = useState<SafetyLevel>('under_13');

    const allInterests = [
        'Toán học', 'Khoa học', 'Đọc sách', 'Vẽ tranh', 'Lego / Xây dựng',
        'Công nghệ', 'Thể thao', 'Âm nhạc', 'Nấu ăn', 'Thiên nhiên',
        'Lịch sử', 'Tiếng Anh', 'Viết truyện', 'Robot',
    ];

    const toggleInterest = (item: string) => {
        setInterests((prev) =>
            prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
    };

    const handleSkip = () => {
        const parentId = generateId();
        const childId = generateId();

        completeOnboarding(
            {
                id: parentId,
                name: 'Ba Henry (Test)',
                role: 'father',
                notificationPreferences: ['daily_summary', 'weekly_review'],
                coLearningTimeAvailable: 15,
                valuesPreferences: [],
            },
            {
                id: childId,
                nameOrNickname: 'Henry (Test)',
                birthYear: 2020,
                gradeLevel: 1,
                locationContext: 'TP.HCM',
                primaryLanguage: 'vi',
                secondaryLanguage: 'en',
                learningPathway: 'vietnam_public',
                parentIds: [parentId],
                safetyLevel: 'under_13',
                interests: ['Khoa học', 'Lego / Xây dựng', 'Công nghệ'],
                strengths: ['Tò mò', 'Sáng tạo'],
                challenges: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
        );

        router.push('/');
    };

    const handleComplete = () => {
        const parentId = generateId();
        const childId = generateId();

        completeOnboarding(
            {
                id: parentId,
                name: parentName || 'Ba/Mẹ',
                role: parentRole,
                notificationPreferences: ['daily_summary', 'weekly_review'],
                coLearningTimeAvailable: 15,
                valuesPreferences: [],
            },
            {
                id: childId,
                nameOrNickname: childName || 'Henry',
                birthYear,
                gradeLevel: grade,
                locationContext: 'TP.HCM',
                primaryLanguage: 'vi',
                secondaryLanguage: 'en',
                learningPathway: pathway,
                parentIds: [parentId],
                safetyLevel,
                interests,
                strengths: strengths.split(',').map((s) => s.trim()).filter(Boolean),
                challenges: challenges.split(',').map((s) => s.trim()).filter(Boolean),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
        );

        router.push('/');
    };

    return (
        <div className="page-container" style={{ paddingTop: '2rem', background: 'var(--color-bg-warm)' }}>
            <div className="page-header">
                <h1 className="page-title">Thiết lập hồ sơ</h1>
                <p className="page-subtitle">Bước {step + 1} / {STEPS.length}</p>
            </div>

            {/* Step indicator */}
            <div className="step-indicator">
                {STEPS.map((_, idx) => (
                    <div key={idx} className={`step-dot ${idx === step ? 'active' : idx < step ? 'done' : ''}`} />
                ))}
            </div>

            <div className="card animate-fade-in" key={step} style={{ maxWidth: '480px', margin: '0 auto' }}>
                {step === 0 && (
                    <div>
                        <h2 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '1.5rem' }}>Thông tin phụ huynh</h2>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Tên ba/mẹ</label>
                            <input className="input-field" placeholder="Ví dụ: Anh Long" value={parentName} onChange={(e) => setParentName(e.target.value)} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Vai trò</label>
                            <select className="select-field" value={parentRole} onChange={(e) => setParentRole(e.target.value as ParentRole)}>
                                <option value="father">Ba</option>
                                <option value="mother">Mẹ</option>
                                <option value="guardian">Người giám hộ</option>
                            </select>
                        </div>
                    </div>
                )}

                {step === 1 && (
                    <div>
                        <h2 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '1.5rem' }}>Hồ sơ con</h2>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Tên / Biệt danh</label>
                            <input className="input-field" placeholder="Ví dụ: Henry" value={childName} onChange={(e) => setChildName(e.target.value)} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Năm sinh</label>
                                <input className="input-field" type="number" min={2008} max={2022} value={birthYear} onChange={(e) => setBirthYear(Number(e.target.value))} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Lớp</label>
                                <input className="input-field" type="number" min={1} max={12} value={grade} onChange={(e) => setGrade(Number(e.target.value))} />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Chương trình học</label>
                            <select className="select-field" value={pathway} onChange={(e) => setPathway(e.target.value as LearningPathway)}>
                                <option value="vietnam_public">Chương trình Việt Nam</option>
                                <option value="bilingual">Song ngữ</option>
                                <option value="cambridge">Cambridge</option>
                                <option value="ib">IB</option>
                                <option value="us_ap">US AP</option>
                                <option value="custom">Tùy chỉnh</option>
                            </select>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h2 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '1rem' }}>Sở thích của con</h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>Chọn những hoạt động con yêu thích</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                            {allInterests.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => toggleInterest(item)}
                                    className={`badge ${interests.includes(item) ? 'badge-primary' : ''}`}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        cursor: 'pointer',
                                        border: interests.includes(item) ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                                        background: interests.includes(item) ? 'rgba(99, 102, 241, 0.1)' : 'white',
                                        borderRadius: 'var(--radius-full)',
                                        fontSize: '0.85rem',
                                        fontWeight: 600,
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Điểm mạnh (phân cách bằng dấu phẩy)</label>
                            <input className="input-field" placeholder="Ví dụ: tò mò, kiên nhẫn, thích đọc sách" value={strengths} onChange={(e) => setStrengths(e.target.value)} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>Thách thức (phân cách bằng dấu phẩy)</label>
                            <input className="input-field" placeholder="Ví dụ: dễ mất tập trung, chưa kiên nhẫn viết" value={challenges} onChange={(e) => setChallenges(e.target.value)} />
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h2 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '1rem' }}>Cài đặt an toàn</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {(
                                [
                                    { value: 'under_13', label: 'Dưới 13 tuổi', desc: 'AI chỉ dùng trong bài học, không chat tự do. Ba mẹ xem được mọi hoạt động AI.' },
                                    { value: 'teen_13_15', label: '13-15 tuổi', desc: 'Chat AI được phép trong bài học. Ba mẹ vẫn xem được metadata.' },
                                    { value: 'teen_16_18', label: '16-18 tuổi', desc: 'AI hỗ trợ nâng cao. Không gian bại, không nguy hiểm.' },
                                ] as const
                            ).map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setSafetyLevel(opt.value)}
                                    className="card"
                                    style={{
                                        textAlign: 'left',
                                        cursor: 'pointer',
                                        border: safetyLevel === opt.value ? '2px solid var(--color-primary)' : '2px solid var(--color-border-light)',
                                        background: safetyLevel === opt.value ? 'rgba(99, 102, 241, 0.04)' : 'white',
                                    }}
                                >
                                    <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{opt.label}</div>
                                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>{opt.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                        <h2 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.5rem' }}>Sẵn sàng!</h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
                            Hồ sơ của <strong>{childName || 'Henry'}</strong> đã được tạo. Hãy bắt đầu hành trình học tập cùng con!
                        </p>
                        <div className="card" style={{ textAlign: 'left', background: 'var(--color-bg-child)' }}>
                            <div style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Tóm tắt:</div>
                            <ul style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', paddingLeft: '1.25rem' }}>
                                <li>Tên: {childName || 'Henry'}</li>
                                <li>Năm sinh: {birthYear} (Lớp {grade})</li>
                                <li>Chương trình: {pathway}</li>
                                <li>An toàn: {safetyLevel}</li>
                                <li>Sở thích: {interests.join(', ') || 'Chưa chọn'}</li>
                            </ul>
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                    <button
                        className="btn btn-ghost"
                        onClick={() => setStep(Math.max(0, step - 1))}
                        disabled={step === 0}
                        style={{ opacity: step === 0 ? 0.3 : 1 }}
                    >
                        <ArrowLeft size={18} /> Quay lại
                    </button>

                    {step < STEPS.length - 1 ? (
                        <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
                            Tiếp theo <ArrowRight size={18} />
                        </button>
                    ) : (
                        <button className="btn btn-success" onClick={handleComplete}>
                            <Check size={18} /> Hoàn tất
                        </button>
                    )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
                    <button className="btn btn-ghost" onClick={handleSkip} style={{ color: 'var(--color-primary)', fontSize: '0.9rem' }}>
                        🚀 Skip Onboarding (Test Mode)
                    </button>
                </div>
            </div>
        </div>
    );
}
