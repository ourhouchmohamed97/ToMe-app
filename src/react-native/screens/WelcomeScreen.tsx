import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SPACING, RADIUS, ThemeColors } from '../styles/theme';
import { useTheme } from '../styles/ThemeContext';
import { ToMeIcon } from '../components/ToMeIcon';
import { ASSETS } from '../../data/mockData';

interface WelcomeScreenProps {
  onBegin: () => void;
}

interface FeatureItem {
  icon: string;
  title: string;
  subtitle: string;
  accent?: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: 'auto_awesome',
    title: 'Capture today',
    subtitle: 'Quick notes, photos, and whispered voice thoughts — before the day slips away.',
  },
  {
    icon: 'lock_clock',
    title: 'Seal for your future self',
    subtitle: 'Write little letters and time capsules that only you can open later.',
  },
  {
    icon: 'auto_stories',
    title: 'Memories return on their own',
    subtitle: 'Old thoughts quietly resurface right when you might need them most.',
  },
  {
    icon: 'shield',
    title: 'Private by default',
    subtitle: 'No streaks to break, no noise, nothing shared. A gentle place that is only yours.',
  },
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onBegin }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <View style={styles.container}>
      {/* Ambient background glows */}
      <View style={[styles.glowTopRight]} />
      <View style={[styles.glowBottomLeft]} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Header */}
        <View style={styles.brandHeader}>
          <View style={styles.logoBadge}>
            <Image source={{ uri: ASSETS.logo }} style={styles.logo} resizeMode="contain" />
          </View>
          <Text style={styles.brandName}>ToMe</Text>
          <Text style={styles.brandTagline}>YOUR PRIVATE JOURNAL</Text>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>
            A quiet place for your{' '}
            <Text style={styles.heroTitleAccent}>present</Text> and{' '}
            <Text style={styles.heroTitleAccent}>future</Text> self.
          </Text>
          <Text style={styles.heroSubtitle}>
            Capture the small moments of today. Hear from yourself when they matter again.
          </Text>
        </View>

        {/* Feature Cards */}
        <View style={styles.features}>
          {FEATURES.map((feature) => (
            <View key={feature.icon} style={styles.featureCard}>
              <View style={styles.featureIconCircle}>
                <ToMeIcon name={feature.icon} size={18} color={colors.secondary} />
              </View>
              <View style={styles.featureTextBlock}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Primary CTA */}
        <TouchableOpacity onPress={onBegin} style={styles.beginButton} activeOpacity={0.85}>
          <Text style={styles.beginButtonText}>Begin your journey</Text>
          <ToMeIcon name="arrow_forward" size={18} color={colors.onSecondary} />
        </TouchableOpacity>

        {/* Footer Reassurance */}
        <View style={styles.footer}>
          <ToMeIcon name="spa" size={16} color={colors.outline} />
          <Text style={styles.footerText}>
            Private by design · Nothing is ever shared
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
    position: 'relative',
    overflow: 'hidden',
  },
  glowTopRight: {
    position: 'absolute',
    top: -90,
    right: -70,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: 'rgba(254, 153, 122, 0.16)',
  },
  glowBottomLeft: {
    position: 'absolute',
    bottom: -110,
    left: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(255, 219, 208, 0.35)',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl2,
    paddingBottom: SPACING.xl,
  },
  brandHeader: {
    alignItems: 'center',
  },
  logoBadge: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#463228',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
    marginBottom: 12,
  },
  logo: {
    width: 44,
    height: 44,
  },
  brandName: {
    fontSize: 30,
    fontFamily: 'Literata',
    fontWeight: '600',
    color: colors.onSurface,
    letterSpacing: 0.5,
  },
  brandTagline: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  hero: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  heroTitle: {
    fontSize: 27,
    lineHeight: 36,
    fontFamily: 'Literata',
    color: colors.onSurface,
    textAlign: 'center',
  },
  heroTitleAccent: {
    color: colors.secondary,
    fontStyle: 'italic',
  },
  heroSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.xs,
  },
  features: {
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    gap: SPACING.sm,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
    shadowColor: '#463228',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  featureIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.secondaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTextBlock: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Literata',
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 2,
  },
  featureSubtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.onSurfaceVariant,
  },
  beginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    borderRadius: RADIUS.full,
    gap: 8,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  beginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSecondary,
  },
  footer: {
    alignItems: 'center',
    marginTop: SPACING.xl,
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: colors.outline,
    fontFamily: 'Literata',
    fontStyle: 'italic',
  },
  });