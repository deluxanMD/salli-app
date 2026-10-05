import { StyleSheet } from 'react-native';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Text } from '@/components/ui/text';
import { radius, sizes, spacing } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

// Chip is 40 high; 2 px of hit slop above and below brings the touch target to 44.
const HIT_SLOP = {
  top: (sizes.minTouch - sizes.chip) / 2,
  bottom: (sizes.minTouch - sizes.chip) / 2,
};

export function Chip({ label, selected = false, onPress }: ChipProps) {
  const { colors } = useTheme();
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      hitSlop={HIT_SLOP}
      onPress={onPress}
      style={[
        styles.base,
        {
          backgroundColor: selected ? colors.primary : colors.surface,
          borderColor: selected ? colors.primary : colors.border,
        },
      ]}
    >
      <Text variant="small" style={{ color: selected ? colors.onPrimary : colors.text }}>
        {label}
      </Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: sizes.chip,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
