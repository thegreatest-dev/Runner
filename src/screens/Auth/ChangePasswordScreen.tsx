import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function ChangePasswordScreen() {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  const validateAndSubmit = () => {
    setError('');
    const alnum = /^[a-zA-Z0-9]+$/;
    if (password.length < 5) {
      setError('Password must be at least 5 characters');
      return;
    }
    if (!alnum.test(password)) {
      setError('Password must be alphanumeric');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    // Simulate submit then go to login
    (navigation as any).replace('Login');
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
        <Text style={styles.title}>Set New Password</Text>
        <Text style={styles.subtitle}>Create a unique password</Text>

        <Image source={require('../../../assets/images/setpass.png')} style={styles.illustration} resizeMode="contain" />

        <View style={styles.inputWrap}>
          <Text style={styles.fieldLabel}>New Password</Text>
          <TextInput
            secureTextEntry={!visible}
            placeholder="Create new password"
            style={styles.inputBox}
            value={password}
            onChangeText={setPassword}
          />

          <Text style={[styles.fieldLabel, { marginTop: 12 }]}>Confirm Password</Text>
          <TextInput
            secureTextEntry={!visible}
            placeholder="Re-enter password"
            style={styles.inputBox}
            value={confirm}
            onChangeText={setConfirm}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={[styles.resetButton, (password.length < 5 || password !== confirm) && { opacity: 0.6 }]} onPress={validateAndSubmit} disabled={password.length < 5 || password !== confirm}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  topCircle: { position: 'absolute', width: 220, height: 220, borderRadius: 110, backgroundColor: '#CFEFD9', left: -60, top: -60 },
  headerRow: { height: 44, justifyContent: 'center', paddingLeft: width * 0.06 },
  back: { paddingHorizontal: 8, paddingVertical: 8 },
  backIcon: { width: 18, height: 18, tintColor: '#222' },
  container: { paddingHorizontal: width * 0.06, paddingTop: 110 },
  title: { fontSize: 26, fontWeight: '700', color: '#111', marginTop: 8, alignSelf: 'flex-start' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 12, alignSelf: 'flex-start' },
  titleLine: { width: '100%', height: 1, backgroundColor: '#BDBDBD', marginBottom: width * 0.02 },
  illustration: { width: '100%', height: width * 0.46, marginBottom: 12 },
  inputWrap: { marginTop: 8 },
  fieldLabel: { fontSize: 13, color: '#222', marginBottom: 6 },
  inputBox: { width: '100%', height: 44, borderRadius: 8, backgroundColor: '#F0F0F0', borderWidth: 1, borderColor: '#DDD', paddingHorizontal: 12 },
  resetButton: { alignSelf: 'center', marginTop: 18, backgroundColor: '#2e8b57', paddingHorizontal: 48, paddingVertical: 12, borderRadius: 28 },
  resetText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  errorText: { color: '#d23f31', marginTop: 6 },
});
