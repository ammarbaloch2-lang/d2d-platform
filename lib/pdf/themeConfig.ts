/**
 * Dare2Discover Theme Configuration for PDF Generation
 * Based on Wadi Al Ghaf branding from WAG.pdf template
 */

export const d2dTheme = {
  colors: {
    primary: '#1E5128', // Deep Green
    primaryLight: '#2E7D3B',
    secondary: '#F5A524', // Orange/Gold
    secondaryDark: '#D68F1F',
    accent: '#F5A524',
    sand: {
      light: '#F5DEB3',
      default: '#DEB887',
      dark: '#BC9970',
    },
    text: {
      primary: '#1E5128',
      secondary: '#666666',
      light: '#999999',
      white: '#FFFFFF',
    },
    background: {
      white: '#FFFFFF',
      light: '#F9F9F9',
      sand: '#F5DEB3',
    },
    border: '#E0E0E0',
  },
  fonts: {
    primary: 'Montserrat',
    secondary: 'Tajawal',
    mono: 'monospace',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 20px rgba(0,0,0,0.15)',
  },
};

export type Theme = typeof d2dTheme;
