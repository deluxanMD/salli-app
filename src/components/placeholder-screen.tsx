import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/text';
import { en } from '@/i18n/en';
import { layout, spacing } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

/** Stand-in body for tabs until their screens are built (milestone 2). */
export function PlaceholderScreen({ title }: { title: string }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.screen,
        { backgroundColor: colors.background, paddingTop: insets.top + spacing.lg },
      ]}
    >
      <Text variant="title" accessibilityRole="header">
        {title}
      </Text>
      <Text color="textMuted">{en.placeholders.comingSoon}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: layout.screenPadding, gap: spacing.sm },
});
