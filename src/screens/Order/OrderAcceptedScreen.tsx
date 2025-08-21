import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function OrderAcceptedScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <Image
          source={require('../../../assets/images/sandy.png')} // Replace with runner's image
          style={styles.profileImage}
        />
        <Text style={styles.runnerName}>David Alfredo</Text>
      </View>
      <Text style={styles.statusText}>Runner has accepted your order</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('TrackScreen')}>
          <Text style={styles.buttonText}>Track Runner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('ChatScreen')}>
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomCircle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: width * 0.08,
  },
  profileImage: {
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: width * 0.14,
    marginBottom: width * 0.03,
    backgroundColor: '#eee',
  },
  runnerName: {
    fontSize: width * 0.05,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
  },
  statusText: {
    fontSize: width * 0.045,
    color: '#222',
    textAlign: 'center',
    marginBottom: width * 0.09,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: width * 0.12,
  },
  actionButton: {
    backgroundColor: '#27ae60',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: '500',
  },
  bottomCircle: {
    position: 'absolute',
    bottom: -width * 0.18,
    right: -width * 0.18,
    width: width * 0.45,
    height: width * 0.45,
    borderRadius: width * 0.225,
    backgroundColor: '#B9F3D6',
    opacity: 0.7,
  },
});
