// Salli design tokens. Mirrors the "Build spec" artboards in the design canvas.
// Fonts: npx expo install @expo-google-fonts/dm-sans expo-font

export type ThemeMode = 'light' | 'dark';

export const palette = {
  light: {
    background: '#F5F6FB',
    surface: '#FFFFFF',
    surfaceAlt: '#F0F2F9',
    border: '#E4E7F1',
    text: '#0F172A',
    textMuted: '#5B6578',
    primary: '#4F46E5',
    onPrimary: '#FFFFFF',
    primaryText: '#4F46E5',
    primarySoft: '#EEF0FF',
    hero: '#4F46E5',
    success: '#14B8A6',
    successText: '#0F766E',
    successSoft: '#DDF4F1',
    warning: '#B45309',
    warningSoft: '#FEF3C7',
    danger: '#DC2626',
    track: '#E8EBF5',
    chart: '#4F46E5',
    chartMuted: '#C9CDF7',
    toggleOff: '#C5CADB',
  },
  dark: {
    background: '#0B0D17',
    surface: '#151826',
    surfaceAlt: '#1C2033',
    border: '#262B40',
    text: '#F1F3FA',
    textMuted: '#98A2B8',
    primary: '#4F46E5',
    onPrimary: '#FFFFFF',
    primaryText: '#A5ABFF',
    primarySoft: '#22264A',
    hero: '#4338CA',
    success: '#2DD4BF',
    successText: '#2DD4BF',
    successSoft: '#12312F',
    warning: '#FBBF24',
    warningSoft: '#3A2E0F',
    danger: '#F87171',
    track: '#262B40',
    chart: '#8B93FF',
    chartMuted: '#343A66',
    toggleOff: '#3A4060',
  },
} as const;

export type Palette = { [K in keyof typeof palette.light]: string };

export type CategoryId =
  'food' | 'groceries' | 'transport' | 'bills' | 'shopping' | 'entertainment' | 'health' | 'income';

export const categories: Record<
  CategoryId,
  { label: string; shortLabel: string; icon: string; light: string; dark: string }
> = {
  food: {
    label: 'Food & Dining',
    shortLabel: 'Food',
    icon: 'utensils',
    light: '#F97316',
    dark: '#FB923C',
  },
  groceries: {
    label: 'Groceries',
    shortLabel: 'Groceries',
    icon: 'shopping-cart',
    light: '#22C55E',
    dark: '#4ADE80',
  },
  transport: {
    label: 'Transport',
    shortLabel: 'Transport',
    icon: 'car',
    light: '#3B82F6',
    dark: '#60A5FA',
  },
  bills: {
    label: 'Bills & Utilities',
    shortLabel: 'Bills',
    icon: 'zap',
    light: '#8B5CF6',
    dark: '#A78BFA',
  },
  shopping: {
    label: 'Shopping',
    shortLabel: 'Shopping',
    icon: 'shopping-bag',
    light: '#EC4899',
    dark: '#F472B6',
  },
  entertainment: {
    label: 'Entertainment',
    shortLabel: 'Entertainment',
    icon: 'film',
    light: '#F59E0B',
    dark: '#FBBF24',
  },
  health: {
    label: 'Health',
    shortLabel: 'Health',
    icon: 'heart',
    light: '#06B6D4',
    dark: '#22D3EE',
  },
  income: {
    label: 'Income',
    shortLabel: 'Income',
    icon: 'trending-up',
    light: '#14B8A6',
    dark: '#2DD4BF',
  },
};

export const fontFamily = {
  regular: 'DMSans_400Regular',
  medium: 'DMSans_500Medium',
  semibold: 'DMSans_600SemiBold',
  bold: 'DMSans_700Bold',
  extrabold: 'DMSans_800ExtraBold',
} as const;

