import { fireEvent, screen } from '@testing-library/react-native';
import type { BottomTabBarProps } from 'expo-router/js-tabs';

import { TabBar } from '@/components/ui/tab-bar';
import { renderWithTheme } from '@/test/render-with-theme';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

const NAMES = ['index', 'activity', 'insights', 'budgets', 'settings'];

function props(activeIndex: number) {
  const navigation = {
    emit: jest.fn(() => ({ defaultPrevented: false })),
    navigate: jest.fn(),
  };
  const state = {
    index: activeIndex,
    routes: NAMES.map((name) => ({ key: `${name}-key`, name })),
  };
  return { navigation, state } as unknown as BottomTabBarProps & {
    navigation: typeof navigation;
  };
}

describe('TabBar', () => {
  it('shows the five tabs and marks the active one', async () => {
    await renderWithTheme(<TabBar {...props(2)} />);
    for (const label of ['Home', 'Activity', 'Insights', 'Budgets', 'Settings']) {
      expect(screen.getByRole('tab', { name: label })).toBeTruthy();
    }
    expect(screen.getByRole('tab', { name: 'Insights' })).toBeSelected();
    expect(screen.getByRole('tab', { name: 'Home' })).not.toBeSelected();
  });

  it('navigates to a tab that is not active', async () => {
    const p = props(0);
    await renderWithTheme(<TabBar {...p} />);
    await fireEvent.press(screen.getByRole('tab', { name: 'Budgets' }));
    expect(p.navigation.navigate).toHaveBeenCalledWith('budgets', undefined);
  });

  it('does not navigate when the active tab is pressed again', async () => {
    const p = props(0);
    await renderWithTheme(<TabBar {...p} />);
    await fireEvent.press(screen.getByRole('tab', { name: 'Home' }));
    expect(p.navigation.navigate).not.toHaveBeenCalled();
  });
});
