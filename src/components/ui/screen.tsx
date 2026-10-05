import type { ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { layout } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

type ScreenProps = {
  children: ReactNode;
  /** Tab screens sit above the tab bar, which already handles the bottom inset. */
  hasTabBar?: boolean;
};

/** Scrolling screen shell: background, 20 px padding, 20 px gap between sections, safe areas. */
export function Screen({ children, hasTabBar = false }: ScreenProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: insets.top + layout.screenPadding,
          paddingBottom: layout.screenPadding + 4 + (hasTabBar ? 0 : insets.bottom),
        },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: layout.screenPadding,
    gap: layout.sectionGap,
  },
});
