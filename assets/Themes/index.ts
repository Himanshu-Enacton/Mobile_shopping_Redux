import { COLORS } from './color';
import { fontStyles } from './fontStyle';

export { COLORS } from './color';
export { fontStyles } from './fontStyle';

// Usage: color: theme.textPrimary, ...theme.text14Bold
export const theme = {
  ...COLORS,
  ...fontStyles,
} as const;
