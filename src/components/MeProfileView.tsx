import React, { useState } from 'react';
import { ProfilePreferences } from '../types';
import { ASSETS } from '../data/mockData';

interface MeProfileViewProps {
  profile: ProfilePreferences;
  onUpdateProfile: (updated: Partial<ProfilePreferences>) => void;
  onExportData: () => void;
  onEraseJournal: () => void;
}

export const MeProfileView: React.FC<MeProfileViewProps> = ({
  profile,
  onUpdateProfile,
  onExportData,
  onEraseJournal,
}) => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showFrequencyPicker, setShowFrequencyPicker] = useState(false);
  const [showEraseConfirm, setShowEraseConfirm] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const triggerToast = (text: string) => {
    setFeedbackToast(text);
    setTimeout(() => setFeedbackToast(null), 2500);
  };

  const handleToggleDaily = () => {
    const nextVal = !profile.dailyCheckIn;
    onUpdateProfile({ dailyCheckIn: nextVal });
    triggerToast(nextVal ? 'Daily check-in enabled' : 'Daily check-in paused');
  };

  const handleToggleReminders = () => {
    const nextVal = !profile.memoryReminders;
    onUpdateProfile({ memoryReminders: nextVal });
    triggerToast(nextVal ? 'Memory resurfacing enabled' : 'Memory resurfacing paused');
  };

  const timeOptions = ['8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM'];
  const frequencyOptions = [
    'Quietly daily',
    'Occasional & surprise',
    'Weekly reflection',
    'Monthly time capsule',
  ];

  return (
    <div className="flex flex-col w-full pb-28 relative">
      {/* Profile Card */}
      <section className="relative bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-surface-container-highest/60 overflow-hidden mb-space-lg mt-2">
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-secondary-container/15 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex items-center gap-space-md mb-space-lg">
          <div className="relative">
            <img
              className="w-16 h-16 rounded-full object-cover shadow-xs bg-surface-container"
              alt="Elena Rostova"
              src={profile.avatarUrl || ASSETS.meProfileAvatar}
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-secondary ring-2 ring-surface-container-lowest flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest"></span>
            </span>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <h2 className="font-headline-md text-headline-md text-on-surface truncate">
              {profile.name}
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mt-0.5">
              {profile.subtitle}
            </p>
          </div>
        </div>

        {/* 3-Column Stats Grid */}
        <div className="grid grid-cols-3 gap-space-xs pt-space-md border-t-0 bg-surface-container-low/60 rounded-xl p-space-sm border border-surface-container-highest/40">
          <div className="flex flex-col items-center text-center px-space-xs py-space-2xs">
            <span className="font-headline-sm text-headline-sm text-on-surface">
              {profile.memoriesSavedCount}
            </span>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase mt-1">
              Memories saved
            </span>
          </div>
          <div className="flex flex-col items-center text-center px-space-xs py-space-2xs">
            <span className="font-headline-sm text-headline-sm text-secondary">
              {profile.resurfacedCount}
            </span>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase mt-1">
              Resurfaced
            </span>
          </div>
          <div className="flex flex-col items-center text-center px-space-xs py-space-2xs">
            <span className="font-headline-sm text-headline-sm text-on-surface">
              {profile.photosKeptCount}
            </span>
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase mt-1">
              Photos kept
            </span>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-space-lg">
        {/* Section: Your ToMe */}
        <section className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between px-space-xs">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
              Your ToMe
            </span>
            <span className="material-symbols-outlined text-base text-outline">lock</span>
          </div>
          <div className="bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/60 overflow-hidden divide-y divide-surface-container-high/40">
            {/* Journal since */}
            <div className="p-space-md flex items-center justify-between gap-space-sm hover:bg-surface-container-low/50 transition-colors">
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-lg">calendar_today</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-lg text-label-lg text-on-surface">Journal since</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Sanctuary creation
                  </span>
                </div>
              </div>
              <span className="font-body-md text-body-md text-on-surface whitespace-nowrap">
                September 2, 2026
              </span>
            </div>

            {/* Vault encryption */}
            <div className="p-space-md flex items-center justify-between gap-space-sm bg-surface-container-lowest hover:bg-surface-container-low/50 transition-colors">
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-lg">shield</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-lg text-label-lg text-on-surface">
                    Vault encryption
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Client-side keys only
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant border border-surface-container-highest/60">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span className="font-label-md text-label-md">End-to-end private</span>
              </div>
            </div>

            {/* Memory delivery style */}
            <div className="p-space-md flex items-center justify-between gap-space-sm bg-surface-container-lowest hover:bg-surface-container-low/50 transition-colors">
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-lg">forum</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-lg text-label-lg text-on-surface">
                    Memory delivery style
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Reflection tone
                  </span>
                </div>
              </div>
              <span className="font-body-md text-body-md text-on-surface whitespace-nowrap">
                {profile.deliveryStyle}
              </span>
            </div>
          </div>
        </section>

        {/* Section: Preferences */}
        <section className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between px-space-xs">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
              Preferences
            </span>
            <span className="material-symbols-outlined text-base text-outline">tune</span>
          </div>
          <div className="bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/60 overflow-hidden divide-y divide-surface-container-high/40">
            {/* Daily check-in */}
            <div className="p-space-md flex items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-lg">bedtime</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-lg text-label-lg text-on-surface">Daily check-in</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Subtle evening nudge
                  </span>
                </div>
              </div>
              <button
                onClick={handleToggleDaily}
                aria-checked={profile.dailyCheckIn}
                role="switch"
                type="button"
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none ${
                  profile.dailyCheckIn ? 'bg-secondary' : 'bg-surface-container-highest'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-surface-container-lowest shadow-sm transition-transform duration-200 ${
                    profile.dailyCheckIn ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Memory reminders */}
            <div className="p-space-md flex items-center justify-between gap-space-sm bg-surface-container-lowest">
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-lg">magic_button</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-lg text-label-lg text-on-surface">
                    Memory reminders
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Resurface past thoughts
                  </span>
                </div>
              </div>
              <button
                onClick={handleToggleReminders}
                aria-checked={profile.memoryReminders}
                role="switch"
                type="button"
                className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none ${
                  profile.memoryReminders ? 'bg-secondary' : 'bg-surface-container-highest'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-surface-container-lowest shadow-sm transition-transform duration-200 ${
                    profile.memoryReminders ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Preferred check-in time */}
            <div
              onClick={() => setShowTimePicker(true)}
              className="p-space-md flex items-center justify-between gap-space-sm bg-surface-container-lowest hover:bg-surface-container-low/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-lg">schedule</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-lg text-label-lg text-on-surface">
                    Preferred check-in time
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Quiet hour prompt
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-on-surface">
                <span className="font-body-md text-body-md">{profile.checkInTime}</span>
                <span className="material-symbols-outlined text-base text-outline">
                  chevron_right
                </span>
              </div>
            </div>

            {/* Frequency */}
            <div
              onClick={() => setShowFrequencyPicker(true)}
              className="p-space-md flex items-center justify-between gap-space-sm bg-surface-container-lowest hover:bg-surface-container-low/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-lg">cyclone</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-lg text-label-lg text-on-surface">Frequency</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Pacing rhythm
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-on-surface">
                <span className="font-body-md text-body-md">{profile.frequency}</span>
                <span className="material-symbols-outlined text-base text-outline">
                  chevron_right
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Privacy & Control */}
        <section className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between px-space-xs">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
              Privacy & Control
            </span>
            <span className="material-symbols-outlined text-base text-outline">
              verified_user
            </span>
          </div>
          <div className="bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-highest/60 overflow-hidden divide-y divide-surface-container-high/40">
            {/* Private by default */}
            <div className="p-space-md flex items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-lg">visibility_off</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-lg text-label-lg text-on-surface">
                    Private by default
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Zero tracking or analytics
                  </span>
                </div>
              </div>
              <span className="font-label-md text-label-md px-2.5 py-1 rounded-full bg-secondary-container/30 text-on-secondary-fixed-variant">
                Always on
              </span>
            </div>

            {/* Export all memories */}
            <button
              onClick={onExportData}
              className="w-full text-left p-space-md flex items-center justify-between gap-space-sm bg-surface-container-lowest hover:bg-surface-container-low/50 transition-colors focus:outline-none"
              type="button"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-lg">download</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-lg text-label-lg text-on-surface">
                    Export all memories
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Download JSON & Photos
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-lg text-outline">
                file_download
              </span>
            </button>

            {/* Erase journal */}
            <button
              onClick={() => setShowEraseConfirm(true)}
              className="w-full text-left p-space-md flex items-center justify-between gap-space-sm bg-surface-container-lowest hover:bg-error-container/20 transition-colors focus:outline-none group"
              type="button"
            >
              <div className="flex items-center gap-space-sm min-w-0">
                <div className="w-9 h-9 rounded-full bg-error-container/50 group-hover:bg-error-container flex items-center justify-center text-error transition-colors">
                  <span className="material-symbols-outlined text-lg">delete_forever</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-lg text-label-lg text-error font-medium">
                    Erase journal
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Permanently delete all data
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-lg text-error">chevron_right</span>
            </button>
          </div>
        </section>

        {/* Peaceful Footer */}
        <div className="flex flex-col items-center text-center pt-space-md pb-space-sm px-space-md">
          <div className="w-6 h-6 mb-space-xs opacity-50 flex items-center justify-center text-on-surface-variant">
            <span className="material-symbols-outlined text-lg">spa</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
            ToMe v1.0 · A quiet space for your present and future self.
          </p>
        </div>
      </div>

      {/* Time Picker Dialog Modal */}
      {showTimePicker && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-5 w-full max-w-sm border border-surface-container-highest shadow-xl">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">
              Select Check-in Time
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
              When would you like ToMe to softly greet you?
            </p>
            <div className="flex flex-col gap-1.5 mb-5">
              {timeOptions.map((time) => (
                <button
                  key={time}
                  onClick={() => {
                    onUpdateProfile({ checkInTime: time });
                    setShowTimePicker(false);
                    triggerToast(`Check-in time updated to ${time}`);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-left font-body-md transition-colors flex items-center justify-between ${
                    profile.checkInTime === time
                      ? 'bg-secondary text-on-secondary font-medium'
                      : 'hover:bg-surface-container text-on-surface'
                  }`}
                >
                  <span>{time}</span>
                  {profile.checkInTime === time && (
                    <span className="material-symbols-outlined text-base">check</span>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowTimePicker(false)}
              className="w-full py-2.5 rounded-full bg-surface-container text-on-surface font-label-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Frequency Picker Dialog Modal */}
      {showFrequencyPicker && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-5 w-full max-w-sm border border-surface-container-highest shadow-xl">
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">
              Memory Resurfacing Frequency
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
              Set the rhythm for rediscovering moments from your past.
            </p>
            <div className="flex flex-col gap-1.5 mb-5">
              {frequencyOptions.map((freq) => (
                <button
                  key={freq}
                  onClick={() => {
                    onUpdateProfile({ frequency: freq });
                    setShowFrequencyPicker(false);
                    triggerToast(`Pacing rhythm set to ${freq}`);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-left font-body-md transition-colors flex items-center justify-between ${
                    profile.frequency === freq
                      ? 'bg-secondary text-on-secondary font-medium'
                      : 'hover:bg-surface-container text-on-surface'
                  }`}
                >
                  <span>{freq}</span>
                  {profile.frequency === freq && (
                    <span className="material-symbols-outlined text-base">check</span>
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowFrequencyPicker(false)}
              className="w-full py-2.5 rounded-full bg-surface-container text-on-surface font-label-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Erase Confirm Dialog Modal */}
      {showEraseConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl p-5 w-full max-w-sm border border-error-container shadow-xl">
            <div className="w-10 h-10 rounded-full bg-error-container text-error flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-xl">warning</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-1">
              Erase Entire Journal?
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-5 leading-relaxed">
              This will permanently delete all 47 memories, photos, and time capsules stored in this device's vault. This cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowEraseConfirm(false)}
                className="flex-1 py-2.5 rounded-full bg-surface-container text-on-surface font-label-md"
              >
                Keep Journal
              </button>
              <button
                onClick={() => {
                  onEraseJournal();
                  setShowEraseConfirm(false);
                  triggerToast('Journal vault reset.');
                }}
                className="flex-1 py-2.5 rounded-full bg-error text-on-error font-label-md"
              >
                Yes, Erase All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Feedback */}
      {feedbackToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-space-md py-space-xs rounded-full bg-inverse-surface text-inverse-on-surface font-body-sm text-body-sm shadow-xl flex items-center gap-2 transition-all">
          <span className="material-symbols-outlined text-base text-secondary-fixed">check_circle</span>
          <span>{feedbackToast}</span>
        </div>
      )}
    </div>
  );
};
