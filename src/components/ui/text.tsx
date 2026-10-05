import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';

import { extraTypography } from '@/theme/canvas-extras';
import { typography, type Palette } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

export const MAX_FONT_SIZE_MULTIPLIER = 1.3;

const scale = { ...typography, ...extraTypography };

export type TextVariant = keyof typeof scale;

// The theme declares fontVariant as a readonly tuple, which React Native's TextStyle rejects.
const textStyles = Object.fromEntries(
  Object.entries(scale).map(([name, style]) => [
    name,
    'fontVariant' in style ? { ...style, fontVariant: [...style.fontVariant] } : style,
  ]),
) as Record<TextVariant, TextStyle>;

export type TextProps = RNTextProps & {
  variant?: TextVariant;
  color?: keyof Palette;
};

/** Typography primitive: applies a type-scale entry and a theme color, capped at 130% scaling. */
export function Text({ variant = 'body', color = 'text', style, ...rest }: TextProps) {
  const { colors } = useTheme();
  return (
    <RNText
      maxFontSizeMultiplier={MAX_FONT_SIZE_MULTIPLIER}
      {...rest}
      style={[textStyles[variant], { color: colors[color] }, style]}
    />
  );
}
