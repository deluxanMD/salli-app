import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, View } from 'react-native';

import { elevation, radius, sizes } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  accessibilityLabel: string;
  disabled?: boolean;
};

// Switch is 28 high; 8 px of hit slop above and below brings the touch target to 44.
const HIT_SLOP = {
  top: (sizes.minTouch - sizes.switch.height) / 2,
  bottom: (sizes.minTouch - sizes.switch.height) / 2,
};
const PADDING = (sizes.switch.height - sizes.switch.knob) / 2;

export function Switch({
  value,
  onValueChange,
  accessibilityLabel,
  disabled = false,
}: SwitchProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: value, disabled }}
      disabled={disabled}
      hitSlop={HIT_SLOP}
      onPress={() => {
        // Haptics throws on platforms without a haptic engine (web); ignore it.
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        onValueChange(!value);
      }}
      style={[
        styles.track,
        {
          backgroundColor: value ? colors.primary : colors.toggleOff,
          justifyContent: value ? 'flex-end' : 'flex-start',
        },
        disabled && styles.disabled,
      ]}
    >
      <View style={[styles.knob, { backgroundColor: colors.onPrimary }]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: sizes.switch.width,
    height: sizes.switch.height,
    borderRadius: radius.pill,
    padding: PADDING,
    flexDirection: 'row',
    alignItems: 'center',
  },
  knob: {
    width: sizes.switch.knob,
    height: sizes.switch.knob,
    borderRadius: radius.pill,
    shadowColor: elevation.light.card.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
  },
  disabled: { opacity: 0.4 },
});
