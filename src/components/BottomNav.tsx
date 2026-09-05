import React from 'react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onSelectTab }) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe pointer-events-none">
      <div className="px-margin-mobile pb-space-sm pt-space-2xs pointer-events-auto">
        <div className="max-w-content-max-width mx-auto bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_12px_36px_-8px_rgba(70,50,40,0.07),0_4px_12px_-2px_rgba(35,31,29,0.03)] border border-surface-container-highest/60 rounded-full px-space-md py-space-xs flex items-center justify-around">
          <button
            onClick={() => onSelectTab('today')}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-all gap-0.5 focus:outline-none ${
              activeTab === 'today'
                ? 'text-secondary font-medium scale-[1.03]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            aria-label="Today"
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={activeTab === 'today' ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              auto_awesome
            </span>
            <span className="font-label-md text-label-md tracking-tight">Today</span>
          </button>

          <button
            onClick={() => onSelectTab('memories')}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-all gap-0.5 focus:outline-none ${
              activeTab === 'memories' || activeTab === 'memory-detail'
                ? 'text-secondary font-medium scale-[1.03]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            aria-label="Memories"
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={
                activeTab === 'memories' || activeTab === 'memory-detail'
                  ? { fontVariationSettings: "'FILL' 1" }
                  : {}
              }
            >
              auto_stories
            </span>
            <span className="font-label-md text-label-md tracking-tight">Memories</span>
          </button>

          <button
            onClick={() => onSelectTab('me')}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-all gap-0.5 focus:outline-none ${
              activeTab === 'me'
                ? 'text-secondary font-medium scale-[1.03]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
            aria-label="Me"
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={activeTab === 'me' ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              account_circle
            </span>
            <span className="font-label-md text-label-md tracking-tight">Me</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
