import { useThemePreference } from '@/context/ThemePreference';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Modal,
  PanResponder,
  Animated as RNAnimated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import FooterRectangle, { FOOTER_HEIGHT } from '../../../components/FooterRectangle';

const { width, height } = Dimensions.get('window');
// Responsive scale (clamped) based on a sensible base width (iPhone 12/13 ~390).
const BASE_WIDTH = 390;
const SCALE = Math.min(Math.max(width / BASE_WIDTH, 0.85), 1.15);
const logoFontSize = Math.round(34 * SCALE);
const titleFontSize = Math.round(Math.max(16, Math.min(26, width * 0.055 * SCALE)));
const serviceIconSize = Math.round(48 * SCALE);
const pillWidth = Math.round(51 * SCALE);
const pillHeight = Math.round(24 * SCALE);
const pillKnobSize = Math.round(21 * SCALE);
const iconCircleSize = Math.round(20 * SCALE);
const pillIconSize = Math.round(12 * SCALE);

type AppStackParamList = {
  Dashboard: undefined;
  OrderRunner: undefined;
  Orders: undefined;
  Profile: undefined;
  Wallet: undefined;
};

export default function DashboardScreen() {
  const navigation = useNavigation<StackNavigationProp<AppStackParamList, 'Dashboard'>>();
  const route = useRoute();

  const [chatVisible, setChatVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [supportVisible, setSupportVisible] = useState(false);
  // theme toggle
  const themeHook = useThemePreference();
  const bgColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');
  //
  const serviceBg = themeHook.preference === 'dark' ? '#1B1B1B' : '#FFFFFF';
  const activeBg = themeHook.preference === 'dark' ? '#163823' : '#E6F7ED';
  const serviceBorderColor = themeHook.preference === 'dark' ? 'transparent' : '#EEE';
  const rnAnimRef = useRef(new RNAnimated.Value(0));
  const rnAnim = rnAnimRef.current;
  useEffect(() => {
    
    const horizontalPadding = Math.round(5 * SCALE);
    const halfSpace = (pillWidth - pillKnobSize) / 2;
    const distance = Math.max(6, Math.round(halfSpace - horizontalPadding));
    const to = themeHook.preference === 'dark' ? distance : -distance;
    RNAnimated.timing(rnAnim, { toValue: to, duration: 220, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, [themeHook.preference]);
  const pan = useRef(new Animated.Value(0)).current;
  const panSupport = useRef(new Animated.Value(0)).current;

  const handleServicePress = (key: string, route?: string) => {
    // show active state immediately
    setSelectedService(key);
   
    setTimeout(() => {
      if (route) {
        (navigation as any).navigate(route);
      }
      // clear active state after navigation
      setTimeout(() => setSelectedService(null), 250);
    }, 120);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          pan.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 120) {
          Animated.timing(pan, { toValue: height, duration: 180, useNativeDriver: true }).start(() => {
            pan.setValue(0);
            setChatVisible(false);
          });
        } else {
          Animated.spring(pan, { toValue: 0, useNativeDriver: true, bounciness: 0 });
        }
      },
    })
  ).current;

  const panResponderSupport = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          panSupport.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 120) {
          Animated.timing(panSupport, { toValue: height, duration: 180, useNativeDriver: true }).start(() => {
            panSupport.setValue(0);
            setSupportVisible(false);
          });
        } else {
          Animated.spring(panSupport, { toValue: 0, useNativeDriver: true, bounciness: 0 });
        }
      },
    })
  ).current;

  useEffect(() => {
    if (!chatVisible) {
      pan.setValue(0);
    }
    if (!supportVisible) {
      panSupport.setValue(0);
    }
  }, [chatVisible, pan]);

  // 
  useEffect(() => {
    try {
      const open = (route.params as any)?.openChat;
      if (open) {
        setChatVisible(true);
        // clear
        setTimeout(() => {
          (navigation as any).setParams({ openChat: false });
        }, 50);
      }
    } catch (e) {
      // ignore
    }
  }, [route.params]);

  return (
  <SafeAreaView style={[styles.container, { backgroundColor: bgColor, paddingBottom: FOOTER_HEIGHT + 16 }] }>
      <View style={styles.headerRow}>
  {/* Logo spelled out */}
  <Text style={[styles.logoText, { color: textColor }]}>Errandly</Text>

        {/* Dark mode*/}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.pillWrap}
          onPress={() => {
            if (!themeHook.hydrated) return;
            themeHook.setPreference(themeHook.preference === 'dark' ? 'light' : 'dark');
          }}
          accessibilityRole="button"
          accessibilityLabel="Toggle dark mode"
          accessibilityState={{ disabled: !themeHook.hydrated, selected: themeHook.preference === 'dark' }}
          hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }}
        >
          <View style={[styles.pillBackground, themeHook.preference === 'dark' ? styles.pillDark : styles.pillLight]}>
            <View style={styles.iconCircleLight}>
              <Image source={require('../../../assets/icons/light.png')} style={styles.pillIconInner} />
            </View>

            <View style={styles.iconCircleDark}>
              <Image source={require('../../../assets/icons/dark.png')} style={styles.pillIconInner} />
            </View>

            <RNAnimated.View style={[styles.pillKnob, { transform: [{ translateX: rnAnim }] }]} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Header Image */}
      <View style={[styles.headerShadowWrap, { height: height * 0.26 }]}> 
        <View style={[styles.headerMask, { height: '100%' }]}> 
          <Image
            source={require('../../../assets/images/dambe.png')}
            style={styles.headerImageInner}
            resizeMode="cover"
          />
        </View>
      </View>

  {/* Title */}
  <Text style={[styles.title, { color: textColor }]}>Services</Text>
  <View style={[styles.titleLine, { backgroundColor: iconColor }]} />

      {/* Services Row 1 */}
      <View style={styles.servicesContainer}>
        <TouchableOpacity
          style={[
            styles.serviceButton,
            { backgroundColor: serviceBg, borderColor: serviceBorderColor },
            selectedService === 'order' && { backgroundColor: activeBg, borderColor: '#2EA36B' },
          ]}
          onPress={() => handleServicePress('order', 'OrderRunner')}
          accessibilityRole="button"
          accessibilityLabel="Order a runner"
          hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }}
        >
          <Image source={require('../../../assets/icons/order.png')} style={[styles.icon, { tintColor: themeHook.preference === 'dark' ? iconColor : undefined }]} />
          <Text style={[styles.serviceText, { color: textColor }]}>Order a Runner</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.serviceButton,
            { backgroundColor: serviceBg, borderColor: serviceBorderColor },
            selectedService === 'orders' && { backgroundColor: activeBg, borderColor: '#2EA36B' },
          ]}
          onPress={() => handleServicePress('orders', 'Orders')}
          accessibilityRole="button"
          accessibilityLabel="View orders"
          hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }}
        >
          <Image source={require('../../../assets/icons/orders.png')} style={[styles.icon, { tintColor: themeHook.preference === 'dark' ? iconColor : undefined }]} />
          <Text style={[styles.serviceText, { color: textColor }]}>Orders</Text>
        </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.serviceButton,
      { backgroundColor: serviceBg, borderColor: serviceBorderColor },
      selectedService === 'track' && { backgroundColor: activeBg, borderColor: '#2EA36B' },
    ]}
    onPress={() => handleServicePress('track', 'TrackScreen')}
    accessibilityRole="button"
    accessibilityLabel="Track your runner"
    hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }}
  >
          <Image source={require('../../../assets/icons/trck.png')} style={[styles.icon, { tintColor: themeHook.preference === 'dark' ? iconColor : undefined }]} />
          <Text style={[styles.serviceText, { color: textColor }]}>Track</Text>
        </TouchableOpacity>
      </View>

      {/* Services Row 2 */}
      <View style={styles.servicesContainer}>
        {/* Chat with Runner */}
  <TouchableOpacity
    style={[
      styles.serviceButton,
      { backgroundColor: serviceBg, borderColor: serviceBorderColor },
      selectedService === 'chat' && { backgroundColor: activeBg, borderColor: '#2EA36B' },
    ]}
    onPress={() => { handleServicePress('chat'); setChatVisible(true); }}
    accessibilityRole="button"
    accessibilityLabel="Chat with runner"
    hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }}
  >
          <Image source={require('../../../assets/icons/chat.png')} style={[styles.icon, { tintColor: themeHook.preference === 'dark' ? iconColor : undefined }]} />
          <Text style={[styles.serviceText, { color: textColor }]}>Chat with Runner</Text>
        </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.serviceButton,
      { backgroundColor: serviceBg, borderColor: serviceBorderColor },
      selectedService === 'support' && { backgroundColor: activeBg, borderColor: '#2EA36B' },
    ]}
    onPress={() => { handleServicePress('support'); setSupportVisible(true); }}
    accessibilityRole="button"
    accessibilityLabel="Customer support"
    hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }}
  >
          <Image source={require('../../../assets/icons/support.png')} style={[styles.icon, { tintColor: themeHook.preference === 'dark' ? iconColor : undefined }]} />
          <Text style={[styles.serviceText, { color: textColor }]}>Customer Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.serviceButton,
            { backgroundColor: serviceBg, borderColor: serviceBorderColor },
            selectedService === 'wallet' && { backgroundColor: activeBg, borderColor: '#2EA36B' },
          ]}
          onPress={() => handleServicePress('wallet', 'Wallet')}
          accessibilityRole="button"
          accessibilityLabel="Wallet"
          hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }}
        >
          <Image source={require('../../../assets/icons/wallet.png')} style={styles.icon} />
          <Text style={[styles.serviceText, { color: textColor }]}>Wallet</Text>
        </TouchableOpacity>
      </View>

  <FooterRectangle showProfile={true} />

      {/* Chat Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={chatVisible}
        onRequestClose={() => setChatVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContainer,
              { transform: [{ translateY: pan }] },
            ]}
            {...panResponder.panHandlers}
          >
            {/* Drag handle */}
            <View style={styles.dragHandleContainer} {...panResponder.panHandlers}>
              <View style={styles.dragHandle} />
            </View>

            {/* Header */}
            <View style={styles.sheetHeaderRow}>
              <Text style={styles.sheetTitle}>Chat with Runner</Text>

              <View style={styles.runnerStatusRow}>
                <Text style={styles.runnerLocationText}>Runner at market</Text>
                <View style={styles.onlineDot} />
                <TouchableOpacity
                  accessibilityLabel="Close chat"
                  accessibilityRole="button"
                  onPress={() => setChatVisible(false)}
                  style={styles.smallCloseArea}
                  hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }}
                >
                  <Text style={styles.smallCloseText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.separator} />

            <ScrollView style={styles.sheetBody} contentContainerStyle={{ paddingBottom: 120 }}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Send Messages</Text>
                <Text style={styles.sectionText}>Type or send images to confirm items with your runner.</Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Track</Text>
                <Text style={styles.sectionText}>See your runner's live location and status at the top.</Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Confirm Orders</Text>
                <Text style={styles.sectionText}>Use quick buttons to approve replacements or updates.</Text>
              </View>
            </ScrollView>

            {/* Bottom input bar */}
            <View style={styles.inputBarContainer}>
              <View style={styles.avatarWrap}>
                <Image source={require('../../../assets/icons/runner.png')} style={styles.avatar} />
                <Text style={styles.avatarLabel}>Runner</Text>
              </View>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Chat with David Alfredo"
                  placeholderTextColor="#8A8A8A"
                />
              </View>

              <TouchableOpacity style={styles.plusButton}>
                <Text style={styles.plusText}>+</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>

      {/* Support Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={supportVisible}
        onRequestClose={() => setSupportVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContainer,
              { transform: [{ translateY: panSupport }] },
            ]}
            {...panResponderSupport.panHandlers}
          >
            <View style={styles.dragHandleContainer} {...panResponderSupport.panHandlers}>
              <View style={styles.dragHandle} />
            </View>

            <View style={styles.sheetHeaderRow}>
              <Text style={styles.sheetTitle}>Customer Support</Text>
              <View />
            </View>

            <View style={styles.separator} />

            <View style={styles.sheetBody}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>How can we help?</Text>
                <Text style={styles.sectionText}>Choose an option to get quick help from our team.</Text>
              </View>

              <View style={styles.separator} />

              <View style={styles.section}>
                <TouchableOpacity style={styles.supportOption}>
                  <Text style={styles.supportOptionText}>Report an issue</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.supportOption}>
                  <Text style={styles.supportOptionText}>Billing & Payments</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.supportOption}>
                  <Text style={styles.supportOptionText}>Other enquiries</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#F5F5F5',
  paddingHorizontal: 20,
  paddingTop: 18,
  },
  headerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: Math.round(6 * SCALE),
  },
  logo: {
  width: 112,
  height: 112,
  alignSelf: 'flex-start',
  marginBottom: 6,
  marginLeft: 8,
  },
  logoText: {
  fontSize: logoFontSize,
  // Use Poppins 
  fontFamily: 'Poppins-SemiBold',
  fontWeight: '600',
    marginLeft: 8,
    marginBottom: 6,
  },
  toggleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggleLabel: {
    fontSize: 14,
    color: '#333',
    marginRight: 6,
  },
  // outer wrapper that provides the shadow without clipping it
  headerShadowWrap: {
    width: '100%',
    marginBottom: Math.round(20 * SCALE),
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    // Android elevation
    elevation: 14,
  },
  // inner mask clips the image to rounded corners
  headerMask: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    // ensure children are clipped to radius
    overflow: 'hidden',
  },
  headerImageInner: {
    width: '100%',
    height: '100%',
  },
  subtitle: {
  fontSize: 16,
  color: '#6B6B6B',
  marginBottom: 12,
  marginLeft: 10,
  fontWeight: '600',
  },
  title: {
  // Slightly smaller and lighter than before
  fontSize: Math.max(14, Math.round(titleFontSize * 0.85)),
  fontWeight: '600',
  marginBottom: width * 0.02,
  alignSelf: 'flex-start',
  color: '#222',
  },
  titleLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#BDBDBD',
  marginBottom: Math.round(width * 0.04),
  },
  pillWrap: {
  paddingHorizontal: Math.round(3 * SCALE),
  paddingVertical: Math.round(1 * SCALE),
  },
  pillBackground: {
  width: pillWidth,
  height: pillHeight,
  borderRadius: 999,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: Math.round(5 * SCALE),
  position: 'relative',
  // subtle shadow for the pill
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 4,
  },
  pillDark: {
    backgroundColor: '#111',
  },
  pillLight: {
  backgroundColor: '#fff',
  borderWidth: 1,
  borderColor: '#EEE',
  },
  pillIconLeft: {
  width: 12,
  height: 12,
    tintColor: undefined,
  },
  pillIconRight: {
  width: 12,
  height: 12,
  },
  pillIconInner: {
    width: pillIconSize,
    height: pillIconSize,
    resizeMode: 'contain',
  },
  iconCircleLight: {
    width: iconCircleSize,
    height: iconCircleSize,
    borderRadius: iconCircleSize / 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Math.round(2 * SCALE),
  },
  iconCircleDark: {
    width: iconCircleSize,
    height: iconCircleSize,
    borderRadius: iconCircleSize / 2,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Math.round(2 * SCALE),
  },
  pillKnob: {
  position: 'absolute',
  width: pillKnobSize,
  height: pillKnobSize,
  borderRadius: pillKnobSize / 2,
  backgroundColor: '#fff',
  top: Math.round(1.5 * SCALE),
  left: '50%',
  marginLeft: -pillKnobSize / 2,
  elevation: 6,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.12,
  shadowRadius: 3,
  },
  servicesContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 16,
  },
  serviceButton: {
  flex: 1,
  alignItems: 'center',
  paddingVertical: Math.round(10 * SCALE),
  paddingHorizontal: Math.round(6 * SCALE),
  borderRadius: 12,
  backgroundColor: '#FFFFFF',
  marginHorizontal: Math.round(6 * SCALE),
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 4,
  },
  activeService: {
  backgroundColor: '#E6F7ED',
  borderWidth: 1,
  borderColor: '#2EA36B',
  },
  icon: {
  width: serviceIconSize,
  height: serviceIconSize,
  marginBottom: Math.round(8 * SCALE),
  },
  serviceText: {
  fontSize: Math.round(width * 0.034 * SCALE),
  textAlign: 'center',
  fontWeight: '600',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    height: height * 0.75, // 3/4 of screen
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  /* Bottom sheet / modal styles */
  sheetHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111111',
  },
  dragHandleContainer: {
    alignItems: 'center',
    // Increase the vertical touch area so Android users can easily start a drag
    paddingVertical: Math.round(12 * SCALE),
    minHeight: Math.round(44 * SCALE),
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  dragHandle: {
    width: 44,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  runnerStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  runnerLocationText: {
    color: '#6B6B6B',
    marginRight: 8,
    fontSize: 13,
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#28C76F',
    marginRight: 8,
  },
  smallCloseArea: {
  marginLeft: 8,
  padding: 6,
  borderRadius: 12,
  minWidth: 36,
  minHeight: 36,
  alignItems: 'center',
  justifyContent: 'center',
  },
  smallCloseText: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#E6E6E6',
    marginVertical: 10,
  },
  sheetBody: {
    flex: 1,
  },
  section: {
    paddingVertical: 8,
  },
  sectionTitle: {
    fontWeight: '700',
    color: '#111111',
    marginBottom: 6,
  },
  sectionText: {
    color: '#6B6B6B',
    lineHeight: 18,
  },
  inputBarContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  avatarWrap: {
    alignItems: 'center',
    marginRight: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  avatarLabel: {
  fontSize: 11,
  color: '#2EA36B',
  marginTop: 2,
  textAlign: 'center',
  fontWeight: '600',
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
  },
  textInput: {
    fontSize: 14,
    color: '#111111',
    padding: 0,
    height: 20,
  },
  plusButton: {
  width: 44,
  height: 44,
  borderRadius: 22,
  backgroundColor: '#FFFFFF',
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 2,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.06,
  shadowRadius: 2,
  },
  plusText: {
  fontSize: 22,
  color: '#666666',
  lineHeight: 22,
  },
  supportOption: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  supportOptionText: {
    fontSize: width * 0.042,
    color: '#222',
    fontWeight: '600',
  },
});
