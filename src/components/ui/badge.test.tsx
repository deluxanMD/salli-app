import { screen } from '@testing-library/react-native';

import { Badge } from '@/components/ui/badge';
import { renderWithTheme } from '@/test/render-with-theme';

describe('Badge', () => {
  it('labels the auto badge', async () => {
    await renderWithTheme(<Badge variant="auto" />);
    expect(screen.getByText('Auto')).toBeTruthy();
  });

  it('labels the review badge', async () => {
    await renderWithTheme(<Badge variant="review" />);
    expect(screen.getByText('Review')).toBeTruthy();
  });
});
