import { useNavigation } from '@react-navigation/native';
import { useThemeColor } from '@/hooks/useThemeColor';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const bg = useThemeColor({}, 'background');
  const text = useThemeColor({}, 'text');
  const subtle = useThemeColor({}, 'icon');

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: bg }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: text }]}>Profile</Text>
        </View>

        <View style={styles.card}>
          <Image source={require('../../../assets/icons/profile.png')} style={styles.avatar} />
          <View style={styles.info}>
            <Text style={[styles.name, { color: text }]}>Daniel Akin</Text>
            <Text style={[styles.email, { color: subtle }]}>danielakin557@gmail.com</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logout} onPress={() => (navigation as any).replace('Login')}>
          <Image source={require('../../../assets/icons/logout.png')} style={styles.logoutIcon} />
          <Text style={[styles.logoutText, { color: '#d23f31' /* keep emphasis color */ }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20 },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: '700', color: '#111' },
  card: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fafafa', borderRadius: 12 },
  avatar: { width: 64, height: 64, borderRadius: 32, marginRight: 12 },
  info: {},
  name: { fontSize: 16, fontWeight: '700', color: '#111' },
  email: { fontSize: 13, color: '#666', marginTop: 4 },
  logout: { flexDirection: 'row', alignItems: 'center', marginTop: 24 },
  logoutIcon: { width: 20, height: 20, tintColor: '#d23f31', marginRight: 8 },
  logoutText: { color: '#d23f31', fontWeight: '700' },
});
