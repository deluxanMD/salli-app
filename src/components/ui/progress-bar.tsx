import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { charts, radius, spacing, type CategoryId } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

type ProgressBarProps = {
  /** Fraction used, 0 to 1 (values above 1 render as full). */
  value: number;
  /** Category colors the fill; pass `chart` for the highlighted chart color. */
  categoryId: CategoryId | 'chart';
  /** Optional row above the bar: name on the left, amounts on the right. */
  label?: string;
  valueLabel?: string;
  /** Show the value in bold text color (Top merchants) instead of muted. */
  emphasizeValue?: boolean;
};

export function ProgressBar({
  value,
  categoryId,
  label,
  valueLabel,
  emphasizeValue = false,
}: ProgressBarProps) {
  const { colors, categoryColor } = useTheme();
  const clamped = Math.min(Math.max(value, 0), 1);
  // The 90% warning applies to budgets; chart-colored bars (top merchants) never warn.
  const warn = categoryId !== 'chart' && value >= charts.progress.warnAt;
  const fill = warn
    ? colors.warning
    : categoryId === 'chart'
      ? colors.chart
      : categoryColor(categoryId);

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
          <Text variant="small" style={styles.label} numberOfLines={1}>
            {label}
          </Text>
          <Text
            variant={emphasizeValue ? 'smallBold' : 'smallRegular'}
            style={[
              styles.value,
              { color: warn ? colors.warning : emphasizeValue ? colors.text : colors.textMuted },
            ]}
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
