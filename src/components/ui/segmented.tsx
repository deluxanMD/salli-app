import { StyleSheet, View } from 'react-native';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Text } from '@/components/ui/text';
import { extraRadius } from '@/theme/canvas-extras';
import { radius, sizes, spacing } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

type SegmentedProps<T extends string> = {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  accessibilityLabel?: string;
};

const HIT_SLOP = {
  top: (sizes.minTouch - sizes.segment) / 2,
  bottom: (sizes.minTouch - sizes.segment) / 2,
};

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  accessibilityLabel,
}: SegmentedProps<T>) {
  const { colors } = useTheme();
  return (
    <View
      accessibilityRole="tablist"
      accessibilityLabel={accessibilityLabel}
      style={[styles.track, { backgroundColor: colors.surfaceAlt }]}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <PressableScale
            key={option.value}
            accessibilityRole="tab"
            accessibilityLabel={option.label}
            accessibilityState={{ selected }}
            hitSlop={HIT_SLOP}
            onPress={() => onChange(option.value)}
            style={[styles.segment, { backgroundColor: selected ? colors.primary : 'transparent' }]}
          >
            <Text variant="small" style={{ color: selected ? colors.onPrimary : colors.textMuted }}>
              {option.label}
            </Text>
          </PressableScale>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    padding: spacing.xs,
    borderRadius: radius.input,
    gap: 0,
  },
  segment: {
    flex: 1,
    minHeight: sizes.segment,
    borderRadius: extraRadius.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
