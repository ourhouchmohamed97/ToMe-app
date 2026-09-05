import React from 'react';
import { ActiveTab, TodaySubView } from '../types';
import { ASSETS } from '../data/mockData';

interface HeaderProps {
  activeTab: ActiveTab;
  todaySubView?: TodaySubView;
  onSelectTab: (tab: ActiveTab) => void;
  onBackFromDetail?: () => void;
  onToggleEveningCheckin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  todaySubView,
  onSelectTab,
  onBackFromDetail,
  onToggleEveningCheckin,
}) => {
  const getSubTitle = () => {
    if (activeTab === 'today') {
      return todaySubView === 'evening' ? 'Evening Check-in' : 'Today';
    }
    if (activeTab === 'memories') return 'Memories';
    if (activeTab === 'me') return 'Me';
    if (activeTab === 'memory-detail') return 'Memory Detail';
    return 'Today';
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] pt-safe border-b border-surface-container-high/40">
      <div className="h-16 px-margin-mobile flex items-center justify-between max-w-content-max-width mx-auto">
        <div className="flex items-center gap-space-sm">
          {activeTab === 'memory-detail' ? (
            <button
              aria-label="Go back"
              onClick={onBackFromDetail}
              className="w-10 h-10 -ml-2 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors rounded-full focus:outline-none"
            >
              <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
            </button>
          ) : null}

          <div
            className="flex items-center gap-space-sm cursor-pointer"
            onClick={() => onSelectTab('today')}
          >
            <img
              alt="ToMe Brand Logo"
              className="h-8 w-auto object-contain"
              src={ASSETS.logo}
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none">
                  ToMe
                </span>
                <span className="w-1 h-1 rounded-full bg-secondary opacity-60"></span>
                <span className="font-headline-sm text-headline-sm text-on-surface-variant font-normal leading-none capitalize">
                  {getSubTitle()}
                </span>
              </div>
              <span className="font-label-caps text-label-caps text-on-surface-variant uppercase mt-0.5 tracking-wider">
                Your private journal
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-space-xs">
          {activeTab === 'today' && onToggleEveningCheckin && (
            <button
              onClick={onToggleEveningCheckin}
              title={todaySubView === 'evening' ? 'Switch to Morning / Day chat' : 'Open Evening Check-in'}
              className="px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all bg-surface-container hover:bg-surface-container-high text-on-surface-variant active:scale-95"
            >
              <span className="material-symbols-outlined text-[15px] text-secondary">
                {todaySubView === 'evening' ? 'wb_sunny' : 'bedtime'}
              </span>
              <span className="hidden sm:inline font-label-md">
                {todaySubView === 'evening' ? 'Day flow' : 'Evening check-in'}
              </span>
            </button>
          )}

          <button
            onClick={() => onSelectTab('me')}
            className={`min-w-[44px] min-h-[44px] p-space-2xs flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors focus:outline-none ring-offset-2 ${
              activeTab === 'me' ? 'ring-2 ring-secondary' : ''
            }`}
            title="View profile and preferences"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover shadow-xs"
              src={ASSETS.avatar}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
