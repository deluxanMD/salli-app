import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Icon, type IconName } from '@/components/ui/icon';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Text } from '@/components/ui/text';
import { extraRadius, extraSizes } from '@/theme/canvas-extras';
import { spacing } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

type ListRowProps = {
  icon: IconName;
  title: string;
  subtitle?: string;
  /** Right-hand content: a Switch, or text for a navigation row (a chevron is added). */
  trailing?: ReactNode;
  /** Text shown before the chevron, e.g. "Manage". */
  value?: string;
  /** Show a chevron. */
  chevron?: boolean;
  divider?: boolean;
  onPress?: () => void;
};

const MIN_HEIGHT = 60;

/** Settings-style row: 38 px icon tile, title, optional subtitle, trailing control. */
export function ListRow({
  icon,
  title,
  subtitle,
  trailing,
  value,
  chevron = false,
  divider = true,
  onPress,
}: ListRowProps) {
  const { colors } = useTheme();

  const body = (
    <>
      <View style={[styles.tile, { backgroundColor: colors.primarySoft }]}>
        <Icon name={icon} size={19} color={colors.primaryText} />
      </View>
      <View style={styles.copy}>
        <Text variant="rowTitle">{title}</Text>
        {subtitle ? (
          <Text variant="caption" color="textMuted">
            {subtitle}
          </Text>
        ) : null}
      </View>
      {value ? (
        <Text variant="small" color="textMuted" style={styles.value}>
          {value}
        </Text>
      ) : null}
      {trailing}
      {chevron ? <Icon name="chevron-right" size={18} color={colors.textMuted} /> : null}
    </>
  );

  const rowStyle = [
    styles.row,
    divider && { borderBottomWidth: 1, borderBottomColor: colors.border },
  ];

  if (onPress) {
    return (
      <PressableScale
        accessibilityRole="button"
        accessibilityLabel={subtitle ? `${title}. ${subtitle}` : title}
        onPress={onPress}
        style={rowStyle}
      >
        {body}
      </PressableScale>
    );
  }
  return <View style={rowStyle}>{body}</View>;
}

const styles = StyleSheet.create({
  row: {
    minHeight: MIN_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  tile: {
    width: extraSizes.listIconTile,
    height: extraSizes.listIconTile,
    borderRadius: extraRadius.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: { flex: 1, gap: 2 },
  value: { marginRight: -spacing.sm },
});
