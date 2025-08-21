import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined; // Add Dashboard to the stack param list
  App: undefined; // Add App to the stack param list
};

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList, 'Login'>>();

  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <Text style={styles.title}>Let’s Get{'\n'}You Signed In!</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A9A9A9"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
        />
        <TouchableOpacity>
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
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 15,
    fontSize: 16,
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
