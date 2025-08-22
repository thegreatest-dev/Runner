import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  PanResponder,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FooterRectangle from '../../../components/FooterRectangle';

const { width, height } = Dimensions.get('window');

type AppStackParamList = {
  Dashboard: undefined;
  OrderRunner: undefined;
  Orders: undefined;
  Profile: undefined;
};

export default function DashboardScreen() {
  const navigation = useNavigation<StackNavigationProp<AppStackParamList, 'Dashboard'>>();

  const [chatVisible, setChatVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [supportVisible, setSupportVisible] = useState(false);
  const pan = useRef(new Animated.Value(0)).current;
  const panSupport = useRef(new Animated.Value(0)).current;

  const handleServicePress = (key: string, route?: string) => {
    // show active state immediately
    setSelectedService(key);
    // wait a short moment so the active visual appears, then navigate (if provided)
    setTimeout(() => {
      if (route) {
        (navigation as any).navigate(route);
      }
      // clear active state after navigation/brief delay
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../../../assets/icons/Logo1.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Header Image wrapped in a rounded mask so shadow is visible */}
      <View style={[styles.headerMask, { width: width, height: height * 0.2 }]}> 
        <Image
          source={require('../../../assets/images/dambe.png')}
          style={styles.headerImageInner}
          resizeMode="cover"
        />
      </View>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Services</Text>

      {/* Services Row 1 */}
      <View style={styles.servicesContainer}>
        <TouchableOpacity
          style={[styles.serviceButton, selectedService === 'order' && styles.activeService]}
          onPress={() => handleServicePress('order', 'OrderRunner')}
        >
          <Image source={require('../../../assets/icons/order.png')} style={styles.icon} />
          <Text style={styles.serviceText}>Order a Runner</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.serviceButton, selectedService === 'orders' && styles.activeService]}
          onPress={() => handleServicePress('orders', 'Orders')}
        >
          <Image source={require('../../../assets/icons/orders.png')} style={styles.icon} />
          <Text style={styles.serviceText}>Orders</Text>
        </TouchableOpacity>

  <TouchableOpacity style={[styles.serviceButton, selectedService === 'track' && styles.activeService]} onPress={() => handleServicePress('track', 'TrackScreen')}>
          <Image source={require('../../../assets/icons/trck.png')} style={styles.icon} />
          <Text style={styles.serviceText}>Track</Text>
        </TouchableOpacity>
      </View>

      {/* Services Row 2 */}
      <View style={styles.servicesContainer}>
        {/* Chat with Runner */}
  <TouchableOpacity style={[styles.serviceButton, selectedService === 'chat' && styles.activeService]} onPress={() => { handleServicePress('chat'); setChatVisible(true); }}>
          <Image source={require('../../../assets/icons/chat.png')} style={styles.icon} />
          <Text style={styles.serviceText}>Chat with Runner</Text>
        </TouchableOpacity>

  <TouchableOpacity style={[styles.serviceButton, selectedService === 'support' && styles.activeService]} onPress={() => { handleServicePress('support'); setSupportVisible(true); }}>
          <Image source={require('../../../assets/icons/support.png')} style={styles.icon} />
          <Text style={styles.serviceText}>Customer Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.serviceButton, selectedService === 'wallet' && styles.activeService]} onPress={() => handleServicePress('wallet')}>
          <Image source={require('../../../assets/icons/wallet.png')} style={styles.icon} />
          <Text style={styles.serviceText}>Wallet</Text>
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
            <View style={styles.dragHandleContainer}>
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
                  onPress={() => setChatVisible(false)}
                  style={styles.smallCloseArea}
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
            <View style={styles.dragHandleContainer}>
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
  logo: {
  width: 112,
  height: 112,
  alignSelf: 'flex-start',
  marginBottom: 6,
  marginLeft: 8,
  },
  headerMask: {
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    // Android elevation
    elevation: 14,
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
  servicesContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 16,
  },
  serviceButton: {
  flex: 1,
  alignItems: 'center',
  paddingVertical: 14,
  paddingHorizontal: 8,
  borderRadius: 12,
  backgroundColor: '#FFFFFF',
  marginHorizontal: 6,
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
  width: 48,
  height: 48,
  marginBottom: 8,
  },
  serviceText: {
  fontSize: width * 0.034,
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
    paddingVertical: 8,
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
