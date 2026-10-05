import { screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

import { Text } from '@/components/ui/text';
import { palette, typography } from '@/theme/salli-theme';
import { renderWithTheme } from '@/test/render-with-theme';

describe('Text', () => {
  it('applies the type scale entry and theme color', async () => {
    await renderWithTheme(<Text variant="title">Overview</Text>);
    const node = screen.getByText('Overview');
    expect(StyleSheet.flatten(node.props.style)).toMatchObject({
      fontFamily: typography.title.fontFamily,
      fontSize: 28,
      color: palette.light.text,
    });
  });

  it('never sets fontWeight', async () => {
    await renderWithTheme(<Text variant="amount">Rs 1</Text>);
    expect(StyleSheet.flatten(screen.getByText('Rs 1').props.style)).not.toHaveProperty(
      'fontWeight',
    );
  });

  it('caps text scaling at 130%', async () => {
    await renderWithTheme(<Text>Scales</Text>);
    expect(screen.getByText('Scales')).toHaveProp('maxFontSizeMultiplier', 1.3);
  });

  it('uses tabular numbers for amounts', async () => {
    await renderWithTheme(<Text variant="amount">Rs 1</Text>);
    expect(StyleSheet.flatten(screen.getByText('Rs 1').props.style).fontVariant).toEqual([
      'tabular-nums',
    ]);
  });
});
