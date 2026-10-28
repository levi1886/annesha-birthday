import React, { useState } from 'react';
import { ChevronLeft, Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { GiftStage } from '../types/gift';
import { sound } from '../utils/audio';

interface StageHeaderProps {
  currentStage: GiftStage;
  onBack: () => void;
  recipientName: string;
}

export const StageHeader: React.FC<StageHeaderProps> = ({
  currentStage,
  onBack,
  recipientName,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
  };

  const totalStages = 6;
  const progressPercent = Math.min(100, Math.round(((currentStage + 1) / totalStages) * 100));

  return (
    <header className="relative z-30 flex flex-col w-full max-w-md mx-auto pt-3 px-4 pb-2 transition-all">
      {/* Top action row */}
      <div className="flex items-center justify-between gap-3">
        {/* Left: Back button if past stage 0 */}
        <div className="w-24 flex items-center">
          {currentStage > GiftStage.COVER ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                sound.playTap();
                onBack();
              }}
              className="flex items-center gap-1 text-xs font-medium text-neutral-300 hover:text-white px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-rose-300/90 font-medium pl-1">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-300" />
              <span className="tracking-wide">our story</span>
            </div>
          )}
        </div>

        {/* Center: Stage Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md shadow-sm">
          <Heart className="w-3 h-3 text-rose-400 fill-rose-400 animate-pulse" />
          <span className="text-[11px] font-semibold tracking-wider text-rose-200 uppercase">
            {currentStage === GiftStage.COVER
              ? 'For Kishmish ❤️'
              : currentStage === GiftStage.FINALE
              ? 'Grand Finale'
              : `Step ${currentStage} of 4`}
          </span>
        </div>

        {/* Right: Sound button */}
        <div className="flex items-center gap-1.5 w-24 justify-end">
          <button
            onClick={toggleSound}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-neutral-200 hover:text-white backdrop-blur-md transition-all active:scale-90 cursor-pointer"
            title={isMuted ? 'Unmute music & sound' : 'Mute sound'}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
          </button>
        </div>
      </div>

      {/* Progress tracker hairline bar */}
      <div className="w-full bg-white/10 h-0.5 rounded-full mt-2.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </header>
  );
};
