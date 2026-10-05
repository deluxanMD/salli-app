import { screen } from '@testing-library/react-native';

import { HeroCard } from '@/components/ui/hero-card';
import { renderWithTheme } from '@/test/render-with-theme';

describe('HeroCard', () => {
  it('shows the month, delta and whole-rupee totals', async () => {
    await renderWithTheme(
      <HeroCard
        monthLabel="September"
        previousMonthLabel="Aug"
        spent={87350}
        income={185000}
        netSaved={97650}
        deltaPercent={-5.2}
        trend={[0, 10, 25, 40, 60, 87]}
      />,
    );
    expect(screen.getByText('Spent in September')).toBeTruthy();
    expect(screen.getByText('5.2% vs Aug')).toBeTruthy();
    expect(screen.getByText('Rs 87,350')).toBeTruthy();
    expect(screen.getByText('Rs 185,000')).toBeTruthy();
    expect(screen.getByText('Rs 97,650')).toBeTruthy();
    expect(screen.getByLabelText('Cumulative spending this month')).toBeTruthy();
  });
});
