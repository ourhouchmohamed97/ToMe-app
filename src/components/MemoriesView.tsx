import React, { useState } from 'react';
import { MemoryItem } from '../types';

interface MemoriesViewProps {
  memories: MemoryItem[];
  onOpenMemoryDetail: (memory: MemoryItem) => void;
  onOpenPhotoLightbox?: (url: string, caption?: string) => void;
}

export const MemoriesView: React.FC<MemoriesViewProps> = ({
  memories,
  onOpenMemoryDetail,
  onOpenPhotoLightbox,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'photo' | 'voice' | 'milestone'>('all');
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [likedMemoryIds, setLikedMemoryIds] = useState<Record<string, boolean>>({});
  const [copiedShareId, setCopiedShareId] = useState<string | null>(null);

  const toggleVoicePlay = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayingVoiceId((prev) => (prev === id ? null : id));
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedMemoryIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShare = (quote: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(quote);
      setCopiedShareId(id);
      setTimeout(() => setCopiedShareId(null), 2000);
    }
  };

  // Filter memories
  const filteredMemories = memories.filter((mem) => {
    const matchesSearch =
      !searchQuery.trim() ||
      mem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mem.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mem.dateLabel.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'photo' && mem.type === 'photo') ||
      (activeFilter === 'voice' && mem.type === 'voice') ||
      (activeFilter === 'milestone' && (mem.type === 'milestone' || mem.tag.includes('Presentation')));

    return matchesSearch && matchesFilter;
  });

  // Group by month
  const groupedMonths = Array.from(new Set(filteredMemories.map((m) => m.monthYear)));

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Title & Description */}
      <div className="flex flex-col gap-space-sm pt-space-xs pb-space-md">
        <div className="flex flex-col gap-space-2xs">
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Your memories
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant font-normal">
            Little pieces of your life, saved for later.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full mt-space-xs">
          <div className="flex items-center w-full bg-surface-container-lowest rounded-full px-space-md py-3 shadow-[0_2px_8px_-2px_rgba(35,31,29,0.03),0_1px_2px_rgba(35,31,29,0.02)] border border-surface-container-highest/60 transition-shadow focus-within:shadow-[0_4px_16px_-2px_rgba(151,71,46,0.12)]">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px] select-none mr-space-xs">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/70 placeholder:font-normal focus:outline-none"
              placeholder="Search your memories, thoughts, or dates…"
              type="text"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full text-on-surface-variant/60 hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            ) : (
              <button
                aria-label="Filter"
                className="p-1 rounded-full text-on-surface-variant/60 hover:text-on-surface transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-space-xs overflow-x-auto py-1 no-scrollbar -mx-margin-mobile px-margin-mobile">
          <button
            onClick={() => setActiveFilter('all')}
            className={`filter-pill shrink-0 px-4 py-1.5 rounded-full font-label-md text-label-md font-medium transition-all shadow-xs ${
              activeFilter === 'all'
                ? 'bg-secondary-container text-on-secondary-container'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high border border-surface-container-highest/50'
            }`}
          >
            All (47)
          </button>
          <button
            onClick={() => setActiveFilter('photo')}
            className={`filter-pill shrink-0 px-4 py-1.5 rounded-full font-label-md text-label-md font-medium transition-all shadow-xs ${
              activeFilter === 'photo'
                ? 'bg-secondary-container text-on-secondary-container'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high border border-surface-container-highest/50'
            }`}
          >
            Photos
          </button>
          <button
            onClick={() => setActiveFilter('voice')}
            className={`filter-pill shrink-0 px-4 py-1.5 rounded-full font-label-md text-label-md font-medium transition-all shadow-xs ${
              activeFilter === 'voice'
                ? 'bg-secondary-container text-on-secondary-container'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high border border-surface-container-highest/50'
            }`}
          >
            Voice notes
          </button>
          <button
            onClick={() => setActiveFilter('milestone')}
            className={`filter-pill shrink-0 px-4 py-1.5 rounded-full font-label-md text-label-md font-medium transition-all shadow-xs ${
              activeFilter === 'milestone'
                ? 'bg-secondary-container text-on-secondary-container'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high border border-surface-container-highest/50'
            }`}
          >
            Milestones
          </button>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="relative flex flex-col gap-space-xl mt-space-xs">
        {/* Timeline connector line */}
        <div className="absolute left-4 top-5 bottom-8 w-[1.5px] bg-surface-container-high -z-0"></div>

        {groupedMonths.length === 0 ? (
          <div className="text-center py-12 text-on-surface-variant">
            <p className="font-headline-sm">No memories found</p>
            <p className="font-body-sm mt-1">Try adjusting your search query or filters.</p>
          </div>
        ) : (
          groupedMonths.map((month) => {
            const items = filteredMemories.filter((m) => m.monthYear === month);
            return (
              <section key={month} className="flex flex-col gap-space-md relative">
                {/* Month marker */}
                <div className="flex items-center gap-space-xs z-10">
                  <span className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-secondary shadow-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
                    {month}
                  </h2>
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider bg-surface-container px-2 py-0.5 rounded-full">
                    {items.length} {items.length === 1 ? 'entry' : 'entries'}
                  </span>
                </div>

                {/* Items in this month */}
                <div className="flex flex-col gap-space-md ml-4 pl-space-md">
                  {items.map((mem) => {
                    // Card 1: Photo Capsule Memory
                    if (mem.type === 'photo') {
                      return (
                        <article
                          key={mem.id}
                          onClick={() => onOpenMemoryDetail(mem)}
                          className="group relative flex flex-col bg-surface-container-lowest rounded-2xl p-space-md shadow-[0_12px_36px_-8px_rgba(70,50,40,0.07),0_4px_12px_-2px_rgba(35,31,29,0.03)] border border-surface-container-highest/50 transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-6px_rgba(151,71,46,0.1)] cursor-pointer"
                        >
                          <div className="flex items-center justify-between gap-space-xs mb-space-xs">
                            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold">
                              {mem.dateLabel}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-caps text-label-caps font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                              {mem.tag}
                            </span>
                          </div>

                          <p className="font-headline-sm text-headline-sm text-on-surface font-normal italic leading-relaxed mb-space-sm">
                            {mem.quote}
                          </p>

                          {mem.photoUrl && (
                            <div className="relative w-full rounded-xl overflow-hidden bg-primary mb-space-sm p-1.5 shadow-xs">
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenPhotoLightbox?.(mem.photoUrl!, mem.quote);
                                }}
                                className="relative w-full aspect-[4/3] rounded-lg overflow-hidden"
                              >
                                <img
                                  className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-[1.02]"
                                  alt="Nostalgic film photography"
                                  src={mem.photoUrl}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent"></div>
                                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-surface-container-lowest/90 backdrop-blur-md px-2 py-0.5 rounded-full text-on-surface text-[10px] font-medium tracking-tight">
                                  <span className="material-symbols-outlined text-[13px] text-secondary">
                                    photo_camera
                                  </span>
                                  {mem.photoTag || 'Analog frame'}
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex flex-wrap items-center gap-space-xs pt-space-2xs">
                            <span className="inline-flex items-center gap-1 bg-surface-container-low px-2.5 py-1 rounded-full text-on-surface font-label-md text-label-md">
                              <span className="material-symbols-outlined text-[15px] text-secondary">
                                image
                              </span>
                              {mem.photoCount || 1} Photo
                            </span>
                            {mem.resurfaceNotice && (
                              <span className="inline-flex items-center gap-1 bg-secondary-fixed/50 px-2.5 py-1 rounded-full text-on-secondary-fixed-variant font-label-md text-label-md">
                                <span className="material-symbols-outlined text-[15px]">
                                  cloud_upload
                                </span>
                                {mem.resurfaceNotice}
                              </span>
                            )}
                          </div>

                          <div className="mt-space-sm pt-space-xs flex items-center justify-between text-secondary">
                            <span className="font-label-md text-label-md font-semibold tracking-tight">
                              View full conversation
                            </span>
                            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                              arrow_forward
                            </span>
                          </div>
                        </article>
                      );
                    }

                    // Card 2: Voice Memo Memory
                    if (mem.type === 'voice') {
                      const isPlaying = playingVoiceId === mem.id;
                      return (
                        <article
                          key={mem.id}
                          onClick={() => onOpenMemoryDetail(mem)}
                          className="group relative flex flex-col bg-surface-container-lowest rounded-2xl p-space-md shadow-[0_12px_36px_-8px_rgba(70,50,40,0.07),0_4px_12px_-2px_rgba(35,31,29,0.03)] border border-surface-container-highest/50 transition-all hover:-translate-y-0.5 cursor-pointer"
                        >
                          <div className="flex items-center justify-between gap-space-xs mb-space-xs">
                            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold">
                              {mem.dateLabel}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-caps text-label-caps font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                              {mem.tag}
                            </span>
                          </div>

                          <p className="font-headline-sm text-headline-sm text-on-surface font-normal italic leading-relaxed mb-space-sm">
                            {mem.quote}
                          </p>

                          <div className="w-full bg-surface-container-low rounded-xl p-space-sm mb-space-xs flex items-center justify-between">
                            <div className="flex items-center gap-space-xs">
                              <button
                                onClick={(e) => toggleVoicePlay(mem.id, e)}
                                className="w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-xs hover:scale-105 transition-transform active:scale-95"
                              >
                                <span
                                  className="material-symbols-outlined text-[20px]"
                                  style={{ fontVariationSettings: "'FILL' 1" }}
                                >
                                  {isPlaying ? 'pause' : 'play_arrow'}
                                </span>
                              </button>
                              <div className="flex flex-col">
                                <span className="font-label-md text-label-md font-semibold text-on-surface">
                                  Voice memo
                                </span>
                                <span className="font-body-sm text-body-sm text-on-surface-variant leading-none">
                                  {isPlaying ? 'Playing...' : mem.audioDuration || '0:42 duration'}
                                </span>
                              </div>
                            </div>

                            {/* Dynamic Animated Waveform */}
                            <div className="flex items-center gap-0.5 h-6 px-2">
                              <span
                                className={`w-[2px] rounded-full bg-secondary transition-all duration-300 ${
                                  isPlaying ? 'h-5 animate-pulse' : 'h-3 opacity-60'
                                }`}
                              ></span>
                              <span
                                className={`w-[2px] rounded-full bg-secondary transition-all duration-300 ${
                                  isPlaying ? 'h-6' : 'h-5'
                                }`}
                              ></span>
                              <span
                                className={`w-[2px] rounded-full bg-secondary transition-all duration-300 ${
                                  isPlaying ? 'h-3 animate-pulse' : 'h-2 opacity-50'
                                }`}
                              ></span>
                              <span
                                className={`w-[2px] rounded-full bg-secondary transition-all duration-300 ${
                                  isPlaying ? 'h-6' : 'h-6'
                                }`}
                              ></span>
                              <span
                                className={`w-[2px] rounded-full bg-secondary transition-all duration-300 ${
                                  isPlaying ? 'h-4 animate-pulse' : 'h-4 opacity-70'
                                }`}
                              ></span>
                              <span
                                className={`w-[2px] rounded-full bg-secondary transition-all duration-300 ${
                                  isPlaying ? 'h-5' : 'h-2 opacity-40'
                                }`}
                              ></span>
                              <span
                                className={`w-[2px] rounded-full bg-secondary transition-all duration-300 ${
                                  isPlaying ? 'h-6 animate-pulse' : 'h-5'
                                }`}
                              ></span>
                              <span
                                className={`w-[2px] rounded-full bg-secondary transition-all duration-300 ${
                                  isPlaying ? 'h-4' : 'h-3 opacity-60'
                                }`}
                              ></span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-space-xs">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed-variant font-label-md text-label-md font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                              Resurfacing soon
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenMemoryDetail(mem);
                              }}
                              className="text-on-surface-variant hover:text-on-surface p-1 rounded-full transition-colors"
                              title="More options"
                            >
                              <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                            </button>
                          </div>
                        </article>
                      );
                    }

                    // Card 3: Thought Fragment Memory
                    return (
                      <article
                        key={mem.id}
                        onClick={() => onOpenMemoryDetail(mem)}
                        className="group relative flex flex-col bg-surface-container-lowest rounded-2xl p-space-md shadow-[0_12px_36px_-8px_rgba(70,50,40,0.07),0_4px_12px_-2px_rgba(35,31,29,0.03)] border border-surface-container-highest/50 transition-all hover:-translate-y-0.5 cursor-pointer"
                      >
                        <div className="flex items-center justify-between gap-space-xs mb-space-xs">
                          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider font-semibold">
                            {mem.dateLabel}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-caps text-label-caps font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                            {mem.tag}
                          </span>
                        </div>

                        <p className="font-headline-sm text-headline-sm text-on-surface font-normal italic leading-relaxed mb-space-sm">
                          {mem.quote}
                        </p>

                        <div className="flex items-center justify-between pt-space-2xs">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant font-label-md text-label-md">
                            <span className="material-symbols-outlined text-[15px] text-on-surface-variant">
                              chat_bubble_outline
                            </span>
                            Thought fragment
                          </span>
                          <div className="flex items-center gap-space-2xs">
                            <button
                              onClick={(e) => toggleLike(mem.id, e)}
                              className={`w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container transition-colors ${
                                likedMemoryIds[mem.id] ? 'text-secondary' : 'text-on-surface-variant'
                              }`}
                              title="Favorite thought"
                            >
                              <span
                                className="material-symbols-outlined text-[18px]"
                                style={
                                  likedMemoryIds[mem.id]
                                    ? { fontVariationSettings: "'FILL' 1" }
                                    : {}
                                }
                              >
                                favorite
                              </span>
                            </button>
                            <button
                              onClick={(e) => handleShare(mem.quote, mem.id, e)}
                              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant transition-colors relative"
                              title="Copy quote"
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                {copiedShareId === mem.id ? 'check' : 'share'}
                              </span>
                              {copiedShareId === mem.id && (
                                <span className="absolute -top-7 right-0 text-[10px] bg-primary text-on-primary px-1.5 py-0.5 rounded shadow-xs whitespace-nowrap">
                                  Copied
                                </span>
                              )}
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })
        )}

        {/* Bottom Garden Message */}
        <div className="flex flex-col items-center justify-center py-space-md text-center">
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center mb-space-xs text-on-surface-variant shadow-xs">
            <span className="material-symbols-outlined text-[20px]">auto_stories</span>
          </div>
          <p className="font-headline-sm text-headline-sm text-on-surface">
            You've reached the beginning
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs mt-0.5 leading-relaxed">
            Every thought you write quietly becomes part of this garden.
          </p>
        </div>
      </div>
    </div>
  );
};
