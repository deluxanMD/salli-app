import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { ChartSlot } from '@/components/charts/chart-slot';
import { Banner } from '@/components/ui/banner';
import { Card } from '@/components/ui/card';
import { HeroCard } from '@/components/ui/hero-card';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { PressableScale } from '@/components/ui/pressable-scale';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Screen } from '@/components/ui/screen';
import { SectionHeader } from '@/components/ui/section-header';
import { Text } from '@/components/ui/text';
import { TransactionRow } from '@/components/ui/transaction-row';
import { BrandMark } from '@/features/welcome/welcome-screen';
import { en } from '@/i18n/en';
import {
  MOCK_NOW,
  mockBudgets,
  mockCategoryShare,
  mockDashboardBudgetIds,
  mockOverview,
  mockTransactions,
} from '@/mock/mock-data';
import { categories, charts, formatRs, radius, sizes, spacing } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';
import { formatMonthYear, formatRowTime } from '@/utils/date-format';

const RECENT_COUNT = 4;

function CategoryLegend() {
  const { colors, categoryColor } = useTheme();
  return (
    <View style={styles.legend}>
      {mockCategoryShare.map(({ categoryId, percent }) => (
        <View key={categoryId} style={styles.legendRow}>
          <View style={[styles.swatch, { backgroundColor: categoryColor(categoryId) }]} />
          <Text variant="caption" style={styles.legendLabel} color="textMuted" numberOfLines={1}>
            {categories[categoryId].label}
          </Text>
          <Text variant="captionBold" style={{ color: colors.text, fontVariant: ['tabular-nums'] }}>
            {percent.toFixed(1)}%
          </Text>
        </View>
      ))}
    </View>
  );
}

export function DashboardScreen() {
  const { colors } = useTheme();
  const recent = mockTransactions.filter((t) => t.auto).slice(0, RECENT_COUNT);
  const budgetLines = mockDashboardBudgetIds
    .map((id) => mockBudgets.find((b) => b.categoryId === id))
    .filter((b) => b !== undefined);

  return (
    <Screen hasTabBar>
      <View style={styles.topRow}>
        <BrandMark />
        <IconButton icon="bell" accessibilityLabel={en.dashboard.notifications} />
      </View>

      <View style={styles.topRow}>
        <Text variant="title" accessibilityRole="header">
          {en.dashboard.title}
        </Text>
        <PressableScale
          accessibilityRole="button"
          accessibilityLabel={`${en.dashboard.chooseMonth}, ${formatMonthYear(MOCK_NOW)}`}
          hitSlop={{ top: 2, bottom: 2 }}
          style={[styles.month, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Icon name="calendar" size={16} color={colors.text} />
          <Text variant="small">{formatMonthYear(MOCK_NOW)}</Text>
          <Icon name="chevron-down" size={16} color={colors.text} />
        </PressableScale>
      </View>

      <HeroCard {...mockOverview} />

      <Banner
        tone="info"
        icon="message-square"
        title={en.banners.autoOn}
        subtitle={en.banners.autoSorted(3)}
        onPress={() => router.push('/activity')}
      />

      <View>
        <SectionHeader
          title={en.dashboard.byCategory}
          actionLabel={en.common.details}
          onActionPress={() => router.push('/insights')}
        />
        <Card>
          <View style={styles.donutRow}>
            <ChartSlot
              width={charts.donut.size}
              height={charts.donut.size}
              accessibilityLabel={en.charts.donut}
            />
            <CategoryLegend />
          </View>
        </Card>
      </View>

      <View>
        <SectionHeader title={en.dashboard.last7Days} />
        <Card>
          <Text variant="caption" color="textMuted" style={styles.cardCaption}>
            {en.dashboard.dailySpending}
          </Text>
          <ChartSlot height={160} accessibilityLabel={en.charts.dailyBars} />
        </Card>
      </View>

      <View>
        <SectionHeader
          title={en.dashboard.budgets}
          actionLabel={en.common.seeAll}
          onActionPress={() => router.push('/budgets')}
        />
        <Card>
          <View style={styles.budgetList}>
            {budgetLines.map(({ categoryId, spent, limit }) => (
              <ProgressBar
                key={categoryId}
                categoryId={categoryId}
                value={spent / limit}
                label={
                  categoryId === 'bills'
                    ? categories.bills.shortLabel
                    : categories[categoryId].label
                }
                valueLabel={`${formatRs(spent)} / ${formatRs(limit).replace('Rs ', '')}`}
              />
            ))}
          </View>
        </Card>
      </View>

      <View>
        <SectionHeader
          title={en.dashboard.recent}
          actionLabel={en.common.seeAll}
          onActionPress={() => router.push('/activity')}
        />
        <Card padding="list">
          {recent.map((t, index) => (
            <TransactionRow
              key={t.id}
              merchant={t.merchant}
              categoryId={t.categoryId}
              amount={t.amount}
              time={formatRowTime(t.at, MOCK_NOW)}
              auto={t.auto}
              decimals={0}
              divider={index < recent.length - 1}
              onPress={() => router.push({ pathname: '/transaction/[id]', params: { id: t.id } })}
            />
          ))}
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  month: {
    minHeight: sizes.chip,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  donutRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  legend: { flex: 1, minWidth: 0, gap: 2 },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, minHeight: 22 },
  swatch: { width: 10, height: 10, borderRadius: 4 },
  legendLabel: { flex: 1, minWidth: 0 },
  cardCaption: { marginBottom: 10 },
  budgetList: { gap: spacing.lg },
});
