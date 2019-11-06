import React from 'react';
import c3 from 'c3';

class SpeedChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = { speed: ['Speed (mph)'] };
	}

	renderChart() {
		c3.generate({
			bindto: '#speed',
			data: {
				columns: [this.state.speed],
				type: 'scatter',
				labels: true
			},
			point: { show: true },
			axis: {
				y: {
					max: Math.max(this.state.speed) + 5,
					min: Math.min(this.state.speed) - 5
				},
				x: { show: true }
			}
		});
	}

	async componentDidMount() {
		const { sensorControl } = this.props;
		// The each sensor we'd like to stream must be enabled and we must let the system know what to do once it is. In this case (for each of the sensors we'll be plotting), we add each new value from the stream to an array, which is subsequently plotted against time.
		sensorControl.enableSensor(sensorControl.speed, data => {
			this.setState({
				speed: this.state.speed.concat(data.MPS)
			}, this.renderChart());
		});
	}

	render() {
		return (
			<div>
				<div id='speed'></div>
			</div>
		);
	}
}

export default SpeedChart;
