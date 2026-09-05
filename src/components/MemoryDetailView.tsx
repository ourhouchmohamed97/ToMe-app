import React, { useState, useEffect } from 'react';
import { MemoryItem } from '../types';
import { ASSETS } from '../data/mockData';

interface MemoryDetailViewProps {
  memory?: MemoryItem | null;
  onBack: () => void;
  onOpenPhotoLightbox?: (url: string, caption?: string) => void;
}

export const MemoryDetailView: React.FC<MemoryDetailViewProps> = ({
  memory,
  onBack,
  onOpenPhotoLightbox,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSeconds, setAudioSeconds] = useState(14);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [customNote, setCustomNote] = useState('');
  const [appendedNotes, setAppendedNotes] = useState<string[]>(
    memory?.notesAppended || []
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Audio playback simulator
  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioSeconds((sec) => (sec >= 48 ? 0 : sec + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleYes = () => {
    const note = 'Celebration noted: Yes — it happened. ✨ Appended to your 2026 story.';
    setAppendedNotes((prev) => [...prev, note]);
    showToast('Celebration noted. Appended to your 2026 story ✨');
  };

  const handleNotYet = () => {
    const note = 'Still exploring: Patiently honoring the journey. 🌱';
    setAppendedNotes((prev) => [...prev, note]);
    showToast('Patiently honoring the journey. Saved to your journal 🌱');
  };

  const handleAppendNote = () => {
    if (!customNote.trim()) return;
    setAppendedNotes((prev) => [...prev, customNote.trim()]);
    setCustomNote('');
    setIsComposerOpen(false);
    showToast('Your new perspective has been woven in 🕊️');
  };

  const handleSnooze = () => {
    showToast('Rescheduled. We’ll meet this thought again in September 🕰️');
  };

  const displayQuote = memory?.quote || '“I think I finally know what I want to do.”';
  const displayPhoto = memory?.photoUrl || ASSETS.rainyWindowDetail;

  return (
    <div className="flex flex-col w-full pb-28 relative">
      {/* Top Breadcrumb/Back button bar */}
      <div className="w-full flex items-center justify-between pt-2 pb-1">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 text-on-surface-variant hover:text-on-surface text-xs font-medium px-3 py-1 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          <span>Back to memories</span>
        </button>
      </div>

      {/* Atmospheric Prelude */}
      <div className="flex flex-col items-center text-center pt-space-md pb-space-lg">
        <div className="inline-flex items-center gap-space-2xs px-space-sm py-1 rounded-full bg-secondary-container/20 text-on-secondary-container mb-space-xs shadow-xs">
          <span
            className="material-symbols-outlined text-sm"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            history_edu
          </span>
          <span className="font-label-caps text-label-caps uppercase tracking-widest font-semibold">
            Time Capsule Resurfaced
          </span>
        </div>
        <div className="inline-flex items-center gap-1.5 text-on-surface-variant font-label-md text-label-md">
          <span>🕰️</span>
          <span>Exactly 3 months ago · June 8, 2026</span>
        </div>
      </div>

      {/* Primary Artifact: The Resurfaced Memory Card */}
      <div className="relative bg-surface-container-lowest rounded-xl p-space-lg shadow-xl shadow-primary-container/5 border border-surface-container-highest/60 overflow-hidden mb-space-lg">
        {/* Gentle ambient terracotta tint corner glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-secondary-fixed/30 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col">
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary font-semibold">
              A Whisper from Past You
            </span>
            <span className="material-symbols-outlined text-outline-variant text-lg">
              auto_awesome
            </span>
          </div>

          <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
            Something from your past
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 mb-space-lg">
            You left this note on a rainy Thursday evening:
          </p>

          {/* Handwritten / Serif Quote Block */}
          <div className="bg-surface-container-low/70 rounded-lg p-space-md my-space-xs relative border border-surface-container-highest/40">
            <span className="material-symbols-outlined absolute top-2 left-2 text-outline-variant/30 text-3xl select-none pointer-events-none">
              format_quote
            </span>
            <blockquote className="relative z-10 pl-space-sm font-headline-md text-headline-md italic text-primary leading-relaxed text-center sm:text-left">
              {displayQuote}
            </blockquote>
          </div>

          {/* Atmospheric Photograph Placeholder Attached to the Entry */}
          <div
            onClick={() => onOpenPhotoLightbox?.(displayPhoto, displayQuote)}
            className="my-space-md rounded-lg overflow-hidden bg-surface-container shadow-xs cursor-pointer group"
          >
            <img
              className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-105"
              alt="A tranquil atmospheric close-up of rainy window pane during dusk"
              src={displayPhoto}
            />
          </div>

          {/* Voice Note Audio Artifact */}
          <div className="mt-space-2xs p-space-sm bg-surface-container rounded-lg flex items-center gap-space-sm border border-surface-container-highest/50">
            <button
              aria-label={isPlayingAudio ? 'Pause voice note' : 'Play voice note'}
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center flex-shrink-0 shadow-xs transition-transform active:scale-95"
            >
              <span className="material-symbols-outlined text-xl">
                {isPlayingAudio ? 'pause' : 'play_arrow'}
              </span>
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-label-md text-label-md font-semibold text-on-surface flex items-center gap-1">
                  <span>🎙️</span> Voice note
                </span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">
                  {isPlayingAudio
                    ? `0:${audioSeconds < 10 ? '0' : ''}${audioSeconds} / 0:48`
                    : '0:14 / 0:48'}
                </span>
              </div>

              {/* Dynamic Waveform Graphic */}
              <div className="h-6 flex items-center gap-1 w-full overflow-hidden">
                {[
                  { h: 2, active: true },
                  { h: 4, active: true },
                  { h: 5, active: true },
                  { h: 3, active: true },
                  { h: 6, active: true },
                  { h: 4, active: true },
                  { h: 2, active: true },
                  { h: 5, active: true },
                  { h: 3, active: false },
                  { h: 6, active: false },
                  { h: 4, active: false },
                  { h: 5, active: false },
                  { h: 2, active: false },
                  { h: 4, active: false },
                  { h: 6, active: false },
                  { h: 3, active: false },
                  { h: 2, active: false },
                  { h: 5, active: false },
                  { h: 3, active: false },
                  { h: 2, active: false },
                ].map((bar, idx) => {
                  const dynamicHeight = isPlayingAudio
                    ? Math.max(2, (bar.h + ((audioSeconds + idx) % 4)) % 7)
                    : bar.h;
                  return (
                    <div
                      key={idx}
                      style={{ height: `${dynamicHeight * 4}px` }}
                      className={`w-1 rounded-full transition-all duration-300 ${
                        bar.active || (isPlayingAudio && idx < (audioSeconds / 48) * 20)
                          ? 'bg-secondary'
                          : 'bg-outline-variant/50'
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ToMe's Conversational Inquiry Card */}
      <div className="bg-surface-container rounded-xl p-space-lg mb-space-xl shadow-xs border border-surface-container-highest/60 relative overflow-hidden">
        <div className="flex items-start gap-space-sm">
          {/* ToMe Avatar / Emblem */}
          <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0 shadow-xs">
            <span
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              psychology_alt
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary font-semibold">
                ToMe Reflection
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Did you figure it out?
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Your answer will be appended to this memory and kept safe for your future self.
            </p>
          </div>
        </div>

        {/* Appended Reflection Notes */}
        {appendedNotes.length > 0 && (
          <div className="mt-4 pt-3 border-t border-surface-container-highest/60 flex flex-col gap-2">
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary">
              Appended Responses
            </span>
            {appendedNotes.map((note, index) => (
              <div
                key={index}
                className="bg-surface-container-lowest/80 p-2.5 rounded-lg text-body-sm text-on-surface border border-secondary-container/20"
              >
                {note}
              </div>
            ))}
          </div>
        )}

        {/* Expansion Container for Custom Thought */}
        {isComposerOpen && (
          <div className="mt-space-md pt-space-md border-t border-surface-container-highest/60">
            <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-inner border border-surface-container-highest/60">
              <textarea
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                autoFocus
                className="w-full bg-transparent border-0 resize-none font-body-md text-body-md text-on-surface focus:outline-none placeholder:text-outline/70 placeholder:italic"
                placeholder="Speak to your past self... What unfolded since June?"
                rows={3}
              />
              <div className="flex items-center justify-between pt-space-xs mt-space-2xs border-t border-surface-container-high/40">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCustomNote((prev) => prev + ' [Whispered thought appended]')}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors"
                    title="Add voice reflection"
                  >
                    <span className="material-symbols-outlined text-lg">mic</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomNote((prev) => prev + ' [Attached photo artifact]')}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors"
                    title="Add photograph"
                  >
                    <span className="material-symbols-outlined text-lg">image</span>
                  </button>
                </div>
                <button
                  onClick={handleAppendNote}
                  className="px-space-md py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-xs active:scale-95 transition-transform"
                >
                  Append Reflection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Primary Tactile Actions */}
      <div className="flex flex-col gap-space-sm w-full">
        {/* Option 1: Yes — it happened */}
        <button
          onClick={handleYes}
          className="w-full h-14 rounded-full bg-primary text-on-primary font-label-lg text-label-lg flex items-center justify-between px-space-lg shadow-md shadow-primary/10 active:scale-[0.98] transition-all group focus:outline-none"
        >
          <span className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary-fixed">check_circle</span>
            <span>Yes — it happened</span>
          </span>
          <span className="material-symbols-outlined text-on-primary/60 group-hover:translate-x-0.5 transition-transform">
            arrow_forward
          </span>
        </button>

        {/* Option 2: Not yet — still exploring */}
        <button
          onClick={handleNotYet}
          className="w-full h-14 rounded-full bg-surface-container-high text-on-surface font-label-lg text-label-lg flex items-center justify-between px-space-lg shadow-xs active:scale-[0.98] transition-all group focus:outline-none border border-surface-container-highest/60 hover:bg-surface-container-highest"
        >
          <span className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-on-surface-variant">
              compass_calibration
            </span>
            <span>Not yet — still exploring</span>
          </span>
          <span className="material-symbols-outlined text-on-surface-variant group-hover:translate-x-0.5 transition-transform">
            arrow_forward
          </span>
        </button>

        {/* Option 3: Tell ToMe what changed... */}
        {!isComposerOpen && (
          <button
            onClick={() => setIsComposerOpen(true)}
            className="w-full py-3.5 rounded-full bg-surface-container-lowest text-secondary font-label-lg text-label-lg flex items-center justify-center gap-space-xs shadow-xs hover:bg-surface-container border border-surface-container-highest/60 transition-colors focus:outline-none"
          >
            <span className="material-symbols-outlined text-lg">edit_note</span>
            <span>Tell ToMe what changed...</span>
          </button>
        )}
      </div>

      {/* Gentle Snooze / Dismiss */}
      <div className="flex justify-center mt-space-lg mb-space-sm">
        <button
          onClick={handleSnooze}
          className="px-space-md py-2 text-outline hover:text-on-surface font-label-md text-label-md flex items-center gap-1.5 transition-colors focus:outline-none"
        >
          <span className="material-symbols-outlined text-sm">snooze</span>
          <span>Remind me again in 3 months</span>
        </button>
      </div>

      {/* Micro Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-space-md py-space-xs rounded-full bg-inverse-surface text-inverse-on-surface font-body-sm text-body-sm shadow-xl flex items-center gap-2 transition-all duration-300">
          <span className="material-symbols-outlined text-base text-secondary-fixed">favorite</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
