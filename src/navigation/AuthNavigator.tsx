import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import SplashScreen from '../screens/Splash/SplashScreen';

export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

function SplashToLogin({ navigation }: { navigation: StackNavigationProp<AuthStackParamList, 'Splash'> }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 4000); // Increased duration to 4 seconds
    return () => clearTimeout(timer);
  }, [navigation]);
  return <SplashScreen />;
}

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashToLogin} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
