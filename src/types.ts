export type ActiveTab = 'today' | 'memories' | 'me' | 'memory-detail';

export type TodaySubView = 'chat' | 'evening';

export interface ChatMessage {
  id: string;
  sender: 'tome' | 'user';
  text: string;
  timestamp?: string;
  timeLabel?: string;
  isCapsuleSealed?: boolean;
  photoUrl?: string;
  photoCaption?: string;
  photoLocation?: string;
  photoTime?: string;
  statusText?: string;
  isInitial?: boolean;
}

export interface MemoryItem {
  id: string;
  monthYear: string; // e.g. 'September 2026'
  dateLabel: string; // e.g. 'September 5 · 7:15 PM'
  title: string;
  tag: string;
  quote: string;
  type: 'photo' | 'voice' | 'thought' | 'milestone';
  photoUrl?: string;
  photoTag?: string;
  photoCount?: number;
  resurfaceNotice?: string;
  audioDuration?: string;
  isResurfacingSoon?: boolean;
  isFavorite?: boolean;
  notesAppended?: string[];
}

export interface ProfilePreferences {
  name: string;
  subtitle: string;
  avatarUrl: string;
  memoriesSavedCount: number;
  resurfacedCount: number;
  photosKeptCount: number;
  dailyCheckIn: boolean;
  memoryReminders: boolean;
  checkInTime: string;
  frequency: string;
  encryption: string;
  deliveryStyle: string;
}
