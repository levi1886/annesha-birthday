import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { RotateCcw, Heart, Sparkles, Send } from 'lucide-react';
import { GiftConfig } from '../../types/gift';
import { sound } from '../../utils/audio';

interface FinaleStageProps {
  config: GiftConfig;
  onRestart: () => void;
}

export const FinaleStage: React.FC<FinaleStageProps> = ({
  config,
  onRestart,
}) => {
  const [sentLove, setSentLove] = useState(false);

  const fireCelebrationConfetti = () => {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#FF69B4', '#FFD700', '#FFA07A'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#9D7BFF', '#4DE1C1', '#FFFFFF'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  useEffect(() => {
    sound.playChime();
    fireCelebrationConfetti();
  }, []);

  const handleSendLove = () => {
    sound.playChime();
    fireCelebrationConfetti();
    setSentLove(true);
    setTimeout(() => setSentLove(false), 3500);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between py-5 sm:py-7 px-5 sm:px-6 select-none overflow-hidden bg-gradient-to-b from-[#1C0E2D] via-[#2A143F] to-[#120721] text-neutral-100">
      {/* Background Starry Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-200/50 animate-twinkle"
            style={{
              width: 2,
              height: 2,
              top: `${(i * 17) % 96}%`,
              left: `${(i * 23) % 94}%`,
            }}
          />
        ))}
      </div>

      {/* Top celebratory title */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 14 }}
        className="text-center z-10 shrink-0"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-200 text-xs font-semibold tracking-wider uppercase mb-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
          <span>My Sweet Kishmish</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase font-editorial drop-shadow-md">
          HAPPY BIRTHDAY
        </h1>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 font-editorial mt-0.5">
          Kishmish!
        </h2>
        <span className="block text-sm font-semibold text-rose-300/90 font-sans mt-0.5">
          (Annesha 💖)
        </span>
      </motion.div>

      {/* Cute Celebration Mascot Badge */}
      <motion.div
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 12, stiffness: 100, delay: 0.15 }}
        className="relative z-10 flex flex-col items-center justify-center flex-1 min-h-0 my-2"
      >
        {/* Glow halo */}
        <div className="absolute -inset-6 rounded-full bg-pink-500/20 blur-xl pointer-events-none" />

        {/* Mascot badge */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-pink-500/25 via-amber-400/20 to-purple-500/25 border-2 border-white/20 p-2 backdrop-blur-md flex items-center justify-center shadow-2xl">
          <div className="w-20 h-20 sm:w-28 sm:h-28 relative">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              {/* Cat Body */}
              <ellipse cx="50" cy="65" rx="30" ry="24" fill="#F8BBD0" />
              <ellipse cx="50" cy="46" rx="26" ry="22" fill="#FFFFFF" />
              {/* Ears */}
              <polygon points="28,32 36,15 44,28" fill="#FFFFFF" />
              <polygon points="32,30 36,18 41,27" fill="#F48FB1" />
              <polygon points="56,28 64,15 72,32" fill="#FFFFFF" />
              <polygon points="59,27 64,18 68,30" fill="#F48FB1" />
              {/* Cool Red Baseball Cap */}
              <path d="M30 30 Q50 18 70 30 L66 22 Q50 14 34 22 Z" fill="#D32F2F" />
              <path d="M58 28 Q80 26 84 32 Q74 36 58 32 Z" fill="#B71C1C" />
              <text x="47" y="26" fill="white" fontSize="7" fontWeight="bold">SJ</text>
              {/* Face */}
              <ellipse cx="42" cy="45" rx="3.5" ry="4" fill="#212121" />
              <ellipse cx="58" cy="45" rx="3.5" ry="4" fill="#212121" />
              <circle cx="43" cy="44" r="1.2" fill="white" />
              <circle cx="59" cy="44" r="1.2" fill="white" />
              {/* Cute Pink Cheeks */}
              <circle cx="36" cy="49" r="4" fill="#FF80AB" opacity="0.6" />
              <circle cx="64" cy="49" r="4" fill="#FF80AB" opacity="0.6" />
              {/* Nose & Mouth */}
              <polygon points="48,49 52,49 50,51" fill="#FF4081" />
              <path d="M47 52 Q50 55 53 52" fill="none" stroke="#212121" strokeWidth="1.2" />
              {/* Flower Bouquet in paws */}
              <circle cx="38" cy="62" r="5" fill="#E91E63" />
              <circle cx="45" cy="58" r="6" fill="#FF4081" />
              <circle cx="52" cy="60" r="5" fill="#FF80AB" />
              <circle cx="45" cy="64" r="5" fill="#FFD54F" />
              <circle cx="45" cy="64" r="2" fill="#FF6F00" />
            </svg>
          </div>
        </div>

        {/* Sender love tag */}
        <p className="text-xs font-semibold text-amber-200/95 mt-3 flex items-center gap-1.5">
          <span>Made with all my heart, just for you — {config.senderName} ❤️</span>
        </p>
        <span className="text-[11px] text-pink-200/70 italic mt-0.5">
          "Your past is gone. I am your present & your forever future."
        </span>
      </motion.div>

      {/* Action Controls */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 w-full max-w-sm flex flex-col gap-2.5 shrink-0"
      >
        {/* Interactive Button: Send Love to Shubham */}
        <button
          onClick={handleSendLove}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 text-white font-bold text-sm tracking-wide shadow-xl shadow-pink-500/30 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer group"
        >
          <Heart className="w-5 h-5 text-white fill-white group-hover:scale-125 transition-transform" />
          <span>{sentLove ? 'Love & Hugs Sent to Shubham! ❤️' : 'Send Love to Shubham 💖'}</span>
        </button>

        {/* Replay Button */}
        <button
          onClick={() => {
            sound.playTap();
            onRestart();
          }}
          className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-neutral-200 hover:text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
          <span>Replay Our Journey</span>
        </button>
      </motion.div>
    </div>
  );
};
