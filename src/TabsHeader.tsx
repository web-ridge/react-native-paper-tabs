import type { SwiperRenderProps } from './utils';
import {
  Animated,
  LayoutChangeEvent,
  LayoutRectangle,
  Platform,
  ScrollView,
  StyleSheet,
  ViewStyle,
  View,
} from 'react-native';
import { overlay, Surface } from 'react-native-paper';
import color from 'color';
import * as React from 'react';
import { useIndicator, useOffsetScroller } from './internal';
import TabsHeaderItem from './TabsHeaderItem';

export default function TabsHeader({
  index,
  goTo,
  children,
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
}: SwiperRenderProps) {
  const { colors, dark: isDarkTheme, mode: themeMode } = theme;
  const {
    backgroundColor: customBackground,
    elevation = 4,
    ...restStyle
  }: ViewStyle = StyleSheet.flatten(style) || {};

  let isDark: boolean;

  const backgroundColor = customBackground
    ? customBackground
    : isDarkTheme && themeMode === 'adaptive'
    ? overlay(elevation, colors.surface)
    : colors.primary;

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
  const textColor = isDark ? '#fff' : '#000';
  const activeColor = hasPrimaryBackground ? textColor : theme.colors.primary;

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

  return (
    <View style={styles.relative}>
      <Surface
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
              tab={tab}
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
            />
          ))}
          <Animated.View
            ref={indicatorRef}
            pointerEvents="none"
            style={[
              styles.indicator,
              {
                backgroundColor: activeColor,
              },
              indicatorStyle,
            ]}
          />
        </ScrollView>
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
      </Surface>
    </View>
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
