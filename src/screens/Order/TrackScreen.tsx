// TrackScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function TrackScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TRACK</Text>
      <View style={styles.titleLine} />

      <View style={styles.centerContent}>
  <Image source={require('../../../assets/images/sandy2.png')} style={styles.illustration} />
        <Text style={styles.emptyText}>There’s nothing to track here</Text>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.backTiny} onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/icons/arrowleft.png')} style={styles.backTinyIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: width * 0.05,
    paddingTop: width * 0.06,
  },
  title: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#222',
    alignSelf: 'flex-start',
    marginBottom: width * 0.02,
  },
  titleLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#BDBDBD',
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
    fontSize: width * 0.038,
    color: '#333',
    textAlign: 'center',
  },
  bottomBar: {
    height: 64,
    backgroundColor: '#F0F0F0',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  backTiny: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backTinyIcon: {
    width: 16,
    height: 16,
  },
});
