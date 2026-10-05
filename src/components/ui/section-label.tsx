import { Text } from '@/components/ui/text';
import { spacing } from '@/theme/salli-theme';

/** Uppercase group label (WED, 30 SEP / APPEARANCE). */
export function SectionLabel({ children }: { children: string }) {
  return (
    <Text
      variant="sectionLabel"
      color="textMuted"
      accessibilityRole="header"
      style={{ marginHorizontal: spacing.xs, marginBottom: spacing.sm }}
    >
      {children}
    </Text>
  );
}
