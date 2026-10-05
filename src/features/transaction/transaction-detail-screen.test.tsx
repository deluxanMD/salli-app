import { fireEvent, screen } from '@testing-library/react-native';

import { TransactionDetailScreen } from '@/features/transaction/transaction-detail-screen';
import { mockRouter, mockSearchParams } from '@/test/mock-router';
import { renderWithTheme } from '@/test/render-with-theme';

describe('TransactionDetailScreen', () => {
  beforeEach(() => jest.clearAllMocks());

  it('shows an SMS-created expense with its category, message and rule switch', async () => {
    mockSearchParams.id = 't1';
    await renderWithTheme(<TransactionDetailScreen />);
    expect(screen.getByText('−Rs 4,820.00')).toBeTruthy();
    expect(screen.getAllByText('Groceries').length).toBeGreaterThan(0);
    expect(screen.getByText('30 Sep 2026, 6:42 PM')).toBeTruthy();
    expect(
      screen.getByText('Rs 4,820.00 debited at KEELLS SUPER from card ending 1234.'),
    ).toBeTruthy();
    expect(screen.getByRole('switch', { name: 'Always categorise this merchant' })).toBeChecked();
  });

  it('lets the merchant rule be switched off', async () => {
    mockSearchParams.id = 't1';
    await renderWithTheme(<TransactionDetailScreen />);
    await fireEvent.press(screen.getByRole('switch', { name: 'Always categorise this merchant' }));
    expect(
      screen.getByRole('switch', { name: 'Always categorise this merchant' }),
    ).not.toBeChecked();
  });

  it('shows the needs-category state without a rule switch', async () => {
    mockSearchParams.id = 't6';
    await renderWithTheme(<TransactionDetailScreen />);
    expect(screen.getAllByText('Needs a category').length).toBeGreaterThan(0);
    expect(screen.queryByRole('switch')).toBeNull();
  });

  it('shows income in the success color with a plus sign', async () => {
    mockSearchParams.id = 't3';
    await renderWithTheme(<TransactionDetailScreen />);
    expect(screen.getByText('+Rs 185,000.00')).toBeTruthy();
  });

  it('handles an unknown id', async () => {
    mockSearchParams.id = 'nope';
    await renderWithTheme(<TransactionDetailScreen />);
    expect(screen.getByText('This transaction no longer exists.')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Back' }));
    expect(mockRouter.back).toHaveBeenCalled();
  });
});
