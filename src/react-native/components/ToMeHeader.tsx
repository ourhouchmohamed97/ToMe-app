import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../styles/theme';
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
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {activeTab === 'memory-detail' ? (
          <TouchableOpacity
            onPress={onBackFromDetail}
            style={styles.backButton}
            accessibilityLabel="Go back"
          >
            <ToMeIcon name="arrow_back_ios_new" size={20} color={COLORS.onSurfaceVariant} />
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
              color={COLORS.secondary}
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
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    backgroundColor: 'rgba(252, 249, 243, 0.92)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.surfaceContainerHighest,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
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
    color: COLORS.onSurface,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.secondary,
    opacity: 0.6,
  },
  subTitle: {
    fontSize: 17,
    fontWeight: '400',
    fontFamily: 'Literata',
    color: COLORS.onSurfaceVariant,
  },
  tagline: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1,
    color: COLORS.onSurfaceVariant,
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
    backgroundColor: COLORS.surfaceContainer,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
  },
  eveningPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.onSurfaceVariant,
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
    borderColor: COLORS.secondary,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
