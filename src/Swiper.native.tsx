import * as React from 'react';
import { View, Animated, Keyboard, StyleSheet } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import type { SwiperProps } from './utils';
import type { TabScreenProps } from './TabScreen';
import { TabsContext } from './context';

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
});

function SwiperNative(props: SwiperProps) {
  const {
    Header,
    Footer,
    theme,
    dark,
    style,
    defaultIndex,
    iconPosition,
    showTextLabel,
    uppercase,
    mode,
    onChangeIndex,
  } = props;
  const indexRef = React.useRef<number>(defaultIndex || 0);
  const [index, setIndex] = React.useState<number>(defaultIndex || 0);

  let children: React.Component<TabScreenProps>[] = props.children;

  const offset = React.useRef<Animated.Value>(new Animated.Value(0));
  const position = React.useRef<Animated.Value>(
    new Animated.Value(defaultIndex || 0)
  );
  const isScrolling = React.useRef<boolean>(false);
  const viewPager = React.useRef<ViewPager | undefined>(undefined);

  React.useEffect(() => {
    if (index !== indexRef.current) {
      isScrolling.current = true;
      viewPager.current && viewPager.current.setPage(index);
    }

    indexRef.current = index;
    return undefined;
  }, [isScrolling, viewPager, index]);

  const onPageScrollStateChanged = React.useCallback(
    (event) => {
      Keyboard.dismiss();
      isScrolling.current = event.nativeEvent.pageScrollState !== 'idle';
    },
    [isScrolling]
  );

  const onPageSelected = React.useCallback(
    (e) => {
      isScrolling.current = false;
      const i = e.nativeEvent.position;
      setIndex(i);
      onChangeIndex(i);
    },
    [isScrolling, setIndex, onChangeIndex]
  );

  const goTo = React.useCallback(
    (ind: number) => {
      if (!isScrolling.current) {
        setIndex(ind);
      }
    },
    [setIndex, isScrolling]
  );

  const renderProps = {
    index,
    goTo,
    children,
    theme,
    dark,
    style,
    position: position.current,
    offset: offset.current,
    iconPosition,
    showTextLabel,
    uppercase,
    mode,
  };
  return (
    <>
      {Header ? <Header {...renderProps} /> : null}
      <TabsContext.Provider value={{ goTo, index }}>
        <ViewPager
          style={styles.viewPager}
          initialPage={index}
          onPageSelected={onPageSelected}
          ref={viewPager as any}
          onPageScrollStateChanged={onPageScrollStateChanged}
          onPageScroll={Animated.event(
            [
              {
                nativeEvent: {
                  position: position.current,
                  offset: offset.current,
                },
              },
            ],
            {
              useNativeDriver: false,
            }
          )}
        >
          {React.Children.map(children, (tab, tabIndex) => (
            <View style={styles.viewPager} key={tab.props.label || tabIndex}>
              {tab}
            </View>
          ))}
        </ViewPager>
      </TabsContext.Provider>
      {Footer ? <Footer {...renderProps} /> : null}
    </>
  );
}

export default SwiperNative;
