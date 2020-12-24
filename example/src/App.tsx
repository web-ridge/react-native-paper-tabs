import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import { Tabs, TabScreen } from 'react-native-paper-tabs';

export default function Example() {
  return (
    <Tabs
    // uppercase={false} // true/false | default=true | labels are uppercase
    // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
    // iconPosition // leading, top | default=leading
    // style={{ backgroundColor:'#fff' }} // works the same as AppBar in react-native-paper
    // dark={false} // works the same as AppBar in react-native-paper
    // theme={} // works the same as AppBar in react-native-paper
    // mode="scrollable" // fixed, scrollable | default=fixed
    >
      <TabScreen label="Explore" icon="compass">
        <View style={styles.full} />
      </TabScreen>
      <TabScreen label="Flights" icon="airplane">
        <View style={styles.full} />
      </TabScreen>
      <TabScreen label="Trips" icon="bag-suitcase">
        <View style={styles.full} />
      </TabScreen>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  full: { flex: 1 },
  // blue: { backgroundColor: 'blue' },
  // red: { backgroundColor: 'red' },
  // black: { backgroundColor: 'black' },
});
