import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import RoundedButton from '../../components/RoundedButton.jsx';
import { paddingSizes, fontSizes } from '../../utils/sizes';
import { colours } from '../../utils/colours';

const HistoryItem = ({ index, item }) => {
	return (
		<Text style={styles.historyItem(item.status)}>{item.subject}</Text>
	);
};

const FocusHistory = ({ focusHistory, onClear }) => {
	const clearHistory = () => onClear();

	return (
		<SafeAreaView style={{flex: 0.5, alignItems: 'center'}}>
			{!!focusHistory.length && (
				<>
					<Text style={styles.title}>Things We've Focussed on:</Text>
					<FlatList
						style={{flex: 1}}
						contentContainerStyle={{flex: 1, alignItems: 'center'}}
						data={focusHistory}
						renderItem={HistoryItem}
					/>
					<View style={styles.clearContainer}>
						<RoundedButton title='CLEAR' size={75} onPress={onClear} />
					</View>
				</>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: fontSizes.large,
		color: colours.purple
	},
	historyItem: status => ({
		fontSize: fontSizes.medium,
		color: status > 1 ? 'red' : 'green'
	}),
	clearContainer: {
		alignItems: 'center',
		padding: paddingSizes.medium
	}
});

export default FocusHistory;