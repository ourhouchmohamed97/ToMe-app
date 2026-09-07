import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SPACING, RADIUS, ThemeColors } from '../styles/theme';
import { useTheme } from '../styles/ThemeContext';
import { ToMeIcon } from '../components/ToMeIcon';
import { ChatMessage } from '../../types';
import { ASSETS } from '../../data/mockData';

interface TodayScreenProps {
  messages: ChatMessage[];
  onSendMessage: (text: string, photoUrl?: string, location?: string) => void;
  onOpenEveningCheckin: () => void;
  onOpenPhotoLightbox?: (url: string, caption?: string) => void;
}

export const TodayScreen: React.FC<TodayScreenProps> = ({
  messages,
  onSendMessage,
  onOpenEveningCheckin,
  onOpenPhotoLightbox,
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [inputText, setInputText] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!isRecordingVoice) return;
    const interval = setInterval(() => {
      setVoiceSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRecordingVoice]);

  const formatVoiceTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const hasContent = !!inputText.trim() || !!selectedPhoto || isRecordingVoice;

  const handleSend = () => {
    if (!inputText.trim() && !selectedPhoto && !isRecordingVoice) return;

    if (isRecordingVoice) {
      onSendMessage(`🎙️ Voice thought (${formatVoiceTime(voiceSeconds)} recorded)`);
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

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Sub-Header Temporal Context */}
        <View style={styles.temporalHeader}>
          <View style={styles.temporalBadge}>
            <View style={styles.pulseDot} />
            <Text style={styles.temporalText}>Tuesday, September 8 · Morning</Text>
          </View>
          <Text style={styles.headerSubtitle}>
            Capture today. Hear from yourself later.
          </Text>

          {/* Evening Check-in Banner */}
          <TouchableOpacity
            onPress={onOpenEveningCheckin}
            style={styles.eveningBanner}
            activeOpacity={0.85}
          >
            <View style={styles.bannerIconContainer}>
              <ToMeIcon name="bedtime" size={16} color={colors.onSecondary} />
            </View>
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerTitle}>EVENING CHECK-IN AVAILABLE</Text>
              <Text style={styles.bannerSubtitle} numberOfLines={1}>
                Before today ends… Take a slow breath and review moments.
              </Text>
            </View>
            <ToMeIcon name="arrow_forward" size={18} color={colors.secondary} />
          </TouchableOpacity>
        </View>

        {/* Message Thread */}
        <View style={styles.threadContainer}>
          {messages.map((msg) => {
            if (msg.timeLabel) {
              return (
                <React.Fragment key={msg.id}>
                  <View style={styles.timeDividerRow}>
                    <View style={styles.dividerLine} />
                    <Text style={styles.timeDividerText}>{msg.timeLabel}</Text>
                    <View style={styles.dividerLine} />
                  </View>
                </React.Fragment>
              );
            }

            // User Photo Capsule
            if (msg.sender === 'user' && msg.photoUrl) {
              return (
                <React.Fragment key={msg.id}>
                  <View style={styles.userPhotoRow}>
                    <View style={styles.photoCapsuleContainer}>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => onOpenPhotoLightbox?.(msg.photoUrl!, msg.photoCaption)}
                        style={styles.photoWrapper}
                      >
                        <Image source={{ uri: msg.photoUrl }} style={styles.capsuleImage} />
                        <View style={styles.photoOverlay}>
                          <View style={styles.locationBadge}>
                            <ToMeIcon
                              name="location_on"
                              size={14}
                              color={colors.secondaryContainer}
                            />
                            <Text style={styles.locationText}>
                              {msg.photoLocation || 'Ocean Bluff · 6:48 PM'}
                            </Text>
                          </View>
                          <View style={styles.twilightCircle}>
                            <ToMeIcon name="wb_twilight" size={14} color={colors.onPrimary} />
                          </View>
                        </View>
                      </TouchableOpacity>

                      {msg.photoCaption ? (
                        <Text style={styles.photoCaption}>{msg.photoCaption}</Text>
                      ) : null}
                    </View>
                    <Text style={styles.statusLabel}>{msg.statusText || 'Stored in Vault'}</Text>
                  </View>
                </React.Fragment>
              );
            }

            // User Text Message
            if (msg.sender === 'user') {
              return (
                <React.Fragment key={msg.id}>
                  <View style={styles.userMessageRow}>
                    <View style={styles.userBubble}>
                      <Text style={styles.userBubbleText}>{msg.text}</Text>
                    </View>
                    {msg.statusText ? (
                      <Text style={styles.statusLabel}>{msg.statusText}</Text>
                    ) : null}
                  </View>
                </React.Fragment>
              );
            }

            // ToMe Sealed Capsule Bubble
            if (msg.isCapsuleSealed) {
              return (
                <React.Fragment key={msg.id}>
                  <View style={styles.tomeMessageRow}>
                    <View style={styles.tomeAvatarSmall}>
                      <ToMeIcon name="lock_clock" size={14} color={colors.onSecondaryFixedVariant} />
                    </View>
                    <View style={styles.sealedCapsuleBubble}>
                      <View style={styles.sealedBadgeRow}>
                        <ToMeIcon name="check_circle" size={14} color={colors.secondary} />
                        <Text style={styles.sealedBadgeText}>TIME CAPSULE SEALED</Text>
                      </View>
                      <Text style={styles.sealedMessageText}>{msg.text}</Text>
                    </View>
                  </View>
                </React.Fragment>
              );
            }

            // ToMe Standard Bubble
            return (
              <React.Fragment key={msg.id}>
                <View style={styles.tomeMessageRow}>
                  <View style={styles.tomeAvatarSmall}>
                    <ToMeIcon
                      name={msg.isInitial ? 'temp_preferences_custom' : 'auto_awesome'}
                      size={14}
                      color={colors.onSecondaryFixedVariant}
                    />
                  </View>
                  <View style={styles.tomeBubble}>
                    <Text style={msg.isInitial ? styles.tomeInitialText : styles.tomeBubbleText}>
                      {msg.text}
                    </Text>
                  </View>
                </View>
              </React.Fragment>
            );
          })}
        </View>

        {/* Suggestion Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsScroll}
        >
          <TouchableOpacity
            style={styles.chip}
            onPress={() => setInputText('Quick note — ')}
            activeOpacity={0.7}
          >
            <Text style={styles.chipEmoji}>🌱</Text>
            <Text style={styles.chipText}>Quick note</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.chip}
            onPress={() => setIsRecordingVoice(!isRecordingVoice)}
            activeOpacity={0.7}
          >
            <Text style={styles.chipEmoji}>🎙️</Text>
            <Text style={styles.chipText}>Voice thought</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.chip}
            onPress={() => {
              setSelectedPhoto(ASSETS.sunsetToday);
              setInputText('"Also, this sunset was incredible."');
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.chipEmoji}>🌅</Text>
            <Text style={styles.chipText}>Golden hour moment</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>

      {/* Fixed Composer Footer (above the floating tab bar) */}
      <View style={styles.composerFooter}>
        {/* Voice recording banner */}
        {isRecordingVoice ? (
          <View style={styles.voiceBanner}>
            <View style={styles.voicePulseDot} />
            <Text style={styles.voiceBannerText}>
              Recording whisper thought... {formatVoiceTime(voiceSeconds)}
            </Text>
            <TouchableOpacity onPress={() => setIsRecordingVoice(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Attachment preview banner */}
        {selectedPhoto ? (
          <View style={styles.attachmentPreview}>
            <Image source={{ uri: selectedPhoto }} style={styles.attachmentThumb} />
            <Text style={styles.attachmentText} numberOfLines={1}>
              Sunset snapshot ready to seal
            </Text>
            <TouchableOpacity onPress={() => setSelectedPhoto(null)}>
              <ToMeIcon name="close" size={16} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Composer */}
        <View style={styles.composer}>
          <TouchableOpacity
            onPress={() => {
              setSelectedPhoto(ASSETS.sunsetToday);
            }}
            style={styles.composerIconBtn}
          >
            <ToMeIcon name="image" size={20} color={colors.onSurfaceVariant} />
          </TouchableOpacity>

          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Write something to your future self…"
            placeholderTextColor={colors.outline}
            style={styles.composerInput}
            returnKeyType="send"
            onSubmitEditing={handleSend}
          />

          <TouchableOpacity
            onPress={() => setIsRecordingVoice(!isRecordingVoice)}
            style={[styles.composerIconBtn, isRecordingVoice && styles.micActive]}
          >
            <ToMeIcon
              name={isRecordingVoice ? 'stop' : 'mic'}
              size={20}
              color={colors.secondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSend}
            disabled={!hasContent}
            style={[styles.sealButton, !hasContent && styles.sealButtonDisabled]}
            activeOpacity={0.8}
          >
            <Text style={styles.sealButtonText}>Seal</Text>
            <ToMeIcon name="arrow_upward" size={16} color={colors.onSecondary} />
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.md,
  },
  temporalHeader: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  temporalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    gap: 6,
    marginBottom: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.secondary,
  },
  temporalText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.onSurfaceVariant,
  },
  headerSubtitle: {
    fontSize: 17,
    fontFamily: 'Literata',
    fontStyle: 'italic',
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  eveningBanner: {
    marginTop: 12,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: 'rgba(254, 153, 122, 0.4)',
    borderRadius: RADIUS.lg,
    padding: SPACING.sm,
    shadowColor: '#463228',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  bannerIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: colors.secondary,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: colors.onSurface,
    marginTop: 1,
  },
  threadContainer: {
    gap: SPACING.lg,
  },
  timeDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.surfaceContainerHighest,
  },
  timeDividerText: {
    paddingHorizontal: 8,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.outline,
  },
  userMessageRow: {
    alignSelf: 'flex-end',
    maxWidth: '86%',
    alignItems: 'flex-end',
  },
  userBubble: {
    backgroundColor: colors.inverseSurface,
    borderRadius: RADIUS.lg,
    borderTopRightRadius: 4,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  userBubbleText: {
    fontSize: 16,
    color: colors.inverseOnSurface,
    lineHeight: 24,
  },
  statusLabel: {
    fontSize: 11,
    color: colors.outline,
    marginTop: 4,
    marginRight: 4,
  },
  tomeMessageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.xs,
    maxWidth: '88%',
  },
  tomeAvatarSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.secondaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  tomeBubble: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: RADIUS.lg,
    borderTopLeftRadius: 4,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.surfaceContainerHighest,
  },
  tomeInitialText: {
    fontSize: 18,
    fontFamily: 'Literata',
    color: colors.onSurface,
    lineHeight: 24,
  },
  tomeBubbleText: {
    fontSize: 16,
    color: colors.onSurface,
    lineHeight: 24,
  },
  userPhotoRow: {
    alignSelf: 'flex-end',
    maxWidth: '92%',
    alignItems: 'flex-end',
  },
  photoCapsuleContainer: {
    backgroundColor: colors.surfaceContainerLowest,
    padding: 8,
    borderRadius: RADIUS.lg,
    borderTopRightRadius: 4,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
    width: '100%',
  },
  photoWrapper: {
    position: 'relative',
    aspectRatio: 1,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
  },
  capsuleImage: {
    width: '100%',
    height: '100%',
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(10, 7, 6, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  locationText: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: '500',
  },
  twilightCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoCaption: {
    fontStyle: 'italic',
    fontSize: 14,
    color: colors.onSurface,
    paddingHorizontal: 4,
    paddingTop: 8,
  },
  sealedCapsuleBubble: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: RADIUS.lg,
    borderTopLeftRadius: 4,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.surfaceContainerHighest,
    gap: 4,
  },
  sealedBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sealedBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.secondary,
    letterSpacing: 0.8,
  },
  sealedMessageText: {
    fontSize: 14,
    color: colors.onSurface,
    lineHeight: 22,
  },
  chipsScroll: {
    flexDirection: 'row',
    gap: 8,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
  },
  chipEmoji: {
    fontSize: 12,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  attachmentPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    padding: 8,
    borderRadius: RADIUS.md,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(254, 153, 122, 0.5)',
    gap: 8,
  },
  attachmentThumb: {
    width: 44,
    height: 44,
    borderRadius: 6,
  },
  attachmentText: {
    flex: 1,
    fontSize: 13,
    color: colors.onSurface,
  },
  voiceBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryFixed,
    padding: 10,
    borderRadius: RADIUS.md,
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  voicePulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },
  voiceBannerText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.onSecondaryFixedVariant,
  },
  cancelText: {
    fontSize: 12,
    color: colors.secondary,
    textDecorationLine: 'underline',
  },
  composerFooter: {
    backgroundColor: colors.surface,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xs,
    paddingBottom: SPACING.xs,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.surfaceContainerHighest,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: RADIUS.md,
    padding: 6,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
    gap: 6,
  },
  composerIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micActive: {
    backgroundColor: colors.secondaryFixed,
  },
  composerInput: {
    flex: 1,
    fontSize: 14,
    color: colors.onSurface,
    paddingHorizontal: 6,
  },
  sealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: RADIUS.full,
    gap: 4,
  },
  sealButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSecondary,
  },
  sealButtonDisabled: {
    opacity: 0.45,
  },
  });
