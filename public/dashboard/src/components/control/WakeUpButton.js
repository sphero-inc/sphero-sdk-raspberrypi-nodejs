import React from 'react';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/styles';

const WakeButton = styled(Button)({
	margin: '10px',
	borderRadius: '100px',
	borderWidth: '5px',
	fontSize: '20px',
	padding: '20px 25px',
	borderColor: '#4200b7',
	color: '#4200b7',
	textAlign: 'center'
});

const WakeUpButton = props => {
	function wakeUpRvr() {
		// In order to make requests of RVR to *do* anything (drive, change lights, etc), the RVR must be powered on and not in soft- or deep sleep. We've included a button that calls the RVR wake function to allow users to quickly and easily get their RVR ready for action.
		props.rvrToy.wake();
	}

	return (
		<WakeButton variant='outlined' onClick={wakeUpRvr}>
			WAKE
			<br />
			UP!
		</WakeButton>
	);
};

export default WakeUpButton;
