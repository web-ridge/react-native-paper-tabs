import * as React from 'react';
import type {
  AnimatedColorArgs,
  AnimatedTextStyle,
  AnimatedViewStyle,
  IndicatorArgs,
  IndicatorReturns,
  OffsetScrollArgs,
} from './utils';
import { Animated, Platform } from 'react-native';

export function useAnimatedText({
  childrenCount,
  tabIndex,
  position,
  offset,
  textColor,
  activeColor,
}: AnimatedColorArgs): AnimatedTextStyle {
  const childrenA = Array(childrenCount).fill(undefined);
  const positionWithOffset = Animated.add(position!, offset!);
  const inputRange = childrenA.map((_, i) => i);

  return {
    color: positionWithOffset.interpolate({
      inputRange: inputRange,
      outputRange: childrenA.map((_, i) =>
        i === tabIndex ? activeColor : textColor
      ),
    }),
    opacity: positionWithOffset.interpolate({
      inputRange: inputRange,
      outputRange: childrenA.map((_, i) => (i === tabIndex ? 1 : 0.6)),
    }),
  };
}

export function useIndicator({
  childrenCount,
  position,
  offset,
  layouts,
  tabsLayout,
}: IndicatorArgs): IndicatorReturns {
  const [renderIndex, setRenderIndex] = React.useState(0);

  const style = React.useMemo<AnimatedViewStyle | null>(() => {
    /* eslint-disable @typescript-eslint/no-unused-vars  */
    // @ts-ignore
    let _ = renderIndex;
    const childrenA = Array(childrenCount).fill(undefined);
    const inputRange = childrenA.map((__, i) => i);
    const positionWithOffset = Animated.add(position!, offset!);
    return position && tabsLayout && layouts.current
      ? {
          transform: [
            {
              scaleX: positionWithOffset.interpolate({
                inputRange,
                outputRange: childrenA.map(
                  (__, i) => layouts.current?.[i]?.width || 0
                ),
              }),
            },
            {
              translateX: positionWithOffset.interpolate({
                inputRange,
                outputRange: childrenA.map((__, i) => {
                  const cl = layouts.current?.[i];
                  if (!cl) {
                    return 0;
                  }
                  return (cl.x + cl.width / 2) / cl.width;
                }),
              }),
            },
          ],
        }
      : null;
  }, [position, offset, tabsLayout, layouts, renderIndex, childrenCount]);

  const onUpdateTabLayout = React.useCallback(() => {
    setRenderIndex((prev) => prev + 1);
  }, [setRenderIndex]);

  return [undefined, onUpdateTabLayout, style];
}

export function useOffsetScroller({
  index,
  offset,
  updateScroll,
  mode,
}: OffsetScrollArgs) {
  // we want native to scroll before the index changes
  const direction = React.useRef<undefined | 'next' | 'prev'>(undefined);
  React.useEffect(() => {
    // android does not work unfortunately
    if (offset && Platform.OS !== 'android' && mode === 'scrollable') {
      const id = offset.addListener((nOffset) => {
        const newOffset = nOffset.value;
        const oldDirection = direction.current;

        if (newOffset > 0.1) {
          direction.current = 'next';
        } else if (newOffset < -0.1) {
          direction.current = 'prev';
        }

        if (direction.current) {
          if (oldDirection !== direction.current) {
            updateScroll(direction.current);
          }
        }
      });
      return () => {
        offset.removeListener(id);
      };
    }
    return undefined;
  }, [offset, updateScroll, direction, mode]);

  React.useEffect(() => {
    direction.current = undefined;
  }, [index]);
}
