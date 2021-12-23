import * as React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Image,
  ScrollView,
  Linking,
  Animated,
  StyleSheet,
  View,
} from 'react-native';
import {
  RadioButton,
  Provider as PaperProvider,
  Button,
  Appbar,
  Title,
  Text,
  Switch,
  DefaultTheme,
  DarkTheme,
  useTheme,
  overlay,
  Paragraph,
  TouchableRipple,
} from 'react-native-paper';
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from 'react-native-paper-tabs';

function App({
  onToggleDarkMode,
  dark,
}: {
  onToggleDarkMode: () => any;
  dark: boolean;
}) {
  const [backgroundColor, setBackgroundColor] = React.useState<
    string | undefined
  >(undefined);
  const [uppercase, setUppercase] = React.useState<boolean>(true);
  const [showIcons, setShowIcons] = React.useState<boolean>(true);
  const [showText, setShowText] = React.useState<boolean>(true);
  const [iconPosition, setIconPosition] = React.useState<'leading' | 'top'>(
    'leading'
  );
  const [mode, setMode] = React.useState<'fixed' | 'scrollable'>('fixed');

  const theme = useTheme();
  const bg =
    theme.dark && theme.mode === 'adaptive'
      ? overlay(3, theme.colors.surface)
      : (theme.colors.surface as any);

  const onChangeIndex = React.useCallback((newIndex: number) => {
    console.log('onChangeIndex', { newIndex });
  }, []);

  const tabProps = {
    uppercase, // true/false | default=true | labels are uppercase
    showTextLabel: showText, // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
    iconPosition, // leading / top
    style: !dark ? { backgroundColor } : undefined, // works the same as AppBar in react-native-paper
    mode, // fixed, scrollable | default=fixed}
    onChangeIndex,
    // showLeadingSpace: true, // show leading space in scrollable tabs inside the header
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView style={styles.root}>
        <View style={[styles.content, styles.padding]}>
          <View style={styles.titleContainer}>
            <Image source={require('./tab.png')} style={styles.logo} />
            <Title>react-native-paper-tabs</Title>
          </View>

          <Paragraph>
            Smooth and fast cross platform Material Design Tabs for React Native
            Paper brought to you by{' '}
            <Text
              onPress={() => Linking.openURL('https://webridge.nl')}
              style={styles.underline}
            >
              webRidge
            </Text>
          </Paragraph>
          <Enter />
          <Enter />
          <Button
            uppercase={false}
            mode="contained"
            icon="github"
            style={styles.twitterButton}
            onPress={() =>
              Linking.openURL(
                'https://github.com/web-ridge/react-native-paper-tabs'
              )
            }
          >
            GitHub
          </Button>
          <TwitterFollowButton userName={'RichardLindhout'} />
          <TwitterFollowButton userName={'web_ridge'} />
        </View>
        <View style={[styles.content, styles.padding]}>
          <Title>Example</Title>
        </View>
        <Animated.View
          style={[
            styles.content,
            styles.contentShadow,
            styles.contentInline,
            { backgroundColor: bg },
          ]}
        >
          <Appbar style={tabProps.style}>
            <Appbar.Action icon="menu" />
            <Appbar.Content title="react-native-paper-tabs" />
          </Appbar>
          {mode === 'fixed' ? (
            <Tabs {...tabProps}>
              <TabScreen
                label="Explore"
                icon={showIcons ? 'compass' : undefined}
                onPressIn={() => {
                  console.log('onPressIn explore');
                }}
                onPress={() => {
                  console.log('onPress explore');
                }}
              >
                <ExploreWitHookExamples />
              </TabScreen>
              <TabScreen
                label="Flights"
                icon={showIcons ? 'airplane' : undefined}
              >
                <ScreenWithText text={'Flights'} />
              </TabScreen>
              <TabScreen
                label="Trips"
                icon={showIcons ? 'bag-personal' : undefined}
              >
                <ScreenWithText text={'Trips'} />
              </TabScreen>
            </Tabs>
          ) : (
            <Tabs {...tabProps}>
              <TabScreen
                label="Explore"
                icon={showIcons ? 'compass' : undefined}
              >
                <ExploreWitHookExamples />
              </TabScreen>
              <TabScreen
                label="Flights"
                icon={showIcons ? 'airplane' : undefined}
              >
                <ScreenWithText text={'Flights'} />
              </TabScreen>
              <TabScreen
                label="Trips"
                icon={showIcons ? 'bag-personal' : undefined}
              >
                <ScreenWithText text={'Trips'} />
              </TabScreen>
              <TabScreen label="Bookings" icon={showIcons ? 'book' : undefined}>
                <ScreenWithText text={'Bookings'} />
              </TabScreen>
              <TabScreen
                label="Personal"
                icon={showIcons ? 'shield-account' : undefined}
              >
                <ScreenWithText text={'Personal'} />
              </TabScreen>
              <TabScreen label="Settings" icon={showIcons ? 'cog' : undefined}>
                <ScreenWithText text={'Settings'} />
              </TabScreen>
            </Tabs>
          )}
        </Animated.View>
        <Animated.View
          style={[
            styles.content,
            styles.contentShadow,
            {
              backgroundColor: bg,
            },
          ]}
        >
          <Row>
            <Label>Dark mode</Label>
            <Switch value={dark} onValueChange={onToggleDarkMode} />
          </Row>
          {dark ? null : (
            <Row>
              <Label>Background color</Label>
              <Block
                backgroundColor={theme.colors.primary}
                onPress={() => setBackgroundColor(undefined)}
                selected={backgroundColor === undefined}
              />

              <Block
                backgroundColor={'#fff'}
                onPress={() => setBackgroundColor('#fff')}
                selected={backgroundColor === '#fff'}
              />
            </Row>
          )}
          <Row>
            <Label>Uppercase</Label>
            <Switch value={uppercase} onValueChange={(v) => setUppercase(v)} />
          </Row>
          <Row>
            <Label>Show icons</Label>
            <Switch value={showIcons} onValueChange={(v) => setShowIcons(v)} />
          </Row>
          <Row>
            <Label>Show text</Label>
            <Switch value={showText} onValueChange={(v) => setShowText(v)} />
          </Row>
          <Row>
            <Title>Icon position</Title>
          </Row>
          <RadioButton.Group
            onValueChange={(v) => setIconPosition(v as any)}
            value={iconPosition}
          >
            <RadioButton.Item label="Leading" value="leading" />
            <RadioButton.Item label="Top" value="top" />
          </RadioButton.Group>
          <Row>
            <Title>Tab mode</Title>
          </Row>
          <RadioButton.Group
            onValueChange={(v) => setMode(v as any)}
            value={mode}
          >
            <RadioButton.Item label="Fixed" value="fixed" />
            <RadioButton.Item label="Scrollable" value="scrollable" />
          </RadioButton.Group>
          <Enter />
          <Enter />

          <Enter />
        </Animated.View>

        <Enter />
        <Enter />
        <Enter />
      </ScrollView>
    </SafeAreaView>
  );
}

