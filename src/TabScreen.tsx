import * as React from 'react';
import type { IconSource } from 'react-native-paper/lib/typescript/components/Icon';
import type { GestureResponderEvent } from 'react-native';

export interface TabScreenProps {
  label: string;
  icon?: IconSource;
  children: any;
  onPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

export default function TabScreen({ children }: TabScreenProps) {
  return React.Children.only(children);
}
