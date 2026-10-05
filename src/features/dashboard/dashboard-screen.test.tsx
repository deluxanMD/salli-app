import { fireEvent, screen } from '@testing-library/react-native';

import { DashboardScreen } from '@/features/dashboard/dashboard-screen';
import { mockRouter } from '@/test/mock-router';
import { renderWithTheme } from '@/test/render-with-theme';

describe('DashboardScreen', () => {
  beforeEach(() => jest.clearAllMocks());

  it('shows the overview totals in whole rupees', async () => {
    await renderWithTheme(<DashboardScreen />);
    expect(screen.getByText('Spent in September')).toBeTruthy();
    expect(screen.getByText('Rs 87,350')).toBeTruthy();
    expect(screen.getByText('Rs 185,000')).toBeTruthy();
    expect(screen.getByText('Sep 2026')).toBeTruthy();
  });

  it('lists category shares with percentages, not color alone', async () => {
    await renderWithTheme(<DashboardScreen />);
    expect(screen.getByText('28.2%')).toBeTruthy();
    expect(screen.getAllByText('Food & Dining').length).toBeGreaterThan(0);
  });

  it('shows recent SMS rows with whole rupees and relative time', async () => {
    await renderWithTheme(<DashboardScreen />);
    expect(screen.getByText('−Rs 4,820')).toBeTruthy();
    expect(screen.getByText('Yesterday')).toBeTruthy();
    expect(screen.queryByText('POS 4421 MERCH')).toBeNull();
  });

  it('flags budgets at 90% or more', async () => {
    await renderWithTheme(<DashboardScreen />);
    expect(screen.getByRole('progressbar', { name: 'Bills' })).toHaveProp('accessibilityValue', {
      min: 0,
      max: 100,
      now: 96,
      text: 'Rs 15,300 / 16,000',
    });
  });

  it('navigates from banner and section links', async () => {
    await renderWithTheme(<DashboardScreen />);
    await fireEvent.press(
      screen.getByRole('button', {
        name: 'Auto-tracking is on. 3 new transactions sorted from SMS',
      }),
    );
    expect(mockRouter.push).toHaveBeenCalledWith('/activity');
    await fireEvent.press(screen.getByRole('link', { name: 'Details' }));
    expect(mockRouter.push).toHaveBeenCalledWith('/insights');
  });
});
