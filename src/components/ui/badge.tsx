import { StyleSheet, View } from 'react-native';

import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { en } from '@/i18n/en';
import { radius, spacing } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

type BadgeProps = {
  /** `auto` marks rows created from SMS; `review` marks rows that need a category. */
  variant: 'auto' | 'review';
};

const AUTO_ICON_SIZE = 10;

export function Badge({ variant }: BadgeProps) {
  const { colors } = useTheme();
  const isAuto = variant === 'auto';
  const textColor = isAuto ? colors.primaryText : colors.warning;

  return (
    <View
      accessible
      accessibilityLabel={isAuto ? en.badges.auto : en.badges.review}
      style={[styles.base, { backgroundColor: isAuto ? colors.primarySoft : colors.warningSoft }]}
    >
      {isAuto ? (
        <Icon name="sparkles" size={AUTO_ICON_SIZE} color={textColor} strokeWidth={2.2} />
      ) : null}
      <Text variant="micro" style={{ color: textColor }}>
        {isAuto ? en.badges.auto : en.badges.review}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 3,
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.pill,
  },
});
