import { fireEvent, screen } from '@testing-library/react-native';

import { SmsAccessScreen } from '@/features/sms-access/sms-access-screen';
import { mockRouter } from '@/test/mock-router';
import { renderWithTheme } from '@/test/render-with-theme';

describe('SmsAccessScreen', () => {
  beforeEach(() => jest.clearAllMocks());

  it('lists what the permission does and does not do', async () => {
    await renderWithTheme(<SmsAccessScreen />);
    expect(screen.getByText('Parsed on your phone, never uploaded')).toBeTruthy();
    expect(screen.getByText('Only messages from your banks are read')).toBeTruthy();
  });

  it('continues to the dashboard whether or not access is allowed', async () => {
    await renderWithTheme(<SmsAccessScreen />);
    await fireEvent.press(screen.getByRole('button', { name: 'Allow SMS access' }));
    await fireEvent.press(
      screen.getByRole('button', { name: 'Skip, I will add expenses manually' }),
    );
    expect(mockRouter.replace).toHaveBeenCalledTimes(2);
    expect(mockRouter.replace).toHaveBeenCalledWith('/home');
  });

  it('has a labelled back button', async () => {
    await renderWithTheme(<SmsAccessScreen />);
    await fireEvent.press(screen.getByRole('button', { name: 'Back' }));
    expect(mockRouter.back).toHaveBeenCalled();
  });
});
