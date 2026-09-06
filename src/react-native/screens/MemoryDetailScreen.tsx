import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../styles/theme';
import { ToMeIcon } from '../components/ToMeIcon';
import { MemoryItem } from '../../types';
import { ASSETS } from '../../data/mockData';

interface MemoryDetailScreenProps {
  memory?: MemoryItem | null;
  onBack: () => void;
  onOpenPhotoLightbox?: (url: string, caption?: string) => void;
}

export const MemoryDetailScreen: React.FC<MemoryDetailScreenProps> = ({
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
    }, 2800);
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

  const displayQuote = memory?.quote || '“I think I finally know what I want to do.”';
  const displayPhoto = memory?.photoUrl || ASSETS.rainyWindowDetail;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back pill */}
        <TouchableOpacity onPress={onBack} style={styles.backPill} activeOpacity={0.8}>
          <ToMeIcon name="arrow_back" size={16} color={COLORS.onSurfaceVariant} />
          <Text style={styles.backPillText}>Back to memories</Text>
        </TouchableOpacity>

        {/* Prelude */}
        <View style={styles.prelude}>
          <View style={styles.capsuleBadge}>
            <ToMeIcon name="history_edu" size={14} color={COLORS.onSecondaryContainer} />
            <Text style={styles.capsuleBadgeText}>TIME CAPSULE RESURFACED</Text>
          </View>
          <Text style={styles.preludeTime}>🕰️ Exactly 3 months ago · June 8, 2026</Text>
        </View>

        {/* The Resurfaced Memory Card */}
        <View style={styles.memoryCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardSectionLabel}>A WHISPER FROM PAST YOU</Text>
            <ToMeIcon name="auto_awesome" size={18} color={COLORS.outline} />
          </View>

          <Text style={styles.cardTitle}>Something from your past</Text>
          <Text style={styles.cardSubtitle}>
            You left this note on a rainy Thursday evening:
          </Text>

          {/* Quote Block */}
          <View style={styles.quoteBlock}>
            <Text style={styles.quoteText}>{displayQuote}</Text>
          </View>

          {/* Photo */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onOpenPhotoLightbox?.(displayPhoto, displayQuote)}
            style={styles.photoContainer}
          >
            <Image source={{ uri: displayPhoto }} style={styles.photo} />
          </TouchableOpacity>

          {/* Voice note artifact */}
          <View style={styles.voiceArtifact}>
            <TouchableOpacity
              onPress={() => setIsPlayingAudio(!isPlayingAudio)}
              style={styles.voicePlayBtn}
            >
              <ToMeIcon
                name={isPlayingAudio ? 'pause' : 'play_arrow'}
                size={18}
                color={COLORS.onPrimary}
              />
            </TouchableOpacity>

            <View style={styles.voiceDetails}>
              <View style={styles.voiceRow}>
                <Text style={styles.voiceLabel}>🎙️ Voice note</Text>
                <Text style={styles.voiceTimer}>
                  {isPlayingAudio
                    ? `0:${audioSeconds < 10 ? '0' : ''}${audioSeconds} / 0:48`
                    : '0:14 / 0:48'}
                </Text>
              </View>

              {/* Waveform */}
              <View style={styles.waveformRow}>
                {[2, 4, 5, 3, 6, 4, 2, 5, 3, 6, 4, 5, 2, 4, 6, 3, 2, 5, 3, 2].map(
                  (barHeight, idx) => {
                    const isPassed = idx < (audioSeconds / 48) * 20;
                    return (
                      <React.Fragment key={idx}>
                        <View
                          style={[
                            styles.waveformBar,
                            { height: barHeight * 3 },
                            (isPassed || idx < 8) && styles.waveformBarActive,
                          ]}
                        />
                      </React.Fragment>
                    );
                  }
                )}
              </View>
            </View>
          </View>
        </View>

        {/* ToMe Reflection Inquiry Card */}
        <View style={styles.reflectionCard}>
          <View style={styles.reflectionHeader}>
            <View style={styles.tomeAvatar}>
              <ToMeIcon name="psychology_alt" size={20} color={COLORS.onSecondaryContainer} />
            </View>
            <View style={styles.reflectionHeaderTexts}>
              <Text style={styles.reflectionLabel}>TOME REFLECTION</Text>
              <Text style={styles.reflectionTitle}>Did you figure it out?</Text>
            </View>
          </View>

          <Text style={styles.reflectionSubtitle}>
            Your answer will be appended to this memory and kept safe for your future self.
          </Text>

          {/* Appended Notes */}
          {appendedNotes.length > 0 && (
            <View style={styles.appendedContainer}>
              <Text style={styles.appendedHeader}>Appended Responses</Text>
              {appendedNotes.map((note, index) => (
                <React.Fragment key={index}>
                  <View style={styles.appendedItem}>
                    <Text style={styles.appendedText}>{note}</Text>
                  </View>
                </React.Fragment>
              ))}
            </View>
          )}

          {/* Composer */}
          {isComposerOpen && (
            <View style={styles.composerContainer}>
              <TextInput
                value={customNote}
                onChangeText={setCustomNote}
                placeholder="Speak to your past self... What unfolded since June?"
                placeholderTextColor={COLORS.outline}
                multiline
                numberOfLines={3}
                style={styles.composerInput}
              />
              <TouchableOpacity
                onPress={handleAppendNote}
                style={styles.appendBtn}
              >
                <Text style={styles.appendBtnText}>Append Reflection</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Primary Tactile Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={handleYes} style={styles.actionBtnYes} activeOpacity={0.85}>
            <View style={styles.actionBtnLeft}>
              <ToMeIcon name="check_circle" size={18} color={COLORS.secondaryFixed} />
              <Text style={styles.actionBtnYesText}>Yes — it happened</Text>
            </View>
            <ToMeIcon name="arrow_forward" size={18} color={COLORS.onPrimary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNotYet}
            style={styles.actionBtnExplore}
            activeOpacity={0.85}
          >
            <View style={styles.actionBtnLeft}>
              <ToMeIcon name="compass_calibration" size={18} color={COLORS.onSurfaceVariant} />
              <Text style={styles.actionBtnExploreText}>Not yet — still exploring</Text>
            </View>
            <ToMeIcon name="arrow_forward" size={18} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>

          {!isComposerOpen && (
            <TouchableOpacity
              onPress={() => setIsComposerOpen(true)}
              style={styles.actionBtnCustom}
              activeOpacity={0.85}
            >
              <ToMeIcon name="edit_note" size={18} color={COLORS.secondary} />
              <Text style={styles.actionBtnCustomText}>Tell ToMe what changed...</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => showToast('Rescheduled. We’ll meet this thought again in September 🕰️')}
            style={styles.snoozeBtn}
          >
            <ToMeIcon name="snooze" size={16} color={COLORS.outline} />
            <Text style={styles.snoozeText}>Remind me again in 3 months</Text>
          </TouchableOpacity>
        </View>

        {/* Toast */}
        {toastMessage && (
          <View style={styles.toast}>
            <ToMeIcon name="favorite" size={16} color={COLORS.secondaryFixed} />
            <Text style={styles.toastText}>{toastMessage}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.lg,
  },
  backPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.surfaceContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    gap: 6,
    marginBottom: SPACING.md,
  },
  backPillText: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    fontWeight: '500',
  },
  prelude: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  capsuleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(254, 153, 122, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    gap: 6,
    marginBottom: 6,
  },
  capsuleBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: COLORS.onSecondaryContainer,
  },
  preludeTime: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
  },
  memoryCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: 'rgba(229, 226, 220, 0.8)',
    shadowColor: '#463228',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    marginBottom: SPACING.md,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardSectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: COLORS.secondary,
  },
  cardTitle: {
    fontSize: 22,
    fontFamily: 'Literata',
    color: COLORS.onSurface,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
    marginBottom: 12,
  },
  quoteBlock: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainerHighest,
  },
  quoteText: {
    fontSize: 18,
    fontFamily: 'Literata',
    fontStyle: 'italic',
    color: COLORS.primary,
    lineHeight: 26,
    textAlign: 'center',
  },
  photoContainer: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    height: 160,
    marginVertical: 10,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  voiceArtifact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainer,
    padding: 10,
    borderRadius: RADIUS.md,
    gap: 10,
    marginTop: 4,
  },
  voicePlayBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceDetails: {
    flex: 1,
  },
  voiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  voiceLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  voiceTimer: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
  },
  waveformRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  waveformBar: {
    width: 2.5,
    backgroundColor: COLORS.outlineVariant,
    borderRadius: 1.5,
  },
  waveformBarActive: {
    backgroundColor: COLORS.secondary,
  },
  reflectionCard: {
    backgroundColor: COLORS.surfaceContainer,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainerHighest,
    marginBottom: SPACING.md,
  },
  reflectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  tomeAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reflectionHeaderTexts: {
    flex: 1,
  },
  reflectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: COLORS.secondary,
  },
  reflectionTitle: {
    fontSize: 18,
    fontFamily: 'Literata',
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  reflectionSubtitle: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    lineHeight: 18,
  },
  appendedContainer: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceContainerHighest,
    gap: 6,
  },
  appendedHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  appendedItem: {
    backgroundColor: COLORS.surfaceContainerLowest,
    padding: 8,
    borderRadius: RADIUS.sm,
  },
  appendedText: {
    fontSize: 13,
    color: COLORS.onSurface,
  },
  composerContainer: {
    marginTop: 12,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.md,
    padding: 10,
    gap: 8,
  },
  composerInput: {
    fontSize: 14,
    color: COLORS.onSurface,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  appendBtn: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
  },
  appendBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.onPrimary,
  },
  actionsContainer: {
    gap: 10,
  },
  actionBtnYes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  actionBtnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionBtnYesText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.onPrimary,
  },
  actionBtnExplore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surfaceContainerHigh,
    paddingVertical: 14,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainerHighest,
  },
  actionBtnExploreText: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.onSurface,
  },
  actionBtnCustom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    paddingVertical: 12,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainerHighest,
    gap: 6,
  },
  actionBtnCustomText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.secondary,
  },
  snoozeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  snoozeText: {
    fontSize: 12,
    color: COLORS.outline,
  },
  toast: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: COLORS.inverseSurface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  toastText: {
    fontSize: 13,
    color: COLORS.inverseOnSurface,
  },
});
