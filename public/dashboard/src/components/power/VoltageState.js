import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { styled } from '@material-ui/styles';

const VoltageStateCard = styled(Card)({
	padding: '10px',
	textAlign: 'center',
	color: 'dark-gray',
	width: '200px'
});

const Title = styled(Typography)({
	fontSize: '20px'
});

class VoltageState extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: '' };
	}

	componentDidMount() {
		const { rvrToy } = this.props;
		// We can get the battery voltage state from the Nordic Chip (which has a permanent address of "1") using the getBatteryVoltageState command.
		rvrToy.getBatteryVoltageState(1).then(data => {
			this.setState({
				data: JSON.parse(data),
				definition:
					JSON.parse(data).state === 3
						? ' (Critical)'
						: JSON.parse(data).state === 2
						? ' (Low)'
						: JSON.parse(data).state === 1
						? ' (OK)'
						: ' (Unknown)'
			});
		});

		this.updateVoltageState();
	}

	updateVoltageState = () => {
		const interval = setInterval(() => {
			// In order to have the battery voltage state stay up to date, we call the getBatteryVoltageState command on an interval (but only frequently enough to stay up to date, not so frequently as to drain the battery unnecessarily or clog up the communication channels).
			this.props.rvrToy.getBatteryVoltageState(1).then(data => {
				this.setState({
					data: JSON.parse(data),
					definition:
						JSON.parse(data).state === 3
							? ' (Critical)'
							: JSON.parse(data).state === 2
							? ' (Low)'
							: JSON.parse(data).state === 1
							? ' (OK)'
							: ' (Unknown)'
				});
			});
		}, 900000);
		return () => clearInterval(interval);
	};

	render() {
		return (
			<VoltageStateCard>
				<CardContent>
					<Title gutterBottom>Voltage State</Title>
					{this.state.data && (
						<Typography>
							{this.state.data.state}
							{this.state.definition}
						</Typography>
					)}
				</CardContent>
			</VoltageStateCard>
		);
	}
}

export default VoltageState;
