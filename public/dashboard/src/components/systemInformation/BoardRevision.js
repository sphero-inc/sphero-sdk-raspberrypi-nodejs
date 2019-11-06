import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { styled } from '@material-ui/styles';

const BoardRevisionCard = styled(Card)({
	width: '240px',
	padding: '10px',
	textAlign: 'center',
	color: 'dark-gray'
});

const Title = styled(Typography)({
	fontSize: '20px'
});

class BoardRevision extends React.Component {
	constructor(props) {
		super(props);
		this.state = { data: '' };
	}

	componentDidMount() {
		// Of our two processors, the Nordic chip is the one that will return a board revision and has a permanent address of "1", so our argument for this method is "1"
		this.props.rvrToy.getBoardRevision(1).then(data => {
			this.setState({
				data: JSON.parse(data)
			});
		});}

	render() {
		return (
			<BoardRevisionCard>
				<CardContent>
					<Title gutterBottom>Board Revision</Title>
					{this.state.data && (
						<Typography>{this.state.data.revision}</Typography>
					)}
				</CardContent>
			</BoardRevisionCard>
		);
	}
}

export default BoardRevision;
