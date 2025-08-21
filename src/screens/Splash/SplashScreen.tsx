// SplashScreen.js
// Splash screen UI
import React, { useEffect, useState } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

export default function SplashScreen() {
  const [logo1Position] = useState(new Animated.Value(-200)); // Start off-screen to the left

  useEffect(() => {
    Animated.timing(logo1Position, {
      toValue: 0, // Move to its final position
      duration: 1000, // Animation duration in milliseconds
      useNativeDriver: true,
    }).start();
  }, [logo1Position]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/icons/Logo2.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Animated.View style={{ transform: [{ translateX: logo1Position }] }}>
        <Image
          source={require('../../../assets/icons/Logo1.png')}
          style={styles.logo1}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  logo: {
    width: 132,
    height: 132,
    marginBottom: 0, // Removed spacing to bring Logo1.png directly under Logo2.png
  },
  logo1: {
    width: 150, // Increased width
    height: 150, // Increased height
  },
});
