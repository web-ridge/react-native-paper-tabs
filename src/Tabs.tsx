import * as React from 'react';
import type { ViewStyle } from 'react-native';
import { withTheme } from 'react-native-paper';
import Swiper from './Swiper';
import type { Theme } from 'react-native-paper/lib/typescript/types';

import type { IconPosition, Mode } from './utils';
import { Platform } from 'react-native';

// used to persist position on web
const cache = createCache();

function Tabs({
  onChangeIndex,
  children,
  persistKey,
  theme,
  dark,
  style,
  defaultIndex,
  mode = 'fixed',
  uppercase = true,
  iconPosition = 'leading',
  showTextLabel = true,
  showLeadingSpace = true,
  disableSwipe = false,
}: {
  children: any;
  persistKey?: string;
  theme: Theme;
  dark?: boolean;
  style?: ViewStyle;
  defaultIndex?: number;
  iconPosition?: IconPosition;
  showTextLabel?: boolean;
  showLeadingSpace?: boolean;
  uppercase?: boolean;
  mode?: Mode;
  onChangeIndex?: (index: number) => void;
  disableSwipe?: boolean;
}) {
  const onInnerChangeIndex = React.useCallback(
    (newIndex) => {
      if (persistKey && Platform.OS === 'web') {
        cache.set(persistKey, newIndex);
      }
      onChangeIndex?.(newIndex);
    },
    [persistKey, onChangeIndex]
  );

  return (
    <Swiper
      style={style}
      dark={dark}
      theme={theme}
      defaultIndex={getDefaultIndex(defaultIndex, persistKey)}
      onChangeIndex={onInnerChangeIndex}
      uppercase={uppercase}
      iconPosition={iconPosition}
      showTextLabel={showTextLabel}
      showLeadingSpace={showLeadingSpace}
      mode={mode}
      disableSwipe={disableSwipe}
    >
      {children}
    </Swiper>
  );
}

function getDefaultIndex(
  defaultIndex: number | undefined,
  persistKey: string | undefined
) {
  if (persistKey) {
    return cache.get(persistKey) || defaultIndex || 0;
  }
  return defaultIndex || 0;
}
// used to persist position on web
function createCache() {
  let c: { [k: string]: number } = {};
  const set = (k: string, i: number) => {
    c[k] = i;
  };
  const get = (key: string) => c[key];
  return {
    set,
    get,
  };
}

export default withTheme(Tabs);
