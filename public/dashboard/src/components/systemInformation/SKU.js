import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { styled } from '@material-ui/styles';

const SKUCard = styled(Card)({
	width: '240px',
	padding: '10px',
	textAlign: 'center',
	color: 'dark-gray',
	height: '130px'
});

const Title = styled(Typography)({
	fontSize: '20px',
	padding: '10px'
});

class SKU extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: '' };
	}

	componentDidMount() {
		// You can use get getSku on the Nordic Chip (which has a permanent address of "1") to retrieve the SKU of the RVR. 
		this.props.rvrToy.getSku(1).then(data => {
			this.setState({
				data: JSON.parse(data)
			});
		});}

	render() {
		return (
			<SKUCard>
				<CardContent>
					<Title gutterBottom>SKU</Title>
					{this.state.data && <Typography>{this.state.data.sku}</Typography>}
				</CardContent>
			</SKUCard>
		);
	}
}

export default SKU;
