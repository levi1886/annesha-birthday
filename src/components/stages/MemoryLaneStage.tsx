import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, Heart } from 'lucide-react';
import { GiftConfig } from '../../types/gift';
import { sound } from '../../utils/audio';

interface MemoryLaneStageProps {
  config: GiftConfig;
  onNext: () => void;
}

export const MemoryLaneStage: React.FC<MemoryLaneStageProps> = ({ config, onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const polaroids = config.polaroids || [];
  const current = polaroids[currentIndex] || {
    id: 'default',
    imageUrl: '',
    caption: 'A cherished memory ✨',
    rotation: -2,
  };

  const isHeart = Boolean(current.isHeartShape || currentIndex === 1);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playTap();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : polaroids.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playTap();
    setCurrentIndex((prev) => (prev < polaroids.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between py-4 sm:py-6 px-4 select-none overflow-hidden bg-gradient-to-b from-[#1E112E] via-[#2A163E] to-[#150B22] text-neutral-100">
      {/* SVG ClipPath for heart-shaped second photo */}
      <svg className="w-0 h-0 absolute pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5, 0.28 C 0.35, 0.05, 0, 0.15, 0, 0.48 C 0, 0.72, 0.35, 0.88, 0.5, 0.98 C 0.65, 0.88, 1, 0.72, 1, 0.48 C 1, 0.15, 0.65, 0.05, 0.5, 0.28 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Background Starry Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-200/50 animate-twinkle"
            style={{
              width: 2,
              height: 2,
              top: `${(i * 19) % 95}%`,
              left: `${(i * 27) % 92}%`,
              animationDelay: `${i * 0.25}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center z-10 max-w-xs shrink-0">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-rose-100 font-editorial">
          {config.memoryTitle}
        </h2>
        <p className="text-xs text-purple-200/80 font-medium mt-1">
          {config.memorySubtitle}
        </p>
      </div>

      {/* Polaroid Container with 3D tilt */}
      <div className="relative z-10 w-full max-w-xs flex-1 min-h-0 flex flex-col items-center justify-center my-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id || currentIndex}
            initial={{ opacity: 0, scale: 0.9, rotate: (current.rotation || 0) - 8 }}
            animate={{ opacity: 1, scale: 1, rotate: current.rotation || -2 }}
            exit={{ opacity: 0, scale: 0.9, rotate: (current.rotation || 0) + 8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 180 }}
            className="relative w-[clamp(240px,70vw,272px)] bg-neutral-100 text-neutral-900 p-3 pb-3.5 rounded-md shadow-2xl border border-neutral-300 transform cursor-pointer group"
            onClick={handleNext}
          >
            {/* Washi tape at top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-200/60 backdrop-blur-xs border border-amber-300/40 -rotate-2 shadow-sm rounded-xs pointer-events-none" />

            {/* Photo frame */}
            <div
              className={`relative w-full aspect-square rounded-xs overflow-hidden shadow-inner flex items-center justify-center ${
                isHeart
                  ? 'bg-gradient-to-br from-rose-100 via-pink-100 to-amber-50 p-1.5'
                  : 'bg-neutral-900'
              }`}
            >
              {!imgError[current.id] && current.imageUrl ? (
                isHeart ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Background romantic accents */}
                    <Heart className="absolute top-1.5 left-2 w-3.5 h-3.5 text-rose-400/50 fill-rose-400/40" />
                    <Heart className="absolute bottom-2 right-2 w-3 h-3 text-pink-500/50 fill-pink-500/40" />

                    {/* Heart-clipped Photo */}
                    <div
                      className="w-full h-full overflow-hidden transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_4px_12px_rgba(225,29,72,0.3)]"
                      style={{
                        clipPath: 'url(#heart-clip)',
                        WebkitClipPath: 'url(#heart-clip)',
                      }}
                    >
                      <img
                        src={current.imageUrl}
                        alt={current.caption}
                        onError={() => setImgError((prev) => ({ ...prev, [current.id]: true }))}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <img
                    src={current.imageUrl}
                    alt={current.caption}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError((prev) => ({ ...prev, [current.id]: true }))}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-pink-400 via-rose-500 to-amber-400 p-4 text-white text-center">
                  <Heart className="w-10 h-10 text-white mb-2 animate-bounce fill-white/80" />
                  <span className="text-xs font-bold tracking-wider uppercase">Cherished Memory</span>
                  <span className="text-[11px] text-white/80 mt-1">Tap to browse memories</span>
                </div>
              )}

              {/* Polaroid gloss shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
            </div>

            {/* Handwritten Polaroid Caption */}
            <div className="pt-2.5 px-1 text-center">
              {isHeart && (
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200/90 px-2 py-0.5 rounded-full mb-1">
                  <Heart className="w-2.5 h-2.5 fill-rose-500 text-rose-500" />
                  <span>Shaped with My Love</span>
                </div>
              )}
              <p className="font-handwriting text-base sm:text-lg text-neutral-800 leading-tight">
                {current.caption}
              </p>
              {current.date && (
                <span className="text-[10px] uppercase tracking-wider text-neutral-500 mt-1 block">
                  {current.date}
                </span>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel controls with 6 photos dots */}
        {polaroids.length > 1 && (
          <div className="flex items-center gap-3 mt-3 shrink-0">
            <button
              onClick={handlePrev}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {polaroids.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playTap();
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentIndex ? 'w-5 bg-rose-400' : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Continue button */}
      <div className="relative z-10 w-full max-w-sm pt-2 pb-1 shrink-0">
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
      </div>
    </div>
  );
};
