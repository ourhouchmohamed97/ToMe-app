import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { SPACING, RADIUS, ThemeColors } from '../styles/theme';
import { useTheme } from '../styles/ThemeContext';
import { ToMeIcon } from './ToMeIcon';

interface ExpoInstructionsModalProps {
  visible: boolean;
  onClose: () => void;
}

export const ExpoInstructionsModal: React.FC<ExpoInstructionsModalProps> = ({
  visible,
  onClose,
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.modalCard}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <View style={styles.iconCircle}>
                <ToMeIcon name="phone_iphone" size={18} color={colors.secondary} />
              </View>
              <View>
                <Text style={styles.title}>React Native (iOS & Android)</Text>
                <Text style={styles.subtitle}>Expo & React Native Architecture</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <ToMeIcon name="close" size={20} color={colors.onSurface} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollBody} showsVerticalScrollIndicator={false}>
            <Text style={styles.description}>
              This application has been structured with pure **React Native** components (
              <Text style={styles.codeSpan}>View</Text>, <Text style={styles.codeSpan}>Text</Text>,{' '}
              <Text style={styles.codeSpan}>StyleSheet</Text>, <Text style={styles.codeSpan}>ScrollView</Text>,{' '}
              <Text style={styles.codeSpan}>TextInput</Text>, <Text style={styles.codeSpan}>TouchableOpacity</Text>,{' '}
              <Text style={styles.codeSpan}>Switch</Text>, <Text style={styles.codeSpan}>Modal</Text>) and configured with{' '}
              <Text style={styles.codeSpan}>app.json</Text> for both iOS & Android.
            </Text>

            {/* Step 1: Quick start with Expo */}
            <View style={styles.stepCard}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>STEP 1</Text>
              </View>
              <Text style={styles.stepTitle}>Run directly on your iPhone or Android phone</Text>
              <Text style={styles.stepText}>
                1. Download this project ZIP from the AI Studio menu (Settings → Export ZIP).
              </Text>
              <Text style={styles.stepText}>
                2. Install the free <Text style={styles.boldText}>Expo Go</Text> app from the Apple App Store or Google Play Store.
              </Text>
              <Text style={styles.stepText}>
                3. In your terminal, run:
              </Text>
              <View style={styles.codeBox}>
                <Text style={styles.codeText}>npx expo start</Text>
              </View>
              <Text style={styles.stepText}>
                4. Scan the terminal QR code with your camera (iPhone) or Expo Go app (Android). The app will load instantly on your phone with native performance!
              </Text>
            </View>

            {/* Step 2: Build Native IPA or APK */}
            <View style={styles.stepCard}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>STEP 2</Text>
              </View>
              <Text style={styles.stepTitle}>Building standalone iOS IPA & Android APK</Text>
              <Text style={styles.stepText}>
                The included <Text style={styles.codeSpan}>app.json</Text> has configured bundle identifiers:
              </Text>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>
                  iOS Bundle ID: <Text style={styles.codeSpan}>com.tome.privatejournal</Text>
                </Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>
                  Android Package: <Text style={styles.codeSpan}>com.tome.privatejournal</Text>
                </Text>
              </View>
              <Text style={styles.stepText}>Build binaries with EAS Build:</Text>
              <View style={styles.codeBox}>
                <Text style={styles.codeText}>npx eas-cli build -p ios</Text>
                <Text style={styles.codeText}>npx eas-cli build -p android</Text>
              </View>
            </View>

            {/* Step 3: Architecture Breakdown */}
            <View style={styles.stepCard}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>ARCHITECTURE</Text>
              </View>
              <Text style={styles.stepTitle}>Modular React Native Directory</Text>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>📂</Text>
                <Text style={styles.bulletText}>
                  <Text style={styles.boldText}>src/react-native/screens/</Text>: TodayScreen, EveningCheckinScreen, MemoriesScreen, MemoryDetailScreen, MeScreen
                </Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>📂</Text>
                <Text style={styles.bulletText}>
                  <Text style={styles.boldText}>src/react-native/components/</Text>: ToMeHeader, ToMeIcon, MobileDeviceFrame
                </Text>
              </View>
              <View style={styles.bulletRow}>
                <Text style={styles.bulletDot}>📂</Text>
                <Text style={styles.bulletText}>
                  <Text style={styles.boldText}>src/react-native/styles/</Text>: theme.ts (Colors, Spacings, Radii)
                </Text>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity onPress={onClose} style={styles.doneBtn}>
            <Text style={styles.doneBtnText}>Got it, back to preview</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
  },
  modalCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    width: '100%',
    maxWidth: 480,
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceContainerHigh,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.secondaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.onSurface,
  },
  subtitle: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '500',
  },
  closeBtn: {
    padding: 6,
  },
  scrollBody: {
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  codeSpan: {
    fontFamily: 'monospace',
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 4,
    borderRadius: 4,
    color: colors.secondary,
    fontSize: 12,
  },
  stepCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
  },
  stepBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
    marginBottom: 6,
  },
  stepBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.onSecondary,
    letterSpacing: 0.5,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 6,
  },
  stepText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
    marginBottom: 4,
  },
  boldText: {
    fontWeight: '600',
    color: colors.onSurface,
  },
  codeBox: {
    backgroundColor: colors.primaryContainer,
    borderRadius: RADIUS.md,
    padding: 10,
    marginVertical: 6,
    gap: 4,
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: colors.inverseOnSurface,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 6,
    marginVertical: 2,
  },
  bulletDot: {
    fontSize: 12,
    color: colors.secondary,
  },
  bulletText: {
    flex: 1,
    fontSize: 12,
    color: colors.onSurfaceVariant,
    lineHeight: 16,
  },
  doneBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: RADIUS.full,
    alignItems: 'center',
  },
  doneBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onPrimary,
  },
  });
