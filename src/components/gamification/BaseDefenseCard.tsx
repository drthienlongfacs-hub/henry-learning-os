import React, { useEffect, useState } from 'react';
import { Shield, ShieldAlert, Crosshair, Star, Radar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        <motion.div
            animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-2xl border border-cyan-500/50 bg-[#0B1120] text-cyan-50 shadow-[0_0_20px_rgba(6,182,212,0.15)] font-mono"
        >
            {/* Tactical Grid Background */}
            <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                backgroundPosition: 'center center',
            }} />

            {/* Top HUD */}
            <div className="relative z-10 flex justify-between items-center bg-cyan-950/80 backdrop-blur-sm p-4 border-b border-cyan-500/30 font-mono">
                <div className="flex gap-2 items-center">
                    {Array.from({ length: maxHp }).map((_, i) => (
                        <div key={i}>
                            {i < hp ? (
                                <Shield size={22} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                            ) : (
                                <ShieldAlert size={22} className="text-red-500/50" />
                            )}
                        </div>
                    ))}
                    <div className="flex flex-col ml-3">
                        <span className="text-[10px] text-cyan-500/80 tracking-widest leading-none">SYSTEM</span>
                        <span className="text-sm font-bold text-cyan-300 tracking-widest">INTEGRITY</span>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Crosshair size={20} className="text-yellow-400 opacity-80" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-yellow-500/70 tracking-widest leading-none">AMMO</span>
                            <span className="text-sm font-bold text-yellow-400 font-mono">{ammo.toString().padStart(3, '0')}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Star size={20} className="text-emerald-400 opacity-80" />
                        <div className="flex flex-col">
                            <span className="text-[10px] text-emerald-500/70 tracking-widest leading-none">SCORE</span>
                            <span className="text-sm font-bold text-emerald-400 font-mono">{score.toString().padStart(5, '0')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* CommandCenter Viewscreen */}
            <div className="relative bg-slate-950 border-b border-cyan-500/30 h-40 overflow-hidden flex flex-col justify-end items-center">

                {/* Radar Sweep Element */}
                <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex items-center justify-center">
                    <div className="w-64 h-64 rounded-full border border-cyan-500/30 relative flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full border border-cyan-500/20" />
                        <div className="w-32 h-32 rounded-full border border-cyan-500/20" />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                            className="absolute top-1/2 left-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent to-cyan-400 origin-left"
                            style={{ transform: 'translateY(-50%)' }}
                        />
                    </div>
                </div>

                {/* Base Terminal Icon */}
                <div className="relative z-10 flex flex-col items-center pb-4">
                    <Radar className="text-cyan-400 w-16 h-16 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />

                    <AnimatePresence>
                        {fire && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.5 }}
                                animate={{ opacity: 1, y: -40, scale: 1.5 }}
                                exit={{ opacity: 0, scale: 2 }}
                                className="absolute bottom-full text-yellow-300 text-3xl drop-shadow-[0_0_10px_rgba(253,224,71,0.8)]"
                            >
                                ⚡ TARGET LOCK ⚡
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Incoming Alert banner */}
                {!showResult && (
                    <motion.div
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-950/80 border border-red-500/50 text-red-400 px-4 py-1 rounded-full text-xs font-bold tracking-[0.2em] z-20 flex items-center gap-2"
                    >
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                        TACTICAL DECISION REQUIRED
                    </motion.div>
                )}

                {/* Damage flash */}
                {showResult && !isCorrect && (
                    <div className="absolute inset-0 bg-red-500/20 animate-pulse pointer-events-none z-30" />
                )}
            </div>

            {/* Exercise Content Area - Modernized */}
            <div className="relative z-10 p-6 bg-slate-900/95 backdrop-blur-md text-cyan-50 min-h-[250px]">
                {children}
            </div>

            {/* Scanlines overlay effect */}
            <div className="absolute inset-0 pointer-events-none z-50 opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
        </motion.div>
    );
}
