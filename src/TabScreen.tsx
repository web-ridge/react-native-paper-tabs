import * as React from 'react';
import type { GestureResponderEvent } from 'react-native';
import type { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

export interface TabScreenProps {
  label: string;
  icon?: IconSource;
  badge?: string | number | boolean;
  children: any;
  onPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

export default function TabScreen({ children }: TabScreenProps) {
  return React.Children.only(children);
}
