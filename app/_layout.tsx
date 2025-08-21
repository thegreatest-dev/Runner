import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import AppNavigator from '../src/navigation/AppNavigator';
import AuthNavigator from '../src/navigation/AuthNavigator';

import { useColorScheme } from '@/hooks/useColorScheme';

const RootStack = createStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
