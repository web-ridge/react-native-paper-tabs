import * as React from 'react';
import type { ViewStyle } from 'react-native';
import { withTheme } from 'react-native-paper';
import Swiper from './Swiper';
import type { Theme } from 'react-native-paper/lib/typescript/types';
import TabsHeader from './TabsHeader';
import type { IconPosition, Mode } from './utils';

// used to persist position on web
const cache = createCache();

function Tabs({
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
}: {
  children: any;
  persistKey?: string;
  theme: Theme;
  dark?: boolean;
  style?: ViewStyle;
  defaultIndex?: number;
  iconPosition?: IconPosition;
  showTextLabel?: boolean;
  uppercase?: boolean;
  mode?: Mode;
}) {
  const onChangeIndex = React.useCallback(
    (newIndex) => {
      if (persistKey) {
        cache.set(persistKey, newIndex);
      }
    },
    [persistKey]
  );

  return (
    <Swiper
      style={style}
      dark={dark}
      theme={theme}
      defaultIndex={getDefaultIndex(defaultIndex, persistKey)}
      onChangeIndex={onChangeIndex}
      Header={TabsHeader}
      uppercase={uppercase}
      iconPosition={iconPosition}
      showTextLabel={showTextLabel}
      mode={mode}
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
