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
import { SPACING, RADIUS, ThemeColors } from '../styles/theme';
import { useTheme } from '../styles/ThemeContext';
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
  const { colors } = useTheme();
  const styles = createStyles(colors);
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
          <ToMeIcon name="arrow_back" size={16} color={colors.onSurfaceVariant} />
          <Text style={styles.backPillText}>Back to memories</Text>
        </TouchableOpacity>

        {/* Prelude */}
        <View style={styles.prelude}>
          <View style={styles.capsuleBadge}>
            <ToMeIcon name="history_edu" size={14} color={colors.onSecondaryContainer} />
            <Text style={styles.capsuleBadgeText}>TIME CAPSULE RESURFACED</Text>
          </View>
          <Text style={styles.preludeTime}>🕰️ Exactly 3 months ago · June 8, 2026</Text>
        </View>

        {/* The Resurfaced Memory Card */}
        <View style={styles.memoryCard}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardSectionLabel}>A WHISPER FROM PAST YOU</Text>
            <ToMeIcon name="auto_awesome" size={18} color={colors.outline} />
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
                color={colors.onPrimary}
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
              <ToMeIcon name="psychology_alt" size={20} color={colors.onSecondaryContainer} />
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
                placeholderTextColor={colors.outline}
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
              <ToMeIcon name="check_circle" size={18} color={colors.secondaryFixed} />
              <Text style={styles.actionBtnYesText}>Yes — it happened</Text>
            </View>
            <ToMeIcon name="arrow_forward" size={18} color={colors.onPrimary} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNotYet}
            style={styles.actionBtnExplore}
            activeOpacity={0.85}
          >
            <View style={styles.actionBtnLeft}>
              <ToMeIcon name="compass_calibration" size={18} color={colors.onSurfaceVariant} />
              <Text style={styles.actionBtnExploreText}>Not yet — still exploring</Text>
            </View>
            <ToMeIcon name="arrow_forward" size={18} color={colors.onSurfaceVariant} />
          </TouchableOpacity>

          {!isComposerOpen && (
            <TouchableOpacity
              onPress={() => setIsComposerOpen(true)}
              style={styles.actionBtnCustom}
              activeOpacity={0.85}
            >
              <ToMeIcon name="edit_note" size={18} color={colors.secondary} />
              <Text style={styles.actionBtnCustomText}>Tell ToMe what changed...</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => showToast('Rescheduled. We’ll meet this thought again in September 🕰️')}
            style={styles.snoozeBtn}
          >
            <ToMeIcon name="snooze" size={16} color={colors.outline} />
            <Text style={styles.snoozeText}>Remind me again in 3 months</Text>
          </TouchableOpacity>
        </View>

        </ScrollView>

      {/* Toast */}
      {toastMessage && (
        <View style={styles.toast}>
          <ToMeIcon name="favorite" size={16} color={colors.secondaryFixed} />
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}
    </View>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
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
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    gap: 6,
    marginBottom: SPACING.md,
  },
  backPillText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
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
    color: colors.onSecondaryContainer,
  },
  preludeTime: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
  },
  memoryCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
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
    color: colors.secondary,
  },
  cardTitle: {
    fontSize: 22,
    fontFamily: 'Literata',
    color: colors.onSurface,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    marginTop: 2,
    marginBottom: 12,
  },
  quoteBlock: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
  },
  quoteText: {
    fontSize: 18,
    fontFamily: 'Literata',
    fontStyle: 'italic',
    color: colors.primary,
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
    backgroundColor: colors.surfaceContainer,
    padding: 10,
    borderRadius: RADIUS.md,
    gap: 10,
    marginTop: 4,
  },
  voicePlayBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
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
    color: colors.onSurface,
  },
  voiceTimer: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  waveformRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  waveformBar: {
    width: 2.5,
    backgroundColor: colors.outlineVariant,
    borderRadius: 1.5,
  },
  waveformBarActive: {
    backgroundColor: colors.secondary,
  },
  reflectionCard: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
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
    backgroundColor: colors.secondaryContainer,
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
    color: colors.secondary,
  },
  reflectionTitle: {
    fontSize: 18,
    fontFamily: 'Literata',
    fontWeight: '600',
    color: colors.onSurface,
  },
  reflectionSubtitle: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
  appendedContainer: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceContainerHighest,
    gap: 6,
  },
  appendedHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.secondary,
  },
  appendedItem: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: 8,
    borderRadius: RADIUS.sm,
  },
  appendedText: {
    fontSize: 13,
    color: colors.onSurface,
  },
  composerContainer: {
    marginTop: 12,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: RADIUS.md,
    padding: 10,
    gap: 8,
  },
  composerInput: {
    fontSize: 14,
    color: colors.onSurface,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  appendBtn: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: RADIUS.full,
  },
  appendBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.onPrimary,
  },
  actionsContainer: {
    gap: 10,
  },
  actionBtnYes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    shadowColor: colors.primary,
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
    color: colors.onPrimary,
  },
  actionBtnExplore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerHigh,
    paddingVertical: 14,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
  },
  actionBtnExploreText: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.onSurface,
  },
  actionBtnCustom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    paddingVertical: 12,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
    gap: 6,
  },
  actionBtnCustomText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.secondary,
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
    color: colors.outline,
  },
  toast: {
    position: 'absolute',
    bottom: 28,
    left: 24,
    right: 24,
    alignSelf: 'center',
    backgroundColor: colors.inverseSurface,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  toastText: {
    fontSize: 13,
    color: colors.inverseOnSurface,
  },
  });
