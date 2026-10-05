import { fireEvent, screen } from '@testing-library/react-native';

import { InsightsScreen } from '@/features/insights/insights-screen';
import { renderWithTheme } from '@/test/render-with-theme';

describe('InsightsScreen', () => {
  it('starts on Month and switches period', async () => {
    await renderWithTheme(<InsightsScreen />);
    expect(screen.getByRole('tab', { name: 'Month' })).toBeSelected();
    await fireEvent.press(screen.getByRole('tab', { name: 'Week' }));
    expect(screen.getByRole('tab', { name: 'Week' })).toBeSelected();
  });

  it('lists top merchants and highlights', async () => {
    await renderWithTheme(<InsightsScreen />);
    expect(screen.getByText('Rs 14,300')).toBeTruthy();
    expect(
      screen.getByText('Food & Dining is your biggest category, at 28% of spending.'),
    ).toBeTruthy();
  });

  it('labels each chart for assistive tech', async () => {
    await renderWithTheme(<InsightsScreen />);
    expect(screen.getByLabelText('Cumulative spending, this month versus last month')).toBeTruthy();
    expect(screen.getByLabelText('Monthly spending, last 6 months')).toBeTruthy();
  });
});
