import { fireEvent, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

import { SettingsScreen } from '@/features/settings/settings-screen';
import { renderWithTheme } from '@/test/render-with-theme';
import { palette } from '@/theme/salli-theme';

describe('SettingsScreen', () => {
  it('switches every surface to the dark tokens when Dark is chosen', async () => {
    await renderWithTheme(<SettingsScreen />);
    const title = () => StyleSheet.flatten(screen.getByText('Settings').props.style);
    expect(title().color).toBe(palette.light.text);

    await fireEvent.press(screen.getByRole('tab', { name: 'Dark' }));

    expect(title().color).toBe(palette.dark.text);
    expect(screen.getByRole('tab', { name: 'Dark' })).toBeSelected();
  });

  it('shows every group and the switches', async () => {
    await renderWithTheme(<SettingsScreen />);
    for (const label of ['APPEARANCE', 'AUTOMATION', 'DATA', 'SECURITY', 'ABOUT']) {
      expect(screen.getByText(label)).toBeTruthy();
    }
    expect(screen.getByRole('switch', { name: 'SMS auto-tracking' })).toBeChecked();
    await fireEvent.press(screen.getByRole('switch', { name: 'App lock' }));
    expect(screen.getByRole('switch', { name: 'App lock' })).not.toBeChecked();
  });

  it('describes privacy as on-device processing, never end-to-end encryption', async () => {
    await renderWithTheme(<SettingsScreen />);
    expect(screen.getByText('Messages are parsed on your device')).toBeTruthy();
    expect(screen.queryByText(/end-to-end/i)).toBeNull();
  });
});
