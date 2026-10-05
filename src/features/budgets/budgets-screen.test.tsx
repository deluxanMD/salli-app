import { screen } from '@testing-library/react-native';

import { BudgetsScreen } from '@/features/budgets/budgets-screen';
import { renderWithTheme } from '@/test/render-with-theme';

describe('BudgetsScreen', () => {
  it('shows overall spent and remaining', async () => {
    await renderWithTheme(<BudgetsScreen />);
    expect(screen.getByText('Rs 87,350')).toBeTruthy();
    expect(screen.getByText('Rs 24,650')).toBeTruthy();
    expect(screen.getByLabelText('78 percent of monthly budget used')).toBeTruthy();
  });

  it('warns only on categories at 90% or more', async () => {
    await renderWithTheme(<BudgetsScreen />);
    expect(screen.getByText('Rs 15,300 of 16,000 · Almost at limit')).toBeTruthy();
    expect(screen.getAllByText(/Almost at limit/)).toHaveLength(1);
    expect(screen.getByText('Rs 24,600 of 30,000')).toBeTruthy();
  });

  it('has a labelled add button', async () => {
    await renderWithTheme(<BudgetsScreen />);
    expect(screen.getByRole('button', { name: 'Add budget' })).toBeTruthy();
  });
});
