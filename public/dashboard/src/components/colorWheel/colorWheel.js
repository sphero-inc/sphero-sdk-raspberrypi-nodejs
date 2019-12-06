import React from 'react';
import {
	Card,
	CardContent,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Grid,
	Paper,
	Typography,
	styled
} from '@material-ui/core';
import { SketchPicker } from 'react-color';
// We used SketchPicker from react-color to create our color picker, but you are welcome to choose another tool and implement it here

const ColorfulPaper = styled(Paper)({
	margin: '20px',
	padding: '10px'
});

const Title = styled(Typography)({
	fontSize: '24px'
});

const ColorfulFormBase = styled(FormControl)({
	margin: '20px'
});

const SketchCard = styled(Card)({
	margin: '15px 20px 25px 20px'
});

// colorHexToRgbArray converts the hex value of a color into the RGB values for that color
const colorHexToRgbArray = colorHex => {
	let redHex = colorHex.substr(1).slice(0, 2);
	let greenHex = colorHex.substr(1).slice(2, 4);
	let blueHex = colorHex.substr(1).slice(4, 6);
	return {
		red: parseInt(redHex, 16),
		green: parseInt(greenHex, 16),
		blue: parseInt(blueHex, 16)
	};
};

const initialColor = { hex: '#1B3C80' };

class ColorWheel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			headlightLeft: true,
			headlightRight: true,
			brakelightLeft: true,
			brakelightRight: true,
			batteryDoorFront: true,
			batteryDoorRear: true,
			powerButtonFront: true,
			powerButtonRear: true,
			statusIndicationLeft: true,
			statusIndicationRight: true
		};
	}

	handleCheck = name => event => {
		this.setState({ ...this.state, [name]: event.target.checked });
	};

	// When a new color is selected by the user, we start by grabbing the RGB values for that color and checking for which LEDs are selected to be changed. We have two different methods we can use: 1) setAllLedsRgb, which we'll use if all or none of the LED boxes are checked and 2) setMultipleLedsRgb, which allows us to set the color of some, but not all of the LEDs.
	handleColorChange = ({ hex }) => {
		let rgbValues = colorHexToRgbArray(hex);
		let ledGroups = Object.keys(this.state).filter(key => this.state[key] === true);
		if (ledGroups.length === 0 || ledGroups.length === 10) {
			this.props.ledControl.setAllLedsRgb(
				rgbValues.red,
				rgbValues.green,
				rgbValues.blue
			);
		} else {
			this.props.ledControl.setMultipleLedsRgb(
				ledGroups,
				rgbValues.red,
				rgbValues.green,
				rgbValues.blue
			);
		}
	};

	componentDidUpdate() {
		// Set LED's on RVR to match the initial color of color wheel
		this.handleColorChange(initialColor);
	}

	render() {
		const {
			headlightLeft,
			headlightRight,
			brakelightLeft,
			brakelightRight,
			batteryDoorFront,
			batteryDoorRear,
			powerButtonFront,
			powerButtonRear,
			statusIndicationLeft,
			statusIndicationRight
		} = this.state;
		return (
			<ColorfulPaper>
				<Title gutterBottom>Change LED Colors</Title>
				<Grid container direction='row' alignItems='center'>
					<Grid>
						<SketchCard>
							<CardContent>
								<SketchPicker
									color={initialColor.hex}
									onChangeComplete={this.handleColorChange}
								/>
							</CardContent>
						</SketchCard>
					</Grid>
					<Grid>
						<ColorfulFormBase component='fieldset'>
							<FormLabel component='legend'>Front and Back LEDs</FormLabel>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											checked={headlightLeft}
											onChange={this.handleCheck('headlightLeft')}
											value='headlightLeft'
										/>
									}
									label='Left Headlight'
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={headlightRight}
											onChange={this.handleCheck('headlightRight')}
											value='headlightRight'
										/>
									}
									label='Right Headlight'
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={brakelightLeft}
											onChange={this.handleCheck('brakelightLeft')}
											value='brakelightLeft'
										/>
									}
									label='Left Brake Light'
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={brakelightRight}
											onChange={this.handleCheck('brakelightRight')}
											value='brakelightRight'
										/>
									}
									label='Right Brake Light'
								/>
							</FormGroup>
						</ColorfulFormBase>
					</Grid>
					<Grid>
						<ColorfulFormBase component='fieldset'>
							<FormLabel component='legend'>Side LEDs</FormLabel>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											checked={batteryDoorFront}
											onChange={this.handleCheck('batteryDoorFront')}
											value='batteryDoorFront'
										/>
									}
									label='Battery Door Front'
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={batteryDoorRear}
											onChange={this.handleCheck('batteryDoorRear')}
											value='batteryDoorRear'
										/>
									}
									label='Battery Door Back'
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={powerButtonFront}
											onChange={this.handleCheck('powerButtonFront')}
											value='powerButtonFront'
										/>
									}
									label='Power Front'
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={powerButtonRear}
											onChange={this.handleCheck('powerButtonRear')}
											value='powerButtonRear'
										/>
									}
									label='Power Back'
								/>
							</FormGroup>
						</ColorfulFormBase>
					</Grid>
					<Grid>
						<ColorfulFormBase component='fieldset'>
							<FormLabel component='legend'>Internal LEDs</FormLabel>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											checked={statusIndicationLeft}
											onChange={this.handleCheck('statusIndicationLeft')}
											value='statusIndicationLeft'
										/>
									}
									label='Interior Left'
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={statusIndicationRight}
											onChange={this.handleCheck('statusIndicationRight')}
											value='statusIndicationRight'
										/>
									}
									label='Interior Right'
								/>
							</FormGroup>
						</ColorfulFormBase>
					</Grid>
				</Grid>
			</ColorfulPaper>
		);
	}
}

export default ColorWheel;
