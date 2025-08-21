import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OrderStatusScreen({ navigation }: any) {
	return (
		<View style={styles.container}>
			<View style={styles.centerContent}>
				<ActivityIndicator size={width * 0.12} color="#27ae60" style={styles.spinner} />
				<Text style={styles.statusText}>Looking for an available runner</Text>
				<TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
					<Text style={styles.cancelButtonText}>Cancel Order</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.bottomCircle} />
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
