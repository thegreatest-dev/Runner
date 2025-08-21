import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
// Footer removed for this screen

const { width } = Dimensions.get('window');

type Item = {
  id: number;
  item: string;
  amount: string;
};

export default function OrderRunnerScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState<Item>({ id: 0, item: '', amount: '' });
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('online'); // 'online' or 'wallet'
  const navigation = require('@react-navigation/native').useNavigation();

  const addItem = () => {
    if (newItem.item && newItem.amount) {
      setItems([...items, { ...newItem, id: Date.now() }]);
      setNewItem({ id: 0, item: '', amount: '' });
    }
  };

  const sendNote = () => {
    // For now, just clear the note to indicate it was "sent".
    // Replace with persistence / API call when available.
    if (note && note.trim().length > 0) {
      // You could push this to an API or attach to the current order draft
      console.log('Note saved:', note);
      // clear input to simulate send
      setNote('');
    }
  };

  // Animated send button scale
  const sendScale = useRef(new Animated.Value(1)).current;
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const onSendPressIn = () => {
    Animated.spring(sendScale, { toValue: 0.92, useNativeDriver: true }).start();
  };
  const onSendPressOut = () => {
    Animated.spring(sendScale, { toValue: 1, useNativeDriver: true }).start();
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = 500; // Fixed delivery fee
  const serviceFee = subtotal * 0.05; // 5% service fee
  const total = subtotal + deliveryFee + serviceFee;

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <TouchableOpacity style={styles.pageBack} onPress={() => navigation.goBack()}>
            <Image source={require('../../../assets/icons/arrowleft.png')} style={styles.pageBackIcon} />
          </TouchableOpacity>
          <Text style={styles.title}>ORDER A RUNNER</Text>
          <View style={styles.titleLine} />
          {/* Address */}
          <View style={styles.addressContainer}>
            <Image source={require('../../../assets/icons/search.png')} style={styles.searchIcon} />
            <TextInput 
              style={styles.addressInput} 
              placeholder="Enter a new address"
              value={address}
              onChangeText={setAddress}
            />
          </View>
          {/* Items: single rounded card containing inputs */}
          <View style={styles.itemRow}>
            <View style={styles.itemCard}>
              <TextInput 
                style={styles.itemInput} 
                placeholder="Item" 
                placeholderTextColor="#777"
                value={newItem.item}
                onChangeText={(text) => setNewItem({ ...newItem, item: text })}
              />
              <TextInput 
                style={styles.amountInput} 
                placeholder="Amount" 
                placeholderTextColor="#777"
                value={newItem.amount}
                onChangeText={(text) => setNewItem({ ...newItem, amount: text })}
                keyboardType="numeric"
              />
              {/* quantity removed */}
            </View>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={addItem}>
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
          {items.length > 0 && (
            <View style={styles.itemsList}>
              {items.map((item) => (
                <View key={item.id} style={styles.addedItem}>
                  <Text style={styles.addedItemText}>
                    {item.item} - ₦{item.amount}
                  </Text>
                </View>
              ))}
            </View>
          )}
          {/* NOTE (make it input) */}
          <View style={styles.noteContainer}
            accessible={true}
            accessibilityLabel="Leave a note for the runner"
          >
            <View style={styles.noteSeparator} />
            <View style={styles.noteRow}>
              <Image source={require('../../../assets/icons/runner.png')} style={styles.noteIcon} />
              <TextInput
                style={styles.noteInlineInput}
                placeholder="Leave a note for the runner"
                placeholderTextColor="#6B6B6B"
                value={note}
                onChangeText={setNote}
                multiline={false}
                underlineColorAndroid="transparent"
              />
              <AnimatedTouchable
                style={[
                  styles.sendButton,
                  { transform: [{ scale: sendScale }], opacity: note.trim().length > 0 ? 1 : 0.45 },
                ]}
                onPress={sendNote}
                onPressIn={onSendPressIn}
                onPressOut={onSendPressOut}
                disabled={note.trim().length === 0}
                accessibilityLabel="Send note"
              >
                <Image source={require('../../../assets/icons/send.png')} style={styles.sendIcon} />
              </AnimatedTouchable>
            </View>
          </View>
          {/* Payment Summary Header (full-width light gray bar) */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Payment Summary</Text>
          </View>
          <View style={styles.paymentSummary}>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Sub-total ({items.length} items)</Text>
              <Text style={styles.paymentValue}>₦{subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Delivery Fee</Text>
              <Text style={styles.paymentValue}>₦{deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Service Fee</Text>
              <Text style={styles.paymentValue}>₦{serviceFee.toFixed(2)}</Text>
            </View>
            <View style={[styles.paymentRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₦{total.toFixed(2)}</Text>
            </View>
          </View>
          {/* Payment Method */}
          <Text style={styles.paymentMethodTitle}>Payment Method</Text>
          <View style={styles.paymentMethods}>
            <TouchableOpacity 
              style={[styles.paymentOption, selectedPayment === 'online' && styles.selectedPaymentOption]}
              onPress={() => setSelectedPayment('online')}
            >
              <Image 
                source={require('../../../assets/icons/web.png')} 
                style={styles.paymentIcon} 
              />
              <Text style={styles.paymentOptionText}>Pay online</Text>
              <View style={[styles.radioButton, selectedPayment === 'online' && styles.radioButtonSelected]} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.paymentOption, selectedPayment === 'wallet' && styles.selectedPaymentOption]}
              onPress={() => setSelectedPayment('wallet')}
            >
              <Image 
                source={require('../../../assets/icons/wallet.png')} 
                style={styles.paymentIcon} 
              />
              <Text style={styles.paymentOptionText}>Wallet</Text>
              <View style={[styles.radioButton, selectedPayment === 'wallet' && styles.radioButtonSelected]} />
            </TouchableOpacity>
          </View>
          {/* Place Order */}
          <TouchableOpacity style={styles.placeOrderButton} onPress={() => navigation.navigate('OrderStatusScreen')}>
            <Text style={styles.placeOrderText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    zIndex: 10,
  },
  titleLine: {
  width: '100%',
  height: 1,
  backgroundColor: '#BDBDBD',
  marginBottom: width * 0.06,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    paddingBottom: 24,
  },
  container: {
    paddingHorizontal: width * 0.05,
    paddingTop: width * 0.04,
  paddingBottom: 24, // bottom padding
    backgroundColor: '#F5F5F5',
  },
  root: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
  fontSize: width * 0.055,
  fontWeight: 'bold',
  marginBottom: width * 0.02,
  alignSelf: 'flex-start',
  color: '#222',
  },
  
  // Address Input Styles
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.04,
    marginBottom: width * 0.05,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    width: width * 0.06,
    height: width * 0.06,
    marginRight: width * 0.025,
    tintColor: '#999',
  },
  addressInput: {
    flex: 1,
    height: width * 0.13,
    fontSize: width * 0.045,
    color: '#333',
  },

  // Item Row Styles
  itemRow: {
    marginBottom: width * 0.025,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.03,
    paddingVertical: width * 0.02,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  itemInput: {
    flex: 2,
    height: width * 0.12,
    backgroundColor: 'transparent',
    paddingHorizontal: width * 0.03,
    fontSize: width * 0.045,
    marginRight: width * 0.02,
  },
  amountInput: {
    flex: 1.2,
    height: width * 0.12,
    backgroundColor: 'transparent',
    paddingHorizontal: width * 0.03,
    fontSize: width * 0.045,
    marginRight: width * 0.02,
    textAlign: 'left',
  },
  

  // Add Button Styles
  addButton: {
  alignSelf: 'flex-end',
  paddingHorizontal: width * 0.05,
  height: width * 0.085,
  borderRadius: width * 0.04,
  backgroundColor: '#4CAF50',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: width * 0.01,
  marginBottom: width * 0.03,
  },
  addButtonText: {
  fontSize: width * 0.038,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Items List Styles
  itemsList: {
    marginBottom: width * 0.03,
  },
  addedItem: {
    backgroundColor: '#FFFFFF',
    padding: width * 0.025,
    borderRadius: width * 0.02,
    marginBottom: width * 0.012,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  addedItemText: {
    fontSize: width * 0.045,
    color: '#333',
  },

  // Note Section Styles
  noteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: width * 0.03,
    paddingHorizontal: width * 0.02,
    paddingTop: width * 0.015,
  },
  noteIcon: {
  width: width * 0.055,
  height: width * 0.055,
  marginRight: width * 0.02,
    resizeMode: 'contain',
    tintColor: undefined,
  },
  noteSeparator: {
    height: 1,
    backgroundColor: '#DADADA',
    marginBottom: width * 0.02,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: width * 0.012,
  },
  noteInlineInput: {
  flex: 1,
  fontSize: width * 0.04,
  color: '#333333',
  paddingVertical: 6,
  },
  sendButton: {
  marginLeft: width * 0.02,
  padding: width * 0.005,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
  width: width * 0.05,
  height: width * 0.05,
    resizeMode: 'contain',
  },
  noteInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.02,
    padding: width * 0.035,
    fontSize: width * 0.04,
    color: '#333',
    minHeight: width * 0.13,
  },
  notePlaceholder: {
    fontSize: width * 0.045,
    color: '#222',
    fontWeight: '400',
  },

  // Payment Summary Styles
  paymentSummary: {
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.02,
    padding: width * 0.04,
    marginBottom: width * 0.03,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  sectionHeader: {
    width: '100%',
    backgroundColor: '#F0F0F0',
    paddingVertical: 10,
    paddingHorizontal: width * 0.05,
    marginBottom: width * 0.02,
  },
  sectionHeaderText: {
    fontSize: width * 0.04,
    fontWeight: '600',
    color: '#333',
  },
  paymentSummaryTitle: {
    fontSize: width * 0.04,
    fontWeight: '500',
    marginBottom: width * 0.04,
    color: '#333',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: width * 0.02,
  },
  paymentLabel: {
    fontSize: width * 0.045,
    color: '#666',
  },
  paymentValue: {
    fontSize: width * 0.045,
    color: '#333',
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: width * 0.025,
    marginTop: width * 0.012,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#4CAF50',
  },

  // Payment Method Styles
  paymentMethodTitle: {
    fontSize: width * 0.04,
    fontWeight: '500',
    marginBottom: width * 0.04,
    color: '#333',
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: width * 0.05,
  },
  paymentOption: {
    flex: 1,
    alignItems: 'center',
    padding: width * 0.05,
    borderRadius: width * 0.02,
    backgroundColor: '#FFFFFF',
    marginHorizontal: width * 0.012,
    position: 'relative',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedPaymentOption: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  paymentIcon: {
    width: width * 0.11,
    height: width * 0.11,
    marginBottom: width * 0.02,
  },
  paymentOptionText: {
    fontSize: width * 0.045,
    textAlign: 'center',
    color: '#333',
    marginBottom: width * 0.025,
  },
  radioButton: {
    width: width * 0.055,
    height: width * 0.055,
    borderRadius: width * 0.0275,
    borderWidth: 2,
    borderColor: '#DDD',
    position: 'absolute',
    top: width * 0.04,
    right: width * 0.04,
  },
  radioButtonSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
  },

  // Place Order Button Styles
  placeOrderButton: {
    width: '70%',
    height: width * 0.10,
    borderRadius: width * 0.02,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  marginBottom: width * 0.06,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  placeOrderText: {
    fontSize: width * 0.04,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  pageBack: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: width * 0.01,
  },
  pageBackIcon: {
  width: 15,
  height: 15,
    tintColor: '#333',
  },
});