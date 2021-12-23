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
    transform: [
      { scaleX: width },
      { translateX: roundToTwo(left / width) || 0 },
    ],
  };
}

function roundToTwo(num: number) {
  return Math.round(num * 100 + Number.EPSILON) / 100;
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

  // update indicator when index changes (updateIndicator function changes to new reference when index changes)
  React.useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  return [indicatorRef, updateIndicator, null];
}

export function useOffsetScroller(_: OffsetScrollArgs) {}
export function useAnimatedText({
  activeColor,
  active,
  textColor,
}: AnimatedColorArgs): TextStyle {
  return React.useMemo(
    () => ({
      color: active ? activeColor : textColor,
      opacity: active ? 1 : 0.6,
    }),
    [active, activeColor, textColor]
  );
}
