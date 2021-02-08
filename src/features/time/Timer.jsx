import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Vibration } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import { ProgressBar } from 'react-native-paper';
import TimeButtons from './TimeButtons.jsx'
import CountDown from '../../components/CountDown.jsx';
import RoundedButton from '../../components/RoundedButton.jsx';
import { marginSizes, paddingSizes } from '../../utils/sizes';
import { colours } from '../../utils/colours';

const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
	useKeepAwake();

	const DEFAULT_TIME = 0.1;

	const [ minutes, setMinutes ] = useState(DEFAULT_TIME);
	const [ isStarted, setIsStarted ] = useState(false);
	const [ progress, setProgress ] = useState(1);

	const onProgress = progress => setProgress(progress);

	const changeTime = minutes => {
		setMinutes(minutes);
		setIsStarted(false);
		setProgress(1);
	};

	const vibrate = () => {
		if (Platform.OS === 'ios') {
			const interval = setInterval(() => Vibration.vibrate(), 1000);
			setTimeout(() => clearInterval(interval), 7000);
		} else {
			Vibration.vibrate(7000);
		};
	};

	const onEnd = () => {
		vibrate();
		setMinutes(DEFAULT_TIME);
		setIsStarted(false);
		setProgress(1);
		onTimerEnd();
	};

	return (
		<View style={styles.container}>
			<View style={styles.countDown}>
				<CountDown minutes={minutes} isPaused={!isStarted} onProgress={onProgress} onEnd={onEnd} />
			</View>
			<View style={{ marginTop: marginSizes.xxlarge}}>
				<Text style={styles.title}>Focussing On:</Text>
				<Text style={styles.task}>{focusSubject}</Text>
			</View>
			<View style={{marginTop: marginSizes.small}}>
				<ProgressBar style={{height: 7}} color={colours.purple} progress={progress} />
			</View>
			<View style={styles.buttonContainer}>
				<TimeButtons onChangeTime={changeTime} />
			</View>
			<View style={styles.buttonContainer}>
				{isStarted ? <RoundedButton title='PAUSE' onPress={() => setIsStarted(false)} /> : <RoundedButton title='START' onPress={() => setIsStarted(true)} />}
			</View>
			<View style={styles.clearSubject}>
				<RoundedButton title='-' size={50} onPress={clearSubject} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	title: {
		textAlign: 'center',
		color: colours.purple
	},
	task: {
		textAlign: 'center',
		fontWeight: 'bold',
		color: colours.purple
	},
	countDown: {
		flex: 0.5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonContainer: {
		flex: 0.3,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		margin: marginSizes.medium
	},
	clearSubject: {
		paddingBottom: paddingSizes.large,
		paddingLeft: paddingSizes.large
	}
});

export default Timer;