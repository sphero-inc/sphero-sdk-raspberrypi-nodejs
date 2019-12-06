import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { styled } from '@material-ui/styles';

const BatteryVoltageCard = styled(Card)({
	padding: '10px',
	textAlign: 'center',
	color: 'dark-gray',
	width: '200px'
});

const Title = styled(Typography)({
	fontSize: '20px'
});

class BatteryVoltage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: '' };
	}

	componentDidMount() {
		const { rvrToy } = this.props;
		// When calling the getBatteryVoltageInVolts command, a Reading Type of 0 is used for most normal usage. Other values are used internally for testing purposes.
		rvrToy.getBatteryVoltageInVolts(0).then(data => {
			this.setState({
				data: JSON.parse(data)
			});
		});

		this.updateBatteryVoltage();
	}

	updateBatteryVoltage = () => {
		const interval = setInterval(() => {
			// In order to have the battery voltage stay up to date, we call the getBatteryVoltageInVolts command on an interval (but only frequently enough to stay up to date, not so frequently as to drain the battery unnecessarily or clog up the communication channels).
			this.props.rvrToy.getBatteryVoltageInVolts(0).then(data => {
				this.setState({
					data: JSON.parse(data)
				});
			});
		}, 900000);
		return () => clearInterval(interval);
	};

	render() {
		return (
			<BatteryVoltageCard>
				<CardContent>
					<Title gutterBottom>Battery Voltage</Title>
					{this.state.data && (
						<Typography>{this.state.data.voltage}</Typography>
					)}
				</CardContent>
			</BatteryVoltageCard>
		);
	}
}

export default BatteryVoltage;
