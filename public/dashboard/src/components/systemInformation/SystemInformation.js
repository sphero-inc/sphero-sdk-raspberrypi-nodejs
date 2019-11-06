import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import MainAppVersion from './MainAppVersion';
import BootloaderVersion from './BootloaderVersion';
import BoardRevision from './BoardRevision';
import { styled } from '@material-ui/styles';
import MACAddress from './MACAddress';
import SKU from './SKU';
import BluetoothAdvertisingName from './BluetoothAdvertisingName';

const SystemInformationPaper = styled(Paper)({
	padding: '10px',
	margin: '20px',
	color: 'dark-gray',
	height: '415px'
});

const Title = styled(Typography)({
	fontSize: '24px'
});

const StyledSubGrid = styled(Grid)({
	margin: '20px 30px'
});

// We pass rvrToy into each of our components via props, as the commands to retrieve system information are all called directly on the SpheroRvrToy object (which we created an instance of in App.js, called rvrToy, to use across this application). 

const SystemInformation = props => {
	return (
		<React.Fragment>
			<SystemInformationPaper>
				<Title gutterBottom>System Information</Title>
				<Grid>
					<Grid container direction='row' alignItems='center'>
						<StyledSubGrid item>
							<MainAppVersion rvrToy={props.rvrToy}>xs=3</MainAppVersion>
						</StyledSubGrid>
						<StyledSubGrid item>
							<BootloaderVersion rvrToy={props.rvrToy}>xs=3</BootloaderVersion>
						</StyledSubGrid>
						<StyledSubGrid item>
							<BoardRevision rvrToy={props.rvrToy}>xs=3</BoardRevision>
						</StyledSubGrid>
					</Grid>
					<Grid container direction='row' alignItems='center'>
						<StyledSubGrid item>
							<MACAddress rvrToy={props.rvrToy}>xs=3</MACAddress>
						</StyledSubGrid>
						<StyledSubGrid item>
							<SKU rvrToy={props.rvrToy}>xs=3</SKU>
						</StyledSubGrid>
						<StyledSubGrid item>
							<BluetoothAdvertisingName
								rvrToy={props.rvrToy}
							></BluetoothAdvertisingName>
						</StyledSubGrid>
					</Grid>
				</Grid>
			</SystemInformationPaper>
		</React.Fragment>
	);
};

export default SystemInformation;
