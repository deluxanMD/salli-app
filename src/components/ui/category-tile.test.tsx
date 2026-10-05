import { screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

import { CategoryTile } from '@/components/ui/category-tile';
import { palette } from '@/theme/salli-theme';
import { renderWithTheme } from '@/test/render-with-theme';

function tileStyle() {
  return StyleSheet.flatten(screen.getByTestId('tile').props.style);
}

describe('CategoryTile', () => {
  it('rounds to 34% of its size and tints at 15% opacity', async () => {
    await renderWithTheme(<CategoryTile testID="tile" categoryId="food" size="md" />);
    expect(tileStyle()).toMatchObject({
      width: 44,
      height: 44,
      borderRadius: 15,
      backgroundColor: 'rgba(249,115,22,0.15)',
    });
  });

  it('uses the dark category color in dark mode', async () => {
    await renderWithTheme(<CategoryTile testID="tile" categoryId="food" size="lg" />, 'dark');
    expect(tileStyle()).toMatchObject({ width: 56, backgroundColor: 'rgba(251,146,60,0.15)' });
  });

  it('uses the warning tile when the transaction needs review', async () => {
    await renderWithTheme(<CategoryTile testID="tile" categoryId="shopping" needsReview />);
    expect(tileStyle().backgroundColor).toBe(palette.light.warningSoft);
  });
});
