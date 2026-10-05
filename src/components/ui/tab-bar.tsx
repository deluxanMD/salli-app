import type { BottomTabBarProps } from 'expo-router/js-tabs';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, type IconName } from '@/components/ui/icon';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Text } from '@/components/ui/text';
import { en } from '@/i18n/en';
import { fontFamily, radius, sizes, spacing, typography } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

/** Route name to label and icon. Order of the tabs comes from the navigator. */
const TABS: Record<string, { label: string; icon: IconName }> = {
  index: { label: en.tabs.home, icon: 'house' },
  activity: { label: en.tabs.activity, icon: 'list' },
  insights: { label: en.tabs.insights, icon: 'pie-chart' },
  budgets: { label: en.tabs.budgets, icon: 'wallet' },
  settings: { label: en.tabs.settings, icon: 'sliders-horizontal' },
};

export function TabBar({ state, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingBottom: spacing.lg + insets.bottom,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const tab = TABS[route.name];
        if (!tab) return null;
        const focused = state.index === index;
        const tint = focused ? colors.primaryText : colors.textMuted;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
        };

        return (
          <PressableScale
            key={route.key}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: focused }}
            onPress={onPress}
            style={styles.item}
          >
            <View
              style={[
                styles.pill,
                { backgroundColor: focused ? colors.primarySoft : 'transparent' },
              ]}
            >
              <Icon name={tab.icon} size={sizes.icon.row} color={tint} />
            </View>
            <Text
              style={[styles.label, focused && styles.labelActive]}
              color={focused ? 'primaryText' : 'textMuted'}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
          </PressableScale>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  item: {
    minWidth: sizes.tabItem.minWidth,
    minHeight: sizes.tabItem.minHeight,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  pill: {
    width: sizes.tabItem.pillWidth,
    height: sizes.tabItem.pillHeight,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Spec: 11, inactive 600 and active 700.
  label: { ...typography.micro, fontFamily: fontFamily.semibold },
  labelActive: { fontFamily: fontFamily.bold },
});
