import { ChatMessage, MemoryItem, ProfilePreferences } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1VbA1PXbu0nKMKhE627xLNj5CB_SWyDZh4cWEx886MUzgwK5pT-hfl_OIRYqRAcKEwKjLSKKtn_GkVV_ESEkabWzTaw1njzZyz_sBhOEjPDiD-X1dvVYYoKjRmwjG7KGZCl_VHxP1ZhFblhIAs5gFG-RzMrbePlLi-znm4Pi1V-xr075VVw7Cbe4zHzogEfRaGjWeUEuR2eCymZXP9duXy9Y_2pZI-iQYfr-6HJj9st8n0GHwbZN2slclAm',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVXNGLRzp6WMMIxJwqsUq9vyDMWXkr7Ye4Mc0Y3M3hnx9zUiwC0spd2IuKUReGp9qEddy6DWm4W_fkYuDp8ohFz_wpu6m5CRVUbHztCFtJh0AkcD6nlnDhxM12jNPktBngKRnx0LbZyW3I6zeNs93j-aEY22GXrZtgyjwJWB3Nh1ukNuPxmhE-4rJoZqgcwkbLUbT1mc3SKspEJTNHXDQa75Pu-8CImt7Vaxlxm1fycvvFpVuleZX2MA',
  meProfileAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEq-4CGulIu0DBqgclQYxibGPb7F5U40sBgK3ThhTUC_xQg4rL-ZH7XhZxcFcHAc8CqmIn4nNnXhn8PQhvqFAq8SRAgqGWFNea5hGYlyv_QCm4JwNgdWXBsFrzUOthRKl8K0U79lP_XcbqdXsWe0b2sE3EL7h3Yayo9xPjn_MJzzYdD0AKRxgbECvl3lKG9GPUfPYx3Uzlp_PLfoe0NaIAyWivfskMNT00NxzwnVxDiZu4ileqB1rEeQ',
  sunsetToday: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5XSv2FtyOGFMxcihpVcD7FxBRgRr1xy3zT5onBLSXbYCczbfyc6hMG0huURX8zbWmXFtIgATCTog76cYrCOq94nek0TxE-SaE_PAYg33t4cx1AHsRVA711VDDOMEKpnV5TQxdKG0aRjlP3F0lW12GTRJWbPjQiswUgbZniM85RTMQHA9f3ro66d_BILO1-imW-PKDYLiVbczqRxLfysS5d_iBfDi8ASVYfTWU32RisSamUegS3T-wbw',
  analogFrameMemory: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT3Yq1stoBw4jCSqQ3vSCPhee_hr8rA2RDykd8JS8C3F50DTmFlTARVKONkRLkHANybLY5tbJCG0iFoAPjqxClCiZqDa3pcZNPJgdye9l6esLd2sr0b2yDfenMUvTlPoRD9d4ZZV2LncvDGjBF_dDBGQUWjrKVIsT4O_Eqo0SCfLLXz7zz0Kz5CJ_GgrKi0MggzmDw46U8FPez0Gj9cMirWQrZLry-7oDwiLKdMMut4EnUo2LHWJNqng',
  eveningReviewSunset: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGUlJjWrkJkGmwjDg0VdTSAw3bJXSNCtLbaVf9eDatVFOCNF44Emk0xqy8Zunop4a0f8OpeAr77A6mCJDdKPPIUsg9v26GJDX9lRgA6Dry5O56mqwsMucsb71dsjx79SE_j_b2YgGml6U5jyedbCY6bqzYE8-6jpG783WoGZRBgDluoVMQxg9DJ9uvDniUI0zG-ewsopTlxXmu9Oc-tPDzjt3hBw7TGBLtO1nefyEq9Esq-CqOG4aMVA',
  rainyWindowDetail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMd6LvS1pNMks4w9tCmgLyXgl9ZZEtgw4jFJfq_CtYwQHppNYQrpIHNOdUAoD6FjnRfGrBSM816J_f37FI7jepqO-FCUhdkzqLffrZadyWyQonKJWHnjb1473QVho8ZTJD0UeS1J3q6w7dav-sOSNns4v5TnpGXB-rW4XmNumsfkU-000Wmho8nHydfh-0ukm8WgnNHdURCaeQR0GmbVR4ID5qF9Pa9BAqLfWnLtAJUD6HCuCGke1fjA',
};

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-time-1',
    sender: 'tome',
    text: '',
    timeLabel: '8:42 AM',
  },
  {
    id: 'msg-1',
    sender: 'tome',
    text: 'Good morning. What’s on your mind?',
    timestamp: '8:42 AM',
    isInitial: true,
  },
  {
    id: 'msg-2',
    sender: 'user',
    text: 'Big presentation today. I’m nervous but kind of excited.',
    timestamp: '8:43 AM',
    statusText: 'Delivered',
  },
  {
    id: 'msg-3',
    sender: 'tome',
    text: 'You’ve been preparing for this for a while. Want me to remember how you’re feeling right now?',
    timestamp: '8:44 AM',
  },
  {
    id: 'msg-4',
    sender: 'user',
    text: 'Yes.',
    timestamp: '8:44 AM',
  },
  {
    id: 'msg-time-2',
    sender: 'tome',
    text: '',
    timeLabel: '1:15 PM · AFTER LUNCH',
  },
  {
    id: 'msg-5',
    sender: 'user',
    text: '"Also, this sunset was incredible."',
    photoUrl: ASSETS.sunsetToday,
    photoCaption: '"Also, this sunset was incredible."',
    photoLocation: 'Ocean Bluff · 6:48 PM',
    photoTime: '6:48 PM',
    timestamp: '1:15 PM',
    statusText: 'Stored in Vault',
  },
  {
    id: 'msg-6',
    sender: 'tome',
    text: 'Saved. 🌅 Stored in your vault for when you need to remember this horizon.',
    isCapsuleSealed: true,
    timestamp: '1:16 PM',
  },
];

