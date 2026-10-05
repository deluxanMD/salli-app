import { StyleSheet } from 'react-native';

import { Icon, type IconName } from '@/components/ui/icon';
import { PressableScale } from '@/components/ui/pressable-scale';
import { extraSizes } from '@/theme/canvas-extras';
import { radius, sizes } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

type IconButtonProps = {
  icon: IconName;
  /** Required: an icon-only button has no visible text. */
  accessibilityLabel: string;
  onPress?: () => void;
};

/** 44 × 44 circular icon button (back, add, notifications). */
export function IconButton({ icon, accessibilityLabel, onPress }: IconButtonProps) {
  const { colors } = useTheme();
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={[styles.base, { backgroundColor: colors.surface, borderColor: colors.border }]}
    >
      <Icon name={icon} size={sizes.icon.row} color={colors.text} />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: {
    width: extraSizes.iconButton,
    height: extraSizes.iconButton,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
