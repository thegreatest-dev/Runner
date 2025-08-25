import { useThemePreference } from '@/context/ThemePreference';
import { useThemeColor } from '@/hooks/useThemeColor';
import React, { useEffect } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OrderStatusScreen({ navigation }: any) {

	const themeHook = useThemePreference();
	const bgColor = useThemeColor({}, 'background');
	const textColor = useThemeColor({}, 'text');
	const tint = useThemeColor({}, 'tint');

	useEffect(() => {
		const t = setTimeout(() => {
			// after 10 seconds, navigate to OrderAcceptedScreen
			(navigation as any).replace('OrderAcceptedScreen');
		}, 10000);

		return () => clearTimeout(t);
	}, [navigation]);

	return (
			<View style={[styles.container, { backgroundColor: bgColor }]}>
				<View style={styles.centerContent}>
					<ActivityIndicator size={width * 0.12} color={tint} style={styles.spinner} />
					<Text style={[styles.statusText, { color: textColor }]}>Looking for an available runner</Text>
					<TouchableOpacity style={[styles.cancelButton, { backgroundColor: tint }]} onPress={() => navigation.goBack()}>
						<Text style={styles.cancelButtonText}>Cancel Order</Text>
					</TouchableOpacity>
				</View>
				<View style={[styles.bottomCircle, { backgroundColor: themeHook.preference === 'dark' ? '#0f3721' : '#B9F3D6' }]} />
			</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FAFAFA',
		justifyContent: 'center',
		alignItems: 'center',
	},
	centerContent: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	spinner: {
		marginBottom: 24,
	},
	statusText: {
		fontSize: width * 0.045,
		color: '#222',
		marginBottom: 32,
		textAlign: 'center',
	},
	cancelButton: {
		backgroundColor: '#27ae60',
		borderRadius: 24,
		paddingVertical: 12,
		paddingHorizontal: 36,
		alignItems: 'center',
		marginBottom: 16,
	},
	cancelButtonText: {
		color: '#fff',
		fontSize: width * 0.045,
		fontWeight: '500',
	},
	bottomCircle: {
		position: 'absolute',
		bottom: -width * 0.18,
		right: -width * 0.18,
		width: width * 0.45,
		height: width * 0.45,
		borderRadius: width * 0.225,
		backgroundColor: '#B9F3D6',
		opacity: 0.7,
	},
});
