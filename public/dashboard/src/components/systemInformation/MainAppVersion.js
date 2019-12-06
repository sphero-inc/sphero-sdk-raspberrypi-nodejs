import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { SpheroRvrToy } from 'sdk-v4-convenience-raspberry-pi-client-js';

const MainAppVersionCard = styled(Card)({
	width: '240px',
	padding: '10px',
	textAlign: 'center',
	color: 'dark-gray'
});

const Title = styled(Typography)({
	fontSize: '20px'
});

class MainAppVersion extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data1: '', data2: '' };
	}

	componentDidMount() {
		// There are two processors in the RVR to handle different capabilities like bluetooth or driving, each with its own software. We call the getMainApplicationVersion method on both processors, which, behind the scenes, have been given permanent addresses of "1" and "2", hence the arguments of "primaryTarget" and "secondaryTarget".
		this.props.rvrToy
			.getMainApplicationVersion(SpheroRvrToy.primaryTarget)
			.then(data => {
				this.setState({
					data1: JSON.parse(data)
				});
			});
		this.props.rvrToy
			.getMainApplicationVersion(SpheroRvrToy.secondaryTarget)
			.then(data => {
				this.setState({
					data2: JSON.parse(data)
				});
			});
	}

	render() {
		return (
			<MainAppVersionCard>
				<CardContent>
					<Title>Main Application Version</Title>
					{this.state.data1 && (
						<Typography>
							Nordic: {this.state.data1.major}.{this.state.data1.minor}.
							{this.state.data1.revision}
						</Typography>
					)}
					{this.state.data2 && (
						<Typography>
							ST: {this.state.data2.major}.{this.state.data2.minor}.
							{this.state.data2.revision}
						</Typography>
					)}
				</CardContent>
			</MainAppVersionCard>
		);
	}
}

export default MainAppVersion;
