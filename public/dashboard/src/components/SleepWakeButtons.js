import React from 'react';
import WakeUpButton from './control/WakeUpButton';
import NightNightButton from './control/NightNightButton';
import { Paper, Card, Grid } from '@material-ui/core';
import { styled } from '@material-ui/styles';

const SleepWakeSection = styled(Paper)({
	padding: '10px',
	background: 'transparent',
	boxShadow: 'none'
});

const ButtonCard = styled(Card)({
	margin: '15px',
	padding: '10px',
	textAlign: 'center'
});

// Sleep/Wake Buttons allows us to group together the buttons that you can press to send RVR into soft sleep or to wake RVR up so that you can begin sending it commands. We place the buttons on a card to organize them, but we don't actually want to see the card containing them, so we make the background transparent in the SleepWakeSection styled component above.
const SleepWakeButtons = props => {
	return (
		<React.Fragment>
			<SleepWakeSection>
				<Grid container direction='column' alignItems='center'>
					<Grid item xs>
						<ButtonCard>
							<WakeUpButton rvrToy={props.rvrToy}></WakeUpButton>
						</ButtonCard>
					</Grid>
					<Grid item xs>
						<ButtonCard>
							<NightNightButton rvrToy={props.rvrToy}></NightNightButton>
						</ButtonCard>
					</Grid>
				</Grid>
			</SleepWakeSection>
		</React.Fragment>
	);
};

export default SleepWakeButtons;
