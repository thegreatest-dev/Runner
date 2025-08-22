import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function OTPSuccessScreen() {
  const navigation = useNavigation();

  // Auto-redirect to Login after a short splash delay
  useEffect(() => {
    const t = setTimeout(() => {
      (navigation as any).replace('Login');
    }, 2200);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Image source={require('../../../assets/images/sandy2.png')} style={styles.illustration} resizeMode="contain" />
        <Text style={styles.title}>Account Created!</Text>
        <Text style={styles.subtitle}>Welcome to Errandly.</Text>

        <Text style={styles.successText}>Your account has been created{"\n"}Successfully!</Text>

        <TouchableOpacity style={styles.button} onPress={() => (navigation as any).replace('Login')}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  container: { paddingHorizontal: width * 0.08, paddingTop: width * 0.08, alignItems: 'center' },
  illustration: { width: width * 0.8, height: width * 0.6, marginBottom: 8 },
  title: { fontSize: 24, fontWeight: '700', color: '#111', alignSelf: 'flex-start', marginTop: 8 },
  subtitle: { fontSize: 14, color: '#666', alignSelf: 'flex-start', marginBottom: 12 },
  successText: { fontSize: 18, color: '#2e8b57', fontWeight: '700', marginVertical: 12, textAlign: 'center' },
  button: { backgroundColor: '#2e8b57', paddingVertical: 14, borderRadius: 28, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
