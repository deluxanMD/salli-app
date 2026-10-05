import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Banner } from '@/components/ui/banner';
import { Card } from '@/components/ui/card';
import { Chip } from '@/components/ui/chip';
import { IconButton } from '@/components/ui/icon-button';
import { Input } from '@/components/ui/input';
import { Screen } from '@/components/ui/screen';
import { SectionLabel } from '@/components/ui/section-label';
import { Text } from '@/components/ui/text';
import { TransactionRow } from '@/components/ui/transaction-row';
import { en } from '@/i18n/en';
import { mockTransactions } from '@/mock/mock-data';
import { categories, layout, spacing, type CategoryId } from '@/theme/salli-theme';
import { formatDayHeader, formatTime, groupByDay } from '@/utils/date-format';

const FILTERS: readonly CategoryId[] = ['food', 'groceries', 'transport', 'bills', 'shopping'];

export function ActivityScreen() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<CategoryId | 'all'>('all');

  const needsCategory = mockTransactions.filter((t) => t.categoryId === null);
  const needle = query.trim().toLowerCase();
  const visible = mockTransactions.filter((t) => {
    if (filter !== 'all' && t.categoryId !== filter) return false;
    if (!needle) return true;
    const category = t.categoryId ? categories[t.categoryId].label.toLowerCase() : '';
    return t.merchant.toLowerCase().includes(needle) || category.includes(needle);
  });
  const groups = groupByDay(visible, (t) => t.at);

  const open = (id: string) => router.push({ pathname: '/transaction/[id]', params: { id } });

  return (
    <Screen hasTabBar>
      <View style={styles.header}>
        <Text variant="title" accessibilityRole="header">
          {en.activity.title}
        </Text>
        <IconButton icon="plus" accessibilityLabel={en.activity.addManually} />
      </View>

      <Input
        icon="search"
        accessibilityLabel={en.activity.searchLabel}
        placeholder={en.activity.searchPlaceholder}
        value={query}
        onChangeText={setQuery}
        returnKeyType="search"
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipScroll}
        contentContainerStyle={styles.chips}
      >
        <Chip
          label={en.activity.all}
          selected={filter === 'all'}
          onPress={() => setFilter('all')}
        />
        {FILTERS.map((id) => (
          <Chip
            key={id}
            label={categories[id].shortLabel}
            selected={filter === id}
            onPress={() => setFilter(id)}
          />
        ))}
      </ScrollView>

      {needsCategory.length > 0 ? (
        <Banner
          tone="warning"
          icon="circle-help"
          title={en.banners.needsCategory(needsCategory.length)}
          subtitle={en.banners.needsCategoryHint}
          actionLabel={en.common.review}
          onActionPress={() => open(needsCategory[0].id)}
        />
      ) : null}

      {groups.length === 0 ? (
        <Text color="textMuted" style={styles.empty}>
          {en.activity.noMatches}
        </Text>
      ) : (
        groups.map((group) => (
          <View key={group.key}>
            <SectionLabel>{formatDayHeader(group.date)}</SectionLabel>
            <Card padding="list">
              {group.items.map((t, index) => (
                <TransactionRow
                  key={t.id}
                  merchant={t.merchant}
                  categoryId={t.categoryId}
                  amount={t.amount}
                  time={formatTime(t.at)}
                  auto={t.auto}
                  divider={index < group.items.length - 1}
                  onPress={() => open(t.id)}
                />
              ))}
            </Card>
          </View>
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  // Bleed the chip row to the screen edges so it scrolls under the padding.
  chipScroll: { marginHorizontal: -layout.screenPadding, flexGrow: 0 },
  chips: { gap: spacing.sm, paddingHorizontal: layout.screenPadding },
  empty: { textAlign: 'center', paddingVertical: spacing.xxl },
});
