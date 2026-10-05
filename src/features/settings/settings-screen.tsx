import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { ListRow } from '@/components/ui/list-row';
import { Screen } from '@/components/ui/screen';
import { Segmented } from '@/components/ui/segmented';
import { SectionLabel } from '@/components/ui/section-label';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';
import { en } from '@/i18n/en';
import { spacing } from '@/theme/salli-theme';
import { useThemePreference, type ThemePreference } from '@/theme/theme-provider';

const THEMES = [
  { value: 'light', label: en.settings.light },
  { value: 'dark', label: en.settings.dark },
  { value: 'system', label: en.settings.system },
] as const satisfies readonly { value: ThemePreference; label: string }[];

// Rows without an onPress open their own screens in the final milestone.
export function SettingsScreen() {
  const { preference, setPreference } = useThemePreference();
  const [smsTracking, setSmsTracking] = useState(true);
  const [appLock, setAppLock] = useState(true);
  const s = en.settings;

  return (
    <Screen hasTabBar>
      <Text variant="title" accessibilityRole="header">
        {s.title}
      </Text>

      <View>
        <SectionLabel>{s.appearance}</SectionLabel>
        <Card padding="none" style={styles.card}>
          <View style={styles.theme}>
            <Text variant="rowTitle" style={styles.themeLabel}>
              {s.theme}
            </Text>
            <Segmented
              options={THEMES}
              value={preference}
              onChange={setPreference}
              accessibilityLabel={s.theme}
            />
          </View>
        </Card>
      </View>

      <View>
        <SectionLabel>{s.automation}</SectionLabel>
        <Card padding="none" style={styles.card}>
          <ListRow
            icon="message-square"
            title={s.smsTracking}
            subtitle={s.smsTrackingHint}
            trailing={
              <Switch
                value={smsTracking}
                onValueChange={setSmsTracking}
                accessibilityLabel={s.smsTracking}
              />
            }
          />
          <ListRow
            icon="smartphone"
            title={s.bankSenders}
            subtitle={s.bankSendersHint}
            value={s.manage}
            chevron
          />
          <ListRow icon="sparkles" title={s.rules} subtitle={s.rulesHint} value={s.edit} chevron />
          <ListRow
            icon="coins"
            title={s.currency}
            value={s.currencyValue}
            chevron
            divider={false}
          />
        </Card>
      </View>

      <View>
        <SectionLabel>{s.data}</SectionLabel>
        <Card padding="none" style={styles.card}>
          <ListRow icon="download" title={s.export} subtitle={s.exportHint} chevron />
          <ListRow icon="cloud" title={s.backup} chevron divider={false} />
        </Card>
      </View>

      <View>
        <SectionLabel>{s.security}</SectionLabel>
        <Card padding="none" style={styles.card}>
          <ListRow
            icon="lock"
            title={s.appLock}
            subtitle={s.appLockHint}
            divider={false}
            trailing={
              <Switch value={appLock} onValueChange={setAppLock} accessibilityLabel={s.appLock} />
            }
          />
        </Card>
      </View>

      <View>
        <SectionLabel>{s.about}</SectionLabel>
        <Card padding="none" style={styles.card}>
          <ListRow icon="shield-check" title={s.privacy} subtitle={s.privacyHint} chevron />
          <ListRow icon="info" title={s.help} chevron />
          <ListRow icon="sparkles" title={s.version} value={s.versionValue} divider={false} />
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { paddingVertical: 2, paddingHorizontal: spacing.lg },
  theme: { paddingVertical: 14 },
  themeLabel: { marginBottom: 10 },
});
