import { render } from '@testing-library/react-native';
import type { ReactElement } from 'react';

import { ThemeProvider, type ThemePreference } from '@/theme/theme-provider';

/** Renders `ui` inside the ThemeProvider (light unless told otherwise). */
export function renderWithTheme(ui: ReactElement, preference: ThemePreference = 'light') {
  return render(<ThemeProvider initialPreference={preference}>{ui}</ThemeProvider>);
}
