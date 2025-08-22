import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined; // Add Dashboard to the stack param list
  App: undefined; // Add App to the stack param list
  ForgetPassword: undefined;
};

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList, 'Login'>>();
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <Text style={styles.title}>Let’s Get{'\n'}You Signed In!</Text>

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Image source={require('../../../assets/icons/mail.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#A9A9A9"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <Image source={require('../../../assets/icons/password.png')} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(v => !v)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Image source={passwordVisible ? require('../../../assets/icons/eyeopen.png') : require('../../../assets/icons/eyeclose.png')} style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => navigation.navigate('App')}
      >
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.signUpText}>
        Don’t have an account?{' '}
        <Text
          style={styles.signUpLink}
          onPress={() => navigation.navigate('Signup')}
        >
          Sign up
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
    top: -width * 0.2,
    right: -width * 0.2,
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: '#B7E9CF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'left', 
    alignSelf: 'flex-start', 
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
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
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#111',
  },
  eyeIcon: {
    width: 20,
    height: 20,
    marginLeft: 8,
    tintColor: '#A9A9A9',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#A9A9A9',
    textAlign: 'right',
    marginTop: 5,
  },
  signInButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#00A86B',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signInText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  signUpText: {
    fontSize: 14,
    color: '#A9A9A9',
    marginTop: 20,
  },
  signUpLink: {
    color: '#00A86B',
    fontWeight: 'bold',
  },
});
