import { useState } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { Icon, type IconName } from '@/components/ui/icon';
import { MAX_FONT_SIZE_MULTIPLIER } from '@/components/ui/text';
import { radius, sizes, spacing, typography } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

type InputProps = Omit<TextInputProps, 'style' | 'placeholderTextColor'> & {
  /** Required: an input has no visible label of its own. */
  accessibilityLabel: string;
  icon?: IconName;
};

export function Input({ icon, onFocus, onBlur, ...rest }: InputProps) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={[
        styles.field,
        {
          backgroundColor: colors.surface,
          borderColor: focused ? colors.primary : colors.border,
          borderWidth: focused ? 1.5 : 1,
        },
      ]}
    >
      {icon ? <Icon name={icon} size={sizes.icon.row} color={colors.textMuted} /> : null}
      <TextInput
        maxFontSizeMultiplier={MAX_FONT_SIZE_MULTIPLIER}
        placeholderTextColor={colors.textMuted}
        selectionColor={colors.primary}
        {...rest}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        style={[styles.text, { color: colors.text }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    minHeight: sizes.input,
    borderRadius: radius.input,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  text: {
    ...typography.body,
    flex: 1,
    paddingVertical: 0,
  },
});
