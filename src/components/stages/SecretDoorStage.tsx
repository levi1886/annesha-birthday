import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, ArrowRight, Sparkles } from 'lucide-react';
import { GiftConfig } from '../../types/gift';
import { sound } from '../../utils/audio';

interface SecretDoorStageProps {
  config: GiftConfig;
  onNext: () => void;
}

export const SecretDoorStage: React.FC<SecretDoorStageProps> = ({ config, onNext }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between py-4 sm:py-6 px-4 select-none overflow-hidden bg-gradient-to-b from-[#1C102D] via-[#2A163E] to-[#140A22] text-neutral-100">
      {/* Background stardust */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-200/40 animate-twinkle"
            style={{
              width: 2,
              height: 2,
              top: `${(i * 18) % 96}%`,
              left: `${(i * 24) % 94}%`,
            }}
          />
        ))}
      </div>

      {/* Festive Balloon Bunch & Bunting Garland */}
      <div className="relative z-10 w-full max-w-xs flex flex-col items-center shrink-0">
        {/* Balloon cluster */}
        <div className="flex items-center justify-center gap-1.5 -mb-2">
          {['#FF6B8B', '#9D7BFF', '#4DE1C1', '#FFA07A', '#FFD700'].map((color, idx) => (
            <motion.div
              key={idx}
              className="w-6 h-8 sm:w-7 sm:h-9 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] shadow-md -mx-1"
              style={{
                backgroundColor: color,
                boxShadow: `0 4px 10px ${color}60`,
              }}
              animate={{
                y: [0, -4 - (idx % 3) * 2, 0],
              }}
              transition={{
                duration: 2 + idx * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Colorful Triangle Bunting Flags */}
        <div className="flex items-center justify-center w-full max-w-[270px] overflow-hidden -mt-1">
          {['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE', '#EEFF41', '#FFD740', '#FFAB40'].map((bg, idx) => (
            <div
              key={idx}
              className="w-0 h-0 border-l-[9px] sm:border-l-[11px] border-l-transparent border-r-[9px] sm:border-r-[11px] border-r-transparent border-t-[12px] sm:border-t-[14px] shadow-xs"
              style={{ borderTopColor: bg }}
            />
          ))}
        </div>
      </div>

      {/* Video Frame — flex-1 with min-h-0 and responsive aspect */}
      <div className="relative z-10 w-full max-w-xs flex-1 min-h-0 flex flex-col items-center justify-center my-2">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-full aspect-[9/14] max-h-full bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-300/80 group"
          onClick={togglePlay}
        >
          {!hasError && config.videoUrl ? (
            <video
              ref={videoRef}
              src={config.videoUrl}
              autoPlay
              playsInline
              loop
              muted={isMuted}
              onError={() => setHasError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            /* Styled Fallback / Door Animation */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-purple-900 to-indigo-950">
              <div className="w-16 h-24 sm:w-20 sm:h-28 border-4 border-amber-400 rounded-t-xl bg-amber-900/60 flex items-center justify-center shadow-lg relative mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-300 absolute right-2" />
                <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-amber-300 animate-pulse" />
              </div>
              <h4 className="text-base sm:text-lg font-bold text-amber-200 font-editorial">
                The Secret Memory Portal
              </h4>
              <p className="text-xs text-neutral-300 mt-1">
                A special moment just between us ✨
              </p>
            </div>
          )}

          {/* Video Control Overlays */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-md transition-all"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4 text-white" />}
            </button>
          </div>

          {/* Play/Pause indicator on hover or pause */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs">
              <div className="w-14 h-14 rounded-full bg-white/20 text-white flex items-center justify-center shadow-lg">
                <Play className="w-7 h-7 ml-1" />
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Skip or Continue action */}
      <div className="relative z-10 w-full max-w-sm pt-2 pb-1 flex items-center justify-between gap-3 shrink-0">
        <button
          onClick={() => {
            sound.playTap();
            onNext();
          }}
          className="text-xs font-semibold text-neutral-400 hover:text-white px-3 py-2 transition-colors cursor-pointer"
        >
          Skip &gt;
        </button>

        <button
          onClick={() => {
            sound.playTap();
            onNext();
          }}
          className="py-2.5 sm:py-3 px-5 sm:px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 text-white font-bold text-xs tracking-wide shadow-lg shadow-pink-500/25 hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>To Grand Finale</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
