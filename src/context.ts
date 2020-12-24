import * as React from 'react';
import { useContext } from 'react';

export const TabsContext = React.createContext<{
  goTo: (index: number) => void;
  index: number;
}>({
  goTo: () => null,
  index: 0,
});

export function useTabNavigation() {
  return useContext(TabsContext).goTo;
}
export function useTabIndex() {
  return useContext(TabsContext).index;
}
