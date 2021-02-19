import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const RoundedButton = ({ style = {}, textStyle = {}, size = 125, ...props }) => {
	return (
		<TouchableOpacity style={[styles(size).radius, style]}>
			<Text style={[styles(size).text, textStyle]} onPress={props.onPress}>{props.title}</Text>
		</TouchableOpacity>
	);
};

const styles = size => StyleSheet.create({
	radius: {
		width: size,
		height: size,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderRadius: size / 2,
		borderColor: '#847DAB'
	},
	text: {
		fontSize: size / 3.5,
		color: '#847DAB'
	}
});

export default RoundedButton;