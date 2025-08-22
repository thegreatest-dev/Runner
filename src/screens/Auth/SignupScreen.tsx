import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

type AuthStackParamList = {
  Signup: undefined;
  Login: undefined;
};

export default function SignupScreen() {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList, 'Signup'>>();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const isAlphanumeric = (v: string) => /^[A-Za-z0-9]+$/.test(v);

  const handleSignUp = () => {
    // password must be at least 5 chars and only alphanumeric
    if (password.length < 5) {
      setError('Password must be at least 5 characters');
      return;
    }
    if (!isAlphanumeric(password)) {
      setError('Password must be alphanumeric (letters and numbers only)');
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setError('');
    // proceed to OTP screen (preserve existing behaviour)
    (navigation as any).navigate('OTPScreen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle} />
  <Text style={styles.title}>Create An{`\n`}Account</Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Image source={require('../../../assets/icons/user.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.inputWithIcon}
            placeholder="Full Name"
            placeholderTextColor="#A9A9A9"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Image source={require('../../../assets/icons/phone.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.inputWithIcon}
            placeholder="Phone Number"
            placeholderTextColor="#A9A9A9"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Image source={require('../../../assets/icons/mail.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.inputWithIcon}
            placeholder="Email"
            placeholderTextColor="#A9A9A9"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Image source={require('../../../assets/icons/password.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.inputWithIcon}
            placeholder="Password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={(t) => { setPassword(t); if (error) setError(''); }}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(v => !v)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Image source={passwordVisible ? require('../../../assets/icons/eyeopen.png') : require('../../../assets/icons/eyeclose.png')} style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Image source={require('../../../assets/icons/password.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.inputWithIcon}
            placeholder="Confirm Password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry={!confirmVisible}
            value={confirmPassword}
            onChangeText={(t) => { setConfirmPassword(t); if (error) setError(''); }}
          />
          <TouchableOpacity onPress={() => setConfirmVisible(v => !v)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Image source={confirmVisible ? require('../../../assets/icons/eyeopen.png') : require('../../../assets/icons/eyeclose.png')} style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.signInText}>
        Already have an account?{' '}
        <Text
          style={styles.signInLink}
          onPress={() => navigation.navigate('Login')}
        >
          Sign in
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  circle: {
    position: 'absolute',
    bottom: -width * 0.2,
    left: -width * 0.2,
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: '#B7E9CF',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 28,
    alignSelf: 'flex-start',
    textAlign: 'left',
    color: '#111',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 15,
    fontSize: 16,
  },
  inputRow: {
    width: '100%',
    height: 50,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#A9A9A9',
  },
  inputWithIcon: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  eyeIcon: { width: 20, height: 20, marginLeft: 8, tintColor: '#A9A9A9' },
  signUpButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#00A86B',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signUpText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  signInText: {
    fontSize: 14,
    color: '#A9A9A9',
    marginTop: 20,
  },
  signInLink: {
    color: '#00A86B',
    fontWeight: 'bold',
  },
  errorText: { color: '#d23f31', marginTop: 8 },
});
