import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { styled } from '@material-ui/styles';

const MACAddressCard = styled(Card)({
	width: '240px',
	padding: '10px',
	textAlign: 'center',
	color: 'dark-gray'
});

const Title = styled(Typography)({
	fontSize: '20px'
});

class MACAddress extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: '' };
	}

	componentDidMount() {
		// Of our two processors, the Nordic chip is the one that will return a true MAC address and has a permanent address of "1" (the ST chip returns its UID as a UID, whereas the Nordic chip returns its UID as a MAC address), so our argument for this method is "1"
		this.props.rvrToy.getMacAddress(1).then(data => {
			this.setState({
				data: JSON.parse(data)
			});
		});}

	render() {
		return (
			<MACAddressCard>
				<CardContent>
					<Title gutterBottom>MAC Address</Title>
					{this.state.data && (
						<Typography>{this.state.data.macAddress}</Typography>
					)}
				</CardContent>
			</MACAddressCard>
		);
	}
}

export default MACAddress;
