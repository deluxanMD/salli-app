import { withAlpha } from '@/theme/color';

describe('withAlpha', () => {
  it('converts a hex color to rgba with the given opacity', () => {
    expect(withAlpha('#F97316', 0.15)).toBe('rgba(249,115,22,0.15)');
    expect(withAlpha('#FFFFFF', 0.18)).toBe('rgba(255,255,255,0.18)');
  });
});
