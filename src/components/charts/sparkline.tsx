import { useState } from 'react';
import { View, type LayoutChangeEvent } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { charts } from '@/theme/salli-theme';
import { monotonePath } from '@/utils/monotone-path';

type SparklineProps = {
  data: readonly number[];
  stroke: string;
  /** Translucent fill under the line. */
  area: string;
  accessibilityLabel: string;
  height?: number;
};

const STROKE = charts.line.current - 1; // 2.5, as in the hero card
const END_DOT_RADIUS = 5;
const PADDING = 8;

/** Fills its parent's width. Draw-in animation and reduce-motion handling arrive with the charts milestone. */
export function Sparkline({ data, stroke, area, accessibilityLabel, height = 70 }: SparklineProps) {
  const [width, setWidth] = useState(0);
  const onLayout = (event: LayoutChangeEvent) => setWidth(event.nativeEvent.layout.width);

  const min = Math.min(...data);
  const span = Math.max(...data) - min || 1;
  const step = data.length > 1 ? width / (data.length - 1) : 0;
  const points = data.map((value, i) => ({
    x: i * step,
    y: PADDING + (1 - (value - min) / span) * (height - PADDING * 2),
  }));
  const line = monotonePath(points);
  const last = points[points.length - 1];

  return (
    <View
      onLayout={onLayout}
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
    >
      {width > 0 && last ? (
        <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <Path d={`${line} L${width},${height} L0,${height} Z`} fill={area} />
          <Path d={line} fill="none" stroke={stroke} strokeWidth={STROKE} strokeLinecap="round" />
          <Circle cx={last.x} cy={last.y} r={END_DOT_RADIUS} fill={stroke} />
        </Svg>
      ) : (
        <View style={{ height }} />
      )}
    </View>
  );
}
