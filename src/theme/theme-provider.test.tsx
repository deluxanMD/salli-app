import { act, render, renderHook } from '@testing-library/react-native';
import * as ReactNative from 'react-native';
import { Text } from 'react-native';

import { palette } from '@/theme/salli-theme';
import { ThemeProvider, useTheme, useThemePreference } from '@/theme/theme-provider';

function wrapper(initialPreference: 'light' | 'dark' | 'system') {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <ThemeProvider initialPreference={initialPreference}>{children}</ThemeProvider>;
  };
}

describe('ThemeProvider', () => {
  afterEach(() => jest.restoreAllMocks());

  it('serves the light tokens in light mode', async () => {
    const { result } = await renderHook(() => useTheme(), { wrapper: wrapper('light') });
    expect(result.current.mode).toBe('light');
    expect(result.current.colors.background).toBe(palette.light.background);
  });

  it('serves the dark tokens in dark mode, including category colors', async () => {
    const { result } = await renderHook(() => useTheme(), { wrapper: wrapper('dark') });
    expect(result.current.colors.surface).toBe(palette.dark.surface);
    expect(result.current.categoryColor('food')).toBe('#FB923C');
  });

  it('follows the system scheme in system mode', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('dark');
    const { result } = await renderHook(() => useTheme(), { wrapper: wrapper('system') });
    expect(result.current.mode).toBe('dark');
  });

  it('falls back to light when the system has no preference', async () => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('unspecified');
    const { result } = await renderHook(() => useTheme(), { wrapper: wrapper('system') });
    expect(result.current.mode).toBe('light');
  });

  it('switches mode when the preference changes', async () => {
    const { result } = await renderHook(() => ({ theme: useTheme(), pref: useThemePreference() }), {
      wrapper: wrapper('light'),
    });
    await act(async () => result.current.pref.setPreference('dark'));
    expect(result.current.theme.mode).toBe('dark');
    expect(result.current.pref.preference).toBe('dark');
  });

  it('throws when used outside the provider', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    function Probe() {
      useTheme();
      return <Text>x</Text>;
    }
    await expect(render(<Probe />)).rejects.toThrow('ThemeProvider');
  });
});
