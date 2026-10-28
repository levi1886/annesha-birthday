import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { GiftConfig } from '../../types/gift';

interface BalloonTreeStageProps {
  config: GiftConfig;
  onNext: () => void;
}

interface MiniHeart {
  id: number;
  x: number; // percentage offset from center
  y: number; // percentage offset from center
  size: number;
  color: string;
  delay: number;
  duration: number;
  rotation: number;
}

export const BalloonTreeStage: React.FC<BalloonTreeStageProps> = ({ config, onNext }) => {
  // Generate a lush parametric heart cluster of ~55 metallic mini heart balloons
  const miniHearts: MiniHeart[] = useMemo(() => {
    const list: MiniHeart[] = [];
    const colors = [
      'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)', // hot pink
      'linear-gradient(135deg, #FFA07A 0%, #FF6347 100%)', // coral
      'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', // warm gold
      'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)', // rose blush
      'linear-gradient(135deg, #FFE4E1 0%, #F48FB1 100%)', // pearl pink
      'linear-gradient(135deg, #F8BBD0 0%, #EC407A 100%)', // soft berry
    ];

    let id = 0;
    // Parameteric heart coordinates
    for (let r = 0.3; r <= 1.0; r += 0.14) {
      const count = Math.round(18 * r);
      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2;
        // Heart formula
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

        // Add slight random jitter for natural balloon bunch look
        const jitterX = (Math.random() - 0.5) * 6;
        const jitterY = (Math.random() - 0.5) * 6;

        list.push({
          id: id++,
          x: (hx * 5.8 * r) + jitterX,
          y: (hy * 5.5 * r) + jitterY - 20, // offset upwards
          size: Math.floor(18 + Math.random() * 14),
          color: colors[id % colors.length],
          delay: Math.random() * 2,
          duration: 2.5 + Math.random() * 2,
          rotation: (Math.random() - 0.5) * 30,
        });
      }
    }
    return list;
  }, []);

  return (
    <div
      onClick={onNext}
      className="relative w-full h-full flex flex-col items-center justify-between py-4 sm:py-6 px-5 cursor-pointer select-none overflow-hidden bg-gradient-to-b from-[#FFF5EC] via-[#FDE8EF] to-[#FCE0E9] text-neutral-800"
    >
      {/* Background ambient bokeh / sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-200/50 blur-[1px]"
            style={{
              width: 3 + (i % 4) * 2,
              height: 3 + (i % 4) * 2,
              top: `${(i * 19) % 95}%`,
              left: `${(i * 27) % 92}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Center Heart Balloon Canopy & Tree Stem — scales to fill available space */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center min-h-0">
        {/* Heart balloon cluster — responsive size */}
        <div className="relative w-[clamp(200px,65vw,288px)] aspect-square flex items-center justify-center shrink-0">
          {miniHearts.map((h) => (
            <motion.div
              key={h.id}
              className="absolute flex items-center justify-center shadow-sm"
              style={{
                width: h.size,
                height: h.size,
                left: `calc(50% + ${h.x}px - ${h.size / 2}px)`,
                top: `calc(50% + ${h.y}px - ${h.size / 2}px)`,
              }}
              animate={{
                y: [0, -6, 0],
                rotate: [h.rotation - 3, h.rotation + 3, h.rotation - 3],
              }}
              transition={{
                duration: h.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: h.delay,
              }}
            >
              {/* 3D Heart Balloon SVG */}
              <svg
                viewBox="0 0 24 24"
                className="w-full h-full drop-shadow-[0_4px_6px_rgba(200,80,120,0.25)]"
              >
                <defs>
                  <radialGradient id={`glow-${h.id}`} cx="35%" cy="30%" r="65%">
                    <stop offset="0%" stopColor="#FFF" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#FFF" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill={`url(#balloon-grad-${h.id % 6})`}
                />
                {/* Metallic shine reflection */}
                <ellipse cx="8" cy="8" rx="3.5" ry="2" fill="white" opacity="0.45" transform="rotate(-25 8 8)" />
              </svg>
            </motion.div>
          ))}

          {/* Gradients definitions container */}
          <svg className="absolute w-0 h-0">
            <defs>
              <linearGradient id="balloon-grad-0" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF77A9" />
                <stop offset="100%" stopColor="#E91E63" />
              </linearGradient>
              <linearGradient id="balloon-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFA07A" />
                <stop offset="100%" stopColor="#FF5722" />
              </linearGradient>
              <linearGradient id="balloon-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE082" />
                <stop offset="100%" stopColor="#FFA000" />
              </linearGradient>
              <linearGradient id="balloon-grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F48FB1" />
                <stop offset="100%" stopColor="#D81B60" />
              </linearGradient>
              <linearGradient id="balloon-grad-4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFCCBC" />
                <stop offset="100%" stopColor="#FF7043" />
              </linearGradient>
              <linearGradient id="balloon-grad-5" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F8BBD0" />
                <stop offset="100%" stopColor="#C2185B" />
              </linearGradient>
            </defs>
          </svg>

          {/* Stray drifting balloons */}
          <motion.div
            className="absolute -right-8 top-12 w-4 h-4 text-rose-400"
            animate={{ y: [-5, -20, -5], x: [0, 8, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles className="w-full h-full text-amber-400/80" />
          </motion.div>
        </div>

        {/* Tree stem — proportional height */}
        <div className="relative w-1.5 h-[clamp(60px,15vh,112px)] bg-gradient-to-b from-[#8D6E63] to-[#5D4037] rounded-full shadow-inner -mt-2 shrink-0">
          <div className="absolute top-4 left-0.5 w-1 h-3 bg-[#4E342E]/50 rounded-full" />
        </div>
      </div>

      {/* Typography & Subtitles */}
      <motion.div
        className="text-center z-10 flex flex-col items-center mt-2 max-w-xs shrink-0"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <span className="text-xs uppercase tracking-widest text-[#B0727F] font-semibold mb-1.5">
          {config.coverKicker}
        </span>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#83263E] mb-1 font-editorial">
          Happy Birthday, <br />
          <span className="text-[#B31D45]">Kishmish</span>
          <span className="block text-sm font-semibold text-rose-500/90 tracking-normal mt-0.5 font-sans">
            (Annesha 💖)
          </span>
        </h1>

        <p className="text-sm text-[#734B55] font-medium flex items-center justify-center gap-1.5">
          <span>{config.coverSubtext}</span>
        </p>
      </motion.div>

      {/* Tap anywhere to continue prompt */}
      <motion.div
        className="z-10 flex flex-col items-center pb-2 sm:pb-4 pt-2 text-xs font-medium text-[#A66776] shrink-0"
        animate={{ opacity: [0.4, 0.9, 0.4], y: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>tap anywhere to continue</span>
        <div className="w-4 h-0.5 bg-[#A66776]/50 rounded-full mt-1.5" />
      </motion.div>
    </div>
  );
};
