import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import type { SwiperProps } from './utils';
import type { TabScreenProps } from './TabScreen';
import { useTabIndex } from './context';
import TabsHeader from './TabsHeader';

function Swiper(props: SwiperProps) {
  const {
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
  } = props;

  const index = useTabIndex();

  let children: React.Component<TabScreenProps>[] = props.children;

  const currentScreen = children[index];
  if (!currentScreen) {
    return null;
  }
  const renderProps = {
    children,
    theme,
    dark,
    style,
    offset: undefined,
    position: undefined,
    iconPosition,
    showTextLabel,
    showLeadingSpace,
    uppercase,
    mode,
    tabHeaderStyle,
    tabLabelStyle,
  };

  return (
    <View style={styles.root}>
      <TabsHeader {...renderProps} />
      {currentScreen}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default Swiper;
