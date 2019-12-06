import React from 'react';
import { styled } from '@material-ui/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const drawerWidth = 240;

const StyledTopBar = styled(AppBar)({
	width: '100%',
	marginLeft: drawerWidth,
	backgroundColor: '#4200b7'
});

const TopBar = () => {
	return (
		<StyledTopBar position='fixed'>
			<Toolbar>
				<Typography variant='h4' noWrap>
					RVR Dashboard
				</Typography>
			</Toolbar>
		</StyledTopBar>
	);
};

export default TopBar;
