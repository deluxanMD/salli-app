import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Screen } from '@/components/ui/screen';
import { Text } from '@/components/ui/text';
import { SampleSmsCard } from '@/features/welcome/sample-sms-card';
import { en } from '@/i18n/en';
import { extraSizes } from '@/theme/canvas-extras';
import { fontFamily, radius, spacing } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

export function SmsAccessScreen() {
  const { colors } = useTheme();
  const finish = () => router.replace('/home');

  return (
    <Screen>
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          accessibilityLabel={en.common.back}
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/welcome'))}
        />
        <Text variant="small" color="textMuted" style={styles.step}>
          {en.smsAccess.step}
        </Text>
      </View>

      <SampleSmsCard tone="soft" />

      <View style={styles.copy}>
        <Text variant="title" accessibilityRole="header">
          {en.smsAccess.title}
        </Text>
        <Text variant="body" color="textMuted">
          {en.smsAccess.body}
        </Text>
      </View>

      <View style={styles.points}>
        {en.smsAccess.points.map((point) => (
          <View key={point} style={styles.point}>
            <View style={[styles.check, { backgroundColor: colors.successSoft }]}>
              <Icon name="check" size={15} color={colors.successText} strokeWidth={2.6} />
            </View>
            <Text variant="labelMedium" style={styles.pointText}>
              {point}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Button label={en.smsAccess.allow} icon="shield-check" onPress={finish} />
        <Button label={en.smsAccess.skip} variant="ghost" onPress={finish} />
        <Text variant="caption" color="textMuted" style={styles.note}>
          {en.smsAccess.iphoneNote}
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  step: { fontFamily: fontFamily.bold },
  copy: { gap: 10 },
  points: { gap: spacing.md },
  point: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  check: {
    width: extraSizes.checkBadge,
    height: extraSizes.checkBadge,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointText: { flex: 1 },
  footer: { marginTop: 'auto', gap: spacing.sm },
  note: { textAlign: 'center', lineHeight: 18, marginTop: spacing.xs },
});
