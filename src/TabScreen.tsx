import * as React from 'react';
import type { GestureResponderEvent } from 'react-native';
import type TabsHeaderItem from './TabsHeaderItem';

export interface TabScreenProps {
  label: string;
  icon?: any;
  badge?: string | number | boolean;
  children: any;
  onPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  TabHeaderComponent?: typeof TabsHeaderItem | undefined;
}

export default function TabScreen({ children }: TabScreenProps) {
  return React.Children.only(children);
}
