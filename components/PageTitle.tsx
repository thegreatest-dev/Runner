import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('window');

type Props = {
  title?: string;
  children?: React.ReactNode;
  style?: any;
};

export default function PageTitle({ title, children, style }: Props) {
  return (
    <View style={[styles.wrap, style]}>
      {title ? <Text style={styles.title}>{title}</Text> : children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
  },
  title: {
    fontSize: width * 0.055,
    fontWeight: 'bold',
    color: '#222',
    alignSelf: 'flex-start',
    marginBottom: width * 0.02,
  },
});
