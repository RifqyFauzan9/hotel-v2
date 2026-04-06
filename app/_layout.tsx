import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Open-Regular': require('@/assets/app/fonts/OpenSans-Regular.ttf'),
    'Open-Medium': require('@/assets/app/fonts/OpenSans-Medium.ttf'),
    'Open-SemiBold': require('@/assets/app/fonts/OpenSans-SemiBold.ttf'),
    'Open-Bold': require('@/assets/app/fonts/OpenSans-Bold.ttf'),
    'Open-ExtraBold': require('@/assets/app/fonts/OpenSans-ExtraBold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />
}
