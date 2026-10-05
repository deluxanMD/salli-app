import { createContext, useContext, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { getTheme, type ThemeMode } from '@/theme/salli-theme';

export type ThemePreference = ThemeMode | 'system';

export type Theme = ReturnType<typeof getTheme>;

type ThemeContextValue = {
  /** The user's choice: light, dark or follow the system. */
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
  /** The resolved tokens for the active mode. */
  theme: Theme;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  children,
  initialPreference = 'system',
}: {
  children: ReactNode;
  initialPreference?: ThemePreference;
}) {
  const system = useColorScheme();
  const [preference, setPreference] = useState<ThemePreference>(initialPreference);
  const mode: ThemeMode =
    preference === 'system' ? (system === 'dark' ? 'dark' : 'light') : preference;

  return (
    <ThemeContext.Provider value={{ preference, setPreference, theme: getTheme(mode) }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useThemeContext(): ThemeContextValue {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be used inside <ThemeProvider>');
  return value;
}

export function useTheme(): Theme {
  return useThemeContext().theme;
}

export function useThemePreference(): Pick<ThemeContextValue, 'preference' | 'setPreference'> {
  const { preference, setPreference } = useThemeContext();
  return { preference, setPreference };
}
