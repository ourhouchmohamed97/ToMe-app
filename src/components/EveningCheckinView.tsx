import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';

interface EveningCheckinViewProps {
  onBackToChat: () => void;
  onSavedReflection?: (text: string, sealPeriod: string) => void;
  onOpenPhotoLightbox?: (url: string, caption?: string) => void;
}

export const EveningCheckinView: React.FC<EveningCheckinViewProps> = ({
  onBackToChat,
  onSavedReflection,
  onOpenPhotoLightbox,
}) => {
  const [reflectionText, setReflectionText] = useState('');
  const [sealPeriod, setSealPeriod] = useState('1 yr');
  const [isSealing, setIsSealing] = useState(false);
  const [isSealedDone, setIsSealedDone] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  const cycleSealPeriod = () => {
    const periods = ['6 mos', '1 yr', '3 yrs', '5 yrs'];
    const currentIndex = periods.indexOf(sealPeriod);
    const nextIndex = (currentIndex + 1) % periods.length;
    setSealPeriod(periods[nextIndex]);
  };

  const handleSaveReflection = () => {
    if (isSealedDone) return;
    setIsSealing(true);
    setTimeout(() => {
      setIsSealing(false);
      setIsSealedDone(true);
      if (onSavedReflection) {
        onSavedReflection(reflectionText, sealPeriod);
      }
    }, 900);
  };

  return (
    <div className="flex flex-col w-full pb-28 relative">
      {/* Subtle Ambient Glow SVG */}
      <div className="relative w-full overflow-hidden flex flex-col items-center">
        <svg
          className="absolute -top-10 -right-16 w-56 h-56 text-secondary-container/20 pointer-events-none blur-2xl"
          fill="currentColor"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="90"></circle>
        </svg>
        <svg
          className="absolute top-28 -left-20 w-64 h-64 text-tertiary-fixed/25 pointer-events-none blur-3xl"
          fill="currentColor"
          viewBox="0 0 200 200"
        >
          <circle cx="100" cy="100" r="80"></circle>
        </svg>

        {/* Return to day flow button */}
        <div className="w-full flex justify-between items-center mb-1">
          <button
            onClick={onBackToChat}
            className="inline-flex items-center gap-1 text-on-surface-variant hover:text-on-surface text-xs font-medium px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Return to morning thread</span>
          </button>
        </div>

        {/* Top Time Badge & Greeting */}
        <div className="w-full pt-2 pb-4 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-space-xs px-3.5 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant shadow-xs mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
            <span className="font-label-caps text-label-caps uppercase tracking-wider">
              Evening Check-in · 9:30 PM
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Before today ends…
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-xs leading-relaxed">
            Take a slow breath. Let the dust of the day settle gently around you.
          </p>
        </div>

        {/* Context Summary Card (Parchment Paper Feel) */}
        <div className="w-full bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_4px_20px_-4px_rgba(35,31,29,0.05)] border border-surface-container-highest/60 mt-2">
          {/* Header / Highlight */}
          <div className="flex items-center justify-between gap-space-xs mb-3">
            <div className="flex items-center gap-space-xs">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-surface-container text-secondary">
                <span className="material-symbols-outlined text-[16px]">wb_twilight</span>
              </span>
              <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                Day in Review
              </span>
            </div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-label-caps text-label-caps">
              3 moments saved
            </span>
          </div>

          {/* AI Synthesized Prose */}
          <div className="relative pl-3.5 my-3">
            <div className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-secondary-container"></div>
            <p className="font-headline-sm text-headline-sm text-on-surface italic font-normal leading-relaxed">
              “Today was mostly about your morning presentation, a sudden creative idea after lunch, and watching the sunset by the bluff.”
            </p>
          </div>

          {/* Moments Pills */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-low text-on-surface font-body-sm text-body-sm border border-surface-container-highest/40">
              <span>🌅</span>
              <span className="truncate max-w-[150px]">Ocean Bluff sunset</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-low text-on-surface font-body-sm text-body-sm border border-surface-container-highest/40">
              <span>💼</span>
              <span className="truncate max-w-[150px]">Presentation jitters</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-low text-on-surface font-body-sm text-body-sm border border-surface-container-highest/40">
              <span>💡</span>
              <span className="truncate max-w-[150px]">Architecture idea</span>
            </span>
          </div>

          {/* Micro Visual Accent Card: Sunset Memento Fragment */}
          <div
            onClick={() =>
              onOpenPhotoLightbox?.(
                ASSETS.eveningReviewSunset,
                '“The wind smelled like salt and eucalyptus.”'
              )
            }
            className="mt-4 pt-3 flex items-center gap-space-sm bg-surface-container-low/70 rounded-lg p-2.5 cursor-pointer hover:bg-surface-container-low transition-colors border border-surface-container-highest/30"
          >
            <img
              className="w-11 h-11 rounded-md object-cover flex-shrink-0"
              alt="Sunset memento fragment"
              src={ASSETS.eveningReviewSunset}
            />
            <div className="flex flex-col min-w-0">
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                Captured at 7:14 PM
              </span>
              <span className="font-body-sm text-body-sm text-on-surface truncate">
                “The wind smelled like salt and eucalyptus.”
              </span>
            </div>
          </div>
        </div>

        {/* Reflection Prompt Section */}
        <div className="w-full mt-6 flex flex-col">
          <div className="flex items-start gap-2 mb-2.5 px-1">
            <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">draw</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              Anything from today you want your future self to remember?
            </h2>
          </div>

          {/* Textarea Container */}
          <div className="w-full bg-surface-container-lowest rounded-xl p-space-md shadow-[0_2px_12px_-2px_rgba(35,31,29,0.04)] border border-surface-container-highest/60 focus-within:shadow-[0_8px_24px_-4px_rgba(200,109,81,0.12)] transition-shadow duration-300">
            <textarea
              value={reflectionText}
              onChange={(e) => setReflectionText(e.target.value)}
              disabled={isSealedDone}
              className="w-full bg-transparent resize-none border-none outline-none font-body-lg text-body-lg text-on-surface placeholder:text-on-surface-variant/60 placeholder:font-headline-sm placeholder:italic"
              placeholder="A feeling, an unspoken thought, or how you survived today..."
              rows={4}
            />

            {/* Intimate composition tools row */}
            <div className="flex items-center justify-between pt-2 mt-1 border-t border-surface-container-high/40">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setReflectionText((prev) =>
                      prev ? prev + ' [Whispered audio attached]' : 'A quiet whisper into the night...'
                    );
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors focus:outline-none"
                >
                  <span className="material-symbols-outlined text-[18px]">mic</span>
                  <span className="font-label-md text-label-md">Whisper note</span>
                </button>
                <button
                  type="button"
                  onClick={cycleSealPeriod}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-secondary bg-secondary-fixed/30 hover:bg-secondary-fixed/50 transition-colors focus:outline-none"
                  title="Change time horizon"
                >
                  <span className="material-symbols-outlined text-[18px]">lock_clock</span>
                  <span className="font-label-md text-label-md">Seal for {sealPeriod}</span>
                </button>
              </div>
              <span className="font-label-caps text-label-caps text-on-surface-variant opacity-60">
                {reflectionText.trim().length > 0
                  ? `${reflectionText.trim().length} characters`
                  : 'Ready'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions Area */}
        <div className="w-full mt-6 flex flex-col items-center gap-3">
          {/* Primary Warm Terracotta Button */}
          <button
            onClick={handleSaveReflection}
            disabled={isSealing || isSealedDone}
            className={`w-full h-13 min-h-[52px] rounded-full text-on-secondary transition-all flex items-center justify-center gap-2 shadow-[0_8px_24px_-4px_rgba(151,71,46,0.25)] focus:outline-none active:scale-[0.99] ${
              isSealedDone
                ? 'bg-primary text-on-primary'
                : 'bg-secondary hover:opacity-95'
            }`}
          >
            {isSealing ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">
                  progress_activity
                </span>
                <span className="font-label-lg text-label-lg font-semibold tracking-wide">
                  Sealing for your future...
                </span>
              </>
            ) : isSealedDone ? (
              <>
                <span className="material-symbols-outlined text-[20px]">done_all</span>
                <span className="font-label-lg text-label-lg font-semibold tracking-wide">
                  Rest well. Saved.
                </span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span className="font-label-lg text-label-lg font-semibold tracking-wide">
                  Save reflection
                </span>
              </>
            )}
          </button>

          {/* Secondary Peaceful Skip Link */}
          <button
            onClick={() => setIsSkipped(true)}
            className="min-h-[44px] px-4 py-2 rounded-full text-on-surface-variant hover:text-on-surface transition-colors font-body-sm text-body-sm focus:outline-none text-center"
          >
            {isSkipped ? (
              <span className="text-secondary font-medium">Rest easy tonight. 🌱</span>
            ) : (
              <>
                Skip for tonight —{' '}
                <span className="italic font-headline-sm text-[14px]">feeling complete</span>
              </>
            )}
          </button>
        </div>

        {/* Reassurance Footer */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-center text-on-surface-variant/80 px-4">
          <span className="material-symbols-outlined text-[16px]">lock</span>
          <span className="font-label-md text-label-md">
            Stored only for you. No streaks to break, ever.
          </span>
        </div>
      </div>
    </div>
  );
};
