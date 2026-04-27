import React, { useEffect, useState } from 'react';
import { Shield, ShieldAlert, Crosshair, Star } from 'lucide-react';

interface BaseDefenseCardProps {
    hp: number;
    maxHp?: number;
    ammo: number;
    score: number;
    isCorrect?: boolean | null;
    showResult?: boolean;
    children: React.ReactNode;
}

export function BaseDefenseCard({
    hp,
    maxHp = 3,
    ammo,
    score,
    isCorrect,
    showResult,
    children,
}: BaseDefenseCardProps) {
    const [shake, setShake] = useState(false);
    const [fire, setFire] = useState(false);

    useEffect(() => {
        if (showResult !== undefined && showResult) {
            if (isCorrect) {
                setFire(true);
                setTimeout(() => setFire(false), 800);
            } else {
                setShake(true);
                setTimeout(() => setShake(false), 500);
            }
        }
    }, [showResult, isCorrect]);

    return (
        <div className={`relative overflow-hidden rounded-xl border-2 border-slate-700 bg-slate-900 text-white ${shake ? 'animate-shake' : ''}`}>

            {/* Top HUD */}
            <div className="flex justify-between items-center bg-slate-800 p-3 border-b border-slate-700">
                <div className="flex gap-2 items-center">
                    {Array.from({ length: maxHp }).map((_, i) => (
                        <div key={i}>
                            {i < hp ? (
                                <Shield size={20} className="text-green-400 fill-green-400" />
                            ) : (
                                <ShieldAlert size={20} className="text-red-500" />
                            )}
                        </div>
                    ))}
                    <span className="text-sm font-bold ml-2 text-slate-300">BASE HP</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-yellow-400">
                        <Crosshair size={18} />
                        <span className="font-mono font-bold">{ammo} Ammo</span>
                    </div>
                    <div className="flex items-center gap-1 text-blue-400">
                        <Star size={18} />
                        <span className="font-mono font-bold">{score} XP</span>
                    </div>
                </div>
            </div>

            {/* Game Screen Background */}
            <div className="relative p-6 bg-slate-900 border-b border-slate-700 h-32 overflow-hidden flex flex-col justify-end items-center">

                {/* Turret */}
                <div className="relative z-10 text-4xl">
                    🏰
                    {fire && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-4">
                            <div className="animate-bounce text-yellow-300 text-2xl">🔥🚀</div>
                        </div>
                    )}
                </div>

                {/* Incoming enemy indication (when not showing result) */}
                {!showResult && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-2xl animate-pulse">
                        🛸 Incoming!
                    </div>
                )}
                {showResult && !isCorrect && (
                    <div className="absolute inset-0 bg-red-500/20 animate-pulse pointer-events-none" />
                )}
            </div>

            {/* Exercise Content Area */}
            <div className="p-5 bg-white text-slate-900">
                {children}
            </div>

            <style jsx>{`
                .animate-shake {
                    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                }
                @keyframes shake {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                    40%, 60% { transform: translate3d(4px, 0, 0); }
                }
            `}</style>
        </div>
    );
}
