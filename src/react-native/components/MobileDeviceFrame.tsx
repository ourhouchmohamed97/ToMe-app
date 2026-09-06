import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../styles/theme';
import { ToMeIcon } from './ToMeIcon';

interface MobileDeviceFrameProps {
  children: React.ReactNode;
  onOpenExpoGuide: () => void;
}

export type DeviceMode = 'ios' | 'android' | 'fluid';

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({
  children,
  onOpenExpoGuide,
}) => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('ios');

  if (Platform.OS !== 'web') {
    return <View style={styles.nativeContainer}>{children}</View>;
  }

  return (
    <View style={styles.outerContainer}>
      {/* Top Device Bar Controls */}
      <View style={styles.topControlBar}>
        <View style={styles.controlGroup}>
          <Text style={styles.label}>PREVIEW PLATFORM:</Text>
          <View style={styles.toggleGroup}>
            <TouchableOpacity
              onPress={() => setDeviceMode('ios')}
              style={[styles.toggleBtn, deviceMode === 'ios' && styles.toggleBtnActive]}
            >
              <ToMeIcon
                name="phone_iphone"
                size={14}
                color={deviceMode === 'ios' ? COLORS.onPrimary : COLORS.onSurfaceVariant}
              />
              <Text
                style={[
                  styles.toggleBtnText,
                  deviceMode === 'ios' && styles.toggleBtnTextActive,
                ]}
              >
                Apple iOS
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setDeviceMode('android')}
              style={[styles.toggleBtn, deviceMode === 'android' && styles.toggleBtnActive]}
            >
              <ToMeIcon
                name="phone_android"
                size={14}
                color={deviceMode === 'android' ? COLORS.onPrimary : COLORS.onSurfaceVariant}
              />
              <Text
                style={[
                  styles.toggleBtnText,
                  deviceMode === 'android' && styles.toggleBtnTextActive,
                ]}
              >
                Android
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setDeviceMode('fluid')}
              style={[styles.toggleBtn, deviceMode === 'fluid' && styles.toggleBtnActive]}
            >
              <ToMeIcon
                name="fullscreen"
                size={14}
                color={deviceMode === 'fluid' ? COLORS.onPrimary : COLORS.onSurfaceVariant}
              />
              <Text
                style={[
                  styles.toggleBtnText,
                  deviceMode === 'fluid' && styles.toggleBtnTextActive,
                ]}
              >
                Fluid
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={onOpenExpoGuide}
          style={styles.expoGuideBtn}
          activeOpacity={0.8}
        >
          <ToMeIcon name="rocket_launch" size={14} color={COLORS.secondary} />
          <Text style={styles.expoGuideBtnText}>Run on Phone (Expo / RN)</Text>
        </TouchableOpacity>
      </View>

      {/* Main Frame Presentation */}
      {deviceMode === 'fluid' ? (
        <View style={styles.fluidContainer}>{children}</View>
      ) : (
        <View style={styles.frameWrapper}>
          <View
            style={[
              styles.phoneShell,
              deviceMode === 'ios' ? styles.iosShell : styles.androidShell,
            ]}
          >
            {/* iOS Dynamic Island / Android Camera Cutout */}
            {deviceMode === 'ios' ? (
              <View style={styles.iosStatusBar}>
                <Text style={styles.statusTime}>9:41</Text>
                <View style={styles.dynamicIsland} />
                <View style={styles.statusIcons}>
                  <ToMeIcon name="signal_cellular_alt" size={12} color="#000" />
                  <ToMeIcon name="wifi" size={12} color="#000" />
                  <ToMeIcon name="battery_full" size={12} color="#000" />
                </View>
              </View>
            ) : (
              <View style={styles.androidStatusBar}>
                <Text style={styles.statusTime}>9:30</Text>
                <View style={styles.androidCameraHole} />
                <View style={styles.statusIcons}>
                  <ToMeIcon name="wifi" size={12} color="#000" />
                  <ToMeIcon name="battery_full" size={12} color="#000" />
                </View>
              </View>
            )}

            {/* Screen Viewport */}
            <View style={styles.screenViewport}>{children}</View>

            {/* Home Indicator Bar */}
            <View style={styles.homeIndicatorRow}>
              <View style={styles.homeIndicatorBar} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#ede9e2',
  },
  nativeContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.surface,
  },
  topControlBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
    backgroundColor: '#e4dfd6',
    borderBottomWidth: 1,
    borderBottomColor: '#d6cfc3',
    flexWrap: 'wrap',
    gap: 8,
  },
  controlGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: '#6e655f',
  },
  toggleGroup: {
    flexDirection: 'row',
    backgroundColor: '#dad3c8',
    borderRadius: RADIUS.full,
    padding: 2,
    gap: 2,
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
  },
  toggleBtnActive: {
    backgroundColor: COLORS.primary,
  },
  toggleBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#524b46',
  },
  toggleBtnTextActive: {
    color: COLORS.onPrimary,
  },
  expoGuideBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: '#d0c4be',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  expoGuideBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  fluidContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  frameWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  phoneShell: {
    width: '100%',
    maxWidth: 400,
    height: '100%',
    maxHeight: 840,
    backgroundColor: COLORS.surface,
    overflow: 'hidden',
    shadowColor: '#2b231d',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.18,
    shadowRadius: 36,
  },
  iosShell: {
    borderRadius: 50,
    borderWidth: 10,
    borderColor: '#242120',
  },
  androidShell: {
    borderRadius: 36,
    borderWidth: 8,
    borderColor: '#1e1c1b',
  },
  iosStatusBar: {
    height: 44,
    backgroundColor: COLORS.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 4,
    zIndex: 20,
  },
  androidStatusBar: {
    height: 36,
    backgroundColor: COLORS.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    zIndex: 20,
  },
  statusTime: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    width: 44,
  },
  dynamicIsland: {
    width: 96,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#000',
  },
  androidCameraHole: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: 44,
    justifyContent: 'flex-end',
  },
  screenViewport: {
    flex: 1,
    position: 'relative',
  },
  homeIndicatorRow: {
    height: 20,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 4,
  },
  homeIndicatorBar: {
    width: 120,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#1c1c18',
    opacity: 0.3,
  },
});
