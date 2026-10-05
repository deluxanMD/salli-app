import { fireEvent, screen } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';

import { Switch } from '@/components/ui/switch';
import { renderWithTheme } from '@/test/render-with-theme';

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(() => Promise.resolve()),
  ImpactFeedbackStyle: { Light: 'light' },
}));

describe('Switch', () => {
  it('exposes the checked state', async () => {
    await renderWithTheme(
      <Switch value accessibilityLabel="Auto-tracking" onValueChange={() => {}} />,
    );
    expect(screen.getByRole('switch', { name: 'Auto-tracking' })).toBeChecked();
  });

  it('toggles the value and fires a light haptic', async () => {
    const onValueChange = jest.fn();
    await renderWithTheme(
      <Switch value={false} accessibilityLabel="Auto-tracking" onValueChange={onValueChange} />,
    );
    await fireEvent.press(screen.getByRole('switch', { name: 'Auto-tracking' }));
    expect(onValueChange).toHaveBeenCalledWith(true);
    expect(Haptics.impactAsync).toHaveBeenCalledWith('light');
  });

  it('ignores presses when disabled', async () => {
    const onValueChange = jest.fn();
    await renderWithTheme(
      <Switch value={false} disabled accessibilityLabel="Locked" onValueChange={onValueChange} />,
    );
    await fireEvent.press(screen.getByRole('switch', { name: 'Locked' }));
    expect(onValueChange).not.toHaveBeenCalled();
  });
});
