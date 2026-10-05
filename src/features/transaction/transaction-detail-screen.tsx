import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CategoryTile } from '@/components/ui/category-tile';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Screen } from '@/components/ui/screen';
import { Switch } from '@/components/ui/switch';
import { MAX_FONT_SIZE_MULTIPLIER, Text } from '@/components/ui/text';
import { en } from '@/i18n/en';
import { mockTransactions } from '@/mock/mock-data';
import { extraRadius, extraTypography } from '@/theme/canvas-extras';
import { categories, formatRs, spacing } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';
import { formatFullDate } from '@/utils/date-format';

function InfoRow({
  label,
  children,
  divider,
}: {
  label: string;
  children: React.ReactNode;
  divider: boolean;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.infoRow,
        divider && { borderBottomWidth: 1, borderBottomColor: colors.border },
      ]}
    >
      <Text variant="labelRegular" color="textMuted">
        {label}
      </Text>
      {children}
    </View>
  );
}

export function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useTheme();
  const transaction = mockTransactions.find((t) => t.id === id);
  const [alwaysFile, setAlwaysFile] = useState(true);
  const [note, setNote] = useState(transaction?.note ?? '');

  const close = () => (router.canGoBack() ? router.back() : router.replace('/activity'));

  if (!transaction) {
    return (
      <Screen>
        <IconButton icon="chevron-left" accessibilityLabel={en.common.back} onPress={close} />
        <Text color="textMuted">{en.detail.notFound}</Text>
      </Screen>
    );
  }

  const { categoryId, merchant, amount } = transaction;
  const needsReview = categoryId === null;
  const categoryName = categoryId ? categories[categoryId].label : en.transaction.needsCategory;

  return (
    <Screen>
      <View style={styles.header}>
        <IconButton icon="chevron-left" accessibilityLabel={en.common.back} onPress={close} />
        <Text variant="navTitle" accessibilityRole="header">
          {en.detail.title}
        </Text>
      </View>

      <View style={styles.summary}>
        <CategoryTile categoryId={categoryId ?? 'shopping'} size="lg" needsReview={needsReview} />
        <Text variant="merchant" style={styles.merchant}>
          {merchant}
        </Text>
        <Text variant="amountLarge" color={amount > 0 ? 'successText' : 'text'}>
          {formatRs(amount, { decimals: 2, signed: true })}
        </Text>
        <View style={styles.badge}>
          {needsReview ? (
            <Badge variant="review" />
          ) : transaction.auto ? (
            <Badge variant="auto" />
          ) : null}
        </View>
      </View>

      <Card>
        <View style={styles.categoryRow}>
          <CategoryTile categoryId={categoryId ?? 'shopping'} size="sm" needsReview={needsReview} />
          <View style={styles.categoryCopy}>
            <Text variant="caption" color="textMuted">
              {en.detail.category}
            </Text>
            <Text variant="button">{categoryName}</Text>
          </View>
          {/* The category picker sheet is built in the final milestone. */}
          <PressableScale
            accessibilityRole="button"
            accessibilityLabel={en.detail.change}
            hitSlop={{ top: 2, bottom: 2 }}
            style={[styles.change, { backgroundColor: colors.primarySoft }]}
          >
            <Icon name="pencil" size={14} color={colors.primaryText} />
            <Text variant="smallBold" color="primaryText">
              {en.detail.change}
            </Text>
          </PressableScale>
        </View>
      </Card>

      {transaction.sms ? (
        <Card>
          <View style={styles.smsHeader}>
            <Icon name="message-square" size={13} color={colors.textMuted} />
            <Text variant="senderLabel" color="textMuted">
              {en.detail.fromSms}
            </Text>
          </View>
          <Text
            variant="labelRegular"
            style={[styles.smsBody, { backgroundColor: colors.surfaceAlt }]}
          >
            {transaction.sms}
          </Text>
        </Card>
      ) : null}

      {categoryId ? (
        <Card>
          <View style={styles.ruleRow}>
            <View style={styles.categoryCopy}>
              <Text variant="rowTitle">
                {en.detail.alwaysFile(merchant, categories[categoryId].label)}
              </Text>
              <Text variant="caption" color="textMuted">
                {en.detail.alwaysFileHint}
              </Text>
            </View>
            <Switch
              value={alwaysFile}
              onValueChange={setAlwaysFile}
              accessibilityLabel={en.detail.alwaysFileLabel}
            />
          </View>
        </Card>
      ) : null}

      <Card padding="none" style={styles.infoCard}>
        <InfoRow label={en.detail.date} divider>
          <Text variant="labelSemibold">{formatFullDate(transaction.at)}</Text>
        </InfoRow>
        <InfoRow label={en.detail.account} divider>
          <Text variant="labelSemibold">{transaction.account}</Text>
        </InfoRow>
        <InfoRow label={en.detail.note} divider={false}>
          <TextInput
            accessibilityLabel={en.detail.note}
            maxFontSizeMultiplier={MAX_FONT_SIZE_MULTIPLIER}
            placeholder={en.detail.notePlaceholder}
            placeholderTextColor={colors.textMuted}
            selectionColor={colors.primary}
            value={note}
            onChangeText={setNote}
            style={[styles.noteInput, { color: colors.text }]}
          />
        </InfoRow>
      </Card>

      <View style={styles.footer}>
        <Button label={en.detail.save} onPress={close} />
        <Button label={en.detail.delete} variant="destructive" icon="trash-2" onPress={close} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  summary: { alignItems: 'center' },
  merchant: { marginTop: 10 },
  badge: { marginTop: spacing.sm },
  categoryRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  categoryCopy: { flex: 1, gap: 2 },
  change: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    borderRadius: extraRadius.control,
  },
  smsHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  smsBody: {
    marginTop: spacing.sm,
    padding: 14,
    paddingVertical: spacing.md,
    borderRadius: extraRadius.inset,
    lineHeight: 21,
    overflow: 'hidden',
  },
  ruleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  infoCard: { paddingHorizontal: spacing.lg },
  infoRow: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  noteInput: {
    ...extraTypography.labelSemibold,
    flex: 1,
    textAlign: 'right',
    paddingVertical: 0,
  },
  footer: { marginTop: 'auto', gap: spacing.xs },
});
