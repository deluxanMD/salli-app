import { fireEvent, screen } from '@testing-library/react-native';

import { Chip } from '@/components/ui/chip';
import { renderWithTheme } from '@/test/render-with-theme';

describe('Chip', () => {
  it('reports its selected state', async () => {
    await renderWithTheme(<Chip label="Food" selected />);
    expect(screen.getByRole('button', { name: 'Food' })).toBeSelected();
  });

  it('calls onPress', async () => {
    const onPress = jest.fn();
    await renderWithTheme(<Chip label="Bills" onPress={onPress} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Bills' }));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
