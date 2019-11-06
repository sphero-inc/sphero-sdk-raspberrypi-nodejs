import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box, AppBar } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import AmbientLightChart from './AmbientLightChart';
import AttitudeChart from './AttitudeChart';
import AccelerometerChart from './AccelerometerChart';
import GyroscopeChart from './GyroscopeChart';
import VelocityChart from './VelocityChart';
import SpeedChart from './SpeedChart';
import LocatorChart from './LocatorChart';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component='div'
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			<Box p={3}>{children}</Box>
		</Typography>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

const GraphsContainer = styled('div')({
	flexGrow: 1,
	backgroundColor: '#fff',
	width: '1350px'
});

const TabsBar = styled(AppBar)({
	backgroundColor: '#4200b7'
});

class SensorStreaming extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0
		};
	}

	handleChange = (event, newValue) => {
		this.setState({ value: newValue });
	};

	componentDidMount() {
		const { sensorControl } = this.props;
		if (!sensorControl.isStreaming) {
			sensorControl.startSensorStreaming(1000);
		}
		setTimeout(() => {
			sensorControl.clearSensorStreaming();
		}, 60000);
	}

	// Because each of the streaming services is called on the sensor control property of the rvrToy object (which we fed into this SensorStreaming object as simply sensorControl, in the PageBody component), we feed sensorControl into each of the streaming graph components. 

	render() {
		const { value } = this.state;
		const { sensorControl } = this.props;
		return (
			<GraphsContainer>
				<TabsBar position='static'>
					<Tabs
						value={value}
						onChange={this.handleChange}
						aria-label='simple tabs example'
					>
						<Tab label='Ambient Light' {...a11yProps(0)} />
						<Tab label='IMU' {...a11yProps(1)} />
						<Tab label='Accelerometer' {...a11yProps(2)} />
						<Tab label='Gyroscope' {...a11yProps(3)} />
						<Tab label='Locator' {...a11yProps(4)} />
						<Tab label='Velocity' {...a11yProps(5)} />
						<Tab label='Speed' {...a11yProps(6)} />
					</Tabs>
				</TabsBar>
				<TabPanel value={value} index={0}>
					<AmbientLightChart
						sensorControl={sensorControl}
					></AmbientLightChart>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<AttitudeChart
						sensorControl={sensorControl}
					></AttitudeChart>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<AccelerometerChart
						sensorControl={sensorControl}
					></AccelerometerChart>
				</TabPanel>
				<TabPanel value={value} index={3}>
					<GyroscopeChart
						sensorControl={sensorControl}
					></GyroscopeChart>
				</TabPanel>
				<TabPanel value={value} index={4}>
					<LocatorChart sensorControl={sensorControl}></LocatorChart>
				</TabPanel>
				<TabPanel value={value} index={5}>
					<VelocityChart
						sensorControl={sensorControl}
					></VelocityChart>
				</TabPanel>
				<TabPanel value={value} index={6}>
					<SpeedChart sensorControl={sensorControl}></SpeedChart>
				</TabPanel>
			</GraphsContainer>
		);
	}
}

export default SensorStreaming;
