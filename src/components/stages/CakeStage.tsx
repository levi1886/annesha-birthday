import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';
import { GiftConfig } from '../../types/gift';
import { sound } from '../../utils/audio';

interface CakeStageProps {
  config: GiftConfig;
  onNext: () => void;
}

export const CakeStage: React.FC<CakeStageProps> = ({ config, onNext }) => {
  const [bakingPhase, setBakingPhase] = useState<'baking' | 'lit' | 'blown'>('baking');

  useEffect(() => {
    // 1.5 seconds in: candle gets lit, confetti bursts
    const timer = setTimeout(() => {
      setBakingPhase('lit');
      sound.playChime();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF69B4', '#FFA07A', '#FFFFFF'],
      });
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  const handleBlowCandle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (bakingPhase !== 'lit') return;

    sound.playCandleBlow();
    setBakingPhase('blown');

    // Celebratory confetti shower
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#FF69B4', '#9D7BFF', '#4DE1C1', '#FFD700', '#FFA07A'],
    });

    setTimeout(() => {
      sound.playChime();
    }, 400);
  };

  const handleScreenClick = () => {
    if (bakingPhase === 'blown') {
      sound.playTap();
      onNext();
    } else if (bakingPhase === 'lit') {
      handleBlowCandle({ stopPropagation: () => {} } as React.MouseEvent);
    }
  };

  return (
    <div
      onClick={handleScreenClick}
      className="relative w-full h-full flex flex-col items-center justify-between py-6 sm:py-8 px-6 select-none overflow-hidden bg-gradient-to-b from-[#1C112B] via-[#2A183D] to-[#160B24] text-neutral-100 cursor-pointer"
    >
      {/* Night Sky Stars & Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: i % 4 === 0 ? 3 : 1.5,
              height: i % 4 === 0 ? 3 : 1.5,
              top: `${(i * 17) % 95}%`,
              left: `${(i * 23) % 94}%`,
              animationDelay: `${(i * 0.3) % 3}s`,
              animationDuration: `${2 + (i % 3)}s`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      {/* Header title */}
      <motion.div
        className="text-center z-10 pt-2 shrink-0"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-rose-100 flex items-center justify-center gap-2">
          <span>{config.cakeTitle}</span>
        </h2>
      </motion.div>

      {/* Cake Container — flex-1 centers it in remaining space */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 min-h-0 my-2">
        {/* Candle */}
        <div className="relative flex flex-col items-center mb-1 shrink-0">
          {/* Flame & Glow */}
          <AnimatePresence>
            {bakingPhase === 'lit' && (
              <motion.div
                key="flame"
                onClick={handleBlowCandle}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.2, opacity: 0, y: -20 }}
                className="relative -mb-1 flex flex-col items-center cursor-pointer group"
                title="Tap to blow out!"
              >
                {/* Radial golden flame glow */}
                <div className="absolute -inset-4 rounded-full bg-amber-400/30 blur-md pointer-events-none animate-pulse" />

                {/* Animated flame SVG */}
                <div className="w-6 h-9 animate-flicker">
                  <svg viewBox="0 0 24 36" className="w-full h-full">
                    <defs>
                      <radialGradient id="flameGrad" cx="50%" cy="80%" r="70%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="25%" stopColor="#FFF176" />
                        <stop offset="65%" stopColor="#FF9800" />
                        <stop offset="100%" stopColor="#E65100" />
                      </radialGradient>
                    </defs>
                    <path
                      d="M12 2 C10 10 5 16 5 24 C5 30 8 34 12 34 C16 34 19 30 19 24 C19 16 14 10 12 2 Z"
                      fill="url(#flameGrad)"
                    />
                  </svg>
                </div>
              </motion.div>
            )}

            {/* Smoke puff when blown */}
            {bakingPhase === 'blown' && (
              <motion.div
                key="smoke"
                initial={{ opacity: 0.8, y: 0, scale: 0.8 }}
                animate={{ opacity: 0, y: -30, scale: 2 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="w-4 h-6 text-neutral-400/60 -mb-1"
              >
                <Sparkles className="w-full h-full text-amber-200" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Candle stick */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 38, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="w-3 rounded-t-sm shadow-md flex flex-col items-center justify-between overflow-hidden"
            style={{
              background: 'repeating-linear-gradient(45deg, #FFF9C4, #FFF9C4 5px, #FF80AB 5px, #FF80AB 10px)',
            }}
          >
            {/* Candle wick */}
            <div className="w-0.5 h-1.5 bg-neutral-800 -mt-1" />
          </motion.div>
        </div>

        {/* Layer Cake with Vanilla Drips — responsive width */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 14, stiffness: 120, delay: 0.2 }}
          className="relative flex flex-col items-center shrink-0"
        >
          {/* Top Layer with Cream Drips */}
          <div className="relative w-[clamp(200px,60vw,224px)] h-[clamp(60px,10vh,80px)] rounded-2xl bg-[#4A2818] shadow-2xl overflow-hidden border border-[#5D3421] flex flex-col justify-between">
            {/* White dripping vanilla frosting */}
            <div className="relative w-full">
              <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="w-full h-8 drop-shadow-sm">
                <path
                  d="M0 0 L200 0 L200 12 C185 14, 180 28, 170 28 C160 28, 155 12, 145 12 C135 12, 130 32, 120 32 C110 32, 105 15, 95 15 C85 15, 80 26, 70 26 C60 26, 55 10, 45 10 C35 10, 30 22, 20 22 C10 22, 5 12, 0 12 Z"
                  fill="#FFF8E7"
                />
              </svg>
            </div>

            {/* Cake details: sponge texture line & filling */}
            <div className="w-full h-2 bg-[#E91E63]/40 my-auto shadow-inner" />

            {/* Base plate shadow */}
            <div className="w-full h-3 bg-[#381E12]" />
          </div>

          {/* Bottom Cake Stand / Plate */}
          <div className="w-[clamp(220px,65vw,256px)] h-3.5 bg-gradient-to-r from-neutral-200 via-white to-neutral-200 rounded-full shadow-lg -mt-1 border-t border-white" />
          <div className="w-24 h-4 bg-gradient-to-b from-neutral-300 to-neutral-400 rounded-b-lg shadow-md -mt-0.5" />
        </motion.div>
      </div>

      {/* Subtitle / Wish Prompt */}
      <motion.div
        className="text-center z-10 flex flex-col items-center max-w-xs shrink-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {bakingPhase === 'baking' && (
          <p className="text-sm font-medium text-purple-200/80 animate-pulse">
            {config.cakeSubtitle}
          </p>
        )}

        {bakingPhase === 'lit' && (
          <div className="flex flex-col items-center gap-1.5">
            <h3 className="text-lg sm:text-xl font-bold text-amber-200 font-editorial">
              Happy Birthday, Kishmish (Annesha)!
            </h3>
            <p className="text-sm font-medium text-rose-300 flex items-center gap-1">
              <span>Make a wish 🕯️ (tap flame to blow)</span>
            </p>
          </div>
        )}

        {bakingPhase === 'blown' && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-1.5"
          >
            <h3 className="text-lg sm:text-xl font-bold text-emerald-300">
              Wish Made, Kishmish! ✨
            </h3>
            <p className="text-xs text-neutral-300 font-medium">
              May every single dream of yours come true with Shubham by your side.
            </p>
            <span className="text-xs text-rose-300/80 mt-2 font-medium animate-pulse">
              tap anywhere to continue
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Bottom indicator */}
      <div className="z-10 pb-1 shrink-0">
        {bakingPhase === 'lit' && (
          <span className="text-[11px] text-neutral-400">
            tap anywhere to blow out the candle
          </span>
        )}
      </div>
    </div>
  );
};
