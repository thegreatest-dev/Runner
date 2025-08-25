import { useThemePreference } from '@/context/ThemePreference';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import FooterRectangle from '../../../components/FooterRectangle';

const { width, height } = Dimensions.get('window');

type Tx = { id: string; title: string; amount: string; date: string };

const mockTx: Tx[] = [
  { id: '1', title: 'Payment to Store', amount: '-₦2,500', date: 'Aug 20' },
  { id: '2', title: 'Refund', amount: '+₦1,200', date: 'Aug 18' },
  { id: '3', title: 'Top up', amount: '+₦5,000', date: 'Aug 12' },
];

export default function WalletScreen() {
  const themeHook = useThemePreference();
  const bg = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const icon = useThemeColor({}, 'icon');
  const tint = useThemeColor({}, 'tint');
  const surface = themeHook.preference === 'dark' ? '#1B1B1B' : '#FFFFFF';

  const navigation = useNavigation();
  const [balanceVisible, setBalanceVisible] = useState(true);

  const renderTx = ({ item }: { item: Tx }) => {
    const positive = item.amount.startsWith('+');
    return (
      <View style={[styles.txRow, { backgroundColor: surface }]}> 
        <View style={styles.txLeft}>
          <Image source={positive ? require('../../../assets/icons/withdraw.png') : require('../../../assets/icons/debit.png')} style={[styles.txIcon, { tintColor: themeHook.preference === 'dark' ? icon : undefined }]} />
          <View style={{ marginLeft: 12 }}>
            <Text style={[styles.txTitle, { color: text }]}>{item.title}</Text>
            <Text style={[styles.txDate, { color: text }]}>{item.date}</Text>
          </View>
        </View>
        <Text style={[styles.txAmount, { color: positive ? '#2E8B57' : '#d23f31' }]}>{item.amount}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: bg }]}> 
      <View style={styles.container}>
        <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: 96 }]} keyboardShouldPersistTaps="handled">
          {/* Large circular header */}
          <View style={[styles.headerCircle, { backgroundColor: themeHook.preference === 'dark' ? '#072a24' : '#08302b' }]}>
            <Text style={styles.greeting}>Hello, Daniel Akani</Text>

            {/* Wallet balance block (as in mock) */}
            <View style={styles.headerBalance}>
              <Text style={styles.headerBalanceLabel}>Your Wallet Balance</Text>
              <View style={styles.headerBalanceRow}>
                <Text style={styles.headerBalanceValue}>{balanceVisible ? '₦209,891.21' : '₦•••,•••.••'}</Text>
                <TouchableOpacity onPress={() => setBalanceVisible((v) => !v)} accessibilityRole="button" accessibilityLabel="Toggle balance visibility">
                  <Image source={balanceVisible ? require('../../../assets/icons/eyeopen.png') : require('../../../assets/icons/eyeclose.png')} style={[styles.headerBalanceIcon, { tintColor: '#FFFFFF' }]} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Action card*/}
          <View style={[styles.actionCard, { backgroundColor: surface }]}> 
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.actionItem} accessibilityRole="button" accessibilityLabel="Fund wallet">
                  <View style={[styles.actionCircle, { borderColor: '#2EA36B' }]}>
                    <Image source={require('../../../assets/icons/fund.png')} style={{ width: 28, height: 28, tintColor: themeHook.preference === 'dark' ? icon : undefined }} />
                  </View>
                  <Text style={[styles.actionLabel, { color: text }]}>Fund wallet</Text>
                </TouchableOpacity>

              <TouchableOpacity style={styles.actionItem} accessibilityRole="button" accessibilityLabel="Send">
                <View style={[styles.actionCircle, { borderColor: '#2EA36B' }]}>
                  <Image source={require('../../../assets/icons/send.png')} style={{ width: 28, height: 28, tintColor: themeHook.preference === 'dark' ? icon : undefined }} />
                </View>
                <Text style={[styles.actionLabel, { color: text }]}>Send</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionItem} accessibilityRole="button" accessibilityLabel="Request">
                <View style={[styles.actionCircle, { borderColor: '#2EA36B' }]}>
                  <Image source={require('../../../assets/icons/request.png')} style={{ width: 28, height: 28, tintColor: themeHook.preference === 'dark' ? icon : undefined }} />
                </View>
                <Text style={[styles.actionLabel, { color: text }]}>Request</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Main content card */}
          <View style={[styles.mainCard, { backgroundColor: surface }]}> 
            <Text style={[styles.sectionTitle, { color: text }]}>Recent activity</Text>
            {mockTx.map((tx) => (
              <View key={tx.id}>{renderTx({ item: tx })}</View>
            ))}
          </View>
        </ScrollView>

  {/* Shared footer */}
  <FooterRectangle isOrdersScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  container: { padding: 20, paddingBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backBtn: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
  backIcon: { width: 16, height: 16 },
  headerTitle: { fontSize: 20, fontWeight: '700', marginLeft: 8 },
  balanceCard: { padding: 18, borderRadius: 12, marginBottom: 18 },
  balanceLabel: { fontSize: 13, marginBottom: 6 },
  balanceValue: { fontSize: 28, fontWeight: '700' },
  actionsRow: { flexDirection: 'row', marginTop: 12 },
  actionBtn: { flex: 1, paddingVertical: 12, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  actionText: { color: '#FFFFFF', fontWeight: '700' },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  txRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, borderRadius: 10, marginBottom: 10 },
  txLeft: { flexDirection: 'row', alignItems: 'center' },
  txIcon: { width: 40, height: 40, borderRadius: 20 },
  txTitle: { fontSize: 14, fontWeight: '600' },
  txDate: { fontSize: 12 },
  txAmount: { fontSize: 14, fontWeight: '700' },
  /* New layout styles for base wallet design */
  headerCircle: {
  width: '100%',
  // reduced semicircle height
  height: Math.round(height * 0.36),
  // smaller radii for the reduced semicircle
  borderBottomLeftRadius: width * 1.2,
  borderBottomRightRadius: width * 1.2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 18,
    paddingLeft: 16,
    overflow: 'hidden',
  marginBottom: 12,
  zIndex: 1,
  },
  greeting: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  headerBalance: {
    marginTop: 18,
    paddingHorizontal: 16,
  },
  headerBalanceLabel: {
    color: '#A8E0C3',
    fontSize: 12,
    marginBottom: 6,
  },
  headerBalanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerBalanceValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  headerBalanceIcon: {
    width: 18,
    height: 18,
    marginLeft: 8,
  },
  topCardsWrap: {
    marginTop: 6,
    marginBottom: 8,
  },
  smallCard: {
    height: 48,
    borderRadius: 12,
    marginHorizontal: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
  },
  actionCard: {
  borderRadius: 12,
  // make the card taller so it matches or slightly exceeds the circle diameter
  minHeight: 112,
  paddingVertical: 18,
  paddingHorizontal: 20,
  marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionItem: {
  alignItems: 'center',
  flex: 1,
  justifyContent: 'center',
  },
  actionCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#2EA36B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  mainCard: {
    borderRadius: 16,
    padding: 16,
    minHeight: 300,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  marginBottom: 12,
  marginTop: -Math.round(height * 0.01),
  zIndex: 3,
  flex: 1,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  footerBar: {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  height: 64,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  justifyContent: 'center',
  paddingLeft: 12,
  marginTop: 12,
  zIndex: 50,
  elevation: 12,
  // iOS shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: -4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  },
  footerBackBtn: {
  position: 'absolute',
  left: 12,
  top: 10,
  width: 44,
  height: 44,
  borderRadius: 22,
  justifyContent: 'center',
  alignItems: 'center',
  },
  footerBackIcon: {
    width: 16,
    height: 16,
  },
  footerBackContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerBackText: {
    fontSize: 14,
    fontWeight: '600',
  },
  contentWrap: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 0,
  },
});
