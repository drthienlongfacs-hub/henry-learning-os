'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export function VisualMathManipulative({ question }: { question: string }) {
    // Parse the basic math string, e.g., "5 + 3 = ?"
    const additionMatch = question.match(/(\d+)\s*\+\s*(\d+)/);
    const subMatch = question.match(/(\d+)\s*-\s*(\d+)/);

    if (additionMatch) {
        const a = parseInt(additionMatch[1], 10);
        const b = parseInt(additionMatch[2], 10);
        return <BlocksRenderer a={a} b={b} type="add" question={question} />;
    }

    if (subMatch) {
        const a = parseInt(subMatch[1], 10);
        const b = parseInt(subMatch[2], 10);
        return <BlocksRenderer a={a} b={b} type="sub" question={question} />;
    }

    // Fallback if it's not a generic + or - equation
    return <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{question}</h3>;
}

function BlocksRenderer({ a, b, type, question }: { a: number, b: number, type: 'add' | 'sub', question: string }) {
    const [poppedCount, setPoppedCount] = useState(0);

    const handlePop = () => {
        setPoppedCount(c => c + 1);
    };

    // Cap at 20 to avoid freezing the UI for big numbers
    const renderBlocks = (count: number, color: string, isCrossedOut = false) => {
        const capped = Math.min(count, 50);
        return Array.from({ length: capped }).map((_, i) => (
            <motion.div
                key={`\${color}-\${i}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={type === 'sub' && isCrossedOut ? handlePop : undefined}
                style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    background: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    position: 'relative',
                    opacity: isCrossedOut ? 0.4 : 1,
                }}
            >
                {isCrossedOut && (
                    <div style={{ position: 'absolute', width: '100%', height: '2px', background: 'red', transform: 'rotate(45deg)' }} />
                )}
            </motion.div>
        ));
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>{question}</h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '1rem', background: 'rgba(255,255,255,0.5)', padding: '1.5rem', borderRadius: '1rem' }}>
                {type === 'add' ? (
                    <>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {renderBlocks(a, 'var(--color-primary)')}
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#aaa', alignSelf: 'center' }}>+</div>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {renderBlocks(b, 'var(--color-secondary)')}
                        </div>
                    </>
                ) : (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', position: 'relative' }}>
                        {renderBlocks(a - b, 'var(--color-primary)')}
                        {renderBlocks(b, 'var(--color-primary)', true)}
                    </div>
                )}
            </div>

            {type === 'sub' && (
                <p style={{ fontSize: '0.85rem', color: '#666' }}>💡 Ấn vào các khối gạch chéo để loại bỏ chúng nếu con muốn đếm số còn lại!</p>
            )}
            {type === 'add' && a + b <= 20 && (
                <p style={{ fontSize: '0.85rem', color: '#666' }}>💡 Con có thể dùng tay đếm số lượng khối ở trên màng hình nhé!</p>
            )}
        </div>
    );
}
