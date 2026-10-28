/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { GiftConfig, GiftStage } from './types/gift';
import { loadGiftConfig } from './utils/storage';
import { sound } from './utils/audio';

import { StageHeader } from './components/StageHeader';
import { BalloonTreeStage } from './components/stages/BalloonTreeStage';
import { CakeStage } from './components/stages/CakeStage';
import { BalloonPopStage } from './components/stages/BalloonPopStage';
import { MemoryLaneStage } from './components/stages/MemoryLaneStage';
import { WaxLetterStage } from './components/stages/WaxLetterStage';
import { FinaleStage } from './components/stages/FinaleStage';

export default function App() {
  const [config] = useState<GiftConfig>(() => loadGiftConfig());
  const [currentStage, setCurrentStage] = useState<GiftStage>(GiftStage.COVER);
  const [hasStartedAudio, setHasStartedAudio] = useState(false);

  // Initialize audio on first user touch / click
  useEffect(() => {
    const handleFirstUserInteraction = () => {
      if (!hasStartedAudio) {
        setHasStartedAudio(true);
        sound.startAmbientMusic();
      }
    };

    window.addEventListener('click', handleFirstUserInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
    };
  }, [hasStartedAudio]);

  const handleNextStage = () => {
    if (currentStage < GiftStage.FINALE) {
      setCurrentStage((prev) => (prev + 1) as GiftStage);
    }
  };

  const handlePrevStage = () => {
    if (currentStage > GiftStage.COVER) {
      setCurrentStage((prev) => (prev - 1) as GiftStage);
    }
  };

  const handleRestart = () => {
    setCurrentStage(GiftStage.COVER);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center bg-[#0C0614] text-neutral-100 overflow-hidden font-sans">
      {/* Ambient background lighting blobs for desktop elegance */}
      <div className="hidden sm:block absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Experience Device Frame */}
      <main className="relative w-full h-[100dvh] sm:h-[min(92vh,860px)] sm:max-w-[420px] sm:rounded-[40px] bg-black shadow-[0_0_60px_-15px_rgba(233,30,99,0.3)] sm:border-[8px] sm:border-neutral-800/80 overflow-hidden flex flex-col z-10">
        {/* Subtle camera punch hole for phone mockup aesthetic on desktop */}
        <div className="hidden sm:block absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-neutral-900 rounded-full z-40 pointer-events-none" />

        {/* Top Header Bar with navigation, progress, and sound */}
        <StageHeader
          currentStage={currentStage}
          onBack={handlePrevStage}
          recipientName={config.recipientName}
        />

        {/* Dynamic Stage Viewport */}
        <div className="relative w-full flex-1 min-h-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="w-full h-full"
            >
              {currentStage === GiftStage.COVER && (
                <BalloonTreeStage config={config} onNext={handleNextStage} />
              )}
              {currentStage === GiftStage.CAKE && (
                <CakeStage config={config} onNext={handleNextStage} />
              )}
              {currentStage === GiftStage.BALLOONS && (
                <BalloonPopStage config={config} onNext={handleNextStage} />
              )}
              {currentStage === GiftStage.MEMORIES && (
                <MemoryLaneStage config={config} onNext={handleNextStage} />
              )}
              {currentStage === GiftStage.LETTER && (
                <WaxLetterStage config={config} onNext={handleNextStage} />
              )}
              {currentStage === GiftStage.FINALE && (
                <FinaleStage
                  config={config}
                  onRestart={handleRestart}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
