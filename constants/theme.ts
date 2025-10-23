/**
 * Color system for the Habit Builder app
 * Following Material Design 3 and iOS design guidelines
 */

import { Platform } from 'react-native';

const tintColorLight = '#2196F3';
const tintColorDark = '#2196F3';

export const Colors = {
  light: {
    text: '#11181C',
    textSecondary: '#546E7A',
    background: '#FFFFFF',
    backgroundSecondary: '#F5F5F5',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: '#2196F3',
    primaryDark: '#1976D2',
    primaryLight: '#BBDEFB',
    border: '#E0E0E0',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FF9800',
  },
  dark: {
    text: '#FFFFFF',
    textSecondary: '#B0BEC5',
    background: '#000000',
    backgroundSecondary: '#0A1929',
    backgroundTertiary: '#1A237E',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: '#2196F3',
    primaryDark: '#1565C0',
    primaryLight: '#64B5F6',
    border: '#263238',
    success: '#66BB6A',
    error: '#EF5350',
    warning: '#FFA726',
  },
};

export const Gradients = {
  dark: {
    background: ['#000000', '#0A1929', '#1A237E'],
  },
  light: {
    background: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
  },
};

export const Spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 16,
  lg: 24,
  pill: 28,
  full: 9999,
};


export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});