import React, { useState } from 'react';
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
import { ASSETS } from '../../data/mockData';

interface EveningCheckinScreenProps {
  onBackToChat: () => void;
  onSavedReflection: (text: string, sealPeriod: string) => void;
  onOpenPhotoLightbox?: (url: string, caption?: string) => void;
}

export const EveningCheckinScreen: React.FC<EveningCheckinScreenProps> = ({
  onBackToChat,
  onSavedReflection,
  onOpenPhotoLightbox,
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [reflectionText, setReflectionText] = useState('');
  const [sealPeriodIndex, setSealPeriodIndex] = useState(2); // 1 yr
  const [whisperAdded, setWhisperAdded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const sealOptions = ['3 months', '6 months', '1 yr', '5 yrs'];

  const cycleSealPeriod = () => {
    setSealPeriodIndex((prev) => (prev + 1) % sealOptions.length);
  };

  const handleSave = () => {
    const finalNote = reflectionText.trim() || 'A quiet evening of contemplation and gentle release.';
    setIsSaved(true);
    onSavedReflection(finalNote, sealOptions[sealPeriodIndex]);
    setTimeout(() => {
      onBackToChat();
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back navigation pill */}
        <TouchableOpacity
          onPress={onBackToChat}
          style={styles.backPill}
          activeOpacity={0.8}
        >
          <ToMeIcon name="arrow_back" size={16} color={colors.onSurfaceVariant} />
          <Text style={styles.backPillText}>Back to day thread</Text>
        </TouchableOpacity>

        {/* Evening Header */}
        <View style={styles.header}>
          <View style={styles.timeBadge}>
            <ToMeIcon name="bedtime" size={14} color={colors.secondary} />
            <Text style={styles.timeBadgeText}>Evening Check-in · 9:30 PM</Text>
          </View>
          <Text style={styles.headerTitle}>Before today ends…</Text>
          <Text style={styles.headerSubtitle}>
            Take a slow breath. ToMe has gathered the moments you left behind.
          </Text>
        </View>

        {/* Day in Review Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardSectionLabel}>DAY IN REVIEW</Text>
            <View style={styles.momentsCountBadge}>
              <Text style={styles.momentsCountText}>3 moments saved</Text>
            </View>
          </View>

          <Text style={styles.reviewSummary}>
            Today held quiet momentum. You drafted the proposal, paused for breath at the ocean bluff, and captured the dusk light.
          </Text>

          {/* Moment tags */}
          <View style={styles.tagsContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Proposal sent</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Ocean walk</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Sunset</Text>
            </View>
          </View>

          {/* Sunset Fragment Photo */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              onOpenPhotoLightbox?.(
                ASSETS.eveningReviewSunset,
                '“The sky turned gold, then lavender, then quiet.”'
              )
            }
            style={styles.photoFragment}
          >
            <Image source={{ uri: ASSETS.eveningReviewSunset }} style={styles.fragmentImage} />
            <View style={styles.fragmentQuoteOverlay}>
              <Text style={styles.fragmentQuoteText}>
                “The sky turned gold, then lavender, then quiet.”
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Final Reflection Canvas */}
        <View style={styles.card}>
          <Text style={styles.promptLabel}>
            What’s one thing you want to remember about how today felt?
          </Text>

          <View style={styles.textareaContainer}>
            <TextInput
              value={reflectionText}
              onChangeText={setReflectionText}
              placeholder="A word, a sentence, or a whisper to the person you’ll be when this opens…"
              placeholderTextColor={colors.outline}
              multiline
              numberOfLines={4}
              style={styles.textarea}
            />
          </View>

          {whisperAdded && (
            <View style={styles.whisperBanner}>
              <ToMeIcon name="mic" size={14} color={colors.secondary} />
              <Text style={styles.whisperText}>Whispered voice memo attached</Text>
            </View>
          )}

          <View style={styles.canvasActions}>
            <TouchableOpacity
              onPress={() => setWhisperAdded(!whisperAdded)}
              style={styles.actionPill}
            >
              <ToMeIcon name="mic" size={14} color={colors.secondary} />
              <Text style={styles.actionPillText}>
                {whisperAdded ? 'Remove voice' : 'Whisper note'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={cycleSealPeriod} style={styles.actionPill}>
              <ToMeIcon name="lock_clock" size={14} color={colors.secondary} />
              <Text style={styles.actionPillText}>Seal for {sealOptions[sealPeriodIndex]}</Text>
            </TouchableOpacity>
          </View>

          {/* Primary Save Button */}
          <TouchableOpacity
            onPress={handleSave}
            disabled={isSaved}
            style={[styles.saveButton, isSaved && styles.saveButtonSuccess]}
            activeOpacity={0.85}
          >
            <ToMeIcon
              name={isSaved ? 'check_circle' : 'lock'}
              size={18}
              color={colors.onPrimary}
            />
            <Text style={styles.saveButtonText}>
              {isSaved ? 'Sealed in your vault ✨' : 'Save reflection'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onBackToChat} style={styles.skipButton}>
            <Text style={styles.skipButtonText}>Skip for tonight — keep as is</Text>
          </TouchableOpacity>
        </View>

        {/* Peaceful Footer Reassurance */}
        <View style={styles.footerReassurance}>
          <ToMeIcon name="spa" size={18} color={colors.outline} />
          <Text style={styles.footerText}>
            Rest well. Tomorrow will greet you softly.
          </Text>
        </View>
      </ScrollView>
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
  header: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(254, 153, 122, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    gap: 6,
    marginBottom: 8,
  },
  timeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: colors.secondary,
    textTransform: 'uppercase',
  },
  headerTitle: {
    fontSize: 26,
    fontFamily: 'Literata',
    color: colors.onSurface,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: SPACING.sm,
  },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
    shadowColor: '#463228',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardSectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.secondary,
  },
  momentsCountBadge: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  momentsCountText: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },
  reviewSummary: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.onSurface,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
  },
  tagText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
  photoFragment: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    position: 'relative',
    height: 140,
  },
  fragmentImage: {
    width: '100%',
    height: '100%',
  },
  fragmentQuoteOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(10, 7, 6, 0.65)',
  },
  fragmentQuoteText: {
    fontSize: 13,
    fontFamily: 'Literata',
    fontStyle: 'italic',
    color: colors.onPrimary,
  },
  promptLabel: {
    fontSize: 17,
    fontFamily: 'Literata',
    color: colors.onSurface,
    lineHeight: 24,
    marginBottom: 12,
  },
  textareaContainer: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: RADIUS.lg,
    padding: SPACING.sm,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
    marginBottom: 12,
  },
  textarea: {
    fontSize: 15,
    color: colors.onSurface,
    minHeight: 90,
    textAlignVertical: 'top',
  },
  whisperBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryFixed,
    padding: 8,
    borderRadius: RADIUS.sm,
    gap: 6,
    marginBottom: 12,
  },
  whisperText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.onSecondaryFixedVariant,
  },
  canvasActions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  actionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
  },
  actionPillText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    paddingVertical: 14,
    borderRadius: RADIUS.full,
    gap: 6,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  saveButtonSuccess: {
    backgroundColor: '#386a20',
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.onSecondary,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  skipButtonText: {
    fontSize: 13,
    color: colors.outline,
  },
  footerReassurance: {
    alignItems: 'center',
    marginTop: SPACING.sm,
    gap: 4,
  },
  footerText: {
    fontSize: 13,
    color: colors.outline,
    fontFamily: 'Literata',
    fontStyle: 'italic',
  },
  });
