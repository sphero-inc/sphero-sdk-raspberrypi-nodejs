import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { styled } from '@material-ui/styles';

const BatteryPercentageCard = styled(Card)({
	padding: '10px',
	textAlign: 'center',
	color: 'dark-gray',
	width: '250px'
});

const Title = styled(Typography)({
	fontSize: '20px'
});

class BatteryPercentage extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: '' };
	}

	componentDidMount() {
		const { rvrToy } = this.props;
		// We can get the battery percentage from the Nordic Chip (which has a permanent address of "1") using the getBatteryPercentage command.
		rvrToy.getBatteryPercentage(1).then(data => {
			this.setState({
				data: JSON.parse(data)
			});
		});

		this.updateBatteryPercent();
	}

	updateBatteryPercent = () => {
		const interval = setInterval(() => {
			// In order to have the battery percentage stay up to date, we call the getBatteryPercentage command on an interval (but only frequently enough to stay up to date, not so frequently as to drain the battery unnecessarily or clog up the communication channels).
			this.props.rvrToy.getBatteryPercentage(1).then(data => {
				this.setState({
					data: JSON.parse(data)
				});
			});
		}, 900000);
		return () => clearInterval(interval);
	};

	render() {
		return (
			<BatteryPercentageCard>
				<CardContent>
					<Title>Battery Percentage</Title>
					{this.state.data && (
						<Typography>{this.state.data.percentage}%</Typography>
					)}
				</CardContent>
			</BatteryPercentageCard>
		);
	}
}

export default BatteryPercentage;
