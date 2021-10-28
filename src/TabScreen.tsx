import * as React from 'react';
import type { IconSource } from 'react-native-paper/lib/typescript/components/Icon';

export interface TabScreenProps {
  label: string;
  icon?: IconSource;
  children: any;
  preload?: () => any;
  disabled?: boolean;
}

export default function TabScreen({ children }: TabScreenProps) {
  return React.Children.only(children);
}
