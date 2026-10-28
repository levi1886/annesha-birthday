import React, { useState } from 'react';
import { X, Copy, Check, Share2, Send, Heart, Sparkles } from 'lucide-react';
import { GiftConfig } from '../types/gift';
import { sound } from '../utils/audio';
import { generateShareableUrl } from '../utils/storage';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: GiftConfig;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = generateShareableUrl(config);
  const shareText = `Happy Birthday ${config.recipientName}! 🎂 Open your surprise gift here: ${shareUrl}`;

  const handleCopy = () => {
    sound.playTap();
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    sound.playTap();
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Birthday Gift for ${config.recipientName}`,
          text: `A special birthday gift made just for you ✨`,
          url: shareUrl,
        });
      } catch {
        // User cancelled share
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#1C112B] border border-white/15 rounded-3xl shadow-2xl text-white p-6 flex flex-col items-center text-center">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playTap();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gift Icon Header */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center shadow-lg shadow-pink-500/20 mb-3">
          <Heart className="w-7 h-7 text-white fill-white/80 animate-pulse" />
        </div>

        <h3 className="font-editorial text-2xl font-bold text-white mb-1">
          Share with {config.recipientName} 🎁
        </h3>
        <p className="text-xs text-neutral-300 max-w-xs mb-5">
          Your personalized birthday website is ready! Send this private link so they can experience the journey.
        </p>

        {/* Link input & copy button */}
        <div className="w-full flex items-center gap-2 p-1.5 pl-3.5 bg-white/10 border border-white/15 rounded-2xl mb-4">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="w-full bg-transparent text-xs text-neutral-200 outline-none truncate"
          />
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Direct WhatsApp & Native share buttons */}
        <div className="w-full grid grid-cols-2 gap-2.5 mb-2">
          <button
            onClick={handleWhatsApp}
            className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
          >
            <Send className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="py-3 px-4 rounded-xl bg-white/15 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-300" />
            <span>Share More...</span>
          </button>
        </div>

        <span className="text-[11px] text-neutral-400 mt-2">
          ✨ The link carries all your custom messages, photos, and wishes!
        </span>
      </div>
    </div>
  );
};
