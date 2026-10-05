import type { ReactNode } from 'react';
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { motion } from '@/theme/salli-theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type PressableScaleProps = Omit<PressableProps, 'style' | 'children'> & {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

/** Pressable with the spec's press feedback: opacity .85 and scale .98 over 120 ms. */
export function PressableScale({
  style,
  children,
  onPressIn,
  onPressOut,
  ...rest
}: PressableScaleProps) {
  const pressed = useSharedValue(0);
  const animated = useAnimatedStyle(() => ({
    opacity: 1 - pressed.value * (1 - motion.pressOpacity),
    transform: [{ scale: 1 - pressed.value * (1 - motion.pressScale) }],
  }));

  return (
    <AnimatedPressable
      {...rest}
      onPressIn={(event) => {
        pressed.value = withTiming(1, { duration: motion.pressMs });
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        pressed.value = withTiming(0, { duration: motion.pressMs });
        onPressOut?.(event);
      }}
      style={[style, animated]}
    >
      {children}
    </AnimatedPressable>
  );
}
