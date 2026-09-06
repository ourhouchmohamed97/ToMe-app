import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../styles/theme';
import { ToMeIcon } from './ToMeIcon';
import { ActiveTab } from '../../types';

interface ToMeBottomBarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
}

export const ToMeBottomBar: React.FC<ToMeBottomBarProps> = ({ activeTab, onSelectTab }) => {
  return (
    <View style={styles.floatingContainer}>
      <View style={styles.bar}>
        <TouchableOpacity
          onPress={() => onSelectTab('today')}
          style={styles.tabItem}
          activeOpacity={0.7}
        >
          <ToMeIcon
            name="auto_awesome"
            size={22}
            color={activeTab === 'today' ? COLORS.secondary : COLORS.onSurfaceVariant}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'today' ? styles.tabLabelActive : styles.tabLabelInactive,
            ]}
          >
            Today
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSelectTab('memories')}
          style={styles.tabItem}
          activeOpacity={0.7}
        >
          <ToMeIcon
            name="auto_stories"
            size={22}
            color={
              activeTab === 'memories' || activeTab === 'memory-detail'
                ? COLORS.secondary
                : COLORS.onSurfaceVariant
            }
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'memories' || activeTab === 'memory-detail'
                ? styles.tabLabelActive
                : styles.tabLabelInactive,
            ]}
          >
            Memories
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSelectTab('me')}
          style={styles.tabItem}
          activeOpacity={0.7}
        >
          <ToMeIcon
            name="account_circle"
            size={22}
            color={activeTab === 'me' ? COLORS.secondary : COLORS.onSurfaceVariant}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === 'me' ? styles.tabLabelActive : styles.tabLabelInactive,
            ]}
          >
            Me
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  bar: {
    width: '100%',
    maxWidth: 420,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: RADIUS.full,
    paddingVertical: 8,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(229, 226, 220, 0.8)',
    shadowColor: '#463228',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: COLORS.secondary,
    fontWeight: '600',
  },
  tabLabelInactive: {
    color: COLORS.onSurfaceVariant,
  },
});
