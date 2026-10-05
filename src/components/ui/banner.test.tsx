import { fireEvent, screen } from '@testing-library/react-native';

import { Banner } from '@/components/ui/banner';
import { renderWithTheme } from '@/test/render-with-theme';

describe('Banner', () => {
  it('shows the title, subtitle and an action button', async () => {
    const onActionPress = jest.fn();
    await renderWithTheme(
      <Banner
        tone="warning"
        icon="circle-help"
        title="1 transaction needs a category"
        subtitle="Pick one and Salli remembers it next time."
        actionLabel="Review"
        onActionPress={onActionPress}
      />,
    );
    expect(screen.getByText('1 transaction needs a category')).toBeTruthy();
    await fireEvent.press(screen.getByRole('button', { name: 'Review' }));
    expect(onActionPress).toHaveBeenCalledTimes(1);
  });

  it('is one tappable control when it navigates and has no action', async () => {
    const onPress = jest.fn();
    await renderWithTheme(
      <Banner
        tone="info"
        icon="message-square"
        title="Auto-tracking is on"
        subtitle="3 new transactions sorted from SMS"
        onPress={onPress}
      />,
    );
    await fireEvent.press(
      screen.getByRole('button', {
        name: 'Auto-tracking is on. 3 new transactions sorted from SMS',
      }),
    );
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('is not a button when it is informational only', async () => {
    await renderWithTheme(
      <Banner tone="info" icon="info" title="Heads up" subtitle="Nothing to do" />,
    );
    expect(screen.queryByRole('button')).toBeNull();
  });
});
