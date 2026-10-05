import { StyleSheet, View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';

import { layout, radius, spacing } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

type CardProps = ViewProps & {
  /** `default` pads 16 on all sides; `list` is for rows (4 vertical, 16 horizontal); `none` is bare. */
  padding?: 'default' | 'list' | 'none';
  style?: StyleProp<ViewStyle>;
};

const paddings = {
  default: { padding: layout.cardPadding },
  list: { paddingVertical: spacing.xs, paddingHorizontal: spacing.lg },
  none: {},
} as const;

export function Card({ padding = 'default', style, ...rest }: CardProps) {
  const { colors, cardShadow } = useTheme();
  return (
    <View
      {...rest}
      style={[
        styles.base,
        { backgroundColor: colors.surface, borderColor: colors.border },
        cardShadow,
        paddings[padding],
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.card,
    borderWidth: 1,
  },
});
