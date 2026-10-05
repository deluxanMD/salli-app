import { StyleSheet, View } from 'react-native';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Text } from '@/components/ui/text';
import { sizes, spacing } from '@/theme/salli-theme';

type SectionHeaderProps = {
  title: string;
  /** Optional link on the right, e.g. "See all". */
  actionLabel?: string;
  onActionPress?: () => void;
};

const HIT_SLOP = {
  top: (sizes.minTouch - 24) / 2,
  bottom: (sizes.minTouch - 24) / 2,
  left: 8,
  right: 8,
};

/** Section title (17/700) with the 10 px gap to the content below built in. */
export function SectionHeader({ title, actionLabel, onActionPress }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <Text variant="heading" accessibilityRole="header">
        {title}
      </Text>
      {actionLabel ? (
        <PressableScale
          accessibilityRole="link"
          accessibilityLabel={actionLabel}
          hitSlop={HIT_SLOP}
          onPress={onActionPress}
        >
          <Text variant="small" color="primaryText">
            {actionLabel}
          </Text>
        </PressableScale>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm + 2,
  },
});
