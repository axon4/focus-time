import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import Focus from './src/features/focus/Focus.jsx';
import FocusHistory from './src/features/focus/FocusHistory.jsx';
import Timer from './src/features/time/Timer.jsx';
import { paddingSizes } from './src/utils/sizes';
import { colours } from './src/utils/colours';

function Application() {
	const STATI = {
		COMPLETE: 1,
		CANCELLED: 2
	};

	const [ focusSubject, setFocusSubject ] = useState(null);
	const [ focusHistory, setFocusHistory ] = useState([]);

	useEffect(() => {
		loadFocusHistory();
	}, []);

	const addFocusHistorySubjectWithStatus = (subject, status) => {
		setFocusHistory([...focusHistory, { key: String(focusHistory.length + 1), subject, status }]);
	};

	const saveFocusHistory = async () => {
		try {
			await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
		} catch (error) {
			console.error(error);
		};
	};

	const loadFocusHistory = async () => {
		try {
			const savedFocusHistory = await AsyncStorage.getItem('focusHistory');

			if (saveFocusHistory && JSON.parse(savedFocusHistory).length) {
				setFocusHistory(JSON.parse(savedFocusHistory));
			};
		} catch (error) {
			console.error(error);
		};
	};

	useEffect(() => {
		saveFocusHistory();
	}, [focusHistory]);

	const onClear = () => {
		setFocusHistory([]);
	};

	return (
		<View style={styles.container}>
			{focusSubject ? (
				<Timer
					focusSubject={focusSubject}
					clearSubject={() => {
						addFocusHistorySubjectWithStatus(focusSubject, STATI.CANCELLED);
						setFocusSubject(null);
					}}
					onTimerEnd={() => {
						addFocusHistorySubjectWithStatus(focusSubject, STATI.COMPLETE);
						setFocusSubject(null);
					}}
				/>
			) : (
				<View style={{flex: 1}}>
					<Focus addSubject={setFocusSubject} />
					<FocusHistory focusHistory={focusHistory} onClear={onClear} />
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: paddingSizes.medium,
		backgroundColor: colours.wheat
	}
});

export default Application;