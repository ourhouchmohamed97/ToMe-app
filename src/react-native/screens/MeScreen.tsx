import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  Modal,
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../styles/theme';
import { ToMeIcon } from '../components/ToMeIcon';
import { ProfilePreferences } from '../../types';
import { ASSETS } from '../../data/mockData';

interface MeScreenProps {
  profile: ProfilePreferences;
  onUpdateProfile: (updated: Partial<ProfilePreferences>) => void;
  onExportData: () => void;
  onEraseJournal: () => void;
}

export const MeScreen: React.FC<MeScreenProps> = ({
  profile,
  onUpdateProfile,
  onExportData,
  onEraseJournal,
}) => {
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [showFreqModal, setShowFreqModal] = useState(false);
  const [showEraseModal, setShowEraseModal] = useState(false);
  const [toastText, setToastText] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => setToastText(null), 2500);
  };

  const timeOptions = ['8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM'];
  const freqOptions = [
    'Quietly daily',
    'Occasional & surprise',
    'Weekly reflection',
    'Monthly time capsule',
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: profile.avatarUrl || ASSETS.meProfileAvatar }}
                style={styles.avatar}
              />
              <View style={styles.avatarStatusDot} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileSubtitle}>{profile.subtitle}</Text>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{profile.memoriesSavedCount}</Text>
              <Text style={styles.statLabel}>MEMORIES SAVED</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={[styles.statNumber, styles.statNumberSecondary]}>
                {profile.resurfacedCount}
              </Text>
              <Text style={styles.statLabel}>RESURFACED</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{profile.photosKeptCount}</Text>
              <Text style={styles.statLabel}>PHOTOS KEPT</Text>
            </View>
          </View>
        </View>

        {/* Section: Your ToMe */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>YOUR TOME</Text>
            <ToMeIcon name="lock" size={16} color={COLORS.outline} />
          </View>

          <View style={styles.cardGroup}>
            <View style={styles.rowItem}>
              <View style={styles.rowLeft}>
                <View style={styles.iconCircle}>
                  <ToMeIcon name="calendar_today" size={16} color={COLORS.onSurfaceVariant} />
                </View>
                <View>
                  <Text style={styles.rowTitle}>Journal since</Text>
                  <Text style={styles.rowSubtitle}>Sanctuary creation</Text>
                </View>
              </View>
              <Text style={styles.rowValue}>September 2, 2026</Text>
            </View>

            <View style={styles.rowDivider} />

            <View style={styles.rowItem}>
              <View style={styles.rowLeft}>
                <View style={styles.iconCircle}>
                  <ToMeIcon name="shield" size={16} color={COLORS.secondary} />
                </View>
                <View>
                  <Text style={styles.rowTitle}>Vault encryption</Text>
                  <Text style={styles.rowSubtitle}>Client-side keys only</Text>
                </View>
              </View>
              <View style={styles.badgePill}>
                <View style={styles.greenDot} />
                <Text style={styles.badgeText}>End-to-end private</Text>
              </View>
            </View>

            <View style={styles.rowDivider} />

            <View style={styles.rowItem}>
              <View style={styles.rowLeft}>
                <View style={styles.iconCircle}>
                  <ToMeIcon name="forum" size={16} color={COLORS.onSurfaceVariant} />
                </View>
                <View>
                  <Text style={styles.rowTitle}>Memory delivery style</Text>
                  <Text style={styles.rowSubtitle}>Reflection tone</Text>
                </View>
              </View>
              <Text style={styles.rowValue}>{profile.deliveryStyle}</Text>
            </View>
          </View>
        </View>

        {/* Section: Preferences */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>PREFERENCES</Text>
            <ToMeIcon name="tune" size={16} color={COLORS.outline} />
          </View>

          <View style={styles.cardGroup}>
            {/* Daily check-in */}
            <View style={styles.rowItem}>
              <View style={styles.rowLeft}>
                <View style={styles.iconCircle}>
                  <ToMeIcon name="bedtime" size={16} color={COLORS.onSurfaceVariant} />
                </View>
                <View>
                  <Text style={styles.rowTitle}>Daily check-in</Text>
                  <Text style={styles.rowSubtitle}>Subtle evening nudge</Text>
                </View>
              </View>
              <Switch
                value={profile.dailyCheckIn}
                onValueChange={(val) => {
                  onUpdateProfile({ dailyCheckIn: val });
                  showToast(val ? 'Daily check-in enabled' : 'Daily check-in paused');
                }}
                trackColor={{ false: COLORS.surfaceContainerHighest, true: COLORS.secondaryFixed }}
                thumbColor={profile.dailyCheckIn ? COLORS.secondary : COLORS.surfaceContainerLowest}
              />
            </View>

            <View style={styles.rowDivider} />

            {/* Memory reminders */}
            <View style={styles.rowItem}>
              <View style={styles.rowLeft}>
                <View style={styles.iconCircle}>
                  <ToMeIcon name="magic_button" size={16} color={COLORS.onSurfaceVariant} />
                </View>
                <View>
                  <Text style={styles.rowTitle}>Memory reminders</Text>
                  <Text style={styles.rowSubtitle}>Resurface past thoughts</Text>
                </View>
              </View>
              <Switch
                value={profile.memoryReminders}
                onValueChange={(val) => {
                  onUpdateProfile({ memoryReminders: val });
                  showToast(val ? 'Memory reminders active' : 'Memory reminders paused');
                }}
                trackColor={{ false: COLORS.surfaceContainerHighest, true: COLORS.secondaryFixed }}
                thumbColor={profile.memoryReminders ? COLORS.secondary : COLORS.surfaceContainerLowest}
              />
            </View>

            <View style={styles.rowDivider} />

            {/* Preferred time */}
            <TouchableOpacity
              onPress={() => setShowTimeModal(true)}
              style={styles.rowItem}
              activeOpacity={0.7}
            >
              <View style={styles.rowLeft}>
                <View style={styles.iconCircle}>
                  <ToMeIcon name="schedule" size={16} color={COLORS.onSurfaceVariant} />
                </View>
                <View>
                  <Text style={styles.rowTitle}>Preferred check-in time</Text>
                  <Text style={styles.rowSubtitle}>Quiet hour prompt</Text>
                </View>
              </View>
              <View style={styles.rowRightWithChevron}>
                <Text style={styles.rowValue}>{profile.checkInTime}</Text>
                <ToMeIcon name="chevron_right" size={18} color={COLORS.outline} />
              </View>
            </TouchableOpacity>

            <View style={styles.rowDivider} />

            {/* Frequency */}
            <TouchableOpacity
              onPress={() => setShowFreqModal(true)}
              style={styles.rowItem}
              activeOpacity={0.7}
            >
              <View style={styles.rowLeft}>
                <View style={styles.iconCircle}>
                  <ToMeIcon name="cyclone" size={16} color={COLORS.onSurfaceVariant} />
                </View>
                <View>
                  <Text style={styles.rowTitle}>Frequency</Text>
                  <Text style={styles.rowSubtitle}>Pacing rhythm</Text>
                </View>
              </View>
              <View style={styles.rowRightWithChevron}>
                <Text style={styles.rowValue}>{profile.frequency}</Text>
                <ToMeIcon name="chevron_right" size={18} color={COLORS.outline} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section: Privacy & Control */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>PRIVACY & CONTROL</Text>
            <ToMeIcon name="verified_user" size={16} color={COLORS.outline} />
          </View>

          <View style={styles.cardGroup}>
            <View style={styles.rowItem}>
              <View style={styles.rowLeft}>
                <View style={styles.iconCircle}>
                  <ToMeIcon name="visibility_off" size={16} color={COLORS.onSurfaceVariant} />
                </View>
                <View>
                  <Text style={styles.rowTitle}>Private by default</Text>
                  <Text style={styles.rowSubtitle}>Zero tracking or analytics</Text>
                </View>
              </View>
              <View style={styles.alwaysOnBadge}>
                <Text style={styles.alwaysOnText}>Always on</Text>
              </View>
            </View>

            <View style={styles.rowDivider} />

            <TouchableOpacity onPress={onExportData} style={styles.rowItem} activeOpacity={0.7}>
              <View style={styles.rowLeft}>
                <View style={styles.iconCircle}>
                  <ToMeIcon name="download" size={16} color={COLORS.onSurfaceVariant} />
                </View>
                <View>
                  <Text style={styles.rowTitle}>Export all memories</Text>
                  <Text style={styles.rowSubtitle}>Download JSON & photos</Text>
                </View>
              </View>
              <ToMeIcon name="file_download" size={18} color={COLORS.outline} />
            </TouchableOpacity>

            <View style={styles.rowDivider} />

            <TouchableOpacity
              onPress={() => setShowEraseModal(true)}
              style={styles.rowItem}
              activeOpacity={0.7}
            >
              <View style={styles.rowLeft}>
                <View style={[styles.iconCircle, styles.iconCircleError]}>
                  <ToMeIcon name="delete_forever" size={16} color={COLORS.error} />
                </View>
                <View>
                  <Text style={[styles.rowTitle, styles.errorText]}>Erase journal</Text>
                  <Text style={styles.rowSubtitle}>Permanently delete all data</Text>
                </View>
              </View>
              <ToMeIcon name="chevron_right" size={18} color={COLORS.error} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ToMeIcon name="spa" size={18} color={COLORS.outline} />
          <Text style={styles.footerText}>
            ToMe v1.0 · A quiet space for your present and future self.
          </Text>
        </View>

        {/* Time Picker Modal */}
        <Modal visible={showTimeModal} transparent animationType="fade">
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Check-in Time</Text>
              <Text style={styles.modalSubtitle}>When would you like ToMe to softly greet you?</Text>
              {timeOptions.map((time) => (
                <React.Fragment key={time}>
                  <TouchableOpacity
                    onPress={() => {
                      onUpdateProfile({ checkInTime: time });
                      setShowTimeModal(false);
                      showToast(`Check-in set to ${time}`);
                    }}
                    style={[styles.modalOption, profile.checkInTime === time && styles.modalOptionActive]}
                  >
                    <Text
                      style={[
                        styles.modalOptionText,
                        profile.checkInTime === time && styles.modalOptionTextActive,
                      ]}
                    >
                      {time}
                    </Text>
                    {profile.checkInTime === time && (
                      <ToMeIcon name="check" size={16} color={COLORS.onSecondary} />
                    )}
                  </TouchableOpacity>
                </React.Fragment>
              ))}
              <TouchableOpacity onPress={() => setShowTimeModal(false)} style={styles.modalCancelBtn}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Frequency Picker Modal */}
        <Modal visible={showFreqModal} transparent animationType="fade">
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Memory Frequency</Text>
              <Text style={styles.modalSubtitle}>Set the rhythm for rediscovering past thoughts.</Text>
              {freqOptions.map((freq) => (
                <React.Fragment key={freq}>
                  <TouchableOpacity
                    onPress={() => {
                      onUpdateProfile({ frequency: freq });
                      setShowFreqModal(false);
                      showToast(`Pacing set to ${freq}`);
                    }}
                    style={[styles.modalOption, profile.frequency === freq && styles.modalOptionActive]}
                  >
                    <Text
                      style={[
                        styles.modalOptionText,
                        profile.frequency === freq && styles.modalOptionTextActive,
                      ]}
                    >
                      {freq}
                    </Text>
                    {profile.frequency === freq && (
                      <ToMeIcon name="check" size={16} color={COLORS.onSecondary} />
                    )}
                  </TouchableOpacity>
                </React.Fragment>
              ))}
              <TouchableOpacity onPress={() => setShowFreqModal(false)} style={styles.modalCancelBtn}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Erase Modal */}
        <Modal visible={showEraseModal} transparent animationType="fade">
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Erase Entire Journal?</Text>
              <Text style={styles.modalSubtitle}>
                This will permanently delete all 47 memories, photos, and time capsules stored in your vault.
              </Text>
              <View style={styles.modalActionRow}>
                <TouchableOpacity
                  onPress={() => setShowEraseModal(false)}
                  style={styles.modalBtnKeep}
                >
                  <Text style={styles.modalBtnKeepText}>Keep Journal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    onEraseJournal();
                    setShowEraseModal(false);
                    showToast('Journal vault reset.');
                  }}
                  style={styles.modalBtnDelete}
                >
                  <Text style={styles.modalBtnDeleteText}>Yes, Erase All</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Toast Feedback */}
        {toastText && (
          <View style={styles.toast}>
            <ToMeIcon name="check_circle" size={16} color={COLORS.secondaryFixed} />
            <Text style={styles.toastText}>{toastText}</Text>
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
    paddingBottom: 90,
  },
  profileCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: 'rgba(229, 226, 220, 0.8)',
    shadowColor: '#463228',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    marginBottom: SPACING.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.surfaceContainer,
  },
  avatarStatusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.secondary,
    borderWidth: 2,
    borderColor: COLORS.surfaceContainerLowest,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontFamily: 'Literata',
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  profileSubtitle: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainerHighest,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  statNumberSecondary: {
    color: COLORS.secondary,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: COLORS.onSurfaceVariant,
  },
  cardGroup: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: 'rgba(229, 226, 220, 0.8)',
    overflow: 'hidden',
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    flex: 1,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleError: {
    backgroundColor: COLORS.errorContainer,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.onSurface,
  },
  rowSubtitle: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginTop: 1,
  },
  rowValue: {
    fontSize: 13,
    color: COLORS.onSurface,
  },
  rowRightWithChevron: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rowDivider: {
    height: 1,
    backgroundColor: COLORS.surfaceContainerHigh,
    marginHorizontal: SPACING.md,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.secondary,
  },
  badgeText: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    fontWeight: '500',
  },
  alwaysOnBadge: {
    backgroundColor: COLORS.secondaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  alwaysOnText: {
    fontSize: 11,
    color: COLORS.onSecondaryFixedVariant,
    fontWeight: '600',
  },
  errorText: {
    color: COLORS.error,
  },
  footer: {
    alignItems: 'center',
    marginTop: SPACING.xs,
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.outline,
    textAlign: 'center',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
  },
  modalContent: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainerHighest,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'Literata',
    fontWeight: '600',
    color: COLORS.onSurface,
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    marginBottom: 16,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: RADIUS.md,
    marginBottom: 6,
    backgroundColor: COLORS.surfaceContainerLow,
  },
  modalOptionActive: {
    backgroundColor: COLORS.secondary,
  },
  modalOptionText: {
    fontSize: 14,
    color: COLORS.onSurface,
  },
  modalOptionTextActive: {
    color: COLORS.onSecondary,
    fontWeight: '600',
  },
  modalCancelBtn: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  modalCancelText: {
    fontSize: 13,
    color: COLORS.outline,
  },
  modalActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  modalBtnKeep: {
    flex: 1,
    backgroundColor: COLORS.surfaceContainer,
    paddingVertical: 12,
    borderRadius: RADIUS.full,
    alignItems: 'center',
  },
  modalBtnKeepText: {
    fontSize: 13,
    color: COLORS.onSurface,
    fontWeight: '500',
  },
  modalBtnDelete: {
    flex: 1,
    backgroundColor: COLORS.error,
    paddingVertical: 12,
    borderRadius: RADIUS.full,
    alignItems: 'center',
  },
  modalBtnDeleteText: {
    fontSize: 13,
    color: COLORS.onPrimary,
    fontWeight: '600',
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
  },
  toastText: {
    fontSize: 13,
    color: COLORS.inverseOnSurface,
  },
});
