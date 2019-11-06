import React from 'react';
import { Paper, Grid } from '@material-ui/core';
import { styled } from '@material-ui/styles';

// The page body is basically a "holder" for all of the different areas where we display information about the connected RVR. We want to keep each file in and of itself as simple as possible and not include logic where it doesn't need to be, making each file's purpose clear and increasing the ability to reuse components. Below are all the different components that we display on our page body:
import ColorWheel from './colorWheel/colorWheel';
import Power from './power/Power';
import RVRJoystick from './control/RVRJoystick';
import SensorStreaming from './sensorStreaming/SensorStreaming';
import SleepWakeButtons from './SleepWakeButtons';
import SystemInformation from './systemInformation/SystemInformation';

const BodyContent = styled('div')({
	flexGrow: 1,
	backgroundColor: 'aliceblue',
	padding: '20px'
});

const PageRow = styled(Paper)({
	margin: '20px auto 0px auto',
	background: 'transparent',
	boxShadow: 'none'
});

const TopRow = styled(PageRow)({
	marginTop: '50px'
});

const MainPaper = styled(Paper)({
	padding: '10px',
	marginRight: '50px',
	textAlign: 'center'
});

const PageBody = props => {
	return (
		<BodyContent>
			<Grid container>
				{/* Making the grid below a container allows us to position items in rows on the page, rather than them stacking themselves */}
				<Grid container direction='row' alignItems='center'>
					<TopRow>
						{/* Making the grid below a container allows us to position the elements within this card ("Paper") next to each other, rather than on top of one another */}
						<Grid container direction='row' alignItems='center'>
							<Grid>
								<SystemInformation
									rvrToy={props.rvrToy}
									xs={7}
								></SystemInformation>
							</Grid>
							<Grid>
								<Power rvrToy={props.rvrToy} xs={5}></Power>
							</Grid>
						</Grid>
					</TopRow>
				</Grid>
				<Grid container direction='row' alignItems='center'>
					<PageRow>
						<Grid container direction='row' alignItems='center'>
							<Grid>
								<MainPaper>
									{/* For Sensor Streaming, we only need the sensors part of RVR. So that we are not having to type "props.rvrToy.getSensorControl().thingYouWant" every time we do something with the sensors, we just pass a "sensorControl" prop into Sensor Streaming */}
									<SensorStreaming
										sensorControl={props.rvrToy.getSensorControl()}
									></SensorStreaming>
								</MainPaper>
							</Grid>
							<Grid>
								<SleepWakeButtons rvrToy={props.rvrToy}></SleepWakeButtons>
							</Grid>
						</Grid>
					</PageRow>
				</Grid>
				<Grid container direction='row' alignItems='center'>
					<PageRow>
						<Grid container direction='row' alignItems='center'>
							<Grid>
								<ColorWheel
									ledControl={props.rvrToy.getLedControl()}
								></ColorWheel>
							</Grid>
							<Grid>
								<RVRJoystick
									rvrToy={props.rvrToy}
									driveControl={props.rvrToy.getDriveControl()}
								></RVRJoystick>
							</Grid>
						</Grid>
					</PageRow>
				</Grid>
			</Grid>
		</BodyContent>
	);
};

export default PageBody;
