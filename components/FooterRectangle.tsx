import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export const FOOTER_HEIGHT = 61;

const FooterRectangle = ({ isOrdersScreen, showProfile, style }: { isOrdersScreen?: boolean; showProfile?: boolean; style?: any }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.footerRectangle, style]}>
      {isOrdersScreen && (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/icons/arrowleft.png')} style={styles.backIcon} />
        </TouchableOpacity>
      )}
      {/* Left: profile avatar + name (only when explicitly requested) */}
      {showProfile ? (
        <View style={styles.profileWrap}>
          <Image source={require('../assets/icons/profile.png')} style={styles.profileIcon} />
          <View style={styles.profileNameWrap}>
            <View style={styles.profileBadge} />
            <TouchableOpacity onPress={() => (navigation as any).navigate('Profile')}>
              <View>
                <Text style={styles.profileName}>Daniel Akani</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View />
      )}

      {/* Right: logout button (only when explicitly requested) */}
      {showProfile ? (
        <TouchableOpacity style={styles.logoutWrap} onPress={() => console.log('Logout pressed')}>
          <Image source={require('../assets/icons/logout.png')} style={styles.logoutIcon} />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footerRectangle: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 61,
    backgroundColor: '#F0F0F0',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
  width: 15,
  height: 15,
  },
  profileWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  profileNameWrap: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F0A500',
    marginRight: 8,
  },
  profileName: {
    fontSize: 14,
    color: '#111',
  },
  logoutWrap: {
    padding: 8,
  },
  logoutIcon: {
    width: 22,
    height: 22,
    tintColor: '#666',
  },
});

export default FooterRectangle;
