import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import AppNavigator from '../src/navigation/AppNavigator';
import AuthNavigator from '../src/navigation/AuthNavigator';

import { ThemePreferenceProvider, useThemePreference } from '@/context/ThemePreference';
import { useColorScheme } from '@/hooks/useColorScheme';

const RootStack = createStackNavigator();

function InnerRoot() {
  const system = useColorScheme();
  const { preference } = useThemePreference();
  const colorScheme = preference === 'system' ? system : preference;

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    // Poppins family (we have Poppins-SemiBold.ttf at assets/fonts and Poppins folder)
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    // Inter as fallback for other UI text
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootStack.Navigator initialRouteName="Auth">
        <RootStack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
        <RootStack.Screen name="App" component={AppNavigator} options={{ headerShown: false }} />
      </RootStack.Navigator>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemePreferenceProvider>
      <InnerRoot />
    </ThemePreferenceProvider>
  );
}
