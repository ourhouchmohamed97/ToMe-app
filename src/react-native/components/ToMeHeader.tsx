import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Modal } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SPACING, RADIUS, ThemeColors } from '../styles/theme';
import { useTheme } from '../styles/ThemeContext';
import { ToMeIcon } from './ToMeIcon';
import { ASSETS } from '../../data/mockData';
import { ActiveTab, TodaySubView } from '../../types';

interface ToMeHeaderProps {
  activeTab: ActiveTab;
  todaySubView: TodaySubView;
  onSelectTab: (tab: ActiveTab) => void;
  onBackFromDetail: () => void;
  onToggleEveningCheckin: () => void;
}

export const ToMeHeader: React.FC<ToMeHeaderProps> = ({
  activeTab,
  todaySubView,
  onSelectTab,
  onBackFromDetail,
  onToggleEveningCheckin,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const menuItems: { tab: ActiveTab; label: string; icon: string }[] = [
    { tab: 'today', label: 'Today', icon: 'auto_awesome' },
    { tab: 'memories', label: 'Memories', icon: 'auto_stories' },
    { tab: 'me', label: 'Me', icon: 'account_circle' },
  ];

  const getSubTitle = () => {
    if (activeTab === 'today') {
      return todaySubView === 'evening' ? 'Evening Check-in' : 'Today';
    }
    if (activeTab === 'memories') return 'Memories';
    if (activeTab === 'me') return 'Me';
    if (activeTab === 'memory-detail') return 'Memory Detail';
    return 'Today';
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftSection}>
        <TouchableOpacity
          onPress={() => setMenuOpen(true)}
          style={styles.burgerButton}
          accessibilityLabel="Open navigation menu"
        >
          <ToMeIcon name="menu" size={22} color={colors.onSurface} />
        </TouchableOpacity>

        {activeTab === 'memory-detail' ? (
          <TouchableOpacity
            onPress={onBackFromDetail}
            style={styles.backButton}
            accessibilityLabel="Go back"
          >
            <ToMeIcon name="arrow_back_ios_new" size={20} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={styles.brandTouchable}
          onPress={() => onSelectTab('today')}
          activeOpacity={0.8}
        >
          <Image
            source={{ uri: ASSETS.logo }}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.brandTextContainer}>
            <View style={styles.brandRow}>
              <Text style={styles.appName}>ToMe</Text>
              <View style={styles.dot} />
              <Text style={styles.subTitle}>{getSubTitle()}</Text>
            </View>
            <Text style={styles.tagline}>YOUR PRIVATE JOURNAL</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.rightSection}>
        {activeTab === 'today' && (
          <TouchableOpacity
            style={styles.eveningPill}
            onPress={onToggleEveningCheckin}
            activeOpacity={0.8}
          >
            <ToMeIcon
              name={todaySubView === 'evening' ? 'wb_sunny' : 'bedtime'}
              size={14}
              color={colors.secondary}
            />
            <Text style={styles.eveningPillText}>
              {todaySubView === 'evening' ? 'Day flow' : 'Evening'}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => onSelectTab('me')}
          style={[styles.profileButton, activeTab === 'me' && styles.profileButtonActive]}
          activeOpacity={0.8}
        >
          <Image source={{ uri: ASSETS.avatar }} style={styles.avatar} />
        </TouchableOpacity>
      </View>
    </View>

    {/* Navigation Menu */}
    <Modal
      visible={menuOpen}
      transparent
      animationType="fade"
      onRequestClose={() => setMenuOpen(false)}
    >
      <View style={styles.menuRoot}>
        <TouchableOpacity
          style={styles.menuBackdrop}
          activeOpacity={1}
          onPress={() => setMenuOpen(false)}
        />
        <View style={[styles.menuPanel, { top: insets.top + 64 }]}>
          {menuItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <TouchableOpacity
                key={item.tab}
                style={styles.menuItem}
                activeOpacity={0.7}
                onPress={() => {
                  setMenuOpen(false);
                  onSelectTab(item.tab);
                }}
              >
                <ToMeIcon
                  name={item.icon}
                  size={18}
                  color={isActive ? colors.secondary : colors.onSurfaceVariant}
                />
                <Text style={[styles.menuItemText, isActive && styles.menuItemTextActive]}>
                  {item.label}
                </Text>
                {isActive ? (
                  <ToMeIcon name="check" size={16} color={colors.secondary} />
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modal>
  </>
);
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    backgroundColor: 'rgba(252, 249, 243, 0.92)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.surfaceContainerHighest,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  burgerButton: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuRoot: {
    flex: 1,
  },
  menuBackdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(28, 28, 24, 0.28)',
  },
  menuPanel: {
    position: 'absolute',
    left: SPACING.md,
    width: 240,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.surfaceContainerHighest,
    shadowColor: '#2b231d',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 20,
    elevation: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 11,
    borderRadius: RADIUS.md,
  },
  menuItemText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: colors.onSurface,
  },
  menuItemTextActive: {
    color: colors.secondary,
    fontWeight: '700',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: -4,
  },
  brandTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  logo: {
    width: 28,
    height: 28,
  },
  brandTextContainer: {
    flexDirection: 'column',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  appName: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Literata',
    color: colors.onSurface,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.secondary,
    opacity: 0.6,
  },
  subTitle: {
    fontSize: 17,
    fontWeight: '400',
    fontFamily: 'Literata',
    color: colors.onSurfaceVariant,
  },
  tagline: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1,
    color: colors.onSurfaceVariant,
    marginTop: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  eveningPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
  },
  eveningPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButtonActive: {
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  });
