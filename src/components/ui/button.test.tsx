import { fireEvent, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

import { Button } from '@/components/ui/button';
import { palette } from '@/theme/salli-theme';
import { renderWithTheme } from '@/test/render-with-theme';

describe('Button', () => {
  it('calls onPress and exposes its label to assistive tech', async () => {
    const onPress = jest.fn();
    await renderWithTheme(<Button label="Get started" onPress={onPress} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Get started' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('uses the primary fill and onPrimary label by default', async () => {
    await renderWithTheme(<Button label="Save" />);
    const label = StyleSheet.flatten(screen.getByText('Save').props.style);
    expect(label.color).toBe(palette.light.onPrimary);
    expect(label.fontFamily).toBe('DMSans_700Bold');
  });

  it('uses theme colors in dark mode', async () => {
    await renderWithTheme(<Button label="Soft" variant="soft" />, 'dark');
    expect(StyleSheet.flatten(screen.getByText('Soft').props.style).color).toBe(
      palette.dark.primaryText,
    );
  });

  it('renders destructive text in the danger color', async () => {
    await renderWithTheme(<Button label="Delete" variant="destructive" icon="trash-2" />);
    expect(StyleSheet.flatten(screen.getByText('Delete').props.style).color).toBe(
      palette.light.danger,
    );
  });

  it('does not fire when disabled', async () => {
    const onPress = jest.fn();
    await renderWithTheme(<Button label="Save" disabled onPress={onPress} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Save' }));
    expect(onPress).not.toHaveBeenCalled();
  });
});
