import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import SplashScreen from '../screens/Splash/SplashScreen';

// Removed TypeScript type alias as it's not supported in JavaScript files.

const Stack = createStackNavigator();

function SplashToLogin({ navigation }) {
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
