import React, { useState } from 'react';
import { TabsContext } from './context';
import type { TabsProviderProps } from './utils';

export const TabsProvider = ({
  children,
  onChangeIndex,
  defaultIndex,
}: TabsProviderProps): JSX.Element => {
  const [index, setIndex] = useState<number>(defaultIndex || 0);
  const goTo = React.useCallback(
    (ind: number) => {
      setIndex(ind);
      onChangeIndex(ind);
    },
    [setIndex, onChangeIndex]
  );

  return (
    <TabsContext.Provider value={{ goTo, index }}>
      {children}
    </TabsContext.Provider>
  );
};
