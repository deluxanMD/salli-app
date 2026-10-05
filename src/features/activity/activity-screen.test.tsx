import { fireEvent, screen } from '@testing-library/react-native';

import { ActivityScreen } from '@/features/activity/activity-screen';
import { mockRouter } from '@/test/mock-router';
import { renderWithTheme } from '@/test/render-with-theme';

describe('ActivityScreen', () => {
  beforeEach(() => jest.clearAllMocks());

  it('groups transactions under uppercase day headers, newest first', async () => {
    await renderWithTheme(<ActivityScreen />);
    expect(screen.getByText('WED, 30 SEP')).toBeTruthy();
    expect(screen.getByText('TUE, 29 SEP')).toBeTruthy();
    expect(screen.getByText('SUN, 27 SEP')).toBeTruthy();
    expect(screen.getByText('−Rs 4,820.00')).toBeTruthy();
    expect(screen.getByText('+Rs 185,000.00')).toBeTruthy();
  });

  it('warns about transactions that need a category and opens the first one', async () => {
    await renderWithTheme(<ActivityScreen />);
    expect(screen.getByText('1 transaction needs a category')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Review' }));
    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: '/transaction/[id]',
      params: { id: 't6' },
    });
  });

  it('filters by category chip', async () => {
    await renderWithTheme(<ActivityScreen />);
    await fireEvent.press(screen.getByRole('button', { name: 'Groceries' }));
    expect(screen.getByText('Cargills Food City')).toBeTruthy();
    expect(screen.queryByText('PickMe')).toBeNull();
  });

  it('searches by merchant or category', async () => {
    await renderWithTheme(<ActivityScreen />);
    await fireEvent.changeText(screen.getByLabelText('Search transactions'), 'pick');
    expect(screen.getByText('PickMe')).toBeTruthy();
    expect(screen.queryByText('Keells Super')).toBeNull();

    await fireEvent.changeText(screen.getByLabelText('Search transactions'), 'bills');
    expect(screen.getByText('Dialog Axiata')).toBeTruthy();
    expect(screen.getByText('CEB Electricity')).toBeTruthy();
  });

  it('says so when nothing matches', async () => {
    await renderWithTheme(<ActivityScreen />);
    await fireEvent.changeText(screen.getByLabelText('Search transactions'), 'zzz');
    expect(screen.getByText('No transactions match your search.')).toBeTruthy();
  });

  it('opens a transaction when its row is pressed', async () => {
    await renderWithTheme(<ActivityScreen />);
    await fireEvent.press(screen.getByRole('button', { name: /^Keells Super/ }));
    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: '/transaction/[id]',
      params: { id: 't1' },
    });
  });
});
