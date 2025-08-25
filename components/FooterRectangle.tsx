import { useThemePreference } from '@/context/ThemePreference';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

const { width } = Dimensions.get('window');

export const FOOTER_HEIGHT = 64;

type FooterProps = {
  isOrdersScreen?: boolean;
  showProfile?: boolean;
  style?: any;
  position?: 'absolute' | 'relative';
  showBack?: boolean;
  background?: string;
  paddingHorizontal?: number;
};

const FooterRectangle = ({ isOrdersScreen, showProfile, style, position = 'absolute', showBack = true, background, paddingHorizontal = 12 }: FooterProps) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const themeHook = useThemePreference();
  const bg = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');

  const defaultFooterBg = background ?? (themeHook.preference === 'dark' ? '#153f33' : '#DFF7EF');

  const containerStyle = [
    styles.footerRectangle,
    { backgroundColor: defaultFooterBg, paddingHorizontal, paddingVertical: (FOOTER_HEIGHT - 40) / 2 },
    position === 'absolute' ? styles.footerAbsolute : styles.footerRelative,
    style,
  ];

  return (
  <View style={containerStyle}>
      {isOrdersScreen && showBack && (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()} accessibilityRole="button" accessibilityLabel="Go back">
          <Image source={require('../assets/icons/arrowleft.png')} style={[styles.backIcon, { tintColor: themeHook.preference === 'dark' ? '#FFFFFF' : '#08302b' }]} />
        </TouchableOpacity>
      )}
      {/* Left: profile avatar + name (only when explicitly requested) */}
      {showProfile ? (
          <TouchableOpacity style={styles.profileWrap} onPress={() => setMenuVisible(!menuVisible)} accessibilityLabel="Open profile menu">
          <Image source={require('../assets/icons/profile.png')} style={styles.profileIcon} />
          <View style={styles.profileNameWrap}>
            <View style={styles.profileBadge} />
            <View>
              <Text style={[styles.profileName, { color: textColor }]}>Daniel Akani</Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View />
      )}

      {/* Right: logout button (only when explicitly requested) */}
      {showProfile ? (
        <TouchableOpacity style={styles.logoutWrap} onPress={() => (navigation as any).replace('Login')}>
          <Image source={require('../assets/icons/logout.png')} style={[styles.logoutIcon, { tintColor: iconColor }]} />
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
                    <Text style={[styles.popoverName, { color: textColor }]}>Daniel Akani</Text>
                    <Text style={[styles.popoverEmail, { color: textColor }]}>danielakin557@gmail.com</Text>
                  </View>
              </View>
              {/* Sign out */}
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footerRectangle: {
    // base styles shared between absolute and relative modes
    width: '100%',
    height: FOOTER_HEIGHT,
    backgroundColor: '#DAF1DE',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 12,
  },
  footerAbsolute: {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 50,
  elevation: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: -4 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  },
  footerRelative: {
    position: 'relative',
  },
  backButton: {
  width: 40,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'flex-start',
  marginLeft: 0,
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
