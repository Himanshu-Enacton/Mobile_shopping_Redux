import type { TextStyle } from 'react-native';

// Sizes, weights, and line heights match the existing component typography.
export const fontStyles = {
  text29: { fontSize: 29, lineHeight: 31 },
  text16Bold: { fontSize: 16, fontWeight: '700' },
  text11Bold: { fontSize: 11, fontWeight: '700' },
  text12BoldLine15: { fontSize: 12, lineHeight: 15, fontWeight: '700' },
  text10: { fontSize: 10, lineHeight: 14 },
  text12ExtraBold: { fontSize: 12, fontWeight: '800' },
  text17: { fontSize: 17 },
  text16Medium: { fontSize: 16, lineHeight: 18, fontWeight: '500' },
  text12Bold: { fontSize: 12, fontWeight: '700' },
  text17Bold: { fontSize: 17, fontWeight: '700' },
  text13: { fontSize: 13 },
  text10ExtraBoldSpaced: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  text29ExtraBold: {
    fontSize: 29,
    lineHeight: 34,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  text10ExtraBold: { fontSize: 10, fontWeight: '800' },
  text14Bold: { fontSize: 14, fontWeight: '700' },
  text12: { fontSize: 12 },
  text11Semibold: { fontSize: 11, fontWeight: '600' },
  text14: { fontSize: 14 },
  text13BoldLine17: { fontSize: 13, lineHeight: 17, fontWeight: '700' },
  text11: { fontSize: 11, lineHeight: 15 },
  text13Bold: { fontSize: 13, fontWeight: '700' },
  text28ExtraBold: { fontSize: 28, fontWeight: '800' },
  text15Bold: { fontSize: 15, fontWeight: '700' },
} as const satisfies Record<string, TextStyle>;
