import { StyleSheet, View } from 'react-native';

import { Sparkline } from '@/components/charts/sparkline';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { en } from '@/i18n/en';
import { withAlpha } from '@/theme/color';
import { formatRs, layout, radius, spacing } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

type HeroCardProps = {
  monthLabel: string;
  previousMonthLabel: string;
  spent: number;
  income: number;
  netSaved: number;
  /** Change in spending versus the previous month, in percent. Negative means spending fell. */
  deltaPercent: number;
  /** Cumulative spend through the month. */
  trend: readonly number[];
};

const SOFT = 0.85;
const PILL = 0.18;
const BLOCK = 0.14;
const DIVIDER = 0.25;

export function HeroCard({
  monthLabel,
  previousMonthLabel,
  spent,
  income,
  netSaved,
  deltaPercent,
  trend,
}: HeroCardProps) {
  const { colors } = useTheme();
  const ink = colors.onPrimary;
  const delta = en.hero.deltaVs(`${Math.abs(deltaPercent).toFixed(1)}%`, previousMonthLabel);

  return (
    <View style={[styles.card, { backgroundColor: colors.hero }]}>
      <View style={styles.header}>
        <Text variant="small" style={{ color: withAlpha(ink, SOFT) }}>
          {en.hero.spentIn(monthLabel)}
        </Text>
        <View style={[styles.pill, { backgroundColor: withAlpha(ink, PILL) }]}>
          <Icon
            name={deltaPercent <= 0 ? 'arrow-down' : 'trending-up'}
            size={12}
            color={ink}
            strokeWidth={2.5}
          />
          <Text variant="captionBold" style={{ color: ink }}>
            {delta}
          </Text>
        </View>
      </View>
      <Text
        variant="display"
        style={[styles.amount, { color: ink }]}
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        {formatRs(spent)}
      </Text>
      <Sparkline
        data={trend}
        stroke={ink}
        area={withAlpha(ink, BLOCK)}
        accessibilityLabel={en.charts.cumulativeSpending}
      />
      <View style={[styles.stats, { backgroundColor: withAlpha(ink, BLOCK) }]}>
        <View style={styles.stat}>
          <Text variant="caption" style={{ color: withAlpha(ink, SOFT) }}>
            {en.hero.income}
          </Text>
          <Text variant="button" style={{ color: ink }}>
            {formatRs(income)}
          </Text>
        </View>
        <View style={[styles.divider, { backgroundColor: withAlpha(ink, DIVIDER) }]} />
        <View style={styles.stat}>
          <Text variant="caption" style={{ color: withAlpha(ink, SOFT) }}>
            {en.hero.netSaved}
          </Text>
          <Text variant="button" style={{ color: ink }}>
            {formatRs(netSaved)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: radius.hero, padding: layout.cardPadding + spacing.xs },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
  },
  amount: { marginTop: 6, marginBottom: 10, fontVariant: ['tabular-nums'] },
  stats: {
    flexDirection: 'row',
    marginTop: 14,
    borderRadius: radius.button,
    paddingVertical: spacing.md,
    paddingHorizontal: 14,
  },
  stat: { flex: 1, gap: 2 },
  divider: { width: 1, marginHorizontal: 14 },
});
