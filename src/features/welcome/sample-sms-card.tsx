import { StyleSheet, View } from 'react-native';

import { CategoryTile } from '@/components/ui/category-tile';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { en } from '@/i18n/en';
import { withAlpha } from '@/theme/color';
import { extraRadius } from '@/theme/canvas-extras';
import { categories, formatRs, radius, spacing } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

type SampleSmsCardProps = {
  /** `primary` on Welcome, `soft` on SMS access. */
  tone: 'primary' | 'soft';
};

const GLOW_A = 0.08;
const GLOW_B = 0.07;

/** Illustration: a bank SMS turning into a filed transaction. */
export function SampleSmsCard({ tone }: SampleSmsCardProps) {
  const { colors } = useTheme();
  const onPrimary = tone === 'primary';
  // The canvas draws the middle label in white on the soft card, which fails contrast; use primaryText there.
  const labelColor = onPrimary ? colors.onPrimary : colors.primaryText;

  return (
    <View style={[styles.card, { backgroundColor: onPrimary ? colors.hero : colors.primarySoft }]}>
      <View style={[styles.glowTop, { backgroundColor: withAlpha(colors.onPrimary, GLOW_A) }]} />
      <View style={[styles.glowBottom, { backgroundColor: withAlpha(colors.onPrimary, GLOW_B) }]} />

      <View style={[styles.bubble, { backgroundColor: colors.surface }]}>
        <View style={styles.senderRow}>
          <Icon name="message-square" size={13} color={colors.textMuted} />
          <Text variant="senderLabel" color="textMuted">
            {en.welcome.sampleSender}
          </Text>
          <Text variant="caption" color="textMuted" style={styles.time}>
            {en.welcome.sampleTime}
          </Text>
        </View>
        <Text variant="sms" style={styles.sms}>
          {en.welcome.sampleSms}
        </Text>
      </View>

      <View style={styles.arrow}>
        <View style={[styles.sparkle, { backgroundColor: colors.surface }]}>
          <Icon name="sparkles" size={15} color={colors.primary} />
        </View>
        <Text variant="captionBold" style={{ color: labelColor }}>
          {en.welcome.sortsForYou}
        </Text>
      </View>

      <View style={[styles.result, { backgroundColor: colors.surface }]}>
        <CategoryTile categoryId="groceries" size="sm" />
        <View style={styles.resultCopy}>
          <Text variant="amount">{en.welcome.sampleMerchant}</Text>
          <Text variant="caption" color="textMuted">
            {categories.groceries.shortLabel}
          </Text>
        </View>
        <Text variant="amount">{formatRs(-4820, { decimals: 2 })}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderRadius: radius.hero,
    padding: spacing.xxl,
    gap: spacing.md,
  },
  glowTop: {
    position: 'absolute',
    right: -50,
    top: -50,
    width: 170,
    height: 170,
    borderRadius: radius.pill,
  },
  glowBottom: {
    position: 'absolute',
    left: -40,
    bottom: -60,
    width: 150,
    height: 150,
    borderRadius: radius.pill,
  },
  bubble: {
    borderRadius: extraRadius.banner,
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
  },
  senderRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  time: { marginLeft: 'auto' },
  sms: { marginTop: spacing.sm },
  arrow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  sparkle: {
    width: 30,
    height: 30,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  result: {
    borderRadius: extraRadius.banner,
    paddingVertical: spacing.md,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  resultCopy: { flex: 1, gap: 2 },
});
