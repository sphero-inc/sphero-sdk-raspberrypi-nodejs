import React from 'react';
import { SpheroRvrToy } from 'sdk-v4-convenience-raspberry-pi-client-js';
import { styled } from '@material-ui/styles';

import PageBody from './components/PageBody';
import TopBar from './components/TopBar';

// Because we'll be communicating with the RVR throughout the application, we initiate our specific instance of it (with our IP address and port) here, at the top level, in the App.js file
let rvrToy = new SpheroRvrToy('10.211.2.18', '2010');

// This is a styled component; we are using the ones specific to Material UI, as opposed to the original, vanilla version
const TheBigRoot = styled('div')({
	display: 'flex',
	font: 'Roboto'
});

const App = () => {
	return (
		<TheBigRoot>
			{/* TopBar is the header bar across the top of the page (where you could expand by adding a search function or the like) */}
			<TopBar></TopBar>
			{/* PageBody is where all of the action happens. We import our instance of rvrToy so that we can utilize it in the different areas of the dashboard */}
			<PageBody rvrToy={rvrToy}></PageBody>
		</TheBigRoot>
	);
};

export default App;
