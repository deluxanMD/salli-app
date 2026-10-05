import { StyleSheet, View } from 'react-native';

import { Icon, type IconName } from '@/components/ui/icon';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Text } from '@/components/ui/text';
import { extraRadius, extraSizes } from '@/theme/canvas-extras';
import { radius, sizes, spacing } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

type BannerProps = {
  /** `warning` is a bare icon on warningSoft; `info` is a 36 px icon tile on primarySoft. */
  tone: 'warning' | 'info';
  icon: IconName;
  title: string;
  subtitle: string;
  actionLabel?: string;
  onActionPress?: () => void;
  /** Makes the whole banner tappable (shows a chevron when there is no action button). */
  onPress?: () => void;
};

const TILE = 36;

export function Banner({
  tone,
  icon,
  title,
  subtitle,
  actionLabel,
  onActionPress,
  onPress,
}: BannerProps) {
  const { colors } = useTheme();
  const isWarning = tone === 'warning';

  const content = (
    <>
      {isWarning ? (
        <Icon name={icon} size={22} color={colors.warning} />
      ) : (
        <View style={[styles.tile, { backgroundColor: colors.primary }]}>
          <Icon name={icon} size={17} color={colors.onPrimary} />
        </View>
      )}
      <View style={styles.copy}>
        <Text variant="label" style={{ color: isWarning ? colors.warning : colors.text }}>
          {title}
        </Text>
        <Text variant="caption" color="textMuted">
          {subtitle}
        </Text>
      </View>
      {actionLabel ? (
        <PressableScale
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
          hitSlop={{ top: 2, bottom: 2 }}
          onPress={onActionPress ?? onPress}
          style={[styles.action, { backgroundColor: colors.warning }]}
        >
          <Text variant="smallBold" style={{ color: colors.warningSoft }}>
            {actionLabel}
          </Text>
        </PressableScale>
      ) : onPress ? (
        <Icon name="chevron-right" size={sizes.icon.button} color={colors.textMuted} />
      ) : null}
    </>
  );

  const container = [
    styles.base,
    { backgroundColor: isWarning ? colors.warningSoft : colors.primarySoft },
  ];

  if (onPress && !actionLabel) {
    return (
      <PressableScale
        accessibilityRole="button"
        accessibilityLabel={`${title}. ${subtitle}`}
        onPress={onPress}
        style={container}
      >
        {content}
      </PressableScale>
    );
  }

  return <View style={container}>{content}</View>;
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: extraRadius.banner,
    paddingVertical: spacing.md,
    paddingHorizontal: 14,
  },
  tile: {
    width: TILE,
    height: TILE,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copy: { flex: 1, gap: 2 },
  action: {
    minHeight: extraSizes.bannerAction,
    paddingHorizontal: 14,
    borderRadius: extraRadius.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
