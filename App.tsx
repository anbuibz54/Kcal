/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import { PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import lightTheme from './ui_packages/theme/light-theme.json';
import darkTheme from './ui_packages/theme/dark-theme.json';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { RootStack } from './navigations/RootStack';
import { Provider } from 'react-redux'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HttpContextProvider } from './core/context/HttpContext';
import { store } from './core/redux-store/store';
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const NavigationLightTheme = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme,
  });
  const NavigationDarkTheme = adaptNavigationTheme({
    reactNavigationDark: DefaultTheme,
  });
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PaperProvider theme={!isDarkMode ? lightTheme : darkTheme}>
          <NavigationContainer
            theme={
              !isDarkMode
                ? NavigationLightTheme.LightTheme
                : NavigationDarkTheme.DarkTheme
            }>
            <StatusBar
              barStyle={!isDarkMode ? 'light-content' : 'dark-content'}
            />
            <HttpContextProvider>
              <RootStack />
            </HttpContextProvider>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
