import * as React from 'react';
import type { TextStyle, View, ViewStyle } from 'react-native';
import type {
  AnimatedColorArgs,
  IndicatorArgs,
  IndicatorReturns,
  OffsetScrollArgs,
} from './utils';

function getIndicatorStyle({
  left,
  width,
}: {
  left: number;
  width: number;
}): ViewStyle {
  return {
    transform: [{ scaleX: width }, { translateX: (left + width / 2) / width }],
  };
}

export function useIndicator({
  index,
  layouts,
}: IndicatorArgs): IndicatorReturns {
  const indicatorRef = React.useRef<View>(null);
  const updateIndicator = React.useCallback(() => {
    if (!indicatorRef.current || !layouts.current) {
      return;
    }
    const cl = layouts.current[index];
    if (cl) {
      indicatorRef.current.setNativeProps({
        style: getIndicatorStyle({ left: cl.x, width: cl.width }),
      });
    }
  }, [index, indicatorRef, layouts]);

  return [indicatorRef, updateIndicator, null];
}

export function useOffsetScroller(_: OffsetScrollArgs) {}
export function useAnimatedText({
  activeColor,
  active,
  textColor,
}: AnimatedColorArgs): TextStyle {
  return {
    color: active ? activeColor : textColor,
    opacity: active ? 1 : 0.6,
  };
}
