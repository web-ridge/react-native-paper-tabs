import React, { useState } from 'react';
import { Platform } from 'react-native';
import { TabsContext } from './context';
import type { TabsProviderProps } from './utils';

// used to persist position on web
const cache = createCache();

export const TabsProvider = ({
  children,
  onChangeIndex,
  defaultIndex,
  persistKey,
}: TabsProviderProps): JSX.Element => {
  const [index, setIndex] = useState<number>(
    getDefaultIndex(defaultIndex, persistKey) || 0
  );
  const goTo = React.useCallback(
    (ind: number) => {
      if (persistKey && Platform.OS === 'web') {
        cache.set(persistKey, ind);
      }
      setIndex(ind);
      onChangeIndex(ind);
    },
    [setIndex, onChangeIndex, persistKey]
  );

  return (
    <TabsContext.Provider value={{ goTo, index }}>
      {children}
    </TabsContext.Provider>
  );
};

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

function getDefaultIndex(
  defaultIndex: number | undefined,
  persistKey: string | undefined
) {
  if (persistKey) {
    return cache.get(persistKey) || defaultIndex || 0;
  }
  return defaultIndex || 0;
}
