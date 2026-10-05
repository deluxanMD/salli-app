import { StyleSheet } from 'react-native';

import { Icon, type IconName } from '@/components/ui/icon';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Text } from '@/components/ui/text';
import { radius, sizes, spacing, type Palette } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

export type ButtonVariant = 'primary' | 'soft' | 'ghost' | 'destructive';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: IconName;
  disabled?: boolean;
  /** Full width by default; pass false to hug the content. */
  fullWidth?: boolean;
  accessibilityLabel?: string;
};

const variants: Record<ButtonVariant, { fill: keyof Palette | null; content: keyof Palette }> = {
  primary: { fill: 'primary', content: 'onPrimary' },
  soft: { fill: 'primarySoft', content: 'primaryText' },
  ghost: { fill: null, content: 'textMuted' },
  destructive: { fill: null, content: 'danger' },
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  disabled = false,
  fullWidth = true,
  accessibilityLabel,
}: ButtonProps) {
  const { colors } = useTheme();
  const { fill, content } = variants[variant];
  const contentColor = colors[content];

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.base,
        fullWidth ? styles.fullWidth : styles.hug,
        { backgroundColor: fill ? colors[fill] : 'transparent' },
        disabled && styles.disabled,
      ]}
    >
      {icon ? <Icon name={icon} size={sizes.icon.button} color={contentColor} /> : null}
      <Text variant="button" style={{ color: contentColor }}>
        {label}
      </Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: sizes.button,
    borderRadius: radius.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  fullWidth: { alignSelf: 'stretch' },
  hug: { alignSelf: 'flex-start' },
  disabled: { opacity: 0.4 },
});
