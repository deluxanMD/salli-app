import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { charts, radius, spacing, type CategoryId } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

type ProgressBarProps = {
  /** Fraction used, 0 to 1 (values above 1 render as full). */
  value: number;
  categoryId: CategoryId;
  /** Optional row above the bar: name on the left, amounts on the right. */
  label?: string;
  valueLabel?: string;
};

export function ProgressBar({ value, categoryId, label, valueLabel }: ProgressBarProps) {
  const { colors, categoryColor } = useTheme();
  const clamped = Math.min(Math.max(value, 0), 1);
  const warn = value >= charts.progress.warnAt;
  const fill = warn ? colors.warning : categoryColor(categoryId);

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100), text: valueLabel }}
      style={styles.wrap}
    >
      {label || valueLabel ? (
        <View style={styles.row}>
          <Text variant="rowTitle" style={styles.label} numberOfLines={1}>
            {label}
          </Text>
          <Text
            variant="small"
            style={[styles.value, { color: warn ? colors.warning : colors.textMuted }]}
          >
            {valueLabel}
          </Text>
        </View>
      ) : null}
      <View style={[styles.track, { backgroundColor: colors.track }]}>
        <View
          testID="progress-fill"
          style={[styles.fill, { width: `${clamped * 100}%`, backgroundColor: fill }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.sm },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  label: { flexShrink: 1 },
  value: { fontVariant: ['tabular-nums'] },
  track: { height: charts.progress.height, borderRadius: radius.pill, overflow: 'hidden' },
  fill: { height: charts.progress.height, borderRadius: radius.pill },
});
