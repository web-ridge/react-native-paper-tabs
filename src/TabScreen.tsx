import * as React from 'react';
import type { GestureResponderEvent } from 'react-native';

export interface TabScreenProps {
  label: string;
  icon?: any;
  badge?: string | number | boolean;
  children: any;
  onPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

export default function TabScreen({ children }: TabScreenProps) {
  return React.Children.only(children);
}
