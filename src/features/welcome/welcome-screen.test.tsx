import { fireEvent, screen } from '@testing-library/react-native';

import { WelcomeScreen } from '@/features/welcome/welcome-screen';
import { mockRouter } from '@/test/mock-router';
import { renderWithTheme } from '@/test/render-with-theme';

describe('WelcomeScreen', () => {
  beforeEach(() => jest.clearAllMocks());

  it('shows the pitch and the accurate on-device privacy wording', async () => {
    await renderWithTheme(<WelcomeScreen />);
    expect(screen.getByText('Your money, tracked on autopilot')).toBeTruthy();
    expect(screen.getByText(/never uploaded/)).toBeTruthy();
    expect(screen.queryByText(/end-to-end/i)).toBeNull();
  });

  it('goes to SMS access from Get started and Skip', async () => {
    await renderWithTheme(<WelcomeScreen />);
    await fireEvent.press(screen.getByRole('button', { name: 'Get started' }));
    expect(mockRouter.push).toHaveBeenCalledWith('/sms-access');
    await fireEvent.press(screen.getByRole('button', { name: 'Skip' }));
    expect(mockRouter.replace).toHaveBeenCalledWith('/sms-access');
  });
});
