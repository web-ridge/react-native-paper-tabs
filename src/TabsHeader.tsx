import type { SwiperRenderProps } from './utils';
import { Animated, Platform, ScrollView, StyleSheet, View } from 'react-native';
import type {
  LayoutChangeEvent,
  LayoutRectangle,
  ViewStyle,
} from 'react-native';
import { overlay, Surface } from 'react-native-paper';
import color from 'color';
import * as React from 'react';
import { useIndicator, useOffsetScroller } from './internal';
import TabsHeaderItem from './TabsHeaderItem';
import { TabsContext } from './context';
import type { ReactElement } from 'react';
import type { TabScreenProps } from './TabScreen';

export default function TabsHeader({
  position,
  offset,
  theme,
  dark,
  style,
  iconPosition,
  showTextLabel,
  showLeadingSpace,
  uppercase,
  mode,
  tabHeaderStyle,
  tabLabelStyle,
  children,
}: SwiperRenderProps) {
  const { index, goTo } = React.useContext(TabsContext);
  const { colors, dark: isDarkTheme, mode: themeMode, isV3 } = theme;
  const {
    backgroundColor: customBackground,
    elevation: _elevation,
    ...restStyle
  }: ViewStyle = StyleSheet.flatten(style) || {};

  let elevation = theme.isV3 ? _elevation : _elevation || 4;
  let isDark: boolean;

  const backgroundColorV2 =
    isDarkTheme && themeMode === 'adaptive'
      ? overlay(elevation || 0, colors.surface)
      : colors.primary;

  const backgroundColorV3 = theme.colors.surface;
  const backgroundColor = customBackground
    ? customBackground
    : isV3
    ? backgroundColorV3
    : backgroundColorV2;

  let hasPrimaryBackground = colors.primary === backgroundColor;
  if (typeof dark === 'boolean') {
    isDark = dark;
  } else {
    isDark =
      backgroundColor === 'transparent'
        ? false
        : // @ts-ignore
          !color(backgroundColor).isLight();
  }

  const textColorV2 = isDark ? '#fff' : '#000';
  const activeColorV2 = hasPrimaryBackground
    ? textColorV2
    : theme.colors.primary;

  // Color (active)	On surface	md.sys.color.on-surface
  // Color (inactive)	On surface variant	md.sys.color.on-surface-variant
  const textColorV3 = colors.onSurfaceVariant;
  const activeColorV3 = colors.onSurface;

  const textColor = isV3 ? textColorV3 : textColorV2;
  const activeColor = isV3 ? activeColorV3 : activeColorV2;

  const innerScrollSize = React.useRef<number | null>(null);
  const scrollX = React.useRef<number>(0);
  const scrollRef = React.useRef<ScrollView>(null);
  const layouts = React.useRef<Record<string, LayoutRectangle> | null>(null);
  const [tabsLayout, setTabsLayout] = React.useState<LayoutRectangle | null>(
    null
  );
  const [indicatorRef, onUpdateTabLayout, indicatorStyle] = useIndicator({
    tabsLayout,
    layouts,
    index,
    offset,
    position,
    childrenCount: children.length,
  });

  const onTabsLayout = React.useCallback(
    (e: LayoutChangeEvent) => {
      setTabsLayout(e.nativeEvent.layout);
    },
    [setTabsLayout]
  );

  const onTabLayout = React.useCallback(
    (tabIndex: number, event: LayoutChangeEvent) => {
      layouts.current = {
        ...layouts.current,
        [tabIndex]: event.nativeEvent.layout,
      };
      onUpdateTabLayout();
    },
    [layouts, onUpdateTabLayout]
  );

  const updateScroll = React.useCallback(
    (scrollType?: 'next' | 'prev') => {
      if (!layouts.current || mode !== 'scrollable') {
        return;
      }
      let cl = layouts.current[index];

      if (!cl || !scrollRef.current || !tabsLayout) {
        return;
      }

      const tabsWidth = tabsLayout.width;
      let scrolledX = scrollX.current;
      // console.log({ scrolledX, scrollType });
      if (scrollType === 'next') {
        const next = layouts.current?.[index + 1];
        if (next) {
          cl = next;
        }
      } else if (scrollType === 'prev') {
        const prev = layouts.current?.[index - 1];
        if (prev) {
          cl = prev;
        }
      }
      const relativeX = cl.x - scrolledX;
      const overflowLeft = relativeX;
      const overflowRight = -tabsWidth + relativeX + cl.width;

      if (overflowRight > -50) {
        scrollRef.current.scrollTo({
          x: scrolledX + overflowRight + 50,
          y: 0,
          animated: true,
        });
      } else if (overflowLeft < 50) {
        scrollRef.current.scrollTo({
          x: scrolledX + overflowLeft - 50,
          y: 0,
          animated: true,
        });
      }
    },
    [mode, layouts, index, scrollRef, scrollX, tabsLayout]
  );

  // subscribes to offset on native devices to scroll tab bar faster when scrolling (iOS only since Android bugs)
  useOffsetScroller({ updateScroll, index, offset, mode });

  // updates scroll when index changes (updateScroll function changes to new reference when index changes)
  React.useEffect(() => {
    updateScroll();
  }, [updateScroll]);

  const SurfaceComponent = theme.isV3 ? View : Surface;

  return (
    <Animated.View style={[styles.relative, tabHeaderStyle]}>
      <SurfaceComponent
        style={[
          { backgroundColor, elevation },
          restStyle,
          styles.tabs,
          iconPosition === 'top' && styles.tabsTopIcon,
        ]}
        onLayout={onTabsLayout}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={
            mode === 'fixed' ? styles.fixedContentContainerStyle : undefined
          }
          onContentSizeChange={(e) => {
            innerScrollSize.current = e;
          }}
          onScroll={(e) => {
            scrollX.current = e.nativeEvent.contentOffset.x;
          }}
          scrollEventThrottle={25}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          alwaysBounceHorizontal={mode === 'scrollable'}
          scrollEnabled={mode === 'scrollable'}
        >
          {mode === 'scrollable' && showLeadingSpace ? (
            <View style={styles.scrollablePadding} />
          ) : null}

          {React.Children.map(children, (tab, tabIndex) => (
            <TabsHeaderItem
              theme={theme}
              tabIndex={tabIndex}
              tab={tab as ReactElement<TabScreenProps>}
              active={index === tabIndex}
              onTabLayout={onTabLayout}
              goTo={goTo}
              activeColor={activeColor}
              textColor={textColor}
              position={position}
              offset={offset}
              childrenCount={children.length}
              uppercase={uppercase}
              iconPosition={iconPosition}
              showTextLabel={showTextLabel}
              mode={mode}
              tabLabelStyle={tabLabelStyle}
            />
          ))}
          <Animated.View
            ref={indicatorRef}
            pointerEvents="none"
            style={[
              styles.indicator,
              {
                backgroundColor: theme.colors.primary,
              },
              indicatorStyle as any,
            ]}
          />
        </ScrollView>
        {elevation && (
          <Animated.View
            style={[
              styles.removeTopShadow,
              {
                height: elevation,
                backgroundColor,
                top: -elevation,
              },
            ]}
          />
        )}
      </SurfaceComponent>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  relative: { position: 'relative' },
  removeTopShadow: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 2,
  },
  scrollablePadding: {
    width: 52,
  },
  tabs: {
    height: 48,
  },
  tabsTopIcon: {
    height: 72,
  },
  fixedContentContainerStyle: {
    flex: 1,
  },
  indicator: {
    position: 'absolute',
    height: 2,
    width: 1,
    left: 0,
    bottom: 0,
    ...Platform.select({
      web: {
        backgroundColor: 'transparent',
        transitionDuration: '150ms',
        transitionProperty: 'all',
        transformOrigin: 'left',
        willChange: 'transform',
      },
      default: {},
    }),
  },
});
