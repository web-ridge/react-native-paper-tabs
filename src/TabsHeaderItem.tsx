import * as React from 'react';
import {
  LayoutChangeEvent,
  Animated,
  StyleSheet,
  View,
  Platform,
  TextProps,
} from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import type { ReactElement } from 'react';
import type { TabScreenProps } from './TabScreen';
import type { Theme } from 'react-native-paper/lib/typescript/types';
import Color from 'color';
import MaterialCommunityIcon from './MaterialCommunityIcon';
import { useAnimatedText } from './internal';
import type { IconPosition, Mode } from './utils';
const AnimatedText = Animated.createAnimatedComponent<
  React.ComponentType<TextProps>
>(Text as any);

export default function TabsHeaderItem({
  tab,
  tabIndex,
  active,
  goTo,
  onTabLayout,
  activeColor,
  textColor,
  theme,
  position,
  offset,
  childrenCount,
  uppercase,
  mode,
  iconPosition,
  showTextLabel,
}: {
  tab: ReactElement<TabScreenProps>;
  tabIndex: number;
  active: boolean;
  goTo: (index: number) => void;
  onTabLayout: (index: number, e: LayoutChangeEvent) => void;
  activeColor: string;
  textColor: string;
  theme: Theme;
  position: Animated.Value | undefined;
  offset: Animated.Value | undefined;
  childrenCount: number;
  uppercase?: boolean;
  iconPosition?: IconPosition;
  showTextLabel?: boolean;
  mode: Mode;
}) {
  const rippleColor = React.useMemo(
    () =>
      Color(activeColor as any)
        .alpha(0.32)
        .rgb()
        .string(),
    [activeColor]
  );

  const { color, opacity } = useAnimatedText({
    active,
    position,
    offset,
    activeColor,
    textColor,
    tabIndex,
    childrenCount,
  });

  return (
    <View
      key={tab.props.label}
      style={[styles.tabRoot, mode === 'fixed' && styles.tabRootFixed]}
      onLayout={(e) => onTabLayout(tabIndex, e)}
    >
      <TouchableRipple
        disabled={tab.props.disabled}
        onPress={(e) => {
          goTo(tabIndex);
          tab.props.onPress?.(e);
        }}
        onPressIn={tab.props.onPressIn}
        style={[
          styles.touchableRipple,
          iconPosition === 'top' && styles.touchableRippleTop,
          tab.props.disabled && styles.touchableRippleDisabled,
        ]}
        rippleColor={rippleColor}
        // @ts-ignore
        accessibilityTraits={'button'}
        accessibilityRole="button"
        accessibilityComponentType="button"
        accessibilityLabel={tab.props.label}
        accessibilityState={{ selected: active }}
        testID={`tab_${tabIndex}`}
      >
        <View
          style={[
            styles.touchableRippleInner,
            iconPosition === 'top' && styles.touchableRippleInnerTop,
          ]}
        >
          {tab.props.icon ? (
            <View
              style={[
                styles.iconContainer,
                iconPosition !== 'top' && styles.marginRight,
              ]}
            >
              <MaterialCommunityIcon
                selectable={false}
                accessibilityElementsHidden={true}
                importantForAccessibility="no"
                name={tab.props.icon || ''}
                style={{ color: color, opacity }}
                size={24}
              />
            </View>
          ) : null}
          {showTextLabel ? (
            <AnimatedText
              selectable={false}
              style={[
                styles.text,
                iconPosition === 'top' && styles.textTop,
                { ...theme.fonts.medium, color, opacity },
              ]}
            >
              {uppercase ? tab.props.label.toUpperCase() : tab.props.label}
            </AnimatedText>
          ) : null}
        </View>
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  tabRoot: { position: 'relative' },
  tabRootFixed: { flex: 1 },
  touchableRipple: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableRippleTop: {
    height: 72,
  },
  touchableRippleInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16,
    paddingLeft: 16,
    minWidth: 90,
    maxWidth: 360,
  },
  touchableRippleInnerTop: {
    flexDirection: 'column',
  },
  touchableRippleDisabled: {
    opacity: 0.4,
  },
  iconContainer: {
    width: 24,
    height: 24,
  },
  text: {
    textAlign: 'center',
    letterSpacing: 1,
    ...Platform.select({
      web: {
        transitionDuration: '150ms',
        transitionProperty: 'all',
      },
      default: {},
    }),
  },
  textTop: { marginTop: 6 },
  marginRight: { marginRight: 8 },
});
