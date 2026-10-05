import { screen } from '@testing-library/react-native';
import { StyleSheet, Text } from 'react-native';

import { Card } from '@/components/ui/card';
import { palette } from '@/theme/salli-theme';
import { renderWithTheme } from '@/test/render-with-theme';

describe('Card', () => {
  it('draws a bordered surface with radius 20 and the light shadow', async () => {
    await renderWithTheme(
      <Card testID="card">
        <Text>Inside</Text>
      </Card>,
    );
    const style = StyleSheet.flatten(screen.getByTestId('card').props.style);
    expect(style).toMatchObject({
      backgroundColor: palette.light.surface,
      borderColor: palette.light.border,
      borderWidth: 1,
      borderRadius: 20,
      padding: 16,
      shadowOpacity: 0.05,
    });
  });

  it('has no shadow in dark mode, only the border', async () => {
    await renderWithTheme(<Card testID="card" />, 'dark');
    const style = StyleSheet.flatten(screen.getByTestId('card').props.style);
    expect(style.shadowOpacity).toBeUndefined();
    expect(style.borderColor).toBe(palette.dark.border);
  });

  it('uses list padding for rows', async () => {
    await renderWithTheme(<Card testID="card" padding="list" />);
    expect(StyleSheet.flatten(screen.getByTestId('card').props.style)).toMatchObject({
      paddingVertical: 4,
      paddingHorizontal: 16,
    });
  });
});
