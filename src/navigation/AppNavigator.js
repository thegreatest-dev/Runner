import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import OrderRunnerScreen from '../screens/Order/OrderRunnerScreen';
import OrderStatusScreen from '../screens/Order/OrderStatusScreen';
import OrdersScreen from '../screens/Orders/OrdersScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Dashboard">
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OrderRunner" component={OrderRunnerScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Orders" component={OrdersScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OrderStatusScreen" component={OrderStatusScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}