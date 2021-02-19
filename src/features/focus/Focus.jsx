import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import RoundedButton from '../../components/RoundedButton.jsx';
import { marginSizes, paddingSizes, fontSizes } from '../../utils/sizes';
import { colours } from '../../utils/colours';

const Focus = ({ addSubject }) => {
	const [ subject, setSubject ] = useState(null);

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<Text style={styles.title}>What Would You Like To Focus On?</Text>
				<View style={styles.textInPutContainer}>
					<TextInput style={{flex: 1, marginRight: marginSizes.medium}} onSubmitEditing={({ nativeEvent }) => {setSubject(nativeEvent.text)}} />
					<RoundedButton title='+' size={49} onPress={() => {addSubject(subject)}} />
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 0.5
	},
	innerContainer: {
		flex: 1,
		justifyContent: 'center',
		padding: paddingSizes.medium
	},
	title: {
		fontSize: fontSizes.large,
		fontWeight: 'bold',
		color: colours.purple
	},
	textInPutContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: paddingSizes.medium
	}
});

export default Focus;