export const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: 'mem-1',
    monthYear: 'September 2026',
    dateLabel: 'September 5 · 7:15 PM',
    title: 'The Presentation & The Horizon',
    tag: 'The Presentation & The Horizon',
    quote: '“Big presentation today. I’m nervous but kind of excited.”',
    type: 'photo',
    photoUrl: ASSETS.analogFrameMemory,
    photoTag: 'Analog frame',
    photoCount: 1,
    resurfaceNotice: 'Resurfacing in 6 months',
    isFavorite: true,
  },
  {
    id: 'mem-2',
    monthYear: 'September 2026',
    dateLabel: 'September 2 · 11:30 PM',
    title: 'Sudden Clarity',
    tag: 'Sudden Clarity',
    quote: '“I think I finally know what I want to build.”',
    type: 'voice',
    audioDuration: '0:42 duration',
    isResurfacingSoon: true,
    notesAppended: ['Celebration noted. Appended to your 2026 story ✨'],
  },
  {
    id: 'mem-3',
    monthYear: 'August 2026',
    dateLabel: 'August 27 · 3:20 PM',
    title: 'Coffee & Real Talk',
    tag: 'Coffee & Real Talk',
    quote: '“Had such a good conversation today. We forgot about our phones for three hours.”',
    type: 'thought',
    isFavorite: false,
  },
];

export const INITIAL_PROFILE: ProfilePreferences = {
  name: 'Elena Rostova',
  subtitle: 'Capturing moments since September 2026',
  avatarUrl: ASSETS.meProfileAvatar,
  memoriesSavedCount: 47,
  resurfacedCount: 3,
  photosKeptCount: 12,
  dailyCheckIn: true,
  memoryReminders: true,
  checkInTime: '9:30 PM',
  frequency: 'Occasional & surprise',
  encryption: 'End-to-end private',
  deliveryStyle: 'Gentle & conversational',
};
