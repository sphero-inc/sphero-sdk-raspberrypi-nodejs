import React from 'react';
import c3 from 'c3';

class AttitudeChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pitch: ['pitch'],
			roll: ['roll'],
			yaw: ['yaw']
		};
	}

	renderChart() {
		c3.generate({
			bindto: '#attitudeChart',
			data: {
				columns: [this.state.pitch, this.state.roll, this.state.yaw],
				type: 'scatter',
				labels: true
			},
			point: { show: true },
			axis: {
				y: {
					max:
						Math.max(
							Math.max(this.state.pitch),
							Math.max(this.state.roll),
							Math.max(this.state.yaw)
						) + 10,
					min:
						Math.min(
							Math.min(this.state.pitch),
							Math.min(this.state.roll),
							Math.min(this.state.yaw)
						) - 10
				},
				x: { show: true }
			}
		});
	}

	componentDidMount() {
		const { sensorControl } = this.props;
		// The each sensor we'd like to stream must be enabled and we must let the system know what to do once it is. In this case (for each of the sensors we'll be plotting), we add each new value from the stream to an array, which is subsequently plotted against time.
		sensorControl.enableSensor(sensorControl.attitude, data => {
			this.setState({
				pitch: this.state.pitch.concat(data.Pitch),
				roll: this.state.roll.concat(data.Roll),
				yaw: this.state.yaw.concat(data.Yaw)
			}, this.renderChart());
		});
	}

	render() {
		return (
			<div>
				<div id='attitudeChart'></div>
			</div>
		);
	}
}

export default AttitudeChart;
