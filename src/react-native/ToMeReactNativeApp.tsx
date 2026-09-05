import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import { COLORS } from './styles/theme';
import { ActiveTab, TodaySubView, ChatMessage, MemoryItem, ProfilePreferences } from '../types';
import {
  INITIAL_CHAT_MESSAGES,
  INITIAL_MEMORIES,
  INITIAL_PROFILE,
  ASSETS,
} from '../data/mockData';
import { ToMeHeader } from './components/ToMeHeader';
import { ToMeBottomBar } from './components/ToMeBottomBar';
import { TodayScreen } from './screens/TodayScreen';
import { EveningCheckinScreen } from './screens/EveningCheckinScreen';
import { MemoriesScreen } from './screens/MemoriesScreen';
import { MemoryDetailScreen } from './screens/MemoryDetailScreen';
import { MeScreen } from './screens/MeScreen';
import { MobileDeviceFrame } from './components/MobileDeviceFrame';
import { ExpoInstructionsModal } from './components/ExpoInstructionsModal';
import { ToMeIcon } from './components/ToMeIcon';

export const ToMeReactNativeApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('today');
  const [todaySubView, setTodaySubView] = useState<TodaySubView>('chat');
  const [showExpoGuide, setShowExpoGuide] = useState(false);

  // Storage persistence
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('tome_rn_messages');
      return saved ? JSON.parse(saved) : INITIAL_CHAT_MESSAGES;
    } catch {
      return INITIAL_CHAT_MESSAGES;
    }
  });

  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('tome_rn_memories');
      return saved ? JSON.parse(saved) : INITIAL_MEMORIES;
    } catch {
      return INITIAL_MEMORIES;
    }
  });

  const [profile, setProfile] = useState<ProfilePreferences>(() => {
    try {
      const saved = localStorage.getItem('tome_rn_profile');
      return saved ? JSON.parse(saved) : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [lightbox, setLightbox] = useState<{ url: string; caption?: string } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('tome_rn_messages', JSON.stringify(messages));
    } catch {}
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem('tome_rn_memories', JSON.stringify(memories));
    } catch {}
  }, [memories]);

  useEffect(() => {
    try {
      localStorage.setItem('tome_rn_profile', JSON.stringify(profile));
    } catch {}
  }, [profile]);

  const handleSendMessage = (text: string, photoUrl?: string, location?: string) => {
    const userMsgId = `msg-${Date.now()}`;
    const newMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text,
      photoUrl,
      photoCaption: photoUrl ? text : undefined,
      photoLocation: location,
      timestamp: 'Just now',
      statusText: photoUrl ? 'Stored in Vault' : 'Delivered',
    };

    setMessages((prev) => [...prev, newMsg]);
    setProfile((prev) => ({
      ...prev,
      memoriesSavedCount: prev.memoriesSavedCount + 1,
      photosKeptCount: photoUrl ? prev.photosKeptCount + 1 : prev.photosKeptCount,
    }));

    setTimeout(() => {
      const tomeMsgId = `msg-${Date.now() + 1}`;
      if (photoUrl) {
        setMessages((prev) => [
          ...prev,
          {
            id: tomeMsgId,
            sender: 'tome',
            text: 'Saved. 🌅 Stored in your vault for when you need to remember this horizon.',
            isCapsuleSealed: true,
            timestamp: 'Just now',
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: tomeMsgId,
            sender: 'tome',
            text: 'Saved. Stored in your vault for when you need to hear this quiet clarity.',
            timestamp: 'Just now',
          },
        ]);
      }
    }, 700);
  };

  const handleSavedReflection = (text: string, sealPeriod: string) => {
    if (!text.trim()) return;

    const newMemory: MemoryItem = {
      id: `mem-${Date.now()}`,
      monthYear: 'September 2026',
      dateLabel: 'September 8 · 9:30 PM',
      title: 'Evening Reflection',
      tag: `Evening Reflection · Sealed for ${sealPeriod}`,
      quote: `“${text}”`,
      type: 'thought',
      resurfaceNotice: `Resurfacing in ${sealPeriod}`,
      isFavorite: false,
    };

    setMemories((prev) => [newMemory, ...prev]);
    setProfile((prev) => ({
      ...prev,
      memoriesSavedCount: prev.memoriesSavedCount + 1,
    }));
  };

  const handleOpenMemoryDetail = (mem: MemoryItem) => {
    setSelectedMemory(mem);
    setActiveTab('memory-detail');
  };

  const handleBackFromDetail = () => {
    setActiveTab('memories');
  };

  const handleExportData = () => {
    const exportPayload = {
      profile,
      memories,
      messages,
      platform: 'React Native (iOS & Android)',
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tome-rn-vault-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleEraseJournal = () => {
    setMessages(INITIAL_CHAT_MESSAGES);
    setMemories(INITIAL_MEMORIES);
    setProfile(INITIAL_PROFILE);
    try {
      localStorage.removeItem('tome_rn_messages');
      localStorage.removeItem('tome_rn_memories');
      localStorage.removeItem('tome_rn_profile');
    } catch {}
  };

  const handleOpenPhotoLightbox = (url: string, caption?: string) => {
    setLightbox({ url, caption });
  };

  return (
    <MobileDeviceFrame onOpenExpoGuide={() => setShowExpoGuide(true)}>
      <View style={styles.appShell}>
        {/* React Native Header */}
        <ToMeHeader
          activeTab={activeTab}
          todaySubView={todaySubView}
          onSelectTab={setActiveTab}
          onBackFromDetail={handleBackFromDetail}
          onToggleEveningCheckin={() =>
            setTodaySubView((prev) => (prev === 'chat' ? 'evening' : 'chat'))
          }
        />

        {/* Current Active Screen */}
        <View style={styles.screenContainer}>
          {activeTab === 'today' && todaySubView === 'chat' && (
            <TodayScreen
              messages={messages}
              onSendMessage={handleSendMessage}
              onOpenEveningCheckin={() => setTodaySubView('evening')}
              onOpenPhotoLightbox={handleOpenPhotoLightbox}
            />
          )}

          {activeTab === 'today' && todaySubView === 'evening' && (
            <EveningCheckinScreen
              onBackToChat={() => setTodaySubView('chat')}
              onSavedReflection={handleSavedReflection}
              onOpenPhotoLightbox={handleOpenPhotoLightbox}
            />
          )}

          {activeTab === 'memories' && (
            <MemoriesScreen
              memories={memories}
              onOpenMemoryDetail={handleOpenMemoryDetail}
              onOpenPhotoLightbox={handleOpenPhotoLightbox}
            />
          )}

          {activeTab === 'memory-detail' && (
            <MemoryDetailScreen
              memory={selectedMemory}
              onBack={handleBackFromDetail}
              onOpenPhotoLightbox={handleOpenPhotoLightbox}
            />
          )}

          {activeTab === 'me' && (
            <MeScreen
              profile={profile}
              onUpdateProfile={(up) => setProfile((prev) => ({ ...prev, ...up }))}
              onExportData={handleExportData}
              onEraseJournal={handleEraseJournal}
            />
          )}
        </View>

        {/* React Native Bottom Bar */}
        {activeTab !== 'memory-detail' && (
          <ToMeBottomBar activeTab={activeTab} onSelectTab={setActiveTab} />
        )}

        {/* Photo Lightbox Modal */}
        {lightbox && (
          <Modal visible transparent animationType="fade">
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setLightbox(null)}
              style={styles.lightboxBackdrop}
            >
              <View style={styles.lightboxCard}>
                <Image
                  source={{ uri: lightbox.url }}
                  style={styles.lightboxImage}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </Modal>
        )}

        {/* Expo & React Native Instructions Guide */}
        <ExpoInstructionsModal
          visible={showExpoGuide}
          onClose={() => setShowExpoGuide(false)}
        />
      </View>
    </MobileDeviceFrame>
  );
};

const styles = StyleSheet.create({
  appShell: {
    flex: 1,
    backgroundColor: COLORS.surface,
    position: 'relative',
  },
  screenContainer: {
    flex: 1,
    position: 'relative',
  },
  lightboxBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  lightboxCard: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: '#000',
    borderRadius: 16,
    overflow: 'hidden',
  },
  lightboxImage: {
    width: '100%',
    height: 380,
  },
});
