import type {
  Animated,
  LayoutRectangle,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import type { Theme } from 'react-native-paper/lib/typescript/types';
import type { MutableRefObject, RefObject } from 'react';
export type AnimatedViewStyle = Animated.AnimatedProps<StyleProp<ViewStyle>>;
export type AnimatedTextStyle = Animated.AnimatedProps<StyleProp<TextStyle>>;
export type Mode = 'fixed' | 'scrollable';
export type IconPosition = 'leading' | 'top';

export interface SwiperRenderProps {
  dark: boolean | undefined;
  style: ViewStyle | undefined;
  theme: Theme;
  index: number;
  goTo: (index: number) => any;
  children: any;
  position: Animated.Value | undefined;
  offset: Animated.Value | undefined;
  iconPosition?: IconPosition;
  showTextLabel?: boolean;
  showLeadingSpace?: boolean;
  uppercase: boolean;
  mode: Mode;
}

export interface SwiperProps {
  dark: boolean | undefined;
  style: ViewStyle | undefined;
  theme: Theme;
  onChangeIndex: (index: number) => void;
  defaultIndex?: number;
  children: any;
  iconPosition?: IconPosition;
  showTextLabel?: boolean;
  showLeadingSpace?: boolean;
  uppercase: boolean;
  mode: Mode;
  disableSwipe?: boolean;
}

export interface OffsetScrollArgs {
  index: number;
  offset: Animated.Value | undefined;
  updateScroll: (direction?: undefined | 'next' | 'prev') => void;
  mode: Mode;
}

export interface AnimatedColorArgs {
  tabIndex: number;
  active: boolean;
  position: Animated.Value | undefined;
  offset: Animated.Value | undefined;
  textColor: string;
  activeColor: string;
  childrenCount: number;
}

export interface IndicatorArgs {
  layouts: MutableRefObject<Record<string, LayoutRectangle> | null>;
  index: number;
  childrenCount: number;
  position: Animated.Value | undefined;
  offset: Animated.Value | undefined;
  tabsLayout: LayoutRectangle | null;
}
export type IndicatorReturns = [
  RefObject<View> | undefined,
  () => any,
  AnimatedViewStyle | null
];
