import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { paddingSizes, fontSizes } from '../utils/sizes';
import { colours } from '../utils/colours';

const minutesToMilliSeconds = minutes => minutes * 60 * 1000;

const forMatTime = time => time < 10 ? `0${time}` : time;

const CountDown = ({ minutes = 1, isPaused, onProgress, onEnd }) => {
	const [ milliSeconds, setMilliSeconds ] = useState(null);

	const interval = useRef(null);

	useEffect(() => {
		if (isPaused) {
			if (interval.current) {clearInterval(interval.current)};

			return;
		};

		interval.current = setInterval(countDown, 1000);

		return () => {clearInterval(interval.current)};
	}, [isPaused]);

	useEffect(() => {
		setMilliSeconds(minutesToMilliSeconds(minutes))
	}, [minutes]);

	const countDown = () => {
		setMilliSeconds(time => {
			if (time === 0) {
				clearInterval(interval.current);

				return time;
			};

			const timeLeft = time - 1000;

			return timeLeft;
		});
	};

	useEffect(() => {
		onProgress(milliSeconds / minutesToMilliSeconds(minutes));

		if (milliSeconds === 0) {
			onEnd();
		};
	}, [milliSeconds]);

	const minutesLeft = Math.floor(milliSeconds / 1000 / 60) % 60;
	const secondsLeft = Math.floor(milliSeconds / 1000) % 60;

	return <Text style={styles.text}>{forMatTime(minutesLeft)}:{forMatTime(secondsLeft)}</Text>
};

const styles = StyleSheet.create({
	text: {
		padding: paddingSizes.large,
		fontSize: fontSizes.xxxlarge,
		fontWeight: 'bold',
		backgroundColor: 'rgba(94, 132, 226, 0.3)',
		color: colours.purple
	}
});

export default CountDown;