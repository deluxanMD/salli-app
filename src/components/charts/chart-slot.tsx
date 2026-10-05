import { View } from 'react-native';

type ChartSlotProps = {
  width?: number;
  height: number;
  accessibilityLabel: string;
};

/**
 * Reserves a chart's exact footprint from Build spec 3 so layouts match the canvas.
 * The charts milestone replaces this with the real react-native-svg chart.
 */
export function ChartSlot({ width, height, accessibilityLabel }: ChartSlotProps) {
  return (
    <View
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
      style={{ width, height }}
    />
  );
}
