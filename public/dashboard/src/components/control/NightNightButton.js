import React from 'react';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/styles';

const SleepButton = styled(Button)({
	margin: '10px',
	borderRadius: '100px',
	borderWidth: '5px',
	fontSize: '20px',
	padding: '20px 15px',
	borderColor: '#4200b7',
	color: '#4200b7',
	textAlign: 'center'
});

const NightNightButton = props => {
	function rvrLullaby() {
		// We use the sleep method on the RVR to put it into a "soft" sleep to save battery.
		props.rvrToy.sleep();
	}

	return (
		<SleepButton variant='outlined' onClick={rvrLullaby}>
			Sleepy
			<br />
			Time!
		</SleepButton>
	);
};

export default NightNightButton;
