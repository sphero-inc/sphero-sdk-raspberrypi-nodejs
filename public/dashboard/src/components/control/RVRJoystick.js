import React from 'react';
import { Joystick } from 'react-joystick-component';
import { Paper, Typography, Button, Grid } from '@material-ui/core';
import { styled } from '@material-ui/styles';

/**
 * Calculates the degree given coordinates x and y
 * @param x horizontal distance from origin; x-coordinate on unit circle; -1 <= x <= 1
 * @param y vertical distance from origin; y-coordinate on unit circle; -1 <= y <= 1
 * @returns {*} degree of line that has x and y as coordinates with positive half of x-axis
 */
function getTheta(x, y) {
	console.assert(x >= -1 && x <= 1, 'Argument x is out of range');
	console.assert(y >= -1 && y <= 1, 'Argument y is out of range');

	// Transposing x, and y values in Atan2 to get angle that starts at 0 on the positive y axis, and increases clockwise.
	let radians = Math.atan2(x, y);
	let theta = (radians * 180) / Math.PI;

	// Wrap degrees if they cross over -180/180 threshold on the negative y axis.
	if (theta < 0) {
		theta += 360;
	}

	console.assert(theta >= 0 && x <= 359, 'Return value theta is out of range');
	return theta;
}

/**
 * Normalizes a value to be on a new scale defined by newMin and newMax.
 * Example: normalize(10, 5, 15, 0, 1) -> 0.5
 */
function normalize(value, min, max, newMin, newMax) {
	return ((value - min) / (max - min)) * (newMax - newMin) + newMin;
}

const DrivePaper = styled(Paper)({
	margin: '20px',
	padding: '10px'
});

const Title = styled(Typography)({
	fontSize: '24px'
});

const JoystickPaper = styled(Paper)({
	padding: '30px 30px',
	textAlign: 'center',
	background: 'transparent',
	boxShadow: 'none'
});

const JoystickButton = styled(Button)({
	backgroundColor: '#4200b7',
	color: '#fff',
	padding: '10px 20px'
});

const SpeedPaper = styled(Paper)({
	marginLeft: '30px',
	background: 'transparent',
	boxShadow: 'none',
	top: '0px'
});

const SpeedButton = styled(Button)({
	backgroundColor: '#4200b7',
	color: '#fff',
	padding: '10px 20px',
	margin: '10px 20px'
});

const PRNDLButton = styled(SpeedButton)({
	margin: '100px 20px 0px 20px'
});

class RVRJoystick extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			direction: 'Stopped',
			theta: 0,
			radius: 0,
			speed: 0,
			maxSpeed: 90,
			backward: false
		};
	}

	handleMove = data => {
		const { rvrToy } = this.props;

		this.setState({
			direction: data.direction,
			theta: getTheta(
				normalize(data.x, -100, 100, -1, 1),
				normalize(data.y, -100, 100, -1, 1)
			),
			radius: Math.sqrt(
				Math.pow(Math.abs(data.x), 2) + Math.pow(Math.abs(data.y), 2)
			),
			speed: normalize(this.state.radius, 0, 142, 0, this.state.maxSpeed)
		});

		// The driveWithHeading command takes in a speed you'd like to drive at and a direction (angle between 0 and 360) that you'd like to drive in. There is also an optional third parameter that allows you to drive the RVR in reverse, with a value of "1".

		if (!this.state.backward) {
			rvrToy.driveWithHeading(this.state.speed, this.state.theta);
		} else {
			rvrToy.driveWithHeading(this.state.speed, this.state.theta, 1);
		}
	};

	handleStop = data => {
		this.setState({
			direction: 'Stopped',
			radius: Math.sqrt(
				Math.pow(Math.abs(data.x), 2) + Math.pow(Math.abs(data.y), 2)
			),
			speed: 0
		});
		this.props.driveControl.rollStop(this.state.theta);
	};

	resetAim = () => {
		const { driveControl } = this.props;
		driveControl.resetHeading();
	};

	setMaxSpeed = speed => {
		this.setState({
			maxSpeed: speed
		});
	};

	setPRNDL = () => {
		this.setState({
			backward: this.state.backward == false ? true : false
		});
	};

	render() {
		return (
			<DrivePaper>
				<Title gutterBottom>Drive</Title>
				<Grid container direction='row' alignItems='center'>
					<Grid>
						<JoystickPaper>
							<Joystick
								move={this.handleMove}
								stop={this.handleStop}
								size={200}
								throttle={300}
								stickColor='#4200b7'
								baseColor='#8512da'
								style={{ margin: '50px' }}
							/>
							<p>{this.state.direction}</p>
							<br />
							<br />
							<JoystickButton onClick={this.resetAim}>
								Reset Aim!
							</JoystickButton>
						</JoystickPaper>
					</Grid>
					<Grid>
						<SpeedPaper>
							<Grid container direction='column' alignItems='center'>
								<Grid item xs>
									<SpeedButton onClick={() => this.setMaxSpeed(45)}>
										Slow
									</SpeedButton>
								</Grid>
								<Grid item xs>
									<SpeedButton onClick={() => this.setMaxSpeed(90)}>
										Normal
									</SpeedButton>
								</Grid>
								<Grid item xs>
									<SpeedButton onClick={() => this.setMaxSpeed(128)}>
										Fast
									</SpeedButton>
								</Grid>
								<Grid item xs>
									<PRNDLButton onClick={this.setPRNDL}>
										{this.state.backward ? 'Go Forward' : 'Back It Up'}
									</PRNDLButton>
								</Grid>
							</Grid>
						</SpeedPaper>
					</Grid>
				</Grid>
			</DrivePaper>
		);
	}
}

export default RVRJoystick;
