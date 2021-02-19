import React, { Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import RoundedButton from '../../components/RoundedButton.jsx';

const TimeButtons = ({ onChangeTime }) => {
	return (
		<Fragment>
			<View style={styles.timeButton}>
				<RoundedButton title='7' size={75} onPress={() => {onChangeTime(7)}} />
			</View>
			<View style={styles.timeButton}>
				<RoundedButton title='13' size={75} onPress={() => {onChangeTime(13)}} />
			</View>
			<View style={styles.timeButton}>
				<RoundedButton title='19' size={75} onPress={() => {onChangeTime(19)}} />
			</View>
		</Fragment>
	);
};

const styles = StyleSheet.create({
	timeButton: {
		flex: 1,
		alignItems: 'center'
	}
});

export default TimeButtons;