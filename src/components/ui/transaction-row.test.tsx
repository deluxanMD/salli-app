import { fireEvent, screen } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

import { TransactionRow } from '@/components/ui/transaction-row';
import { palette } from '@/theme/salli-theme';
import { renderWithTheme } from '@/test/render-with-theme';

describe('TransactionRow', () => {
  it('formats an expense with a U+2212 minus and two decimals', async () => {
    await renderWithTheme(
      <TransactionRow
        merchant="Keells Super"
        categoryId="groceries"
        amount={-4820}
        time="6:42 PM"
        auto
      />,
    );
    expect(screen.getByText('−Rs 4,820.00')).toBeTruthy();
    expect(screen.getByText('Groceries')).toBeTruthy();
    expect(screen.getByText('Auto')).toBeTruthy();
  });

  it('shows income with a plus sign in successText', async () => {
    await renderWithTheme(
      <TransactionRow merchant="Salary" categoryId="income" amount={185000} time="9:02 AM" />,
    );
    const amount = screen.getByText('+Rs 185,000.00');
    expect(StyleSheet.flatten(amount.props.style).color).toBe(palette.light.successText);
    expect(screen.queryByText('Auto')).toBeNull();
  });

  it('asks for a category when the transaction is unfiled', async () => {
    await renderWithTheme(
      <TransactionRow
        merchant="POS 4421 MERCH"
        categoryId={null}
        amount={-3200}
        time="9:48 AM"
        auto
      />,
    );
    expect(screen.getByText('Needs a category')).toBeTruthy();
    expect(screen.getByText('Review')).toBeTruthy();
    expect(screen.queryByText('Auto')).toBeNull();
  });

  it('opens on press', async () => {
    const onPress = jest.fn();
    await renderWithTheme(
      <TransactionRow
        merchant="Uber"
        categoryId="transport"
        amount={-1250}
        time="8:10 AM"
        onPress={onPress}
      />,
    );
    await fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
