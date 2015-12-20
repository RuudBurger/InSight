'use strict';

import React from 'react';

import RangeActions from '../../actions/range';

import HighCharts from 'react-highcharts/dist/bundle/highcharts';

Highcharts.setOptions({
	global: {
		useUTC: false
	}
});

export default React.createClass({

	getInitialState(){
		return {
			last_day: []
		}
	},

	refresh(){
		this.forceUpdate();
	},

	updateDayData(data){
		this.setState({
			last_day: data
		});
	},

	componentWillMount(){
		RangeActions.getRange(this.props.range, this.props.interval, null, this.updateDayData);
	},

	render(){

		var series = [],
			current = null,
			tmp = {data:[]};

		this.state.last_day.forEach(item => {

			tmp.data.push([item.timestamp * 1000, item.usage]);

			if(item.current != current){
				if(tmp.data.length > 1){
					series.push(tmp);
				}

				tmp = {
					name: current == 1 ? 'Low' : 'High',
					color: current == 1 ? '#666' : '#aa6666',
					data:[[item.timestamp * 1000, item.usage]]
				};
				current = item.current;
			}

		});

		series.push(tmp);


		var config = {
			plotOptions: {
				line: {
					animation: false
				}
			},
			legend: {
				enabled: false
			},
			rangeSelector: {
				selected: 1
			},
			xAxis: {
				type: 'datetime'
			},
			yAxis: {
				title: false,
				min: 0
			},
			title: false,
			credits: false,
			series: series
		};

		return (
			<div className="chart">
				<HighCharts config={config} ref="chart" />
			</div>
		);
	}
});
