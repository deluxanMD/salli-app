import { StyleSheet, View } from 'react-native';

import { ChartSlot } from '@/components/charts/chart-slot';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CategoryTile } from '@/components/ui/category-tile';
import { IconButton } from '@/components/ui/icon-button';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Screen } from '@/components/ui/screen';
import { SectionHeader } from '@/components/ui/section-header';
import { Text } from '@/components/ui/text';
import { en } from '@/i18n/en';
import { mockBudgets, mockOverallBudget, type BudgetLine } from '@/mock/mock-data';
import { categories, charts, formatRs, spacing } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

const GAUGE = { width: 220, height: 122 };

function BudgetCategoryRow({ line, divider }: { line: BudgetLine; divider: boolean }) {
  const { colors } = useTheme();
  const ratio = line.spent / line.limit;
  const warn = ratio >= charts.progress.warnAt;
  const amounts = en.budgets.amountOf(
    formatRs(line.spent),
    formatRs(line.limit).replace('Rs ', ''),
  );

  return (
    <View
      style={[styles.row, divider && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
      accessible
      accessibilityLabel={`${categories[line.categoryId].label}, ${Math.round(ratio * 100)}%, ${amounts}`}
    >
      <CategoryTile categoryId={line.categoryId} size="sm" />
      <View style={styles.rowBody}>
        <View style={styles.rowTop}>
          <Text variant="labelSemibold">{categories[line.categoryId].label}</Text>
          <Text variant="labelSemibold" style={{ fontVariant: ['tabular-nums'] }}>
            {Math.round(ratio * 100)}%
          </Text>
        </View>
        <View style={styles.bar}>
          <ProgressBar categoryId={line.categoryId} value={ratio} />
        </View>
        <Text
          variant={warn ? 'captionBold' : 'caption'}
          color={warn ? 'warning' : 'textMuted'}
          style={{ fontVariant: ['tabular-nums'] }}
        >
          {warn ? `${amounts} · ${en.budgets.almostAtLimit}` : amounts}
        </Text>
      </View>
    </View>
  );
}

export function BudgetsScreen() {
  const { colors } = useTheme();
  const total = mockOverallBudget.spent + mockOverallBudget.remaining;
  const percent = Math.round((mockOverallBudget.spent / total) * 100);

  return (
    <Screen hasTabBar>
      <View style={styles.header}>
        <Text variant="title" accessibilityRole="header">
          {en.budgets.title}
        </Text>
        <IconButton icon="plus" accessibilityLabel={en.budgets.add} />
      </View>

      <Card style={styles.overall}>
        <View style={styles.gauge}>
          <ChartSlot
            width={GAUGE.width}
            height={GAUGE.height}
            accessibilityLabel={en.charts.gauge(percent)}
          />
        </View>
        <View style={[styles.stats, { backgroundColor: colors.surfaceAlt }]}>
          <View style={styles.stat}>
            <Text variant="caption" color="textMuted">
              {en.budgets.spent}
            </Text>
            <Text variant="button" style={{ fontVariant: ['tabular-nums'] }}>
              {formatRs(mockOverallBudget.spent)}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.stat}>
            <Text variant="caption" color="textMuted">
              {en.budgets.remaining}
            </Text>
            <Text variant="button" style={{ fontVariant: ['tabular-nums'] }}>
              {formatRs(mockOverallBudget.remaining)}
            </Text>
          </View>
        </View>
      </Card>

      <View>
        <SectionHeader title={en.budgets.byCategory} />
        <Card padding="list">
          {mockBudgets.map((line, index) => (
            <BudgetCategoryRow
              key={line.categoryId}
              line={line}
              divider={index < mockBudgets.length - 1}
            />
          ))}
        </Card>
      </View>

      <Button label={en.budgets.newBudget} variant="soft" icon="plus" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  overall: { paddingTop: 20 },
  gauge: { alignItems: 'center' },
  stats: {
    flexDirection: 'row',
    marginTop: 14,
    borderRadius: 16,
    paddingVertical: spacing.md,
    paddingHorizontal: 14,
  },
  stat: { flex: 1, gap: 2 },
  divider: { width: 1, marginHorizontal: 14 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.md },
  rowBody: { flex: 1, minWidth: 0 },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between' },
  bar: { marginTop: spacing.sm, marginBottom: 6 },
});
