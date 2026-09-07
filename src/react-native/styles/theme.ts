export type ColorScheme = 'light' | 'dark';

export interface ThemeColors {
  surface: string;
  surfaceDim: string;
  surfaceBright: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  onSurface: string;
  onSurfaceVariant: string;
  inverseSurface: string;
  inverseOnSurface: string;
  outline: string;
  outlineVariant: string;
  surfaceTint: string;
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  secondaryFixed: string;
  secondaryFixedDim: string;
  onSecondaryFixed: string;
  onSecondaryFixedVariant: string;
  tertiary: string;
  tertiaryContainer: string;
  error: string;
  errorContainer: string;
}

export const lightColors: ThemeColors = {
  surface: '#fcf9f3',
  surfaceDim: '#dcdad4',
  surfaceBright: '#fcf9f3',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f6f3ed',
  surfaceContainer: '#f0eee8',
  surfaceContainerHigh: '#ebe8e2',
  surfaceContainerHighest: '#e5e2dc',
  onSurface: '#1c1c18',
  onSurfaceVariant: '#4d4541',
  inverseSurface: '#31312d',
  inverseOnSurface: '#f3f0ea',
  outline: '#7f7570',
  outlineVariant: '#d0c4be',
  surfaceTint: '#635d5b',
  primary: '#0a0706',
  onPrimary: '#ffffff',
  primaryContainer: '#231f1d',
  onPrimaryContainer: '#8d8683',
  secondary: '#97472e',
  onSecondary: '#ffffff',
  secondaryContainer: '#fe997a',
  onSecondaryContainer: '#772f18',
  secondaryFixed: '#ffdbd0',
  secondaryFixedDim: '#ffb59f',
  onSecondaryFixed: '#3a0a00',
  onSecondaryFixedVariant: '#793019',
  tertiary: '#100500',
  tertiaryContainer: '#321a00',
  error: '#ba1a1a',
  errorContainer: '#ffdad6',
};

export const darkColors: ThemeColors = {
  surface: '#16120f',
  surfaceDim: '#100d0b',
  surfaceBright: '#1e1a18',
  surfaceContainerLowest: '#0a0808',
  surfaceContainerLow: '#1f1b18',
  surfaceContainer: '#231f1c',
  surfaceContainerHigh: '#2d2926',
  surfaceContainerHighest: '#38332f',
  onSurface: '#e7e0db',
  onSurfaceVariant: '#cbc2bc',
  inverseSurface: '#e7e0db',
  inverseOnSurface: '#322e2b',
  outline: '#958b85',
  outlineVariant: '#4d4744',
  surfaceTint: '#d7cfcb',
  primary: '#ffb59f',
  onPrimary: '#452010',
  primaryContainer: '#67301c',
  onPrimaryContainer: '#ffdbd0',
  secondary: '#ffb59f',
  onSecondary: '#472117',
  secondaryContainer: '#69301a',
  onSecondaryContainer: '#ffdbd0',
  secondaryFixed: '#ffdbd0',
  secondaryFixedDim: '#ffb59f',
  onSecondaryFixed: '#3a0a00',
  onSecondaryFixedVariant: '#793019',
  tertiary: '#ffdcae',
  tertiaryContainer: '#543d00',
  error: '#ffb4ab',
  errorContainer: '#93000a',
};

export const SPACING = {
  xs2: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xl2: 48,
};

export const RADIUS = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};