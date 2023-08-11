import * as React from 'react';
import type { ViewStyle, TextStyle } from 'react-native';
import { withTheme } from 'react-native-paper';
import Swiper from './Swiper';
import type { MD3LightTheme } from 'react-native-paper';

import type { IconPosition, Mode } from './utils';

function Tabs({
  theme,
  dark,
  style,
  mode = 'fixed',
  uppercase = true,
  iconPosition = 'leading',
  showTextLabel = true,
  showLeadingSpace = true,
  disableSwipe = false,
  tabHeaderStyle,
  tabLabelStyle,
  ...rest
}: {
  children: any;
  theme: typeof MD3LightTheme;
  dark?: boolean;
  style?: ViewStyle;
  iconPosition?: IconPosition;
  showTextLabel?: boolean;
  showLeadingSpace?: boolean;
  uppercase?: boolean;
  mode?: Mode;
  disableSwipe?: boolean;
  tabHeaderStyle?: ViewStyle | undefined;
  tabLabelStyle?: TextStyle | undefined;
}) {
  const children = React.Children.toArray(rest.children).filter(Boolean);

  return (
    <Swiper
      style={style}
      dark={dark}
      theme={theme}
      uppercase={uppercase}
      iconPosition={iconPosition}
      showTextLabel={showTextLabel}
      showLeadingSpace={showLeadingSpace}
      mode={mode}
      disableSwipe={disableSwipe}
      tabHeaderStyle={tabHeaderStyle}
      tabLabelStyle={tabLabelStyle}
    >
      {children}
    </Swiper>
  );
}

export default withTheme(Tabs);
