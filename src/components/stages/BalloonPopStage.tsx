import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight } from 'lucide-react';
import { GiftConfig } from '../../types/gift';
import { sound } from '../../utils/audio';

interface BalloonPopStageProps {
  config: GiftConfig;
  onNext: () => void;
}

export const BalloonPopStage: React.FC<BalloonPopStageProps> = ({ config, onNext }) => {
  const [poppedIds, setPoppedIds] = useState<number[]>([]);

  const handlePop = (id: number) => {
    if (poppedIds.includes(id)) return;

    sound.playPop();

    // Trigger mini confetti at pop location
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.35 },
    });

    const nextPopped = [...poppedIds, id];
    setPoppedIds(nextPopped);

    if (nextPopped.length === config.reasons.length) {
      setTimeout(() => {
        sound.playChime();
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
        });
      }, 350);
    }
  };

  const allPopped = poppedIds.length >= config.reasons.length;

  return (
    <div className="relative w-full h-full flex flex-col items-center py-4 sm:py-6 px-4 select-none overflow-hidden bg-gradient-to-b from-[#1C1129] via-[#261536] to-[#170E22] text-neutral-100">
      {/* Background Star Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/40 animate-twinkle"
            style={{
              width: 2,
              height: 2,
              top: `${(i * 18) % 96}%`,
              left: `${(i * 26) % 94}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center z-10 mb-2 max-w-xs shrink-0">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-rose-100 flex items-center justify-center gap-2">
          <span>{config.reasonsTitle}</span>
        </h2>
        <p className="text-xs text-purple-200/80 font-medium mt-1">
          {config.reasonsSubtitle}
        </p>
      </div>

      {/* Floating Balloons Arena — shrink-0 keeps them visible */}
      <div className="relative z-10 w-full max-w-sm flex items-center justify-around py-2 shrink-0" style={{ minHeight: '120px' }}>
        {config.reasons.map((reason, index) => {
          const isPopped = poppedIds.includes(reason.id);

          return (
            <div key={reason.id} className="relative flex flex-col items-center">
              <AnimatePresence>
                {!isPopped ? (
                  <motion.button
                    onClick={() => handlePop(reason.id)}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      y: [0, -10 - (index % 2) * 5, 0],
                      rotate: [0, (index % 2 === 0 ? 3 : -3), 0],
                    }}
                    exit={{
                      scale: 1.5,
                      opacity: 0,
                      filter: 'blur(4px)',
                      transition: { duration: 0.15 },
                    }}
                    transition={{
                      y: { duration: 2.5 + index * 0.4, repeat: Infinity, ease: 'easeInOut' },
                      rotate: { duration: 3 + index * 0.3, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="relative flex flex-col items-center cursor-pointer group focus:outline-none"
                    aria-label={`Pop balloon ${index + 1}`}
                  >
                    {/* Balloon Body */}
                    <div
                      className="relative w-12 sm:w-14 h-16 sm:h-18 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] shadow-lg transition-transform group-hover:brightness-110"
                      style={{
                        backgroundColor: reason.balloonColor,
                        boxShadow: `0 8px 20px -4px ${reason.balloonColor}80, inset -3px -3px 8px rgba(0,0,0,0.25), inset 3px 3px 8px rgba(255,255,255,0.45)`,
                      }}
                    >
                      {/* Highlight sheen */}
                      <div className="absolute top-2.5 left-2.5 w-3.5 h-6 rounded-full bg-white/50 -rotate-25 blur-[0.5px]" />
                    </div>

                    {/* Balloon knot */}
                    <div
                      className="w-2.5 h-1.5 -mt-0.5 rounded-b-sm"
                      style={{ backgroundColor: reason.balloonColor }}
                    />

                    {/* Balloon String */}
                    <svg className="w-4 h-8 sm:h-10 text-neutral-400/60" viewBox="0 0 16 40">
                      <path
                        d="M8 0 Q3 10, 8 20 T8 40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                    </svg>

                    <span className="text-[10px] font-bold text-white/90 bg-black/40 px-1.5 py-0.5 rounded-full -mt-2 backdrop-blur-xs">
                      #{index + 1}
                    </span>
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-10 h-10 flex items-center justify-center text-amber-300"
                  >
                    <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Revealed Reason Cards — scrollable area takes remaining space */}
      <div className="relative z-10 w-full max-w-sm flex-1 min-h-0 flex flex-col gap-2 my-1 overflow-y-auto no-scrollbar">
        <AnimatePresence>
          {config.reasons.map((reason) => {
            const isPopped = poppedIds.includes(reason.id);
            if (!isPopped) return null;

            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', damping: 18, stiffness: 140 }}
                className="relative overflow-hidden rounded-xl p-3 border border-white/15 bg-white/8 backdrop-blur-md shadow-md flex items-center justify-between gap-3 shrink-0"
              >
                {/* Left accent pill */}
                <div className="flex flex-col gap-1 text-left flex-1">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-amber-300/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{reason.numberLabel}</span>
                  </div>
                  <p className="text-sm font-semibold text-white/95 leading-snug">
                    {reason.text}
                  </p>
                </div>

                <div className="text-rose-300 shrink-0">
                  <Sparkles className="w-4 h-4 text-amber-300/90" />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {poppedIds.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-xs text-purple-300/60 italic py-4">
            Tap any balloon above to reveal a reason...
          </div>
        )}
      </div>

      {/* Completion & Next Button */}
      <div className="relative z-10 w-full max-w-sm pt-2 pb-1 shrink-0">
        {allPopped ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-2.5 w-full"
          >
            <p className="text-xs font-semibold text-amber-300 tracking-wide text-center">
              …and a thousand more reasons 💛
            </p>
            <button
              onClick={() => {
                sound.playTap();
                onNext();
              }}
              className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-pink-500/25 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Keep going 💛</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <div className="text-center text-[11px] text-neutral-400/80">
            {config.reasons.length - poppedIds.length} balloon(s) left to pop
          </div>
        )}
      </div>
    </div>
  );
};
