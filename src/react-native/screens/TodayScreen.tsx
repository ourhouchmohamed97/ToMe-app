import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../styles/theme';
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
  const [inputText, setInputText] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (!inputText.trim() && !selectedPhoto && !isRecordingVoice) return;

    if (isRecordingVoice) {
      onSendMessage(`🎙️ Voice thought (${Math.max(1, voiceSeconds)}s recorded)`);
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
              <ToMeIcon name="bedtime" size={16} color={COLORS.onSecondary} />
            </View>
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerTitle}>EVENING CHECK-IN AVAILABLE</Text>
              <Text style={styles.bannerSubtitle} numberOfLines={1}>
                Before today ends… Take a slow breath and review moments.
              </Text>
            </View>
            <ToMeIcon name="arrow_forward" size={18} color={COLORS.secondary} />
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
                              color={COLORS.secondaryContainer}
                            />
                            <Text style={styles.locationText}>
                              {msg.photoLocation || 'Ocean Bluff · 6:48 PM'}
                            </Text>
                          </View>
                          <View style={styles.twilightCircle}>
                            <ToMeIcon name="wb_twilight" size={14} color={COLORS.onPrimary} />
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
                      <ToMeIcon name="lock_clock" size={14} color={COLORS.onSecondaryFixedVariant} />
                    </View>
                    <View style={styles.sealedCapsuleBubble}>
                      <View style={styles.sealedBadgeRow}>
                        <ToMeIcon name="check_circle" size={14} color={COLORS.secondary} />
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
                      color={COLORS.onSecondaryFixedVariant}
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

        {/* Attachment preview banner */}
        {selectedPhoto ? (
          <View style={styles.attachmentPreview}>
            <Image source={{ uri: selectedPhoto }} style={styles.attachmentThumb} />
            <Text style={styles.attachmentText} numberOfLines={1}>
              Sunset snapshot ready to seal
            </Text>
            <TouchableOpacity onPress={() => setSelectedPhoto(null)}>
              <ToMeIcon name="close" size={16} color={COLORS.onSurfaceVariant} />
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Voice recording banner */}
        {isRecordingVoice ? (
          <View style={styles.voiceBanner}>
            <View style={styles.voicePulseDot} />
            <Text style={styles.voiceBannerText}>
              Recording whisper thought... 0:0{voiceSeconds}
            </Text>
            <TouchableOpacity onPress={() => setIsRecordingVoice(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Bottom Composer */}
        <View style={styles.composer}>
          <TouchableOpacity
            onPress={() => {
              setSelectedPhoto(ASSETS.sunsetToday);
            }}
            style={styles.composerIconBtn}
          >
            <ToMeIcon name="image" size={20} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>

          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Write something to your future self…"
            placeholderTextColor={COLORS.outline}
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
              color={COLORS.secondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSend}
            style={styles.sealButton}
            activeOpacity={0.8}
          >
            <Text style={styles.sealButtonText}>Seal</Text>
            <ToMeIcon name="arrow_upward" size={16} color={COLORS.onSecondary} />
          </TouchableOpacity>
        </View>
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
    paddingBottom: 90,
  },
  temporalHeader: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  temporalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerHigh,
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
    backgroundColor: COLORS.secondary,
  },
  temporalText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: COLORS.onSurfaceVariant,
  },
  headerSubtitle: {
    fontSize: 17,
    fontFamily: 'Literata',
    fontStyle: 'italic',
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
  },
  eveningBanner: {
    marginTop: 12,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    backgroundColor: COLORS.secondary,
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
    color: COLORS.secondary,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: COLORS.onSurface,
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
    backgroundColor: COLORS.surfaceContainerHighest,
  },
  timeDividerText: {
    paddingHorizontal: 8,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: COLORS.outline,
  },
  userMessageRow: {
    alignSelf: 'flex-end',
    maxWidth: '86%',
    alignItems: 'flex-end',
  },
  userBubble: {
    backgroundColor: COLORS.primaryContainer,
    borderRadius: RADIUS.lg,
    borderTopRightRadius: 4,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  userBubbleText: {
    fontSize: 16,
    color: COLORS.inverseOnSurface,
    lineHeight: 24,
  },
  statusLabel: {
    fontSize: 11,
    color: COLORS.outline,
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
    backgroundColor: COLORS.secondaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  tomeBubble: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: RADIUS.lg,
    borderTopLeftRadius: 4,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.surfaceContainerHighest,
  },
  tomeInitialText: {
    fontSize: 18,
    fontFamily: 'Literata',
    color: COLORS.onSurface,
    lineHeight: 24,
  },
  tomeBubbleText: {
    fontSize: 16,
    color: COLORS.onSurface,
    lineHeight: 24,
  },
  userPhotoRow: {
    alignSelf: 'flex-end',
    maxWidth: '92%',
    alignItems: 'flex-end',
  },
  photoCapsuleContainer: {
    backgroundColor: COLORS.surfaceContainerLowest,
    padding: 8,
    borderRadius: RADIUS.lg,
    borderTopRightRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(229, 226, 220, 0.7)',
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
    color: COLORS.onPrimary,
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
    color: COLORS.onSurface,
    paddingHorizontal: 4,
    paddingTop: 8,
  },
  sealedCapsuleBubble: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: RADIUS.lg,
    borderTopLeftRadius: 4,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.surfaceContainerHighest,
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
    color: COLORS.secondary,
    letterSpacing: 0.8,
  },
  sealedMessageText: {
    fontSize: 14,
    color: COLORS.onSurface,
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
    backgroundColor: COLORS.surfaceContainerLowest,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: 'rgba(229, 226, 220, 0.8)',
  },
  chipEmoji: {
    fontSize: 12,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
  },
  attachmentPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
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
    color: COLORS.onSurface,
  },
  voiceBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryFixed,
    padding: 10,
    borderRadius: RADIUS.md,
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  voicePulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.secondary,
  },
  voiceBannerText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.onSecondaryFixedVariant,
  },
  cancelText: {
    fontSize: 12,
    color: COLORS.secondary,
    textDecorationLine: 'underline',
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.xl,
    padding: 6,
    borderWidth: 1,
    borderColor: 'rgba(229, 226, 220, 0.9)',
    shadowColor: '#463228',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
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
    backgroundColor: COLORS.secondaryFixed,
  },
  composerInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.onSurface,
    paddingHorizontal: 6,
  },
  sealButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: RADIUS.full,
    gap: 4,
  },
  sealButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.onSecondary,
  },
});
