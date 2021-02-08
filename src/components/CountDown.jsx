import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { paddingSizes, fontSizes } from '../utils/sizes';
import { colours } from '../utils/colours';

const minutesToMilliseconds = minutes => minutes * 60 * 1000;

const formatTime = time => time < 10 ? `0${time}` : time;

const CountDown = ({ minutes = 1, isPaused, onProgress, onEnd }) => {
	const [ milliseconds, setMilliseconds ] = useState(null);

	const interval = useRef(null);
	useEffect(() => {
		if (isPaused) {
			if (interval.current) {clearInterval(interval.current)};

			return;
		};
		
		interval.current = setInterval(countDown, 1000);

		return () => clearInterval(interval.current);
	}, [isPaused]);

	useEffect(() => setMilliseconds(minutesToMilliseconds(minutes)), [minutes]);

	const countDown = () => {
		setMilliseconds(time => {
			if (time === 0) {
				clearInterval(interval.current);

				return time;
			};

			const timeLeft = time - 1000;

			return timeLeft;
		});
	};

	useEffect(() => {
		onProgress(milliseconds / minutesToMilliseconds(minutes));

		if (milliseconds === 0) {
			onEnd();
		};
	}, [milliseconds]);

	const minutesLeft = Math.floor(milliseconds / 1000 / 60) % 60;
	const secondsLeft = Math.floor(milliseconds / 1000) % 60;

	return (
		<Text style={styles.text}>{formatTime(minutesLeft)}:{formatTime(secondsLeft)}</Text>
	);
};

const styles = StyleSheet.create({
	text: {
		padding: paddingSizes.large,
		fontSize: fontSizes.xxxlarge,
		fontWeight: 'bold',
		backgroundColor: 'rgba(94, 132, 226, 0.3)',
		color: colours.purple
	}
})

export default CountDown;