function ExploreWitHookExamples() {
  const goTo = useTabNavigation();
  const index = useTabIndex();
  return (
    <View style={styles.screenWithText}>
      <Title>Explore</Title>
      <Paragraph>Index: {index}</Paragraph>
      <Button onPress={() => goTo(1)}>Go to Flights</Button>
    </View>
  );
}

function ScreenWithText({ text }: { text: string }) {
  return (
    <View style={styles.screenWithText}>
      <Title>{text}</Title>
    </View>
  );
}

function Enter() {
  return <View style={styles.enter} />;
}

function Row({ children }: { children: any }) {
  return <View style={styles.row}>{children}</View>;
}

function Block({
  backgroundColor,
  onPress,
  selected,
}: {
  backgroundColor: string;
  onPress: () => any;
  selected: boolean;
}) {
  return (
    <TouchableRipple
      style={[styles.blockButton, { backgroundColor }]}
      onPress={onPress}
    >
      <View
        style={[
          styles.block,
          selected && styles.blockSelected,
          { backgroundColor },
        ]}
      />
    </TouchableRipple>
  );
}

function Label({ children }: { children: string }) {
  const theme = useTheme();
  return (
    <Text style={[styles.label, { ...theme.fonts.medium }]}>{children}</Text>
  );
}

export default function AppWithProviders() {
  const [dark, setDark] = React.useState(false);
  const onToggleDarkMode = () => {
    setDark((prev) => !prev);
  };

  return (
    <PaperProvider
      theme={
        dark
          ? {
              ...DarkTheme,
              roundness: 10,
              colors: {
                ...DarkTheme.colors,
                // primary: '#F59E00',
                // accent: '#FBBE5E',
              },
            }
          : {
              ...DefaultTheme,
              roundness: 10,
              colors: {
                ...DefaultTheme.colors,
                // primary: '#F59E00',
                // accent: '#FBBE5E',
              },
            }
      }
    >
      <SafeAreaProvider>
        <App onToggleDarkMode={onToggleDarkMode} dark={dark} />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

function TwitterFollowButton({ userName }: { userName: string }) {
  return (
    <Button
      uppercase={false}
      mode="outlined"
      icon="twitter"
      style={styles.twitterButton}
      onPress={() => Linking.openURL(`https://twitter.com/${userName}`)}
    >
      @{userName}
    </Button>
  );
}

const styles = StyleSheet.create({
  blockButton: {
    marginLeft: 10,
    width: 50,
    height: 30,
    borderRadius: 4,
  },
  screenWithText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'pink',
    height: 200,
    minHeight: 200,
    maxHeight: 200,
  },
  block: {
    width: 50,
    height: 30,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  blockSelected: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.85,
    shadowRadius: 14.78,

    elevation: 22,
  },

  full: { flex: 1 },
  underline: { textDecorationLine: 'underline' },
  logo: { width: 56, height: 56, marginRight: 24 },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  twitterButton: { marginBottom: 16 },
  root: { flex: 1 },
  padding: { padding: 16 },
  content: {
    width: '100%',
    maxWidth: 500,
    marginTop: 16,
    alignSelf: 'center',
    // flex: 1,
  },
  contentInline: {
    padding: 0,
    height: 300,
  },
  contentShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 3,
  },

  buttons: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 24 },

  enter: { height: 12 },
  label: { width: 100, fontSize: 16, flex: 1 },
  row: {
    padding: 16,
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
