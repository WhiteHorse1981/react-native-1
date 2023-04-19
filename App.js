import { NavigationContainer } from '@react-navigation/native';
// import React, { useCallback } from 'react';
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
import useRoute from './router';

// SplashScreen.preventAutoHideAsync();

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  //   'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
  //   'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  // });

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }
  const routing = useRoute(true);
  return <NavigationContainer>{routing}</NavigationContainer>;
}
