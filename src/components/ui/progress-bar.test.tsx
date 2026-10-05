import { screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

import { ProgressBar } from '@/components/ui/progress-bar';
import { categories, palette } from '@/theme/salli-theme';
import { renderWithTheme } from '@/test/render-with-theme';

function fillStyle() {
  return StyleSheet.flatten(screen.getByTestId('progress-fill').props.style);
}

describe('ProgressBar', () => {
  it('fills with the category color below 90%', async () => {
    await renderWithTheme(<ProgressBar value={0.5} categoryId="food" />);
    expect(fillStyle().backgroundColor).toBe(categories.food.light);
    expect(fillStyle().width).toBe('50%');
  });

  it('switches fill and label to warning at 90% or more', async () => {
    await renderWithTheme(
      <ProgressBar value={0.9} categoryId="bills" label="Bills" valueLabel="Rs 15,300 / 16,000" />,
    );
    expect(fillStyle().backgroundColor).toBe(palette.light.warning);
    expect(StyleSheet.flatten(screen.getByText('Rs 15,300 / 16,000').props.style).color).toBe(
      palette.light.warning,
    );
  });

  it('clamps overspent budgets to a full bar but keeps the warning', async () => {
    await renderWithTheme(<ProgressBar value={1.4} categoryId="food" />);
    expect(fillStyle().width).toBe('100%');
    expect(fillStyle().backgroundColor).toBe(palette.light.warning);
  });

  it('exposes progress to assistive tech', async () => {
    await renderWithTheme(
      <ProgressBar
        value={0.82}
        categoryId="food"
        label="Food & Dining"
        valueLabel="Rs 24,600 / 30,000"
      />,
    );
    expect(screen.getByRole('progressbar', { name: 'Food & Dining' })).toHaveProp(
      'accessibilityValue',
      { min: 0, max: 100, now: 82, text: 'Rs 24,600 / 30,000' },
    );
  });
});
