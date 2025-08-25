import { useThemePreference } from '@/context/ThemePreference';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import FooterRectangle, { FOOTER_HEIGHT } from '../../../components/FooterRectangle';

const { width } = Dimensions.get('window');

const DATA = [
  { id: '1', label: "Your Order has been accepted", time: '00:00', status: "done" },
  { id: '2', label: 'Runner is at the market', time: '12:20', status: "done" },
  { id: '3', label: "Your package is on its way", time: '14:00', status: "current" },
  { id: '4', label: 'Your Order has arrived', time: '—', status: "pending" },
];

export default function OngoingOrdersScreen() {
  const navigation = useNavigation();
  const themeHook = useThemePreference();
  const bgColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');

  const renderItem = ({ item, index }: { item: typeof DATA[0]; index: number }) => {
    const isFirst = index === 0;
    const isLast = index === DATA.length - 1;

    return (
  <View style={styles.timelineRow}>
        {/* Timeline indicator */}
        <View style={styles.timeline}>
          {!isFirst && <View style={styles.lineTop} />}
          <View
            style={[
              styles.circle,
              item.status === 'done' && styles.circleDone,
              item.status === 'current' && styles.circleCurrent,
            ]}
          />
          {!isLast && <View style={styles.lineBottom} />}
        </View>

        {/* Text content */}
        <View style={styles.rowContent}>
          <Text
            style={[
              styles.rowLabel,
              item.status === 'done' && styles.textDone,
              item.status === 'current' && styles.textCurrent,
              { color: item.status === 'done' ? '#4CAF50' : textColor },
            ]}
          >
            {item.label}
          </Text>
          <Text style={[styles.rowTime, { color: iconColor }]}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }] }>
      <Text style={[styles.title, { color: textColor }]}>TRACK ORDER</Text>
      <View style={[styles.titleLine, { backgroundColor: iconColor }]} />

  <Image source={require('../../../assets/images/track.png')} style={styles.trackImage} resizeMode="contain" />

  <View style={[styles.card, { backgroundColor: themeHook.preference === 'dark' ? '#1B1B1B' : '#fff' }]}>
        <FlatList
          data={DATA}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </View>

  {/* Footer */}
  <FooterRectangle isOrdersScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: width * 0.05,
    paddingTop: width * 0.06,
  },
  title: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: width * 0.02,
  },
  titleLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#BDBDBD',
    marginBottom: width * 0.04,
  },
  trackImage: {
    width: width * 0.62,
    height: width * 0.62,
    alignSelf: 'center',
    marginBottom: width * 0.06,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
  marginTop: width * 0.02,
  paddingVertical: 16,
    paddingHorizontal: 12,
  },
  listContent: {
    paddingBottom: FOOTER_HEIGHT + 20,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  timeline: {
    width: 30,
    alignItems: 'center',
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#E0E0E0',
    borderWidth: 2,
    borderColor: '#BDBDBD',
    zIndex: 1,
  },
  circleDone: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  circleCurrent: {
    backgroundColor: '#fff',
    borderColor: '#4CAF50',
  },
  lineTop: {
    position: 'absolute',
    top: -24,
    width: 2,
    height: 24,
    backgroundColor: '#BDBDBD',
  },
  lineBottom: {
    position: 'absolute',
    top: 14,
    width: 2,
    height: 24,
    backgroundColor: '#BDBDBD',
  },
  rowContent: {
    flex: 1,
    paddingLeft: 12,
  },
  rowLabel: {
    fontSize: 15,
    color: '#222',
    marginBottom: 4,
  },
  rowTime: {
    fontSize: 13,
    color: '#666',
  },
  textDone: {
    color: '#4CAF50',
    textDecorationLine: 'line-through',
  },
  textCurrent: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  bottomBar: {
    height: 64,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  // back button now provided by FooterRectangle when isOrdersScreen is true
});
