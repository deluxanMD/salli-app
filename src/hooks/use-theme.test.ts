import { renderHook } from '@testing-library/react-native';

import { Colors } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

jest.mock('@/hooks/use-color-scheme');

const mockUseColorScheme = jest.mocked(useColorScheme);

describe('useTheme', () => {
  it('returns light colors for the light scheme', async () => {
    mockUseColorScheme.mockReturnValue('light');

    expect((await renderHook(() => useTheme())).result.current).toBe(Colors.light);
  });

  it('returns dark colors for the dark scheme', async () => {
    mockUseColorScheme.mockReturnValue('dark');

    expect((await renderHook(() => useTheme())).result.current).toBe(Colors.dark);
  });

  it('falls back to light colors when the scheme is unspecified', async () => {
    mockUseColorScheme.mockReturnValue('unspecified');

    expect((await renderHook(() => useTheme())).result.current).toBe(Colors.light);
  });
});
