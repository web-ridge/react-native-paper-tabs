import * as React from 'react';
import type { Animated, GestureResponderEvent } from 'react-native';
import type { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';
import type { ThemeProps } from 'react-native-paper/lib/typescript/src/types';
import { StyleProp, TextStyle } from 'react-native';
export interface BadgeProps {
  visible?: boolean;
  size?: number;
  style?: StyleProp<TextStyle>;
  ref?: React.RefObject<typeof Animated.Text>;
  theme?:ThemeProps;
}

export interface TabScreenProps {
  label: string;
  icon?: IconSource;
  badge?: string | number | boolean;
  badgeProps?: BadgeProps;
  children: any;
  onPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

export default function TabScreen({ children }: TabScreenProps) {
  return React.Children.only(children);
}