// Never set fontWeight in React Native; pick the font file instead.
export const typography = {
  display: { fontFamily: fontFamily.extrabold, fontSize: 40, lineHeight: 44, letterSpacing: -1 },
  title: { fontFamily: fontFamily.extrabold, fontSize: 28, lineHeight: 34, letterSpacing: -0.6 },
  heading: { fontFamily: fontFamily.bold, fontSize: 17, lineHeight: 22, letterSpacing: -0.2 },
  button: { fontFamily: fontFamily.bold, fontSize: 16, lineHeight: 20 },
  body: { fontFamily: fontFamily.medium, fontSize: 15, lineHeight: 22 },
  rowTitle: { fontFamily: fontFamily.semibold, fontSize: 15, lineHeight: 20 },
  amount: {
    fontFamily: fontFamily.bold,
    fontSize: 15,
    lineHeight: 20,
    fontVariant: ['tabular-nums'] as const,
  },
  small: { fontFamily: fontFamily.semibold, fontSize: 13, lineHeight: 18 },
  caption: { fontFamily: fontFamily.medium, fontSize: 12, lineHeight: 16 },
  micro: { fontFamily: fontFamily.bold, fontSize: 11, lineHeight: 14 },
} as const;

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 } as const;
export const layout = { screenPadding: 20, sectionGap: 20, cardPadding: 16 } as const;

export const radius = {
  button: 16,
  input: 16,
  card: 20,
  hero: 28,
  sheet: 28,
  pill: 999,
  tile: (size: number) => Math.round(size * 0.34),
} as const;

export const sizes = {
  minTouch: 44,
  button: 52,
  input: 48,
  chip: 40,
  segment: 40,
  switch: { width: 48, height: 28, knob: 22 },
  categoryTile: { sm: 40, md: 44, lg: 56 },
  tabItem: { minWidth: 64, minHeight: 48, pillWidth: 52, pillHeight: 30 },
  icon: { row: 20, button: 18, tile: 22 },
} as const;

export const elevation = {
  light: {
    card: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.05,
      shadowRadius: 18,
      elevation: 2,
    },
  },
  dark: { card: {} },
} as const;

export const charts = {
  donut: { size: 160, radius: 62, stroke: 18, gap: 3 },
  bar: { width: 32, radius: 9, labelSize: 12 },
  line: { current: 3.5, comparison: 2.5, dash: [5, 5] as const, pointRadius: 5, pointStroke: 2.5 },
  gauge: { radius: 80, stroke: 16 },
  progress: { height: 8, warnAt: 0.9 },
  drawInMs: 600,
} as const;

export const motion = { pressMs: 120, pressScale: 0.98, pressOpacity: 0.85 } as const;

export function getTheme(mode: ThemeMode) {
  return {
    mode,
    colors: palette[mode] as Palette,
    categoryColor: (id: CategoryId) => categories[id][mode],
    cardShadow: elevation[mode].card,
  };
}

// Money formatting. Do not rely on the device locale.
//   formatRs(4820, { decimals: 2 })            -> "Rs 4,820.00"
//   formatRs(-4820, { decimals: 2 })           -> "−Rs 4,820.00"   (U+2212)
//   formatRs(185000, { signed: true })         -> "+Rs 185,000"
//   formatRs(8400, { compact: true })          -> "Rs 8.4k"
export function formatRs(
  value: number,
  opts: { decimals?: 0 | 2; signed?: boolean; compact?: boolean } = {},
): string {
  const { decimals = 0, signed = false, compact = false } = opts;
  const abs = Math.abs(value);
  let body: string;
  if (compact && abs >= 1000) {
    const k = abs / 1000;
    body = `${k >= 100 ? Math.round(k) : Math.round(k * 10) / 10}k`;
  } else {
    const [int, frac] = abs.toFixed(decimals).split('.');
    body = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (frac ? `.${frac}` : '');
  }
  const sign = value < 0 ? '\u2212' : signed && value > 0 ? '+' : '';
  return `${sign}Rs ${body}`;
}
