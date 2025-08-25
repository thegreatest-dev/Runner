import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function OTPSuccessScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  // Auto-redirect after a short splash delay. Use route.params.next to decide the next screen
  useEffect(() => {
    const next = (route.params as any)?.next || 'Login';
    const t = setTimeout(() => {
      (navigation as any).replace(next);
    }, 2200);
    return () => clearTimeout(t);
  }, [navigation, route.params]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <View style={styles.topAccent} />
        <View style={styles.content}>
          <Text style={styles.title}>Account Created!</Text>
          <Text style={styles.subtitle}>Welcome to Errandly.</Text>

          <Image source={require('../../../assets/images/success.png')} style={styles.illustration} resizeMode="contain" />

          <Text style={styles.successText}>Your account has been created
            <Text style={styles.successLine}>{"\n"}Successfully!</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, backgroundColor: '#fff' },
  topAccent: {
    position: 'absolute',
    top: -Math.round(width * 0.12),
    left: -Math.round(width * 0.08),
    width: Math.round(width * 0.36),
    height: Math.round(width * 0.36),
    borderRadius: Math.round(width * 0.18),
    backgroundColor: '#CFF5DE',
  },
  content: { flex: 1, paddingHorizontal: width * 0.08, paddingTop: width * 0.1, alignItems: 'center' },
  illustration: { width: width * 0.7, height: width * 0.45, marginVertical: 12 },
  title: { fontSize: 20, fontWeight: '700', color: '#111', alignSelf: 'flex-start', marginTop: 8 },
  subtitle: { fontSize: 13, color: '#666', alignSelf: 'flex-start', marginBottom: 12 },
  successText: { fontSize: 18, color: '#2EA36B', fontWeight: '700', marginVertical: 12, textAlign: 'center' },
  successLine: { fontSize: 20, color: '#2EA36B', fontWeight: '800' },
});
