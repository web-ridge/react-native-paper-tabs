import React, { useState } from 'react';
import { TabsContext } from './context';
import type { TabsProviderProps } from './utils';

export function TabsProvider({
  children,
  onChangeIndex,
  defaultIndex,
}: TabsProviderProps) {
  const [index, setIndex] = useState<number>(defaultIndex || 0);
  const goTo = React.useCallback(
    (ind: number) => {
      setIndex(ind);
      onChangeIndex?.(ind);
    },
    [setIndex, onChangeIndex]
  );

  const value = React.useMemo(() => ({ goTo, index }), [goTo, index]);

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}
