import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ChartSlot } from '@/components/charts/chart-slot';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Screen } from '@/components/ui/screen';
import { Segmented } from '@/components/ui/segmented';
import { SectionHeader } from '@/components/ui/section-header';
import { Text } from '@/components/ui/text';
import { en } from '@/i18n/en';
import { mockHighlights, mockOverview, mockTopMerchants } from '@/mock/mock-data';
import { extraRadius } from '@/theme/canvas-extras';
import { categories, formatRs, radius, spacing } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

type Period = 'week' | 'month' | 'year';

const PERIODS = [
  { value: 'week', label: en.insights.period.week },
  { value: 'month', label: en.insights.period.month },
  { value: 'year', label: en.insights.period.year },
] as const;

function HighlightRow({ children }: { children: string }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.highlight, { backgroundColor: colors.primarySoft }]}>
      <View style={[styles.highlightTile, { backgroundColor: colors.primary }]}>
        <Icon name="sparkles" size={17} color={colors.onPrimary} />
      </View>
      <Text variant="labelMedium" style={styles.highlightText}>
        {children}
      </Text>
    </View>
  );
}

export function InsightsScreen() {
  const { colors } = useTheme();
  const [period, setPeriod] = useState<Period>('month');
  const top = mockTopMerchants[0].total;
  const { biggestCategory, highestDay } = mockHighlights;

  return (
    <Screen hasTabBar>
      <Text variant="title" accessibilityRole="header">
        {en.insights.title}
      </Text>

      <Segmented
        options={PERIODS}
        value={period}
        onChange={setPeriod}
        accessibilityLabel={en.insights.periodLabel}
      />

      <View>
        <SectionHeader title={en.insights.trend} />
        <Card>
          <Text variant="caption" color="textMuted">
            {en.insights.cumulative}
          </Text>
          <Text variant="metric" style={styles.total}>
            {formatRs(mockOverview.spent)}
          </Text>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.solidKey, { backgroundColor: colors.chart }]} />
              <Text variant="caption" color="textMuted">
                {en.insights.thisMonth}
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dashedKey, { borderTopColor: colors.textMuted }]} />
              <Text variant="caption" color="textMuted">
                {en.insights.lastMonth}
              </Text>
            </View>
          </View>
          <ChartSlot height={186} accessibilityLabel={en.charts.trendLine} />
        </Card>
      </View>

      <View>
        <SectionHeader title={en.insights.last6Months} />
        <Card>
          <Text variant="caption" color="textMuted" style={styles.cardCaption}>
            {en.insights.totalPerMonth}
          </Text>
          <ChartSlot height={170} accessibilityLabel={en.charts.monthlyBars} />
        </Card>
      </View>

      <View>
        <SectionHeader title={en.insights.topMerchants} />
        <Card>
          <View style={styles.merchants}>
            {mockTopMerchants.map(({ merchant, total }) => (
              <ProgressBar
                key={merchant}
                categoryId="chart"
                value={total / top}
                label={merchant}
                valueLabel={formatRs(total)}
                emphasizeValue
              />
            ))}
          </View>
        </Card>
      </View>

      <View>
        <SectionHeader title={en.insights.highlights} />
        <View style={styles.highlights}>
          <HighlightRow>
            {en.insights.biggestCategory(
              categories[biggestCategory.categoryId].label,
              biggestCategory.percent,
            )}
          </HighlightRow>
          <HighlightRow>{en.insights.highestDay(highestDay)}</HighlightRow>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  total: { marginTop: 2, marginBottom: spacing.sm },
  legend: { flexDirection: 'row', gap: spacing.lg, marginBottom: spacing.sm },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  solidKey: { width: 14, height: 4, borderRadius: 2 },
  dashedKey: { width: 14, height: 0, borderTopWidth: 3, borderStyle: 'dashed' },
  cardCaption: { marginBottom: spacing.md },
  merchants: { gap: 14 },
  highlights: { gap: 10 },
  highlight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: 14,
    borderRadius: extraRadius.banner,
  },
  highlightTile: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightText: { flex: 1 },
});
