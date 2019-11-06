import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { styled } from '@material-ui/styles';

const BluetoothAdvertisingNameCard = styled(Card)({
	width: '240px',
	padding: '10px',
	textAlign: 'center',
	color: 'dark-gray'
});

const Title = styled(Typography)({
	fontSize: '20px'
});

class BluetoothAdvertisingName extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: '' }; 
	}

	componentDidMount(){
		// The we chose to include the Nordic Chip in the RVR for its bluetooth capabilities. You can use get getBluetoothAdvertisingName on the Nordic Chip (which has a permanent address of "1") to retrieve the name that can be used to find the RVR via bluetooth.
		this.props.rvrToy.getBluetoothAdvertisingName(1).then(data => {
			this.setState({
				data: JSON.parse(data)
			});
		});
	}

	render() {
		return (
			<BluetoothAdvertisingNameCard>
				<CardContent>
					<Title gutterBottom>Bluetooth Advertising Name</Title>
					{this.state.data && <Typography>{this.state.data.name}</Typography>}
				</CardContent>
			</BluetoothAdvertisingNameCard>
		);
	}
}

export default BluetoothAdvertisingName;
