import React from 'react';
import c3 from 'c3';

class AmbientLightChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = { ambientLight: ['Ambient Light Value'] };
	}

	// Labels on scatter plot points are not available in c3.js
	renderChart() {
		c3.generate({
			bindto: '#ambientLight',
			data: {
				columns: [this.state.ambientLight],
				type: 'scatter'
			},
			// You can adjust the size of the points on your graph by adjusting the radius
			point: {
				r: 10
			},
			axis: {
				y: {
					max: Math.max(this.state.ambientLight) + 5,
					min: Math.min(this.state.ambientLight) - 5
				},
				x: { show: true }
			}
		});
	}

	async componentDidMount() {
		const { sensorControl } = this.props;
		// The each sensor we'd like to stream must be enabled and we must let the system know what to do once it is. In this case (for each of the sensors we'll be plotting), we add each new value from the stream to an array, which is subsequently plotted against time.
		sensorControl.enableSensor(sensorControl.ambientLight, data => {
			this.setState({
				ambientLight: this.state.ambientLight.concat(data.Light)
			}, this.renderChart());
		});
	}

	render() {
		return (
			<div>
				<div id='ambientLight'></div>
			</div>
		);
	}
}

export default AmbientLightChart;
