import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ForgetPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

  const handleSend = () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setLoading(true);

    // Simulate API call to send reset link, then navigate to OTP screen
    setTimeout(() => {
      setLoading(false);
      (navigation as any).navigate('OTPScreen', { email });
    }, 900);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.topCircle} pointerEvents="none" />

      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.back} onPress={() => (navigation as any).goBack()} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <Image source={require('../../../assets/icons/arrowleft.png')} style={styles.backIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>We got you.</Text>

        <View style={styles.illustrationWrap}>
          <View style={styles.cardContent}>
            <Image source={require('../../../assets/images/forget.png')} style={styles.leftIllustration} resizeMode="contain" />

            <View style={styles.codePill}>
              <Text style={styles.codeText}>* * * *</Text>
            </View>
          </View>

          <Text style={styles.illustrationNote}>We'll send you a code to reset it</Text>
        </View>

        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email address"
          placeholderTextColor="#A9A9A9"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(t) => {
            setEmail(t);
            if (error) setError('');
          }}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleSend} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send Code</Text>}
        </TouchableOpacity>

        <TouchableOpacity style={styles.backToLogin} onPress={() => (navigation as any).navigate('Login')}>
          <Text style={styles.backToLoginText}>Back to log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  topCircle: { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: '#CFEFD9', left: -60, top: -60 },
  headerRow: { height: 44, justifyContent: 'center', paddingLeft: width * 0.06 },
  back: { paddingHorizontal: 8, paddingVertical: 8 },
  backIcon: { width: 18, height: 18, tintColor: '#222' },
  container: { paddingHorizontal: width * 0.06, paddingTop: 110 },
  title: { fontSize: 22, fontWeight: '700', color: '#111', marginTop: 18 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 12 },
  illustrationWrap: {
    backgroundColor: '#CFEFD9',
    borderRadius: 28,
    padding: 18,
    alignItems: 'center',
    marginVertical: 12,
    // stronger drop shadow (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    // stronger elevation for Android
    elevation: 6,
  },
  cardContent: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  leftIllustration: { width: width * 0.48, height: 140 },
  codePill: {
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    // subtle shadow for pill
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  codeText: { fontSize: 18, fontWeight: '800', color: '#2e8b57', letterSpacing: 6 },
  illustrationNote: { fontSize: 14, color: '#111', marginTop: 12, textAlign: 'center' },
  label: { fontSize: 13, color: '#222', marginTop: 14, marginBottom: 6 },
  input: { width: '100%', height: 44, borderRadius: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: '#DDD', paddingHorizontal: 12 },
  errorText: { color: '#d23f31', marginTop: 6 },
  button: { alignSelf: 'center', marginTop: 18, backgroundColor: '#2e8b57', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 28 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  backToLogin: { alignSelf: 'center', marginTop: 12 },
  backToLoginText: { color: '#2e8b57', fontWeight: '600' },
});
