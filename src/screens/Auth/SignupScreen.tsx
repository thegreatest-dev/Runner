import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function SignupScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <Text style={styles.title}>Create an Account</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#A9A9A9"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#A9A9A9"
        />
      </View>

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
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#A9A9A9"
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.signUpButton}>
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
    backgroundColor: '#F9F9F9',
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
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
});
