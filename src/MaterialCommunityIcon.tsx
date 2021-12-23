import * as React from 'react';
import { StyleSheet, Animated } from 'react-native';

let MaterialCommunityIcons: any;

try {
  // Optionally require vector-icons
  MaterialCommunityIcons = Animated.createAnimatedComponent(
    require('react-native-vector-icons/MaterialCommunityIcons').default
  );
} catch (e) {
  let isErrorLogged = false;

  // Fallback component for icons
  // @ts-ignore
  MaterialCommunityIcons = ({ name, ...rest }) => {
    if (!isErrorLogged) {
      if (
        !/(Cannot find module|Module not found|Cannot resolve module)/.test(
          e.message
        )
      ) {
        console.error(e);
      }

      console.warn(
        `Tried to use the icon '${name}' in a component from 'react-native-paper-tabs', but 'react-native-vector-icons/MaterialCommunityIcons' could not be loaded.`,
        `To remove this warning, try installing 'react-native-vector-icons' or use another method to specify icon: https://callstack.github.io/react-native-paper/icons.html.`
      );

      isErrorLogged = true;
    }

    return (
      <Animated.Text {...rest} selectable={false}>
        □
      </Animated.Text>
    );
  };
}

const defaultIcon = ({ name, color, size, style, ...rest }: any) => (
  <MaterialCommunityIcons
    selectable={false}
    name={name}
    color={color}
    size={size}
    style={[
      {
        lineHeight: size,
      },
      styles.icon,
      style,
    ]}
    {...rest}
  />
);

const styles = StyleSheet.create({
  icon: {
    backgroundColor: 'transparent',
  },
});

export default defaultIcon;
