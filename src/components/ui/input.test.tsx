import { fireEvent, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

import { Input } from '@/components/ui/input';
import { palette } from '@/theme/salli-theme';
import { renderWithTheme } from '@/test/render-with-theme';

describe('Input', () => {
  it('uses the primary border at 1.5 px while focused', async () => {
    await renderWithTheme(<Input accessibilityLabel="Merchant" placeholder="Merchant" />);
    const field = screen.getByPlaceholderText('Merchant');
    const container = () => StyleSheet.flatten(field.parent?.props.style);

    expect(container().borderColor).toBe(palette.light.border);
    await fireEvent(field, 'focus');
    expect(container().borderColor).toBe(palette.light.primary);
    expect(container().borderWidth).toBe(1.5);
    await fireEvent(field, 'blur');
    expect(container().borderWidth).toBe(1);
  });

  it('reports typed text', async () => {
    const onChangeText = jest.fn();
    await renderWithTheme(
      <Input accessibilityLabel="Merchant" placeholder="Merchant" onChangeText={onChangeText} />,
    );
    await fireEvent.changeText(screen.getByPlaceholderText('Merchant'), 'Keells');
    expect(onChangeText).toHaveBeenCalledWith('Keells');
  });
});
