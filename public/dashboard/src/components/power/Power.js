import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import BatteryPercentage from './BatteryPercentage';
import BatteryVoltage from './BatteryVoltage';
import VoltageState from './VoltageState';
import { styled } from '@material-ui/styles';

const PowerPaper = styled(Paper)({
	padding: '10px',
	margin: '20px',
	color: 'dark-gray',
	height: '415px'
});

const Title = styled(Typography)({
	fontSize: '24px'
});

const StyledSubGrid = styled(Grid)({
	margin: '30px 30px'
});

// We pass rvrToy into each of our components via props, as the commands to retrieve battery information are all called directly on the SpheroRvrToy object (which we created an instance of in App.js, called rvrToy, to use across this application). 

const VersionDetails = props => {
	return (
		<React.Fragment>
			<PowerPaper>
				<Title gutterBottom>Power Info</Title>
				<Grid>
					<Grid container direction='row' alignItems='center'>
						<StyledSubGrid item>
							<BatteryPercentage rvrToy={props.rvrToy}>xs=3</BatteryPercentage>
						</StyledSubGrid>
						<StyledSubGrid item>
							<BatteryVoltage rvrToy={props.rvrToy}>xs=3</BatteryVoltage>
						</StyledSubGrid>
					</Grid>
					<Grid container direction='row' alignItems='center'>
						<StyledSubGrid item>
							<VoltageState rvrToy={props.rvrToy}>xs=3</VoltageState>
						</StyledSubGrid>
						<StyledSubGrid item></StyledSubGrid>
					</Grid>
				</Grid>
			</PowerPaper>
		</React.Fragment>
	);
};

export default VersionDetails;
