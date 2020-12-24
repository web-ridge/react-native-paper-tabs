
<img align="left" width="56" height="56" src="https://user-images.githubusercontent.com/6492229/103107073-489a0400-463b-11eb-898e-f6185d738e96.png"> react-native-paper-tabs
---
<br>
<p float="left">
<img src="https://badgen.net/bundlephobia/minzip/react-native-paper-tabs" />
<img src="https://badgen.net/npm/dy/react-native-paper-tabs" />
<img src="https://badgen.net/npm/types/react-native-paper-tabs" />
<img src="https://badgen.net/npm/license/react-native-paper-tabs" />
</p>

- Smooth and fast cross platform Material Design Tabs for ([React Native Paper](https://callstack.github.io/react-native-paper/))
- Tested on Android, iOS and the web
- Simple API
- Typesafe
- Scrollabe and fixed
- Leading or top icon
- Performant
- Uses native components ([react-native-viewpager](https://github.com/callstack/react-native-viewpager))
- Great React Native Web support
- Implements official spec ([material-design-spect](https://material.io/components/tabs#usage))

## About us
We want developers to be able to build software faster using modern tools like GraphQL, Golang, React Native.

Follow us on Twitter:
- https://twitter.com/RichardLindhout
- https://twitter.com/web_ridge

## Getting started

Yarn
```sh
yarn add react-native-paper-tabs @react-native-community/viewpager
```

npm
```sh
npm install react-native-paper-tabs @react-native-community/viewpager
```

## Usage

```tsx
import {Tabs,TabScreen} from 'react-native-paper-tabs';

function Example() {
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
          <View style={{ backgroundColor: 'blue', flex:1 }} />
        </TabScreen>
        <TabScreen label="Flights" icon="airplane">
          <View style={{ backgroundColor: 'black', flex:1 }} />
        </TabScreen>
        <TabScreen label="Trips" icon="bag-suitcase">
           <View style={{ backgroundColor: 'red', flex:1 }} />
        </TabScreen>
      </Tabs>
    )
}

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT


### You probably like these
- Simple translations in React (Native): https://github.com/web-ridge/react-ridge-translations
- Simple global state management in React (Native): https://github.com/web-ridge/react-ridge-state
- 1 command utility for React Native (Web) project: https://github.com/web-ridge/create-react-native-web-application
- Date and Time picker for React Native Paper: https://github.com/web-ridge/react-native-paper-dates
