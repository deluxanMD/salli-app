import { categories, formatRs, getTheme, palette } from '@/theme/salli-theme';

describe('formatRs', () => {
  it('formats the documented examples', () => {
    expect(formatRs(4820, { decimals: 2 })).toBe('Rs 4,820.00');
    expect(formatRs(-4820, { decimals: 2 })).toBe('−Rs 4,820.00');
    expect(formatRs(185000, { signed: true })).toBe('+Rs 185,000');
    expect(formatRs(8400, { compact: true })).toBe('Rs 8.4k');
  });

  it('uses whole rupees by default and comma grouping', () => {
    expect(formatRs(87350)).toBe('Rs 87,350');
    expect(formatRs(0)).toBe('Rs 0');
  });

  it('uses U+2212 for negatives, never a hyphen', () => {
    expect(formatRs(-1)).not.toContain('-');
    expect(formatRs(-1).charCodeAt(0)).toBe(0x2212);
  });
});

describe('getTheme', () => {
  it('returns mode-specific colors and category colors', () => {
    expect(getTheme('dark').colors).toBe(palette.dark);
    expect(getTheme('light').categoryColor('bills')).toBe(categories.bills.light);
    expect(getTheme('dark').categoryColor('bills')).toBe(categories.bills.dark);
  });
});
