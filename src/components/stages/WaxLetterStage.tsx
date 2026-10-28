import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Mail } from 'lucide-react';
import { GiftConfig } from '../../types/gift';
import { sound } from '../../utils/audio';

interface WaxLetterStageProps {
  config: GiftConfig;
  onNext: () => void;
}

export const WaxLetterStage: React.FC<WaxLetterStageProps> = ({ config, onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const fullLetter = config.letterBody;

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    sound.playEnvelopeOpen();
    setIsOpen(true);
  };

  // Typewriter effect after envelope unfolds
  useEffect(() => {
    if (!isOpen) return;

    let index = 0;
    setTypedText('');
    setIsTypingComplete(false);

    const timer = setInterval(() => {
      index += 2;
      if (index >= fullLetter.length) {
        setTypedText(fullLetter);
        setIsTypingComplete(true);
        clearInterval(timer);
      } else {
        setTypedText(fullLetter.slice(0, index));
      }
    }, 25);

    return () => clearInterval(timer);
  }, [isOpen, fullLetter]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between py-4 sm:py-6 px-4 select-none overflow-hidden bg-gradient-to-b from-[#1F1030] via-[#2D1642] to-[#150A24] text-neutral-100">
      {/* Background stardust */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/40 animate-twinkle"
            style={{
              width: 1.5,
              height: 1.5,
              top: `${(i * 17) % 96}%`,
              left: `${(i * 29) % 94}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="text-center z-10 max-w-xs shrink-0">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-rose-100 font-editorial">
          One special letter, my Kishmish...
        </h2>
        <p className="text-xs text-purple-200/80 font-medium mt-1">
          {config.senderName} wrote this just for you.
        </p>
      </div>

      {/* Envelope or Letter Display — flex-1 centers it, min-h-0 for shrinking */}
      <div className="relative z-10 w-full max-w-xs flex-1 min-h-0 flex flex-col items-center justify-center my-2">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* CLOSED GOLDEN ENVELOPE */
            <motion.div
              key="closed-envelope"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.3 } }}
              onClick={handleOpenEnvelope}
              className="relative w-[clamp(240px,70vw,288px)] aspect-[3/2] rounded-xl bg-gradient-to-br from-[#D49E3C] via-[#B87D25] to-[#8C5A14] shadow-2xl border border-[#F4C56C]/40 flex items-center justify-center cursor-pointer group hover:brightness-105 active:scale-98 transition-all shrink-0"
            >
              {/* Envelope flap lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 288 192">
                {/* Top flap triangle */}
                <polygon points="0,0 288,0 144,110" fill="#E6B04E" opacity="0.4" />
                <polyline points="0,0 144,110 288,0" stroke="#7A4B0E" strokeWidth="1.5" fill="none" opacity="0.6" />
                {/* Bottom flap fold */}
                <polygon points="0,192 144,90 288,192" fill="#B37920" opacity="0.3" />
                <polyline points="0,192 144,90 288,192" stroke="#7A4B0E" strokeWidth="1.2" fill="none" opacity="0.5" />
              </svg>

              {/* Embossed Wax Seal */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#F5D77F] via-[#DDA73A] to-[#8A5B15] shadow-xl border-2 border-[#FFE8A3] flex items-center justify-center shadow-amber-900/40"
              >
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-amber-800/40 flex items-center justify-center">
                  <span className="font-editorial text-xl sm:text-2xl font-bold text-amber-950">
                    {config.letterStampInitial || config.recipientName.charAt(0) || 'A'}
                  </span>
                </div>
              </motion.div>

              {/* Envelope shadow & glow */}
              <div className="absolute -inset-1 rounded-xl bg-amber-400/10 blur-md pointer-events-none" />

              {/* Tap to open prompt */}
              <div className="absolute -bottom-8 flex flex-col items-center text-xs font-semibold text-amber-200/90 tracking-wide animate-pulse">
                <span>Tap to open your letter ✨</span>
              </div>
            </motion.div>
          ) : (
            /* OPENED LETTER PARCHMENT — responsive width & max height */
            <motion.div
              key="opened-letter"
              initial={{ scale: 0.7, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: 'spring', damping: 18, stiffness: 120 }}
              className="relative w-[clamp(260px,80vw,320px)] bg-[#FFFDF7] text-neutral-800 p-4 sm:p-5 pt-5 pb-5 rounded-2xl shadow-2xl border border-amber-200/60 overflow-y-auto no-scrollbar flex flex-col justify-between"
              style={{
                backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #EFE4D2 28px)',
                lineHeight: '28px',
                maxHeight: 'min(420px, 70vh)',
              }}
            >
              {/* Cute top corner stamp / seal */}
              <div className="absolute top-3 right-3 flex items-center gap-1 opacity-70">
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>

              {/* Letter Greeting */}
              <div>
                <h3 className="font-editorial text-lg sm:text-xl font-bold text-neutral-900 mb-2">
                  Dear Kishmish (Annesha),
                </h3>

                {/* Letter Body with typewriter stream */}
                <p className="font-medium text-[13px] sm:text-[14px] text-neutral-700 leading-[28px] whitespace-pre-wrap min-h-[100px]">
                  {typedText}
                  {!isTypingComplete && (
                    <span className="inline-block w-1.5 h-4 bg-amber-600 animate-pulse ml-0.5 align-middle" />
                  )}
                </p>
              </div>

              {/* Signoff & Stamp */}
              <div className="mt-3 pt-2 border-t border-amber-200/50 flex items-end justify-between">
                <div>
                  <p className="font-handwriting text-lg sm:text-xl text-neutral-600 leading-none">
                    {config.letterSignoff}
                  </p>
                  <p className="font-editorial font-bold text-sm sm:text-base text-neutral-900 mt-1 leading-tight">
                    — {config.senderName} 💛
                  </p>
                </div>

                {/* Mini wax seal stamp */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-rose-400 to-amber-500 shadow-sm border border-amber-200 flex items-center justify-center text-white text-xs font-bold font-editorial shrink-0">
                  {config.letterStampInitial || config.recipientName.charAt(0) || 'A'}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Continue Button */}
      <div className="relative z-10 w-full max-w-sm pt-2 pb-1 shrink-0">
        {isOpen ? (
          <button
            onClick={() => {
              sound.playTap();
              onNext();
            }}
            className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-pink-500/25 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="text-center text-[11px] text-neutral-400/80">
            A handwritten note from the heart
          </div>
        )}
      </div>
    </div>
  );
};
