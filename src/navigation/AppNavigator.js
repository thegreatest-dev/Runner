import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import OngoingOrdersScreen from '../screens/Order/OngoingOrdersScreen';
import OrderAcceptedScreen from '../screens/Order/OrderAcceptedScreen';
import OrderRunnerScreen from '../screens/Order/OrderRunnerScreen';
import OrderStatusScreen from '../screens/Order/OrderStatusScreen';
import TrackScreen from '../screens/Order/TrackScreen';
import OrdersScreen from '../screens/Orders/OrdersScreen';
import ProfileScreen from '../screens/Wallet/ProfileScreen';
import WalletScreen from '../screens/Wallet/WalletScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        // Enable horizontal swipe-to-go-back gestures on screens pushed to this stack
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        // On iOS, limit the active swipe
  gestureResponseDistance: Platform.OS === 'ios' ? 20 : undefined,
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
  <Stack.Screen name="OrderRunner" component={OrderRunnerScreen} options={{ headerShown: false }} />
  <Stack.Screen name="TrackScreen" component={TrackScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OngoingOrders" component={OngoingOrdersScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Orders" component={OrdersScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Wallet" component={WalletScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OrderStatusScreen" component={OrderStatusScreen} options={{ headerShown: false }} />
      <Stack.Screen name="OrderAcceptedScreen" component={OrderAcceptedScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}