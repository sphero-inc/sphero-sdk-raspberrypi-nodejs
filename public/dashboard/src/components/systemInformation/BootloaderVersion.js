import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { styled } from '@material-ui/styles';

const BootloaderVersionCard = styled(Card)({
	width: '240px',
	padding: '10px',
	textAlign: 'center',
	color: 'dark-gray'
});

const Title = styled(Typography)({
	fontSize: '20px'
});

class BootloaderVersion extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data1: '', data2: '' };
	}

	componentDidMount() {
		// There are two processors in the RVR to handle different capabilities like bluetooth or driving, each with its own software. We call the getBootloaderVersion method on both processors, which have been given permanent addresses of "1" and "2".
		this.props.rvrToy.getBootloaderVersion(1).then(data => {
			this.setState({
				data1: JSON.parse(data)
			});
		});
		this.props.rvrToy.getBootloaderVersion(2).then(data => {
			this.setState({
				data2: JSON.parse(data)
			});
		});
	}

	render() {
		return (
			<BootloaderVersionCard>
				<CardContent>
					<Title gutterBottom>Bootloader Version</Title>
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
			</BootloaderVersionCard>
		);
	}
}

export default BootloaderVersion;
