import React, { useState } from 'react';
import { X, Check, Sparkles, Plus, Trash2, Heart, Image as ImageIcon } from 'lucide-react';
import { GiftConfig } from '../types/gift';
import { sound } from '../utils/audio';

interface GiftBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: GiftConfig;
  onSave: (updated: GiftConfig) => void;
}

export const GiftBuilderModal: React.FC<GiftBuilderModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [draft, setDraft] = useState<GiftConfig>({ ...config });
  const [activeTab, setActiveTab] = useState<'basics' | 'reasons' | 'letter' | 'memories'>('basics');

  if (!isOpen) return null;

  const handleSave = () => {
    sound.playTap();
    onSave(draft);
    onClose();
  };

  const updateReason = (index: number, text: string) => {
    const updated = [...draft.reasons];
    if (updated[index]) {
      updated[index] = { ...updated[index], text };
      setDraft({ ...draft, reasons: updated });
    }
  };

  const addPolaroid = () => {
    const newPolaroid = {
      id: `p-${Date.now()}`,
      imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80',
      caption: 'Another memory with you ✨',
      date: 'Today',
      rotation: Math.floor((Math.random() - 0.5) * 6),
    };
    setDraft({ ...draft, polaroids: [...draft.polaroids, newPolaroid] });
  };

  const removePolaroid = (id: string) => {
    setDraft({ ...draft, polaroids: draft.polaroids.filter((p) => p.id !== id) });
  };

  const updatePolaroid = (index: number, caption: string, imageUrl: string) => {
    const updated = [...draft.polaroids];
    if (updated[index]) {
      updated[index] = { ...updated[index], caption, imageUrl };
      setDraft({ ...draft, polaroids: updated });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-md">
      <div className="relative w-full sm:max-w-lg bg-[#1D132B] border border-white/15 rounded-t-3xl sm:rounded-3xl shadow-2xl text-white overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[92vh] sm:mx-3">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 px-5 sm:px-6 border-b border-white/10 bg-white/5 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <h3 className="font-bold text-sm sm:text-base tracking-tight text-white font-editorial">
              Customize Your Birthday Gift
            </h3>
          </div>
          <button
            onClick={() => {
              sound.playTap();
              onClose();
            }}
            className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex items-center gap-1 p-2 px-5 sm:px-6 border-b border-white/10 bg-white/3 overflow-x-auto no-scrollbar shrink-0">
          {(['basics', 'reasons', 'letter', 'memories'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 min-h-0 space-y-4 no-scrollbar">
          {activeTab === 'basics' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-rose-200 block mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={draft.recipientName}
                  onChange={(e) => {
                    const name = e.target.value;
                    setDraft({
                      ...draft,
                      recipientName: name,
                      letterStampInitial: name.charAt(0).toUpperCase() || 'D',
                    });
                  }}
                  className="w-full bg-white/10 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-rose-400"
                  placeholder="e.g. Diksha"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-200 block mb-1">
                  Turning Age
                </label>
                <input
                  type="text"
                  value={draft.age}
                  onChange={(e) => {
                    const ageVal = e.target.value;
                    setDraft({
                      ...draft,
                      age: ageVal,
                      coverSubtext: `and just like that, you're turning ${ageVal} ✨`,
                    });
                  }}
                  className="w-full bg-white/10 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-rose-400"
                  placeholder="e.g. 19"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-200 block mb-1">
                  Sender Name (Your Name)
                </label>
                <input
                  type="text"
                  value={draft.senderName}
                  onChange={(e) => setDraft({ ...draft, senderName: e.target.value })}
                  className="w-full bg-white/10 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-rose-400"
                  placeholder="e.g. Rohan"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-200 block mb-1">
                  Greeting Kicker
                </label>
                <input
                  type="text"
                  value={draft.coverKicker}
                  onChange={(e) => setDraft({ ...draft, coverKicker: e.target.value })}
                  className="w-full bg-white/10 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-rose-400"
                  placeholder="it's officially your day"
                />
              </div>
            </div>
          )}

          {activeTab === 'reasons' && (
            <div className="space-y-3">
              <p className="text-xs text-neutral-300">
                4 reasons revealed when popping balloons:
              </p>
              {draft.reasons.map((reason, i) => (
                <div key={reason.id} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold text-amber-300">
                    <span>Reason #{i + 1}</span>
                    <span
                      className="w-3 h-3 rounded-full border border-white/30"
                      style={{ backgroundColor: reason.balloonColor }}
                    />
                  </div>
                  <input
                    type="text"
                    value={reason.text}
                    onChange={(e) => updateReason(i, e.target.value)}
                    className="w-full bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-400"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'letter' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-rose-200 block mb-1">
                  Wax Stamp Initial
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={draft.letterStampInitial}
                  onChange={(e) => setDraft({ ...draft, letterStampInitial: e.target.value.toUpperCase() })}
                  className="w-20 bg-white/10 border border-white/15 rounded-xl px-3 py-2 text-center text-sm font-bold text-amber-300 focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-200 block mb-1">
                  Personal Letter Message
                </label>
                <textarea
                  rows={6}
                  value={draft.letterBody}
                  onChange={(e) => setDraft({ ...draft, letterBody: e.target.value })}
                  className="w-full bg-white/10 border border-white/15 rounded-xl p-3 text-xs text-white leading-relaxed focus:outline-none focus:border-rose-400"
                  placeholder="Write your heartfelt birthday letter here..."
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-rose-200 block mb-1">
                  Letter Signoff
                </label>
                <input
                  type="text"
                  value={draft.letterSignoff}
                  onChange={(e) => setDraft({ ...draft, letterSignoff: e.target.value })}
                  className="w-full bg-white/10 border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-rose-400"
                  placeholder="With all my love,"
                />
              </div>
            </div>
          )}

          {activeTab === 'memories' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-300">Polaroid Photo Memories:</span>
                <button
                  onClick={addPolaroid}
                  className="flex items-center gap-1 text-[11px] font-semibold text-rose-300 hover:text-white px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Memory</span>
                </button>
              </div>

              {draft.polaroids.map((polaroid, idx) => (
                <div key={polaroid.id} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-rose-200">
                    <span>Polaroid #{idx + 1}</span>
                    {draft.polaroids.length > 1 && (
                      <button
                        onClick={() => removePolaroid(polaroid.id)}
                        className="text-neutral-400 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-0.5">Photo Image URL</label>
                    <input
                      type="text"
                      value={polaroid.imageUrl}
                      onChange={(e) => updatePolaroid(idx, polaroid.caption, e.target.value)}
                      className="w-full bg-white/10 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-0.5">Caption</label>
                    <input
                      type="text"
                      value={polaroid.caption}
                      onChange={(e) => updatePolaroid(idx, e.target.value, polaroid.imageUrl)}
                      className="w-full bg-white/10 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      placeholder="e.g. That summer afternoon ✨"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 px-5 sm:px-6 border-t border-white/10 bg-white/5 flex items-center justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-400 text-white text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Apply Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};
