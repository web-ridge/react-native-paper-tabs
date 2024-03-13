<img align="left" width="56" height="56" src="https://user-images.githubusercontent.com/6492229/103138418-c9580f00-46d2-11eb-855a-f8b3c9e90ac7.png"> react-native-paper-tabs
---
<br>
<p float="left">
<img src="https://badgen.net/bundlephobia/minzip/react-native-paper-tabs" />
<img src="https://badgen.net/npm/dy/react-native-paper-tabs" />
<img src="https://badgen.net/npm/types/react-native-paper-tabs" />
<img src="https://badgen.net/npm/license/react-native-paper-tabs" />
<img src="https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000" />
</p>

- Smooth and fast cross platform Material Design Tabs for ([react-native-paper](https://callstack.github.io/react-native-paper/))
- Tested on Android, iOS and the web
- Simple API
- Typesafe
- Scrollable and fixed
- Leading or top icon
- Performant
- Badges
- Support for Material You
- Uses native components ([react-native-viewpager](https://github.com/callstack/react-native-viewpager))
- Great React Native Web support
- Implements official spec ([material-design-spec](https://material.io/components/tabs#usage))

[![Demo of react-native-paper-tabs](https://user-images.githubusercontent.com/6492229/103141217-cb7d9600-46f1-11eb-8a98-9f233f0b7198.png)](https://www.youtube.com/watch?v=DFZQlT11k58)

[View video on YouTube](https://www.youtube.com/watch?v=DFZQlT11k58)

Web demo: [reactnativepapertabs.com](http://reactnativepapertabs.com/)


## About us
We want developers to be able to build software faster using modern tools like GraphQL, Golang and React Native.

Give us a follow on Twitter:
[RichardLindhout](https://twitter.com/RichardLindhout),
[web_ridge](https://twitter.com/web_ridge)

## Donate
Please contribute or donate so we can spend more time on this library.

[Donate with PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7B9KKQLXTEW9Q&source=url)


## Getting started

Yarn
```sh
yarn add react-native-paper-tabs react-native-pager-view
```

npm
```sh
npm install react-native-paper-tabs react-native-pager-view
```

## Usage

```tsx
import { useRef } from "react";
import { StyleSheet } from "react-native"
import {
  Button,
  Title,
  Paragraph,
} from 'react-native-paper';
import {
  TabsProvider,
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from 'react-native-paper-tabs';

function Example() {
    const badgeRef = useRef(null);
    const myBadgeProps = {
      style:styles.badge,
      visible:false,
      ref:badgeRef,
      //theme:mytheme
    }

    return (
      <TabsProvider
        defaultIndex={0}
        // onChangeIndex={handleChangeIndex} optional
      >
        <Tabs
          // uppercase={false} // true/false | default=true (on material v2) | labels are uppercase
          // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
          // iconPosition // leading, top | default=leading
          // style={{ backgroundColor:'#fff' }} // works the same as AppBar in react-native-paper
          // dark={false} // works the same as AppBar in react-native-paper
          // theme={} // works the same as AppBar in react-native-paper
          // mode="scrollable" // fixed, scrollable | default=fixed
          // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
          // disableSwipe={false} // (default=false) disable swipe to left/right gestures
        >
          <TabScreen label="Explore" icon="compass">
             <ExploreWitHookExamples />
          </TabScreen>
          <TabScreen label="Flights" icon="airplane" disabled>
            <View style={{ backgroundColor: 'black', flex:1 }} />
          </TabScreen>
          <TabScreen
            label="Trips"
            icon="bag-suitcase"
            // optional props
            // badge={true} // only show indicator
            // badge="text"
            // badge={1}
            // badgeProps={myBadgeProps}
            // onPressIn={() => {
            //   console.log('onPressIn explore');
            // }}
            // onPress={() => {
            //   console.log('onPress explore');
            // }}
          >
             <View style={{ backgroundColor: 'red', flex:1 }} />
          </TabScreen>
        </Tabs>
      </TabsProvider>
    )
}


const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: 4,
    right: 0,
    backgroundColor: "rgb(120, 69, 172)",
  }
});
function ExploreWitHookExamples() {
  const goTo = useTabNavigation();
  const index = useTabIndex();
  return (
    <View style={{ flex:1 }}>
      <Title>Explore</Title>
      <Paragraph>Index: {index}</Paragraph>
      <Button onPress={() => goTo(1)}>Go to Flights</Button>
    </View>
  );
}

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT


### Checkout our other libraries
- Simple cross platform navigation library for React Native (web): [react-native-ridge-navigation](https://github.com/web-ridge/react-native-ridge-navigation)
- Simple form library for React Native with great UX for developer and end-user: [react-native-use-form]([https://github.com/web-ridge/react-native-ridge-navigation](https://github.com/web-ridge/react-native-use-form))
- Smooth and fast cross platform Material Design date and time picker for React Native Paper: [react-native-paper-dates](https://github.com/web-ridge/react-native-paper-dates)
- Smooth and fast cross platform Material Design Tabs for React Native Paper: [react-native-paper-tabs](https://github.com/web-ridge/react-native-paper-tabs)
- Simple translations in React (Native): [react-ridge-translations](https://github.com/web-ridge/react-ridge-translations)
