import { fontFamily, typography } from '@/theme/salli-theme';

/**
 * Sizes and radii that appear on the design canvas screens but are not in salli-theme.ts.
 * PROPOSAL: fold these into salli-theme.ts so the theme file stays the single source.
 */
export const extraTypography = {
  /** Brand wordmark, 20/800. */
  brand: { fontFamily: fontFamily.extrabold, fontSize: 20, lineHeight: 26, letterSpacing: -0.3 },
  /** Letter inside the brand mark, 19/800. */
  brandLetter: { fontFamily: fontFamily.extrabold, fontSize: 19, lineHeight: 24 },
  /** Welcome headline, 32/800. */
  hero: { fontFamily: fontFamily.extrabold, fontSize: 32, lineHeight: 37, letterSpacing: -0.8 },
  /** Transaction detail amount, 36/800. */
  amountLarge: {
    fontFamily: fontFamily.extrabold,
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: -1,
    fontVariant: ['tabular-nums'] as const,
  },
  /** Insights headline figure, 24/800. */
  metric: {
    fontFamily: fontFamily.extrabold,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.5,
    fontVariant: ['tabular-nums'] as const,
  },
  /** Navigation bar title, 18/700. */
  navTitle: { fontFamily: fontFamily.bold, fontSize: 18, lineHeight: 24 },
  /** Merchant name on transaction detail, 16/600. */
  merchant: { fontFamily: fontFamily.semibold, fontSize: 16, lineHeight: 22 },
  /** Lead paragraph on Welcome, 16/500. */
  lead: { fontFamily: fontFamily.medium, fontSize: 16, lineHeight: 24 },
  /** Banner title, segmented labels, 14/700. */
  label: { fontFamily: fontFamily.bold, fontSize: 14, lineHeight: 20 },
  /** Check list and highlight copy, 14/500. */
  labelMedium: { fontFamily: fontFamily.medium, fontSize: 14, lineHeight: 20 },
  /** Settings and detail rows, 14/400. */
  labelRegular: { fontFamily: fontFamily.regular, fontSize: 14, lineHeight: 20 },
  /** Budget row names, 14/600. */
  labelSemibold: { fontFamily: fontFamily.semibold, fontSize: 14, lineHeight: 20 },
  /** Sample SMS text, 13/400. */
  sms: { fontFamily: fontFamily.regular, fontSize: 13, lineHeight: 19 },
  /** Muted amounts beside a label, 13/400. */
  smallRegular: { fontFamily: fontFamily.regular, fontSize: 13, lineHeight: 18 },
  /** Bold small text such as banner actions, 13/700. */
  smallBold: { fontFamily: fontFamily.bold, fontSize: 13, lineHeight: 18 },
  /** Small caption in bold, 12/700. */
  captionBold: { fontFamily: fontFamily.bold, fontSize: 12, lineHeight: 16 },
  /** Uppercase section label, 12/700 with .5 tracking. */
  sectionLabel: {
    fontFamily: fontFamily.bold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  /** Uppercase sender label, 11/700 with .6 tracking. */
  senderLabel: { ...typography.micro, letterSpacing: 0.6 },
  /** Row time, 11/500. */
  time: { ...typography.micro, fontFamily: fontFamily.medium },
} as const;

export const extraRadius = {
  brandMark: 11,
  /** Segments, banner action buttons. */
  control: 12,
  /** Inset text blocks and 40 px tiles. */
  inset: 14,
  banner: 18,
} as const;

export const extraSizes = {
  brandMark: 34,
  listIconTile: 38,
  checkBadge: 28,
  iconButton: 44,
  bannerAction: 40,
} as const;
