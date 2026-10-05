import { StyleSheet, View } from 'react-native';

import { Badge } from '@/components/ui/badge';
import { CategoryTile } from '@/components/ui/category-tile';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Text } from '@/components/ui/text';
import { en } from '@/i18n/en';
import { categories, formatRs, spacing, type CategoryId } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

type TransactionRowProps = {
  merchant: string;
  /** Null when the parser could not file the transaction: the row asks for a category. */
  categoryId: CategoryId | null;
  /** Negative for expenses, positive for income. */
  amount: number;
  time: string;
  /** Row was created from an SMS. */
  auto?: boolean;
  /** Two decimals in Activity, whole rupees on the dashboard. */
  decimals?: 0 | 2;
  /** Draws the divider under the row; leave false for the last row in a card. */
  divider?: boolean;
  onPress?: () => void;
};

const MIN_ROW_HEIGHT = 68;

export function TransactionRow({
  merchant,
  categoryId,
  amount,
  time,
  auto = false,
  decimals = 2,
  divider = true,
  onPress,
}: TransactionRowProps) {
  const { colors } = useTheme();
  const needsReview = categoryId === null;
  const isIncome = amount > 0;
  const amountText = formatRs(amount, { decimals, signed: true });
  const subtitle = needsReview ? en.transaction.needsCategory : categories[categoryId].shortLabel;

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={`${merchant}, ${subtitle}, ${amountText}, ${time}`}
      onPress={onPress}
      style={[styles.row, divider && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
    >
      <CategoryTile categoryId={categoryId ?? 'shopping'} needsReview={needsReview} />
      <View style={styles.copy}>
        <Text variant="rowTitle" numberOfLines={1}>
          {merchant}
        </Text>
        <View style={styles.subtitleRow}>
          <Text variant="caption" color={needsReview ? 'warning' : 'textMuted'} numberOfLines={1}>
            {subtitle}
          </Text>
          {needsReview ? <Badge variant="review" /> : auto ? <Badge variant="auto" /> : null}
        </View>
      </View>
      <View style={styles.trailing}>
        <Text variant="amount" color={isIncome ? 'successText' : 'text'}>
          {amountText}
        </Text>
        <Text variant="time" color="textMuted">
          {time}
        </Text>
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: MIN_ROW_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  copy: { flex: 1, gap: 2 },
  subtitleRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  trailing: { alignItems: 'flex-end', gap: 2 },
});
