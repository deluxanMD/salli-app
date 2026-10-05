import { fireEvent, screen } from '@testing-library/react-native';

import { Segmented } from '@/components/ui/segmented';
import { renderWithTheme } from '@/test/render-with-theme';

const OPTIONS = [
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
] as const;

describe('Segmented', () => {
  it('marks only the current value as selected', async () => {
    await renderWithTheme(<Segmented options={OPTIONS} value="month" onChange={() => {}} />);
    expect(screen.getByRole('tab', { name: 'Month' })).toBeSelected();
    expect(screen.getByRole('tab', { name: 'Week' })).not.toBeSelected();
  });

  it('reports the tapped value', async () => {
    const onChange = jest.fn();
    await renderWithTheme(<Segmented options={OPTIONS} value="month" onChange={onChange} />);
    await fireEvent.press(screen.getByRole('tab', { name: 'Year' }));
    expect(onChange).toHaveBeenCalledWith('year');
  });
});
