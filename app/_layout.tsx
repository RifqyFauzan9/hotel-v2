import { Colors } from "@/src/core/theme";
import { AuthProvider, useAuth } from '@/src/presentation/contexts/auth.context';
import { ToastProvider } from '@/src/presentation/contexts/toast.context';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(guest)",
};

function RootLayoutNav() {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inProtectedGroup = segments[0] === "(auth)";
    const inPublicGroup = segments[0] === "(guest)";

    if (!isAuthenticated && inProtectedGroup) {
      router.replace("/(guest)/login");
      return;
    }

    if (isAuthenticated && inPublicGroup) {
      router.replace("/(auth)/(tabs)");
      return;
    }
  }, [isAuthenticated, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(guest)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}

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

  return (
    <SafeAreaProvider>
      <ToastProvider>
        <AuthProvider>
          <ThemeProvider value={DefaultTheme}>
            <RootLayoutNav />
            <StatusBar style="dark" />
          </ThemeProvider>
        </AuthProvider>
      </ToastProvider>
    </SafeAreaProvider>
  )
}
