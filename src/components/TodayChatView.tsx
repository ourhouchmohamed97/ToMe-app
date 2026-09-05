import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { ASSETS } from '../data/mockData';

interface TodayChatViewProps {
  messages: ChatMessage[];
  onSendMessage: (text: string, photoUrl?: string, location?: string) => void;
  onOpenEveningCheckin: () => void;
  onOpenPhotoLightbox?: (url: string, caption?: string) => void;
}

export const TodayChatView: React.FC<TodayChatViewProps> = ({
  messages,
  onSendMessage,
  onOpenEveningCheckin,
  onOpenPhotoLightbox,
}) => {
  const [inputText, setInputText] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Voice recording timer
  useEffect(() => {
    let timer: any;
    if (isRecordingVoice) {
      timer = setInterval(() => {
        setVoiceSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setVoiceSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isRecordingVoice]);

  const handleChipClick = (promptText: string) => {
    setInputText(promptText + ' — ');
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() && !selectedPhoto && !isRecordingVoice) return;

    if (isRecordingVoice) {
      onSendMessage(`🎙️ Voice thought (${Math.max(1, voiceSeconds)}s recorded)`);
      setIsRecordingVoice(false);
      setVoiceSeconds(0);
      return;
    }

    onSendMessage(
      inputText.trim() || (selectedPhoto ? 'Saved a visual moment.' : ''),
      selectedPhoto || undefined,
      selectedPhoto ? 'Ocean Bluff · 6:48 PM' : undefined
    );

    setInputText('');
    setSelectedPhoto(null);
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedPhoto(url);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Sub-Header Temporal Context */}
      <div className="flex flex-col items-center justify-center text-center pt-2 pb-5 space-y-1.5">
        <div className="inline-flex items-center gap-space-xs px-3.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
          <span className="font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant">
            Tuesday, September 8 · Morning
          </span>
        </div>
        <p className="font-headline-sm text-headline-sm text-on-surface-variant italic font-normal tracking-tight">
          Capture today. Hear from yourself later.
        </p>

        {/* Evening Check-in Prompt Banner */}
        <div className="pt-2 w-full">
          <button
            onClick={onOpenEveningCheckin}
            className="w-full text-left bg-gradient-to-r from-secondary-fixed/50 via-surface-container-lowest to-secondary-fixed/40 border border-secondary-container/30 rounded-2xl p-3 shadow-xs hover:shadow-sm transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-base">bedtime</span>
              </span>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-secondary font-semibold uppercase tracking-wider">
                  Evening Check-in Available
                </span>
                <span className="font-body-sm text-body-sm text-on-surface truncate">
                  Before today ends… Take a slow breath and review 3 saved moments.
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-secondary group-hover:translate-x-1 transition-transform ml-2">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      {/* Conversational Flow Thread */}
      <div className="flex flex-col space-y-space-lg w-full">
        {messages.map((msg) => {
          // Time label separator
          if (msg.timeLabel) {
            return (
              <div key={msg.id} className="flex items-center gap-space-sm py-2">
                <div className="flex-1 h-[1px] bg-surface-container-highest"></div>
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-outline px-2 bg-surface">
                  {msg.timeLabel}
                </span>
                <div className="flex-1 h-[1px] bg-surface-container-highest"></div>
              </div>
            );
          }

          // User message with Photo Capsule
          if (msg.sender === 'user' && msg.photoUrl) {
            return (
              <div key={msg.id} className="flex flex-col items-end max-w-[92%] ml-auto space-y-1.5">
                <div className="bg-surface-container-lowest p-2 rounded-2xl rounded-tr-sm shadow-sm w-full overflow-hidden border border-surface-container-highest/40">
                  {/* Embedded Photo Capsule Card */}
                  <div
                    onClick={() => onOpenPhotoLightbox?.(msg.photoUrl!, msg.photoCaption)}
                    className="relative rounded-xl overflow-hidden aspect-square w-full bg-surface-container-high group cursor-pointer"
                  >
                    <img
                      alt="Captured moment"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={msg.photoUrl}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent"></div>

                    {/* Location & Horizon Tag */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-on-primary">
                      <div className="flex items-center gap-1.5 backdrop-blur-md bg-primary/50 px-2.5 py-1 rounded-full text-xs">
                        <span className="material-symbols-outlined text-sm text-secondary-container">
                          location_on
                        </span>
                        <span className="font-label-md text-label-md tracking-tight">
                          {msg.photoLocation || 'Ocean Bluff · 6:48 PM'}
                        </span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-surface-container-lowest/20 backdrop-blur-md flex items-center justify-center">
                        <span className="material-symbols-outlined text-sm text-on-primary">
                          wb_twilight
                        </span>
                      </div>
                    </div>
                  </div>

                  {msg.photoCaption && (
                    <div className="px-space-xs py-space-xs">
                      <p className="font-body-md text-body-md text-on-surface italic">
                        {msg.photoCaption}
                      </p>
                    </div>
                  )}
                </div>
                <span className="font-label-md text-label-md text-outline mr-1">
                  {msg.statusText || 'Stored in Vault'}
                </span>
              </div>
            );
          }

          // User text bubble
          if (msg.sender === 'user') {
            return (
              <div key={msg.id} className="flex flex-col items-end max-w-[86%] ml-auto">
                <div className="bg-primary-container text-on-primary rounded-2xl rounded-tr-sm px-space-md py-space-sm shadow-sm">
                  <p className="font-body-lg text-body-lg text-inverse-on-surface leading-relaxed">
                    {msg.text}
                  </p>
                </div>
                {msg.statusText && (
                  <span className="font-label-md text-label-md text-outline mt-1 mr-1">
                    {msg.statusText}
                  </span>
                )}
              </div>
            );
          }

          // ToMe Sealed Time Capsule Bubble
          if (msg.isCapsuleSealed) {
            return (
              <div key={msg.id} className="flex items-start gap-space-xs max-w-[90%] mr-auto">
                <div className="w-6 h-6 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant shrink-0 mt-1 shadow-sm">
                  <span className="material-symbols-outlined text-[14px]">lock_clock</span>
                </div>
                <div className="bg-surface-container-low rounded-2xl rounded-tl-sm px-space-md py-space-sm shadow-xs border border-surface-container-highest/50 space-y-1.5">
                  <div className="flex items-center gap-1 text-secondary">
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary font-semibold">
                      Time Capsule Sealed
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                    {msg.text}
                  </p>
                </div>
              </div>
            );
          }

          // Standard ToMe bubble
          return (
            <div key={msg.id} className="flex items-start gap-space-xs max-w-[88%] mr-auto">
              <div className="w-6 h-6 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant shrink-0 mt-1 shadow-sm">
                <span className="material-symbols-outlined text-[14px]">
                  {msg.isInitial ? 'temp_preferences_custom' : 'auto_awesome'}
                </span>
              </div>
              <div className="bg-surface-container-low rounded-2xl rounded-tl-sm px-space-md py-space-sm shadow-xs border border-surface-container-highest/40 space-y-2">
                <p
                  className={
                    msg.isInitial
                      ? 'font-headline-sm text-headline-sm text-on-surface leading-snug'
                      : 'font-body-lg text-body-lg text-on-surface leading-relaxed'
                  }
                >
                  {msg.text}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Interactive Suggestion Horizon Chips */}
      <div className="mt-8 mb-3 flex items-center gap-space-xs overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => handleChipClick('Quick note')}
          className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-on-surface shadow-xs hover:shadow-sm transition-all text-xs font-medium focus:outline-none active:scale-95 border border-surface-container-highest/50"
        >
          <span>🌱</span>
          <span className="font-label-md text-label-md">Quick note</span>
        </button>
        <button
          onClick={() => {
            setIsRecordingVoice(true);
          }}
          className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-on-surface shadow-xs hover:shadow-sm transition-all text-xs font-medium focus:outline-none active:scale-95 border border-surface-container-highest/50"
        >
          <span>🎙️</span>
          <span className="font-label-md text-label-md">Voice thought</span>
        </button>
        <button
          onClick={() => {
            setSelectedPhoto(ASSETS.sunsetToday);
            setInputText('"Also, this sunset was incredible."');
          }}
          className="shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant hover:text-on-surface shadow-xs hover:shadow-sm transition-all text-xs font-medium focus:outline-none active:scale-95 border border-surface-container-highest/50"
        >
          <span>🌅</span>
          <span className="font-label-md text-label-md">Golden hour moment</span>
        </button>
      </div>

      {/* Selected photo preview thumbnail */}
      {selectedPhoto && (
        <div className="mb-2 p-2 bg-surface-container-lowest rounded-2xl border border-secondary-container/40 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <img
              src={selectedPhoto}
              alt="Attached preview"
              className="w-12 h-12 rounded-lg object-cover"
            />
            <span className="font-body-sm text-body-sm text-on-surface truncate">
              Sunset snapshot ready to seal
            </span>
          </div>
          <button
            onClick={() => setSelectedPhoto(null)}
            className="p-1 text-on-surface-variant hover:text-on-surface rounded-full"
            title="Remove attachment"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Voice recording active banner */}
      {isRecordingVoice && (
        <div className="mb-2 p-2.5 bg-secondary-fixed/50 rounded-2xl border border-secondary/30 flex items-center justify-between shadow-xs animate-pulse">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
            <span className="font-label-md text-label-md text-on-secondary-fixed-variant font-semibold">
              Recording whisper thought... 0:0{voiceSeconds}
            </span>
          </div>
          <button
            onClick={() => setIsRecordingVoice(false)}
            className="font-label-md text-xs text-secondary underline hover:opacity-80"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Floating Bottom Message Composer */}
      <form
        onSubmit={handleSend}
        className="w-full bg-surface-container-lowest rounded-3xl p-2 shadow-lg border border-surface-container-highest/60 flex items-center gap-2"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoSelect}
        />

        <button
          aria-label="Attach Photo"
          type="button"
          onClick={() => {
            // Offer to attach sample sunset or custom file
            if (fileInputRef.current) {
              fileInputRef.current.click();
            }
          }}
          className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors focus:outline-none shrink-0"
        >
          <span className="material-symbols-outlined text-xl">image</span>
        </button>

        <div className="flex-1 relative flex items-center">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full bg-transparent text-on-surface placeholder:text-outline placeholder:italic text-body-md font-body-md focus:outline-none px-1 py-1"
            placeholder={isRecordingVoice ? 'Recording voice note...' : 'Write something to your future self…'}
            type="text"
            disabled={isRecordingVoice}
          />
        </div>

        {/* Voice Pulse Action */}
        <button
          aria-label="Record Voice Thought"
          type="button"
          onClick={() => setIsRecordingVoice(!isRecordingVoice)}
          className={`relative w-10 h-10 rounded-full flex items-center justify-center text-secondary hover:bg-secondary-fixed/30 transition-colors focus:outline-none shrink-0 ${
            isRecordingVoice ? 'bg-secondary-fixed text-secondary' : ''
          }`}
        >
          {isRecordingVoice ? (
            <span className="absolute inset-1 rounded-full bg-secondary/20 animate-ping opacity-75"></span>
          ) : null}
          <span className="material-symbols-outlined text-xl relative z-10">
            {isRecordingVoice ? 'stop' : 'mic'}
          </span>
        </button>

        {/* Send / Seal Action */}
        <button
          aria-label="Send Note"
          type="submit"
          className="h-10 px-4 rounded-full bg-secondary text-on-secondary flex items-center justify-center gap-1 shadow-sm hover:opacity-95 active:scale-95 transition-all focus:outline-none shrink-0"
        >
          <span className="font-label-md text-label-md font-semibold tracking-wide">Seal</span>
          <span className="material-symbols-outlined text-base">arrow_upward</span>
        </button>
      </form>
    </div>
  );
};
