import React, { useState } from 'react';
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
import { ASSETS } from '../../data/mockData';

interface LoginScreenProps {
  onLogin: (email: string) => void;
  onBackToWelcome?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onBackToWelcome }) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = (): string | null => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) return 'Please enter your email.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) return 'That email doesn’t look quite right.';
    if (!password) return 'Please enter your password.';
    if (password.length < 6) return 'Your password should be at least 6 characters.';
    return null;
  };

  const handleSubmit = () => {
    if (isSubmitting) return;
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setIsSubmitting(true);
    // Simulated sign-in latency; swap for real auth later.
    setTimeout(() => {
      onLogin(email.trim());
    }, 700);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        {/* Ambient background glows */}
        <View style={styles.glowTopLeft} />
        <View style={styles.glowBottomRight} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back button */}
          {onBackToWelcome ? (
            <TouchableOpacity
              onPress={onBackToWelcome}
              style={styles.backPill}
              activeOpacity={0.8}
            >
              <ToMeIcon name="arrow_back" size={16} color={colors.onSurfaceVariant} />
              <Text style={styles.backPillText}>Back</Text>
            </TouchableOpacity>
          ) : null}

          {/* Brand Header */}
          <View style={styles.brandHeader}>
            <View style={styles.logoBadge}>
              <Image source={{ uri: ASSETS.logo }} style={styles.logo} resizeMode="contain" />
            </View>
            <Text style={styles.brandName}>Welcome back</Text>
            <Text style={styles.brandTagline}>Your quiet sanctuary is still here.</Text>
          </View>

          {/* Login Form Card */}
          <View style={styles.card}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>EMAIL</Text>
              <View style={[styles.inputRow, email && styles.inputRowFocused]}>
                <ToMeIcon name="mail" size={18} color={colors.outline} />
                <TextInput
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setError(null);
                  }}
                  placeholder="you@example.com"
                  placeholderTextColor={colors.outline}
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>PASSWORD</Text>
              <View style={[styles.inputRow, password && styles.inputRowFocused]}>
                <ToMeIcon name="vpn_key" size={18} color={colors.outline} />
                <TextInput
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setError(null);
                  }}
                  placeholder="Your password"
                  placeholderTextColor={colors.outline}
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  returnKeyType="go"
                  onSubmitEditing={handleSubmit}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((prev) => !prev)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <ToMeIcon
                    name={showPassword ? 'visibility_off' : 'visibility'}
                    size={18}
                    color={colors.outline}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {error ? (
              <View style={styles.errorRow}>
                <ToMeIcon name="error_outline" size={16} color={colors.error} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isSubmitting}
              style={[styles.signInButton, isSubmitting && styles.signInButtonDisabled]}
              activeOpacity={0.85}
            >
              {isSubmitting ? (
                <>
                  <View style={styles.spinner} />
                  <Text style={styles.signInButtonText}>Opening your journal…</Text>
                </>
              ) : (
                <>
                  <Text style={styles.signInButtonText}>Sign in</Text>
                  <ToMeIcon name="arrow_forward" size={18} color={colors.onSecondary} />
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Privacy reminder */}
          <View style={styles.privacyRow}>
            <ToMeIcon name="lock" size={14} color={colors.outline} />
            <Text style={styles.privacyText}>Your words stay yours. End-to-end private.</Text>
          </View>
        </ScrollView>
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
    position: 'relative',
    overflow: 'hidden',
  },
  glowTopLeft: {
    position: 'absolute',
    top: -100,
    left: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(254, 153, 122, 0.14)',
  },
  glowBottomRight: {
    position: 'absolute',
    bottom: -120,
    right: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 219, 208, 0.32)',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.xl,
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
  },
  backPillText: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
  brandHeader: {
    alignItems: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  logoBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#463228',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
    marginBottom: 14,
  },
  logo: {
    width: 40,
    height: 40,
  },
  brandName: {
    fontSize: 26,
    fontFamily: 'Literata',
    fontWeight: '600',
    color: colors.onSurface,
    letterSpacing: 0.5,
  },
  brandTagline: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
    marginTop: 4,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
    shadowColor: '#463228',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 14,
  },
  fieldGroup: {
    marginBottom: SPACING.md,
  },
  fieldLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    color: colors.onSurfaceVariant,
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
  },
  inputRowFocused: {
    borderColor: colors.secondaryContainer,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.onSurface,
    padding: 0,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.errorContainer,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.md,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    color: colors.error,
  },
  signInButton: {
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
    marginTop: 4,
  },
  signInButtonDisabled: {
    opacity: 0.7,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSecondary,
  },
  spinner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderTopColor: colors.onSecondary,
  },
  privacyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: SPACING.xl,
  },
  privacyText: {
    fontSize: 12,
    color: colors.outline,
    fontFamily: 'Literata',
    fontStyle: 'italic',
  },
  });