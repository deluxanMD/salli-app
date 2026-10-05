import { StyleSheet, View } from 'react-native';

import { Icon, isIconName } from '@/components/ui/icon';
import { withAlpha } from '@/theme/color';
import { categories, radius, sizes, type CategoryId } from '@/theme/salli-theme';
import { useTheme } from '@/theme/theme-provider';

export type CategoryTileSize = keyof typeof sizes.categoryTile;

type CategoryTileProps = {
  categoryId: CategoryId;
  size?: CategoryTileSize;
  /** Warning tile with a help icon, for transactions that still need a category. */
  needsReview?: boolean;
  testID?: string;
};

const TILE_FILL_OPACITY = 0.15;
const ICON_RATIO = 0.46;

export function CategoryTile({
  categoryId,
  size = 'md',
  needsReview = false,
  testID,
}: CategoryTileProps) {
  const { colors, categoryColor } = useTheme();
  const dimension = sizes.categoryTile[size];
  const iconName = categories[categoryId].icon;
  const tint = needsReview ? colors.warning : categoryColor(categoryId);

  return (
    <View
      testID={testID}
      style={[
        styles.base,
        {
          width: dimension,
          height: dimension,
          borderRadius: radius.tile(dimension),
          backgroundColor: needsReview ? colors.warningSoft : withAlpha(tint, TILE_FILL_OPACITY),
        },
      ]}
    >
      <Icon
        name={needsReview ? 'circle-help' : isIconName(iconName) ? iconName : 'info'}
        size={Math.round(dimension * ICON_RATIO)}
        color={tint}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center' },
});
