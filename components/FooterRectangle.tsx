import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const { width } = Dimensions.get('window');

export const FOOTER_HEIGHT = 61;

const FooterRectangle = ({ isOrdersScreen, showProfile, style }: { isOrdersScreen?: boolean; showProfile?: boolean; style?: any }) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={[styles.footerRectangle, style]}>
      {isOrdersScreen && (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/icons/arrowleft.png')} style={styles.backIcon} />
        </TouchableOpacity>
      )}
      {/* Left: profile avatar + name (only when explicitly requested) */}
      {showProfile ? (
        <TouchableOpacity style={styles.profileWrap} onPress={() => setMenuVisible(!menuVisible)} accessibilityLabel="Open profile menu">
          <Image source={require('../assets/icons/profile.png')} style={styles.profileIcon} />
          <View style={styles.profileNameWrap}>
            <View style={styles.profileBadge} />
            <View>
              <Text style={styles.profileName}>Daniel Akani</Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View />
      )}

      {/* Right: logout button (only when explicitly requested) */}
      {showProfile ? (
        <TouchableOpacity style={styles.logoutWrap} onPress={() => (navigation as any).replace('Login')}>
          <Image source={require('../assets/icons/logout.png')} style={styles.logoutIcon} />
        </TouchableOpacity>
      ) : (
        <View />
      )}

      {/* Profile popover */}
      {menuVisible && showProfile && (
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.popoverOverlay}>
            <View style={styles.popover}>
              <View style={styles.popoverHeader}>
                <Image source={require('../assets/icons/profile.png')} style={styles.popoverAvatar} />
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.popoverName}>Daniel Akani</Text>
                  <Text style={styles.popoverEmail}>danielakin557@gmail.com</Text>
                </View>
              </View>
              {/* Sign out removed per request */}
            </View>
          </View>
        </TouchableWithoutFeedback>
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
  popoverOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 70,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  popover: {
    width: 260,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  popoverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  popoverAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  popoverName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  popoverEmail: {
    fontSize: 12,
    color: '#666',
  },
  // sign out option removed
});

export default FooterRectangle;
