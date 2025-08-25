// OrdersScreen.js
// Orders screen UI
import { useThemeColor } from '@/hooks/useThemeColor';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import FooterRectangle from '../../../components/FooterRectangle';

const { width } = Dimensions.get('window');

export default function OrdersScreen() {
  const bg = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const icon = useThemeColor({}, 'icon');

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Text style={[styles.title, { color: text }]}>ORDERS</Text>
      <View style={[styles.titleLine, { backgroundColor: icon }]} />
      <View style={styles.centerContent}>
        <Image source={require('../../../assets/images/sandy.png')} style={styles.illustration} />
        <Text style={[styles.emptyText, { color: text }]}>No Order has been placed yet</Text>
      </View>
      <FooterRectangle isOrdersScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: width * 0.08,
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: width * 0.02,
  },
  titleLine: {
    width: '100%',
    height: 1,
    marginBottom: width * 0.06,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: width * 0.65,
    height: width * 0.65,
    resizeMode: 'contain',
    marginBottom: width * 0.06,
  },
  emptyText: {
    fontSize: width * 0.045,
    textAlign: 'center',
  },
});
