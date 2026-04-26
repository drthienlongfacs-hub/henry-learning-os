import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateId(): string {
    return crypto.randomUUID ? crypto.randomUUID() :
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
}

export function getAgeBand(birthYear: number): string {
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    if (age <= 8) return '6-8';
    if (age <= 11) return '9-11';
    if (age <= 15) return '12-15';
    return '16-18';
}

export function getAge(birthYear: number): number {
    return new Date().getFullYear() - birthYear;
}

export function formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export function getMoodEmoji(mood: number): string {
    const emojis = ['😔', '😐', '🙂', '😊', '🤩'];
    return emojis[Math.max(0, Math.min(4, mood - 1))];
}

export function getEnergyLabel(energy: number): string {
    const labels = ['Rất mệt', 'Hơi mệt', 'Bình thường', 'Khỏe', 'Tràn đầy năng lượng'];
    return labels[Math.max(0, Math.min(4, energy - 1))];
}

export function getSupportLevelLabel(level: number): string {
    const labels = [
        'Không hỗ trợ (Examiner)',
        'Gợi ý nhẹ',
        'Gợi ý vừa',
        'Giải thích khái niệm',
        'Ví dụ mẫu',
        'Lời giải đầy đủ',
    ];
    return labels[Math.max(0, Math.min(5, level))];
}
