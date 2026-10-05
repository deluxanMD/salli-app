import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { SampleSmsCard } from '@/features/welcome/sample-sms-card';
import { en } from '@/i18n/en';
import { extraRadius, extraSizes } from '@/theme/canvas-extras';
import { sizes, spacing } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

const PAGES = 3;

export function BrandMark() {
  const { colors } = useTheme();
  return (
    <View style={styles.brand}>
      <View style={[styles.mark, { backgroundColor: colors.primary }]}>
        <Text variant="brandLetter" style={{ color: colors.onPrimary }}>
          S
        </Text>
      </View>
      <Text variant="brand">Salli</Text>
    </View>
  );
}

export function WelcomeScreen() {
  const { colors } = useTheme();
  return (
    <Screen>
      <View style={styles.header}>
        <BrandMark />
        <PressableScale
          accessibilityRole="button"
          accessibilityLabel={en.welcome.skip}
          onPress={() => router.replace('/sms-access')}
          style={styles.skip}
        >
          <Text variant="small" color="textMuted">
            {en.welcome.skip}
          </Text>
        </PressableScale>
      </View>

      <SampleSmsCard tone="primary" />

      <View style={styles.copy}>
        <Text variant="hero" accessibilityRole="header">
          {en.welcome.title}
        </Text>
        <Text variant="lead" color="textMuted">
          {en.welcome.body}
        </Text>
      </View>

      <View style={[styles.note, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={[styles.noteTile, { backgroundColor: colors.successSoft }]}>
          <Icon name="shield-check" size={sizes.icon.row} color={colors.successText} />
        </View>
        <View style={styles.noteCopy}>
          <Text variant="label">{en.welcome.privacyTitle}</Text>
          <Text variant="caption" color="textMuted" style={styles.noteBody}>
            {en.welcome.privacyBody}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <View
          accessible
          accessibilityRole="progressbar"
          accessibilityLabel={en.welcome.pageLabel(1, PAGES)}
          style={styles.dots}
        >
          {Array.from({ length: PAGES }, (_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === 0 ? styles.dotActive : null,
                { backgroundColor: i === 0 ? colors.primary : colors.toggleOff },
              ]}
            />
          ))}
        </View>
        <Button label={en.welcome.getStarted} onPress={() => router.push('/sms-access')} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  mark: {
    width: extraSizes.brandMark,
    height: extraSizes.brandMark,
    borderRadius: extraRadius.brandMark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skip: { minHeight: sizes.minTouch, justifyContent: 'center', paddingHorizontal: spacing.sm },
  copy: { gap: spacing.md },
  note: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    padding: 14,
    borderRadius: extraRadius.banner,
    borderWidth: 1,
  },
  noteTile: {
    width: 36,
    height: 36,
    borderRadius: extraRadius.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteCopy: { flex: 1, gap: 2 },
  noteBody: { lineHeight: 18 },
  footer: { marginTop: 'auto', gap: spacing.lg },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  dotActive: { width: 24 },
});
