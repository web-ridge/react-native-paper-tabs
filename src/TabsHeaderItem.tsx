import * as React from 'react';
import { Animated, StyleSheet, View, Platform } from 'react-native';
import type { LayoutChangeEvent, TextProps, TextStyle } from 'react-native';
import { Badge, Text, TouchableRipple } from 'react-native-paper';
import type { MD3LightTheme } from 'react-native-paper';
import type { ReactElement } from 'react';
import type { TabScreenProps } from './TabScreen';
import Color from 'color';
import { useAnimatedText } from './internal';
import type { IconPosition, Mode } from './utils';
import MaterialCommunityIcon from './MaterialCommunityIcon';

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
  tabLabelStyle,
}: {
  tab: ReactElement<TabScreenProps>;
  tabIndex: number;
  active: boolean;
  goTo: (index: number) => void;
  onTabLayout: (index: number, e: LayoutChangeEvent) => void;
  activeColor: string;
  textColor: string;
  theme: typeof MD3LightTheme;
  position: Animated.Value | undefined;
  offset: Animated.Value | undefined;
  childrenCount: number;
  uppercase?: boolean;
  iconPosition?: IconPosition;
  showTextLabel?: boolean;
  mode: Mode;
  tabLabelStyle?: TextStyle | undefined;
}) {
  const baseColor = theme.colors.primary;
  const rippleColor = React.useMemo(
    () =>
      Color(baseColor as any)
        .alpha(0.32)
        .rgb()
        .string(),
    [baseColor]
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

  const badgeIsFilled =
    tab.props.badge !== undefined && tab.props.badge !== null;

  const badgeWithoutContent = typeof tab.props.badge === 'boolean';

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
          { borderRadius: theme.roundness },
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
          {badgeIsFilled ? (
            <View
              style={[
                styles.badgeContainer,
                {
                  right:
                    (badgeWithoutContent
                      ? String(tab.props.badge).length * -2
                      : 0) - 2,
                },
              ]}
            >
              {badgeWithoutContent ? (
                <Badge visible={true} size={8} />
              ) : (
                <Badge visible={true} size={16}>
                  {tab.props.badge as any}
                </Badge>
              )}
            </View>
          ) : null}
          {showTextLabel ? (
            <AnimatedText
              selectable={false}
              style={[
                styles.text,
                iconPosition === 'top' && styles.textTop,
                { ...theme.fonts.titleSmall, color, opacity },
                tabLabelStyle,
              ]}
            >
              {uppercase && !theme.isV3
                ? tab.props.label.toUpperCase()
                : tab.props.label}
            </AnimatedText>
          ) : null}
        </View>
      </TouchableRipple>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    left: 0,
    top: -2,
  },
  tabRoot: { position: 'relative' },
  tabRootFixed: { flex: 1 },
  touchableRipple: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
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
